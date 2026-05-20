export interface Learner {
  id: string;
  name: string;
  age: number;
  level: 'Starter' | 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced';
  targetLanguage: 'English' | 'Spanish' | 'French' | 'Chinese' | 'German' | 'Swahili';
  avatarUrl?: string;
  currentStreak: number;
  totalPoints: number;
  parentId?: string;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  learners: string[]; // Learner IDs
  subscriptionTier: 'Lite' | 'X' | 'Pro';
}

export interface Season {
  id: string;
  title: string;
  description: string;
  order: number;
  isUnlocked: boolean;
  coverImage?: string;
}

export interface Episode {
  id: string;
  seasonId: string;
  title: string;
  description: string;
  targetVocabulary: string[];
  isCompleted: boolean;
  score?: number;
  order: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai' | 'system';
  content: string;
  timestamp: string;
  audioUrl?: string;
}

export interface ActivityReport {
  id: string;
  learnerId: string;
  date: string;
  minutesSpent: number;
  wordsLearned: number;
  pronunciationScore: number;
  completedEpisodes: string[];
  homeworkStatus: 'Pending' | 'Completed' | 'Not Assigned';
}
