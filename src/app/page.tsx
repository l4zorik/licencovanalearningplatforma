"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Container, Row, Col, Card, ProgressBar, Badge, Button, Modal, Form, Dropdown, Collapse, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Course, Job } from '@/types';
import { SKILL_TEMPLATES } from '@/components/EducationSection';
import { JOB_TEMPLATES } from '@/components/WorkSection';
import { CERTIFICATION_TEMPLATES } from '@/components/CertificationSection';
import ThemeToggle from '@/components/ThemeToggle';
import { Project, ProjectMilestone, ProjectTemplate } from '@/types';
import { calculateProjectStats, PROJECT_TEMPLATES, INITIAL_PROJECTS } from '@/data/projects/data';
import FocusedProjectCard from '@/components/projects/FocusedProjectCard';
import LifeGoalsSection from '@/components/life/LifeGoalsSection';
import CareerAdviceSection from '@/components/CareerAdviceSection';
import RecipesSection from '@/components/RecipesSection';
import ProbabilityIndicator from '@/components/ProbabilityIndicator';
import TechnicalIntelligence from '@/components/TechnicalIntelligence';
import AchievementRoadmap from '@/components/gamification/AchievementRoadmap';
import { createBasicTour, addDashboardSteps } from '@/lib/tours';
// NEW: Premium UI Components (Aliased to avoid conflict)
import { Card as PremiumCard, Button as PremiumButton, Progress as PremiumProgress, Badge as PremiumBadge } from '@/components/ui';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { FiTarget, FiTrendingUp, FiAward, FiBook, FiClock, FiCheckCircle } from 'react-icons/fi';

// Ad component placeholder for future implementation
const AdBanner = ({ position, size = "medium" }: { position: string, size?: string }) => {
  // Placeholder for ad implementation
  // In production, replace with actual ad network code
  const isPremium = false; // This would come from user subscription status

  if (isPremium) return null; // Hide ads for premium users

  return (
    <div className={`ad-banner ad-${position} ${size} bg-light border rounded p-3 text-center my-3`}
      style={{ minHeight: size === 'large' ? '120px' : '90px' }}>
      <div className="text-muted small">
        🔄 Reklamní prostor - {position}
        <br />
        <small>Velikost: {size}</small>
      </div>
      {/* Future: Replace with actual ad network code */}
      {/* Example: Google AdSense, Media.net, etc. */}
    </div>
  );
};

