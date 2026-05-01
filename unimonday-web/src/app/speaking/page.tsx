"use client";

import React, { useState, useEffect } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useStudentStore } from '@/lib/store/student-store';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';
import { Mic, Volume2, CheckCircle2, XCircle, ChevronRight, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export interface Vocabulary {
  id: string;
  lessonId: string;
  word: string;
  imageUrl: string;
  pronunciationTarget: string;
  spellingTarget: string;
}

export default function SpeakingLabPage() {
  const { currentStudent, recordLessonCompletion } = useStudentStore();
  const router = useRouter();

  const [vocabulary, setVocabulary] = useState<Vocabulary[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'listening' | 'success' | 'retry'>('idle');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const currentWord = vocabulary[currentIndex];

  const loadVocabulary = async () => {
    setLoading(true);
    setErrorState(false);
    try {
      const { data, error } = await supabase
        .from('vocabulary')
        .select('*, lessons!inner(type)')
        .eq('lessons.type', 'Speaking');

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

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00E676', '#ffffff', '#00C853']
    });
  };

  const nextWord = React.useCallback(() => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(curr => curr + 1);
      setFeedback('idle');
      resetTranscript();
    } else {
      setIsFinished(true);
      if (vocabulary.length > 0) {
        recordLessonCompletion(vocabulary[0].lessonId, 100);
      }
      triggerConfetti(); // Big finish
    }
  }, [currentIndex, vocabulary, resetTranscript, recordLessonCompletion]);

  const checkPronunciation = React.useCallback((spokenText: string) => {
    if (!spokenText) {
      setFeedback('idle');
      return;
    }

    const spokenClean = spokenText.toLowerCase().replace(/[^a-z]/g, '');
    const targetClean = currentWord.pronunciationTarget.toLowerCase().replace(/[^a-z]/g, '');

    if (spokenClean.includes(targetClean) || targetClean.includes(spokenClean)) {
      setFeedback('success');
      setScore(s => s + 100);
      triggerConfetti();
      setTimeout(nextWord, 2500);
    } else {
      setFeedback('retry');
      setTimeout(() => setFeedback('idle'), 2000);
    }
  }, [currentWord, nextWord]);

  useEffect(() => {
    if (!listening && feedback === 'listening') {
      const timeoutId = setTimeout(() => {
        checkPronunciation(transcript);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening, transcript, checkPronunciation]);

  const speakTarget = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.pronunciationTarget);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    resetTranscript();
    setFeedback('listening');
    SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <Mic className="w-20 h-20 text-destructive mb-6" />
        <h2 className="text-3xl font-black mb-2">Browser not supported</h2>
        <p className="text-muted-foreground text-lg max-w-md">Your browser doesn&apos;t support the Speech Recognition API. Please use Google Chrome.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground font-bold text-xl tracking-tight">Loading intelligent lab...</p>
      </div>
    );
  }

  if (errorState || vocabulary.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <div className="bg-destructive/5 text-destructive p-10 rounded-[3rem] max-w-md border border-destructive/20 shadow-lg">
          <XCircle className="w-20 h-20 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-black mb-3">Setup Required</h2>
          <p className="font-medium text-lg text-destructive/80">The curriculum has not been loaded. Please ensure the database is seeded.</p>
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
          className="w-40 h-40 bg-primary/10 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-primary/20"
        >
          <CheckCircle2 className="w-20 h-20 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-black mb-4 tracking-tight"
        >
          Lesson Mastered!
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-medium text-muted-foreground mb-12"
        >
          Exceptional work. You earned <span className="text-primary font-bold">{score}</span> points.
        </motion.p>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => router.push('/writing')}
          className="bg-primary text-primary-foreground px-12 py-6 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30 flex items-center gap-3"
        >
          Proceed to Writing Studio <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    );
  }

  return (
    <div className="pb-24 max-w-2xl mx-auto pt-8 px-4 min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black tracking-tight">Speaking Lab</h1>
        <div className="bg-white border border-border/50 shadow-sm text-foreground px-5 py-2.5 rounded-full font-bold text-lg flex items-center gap-2">
          <span className="text-primary">{currentIndex + 1}</span>
          <span className="text-muted-foreground/50">/</span>
          <span>{vocabulary.length}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full flex flex-col items-center"
          >
            {/* Flashcard */}
            <div className="w-full max-w-md aspect-square relative rounded-[3.5rem] overflow-hidden shadow-2xl mb-12 border-8 border-white bg-white group">
              <Image
                src={currentWord.imageUrl}
                alt={currentWord.word}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              <button
                onClick={speakTarget}
                className="absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
              >
                <Volume2 className="w-7 h-7 text-foreground" />
              </button>

              {/* Feedback Overlay */}
              <AnimatePresence>
                {feedback === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center z-20"
                  >
                    <motion.div
                      initial={{ scale: 0.5, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="bg-white p-8 rounded-full shadow-2xl"
                    >
                      <CheckCircle2 className="w-20 h-20 text-primary" />
                    </motion.div>
                  </motion.div>
                )}
                {feedback === 'retry' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-destructive/10 backdrop-blur-sm flex items-center justify-center z-20"
                  >
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="bg-white p-8 rounded-full shadow-2xl"
                    >
                      <RefreshCw className="w-20 h-20 text-destructive" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <h2 className="text-6xl sm:text-7xl font-black text-center mb-12 capitalize tracking-tighter">
              {currentWord.word}
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* Action Button */}
        <div className="relative mt-auto mb-8 w-full flex flex-col items-center justify-center">
          <button
            onClick={listening ? SpeechRecognition.stopListening : startListening}
            className={cn(
              "w-28 h-28 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-10",
              listening
                ? "bg-destructive text-white scale-110 shadow-destructive/40"
                : "bg-primary text-white hover:scale-105 active:scale-95 shadow-primary/40"
            )}
          >
            <Mic className={cn("w-12 h-12", listening && "animate-pulse")} />
          </button>

          {listening && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-destructive rounded-full animate-ping opacity-20" />
          )}

          <p className="text-center font-bold mt-8 h-8 text-xl text-muted-foreground tracking-tight">
            {listening ? "Listening closely..." : transcript || "Tap the microphone and speak"}
          </p>
        </div>
      </div>
    </div>
  );
}
