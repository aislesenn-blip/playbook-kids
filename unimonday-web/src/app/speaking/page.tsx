"use client";

import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useStudentStore } from '@/lib/store/student-store';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';
import { Mic, Volume2, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

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
      // Fetch speaking vocabulary (lesson 1 for now)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStudent, router]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00E676', '#ffffff'] // Unidays Green
    });
  };

  const nextWord = React.useCallback(() => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(curr => curr + 1);
      setFeedback('idle');
      resetTranscript();
    } else {
      // Finish lesson
      setIsFinished(true);
      if (vocabulary.length > 0) {
        // Record completion for this lesson ID dynamically based on the fetched words
        recordLessonCompletion(vocabulary[0].lessonId, 100);
      }
    }
  }, [currentIndex, vocabulary, resetTranscript, recordLessonCompletion]);

  const checkPronunciation = React.useCallback((spokenText: string) => {
    if (!spokenText) {
      setFeedback('idle');
      return;
    }

    const spokenClean = spokenText.toLowerCase().replace(/[^a-z]/g, '');
    const targetClean = currentWord.pronunciationTarget.toLowerCase().replace(/[^a-z]/g, '');

    // Basic fuzzy match or exact match
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
    if (listening) {
      // Avoid calling setFeedback in the render cycle directly like this
      // We'll manage it mostly through startListening
    } else if (feedback === 'listening' && !listening) {
      // Finished listening, check result
      // Let's defer checkPronunciation to avoid set-state-in-effect warning
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
      utterance.rate = 0.8; // Speak slightly slower for kids
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
        <Mic className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Browser not supported</h2>
        <p className="text-muted-foreground">Your browser doesn&apos;t support the Speech Recognition API. Please use Google Chrome.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <p className="text-muted-foreground font-medium text-lg">Loading vocabulary...</p>
      </div>
    );
  }

  if (errorState || vocabulary.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <div className="bg-destructive/10 text-destructive p-8 rounded-[2rem] max-w-md border border-destructive/20">
          <XCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Database Connection Required</h2>
          <p className="font-medium">We couldn&apos;t load the speaking exercises. Please ensure your Supabase database is connected and seeded.</p>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 text-center pb-24 animate-in fade-in zoom-in duration-500">
        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-5xl font-black mb-4">Lesson Complete!</h1>
        <p className="text-xl font-medium text-muted-foreground mb-12">You scored {score} points! Outstanding work.</p>
        <button
          onClick={() => router.push('/home')}
          className="bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
        >
          Return to Path
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 max-w-lg mx-auto pt-4 px-4 min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black">Speaking Lab</h1>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
          {currentIndex + 1} / {vocabulary.length}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Flashcard */}
        <div className="w-full max-w-sm aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl mb-10 border-4 border-white bg-white">
          <Image
            src={currentWord.imageUrl}
            alt={currentWord.word}
            fill
            className="object-cover"
            priority
          />
          <button
            onClick={speakTarget}
            className="absolute top-4 right-4 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
          >
            <Volume2 className="w-6 h-6 text-foreground" />
          </button>

          {/* Feedback Overlay */}
          {feedback === 'success' && (
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
              <div className="bg-white p-6 rounded-full shadow-2xl animate-in zoom-in spin-in-12 duration-500">
                <CheckCircle2 className="w-16 h-16 text-primary" />
              </div>
            </div>
          )}
          {feedback === 'retry' && (
            <div className="absolute inset-0 bg-destructive/10 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
               <div className="bg-white p-6 rounded-full shadow-2xl animate-in zoom-in duration-300">
                <XCircle className="w-16 h-16 text-destructive" />
              </div>
            </div>
          )}
        </div>

        <h2 className="text-6xl font-black text-center mb-12 capitalize tracking-tight">
          {currentWord.word}
        </h2>

        {/* Action Button */}
        <button
          onClick={listening ? SpeechRecognition.stopListening : startListening}
          className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
            listening
              ? "bg-destructive text-white scale-110 animate-pulse"
              : "bg-primary text-white hover:scale-105 active:scale-95 shadow-primary/30"
          )}
        >
          <Mic className={cn("w-10 h-10", listening && "animate-bounce")} />
        </button>

        <p className="text-center font-bold mt-6 h-8 text-lg">
          {listening ? "Listening..." : transcript || "Tap the mic and say the word"}
        </p>
      </div>
    </div>
  );
}