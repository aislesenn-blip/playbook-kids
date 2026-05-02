"use client";

import Link from "next/link";
import { ShoppingBag, User, Menu, X, Shirt, Smartphone, ShieldCheck, Box, Store } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TopNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-border z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tight text-gray-900">uNi<span className="text-primary">MONDAY</span></span>
        </Link>

        <div className="hidden sm:flex items-center gap-8 font-medium">
          <Link href="/fashion" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/fashion' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <Shirt className="w-4 h-4" /> Fashion
          </Link>
          <Link href="/tech" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/tech' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <Smartphone className="w-4 h-4" /> Tech & Accessories
          </Link>
          <Link href="/services" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/services' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <ShieldCheck className="w-4 h-4" /> Verified Services
          </Link>
          <Link href="/orders" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/orders' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <Box className="w-4 h-4" /> My Orders
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full font-bold text-sm transition-colors">
            <User className="w-4 h-4" /> Sign In
          </button>
          <button onClick={toggleMenu} className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 bottom-0 bg-white border-b border-border z-40 sm:hidden shadow-lg overflow-y-auto"
          >
            <div className="flex flex-col p-4 gap-4">
              <Link
                href="/fashion"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/fashion' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Shirt className="w-5 h-5" /> Fashion
              </Link>
              <Link
                href="/tech"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/tech' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Smartphone className="w-5 h-5" /> Tech & Accessories
              </Link>
              <Link
                href="/services"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/services' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <ShieldCheck className="w-5 h-5" /> Verified Services
              </Link>
              <Link
                href="/orders"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/orders' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Box className="w-5 h-5" /> My Orders
              </Link>
              <hr className="border-border my-2" />
              <Link
                href="/vendor/apply"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/vendor/apply' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Store className="w-5 h-5" /> Partner with us
              </Link>
              <Link
                href="/admin/dashboard"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/admin/dashboard' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <ShieldCheck className="w-5 h-5" /> Staff (Admin)
              </Link>
              <button className="flex items-center justify-center gap-2 w-full p-3 bg-gray-900 text-white rounded-xl font-bold">
                <User className="w-5 h-5" /> Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
