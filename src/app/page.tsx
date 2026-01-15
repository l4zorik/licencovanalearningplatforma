"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Container, Row, Col, Card, ProgressBar, Badge, Button, Modal, Form, Dropdown, Collapse } from 'react-bootstrap';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Course, Job } from '@/types';
import { SKILL_TEMPLATES } from '@/components/EducationSection';
import { JOB_TEMPLATES } from '@/components/WorkSection';
import ThemeToggle from '@/components/ThemeToggle';

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
      "Automotive & Mechanics": existing.filter(goal =>
        goal.includes("Auto") || goal.includes("Mechanic") || goal.includes("Car") ||
        goal.includes("Vehicle") || goal.includes("Technician")
      ),
      "Data Science & AI": existing.filter(goal =>
        goal.includes("Data") || goal.includes("AI") || goal.includes("Machine Learning") ||
        goal.includes("Analytics") || goal.includes("Scientist")
      )
    };
  })(),

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

type LifeCategory = 'learning' | 'work' | 'relationships' | 'family' | 'friends' | 'future_kids' | 'property' | 'business' | 'investing' | 'competition' | 'envy' | 'psychology' | 'addiction';

interface LifeGoal {
  id: string;
  title: string;
  category: LifeCategory;
  target: number;
  current: number;
  unit: string;
  deadline?: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'active' | 'completed' | 'paused';
  notes?: string;
}

const LIFE_CATEGORIES: { key: LifeCategory; label: string; icon: string; color: string }[] = [
  { key: 'learning', label: '🎓 Učení', icon: '🎓', color: '#4CAF50' },
  { key: 'work', label: '💼 Práce', icon: '💼', color: '#2196F3' },
  { key: 'relationships', label: '💕 Vztahy', icon: '💕', color: '#E91E63' },
  { key: 'family', label: '👨‍👩‍👧 Rodina', icon: '👨‍👩‍👧', color: '#FF9800' },
  { key: 'friends', label: '👥 Kamarádi', icon: '👥', color: '#9C27B0' },
  { key: 'future_kids', label: '👶 Budoucí děti', icon: '👶', color: '#00BCD4' },
  { key: 'property', label: '🏠 Majetek', icon: '🏠', color: '#795548' },
  { key: 'business', label: '🚀 Podnikání', icon: '🚀', color: '#FF5722' },
  { key: 'investing', label: '📈 Investování', icon: '📈', color: '#009688' },
  { key: 'competition', label: '🏆 Konkurence', icon: '🏆', color: '#607D8B' },
  { key: 'envy', label: '😔 Závist', icon: '😔', color: '#9575CD' },
  { key: 'psychology', label: '🧠 Psychika', icon: '🧠', color: '#26A69A' },
  { key: 'addiction', label: '⛔ Závislosti', icon: '⛔', color: '#F44336' },
];

