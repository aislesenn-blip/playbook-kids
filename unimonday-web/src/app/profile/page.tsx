"use client";
import { useAppStore } from '@/lib/store/app-store';
import { Flame, Crown, LogOut, Star, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { MondayOutfit } from '@/types';
import { MondayAvatar } from '@/components/ui/MondayAvatar';

export default function ProfilePage() {
  const { profile, updateProfile } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!profile) router.push('/auth/signup');
  }, [profile, router]);

  if (!profile) return null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      {/* Header Profile */}
      <div className="flex flex-col items-center mb-16">
        <div className="w-24 h-24 rounded-full bg-zinc-100 overflow-hidden relative mb-6 border border-zinc-200 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
           <Image src={profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} alt={profile.name} fill className="object-cover" unoptimized />
        </div>
        <h1 className="text-3xl font-semibold mb-2 text-zinc-900 tracking-tight">{profile.name}</h1>
        <p className="text-zinc-500 font-medium">{profile.targetLanguage} • {profile.level}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-16">
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 flex flex-col items-center shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
          <Flame className="w-8 h-8 text-zinc-400 mb-3" />
          <span className="text-2xl font-semibold text-zinc-900">{profile.streak}</span>
          <span className="text-zinc-500 text-sm font-medium mt-1">Day Streak</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 flex flex-col items-center shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
          <Star className="w-8 h-8 text-[#DDA359] mb-3" />
          <span className="text-2xl font-semibold text-zinc-900">{Math.floor(profile.points / 10)}</span>
          <span className="text-zinc-500 text-sm font-medium mt-1">Words Mastered</span>
        </div>
      </div>

      {/* Monday's Wardrobe */}
      <div className="mb-16">
        <h2 className="text-xl font-semibold mb-6 text-zinc-900 flex items-center justify-between">
          Monday&apos;s Wardrobe
          {profile.subscriptionTier !== 'Pro' && (
            <span className="text-xs font-medium text-orange-500 bg-orange-50 px-3 py-1 rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3" /> Pro Only
            </span>
          )}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(['default', 'astronaut', 'safari'] as MondayOutfit[]).map((outfit) => {
            const isLocked = profile.subscriptionTier !== 'Pro' && outfit !== 'default';
            const isActive = (profile.currentOutfit || 'default') === outfit;

            return (
              <button
                key={outfit}
                disabled={isLocked}
                onClick={() => updateProfile({ currentOutfit: outfit })}
                className={`relative flex flex-col items-center p-6 rounded-[2rem] border transition-all ${
                  isActive
                    ? 'bg-zinc-50 border-zinc-900 shadow-sm'
                    : isLocked
                      ? 'bg-zinc-50/50 border-zinc-100 opacity-60 cursor-not-allowed'
                      : 'bg-white border-zinc-100 hover:border-zinc-300'
                }`}
              >
                <div className="w-full h-64 mb-4 relative pointer-events-none flex items-end justify-center transform scale-75 origin-bottom">
                   <MondayAvatar isListening={false} isProcessing={false} outfit={outfit} />
                </div>
                <span className="text-base font-semibold text-zinc-900 capitalize z-10 mt-[-1rem]">{outfit}</span>

                {isLocked && (
                  <div className="absolute top-4 right-4 text-zinc-400 z-10">
                    <Lock className="w-5 h-5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="mb-16">
        <h2 className="text-xl font-semibold mb-6 text-zinc-900">Current Plan</h2>
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 relative overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-zinc-50 text-zinc-900 rounded-xl flex items-center justify-center border border-zinc-100">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">{profile.subscriptionTier}</h3>
              <p className="text-zinc-500 text-sm mt-1">{profile.parentEmail}</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/upgrade')}
            className="w-full py-4 bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl font-medium hover:bg-zinc-100 transition-colors"
          >
            Manage Subscription
          </button>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem('unimonday-platform-state');
          window.location.href = '/';
        }}
        className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </div>
  );
}
