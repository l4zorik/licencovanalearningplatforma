export type SubModule = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type Resource = {
  name: string;
  url: string;
  type: 'repo' | 'doc' | 'video' | 'design' | 'book';
};

export type SkillCategory = 'Programming' | '3D & GameDev' | 'CNC & Engineering' | 'Automechanic' | 'Automotive' | 'Data Science & AI' | '3D Tisk' | 'Cybersecurity' | 'Music Production' | 'Art & Creativity' | 'Fitness & Health' | 'Reselling & Business' | 'Science & Education' | 'Elektrikářství' | 'Manufacturing & Production' | 'Design & Fashion' | 'Modeling' | 'Sports Betting' | 'Investing' | 'Gardening' | 'Cooking & Preserving' | 'Animal Care' | 'Tree Care' | 'AI Tools' | 'Web Design' | 'Management & Leadership' | 'Healthcare & Medical' | 'Green & Sustainability' | 'Business & Finance' | 'Legal & Compliance' | 'Creative & Media' | 'Science & Research' | 'Education & Training' | 'Construction & Trades' | 'Agriculture & Environment' | 'Hospitality & Tourism' | 'Retail & Sales' | 'Transportation & Logistics' | 'Human Resources' | 'Marketing & PR' | 'Customer Service' | 'Quality Assurance' | 'Project Management' | 'Data & Analytics' | 'Cloud & DevOps' | 'Security & Safety' | 'Writing & Content' | 'Data Engineering' | 'Network Engineering' | 'Web Development' | 'Game Development' | 'Hardware Development' | 'Mobile Development' | 'Embedded Systems' | 'IoT & Robotics' | 'Blockchain & Crypto' | 'AR/VR Development' | 'UI/UX Design' | 'Frontend Development' | 'Backend Development' | 'Fullstack Development' | 'DevOps & Infrastructure' | 'Database Administration' | 'API Development' | 'Microservices Architecture' | 'Cloud Computing' | 'Machine Learning Engineering' | 'Computer Vision' | 'Natural Language Processing' | 'Big Data' | 'Business Intelligence' | 'ETL Development' | 'Data Visualization' | 'Statistical Analysis' | 'Predictive Modeling' | 'A/B Testing' | 'Performance Marketing' | 'SEO/SEM' | 'Social Media Marketing' | 'Content Marketing' | 'Email Marketing' | 'CRM Systems' | 'Sales Automation' | 'Customer Analytics' | 'Agile/Scrum' | 'Kanban' | 'Test Case Design' | 'Bug Tracking' | 'Test Planning' | 'Test Reporting' | 'Container Orchestration' | 'Monitoring & Logging' | 'No Code Platforms' | 'Video Editing' | 'CNC Systems' |  | 'Game Engines' | '3D Modeling' | 'Game Design' | 'Animation' | 'Rendering' | 'CNC Controllers' | 'CAD Software' | 'CAM Software' | 'No Code Platforms' | 'Site Reliability Engineering' | 'System Administration' | 'Server Management' | 'Backup & Recovery' | 'Disaster Recovery' | 'High Availability' | 'Scalability' | 'Load Balancing' | 'Caching Strategies' | 'CDN Management' | 'SSL/TLS Management' | 'Domain Management' | 'DNS Management' | 'Firewall Management' | 'VPN Management' | 'Access Control' | 'Identity Management' | 'Single Sign-On' | 'Multi-Factor Authentication' | 'OAuth' | 'JWT' | 'API Security' | 'Data Encryption' | 'GDPR' | 'HIPAA' | 'PCI DSS' | 'SOX' | 'ISO 27001' | 'Cybersecurity Auditing' | 'Vulnerability Assessment' | 'Forensic Analysis' | 'Malware Analysis' | 'Threat Intelligence' | 'Security Operations Center' | 'SIEM Systems' | 'Intrusion Detection' | 'Application Security' | 'Mobile Security' | 'IoT Security' | 'Blockchain Security' | 'Bug Bounty Programs' | 'Security Research' | 'Red Team Operations' | 'Blue Team Operations' | 'Purple Team Operations' | 'Security Awareness Training' | 'Compliance Training' | 'Risk Assessment' | 'Security Policies' | 'Incident Management' | 'Crisis Management' | 'Business Continuity' | 'Disaster Recovery Planning';

export type SoftSkillCategory = 'Communication' | 'Leadership' | 'Business' | 'Personal Development' | 'Creative' | 'Analytical';