// Dynamically collect all career paths and job titles from templates
const getAllCareerGoals = () => {
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
const CAREER_PATHS_BY_INDUSTRY = {
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
    // Service & Maintenance
    "Auto Mechanic", "Master Technician", "Service Advisor", "Service Manager",
    "Quick Lube Technician", "Express Service Technician", "Fleet Service Technician",
    "Maintenance Technician", "Pre-Delivery Inspector", "Used Car Inspector",

    // Technical Specializations
    "Brake Specialist", "Transmission Technician", "Engine Builder", "Diesel Mechanic",
    "Electrical Specialist", "HVAC Technician", "Suspension & Steering Tech",
    "Tire Technician", "Alignment Specialist", "Wheel & Tire Manager",

    // Diagnostics & Repair
    "Diagnostic Technician", "Technical Service Representative", "Shop Foreman",
    "Warranty Administrator", "Quality Control Inspector", "Technical Trainer",
    "ASE Certified Technician", "Master Auto Technician", "Line Technician",

    // Body & Paint
    "Body Technician", "Collision Repair Technician", "Frame Specialist",
    "Auto Body Painter", "Paint Technician", "Detailer", "Glass Technician",
    "ADCalibration Specialist", "Dent Removal Specialist", "Body Shop Manager",

    // Performance & Customization
    "Performance Tuner", "Engine Tuner", "Dyno Operator", "Turbo Installer",
    "Exhaust Specialist", "Suspension Tuning Specialist", "Car Audio Installer",
    "Custom Shop Technician", "Race Car Mechanic", "Motorsports Technician",

    // Electric & Hybrid Vehicles
    "EV Technician", "Hybrid Vehicle Specialist", "High Voltage Technician",
    "Battery System Specialist", "Charging Station Installer", "EV Shop Manager",
    "Battery Engineer", "Electric Motor Specialist", "EV Diagnostic Technician",

    // Dealership & Sales
    "Automotive Salesperson", "Sales Manager", "Finance Manager", "Leasing Consultant",
    "Vehicle Inventory Manager", "Sales Director", "Fleet Sales Representative",
    "Parts Advisor", "Parts Manager", "Parts Counterperson",

    // Management & Operations
    "Service Director", "Parts Director", "General Manager", "Dealer Principal",
    "Operations Manager", "Business Development Manager", "Customer Relations Manager",
    "Fixed Operations Director", "Aftermarket Sales Manager",

    // Engineering & Design
    "Automotive Engineer", "Design Engineer", "Test Engineer", "Validation Engineer",
    "Manufacturing Engineer", "Quality Engineer", "Reliability Engineer",
    "Powertrain Engineer", "Chassis Engineer", "NVH Engineer",

    // Research & Development
    "R&D Engineer", "Product Development Engineer", "Research Scientist",
    "Materials Engineer", "Aerodynamics Engineer", "Thermal Engineer",
    "Systems Integration Engineer", "Controls Engineer", "Software Engineer (Automotive)",

    // Emerging Technology
    "Autonomous Vehicle Engineer", "ADAS Calibration Specialist", "Sensor Engineer",
    "Connected Car Engineer", "Automotive Cybersecurity Specialist", "Machine Learning Engineer",
    "Vehicle-to-Everything (V2X) Engineer", "Fleet Management Specialist",
    "Telematics Engineer", "Automotive UI/UX Designer",

    // Commercial Vehicles & Heavy Equipment
    "Truck Mechanic", "Heavy Equipment Mechanic", "Diesel Technician",
    "Fleet Maintenance Manager", "Equipment Manager", "Transportation Manager",
    "Logistics Coordinator", "Yard Manager", "Trailer Technician",

    // Motorcycle & Powersports
    "Motorcycle Mechanic", "ATV Technician", "Snowmobile Mechanic",
    "Powersports Sales", "Motorcycle Detailer", "Motorcycle Customizer",
    "Riding Instructor", "Motocross Mechanic", "Scooter Technician",

    // Other Automotive
    "Recycling Specialist", "Scrap Yard Operator", "Vehicle Appraiser",
    "Classic Car Restorer", "Collector Car Specialist", "Automotive Journalist",
    "Motorsports Engineer", "Race Engineer", "Data Acquisition Specialist"
  ],

  // Healthcare & Medical
  "Healthcare & Medical": [
    "Doctor/Physician", "Nurse", "Pharmacist", "Dentist", "Physical Therapist", "Radiologist",
    "Surgeon", "Medical Laboratory Scientist", "Registered Nurse", "Nurse Practitioner",
    "Physician Assistant", "Paramedic", "Emergency Medical Technician", "Medical Assistant",
    "Dental Hygienist", "Occupational Therapist", "Speech-Language Pathologist",
    "Dietitian/Nutritionist", "Biomedical Engineer", "Healthcare Administrator", "Medical Researcher",
    "Clinical Psychologist", "Psychiatrist", "Therapist/Counselor", "Massage Therapist",
    "Chiropractor", "Optometrist", "Podiatrist", "Genetic Counselor"
  ],

  // Education & Teaching
  "Education & Teaching": [
    "Teacher", "Professor", "Principal", "School Counselor", "Librarian", "Special Education Teacher",
    "Preschool Teacher", "High School Teacher", "College Professor", "University Lecturer",
    "Education Administrator", "Curriculum Developer", "Educational Psychologist", "School Psychologist",
    "ESL Teacher", "Music Teacher", "Art Teacher", "PE Teacher", "Science Teacher", "Math Teacher",
    "History Teacher", "Language Teacher", "Tutor", "Instructional Designer", "Education Consultant"
  ],

  // Finance & Banking
  "Finance & Banking": [
    "Banker", "Financial Advisor", "Investment Banker", "Stockbroker", "Financial Analyst",
    "Accountant", "CPA", "Auditor", "Financial Planner", "Credit Analyst", "Loan Officer",
    "Mortgage Broker", "Insurance Agent", "Actuary", "Risk Manager", "Financial Manager",
    "Treasury Analyst", "Corporate Finance", "Personal Banker", "Branch Manager", "Wealth Manager",
    "Financial Consultant", "Budget Analyst", "Tax Advisor", "Financial Controller"
  ],

  // Marketing & Sales
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

  // Hospitality & Tourism
  "Hospitality & Tourism": [
    "Hotel Manager", "Restaurant Manager", "Chef", "Sous Chef", "Bartender", "Waiter/Waitress",
    "Hotel Receptionist", "Concierge", "Tour Guide", "Travel Agent", "Event Coordinator",
    "Catering Manager", "Spa Manager", "Resort Manager", "Cruise Director", "Airport Manager",
    "Housekeeper", "Bellhop", "Sommelier", "Pastry Chef", "Line Cook", "Food Service Manager"
  ],

  // Construction & Architecture
  "Construction & Architecture": [
    "Architect", "Civil Engineer", "Structural Engineer", "Construction Manager", "Project Manager",
    "Site Supervisor", "Quantity Surveyor", "Building Inspector", "Real Estate Developer",
    "Urban Planner", "Landscape Architect", "Interior Designer", "Construction Worker",
    "Electrician", "Plumber", "Carpenter", "Mason", "Painter", "Roofing Contractor",
    "Demolition Expert", "Surveyor", "Estimator"
  ],

  // Logistics & Transportation
  "Logistics & Transportation": [
    "Logistics Manager", "Supply Chain Manager", "Transportation Manager", "Fleet Manager",
    "Warehouse Manager", "Shipping Coordinator", "Import/Export Specialist", "Truck Driver",
    "Delivery Driver", "Courier", "Airport Operations Manager", "Railway Engineer", "Pilot",
    "Flight Attendant", "Air Traffic Controller", "Port Manager", "Freight Forwarder",
    "Inventory Manager", "Distribution Manager", "Traffic Manager"
  ],

  // Legal
  "Legal": [
    "Lawyer", "Attorney", "Judge", "Paralegal", "Legal Assistant", "Corporate Lawyer",
    "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Tax Lawyer", "Environmental Lawyer",
    "Intellectual Property Lawyer", "Litigator", "Legal Consultant", "Compliance Officer",
    "Contract Manager", "Legal Secretary", "Court Reporter", "Mediator", "Arbitrator", "Legal Researcher"
  ],

  // HR & Recruitment
  "HR & Recruitment": [
    "HR Manager", "Recruiter", "Talent Acquisition Specialist", "HR Business Partner",
    "Training Manager", "Employee Relations Specialist", "Compensation Analyst",
    "Benefits Administrator", "HR Coordinator", "Organizational Development Specialist",
    "Diversity & Inclusion Manager", "HR Consultant", "Payroll Administrator",
    "Labor Relations Specialist", "Talent Management Specialist", "HR Analyst",
    "Recruitment Coordinator", "Onboarding Specialist"
  ],

  // Real Estate
  "Real Estate": [
    "Real Estate Agent", "Property Manager", "Real Estate Broker", "Appraiser",
    "Real Estate Developer", "Leasing Agent", "Commercial Real Estate Agent",
    "Residential Real Estate Agent", "Real Estate Analyst", "Property Inspector",
    "Real Estate Consultant", "Real Estate Investor", "Mortgage Loan Officer",
    "Title Examiner", "Real Estate Paralegal", "Facilities Manager", "Space Planner",
    "Real Estate Photographer"
  ],

  // Retail & Commerce
  "Retail & Commerce": [
    "Store Manager", "Retail Buyer", "Visual Merchandiser", "Sales Associate", "Cashier",
    "Customer Service Representative", "Inventory Control Specialist", "Loss Prevention Officer",
    "Retail Analyst", "E-commerce Manager", "Product Manager", "Category Manager",
    "Merchandise Planner", "Retail Operations Manager", "Store Supervisor", "Department Manager",
    "Retail Trainer"
  ],

  // Creative Arts & Design
  "Creative Arts & Design": [
    "Graphic Designer", "UI/UX Designer", "Web Designer", "Fashion Designer", "Industrial Designer",
    "Illustrator", "Photographer", "Videographer", "Film Director", "Producer", "Editor",
    "Sound Designer", "Animator", "Concept Artist", "Creative Director", "Art Director",
    "Multimedia Artist", "Digital Artist", "Print Designer", "Brand Designer"
  ],

  // Media & Journalism
  "Media & Journalism": [
    "Journalist", "Reporter", "News Anchor", "Editor", "Copy Editor", "Photojournalist",
    "Broadcast Journalist", "Sports Journalist", "Investigative Journalist", "Columnist",
    "Publisher", "Media Relations Specialist", "Publicist", "Social Media Coordinator",
    "Content Creator", "Video Producer", "Radio Host", "Podcaster", "Film Critic", "Media Buyer"
  ],

  // Government & Public Sector
  "Government & Public Sector": [
    "Government Administrator", "Policy Analyst", "Public Servant", "Civil Servant", "Mayor",
    "City Manager", "Police Officer", "Firefighter", "Paramedic", "Social Worker", "Urban Planner",
    "Environmental Officer", "Tax Collector", "Immigration Officer", "Customs Officer",
    "Diplomat", "Foreign Service Officer", "Intelligence Analyst", "Military Officer"
  ],

  // Non-profit & Social Work
  "Non-profit & Social Work": [
    "Social Worker", "Case Manager", "Community Organizer", "Fundraiser", "Program Coordinator",
    "Non-profit Director", "Volunteer Coordinator", "Grant Writer", "Advocacy Coordinator",
    "Youth Worker", "Counselor", "Therapist", "Rehabilitation Specialist", "Community Health Worker",
    "Disaster Relief Coordinator", "Environmental Activist", "Peace Corps Volunteer"
  ],

  // Agriculture & Farming
  "Agriculture & Farming": [
    "Farmer", "Agronomist", "Agricultural Engineer", "Veterinarian", "Animal Scientist",
    "Crop Scientist", "Soil Scientist", "Farm Manager", "Agricultural Technician",
    "Pesticide Handler", "Irrigation Specialist", "Sustainable Agriculture Specialist",
    "Food Scientist", "Agricultural Economist", "Extension Agent", "Forester",
    "Fisheries Biologist", "Horticulturist"
  ],

  // Manufacturing & Production
  "Manufacturing & Production": [
    "Production Manager", "Quality Control Inspector", "Process Engineer", "Manufacturing Engineer",
    "Industrial Engineer", "Operations Manager", "Plant Manager", "Supply Chain Analyst",
    "Maintenance Technician", "Machine Operator", "Assembly Line Worker", "Quality Assurance Manager",
    "Lean Manufacturing Specialist", "Six Sigma Black Belt", "Production Planner", "Inventory Manager"
  ],

  // Energy & Utilities
  "Energy & Utilities": [
    "Energy Engineer", "Electrical Engineer", "Power Plant Operator", "Renewable Energy Specialist",
    "Solar Panel Installer", "Wind Turbine Technician", "Oil & Gas Engineer", "Petroleum Engineer",
    "Geologist", "Environmental Engineer", "Utility Manager", "Energy Consultant",
    "Sustainability Manager", "Carbon Footprint Analyst", "Energy Auditor", "Grid Engineer"
  ],

  // Telecommunications
  "Telecommunications": [
    "Network Engineer", "Telecommunications Engineer", "IT Support Specialist", "Systems Administrator",
    "Data Center Technician", "Cable Technician", "Satellite Communications Specialist",
    "Wireless Network Engineer", "VoIP Engineer", "Telecom Project Manager", "Customer Service Tech",
    "Fiber Optic Technician", "Radio Frequency Engineer", "Telecom Analyst"
  ],

  // Consulting
  "Consulting": [
    "Management Consultant", "Strategy Consultant", "IT Consultant", "Business Analyst",
    "Financial Consultant", "HR Consultant", "Marketing Consultant", "Operations Consultant",
    "Change Management Consultant", "Process Improvement Consultant", "Technology Consultant",
    "Environmental Consultant", "Legal Consultant", "Healthcare Consultant"
  ],

  // Research & Academia
  "Research & Academia": [
    "Research Scientist", "Research Assistant", "Postdoctoral Researcher", "Lab Technician",
    "Research Coordinator", "Academic Researcher", "Clinical Researcher", "Market Researcher",
    "Social Researcher", "Policy Researcher", "Research Analyst", "Data Researcher",
    "Field Researcher", "Research Librarian", "Archivist"
  ],

  // Sports & Recreation
  "Sports & Recreation": [
    "Athletic Trainer", "Physical Education Teacher", "Sports Coach", "Personal Trainer",
    "Fitness Instructor", "Sports Psychologist", "Sports Agent", "Event Coordinator",
    "Recreation Specialist", "Sports Journalist", "Sports Marketing Manager", "Stadium Manager",
    "Equipment Manager", "Sports Nutritionist", "Sports Medicine Physician"
  ],

  // Food Service & Catering
  "Food Service & Catering": [
    "Executive Chef", "Head Chef", "Line Cook", "Pastry Chef", "Baker", "Catering Manager",
    "Food Service Director", "Dietary Manager", "Food Safety Inspector", "Menu Planner",
    "Restaurant Owner", "Bartender", "Sommelier", "Food Critic", "Culinary Instructor",
    "Food Stylist", "Nutritionist"
  ],

  // Security
  "Security": [
    "Security Guard", "Security Manager", "Private Investigator", "Security Consultant",
    "Fraud Investigator", "Risk Assessment Specialist", "Security Systems Installer",
    "Bodyguard", "Intelligence Officer", "Security Trainer", "Compliance Security Officer",
    "Physical Security Specialist"
  ],

  // Cleaning & Maintenance
  "Cleaning & Maintenance": [
    "Housekeeper", "Janitor", "Cleaning Supervisor", "Maintenance Technician", "Facilities Maintenance",
    "HVAC Technician", "Plumbing Technician", "Electrical Maintenance", "Building Maintenance",
    "Custodial Manager", "Sanitation Worker", "Window Cleaner", "Carpet Cleaner", "Pressure Washer"
  ],

  // Other diverse careers
  "Entrepreneurship & Business": [
    "Entrepreneur", "Business Owner", "Freelancer", "Consultant", "Coach", "Mentor", "Life Coach",
    "Career Counselor", "Professional Speaker", "Author", "Blogger", "YouTuber", "Influencer",
    "Streamer", "Virtual Assistant", "Administrative Assistant", "Office Manager", "Executive Assistant",
    "Project Coordinator", "Event Planner"
  ]
};

