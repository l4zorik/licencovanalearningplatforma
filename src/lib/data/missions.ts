export interface MissionTask {
  id: string;
  title: string;
  description: string;
  xp: number;
  isCompleted?: boolean;
}

export interface MissionPhase {
  id: string;
  title: string;
  description: string;
  tasks: MissionTask[];
  reward?: string; // e.g. "Badge: Researcher"
}

export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  xp: number;
  estimatedTime: string; // e.g. "2 weeks"
  tags: string[];
  description: string;
  
  // AI Instructor / Video Content
  instructor: {
    name: string;
    role: string;
    avatarUrl?: string; // Path to AI generated avatar image
    introVideoUrl?: string; // Path to AI generated video
  };
  briefing: string; // Text for the AI to "speak"

  phases: MissionPhase[];
  
  status: "Locked" | "Available" | "In Progress" | "Completed";
  progress: number; // 0-100
}

export const MISSIONS: Mission[] = [
  {
    id: "cnc-fundamentals",
    title: "Základy CNC Obrábění",
    subtitle: "Ovládni CNC stroje od dokumentace po praktickou práci",
    category: "Manufacturing & Production",
    difficulty: "Beginner",
    xp: 3000,
    estimatedTime: "3 týdny",
    tags: ["CNC", "Obrábění", "Technická Dokumentace", "Programování", "Bezpečnost"],
    description: "Nauč se základy CNC obrábění - od čtení technických výkresů po psaní G-kódů a bezpečnou práci se stroji.",
    instructor: {
      name: "Technik CNC",
      role: "CNC Manufacturing Mentor",
      introVideoUrl: "/videos/missions/cnc-intro.mp4",
      avatarUrl: "/images/cnc-mentor-avatar.png"
    },
    briefing: "Vítej v CNC světě! CNC stroje jsou srdcem moderní výroby. Naučíš se vše od základů - dokumentaci, nástroje, upínání, programování až po bezpečnou práci.",
    status: "Available",
    progress: 0,
    phases: [
      {
        id: "cnc-phase-1",
        title: "Fáze 1: Technická Dokumentace",
        description: "Nauč se číst a rozumět technickým výkresům a dokumentaci CNC strojů.",
        tasks: [
          { id: "cnc-t1", title: "Základy technických výkresů", description: "Osvoj si čtení rozměrů, tolerancí a symbolů na výkresech.", xp: 100 },
          { id: "cnc-t2", title: "CNC stroje a jejich komponenty", description: "Seznam se s hlavními částmi CNC frézky a soustruhu.", xp: 100 },
          { id: "cnc-t3", title: "Bezpečnostní předpisy", description: "Nauč se základní bezpečnostní pravidla při práci s CNC.", xp: 100 }
        ]
      },
      {
        id: "cnc-phase-2",
        title: "Fáze 2: Nástroje a Upínání",
        description: "Pochop výběr a použití CNC nástrojů a způsoby upínání obrobků.",
        tasks: [
          { id: "cnc-t4", title: "Typy CNC nástrojů", description: "Seznam se s frézkami, vrtáky a dalšími nástroji.", xp: 150 },
          { id: "cnc-t5", title: "Výběr nástrojů podle materiálu", description: "Nauč se vybírat správné nástroje pro různé materiály.", xp: 150 },
          { id: "cnc-t6", title: "Upínací přípravky", description: "Osvoj si základy upínání obrobků na CNC strojích.", xp: 150 }
        ]
      },
      {
        id: "cnc-phase-3",
        title: "Fáze 3: CNC Programování",
        description: "Nauč se psát základní G-kódy pro CNC stroje.",
        tasks: [
          { id: "cnc-t7", title: "Základy G-kódu", description: "Seznam se se základními G-kódy (G00, G01, G02, G03).", xp: 200 },
          { id: "cnc-t8", title: "Psaní jednoduchých programů", description: "Napiš program pro základní obrábění.", xp: 250 },
          { id: "cnc-t9", title: "Simulace programů", description: "Otestuj své programy v CNC simulátoru.", xp: 200 }
        ]
      },
      {
        id: "cnc-phase-4",
        title: "Fáze 4: Praktická Práce",
        description: "Aplikuj znalosti v praxi pod dohledem instruktora.",
        tasks: [
          { id: "cnc-t10", title: "Nastavení stroje", description: "Nauč se správně nastavit CNC stroj pro práci.", xp: 200 },
          { id: "cnc-t11", title: "První obrobek", description: "Vyrob svůj první jednoduchý díl na CNC.", xp: 300 },
          { id: "cnc-t12", title: "Kvalitní kontrola", description: "Nauč se kontrolovat kvalitu vyrobených dílů.", xp: 200 }
        ],
        reward: "Badge: CNC Operator"
      }
    ]
  },
  {
    id: "portfolio-mastery",
    title: "Budování Digitální Identity",
    subtitle: "Vytvoř portfolio, které ti získá práci snů",
    category: "Web Development",
    difficulty: "Beginner",
    xp: 2500,
    estimatedTime: "2 týdny",
    tags: ["HTML", "CSS", "Personal Brand", "Git"],
    description: "Vytvoř svůj první profesionální osobní web. Nejde jen o kód, ale o to, jak se prezentuješ světu.",
    instructor: {
      name: "Akize",
      role: "Digital Career Mentor",
      introVideoUrl: "/videos/missions/portfolio-intro.mp4", // Placeholder for AI video
      avatarUrl: "/images/akize-avatar.png"
    },
    briefing: "Ahoj! Jsem Akize. Dnes nebudujeme jen web. Budujeme tvou budoucnost. Tvé portfolio je tvá vizitka v digitálním světě.",
    status: "In Progress",
    progress: 15,
    phases: [
      {
        id: "phase-1",
        title: "Fáze 1: Analýza a Design",
        description: "Než napíšeš řádek kódu, musíš vědět, co a proč stavíš.",
        tasks: [
          { id: "t1", title: "Průzkum trhu", description: "Najdi 3 portfolia seniorů a sepiš, co se ti na nich líbí.", xp: 50 },
          { id: "t2", title: "Wireframe", description: "Nakresli hrubý náčrt svého webu (papír nebo Figma).", xp: 100 },
          { id: "t3", title: "Obsahová strategie", description: "Sepiš texty pro sekce 'O mně' a 'Projekty'.", xp: 75 }
        ]
      },
      {
        id: "phase-2",
        title: "Fáze 2: Vývoj Jádra",
        description: "Postav pevné základy pomocí HTML a CSS.",
        tasks: [
          { id: "t4", title: "HTML Struktura", description: "Vytvoř sémantické HTML pro všechny sekce.", xp: 150 },
          { id: "t5", title: "CSS Styling", description: "Aplikuj moderní CSS (Flexbox/Grid) pro layout.", xp: 200 },
          { id: "t6", title: "Responsivita", description: "Zajisti, že web vypadá skvěle na mobilu.", xp: 200 }
        ]
      },
      {
        id: "phase-3",
        title: "Fáze 3: Nasazení",
        description: "Ukaž své dílo světu.",
        tasks: [
          { id: "t7", title: "Git Repository", description: "Pushni kód na GitHub.", xp: 50 },
          { id: "t8", title: "Vercel Deployment", description: "Nasaď web na Vercel/Netlify.", xp: 100 },
          { id: "t9", title: "LinkedIn Post", description: "Sdílej své nové portfolio na LinkedInu.", xp: 150 }
        ],
        reward: "Badge: Digital Architect"
      }
    ]
  },
  {
    id: "ai-news-detector",
    title: "Detektor Fake News",
    subtitle: "Bojuj proti dezinformacím pomocí AI",
    category: "Data Science & AI",
    difficulty: "Advanced",
    xp: 5000,
    estimatedTime: "4 týdny",
    tags: ["Python", "NLP", "Machine Learning", "Ethics"],
    description: "Vytvoř model strojového učení, který dokáže s vysokou přesností rozlišit pravdivé zprávy od dezinformací.",
    instructor: {
      name: "Dr. Nexus",
      role: "AI Ethics Specialist",
      introVideoUrl: "/videos/missions/nexus-intro.mp4",
      avatarUrl: "/images/nexus-avatar.png"
    },
    briefing: "Vítej v laboratoři. Informace jsou zbraň. Potřebujeme obranu. Tvým úkolem je vycvičit model, který ochrání pravdu.",
    status: "Available",
    progress: 0,
    phases: [
      {
        id: "p1",
        title: "Data Collection",
        description: "Získej kvalitní dataset pro trénink.",
        tasks: [
          { id: "dt1", title: "Dataset Search", description: "Najdi vhodný dataset (např. Kaggle Fake News).", xp: 100 },
          { id: "dt2", title: "Data Cleaning", description: "Vyčisti data pomocí Pandas.", xp: 200 }
        ]
      },
      {
        id: "p2",
        title: "Model Training",
        description: "Trénink NLP modelu.",
        tasks: [
          { id: "mt1", title: "Tokenization", description: "Připrav text pro model.", xp: 150 },
          { id: "mt2", title: "LSTM Model", description: "Vytvoř a natrénuj LSTM síť.", xp: 500 }
        ]
      }
    ]
  },
  {
    id: "startup-simulator",
    title: "Startup Simulator",
    subtitle: "Od nápadu k první investici",
    category: "Business",
    difficulty: "Intermediate",
    xp: 3000,
    estimatedTime: "3 týdny",
    tags: ["Entrepreneurship", "Finance", "Pitching"],
    description: "Simulace založení startupu. Vytvoř business plán, MVP a pitch deck pro investory.",
    instructor: {
      name: "Sarah Venture",
      role: "Angel Investor",
      introVideoUrl: "/videos/missions/sarah-intro.mp4",
      avatarUrl: "/images/sarah-avatar.png"
    },
    briefing: "Máš nápad? Skvělé. Ale nápad je jen 1%. Zbytek je exekuce. Ukaž mi, že tvůj projekt má potenciál vydělávat.",
    status: "Available",
    progress: 0,
    phases: [
      {
        id: "bp1",
        title: "Validace",
        description: "Ověř, že tvůj problém existuje.",
        tasks: []
      }
    ]
  }
];
