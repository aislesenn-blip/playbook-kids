"use client";

import Link from "next/link";
import { BookOpen, User, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-border z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <span className="font-black text-xl tracking-tight text-gray-900">STUDY<span className="text-primary">ENGINE</span></span>
      </Link>

      <div className="hidden sm:flex items-center gap-8 font-medium">
        <Link href="/study" className={`text-sm hover:text-primary transition-colors ${pathname === '/study' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
          Study Room
        </Link>
        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          My Library
        </Link>
        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          Progress (Friday Test)
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full font-bold text-sm transition-colors">
          <User className="w-4 h-4" /> Sign In
        </button>
        <button className="sm:hidden p-2 text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
