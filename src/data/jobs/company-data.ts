import { CompanyProfile, JobMarketData, GeographicIntelligence, SalaryBenchmark, TrendData } from '@/types';

export const COMPANY_PROFILES: CompanyProfile[] = [
  {
    id: 'alza',
    name: 'Alza.cz',
    shortName: 'Alza',
    logo: '🛒',
    website: 'https://www.alza.cz/',
    size: 'enterprise',
    sizeRange: '5000+',
    industry: 'E-commerce',
    sector: 'Retail',
    founded: 1994,
    headquarters: 'Praha',
    description: 'Největší český e-commerce prodejce s širokou nabídkou elektroniky, spotřebního zboží a služeb.',
    culture: 'Modern, fast-paced, innovative, customer-focused, data-driven',
    values: ['Zákazník na prvním místě', 'Inovace', 'Odpovědnost', 'Týmová spolupráce'],
    mission: 'Poskytovat zákazníkům nejlepší nákupní zkušenost',
    techStack: ['React', 'Node.js', 'Java', 'PostgreSQL', 'AWS', 'Kubernetes', 'Kafka'],
    techStackLevel: 'modern',
    developmentMethodology: ['Agile', 'Scrum', 'Kanban'],
    remotePolicy: 'hybrid',
    remoteDetails: '2-3 dny v kanceláře týdně',
    ratings: {
      overall: 4.2,
      workLifeBalance: 4.0,
      compensation: 4.3,
      management: 4.1,
      culture: 4.2,
      careerGrowth: 4.0,
      reviewsCount: 892
    },
    benefits: {
      financial: ['Rozpočet na vzdělávání', 'Roční bonus', 'Akciové opce'],
      health: ['Příspěvek na zdraví', 'Flexibilní benefity', 'Psychologická pomoc'],
      lifestyle: ['Hybridní práce', 'Flexibilní pracovní doba', 'Moderní kanceláře'],
      professional: ['Interní vzdělávání', 'Konferenční rozpočet', 'Mentoring'],
      unique: ['Sleva na produkty', 'Teambuildingy', 'Sportovní aktivity']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní telefonický pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technický pohovor', duration: 60, description: 'Technický pohovor s týmem', status: 'pending' },
        { id: 'h3', type: 'system_design', name: 'System design', duration: 90, description: 'Architekturní diskuze', status: 'pending' },
        { id: 'h4', type: 'culture', name: 'Culture fit', duration: 45, description: 'Pohovor s management', status: 'pending' }
      ],
      averageDuration: '2-3 týdny',
      difficulty: 4,
      successRate: 15
    },
    careerPaths: ['Software Engineering', 'Product Management', 'Data Science', 'DevOps', 'UX/UI'],
    growthOpportunities: 'Silná kultura vzdělávání a interního postupu. Možnost rotace mezi týmy.',
    diversityInclusion: 'Závazek k diverzitě a inkluzi. Podpora žen v tech.',
    sustainabilityRating: 4.2,
    recentNews: 'Expanze na zahraniční trhy, investice do AI a automatizace'
  },
  {
    id: 'skoda-auto',
    name: 'Škoda Auto',
    shortName: 'Škoda',
    logo: '🚗',
    website: 'https://www.skoda-auto.cz/',
    size: 'enterprise',
    sizeRange: '35000+',
    industry: 'Automotive',
    sector: 'Manufacturing',
    founded: 1895,
    headquarters: 'Mladá Boleslav',
    description: 'Jeden z nejstarších výrobců automobilů na světě, součást koncernu Volkswagen.',
    culture: 'Traditional yet innovative, quality-focused, collaborative, international',
    values: ['Kvalita', 'Tradice', 'Inovace', 'Udržitelnost'],
    mission: 'Býtleadera v oblasti dostupných vozů budoucnosti',
    techStack: ['Java', 'C++', 'Python', 'SAP', 'Oracle', 'Cloud', 'IoT', 'Embedded Systems'],
    techStackLevel: 'mixed',
    developmentMethodology: ['Agile', 'SAFe', 'Waterfall for hardware'],
    remotePolicy: 'hybrid',
    remoteDetails: 'Flexibilní model dle role',
    ratings: {
      overall: 4.0,
      workLifeBalance: 3.8,
      compensation: 4.2,
      management: 3.9,
      culture: 4.1,
      careerGrowth: 3.7,
      reviewsCount: 1250
    },
    benefits: {
      financial: ['Roční bonus', 'Penzijní připojištění', 'Sleva na vozy'],
      health: ['Zdravotní péče', 'Lázně', 'Sportovní aktivity'],
      lifestyle: ['Flexibilní pracovní doba', 'Home office', 'Kantýna'],
      professional: ['Vzdělávací programy', 'Interní akademie', 'Jazykové kurzy'],
      unique: ['Sleva na automobily', 'Firemní školka', 'Sportovní areály']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technický pohovor', duration: 60, description: 'Odborný pohovor', status: 'pending' },
        { id: 'h3', type: 'behavioral', name: 'Assessment center', duration: 180, description: 'Skupinové cvičení', status: 'pending' },
        { id: 'h4', type: 'final', name: 'Finální pohovor', duration: 45, description: 'S manažerem', status: 'pending' }
      ],
      averageDuration: '3-4 týdny',
      difficulty: 4,
      successRate: 12
    },
    careerPaths: ['Software Engineering', 'Embedded Systems', 'Data Engineering', 'Product Development', 'Manufacturing IT'],
    growthOpportunities: 'Globální koncern, možnosti rotace a mezinárodní kariéry.',
    diversityInclusion: 'Diverzitní programy, podpora žen v automotive.',
    sustainabilityRating: 3.8,
    recentNews: 'Investice do elektromobility, digitální transformace, nové technologické centrum'
  },
  {
    id: 'avast',
    name: 'Avast Software',
    shortName: 'Avast',
    logo: '🛡️',
    website: 'https://www.avast.com/',
    size: 'enterprise',
    sizeRange: '1800+',
    industry: 'Cybersecurity',
    sector: 'Technology',
    founded: 1988,
    headquarters: 'Praha',
    description: 'Globální leader v oblasti kybernetické bezpečnosti s více než 400 miliony uživatelů.',
    culture: 'Innovative, research-driven, collaborative, open-source friendly, global',
    values: ['Bezpečnost', 'Transparentnost', 'Inovace', 'Odpovědnost'],
    mission: 'Chránit digitální svět a umožnit lidem bezpečně využívat technologie',
    techStack: ['C++', 'Python', 'Java', 'Machine Learning', 'Big Data', 'Cloud', 'Assembly'],
    techStackLevel: 'cutting_edge',
    developmentMethodology: ['Agile', 'Scrum', 'Kanban'],
    remotePolicy: 'hybrid',
    remoteDetails: 'Hybridní model s možností remote-first pro některé role',
    ratings: {
      overall: 4.4,
      workLifeBalance: 4.2,
      compensation: 4.5,
      management: 4.3,
      culture: 4.5,
      careerGrowth: 4.2,
      reviewsCount: 678
    },
    benefits: {
      financial: ['Konkurenceschopný plat', 'Roční bonus', 'Equity program'],
      health: ['Komplexní zdravotní péče', 'Wellness program', 'Duševní zdraví'],
      lifestyle: ['Flexibilní pracovní doba', 'Remote work', 'Moderní kanceláře'],
      professional: ['Výzkumný rozpočet', 'Konference', 'Open source contributions'],
      unique: ['Hackathony', 'Tech talks', 'Vzdělávací sabbaticals']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technical interview', duration: 90, description: 'Technický pohovor s focus na security', status: 'pending' },
        { id: 'h3', type: 'coding_challenge', name: 'Coding challenge', duration: 120, description: 'Praktický úkol', status: 'pending' },
        { id: 'h4', type: 'final', name: 'Team lead interview', duration: 45, description: 'Pohovor s vedoucím', status: 'pending' }
      ],
      averageDuration: '2-3 týdny',
      difficulty: 5,
      successRate: 10
    },
    careerPaths: ['Security Research', 'Software Engineering', 'Data Science', 'ML Engineering', 'DevSecOps'],
    growthOpportunities: 'Globální lídr v security, možnost publikovat výzkum, mezinárodní spolupráce.',
    diversityInclusion: 'Silný fokus na diverzitu, remote-first kultura.',
    sustainabilityRating: 4.5,
    recentNews: ' merger s NortonLifeLock, rozšíření AI security capabilities, nové výzkumné laboratoře'
  },
  {
    id: 'rockaway',
    name: 'Rockaway Group',
    shortName: 'Rockaway',
    logo: '🎸',
    website: 'https://www.rockawaygroup.com/',
    size: 'mid',
    sizeRange: '500-1000',
    industry: 'Technology / E-commerce',
    sector: 'Venture Capital & Operations',
    founded: 2014,
    headquarters: 'Praha',
    description: 'Investiční skupina zaměřená na technologické společnosti v oblasti e-commerce, travel a fintech.',
    culture: 'Startup mindset, data-driven, collaborative, entrepreneurial, international',
    values: ['Inovace', 'Růst', 'Excelence', 'Partnerství'],
    mission: 'Budovat a rozvíjet technologické lídry střední a východní Evropy',
    techStack: ['React', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'GraphQL'],
    techStackLevel: 'modern',
    developmentMethodology: ['Agile', 'Lean'],
    remotePolicy: 'hybrid',
    remoteDetails: 'Flexibilní přístup k remote work',
    ratings: {
      overall: 4.1,
      workLifeBalance: 4.0,
      compensation: 4.3,
      management: 4.0,
      culture: 4.2,
      careerGrowth: 4.1,
      reviewsCount: 245
    },
    benefits: {
      financial: ['Konkurenceschopný plat', 'Bonusy dle výkonu', 'Equity v portfoliu'],
      health: ['Zdravotní pojištění', 'Wellness'],
      lifestyle: ['Flexibilní pracovní doba', 'Home office', 'Teambuildingy'],
      professional: ['Vzdělávací rozpočet', 'Mentoring od leadership', 'Portfolio rotace'],
      unique: ['Přístup k interním společnostem', 'Investiční vzdělávání']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technical interview', duration: 60, description: 'Pohovor s technickým týmem', status: 'pending' },
        { id: 'h3', type: 'culture', name: 'Culture interview', duration: 45, description: 'Pohovor s leadership', status: 'pending' }
      ],
      averageDuration: '2 týdny',
      difficulty: 4,
      successRate: 15
    },
    careerPaths: ['Software Engineering', 'Product Management', 'Data Analytics', 'Business Development', 'Finance'],
    growthOpportunities: 'Přístup k portfolio společnostem, rychlý kariérní postup, mezinárodní příležitosti.',
    diversityInclusion: 'Moderní přístup k diverzitě, inkluzivní prostředí.',
    sustainabilityRating: 4.0,
    recentNews: 'Nové akvizice v travel sektoru, expanze do Německa, investice do AI startupů'
  },
  {
    id: 'ceska-sporitelna',
    name: 'Česká spořitelna',
    shortName: 'ČS',
    logo: '🏦',
    website: 'https://www.csas.cz/',
    size: 'enterprise',
    sizeRange: '10000+',
    industry: 'Finance / Banking',
    sector: 'Banking',
    founded: 1817,
    headquarters: 'Praha',
    description: 'Největší banka v ČR s komplexní nabídkou služeb pro retailové i korporátní klienty.',
    culture: 'Stable, customer-focused, transforming, responsible, traditional yet modern',
    values: ['Důvěra', 'Ododpovědnost', 'Inovace', 'Zákazník'],
    mission: 'Být partnerem pro lepší život našich klientů',
    techStack: ['Java', 'COBOL', 'Oracle', 'SAP', 'Cloud', 'Python', 'R', 'Big Data'],
    techStackLevel: 'mixed',
    developmentMethodology: ['Agile', 'SAFe', 'Traditional for core banking'],
    remotePolicy: 'hybrid',
    remoteDetails: 'Hybridní model po pandemii',
    ratings: {
      overall: 3.9,
      workLifeBalance: 3.8,
      compensation: 4.1,
      management: 3.7,
      culture: 4.0,
      careerGrowth: 3.6,
      reviewsCount: 1100
    },
    benefits: {
      financial: ['Konkurenceschopný plat', 'Roční bonus', 'Penzijní připojištění', 'Slevy na produkty'],
      health: ['Zdravotní péče', 'Příspěvek na sport', 'Lázně'],
      lifestyle: ['Flexibilní pracovní doba', 'Home office', 'Kantýna'],
      professional: ['Vzdělávací programy', 'Interní akademie', 'Certifikace'],
      unique: ['Firemní kulturní akce', 'Podpora charitě']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technical interview', duration: 60, description: 'Odborný pohovor', status: 'pending' },
        { id: 'h3', type: 'behavioral', name: 'Assessment', duration: 120, description: 'Assessment center', status: 'pending' },
        { id: 'h4', type: 'final', name: 'Management interview', duration: 45, description: 'Pohovor s manažerem', status: 'pending' }
      ],
      averageDuration: '3-4 týdny',
      difficulty: 3,
      successRate: 20
    },
    careerPaths: ['Software Engineering', 'Data Science', 'Banking Operations', 'Risk Management', 'IT Security'],
    growthOpportunities: 'Stabilní prostředí, možnosti interního postupu, digitální transformace vytváří nové příležitosti.',
    diversityInclusion: 'Programy diverzity a inkluze, podpora žen v bankovnictví.',
    sustainabilityRating: 3.9,
    recentNews: 'Investice do digitální bankovnictví, rozvoj open banking, ESG transformace'
  },
  {
    id: 'komerční-banka',
    name: 'Komerční banka',
    shortName: 'KB',
    logo: '🏦',
    website: 'https://www.kb.cz/',
    size: 'enterprise',
    sizeRange: '8000+',
    industry: 'Finance / Banking',
    sector: 'Banking',
    founded: 1990,
    headquarters: 'Praha',
    description: 'Jedna z největších bank v ČR, součást skupiny Société Générale.',
    culture: 'Professional, innovative, customer-centric, collaborative, digital-first',
    values: ['Důvěra', 'Profesionalita', 'Inovace', 'Zákazník'],
    mission: 'Být preferovanou bankou pro české domácnosti a firmy',
    techStack: ['Java', 'Python', 'SQL', 'Cloud', 'AI/ML', 'Blockchain', 'Mobile Banking'],
    techStackLevel: 'modern',
    developmentMethodology: ['Agile', 'SAFe', 'DevOps'],
    remotePolicy: 'hybrid',
    remoteDetails: 'Hybridní model po digitální transformaci',
    ratings: {
      overall: 4.1,
      workLifeBalance: 4.0,
      compensation: 4.2,
      management: 4.0,
      culture: 4.1,
      careerGrowth: 3.8,
      reviewsCount: 680
    },
    benefits: {
      financial: ['Roční bonus', 'Penzijní připojištění', 'Akcie skupiny SG'],
      health: ['Komplexní zdravotní péče', 'Sportovní benefity'],
      lifestyle: ['Flexibilní pracovní doba', 'Home office', 'Moderní kanceláře'],
      professional: ['Vzdělávací programy', 'Interní akademie', 'Jazykové kurzy'],
      unique: ['Slevy na bankovní produkty', 'Firemní akce']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technický pohovor', duration: 60, description: 'Odborný pohovor', status: 'pending' },
        { id: 'h3', type: 'behavioral', name: 'Assessment', duration: 120, description: 'Assessment center', status: 'pending' },
        { id: 'h4', type: 'final', name: 'Finální pohovor', duration: 45, description: 'S manažerem', status: 'pending' }
      ],
      averageDuration: '3-4 týdny',
      difficulty: 3,
      successRate: 18
    },
    careerPaths: ['Software Engineering', 'Data Science', 'Banking IT', 'Security', 'Product Development'],
    growthOpportunities: 'Globální skupina SG, možnosti mezinárodní spolupráce.',
    diversityInclusion: 'Programy diverzity a inkluze v rámci SG.',
    sustainabilityRating: 4.0,
    recentNews: 'Rozvoj digitálního bankovnictví, investice do AI, udržitelné finance'
  },
  {
    id: 'mez',
    name: 'Měšec.cz',
    shortName: 'Měšec',
    logo: '💰',
    website: 'https://www.mesec.cz/',
    size: 'mid',
    sizeRange: '200-500',
    industry: 'FinTech',
    sector: 'Financial Technology',
    founded: 2000,
    headquarters: 'Praha',
    description: 'Český FinTech zaměřený na srovnání finančních produktů a služeb.',
    culture: 'Startup-friendly, data-driven, innovative, collaborative, flexible',
    values: ['Inovace', 'Zákazník', 'Transparentnost', 'Data'],
    mission: 'Pomáhat lidem a firmám dělat chytrá finanční rozhodnutí',
    techStack: ['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Machine Learning'],
    techStackLevel: 'modern',
    developmentMethodology: ['Agile', 'Scrum', 'Kanban'],
    remotePolicy: 'hybrid',
    remoteDetails: 'Flexibilní remote policy',
    ratings: {
      overall: 4.3,
      workLifeBalance: 4.2,
      compensation: 4.1,
      management: 4.2,
      culture: 4.4,
      careerGrowth: 4.0,
      reviewsCount: 125
    },
    benefits: {
      financial: ['Konkurenceschopný plat', 'Bonusy', 'Equity pro klíčové role'],
      health: ['Zdravotní pojištění', 'Wellness program'],
      lifestyle: ['Flexibilní pracovní doba', 'Remote work', 'Teambuildingy'],
      professional: ['Vzdělávací rozpočet', 'Konference', 'Hackathony'],
      unique: ['FinTech ecosystem', 'Přístup k finančním datům']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technical interview', duration: 60, description: 'Pohovor s týmem', status: 'pending' },
        { id: 'h3', type: 'coding_challenge', name: 'Coding challenge', duration: 60, description: 'Praktický úkol', status: 'pending' },
        { id: 'h4', type: 'culture', name: 'Culture interview', duration: 45, description: 'Pohovor s leadership', status: 'pending' }
      ],
      averageDuration: '2-3 týdny',
      difficulty: 3,
      successRate: 15
    },
    careerPaths: ['Software Engineering', 'Data Science', 'Product Management', 'UX/UI', 'Marketing'],
    growthOpportunities: 'Rostoucí FinTech trh, možnost růstu s firmou.',
    diversityInclusion: 'Moderní přístup k diverzitě.',
    sustainabilityRating: 3.8,
    recentNews: 'Rozšíření služeb, investice do AI pro doporučení, nové produktové linky'
  },
  {
    id: 'red-hat',
    name: 'Red Hat Czech',
    shortName: 'Red Hat',
    logo: '🐚',
    website: 'https://www.redhat.com/',
    size: 'enterprise',
    sizeRange: '500+ in Czech Republic',
    industry: 'Technology / Open Source',
    sector: 'Enterprise Software',
    founded: 1993,
    headquarters: 'Brno',
    description: 'Globální lídr v open-source řešeních, známý pro Red Hat Enterprise Linux, OpenShift a Ansible.',
    culture: 'Open-source first, collaborative, innovative, remote-friendly, employee-owned',
    values: ['Open Source', 'Svoboda', 'Komunita', 'Inovace', 'Udržitelnost'],
    mission: 'Být katalyzátorem změn v technologickém světě prostřednictvím open source',
    techStack: ['Java', 'Go', 'Python', 'Kubernetes', 'Ansible', 'Linux', 'C/C++', 'Rust'],
    techStackLevel: 'cutting_edge',
    developmentMethodology: ['Agile', 'Open Source Development', 'Remote-first'],
    remotePolicy: 'remote',
    remoteDetails: 'Primárně remote, kanceláře pro spolupráci',
    ratings: {
      overall: 4.5,
      workLifeBalance: 4.6,
      compensation: 4.4,
      management: 4.4,
      culture: 4.7,
      careerGrowth: 4.3,
      reviewsCount: 890
    },
    benefits: {
      financial: ['Konkurenceschopný plat', 'Roční bonus', 'Equity (Employee Stock Purchase)'],
      health: ['Komplexní zdravotní péče', 'Wellness', 'Mental health support'],
      lifestyle: ['Remote-first', 'Flexible hours', 'Sabbatical program'],
      professional: ['Open source contributions', 'Conference budget', 'Learning time'],
      unique: ['Red Hat University', 'Community service day', 'Open source culture']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technical interview', duration: 90, description: 'Deep technical discussion', status: 'pending' },
        { id: 'h3', type: 'coding_challenge', name: 'Coding challenge', duration: 120, description: 'Practical open-source task', status: 'pending' },
        { id: 'h4', type: 'final', name: 'Team fit interview', duration: 45, description: 'Culture and team fit', status: 'pending' }
      ],
      averageDuration: '3-4 týdny',
      difficulty: 4,
      successRate: 12
    },
    careerPaths: ['Software Engineering', 'DevOps', 'Security', 'Product Management', 'Technical Writing'],
    growthOpportunities: 'Globální Fortune 500 společnost, strong open source community, internal mobility.',
    diversityInclusion: 'Strong commitment to diversity, remote-first reduces geographic barriers.',
    sustainabilityRating: 4.8,
    recentNews: 'Red Hat Enterprise Linux 9, OpenShift 4.14, Ansible automation, IBM partnership expansion'
  },
  {
    id: 'tietoevry',
    name: 'Tietoevry Czech',
    shortName: 'Tietoevry',
    logo: '🌐',
    website: 'https://www.tietoevry.com/',
    size: 'enterprise',
    sizeRange: '1000+ in Czech Republic',
    industry: 'Technology Services',
    sector: 'IT Consulting & Services',
    founded: 2008,
    headquarters: 'Praha, Brno, Ostrava',
    description: 'Globální IT společnost poskytující služby v oblasti vývoje software, cloudových řešení a digitální transformace.',
    culture: 'Professional, collaborative, international, customer-focused, sustainable',
    values: ['Inovace', 'Partnerství', 'Udržitelnost', 'Excelence'],
    mission: 'Vytvářet hodnotu prostřednictvím dat a software',
    techStack: ['Java', '.NET', 'Python', 'Cloud', 'AWS', 'Azure', 'Data Analytics', 'AI/ML'],
    techStackLevel: 'modern',
    developmentMethodology: ['Agile', 'SAFe', 'Waterfall for enterprise'],
    remotePolicy: 'hybrid',
    remoteDetails: 'Flexibilní model dle projektu',
    ratings: {
      overall: 4.0,
      workLifeBalance: 3.9,
      compensation: 4.0,
      management: 3.9,
      culture: 4.0,
      careerGrowth: 3.8,
      reviewsCount: 520
    },
    benefits: {
      financial: ['Konkurenceschopný plat', 'Roční bonus', 'Penzijní připojištění'],
      health: ['Zdravotní péče', 'Příspěvek na sport'],
      lifestyle: ['Flexibilní pracovní doba', 'Home office', 'Sick days'],
      professional: ['Vzdělávací programy', 'Certifikace', 'Interní mobility'],
      unique: ['Projekty pro velké klienty', 'Mezinárodní spolupráce']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technical interview', duration: 60, description: 'Odborný pohovor', status: 'pending' },
        { id: 'h3', type: 'behavioral', name: 'Manager interview', duration: 45, description: 'Pohovor s manažerem', status: 'pending' }
      ],
      averageDuration: '2-3 týdny',
      difficulty: 3,
      successRate: 22
    },
    careerPaths: ['Software Engineering', 'Consulting', 'Data Science', 'DevOps', 'Architecture'],
    growthOpportunities: 'Globální síť, projekty pro enterprise klienty, interní mobility.',
    diversityInclusion: 'Programy diverzity v rámci globální organizace.',
    sustainabilityRating: 4.2,
    recentNews: 'Digital transformation projects, AI/ML expansion, sustainable IT solutions'
  },
  {
    id: 'y42',
    name: 'Y42',
    shortName: 'Y42',
    logo: '📊',
    website: 'https://y42.com/',
    size: 'mid',
    sizeRange: '200-500',
    industry: 'Data / Analytics',
    sector: 'Marketing Analytics',
    founded: 2020,
    headquarters: 'Berlin (with Prague hub)',
    description: 'Marketing intelligence platform využívající AI pro prediktivní analýzy a automatizaci marketingu.',
    culture: 'Data-driven, fast-paced, innovative, international, startup-like',
    values: ['Data', 'Inovace', '透明性 (Transparency)', 'Impact'],
    mission: 'Revoluční marketing pomocí AI a dat',
    techStack: ['Python', 'React', 'TypeScript', 'AWS', 'PostgreSQL', 'dbt', 'Airflow', 'ML'],
    techStackLevel: 'cutting_edge',
    developmentMethodology: ['Agile', 'Scrum', 'Continuous Deployment'],
    remotePolicy: 'remote',
    remoteDetails: 'Fully remote company',
    ratings: {
      overall: 4.4,
      workLifeBalance: 4.5,
      compensation: 4.3,
      management: 4.3,
      culture: 4.5,
      careerGrowth: 4.2,
      reviewsCount: 85
    },
    benefits: {
      financial: ['Konkurenceschopný plat', 'Equity package', 'Performance bonuses'],
      health: ['Health insurance', 'Mental health support', 'Gym membership'],
      lifestyle: ['Fully remote', 'Flexible hours', 'Co-working budget'],
      professional: ['Learning budget', 'Conference attendance', 'Internal tech talks'],
      unique: ['Global team', 'Cutting-edge tech', 'Impact in marketing']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Intro call', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technical interview', duration: 60, description: 'Technical discussion', status: 'pending' },
        { id: 'h3', type: 'coding_challenge', name: 'Take-home task', duration: 240, description: 'Practical assignment', status: 'pending' },
        { id: 'h4', type: 'final', name: 'Team interview', duration: 45, description: 'Culture and team fit', status: 'pending' }
      ],
      averageDuration: '2-3 týdny',
      difficulty: 4,
      successRate: 10
    },
    careerPaths: ['Data Engineering', 'Data Science', 'Frontend', 'Backend', 'ML Engineering'],
    growthOpportunities: 'Rapidly growing startup, equity upside, global impact.',
    diversityInclusion: 'International remote-first culture, diverse team.',
    sustainabilityRating: 4.0,
    recentNews: 'Series B funding, new market expansion, AI feature releases'
  },
  {
    id: 'bestdrive',
    name: 'BestDrive & Servisní Síť ČR',
    shortName: 'BestDrive',
    logo: '🔧',
    website: 'https://www.bestdrive.cz/',
    size: 'enterprise',
    sizeRange: '1000+',
    industry: 'Automotive Services',
    sector: 'Car Service & Tires',
    founded: 1993,
    headquarters: 'Otrokovice',
    description: 'Největší síť pneuservisů a autoservisů v České republice, člen skupiny Continental.',
    culture: 'Professional, safety-first, customer-oriented, hands-on, stable',
    values: ['Kvalita', 'Odbornost', 'Bezpečnost', 'Zákazník'],
    mission: 'Staráme se o to, aby vaše cesty byly bezpečné',
    techStack: ['Diagnostics Tools', 'Bosch KTS', 'VAG-COM', 'Hunter Engineering', 'SAP', 'CRM'],
    techStackLevel: 'modern',
    developmentMethodology: ['Lean Service', '5S', 'Standardized Processes'],
    remotePolicy: 'onsite',
    remoteDetails: 'Práce na pobočce nutná',
    ratings: {
      overall: 3.8,
      workLifeBalance: 3.9,
      compensation: 3.7,
      management: 3.8,
      culture: 3.9,
      careerGrowth: 3.5,
      reviewsCount: 320
    },
    benefits: {
      financial: ['Výkonnostní bonusy', 'Sleva na pneu a servis', 'Příspěvek na penzijní'],
      health: ['Týden dovolené navíc', 'Příspěvek na zdraví'],
      lifestyle: ['Multisport karta', 'Firemní akce'],
      professional: ['Školení Continental', 'Certifikace', 'Soutěže mechaniků'],
      unique: ['Testování novinek', 'Zázemí nadnárodní skupiny']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR kontakt', duration: 15, description: 'Rychlé ověření zájmu', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Pohovor na pobočce', duration: 45, description: 'Setkání s vedoucím pobočky', status: 'pending' },
        { id: 'h3', type: 'behavioral', name: 'Zkouška v dílně', duration: 120, description: 'Praktická ukázka dovedností', status: 'pending' }
      ],
      averageDuration: '1-2 týdny',
      difficulty: 2,
      successRate: 40
    },
    careerPaths: ['Automechanik', 'Přijímací technik', 'Vedoucí pobočky', 'Diagnostik', 'Regionální manažer'],
    growthOpportunities: 'Možnost postupu na vedoucí pozice, specializace na diagnostiku.',
    diversityInclusion: 'Podpora technického vzdělávání mládeže.',
    sustainabilityRating: 4.1,
    recentNews: 'Rozšíření sítě o elektromobilitu, nové diagnostické centrum'
  },
  {
    id: 'autopalace',
    name: 'Auto Palace Group',
    shortName: 'Auto Palace',
    logo: '🚘',
    website: 'https://www.autopalace.cz/',
    size: 'mid',
    sizeRange: '500-1000',
    industry: 'Automotive Retail',
    sector: 'Dealership & Service',
    founded: 1991,
    headquarters: 'Praha',
    description: 'Přední prodejce automobilů a poskytovatel servisních služeb pro značky jako Ford, Mazda, Hyundai, Škoda a další.',
    culture: 'Sales-driven, professional, dynamic, brand-focused',
    values: ['Profesionalita', 'Tradice', 'Komplexnost', 'Růst'],
    mission: 'Být první volbou pro mobilitu našich zákazníků',
    techStack: ['Salesforce', 'Dealer Management Systems', 'OEM Diagnostics', 'EV Systems'],
    techStackLevel: 'modern',
    developmentMethodology: ['OEM Standards', 'ISO Certified'],
    remotePolicy: 'onsite',
    remoteDetails: 'Práce v showroomu/servisu',
    ratings: {
      overall: 3.9,
      workLifeBalance: 3.5,
      compensation: 4.0,
      management: 3.8,
      culture: 3.8,
      careerGrowth: 4.0,
      reviewsCount: 180
    },
    benefits: {
      financial: ['Provize z prodeje/výkonu', 'Služební vůz', 'Slevy na vozy'],
      health: ['Stravenkový paušál', 'Zdravotní volno'],
      lifestyle: ['Firemní akce', 'Soutěže'],
      professional: ['Školení u výrobců', 'Jízdy s novými modely', 'Produktová školení'],
      unique: ['Práce s nejnovějšími modely', 'Prestižní značky']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 20, description: 'Základní info', status: 'pending' },
        { id: 'h2', type: 'culture', name: 'Pohovor s manažerem', duration: 60, description: 'Zkušenosti a motivace', status: 'pending' },
        { id: 'h3', type: 'final', name: 'Finální nabídka', duration: 30, description: 'Podmínky spolupráce', status: 'pending' }
      ],
      averageDuration: '2 týdny',
      difficulty: 3,
      successRate: 25
    },
    careerPaths: ['Prodejce vozů', 'Servisní poradce', 'Automechanik', 'Diagnostik', 'Vedoucí servisu'],
    growthOpportunities: 'Kariéra v prodeji i servisu, školení přímo u automobilek.',
    diversityInclusion: 'Rovné příležitosti pro všechny.',
    sustainabilityRating: 3.7,
    recentNews: 'Otevření nového showroomu Cupra, investice do solárních panelů'
  }
];

