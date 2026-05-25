"use client";
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppStore } from '@/lib/store/app-store';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string || 'en';
  const setProfile = useAppStore(state => state.setProfile);
  const [email, setEmail] = useState('');
  const t = useTranslations('Auth');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      id: '1',
      name: 'Student',
      parentEmail: email,
      nativeLanguage: 'English',
      targetLanguage: 'Spanish',
      level: 'Starter',
      subscriptionTier: 'Lite',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
      streak: 5,
      points: 250,
      hasCompletedTour: true,
      currentOutfit: 'default',
      unlockedOutfits: ['default']
    });
    router.push(`/${locale}/dashboard`);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-24 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-20 h-20 relative mb-8"
      >
        <Image src="/logo.png" alt="uNiMONDAY Logo" fill className="object-contain" priority />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold mb-2 text-center"
      >
        {t('loginTitle')}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-zinc-500 mb-8 text-center"
      >
        {t('loginSubtitle')}
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleLogin}
        className="w-full space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">{t('emailLabel')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all"
            placeholder="parent@email.com"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-zinc-900 text-white rounded-xl font-medium text-lg hover:bg-zinc-800 transition-colors shadow-sm"
        >
          {t('loginButton')}
        </button>
      </motion.form>
    </div>
  );
}
