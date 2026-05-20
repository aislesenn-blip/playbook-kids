
"use client";
import { useAppStore } from '@/lib/store/app-store';
import { Trophy, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LeaderboardPage() {
  const { profile } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!profile) router.push('/');
  }, [profile, router]);

  if (!profile) return null;

  const mockLeaderboard = [
    { name: 'Sarah M.', points: 2450, isUser: false },
    { name: 'David K.', points: 2310, isUser: false },
    { name: profile.name, points: profile.points, isUser: true },
    { name: 'Elena V.', points: profile.points > 100 ? profile.points - 50 : 0, isUser: false },
    { name: 'James L.', points: profile.points > 200 ? profile.points - 120 : 0, isUser: false },
  ].sort((a, b) => b.points - a.points);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-yellow-100 text-yellow-500 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-xl shadow-yellow-100">
          <Trophy className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-black mb-2">Global League</h1>
        <p className="text-gray-500 font-medium text-lg">Top learners in {profile.targetLanguage}</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        {mockLeaderboard.map((user, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-6 border-b border-gray-50 last:border-0 ${user.isUser ? 'bg-[#DDA359]/5' : ''}`}
          >
            <div className="w-8 font-black text-xl text-gray-400 text-center">
              {index + 1}
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className={`font-bold text-lg ${user.isUser ? 'text-[#DDA359]' : ''}`}>{user.name} {user.isUser && '(You)'}</h3>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-gray-700">
              <Star className="w-5 h-5 text-[#DDA359] fill-current" />
              {user.points}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
