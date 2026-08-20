export interface DualLanguageText {
  fa: string;
  en: string;
}

export type SkillCategory = 
  | 'problem_solving' // حل مسئله
  | 'strategic_thinking' // تفکر استراتژیک
  | 'collaboration' // همکاری و کار گروهی
  | 'decision_making' // تصمیم‌گیری
  | 'creativity' // خلاقیت
  | 'resource_management' // مدیریت منابع
  | 'negotiation' // مذاکره و چانه‌زنی
  | 'memory_focus'; // تمرکز و حافظه

export interface SkillPotential {
  key: SkillCategory;
  title: DualLanguageText;
  score: number; // 1 to 10
  description: DualLanguageText;
}

export interface GameDesigner {
  name: DualLanguageText;
  bio?: DualLanguageText;
  country: DualLanguageText;
}

export interface UserComment {
  id: string;
  gameId: string;
  userName: string;
  userEmail?: string;
  rating: number; // 1 to 5
  content: string;
  createdAt: string;
  approved: boolean;
}

export interface BoardGame {
  id: string;
  title: DualLanguageText;
  subtitle: DualLanguageText;
  shortDescription: DualLanguageText;
  fullDescription: DualLanguageText;
  rulesOverview: DualLanguageText;
  coverImage: string;
  images: string[];
  designers: GameDesigner[];
  publisher: DualLanguageText;
  releaseYear: number;
  origin: 'iranian' | 'international';
  minPlayers: number;
  maxPlayers: number;
  bestPlayerCount?: number;
  playingTimeMinutes: number;
  minAge: number;
  complexity: number; // 1.0 to 5.0 (BGG scale style)
  rating: number; // 1.0 to 10.0
  categories: DualLanguageText[];
  skills: SkillPotential[];
  availableInIran: boolean;
  bggUrl?: string;
  purchaseUrl?: string;
}
