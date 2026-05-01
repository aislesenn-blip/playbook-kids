import { create } from 'zustand'

type AppState = {
  language: 'en' | 'sw'
  setLanguage: (lang: 'en' | 'sw') => void
  isCartOpen: boolean
  toggleCart: () => void
}

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  isCartOpen: false,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}))
