
"use client";
import Link from 'next/link';
import { useAppStore } from '@/lib/store/app-store';
import { Flame, Heart } from 'lucide-react';
import Image from 'next/image';

export function TopNav() {
  const profile = useAppStore(state => state.profile);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-gray-100 z-[100] flex items-center px-4 md:px-8 justify-between">
      <Link href="/" className="flex items-center gap-2 group">
        <Image src="/unimonday-logo.png" alt="uNiMONDAY Logo" width={32} height={32} className="object-contain group-hover:scale-105 transition-transform" />
        <span className="font-bold text-xl tracking-tight">uNiMONDAY</span>
      </Link>

      {profile && (
        <div className="flex items-center gap-2 md:gap-4">
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm text-zinc-700 hover:bg-zinc-100 transition-colors">
            <Flame className="w-5 h-5 text-orange-500 fill-current" />
            <span>{profile.streak}</span>
          </div>

          {/* Hearts / Lives */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm text-zinc-700 hover:bg-zinc-100 transition-colors">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <span>{profile.hearts ?? 5}</span>
          </div>

          <div className="w-px h-6 bg-gray-200 hidden md:block mx-2" />

          {/* Profile */}
          <Link href="/profile" className="w-9 h-9 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden relative ml-2 md:ml-0">
            <Image src={profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} alt={profile.name} fill className="object-cover" unoptimized />
          </Link>
        </div>
      )}
    </nav>
  );
}