export type ProficiencyLevel = 'Beginner' | 'Elementary' | 'Intermediate' | 'Upper Intermediate' | 'Advanced' | 'Expert';

export type CareerPath = 'frontend' | 'backend' | 'fullstack' | 'datascience' | 'cybersecurity' | 'devops' | 'mobile' | 'ai_ml' | 'design' | 'product' | 'marketing' | 'management';

export type SkillTrend = 'rising' | 'falling' | 'stable' | 'emerging' | 'declining';

export type CompanySize = 'startup' | 'scaleup' | 'mid' | 'enterprise' | 'government' | 'nonprofit';

export type WorkMode = 'remote' | 'hybrid' | 'onsite' | 'flexible';

export type InterviewType = 'phone' | 'video' | 'technical' | 'system_design' | 'behavioral' | 'culture' | 'final' | 'coding_challenge';

export type JobStatus = 'To Apply' | 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export type CertificationStatus = 'Not Started' | 'In Progress' | 'Scheduled' | 'Passed' | 'Failed' | 'Expired';

export type UserCertification = {
  id: string;
  certificationId: string;
  name: string;
  provider: string;
  category: string;
  status: CertificationStatus;
  obtainedAt?: Date;
  expiresAt?: Date;
  score?: number;
  attemptCount: number;
  notes: string;
  resources: string[];
  difficulty: DifficultyRating;
  cost: number;
  validityMonths: number;
  careerImpact: string;
};

export type CertificationCategory = 
  | 'Cloud'
  | 'Security'
  | 'Data & AI'
  | 'Development'
  | 'Microsoft'
  | 'Project Management'
  | 'DevOps'
  | 'Database'
  | 'Networking'
  | 'General IT'
  | 'Compliance';

export type JobCategory = 'Programming' | '3D & GameDev' | 'CNC & Engineering' | 'Automechanic' | 'Automotive' | 'Data Science & AI' | '3D Tisk' | 'Cybersecurity' | 'Music Production' | 'Art & Creativity' | 'Fitness & Health' | 'Reselling & Business' | 'Science & Education' | 'Elektrikářství' | 'Manufacturing & Production' | 'Design & Fashion' | 'Modeling' | 'Sports Betting' | 'Investing' | 'Gardening' | 'Cooking & Preserving' | 'Animal Care' | 'Tree Care' | 'AI Tools' | 'Web Design' | 'Management & Leadership' | 'Healthcare & Medical' | 'Green & Sustainability' | 'Business & Finance' | 'Legal & Compliance' | 'Creative & Media' | 'Science & Research' | 'Education & Training' | 'Construction & Trades' | 'Agriculture & Environment' | 'Hospitality & Tourism' | 'Retail & Sales' | 'Transportation & Logistics' | 'Human Resources' | 'Marketing & PR' | 'Customer Service' | 'Quality Assurance' | 'Project Management' | 'Data & Analytics' | 'Cloud & DevOps' | 'Security & Safety' | 'Writing & Content' | 'Data Engineering' | 'Network Engineering';

export type CompetitionLevel = 'low' | 'medium' | 'high' | 'very_high';

export type DifficultyRating = 1 | 2 | 3 | 4 | 5;

export type ApplicationStep = {
  id: string;
  type: InterviewType;
  name: string;
  duration: number;
  description: string;
  tips?: string[];
  resources?: string[];
  status: 'pending' | 'completed' | 'failed';
  scheduledAt?: Date;
  notes?: string;
};

export type SalaryData = {
  range: string;
  min: number;
  max: number;
  median: number;
  currency: string;
  breakdown?: {
    base: number;
    bonus: number;
    equity: number;
    benefits: number;
  };
  negotiationRange: number;
  experienceAdjustment: number;
};

export type MarketIntelligence = {
  demandIndex: number;
  trend: SkillTrend;
  growthRate: number;
  salaryRange: {
    junior: number;
    mid: number;
    senior: number;
    lead: number;
  };
  geographicDemand: Record<CzechRegion, number>;
  topCompanies: string[];
  jobPostingsCount: number;
  competitionLevel: CompetitionLevel;
  difficultyToLearn: DifficultyRating;
  timeToProficiency: string;
  industryAdoption: number;
  automationRisk: number;
  futureOutlook: 'excellent' | 'good' | 'stable' | 'concern' | 'critical';
};