export const JOB_MARKET_DATA: JobMarketData = {
  totalJobs: 16850,
  newJobsLastWeek: 945,
  avgSalary: 82000,
  salaryTrend: 'up',
  topEmployers: ['Škoda Auto', 'Česká spořitelna', 'BestDrive', 'Alza', 'Komerční banka', 'ČEZ', 'Auto Palace', 'Avast'],
  topSkills: ['Java', 'Autodiagnostika', 'Python', 'Údržba vozidel', 'React', 'AWS', 'Kubernetes', 'SQL'],
  emergingSkills: ['Elektromobilita', 'Machine Learning', 'Generative AI', 'Hybridní pohony', 'Data Engineering', 'Cloud Security'],
  decliningSkills: ['COBOL', 'Legacy SAP', 'Manuální montáž (low-skill)', 'Flash'],
  remotePercentage: 32,
  avgExperienceRequired: 3.0,
  competitionLevel: 'medium',
  marketHealth: 'good',
  seasonalVariations: {
    peak: ['Leden', 'Únor', 'Březen', 'Říjen', 'Listopad (Pneuservis)'],
    low: ['Červenec', 'Srpen']
  },
  regionalVariations: {
    'Praha': { jobCount: 6500, avgSalary: 95000, topRoles: ['Software Engineer', 'Data Scientist', 'Manager'] },
    'Středočeský': { jobCount: 1800, avgSalary: 78000, topRoles: ['Automechanik', 'Manufacturing IT', 'Process Engineer'] },
    'Jihomoravský': { jobCount: 2100, avgSalary: 82000, topRoles: ['Software Developer', 'Embedded Engineer', 'Diagnostik'] },
    'Moravskoslezský': { jobCount: 1100, avgSalary: 69000, topRoles: ['Industrial Engineer', 'Manufacturing', 'Servisní technik'] },
    'Plzeňský': { jobCount: 850, avgSalary: 73000, topRoles: ['Automation Engineer', 'Quality', 'Mechatronik'] },
    'Olomoucký': { jobCount: 480, avgSalary: 65000, topRoles: ['Production', 'Logistics', 'Mechanik'] },
    'Zlínský': { jobCount: 520, avgSalary: 64000, topRoles: ['Manufacturing', 'Engineering', 'Pneuservis'] },
    'Ústecký': { jobCount: 550, avgSalary: 64000, topRoles: ['Chemical', 'Process', 'Údržba'] },
    'Královéhradecký': { jobCount: 450, avgSalary: 66000, topRoles: ['Tourism Tech', 'Manufacturing', 'Auto'] },
    'Pardubický': { jobCount: 400, avgSalary: 63000, topRoles: ['Logistics', 'Production'] },
    'Vysočina': { jobCount: 300, avgSalary: 60000, topRoles: ['Agriculture Tech', 'Manufacturing'] },
    'Jihočeský': { jobCount: 480, avgSalary: 64000, topRoles: ['Tourism', 'Manufacturing'] },
    'Karlovarský': { jobCount: 220, avgSalary: 58000, topRoles: ['Tourism', 'Services'] },
    'Liberecký': { jobCount: 450, avgSalary: 67000, topRoles: ['Automotive', 'Textile', 'Glass'] }
  }
};

