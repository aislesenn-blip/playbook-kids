"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useStudentStore } from '@/lib/store/student-store';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';
import { Vocabulary } from '../speaking/page';

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
      // Fetch writing vocabulary (lesson 2 for now)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStudent, router]);

  useEffect(() => {
    // Initialize empty array for current word
    if (currentWord) {
      // Focus first input on mount/change, defer state update if needed but since this sets initial state it's usually fine
      // However to clear strict mode warnings we can defer initialization
      const timeoutId = setTimeout(() => {
        setInputValues(Array(targetWord.length).fill(''));
        setFeedback('idle');
        inputRefs.current[0]?.focus();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, currentWord, targetWord.length]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow letters
    if (!/^[a-zA-Z]?$/.test(value)) return;

    const upperValue = value.toUpperCase();
    const newValues = [...inputValues];
    newValues[index] = upperValue;
    setInputValues(newValues);

    // Auto-advance
    if (upperValue && index < targetWord.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check completion
    if (newValues.every(val => val !== '')) {
      checkSpelling(newValues.join(''));
    } else {
      setFeedback('idle'); // Reset error if typing again
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !inputValues[index] && index > 0) {
      // Move to previous on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const checkSpelling = (spelled: string) => {
    if (spelled === targetWord) {
      setFeedback('success');
      triggerConfetti();
      setTimeout(nextWord, 2000);
    } else {
      setFeedback('error');
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00E676', '#ffffff']
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
    }
  };

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
          <p className="font-medium">We couldn&apos;t load the writing exercises. Please ensure your Supabase database is connected and seeded.</p>
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
        <h1 className="text-5xl font-black mb-4">Masterful Spelling!</h1>
        <p className="text-xl font-medium text-muted-foreground mb-12">You&apos;ve completed the Writing Studio challenge.</p>
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
    <div className="pb-24 max-w-2xl mx-auto pt-4 px-4 min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black">Writing Studio</h1>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
          {currentIndex + 1} / {vocabulary.length}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Visual Cue */}
        <div className="w-48 h-48 relative rounded-3xl overflow-hidden shadow-xl mb-12 border-4 border-white">
          <Image
            src={currentWord.imageUrl}
            alt="Word hint"
            fill
            className="object-cover"
          />
        </div>

        {/* Spelling Inputs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 w-full px-2">
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
                "w-14 h-16 sm:w-20 sm:h-24 text-4xl sm:text-5xl text-center font-black rounded-2xl border-b-8 outline-none transition-all focus:scale-110",
                feedback === 'success' ? "border-primary text-primary bg-primary/10" :
                feedback === 'error' ? "border-destructive text-destructive bg-destructive/10 animate-shake" :
                "border-border bg-secondary/50 focus:border-primary text-foreground focus:bg-background shadow-sm"
              )}
            />
          ))}
        </div>

        {/* Feedback Message */}
        <div className="h-16">
          {feedback === 'success' && (
             <div className="flex items-center gap-2 text-primary font-bold text-2xl animate-in slide-in-from-bottom-4">
               <CheckCircle2 className="w-8 h-8" /> Correct!
             </div>
          )}
          {feedback === 'error' && (
             <div className="flex items-center gap-2 text-destructive font-bold text-xl animate-in slide-in-from-bottom-4">
               <XCircle className="w-6 h-6" /> Try again!
             </div>
          )}
        </div>
      </div>
    </div>
  );
}