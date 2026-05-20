
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store/app-store';
import { UserRole, Language, Level, UserProfile } from '@/types';
import { Baby, User, GraduationCap, ArrowRight, ChevronLeft } from 'lucide-react';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const setProfile = useAppStore(state => state.setProfile);

  const [form, setForm] = useState<{
    name: string;
    role: UserRole;
    nativeLanguage: Language | '';
    targetLanguage: Language | '';
    level: Level | '';
    parentEmail: string;
  }>({
    name: '',
    role: 'child',
    nativeLanguage: '',
    targetLanguage: '',
    level: '',
    parentEmail: ''
  });

  const isChild = form.role === 'child';
  const TOTAL_STEPS = isChild ? 6 : 5;

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
    else {
      const newProfile: UserProfile = {
        id: crypto.randomUUID(),
        name: form.name,
        role: form.role,
        nativeLanguage: form.nativeLanguage as Language,
        targetLanguage: form.targetLanguage as Language,
        level: form.level as Level,
        subscriptionTier: 'Lite',
        parentEmail: isChild ? form.parentEmail : undefined,
        streak: 0,
        points: 0
      };
      setProfile(newProfile);
      router.push('/dashboard');
    }
  };

  const getStepIndicator = () => (step / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col justify-center relative">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="absolute top-8 left-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="w-full h-2 bg-gray-100 rounded-full mb-12 overflow-hidden">
          <div className="h-full bg-[#DDA359] transition-all duration-500" style={{ width: `${getStepIndicator()}%` }} />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
              <div className="text-center">
                <h2 className="text-3xl font-black mb-4">Who is learning today?</h2>
                <p className="text-gray-500 text-lg">We adapt the experience based on age.</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'child', label: 'Child (4-12)', icon: <Baby className="w-8 h-8" />, desc: 'Playful, safe, story-driven.' },
                  { id: 'teen', label: 'Teenager (13-17)', icon: <GraduationCap className="w-8 h-8" />, desc: 'Engaging, challenging, fun.' },
                  { id: 'adult', label: 'Adult (18+)', icon: <User className="w-8 h-8" />, desc: 'Practical, sophisticated, fast.' },
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setForm({...form, role: r.id as UserRole})}
                    className={`p-6 rounded-2xl border-2 text-left flex items-center gap-6 transition-all ${form.role === r.id ? 'border-[#DDA359] bg-[#DDA359]/5' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className={`p-4 rounded-xl ${form.role === r.id ? 'bg-[#DDA359] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {r.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{r.label}</h3>
                      <p className="text-gray-500 font-medium">{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
               <div className="text-center">
                <h2 className="text-3xl font-black mb-4">What is your Native Language?</h2>
                <p className="text-gray-500 text-lg">We use this to build connection and explain concepts clearly.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {['English', 'Spanish', 'French', 'Chinese', 'German', 'Swahili'].map(lang => (
                   <button
                    key={lang}
                    onClick={() => setForm({...form, nativeLanguage: lang as Language})}
                    className={`p-6 rounded-2xl border-2 text-center transition-all ${form.nativeLanguage === lang ? 'border-[#DDA359] bg-[#DDA359]/5 scale-105' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <span className="text-xl font-bold">{lang}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
               <div className="text-center">
                <h2 className="text-3xl font-black mb-4">What language do you want to learn?</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {['English', 'Spanish', 'French', 'Chinese', 'German', 'Swahili'].map(lang => (
                   <button
                    key={lang}
                    onClick={() => setForm({...form, targetLanguage: lang as Language})}
                    disabled={lang === form.nativeLanguage}
                    className={`p-6 rounded-2xl border-2 text-center transition-all ${
                      lang === form.nativeLanguage ? 'opacity-30 cursor-not-allowed bg-gray-50 border-gray-100' :
                      form.targetLanguage === lang ? 'border-[#DDA359] bg-[#DDA359]/5 scale-105' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <span className="text-xl font-bold">{lang}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
               <div className="text-center">
                <h2 className="text-3xl font-black mb-4">What&apos;s your current level?</h2>
              </div>
              <div className="flex flex-col gap-4">
                {['Starter', 'Beginner', 'Elementary', 'Intermediate', 'Advanced'].map(lvl => (
                   <button
                    key={lvl}
                    onClick={() => setForm({...form, level: lvl as Level})}
                    className={`p-5 rounded-2xl border-2 text-center transition-all ${form.level === lvl ? 'border-[#DDA359] bg-[#DDA359]/5' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <span className="text-lg font-bold">{lvl}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

           {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
               <div className="text-center">
                <h2 className="text-3xl font-black mb-4">What is {isChild ? 'the child\'s name?' : 'your name?'}</h2>
                <p className="text-gray-500 text-lg">So we know what to call you!</p>
              </div>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                placeholder="Enter name..."
                className="w-full text-center text-4xl font-bold py-6 outline-none border-b-4 focus:border-[#DDA359] border-gray-200 transition-colors bg-transparent"
                autoFocus
              />
            </motion.div>
          )}

          {step === 6 && isChild && (
            <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
               <div className="text-center">
                <h2 className="text-3xl font-black mb-4">Parent&apos;s Email</h2>
                <p className="text-gray-500 text-lg">To receive Detailed Reports and monitor progress.</p>
              </div>
              <input
                type="email"
                value={form.parentEmail}
                onChange={(e) => setForm({...form, parentEmail: e.target.value})}
                placeholder="parent@example.com"
                className="w-full text-center text-3xl font-bold py-6 outline-none border-b-4 focus:border-[#DDA359] border-gray-200 transition-colors bg-transparent"
                autoFocus
              />
            </motion.div>
          )}

        </AnimatePresence>

        <div className="mt-12 flex justify-end">
          <button
            onClick={handleNext}
            disabled={
              (step === 2 && !form.nativeLanguage) ||
              (step === 3 && !form.targetLanguage) ||
              (step === 4 && !form.level) ||
              (step === 5 && !form.name.trim()) ||
              (step === 6 && !form.parentEmail.trim())
            }
            className="px-8 py-4 bg-[#DDA359] text-white rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-[#DDA359]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[#DDA359]/20"
          >
            {step === TOTAL_STEPS ? 'Enter Universe' : 'Continue'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
