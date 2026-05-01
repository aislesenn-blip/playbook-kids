"use client";

import Link from "next/link";
import { BookOpen, BrainCircuit, Library, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: BookOpen, label: "Home" },
    { href: "/study", icon: BrainCircuit, label: "Study" },
    { href: "#", icon: Library, label: "Library" },
    { href: "#", icon: LayoutDashboard, label: "Progress" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl border-t border-border z-50 flex items-center justify-around px-2 pb-safe">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl min-w-[4rem] transition-all
              ${isActive ? 'text-primary scale-110' : 'text-muted-foreground hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            <item.icon className={`w-6 h-6 ${isActive ? 'fill-primary/20' : ''}`} />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
