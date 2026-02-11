import { CoachMessage, CoachOption, ConversationState, UserContextData } from './types';

export const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Helper to calculate mission progress
const calculateMissionProgress = (mission: any): number => {
  if (!mission || !mission.phases) return 0;
  
  const totalSteps = mission.phases.reduce((sum: number, phase: any) => 
    sum + (phase.steps?.length || 0), 0);
  
  const completedSteps = mission.phases.reduce((sum: number, phase: any) => 
    sum + (phase.steps?.filter((s: any) => s.isCompleted)?.length || 0), 0);
  
  return totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
};

// Greeting messages based on time and context - ONLY using real app features
export const getGreeting = (context: string, hour: number): string => {
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  
  const morningGreetings: Record<string, string[]> = {
    'life-missions': [
      'Dobré ráno! Máš aktivní mise ke splnění? 🎯',
      'Ahoj! Jak pokračuješ v životních misích? 💪',
      'Dobré ráno! Čas zapracovat na tvých cílech! ✨',
    ],
    'courses': [
      'Dobré ráno! Pokračuj ve svých kurzech! 📚',
      'Ahoj! Zlepši své dovednosti dnes! 🎓',
      'Čas na učení! Jak ti to jde? 📖',
    ],
    'jobs': [
      'Dobré ráno! Sleduješ nějaké pracovní pozice? 💼',
      'Ahoj! Jak jde hledání práce? 🎯',
      'Připraven poslat pár žádostí? 💪',
    ],
    'trackers': [
      'Dobré ráno! Jak jde plnění tvých cílů? 📊',
      'Ahoj! Zapiš si dnešní pokrok! ✍️',
      'Nezapomeň aktualizovat trackery! 📈',
    ],
    'general': [
      'Dobré ráno! Jak se máš? ☀️',
      'Ahoj! Připraven na produktivní den? 💪',
      'Krásné ráno! Co tě dnes čeká? 🌟',
    ],
  };
  
  const afternoonGreetings: Record<string, string[]> = {
    'life-missions': [
      'Dobrý den! Jak jde plnění misí? 🎯',
      'Už jsi dnes udělal nějaký krok v misi? 💪',
      'Jak to jde s tvými cíli? 🔥',
    ],
    'courses': [
      'Dobrý den! Pokročil jsi ve studiu? 📖',
      'Už ses dnes učil? 🎓',
      'Kolik modulů jsi dnes zvládl? 📚',
    ],
    'jobs': [
      'Dobrý den! Kontroloval jsi nové pozice? 💼',
      'Jak jde hledání práce? 🎯',
      'Nějaké nové odpovědi na žádosti? 💪',
    ],
    'trackers': [
      'Dobrý den! Aktualizoval jsi trackery? 📊',
      'Jak jde plnění tvých návyků? 🎯',
      'Nezapomeň zapsat dnešní pokrok! ✍️',
    ],
    'general': [
      'Dobrý den! Jak se ti daří? 👋',
      'Povedlo se ti dnes něco? 🌟',
      'Jsi v půli dne - potřebuješ podpořit? 💪',
    ],
  };
  
  const eveningGreetings: string[] = [
    'Dobrý večer! Jak byl tvůj den? 🌙',
    'Ahoj! Čas zhodnotit dnešní pokrok! 📊',
    'Dobrý večer! Co se ti dnes povedlo? ⭐',
    'Večer je tu! Zapisuješ si úspěchy? 🌃',
  ];
  
  if (timeOfDay === 'evening') {
    return eveningGreetings[Math.floor(Math.random() * eveningGreetings.length)];
  }
  
  const greetings = timeOfDay === 'morning' ? morningGreetings : afternoonGreetings;
  const contextGreetings = greetings[context] || greetings['general'];
  return contextGreetings[Math.floor(Math.random() * contextGreetings.length)];
};

// Generate conversation based on context and user data - ONLY real app features
export const generateConversation = (
  state: ConversationState,
  context: string,
  userData: UserContextData,
  tone: string
): { message: string; options: CoachOption[] } => {
  
  switch (state) {
    case 'greeting':
      return generateGreetingMessage(context, userData);
    
    case 'checking-mission':
      return generateMissionCheckMessage(userData);
    
    case 'checking-progress':
      return generateProgressCheckMessage(userData);
    
    case 'offering-help':
      return generateHelpOfferMessage(context);
    
    case 'celebrating':
      return generateCelebrationMessage(userData);
    
    default:
      return generateDefaultMessage(context);
  }
};

