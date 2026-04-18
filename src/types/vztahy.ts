// ============================================================================
// VZTAHY - Typy pro sekci vztahů (rodina, láska, přátelé, přítelkyně)
// ============================================================================

export type VztahType = 'rodina' | 'laska' | 'pratele' | 'pritelkyne';

export type TrustLevel = 'unknown' | 'low' | 'medium' | 'high' | 'absolute';

export interface RelationshipEvent {
  id: string;
  date: string;
  type: 'positive' | 'negative' | 'milestone';
  title: string;
  description: string;
  impact: number;
  category: string;
  imageUrl?: string;
}

export interface RelationshipMemory {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
  location?: string;
  people: string[];
  emotions: string[];
}

export interface RelationshipGoal {
  id: string;
  title: string;
  description: string;
  category: 'communication' | 'trust' | 'time' | 'support' | 'growth';
  targetDate?: string;
  progress: number;
  isCompleted: boolean;
  steps: { id: string; title: string; isCompleted: boolean }[];
}

export interface RelationshipStats {
  trustScore: number;
  communicationScore: number;
  timeSpentScore: number;
  supportScore: number;
  overallScore: number;
  streak: number;
  totalMemories: number;
  goalsCompleted: number;
  eventsThisMonth: number;
}

export interface RelationshipAdvice {
  id: string;
  category: 'communication' | 'trust' | 'conflict' | 'growth' | 'intimacy';
  title: string;
  content: string;
  tips: string[];
  icon: string;
}

export const TRUST_LEVELS: { key: TrustLevel; label: string; color: string; minScore: number }[] = [
  { key: 'unknown', label: 'Neznámá', color: '#9E9E9E', minScore: 0 },
  { key: 'low', label: 'Nízká', color: '#F44336', minScore: 20 },
  { key: 'medium', label: 'Střední', color: '#FF9800', minScore: 40 },
  { key: 'high', label: 'Vysoká', color: '#4CAF50', minScore: 70 },
  { key: 'absolute', label: 'Absolutní', color: '#E91E63', minScore: 90 },
];

