import { EnhancedSkillData, SkillCategory } from '@/types';

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

const createSkill = (
  id: string,
  name: string,
  category: SkillCategory,
  description: string,
  icon: string,
  iconColor: string,
  tags: string[],
  salaryRange: { junior: number; mid: number; senior: number; lead: number },
  demandIndex: number,
  difficultyToLearn: 1 | 2 | 3 | 4 | 5,
  relatedSkills: string[]
): EnhancedSkillData => ({
  id,
  name,
  slug: id,
  category,
  subcategory: category,
  proficiency: 'Intermediate',
  description,
  longDescription: description,
  icon,
  iconColor,
  tags,
  relatedSkills,
  prerequisites: [],
  dependencies: [],
  weight: { frontend: 0.5, backend: 0.5, fullstack: 0.5, datascience: 0.5, cybersecurity: 0.5, devops: 0.5, mobile: 0.5, ai_ml: 0.5, design: 0.5, product: 0.5, marketing: 0.5, management: 0.5 },
  marketData: {
    demandIndex,
    trend: 'rising',
    growthRate: 10,
    salaryRange,
    geographicDemand: generateGeographicDemand('Praha'),
    topCompanies: ['Various companies'],
    jobPostingsCount: Math.round(demandIndex * 20),
    competitionLevel: 'medium',
    difficultyToLearn,
    timeToProficiency: difficultyToLearn === 1 ? '1-3 months' : difficultyToLearn === 2 ? '3-6 months' : difficultyToLearn === 3 ? '6-12 months' : difficultyToLearn === 4 ? '12-18 months' : '18-24 months',
    industryAdoption: 70,
    automationRisk: 15,
    futureOutlook: 'excellent'
  },
  certifications: [],
  assessment: { type: 'quiz', questions: 30, duration: 30, passingScore: 70, topics: ['Core concepts', 'Best practices', 'Tools'] },
  resources: [],
  projects: [],
  careerPaths: ['frontend', 'backend', 'fullstack'],
  alternativeNames: [name],
  synonyms: [],
  languages: ['English', 'Czech'],
  tools: [],
  frameworks: [],
  platforms: ['All platforms']
});

