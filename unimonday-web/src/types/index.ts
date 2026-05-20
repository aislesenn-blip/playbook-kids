
export type UserRole = 'child' | 'teen' | 'adult';
export type Language = 'English' | 'Spanish' | 'French' | 'Chinese' | 'German' | 'Swahili';
export type Level = 'Starter' | 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced';
export type SubscriptionTier = 'Lite' | 'X' | 'Pro';

export interface UserProfile {
    id: string;
    name: string;
    role: UserRole;
    nativeLanguage: Language;
    targetLanguage: Language;
    level: Level;
    subscriptionTier: SubscriptionTier;
    parentEmail?: string; // For Detailed Reports
    avatar?: string;
    streak: number;
    points: number;
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