export const GEOGRAPHIC_INTELLIGENCE: GeographicIntelligence[] = [
  {
    region: 'Praha',
    jobCount: 6500,
    avgSalary: 95000,
    medianSalary: 85000,
    topEmployers: ['Škoda Auto', 'Česká spořitelna', 'Alza', 'Avast', 'Microsoft', 'Rockaway'],
    topRoles: ['Software Engineer', 'Data Scientist', 'DevOps Engineer', 'Product Manager', 'Security Analyst'],
    costOfLiving: {
      index: 100,
      rentIndex: 100,
      groceryIndex: 95,
      transportIndex: 85,
      comparisonToPraha: 100
    },
    qualityOfLife: {
      score: 82,
      safety: 78,
      healthcare: 85,
      education: 90,
      environment: 70
    },
    commuteOptions: ['Metro', 'Tram', 'Bus', 'Car', 'Bike'],
    remoteWorkCulture: 45,
    talentDemand: 95,
    talentSupply: 75,
    marketSaturation: 78,
    growthPotential: 88
  },
  {
    region: 'Jihomoravský',
    jobCount: 2100,
    avgSalary: 82000,
    medianSalary: 75000,
    topEmployers: ['Red Hat', 'IBM', 'Honeywell', 'ZF', 'Siemens'],
    topRoles: ['Embedded Engineer', 'Software Developer', 'QA Engineer', 'Automation Engineer'],
    costOfLiving: {
      index: 78,
      rentIndex: 65,
      groceryIndex: 85,
      transportIndex: 75,
      comparisonToPraha: 78
    },
    qualityOfLife: {
      score: 84,
      safety: 85,
      healthcare: 80,
      education: 82,
      environment: 88
    },
    commuteOptions: ['Tram', 'Bus', 'Car', 'Bike'],
    remoteWorkCulture: 30,
    talentDemand: 78,
    talentSupply: 70,
    marketSaturation: 72,
    growthPotential: 75
  },
  {
    region: 'Moravskoslezský',
    jobCount: 980,
    avgSalary: 68000,
    medianSalary: 62000,
    topEmployers: ['Tatra', 'Vítkovice', 'OKD', 'Mosaic', 'Tieto'],
    topRoles: ['Industrial Engineer', 'Manufacturing Manager', 'Process Engineer', 'IT Support'],
    costOfLiving: {
      index: 65,
      rentIndex: 45,
      groceryIndex: 80,
      transportIndex: 70,
      comparisonToPraha: 65
    },
    qualityOfLife: {
      score: 72,
      safety: 70,
      healthcare: 72,
      education: 68,
      environment: 75
    },
    commuteOptions: ['Car', 'Bus', 'Train'],
    remoteWorkCulture: 15,
    talentDemand: 55,
    talentSupply: 65,
    marketSaturation: 58,
    growthPotential: 52
  }
];

