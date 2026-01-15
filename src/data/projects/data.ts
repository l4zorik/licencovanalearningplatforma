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
      { id: 'm1', title: 'Základní architektura', description: 'Postavit Next.js app s Prisma', isCompleted: true, completedAt: new Date('2025-01-01'), xpReward: 500, order: 1 },
      { id: 'm2', title: 'Skills Board', description: 'Implementovat skills board', isCompleted: true, completedAt: new Date('2025-01-10'), xpReward: 800, order: 2 },
      { id: 'm3', title: 'Job Board', description: 'Přidat job board s filtrací', isCompleted: false, xpReward: 1000, order: 3 },
      { id: 'm4', title: 'Gamifikace', description: 'XP, achievements, milestones', isCompleted: false, xpReward: 1200, order: 4 },
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
    linkedGoalId: 'career-growth'
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
      { id: 'm1', title: 'Základy soustružení', description: 'Teoretické základy', isCompleted: true, xpReward: 300, order: 1 },
      { id: 'm2', title: 'CNC Programování', description: 'G-Code mastery', isCompleted: false, xpReward: 500, order: 2 },
      { id: 'm3', title: 'CAM Systémy', description: 'Mastercam základy', isCompleted: false, xpReward: 600, order: 3 },
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
    linkedGoalId: 'cnc-skills'
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
