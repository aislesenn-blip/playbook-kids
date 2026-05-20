"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'CONNECTION' | 'PATTERN_DROP' | 'REAL_CONVERSATION' | 'COMPLETE';

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { episodes, completeEpisode, profile } = useAppStore();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>('CONNECTION');
  const [subtitle, setSubtitle] = useState<string>("Connecting to companion...");

  const episode = episodes.find(e => e.id === resolvedParams.id);

  useEffect(() => {
    if (!episode || !profile) {
      router.push('/dashboard');
      return;
    }

    // Phase 1: Connection (Native Language)
    setTimeout(() => {
      let greeting = `Hello ${profile.name}! I am so happy to see you. Are you ready to practice your ${profile.targetLanguage}?`;
      if (profile.nativeLanguage === 'Swahili') greeting = `Karibu sana uNiMONDAY ${profile.name}! Nafurahi kukuona. Uko tayari kujifunza ${profile.targetLanguage}?`;
      if (profile.nativeLanguage === 'Spanish') greeting = `¡Hola ${profile.name}! Estoy muy feliz de verte. ¿Estás listo para practicar tu ${profile.targetLanguage}?`;

      setSubtitle(greeting);
    }, 1500);
  }, [episode, profile, router]);

  if (!episode || !profile) return null;

  const handleUserResponse = () => {
    if (!profile) return;
    setIsVoiceActive(false);
    setIsProcessing(true);
    setSubtitle("Listening...");

    setTimeout(() => {
        setIsProcessing(false);

        if (currentPhase === 'CONNECTION') {
          setCurrentPhase('PATTERN_DROP');
          let patternText = `Great! To say 'I am from Tanzania' in ${profile.targetLanguage}, you say...`;
          if (profile.targetLanguage === 'German') patternText = `Great! To say 'I am from Tanzania' in German, you say 'Ich komme aus Tansania'. Your turn, say it.`;
          if (profile.targetLanguage === 'Spanish') patternText = `Great! To say 'I am from Tanzania' in Spanish, you say 'Soy de Tanzania'. Your turn, say it.`;
          setSubtitle(patternText);
        }
        else if (currentPhase === 'PATTERN_DROP') {
           setCurrentPhase('REAL_CONVERSATION');
           let roleplayText = `Excellent! Now let's roleplay. Hello! I am Thomas. Where are you from?`;
           if (profile.targetLanguage === 'German') roleplayText = `Perfect! Now let's talk. Hallo! Ich bin Thomas. Woher kommst du?`;
           if (profile.targetLanguage === 'Spanish') roleplayText = `Perfect! Now let's talk. ¡Hola! Soy Thomas. ¿De dónde eres?`;
           setSubtitle(roleplayText);
        }
        else if (currentPhase === 'REAL_CONVERSATION') {
           setCurrentPhase('COMPLETE');
           setSubtitle(`You did amazing today! You've completed the episode.`);

           setTimeout(() => {
              completeEpisode(episode.id, 3);
              router.push('/dashboard');
           }, 3000);
        }

    }, 2000);
  };

  const toggleVoice = () => {
    if (isVoiceActive) {
      handleUserResponse();
    } else {
      setIsVoiceActive(true);
      setSubtitle(""); // clear subtitle when user is talking
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-between overflow-hidden">

      {/* Top Header */}
      <div className="w-full flex items-center justify-between p-6 z-10">
        <div /> {/* Spacer */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-zinc-400 font-medium text-sm tracking-widest uppercase mb-1"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Call
          </motion.div>
          <h2 className="text-white font-bold text-lg">{episode.title}</h2>
        </div>
        <div /> {/* Spacer */}
      </div>

      {/* Center Avatar / Orb Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-6 relative">
         <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
           {/* Glow Effect when AI speaking or listening */}
           <AnimatePresence>
             {(!isVoiceActive && !isProcessing && currentPhase !== 'COMPLETE') && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: [1, 1.2, 1], rotate: 360 }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 rounded-full bg-[#DDA359] blur-3xl opacity-20"
               />
             )}
             {isProcessing && (
                <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="absolute inset-0 rounded-full border-2 border-[#DDA359] border-dashed animate-[spin_3s_linear_infinite]"
               />
             )}
           </AnimatePresence>

           {/* The Orb / Avatar */}
           <motion.div
              animate={isVoiceActive ? { scale: 0.95 } : isProcessing ? { scale: [1, 1.05, 1] } : { scale: [1, 1.02, 1] }}
              transition={isProcessing ? { repeat: Infinity, duration: 1 } : { repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-full h-full rounded-full overflow-hidden shadow-2xl z-10 bg-zinc-900 border-4 border-zinc-800"
           >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1596496350346-4e5a95610ec8?q=80&w=600&auto=format&fit=crop" alt="AI Companion" className="w-full h-full object-cover opacity-80" />
           </motion.div>
         </div>

         {/* Subtitle / Transcription Area */}
         <div className="h-32 w-full mt-12 flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={subtitle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl font-medium text-white max-w-sm leading-snug"
              >
                {subtitle}
              </motion.p>
            </AnimatePresence>
         </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full max-w-sm p-8 pb-16 flex items-center justify-center gap-8 z-10">

        {/* End Call Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg transition-all"
        >
          <PhoneOff className="w-7 h-7 text-white" />
        </button>

        {/* Mic Toggle Button */}
        <button
          onClick={toggleVoice}
          disabled={currentPhase === 'COMPLETE' || isProcessing}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all disabled:opacity-50 ${
            isVoiceActive
              ? 'bg-white text-zinc-900 scale-110 shadow-white/20'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
        >
          {isVoiceActive ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </button>

      </div>
    </div>
  );
}