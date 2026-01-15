import { AlgorithmType, Project, ProjectMilestone } from '@/types';

export type XPAction = 
  | 'algorithm_completed'
  | 'algorithm_first_daily'
  | 'milestone_completed'
  | 'project_completed'
  | 'goal_completed'
  | 'streak_bonus'
  | 'combo_bonus'
  | 'quest_completed'
  | 'achievement_earned'
  | 'level_up';

export interface XPCalculation {
  baseXP: number;
  multipliers: {
    levelBonus: number;
    streakBonus: number;
    comboBonus: number;
    difficultyBonus: number;
    firstDailyBonus: number;
  };
  totalXP: number;
  breakdown: string[];
}

export const XP_VALUES = {
  algorithm: {
    learning: 15,
    coding: 25,
    optimization: 30,
    data_analysis: 25,
    research: 20,
    design: 20,
    debugging: 15,
    testing: 20,
    documentation: 10,
    deployment: 35,
    security: 30,
    networking: 25,
    automation: 30,
    monitoring: 15,
  },
  milestone: 100,
  project: 500,
  goal: 2000,
  first_daily_algorithm: 10,
  streak_bonus_multiplier: 0.1,
  combo_threshold: 5,
  combo_bonus_per_item: 0.05,
};

export const calculateAlgorithmXP = (
  algorithmType: AlgorithmType,
  currentLevel: number,
  streakDays: number,
  dailyAlgorithmsCount: number,
  difficulty: 1 | 2 | 3 | 4 | 5 = 3
): XPCalculation => {
  const baseXP = XP_VALUES.algorithm[algorithmType] || 20;
  const breakdown: string[] = [`Základní XP: ${baseXP}`];
  const multipliers = {
    levelBonus: 0,
    streakBonus: 0,
    comboBonus: 0,
    difficultyBonus: 0,
    firstDailyBonus: 0,
  };

  const levelMultipliers: Record<number, number> = {
    1: 1.0, 2: 1.05, 3: 1.1, 4: 1.15, 5: 1.2,
    6: 1.25, 7: 1.3, 8: 1.35, 9: 1.4, 10: 1.5,
    11: 1.55, 12: 1.6, 13: 1.65, 14: 1.7, 15: 1.8,
    16: 1.85, 17: 1.9, 18: 2.0, 19: 2.1, 20: 2.25,
  };
  const levelMultiplier = levelMultipliers[currentLevel] || 1.5;
  const levelBonusXP = Math.round(baseXP * (levelMultiplier - 1));
  multipliers.levelBonus = levelBonusXP;
  breakdown.push(`Level bonus (${levelMultiplier}x): +${levelBonusXP} XP`);

  if (streakDays >= 7) {
    const streakBonus = Math.round(baseXP * 0.1);
    multipliers.streakBonus = streakBonus;
    breakdown.push(`🔥 7+ denní streak: +${streakBonus} XP`);
  }
  if (streakDays >= 30) {
    const streakBonus30 = Math.round(baseXP * 0.25);
    multipliers.streakBonus = streakBonus30;
    breakdown.push(`🔥 30+ denní streak: +${streakBonus30} XP`);
  }

  if (dailyAlgorithmsCount >= XP_VALUES.combo_threshold) {
    const comboCount = Math.min(dailyAlgorithmsCount, 10);
    const comboBonus = Math.round(baseXP * (comboCount - XP_VALUES.combo_threshold + 1) * XP_VALUES.combo_bonus_per_item);
    multipliers.comboBonus = comboBonus;
    breakdown.push(`⚡ Combo (${dailyAlgorithmsCount}): +${comboBonus} XP`);
  }

  const difficultyMultipliers: Record<number, number> = {
    1: 0.7, 2: 0.85, 3: 1.0, 4: 1.2, 5: 1.5
  };
  const difficultyBonus = Math.round(baseXP * (difficultyMultipliers[difficulty] - 1));
  multipliers.difficultyBonus = difficultyBonus;
  breakdown.push(`📊 Obtížnost (${difficulty}x): +${difficultyBonus} XP`);

  if (dailyAlgorithmsCount === 0) {
    const firstBonus = XP_VALUES.first_daily_algorithm;
    multipliers.firstDailyBonus = firstBonus;
    breakdown.push(`🌅 První dnes: +${firstBonus} XP`);
  }

  const totalXP = baseXP + levelBonusXP + multipliers.streakBonus + multipliers.comboBonus + difficultyBonus + multipliers.firstDailyBonus;

  return {
    baseXP,
    multipliers,
    totalXP: Math.round(totalXP),
    breakdown
  };
};

