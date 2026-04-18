import { SKILL_TEMPLATES } from '@/components/EducationSection';
import { JOB_TEMPLATES } from '@/components/WorkSection';
import { Course } from '@/types';

// Dynamically collect all career paths and job titles from templates
export const getAllCareerGoals = () => {
  // Collect all career paths from skill templates
  const allCareerPaths = new Set<string>();
  SKILL_TEMPLATES.forEach((template: any) => {
    if (template.careerPaths) {
      template.careerPaths.forEach((path: string) => allCareerPaths.add(path));
    }
  });

  // Collect all job titles from job templates
  const allJobTitles = new Set<string>();
  JOB_TEMPLATES.forEach((job: any) => {
    if (job.title) {
      allJobTitles.add(job.title);
    }
  });

  // Combine and sort
  const allGoals = new Set([...allCareerPaths, ...allJobTitles]);
  return Array.from(allGoals).sort();
};

// Career paths grouped by industries
export const CAREER_PATHS_BY_INDUSTRY = {
  // Existing from templates
  ...(() => {
    const existing = getAllCareerGoals();
    return {
      "Programming & Technology": existing.filter(goal =>
        goal.includes("Developer") || goal.includes("Engineer") || goal.includes("Programmer") ||
        goal.includes("Designer") || goal.includes("Analyst") || goal.includes("Architect") ||
        goal.includes("Scientist") || goal.includes("Specialist")
      ),
      "3D & Game Development": existing.filter(goal =>
        goal.includes("3D") || goal.includes("Game") || goal.includes("Unity") || goal.includes("Unreal") ||
        goal.includes("Artist") || goal.includes("Animator")
      ),
      "CNC & Manufacturing": existing.filter(goal =>
        goal.includes("CNC") || goal.includes("Manufacturing") || goal.includes("Production") ||
        goal.includes("Quality") || goal.includes("Control")
      ),
      "Data Science & AI": existing.filter(goal =>
        goal.includes("Data") || goal.includes("AI") || goal.includes("Machine Learning") ||
        goal.includes("Analytics") || goal.includes("Scientist")
      )
    };
  })(),

  // Automotive & Mobility - Comprehensive career paths
  "Automotive & Mobility": [
    "Auto Mechanic", "Master Technician", "Service Advisor", "Service Manager",
    "Quick Lube Technician", "Express Service Technician", "Fleet Service Technician",
    "Maintenance Technician", "Pre-Delivery Inspector", "Used Car Inspector",
    "Brake Specialist", "Transmission Technician", "Engine Builder", "Diesel Mechanic",
    "Electrical Specialist", "HVAC Technician", "Suspension & Steering Tech",
    "Tire Technician", "Alignment Specialist", "Wheel & Tire Manager",
    "Diagnostic Technician", "Technical Service Representative", "Shop Foreman",
    "Warranty Administrator", "Quality Control Inspector", "Technical Trainer",
    "ASE Certified Technician", "Master Auto Technician", "Line Technician",
    "Body Technician", "Collision Repair Technician", "Frame Specialist",
    "Auto Body Painter", "Paint Technician", "Detailer", "Glass Technician",
    "ADCalibration Specialist", "Dent Removal Specialist", "Body Shop Manager",
    "Performance Tuner", "Engine Tuner", "Dyno Operator", "Turbo Installer",
    "Exhaust Specialist", "Suspension Tuning Specialist", "Car Audio Installer",
    "Custom Shop Technician", "Race Car Mechanic", "Motorsports Technician",
    "EV Technician", "Hybrid Vehicle Specialist", "High Voltage Technician",
    "Battery System Specialist", "Charging Station Installer", "EV Shop Manager",
    "Battery Engineer", "Electric Motor Specialist", "EV Diagnostic Technician",
    "Automotive Salesperson", "Sales Manager", "Finance Manager", "Leasing Consultant",
    "Vehicle Inventory Manager", "Sales Director", "Fleet Sales Representative",
    "Parts Advisor", "Parts Manager", "Parts Counterperson",
    "Service Director", "Parts Director", "General Manager", "Dealer Principal",
    "Operations Manager", "Business Development Manager", "Customer Relations Manager",
    "Fixed Operations Director", "Aftermarket Sales Manager",
    "Automotive Engineer", "Design Engineer", "Test Engineer", "Validation Engineer",
    "Manufacturing Engineer", "Quality Engineer", "Reliability Engineer",
    "Powertrain Engineer", "Chassis Engineer", "NVH Engineer",
    "R&D Engineer", "Product Development Engineer", "Research Scientist",
    "Materials Engineer", "Aerodynamics Engineer", "Thermal Engineer",
    "Systems Integration Engineer", "Controls Engineer", "Software Engineer (Automotive)",
    "Autonomous Vehicle Engineer", "ADAS Calibration Specialist", "Sensor Engineer",
    "Connected Car Engineer", "Automotive Cybersecurity Specialist", "Machine Learning Engineer",
    "Vehicle-to-Everything (V2X) Engineer", "Fleet Management Specialist",
    "Telematics Engineer", "Automotive UI/UX Designer",
    "Truck Mechanic", "Heavy Equipment Mechanic", "Diesel Technician",
    "Fleet Maintenance Manager", "Equipment Manager", "Transportation Manager",
    "Logistics Coordinator", "Yard Manager", "Trailer Technician",
    "Motorcycle Mechanic", "ATV Technician", "Snowmobile Mechanic",
    "Powersports Sales", "Motorcycle Detailer", "Motorcycle Customizer",
    "Riding Instructor", "Motocross Mechanic", "Scooter Technician",
    "Recycling Specialist", "Scrap Yard Operator", "Vehicle Appraiser",
    "Classic Car Restorer", "Collector Car Specialist", "Automotive Journalist",
    "Motorsports Engineer", "Race Engineer", "Data Acquisition Specialist"
  ],

  "Healthcare & Medical": [
    "Doctor/Physician", "Nurse", "Pharmacist", "Dentist", "Physical Therapist", "Radiologist",
    "Surgeon", "Medical Laboratory Scientist", "Registered Nurse", "Nurse Practitioner",
    "Physician Assistant", "Paramedic", "Emergency Medical Technician", "Medical Assistant",
    "Dental Hygienist", "Occupational Therapist", "Speech-Language Pathologist",
    "Dietitian/Nutritionist", "Biomedical Engineer", "Healthcare Administrator", "Medical Researcher",
    "Clinical Psychologist", "Psychiatrist", "Therapist/Counselor", "Massage Therapist",
    "Chiropractor", "Optometrist", "Podiatrist", "Genetic Counselor"
  ],

  "Education & Teaching": [
    "Teacher", "Professor", "Principal", "School Counselor", "Librarian", "Special Education Teacher",
    "Preschool Teacher", "High School Teacher", "College Professor", "University Lecturer",
    "Education Administrator", "Curriculum Developer", "Educational Psychologist", "School Psychologist",
    "ESL Teacher", "Music Teacher", "Art Teacher", "PE Teacher", "Science Teacher", "Math Teacher",
    "History Teacher", "Language Teacher", "Tutor", "Instructional Designer", "Education Consultant"
  ],

  "Finance & Banking": [
    "Banker", "Financial Advisor", "Investment Banker", "Stockbroker", "Financial Analyst",
    "Accountant", "CPA", "Auditor", "Financial Planner", "Credit Analyst", "Loan Officer",
    "Mortgage Broker", "Insurance Agent", "Actuary", "Risk Manager", "Financial Manager",
    "Treasury Analyst", "Corporate Finance", "Personal Banker", "Branch Manager", "Wealth Manager",
    "Financial Consultant", "Budget Analyst", "Tax Advisor", "Financial Controller"
  ],

  "Marketing & Sales": [
    "Marketing Manager", "Brand Manager", "Digital Marketing Specialist", "SEO Specialist",
    "Content Marketing Manager", "Social Media Manager", "Advertising Account Executive",
    "Marketing Coordinator", "Public Relations Specialist", "Copywriter", "Creative Director",
    "Art Director", "Graphic Designer", "Marketing Analyst", "Market Research Analyst",
    "Brand Strategist", "Event Planner", "Media Buyer", "Influencer Marketing Manager",
    "Email Marketing Specialist", "Marketing Automation Specialist", "Growth Hacker",
    "Sales Representative", "Sales Manager", "Business Development Manager", "Account Executive",
    "Sales Consultant", "Retail Sales Associate", "Outside Sales Representative",
    "Inside Sales Representative", "Sales Engineer", "Key Account Manager", "Territory Sales Manager",
    "Channel Sales Manager", "Sales Director", "Sales Trainer", "Sales Analyst",
    "Customer Success Manager", "Account Manager", "Relationship Manager", "Sales Operations Manager"
  ],

  "Hospitality & Tourism": [
    "Hotel Manager", "Restaurant Manager", "Chef", "Sous Chef", "Bartender", "Waiter/Waitress",
    "Hotel Receptionist", "Concierge", "Tour Guide", "Travel Agent", "Event Coordinator",
    "Catering Manager", "Spa Manager", "Resort Manager", "Cruise Director", "Airport Manager",
    "Housekeeper", "Bellhop", "Sommelier", "Pastry Chef", "Line Cook", "Food Service Manager"
  ],

  "Construction & Architecture": [
    "Architect", "Civil Engineer", "Structural Engineer", "Construction Manager", "Project Manager",
    "Site Supervisor", "Quantity Surveyor", "Building Inspector", "Real Estate Developer",
    "Urban Planner", "Landscape Architect", "Interior Designer", "Construction Worker",
    "Electrician", "Plumber", "Carpenter", "Mason", "Painter", "Roofing Contractor",
    "Demolition Expert", "Surveyor", "Estimator"
  ],

  "Logistics & Transportation": [
    "Logistics Manager", "Supply Chain Manager", "Transportation Manager", "Fleet Manager",
    "Warehouse Manager", "Shipping Coordinator", "Import/Export Specialist", "Truck Driver",
    "Delivery Driver", "Courier", "Airport Operations Manager", "Railway Engineer", "Pilot",
    "Flight Attendant", "Air Traffic Controller", "Port Manager", "Freight Forwarder",
    "Inventory Manager", "Distribution Manager", "Traffic Manager"
  ],

  "Legal": [
    "Lawyer", "Attorney", "Judge", "Paralegal", "Legal Assistant", "Corporate Lawyer",
    "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Tax Lawyer", "Environmental Lawyer",
    "Intellectual Property Lawyer", "Litigator", "Legal Consultant", "Compliance Officer",
    "Contract Manager", "Legal Secretary", "Court Reporter", "Mediator", "Arbitrator", "Legal Researcher"
  ],

  "HR & Recruitment": [
    "HR Manager", "Recruiter", "Talent Acquisition Specialist", "HR Business Partner",
    "Training Manager", "Employee Relations Specialist", "Compensation Analyst",
    "Benefits Administrator", "HR Coordinator", "Organizational Development Specialist",
    "Diversity & Inclusion Manager", "HR Consultant", "Payroll Administrator",
    "Labor Relations Specialist", "Talent Management Specialist", "HR Analyst",
    "Recruitment Coordinator", "Onboarding Specialist"
  ],

  "Real Estate": [
    "Real Estate Agent", "Property Manager", "Real Estate Broker", "Appraiser",
    "Real Estate Developer", "Leasing Agent", "Commercial Real Estate Agent",
    "Residential Real Estate Agent", "Real Estate Analyst", "Property Inspector",
    "Real Estate Consultant", "Real Estate Investor", "Mortgage Loan Officer",
    "Title Examiner", "Real Estate Paralegal", "Facilities Manager", "Space Planner",
    "Real Estate Photographer"
  ],

  "Retail & Commerce": [
    "Store Manager", "Retail Buyer", "Visual Merchandiser", "Sales Associate", "Cashier",
    "Customer Service Representative", "Inventory Control Specialist", "Loss Prevention Officer",
    "Retail Analyst", "E-commerce Manager", "Product Manager", "Category Manager",
    "Merchandise Planner", "Retail Operations Manager", "Store Supervisor", "Department Manager",
    "Retail Trainer"
  ],

  "Creative Arts & Design": [
    "Graphic Designer", "UI/UX Designer", "Web Designer", "Fashion Designer", "Industrial Designer",
    "Illustrator", "Photographer", "Videographer", "Film Director", "Producer", "Editor",
    "Sound Designer", "Animator", "Concept Artist", "Creative Director", "Art Director",
    "Multimedia Artist", "Digital Artist", "Print Designer", "Brand Designer"
  ],

  "Media & Journalism": [
    "Journalist", "Reporter", "News Anchor", "Editor", "Copy Editor", "Photojournalist",
    "Broadcast Journalist", "Sports Journalist", "Investigative Journalist", "Columnist",
    "Publisher", "Media Relations Specialist", "Publicist", "Social Media Coordinator",
    "Content Creator", "Video Producer", "Radio Host", "Podcaster", "Film Critic", "Media Buyer"
  ],

  "Government & Public Sector": [
    "Government Administrator", "Policy Analyst", "Public Servant", "Civil Servant", "Mayor",
    "City Manager", "Police Officer", "Firefighter", "Paramedic", "Social Worker", "Urban Planner",
    "Environmental Officer", "Tax Collector", "Immigration Officer", "Customs Officer",
    "Diplomat", "Foreign Service Officer", "Intelligence Analyst", "Military Officer"
  ],

  "Non-profit & Social Work": [
    "Social Worker", "Case Manager", "Community Organizer", "Fundraiser", "Program Coordinator",
    "Non-profit Director", "Volunteer Coordinator", "Grant Writer", "Advocacy Coordinator",
    "Youth Worker", "Counselor", "Therapist", "Rehabilitation Specialist", "Community Health Worker",
    "Disaster Relief Coordinator", "Environmental Activist", "Peace Corps Volunteer"
  ],

  "Agriculture & Farming": [
    "Farmer", "Agronomist", "Agricultural Engineer", "Veterinarian", "Animal Scientist",
    "Crop Scientist", "Soil Scientist", "Farm Manager", "Agricultural Technician",
    "Pesticide Handler", "Irrigation Specialist", "Sustainable Agriculture Specialist",
    "Food Scientist", "Agricultural Economist", "Extension Agent", "Forester",
    "Fisheries Biologist", "Horticulturist"
  ],

  "Manufacturing & Production": [
    "Production Manager", "Quality Control Inspector", "Process Engineer", "Manufacturing Engineer",
    "Industrial Engineer", "Operations Manager", "Plant Manager", "Supply Chain Analyst",
    "Maintenance Technician", "Machine Operator", "Assembly Line Worker", "Quality Assurance Manager",
    "Lean Manufacturing Specialist", "Six Sigma Black Belt", "Production Planner", "Inventory Manager"
  ],

  "Energy & Utilities": [
    "Energy Engineer", "Electrical Engineer", "Power Plant Operator", "Renewable Energy Specialist",
    "Solar Panel Installer", "Wind Turbine Technician", "Oil & Gas Engineer", "Petroleum Engineer",
    "Geologist", "Environmental Engineer", "Utility Manager", "Energy Consultant",
    "Sustainability Manager", "Carbon Footprint Analyst", "Energy Auditor", "Grid Engineer"
  ],

  "Telecommunications": [
    "Network Engineer", "Telecommunications Engineer", "IT Support Specialist", "Systems Administrator",
    "Data Center Technician", "Cable Technician", "Satellite Communications Specialist",
    "Wireless Network Engineer", "VoIP Engineer", "Telecom Project Manager", "Customer Service Tech",
    "Fiber Optic Technician", "Radio Frequency Engineer", "Telecom Analyst"
  ],

  "Consulting": [
    "Management Consultant", "Strategy Consultant", "IT Consultant", "Business Analyst",
    "Financial Consultant", "HR Consultant", "Marketing Consultant", "Operations Consultant",
    "Change Management Consultant", "Process Improvement Consultant", "Technology Consultant",
    "Environmental Consultant", "Legal Consultant", "Healthcare Consultant"
  ],

  "Research & Academia": [
    "Research Scientist", "Research Assistant", "Postdoctoral Researcher", "Lab Technician",
    "Research Coordinator", "Academic Researcher", "Clinical Researcher", "Market Researcher",
    "Social Researcher", "Policy Researcher", "Research Analyst", "Data Researcher",
    "Field Researcher", "Research Librarian", "Archivist"
  ],

  "Sports & Recreation": [
    "Athletic Trainer", "Physical Education Teacher", "Sports Coach", "Personal Trainer",
    "Fitness Instructor", "Sports Psychologist", "Sports Agent", "Event Coordinator",
    "Recreation Specialist", "Sports Journalist", "Sports Marketing Manager", "Stadium Manager",
    "Equipment Manager", "Sports Nutritionist", "Sports Medicine Physician"
  ],

  "Food Service & Catering": [
    "Executive Chef", "Head Chef", "Line Cook", "Pastry Chef", "Baker", "Catering Manager",
    "Food Service Director", "Dietary Manager", "Food Safety Inspector", "Menu Planner",
    "Restaurant Owner", "Bartender", "Sommelier", "Food Critic", "Culinary Instructor",
    "Food Stylist", "Nutritionist"
  ],

  "Security": [
    "Security Guard", "Security Manager", "Private Investigator", "Security Consultant",
    "Fraud Investigator", "Risk Assessment Specialist", "Security Systems Installer",
    "Bodyguard", "Intelligence Officer", "Security Trainer", "Compliance Security Officer",
    "Physical Security Specialist"
  ],

  "Cleaning & Maintenance": [
    "Housekeeper", "Janitor", "Cleaning Supervisor", "Maintenance Technician", "Facilities Maintenance",
    "HVAC Technician", "Plumbing Technician", "Electrical Maintenance", "Building Maintenance",
    "Custodial Manager", "Sanitation Worker", "Window Cleaner", "Carpet Cleaner", "Pressure Washer"
  ],

  "Entrepreneurship & Business": [
    "Entrepreneur", "Business Owner", "Freelancer", "Consultant", "Coach", "Mentor", "Life Coach",
    "Career Counselor", "Professional Speaker", "Author", "Blogger", "YouTuber", "Influencer",
    "Streamer", "Virtual Assistant", "Administrative Assistant", "Office Manager", "Executive Assistant",
    "Project Coordinator", "Event Planner"
  ]
};