export type Certification = {
  id: string;
  name: string;
  provider: string;
  category?: CertificationCategory;
  difficulty: DifficultyRating;
  cost: number;
  duration: string;
  validity: string;
  validityMonths: number;
  careerValue: number;
  description: string;
  examFormat: string;
  prerequisites: string[];
  renewalRequirements: string;
  careerImpact: string;
};

export type SkillDependency = {
  prerequisite: string;
  type: 'required' | 'recommended' | 'related';
  strength: number;
  description: string;
};

export type SkillWeight = {
  frontend: number;
  backend: number;
  fullstack: number;
  datascience: number;
  cybersecurity: number;
  devops: number;
  mobile: number;
  ai_ml: number;
  design: number;
  product: number;
  marketing: number;
  management: number;
};

export type EnhancedSkillData = {
  id: string;
  name: string;
  slug: string;
  category: SkillCategory;
  subcategory?: string;
  proficiency: ProficiencyLevel;
  description: string;
  longDescription: string;
  icon: string;
  iconColor: string;
  tags: string[];
  relatedSkills: string[];
  prerequisites: SkillDependency[];
  dependencies: SkillDependency[];
  weight: SkillWeight;
  marketData: MarketIntelligence;
  certifications: Certification[];
  assessment: {
    type: 'quiz' | 'project' | 'interview' | 'certification';
    questions: number;
    duration: number;
    passingScore: number;
    topics: string[];
  };
  resources: Resource[];
  projects: {
    title: string;
    difficulty: DifficultyRating;
    description: string;
    outcomes: string[];
  }[];
  careerPaths: CareerPath[];
  alternativeNames: string[];
  synonyms: string[];
  languages: string[];
  tools: string[];
  frameworks: string[];
  platforms: string[];
};

export type SoftSkill = {
  id: string;
  name: string;
  category: SoftSkillCategory;
  description: string;
  importance: number;
  careerImpact: string;
  assessment: {
    type: 'self' | 'peer' | '360' | 'simulation';
    questions: number;
    description: string;
  };
  development: {
    methods: string[];
    resources: string[];
    timeline: string;
  };
  relatedHardSkills: string[];
  examples: string[];
  interviewQuestions: string[];
};

export type CompanyProfile = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  website: string;
  size: CompanySize;
  sizeRange: string;
  industry: string;
  sector: string;
  founded: number;
  headquarters: string;
  description: string;
  culture: string;
  values: string[];
  mission: string;
  techStack: string[];
  techStackLevel: 'cutting_edge' | 'modern' | 'legacy' | 'mixed';
  developmentMethodology: string[];
  remotePolicy: WorkMode;
  remoteDetails?: string;
  ratings: {
    overall: number;
    workLifeBalance: number;
    compensation: number;
    management: number;
    culture: number;
    careerGrowth: number;
    reviewsCount: number;
  };
  benefits: {
    financial: string[];
    health: string[];
    lifestyle: string[];
    professional: string[];
    unique: string[];
  };
  hiringProcess: {
    steps: ApplicationStep[];
    averageDuration: string;
    difficulty: DifficultyRating;
    successRate: number;
  };
  careerPaths: string[];
  growthOpportunities: string;
  diversityInclusion: string;
  sustainabilityRating: number;
  recentNews?: string;
};

export type JobMarketData = {
  totalJobs: number;
  newJobsLastWeek: number;
  avgSalary: number;
  salaryTrend: 'up' | 'down' | 'stable';
  topEmployers: string[];
  topSkills: string[];
  emergingSkills: string[];
  decliningSkills: string[];
  remotePercentage: number;
  avgExperienceRequired: number;
  competitionLevel: CompetitionLevel;
  marketHealth: 'excellent' | 'good' | 'fair' | 'poor';
  seasonalVariations: {
    peak: string[];
    low: string[];
  };
  regionalVariations: Record<CzechRegion, {
    jobCount: number;
    avgSalary: number;
    topRoles: string[];
  }>;
};

