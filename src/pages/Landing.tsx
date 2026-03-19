import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Shield, ScanLine, BarChart3, Camera, AlertTriangle, CheckCircle2,
  QrCode, Eye, Scale, FileWarning
} from "lucide-react";

const features = [
  { icon: Eye, titleKey: "feature_ai_title", descKey: "feature_ai_desc" },
  { icon: QrCode, titleKey: "feature_qr_title", descKey: "feature_qr_desc" },
  { icon: CheckCircle2, titleKey: "feature_score_title", descKey: "feature_score_desc" },
  { icon: BarChart3, titleKey: "feature_analytics_title", descKey: "feature_analytics_desc" },
  { icon: AlertTriangle, titleKey: "feature_report_title", descKey: "feature_report_desc" },
  { icon: Camera, titleKey: "feature_camera_title", descKey: "feature_camera_desc" },
];

const checks = [
  { icon: Shield, titleKey: "check_logo_title", descKey: "check_logo_desc" },
  { icon: ScanLine, titleKey: "check_font_title", descKey: "check_font_desc" },
  { icon: Scale, titleKey: "check_weight_title", descKey: "check_weight_desc" },
  { icon: FileWarning, titleKey: "check_hologram_title", descKey: "check_hologram_desc" },
];

export default function Landing() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              {t("hero_subtitle")}
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("hero_title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {t("hero_desc")}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/signup">
                <Button size="lg" className="px-8 text-base shadow-lg shadow-primary/25">
                  {t("start_verifying")}
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="px-8 text-base">
                  {t("sign_in")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">
              {t("landing_suite_title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("landing_suite_subtitle")}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{t(f.titleKey)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(f.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">{t("what_we_check")}</h2>
            <p className="mt-3 text-muted-foreground">
              {t("landing_checks_subtitle")}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {checks.map((c, i) => (
              <motion.div
                key={c.titleKey}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 rounded-xl border border-border bg-card p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">{t(c.titleKey)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t(c.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">{t("safety_tips")}</h2>
          </div>
          <div className="space-y-4">
            {[
              { titleKey: "tip_no_recourse_title", descKey: "tip_no_recourse_desc" },
              { titleKey: "tip_safety_hazards_title", descKey: "tip_safety_hazards_desc" },
              { titleKey: "tip_street_shopping_title", descKey: "tip_street_shopping_desc" },
              { titleKey: "tip_heat_test_title", descKey: "tip_heat_test_desc" },
            ].map((tip) => (
              <div key={tip.titleKey} className="rounded-xl border border-warning/20 bg-warning/5 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                  <div>
                    <h4 className="font-display font-semibold text-foreground">{t(tip.titleKey)}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{t(tip.descKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Government of India Logo" className="h-8 w-auto mix-blend-multiply dark:mix-blend-normal" />
            <span className="font-display text-lg font-bold">TrustedLens</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TrustedLens. Protecting consumers from counterfeit products.
          </p>
        </div>
      </footer>
    </div>
  );
}
