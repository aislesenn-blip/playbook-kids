"use client";

import { useAppStore } from "@/lib/store/app-store";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { LocationDetector } from "../LocationDetector";

export function TopNav() {
  const { language, setLanguage } = useAppStore();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "sw" : "en");
    document.cookie = `NEXT_LOCALE=${language === 'en' ? 'sw' : 'en'}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex justify-between items-center h-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center transform rotate-3">
            <span className="text-primary-foreground font-bold text-lg leading-none">U</span>
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">Unimonday</span>
        </div>

        <div className="flex items-center gap-4">
          <LocationDetector />
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            <span>{language === "en" ? "EN" : "SW"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
