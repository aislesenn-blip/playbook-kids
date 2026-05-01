"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { setUserLocale } from "@/app/actions/locale";

export function TopNav() {
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (checked: boolean) => {
    const nextLocale = checked ? 'sw' : 'en';
    startTransition(() => {
      setUserLocale(nextLocale);
    });
  };

  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex h-16 items-center justify-between px-4 max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-black text-xl tracking-tight">Unimonday</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${locale === 'en' ? 'text-primary' : 'text-muted-foreground'}`}>EN</span>
            <Switch
              checked={locale === 'sw'}
              onCheckedChange={handleLanguageChange}
              disabled={isPending}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-xs font-bold ${locale === 'sw' ? 'text-primary' : 'text-muted-foreground'}`}>SW</span>
          </div>

          {isHome && (
            <Link
              href="/home"
              className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-full text-sm font-bold transition-colors"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}