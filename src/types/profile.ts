import { Achievement } from '@/lib/gamification/achievements';

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  xp: number;
  gold: number;
  gems: number;
  title: string;
  titleColor: string;
  createdAt: Date;
  lastActiveAt: Date;
  stats: UserStats;
  achievements: UserAchievement[];
  badges: UserBadge[];
  streakData: UserStreakData;
  preferences: UserPreferences;
};

export type UserStats = {
  totalXP: number;
  totalGold: number;
  totalAlgorithms: number;
  totalHours: number;
  totalCourses: number;
  totalMilestones: number;
  totalProjects: number;
  completedProjects: number;
  totalJobsAdded: number;
  jobsInInterview: number;
  jobsWithOffer: number;
  skillsUnlocked: number;
  achievementsUnlocked: number;
  questsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  rank: number;
  rankPercentile: number;
};

export type UserAchievement = {
  achievement: Achievement;
  unlockedAt: Date;
  isNew: boolean;
};

export type UserBadge = {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
};

export type UserStreakData = {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  lastActivityDate: Date;
  freezeUsed: number;
  freezeAvailable: number;
  status: 'active' | 'frozen' | 'broken' | 'new';
};

export type UserPreferences = {
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    achievements: boolean;
    quests: boolean;
    streak: boolean;
    levelUp: boolean;
    daily: boolean;
  };
  privacy: {
    showOnLeaderboard: boolean;
    showStats: boolean;
    showAchievements: boolean;
  };
};

export const RANK_TIERS = [
  { name: 'Nováček', minLevel: 1, color: '#78909c' },
  { name: 'Začátečník', minLevel: 3, color: '#4caf50' },
  { name: 'Praktikant', minLevel: 5, color: '#2196f3' },
  { name: 'Specialista', minLevel: 8, color: '#9c27b0' },
  { name: 'Expert', minLevel: 12, color: '#ff9800' },
  { name: 'Master', minLevel: 18, color: '#f44336' },
  { name: 'Grandmaster', minLevel: 25, color: '#ffc107' },
  { name: 'Legend', minLevel: 30, color: '#e91e63' },
];

export function getRankTier(level: number): { name: string; color: string } {
  for (let i = RANK_TIERS.length - 1; i >= 0; i--) {
    if (level >= RANK_TIERS[i].minLevel) {
      return RANK_TIERS[i];
    }
  }
  return RANK_TIERS[0];
}

export function calculateLevelProgress(xp: number, level: number): {
  currentXP: number;
  requiredXP: number;
  percentage: number;
} {
  const thresholds = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000];
  const nextThreshold = thresholds[level] || level * 2000;
  const currentThreshold = thresholds[level - 1] || 0;
  
  const currentXP = xp - currentThreshold;
  const requiredXP = nextThreshold - currentThreshold;
  const percentage = Math.min(100, Math.round((currentXP / requiredXP) * 100));
  
  return { currentXP, requiredXP, percentage };
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `před ${days} ${days === 1 ? 'dnem' : days < 5 ? 'dny' : 'dny'}`;
  if (hours > 0) return `před ${hours} ${hours === 1 ? 'hodinou' : 'hodinami'}`;
  if (minutes > 0) return `před ${minutes} ${minutes === 1 ? 'minutou' : 'minutami'}`;
  return 'právě teď';
}

export function calculateOverallScore(stats: UserStats): number {
  const xpScore = Math.min(100, stats.totalXP / 1000);
  const streakScore = Math.min(100, stats.currentStreak * 2);
  const achievementsScore = Math.min(100, stats.achievementsUnlocked * 3);
  const projectsScore = Math.min(100, stats.completedProjects * 10);
  const learningScore = Math.min(100, stats.totalHours / 5);
  
  return Math.round((xpScore + streakScore + achievementsScore + projectsScore + learningScore) / 5);
}

export function getActivityHeatmapData(stats: UserStats): {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}[] {
  const data: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
  const today = new Date();
  
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const count = Math.floor(Math.random() * (i < 30 ? 10 : 5));
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count >= 8) level = 4;
    else if (count >= 5) level = 3;
    else if (count >= 3) level = 2;
    else if (count >= 1) level = 1;
    
    data.push({ date: dateStr, count, level });
  }
  
  return data;
}
