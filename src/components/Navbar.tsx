import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Shield, Sun, Moon, LogOut, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Government of India Logo" className="h-10 w-auto" />
          <span className="font-display text-xl font-bold text-foreground">
            Trusted<span className="text-primary">Lens</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">{t("dashboard_title")}</Button>
              </Link>
              <Link to="/verify">
                <Button variant="ghost" size="sm">{t("verify_product")}</Button>
              </Link>
              <Link to="/reports">
                <Button variant="ghost" size="sm">{t("reports_title")}</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">{t("sign_in")}</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">{t("get_started")}</Button>
              </Link>
            </>
          )}
          <Menubar className="h-9 border-transparent bg-transparent p-0">
            <MenubarMenu>
              <MenubarTrigger className="h-9 rounded-md px-2 py-1.5 text-sm font-medium">
                <Globe className="mr-2 h-4 w-4" />
                <span className="text-[11px] uppercase font-bold">{i18n.language}</span>
              </MenubarTrigger>
              <MenubarContent align="end">
                <MenubarRadioGroup
                  value={i18n.language}
                  onValueChange={(lng) => i18n.changeLanguage(lng)}
                >
                  <MenubarRadioItem value="en">English</MenubarRadioItem>
                  <MenubarRadioItem value="hi">Hindi (हिन्दी)</MenubarRadioItem>
                  <MenubarRadioItem value="ta">Tamil (தமிழ்)</MenubarRadioItem>
                  <MenubarRadioItem value="te">Telugu (తెలుగు)</MenubarRadioItem>
                  <MenubarRadioItem value="kn">Kannada (ಕನ್ನಡ)</MenubarRadioItem>
                  <MenubarRadioItem value="ml">Malayalam (മലയാളം)</MenubarRadioItem>
                  <MenubarRadioItem value="bn">Bengali (বাংলা)</MenubarRadioItem>
                  <MenubarRadioItem value="mr">Marathi (मराठी)</MenubarRadioItem>
                  <MenubarRadioItem value="gu">Gujarati (ગુજરાતી)</MenubarRadioItem>
                  <MenubarRadioItem value="pa">Punjabi (ਪੰਜਾਬੀ)</MenubarRadioItem>
                  <MenubarRadioItem value="ur">Urdu (اردو)</MenubarRadioItem>
                  <MenubarRadioItem value="or">Odia (ଓଡ଼ିଆ)</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          {user && (
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Menubar className="h-9 border-transparent bg-transparent p-0">
            <MenubarMenu>
              <MenubarTrigger className="h-9 rounded-md px-2 py-1.5">
                <Globe className="h-4 w-4" />
              </MenubarTrigger>
              <MenubarContent align="end">
                <MenubarRadioGroup
                  value={i18n.language}
                  onValueChange={(lng) => i18n.changeLanguage(lng)}
                >
                  <MenubarRadioItem value="en">English</MenubarRadioItem>
                  <MenubarRadioItem value="hi">Hindi (हिन्दी)</MenubarRadioItem>
                  <MenubarRadioItem value="ta">Tamil (தமிழ்)</MenubarRadioItem>
                  <MenubarRadioItem value="te">Telugu (తెలుగు)</MenubarRadioItem>
                  <MenubarRadioItem value="kn">Kannada (ಕನ್ನಡ)</MenubarRadioItem>
                  <MenubarRadioItem value="ml">Malayalam (മലയാളം)</MenubarRadioItem>
                  <MenubarRadioItem value="bn">Bengali (বাংলা)</MenubarRadioItem>
                  <MenubarRadioItem value="mr">Marathi (मराठी)</MenubarRadioItem>
                  <MenubarRadioItem value="gu">Gujarati (ગુજરાતી)</MenubarRadioItem>
                  <MenubarRadioItem value="pa">Punjabi (ਪੰਜਾਬੀ)</MenubarRadioItem>
                  <MenubarRadioItem value="ur">Urdu (اردو)</MenubarRadioItem>
                  <MenubarRadioItem value="or">Odia (ଓଡ଼ିଆ)</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-3 md:hidden">
          {user ? (
            <div className="flex flex-col gap-2">
              <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">{t("dashboard_title")}</Button>
              </Link>
              <Link to="/verify" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">{t("verify_product")}</Button>
              </Link>
              <Link to="/reports" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">{t("reports_title")}</Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" /> {t("sign_out")}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">{t("sign_in")}</Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">{t("get_started")}</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
