"use client";

import Link from "next/link";
import { ShoppingBag, ShoppingCart, User, Menu, X, Shirt, Smartphone, ShieldCheck, Box, Handshake, ShieldAlert, Search, Sparkles, LampDesk } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store/app-store";

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, getCartCount } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-xl border-b border-border z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-gray-900 leading-none mt-1">uNi<span className="text-primary">MONDAY</span></span>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">students Deals & Discounts ....</span>
          </div>
        </Link>

        <div className="hidden sm:flex items-center gap-6 font-medium">
          <Link href="/fashion" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/fashion' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <Shirt className="w-4 h-4" /> Fashion
          </Link>
          <Link href="/tech" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/tech' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <Smartphone className="w-4 h-4" /> Tech
          </Link>
          <Link href="/beauty" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/beauty' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <Sparkles className="w-4 h-4" /> Beauty
          </Link>
          <Link href="/home-decor" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/home-decor' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <LampDesk className="w-4 h-4" /> Decor
          </Link>
          <Link href="/services" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/services' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <ShieldCheck className="w-4 h-4" /> Services
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setIsSearchOpen(true)} className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/checkout" className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {getCartCount()}
              </span>
            )}
          </Link>
          {currentUser ? (
            <Link href="/profile" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full font-bold text-sm transition-colors">
              <User className="w-4 h-4" /> {currentUser.name.split(' ')[0]}
            </Link>
          ) : (
            <Link href="/auth/login" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full font-bold text-sm transition-colors">
              <User className="w-4 h-4" /> Sign In
            </Link>
          )}
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
            className="fixed top-14 left-0 right-0 bg-white border-b border-border z-40 sm:hidden shadow-lg"
          >
            <div className="flex flex-col p-4 gap-4">
              <Link
                href="/fashion"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/fashion' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Shirt className="w-5 h-5" /> Fashion & Apparels
              </Link>
              <Link
                href="/tech"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/tech' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Smartphone className="w-5 h-5" /> Tech & Accessories
              </Link>
              <Link
                href="/beauty"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/beauty' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Sparkles className="w-5 h-5" /> Beauty & Cosmetics
              </Link>
              <Link
                href="/home-decor"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/home-decor' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <LampDesk className="w-5 h-5" /> Home & Decor
              </Link>
              <Link
                href="/services"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/services' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <ShieldCheck className="w-5 h-5" /> Verified Services
              </Link>
              <hr className="border-border my-2" />
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
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname.includes('/vendor') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Handshake className="w-5 h-5" /> Partner With Us
              </Link>
              <Link
                href="/admin/dashboard"
                onClick={toggleMenu}
                className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname.includes('/admin') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <ShieldAlert className="w-5 h-5" /> Staff
              </Link>
              <hr className="border-border my-2" />
              {currentUser ? (
                <Link href="/profile" onClick={toggleMenu} className="flex items-center justify-center gap-2 w-full p-3 bg-primary/10 text-primary rounded-xl font-bold">
                  <User className="w-5 h-5" /> My Profile
                </Link>
              ) : (
                <Link href="/auth/login" onClick={toggleMenu} className="flex items-center justify-center gap-2 w-full p-3 bg-gray-900 text-white rounded-xl font-bold">
                  <User className="w-5 h-5" /> Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/50 z-[60] flex flex-col pt-20 px-4"
             onClick={() => setIsSearchOpen(false)}
           >
             <motion.div
               initial={{ y: -20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -20, opacity: 0 }}
               className="bg-white w-full max-w-2xl mx-auto rounded-2xl p-4 shadow-2xl flex items-center gap-3"
               onClick={(e) => e.stopPropagation()}
             >
               <Search className="w-6 h-6 text-gray-400" />
               <input
                 type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onKeyDown={handleSearch}
                 placeholder="Search products, vendors, or services... (Press Enter)"
                 className="flex-1 bg-transparent border-none outline-none text-lg font-medium"
                 autoFocus
               />
               <button onClick={() => setIsSearchOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                 <X className="w-5 h-5" />
               </button>
             </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
