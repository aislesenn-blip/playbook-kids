"use client";
import { useAppStore } from '@/lib/store/app-store';
import { Lock, Star, Play, Compass } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function JourneyPage() {
  const { profile, episodes } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!profile) router.push('/auth/signup');
  }, [profile, router]);

  if (!profile) return null;

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen pb-32">
      {/* Header Area */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-white border-b border-zinc-100 pt-12 pb-16 px-4 relative overflow-hidden"
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-start gap-4 px-4 md:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-600 font-medium text-xs tracking-widest uppercase">
            <Compass className="w-4 h-4" />
            <span>Curriculum Map</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-900 tracking-tight">
            {profile.targetLanguage} Practice Plan
          </h1>
          <p className="text-zinc-500 font-medium text-lg max-w-2xl">
            A structured path to building confidence in academic, social, and professional communication.
          </p>
        </div>
      </motion.div>

      {/* Grid layout */}
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 mt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((ep, idx) => {
             const status = ep.isCompleted ? 'completed' : !ep.isLocked ? 'current' : 'locked';

             return (
               <motion.div
                 key={ep.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.1 + (idx * 0.05), ease: "easeOut" }}
               >
                 <Link
                   href={status === 'locked' ? '#' : `/session/${ep.id}`}
                   className={`block relative overflow-hidden rounded-3xl p-8 h-full min-h-[280px] flex flex-col justify-between transition-all border ${
                     status === 'completed' ? 'bg-zinc-50 border-zinc-200 text-zinc-900 hover:border-zinc-300' :
                     status === 'current' ? 'bg-white border-zinc-200 text-zinc-900 shadow-[0_4px_40px_rgba(0,0,0,0.04)] hover:border-zinc-300' :
                     'bg-zinc-50/50 border-transparent text-zinc-400 cursor-not-allowed opacity-60'
                   }`}
                 >
                   {/* Top Icon Badge */}
                   <div className="flex justify-between items-start w-full">
                     <span className={`font-semibold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border ${
                        status === 'current' ? 'border-zinc-200 bg-zinc-50 text-zinc-600' : 'border-transparent bg-zinc-100 text-zinc-400'
                     }`}>
                       {ep.type}
                     </span>
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                       status === 'completed' ? 'bg-zinc-200 text-zinc-600' :
                       status === 'current' ? 'bg-zinc-900 text-white shadow-sm' :
                       'bg-zinc-100 text-zinc-300'
                     }`}>
                       {status === 'completed' ? <Star className="w-4 h-4 fill-current" /> :
                        status === 'current' ? <Play className="w-4 h-4 ml-0.5 fill-current" /> :
                        <Lock className="w-4 h-4" />}
                     </div>
                   </div>

                   <div className="relative z-10 mt-8">
                     <span className="font-semibold text-xs text-zinc-400 mb-2 block">
                       Episode {ep.id} • {15} Min
                     </span>
                     <h3 className="text-xl font-semibold mb-3 leading-tight text-zinc-900">{ep.title}</h3>
                     <p className={`font-medium text-sm leading-relaxed ${status === 'current' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                       {ep.description}
                     </p>
                   </div>
                 </Link>
               </motion.div>
             );
          })}
        </div>
      </div>
    </div>
  );
}
