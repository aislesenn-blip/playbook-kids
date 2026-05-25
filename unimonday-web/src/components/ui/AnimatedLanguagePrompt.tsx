"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { Globe, X } from 'lucide-react';
import clsx from 'clsx';

const PROMPT_PHRASES = [
  "Switch Language",
  "Badili Lugha",
  "Changer de langue",
  "Cambiar idioma",
  "Sprache wechseln",
  "言語を変更"
];

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'sw', label: 'Kiswahili', flag: '🇹🇿' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ar', label: 'العربية', flag: '🇦🇪' },
];

export function AnimatedLanguagePrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string || 'en';

  useEffect(() => {
    // Only show if user hasn't made a choice or dismissed it
    const hasInteracted = localStorage.getItem('unimonday-lang-prompt-dismissed');
    if (!hasInteracted && currentLocale === 'en') {
      // Delay showing it slightly to not clash with initial render
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentLocale]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % PROMPT_PHRASES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsVisible(false);
    localStorage.setItem('unimonday-lang-prompt-dismissed', 'true');
  };

  const handleOpenModal = () => {
    setIsVisible(false); // Hide the pill
    setShowModal(true);
  };

  const switchLanguage = (newLocale: string) => {
    localStorage.setItem('unimonday-lang-prompt-dismissed', 'true');
    setShowModal(false);

    if (newLocale === currentLocale) return;

    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    const finalPath = newPath.startsWith(`/${newLocale}`) ? newPath : `/${newLocale}${pathname}`;

    router.push(finalPath);
  };

  return (
    <>
      {/* The iOS-style Floating Pill */}
      <AnimatePresence>
        {isVisible && !showModal && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] cursor-pointer"
            onClick={handleOpenModal}
          >
            <div className="bg-white/90 backdrop-blur-xl border border-zinc-200/50 shadow-[0_20px_40px_rgba(0,0,0,0.12)] rounded-full pl-5 pr-3 py-3 flex items-center gap-4">
              <Globe className="w-5 h-5 text-blue-500 animate-pulse" />

              <div className="relative h-6 w-36 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={phraseIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 font-medium text-zinc-900 flex items-center whitespace-nowrap"
                  >
                    {PROMPT_PHRASES[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="w-px h-5 bg-zinc-200 mx-1" />

              <button
                onClick={handleDismiss}
                className="p-1.5 hover:bg-zinc-100 rounded-full text-zinc-400 hover:text-zinc-600 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Full Language Selection Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-zinc-100 flex flex-col max-h-[85vh]"
            >
              <div className="px-6 pt-6 pb-4 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-zinc-900">Select Language</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-2 overflow-y-auto">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={clsx(
                      "w-full text-left px-4 py-4 rounded-2xl flex items-center justify-between transition-all",
                      currentLocale === lang.code
                        ? "bg-zinc-900 text-white"
                        : "hover:bg-zinc-50 text-zinc-700"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-medium text-lg">{lang.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
