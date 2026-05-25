"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store/app-store';
import { useRouter, useParams } from 'next/navigation';
import { Mic, ArrowRight } from 'lucide-react';
import { GDPRBanner } from '@/components/ui/GDPRBanner';
import { useTranslations } from 'next-intl';

export default function LandingPage() {
  const profile = useAppStore(state => state.profile);
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations();

  useEffect(() => {
    if (profile) {
      router.push(`/${locale}/dashboard`);
    }
  }, [profile, router, locale]);

  if (profile) return null;

  return (
    <div className="w-full flex flex-col items-center bg-[#F8F6F3] min-h-screen">
      <section className="w-full px-4 pt-24 md:pt-32 pb-24 flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 w-24 h-24 md:w-32 md:h-32 relative"
        >
          <Image src="/logo.png" alt="uNiMONDAY" fill className="object-contain" priority />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 max-w-4xl mb-6 leading-tight"
          dangerouslySetInnerHTML={{ __html: t('Hero.title') }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl mb-12 leading-relaxed"
        >
          {t('Hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto"
        >
          <button
            onClick={() => router.push(`/${locale}/demo/intro`)}
            className="flex-1 py-4 px-8 bg-zinc-900 text-white rounded-xl font-medium text-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-[0_4px_40px_rgba(0,0,0,0.06)]"
          >
            {t('Hero.cta')} <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

      </section>

      <section className="w-full max-w-5xl mx-auto px-4 pb-32">
        <div className="grid md:grid-cols-3 gap-6">
           <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 text-zinc-800">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900">{t('Features.practice.title')}</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                 {t('Features.practice.description')}
              </p>
           </div>
           <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 text-zinc-800">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900">{t('Features.parent.title')}</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                 {t('Features.parent.description')}
              </p>
           </div>
           <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 text-zinc-800">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900">{t('Features.anxietyFree.title')}</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                 {t('Features.anxietyFree.description')}
              </p>
           </div>
        </div>
      </section>

      <GDPRBanner />
    </div>
  );
}
