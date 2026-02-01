// ============================================================================
// HABIT TRACKER - Pro sledování závislostí (negativní návyky)
// ============================================================================

export type HabitCategory = 'substance' | 'behavioral' | 'digital' | 'food' | 'other';
export type HabitSeverity = 'mild' | 'moderate' | 'severe' | 'critical';

export interface HabitEntry {
  id: string;
  date: string; // ISO date
  occurred: boolean;
  intensity?: number; // 1-10, jak silná byla potřeba/použití
  trigger?: string; // Co to vyvolalo
  notes?: string;
  resisted: boolean; // Zda se podařilo odolat
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  category: HabitCategory;
  severity: HabitSeverity;
  isNegative: boolean; // true = závislost k překonání
  targetDaysClean: number; // Cílový počet dní bez
  currentStreak: number; // Aktuální streak čistých dní
  longestStreak: number;
  totalRelapses: number;
  entries: HabitEntry[];
  triggers: string[]; // Známé spouštěče
  alternatives: string[]; // Zdravé alternativy
  cost: number; // Měsíční náklad závislosti v Kč
  healthImpact: number; // 1-10, dopad na zdraví
  createdAt: string;
  lastRelapse?: string;
}

export const HABIT_CATEGORIES: { key: HabitCategory; label: string; icon: string; color: string }[] = [
  { key: 'substance', label: 'Látky', icon: '💊', color: '#F44336' },
  { key: 'behavioral', label: 'Chování', icon: '🎰', color: '#FF9800' },
  { key: 'digital', label: 'Digitální', icon: '📱', color: '#2196F3' },
  { key: 'food', label: 'Jídlo', icon: '🍔', color: '#4CAF50' },
  { key: 'other', label: 'Ostatní', icon: '⚡', color: '#9C27B0' },
];

export const DEFAULT_HABITS: Omit<Habit, 'id' | 'entries' | 'createdAt'>[] = [
  {
    name: 'Alkohol',
    icon: '🍺',
    category: 'substance',
    severity: 'moderate',
    isNegative: true,
    targetDaysClean: 30,
    currentStreak: 0,
    longestStreak: 0,
    totalRelapses: 0,
    triggers: ['Stres', 'Pátek večer', 'Kamarádi'],
    alternatives: ['Nealkoholické pivo', 'Čaj', 'Sport'],
    cost: 2000,
    healthImpact: 7,
  },
  {
    name: 'Cigarety',
    icon: '🚬',
    category: 'substance',
    severity: 'severe',
    isNegative: true,
    targetDaysClean: 365,
    currentStreak: 0,
    longestStreak: 0,
    totalRelapses: 0,
    triggers: ['Káva', 'Stres', 'Po jídle'],
    alternatives: ['Žvýkačka', 'Hluboké dýchání', 'Procházka'],
    cost: 4000,
    healthImpact: 10,
  },
  {
    name: 'Gambling',
    icon: '🎰',
    category: 'behavioral',
    severity: 'critical',
    isNegative: true,
    targetDaysClean: 365,
    currentStreak: 0,
    longestStreak: 0,
    totalRelapses: 0,
    triggers: ['Nuda', 'Reklamy', 'Výhra známého'],
    alternatives: ['Investování', 'Poker s přáteli (bez peněz)', 'Videohry'],
    cost: 5000,
    healthImpact: 3,
  },
  {
    name: 'Sociální sítě',
    icon: '📱',
    category: 'digital',
    severity: 'moderate',
    isNegative: true,
    targetDaysClean: 7,
    currentStreak: 0,
    longestStreak: 0,
    totalRelapses: 0,
    triggers: ['Nuda', 'Čekání', 'Ráno v posteli'],
    alternatives: ['Čtení knihy', 'Podcast', 'Meditace'],
    cost: 0,
    healthImpact: 4,
  },
  {
    name: 'Fast food',
    icon: '🍟',
    category: 'food',
    severity: 'mild',
    isNegative: true,
    targetDaysClean: 14,
    currentStreak: 0,
    longestStreak: 0,
    totalRelapses: 0,
    triggers: ['Hlad', 'Lenost vařit', 'Reklamy'],
    alternatives: ['Meal prep', 'Zdravé snacky', 'Domácí burger'],
    cost: 3000,
    healthImpact: 6,
  },
];

// ============================================================================
// FRIEND TRUST TRACKER - Sledování důvěry v přátele
// ============================================================================

export type TrustLevel = 'unknown' | 'low' | 'medium' | 'high' | 'absolute';
export type FriendCategory = 'close' | 'regular' | 'acquaintance' | 'work' | 'online';

export interface TrustEvent {
  id: string;
  date: string;
  type: 'positive' | 'negative' | 'neutral';
  description: string;
  trustChange: number; // -10 to +10
  category: string; // Co se stalo - lež, pomoc, zrada, podpora, atd.
}

