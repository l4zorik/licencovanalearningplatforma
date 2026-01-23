import { UrgencyLevel, DEFAULT_TIMER_SETTINGS, TimerSettings, ProjectMilestone } from '@/types/projects';

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  percentage: number;
  isOverdue: boolean;
}

export function calculateTimeRemaining(deadline: Date, startDate?: Date): TimeRemaining {
  const now = new Date();
  const start = startDate || new Date();
  const totalDuration = deadline.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  const remaining = Math.max(0, totalDuration - elapsed);
  
  const totalMinutes = Math.floor(remaining / 60000);
  const totalSeconds = Math.floor(remaining / 1000);
  
  const percentage = totalDuration > 0 
    ? Math.max(0, Math.min(100, (remaining / totalDuration) * 100))
    : 0;

  return {
    days: Math.floor(totalMinutes / 1440),
    hours: Math.floor((totalMinutes % 1440) / 60),
    minutes: totalMinutes % 60,
    seconds: Math.floor((totalSeconds % 60)),
    total: remaining,
    percentage,
    isOverdue: remaining <= 0,
  };
}

export function getUrgencyLevel(percentage: number, thresholds: number[] = DEFAULT_TIMER_SETTINGS.urgencyThresholds): UrgencyLevel {
  if (percentage <= thresholds[2]) return 'critical';
  if (percentage <= thresholds[1]) return 'warning';
  if (percentage <= thresholds[0]) return 'caution';
  return 'normal';
}

export function formatTimeRemaining(time: TimeRemaining): string {
  if (time.isOverdue) {
    return `Zpoždění: ${Math.abs(time.days)}d ${Math.abs(time.hours)}h`;
  }
  
  const parts: string[] = [];
  if (time.days > 0) parts.push(`${time.days}d`);
  if (time.hours > 0 || parts.length > 0) parts.push(`${time.hours}h`);
  if (time.minutes > 0 || parts.length > 0) parts.push(`${time.minutes}m`);
  parts.push(`${time.seconds}s`);
  
  return parts.join(' ');
}

export function formatHours(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function calculateMilestoneProgress(milestoneTimeSpent: number, targetHours?: number): number {
  if (!targetHours || targetHours === 0) return 0;
  const targetMinutes = targetHours * 60;
  return Math.min(100, (milestoneTimeSpent / targetMinutes) * 100);
}

export function getUrgencyColor(level: UrgencyLevel): string {
  const colors: Record<UrgencyLevel, string> = {
    normal: '#4CAF50',
    caution: '#8BC34A',
    warning: '#FF9800',
    critical: '#F44336',
  };
  return colors[level];
}

export function getUrgencyBadgeVariant(level: UrgencyLevel): string {
  const variants: Record<UrgencyLevel, string> = {
    normal: 'success',
    caution: 'info',
    warning: 'warning',
    critical: 'danger',
  };
  return variants[level];
}

export function getUrgencyEmoji(level: UrgencyLevel): string {
  const emojis: Record<UrgencyLevel, string> = {
    normal: '✅',
    caution: '⚠️',
    warning: '🔶',
    critical: '🚨',
  };
  return emojis[level];
}

export function loadTimerSettings(): TimerSettings {
  if (typeof window === 'undefined') return DEFAULT_TIMER_SETTINGS;
  
  try {
    const saved = localStorage.getItem('timerSettings');
    if (saved) {
      return { ...DEFAULT_TIMER_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load timer settings:', e);
  }
  return DEFAULT_TIMER_SETTINGS;
}

export function saveTimerSettings(settings: TimerSettings): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('timerSettings', JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save timer settings:', e);
  }
}

export function createMilestone(data: Partial<ProjectMilestone> = {}): ProjectMilestone {
  return {
    id: `milestone-${Date.now()}`,
    title: '',
    description: '',
    isCompleted: false,
    completedAt: undefined,
    xpReward: 100,
    order: 0,
    targetHours: DEFAULT_TIMER_SETTINGS.defaultMilestoneHours,
    timeSpent: 0,
    timerActive: false,
    timerStartedAt: undefined,
    benefits: [],
    ...data,
  };
}
