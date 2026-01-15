export type StreakStatus = 'active' | 'frozen' | 'broken' | 'new';

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  lastActivityDate: Date;
  freezeUsed: number;
  freezeAvailable: number;
  freezeExpiresAt?: Date;
  status: StreakStatus;
}

export interface StreakFreeze {
  id: string;
  usedAt: Date;
  expiresAt: Date;
  duration: number;
}

export const STREAK_CONFIG = {
  baseFreezesPerMonth: 1,
  freezeDurationHours: 24,
  freezeGracePeriodHours: 6,
  minActivityForStreak: 1,
  levelBonusFreezes: {
    5: 1,
    10: 2,
    15: 3,
    20: 4,
    25: 5,
    30: 6
  },
  freezeCooldownDays: 7,
  streakMilestones: [7, 14, 30, 50, 100, 200, 365]
};

export function calculateStreakStatus(
  lastActivityDate: Date | null,
  currentStreak: number,
  hasActiveFreeze: boolean
): StreakStatus {
  if (lastActivityDate === null) {
    return 'new';
  }
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastActivity = new Date(
    lastActivityDate.getFullYear(),
    lastActivityDate.getMonth(),
    lastActivityDate.getDate()
  );
  
  const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 0) {
    return hasActiveFreeze ? 'frozen' : 'active';
  }
  
  if (daysDiff === 1) {
    return hasActiveFreeze ? 'frozen' : 'active';
  }
  
  if (hasActiveFreeze) {
    return 'frozen';
  }
  
  return 'broken';
}

export function canUseFreeze(
  streakData: StreakData,
  userLevel: number
): boolean {
  if (streakData.freezeExpiresAt && new Date() < streakData.freezeExpiresAt) {
    return false;
  }
  
  const levelBonus = STREAK_CONFIG.levelBonusFreezes[userLevel as keyof typeof STREAK_CONFIG.levelBonusFreezes] || 0;
  const totalAvailable = STREAK_CONFIG.baseFreezesPerMonth + levelBonus;
  const usedThisMonth = countFreezesThisMonth(streakData.freezeUsed);
  
  return usedThisMonth < totalAvailable;
}

export function useStreakFreeze(streakData: StreakData): StreakData {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + STREAK_CONFIG.freezeDurationHours * 60 * 60 * 1000);
  
  return {
    ...streakData,
    status: 'frozen',
    freezeUsed: streakData.freezeUsed + 1,
    freezeExpiresAt: expiresAt
  };
}

export function countFreezesThisMonth(freezeUsed: number): number {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const freezeHistory = getFreezeHistory();
  const thisMonthFreezes = freezeHistory.filter(f => f.usedAt >= monthStart);
  
  return Math.min(freezeUsed, thisMonthFreezes.length + 1);
}

function getFreezeHistory(): StreakFreeze[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('streak_freeze_history');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveFreezeHistory(freezes: StreakFreeze[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('streak_freeze_history', JSON.stringify(freezes));
  } catch (e) {
    console.error('Failed to save freeze history:', e);
  }
}

export function addFreezeToHistory(freeze: StreakFreeze): void {
  const history = getFreezeHistory();
  history.push(freeze);
  saveFreezeHistory(history);
}

export function getNextFreezeReset(): Date {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return nextMonth;
}

export function getFreezeAvailability(userLevel: number, freezeUsed: number): {
  available: number;
  total: number;
  resetsIn: string;
} {
  const levelBonus = STREAK_CONFIG.levelBonusFreezes[userLevel as keyof typeof STREAK_CONFIG.levelBonusFreezes] || 0;
  const total = STREAK_CONFIG.baseFreezesPerMonth + levelBonus;
  const used = countFreezesThisMonth(freezeUsed);
  
  const now = new Date();
  const nextReset = getNextFreezeReset();
  const daysUntilReset = Math.ceil((nextReset.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  const resetsIn = daysUntilReset === 1 ? 'zítra' : `za ${daysUntilReset} dní`;
  
  return {
    available: Math.max(0, total - used),
    total,
    resetsIn
  };
}

export function getStreakBonus(streakDays: number): {
  xpMultiplier: number;
  bonusText: string;
} {
  if (streakDays >= 365) {
    return { xpMultiplier: 1.5, bonusText: '🔥 Legendární streak (+50% XP)' };
  }
  if (streakDays >= 100) {
    return { xpMultiplier: 1.35, bonusText: '🔥 Epický streak (+35% XP)' };
  }
  if (streakDays >= 50) {
    return { xpMultiplier: 1.25, bonusText: '🔥 Velký streak (+25% XP)' };
  }
  if (streakDays >= 30) {
    return { xpMultiplier: 1.2, bonusText: '🔥 Měsíční streak (+20% XP)' };
  }
  if (streakDays >= 14) {
    return { xpMultiplier: 1.15, bonusText: '🔥 Dvoutýdenní streak (+15% XP)' };
  }
  if (streakDays >= 7) {
    return { xpMultiplier: 1.1, bonusText: '🔥 Týdenní streak (+10% XP)' };
  }
  return { xpMultiplier: 1.0, bonusText: '' };
}

export function formatStreakDays(days: number): string {
  if (days === 0) return '0';
  if (days === 1) return '1 den';
  if (days < 5) return `${days} dny`;
  return `${days} dní`;
}
