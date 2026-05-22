"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { Mic, MicOff, PhoneOff, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'CONNECTION' | 'PATTERN_DROP' | 'REAL_CONVERSATION' | 'COMPLETE';

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { episodes, completeEpisode, profile } = useAppStore();
  const router = useRouter();

  const [isConnecting, setIsConnecting] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>('CONNECTION');
  const [subtitle, setSubtitle] = useState<string>("Establishing connection...");

  const session = episodes.find(s => s.id === resolvedParams.id);

  useEffect(() => {
    if (!session || !profile) {
      router.push('/dashboard');
      return;
    }

    setTimeout(() => {
      setIsConnecting(false);
      setSubtitle(`Hello ${profile.name}. Let's begin practicing ${profile.targetLanguage}.`);
    }, 3000);
  }, [session, profile, router]);

  const handleUserResponse = () => {
    if (!profile) return;
    setIsVoiceActive(false);
    setIsProcessing(true);
    setSubtitle("Processing response...");

    setTimeout(() => {
        setIsProcessing(false);

        if (currentPhase === 'CONNECTION') {
          setCurrentPhase('PATTERN_DROP');
          setSubtitle(`Good. Now, try asking a question related to this context.`);
        }
        else if (currentPhase === 'PATTERN_DROP') {
           setCurrentPhase('REAL_CONVERSATION');
           setSubtitle(`Excellent pronunciation. Let's continue the dialogue naturally.`);
        }
        else if (currentPhase === 'REAL_CONVERSATION') {
           setCurrentPhase('COMPLETE');
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

  if (!session || !profile) return null;

  // SUCCESS SCREEN (Calm, low noise)
  if (currentPhase === 'COMPLETE') {
    return (
      <div className="fixed inset-0 z-[100] bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white border border-zinc-100 rounded-3xl p-12 max-w-sm w-full flex flex-col items-center shadow-[0_4px_40px_rgba(0,0,0,0.04)]"
        >
          <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-zinc-900" />
          </div>

          <h1 className="text-2xl font-semibold text-zinc-900 mb-2">Session Complete</h1>
          <p className="text-zinc-500 font-medium mb-10 text-sm">You communicated clearly and effectively.</p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => {
              completeEpisode(session.id, 3);
              if (session.id === '1') router.push('/upgrade'); else router.push('/dashboard');
            }}
            className="w-full py-4 bg-zinc-900 text-white rounded-xl font-medium text-lg flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-sm"
          >
            Continue <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAFAFA] flex flex-col items-center justify-between overflow-hidden">

      {/* Top Header */}
      <div className="w-full h-24 flex items-center justify-between p-6 z-10 shrink-0 border-b border-zinc-100 bg-white/50 backdrop-blur-md">
        <div className="w-16" /> {/* Spacer */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-zinc-500 font-medium text-xs tracking-widest uppercase mb-1"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isVoiceActive ? 'bg-red-500 animate-pulse' : 'bg-[#DDA359]'}`} />
            Live Practice
          </motion.div>
          <h2 className="text-zinc-900 font-semibold text-base">{session.title}</h2>
        </div>
        <div className="w-16" /> {/* Spacer */}
      </div>

      {/* Center Avatar / Orb Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-6 relative shrink-0">
         <div className="relative w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center shrink-0">
           {/* Soft Breathing Glow */}
           <AnimatePresence>
             {(!isVoiceActive && !isProcessing) && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 0.5, scale: [1, 1.1, 1] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 rounded-full bg-zinc-200 blur-2xl"
               />
             )}
             {isProcessing && (
                <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="absolute inset-0 rounded-full border border-zinc-300 border-dashed animate-[spin_4s_linear_infinite]"
               />
             )}
           </AnimatePresence>

           {/* The Orb / Minimal Avatar */}
           <motion.div
              animate={isVoiceActive ? { scale: 0.98 } : isProcessing ? { scale: [1, 1.02, 1] } : { scale: 1 }}
              transition={isProcessing ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : { duration: 0.3 }}
              className="w-full h-full rounded-full overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.04)] z-10 bg-white border border-zinc-100 relative flex items-center justify-center shrink-0"
           >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-zinc-50 flex items-center justify-center">
                <div className="w-1/2 h-1/2 rounded-full bg-zinc-100 opacity-50" />
              </div>

              {/* Spinner Overlay during connection or processing */}
              <AnimatePresence>
                {(isConnecting || isProcessing) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center rounded-full"
                  >
                    <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>
           </motion.div>
         </div>

         {/* Subtitle / Transcription Area */}
         <div className="h-32 w-full mt-16 flex items-center justify-center text-center shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={subtitle}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col items-center justify-center gap-3 w-full h-full"
              >
                {(isConnecting || isProcessing) && (
                   <Loader2 className="w-5 h-5 text-zinc-300 animate-spin shrink-0" />
                )}
                <p className={`text-xl font-medium max-w-sm leading-relaxed ${isConnecting || isProcessing ? 'text-zinc-400' : 'text-zinc-900'}`}>
                  {subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
         </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full h-40 p-8 pb-16 flex items-center justify-center gap-6 z-10 shrink-0 bg-white/50 backdrop-blur-md border-t border-zinc-100">

        {/* End Call Button */}
        <button
          onClick={() => {
              if (session.id === '1') router.push('/upgrade'); else router.push('/dashboard');
          }}
          className="w-14 h-14 shrink-0 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors border border-zinc-200"
        >
          <PhoneOff className="w-5 h-5 text-zinc-600" />
        </button>

        {/* Mic Toggle Button */}
        <button
          onClick={toggleVoice}
          disabled={isProcessing}
          className={`w-20 h-20 shrink-0 rounded-full flex items-center justify-center shadow-sm transition-all disabled:opacity-50 border ${
            isVoiceActive
              ? 'bg-zinc-900 border-zinc-900 text-white scale-105'
              : 'bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50'
          }`}
        >
          {isVoiceActive ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

      </div>
    </div>
  );
}
