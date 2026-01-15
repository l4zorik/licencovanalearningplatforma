import { 
  UserQuest, 
  DailyQuestTemplate, 
  QuestStatus, 
  QuestPool,
  QUEST_DURATION_HOURS,
  GRACE_PERIOD_HOURS
} from '@/types/quests';
import { getQuestsForDate, getBonusQuest } from '@/data/quests/daily-quests';

export function generateDailyQuestPool(date: Date = new Date()): QuestPool {
  const dateStr = date.toISOString().split('T')[0];
  const quests = getQuestsForDate(date);
  const bonusQuest = getBonusQuest(date);
  
  return {
    date: dateStr,
    quests,
    bonusQuest: bonusQuest || undefined
  };
}

export function createUserQuest(template: DailyQuestTemplate, date: Date = new Date()): UserQuest {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + QUEST_DURATION_HOURS * 60 * 60 * 1000);
  
  return {
    id: `quest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    templateId: template.id,
    status: 'active',
    currentValue: 0,
    targetValue: template.targetValue,
    startedAt: now,
    expiresAt,
    xpEarned: 0,
    goldEarned: 0
  };
}

export function updateQuestProgress(quest: UserQuest, increment: number): UserQuest {
  if (quest.status !== 'active') return quest;
  
  const newValue = Math.min(quest.currentValue + increment, quest.targetValue);
  const isCompleted = newValue >= quest.targetValue;
  
  return {
    ...quest,
    currentValue: newValue,
    status: isCompleted ? 'completed' : quest.status,
    completedAt: isCompleted ? new Date() : undefined
  };
}

export function canClaimQuest(quest: UserQuest): boolean {
  return quest.status === 'completed' && !quest.claimedAt;
}

export function claimQuestReward(quest: UserQuest, template: DailyQuestTemplate): UserQuest {
  if (!canClaimQuest(quest)) return quest;
  
  return {
    ...quest,
    status: 'claimed',
    claimedAt: new Date(),
    xpEarned: template.xpReward,
    goldEarned: template.goldReward
  };
}

export function isQuestExpired(quest: UserQuest): boolean {
  const now = new Date();
  return now > quest.expiresAt && quest.status !== 'claimed';
}

export function isQuestInGracePeriod(quest: UserQuest): boolean {
  const now = new Date();
  const graceEnd = new Date(quest.expiresAt.getTime() + GRACE_PERIOD_HOURS * 60 * 60 * 1000);
  return now > quest.expiresAt && now <= graceEnd && quest.status !== 'claimed';
}

export function getQuestProgressPercentage(quest: UserQuest): number {
  return Math.min(100, Math.round((quest.currentValue / quest.targetValue) * 100));
}

export function getQuestTimeRemaining(quest: UserQuest): { hours: number; minutes: number; isExpired: boolean } {
  const now = new Date();
  const remaining = quest.expiresAt.getTime() - now.getTime();
  
  if (remaining <= 0) {
    return { hours: 0, minutes: 0, isExpired: true };
  }
  
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  
  return { hours, minutes, isExpired: false };
}

export function getTodayQuests(userQuests: UserQuest[], templates: DailyQuestTemplate[]): {
  active: UserQuest[];
  completed: UserQuest[];
  available: UserQuest[];
} {
  const today = new Date().toISOString().split('T')[0];
  const todayStart = new Date(today);
  const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
  
  const activeQuests = userQuests.filter(q => 
    q.startedAt >= todayStart && 
    q.startedAt < todayEnd && 
    (q.status === 'active' || q.status === 'completed')
  );
  
  const completedQuests = activeQuests.filter(q => q.status === 'completed' || q.status === 'claimed');
  const availableQuests = activeQuests.filter(q => q.status === 'active');
  
  return { active: availableQuests, completed: completedQuests, available: activeQuests };
}

export function calculateDailyQuestProgress(quests: UserQuest[]): {
  total: number;
  completed: number;
  claimed: number;
  xpEarned: number;
  goldEarned: number;
  progress: number;
} {
  const completed = quests.filter(q => q.status === 'completed' || q.status === 'claimed').length;
  const claimed = quests.filter(q => q.status === 'claimed').length;
  const xpEarned = quests.reduce((sum, q) => sum + q.xpEarned, 0);
  const goldEarned = quests.reduce((sum, q) => sum + q.goldEarned, 0);
  
  return {
    total: quests.length,
    completed,
    claimed,
    xpEarned,
    goldEarned,
    progress: quests.length > 0 ? Math.round((completed / quests.length) * 100) : 0
  };
}
