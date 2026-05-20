
"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Star, Target, Users } from 'lucide-react';
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const profile = useAppStore(state => state.profile);
  const router = useRouter();

  useEffect(() => {
    if (profile) {
      router.push('/dashboard');
    }
  }, [profile, router]);

  if (profile) return null;

  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full max-w-7xl mx-auto px-4 pt-12 md:pt-24 pb-32 flex flex-col items-center text-center">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-8 max-w-5xl leading-tight"
        >
          Master any language. <br className="hidden md:block"/>
          <span className="text-[#DDA359]">Through living conversations.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-3xl text-gray-500 font-medium max-w-3xl mb-16 leading-relaxed"
        >
          From toddlers to executives, uNiMONDAY adapts to your age and native tongue. Experience an AI ecosystem that teaches German, Swahili, Spanish, and more like a human companion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/onboarding" className="w-full sm:w-auto px-10 py-5 bg-gray-900 text-white rounded-3xl font-bold text-xl flex items-center justify-center gap-2 hover:bg-black transition-all hover:scale-105 shadow-2xl shadow-gray-900/20">
            Start Your Journey <ArrowRight className="w-6 h-6" />
          </Link>
          <button className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 border-2 border-gray-200 rounded-3xl font-bold text-xl flex items-center justify-center gap-2 hover:border-gray-300 transition-all">
            <PlayCircle className="w-6 h-6" /> Watch Trailer
          </button>
        </motion.div>
      </section>

      <section className="w-full bg-white py-24 md:py-32 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#DDA359]/10 text-[#DDA359] flex items-center justify-center mb-8">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Mother-Tongue First</h3>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">We build connection using the language you already know, before immersing you in the new one.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#DDA359]/10 text-[#DDA359] flex items-center justify-center mb-8">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">The Swap Drill</h3>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">No rote memorization. We drop a linguistic pattern and challenge you to swap variables instantly.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#DDA359]/10 text-[#DDA359] flex items-center justify-center mb-8">
                <Star className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Real Roleplay</h3>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">Step into live, adaptive scenarios. Order coffee, negotiate a deal, or embark on a fantasy quest.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
