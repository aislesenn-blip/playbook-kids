"use client";

import Link from "next/link";
import { User, Menu, X, Bell, FileText, LayoutTemplate, FolderOpen, Printer, PlusCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store/app-store";

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setIsNotificationsOpen(false);
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
          <button onClick={() => setIsNotificationsOpen(true)} className="relative flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            {currentUser && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            )}
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

      {/* Notifications Modal */}
      <AnimatePresence>
        {isNotificationsOpen && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/50 z-[60] flex flex-col items-center pt-16 sm:pt-20 px-4"
             onClick={() => setIsNotificationsOpen(false)}
           >
             <motion.div
               initial={{ y: -20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -20, opacity: 0 }}
               className="bg-white w-full max-w-md mx-auto rounded-2xl p-0 shadow-2xl flex flex-col overflow-hidden"
               onClick={(e) => e.stopPropagation()}
             >
               <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
                   <Bell className="w-4 h-4 text-primary" /> Notifications
                 </h3>
                 <button onClick={() => setIsNotificationsOpen(false)} className="p-1.5 text-gray-400 hover:bg-gray-200 rounded-full transition-colors">
                   <X className="w-4 h-4" />
                 </button>
               </div>
               <div className="flex flex-col max-h-[60vh] overflow-y-auto">
                 {!currentUser ? (
                   <div className="p-8 text-center text-gray-500 font-medium">
                     Please sign in to view notifications.
                   </div>
                 ) : (
                   <>
                     <div className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Printer className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Your print job is ready!</p>
                          <p className="text-xs text-gray-500 mt-0.5">Please pick it up at Mlimani Campus Main Print.</p>
                          <p className="text-[10px] text-gray-400 mt-1 font-medium">2 mins ago</p>
                        </div>
                     </div>
                     <div className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 opacity-70">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Document saved</p>
                          <p className="text-xs text-gray-500 mt-0.5">&apos;Barua Ya Likizo.pdf&apos; was saved to your files.</p>
                          <p className="text-[10px] text-gray-400 mt-1 font-medium">1 hour ago</p>
                        </div>
                     </div>
                   </>
                 )}
               </div>
               <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                  <button onClick={() => setIsNotificationsOpen(false)} className="text-xs font-bold text-primary hover:underline">Mark all as read</button>
               </div>
             </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
