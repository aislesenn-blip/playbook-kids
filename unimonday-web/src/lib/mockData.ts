import { Learner, Season, Episode, ActivityReport } from '@/types';

export const mockLearner: Learner = {
  id: 'l1',
  name: 'Bertha',
  age: 7,
  level: 'Starter',
  targetLanguage: 'English',
  avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop',
  currentStreak: 5,
  totalPoints: 1250,
  parentId: 'p1'
};

export const mockSeasons: Season[] = [
  {
    id: 's1',
    title: 'Season 1: The Magic House',
    description: 'Learn how to introduce yourself, name your family, and explore the rooms in a house!',
    order: 1,
    isUnlocked: true,
    coverImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 's2',
    title: 'Season 2: Forest Friends',
    description: 'Meet the animals of the magical forest, learn colors, and talk about food.',
    order: 2,
    isUnlocked: false,
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop'
  }
];

export const mockEpisodes: Episode[] = [
  {
    id: 'e1',
    seasonId: 's1',
    title: 'Episode 1: Hello uNiMONDAY!',
    description: 'Meet your new AI companion and learn how to say your name.',
    targetVocabulary: ['Hello', 'My name is', 'Friend'],
    isCompleted: true,
    score: 95,
    order: 1
  },
  {
    id: 'e2',
    seasonId: 's1',
    title: 'Episode 2: The Ringing Telephone',
    description: 'A magical telephone rings! Who is on the other side? Let\'s talk!',
    targetVocabulary: ['Telephone', 'Hello', 'How are you', 'Good'],
    isCompleted: false,
    order: 2
  },
  {
    id: 'e3',
    seasonId: 's1',
    title: 'Episode 3: Family Portrait',
    description: 'Draw a picture of your family and show it to uNiMONDAY.',
    targetVocabulary: ['Mother', 'Father', 'Brother', 'Sister', 'Family'],
    isCompleted: false,
    order: 3
  }
];

export const mockReports: ActivityReport[] = [
  {
    id: 'r1',
    learnerId: 'l1',
    date: new Date().toISOString(),
    minutesSpent: 15,
    wordsLearned: 3,
    pronunciationScore: 92,
    completedEpisodes: ['e1'],
    homeworkStatus: 'Pending'
  }
];
