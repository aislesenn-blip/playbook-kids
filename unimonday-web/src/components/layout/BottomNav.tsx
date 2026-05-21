
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Trophy, User } from 'lucide-react';

import { useAppStore } from '@/lib/store/app-store';

export function BottomNav() {
  const pathname = usePathname();
  const profile = useAppStore(state => state.profile);

  // Do not render BottomNav if the user is not authenticated
  if (!profile) return null;

  const navItems = [
    { href: '/dashboard', icon: <Home className="w-6 h-6" />, label: 'Home' },
    { href: '/journey', icon: <Map className="w-6 h-6" />, label: 'Journey' },
    { href: '/leaderboard', icon: <Trophy className="w-6 h-6" />, label: 'Rank' },
    { href: '/profile', icon: <User className="w-6 h-6" />, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#DDA359] border-t border-black/10 pb-safe z-50">
      <div className="flex items-center justify-around h-full px-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive ? 'text-black scale-110' : 'text-black/40 hover:text-black/60'}`}
            >
              {item.icon}
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
