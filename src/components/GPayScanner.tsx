import { useEffect, useMemo, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { X, Zap, ZapOff, Camera, VideoOff } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface GPayScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
  mode?: "barcode" | "image";
}

export function GPayScanner({ onScanSuccess, onClose, mode = "barcode" }: GPayScannerProps) {
  const { t } = useTranslation();
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [canRequestPermission, setCanRequestPermission] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const videoTrackRef = useRef<MediaStreamTrack | null>(null);
  const isClosingRef = useRef(false);
  const startScannerRef = useRef<(() => void) | null>(null);
  const cameraId = "reader";
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<number | null>(null);
  const [usingFallbackScanner, setUsingFallbackScanner] = useState(false);

  // Scanner configuration (aligned with your JSON).
  const SCANNER_CONFIG = useMemo(
    () => ({
      scanner: {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        disableFlip: false,
        rememberLastUsedCamera: true,
      },
      camera: { facingMode: "environment" as const },
      ui: { scannerContainer: "reader", resultContainer: "result" },
    }),
    [],
  );

  const LAST_CAMERA_ID_KEY = "trustedlens:lastCameraId";

  const supportsBarcodeDetector = useMemo(() => {
    return typeof (window as any).BarcodeDetector !== "undefined";
  }, []);

  const detectVideoInputs = async (): Promise<number> => {
    try {
      const md = navigator.mediaDevices;
      if (!md?.enumerateDevices) return 0;
      const devices = await md.enumerateDevices();
      return devices.filter((d) => d.kind === "videoinput").length;
    } catch {
      return 0;
    }
  };

  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const md = navigator.mediaDevices;
      if (!md?.getUserMedia) return false;
      const stream = await md.getUserMedia({ video: true, audio: false });
      // Immediately stop; we only need permission and device visibility.
      stream.getTracks().forEach((t) => t.stop());
      return true;
    } catch (e) {
      const name = (e as any)?.name as string | undefined;
      const message = (e as any)?.message as string | undefined;
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setError(t("camera_permission_denied_settings"));
        setErrorDetails(name ?? null);
      } else if (name === "NotReadableError") {
        setError(t("camera_in_use"));
        setErrorDetails(message ? `${name}: ${message}` : name ?? null);
      } else if (name === "AbortError") {
        setError(t("camera_timeout"));
        setErrorDetails(message ? `${name}: ${message}` : name ?? null);
      }
      return false;
    }
  };

  const handleEnableCamera = async () => {
    const ok = await requestCameraPermission();
    if (!ok) {
      setCanRequestPermission(true);
      return;
    }
    setError(null);
    setErrorDetails(null);
    setCanRequestPermission(false);
    isClosingRef.current = false;
    startScannerRef.current?.();
  };

  const stopWebcam = () => {
    if (scanIntervalRef.current) {
      window.clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    videoTrackRef.current = null;
  };

  const startWebcam = async () => {
    try {
      const md = navigator.mediaDevices;
      if (!md?.getUserMedia) throw new Error("MediaDevices API not available");

      stopWebcam();
      const lastCameraId =
        SCANNER_CONFIG.scanner.rememberLastUsedCamera ? window.localStorage.getItem(LAST_CAMERA_ID_KEY) : null;
      const stream = await md.getUserMedia({
        video: {
          ...(lastCameraId ? { deviceId: { exact: lastCameraId } } : {}),
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: { ideal: SCANNER_CONFIG.camera.facingMode },
        },
        audio: false,
      });

      streamRef.current = stream;
      const [track] = stream.getVideoTracks();
      videoTrackRef.current = track ?? null;
      if (SCANNER_CONFIG.scanner.rememberLastUsedCamera) {
        const settings = track?.getSettings?.();
        if (settings?.deviceId) window.localStorage.setItem(LAST_CAMERA_ID_KEY, settings.deviceId);
      }

      const el = videoRef.current;
      if (!el) throw new Error("Video element not mounted");
      el.srcObject = stream;
      el.playsInline = true;
      el.muted = true;
      await el.play();
    } catch (e) {
      const name = (e as any)?.name as string | undefined;
      const message = (e as any)?.message as string | undefined;
      if (name === "NotReadableError" || name === "AbortError") {
        setError(t("camera_start_failed"));
        setCanRequestPermission(true);
      } else if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setError(t("camera_permission_denied"));
        setCanRequestPermission(true);
      } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
        setError(t("no_camera_found"));
      } else if ((e as any) instanceof Error) {
        setError((e as any).message);
        setCanRequestPermission(true);
      } else {
        setError(t("camera_access_failed"));
        setCanRequestPermission(true);
      }
      setErrorDetails(message ? `${name ?? "Error"}: ${message}` : name ?? null);
      throw e;
    }
  };

  const startBarcodeDetection = async () => {
    if (!supportsBarcodeDetector) return;
    const BarcodeDetectorCtor = (window as any).BarcodeDetector as any;
    const formats = [
      "qr_code",
      "ean_13",
      "ean_8",
      "code_128",
      "upc_a",
      "upc_e",
    ];

    const detector = new BarcodeDetectorCtor({ formats });
    const el = videoRef.current;
    if (!el) return;

    const intervalMs = Math.max(50, Math.round(1000 / SCANNER_CONFIG.scanner.fps));

    const getCropRect = () => {
      // Crop around center based on qrbox size relative to the rendered video element.
      const vw = el.videoWidth;
      const vh = el.videoHeight;
      if (!vw || !vh) return { sx: 0, sy: 0, sw: vw, sh: vh };

      const displayW = el.clientWidth || vw;
      const displayH = el.clientHeight || vh;
      const scaleX = vw / displayW;
      const scaleY = vh / displayH;

      const sw = Math.min(vw, Math.round(SCANNER_CONFIG.scanner.qrbox.width * scaleX));
      const sh = Math.min(vh, Math.round(SCANNER_CONFIG.scanner.qrbox.height * scaleY));
      const sx = Math.max(0, Math.round(vw / 2 - sw / 2));
      const sy = Math.max(0, Math.round(vh / 2 - sh / 2));
      return { sx, sy, sw, sh };
    };

    // Simple polling loop; lightweight and works well in practice.
    scanIntervalRef.current = window.setInterval(async () => {
      try {
        if (isClosingRef.current) return;
        if (el.readyState < 2) return;
        if (el.videoWidth === 0 || el.videoHeight === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const { sx, sy, sw, sh } = getCropRect();
        if (!sw || !sh) return;
        if (canvas.width !== sw) canvas.width = sw;
        if (canvas.height !== sh) canvas.height = sh;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(el, sx, sy, sw, sh, 0, 0, sw, sh);

        const results = await detector.detect(canvas);
        const found = results?.[0]?.rawValue;
        if (found) {
          const resultEl = document.getElementById(SCANNER_CONFIG.ui.resultContainer);
          if (resultEl) resultEl.textContent = found;
          onScanSuccess(found);
          await stopScanner();
          onClose();
        }
      } catch {
        // ignore per-frame decode errors
      }
    }, intervalMs);
  };

  useEffect(() => {
    const startScanner = async () => {
      try {
        setError(null);
        setErrorDetails(null);
        setIsCameraReady(false);
        setCanRequestPermission(false);
        setUsingFallbackScanner(false);
        isClosingRef.current = false;

        const videoInputs = await detectVideoInputs();
        if (videoInputs === 0) {
          setError(t("no_camera_detected"));
          return;
        }

        // Primary path: use native webcam preview (works for both capture + scanning).
        await startWebcam();

        if (mode === "barcode") {
          if (supportsBarcodeDetector) {
            await startBarcodeDetection();
          } else {
            // Fallback for older browsers: use html5-qrcode (it creates its own video pipeline).
            setUsingFallbackScanner(true);
            const html5QrCode = new Html5Qrcode(cameraId);
            scannerRef.current = html5QrCode;

            const cameras = await Html5Qrcode.getCameras().catch(() => []);
            const preferredCamera =
              cameras.find((c) => /back|rear|environment/i.test(c.label)) ?? cameras[0];

            const config = {
              fps: SCANNER_CONFIG.scanner.fps,
              qrbox: SCANNER_CONFIG.scanner.qrbox,
              aspectRatio: SCANNER_CONFIG.scanner.aspectRatio,
              disableFlip: SCANNER_CONFIG.scanner.disableFlip,
              rememberLastUsedCamera: SCANNER_CONFIG.scanner.rememberLastUsedCamera,
              formatsToSupport: [
                Html5QrcodeSupportedFormats.QR_CODE,
                Html5QrcodeSupportedFormats.EAN_13,
                Html5QrcodeSupportedFormats.EAN_8,
                Html5QrcodeSupportedFormats.CODE_128,
                Html5QrcodeSupportedFormats.UPC_A,
                Html5QrcodeSupportedFormats.UPC_E,
              ],
            };

            await html5QrCode.start(
              preferredCamera?.id
                ? { deviceId: { exact: preferredCamera.id } }
                : { facingMode: "environment" },
              config,
              (decodedText) => {
                if (isClosingRef.current) return;
                onScanSuccess(decodedText);
                stopScanner();
              },
              () => {}
            );
          }
        }

        setIsCameraReady(true);
      } catch (err) {
        console.error("Camera error:", err);
        const name = (err as any)?.name as string | undefined;
        const message = (err as any)?.message as string | undefined;
        if (name === "NotAllowedError" || name === "PermissionDeniedError") {
          setError(t("camera_permission_denied"));
          setCanRequestPermission(true);
        } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
          setError(t("no_camera_found"));
        } else if (name === "NotReadableError") {
          setError(t("camera_in_use"));
        } else {
          setError(t("camera_access_failed"));
        }
        setErrorDetails(message ? `${name ?? "Error"}: ${message}` : name ?? null);
      }
    };

    startScannerRef.current = () => {
      void startScanner();
    };
    // Don't auto-start camera on mount.
    // Always request camera access via user gesture for best reliability (Chrome/Windows).
    (async () => {
      const videoInputs = await detectVideoInputs();
      if (videoInputs === 0) {
        setError(t("no_camera_detected"));
        return;
      }
      setError(t("camera_off"));
      setCanRequestPermission(true);
    })();

    return () => {
      stopScanner();
    };
  }, [mode, supportsBarcodeDetector]);

  const stopScanner = async () => {
    isClosingRef.current = true;

    // Best-effort: turn torch off before stopping.
    if (videoTrackRef.current) {
      try {
        await videoTrackRef.current.applyConstraints({ advanced: [{ torch: false }] as any });
      } catch {
        // ignore
      }
    }

    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }

    try {
      await scannerRef.current?.clear();
    } catch {
      // ignore
    }

    stopWebcam();
    setIsFlashOn(false);
    setIsCameraReady(false);
  };

  const toggleFlash = async () => {
    try {
      const track = videoTrackRef.current;
      if (!track) return;
      const capabilities = track.getCapabilities?.();
      if (capabilities?.torch) {
        await track.applyConstraints({ advanced: [{ torch: !isFlashOn }] as any });
        setIsFlashOn(!isFlashOn);
      }
    } catch (err) {
      console.error("Flash error:", err);
    }
  };

  const captureImage = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.videoWidth === 0 || video.videoHeight === 0) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    onScanSuccess(dataUrl);
    await stopScanner();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 p-4 backdrop-blur-sm">
      <div className="mx-auto h-[min(82vh,680px)] w-[min(94vw,460px)] overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-white/10">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-lg font-semibold text-white">
            {mode === "barcode" ? t("scanner_title_qr") : t("scanner_title_camera")}
          </p>
          <div className="flex items-center gap-3">
            {mode === "barcode" && (
              <button
                onClick={toggleFlash}
                className="rounded-full bg-white/10 p-2 text-white"
                aria-label={t("toggle_flash")}
              >
                {isFlashOn ? <ZapOff className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
              </button>
            )}
            <button
              onClick={() => {
                stopScanner().then(onClose);
              }}
              className="rounded-full bg-white/10 p-2 text-white"
              aria-label={t("close_scanner")}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scanner Area */}
        <div className="relative h-[calc(100%-64px)] w-full">
          {/* Native preview (primary path) */}
          {!usingFallbackScanner && (
            <>
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              <div id={SCANNER_CONFIG.ui.resultContainer} className="hidden" />
            </>
          )}

          {/* Fallback scanner output (html5-qrcode renders into this div) */}
          {usingFallbackScanner && (
            <div
              id="reader"
              className="h-full w-full bg-black [&_video]:h-full [&_video]:w-full [&_video]:object-cover [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:object-cover [&_img]:hidden"
            />
          )}
        
          {/* Overlay UI */}
          {isCameraReady && !error && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative h-72 w-72 max-w-[78%] max-h-[78%]">
                {/* Corner brackets */}
                <div className="absolute -left-1 -top-1 h-10 w-10 rounded-tl-3xl border-l-[6px] border-t-[6px] border-white/90" />
                <div className="absolute -right-1 -top-1 h-10 w-10 rounded-tr-3xl border-r-[6px] border-t-[6px] border-white/90" />
                <div className="absolute -bottom-1 -left-1 h-10 w-10 rounded-bl-3xl border-b-[6px] border-l-[6px] border-white/90" />
                <div className="absolute -bottom-1 -right-1 h-10 w-10 rounded-br-3xl border-b-[6px] border-r-[6px] border-white/90" />

                {/* Scan line only for barcode mode */}
                {mode === "barcode" && (
                  <motion.div
                    initial={{ top: "15%" }}
                    animate={{ top: "85%" }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 h-1 w-full bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-90 shadow-[0_0_14px_rgba(56,189,248,0.8)]"
                  />
                )}
              </div>

              <p className="mt-6 px-8 text-center text-base font-medium text-white/95 drop-shadow-lg">
                {mode === "barcode"
                  ? t("scanner_hint_qr")
                  : t("scanner_hint_capture")}
              </p>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <VideoOff className="h-10 w-10 text-white/50" />
              </div>
              <p className="text-sm font-medium text-white/90">{error}</p>
              {errorDetails && (
                <p className="mt-2 text-xs text-white/60">{errorDetails}</p>
              )}
              <div className="mt-4 flex flex-col items-center gap-2">
                {canRequestPermission && (
                  <button
                    onClick={() => void handleEnableCamera()}
                    className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
                  >
                    {t("enable_camera")}
                  </button>
                )}
                <button
                  onClick={() => {
                    void stopScanner().then(() => {
                      isClosingRef.current = false;
                      setCanRequestPermission(true);
                    });
                  }}
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10"
                >
                  {t("try_again")}
                </button>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-8 pb-8 pt-6 bg-gradient-to-t from-black/85 to-transparent">
            {mode === "image" && (
              <button 
                onClick={captureImage}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-black shadow-xl ring-4 ring-white/20 active:scale-95 transition-transform"
              >
                <Camera className="h-10 w-10" />
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
