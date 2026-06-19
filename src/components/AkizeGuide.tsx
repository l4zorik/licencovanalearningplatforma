import { useState, useRef, useEffect } from 'react';
import { Card, Button, Form, Modal, ProgressBar, Badge, Toast, ToastContainer, Accordion, ListGroup, Row, Col } from 'react-bootstrap';
import { Course, Job, UserStats, Achievement } from '@/types';

interface AkizeGuideProps {
  courses?: Course[];
  jobs?: Job[];
  userStats?: UserStats;
  achievements?: Achievement[];
}

interface ChatMessage {
  type: 'ai' | 'user' | 'system';
  content: string;
  timestamp: Date;
}

interface CommandOption {
  id: string;
  icon: string;
  label: string;
  description: string;
  category: string;
  action: string;
}

interface PromptTemplate {
  id: string;
  title: string;
  content: string;
  category: string;
  icon: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  usageCount: number;
}

const PROMPT_STORAGE_KEY = 'akize-prompts';

const DEFAULT_PROMPTS: PromptTemplate[] = [
  { id: 'p1', title: 'Generátor CV', content: 'Pomoz mi vytvořit profesionální CV pro pozici {position}. Mám zkušenosti v {experience} a chci zdůraznit {focus}.', category: 'Kariéra', icon: '📄', tags: ['cv', 'career', 'job'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 25 },
  { id: 'p2', title: 'Skill Gap Analysis', content: 'Analyzuj skill gap pro pozici {position}. Aktuálně umím: {skills}. Které dovednosti mi chybí a jak je mám nejrychleji získat?', category: 'Kariéra', icon: '🎯', tags: ['skills', 'gap', 'analysis'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 18 },
  { id: 'p3', title: 'Code Review', content: 'Proveď code review tohoto kódu: {code}. Hledej bezpečnostní chyby, performance problémy a porušení best practices v {language}.', category: 'Programování', icon: '🔍', tags: ['code', 'review', 'security'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 42 },
  { id: 'p4', title: 'Debug Assistant', content: 'Mám problém s kódem v {language}. Kód: {code}. Chybová hláška: {error}. Co dělám špatně a jak to opravit?', category: 'Programování', icon: '🐛', tags: ['debug', 'error', 'fix'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 55 },
  { id: 'p5', title: 'Explain Like I\'m 5', content: 'Vysvětli mi {topic} jako bych byl úplný začátečník. Použij jednoduchá slova, analogie a příklady z reálného světa.', category: 'Vzdělávání', icon: '🧠', tags: ['explain', 'beginner', 'learning'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 33 },
  { id: 'p6', title: 'Study Planner', content: 'Vytvoř mi týdenní studijní plán na {topic}. Mám k dispozici {hoursPerDay} hodin denně. Chci se dostat na úroveň {level} do {deadline}.', category: 'Vzdělávání', icon: '📅', tags: ['plan', 'study', 'schedule'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 12 },
  { id: 'p7', title: 'Investment Strategy', content: 'Mám {amount} Kč na investování na {timeHorizon} let. Můj risk profil je {riskProfile}. Navrhni mi diverzifikované portfolio včetně konkrétních ETF a poměrů.', category: 'Finance', icon: '📈', tags: ['invest', 'portfolio', 'finance'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 8 },
  { id: 'p8', title: 'AI Prompt Optimalizace', content: 'Pomoz mi optimalizovat tento prompt pro AI: {prompt}. Chci dosáhnout {goal}. Navrhni vylepšení pro lepší výsledky.', category: 'Programování', icon: '✨', tags: ['prompt', 'ai', 'optimization'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 30 },
  { id: 'p9', title: 'Career Change Roadmap', content: 'Chci změnit kariéru z {currentField} na {targetField}. Moje aktuální dovednosti: {skills}. Vytvoř mi detailní roadmapu včetně kurzů, certifikací a časového harmonogramu.', category: 'Kariéra', icon: '🛤️', tags: ['career', 'change', 'roadmap'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 15 },
  { id: 'p10', title: 'Vibe Coding Session', content: 'Pojďme spolu vibe coding! Chci vytvořit {project} pomocí {techStack}. Začneme od nápadu a budeme iterovat. První: navrhni architekturu a strukturu souborů.', category: 'Programování', icon: '✨', tags: ['vibe', 'coding', 'ai'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 20 },
  { id: 'p11', title: 'Mentoring Session', content: 'Představ si, že jsi můj mentor v oboru {field}. Mám {experience} zkušeností. Potřebuji radu ohledně {question}. Odpovídej jako zkušený senior, který chce předat know-how.', category: 'Motivace', icon: '👨‍🏫', tags: ['mentor', 'career', 'advice'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 10 },
  { id: 'p12', title: 'Life OS Review', content: 'Proveď review mého Life OS systému. Mám tyto oblasti: {areas}. Aktuální skóre spokojenosti: {score}/10. Navrhni zlepšení pro work-life balance a osobní růst.', category: 'Life OS', icon: '🌱', tags: ['life', 'os', 'balance'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 5 },
  { id: 'p13', title: 'Krypto Analýza', content: 'Analyzuj kryptoměnu {coin}. Zajímá mě fundament projektu, tokenomika, tým, roadmapa, konkurence a aktuální sentiment na trhu. Je to dobrá investice na {timeframe}?', category: 'Finance', icon: '🔗', tags: ['crypto', 'analysis', 'blockchain'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 7 },
  { id: 'p14', title: 'Motivační Letter', content: 'Napiš mi motivační dopis na pozici {position} ve firmě {company}. Moje klíčové dovednosti: {skills}. Zdůrazni, proč jsem ideální kandidát.', category: 'Kariéra', icon: '✉️', tags: ['motivation', 'letter', 'job'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 11 },
  { id: 'p15', title: 'Rapid Prototype', content: 'Pojďme rychle prototypovat: {idea}. Chci během {timeframe} vytvořit MVP. Jaké technologie použít, jaká je kritická cesta a co můžeme osekávat?', category: 'Programování', icon: '⚡', tags: ['prototype', 'mvp', 'rapid'], createdAt: Date.now(), updatedAt: Date.now(), usageCount: 9 },
];

const COMMAND_MENU: CommandOption[] = [
  // 🎯 Kariéra & Práce
  { id: 'c1', icon: '📊', label: 'Můj pokrok', description: 'Zobrazit statistiky a pokrok', category: 'Kariéra', action: 'ukaž mi můj aktuální pokrok ve všech kurzech a úkolech' },
  { id: 'c2', icon: '💼', label: 'Kariérní rady', description: 'Co s kariérou dál?', category: 'Kariéra', action: 'potřebuji radu s kariérou a pracovními nabídkami' },
  { id: 'c3', icon: '🎯', label: 'Doporučení kurzů', description: 'Jaké kurzy vybrat?', category: 'Kariéra', action: 'doporuč mi kurzy podle mých cílů' },
  { id: 'c4', icon: '📋', label: 'Nabídky práce', description: 'Sledované pozice', category: 'Kariéra', action: 'ukaž mi přehled mých sledovaných nabídek práce' },
  { id: 'c5', icon: '🎓', label: 'Skill gap', description: 'Co mi chybí?', category: 'Kariéra', action: 'analyzuj jaké dovednosti mi chybí pro moji cílovou pozici' },
  
  // 📚 Vzdělávání
  { id: 'e1', icon: '📚', label: 'Moje kurzy', description: 'Přehled aktivních kurzů', category: 'Vzdělávání', action: 'ukaž mi všechny moje aktivní kurzy a jejich stav' },
  { id: 'e2', icon: '⏱️', label: 'Čas studia', description: 'Kolik jsem naučil/a?', category: 'Vzdělávání', action: 'kolik hodin jsem celkem strávil/a učením' },
  { id: 'e3', icon: '✅', label: 'Dokončené moduly', description: 'Co mám hotovo?', category: 'Vzdělávání', action: 'ukaž mi které moduly jsem dokončil/a' },
  { id: 'e4', icon: '📈', label: 'Learning streak', description: 'Série učení', category: 'Vzdělávání', action: 'jaký je můj learning streak a statistiky' },
  { id: 'e5', icon: '🎓', label: 'Nový skill', description: 'Přidat nový kurz', category: 'Vzdělávání', action: 'chci přidat nový skill do svého skill tree' },
  
  // 🏆 Achievementy & Gamifikace
  { id: 'g1', icon: '🏆', label: 'Moje achievementy', description: 'Odemčené odznaky', category: 'Achievementy', action: 'ukaž mi všechny moje achievementy a odznaky' },
  { id: 'g2', icon: '⭐', label: 'Level & XP', description: 'Herní statistiky', category: 'Achievementy', action: 'jaký je můj level a kolik mám XP' },
  { id: 'g3', icon: '🎖️', label: 'Zbývající achievementy', description: 'Co odemknout?', category: 'Achievementy', action: 'jaké achievementy mám ještě k odemčení' },
  { id: 'g4', icon: '🔥', label: 'Streak', description: 'Aktivní série', category: 'Achievementy', action: 'ukaž mi můj aktuální streak a statistiky' },
  
  // 💪 Motivace & Podpora
  { id: 'm1', icon: '💪', label: 'Povzbuď mě', description: 'Potřebuji motivaci', category: 'Motivace', action: 'potřebuji povzbudit a motivovat' },
  { id: 'm2', icon: '🎯', label: 'Nastavit cíle', description: 'Cíle na tento týden', category: 'Motivace', action: 'pomoz mi nastavit cíle na tento týden' },
  { id: 'm3', icon: '📅', label: 'Týdenní plán', description: 'Co dnes dělat?', category: 'Motivace', action: 'vytvoř mi týdenní plán učení' },
  { id: 'm4', icon: '🌟', label: 'Úspěchy', description: 'Co jsem dokázal/a?', category: 'Motivace', action: 'připomeň mi moje úspěchy a pokrok' },
  { id: 'm5', icon: '🤔', label: 'Prokrastinace', description: 'Jak se motivovat?', category: 'Motivace', action: 'prokrastinuji a nevím co dělat, potřebuji pomoct se rozhýbat' },
  
  // 🔧 Nástroje & Utility
  { id: 't1', icon: '🔗', label: 'Career Report', description: 'Celková zpráva', category: 'Utility', action: 'ukaž mi můj career report' },
  { id: 't2', icon: '📈', label: 'Analytics', description: 'Pokročilé statistiky', category: 'Utility', action: 'ukaž mi analytics a statistiky' },
  { id: 't3', icon: '🎮', label: 'Mission Control', description: 'Přehled misí', category: 'Utility', action: 'ukaž mi mission control a moje aktivní mise' },
  { id: 't4', icon: '🎓', label: 'Training', description: 'Výcvikové kurzy', category: 'Utility', action: 'chci přejít na training sekci' },
  { id: 't5', icon: '📝', label: 'Články', description: 'Vzdělávací články', category: 'Utility', action: 'ukaž mi články a vzdělávací obsah' },
  
  // 💻 Programování & Tech
  { id: 'p1', icon: '🐍', label: 'Python', description: 'Python kurzy', category: 'Programování', action: 'doporuč mi kurz Python pro začátečníky' },
  { id: 'p2', icon: '⚛️', label: 'React/Next.js', description: 'Frontend kurzy', category: 'Programování', action: 'doporuč mi kurz React a Next.js' },
  { id: 'p3', icon: '🤖', label: 'AI & ML', description: 'Umělá inteligence', category: 'Programování', action: 'jak se naučit AI a machine learning' },
  { id: 'p4', icon: '☁️', label: 'Cloud & DevOps', description: 'Cloud technologie', category: 'Programování', action: 'doporuč mi kurzy pro cloud a DevOps' },
  { id: 'p5', icon: '🔒', label: 'Kyberbezpečnost', description: 'Security kurzy', category: 'Programování', action: 'jak se stát expertem na kyberbezpečnost' },
  
  // 🎨 Kreativita & Osobní rozvoj
  { id: 'k1', icon: '🎨', label: '3D & GameDev', description: 'Herní vývoj', category: 'Kreativita', action: 'chci se naučit game development' },
  { id: 'k2', icon: '🎵', label: 'Hudba', description: 'Hudební produkce', category: 'Kreativita', action: 'doporuč kurz pro hudební produkci' },
  { id: 'k3', icon: '✍️', label: 'Psaní', description: 'Content creation', category: 'Kreativita', action: 'jak se stát lepším writerem' },
  { id: 'k4', icon: '📷', label: 'Fotografování', description: 'Fotografie kurz', category: 'Kreativita', action: 'doporuč kurz fotografování' },
  { id: 'k5', icon: '🎬', label: 'Video editing', description: 'Post produkce', category: 'Kreativita', action: 'jak se naučit stříhat videa' },
  
  // 💰 Finance & Business
  { id: 'f1', icon: '💰', label: 'Investování', description: 'Akcie, krypto', category: 'Finance', action: 'jak začít s investováním' },
  { id: 'f2', icon: '🚀', label: 'Podnikání', description: 'Byznys nápady', category: 'Finance', action: 'mám nápad na podnikání, potřebuji radu' },
  { id: 'f3', icon: '💼', label: 'Freelancing', description: 'Práce na volné noze', category: 'Finance', action: 'jak začít jako freelancer' },
  { id: 'f4', icon: '📊', label: 'Finanční cíle', description: 'Plánování', category: 'Finance', action: 'pomoz mi nastavit finanční cíle' },
  { id: 'f5', icon: '🏠', label: 'FIRE', description: 'Finanční nezávislost', category: 'Finance', action: 'co je FIRE a jak toho dosáhnout' },
  
  // 🏠 Life OS
  { id: 'l1', icon: '🎯', label: 'Life OS', description: 'Životní cíle', category: 'Life OS', action: 'ukaž mi můj Life OS a všechny cíle' },
  { id: 'l2', icon: '💕', label: 'Vztahy', description: 'Osobní život', category: 'Life OS', action: 'porad s vztahy a komunikací' },
  { id: 'l3', icon: '👨‍👩‍👧', label: 'Rodina', description: 'Family time', category: 'Life OS', action: 'jak sladit kariéru s rodinou' },
  { id: 'l4', icon: '🧠', label: 'Psychika', description: 'Mentální zdraví', category: 'Life OS', action: 'potřebuji pomoct s psychikou a stresem' },
  { id: 'l5', icon: '⛔', label: 'Závislosti', description: 'Osobní boj', category: 'Life OS', action: 'bojuji se závislostí, potřebuji podporu' },
  
  // ❓ Obecné
  { id: 'o1', icon: '🤖', label: 'Co umíš?', description: 'Help & Commands', category: 'Obecné', action: 'co umíš a jak mi můžeš pomoci' },
  { id: 'o2', icon: '❓', label: 'Nápověda', description: 'Jak používat', category: 'Obecné', action: 'ukaž mi nápovědu a jak tě používat' },
  { id: 'o3', icon: '💬', label: 'Chat', description: 'Volná konverzace', category: 'Obecné', action: 'povídej si se mnou o čemkoliv' },
  { id: 'o4', icon: '🌍', label: 'Novinky', description: 'Co je nového?', category: 'Obecné', action: 'co je nového v platformě' },
  { id: 'o5', icon: '📧', label: 'Feedback', description: 'Zpětná vazba', category: 'Obecné', action: 'mám zpětnou vazbu pro platformu' }
];

const MOOD_STATES = {
  happy: { emoji: '😊', color: '#28a745', bgGradient: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' },
  excited: { emoji: '🤩', color: '#ffc107', bgGradient: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)' },
  thinking: { emoji: '🤔', color: '#17a2b8', bgGradient: 'linear-gradient(135deg, #17a2b8 0%, #6610f2 100%)' },
  proud: { emoji: '😎', color: '#6f42c1', bgGradient: 'linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%)' },
  supportive: { emoji: '💪', color: '#20c997', bgGradient: 'linear-gradient(135deg, #20c997 0%, #28a745 100%)' },
  celebrating: { emoji: '🎉', color: '#e83e8c', bgGradient: 'linear-gradient(135deg, #e83e8c 0%, #fd7e14 100%)' },
  focused: { emoji: '🎯', color: '#007bff', bgGradient: 'linear-gradient(135deg, #007bff 0%, #6610f2 100%)' },
  sleeping: { emoji: '😴', color: '#6c757d', bgGradient: 'linear-gradient(135deg, #6c757d 0%, #343a40 100%)' }
};

export default function AkizeGuide({ courses = [], jobs = [], userStats, achievements = [] }: AkizeGuideProps) {
  const [showGuide, setShowGuide] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: 'system', content: '🎯 Vítej v Pracovním Vzdělávacím Portálu! Jsem Akize, tvůj AI kariérní průvodce.', timestamp: new Date() },
    { type: 'ai', content: '👋 Ahoj! Jsem Akize, tvůj AI průvodce kariérním rozvojem. Klikni na některý příkaz níže nebo se zeptej čímkoli!', timestamp: new Date() }
  ]);
  const [userInput, setUserInput] = useState('');
  const [mood, setMood] = useState<keyof typeof MOOD_STATES>('happy');
  const [showCommandMenu, setShowCommandMenu] = useState(true);
  const [typing, setTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Prompt Manager state
  const [showPrompts, setShowPrompts] = useState(false);
  const [prompts, setPrompts] = useState<PromptTemplate[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_PROMPTS;
    const saved = localStorage.getItem(PROMPT_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_PROMPTS; }
    }
    return DEFAULT_PROMPTS;
  });
  const [promptSearch, setPromptSearch] = useState('');
  const [promptCategory, setPromptCategory] = useState<string | null>(null);
  const [editingPrompt, setEditingPrompt] = useState<PromptTemplate | null>(null);
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [promptEditForm, setPromptEditForm] = useState<{ title: string; content: string; category: string; icon: string; tags: string }>({ title: '', content: '', category: 'Programování', icon: '📝', tags: '' });

  useEffect(() => {
    localStorage.setItem(PROMPT_STORAGE_KEY, JSON.stringify(prompts));
  }, [prompts]);

  const getPromptCategories = () => [...new Set(prompts.map(p => p.category))];
  
  const getFilteredPrompts = () => {
    let filtered = prompts;
    if (promptSearch) {
      const lower = promptSearch.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(lower) || p.content.toLowerCase().includes(lower) || p.tags.some(t => t.toLowerCase().includes(lower)));
    }
    if (promptCategory) filtered = filtered.filter(p => p.category === promptCategory);
    return filtered.sort((a, b) => b.usageCount - a.usageCount || b.updatedAt - a.updatedAt);
  };

  const usePrompt = (prompt: PromptTemplate) => {
    const updated = { ...prompt, usageCount: prompt.usageCount + 1, updatedAt: Date.now() };
    setPrompts(prev => prev.map(p => p.id === prompt.id ? updated : p));
    const message = prompt.content.includes('{') ? prompt.content.replace(/\{(\w+)\}/g, (_, key) => `[${key}]`) : prompt.content;
    setUserInput(message);
    setShowPrompts(false);
  };

  const savePrompt = () => {
    const { title, content, category, icon, tags } = promptEditForm;
    if (!title.trim() || !content.trim()) return;
    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);
    if (editingPrompt) {
      setPrompts(prev => prev.map(p => p.id === editingPrompt.id ? { ...p, title, content, category, icon, tags: tagList, updatedAt: Date.now() } : p));
    } else {
      const newPrompt: PromptTemplate = { id: `p-${Date.now()}`, title, content, category, icon, tags: tagList, createdAt: Date.now(), updatedAt: Date.now(), usageCount: 0 };
      setPrompts(prev => [newPrompt, ...prev]);
    }
    setShowPromptEditor(false);
    setEditingPrompt(null);
  };

  const deletePrompt = (id: string) => {
    if (confirm('Smazat tento prompt?')) setPrompts(prev => prev.filter(p => p.id !== id));
  };

  const openEditPrompt = (prompt: PromptTemplate) => {
    setEditingPrompt(prompt);
    setPromptEditForm({ title: prompt.title, content: prompt.content, category: prompt.category, icon: prompt.icon, tags: prompt.tags.join(', ') });
    setShowPromptEditor(true);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const calculateProgress = () => {
    if (!courses.length) return 0;
    const totalModules = courses.reduce((acc, c) => acc + c.modules.length, 0);
    const completedModules = courses.reduce((acc, c) => acc + c.modules.filter(m => m.isCompleted).length, 0);
    return Math.round((completedModules / totalModules) * 100);
  };

  const getMotivationalMessage = () => {
    const progress = calculateProgress();
    if (progress === 0) return 'Každý mistr byl někdy žák. Začni svou cestu ještě dnes! 🚀';
    if (progress < 25) return 'Skvělý začátek! Pokračuj v tom, jsi na dobré cestě! 💪';
    if (progress < 50) return 'Půlka cesty je za tebou! Tvůj pokrok je patrný! 🌟';
    if (progress < 75) return 'Vynikající! Jsi téměř u cíle, nezastavuj teď! 🏆';
    if (progress < 100) return 'Téměř tam! Poslední úsek je nejtěžší, ale zvládneš to! 🎯';
    return 'Gratuluji! Dokončil/a jsi všechny moduly! Jsi superstar! 🌈';
  };

  const getFilteredCommands = () => {
    let filtered = COMMAND_MENU;
    
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(cmd => 
        cmd.label.toLowerCase().includes(lowerSearch) ||
        cmd.description.toLowerCase().includes(lowerSearch) ||
        cmd.action.toLowerCase().includes(lowerSearch) ||
        cmd.category.toLowerCase().includes(lowerSearch)
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(cmd => cmd.category === selectedCategory);
    }
    
    return filtered;
  };

  const getCategories = () => {
    return [...new Set(COMMAND_MENU.map(cmd => cmd.category))];
  };

  const handleCommand = (command: CommandOption) => {
    setUserInput(command.action);
    handleSendMessage(command.action);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('ahoj') || lowerInput.includes('hi') || lowerInput.includes('hello')) {
      setMood('happy');
      const greetings = [
        'Ahoj! 😊 Těší mě, že jsi tu! Jak ti mohu dnes pomoci s tvou kariérou?',
        'Zdravím! 🎯 Jsem tu, abych ti pomohl. Co tě zajímá?',
        'Čau! 🚀 Výborně, pojďme na to! Co bys chtěl/a vylepšit?'
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    if (lowerInput.includes('pokrok') || lowerInput.includes('progress') || lowerInput.includes('statistik')) {
      setMood('thinking');
      const progress = calculateProgress();
      const hoursSpent = courses.reduce((acc, c) => acc + (c.spentHours || 0), 0);
      const completedModules = courses.reduce((acc, c) => acc + c.modules.filter(m => m.isCompleted).length, 0);
      const totalModules = courses.reduce((acc, c) => acc + c.modules.length, 0);
      const activeJobs = jobs.filter(j => j.status !== 'Rejected').length;
      const completedJobs = jobs.filter(j => j.status === 'Offer').length;

      return `
📊 **Tvoje statistiky:**

📚 Kurzy: ${courses.length} aktivních
⏱️ Celkem hodin: ${hoursSpent}h
✅ Dokončeno modulů: ${completedModules}/${totalModules} (${progress}%)
💼 Sledovaných nabídek: ${activeJobs}
🎯 Úspěšných žádostí: ${completedJobs}

${getMotivationalMessage()}
      `.trim();
    }

    if (lowerInput.includes('kariér') || lowerInput.includes('práce') || lowerInput.includes('job') || lowerInput.includes('zaměstnán')) {
      setMood('supportive');
      const activeJobsCount = jobs.filter(j => j.status === 'To Apply').length;
      const interviewCount = jobs.filter(j => j.status === 'Interview').length;

      return `
💼 **Kariérní přehled:**

Aktuálně sleduješ ${activeJobsCount} nabídek k přihlášení
${interviewCount} nabídek je v procesu interview

**Tipy pro tebe:**
${activeJobsCount > 0 ? '• Zkontroluj své nevyřízené žádosti' : '• Zajdi do Job Boardu a přidej si zajímavé nabídky'}
• Aktualizuj svůj profil a CV
• Nauč se nové dovednosti z doporučených kurzů

Potřebuješ poradit s konkrétní nabídkou? 📋
      `.trim();
    }

    if (lowerInput.includes('kurz') || lowerInput.includes('vzdělávání') || lowerInput.includes('učit') || lowerInput.includes('learn')) {
      setMood('excited');
      const topCourses = courses.slice(0, 3);
      const categories = [...new Set(courses.map(c => c.category))].slice(0, 3);

      return `
📚 **Vzdělávací přehled:**

Aktuálních kurzů: ${courses.length}
${courses.length > 0 ? `Tvoje kategorie: ${categories.join(', ')}` : 'Zatím nemáš žádné kurzy. Doporučuji začít!'}

${topCourses.length > 0 ? `
**Tvoje aktivní kurzy:**
${topCourses.map(c => `• ${c.title}`).join('\n')}
` : ''}

**Chceš doporučení kurzů pro konkrétní kariéru?** 🎯
      `.trim();
    }

if (lowerInput.includes('motiv') || lowerInput.includes('povzbudit') || lowerInput.includes('support') || lowerInput.includes('help')) {
      setMood('supportive');
      const motivations = [
        '🌟 Pamatuj: Každý expert byl once začátečník. Tvoje cesta je unikátní!',
        '💪 Tvůj potenciál je nekonečný. Věřím v tebe!',
        '🚀 Každý den učení je krokem vpřed. Neustupuj!',
        '🎯 Úspěch je součet malých kroků. Pokračuj!',
        '⭐ Jsi na správné cestě. Drž tempo!'
      ];
      return `${getMotivationalMessage()}\n\n${motivations[Math.floor(Math.random() * motivations.length)]}`;
    }

    if (lowerInput.includes('achievement') || lowerInput.includes('odznak') || lowerInput.includes('úspěch') || lowerInput.includes('badge')) {
      setMood('proud');
      const unlockedCount = achievements.filter(a => a.unlockedAt).length;

      return `
🏆 **Tvoje achievementy:**

Celkem achievementů: ${achievements.length}
Odemčeno: ${unlockedCount}
Zbývá: ${achievements.length - unlockedCount}

${achievements.filter(a => a.unlockedAt).slice(0, 3).map(a => `✅ ${a.icon} ${a.title}`).join('\n') || 'Zatím žádné odemčené achievementy. Začni plnit mise!'}

Chceš vidět všechny achievementy? 🎖️
      `.trim();
    }

    if (lowerInput.includes('programování') || lowerInput.includes('coding') || lowerInput.includes('python') || lowerInput.includes('javascript')) {
      setMood('excited');
      return `
🚀 **Programování je skvělá volba!**

Doporučuji zaměřit se na:
• **Python** - ideální pro začátečníky, AI a data science
• **JavaScript/TypeScript** - webový vývoj, Next.js, React
• **Java/C#** - enterprise aplikace, stabilní kariéra

**Tip:** Začni s jedním jazykem a zvládni ho dobře, než přejdeš na další.

Chceš doporučení konkrétního kurzu? 📚
      `.trim();
    }

    if (lowerInput.includes('ai') || lowerInput.includes('umělá inteligence') || lowerInput.includes('machine learning') || lowerInput.includes('ml')) {
      setMood('excited');
      return `
🤖 **AI a Machine Learning - budoucnost!**

Toto je rychle rostoucí oblast s vysokými platy.

**Doporučená cesta:**
1. Python základy
2. Pandas & NumPy pro data
3. Scikit-learn pro ML
4. TensorFlow/PyTorch pro deep learning
5. Praktické projekty na Kaggle

**Průměrný plat v ČR:** 80-150k CZK 💰

Chceš kurz pro AI? 📚
      `.trim();
    }

    if (lowerInput.includes('co umíš') || lowerInput.includes('help') || lowerInput.includes('commands') || lowerInput.includes('funkce')) {
      setMood('happy');
      return `
🤖 **Co umím:**

📊 **Pokrok & Statistiky**
   "Jaký je můj pokrok?" • "Kolik hodin jsem naučil/a?"

💼 **Kariérní poradenství**
   "Chci změnit kariéru" • "Jaké jsou možnosti v IT?"

📚 **Doporučení kurzů**
   "Doporuč kurz pro začátečníky" • "Jak se naučit Python?"

🎯 **Motivace**
   "Potřebuji motivaci" • "Povzbuď mě"

🏆 **Achievementy**
   "Jaké mám achievementy?" • "Co mám odemknout?"

❓ **Obecné dotazy**
   "Co umíš?" • "Pomoz mi s..."

Jen se zeptej! 😊
      `.trim();
    }

    if (lowerInput.includes('děkuji') || lowerInput.includes('dik') || lowerInput.includes('thanks')) {
      setMood('proud');
      return `
🙏 **Rádo se stalo!**

Jsme tu od toho, abychom ti pomohli. 
Kdykoli budeš potřebovat radu, podporu nebo jen povzbudivé slovo, jsem tady! 💪

Měj se krásně a hodně úspěchů! 🌟
      `.trim();
    }

    const defaultResponses = [
      'Zajímavá otázka! 🤔 Můžeš ji formulovat konkrétněji? Rád ti pomohu!',
      'Hmm, to je dobrý bod! 📝 Řekni mi více o tom, co tě zajímá?',
      'Rozumím! 💡 Co přesně bys chtěl/a vědět o tomto tématu?',
      'Skvělá otázka! 🎯 Můžeš mi dát více kontextu, abych ti lépe pomohl/a?'
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = (customInput?: string) => {
    const inputToUse = customInput || userInput;
    if (!inputToUse.trim()) return;

    const userMessage: ChatMessage = {
      type: 'user',
      content: inputToUse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setShowCommandMenu(false);
    setTyping(true);

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        type: 'ai',
        content: generateAIResponse(inputToUse),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setTyping(false);
    }, 800 + Math.random() * 700);
  };

  const currentMood = MOOD_STATES[mood];

  return (
    <>
      <div
        className="position-fixed bottom-0 end-0 m-4 z-index-1050"
        style={{ zIndex: 1050 }}
      >
        <Button
          variant="primary"
          size="lg"
          className="rounded-circle shadow-lg position-relative"
          onClick={() => setShowGuide(true)}
          style={{
            width: '70px',
            height: '70px',
            background: currentMood.bgGradient,
            border: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
          }}
        >
          <span style={{ fontSize: '1.8rem' }}>{currentMood.emoji}</span>
          <span
            className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle"
            style={{ animation: 'pulse 2s infinite' }}
          >
            <span className="visually-hidden">Online</span>
          </span>
        </Button>
        <style>{`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .akize-message:hover {
            animation: bounce 0.5s ease;
          }
          .command-card {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .command-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          .command-card.active {
            border: 2px solid ${currentMood.color};
            background: ${currentMood.color}15;
          }
        `}</style>
      </div>

      <Modal
        show={showGuide}
        onHide={() => setShowGuide(false)}
        size="xl"
        centered
        className="akize-modal"
      >
        <Modal.Header
          className="text-white"
          style={{ background: currentMood.bgGradient }}
        >
          <Modal.Title className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '1.8rem' }}>{currentMood.emoji}</span>
            <div>
              <div className="fw-bold fs-5">Akize</div>
              <small className="text-white-50">AI Kariérní Průvodce</small>
            </div>
          </Modal.Title>
          <div className="d-flex align-items-center gap-2 ms-auto">
            <Badge bg="light" text="dark" className="d-flex align-items-center gap-1">
              <span>📚</span>
              <span>{courses.length}</span>
            </Badge>
            <Badge bg="light" text="dark" className="d-flex align-items-center gap-1">
              <span>💼</span>
              <span>{jobs.length}</span>
            </Badge>
            <Button
              variant={showPrompts ? 'light' : 'link'}
              size="sm"
              className={`text-white ${showPrompts ? 'text-dark' : ''}`}
              onClick={() => { setShowPrompts(!showPrompts); setShowCommandMenu(false); }}
              title="Správce promptů"
            >
              📝 Prompty ({prompts.length})
            </Button>
            <Button
              variant="link"
              className="text-white p-0 ms-1"
              onClick={() => setShowGuide(false)}
              style={{ fontSize: '1.5rem', lineHeight: 1 }}
            >
              ×
            </Button>
          </div>
        </Modal.Header>

        <Modal.Body className="p-0" style={{ height: '600px', display: 'flex', flexDirection: 'column', background: '#f8f9fa' }}>
          {/* Command Menu Panel */}
          {showCommandMenu && !showPrompts && (
            <div className="p-3 border-bottom bg-white" style={{ flexShrink: 0 }}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="fw-bold text-dark">⚡ Rychlé příkazy</span>
                <Badge bg={currentMood.color.replace('#', '')} className="text-white">
                  {COMMAND_MENU.length} možností
                </Badge>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="ms-auto"
                  onClick={() => { setShowPrompts(true); setShowCommandMenu(false); }}
                >
                  📝 Prompty
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setShowCommandMenu(false)}
                >
                  ✕ Skrýt
                </Button>
              </div>
              
              {/* Search */}
              <Form.Control
                type="text"
                placeholder="🔍 Hledat příkaz..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2"
                size="sm"
              />
              
              {/* Category Filters */}
              <div className="d-flex flex-wrap gap-1 mb-2">
                <Button
                  variant={selectedCategory === null ? 'primary' : 'outline-secondary'}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Vše
                </Button>
                {getCategories().map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              
              {/* Command Grid */}
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <div className="row g-2">
                  {getFilteredCommands().map(cmd => (
                    <div key={cmd.id} className="col-6 col-md-4 col-lg-3">
                      <Card
                        className="command-card border h-100"
                        onClick={() => handleCommand(cmd)}
                      >
                        <Card.Body className="p-2">
                          <div className="d-flex align-items-center gap-2">
                            <span style={{ fontSize: '1.2rem' }}>{cmd.icon}</span>
                            <div className="flex-grow-1 min-width-0">
                              <div className="fw-bold small text-truncate">{cmd.label}</div>
                              <small className="text-muted d-block text-truncate" style={{ fontSize: '0.7rem' }}>
                                {cmd.description}
                              </small>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Prompt Manager Panel */}
          {showPrompts && (
            <div className="p-3 border-bottom bg-white" style={{ flexShrink: 0 }}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="fw-bold text-dark">📝 Správce promptů</span>
                <Badge bg="primary">{prompts.length} promptů</Badge>
                <Button variant="outline-primary" size="sm" className="ms-auto" onClick={() => { setEditingPrompt(null); setPromptEditForm({ title: '', content: '', category: 'Programování', icon: '📝', tags: '' }); setShowPromptEditor(true); }}>
                  + Nový prompt
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => { setShowPrompts(false); setShowCommandMenu(true); }}>
                  ⚡ Příkazy
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => setShowPrompts(false)}>✕</Button>
              </div>

              <Form.Control type="text" placeholder="🔍 Hledat v promptech..." value={promptSearch} onChange={(e) => setPromptSearch(e.target.value)} className="mb-2" size="sm" />

              <div className="d-flex flex-wrap gap-1 mb-2">
                <Button variant={promptCategory === null ? 'primary' : 'outline-secondary'} size="sm" onClick={() => setPromptCategory(null)}>Vše</Button>
                {getPromptCategories().map(cat => (
                  <Button key={cat} variant={promptCategory === cat ? 'primary' : 'outline-secondary'} size="sm" onClick={() => setPromptCategory(cat)}>{cat}</Button>
                ))}
              </div>

              <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                <Row className="g-2">
                  {getFilteredPrompts().map(p => (
                    <Col key={p.id} xs={6} md={4}>
                      <Card className="command-card border h-100" onClick={() => usePrompt(p)}>
                        <Card.Body className="p-2" style={{ cursor: 'pointer' }}>
                          <div className="d-flex justify-content-between align-items-start mb-1">
                            <div className="d-flex align-items-center gap-1">
                              <span>{p.icon}</span>
                              <span className="fw-bold small text-truncate d-inline-block" style={{ maxWidth: '100px' }}>{p.title}</span>
                            </div>
                            <div className="d-flex gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                              <Button variant="link" size="sm" className="p-0 text-primary" style={{fontSize:'0.65rem'}} onClick={() => openEditPrompt(p)} title="Upravit">✏️</Button>
                              <Button variant="link" size="sm" className="p-0 text-danger" style={{fontSize:'0.65rem'}} onClick={() => deletePrompt(p.id)} title="Smazat">🗑️</Button>
                            </div>
                          </div>
                          <small className="text-muted d-block text-truncate" style={{ fontSize: '0.65rem' }}>
                            {p.content.substring(0, 60)}...
                          </small>
                          <div className="d-flex justify-content-between align-items-center mt-1">
                            <Badge bg="light" text="dark" style={{ fontSize: '0.55rem' }}>{p.category}</Badge>
                            <small className="text-muted" style={{ fontSize: '0.6rem' }}>🔄 {p.usageCount}</small>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          )}

          {/* Prompt Editor Modal */}
          <Modal show={showPromptEditor} onHide={() => setShowPromptEditor(false)} size="lg" centered>
            <Modal.Header closeButton className="bg-primary text-white">
              <Modal.Title>{editingPrompt ? '✏️ Upravit prompt' : '📝 Nový prompt'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-bold small">Název</Form.Label>
                  <Form.Control type="text" value={promptEditForm.title} onChange={(e) => setPromptEditForm({...promptEditForm, title: e.target.value})} placeholder="Např. Code Review Expert" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-bold small">Prompt text <span className="text-muted">(použij {'{proměnná}'} pro dynamické hodnoty)</span></Form.Label>
                  <Form.Control as="textarea" rows={4} value={promptEditForm.content} onChange={(e) => setPromptEditForm({...promptEditForm, content: e.target.value})} placeholder="Napiš prompt..." />
                </Form.Group>
                <Row>
                  <Col xs={4}>
                    <Form.Group className="mb-2">
                      <Form.Label className="fw-bold small">Kategorie</Form.Label>
                      <Form.Select value={promptEditForm.category} onChange={(e) => setPromptEditForm({...promptEditForm, category: e.target.value})}>
                        <option>Programování</option><option>Kariéra</option><option>Vzdělávání</option><option>Finance</option><option>Motivace</option><option>Life OS</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={2}>
                    <Form.Group className="mb-2">
                      <Form.Label className="fw-bold small">Ikona</Form.Label>
                      <Form.Control type="text" value={promptEditForm.icon} onChange={(e) => setPromptEditForm({...promptEditForm, icon: e.target.value})} />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label className="fw-bold small">Tagy <span className="text-muted">(čárkou)</span></Form.Label>
                      <Form.Control type="text" value={promptEditForm.tags} onChange={(e) => setPromptEditForm({...promptEditForm, tags: e.target.value})} placeholder="ai, coding, review" />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowPromptEditor(false)}>Zrušit</Button>
              <Button variant="primary" onClick={savePrompt} disabled={!promptEditForm.title.trim() || !promptEditForm.content.trim()}>
                {editingPrompt ? '💾 Uložit změny' : '➕ Vytvořit prompt'}
              </Button>
            </Modal.Footer>
          </Modal>
          
          {/* Chat Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
            {!showCommandMenu && (
              <Button
                variant="outline-primary"
                size="sm"
                className="mb-3 w-100"
                onClick={() => setShowCommandMenu(true)}
              >
                📋 Zobrazit rychlé příkazy ({COMMAND_MENU.length})
              </Button>
            )}
            
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`d-flex mb-3 ${msg.type === 'user' ? 'justify-content-end' : 'justify-content-start'} akize-message`}
              >
                {msg.type !== 'user' && (
                  <div
                    className="me-2 mt-1"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: currentMood.bgGradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem',
                      flexShrink: 0
                    }}
                  >
                    {currentMood.emoji}
                  </div>
                )}
                <Card
                  className={`shadow-sm ${msg.type === 'user' ? 'bg-primary text-white' : msg.type === 'system' ? 'bg-warning text-dark' : 'bg-white'}`}
                  style={{ maxWidth: msg.type === 'system' ? '100%' : '75%' }}
                >
                  <Card.Body className="py-2 px-3">
                    {msg.type === 'system' && (
                      <small className="text-muted d-block mb-1 opacity-75">
                        📢 System
                      </small>
                    )}
                    {msg.type === 'ai' && (
                      <small className="text-muted d-block mb-1">
                        {currentMood.emoji} Akize
                      </small>
                    )}
                    {msg.type === 'user' && (
                      <small className={`${msg.type === 'user' ? 'text-white-50' : 'text-muted'} d-block mb-1`}>
                        👤 Ty
                      </small>
                    )}
                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem' }}>{msg.content}</div>
                    <small className={`d-block mt-2 ${msg.type === 'user' ? 'text-white-50' : 'text-muted'}`}>
                      {msg.timestamp.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
                    </small>
                  </Card.Body>
                </Card>
              </div>
            ))}

            {typing && (
              <div className="d-flex mb-3 justify-content-start">
                <div
                  className="me-2 mt-1"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: currentMood.bgGradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem'
                  }}
                >
                  {currentMood.emoji}
                </div>
                <Card className="bg-white shadow-sm" style={{ maxWidth: '75%' }}>
                  <Card.Body className="py-3 px-3">
                    <small className="text-muted d-block mb-1">{currentMood.emoji} Akize</small>
                    <div className="d-flex gap-1">
                      <span className="spinner-border spinner-border-sm text-secondary" role="status" aria-hidden="true"></span>
                      <span className="spinner-border spinner-border-sm text-secondary" role="status" aria-hidden="true" style={{ animationDelay: '0.2s' }}></span>
                      <span className="spinner-border spinner-border-sm text-secondary" role="status" aria-hidden="true" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </Modal.Body>

        <Modal.Footer className="p-3 border-top">
          <Form className="w-100 d-flex gap-2" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
            <Form.Control
              type="text"
              placeholder="Napiš svou otázku nebo požadavek..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="rounded-pill"
            />
            <Button
              variant="primary"
              onClick={() => handleSendMessage()}
              disabled={!userInput.trim() || typing}
              className="rounded-circle px-3"
              style={{
                background: currentMood.bgGradient,
                border: 'none'
              }}
            >
              {typing ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                '➤'
              )}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
}