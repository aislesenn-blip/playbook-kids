
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';
import { Mic, Globe, Zap, Sparkles } from 'lucide-react';

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
      <section className="w-full px-4 pt-20 md:pt-32 pb-24 flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="mb-8 w-48 h-48 md:w-64 md:h-64 relative"
        >
          <Image src="/logo.png" alt="uNiMONDAY Logo" fill className="object-contain" priority />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black tracking-tight mb-4 w-full text-zinc-900"
        >
          The Language University for Kids.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-500 font-medium max-w-xl mb-4"
        >
          A structured, voice-powered learning environment designed exclusively for children under 13.
        </motion.p>

      </section>

      {/* Bento Box Features Section */}
      <section className="w-full bg-zinc-50 py-24 md:py-32 rounded-t-[3rem] mt-12 px-4">
        <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-zinc-900">A curriculum built for kids.</h2>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">Safe, engaging, and entirely voice-driven. No typing required.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[300px]">
            {/* Bento Card 1 - Large Voice Interaction */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 bg-zinc-900/90 backdrop-blur-lg text-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden group shadow-xl"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#DDA359]/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#DDA359]/30 transition-all duration-700" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <Mic className="w-12 h-12 text-[#DDA359] mb-4" />
                <div>
                  <h3 className="text-3xl md:text-4xl font-black mb-3 leading-tight">Live Voice Roleplay.</h3>
                  <p className="text-zinc-400 font-medium text-lg max-w-md">Stop tapping multiple-choice buttons. Kids step into magical scenarios—like asking a wizard for directions or ordering at a monster cafe—using their actual voice.</p>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 2 - The Swap Drill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border-2 border-gray-100 rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-xl shadow-gray-200/50"
            >
              <div className="h-full flex flex-col justify-between">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-orange-500 fill-current" />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-2 tracking-tight text-zinc-900">Interactive Drills.</h3>
                  <p className="text-gray-500 font-medium">No boring grammar tables. We teach natural sentence structures through quick, fun speaking challenges.</p>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 3 - Parent Integration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#DDA359] to-[#c99047] text-white rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-xl shadow-[#DDA359]/30"
            >
              <div className="absolute -bottom-10 -right-10 opacity-20">
                <Globe className="w-48 h-48" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-2 tracking-tight">Parent Dashboard.</h3>
                  <p className="text-white/90 font-medium">Track your child&apos;s progress, view their pronunciation accuracy, and get offline homework suggestions.</p>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 4 - Netflix Style Curriculum */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 bg-zinc-100 rounded-[2rem] p-8 md:p-12 relative overflow-hidden"
            >
              <div className="h-full flex flex-col justify-center">
                <span className="text-[#DDA359] font-bold tracking-widest uppercase mb-2 block">Episodic Learning</span>
                <h3 className="text-3xl md:text-4xl font-black mb-3 leading-tight text-zinc-900">An animated journey to fluency.</h3>
                <p className="text-gray-500 font-medium text-lg max-w-xl">Binge-worthy seasons and episodes. Kids earn XP, unlock new animal characters, and progress through a structured curriculum that feels like an adventure game.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