export const calculateMilestoneXP = (
  milestone: ProjectMilestone,
  currentLevel: number,
  projectProgress: number
): number => {
  const baseXP = XP_VALUES.milestone;
  const levelMultiplier = 1 + (currentLevel - 1) * 0.05;
  const progressBonus = projectProgress >= 100 ? 1.5 : projectProgress >= 75 ? 1.25 : 1;
  return Math.round(baseXP * levelMultiplier * progressBonus);
};

export const calculateProjectXP = (
  project: Project,
  completedMilestones: number,
  totalMilestones: number
): number => {
  const baseXP = XP_VALUES.project;
  const completionRate = completedMilestones / totalMilestones;
  const completionBonus = completionRate >= 1 ? 2 : completionRate >= 0.75 ? 1.5 : completionRate >= 0.5 ? 1.25 : 1;
  const algorithmBonus = project.algorithms.length >= 10 ? 1.2 : project.algorithms.length >= 5 ? 1.1 : 1;
  return Math.round(baseXP * completionBonus * algorithmBonus);
};

export const calculateGoalXP = (goalXP: number, completionSpeed: number): number => {
  const speedBonus = completionSpeed <= 30 ? 1.5 : completionSpeed <= 60 ? 1.25 : 1;
  return Math.round(goalXP * speedBonus);
};

export const formatXPGain = (xp: number): string => {
  if (xp >= 1000) return `+${(xp / 1000).toFixed(1)}K XP`;
  return `+${xp} XP`;
};

export const getXPMultiplierExplanation = (multipliers: XPCalculation['multipliers']): string => {
  const parts: string[] = [];
  if (multipliers.levelBonus) parts.push(`Level: +${multipliers.levelBonus}`);
  if (multipliers.streakBonus) parts.push(`Streak: +${multipliers.streakBonus}`);
  if (multipliers.comboBonus) parts.push(`Combo: +${multipliers.comboBonus}`);
  if (multipliers.difficultyBonus) parts.push(`Obtížnost: +${multipliers.difficultyBonus}`);
  if (multipliers.firstDailyBonus) parts.push(`První dnes: +${multipliers.firstDailyBonus}`);
  return parts.join(' | ');
};

export const DAILY_XP_CAP = 5000;
export const WEEKLY_XP_CAP = 30000;

export const getRemainingDailyXP = (todayXP: number): number => {
  return Math.max(0, DAILY_XP_CAP - todayXP);
};

export const isDailyXPCapped = (todayXP: number): boolean => {
  return todayXP >= DAILY_XP_CAP;
};

export interface LevelThreshold {
  level: number;
  xpRequired: number;
  title: string;
  perks: string[];
  color: string;
}

