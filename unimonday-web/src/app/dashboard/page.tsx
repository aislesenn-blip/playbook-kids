
"use client";
import Link from 'next/link';
import { useAppStore } from '@/lib/store/app-store';
import { Play, Lock, Star, ChevronRight, Trophy, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { profile, episodes } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!profile) {
      router.push('/');
    }
  }, [profile, router]);

  if (!profile) return null;

  const currentEpisode = episodes.find(e => !e.isCompleted && !e.isLocked) || episodes[episodes.length - 1];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Welcome Banner */}
      <div className="bg-[#DDA359] text-white rounded-3xl p-8 mb-12 shadow-2xl shadow-[#DDA359]/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2">Welcome back, {profile.name}! 👋</h1>
            <p className="text-white/80 text-lg font-medium">Ready to continue your {profile.targetLanguage} journey?</p>
          </div>
          <div className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <Flame className="w-6 h-6 text-orange-400 mb-1" />
              <span className="font-bold">{profile.streak} Day</span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="flex flex-col items-center">
              <Trophy className="w-6 h-6 text-yellow-300 mb-1" />
              <span className="font-bold">{profile.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Up Next Action */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black">Up Next</h2>
        </div>
        <Link
          href={`/session/${currentEpisode.id}`}
          className="block group relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-[#DDA359] transition-all shadow-sm hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#DDA359]/10 text-[#DDA359] font-bold text-xs uppercase tracking-wider mb-4">
                Episode {currentEpisode.id}
              </div>
              <h3 className="text-2xl font-black mb-2">{currentEpisode.title}</h3>
              <p className="text-gray-500 font-medium text-lg">{currentEpisode.description}</p>
            </div>
            <div className="w-20 h-20 rounded-full bg-[#DDA359] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#DDA359]/30 shrink-0">
              <Play className="w-8 h-8 ml-1" fill="currentColor" />
            </div>
          </div>
        </Link>
      </div>

      {/* Journey Path */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black">Your Journey</h2>
          <Link href="/journey" className="text-[#DDA359] font-bold flex items-center gap-1 hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              className={`flex items-center gap-6 p-4 rounded-2xl border-2 transition-all ${
                ep.isCompleted ? 'bg-white border-gray-100 opacity-70' :
                !ep.isLocked ? 'bg-white border-[#DDA359] shadow-md' :
                'bg-gray-50 border-gray-100 opacity-50'
              }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${
                ep.isCompleted ? 'bg-green-100 text-green-600' :
                !ep.isLocked ? 'bg-[#DDA359] text-white' :
                'bg-gray-200 text-gray-400'
              }`}>
                {ep.isCompleted ? <Star className="w-6 h-6" fill="currentColor" /> :
                 !ep.isLocked ? <span className="font-black text-xl">{ep.id}</span> :
                 <Lock className="w-6 h-6" />}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-lg truncate">{ep.title}</h4>
                <p className="text-sm text-gray-500 truncate">{ep.type.charAt(0).toUpperCase() + ep.type.slice(1)}</p>
              </div>

              {ep.isCompleted && (
                <div className="flex items-center gap-1 text-yellow-400 shrink-0">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < ep.stars ? 'fill-current' : 'fill-transparent stroke-gray-300'}`} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
