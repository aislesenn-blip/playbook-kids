import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../supabase/client'
import { v4 as uuidv4 } from 'uuid'

export type LearningLevel = 'First Words' | 'Sentences' | 'Advanced';

export interface StudentProfile {
  id: string;
  name: string;
  level: LearningLevel;
  avatarUrl: string;
}

export interface ProgressStats {
  wordsMastered: number;
  accuracy: number;
  streak: number;
  completedLessonIds: string[];
}

interface StudentState {
  currentStudent: StudentProfile | null;
  isOnboardingComplete: boolean;
  stats: ProgressStats;

  enrollStudent: (name: string, level: LearningLevel) => Promise<void>;
  recordLessonCompletion: (lessonId: string, accuracy: number) => Promise<void>;
  fetchStats: () => Promise<void>;
  resetApp: () => void;
}

export const useStudentStore = create<StudentState>()(
  persist(
    (set, get) => ({
      currentStudent: null,
      isOnboardingComplete: false,
      stats: {
        wordsMastered: 0,
        accuracy: 0,
        streak: 0,
        completedLessonIds: [],
      },

      enrollStudent: async (name, level) => {
        // Generate an ID for the student (Simulating Auth since we don't have full registration UI)
        const id = uuidv4();

        const avatarUrl = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${name}`;

        // Try to insert into real DB. Catch if not fully configured yet.
        try {
          await supabase.from('profiles').insert([
            { id, parent_name: 'Parent', student_name: name, learning_level: level }
          ]);
        } catch (e) {
          console.error("Failed to save to Supabase, continuing locally for demo", e);
        }

        set({
          currentStudent: {
            id,
            name,
            level,
            avatarUrl,
          },
          isOnboardingComplete: true,
        });
      },

      recordLessonCompletion: async (lessonId, accuracy) => {
        const state = get();
        if (!state.currentStudent) return;
        if (state.stats.completedLessonIds.includes(lessonId)) return;

        // Try to insert into real DB.
        try {
          await supabase.from('student_progress').insert([
            {
              student_id: state.currentStudent.id,
              lesson_id: lessonId,
              status: 'Completed',
              score: 100,
              accuracy_percentage: accuracy
            }
          ]);
        } catch (e) {
          console.error("Failed to record to Supabase, continuing locally", e);
        }

        // Optimistic local update
        set((prevState) => {
          const newMastered = prevState.stats.wordsMastered + 5;
          const totalLessons = prevState.stats.completedLessonIds.length;
          const newAccuracy = totalLessons === 0
            ? accuracy
            : ((prevState.stats.accuracy * totalLessons) + accuracy) / (totalLessons + 1);

          return {
            stats: {
              ...prevState.stats,
              wordsMastered: newMastered,
              accuracy: Math.round(newAccuracy),
              streak: prevState.stats.streak === 0 ? 1 : prevState.stats.streak,
              completedLessonIds: [...prevState.stats.completedLessonIds, lessonId],
            }
          };
        });

        // Re-fetch stats to sync with DB
        get().fetchStats();
      },

      fetchStats: async () => {
        const state = get();
        if (!state.currentStudent) return;

        try {
          const { data, error } = await supabase
            .from('student_stats')
            .select('*')
            .eq('student_id', state.currentStudent.id)
            .single();

          if (data && !error) {
             set((prevState) => ({
               stats: {
                 ...prevState.stats,
                 accuracy: Math.round(data.average_accuracy || 0),
                 wordsMastered: (data.lessons_completed || 0) * 5,
               }
             }));
          }
        } catch (e) {
           console.error("Could not fetch stats", e);
        }
      },

      resetApp: () => set({
        currentStudent: null,
        isOnboardingComplete: false,
        stats: { wordsMastered: 0, accuracy: 0, streak: 0, completedLessonIds: [] }
      }),
    }),
    {
      name: 'unimonday-student-storage',
    }
  )
)