const DEFAULT_GOALS: LifeGoal[] = [
  // Learning
  { id: 'learn1', title: 'Dokončit Python AI kurz', category: 'learning', target: 120, current: 0, unit: 'hodin', priority: 'High', status: 'active' },
  { id: 'learn2', title: 'Naučit se anglicky B2', category: 'learning', target: 200, current: 0, unit: 'hodin', priority: 'High', status: 'active' },
  { id: 'learn3', title: 'Přečíst 24 knih', category: 'learning', target: 24, current: 0, unit: 'knih', priority: 'Medium', status: 'active' },

  // Work
  { id: 'work1', title: 'Roční příjem 2026', category: 'work', target: 1200000, current: 0, unit: 'Kč', priority: 'High', status: 'active' },
  { id: 'work2', title: 'Získat Senior pozici', category: 'work', target: 1, current: 0, unit: 'pozic', priority: 'High', status: 'active' },

  // Relationships
  { id: 'rel1', title: 'Vztah - kvalitní čas', category: 'relationships', target: 52, current: 0, unit: 'rande', priority: 'High', status: 'active' },
  { id: 'rel2', title: 'Komunikace s partnerem', category: 'relationships', target: 365, current: 0, unit: 'dní', priority: 'High', status: 'active' },

  // Family
  { id: 'fam1', title: 'Volání s rodiči', category: 'family', target: 52, current: 0, unit: 'hovorů', priority: 'Medium', status: 'active' },
  { id: 'fam2', title: 'Návštěvy rodiny', category: 'family', target: 24, current: 0, unit: 'návštěv', priority: 'Medium', status: 'active' },

  // Friends
  { id: 'fr1', title: 'Srazy s kamarády', category: 'friends', target: 24, current: 0, unit: 'srazů', priority: 'Medium', status: 'active' },
  { id: 'fr2', title: 'Nových přátel', category: 'friends', target: 5, current: 0, unit: 'lidí', priority: 'Low', status: 'active' },

  // Future Kids
  { id: 'kids1', title: 'Finanční příprava na děti', category: 'future_kids', target: 500000, current: 0, unit: 'Kč', priority: 'High', status: 'active' },
  { id: 'kids2', title: 'Příprava bydlení pro děti', category: 'future_kids', target: 1, current: 0, unit: 'pokoj', priority: 'Medium', status: 'active' },

  // Property
  { id: 'prop1', title: 'Koupě elektrokola (2x)', category: 'property', target: 2, current: 0, unit: 'kol', priority: 'High', status: 'active' },
  { id: 'prop2', title: 'Renovace bytu', category: 'property', target: 100000, current: 0, unit: 'Kč', priority: 'Medium', status: 'active' },

  // Business
  { id: 'biz1', title: 'Založit side project', category: 'business', target: 1, current: 0, unit: 'projekt', priority: 'High', status: 'active' },
  { id: 'biz2', title: 'Pasivní příjem z byznysu', category: 'business', target: 30000, current: 0, unit: 'Kč/měs', priority: 'High', status: 'active' },

  // Investing
  { id: 'inv1', title: 'Investice do akcií', category: 'investing', target: 300000, current: 0, unit: 'Kč', priority: 'High', status: 'active' },
  { id: 'inv2', title: 'Kryptoměny portfolio', category: 'investing', target: 100000, current: 0, unit: 'Kč', priority: 'Medium', status: 'active' },
  { id: 'inv3', title: 'Celkové úspory', category: 'investing', target: 1000000, current: 0, unit: 'Kč', priority: 'High', status: 'active' },

  // Competition
  { id: 'comp1', title: 'Porazit konkurenta X', category: 'competition', target: 1, current: 0, unit: 'cíl', priority: 'Medium', status: 'active' },
  { id: 'comp2', title: 'Stát se #1 v oboru', category: 'competition', target: 1, current: 0, unit: 'pozice', priority: 'Low', status: 'active' },

  // Envy
  { id: 'env1', title: '0x závistivých myšlenek', category: 'envy', target: 365, current: 0, unit: 'dní', priority: 'Medium', status: 'active' },
  { id: 'env2', title: 'Ocenit úspěch druhých', category: 'envy', target: 50, current: 0, unit: ' gratulací', priority: 'Low', status: 'active' },

  // Psychology
  { id: 'psy1', title: 'Meditace', category: 'psychology', target: 200, current: 0, unit: 'dní', priority: 'High', status: 'active' },
  { id: 'psy2', title: 'Denní gratitude', category: 'psychology', target: 365, current: 0, unit: 'dní', priority: 'High', status: 'active' },
  { id: 'psy3', title: 'Psychoterapie sezení', category: 'psychology', target: 24, current: 0, unit: 'sezení', priority: 'Medium', status: 'active' },

  // Addiction
  { id: 'add1', title: 'Sobota bez alkoholu', category: 'addiction', target: 52, current: 0, unit: 'týdnů', priority: 'High', status: 'active' },
  { id: 'add2', title: '0x gambling', category: 'addiction', target: 365, current: 0, unit: 'dní', priority: 'High', status: 'active' },
  { id: 'add3', title: 'Sociální sítě - max 1h denně', category: 'addiction', target: 300, current: 0, unit: 'dní', priority: 'Medium', status: 'active' },
];

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
    modules: [{id: "t1", title: "Basics", isCompleted: true}],
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
  const [lifeGoals, setLifeGoals] = useState<LifeGoal[]>(DEFAULT_GOALS);
  const [isLifeOSExpanded, setIsLifeOSExpanded] = useState(false);
  const [showGoalsManager, setShowGoalsManager] = useState(false);

  // Load life goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('lifeGoals_2026');
    if (savedGoals) {
      try {
        setLifeGoals(JSON.parse(savedGoals));
      } catch (error) {
        console.error('Failed to parse life goals:', error);
      }
    }
  }, []);

  // Save life goals to localStorage
  useEffect(() => {
    localStorage.setItem('lifeGoals_2026', JSON.stringify(lifeGoals));
  }, [lifeGoals]);

  // Update a single goal progress
  const updateGoalProgress = (goalId: string, increment: number) => {
    setLifeGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = Math.max(0, Math.min(goal.target, goal.current + increment));
        return {
          ...goal,
          current: newCurrent,
          status: newCurrent >= goal.target ? 'completed' : goal.status
        };
      }
      return goal;
    }));
  };

  // Get goals by category
  const getGoalsByCategory = (category: LifeCategory) => {
    return lifeGoals.filter(g => g.category === category);
  };

  // Get overall progress
  const getOverallProgress = () => {
    const total = lifeGoals.reduce((acc, g) => acc + g.target, 0);
    const current = lifeGoals.reduce((acc, g) => acc + Math.min(g.current, g.target), 0);
    return total > 0 ? Math.round((current / total) * 100) : 0;
  };

  // Get completed goals count
  const getCompletedCount = () => {
    return lifeGoals.filter(g => g.status === 'completed').length;
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

  // Show loading or redirect if not authenticated
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

        {/* Header / Navbar */}
        <nav className="navbar navbar-dark navbar-glass mb-4 sticky-top shadow-sm">
           <Container fluid>
             <div className="d-flex align-items-center">
                <span className="navbar-brand mb-0 h1 me-4">🚀 Tomas Learning Platform</span>
                 <div className="d-flex gap-2">
                   <Link href="/profile" className="text-decoration-none">
                      <Button variant="outline-primary" size="sm" className="fw-bold">
                        👤 PROFILE
                      </Button>
                    </Link>
                    <Link href="/analytics" className="text-decoration-none">
                     <Button variant="outline-info" size="sm" className="fw-bold">
                       📊 ANALYTICS
                     </Button>
                   </Link>
                   <Button
                      variant="outline-warning"
                      size="sm"
                      className="fw-bold d-flex align-items-center gap-2"
                      onClick={() => setShowMissionModal(true)}
                   >
                      <span>🎯 MISE</span>
                      <Badge bg="warning" text="dark" pill>2 Active</Badge>
                   </Button>
                   <Link href="/training" className="text-decoration-none">
                     <Button variant="outline-primary" size="sm" className="fw-bold">
                       🎓 TRAINING
                     </Button>
                   </Link>
                   <Link href="/career-report" className="text-decoration-none">
                     <Button variant="outline-success" size="sm" className="fw-bold">
                       📈 CAREER REPORT
                     </Button>
                   </Link>
                    <Link href="/courses" className="text-decoration-none">
                       <Button variant="outline-success" size="sm" className="fw-bold">
                         🎓 KURZY
                       </Button>
                     </Link>
                     <Link href="/quick-courses" className="text-decoration-none">
                       <Button variant="outline-warning" size="sm" className="fw-bold">
                         ⚡ RYCHLOKURZY
                       </Button>
                     </Link>
                     <Link href="/articles" className="text-decoration-none">
                       <Button variant="outline-primary" size="sm" className="fw-bold">
                         📝 ČLÁNKY
                       </Button>
                     </Link>
<Link href="/tools" className="text-decoration-none">
                        <Button variant="outline-warning" size="sm" className="fw-bold">
                          🛠️ TOOLS
                        </Button>
                      </Link>
                      <Link href="/agencies" className="text-decoration-none">
                        <Button variant="outline-success" size="sm" className="fw-bold">
                          🏢 AGENTURY
                        </Button>
                      </Link>
                    <Link href="/colleagues" className="text-decoration-none">
                        <Button variant="outline-info" size="sm" className="fw-bold">
                          👥 KOLEGOVÉ
                        </Button>
                      </Link>
                      <Link href="/achievements" className="text-decoration-none">
                        <Button variant="outline-warning" size="sm" className="fw-bold">
                          🏆 ACHIEVEMENTS
                        </Button>
                      </Link>
                       <Link href="/roadmap" className="text-decoration-none">
                         <Button variant="outline-success" size="sm" className="fw-bold">
                           🗺️ ROADMAP
                         </Button>
                       </Link>
                       <Link href="/journey" className="text-decoration-none">
                         <Button variant="outline-primary" size="sm" className="fw-bold">
                           🎯 JOURNEY
                         </Button>
                       </Link>
                       <Button
                      variant="outline-info"
                      size="sm"
                      className="fw-bold d-flex align-items-center gap-2"
                      onClick={() => setShowTrendyModal(true)}
                    >
                      <span>📈 TRENDY</span>
                    </Button>
                   {/* Premium features toggle - for future monetization */}
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
            {/* LIFE OS 2026 - Collapsible Dashboard */}
            <Row className="mb-4">
              <Col>
                <Card className="glass-effect border-0">
                  <Card.Header 
                    className="bg-transparent border-bottom border-secondary text-dark py-3"
                    onClick={() => setIsLifeOSExpanded(!isLifeOSExpanded)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
                          <span style={{ transition: 'transform 0.3s ease', transform: isLifeOSExpanded ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}>
                            ▶
                          </span>
                          🎯 LIFE OS 2026
                        </h4>
                        <Badge bg="success" className="fs-6">
                          {getCompletedCount()}/{lifeGoals.length} Cílů
                        </Badge>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <div className="text-end">
                          <div className="fw-bold text-success">{getOverallProgress()}%</div>
                          <small className="text-white-50">Celkový pokrok</small>
                        </div>
                        <ProgressBar
                          now={getOverallProgress()}
                          style={{ width: '150px', height: '10px' }}
                          variant="success"
                          animated={getOverallProgress() < 100}
                        />
                        <Button
                          variant="outline-light"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowGoalsManager(true);
                          }}
                        >
                          🔧 Spravovat
                        </Button>
                      </div>
                    </div>
                  </Card.Header>
                  <Collapse in={isLifeOSExpanded}>
                    <Card.Body className="p-3">
                      {/* Quick Overview - All Categories */}
                      <Row xs={2} md={3} lg={4} className="g-2">
                        {LIFE_CATEGORIES.slice(0, 8).map((cat) => {
                          const goals = getGoalsByCategory(cat.key);
                          const completed = goals.filter(g => g.status === 'completed').length;
                          const total = goals.length;
                          const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

                          return (
                            <Col key={cat.key}>
                              <Card
                                className="h-100 border-0 shadow-sm"
                                style={{ cursor: 'pointer', background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                                onClick={() => setShowGoalsManager(true)}
                              >
                                <Card.Body className="p-2 text-center">
                                  <div className="fs-4 mb-1">{cat.icon}</div>
                                  <div className="small fw-bold text-truncate" style={{ color: cat.color }}>{cat.label}</div>
                                  <ProgressBar
                                    now={progress}
                                    variant={progress === 100 ? 'success' : 'primary'}
                                    style={{ height: '6px' }}
                                    className="mt-1"
                                  />
                                  <small className="text-muted">{completed}/{total}</small>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>

                      {/* Secondary Categories */}
                      <Row xs={2} md={3} lg={5} className="g-2 mt-2">
                        {LIFE_CATEGORIES.slice(8).map((cat) => {
                          const goals = getGoalsByCategory(cat.key);
                          const completed = goals.filter(g => g.status === 'completed').length;
                          const total = goals.length;
                          const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

                          return (
                            <Col key={cat.key}>
                              <Card
                                className="h-100 border-0 shadow-sm"
                                style={{ cursor: 'pointer', background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                                onClick={() => setShowGoalsManager(true)}
                              >
                                <Card.Body className="p-2 text-center">
                                  <div className="fs-4 mb-1">{cat.icon}</div>
                                  <div className="small fw-bold text-truncate" style={{ color: cat.color }}>{cat.label}</div>
                                  <ProgressBar
                                    now={progress}
                                    variant={progress === 100 ? 'success' : 'primary'}
                                    style={{ height: '6px' }}
                                    className="mt-1"
                                  />
                                  <small className="text-muted">{completed}/{total}</small>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                    </Card.Body>
                  </Collapse>
                </Card>
              </Col>
            </Row>

            {/* Top Banner Ad */}
            <AdBanner position="top" size="large" />

            <Row>
              {/* Left Side: Education */}
              <Col md={6} className="mb-4">
                <EducationSection
                  myCourses={courses}
                  setCourses={setCourses}
                />
              </Col>

               {/* Right Side: Work */}
               <Col md={6} className="mb-4">
                 <WorkSection myCourses={courses} setCourses={setCourses} />

                {/* Sidebar Ad */}
                <AdBanner position="sidebar" size="medium" />
              </Col>
            </Row>
        </Container>

        {/* --- GOALS MANAGER MODAL --- */}
        <Modal show={showGoalsManager} onHide={() => setShowGoalsManager(false)} size="xl" centered contentClassName="glass-modal">
          <Modal.Header closeButton className="bg-dark text-white border-secondary">
            <Modal.Title className="fw-bold">🎯 Správce Cílů - LIFE OS 2026</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white p-0" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <Row className="g-0">
              {/* LEFT SIDE: Add New Goal */}
              <Col md={4} className="border-end border-secondary p-4" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <h5 className="fw-bold mb-4 text-warning">➕ Přidat Nový Cíl</h5>
                
                <Form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newGoal: LifeGoal = {
                    id: `custom_${Date.now()}`,
                    title: formData.get('title') as string,
                    category: formData.get('category') as LifeCategory,
                    target: parseFloat(formData.get('target') as string) || 1,
                    current: 0,
                    unit: formData.get('unit') as string,
                    priority: formData.get('priority') as 'High' | 'Medium' | 'Low',
                    status: 'active'
                  };
                  setLifeGoals(prev => [...prev, newGoal]);
                  (e.target as HTMLFormElement).reset();
                }}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white-50">Název cíle</Form.Label>
                    <Form.Control name="title" required placeholder="např. Přečíst knihu" className="bg-dark text-white border-secondary" />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white-50">Kategorie</Form.Label>
                    <Form.Select name="category" required className="bg-dark text-white border-secondary">
                      {LIFE_CATEGORIES.map(cat => (
                        <option key={cat.key} value={cat.key}>{cat.icon} {cat.label}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  
                  <Row>
                    <Col xs={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-white-50">Cílová hodnota</Form.Label>
                        <Form.Control name="target" type="number" required min="1" defaultValue="1" className="bg-dark text-white border-secondary" />
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-white-50">Jednotka</Form.Label>
                        <Form.Control name="unit" required placeholder="např. hodin, Kč" className="bg-dark text-white border-secondary" />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="text-white-50">Priorita</Form.Label>
                    <Form.Select name="priority" required className="bg-dark text-white border-secondary">
                      <option value="High">🔴 Vysoká</option>
                      <option value="Medium">🟡 Střední</option>
                      <option value="Low">🟢 Nízká</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Button type="submit" variant="warning" className="w-100 fw-bold">
                    ✅ Přidat Cíl
                  </Button>
                </Form>

                <hr className="border-secondary my-4" />

                {/* Bulk Actions */}
                <h6 className="fw-bold mb-3 text-info">🗑️ Hromadné Akce</h6>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  className="w-100 mb-2"
                  onClick={() => {
                    const completedGoals = lifeGoals.filter(g => g.status === 'completed');
                    if (completedGoals.length === 0) {
                      alert('Nejsou žádné dokončené cíle k odstranění.');
                      return;
                    }
                    if (window.confirm(`Opravdu chcete odstranit ${completedGoals.length} dokončených cílů?`)) {
                      setLifeGoals(prev => prev.filter(g => g.status !== 'completed'));
                    }
                  }}
                >
                  🗑️ Odstranit dokončené ({lifeGoals.filter(g => g.status === 'completed').length})
                </Button>
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  className="w-100"
                  onClick={() => {
                    if (lifeGoals.length === 0) {
                      alert('Nejsou žádné cíle k resetování.');
                      return;
                    }
                    if (window.confirm('Opravdu chcete resetovat všechny cíle (vynulovat progress)?')) {
                      setLifeGoals(prev => prev.map(g => ({ ...g, current: 0, status: 'active' })));
                    }
                  }}
                >
                  🔄 Resetovat všechen progress
                </Button>
              </Col>

              {/* RIGHT SIDE: Goals List */}
              <Col md={8} className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">📋 Všechny Cíle ({lifeGoals.length})</h5>
                  <div className="d-flex gap-2">
                    {['active', 'completed', 'paused'].map(filter => (
                      <Button 
                        key={filter} 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => {}}
                        className="text-capitalize"
                      >
                        {filter === 'active' ? 'Aktivní' : filter === 'completed' ? 'Dokončené' : 'Pozastavené'}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="d-flex flex-column gap-2">
                  {lifeGoals.length === 0 ? (
                    <div className="text-center py-5 text-white-50">
                      <div className="fs-1 mb-3">🎯</div>
                      <p>Zatím žádné cíle. Přidej svůj první cíl!</p>
                    </div>
                  ) : (
                    lifeGoals.map((goal) => {
                      const cat = LIFE_CATEGORIES.find(c => c.key === goal.category);
                      const progress = Math.round((goal.current / goal.target) * 100);
                      const isCompleted = goal.status === 'completed';

                      return (
                        <Card 
                          key={goal.id} 
                          className={`border-0 shadow-sm ${isCompleted ? 'bg-success bg-opacity-10' : ''}`}
                          style={{ background: `${cat?.color}10`, border: `1px solid ${cat?.color}30` }}
                        >
                          <Card.Body className="p-3">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center gap-2 mb-1">
                                  <span>{cat?.icon || '🎯'}</span>
                                  <h6 className="mb-0 fw-bold">{goal.title}</h6>
                                </div>
                                <small className="text-white-50">
                                  {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
                                </small>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <Badge bg={isCompleted ? 'success' : goal.priority === 'High' ? 'danger' : goal.priority === 'Medium' ? 'warning' : 'secondary'}>
                                  {isCompleted ? '🎉 Dokončeno' : goal.priority}
                                </Badge>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => {
                                    if (window.confirm(`Opravdu chcete odstranit cíl "${goal.title}"?`)) {
                                      setLifeGoals(prev => prev.filter(g => g.id !== goal.id));
                                    }
                                  }}
                                  title="Odstranit"
                                >
                                  🗑️
                                </Button>
                              </div>
                            </div>

                            <ProgressBar
                              now={progress}
                              variant={isCompleted ? 'success' : 'primary'}
                              style={{ height: '8px' }}
                              animated={!isCompleted && goal.current > 0}
                            />

                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <small className={isCompleted ? 'text-success' : 'text-white-50'}>
                                {progress}% {isCompleted && '✓'}
                              </small>

                              <div className="d-flex gap-1">
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() => updateGoalProgress(goal.id, 1)}
                                  disabled={isCompleted}
                                  title="+1"
                                >
                                  +
                                </Button>
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() => updateGoalProgress(goal.id, -1)}
                                  disabled={goal.current === 0}
                                  title="-1"
                                >
                                  -
                                </Button>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => updateGoalProgress(goal.id, Math.ceil(goal.target * 0.1))}
                                  disabled={isCompleted}
                                  title="+10%"
                                >
                                  +10%
                                </Button>
                                <Button
                                  variant="outline-warning"
                                  size="sm"
                                  onClick={() => {
                                    const increment = goal.target - goal.current;
                                    if (increment > 0 && window.confirm(`Přidat ${increment} k cíli "${goal.title}"?`)) {
                                      updateGoalProgress(goal.id, increment);
                                    }
                                  }}
                                  disabled={isCompleted || goal.current >= goal.target}
                                  title="Dokončit"
                                >
                                  ✓
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      );
                    })
                  )}
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>

        {/* --- MISSION CONTROL MODAL --- */}
        <Modal show={showMissionModal} onHide={() => setShowMissionModal(false)} size="xl" centered contentClassName="border-0 bg-transparent">
          <div className="bg-dark text-white rounded-3 shadow-lg overflow-hidden" style={{minHeight: '80vh', border: '1px solid #333'}}>
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
                                          <ProgressBar now={40} variant="info" style={{height: '4px'}} className="mt-2 bg-secondary"/>
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
                      <Col md={4} className="bg-gradient-dark p-4 d-flex flex-column justify-content-center align-items-center position-relative" style={{background: 'linear-gradient(to right, #212529, #1a1d20)'}}>
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
                                          <ProgressBar now={role.progress} variant="success" className="mb-3 bg-dark" style={{height: '8px'}} />

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
          <AkizeGuide courses={courses} jobs={jobs} />

          {/* Trendy Section Modal */}
          <TrendySection show={showTrendyModal} onHide={() => setShowTrendyModal(false)} />

       </main>
     );
   }
