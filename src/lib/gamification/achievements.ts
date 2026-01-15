export type AchievementRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export type AchievementCategory = 
  | 'progress'
  | 'learning'
  | 'career'
  | 'social'
  | 'streak'
  | 'skill'
  | 'mission'
  | 'special';

export type Achievement = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  xpReward: number;
  condition: {
    type: string;
    value: number;
  };
  secret: boolean;
 限?: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    title: 'První krok',
    description: 'Dokonč svůj první úkol',
    icon: '👶',
    category: 'progress',
    rarity: 'Common',
    xpReward: 10,
    condition: { type: 'tasks_completed', value: 1 },
    secret: false
  },
  {
    id: 'learning_hero',
    title: 'Hrdina učení',
    description: 'Dokonč 10 kurzů',
    icon: '📚',
    category: 'learning',
    rarity: 'Rare',
    xpReward: 100,
    condition: { type: 'courses_completed', value: 10 },
    secret: false
  },
  {
    id: 'streak_week',
    title: 'Týdenní série',
    description: 'Udrž streak 7 dní',
    icon: '🔥',
    category: 'streak',
    rarity: 'Rare',
    xpReward: 150,
    condition: { type: 'streak_days', value: 7 },
    secret: false
  },
  {
    id: 'streak_month',
    title: 'Měsíční válečník',
    description: 'Udrž streak 30 dní',
    icon: '⚔️',
    category: 'streak',
    rarity: 'Epic',
    xpReward: 500,
    condition: { type: 'streak_days', value: 30 },
    secret: false
  },
  {
    id: 'first_job',
    title: 'První práce',
    description: 'Přidej svůj první inzerát',
    icon: '💼',
    category: 'career',
    rarity: 'Common',
    xpReward: 25,
    condition: { type: 'jobs_added', value: 1 },
    secret: false
  },
  {
    id: 'job_hunter',
    title: 'Lovec práce',
    description: 'Přidej 20 inzerátů',
    icon: '🎯',
    category: 'career',
    rarity: 'Rare',
    xpReward: 200,
    condition: { type: 'jobs_added', value: 20 },
    secret: false
  },
  {
    id: 'interview_pro',
    title: 'Interview profík',
    description: 'Dosáhni fáze interview u 5 pozic',
    icon: '🤝',
    category: 'career',
    rarity: 'Epic',
    xpReward: 300,
    condition: { type: 'interviews', value: 5 },
    secret: false
  },
  {
    id: 'mission_starter',
    title: 'Nováček mise',
    description: 'Začni svou první misi',
    icon: '🚀',
    category: 'mission',
    rarity: 'Common',
    xpReward: 30,
    condition: { type: 'missions_started', value: 1 },
    secret: false
  },
  {
    id: 'mission_master',
    title: 'Mistr misí',
    description: 'Dokonč 5 misí',
    icon: '🏆',
    category: 'mission',
    rarity: 'Epic',
    xpReward: 400,
    condition: { type: 'missions_completed', value: 5 },
    secret: false
  },
  {
    id: 'skill_builder',
    title: 'Stavitel dovedností',
    description: 'Odemkni 20 různých skills',
    icon: '🛠️',
    category: 'skill',
    rarity: 'Rare',
    xpReward: 150,
    condition: { type: 'skills_unlocked', value: 20 },
    secret: false
  },
  {
    id: 'polymath',
    title: 'Polyhistor',
    description: 'Odemkni skills ve 3 různých kategoriích',
    icon: '🎭',
    category: 'skill',
    rarity: 'Epic',
    xpReward: 250,
    condition: { type: 'skill_categories', value: 3 },
    secret: false
  },
  {
    id: 'xp_collector_100',
    title: 'Sběrač XP',
    description: 'Nasbírej 100 XP',
    icon: '⭐',
    category: 'progress',
    rarity: 'Common',
    xpReward: 10,
    condition: { type: 'total_xp', value: 100 },
    secret: false
  },
  {
    id: 'xp_collector_1000',
    title: 'XP Veteran',
    description: 'Nasbírej 1,000 XP',
    icon: '🌟',
    category: 'progress',
    rarity: 'Rare',
    xpReward: 100,
    condition: { type: 'total_xp', value: 1000 },
    secret: false
  },
  {
    id: 'xp_collector_5000',
    title: 'XP Legend',
    description: 'Nasbírej 5,000 XP',
    icon: '💎',
    category: 'progress',
    rarity: 'Legendary',
    xpReward: 500,
    condition: { type: 'total_xp', value: 5000 },
    secret: false
  },
  {
    id: 'xp_collector_10000',
    title: 'XP Mythic',
    description: 'Nasbírej 10,000 XP',
    icon: '👑',
    category: 'progress',
    rarity: 'Mythic',
    xpReward: 1000,
    condition: { type: 'total_xp', value: 10000 },
    secret: false
  },
  {
    id: 'level_5',
    title: 'Růst',
    description: 'Dosáhni levelu 5',
    icon: '📈',
    category: 'progress',
    rarity: 'Common',
    xpReward: 50,
    condition: { type: 'level', value: 5 },
    secret: false
  },
  {
    id: 'level_10',
    title: 'Pokrok',
    description: 'Dosáhni levelu 10',
    icon: '📊',
    category: 'progress',
    rarity: 'Rare',
    xpReward: 150,
    condition: { type: 'level', value: 10 },
    secret: false
  },
  {
    id: 'level_25',
    title: 'Expert',
    description: 'Dosáhni levelu 25',
    icon: '🎓',
    category: 'progress',
    rarity: 'Epic',
    xpReward: 400,
    condition: { type: 'level', value: 25 },
    secret: false
  },
  {
    id: 'level_50',
    title: 'Majster',
    description: 'Dosáhni levelu 50',
    icon: '👑',
    category: 'progress',
    rarity: 'Legendary',
    xpReward: 1000,
    condition: { type: 'level', value: 50 },
    secret: false
  },
  {
    id: 'first_course',
    title: 'Student',
    description: 'Dokonč svůj první kurz',
    icon: '📖',
    category: 'learning',
    rarity: 'Common',
    xpReward: 50,
    condition: { type: 'courses_completed', value: 1 },
    secret: false
  },
  {
    id: 'course_collector',
    title: 'Sběratel kurzů',
    description: 'Dokonč 25 kurzů',
    icon: '📚',
    category: 'learning',
    rarity: 'Epic',
    xpReward: 600,
    condition: { type: 'courses_completed', value: 25 },
    secret: false
  },
  {
    id: 'hours_10',
    title: 'Deset hodin',
    description: 'Nauč se 10 hodin',
    icon: '⏰',
    category: 'learning',
    rarity: 'Common',
    xpReward: 25,
    condition: { type: 'learning_hours', value: 10 },
    secret: false
  },
  {
    id: 'hours_100',
    title: 'Sto hodin',
    description: 'Nauč se 100 hodin',
    icon: '⏳',
    category: 'learning',
    rarity: 'Rare',
    xpReward: 200,
    condition: { type: 'learning_hours', value: 100 },
    secret: false
  },
  {
    id: 'hours_500',
    title: 'Pět set hodin',
    description: 'Nauč se 500 hodin',
    icon: '🕐',
    category: 'learning',
    rarity: 'Epic',
    xpReward: 750,
    condition: { type: 'learning_hours', value: 500 },
    secret: false
  },
  {
    id: 'offer_getter',
    title: 'Šťastlivec',
    description: 'Získej nabídku práce',
    icon: '📝',
    category: 'career',
    rarity: 'Legendary',
    xpReward: 800,
    condition: { type: 'offers', value: 1 },
    secret: false
  },
  {
    id: 'dedication',
    title: 'Odhodlání',
    description: 'Používej platformu 30 dní v řadě',
    icon: '💪',
    category: 'streak',
    rarity: 'Epic',
    xpReward: 450,
    condition: { type: 'platform_streak', value: 30 },
    secret: false
  },
  {
    id: 'early_bird',
    title: 'Ranní pták',
    description: 'Dokonči úkol před 6:00 ráno',
    icon: '🌅',
    category: 'special',
    rarity: 'Rare',
    xpReward: 75,
    condition: { type: 'early_completion', value: 1 },
    secret: true
  },
  {
    id: 'night_owl',
    title: 'Nocležník',
    description: 'Dokonči úkol po 23:00',
    icon: '🦉',
    category: 'special',
    rarity: 'Rare',
    xpReward: 75,
    condition: { type: 'late_completion', value: 1 },
    secret: true
  },
  {
    id: 'weekend_warrior',
    title: 'Víkendový bojovník',
    description: 'Dokonč 3 úkoly během víkendu',
    icon: '🎪',
    category: 'special',
    rarity: 'Rare',
    xpReward: 100,
    condition: { type: 'weekend_completion', value: 3 },
    secret: true
  },
  {
    id: 'century_club',
    title: 'Klub sta',
    description: 'Dokonč 100 úkolů',
    icon: '💯',
    category: 'progress',
    rarity: 'Epic',
    xpReward: 500,
    condition: { type: 'tasks_completed', value: 100 },
    secret: false
  },
  {
    id: 'hidden_gem',
    title: 'Skrytý klenot',
    description: 'Odemkni secret achievement',
    icon: '💎',
    category: 'special',
    rarity: 'Legendary',
    xpReward: 300,
    condition: { type: 'secret_achievements', value: 3 },
    secret: true
  }
];

export function getRarityColor(rarity: AchievementRarity): string {
  switch (rarity) {
    case 'Common': return '#9e9e9e';
    case 'Rare': return '#2196f3';
    case 'Epic': return '#9c27b0';
    case 'Legendary': return '#ff9800';
    case 'Mythic': return '#f44336';
    default: return '#9e9e9e';
  }
}

export function getRarityBorder(rarity: AchievementRarity): string {
  switch (rarity) {
    case 'Common': return '1px solid #9e9e9e';
    case 'Rare': return '1px solid #2196f3';
    case 'Epic': return '1px solid #9c27b0';
    case 'Legendary': return '1px solid #ff9800';
    case 'Mythic': return '1px solid #f44336';
    default: return '1px solid #9e9e9e';
  }
}

export function getCategoryIcon(category: AchievementCategory): string {
  switch (category) {
    case 'progress': return '📊';
    case 'learning': return '📚';
    case 'career': return '💼';
    case 'social': return '👥';
    case 'streak': return '🔥';
    case 'skill': return '🛠️';
    case 'mission': return '🎯';
    case 'special': return '⭐';
    default: return '🏅';
  }
}
