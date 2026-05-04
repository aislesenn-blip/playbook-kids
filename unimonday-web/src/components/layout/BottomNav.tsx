"use client";

import Link from "next/link";
import { FileText, LayoutTemplate, FolderOpen, Printer, User, LayoutDashboard, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store/app-store";

export function BottomNav() {
  const pathname = usePathname();

  const { currentUser } = useAppStore();

  const isVendor = currentUser?.role === 'vendor';

  const navItems = isVendor ? [
    { href: "/vendor/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/print-jobs", icon: Printer, label: "Print Jobs" },
    { href: "/chat", icon: MessageCircle, label: "Inbox" },
    { href: "/profile", icon: User, label: "Profile" },
  ] : [
    { href: "/", icon: FileText, label: "Home" },
    { href: "/workspace", icon: LayoutTemplate, label: "Workspace" },
    { href: "/my-files", icon: FolderOpen, label: "Files" },
    { href: "/print-station", icon: Printer, label: "Print" },
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
