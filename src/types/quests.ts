export type QuestRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type QuestCategory = 
  | 'algorithm'
  | 'learning'
  | 'career'
  | 'social'
  | 'special'
  | 'milestone';

export type QuestStatus = 'available' | 'active' | 'completed' | 'expired' | 'claimed';

export type QuestDifficulty = 1 | 2 | 3 | 4 | 5;

export type DailyQuestTemplate = {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  xpReward: number;
  goldReward: number;
  targetValue: number;
  targetType: string;
  icon: string;
  rarity: QuestRarity;
  prerequisites?: {
    minLevel?: number;
    minStreak?: number;
    completedQuestIds?: string[];
  };
};

export type UserQuest = {
  id: string;
  templateId: string;
  status: QuestStatus;
  currentValue: number;
  targetValue: number;
  startedAt: Date;
  completedAt?: Date;
  claimedAt?: Date;
  expiresAt: Date;
  xpEarned: number;
  goldEarned: number;
};

export type QuestPool = {
  date: string;
  quests: DailyQuestTemplate[];
  bonusQuest?: DailyQuestTemplate;
};

export const QUEST_RARITY_CONFIG: Record<QuestRarity, { color: string; glow: string; dropChance: number }> = {
  common: { color: '#9e9e9e', glow: 'rgba(158, 158, 158, 0.5)', dropChance: 0.5 },
  rare: { color: '#2196f3', glow: 'rgba(33, 150, 243, 0.5)', dropChance: 0.3 },
  epic: { color: '#9c27b0', glow: 'rgba(156, 39, 176, 0.5)', dropChance: 0.15 },
  legendary: { color: '#ff9800', glow: 'rgba(255, 152, 0, 0.5)', dropChance: 0.05 },
};

export const QUEST_CATEGORY_ICONS: Record<QuestCategory, string> = {
  algorithm: '⚡',
  learning: '📚',
  career: '💼',
  social: '👥',
  special: '⭐',
  milestone: '🎯',
};

export const DAILY_QUESTS_COUNT = 4;
export const BONUS_QUEST_CHANCE = 0.25;
export const QUEST_DURATION_HOURS = 24;
export const GRACE_PERIOD_HOURS = 6;
