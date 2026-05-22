"use client";
import { useState } from 'react';
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Language, Level, UserProfile } from '@/types';

export default function OnboardingPage() {
  const router = useRouter();
  const setProfile = useAppStore(state => state.setProfile);
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingText, setLoadingText] = useState('Building their practice space...');

  const TOTAL_STEPS = 4;

  const getStepIndicator = () => {
    return ((step) / TOTAL_STEPS) * 100;
  };

  const [form, setForm] = useState({
    name: '',
    nativeLanguage: '',
    targetLanguage: '',
    level: '',
  });

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      setIsAnalyzing(true);

      setTimeout(() => setLoadingText('Analyzing proficiency level...'), 1500);
      setTimeout(() => setLoadingText('Structuring conversation paths...'), 3000);
      setTimeout(() => setLoadingText('Finalizing learning environment...'), 4500);

      setTimeout(() => {
        const newProfile: UserProfile = {
          id: crypto.randomUUID(),
          name: form.name,
          nativeLanguage: form.nativeLanguage as Language,
          targetLanguage: form.targetLanguage as Language,
          level: form.level as Level,
          subscriptionTier: 'X',
          parentEmail: 'parent@example.com', // Would normally come from signup
          streak: 0,
          points: 0,
          hasCompletedTour: false,
        };
        setProfile(newProfile);
        setIsAnalyzing(false);
        router.push('/upgrade');
      }, 6000);
    }
  };

    if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-[#F8F6F3] flex flex-col items-center justify-center p-6 text-center z-50 fixed inset-0">
         <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="relative flex items-center justify-center w-24 h-24 mb-8"
         >
           <div className="absolute inset-0 rounded-full border-2 border-zinc-200 border-t-zinc-900 animate-[spin_1.5s_linear_infinite]" />
           <Image src="/logo.png" alt="uNiMONDAY Logo" width={48} height={48} className="object-contain" />
         </motion.div>

         <h1 className="text-2xl font-semibold mb-3 tracking-tight text-zinc-900">
           Preparing their environment
         </h1>

         <AnimatePresence mode="wait">
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-zinc-500 font-medium text-sm h-6"
            >
              {loadingText}
            </motion.p>
         </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8F6F3] flex flex-col">
      <div className="flex-1 w-full mx-auto max-w-2xl px-4 py-8 flex flex-col justify-center relative">
        {step > 1 && (
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setStep(step - 1)} className="absolute top-8 left-4 w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-sm">
            <ChevronLeft className="w-5 h-5 text-zinc-600" />
          </motion.button>
        )}

        <div className="w-full h-1 bg-zinc-200 rounded-full mb-16 overflow-hidden">
          <div className="h-full bg-zinc-900 transition-all duration-500" style={{ width: `${getStepIndicator()}%` }} />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
               <div className="text-center">
                <h2 className="text-3xl font-semibold mb-3 text-zinc-900 tracking-tight">What is your child&#39;s name?</h2>
                <p className="text-zinc-500 font-medium">So our tutors know what to call them.</p>
              </div>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                placeholder="Enter their name"
                className="w-full text-center text-3xl font-semibold py-4 outline-none border-b-2 focus:border-zinc-900 border-zinc-200 transition-colors bg-transparent placeholder:text-zinc-300"
                autoFocus
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
               <div className="text-center">
                <h2 className="text-3xl font-semibold mb-3 text-zinc-900 tracking-tight">What is their native language?</h2>
                <p className="text-zinc-500 font-medium">Used to provide clearer translations and context.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['English', 'Spanish', 'French', 'Chinese', 'German', 'Swahili'].map(lang => (
                   <motion.button
                    key={lang}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setForm({...form, nativeLanguage: lang as Language})}
                    className={`p-5 rounded-2xl border transition-all ${form.nativeLanguage === lang ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'}`}
                  >
                    <span className="text-lg font-medium">{lang}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
               <div className="text-center">
                <h2 className="text-3xl font-semibold mb-3 text-zinc-900 tracking-tight">What language should they learn?</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['English', 'Spanish', 'French', 'Chinese', 'German', 'Swahili'].map(lang => (
                   <motion.button
                    key={lang}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setForm({...form, targetLanguage: lang as Language})}
                    disabled={lang === form.nativeLanguage}
                    className={`p-5 rounded-2xl border transition-all ${
                      lang === form.nativeLanguage ? 'opacity-40 cursor-not-allowed bg-zinc-50 border-zinc-100 text-zinc-400' :
                      form.targetLanguage === lang ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'}`}
                  >
                    <span className="text-lg font-medium">{lang}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
               <div className="text-center">
                <h2 className="text-3xl font-semibold mb-3 text-zinc-900 tracking-tight">What is their current level?</h2>
              </div>
              <div className="flex flex-col gap-3 max-w-md mx-auto w-full">
                {['Starter', 'Beginner', 'Elementary', 'Intermediate'].map(lvl => (
                   <motion.button
                    key={lvl}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setForm({...form, level: lvl as Level})}
                    className={`p-4 rounded-2xl border transition-all ${form.level === lvl ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'}`}
                  >
                    <span className="text-lg font-medium">{lvl}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        <div className="mt-16 flex justify-center">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={
              (step === 1 && !form.name.trim()) ||
              (step === 2 && !form.nativeLanguage) ||
              (step === 3 && !form.targetLanguage) ||
              (step === 4 && !form.level)
            }
            className="w-full max-w-sm py-4 bg-zinc-900 text-white rounded-xl font-medium text-lg flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
          >
            {step === TOTAL_STEPS ? 'Complete Setup' : 'Continue'} <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
