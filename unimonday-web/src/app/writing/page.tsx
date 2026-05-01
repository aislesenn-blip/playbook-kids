"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useStudentStore } from '@/lib/store/student-store';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';
import { CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';
import { Vocabulary } from '../speaking/page';
import { motion, AnimatePresence } from 'framer-motion';

export default function WritingStudioPage() {
  const { currentStudent, recordLessonCompletion } = useStudentStore();
  const router = useRouter();

  const [vocabulary, setVocabulary] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const currentWord = vocabulary[currentIndex];
  const targetWord = currentWord ? currentWord.spellingTarget : "";

  const [errorState, setErrorState] = useState(false);

  const loadVocabulary = async () => {
    setLoading(true);
    setErrorState(false);
    try {
      const { data, error } = await supabase
        .from('vocabulary')
        .select('*, lessons!inner(type)')
        .eq('lessons.type', 'Writing');

      if (error) throw error;

      if (data && data.length > 0) {
        setVocabulary(data.map(d => ({
          id: d.id,
          lessonId: d.lesson_id,
          word: d.word,
          imageUrl: d.image_url,
          pronunciationTarget: d.pronunciation_target,
          spellingTarget: d.spelling_target
        })));
      } else {
        setErrorState(true);
      }
    } catch (e) {
      console.error("Failed to fetch vocabulary", e);
      setErrorState(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentStudent) {
      router.push('/');
    } else {
      const timeoutId = setTimeout(() => {
        loadVocabulary();
      }, 0);
      return () => clearTimeout(timeoutId);
    }

  }, [currentStudent, router]);

  useEffect(() => {
    if (currentWord) {
      const timeoutId = setTimeout(() => {
        setInputValues(Array(targetWord.length).fill(''));
        setFeedback('idle');
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, currentWord, targetWord.length]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^[a-zA-Z]?$/.test(value)) return;

    const upperValue = value.toUpperCase();
    const newValues = [...inputValues];
    newValues[index] = upperValue;
    setInputValues(newValues);

    if (upperValue && index < targetWord.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newValues.every(val => val !== '')) {
      checkSpelling(newValues.join(''));
    } else {
      setFeedback('idle');
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !inputValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const checkSpelling = (spelled: string) => {
    if (spelled.toLowerCase() === targetWord.toLowerCase()) {
      setFeedback('success');
      triggerConfetti();
      setTimeout(nextWord, 2000);
    } else {
      setFeedback('error');
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00E676', '#ffffff', '#00C853']
    });
  };

  const nextWord = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(curr => curr + 1);
    } else {
      setIsFinished(true);
      if (vocabulary.length > 0) {
        recordLessonCompletion(vocabulary[0].lessonId, 100);
      }
      triggerConfetti();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground font-bold text-xl tracking-tight">Loading writing lab...</p>
      </div>
    );
  }

  if (errorState || vocabulary.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <div className="bg-destructive/5 text-destructive p-10 rounded-[3rem] max-w-md border border-destructive/20 shadow-lg">
          <XCircle className="w-20 h-20 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-black mb-3">Setup Required</h2>
          <p className="font-medium text-lg text-destructive/80">The writing curriculum has not been loaded. Please ensure the database is seeded.</p>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 text-center pb-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-40 h-40 bg-amber-400/20 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-amber-400/20"
        >
          <Trophy className="w-20 h-20 text-amber-500" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-black mb-4 tracking-tight"
        >
          Masterful Spelling!
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-medium text-muted-foreground mb-12 max-w-md"
        >
          You&apos;ve completed the Writing Studio challenge with perfect accuracy.
        </motion.p>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => router.push('/home')}
          className="bg-primary text-primary-foreground px-12 py-6 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30"
        >
          Return to Dashboard
        </motion.button>
      </div>
    );
  }

  return (
    <div className="pb-24 max-w-4xl mx-auto pt-8 px-4 min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black tracking-tight">Writing Studio</h1>
        <div className="bg-white border border-border/50 shadow-sm text-foreground px-5 py-2.5 rounded-full font-bold text-lg flex items-center gap-2">
          <span className="text-primary">{currentIndex + 1}</span>
          <span className="text-muted-foreground/50">/</span>
          <span>{vocabulary.length}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center w-full"
          >
            {/* Visual Cue */}
            <div className="w-56 h-56 sm:w-72 sm:h-72 relative rounded-[3rem] overflow-hidden shadow-2xl mb-16 border-8 border-white bg-secondary/20">
              <Image
                src={currentWord.imageUrl}
                alt="Word hint"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Spelling Inputs */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-12 w-full px-2">
              {Array.from({ length: targetWord.length }).map((_, i) => (
                <input
                  key={`${currentIndex}-${i}`}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  maxLength={1}
                  value={inputValues[i] || ''}
                  onChange={(e) => handleInputChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={cn(
                    "w-16 h-20 sm:w-24 sm:h-32 text-5xl sm:text-6xl text-center font-black rounded-[2rem] border-b-8 outline-none transition-all",
                    feedback === 'success' ? "border-primary text-primary bg-primary/10 scale-110 shadow-lg shadow-primary/20" :
                    feedback === 'error' ? "border-destructive text-destructive bg-destructive/10 animate-shake" :
                    "border-border/80 bg-white focus:border-primary text-foreground focus:bg-white shadow-xl shadow-black/5 focus:scale-110 focus:-translate-y-2"
                  )}
                />
              ))}
            </div>

            {/* Feedback Message */}
            <div className="h-20 flex items-center justify-center w-full">
              <AnimatePresence>
                {feedback === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 text-primary bg-primary/10 px-8 py-4 rounded-full font-black text-2xl"
                  >
                    <CheckCircle2 className="w-8 h-8" /> Perfect!
                  </motion.div>
                )}
                {feedback === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 text-destructive bg-destructive/10 px-8 py-4 rounded-full font-black text-xl"
                  >
                    <RefreshCw className="w-6 h-6" /> Keep trying!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
