export type LifeCategory = 
  | 'learning' 
  | 'work' 
  | 'relationships' 
  | 'family' 
  | 'friends' 
  | 'future_kids' 
  | 'property' 
  | 'business' 
  | 'investing' 
  | 'competition' 
  | 'envy' 
  | 'psychology' 
  | 'addiction';

export type GoalStatus = 'active' | 'completed' | 'paused';

export interface GoalMilestone {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  completedAt?: Date;
  xpReward: number;
  order: number;
  dueDate?: string;
  linkedProjectIds: string[];
}

export interface LifeGoal {
  id: string;
  title: string;
  category: LifeCategory;
  milestones: GoalMilestone[];
  xpReward: number;
  status: GoalStatus;
  color: string;
  icon: string;
  linkedProjectId?: string;
}

export interface GoalStats {
  totalXp: number;
  completedMilestones: number;
  totalMilestones: number;
  progressPercent: number;
  streak: number;
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

export const LIFE_CATEGORIES: { 
  key: LifeCategory; 
  label: string; 
  icon: string; 
  color: string;
  defaultMilestones: string[];
}[] = [
  { 
    key: 'learning', 
    label: '🎓 Učení', 
    icon: '🎓', 
    color: '#4CAF50',
    defaultMilestones: ['Dokončit Python AI kurz', 'Naučit se anglicky B2', 'Přečíst 24 knih']
  },
  { 
    key: 'work', 
    label: '💼 Práce', 
    icon: '💼', 
    color: '#2196F3',
    defaultMilestones: ['Roční příjem 2026', 'Získat Senior pozici']
  },
  { 
    key: 'relationships', 
    label: '💕 Vztahy', 
    icon: '💕', 
    color: '#E91E63',
    defaultMilestones: ['Vztah - kvalitní čas', 'Komunikace s partnerem']
  },
  { 
    key: 'family', 
    label: '👨‍👩‍👧 Rodina', 
    icon: '👨‍👩‍👧', 
    color: '#FF9800',
    defaultMilestones: ['Volání s rodiči', 'Návštěvy rodiny']
  },
  { 
    key: 'friends', 
    label: '👥 Kamarádi', 
    icon: '👥', 
    color: '#9C27B0',
    defaultMilestones: ['Srazy s kamarády', 'Nových přátel']
  },
  { 
    key: 'future_kids', 
    label: '👶 Budoucí děti', 
    icon: '👶', 
    color: '#00BCD4',
    defaultMilestones: ['Finanční příprava na děti', 'Příprava bydlení pro děti']
  },
  { 
    key: 'property', 
    label: '🏠 Majetek', 
    icon: '🏠', 
    color: '#795548',
    defaultMilestones: ['Koupě elektrokola (2x)', 'Renovace bytu']
  },
  { 
    key: 'business', 
    label: '🚀 Podnikání', 
    icon: '🚀', 
    color: '#FF5722',
    defaultMilestones: ['Založit side project', 'Pasivní příjem z byznysu']
  },
  { 
    key: 'investing', 
    label: '📈 Investování', 
    icon: '📈', 
    color: '#009688',
    defaultMilestones: ['Investice do akcií', 'Kryptoměny portfolio', 'Celkové úspory']
  },
  { 
    key: 'competition', 
    label: '🏆 Konkurence', 
    icon: '🏆', 
    color: '#607D8B',
    defaultMilestones: ['Porazit konkurenta X', 'Stát se #1 v oboru']
  },
  { 
    key: 'envy', 
    label: '😔 Závist', 
    icon: '😔', 
    color: '#9575CD',
    defaultMilestones: ['0x závistivých myšlenek', 'Ocenit úspěch druhých']
  },
  { 
    key: 'psychology', 
    label: '🧠 Psychika', 
    icon: '🧠', 
    color: '#26A69A',
    defaultMilestones: ['Meditace', 'Denní gratitude', 'Psychoterapie sezení']
  },
  { 
    key: 'addiction', 
    label: '⛔ Závislosti', 
    icon: '⛔', 
    color: '#F44336',
    defaultMilestones: ['Sobota bez alkoholu', '0x gambling', 'Sociální sítě - max 1h denně']
  },
];

export const PROJECT_GOAL_MAPPING: Record<string, LifeCategory[]> = {
  'Learning Platform Vývoj': ['learning'],
  'AI Agenti System': ['learning', 'psychology'],
  'Cybersecurity Mastery': ['work'],
  'Data Pipeline System': ['investing'],
  'Super Inteligence': ['learning'],
  'Personal Branding System': ['business'],
  'Financial Freedom 2026': ['investing', 'property'],
};
