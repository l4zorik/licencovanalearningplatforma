import { LifeCategory } from './life';

export type MissionStatus = 'active' | 'completed' | 'paused' | 'abandoned';
export type MissionPriority = 'low' | 'medium' | 'high' | 'critical';
export type StepType = 'action' | 'research' | 'financial' | 'social' | 'decision' | 'milestone';
export type PhaseStatus = 'locked' | 'active' | 'completed';
export type JournalMood = 'great' | 'good' | 'neutral' | 'bad' | 'terrible';

export type MissionCategory = LifeCategory | 'health' | 'travel';

export interface LifeMissionStep {
  id: string;
  title: string;
  description: string;
  type: StepType;
  isCompleted: boolean;
  completedAt?: string;
  xpReward: number;
  estimatedDays?: number;
  resources?: string[];
  notes?: string;
  dueDate?: string;
  order: number;
  isOptional?: boolean;
  category?: string;
}

export interface LifeMissionPhase {
  id: string;
  title: string;
  description: string;
  steps: LifeMissionStep[];
  bonusXp: number;
  order: number;
  icon: string;
}

export interface MissionJournalEntry {
  id: string;
  date: string;
  text: string;
  mood: JournalMood;
}

export interface LifeMission {
  id: string;
  templateId?: string;
  title: string;
  description: string;
  category: MissionCategory;
  icon: string;
  color: string;
  phases: LifeMissionPhase[];
  journal: MissionJournalEntry[];
  status: MissionStatus;
  priority: MissionPriority;
  difficulty: number;
  totalXp: number;
  completionBonusXp: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  targetDate?: string;
  linkedGoalIds?: string[];
  enabledOptionalCategories?: string[];
}

export interface LifeMissionTemplateStep {
  title: string;
  description: string;
  type: StepType;
  xpReward: number;
  estimatedDays?: number;
  isOptional?: boolean;
  category?: string;
}

export interface LifeMissionTemplatePhase {
  title: string;
  description: string;
  icon: string;
  order: number;
  bonusXp: number;
  steps: LifeMissionTemplateStep[];
}

export interface LifeMissionTemplate {
  id: string;
  title: string;
  description: string;
  category: MissionCategory;
  icon: string;
  color: string;
  phases: LifeMissionTemplatePhase[];
  totalXp: number;
  completionBonusXp: number;
  difficulty: number;
  estimatedMonths: number;
}

export interface LifeMissionStreak {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
}

export interface MissionAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
  xpReward: number;
}

export interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: string;
}

export interface LifeMissionStats {
  totalMissions: number;
  activeMissions: number;
  completedMissions: number;
  totalStepsCompleted: number;
  totalSteps: number;
  totalXpEarned: number;
  overallProgress: number;
  streak: LifeMissionStreak;
  unlockedAchievements: UnlockedAchievement[];
}

export const MISSION_CATEGORIES: { key: MissionCategory; label: string; icon: string; color: string }[] = [
  { key: 'property', label: '🏠 Bydlení', icon: '🏠', color: '#795548' },
  { key: 'work', label: '💼 Práce', icon: '💼', color: '#2196F3' },
  { key: 'business', label: '🚀 Podnikání', icon: '🚀', color: '#FF5722' },
  { key: 'investing', label: '💰 Finance', icon: '💰', color: '#009688' },
  { key: 'learning', label: '🎓 Učení', icon: '🎓', color: '#4CAF50' },
  { key: 'health', label: '💪 Zdraví', icon: '💪', color: '#E91E63' },
  { key: 'relationships', label: '💕 Vztahy', icon: '💕', color: '#E91E63' },
  { key: 'psychology', label: '🧠 Psychika', icon: '🧠', color: '#26A69A' },
  { key: 'addiction', label: '🛡️ Závislosti', icon: '🛡️', color: '#F44336' },
  { key: 'future_kids', label: '👨‍👩‍👧 Rodina', icon: '👨‍👩‍👧', color: '#00BCD4' },
  { key: 'travel', label: '✈️ Cestování', icon: '✈️', color: '#03A9F4' },
];

export const STEP_TYPE_CONFIG: Record<StepType, { label: string; icon: string; color: string }> = {
  action: { label: 'Akce', icon: '⚡', color: '#4CAF50' },
  research: { label: 'Výzkum', icon: '🔍', color: '#2196F3' },
  financial: { label: 'Finance', icon: '💰', color: '#FF9800' },
  social: { label: 'Sociální', icon: '👥', color: '#9C27B0' },
  decision: { label: 'Rozhodnutí', icon: '🎯', color: '#F44336' },
  milestone: { label: 'Milník', icon: '🏆', color: '#FFD700' },
};

export const MOOD_CONFIG: Record<JournalMood, { label: string; icon: string; color: string }> = {
  great: { label: 'Skvělý', icon: '😄', color: '#4CAF50' },
  good: { label: 'Dobrý', icon: '🙂', color: '#8BC34A' },
  neutral: { label: 'Neutrální', icon: '😐', color: '#FFC107' },
  bad: { label: 'Špatný', icon: '😟', color: '#FF9800' },
  terrible: { label: 'Hrozný', icon: '😢', color: '#F44336' },
};

export const DIFFICULTY_LABELS: Record<number, string> = {
  1: 'Snadná',
  2: 'Lehká',
  3: 'Střední',
  4: 'Těžká',
  5: 'Extrémní',
};
