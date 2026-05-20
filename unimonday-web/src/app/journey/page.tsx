"use client";
import { useAppStore } from '@/lib/store/app-store';
import { Lock, Star, Play, MapPin } from 'lucide-react';
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
    <div className="w-full pb-32">
      {/* Header Area */}
      <div className="bg-zinc-900 pt-20 pb-24 px-6 rounded-b-[3rem]">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#DDA359] font-bold text-sm mb-6">
            <MapPin className="w-4 h-4" />
            <span>Curriculum Map</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Your {profile.targetLanguage} Journey
          </h1>
          <p className="text-zinc-400 font-medium text-lg md:text-xl max-w-2xl">
            Season 1: The Foundations. Complete episodes to unlock new characters, roleplays, and adventures.
          </p>
        </div>
      </div>

      {/* Netflix-style horizontal or grid layout */}
      <div className="max-w-6xl mx-auto px-6 -mt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodes.map((ep, idx) => {
             const status = ep.isCompleted ? 'completed' : !ep.isLocked ? 'current' : 'locked';

             return (
               <motion.div
                 key={ep.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.1 }}
               >
                 <Link
                   href={status === 'locked' ? '#' : `/session/${ep.id}`}
                   className={`block relative overflow-hidden rounded-[2rem] p-8 h-full min-h-[300px] flex flex-col justify-end transition-all ${
                     status === 'completed' ? 'bg-[#DDA359] text-white shadow-xl shadow-[#DDA359]/20 hover:scale-[1.02]' :
                     status === 'current' ? 'bg-white border-2 border-[#DDA359] text-gray-900 shadow-2xl hover:scale-[1.02]' :
                     'bg-gray-100 text-gray-400 cursor-not-allowed'
                   }`}
                 >
                   {/* Background Image/Pattern mock */}
                   <div className="absolute inset-0 opacity-10">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={`https://images.unsplash.com/photo-[unsplash-id-placeholder]?q=80&w=600&auto=format&fit=crop`} alt="" className="w-full h-full object-cover" />
                   </div>

                   {/* Top Icon Badge */}
                   <div className="absolute top-8 left-8">
                     <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                       status === 'completed' ? 'bg-white/20 backdrop-blur-md text-white' :
                       status === 'current' ? 'bg-[#DDA359] text-white' :
                       'bg-gray-200 text-gray-500'
                     }`}>
                       {status === 'completed' ? <Star className="w-6 h-6 fill-current" /> :
                        status === 'current' ? <Play className="w-6 h-6 ml-1 fill-current" /> :
                        <Lock className="w-6 h-6" />}
                     </div>
                   </div>

                   <div className="relative z-10">
                     <span className={`font-bold text-xs uppercase tracking-widest mb-3 block ${status === 'current' ? 'text-[#DDA359]' : 'opacity-80'}`}>
                       Episode {ep.id}
                     </span>
                     <h3 className="text-2xl font-black mb-3 leading-tight">{ep.title}</h3>
                     <p className={`font-medium text-sm leading-relaxed ${status === 'current' ? 'text-gray-500' : 'opacity-90'}`}>
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