export type EnhancedJob = {
  id: number;
  title: string;
  slug: string;
  company: CompanyProfile;
  companyId: string;
  salary: SalaryData;
  location: {
    city: string;
    region: CzechRegion;
    address?: string;
    coordinates?: { lat: number; lng: number };
  };
  workMode: WorkMode;
  remotePercentage?: number;
  jobType: JobType;
  category: JobCategory;
  experience: {
    min: number;
    max: number;
    preferred: number;
    description: string;
  };
  requiredSkills: string[];
  preferredSkills: string[];
  certifications: string[];
  languages: {
    name: string;
    level: string;
    required: boolean;
  }[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  perks: string[];
  challenges: string[];
  growthOpportunities: string[];
  teamSize: number;
  reportingTo: string;
  dimensions: string[];
  marketData: {
    postedAt: Date;
    validUntil: Date;
    daysAgo: number;
    applicationsCount: number;
    competitionLevel: CompetitionLevel;
    interviewRate: number;
    timeToHire: string;
    urgency: 'high' | 'medium' | 'low';
  };
  hiringProcess: ApplicationStep[];
  interviewQuestions: {
    type: InterviewType;
    questions: string[];
  }[];
  salaryNegotiation: {
    typicalIncrease: number;
    bestTime: string;
    tips: string[];
  };
  redFlags: string[];
  greenFlags: string[];
  matchScore: number;
  fitAnalysis: string;
  nextSteps: string;
  link?: string;
  source: string;
  featured: boolean;
  urgent: boolean;
};

export type SkillAssessment = {
  skillId: string;
  skillName: string;
  currentLevel: ProficiencyLevel;
  targetLevel: ProficiencyLevel;
  assessmentDate: Date;
  score: number;
  maxScore: number;
  percentage: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  resources: string[];
  nextAssessment: Date;
};

export type SkillGap = {
  skillId: string;
  skillName: string;
  currentLevel: ProficiencyLevel;
  requiredLevel: ProficiencyLevel;
  gapSize: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedTime: string;
  resources: string[];
  courses: string[];
  milestones: string[];
  careerImpact: string;
};

export type UserSkillProfile = {
  userId: string;
  skills: {
    skillId: string;
    skillName: string;
    proficiency: ProficiencyLevel;
    yearsOfExperience: number;
    lastUsed?: Date;
    projects: number;
    certifications: string[];
    endorsements: number;
    levelConfidence: number;
  }[];
  softSkills: {
    skillId: string;
    proficiency: ProficiencyLevel;
    evidence: string[];
    endorsements: number;
  }[];
  skillGaps: SkillGap[];
  totalSkills: number;
  averageProficiency: number;
  topStrengths: string[];
  developmentAreas: string[];
  profileCompleteness: number;
  lastUpdated: Date;
};

export type JobRecommendation = {
  job: EnhancedJob;
  matchScore: number;
  skillMatch: number;
  cultureMatch: number;
  locationMatch: number;
  salaryMatch: number;
  growthMatch: number;
  reasons: string[];
  missingSkills: string[];
  suggestedActions: string[];
  interviewLikelihood: number;
  careerFit: string;
};

export type JobSearchCriteria = {
  keywords?: string[];
  categories?: JobCategory[];
  regions?: CzechRegion[];
  workModes?: WorkMode[];
  jobTypes?: JobType[];
  salaryMin?: number;
  salaryMax?: number;
  experienceMin?: number;
  experienceMax?: number;
  skills?: string[];
  companies?: string[];
  remoteOnly?: boolean;
  featuredOnly?: boolean;
  urgentOnly?: boolean;
  postedWithin?: number;
  sortBy?: 'date' | 'salary' | 'relevance' | 'match';
  sortOrder?: 'asc' | 'desc';
};

export type GeographicIntelligence = {
  region: CzechRegion;
  jobCount: number;
  avgSalary: number;
  medianSalary: number;
  topEmployers: string[];
  topRoles: string[];
  costOfLiving: {
    index: number;
    rentIndex: number;
    groceryIndex: number;
    transportIndex: number;
    comparisonToPraha: number;
  };
  qualityOfLife: {
    score: number;
    safety: number;
    healthcare: number;
    education: number;
    environment: number;
  };
  commuteOptions: string[];
  remoteWorkCulture: number;
  talentDemand: number;
  talentSupply: number;
  marketSaturation: number;
  growthPotential: number;
};

export type TrendData = {
  skill: string;
  period: string;
  demand: number;
  salary: number;
  jobCount: number;
  growthRate: number;
};

export type Job = {
  id: number;
  title: string;
  company: string;
  salaryRange?: string;
  location: string;
  status: JobStatus;
  requiredSkills: string[];
  notes: string;
  link?: string;
  perks?: string[];
  difficulty?: number;
  category?: JobCategory;
};

export type SkillTemplate = {
  title: string;
  platform: string;
  category: SkillCategory;
  instructor?: string;
  totalHours: number;
  tags: string[];
  description: string;
  modules: SubModule[];
  resources: Resource[];
  difficulty: number;
  careerPaths: string[];
  iconColor: string;
  icon: string;
};

export type Course = {
  id: number;
  title: string;
  platform: string;
  instructor?: string;
  totalHours: number;
  spentHours: number;
  priority: 'High' | 'Medium' | 'Low';
  deadline?: string;
  tags: string[];
  description: string;
  modules: SubModule[];
  resources: Resource[];
  notes: string;
  category?: SkillCategory;
  icon?: string;
  iconColor?: string;
  xpReward?: number;
};

export type MissionStatus = 'Available' | 'Active' | 'Locked' | 'Completed' | 'Failed';

export type MissionCategory = 'Programming' | 'CyberSec' | 'CNC & Engineering' | 'Game Dev' | 'Automechanic' | 'Automotive' | 'Data Science & AI';

export type MissionDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export type MissionObjective = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  validationType: 'manual' | 'code' | 'file' | 'test';
  deliverable?: string;
  hint?: string;
};

