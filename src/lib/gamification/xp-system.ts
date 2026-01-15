export interface LevelThreshold {
  level: number;
  xpRequired: number;
  title: string;
  perks: string[];
  color: string;
}

export const LEVEL_THRESHOLDS: LevelThreshold[] = [
  { level: 1, xpRequired: 0, title: 'Nováček', perks: ['Začni svou cestu'], color: '#78909c' },
  { level: 2, xpRequired: 100, title: 'Poutník', perks: ['+10% XP bonus'], color: '#4caf50' },
  { level: 3, xpRequired: 250, title: 'Učeň', perks: ['Přístup k pokročilým kurzům'], color: '#2196f3' },
  { level: 4, xpRequired: 500, title: 'Šedák', perks: ['+15% XP bonus'], color: '#9c27b0' },
  { level: 5, xpRequired: 800, title: 'Vojín', perks: ['Odznak "Růst"'], color: '#ff9800' },
  { level: 6, xpRequired: 1200, title: 'Lvádce', perks: ['+20% XP bonus'], color: '#e91e63' },
  { level: 7, xpRequired: 1700, title: 'Vědec', perks: ['Přístup k expert kurzům'], color: '#00bcd4' },
  { level: 8, xpRequired: 2300, title: 'Mág', perks: ['+25% XP bonus'], color: '#673ab7' },
  { level: 9, xpRequired: 3000, title: 'Alchymista', perks: ['Speciální achievementy'], color: '#ff5722' },
  { level: 10, xpRequired: 4000, title: 'Veterán', perks: ['Odznak "XP Veteran"', '+30% XP bonus'], color: '#ffc107' },
  { level: 11, xpRequired: 5200, title: 'Elitní veterán', perks: ['+32% XP bonus'], color: '#ffeb3b' },
  { level: 12, xpRequired: 6600, title: 'Šampion', perks: ['Přístup k VIP misím'], color: '#8bc34a' },
  { level: 13, xpRequired: 8200, title: 'Legendární šampion', perks: ['+35% XP bonus'], color: '#03a9f4' },
  { level: 14, xpRequired: 10000, title: 'Hrdina', perks: ['Odznak "Hrdina"'], color: '#9c27b0' },
  { level: 15, xpRequired: 12000, title: 'Super hrdina', perks: ['+38% XP bonus'], color: '#f44336' },
  { level: 16, xpRequired: 14500, title: 'Mega hrdina', perks: ['Přístup k ultimátním misím'], color: '#e91e63' },
  { level: 17, xpRequired: 17500, title: 'Ultra hrdina', perks: ['+40% XP bonus'], color: '#00bcd4' },
  { level: 18, xpRequired: 21000, title: 'Hypro hrdina', perks: ['Speciální role v komunitě'], color: '#673ab7' },
  { level: 19, xpRequired: 25000, title: 'Omega hrdina', perks: ['+42% XP bonus'], color: '#ff9800' },
  { level: 20, xpRequired: 30000, title: 'Neohrožený', perks: ['Odznak "Neohrožený"', 'VIP status', '+45% XP bonus'], color: '#ffeb3b' },
  { level: 21, xpRequired: 36000, title: 'Nesmrtelný', perks: ['+48% XP bonus'], color: '#4caf50' },
  { level: 22, xpRequired: 43000, title: 'Bohatý', perks: ['+50% XP bonus'], color: '#2196f3' },
  { level: 23, xpRequired: 51000, title: 'Mocný', perks: ['+52% XP bonus'], color: '#9c27b0' },
  { level: 24, xpRequired: 60000, title: 'Všemocný', perks: ['+55% XP bonus'], color: '#ff9800' },
  { level: 25, xpRequired: 70000, title: 'Expert', perks: ['Odznak "Expert"', '+58% XP bonus'], color: '#f44336' },
  { level: 26, xpRequired: 82000, title: 'Profík', perks: ['+60% XP bonus'], color: '#e91e63' },
  { level: 27, xpRequired: 96000, title: 'Guru', perks: ['+62% XP bonus'], color: '#00bcd4' },
  { level: 28, xpRequired: 112000, title: 'Mentor', perks: ['+65% XP bonus'], color: '#673ab7' },
  { level: 29, xpRequired: 130000, title: 'Velmistr', perks: ['+68% XP bonus'], color: '#ff5722' },
  { level: 30, xpRequired: 150000, title: 'Majster', perks: ['Odznak "Majster"', '+70% XP bonus', 'Zlatý titul'], color: '#ffc107' },
];

export function calculateLevel(xp: number): { level: number; title: string; color: string; xpForCurrent: number; xpForNext: number; progress: number; perks: string[] } {
  let currentLevel = 1;
  let currentThreshold = LEVEL_THRESHOLDS[0];
  let nextThreshold = LEVEL_THRESHOLDS[1];

  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i].xpRequired) {
      currentLevel = LEVEL_THRESHOLDS[i].level;
      currentThreshold = LEVEL_THRESHOLDS[i];
      if (i < LEVEL_THRESHOLDS.length - 1) {
        nextThreshold = LEVEL_THRESHOLDS[i + 1];
      } else {
        nextThreshold = { ...LEVEL_THRESHOLDS[i], xpRequired: LEVEL_THRESHOLDS[i].xpRequired + 50000 };
      }
    } else {
      break;
    }
  }

  const xpForCurrent = xp - currentThreshold.xpRequired;
  const xpForNext = nextThreshold.xpRequired - currentThreshold.xpRequired;
  const progress = Math.min(100, Math.round((xpForCurrent / xpForNext) * 100));

  return {
    level: currentLevel,
    title: currentThreshold.title,
    color: currentThreshold.color,
    xpForCurrent,
    xpForNext,
    progress,
    perks: currentThreshold.perks
  };
}

export function getXPForAction(action: string): number {
  const xpRates: Record<string, number> = {
    'task_complete': 10,
    'course_complete': 50,
    'mission_complete': 200,
    'skill_unlock': 25,
    'job_applied': 15,
    'interview': 50,
    'offer': 200,
    'streak_bonus': 5,
    'article_read': 5,
    'article_written': 30,
    'lesson_complete': 15,
    'quiz_pass': 10,
    'project_complete': 100,
    'chat_with_akize': 2,
    'daily_login': 5,
    'first_course_module': 10
  };

  return xpRates[action] || 5;
}

export function getLevelTitle(level: number): string {
  const threshold = LEVEL_THRESHOLDS.find(t => t.level === level);
  return threshold?.title || 'Neznámý';
}

export function getLevelColor(level: number): string {
  const threshold = LEVEL_THRESHOLDS.find(t => t.level === level);
  return threshold?.color || '#78909c';
}

export function getPerksForLevel(level: number): string[] {
  const threshold = LEVEL_THRESHOLDS.find(t => t.level === level);
  return threshold?.perks || [];
}

export function formatXP(xp: number): string {
  if (xp >= 1000000) {
    return (xp / 1000000).toFixed(1) + 'M';
  }
  if (xp >= 1000) {
    return (xp / 1000).toFixed(1) + 'K';
  }
  return xp.toString();
}
