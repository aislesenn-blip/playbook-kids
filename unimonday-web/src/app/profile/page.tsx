
"use client";
import { useAppStore } from '@/lib/store/app-store';
import { Shield, Flame, Star, Crown, LogOut, Activity, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { profile } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!profile) router.push('/auth/signup');
  }, [profile, router]);

  if (!profile) return null;

  const isChild = profile.role === 'child';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header Profile */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden mb-6 border-4 border-white shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src={profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} alt={profile.name} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl font-black mb-1">{profile.name}</h1>
        <p className="text-gray-500 font-medium">Learning {profile.targetLanguage} • {profile.level}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center shadow-sm">
          <Flame className="w-8 h-8 text-orange-400 mb-2" />
          <span className="text-2xl font-black">{profile.streak}</span>
          <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Day Streak</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center shadow-sm">
          <Star className="w-8 h-8 text-[#DDA359] fill-current mb-2" />
          <span className="text-2xl font-black">{profile.points}</span>
          <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total XP</span>
        </div>
      </div>

      {/* Parent Dashboard Section (If Child) */}
      {isChild && (
        <div className="mb-12 bg-gray-900 text-white rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-[#DDA359]" />
            <h2 className="text-2xl font-black">Parent Dashboard</h2>
          </div>
          <p className="text-gray-400 mb-8 font-medium">Reports sent to: {profile.parentEmail}</p>

          <div className="space-y-6">
            <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-green-400" />
                <span className="font-bold">Speaking Confidence</span>
              </div>
              <span className="font-black text-green-400">High</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-400" />
                <span className="font-bold">Vocabulary Learned</span>
              </div>
              <span className="font-black">12 Words</span>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Plans */}
      <div className="mb-12">
        <h2 className="text-2xl font-black mb-6">Subscription Plan</h2>
        <div className="bg-[#DDA359]/10 border-2 border-[#DDA359] rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#DDA359] text-white px-4 py-1 rounded-bl-xl font-bold text-sm">
            CURRENT
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#DDA359] text-white rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black">uNiMONDAY {profile.subscriptionTier}</h3>
              <p className="text-[#DDA359] font-medium text-sm">Basic AI Hours & Curriculum</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/upgrade')}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-colors mt-2"
          >
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          // Reset store logic here
          localStorage.removeItem('unimonday-learning-store');
          window.location.href = '/';
        }}
        className="w-full py-4 bg-red-50 text-red-500 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>

    </div>
  );
}
