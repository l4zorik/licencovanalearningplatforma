import {
  LifeMission,
  LifeMissionPhase,
  LifeMissionStep,
  LifeMissionTemplate,
  LifeMissionStats,
  LifeMissionStreak,
  PhaseStatus,
  UnlockedAchievement,
  MissionCategory,
} from '@/types/life-missions';
import { MISSION_ACHIEVEMENTS } from '@/data/life-missions/achievements';

export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function cloneTemplate(template: LifeMissionTemplate, enabledCategories?: string[]): LifeMission {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    templateId: template.id,
    title: template.title,
    description: template.description,
    category: template.category,
    icon: template.icon,
    color: template.color,
    phases: template.phases.map((phase, phaseIdx) => ({
      ...phase,
      id: `phase_${generateId()}_${phaseIdx}`,
      steps: phase.steps
        .filter(step => !step.isOptional || !enabledCategories || enabledCategories.includes(step.category || ''))
        .map((step, stepIdx) => ({
          ...step,
          id: `step_${generateId()}_${stepIdx}`,
          isCompleted: false,
          order: stepIdx,
        })),
    })),
    journal: [],
    status: 'active',
    priority: 'medium',
    difficulty: template.difficulty,
    totalXp: template.totalXp,
    completionBonusXp: template.completionBonusXp,
    createdAt: now,
    startedAt: now,
    enabledOptionalCategories: enabledCategories || [],
  };
}

export function createCustomMission(
  title: string,
  description: string,
  category: MissionCategory,
  icon: string,
  color: string
): LifeMission {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    title,
    description,
    category,
    icon,
    color,
    phases: [
      {
        id: `phase_${generateId()}_0`,
        title: 'Fáze 1',
        description: 'První fáze mise',
        steps: [],
        bonusXp: 100,
        order: 0,
        icon: '🎯',
      },
    ],
    journal: [],
    status: 'active',
    priority: 'medium',
    difficulty: 3,
    totalXp: 1000,
    completionBonusXp: 500,
    createdAt: now,
    startedAt: now,
  };
}

export function getPhaseStatus(mission: LifeMission, phaseIndex: number): PhaseStatus {
  const phase = mission.phases[phaseIndex];
  if (!phase) return 'locked';

  const allStepsCompleted = phase.steps.length > 0 && phase.steps.every(s => s.isCompleted);
  if (allStepsCompleted) return 'completed';

  if (phaseIndex === 0) return 'active';

  const prevPhase = mission.phases[phaseIndex - 1];
  const prevCompleted = prevPhase.steps.length > 0 && prevPhase.steps.every(s => s.isCompleted);
  return prevCompleted ? 'active' : 'locked';
}

export function calculateMissionProgress(mission: LifeMission): number {
  const totalSteps = mission.phases.reduce((sum, p) => sum + p.steps.length, 0);
  if (totalSteps === 0) return 0;
  const completedSteps = mission.phases.reduce(
    (sum, p) => sum + p.steps.filter(s => s.isCompleted).length,
    0
  );
  return Math.round((completedSteps / totalSteps) * 100);
}

export function calculatePhaseProgress(phase: LifeMissionPhase): number {
  if (phase.steps.length === 0) return 0;
  const completed = phase.steps.filter(s => s.isCompleted).length;
  return Math.round((completed / phase.steps.length) * 100);
}

export function calculateEarnedXp(mission: LifeMission): number {
  let xp = 0;
  mission.phases.forEach((phase) => {
    phase.steps.forEach((step) => {
      if (step.isCompleted) xp += step.xpReward;
    });
    if (phase.steps.length > 0 && phase.steps.every(s => s.isCompleted)) {
      xp += phase.bonusXp;
    }
  });
  if (mission.status === 'completed') {
    xp += mission.completionBonusXp;
  }
  return xp;
}

