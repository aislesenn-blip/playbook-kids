"use client";
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Home, Compass, ShieldCheck, User } from 'lucide-react';
import { useAppStore } from '@/lib/store/app-store';
import { useTranslations } from 'next-intl';

export function BottomNav() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string || 'en';
  const profile = useAppStore(state => state.profile);
  const t = useTranslations('Navigation');

  if (!profile) return null;

  const navItems = [
    { href: `/${locale}/dashboard`, exactPath: `/${locale}/dashboard`, icon: <Home className="w-5 h-5" />, label: t('home') },
    { href: `/${locale}/journey`, exactPath: `/${locale}/journey`, icon: <Compass className="w-5 h-5" />, label: t('explore') },
    { href: `/${locale}/parent-dashboard`, exactPath: `/${locale}/parent-dashboard`, icon: <ShieldCheck className="w-5 h-5" />, label: t('parents') },
    { href: `/${locale}/profile`, exactPath: `/${locale}/profile`, icon: <User className="w-5 h-5" />, label: t('profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 bg-white/90 backdrop-blur-md border-t border-zinc-100 pb-safe z-50 shadow-[0_-4px_40px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-around h-full px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.exactPath);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-tour={item.href.includes('/parent-dashboard') ? 'parent-nav' : undefined}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-zinc-100' : ''}`}>
                 {item.icon}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
