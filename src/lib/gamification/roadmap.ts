export type RoadmapPhase = 'foundation' | 'exploration' | 'specialization' | 'mastery' | 'expert';

export type RoadmapStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface RoadmapPhaseData {
  id: RoadmapPhase;
  title: string;
  description: string;
  minLevel: number;
  duration: string;
  goals: string[];
  skills: string[];
  courses: string[];
  missions: string[];
  rewards: {
    xp: number;
    badge: string;
    title: string;
  };
}

export const ROADMAP_PHASES: RoadmapPhaseData[] = [
  {
    id: 'foundation',
    title: 'Základy',
    description: 'Nauč se základy a vybuduj pevné základy pro svou kariéru',
    minLevel: 1,
    duration: '1-3 měsíce',
    goals: [
      'Pochop základní koncepty programování',
      'Nauč se pracovat s alespoň jedním programovacím jazykem',
      'Vytvoř svůj první projekt',
      'Pochop základy práce s daty'
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'Git', 'Základy algoritmů'],
    courses: ['Úvod do programování', 'Web Development základy', 'Git pro začátečníky'],
    missions: ['portfolio'],
    rewards: {
      xp: 500,
      badge: '🌱',
      title: 'Začátečník'
    }
  },
  {
    id: 'exploration',
    title: 'Průzkum',
    description: 'Objevuj různé oblasti a najdi svou specializaci',
    minLevel: 5,
    duration: '2-4 měsíce',
    goals: [
      'Vyzkoušej alespoň 3 různé oblasti IT',
      'Dokonč 5 kurzů v různých kategoriích',
      'Identifikuj své silné stránky',
      'Vytvoř 2-3 menší projekty'
    ],
    skills: ['Python', 'Databáze', 'REST API', 'Základy ML', 'Testování'],
    courses: ['Python pro začátečníky', 'Databáze a SQL', 'API Development'],
    missions: ['fake-news-detector', 'environmental-impact-analyzer'],
    rewards: {
      xp: 800,
      badge: '🔍',
      title: 'Průzkumník'
    }
  },
  {
    id: 'specialization',
    title: 'Specializace',
    description: 'Vyber si specializaci a prohlub své znalosti',
    minLevel: 10,
    duration: '3-6 měsíců',
    goals: [
      'Vyber si kariérní cestu',
      'Dokonč pokročilé kurzy ve své specializaci',
      'Vytvoř komplexní projekt',
      'Začni budovat portfolio'
    ],
    skills: ['Pokročilý JavaScript', 'Framework dle volby', 'Cloud základy', 'DevOps'],
    courses: ['Pokročilý React/Next.js', 'Cloud Computing', 'Microservices'],
    missions: ['cybersecurity-threat-detector', 'realtime-video-analytics'],
    rewards: {
      xp: 1500,
      badge: '🎯',
      title: 'Specialista'
    }
  },
  {
    id: 'mastery',
    title: 'Mistrovství',
    description: 'Staň se expertem ve své oblasti',
    minLevel: 15,
    duration: '6-12 měsíců',
    goals: [
      'Dosáhni úrovně, kdy můžeš učit ostatní',
      'Přispívej do open source',
      'Vytvoř vlastní projekt s reálným dopadem',
      'Získej první pracovní nabídku nebo klienty'
    ],
    skills: ['Architektura', 'Performance', 'Security', 'Mentoring'],
    courses: ['System Design', 'Advanced Security', 'Leadership'],
    missions: ['iot-anomaly-detection', 'deepfake-detection'],
    rewards: {
      xp: 2500,
      badge: '🏆',
      title: 'Mistr'
    }
  },
  {
    id: 'expert',
    title: 'Expert',
    description: 'Dosáhni nejvyšší úrovně a stal se leaderem',
    minLevel: 25,
    duration: '12+ měsíců',
    goals: [
      'Staň se uznávaným expertem v oboru',
      'Mentoring dalších',
      'Vedoucí role nebo vlastní podnikání',
      'Přispívání do komunity a konference'
    ],
    skills: ['Strategické myšlení', 'Komunikace', 'Business Acumen', 'Innovation'],
    courses: ['Executive Leadership', 'Business Strategy', 'Innovation Management'],
    missions: ['nmt-low-resource-languages', 'forest-fire-prediction'],
    rewards: {
      xp: 5000,
      badge: '👑',
      title: 'Expert'
    }
  }
];

