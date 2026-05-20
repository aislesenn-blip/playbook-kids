
export type UserRole = 'child' | 'teen' | 'adult';
export type Language = 'English' | 'Spanish' | 'French' | 'Chinese' | 'German' | 'Swahili';
export type Level = 'Starter' | 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced';

export interface UserProfile {
    id: string;
    name: string;
    role: UserRole;
    targetLanguage: Language;
    level: Level;
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
