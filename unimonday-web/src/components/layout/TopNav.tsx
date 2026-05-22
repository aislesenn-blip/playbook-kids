"use client";
import Link from 'next/link';
import { useAppStore } from '@/lib/store/app-store';
import { Flame, Star } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function TopNav() {
  const profile = useAppStore(state => state.profile);

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-[#F8F6F3]/95 backdrop-blur-md border-b border-zinc-100 z-[100] flex items-center px-4 md:px-8 justify-between shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="relative w-10 h-10">
          <Image src="/logo.png" alt="uNiMONDAY Logo" fill className="object-contain group-hover:scale-105 transition-transform" />
        </div>
        <span className="font-semibold text-xl tracking-tight text-zinc-900 hidden sm:block">uNiMONDAY</span>
      </Link>

      {profile ? (
        <div className="flex items-center gap-2 md:gap-4">
          {profile.points > 0 && (
            <>
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm text-zinc-600 bg-white shadow-sm border border-zinc-100">
                <Flame className="w-5 h-5 text-orange-400 fill-current" />
                <span>{profile.streak}</span>
              </div>

              <div className="flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm text-zinc-600 bg-white shadow-sm border border-zinc-100">
                <Star className="w-5 h-5 text-[#DDA359] fill-current" />
                <span>{profile.points}</span>
              </div>
            </>
          )}

          <div className="w-px h-6 bg-zinc-200 hidden md:block mx-1" />

          {/* Hidden Parent Portal Link - Only visible when clicking profile, but keeping it simple for now */}

          <Link href="/profile" className="relative ml-2 md:ml-0 block">
             <motion.div whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden relative hover:border-zinc-300 transition-colors shadow-sm cursor-pointer">
               <Image src={profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} alt={profile.name} fill className="object-cover" unoptimized />
             </motion.div>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
           <Link href="/auth/login" className="font-medium text-zinc-600 hover:text-zinc-900 transition-colors hidden sm:block">
             Log In
           </Link>

        </div>
      )}
    </nav>
  );
}