// Dynamically import EducationSection to avoid SSR issues with DnD Kit
const EducationSection = dynamic(() => import('@/components/EducationSection'), {
  ssr: false
});
const WorkSection = dynamic(() => import('@/components/WorkSection'), {
  ssr: false
});
const CertificationSection = dynamic(() => import('@/components/CertificationSection'), {
  ssr: false
});
const AkizeGuide = dynamic(() => import('@/components/AkizeGuide'), {
  ssr: false
});
const TrendySection = dynamic(() => import('@/components/TrendySection'), {
  ssr: false
});

const FINANCIAL_GOALS = [
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

const MATERIAL_GOALS = [
  // Automobily
  "Koupě nového osobního automobilu",
  "Koupě sportovního automobilu",
  "Koupě elektromobilu",
  "Koupě terénního vozu (SUV)",
  "Koupě motocyklu",
  "Koupě karavanu",
  "Koupě lodě",
  "Koupě historického vozu",

  // Nemovitosti
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

  // Elektronika a technologie
  "Koupě nového smartphonu",
  "Koupě notebooku (high-end)",
  "Koupě herního PC",
  "Koupě MacBook Pro",
  "Koupě tabletu iPad Pro",
  "Koupě chytrých hodinek",
  "Koupě herní konzole",
  "Koupě 4K televize",
  "Koupě domácího kina",

  // Cestování
  "Dovolená v Karibiku",
  "Dovolená v Japonsku",
  "Dovolená v Austrálii",
  "Dovolená na Maledivách",
  "Cestování po celém světě (1 rok)",
  "Koupě vlastního karavanu pro cestování",

  // Lifestyle
  "Koupě luxusních hodinek",
  "Koupě šperků",
  "Koupě značkového oblečení",
  "Koupě sportovního vybavení",
  "Koupě jachty",
  "Koupě letadla (ultralehkého)",
  "Koupě vily u moře",
  "Koupě golfového členství",
  "Koupě posilovny domů",

  // Kola - Elektrokola
  "Koupě elektrokola (městské)",
  "Koupě elektrokola (horské - MTB)",
  "Koupě elektrokola (trekingové)",
  "Koupě elektrokola (silniční)",
  "Koupě elektrokola ( склаdací)",
  "Koupě elektrokola (fat bike)",
  "Koupě elektrokola (cargo)",
  "Koupě elektroskútru",
  "Koupě elektromotorku pro kolo",

  // Kola - Klasická
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

  // Vzdělání a rozvoj
  "Financování vlastního vzdělávání",
  "Koupě kurzů za 100 000 Kč",
  "Zaplacení certifikací",
  "Financování dětského vzdělání",

  // Firemní
  "Založení vlastního podniku",
  "Investice do startupu",
  "Koupě franšízy",
  "Koupě existujícího podniku",

  // Ostatní
  "Koupě uměleckého díla",
  "Koupě sbírky (známky, mince)",
  "Koupě veterána",
  "Koupě nemovitosti k pronájmu"
];

// ============================================================================
// LIFE OS 2026 - Comprehensive Goal System
// ============================================================================



// Initial Data for the Page State
const initialCourses: Course[] = [
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

import WaveBackground from '@/components/WaveBackground';

export default function Home() {
  const { data: session, status } = useSession();

  // LIFTED STATE: Courses are now managed here so they can be shared
  const [courses, setCourses] = useState<Course[]>([]);
  const [archivedSkills, setArchivedSkills] = useState<Course[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showTrendyModal, setShowTrendyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentGoal, setCurrentGoal] = useState<string>("Fullstack Developer");
  const [goalCategory, setGoalCategory] = useState<string>("career");
  const [financialGoal, setFinancialGoal] = useState<string>("");
  const [materialGoal, setMaterialGoal] = useState<string>("");
  const [goalQuantity, setGoalQuantity] = useState<number>(1);
  const [goalProgress, setGoalProgress] = useState<number>(0);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [templateMilestonesProgress, setTemplateMilestonesProgress] = useState<Record<string, string[]>>({});
  const [selectedTemplateDetail, setSelectedTemplateDetail] = useState<ProjectTemplate | null>(null);
  const [focusedProjectId, setFocusedProjectId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('focusedProjectId');
    }
    return null;
  });
  const [showNextStepModal, setShowNextStepModal] = useState(false);
  const [showBenefitsLibraryModal, setShowBenefitsLibraryModal] = useState(false);

  const getFocusedProject = () => {
    if (!focusedProjectId) return null;
    return projects.find(p => p.id === focusedProjectId) || null;
  };

  const getNextStep = () => {
    const project = getFocusedProject();
    if (!project) return null;
    return project.milestones.find(m => !m.isCompleted) || null;
  };

  // Save focusedProjectId to localStorage
  useEffect(() => {
    if (focusedProjectId) {
      localStorage.setItem('focusedProjectId', focusedProjectId);
    } else {
      localStorage.removeItem('focusedProjectId');
    }
  }, [focusedProjectId]);

  // Load projects from localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        const processedProjects = parsed.map((p: any) => ({
          ...p,
          startDate: new Date(p.startDate),
          deadline: p.deadline ? new Date(p.deadline) : undefined,
          milestones: p.milestones.map((m: any) => ({
            ...m,
            completedAt: m.completedAt ? new Date(m.completedAt) : undefined,
            timerStartedAt: m.timerStartedAt ? new Date(m.timerStartedAt) : undefined
          })),
          algorithms: p.algorithms.map((a: any) => ({
            ...a,
            timestamp: new Date(a.timestamp)
          }))
        }));
        setProjects(processedProjects);
      } catch (error) {
        console.error('Failed to parse projects:', error);
        setProjects(INITIAL_PROJECTS);
      }
    } else {
      setProjects(INITIAL_PROJECTS);
    }
  }, []);

  // Load template milestones progress from localStorage
  useEffect(() => {
    const savedTemplateProgress = localStorage.getItem('templateMilestonesProgress');
    if (savedTemplateProgress) {
      try {
        setTemplateMilestonesProgress(JSON.parse(savedTemplateProgress));
      } catch {
        setTemplateMilestonesProgress({});
      }
    }
  }, []);

  // Save template milestones progress to localStorage
  useEffect(() => {
    localStorage.setItem('templateMilestonesProgress', JSON.stringify(templateMilestonesProgress));
  }, [templateMilestonesProgress]);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }, [projects]);

  // Toggle template milestone
  const handleToggleTemplateMilestone = (templateId: string, milestoneTitle: string) => {
    setTemplateMilestonesProgress(prev => {
      const completed = prev[templateId] || [];
      const isCompleted = completed.includes(milestoneTitle);
      let newCompleted: string[];

      if (isCompleted) {
        newCompleted = completed.filter(m => m !== milestoneTitle);
      } else {
        newCompleted = [...completed, milestoneTitle];
      }

      return {
        ...prev,
        [templateId]: newCompleted
      };
    });
  };

  // Open template detail
  const handleOpenTemplateDetail = (template: ProjectTemplate) => {
    setSelectedTemplateDetail(template);
  };

  // Close template detail
  const handleCloseTemplateDetail = () => {
    setSelectedTemplateDetail(null);
  };

  // Goal progress tracking
  const getGoalKey = () => {
    if (goalCategory === 'career') return `goal_progress_${currentGoal}`;
    if (goalCategory === 'financial') return `goal_progress_${financialGoal}`;
    if (goalCategory === 'material') return `goal_progress_${materialGoal}`;
    return 'goal_progress_default';
  };

  const getQuantityKey = () => {
    if (goalCategory === 'career') return `goal_quantity_${currentGoal}`;
    if (goalCategory === 'financial') return `goal_quantity_${financialGoal}`;
    if (goalCategory === 'material') return `goal_quantity_${materialGoal}`;
    return 'goal_quantity_default';
  };

  // Load goal progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(getGoalKey());
    const savedQuantity = localStorage.getItem(getQuantityKey());
    if (savedProgress) setGoalProgress(parseInt(savedProgress));
    if (savedQuantity) setGoalQuantity(parseInt(savedQuantity));
  }, [goalCategory, currentGoal, financialGoal, materialGoal]);

  // Save goal progress to localStorage
  useEffect(() => {
    localStorage.setItem(getGoalKey(), goalProgress.toString());
    localStorage.setItem(getQuantityKey(), goalQuantity.toString());
  }, [goalProgress, goalQuantity, goalCategory, currentGoal, financialGoal, materialGoal]);

  // Calculate user stats
  const stats = useMemo(() => {
    const completedModules = courses.reduce((acc, course) =>
      acc + course.modules.filter(m => m.isCompleted).length, 0
    )
    const totalHours = courses.reduce((acc, course) => acc + course.spentHours, 0)

    // Simple XP calculation: 10 XP per completed module + hours bonus
    const xp = completedModules * 10 + totalHours * 2
    const level = Math.floor(xp / 100) + 1
    const xpToNext = (level * 100) - (xp % 100)

    return { level, xp, xpToNext, completedModules, totalHours }
  }, [courses])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCourses = localStorage.getItem('courses');
    const savedArchived = localStorage.getItem('archivedSkills');
    const savedGoal = localStorage.getItem('currentGoal');

    if (savedCourses) {
      try {
        setCourses(JSON.parse(savedCourses));
      } catch (error) {
        console.error('Failed to parse courses from localStorage:', error);
        setCourses(initialCourses); // fallback
      }
    } else {
      setCourses(initialCourses); // initial data
    }

    if (savedArchived) {
      try {
        setArchivedSkills(JSON.parse(savedArchived));
      } catch (error) {
        console.error('Failed to parse archived skills from localStorage:', error);
      }
    }

    if (savedGoal) {
      setCurrentGoal(savedGoal);
    }

    // Load jobs from localStorage
    const savedJobs = localStorage.getItem('jobs');
    if (savedJobs) {
      try {
        setJobs(JSON.parse(savedJobs));
      } catch (error) {
        console.error('Failed to parse jobs from localStorage:', error);
      }
    }

    setIsLoading(false);
  }, []);

  // Save to localStorage whenever courses change
  useEffect(() => {
    if (courses.length > 0 && !isLoading) {
      localStorage.setItem('courses', JSON.stringify(courses));
    }
  }, [courses, isLoading]);

  // Save archived skills
  useEffect(() => {
    localStorage.setItem('archivedSkills', JSON.stringify(archivedSkills));
  }, [archivedSkills]);

  // Save jobs to localStorage
  useEffect(() => {
    if (jobs.length > 0 && !isLoading) {
      localStorage.setItem('jobs', JSON.stringify(jobs));
    }
  }, [jobs, isLoading]);

  // Save current goal
  useEffect(() => {
    localStorage.setItem('currentGoal', currentGoal);
  }, [currentGoal]);

  if (status === 'loading' || isLoading) {
    return <div className="d-flex justify-content-center align-items-center min-vh-100">Loading...</div>;
  }

  if (!session) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <WaveBackground />
        <Card className="shadow-sm position-relative z-1">
          <Card.Body className="text-center p-5">
            <h2>Welcome to Educational Platform 2026</h2>
            <p>Please sign in to continue.</p>
            <Button href="/auth/signin" variant="primary">Sign In</Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // Calculate generic stats for Mission Logic
  // A hypothetical logic to find "Unlocked Jobs" (simulated)
  const unlockedRoles = [
    { role: "Frontend Developer", progress: 65, missing: ["Testing", "CI/CD"] },
    { role: "React Specialist", progress: 80, missing: ["Advanced Patterns"] }
  ];



  return (
    <main className="min-vh-100 position-relative">
      <WaveBackground />
      <style jsx>{`
          @keyframes pulse-next-step {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
            }
            50% {
              box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.1);
            }
          }
          .next-step-indicator:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          }
        `}</style>

      {/* Header / Navbar */}
      <nav className="navbar navbar-dark navbar-glass mb-4 sticky-top shadow-sm">
        <Container fluid>
          <div className="d-flex align-items-center">
            <span className="navbar-brand mb-0 h1 me-4">🚀 Tomas Learning Platform</span>
            <div className="d-flex gap-2">
              <Link href="/profile" className="text-decoration-none">
                <Button variant="outline-primary" size="sm" className="fw-bold" data-tour="profile">
                  👤 PROFILE
                </Button>
              </Link>
              <Link href="/analytics" className="text-decoration-none">
                <Button variant="outline-info" size="sm" className="fw-bold" data-tour="analytics">
                  📊 ANALYTICS
                </Button>
              </Link>
              <Button
                variant="outline-warning"
                size="sm"
                className="fw-bold d-flex align-items-center gap-2"
                onClick={() => setShowMissionModal(true)}
                data-tour="missions"
              >
                <span>🎯 MISE</span>
                <Badge bg="warning" text="dark" pill>2 Active</Badge>
              </Button>
              <Link href="/training" className="text-decoration-none">
                <Button variant="outline-primary" size="sm" className="fw-bold" data-tour="training">
                  🎓 TRAINING
                </Button>
              </Link>
              <Link href="/career-report" className="text-decoration-none">
                <Button variant="outline-success" size="sm" className="fw-bold" data-tour="career-report">
                  📈 CAREER REPORT
                </Button>
              </Link>
              <Link href="/courses" className="text-decoration-none">
                <Button variant="outline-success" size="sm" className="fw-bold" data-tour="courses">
                  🎓 KURZY
                </Button>
              </Link>
              <Link href="/quick-courses" className="text-decoration-none">
                <Button variant="outline-warning" size="sm" className="fw-bold" data-tour="quick-courses">
                  ⚡ RYCHLOKURZY
                </Button>
              </Link>
              <Link href="/articles" className="text-decoration-none">
                <Button variant="outline-primary" size="sm" className="fw-bold" data-tour="articles">
                  📝 ČLÁNKY
                </Button>
              </Link>
              <Link href="/tools" className="text-decoration-none">
                <Button variant="outline-warning" size="sm" className="fw-bold" data-tour="tools">
                  🛠️ TOOLS
                </Button>
              </Link>
              <Link href="/agencies" className="text-decoration-none">
                <Button variant="outline-success" size="sm" className="fw-bold" data-tour="agencies">
                  🏢 AGENTURY
                </Button>
              </Link>

              <Link href="/achievements" className="text-decoration-none">
                <Button variant="outline-warning" size="sm" className="fw-bold" data-tour="achievements">
                  🏆 ACHIEVEMENTS
                </Button>
              </Link>
              <Link href="/roadmap" className="text-decoration-none">
                <Button variant="outline-success" size="sm" className="fw-bold" data-tour="roadmap">
                  🗺️ ROADMAP
                </Button>
              </Link>
              <Link href="/journey" className="text-decoration-none">
                <Button variant="outline-primary" size="sm" className="fw-bold" data-tour="journey">
                  🎯 JOURNEY
                </Button>
              </Link>
              <Link href="/career-advice" className="text-decoration-none">
                <Button variant="outline-warning" size="sm" className="fw-bold" data-tour="career-advice">
                  💡 RADY
                </Button>
              </Link>
              <Link href="/recipes" className="text-decoration-none">
                <Button variant="outline-success" size="sm" className="fw-bold" data-tour="recipes">
                  👨‍🍳 RECEPTY
                </Button>
              </Link>
              <Link href="/challenges" className="text-decoration-none">
                <Button variant="outline-primary" size="sm" className="fw-bold" data-tour="challenges">
                  🏆 CHALLENGES
                </Button>
              </Link>
              <Link href="/recipes" className="text-decoration-none">
                <Button variant="outline-success" size="sm" className="fw-bold" data-tour="recipes">
                </Button>
              </Link>
              <Button
                variant="outline-info"
                size="sm"
                className="fw-bold d-flex align-items-center gap-2"
                onClick={() => setShowTrendyModal(true)}
                data-tour="trendy"
              >
                <span>📈 TRENDY</span>
              </Button>
              {/* Premium features toggle - for future monetization */}
              <Button
                variant="outline-info"
                size="sm"
                className="fw-bold"
                onClick={() => {
                  const tour = createBasicTour();
                  addDashboardSteps(tour);
                  tour.start();
                }}
                data-tour="tour-button"
              >
                🧭 TOUR
              </Button>
              <Button
                variant="outline-gold"
                size="sm"
                className="fw-bold"
                disabled
                title="Premium features coming soon!"
              >
                ⭐ PREMIUM
              </Button>
            </div>
          </div>

          <div className="text-white d-flex align-items-center gap-3">
            <div className="d-none d-md-block text-white-50 small">
              Level {stats.level} Developer • {stats.xp} XP
            </div>
            <div>
              <span className="me-2 text-white-50">Next Level:</span>
              <Badge bg="success">{stats.xpToNext} XP</Badge>
            </div>
            <div className="d-flex align-items-center gap-3">
              <ThemeToggle />
              <Button
                variant="outline-light"
                size="sm"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </Container>
      </nav>

      <Container fluid className="px-4">

        {/* 🔮 PROBABILITY INDICATOR */}
        <ProbabilityIndicator
          userStats={stats}
          courses={courses}
          jobs={jobs}
          projects={projects}
        />

        {/* 🧠 TECHNICAL INTELLIGENCE */}
        <TechnicalIntelligence
          userStats={stats}
          courses={courses}
        />

        {/* Education - Skill Board */}
        <Row className="mb-4">
          <Col>
            <div data-tour="education-section">
              <EducationSection
                myCourses={courses}
                setCourses={setCourses}
              />
            </div>
          </Col>
        </Row>

        {/* Work - Job Board */}
        <Row className="mb-4">
          <Col>
            <div data-tour="work-section">
              <WorkSection myCourses={courses} setCourses={setCourses} />
            </div>
          </Col>
        </Row>

        {/* Achievement Map */}
        <Row className="mb-4">
          <Col>
            <Card className="glass-effect border-0" style={{ background: 'linear-gradient(135deg, rgba(255,193,7,0.1) 0%, rgba(40,167,69,0.1) 100%)' }}>
              <Card.Header className="bg-transparent border-bottom border-warning text-dark py-3">
                <div className="d-flex align-items-center gap-3">
                  <span style={{ fontSize: '1.5rem' }}>🏆</span>
                  <h4 className="mb-0 fw-bold">Mapa Achievementů</h4>
                </div>
              </Card.Header>
              <Card.Body className="p-4">
                <AchievementRoadmap
                  unlockedIds={['first_step', 'first_job', 'mission_starter', 'xp_collector_100', 'level_5']}
                  userProgress={{
                    first_step: 100,
                    first_job: 100,
                    mission_starter: 100,
                    xp_collector_100: 75,
                    level_5: 100,
                    learning_hero: 10,
                    streak_week: 42,
                    job_hunter: 10,
                    mission_master: 0,
                    skill_builder: 15,
                    xp_collector_1000: 7,
                  }}
                  currentLevel={stats.level}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ✨ PREMIUM DASHBOARD OVERVIEW */}
        <Row className="g-4 mb-4 animate-fade-in">
          <Col md={6} lg={3}>
            <DashboardCard
              title="Aktivní Projekty"
              value={projects.filter(p => p.status === 'active').length}
              subtitle={`${projects.length} celkem`}
              icon={<FiTarget />}
              gradient="cosmic"
              trend={{ value: 12, label: 'tento týden' }}
            />
          </Col>
          <Col md={6} lg={3}>
            <DashboardCard
              title="Celkové XP"
              value={stats.xp.toLocaleString()}
              subtitle={`Level ${stats.level}`}
              icon={<FiTrendingUp />}
              gradient="sunset"
              trend={{ value: 24, label: 'dnes' }}
            />
          </Col>
          <Col md={6} lg={3}>
            <DashboardCard
              title="Zbývá XP"
              value={stats.xpToNext.toLocaleString()}
              subtitle="Do dalšího levelu"
              icon={<FiClock />}
              gradient="ocean"
            />
          </Col>
          <Col md={6} lg={3}>
            <DashboardCard
              title="Achievementy"
              value="42"
              subtitle="8 odemčeno tento měsíc"
              icon={<FiAward />}
              gradient="fire"
            />
          </Col>
        </Row>

        {/* 🚀 PROJEKTY - Collapsible Dashboard */}
        <Row className="mb-4">
          <Col>
            <Card className="glass-effect border-0" style={{ background: 'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)' }}>
              <Card.Header
                className="bg-transparent border-bottom border-secondary text-dark py-3"
                data-tour="projects-section"
                onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
                      <span style={{ transition: 'transform 0.3s ease', transform: isProjectsExpanded ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}>
                        ▶
                      </span>
                      🚀 Projekty
                    </h4>
                    <Badge bg="info" className="fs-6">
                      {projects.filter(p => p.status === 'active').length} Aktivní
                    </Badge>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="text-end">
                      <div className="fw-bold text-info">🔐</div>
                      <small className="text-white-50">Logování algoritmů</small>
                    </div>
                    <Link href="/projects">
                      <Button variant="info" size="sm">
                        📊 Přejít na Projekty
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card.Header>
              <Collapse in={isProjectsExpanded}>
                <Card.Body className="p-3">
                  {getFocusedProject() && getNextStep() && (
                    <div
                      className="next-step-indicator mb-3"
                      data-tour="next-step"
                      onClick={() => setShowNextStepModal(true)}
                      style={{
                        background: `linear-gradient(90deg, ${getFocusedProject()?.color}40 0%, ${getFocusedProject()?.color}20 100%)`,
                        border: `1px solid ${getFocusedProject()?.color}`,
                        borderRadius: '8px',
                        padding: '12px 16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        animation: 'pulse-next-step 2s infinite'
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <span style={{ fontSize: '1.5rem' }}>🎯</span>
                          <div>
                            <div className="text-white small fw-bold">DALŠÍ KROK</div>
                            <div style={{ color: '#fff', fontSize: '0.9rem' }}>
                              {getNextStep()?.title}
                            </div>
                          </div>
                        </div>
                        <Badge bg="light" text="dark" style={{ fontSize: '0.75rem' }}>
                          ⏱️ {getNextStep()?.targetHours || 2}h
                        </Badge>
                      </div>
                    </div>
                  )}
                  {getFocusedProject() ? (
                    <FocusedProjectCard
                      project={getFocusedProject()!}
                      onClose={() => setFocusedProjectId(null)}
                      onUpdate={(updatedProject) => {
                        setProjects(prev => prev.map(p =>
                          p.id === updatedProject.id ? updatedProject : p
                        ));
                      }}
                    />
                  ) : projects.length === 0 ? (
                    <Row>
                      <Col md={4}>
                        <Card style={{ background: 'rgba(156,39,176,0.15)', border: '1px solid rgba(156,39,176,0.3)' }}>
                          <Card.Body className="text-center">
                            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>➕</div>
                            <h6 style={{ color: '#fff' }}>Nový Projekt</h6>
                            <small style={{ color: '#aaa' }}>Přidat vlastní projekt</small>
                            <Link href="/projects">
                              <Button variant="outline-light" size="sm" className="mt-2 w-100">
                                Vytvořit Projekt
                              </Button>
                            </Link>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  ) : (
                    <>
                      <Row xs={1} md={2} lg={3} className="g-3">
                        {projects.map((project) => {
                          const stats = calculateProjectStats(project);
                          const isFocused = focusedProjectId === project.id;
                          return (
                            <Col key={project.id}>
                              <Card
                                style={{
                                  background: isFocused
                                    ? `linear-gradient(135deg, ${project.color}60 0%, ${project.color}40 100%)`
                                    : `${project.color}25`,
                                  border: isFocused
                                    ? `3px solid ${project.color}`
                                    : `1px solid ${project.color}60`,
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  transform: isFocused ? 'scale(1.02)' : 'scale(1)'
                                }}
                                onClick={() => setFocusedProjectId(project.id)}
                                className="hover-card"
                              >
                                <Card.Body>
                                  <div className="d-flex justify-content-between align-items-start mb-2">
                                    <span style={{ fontSize: '1.8rem' }}>{project.icon}</span>
                                    <div className="d-flex gap-1">
                                      <Badge bg={project.priority === 'high' ? 'danger' : project.priority === 'medium' ? 'warning' : 'secondary'}>
                                        {project.priority}
                                      </Badge>
                                      {isFocused && <Badge bg="info">🎯 FOCUS</Badge>}
                                    </div>
                                  </div>
                                  <h6 style={{ color: '#fff' }}>{project.title}</h6>
                                  <small style={{ color: '#aaa' }}>{project.description.substring(0, 50)}...</small>
                                  <ProgressBar now={stats.progress} style={{ height: '8px' }} className="mt-2" />
                                  <div className="d-flex justify-content-between mt-2">
                                    <small style={{ color: '#888' }}>{stats.progress}% pokrok</small>
                                    <small style={{ color: '#FFD700' }}>+{stats.totalXp} XP</small>
                                  </div>
                                  <div className="d-flex gap-1 mt-2 flex-wrap">
                                    {project.milestones.slice(0, 3).map((m, idx) => (
                                      <Badge
                                        key={idx}
                                        bg={m.isCompleted ? 'success' : 'secondary'}
                                        style={{ fontSize: '0.7rem' }}
                                      >
                                        {m.isCompleted ? '✅' : '⭕'} {m.title.substring(0, 15)}...
                                      </Badge>
                                    ))}
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Card style={{ background: 'rgba(156,39,176,0.15)', border: '1px solid rgba(156,39,176,0.3)' }}>
                            <Card.Body className="text-center">
                              <div style={{ fontSize: '2rem', marginBottom: '5px' }}>➕</div>
                              <h6 style={{ color: '#fff' }}>Nový Projekt</h6>
                              <small style={{ color: '#aaa' }}>Přidat vlastní projekt</small>
                              <Link href="/projects">
                                <Button variant="outline-light" size="sm" className="mt-2 w-100">
                                  Vytvořit Projekt
                                </Button>
                              </Link>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </>
                  )}
                </Card.Body>
              </Collapse>
            </Card>
          </Col>
        </Row>

        {/* 📋 ŠABLONY PROJEKTŮ - Quick Access to Templates */}
        <Row className="mb-4">
          <Col>
            <Card className="glass-effect border-0" style={{ background: 'linear-gradient(135deg, rgba(156,39,176,0.2) 0%, rgba(103,58,183,0.2) 100%)' }}>
              <Card.Header className="bg-transparent border-bottom border-secondary text-dark py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
                      📋 Šablony Projektů
                    </h4>
                    <Badge bg="info" className="fs-6">
                      {PROJECT_TEMPLATES.length} Šablon
                    </Badge>
                  </div>
                  <Link href="/projects">
                    <Button variant="info" size="sm">
                      📊 Všechny Šablony
                    </Button>
                  </Link>
                </div>
              </Card.Header>
              <Card.Body className="p-3">
                <Row xs={2} md={3} lg={4} className="g-2">
                  {PROJECT_TEMPLATES.slice(0, 8).map((template) => {
                    const completedMilestones = templateMilestonesProgress[template.id]?.length || 0;
                    const totalMilestones = template.suggestedMilestones.length;
                    const progress = Math.round((completedMilestones / totalMilestones) * 100);

                    return (
                      <Col key={template.id}>
                        <Card
                          style={{
                            background: `${template.color}20`,
                            border: `1px solid ${template.color}50`,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          className="h-100 hover-card"
                          onClick={() => handleOpenTemplateDetail(template)}
                        >
                          <Card.Body className="p-2">
                            <div className="d-flex justify-content-between align-items-start mb-1">
                              <span style={{ fontSize: '1.5rem' }}>{template.icon}</span>
                              {completedMilestones === totalMilestones && totalMilestones > 0 && (
                                <Badge bg="success" style={{ fontSize: '0.6rem' }}>✅</Badge>
                              )}
                            </div>
                            <h6 style={{ color: '#fff', fontSize: '0.85rem', marginBottom: '5px' }}>{template.title}</h6>

                            {totalMilestones > 0 && (
                              <>
                                <ProgressBar
                                  now={progress}
                                  variant={progress === 100 ? 'success' : 'info'}
                                  style={{ height: '4px' }}
                                />
                                <small style={{ color: '#888', fontSize: '0.7rem' }}>
                                  {completedMilestones}/{totalMilestones} úkolů
                                </small>
                              </>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
                <div className="text-center mt-3">
                  <small style={{ color: '#8892b0' }}>
                    💡 Klikni na šablonu pro zobrazení checklistu úkolů
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div data-tour="goals-section">
          <LifeGoalsSection projects={projects} />
        </div>

        {/* 💡 Career Advice & 👨‍🍳 Recipes Sections */}
        <Row className="mb-4">
          <Col md={6} className="mb-4" data-tour="career-advice-section">
            <CareerAdviceSection />
          </Col>
          <Col md={6} className="mb-4" data-tour="recipes-section">
            <RecipesSection />
          </Col>
        </Row>

        {/* Top Banner Ad */}
        <AdBanner position="top" size="large" />
      </Container>

      {/* --- MISSION CONTROL MODAL --- */}
      <Modal show={showMissionModal} onHide={() => setShowMissionModal(false)} size="xl" centered contentClassName="border-0 bg-transparent">
        <div className="bg-dark text-white rounded-3 shadow-lg overflow-hidden" style={{ minHeight: '80vh', border: '1px solid #333' }}>
          <Modal.Header closeButton closeVariant="white" className="border-secondary bg-black bg-opacity-50">
            <div>
              <Modal.Title className="fw-bold text-warning letter-spacing-1">⚔️ MISSION CONTROL</Modal.Title>
              <div className="text-white-50 small">Strategický přehled tvé kariérní cesty</div>
            </div>
          </Modal.Header>
          <Modal.Body className="p-0">
            <Row className="g-0 h-100">
              {/* LEFT PANEL: SKILL ARSENAL */}
              <Col md={4} className="bg-dark border-end border-secondary p-4">
                <h6 className="text-uppercase text-muted fw-bold mb-4 small tracking-wide">1. Váš Arzenál (Skills)</h6>

                <div className="d-flex flex-column gap-3">
                  {courses.map(course => (
                    <div key={course.id} className="p-3 rounded bg-black bg-opacity-25 border border-secondary border-opacity-25 d-flex align-items-center">
                      <div className="me-3 fs-4">⚡</div>
                      <div className="flex-grow-1">
                        <div className="fw-bold text-white">{course.title}</div>
                        <ProgressBar now={40} variant="info" style={{ height: '4px' }} className="mt-2 bg-secondary" />
                      </div>
                    </div>
                  ))}
                  {courses.length === 0 && <div className="text-muted fst-italic">Arzenál je prázdný...</div>}
                </div>

                <div className="mt-5 text-center">
                  <div className="display-4 text-white-50">⬇️</div>
                </div>
              </Col>

              {/* MIDDLE PANEL: THE LINK */}
              <Col md={4} className="bg-gradient-dark p-4 d-flex flex-column justify-content-center align-items-center position-relative" style={{ background: 'linear-gradient(to right, #212529, #1a1d20)' }}>
                <div className="text-center mb-5">
                  <h2 className="fw-bold text-white mb-3">SYNERGY</h2>
                  <p className="text-white-50 px-4">Tvé dovednosti přímo odemykají tyto pracovní příležitosti.</p>
                </div>

                <div className="d-flex align-items-center gap-3 mb-3 text-white">
                  <Badge bg="info" className="p-2">React</Badge>
                  <span>+</span>
                  <Badge bg="primary" className="p-2">TypeScript</Badge>
                  <span>=</span>
                  <Badge bg="success" className="p-2">Frontend Dev</Badge>
                </div>

                <div className="d-flex align-items-center gap-3 text-white">
                  <Badge bg="danger" className="p-2">Python</Badge>
                  <span>+</span>
                  <Badge bg="warning" text="dark" className="p-2">Math</Badge>
                  <span>=</span>
                  <Badge bg="warning" className="p-2">AI Engineer</Badge>
                </div>

                {/* Visual Connector Line */}
                <div className="position-absolute top-0 bottom-0 start-0 border-start border-secondary opacity-50"></div>
                <div className="position-absolute top-0 bottom-0 end-0 border-end border-secondary opacity-50"></div>
              </Col>

              {/* RIGHT PANEL: UNLOCKED MISSIONS */}
              <Col md={4} className="bg-dark p-4">
                <h6 className="text-uppercase text-muted fw-bold mb-4 small tracking-wide">2. Odemčené Mise (Jobs)</h6>

                <div className="d-flex flex-column gap-4">
                  {unlockedRoles.map((role, idx) => (
                    <Card key={idx} className="bg-success bg-opacity-10 border-success border-opacity-50">
                      <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                          <h5 className="fw-bold text-success mb-0">{role.role}</h5>
                          <Badge bg="success">OPEN</Badge>
                        </div>
                        <div className="text-white-50 small mb-2">Připravenost k nasazení:</div>
                        <ProgressBar now={role.progress} variant="success" className="mb-3 bg-dark" style={{ height: '8px' }} />

                        {role.missing.length > 0 && (
                          <div className="small">
                            <span className="text-muted">Chybí k dokončení: </span>
                            {role.missing.map(m => (
                              <span key={m} className="text-danger fw-bold ms-1">{m}</span>
                            ))}
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  ))}

                  <Card className="bg-secondary bg-opacity-10 border-secondary border-opacity-25 text-muted">
                    <Card.Body className="text-center py-4">
                      <div className="fs-1 mb-2">🔒</div>
                      <h6>LOCKED: Senior Architect</h6>
                      <div className="small">Vyžaduje: System Design, Cloud AWS</div>
                    </Card.Body>
                  </Card>

                  <div className="mt-4">
                    <Link href="/missions" passHref>
                      <Button variant="outline-warning" className="w-100 py-3 fw-bold text-uppercase letter-spacing-1">
                        🚀 Přejít do Operační Místnosti (All Missions)
                      </Button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </div>
      </Modal>

      {/* Akize AI Guide */}
      <div data-tour="akize-guide">
        <AkizeGuide courses={courses} jobs={jobs} />
      </div>

      {/* Trendy Section Modal */}
      <TrendySection show={showTrendyModal} onHide={() => setShowTrendyModal(false)} />

      {/* Template Detail Modal */}
      <Modal show={!!selectedTemplateDetail} onHide={handleCloseTemplateDetail} size="lg" centered>
        {selectedTemplateDetail && (
          <>
            <Modal.Header
              closeButton
              style={{
                background: `linear-gradient(90deg, ${selectedTemplateDetail.color}, ${selectedTemplateDetail.color}80)`,
                color: '#fff'
              }}
            >
              <Modal.Title>
                {selectedTemplateDetail.icon} {selectedTemplateDetail.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: '#1a1a2e' }}>
              <p style={{ color: '#8892b0', marginBottom: '20px' }}>
                {selectedTemplateDetail.description}
              </p>

              <div className="d-flex gap-3 mb-4 flex-wrap">
                <Badge bg="info">⏱️ {selectedTemplateDetail.estimatedHours}h</Badge>
                <Badge bg="warning" style={{ color: '#000' }}>⭐ +{selectedTemplateDetail.xpReward} XP</Badge>
                <Badge bg="secondary">{selectedTemplateDetail.skills.length} dovedností</Badge>
              </div>

              <h5 style={{ color: '#fff', marginBottom: '15px' }}>📋 Checklist Úkolů</h5>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <small style={{ color: '#8892b0' }}>Pokrok</small>
                  <small style={{ color: '#fff' }}>
                    {templateMilestonesProgress[selectedTemplateDetail.id]?.length || 0}/{selectedTemplateDetail.suggestedMilestones.length}
                  </small>
                </div>
                <ProgressBar
                  now={((templateMilestonesProgress[selectedTemplateDetail.id]?.length || 0) / selectedTemplateDetail.suggestedMilestones.length) * 100}
                  variant="success"
                  style={{ height: '10px' }}
                  animated
                />
              </div>

              <ListGroup>
                {selectedTemplateDetail.suggestedMilestones.map((milestone, idx) => {
                  const isCompleted = templateMilestonesProgress[selectedTemplateDetail.id]?.includes(milestone);
                  return (
                    <ListGroup.Item
                      key={idx}
                      style={{
                        background: isCompleted ? 'rgba(76,175,80,0.2)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        cursor: 'pointer',
                        marginBottom: '8px',
                        borderRadius: '10px'
                      }}
                      onClick={() => handleToggleTemplateMilestone(selectedTemplateDetail.id, milestone)}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: isCompleted ? '#4CAF50' : 'transparent',
                            border: `2px solid ${isCompleted ? '#4CAF50' : '#667eea'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {isCompleted && '✓'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <span style={{
                            color: '#fff',
                            textDecoration: isCompleted ? 'line-through' : 'none',
                            opacity: isCompleted ? 0.6 : 1
                          }}>
                            {milestone}
                          </span>
                        </div>
                        <Badge bg="success" style={{ opacity: isCompleted ? 1 : 0 }}>
                          +100 XP
                        </Badge>
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>

              <h6 style={{ color: '#fff', marginTop: '20px', marginBottom: '10px' }}>🎯 Cíle</h6>
              <ul style={{ color: '#8892b0' }}>
                {selectedTemplateDetail.defaultGoals.map((goal, idx) => (
                  <li key={idx}>{goal}</li>
                ))}
              </ul>

              <h6 style={{ color: '#fff', marginTop: '15px', marginBottom: '10px' }}>💡 Dovednosti k rozvoji</h6>
              <div className="d-flex gap-2 flex-wrap">
                {selectedTemplateDetail.skills.map((skill, idx) => (
                  <Badge key={idx} bg="primary">{skill}</Badge>
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer style={{ background: '#1a1a2e' }}>
              <Button variant="secondary" onClick={handleCloseTemplateDetail}>
                Zavřít
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      <Modal show={showNextStepModal} onHide={() => setShowNextStepModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ background: getFocusedProject()?.color || '#667eea', color: '#fff' }}>
          <Modal.Title>🎯 DALŠÍ KROK</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a2e' }}>
          {getNextStep() && (
            <>
              <div className="text-center mb-4">
                <h4 style={{ color: '#fff' }}>{getNextStep()?.title}</h4>
                <p style={{ color: '#aaa' }}>{getNextStep()?.description}</p>
              </div>

              <h6 style={{ color: '#fff', marginBottom: '15px' }}>💡 PROČ JE TO DŮLEŽITÉ:</h6>
              {getNextStep()?.benefits && getNextStep()!.benefits.length > 0 ? (
                <div className="benefits-list">
                  {getNextStep()!.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="benefit-item mb-3 p-3"
                      style={{
                        background: 'rgba(76, 175, 80, 0.1)',
                        borderLeft: '4px solid #4CAF50',
                        borderRadius: '0 8px 8px 0'
                      }}
                    >
                      <div className="d-flex align-items-start gap-3">
                        <span style={{ fontSize: '1.2rem' }}>💡</span>
                        <span style={{ color: '#fff', fontSize: '0.95rem' }}>{benefit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="sleep-benefits-chapters">
                  <div className="mb-4">
                    <h5 style={{ color: '#4fc3f7', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.5rem' }}>😴</span> SPÁNEK - Tvůj superpower
                    </h5>
                    <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>
                      Během spánku se děje něco magického. Tvé tělo a mozek pracují na plné obrátky, aby tě připravily na další den. Spánek není ztráta času - je to investice do tvé budoucnosti.
                    </p>
                  </div>

                  <div className="benefit-chapter mb-4 p-3" style={{ background: 'linear-gradient(135deg, rgba(76,175,80,0.15) 0%, rgba(76,175,80,0.05) 100%)', borderRadius: '12px', border: '1px solid rgba(76,175,80,0.3)' }}>
                    <h6 style={{ color: '#81c784', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span>🧠</span> KAPITOLA 1: Paměť a učení
                    </h6>
                    <p style={{ color: '#ccc', fontSize: '0.85rem', marginBottom: '10px' }}>
                      Věděl jsi, že během spánku mozek doslova "přepisuje" to, co ses naučil? Synapse se posilují, důležité informace se ukládají do dlouhodobé paměti a nepodstatné detaily se mažou.
                    </p>
                    <ul style={{ color: '#aaa', fontSize: '0.8rem', paddingLeft: '20px' }}>
                      <li style={{ marginBottom: '6px' }}>📈 <strong> Lepší paměť o 20-40%</strong> - informace se lépe pamatují po kvalitním spánku</li>
                      <li style={{ marginBottom: '6px' }}>🔄 <strong> Konsolidace paměti</strong> - mozek třídí a ukládá zážitky z celého dne</li>
                      <li style={{ marginBottom: '6px' }}>🎯 <strong> Jasnější myšlení</strong> - ráno vstaneš s "čistější hlavou"</li>
                      <li style={{ marginBottom: '6px' }}>📚 <strong> Lepší učení</strong> - kurz, který jsi studoval večer, si zapamatuješ lépe než ten, který jsi studoval pozdě v noci</li>
                    </ul>
                  </div>

                  <div className="benefit-chapter mb-4 p-3" style={{ background: 'linear-gradient(135deg, rgba(33,150,243,0.15) 0%, rgba(33,150,243,0.05) 100%)', borderRadius: '12px', border: '1px solid rgba(33,150,243,0.3)' }}>
                    <h6 style={{ color: '#64b5f6', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span>💪</span> KAPITOLA 2: Fyzické zdraví a regenerace
                    </h6>
                    <p style={{ color: '#ccc', fontSize: '0.85rem', marginBottom: '10px' }}>
                      Spánek je tvůj zdarma regenerační program. Tělo produkuje růstový hormon, opravuje poškozené buňky a posiluje imunitní systém. Bez spánku se tělo nemůže správně zotavit.
                    </p>
                    <ul style={{ color: '#aaa', fontSize: '0.8rem', paddingLeft: '20px' }}>
                      <li style={{ marginBottom: '6px' }}>🔧 <strong> Oprava buněk</strong> - tělo opravuje svaly, kůži a vnitřní orgány</li>
                      <li style={{ marginBottom: '6px' }}>🛡️ <strong> Silnější imunita</strong> - produkce protilátek a imunitních buněk</li>
                      <li style={{ marginBottom: '6px' }}>🏋️ <strong> Lepší sportovní výkon</strong> - svaly rostou a regenerují během spánku</li>
                      <li style={{ marginBottom: '6px' }}>❤️ <strong> Zdravé srdce</strong> - snížení rizika srdečních chorob o 30-50%</li>
                      <li style={{ marginBottom: '6px' }}>⚖️ <strong> Hormonální rovnováha</strong> - správná hladina kortizolu a melatoninu</li>
                    </ul>
                  </div>

                  <div className="benefit-chapter mb-4 p-3" style={{ background: 'linear-gradient(135deg, rgba(255,193,7,0.15) 0%, rgba(255,193,7,0.05) 100%)', borderRadius: '12px', border: '1px solid rgba(255,193,7,0.3)' }}>
                    <h6 style={{ color: '#ffd54f', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span>🎭</span> KAPITOLA 3: Emocionální stabilita
                    </h6>
                    <p style={{ color: '#ccc', fontSize: '0.85rem', marginBottom: '10px' }}>
                      Pamatuj si, jak jsi byl podrážděný po špatné noci? Spánek přímo ovlivňuje limbický systém v mozku - centrum emocí. Nedostatek spánku = emocionální horská dráha.
                    </p>
                    <ul style={{ color: '#aaa', fontSize: '0.8rem', paddingLeft: '20px' }}>
                      <li style={{ marginBottom: '6px' }}>😊 <strong> Lepší nálada</strong> - snížení rizika deprese a úzkosti</li>
                      <li style={{ marginBottom: '6px' }}>😤 <strong> Menší stres</strong> - nižší hladina stresových hormonů</li>
                      <li style={{ marginBottom: '6px' }}>🤝 <strong> Lepší vztahy</strong> - jsi trpělivější a empatičtější</li>
                      <li style={{ marginBottom: '6px' }}>🎭 <strong> Lepší sebekontrola</strong> - odoláváš impulzivním rozhodnutím</li>
                      <li style={{ marginBottom: '6px' }}>☀️ <strong> Pozitivní pohled</strong> - ráno vstaneš s optimismem</li>
                    </ul>
                  </div>

                  <div className="benefit-chapter mb-4 p-3" style={{ background: 'linear-gradient(135deg, rgba(156,39,176,0.15) 0%, rgba(156,39,176,0.05) 100%)', borderRadius: '12px', border: '1px solid rgba(156,39,176,0.3)' }}>
                    <h6 style={{ color: '#ba68c8', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span>🚀</span> KAPITOLA 4: Produktivita a kreativita
                    </h6>
                    <p style={{ color: '#ccc', fontSize: '0.85rem', marginBottom: '10px' }}>
                      Firemní manažeři a úspěšní podnikatelé to vědí - produktivita není o tom, jak dlouho pracuješ, ale jak efektivně. A efektivita začíná kvalitním spánkem.
                    </p>
                    <ul style={{ color: '#aaa', fontSize: '0.8rem', paddingLeft: '20px' }}>
                      <li style={{ marginBottom: '6px' }}>⚡ <strong> Vyšší energie</strong> - celodenní vitalita bez kofeinu</li>
                      <li style={{ marginBottom: '6px' }}>🎯 <strong> Lepší soustředění</strong> - zvládneš 2x více práce za kratší dobu</li>
                      <li style={{ marginBottom: '6px' }}>💡 <strong> Větší kreativita</strong> - mozek spojuje nečekané myšlenky</li>
                      <li style={{ marginBottom: '6px' }}>⏰ <strong> Rychlejší rozhodování</strong> - jasnější myšlení = lepší choices</li>
                      <li style={{ marginBottom: '6px' }}>📉 <strong> Méně chyb</strong> - snížení chybovosti o 50%</li>
                    </ul>
                  </div>

                  <div className="benefit-chapter mb-4 p-3" style={{ background: 'linear-gradient(135deg, rgba(244,67,54,0.15) 0%, rgba(244,67,54,0.05) 100%)', borderRadius: '12px', border: '1px solid rgba(244,67,54,0.3)' }}>
                    <h6 style={{ color: '#ef5350', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span>⚖️</span> KAPITOLA 5: Metabolismus a hubnutí
                    </h6>
                    <p style={{ color: '#ccc', fontSize: '0.85rem', marginBottom: '10px' }}>
                      Chceš zhubnout? Spánek je tvůj nejlepší spojenec. Hormony ghrelin (hlad) a leptin (sytost) jsou přímo ovlivněny kvalitou spánku. Nedostatek spánku = více chuti k jídlu.
                    </p>
                    <ul style={{ color: '#aaa', fontSize: '0.8rem', paddingLeft: '20px' }}>
                      <li style={{ marginBottom: '6px' }}>🍽️ <strong> Menší chuť k jídlu</strong> - snížení chuti na sladké a tučné</li>
                      <li style={{ marginBottom: '6px' }}>🔥 <strong> Rychlejší metabolismus</strong> - tělo efektivněji spaluje kalorie</li>
                      <li style={{ marginBottom: '6px' }}>💧 <strong> Lepší hydratace</strong> - dostatek spánku = funkční ledviny</li>
                      <li style={{ marginBottom: '6px' }}>🏃 <strong> Lepší sportovní výkon</strong> - více energie pro cvičení</li>
                      <li style={{ marginBottom: '6px' }}>📊 <strong> Stabilní cukr v krvi</strong> - snížení rizika diabetu 2. typu</li>
                    </ul>
                  </div>

                  <div className="benefit-chapter mb-4 p-3" style={{ background: 'linear-gradient(135deg, rgba(0,188,212,0.15) 0%, rgba(0,188,212,0.05) 100%)', borderRadius: '12px', border: '1px solid rgba(0,188,212,0.3)' }}>
                    <h6 style={{ color: '#4dd0e1', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span>🛡️</span> KAPITOLA 6: Dlouhověkost a prevence
                    </h6>
                    <p style={{ color: '#ccc', fontSize: '0.85rem', marginBottom: '10px' }}>
                      Spánek je nejlevnější lék na světě. Studie ukazují, že lidé, kteří spí 7-9 hodin denně, žijí déle a mají nižší riziko chronických nemocí.
                    </p>
                    <ul style={{ color: '#aaa', fontSize: '0.8rem', paddingLeft: '20px' }}>
                      <li style={{ marginBottom: '6px' }}>🧬 <strong> Zpomalení stárnutí</strong> - buňky se regenerují efektivněji</li>
                      <li style={{ marginBottom: '6px' }}>🧠 <strong> Prevence Alzheimeru</strong> - mozek se čistí od toxinů</li>
                      <li style={{ marginBottom: '6px' }}>🎯 <strong> Nižší riziko rakoviny</strong> - silnější imunitní dohled</li>
                      <li style={{ marginBottom: '6px' }}>💊 <strong> Lepší účinek léků</strong> - tělo je lépe připraveno je vstřebat</li>
                      <li style={{ marginBottom: '6px' }}>🌙 <strong> Zdravá pleť</strong> - kolagen se produkuje v noci</li>
                    </ul>
                  </div>

                  <div className="mt-4 p-3" style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h6 style={{ color: '#fff', marginBottom: '15px', textAlign: 'center' }}>🎯 KLÍČOVÉ ZÁVĚRY</h6>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                      <div className="text-center p-2" style={{ background: 'rgba(76,175,80,0.1)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>⏰</div>
                        <div style={{ color: '#fff', fontSize: '0.85rem' }}>7-9 hodin</div>
                        <div style={{ color: '#888', fontSize: '0.75rem' }}>Ideální doba</div>
                      </div>
                      <div className="text-center p-2" style={{ background: 'rgba(33,150,243,0.1)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>🌙</div>
                        <div style={{ color: '#fff', fontSize: '0.85rem' }}>Pravidelnost</div>
                        <div style={{ color: '#888', fontSize: '0.75rem' }}>Každý den</div>
                      </div>
                      <div className="text-center p-2" style={{ background: 'rgba(255,193,7,0.1)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>📱</div>
                        <div style={{ color: '#fff', fontSize: '0.85rem' }}>Bez obrazovek</div>
                        <div style={{ color: '#888', fontSize: '0.75rem' }}>1h před spaním</div>
                      </div>
                      <div className="text-center p-2" style={{ background: 'rgba(156,39,176,0.1)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>🌡️</div>
                        <div style={{ color: '#fff', fontSize: '0.85rem' }}>18-20°C</div>
                        <div style={{ color: '#888', fontSize: '0.75rem' }}>Ideální teplota</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <small style={{ color: '#888' }}>
                  ⏱️ Odhadovaný čas: <span style={{ color: '#fff' }}>{getNextStep()?.targetHours || 2} hodin</span>
                </small>
                <small style={{ color: '#888' }}>
                  🏆 XP: <span style={{ color: '#FFD700' }}>+{getNextStep()?.xpReward || 100}</span>
                </small>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer style={{ background: '#1a1a2e' }}>
          <Button variant="secondary" onClick={() => setShowNextStepModal(false)}>
            Zavřít
          </Button>
          <Button variant="info" onClick={() => setShowBenefitsLibraryModal(true)}>
            📚 Knihovna benefitů
          </Button>
          <Link href="/projects">
            <Button variant="primary">
              📊 Otevřít projekt
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>

      <Modal show={showBenefitsLibraryModal} onHide={() => setShowBenefitsLibraryModal(false)} centered size="xl">
        <Modal.Header closeButton style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
          <Modal.Title>📚 Knihovna benefitů</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a2e', maxHeight: '70vh', overflowY: 'auto' }}>
          <p style={{ color: '#aaa', marginBottom: '20px' }}>
            Prozkoumej různé typy benefitů a jejich vliv na tvůj život. Klikni na kategorii pro více detailů.
          </p>
          <p style={{ color: '#888', fontStyle: 'italic', marginBottom: '20px' }}>
            💡 Tady si v budoucnu vybereš typy benefitů, které chceš zobrazovat ve svých dalších krocích.
          </p>
          <Row xs={1} md={2} lg={3} className="g-3">
            {[
              { icon: '😴', title: 'Spánek a odpočinek', color: '#4fc3f7', desc: 'Regenerace těla i mysli', count: 6 },
              { icon: '🧠', title: 'Paměť a učení', color: '#81c784', desc: 'Kognitivní funkce a produktivita', count: 5 },
              { icon: '💪', title: 'Fyzické zdraví', color: '#64b5f6', desc: 'Sport, imunita, energie', count: 5 },
              { icon: '🎭', title: 'Emocionální stabilita', color: '#ffd54f', desc: 'Nálada, stres, vztahy', count: 5 },
              { icon: '🚀', title: 'Produktivita', color: '#ba68c8', desc: 'Kreativita, soustředění, výkon', count: 5 },
              { icon: '⚖️', title: 'Metabolismus', color: '#ef5350', desc: 'Hubnutí, výživa, hormony', count: 5 },
              { icon: '🛡️', title: 'Dlouhověkost', color: '#4dd0e1', desc: 'Prevence, stárnutí, dlouhý život', count: 5 },
              { icon: '💰', title: 'Finance', color: '#4caf50', desc: 'Peníze, kariéra, investice', count: 5 },
              { icon: '👥', title: 'Sociální vztahy', color: '#ff8a65', desc: 'Přátelé, rodina, komunikace', count: 5 },
              { icon: '🎯', title: 'Osobní rozvoj', color: '#7986cb', desc: 'Dovednosti, cíle, růst', count: 5 },
              { icon: '❤️', title: 'Zdraví srdce', color: '#f44336', desc: 'Kardio, cévy, krevní tlak', count: 5 },
              { icon: '🔋', title: 'Energie a vitalita', color: '#ffc107', desc: 'Denní energie, únava, motivace', count: 5 },
            ].map((category, idx) => (
              <Col key={idx}>
                <Card
                  className="h-100"
                  style={{
                    background: `${category.color}15`,
                    border: `1px solid ${category.color}40`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 10px 30px ${category.color}30`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Card.Body className="text-center">
                    <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{category.icon}</div>
                    <h6 style={{ color: '#fff', marginBottom: '5px' }}>{category.title}</h6>
                    <small style={{ color: category.color }}>{category.desc}</small>
                    <div className="mt-2">
                      <Badge bg="dark" style={{ fontSize: '0.7rem' }}>
                        {category.count} kapitol
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ background: '#1a1a2e' }}>
          <Button variant="secondary" onClick={() => setShowBenefitsLibraryModal(false)}>
            Zavřít
          </Button>
        </Modal.Footer>
      </Modal>

    </main>
  );
}
