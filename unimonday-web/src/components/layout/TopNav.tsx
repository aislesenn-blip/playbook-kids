"use client";

import { useLocale } from "next-intl";
import { Globe, MapPin, Store } from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { useState, useEffect } from "react";

export function TopNav() {
  const locale = useLocale();
  const currentCampus = useAppStore((state) => state.currentCampus);
  const userRole = useAppStore((state) => state.userRole);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small timeout to avoid React hydration mismatch and sync setState warnings
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "sw" : "en";
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex justify-between items-center h-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center transform rotate-3 shadow-sm shadow-primary/20">
            <span className="text-primary-foreground font-bold text-lg leading-none">U</span>
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block text-foreground">UNIMONDAY</span>
        </div>

        <div className="flex items-center gap-4">
          {mounted && currentCampus && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 text-sm font-medium text-muted-foreground border border-border/50">
              <MapPin className="w-3.5 h-3.5" />
              <span>{currentCampus.name}</span>
            </div>
          )}

          {mounted && userRole === 'vendor' && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <Store className="w-3.5 h-3.5" />
              <span>Vendor</span>
            </div>
          )}

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{locale}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
