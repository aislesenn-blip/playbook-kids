"use client";
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { ArrowRight, Play, ShieldCheck, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function DemoIntroPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string || 'en';
  const t = useTranslations('DemoIntro');

  return (
    <div className="w-full min-h-screen bg-[#F8F6F3] flex flex-col items-center pt-24 pb-32 px-4">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_4px_40px_rgba(0,0,0,0.02)] border border-zinc-100">

        <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#DDA359]/10 rounded-2xl flex items-center justify-center">
              <Play className="w-8 h-8 text-[#DDA359] ml-1 fill-current" />
            </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-semibold text-zinc-900 mb-4 tracking-tight">{t('title')}</h1>
          <p className="text-zinc-500 font-medium leading-relaxed max-w-md mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="space-y-6 mb-12">
           <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex gap-4 items-start">
             <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
               <ShieldCheck className="w-5 h-5 text-zinc-600" />
             </div>
             <div>
               <h3 className="font-semibold text-zinc-900 mb-1">{t('f1Title')}</h3>
               <p className="text-sm text-zinc-500 leading-relaxed">{t('f1Desc')}</p>
             </div>
           </motion.div>

           <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex gap-4 items-start">
             <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
               <Heart className="w-5 h-5 text-zinc-600" />
             </div>
             <div>
               <h3 className="font-semibold text-zinc-900 mb-1">{t('f2Title')}</h3>
               <p className="text-sm text-zinc-500 leading-relaxed">{t('f2Desc')}</p>
             </div>
           </motion.div>
        </div>

        <div className="flex flex-col gap-4">
           <button
             onClick={() => router.push(`/${locale}/auth/signup`)}
             className="w-full py-4 px-6 bg-zinc-900 text-white rounded-xl font-medium text-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
           >
             {t('cta')} <ArrowRight className="w-5 h-5" />
           </button>
           <p className="text-center text-xs text-zinc-400 font-medium mt-2">
             {t('disclaimer')}
           </p>
        </div>

      </div>
    </div>
  );
}
