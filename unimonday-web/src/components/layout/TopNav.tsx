"use client";

import Link from "next/link";
import { User, Menu, X, Sparkles, BrainCircuit, Gamepad2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TopNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b border-border z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-black text-2xl tracking-tight text-foreground">uNi<span className="text-foreground/70">MONDAY</span></span>
        </Link>

        <div className="hidden sm:flex items-center gap-8 font-bold">
          <Link href="/missions" className={`flex items-center gap-2 text-base hover:text-primary transition-colors ${pathname === '/missions' ? 'text-primary' : 'text-foreground/70'}`}>
            <Gamepad2 className="w-5 h-5" /> Missions
          </Link>
          <Link href="/chat" className={`flex items-center gap-2 text-base hover:text-primary transition-colors ${pathname === '/chat' ? 'text-primary' : 'text-foreground/70'}`}>
            <BrainCircuit className="w-5 h-5" /> AI Companion
          </Link>
          <Link href="/parents" className={`flex items-center gap-2 text-base hover:text-primary transition-colors ${pathname === '/parents' ? 'text-primary' : 'text-foreground/70'}`}>
            <User className="w-5 h-5" /> Parent Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-2xl font-bold text-sm transition-transform hover:scale-105">
            Get Started
          </button>
          <button onClick={toggleMenu} className="sm:hidden p-2 text-foreground hover:bg-card rounded-full transition-colors">
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 bottom-20 overflow-y-auto bg-background z-40 sm:hidden shadow-lg border-b border-border"
          >
            <div className="flex flex-col p-6 gap-4">
              <Link
                href="/missions"
                onClick={toggleMenu}
                className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-lg ${pathname === '/missions' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-card'}`}
              >
                <Gamepad2 className="w-6 h-6" /> Missions
              </Link>
              <Link
                href="/chat"
                onClick={toggleMenu}
                className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-lg ${pathname === '/chat' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-card'}`}
              >
                <BrainCircuit className="w-6 h-6" /> AI Companion
              </Link>
              <Link
                href="/parents"
                onClick={toggleMenu}
                className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-lg ${pathname === '/parents' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-card'}`}
              >
                <User className="w-6 h-6" /> Parent Dashboard
              </Link>
              <hr className="border-border my-4" />
              <button className="flex items-center justify-center gap-2 w-full p-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