export const SALARY_BENCHMARKS: SalaryBenchmark[] = [
  {
    role: 'Software Engineer',
    level: 'Junior',
    experience: 1,
    location: 'Praha',
    salaryData: {
      min: 55000,
      q1: 65000,
      median: 75000,
      q3: 85000,
      max: 100000,
      currency: 'CZK',
      sampleSize: 450,
      lastUpdated: new Date('2024-01-15')
    },
    trends: {
      oneYearAgo: 70000,
      threeMonthsAgo: 73000,
      current: 75000,
      trend: 'up',
      sixMonthForecast: 78000
    },
    comparators: {
      praha: 75000,
      brno: 68000,
      ostrava: 55000,
      plzen: 58000,
      czechAverage: 65000,
      euAverage: 4200
    }
  },
  {
    role: 'Software Engineer',
    level: 'Senior',
    experience: 5,
    location: 'Praha',
    salaryData: {
      min: 110000,
      q1: 130000,
      median: 150000,
      q3: 175000,
      max: 220000,
      currency: 'CZK',
      sampleSize: 380,
      lastUpdated: new Date('2024-01-15')
    },
    trends: {
      oneYearAgo: 135000,
      threeMonthsAgo: 145000,
      current: 150000,
      trend: 'up',
      sixMonthForecast: 160000
    },
    comparators: {
      praha: 150000,
      brno: 135000,
      ostrava: 110000,
      plzen: 120000,
      czechAverage: 130000,
      euAverage: 5200
    }
  },
  {
    role: 'Data Scientist',
    level: 'Mid',
    experience: 3,
    location: 'Praha',
    salaryData: {
      min: 75000,
      q1: 90000,
      median: 110000,
      q3: 130000,
      max: 160000,
      currency: 'CZK',
      sampleSize: 180,
      lastUpdated: new Date('2024-01-15')
    },
    trends: {
      oneYearAgo: 95000,
      threeMonthsAgo: 105000,
      current: 110000,
      trend: 'up',
      sixMonthForecast: 120000
    },
    comparators: {
      praha: 110000,
      brno: 100000,
      ostrava: 80000,
      plzen: 85000,
      czechAverage: 95000,
      euAverage: 4500
    }
  },
  {
    role: 'DevOps Engineer',
    level: 'Mid',
    experience: 3,
    location: 'Praha',
    salaryData: {
      min: 80000,
      q1: 95000,
      median: 115000,
      q3: 135000,
      max: 160000,
      currency: 'CZK',
      sampleSize: 220,
      lastUpdated: new Date('2024-01-15')
    },
    trends: {
      oneYearAgo: 100000,
      threeMonthsAgo: 110000,
      current: 115000,
      trend: 'up',
      sixMonthForecast: 125000
    },
    comparators: {
      praha: 115000,
      brno: 105000,
      ostrava: 85000,
      plzen: 90000,
      czechAverage: 100000,
      euAverage: 4300
    }
  }
];

