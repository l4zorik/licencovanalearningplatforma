import { Project, ProjectTemplate } from '@/types';

export const PROJECT_CATEGORIES = [
  { id: 'learning', name: '🎓 Učení', icon: '📚', color: '#4CAF50' },
  { id: 'development', name: '💻 Vývoj', icon: '💻', color: '#2196F3' },
  { id: 'automation', name: '⚙️ Automatizace', icon: '🤖', color: '#FF9800' },
  { id: 'data', name: '📊 Data', icon: '📈', color: '#9C27B0' },
  { id: 'security', name: '🔒 Bezpečnost', icon: '🛡️', color: '#F44336' },
  { id: 'infrastructure', name: '🏗️ Infrastruktura', icon: '☁️', color: '#607D8B' },
  { id: 'research', name: '🔬 Výzkum', icon: '🔬', color: '#00BCD4' },
  { id: 'personal', name: '🌱 Osobní rozvoj', icon: '🌱', color: '#8BC34A' },
  { id: 'health', name: '💪 Zdraví', icon: '💪', color: '#E91E63' },
  { id: 'finance', name: '💰 Finance', icon: '💰', color: '#FFD700' },
  { id: 'relationships', name: '💕 Vztahy', icon: '💕', color: '#FF69B4' },
  { id: 'intellect', name: '🧠 Intelekt', icon: '🧠', color: '#00CED1' },
  { id: 'lifestyle', name: '🏠 Bydlení', icon: '🏠', color: '#FF7F50' },
];

