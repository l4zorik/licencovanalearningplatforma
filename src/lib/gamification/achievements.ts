export type AchievementRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export type AchievementCategory =
  | 'progress'
  | 'learning'
  | 'career'
  | 'social'
  | 'streak'
  | 'skill'
  | 'mission'
  | 'special'
  | 'electrician'
  | 'mechanic'
  | 'welder'
  | 'entrepreneur'
  | 'programmer'
  | 'cnc';

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
  },

  // Elektrikář - Electrician
  {
    id: 'electrician_beginner',
    title: 'Začínající Elektrikář',
    description: 'Dokonč kurz základů elektrotechniky',
    icon: '⚡',
    category: 'electrician',
    rarity: 'Common',
    xpReward: 50,
    condition: { type: 'courses_completed_electrician', value: 1 },
    secret: false
  },
  {
    id: 'electrician_basic_tools',
    title: 'Základní Nástroje',
    description: 'Ovládni základní elektrické nástroje',
    icon: '🔧',
    category: 'electrician',
    rarity: 'Common',
    xpReward: 75,
    condition: { type: 'skills_electrician', value: 3 },
    secret: false
  },
  {
    id: 'electrician_first_installation',
    title: 'První Instalace',
    description: 'Proveď svou první elektrickou instalaci',
    icon: '💡',
    category: 'electrician',
    rarity: 'Rare',
    xpReward: 150,
    condition: { type: 'projects_electrician', value: 1 },
    secret: false
  },
  {
    id: 'electrician_safety_certified',
    title: 'Bezpečnostní Certifikát',
    description: 'Získej certifikát bezpečnosti práce',
    icon: '🛡️',
    category: 'electrician',
    rarity: 'Rare',
    xpReward: 200,
    condition: { type: 'certificates_electrician', value: 1 },
    secret: false
  },
  {
    id: 'electrician_advanced_circuits',
    title: 'Pokročilé Obvody',
    description: 'Nauč se navrhovat pokročilé elektrické obvody',
    icon: '🔌',
    category: 'electrician',
    rarity: 'Epic',
    xpReward: 300,
    condition: { type: 'advanced_skills_electrician', value: 5 },
    secret: false
  },
  {
    id: 'electrician_master_electrician',
    title: 'Mistr Elektrikář',
    description: 'Staň se certifikovaným mistrem elektrikářem',
    icon: '👑',
    category: 'electrician',
    rarity: 'Legendary',
    xpReward: 500,
    condition: { type: 'master_certification_electrician', value: 1 },
    secret: false
  },

  // Automechanik - Mechanic
  {
    id: 'mechanic_beginner',
    title: 'Začínající Mechanik',
    description: 'Dokonč kurz základů automechaniky',
    icon: '🔩',
    category: 'mechanic',
    rarity: 'Common',
    xpReward: 50,
    condition: { type: 'courses_completed_mechanic', value: 1 },
    secret: false
  },
  {
    id: 'mechanic_oil_change',
    title: 'Výměna Oleje',
    description: 'Proveď svou první výměnu motorového oleje',
    icon: '🛢️',
    category: 'mechanic',
    rarity: 'Common',
    xpReward: 75,
    condition: { type: 'repairs_mechanic', value: 1 },
    secret: false
  },
  {
    id: 'mechanic_engine_repair',
    title: 'Oprava Motoru',
    description: 'Oprav svůj první motor',
    icon: '🚗',
    category: 'mechanic',
    rarity: 'Rare',
    xpReward: 200,
    condition: { type: 'engine_repairs_mechanic', value: 1 },
    secret: false
  },
  {
    id: 'mechanic_diagnostic_expert',
    title: 'Diagnostický Expert',
    description: 'Získej certifikát diagnostiky vozidel',
    icon: '🔍',
    category: 'mechanic',
    rarity: 'Epic',
    xpReward: 350,
    condition: { type: 'diagnostic_certification_mechanic', value: 1 },
    secret: false
  },
  {
    id: 'mechanic_electric_vehicles',
    title: 'Elektromobily',
    description: 'Specializuj se na opravu elektromobilů',
    icon: '🔋',
    category: 'mechanic',
    rarity: 'Legendary',
    xpReward: 500,
    condition: { type: 'ev_specialization_mechanic', value: 1 },
    secret: false
  },
  {
    id: 'mechanic_lakovani_beginner',
    title: 'Začínající Lakýrník',
    description: 'Dokonč kurz základů lakování',
    icon: '🎨',
    category: 'mechanic',
    rarity: 'Common',
    xpReward: 50,
    condition: { type: 'courses_completed_lakovani', value: 1 },
    secret: false
  },
  {
    id: 'mechanic_priprava_expert',
    title: 'Expert na Přípravu',
    description: 'Dokonč kurz přípravy povrchu',
    icon: '🔧',
    category: 'mechanic',
    rarity: 'Rare',
    xpReward: 100,
    condition: { type: 'courses_completed_priprava', value: 1 },
    secret: false
  },
  {
    id: 'mechanic_tmeleni_master',
    title: 'Mistr Tmelení',
    description: 'Dokonč kurz tmelení karoserie',
    icon: '🛠️',
    category: 'mechanic',
    rarity: 'Epic',
    xpReward: 150,
    condition: { type: 'courses_completed_tmeleni', value: 1 },
    secret: false
  },
  {
    id: 'mechanic_color_spectrum',
    title: 'Barevné Spektrum',
    description: 'Získej znalost barevného spektra',
    icon: '🌈',
    category: 'mechanic',
    rarity: 'Rare',
    xpReward: 120,
    condition: { type: 'courses_completed_barevne_spektrum', value: 1 },
    secret: false
  },
  {
    id: 'mechanic_lakovaci_pistole',
    title: 'Mistr Lakovací Pistole',
    description: 'Dokonč kurz obsluhy lakovacích pistolí',
    icon: '🔫',
    category: 'mechanic',
    rarity: 'Epic',
    xpReward: 180,
    condition: { type: 'courses_completed_lakovaci_pistole', value: 1 },
    secret: false
  },

  // Svářeč - Welder
  {
    id: 'welder_beginner',
    title: 'Začínající Svářeč',
    description: 'Dokonč kurz základů svařování',
    icon: '🔥',
    category: 'welder',
    rarity: 'Common',
    xpReward: 50,
    condition: { type: 'courses_completed_welder', value: 1 },
    secret: false
  },
  {
    id: 'welder_first_weld',
    title: 'První Svař',
    description: 'Proveď svůj první úspěšný svař',
    icon: '⚡',
    category: 'welder',
    rarity: 'Common',
    xpReward: 75,
    condition: { type: 'successful_welds_welder', value: 1 },
    secret: false
  },
  {
    id: 'welder_mig_tig',
    title: 'MIG/TIG Specialista',
    description: 'Ovládni MIG a TIG svařování',
    icon: '🔧',
    category: 'welder',
    rarity: 'Rare',
    xpReward: 200,
    condition: { type: 'welding_techniques_welder', value: 2 },
    secret: false
  },
  {
    id: 'welder_certified',
    title: 'Certifikovaný Svářeč',
    description: 'Získej certifikát svařování',
    icon: '📜',
    category: 'welder',
    rarity: 'Epic',
    xpReward: 350,
    condition: { type: 'certification_welder', value: 1 },
    secret: false
  },
  {
    id: 'welder_artisan',
    title: 'Umělecký Svářeč',
    description: 'Vytvoř umělecké svařované dílo',
    icon: '🎨',
    category: 'welder',
    rarity: 'Legendary',
    xpReward: 500,
    condition: { type: 'artistic_projects_welder', value: 1 },
    secret: false
  },

  // Podnikatel - Entrepreneur
  {
    id: 'entrepreneur_beginner',
    title: 'Začínající Podnikatel',
    description: 'Dokonč kurz základů podnikání',
    icon: '💼',
    category: 'entrepreneur',
    rarity: 'Common',
    xpReward: 50,
    condition: { type: 'courses_completed_entrepreneur', value: 1 },
    secret: false
  },
  {
    id: 'entrepreneur_first_business',
    title: 'První Podnik',
    description: 'Založ svůj první malý podnik',
    icon: '🏪',
    category: 'entrepreneur',
    rarity: 'Rare',
    xpReward: 200,
    condition: { type: 'business_started_entrepreneur', value: 1 },
    secret: false
  },
  {
    id: 'entrepreneur_marketing',
    title: 'Marketing Guru',
    description: 'Ovládni digitální marketing',
    icon: '📈',
    category: 'entrepreneur',
    rarity: 'Epic',
    xpReward: 350,
    condition: { type: 'marketing_skills_entrepreneur', value: 5 },
    secret: false
  },
  {
    id: 'entrepreneur_scalable',
    title: 'Škálovatelný Podnik',
    description: 'Vybuduj škálovatelný business model',
    icon: '📊',
    category: 'entrepreneur',
    rarity: 'Legendary',
    xpReward: 500,
    condition: { type: 'scalable_business_entrepreneur', value: 1 },
    secret: false
  },

  // Programátor - Programmer
  {
    id: 'programmer_beginner',
    title: 'Začínající Programátor',
    description: 'Dokonč kurz základů programování',
    icon: '💻',
    category: 'programmer',
    rarity: 'Common',
    xpReward: 50,
    condition: { type: 'courses_completed_programmer', value: 1 },
    secret: false
  },
  {
    id: 'programmer_first_code',
    title: 'První Kód',
    description: 'Napiš svůj první program',
    icon: '👨‍💻',
    category: 'programmer',
    rarity: 'Common',
    xpReward: 75,
    condition: { type: 'programs_written_programmer', value: 1 },
    secret: false
  },
  {
    id: 'programmer_web_developer',
    title: 'Web Developer',
    description: 'Vytvoř svou první webovou aplikaci',
    icon: '🌐',
    category: 'programmer',
    rarity: 'Rare',
    xpReward: 200,
    condition: { type: 'web_apps_programmer', value: 1 },
    secret: false
  },
  {
    id: 'programmer_fullstack',
    title: 'Full Stack Developer',
    description: 'Ovládni frontend i backend',
    icon: '⚛️',
    category: 'programmer',
    rarity: 'Epic',
    xpReward: 350,
    condition: { type: 'fullstack_projects_programmer', value: 3 },
    secret: false
  },
  {
    id: 'programmer_ai_engineer',
    title: 'AI Inženýr',
    description: 'Vyvíjej AI aplikace',
    icon: '🤖',
    category: 'programmer',
    rarity: 'Legendary',
    xpReward: 500,
    condition: { type: 'ai_projects_programmer', value: 1 },
    secret: false
  },

  // CNC Obráběč - CNC Machinist
  {
    id: 'cnc_beginner',
    title: 'Začínající CNC Obráběč',
    description: 'Dokonč kurz základů CNC obrábění',
    icon: '⚙️',
    category: 'cnc',
    rarity: 'Common',
    xpReward: 50,
    condition: { type: 'courses_completed_cnc', value: 1 },
    secret: false
  },
  {
    id: 'cnc_first_program',
    title: 'První CNC Program',
    description: 'Naprogramuj svůj první CNC stroj',
    icon: '📐',
    category: 'cnc',
    rarity: 'Common',
    xpReward: 75,
    condition: { type: 'cnc_programs_cnc', value: 1 },
    secret: false
  },
  {
    id: 'cnc_precision_machining',
    title: 'Přesné Obrábění',
    description: 'Ovládni přesné CNC obrábění',
    icon: '🔬',
    category: 'cnc',
    rarity: 'Rare',
    xpReward: 200,
    condition: { type: 'precision_projects_cnc', value: 5 },
    secret: false
  },
  {
    id: 'cnc_5axis_expert',
    title: '5-Axis Expert',
    description: 'Ovládni 5-osé CNC obrábění',
    icon: '🎯',
    category: 'cnc',
    rarity: 'Epic',
    xpReward: 350,
    condition: { type: '5axis_projects_cnc', value: 3 },
    secret: false
  },
  {
    id: 'cnc_master_craftsman',
    title: 'Mistr Řemeslník',
    description: 'Staň se mistrem CNC obrábění',
    icon: '🏆',
    category: 'cnc',
    rarity: 'Legendary',
    xpReward: 500,
    condition: { type: 'master_certification_cnc', value: 1 },
    secret: false
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
    case 'electrician': return '⚡';
    case 'mechanic': return '🔧';
    case 'welder': return '🔥';
    case 'entrepreneur': return '💼';
    case 'programmer': return '💻';
    case 'cnc': return '⚙️';
    default: return '🏅';
  }
}
