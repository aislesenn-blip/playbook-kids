
"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, PlayCircle, Star, Target, Users } from 'lucide-react';
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
      <section className="w-full max-w-7xl mx-auto px-4 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DDA359]/10 text-[#DDA359] font-bold text-sm mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>The Future of Language Learning</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-6 max-w-4xl"
        >
          Not just another lesson. <br className="hidden md:block"/>
          <span className="text-[#DDA359]">A living universe.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mb-12"
        >
          Master English, Spanish, French, Chinese, German, and Swahili through emotionally engaging AI conversations and adventures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/onboarding" className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-black transition-all hover:scale-105 shadow-xl shadow-gray-900/20">
            Start the Journey <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:border-gray-300 transition-all">
            <PlayCircle className="w-5 h-5" /> Watch Trailer
          </button>
        </motion.div>
      </section>

      <section className="w-full bg-white py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#DDA359]/10 text-[#DDA359] flex items-center justify-center mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Conversational Core</h3>
              <p className="text-gray-500 font-medium">Learn naturally by speaking. Our AI companions adapt to your age, level, and personality.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#DDA359]/10 text-[#DDA359] flex items-center justify-center mb-6">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Episodic Stories</h3>
              <p className="text-gray-500 font-medium">Progress through structured seasons, chapters, and missions instead of boring lists.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#DDA359]/10 text-[#DDA359] flex items-center justify-center mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Adaptive Memory</h3>
              <p className="text-gray-500 font-medium">The universe remembers your struggles and strengths, continuously shaping your path.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
