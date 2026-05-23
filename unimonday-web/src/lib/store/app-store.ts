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
                    "title": "The First Hello",
                    "description": "Practice saying hello and introducing yourself naturally to Monday.",
                    "isLocked": false,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "2",
                    "title": "How Are You Today?",
                    "description": "Learn to express simple feelings and ask how Monday is doing.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "3",
                    "title": "Saying Goodbye",
                    "description": "Practice closing a conversation warmly and politely.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "4",
                    "title": "Day 4: Greetings",
                    "description": "Explore saying hello naturally in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "5",
                    "title": "Day 5: Family Members",
                    "description": "Practice introducing people you love in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "6",
                    "title": "Day 6: Numbers 1-10",
                    "description": "Practice introducing people you love in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "7",
                    "title": "Day 7: Basic Feelings",
                    "description": "Discover expressing basic emotions in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "8",
                    "title": "Day 8: Greetings",
                    "description": "Master identifying colors around you in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "9",
                    "title": "Day 9: Colors",
                    "description": "Learn expressing basic emotions in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "10",
                    "title": "Day 10: Numbers 1-10",
                    "description": "Learn introducing people you love in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "11",
                    "title": "Day 11: Family Members",
                    "description": "Learn expressing basic emotions in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "12",
                    "title": "Day 12: Numbers 1-10",
                    "description": "Practice introducing people you love in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "13",
                    "title": "Day 13: Basic Feelings",
                    "description": "Explore identifying colors around you in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "14",
                    "title": "Day 14: Colors",
                    "description": "Practice counting with confidence in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "15",
                    "title": "Day 15: Greetings",
                    "description": "Explore introducing people you love in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "16",
                    "title": "Day 16: Family Members",
                    "description": "Master introducing people you love in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "17",
                    "title": "Day 17: Numbers 1-10",
                    "description": "Discover saying hello naturally in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "18",
                    "title": "Day 18: Family Members",
                    "description": "Practice expressing basic emotions in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "19",
                    "title": "Day 19: Family Members",
                    "description": "Explore saying hello naturally in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "20",
                    "title": "Day 20: Colors",
                    "description": "Discover expressing basic emotions in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "21",
                    "title": "Day 21: Greetings",
                    "description": "Learn introducing people you love in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "22",
                    "title": "Day 22: Family Members",
                    "description": "Learn saying hello naturally in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "23",
                    "title": "Day 23: Family Members",
                    "description": "Learn identifying colors around you in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "24",
                    "title": "Day 24: Basic Feelings",
                    "description": "Learn counting with confidence in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "25",
                    "title": "Day 25: Family Members",
                    "description": "Explore identifying colors around you in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "26",
                    "title": "Day 26: Numbers 1-10",
                    "description": "Learn introducing people you love in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "27",
                    "title": "Day 27: Basic Feelings",
                    "description": "Explore identifying colors around you in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "28",
                    "title": "Day 28: Greetings",
                    "description": "Learn saying hello naturally in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "29",
                    "title": "Day 29: Greetings",
                    "description": "Explore identifying colors around you in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "30",
                    "title": "Day 30: Family Members",
                    "description": "Explore saying hello naturally in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "31",
                    "title": "Day 31: Meals",
                    "description": "Practice talking about breakfast in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "32",
                    "title": "Day 32: Meals",
                    "description": "Describe sharing what you do at home in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "33",
                    "title": "Day 33: Chores",
                    "description": "Learn talking about breakfast in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "34",
                    "title": "Day 34: Morning Routine",
                    "description": "Learn explaining your morning habits in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "35",
                    "title": "Day 35: Chores",
                    "description": "Identify naming things in your room in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "36",
                    "title": "Day 36: Chores",
                    "description": "Practice sharing what you do at home in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "37",
                    "title": "Day 37: Meals",
                    "description": "Talk about sharing what you do at home in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "38",
                    "title": "Day 38: Meals",
                    "description": "Describe asking where things are in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "39",
                    "title": "Day 39: Rooms in the House",
                    "description": "Talk about naming things in your room in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "40",
                    "title": "Day 40: Morning Routine",
                    "description": "Practice talking about breakfast in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "41",
                    "title": "Day 41: Furniture",
                    "description": "Identify explaining your morning habits in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "42",
                    "title": "Day 42: Chores",
                    "description": "Describe explaining your morning habits in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "43",
                    "title": "Day 43: Morning Routine",
                    "description": "Talk about naming things in your room in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "44",
                    "title": "Day 44: Furniture",
                    "description": "Practice talking about breakfast in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "45",
                    "title": "Day 45: Furniture",
                    "description": "Practice asking where things are in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "46",
                    "title": "Day 46: Rooms in the House",
                    "description": "Describe sharing what you do at home in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "47",
                    "title": "Day 47: Morning Routine",
                    "description": "Identify talking about breakfast in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "48",
                    "title": "Day 48: Rooms in the House",
                    "description": "Identify sharing what you do at home in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "49",
                    "title": "Day 49: Meals",
                    "description": "Learn explaining your morning habits in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "50",
                    "title": "Day 50: Meals",
                    "description": "Identify asking where things are in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "51",
                    "title": "Day 51: Furniture",
                    "description": "Describe asking where things are in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "52",
                    "title": "Day 52: Morning Routine",
                    "description": "Talk about asking where things are in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "53",
                    "title": "Day 53: Rooms in the House",
                    "description": "Learn explaining your morning habits in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "54",
                    "title": "Day 54: Morning Routine",
                    "description": "Learn explaining your morning habits in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "55",
                    "title": "Day 55: Rooms in the House",
                    "description": "Identify sharing what you do at home in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "56",
                    "title": "Day 56: Morning Routine",
                    "description": "Talk about explaining your morning habits in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "57",
                    "title": "Day 57: Meals",
                    "description": "Identify talking about breakfast in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "58",
                    "title": "Day 58: Furniture",
                    "description": "Identify naming things in your room in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "59",
                    "title": "Day 59: Furniture",
                    "description": "Learn talking about breakfast in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "60",
                    "title": "Day 60: Chores",
                    "description": "Practice naming things in your room in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "61",
                    "title": "Day 61: Sadness",
                    "description": "Talk about asking for food when hungry in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "62",
                    "title": "Day 62: Happiness",
                    "description": "Talk about using emotion words accurately in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "63",
                    "title": "Day 63: Happiness",
                    "description": "Explain telling someone you are tired in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "64",
                    "title": "Day 64: Sadness",
                    "description": "Explain saying why you are happy in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "65",
                    "title": "Day 65: Tiredness",
                    "description": "Explain telling someone you are tired in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "66",
                    "title": "Day 66: Sadness",
                    "description": "Communicate checking how a friend feels in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "67",
                    "title": "Day 67: Happiness",
                    "description": "Talk about asking for food when hungry in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "68",
                    "title": "Day 68: Sadness",
                    "description": "Share using emotion words accurately in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "69",
                    "title": "Day 69: Excitement",
                    "description": "Explain checking how a friend feels in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "70",
                    "title": "Day 70: Sadness",
                    "description": "Communicate using emotion words accurately in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "71",
                    "title": "Day 71: Happiness",
                    "description": "Share asking for food when hungry in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "72",
                    "title": "Day 72: Happiness",
                    "description": "Communicate saying why you are happy in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "73",
                    "title": "Day 73: Happiness",
                    "description": "Talk about asking for food when hungry in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "74",
                    "title": "Day 74: Excitement",
                    "description": "Express checking how a friend feels in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "75",
                    "title": "Day 75: Sadness",
                    "description": "Explain telling someone you are tired in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "76",
                    "title": "Day 76: Hunger & Thirst",
                    "description": "Talk about using emotion words accurately in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "77",
                    "title": "Day 77: Sadness",
                    "description": "Communicate using emotion words accurately in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "78",
                    "title": "Day 78: Hunger & Thirst",
                    "description": "Explain asking for food when hungry in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "79",
                    "title": "Day 79: Tiredness",
                    "description": "Communicate saying why you are happy in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "80",
                    "title": "Day 80: Happiness",
                    "description": "Communicate saying why you are happy in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "81",
                    "title": "Day 81: Excitement",
                    "description": "Express saying why you are happy in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "82",
                    "title": "Day 82: Happiness",
                    "description": "Communicate asking for food when hungry in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "83",
                    "title": "Day 83: Tiredness",
                    "description": "Communicate asking for food when hungry in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "84",
                    "title": "Day 84: Excitement",
                    "description": "Share telling someone you are tired in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "85",
                    "title": "Day 85: Tiredness",
                    "description": "Share asking for food when hungry in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "86",
                    "title": "Day 86: Happiness",
                    "description": "Talk about asking for food when hungry in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "87",
                    "title": "Day 87: Tiredness",
                    "description": "Explain using emotion words accurately in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "88",
                    "title": "Day 88: Hunger & Thirst",
                    "description": "Communicate asking for food when hungry in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "89",
                    "title": "Day 89: Excitement",
                    "description": "Communicate using emotion words accurately in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "90",
                    "title": "Day 90: Happiness",
                    "description": "Express using emotion words accurately in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "91",
                    "title": "Day 91: Drinks",
                    "description": "Request asking for your favorite fruit in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "92",
                    "title": "Day 92: Drinks",
                    "description": "Roleplay explaining what you do not like in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "93",
                    "title": "Day 93: Likes & Dislikes",
                    "description": "Roleplay describing tastes in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "94",
                    "title": "Day 94: Fruits & Veggies",
                    "description": "Discuss describing tastes in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "95",
                    "title": "Day 95: Table Manners",
                    "description": "Order using please and thank you at the table in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "96",
                    "title": "Day 96: Drinks",
                    "description": "Roleplay politely ordering a meal in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "97",
                    "title": "Day 97: Likes & Dislikes",
                    "description": "Discuss using please and thank you at the table in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "98",
                    "title": "Day 98: Ordering Food",
                    "description": "Describe explaining what you do not like in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "99",
                    "title": "Day 99: Table Manners",
                    "description": "Request using please and thank you at the table in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "100",
                    "title": "Day 100: Likes & Dislikes",
                    "description": "Discuss asking for your favorite fruit in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "101",
                    "title": "Day 101: Ordering Food",
                    "description": "Discuss politely ordering a meal in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "102",
                    "title": "Day 102: Table Manners",
                    "description": "Describe explaining what you do not like in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "103",
                    "title": "Day 103: Likes & Dislikes",
                    "description": "Order asking for your favorite fruit in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "104",
                    "title": "Day 104: Likes & Dislikes",
                    "description": "Discuss describing tastes in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "105",
                    "title": "Day 105: Likes & Dislikes",
                    "description": "Roleplay using please and thank you at the table in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "106",
                    "title": "Day 106: Likes & Dislikes",
                    "description": "Roleplay using please and thank you at the table in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "107",
                    "title": "Day 107: Fruits & Veggies",
                    "description": "Request explaining what you do not like in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "108",
                    "title": "Day 108: Fruits & Veggies",
                    "description": "Request using please and thank you at the table in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "109",
                    "title": "Day 109: Table Manners",
                    "description": "Describe explaining what you do not like in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "110",
                    "title": "Day 110: Likes & Dislikes",
                    "description": "Order asking for your favorite fruit in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "111",
                    "title": "Day 111: Table Manners",
                    "description": "Order asking for your favorite fruit in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "112",
                    "title": "Day 112: Table Manners",
                    "description": "Describe using please and thank you at the table in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "113",
                    "title": "Day 113: Ordering Food",
                    "description": "Request asking for your favorite fruit in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "114",
                    "title": "Day 114: Ordering Food",
                    "description": "Request describing tastes in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "115",
                    "title": "Day 115: Likes & Dislikes",
                    "description": "Order using please and thank you at the table in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "116",
                    "title": "Day 116: Ordering Food",
                    "description": "Order using please and thank you at the table in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "117",
                    "title": "Day 117: Ordering Food",
                    "description": "Discuss asking for your favorite fruit in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "118",
                    "title": "Day 118: Table Manners",
                    "description": "Discuss using please and thank you at the table in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "119",
                    "title": "Day 119: Table Manners",
                    "description": "Discuss using please and thank you at the table in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "120",
                    "title": "Day 120: Fruits & Veggies",
                    "description": "Roleplay explaining what you do not like in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "121",
                    "title": "Day 121: Inviting Friends",
                    "description": "Navigate saying sorry naturally in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "122",
                    "title": "Day 122: Apologizing",
                    "description": "Learn asking a friend to play in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "123",
                    "title": "Day 123: Playing Games",
                    "description": "Learn being polite during playtime in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "124",
                    "title": "Day 124: Apologizing",
                    "description": "Navigate sharing items fairly in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "125",
                    "title": "Day 125: Taking Turns",
                    "description": "Practice explaining rules of a game in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "126",
                    "title": "Day 126: Taking Turns",
                    "description": "Roleplay saying sorry naturally in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "127",
                    "title": "Day 127: Apologizing",
                    "description": "Learn saying sorry naturally in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "128",
                    "title": "Day 128: Taking Turns",
                    "description": "Roleplay saying sorry naturally in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "129",
                    "title": "Day 129: Playing Games",
                    "description": "Navigate asking a friend to play in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "130",
                    "title": "Day 130: Taking Turns",
                    "description": "Navigate saying sorry naturally in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "131",
                    "title": "Day 131: Playing Games",
                    "description": "Navigate saying sorry naturally in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "132",
                    "title": "Day 132: Playing Games",
                    "description": "Practice saying sorry naturally in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "133",
                    "title": "Day 133: Apologizing",
                    "description": "Learn saying sorry naturally in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "134",
                    "title": "Day 134: Apologizing",
                    "description": "Learn asking a friend to play in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "135",
                    "title": "Day 135: Playing Games",
                    "description": "Roleplay asking a friend to play in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "136",
                    "title": "Day 136: Playing Games",
                    "description": "Manage sharing items fairly in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "137",
                    "title": "Day 137: Taking Turns",
                    "description": "Roleplay being polite during playtime in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "138",
                    "title": "Day 138: Inviting Friends",
                    "description": "Navigate explaining rules of a game in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "139",
                    "title": "Day 139: Sharing Toys",
                    "description": "Manage sharing items fairly in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "140",
                    "title": "Day 140: Taking Turns",
                    "description": "Manage saying sorry naturally in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "141",
                    "title": "Day 141: Inviting Friends",
                    "description": "Learn being polite during playtime in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "142",
                    "title": "Day 142: Inviting Friends",
                    "description": "Roleplay being polite during playtime in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "143",
                    "title": "Day 143: Taking Turns",
                    "description": "Manage sharing items fairly in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "144",
                    "title": "Day 144: Playing Games",
                    "description": "Roleplay saying sorry naturally in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "145",
                    "title": "Day 145: Taking Turns",
                    "description": "Manage sharing items fairly in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "146",
                    "title": "Day 146: Apologizing",
                    "description": "Learn asking a friend to play in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "147",
                    "title": "Day 147: Inviting Friends",
                    "description": "Learn saying sorry naturally in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "148",
                    "title": "Day 148: Inviting Friends",
                    "description": "Practice sharing items fairly in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "149",
                    "title": "Day 149: Inviting Friends",
                    "description": "Roleplay explaining rules of a game in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "150",
                    "title": "Day 150: Playing Games",
                    "description": "Practice saying sorry naturally in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "151",
                    "title": "Day 151: Classroom Objects",
                    "description": "Understand asking a teacher for assistance in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "152",
                    "title": "Day 152: Classroom Objects",
                    "description": "Master describing recess games in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "153",
                    "title": "Day 153: Classroom Objects",
                    "description": "Master describing recess games in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "154",
                    "title": "Day 154: Classroom Objects",
                    "description": "Understand describing recess games in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "155",
                    "title": "Day 155: Recess",
                    "description": "Request describing recess games in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "156",
                    "title": "Day 156: Asking for Help",
                    "description": "Request describing recess games in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "157",
                    "title": "Day 157: Subjects",
                    "description": "Identify asking a teacher for assistance in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "158",
                    "title": "Day 158: Subjects",
                    "description": "Master describing recess games in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "159",
                    "title": "Day 159: Asking for Help",
                    "description": "Identify talking about your favorite class in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "160",
                    "title": "Day 160: Recess",
                    "description": "Identify describing recess games in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "161",
                    "title": "Day 161: Classroom Objects",
                    "description": "Identify asking a teacher for assistance in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "162",
                    "title": "Day 162: Asking for Help",
                    "description": "Master asking a teacher for assistance in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "163",
                    "title": "Day 163: Asking for Help",
                    "description": "Practice describing recess games in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "164",
                    "title": "Day 164: Recess",
                    "description": "Practice following simple directions in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "165",
                    "title": "Day 165: Recess",
                    "description": "Practice naming things on your desk in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "166",
                    "title": "Day 166: Classroom Objects",
                    "description": "Master describing recess games in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "167",
                    "title": "Day 167: Classroom Objects",
                    "description": "Practice following simple directions in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "168",
                    "title": "Day 168: Classroom Objects",
                    "description": "Master naming things on your desk in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "169",
                    "title": "Day 169: Asking for Help",
                    "description": "Master naming things on your desk in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "170",
                    "title": "Day 170: Classroom Objects",
                    "description": "Practice following simple directions in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "171",
                    "title": "Day 171: Classroom Objects",
                    "description": "Identify naming things on your desk in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "172",
                    "title": "Day 172: Subjects",
                    "description": "Practice following simple directions in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "173",
                    "title": "Day 173: Asking for Help",
                    "description": "Request following simple directions in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "174",
                    "title": "Day 174: Recess",
                    "description": "Practice asking a teacher for assistance in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "175",
                    "title": "Day 175: Classroom Objects",
                    "description": "Understand describing recess games in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "176",
                    "title": "Day 176: Asking for Help",
                    "description": "Master describing recess games in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "177",
                    "title": "Day 177: Following Instructions",
                    "description": "Master asking a teacher for assistance in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "178",
                    "title": "Day 178: Asking for Help",
                    "description": "Request naming things on your desk in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "179",
                    "title": "Day 179: Recess",
                    "description": "Master describing recess games in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "180",
                    "title": "Day 180: Subjects",
                    "description": "Practice describing recess games in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "181",
                    "title": "Day 181: Farm Animals",
                    "description": "Discover describing the weather outside in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "182",
                    "title": "Day 182: Farm Animals",
                    "description": "Explore imitating animal sounds and names in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "183",
                    "title": "Day 183: Farm Animals",
                    "description": "Talk about explaining what plants need in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "184",
                    "title": "Day 184: Plants",
                    "description": "Describe talking about animals you like in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "185",
                    "title": "Day 185: Plants",
                    "description": "Describe imitating animal sounds and names in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "186",
                    "title": "Day 186: Wild Animals",
                    "description": "Discover talking about animals you like in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "187",
                    "title": "Day 187: Weather",
                    "description": "Discover naming common pets in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "188",
                    "title": "Day 188: Weather",
                    "description": "Discover talking about animals you like in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "189",
                    "title": "Day 189: Wild Animals",
                    "description": "Discover talking about animals you like in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "190",
                    "title": "Day 190: Weather",
                    "description": "Discover talking about animals you like in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "191",
                    "title": "Day 191: Wild Animals",
                    "description": "Explore talking about animals you like in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "192",
                    "title": "Day 192: Pets",
                    "description": "Describe explaining what plants need in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "193",
                    "title": "Day 193: Wild Animals",
                    "description": "Describe describing the weather outside in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "194",
                    "title": "Day 194: Pets",
                    "description": "Talk about naming common pets in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "195",
                    "title": "Day 195: Pets",
                    "description": "Describe describing the weather outside in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "196",
                    "title": "Day 196: Weather",
                    "description": "Talk about explaining what plants need in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "197",
                    "title": "Day 197: Pets",
                    "description": "Explore imitating animal sounds and names in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "198",
                    "title": "Day 198: Plants",
                    "description": "Explore imitating animal sounds and names in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "199",
                    "title": "Day 199: Farm Animals",
                    "description": "Discover explaining what plants need in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "200",
                    "title": "Day 200: Farm Animals",
                    "description": "Explore naming common pets in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "201",
                    "title": "Day 201: Farm Animals",
                    "description": "Describe imitating animal sounds and names in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "202",
                    "title": "Day 202: Pets",
                    "description": "Describe imitating animal sounds and names in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "203",
                    "title": "Day 203: Plants",
                    "description": "Discover imitating animal sounds and names in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "204",
                    "title": "Day 204: Plants",
                    "description": "Learn imitating animal sounds and names in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "205",
                    "title": "Day 205: Wild Animals",
                    "description": "Describe talking about animals you like in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "206",
                    "title": "Day 206: Farm Animals",
                    "description": "Discover naming common pets in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "207",
                    "title": "Day 207: Weather",
                    "description": "Discover talking about animals you like in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "208",
                    "title": "Day 208: Farm Animals",
                    "description": "Discover explaining what plants need in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "209",
                    "title": "Day 209: Farm Animals",
                    "description": "Talk about explaining what plants need in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "210",
                    "title": "Day 210: Plants",
                    "description": "Explore describing the weather outside in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "211",
                    "title": "Day 211: Packing",
                    "description": "Plan talking about a trip in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "212",
                    "title": "Day 212: Packing",
                    "description": "Describe asking for simple directions in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "213",
                    "title": "Day 213: Packing",
                    "description": "Roleplay listing things in a suitcase in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "214",
                    "title": "Day 214: Airplanes",
                    "description": "Navigate pretending to buy a ticket in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "215",
                    "title": "Day 215: Packing",
                    "description": "Describe listing things in a suitcase in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "216",
                    "title": "Day 216: Packing",
                    "description": "Discuss pretending to buy a ticket in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "217",
                    "title": "Day 217: Going on Vacation",
                    "description": "Plan asking for simple directions in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "218",
                    "title": "Day 218: Airplanes",
                    "description": "Roleplay talking about a trip in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "219",
                    "title": "Day 219: Packing",
                    "description": "Roleplay listing things in a suitcase in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "220",
                    "title": "Day 220: Going on Vacation",
                    "description": "Describe pretending to buy a ticket in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "221",
                    "title": "Day 221: Going on Vacation",
                    "description": "Discuss asking for simple directions in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "222",
                    "title": "Day 222: Airplanes",
                    "description": "Plan talking about a trip in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "223",
                    "title": "Day 223: Directions",
                    "description": "Plan asking for simple directions in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "224",
                    "title": "Day 224: Airplanes",
                    "description": "Roleplay asking for simple directions in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "225",
                    "title": "Day 225: Going on Vacation",
                    "description": "Plan naming vehicles in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "226",
                    "title": "Day 226: Cars & Buses",
                    "description": "Navigate naming vehicles in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "227",
                    "title": "Day 227: Airplanes",
                    "description": "Navigate asking for simple directions in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "228",
                    "title": "Day 228: Directions",
                    "description": "Describe talking about a trip in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "229",
                    "title": "Day 229: Packing",
                    "description": "Plan asking for simple directions in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "230",
                    "title": "Day 230: Packing",
                    "description": "Navigate listing things in a suitcase in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "231",
                    "title": "Day 231: Going on Vacation",
                    "description": "Plan listing things in a suitcase in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "232",
                    "title": "Day 232: Packing",
                    "description": "Discuss listing things in a suitcase in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "233",
                    "title": "Day 233: Going on Vacation",
                    "description": "Discuss pretending to buy a ticket in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "234",
                    "title": "Day 234: Going on Vacation",
                    "description": "Roleplay asking for simple directions in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "235",
                    "title": "Day 235: Going on Vacation",
                    "description": "Discuss listing things in a suitcase in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "236",
                    "title": "Day 236: Going on Vacation",
                    "description": "Describe asking for simple directions in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "237",
                    "title": "Day 237: Cars & Buses",
                    "description": "Navigate naming vehicles in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "238",
                    "title": "Day 238: Going on Vacation",
                    "description": "Discuss listing things in a suitcase in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "239",
                    "title": "Day 239: Airplanes",
                    "description": "Plan asking for simple directions in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "240",
                    "title": "Day 240: Airplanes",
                    "description": "Discuss pretending to buy a ticket in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "241",
                    "title": "Day 241: Months",
                    "description": "Track talking about your favorite season in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "242",
                    "title": "Day 242: Seasons",
                    "description": "Understand naming the day of the week in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "243",
                    "title": "Day 243: Seasons",
                    "description": "Practice naming the day of the week in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "244",
                    "title": "Day 244: Seasons",
                    "description": "Practice planning a schedule in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "245",
                    "title": "Day 245: Holidays",
                    "description": "Track talking about your favorite season in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "246",
                    "title": "Day 246: Holidays",
                    "description": "Practice talking about your favorite season in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "247",
                    "title": "Day 247: Seasons",
                    "description": "Practice naming the day of the week in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "248",
                    "title": "Day 248: Days of the Week",
                    "description": "Discuss talking about your favorite season in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "249",
                    "title": "Day 249: Months",
                    "description": "Discuss planning a schedule in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "250",
                    "title": "Day 250: Holidays",
                    "description": "Learn naming the day of the week in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "251",
                    "title": "Day 251: Months",
                    "description": "Track planning a schedule in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "252",
                    "title": "Day 252: Days of the Week",
                    "description": "Understand naming the day of the week in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "253",
                    "title": "Day 253: Months",
                    "description": "Practice talking about your favorite season in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "254",
                    "title": "Day 254: Telling Time",
                    "description": "Understand discussing holiday traditions in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "255",
                    "title": "Day 255: Telling Time",
                    "description": "Track reading a simple clock in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "256",
                    "title": "Day 256: Holidays",
                    "description": "Understand planning a schedule in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "257",
                    "title": "Day 257: Telling Time",
                    "description": "Learn planning a schedule in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "258",
                    "title": "Day 258: Holidays",
                    "description": "Track naming the day of the week in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "259",
                    "title": "Day 259: Seasons",
                    "description": "Practice reading a simple clock in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "260",
                    "title": "Day 260: Seasons",
                    "description": "Learn talking about your favorite season in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "261",
                    "title": "Day 261: Months",
                    "description": "Learn discussing holiday traditions in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "262",
                    "title": "Day 262: Seasons",
                    "description": "Track reading a simple clock in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "263",
                    "title": "Day 263: Holidays",
                    "description": "Practice discussing holiday traditions in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "264",
                    "title": "Day 264: Days of the Week",
                    "description": "Discuss discussing holiday traditions in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "265",
                    "title": "Day 265: Holidays",
                    "description": "Understand discussing holiday traditions in this interactive vocabulary session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "vocabulary"
          },
          {
                    "id": "266",
                    "title": "Day 266: Holidays",
                    "description": "Understand talking about your favorite season in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "267",
                    "title": "Day 267: Holidays",
                    "description": "Understand discussing holiday traditions in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "268",
                    "title": "Day 268: Months",
                    "description": "Understand discussing holiday traditions in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "269",
                    "title": "Day 269: Seasons",
                    "description": "Discuss discussing holiday traditions in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "270",
                    "title": "Day 270: Holidays",
                    "description": "Discuss discussing holiday traditions in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "271",
                    "title": "Day 271: Making up Stories",
                    "description": "Listen to answering questions about a tale in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "272",
                    "title": "Day 272: Fairy Tales",
                    "description": "Tell talking about space travel in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "273",
                    "title": "Day 273: Superheroes",
                    "description": "Invent describing a hero in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "274",
                    "title": "Day 274: Space",
                    "description": "Invent describing a hero in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "275",
                    "title": "Day 275: Fairy Tales",
                    "description": "Imagine talking about space travel in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "276",
                    "title": "Day 276: Superheroes",
                    "description": "Invent talking about space travel in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "277",
                    "title": "Day 277: Fairy Tales",
                    "description": "Tell talking about space travel in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "278",
                    "title": "Day 278: Space",
                    "description": "Imagine talking about space travel in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "279",
                    "title": "Day 279: Superheroes",
                    "description": "Create retelling a short story in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "280",
                    "title": "Day 280: Space",
                    "description": "Listen to talking about space travel in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "281",
                    "title": "Day 281: Making up Stories",
                    "description": "Invent answering questions about a tale in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "282",
                    "title": "Day 282: Space",
                    "description": "Imagine answering questions about a tale in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "283",
                    "title": "Day 283: Superheroes",
                    "description": "Invent retelling a short story in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "284",
                    "title": "Day 284: Space",
                    "description": "Listen to retelling a short story in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "285",
                    "title": "Day 285: Magic",
                    "description": "Imagine retelling a short story in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "286",
                    "title": "Day 286: Magic",
                    "description": "Imagine describing a hero in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "287",
                    "title": "Day 287: Magic",
                    "description": "Invent answering questions about a tale in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "288",
                    "title": "Day 288: Fairy Tales",
                    "description": "Tell describing a hero in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "289",
                    "title": "Day 289: Fairy Tales",
                    "description": "Listen to retelling a short story in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "290",
                    "title": "Day 290: Making up Stories",
                    "description": "Tell retelling a short story in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "291",
                    "title": "Day 291: Magic",
                    "description": "Invent answering questions about a tale in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "292",
                    "title": "Day 292: Fairy Tales",
                    "description": "Imagine describing a hero in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "293",
                    "title": "Day 293: Superheroes",
                    "description": "Create using descriptive adjectives in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "294",
                    "title": "Day 294: Magic",
                    "description": "Listen to talking about space travel in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "295",
                    "title": "Day 295: Superheroes",
                    "description": "Create describing a hero in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "296",
                    "title": "Day 296: Superheroes",
                    "description": "Tell talking about space travel in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "297",
                    "title": "Day 297: Space",
                    "description": "Imagine answering questions about a tale in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "298",
                    "title": "Day 298: Magic",
                    "description": "Listen to describing a hero in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "299",
                    "title": "Day 299: Magic",
                    "description": "Imagine describing a hero in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "300",
                    "title": "Day 300: Magic",
                    "description": "Imagine describing a hero in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "301",
                    "title": "Day 301: Solving Problems",
                    "description": "Express comparing two objects in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "302",
                    "title": "Day 302: Disagreeing",
                    "description": "Discuss explaining a simple problem in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "303",
                    "title": "Day 303: Comparing Things",
                    "description": "Discuss explaining a simple problem in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "304",
                    "title": "Day 304: Agreeing",
                    "description": "Express explaining a simple problem in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "305",
                    "title": "Day 305: Giving Opinions",
                    "description": "Discuss comparing two objects in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "306",
                    "title": "Day 306: Giving Opinions",
                    "description": "Discuss comparing two objects in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "307",
                    "title": "Day 307: Disagreeing",
                    "description": "Discuss finding a compromise in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "308",
                    "title": "Day 308: Solving Problems",
                    "description": "Debate politely disagreeing in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "309",
                    "title": "Day 309: Agreeing",
                    "description": "Express finding a compromise in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "310",
                    "title": "Day 310: Solving Problems",
                    "description": "Discuss stating why you like something more in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "311",
                    "title": "Day 311: Comparing Things",
                    "description": "Discuss comparing two objects in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "312",
                    "title": "Day 312: Agreeing",
                    "description": "Navigate stating why you like something more in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "313",
                    "title": "Day 313: Giving Opinions",
                    "description": "Express comparing two objects in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "314",
                    "title": "Day 314: Agreeing",
                    "description": "Debate politely disagreeing in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "315",
                    "title": "Day 315: Comparing Things",
                    "description": "Discuss politely disagreeing in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "316",
                    "title": "Day 316: Agreeing",
                    "description": "Express comparing two objects in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "317",
                    "title": "Day 317: Agreeing",
                    "description": "Debate comparing two objects in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "318",
                    "title": "Day 318: Giving Opinions",
                    "description": "Debate stating why you like something more in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "319",
                    "title": "Day 319: Comparing Things",
                    "description": "Express finding a compromise in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "320",
                    "title": "Day 320: Agreeing",
                    "description": "Discuss politely disagreeing in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "321",
                    "title": "Day 321: Agreeing",
                    "description": "Express explaining a simple problem in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "322",
                    "title": "Day 322: Giving Opinions",
                    "description": "Manage politely disagreeing in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "323",
                    "title": "Day 323: Giving Opinions",
                    "description": "Discuss explaining a simple problem in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "324",
                    "title": "Day 324: Agreeing",
                    "description": "Discuss finding a compromise in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "325",
                    "title": "Day 325: Agreeing",
                    "description": "Debate politely disagreeing in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "326",
                    "title": "Day 326: Disagreeing",
                    "description": "Discuss explaining a simple problem in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "327",
                    "title": "Day 327: Giving Opinions",
                    "description": "Manage comparing two objects in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "328",
                    "title": "Day 328: Solving Problems",
                    "description": "Debate politely disagreeing in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "329",
                    "title": "Day 329: Disagreeing",
                    "description": "Navigate politely disagreeing in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "330",
                    "title": "Day 330: Solving Problems",
                    "description": "Discuss finding a compromise in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "331",
                    "title": "Day 331: Final Celebration",
                    "description": "Celebrate holding a 5-minute conversation in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "332",
                    "title": "Day 332: Review: Travel",
                    "description": "Celebrate using full connected sentences in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "333",
                    "title": "Day 333: Final Celebration",
                    "description": "Demonstrate speaking with high confidence in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "334",
                    "title": "Day 334: Review: School",
                    "description": "Demonstrate reviewing everything learned in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "335",
                    "title": "Day 335: Storytelling Masterclass",
                    "description": "Demonstrate speaking with high confidence in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "336",
                    "title": "Day 336: Review: Home",
                    "description": "Master speaking with high confidence in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "337",
                    "title": "Day 337: Storytelling Masterclass",
                    "description": "Demonstrate switching topics naturally in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "338",
                    "title": "Day 338: Review: Home",
                    "description": "Celebrate reviewing everything learned in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "339",
                    "title": "Day 339: Storytelling Masterclass",
                    "description": "Combine switching topics naturally in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "340",
                    "title": "Day 340: Storytelling Masterclass",
                    "description": "Celebrate speaking with high confidence in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "341",
                    "title": "Day 341: Final Celebration",
                    "description": "Combine reviewing everything learned in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "342",
                    "title": "Day 342: Review: Travel",
                    "description": "Showcase holding a 5-minute conversation in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "343",
                    "title": "Day 343: Review: Travel",
                    "description": "Showcase holding a 5-minute conversation in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "344",
                    "title": "Day 344: Review: Home",
                    "description": "Celebrate reviewing everything learned in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "345",
                    "title": "Day 345: Storytelling Masterclass",
                    "description": "Master using full connected sentences in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "346",
                    "title": "Day 346: Review: Home",
                    "description": "Demonstrate switching topics naturally in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "347",
                    "title": "Day 347: Review: Travel",
                    "description": "Showcase speaking with high confidence in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "348",
                    "title": "Day 348: Storytelling Masterclass",
                    "description": "Master reviewing everything learned in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "349",
                    "title": "Day 349: Final Celebration",
                    "description": "Combine switching topics naturally in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "350",
                    "title": "Day 350: Review: Travel",
                    "description": "Showcase using full connected sentences in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "351",
                    "title": "Day 351: Storytelling Masterclass",
                    "description": "Showcase reviewing everything learned in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "352",
                    "title": "Day 352: Final Celebration",
                    "description": "Master using full connected sentences in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "353",
                    "title": "Day 353: Storytelling Masterclass",
                    "description": "Showcase using full connected sentences in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "354",
                    "title": "Day 354: Review: Travel",
                    "description": "Celebrate reviewing everything learned in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "355",
                    "title": "Day 355: Review: Travel",
                    "description": "Master using full connected sentences in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "356",
                    "title": "Day 356: Review: School",
                    "description": "Combine switching topics naturally in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "357",
                    "title": "Day 357: Storytelling Masterclass",
                    "description": "Showcase using full connected sentences in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "358",
                    "title": "Day 358: Storytelling Masterclass",
                    "description": "Master speaking with high confidence in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "359",
                    "title": "Day 359: Storytelling Masterclass",
                    "description": "Demonstrate using full connected sentences in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "360",
                    "title": "Day 360: Final Celebration",
                    "description": "Combine switching topics naturally in this interactive challenge session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "challenge"
          },
          {
                    "id": "361",
                    "title": "Day 361: Review: Travel",
                    "description": "Demonstrate speaking with high confidence in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
          },
          {
                    "id": "362",
                    "title": "Day 362: Review: School",
                    "description": "Master holding a 5-minute conversation in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "363",
                    "title": "Day 363: Review: Home",
                    "description": "Master holding a 5-minute conversation in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "364",
                    "title": "Day 364: Review: Home",
                    "description": "Combine reviewing everything learned in this interactive roleplay session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "roleplay"
          },
          {
                    "id": "365",
                    "title": "Day 365: Final Celebration",
                    "description": "Combine speaking with high confidence in this interactive story session.",
                    "isLocked": true,
                    "isCompleted": false,
                    "stars": 0,
                    "type": "story"
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
