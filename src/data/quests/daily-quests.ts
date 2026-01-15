import { DailyQuestTemplate, QuestCategory } from '@/types/quests';

export const QUEST_TEMPLATES: DailyQuestTemplate[] = [
  {
    id: 'algo_coding_1',
    title: 'Kóduj a buď',
    description: 'Dokonč 1 coding algoritmus',
    category: 'algorithm',
    difficulty: 1,
    xpReward: 50,
    goldReward: 5,
    targetValue: 1,
    targetType: 'algorithm_coding',
    icon: '💻',
    rarity: 'common',
    prerequisites: { minLevel: 1 }
  },
  {
    id: 'algo_coding_3',
    title: 'Coding Machine',
    description: 'Dokonč 3 coding algoritmy',
    category: 'algorithm',
    difficulty: 3,
    xpReward: 200,
    goldReward: 20,
    targetValue: 3,
    targetType: 'algorithm_coding',
    icon: '🤖',
    rarity: 'rare',
    prerequisites: { minLevel: 5 }
  },
  {
    id: 'algo_learning_1',
    title: 'Stále se učím',
    description: 'Dokonč 1 learning algoritmus',
    category: 'algorithm',
    difficulty: 1,
    xpReward: 40,
    goldReward: 4,
    targetValue: 1,
    targetType: 'algorithm_learning',
    icon: '📖',
    rarity: 'common',
    prerequisites: { minLevel: 1 }
  },
  {
    id: 'algo_learning_3',
    title: 'Věčný student',
    description: 'Dokonč 3 learning algoritmy',
    category: 'algorithm',
    difficulty: 3,
    xpReward: 150,
    goldReward: 15,
    targetValue: 3,
    targetType: 'algorithm_learning',
    icon: '🎓',
    rarity: 'rare',
    prerequisites: { minLevel: 3 }
  },
  {
    id: 'algo_debug_2',
    title: 'Lovce bugů',
    description: 'Dokonč 2 debugging algoritmy',
    category: 'algorithm',
    difficulty: 2,
    xpReward: 80,
    goldReward: 8,
    targetValue: 2,
    targetType: 'algorithm_debugging',
    icon: '🐛',
    rarity: 'common',
    prerequisites: { minLevel: 2 }
  },
  {
    id: 'algo_debug_5',
    title: 'Mistr debugger',
    description: 'Dokonč 5 debugging algoritmů',
    category: 'algorithm',
    difficulty: 4,
    xpReward: 350,
    goldReward: 35,
    targetValue: 5,
    targetType: 'algorithm_debugging',
    icon: '🔧',
    rarity: 'epic',
    prerequisites: { minLevel: 10 }
  },
  {
    id: 'algo_deploy_1',
    title: 'Do produkce!',
    description: 'Dokonč 1 deployment algoritmus',
    category: 'algorithm',
    difficulty: 2,
    xpReward: 100,
    goldReward: 10,
    targetValue: 1,
    targetType: 'algorithm_deployment',
    icon: '🚀',
    rarity: 'common',
    prerequisites: { minLevel: 5 }
  },
  {
    id: 'algo_research_2',
    title: 'Výzkumník',
    description: 'Dokonč 2 research algoritmy',
    category: 'algorithm',
    difficulty: 2,
    xpReward: 70,
    goldReward: 7,
    targetValue: 2,
    targetType: 'algorithm_research',
    icon: '🔬',
    rarity: 'common',
    prerequisites: { minLevel: 3 }
  },
  {
    id: 'algo_mixed_5',
    title: 'All-Rounder',
    description: 'Dokonč celkem 5 algoritmů jakéhokoliv typu',
    category: 'algorithm',
    difficulty: 3,
    xpReward: 180,
    goldReward: 18,
    targetValue: 5,
    targetType: 'algorithm_any',
    icon: '🎯',
    rarity: 'rare',
    prerequisites: { minLevel: 5 }
  },
  {
    id: 'algo_mixed_10',
    title: 'Algoritmický bůh',
    description: 'Dokonč celkem 10 algoritmů jakéhokoliv typu',
    category: 'algorithm',
    difficulty: 5,
    xpReward: 600,
    goldReward: 60,
    targetValue: 10,
    targetType: 'algorithm_any',
    icon: '⚡',
    rarity: 'legendary',
    prerequisites: { minLevel: 15 }
  },
  {
    id: 'course_chapter_1',
    title: 'Kapitola dne',
    description: 'Dokonč 1 kapitolu kurzu',
    category: 'learning',
    difficulty: 1,
    xpReward: 35,
    goldReward: 3,
    targetValue: 1,
    targetType: 'course_chapter',
    icon: '📑',
    rarity: 'common',
    prerequisites: { minLevel: 1 }
  },
  {
    id: 'course_chapter_3',
    title: 'Studijní běh',
    description: 'Dokonč 3 kapitoly kurzů',
    category: 'learning',
    difficulty: 2,
    xpReward: 100,
    goldReward: 10,
    targetValue: 3,
    targetType: 'course_chapter',
    icon: '📚',
    rarity: 'common',
    prerequisites: { minLevel: 3 }
  },
  {
    id: 'course_complete_1',
    title: 'Absolvent',
    description: 'Dokonč celý kurz',
    category: 'learning',
    difficulty: 4,
    xpReward: 400,
    goldReward: 40,
    targetValue: 1,
    targetType: 'course_complete',
    icon: '🎓',
    rarity: 'epic',
    prerequisites: { minLevel: 10 }
  },
  {
    id: 'skill_unlock_1',
    title: 'Nová dovednost',
    description: 'Odemkni 1 novou skill',
    category: 'learning',
    difficulty: 2,
    xpReward: 60,
    goldReward: 6,
    targetValue: 1,
    targetType: 'skill_unlock',
    icon: '🗝️',
    rarity: 'common',
    prerequisites: { minLevel: 2 }
  },
  {
    id: 'skill_unlock_3',
    title: 'Skill Hunter',
    description: 'Odemkni 3 nové skills',
    category: 'learning',
    difficulty: 3,
    xpReward: 200,
    goldReward: 20,
    targetValue: 3,
    targetType: 'skill_unlock',
    icon: '🏆',
    rarity: 'rare',
    prerequisites: { minLevel: 5 }
  },
  {
    id: 'job_apply_1',
    title: 'První krok',
    description: 'Přidej 1 novou pracovní nabídku',
    category: 'career',
    difficulty: 1,
    xpReward: 30,
    goldReward: 3,
    targetValue: 1,
    targetType: 'job_added',
    icon: '📋',
    rarity: 'common',
    prerequisites: { minLevel: 1 }
  },
  {
    id: 'job_apply_3',
    title: 'Aktivní hledání',
    description: 'Přidej 3 pracovní nabídky',
    category: 'career',
    difficulty: 2,
    xpReward: 90,
    goldReward: 9,
    targetValue: 3,
    targetType: 'job_added',
    icon: '🔍',
    rarity: 'common',
    prerequisites: { minLevel: 3 }
  },
  {
    id: 'job_apply_5',
    title: 'Lovec příležitostí',
    description: 'Přidej 5 pracovních nabídek',
    category: 'career',
    difficulty: 3,
    xpReward: 180,
    goldReward: 18,
    targetValue: 5,
    targetType: 'job_added',
    icon: '🎯',
    rarity: 'rare',
    prerequisites: { minLevel: 5 }
  },
  {
    id: 'interview_1',
    title: 'Interview time',
    description: 'Dosáhni fáze interview u jakékoliv pozice',
    category: 'career',
    difficulty: 3,
    xpReward: 200,
    goldReward: 20,
    targetValue: 1,
    targetType: 'interview_reached',
    icon: '🤝',
    rarity: 'rare',
    prerequisites: { minLevel: 8 }
  },
  {
    id: 'milestone_1',
    title: 'Milníkový den',
    description: 'Dokonč 1 projekt milestone',
    category: 'milestone',
    difficulty: 2,
    xpReward: 120,
    goldReward: 12,
    targetValue: 1,
    targetType: 'milestone_completed',
    icon: '🚩',
    rarity: 'common',
    prerequisites: { minLevel: 5 }
  },
  {
    id: 'milestone_3',
    title: 'Milníkový mág',
    description: 'Dokonč 3 projekt milestones',
    category: 'milestone',
    difficulty: 4,
    xpReward: 400,
    goldReward: 40,
    targetValue: 3,
    targetType: 'milestone_completed',
    icon: '✨',
    rarity: 'epic',
    prerequisites: { minLevel: 12 }
  },
  {
    id: 'streak_3',
    title: 'Zahřívání',
    description: 'Udrž streak alespoň 3 dny',
    category: 'special',
    difficulty: 2,
    xpReward: 100,
    goldReward: 10,
    targetValue: 3,
    targetType: 'streak_days',
    icon: '🔥',
    rarity: 'common',
    prerequisites: { minLevel: 2 }
  },
  {
    id: 'streak_7',
    title: 'Týdenní oheň',
    description: 'Udrž streak alespoň 7 dní',
    category: 'special',
    difficulty: 4,
    xpReward: 350,
    goldReward: 35,
    targetValue: 7,
    targetType: 'streak_days',
    icon: '⚡',
    rarity: 'epic',
    prerequisites: { minLevel: 10, minStreak: 5 }
  },
  {
    id: 'early_bird',
    title: 'Ranní pták',
    description: 'Dokonč algoritmus před 8:00 ráno',
    category: 'special',
    difficulty: 2,
    xpReward: 80,
    goldReward: 8,
    targetValue: 1,
    targetType: 'early_morning',
    icon: '🌅',
    rarity: 'common',
    prerequisites: { minLevel: 3 }
  },
  {
    id: 'night_owl',
    title: 'Nocležník',
    description: 'Dokonč algoritmus po 22:00 večer',
    category: 'special',
    difficulty: 2,
    xpReward: 80,
    goldReward: 8,
    targetValue: 1,
    targetType: 'late_night',
    icon: '🦉',
    rarity: 'common',
    prerequisites: { minLevel: 3 }
  },
  {
    id: 'combo_5',
    title: 'Combo Master',
    description: 'Dosáhni combo 5+ v jednom dni',
    category: 'special',
    difficulty: 3,
    xpReward: 150,
    goldReward: 15,
    targetValue: 5,
    targetType: 'combo_reached',
    icon: '💫',
    rarity: 'rare',
    prerequisites: { minLevel: 8 }
  },
  {
    id: 'project_start_1',
    title: 'Nový projekt',
    description: 'Začni 1 nový projekt',
    category: 'milestone',
    difficulty: 2,
    xpReward: 100,
    goldReward: 10,
    targetValue: 1,
    targetType: 'project_started',
    icon: '📁',
    rarity: 'common',
    prerequisites: { minLevel: 5 }
  },
  {
    id: 'project_complete_1',
    title: 'Projektový finišer',
    description: 'Dokonč 1 projekt',
    category: 'milestone',
    difficulty: 5,
    xpReward: 800,
    goldReward: 80,
    targetValue: 1,
    targetType: 'project_completed',
    icon: '🏆',
    rarity: 'legendary',
    prerequisites: { minLevel: 15, completedQuestIds: ['project_start_1'] }
  },
];

