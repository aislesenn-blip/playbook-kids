"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, Crown } from 'lucide-react';

export default function UpgradePage() {
  const router = useRouter();
  const { profile, updateProfile } = useAppStore();

  const handleUpgrade = (tier: 'Lite' | 'X' | 'Pro') => {
    if (profile) {
      updateProfile({ subscriptionTier: tier });
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#DDA359] text-black pb-32">
      {/* Cinematic Header */}
      <div className="relative pt-24 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#DDA359]/20 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center relative"
        >
          <Image src="/logo.png" alt="uNiMONDAY Logo" width={80} height={80} className="object-contain" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-5xl md:text-7xl font-black tracking-tighter mb-6"
        >
          Unlock the <span className="text-[#DDA359]">Living Kids University.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative text-xl text-black/60 font-medium max-w-2xl mx-auto"
        >
          {profile
            ? `Your custom ${profile.targetLanguage} curriculum is ready. Choose the plan that fits your ambition.`
            : `Choose the plan that fits your ambition. No passive lessons. Just real conversations that make you fluent.`}
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 items-end">

        {/* LITE TIER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-black/10 rounded-[2rem] p-8 flex flex-col"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">uNiMONDAY Lite</h3>
            <p className="text-black/60 font-medium h-12">For casual learners starting their journey.</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-black">$12</span>
              <span className="text-black/50 font-bold">/mo</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-black/60 font-medium"><Check className="w-5 h-5 text-[#DDA359]" /> 10 hours AI Voice / month</li>
            <li className="flex items-center gap-3 text-black/60 font-medium"><Check className="w-5 h-5 text-[#DDA359]" /> Basic curriculum</li>
            <li className="flex items-center gap-3 text-black/60 font-medium"><Check className="w-5 h-5 text-[#DDA359]" /> Beginner tracks</li>
            <li className="flex items-center gap-3 text-black/60 font-medium"><X className="w-5 h-5" /> No story adventures</li>
            <li className="flex items-center gap-3 text-black/60 font-medium"><X className="w-5 h-5" /> No parent dashboards</li>
          </ul>

          <button
            onClick={() => handleUpgrade('Lite')}
            className="w-full py-4 rounded-2xl font-bold text-lg bg-black/5 text-black hover:bg-black/10 transition-colors"
          >
            Get Lite
          </button>
        </motion.div>

        {/* X TIER (Mainstream) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-2 border-[#DDA359] rounded-[2rem] p-8 flex flex-col transform md:-translate-y-4 shadow-2xl shadow-[#DDA359]/10 relative"
        >
            <div className="absolute -top-4 right-8 bg-[#fdf2e8] text-[#e87030] px-4 py-1 rounded-full font-bold text-sm tracking-wide">
              Popular
            </div>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-black">uNiMONDAY X</h3>
              </div>
              <p className="text-black/60 font-medium h-12">The complete immersion experience for serious fluency.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-black text-black">$24</span>
                <span className="text-black/50 font-bold">/month</span>
              </div>
              <p className="text-sm font-medium text-black/50 mt-2">Billed monthly</p>
            </div>

            <div className="w-full h-px bg-black/5 mb-6" />

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-black/70 font-medium"><Sparkles className="w-5 h-5 text-black/40" /> 50 hours AI Voice / month</li>
              <li className="flex items-center gap-3 text-black/70 font-medium"><Check className="w-5 h-5 text-black/40" /> Advanced curriculum</li>
              <li className="flex items-center gap-3 text-black/70 font-medium"><Check className="w-5 h-5 text-black/40" /> Story & Fantasy adventures</li>
              <li className="flex items-center gap-3 text-black/70 font-medium"><Check className="w-5 h-5 text-black/40" /> Adaptive roleplay scenarios</li>
              <li className="flex items-center gap-3 text-black/70 font-medium"><Check className="w-5 h-5 text-black/40" /> Full progress analytics</li>
            </ul>

            <button
              onClick={() => handleUpgrade('X')}
              className="w-full py-4 rounded-2xl font-bold text-lg bg-black text-white hover:bg-black transition-all shadow-xl hover:scale-105"
            >
              Get started
            </button>
            <p className="text-center text-xs text-black/40 mt-4">By continuing, you agree to our Subscription Terms</p>
        </motion.div>

        {/* PRO TIER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-black/10 rounded-[2rem] p-8 flex flex-col"
        >
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold text-black">uNiMONDAY Pro</h3>
              <Crown className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-black/60 font-medium h-12">Flagship experience. Unlimited access and multi-language support.</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-black">$49</span>
              <span className="text-black/50 font-bold">/mo</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-black/60 font-medium"><Check className="w-5 h-5 text-[#DDA359]" /> Unlimited AI Voice access</li>
            <li className="flex items-center gap-3 text-black/60 font-medium"><Check className="w-5 h-5 text-[#DDA359]" /> Multi-language learning</li>
            <li className="flex items-center gap-3 text-black/60 font-medium"><Check className="w-5 h-5 text-[#DDA359]" /> Premium celebrity voices</li>
            <li className="flex items-center gap-3 text-black/60 font-medium"><Check className="w-5 h-5 text-[#DDA359]" /> Priority AI responsiveness</li>
            <li className="flex items-center gap-3 text-black/60 font-medium"><Check className="w-5 h-5 text-[#DDA359]" /> Custom learning paths</li>
          </ul>

          <button
            onClick={() => handleUpgrade('Pro')}
            className="w-full py-4 rounded-2xl font-bold text-lg bg-black text-white hover:bg-black transition-colors"
          >
            Get Pro
          </button>
        </motion.div>

      </div>
    </div>
  );
}