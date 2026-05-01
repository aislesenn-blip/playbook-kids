import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Campus {
  id: string;
  name: string;
  city: string;
}

export type UserRole = 'student' | 'vendor' | null;

interface AppState {
  currentCampus: Campus | null;
  userRole: UserRole;
  isCartOpen: boolean;
  isOnboardingComplete: boolean;

  setCampus: (campus: Campus) => void;
  setUserRole: (role: UserRole) => void;
  toggleCart: () => void;
  completeOnboarding: () => void;
  resetApp: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentCampus: null,
      userRole: null,
      isCartOpen: false,
      isOnboardingComplete: false,

      setCampus: (campus) => set({ currentCampus: campus }),
      setUserRole: (role) => set({ userRole: role }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      completeOnboarding: () => set({ isOnboardingComplete: true }),
      resetApp: () => set({ currentCampus: null, userRole: null, isOnboardingComplete: false, isCartOpen: false }),
    }),
    {
      name: 'unimonday-app-storage',
    }
  )
)
