"use client";
import { useAppStore } from '@/lib/store/app-store';
import { BarChart2, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProgressPage() {
  const { profile } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!profile) router.push('/auth/signup');
  }, [profile, router]);

  if (!profile) return null;

  const mockLeaderboard = [
    { name: 'Sarah M.', points: 45, isUser: false },
    { name: 'David K.', points: 38, isUser: false },
    { name: profile.name, points: profile.points, isUser: true },
    { name: 'Elena V.', points: profile.points > 5 ? profile.points - 2 : 0, isUser: false },
    { name: 'James L.', points: profile.points > 10 ? profile.points - 8 : 0, isUser: false },
  ].sort((a, b) => b.points - a.points);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 text-center"
      >
        <div className="w-16 h-16 bg-zinc-50 border border-zinc-100 text-zinc-900 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
          <BarChart2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-semibold mb-2 tracking-tight text-zinc-900">Platform Progress</h1>
        <p className="text-zinc-500 font-medium">Your standing among {profile.targetLanguage} learners</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.02)]"
      >
        {mockLeaderboard.map((user, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-6 border-b border-zinc-50 last:border-0 ${user.isUser ? 'bg-zinc-50/50' : ''}`}
          >
            <div className="w-8 font-semibold text-lg text-zinc-400 text-center">
              {index + 1}
            </div>
            <div className="w-12 h-12 rounded-full bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold text-lg ${user.isUser ? 'text-zinc-900' : 'text-zinc-700'}`}>{user.name} {user.isUser && '(You)'}</h3>
            </div>
            <div className="flex items-center gap-2 font-medium text-zinc-600">
              <Star className="w-4 h-4 text-zinc-400 fill-current" />
              {user.points} XP
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
