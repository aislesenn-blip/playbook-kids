
"use client";
import Link from 'next/link';
import { useAppStore } from '@/lib/store/app-store';
import { Star } from 'lucide-react';
import Image from 'next/image';

export function TopNav() {
  const profile = useAppStore(state => state.profile);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 flex items-center px-4 md:px-8 justify-between">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-xl bg-[#DDA359] text-white flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
          u
        </div>
        <span className="font-bold text-xl tracking-tight">uNiMONDAY</span>
      </Link>

      {profile && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-[#DDA359]/10 text-[#DDA359] px-3 py-1.5 rounded-full font-bold text-sm">
            <Star className="w-4 h-4 fill-current" />
            <span>{profile.points}</span>
          </div>
          <Link href="/profile" className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden relative">
            <Image src={profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} alt={profile.name} fill className="object-cover" unoptimized />
          </Link>
        </div>
      )}
    </nav>
  );
}
