import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, Episode, Message, DailyQuest } from '@/types';

interface AppState {
    profile: UserProfile | null;
    setProfile: (profile: UserProfile) => void;
    updateProfile: (updates: Partial<UserProfile>) => void;
    completeTour: () => void;
    tourStep: number;
    setTourStep: (step: number) => void;

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
            tourStep: 0,
            setTourStep: (step) => set({ tourStep: step }),
            completeTour: () => set((state) => ({
              profile: state.profile ? { ...state.profile, hasCompletedTour: true } : null
            })),

                        episodes: [
                { id: '1', title: 'The First Hello', description: 'Practice saying hello and introducing yourself naturally.', isLocked: false, isCompleted: false, stars: 0, type: 'story' },
                { id: '2', title: 'How Are You Today?', description: 'Learn to express simple feelings and ask how others are doing.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '3', title: 'Meet My Family', description: 'Introduce the people you love using simple connecting words.', isLocked: true, isCompleted: false, stars: 0, type: 'vocabulary' },
                { id: '4', title: 'Yes, Please!', description: 'Learn the polite magic words for agreeing and accepting things.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '5', title: 'My Favorite Color', description: 'Describe the world around you by sharing what colors you like.', isLocked: true, isCompleted: false, stars: 0, type: 'story' },
                { id: '6', title: 'Counting Stars', description: 'Practice numbers 1-5 in a calm, night-time story setting.', isLocked: true, isCompleted: false, stars: 0, type: 'challenge' },
                { id: '7', title: 'Morning Routine', description: 'Talk about waking up and getting ready for the day.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '8', title: 'The Fruit Market', description: 'Ask for your favorite fruit using "I would like".', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '9', title: 'Animal Sounds', description: 'A fun game matching animals to the sounds they make.', isLocked: true, isCompleted: false, stars: 0, type: 'vocabulary' },
                { id: '10', title: 'Sweet Dreams', description: 'Saying goodnight and wishing well before sleep.', isLocked: true, isCompleted: false, stars: 0, type: 'story' },
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
