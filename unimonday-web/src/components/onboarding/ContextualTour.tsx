"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MousePointer2 } from 'lucide-react';
import { usePathname, } from 'next/navigation';

export function ContextualTour() {
  const { profile, completeTour } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Mobile performance optimization: don't render until everything is settled
  useEffect(() => {
    // Only run on dashboard after a short delay so the main UI loads fast first
    const timer = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !profile || profile.hasCompletedTour) return null;

  // The tour logic is simplified:
  // Step 0: Dashboard overview
  // Step 1: Tell them to tap the first episode
  // Once they tap an episode, the tour is permanently completed.

  const isDashboard = pathname === '/dashboard';

  useEffect(() => {
    // If they navigated away while tour is active, complete it automatically to stop annoying them
    if (mounted && profile && !profile.hasCompletedTour && !isDashboard) {
        completeTour();
    }
  }, [pathname, isDashboard, mounted, profile, completeTour]);

  if (!isDashboard) {
      return null;
  }

  const handleComplete = () => {
    completeTour();
  };

  return (
    <AnimatePresence>
      {isDashboard && (
        <motion.div
          key="tour-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-[#1A1817]/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            className="bg-white/95 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-[32px] w-full max-w-sm shadow-2xl relative mb-20 sm:mb-0"
          >
             <button
                onClick={handleComplete}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 bg-zinc-100 rounded-full"
             >
                <X className="w-4 h-4" />
             </button>

             <div className="w-12 h-12 bg-[#DDA359]/20 text-[#DDA359] rounded-full flex items-center justify-center mb-6">
                <MousePointer2 className="w-6 h-6" />
             </div>

             <h3 className="text-2xl font-semibold text-zinc-900 mb-2 tracking-tight">Ready to start?</h3>
             <p className="text-zinc-600 text-sm leading-relaxed mb-8">
               Tap the first &quot;Up Next&quot; episode above to begin your child&apos;s immersive language journey. The session will guide them naturally.
             </p>

             <button
               onClick={handleComplete}
               className="w-full py-3.5 bg-zinc-900 text-white rounded-xl font-medium text-[15px] hover:bg-zinc-800 transition-colors shadow-sm"
             >
               Got it, let&apos;s go
             </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
