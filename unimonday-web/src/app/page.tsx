"use client";

import { motion } from "framer-motion";
import { Lock, Smartphone, Wallet, PlayCircle, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isApplying, setIsApplying] = useState(false);

  return (
    <div className="min-h-screen bg-[#DDA359] text-black overflow-hidden flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="w-full px-6 py-5 flex items-center justify-between border-b-2 border-black/10 z-50 bg-[#DDA359] sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black text-[#DDA359] rounded-xl flex items-center justify-center font-extrabold text-xl shadow-lg">
            CB
          </div>
          <span className="text-2xl font-black tracking-tight">ContentBuddy</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="hidden sm:flex text-black/80 hover:text-black font-bold transition-colors">
            Creator Login
          </Link>
          <button
            onClick={() => setIsApplying(true)}
            className="bg-black text-[#DDA359] px-6 py-2.5 rounded-full font-bold shadow-xl hover:bg-neutral-800 transition-transform hover:scale-105 active:scale-95"
          >
            Apply to Earn
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl z-10"
        >
          <div className="inline-flex items-center gap-2 bg-black/5 border border-black/10 px-4 py-2 rounded-full mb-8 font-bold text-sm backdrop-blur-sm">
            <Star className="w-4 h-4 text-black fill-black" />
            The Premium Video Vault for African Creators
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-8">
            Your Videos. <br className="hidden md:block" />
            <span className="relative">
              Your Paywall.
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-black/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-xl md:text-2xl font-bold text-black/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop giving your best content to social media for free. Lock your exclusive videos, set your price, and let fans pay instantly via Mobile Money.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button
              onClick={() => setIsApplying(true)}
              className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3"
            >
              Start Monetizing <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/mkojani"
              className="w-full sm:w-auto bg-black/5 border-2 border-black hover:bg-black/10 text-black px-8 py-4 rounded-2xl font-black text-lg transition-colors flex items-center justify-center gap-3"
            >
              <PlayCircle className="w-5 h-5" /> View Demo Profile
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-32 z-10"
        >
           <div className="bg-[#DDA359] border-2 border-black/20 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform text-left">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6">
                 <Lock className="w-7 h-7 text-[#DDA359]" />
              </div>
              <h3 className="text-2xl font-black mb-3">Bulletproof Paywall</h3>
              <p className="font-bold text-black/70 leading-relaxed">
                Anti-screenshot, dynamic DRM, and custom watermarks. Nobody steals your content.
              </p>
           </div>
           <div className="bg-[#DDA359] border-2 border-black/20 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform text-left">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6">
                 <Smartphone className="w-7 h-7 text-[#DDA359]" />
              </div>
              <h3 className="text-2xl font-black mb-3">Instant M-Pesa</h3>
              <p className="font-bold text-black/70 leading-relaxed">
                Frictionless payment in 30 seconds. No forced sign-ups. Fans just enter their phone number and watch.
              </p>
           </div>
           <div className="bg-[#DDA359] border-2 border-black/20 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform text-left">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6">
                 <Wallet className="w-7 h-7 text-[#DDA359]" />
              </div>
              <h3 className="text-2xl font-black mb-3">The 80% Cut</h3>
              <p className="font-bold text-black/70 leading-relaxed">
                You keep 80% of every sale. Withdraw directly to your bank or mobile wallet instantly.
              </p>
           </div>
        </motion.div>
      </main>

      {/* KYC Modal Mock */}
      {isApplying && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
           <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="bg-[#DDA359] border-2 border-black rounded-3xl p-8 max-w-md w-full shadow-2xl"
           >
             <h2 className="text-3xl font-black mb-2">Apply for Access</h2>
             <p className="text-black/70 font-bold mb-6">We manually verify creators to maintain high quality.</p>

             <div className="space-y-4 mb-8">
               <div>
                 <label className="block font-bold mb-2">Creator Name</label>
                 <input type="text" placeholder="e.g. Mkojani TV" className="w-full bg-black/5 border-2 border-black/20 rounded-xl px-4 py-3 font-bold focus:border-black outline-none placeholder:text-black/30" />
               </div>
               <div>
                 <label className="block font-bold mb-2">Social Media Link</label>
                 <input type="text" placeholder="Instagram or YouTube URL" className="w-full bg-black/5 border-2 border-black/20 rounded-xl px-4 py-3 font-bold focus:border-black outline-none placeholder:text-black/30" />
               </div>
               <div>
                 <label className="block font-bold mb-2">Phone Number</label>
                 <input type="tel" placeholder="07XX XXX XXX" className="w-full bg-black/5 border-2 border-black/20 rounded-xl px-4 py-3 font-bold focus:border-black outline-none placeholder:text-black/30" />
               </div>
             </div>

             <div className="flex gap-4">
               <button
                 onClick={() => setIsApplying(false)}
                 className="flex-1 bg-black/10 hover:bg-black/20 text-black font-bold py-3 rounded-xl transition-colors"
               >
                 Cancel
               </button>
               <button
                 onClick={() => {
                   alert("Application submitted! We will review and contact you.");
                   setIsApplying(false);
                 }}
                 className="flex-1 bg-black text-[#DDA359] font-bold py-3 rounded-xl hover:bg-neutral-800 transition-colors"
               >
                 Submit
               </button>
             </div>
           </motion.div>
        </div>
      )}
    </div>
  );
}
