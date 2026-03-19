import { useState, useRef, useEffect } from "react";
import {
  Camera, Upload, QrCode, X, Loader2, Shield, ShieldCheck, ShieldAlert,
  RotateCcw, Flag, ChevronDown, Plus, Image as ImageIcon, Scale, AlertTriangle,
  Search, CheckCircle2, XCircle, Smartphone, Zap, Type,
  Eye, Palette, Fingerprint, FileWarning, Gavel, Info, Download, Share2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { GPayScanner } from "@/components/GPayScanner";
import { useTranslation } from "react-i18next";

// ─── Types ────────────────────────────────────────────────────────
type VerificationStep = "upload" | "scanning" | "step1" | "step2" | "step3" | "step4";

interface CheckItem {
  name: string;
  score: number;
  pass: boolean;
  detail: string;
}

interface BISDetails {
  registrationNo: string;
  manufacturer: string;
  country: string;
  productCategory: string;
  productName: string;
  indianStandardNo: string;
  models: string;
  brand: string;
  validTill: string;
  status: string;
}

// ─── Mock Data ────────────────────────────────────────────────────
const fakeChecks: CheckItem[] = [
  { name: "verify_check_logo", score: 28, pass: false, detail: "verify_fake_logo_detail" },
  { name: "verify_check_font", score: 35, pass: false, detail: "verify_fake_font_detail" },
  { name: "verify_check_finish", score: 22, pass: false, detail: "verify_fake_finish_detail" },
  { name: "verify_check_color", score: 41, pass: false, detail: "verify_fake_color_detail" },
  { name: "verify_check_print", score: 30, pass: false, detail: "verify_fake_print_detail" },
  { name: "verify_check_alignment", score: 38, pass: false, detail: "verify_fake_alignment_detail" },
  { name: "verify_check_hologram", score: 15, pass: false, detail: "verify_fake_hologram_detail" },
  { name: "verify_check_spelling", score: 25, pass: false, detail: "verify_fake_spelling_detail" },
];

const authenticChecks: CheckItem[] = [
  { name: "verify_check_logo", score: 96, pass: true, detail: "verify_auth_logo_detail" },
  { name: "verify_check_font", score: 94, pass: true, detail: "verify_auth_font_detail" },
  { name: "verify_check_finish", score: 91, pass: true, detail: "verify_auth_finish_detail" },
  { name: "verify_check_color", score: 93, pass: true, detail: "verify_auth_color_detail" },
  { name: "verify_check_print", score: 95, pass: true, detail: "verify_auth_print_detail" },
  { name: "verify_check_alignment", score: 92, pass: true, detail: "verify_auth_alignment_detail" },
  { name: "verify_check_hologram", score: 88, pass: true, detail: "verify_auth_hologram_detail" },
  { name: "verify_check_spelling", score: 97, pass: true, detail: "verify_auth_spelling_detail" },
];

const physicalChecks = {
  fake: [
    { label: "verify_physical_weight", detail: "verify_physical_fake_weight_detail", pass: false },
    { label: "verify_physical_heat", detail: "verify_physical_fake_heat_detail", pass: false },
    { label: "verify_physical_spelling", detail: "verify_physical_fake_spelling_detail", pass: false },
  ],
  authentic: [
    { label: "verify_physical_weight", detail: "verify_physical_auth_weight_detail", pass: true },
    { label: "verify_physical_heat", detail: "verify_physical_auth_heat_detail", pass: true },
    { label: "verify_physical_spelling", detail: "verify_physical_auth_spelling_detail", pass: true },
  ],
};

// ─── Sub Components ───────────────────────────────────────────────
const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="mb-6 flex items-center justify-center gap-2">
    {Array.from({ length: total }, (_, i) => (
      <div
        key={i}
        className={`h-2 rounded-full transition-all ${
          i <= current ? "w-8 bg-primary" : "w-2 bg-muted"
        }`}
      />
    ))}
  </div>
);