export const SKILL_TRENDS: TrendData[] = [
  { skill: 'Machine Learning', period: '2024-Q1', demand: 96, salary: 130000, jobCount: 680, growthRate: 35 },
  { skill: 'Kubernetes', period: '2024-Q1', demand: 92, salary: 120000, jobCount: 890, growthRate: 25 },
  { skill: 'React', period: '2024-Q1', demand: 98, salary: 100000, jobCount: 2100, growthRate: 15 },
  { skill: 'Python', period: '2024-Q1', demand: 95, salary: 95000, jobCount: 2450, growthRate: 18 },
  { skill: 'AWS', period: '2024-Q1', demand: 94, salary: 120000, jobCount: 1650, growthRate: 20 },
  { skill: 'TypeScript', period: '2024-Q1', demand: 94, salary: 105000, jobCount: 1850, growthRate: 22 },
  { skill: 'Cybersecurity', period: '2024-Q1', demand: 97, salary: 110000, jobCount: 750, growthRate: 32 },
  { skill: 'Data Engineering', period: '2024-Q1', demand: 90, salary: 115000, jobCount: 520, growthRate: 28 }
];

export const getCompanyById = (id: string): CompanyProfile | undefined => {
  return COMPANY_PROFILES.find(company => company.id === id);
};

export const getCompaniesBySize = (size: string): CompanyProfile[] => {
  return COMPANY_PROFILES.filter(company => company.size === size);
};

