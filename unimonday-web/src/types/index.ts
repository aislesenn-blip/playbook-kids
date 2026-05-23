export type Language = 'English' | 'Spanish' | 'French' | 'Chinese' | 'German' | 'Swahili' | 'Japanese' | 'Arabic' | 'Italian' | 'Dutch' | 'Portuguese' | 'Swedish' | 'Turkish' | 'Mandarin';
export type Level = 'Starter' | 'Beginner' | 'Elementary' | 'Intermediate';
export type SubscriptionTier = 'Lite' | 'X' | 'Pro';

export type MondayOutfit = 'default' | 'astronaut' | 'safari';

export interface UserProfile {
    id: string;
    name: string;
    nativeLanguage: Language;
    targetLanguage: Language;
    level: Level;
    subscriptionTier: SubscriptionTier;
    parentEmail: string; // Crucial for reports
    avatar?: string;
    streak: number;
    points: number;
    hasCompletedTour: boolean;
    pronunciationAccuracy?: number;
    speakingConfidence?: 'Low' | 'Medium' | 'High';
    vocabRetention?: number;
    currentOutfit?: MondayOutfit;
    unlockedOutfits?: MondayOutfit[];
}

export interface DailyQuest {
    id: string;
    title: string;
    target: number;
    progress: number;
    rewardXP: number;
    isCompleted: boolean;
}

export interface Episode {
    id: string;
    title: string;
    description: string;
    isLocked: boolean;
    isCompleted: boolean;
    stars: number;
    type: 'story' | 'roleplay' | 'vocabulary' | 'challenge';
}

export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
}
