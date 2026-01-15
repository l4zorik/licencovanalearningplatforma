export type ProjectStatus = 'active' | 'completed' | 'paused' | 'archived';

export type ProjectPriority = 'high' | 'medium' | 'low';

export type AlgorithmType = 
  | 'learning'
  | 'coding'
  | 'optimization'
  | 'data_analysis'
  | 'research'
  | 'design'
  | 'debugging'
  | 'testing'
  | 'documentation'
  | 'deployment'
  | 'security'
  | 'networking'
  | 'automation'
  | 'monitoring'
  | 'planning'
  | 'marketing';

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  goals: string[];
  milestones: ProjectMilestone[];
  algorithms: AlgorithmLog[];
  skills: string[];
  technologies: string[];
  startDate: Date;
  targetEndDate?: Date;
  actualEndDate?: Date;
  totalHours: number;
  xpReward: number;
  color: string;
  icon: string;
  progress: number;
  streak: number;
  linkedGoalId?: string;
};

export type ProjectMilestone = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  completedAt?: Date;
  xpReward: number;
  order: number;
};

export type AlgorithmLog = {
  id: string;
  projectId: string;
  timestamp: Date;
  type: AlgorithmType;
  title: string;
  description: string;
  duration: number;
  codeSnippets?: string;
  notes?: string;
  outcome: 'success' | 'partial' | 'failure' | 'learning';
  xpEarned: number;
  tags: string[];
};

export type AlgorithmStats = {
  totalAlgorithms: number;
  byType: Record<AlgorithmType, number>;
  byOutcome: Record<string, number>;
  totalTime: number;
  averageDuration: number;
  successRate: number;
  streak: number;
};

export type ProjectTemplate = {
  id: string;
  title: string;
  description: string;
  category: string;
  defaultGoals: string[];
  suggestedMilestones: string[];
  suggestedAlgorithms: AlgorithmType[];
  skills: string[];
  technologies: string[];
  estimatedHours: number;
  xpReward: number;
  color: string;
  icon: string;
};

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

export const ALGORITHM_TYPE_ICONS: Record<AlgorithmType, string> = {
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