export interface Friend {
  id: string;
  name: string;
  nickname?: string;
  avatar?: string;
  category: FriendCategory;
  trustLevel: TrustLevel;
  trustScore: number; // 0-100
  knownSince: string; // ISO date
  lastContact: string;
  contactFrequency: 'daily' | 'weekly' | 'monthly' | 'rarely';
  events: TrustEvent[];
  strengths: string[]; // Na co se dá spolehnout
  weaknesses: string[]; // Na co pozor
  sharedInterests: string[];
  borrowedMoney: number; // Kolik ti dluží
  lentMoney: number; // Kolik jim dlužíš
  secretsShared: number; // Počet sdílených tajemství (důvěra)
  timesHelped: number;
  timesLetDown: number;
  notes: string;
  isActive: boolean;
}

export const TRUST_LEVELS: { key: TrustLevel; label: string; color: string; minScore: number }[] = [
  { key: 'unknown', label: 'Neznámá', color: '#9E9E9E', minScore: 0 },
  { key: 'low', label: 'Nízká', color: '#F44336', minScore: 20 },
  { key: 'medium', label: 'Střední', color: '#FF9800', minScore: 40 },
  { key: 'high', label: 'Vysoká', color: '#4CAF50', minScore: 70 },
  { key: 'absolute', label: 'Absolutní', color: '#2196F3', minScore: 90 },
];

export const FRIEND_CATEGORIES: { key: FriendCategory; label: string; icon: string }[] = [
  { key: 'close', label: 'Blízcí přátelé', icon: '💎' },
  { key: 'regular', label: 'Běžní kamarádi', icon: '👥' },
  { key: 'acquaintance', label: 'Známí', icon: '👋' },
  { key: 'work', label: 'Pracovní', icon: '💼' },
  { key: 'online', label: 'Online', icon: '🌐' },
];

export const TRUST_EVENT_CATEGORIES = [
  { key: 'help', label: 'Pomoc', icon: '🤝', defaultChange: 5 },
  { key: 'support', label: 'Podpora', icon: '💪', defaultChange: 3 },
  { key: 'honesty', label: 'Upřímnost', icon: '💬', defaultChange: 4 },
  { key: 'reliability', label: 'Spolehlivost', icon: '✅', defaultChange: 5 },
  { key: 'betrayal', label: 'Zrada', icon: '🗡️', defaultChange: -10 },
  { key: 'lie', label: 'Lež', icon: '🤥', defaultChange: -5 },
  { key: 'gossip', label: 'Pomluva', icon: '🗣️', defaultChange: -7 },
  { key: 'letdown', label: 'Zklamání', icon: '😔', defaultChange: -3 },
  { key: 'secret_kept', label: 'Udržel tajemství', icon: '🤫', defaultChange: 6 },
  { key: 'secret_shared', label: 'Prozradil tajemství', icon: '📢', defaultChange: -8 },
];

// ============================================================================
// FAMILY TRUST TRACKER - Sledování důvěry rodiny ve mě
// ============================================================================

export type FamilyRole = 'parent' | 'sibling' | 'grandparent' | 'uncle_aunt' | 'cousin' | 'partner' | 'child' | 'in_law';

export interface FamilyTrustEvent {
  id: string;
  date: string;
  type: 'positive' | 'negative';
  description: string;
  trustChange: number;
  category: string;
  witnessedBy?: string[]; // Kdo další to viděl
}

export interface FamilyMember {
  id: string;
  name: string;
  role: FamilyRole;
  avatar?: string;
  trustInMe: number; // 0-100, jak moc mi věří
  myTrustInThem: number; // 0-100, jak moc jim věřím já
  relationshipQuality: number; // 0-100
  lastPositiveInteraction: string;
  lastNegativeInteraction?: string;
  events: FamilyTrustEvent[];
  expectations: string[]; // Co ode mě očekávají
  disappointments: string[]; // V čem jsem je zklamal
  achievements: string[]; // Čím jsem je potěšil
  communicationFrequency: 'daily' | 'weekly' | 'monthly' | 'rarely';
  conflictAreas: string[]; // Oblasti konfliktů
  supportAreas: string[]; // Kde mě podporují
  financialSupport: number; // Kolik jsem od nich dostal/dal
  notes: string;
}

export const FAMILY_ROLES: { key: FamilyRole; label: string; icon: string }[] = [
  { key: 'parent', label: 'Rodič', icon: '👨‍👩' },
  { key: 'sibling', label: 'Sourozenec', icon: '👫' },
  { key: 'grandparent', label: 'Prarodič', icon: '👴' },
  { key: 'partner', label: 'Partner/ka', icon: '💑' },
  { key: 'child', label: 'Dítě', icon: '👶' },
  { key: 'uncle_aunt', label: 'Strýc/Teta', icon: '👨‍👩‍👧' },
  { key: 'cousin', label: 'Bratranec/Sestřenice', icon: '🧑‍🤝‍🧑' },
  { key: 'in_law', label: 'Tchán/Tchyně', icon: '👨‍👩‍👧‍👦' },
];

