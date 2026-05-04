"use client";

import Link from "next/link";
import { User, Menu, X, Search, FileText, PenTool, LayoutTemplate, FolderOpen, Printer, PlusCircle, Bell, CheckCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store/app-store";

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setIsNotifOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-xl border-b border-border z-50 flex items-center justify-between px-4">
        {/* Logo area */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-gray-900 leading-none mt-1">
              uNi<span className="text-primary">MONDAY</span>
            </span>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
              Cloud Stationary
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6 font-medium">
          <Link href="/workspace" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/workspace' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <PlusCircle className="w-4 h-4" /> New Document
          </Link>
          <Link href="/templates" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/templates' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <LayoutTemplate className="w-4 h-4" /> Templates
          </Link>
          <Link href="/my-files" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/my-files' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <FolderOpen className="w-4 h-4" /> My Files
          </Link>
          <Link href="/print-station" className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${pathname === '/print-station' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <Printer className="w-4 h-4" /> Print Station
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button onClick={() => setIsNotifOpen(true)} className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 bottom-20 left-0 right-0 bg-white border-b border-border z-40 sm:hidden shadow-lg overflow-y-auto overscroll-contain"
          >
            <div className="flex flex-col p-4 gap-4 pb-8">
              <Link href="/workspace" onClick={toggleMenu} className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/workspace' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}>
                <PlusCircle className="w-5 h-5" /> New Document
              </Link>
              <Link href="/templates" onClick={toggleMenu} className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/templates' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}>
                <LayoutTemplate className="w-5 h-5" /> Templates
              </Link>
              <Link href="/my-files" onClick={toggleMenu} className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/my-files' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}>
                <FolderOpen className="w-5 h-5" /> My Files
              </Link>
              <Link href="/print-station" onClick={toggleMenu} className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname === '/print-station' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}>
                <Printer className="w-5 h-5" /> Print Station
              </Link>

              <hr className="border-border my-2" />

              <Link href="/vendor/apply" onClick={toggleMenu} className={`flex items-center gap-3 p-3 rounded-xl font-bold ${pathname.includes('/vendor') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}>
                <Printer className="w-5 h-5" /> Register Stationary Shop
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

      {/* Notification Modal */}
      <AnimatePresence>
        {isNotifOpen && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/20 z-[60] flex flex-col pt-16 px-4 items-end"
             onClick={() => setIsNotifOpen(false)}
           >
             <motion.div
               initial={{ y: -10, opacity: 0, scale: 0.95 }}
               animate={{ y: 0, opacity: 1, scale: 1 }}
               exit={{ y: -10, opacity: 0, scale: 0.95 }}
               className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
               onClick={(e) => e.stopPropagation()}
             >
               <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                 <h3 className="font-black text-gray-900">Notifications</h3>
                 <button onClick={() => setIsNotifOpen(false)} className="p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors">
                   <X className="w-5 h-5" />
                 </button>
               </div>

               <div className="p-2 max-h-[60vh] overflow-y-auto">
                 {/* Dummy Notification */}
                 <div className="p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer flex gap-3 items-start">
                   <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                     <CheckCircle className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-gray-900 mb-0.5">Your Document is Ready</p>
                     <p className="text-xs text-gray-500 line-clamp-2">The stationary shop has completed your print job. It is ready for pickup.</p>
                     <p className="text-[10px] font-bold text-gray-400 mt-1">2 mins ago</p>
                   </div>
                 </div>
               </div>

               <div className="p-3 border-t border-gray-100 text-center">
                 <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">Mark all as read</button>
               </div>
             </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