export const ALGORITHM_TYPE_ICONS: Record<string, string> = {
  learning: '📖',
  coding: '💻',
  optimization: '⚡',
  data_analysis: '📊',
  research: '🔍',
  design: '🎨',
  debugging: '🐛',
  testing: '✅',
  documentation: '📝',
  deployment: '🚀',
  security: '🔐',
  networking: '🌐',
  automation: '⚙️',
  monitoring: '👁️',
  planning: '📋',
  marketing: '📈',
};

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'platform-dev',
    title: 'Learning Platform Vývoj',
    description: 'Vývoj a rozšíření vzdělávací platformy s gamifikací',
    category: 'development',
    defaultGoals: ['Dokončit core funkce', 'Přidat 100+ skills', 'Implementovat AI asistenta'],
    suggestedMilestones: [
      'Základní architektura',
      'User authentication',
      'Skills board',
      'Job board',
      'Gamifikace systém',
      'AI integrace'
    ],
    suggestedAlgorithms: ['coding', 'testing', 'documentation', 'deployment', 'security'],
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL'],
    technologies: ['Next.js', 'Prisma', 'React Bootstrap'],
    estimatedHours: 500,
    xpReward: 10000,
    color: '#2196F3',
    icon: '🚀'
  },
  {
    id: 'cnc-skills-mastery',
    title: 'CNC Dovednosti Mastery',
    description: 'Osvojení pokročilých CNC programovacích a strojírenských dovedností',
    category: 'learning',
    defaultGoals: ['Naučit G-Code', 'Získat certifikaci', 'Dokončit 10 projektů'],
    suggestedMilestones: [
      'Základy soustružení',
      'CNC programování',
      'Fanuc/Siemens',
      'CAM systémy',
      'Kontrola kvality',
      'Praktický projekt'
    ],
    suggestedAlgorithms: ['learning', 'coding', 'data_analysis'],
    skills: ['CNC Programming', 'G-Code', 'CAD', 'CAM', 'Metrology'],
    technologies: ['Fanuc', 'Siemens', 'Mastercam', 'SolidWorks'],
    estimatedHours: 300,
    xpReward: 5000,
    color: '#607D8B',
    icon: '⚙️'
  },
  {
    id: 'ai-agents-system',
    title: 'AI Agenti System',
    description: 'Vývoj systému AI agentů pro automatizaci úkolů',
    category: 'automation',
    defaultGoals: ['Vytvořit 5 AI agentů', 'Implementovat learning loop', 'Nasadit do produkce'],
    suggestedMilestones: [
      'AI agent architektura',
      'První agent',
      'Multi-agent komunikace',
      'Learning mechanism',
      'Monitoring dashboard',
      'Production deployment'
    ],
    suggestedAlgorithms: ['coding', 'automation', 'monitoring', 'security'],
    skills: ['Python', 'Machine Learning', 'API Integration', 'Docker'],
    technologies: ['Python', 'OpenAI API', 'LangChain', 'PostgreSQL'],
    estimatedHours: 200,
    xpReward: 8000,
    color: '#9C27B0',
    icon: '🤖'
  },
  {
    id: 'license-education',
    title: 'Software License Education',
    description: 'Vzdělávací projekt o softwarových licencích a open source',
    category: 'learning',
    defaultGoals: ['Naučit 10 licencí', 'Vytvořit prezentace', 'Pomoci ostatním'],
    suggestedMilestones: [
      'MIT & BSD License',
      'GPL Family (GPLv3, LGPL, AGPL)',
      'Apache & Creative Commons',
      'License Compliance',
      'Real-world cases',
      'Teaching others'
    ],
    suggestedAlgorithms: ['learning', 'documentation', 'research'],
    skills: ['Legal Knowledge', 'Open Source', 'Documentation'],
    technologies: ['Documentation', 'Presentations', 'Git'],
    estimatedHours: 50,
    xpReward: 1500,
    color: '#4CAF50',
    icon: '📜'
  },
  {
    id: 'cybersecurity-mastery',
    title: 'Cybersecurity Mastery',
    description: 'Osvojení kyberbezpečnostních dovedností a certifikace',
    category: 'security',
    defaultGoals: ['Získat Security+', 'Dokončit penetration testing', 'Harden 10 systémů'],
    suggestedMilestones: [
      'Networking fundamentals',
      'Security+ příprava',
      'Penetration testing',
      'Incident response',
      'Security auditing',
      'Continuous monitoring'
    ],
    suggestedAlgorithms: ['security', 'networking', 'monitoring', 'testing'],
    skills: ['Network Security', 'Penetration Testing', 'Incident Response', 'Cryptography'],
    technologies: ['Kali Linux', 'Metasploit', 'Wireshark', 'SIEM'],
    estimatedHours: 400,
    xpReward: 7500,
    color: '#F44336',
    icon: '🛡️'
  },
  {
    id: 'data-pipeline',
    title: 'Data Pipeline System',
    description: 'Vývoj robustního data pipeline pro analýzu',
    category: 'data',
    defaultGoals: ['Vytvořit ETL pipeline', 'Nasadit monitoring', 'Zpracovat 1M+ záznamů'],
    suggestedMilestones: [
      'Data sources integration',
      'ETL pipeline',
      'Data quality checks',
      'Real-time processing',
      'Analytics dashboard',
      'Performance optimization'
    ],
    suggestedAlgorithms: ['data_analysis', 'automation', 'monitoring'],
    skills: ['Python', 'SQL', 'Apache Kafka', 'Apache Spark', 'Docker'],
    technologies: ['Python', 'PostgreSQL', 'Redis', 'Docker'],
    estimatedHours: 150,
    xpReward: 4500,
    color: '#FF9800',
    icon: '📊'
  },
  {
    id: 'peaceful-sleep',
    title: 'Klidný Spánek',
    description: 'Dosáhnutí kvalitního a pravidelného spánku pro optimální regeneraci',
    category: 'health',
    defaultGoals: ['8h spánku denně', 'Usínání do 23:00', 'Bez probuzení v noci'],
    suggestedMilestones: [
      'Pravidelný spací režim',
      'Eliminace modrého světla večer',
      'Optimální teplota pokoje',
      'Žádná kofein po 14:00',
      'Meditace před spaním',
      '100 dní kvalitního spánku'
    ],
    suggestedAlgorithms: ['learning', 'automation', 'monitoring'],
    skills: ['Discipline', 'Time Management', 'Stress Management'],
    technologies: ['Sleep Tracker', 'Meditation Apps', 'Smart Alarm'],
    estimatedHours: 50,
    xpReward: 2000,
    color: '#6A5ACD',
    icon: '🌙'
  },
  {
    id: 'rent-money',
    title: 'Peníze na Nájem',
    description: 'Stabilní příjem pro pokrytí nájmu a bydlení',
    category: 'finance',
    defaultGoals: ['15 000 Kč měsíčně na nájem', '3 měsíční rezerva', 'Automatizace plateb'],
    suggestedMilestones: [
      'Stabilní příjem 15 000 Kč',
      'Vytvoření rozpočtu',
      'Automatické platby nájmu',
      '3 měsíční rezerva',
      'Růst příjmu o 20%',
      'Investování přebytků'
    ],
    suggestedAlgorithms: ['data_analysis', 'automation', 'documentation'],
    skills: ['Budgeting', 'Financial Planning', 'Income Diversification'],
    technologies: ['Budget Apps', 'Banking Tools', 'Investment Platforms'],
    estimatedHours: 30,
    xpReward: 1500,
    color: '#32CD32',
    icon: '🏠'
  },
  {
    id: 'food-money',
    title: 'Peníze na Jídlo',
    description: 'Zdravá a vyvážená strava bez finančního stresu',
    category: 'lifestyle',
    defaultGoals: ['3000 Kč měsíčně na jídlo', 'Vaření doma 80%', 'Žádné plýtvání'],
    suggestedMilestones: [
      'Týdenní plánování jídel',
      'Nákupní seznam před nákupem',
      'Vaření 5x týdně',
      'Zdravé svačiny',
      'Minimalizace eat-out',
      'Úspora 1000 Kč měsíčně'
    ],
    suggestedAlgorithms: ['planning', 'automation', 'data_analysis'],
    skills: ['Meal Planning', 'Cooking', 'Financial Discipline'],
    technologies: ['Recipe Apps', 'Shopping Lists', 'Calorie Trackers'],
    estimatedHours: 40,
    xpReward: 1200,
    color: '#FF6347',
    icon: '🥗'
  },
  {
    id: 'energy-money',
    title: 'Peníze na Energie',
    description: 'Pokrytí nákladů na elektřinu, plyn a vodu',
    category: 'lifestyle',
    defaultGoals: ['2000 Kč měsíčně na energie', 'Snížení spotřeby o 20%', 'Optimalizace nákladů'],
    suggestedMilestones: [
      'Monitoring spotřeby',
      'Výměna žárovek za LED',
      'Optimalizace vytápění',
      'Efektivní spotřebiče',
      'Solární panely',
      'Roční úspora 5000 Kč'
    ],
    suggestedAlgorithms: ['optimization', 'monitoring', 'data_analysis'],
    skills: ['Energy Efficiency', 'Home Maintenance', 'Cost Optimization'],
    technologies: ['Smart Meters', 'Energy Monitors', 'Smart Home'],
    estimatedHours: 25,
    xpReward: 1000,
    color: '#1E90FF',
    icon: '⚡'
  },
  {
    id: 'car-money',
    title: 'Auto & Řidičák',
    description: 'Provoz auta, řidičský průkaz a potřeby do auta',
    category: 'lifestyle',
    defaultGoals: ['5000 Kč měsíčně na auto', 'Řidičák skupiny B', 'Bezpečné auto'],
    suggestedMilestones: [
      'Získání řidičáku',
      'Nákup spolehlivého auta',
      'Povinné ručení a havarijní pojištění',
      'Pravidelný servis',
      'Tankování efektivně',
      'Roční rozpočet 60 000 Kč'
    ],
    suggestedAlgorithms: ['planning', 'documentation', 'monitoring'],
    skills: ['Driving', 'Car Maintenance', 'Financial Planning'],
    technologies: ['GPS Navigation', 'Fuel Trackers', 'Service Reminders'],
    estimatedHours: 60,
    xpReward: 2500,
    color: '#DC143C',
    icon: '🚗'
  },
  {
    id: 'business-template',
    title: 'Business Šablona',
    description: 'Založení a rozvoj vlastního podnikání nebo side projectu',
    category: 'finance',
    defaultGoals: ['První zákazník', '1000 Kč měsíčně profit', 'Systematický růst'],
    suggestedMilestones: [
      'Nápad a validace',
      'Vytvoření MVP',
      'První zákazník',
      'Profesionální web',
      'Marketing strategy',
      'Stabilní měsíční příjem'
    ],
    suggestedAlgorithms: ['coding', 'design', 'networking', 'documentation', 'marketing'],
    skills: ['Entrepreneurship', 'Marketing', 'Sales', 'Product Development'],
    technologies: ['Website', 'CRM', 'Social Media', 'Payment Gateway'],
    estimatedHours: 200,
    xpReward: 8000,
    color: '#FFD700',
    icon: '🚀'
  },
  {
    id: 'super-intelligence',
    title: 'Super Inteligence',
    description: 'Rozvoj kognitivních schopností a intelektu',
    category: 'intellect',
    defaultGoals: ['Čtení 12 knih ročně', 'Daily learning 1h', 'Nové dovednosti'],
    suggestedMilestones: [
      'Denní čtení 30 minut',
      'Denní učení 1 hodina',
      '12 knih za rok',
      'Nový kurz každý měsíc',
      'Meditace a mozek',
      'Polyglot úroveň'
    ],
    suggestedAlgorithms: ['learning', 'research', 'documentation', 'optimization'],
    skills: ['Critical Thinking', 'Memory', 'Creativity', 'Problem Solving'],
    technologies: ['Learning Platforms', 'Brain Training', 'Language Apps'],
    estimatedHours: 300,
    xpReward: 10000,
    color: '#00CED1',
    icon: '🧠'
  },
   {
    id: 'gym-routine',
    title: 'Posilovna Rutina',
    description: 'Pravidelné tréninky v posilovně pro budování svalů a síly',
    category: 'health',
    defaultGoals: ['Trénink 4x týdně', 'Zvětšení svalů o 5kg', 'Osvojení správné techniky'],
    suggestedMilestones: [
      'Registrace do posilovny',
      'Základní tréninkový plán',
      'Osvojení techniky cviků',
      'Pravidelnost 4x týdně',
      'Pokrok v hmotnostech',
      'Estetické výsledky'
    ],
    suggestedAlgorithms: ['learning', 'optimization', 'monitoring', 'documentation'],
    skills: ['Weight Training', 'Exercise Technique', 'Nutrition', 'Recovery'],
    technologies: ['Gym Equipment', 'Workout Apps', 'Progress Tracking', 'Nutrition Apps'],
    estimatedHours: 120,
    xpReward: 4000,
    color: '#DC143C',
    icon: '🏋️'
  },
  {
    id: 'strength-endurance',
    title: 'Velká Síla a Výdrž',
    description: 'Fyzická kondice, síla a vytrvalost',
    category: 'health',
    defaultGoals: ['Trénink 3x týdně', '100 kg bench press', '10 km běh'],
    suggestedMilestones: [
      'Pravidelný tréninkový režim',
      'Základní síla (50kg bench)',
      'Intermediate síla (80kg bench)',
      'První 5km běh',
      '10km běh pod 60 minut',
      'Pokročilá síla (100kg bench)'
    ],
    suggestedAlgorithms: ['learning', 'optimization', 'monitoring'],
    skills: ['Strength Training', 'Cardio', 'Flexibility', 'Nutrition'],
    technologies: ['Workout Apps', 'Fitness Trackers', 'Nutrition Plans'],
    estimatedHours: 150,
    xpReward: 5000,
    color: '#FF4500',
    icon: '💪'
  },
  {
    id: 'happy-family',
    title: 'Šťastná Rodina',
    description: 'Budování šťastné a zdravé rodinné atmosféry',
    category: 'relationships',
    defaultGoals: ['Kvalitní čas s rodinou 2x týdně', 'Pravidelná komunikace', 'Společné aktivity'],
    suggestedMilestones: [
      'Rodinné večeře',
      'Společné víkendové aktivity',
      'Pravidelná komunikace',
      'Rodinné tradice',
      'Podpora a respekt',
      'Harmonická domácnost'
    ],
    suggestedAlgorithms: ['planning', 'documentation', 'automation'],
    skills: ['Communication', 'Empathy', 'Conflict Resolution', 'Time Management'],
    technologies: ['Family Calendars', 'Photo Sharing', 'Communication Apps'],
    estimatedHours: 100,
    xpReward: 3000,
    color: '#FF69B4',
    icon: '👨‍👩‍👧‍👦'
  },
  {
    id: 'happy-girlfriend',
    title: 'Šťastná Holka',
    description: 'Budování zdravého a šťastného vztahu',
    category: 'relationships',
    defaultGoals: ['Kvalitní čas spolu', 'Otevřená komunikace', 'Vzájemná podpora'],
    suggestedMilestones: [
      'Pravidelná rande',
      'Denní komunikace',
      'Společné koníčky',
      'Podpora cílů partnera',
      'Řešení konfliktů zdravě',
      'Plánování společné budoucnosti'
    ],
    suggestedAlgorithms: ['planning', 'documentation', 'networking'],
    skills: ['Communication', 'Empathy', 'Active Listening', 'Conflict Resolution'],
    technologies: ['Date Planning Apps', 'Relationship Trackers', 'Communication Tools'],
    estimatedHours: 80,
    xpReward: 2500,
    color: '#FF1493',
    icon: '💕'
  },
   {
    id: 'professional-development',
    title: 'Profesní Rozvoj',
    description: 'Rozvoj pracovních dovedností a kariérního růstu',
    category: 'personal',
    defaultGoals: ['Naučit 3 nové dovednosti', 'Získat certifikaci', 'Zvýšit mzdu o 20%'],
    suggestedMilestones: [
      'Analýza současných dovedností',
      'Stanovení kariérních cílů',
      'Kurz nebo školení',
      'Praktické aplikace',
      'Certifikace',
      'Povýšení nebo zvýšení mzdy'
    ],
    suggestedAlgorithms: ['learning', 'documentation', 'networking', 'planning'],
    skills: ['Time Management', 'Communication', 'Leadership', 'Project Management'],
    technologies: ['LinkedIn', 'Learning Platforms', 'Project Management Tools'],
    estimatedHours: 150,
    xpReward: 6000,
    color: '#3F51B5',
    icon: '💼'
  },
   {
    id: 'spiritual-growth',
    title: 'Duchovní Práce',
    description: 'Rozvoj duchovní stránky života, meditace a vnitřní mír',
    category: 'personal',
    defaultGoals: ['Meditace 20 min denně', 'Čtení duchovní literatury', 'Větší vnitřní klid'],
    suggestedMilestones: [
      'Denní meditace 10 minut',
      'Základní meditace techniky',
      'Meditace 20 minut denně',
      'Duchovní literatura',
      'Mindfulness v každodenním životě',
      'Pokročilé duchovní praktiky'
    ],
    suggestedAlgorithms: ['learning', 'documentation', 'monitoring', 'optimization'],
    skills: ['Meditation', 'Mindfulness', 'Self-Awareness', 'Emotional Intelligence'],
    technologies: ['Meditation Apps', 'Journaling Apps', 'Spiritual Books', 'Mindfulness Guides'],
    estimatedHours: 60,
    xpReward: 2500,
    color: '#8A2BE2',
    icon: '🧘'
  },
  {
    id: 'financial-cushion',
    title: 'Finanční Pošťáček',
    description: 'Finanční rezerva pro nečekané výdaje a klid mysli',
    category: 'finance',
    defaultGoals: ['30 000 Kč rezerva', '6 měsíčních výdajů', 'Automatické spoření'],
    suggestedMilestones: [
      'První 10 000 Kč rezerva',
      '30 000 Kč rezerva',
      '3 měsíční výdaje',
      '6 měsíčních výdajů',
      'Automatické měsíční spoření',
      'Investování rezervy'
    ],
    suggestedAlgorithms: ['data_analysis', 'automation', 'documentation'],
    skills: ['Saving', 'Financial Discipline', 'Investment Basics'],
    technologies: ['Savings Accounts', 'Budget Apps', 'Investment Platforms'],
    estimatedHours: 20,
    xpReward: 1500,
    color: '#228B22',
    icon: '🐷'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Learning Platform Vývoj',
    description: 'Hlavní vývojový projekt vzdělávací platformy',
    category: 'development',
    status: 'active',
    priority: 'high',
    goals: ['Dokončit core funkce', 'Přidat gamifikaci', 'Nasadit na produkci'],
    milestones: [
      { id: 'm1', title: 'Základní architektura', description: 'Postavit Next.js app s Prisma', isCompleted: true, completedAt: new Date('2025-01-01'), xpReward: 500, order: 1, targetHours: 4, timeSpent: 300, timerActive: false },
      { id: 'm2', title: 'Skills Board', description: 'Implementovat skills board', isCompleted: true, completedAt: new Date('2025-01-10'), xpReward: 800, order: 2, targetHours: 6, timeSpent: 420, timerActive: false },
      { id: 'm3', title: 'Job Board', description: 'Přidat job board s filtrací', isCompleted: false, xpReward: 1000, order: 3, targetHours: 8, timeSpent: 120, timerActive: false },
      { id: 'm4', title: 'Gamifikace', description: 'XP, achievements, milestones', isCompleted: false, xpReward: 1200, order: 4, targetHours: 10, timeSpent: 0, timerActive: false },
    ],
    algorithms: [
      {
        id: 'alg-1',
        projectId: 'proj-1',
        timestamp: new Date('2025-01-15T10:00:00'),
        type: 'coding',
        title: 'Skills Component Refactor',
        description: 'Refaktoroval jsem Skills komponentu pro lepší performance',
        duration: 180,
        codeSnippets: '// Improved skill rendering logic...',
        outcome: 'success',
        xpEarned: 45,
        tags: ['react', 'optimization']
      },
      {
        id: 'alg-2',
        projectId: 'proj-1',
        timestamp: new Date('2025-01-14T14:30:00'),
        type: 'debugging',
        title: 'Fix Authentication Bug',
        description: 'Opravil jsem bug s NextAuth session',
        duration: 60,
        outcome: 'success',
        xpEarned: 30,
        tags: ['nextauth', 'debugging']
      }
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Prisma'],
    technologies: ['Next.js', 'React Bootstrap', 'Prisma'],
    startDate: new Date('2025-01-01'),
    totalHours: 45,
    xpReward: 10000,
    color: '#2196F3',
    icon: '🚀',
    progress: 35,
    streak: 5,
    linkedGoalId: 'career-growth',
    timerSettings: {
      enabled: true,
      showUrgency: true,
      urgencyThresholds: [75, 50, 25],
      defaultMilestoneHours: 4,
      autoStartTimer: false,
    }
  },
  {
    id: 'proj-2',
    title: 'CNC Dovednosti Mastery',
    description: 'Vzdělávací projekt pro CNC programování',
    category: 'learning',
    status: 'active',
    priority: 'medium',
    goals: ['Naučit G-Code', 'Získat Fanuc certifikaci'],
    milestones: [
      { id: 'm1', title: 'Základy soustružení', description: 'Teoretické základy', isCompleted: true, xpReward: 300, order: 1, targetHours: 3, timeSpent: 180, timerActive: false },
      { id: 'm2', title: 'CNC Programování', description: 'G-Code mastery', isCompleted: false, xpReward: 500, order: 2, targetHours: 5, timeSpent: 60, timerActive: false },
      { id: 'm3', title: 'CAM Systémy', description: 'Mastercam základy', isCompleted: false, xpReward: 600, order: 3, targetHours: 6, timeSpent: 0, timerActive: false },
    ],
    algorithms: [
      {
        id: 'alg-3',
        projectId: 'proj-2',
        timestamp: new Date('2025-01-13T09:00:00'),
        type: 'learning',
        title: 'G-Code Fundamentals',
        description: 'Naučil jsem se základní G-Code příkazy',
        duration: 120,
        outcome: 'success',
        xpEarned: 35,
        tags: ['cnc', 'g-code', 'learning']
      }
    ],
    skills: ['CNC Programming', 'G-Code', 'Metrology'],
    technologies: ['Fanuc', 'Mastercam'],
    startDate: new Date('2025-01-05'),
    totalHours: 20,
    xpReward: 5000,
    color: '#607D8B',
    icon: '⚙️',
    progress: 25,
    streak: 3,
    linkedGoalId: 'cnc-skills',
    timerSettings: {
      enabled: true,
      showUrgency: true,
      urgencyThresholds: [75, 50, 25],
      defaultMilestoneHours: 3,
      autoStartTimer: false,
    }
  }
];