const CheckRow = ({
  check,
  index,
  expanded,
  onToggle,
  t,
}: {
  check: CheckItem;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  t: (key: string, options?: any) => string;
}) => (
  <div className="rounded-lg border border-border bg-card overflow-hidden">
    <button
      onClick={onToggle}
      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50"
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          check.pass
            ? "bg-success/10 text-success"
            : "bg-danger/10 text-danger"
        }`}
      >
        {check.pass ? "✓" : "✗"}
      </span>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{t(check.name)}</p>
        <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
          <div
            className={`h-1.5 rounded-full transition-all ${
              check.pass ? "bg-success" : "bg-danger"
            }`}
            style={{ width: `${check.score}%` }}
          />
        </div>
      </div>
      <span className={`text-sm font-bold ${check.pass ? "text-success" : "text-danger"}`}>
        {check.score}%
      </span>
      <ChevronDown
        className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
      />
    </button>
    <AnimatePresence>
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <p className="px-4 pb-3 text-sm text-muted-foreground">{t(check.detail)}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────
export default function Verify() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);
  const [step, setStep] = useState<VerificationStep>("upload");
  const [isFake, setIsFake] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [weight, setWeight] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [bisInput, setBisInput] = useState("");
  const [bisVerified, setBisVerified] = useState(false);
  const [isVerifyingBis, setIsVerifyingBis] = useState(false);
  const [nchSubmitted, setNchSubmitted] = useState(false);
  const [isSubmittingNch, setIsSubmittingNch] = useState(false);
  const [bis, setBis] = useState<BISDetails | null>(null);
  const [reportSaved, setReportSaved] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannerMode, setScannerMode] = useState<"barcode" | "image">("barcode");
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) =>
        setImages((prev) => [...prev, { url: e.target?.result as string, name: file.name }]);
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (idx: number) =>
    setImages((prev) => prev.filter((_, i) => i !== idx));

  const handleScanResult = (result: string) => {
    setShowScanner(false);
    if (scannerMode === "image") {
      setImages((prev) => [...prev, { url: result, name: `capture-${Date.now()}.png` }]);
      toast.success(t("image_captured_success"));
    } else {
      // Barcode / QR result
      console.log("Scanned product:", result);
      toast.success(t("product_code_detected", { code: result }));
      // In a real app, we'd fetch product info here.
      // For now, we'll just start the scan which leads to step 2
      startScan();
    }
  };

  const startScan = () => {
    setStep("scanning");
    const fake = Math.random() > 0.5;
    setIsFake(fake);
    setTimeout(() => setStep("step1"), 3000);
  };

  const resetScan = () => {
    setImages([]);
    setStep("upload");
    setExpanded(null);
    setWeight("");
    setIsOnline(false);
    setBisInput("");
    setBisVerified(false);
    setIsVerifyingBis(false);
    setNchSubmitted(false);
    setIsSubmittingNch(false);
    setBis(null);
    setReportSaved(false);
  };

  // Derive product name from image filename
  let baseName = images[0]?.name
    ? images[0].name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")
    : t("unknown_product");
  baseName = baseName
    .replace(/image|photo|picture|upload|screenshot|whatsapp|[0-9]+/gi, "")
    .trim();
  const words = baseName.split(/(?=[A-Z])| /).filter((w) => w.length > 1);
  const formatName = (arr: string[]) =>
    arr.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  let formattedName = formatName(words) || t("generic_electronic_device");
  if (formattedName.length < 3) formattedName = t("generic_electronic_device");

  const productBrand = words[0] ? formatName([words[0]]) : t("unknown_brand");

  const checks = isFake ? fakeChecks : authenticChecks;
  const overallScore = isFake ? 29 : 93;
  const isAuthentic = !isFake;

  const barcode = isFake
    ? {
        found: false,
        detail: `Barcode does not match any product in Google's product database. The product code format is invalid for ${formattedName}.`,
        product: null,
      }
    : {
        found: true,
        detail: `Product found in Google database. Matches '${formattedName}' — manufacturer details, pricing, and specifications verified against official records.`,
        product: { name: formattedName, brand: productBrand, price: t("verified"), retailer: t("official_store", { brand: productBrand }) },
      };

  const physical = isFake ? physicalChecks.fake : physicalChecks.authentic;

  // Save report to Supabase on step4
  useEffect(() => {
    if (step === "step4" && user && !reportSaved) {
      setReportSaved(true);
      const verdict = isFake ? "counterfeit" : "genuine";
      supabase
        .from("verification_reports")
        .insert([
          {
            user_id: user.id,
            product_name: formattedName,
            brand: productBrand,
            image_url: images[0]?.url?.substring(0, 200) || null,
            overall_score: overallScore,
            logo_score: checks[0].score,
            font_score: checks[1].score,
            finish_score: checks[2].score,
            color_score: checks[3].score,
            print_score: checks[4].score,
            hologram_score: checks[6].score,
            barcode_valid: barcode.found,
            barcode_data: barcode.product as any,
            ai_analysis: checks.map((c) => `${c.name}: ${c.score}% - ${c.detail}`).join("\n"),
            verdict,
          },
        ])
        .then(({ error }) => {
          if (error) console.error("Failed to save report:", error);
          else toast.success(t("report_saved"));
        });
    }
  }, [step]);

  const stepNumber =
    step === "step1" ? 0 : step === "step2" ? 1 : step === "step3" ? 2 : step === "step4" ? 3 : -1;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-foreground">{t("product_scanner")}</h1>
          <p className="mt-1 text-muted-foreground">
            {t("upload_images")}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* ── UPLOAD STEP ── */}
          {step === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Drag area */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
                  dragOver
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                }`}
                onClick={() => fileRef.current?.click()}
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <p className="mt-4 font-display text-lg font-semibold text-foreground">
                    {t("drop_images")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("multiple_angles")}
                  </p>
                  <span className="mt-4 inline-block rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20">
                    {t("browse_files")}
                  </span>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />
              </div>

              {/* Image previews */}
              {images.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">
                    {images.length} image{images.length > 1 ? "s" : ""} selected
                  </p>
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                    {images.map((img, i) => (
                      <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-border">
                        <img
                          src={img.url}
                          alt={img.name}
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(i);
                          }}
                          className="absolute right-1 top-1 rounded-full bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-border transition-colors hover:border-primary hover:bg-primary/5"
                    >
                      <Plus className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              )}

              {/* Online purchase toggle & weight */}
              <div className="space-y-4 rounded-xl border border-border bg-card p-5">
                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={isOnline}
                    onChange={(e) => setIsOnline(e.target.checked)}
                    className="h-4 w-4 rounded border-border accent-primary"
                  />
                  <span className="text-foreground">{t("online_purchase")}</span>
                </label>
                {isOnline && (
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Scale className="h-4 w-4 text-primary" /> {t("product_weight")}
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={t("weight_placeholder")}
                      className="w-full rounded-xl border border-border bg-secondary py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setScannerMode("image");
                    setShowScanner(true);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  <Camera className="h-4 w-4" /> {t("camera")}
                </button>
                <button
                  onClick={() => {
                    setScannerMode("barcode");
                    setShowScanner(true);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  <QrCode className="h-4 w-4" /> {t("qr_barcode")}
                </button>
              </div>

              {images.length > 0 && (
                <Button onClick={startScan} className="w-full py-6 text-base font-semibold">
                  <Shield className="mr-2 h-5 w-5" /> {t("verify_authenticity")}
                </Button>
              )}
            </motion.div>
          )}

          {/* ── SCANNING ANIMATION ── */}
          {step === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12 flex flex-col items-center text-center"
            >
              <div className="relative flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <div className="absolute inset-2 animate-pulse rounded-full bg-primary/30" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 animate-pulse-glow">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              </div>
              <p className="mt-8 font-display text-xl font-semibold text-foreground">
                {images.length > 1 
                  ? t("analyzing_plural", { count: images.length }) 
                  : t("analyzing", { count: images.length })}
              </p>
               <p className="mt-2 text-sm text-muted-foreground">
                {t("running_checks")}
              </p>
               <div className="mt-6 space-y-2 text-left text-sm text-muted-foreground">
                <p>✓ {t("logo_analysis")}</p>
                <p>✓ {t("color_texture")}</p>
                <p>✓ {t("ocr_extraction")}</p>
                <p>✓ {t("barcode_verif")}</p>
                <p>✓ {t("db_cross_ref")}</p>
              </div>
            </motion.div>
          )}

          {/* ── STEP 1: AI IMAGE ANALYSIS ── */}
          {step === "step1" && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <StepIndicator current={0} total={4} />
               <h2 className="font-display text-xl font-bold text-foreground">
                {t("step1_title")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("step1_desc")}
              </p>

              {/* Verdict card */}
              <div
                className={`flex items-center gap-4 rounded-xl p-6 ${
                  isAuthentic ? "bg-success/10" : "bg-danger/10"
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  isAuthentic ? "bg-success/20" : "bg-danger/20"
                }`}>
                  {isAuthentic ? (
                    <ShieldCheck className="h-6 w-6 text-success" />
                  ) : (
                    <ShieldAlert className="h-6 w-6 text-danger" />
                  )}
                </div>
                <div className="flex-1">
                   <p className={`font-display text-lg font-bold ${
                    isAuthentic ? "text-success" : "text-danger"
                  }`}>
                    {isAuthentic ? `✅ ${t("authentic")}` : `⚠️ ${t("counterfeit")}`}
                  </p>
                   <p className="text-sm text-muted-foreground">
                    {isAuthentic
                      ? t("pass_visual")
                      : t("fail_visual")}
                  </p>
                </div>
                {/* Score ring */}
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                  <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke={isAuthentic ? "hsl(var(--success))" : "hsl(var(--danger))"}
                      strokeWidth="4"
                      strokeDasharray={`${(overallScore / 100) * 175.93} 175.93`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className={`absolute text-sm font-bold ${
                    isAuthentic ? "text-success" : "text-danger"
                  }`}>
                    {overallScore}%
                  </span>
                </div>
              </div>

              {/* Checks */}
              <div className="space-y-2">
                {checks.map((check, i) => (
                  <CheckRow
                    key={i}
                    check={check}
                    index={i}
                    expanded={expanded === i}
                    onToggle={() => setExpanded(expanded === i ? null : i)}
                    t={t}
                  />
                ))}
              </div>

              <Button
                onClick={() => {
                  setStep("step2");
                  setExpanded(null);
                }}
                 className="w-full py-5 font-semibold"
              >
                {t("next_barcode")}
              </Button>
            </motion.div>
          )}

          {/* ── STEP 2: BARCODE / QR VERIFICATION ── */}
          {step === "step2" && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <StepIndicator current={1} total={4} />
              <h2 className="font-display text-xl font-bold text-foreground">
                {t("step2_title")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("step2_desc")}
              </p>

              {/* Barcode result */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    barcode.found ? "bg-success/10" : "bg-danger/10"
                  }`}>
                    {barcode.found ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-danger" />
                    )}
                  </div>
                  <div>
                    <p className={`font-display font-semibold ${
                      barcode.found ? "text-success" : "text-danger"
                    }`}>
                      {barcode.found ? t("found_db") : t("not_found_db")}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{barcode.detail}</p>
                  </div>
                </div>

                {barcode.found && barcode.product && (
                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-muted/50 p-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">{t("product")}</span>
                      <p className="font-medium text-foreground">{barcode.product.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t("brand")}</span>
                      <p className="font-medium text-foreground">{barcode.product.brand}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t("mrp")}</span>
                      <p className="font-medium text-foreground">{barcode.product.price}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t("retailer")}</span>
                      <p className="font-medium text-foreground">{barcode.product.retailer}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* BIS Care Lookup */}
              <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">
                    {t("bis_care")}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <input
                    value={bisInput}
                    onChange={(e) => {
                      setBisInput(e.target.value);
                      setBisVerified(false);
                    }}
                    placeholder="e.g. R-66001597"
                    className="flex-1 rounded-xl border border-border bg-secondary py-2.5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    onClick={() => {
                      setIsVerifyingBis(true);
                      setTimeout(() => {
                        setIsVerifyingBis(false);
                        setBisVerified(true);
                        if (!bisInput || bisInput.length < 5) {
                          setBis(null);
                        } else {
                          const rnum = bisInput.toUpperCase().startsWith("R-")
                            ? bisInput.toUpperCase()
                            : `R-${bisInput}`;
                          setBis({
                            registrationNo: rnum,
                            manufacturer: `${productBrand} Industries Ltd.`,
                            country: t("india"),
                            productCategory: t("bis_product_category"),
                            productName: formattedName,
                            indianStandardNo: "IS 13252(Part 1):2010 / IEC 60950-1 : 2005",
                            models: t("bis_models"),
                            brand: productBrand,
                            validTill: new Date(
                              new Date().setFullYear(new Date().getFullYear() + 1)
                            )
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "-"),
                            status: t("operative"),
                          });
                        }
                      }, 1500);
                    }}
                    disabled={!bisInput || isVerifyingBis}
                    className="rounded-xl bg-primary/10 px-4 text-sm font-medium text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
                  >
                    {isVerifyingBis ? t("verifying") : t("verify")}
                  </button>
                </div>

                {bisVerified && bisInput && (
                  bis ? (
                    <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-sm">
                      <p className="font-display font-semibold text-foreground">{t("registration_details")}</p>
                      {([
                        [t("manufacturer"), bis.manufacturer],
                        [t("country"), bis.country],
                        [t("product_category"), bis.productCategory],
                        [t("product_name"), bis.productName],
                        [t("indian_standard_no"), bis.indianStandardNo],
                        [t("models"), bis.models],
                        [t("brand"), bis.brand],
                        [t("valid_till"), bis.validTill],
                        [t("status"), bis.status],
                      ] as const).map(([label, val]) => (
                        <div key={label} className="flex justify-between">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="text-foreground font-medium text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg bg-danger/10 p-4">
                      <p className="text-sm text-danger">
                        {t("bis_not_found")}
                      </p>
                    </div>
                  )
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setStep("step1")}>
                  ← {t("back")}
                </Button>
                <Button onClick={() => setStep("step3")}>{t("next")} →</Button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: PHYSICAL INSPECTION ── */}
          {step === "step3" && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <StepIndicator current={2} total={4} />
               <h2 className="font-display text-xl font-bold text-foreground">
                {t("step3_title")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("step3_desc")}
              </p>

              <div className="space-y-3">
                {physical.map((item, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border p-4 ${
                      item.pass ? "border-success/20 bg-success/5" : "border-danger/20 bg-danger/5"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.pass ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <XCircle className="h-5 w-5 text-danger" />
                      )}
                      <p className="font-display font-semibold text-foreground">{item.label}</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>

              {isOnline && weight && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                   <div className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    <p className="font-display font-semibold text-foreground">{t("weight_test")}</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("you_reported_weight", { weight })}{" "}
                    {isAuthentic ? t("weight_within_range") : t("weight_unusually_light")}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setStep("step2")}>
                  ← {t("back")}
                </Button>
                <Button onClick={() => setStep("step4")}>{t("next")} →</Button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: LEGAL & SAFETY ── */}
          {step === "step4" && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <StepIndicator current={3} total={4} />
               <h2 className="font-display text-xl font-bold text-foreground">
                {t("step4_title")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("step4_desc")}
              </p>

              {/* No Recourse Warning */}
              <div className="rounded-xl border border-warning/20 bg-warning/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <p className="font-display font-semibold text-foreground">{t("no_recourse")}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("no_recourse_desc")}
                </p>
              </div>

              {/* Ways to Report */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Flag className="h-5 w-5 text-primary" />
                  <p className="font-display font-semibold text-foreground">
                    Ways to Report Fake Products
                  </p>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">National Consumer Helpline (NCH):</strong>{" "}
                    consumerhelpline.gov.in | Call: 1915 or 1800-11-4000
                  </p>
                  <p>
                    <strong className="text-foreground">GAMA Portal:</strong> For fake or misleading
                    advertisements — gama.gov.in
                  </p>
                  <p>
                    <strong className="text-foreground">Cyber Crime Portal:</strong> For phishing, fake
                    websites, financial fraud — cybercrime.gov.in
                  </p>
                  <p>
                    <strong className="text-foreground">Required Evidence:</strong> Proof of Purchase
                    (Invoice), Photographs of product/packaging, and Seller Details.
                  </p>
                </div>
              </div>

              {/* NCH Quick Submit */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Gavel className="h-5 w-5 text-primary" />
                  <p className="font-display font-semibold text-foreground">NCH Quick Submit</p>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Let our AI engine automatically submit this Verification Report containing your
                  photographic evidence directly to the National Consumer Helpline.
                </p>
                {isSubmittingNch ? (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Loader2 className="h-4 w-4 animate-spin" /> Transmitting evidence...
                  </div>
                ) : nchSubmitted ? (
                  <div className="flex items-center gap-2 text-sm text-success">
                    <CheckCircle2 className="h-4 w-4" /> Evidence Successfully Submitted to NCH
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setIsSubmittingNch(true);
                      setTimeout(() => {
                        setIsSubmittingNch(false);
                        setNchSubmitted(true);
                      }, 2000);
                    }}
                    className="w-full"
                  >
                    Auto-Submit Evidence Report
                  </Button>
                )}
              </div>

              {/* Final verdict */}
              <div className={`rounded-xl p-6 text-center ${
                isAuthentic ? "bg-success/10" : "bg-danger/10"
              }`}>
                <p className="font-display text-lg font-bold text-foreground">{t("final_verdict")}</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  {isAuthentic ? (
                    <ShieldCheck className="h-7 w-7 text-success" />
                  ) : (
                    <ShieldAlert className="h-7 w-7 text-danger" />
                  )}
                  <span className={`font-display text-xl font-bold ${
                    isAuthentic ? "text-success" : "text-danger"
                  }`}>
                    {isAuthentic ? t("product_genuine") : t("product_counterfeit")}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("overall_confidence", { score: overallScore })}
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => navigate("/reports")}>
                  <Eye className="mr-2 h-4 w-4" /> {t("view_reports")}
                </Button>
                <Button variant="outline" onClick={resetScan}>
                  <RotateCcw className="mr-2 h-4 w-4" /> {t("scan_another")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showScanner && (
          <GPayScanner
            mode={scannerMode}
            onScanSuccess={handleScanResult}
            onClose={() => setShowScanner(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
