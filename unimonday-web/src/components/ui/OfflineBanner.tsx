"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, RefreshCw } from "lucide-react";

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {


    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center pointer-events-auto"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6 relative overflow-hidden"
        >
           <WifiOff className="w-12 h-12 text-gray-400 relative z-10" />
           <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>
        </motion.div>
        <h2 className="text-3xl font-black mb-2 text-gray-900">Oops! Campus Wi-Fi is acting up.</h2>
        <p className="text-muted-foreground font-medium mb-8 max-w-md">
          You are currently offline. Please check your internet connection to continue browsing deals.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg"
        >
          <RefreshCw className="w-4 h-4" /> Try Reconnecting
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
