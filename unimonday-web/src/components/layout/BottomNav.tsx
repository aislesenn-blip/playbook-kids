"use client";

import Link from "next/link";
import { Sparkles, BrainCircuit, Gamepad2, User } from "lucide-react";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Sparkles, label: "Home" },
    { href: "/missions", icon: Gamepad2, label: "Missions" },
    { href: "/chat", icon: BrainCircuit, label: "Companion" },
    { href: "/parents", icon: User, label: "Parents" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-background/90 backdrop-blur-xl border-t border-border z-50 flex items-center justify-around px-2 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl min-w-[4rem] transition-all
              ${isActive ? 'text-primary scale-110' : 'text-foreground/60 hover:bg-card hover:text-foreground'}
            `}
          >
            <item.icon className={`w-7 h-7 ${isActive ? 'fill-primary text-primary-foreground p-1 rounded-lg' : ''}`} />
            <span className="text-[11px] font-bold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
