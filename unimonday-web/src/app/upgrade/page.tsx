"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function UpgradePage() {
  const router = useRouter();
  const { profile, updateProfile } = useAppStore();
  const [loadingTier, setLoadingTier] = useState<'Lite' | 'X' | 'Pro' | null>(null);

  const handleUpgrade = (tier: 'Lite' | 'X' | 'Pro') => {
    setLoadingTier(tier);
    setTimeout(() => {
      if (profile) updateProfile({ subscriptionTier: tier });
      router.push('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3] text-zinc-900 pb-32">
      {/* Cinematic Header */}
      <div className="relative pt-24 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#DDA359]/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center relative"
        >
          <Image src="/logo.png" alt="uNiMONDAY Logo" width={80} height={80} className="object-contain" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6"
        >
          Unlock their potential. <br className="hidden md:block"/> Invest in their fluency.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative text-lg text-zinc-500 font-medium max-w-2xl mx-auto"
        >
          {profile
            ? `Your child's ${profile.targetLanguage} learning environment is ready. Select a plan to continue.`
            : `Select a plan to give your child access to a modern, safe, and engaging language-learning ecosystem.`}
        </motion.p>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start pt-8">

        {/* UniMonday X TIER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-zinc-200 rounded-3xl p-8 flex flex-col shadow-[0_4px_40px_rgba(0,0,0,0.02)]"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">UniMonday X</h3>
            <p className="text-zinc-500 font-medium h-12">Essential tools for regular practice and confidence building.</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-semibold">$12</span>
              <span className="text-zinc-500 font-medium">/month</span>
            </div>
          </div>

          <div className="w-full h-px bg-zinc-100 mb-8" />

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-zinc-600 font-medium"><Check className="w-5 h-5 text-zinc-400" /> 10 hours of AI voice practice</li>
            <li className="flex items-center gap-3 text-zinc-600 font-medium"><Check className="w-5 h-5 text-zinc-400" /> Daily conversation modules</li>
            <li className="flex items-center gap-3 text-zinc-600 font-medium"><Check className="w-5 h-5 text-zinc-400" /> Basic progress tracking</li>
            <li className="flex items-center gap-3 text-zinc-400 font-medium"><X className="w-5 h-5 text-zinc-300" /> No advanced stories</li>
            <li className="flex items-center gap-3 text-zinc-400 font-medium"><X className="w-5 h-5 text-zinc-300" /> No advanced feedback</li>
          </ul>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => handleUpgrade('X')}
            disabled={!!loadingTier}
            className="w-full py-4 rounded-2xl font-medium text-lg bg-zinc-50 text-zinc-900 border border-zinc-200 hover:bg-zinc-100 transition-colors flex justify-center items-center h-16 disabled:opacity-80"
          >
            {loadingTier === 'X' ? <Loader2 className="w-5 h-5 animate-spin text-zinc-500" /> : "Select UniMonday X"}
          </motion.button>
        </motion.div>

        {/* UniMonday Pro TIER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-2 border-zinc-900 rounded-3xl p-8 flex flex-col shadow-[0_4px_40px_rgba(0,0,0,0.06)] relative"
        >
            <div className="absolute -top-3 right-8 bg-zinc-900 text-white px-4 py-1 rounded-full font-medium text-sm">
              Recommended
            </div>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-semibold text-zinc-900">UniMonday Pro</h3>
              </div>
              <p className="text-zinc-500 font-medium h-12">Comprehensive access for mastering vocabulary and conversational fluency.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-zinc-900">$24</span>
                <span className="text-zinc-500 font-medium">/month</span>
              </div>
            </div>

            <div className="w-full h-px bg-zinc-100 mb-8" />

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-zinc-800 font-medium"><Sparkles className="w-5 h-5 text-[#DDA359]" /> Unlimited AI voice practice</li>
              <li className="flex items-center gap-3 text-zinc-800 font-medium"><Check className="w-5 h-5 text-[#DDA359]" /> Story & roleplay adventures</li>
              <li className="flex items-center gap-3 text-zinc-800 font-medium"><Check className="w-5 h-5 text-[#DDA359]" /> Detailed pronunciation feedback</li>
              <li className="flex items-center gap-3 text-zinc-800 font-medium"><Check className="w-5 h-5 text-[#DDA359]" /> Full access to Parent Portal</li>
              <li className="flex items-center gap-3 text-zinc-800 font-medium"><Check className="w-5 h-5 text-[#DDA359]" /> Priority platform access</li>
            </ul>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => handleUpgrade('Pro')}
              disabled={!!loadingTier}
              className="w-full py-4 rounded-2xl font-medium text-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors flex justify-center items-center h-16 disabled:opacity-80"
            >
              {loadingTier === 'Pro' ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : "Select UniMonday Pro"}
            </motion.button>
            <p className="text-center text-xs text-zinc-400 mt-4">Cancel anytime.</p>
        </motion.div>

      </div>
    </div>
  );
}
