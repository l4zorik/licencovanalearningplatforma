export type MilestoneStatus = 'locked' | 'in_progress' | 'completed' | 'failed';

export type MilestoneCategory = 'career' | 'learning' | 'skill' | 'social' | 'financial' | 'achievements';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: MilestoneCategory;
  target: number;
  current: number;
  unit: string;
  status: MilestoneStatus;
  rewardXP: number;
  rewardBadge?: string;
 限?: string;
  completedAt?: Date;
  dependencies?: string[];
}

export const MILESTONE_TEMPLATES: Omit<Milestone, 'current' | 'status' | 'completedAt'>[] = [
  {
    id: 'first_job_offer',
    title: 'První nabídka',
    description: 'Získej svou první pracovní nabídku',
    category: 'career',
    target: 1,
    unit: 'nabídek',
    rewardXP: 500,
    rewardBadge: '🎉'
  },
  {
    id: 'junior_dev',
    title: 'Junior Developer',
    description: 'Odemkni 10 programming skills',
    category: 'skill',
    target: 10,
    unit: 'skills',
    rewardXP: 300,
    rewardBadge: '💻'
  },
  {
    id: 'full_stack',
    title: 'Full Stack Developer',
    description: 'Dokonč 5 kurzů v sekci Programming',
    category: 'learning',
    target: 5,
    unit: 'kurzů',
    rewardXP: 400,
    rewardBadge: '🔥'
  },
  {
    id: 'career_switch',
    title: 'Kariérní změna',
    description: 'Odemkni skills ve 3 různých kategoriích',
    category: 'career',
    target: 3,
    unit: 'kategorií',
    rewardXP: 600,
    rewardBadge: '🔄'
  },
  {
    id: 'learning_100h',
    title: 'Sto hodin učení',
    description: 'Nauč se celkem 100 hodin',
    category: 'learning',
    target: 100,
    unit: 'hodin',
    rewardXP: 200,
    rewardBadge: '⏱️'
  },
  {
    id: 'learning_500h',
    title: 'Pět set hodin',
    description: 'Nauč se celkem 500 hodin',
    category: 'learning',
    target: 500,
    unit: 'hodin',
    rewardXP: 750,
    rewardBadge: '🕐'
  },
  {
    id: 'level_10',
    title: 'Level 10',
    description: 'Dosáhni levelu 10',
    category: 'learning',
    target: 10,
    unit: 'level',
    rewardXP: 400,
    rewardBadge: '📊'
  },
  {
    id: 'level_25',
    title: 'Expert',
    description: 'Dosáhni levelu 25',
    category: 'learning',
    target: 25,
    unit: 'level',
    rewardXP: 1000,
    rewardBadge: '🎓'
  },
  {
    id: 'ten_jobs',
    title: 'Deset přihlášek',
    description: 'Přihlas se k 10 pracovním nabídkám',
    category: 'career',
    target: 10,
    unit: 'přihlášek',
    rewardXP: 150,
    rewardBadge: '📋'
  },
  {
    id: 'hundred_jobs',
    title: 'Sto přihlášek',
    description: 'Přihlas se k 100 pracovním nabídkám',
    category: 'career',
    target: 100,
    unit: 'přihlášek',
    rewardXP: 500,
    rewardBadge: '📊'
  },
  {
    id: 'five_interviews',
    title: 'Pět interview',
    description: 'Dostaň se k interview u 5 firem',
    category: 'career',
    target: 5,
    unit: 'interview',
    rewardXP: 300,
    rewardBadge: '🤝'
  },
  {
    id: 'first_mission',
    title: 'První mise',
    description: 'Dokonč svou první misi',
    category: 'learning',
    target: 1,
    unit: 'mise',
    rewardXP: 200,
    rewardBadge: '🚀'
  },
  {
    id: 'five_missions',
    title: 'Misionář',
    description: 'Dokonč 5 misí',
    category: 'learning',
    target: 5,
    unit: 'misí',
    rewardXP: 600,
    rewardBadge: '🎯'
  },
  {
    id: 'all_missions',
    title: 'Mistr misí',
    description: 'Dokonč všechny dostupné mise',
    category: 'learning',
    target: 11,
    unit: 'misí',
    rewardXP: 1500,
    rewardBadge: '👑'
  },
  {
    id: 'five_skills',
    title: 'Začátečník',
    description: 'Odemkni 5 různých skills',
    category: 'skill',
    target: 5,
    unit: 'skills',
    rewardXP: 100,
    rewardBadge: '🛠️'
  },
  {
    id: 'twenty_skills',
    title: 'Specialista',
    description: 'Odemkni 20 různých skills',
    category: 'skill',
    target: 20,
    unit: 'skills',
    rewardXP: 400,
    rewardBadge: '🔧'
  },
  {
    id: 'fifty_skills',
    title: 'Expert',
    description: 'Odemkni 50 různých skills',
    category: 'skill',
    target: 50,
    unit: 'skills',
    rewardXP: 1000,
    rewardBadge: '⭐'
  },
  {
    id: 'five_courses',
    title: 'Student',
    description: 'Dokonč 5 kurzů',
    category: 'learning',
    target: 5,
    unit: 'kurzů',
    rewardXP: 300,
    rewardBadge: '📚'
  },
  {
    id: 'twenty_courses',
    title: 'Vzdělanec',
    description: 'Dokonč 20 kurzů',
    category: 'learning',
    target: 20,
    unit: 'kurzů',
    rewardXP: 800,
    rewardBadge: '🎓'
  },
  {
    id: 'streak_7',
    title: 'Týdenní série',
    description: 'Udrž streak 7 dní',
    category: 'learning',
    target: 7,
    unit: 'dní',
    rewardXP: 150,
    rewardBadge: '🔥'
  },
  {
    id: 'streak_30',
    title: 'Měsíční válečník',
    description: 'Udrž streak 30 dní',
    category: 'learning',
    target: 30,
    unit: 'dní',
    rewardXP: 500,
    rewardBadge: '⚔️'
  },
  {
    id: 'streak_100',
    title: 'Sto dní',
    description: 'Udrž streak 100 dní',
    category: 'learning',
    target: 100,
    unit: 'dní',
    rewardXP: 1500,
    rewardBadge: '💪'
  },
  {
    id: 'xp_1000',
    title: 'První tisíc',
    description: 'Nasbírej 1,000 XP',
    category: 'learning',
    target: 1000,
    unit: 'XP',
    rewardXP: 100,
    rewardBadge: '⭐'
  },
  {
    id: 'xp_5000',
    title: 'XP Veteran',
    description: 'Nasbírej 5,000 XP',
    category: 'learning',
    target: 5000,
    unit: 'XP',
    rewardXP: 500,
    rewardBadge: '🌟'
  },
  {
    id: 'xp_10000',
    title: 'XP Legend',
    description: 'Nasbírej 10,000 XP',
    category: 'learning',
    target: 10000,
    unit: 'XP',
    rewardXP: 1000,
    rewardBadge: '💎'
  },
  {
    id: 'xp_50000',
    title: 'XP Mythic',
    description: 'Nasbírej 50,000 XP',
    category: 'learning',
    target: 50000,
    unit: 'XP',
    rewardXP: 2500,
    rewardBadge: '👑'
  },
  {
    id: 'hundred_tasks',
    title: 'Sto úkolů',
    description: 'Dokonč 100 úkolů',
    category: 'learning',
    target: 100,
    unit: 'úkolů',
    rewardXP: 400,
    rewardBadge: '💯'
  },
  {
    id: 'all_achievements',
    title: 'Sběratel',
    description: 'Odemkni 50 achievementů',
    category: 'achievements',
    target: 50,
    unit: 'achievementů',
    rewardXP: 2000,
    rewardBadge: '🏆'
  },
  {
    id: 'all_rare',
    title: 'Sběratel rare',
    description: 'Odemkni 15 rare achievementů',
    category: 'achievements',
    target: 15,
    unit: 'rare achievementů',
    rewardXP: 800,
    rewardBadge: '💠'
  },
  {
    id: 'all_epic',
    title: 'Sběratel epic',
    description: 'Odemkni 10 epic achievementů',
    category: 'achievements',
    target: 10,
    unit: 'epic achievementů',
    rewardXP: 1200,
    rewardBadge: '💎'
  },
  {
    id: 'all_legendary',
    title: 'Legenda',
    description: 'Odemkni 5 legendary achievementů',
    category: 'achievements',
    target: 5,
    unit: 'legendary achievementů',
    rewardXP: 2000,
    rewardBadge: '👑'
  }
];

