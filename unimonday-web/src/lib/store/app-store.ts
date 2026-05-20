import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Learner, Parent } from '@/types'

interface AppState {
  currentLearner: Learner | null;
  currentParent: Parent | null;
  isAudioMuted: boolean;

  // Actions
  setLearner: (learner: Learner | null) => void;
  setParent: (parent: Parent | null) => void;
  toggleAudio: () => void;
  resetApp: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentLearner: null,
      currentParent: null,
      isAudioMuted: false,

      setLearner: (learner) => set({ currentLearner: learner }),
      setParent: (parent) => set({ currentParent: parent }),
      toggleAudio: () => set((state) => ({ isAudioMuted: !state.isAudioMuted })),

      resetApp: () => set({ currentLearner: null, currentParent: null, isAudioMuted: false }),
    }),
    {
      name: 'unimonday-app-storage',
    }
  )
)
