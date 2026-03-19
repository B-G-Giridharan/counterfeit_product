import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, AlertTriangle, XCircle, FileText, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function Reports() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { t } = useTranslation();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["all-reports"],
    queryFn: async () => {
      const { data } = await supabase
        .from("verification_reports")
        .select("*")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("verification_reports").delete().eq("id", id);
    if (error) {
      toast.error(t("delete_report_failed"));
    } else {
      toast.success(t("delete_report_success"));
      queryClient.invalidateQueries({ queryKey: ["all-reports"] });
    }
    setDeleteId(null);
  };

  const verdictIcon = (v: string | null) => {
    switch (v) {
      case "genuine": return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "suspicious": return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "counterfeit": return <XCircle className="h-5 w-5 text-danger" />;
      default: return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const verdictBg = (v: string | null) => {
    switch (v) {
      case "genuine": return "border-success/20";
      case "suspicious": return "border-warning/20";
      case "counterfeit": return "border-danger/20";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground">{t("reports_page_title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("reports_page_subtitle")}</p>

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : reports.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-border bg-card p-16 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-display text-lg font-semibold text-foreground">{t("no_reports_yet")}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t("no_reports_subtitle")}</p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {reports.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl border ${verdictBg(r.verdict)} bg-card p-5`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {r.image_url && (
                      <img
                        src={r.image_url}
                        alt={r.product_name || t("product")}
                        className="h-16 w-16 rounded-lg border border-border object-cover"
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        {verdictIcon(r.verdict)}
                        <span className="font-display font-semibold text-foreground">
                          {r.product_name || t("unknown_product")}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {r.brand || t("unknown_brand")} · {new Date(r.created_at).toLocaleDateString()}
                      </p>
                      {r.ai_analysis && (
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.ai_analysis}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-right">
                      <p className="font-display text-2xl font-bold text-foreground">{r.overall_score ?? "—"}%</p>
                      <p className="text-xs capitalize text-muted-foreground">{r.verdict || t("pending")}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => setDeleteId(r.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("delete_report_title")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("delete_report_desc")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteId(null)}>{t("cancel")}</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && handleDelete(deleteId)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {t("delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
