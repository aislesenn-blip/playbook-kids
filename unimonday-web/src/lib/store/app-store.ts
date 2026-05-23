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
          {
                    "id": "1",
                    "title": "Day 1: Introduction & Foundations - Part 1",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": false,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "2",
                    "title": "Day 2: Introduction & Foundations - Part 2",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "3",
                    "title": "Day 3: Introduction & Foundations - Part 3",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "4",
                    "title": "Day 4: Introduction & Foundations - Part 4",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "5",
                    "title": "Day 5: Introduction & Foundations - Part 5",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "6",
                    "title": "Day 6: Introduction & Foundations - Part 6",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "7",
                    "title": "Day 7: Introduction & Foundations - Part 7",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "8",
                    "title": "Day 8: Introduction & Foundations - Part 8",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "9",
                    "title": "Day 9: Introduction & Foundations - Part 9",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "10",
                    "title": "Day 10: Introduction & Foundations - Part 10",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "11",
                    "title": "Day 11: Introduction & Foundations - Part 11",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "12",
                    "title": "Day 12: Introduction & Foundations - Part 12",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "13",
                    "title": "Day 13: Introduction & Foundations - Part 13",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "14",
                    "title": "Day 14: Introduction & Foundations - Part 14",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "15",
                    "title": "Day 15: Introduction & Foundations - Part 15",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "16",
                    "title": "Day 16: Introduction & Foundations - Part 16",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "17",
                    "title": "Day 17: Introduction & Foundations - Part 17",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "18",
                    "title": "Day 18: Introduction & Foundations - Part 18",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "19",
                    "title": "Day 19: Introduction & Foundations - Part 19",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "20",
                    "title": "Day 20: Introduction & Foundations - Part 20",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "21",
                    "title": "Day 21: Introduction & Foundations - Part 21",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "22",
                    "title": "Day 22: Introduction & Foundations - Part 22",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "23",
                    "title": "Day 23: Introduction & Foundations - Part 23",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "24",
                    "title": "Day 24: Introduction & Foundations - Part 24",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "25",
                    "title": "Day 25: Introduction & Foundations - Part 25",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "26",
                    "title": "Day 26: Introduction & Foundations - Part 26",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "27",
                    "title": "Day 27: Introduction & Foundations - Part 27",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "28",
                    "title": "Day 28: Introduction & Foundations - Part 28",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "29",
                    "title": "Day 29: Introduction & Foundations - Part 29",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "30",
                    "title": "Day 30: Introduction & Foundations - Part 30",
                    "description": "Master essential speaking skills in introduction & foundations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "31",
                    "title": "Day 31: Daily Life & Home - Part 1",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "32",
                    "title": "Day 32: Daily Life & Home - Part 2",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "33",
                    "title": "Day 33: Daily Life & Home - Part 3",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "34",
                    "title": "Day 34: Daily Life & Home - Part 4",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "35",
                    "title": "Day 35: Daily Life & Home - Part 5",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "36",
                    "title": "Day 36: Daily Life & Home - Part 6",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "37",
                    "title": "Day 37: Daily Life & Home - Part 7",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "38",
                    "title": "Day 38: Daily Life & Home - Part 8",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "39",
                    "title": "Day 39: Daily Life & Home - Part 9",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "40",
                    "title": "Day 40: Daily Life & Home - Part 10",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "41",
                    "title": "Day 41: Daily Life & Home - Part 11",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "42",
                    "title": "Day 42: Daily Life & Home - Part 12",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "43",
                    "title": "Day 43: Daily Life & Home - Part 13",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "44",
                    "title": "Day 44: Daily Life & Home - Part 14",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "45",
                    "title": "Day 45: Daily Life & Home - Part 15",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "46",
                    "title": "Day 46: Daily Life & Home - Part 16",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "47",
                    "title": "Day 47: Daily Life & Home - Part 17",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "48",
                    "title": "Day 48: Daily Life & Home - Part 18",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "49",
                    "title": "Day 49: Daily Life & Home - Part 19",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "50",
                    "title": "Day 50: Daily Life & Home - Part 20",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "51",
                    "title": "Day 51: Daily Life & Home - Part 21",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "52",
                    "title": "Day 52: Daily Life & Home - Part 22",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "53",
                    "title": "Day 53: Daily Life & Home - Part 23",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "54",
                    "title": "Day 54: Daily Life & Home - Part 24",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "55",
                    "title": "Day 55: Daily Life & Home - Part 25",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "56",
                    "title": "Day 56: Daily Life & Home - Part 26",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "57",
                    "title": "Day 57: Daily Life & Home - Part 27",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "58",
                    "title": "Day 58: Daily Life & Home - Part 28",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "59",
                    "title": "Day 59: Daily Life & Home - Part 29",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "60",
                    "title": "Day 60: Daily Life & Home - Part 30",
                    "description": "Master essential speaking skills in daily life & home with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "61",
                    "title": "Day 61: Expressing Feelings - Part 1",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "62",
                    "title": "Day 62: Expressing Feelings - Part 2",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "63",
                    "title": "Day 63: Expressing Feelings - Part 3",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "64",
                    "title": "Day 64: Expressing Feelings - Part 4",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "65",
                    "title": "Day 65: Expressing Feelings - Part 5",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "66",
                    "title": "Day 66: Expressing Feelings - Part 6",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "67",
                    "title": "Day 67: Expressing Feelings - Part 7",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "68",
                    "title": "Day 68: Expressing Feelings - Part 8",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "69",
                    "title": "Day 69: Expressing Feelings - Part 9",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "70",
                    "title": "Day 70: Expressing Feelings - Part 10",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "71",
                    "title": "Day 71: Expressing Feelings - Part 11",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "72",
                    "title": "Day 72: Expressing Feelings - Part 12",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "73",
                    "title": "Day 73: Expressing Feelings - Part 13",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "74",
                    "title": "Day 74: Expressing Feelings - Part 14",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "75",
                    "title": "Day 75: Expressing Feelings - Part 15",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "76",
                    "title": "Day 76: Expressing Feelings - Part 16",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "77",
                    "title": "Day 77: Expressing Feelings - Part 17",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "78",
                    "title": "Day 78: Expressing Feelings - Part 18",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "79",
                    "title": "Day 79: Expressing Feelings - Part 19",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "80",
                    "title": "Day 80: Expressing Feelings - Part 20",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "81",
                    "title": "Day 81: Expressing Feelings - Part 21",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "82",
                    "title": "Day 82: Expressing Feelings - Part 22",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "83",
                    "title": "Day 83: Expressing Feelings - Part 23",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "84",
                    "title": "Day 84: Expressing Feelings - Part 24",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "85",
                    "title": "Day 85: Expressing Feelings - Part 25",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "86",
                    "title": "Day 86: Expressing Feelings - Part 26",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "87",
                    "title": "Day 87: Expressing Feelings - Part 27",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "88",
                    "title": "Day 88: Expressing Feelings - Part 28",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "89",
                    "title": "Day 89: Expressing Feelings - Part 29",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "90",
                    "title": "Day 90: Expressing Feelings - Part 30",
                    "description": "Master essential speaking skills in expressing feelings with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "91",
                    "title": "Day 91: Food & Dining - Part 1",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "92",
                    "title": "Day 92: Food & Dining - Part 2",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "93",
                    "title": "Day 93: Food & Dining - Part 3",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "94",
                    "title": "Day 94: Food & Dining - Part 4",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "95",
                    "title": "Day 95: Food & Dining - Part 5",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "96",
                    "title": "Day 96: Food & Dining - Part 6",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "97",
                    "title": "Day 97: Food & Dining - Part 7",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "98",
                    "title": "Day 98: Food & Dining - Part 8",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "99",
                    "title": "Day 99: Food & Dining - Part 9",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "100",
                    "title": "Day 100: Food & Dining - Part 10",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "101",
                    "title": "Day 101: Food & Dining - Part 11",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "102",
                    "title": "Day 102: Food & Dining - Part 12",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "103",
                    "title": "Day 103: Food & Dining - Part 13",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "104",
                    "title": "Day 104: Food & Dining - Part 14",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "105",
                    "title": "Day 105: Food & Dining - Part 15",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "106",
                    "title": "Day 106: Food & Dining - Part 16",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "107",
                    "title": "Day 107: Food & Dining - Part 17",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "108",
                    "title": "Day 108: Food & Dining - Part 18",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "109",
                    "title": "Day 109: Food & Dining - Part 19",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "110",
                    "title": "Day 110: Food & Dining - Part 20",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "111",
                    "title": "Day 111: Food & Dining - Part 21",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "112",
                    "title": "Day 112: Food & Dining - Part 22",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "113",
                    "title": "Day 113: Food & Dining - Part 23",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "114",
                    "title": "Day 114: Food & Dining - Part 24",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "115",
                    "title": "Day 115: Food & Dining - Part 25",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "116",
                    "title": "Day 116: Food & Dining - Part 26",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "117",
                    "title": "Day 117: Food & Dining - Part 27",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "118",
                    "title": "Day 118: Food & Dining - Part 28",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "119",
                    "title": "Day 119: Food & Dining - Part 29",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "120",
                    "title": "Day 120: Food & Dining - Part 30",
                    "description": "Master essential speaking skills in food & dining with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "121",
                    "title": "Day 121: Friends & Playtime - Part 1",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "122",
                    "title": "Day 122: Friends & Playtime - Part 2",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "123",
                    "title": "Day 123: Friends & Playtime - Part 3",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "124",
                    "title": "Day 124: Friends & Playtime - Part 4",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "125",
                    "title": "Day 125: Friends & Playtime - Part 5",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "126",
                    "title": "Day 126: Friends & Playtime - Part 6",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "127",
                    "title": "Day 127: Friends & Playtime - Part 7",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "128",
                    "title": "Day 128: Friends & Playtime - Part 8",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "129",
                    "title": "Day 129: Friends & Playtime - Part 9",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "130",
                    "title": "Day 130: Friends & Playtime - Part 10",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "131",
                    "title": "Day 131: Friends & Playtime - Part 11",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "132",
                    "title": "Day 132: Friends & Playtime - Part 12",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "133",
                    "title": "Day 133: Friends & Playtime - Part 13",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "134",
                    "title": "Day 134: Friends & Playtime - Part 14",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "135",
                    "title": "Day 135: Friends & Playtime - Part 15",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "136",
                    "title": "Day 136: Friends & Playtime - Part 16",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "137",
                    "title": "Day 137: Friends & Playtime - Part 17",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "138",
                    "title": "Day 138: Friends & Playtime - Part 18",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "139",
                    "title": "Day 139: Friends & Playtime - Part 19",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "140",
                    "title": "Day 140: Friends & Playtime - Part 20",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "141",
                    "title": "Day 141: Friends & Playtime - Part 21",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "142",
                    "title": "Day 142: Friends & Playtime - Part 22",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "143",
                    "title": "Day 143: Friends & Playtime - Part 23",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "144",
                    "title": "Day 144: Friends & Playtime - Part 24",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "145",
                    "title": "Day 145: Friends & Playtime - Part 25",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "146",
                    "title": "Day 146: Friends & Playtime - Part 26",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "147",
                    "title": "Day 147: Friends & Playtime - Part 27",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "148",
                    "title": "Day 148: Friends & Playtime - Part 28",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "149",
                    "title": "Day 149: Friends & Playtime - Part 29",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "150",
                    "title": "Day 150: Friends & Playtime - Part 30",
                    "description": "Master essential speaking skills in friends & playtime with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "151",
                    "title": "Day 151: School & Learning - Part 1",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "152",
                    "title": "Day 152: School & Learning - Part 2",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "153",
                    "title": "Day 153: School & Learning - Part 3",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "154",
                    "title": "Day 154: School & Learning - Part 4",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "155",
                    "title": "Day 155: School & Learning - Part 5",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "156",
                    "title": "Day 156: School & Learning - Part 6",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "157",
                    "title": "Day 157: School & Learning - Part 7",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "158",
                    "title": "Day 158: School & Learning - Part 8",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "159",
                    "title": "Day 159: School & Learning - Part 9",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "160",
                    "title": "Day 160: School & Learning - Part 10",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "161",
                    "title": "Day 161: School & Learning - Part 11",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "162",
                    "title": "Day 162: School & Learning - Part 12",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "163",
                    "title": "Day 163: School & Learning - Part 13",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "164",
                    "title": "Day 164: School & Learning - Part 14",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "165",
                    "title": "Day 165: School & Learning - Part 15",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "166",
                    "title": "Day 166: School & Learning - Part 16",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "167",
                    "title": "Day 167: School & Learning - Part 17",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "168",
                    "title": "Day 168: School & Learning - Part 18",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "169",
                    "title": "Day 169: School & Learning - Part 19",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "170",
                    "title": "Day 170: School & Learning - Part 20",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "171",
                    "title": "Day 171: School & Learning - Part 21",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "172",
                    "title": "Day 172: School & Learning - Part 22",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "173",
                    "title": "Day 173: School & Learning - Part 23",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "174",
                    "title": "Day 174: School & Learning - Part 24",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "175",
                    "title": "Day 175: School & Learning - Part 25",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "176",
                    "title": "Day 176: School & Learning - Part 26",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "177",
                    "title": "Day 177: School & Learning - Part 27",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "178",
                    "title": "Day 178: School & Learning - Part 28",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "179",
                    "title": "Day 179: School & Learning - Part 29",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "180",
                    "title": "Day 180: School & Learning - Part 30",
                    "description": "Master essential speaking skills in school & learning with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "181",
                    "title": "Day 181: Animals & Nature - Part 1",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "182",
                    "title": "Day 182: Animals & Nature - Part 2",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "183",
                    "title": "Day 183: Animals & Nature - Part 3",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "184",
                    "title": "Day 184: Animals & Nature - Part 4",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "185",
                    "title": "Day 185: Animals & Nature - Part 5",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "186",
                    "title": "Day 186: Animals & Nature - Part 6",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "187",
                    "title": "Day 187: Animals & Nature - Part 7",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "188",
                    "title": "Day 188: Animals & Nature - Part 8",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "189",
                    "title": "Day 189: Animals & Nature - Part 9",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "190",
                    "title": "Day 190: Animals & Nature - Part 10",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "191",
                    "title": "Day 191: Animals & Nature - Part 11",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "192",
                    "title": "Day 192: Animals & Nature - Part 12",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "193",
                    "title": "Day 193: Animals & Nature - Part 13",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "194",
                    "title": "Day 194: Animals & Nature - Part 14",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "195",
                    "title": "Day 195: Animals & Nature - Part 15",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "196",
                    "title": "Day 196: Animals & Nature - Part 16",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "197",
                    "title": "Day 197: Animals & Nature - Part 17",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "198",
                    "title": "Day 198: Animals & Nature - Part 18",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "199",
                    "title": "Day 199: Animals & Nature - Part 19",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "200",
                    "title": "Day 200: Animals & Nature - Part 20",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "201",
                    "title": "Day 201: Animals & Nature - Part 21",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "202",
                    "title": "Day 202: Animals & Nature - Part 22",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "203",
                    "title": "Day 203: Animals & Nature - Part 23",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "204",
                    "title": "Day 204: Animals & Nature - Part 24",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "205",
                    "title": "Day 205: Animals & Nature - Part 25",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "206",
                    "title": "Day 206: Animals & Nature - Part 26",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "207",
                    "title": "Day 207: Animals & Nature - Part 27",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "208",
                    "title": "Day 208: Animals & Nature - Part 28",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "209",
                    "title": "Day 209: Animals & Nature - Part 29",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "210",
                    "title": "Day 210: Animals & Nature - Part 30",
                    "description": "Master essential speaking skills in animals & nature with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "211",
                    "title": "Day 211: Travel & Transport - Part 1",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "212",
                    "title": "Day 212: Travel & Transport - Part 2",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "213",
                    "title": "Day 213: Travel & Transport - Part 3",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "214",
                    "title": "Day 214: Travel & Transport - Part 4",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "215",
                    "title": "Day 215: Travel & Transport - Part 5",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "216",
                    "title": "Day 216: Travel & Transport - Part 6",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "217",
                    "title": "Day 217: Travel & Transport - Part 7",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "218",
                    "title": "Day 218: Travel & Transport - Part 8",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "219",
                    "title": "Day 219: Travel & Transport - Part 9",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "220",
                    "title": "Day 220: Travel & Transport - Part 10",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "221",
                    "title": "Day 221: Travel & Transport - Part 11",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "222",
                    "title": "Day 222: Travel & Transport - Part 12",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "223",
                    "title": "Day 223: Travel & Transport - Part 13",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "224",
                    "title": "Day 224: Travel & Transport - Part 14",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "225",
                    "title": "Day 225: Travel & Transport - Part 15",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "226",
                    "title": "Day 226: Travel & Transport - Part 16",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "227",
                    "title": "Day 227: Travel & Transport - Part 17",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "228",
                    "title": "Day 228: Travel & Transport - Part 18",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "229",
                    "title": "Day 229: Travel & Transport - Part 19",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "230",
                    "title": "Day 230: Travel & Transport - Part 20",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "231",
                    "title": "Day 231: Travel & Transport - Part 21",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "232",
                    "title": "Day 232: Travel & Transport - Part 22",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "233",
                    "title": "Day 233: Travel & Transport - Part 23",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "234",
                    "title": "Day 234: Travel & Transport - Part 24",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "235",
                    "title": "Day 235: Travel & Transport - Part 25",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "236",
                    "title": "Day 236: Travel & Transport - Part 26",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "237",
                    "title": "Day 237: Travel & Transport - Part 27",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "238",
                    "title": "Day 238: Travel & Transport - Part 28",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "239",
                    "title": "Day 239: Travel & Transport - Part 29",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "240",
                    "title": "Day 240: Travel & Transport - Part 30",
                    "description": "Master essential speaking skills in travel & transport with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "241",
                    "title": "Day 241: Time & Routines - Part 1",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "242",
                    "title": "Day 242: Time & Routines - Part 2",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "243",
                    "title": "Day 243: Time & Routines - Part 3",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "244",
                    "title": "Day 244: Time & Routines - Part 4",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "245",
                    "title": "Day 245: Time & Routines - Part 5",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "246",
                    "title": "Day 246: Time & Routines - Part 6",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "247",
                    "title": "Day 247: Time & Routines - Part 7",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "248",
                    "title": "Day 248: Time & Routines - Part 8",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "249",
                    "title": "Day 249: Time & Routines - Part 9",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "250",
                    "title": "Day 250: Time & Routines - Part 10",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "251",
                    "title": "Day 251: Time & Routines - Part 11",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "252",
                    "title": "Day 252: Time & Routines - Part 12",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "253",
                    "title": "Day 253: Time & Routines - Part 13",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "254",
                    "title": "Day 254: Time & Routines - Part 14",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "255",
                    "title": "Day 255: Time & Routines - Part 15",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "256",
                    "title": "Day 256: Time & Routines - Part 16",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "257",
                    "title": "Day 257: Time & Routines - Part 17",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "258",
                    "title": "Day 258: Time & Routines - Part 18",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "259",
                    "title": "Day 259: Time & Routines - Part 19",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "260",
                    "title": "Day 260: Time & Routines - Part 20",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "261",
                    "title": "Day 261: Time & Routines - Part 21",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "262",
                    "title": "Day 262: Time & Routines - Part 22",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "263",
                    "title": "Day 263: Time & Routines - Part 23",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "264",
                    "title": "Day 264: Time & Routines - Part 24",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "265",
                    "title": "Day 265: Time & Routines - Part 25",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "266",
                    "title": "Day 266: Time & Routines - Part 26",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "267",
                    "title": "Day 267: Time & Routines - Part 27",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "268",
                    "title": "Day 268: Time & Routines - Part 28",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "269",
                    "title": "Day 269: Time & Routines - Part 29",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "270",
                    "title": "Day 270: Time & Routines - Part 30",
                    "description": "Master essential speaking skills in time & routines with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "271",
                    "title": "Day 271: Imagination & Stories - Part 1",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "272",
                    "title": "Day 272: Imagination & Stories - Part 2",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "273",
                    "title": "Day 273: Imagination & Stories - Part 3",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "274",
                    "title": "Day 274: Imagination & Stories - Part 4",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "275",
                    "title": "Day 275: Imagination & Stories - Part 5",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "276",
                    "title": "Day 276: Imagination & Stories - Part 6",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "277",
                    "title": "Day 277: Imagination & Stories - Part 7",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "278",
                    "title": "Day 278: Imagination & Stories - Part 8",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "279",
                    "title": "Day 279: Imagination & Stories - Part 9",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "280",
                    "title": "Day 280: Imagination & Stories - Part 10",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "281",
                    "title": "Day 281: Imagination & Stories - Part 11",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "282",
                    "title": "Day 282: Imagination & Stories - Part 12",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "283",
                    "title": "Day 283: Imagination & Stories - Part 13",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "284",
                    "title": "Day 284: Imagination & Stories - Part 14",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "285",
                    "title": "Day 285: Imagination & Stories - Part 15",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "286",
                    "title": "Day 286: Imagination & Stories - Part 16",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "287",
                    "title": "Day 287: Imagination & Stories - Part 17",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "288",
                    "title": "Day 288: Imagination & Stories - Part 18",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "289",
                    "title": "Day 289: Imagination & Stories - Part 19",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "290",
                    "title": "Day 290: Imagination & Stories - Part 20",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "291",
                    "title": "Day 291: Imagination & Stories - Part 21",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "292",
                    "title": "Day 292: Imagination & Stories - Part 22",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "293",
                    "title": "Day 293: Imagination & Stories - Part 23",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "294",
                    "title": "Day 294: Imagination & Stories - Part 24",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "295",
                    "title": "Day 295: Imagination & Stories - Part 25",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "296",
                    "title": "Day 296: Imagination & Stories - Part 26",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "297",
                    "title": "Day 297: Imagination & Stories - Part 27",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "298",
                    "title": "Day 298: Imagination & Stories - Part 28",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "299",
                    "title": "Day 299: Imagination & Stories - Part 29",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "300",
                    "title": "Day 300: Imagination & Stories - Part 30",
                    "description": "Master essential speaking skills in imagination & stories with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "301",
                    "title": "Day 301: Advanced Conversations - Part 1",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "302",
                    "title": "Day 302: Advanced Conversations - Part 2",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "303",
                    "title": "Day 303: Advanced Conversations - Part 3",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "304",
                    "title": "Day 304: Advanced Conversations - Part 4",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "305",
                    "title": "Day 305: Advanced Conversations - Part 5",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "306",
                    "title": "Day 306: Advanced Conversations - Part 6",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "307",
                    "title": "Day 307: Advanced Conversations - Part 7",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "308",
                    "title": "Day 308: Advanced Conversations - Part 8",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "309",
                    "title": "Day 309: Advanced Conversations - Part 9",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "310",
                    "title": "Day 310: Advanced Conversations - Part 10",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "311",
                    "title": "Day 311: Advanced Conversations - Part 11",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "312",
                    "title": "Day 312: Advanced Conversations - Part 12",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "313",
                    "title": "Day 313: Advanced Conversations - Part 13",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "314",
                    "title": "Day 314: Advanced Conversations - Part 14",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "315",
                    "title": "Day 315: Advanced Conversations - Part 15",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "316",
                    "title": "Day 316: Advanced Conversations - Part 16",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "317",
                    "title": "Day 317: Advanced Conversations - Part 17",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "318",
                    "title": "Day 318: Advanced Conversations - Part 18",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "319",
                    "title": "Day 319: Advanced Conversations - Part 19",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "320",
                    "title": "Day 320: Advanced Conversations - Part 20",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "321",
                    "title": "Day 321: Advanced Conversations - Part 21",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "322",
                    "title": "Day 322: Advanced Conversations - Part 22",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "323",
                    "title": "Day 323: Advanced Conversations - Part 23",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "324",
                    "title": "Day 324: Advanced Conversations - Part 24",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "325",
                    "title": "Day 325: Advanced Conversations - Part 25",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "326",
                    "title": "Day 326: Advanced Conversations - Part 26",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "327",
                    "title": "Day 327: Advanced Conversations - Part 27",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "328",
                    "title": "Day 328: Advanced Conversations - Part 28",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "329",
                    "title": "Day 329: Advanced Conversations - Part 29",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "330",
                    "title": "Day 330: Advanced Conversations - Part 30",
                    "description": "Master essential speaking skills in advanced conversations with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "331",
                    "title": "Day 331: Fluency Capstone - Part 1",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "332",
                    "title": "Day 332: Fluency Capstone - Part 2",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "333",
                    "title": "Day 333: Fluency Capstone - Part 3",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "334",
                    "title": "Day 334: Fluency Capstone - Part 4",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "335",
                    "title": "Day 335: Fluency Capstone - Part 5",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "336",
                    "title": "Day 336: Fluency Capstone - Part 6",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "337",
                    "title": "Day 337: Fluency Capstone - Part 7",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "338",
                    "title": "Day 338: Fluency Capstone - Part 8",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "339",
                    "title": "Day 339: Fluency Capstone - Part 9",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "340",
                    "title": "Day 340: Fluency Capstone - Part 10",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "341",
                    "title": "Day 341: Fluency Capstone - Part 11",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "342",
                    "title": "Day 342: Fluency Capstone - Part 12",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "343",
                    "title": "Day 343: Fluency Capstone - Part 13",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "344",
                    "title": "Day 344: Fluency Capstone - Part 14",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "345",
                    "title": "Day 345: Fluency Capstone - Part 15",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "346",
                    "title": "Day 346: Fluency Capstone - Part 16",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "347",
                    "title": "Day 347: Fluency Capstone - Part 17",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "348",
                    "title": "Day 348: Fluency Capstone - Part 18",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "349",
                    "title": "Day 349: Fluency Capstone - Part 19",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "350",
                    "title": "Day 350: Fluency Capstone - Part 20",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "351",
                    "title": "Day 351: Fluency Capstone - Part 21",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "352",
                    "title": "Day 352: Fluency Capstone - Part 22",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "353",
                    "title": "Day 353: Fluency Capstone - Part 23",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "354",
                    "title": "Day 354: Fluency Capstone - Part 24",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "355",
                    "title": "Day 355: Fluency Capstone - Part 25",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "356",
                    "title": "Day 356: Fluency Capstone - Part 26",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "357",
                    "title": "Day 357: Fluency Capstone - Part 27",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "358",
                    "title": "Day 358: Fluency Capstone - Part 28",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "359",
                    "title": "Day 359: Fluency Capstone - Part 29",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "360",
                    "title": "Day 360: Fluency Capstone - Part 30",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "361",
                    "title": "Day 361: Fluency Capstone - Part 31",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "362",
                    "title": "Day 362: Fluency Capstone - Part 32",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "363",
                    "title": "Day 363: Fluency Capstone - Part 33",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "364",
                    "title": "Day 364: Fluency Capstone - Part 34",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "365",
                    "title": "Day 365: Fluency Capstone - Part 35",
                    "description": "Master essential speaking skills in fluency capstone with Monday.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          }
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