export const LEVEL_THRESHOLDS: LevelThreshold[] = [
  { level: 1, xpRequired: 0, title: 'Nováček', perks: ['Začni svou cestu'], color: '#78909c' },
  { level: 2, xpRequired: 100, title: 'Poutník', perks: ['+10% XP bonus'], color: '#4caf50' },
  { level: 3, xpRequired: 250, title: 'Učeň', perks: ['Přístup k pokročilým kurzům'], color: '#2196f3' },
  { level: 4, xpRequired: 500, title: 'Šedák', perks: ['+15% XP bonus'], color: '#9c27b0' },
  { level: 5, xpRequired: 800, title: 'Vojín', perks: ['Odznak "Růst"'], color: '#ff9800' },
  { level: 6, xpRequired: 1200, title: 'Lvádce', perks: ['+20% XP bonus'], color: '#e91e63' },
  { level: 7, xpRequired: 1700, title: 'Vědec', perks: ['Přístup k expert kurzům'], color: '#00bcd4' },
  { level: 8, xpRequired: 2300, title: 'Mág', perks: ['+25% XP bonus'], color: '#673ab7' },
  { level: 9, xpRequired: 3000, title: 'Alchymista', perks: ['Speciální achievementy'], color: '#ff5722' },
  { level: 10, xpRequired: 4000, title: 'Veterán', perks: ['Odznak "XP Veteran"', '+30% XP bonus'], color: '#ffc107' },
  { level: 15, xpRequired: 12000, title: 'Super hrdina', perks: ['+38% XP bonus'], color: '#f44336' },
  { level: 20, xpRequired: 30000, title: 'Neohrožený', perks: ['Odznak "Neohrožený"', 'VIP status', '+45% XP bonus'], color: '#ffeb3b' },
];

export function calculateLevel(xp: number): { level: number; title: string; color: string; xpForCurrent: number; xpForNext: number; progress: number; perks: string[] } {
  let currentLevel = 1;
  let currentThreshold = LEVEL_THRESHOLDS[0];
  let nextThreshold = LEVEL_THRESHOLDS[1];

  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i].xpRequired) {
      currentLevel = LEVEL_THRESHOLDS[i].level;
      currentThreshold = LEVEL_THRESHOLDS[i];
      if (i < LEVEL_THRESHOLDS.length - 1) {
        nextThreshold = LEVEL_THRESHOLDS[i + 1];
      } else {
        nextThreshold = { ...LEVEL_THRESHOLDS[i], xpRequired: LEVEL_THRESHOLDS[i].xpRequired + 50000 };
      }
    } else {
      break;
    }
  }

  const xpForCurrent = xp - currentThreshold.xpRequired;
  const xpForNext = nextThreshold.xpRequired - currentThreshold.xpRequired;
  const progress = Math.min(100, Math.round((xpForCurrent / xpForNext) * 100));

  return {
    level: currentLevel,
    title: currentThreshold.title,
    color: currentThreshold.color,
    xpForCurrent,
    xpForNext,
    progress,
    perks: currentThreshold.perks
  };
}

export function getXPForAction(action: string): number {
  const xpRates: Record<string, number> = {
    'task_complete': 10,
    'course_complete': 50,
    'mission_complete': 200,
    'skill_unlock': 25,
    'job_applied': 15,
    'interview': 50,
    'offer': 200,
    'streak_bonus': 5,
    'article_read': 5,
    'article_written': 30,
    'lesson_complete': 15,
    'quiz_pass': 10,
    'project_complete': 100,
    'chat_with_akize': 2,
    'daily_login': 5,
    'first_course_module': 10
  };
  return xpRates[action] || 5;
}

export function formatXP(xp: number): string {
  if (xp >= 1000000) {
    return (xp / 1000000).toFixed(1) + 'M';
  }
  if (xp >= 1000) {
    return (xp / 1000).toFixed(1) + 'K';
  }
  return xp.toString();
}

export function getLevelTitle(level: number): string {
  const threshold = LEVEL_THRESHOLDS.find(t => t.level === level);
  return threshold?.title || 'Neznámý';
}

export function getLevelColor(level: number): string {
  const threshold = LEVEL_THRESHOLDS.find(t => t.level === level);
  return threshold?.color || '#78909c';
}

export function getPerksForLevel(level: number): string[] {
  const threshold = LEVEL_THRESHOLDS.find(t => t.level === level);
  return threshold?.perks || [];
}
