'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { SmartCoachState, CoachMessage, CoachOption, UserContextData, DEFAULT_COACH_STATE } from './types';
import { generateConversation, getRandomTip, getMotivationalQuote, generateId } from './conversation';

// Helper to calculate mission progress
const calculateMissionProgress = (mission: any): number => {
  if (!mission || !mission.phases) return 0;
  
  const totalSteps = mission.phases.reduce((sum: number, phase: any) => 
    sum + (phase.steps?.length || 0), 0);
  
  const completedSteps = mission.phases.reduce((sum: number, phase: any) => 
    sum + (phase.steps?.filter((s: any) => s.isCompleted)?.length || 0), 0);
  
  return totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
};

interface SmartCoachContextType {
  state: SmartCoachState;
  isOpen: boolean;
  messages: CoachMessage[];
  openChat: (context?: string) => void;
  closeChat: () => void;
  minimizeChat: () => void;
  sendMessage: (text: string, options?: CoachOption[]) => void;
  handleOptionClick: (option: CoachOption) => void;
  startConversation: (trigger?: string) => void;
  getContextData: () => UserContextData;
}

const SmartCoachContext = createContext<SmartCoachContextType | undefined>(undefined);

const STORAGE_KEY = 'smartCoachState';

export function SmartCoachProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SmartCoachState>(DEFAULT_COACH_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error('Failed to load SmartCoach state:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error('Failed to save SmartCoach state:', e);
      }
    }
  }, [state, isLoaded]);

  const getContextData = useCallback((): UserContextData => {
    // Load REAL data from localStorage - only existing keys
    const missions = JSON.parse(localStorage.getItem('lifeMissions') || '[]');
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const habits = JSON.parse(localStorage.getItem('habitTracker') || '[]');
    const finishedJobs = JSON.parse(localStorage.getItem('finishedJobTracker') || '[]');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    const activeMissions = missions.filter((m: any) => m.status === 'active');
    
    // Real stuck detection based on last activity
    const stuckMissions = activeMissions.filter((m: any) => {
      // Check mission phases for last completed step
      let lastActivity = new Date(m.createdAt);
      m.phases?.forEach((phase: any) => {
        phase.steps?.forEach((step: any) => {
          if (step.completedAt) {
            const completedDate = new Date(step.completedAt);
            if (completedDate > lastActivity) {
              lastActivity = completedDate;
            }
          }
        });
      });
      const daysInactive = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24);
      return daysInactive > 3;
    });

    // Calculate real course progress
    const activeCourses = courses.filter((c: any) => !c.archived);
    const totalCourseProgress = activeCourses.reduce((sum: number, c: any) => {
      const completedModules = c.modules?.filter((m: any) => m.completed)?.length || 0;
      const totalModules = c.modules?.length || 1;
      return sum + (completedModules / totalModules);
    }, 0);
    const averageCourseProgress = activeCourses.length > 0 ? totalCourseProgress / activeCourses.length : 0;

    return {
      activeMissions,
      recentProgress: [],
      stuckMissions,
      activeCourses,
      courseProgress: Math.round(averageCourseProgress * 100),
      pendingApplications: jobs.filter((j: any) => j.status === 'Applied'),
      interviewScheduled: jobs.filter((j: any) => j.status === 'Interview'),
      lastActive: localStorage.getItem('lastActive') || new Date().toISOString(),
      dailyStreak: parseInt(localStorage.getItem('dailyStreak') || '0'),
      xpToday: parseInt(localStorage.getItem('xpToday') || '0'),
      // Additional real data
      habits,
      finishedJobs,
      activeProjects: projects.filter((p: any) => p.status === 'active'),
    };
  }, []);

  const openChat = useCallback((context?: string) => {
    setState(prev => ({
      ...prev,
      isOpen: true,
      isMinimized: false,
      currentContext: (context as any) || prev.currentContext,
    }));
  }, []);

  const closeChat = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      lastInteraction: new Date().toISOString(),
    }));
  }, []);

  const minimizeChat = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMinimized: !prev.isMinimized,
    }));
  }, []);

  const sendMessage = useCallback((text: string, options?: CoachOption[]) => {
    const newMessage: CoachMessage = {
      id: generateId(),
      type: 'bot',
      text,
      timestamp: new Date().toISOString(),
      options,
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages.slice(-24), newMessage], // Keep last 25 messages
    }));
  }, []);

  const handleOptionClick = useCallback((option: CoachOption) => {
    // Add user message
    const userMessage: CoachMessage = {
      id: generateId(),
      type: 'user',
      text: option.label,
      timestamp: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }));

    // Handle action
    handleAction(option.action, option.data);
  }, []);

  const handleAction = useCallback((action: string, data?: any) => {
    const userData = getContextData();

    switch (action) {
      case 'mood-great':
      case 'mood-ok':
        // Show REAL app sections user can work on
        const options = [
          { id: '1', label: 'Moje mise', emoji: '🎯', action: 'check-missions' },
          { id: '2', label: 'Mé kurzy', emoji: '📚', action: 'check-courses' },
        ];
        
        // Add job option only if they have pending applications
        if (userData.pendingApplications.length > 0) {
          options.push({ id: '3', label: 'Job board', emoji: '💼', action: 'check-jobs' });
        }
        
        // Add trackers option
        if ((userData.habits?.length || 0) > 0) {
          options.push({ id: '4', label: 'Trackery', emoji: '📊', action: 'check-trackers' });
        }
        
        options.push({ id: '5', label: 'Jen motivaci', emoji: '💬', action: 'get-quote' });
        
        sendMessage('Super! Na čem chceš dnes pracovat?', options);
        break;
      
      case 'mood-tired':
        sendMessage('Rozumím. Dnes to můžeme vzít lehčeji. Co zkusíš?', [
          { id: '1', label: 'Zobrazit tipy', emoji: '💡', action: 'get-tip' },
          { id: '2', label: 'Motivační citát', emoji: '💬', action: 'get-quote' },
          { id: '3', label: 'Odpočinek', emoji: '😴', action: 'rest-day' },
        ]);
        break;

      case 'need-help':
        sendMessage('Jsem tu pro tebe! S čím potřebuješ pomoct?', [
          { id: '1', label: 'Nemůžu se donutit', emoji: '😤', action: 'procrastination-help' },
          { id: '2', label: 'Nevím jak začít', emoji: '🤔', action: 'get-started-help' },
          { id: '3', label: 'Zasekl jsem se', emoji: '🛑', action: 'stuck-help' },
          { id: '4', label: 'Tip pro produktivitu', emoji: '💡', action: 'get-tip' },
        ]);
        break;

      case 'check-missions':
        if (userData.activeMissions.length > 0) {
          const mission = userData.activeMissions[0];
          const progress = calculateMissionProgress(mission);
          sendMessage(`Tvoje mise "${mission.title}" je na ${progress}%. Chceš pokračovat?`, [
            { id: '1', label: 'Ano, pokračovat', emoji: '▶️', action: 'navigate-life-missions' },
            { id: '2', label: 'Zobrazit všechny', emoji: '📋', action: 'navigate-life-missions' },
          ]);
        } else {
          sendMessage('Nemáš žádnou aktivní misi. Chceš začít něco nového?', [
            { id: '1', label: 'Vytvořit novou misi', emoji: '✨', action: 'navigate-life-missions' },
            { id: '2', label: 'Prohlédnout šablony', emoji: '📚', action: 'navigate-life-missions' },
          ]);
        }
        break;

      case 'check-courses':
        if (userData.activeCourses.length > 0) {
          sendMessage(`Máš ${userData.activeCourses.length} aktivních kurzů. Průměrný progress: ${userData.courseProgress}%.`, [
            { id: '1', label: 'Pokračovat v kurzech', emoji: '📚', action: 'navigate-courses' },
            { id: '2', label: 'Přidat nový kurz', emoji: '➕', action: 'navigate-courses' },
          ]);
        } else {
          sendMessage('Nemáš žádné aktivní kurzy. Chceš začít něco nového?', [
            { id: '1', label: 'Přidat kurz', emoji: '➕', action: 'navigate-courses' },
            { id: '2', label: 'Prohlédnout dovednosti', emoji: '🎯', action: 'navigate-courses' },
          ]);
        }
        break;

      case 'check-jobs':
        if (userData.pendingApplications.length > 0) {
          sendMessage(`Máš ${userData.pendingApplications.length} čekajících žádostí. Kontroluješ odpovědi?`, [
            { id: '1', label: 'Zobrazit job board', emoji: '💼', action: 'navigate-jobs' },
            { id: '2', label: 'Hledat nové pozice', emoji: '🔍', action: 'navigate-jobs' },
          ]);
        } else {
          sendMessage('Žádné čekající žádosti. Chceš najít nové příležitosti?', [
            { id: '1', label: 'Prohlédnout pozice', emoji: '💼', action: 'navigate-jobs' },
          ]);
        }
        break;

      case 'check-trackers':
        const hasHabits = (userData.habits?.length || 0) > 0;
        if (hasHabits) {
          sendMessage('Máš aktivní trackery. Aktualizuješ dnešní pokrok?', [
            { id: '1', label: 'Zobrazit trackery', emoji: '📊', action: 'navigate-dashboard' },
            { id: '2', label: 'Zapsat pokrok', emoji: '✍️', action: 'navigate-dashboard' },
          ]);
        } else {
          sendMessage('Můžeš si vytvořit trackery pro návyky, práci nebo vztahy.', [
            { id: '1', label: 'Vytvořit tracker', emoji: '➕', action: 'navigate-dashboard' },
          ]);
        }
        break;

      case 'get-quote':
        sendMessage(getMotivationalQuote(), [
          { id: '1', label: 'Děkuji! 💪', emoji: '💪', action: 'mood-great' },
          { id: '2', label: 'Další citát', emoji: '💬', action: 'get-quote' },
        ]);
        break;

      case 'get-tip':
        sendMessage(getRandomTip(state.currentContext), [
          { id: '1', label: 'Další tip', emoji: '💡', action: 'get-tip' },
          { id: '2', label: 'Rozumím', emoji: '👍', action: 'acknowledge' },
        ]);
        break;

      case 'resume-mission':
        sendMessage('Paráda! Začni malým krokem - jen 5-10 minut dnes. Každý krok se počítá! 🚀', [
          { id: '1', label: 'Jdu na to!', emoji: '💪', action: 'navigate-life-missions' },
          { id: '2', label: 'Motivaci', emoji: '💬', action: 'get-quote' },
        ]);
        break;

      case 'time-issue':
        sendMessage('Rozumím. Čas je vzácný. I 10 minut denně dělá rozdíl! Zkus to dnes večer.', [
          { id: '1', label: 'Zkusím večer', emoji: '🌙', action: 'acknowledge' },
          { id: '2', label: 'Tip pro málo času', emoji: '💡', action: 'get-tip' },
        ]);
        break;

      case 'procrastination-help':
        sendMessage('Prokrastinace je normální! Zkus trik "2 minuty" - pracuj jen 2 minuty na úkolu. Často pak pokračuješ.', [
          { id: '1', label: 'Zkusím 2 minuty', emoji: '⏱️', action: 'check-missions' },
          { id: '2', label: 'Jiný tip', emoji: '💡', action: 'get-tip' },
        ]);
        break;

      case 'get-started-help':
        sendMessage('Začít je nejtěžší! Zkus: 1) Rozděl úkol na menší části 2) Začni nejjednodušší částí 3) Odstraň rozptýlení', [
          { id: '1', label: 'Zjistit první krok', emoji: '🎯', action: 'check-missions' },
          { id: '2', label: 'Další tipy', emoji: '💡', action: 'get-tip' },
        ]);
        break;

      case 'stuck-help':
        sendMessage('Být zaseklý je OK! Zkus se zeptat v komunitě nebo najít tutorial. Hlavně se nevzdávej! 💪', [
          { id: '1', label: 'Zkusím najít řešení', emoji: '🔍', action: 'acknowledge' },
          { id: '2', label: 'Motivaci', emoji: '💬', action: 'get-quote' },
        ]);
        break;

      case 'rest-day':
        sendMessage('Skvělé rozhodnutí! Odpočinek je důležitý pro produktivitu. Užij si volný čas! 😊', [
          { id: '1', label: 'Děkuji! 👋', emoji: '👋', action: 'close-chat' },
        ]);
        break;

      case 'navigate-life-missions':
      case 'navigate-courses':
      case 'navigate-jobs':
      case 'navigate-dashboard':
        // These would ideally use router, for now just acknowledge
        sendMessage('Otevři příslušnou sekci v menu nahoře. Jsem tu kdykoliv budeš potřebovat pomoc! 🚀', [
          { id: '1', label: 'Rozumím', emoji: '👍', action: 'acknowledge' },
          { id: '2', label: 'Zavřít', emoji: '👋', action: 'close-chat' },
        ]);
        break;

      case 'dismiss':
      case 'acknowledge':
        sendMessage('Jasně! Jsem tu kdykoliv budeš potřebovat. Hodně štěstí! 🍀', [
          { id: '1', label: 'Zavřít chat', emoji: '👋', action: 'close-chat' },
        ]);
        break;

      case 'close-chat':
        closeChat();
        break;

      default:
        sendMessage('Rozumím! Chceš pokračovat v práci nebo potřebuješ něco jiného?', [
          { id: '1', label: 'Moje mise', emoji: '🎯', action: 'check-missions' },
          { id: '2', label: 'Mé kurzy', emoji: '📚', action: 'check-courses' },
          { id: '3', label: 'Tip dne', emoji: '💡', action: 'get-tip' },
        ]);
    }
  }, [sendMessage, closeChat, getContextData, state.currentContext]);

  const startConversation = useCallback((trigger?: string) => {
    if (state.userPreferences.disableProactive) return;
    
    const userData = getContextData();
    let conversationState: any = 'greeting';
    
    // Determine conversation state based on trigger and context
    if (trigger === 'stuck-mission' && userData.stuckMissions.length > 0) {
      conversationState = 'checking-mission';
    } else if (trigger === 'daily-check') {
      conversationState = 'checking-progress';
    } else if (trigger === 'celebration') {
      conversationState = 'celebrating';
    }

    const { message, options } = generateConversation(
      conversationState,
      state.currentContext,
      userData,
      state.userPreferences.preferredTone
    );

    sendMessage(message, options);
  }, [state, getContextData, sendMessage]);

  const value: SmartCoachContextType = {
    state,
    isOpen: state.isOpen,
    messages: state.messages,
    openChat,
    closeChat,
    minimizeChat,
    sendMessage,
    handleOptionClick,
    startConversation,
    getContextData,
  };

  return (
    <SmartCoachContext.Provider value={value}>
      {children}
    </SmartCoachContext.Provider>
  );
}

export function useSmartCoach() {
  const context = useContext(SmartCoachContext);
  if (context === undefined) {
    throw new Error('useSmartCoach must be used within a SmartCoachProvider');
  }
  return context;
}
