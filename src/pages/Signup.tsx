import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error(t("password_min_error"));
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("signup_success_toast"));
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Visual */}
      <div className="hidden flex-1 items-center justify-center bg-gradient-to-br from-accent/10 via-primary/5 to-primary/10 lg:flex">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 items-center justify-center">
            <img src="/logo.jpg" alt="Government of India Logo" className="h-16 w-auto" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t("signup_left_title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("signup_left_desc")}
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2">
            <img src="/logo.jpg" alt="Government of India Logo" className="h-10 w-auto" />
            <span className="font-display text-xl font-bold text-foreground">
              Trusted<span className="text-primary">Lens</span>
            </span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground">{t("signup_title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("signup_subtitle")}</p>

          <form onSubmit={handleSignup} className="mt-8 space-y-5">
            <div>
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t("display_name_placeholder")}
                required
                className="mt-1.5"
              />
            </div>
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
                  placeholder={t("password_min_placeholder")}
                  required
                  minLength={6}
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
              {loading ? t("creating_account") : t("create_account")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("have_account")}{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              {t("sign_in")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
