"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { Mic, MicOff, PhoneOff, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MondayAvatar } from '@/components/ui/MondayAvatar';

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
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [emotion, setEmotion] = useState<'neutral' | 'happy' | 'thinking' | 'success'>('neutral');

  const session = episodes.find(s => s.id === resolvedParams.id);

  // Timer Countdown Effect
  useEffect(() => {
    if (isConnecting || currentPhase === 'COMPLETE' || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const nextTime = Math.max(0, prev - 1);

        // Handle side-effects inside the interval tick, NOT inside the state updater.
        // We use setTimeout to push these state updates to the next tick of the event loop,
        // safely avoiding Next.js "cascading render" warnings during the current render phase.
        if (nextTime === 30) {
           setTimeout(() => {
             setIsVoiceActive(false);
             setSubtitle("We have 30 seconds left! Let's wrap up our amazing session today.");
           }, 0);
        } else if (nextTime === 0) {
           setTimeout(() => {
             setCurrentPhase('COMPLETE');
             confetti({
               particleCount: 100,
               spread: 70,
               origin: { y: 0.6 },
               colors: ['#DDA359', '#FFFFFF', '#FF6B6B']
             });
           }, 0);
        }

        return nextTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isConnecting, currentPhase, timeLeft]);

  useEffect(() => {
    if (!session || !profile) {
      router.push('/dashboard');
      return;
    }

    setTimeout(() => {
      setIsConnecting(false);
      setEmotion('happy');
      setSubtitle(`Welcome ${profile.name}. I'm Monday! I see you want to learn ${profile.targetLanguage}. That is wonderful, ${profile.name}.`);
    }, 3000);
  }, [session, profile, router]);

  const handleUserResponse = () => {
    if (!profile) return;
    setIsVoiceActive(false);
    setIsProcessing(true);
    setEmotion('thinking');
    setSubtitle("Listening carefully...");

    setTimeout(() => {
        setIsProcessing(false);

        if (currentPhase === 'CONNECTION') {
          setCurrentPhase('PATTERN_DROP');
          setEmotion('neutral');
          setSubtitle(`Let's practice for our topic: "${session?.title}". I will say the phrase, and then you try. Ready?`);
        }
        else if (currentPhase === 'PATTERN_DROP') {
           setCurrentPhase('REAL_CONVERSATION');
           setEmotion('happy');
           setSubtitle(`Beautifully done, ${profile?.name}. You sound very confident. Let's have a short conversation about it now.`);
        }
        else if (currentPhase === 'REAL_CONVERSATION') {
           setCurrentPhase('COMPLETE');
           setEmotion('success');
           // Trigger Dopamine Hit
           confetti({
             particleCount: 100,
             spread: 70,
             origin: { y: 0.6 },
             colors: ['#DDA359', '#FFFFFF', '#FF6B6B']
           });
        }
    }, 2500);
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
      <div className="fixed inset-0 z-[100] bg-[#151412] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="bg-[#1C1A18] border border-[#2C2926] rounded-[32px] p-12 max-w-sm w-full flex flex-col items-center shadow-[0_8px_40px_rgba(0,0,0,0.2)]"
        >
          <div className="w-20 h-20 bg-[#DDA359]/10 rounded-full flex items-center justify-center mb-6 border border-[#DDA359]/20">
            <CheckCircle2 className="w-10 h-10 text-[#DDA359]" />
          </div>

          <h1 className="text-[26px] font-medium text-[#F4F0EB] mb-2 tracking-tight">Session Complete</h1>
          <p className="text-[#A8A39D] font-normal mb-10 text-[15px]">You communicated clearly and effectively.</p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => {
              completeEpisode(session.id, 3);
              router.push('/dashboard');
            }}
            className="w-full py-4 bg-[#DDA359] text-[#1A1817] rounded-[20px] font-medium text-[17px] flex items-center justify-center gap-2 hover:bg-[#c99047] transition-colors shadow-sm"
          >
            Continue <ArrowRight className="w-5 h-5 opacity-80" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#151412] flex flex-col items-center justify-between overflow-hidden">

      {/* Background soft ambient glow to reduce harsh darkness */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#DDA359] rounded-full blur-[200px] mix-blend-screen" />
      </div>

      {/* Top Header */}
      <div className="w-full h-24 flex items-center justify-between p-6 z-10 shrink-0">
        <div className="w-20" /> {/* Spacer */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[#A8A39D] font-medium text-[11px] tracking-widest uppercase mb-1.5"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isVoiceActive ? 'bg-[#FF6B6B] animate-pulse' : 'bg-[#DDA359]'}`} />
            Live Practice
          </motion.div>
          <h2 className="text-[#F4F0EB] font-medium text-[17px]">{session.title}</h2>
        </div>

        {/* Timer UI */}
        <div className="w-20 flex justify-end">
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${timeLeft <= 30 ? 'bg-[#FF6B6B]/10 text-[#FF6B6B] border-[#FF6B6B]/20 animate-pulse' : 'bg-[#2A2724] text-[#A8A39D] border-[#3A3530]'}`}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Center Avatar / Orb Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-6 relative shrink-0 z-10">
         <div className="relative w-64 h-80 sm:w-80 sm:h-[400px] flex items-center justify-center shrink-0">
           {/* Soft Breathing Glow */}
           <AnimatePresence>
             {(!isVoiceActive && !isProcessing) && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 0.15, scale: [1, 1.1, 1] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#DDA359] blur-[50px]"
               />
             )}
           </AnimatePresence>

           {/* Monday Avatar */}
           <motion.div
              animate={isVoiceActive ? { scale: 0.96 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full z-10 relative flex items-end justify-center shrink-0"
           >
              {/* Optional pedestal/shadow */}
              <div className="absolute bottom-4 w-48 h-8 bg-black/40 rounded-[100%] blur-md" />

              <MondayAvatar
                 isListening={isVoiceActive}
                 isProcessing={isProcessing}
                 outfit={profile.currentOutfit || 'default'}
                 emotion={emotion}
              />

              <AnimatePresence>
                {isConnecting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-40 bg-[#151412]/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-[40px]"
                  >
                    <Loader2 className="w-8 h-8 text-[#DDA359] animate-spin" />
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
                   <Loader2 className="w-5 h-5 text-[#8C8681] animate-spin shrink-0" />
                )}
                <p className={`text-[22px] font-medium max-w-sm leading-relaxed tracking-tight ${isConnecting || isProcessing ? 'text-[#8C8681]' : 'text-[#F4F0EB]'}`}>
                  {subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
         </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full h-40 p-8 pb-16 flex items-center justify-center gap-6 z-10 shrink-0">

        {/* End Call Button */}
        <button
          data-tour="end-call"
          onClick={() => {
              router.push('/dashboard');
          }}
          className="w-14 h-14 shrink-0 rounded-full bg-[#3A3530]/50 hover:bg-[#FF6B6B]/20 flex items-center justify-center transition-colors border border-[#4A443E]/50 group"
        >
          <PhoneOff className="w-5 h-5 text-[#A8A39D] group-hover:text-[#FF6B6B] transition-colors" />
        </button>

        {/* Mic Toggle Button */}
        <button
          onClick={toggleVoice}
          disabled={isProcessing}
          className={`w-20 h-20 shrink-0 rounded-full flex items-center justify-center shadow-lg transition-all disabled:opacity-50 border ${
            isVoiceActive
              ? 'bg-[#FDFBF7] border-[#FDFBF7] text-[#1A1817] scale-105'
              : 'bg-[#211F1D] border-[#2C2926] text-[#F4F0EB] hover:bg-[#282624]'
          }`}
        >
          {isVoiceActive ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

      </div>
    </div>
  );
}