const generateGreetingMessage = (context: string, userData: UserContextData): { message: string; options: CoachOption[] } => {
  const hour = new Date().getHours();
  const greeting = getGreeting(context, hour);
  
  const options: CoachOption[] = [
    { id: '1', label: 'Skvěle!', emoji: '💪', action: 'mood-great' },
    { id: '2', label: 'Jde to', emoji: '😐', action: 'mood-ok' },
    { id: '3', label: 'Unavený', emoji: '😴', action: 'mood-tired' },
    { id: '4', label: 'Potřebuji pomoc', emoji: '🆘', action: 'need-help' },
  ];
  
  return { message: greeting, options };
};

const generateMissionCheckMessage = (userData: UserContextData): { message: string; options: CoachOption[] } => {
  const stuckMissions = userData.stuckMissions || [];
  
  // Check for stuck missions (inactive > 3 days)
  if (stuckMissions.length > 0) {
    const mission = stuckMissions[0];
    return {
      message: `Všiml jsem si, že jsi 3 dny neaktualizoval misi "${mission.title}". Vše v pořádku? 🤔`,
      options: [
        { id: '1', label: 'Jdu na to!', emoji: '💪', action: 'resume-mission', data: mission.id },
        { id: '2', label: 'Mám málo času', emoji: '⏰', action: 'time-issue' },
        { id: '3', label: 'Zapomněl jsem', emoji: '😅', action: 'acknowledge' },
        { id: '4', label: 'Pomoc', emoji: '🆘', action: 'need-help' },
      ],
    };
  }
  
  // Check active missions
  const activeMissions = userData.activeMissions || [];
  if (activeMissions.length > 0) {
    const mission = activeMissions[0];
    const progress = calculateMissionProgress(mission);
    
    return {
      message: `Máš aktivní misi "${mission.title}" (${progress}% hotovo). Chceš pokračovat? 🎯`,
      options: [
        { id: '1', label: 'Ano, pokračovat', emoji: '▶️', action: 'navigate-life-missions' },
        { id: '2', label: 'Zobrazit všechny mise', emoji: '📋', action: 'navigate-life-missions' },
        { id: '3', label: 'Dnes nemám čas', emoji: '📅', action: 'time-issue' },
      ],
    };
  }
  
  // No active missions
  return {
    message: 'Momentálně nemáš žádnou aktivní misi. Chceš začít něco nového? 🚀',
    options: [
      { id: '1', label: 'Ano, nová mise!', emoji: '✨', action: 'navigate-life-missions' },
      { id: '2', label: 'Prohlédnout šablony', emoji: '📚', action: 'navigate-life-missions' },
      { id: '3', label: 'Teď ne', emoji: '❌', action: 'dismiss' },
    ],
  };
};

const generateProgressCheckMessage = (userData: UserContextData): { message: string; options: CoachOption[] } => {
  const streak = userData.dailyStreak || 0;
  
  if (streak > 0) {
    return {
      message: `Wow! Máš za sebou ${streak} dní v řadě! 🔥 Pokračujeme?`,
      options: [
        { id: '1', label: 'Jasně! 💪', emoji: '💪', action: 'check-missions' },
        { id: '2', label: 'Dnes pauza', emoji: '😴', action: 'rest-day' },
        { id: '3', label: 'Moje mise', emoji: '🎯', action: 'check-missions' },
      ],
    };
  }
  
  return {
    message: 'Začni dnes nový streak! První krok je nejdůležitější! 🌟',
    options: [
      { id: '1', label: 'Jdeme na to!', emoji: '🚀', action: 'check-missions' },
      { id: '2', label: 'Co mám udělat?', emoji: '🤔', action: 'check-missions' },
      { id: '3', label: 'Motivuj mě', emoji: '🔥', action: 'get-quote' },
    ],
  };
};

const generateHelpOfferMessage = (context: string): { message: string; options: CoachOption[] } => {
  const helpMessages: Record<string, string> = {
    'life-missions': 'S čím potřebuješ pomoct? Můžu tě provést misí nebo dát tip! 🤝',
    'courses': 'Něco tě trápí ve studiu? Můžu pomoct s organizací! 📚',
    'jobs': 'Potřebuješ pomoc s job board nebo přípravou? 💼',
    'general': 'Jak ti mohu pomoci? Mám tipy pro produktivitu i motivaci! 💡',
  };
  
  return {
    message: helpMessages[context] || helpMessages['general'],
    options: [
      { id: '1', label: 'Nemůžu se donutit', emoji: '😤', action: 'procrastination-help' },
      { id: '2', label: 'Nevím jak začít', emoji: '🤔', action: 'get-started-help' },
      { id: '3', label: 'Zasekl jsem se', emoji: '🛑', action: 'stuck-help' },
      { id: '4', label: 'Tip dne', emoji: '💡', action: 'get-tip' },
    ],
  };
};

