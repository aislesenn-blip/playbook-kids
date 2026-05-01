"use client";

import { create } from 'zustand';

interface LocationState {
  campus: string | null;
  setCampus: (campus: string) => void;
  isDetecting: boolean;
  setIsDetecting: (isDetecting: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  campus: null,
  setCampus: (campus) => set({ campus }),
  isDetecting: false,
  setIsDetecting: (isDetecting) => set({ isDetecting }),
  error: null,
  setError: (error) => set({ error }),
}));
