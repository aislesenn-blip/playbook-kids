
"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
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
          className="text-xl md:text-2xl text-gray-500 font-medium max-w-xl mb-16"
        >
          Speak to learn. Not the other way around.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/auth/signup" className="w-full sm:w-auto px-12 py-5 bg-gray-900 text-white rounded-[2rem] font-bold text-xl flex items-center justify-center gap-2 hover:bg-black transition-all hover:scale-105 shadow-xl shadow-gray-900/20">
            Get Started
          </Link>
          <Link href="/auth/login" className="w-full sm:w-auto px-12 py-5 bg-white text-gray-900 border border-gray-200 rounded-[2rem] font-bold text-xl flex items-center justify-center gap-2 hover:border-gray-300 transition-all">
            Log In
          </Link>
        </motion.div>
      </section>

      <section className="w-full bg-white py-24 md:py-32 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 md:gap-16">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold mb-2">Immersion</h3>
              <p className="text-gray-500 font-medium">Mother-tongue first.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold mb-2">Repetition</h3>
              <p className="text-gray-500 font-medium">The Swap Drill method.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold mb-2">Roleplay</h3>
              <p className="text-gray-500 font-medium">Live adaptive scenarios.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
