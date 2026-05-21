
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, Episode, Message, DailyQuest } from '@/types';

interface AppState {
    profile: UserProfile | null;
    setProfile: (profile: UserProfile) => void;
    updateProfile: (updates: Partial<UserProfile>) => void;

    episodes: Episode[];
    completeEpisode: (id: string, stars: number) => void;

    dailyQuests: DailyQuest[];

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
            setProfile: (profile) => set({ profile: { ...profile, hearts: 5 } }),
            updateProfile: (updates) => set((state) => ({
              profile: state.profile ? { ...state.profile, ...updates } : null
            })),

            episodes: [
                { id: '1', title: 'The Greetings Forest', description: 'Learn to say hello and introduce yourself.', isLocked: false, isCompleted: false, stars: 0, type: 'story' },
                { id: '2', title: 'Family Tree', description: 'Meet the characters and their families.', isLocked: true, isCompleted: false, stars: 0, type: 'vocabulary' },
                { id: '3', title: 'Color Carnival', description: 'Explore the vibrant colors of the festival.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '4', title: 'Number Quest', description: 'Count the missing stars to unlock the chest.', isLocked: true, isCompleted: false, stars: 0, type: 'challenge' },
                { id: '5', title: 'Animal Friends', description: 'Learn animal names and their sounds.', isLocked: true, isCompleted: false, stars: 0, type: 'story' },
                { id: '6', title: 'The Market Negotiation', description: 'Learn how to bargain for fruit at the busy market.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '7', title: 'Lost in the City', description: 'Ask for directions to find the train station.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '8', title: 'Ordering Coffee', description: 'Master the art of ordering your favorite drink.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '9', title: 'The Job Interview', description: 'Professional vocabulary for a mock interview.', isLocked: true, isCompleted: false, stars: 0, type: 'challenge' },
                { id: '10', title: 'Airport Security', description: 'Navigating travel questions safely and clearly.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
            ],

            dailyQuests: [
                { id: 'q1', title: 'Complete 2 Episodes', target: 2, progress: 1, rewardXP: 50, isCompleted: false },
                { id: 'q2', title: 'Earn 3 Stars in a Lesson', target: 1, progress: 0, rewardXP: 20, isCompleted: false },
                { id: 'q3', title: 'Maintain your Streak', target: 1, progress: 1, rewardXP: 10, isCompleted: true },
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
