import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Shield, Camera, BarChart3, FileText, CheckCircle2,
  AlertTriangle, XCircle, TrendingUp
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const { data: reports = [] } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const { data } = await supabase
        .from("verification_reports")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      return data || [];
    },
  });

  const stats = {
    total: reports.length,
    genuine: reports.filter((r) => r.verdict === "genuine").length,
    suspicious: reports.filter((r) => r.verdict === "suspicious").length,
    counterfeit: reports.filter((r) => r.verdict === "counterfeit").length,
  };

  const verdictIcon = (v: string | null) => {
    switch (v) {
      case "genuine": return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "suspicious": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "counterfeit": return <XCircle className="h-4 w-4 text-danger" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground">
            {t("welcome_back")}
            {user?.user_metadata?.display_name ? `, ${user.user_metadata.display_name}` : ""}
          </h1>
          <p className="mt-1 text-muted-foreground">{t("dashboard_subtitle")}</p>
        </motion.div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Camera, label: t("quick_verify_product"), to: "/verify", color: "bg-primary/10 text-primary" },
            { icon: BarChart3, label: t("quick_analytics"), to: "/reports", color: "bg-accent/10 text-accent" },
            { icon: FileText, label: t("quick_view_reports"), to: "/reports", color: "bg-warning/10 text-warning" },
            { icon: Shield, label: t("quick_safety_guide"), to: "/guide", color: "bg-success/10 text-success" },
          ].map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={action.to}>
                <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="font-display font-semibold text-foreground">{action.label}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {[
            { label: t("stat_total_scans"), value: stats.total, icon: TrendingUp, color: "text-primary" },
            { label: t("stat_genuine"), value: stats.genuine, icon: CheckCircle2, color: "text-success" },
            { label: t("stat_suspicious"), value: stats.suspicious, icon: AlertTriangle, color: "text-warning" },
            { label: t("stat_counterfeit"), value: stats.counterfeit, icon: XCircle, color: "text-danger" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="mt-2 font-display text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Reports */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">{t("recent_verifications")}</h2>
            <Link to="/reports">
              <Button variant="ghost" size="sm">{t("view_all")}</Button>
            </Link>
          </div>
          {reports.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-border bg-card p-12 text-center">
              <Camera className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-3 font-display font-semibold text-foreground">{t("no_verifications_yet")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("no_verifications_subtitle")}</p>
              <Link to="/verify">
                <Button className="mt-4">{t("verify_a_product")}</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {reports.map((r) => (
                <div key={r.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    {verdictIcon(r.verdict)}
                    <div>
                      <p className="font-medium text-foreground">{r.product_name || t("unknown_product")}</p>
                      <p className="text-xs text-muted-foreground">{r.brand || t("unknown_brand")} · {new Date(r.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-foreground">{r.overall_score ?? "—"}%</p>
                    <p className="text-xs capitalize text-muted-foreground">{r.verdict || t("pending")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