export function calculateStats(missions: LifeMission[], streak: LifeMissionStreak, unlockedAchievements: UnlockedAchievement[]): LifeMissionStats {
  const activeMissions = missions.filter(m => m.status === 'active').length;
  const completedMissions = missions.filter(m => m.status === 'completed').length;
  let totalSteps = 0;
  let totalStepsCompleted = 0;
  let totalXpEarned = 0;

  missions.forEach(m => {
    totalXpEarned += calculateEarnedXp(m);
    m.phases.forEach(p => {
      totalSteps += p.steps.length;
      totalStepsCompleted += p.steps.filter(s => s.isCompleted).length;
    });
  });

  // Add XP from achievements
  unlockedAchievements.forEach(ua => {
    const achievement = MISSION_ACHIEVEMENTS.find(a => a.id === ua.achievementId);
    if (achievement) totalXpEarned += achievement.xpReward;
  });

  const overallProgress = totalSteps > 0 ? Math.round((totalStepsCompleted / totalSteps) * 100) : 0;

  return {
    totalMissions: missions.length,
    activeMissions,
    completedMissions,
    totalStepsCompleted,
    totalSteps,
    totalXpEarned,
    overallProgress,
    streak,
    unlockedAchievements,
  };
}

export function updateStreak(streak: LifeMissionStreak): LifeMissionStreak {
  const today = new Date().toISOString().split('T')[0];
  const lastDate = streak.lastActivityDate;

  if (lastDate === today) return streak;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastDate === yesterdayStr) {
    const newStreak = streak.currentStreak + 1;
    return {
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, streak.longestStreak),
      lastActivityDate: today,
    };
  }

  return {
    currentStreak: 1,
    longestStreak: Math.max(1, streak.longestStreak),
    lastActivityDate: today,
  };
}

export function checkAchievements(
  missions: LifeMission[],
  streak: LifeMissionStreak,
  currentUnlocked: UnlockedAchievement[]
): UnlockedAchievement[] {
  const unlockedIds = new Set(currentUnlocked.map(u => u.achievementId));
  const newUnlocked: UnlockedAchievement[] = [...currentUnlocked];
  const now = new Date().toISOString();

  let totalSteps = 0;
  let totalPhases = 0;
  let totalJournal = 0;
  let totalXp = 0;
  const categories = new Set<MissionCategory>();
  const completedMissions = missions.filter(m => m.status === 'completed');

  missions.forEach(m => {
    categories.add(m.category);
    totalXp += calculateEarnedXp(m);
    totalJournal += m.journal.length;
    m.phases.forEach(p => {
      const completedSteps = p.steps.filter(s => s.isCompleted).length;
      totalSteps += completedSteps;
      if (p.steps.length > 0 && completedSteps === p.steps.length) totalPhases++;
    });
  });

  const conditions: Record<string, boolean> = {
    complete_first_step: totalSteps >= 1,
    complete_10_steps: totalSteps >= 10,
    complete_50_steps: totalSteps >= 50,
    complete_100_steps: totalSteps >= 100,
    complete_first_phase: totalPhases >= 1,
    complete_5_phases: totalPhases >= 5,
    complete_first_mission: completedMissions.length >= 1,
    complete_3_missions: completedMissions.length >= 3,
    have_5_active_missions: missions.filter(m => m.status === 'active').length >= 5,
    write_10_journal_entries: totalJournal >= 10,
    write_50_journal_entries: totalJournal >= 50,
    streak_3_days: streak.longestStreak >= 3,
    streak_7_days: streak.longestStreak >= 7,
    streak_30_days: streak.longestStreak >= 30,
    earn_1000_xp: totalXp >= 1000,
    earn_10000_xp: totalXp >= 10000,
    missions_in_3_categories: categories.size >= 3,
    complete_difficulty_5_mission: completedMissions.some(m => m.difficulty >= 5),
  };

  MISSION_ACHIEVEMENTS.forEach(achievement => {
    if (!unlockedIds.has(achievement.id) && conditions[achievement.condition]) {
      newUnlocked.push({ achievementId: achievement.id, unlockedAt: now });
    }
  });

  return newUnlocked;
}

export function isMissionComplete(mission: LifeMission): boolean {
  return mission.phases.every(
    p => p.steps.length > 0 && p.steps.every(s => s.isCompleted)
  );
}

export function getActivePhaseIndex(mission: LifeMission): number {
  for (let i = 0; i < mission.phases.length; i++) {
    const status = getPhaseStatus(mission, i);
    if (status === 'active') return i;
  }
  return mission.phases.length - 1;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
