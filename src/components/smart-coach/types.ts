export type CoachContext = 'dashboard' | 'life-missions' | 'missions' | 'courses' | 'jobs' | 'skills' | 'general';

export type CoachMessageType = 'bot' | 'user';

export interface CoachMessage {
  id: string;
  type: CoachMessageType;
  text: string;
  timestamp: string;
  options?: CoachOption[];
  action?: string;
}

export interface CoachOption {
  id: string;
  label: string;
  emoji: string;
  action: string;
  data?: any;
}

export type ConversationState = 
  | 'idle'
  | 'greeting'
  | 'checking-mission'
  | 'checking-progress'
  | 'offering-help'
  | 'providing-tip'
  | 'celebrating'
  | 'goodbye';

export interface SmartCoachState {
  isOpen: boolean;
  isMinimized: boolean;
  messages: CoachMessage[];
  currentContext: CoachContext;
  conversationState: ConversationState;
  lastInteraction: string;
  userPreferences: {
    name?: string;
    preferredTone: 'friendly' | 'professional' | 'motivational';
    quietHoursStart?: number;
    quietHoursEnd?: number;
    disableProactive: boolean;
  };
  sessionData: {
    currentMissionId?: string;
    currentPhase?: string;
    lastStepCompleted?: string;
    streakDays: number;
  };
}

export interface UserContextData {
  // Life Missions
  activeMissions: any[];
  recentProgress: any[];
  stuckMissions: any[];
  
  // Courses/Skills
  activeCourses: any[];
  courseProgress: number;
  
  // Jobs
  pendingApplications: any[];
  interviewScheduled: any[];
  
  // Trackers (REAL features in app)
  habits?: any[];
  finishedJobs?: any[];
  
  // Projects
  activeProjects?: any[];
  
  // General
  lastActive: string;
  dailyStreak: number;
  xpToday: number;
}

export const DEFAULT_COACH_STATE: SmartCoachState = {
  isOpen: false,
  isMinimized: false,
  messages: [],
  currentContext: 'general',
  conversationState: 'idle',
  lastInteraction: '',
  userPreferences: {
    preferredTone: 'friendly',
    disableProactive: false,
  },
  sessionData: {
    streakDays: 0,
  },
};
