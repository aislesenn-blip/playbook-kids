"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('Auth');
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string || 'en';

  return (
    <div className="min-h-screen w-full bg-[#F8F6F3] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm bg-white p-8 rounded-3xl border border-zinc-100 shadow-[0_4px_40px_rgba(0,0,0,0.02)]"
      >
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-2">{t('signupTitle')}</h1>
        <p className="text-zinc-500 mb-8 text-sm">{t('signupSubtitle')}</p>

        <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setTimeout(() => router.push(`/${locale}/demo/session`), 400);
          }}>
          <div>
            <input
              type="text"
              placeholder={t('parentName')}
              className="w-full px-5 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all placeholder:text-zinc-400 text-zinc-900"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder={t('emailLabel')}
              className="w-full px-5 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all placeholder:text-zinc-400 text-zinc-900"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder={t('createPassword')}
              className="w-full px-5 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all placeholder:text-zinc-400 text-zinc-900"
            />
          </div>

          <motion.button whileTap={{ scale: 0.98 }} disabled={isSubmitting} className="w-full py-3 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors mt-6 flex justify-center items-center h-[52px]">
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t('continueDemo')}
          </motion.button>
        </form>

        <p className="text-center text-zinc-500 mt-6 text-sm">
          {t('alreadyHaveAccount')} <Link href={`/${locale}/auth/login`} className="text-zinc-900 font-medium hover:underline">{t('loginButton')}</Link>
        </p>
      </motion.div>
    </div>
  );
}
