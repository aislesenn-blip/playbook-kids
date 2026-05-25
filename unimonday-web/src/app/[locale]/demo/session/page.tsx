"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Mic, MicOff, PhoneOff, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MondayAvatar } from '@/components/ui/MondayAvatar';
import { useTranslations } from 'next-intl';

type Phase = 'CONNECTION' | 'PATTERN_DROP' | 'REAL_CONVERSATION' | 'COMPLETE';

export default function DemoSessionPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string || 'en';
  const t = useTranslations('DemoSession');

  const [isConnecting, setIsConnecting] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>('CONNECTION');
  const [subtitle, setSubtitle] = useState<string>(t('connecting'));
  const [emotion, setEmotion] = useState<'neutral' | 'happy' | 'thinking' | 'success'>('neutral');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false);
      setEmotion('happy');
      setSubtitle(t('welcome'));
    }, 3000);
    return () => clearTimeout(timer);
  }, [t]);

  const handleUserResponse = () => {
    setIsVoiceActive(false);
    setIsProcessing(true);
    setEmotion('thinking');
    setSubtitle(t('listening'));

    setTimeout(() => {
        setIsProcessing(false);

        if (currentPhase === 'CONNECTION') {
          setCurrentPhase('PATTERN_DROP');
          setEmotion('neutral');
          setSubtitle(t('patternDrop'));
        }
        else if (currentPhase === 'PATTERN_DROP') {
           setCurrentPhase('REAL_CONVERSATION');
           setEmotion('happy');
           setSubtitle(t('successResponse'));
        }
        else if (currentPhase === 'REAL_CONVERSATION') {
           setCurrentPhase('COMPLETE');
           setEmotion('success');
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

          <h1 className="text-[26px] font-medium text-[#FDFBF7] mb-2 tracking-tight">{t('completeTitle')}</h1>
          <p className="text-[#A8A39D] font-normal mb-10 text-[15px]">{t('completeDesc')}</p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.push(`/${locale}/onboarding`)}
            className="w-full py-4 bg-[#DDA359] text-[#1A1817] rounded-[20px] font-medium text-[17px] flex items-center justify-center gap-2 hover:bg-[#c99047] transition-colors shadow-sm"
          >
            {t('continueSetup')} <ArrowRight className="w-5 h-5 opacity-80" />
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
            {t('interactiveDemo')}
          </motion.div>
        </div>
        <div className="w-16" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-6 relative shrink-0 z-10">
         <div className="relative w-64 h-80 sm:w-80 sm:h-[400px] flex items-center justify-center shrink-0">
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
                 outfit="default"
                 emotion={emotion}
              />

              <AnimatePresence>
                {isConnecting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-40 bg-[#1A1817]/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-[40px]"
                  >
                    <Loader2 className="w-8 h-8 text-[#DDA359] animate-spin" />
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
          onClick={() => router.push(`/${locale}/onboarding`)}
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
