with open("unimonday-web/src/lib/store/app-store.ts", "r") as f:
    content = f.read()

content = """import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, PrintJob } from '@/types';

interface AppState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  printJobs: PrintJob[];
  addPrintJob: (job: PrintJob) => void;
  updatePrintJobStatus: (jobId: string, status: PrintJob['status']) => void;
  clearPrintJobs: () => void;
  pendingMessages: { vendorId: string; text: string }[];
  removePendingMessage: (vendorId: string) => void;
  initAuth: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      selectedRegion: 'Dar es Salaam',
      setSelectedRegion: (region) => set({ selectedRegion: region }),
      printJobs: [],
      addPrintJob: (job) => set((state) => ({ printJobs: [...state.printJobs, job] })),
      updatePrintJobStatus: (jobId, status) => set((state) => ({
        printJobs: state.printJobs.map((j) => j.id === jobId ? { ...j, status } : j)
      })),
      clearPrintJobs: () => set({ printJobs: [] }),
      pendingMessages: [],
      removePendingMessage: (vendorId) => set((state) => ({ pendingMessages: state.pendingMessages.filter(m => m.vendorId !== vendorId) })),
      initAuth: () => {},
    }),
    {
      name: 'unimonday-cloud-stationary-store',
    }
  )
);
"""

with open("unimonday-web/src/lib/store/app-store.ts", "w") as f:
    f.write(content)