export function getQuestsForDate(date: Date): DailyQuestTemplate[] {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const shuffled = [...QUEST_TEMPLATES].sort((a, b) => {
    const aScore = (a.rarity === 'legendary' ? 4 : a.rarity === 'epic' ? 3 : a.rarity === 'rare' ? 2 : 1) * (Math.random() * 0.5 + 0.75);
    const bScore = (b.rarity === 'legendary' ? 4 : b.rarity === 'epic' ? 3 : b.rarity === 'rare' ? 2 : 1) * (Math.random() * 0.5 + 0.75);
    return bScore - aScore;
  });

  const selected: DailyQuestTemplate[] = [];
  const categoriesUsed = new Set<QuestCategory>();

  for (const template of shuffled) {
    if (selected.length >= 4) break;
    
    const prerequisites = template.prerequisites;
    if (prerequisites?.minLevel && prerequisites.minLevel > 30) continue;
    
    if (categoriesUsed.has(template.category)) continue;
    
    if (template.rarity === 'legendary' && Math.random() > 0.3) continue;
    if (template.rarity === 'epic' && Math.random() > 0.5) continue;
    
    selected.push(template);
    categoriesUsed.add(template.category);
  }

  while (selected.length < 4) {
    const remaining = QUEST_TEMPLATES.filter(t => !selected.includes(t) && t.rarity === 'common');
    if (remaining.length > 0) {
      selected.push(remaining[Math.floor(Math.random() * remaining.length)]);
    } else {
      break;
    }
  }

  return selected;
}

export function getBonusQuest(date: Date): DailyQuestTemplate | null {
  if (Math.random() > 0.25) return null;
  
  const bonusQuests = QUEST_TEMPLATES.filter(t => t.rarity === 'legendary' || t.rarity === 'epic');
  return bonusQuests[Math.floor(Math.random() * bonusQuests.length)];
}
