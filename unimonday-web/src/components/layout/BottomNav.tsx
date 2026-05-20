
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Trophy, User } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: <Home className="w-6 h-6" />, label: 'Home' },
    { href: '/journey', icon: <Map className="w-6 h-6" />, label: 'Journey' },
    { href: '/leaderboard', icon: <Trophy className="w-6 h-6" />, label: 'Rank' },
    { href: '/profile', icon: <User className="w-6 h-6" />, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-100 pb-safe z-50">
      <div className="flex items-center justify-around h-full px-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive ? 'text-[#DDA359] scale-110' : 'text-gray-400 hover:text-gray-600'}`}
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
