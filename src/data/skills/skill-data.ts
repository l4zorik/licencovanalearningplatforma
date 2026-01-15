import { EnhancedSkillData, SoftSkill, SkillCategory, ProficiencyLevel, DifficultyRating, CareerPath, SkillTrend, CompetitionLevel } from '@/types';

const CZECH_REGIONS = ['Praha', 'Středočeský', 'Jihočeský', 'Plzeňský', 'Karlovarský', 'Ústecký', 'Liberecký', 'Královéhradecký', 'Pardubický', 'Vysočina', 'Jihomoravský', 'Olomoucký', 'Zlínský', 'Moravskoslezský'] as const;

const generateGeographicDemand = (baseRegion: string): Record<string, number> => {
  const baseIndex = CZECH_REGIONS.indexOf(baseRegion as any);
  return CZECH_REGIONS.reduce((acc, region, index) => {
    const diff = Math.abs(index - baseIndex);
    const demand = Math.max(40, 100 - (diff * 10) + (Math.random() * 10 - 5));
    acc[region] = Math.round(demand);
    return acc;
  }, {} as Record<string, number>);
};

export const SKILL_DATA: EnhancedSkillData[] = [
  {
    id: 'python',
    name: 'Python',
    slug: 'python',
    category: 'Programming' as SkillCategory,
    subcategory: 'General Purpose',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'Versatile programming language for web development, data science, AI, and automation.',
    longDescription: 'Python is one of the most popular programming languages globally, known for its readability and versatility. It powers backend web applications, drives data analysis and machine learning workflows, automates infrastructure, and enables rapid prototyping. Python\'s extensive ecosystem includes frameworks like Django, Flask, FastAPI for web development, Pandas and NumPy for data manipulation, TensorFlow and PyTorch for machine learning, and many automation tools.',
    icon: '🐍',
    iconColor: '#3776AB',
    tags: ['programming', 'backend', 'data', 'ai', 'scripting', 'automation'],
    relatedSkills: ['Data Science', 'Machine Learning', 'Django', 'Flask', 'FastAPI', 'Pandas', 'NumPy', 'TensorFlow'],
    prerequisites: [
      { prerequisite: 'Programming Basics', type: 'required', strength: 0.9, description: 'Understanding of basic programming concepts' },
      { prerequisite: 'Command Line', type: 'recommended', strength: 0.7, description: 'Basic terminal usage' }
    ],
    dependencies: [
      { prerequisite: 'Data Science', type: 'related', strength: 0.8, description: 'Python is the primary language for data science' },
      { prerequisite: 'Machine Learning', type: 'related', strength: 0.9, description: 'ML frameworks are Python-based' }
    ],
    weight: {
      frontend: 0.2, backend: 0.9, fullstack: 0.7, datascience: 1.0, cybersecurity: 0.6, devops: 0.5,
      mobile: 0.3, ai_ml: 1.0, design: 0.1, product: 0.3, marketing: 0.2, management: 0.2
    },
    marketData: {
      demandIndex: 95,
      trend: 'rising' as SkillTrend,
      growthRate: 18,
      salaryRange: { junior: 55000, mid: 85000, senior: 130000, lead: 180000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Škoda Auto', 'Česká spořitelna', 'Komerční banka', 'Alza', 'DNABank'],
      jobPostingsCount: 2450,
      competitionLevel: 'high' as CompetitionLevel,
      difficultyToLearn: 2 as DifficultyRating,
      timeToProficiency: '3-6 months',
      industryAdoption: 92,
      automationRisk: 15,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'pcep', name: 'PCEP - Certified Entry-Level Python Programmer', provider: 'Python Institute', difficulty: 1 as DifficultyRating, cost: 59, duration: '2 hours', validity: 'lifetime', validityMonths: 0, careerValue: 85, description: 'Entry-level certification for Python beginners', examFormat: 'Multiple choice, 30 questions', prerequisites: [], renewalRequirements: 'None', careerImpact: 'Foundation for Python career' },
      { id: 'pcap', name: 'PCAP - Certified Associate in Python Programming', provider: 'Python Institute', difficulty: 3 as DifficultyRating, cost: 99, duration: '2.5 hours', validity: 'lifetime', validityMonths: 0, careerValue: 92, description: 'Intermediate Python certification', examFormat: 'Multiple choice, 40 questions', prerequisites: ['PCEP'], renewalRequirements: 'None', careerImpact: 'Demonstrates professional Python skills' },
      { id: 'pcpp1', name: 'PCPP1 - Certified Professional in Python Programming', provider: 'Python Institute', difficulty: 4 as DifficultyRating, cost: 149, duration: '3 hours', validity: 'lifetime', validityMonths: 0, careerValue: 95, description: 'Advanced Python programming certification', examFormat: 'Multiple choice + practical', prerequisites: ['PCAP'], renewalRequirements: 'None', careerImpact: 'Senior Python developer credential' }
    ],
    assessment: {
      type: 'quiz',
      questions: 50,
      duration: 60,
      passingScore: 70,
      topics: ['Syntax', 'Data Structures', 'Functions', 'OOP', 'Modules', 'Error Handling', 'File I/O', 'Standard Library']
    },
    resources: [
      { name: 'Python Official Documentation', url: 'https://docs.python.org/3/', type: 'doc' },
      { name: 'Real Python', url: 'https://realpython.com/', type: 'doc' },
      { name: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/', type: 'book' }
    ],
    projects: [
      { title: 'Web Scraper', difficulty: 2 as DifficultyRating, description: 'Build a web scraping application', outcomes: ['HTTP requests handling', 'HTML parsing', 'Data storage'] },
      { title: 'REST API', difficulty: 3 as DifficultyRating, description: 'Create a REST API with FastAPI', outcomes: ['API design', 'Database integration', 'Authentication'] },
      { title: 'ML Pipeline', difficulty: 5 as DifficultyRating, description: 'End-to-end machine learning project', outcomes: ['Data preprocessing', 'Model training', 'Deployment'] }
    ],
    careerPaths: ['backend', 'datascience', 'ai_ml', 'devops'] as CareerPath[],
    alternativeNames: ['Py'],
    synonyms: ['Python3', 'CPython'],
    languages: ['English', 'Czech'],
    tools: ['PyCharm', 'VS Code', 'Jupyter', 'Anaconda', 'Poetry'],
    frameworks: ['Django', 'Flask', 'FastAPI', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch', 'pytest'],
    platforms: ['Windows', 'macOS', 'Linux', 'AWS', 'GCP', 'Azure']
  },
  {
    id: 'react',
    name: 'React',
    slug: 'react',
    category: 'Programming' as SkillCategory,
    subcategory: 'Frontend Framework',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'JavaScript library for building user interfaces, maintained by Meta.',
    longDescription: 'React is the most popular frontend JavaScript library for building component-based user interfaces. It enables developers to create reusable UI components and build complex single-page applications. With virtual DOM for efficient updates, JSX for combining HTML with JavaScript, and a rich ecosystem including React Router for routing and Redux/Context for state management, React powers thousands of web applications.',
    icon: '⚛️',
    iconColor: '#61DAFB',
    tags: ['frontend', 'javascript', 'ui', 'component', 'web', 'spa'],
    relatedSkills: ['JavaScript', 'TypeScript', 'Redux', 'Next.js', 'React Router', 'Styled Components', 'GraphQL'],
    prerequisites: [
      { prerequisite: 'JavaScript ES6+', type: 'required', strength: 0.95, description: 'Strong JavaScript knowledge required' },
      { prerequisite: 'HTML/CSS', type: 'required', strength: 0.8, description: 'Understanding of web fundamentals' },
      { prerequisite: 'npm/yarn', type: 'recommended', strength: 0.6, description: 'Package management knowledge' }
    ],
    dependencies: [
      { prerequisite: 'Next.js', type: 'related', strength: 0.85, description: 'React framework for SSR and production' },
      { prerequisite: 'TypeScript', type: 'related', strength: 0.8, description: 'Type-safe React development' }
    ],
    weight: {
      frontend: 1.0, backend: 0.1, fullstack: 0.6, datascience: 0.1, cybersecurity: 0.2, devops: 0.1,
      mobile: 0.7, ai_ml: 0.1, design: 0.5, product: 0.2, marketing: 0.1, management: 0.1
    },
    marketData: {
      demandIndex: 98,
      trend: 'rising' as SkillTrend,
      growthRate: 15,
      salaryRange: { junior: 60000, mid: 95000, senior: 140000, lead: 190000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Alza', 'Rockaway', 'Mews', 'Wultra', 'Apiary'],
      jobPostingsCount: 2100,
      competitionLevel: 'very_high' as CompetitionLevel,
      difficultyToLearn: 3 as DifficultyRating,
      timeToProficiency: '4-8 months',
      industryAdoption: 94,
      automationRisk: 8,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'meta-react', name: 'Meta Front-End Developer Professional Certificate', provider: 'Meta (Coursera)', difficulty: 3 as DifficultyRating, cost: 0, duration: '8 courses', validity: 'lifetime', validityMonths: 0, careerValue: 88, description: 'Comprehensive React certification from Meta', examFormat: 'Projects and quizzes', prerequisites: [], renewalRequirements: 'None', careerImpact: 'Industry-recognized React skills' },
      { id: 'ibm-react', name: 'IBM Full Stack Software Developer Professional Certificate', provider: 'IBM (Coursera)', difficulty: 3 as DifficultyRating, cost: 0, duration: '12 courses', validity: 'lifetime', validityMonths: 0, careerValue: 85, description: 'Full stack with React focus', examFormat: 'Hands-on projects', prerequisites: [], renewalRequirements: 'None', careerImpact: 'Full stack development certification' }
    ],
    assessment: {
      type: 'quiz',
      questions: 45,
      duration: 45,
      passingScore: 75,
      topics: ['JSX', 'Components', 'State Management', 'Hooks', 'Props', 'Lifecycle', 'Events', 'Forms', 'Routing']
    },
    resources: [
      { name: 'React Documentation', url: 'https://react.dev/', type: 'doc' },
      { name: 'React Tutorial', url: 'https://react.dev/learn', type: 'doc' },
      { name: 'Epic React', url: 'https://epicreact.dev/', type: 'video' }
    ],
    projects: [
      { title: 'Todo App', difficulty: 2 as DifficultyRating, description: 'Build a todo application with React', outcomes: ['State management', 'CRUD operations', 'Local storage'] },
      { title: 'E-commerce Store', difficulty: 4 as DifficultyRating, description: 'Full e-commerce frontend', outcomes: ['Shopping cart', 'Checkout flow', 'Product catalog', 'User auth'] },
      { title: 'Dashboard Application', difficulty: 4 as DifficultyRating, description: 'Admin dashboard with charts', outcomes: ['Data visualization', 'Tables', 'Real-time updates'] }
    ],
    careerPaths: ['frontend', 'fullstack', 'mobile'] as CareerPath[],
    alternativeNames: ['React.js', 'ReactJS'],
    synonyms: ['React 18', 'React 19'],
    languages: ['English', 'Czech'],
    tools: ['Create React App', 'Vite', 'Next.js', 'Gatsby'],
    frameworks: ['Next.js', 'Gatsby', 'Remix', 'React Native'],
    platforms: ['Web', 'iOS', 'Android (via React Native)']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    slug: 'typescript',
    category: 'Programming' as SkillCategory,
    subcategory: 'Programming Language',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'Typed superset of JavaScript that compiles to plain JavaScript.',
    longDescription: 'TypeScript adds optional static typing and class-based object-oriented programming to JavaScript. It catches errors at compile time rather than runtime, making large-scale applications more maintainable and easier to refactor. TypeScript has become the standard for professional frontend development.',
    icon: '📘',
    iconColor: '#3178C6',
    tags: ['programming', 'javascript', 'typed', 'frontend', 'backend', 'web'],
    relatedSkills: ['JavaScript', 'React', 'Node.js', 'Angular', 'Vue.js', 'Next.js'],
    prerequisites: [
      { prerequisite: 'JavaScript ES6+', type: 'required', strength: 0.95, description: 'Strong JavaScript fundamentals required' },
      { prerequisite: 'OOP Concepts', type: 'recommended', strength: 0.7, description: 'Understanding of object-oriented programming' }
    ],
    dependencies: [
      { prerequisite: 'React', type: 'related', strength: 0.9, description: 'TypeScript is commonly used with React' },
      { prerequisite: 'Node.js', type: 'related', strength: 0.85, description: 'TypeScript for backend development' }
    ],
    weight: {
      frontend: 0.95, backend: 0.8, fullstack: 0.9, datascience: 0.4, cybersecurity: 0.5, devops: 0.4,
      mobile: 0.6, ai_ml: 0.3, design: 0.1, product: 0.2, marketing: 0.1, management: 0.1
    },
    marketData: {
      demandIndex: 94,
      trend: 'rising' as SkillTrend,
      growthRate: 22,
      salaryRange: { junior: 65000, mid: 100000, senior: 150000, lead: 200000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Microsoft', 'Slack', 'Notion', 'Linear', 'Vercel'],
      jobPostingsCount: 1850,
      competitionLevel: 'high' as CompetitionLevel,
      difficultyToLearn: 3 as DifficultyRating,
      timeToProficiency: '3-6 months',
      industryAdoption: 89,
      automationRisk: 5,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'ts-cert', name: 'TypeScript Certification', provider: 'Microsoft (LinkedIn)', difficulty: 3 as DifficultyRating, cost: 0, duration: '4 hours', validity: 'lifetime', validityMonths: 0, careerValue: 82, description: 'Microsoft TypeScript fundamentals certification', examFormat: 'Multiple choice', prerequisites: [], renewalRequirements: 'None', careerImpact: 'Validates TypeScript skills' }
    ],
    assessment: {
      type: 'quiz',
      questions: 40,
      duration: 40,
      passingScore: 70,
      topics: ['Types', 'Interfaces', 'Generics', 'Classes', 'Modules', 'Decorators', 'Utility Types', 'Strict Mode']
    },
    resources: [
      { name: 'TypeScript Documentation', url: 'https://www.typescriptlang.org/docs/', type: 'doc' },
      { name: 'TypeScript Deep Dive', url: 'https://basarat.gitbook.io/typescript/', type: 'book' },
      { name: 'Total TypeScript', url: 'https://totaltypescript.com/', type: 'video' }
    ],
    projects: [
      { title: 'Type-safe Library', difficulty: 3 as DifficultyRating, description: 'Create a library with full TypeScript', outcomes: ['Type definitions', 'Generics', 'Documentation'] },
      { title: 'Full-stack App', difficulty: 4 as DifficultyRating, description: 'MERN stack with TypeScript', outcomes: ['End-to-end types', 'API contracts', 'Type safety'] }
    ],
    careerPaths: ['frontend', 'backend', 'fullstack'] as CareerPath[],
    alternativeNames: ['TS'],
    synonyms: ['TS 5.x'],
    languages: ['English', 'Czech'],
    tools: ['VS Code', 'WebStorm', 'ts-node', 'tsc'],
    frameworks: ['NestJS', 'Next.js', 'React', 'Angular'],
    platforms: ['Web', 'Node.js', 'Deno']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    slug: 'postgresql',
    category: 'Programming' as SkillCategory,
    subcategory: 'Database',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'Advanced open-source relational database system known for reliability and features.',
    longDescription: 'PostgreSQL is a powerful, open-source object-relational database system that has earned a strong reputation for reliability, feature robustness, and performance. It supports advanced data types, complex queries, foreign keys, triggers, views, stored procedures, and has excellent support for JSON and full-text search.',
    icon: '🐘',
    iconColor: '#336791',
    tags: ['database', 'sql', 'backend', 'data', 'storage', 'relational'],
    relatedSkills: ['SQL', 'Database Design', 'ORM', 'Node.js', 'Python', 'Docker', 'Redis'],
    prerequisites: [
      { prerequisite: 'SQL Fundamentals', type: 'required', strength: 0.9, description: 'Understanding of SQL queries' },
      { prerequisite: 'Database Design', type: 'recommended', strength: 0.8, description: 'Normalization and schema design' }
    ],
    dependencies: [
      { prerequisite: 'Database Design', type: 'related', strength: 0.85, description: 'PostgreSQL supports advanced database design' },
      { prerequisite: 'Docker', type: 'related', strength: 0.7, description: 'Containerized PostgreSQL deployments' }
    ],
    weight: {
      frontend: 0.1, backend: 0.95, fullstack: 0.8, datascience: 0.7, cybersecurity: 0.5, devops: 0.6,
      mobile: 0.4, ai_ml: 0.5, design: 0.1, product: 0.2, marketing: 0.1, management: 0.1
    },
    marketData: {
      demandIndex: 88,
      trend: 'stable' as SkillTrend,
      growthRate: 8,
      salaryRange: { junior: 50000, mid: 80000, senior: 120000, lead: 160000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Škoda Auto', 'ČEZ', 'Česká pojišťovna', 'Red Hat', 'Supabase'],
      jobPostingsCount: 1200,
      competitionLevel: 'medium' as CompetitionLevel,
      difficultyToLearn: 3 as DifficultyRating,
      timeToProficiency: '4-8 months',
      industryAdoption: 78,
      automationRisk: 12,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'pgca', name: 'PostgreSQL Certified Associate', provider: 'PostgreSQL Global Development Group', difficulty: 2 as DifficultyRating, cost: 100, duration: '90 minutes', validity: 'lifetime', validityMonths: 0, careerValue: 88, description: 'Entry-level PostgreSQL certification', examFormat: 'Multiple choice, 50 questions', prerequisites: [], renewalRequirements: 'None', careerImpact: 'Validates PostgreSQL fundamentals' },
      { id: 'pgcpdba', name: 'PostgreSQL Certified Professional - DBA', provider: 'PostgreSQL Global Development Group', difficulty: 4 as DifficultyRating, cost: 200, duration: '3 hours', validity: 'lifetime', validityMonths: 0, careerValue: 95, description: 'Advanced DBA certification', examFormat: 'Multiple choice + practical', prerequisites: ['PGCA'], renewalRequirements: 'None', careerImpact: 'Senior DBA credential' }
    ],
    assessment: {
      type: 'quiz',
      questions: 45,
      duration: 45,
      passingScore: 70,
      topics: ['SQL Queries', 'Joins', 'Indexes', 'Functions', 'Triggers', 'JSON', 'Full-text Search', 'Performance']
    },
    resources: [
      { name: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/', type: 'doc' },
      { name: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', type: 'doc' },
      { name: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/', type: 'book' }
    ],
    projects: [
      { title: 'Database Schema Design', difficulty: 3 as DifficultyRating, description: 'Design database for a web application', outcomes: ['Schema design', 'Indexing strategy', 'Constraints'] },
      { title: 'Performance Optimization', difficulty: 4 as DifficultyRating, description: 'Optimize slow queries', outcomes: ['Query analysis', 'Index optimization', 'EXPLAIN usage'] }
    ],
    careerPaths: ['backend', 'fullstack', 'datascience', 'devops'] as CareerPath[],
    alternativeNames: ['Postgres', 'PG'],
    synonyms: ['PostgreSQL 15', 'PostgreSQL 16'],
    languages: ['SQL', 'PL/pgSQL'],
    tools: ['pgAdmin', 'DBeaver', 'DataGrip', 'psql'],
    frameworks: ['Prisma', 'TypeORM', 'Sequelize', 'Django ORM'],
    platforms: ['Linux', 'macOS', 'Windows', 'Docker', 'Cloud']
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    slug: 'kubernetes',
    category: 'Programming' as SkillCategory,
    subcategory: 'DevOps',
    proficiency: 'Advanced' as ProficiencyLevel,
    description: 'Open-source container orchestration platform for automating deployment and scaling.',
    longDescription: 'Kubernetes (K8s) is the de facto standard for container orchestration, enabling automatic deployment, scaling, and management of containerized applications. It groups containers into logical units for easy discovery and management, provides self-healing capabilities, automatic bin packing, service discovery, load balancing, and storage orchestration.',
    icon: '☸️',
    iconColor: '#326CE5',
    tags: ['devops', 'containers', 'orchestration', 'cloud', 'microservices', 'deployment'],
    relatedSkills: ['Docker', 'CI/CD', 'Cloud', 'Microservices', 'Helm', 'Terraform', 'Prometheus'],
    prerequisites: [
      { prerequisite: 'Docker', type: 'required', strength: 0.95, description: 'Strong Docker knowledge required' },
      { prerequisite: 'Linux', type: 'required', strength: 0.8, description: 'Linux administration skills' },
      { prerequisite: 'Networking Basics', type: 'required', strength: 0.7, description: 'Understanding of networking concepts' }
    ],
    dependencies: [
      { prerequisite: 'Docker', type: 'required', strength: 0.95, description: 'Kubernetes builds on container concepts' },
      { prerequisite: 'Cloud Platforms', type: 'related', strength: 0.8, description: 'Kubernetes on AWS, Azure, GCP' }
    ],
    weight: {
      frontend: 0.0, backend: 0.5, fullstack: 0.4, datascience: 0.2, cybersecurity: 0.4, devops: 1.0,
      mobile: 0.2, ai_ml: 0.3, design: 0.0, product: 0.1, marketing: 0.0, management: 0.1
    },
    marketData: {
      demandIndex: 92,
      trend: 'rising' as SkillTrend,
      growthRate: 25,
      salaryRange: { junior: 70000, mid: 110000, senior: 160000, lead: 220000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Red Hat', 'Cisco', 'VMware', 'JetBrains', 'B朵'],
      jobPostingsCount: 890,
      competitionLevel: 'medium' as CompetitionLevel,
      difficultyToLearn: 4 as DifficultyRating,
      timeToProficiency: '6-12 months',
      industryAdoption: 85,
      automationRisk: 10,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'ckad', name: 'Certified Kubernetes Application Developer', provider: 'CNCF', difficulty: 4 as DifficultyRating, cost: 375, duration: '2 hours', validity: '2 years', validityMonths: 24, careerValue: 96, description: 'For developers deploying apps on K8s', examFormat: 'Performance-based, 15-20 questions', prerequisites: ['Docker basics'], renewalRequirements: 'Retake exam', careerImpact: 'High-demand developer credential' },
      { id: 'cka', name: 'Certified Kubernetes Administrator', provider: 'CNCF', difficulty: 5 as DifficultyRating, cost: 375, duration: '2 hours', validity: '2 years', validityMonths: 24, careerValue: 98, description: 'For Kubernetes administrators', examFormat: 'Performance-based, 15-20 questions', prerequisites: ['K8s experience'], renewalRequirements: 'Retake exam', careerImpact: 'Top DevOps credential' },
      { id: 'cks', name: 'Certified Kubernetes Security Specialist', provider: 'CNCF', difficulty: 5 as DifficultyRating, cost: 375, duration: '2 hours', validity: '2 years', validityMonths: 24, careerValue: 98, description: 'Advanced security certification', examFormat: 'Performance-based', prerequisites: ['CKA'], renewalRequirements: 'Retake exam', careerImpact: 'Elite security credential' }
    ],
    assessment: {
      type: 'project',
      questions: 0,
      duration: 120,
      passingScore: 75,
      topics: ['Pods', 'Services', 'Deployments', 'ConfigMaps', 'Secrets', 'Ingress', 'Helm', 'Security', 'Storage']
    },
    resources: [
      { name: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/', type: 'doc' },
      { name: 'KillerCoda', url: 'https://killercoda.com/killer-shell-cks', type: 'repo' },
      { name: 'CKAD Exercises', url: 'https://github.com/dguyhasnoname/ckad-prep', type: 'repo' }
    ],
    projects: [
      { title: 'Deploy Microservices', difficulty: 4 as DifficultyRating, description: 'Deploy a microservices application', outcomes: ['Multi-pod deployment', 'Service networking', 'Health checks'] },
      { title: 'CI/CD Pipeline', difficulty: 5 as DifficultyRating, description: 'Build complete deployment pipeline', outcomes: ['GitOps', 'ArgoCD', 'Helm charts', 'Security'] }
    ],
    careerPaths: ['devops', 'backend', 'cybersecurity'] as CareerPath[],
    alternativeNames: ['K8s', 'Kube'],
    synonyms: ['OpenShift', 'EKS', 'GKE', 'AKS'],
    languages: ['YAML', 'Go', 'Bash'],
    tools: ['kubectl', 'helm', 'k9s', 'Lens', 'ArgoCD', 'Istio'],
    frameworks: ['Knative', 'Argo Workflows', 'Service Mesh'],
    platforms: ['AWS EKS', 'Azure AKS', 'GCP GKE', 'On-premise']
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    slug: 'machine-learning',
    category: 'Data Science & AI' as SkillCategory,
    subcategory: 'AI/ML',
    proficiency: 'Advanced' as ProficiencyLevel,
    description: 'Field of AI that enables systems to learn and improve from experience.',
    longDescription: 'Machine Learning is a subset of artificial intelligence that focuses on building systems that learn from data, identify patterns, and make decisions with minimal human intervention. It includes supervised learning (classification, regression), unsupervised learning (clustering, dimensionality reduction), and reinforcement learning.',
    icon: '🤖',
    iconColor: '#FF6F00',
    tags: ['ai', 'data', 'python', 'statistics', 'algorithms', 'prediction'],
    relatedSkills: ['Python', 'Statistics', 'Deep Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'NLP'],
    prerequisites: [
      { prerequisite: 'Python', type: 'required', strength: 0.9, description: 'Python programming required' },
      { prerequisite: 'Statistics', type: 'required', strength: 0.85, description: 'Strong statistics background' },
      { prerequisite: 'Linear Algebra', type: 'required', strength: 0.8, description: 'Math fundamentals for ML' },
      { prerequisite: 'Calculus', type: 'required', strength: 0.7, description: 'Understanding of derivatives and gradients' }
    ],
    dependencies: [
      { prerequisite: 'Deep Learning', type: 'related', strength: 0.9, description: 'ML foundations for deep learning' },
      { prerequisite: 'Data Science', type: 'related', strength: 0.85, description: 'ML is core to data science' }
    ],
    weight: {
      frontend: 0.0, backend: 0.2, fullstack: 0.1, datascience: 1.0, cybersecurity: 0.3, devops: 0.1,
      mobile: 0.2, ai_ml: 1.0, design: 0.0, product: 0.3, marketing: 0.2, management: 0.2
    },
    marketData: {
      demandIndex: 96,
      trend: 'rising' as SkillTrend,
      growthRate: 35,
      salaryRange: { junior: 80000, mid: 130000, senior: 200000, lead: 300000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Škoda Auto', 'Avast', 'B朵', 'Czech Technical University partners', 'Startup ecosystem'],
      jobPostingsCount: 680,
      competitionLevel: 'high' as CompetitionLevel,
      difficultyToLearn: 5 as DifficultyRating,
      timeToProficiency: '12-24 months',
      industryAdoption: 65,
      automationRisk: 5,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'ml-stanford', name: 'Machine Learning Specialization', provider: 'Stanford (Coursera)', difficulty: 4 as DifficultyRating, cost: 0, duration: '11 weeks', validity: 'lifetime', validityMonths: 0, careerValue: 96, description: 'Andrew Ng\'s famous ML course', examFormat: 'Quizzes and programming assignments', prerequisites: ['Math basics'], renewalRequirements: 'None', careerImpact: 'Gold standard ML education' },
      { id: 'aws-ml', name: 'AWS Machine Learning Specialty', provider: 'Amazon', difficulty: 5 as DifficultyRating, cost: 300, duration: '3 hours', validity: '2 years', validityMonths: 24, careerValue: 94, description: 'AWS-specific ML certification', examFormat: 'Multiple choice, 65 questions', prerequisites: ['1-2 years ML experience'], renewalRequirements: 'Retake exam', careerImpact: 'Cloud ML expertise' }
    ],
    assessment: {
      type: 'quiz',
      questions: 60,
      duration: 90,
      passingScore: 75,
      topics: ['Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'ML Ops', 'Evaluation Metrics', 'Feature Engineering', 'Regularization', 'Ensemble Methods']
    },
    resources: [
      { name: 'Hands-on ML Book', url: 'https://hastie.su.domains/ISLR2/ISLRv2_website.pdf', type: 'book' },
      { name: 'Scikit-learn Documentation', url: 'https://scikit-learn.org/', type: 'doc' },
      { name: 'Fast.ai', url: 'https://www.fast.ai/', type: 'video' }
    ],
    projects: [
      { title: 'Predictive Model', difficulty: 3 as DifficultyRating, description: 'Build a model to predict outcomes', outcomes: ['Data preprocessing', 'Model selection', 'Evaluation'] },
      { title: 'Image Classifier', difficulty: 4 as DifficultyRating, description: 'CNN-based image classification', outcomes: ['CNN architecture', 'Transfer learning', 'Data augmentation'] },
      { title: 'NLP Pipeline', difficulty: 5 as DifficultyRating, description: 'End-to-end NLP solution', outcomes: ['Text preprocessing', 'Model training', 'Deployment'] }
    ],
    careerPaths: ['datascience', 'ai_ml'] as CareerPath[],
    alternativeNames: ['ML', 'Predictive Analytics'],
    synonyms: ['Statistical Learning', 'Pattern Recognition'],
    languages: ['Python', 'R', 'Julia'],
    tools: ['Jupyter', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'MLflow'],
    frameworks: ['Keras', 'XGBoost', 'LightGBM', 'CatBoost'],
    platforms: ['AWS SageMaker', 'GCP Vertex AI', 'Azure ML']
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    category: 'Cybersecurity' as SkillCategory,
    subcategory: 'Security',
    proficiency: 'Advanced' as ProficiencyLevel,
    description: 'Practice of protecting systems, networks, and programs from digital attacks.',
    longDescription: 'Cybersecurity encompasses the practices, technologies, and processes designed to protect computers, networks, programs, and data from unauthorized access, attacks, and damage. It includes network security, application security, information security, operational security, disaster recovery, and end-user education.',
    icon: '🛡️',
    iconColor: '#00D4FF',
    tags: ['security', 'networking', 'linux', 'pentesting', 'risk', 'compliance'],
    relatedSkills: ['Linux', 'Networking', 'Penetration Testing', 'Incident Response', 'SIEM', 'Cloud Security'],
    prerequisites: [
      { prerequisite: 'Linux', type: 'required', strength: 0.9, description: 'Strong Linux administration' },
      { prerequisite: 'Networking', type: 'required', strength: 0.9, description: 'TCP/IP, routing, firewalls' },
      { prerequisite: 'Programming', type: 'recommended', strength: 0.7, description: 'Scripting for automation' }
    ],
    dependencies: [
      { prerequisite: 'Penetration Testing', type: 'related', strength: 0.85, description: 'Offensive security skills' },
      { prerequisite: 'Cloud Security', type: 'related', strength: 0.8, description: 'Securing cloud infrastructure' }
    ],
    weight: {
      frontend: 0.0, backend: 0.3, fullstack: 0.2, datascience: 0.2, cybersecurity: 1.0, devops: 0.6,
      mobile: 0.3, ai_ml: 0.3, design: 0.0, product: 0.2, marketing: 0.1, management: 0.3
    },
    marketData: {
      demandIndex: 97,
      trend: 'rising' as SkillTrend,
      growthRate: 32,
      salaryRange: { junior: 60000, mid: 100000, senior: 150000, lead: 220000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Avast', 'ESET', 'Český rozhlas', 'Bank sector', 'Government'],
      jobPostingsCount: 750,
      competitionLevel: 'medium' as CompetitionLevel,
      difficultyToLearn: 5 as DifficultyRating,
      timeToProficiency: '12-24 months',
      industryAdoption: 72,
      automationRisk: 8,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'comptia-security', name: 'CompTIA Security+', provider: 'CompTIA', difficulty: 3 as DifficultyRating, cost: 370, duration: '90 minutes', validity: '3 years', validityMonths: 36, careerValue: 92, description: 'Foundational security certification', examFormat: 'Multiple choice, 90 questions', prerequisites: ['Network+ recommended'], renewalRequirements: 'CEUs or retake', careerImpact: 'Entry into cybersecurity' },
      { id: 'cissp', name: 'CISSP - Certified Information Systems Security Professional', provider: '(ISC)²', difficulty: 5 as DifficultyRating, cost: 749, duration: '4 hours', validity: '3 years', validityMonths: 36, careerValue: 99, description: 'Gold standard security management cert', examFormat: '100-150 questions', prerequisites: ['5 years experience'], renewalRequirements: 'CEUs + fee', careerImpact: 'Senior security leader' },
      { id: 'oscp', name: 'OSCP - Offensive Security Certified Professional', provider: 'Offensive Security', difficulty: 5 as DifficultyRating, cost: 1499, duration: '24 hours', validity: 'lifetime', validityMonths: 0, careerValue: 98, description: 'Hands-on penetration testing', examFormat: 'Practical exam', prerequisites: ['Basic Linux knowledge'], renewalRequirements: 'None', careerImpact: 'Elite offensive security' }
    ],
    assessment: {
      type: 'quiz',
      questions: 80,
      duration: 120,
      passingScore: 75,
      topics: ['Network Security', 'Threats & Vulnerabilities', 'Cryptography', 'Identity Management', 'Security Operations', 'Risk Management', 'Compliance', 'Incident Response']
    },
    resources: [
      { name: 'Cybrary', url: 'https://www.cybrary.it/', type: 'video' },
      { name: 'HackTheBox', url: 'https://www.hackthebox.com/', type: 'repo' },
      { name: 'OWASP', url: 'https://owasp.org/', type: 'doc' }
    ],
    projects: [
      { title: 'Security Assessment', difficulty: 4 as DifficultyRating, description: 'Conduct security audit', outcomes: ['Vulnerability scanning', 'Report writing', 'Remediation'] },
      { title: 'SIEM Implementation', difficulty: 5 as DifficultyRating, description: 'Deploy security monitoring', outcomes: ['Log analysis', 'Alert configuration', 'Dashboard creation'] }
    ],
    careerPaths: ['cybersecurity', 'devops'] as CareerPath[],
    alternativeNames: ['InfoSec', 'Information Security'],
    synonyms: ['Cyber Defense', 'Security Engineering'],
    languages: ['Bash', 'Python', 'PowerShell'],
    tools: ['Wireshark', 'Metasploit', 'Burp Suite', 'Nmap', 'Splunk'],
    frameworks: ['NIST', 'ISO 27001', 'CIS Controls'],
    platforms: ['All platforms', 'Cloud security']
  },
  {
    id: 'docker',
    name: 'Docker',
    slug: 'docker',
    category: 'Programming' as SkillCategory,
    subcategory: 'DevOps',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'Platform for developing, shipping, and running applications in containers.',
    longDescription: 'Docker is a platform that enables developers to package applications into containers—standardized executable components combining application source code with the operating system libraries and dependencies required to run that code in any environment. Containers are lightweight, portable, and provide process isolation.',
    icon: '🐳',
    iconColor: '#2496ED',
    tags: ['devops', 'containers', 'virtualization', 'deployment', 'microservices', 'ci-cd'],
    relatedSkills: ['Kubernetes', 'CI/CD', 'Linux', 'DevOps', 'Microservices', 'Terraform'],
    prerequisites: [
      { prerequisite: 'Linux', type: 'required', strength: 0.85, description: 'Linux command line required' },
      { prerequisite: 'Networking Basics', type: 'required', strength: 0.7, description: 'Understanding of networking concepts' },
      { prerequisite: 'Version Control', type: 'recommended', strength: 0.6, description: 'Git basics' }
    ],
    dependencies: [
      { prerequisite: 'Kubernetes', type: 'related', strength: 0.9, description: 'Kubernetes orchestrates Docker containers' },
      { prerequisite: 'CI/CD', type: 'related', strength: 0.85, description: 'Docker in build pipelines' }
    ],
    weight: {
      frontend: 0.1, backend: 0.7, fullstack: 0.6, datascience: 0.3, cybersecurity: 0.5, devops: 1.0,
      mobile: 0.3, ai_ml: 0.4, design: 0.0, product: 0.1, marketing: 0.0, management: 0.1
    },
    marketData: {
      demandIndex: 90,
      trend: 'stable' as SkillTrend,
      growthRate: 10,
      salaryRange: { junior: 60000, mid: 95000, senior: 140000, lead: 180000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Docker Inc', 'Red Hat', 'Microsoft', 'All tech companies'],
      jobPostingsCount: 1500,
      competitionLevel: 'high' as CompetitionLevel,
      difficultyToLearn: 2 as DifficultyRating,
      timeToProficiency: '2-4 months',
      industryAdoption: 88,
      automationRisk: 12,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'docker-certified', name: 'Docker Certified Associate', provider: 'Docker Inc', difficulty: 3 as DifficultyRating, cost: 195, duration: '2 hours', validity: '2 years', validityMonths: 24, careerValue: 90, description: 'Official Docker certification', examFormat: 'Multiple choice, 60 questions', prerequisites: ['Docker experience'], renewalRequirements: 'Retake exam', careerImpact: 'Validates Docker expertise' }
    ],
    assessment: {
      type: 'quiz',
      questions: 40,
      duration: 40,
      passingScore: 70,
      topics: ['Dockerfile', 'Images', 'Containers', 'Volumes', 'Networks', 'Docker Compose', 'Security', 'Logging']
    },
    resources: [
      { name: 'Docker Documentation', url: 'https://docs.docker.com/', type: 'doc' },
      { name: 'Docker for Beginners', url: 'https://docker-curriculum.com/', type: 'doc' },
      { name: 'Play with Docker', url: 'https://labs.play-with-docker.com/', type: 'repo' }
    ],
    projects: [
      { title: 'Containerize App', difficulty: 2 as DifficultyRating, description: 'Containerize a web application', outcomes: ['Dockerfile writing', 'Image building', 'Container running'] },
      { title: 'Microservices Setup', difficulty: 4 as DifficultyRating, description: 'Deploy microservices with Docker Compose', outcomes: ['Multi-container', 'Networking', 'Volume management'] }
    ],
    careerPaths: ['devops', 'backend', 'fullstack'] as CareerPath[],
    alternativeNames: ['Docker Container'],
    synonyms: ['Containerization', 'Container Runtime'],
    languages: ['Dockerfile', 'YAML'],
    tools: ['Docker Desktop', 'Docker Compose', 'Docker Hub', 'Minikube'],
    frameworks: ['Docker Swarm'],
    platforms: ['Windows', 'macOS', 'Linux', 'Cloud']
  },
  {
    id: 'aws',
    name: 'AWS',
    slug: 'aws',
    category: 'Programming' as SkillCategory,
    subcategory: 'Cloud',
    proficiency: 'Advanced' as ProficiencyLevel,
    description: 'Amazon Web Services - comprehensive cloud computing platform.',
    longDescription: 'AWS is the world\'s most comprehensive and widely adopted cloud platform, offering over 200 fully featured services from data centers globally. It provides infrastructure as a service (IaaS), platform as a service (PaaS), and software as a service (SaaS). Key services include EC2 (compute), S3 (storage), RDS (databases), Lambda (serverless), and many more.',
    icon: '☁️',
    iconColor: '#FF9900',
    tags: ['cloud', 'devops', 'infrastructure', 'serverless', 'storage', 'compute'],
    relatedSkills: ['Docker', 'Kubernetes', 'Linux', 'Python', 'Terraform', 'Serverless'],
    prerequisites: [
      { prerequisite: 'Linux', type: 'required', strength: 0.85, description: 'Linux administration skills' },
      { prerequisite: 'Networking', type: 'required', strength: 0.8, description: 'VPC, subnets, routing' },
      { prerequisite: 'Security Basics', type: 'recommended', strength: 0.7, description: 'IAM and security concepts' }
    ],
    dependencies: [
      { prerequisite: 'Docker', type: 'related', strength: 0.9, description: 'Container services on AWS' },
      { prerequisite: 'Kubernetes', type: 'related', strength: 0.85, description: 'EKS managed Kubernetes' }
    ],
    weight: {
      frontend: 0.2, backend: 0.8, fullstack: 0.7, datascience: 0.6, cybersecurity: 0.5, devops: 1.0,
      mobile: 0.4, ai_ml: 0.7, design: 0.1, product: 0.2, marketing: 0.1, management: 0.2
    },
    marketData: {
      demandIndex: 94,
      trend: 'rising' as SkillTrend,
      growthRate: 20,
      salaryRange: { junior: 70000, mid: 120000, senior: 180000, lead: 250000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Amazon', 'All major enterprises', 'Startups', 'Government'],
      jobPostingsCount: 1650,
      competitionLevel: 'high' as CompetitionLevel,
      difficultyToLearn: 4 as DifficultyRating,
      timeToProficiency: '6-12 months',
      industryAdoption: 85,
      automationRisk: 8,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'aws-saa', name: 'AWS Solutions Architect - Associate', provider: 'Amazon', difficulty: 3 as DifficultyRating, cost: 150, duration: '130 minutes', validity: '2 years', validityMonths: 24, careerValue: 96, description: 'Architecting on AWS', examFormat: 'Multiple choice, 65 questions', prerequisites: ['Basic AWS knowledge'], renewalRequirements: 'Recertification', careerImpact: 'High-demand credential' },
      { id: 'aws-dev', name: 'AWS Developer - Associate', provider: 'Amazon', difficulty: 4 as DifficultyRating, cost: 150, duration: '130 minutes', validity: '2 years', validityMonths: 24, careerValue: 95, description: 'Developing on AWS', examFormat: 'Multiple choice, 65 questions', prerequisites: ['1+ year AWS experience'], renewalRequirements: 'Recertification', careerImpact: 'Developer-focused AWS skills' },
      { id: 'aws-sap', name: 'AWS Solutions Architect - Professional', provider: 'Amazon', difficulty: 5 as DifficultyRating, cost: 300, duration: '190 minutes', validity: '2 years', validityMonths: 24, careerValue: 99, description: 'Advanced architecture', examFormat: 'Multiple choice + essay', prerequisites: ['SAA + 2 years'], renewalRequirements: 'Recertification', careerImpact: 'Elite architect credential' }
    ],
    assessment: {
      type: 'quiz',
      questions: 60,
      duration: 90,
      passingScore: 72,
      topics: ['EC2', 'S3', 'VPC', 'IAM', 'RDS', 'Lambda', 'CloudFormation', 'ECS', 'SQS', 'SNS']
    },
    resources: [
      { name: 'AWS Documentation', url: 'https://docs.aws.amazon.com/', type: 'doc' },
      { name: 'AWS Skill Builder', url: 'https://skillbuilder.aws/', type: 'video' },
      { name: 'Adrian Cantrill Courses', url: 'https://cantrill.io/', type: 'video' }
    ],
    projects: [
      { title: 'Deploy Web Application', difficulty: 3 as DifficultyRating, description: 'Deploy 3-tier application on AWS', outcomes: ['EC2 setup', 'RDS configuration', 'Load balancing'] },
      { title: 'Serverless Architecture', difficulty: 5 as DifficultyRating, description: 'Build serverless microservice', outcomes: ['Lambda', 'API Gateway', 'DynamoDB', 'CI/CD'] }
    ],
    careerPaths: ['devops', 'backend', 'fullstack', 'datascience'] as CareerPath[],
    alternativeNames: ['Amazon Web Services'],
    synonyms: ['AWS Cloud', 'Amazon Cloud'],
    languages: ['CLI', 'Python', 'Terraform', 'CloudFormation'],
    tools: ['AWS Console', 'CLI', 'SAM', 'CDK'],
    frameworks: ['AWS Serverless', 'AWS Elastic Beanstalk'],
    platforms: ['AWS Global Infrastructure']
  },
  {
    id: 'git',
    name: 'Git',
    slug: 'git',
    category: 'Programming' as SkillCategory,
    subcategory: 'Version Control',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'Distributed version control system for tracking changes in source code.',
    longDescription: 'Git is the most widely used modern version control system in the world. It enables multiple developers to collaborate on projects, tracks changes, supports non-linear development through branching and merging, and provides data integrity and workflow flexibility.',
    icon: '🔀',
    iconColor: '#F05032',
    tags: ['version-control', 'collaboration', 'devops', 'code-management', 'branching'],
    relatedSkills: ['GitHub', 'GitLab', 'CI/CD', 'DevOps', 'Agile'],
    prerequisites: [
      { prerequisite: 'Command Line', type: 'required', strength: 0.8, description: 'Terminal usage required' },
      { prerequisite: 'Basic Programming', type: 'recommended', strength: 0.6, description: 'Understanding of code' }
    ],
    dependencies: [
      { prerequisite: 'GitHub', type: 'related', strength: 0.9, description: 'Git hosting platform' },
      { prerequisite: 'CI/CD', type: 'related', strength: 0.75, description: 'Git in pipelines' }
    ],
    weight: {
      frontend: 0.95, backend: 0.95, fullstack: 0.95, datascience: 0.8, cybersecurity: 0.7, devops: 0.9,
      mobile: 0.95, ai_ml: 0.8, design: 0.5, product: 0.3, marketing: 0.2, management: 0.3
    },
    marketData: {
      demandIndex: 99,
      trend: 'stable' as SkillTrend,
      growthRate: 5,
      salaryRange: { junior: 45000, mid: 70000, senior: 100000, lead: 130000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['All software companies'],
      jobPostingsCount: 5000,
      competitionLevel: 'very_high' as CompetitionLevel,
      difficultyToLearn: 2 as DifficultyRating,
      timeToProficiency: '1-3 months',
      industryAdoption: 98,
      automationRisk: 2,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'git-cert', name: 'Git Certification', provider: 'Various', difficulty: 2 as DifficultyRating, cost: 100-300, duration: '1-2 hours', validity: 'lifetime', validityMonths: 0, careerValue: 75, description: 'Various Git certifications available', examFormat: 'Practical + theory', prerequisites: [], renewalRequirements: 'None', careerImpact: 'Validates Git proficiency' }
    ],
    assessment: {
      type: 'quiz',
      questions: 35,
      duration: 35,
      passingScore: 70,
      topics: ['Commits', 'Branching', 'Merging', 'Rebase', 'Reset', 'Stashing', 'Remote Operations', 'Tags']
    },
    resources: [
      { name: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2', type: 'book' },
      { name: 'Learn Git Branching', url: 'https://learngitbranching.js.org/', type: 'repo' },
      { name: 'Git Documentation', url: 'https://git-scm.com/doc', type: 'doc' }
    ],
    projects: [
      { title: 'Git Workflow Implementation', difficulty: 2 as DifficultyRating, description: 'Set up team Git workflow', outcomes: ['Branching strategy', 'Merge workflows', 'Code review'] },
      { title: 'GitOps Pipeline', difficulty: 4 as DifficultyRating, description: 'Build GitOps deployment', outcomes: ['GitOps principles', 'Automation', 'CI/CD integration'] }
    ],
    careerPaths: ['frontend', 'backend', 'fullstack', 'datascience', 'devops', 'mobile', 'ai_ml'] as CareerPath[],
    alternativeNames: ['Git Version Control'],
    synonyms: ['Git SCM'],
    languages: ['Git commands', 'Bash'],
    tools: ['Git', 'GitHub', 'GitLab', 'Bitbucket'],
    frameworks: [],
    platforms: ['All platforms']
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    slug: 'nodejs',
    category: 'Programming' as SkillCategory,
    subcategory: 'Runtime Environment',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'JavaScript runtime built on Chrome\'s V8 engine for server-side development.',
    longDescription: 'Node.js enables JavaScript to be used for server-side programming, enabling full-stack JavaScript development. It uses an event-driven, non-blocking I/O model that makes it efficient and suitable for real-time applications, APIs, and microservices. The npm ecosystem is the largest package registry in the world.',
    icon: '🟢',
    iconColor: '#339933',
    tags: ['javascript', 'backend', 'runtime', 'server', 'api', 'microservices', 'npm'],
    relatedSkills: ['JavaScript', 'TypeScript', 'Express', 'NestJS', 'REST API', 'MongoDB', 'Socket.io'],
    prerequisites: [
      { prerequisite: 'JavaScript ES6+', type: 'required', strength: 0.95, description: 'Strong JavaScript knowledge required' },
      { prerequisite: 'HTTP Protocol', type: 'required', strength: 0.7, description: 'Understanding of web protocols' },
      { prerequisite: 'Command Line', type: 'recommended', strength: 0.6, description: 'Terminal usage' }
    ],
    dependencies: [
      { prerequisite: 'Express.js', type: 'related', strength: 0.9, description: 'Most popular Node.js framework' },
      { prerequisite: 'MongoDB', type: 'related', strength: 0.8, description: 'Common Node.js database pairing' }
    ],
    weight: {
      frontend: 0.3, backend: 0.95, fullstack: 0.9, datascience: 0.3, cybersecurity: 0.4, devops: 0.5,
      mobile: 0.4, ai_ml: 0.3, design: 0.0, product: 0.2, marketing: 0.1, management: 0.1
    },
    marketData: {
      demandIndex: 92,
      trend: 'stable' as SkillTrend,
      growthRate: 8,
      salaryRange: { junior: 55000, mid: 85000, senior: 130000, lead: 170000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Netflix', 'LinkedIn', 'Walmart', 'NASA', 'PayPal'],
      jobPostingsCount: 1800,
      competitionLevel: 'high' as CompetitionLevel,
      difficultyToLearn: 2 as DifficultyRating,
      timeToProficiency: '3-6 months',
      industryAdoption: 90,
      automationRisk: 10,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'node-cert', name: 'OpenJS Node.js Application Developer', provider: 'OpenJS Foundation', difficulty: 3 as DifficultyRating, cost: 150, duration: '2 hours', validity: 'lifetime', validityMonths: 0, careerValue: 88, description: 'Official Node.js certification', examFormat: 'Performance-based', prerequisites: ['Node.js experience'], renewalRequirements: 'None', careerImpact: 'Validates Node.js skills' }
    ],
    assessment: {
      type: 'quiz',
      questions: 40,
      duration: 40,
      passingScore: 70,
      topics: ['Event Loop', 'Streams', 'Buffers', 'Modules', 'Async Patterns', 'Error Handling', 'Performance']
    },
    resources: [
      { name: 'Node.js Documentation', url: 'https://nodejs.org/en/docs/', type: 'doc' },
      { name: 'Node.js Design Patterns', url: 'https://www.nodejsdesignpatterns.com/', type: 'book' },
      { name: 'The Net Ninja Node.js Course', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9i5lK5X5lTjJkD4lM4Z4lK', type: 'video' }
    ],
    projects: [
      { title: 'REST API', difficulty: 3 as DifficultyRating, description: 'Build a REST API with Express', outcomes: ['API design', 'Database integration', 'Authentication'] },
      { title: 'Real-time Chat', difficulty: 4 as DifficultyRating, description: 'Build chat app with Socket.io', outcomes: ['WebSockets', 'Real-time communication', 'State management'] }
    ],
    careerPaths: ['backend', 'fullstack'] as CareerPath[],
    alternativeNames: ['Node', 'NodeJS'],
    synonyms: ['Node.js 18', 'Node.js 20'],
    languages: ['JavaScript', 'TypeScript'],
    tools: ['npm', 'yarn', 'pnpm', 'pm2', 'nodemon'],
    frameworks: ['Express', 'NestJS', 'Fastify', 'Koa'],
    platforms: ['Windows', 'macOS', 'Linux', 'Docker', 'Cloud']
  },
  {
    id: 'angular',
    name: 'Angular',
    slug: 'angular',
    category: 'Programming' as SkillCategory,
    subcategory: 'Frontend Framework',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'Platform and framework for building mobile and desktop web applications with TypeScript.',
    longDescription: 'Angular is a TypeScript-based web application framework developed by Google. It provides a comprehensive solution for building large-scale, enterprise applications with features like dependency injection, routing, forms handling, and HTTP client. Angular uses a component-based architecture and promotes testability and maintainability.',
    icon: '🅰️',
    iconColor: '#DD0031',
    tags: ['frontend', 'typescript', 'framework', 'web', 'spa', 'enterprise', 'google'],
    relatedSkills: ['TypeScript', 'RxJS', 'Angular CLI', 'NgRx', 'REST API', 'GraphQL'],
    prerequisites: [
      { prerequisite: 'TypeScript', type: 'required', strength: 0.85, description: 'Strong TypeScript knowledge required' },
      { prerequisite: 'HTML/CSS', type: 'required', strength: 0.8, description: 'Web fundamentals' },
      { prerequisite: 'OOP Concepts', type: 'required', strength: 0.7, description: 'Object-oriented programming' }
    ],
    dependencies: [
      { prerequisite: 'RxJS', type: 'required', strength: 0.9, description: 'Reactive programming in Angular' },
      { prerequisite: 'TypeScript', type: 'required', strength: 0.85, description: 'Angular is TypeScript-based' }
    ],
    weight: {
      frontend: 0.95, backend: 0.2, fullstack: 0.5, datascience: 0.1, cybersecurity: 0.2, devops: 0.1,
      mobile: 0.5, ai_ml: 0.1, design: 0.4, product: 0.2, marketing: 0.1, management: 0.1
    },
    marketData: {
      demandIndex: 85,
      trend: 'stable' as SkillTrend,
      growthRate: 5,
      salaryRange: { junior: 60000, mid: 95000, senior: 140000, lead: 180000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Google', 'Microsoft', 'IBM', 'Deutsche Bank', 'Garmin'],
      jobPostingsCount: 1100,
      competitionLevel: 'medium' as CompetitionLevel,
      difficultyToLearn: 4 as DifficultyRating,
      timeToProficiency: '4-8 months',
      industryAdoption: 72,
      automationRisk: 8,
      futureOutlook: 'good'
    },
    certifications: [
      { id: 'angular-cert', name: 'Angular Developer Professional', provider: 'Google (Coursera)', difficulty: 3 as DifficultyRating, cost: 0, duration: '5 courses', validity: 'lifetime', validityMonths: 0, careerValue: 85, description: 'Google-certified Angular course', examFormat: 'Projects and quizzes', prerequisites: [], renewalRequirements: 'None', careerImpact: 'Industry-recognized Angular skills' }
    ],
    assessment: {
      type: 'quiz',
      questions: 45,
      duration: 45,
      passingScore: 72,
      topics: ['Components', 'Services', 'Modules', 'Routing', 'Forms', 'HTTP', 'RxJS', 'DI']
    },
    resources: [
      { name: 'Angular Documentation', url: 'https://angular.io/docs', type: 'doc' },
      { name: 'Angular Tutorial', url: 'https://angular.io/tutorial', type: 'doc' },
      { name: 'Angular University', url: 'https://angular-university.io/', type: 'video' }
    ],
    projects: [
      { title: 'Dashboard App', difficulty: 3 as DifficultyRating, description: 'Build enterprise dashboard', outcomes: ['Components', 'Services', 'RxJS'] },
      { title: 'E-commerce Platform', difficulty: 5 as DifficultyRating, description: 'Full e-commerce with payments', outcomes: ['Full-stack Angular', 'State management', 'Performance'] }
    ],
    careerPaths: ['frontend', 'fullstack'] as CareerPath[],
    alternativeNames: ['Angular 2+', 'Angular 17'],
    synonyms: ['AngularJS', 'Angular 16'],
    languages: ['TypeScript', 'HTML', 'SCSS'],
    tools: ['Angular CLI', 'NgRx', 'Nx', 'Storybook'],
    frameworks: ['Angular Material', 'NestJS'],
    platforms: ['Web', 'Ionic (mobile)']
  },
  {
    id: 'vuejs',
    name: 'Vue.js',
    slug: 'vuejs',
    category: 'Programming' as SkillCategory,
    subcategory: 'Frontend Framework',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'Progressive JavaScript framework for building user interfaces.',
    longDescription: 'Vue.js is a progressive JavaScript framework known for its gentle learning curve and flexible architecture. It allows developers to adopt its features incrementally—from simple reactive components to full-fledged single-page applications. Vue combines the best ideas from React and Angular while maintaining its own unique approach.',
    icon: '💚',
    iconColor: '#4FC08D',
    tags: ['frontend', 'javascript', 'framework', 'web', 'spa', 'progressive', 'components'],
    relatedSkills: ['JavaScript', 'TypeScript', 'Vue Router', 'Pinia', 'Vite', 'REST API'],
    prerequisites: [
      { prerequisite: 'JavaScript ES6+', type: 'required', strength: 0.9, description: 'Strong JavaScript knowledge required' },
      { prerequisite: 'HTML/CSS', type: 'required', strength: 0.8, description: 'Web fundamentals' }
    ],
    dependencies: [
      { prerequisite: 'Vue Router', type: 'related', strength: 0.9, description: 'Official routing solution' },
      { prerequisite: 'Pinia', type: 'related', strength: 0.85, description: 'State management' }
    ],
    weight: {
      frontend: 0.9, backend: 0.1, fullstack: 0.5, datascience: 0.1, cybersecurity: 0.2, devops: 0.1,
      mobile: 0.6, ai_ml: 0.1, design: 0.4, product: 0.2, marketing: 0.1, management: 0.1
    },
    marketData: {
      demandIndex: 82,
      trend: 'stable' as SkillTrend,
      growthRate: 8,
      salaryRange: { junior: 55000, mid: 90000, senior: 135000, lead: 175000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Alibaba', 'Xiaomi', 'Nintendo', 'GitLab', 'Nintendo'],
      jobPostingsCount: 950,
      competitionLevel: 'medium' as CompetitionLevel,
      difficultyToLearn: 2 as DifficultyRating,
      timeToProficiency: '2-4 months',
      industryAdoption: 68,
      automationRisk: 6,
      futureOutlook: 'good'
    },
    certifications: [
      { id: 'vue-cert', name: 'Vue.js Developer Certification', provider: 'Vue School', difficulty: 3 as DifficultyRating, cost: 200, duration: '2 hours', validity: 'lifetime', validityMonths: 0, careerValue: 82, description: 'Comprehensive Vue.js certification', examFormat: 'Practical + theory', prerequisites: ['Vue experience'], renewalRequirements: 'None', careerImpact: 'Validates Vue expertise' }
    ],
    assessment: {
      type: 'quiz',
      questions: 40,
      duration: 40,
      passingScore: 70,
      topics: ['Components', 'Reactivity', 'Directives', 'Composition API', 'Vue Router', 'Pinia', 'Vuex']
    },
    resources: [
      { name: 'Vue.js Documentation', url: 'https://vuejs.org/', type: 'doc' },
      { name: 'Vue Mastery', url: 'https://www.vuemastery.com/', type: 'video' },
      { name: 'Vue School', url: 'https://vueschool.io/', type: 'video' }
    ],
    projects: [
      { title: 'Todo App', difficulty: 2 as DifficultyRating, description: 'Build a todo application', outcomes: ['Components', 'Reactivity', 'Local storage'] },
      { title: 'SaaS Dashboard', difficulty: 4 as DifficultyRating, description: 'Build admin dashboard', outcomes: ['Vue 3 features', 'State management', 'Charts integration'] }
    ],
    careerPaths: ['frontend', 'fullstack'] as CareerPath[],
    alternativeNames: ['Vue', 'Vue 3'],
    synonyms: ['Vue.js 3', 'Vue 2 (legacy)'],
    languages: ['JavaScript', 'TypeScript'],
    tools: ['Vite', 'Vue CLI', 'Pinia', 'Nuxt'],
    frameworks: ['Nuxt.js', 'Vuetify', 'Quasar'],
    platforms: ['Web', 'Mobile (via Capacitor)']
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    slug: 'mongodb',
    category: 'Programming' as SkillCategory,
    subcategory: 'Database',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'Document-oriented NoSQL database for modern applications.',
    longDescription: 'MongoDB is a leading NoSQL database that stores data in flexible, JSON-like documents. It features a powerful query language, indexing for performance, horizontal scaling through sharding, and support for ACID transactions. MongoDB is ideal for applications requiring rapid development, flexible schemas, and scalability.',
    icon: '🍃',
    iconColor: '#47A248',
    tags: ['database', 'nosql', 'document', 'backend', 'storage', 'scalability', 'flexible'],
    relatedSkills: ['Node.js', 'Mongoose', 'Express', 'REST API', 'Aggregation Pipeline', 'Atlas'],
    prerequisites: [
      { prerequisite: 'JSON', type: 'required', strength: 0.9, description: 'Understanding of JSON/BSON' },
      { prerequisite: 'Database Concepts', type: 'recommended', strength: 0.7, description: 'Basic database knowledge' }
    ],
    dependencies: [
      { prerequisite: 'Node.js', type: 'related', strength: 0.85, description: 'Common Node.js pairing' },
      { prerequisite: 'Mongoose', type: 'related', strength: 0.8, description: 'Popular ODM for MongoDB' }
    ],
    weight: {
      frontend: 0.0, backend: 0.85, fullstack: 0.7, datascience: 0.5, cybersecurity: 0.3, devops: 0.5,
      mobile: 0.4, ai_ml: 0.4, design: 0.0, product: 0.2, marketing: 0.1, management: 0.1
    },
    marketData: {
      demandIndex: 86,
      trend: 'stable' as SkillTrend,
      growthRate: 7,
      salaryRange: { junior: 50000, mid: 80000, senior: 120000, lead: 160000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['IBM', 'Google', 'EA', 'Codecademy', 'Fortune 500 companies'],
      jobPostingsCount: 1050,
      competitionLevel: 'medium' as CompetitionLevel,
      difficultyToLearn: 2 as DifficultyRating,
      timeToProficiency: '2-4 months',
      industryAdoption: 75,
      automationRisk: 12,
      futureOutlook: 'good'
    },
    certifications: [
      { id: 'mongo-db-dev', name: 'MongoDB Developer', provider: 'MongoDB University', difficulty: 3 as DifficultyRating, cost: 0, duration: '7 courses', validity: 'lifetime', validityMonths: 0, careerValue: 88, description: 'Free MongoDB certification', examFormat: 'Quizzes and practical', prerequisites: [], renewalRequirements: 'None', careerImpact: 'Validates MongoDB skills' }
    ],
    assessment: {
      type: 'quiz',
      questions: 40,
      duration: 40,
      passingScore: 70,
      topics: ['CRUD Operations', 'Data Modeling', 'Indexing', 'Aggregation', 'Transactions', 'Sharding']
    },
    resources: [
      { name: 'MongoDB Documentation', url: 'https://docs.mongodb.com/', type: 'doc' },
      { name: 'MongoDB University', url: 'https://university.mongodb.com/', type: 'video' },
      { name: 'The MongoDB Playbook', url: 'https://www.mongodb.com/playbook', type: 'doc' }
    ],
    projects: [
      { title: 'Blog Platform', difficulty: 2 as DifficultyRating, description: 'Build a blog with MongoDB', outcomes: ['CRUD operations', 'Data modeling', 'Queries'] },
      { title: 'E-commerce Backend', difficulty: 4 as DifficultyRating, description: 'Full e-commerce database', outcomes: ['Complex queries', 'Aggregation pipeline', 'Transactions'] }
    ],
    careerPaths: ['backend', 'fullstack', 'datascience'] as CareerPath[],
    alternativeNames: ['Mongo'],
    synonyms: ['MongoDB Atlas', 'MongoDB 6.0'],
    languages: ['JavaScript', 'Python', 'Java'],
    tools: ['MongoDB Atlas', 'Compass', 'Shell', 'Atlas CLI'],
    frameworks: ['Mongoose', 'Prisma', 'TypeORM'],
    platforms: ['Cloud', 'Linux', 'Windows', 'macOS', 'Docker']
  },
  {
    id: 'redis',
    name: 'Redis',
    slug: 'redis',
    category: 'Programming' as SkillCategory,
    subcategory: 'Database',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'In-memory data structure store for caching, messaging, and sessions.',
    longDescription: 'Redis (Remote Dictionary Server) is an open-source, in-memory data structure store used as a database, cache, and message broker. It supports various data structures including strings, hashes, lists, sets, sorted sets, and streams. Redis is renowned for its exceptional performance, making it ideal for caching, real-time analytics, and session management.',
    icon: '🔴',
    iconColor: '#DC382D',
    tags: ['database', 'cache', 'in-memory', 'messaging', 'session', 'real-time', 'key-value'],
    relatedSkills: ['Node.js', 'Python', 'Caching Patterns', 'Message Queue', 'Session Management', 'Pub/Sub'],
    prerequisites: [
      { prerequisite: 'Database Fundamentals', type: 'required', strength: 0.7, description: 'Basic database concepts' },
      { prerequisite: 'Programming', type: 'recommended', strength: 0.6, description: 'Any programming language' }
    ],
    dependencies: [
      { prerequisite: 'Caching Patterns', type: 'related', strength: 0.85, description: 'Redis is primarily used for caching' },
      { prerequisite: 'Message Queue', type: 'related', strength: 0.8, description: 'Pub/Sub functionality' }
    ],
    weight: {
      frontend: 0.0, backend: 0.75, fullstack: 0.5, datascience: 0.3, cybersecurity: 0.4, devops: 0.6,
      mobile: 0.2, ai_ml: 0.3, design: 0.0, product: 0.1, marketing: 0.1, management: 0.1
    },
    marketData: {
      demandIndex: 84,
      trend: 'stable' as SkillTrend,
      growthRate: 9,
      salaryRange: { junior: 55000, mid: 85000, senior: 125000, lead: 165000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Twitter', 'Instagram', 'Snapchat', 'Pinterest', 'GitHub'],
      jobPostingsCount: 820,
      competitionLevel: 'medium' as CompetitionLevel,
      difficultyToLearn: 2 as DifficultyRating,
      timeToProficiency: '2-3 months',
      industryAdoption: 78,
      automationRisk: 8,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'redis-cert', name: 'Redis Certified Developer', provider: 'Redis Labs', difficulty: 3 as DifficultyRating, cost: 200, duration: '90 minutes', validity: 'lifetime', validityMonths: 0, careerValue: 86, description: 'Official Redis certification', examFormat: 'Multiple choice + practical', prerequisites: ['Redis experience'], renewalRequirements: 'None', careerImpact: 'Validates Redis expertise' }
    ],
    assessment: {
      type: 'quiz',
      questions: 35,
      duration: 35,
      passingScore: 70,
      topics: ['Data Types', 'Commands', 'Persistence', 'Clustering', 'Pub/Sub', 'Lua Scripting']
    },
    resources: [
      { name: 'Redis Documentation', url: 'https://redis.io/documentation', type: 'doc' },
      { name: 'Redis University', url: 'https://university.redis.io/', type: 'video' },
      { name: 'Redis Labs Academy', url: 'https://redis.com/academy/', type: 'video' }
    ],
    projects: [
      { title: 'Session Store', difficulty: 2 as DifficultyRating, description: 'Implement session caching', outcomes: ['Session management', 'TTL patterns', 'Security'] },
      { title: 'Real-time Leaderboard', difficulty: 3 as DifficultyRating, description: 'Build gaming leaderboard', outcomes: ['Sorted sets', 'Real-time updates', 'Performance'] }
    ],
    careerPaths: ['backend', 'devops', 'fullstack'] as CareerPath[],
    alternativeNames: ['Redis'],
    synonyms: ['Redis 7', 'Redis Stack'],
    languages: ['CLI', 'Python', 'JavaScript'],
    tools: ['Redis CLI', 'RedisInsight', 'Redis Stack'],
    frameworks: ['ioredis', 'node-redis', 'django-redis'],
    platforms: ['Linux', 'macOS', 'Windows (WSL)', 'Docker', 'Cloud']
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    slug: 'graphql',
    category: 'Programming' as SkillCategory,
    subcategory: 'API Technology',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'Query language for APIs and runtime for fulfilling those queries.',
    longDescription: 'GraphQL is a query language and runtime for APIs that enables clients to request exactly the data they need. It provides a complete description of the data in the API, gives clients the power to ask for exactly what they need, and nothing more. GraphQL reduces over-fetching and under-fetching, making applications more efficient.',
    icon: '🔮',
    iconColor: 'E10098',
    tags: ['api', 'query-language', 'backend', 'frontend', 'schema', 'types', 'rest-alternative'],
    relatedSkills: ['REST API', 'JavaScript', 'TypeScript', 'Apollo', 'Prisma', 'Node.js'],
    prerequisites: [
      { prerequisite: 'REST API Concepts', type: 'required', strength: 0.8, description: 'Understanding of REST' },
      { prerequisite: 'JSON', type: 'required', strength: 0.7, description: 'JSON knowledge required' }
    ],
    dependencies: [
      { prerequisite: 'Apollo Server', type: 'related', strength: 0.9, description: 'Popular GraphQL server' },
      { prerequisite: 'Prisma', type: 'related', strength: 0.75, description: 'Database ORM for GraphQL' }
    ],
    weight: {
      frontend: 0.4, backend: 0.8, fullstack: 0.7, datascience: 0.2, cybersecurity: 0.2, devops: 0.3,
      mobile: 0.4, ai_ml: 0.2, design: 0.1, product: 0.2, marketing: 0.1, management: 0.1
    },
    marketData: {
      demandIndex: 82,
      trend: 'rising' as SkillTrend,
      growthRate: 15,
      salaryRange: { junior: 60000, mid: 90000, senior: 135000, lead: 175000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Facebook', 'GitHub', 'Shopify', 'Netflix', 'Airbnb'],
      jobPostingsCount: 720,
      competitionLevel: 'medium' as CompetitionLevel,
      difficultyToLearn: 3 as DifficultyRating,
      timeToProficiency: '2-4 months',
      industryAdoption: 62,
      automationRisk: 5,
      futureOutlook: 'good'
    },
    certifications: [
      { id: 'graphql-cert', name: 'GraphQL Certification', provider: 'Apollo', difficulty: 3 as DifficultyRating, cost: 0, duration: 'Free courses', validity: 'lifetime', validityMonths: 0, careerValue: 82, description: 'Apollo GraphQL training', examFormat: 'Quizzes', prerequisites: [], renewalRequirements: 'None', careerImpact: 'Validates GraphQL skills' }
    ],
    assessment: {
      type: 'quiz',
      questions: 35,
      duration: 35,
      passingScore: 70,
      topics: ['Queries', 'Mutations', 'Subscriptions', 'Schema', 'Resolvers', 'Fragments', 'Directives']
    },
    resources: [
      { name: 'GraphQL Documentation', url: 'https://graphql.org/', type: 'doc' },
      { name: 'Apollo GraphQL Docs', url: 'https://www.apollographql.com/docs/', type: 'doc' },
      { name: 'How to GraphQL', url: 'https://www.howtographql.com/', type: 'video' }
    ],
    projects: [
      { title: 'GraphQL API', difficulty: 3 as DifficultyRating, description: 'Build GraphQL backend', outcomes: ['Schema design', 'Resolvers', 'Error handling'] },
      { title: 'Full-stack App', difficulty: 4 as DifficultyRating, description: 'Apollo client + server app', outcomes: ['Client state', 'Optimistic updates', 'Caching'] }
    ],
    careerPaths: ['frontend', 'backend', 'fullstack'] as CareerPath[],
    alternativeNames: ['GQL'],
    synonyms: ['GraphQL 16', 'Apollo GraphQL'],
    languages: ['Schema Definition Language', 'JavaScript', 'TypeScript'],
    tools: ['Apollo Server', 'Apollo Client', 'GraphQL Playground', 'GraphiQL'],
    frameworks: ['Apollo', 'Hasura', 'NestJS GraphQL'],
    platforms: ['Node.js', 'Go', 'Java', 'Python', 'Ruby']
  },
  {
    id: 'terraform',
    name: 'Terraform',
    slug: 'terraform',
    category: 'Programming' as SkillCategory,
    subcategory: 'Infrastructure as Code',
    proficiency: 'Advanced' as ProficiencyLevel,
    description: 'Infrastructure as Code tool for building, changing, and versioning infrastructure.',
    longDescription: 'Terraform is an Infrastructure as Code (IaC) tool that enables you to define and provision infrastructure using declarative configuration files. It supports various cloud providers including AWS, Azure, and Google Cloud Platform, and allows for the creation, update, and versioning of infrastructure safely and efficiently.',
    icon: '🏗️',
    iconColor: '#7B42BC',
    tags: ['devops', 'infrastructure', 'iac', 'cloud', 'automation', 'provisioning', 'aws', 'azure'],
    relatedSkills: ['AWS', 'Azure', 'Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Configuration Management'],
    prerequisites: [
      { prerequisite: 'Cloud Concepts', type: 'required', strength: 0.85, description: 'Understanding of cloud services' },
      { prerequisite: 'Linux', type: 'required', strength: 0.7, description: 'Command line proficiency' },
      { prerequisite: 'Networking Basics', type: 'recommended', strength: 0.7, description: 'VPC, subnets, etc.' }
    ],
    dependencies: [
      { prerequisite: 'AWS/Azure/GCP', type: 'related', strength: 0.95, description: 'Cloud provider knowledge' },
      { prerequisite: 'Git', type: 'related', strength: 0.7, description: 'Version control for IaC' }
    ],
    weight: {
      frontend: 0.0, backend: 0.3, fullstack: 0.2, datascience: 0.2, cybersecurity: 0.4, devops: 1.0,
      mobile: 0.1, ai_ml: 0.3, design: 0.0, product: 0.1, marketing: 0.0, management: 0.1
    },
    marketData: {
      demandIndex: 88,
      trend: 'rising' as SkillTrend,
      growthRate: 22,
      salaryRange: { junior: 70000, mid: 110000, senior: 160000, lead: 210000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['HashiCorp', 'Google', 'Amazon', 'Microsoft', 'Enterprise companies'],
      jobPostingsCount: 780,
      competitionLevel: 'medium' as CompetitionLevel,
      difficultyToLearn: 3 as DifficultyRating,
      timeToProficiency: '3-6 months',
      industryAdoption: 75,
      automationRisk: 10,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'terraform-associate', name: 'Terraform Associate', provider: 'HashiCorp', difficulty: 3 as DifficultyRating, cost: 70, duration: '1 hour', validity: '2 years', validityMonths: 24, careerValue: 92, description: 'Official Terraform certification', examFormat: 'Multiple choice, 57 questions', prerequisites: ['Basic Terraform knowledge'], renewalRequirements: 'Recertification', careerImpact: 'High-demand DevOps credential' }
    ],
    assessment: {
      type: 'quiz',
      questions: 45,
      duration: 50,
      passingScore: 70,
      topics: ['Providers', 'State', 'Modules', 'Variables', 'Outputs', 'Provisioners', 'Workspaces', 'Remote State']
    },
    resources: [
      { name: 'Terraform Documentation', url: 'https://www.terraform.io/docs', type: 'doc' },
      { name: 'Terraform by HashiCorp', url: 'https://learn.hashicorp.com/terraform', type: 'video' },
      { name: 'Terraform Up & Running', url: 'https://www.terraformupandrunning.com/', type: 'book' }
    ],
    projects: [
      { title: 'Cloud Infrastructure', difficulty: 3 as DifficultyRating, description: 'Provision cloud resources', outcomes: ['VPC setup', 'EC2 instances', 'Security groups'] },
      { title: 'Multi-cloud Setup', difficulty: 5 as DifficultyRating, description: 'Deploy across AWS and Azure', outcomes: ['Provider configuration', 'State management', 'Module design'] }
    ],
    careerPaths: ['devops', 'backend', 'cloud'] as CareerPath[],
    alternativeNames: ['Terraform'],
    synonyms: ['Terraform 1.6', 'Terraform Cloud', 'Terraform Enterprise'],
    languages: ['HCL', 'JSON'],
    tools: ['Terraform CLI', 'Terraform Cloud', 'Terragrunt', 'Infracost'],
    frameworks: ['Pulumi (alternative)', 'Crossplane'],
    platforms: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'VMware']
  },
  {
    id: 'selenium',
    name: 'Selenium',
    slug: 'selenium',
    category: 'Programming' as SkillCategory,
    subcategory: 'Testing',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'Browser automation framework for web testing and scraping.',
    longDescription: 'Selenium is a popular open-source framework for automating web browsers. It provides a single interface that lets you write test scripts in various programming languages (Python, Java, C#, Ruby) to control browser behavior. Selenium is widely used for automated testing of web applications and web scraping tasks.',
    icon: '🧪',
    iconColor: '#43B02A',
    tags: ['testing', 'automation', 'qa', 'web', 'scraping', 'browser', 'e2e'],
    relatedSkills: ['Python', 'Java', 'Test Automation', 'QA', 'CI/CD', 'Page Object Model', 'Web Scraping'],
    prerequisites: [
      { prerequisite: 'Programming', type: 'required', strength: 0.8, description: 'At least one language' },
      { prerequisite: 'HTML/CSS', type: 'required', strength: 0.7, description: 'Understanding of web elements' },
      { prerequisite: 'Testing Concepts', type: 'recommended', strength: 0.6, description: 'Basic QA knowledge' }
    ],
    dependencies: [
      { prerequisite: 'TestNG/JUnit', type: 'related', strength: 0.75, description: 'Testing frameworks' },
      { prerequisite: 'CI/CD', type: 'related', strength: 0.7, description: 'Running tests in pipelines' }
    ],
    weight: {
      frontend: 0.3, backend: 0.3, fullstack: 0.3, datascience: 0.1, cybersecurity: 0.3, devops: 0.4,
      mobile: 0.1, ai_ml: 0.1, design: 0.0, product: 0.1, marketing: 0.1, management: 0.1
    },
    marketData: {
      demandIndex: 78,
      trend: 'stable' as SkillTrend,
      growthRate: 5,
      salaryRange: { junior: 50000, mid: 75000, senior: 110000, lead: 140000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Google', 'Netflix', 'Microsoft', 'ThoughtWorks', 'QA teams'],
      jobPostingsCount: 580,
      competitionLevel: 'medium' as CompetitionLevel,
      difficultyToLearn: 3 as DifficultyRating,
      timeToProficiency: '2-4 months',
      industryAdoption: 68,
      automationRisk: 15,
      futureOutlook: 'stable'
    },
    certifications: [
      { id: 'selenium-cert', name: 'Selenium WebDriver Certification', provider: 'Various', difficulty: 3 as DifficultyRating, cost: 150-300, duration: '2 hours', validity: 'lifetime', validityMonths: 0, careerValue: 78, description: 'Various Selenium certifications', examFormat: 'Practical + theory', prerequisites: ['Selenium experience'], renewalRequirements: 'None', careerImpact: 'Validates testing skills' }
    ],
    assessment: {
      type: 'quiz',
      questions: 40,
      duration: 40,
      passingScore: 70,
      topics: ['WebDriver', 'Locators', 'Waits', 'Page Object Model', 'TestNG', 'Parallel Execution', 'Reporting']
    },
    resources: [
      { name: 'Selenium Documentation', url: 'https://www.selenium.dev/documentation/', type: 'doc' },
      { name: 'Selenium with Java', url: 'https://www.youtube.com/playlist?list=PLhW3qG5bs-L8oRay8qeS4vseOuN4d-S', type: 'video' },
      { name: 'Automate the Browser', url: 'https://www.browserstack.com/', type: 'doc' }
    ],
    projects: [
      { title: 'Login Test Suite', difficulty: 2 as DifficultyRating, description: 'Build automated login tests', outcomes: ['WebDriver basics', 'Element locating', 'Assertions'] },
      { title: 'E-commerce Test Suite', difficulty: 4 as DifficultyRating, description: 'Complete e-commerce testing', outcomes: ['Page Object Model', 'Data-driven tests', 'CI integration'] }
    ],
    careerPaths: ['qa', 'test-automation', 'backend', 'devops'] as CareerPath[],
    alternativeNames: ['Selenium WebDriver'],
    synonyms: ['Selenium 4', 'Selenium IDE'],
    languages: ['Python', 'Java', 'C#', 'JavaScript', 'Ruby'],
    tools: ['WebDriver', 'Selenium Grid', 'TestNG', 'JUnit', 'PyTest'],
    frameworks: ['Playwright (alternative)', 'Cypress (alternative)'],
    platforms: ['Chrome', 'Firefox', 'Edge', 'Safari']
  },
  {
    id: 'rust',
    name: 'Rust',
    slug: 'rust',
    category: 'Programming' as SkillCategory,
    subcategory: 'Systems Programming',
    proficiency: 'Advanced' as ProficiencyLevel,
    description: 'Systems programming language focused on safety, performance, and concurrency.',
    longDescription: 'Rust is a systems programming language that guarantees memory safety without garbage collection. It combines low-level control with high-level ergonomics, making it ideal for performance-critical applications. Rust has been voted the most loved programming language in Stack Overflow surveys multiple years in a row.',
    icon: '🦀',
    iconColor: '#DEA584',
    tags: ['systems', 'programming', 'performance', 'safety', 'concurrency', 'webassembly', 'backend'],
    relatedSkills: ['C++', 'Systems Programming', 'WebAssembly', 'Tokio', 'Actix', 'Systems Security'],
    prerequisites: [
      { prerequisite: 'Programming Experience', type: 'required', strength: 0.95, description: 'Strong programming background required' },
      { prerequisite: 'C/C++ Concepts', type: 'recommended', strength: 0.8, description: 'Understanding of memory management' },
      { prerequisite: 'Algorithms', type: 'recommended', strength: 0.7, description: 'Strong algorithm knowledge' }
    ],
    dependencies: [
      { prerequisite: 'WebAssembly', type: 'related', strength: 0.7, description: 'Rust compiles to WASM' },
      { prerequisite: 'Systems Security', type: 'related', strength: 0.65, description: 'Memory safety focus' }
    ],
    weight: {
      frontend: 0.2, backend: 0.5, fullstack: 0.3, datascience: 0.2, cybersecurity: 0.6, devops: 0.4,
      mobile: 0.3, ai_ml: 0.4, design: 0.0, product: 0.1, marketing: 0.0, management: 0.1
    },
    marketData: {
      demandIndex: 72,
      trend: 'rising' as SkillTrend,
      growthRate: 28,
      salaryRange: { junior: 70000, mid: 110000, senior: 160000, lead: 220000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Microsoft', 'Google', 'Amazon', 'Cloudflare', 'Discord'],
      jobPostingsCount: 380,
      competitionLevel: 'low' as CompetitionLevel,
      difficultyToLearn: 5 as DifficultyRating,
      timeToProficiency: '12-18 months',
      industryAdoption: 42,
      automationRisk: 3,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'rust-associate', name: 'Rust Associate Certification', provider: 'Rust Foundation', difficulty: 4 as DifficultyRating, cost: 150, duration: '3 hours', validity: 'lifetime', validityMonths: 0, careerValue: 90, description: 'Official Rust certification', examFormat: 'Multiple choice + practical', prerequisites: ['Rust experience'], renewalRequirements: 'None', careerImpact: 'Valuable systems programming credential' }
    ],
    assessment: {
      type: 'quiz',
      questions: 50,
      duration: 60,
      passingScore: 75,
      topics: ['Ownership', 'Borrowing', 'Lifetimes', 'Error Handling', 'Concurrency', 'Cargo', 'Smart Pointers']
    },
    resources: [
      { name: 'The Rust Programming Language', url: 'https://doc.rust-lang.org/book/', type: 'book' },
      { name: 'Rust Documentation', url: 'https://www.rust-lang.org/docs', type: 'doc' },
      { name: 'Rust by Example', url: 'https://doc.rust-lang.org/rust-by-example/', type: 'repo' }
    ],
    projects: [
      { title: 'CLI Tool', difficulty: 3 as DifficultyRating, description: 'Build a CLI application', outcomes: ['Cargo usage', 'Error handling', 'Documentation'] },
      { title: 'Web Service', difficulty: 4 as DifficultyRating, description: 'Build API with Actix-web', outcomes: ['Async runtime', 'Database integration', 'Performance'] }
    ],
    careerPaths: ['backend', 'systems', 'devops', 'cybersecurity'] as CareerPath[],
    alternativeNames: ['Rustlang'],
    synonyms: ['Rust 1.75', 'Rust for Web'],
    languages: ['Rust'],
    tools: ['Cargo', 'Rustup', 'Clippy', 'Rust Analyzer'],
    frameworks: ['Actix', 'Rocket', 'Tokio', 'Yew'],
    platforms: ['Windows', 'macOS', 'Linux', 'WebAssembly', 'Embedded']
  },
  {
    id: 'go',
    name: 'Go',
    slug: 'go',
    category: 'Programming' as SkillCategory,
    subcategory: 'Systems Programming',
    proficiency: 'Intermediate' as ProficiencyLevel,
    description: 'Open-source programming language by Google for building simple, reliable, and efficient software.',
    longDescription: 'Go (Golang) is a statically typed, compiled programming language designed at Google. It combines the efficiency of compiled languages with the simplicity of dynamic languages. Go is known for its excellent concurrency support through goroutines and channels, making it ideal for cloud services, distributed systems, and DevOps tools.',
    icon: '🐹',
    iconColor: '#00ADD8',
    tags: ['programming', 'backend', 'systems', 'cloud', 'devops', 'concurrency', 'google'],
    relatedSkills: ['Cloud', 'Microservices', 'Docker', 'Kubernetes', 'REST API', 'gRPC', 'DevOps'],
    prerequisites: [
      { prerequisite: 'Programming Experience', type: 'required', strength: 0.85, description: 'Strong programming background' },
      { prerequisite: 'Command Line', type: 'recommended', strength: 0.7, description: 'Terminal proficiency' }
    ],
    dependencies: [
      { prerequisite: 'Docker', type: 'related', strength: 0.75, description: 'Go is used for DevOps tools' },
      { prerequisite: 'Cloud Native', type: 'related', strength: 0.8, description: 'Go in cloud environments' }
    ],
    weight: {
      frontend: 0.0, backend: 0.8, fullstack: 0.5, datascience: 0.3, cybersecurity: 0.5, devops: 0.8,
      mobile: 0.2, ai_ml: 0.4, design: 0.0, product: 0.1, marketing: 0.0, management: 0.1
    },
    marketData: {
      demandIndex: 82,
      trend: 'rising' as SkillTrend,
      growthRate: 18,
      salaryRange: { junior: 65000, mid: 100000, senior: 150000, lead: 200000 },
      geographicDemand: generateGeographicDemand('Praha'),
      topCompanies: ['Google', 'Uber', 'Docker', 'Dropbox', 'Cloudflare'],
      jobPostingsCount: 620,
      competitionLevel: 'medium' as CompetitionLevel,
      difficultyToLearn: 3 as DifficultyRating,
      timeToProficiency: '3-6 months',
      industryAdoption: 65,
      automationRisk: 5,
      futureOutlook: 'excellent'
    },
    certifications: [
      { id: 'go-cert', name: 'Go Certification', provider: 'Google (Coursera)', difficulty: 3 as DifficultyRating, cost: 0, duration: '3 courses', validity: 'lifetime', validityMonths: 0, careerValue: 85, description: 'Google Go certification', examFormat: 'Quizzes and projects', prerequisites: [], renewalRequirements: 'None', careerImpact: 'Validates Go expertise' }
    ],
    assessment: {
      type: 'quiz',
      questions: 40,
      duration: 40,
      passingScore: 70,
      topics: ['Goroutines', 'Channels', 'Interfaces', 'Error Handling', 'Concurrency', 'Packages', 'Testing']
    },
    resources: [
      { name: 'A Tour of Go', url: 'https://go.dev/tour/welcome/1', type: 'doc' },
      { name: 'Effective Go', url: 'https://go.dev/doc/effective_go', type: 'doc' },
      { name: 'Go by Example', url: 'https://gobyexample.com/', type: 'repo' }
    ],
    projects: [
      { title: 'CLI Tool', difficulty: 2 as DifficultyRating, description: 'Build a CLI application', outcomes: ['Go basics', 'CLI libraries', 'Testing'] },
      { title: 'Microservice', difficulty: 4 as DifficultyRating, description: 'Build REST/gRPC service', outcomes: ['Goroutines', 'API design', 'Docker deployment'] }
    ],
    careerPaths: ['backend', 'devops', 'cloud', 'systems'] as CareerPath[],
    alternativeNames: ['Golang', 'GoLang'],
    synonyms: ['Go 1.22', 'Go 1.21'],
    languages: ['Go'],
    tools: ['Go CLI', 'Gofmt', 'Delve', 'GoLand', 'VS Code'],
    frameworks: ['Gin', 'Echo', 'Fiber', 'GORM'],
    platforms: ['Windows', 'macOS', 'Linux', 'Cloud', 'Docker']
  }
];

export const getSkillById = (id: string): EnhancedSkillData | undefined => {
  return SKILL_DATA.find(skill => skill.id === id);
};

export const getSkillsByCategory = (category: SkillCategory): EnhancedSkillData[] => {
  return SKILL_DATA.filter(skill => skill.category === category);
};

export const getSkillsByCareerPath = (path: CareerPath): EnhancedSkillData[] => {
  return SKILL_DATA.filter(skill => skill.careerPaths.includes(path));
};

export const getTrendingSkills = (limit: number = 10): EnhancedSkillData[] => {
  return [...SKILL_DATA]
    .sort((a, b) => b.marketData.growthRate - a.marketData.growthRate)
    .slice(0, limit);
};

export const getHighDemandSkills = (minDemand: number = 90): EnhancedSkillData[] => {
  return SKILL_DATA.filter(skill => skill.marketData.demandIndex >= minDemand);
};

export const searchSkills = (query: string): EnhancedSkillData[] => {
  const lowerQuery = query.toLowerCase();
  return SKILL_DATA.filter(skill =>
    skill.name.toLowerCase().includes(lowerQuery) ||
    skill.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    skill.description.toLowerCase().includes(lowerQuery)
  );
};
