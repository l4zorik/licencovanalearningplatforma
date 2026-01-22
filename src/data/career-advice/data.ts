export interface CareerAdvice {
  id: string;
  category: CareerAdviceCategory;
  title: string;
  content: string;
  source?: string;
  tags: string[];
}

export type CareerAdviceCategory = 
  | 'Getting Started'
  | 'Job Search'
  | 'Interview'
  | 'Negotiation'
  | 'Career Growth'
  | 'Work-Life Balance'
  | 'Networking'
  | 'Skill Development'
  | 'Leadership'
  | 'Personal Development';

export const CAREER_ADVICE_DATA: CareerAdvice[] = [
  // === GETTING STARTED ===
  {
    id: 'career-marathon-not-sprint',
    category: 'Getting Started',
    title: 'Kariéra je maraton, ne sprint',
    content: `Zpomalte tempo. Když jste mladí, máte tendenci být netrpěliví. Až budete starší, uvědomíte si, že opravdu není kam spěchat.

K životu a kariéře, která by ten život vyplnila a zaplatila účty, musíte přistupovat z dlouhodobého hlediska. Pokud budete divočit, zprotivíte si to, co jste dříve měli rádi.

Nechte si čas na vydechnutí a vlastní růst. Věci přijdou samy, pokud budete pracovat tvrdě a budete věnovat čas sebezlepšování.

Pokud jste neustále ve spěchu, jste jen unavení a jako bez duše. Je v pořádku dát si na čas, zpomalit. Uvidíte tak věci, kterých jste si dříve ani nevšimli.`,
    source: 'Shane Rodgers',
    tags: ['trpělivost', 'dlouhodobý pohled', 'work-life balance', 'sebezlepšování']
  },
  {
    id: 'mastery-through-repetition',
    category: 'Getting Started',
    title: 'Většina úspěchu pramení z opakování, nikoliv z nových věcí',
    content: `Opravdové odborné znalosti nejsou jen pro vyvolené. Málokdo má super schopnosti. Většinou jsou to vytrvalí, trpěliví lidé, kteří se dívali na věc z dlouhodobého hlediska. Také milují to, co dělají.

Přesně to platí pro ty nejlepší v oboru - strávili tisíce hodin zdokonalováním svého řemesla.

Poučení: Nejdříve se zdokonalte v tom, co už umíte, a až potom se vrhejte do nových věcí. Pokud něco takového najdete, nenechte si to utéct.`,
    source: 'Stefan Ackerie / Malcolm Gladwell - Outliers',
    tags: ['mistrovství', 'praxe', '10 000 hodin', 'vytrvalost']
  },
  {
    id: 'start-before-ready',
    category: 'Getting Started',
    title: 'Nečekejte, až budete připravení. Začněte, než se budete cítit připravení.',
    content: `Většina příležitostí přijde, když vylezete ze své komfortní zóny. Pokud pořád čekáte na "perfektní čas" nebo dokud se nebudete cítit 100% připravení, možná propásnete skvělé šance. Růst se děje, když jednáte, i když si na začátku nejste jistí.

Je stejně důležité naučit se, jak propagovat své dovednosti (ne jen je zlepšovat). Mnoho šikovných lidí zůstává zaseklých, protože nevědí, jak ukázat svou hodnotu.`,
    source: 'Reddit CareerAdvice',
    tags: ['akce', 'komfortní zóna', 'příležitosti', 'seberealizace']
  },

  // === JOB SEARCH ===
  {
    id: 'interview-is-two-way',
    category: 'Job Search',
    title: 'Při pohovoru zkoušejte FIRMU, nejen oni vás',
    content: `Jděte do pohovorů nebo rozhodování o práci s myšlenkou, že VY DĚLÁTE POHOVOR JIM, abyste zjistili, jestli je ta práce a firma pro VÁS to pravé.

Tato myšlenka vám dá mnohem víc sebevědomí a lepší rozhodování. Nejde jen o to získat práci, ale o to najít správné místo pro vaši kariéru.`,
    source: 'Reddit CareerAdvice',
    tags: ['pohovor', 'výběr firmy', 'sebevědomí', 'rozhodování']
  },
  {
    id: 'dont-meet-all-requirements',
    category: 'Job Search',
    title: 'Nemusíte splňovat všechny požadavky v inzerátu',
    content: `Jen proto, že nesplňujete všechny požadavky v popisu práce, to neznamená, že byste se neměli hlásit.

Pokud splňujete 50-70% požadavků, máte velkou šanci. Firmy často uvádějí "ideálního" kandidáta, ale přijmou někoho, kdo je nadšený a ochotný se učit.

Buďte odvážní a zkuste to - horší, co se může stát, je, že dostanete odpověď "ne".`,
    source: 'Reddit CareerAdvice',
    tags: ['přihláška', 'inzerát', 'odvaha', 'učení']
  },
  {
    id: 'best-time-job-search',
    category: 'Job Search',
    title: 'Nejlepší čas hledat práci je, když už nějakou máte',
    content: `Tato rada vám dává vyjednávací sílu. Když máte práci, nejste v zoufalé situaci a můžete si vybírat. Můžete být vybíraví ohledně příležitostí, které přijmete.

Když hledáte novou práci z pozice zaměstnance, jste atraktivnější kandidát - firmy vidí, že o vás má zájem někdo jiný.`,
    source: 'Reddit CareerAdvice',
    tags: ['vyhledávání práce', 'vyjednávání', 'pozice', 'sebehodnota']
  },

  // === INTERVIEW ===
  {
    id: 'red-flags-interview',
    category: 'Interview',
    title: 'Nikdy neignorujte červené vlajky během pohovoru',
    content: `Ptejte se na milion otázek. Zajímejte se o firemní kulturu, jak dlouho tam lidi pracují, proč odešli ti předchozí, jak řeší konflikty.

Pokud cítíte, že něco není v pořádku, věřte svým instinktům. Špatná firemní kultura se skrývá těžko a může vám zničit kariéru i osobní život.`,
    source: 'ITnetwork.cz',
    tags: ['pohovor', 'červené vlajky', 'firemní kultura', 'instinkty']
  },

  // === NEGOTIATION ===
  {
    id: 'value-not-time',
    category: 'Negotiation',
    title: 'Nejste placení za svůj čas, jste placení za hodnotu, kterou přinášíte',
    content: `Na začátku kariéry jsem se soustředil na tvrdou práci s tím, že to automaticky povede ke zvýšení platu a povýšení. Realita: nevede.

Lidi, co jdou nahoru, jsou ti, co dokazují svůj dopad, vyjednávají a dávají o sobě vědět.

Místo toho, abyste jen "tvrdo pracovali", sledujte svoje úspěchy, berte si projekty, na kterých záleží vedení, a ujistěte se, že lidi vědí, jaké výsledky přinášíte.`,
    source: 'Reddit CareerAdvice',
    tags: ['vyjednávání', 'hodnota', 'platy', 'povýšení', 'dopad']
  },
  {
    id: 'salary-negotiation-strategy',
    category: 'Negotiation',
    title: 'Jak získat lepší plat',
    content: `Jediný způsob, jak dostat pořádné zvýšení platu nebo povýšení od své firmy, je najít si jinou práci, která platí líp a/nebo nabízí lepší pozici.

Pak řekněte svému současnému zaměstnavateli, že dáváte výpověď - pokud pro ně máte tu hodnotu, že si to zvýšení/povýšení zasloužíte, tak vám ho dají.

Ale musíte být ochotný tu novou práci vzít, pokud vám firma nenabídne protinabídku. Tak jako tak, win/win.`,
    source: 'Reddit CareerAdvice',
    tags: ['plat', 'vyjednávání', 'výpověď', 'protinabídka']
  },
  {
    id: 'take-less-but-give-more',
    category: 'Negotiation',
    title: 'Slibujte málo, dávejte víc',
    content: `Tato jednoduchá strategie vám vybuduje reputaci spolehlivého člověka, na kterého se dá spolehnout.

Když slíbíte víc než ostatní a dodáte, budete vynikat. Když slíbíte málo a dodáte víc, budete ziscávat důvěru a respekt.

Lidé si pamatují, když jste je překvapili pozitivně - ne když jste splnili očekávání.`,
    source: 'Reddit CareerAdvice',
    tags: ['vyjednávání', 'očekávání', 'reputace', 'důvěra']
  },

  // === CAREER GROWTH ===
  {
    id: 'cant-replace-wont-promote',
    category: 'Career Growth',
    title: 'Když vás nemůžou nahradit, nemůžete dostat povýšení',
    content: `Toto je tvrdá, ale pravdivá realita mnoha firem. Pokud jste nezastupitelní ve své současné roli, motivace firmy vás povýšit je nízká - ztratí vaši hodnotu na současné pozici.

Řešení: Buďte tak dobří, že vás chtějí povýšit, nebo se posuňte jinam, kde vaše hodnota bude oceněna.

Někdy je potřeba odejít, aby vás ocenili.`,
    source: 'Reddit CareerAdvice',
    tags: ['povýšení', 'nezastupitelnost', 'kariérní postup', 'strategie']
  },
  {
    id: 'grow-comfortable-90',
    category: 'Career Growth',
    title: 'Hledejte novou roli, když se cítíte komfortní s 90% práce',
    content: `Když sháníte novou práci, berte jen pozice, kde děláte 25% popisu práce nebo míň. To vás nutí učit se novým věcím a nezasekne vás to na jednom místě.

Také byste měli hledat novou roli, jakmile se cítíte komfortní s 90% práce. Tím se nestanete samolibým a nezůstanete v roli moc dlouho.

Když to takhle děláte, pořád se něco učíte a nezasekáváte se.`,
    source: 'Reddit CareerAdvice',
    tags: ['kariérní růst', 'komfortní zóna', 'neustálé učení', 'vývoj']
  },
  {
    id: 'take-control-of-career',
    category: 'Career Growth',
    title: 'Když nepřevezmete kontrolu nad svou kariérou, udělá to někdo jiný',
    content: `Lidi moc často čekají na povýšení, lepší příležitosti nebo na to, až se něco změní - ale ti nejúspěšnější profesionálové změnu vedou, místo aby na ni reagovali.

Pokud se cítíte zaseklí, zhodnoťte svůj růst, stanovte si jasný cíl a udělejte první krok - ať už je to zdokonalování se, navazování kontaktů nebo přechod na novou cestu.

Správný čas na změnu je, když si uvědomíte, že jste přerostli tam, kde jste.`,
    source: 'Reddit CareerAdvice',
    tags: ['kontrola', 'kariérní postup', 'proaktivita', 'změna']
  },
  {
    id: 'every-job-temporary',
    category: 'Career Growth',
    title: 'Každá práce je dočasná',
    content: `V dnešním světě není očekáváno, že zůstanete v jedné firmě nebo na jedné pozici celý život.

Někteří lidé pracujou pro jednu firmu celý život. Někteří lidi pracujou ve stejném oboru celý život. Někteří lidi maj víc než jednu kariéru.

Nic z toho nezaručuje úspěch nebo neúspěch, ale soudit někoho za to je ostuda. Důležité je dělat to, co vám dává smysl.`,
    source: 'Reddit CareerAdvice',
    tags: ['práce', 'kariéra', 'změna', 'flexibilita']
  },

  // === WORK-LIFE BALANCE ===
  {
    id: 'work-not-life-goal',
    category: 'Work-Life Balance',
    title: 'Kdyby byla práce opravdu tak úžasná věc, všichni boháči by byli zaměstnaní',
    content: `Dalo by se říct, že téměř nikdo si na své smrtelné posteli nebude stěžovat na to, že nestrávil dostatek času v práci.

A přesto dopouštíme, aby nás různé okolnosti a vcelku triviální záležitosti zdržovaly od důležitých okamžiků, jako jsou třeba sportovní dny s dětmi ve škole nebo předávání odznáčků dětem za pomoc při sbírání odpadků.

Kéž by mi někdo vštěpoval takové priority, když mi bylo 25.`,
    source: 'Shane Rodgers',
    tags: ['práce', 'život', 'priority', 'rodina', 'smysl']
  },
  {
    id: 'kids-grow-fast',
    category: 'Work-Life Balance',
    title: 'Nestavte kariéru na první místo, když jsou vaše děti malé',
    content: `Pokud máte dovednosti, odhodlání a vášeň, kariéra se o sebe nějak postará. V dlouhodobém měřítku opravdu nezáleží na tom, jestli na pár let trošku zvolníte a na prvním místě budete mít své děti.

Tohle by mělo platit pro muže i ženy. Dětství je prchavé, máte pouze jednu šanci ho se svými dětmi prožít.

Pokud promrháte tento čas tím, že budete do noci v práci, dohánět deadline a psát reporty, nikdy to nebudete moct vrátit zpátky.`,
    source: 'Shane Rodgers',
    tags: ['rodina', 'děti', 'kariéra', 'priority', 'čas']
  },
  {
    id: 'work-for-friends',
    category: 'Work-Life Balance',
    title: 'Pracujte v kanceláři, kde máte kamarády',
    content: `V práci strávíte hodně času. Měli byste pracovat s lidmi, které máte rádi.

V různých průzkumech se objevuje otázka, jestli mají lidé v práci svého "nejlepšího přítele". Nejšťastnější lidé jsou ti, kteří dělají věci, které milují, s lidmi, které mají opravdu rádi.

Pokud zjistíte, že jste nastoupili do práce, kterou nesnášíte, odejděte. Vaše kariéra pár dobře myšlených odboček a chyb snese.`,
    source: 'Shane Rodgers',
    tags: ['práce', 'přátelství', 'společnost', 'spokojenost', 'kolegové']
  },
  {
    id: 'dont-burnout',
    category: 'Work-Life Balance',
    title: 'Pracuj chytře, ne tvrdě. A pokud to začne být těžké, je čas jít dál.',
    content: `Tato rada vám připomíná, že tvrdá práce není vždy správná práce. Musíte být efektivní, ne jen usilovní.

Když vás práce vysává a už vám nedává energii, je čas na změnu. Nemusíte zůstávat v toxickém prostředí jen proto, že "někde musíte být".`,
    source: 'Reddit CareerAdvice',
    tags: ['práce', 'efektivita', 'vyhoření', 'změna']
  },

  // === NETWORKING ===
  {
    id: 'network-is-net-worth',
    category: 'Networking',
    title: 'Vaše síť je vaše jmění',
    content: `Každý, s kým pracujete, je cenný kontakt pro budoucí networking.

Vztahy byly, jsou a budou důležité. Začněte na nich pracovat co nejdříve. Na univerzitě, prostřednictvím spolků, volnočasových aktivit, stáží. Kdekoliv, kde to půjde. Vrátí se vám to.

Lidé, kteří dnes sedí vedle vás, mohou být zítra vaši šéfové, klienti, nebo vám mohou dát práci.`,
    source: 'Reddit CareerAdvice',
    tags: ['networkig', 'kontakty', 'vztahy', 'kariéra']
  },
  {
    id: 'collaborate-beyond-peers',
    category: 'Networking',
    title: 'Nesp合作ujte jen se svými vrstevníky',
    content: `Pozor na syndrom nadějného mládí. Bystří, mladí lidé mají tendenci bavit se s dalšími mladými lidmi a navzájem si užírají svou energii.

Takoví chytří dvacátníci by měli spolupracovat i se staršími lidmi. Vlastně by se měli setkávat s různými mentory a úspěšnými lidmi, kteří jim můžou otevřít dveře a pomoct nastartovat kariéru.

A podobně by ani starší úspěšní lidé neměli vysedávat v ušmudlaných hospodách a vzpomínat na staré dobré časy.`,
    source: 'Shane Rodgers',
    tags: ['networkig', 'mentoři', 'věkové rozdíly', 'spolupráce']
  },

  // === LEADERSHIP ===
  {
    id: 'behave-like-35',
    category: 'Leadership',
    title: 'V práci se vždy chovejte, jako by vám bylo 35',
    content: `Když jste mladí, nemáte se na pracovišti chovat jako novicové. Pokud jste chytří a kompetentní, projevte se a dělejte cokoliv, co dokážete dělat vyspěle.

Podobně, když jste starší, nechovejte se tak. Přistupujte ke své práci s mladistvým elánem.

"Je vám 35 a jsou to báječná léta" - podle Franka Sinatry.`,
    source: 'Personální specialistka',
    tags: ['vedení', 'zralost', 'profesionalita', 'věk']
  },
  {
    id: 'manage-people-not-things',
    category: 'Leadership',
    title: 'Management je o lidech, ne věcech',
    content: `Je jednoduché věřit tomu, že jsou všichni lidé stejní, každý den se chovají stejně a podávají stejné výkony. Takto ale lidé nefungují.

Nesmíme přehlížet schopnosti většiny a vyzdvihovat pouze super schopnosti elity. Jako manažeři neřídíme věci, ale podporujeme lidi a snažíme se z nich dostat to nejlepší.

Když se naučíme pomáhat lidem, když to nejvíce potřebují, stane se z nás silnější komunita.`,
    source: 'Jack Welch',
    tags: ['vedení', 'management', 'lidé', 'tým']
  },
  {
    id: 'lead-by-making-others-better',
    category: 'Leadership',
    title: 'Být lídrem znamená dělat lepší ty kolem sebe',
    content: `Když excelujete ve své práci, to je super, za to jste placení. Když děláte dobře, ale co je důležitější, děláte lepší ty kolem sebe, pak přidáváte hodnotu nad rámec toho, za co jste placení.

Když to děláte, tak se na vás koukají, když se rozhoduje o povýšení.

Být lídrem znamená dělat lepší ty kolem sebe, ne jen být nejlepší.`,
    source: 'Reddit CareerAdvice',
    tags: ['vedení', 'tým', 'hodnota', 'povýšení']
  },

  // === PERSONAL DEVELOPMENT ===
  {
    id: 'listen-to-others',
    category: 'Personal Development',
    title: 'Pozorně naslouchejte ostatním',
    content: `Není tak těžké si myslet, že jako jedinci víme všechno. Nevíme. Jako skupina jsme mnohem mocnější. Musíme se naučit opravdu spolupracovat a opravdu naslouchat názorům ostatních.

A musíme se ptát svých lidí jako první.

Strašně moc manažerů a firem dělá tu chybu, že žádají externí konzultanty o pomoc a potom se snaží implementovat jejich doporučení mezi své zaměstnance.

Skoro v každém případě jsou to právě vaši zaměstnanci, kteří nejlépe vědí, co zlepšit či změnit.`,
    source: 'Shane Rodgers',
    tags: ['naslouchání', 'spolupráce', 'komunikace', 'pokora']
  },
  {
    id: 'dont-work-for-jerks',
    category: 'Personal Development',
    title: 'Nikdy nepracujte pro hulváty',
    content: `Život je příliš krátký na to, abyste tolerovali příšerné šéfy. Pokud zjistíte, že pro někoho takového pracujete, tak pokud zrovna netrpíte hlady, začněte se poohlížet po novém místě. Okamžitě.

Dáte tím svému šéfovi co proto. Tím, že dáte výpověď.

Vaše zdraví a duševní pohoda jsou důležitější než jakákoliv práce.`,
    source: 'Shane Rodgers',
    tags: ['šéf', 'toxické prostředí', 'výpověď', 'sebeúcta']
  },
  {
    id: 'colleagues-have-emotional-limit',
    category: 'Personal Development',
    title: 'Vaši spolupracovníci jsou jen lidi a mají určitou emoční kapacitu',
    content: `Lidé mají určitou emoční kapacitu. Pokud se děje něco náročného v jejich osobním životě, zbývá jim omezená kapacita na řešení problémů v práci.

Téměř ve sto procentech případů, se kterými jsem se setkal, kdy lidé nepodávali takový výkon v práci jako obvykle, to nemělo co dočinění s prací.

Pokud mají dobří pracovníci problémy, manažeři a společnost se o ně musí postarat.`,
    source: 'Shane Rodgers',
    tags: ['empatie', 'spolupracovníci', 'podpora', 'porozumění']
  },
  {
    id: 'failure-is-learning',
    category: 'Personal Development',
    title: 'Uvědomte si, že selháním se učíte',
    content: `Selhání není neúspěch - je to pouze část procesu eliminující neúspěšné možnosti.

Thomas Edison to řekl nejlépe: "Neselhal jsem. Jen jsem přišel na 10 000 způsobů, kterými to nejde."

Pokud se bojíme selhání, máme tendenci zaujímat minimalistický přístup, co se týče naší kariéry a příležitostí kolem nás. Riskujte trošku.

Někdy je velkolepé selhání tím nejlepším důkazem, že žijeme a snažíme se o něco mimořádného.`,
    source: 'Shane Rodgers / Thomas Edison',
    tags: ['selhání', 'učení', 'odvaha', 'riziko']
  },
  {
    id: 'self-care-first',
    category: 'Personal Development',
    title: 'Když se o sebe nepostaráte, nikdo jiný to za vás neudělá',
    content: `Toto je základní pravda o kariéře i životě. Musíte být svým vlastním advokátem.

Pečujte o své zdraví, své vztahy, svůj rozvoj. Pokud to neuděláte vy, nebude to dělat nikdo jiný.

Buďte proaktivní ve svém vlastním úspěchu.`,
    source: 'Reddit CareerAdvice',
    tags: ['sebepéče', 'odpovědnost', 'proaktivita', 'zdraví']
  },
  {
    id: 'do-best-work-you-have',
    category: 'Personal Development',
    title: 'Dělejte tu nejlepší práci v té, kterou máte',
    content: `Když už to musíte dělat, udělejte to co nejlíp. Nikdy nevíte, kam vás kariéra zavede a jak vás tyhle zkušenosti ovlivní.

Dokonce i zdánlivě podřadné úkoly vás učí disciplíně, pozornosti k detailům a spolehlivosti - vlastnostech, které jsou ceněné na všech úrovních kariéry.`,
    source: 'Reddit CareerAdvice',
    tags: ['práce', 'kvalita', 'přístup', 'disciplína']
  },

  // === CULTURAL DIFFERENCES ===
  {
    id: 'celebrate-cultural-differences',
    category: 'Personal Development',
    title: 'Oslavujte kulturní rozdíly pracoviště',
    content: `Rozmanitost přináší na pracoviště bohatost, ze které plynou výhody všem. Zámořská zkušenost je opravdová zkušenost.

Měli bychom přijmout každou příležitost, abychom vměstnali nové myšlení do naší práce.

Různorodé týmy jsou silnější týmy.`,
    source: 'Shane Rodgers',
    tags: ['diverzita', 'kultura', 'pracoviště', 'inkluze']
  },
  {
    id: 'work-abroad-no-delay',
    category: 'Personal Development',
    title: 'Neodkládejte práci v zahraničí',
    content: `Geografie dnes pomalu ztrácí na významu. Všichni jsme obyvateli jednoho světa.

Pokud dostanete šanci pracovat v zahraničí a toužíte po tom, jeďte. Nikdy nebude ten správný čas.

A vždycky litujeme mnohem více věcí, které jsme neudělali, než těch, které jsme udělali.`,
    source: 'Shane Rodgers / Barack Obama',
    tags: ['zahraničí', 'práce', 'zkušenosti', 'odvaha']
  }
];

export const getAdviceByCategory = (category: CareerAdviceCategory): CareerAdvice[] => {
  return CAREER_ADVICE_DATA.filter(advice => advice.category === category);
};

export const getAdviceById = (id: string): CareerAdvice | undefined => {
  return CAREER_ADVICE_DATA.find(advice => advice.id === id);
};

export const searchAdvice = (query: string): CareerAdvice[] => {
  const lowerQuery = query.toLowerCase();
  return CAREER_ADVICE_DATA.filter(advice =>
    advice.title.toLowerCase().includes(lowerQuery) ||
    advice.content.toLowerCase().includes(lowerQuery) ||
    advice.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getRandomAdvice = (count: number = 1): CareerAdvice[] => {
  const shuffled = [...CAREER_ADVICE_DATA].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getAllAdviceCategories = (): CareerAdviceCategory[] => {
  return [...new Set(CAREER_ADVICE_DATA.map(advice => advice.category))];
};
