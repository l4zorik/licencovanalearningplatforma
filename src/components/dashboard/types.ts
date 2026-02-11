export interface DashboardSectionConfig {
  id: string;
  name: string;
  icon: string;
  isVisible: boolean;
  order: number;
}

export const DEFAULT_DASHBOARD_SECTIONS: DashboardSectionConfig[] = [
  { id: 'life-missions', name: 'Životní mise', icon: '🗺️', isVisible: true, order: 1 },
  { id: 'job-board', name: 'Job Board', icon: '💼', isVisible: true, order: 2 },
  { id: 'projects', name: 'Projekty', icon: '🚀', isVisible: true, order: 3 },
  { id: 'goals', name: 'Cíle', icon: '🎯', isVisible: true, order: 4 },
  { id: 'financial', name: 'Finanční přehled', icon: '💰', isVisible: true, order: 5 },
  { id: 'life-status', name: 'Life Status', icon: '📊', isVisible: true, order: 6 },
  { id: 'habit-tracker', name: 'Habit Tracker', icon: '⛔', isVisible: true, order: 7 },
  { id: 'friend-tracker', name: 'Friend Trust', icon: '👥', isVisible: true, order: 8 },
  { id: 'family-tracker', name: 'Family Trust', icon: '👨‍👩‍👧', isVisible: true, order: 9 },
  { id: 'finished-jobs', name: 'Finished Jobs', icon: '✅', isVisible: true, order: 10 },
  { id: 'projects-templates', name: 'Šablony projektů', icon: '📋', isVisible: true, order: 11 },
  { id: 'achievement-map', name: 'Mapa Achievementů', icon: '🏆', isVisible: true, order: 12 },
  { id: 'career-advice', name: 'Kariérní rady', icon: '💡', isVisible: true, order: 13 },
  { id: 'recipes', name: 'Recepty', icon: '👨‍🍳', isVisible: true, order: 14 },
];

export const DASHBOARD_CONFIG_KEY = 'dashboardConfig';
