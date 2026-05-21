"use client";
import Link from 'next/link';
import { useAppStore } from '@/lib/store/app-store';
import { Play, Lock, ChevronRight, Trophy, Flame, Target, Gift } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { profile, episodes, dailyQuests } = useAppStore();
  const router = useRouter();


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
    <div className="w-full bg-zinc-50 min-h-screen pb-32" >

      {/* Hero Header */}
      <motion.div

        className="w-full bg-white text-zinc-900 border-b border-gray-200 pt-20 pb-32 px-4 rounded-b-[3rem] shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DDA359]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-3">Welcome back, {profile.name}!</h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-xl">Continue mastering {profile.targetLanguage}. You are doing great!</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase">Streak</p>
                <p className="text-2xl font-black">{profile.streak} <span className="text-base font-medium text-zinc-500">Days</span></p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase">Level</p>
                <p className="text-2xl font-black">{profile.level}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 -mt-16 relative z-20 space-y-12">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12 overflow-hidden">

            {/* Continue Playing / Up Next */}
            <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-zinc-900">Up Next</h2>
            <Link href="/journey" className="text-[#DDA359] font-bold flex items-center gap-1 hover:underline">
              Curriculum Map <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-nowrap gap-4 overflow-x-auto pb-8 -mx-4 px-4 sm:-mx-0 sm:px-0 scrollbar-hide snap-x">
            <Link
              href={`/session/${currentEpisode.id}`}
              className="snap-start shrink-0 w-[75vw] sm:w-[280px] relative rounded-3xl p-6 flex flex-col justify-end transition-all h-[340px] overflow-hidden hover:scale-[1.02] cursor-pointer bg-white border border-[#DDA359] shadow-2xl shadow-[#DDA359]/20"
            >
              <div className="absolute inset-0 bg-[#DDA359]/5" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#DDA359] text-white flex items-center justify-center mb-4 shadow-lg shadow-[#DDA359]/40 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#DDA359] mb-2 block">Episode {currentEpisode.id}</span>
                <h3 className="text-2xl font-black text-zinc-900 leading-tight mb-2">{currentEpisode.title}</h3>
              </div>
            </Link>
          </div>
            </section>

            {/* Netflix-style Carousels */}
        {categories.map((cat, idx) => (
          <section key={idx} className="w-full">
                <h2 className="text-2xl font-black text-zinc-900 mb-6">{cat.title}</h2>

                {/* Scrollable Container */}
            <div className="flex flex-nowrap gap-4 overflow-x-auto pb-8 -mx-4 px-4 sm:-mx-0 sm:px-0 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {cat.items.map((ep, i) => {
                const isLocked = ep.isLocked;

                return (
                  <Link
                    key={ep.id}
                    href={isLocked ? '#' : `/session/${ep.id}`}
                    className={`snap-start shrink-0 w-[75vw] sm:w-[280px] shrink-0 relative rounded-3xl p-6 flex flex-col justify-end transition-all h-[340px] overflow-hidden ${
                      isLocked ? 'cursor-not-allowed' : 'hover:scale-[1.02] cursor-pointer'
                    }`}
                  >
                    {/* Background image mockup */}
                    <div className="absolute inset-0 bg-gray-100">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={`https://images.unsplash.com/photo-${1590000000000 + i}?q=80&w=400&auto=format&fit=crop`} alt="" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 backdrop-blur-md ${isLocked ? 'bg-white text-gray-400' : 'bg-[#DDA359] text-white shadow-lg'}`}>
                        {isLocked ? <Lock className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" fill="currentColor"/>}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Episode {ep.id}</span>
                      <h3 className="text-2xl font-black text-zinc-900 leading-tight mb-2">{ep.title}</h3>
                    </div>
                  </Link>
                );
              })}
                </div>
              </section>
            ))}

          </div>

          {/* Right Sidebar - Gamification */}
          <div className="space-y-8">

            {/* Daily Quests */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl shadow-gray-200/50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-zinc-900">Daily Quests</h3>
                <Target className="w-6 h-6 text-[#DDA359]" />
              </div>

              <div className="space-y-6">
                {dailyQuests?.map(quest => (
                  <div key={quest.id} className="relative hover:scale-[1.02] transition-transform">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-4">
                        <p className={`font-bold ${quest.isCompleted ? 'text-gray-400 line-through' : 'text-zinc-900'}`}>
                          {quest.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-sm font-bold text-[#DDA359]">
                          <Gift className="w-4 h-4" /> +{quest.rewardXP} XP
                        </div>
                      </div>
                      <div className="font-black text-lg text-zinc-300">
                        {quest.progress}/{quest.target}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${quest.isCompleted ? 'bg-green-500' : 'bg-[#DDA359]'}`}
                        style={{ width: `${Math.min((quest.progress / quest.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}