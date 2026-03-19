import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const enTranslation = {
      "product_scanner": "Product Scanner",
      "hero_title": "Detect Counterfeit Products Before You Buy",
      "hero_subtitle": "AI-Powered Product Verification",
      "hero_desc": "Upload product images, scan barcodes, and get instant AI-powered authenticity verification. Protect yourself from fake products in online and street markets.",
      "get_started": "Get Started",
      "start_verifying": "Start Verifying Free",
      "sign_in": "Sign In",
      "what_we_check": "What We Check",
      "safety_tips": "Safety & Legal Tips",
      "dashboard_title": "Dashboard",
      "reports_title": "Reports",
      "verify_product": "Verify Product",
      "sign_out": "Sign Out",
      "upload_images": "Upload 360° product images for comprehensive analysis",
      "drop_images": "Drop images here",
      "multiple_angles": "Upload multiple angles for 360° analysis",
      "browse_files": "Browse Files",
      "online_purchase": "This is an online purchase",
      "product_weight": "Product Weight (grams)",
      "camera": "Camera",
      "qr_barcode": "QR/Barcode",
      "verify_authenticity": "Verify Authenticity",
      "analyzing": "Analyzing {{count}} Image...",
      "analyzing_plural": "Analyzing {{count}} Images...",
      "running_checks": "Running AI verification checks across all angles",
      "logo_analysis": "Logo pattern analysis...",
      "color_texture": "Color & texture comparison...",
      "ocr_extraction": "OCR text extraction...",
      "barcode_verif": "Barcode & QR verification...",
      "db_cross_ref": "Cross-referencing database...",
      "step1_title": "Step 1: AI Image Analysis",
      "step1_desc": "Visual comparison against authentic product database",
      "authentic": "Authentic Product",
      "counterfeit": "Likely Counterfeit",
      "pass_visual": "Product passed all visual verification checks.",
      "fail_visual": "Product failed multiple visual verification checks.",
      "next_barcode": "Next: Barcode Verification →",
      "step2_title": "Step 2: Barcode & QR Verification",
      "step2_desc": "Cross-referencing product codes with Google database",
      "found_db": "Product Found in Database",
      "not_found_db": "Product Not Found",
      "product": "Product",
      "brand": "Brand",
      "mrp": "MRP",
      "retailer": "Retailer",
      "bis_care": "BIS Care - R-No. Verification",
      "verify": "Verify",
      "verifying": "Verifying...",
      "bis_not_found": "No BIS registration found. This product may not meet Indian safety standards.",
      "back": "Back",
      "next": "Next",
      "step3_title": "Step 3: Physical Inspection Guide",
      "step3_desc": "Immediate checks you can perform right now",
      "weight_test": "Weight Test",
      "step4_title": "Step 4: Legal & Safety Advisory",
      "step4_desc": "Important information about your consumer rights",
      "no_recourse": "No Recourse Warning",
      "no_recourse_desc": "Buying from an unregistered street vendor means you have no consumer rights if the product fails. Without a GST bill, you cannot file a complaint with the Consumer Forum.",
      "report_saved": "Report saved to your history",
      "scanning": "Scanning...",
      "align_barcode": "Align barcode within the frame",
      "view_reports": "View Reports",
      "scan_another": "Scan Another",
      "capture_image": "Point and capture product details"
      ,"weight_placeholder": "e.g. 250"
      ,"welcome_back": "Welcome back"
      ,"dashboard_subtitle": "Your product verification dashboard"
      ,"quick_verify_product": "Verify Product"
      ,"quick_analytics": "Analytics"
      ,"quick_view_reports": "View Reports"
      ,"quick_safety_guide": "Safety Guide"
      ,"stat_total_scans": "Total Scans"
      ,"stat_genuine": "Genuine"
      ,"stat_suspicious": "Suspicious"
      ,"stat_counterfeit": "Counterfeit"
      ,"recent_verifications": "Recent Verifications"
      ,"view_all": "View All"
      ,"no_verifications_yet": "No verifications yet"
      ,"no_verifications_subtitle": "Start by verifying your first product"
      ,"verify_a_product": "Verify a Product"
      ,"unknown_product": "Unknown Product"
      ,"unknown_brand": "Unknown Brand"
      ,"pending": "pending"
      ,"landing_suite_title": "Comprehensive Verification Suite"
      ,"landing_suite_subtitle": "Everything you need to identify counterfeit products"
      ,"landing_checks_subtitle": "Our AI performs deep analysis across multiple dimensions"
      ,"feature_ai_title": "AI Image Analysis"
      ,"feature_ai_desc": "Advanced computer vision detects visual inconsistencies in product packaging, logos, fonts, and labels."
      ,"feature_qr_title": "QR & Barcode Scan"
      ,"feature_qr_desc": "Instantly verify product authenticity through barcode and QR code validation against manufacturer databases."
      ,"feature_score_title": "Authenticity Score"
      ,"feature_score_desc": "Get a detailed confidence score with explanations for each verification check performed."
      ,"feature_analytics_title": "Analytics Dashboard"
      ,"feature_analytics_desc": "Track detection trends, reported brands, and verification statistics in real-time."
      ,"feature_report_title": "Report Counterfeits"
      ,"feature_report_desc": "Submit reports with evidence to help protect other consumers and brands."
      ,"feature_camera_title": "Live Camera Capture"
      ,"feature_camera_desc": "Use your device camera for real-time product scanning and instant results."
      ,"check_logo_title": "Logo & Design Clarity"
      ,"check_logo_desc": "Verifies logo sharpness, proportions, and correct brand design elements."
      ,"check_font_title": "Font & Label Analysis"
      ,"check_font_desc": "Checks font style, spacing, alignment and spelling on product labels."
      ,"check_weight_title": "Weight & Build Quality"
      ,"check_weight_desc": "For online products, weight comparison against genuine specifications."
      ,"check_hologram_title": "Hologram & Security Codes"
      ,"check_hologram_desc": "Validates 3D security holograms and scratch-and-verify codes."
      ,"tip_no_recourse_title": "No Recourse from Unregistered Vendors"
      ,"tip_no_recourse_desc": "Without a GST bill, you cannot file a complaint with the Consumer Forum. Always ask for a receipt."
      ,"tip_safety_hazards_title": "Safety Hazards"
      ,"tip_safety_hazards_desc": "Fake chargers or batteries are a leading cause of short circuits and phone explosions. Don't risk it."
      ,"tip_street_shopping_title": "Pro Tip for Street Shopping"
      ,"tip_street_shopping_desc": "If the vendor is mobile (selling from a cart) and has no permanent shop front, do not buy high-value electronics."
      ,"tip_heat_test_title": "The Heat Test"
      ,"tip_heat_test_desc": "If allowed to test, check if the device gets unusually hot within minutes. Genuine products have thermal protection."
      ,"login_subtitle": "Sign in to your account to continue"
      ,"email": "Email"
      ,"email_placeholder": "you@example.com"
      ,"password": "Password"
      ,"signing_in": "Signing in..."
      ,"no_account": "Don't have an account?"
      ,"sign_up": "Sign up"
      ,"login_right_title": "Protect Yourself from Fakes"
      ,"login_right_desc": "AI-powered verification to detect counterfeit products before you buy."
      ,"password_min_error": "Password must be at least 6 characters"
      ,"signup_success_toast": "Account created! Check your email to confirm, or sign in now."
      ,"signup_left_title": "Join TrustedLens"
      ,"signup_left_desc": "Start verifying products with AI-powered counterfeit detection technology."
      ,"signup_title": "Create your account"
      ,"signup_subtitle": "Start detecting counterfeit products today"
      ,"display_name": "Display Name"
      ,"display_name_placeholder": "Your name"
      ,"password_min_placeholder": "Min. 6 characters"
      ,"creating_account": "Creating account..."
      ,"create_account": "Create Account"
      ,"have_account": "Already have an account?"
      ,"not_found_title": "Oops! Page not found"
      ,"return_home": "Return to Home"
      ,"index_title": "Welcome to Your Blank App"
      ,"index_subtitle": "Start building your amazing project here!"
      ,"reports_page_title": "Verification Reports"
      ,"reports_page_subtitle": "History of all your product verifications"
      ,"no_reports_yet": "No reports yet"
      ,"no_reports_subtitle": "Verify a product to see results here"
      ,"delete_report_failed": "Failed to delete report"
      ,"delete_report_success": "Report deleted"
      ,"delete_report_title": "Delete Report"
      ,"delete_report_desc": "Are you sure you want to delete this verification report? This action cannot be undone."
      ,"cancel": "Cancel"
      ,"delete": "Delete"
      ,"guide_title": "Safety & Verification Guide"
      ,"guide_subtitle": "Physical inspection tips to identify counterfeit products"
      ,"guide_tip_logo_title": "Logo Clarity & Design"
      ,"guide_tip_logo_desc": "Genuine brand logos are crisp, well-proportioned, and perfectly centered. Counterfeits often have slightly distorted logos, wrong colors, or pixelated printing."
      ,"guide_tip_font_title": "Font & Spelling Check"
      ,"guide_tip_font_desc": "Look for spelling mistakes like 'Samsvng' or 'Abibas'. Check if fonts match the brand's official style. Blurry or uneven text is a red flag."
      ,"guide_tip_finish_title": "Finish & Build Quality"
      ,"guide_tip_finish_desc": "Look for uneven gaps, rough surface finishes, or loose buttons. Genuine brands have meticulous finishing that is hard for counterfeiters to replicate."
      ,"guide_tip_weight_title": "The Weight Test"
      ,"guide_tip_weight_desc": "Authentic electronics feel densely packed and heavier than fakes, which often use hollow plastic or sand-filled batteries to mimic weight."
      ,"guide_tip_heat_title": "Heat & Performance Test"
      ,"guide_tip_heat_desc": "If allowed to test, check if the device gets unusually hot within minutes. Genuine products have thermal protection circuits; fakes do not."
      ,"guide_tip_hologram_title": "Hologram & Scratch Codes"
      ,"guide_tip_hologram_desc": "Look for 3D security holograms that shift color at angles. Verify scratch-and-verify codes on the brand's official website. Sticker-like holograms = fake."
      ,"guide_tip_street_title": "Street Shopping Pro Tip"
      ,"guide_tip_street_desc": "If the vendor is mobile (cart or sheet on the ground) with no permanent shop, do NOT buy high-value electronics. If it fails 5 minutes later, the vendor may have moved."
      ,"guide_tip_legal_title": "Legal & Safety Warning"
      ,"guide_tip_legal_desc": "Without a GST bill, you cannot file a consumer complaint. Fake chargers/batteries are a leading cause of short circuits and phone explosions. A 'good deal' on a fake is never worth the risk."
      ,"scanner_title_qr": "Scan QR Code"
      ,"scanner_title_camera": "Scan with Camera"
      ,"toggle_flash": "Toggle flash"
      ,"close_scanner": "Close scanner"
      ,"scanner_hint_qr": "Point your QR code at the scanner"
      ,"scanner_hint_capture": "Point and capture product details"
      ,"enable_camera": "Enable camera"
      ,"try_again": "Try again"
      ,"camera_timeout": "Could not start camera (timeout). Try again."
      ,"camera_off": "Camera is off. Click “Enable camera” to start."
      ,"camera_permission_denied_settings": "Camera permission denied. Please allow camera access in your browser settings."
      ,"camera_in_use": "Camera is already in use by another tab/app. Close other camera apps and try again."
      ,"camera_start_failed": "Could not start the camera. It may be busy or failing to initialize."
      ,"camera_permission_denied": "Camera permission denied. Please allow camera access and try again."
      ,"no_camera_found": "No camera found on this device."
      ,"no_camera_detected": "No camera detected on this device."
      ,"camera_access_failed": "Could not access camera. Please check permissions."
      ,"image_captured_success": "Image captured successfully"
      ,"product_code_detected": "Product code detected: {{code}}"
      ,"generic_electronic_device": "Generic Electronic Device"
      ,"india": "India"
      ,"operative": "Operative"
      ,"verify_check_logo": "Logo Clarity & Design"
      ,"verify_check_font": "Font Style & Label Spacing"
      ,"verify_check_finish": "Finish & Build Quality"
      ,"verify_check_color": "Color Consistency"
      ,"verify_check_print": "Printing Quality"
      ,"verify_check_alignment": "Label Alignment"
      ,"verify_check_hologram": "Hologram & Security Codes"
      ,"verify_check_spelling": "Spelling & Text Errors"
      ,"verify_fake_logo_detail": "Logo does not match known brand references. Significant distortion and color mismatch detected."
      ,"verify_fake_font_detail": "Font face differs from authentic product. Incorrect kerning and line spacing on labels."
      ,"verify_fake_finish_detail": "Uneven gaps, rough surface finishes detected. Build quality inconsistent with genuine product."
      ,"verify_fake_color_detail": "Color palette deviates significantly from authentic brand packaging."
      ,"verify_fake_print_detail": "Low-resolution printing with visible dot patterns. Authentic brands use high-quality offset printing."
      ,"verify_fake_alignment_detail": "Labels are misaligned by 2-3mm. Stickers appear to be manually applied."
      ,"verify_fake_hologram_detail": "No valid hologram detected. Scratch code does not link to any official verification page."
      ,"verify_fake_spelling_detail": "Multiple spelling errors found. Blurry text printing detected."
      ,"verify_auth_logo_detail": "Brand logo matches reference with 96% similarity using ORB feature matching."
      ,"verify_auth_font_detail": "Font style and spacing match authentic product references perfectly."
      ,"verify_auth_finish_detail": "Meticulous finishing with even gaps and smooth surfaces consistent with genuine manufacturing."
      ,"verify_auth_color_detail": "Color distribution matches authentic product packaging within acceptable tolerance."
      ,"verify_auth_print_detail": "High-quality printing with sharp edges and consistent ink density."
      ,"verify_auth_alignment_detail": "All labels precisely aligned within 0.5mm tolerance."
      ,"verify_auth_hologram_detail": "3D security hologram verified. Scratch code links to official brand verification page."
      ,"verify_auth_spelling_detail": "All text verified. No spelling errors or font mismatches detected."
      ,"verify_physical_weight": "Weight & Density"
      ,"verify_physical_heat": "Heat & Performance"
      ,"verify_physical_spelling": "Spelling & Fonts"
      ,"verify_physical_fake_weight_detail": "Product feels unusually light and hollow. Genuine electronics feel densely packed — fakes use hollow plastic or sand-filled components."
      ,"verify_physical_fake_heat_detail": "Device gets hot within 2 minutes. Genuine products have thermal protection — fakes do not."
      ,"verify_physical_fake_spelling_detail": "Found branding inconsistencies. Logos are not centered. Blurry printing detected."
      ,"verify_physical_auth_weight_detail": "Product weight is consistent with manufacturer specifications. Dense, well-built construction."
      ,"verify_physical_auth_heat_detail": "Normal operating temperature after 10 minutes. Thermal protection is functioning."
      ,"verify_physical_auth_spelling_detail": "All branding is correctly spelled with crisp, centered logos and clear printing."
      ,"verified": "Verified"
      ,"official_store": "Official {{brand}} Store"
      ,"bis_product_category": "Household & Similar Electrical Appliances"
      ,"bis_models": "Model-X1, Core-Series, Advanced-Edition"
      ,"registration_details": "Registration Details"
      ,"manufacturer": "Manufacturer"
      ,"country": "Country"
      ,"product_category": "Product Category"
      ,"product_name": "Product Name"
      ,"indian_standard_no": "Indian Standard No."
      ,"models": "Models"
      ,"status": "Status"
      ,"you_reported_weight": "You reported {{weight}}g."
      ,"weight_within_range": "This is within the expected weight range for this product."
      ,"weight_unusually_light": "This weight seems unusually light for this product category. Authentic products are typically heavier due to quality materials."
      ,"final_verdict": "Final Verdict"
      ,"product_genuine": "Product appears GENUINE"
      ,"product_counterfeit": "Product is likely COUNTERFEIT"
      ,"overall_confidence": "Overall confidence: {{score}}%"
};