export const FINANCIAL_GOALS = [
  "Finanční nezávislost (F.I.R.E.)",
  "1 000 000 Kč úspor",
  "3 000 000 Kč úspor",
  "5 000 000 Kč úspor",
  "Pasivní příjem 30 000 Kč/měsíc",
  "Pasivní příjem 50 000 Kč/měsíc",
  "Pasivní příjem 100 000 Kč/měsíc",
  "Splacení hypotéky",
  "Splacení všech dluhů",
  "Vytvoření investičního portfolia",
  "Dosažení čistého jmění 5 000 000 Kč",
  "Dosažení čistého jmění 10 000 000 Kč",
  "Měsíční úspory 50% příjmu",
  "Vytvoření rezervy 6 měsíčních nákladů"
];

export const MATERIAL_GOALS = [
  "Koupě nového osobního automobilu",
  "Koupě sportovního automobilu",
  "Koupě elektromobilu",
  "Koupě terénního vozu (SUV)",
  "Koupě motocyklu",
  "Koupě karavanu",
  "Koupě lodě",
  "Koupě historického vozu",
  "Koupě bytu 1+kk",
  "Koupě bytu 2+kk",
  "Koupě bytu 3+kk",
  "Koupě rodinného domu",
  "Koupě vily",
  "Koupě chaty",
  "Koupě chalupy",
  "Koupě pozemku pro stavbu",
  "Koupě komerční nemovitosti",
  "Rekonstrukce bytu",
  "Rekonstrukce domu",
  "Stavba rodinného domu",
  "Koupě nového smartphonu",
  "Koupě notebooku (high-end)",
  "Koupě herního PC",
  "Koupě MacBook Pro",
  "Koupě tabletu iPad Pro",
  "Koupě chytrých hodinek",
  "Koupě herní konzole",
  "Koupě 4K televize",
  "Koupě domácího kina",
  "Dovolená v Karibiku",
  "Dovolená v Japonsku",
  "Dovolená v Austrálii",
  "Dovolená na Maledivách",
  "Cestování po celém světě (1 rok)",
  "Koupě vlastního karavanu pro cestování",
  "Koupě luxusních hodinek",
  "Koupě šperků",
  "Koupě značkového oblečení",
  "Koupě sportovního vybavení",
  "Koupě jachty",
  "Koupě letadla (ultralehkého)",
  "Koupě vily u moře",
  "Koupě golfového členství",
  "Koupě posilovny domů",
  "Koupě elektrokola (městské)",
  "Koupě elektrokola (horské - MTB)",
  "Koupě elektrokola (trekingové)",
  "Koupě elektrokola (silniční)",
  "Koupě elektrokola (skládací)",
  "Koupě elektrokola (fat bike)",
  "Koupě elektrokola (cargo)",
  "Koupě elektroskútru",
  "Koupě elektromotorku pro kolo",
  "Koupě jízdního kola (městské)",
  "Koupě jízdního kola (horské - MTB)",
  "Koupě jízdního kola (silniční)",
  "Koupě jízdního kola (trekingové)",
  "Koupě jízdního kola (cyklokrosové)",
  "Koupě jízdního kola (gravel)",
  "Koupě jízdního kola (dětské)",
  "Koupě jízdního kola (BMX)",
  "Koupě jízdního kola (fixie)",
  "Koupě jízdního kola (koloběžka)",
  "Financování vlastního vzdělávání",
  "Koupě kurzů za 100 000 Kč",
  "Zaplacení certifikací",
  "Financování dětského vzdělání",
  "Založení vlastního podniku",
  "Investice do startupu",
  "Koupě franšízy",
  "Koupě existujícího podniku",
  "Koupě uměleckého díla",
  "Koupě sbírky (známky, mince)",
  "Koupě veterána",
  "Koupě nemovitosti k pronájmu"
];

export const initialCourses: Course[] = [
  {
    id: 1,
    title: "Pokročilý React & Next.js 15",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    totalHours: 40,
    spentHours: 12,
    priority: "High",
    deadline: "2026-02-15",
    tags: ["Frontend", "React", "SSR", "Next.js"],
    description: "Kompletní průvodce Next.js App Routerem.",
    modules: [
      { id: "m1", title: "React Refresh", isCompleted: true },
      { id: "m2", title: "Next.js Routing", isCompleted: true },
      { id: "m3", title: "Data Fetching", isCompleted: false },
    ],
    resources: [],
    notes: ""
  },
  {
    id: 2,
    title: "TypeScript Masterclass",
    platform: "YouTube",
    totalHours: 10,
    spentHours: 2,
    priority: "Medium",
    tags: ["TypeScript", "JavaScript"],
    description: "Deep dive into TS.",
    modules: [{ id: "t1", title: "Basics", isCompleted: true }],
    resources: [],
    notes: ""
  }
];
