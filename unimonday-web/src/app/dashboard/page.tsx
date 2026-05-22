"use client";
import { useAppStore } from '@/lib/store/app-store';
import { Play, Lock, ChevronRight, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { profile, episodes } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!profile) {
      router.push('/auth/signup');
    }
  }, [profile, router]);

  if (!profile) return null;

  const currentEpisode = episodes.find(e => !e.isCompleted && !e.isLocked) || episodes[0];

  const categories = [
    { title: "Story Universe", items: episodes.filter(e => e.type === 'story') },
    { title: "Vocabulary Fun", items: episodes.filter(e => e.type === 'vocabulary') },
    { title: "Everyday Roleplay", items: episodes.filter(e => e.type === 'roleplay') }
  ];

  return (
    <div className="w-full bg-[#F8F6F3] min-h-screen pb-32 overflow-x-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-white border-b border-zinc-100 pt-12 pb-16 px-4 relative overflow-hidden"
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 px-4 md:px-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2 tracking-tight text-zinc-900">Hello, {profile.name}! 👋</h1>
            <p className="text-lg text-zinc-500 font-medium">Are you ready to practice {profile.targetLanguage}?</p>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 mt-10 space-y-16">

        {/* Up Next Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="bg-white rounded-[2rem] p-8 shadow-[0_4px_40px_rgba(0,0,0,0.02)] border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group hover:border-zinc-200 transition-colors cursor-pointer"
          onClick={() => router.push(`/session/${currentEpisode.id}`)}
        >
           <div className="relative z-10 max-w-xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDA359]/10 text-[#DDA359] font-medium text-xs mb-4 uppercase tracking-wider border border-[#DDA359]/20">
               <Star className="w-3.5 h-3.5 fill-current" /> Up Next
             </div>
             <h2 className="text-2xl font-semibold mb-2 text-zinc-900">{currentEpisode.title}</h2>
             <p className="text-zinc-500 font-medium text-base mb-6 leading-relaxed">{currentEpisode.description}</p>
             <div className="flex items-center gap-2 text-zinc-900 font-medium">
                <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center group-hover:bg-[#DDA359] group-hover:text-white transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <span>Start Practice</span>
             </div>
           </div>
        </motion.div>

        {/* Practice Categories */}
        {categories.filter(c => c.items.length > 0).map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
            className="pt-4"
          >
             <div className="flex items-center justify-between mb-6 px-2">
               <h3 className="text-xl font-semibold text-zinc-900">{category.title}</h3>
               <button className="flex items-center text-zinc-500 font-medium text-sm hover:text-zinc-900 transition-colors group">
                 View all <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
             </div>
             <div className="overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
               <div className="flex gap-4 sm:gap-6 min-w-max">
                 {category.items.map((ep) => (
                    <div
                      key={ep.id}
                      onClick={() => !ep.isLocked && router.push(`/session/${ep.id}`)}
                      className={`w-[80vw] sm:w-[280px] shrink-0 p-6 rounded-3xl border transition-all group flex flex-col ${
                        ep.isLocked
                          ? 'bg-zinc-50 border-transparent opacity-60 cursor-not-allowed'
                          : 'bg-white border-zinc-100 hover:border-zinc-200 shadow-[0_4px_40px_rgba(0,0,0,0.02)] cursor-pointer'
                      }`}
                    >
                       <div className="flex justify-between items-start mb-6">
                         <span className="px-3 py-1 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-500 text-[10px] font-semibold uppercase tracking-widest">
                           {ep.type}
                         </span>
                         {ep.isLocked ? (
                            <Lock className="w-4 h-4 text-zinc-300" />
                         ) : ep.isCompleted ? (
                            <div className="flex gap-0.5">
                              {[...Array(3)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < ep.stars ? 'text-[#DDA359] fill-current' : 'text-zinc-200'}`} />
                              ))}
                            </div>
                         ) : null}
                       </div>
                       <h4 className="font-semibold text-lg mb-2 text-zinc-900 leading-tight">{ep.title}</h4>
                       <p className="text-zinc-500 font-medium text-sm line-clamp-2 leading-relaxed flex-1">{ep.description}</p>
                    </div>
                 ))}
               </div>
             </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}
