export type ThemeMode = 'wood' | 'cyber' | 'emerald' | 'marble';
export type Language = 'fa' | 'en';

export interface GameStat {
  wins: number;
  losses: number;
  draws: number;
  bestStreak: number;
  currentStreak: number;
}

export interface MatchRecord {
  id: string;
  game: 'chess' | 'connect4' | 'tictactoe' | 'memory';
  opponent: 'ai_easy' | 'ai_medium' | 'ai_hard' | 'local_p2';
  result: 'win' | 'loss' | 'draw';
  timestamp: number;
}

export interface UserStats {
  chess: GameStat;
  connect4: GameStat;
  tictactoe: GameStat;
  memory: GameStat;
  matches: MatchRecord[];
}

const DEFAULT_STAT: GameStat = {
  wins: 0,
  losses: 0,
  draws: 0,
  bestStreak: 0,
  currentStreak: 0,
};

const DEFAULT_USER_STATS: UserStats = {
  chess: { ...DEFAULT_STAT },
  connect4: { ...DEFAULT_STAT },
  tictactoe: { ...DEFAULT_STAT },
  memory: { ...DEFAULT_STAT },
  matches: [],
};

const STATS_KEY = 'boardgame_arena_stats';
const PREFS_KEY = 'boardgame_arena_prefs';

export function getStoredStats(): UserStats {
  if (typeof window === 'undefined') return DEFAULT_USER_STATS;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return DEFAULT_USER_STATS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USER_STATS;
  }
}

export function saveMatchResult(
  game: 'chess' | 'connect4' | 'tictactoe' | 'memory',
  result: 'win' | 'loss' | 'draw',
  opponent: 'ai_easy' | 'ai_medium' | 'ai_hard' | 'local_p2'
) {
  if (typeof window === 'undefined') return;
  const current = getStoredStats();

  const stat = current[game] || { ...DEFAULT_STAT };
  if (result === 'win') {
    stat.wins += 1;
    stat.currentStreak += 1;
    if (stat.currentStreak > stat.bestStreak) {
      stat.bestStreak = stat.currentStreak;
    }
  } else if (result === 'loss') {
    stat.losses += 1;
    stat.currentStreak = 0;
  } else {
    stat.draws += 1;
  }

  const match: MatchRecord = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
    game,
    opponent,
    result,
    timestamp: Date.now(),
  };

  current[game] = stat;
  current.matches = [match, ...current.matches.slice(0, 49)]; // Keep last 50 matches

  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save stats', e);
  }
}

export interface UserPreferences {
  theme: ThemeMode;
  lang: Language;
  muted: boolean;
}

const DEFAULT_PREFS: UserPreferences = {
  theme: 'cyber',
  lang: 'fa',
  muted: false,
};

export function getStoredPrefs(): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePrefs(prefs: Partial<UserPreferences>) {
  if (typeof window === 'undefined') return;
  const current = getStoredPrefs();
  const updated = { ...current, ...prefs };
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save prefs', e);
  }
}
