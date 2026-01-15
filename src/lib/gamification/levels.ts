export type DifficultyRating = 1 | 2 | 3 | 4 | 5;

export type Level = {
  level: number;
  title: string;
  minXP: number;
  maxXP: number;
  color: string;
  icon: string;
};

export const LEVELS: Level[] = [
  { level: 1, title: "Nováček", minXP: 0, maxXP: 500, color: "#4CAF50", icon: "🌱" },
  { level: 2, title: "Začátečník", minXP: 500, maxXP: 1200, color: "#8BC34A", icon: "🌿" },
  { level: 3, title: "Praktikant", minXP: 1200, maxXP: 2200, color: "#CDDC39", icon: "🌻" },
  { level: 4, title: "Uvědomělý", minXP: 2200, maxXP: 3500, color: "#FFEB3B", icon: "⭐" },
  { level: 5, title: "Rostoucí", minXP: 3500, maxXP: 5000, color: "#FFC107", icon: "🌟" },
  { level: 6, title: "Schopný", minXP: 5000, maxXP: 7000, color: "#FF9800", icon: "💫" },
  { level: 7, title: " Kompetentní", minXP: 7000, maxXP: 9500, color: "#FF5722", icon: "🔥" },
  { level: 8, title: "Zkušený", minXP: 9500, maxXP: 12500, color: "#E91E63", icon: "⚡" },
  { level: 9, title: "Expert", minXP: 12500, maxXP: 16000, color: "#9C27B0", icon: "💎" },
  { level: 10, title: "Profík", minXP: 16000, maxXP: 20000, color: "#673AB7", icon: "👑" },
  { level: 11, title: "Pokročilý", minXP: 20000, maxXP: 25000, color: "#3F51B5", icon: "🎯" },
  { level: 12, title: "Specialista", minXP: 25000, maxXP: 31000, color: "#2196F3", icon: "🏅" },
  { level: 13, title: "Mistr", minXP: 31000, maxXP: 38000, color: "#03A9F4", icon: "🏆" },
  { level: 14, title: "Veterán", minXP: 38000, maxXP: 46000, color: "#00BCD4", icon: "🎖️" },
  { level: 15, title: "Legendární", minXP: 46000, maxXP: 55000, color: "#009688", icon: "🌠" },
  { level: 16, title: "Neohrožený", minXP: 55000, maxXP: 65000, color: "#009688", icon: "💪" },
  { level: 17, title: "Bezhraniční", minXP: 65000, maxXP: 80000, color: "#4CAF50", icon: "🚀" },
  { level: 18, title: "Nezastavitelný", minXP: 80000, maxXP: 100000, color: "#8BC34A", icon: "⚡" },
  { level: 19, title: "Božský", minXP: 100000, maxXP: 130000, color: "#FFD700", icon: "👼" },
  { level: 20, title: "Ultimate", minXP: 130000, maxXP: 999999999, color: "#FF6F00", icon: "🦁" },
];

export const getLevelByXP = (xp: number): Level => {
  return LEVELS.find(l => xp >= l.minXP && xp < l.maxXP) || LEVELS[LEVELS.length - 1];
};

export const getXPToNextLevel = (xp: number): { xpNeeded: number; percentage: number } => {
  const currentLevel = getLevelByXP(xp);
  const xpInLevel = xp - currentLevel.minXP;
  const xpNeeded = currentLevel.maxXP - currentLevel.minXP;
  return {
    xpNeeded: xpNeeded - xpInLevel,
    percentage: Math.round((xpInLevel / xpNeeded) * 100)
  };
};

export const calculateLevelProgress = (xp: number): { level: number; title: string; progress: number; nextLevelXP: number } => {
  const level = getLevelByXP(xp);
  const xpInLevel = xp - level.minXP;
  const xpForNext = level.maxXP - level.minXP;
  return {
    level: level.level,
    title: level.title,
    progress: Math.round((xpInLevel / xpForNext) * 100),
    nextLevelXP: level.maxXP
  };
};

export const formatXP = (xp: number): string => {
  if (xp >= 1000000) return `${(xp / 1000000).toFixed(1)}M`;
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}K`;
  return xp.toString();
};

export const TOTAL_LEVELS = LEVELS.length;
export const MAX_LEVEL = LEVELS[LEVELS.length - 1].level;
export const MAX_XP = LEVELS[LEVELS.length - 1].minXP;
