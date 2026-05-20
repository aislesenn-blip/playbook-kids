
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, Episode, Message } from '@/types';

interface AppState {
    profile: UserProfile | null;
    setProfile: (profile: UserProfile) => void;

    episodes: Episode[];
    completeEpisode: (id: string, stars: number) => void;

    messages: Message[];
    addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
    clearMessages: () => void;

    isVoiceActive: boolean;
    setVoiceActive: (active: boolean) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            profile: null,
            setProfile: (profile) => set({ profile }),

            episodes: [
                { id: '1', title: 'The Greetings Forest', description: 'Learn to say hello and introduce yourself.', isLocked: false, isCompleted: false, stars: 0, type: 'story' },
                { id: '2', title: 'Family Tree', description: 'Meet the characters and their families.', isLocked: true, isCompleted: false, stars: 0, type: 'vocabulary' },
                { id: '3', title: 'Color Carnival', description: 'Explore the vibrant colors of the festival.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '4', title: 'Number Quest', description: 'Count the missing stars to unlock the chest.', isLocked: true, isCompleted: false, stars: 0, type: 'challenge' },
                { id: '5', title: 'Animal Friends', description: 'Learn animal names and their sounds.', isLocked: true, isCompleted: false, stars: 0, type: 'story' },
            ],
            completeEpisode: (id, stars) => set((state) => {
                const newEpisodes = [...state.episodes];
                const epIndex = newEpisodes.findIndex(e => e.id === id);
                if (epIndex > -1) {
                    newEpisodes[epIndex] = { ...newEpisodes[epIndex], isCompleted: true, stars: Math.max(newEpisodes[epIndex].stars, stars) };
                    if (epIndex + 1 < newEpisodes.length) {
                        newEpisodes[epIndex + 1] = { ...newEpisodes[epIndex + 1], isLocked: false };
                    }
                }
                return { episodes: newEpisodes, profile: state.profile ? { ...state.profile, points: state.profile.points + stars * 10 } : null };
            }),

            messages: [],
            addMessage: (msg) => set((state) => ({
                messages: [...state.messages, { ...msg, id: crypto.randomUUID(), timestamp: Date.now() }]
            })),
            clearMessages: () => set({ messages: [] }),

            isVoiceActive: false,
            setVoiceActive: (active) => set({ isVoiceActive: active }),
        }),
        {
            name: 'unimonday-learning-store'
        }
    )
);