export const FAMILY_TRUST_CATEGORIES = [
  { key: 'promise_kept', label: 'Splněný slib', icon: '✅', defaultChange: 5 },
  { key: 'promise_broken', label: 'Porušený slib', icon: '❌', defaultChange: -7 },
  { key: 'financial_help', label: 'Finanční pomoc', icon: '💰', defaultChange: 4 },
  { key: 'emotional_support', label: 'Emoční podpora', icon: '🤗', defaultChange: 5 },
  { key: 'time_spent', label: 'Strávený čas', icon: '⏰', defaultChange: 3 },
  { key: 'missed_event', label: 'Zmeškaná událost', icon: '📅', defaultChange: -5 },
  { key: 'argument', label: 'Hádka', icon: '😠', defaultChange: -4 },
  { key: 'apology', label: 'Omluva', icon: '🙏', defaultChange: 3 },
  { key: 'achievement', label: 'Úspěch', icon: '🏆', defaultChange: 4 },
  { key: 'failure', label: 'Selhání', icon: '😞', defaultChange: -3 },
];

// ============================================================================
// FINISHED JOB TRACKER - Sledování dokončených prací
// ============================================================================

export type JobStatus = 'not_started' | 'in_progress' | 'review' | 'completed' | 'cancelled';
export type JobPriority = 'low' | 'medium' | 'high' | 'critical';
export type JobType = 'freelance' | 'employment' | 'personal' | 'learning' | 'household' | 'admin';

export interface JobChecklistItem {
  id: string;
  title: string;
  isCompleted: boolean;
  completedAt?: string;
  notes?: string;
  weight: number; // Váha pro výpočet progress (1-10)
}

export interface JobMilestone {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  completedAt?: string;
  isCompleted: boolean;
  checklist: JobChecklistItem[];
}

export interface FinishedJob {
  id: string;
  title: string;
  description: string;
  type: JobType;
  client?: string; // Pro freelance
  status: JobStatus;
  priority: JobPriority;
  progress: number; // 0-100
  startDate: string;
  dueDate?: string;
  completedDate?: string;
  milestones: JobMilestone[];
  totalHoursEstimate: number;
  hoursSpent: number;
  payment?: number; // Pro placené práce
  isPaid: boolean;
  tags: string[];
  blockers: string[]; // Co brání dokončení
  notes: string;
  linkedProjectId?: string;
  xpReward: number;
  isArchived: boolean;
}

export const JOB_TYPES: { key: JobType; label: string; icon: string; color: string }[] = [
  { key: 'freelance', label: 'Freelance', icon: '💼', color: '#4CAF50' },
  { key: 'employment', label: 'Zaměstnání', icon: '🏢', color: '#2196F3' },
  { key: 'personal', label: 'Osobní projekt', icon: '🎯', color: '#9C27B0' },
  { key: 'learning', label: 'Učení', icon: '📚', color: '#FF9800' },
  { key: 'household', label: 'Domácnost', icon: '🏠', color: '#795548' },
  { key: 'admin', label: 'Administrativa', icon: '📋', color: '#607D8B' },
];

export const JOB_PRIORITIES: { key: JobPriority; label: string; color: string }[] = [
  { key: 'low', label: 'Nízká', color: '#9E9E9E' },
  { key: 'medium', label: 'Střední', color: '#FF9800' },
  { key: 'high', label: 'Vysoká', color: '#F44336' },
  { key: 'critical', label: 'Kritická', color: '#D32F2F' },
];

export const JOB_STATUSES: { key: JobStatus; label: string; icon: string; color: string }[] = [
  { key: 'not_started', label: 'Nezačato', icon: '⏸️', color: '#9E9E9E' },
  { key: 'in_progress', label: 'Rozpracováno', icon: '🔄', color: '#2196F3' },
  { key: 'review', label: 'Kontrola', icon: '👀', color: '#FF9800' },
  { key: 'completed', label: 'Dokončeno', icon: '✅', color: '#4CAF50' },
  { key: 'cancelled', label: 'Zrušeno', icon: '❌', color: '#F44336' },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function calculateTrustLevel(score: number): TrustLevel {
  if (score >= 90) return 'absolute';
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  if (score >= 20) return 'low';
  return 'unknown';
}

export function calculateJobProgress(job: FinishedJob): number {
  if (job.milestones.length === 0) return job.progress;

  let totalWeight = 0;
  let completedWeight = 0;

  job.milestones.forEach(milestone => {
    milestone.checklist.forEach(item => {
      totalWeight += item.weight;
      if (item.isCompleted) {
        completedWeight += item.weight;
      }
    });
  });

  return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
}

export function getHabitSeverityColor(severity: HabitSeverity): string {
  switch (severity) {
    case 'mild': return '#4CAF50';
    case 'moderate': return '#FF9800';
    case 'severe': return '#F44336';
    case 'critical': return '#D32F2F';
    default: return '#9E9E9E';
  }
}
