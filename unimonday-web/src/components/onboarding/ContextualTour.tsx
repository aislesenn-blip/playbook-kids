"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MousePointer2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface TourStepDef {
  targetSelector: string;
  expectedRoute: string;
  title: string;
  description: string;
  actionText?: string;
  autoAdvanceOnClick?: boolean;
}

const TOUR_STEPS: TourStepDef[] = [
  {
    targetSelector: '[data-tour="up-next"]',
    expectedRoute: '/dashboard',
    title: "Start a Conversation",
    description: "This is your child's next active learning episode. It adapts to their level and builds genuine speaking confidence. Tap it to see how a session works.",
    actionText: "Tap the banner to continue",
    autoAdvanceOnClick: true,
  },
  {
    targetSelector: '[data-tour="end-call"]',
    expectedRoute: '/session/1', // Will match any session if we do startsWith logic, but let's assume it routes to /session/...
    title: "A Calm Voice Interface",
    description: "No screen-staring. Just a gentle voice conversation, just like calling a friend. Tap the red button to safely end the session and return.",
    actionText: "Tap to end session",
    autoAdvanceOnClick: true,
  },
  {
    targetSelector: '[data-tour="parent-nav"]',
    expectedRoute: '/dashboard',
    title: "The Parent's Eye",
    description: "You're back! To track how they're doing and find offline activities, this is your dedicated portal. Let's go there now.",
    actionText: "Tap to open Parents Dashboard",
    autoAdvanceOnClick: true,
  },
  {
    targetSelector: '[data-tour="activity-table"]',
    expectedRoute: '/parent-dashboard',
    title: "Track Genuine Growth",
    description: "Here you can monitor their speaking consistency, accuracy, and recent cognitive milestones.",
    actionText: "Finish Tour",
    autoAdvanceOnClick: false,
  }
];

export function ContextualTour() {
  const { profile, completeTour, tourStep, setTourStep } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // We need to measure the target element to draw the spotlight
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Effect to find the target element and measure it
  useEffect(() => {
    if (!mounted || !profile || profile.hasCompletedTour) return;

    const stepDef = TOUR_STEPS[tourStep];

    // Only try to find elements if we are on the expected route
    if (!pathname.startsWith(stepDef.expectedRoute)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTargetRect(null);
      return;
    }

    const checkElement = () => {
      const el = document.querySelector(stepDef.targetSelector);
      if (el) {
        const rect = el.getBoundingClientRect();
        // Only update if it actually changed to prevent infinite loops
        setTargetRect(prev => {
           if (!prev) return rect;
           if (Math.abs(prev.top - rect.top) > 5 || Math.abs(prev.height - rect.height) > 5) return rect;
           return prev;
        });
      } else {
        setTargetRect(null);
      }
    };

    // Initial check
    const timeout = setTimeout(checkElement, 500); // Wait for animations

    // Listen for resizes or scrolls
    window.addEventListener('resize', checkElement);
    window.addEventListener('scroll', checkElement, { passive: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', checkElement);
      window.removeEventListener('scroll', checkElement);
    };
  }, [tourStep, pathname, mounted, profile]);


  // Effect to auto-advance if the route changes as expected
  useEffect(() => {
     if (!mounted || !profile || profile.hasCompletedTour) return;

     const stepDef = TOUR_STEPS[tourStep];
     // If we are currently NOT on the expected route for this step, it means we navigated away.
     // Let's see if we landed on the NEXT step's route.
     if (!pathname.startsWith(stepDef.expectedRoute)) {
         const nextStepDef = TOUR_STEPS[tourStep + 1];
         if (nextStepDef && pathname.startsWith(nextStepDef.expectedRoute)) {
            setTourStep(tourStep + 1);
         }
     }
  }, [pathname, tourStep, mounted, profile, setTourStep]);


  if (!mounted || !profile || profile.hasCompletedTour) return null;

  const currentDef = TOUR_STEPS[tourStep];
  const isCorrectRoute = pathname.startsWith(currentDef.expectedRoute);

  const handleNext = () => {
    if (tourStep < TOUR_STEPS.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      completeTour();
    }
  };

  const handleSkip = () => {
    completeTour();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="contextual-tour"
        className="fixed inset-0 z-[200] pointer-events-none"
      >
        {/* Soft Background Blur - We use an SVG mask to cut out the spotlight area if we have a target */}
        <div className="absolute inset-0 bg-[#1A1817]/40 backdrop-blur-[3px] transition-all duration-700 pointer-events-none"
             style={targetRect && isCorrectRoute ? {
               maskImage: `radial-gradient(circle at ${targetRect.left + targetRect.width/2}px ${targetRect.top + targetRect.height/2}px, transparent ${Math.max(targetRect.width, targetRect.height)/2 + 20}px, black ${Math.max(targetRect.width, targetRect.height)/2 + 40}px)`,
               WebkitMaskImage: `radial-gradient(circle at ${targetRect.left + targetRect.width/2}px ${targetRect.top + targetRect.height/2}px, transparent ${Math.max(targetRect.width, targetRect.height)/2 + 20}px, black ${Math.max(targetRect.width, targetRect.height)/2 + 40}px)`,
             } : {}}
        />

        {/* Global Skip Button */}
        <div className="absolute top-6 right-6 pointer-events-auto">
          <button
            onClick={handleSkip}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium text-xs transition-colors backdrop-blur-md"
          >
             Skip Tour <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tooltip & Guidance */}
        {targetRect && isCorrectRoute && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute pointer-events-auto"
            style={{
               // Position tooltip below the target element by default
               top: targetRect.bottom + 30,
               left: Math.max(20, Math.min(window.innerWidth - 340, targetRect.left + (targetRect.width / 2) - 160)),
               width: '320px'
            }}
          >
             {/* Animated Pointer pointing UP to the element */}
             <motion.div
               animate={{ y: [0, -8, 0] }}
               transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
               className="absolute -top-12 left-1/2 -translate-x-1/2 flex justify-center text-white drop-shadow-xl"
             >
                <MousePointer2 className="w-8 h-8 fill-white/20" />
             </motion.div>

             <div className="bg-white/95 backdrop-blur-xl border border-white/20 p-6 rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.15)] relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#DDA359]/10 rounded-full blur-[30px] pointer-events-none" />

                <h3 className="text-xl font-semibold text-zinc-900 mb-2 tracking-tight">{currentDef.title}</h3>
                <p className="text-zinc-500 font-medium text-sm leading-relaxed mb-6">
                  {currentDef.description}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-1.5">
                    {TOUR_STEPS.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === tourStep ? 'w-5 bg-[#DDA359]' : 'w-1.5 bg-zinc-200'}`}
                      />
                    ))}
                  </div>

                  {!currentDef.autoAdvanceOnClick && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl font-medium text-sm hover:bg-zinc-800 transition-colors shadow-sm"
                    >
                      {currentDef.actionText}
                    </motion.button>
                  )}
                  {currentDef.autoAdvanceOnClick && currentDef.actionText && (
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#DDA359]">
                       {currentDef.actionText}
                    </span>
                  )}
                </div>
             </div>
          </motion.div>
        )}

      </motion.div>
    </AnimatePresence>
  );
}