export function getProjectById(id: string): Project | undefined {
  return INITIAL_PROJECTS.find((p: Project) => p.id === id);
}

export function getProjectsByCategory(category: string): Project[] {
  return INITIAL_PROJECTS.filter((p: Project) => p.category === category);
}

export function getProjectsByStatus(status: string): Project[] {
  return INITIAL_PROJECTS.filter((p: Project) => p.status === status);
}

export function calculateProjectStats(project: Project) {
  const completedMilestones = project.milestones.filter((m: { isCompleted: boolean }) => m.isCompleted);
  const totalAlgorithms = project.algorithms.length;
  const successfulAlgorithms = project.algorithms.filter((a: { outcome: string }) => a.outcome === 'success').length;
  const totalTime = project.algorithms.reduce((sum: number, a: { duration: number }) => sum + a.duration, 0);
  const totalXp = project.algorithms.reduce((sum: number, a: { xpEarned: number }) => sum + a.xpEarned, 0) + completedMilestones.reduce((sum: number, m: { xpReward: number }) => sum + m.xpReward, 0);

  return {
    completedMilestones: completedMilestones.length,
    totalMilestones: project.milestones.length,
    totalAlgorithms,
    successfulAlgorithms,
    successRate: totalAlgorithms > 0 ? Math.round((successfulAlgorithms / totalAlgorithms) * 100) : 0,
    totalTime,
    totalXp,
    progress: Math.round((completedMilestones.length / project.milestones.length) * 100)
  };
}
