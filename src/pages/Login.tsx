import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2">
            <img src="/logo.jpg" alt="Government of India Logo" className="h-10 w-auto" />
            <span className="font-display text-xl font-bold text-foreground">
              Trusted<span className="text-primary">Lens</span>
            </span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground">{t("welcome_back")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("login_subtitle")}</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("email_placeholder")}
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="password">{t("password")}</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("signing_in") : t("sign_in")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("no_account")}{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              {t("sign_up")}
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Visual */}
      <div className="hidden flex-1 items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 lg:flex">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 items-center justify-center">
            <img src="/logo.jpg" alt="Government of India Logo" className="h-16 w-auto" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t("login_right_title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("login_right_desc")}
          </p>
        </div>
      </div>
    </div>
  );
}
