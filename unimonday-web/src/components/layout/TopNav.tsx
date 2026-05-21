
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
        <div className="relative w-8 h-8 md:w-10 md:h-10">
          <Image src="/logo.png" alt="uNiMONDAY Logo" fill className="object-contain group-hover:scale-105 transition-transform" />
        </div>
        <span className="font-bold text-xl md:text-2xl tracking-tight text-zinc-900 hidden sm:block">uNiMONDAY</span>
      </Link>

      {profile ? (
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

          {/* Parent Dashboard Link */}
          <Link href="/parent-dashboard" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm text-[#DDA359] bg-[#DDA359]/10 hover:bg-[#DDA359]/20 transition-colors">
            Parent Portal
          </Link>

          {/* Profile */}
          <Link href="/profile" className="w-9 h-9 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden relative ml-2 md:ml-0">
            <Image src={profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} alt={profile.name} fill className="object-cover" unoptimized />
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
           <Link href="/auth/login" className="font-bold text-zinc-900 hover:text-[#DDA359] transition-colors hidden sm:block">
             Log In
           </Link>
           <Link href="/auth/signup" className="px-5 py-2.5 bg-[#DDA359] text-white rounded-full font-bold text-sm hover:bg-[#DDA359]/90 transition-colors shadow-lg shadow-[#DDA359]/20">
             Get Started
           </Link>
        </div>
      )}
    </nav>
  );
}