export const CAREER_PATHS = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    icon: '🎨',
    description: 'Tvoř uživatelská rozhraní a webové aplikace',
    phases: ['foundation', 'exploration', 'specialization', 'mastery', 'expert'] as RoadmapPhase[],
    skills: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript', 'Next.js'],
    salary: { min: 40000, max: 120000 },
    demand: 'vysoká'
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    icon: '⚙️',
    description: 'Vytvářej serverové aplikace a API',
    phases: ['foundation', 'exploration', 'specialization', 'mastery', 'expert'] as RoadmapPhase[],
    skills: ['Python/Java/Go', 'Databáze', 'API Design', 'Cloud', 'Microservices'],
    salary: { min: 45000, max: 130000 },
    demand: 'vysoká'
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    icon: '🔄',
    description: 'Ovládni celý vývojový stack',
    phases: ['foundation', 'exploration', 'specialization', 'mastery', 'expert'] as RoadmapPhase[],
    skills: ['Frontend + Backend', 'DevOps', 'Databáze', 'Cloud'],
    salary: { min: 50000, max: 150000 },
    demand: 'velmi vysoká'
  },
  {
    id: 'datascience',
    title: 'Data Scientist',
    icon: '📊',
    description: 'Analyzuj data a vytvářej ML modely',
    phases: ['foundation', 'exploration', 'specialization', 'mastery', 'expert'] as RoadmapPhase[],
    skills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Deep Learning'],
    salary: { min: 50000, max: 180000 },
    demand: 'vysoká'
  },
  {
    id: 'cybersecurity',
    title: 'Security Specialist',
    icon: '🛡️',
    description: 'Chraň systémy a data před hrozbami',
    phases: ['foundation', 'exploration', 'specialization', 'mastery', 'expert'] as RoadmapPhase[],
    skills: ['Networking', 'Linux', 'Penetration Testing', 'Security Auditing', 'Incident Response'],
    salary: { min: 50000, max: 150000 },
    demand: 'velmi vysoká'
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    icon: '🚀',
    description: 'Automatizuj a zefektivni vývojový proces',
    phases: ['foundation', 'exploration', 'specialization', 'mastery', 'expert'] as RoadmapPhase[],
    skills: ['Linux', 'Docker/Kubernetes', 'CI/CD', 'Cloud', 'Scripting'],
    salary: { min: 45000, max: 140000 },
    demand: 'vysoká'
  },
  {
    id: 'mobile',
    title: 'Mobile Developer',
    icon: '📱',
    description: 'Tvoř mobilní aplikace',
    phases: ['foundation', 'exploration', 'specialization', 'mastery', 'expert'] as RoadmapPhase[],
    skills: ['React Native/Flutter', 'iOS/Android', 'API Integration', 'UI/UX'],
    salary: { min: 40000, max: 120000 },
    demand: 'střední-vysoká'
  },
  {
    id: 'ai_ml',
    title: 'AI/ML Engineer',
    icon: '🤖',
    description: 'Vyvíjej umělou inteligenci a ML systémy',
    phases: ['foundation', 'exploration', 'specialization', 'mastery', 'expert'] as RoadmapPhase[],
    skills: ['Python', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps'],
    salary: { min: 60000, max: 200000 },
    demand: 'velmi vysoká'
  }
];

export function getPhaseForLevel(level: number): RoadmapPhaseData | null {
  const sortedPhases = [...ROADMAP_PHASES].sort((a, b) => b.minLevel - a.minLevel);
  return sortedPhases.find(p => level >= p.minLevel) || null;
}

export function getNextPhase(currentPhase: RoadmapPhase): RoadmapPhaseData | null {
  const currentIndex = ROADMAP_PHASES.findIndex(p => p.id === currentPhase);
  if (currentIndex < ROADMAP_PHASES.length - 1) {
    return ROADMAP_PHASES[currentIndex + 1];
  }
  return null;
}

export function getPhaseProgress(phase: RoadmapPhase, userStats: { level: number; completedSkills: string[]; completedCourses: string[]; completedMissions: string[] }): { progress: number; completedGoals: number; totalGoals: number } {
  const phaseData = ROADMAP_PHASES.find(p => p.id === phase);
  if (!phaseData) return { progress: 0, completedGoals: 0, totalGoals: 0 };

  let completedGoals = 0;
  phaseData.goals.forEach(goal => {
    if (goal.includes('základní koncepty') && userStats.level >= 2) completedGoals++;
    if (goal.includes('programovacím jazykem') && userStats.completedSkills.length >= 2) completedGoals++;
    if (goal.includes('první projekt') && userStats.completedMissions.length >= 1) completedGoals++;
    if (goal.includes('3 různé oblasti') && userStats.completedSkills.length >= 5) completedGoals++;
    if (goal.includes('5 kurzů') && userStats.completedCourses.length >= 5) completedGoals++;
    if (goal.includes('silné stránky') && userStats.level >= 7) completedGoals++;
    if (goal.includes('kariérní cestu') && userStats.level >= 10) completedGoals++;
    if (goal.includes('komplexní projekt') && userStats.completedMissions.length >= 3) completedGoals++;
    if (goal.includes('portfolio') && userStats.level >= 15) completedGoals++;
    if (goal.includes('učit ostatní') && userStats.level >= 20) completedGoals++;
    if (goal.includes('open source') && userStats.completedMissions.length >= 5) completedGoals++;
    if (goal.includes('reálným dopadem') && userStats.level >= 25) completedGoals++;
    if (goal.includes('pracovní nabídku') && userStats.level >= 25) completedGoals++;
    if (goal.includes('expertem') && userStats.level >= 30) completedGoals++;
    if (goal.includes('Mentoring') && userStats.level >= 35) completedGoals++;
  });

  return {
    progress: Math.min(100, Math.round((completedGoals / phaseData.goals.length) * 100)),
    completedGoals,
    totalGoals: phaseData.goals.length
  };
}

export function getPathColor(pathId: string): string {
  const colors: Record<string, string> = {
    frontend: '#61dafb',
    backend: '#4caf50',
    fullstack: '#ff9800',
    datascience: '#9c27b0',
    cybersecurity: '#f44336',
    devops: '#00bcd4',
    mobile: '#e91e63',
    ai_ml: '#673ab7'
  };
  return colors[pathId] || '#78909c';
}