export function createMilestone(template: typeof MILESTONE_TEMPLATES[0], current: number = 0): Milestone {
  return {
    ...template,
    current,
    status: current >= template.target ? 'completed' : current > 0 ? 'in_progress' : 'locked',
    completedAt: current >= template.target ? new Date() : undefined
  };
}

export function updateMilestoneProgress(milestone: Milestone, newCurrent: number): Milestone {
  const completed = newCurrent >= milestone.target;
  return {
    ...milestone,
    current: newCurrent,
    status: completed ? 'completed' : newCurrent > 0 ? 'in_progress' : 'locked',
    completedAt: completed ? new Date() : undefined
  };
}

export function getMilestoneProgress(milestone: Milestone): number {
  return Math.min(100, Math.round((milestone.current / milestone.target) * 100));
}

export function getMilestoneCategoryColor(category: MilestoneCategory): string {
  switch (category) {
    case 'career': return '#4caf50';
    case 'learning': return '#2196f3';
    case 'skill': return '#9c27b0';
    case 'social': return '#ff9800';
    case 'financial': return '#f44336';
    default: return '#78909c';
  }
}

export function getMilestoneCategoryIcon(category: MilestoneCategory): string {
  switch (category) {
    case 'career': return '💼';
    case 'learning': return '📚';
    case 'skill': return '🛠️';
    case 'social': return '👥';
    case 'financial': return '💰';
    default: return '🎯';
  }
}
