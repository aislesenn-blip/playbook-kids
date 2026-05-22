"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Map, Compass, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export function ParentTour() {
  const { profile, completeTour } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const tourSteps = [
    {
      icon: <Heart className="w-6 h-6 text-[#DDA359]" />,
      title: "Welcome to uNiMONDAY",
      description: "A calm, anxiety-free space where your child builds language confidence through natural conversation. Let's take a quick look around.",
    },
    {
      icon: <Compass className="w-6 h-6 text-[#DDA359]" />,
      title: "The Learning Journey",
      description: "Episodes are carefully structured. We focus on listening, speaking, and cognitive milestones rather than just memorizing vocabulary.",
    },
    {
      icon: <Map className="w-6 h-6 text-[#DDA359]" />,
      title: "Guided Progression",
      description: "As they complete an episode, the next one unlocks. This builds a consistent daily habit without overwhelming them.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#DDA359]" />,
      title: "The Parent Dashboard",
      description: "Located in your navigation menu, this is where you can monitor their speaking confidence, accuracy, and find offline challenges to support their growth.",
    }
  ];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTour();
    }
  };

  const step = tourSteps[currentStep];

  return (
    <AnimatePresence>
      {mounted && profile && !profile.hasCompletedTour && (
      <motion.div
        key="parent-tour"
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      >
      {/* Soft, dark backdrop to mute the main app but keep it visible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#1A1817]/40 backdrop-blur-[2px]"
      />

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/20 p-8 rounded-[32px] shadow-[0_24px_80px_rgba(0,0,0,0.12)] overflow-hidden"
      >
        {/* Soft background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#DDA359]/10 rounded-full blur-[40px] pointer-events-none" />

        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="w-14 h-14 bg-[#F8F6F3] rounded-2xl flex items-center justify-center border border-zinc-100 shadow-sm">
            {step.icon}
          </div>
          <button
            onClick={() => completeTour()}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-50 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative z-10 mb-10">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-3 tracking-tight">{step.title}</h2>
          <p className="text-zinc-500 font-medium leading-relaxed">
            {step.description}
          </p>
        </div>

        <div className="flex items-center justify-between relative z-10">
          {/* Step Indicators */}
          <div className="flex gap-2">
            {tourSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-6 bg-[#DDA359]' : 'w-1.5 bg-zinc-200'}`}
              />
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-medium text-sm hover:bg-zinc-800 transition-colors flex items-center gap-2 shadow-sm"
          >
            {currentStep === tourSteps.length - 1 ? 'Start Learning' : 'Continue'} <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}