export const getCompaniesByIndustry = (industry: string): CompanyProfile[] => {
  return COMPANY_PROFILES.filter(company => company.industry.toLowerCase().includes(industry.toLowerCase()));
};

export const getTopCompanies = (limit: number = 5): CompanyProfile[] => {
  return [...COMPANY_PROFILES]
    .sort((a, b) => b.ratings.overall - a.ratings.overall)
    .slice(0, limit);
};

export const searchCompanies = (query: string): CompanyProfile[] => {
  const lowerQuery = query.toLowerCase();
  return COMPANY_PROFILES.filter(company =>
    company.name.toLowerCase().includes(lowerQuery) ||
    company.industry.toLowerCase().includes(lowerQuery) ||
    company.techStack.some(tech => tech.toLowerCase().includes(lowerQuery))
  );
};

export const getSalaryBenchmark = (role: string, level: string, location: string): SalaryBenchmark | undefined => {
  return SALARY_BENCHMARKS.find(benchmark =>
    benchmark.role.toLowerCase() === role.toLowerCase() &&
    benchmark.level.toLowerCase() === level.toLowerCase() &&
    benchmark.location.toLowerCase() === location.toLowerCase()
  );
};

export const getGeographicIntelligence = (region: string): GeographicIntelligence | undefined => {
  return GEOGRAPHIC_INTELLIGENCE.find(geo => geo.region === region);
};
