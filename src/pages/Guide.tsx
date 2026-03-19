import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  Shield, Scale, Type, Thermometer, QrCode, AlertTriangle,
  Eye, Hand, ShoppingBag
} from "lucide-react";
import { useTranslation } from "react-i18next";

const tips = [
  {
    icon: Eye,
    titleKey: "guide_tip_logo_title",
    descKey: "guide_tip_logo_desc",
  },
  {
    icon: Type,
    titleKey: "guide_tip_font_title",
    descKey: "guide_tip_font_desc",
  },
  {
    icon: Hand,
    titleKey: "guide_tip_finish_title",
    descKey: "guide_tip_finish_desc",
  },
  {
    icon: Scale,
    titleKey: "guide_tip_weight_title",
    descKey: "guide_tip_weight_desc",
  },
  {
    icon: Thermometer,
    titleKey: "guide_tip_heat_title",
    descKey: "guide_tip_heat_desc",
  },
  {
    icon: QrCode,
    titleKey: "guide_tip_hologram_title",
    descKey: "guide_tip_hologram_desc",
  },
  {
    icon: ShoppingBag,
    titleKey: "guide_tip_street_title",
    descKey: "guide_tip_street_desc",
  },
  {
    icon: AlertTriangle,
    titleKey: "guide_tip_legal_title",
    descKey: "guide_tip_legal_desc",
  },
];

export default function Guide() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground">{t("guide_title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("guide_subtitle")}</p>

        <div className="mt-8 space-y-4">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.titleKey}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4 rounded-xl border border-border bg-card p-6"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <tip.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">{t(tip.titleKey)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(tip.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
