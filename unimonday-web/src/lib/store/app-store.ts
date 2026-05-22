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
            setProfile: (profile) => set({ profile }),
            updateProfile: (updates) => set((state) => ({
              profile: state.profile ? { ...state.profile, ...updates } : null
            })),

            episodes: [
                { id: '1', title: 'The Greetings Forest', description: 'Practice saying hello and introducing yourself.', isLocked: false, isCompleted: false, stars: 0, type: 'story' },
                { id: '2', title: 'Family Tree', description: 'Meet the characters and their families.', isLocked: true, isCompleted: false, stars: 0, type: 'vocabulary' },
                { id: '3', title: 'Color Carnival', description: 'Explore the vibrant colors of the festival.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '4', title: 'Number Quest', description: 'Count the missing stars to unlock the chest.', isLocked: true, isCompleted: false, stars: 0, type: 'challenge' },
                { id: '5', title: 'Animal Friends', description: 'Learn animal names and their sounds.', isLocked: true, isCompleted: false, stars: 0, type: 'story' },
                { id: '6', title: 'The Fruit Market', description: 'Learn how to ask for your favorite fruit.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '7', title: 'Playground Games', description: 'Ask friends to play hide and seek.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '8', title: 'My Favorite Toy', description: 'Talk about the toys you love.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '9', title: 'The School Bus', description: 'School vocabulary adventure.', isLocked: true, isCompleted: false, stars: 0, type: 'challenge' },
                { id: '10', title: 'Bedtime Stories', description: 'Goodnight and sweet dreams.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
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
            name: 'unimonday-platform-state'
        }
    )
);
