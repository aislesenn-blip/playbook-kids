"use client";
import Link from 'next/link';
import { useAppStore } from '@/lib/store/app-store';
import { Play, Lock, ChevronRight, Trophy, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Dashboard() {
  const { profile, episodes } = useAppStore();
  const router = useRouter();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (!profile) {
      router.push('/auth/signup');
    }
  }, [profile, router]);

  if (!profile) return null;

  const currentEpisode = episodes.find(e => !e.isCompleted && !e.isLocked) || episodes[0];

  const categories = [
    { title: "Travel Scenarios", items: episodes.filter(e => e.type === 'roleplay').slice(0, 4) },
    { title: "Business Talk", items: episodes.filter(e => e.type === 'challenge').slice(0, 4) },
    { title: "Story Universe", items: episodes.filter(e => e.type === 'story').slice(0, 4) }
  ];

  return (
    <div className="w-full bg-zinc-50 min-h-screen pb-32" ref={containerRef}>

      {/* Hero Header */}
      <motion.div
        style={{ y: headerY, opacity: headerOpacity }}
        className="w-full bg-zinc-950 text-white pt-20 pb-32 px-4 rounded-b-[3rem] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DDA359]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-3">Welcome back, {profile.name}!</h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-xl">Continue mastering {profile.targetLanguage}. You are doing great!</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm font-bold uppercase">Streak</p>
                <p className="text-2xl font-black">{profile.streak} <span className="text-base font-medium text-zinc-500">Days</span></p>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm font-bold uppercase">Level</p>
                <p className="text-2xl font-black">{profile.level}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20 space-y-12">

        {/* Continue Playing / Up Next */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-zinc-900">Up Next</h2>
            <Link href="/journey" className="text-[#DDA359] font-bold flex items-center gap-1 hover:underline">
              Curriculum Map <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <Link
            href={`/session/${currentEpisode.id}`}
            className="block group relative bg-white rounded-3xl p-8 md:p-12 border border-gray-200 hover:border-[#DDA359] transition-all shadow-xl shadow-gray-200/50 hover:shadow-[#DDA359]/20 overflow-hidden"
          >
             {/* Mock visual background */}
            <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-[#DDA359]/10 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex-1 pr-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#DDA359]/10 text-[#DDA359] font-bold text-xs uppercase tracking-widest mb-4">
                  <Play className="w-3 h-3" fill="currentColor" /> Episode {currentEpisode.id}
                </div>
                <h3 className="text-3xl md:text-5xl font-black mb-4 text-zinc-900 tracking-tight">{currentEpisode.title}</h3>
                <p className="text-gray-500 font-medium text-lg md:text-xl max-w-2xl">{currentEpisode.description}</p>
              </div>
              <div className="w-24 h-24 rounded-full bg-[#DDA359] text-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all shadow-2xl shadow-[#DDA359]/40 shrink-0 cursor-pointer">
                <Play className="w-10 h-10 ml-1" fill="currentColor" />
              </div>
            </div>
          </Link>
        </section>

        {/* Netflix-style Carousels */}
        {categories.map((cat, idx) => (
          <section key={idx} className="w-full">
            <h2 className="text-2xl font-black text-zinc-900 mb-6">{cat.title}</h2>

            {/* Scrollable Container */}
            <div className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {cat.items.map((ep, i) => {
                const isLocked = ep.isLocked;

                return (
                  <Link
                    key={ep.id}
                    href={isLocked ? '#' : `/session/${ep.id}`}
                    className={`snap-start shrink-0 w-72 md:w-80 relative rounded-3xl p-6 flex flex-col justify-end transition-all h-[340px] overflow-hidden ${
                      isLocked ? 'cursor-not-allowed' : 'hover:scale-[1.02] cursor-pointer'
                    }`}
                  >
                    {/* Background image mockup */}
                    <div className="absolute inset-0 bg-zinc-900">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={`https://images.unsplash.com/photo-${1590000000000 + i}?q=80&w=400&auto=format&fit=crop`} alt="" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 backdrop-blur-md ${isLocked ? 'bg-white/10 text-white/50' : 'bg-[#DDA359] text-white shadow-lg'}`}>
                        {isLocked ? <Lock className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" fill="currentColor"/>}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 block">Episode {ep.id}</span>
                      <h3 className="text-2xl font-black text-white leading-tight mb-2">{ep.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
}