export type MissionAsset = {
  id: string;
  name: string;
  type: 'repo' | 'file' | 'design' | 'spec' | 'tool';
  url?: string;
  content?: string;
  description: string;
};

export type Mission = {
  id: string;
  title: string;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  xp: number;
  tags: string[];
  description: string;
  briefing: string;
  objectives: MissionObjective[];
  assets: MissionAsset[];
  deliverables: string[];
  timeLimit?: number;
  prerequisites?: string[];
  status: MissionStatus;
  progress: number;
  startedAt?: Date;
  completedAt?: Date;
  feedback?: string;
  reputation?: number;
};

export type UserStats = {
  level: number;
  xp: number;
  xpToNext: number;
  achievements: Achievement[];
  streak: number;
  totalHours: number;
};

export type AchievementCategory = 
  | 'progress'
  | 'learning'
  | 'career'
  | 'social'
  | 'streak'
  | 'skill'
  | 'mission'
  | 'special';

export type AchievementRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  xpReward: number;
  unlockedAt?: Date;
};

export type MilestoneStatus = 'locked' | 'in_progress' | 'completed' | 'failed';

export type MilestoneCategory = 'career' | 'learning' | 'skill' | 'social' | 'financial' | 'achievements';

export type Milestone = {
  id: string;
  title: string;
  description: string;
  category: MilestoneCategory;
  target: number;
  current: number;
  unit: string;
  status: MilestoneStatus;
  rewardXP: number;
  rewardBadge?: string;
  completedAt?: Date;
};

export type RoadmapPhase = 'foundation' | 'exploration' | 'specialization' | 'mastery' | 'expert';

export type AccommodationType = 'dormitory' | 'apartment' | 'hostel' | 'private' | 'company' | 'none';

export type JobType = 'full-time' | 'part-time' | 'contract' | 'seasonal' | 'temporary';

export type CzechRegion = 'Praha' | 'Středočeský' | 'Jihočeský' | 'Plzeňský' | 'Karlovarský' | 'Ústecký' | 'Liberecký' | 'Královéhradecký' | 'Pardubický' | 'Vysočina' | 'Jihomoravský' | 'Olomoucký' | 'Zlínský' | 'Moravskoslezský';

export type Agency = {
  id: string;
  name: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  city: CzechRegion;
  specialties: string[];
  rating: number;
  reviewsCount: number;
  foreignWorkerFriendly: boolean;
  accommodationProvided: boolean;
  logo?: string;
};

export type AgencyJob = {
  id: number;
  title: string;
  agencyId: string;
  agencyName: string;
  salaryRange?: string;
  location: string;
  region: CzechRegion;
  status: JobStatus;
  requiredSkills: string[];
  notes: string;
  link?: string;
  difficulty?: number;
  category?: JobCategory;
  jobType: JobType;
  accommodation: boolean;
  accommodationType?: AccommodationType;
  accommodationCost?: string;
  transportProvided: boolean;
  foreignWorkerFriendly: boolean;
  languageRequirement?: string;
  startDate?: string;
};

export type ResumeMatchResult = {
  jobId: number;
  overallScore: number;
  skillMatch: number;
  experienceMatch: number;
  keywordMatch: number;
  matchedSkills: string[];
  missingSkills: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  experienceGap: number;
  recommendations: string[];
  atsScore: number;
  tips: string[];
};

export type JobAlert = {
  id: string;
  userId: string;
  criteria: JobSearchCriteria;
  frequency: 'instant' | 'daily' | 'weekly';
  active: boolean;
  lastTriggered?: Date;
  notificationsCount: number;
  createdAt: Date;
};

