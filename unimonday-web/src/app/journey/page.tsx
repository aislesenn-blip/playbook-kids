
"use client";
import { useAppStore } from '@/lib/store/app-store';
import { Lock, Star, Play, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function JourneyPage() {
  const { profile, episodes } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!profile) router.push('/');
  }, [profile, router]);

  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DDA359]/10 text-[#DDA359] font-bold text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span>Curriculum Map</span>
        </div>
        <h1 className="text-4xl font-black mb-2">Your {profile.targetLanguage} Journey</h1>
        <p className="text-gray-500 font-medium text-lg">Season 1: The Foundations</p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-100 -translate-x-1/2 rounded-full z-0" />

        <div className="space-y-12 relative z-10">
          {episodes.map((ep, idx) => {
             const isLeft = idx % 2 === 0;
             const status = ep.isCompleted ? 'completed' : !ep.isLocked ? 'current' : 'locked';

             return (
               <div key={ep.id} className={`flex items-center justify-between w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                 <div className="w-5/12" />

                 <div className="w-2/12 flex justify-center">
                   <Link
                     href={status === 'locked' ? '#' : `/session/${ep.id}`}
                     className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${
                       status === 'completed' ? 'bg-[#DDA359] border-[#DDA359] text-white shadow-xl shadow-[#DDA359]/20 hover:scale-105' :
                       status === 'current' ? 'bg-white border-[#DDA359] text-[#DDA359] scale-110 shadow-2xl shadow-[#DDA359]/30 hover:bg-[#DDA359] hover:text-white' :
                       'bg-gray-100 border-gray-200 text-gray-400'
                     }`}
                   >
                     {status === 'completed' ? <Star className="w-8 h-8 fill-current" /> :
                      status === 'current' ? <Play className="w-8 h-8 ml-1 fill-current" /> :
                      <Lock className="w-8 h-8" />}
                   </Link>
                 </div>

                 <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                   <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                     <span className="text-[#DDA359] font-bold text-xs uppercase tracking-wider mb-2 block">Episode {ep.id}</span>
                     <h3 className="text-xl font-black mb-2">{ep.title}</h3>
                     <p className="text-gray-500 font-medium text-sm">{ep.description}</p>
                   </div>
                 </div>
               </div>
             );
          })}
        </div>
      </div>
    </div>
  );
}