export const RELATIONSHIP_ADVICE: RelationshipAdvice[] = [
  {
    id: 'comm-1',
    category: 'communication',
    title: ' Aktivní naslouchání',
    content: 'Aktivní naslouchání je základem každého zdravého vztahu. Znamená to být plně přítomen v konverzaci, dávat pozor nejen na slova, ale i na emoce a řeč těla.',
    tips: [
      'Udělejte si čas bez telefonů a jiných rozptýlení',
      'Opakujte, co jste slyšeli, abyste se ujistili, že rozumíte',
      'Ptejte se na pocity, ne jen na fakta',
      'Neskákejte do řeči, nechte druhého domluvit',
    ],
    icon: '👂',
  },
  {
    id: 'comm-2',
    category: 'communication',
    title: ' Vyjadřování pocitů',
    content: 'Otevřeně vyjadřovat pocity je klíčové pro hluboké spojení. Používejte "já" výroky místo obvinění.',
    tips: [
      'Místo "Ty nikdy..." řekněte "Cítím, když..."',
      'Sdílejte positive i negative pocity',
      'Nepotlačujte emoce - vyjádřete je zdravým způsobem',
      'Vytvořte bezpečný prostor pro otevřenost',
    ],
    icon: '💭',
  },
  {
    id: 'trust-1',
    category: 'trust',
    title: ' Budování důvěry',
    content: 'Důvěra se buduje malými činy každý den. Konzistence mezi slovy a činy je základem.',
    tips: [
      'Dodržujte své sliby a závazky',
      'Buďte transparentní ve svých rozhodnutích',
      'Respektujte soukromí a hranice',
      'Přiznávejte chyby a omluvte se',
    ],
    icon: '🤝',
  },
  {
    id: 'trust-2',
    category: 'trust',
    title: ' Propuštění ze zrady',
    content: 'Pokud došlo k porušení důvěry, proces odpuštění vyžaduje čas a upřímnou komunikaci.',
    tips: [
      'Emoce jsou validní - nepotlačujte je',
      'Komunikujte o tom, co potřebujete k uzdravení',
      'Stanovte jasné hranice do budoucna',
      'Rozhodněte se prokazatelně změnit chování',
    ],
    icon: '💝',
  },
  {
    id: 'conflict-1',
    category: 'conflict',
    title: ' Zdravé řešení konfliktů',
    content: 'Konflikty jsou normální - důležité je, jak je řešíte. Vyhněte se eskalaci a útočnému chování.',
    tips: [
      'Mluvte o problému, ne o osobě',
      'Hledejte kompromis, ne výhru',
      'Dejte si pauzu, pokud je to příliš emotivní',
      'Fokusujte se na řešení, ne na vinu',
    ],
    icon: '⚖️',
  },
  {
    id: 'conflict-2',
    category: 'conflict',
    title: ' Konstruktivní kritika',
    content: 'Umět dát a přijmout zpětnou vazbu je dovednost, která posiluje vztah.',
    tips: [
      'Buďte konkrétní, ne obecní',
      'Začněte pozitivem, pak návrh na zlepšení',
      'Přijímejte kritiku s otevřeností',
      'Děkujte za upřímnost',
    ],
    icon: '📝',
  },
  {
    id: 'growth-1',
    category: 'growth',
    title: ' Společný růst',
    content: 'Nejlepší vztahy jsou ty, kde obě strany rostou společně i individuálně.',
    tips: [
      'Podporujte navzájem své cíle a sny',
      'Trávte čas i odděleně - každý potřebuje svůj prostor',
      'Učte se nové věci společně',
      'Reflektujte společně uplynulé období',
    ],
    icon: '🌱',
  },
  {
    id: 'growth-2',
    category: 'growth',
    title: ' Kvalitní čas společně',
    content: 'Kvalita času společně je důležitější než množství. Vytvářejte společné zážitky.',
    tips: [
      'Plánujte pravidelné "randez-vous"',
      'Zkoušejte nové aktivity společně',
      'Vytvářejte tradice a rituály',
      'Digitální detox během společného času',
    ],
    icon: '⏰',
  },
  {
    id: 'intimacy-1',
    category: 'intimacy',
    title: ' Emocionální intimita',
    content: 'Hluboké emocionální spojení je základem dlouhodobého vztahu.',
    tips: [
      'Sdílejte své vnitřní myšlenky a obavy',
      'Buďte zranitelní jeden před druhým',
      'Ptejte se na hlubší témata',
      'Podporujte emocionální bezpečí',
    ],
    icon: '💞',
  },
  {
    id: 'intimacy-2',
    category: 'intimacy',
    title: ' Fyzická intimita',
    content: 'Fyzická blízkost je důležitým projevem lásky a spojení.',
    tips: [
      'Malé doteky během dne jsou důležité',
      'Nechte si čas jen pro sebe',
      'Komunikujte o potřebách',
      'Buďte pozorní k signálům druhého',
    ],
    icon: '💏',
  },
];

export function calculateTrustLevel(score: number): TrustLevel {
  if (score >= 90) return 'absolute';
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  if (score >= 20) return 'low';
  return 'unknown';
}

export function getTrustColor(score: number): string {
  if (score >= 90) return '#E91E63';
  if (score >= 70) return '#4CAF50';
  if (score >= 40) return '#FF9800';
  if (score >= 20) return '#F44336';
  return '#9E9E9E';
}

export function getTrustLabel(score: number): string {
  const level = TRUST_LEVELS.find((l, i, arr) => {
    const nextLevel = arr[i + 1];
    return score >= l.minScore && (!nextLevel || score < nextLevel.minScore);
  });
  return level?.label || 'Neznámá';
}