export const COMPREHENSIVE_SKILL_DATA: EnhancedSkillData[] = [
  createSkill('python', 'Python', 'Programming', 'Versatile programming language for web, data, AI, and automation', '🐍', '#3776AB', ['programming', 'backend', 'data', 'ai'], { junior: 55000, mid: 85000, senior: 130000, lead: 180000 }, 95, 2, ['Data Science', 'Machine Learning', 'Django']),
  createSkill('javascript', 'JavaScript', 'Programming', 'Programming language for interactive web pages and full-stack development', '📜', '#F7DF1E', ['frontend', 'backend', 'web', 'interactive'], { junior: 55000, mid: 90000, senior: 140000, lead: 190000 }, 98, 2, ['TypeScript', 'React', 'Node.js']),
  createSkill('typescript', 'TypeScript', 'Programming', 'Typed superset of JavaScript for large-scale applications', '📘', '#3178C6', ['programming', 'javascript', 'typed'], { junior: 65000, mid: 100000, senior: 150000, lead: 200000 }, 94, 3, ['JavaScript', 'React', 'Node.js']),
  createSkill('react', 'React', 'Programming', 'JavaScript library for building user interfaces', '⚛️', '#61DAFB', ['frontend', 'javascript', 'ui', 'component'], { junior: 60000, mid: 95000, senior: 140000, lead: 190000 }, 98, 3, ['JavaScript', 'TypeScript', 'Redux']),
  createSkill('nodejs', 'Node.js', 'Programming', 'JavaScript runtime for server-side development', '🟢', '#339933', ['javascript', 'backend', 'runtime', 'server'], { junior: 55000, mid: 85000, senior: 130000, lead: 170000 }, 92, 2, ['JavaScript', 'Express', 'MongoDB']),
  createSkill('postgresql', 'PostgreSQL', 'Programming', 'Advanced open-source relational database system', '🐘', '#336791', ['database', 'sql', 'backend'], { junior: 50000, mid: 80000, senior: 120000, lead: 160000 }, 88, 3, ['SQL', 'Database Design', 'ORM']),
  createSkill('mongodb', 'MongoDB', 'Programming', 'Popular NoSQL database with flexible document model', '🍃', '#47A248', ['database', 'nosql', 'backend'], { junior: 50000, mid: 80000, senior: 120000, lead: 160000 }, 85, 2, ['Node.js', 'Express', 'Mongoose']),
  createSkill('docker', 'Docker', 'Programming', 'Platform for developing, shipping, and running applications in containers', '🐳', '#2496ED', ['devops', 'containers', 'deployment'], { junior: 60000, mid: 95000, senior: 140000, lead: 180000 }, 90, 2, ['Kubernetes', 'CI/CD', 'Linux']),
  createSkill('kubernetes', 'Kubernetes', 'Programming', 'Open-source container orchestration platform', '☸️', '#326CE5', ['devops', 'containers', 'orchestration'], { junior: 70000, mid: 110000, senior: 160000, lead: 220000 }, 92, 4, ['Docker', 'Cloud', 'Helm']),
  createSkill('aws', 'AWS', 'Programming', 'Amazon Web Services - comprehensive cloud computing platform', '☁️', '#FF9900', ['cloud', 'devops', 'infrastructure'], { junior: 70000, mid: 120000, senior: 180000, lead: 250000 }, 94, 4, ['Docker', 'Linux', 'Python']),
  createSkill('git', 'Git', 'Programming', 'Distributed version control system for tracking code changes', '🔀', '#F05032', ['version-control', 'collaboration'], { junior: 45000, mid: 70000, senior: 100000, lead: 130000 }, 99, 2, ['GitHub', 'CI/CD']),
  createSkill('machine-learning', 'Machine Learning', 'Data Science & AI', 'Field of AI that enables systems to learn from data', '🤖', '#FF6F00', ['ai', 'data', 'python', 'statistics'], { junior: 80000, mid: 130000, senior: 200000, lead: 300000 }, 96, 5, ['Python', 'Statistics', 'Deep Learning']),
  createSkill('cybersecurity', 'Cybersecurity', 'Cybersecurity', 'Practice of protecting systems and networks from digital attacks', '🛡️', '#00D4FF', ['security', 'networking', 'linux'], { junior: 60000, mid: 100000, senior: 150000, lead: 220000 }, 97, 5, ['Linux', 'Networking', 'Penetration Testing']),
  createSkill('sql', 'SQL', 'Programming', 'Standard language for managing relational databases', '🗄️', '#336791', ['database', 'sql', 'query'], { junior: 45000, mid: 75000, senior: 120000, lead: 160000 }, 92, 2, ['PostgreSQL', 'MySQL']),
  createSkill('devops', 'DevOps', 'Programming', 'Culture and practices combining development and operations', '🔄', '#FF5722', ['devops', 'ci-cd', 'automation'], { junior: 60000, mid: 100000, senior: 150000, lead: 200000 }, 90, 4, ['Docker', 'Kubernetes', 'AWS']),
  createSkill('project-management', 'Project Management', 'Management & Leadership', 'Planning, executing, and closing projects within scope, time, and budget', '📊', '#4CAF50', ['management', 'planning', 'agile'], { junior: 55000, mid: 85000, senior: 130000, lead: 180000 }, 88, 3, ['Agile', 'Scrum', 'Risk Management']),
  createSkill('agile-methodology', 'Agile Methodology', 'Management & Leadership', 'Iterative approach to project management and software development', '🔄', '#FF9800', ['agile', 'scrum', 'kanban'], { junior: 50000, mid: 80000, senior: 120000, lead: 160000 }, 90, 2, ['Project Management', 'Scrum']),
  createSkill('data-analysis', 'Data Analysis', 'Data & Analytics', 'Analyzing data to extract insights and support decision making', '📊', '#4CAF50', ['data', 'analysis', 'visualization'], { junior: 50000, mid: 80000, senior: 130000, lead: 180000 }, 90, 3, ['Excel', 'SQL', 'Python']),
  createSkill('excel', 'Excel', 'Data & Analytics', 'Microsoft Excel for data analysis, calculations, and visualization', '📈', '#217346', ['excel', 'spreadsheet', 'formulas'], { junior: 40000, mid: 65000, senior: 100000, lead: 150000 }, 85, 2, ['Data Analysis', 'Financial Modeling']),
  createSkill('renewable-energy', 'Renewable Energy', 'Green & Sustainability', 'Solar, wind, hydro, and other renewable energy technologies', '☀️', '#FFEB3B', ['solar', 'wind', 'clean-energy'], { junior: 45000, mid: 75000, senior: 120000, lead: 180000 }, 88, 4, ['Electrical Engineering', 'Environmental Science']),
  createSkill('esg', 'ESG', 'Green & Sustainability', 'Framework for evaluating corporate sustainability and ethical impact', '🌍', '#4CAF50', ['esg', 'sustainability', 'environment'], { junior: 50000, mid: 85000, senior: 140000, lead: 220000 }, 82, 3, ['Sustainability', 'Financial Analysis']),
  createSkill('team-leadership', 'Team Leadership', 'Management & Leadership', 'Guiding, motivating, and directing teams toward achieving goals', '👥', '#9C27B0', ['leadership', 'team', 'motivation'], { junior: 55000, mid: 90000, senior: 140000, lead: 200000 }, 82, 4, ['Communication', 'Emotional Intelligence']),
  createSkill('business-analysis', 'Business Analysis', 'Management & Leadership', 'Analyzing business needs and recommending solutions', '📈', '#009688', ['analysis', 'requirements', 'process'], { junior: 50000, mid: 80000, senior: 120000, lead: 160000 }, 85, 3, ['Data Analysis', 'Process Improvement']),
  createSkill('strategic-planning', 'Strategic Planning', 'Management & Leadership', 'Defining organizational strategy and creating plans to achieve business goals', '🎯', '#2196F3', ['strategy', 'planning', 'business'], { junior: 60000, mid: 100000, senior: 160000, lead: 250000 }, 75, 4, ['Business Analysis', 'Leadership']),
  createSkill('stakeholder-management', 'Stakeholder Management', 'Management & Leadership', 'Identifying and engaging individuals with interest in a project', '🤝', '#607D8B', ['stakeholders', 'communication'], { junior: 50000, mid: 80000, senior: 120000, lead: 170000 }, 78, 3, ['Communication', 'Negotiation']),
  createSkill('risk-management', 'Risk Management', 'Management & Leadership', 'Identifying, assessing, and controlling organizational threats', '⚠️', '#F44336', ['risk', 'mitigation', 'compliance'], { junior: 55000, mid: 90000, senior: 140000, lead: 200000 }, 80, 4, ['Project Management', 'Compliance']),
  createSkill('budgeting', 'Budgeting & Financial Planning', 'Management & Leadership', 'Creating and managing budgets to achieve financial objectives', '💰', '#4CAF50', ['budget', 'finance', 'planning'], { junior: 50000, mid: 85000, senior: 130000, lead: 180000 }, 78, 3, ['Financial Analysis', 'Excel']),
  createSkill('change-management', 'Change Management', 'Management & Leadership', 'Managing organizational change to achieve business goals', '🔀', '#795548', ['change', 'transformation', 'leadership'], { junior: 55000, mid: 90000, senior: 140000, lead: 200000 }, 72, 4, ['Leadership', 'Communication']),
  createSkill('coaching-mentoring', 'Coaching & Mentoring', 'Management & Leadership', 'Developing others through guidance, feedback, and support', '🌱', '#8BC34A', ['coaching', 'mentoring', 'development'], { junior: 45000, mid: 75000, senior: 110000, lead: 160000 }, 72, 3, ['Leadership', 'Communication']),
  createSkill('energy-efficiency', 'Energy Efficiency', 'Green & Sustainability', 'Reducing energy consumption while maintaining output', '💡', '#FFC107', ['energy', 'efficiency', 'optimization'], { junior: 45000, mid: 75000, senior: 120000, lead: 160000 }, 80, 3, ['Engineering', 'Building Systems']),
  createSkill('waste-management', 'Waste Management', 'Green & Sustainability', 'Collection, transportation, and disposal of waste responsibly', '🗑️', '#795548', ['waste', 'recycling', 'environment'], { junior: 40000, mid: 65000, senior: 100000, lead: 150000 }, 72, 3, ['Environmental Compliance', 'Logistics']),
  createSkill('environmental-compliance', 'Environmental Compliance', 'Green & Sustainability', 'Ensuring organizations meet environmental laws and regulations', '📋', '#607D8B', ['compliance', 'environment', 'regulations'], { junior: 45000, mid: 75000, senior: 120000, lead: 170000 }, 78, 4, ['Legal Knowledge', 'Auditing']),
  createSkill('carbon-management', 'Carbon Management', 'Green & Sustainability', 'Measuring, reducing, and managing carbon footprint', '🌿', '#8BC34A', ['carbon', 'emissions', 'climate'], { junior: 50000, mid: 85000, senior: 140000, lead: 200000 }, 85, 4, ['Data Analysis', 'Environmental Science']),
  createSkill('circular-economy', 'Circular Economy', 'Green & Sustainability', 'Economic system eliminating waste through reuse, repair, and recycling', '♻️', '#00BCD4', ['circular', 'recycle', 'sustainability'], { junior: 45000, mid: 75000, senior: 120000, lead: 170000 }, 75, 3, ['Sustainability', 'Supply Chain']),
  createSkill('sustainable-supply-chain', 'Sustainable Supply Chain', 'Green & Sustainability', 'Integrating environmental and social considerations into supply chain', '🔗', '#009688', ['supply chain', 'sustainability', 'procurement'], { junior: 50000, mid: 80000, senior: 130000, lead: 180000 }, 80, 3, ['Supply Chain Management', 'Sustainability']),
  createSkill('health-informatics', 'Health Informatics', 'Healthcare & Medical', 'Using IT to manage healthcare data and improve patient outcomes', '🏥', '#E91E63', ['healthcare', 'data', 'ehr'], { junior: 50000, mid: 85000, senior: 140000, lead: 200000 }, 88, 4, ['Data Analysis', 'Healthcare']),
  createSkill('patient-care', 'Patient Care', 'Healthcare & Medical', 'Providing direct care and support to patients in healthcare settings', '🤝', '#2196F3', ['patient', 'care', 'healthcare'], { junior: 35000, mid: 55000, senior: 85000, lead: 120000 }, 95, 4, ['Communication', 'Empathy']),
  createSkill('telemedicine', 'Telemedicine', 'Healthcare & Medical', 'Delivering healthcare remotely using telecommunications technology', '📹', '#9C27B0', ['telemedicine', 'remote', 'healthcare'], { junior: 45000, mid: 75000, senior: 120000, lead: 170000 }, 85, 2, ['Health Informatics', 'Communication']),
  createSkill('medical-billing', 'Medical Billing & Coding', 'Healthcare & Medical', 'Translating medical procedures into billing codes and processing claims', '💳', '#4CAF50', ['billing', 'coding', 'insurance'], { junior: 35000, mid: 55000, senior: 85000, lead: 120000 }, 80, 3, ['Healthcare Knowledge', 'Attention to Detail']),
  createSkill('cloud-architecture', 'Cloud Architecture', 'Cloud & DevOps', 'Designing and overseeing cloud computing strategies', '☁️', '#0078D4', ['cloud', 'architecture', 'design'], { junior: 70000, mid: 120000, senior: 180000, lead: 250000 }, 90, 4, ['AWS', 'Azure', 'Infrastructure']),
  createSkill('azure', 'Microsoft Azure', 'Cloud & DevOps', 'Microsoft cloud computing platform for building and managing applications', '☁️', '#0078D4', ['azure', 'cloud', 'microsoft'], { junior: 60000, mid: 100000, senior: 150000, lead: 200000 }, 88, 4, ['Cloud', 'DevOps', 'Microsoft']),
  createSkill('linux', 'Linux', 'Cloud & DevOps', 'Open-source operating system for servers and development', '🐧', '#FCC624', ['linux', 'server', 'bash'], { junior: 45000, mid: 75000, senior: 120000, lead: 170000 }, 92, 3, ['Bash', 'Server Administration']),
  createSkill('terraform', 'Terraform', 'Cloud & DevOps', 'Infrastructure as Code tool for building and managing cloud infrastructure', '🏗️', '#7B42BC', ['terraform', 'infrastructure', 'iac'], { junior: 60000, mid: 100000, senior: 150000, lead: 200000 }, 85, 3, ['AWS', 'Cloud', 'DevOps']),
  createSkill('powerbi', 'Power BI', 'Data & Analytics', 'Microsoft business analytics for interactive visualizations', '📊', '#F2C811', ['powerbi', 'bi', 'visualization'], { junior: 50000, mid: 80000, senior: 120000, lead: 170000 }, 82, 3, ['Data Analysis', 'SQL', 'Excel']),
  createSkill('tableau', 'Tableau', 'Data & Analytics', 'Data visualization software for business intelligence', '🗺️', '#E97627', ['tableau', 'bi', 'visualization'], { junior: 50000, mid: 85000, senior: 130000, lead: 180000 }, 80, 3, ['Data Analysis', 'SQL', 'Visual Design']),
  createSkill('statistics', 'Statistics', 'Data & Analytics', 'Mathematical methods for collecting, analyzing, and interpreting data', '📉', '#673AB7', ['statistics', 'math', 'probability'], { junior: 55000, mid: 90000, senior: 150000, lead: 220000 }, 75, 5, ['Data Analysis', 'Machine Learning']),
  createSkill('ui-ux-design', 'UI/UX Design', 'Design & Fashion', 'Creating user interfaces and experiences for digital products', '🎨', '#E91E63', ['design', 'ui', 'ux', 'figma'], { junior: 45000, mid: 75000, senior: 120000, lead: 180000 }, 88, 3, ['Figma', 'User Research', 'Prototyping']),
  createSkill('graphic-design', 'Graphic Design', 'Design & Fashion', 'Creating visual content for marketing and communication', '🎨', '#9C27B0', ['graphic', 'design', 'photoshop'], { junior: 40000, mid: 65000, senior: 100000, lead: 150000 }, 80, 3, ['Photoshop', 'Illustrator', 'Branding']),
  createSkill('product-design', 'Product Design', 'Design & Fashion', 'Designing physical products from concept to production', '📦', '#2196F3', ['product', 'design', 'cad'], { junior: 45000, mid: 80000, senior: 130000, lead: 200000 }, 75, 4, ['CAD', '3D Modeling', 'Prototyping']),
  createSkill('fashion-design', 'Fashion Design', 'Design & Fashion', 'Creating clothing and accessory designs', '👗', '#E91E63', ['fashion', 'design', 'apparel'], { junior: 35000, mid: 60000, senior: 100000, lead: 160000 }, 70, 4, ['Pattern Making', 'Textiles', 'Trend Analysis']),
  createSkill('digital-marketing', 'Digital Marketing', 'Marketing & PR', 'Marketing products and services using digital channels', '📱', '#4CAF50', ['marketing', 'digital', 'social media'], { junior: 40000, mid: 70000, senior: 110000, lead: 170000 }, 88, 2, ['SEO', 'Social Media', 'Analytics']),
  createSkill('content-marketing', 'Content Marketing', 'Marketing & PR', 'Creating and distributing valuable content to attract audiences', '✍️', '#FF9800', ['content', 'marketing', 'writing'], { junior: 40000, mid: 65000, senior: 100000, lead: 150000 }, 82, 2, ['Writing', 'SEO', 'Storytelling']),
  createSkill('seo', 'SEO', 'Marketing & PR', 'Optimizing websites to rank higher in search engines', '🔍', '#FFC107', ['seo', 'marketing', 'analytics'], { junior: 45000, mid: 75000, senior: 120000, lead: 180000 }, 85, 3, ['Analytics', 'Content', 'Technical']),
  createSkill('social-media', 'Social Media Marketing', 'Marketing & PR', 'Promoting products and services on social media platforms', '📱', '#E91E63', ['social media', 'marketing', 'content'], { junior: 40000, mid: 65000, senior: 100000, lead: 150000 }, 82, 2, ['Content Creation', 'Analytics', 'Community Management']),
  createSkill('public-relations', 'Public Relations', 'Marketing & PR', 'Managing spread of information between individuals and public', '📣', '#2196F3', ['pr', 'communications', 'media'], { junior: 40000, mid: 70000, senior: 110000, lead: 170000 }, 75, 3, ['Communication', 'Writing', 'Media Relations']),
  createSkill('recruiting', 'Recruiting', 'Human Resources', 'Finding and hiring qualified candidates for positions', '👥', '#4CAF50', ['recruiting', 'hr', 'talent'], { junior: 40000, mid: 70000, senior: 110000, lead: 170000 }, 82, 2, ['Interviewing', 'Sourcing', 'HRIS']),
  createSkill('hr-management', 'HR Management', 'Human Resources', 'Managing human resources functions and policies', '👤', '#607D8B', ['hr', 'management', 'people'], { junior: 45000, mid: 75000, senior: 120000, lead: 180000 }, 78, 3, ['Employment Law', 'HRIS', 'Performance Management']),
  createSkill('employee-relations', 'Employee Relations', 'Human Resources', 'Managing relationships between employer and employees', '🤝', '#795548', ['employee relations', 'hr', 'conflict'], { junior: 40000, mid: 70000, senior: 110000, lead: 160000 }, 72, 3, ['Conflict Resolution', 'Communication']),
  createSkill('training-development', 'Training & Development', 'Human Resources', 'Developing and delivering training programs for employees', '📚', '#2196F3', ['training', 'development', 'learning'], { junior: 40000, mid: 70000, senior: 110000, lead: 160000 }, 75, 3, ['Instructional Design', 'E-Learning', 'Coaching']),
  createSkill('compensation-benefits', 'Compensation & Benefits', 'Human Resources', 'Designing and administering employee compensation programs', '💰', '#4CAF50', ['compensation', 'benefits', 'hr'], { junior: 45000, mid: 80000, senior: 130000, lead: 190000 }, 70, 4, ['HRIS', 'Data Analysis', 'Employment Law']),
  createSkill('sales', 'Sales', 'Retail & Sales', 'Selling products and services to customers', '💼', '#4CAF50', ['sales', 'selling', 'business'], { junior: 40000, mid: 70000, senior: 120000, lead: 200000 }, 85, 2, ['Communication', 'Negotiation', 'CRM']),
  createSkill('retail-management', 'Retail Management', 'Retail & Sales', 'Managing retail store operations and staff', '🏪', '#795548', ['retail', 'management', 'sales'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 75, 3, ['Inventory Management', 'Customer Service', 'Leadership']),
  createSkill('customer-service', 'Customer Service', 'Retail & Sales', 'Assisting customers with inquiries and issues', '🎧', '#2196F3', ['customer service', 'support', 'communication'], { junior: 30000, mid: 50000, senior: 80000, lead: 120000 }, 82, 1, ['Communication', 'Problem Solving', 'Patience']),
  createSkill('e-commerce', 'E-commerce', 'Retail & Sales', 'Managing online sales and digital storefronts', '🛒', '#4CAF50', ['ecommerce', 'online', 'sales'], { junior: 45000, mid: 80000, senior: 130000, lead: 200000 }, 88, 3, ['Online Marketing', 'Analytics', 'Customer Experience']),
  createSkill('logistics', 'Logistics', 'Transportation & Logistics', 'Managing flow of goods from origin to consumption', '🚚', '#795548', ['logistics', 'supply chain', 'transportation'], { junior: 40000, mid: 70000, senior: 110000, lead: 170000 }, 78, 3, ['Supply Chain', 'Inventory Management', 'Transportation']),
  createSkill('supply-chain', 'Supply Chain Management', 'Transportation & Logistics', 'Managing flow of goods and services', '🔗', '#009688', ['supply chain', 'logistics', 'operations'], { junior: 45000, mid: 80000, senior: 130000, lead: 200000 }, 80, 3, ['Logistics', 'Procurement', 'Operations']),
  createSkill('transportation', 'Transportation', 'Transportation & Logistics', 'Moving people and goods from one location to another', '🚛', '#607D8B', ['transportation', 'driving', 'logistics'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 72, 2, ['CDL', 'Route Planning', 'Safety']),
  createSkill('warehouse', 'Warehouse Management', 'Transportation & Logistics', 'Managing warehouse operations and inventory', '📦', '#795548', ['warehouse', 'inventory', 'operations'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 75, 2, ['Inventory Management', 'Warehouse Systems']),
  createSkill('writing', 'Writing', 'Writing & Content', 'Creating written content for various purposes', '✍️', '#E91E63', ['writing', 'content', 'communication'], { junior: 35000, mid: 60000, senior: 100000, lead: 160000 }, 80, 2, ['Copywriting', 'Editing', 'SEO']),
  createSkill('copywriting', 'Copywriting', 'Writing & Content', 'Writing persuasive marketing and advertising copy', '📝', '#FF9800', ['copywriting', 'marketing', 'sales'], { junior: 40000, mid: 70000, senior: 120000, lead: 180000 }, 78, 2, ['Writing', 'Marketing', 'Persuasion']),
  createSkill('technical-writing', 'Technical Writing', 'Writing & Content', 'Creating technical documentation and manuals', '📘', '#2196F3', ['technical writing', 'documentation', 'technical'], { junior: 45000, mid: 75000, senior: 120000, lead: 170000 }, 75, 3, ['Technical Knowledge', 'Writing', 'Clarity']),
  createSkill('journalism', 'Journalism', 'Writing & Content', 'Gathering and reporting news and information', '📰', '#607D8B', ['journalism', 'news', 'reporting'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 70, 3, ['Writing', 'Research', 'Interviewing']),
  createSkill('content-strategy', 'Content Strategy', 'Writing & Content', 'Planning and managing content for business goals', '📋', '#4CAF50', ['content', 'strategy', 'marketing'], { junior: 45000, mid: 80000, senior: 130000, lead: 190000 }, 78, 3, ['Content Marketing', 'Analytics', 'Planning']),
  createSkill('education', 'Education', 'Science & Education', 'Teaching and facilitating learning', '📚', '#2196F3', ['education', 'teaching', 'training'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 82, 4, ['Teaching', 'Curriculum Development', 'Communication']),
  createSkill('e-learning', 'E-Learning Development', 'Science & Education', 'Creating online learning experiences', '💻', '#4CAF50', ['elearning', 'online', 'training'], { junior: 45000, mid: 80000, senior: 130000, lead: 180000 }, 78, 3, ['Instructional Design', 'E-Learning Tools', 'Content Creation']),
  createSkill('research', 'Research', 'Science & Education', 'Conducting systematic investigation and analysis', '🔬', '#607D8B', ['research', 'analysis', 'science'], { junior: 45000, mid: 80000, senior: 130000, lead: 200000 }, 75, 5, ['Analytical Skills', 'Methodology', 'Writing']),
  createSkill('science', 'Scientific Research', 'Science & Education', 'Conducting scientific experiments and studies', '🧪', '#2196F3', ['science', 'research', 'experiments'], { junior: 50000, mid: 90000, senior: 150000, lead: 220000 }, 72, 5, ['Laboratory Skills', 'Data Analysis', 'Scientific Method']),
  createSkill('physics', 'Physics', 'Science & Education', 'Understanding matter, energy, and their interactions', '⚛️', '#607D8B', ['physics', 'science', 'engineering'], { junior: 50000, mid: 90000, senior: 150000, lead: 220000 }, 70, 5, ['Mathematics', 'Analytical Skills', 'Problem Solving']),
  createSkill('chemistry', 'Chemistry', 'Science & Education', 'Studying matter and its transformations', '🧪', '#4CAF50', ['chemistry', 'science', 'laboratory'], { junior: 45000, mid: 85000, senior: 140000, lead: 200000 }, 68, 5, ['Laboratory Skills', 'Analytical Skills', 'Safety']),
  createSkill('biology', 'Biology', 'Science & Education', 'Studying living organisms and life processes', '🧬', '#4CAF50', ['biology', 'science', 'life'], { junior: 45000, mid: 85000, senior: 140000, lead: 200000 }, 68, 5, ['Laboratory Skills', 'Research', 'Scientific Method']),
  createSkill('electrical-engineering', 'Electrical Engineering', 'Science & Education', 'Designing and developing electrical systems', '⚡', '#FFC107', ['electrical', 'engineering', 'systems'], { junior: 50000, mid: 90000, senior: 150000, lead: 220000 }, 80, 4, ['Mathematics', 'Physics', 'Circuit Design']),
  createSkill('mechanical-engineering', 'Mechanical Engineering', 'Science & Education', 'Designing and manufacturing mechanical systems', '⚙️', '#607D8B', ['mechanical', 'engineering', 'design'], { junior: 50000, mid: 90000, senior: 150000, lead: 220000 }, 78, 4, ['CAD', 'Mathematics', 'Problem Solving']),
  createSkill('civil-engineering', 'Civil Engineering', 'Science & Education', 'Designing and overseeing infrastructure projects', '🏗️', '#795548', ['civil', 'engineering', 'construction'], { junior: 50000, mid: 90000, senior: 150000, lead: 220000 }, 75, 4, ['Structural Analysis', 'CAD', 'Project Management']),
  createSkill('law', 'Law', 'Legal & Compliance', 'Practicing law and providing legal advice', '⚖️', '#3F51B5', ['law', 'legal', 'compliance'], { junior: 45000, mid: 85000, senior: 150000, lead: 250000 }, 72, 5, ['Legal Research', 'Writing', 'Analytical Skills']),
  createSkill('compliance', 'Compliance', 'Legal & Compliance', 'Ensuring organizational adherence to laws and regulations', '📋', '#607D8B', ['compliance', 'legal', 'regulations'], { junior: 45000, mid: 80000, senior: 130000, lead: 190000 }, 78, 4, ['Legal Knowledge', 'Risk Management', 'Auditing']),
  createSkill('contract-management', 'Contract Management', 'Legal & Compliance', 'Managing contracts throughout their lifecycle', '📝', '#795548', ['contracts', 'legal', 'management'], { junior: 45000, mid: 80000, senior: 130000, lead: 180000 }, 72, 3, ['Legal Knowledge', 'Negotiation', 'Documentation']),
  createSkill('legal-advice', 'Legal Advice', 'Legal & Compliance', 'Providing legal guidance and counsel', '💼', '#3F51B5', ['legal', 'advice', 'counsel'], { junior: 50000, mid: 100000, senior: 180000, lead: 300000 }, 70, 5, ['Legal Knowledge', 'Analysis', 'Communication']),
  createSkill('security-safety', 'Security & Safety', 'Security & Safety', 'Ensuring physical and organizational security', '🔒', '#4CAF50', ['security', 'safety', 'protection'], { junior: 40000, mid: 70000, senior: 110000, lead: 160000 }, 78, 2, ['Security Systems', 'Risk Assessment', 'Emergency Procedures']),
  createSkill('occupational-safety', 'Occupational Safety', 'Security & Safety', 'Ensuring workplace safety and health', '🏥', '#4CAF50', ['safety', 'health', 'workplace'], { junior: 40000, mid: 70000, senior: 110000, lead: 160000 }, 75, 3, ['Safety Regulations', 'Risk Assessment', 'Training']),
  createSkill('quality-assurance', 'Quality Assurance', 'Quality Assurance', 'Ensuring products and services meet quality standards', '✅', '#4CAF50', ['quality', 'qa', 'testing'], { junior: 45000, mid: 80000, senior: 130000, lead: 180000 }, 82, 3, ['Testing', 'Process Improvement', 'Documentation']),
  createSkill('testing', 'Testing', 'Quality Assurance', 'Testing software and systems for defects', '🧪', '#607D8B', ['testing', 'qa', 'software'], { junior: 45000, mid: 80000, senior: 130000, lead: 180000 }, 80, 3, ['Test Planning', 'Automation', 'Bug Tracking']),
  createSkill('quality-control', 'Quality Control', 'Quality Assurance', 'Monitoring and controlling product quality', '📊', '#4CAF50', ['quality', 'control', 'inspection'], { junior: 40000, mid: 70000, senior: 110000, lead: 160000 }, 75, 2, ['Inspection', 'Statistical Process Control', 'Documentation']),
  createSkill('construction', 'Construction', 'Construction & Trades', 'Building structures and infrastructure', '🏗️', '#795548', ['construction', 'building', 'trades'], { junior: 40000, mid: 75000, senior: 120000, lead: 180000 }, 78, 3, ['Blueprint Reading', 'Safety', 'Project Management']),
  createSkill('carpentry', 'Carpentry', 'Construction & Trades', 'Working with wood to construct buildings', '🪚', '#8D6E63', ['carpentry', 'wood', 'construction'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 72, 3, ['Woodworking', 'Blueprint Reading', 'Safety']),
  createSkill('plumbing', 'Plumbing', 'Construction & Trades', 'Installing and maintaining pipe systems', '🔧', '#4CAF50', ['plumbing', 'pipes', 'installation'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 72, 3, ['Pipe Fitting', 'Blueprint Reading', 'Safety']),
  createSkill('electrical-work', 'Electrical Work', 'Construction & Trades', 'Installing and maintaining electrical systems', '⚡', '#FFC107', ['electrical', 'wiring', 'installation'], { junior: 40000, mid: 70000, senior: 110000, lead: 160000 }, 75, 3, ['Electrical Systems', 'Blueprint Reading', 'Safety']),
  createSkill('hvac', 'HVAC', 'Construction & Trades', 'Heating, ventilation, and air conditioning systems', '❄️', '#4682B4', ['hvac', 'heating', 'cooling'], { junior: 40000, mid: 70000, senior: 110000, lead: 160000 }, 72, 3, ['Refrigeration', 'Ductwork', 'Controls']),
  createSkill('welding', 'Welding', 'Construction & Trades', 'Joining metal parts using heat', '🔥', '#FF5722', ['welding', 'metal', 'fabrication'], { junior: 40000, mid: 75000, senior: 120000, lead: 170000 }, 70, 3, ['Welding Processes', 'Blueprint Reading', 'Safety']),
  createSkill('painting', 'Painting', 'Construction & Trades', 'Applying paint and coatings to surfaces', '🎨', '#4CAF50', ['painting', 'coatings', 'finishing'], { junior: 30000, mid: 50000, senior: 80000, lead: 120000 }, 68, 2, ['Surface Preparation', 'Color Mixing', 'Safety']),
  createSkill('masonry', 'Masonry', 'Construction & Trades', 'Working with brick, stone, and concrete', '🧱', '#795548', ['masonry', 'brick', 'concrete'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 68, 3, ['Mortar Mixing', 'Blueprint Reading', 'Safety']),
  createSkill('roofing', 'Roofing', 'Construction & Trades', 'Installing and repairing roofs', '🏠', '#795548', ['roofing', 'installation', 'repair'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 65, 3, ['Materials Knowledge', 'Safety', 'Weatherproofing']),
  createSkill('landscaping', 'Landscaping', 'Construction & Trades', 'Designing and maintaining outdoor spaces', '🌳', '#4CAF50', ['landscaping', 'gardening', 'design'], { junior: 30000, mid: 55000, senior: 90000, lead: 140000 }, 68, 2, ['Plant Knowledge', 'Design', 'Maintenance']),
  createSkill('agriculture', 'Agriculture', 'Agriculture & Environment', 'Farming and crop production', '🌾', '#4CAF50', ['agriculture', 'farming', 'crops'], { junior: 30000, mid: 55000, senior: 90000, lead: 140000 }, 65, 3, ['Crop Management', 'Soil Science', 'Machinery']),
  createSkill('farming', 'Farming', 'Agriculture & Environment', 'Operating farms and managing agricultural production', '🚜', '#4CAF50', ['farming', 'agriculture', 'production'], { junior: 30000, mid: 55000, senior: 90000, lead: 140000 }, 62, 3, ['Machinery Operation', 'Crop Management', 'Livestock']),
  createSkill('horticulture', 'Horticulture', 'Agriculture & Environment', 'Growing plants for food and decoration', '🌻', '#8BC34A', ['horticulture', 'plants', 'gardening'], { junior: 30000, mid: 55000, senior: 90000, lead: 140000 }, 68, 2, ['Plant Science', 'Greenhouse Management', 'Pest Control']),
  createSkill('animal-husbandry', 'Animal Husbandry', 'Agriculture & Environment', 'Breeding and caring for farm animals', '🐄', '#795548', ['animals', 'livestock', 'farming'], { junior: 30000, mid: 55000, senior: 90000, lead: 140000 }, 62, 3, ['Animal Care', 'Breeding', 'Health Management']),
  createSkill('forestry', 'Forestry', 'Agriculture & Environment', 'Managing and conserving forests', '🌲', '#2E7D32', ['forestry', 'conservation', 'timber'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 60, 4, ['Tree Identification', 'Ecology', 'Timber Management']),
  createSkill('environmental-science', 'Environmental Science', 'Agriculture & Environment', 'Studying environmental systems and processes', '🌍', '#4CAF50', ['environment', 'science', 'conservation'], { junior: 40000, mid: 70000, senior: 120000, lead: 180000 }, 72, 4, ['Ecology', 'Data Analysis', 'Research']),
  createSkill('wildlife', 'Wildlife Management', 'Agriculture & Environment', 'Managing and conserving wildlife populations', '🦌', '#8BC34A', ['wildlife', 'conservation', 'management'], { junior: 35000, mid: 65000, senior: 110000, lead: 160000 }, 58, 4, ['Ecology', 'Field Research', 'Population Management']),
  createSkill('food-production', 'Food Production', 'Agriculture & Environment', 'Manufacturing food products', '🍲', '#FF9800', ['food', 'production', 'manufacturing'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 70, 3, ['Food Safety', 'Production Management', 'Quality Control']),
  createSkill('cooking', 'Cooking', 'Cooking & Preserving', 'Preparing and cooking food', '👨‍🍳', '#FF5722', ['cooking', 'culinary', 'food'], { junior: 30000, mid: 55000, senior: 90000, lead: 140000 }, 75, 2, ['Culinary Techniques', 'Food Safety', 'Menu Planning']),
  createSkill('baking', 'Baking', 'Cooking & Preserving', 'Baking bread, pastries, and desserts', '🍞', '#D2691E', ['baking', 'pastry', 'bread'], { junior: 30000, mid: 55000, senior: 90000, lead: 140000 }, 72, 2, ['Baking Techniques', 'Recipe Development', 'Food Safety']),
  createSkill('food-preservation', 'Food Preservation', 'Cooking & Preserving', 'Preserving food for long-term storage', '🫙', '#8D6E63', ['preserving', 'canning', 'fermentation'], { junior: 28000, mid: 50000, senior: 80000, lead: 120000 }, 65, 2, ['Canning', 'Fermentation', 'Food Safety']),
  createSkill('hospitality', 'Hospitality', 'Hospitality & Tourism', 'Providing services to hotel and restaurant guests', '🏨', '#4CAF50', ['hospitality', 'hotels', 'service'], { junior: 30000, mid: 55000, senior: 90000, lead: 140000 }, 78, 2, ['Customer Service', 'Communication', 'Operations']),
  createSkill('tourism', 'Tourism', 'Hospitality & Tourism', 'Managing and promoting travel experiences', '✈️', '#2196F3', ['tourism', 'travel', 'hospitality'], { junior: 35000, mid: 65000, senior: 110000, lead: 170000 }, 75, 2, ['Customer Service', 'Marketing', 'Operations']),
  createSkill('event-management', 'Event Management', 'Hospitality & Tourism', 'Planning and executing events', '🎪', '#9C27B0', ['events', 'planning', 'coordination'], { junior: 35000, mid: 65000, senior: 110000, lead: 170000 }, 72, 3, ['Planning', 'Vendor Management', 'Budgeting']),
  createSkill('travel-agency', 'Travel Agency', 'Hospitality & Tourism', 'Booking and arranging travel for clients', '🧳', '#607D8B', ['travel', 'booking', 'arrangements'], { junior: 32000, mid: 58000, senior: 95000, lead: 150000 }, 68, 2, ['Booking Systems', 'Customer Service', 'Geography']),

  createSkill('cnc-turning', 'Soustružení', 'CNC & Engineering', 'Obrábění rotačních dílů na soustruhu', '⚙️', '#607D8B', ['cnc', 'turning', 'rotating', 'precision'], { junior: 35000, mid: 60000, senior: 95000, lead: 140000 }, 85, 3, ['CNC Programming', 'Tool Selection', 'Workholding']),
  createSkill('cnc-milling', 'Frézování', 'CNC & Engineering', 'Obrábění pomocí rotačního nástroje', '🔩', '#757575', ['cnc', 'milling', 'cutting', '3d'], { junior: 35000, mid: 60000, senior: 95000, lead: 140000 }, 88, 3, ['CNC Programming', 'Toolpath', 'Workholding']),
  createSkill('cnc-drilling', 'Vrtání', 'CNC & Engineering', 'Vytváření otvorů v materiálu', '🔧', '#9E9E9E', ['cnc', 'drilling', 'holes', 'precision'], { junior: 32000, mid: 55000, senior: 90000, lead: 130000 }, 80, 2, ['Drill Bits', 'Coolant', 'Chip Evacuation']),
  createSkill('cnc-grinding', 'Broušení', 'CNC & Engineering', 'Povrchové obrábění a dokončování', '✨', '#BDBDBD', ['cnc', 'grinding', 'surface', 'finishing'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 75, 4, ['Abrasives', 'Wheel Dressing', 'Coolant']),
  createSkill('cnc-planing', 'Hoblování', 'CNC & Engineering', 'Ploché obrábění rovinných ploch', '📐', '#795548', ['cnc', 'planing', 'surface', 'precision'], { junior: 33000, mid: 55000, senior: 85000, lead: 120000 }, 65, 3, ['Cutting Tools', 'Feed Rate', 'Surface Finish']),
  createSkill('cnc-brochining', 'Protahování', 'CNC & Engineering', 'Vnitřní obrábění pomocí protahovacího nástroje', '🔱', '#FF5722', ['cnc', 'broaching', 'internal', 'keyways'], { junior: 35000, mid: 60000, senior: 90000, lead: 130000 }, 70, 3, ['Broach Design', 'Pull Force', 'Surface Finish']),
  createSkill('cnc-stamping', 'Ražení', 'CNC & Engineering', 'Tvarování plechů pomocí razicích nástrojů', '🔨', '#795548', ['cnc', 'stamping', 'sheet metal', 'forming'], { junior: 32000, mid: 55000, senior: 85000, lead: 120000 }, 72, 2, ['Die Design', 'Strip Layout', 'Press Tonnage']),
  createSkill('cnc-pressing', 'Lisování', 'CNC & Engineering', 'Tvarování materiálů pomocí lisů', '🏗️', '#9E9E9E', ['cnc', 'pressing', 'forming', 'hydraulic'], { junior: 33000, mid: 55000, senior: 90000, lead: 130000 }, 75, 3, ['Press Selection', 'Die Design', 'Force Calculation']),
  createSkill('cnc-welding', 'Svařování', 'CNC & Engineering', 'Spojování kovů pomocí tepla', '🔥', '#F44336', ['cnc', 'welding', 'joining', 'metals'], { junior: 35000, mid: 65000, senior: 105000, lead: 160000 }, 82, 3, ['MIG/MAG', 'TIG', 'Welding Codes']),
  createSkill('cnc-soldering', 'Pájení', 'CNC & Engineering', 'Spojování kovů pomocí taviva a pájky', '⛓️', '#4CAF50', ['cnc', 'soldering', 'electronics', 'joining'], { junior: 30000, mid: 50000, senior: 80000, lead: 120000 }, 70, 2, ['Solder Types', 'Temperature Control', 'Flux']),
  createSkill('cnc-edm', 'Elektroerozivní obrábění', 'CNC & Engineering', 'Obrábění pomocí elektrických výbojů', '⚡', '#00BCD4', ['cnc', 'edm', 'spark erosion', 'precision'], { junior: 40000, mid: 70000, senior: 110000, lead: 170000 }, 65, 5, ['Wire EDM', 'Die Sinking', 'Dielectric']),
  createSkill('cnc-laser', 'Laserové obrábění', 'CNC & Engineering', 'Řezání a gravírování laserem', '🔴', '#E91E63', ['cnc', 'laser', 'cutting', 'engraving'], { junior: 35000, mid: 60000, senior: 95000, lead: 140000 }, 72, 3, ['Laser Types', 'Focus Control', 'Safety']),
  createSkill('cnc-waterjet', 'Waterjet řezání', 'CNC & Engineering', 'Řezání vysokotlakým proudem vody', '💧', '#2196F3', ['cnc', 'waterjet', 'cutting', 'abrasive'], { junior: 35000, mid: 60000, senior: 95000, lead: 140000 }, 68, 3, ['Abrasive Mix', 'Pressure', 'Nozzle Design']),
  createSkill('cnc-3dprint', '3D Tisk kovů', 'CNC & Engineering', 'Aditivní výroba kovových dílů', '🖨️', '#9C27B0', ['cnc', '3d printing', 'additive', 'metals'], { junior: 40000, mid: 70000, senior: 120000, lead: 180000 }, 75, 4, ['SLM', 'DMLS', 'Post Processing']),
  createSkill('cnc-casting', 'Lití kovů', 'CNC & Engineering', 'Výroba dílů litím roztaveného kovu', '🌡️', '#FF5722', ['cnc', 'casting', 'foundry', 'metals'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 70, 3, ['Mold Design', 'Melting', 'Pouring']),
  createSkill('cnc-programming', 'CNC Programování', 'CNC & Engineering', 'Tvorba NC programů pro CNC stroje', '📟', '#607D8B', ['cnc', 'programming', 'g-code', 'cam'], { junior: 40000, mid: 70000, senior: 110000, lead: 170000 }, 90, 4, ['G-Code', 'CAM Software', 'Toolpath']),
  createSkill('cnc-fanuc', 'Fanuc Programování', 'CNC & Engineering', 'Programování řídicích systémů Fanuc', '🔲', '#009688', ['cnc', 'fanuc', 'programming', 'controls'], { junior: 45000, mid: 80000, senior: 130000, lead: 200000 }, 78, 4, ['Macro B', 'Custom Cycles', 'Parameters']),
  createSkill('cnc-siemens', 'Siemens Programování', 'CNC & Engineering', 'Programování řídicích systémů Siemens', '🔳', '#3F51B5', ['cnc', 'siemens', 'programming', 'sinumerik'], { junior: 45000, mid: 80000, senior: 130000, lead: 200000 }, 75, 4, ['ShopTurn', 'ShopMill', 'Cycles']),
  createSkill('cnc-measuring', 'Měření a kontrola', 'CNC & Engineering', 'Měření a kontrola rozměrů obrobků', '📏', '#795548', ['cnc', 'measuring', 'quality', 'inspection'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 85, 3, ['CMM', 'Hand Tools', 'GD&T']),
  createSkill('cnc-tolerancing', 'Geometrická tolerování', 'CNC & Engineering', 'Specifikace geometrických tolerancí', '📐', '#9E9E9E', ['cnc', 'tolerancing', 'gd&t', 'precision'], { junior: 40000, mid: 70000, senior: 115000, lead: 180000 }, 72, 4, ['GD&T', 'GD&T Symbols', 'Bonus Tolerance']),
  createSkill('cnc-quality', 'Řízení kvality', 'CNC & Engineering', 'Systémy řízení kvality ve výrobě', '✅', '#4CAF50', ['cnc', 'quality', 'qa', 'qc'], { junior: 35000, mid: 65000, senior: 110000, lead: 170000 }, 82, 3, ['ISO 9001', 'Statistical Process', 'Six Sigma']),
  createSkill('cnc-toolholding', 'Upínání nástrojů', 'CNC & Engineering', 'Upínání a seřizování nástrojů', '🔩', '#607D8B', ['cnc', 'toolholding', 'presetting', 'holders'], { junior: 32000, mid: 55000, senior: 90000, lead: 130000 }, 78, 2, ['Tool Holders', 'Presetters', 'Runout']),
  createSkill('cnc-workholding', 'Upínání obrobků', 'CNC & Engineering', 'Upínání obrobků na stroje', '🗜️', '#8D6E63', ['cnc', 'workholding', 'fixtures', 'jigs'], { junior: 32000, mid: 55000, senior: 90000, lead: 130000 }, 80, 3, ['Vices', 'Fixtures', 'Chucks']),
  createSkill('cnc-cad', 'CAD pro výrobu', 'CNC & Engineering', 'Tvorba 3D modelů pro výrobu', '📐', '#2196F3', ['cnc', 'cad', '3d modeling', 'design'], { junior: 35000, mid: 65000, senior: 110000, lead: 170000 }, 85, 3, ['SolidWorks', 'Fusion 360', 'Inventor']),
  createSkill('cnc-cam', 'CAM pro CNC', 'CNC & Engineering', 'Tvorba drah nástrojů v CAM', '💻', '#009688', ['cnc', 'cam', 'toolpath', 'postprocessing'], { junior: 38000, mid: 70000, senior: 115000, lead: 180000 }, 88, 4, ['Mastercam', 'PowerMILL', 'HyperMILL']),
  createSkill('cnc-documentation', 'Technická dokumentace', 'CNC & Engineering', 'Tvorba technické dokumentace pro CNC výrobu', '📄', '#6C757D', ['cnc', 'documentation', 'technical', ' manuals'], { junior: 30000, mid: 50000, senior: 85000, lead: 130000 }, 75, 2, ['Technical Writing', 'Drawings', 'Standards']),
  createSkill('cnc-drawings', 'Výkresová dokumentace', 'CNC & Engineering', 'Čtení a tvorba technických výkresů', '📜', '#495057', ['cnc', 'drawings', 'technical', ' blueprints'], { junior: 32000, mid: 55000, senior: 90000, lead: 140000 }, 82, 3, ['GD&T', 'Blueprint Reading', 'CAD']),
  createSkill('nc-program-docs', 'NC Program dokumentace', 'CNC & Engineering', 'Dokumentace a archivace NC programů', '💾', '#343a40', ['cnc', 'nc', 'documentation', 'archive'], { junior: 28000, mid: 48000, senior: 80000, lead: 120000 }, 68, 2, ['Version Control', 'Program Management', 'Data Organization']),
  createSkill('cnc-iso-norms', 'ISO Normy pro CNC', 'CNC & Engineering', 'Znalost a aplikace ISO norem ve výrobě', '📋', '#20C997', ['cnc', 'iso', 'standards', 'quality'], { junior: 35000, mid: 60000, senior: 100000, lead: 150000 }, 72, 3, ['ISO 9001', 'ISO 2768', 'ASME Y14.5']),
  createSkill('cnc-work-instructions', 'Pracovní postupy', 'CNC & Engineering', 'Tvorba pracovních instrukcí a návodek', '📝', '#0DCAF0', ['cnc', 'work instructions', 'procedures', 'safety'], { junior: 30000, mid: 50000, senior: 85000, lead: 130000 }, 70, 2, ['Process Documentation', 'Safety Regulations', 'Training']),
];

export const getSkillById = (id: string): EnhancedSkillData | undefined => {
  return COMPREHENSIVE_SKILL_DATA.find(skill => skill.id === id);
};

export const getSkillsByCategory = (category: SkillCategory): EnhancedSkillData[] => {
  return COMPREHENSIVE_SKILL_DATA.filter(skill => skill.category === category);
};

export const getTopSkills = (limit: number = 50): EnhancedSkillData[] => {
  return [...COMPREHENSIVE_SKILL_DATA]
    .sort((a, b) => b.marketData.demandIndex - a.marketData.demandIndex)
    .slice(0, limit);
};

export const searchSkills = (query: string): EnhancedSkillData[] => {
  const lowerQuery = query.toLowerCase();
  return COMPREHENSIVE_SKILL_DATA.filter(skill =>
    skill.name.toLowerCase().includes(lowerQuery) ||
    skill.description.toLowerCase().includes(lowerQuery) ||
    skill.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const CNC_FACTS = [
  {
    id: 'cnc-fact-1',
    text: '💡 Věděli jste? První CNC stroj byl vytvořen v 50. letech 20. století pro americké letectvo. Soustružení dokáže dosáhnout přesnosti až 0.001mm!',
    position: 5
  },
  {
    id: 'cnc-fact-2',
    text: '💡 Věděli jste? Nejpřesnější CNC frézky dosahují tolerance ±0.005mm. Průměrná životnost CNC nástroje je 15-30 minut nepřetržitého provozu!',
    position: 10
  },
  {
    id: 'cnc-fact-3',
    text: '💡 Věděli jste? Největší CNC stroj na světě má pracovní plochu 20x10 metrů. Dokáže vyrobit celé letadlové křídlo jednoho kusu!',
    position: 15
  },
  {
    id: 'cnc-fact-4',
    text: '💡 Věděli jste? Průměrný CNC program pro složitý díl obsahuje 5000-10000 řádků kódu. Jeden překlep může zničit nástroj za 5000 Kč!',
    position: 20
  },
  {
    id: 'cnc-fact-5',
    text: '💡 Věděli jste? Moderní CNC stroje dokáží obrábět 5 os současně. Nejdražší nástroje stojí i 50 000 Kč a vydrží jen pár hodin!',
    position: 25
  }
];
