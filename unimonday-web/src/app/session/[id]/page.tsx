"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { Mic, MicOff, PhoneOff, Star, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

type Phase = 'CONNECTION' | 'PATTERN_DROP' | 'REAL_CONVERSATION' | 'COMPLETE';

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { episodes, completeEpisode, profile } = useAppStore();
  const router = useRouter();

  const [isConnecting, setIsConnecting] = useState(true);
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

    setTimeout(() => {
      setIsConnecting(false);
      let greeting = `Hello ${profile.name}! I am so happy to see you. Are you ready to practice your ${profile.targetLanguage}?`;
      if (profile.nativeLanguage === 'Swahili') greeting = `Karibu sana uNiMONDAY ${profile.name}! Nafurahi kukuona. Uko tayari kujifunza ${profile.targetLanguage}?`;
      if (profile.nativeLanguage === 'Spanish') greeting = `¡Hola ${profile.name}! Estoy muy feliz de verte. ¿Estás listo para practicar tu ${profile.targetLanguage}?`;

      setSubtitle(greeting);
    }, 2000);
  }, [episode, profile, router]);

  const triggerConfetti = () => {
    const end = Date.now() + 2 * 1000;
    const colors = ['#DDA359', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

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
           triggerConfetti();
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

  if (!episode || !profile) return null;

  // DOPAMINE HIT / SUCCESS SCREEN
  if (currentPhase === 'COMPLETE') {
    return (
      <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-zinc-900 border-2 border-[#DDA359] rounded-3xl p-12 max-w-sm w-full flex flex-col items-center shadow-2xl shadow-[#DDA359]/20"
        >
          <div className="w-24 h-24 bg-[#DDA359]/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-5xl">🔥</span>
          </div>

          <h1 className="text-4xl font-black text-white mb-2">Episode Cleared!</h1>
          <p className="text-zinc-400 font-medium mb-8">You spoke beautifully.</p>

          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((star, i) => (
              <motion.div
                key={star}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.2 + 0.5, type: "spring" }}
              >
                <Star className="w-12 h-12 text-[#DDA359] fill-current" />
              </motion.div>
            ))}
          </div>

          <div className="w-full bg-zinc-800 rounded-full h-3 mb-4 overflow-hidden">
             <motion.div
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ delay: 1.5, duration: 1 }}
               className="h-full bg-[#DDA359]"
             />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-[#DDA359] font-bold text-lg mb-8"
          >
            +30 XP Earned
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            onClick={() => {
              completeEpisode(episode.id, 3);
              router.push('/dashboard');
            }}
            className="w-full py-4 bg-white text-zinc-900 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
          >
            Continue Journey <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

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
             {(!isVoiceActive && !isProcessing) && (
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
              className="w-full h-full rounded-full overflow-hidden shadow-2xl z-10 bg-zinc-900 border-4 border-zinc-800 relative flex items-center justify-center"
           >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-[#DDA359] to-transparent animate-pulse" />
              </div>

              {/* Spinner Overlay during connection or processing */}
              <AnimatePresence>
                {(isConnecting || isProcessing) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-zinc-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-full"
                  >
                    <Loader2 className="w-12 h-12 text-[#DDA359] animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>
           </motion.div>
         </div>

         {/* Subtitle / Transcription Area */}
         <div className="h-32 w-full mt-12 flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={subtitle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-3"
              >
                {(isConnecting || isProcessing) && (
                   <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
                )}
                <p className={`text-2xl font-medium max-w-sm leading-snug ${isConnecting || isProcessing ? 'text-zinc-400' : 'text-white'}`}>
                  {subtitle}
                </p>
              </motion.div>
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
          disabled={isProcessing}
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