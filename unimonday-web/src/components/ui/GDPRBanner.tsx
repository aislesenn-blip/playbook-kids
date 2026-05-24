"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export function GDPRBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted the terms
    const hasAccepted = localStorage.getItem('unimonday-gdpr-accepted');
    if (!hasAccepted) {
      // Delay slightly for a smoother entrance
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('unimonday-gdpr-accepted', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6 flex justify-center pointer-events-none"
        >
          <div className="bg-white pointer-events-auto w-full max-w-4xl rounded-3xl sm:rounded-[32px] shadow-[0_-8px_40px_rgba(0,0,0,0.08)] border border-zinc-100 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">

             <div className="absolute top-0 right-0 w-64 h-64 bg-[#DDA359]/5 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2" />

             <div className="flex items-start gap-4 flex-1">
               <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center shrink-0 border border-zinc-100">
                  <ShieldCheck className="w-6 h-6 text-[#DDA359]" />
               </div>
               <div>
                 <h3 className="text-zinc-900 font-semibold text-lg mb-1">Strictly GDPR-K Compliant</h3>
                 <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl">
                   uNiMONDAY is built for children. We enforce strict Zero Audio Retention.
                   Voice sessions are processed in real-time and immediately discarded.
                   By using our platform, you agree to our privacy policy and terms of service
                   designed to keep your family safe.
                 </p>
               </div>
             </div>

             <div className="w-full sm:w-auto shrink-0 flex gap-3">
               <button
                 onClick={handleAccept}
                 className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium transition-colors"
               >
                 Accept & Continue
               </button>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