const resources = {
  en: { translation: enTranslation },
  hi: {
    translation: {
      "product_scanner": "उत्पाद स्कैनर",
      "hero_title": "खरीदने से पहले नकली उत्पादों का पता लगाएं",
      "hero_subtitle": "AI-आधारित उत्पाद सत्यापन",
      "hero_desc": "उत्पाद चित्र अपलोड करें, बारकोड स्कैन करें और तत्काल AI-आधारित प्रामाणिकता सत्यापन प्राप्त करें। ऑनलाइन और सड़क बाजारों में नकली उत्पादों से खुद को बचाएं।",
      "get_started": "शुरू करें",
      "start_verifying": "मुफ्त सत्यापन शुरू करें",
      "sign_in": "साइन इन करें",
      "what_we_check": "हम क्या जाँचते हैं",
      "safety_tips": "सुरक्षा और कानूनी सुझाव",
      "dashboard_title": "डैशबोर्ड",
      "reports_title": "रिपोर्ट",
      "verify_product": "उत्पाद सत्यापित करें",
      "sign_out": "साइन आउट",
      "upload_images": "व्यापक विश्लेषण के लिए 360° उत्पाद चित्र अपलोड करें",
      "drop_images": "चित्र यहाँ छोड़ें",
      "multiple_angles": "360° विश्लेषण के लिए विभिन्न कोणों से अपलोड करें",
      "browse_files": "फ़ाइलें ब्राउज़ करें",
      "online_purchase": "यह एक ऑनलाइन खरीद है",
      "product_weight": "उत्पाद का वजन (ग्राम)",
      "camera": "कैमरा",
      "qr_barcode": "QR/बारकोड",
      "verify_authenticity": "प्रामाणिकता सत्यापित करें",
      "analyzing": "{{count}} चित्र का विश्लेषण किया जा रहा है...",
      "analyzing_plural": "{{count}} चित्रों का विश्लेषण किया जा रहा है...",
      "running_checks": "सभी कोणों पर AI सत्यापन जाँच चल रही है",
      "logo_analysis": "लोगो पैटर्न विश्लेषण...",
      "color_texture": "रंग और बनावट की तुलना...",
      "ocr_extraction": "OCR टेक्स्ट निष्कर्षण...",
      "barcode_verif": "बारकोड और QR सत्यापन...",
      "db_cross_ref": "डेटाबेस क्रॉस-रेफरेंसिंग...",
      "step1_title": "चरण 1: AI चित्र विश्लेषण",
      "step1_desc": "प्रामाणिक उत्पाद डेटाबेस के खिलाफ दृश्य तुलना",
      "authentic": "प्रामाणिक उत्पाद",
      "counterfeit": "संभावित नकली",
      "pass_visual": "उत्पाद ने सभी दृश्य सत्यापन परीक्षण पास कर लिए हैं।",
      "fail_visual": "उत्पाद कई दृश्य सत्यापन परीक्षणों में विफल रहा।",
      "next_barcode": "अगला: बारकोड सत्यापन →",
      "step2_title": "चरण 2: बारकोड और QR सत्यापन",
      "step2_desc": "Google डेटाबेस के साथ उत्पाद कोड का सत्यापन",
      "found_db": "डेटाबेस में उत्पाद मिला",
      "not_found_db": "उत्पाद नहीं मिला",
      "product": "उत्पाद",
      "brand": "ब्रांड",
      "mrp": "MRP",
      "retailer": "विक्रेता",
      "bis_care": "BIS केयर - R-No. सत्यापन",
      "verify": "सत्यापित करें",
      "verifying": "सत्यापित किया जा रहा है...",
      "bis_not_found": "कोई BIS पंजीकरण नहीं मिला। यह उत्पाद भारतीय सुरक्षा मानकों को पूरा नहीं कर सकता है।",
      "back": "पीछे",
      "next": "अगला",
      "step3_title": "चरण 3: भौतिक निरीक्षण मार्गदर्शिका",
      "step3_desc": "तत्काल जाँच जो आप अभी कर सकते हैं",
      "weight_test": "वजन परीक्षण",
      "step4_title": "चरण 4: कानूनी और सुरक्षा सलाह",
      "step4_desc": "आपके उपभोक्ता अधिकारों के बारे में महत्वपूर्ण जानकारी",
      "no_recourse": "कोई सहारा नहीं चेतावनी",
      "no_recourse_desc": "एक अपंजीकृत सड़क विक्रेता से खरीदने का मतलब है कि उत्पाद विफल होने पर आपके पास कोई उपभोक्ता अधिकार नहीं है। जीएसटी बिल के बिना, आप उपभोक्ता फोरम में शिकायत दर्ज नहीं कर सकते।",
      "report_saved": "रिपोर्ट आपके इतिहास में सहेजी गई",
      "scanning": "स्कैनिंग...",
      "align_barcode": "बारकोड को फ्रेम के भीतर संरेखित करें",
      "view_reports": "रिपोर्ट देखें",
      "scan_another": "एक और स्कैन करें",
      "capture_image": "उत्पाद विवरण कैप्चर करें"
      ,"weight_placeholder": "जैसे 250"
      ,"welcome_back": "वापसी पर स्वागत है"
      ,"dashboard_subtitle": "आपका उत्पाद सत्यापन डैशबोर्ड"
      ,"quick_verify_product": "उत्पाद सत्यापित करें"
      ,"quick_analytics": "विश्लेषण"
      ,"quick_view_reports": "रिपोर्ट देखें"
      ,"quick_safety_guide": "सुरक्षा मार्गदर्शिका"
      ,"stat_total_scans": "कुल स्कैन"
      ,"stat_genuine": "असली"
      ,"stat_suspicious": "संदिग्ध"
      ,"stat_counterfeit": "नकली"
      ,"recent_verifications": "हाल की सत्यापन"
      ,"view_all": "सभी देखें"
      ,"no_verifications_yet": "अभी तक कोई सत्यापन नहीं"
      ,"no_verifications_subtitle": "अपने पहले उत्पाद को सत्यापित करके शुरू करें"
      ,"verify_a_product": "एक उत्पाद सत्यापित करें"
      ,"unknown_product": "अज्ञात उत्पाद"
      ,"unknown_brand": "अज्ञात ब्रांड"
      ,"pending": "लंबित"
      ,"landing_suite_title": "समग्र सत्यापन सूट"
      ,"landing_suite_subtitle": "नकली उत्पाद पहचानने के लिए सब कुछ"
      ,"landing_checks_subtitle": "हमारा AI कई आयामों पर गहन विश्लेषण करता है"
      ,"feature_ai_title": "AI छवि विश्लेषण"
      ,"feature_ai_desc": "उन्नत कंप्यूटर विज़न पैकेजिंग, लोगो, फॉन्ट और लेबल में असंगतियाँ पहचानता है।"
      ,"feature_qr_title": "QR और बारकोड स्कैन"
      ,"feature_qr_desc": "बारकोड/QR कोड को डेटाबेस के साथ सत्यापित करके प्रामाणिकता जाँचें।"
      ,"feature_score_title": "प्रामाणिकता स्कोर"
      ,"feature_score_desc": "हर जाँच के स्पष्टीकरण के साथ विस्तृत स्कोर प्राप्त करें।"
      ,"feature_analytics_title": "एनालिटिक्स डैशबोर्ड"
      ,"feature_analytics_desc": "रुझानों, रिपोर्टेड ब्रांड्स और आँकड़ों को ट्रैक करें।"
      ,"feature_report_title": "नकली उत्पाद रिपोर्ट करें"
      ,"feature_report_desc": "अन्य उपभोक्ताओं की सुरक्षा के लिए साक्ष्य सहित रिपोर्ट सबमिट करें।"
      ,"feature_camera_title": "लाइव कैमरा कैप्चर"
      ,"feature_camera_desc": "रीयल-टाइम स्कैनिंग और त्वरित परिणामों के लिए कैमरा उपयोग करें।"
      ,"check_logo_title": "लोगो और डिज़ाइन स्पष्टता"
      ,"check_logo_desc": "लोगो की तीक्ष्णता, अनुपात और सही डिज़ाइन तत्वों की जाँच।"
      ,"check_font_title": "फॉन्ट और लेबल विश्लेषण"
      ,"check_font_desc": "लेबल पर फॉन्ट, स्पेसिंग, संरेखण और वर्तनी जाँचता है।"
      ,"check_weight_title": "वजन और बिल्ड क्वालिटी"
      ,"check_weight_desc": "ऑनलाइन उत्पादों के लिए वजन की तुलना स्पेसिफिकेशन से।"
      ,"check_hologram_title": "होलोग्राम और सुरक्षा कोड"
      ,"check_hologram_desc": "3D होलोग्राम और स्क्रैच-एंड-वेरिफाई कोड का सत्यापन।"
      ,"tip_no_recourse_title": "अपंजीकृत विक्रेताओं से कोई सहारा नहीं"
      ,"tip_no_recourse_desc": "GST बिल के बिना आप उपभोक्ता फोरम में शिकायत नहीं कर सकते। रसीद जरूर लें।"
      ,"tip_safety_hazards_title": "सुरक्षा जोखिम"
      ,"tip_safety_hazards_desc": "नकली चार्जर/बैटरी शॉर्ट सर्किट और विस्फोट का कारण बन सकते हैं।"
      ,"tip_street_shopping_title": "स्ट्रीट शॉपिंग टिप"
      ,"tip_street_shopping_desc": "मोबाइल विक्रेता से उच्च-मूल्य इलेक्ट्रॉनिक्स न खरीदें।"
      ,"tip_heat_test_title": "हीट टेस्ट"
      ,"tip_heat_test_desc": "टेस्ट करने पर देखें कि डिवाइस जल्दी गर्म तो नहीं हो रहा।"
      ,"login_subtitle": "जारी रखने के लिए अपने खाते में साइन इन करें"
      ,"email": "ईमेल"
      ,"email_placeholder": "you@example.com"
      ,"password": "पासवर्ड"
      ,"signing_in": "साइन इन हो रहा है..."
      ,"no_account": "खाता नहीं है?"
      ,"sign_up": "साइन अप"
      ,"login_right_title": "नकली से खुद को बचाएं"
      ,"login_right_desc": "खरीदने से पहले नकली उत्पाद पहचानने के लिए AI-आधारित सत्यापन।"
      ,"password_min_error": "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए"
      ,"signup_success_toast": "खाता बन गया! पुष्टि के लिए ईमेल देखें, या अभी साइन इन करें।"
      ,"signup_left_title": "TrustedLens से जुड़ें"
      ,"signup_left_desc": "AI-आधारित नकली पहचान तकनीक के साथ उत्पाद सत्यापन शुरू करें।"
      ,"signup_title": "अपना खाता बनाएं"
      ,"signup_subtitle": "आज ही नकली उत्पाद पहचानना शुरू करें"
      ,"display_name": "डिस्प्ले नाम"
      ,"display_name_placeholder": "आपका नाम"
      ,"password_min_placeholder": "कम से कम 6 अक्षर"
      ,"creating_account": "खाता बनाया जा रहा है..."
      ,"create_account": "खाता बनाएं"
      ,"have_account": "पहले से खाता है?"
      ,"not_found_title": "उफ़! पेज नहीं मिला"
      ,"return_home": "होम पर लौटें"
      ,"index_title": "आपके खाली ऐप में स्वागत है"
      ,"index_subtitle": "अपना शानदार प्रोजेक्ट बनाना शुरू करें!"
      ,"reports_page_title": "सत्यापन रिपोर्ट"
      ,"reports_page_subtitle": "आपके सभी उत्पाद सत्यापन का इतिहास"
      ,"no_reports_yet": "अभी तक कोई रिपोर्ट नहीं"
      ,"no_reports_subtitle": "यहाँ परिणाम देखने के लिए उत्पाद सत्यापित करें"
      ,"delete_report_failed": "रिपोर्ट हटाने में विफल"
      ,"delete_report_success": "रिपोर्ट हटाई गई"
      ,"delete_report_title": "रिपोर्ट हटाएं"
      ,"delete_report_desc": "क्या आप वाकई इस सत्यापन रिपोर्ट को हटाना चाहते हैं? यह कार्रवाई वापस नहीं ली जा सकती।"
      ,"cancel": "रद्द करें"
      ,"delete": "हटाएं"
      ,"guide_title": "सुरक्षा और सत्यापन मार्गदर्शिका"
      ,"guide_subtitle": "नकली उत्पाद पहचानने के लिए भौतिक निरीक्षण सुझाव"
      ,"guide_tip_logo_title": "लोगो स्पष्टता और डिज़ाइन"
      ,"guide_tip_logo_desc": "असली ब्रांड लोगो साफ, संतुलित और केंद्रित होते हैं। नकली में अक्सर विकृति, गलत रंग या पिक्सेलेटेड प्रिंटिंग होती है।"
      ,"guide_tip_font_title": "फॉन्ट और वर्तनी जाँच"
      ,"guide_tip_font_desc": "'Samsvng' या 'Abibas' जैसी गलतियाँ देखें। फॉन्ट ब्रांड स्टाइल से मेल खाता है या नहीं जाँचें। धुंधला/असमान टेक्स्ट रेड फ्लैग है।"
      ,"guide_tip_finish_title": "फिनिश और बिल्ड क्वालिटी"
      ,"guide_tip_finish_desc": "असमान गैप, खुरदरी फिनिश या ढीले बटन देखें। असली उत्पादों की फिनिश बहुत सटीक होती है।"
      ,"guide_tip_weight_title": "वजन परीक्षण"
      ,"guide_tip_weight_desc": "असली इलेक्ट्रॉनिक्स भारी और घनी लगती हैं। नकली अक्सर खोखला प्लास्टिक या वजन नकल करने के लिए भराव उपयोग करते हैं।"
      ,"guide_tip_heat_title": "हीट और परफॉर्मेंस टेस्ट"
      ,"guide_tip_heat_desc": "टेस्ट की अनुमति हो तो देखें कि डिवाइस जल्दी असामान्य गर्म तो नहीं हो रहा। असली में थर्मल प्रोटेक्शन होता है।"
      ,"guide_tip_hologram_title": "होलोग्राम और स्क्रैच कोड"
      ,"guide_tip_hologram_desc": "3D होलोग्राम देखें जो एंगल बदलने पर रंग बदलता है। स्क्रैच-एंड-वेरिफाई कोड आधिकारिक वेबसाइट पर जाँचें। स्टिकर जैसा होलोग्राम = नकली।"
      ,"guide_tip_street_title": "स्ट्रीट शॉपिंग प्रो टिप"
      ,"guide_tip_street_desc": "यदि विक्रेता मोबाइल है और स्थायी दुकान नहीं है, तो महंगे इलेक्ट्रॉनिक्स न खरीदें।"
      ,"guide_tip_legal_title": "कानूनी और सुरक्षा चेतावनी"
      ,"guide_tip_legal_desc": "GST बिल के बिना आप उपभोक्ता शिकायत नहीं कर सकते। नकली चार्जर/बैटरी शॉर्ट सर्किट और विस्फोट का कारण बन सकते हैं।"
      ,"scanner_title_qr": "QR कोड स्कैन करें"
      ,"scanner_title_camera": "कैमरे से स्कैन करें"
      ,"toggle_flash": "फ्लैश टॉगल करें"
      ,"close_scanner": "स्कैनर बंद करें"
      ,"scanner_hint_qr": "अपने QR कोड को स्कैनर के सामने रखें"
      ,"scanner_hint_capture": "उत्पाद विवरण कैप्चर करें"
      ,"enable_camera": "कैमरा चालू करें"
      ,"try_again": "फिर से प्रयास करें"
      ,"camera_timeout": "कैमरा शुरू नहीं हो सका (timeout)। फिर से प्रयास करें।"
      ,"camera_off": "कैमरा बंद है। शुरू करने के लिए “कैमरा चालू करें” दबाएँ।"
      ,"camera_permission_denied_settings": "कैमरा अनुमति अस्वीकृत। ब्राउज़र सेटिंग में कैमरा अनुमति दें।"
      ,"camera_in_use": "कैमरा किसी अन्य टैब/ऐप द्वारा उपयोग में है। अन्य कैमरा ऐप बंद करके फिर प्रयास करें।"
      ,"camera_start_failed": "कैमरा शुरू नहीं हो सका। यह व्यस्त हो सकता है या प्रारंभ नहीं हो रहा।"
      ,"camera_permission_denied": "कैमरा अनुमति अस्वीकृत। अनुमति देकर फिर प्रयास करें।"
      ,"no_camera_found": "इस डिवाइस पर कोई कैमरा नहीं मिला।"
      ,"no_camera_detected": "इस डिवाइस पर कैमरा नहीं मिला।"
      ,"camera_access_failed": "कैमरा एक्सेस नहीं हो सका। कृपया अनुमति जाँचें।"
    }
  },
  // Major Indian languages (fallback to English until translated).
  ta: {
    translation: {
      "product_scanner": "தயாரிப்பு ஸ்கேனர்",
      "dashboard_title": "டாஷ்போர்டு",
      "reports_title": "அறிக்கைகள்",
      "verify_product": "தயாரிப்பை சரிபார்",
      "sign_in": "உள்நுழை",
      "get_started": "தொடங்குங்கள்",
      "camera": "கேமரா",
      "qr_barcode": "QR/பார்கோடு",
      "verify_authenticity": "நம்பகத்தன்மையை சரிபார்",
    },
  }, // Tamil
  te: {
    translation: {
      "product_scanner": "ఉత్పత్తి స్కానర్",
      "hero_title": "కొనుగోలు ముందు నకిలీ ఉత్పత్తులను గుర్తించండి",
      "hero_subtitle": "AI ఆధారిత ఉత్పత్తి ధృవీకరణ",
      "hero_desc": "ఉత్పత్తి చిత్రాలు అప్లోడ్ చేయండి, బార్‌కోడ్‌లను స్కాన్ చేయండి, వెంటనే AI ఆధారిత ప్రామాణికత ఫలితాలు పొందండి. ఆన్లైన్ మరియు వీధి మార్కెట్లలో నకిలీల నుంచి రక్షించుకోండి.",
      "get_started": "ప్రారంభించండి",
      "start_verifying": "ఉచితంగా ధృవీకరించడం ప్రారంభించండి",
      "sign_in": "సైన్ ఇన్",
      "what_we_check": "మేము ఏమి పరిశీలిస్తాము",
      "safety_tips": "భద్రత & చట్టపరమైన సూచనలు",
      "dashboard_title": "డాష్‌బోర్డ్",
      "reports_title": "నివేదికలు",
      "verify_product": "ఉత్పత్తి ధృవీకరణ",
      "sign_out": "సైన్ అవుట్",
      "upload_images": "సమగ్ర విశ్లేషణ కోసం 360° ఉత్పత్తి చిత్రాలు అప్లోడ్ చేయండి",
      "drop_images": "ఇక్కడ చిత్రాలను వదలండి",
      "multiple_angles": "360° విశ్లేషణ కోసం అనేక కోణాల నుంచి అప్లోడ్ చేయండి",
      "browse_files": "ఫైళ్లను బ్రౌజ్ చేయండి",
      "online_purchase": "ఇది ఆన్లైన్ కొనుగోలు",
      "product_weight": "ఉత్పత్తి బరువు (గ్రాములు)",
      "weight_placeholder": "ఉదా: 250",
      "camera": "క్యామెరా",
      "qr_barcode": "QR/బార్‌కోడ్",
      "verify_authenticity": "ప్రామాణికతను ధృవీకరించండి",
      "analyzing": "{{count}} చిత్రాన్ని విశ్లేషిస్తున్నాం...",
      "analyzing_plural": "{{count}} చిత్రాలను విశ్లేషిస్తున్నాం...",
      "running_checks": "అన్ని కోణాల్లో AI ధృవీకరణ చెక్స్ నడుస్తున్నాయి",
      "logo_analysis": "లోగో నమూనా విశ్లేషణ...",
      "color_texture": "రంగు & టెక్స్చర్ పోలిక...",
      "ocr_extraction": "OCR టెక్స్ట్ వెలికితీత...",
      "barcode_verif": "బార్‌కోడ్ & QR ధృవీకరణ...",
      "db_cross_ref": "డేటాబేస్‌తో క్రాస్-రిఫరెన్స్...",
      "step1_title": "దశ 1: AI చిత్రం విశ్లేషణ",
      "step1_desc": "అసలైన ఉత్పత్తి డేటాబేస్‌తో దృశ్య పోలిక",
      "authentic": "అసలైన ఉత్పత్తి",
      "counterfeit": "నకిలీ అయ్యే అవకాశం",
      "pass_visual": "ఉత్పత్తి అన్ని దృశ్య చెక్స్‌ను దాటింది.",
      "fail_visual": "ఉత్పత్తి అనేక దృశ్య చెక్స్‌లో విఫలమైంది.",
      "next_barcode": "తదుపరి: బార్‌కోడ్ ధృవీకరణ →",
      "step2_title": "దశ 2: బార్‌కోడ్ & QR ధృవీకరణ",
      "step2_desc": "ఉత్పత్తి కోడ్‌లను డేటాబేస్‌తో పోల్చడం",
      "found_db": "డేటాబేస్‌లో ఉత్పత్తి దొరికింది",
      "not_found_db": "ఉత్పత్తి దొరకలేదు",
      "product": "ఉత్పత్తి",
      "brand": "బ్రాండ్",
      "mrp": "MRP",
      "retailer": "రిటైలర్",
      "bis_care": "BIS కేర్ - R-No. ధృవీకరణ",
      "verify": "ధృవీకరించండి",
      "verifying": "ధృవీకరిస్తున్నాం...",
      "bis_not_found": "BIS నమోదు దొరకలేదు. ఈ ఉత్పత్తి భారత భద్రతా ప్రమాణాలకు సరిపోకపోవచ్చు.",
      "back": "వెనుకకు",
      "next": "తదుపరి",
      "step3_title": "దశ 3: భౌతిక పరిశీలన గైడ్",
      "step3_desc": "ఇప్పుడే చేయగల తక్షణ చెక్స్",
      "weight_test": "బరువు పరీక్ష",
      "step4_title": "దశ 4: చట్ట & భద్రతా సూచనలు",
      "step4_desc": "మీ వినియోగదారుల హక్కులపై ముఖ్య సమాచారం",
      "no_recourse": "సహాయం లేని పరిస్థితి హెచ్చరిక",
      "no_recourse_desc": "GST బిల్లు లేకపోతే వినియోగదారుల ఫోరంలో ఫిర్యాదు చేయలేరు. రసీదును తప్పక అడగండి.",
      "report_saved": "నివేదిక మీ చరిత్రలో సేవ్ అయింది",
      "scanning": "స్కాన్ చేస్తున్నాం...",
      "align_barcode": "ఫ్రేమ్‌లో బార్‌కోడ్‌ను సరిగ్గా అమర్చండి",
      "view_reports": "నివేదికలు చూడండి",
      "scan_another": "మరోసారి స్కాన్ చేయండి",
      "capture_image": "ఉత్పత్తి వివరాలను క్యాప్చర్ చేయండి",

      "welcome_back": "మళ్లీ స్వాగతం",
      "dashboard_subtitle": "మీ ఉత్పత్తి ధృవీకరణ డాష్‌బోర్డ్",
      "quick_verify_product": "ఉత్పత్తిని ధృవీకరించండి",
      "quick_analytics": "విశ్లేషణ",
      "quick_view_reports": "నివేదికలు చూడండి",
      "quick_safety_guide": "భద్రతా గైడ్",
      "stat_total_scans": "మొత్తం స్కాన్లు",
      "stat_genuine": "అసలు",
      "stat_suspicious": "అనుమానాస్పదం",
      "stat_counterfeit": "నకిలీ",
      "recent_verifications": "ఇటీవలి ధృవీకరణలు",
      "view_all": "అన్నీ చూడండి",
      "no_verifications_yet": "ఇంకా ధృవీకరణలు లేవు",
      "no_verifications_subtitle": "మొదటి ఉత్పత్తిని ధృవీకరించడం ద్వారా ప్రారంభించండి",
      "verify_a_product": "ఒక ఉత్పత్తిని ధృవీకరించండి",
      "unknown_product": "తెలియని ఉత్పత్తి",
      "unknown_brand": "తెలియని బ్రాండ్",
      "pending": "పెండింగ్",

      "landing_suite_title": "సమగ్ర ధృవీకరణ సూట్",
      "landing_suite_subtitle": "నకిలీ ఉత్పత్తులను గుర్తించడానికి కావాల్సిన అన్నీ",
      "landing_checks_subtitle": "మా AI అనేక అంశాల్లో లోతైన విశ్లేషణ చేస్తుంది",
      "feature_ai_title": "AI చిత్రం విశ్లేషణ",
      "feature_ai_desc": "ప్యాకేజింగ్, లోగోలు, ఫాంట్లు, లేబుళ్లలో అసమానతలను కంప్యూటర్ విజన్ గుర్తిస్తుంది.",
      "feature_qr_title": "QR & బార్‌కోడ్ స్కాన్",
      "feature_qr_desc": "బార్‌కోడ్/QR కోడ్‌లను డేటాబేస్‌తో ధృవీకరించి వెంటనే ప్రామాణికతను తెలుసుకోండి.",
      "feature_score_title": "ప్రామాణికత స్కోర్",
      "feature_score_desc": "ప్రతి చెక్ వివరణతో వివరమైన నమ్మకం స్కోర్ పొందండి.",
      "feature_analytics_title": "విశ్లేషణ డాష్‌బోర్డ్",
      "feature_analytics_desc": "ట్రెండ్‌లు, నివేదించిన బ్రాండ్‌లు, ధృవీకరణ గణాంకాలను ట్రాక్ చేయండి.",
      "feature_report_title": "నకిలీలను నివేదించండి",
      "feature_report_desc": "ఇతర వినియోగదారులను రక్షించేందుకు సాక్ష్యాలతో నివేదికను సమర్పించండి.",
      "feature_camera_title": "లైవ్ క్యామెరా క్యాప్చర్",
      "feature_camera_desc": "రియల్ టైమ్ స్కానింగ్ కోసం మీ పరికరం క్యామెరాను ఉపయోగించండి.",
      "check_logo_title": "లోగో & డిజైన్ స్పష్టత",
      "check_logo_desc": "లోగో తీక్షణత, నిష్పత్తులు, సరైన డిజైన్ అంశాలను ధృవీకరిస్తుంది.",
      "check_font_title": "ఫాంట్ & లేబుల్ విశ్లేషణ",
      "check_font_desc": "లేబుళ్లపై ఫాంట్, స్పేసింగ్, అలైన్‌మెంట్, స్పెల్లింగ్‌ను చెక్ చేస్తుంది.",
      "check_weight_title": "బరువు & నిర్మాణ నాణ్యత",
      "check_weight_desc": "ఆన్లైన్ ఉత్పత్తుల కోసం అసలైన స్పెసిఫికేషన్‌లతో బరువు పోలిక.",
      "check_hologram_title": "హోలోగ్రామ్ & భద్రతా కోడ్‌లు",
      "check_hologram_desc": "3D హోలోగ్రామ్‌లు మరియు స్క్రాచ్-అండ్-వెరిఫై కోడ్‌లను ధృవీకరిస్తుంది.",
      "tip_no_recourse_title": "నమోదు కాని విక్రేతలపై సహాయం లేదు",
      "tip_no_recourse_desc": "GST బిల్లు లేకుండా వినియోగదారుల ఫోరంలో ఫిర్యాదు చేయలేరు. రసీదును అడగండి.",
      "tip_safety_hazards_title": "భద్రతా ప్రమాదాలు",
      "tip_safety_hazards_desc": "నకిలీ ఛార్జర్లు/బ్యాటరీలు షార్ట్ సర్క్యూట్లు మరియు పేలుళ్లకు కారణం కావచ్చు. రిస్క్ చేయవద్దు.",
      "tip_street_shopping_title": "వీధి షాపింగ్ ప్రో టిప్",
      "tip_street_shopping_desc": "విక్రేత మొబైల్‌గా ఉంటే, ఖరీదైన ఎలక్ట్రానిక్స్ కొనొద్దు.",
      "tip_heat_test_title": "హీట్ టెస్ట్",
      "tip_heat_test_desc": "టెస్ట్ చేయగలిగితే, పరికరం కొన్ని నిమిషాల్లో అసాధారణంగా వేడెక్కుతుందా చూడండి.",

      "login_subtitle": "కొనసాగేందుకు మీ ఖాతాలోకి సైన్ ఇన్ చేయండి",
      "email": "ఈమెయిల్",
      "email_placeholder": "you@example.com",
      "password": "పాస్‌వర్డ్",
      "signing_in": "సైన్ ఇన్ అవుతోంది...",
      "no_account": "ఖాతా లేదా?",
      "sign_up": "సైన్ అప్",
      "login_right_title": "నకిలీల నుంచి రక్షించుకోండి",
      "login_right_desc": "కొనుగోలు ముందు నకిలీలను గుర్తించేందుకు AI ఆధారిత ధృవీకరణ.",

      "password_min_error": "పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి",
      "signup_success_toast": "ఖాతా సృష్టించబడింది! ధృవీకరణ కోసం ఈమెయిల్ చూడండి, లేదా ఇప్పుడు సైన్ ఇన్ చేయండి.",
      "signup_left_title": "TrustedLens‌లో చేరండి",
      "signup_left_desc": "AI ఆధారిత నకిలీ గుర్తింపు టెక్నాలజీతో ధృవీకరణ ప్రారంభించండి.",
      "signup_title": "మీ ఖాతాను సృష్టించండి",
      "signup_subtitle": "ఈరోజే నకిలీ ఉత్పత్తులను గుర్తించడం ప్రారంభించండి",
      "display_name": "డిస్ప్లే పేరు",
      "display_name_placeholder": "మీ పేరు",
      "password_min_placeholder": "కనీసం 6 అక్షరాలు",
      "creating_account": "ఖాతా సృష్టిస్తున్నాం...",
      "create_account": "ఖాతా సృష్టించండి",
      "have_account": "ఇప్పటికే ఖాతా ఉందా?",

      "not_found_title": "అయ్యో! పేజీ కనపడలేదు",
      "return_home": "హోమ్‌కు వెళ్లండి",
      "index_title": "మీ ఖాళీ యాప్‌కు స్వాగతం",
      "index_subtitle": "ఇక్కడ నుంచే మీ ప్రాజెక్ట్‌ను నిర్మించడం ప్రారంభించండి!",

      "reports_page_title": "ధృవీకరణ నివేదికలు",
      "reports_page_subtitle": "మీ ఉత్పత్తి ధృవీకరణల చరిత్ర",
      "no_reports_yet": "ఇంకా నివేదికలు లేవు",
      "no_reports_subtitle": "ఇక్కడ ఫలితాలు చూడడానికి ఉత్పత్తిని ధృవీకరించండి",
      "delete_report_failed": "నివేదిక తొలగించడం విఫలమైంది",
      "delete_report_success": "నివేదిక తొలగించబడింది",
      "delete_report_title": "నివేదిక తొలగించండి",
      "delete_report_desc": "ఈ ధృవీకరణ నివేదికను తొలగించాలనుకుంటున్నారా? ఈ చర్యను రద్దు చేయలేరు.",
      "cancel": "రద్దు",
      "delete": "తొలగించండి",

      "guide_title": "భద్రత & ధృవీకరణ గైడ్",
      "guide_subtitle": "నకిలీ ఉత్పత్తులను గుర్తించడానికి భౌతిక పరిశీలన సూచనలు",
      "guide_tip_logo_title": "లోగో స్పష్టత & డిజైన్",
      "guide_tip_logo_desc": "అసలైన లోగోలు స్పష్టంగా, సరైన నిష్పత్తులతో, మధ్యలో ఉంటాయి. నకిలీలలో తరచూ స్వల్ప వికృతి, తప్పు రంగులు, పిక్సెల్ ప్రింటింగ్ కనిపిస్తుంది.",
      "guide_tip_font_title": "ఫాంట్ & స్పెల్లింగ్ చెక్",
      "guide_tip_font_desc": "'Samsvng' లేదా 'Abibas' వంటి తప్పులను చూడండి. బ్రాండ్ శైలికి ఫాంట్ సరిపోతుందా చెక్ చేయండి.",
      "guide_tip_finish_title": "ఫినిష్ & నిర్మాణ నాణ్యత",
      "guide_tip_finish_desc": "అసమాన గ్యాప్‌లు, రఫ్ ఫినిష్ లేదా లూజ్ బటన్లు ఉంటే జాగ్రత్త.",
      "guide_tip_weight_title": "బరువు పరీక్ష",
      "guide_tip_weight_desc": "అసలైన ఎలక్ట్రానిక్స్ సాధారణంగా బరువుగా, ఘనంగా అనిపిస్తాయి.",
      "guide_tip_heat_title": "హీట్ & పనితీరు పరీక్ష",
      "guide_tip_heat_desc": "పరీక్ష చేయగలిగితే, పరికరం త్వరగా అసాధారణంగా వేడెక్కుతుందా చూడండి.",
      "guide_tip_hologram_title": "హోలోగ్రామ్ & స్క్రాచ్ కోడ్‌లు",
      "guide_tip_hologram_desc": "కోణాలపై రంగు మారే 3D హోలోగ్రామ్‌లను చూడండి. అధికారిక వెబ్‌సైట్‌లో కోడ్‌ను ధృవీకరించండి.",
      "guide_tip_street_title": "వీధి షాపింగ్ ప్రో టిప్",
      "guide_tip_street_desc": "శాశ్వత దుకాణం లేని మొబైల్ విక్రేత వద్ద ఖరీదైన ఎలక్ట్రానిక్స్ కొనొద్దు.",
      "guide_tip_legal_title": "చట్ట & భద్రత హెచ్చరిక",
      "guide_tip_legal_desc": "GST బిల్లు లేకుండా ఫిర్యాదు చేయలేరు. నకిలీ ఛార్జర్లు/బ్యాటరీలు ప్రమాదకరం.",

      "scanner_title_qr": "QR కోడ్ స్కాన్ చేయండి",
      "scanner_title_camera": "క్యామెరాతో స్కాన్ చేయండి",
      "toggle_flash": "ఫ్లాష్ ఆన్/ఆఫ్",
      "close_scanner": "స్కానర్ మూసివేయండి",
      "scanner_hint_qr": "QR కోడ్‌ను స్కానర్ ముందు ఉంచండి",
      "scanner_hint_capture": "ఉత్పత్తి వివరాలను క్యాప్చర్ చేయండి",
      "enable_camera": "క్యామెరాను ప్రారంభించండి",
      "try_again": "మళ్లీ ప్రయత్నించండి",
      "camera_timeout": "క్యామెరా ప్రారంభం కాలేదు (timeout). మళ్లీ ప్రయత్నించండి.",
      "camera_off": "క్యామెరా ఆఫ్‌లో ఉంది. ప్రారంభించడానికి “క్యామెరాను ప్రారంభించండి” నొక్కండి.",
      "camera_permission_denied_settings": "క్యామెరా అనుమతి నిరాకరించబడింది. బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతి ఇవ్వండి.",
      "camera_in_use": "క్యామెరా మరో ట్యాబ్/యాప్‌లో ఉపయోగంలో ఉంది. ఇతర క్యామెరా యాప్‌లను మూసి మళ్లీ ప్రయత్నించండి.",
      "camera_start_failed": "క్యామెరా ప్రారంభం కాలేదు. ఇది బిజీగా ఉండవచ్చు లేదా ప్రారంభం కాలేకపోవచ్చు.",
      "camera_permission_denied": "క్యామెరా అనుమతి నిరాకరించబడింది. అనుమతి ఇచ్చి మళ్లీ ప్రయత్నించండి.",
      "no_camera_found": "ఈ పరికరంలో క్యామెరా కనపడలేదు.",
      "no_camera_detected": "ఈ పరికరంలో క్యామెరా కనపడలేదు.",
      "camera_access_failed": "క్యామెరాను యాక్సెస్ చేయలేకపోయాం. అనుమతులు తనిఖీ చేయండి.",

      "image_captured_success": "చిత్రం విజయవంతంగా క్యాప్చర్ అయ్యింది",
      "product_code_detected": "ఉత్పత్తి కోడ్ గుర్తించబడింది: {{code}}",
      "generic_electronic_device": "సాధారణ ఎలక్ట్రానిక్ పరికరం",
      "india": "భారతదేశం",
      "operative": "చెల్లుబాటు",
      "verified": "ధృవీకరించబడింది",
      "official_store": "అధికారిక {{brand}} స్టోర్",
      "bis_product_category": "గృహ మరియు సమాన విద్యుత్ పరికరాలు",
      "bis_models": "మోడల్-X1, కోర్-సిరీస్, అడ్వాన్స్‌డ్ ఎడిషన్",
      "registration_details": "నమోదు వివరాలు",
      "manufacturer": "తయారీదారు",
      "country": "దేశం",
      "product_category": "ఉత్పత్తి వర్గం",
      "product_name": "ఉత్పత్తి పేరు",
      "indian_standard_no": "భారత ప్రమాణ సంఖ్య",
      "models": "మోడళ్లు",
      "status": "స్థితి",
      "you_reported_weight": "మీరు {{weight}}g అని నివేదించారు.",
      "weight_within_range": "ఇది ఈ ఉత్పత్తికి అంచనా బరువు పరిధిలో ఉంది.",
      "weight_unusually_light": "ఈ వర్గానికి ఇది అసాధారణంగా తక్కువ బరువు. అసలైనవి సాధారణంగా బరువుగా ఉంటాయి.",
      "final_verdict": "తుది నిర్ణయం",
      "product_genuine": "ఉత్పత్తి అసలైనదిగా కనిపిస్తోంది",
      "product_counterfeit": "ఉత్పత్తి నకిలీ అయ్యే అవకాశం ఉంది",
      "overall_confidence": "మొత్తం నమ్మకం: {{score}}%",

      "verify_check_logo": "లోగో స్పష్టత & డిజైన్",
      "verify_check_font": "ఫాంట్ శైలి & లేబుల్ స్పేసింగ్",
      "verify_check_finish": "ఫినిష్ & నిర్మాణ నాణ్యత",
      "verify_check_color": "రంగు స్థిరత్వం",
      "verify_check_print": "ప్రింటింగ్ నాణ్యత",
      "verify_check_alignment": "లేబుల్ అలైన్‌మెంట్",
      "verify_check_hologram": "హోలోగ్రామ్ & భద్రతా కోడ్‌లు",
      "verify_check_spelling": "స్పెల్లింగ్ & టెక్స్ట్ లోపాలు",
      "verify_fake_logo_detail": "లోగో తెలిసిన బ్రాండ్ రిఫరెన్స్‌లతో సరిపోలడం లేదు. వికృతి మరియు రంగు తేడా గుర్తించబడింది.",
      "verify_fake_font_detail": "ఫాంట్ అసలైనదానికి భిన్నంగా ఉంది. లేబుళ్లలో స్పేసింగ్/కెర్నింగ్ లోపం ఉంది.",
      "verify_fake_finish_detail": "అసమాన గ్యాప్‌లు, రఫ్ ఫినిష్ కనిపించింది. నిర్మాణం అసలైనదానికి సరిపోలడం లేదు.",
      "verify_fake_color_detail": "రంగు ప్యాలెట్ అసలైన ప్యాకేజింగ్‌తో గణనీయంగా భిన్నంగా ఉంది.",
      "verify_fake_print_detail": "తక్కువ నాణ్యత ప్రింటింగ్/డాట్ ప్యాటర్న్లు కనిపిస్తున్నాయి.",
      "verify_fake_alignment_detail": "లేబుళ్లు 2–3mm వరకు తప్పుగా ఉన్నాయి. స్టిక్కర్లు చేతితో అతికించినట్లు కనిపిస్తోంది.",
      "verify_fake_hologram_detail": "చెల్లుబాటు అయ్యే హోలోగ్రామ్ కనపడలేదు. స్క్రాచ్ కోడ్ అధికారిక పేజీకి వెళ్లడం లేదు.",
      "verify_fake_spelling_detail": "స్పెల్లింగ్ తప్పులు ఉన్నాయి. బ్లరి టెక్స్ట్ ప్రింటింగ్ కనిపించింది.",
      "verify_auth_logo_detail": "ORB ఫీచర్ మ్యాచింగ్‌తో 96% సారూప్యతతో లోగో సరిపోలింది.",
      "verify_auth_font_detail": "ఫాంట్ శైలి మరియు స్పేసింగ్ అసలైన రిఫరెన్స్‌లతో సరిగ్గా సరిపోలింది.",
      "verify_auth_finish_detail": "ఫినిషింగ్ నాణ్యత అసలైన తయారీతో అనుకూలంగా ఉంది.",
      "verify_auth_color_detail": "రంగు పంపిణీ అనుమతించదగిన పరిమితుల్లో ఉంది.",
      "verify_auth_print_detail": "ప్రింటింగ్ పదును, ఇంక్ డెన్సిటీ మంచి నాణ్యతలో ఉంది.",
      "verify_auth_alignment_detail": "లేబుళ్లు 0.5mm టోలరెన్స్‌లో సరిగ్గా అలైన్ అయ్యాయి.",
      "verify_auth_hologram_detail": "3D భద్రతా హోలోగ్రామ్ ధృవీకరించబడింది.",
      "verify_auth_spelling_detail": "టెక్స్ట్ ధృవీకరణ పూర్తైంది. ఫాంట్/స్పెల్లింగ్ లోపాలు లేవు.",
      "verify_physical_weight": "బరువు & ఘనత్వం",
      "verify_physical_heat": "వేడి & పనితీరు",
      "verify_physical_spelling": "స్పెల్లింగ్ & ఫాంట్లు",
      "verify_physical_fake_weight_detail": "ఉత్పత్తి అసాధారణంగా తేలికగా/ఖాళీగా అనిపిస్తుంది. నకిలీలు హాలో ప్లాస్టిక్ లేదా ఫిల్లర్ వాడుతాయి.",
      "verify_physical_fake_heat_detail": "2 నిమిషాల్లోనే వేడి అవుతోంది. అసలైన వాటిలో థర్మల్ ప్రొటెక్షన్ ఉంటుంది.",
      "verify_physical_fake_spelling_detail": "బ్రాండింగ్ అసమానతలు ఉన్నాయి. లోగోలు సెంటర్‌లో లేవు/బ్లరి ప్రింటింగ్ ఉంది.",
      "verify_physical_auth_weight_detail": "బరువు తయారీదారు స్పెసిఫికేషన్‌లతో సరిపోతుంది.",
      "verify_physical_auth_heat_detail": "10 నిమిషాల తర్వాత సాధారణ ఉష్ణోగ్రత. థర్మల్ ప్రొటెక్షన్ పనిచేస్తోంది.",
      "verify_physical_auth_spelling_detail": "బ్రాండింగ్ సరిగా ఉంది. స్పష్టమైన, సెంటర్‌లో ఉన్న లోగోలు/ప్రింటింగ్.",
    },
  }, // Telugu
  kn: {
    translation: {
      "product_scanner": "ಉತ್ಪನ್ನ ಸ್ಕ್ಯಾನರ್",
      "dashboard_title": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      "reports_title": "ವರದಿಗಳು",
      "verify_product": "ಉತ್ಪನ್ನ ಪರಿಶೀಲನೆ",
      "sign_in": "ಸೈನ್ ಇನ್",
      "get_started": "ಪ್ರಾರಂಭಿಸಿ",
      "camera": "ಕ್ಯಾಮೆರಾ",
      "qr_barcode": "QR/ಬಾರ್‌ಕೋಡ್",
      "verify_authenticity": "ಪ್ರಾಮಾಣಿಕತೆ ಪರಿಶೀಲಿಸಿ",
    },
  }, // Kannada
  ml: {
    translation: {
      "product_scanner": "ഉൽപ്പന്ന സ്കാനർ",
      "dashboard_title": "ഡാഷ്ബോർഡ്",
      "reports_title": "റിപ്പോർട്ടുകൾ",
      "verify_product": "ഉൽപ്പന്ന പരിശോധന",
      "sign_in": "സൈൻ ഇൻ",
      "get_started": "തുടങ്ങുക",
      "camera": "ക്യാമറ",
      "qr_barcode": "QR/ബാർകോഡ്",
      "verify_authenticity": "സത്യാവസ്ഥ പരിശോധിക്കുക",
    },
  }, // Malayalam
  bn: {
    translation: {
      "product_scanner": "পণ্য স্ক্যানার",
      "dashboard_title": "ড্যাশবোর্ড",
      "reports_title": "রিপোর্ট",
      "verify_product": "পণ্য যাচাই",
      "sign_in": "সাইন ইন",
      "get_started": "শুরু করুন",
      "camera": "ক্যামেরা",
      "qr_barcode": "QR/বারকোড",
      "verify_authenticity": "আসল কিনা যাচাই করুন",
    },
  }, // Bengali
  mr: {
    translation: {
      "product_scanner": "उत्पादन स्कॅनर",
      "dashboard_title": "डॅशबोर्ड",
      "reports_title": "अहवाल",
      "verify_product": "उत्पादन पडताळणी",
      "sign_in": "साइन इन",
      "get_started": "सुरू करा",
      "camera": "कॅमेरा",
      "qr_barcode": "QR/बारकोड",
      "verify_authenticity": "प्रामाणिकता तपासा",
    },
  }, // Marathi
  gu: {
    translation: {
      "product_scanner": "ઉત્પાદન સ્કેનર",
      "dashboard_title": "ડૅશબોર્ડ",
      "reports_title": "અહેવાલો",
      "verify_product": "ઉત્પાદન ચકાસણી",
      "sign_in": "સાઇન ઇન",
      "get_started": "શરૂ કરો",
      "camera": "કેમેરા",
      "qr_barcode": "QR/બારકોડ",
      "verify_authenticity": "પ્રામાણિકતા તપાસો",
    },
  }, // Gujarati
  pa: {
    translation: {
      "product_scanner": "ਉਤਪਾਦ ਸਕੈਨਰ",
      "dashboard_title": "ਡੈਸ਼ਬੋਰਡ",
      "reports_title": "ਰਿਪੋਰਟਾਂ",
      "verify_product": "ਉਤਪਾਦ ਦੀ ਜਾਂਚ",
      "sign_in": "ਸਾਇਨ ਇਨ",
      "get_started": "ਸ਼ੁਰੂ ਕਰੋ",
      "camera": "ਕੈਮਰਾ",
      "qr_barcode": "QR/ਬਾਰਕੋਡ",
      "verify_authenticity": "ਅਸਲੀਅਤ ਚੈੱਕ ਕਰੋ",
    },
  }, // Punjabi
  ur: {
    translation: {
      "product_scanner": "پروڈکٹ اسکینر",
      "dashboard_title": "ڈیش بورڈ",
      "reports_title": "رپورٹس",
      "verify_product": "پروڈکٹ کی تصدیق",
      "sign_in": "سائن اِن",
      "get_started": "شروع کریں",
      "camera": "کیمرہ",
      "qr_barcode": "کیو آر/بارکوڈ",
      "verify_authenticity": "اصلیت چیک کریں",
    },
  }, // Urdu
  or: {
    translation: {
      "product_scanner": "ପ୍ରଡକ୍ଟ ସ୍କାନର",
      "dashboard_title": "ଡ୍ୟାଶବୋର୍ଡ",
      "reports_title": "ରିପୋର୍ଟଗୁଡ଼ିକ",
      "verify_product": "ପ୍ରଡକ୍ଟ ଯାଞ୍ଚ",
      "sign_in": "ସାଇନ୍ ଇନ୍",
      "get_started": "ଆରମ୍ଭ କରନ୍ତୁ",
      "camera": "କ୍ୟାମେରା",
      "qr_barcode": "QR/ବାରକୋଡ୍",
      "verify_authenticity": "ପ୍ରାମାଣିକତା ଯାଞ୍ଚ କରନ୍ତୁ",
    },
  }, // Odia
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "hi", "ta", "te", "kn", "ml", "bn", "mr", "gu", "pa", "ur", "or"],
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
