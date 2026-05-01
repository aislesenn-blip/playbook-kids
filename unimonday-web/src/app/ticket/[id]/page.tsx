"use client";

import { useEffect, useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds to show vendor
  const [isExpired, setIsExpired] = useState(false);

  // Background color animation values for active state
  const colors = ["#00E676", "#1DE9B6", "#00B0FF", "#651FFF", "#F50057", "#FFEA00"];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    if (!isActive || isExpired) return;

    // Color shifting interval (Anti-screenshot visual)
    const colorInterval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length);
    }, 800); // Shift every 800ms

    // Countdown timer
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          setIsActive(false);
          clearInterval(colorInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Haptic feedback (if supported by browser/device)
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
       // Short vibration pattern to indicate it's active
       window.navigator.vibrate([100, 50, 100]);
    }

    return () => {
      clearInterval(colorInterval);
      clearInterval(timerInterval);
    };
  }, [isActive, isExpired, colors.length]);

  const handleActivate = () => {
    // In a real app, you might want a confirmation dialog here
    // "Are you standing in front of the vendor?"
    if (confirm("Are you at the counter? This ticket will expire in 15 seconds once activated.")) {
      setIsActive(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-4">

      {!isActive && !isExpired && (
         <div className="absolute top-6 left-6 z-10">
            <Link href="/" className="p-3 bg-secondary rounded-full inline-flex hover:bg-secondary/80">
              <ArrowLeft className="w-6 h-6" />
            </Link>
         </div>
      )}

      <AnimatePresence mode="wait">
        {!isActive && !isExpired ? (
          // STATE 1: LOCKED TICKET (Before showing to vendor)
          <motion.div
            key="locked"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-[3rem] p-8 max-w-sm w-full shadow-2xl border border-border flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black mb-2">Payment Confirmed</h1>
            <p className="text-muted-foreground font-medium mb-8">
              Order {resolvedParams.id} is ready for pickup. Go to the collection counter.
            </p>

            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl mb-8 flex gap-3 text-left text-sm font-medium">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
              <p>Do not activate this ticket until you are standing directly in front of the vendor.</p>
            </div>

            <button
              onClick={handleActivate}
              className="w-full bg-foreground text-background py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl active:scale-95"
            >
              Slide to Reveal Ticket
            </button>
          </motion.div>
        ) : isActive && !isExpired ? (
          // STATE 2: ACTIVE LIVE TICKET (Anti-screenshot mode)
          <motion.div
            key="active"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              backgroundColor: colors[currentColorIndex]
            }}
            transition={{ backgroundColor: { duration: 0.5 } }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="w-32 h-32 border-4 border-white border-t-transparent rounded-full mb-8 flex items-center justify-center"
            >
               <ShieldCheck className="w-16 h-16 text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-2 uppercase tracking-widest opacity-90">Active Ticket</h2>
            <h1 className="text-6xl font-black mb-12 tabular-nums tracking-tighter">
              {resolvedParams.id}
            </h1>

            <div className="text-[12rem] font-black leading-none tabular-nums opacity-90 mb-8">
              {timeLeft}
            </div>

            <p className="text-2xl font-bold opacity-90">Show this screen to vendor</p>
          </motion.div>
        ) : (
          // STATE 3: EXPIRED/CLAIMED
          <motion.div
            key="expired"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 text-white rounded-[3rem] p-12 max-w-sm w-full shadow-2xl flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 className="w-12 h-12 text-zinc-500" />
            </div>
            <h1 className="text-4xl font-black mb-4 tracking-tight">Claimed</h1>
            <p className="text-zinc-400 font-medium mb-12 text-lg">
              This ticket has been used and is no longer valid.
            </p>
            <Link
              href="/"
              className="w-full bg-white text-black py-5 rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