const generateCelebrationMessage = (userData: UserContextData): { message: string; options: CoachOption[] } => {
  const xp = userData.xpToday || 0;
  
  return {
    message: `Gratulace! Dnes ses posunul o ${xp} XP! 🎉 Jde ti to skvěle!`,
    options: [
      { id: '1', label: 'Děkuji! 🙏', emoji: '🙏', action: 'acknowledge' },
      { id: '2', label: 'Pokračovat', emoji: '🚀', action: 'check-missions' },
      { id: '3', label: 'Zavřít', emoji: '👋', action: 'close-chat' },
    ],
  };
};

const generateDefaultMessage = (context: string): { message: string; options: CoachOption[] } => {
  return {
    message: 'Jsem tu pro tebe! Co bys chtěl dělat? 🤔',
    options: [
      { id: '1', label: 'Kontrola misí', emoji: '🎯', action: 'check-missions' },
      { id: '2', label: 'Mé kurzy', emoji: '📚', action: 'check-courses' },
      { id: '3', label: 'Job board', emoji: '💼', action: 'check-jobs' },
      { id: '4', label: 'Nastavení', emoji: '⚙️', action: 'acknowledge' },
    ],
  };
};

// Tips database - ONLY real app features
export const getRandomTip = (context: string): string => {
  const tips: Record<string, string[]> = {
    'life-missions': [
      'Tip: Rozděl velké mise na malé kroky. Je jednodušší začít! 🎯',
      'Tip: Oslavuj malé vítězství. Každý dokončený krok se počítá! ⭐',
      'Tip: Pravidelnost je důležitější než intenzita. 15 minut denně stačí! 💪',
      'Tip: Zapisuj si pokrok v deníku mise. Pomůže ti to vidět výsledky! ✍️',
    ],
    'courses': [
      'Tip: Použij timer - 25 minut učení, 5 minut pauza. Funguje to! ⏱️',
      'Tip: Uč se prakticky - okamžitě aplikuj nové znalosti! 🛠️',
      'Tip: Opakování je matka moudrosti. Zopakuj si látku za 24 hodin! 🧠',
      'Tip: Rozděl kurz na moduly a plánuj si čas na každý. 📅',
    ],
    'jobs': [
      'Tip: Uprav si CV pro každou pozici zvlášť. Zvýrazni relevantní dovednosti! 📄',
      'Tip: Sleduj firmy před pohovorem. Projevíš zájem! 💼',
      'Tip: Připrav si otázky na pohovor. Ukážeš zájem o pozici! 🎯',
      'Tip: Pošli follow-up email 3-5 dní po pohovoru. 📧',
    ],
    'general': [
      'Tip: Piš si své cíle. Lidé co zapisují cíle je dosáhnou častěji! 📝',
      'Tip: Spánek je důležitý. 7-8 hodin spánku zlepší výkon! 😴',
      'Tip: Hydratace = energie. Vypij 2-3 litry vody denně! 💧',
      'Tip: Udělej si 5-minutovou pauzu každou hodinu. Mozek potřebuje odpočinek! 🧠',
    ],
  };
  
  const contextTips = tips[context] || tips['general'];
  return contextTips[Math.floor(Math.random() * contextTips.length)];
};

// Motivational quotes
export const getMotivationalQuote = (): string => {
  const quotes = [
    '„Nezáleží na tom, jak pomalu jdeš, dokud se nezastavíš." - Konfucius',
    '„Úspěch je součet malých úsilí opakovaných den co den." - Robert Collier',
    '„Jediný způsob, jak udělat skvělou práci, je milovat to, co děláš." - Steve Jobs',
    '„Cesta k úspěchu je vždy stavení." - Tony Robbins',
    '„Přestaň se bát toho, co by se mohlo pokazit. Začni se těšit na to, co se podaří!"',
    '„Každý expert byl jednou začátečníkem."',
    '„Nemusíš být skvělý na to, abys začal, ale musíš začít, abys byl skvělý."',
    '„Tvoje budoucnost je vytvářena tím, co děláš dnes, ne zítra."',
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};