export type InterviewPrep = {
  jobId: number;
  companyId: string;
  role: string;
  interviewTypes: InterviewType[];
  questions: {
    type: InterviewType;
    question: string;
    idealAnswer: string;
    tips: string[];
    difficulty: DifficultyRating;
    frequency: number;
  }[];
  codingChallenges: {
    platform: string;
    difficulty: DifficultyRating;
    topics: string[];
    resources: string[];
  }[];
  systemDesign: {
    topics: string[];
    questions: string[];
    resources: string[];
  };
  behavioral: {
    frameworks: string[];
    questions: string[];
    examples: string[];
  };
  resources: {
    articles: string[];
    videos: string[];
    courses: string[];
    books: string[];
  };
};

export type SalaryBenchmark = {
  role: string;
  level: string;
  experience: number;
  location: CzechRegion;
  salaryData: {
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
    currency: string;
    sampleSize: number;
    lastUpdated: Date;
  };
  trends: {
    oneYearAgo: number;
    threeMonthsAgo: number;
    current: number;
    trend: 'up' | 'down' | 'stable';
    sixMonthForecast: number;
  };
  comparators: {
    praha: number;
    brno: number;
    ostrava: number;
    plzen: number;
    czechAverage: number;
    euAverage: number;
  };
};

export type NetworkNode = {
  id: string;
  name: string;
  category: string;
  size: number;
  importance: number;
  connections: string[];
};

export type NetworkLink = {
  source: string;
  target: string;
  strength: number;
  type: string;
};

export type SkillNetwork = {
  nodes: NetworkNode[];
  links: NetworkLink[];
  clusters: string[];
  centralSkills: string[];
};

export type RadarData = {
  category: string;
  value: number;
  max: number;
};

export type ProjectStatus = 'active' | 'completed' | 'paused' | 'archived';

export type ProjectPriority = 'high' | 'medium' | 'low';

export type AlgorithmType = 
  | 'learning'
  | 'coding'
  | 'optimization'
  | 'data_analysis'
  | 'research'
  | 'design'
  | 'debugging'
  | 'testing'
  | 'documentation'
  | 'deployment'
  | 'security'
  | 'networking'
  | 'automation'
  | 'monitoring'
  | 'planning'
  | 'marketing';

export type ProjectMilestone = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  completedAt?: Date;
  xpReward: number;
  order: number;
  targetHours?: number;
  timeSpent: number;
  timerActive: boolean;
  timerStartedAt?: Date;
  benefits: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  goals: string[];
  milestones: ProjectMilestone[];
  algorithms: AlgorithmLog[];
  skills: string[];
  technologies: string[];
  startDate: Date;
  targetEndDate?: Date;
  actualEndDate?: Date;
  totalHours: number;
  xpReward: number;
  color: string;
  icon: string;
  progress: number;
  streak: number;
  linkedGoalId?: string;
  deadline?: Date;
  timerSettings?: {
    enabled: boolean;
    showUrgency: boolean;
    urgencyThresholds: number[];
    defaultMilestoneHours: number;
    autoStartTimer: boolean;
  };
};

export type AlgorithmLog = {
  id: string;
  projectId: string;
  timestamp: Date;
  type: AlgorithmType;
  title: string;
  description: string;
  duration: number;
  codeSnippets?: string;
  notes?: string;
  outcome: 'success' | 'partial' | 'failure' | 'learning';
  xpEarned: number;
  tags: string[];
};

export type AlgorithmStats = {
  totalAlgorithms: number;
  byType: Record<AlgorithmType, number>;
  byOutcome: Record<string, number>;
  totalTime: number;
  averageDuration: number;
  successRate: number;
  streak: number;
};

export type ProjectTemplate = {
  id: string;
  title: string;
  description: string;
  category: string;
  defaultGoals: string[];
  suggestedMilestones: string[];
  suggestedAlgorithms: AlgorithmType[];
  skills: string[];
  technologies: string[];
  estimatedHours: number;
  xpReward: number;
  color: string;
  icon: string;
};

export const ALGORITHM_TYPE_ICONS: Record<AlgorithmType, string> = {
  learning: '📖',
  coding: '💻',
  optimization: '⚡',
  data_analysis: '📊',
  research: '🔍',
  design: '🎨',
  debugging: '🐛',
  testing: '✅',
  documentation: '📝',
  deployment: '🚀',
  security: '🔐',
  networking: '🌐',
  automation: '⚙️',
  monitoring: '👁️',
  planning: '📋',
  marketing: '📈',
};
