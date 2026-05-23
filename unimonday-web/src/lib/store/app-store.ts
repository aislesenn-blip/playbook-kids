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
                { id: '3', title: 'Saying Goodbye', description: 'Practice closing a conversation warmly and politely.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '4', title: 'My Feelings', description: 'Learn to describe if you are happy, sad, or tired.', isLocked: true, isCompleted: false, stars: 0, type: 'vocabulary' },
                { id: '5', title: 'Meet My Family', description: 'Introduce the people you love using simple connecting words.', isLocked: true, isCompleted: false, stars: 0, type: 'vocabulary' },
                { id: '6', title: 'Yes and No, Please', description: 'Learn the polite magic words for agreeing and declining.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '7', title: 'My Daily Words', description: 'Essential words for things around the house.', isLocked: true, isCompleted: false, stars: 0, type: 'vocabulary' },
                { id: '8', title: 'Asking Questions', description: 'How to ask simple questions like "What is that?".', isLocked: true, isCompleted: false, stars: 0, type: 'challenge' },
                { id: '9', title: 'Sharing a Story', description: 'Listen to a short story and answer simple questions.', isLocked: true, isCompleted: false, stars: 0, type: 'story' },
                { id: '10', title: 'Real World Practice', description: 'A simulated conversation at a market.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '11', title: 'Speaking with Confidence', description: 'Focus on clear pronunciation and confident volume.', isLocked: true, isCompleted: false, stars: 0, type: 'challenge' },
                { id: '12', title: 'Describing Situations', description: 'Explain what is happening in a simple scene.', isLocked: true, isCompleted: false, stars: 0, type: 'roleplay' },
                { id: '13', title: 'Expressing Needs', description: 'How to say "I need help" or "I am hungry".', isLocked: true, isCompleted: false, stars: 0, type: 'vocabulary' },
                { id: '14', title: 'Language Rhythm', description: 'Practice the natural flow and melody of speaking.', isLocked: true, isCompleted: false, stars: 0, type: 'challenge' },
                { id: '15', title: 'Fluent Interaction', description: 'A longer conversation combining everything learned so far.', isLocked: true, isCompleted: false, stars: 0, type: 'story' },
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
