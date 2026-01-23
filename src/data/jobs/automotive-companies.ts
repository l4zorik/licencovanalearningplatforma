// Automotive Company Profiles for Job Board
// Companies in Czech Republic automotive industry

import { CompanyProfile } from '@/types';

export const AUTOMOTIVE_COMPANIES: CompanyProfile[] = [
  {
    id: 'tpca',
    name: 'TPCA Czech',
    shortName: 'TPCA',
    logo: '🚗',
    website: 'https://www.tpca.cz/',
    size: 'enterprise',
    sizeRange: '3500+',
    industry: 'Automotive',
    sector: 'Manufacturing',
    founded: 2002,
    headquarters: 'Kolín',
    description: 'Společný podnik Toyoty, Peugeotu a Citroënu vyrábějící kompaktní vozy.',
    culture: 'Toyota Production System, continuous improvement, quality-focused, collaborative',
    values: ['Kvalita', 'Bezpečnost', 'Udržitelnost', 'Týmová práce'],
    mission: 'Vyrábět kvalitní automobily s minimálním dopadem na životní prostředí',
    techStack: ['Robotics', 'PLC', 'SCADA', 'Industrial IoT', 'MES', 'Python', 'SQL'],
    techStackLevel: 'cutting_edge',
    developmentMethodology: ['Lean Manufacturing', 'TPS', 'Kaizen', 'Agile'],
    remotePolicy: 'onsite',
    remoteDetails: 'Primárně prezenčně, možnost hybridu pro IT pozice',
    ratings: {
      overall: 4.3,
      workLifeBalance: 4.0,
      compensation: 4.5,
      management: 4.2,
      culture: 4.4,
      careerGrowth: 4.0,
      reviewsCount: 890
    },
    benefits: {
      financial: ['Roční bonus', 'Penzijní připojištění', 'Sleva na vozy'],
      health: ['Komplexní zdravotní pojištění', 'Lázně', 'Sportovní areály'],
      lifestyle: ['Flexibilní pracovní doba', 'Kantýna', 'Doprava zdarma'],
      professional: ['Interní vzdělávání', 'Jazykové kurzy', 'Mezinárodní rotace'],
      unique: ['Sleva na automobily Toyota/Peugeot/Citroën', 'Firemní školka']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technický pohovor', duration: 60, description: 'Odborný pohovor', status: 'pending' },
        { id: 'h3', type: 'behavioral', name: 'Assessment', duration: 180, description: 'Praktické úkoly', status: 'pending' },
        { id: 'h4', type: 'final', name: 'Finální pohovor', duration: 45, description: 'S ředitelem', status: 'pending' }
      ],
      averageDuration: '3-4 týdny',
      difficulty: 4,
      successRate: 12
    },
    careerPaths: ['Production', 'Quality', 'Maintenance', 'Engineering', 'Logistics', 'IT'],
    growthOpportunities: 'Globální koncern, mezinárodní kariéra a rotace.',
    diversityInclusion: 'Programy diverzity, podpora žen v automotive.',
    sustainabilityRating: 4.5,
    recentNews: 'Investice do elektromobility, nová lakovna, digitalizace výroby'
  },
  {
    id: 'hyundai-mlada-boleslav',
    name: 'Hyundai Motor Manufacturing Czech',
    shortName: 'Hyundai',
    logo: '🚙',
    website: 'https://www.hyundai.cz/',
    size: 'enterprise',
    sizeRange: '3000+',
    industry: 'Automotive',
    sector: 'Manufacturing',
    founded: 2006,
    headquarters: 'Nošovice',
    description: 'Výrobní závod Hyundai Motor Company v ČR pro evropský trh.',
    culture: 'Global thinking, quality-first, innovative, customer-focused',
    values: ['Kvalita', 'Zákazník', 'Respekt', 'Spolupráce'],
    mission: 'Poskytovat zákazníkům hodnotu prostřednictvím kvalitních produktů',
    techStack: ['Robotics', 'Automation', 'MES', 'PLC', 'Python', 'Data Analytics'],
    techStackLevel: 'modern',
    developmentMethodology: ['Agile', 'Lean', 'Six Sigma'],
    remotePolicy: 'hybrid',
    remoteDetails: 'Flexibilní model dle role',
    ratings: {
      overall: 4.2,
      workLifeBalance: 3.9,
      compensation: 4.4,
      management: 4.1,
      culture: 4.2,
      careerGrowth: 3.9,
      reviewsCount: 756
    },
    benefits: {
      financial: ['Roční bonus', '13. plat', 'Penzijní připojištění', 'Sleva na vozy'],
      health: ['Zdravotní péče', 'Sportovní aktivity', 'Wellness program'],
      lifestyle: ['Flexibilní pracovní doba', 'Home office', 'Kantýna'],
      professional: ['Vzdělávací programy', 'Jazykové kurzy', 'Mentoring'],
      unique: ['Sleva na automobily Hyundai', 'Firemní akce']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technický pohovor', duration: 60, description: 'Odborný pohovor', status: 'pending' },
        { id: 'h3', type: 'technical', name: 'Praktický test', duration: 120, description: 'Technický test', status: 'pending' },
        { id: 'h4', type: 'final', name: 'Manažerský pohovor', duration: 45, description: 'S vedoucím', status: 'pending' }
      ],
      averageDuration: '2-3 týdny',
      difficulty: 4,
      successRate: 15
    },
    careerPaths: ['Výroba', 'Kvalita', 'Údržba', 'Procesní inženýrství', 'Logistika'],
    growthOpportunities: 'Globální síť Hyundai, mezinárodní příležitosti.',
    diversityInclusion: 'Rovné příležitosti, inkluzivní prostředí.',
    sustainabilityRating: 4.3,
    recentNews: 'Elektrifikace portfolia, nové modely, investice do udržitelné výroby'
  },
  {
    id: 'bosch-cesko',
    name: 'Bosch Czech Republic',
    shortName: 'Bosch',
    logo: '⚙️',
    website: 'https://www.bosch.cz/',
    size: 'enterprise',
    sizeRange: '8000+',
    industry: 'Automotive Technology',
    sector: 'Manufacturing & Technology',
    founded: 1992,
    headquarters: 'Praha, Brno, Jihlava',
    description: 'Součást globálního koncernu Robert Bosch.',
    culture: 'Invented for life, innovative, sustainable, quality-driven',
    values: ['Kvalita', 'Bezpečnost', 'Udržitelnost', 'Inovace'],
    mission: 'Technika pro život - inovativní řešení pro kvalitnější život',
    techStack: ['Embedded Systems', 'C/C++', 'Python', 'MATLAB', 'Automotive Ethernet', 'ROS', 'IoT', 'AI/ML'],
    techStackLevel: 'cutting_edge',
    developmentMethodology: ['Agile', 'SAFe', 'V-Model', 'Scrum'],
    remotePolicy: 'hybrid',
    remoteDetails: 'Hybridní model s flexibilitou',
    ratings: {
      overall: 4.4,
      workLifeBalance: 4.2,
      compensation: 4.6,
      management: 4.3,
      culture: 4.5,
      careerGrowth: 4.2,
      reviewsCount: 1567
    },
    benefits: {
      financial: ['Konkurenceschopný plat', 'Roční bonus', 'Penzijní připojištění', 'Akciový program'],
      health: ['Komplexní zdravotní pojištění', 'Preventivní péče', 'Sportovní benefity'],
      lifestyle: ['Flexibilní pracovní doba', 'Home office', 'Moderní kanceláře'],
      professional: ['Vzdělávací rozpočet', 'Konference', 'Interní vzdělávání'],
      unique: ['Technologické inovace', 'Firemní sportovní akce']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technical interview', duration: 90, description: 'Technický pohovor', status: 'pending' },
        { id: 'h3', type: 'technical', name: 'Technical round 2', duration: 60, description: 'Deep-dive', status: 'pending' },
        { id: 'h4', type: 'final', name: 'HR & Management', duration: 60, description: 'Pohovor s management', status: 'pending' }
      ],
      averageDuration: '4-6 týdnů',
      difficulty: 5,
      successRate: 10
    },
    careerPaths: ['Embedded Software', 'Hardware Engineering', 'Systems Engineering', 'Test Engineering', 'Project Management'],
    growthOpportunities: 'Globální koncern, výzkum a vývoj, mezinárodní projekty.',
    diversityInclusion: 'Silné diverzitní programy, podpora žen v tech.',
    sustainabilityRating: 4.7,
    recentNews: 'Investice do AI a IoT, nové vývojové centrum, elektromobilita'
  },
  {
    id: 'continental-cesko',
    name: 'Continental Automotive Czech Republic',
    shortName: 'Continental',
    logo: '🔌',
    website: 'https://www.continental-czechrepublic.cz/',
    size: 'enterprise',
    sizeRange: '5000+',
    industry: 'Automotive',
    sector: 'Manufacturing & R&D',
    founded: 1995,
    headquarters: 'Praha, Ostrava, Trutnov',
    description: 'Globální lídr v automotive technology. Vývoj a výroba elektronických komponentů.',
    culture: 'Future in motion, innovative, sustainable, performance-driven',
    values: ['Kvalita', 'Inovace', 'Udržitelnost', 'Zákazník'],
    mission: 'Propojit lidi a technologie - inteligentní řešení pro udržitelnou mobilitu',
    techStack: ['C/C++', 'Python', 'AUTOSAR', 'Classic & Adaptive', 'Ethernet', 'Embedded Linux', 'Functional Safety', 'ISO 26262'],
    techStackLevel: 'cutting_edge',
    developmentMethodology: ['Agile', 'SAFe', 'V-Model', 'ASPICE'],
    remotePolicy: 'hybrid',
    remoteDetails: 'Hybridní model s flexible working',
    ratings: {
      overall: 4.3,
      workLifeBalance: 4.1,
      compensation: 4.5,
      management: 4.2,
      culture: 4.3,
      careerGrowth: 4.1,
      reviewsCount: 1234
    },
    benefits: {
      financial: ['Konkurenceschopný plat', 'Roční bonus', 'Penzijní připojištění', 'Life insurance'],
      health: ['Komplexní zdravotní pojištění', 'Preventivní programy', 'Psychologická podpora'],
      lifestyle: ['Flexibilní pracovní doba', 'Home office', 'Moderní pracoviště'],
      professional: ['Vzdělávací programy', 'Konference', 'Interní mobility', 'Certifikace'],
      unique: ['Projekty pro prémiové značky', 'Inovativní technologie']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technical interview', duration: 90, description: 'Technický pohovor', status: 'pending' },
        { id: 'h3', type: 'technical', name: 'Technical assessment', duration: 120, description: 'Praktický test', status: 'pending' },
        { id: 'h4', type: 'final', name: 'Final interview', duration: 45, description: 'S manažerem', status: 'pending' }
      ],
      averageDuration: '4-5 týdnů',
      difficulty: 5,
      successRate: 11
    },
    careerPaths: ['Embedded Software', 'Hardware Engineering', 'Systems Engineering', 'Functional Safety', 'Test Engineering'],
    growthOpportunities: 'Globální automotive lídr, high-tech projekty, mezinárodní kariéra.',
    diversityInclusion: 'Diverzitní iniciativy, rovné příležitosti.',
    sustainabilityRating: 4.6,
    recentNews: 'Autonomous mobility, connected driving, elektromobilita, nové vývojové centrum'
  },
  {
    id: 'zf-czech',
    name: 'ZF Czech Republic',
    shortName: 'ZF',
    logo: '🔧',
    website: 'https://www.zf.com/czechrepublic',
    size: 'enterprise',
    sizeRange: '4000+',
    industry: 'Automotive',
    sector: 'Manufacturing',
    founded: 1995,
    headquarters: 'Jablonec nad Nisou, Plzeň',
    description: 'Výroba airbagu, bezpečnostních pásů a řídicích jednotek.',
    culture: 'Quality first, safety-driven, innovative, collaborative',
    values: ['Bezpečnost', 'Kvalita', 'Inovace', 'Udržitelnost'],
    mission: 'Mobility solutions pro budoucnost s důrazem na bezpečnost',
    techStack: ['C/C++', 'Python', 'MATLAB', 'Simulink', 'Automotive SPICE', 'Functional Safety'],
    techStackLevel: 'modern',
    developmentMethodology: ['Agile', 'V-Model', 'Automotive SPICE'],
    remotePolicy: 'hybrid',
    remoteDetails: 'Flexibilní přístup dle role',
    ratings: {
      overall: 4.1,
      workLifeBalance: 4.0,
      compensation: 4.3,
      management: 4.0,
      culture: 4.1,
      careerGrowth: 3.9,
      reviewsCount: 567
    },
    benefits: {
      financial: ['Roční bonus', 'Penzijní připojištění', '13. plat', 'Slevy u partnerů'],
      health: ['Zdravotní pojištění', 'Sportovní areály', 'Rekreace'],
      lifestyle: ['Flexibilní pracovní doba', 'Home office', 'Kantýna'],
      professional: ['Vzdělávací programy', 'Jazykové kurzy', 'Certifikace'],
      unique: ['Práce na bezpečnostních systémech', 'Mezinárodní projekty']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technical interview', duration: 60, description: 'Odborný pohovor', status: 'pending' },
        { id: 'h3', type: 'behavioral', name: 'Case study', duration: 90, description: 'Praktický případ', status: 'pending' },
        { id: 'h4', type: 'final', name: 'Final interview', duration: 45, description: 'S manažerem', status: 'pending' }
      ],
      averageDuration: '3-4 týdny',
      difficulty: 4,
      successRate: 13
    },
    careerPaths: ['Development Engineering', 'Test Engineering', 'Quality Engineering', 'Project Engineering'],
    growthOpportunities: 'Globální koncern, bezpečnostní technologie, kariérní růst.',
    diversityInclusion: 'Programy diverzity, rovné příležitosti.',
    sustainabilityRating: 4.4,
    recentNews: 'Elektromobilita, autonomní řízení, nové výrobní linky, digitalizace'
  },
  {
    id: 'valeo-czech',
    name: 'Valeo Czech Republic',
    shortName: 'Valeo',
    logo: '💡',
    website: 'https://www.valeo.com/',
    size: 'enterprise',
    sizeRange: '3500+',
    industry: 'Automotive',
    sector: 'Manufacturing & R&D',
    founded: 1993,
    headquarters: 'Praha, České Budějovice, Rakovník',
    description: 'Globální dodavatel automotive komponentů - osvětlení, klimatizace, senzory.',
    culture: 'Innovation driven, customer-focused, sustainable, collaborative',
    values: ['Inovace', 'Kvalita', 'Zákazník', 'Udržitelnost'],
    mission: 'Mobilita ekologičtější, bezpečnější a dostupnější',
    techStack: ['C/C++', 'Python', 'MATLAB', 'Simulink', 'AUTOSAR', 'Embedded Systems'],
    techStackLevel: 'modern',
    developmentMethodology: ['Agile', 'V-Model', 'Lean'],
    remotePolicy: 'hybrid',
    remoteDetails: 'Hybridní model pro R&D pozice',
    ratings: {
      overall: 4.2,
      workLifeBalance: 4.1,
      compensation: 4.4,
      management: 4.1,
      culture: 4.2,
      careerGrowth: 4.0,
      reviewsCount: 789
    },
    benefits: {
      financial: ['Roční bonus', 'Penzijní připojištění', '13. plat', 'Akciový program'],
      health: ['Zdravotní pojištění', 'Sportovní aktivity', 'Wellness'],
      lifestyle: ['Flexibilní pracovní doba', 'Home office', 'Kantýna'],
      professional: ['Vzdělávací programy', 'Konference', 'Interní vzdělávání'],
      unique: ['Inovativní produkty', 'Práce pro prémiové značky']
    },
    hiringProcess: {
      steps: [
        { id: 'h1', type: 'phone', name: 'HR screening', duration: 30, description: 'Úvodní pohovor', status: 'pending' },
        { id: 'h2', type: 'technical', name: 'Technical interview', duration: 90, description: 'Technický pohovor', status: 'pending' },
        { id: 'h3', type: 'technical', name: 'Technical assessment', duration: 60, description: 'Praktický test', status: 'pending' },
        { id: 'h4', type: 'final', name: 'Final interview', duration: 45, description: 'S management', status: 'pending' }
      ],
      averageDuration: '3-4 týdny',
      difficulty: 4,
      successRate: 12
    },
    careerPaths: ['R&D Engineering', 'Test Engineering', 'Industrial Engineering', 'Quality Engineering'],
    growthOpportunities: 'Globální síť, inovace, kariérní postup v mezinárodním prostředí.',
    diversityInclusion: 'Diverzitní programy, podpora rovných příležitostí.',
    sustainabilityRating: 4.5,
    recentNews: 'Elektrifikace, autonomní řízení, LED osvětlení, inovativní klimatizace'
  }
];

export const getAutomotiveCompanies = (): CompanyProfile[] => {
  return AUTOMOTIVE_COMPANIES;
};

export const getAutomotiveCompanyById = (id: string): CompanyProfile | undefined => {
  return AUTOMOTIVE_COMPANIES.find(company => company.id === id);
};

export default AUTOMOTIVE_COMPANIES;
