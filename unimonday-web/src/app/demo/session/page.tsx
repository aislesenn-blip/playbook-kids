"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Mic, MicOff, PhoneOff, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'CONNECTION' | 'PATTERN_DROP' | 'REAL_CONVERSATION' | 'COMPLETE';

export default function DemoSessionPage() {
  const router = useRouter();

  const [isConnecting, setIsConnecting] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>('CONNECTION');
  const [subtitle, setSubtitle] = useState<string>("Establishing secure connection...");

  useEffect(() => {
    setTimeout(() => {
      setIsConnecting(false);
      setSubtitle("Welcome! I see you want to learn. That's amazing. Let's begin our first lesson.");
    }, 3000);
  }, []);

  const handleUserResponse = () => {
    setIsVoiceActive(false);
    setIsProcessing(true);
    setSubtitle("Listening to your response...");

    setTimeout(() => {
        setIsProcessing(false);

        if (currentPhase === 'CONNECTION') {
          setCurrentPhase('PATTERN_DROP');
          setSubtitle("Here at uNiMONDAY, my friends and I say 'Good morning' to each other in the morning. Let's try together. When I say 'Good morning', you answer 'Good morning to you too.' Ready? Good morning!");
        }
        else if (currentPhase === 'PATTERN_DROP') {
           setCurrentPhase('REAL_CONVERSATION');
           setSubtitle("Excellent job! You sounded very natural. Now, what is your favorite color?");
        }
        else if (currentPhase === 'REAL_CONVERSATION') {
           setCurrentPhase('COMPLETE');
        }
    }, 2500);
  };

  const toggleVoice = () => {
    if (isVoiceActive) {
      handleUserResponse();
    } else {
      setIsVoiceActive(true);
      setSubtitle("");
    }
  };

  // SUCCESS SCREEN
  if (currentPhase === 'COMPLETE') {
    return (
      <div className="fixed inset-0 z-[100] bg-[#1A1817] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#24211E] border border-[#3A3530] rounded-[32px] p-12 max-w-sm w-full flex flex-col items-center shadow-[0_8px_40px_rgba(0,0,0,0.2)]"
        >
          <div className="w-20 h-20 bg-[#DDA359]/10 rounded-full flex items-center justify-center mb-6 border border-[#DDA359]/20">
            <CheckCircle2 className="w-10 h-10 text-[#DDA359]" />
          </div>

          <h1 className="text-[26px] font-medium text-[#FDFBF7] mb-2 tracking-tight">Demo Complete</h1>
          <p className="text-[#A8A39D] font-normal mb-10 text-[15px]">They did a fantastic job communicating.</p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.push('/auth/signup')}
            className="w-full py-4 bg-[#DDA359] text-[#1A1817] rounded-[20px] font-medium text-[17px] flex items-center justify-center gap-2 hover:bg-[#c99047] transition-colors shadow-sm"
          >
            Create Account <ArrowRight className="w-5 h-5 opacity-80" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#1A1817] flex flex-col items-center justify-between overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#DDA359] rounded-full blur-[200px] mix-blend-screen" />
      </div>

      <div className="w-full h-24 flex items-center justify-between p-6 z-10 shrink-0">
        <div className="w-16" />
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[#A8A39D] font-medium text-[11px] tracking-widest uppercase mb-1.5"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isVoiceActive ? 'bg-[#FF6B6B] animate-pulse' : 'bg-[#DDA359]'}`} />
            Interactive Demo
          </motion.div>
        </div>
        <div className="w-16" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-6 relative shrink-0 z-10">
         <div className="relative w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center shrink-0">
           <AnimatePresence>
             {(!isVoiceActive && !isProcessing) && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 0.15, scale: [1, 1.1, 1] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 rounded-full bg-[#DDA359] blur-[40px]"
               />
             )}
             {isProcessing && (
                <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="absolute inset-0 rounded-full border border-[#DDA359]/30 border-dashed animate-[spin_4s_linear_infinite]"
               />
             )}
           </AnimatePresence>

           <motion.div
              animate={isVoiceActive ? { scale: 0.96 } : isProcessing ? { scale: [1, 1.02, 1] } : { scale: 1 }}
              transition={isProcessing ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : { duration: 0.3 }}
              className="w-full h-full rounded-full overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.2)] z-10 bg-[#24211E] border border-[#3A3530] relative flex items-center justify-center shrink-0"
           >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2A2724] to-[#1C1A17] flex items-center justify-center">
                <div className={`w-1/2 h-1/2 rounded-full blur-[20px] transition-all duration-700 ${isVoiceActive ? 'bg-[#DDA359] opacity-40 scale-110' : 'bg-[#DDA359] opacity-20'}`} />
              </div>

              <AnimatePresence>
                {(isConnecting || isProcessing) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-[#1C1A17]/60 backdrop-blur-md flex flex-col items-center justify-center rounded-full"
                  >
                    <Loader2 className="w-8 h-8 text-[#DDA359]/60 animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>
           </motion.div>
         </div>

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
                <p className={`text-[22px] font-medium max-w-sm leading-relaxed tracking-tight ${isConnecting || isProcessing ? 'text-[#8C8681]' : 'text-[#FDFBF7]'}`}>
                  {subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
         </div>
      </div>

      <div className="w-full h-40 p-8 pb-16 flex items-center justify-center gap-6 z-10 shrink-0">
        <button
          onClick={() => router.push('/auth/signup')}
          className="w-14 h-14 shrink-0 rounded-full bg-[#3A3530]/50 hover:bg-[#FF6B6B]/20 flex items-center justify-center transition-colors border border-[#4A443E]/50 group"
        >
          <PhoneOff className="w-5 h-5 text-[#A8A39D] group-hover:text-[#FF6B6B] transition-colors" />
        </button>

        <button
          onClick={toggleVoice}
          disabled={isProcessing}
          className={`w-20 h-20 shrink-0 rounded-full flex items-center justify-center shadow-lg transition-all disabled:opacity-50 border ${
            isVoiceActive
              ? 'bg-[#FDFBF7] border-[#FDFBF7] text-[#1A1817] scale-105'
              : 'bg-[#2A2624] border-[#3A3530] text-[#FDFBF7] hover:bg-[#322E2B]'
          }`}
        >
          {isVoiceActive ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
