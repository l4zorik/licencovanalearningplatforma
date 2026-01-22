"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, Badge, ProgressBar, Button, Modal, ListGroup, Form, Row, Col, Tabs, Tab, Dropdown, Toast, ToastContainer } from 'react-bootstrap';
import { Course, Job, JobStatus, JobCategory } from '@/types';
import { SKILL_TEMPLATES } from './EducationSection';
import { AGENCY_JOBS, CZECH_AGENCIES } from '@/lib/data/agencies';

// Archive drop zone for drag and drop
const ArchiveDropZone = ({ onDrop }: { onDrop: (jobId: number) => void }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const jobId = parseInt(e.dataTransfer.getData('text/plain'));
    if (jobId) {
      onDrop(jobId);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded p-3 text-center text-muted ${isOver ? 'border-danger bg-danger bg-opacity-10' : 'border-secondary'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ minHeight: '100px', transition: 'all 0.2s' }}
    >
      <div className="fs-2 mb-2">🗂️</div>
      <div>Drop here to archive job</div>
    </div>
  );
};

type Props = {
  myCourses: Course[];
  setCourses?: React.Dispatch<React.SetStateAction<Course[]>>;
};

// --- ENHANCED JOB TEMPLATES ---
export const JOB_TEMPLATES: (Partial<Job> & { category: JobCategory })[] = [
  // --- PROGRAMMING: FRONTEND ---
  {
    title: "Junior React Developer",
    company: "Start-up Inc.",
    category: "Programming",
    requiredSkills: ["React", "TypeScript", "Git", "HTML/CSS"],
    location: "Remote",
    salaryRange: "45k - 65k CZK",
    difficulty: 1,
    perks: ["Remote", "Mentoring", "MacBook"]
  },
  {
    title: "Senior Next.js Engineer",
    company: "E-Commerce Giant",
    category: "Programming",
    requiredSkills: ["React", "Next.js", "TypeScript", "Tailwind", "GraphQL"],
    location: "Prague / Hybrid",
    salaryRange: "110k - 160k CZK",
    difficulty: 4,
    perks: ["Stock Options", "Gym", "Hybrid", "Conferences"]
  },
  
  // --- PROGRAMMING: BACKEND ---
  {
    title: "Node.js Backend Dev",
    company: "FinTech s.r.o.",
    category: "Programming",
    requiredSkills: ["Node.js", "Express", "TypeScript", "SQL", "API"],
    location: "Brno",
    salaryRange: "70k - 100k CZK",
    difficulty: 3,
    perks: ["Modern Tech", "Relax Zone", "Education Budget"]
  },
  {
    title: "Java Enterprise Architect",
    company: "Bank Corp",
    category: "Programming",
    requiredSkills: ["Java", "Spring", "Microservices", "Kafka", "Docker"],
    location: "Prague",
    salaryRange: "120k - 180k CZK",
    difficulty: 5,
    perks: ["Stability", "Bonuses", "5 Weeks Vacation"]
  },
  {
    title: ".NET C# Developer",
    company: "Software House",
    category: "Programming",
    requiredSkills: ["C#", ".NET", "Azure", "Entity Framework"],
    location: "Ostrava / Remote",
    salaryRange: "60k - 90k CZK",
    difficulty: 3,
    perks: ["Certifications", "Modern Office", "Xbox"]
  },
  {
    title: "Senior .NET Backend Developer",
    company: "Enterprise Tech Company",
    category: "Programming",
    requiredSkills: ["C#", ".NET 8", "ASP.NET Core", "PostgreSQL", "Docker", "Kubernetes", "REST API"],
    location: "Prague / Hybrid",
    salaryRange: "120k - 180k CZK",
    difficulty: 5,
    perks: ["Stock Options", "Flexible Hours", "Modern Tech Stack", "Mentoring"]
  },
  {
    title: "Microservices Architect (.NET)",
    company: "FinTech Scale-up",
    category: "Programming",
    requiredSkills: [".NET", "Microservices", "Docker", "Kubernetes", "gRPC", "Kafka", "PostgreSQL", "Redis"],
    location: "Remote / EU",
    salaryRange: "150k - 220k CZK",
    difficulty: 5,
    perks: ["High Impact", "Modern Architecture", "Conference Budget", "Remote First"]
  },
  {
    title: "PostgreSQL Database Engineer",
    company: "Data Platform Company",
    category: "Programming",
    requiredSkills: ["PostgreSQL", "plpgsql", "Performance Tuning", "Indexing", "ETL", "Data Modeling"],
    location: "Prague",
    salaryRange: "100k - 150k CZK",
    difficulty: 4,
    perks: ["Data Team", "Big Data", "Cloud Infrastructure"]
  },
  {
    title: "Backend Engineer (Event-Driven)",
    company: "Event Streaming Platform",
    category: "Programming",
    requiredSkills: ["C#", ".NET", "Kafka", "RabbitMQ", "Event Sourcing", "CQRS", "PostgreSQL", "Redis"],
    location: "Remote (EU)",
    salaryRange: "130k - 190k CZK",
    difficulty: 5,
    perks: ["Event-Driven Architecture", "Modern Stack", "Learning Budget"]
  },
  {
    title: "T-SQL Developer",
    company: "Energy Data Systems",
    category: "Programming",
    requiredSkills: ["T-SQL", "SQL Server", "Database", "Data Warehouse", "ETL", "Performance Tuning"],
    location: "Praha",
    salaryRange: "80k - 120k CZK",
    difficulty: 4,
    perks: ["Energy Sector", "Stable Company", "Data Warehouse"]
  },
  {
    title: "Snowflake Data Engineer",
    company: "Modern Data Platform",
    category: "Programming",
    requiredSkills: ["Snowflake", "SQL", "Python", "Data Engineering", "ETL", "Data Modeling"],
    location: "Celá ČR / Remote",
    salaryRange: "90k - 140k CZK",
    difficulty: 4,
    perks: ["Modern Stack", "Cloud Data", "Growth Opportunities"]
  },
  {
    title: "Data Engineer (AI/ML Focus)",
    company: "AI & Data Company",
    category: "Programming",
    requiredSkills: ["Python", "SQL", "Data Engineering", "Machine Learning", "Data Platform", "Spark"],
    location: "Celá ČR / Remote",
    salaryRange: "100k - 150k CZK",
    difficulty: 4,
    perks: ["AI/ML", "Modern Platform", "Innovation"]
  },
  {
    title: "Cloud Architect - Microsoft Azure",
    company: "Enterprise Solutions",
    category: "Programming",
    requiredSkills: ["Azure", "Cloud Architecture", "DevOps", "Kubernetes", "Terraform", "Infrastructure as Code"],
    location: "Praha / Plzeň / Remote",
    salaryRange: "130k - 200k CZK",
    difficulty: 5,
    perks: ["Enterprise Projects", "Azure Expert", "Architecture Team"]
  },
  {
    title: "DevOps Engineer / Specialist",
    company: "Tech Infrastructure Co.",
    category: "Programming",
    requiredSkills: ["Docker", "Kubernetes", "CI/CD", "Terraform", "AWS", "Azure", "Linux", "Automation"],
    location: "Celá ČR / Remote",
    salaryRange: "100k - 160k CZK",
    difficulty: 4,
    perks: ["Automation Focus", "Cloud Infrastructure", "DevOps Culture"]
  },
  {
    title: "Cloud Kubernetes Engineer",
    company: "Cloud Native Company",
    category: "Programming",
    requiredSkills: ["Kubernetes", "Docker", "Azure", "AWS", "GCP", "Service Mesh", "Observability"],
    location: "Praha / Remote",
    salaryRange: "120k - 180k CZK",
    difficulty: 5,
    perks: ["Kubernetes Focus", "Cloud Native", "Modern Stack"]
  },
  {
    title: "Java Developer (Enterprise)",
    company: "Software Solutions",
    category: "Programming",
    requiredSkills: ["Java", "Spring Boot", "Microservices", "SQL", "Docker", "REST APIs"],
    location: "Celá ČR",
    salaryRange: "80k - 130k CZK",
    difficulty: 4,
    perks: ["Enterprise Projects", "Spring Framework", "Team Collaboration"]
  },
  {
    title: "Automated Tester / QA Engineer",
    company: "Quality Assurance Team",
    category: "Programming",
    requiredSkills: ["Testing", "Selenium", "Cypress", "Playwright", "Test Automation", "CI/CD", "API Testing"],
    location: "Celá ČR / Remote",
    salaryRange: "60k - 100k CZK",
    difficulty: 3,
    perks: ["Quality Focus", "Automation", "Career Growth"]
  },
  {
    title: "Power BI Specialist",
    company: "BI & Analytics Team",
    category: "Programming",
    requiredSkills: ["Power BI", "DAX", "Data Modeling", "SQL", "Data Visualization", "Reporting"],
    location: "Praha",
    salaryRange: "70k - 120k CZK",
    difficulty: 3,
    perks: ["BI Projects", "Visualization", "Data Analytics"]
  },
  {
    title: "React/Angular Developer",
    company: "Web Development Agency",
    category: "Programming",
    requiredSkills: ["React", "Angular", "TypeScript", "JavaScript", "HTML/CSS", "REST APIs"],
    location: "Praha / Remote",
    salaryRange: "70k - 120k CZK",
    difficulty: 3,
    perks: ["Modern Frontend", "Creative Projects", "Tech Stack"]
  },

  {
    title: "Python Data Engineer",
    company: "DataSentics",
    category: "Programming",
    requiredSkills: ["Python", "SQL", "Pandas", "Airflow", "ETL"],
    location: "Remote",
    salaryRange: "90k - 130k CZK",
    difficulty: 4,
    perks: ["Big Data", "Cloud", "Flexibility"]
  },
  {
    title: "Go Systems Engineer",
    company: "Cloud Infra Ltd.",
    category: "Programming",
    requiredSkills: ["Go", "Linux", "Networking", "Kubernetes"],
    location: "Remote (EU)",
    salaryRange: "140k - 200k CZK",
    difficulty: 5,
    perks: ["High Salary", "Full Remote", "Challenging Work"]
  },

  // --- PROGRAMMING: SPECIAL ---
  {
    title: "DevOps Engineer (AWS)",
    company: "Cloud Solutions",
    category: "Programming",
    requiredSkills: ["AWS", "Docker", "K8s", "Terraform", "CI/CD"],
    location: "Remote",
    salaryRange: "100k - 150k CZK",
    difficulty: 4,
    perks: ["Full Remote", "Certification Bonus"]
  },
  {
    title: "CyberSecurity Analyst",
    company: "Gov / Security Firm",
    category: "Programming",
    requiredSkills: ["Security", "Linux", "Network", "Pentest"],
    location: "Prague",
    salaryRange: "80k - 130k CZK",
    difficulty: 5,
    perks: ["Clearance", "Impact", "Training"]
  },
  {
    title: "Mobile Dev (Flutter)",
    company: "App Agency",
    category: "Programming",
    requiredSkills: ["Flutter", "Dart", "Mobile", "Firebase"],
    location: "Remote",
    salaryRange: "60k - 90k CZK",
    difficulty: 2,
    perks: ["Variety of Projects", "Young Team"]
  },

  // --- GAME DEV ---
  {
    title: "Unity Game Developer",
    company: "Mobile Games Studio",
    category: "3D & GameDev",
    requiredSkills: ["Unity", "C#", "Mobile", "2D/3D"],
    location: "Remote",
    salaryRange: "60k - 90k CZK",
    difficulty: 2,
    perks: ["Revenue Share", "Creative", "Flexibility"]
  },
  {
    title: "Unreal Engine Specialist",
    company: "AAA Studio",
    category: "3D & GameDev",
    requiredSkills: ["UE5", "C++", "Blueprints", "3D Math"],
    location: "Prague",
    salaryRange: "90k - 140k CZK",
    difficulty: 4,
    perks: ["Relocation Pkg", "Credits", "Health Care"]
  },
  {
    title: "3D Generalist",
    company: "VFX House",
    category: "3D & GameDev",
    requiredSkills: ["Blender", "Maya", "Modeling", "Texturing"],
    location: "Prague",
    salaryRange: "50k - 80k CZK",
    difficulty: 3,
    perks: ["Movie Projects", "Render Farm"]
  },
  {
    title: "Flutter Game Developer",
    company: "Casual Games Studio",
    category: "3D & GameDev",
    requiredSkills: ["Flutter", "Dart", "Flame", "Mobile", "Game Development"],
    location: "Remote / Prague",
    salaryRange: "55k - 85k CZK",
      difficulty: 3,
      perks: ["Precision Work", "Aerospace Industry", "Training Programs"]
    },
    {
      title: "Operátor CNC strojů",
      company: "VAG s.r.o.",
      category: "CNC & Engineering",
      requiredSkills: ["CNC", "Heidenhain", "Siemens", "Obrábění", "Čtení výkresů", "Měřidla", "Mikrometr"],
      location: "Hodonín",
      salaryRange: "40k - 60k CZK",
      difficulty: 3,
      perks: ["Mezinárodní společnost", "25 dnů dovolené", "Penzijní pojištění 1700 Kč", "Očkování zdarma", "Nástup ihned"]
    },
    
    // --- MORE AUTOMECHANIC ---
  {
    title: "Diesel Specialist",
    company: "Truck Service Center",
    category: "Automechanic",
    requiredSkills: ["Diesel", "Trucks", "Diagnostics", "Hydraulics"],
    location: "Ostrava",
    salaryRange: "42k - 62k CZK",
    difficulty: 3,
    perks: ["Heavy Vehicles", "Fleet Work", "Specialized Training"]
  },
  {
    title: "Performance Tuner",
    company: "Racing Shop",
    category: "Automechanic",
    requiredSkills: ["Performance", "Tuning", "ECU", "Diagnostics"],
    location: "Prague",
    salaryRange: "48k - 75k CZK",
    difficulty: 4,
    perks: ["High Performance", "Racing Events", "Passion Projects"]
  },
  {
    title: "Auto Electrician",
    company: "Car Electronics Shop",
    category: "Automechanic",
    requiredSkills: ["Electronics", "Wiring", "Diagnostics", "Car Systems"],
    location: "Brno",
    salaryRange: "44k - 64k CZK",
    difficulty: 3,
    perks: ["Modern Cars", "Electrical Systems", "Diagnostic Tools"]
  },
    // --- AUTOMOTIVE (NEW) ---
    {
      title: "Dělník ve výrobě / Obsluha strojů",
      company: "International Automotive Components Group s.r.o.",
      category: "CNC & Engineering",
      requiredSkills: ["Výroba", "Obsluha strojů", "Montáž", "Bezpečnost práce"],
      location: "Hrušky (Břeclav)",
      salaryRange: "31 000+ Kč",
      difficulty: 1,
      perks: ["HPP", "Nepřetržitý provoz", "Prémie"]
    },

    // --- VÝROBA A STROJÍRENSTVÍ ---
    {
      title: "QC Technik / Kontrola kvality",
      company: "Škoda Auto",
      category: "CNC & Engineering",
      requiredSkills: ["Kontrola kvality", "Metrologie", "Měření", "ISO 9001", "SPC"],
      location: "Mladá Boleslav",
      salaryRange: "45k - 65k CZK",
      difficulty: 3,
      perks: ["Automotive", "Stravenky", "Sportoviště"]
    },
    {
      title: "Plastikář - Vstřikování plastů",
      company: "Beneš a Lát",
      category: "CNC & Engineering",
      requiredSkills: ["Plastikář", "Vstřikování", "Termoplasty", "Formy", "Nastavení strojů"],
      location: "Praha-východ",
      salaryRange: "38k - 55k CZK",
      difficulty: 2,
      perks: ["Závodní stravování", "Příspěvek na dopravu", "13. plat"]
    },
    {
      title: "CNC Soustružník",
      company: "Průmyslové strojírny",
      category: "CNC & Engineering",
      requiredSkills: ["Soustružení", "CNC Soustruh", "G-kód", "Obrábění kovů", "Upínání"],
      location: "Plzeň",
      salaryRange: "50k - 75k CZK",
      difficulty: 4,
      perks: ["Stabilní zaměstnání", "Příspěvek na bydlení", "Odborné vzdělávání"]
    },
    {
      title: "CNC Frézař",
      company: "Hesteg Group",
      category: "CNC & Engineering",
      requiredSkills: ["Frézování", "CNC Frézka", "CAD/CAM", "3-osé frézování", "Řezné nástroje"],
      location: "Brno",
      salaryRange: "48k - 72k CZK",
      difficulty: 4,
      perks: ["Moderní stroje", "Příspěvek na dojíždění", "Flexibilní pracovní doba"]
    },
    {
      title: "Obráběč kovů - Všeobecný",
      company: "Kovárna Vamberk",
      category: "CNC & Engineering",
      requiredSkills: ["Soustružení", "Frézování", "Vrtání", "Broušení", "Čtení výkresů"],
      location: "Hradec Králové",
      salaryRange: "42k - 60k CZK",
      difficulty: 3,
      perks: ["Klasická výroba", "Penzijní připojištění", "Rekreační zařízení"]
    },
    {
      title: "Brusič kovů / Leštič",
      company: "Precision Parts",
      category: "CNC & Engineering",
      requiredSkills: ["Broušení", "Leštění", "Brusky", "Povrchová úprava", "Ražba"],
      location: "Ostrava",
      salaryRange: "35k - 50k CZK",
      difficulty: 2,
      perks: ["Nepřetržitý provoz", "Příplatky", "Pružná pracovní doba"]
    },
    {
      title: "Lisovací technik",
      company: "Groupe Renault",
      category: "CNC & Engineering",
      requiredSkills: ["Lisování", "Stříhání", "Ohýbání", "Punching", "Příprava nástrojů"],
      location: "Kvasiny",
      salaryRange: "40k - 58k CZK",
      difficulty: 3,
      perks: ["Automotive", "Automobilový průmysl", "Vzdělávací programy"]
    },
    {
      title: "Tepelné zpracování - Operátor",
      company: "Železárny",
      category: "CNC & Engineering",
      requiredSkills: ["Tepelné zpracování", "Kalení", "Popouštění", "Žíhání", "Měření tvrdosti"],
      location: "Třinec",
      salaryRange: "44k - 62k CZK",
      difficulty: 4,
      perks: ["Těžký průmysl", "Příspěvek na bydlení", "Penzijní fond"]
    },
    {
      title: "Montážní dělník",
      company: "Faurecia",
      category: "CNC & Engineering",
      requiredSkills: ["Montáž", "Finální úpravy", "Balení", "Ergonomie", "Lean Manufacturing"],
      location: "Žatec",
      salaryRange: "28k - 40k CZK",
      difficulty: 1,
      perks: ["HPP", "Stravenky", "Příspěvek na dopravu"]
    },
     {
       title: "Nástrojař / Přípravář",
       company: "Matest",
       category: "CNC & Engineering",
       requiredSkills: ["Nástroje", "Přípravky", "Upínání", "Čtení výkresů", "Ruční práce"],
       location: "Pardubice",
       salaryRange: "46k - 68k CZK",
       difficulty: 3,
       perks: ["Řemeslná práce", "Penzijní připojištění", "Věrnostní bonusy"]
     },
     {
       title: "CNC Programátor - 3-osé frézování",
       company: "Technoplast",
       category: "CNC & Engineering",
       requiredSkills: ["CNC", "G-Code", "Fusion 360", "Mastercam", "Frézování"],
       location: "Hradec Králové",
       salaryRange: "55k - 80k CZK",
       difficulty: 3,
       perks: ["Moderní stroje", "Příspěvek na dopravu", "Vzdělávací kurzy"]
     },
     {
       title: "CNC Operátor",
       company: "Beneš a Lát",
       category: "CNC & Engineering",
       requiredSkills: ["CNC", "Obsluha strojů", "Kontrola kvality", "Upínání"],
       location: "Praha-východ",
       salaryRange: "35k - 55k CZK",
       difficulty: 2,
       perks: ["Závodní stravování", "Příspěvek na bydlení", "13. plat"]
     },
     {
       title: "CAM Programátor",
       company: "Škoda Precision Engineering",
       category: "CNC & Engineering",
       requiredSkills: ["CAM", "Fusion 360", "Mastercam", "Post-procesory", "5-axis"],
       location: "Mladá Boleslav",
       salaryRange: "70k - 100k CZK",
       difficulty: 4,
       perks: ["Automotive", "Stravenky", "Sportoviště", "Flexibilní pracovní doba"]
     },
     {
       title: "CNC Instruktor / Školitel",
       company: "Strojírenský institut",
       category: "CNC & Engineering",
       requiredSkills: ["CNC", "G-Code", "Pedagogika", "Kurzy", "Certifikace"],
       location: "Brno",
       salaryRange: "50k - 75k CZK",
       difficulty: 4,
       perks: ["Stabilní zaměstnání", "Prázdniny", "Vzdělávací prostředí"]
     },
     {
       title: "Quality Engineer - CNC Výroba",
       company: "Foxconn Czech",
       category: "CNC & Engineering",
       requiredSkills: ["Quality", "Metrologie", "SPC", "GD&T", "CNC"],
       location: "Pardubice",
       salaryRange: "55k - 85k CZK",
       difficulty: 4,
       perks: ["Moderní laboratoř", "Mezinárodní prostředí", "Career growth"]
     },
     {
       title: "Maintenance Technik - CNC Stroje",
       company: "Toyota Motor Manufacturing",
       category: "CNC & Engineering",
       requiredSkills: ["Údržba", "CNC", "Elektrika", "Mechanika", "Diagnostika"],
       location: "Vaňkov (Třebíč)",
       salaryRange: "50k - 75k CZK",
       difficulty: 3,
       perks: ["Automotive", "Penzijní fond", "Bonusy za výkon"]
     },
     {
       title: "CNC Application Engineer",
       company: "Sandvik Coromant",
       category: "CNC & Engineering",
       requiredSkills: ["CNC", "Řezné nástroje", "Technology", "Consulting", "Prezentace"],
       location: "Praha",
       salaryRange: "65k - 95k CZK",
       difficulty: 5,
       perks: ["Car", "Phone", "Notebook", "Commission", "International travel"]
     },
     {
       title: "Programming Manager - CNC Oddělení",
       company: "Bosch Diesel",
       category: "CNC & Engineering",
       requiredSkills: ["Management", "CNC", "CAM", "Lean", "Team leadership"],
       location: "Jihlava",
       salaryRange: "80k - 120k CZK",
       difficulty: 5,
       perks: ["Management position", "Car", "Relocation", "Bonuses"]
     },
     {
       title: "CNC Programátor - Letecký průmysl",
       company: "Aircraft Industries",
       category: "CNC & Engineering",
       requiredSkills: ["CNC", "5-axis", "Titanium", "Inconel", "Aerospace standards"],
       location: "Kunovice",
       salaryRange: "75k - 110k CZK",
       difficulty: 5,
       perks: ["Aviation", "Security clearance", "Training", "Modern equipment"]
     },
     {
       title: "CNC Programátor - Medical Devices",
       company: "Zimmer Biomet",
       category: "CNC & Engineering",
       requiredSkills: ["CNC", "G-Code", "Medical devices", "ISO 13485", "Titán"],
       location: "Ústí nad Orlicí",
       salaryRange: "65k - 95k CZK",
       difficulty: 4,
       perks: ["Medical", "Flexible hours", "Health benefits", "Training"]
     },
     {
       title: "CNC Programátor - Precision Parts",
       company: "Mikropremise",
       category: "CNC & Engineering",
       requiredSkills: ["CNC", "Mikroobrábění", "G-Code", "Diamantové nástroje"],
       location: "Velešín",
       salaryRange: "60k - 90k CZK",
       difficulty: 5,
       perks: ["High precision", "Clean environment", "Technical challenges"]
     },
    {
      title: "Montážní dělník",
      company: "Faurecia",
      category: "CNC & Engineering",
      requiredSkills: ["Montáž", "Finální úpravy", "Balení", "Ergonomie", "Lean Manufacturing"],
      location: "Žatec",
      salaryRange: "28k - 40k CZK",
      difficulty: 1,
      perks: ["HPP", "Stravenky", "Příspěvek na dopravu"]
    },

    // --- NEW JOB TEMPLATES ---
   {
     title: "Data Scientist",
     company: "DataTech Solutions",
     category: "Programming",
     requiredSkills: ["Python", "Machine Learning", "SQL", "Statistics", "TensorFlow"],
     location: "Prague / Hybrid",
     salaryRange: "90k - 140k CZK",
     difficulty: 4,
     perks: ["Research Time", "Conference Budget", "ML Hardware"]
   },
   {
     title: "DevOps Engineer",
     company: "CloudScale Inc.",
     category: "Programming",
     requiredSkills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
     location: "Remote",
     salaryRange: "100k - 150k CZK",
     difficulty: 4,
     perks: ["Full Remote", "Learning Budget", "Flexible Hours"]
   },
   {
     title: "Cybersecurity Consultant",
     company: "SecureNet",
     category: "Programming",
     requiredSkills: ["Penetration Testing", "Network Security", "OWASP", "Linux"],
     location: "Brno",
     salaryRange: "85k - 125k CZK",
     difficulty: 5,
     perks: ["Certifications Paid", "Security Clearance", "Home Office"]
   },
   {
     title: "Unity 3D Developer",
     company: "GameForge Studios",
     category: "3D & GameDev",
     requiredSkills: ["Unity", "C#", "3D Graphics", "Shaders", "Mobile"],
     location: "Prague",
     salaryRange: "70k - 100k CZK",
     difficulty: 3,
     perks: ["Game Jams", "Creative Freedom", "Stock Options"]
   },
   {
     title: "3D Character Artist",
     company: "VFX Masters",
     category: "3D & GameDev",
     requiredSkills: ["Blender", "ZBrush", "Substance Painter", "Animation"],
     location: "Remote",
     salaryRange: "60k - 90k CZK",
     difficulty: 3,
     perks: ["Portfolio Work", "Industry Events", "Creative Tools"]
   },
   {
     title: "CNC Machinist",
     company: "Precision Parts Ltd.",
     category: "CNC & Engineering",
     requiredSkills: ["CNC", "G-Code", "Metrology", "Quality Control"],
     location: "Plzeň",
     salaryRange: "45k - 65k CZK",
     difficulty: 3,
     perks: ["Modern Machines", "Training Programs", "Overtime Bonus"]
   },
    {
      title: "Electrical Engineer - EV",
      company: "ElectroAuto",
      category: "Automechanic",
      requiredSkills: ["Electrical Systems", "EV", "Diagnostics", "High Voltage"],
      location: "Mladá Boleslav",
      salaryRange: "75k - 110k CZK",
      difficulty: 4,
      perks: ["Future Tech", "Skoda Partnership", "Safety Training"]
    },
    {
      title: "3D Tisk Specialista",
      company: "Rapid Prototyping s.r.o.",
      category: "CNC & Engineering",
      requiredSkills: ["3D Tisk", "CAD", "Prototypování", "Materiály"],
      location: "Prague",
      salaryRange: "45k - 70k CZK",
      difficulty: 2,
      perks: ["Modern Tech", "Creative Work", "Training"]
    },
    {
      title: "Prototypový Inženýr",
      company: "Innovation Hub",
      category: "CNC & Engineering",
      requiredSkills: ["3D Tisk", "CAD", "Prototypování", "Design", "Testing"],
      location: "Brno / Hybrid",
      salaryRange: "55k - 85k CZK",
      difficulty: 3,
      perks: ["Innovation", "New Technologies", "Flexible Hours"]
    },
    {
      title: "Product Designer (3D Printing)",
      company: "DesignLab",
      category: "Programming",
      requiredSkills: ["3D Tisk", "CAD", "Design", "Blender", "Fusion 360"],
      location: "Remote",
      salaryRange: "50k - 80k CZK",
      difficulty: 3,
      perks: ["Remote Work", "Creative Freedom", "Portfolio Building"]
    },
   {
     title: "Product Manager - SaaS",
     company: "TechFlow",
     category: "Programming",
     requiredSkills: ["Product Management", "Agile", "Analytics", "User Research"],
     location: "Prague",
     salaryRange: "80k - 120k CZK",
     difficulty: 3,
     perks: ["Product Ownership", "Team Leadership", "Equity Package"]
   },
   {
     title: "Technical Writer",
     company: "DevDocs Inc.",
     category: "Programming",
     requiredSkills: ["Technical Writing", "Documentation", "API Design", "Markdown"],
     location: "Remote",
     salaryRange: "50k - 75k CZK",
      difficulty: 2,
      perks: ["Remote Work", "Flexible Hours", "Writing Tools"]
    },
    
    // --- TESTING & QA JOBS ---
    {
      title: "Senior QA Engineer",
      company: "QualityFirst",
      category: "Programming",
      requiredSkills: ["QA", "Test Automation", "Selenium", "Cypress", "Playwright"],
      location: "Prague / Hybrid",
      salaryRange: "70k - 100k CZK",
      difficulty: 4,
      perks: ["Testing Tools", "Training Budget", "Flexible Hours"]
    },
    {
      title: "Test Automation Engineer",
      company: "TechCorp",
      category: "Programming",
      requiredSkills: ["Jest", "Cypress", "Playwright", "Testing", "JavaScript"],
      location: "Remote",
      salaryRange: "60k - 90k CZK",
      difficulty: 3,
      perks: ["Remote Work", "Modern Stack", "CI/CD"]
    },
    {
      title: "SDET (Software Development Engineer in Test)",
      company: "StartupXYZ",
      category: "Programming",
      requiredSkills: ["Testing", "Automation", "Python", "CI/CD", "Docker"],
      location: "Brno",
      salaryRange: "75k - 110k CZK",
      difficulty: 4,
      perks: ["Equity", "Cutting Edge Tech", "Team Events"]
    },
    
    // --- DATABASE & DEVOPS JOBS ---
    {
      title: "Database Administrator",
      company: "DataSystems",
      category: "Programming",
      requiredSkills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Database Design"],
      location: "Prague",
      salaryRange: "65k - 95k CZK",
      difficulty: 4,
      perks: ["Stable Company", "Training", "Performance Bonus"]
    },
    {
      title: "PostgreSQL Database Engineer",
      company: "FinTech Solutions",
      category: "Programming",
      requiredSkills: ["PostgreSQL", "SQL", "Performance Tuning", "Replication", "Backup"],
      location: "Brno / Hybrid",
      salaryRange: "70k - 100k CZK",
      difficulty: 5,
      perks: ["FinTech", "High Salary", "Modern Tech"]
    },
    {
      title: "MongoDB Developer",
      company: "E-Commerce Platform",
      category: "Programming",
      requiredSkills: ["MongoDB", "NoSQL", "Node.js", "Atlas"],
      location: "Remote",
      salaryRange: "55k - 85k CZK",
      difficulty: 3,
      perks: ["Remote", "E-Commerce", "Growth"]
    },
    {
      title: "DevOps Engineer",
      company: "CloudFirst",
      category: "Programming",
      requiredSkills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Vercel"],
      location: "Prague",
      salaryRange: "75k - 120k CZK",
      difficulty: 4,
      perks: ["Cloud", "Modern Stack", "Training Budget"]
    },
    {
      title: "Platform Engineer (Vercel/Netlify)",
      company: "SaaS Startup",
      category: "Programming",
      requiredSkills: ["Vercel", "Netlify", "Docker", "GitHub Actions", "Node.js"],
      location: "Remote",
      salaryRange: "65k - 95k CZK",
      difficulty: 3,
      perks: ["Remote", "Startup Culture", "Equity"]
    },
    {
      title: "AI Tools Developer",
      company: "OpenAI Partner",
      category: "Programming",
      requiredSkills: ["OpenAI", "Claude", "API Integration", "Python", "Automation"],
      location: "Remote",
      salaryRange: "70k - 110k CZK",
      difficulty: 4,
      perks: ["AI Focus", "Remote", "Innovation"]
    },
    {
      title: "Frontend Developer (AI Integration)",
      company: "AIPowered Apps",
      category: "Programming",
      requiredSkills: ["React", "OpenAI API", "TypeScript", "Vercel"],
      location: "Prague / Hybrid",
      salaryRange: "60k - 90k CZK",
      difficulty: 3,
      perks: ["AI", "Modern Stack", "Team"]
    },
    
    // --- BLOCKCHAIN & CRYPTO ---
    {
      title: "Blockchain Developer",
      company: "CryptoChain",
      category: "Programming",
      requiredSkills: ["Solidity", "Web3", "Ethereum", "Smart Contracts"],
      location: "Remote",
      salaryRange: "120k - 180k CZK",
      difficulty: 5,
      perks: ["Crypto Salary", "DeFi Projects", "Conferences"]
    },
   {
     title: "UX/UI Designer",
     company: "DesignHub",
     category: "Programming",
     requiredSkills: ["UI/UX", "Figma", "Prototyping", "User Research"],
     location: "Prague",
     salaryRange: "55k - 80k CZK",
     difficulty: 2,
     perks: ["Design System", "User Testing", "Creative Process"]
   },
   {
     title: "Machine Learning Engineer",
     company: "AI Solutions Ltd.",
     category: "Data Science & AI",
     requiredSkills: ["Machine Learning", "Python", "TensorFlow", "MLOps"],
     location: "Prague / Remote",
     salaryRange: "110k - 160k CZK",
     difficulty: 5,
     perks: ["Research Budget", "GPU Access", "Publications"]
   },
   {
     title: "Data Scientist",
     company: "Analytics Corp",
     category: "Data Science & AI",
     requiredSkills: ["Python", "Statistics", "SQL", "Visualization"],
     location: "Brno",
     salaryRange: "85k - 125k CZK",
     difficulty: 4,
     perks: ["Data Tools", "Training Budget", "Impact Projects"]
   },
   {
     title: "Computer Vision Engineer",
     company: "VisionTech",
     category: "Data Science & AI",
     requiredSkills: ["Computer Vision", "OpenCV", "Deep Learning", "Python"],
     location: "Remote",
     salaryRange: "95k - 140k CZK",
     difficulty: 5,
      perks: ["CV Research", "Hardware Access", "Conferences"]
    },

    // --- CYBERSECURITY & PENTESTING ---
    {
      title: "Penetration Tester",
      company: "SecurityFirst",
      category: "Cybersecurity",
      requiredSkills: ["Penetration Testing", "Kali Linux", "Metasploit", "Nmap", "Burp Suite", "OWASP"],
      location: "Prague / Hybrid",
      salaryRange: "80k - 130k CZK",
      difficulty: 5,
      perks: ["Certifications", "Training Budget", "Cutting Edge Tools"]
    },
    {
      title: "Ethical Hacker",
      company: "RedTeam Security",
      category: "Cybersecurity",
      requiredSkills: ["Ethical Hacking", "Network Security", "Exploitation", "Social Engineering", "Python"],
      location: "Brno / Remote",
      salaryRange: "85k - 140k CZK",
      difficulty: 5,
      perks: ["Red Team", "Creative Work", "Bonuses"]
    },
    {
      title: "Application Security Engineer",
      company: "AppSec Solutions",
      category: "Cybersecurity",
      requiredSkills: ["Web Security", "OWASP", "Burp Suite", "Secure Coding", "SAST", "DAST"],
      location: "Prague",
      salaryRange: "75k - 120k CZK",
      difficulty: 4,
      perks: ["AppSec", "Modern Stack", "Research Time"]
    },
    {
      title: "Bug Bounty Hunter",
      company: "Independent / Multiple Programs",
      category: "Cybersecurity",
      requiredSkills: ["Bug Bounty", "Web Security", "Reconnaissance", "Vulnerability Assessment"],
      location: "Remote",
      salaryRange: "50k - 200k CZK",
      difficulty: 4,
      perks: ["Flexible Schedule", "Unlimited Earning", "Remote Work"]
    },
    {
      title: "Security Operations Center Analyst",
      company: "SecureCorp",
      category: "Cybersecurity",
      requiredSkills: ["SIEM", "Log Analysis", "Incident Response", "Network Security", "Monitoring"],
      location: "Prague",
      salaryRange: "55k - 90k CZK",
      difficulty: 3,
      perks: ["24/7 Operations", "Shift Allowance", "Career Growth"]
    },
    {
      title: "Malware Analyst",
      company: "ThreatIntel Corp",
      category: "Cybersecurity",
      requiredSkills: ["Reverse Engineering", "Malware Analysis", "Ghidra", "IDA Pro", "Assembly"],
      location: "Prague",
      salaryRange: "80k - 130k CZK",
      difficulty: 5,
      perks: ["Research", "Advanced Tools", "Clearance"]
    },
    {
      title: "Incident Response Specialist",
      company: "CyberDefense Inc.",
      category: "Cybersecurity",
      requiredSkills: ["Incident Response", "Digital Forensics", "Malware Analysis", "SIEM", "Documentation"],
      location: "Prague / Hybrid",
      salaryRange: "75k - 120k CZK",
      difficulty: 5,
      perks: ["On-call Bonus", "Clearance", "Training"]
    },
    {
      title: "Network Security Engineer",
      company: "NetSecure",
      category: "Cybersecurity",
      requiredSkills: ["Network Security", "Firewalls", "IDS/IPS", "VPN", "Cisco", "Palo Alto"],
      location: "Brno",
      salaryRange: "70k - 110k CZK",
      difficulty: 4,
      perks: ["Infrastructure", "Stable Environment", "Certifications"]
    },
    {
      title: "Cloud Security Engineer",
      company: "CloudGuard",
      category: "Cybersecurity",
      requiredSkills: ["Cloud Security", "AWS", "Azure", "Kubernetes", "IAM", "Compliance"],
      location: "Remote",
      salaryRange: "80k - 140k CZK",
      difficulty: 4,
      perks: ["Remote", "Multi-cloud", "Modern Tech"]
    },
    {
      title: "Red Team Operator",
      company: "Offensive Security Corp",
      category: "Cybersecurity",
      requiredSkills: ["Red Teaming", "Exploitation", "Privilege Escalation", "Lateral Movement", "C2"],
      location: "Prague",
      salaryRange: "100k - 160k CZK",
      difficulty: 5,
      perks: ["Offensive Security", "Clearance", "Premium Tools"]
    },
    {
      title: "Security Consultant",
      company: "Consulting Group",
      category: "Cybersecurity",
      requiredSkills: ["Penetration Testing", "Risk Assessment", "Compliance", "Security Architecture", "Communication"],
      location: "Prague / Hybrid",
      salaryRange: "80k - 130k CZK",
      perks: ["Travel", "Diverse Projects", "Client Interaction"]
    },
    {
      title: "Threat Intelligence Analyst",
      company: "ThreatWatch",
      category: "Cybersecurity",
      requiredSkills: ["Threat Intelligence", "OSINT", "Malware Analysis", "Python", "Reporting"],
      location: "Remote",
      salaryRange: "65k - 100k CZK",
      difficulty: 4,
      perks: ["Research", "Global Perspective", "Clearance"]
    },
    {
      title: "DevSecOps Engineer",
      company: "DevSec Solutions",
      category: "Cybersecurity",
      requiredSkills: ["DevSecOps", "CI/CD Security", "Container Security", "SAST", "DAST", "Docker"],
      location: "Brno / Remote",
      salaryRange: "75k - 120k CZK",
      difficulty: 4,
      perks: ["Automation", "Modern Pipeline", "Security Integration"]
    },
    {
      title: "Forensics Analyst",
      company: "Digital Forensics Lab",
      category: "Cybersecurity",
      requiredSkills: ["Digital Forensics", "Autopsy", "Memory Forensics", "Disk Forensics", "E-Discovery"],
      location: "Prague",
      salaryRange: "60k - 95k CZK",
      difficulty: 4,
      perks: ["Legal Work", "Evidence Handling", "Clearance"]
    },
    {
      title: "Vulnerability Management Engineer",
      company: "VulnMgmt Corp",
      category: "Cybersecurity",
      requiredSkills: ["Vulnerability Assessment", "Qualys", "Nessus", "Remediation", "Risk Scoring", "CVSS"],
      location: "Remote",
      salaryRange: "65k - 100k CZK",
      difficulty: 3,
      perks: ["Automation", "Process Improvement", "Compliance"]
    },
    {
      title: "Web Accessibility Specialist",
      company: "InclusiveTech",
      category: "Programming",
      requiredSkills: ["Accessibility", "WCAG", "ARIA", "Semantic HTML", "Testing", "Inclusive Design"],
      location: "Prague / Hybrid",
      salaryRange: "70k - 110k CZK",
      difficulty: 3,
      perks: ["Impactful Work", "Remote Options", "Training Budget"]
    },

    // --- MUSIC PRODUCTION ---
    {
      title: "Music Producer",
      company: "Record Label",
      category: "Music Production",
      requiredSkills: ["DAW", "FL Studio", "Ableton Live", "Mixing", "Mastering"],
      location: "Prague / Remote",
      salaryRange: "40k - 80k CZK",
      difficulty: 2,
      perks: ["Creative Work", "Studio Access", "Royalties"]
    },
    {
      title: "Sound Designer",
      company: "Game Studio",
      category: "Music Production",
      requiredSkills: ["Sound Design", "Foley", "Middleware", "Wwise", "FMOD"],
      location: "Prague",
      salaryRange: "55k - 90k CZK",
      difficulty: 3,
      perks: ["Game Industry", "Creative Freedom", "Latest Tech"]
    },
    {
      title: "Mixing Engineer",
      company: "Audio Post-Production",
      category: "Music Production",
      requiredSkills: ["Mixing", "Mastering", "Pro Tools", "EQ", "Compression"],
      location: "Prague / Hybrid",
      salaryRange: "50k - 85k CZK",
      difficulty: 3,
      perks: ["High-End Equipment", "Prestigious Clients", "Flexible Hours"]
    },
    {
      title: "DJ / Live Performer",
      company: "Clubs & Events",
      category: "Music Production",
      requiredSkills: ["DJing", "Turntablism", "Mixing", "Performance", "Serato", "Rekordbox"],
      location: "Prague / Brno",
      salaryRange: "30k - 70k CZK",
      difficulty: 2,
      perks: ["Nightlife", "Networking", "Performance Bonuses"]
    },

    // --- ART & CREATIVITY ---
    {
      title: "Digital Illustrator",
      company: "Publishing House",
      category: "Art & Creativity",
      requiredSkills: ["Procreate", "Photoshop", "Illustration", "Character Design", "Concept Art"],
      location: "Remote",
      salaryRange: "45k - 75k CZK",
      difficulty: 2,
      perks: ["Creative Freedom", "Remote Work", "Artistic Growth"]
    },
    {
      title: "Graphic Designer",
      company: "Creative Agency",
      category: "Art & Creativity",
      requiredSkills: ["Photoshop", "Illustrator", "InDesign", "Branding", "Typography"],
      location: "Prague",
      salaryRange: "50k - 80k CZK",
      difficulty: 2,
      perks: ["Award-Winning Projects", "Team Culture", "Design Tools"]
    },
    {
      title: "Fine Artist",
      company: "Gallery / Art Studio",
      category: "Art & Creativity",
      requiredSkills: ["Painting", "Oil", "Acrylic", "Watercolor", "Composition"],
      location: "Prague",
      salaryRange: "35k - 60k CZK",
      difficulty: 2,
      perks: ["Exhibitions", "Artistic Freedom", "Gallery Representation"]
    },
    {
      title: "Content Writer / Copywriter",
      company: "Marketing Agency",
      category: "Art & Creativity",
      requiredSkills: ["Copywriting", "SEO Writing", "Storytelling", "Content Strategy", "Editing"],
      location: "Remote / Hybrid",
      salaryRange: "45k - 75k CZK",
      difficulty: 2,
      perks: ["Remote Work", "Diverse Projects", "Creative Writing"]
    },

    // --- FITNESS & HEALTH ---
    {
      title: "Personal Trainer",
      company: "Fitness Center",
      category: "Fitness & Health",
      requiredSkills: ["Training Programming", "Anatomy", "Nutrition", "Client Coaching", "Sales"],
      location: "Prague",
      salaryRange: "50k - 100k CZK",
      difficulty: 2,
      perks: ["Flexible Schedule", "Commission", "Health Benefits"]
    },
    {
      title: "Yoga Instructor",
      company: "Yoga Studio / Online",
      category: "Fitness & Health",
      requiredSkills: ["Yoga", "Meditation", "Breathwork", "Anatomy", "Teaching"],
      location: "Prague / Remote",
      salaryRange: "40k - 70k CZK",
      difficulty: 1,
      perks: ["Wellness Environment", "Retreats", "Online Classes"]
    },
    {
      title: "Running Coach",
      company: "Sports Club / Freelance",
      category: "Fitness & Health",
      requiredSkills: ["Running Coaching", "Marathon Training", "Biomechanics", "Nutrition", "Race Strategy"],
      location: "Prague / Brno",
      salaryRange: "35k - 65k CZK",
      difficulty: 2,
      perks: ["Outdoor Work", "Events", "Race Entries"]
    },
    {
      title: "Calisthenics Coach",
      company: "Street Workout Park / Gym",
      category: "Fitness & Health",
      requiredSkills: ["Calisthenics", "Bodyweight Training", "Strength Coaching", "Progress Planning"],
      location: "Prague",
      salaryRange: "40k - 75k CZK",
      difficulty: 3,
      perks: ["Community", "Outdoor Training", "Competitions"]
    },

    // --- RESELLING & BUSINESS ---
    {
      title: "Amazon FBA Seller",
      company: "E-Commerce Business",
      category: "Reselling & Business",
      requiredSkills: ["Amazon FBA", "Product Research", "PPC", "Listing Optimization", "Inventory Management"],
      location: "Remote",
      salaryRange: "50k - 150k CZK",
      difficulty: 3,
      perks: ["Passive Income", "Scalable", "Remote Work"]
    },
    {
      title: "E-commerce Store Owner",
      company: "Online Retail",
      category: "Reselling & Business",
      requiredSkills: ["Shopify", "E-commerce", "Marketing", "Customer Service", "Analytics"],
      location: "Remote",
      salaryRange: "45k - 120k CZK",
      difficulty: 2,
      perks: ["Entrepreneurship", "Flexible Hours", "Growth Potential"]
    },
    {
      title: "Dropshipping Specialist",
      company: "Online Business",
      category: "Reselling & Business",
      requiredSkills: ["Dropshipping", "Shopify", "Facebook Ads", "Product Sourcing", "Customer Service"],
      location: "Remote",
      salaryRange: "40k - 100k CZK",
      difficulty: 2,
      perks: ["Low Investment", "Remote Work", "Scalable Business"]
    },
    {
      title: "Sourcing Specialist",
      company: "Import / Export Company",
      category: "Reselling & Business",
      requiredSkills: ["Sourcing", "Supplier Negotiation", "Quality Control", "Logistics", "Alibaba", "1688"],
      location: "Prague / Remote",
      salaryRange: "55k - 90k CZK",
      difficulty: 3,
      perks: ["Travel Opportunities", "Commission", "Global Network"]
    },
    {
      title: "Reseller / Flipper",
      company: "Self-Employed / eBay",
      category: "Reselling & Business",
      requiredSkills: ["eBay", "Thrift Flipping", "Product Valuation", "Photography", "Customer Service"],
      location: "Remote",
      salaryRange: "35k - 80k CZK",
      difficulty: 1,
      perks: ["Flexible Schedule", "Side Income", "Low Barriers"]
    },

    // --- SCIENCE & EDUCATION ---
    {
      title: "Private Tutor",
      company: "Education Center / Freelance",
      category: "Science & Education",
      requiredSkills: ["Teaching", "Subject Expertise", "Curriculum", "Student Assessment", "Communication"],
      location: "Prague / Remote",
      salaryRange: "40k - 80k CZK",
      difficulty: 2,
      perks: ["Flexible Schedule", "One-on-One Teaching", "Impact"]
    },
    {
      title: "Online Course Creator",
      company: "EdTech Platform / YouTube",
      category: "Science & Education",
      requiredSkills: ["Content Creation", "Video Production", "Course Design", "Marketing", "Teaching"],
      location: "Remote",
      salaryRange: "50k - 150k CZK",
      difficulty: 3,
      perks: ["Passive Income", "Creative Control", "Global Audience"]
    },
    {
      title: "Physics Tutor",
      company: "High School / University / Online",
      category: "Science & Education",
      requiredSkills: ["Physics", "Mathematics", "Problem Solving", "Teaching", "Curriculum Development"],
      location: "Prague / Remote",
      salaryRange: "45k - 90k CZK",
      difficulty: 3,
      perks: ["STEM Focus", "Academic Environment", "Research Access"]
    },
    {
      title: "Chemistry Specialist",
      company: "Laboratory / Education / Industry",
      category: "Science & Education",
      requiredSkills: ["Chemistry", "Laboratory Skills", "Analysis", "Safety Protocols", "Teaching"],
      location: "Prague / Brno",
      salaryRange: "50k - 100k CZK",
      difficulty: 3,
      perks: ["Scientific Work", "Research", "Professional Development"]
    },
      {
        title: "Learning Skills Coach",
        company: "Corporate Training / Education",
        category: "Science & Education",
        requiredSkills: ["Learning Techniques", "Productivity", "Memory Training", "Coaching", "Curriculum Design"],
        location: "Prague / Remote",
        salaryRange: "55k - 95k CZK",
        difficulty: 2,
        perks: ["Corporate Clients", "High Impact", "Flexible Schedule"]
      },

      // --- UGC & AI VIDEO JOBS ---
      {
        title: "UGC Creator",
        company: "Brands & Agencies",
        category: "Art & Creativity",
        requiredSkills: ["UGC", "TikTok", "Reels", "Video Editing", "CapCut", "Scriptwriting", "On-Camera Presence", "Content Strategy"],
        location: "Remote",
        salaryRange: "30k - 100k CZK",
        difficulty: 1,
        perks: ["Flexible Schedule", "Creative Freedom", "Multiple Brands"]
      },
      {
        title: "AI Video Editor",
        company: "Marketing Agency / Tech Startup",
        category: "Art & Creativity",
        requiredSkills: ["AI Video Tools", "Runway", "Opus Clip", "Pika Labs", "Video Editing", "Content Repurposing", "CapCut", "Premiere Pro"],
        location: "Remote / Hybrid",
        salaryRange: "50k - 90k CZK",
        difficulty: 2,
        perks: ["Cutting-edge Tech", "Remote Work", "Growth Industry"]
      },
      {
        title: "AI Content Creator",
        company: "Digital Agency / In-house",
        category: "Art & Creativity",
        requiredSkills: ["AI Content Tools", "ChatGPT", "Claude", "Copywriting", "Content Strategy", "Midjourney", "AI Video", "Automation"],
        location: "Remote",
        salaryRange: "45k - 85k CZK",
        difficulty: 2,
        perks: ["AI Tools", "Creative Work", "Modern Stack"]
      },
      {
        title: "Social Media Content Manager",
        company: "Brand / E-commerce",
        category: "Art & Creativity",
        requiredSkills: ["Social Media Management", "Content Creation", "UGC", "AI Tools", "Analytics", "Community Management", "Video Production", "Copywriting"],
        location: "Prague / Remote",
        salaryRange: "40k - 80k CZK",
        difficulty: 2,
        perks: ["Creative Freedom", "Brand Building", "Flexible Hours"]
      },
      {
        title: "Product Photographer (AI-enhanced)",
        company: "E-commerce / Product Studio",
        category: "Art & Creativity",
        requiredSkills: ["AI Photo Generation", "Midjourney", "Stable Diffusion", "Product Photography", "Photo Editing", "Photoshop", "Commercial Photography"],
        location: "Prague / Remote",
        salaryRange: "45k - 85k CZK",
        difficulty: 3,
        perks: ["AI Tools", "Creative Photography", "E-commerce Industry"]
      },
      {
        title: "AI Avatar Video Producer",
        company: "Marketing Agency / Localization",
        category: "Art & Creativity",
        requiredSkills: ["HeyGen", "AI Avatars", "Video Translation", "Lip Sync", "Video Editing", "Multilingual Content"],
        location: "Remote",
        salaryRange: "50k - 95k CZK",
        difficulty: 2,
        perks: ["AI Technology", "Global Projects", "Remote Work"]
      },

    // --- DATA ENGINEERING ---
    {
      title: "Data Engineer",
      company: "DataTech Solutions",
      category: "Data Engineering",
      requiredSkills: ["Python", "SQL", "Apache Spark", "Airflow", "dbt", "Data Modeling"],
      location: "Prague / Hybrid",
      salaryRange: "90k - 140k CZK",
      difficulty: 4,
      perks: ["Modern Stack", "Data Team", "Learning Budget"]
    },
    {
      title: "Senior Data Engineer",
      company: "BigData Corp",
      category: "Data Engineering",
      requiredSkills: ["Python", "SQL", "Spark", "Kafka", "Snowflake", "Delta Lake"],
      location: "Remote",
      salaryRange: "120k - 180k CZK",
      difficulty: 5,
      perks: ["High Impact", "Stock Options", "Conference Budget"]
    },
    {
      title: "Data Architect",
      company: "Enterprise Solutions",
      category: "Data Engineering",
      requiredSkills: ["Data Modeling", "Cloud Data Platforms", "ETL/ELT", "Data Warehouse", "Data Lake"],
      location: "Prague",
      salaryRange: "130k - 200k CZK",
      difficulty: 5,
      perks: ["Architecture", "Leadership", "Competitive Salary"]
    },
    {
      title: "ETL Developer",
      company: "Data Integration Ltd.",
      category: "Data Engineering",
      requiredSkills: ["SQL", "Python", "Informatica", "Talend", "Apache NiFi", "DataStage"],
      location: "Brno / Hybrid",
      salaryRange: "70k - 110k CZK",
      difficulty: 3,
      perks: ["Stable Projects", "Team Environment", "Training"]
    },
    {
      title: "Real-time Data Engineer",
      company: "Streaming Platform",
      category: "Data Engineering",
      requiredSkills: ["Kafka", "Flink", "Spark Streaming", "Python", "Java", "Kubernetes"],
      location: "Remote (EU)",
      salaryRange: "110k - 170k CZK",
      difficulty: 5,
      perks: ["Streaming Tech", "Modern Stack", "Remote First"]
    },
    {
      title: "MLOps Engineer",
      company: "AI/ML Startup",
      category: "Data Engineering",
      requiredSkills: ["Python", "MLflow", "Kubernetes", "Docker", "TensorFlow", "SageMaker"],
      location: "Prague / Remote",
      salaryRange: "100k - 160k CZK",
      difficulty: 4,
      perks: ["ML Focus", "Innovation", "Equity"]
    },

    // --- NETWORK ENGINEERING ---
    {
      title: "Network Engineer",
      company: "Telecom Corp",
      category: "Network Engineering",
      requiredSkills: ["Cisco", "Juniper", "Routing", "Switching", "BGP", "OSPF"],
      location: "Prague",
      salaryRange: "70k - 120k CZK",
      difficulty: 3,
      perks: ["Stable Company", "Certification Support", "Team"]
    },
    {
      title: "Network Security Engineer",
      company: "Security Solutions",
      category: "Network Engineering",
      requiredSkills: ["Firewalls", "IDS/IPS", "VPN", "Palo Alto", "Fortinet", "Network Security"],
      location: "Brno",
      salaryRange: "85k - 140k CZK",
      difficulty: 4,
      perks: ["Security Focus", "Training", "Clearance"]
    },
    {
      title: "Cloud Network Engineer",
      company: "Cloud Provider",
      category: "Network Engineering",
      requiredSkills: ["AWS VPC", "Azure Virtual Network", "GCP Networking", "Load Balancing", "DNS", "VPN"],
      location: "Remote",
      salaryRange: "90k - 140k CZK",
      difficulty: 4,
      perks: ["Cloud Focus", "Modern Tech", "Remote Work"]
    },
    {
      title: "Wireless Network Engineer",
      company: "Telecommunications",
      category: "Network Engineering",
      requiredSkills: ["Wi-Fi", "5G", "RF Planning", "Cisco Wireless", " Aruba", "Network Design"],
      location: "Prague",
      salaryRange: "75k - 125k CZK",
      difficulty: 4,
      perks: ["Telecom Industry", "Hardware", "Innovation"]
    },
    {
      title: "SDN Engineer",
      company: "Network Innovation",
      category: "Network Engineering",
      requiredSkills: ["SDN", "Cisco ACI", "VMware NSX", "Python", "Automation", "Network Orchestration"],
      location: "Remote",
      salaryRange: "100k - 160k CZK",
      difficulty: 5,
      perks: ["Automation", "Cutting Edge", "Remote"]
    },

    // --- DEVOPS & CLOUD (Expanded) ---
    {
      title: "Platform Engineer",
      company: "Tech Platform",
      category: "Cloud & DevOps",
      requiredSkills: ["Kubernetes", "Terraform", "Docker", "AWS", "Golang", "CI/CD"],
      location: "Prague / Remote",
      salaryRange: "120k - 180k CZK",
      difficulty: 5,
      perks: ["Platform Focus", "Modern Stack", "Impact"]
    },
    {
      title: "SRE Engineer",
      company: "Reliability Team",
      category: "Cloud & DevOps",
      requiredSkills: ["Linux", "Prometheus", "Grafana", "Kubernetes", "Python", "Incident Response"],
      location: "Remote",
      salaryRange: "110k - 170k CZK",
      difficulty: 4,
      perks: ["SRE Culture", "On-call Bonus", "Automation"]
    },
    {
      title: "Infrastructure Engineer",
      company: "Enterprise IT",
      category: "Cloud & DevOps",
      requiredSkills: ["AWS", "Azure", "Terraform", "Ansible", "Python", "Infrastructure as Code"],
      location: "Prague",
      salaryRange: "100k - 150k CZK",
      difficulty: 4,
      perks: ["Enterprise", "Stable", "Benefits"]
    },
    {
      title: "GitOps Engineer",
      company: "DevOps Solutions",
      category: "Cloud & DevOps",
      requiredSkills: ["ArgoCD", "Flux", "Kubernetes", "GitHub Actions", "Terraform", "Helm"],
      location: "Remote",
      salaryRange: "95k - 150k CZK",
      difficulty: 4,
      perks: ["GitOps Focus", "Remote", "Modern Tools"]
    },
    {
      title: "Observability Engineer",
      company: "Monitoring Platform",
      category: "Cloud & DevOps",
      requiredSkills: ["Prometheus", "Grafana", "Jaeger", "Elasticsearch", "Kubernetes", "SLO/SLI"],
      location: "Brno / Remote",
      salaryRange: "90k - 140k CZK",
      difficulty: 4,
      perks: ["Monitoring", "Data", "Innovation"]
    },
    {
      title: "Database Reliability Engineer",
      company: "Data Platform",
      category: "Cloud & DevOps",
      requiredSkills: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "Automation", "Performance Tuning"],
      location: "Prague",
      salaryRange: "95k - 145k CZK",
      difficulty: 4,
      perks: ["Database Focus", "Stable", "Team"]
    },

    // --- CYBERSECURITY (Expanded) ---
    {
      title: "Security Operations Analyst",
      company: "SOC Team",
      category: "Cybersecurity",
      requiredSkills: ["SIEM", "Log Analysis", "Incident Response", "Splunk", "QRadar", "Threat Detection"],
      location: "Prague",
      salaryRange: "60k - 100k CZK",
      difficulty: 3,
      perks: ["24/7 Operations", "Shift Allowance", "Career Path"]
    },
    {
      title: "Application Security Engineer",
      company: "AppSec Company",
      category: "Cybersecurity",
      requiredSkills: ["SAST", "DAST", "OWASP", "Burp Suite", "Secure Coding", "Code Review"],
      location: "Remote",
      salaryRange: "85k - 140k CZK",
      difficulty: 4,
      perks: ["AppSec", "Modern Stack", "Research"]
    },
    {
      title: "Identity and Access Management Engineer",
      company: "Enterprise Security",
      category: "Cybersecurity",
      requiredSkills: ["IAM", "Okta", "Azure AD", "SAML", "OAuth", "Privileged Access"],
      location: "Prague",
      salaryRange: "80k - 130k CZK",
      difficulty: 4,
      perks: ["IAM Focus", "Enterprise", "Compliance"]
    },
    {
      title: "Governance Risk Compliance Analyst",
      company: "GRC Team",
      category: "Cybersecurity",
      requiredSkills: ["Risk Assessment", "Compliance", "NIST", "ISO 27001", "Audit", "Documentation"],
      location: "Brno / Hybrid",
      salaryRange: "65k - 105k CZK",
      difficulty: 3,
      perks: ["GRC Focus", "Stable", "Process"]
    },
    {
      title: "Threat Intelligence Analyst",
      company: "Threat Intel Corp",
      category: "Cybersecurity",
      requiredSkills: ["OSINT", "Threat Intelligence", "Python", "Malware Analysis", "Reporting", "MISP"],
      location: "Remote",
      salaryRange: "75k - 120k CZK",
      difficulty: 4,
      perks: ["Research", "Global View", "Impact"]
    },

    // --- ADDITIONAL TECHNICAL ROLES ---
    {
      title: "Technical Product Manager",
      company: "Tech Product",
      category: "Programming",
      requiredSkills: ["Product Management", "Technical Background", "Agile", "User Stories", "API", "Technical Writing"],
      location: "Prague",
      salaryRange: "90k - 140k CZK",
      difficulty: 4,
      perks: ["Product", "Leadership", "Equity"]
    },
    {
      title: "Site Reliability Architect",
      company: "Enterprise Tech",
      category: "Cloud & DevOps",
      requiredSkills: ["Cloud Architecture", "Kubernetes", "SRE", "Terraform", "AWS/Azure", "High Availability"],
      location: "Prague / Hybrid",
      salaryRange: "150k - 220k CZK",
      difficulty: 5,
      perks: ["Architecture", "Leadership", "Top Salary"]
    },
    {
      title: "Security Automation Engineer",
      company: "SecOps Automation",
      category: "Cybersecurity",
      requiredSkills: ["Python", "Automation", "SIEM Integration", "SOAR", "Docker", "Security Tools"],
      location: "Remote",
      salaryRange: "85k - 135k CZK",
      difficulty: 4,
      perks: ["Automation", "Security", "Remote"]
    },
    {
      title: "Database Developer",
      company: "Data Solutions",
      category: "Data Engineering",
      requiredSkills: ["SQL", "PostgreSQL", "Oracle", "Performance Tuning", "Database Design", "PL/SQL"],
      location: "Brno",
      salaryRange: "75k - 120k CZK",
      difficulty: 4,
      perks: ["Database Focus", "Stable", "Team"]
    },
    {
      title: "APM Engineer",
      company: "Monitoring Solutions",
      category: "Cloud & DevOps",
      requiredSkills: ["APM Tools", "Dynatrace", "AppDynamics", "Performance Monitoring", "Java/Node.js", "Diagnostics"],
      location: "Remote",
      salaryRange: "80k - 130k CZK",
      difficulty: 4,
      perks: ["APM Focus", "Remote", "Innovation"]
    }
    ];

  export default function WorkSection({ myCourses, setCourses }: Props) {
  // Initial dummy data
  const [jobs, setJobs] = useState<Job[]>([]);
  const [archivedJobs, setArchivedJobs] = useState<Job[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Selected jobs for comparison/tracking
  const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);
  const [contextMenuJob, setContextMenuJob] = useState<{job: Job; x: number; y: number} | null>(null);

  // Company filter
  const [filterCompany, setFilterCompany] = useState<string>('all');
  
  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'warning' | 'info'>('success');

  // Job board hover state
  const [isJobBoardHovered, setIsJobBoardHovered] = useState(false);

  // Load jobs from localStorage
  useEffect(() => {
    const savedJobs = localStorage.getItem('jobs');
    const savedArchivedJobs = localStorage.getItem('archivedJobs');

    if (savedJobs) {
      try {
        setJobs(JSON.parse(savedJobs));
      } catch (error) {
        console.error('Failed to parse jobs from localStorage:', error);
        setJobs([ // fallback initial data
          {
            id: 1,
            title: "Senior React Developer",
            company: "Global Startups Inc.",
            location: "Remote",
            status: "To Apply",
            requiredSkills: ["React", "TypeScript", "Node.js", "AWS"],
            notes: "Vypadá to na dobrý culture fit.",
            salaryRange: "80k+",
            perks: ["Remote", "Equity"],
            difficulty: 4,
            category: "Programming"
          }
        ]);
      }
    } else {
      setJobs([ // initial data
        {
          id: 1,
          title: "Senior React Developer",
          company: "Global Startups Inc.",
          location: "Remote",
          status: "To Apply",
          requiredSkills: ["React", "TypeScript", "Node.js", "AWS"],
          notes: "Vypadá to na dobrý culture fit.",
          salaryRange: "80k+",
          perks: ["Remote", "Equity"],
          difficulty: 4,
          category: "Programming"
        },
        {
          id: 2,
          title: "Full Stack Developer",
          company: "TechCorp Solutions",
          location: "Prague",
          status: "Applied",
          requiredSkills: ["React", "Node.js", "PostgreSQL", "Docker"],
          notes: "Dobré benefits a pracovní prostředí.",
          salaryRange: "70k-90k",
          perks: ["Home Office", "Gym", "Catering"],
          difficulty: 3,
          category: "Programming"
        },
        {
          id: 3,
          title: "DevOps Engineer",
          company: "Cloud Systems Ltd.",
          location: "Brno",
          status: "Interview",
          requiredSkills: ["AWS", "Kubernetes", "Terraform", "Python"],
          notes: "Zaměření na cloud infrastrukturu.",
          salaryRange: "90k-110k",
          perks: ["Remote", "Training Budget", "Stock Options"],
          difficulty: 5,
          category: "Data Science & AI"
        },
        {
          id: 4,
          title: "Frontend Developer",
          company: "Global Startups Inc.",
          location: "Remote",
          status: "To Apply",
          requiredSkills: ["Vue.js", "JavaScript", "CSS", "Figma"],
          notes: "Zaměření na UX/UI.",
          salaryRange: "60k-75k",
          perks: ["Remote", "Flexible Hours"],
          difficulty: 2,
          category: "Programming"
        },
        {
          id: 5,
          title: "Data Analyst",
          company: "DataTech Analytics",
          location: "Prague",
          status: "Applied",
          requiredSkills: ["Python", "SQL", "Tableau", "Statistics"],
          notes: "Práce s velkými daty.",
          salaryRange: "65k-85k",
          perks: ["Home Office", "Learning Budget"],
          difficulty: 3,
          category: "Data Science & AI"
        }
      ]);
    }

    if (savedArchivedJobs) {
      try {
        setArchivedJobs(JSON.parse(savedArchivedJobs));
      } catch (error) {
        console.error('Failed to parse archived jobs from localStorage:', error);
      }
    }

    setIsLoading(false);
  }, []);

  // Save jobs to localStorage
  useEffect(() => {
    if (jobs.length > 0 && !isLoading) {
      localStorage.setItem('jobs', JSON.stringify(jobs));
    }
  }, [jobs, isLoading]);

  // Save archived jobs
  useEffect(() => {
    localStorage.setItem('archivedJobs', JSON.stringify(archivedJobs));
  }, [archivedJobs]);

  const updateJobStatus = (jobId: number, newStatus: string) => {
    setJobs(prev => prev.map(job =>
      job.id === jobId ? { ...job, status: newStatus as any } : job
    ));
  };

  // Toggle job selection
  const toggleJobSelection = (jobId: number) => {
    setSelectedJobIds(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  // Remove job from selection
  const removeFromSelection = (jobId: number) => {
    setSelectedJobIds(prev => prev.filter(id => id !== jobId));
    setToastMessage('Job removed from selection');
    setToastVariant('warning');
    setShowToast(true);
  };

  // Completely delete job (not saved anywhere)
  const deleteJob = (jobId: number) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
    setToastMessage('Job smazán - můžeš si ho přidat znovu přes + Find Quest');
    setToastVariant('warning');
    setShowToast(true);
    closeContextMenu();
  };

  // Context menu handlers
  const handleContextMenu = (e: React.MouseEvent, job: Job) => {
    e.preventDefault();
    setContextMenuJob({ job, x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenuJob(null);
  };

  // --- LOGIC: Calculate Match % ---
  const calculateMatch = useCallback((requiredSkills: string[]) => {
    if (!requiredSkills || requiredSkills.length === 0) return 100;

    // Get all tags from all my active courses
    const mySkills = new Set(myCourses.flatMap(c => c.tags));

    // Count how many required skills I have
    const matchCount = requiredSkills.filter(skill => mySkills.has(skill)).length;

    return Math.round((matchCount / requiredSkills.length) * 100);
  }, [myCourses]);

  const handleAddJob = useCallback((template: Partial<Job>) => {
    const newJob: Job = {
      id: Date.now(),
      title: template.title || "Nová pozice",
      company: template.company || "Neznámá firma",
      location: template.location || "Remote",
      salaryRange: template.salaryRange || "",
      status: "To Apply",
      requiredSkills: template.requiredSkills || [],
      notes: "",
      perks: template.perks || [],
      difficulty: template.difficulty || 1,
      category: template.category || "Programming",
      ...template
    } as Job;

    setJobs([...jobs, newJob]);
    setShowAddModal(false);
  }, [jobs]);

  const handleAddAgencyJob = useCallback((agencyJob: typeof AGENCY_JOBS[0]) => {
    const newJob: Job = {
      id: Date.now(),
      title: agencyJob.title,
      company: agencyJob.agencyName,
      location: agencyJob.location,
      salaryRange: agencyJob.salaryRange || "",
      status: "To Apply",
      requiredSkills: agencyJob.requiredSkills || [],
      notes: `Agentura: ${agencyJob.agencyName}` + 
             (agencyJob.accommodation ? `\n🏠 Ubytování: ${agencyJob.accommodationCost || 'ANO'}` : "") +
             (agencyJob.transportProvided ? `\n🚐 Doprava zajištěna` : "") +
             (agencyJob.languageRequirement ? `\n🌍 Jazyk: ${agencyJob.languageRequirement}` : ""),
      difficulty: agencyJob.difficulty || 1,
      category: agencyJob.category || "Manufacturing & Production",
    };

    setJobs([...jobs, newJob]);
    setShowAddModal(false);
  }, [jobs]);

  const getStatusColor = (status: JobStatus) => {
    switch(status) {
      case 'Applied': return 'info';
      case 'Interview': return 'warning';
      case 'Offer': return 'success';
      case 'Rejected': return 'danger';
      default: return 'secondary';
    }
  };

  // Archive job function
  const archiveJob = useCallback((jobId: number) => {
    const jobToArchive = jobs.find(job => job.id === jobId);
    if (jobToArchive) {
      setJobs(prev => prev.filter(job => job.id !== jobId));
      setArchivedJobs(prev => [...prev, jobToArchive]);
    }
  }, [jobs]);

  // Restore job from archive
  const restoreJob = useCallback((jobId: number) => {
    const jobToRestore = archivedJobs.find(job => job.id === jobId);
    if (jobToRestore) {
      setArchivedJobs(prev => prev.filter(job => job.id !== jobId));
      setJobs(prev => [...prev, jobToRestore]);
    }
  }, [archivedJobs]);

  // Add skill to courses when clicking on missing skill in job
  const handleAddSkillFromJob = useCallback((skillName: string) => {
    // Check if skill already exists in courses
    const skillExists = myCourses.some(course => 
      course.tags.some(tag => tag.toLowerCase() === skillName.toLowerCase())
    );

    if (skillExists) {
      setToastMessage(`Skill "${skillName}" již máš ve svém Skill Tree!`);
      setToastVariant('info');
      setShowToast(true);
      return;
    }

    // Find matching skill template
    const matchingTemplate = SKILL_TEMPLATES.find(template =>
      template.tags.some(tag => tag.toLowerCase() === skillName.toLowerCase())
    );

    if (matchingTemplate && setCourses) {
      const newCourse: Course = {
        ...matchingTemplate,
        id: Date.now(),
        spentHours: 0,
        priority: 'High',
        notes: `Přidáno z Job Board - pro pozici vyžadující ${skillName}`,
        modules: matchingTemplate.modules.map(m => ({ ...m, isCompleted: false })),
        resources: matchingTemplate.resources.map(r => ({
          name: r.name,
          url: r.url,
          type: r.type as 'video' | 'repo' | 'doc' | 'design' | 'book'
        }))
      };
      
      setCourses(prev => [...prev, newCourse]);
      setToastMessage(`✅ Skill "${matchingTemplate.title}" přidán do Skill Tree!`);
      setToastVariant('success');
      setShowToast(true);
    } else if (!setCourses) {
      setToastMessage(`Skill "${skillName}" nebyl nalezen v šablonách. Použij tlačítko + Nový Skill.`);
      setToastVariant('warning');
      setShowToast(true);
    } else {
      setToastMessage(`Skill "${skillName}" nebyl nalezen v šablonách.`);
      setToastVariant('warning');
      setShowToast(true);
    }
  }, [myCourses, setCourses]);

  return (
    <>
      <div className="glass-effect border-0 rounded hover-card" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease', ...(isJobBoardHovered ? { transform: 'translateY(-2px)', boxShadow: 'var(--shadow-glow)', borderColor: 'var(--color-accent-primary)' } : {}) }} onMouseEnter={() => setIsJobBoardHovered(true)} onMouseLeave={() => setIsJobBoardHovered(false)}>
        <div className="bg-warning bg-opacity-75 text-dark p-3 rounded-top">
          <div className="d-flex justify-content-between align-items-center mb-2">
             <h4 className="mb-0">💼 Job Board</h4>
            <Button variant="dark" size="sm" onClick={() => setShowAddModal(true)}>+ Find Quest</Button>
          </div>
          <div className="d-flex gap-2 overflow-auto pb-1 mb-2" style={{scrollbarWidth: 'none'}}>
              <Badge bg="light" text="dark" className="border">To Apply: {jobs.filter(j => j.status === 'To Apply').length}</Badge>
              <Badge bg="info" className="text-white">Applied: {jobs.filter(j => j.status === 'Applied').length}</Badge>
              <Badge bg="warning" text="dark">Interview: {jobs.filter(j => j.status === 'Interview').length}</Badge>
          </div>
          <div className="d-flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'dark' : 'outline-dark'}
              size="sm"
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'To Apply' ? 'dark' : 'outline-dark'}
              size="sm"
              onClick={() => setFilterStatus('To Apply')}
            >
              To Apply
            </Button>
            <Button
              variant={filterStatus === 'Applied' ? 'dark' : 'outline-dark'}
              size="sm"
              onClick={() => setFilterStatus('Applied')}
            >
              Applied
            </Button>
            <Button
              variant={filterStatus === 'Interview' ? 'dark' : 'outline-dark'}
              size="sm"
              onClick={() => setFilterStatus('Interview')}
            >
              Interview
            </Button>
          </div>

          <div className="d-flex gap-2 mt-2">
            <span className="text-muted small me-2 align-self-center">Firma:</span>
            <Button
              variant={filterCompany === 'all' ? 'dark' : 'outline-dark'}
              size="sm"
              onClick={() => setFilterCompany('all')}
            >
              All
            </Button>
            {[...new Set(jobs.map(job => job.company))].map(company => (
              <Button
                key={company}
                variant={filterCompany === company ? 'dark' : 'outline-dark'}
                size="sm"
                onClick={() => setFilterCompany(company)}
              >
                {company}
              </Button>
            ))}
          </div>
          
          {/* Selected Jobs Counter */}
          {selectedJobIds.length > 0 && (
            <div className="mt-2 p-2 bg-primary bg-opacity-25 rounded d-flex justify-content-between align-items-center">
              <span className="small fw-bold text-primary">
                📌 Vybrané práce: {selectedJobIds.length}
              </span>
              <div>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="me-1 py-0 px-2"
                  onClick={() => {
                    // Compare selected jobs functionality could go here
                  }}
                >
                  Porovnat
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="py-0 px-2"
                  onClick={() => setSelectedJobIds([])}
                >
                  Vymazat
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="p-0 flex-grow-1" style={{ minHeight: 'auto' }}>
          <div className="m-0" style={{ display: 'block' }}>
            {jobs.filter(job =>
              (filterStatus === 'all' || job.status === filterStatus) &&
              (filterCompany === 'all' || job.company === filterCompany)
            ).map(job => {
              const matchPercent = calculateMatch(job.requiredSkills);
              let matchColor = 'danger';
              if (matchPercent >= 50) matchColor = 'warning';
              if (matchPercent >= 80) matchColor = 'success';
              const isSelected = selectedJobIds.includes(job.id);

              return (
                <div
                  key={job.id}
                  className={`border-bottom p-3 ${isSelected ? 'bg-primary bg-opacity-10' : ''}`}
                  style={{ 
                    cursor: 'context-menu', 
                    transition: 'all 0.2s', 
                    minHeight: 'auto',
                    height: 'auto',
                    overflow: 'visible'
                  }}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', job.id.toString());
                  }}
                  onContextMenu={(e) => handleContextMenu(e, job)}
                  onClick={() => toggleJobSelection(job.id)}
                >
                  <div className="d-flex justify-content-between mb-1">
                    <div className="d-flex align-items-center gap-2" style={{maxWidth: '70%'}}>
                      {isSelected && <Badge bg="primary" className="shadow-sm">✓</Badge>}
                      <h5 className="mb-0 text-truncate fw-bold">{job.title}</h5>
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle variant={getStatusColor(job.status)} size="sm" className="shadow-sm">
                        {job.status}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => updateJobStatus(job.id, 'To Apply')}>To Apply</Dropdown.Item>
                        <Dropdown.Item onClick={() => updateJobStatus(job.id, 'Applied')}>Applied</Dropdown.Item>
                        <Dropdown.Item onClick={() => updateJobStatus(job.id, 'Interview')}>Interview</Dropdown.Item>
                        <Dropdown.Item onClick={() => updateJobStatus(job.id, 'Offer')}>Offer</Dropdown.Item>
                        <Dropdown.Item onClick={() => updateJobStatus(job.id, 'Rejected')}>Rejected</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item 
                          onClick={() => { toggleJobSelection(job.id); closeContextMenu(); }}
                          className={isSelected ? 'text-success fw-bold' : ''}
                        >
                          {isSelected ? '✓ Ve výběru' : 'Přidat do výběru'}
                        </Dropdown.Item>
                        {isSelected && (
                          <Dropdown.Item onClick={() => { removeFromSelection(job.id); closeContextMenu(); }} className="text-danger">
                            🗑️ Odebrat z výběru
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2 text-muted small">
                     <span>{job.company} • {job.location}</span>
                     <span className="fw-bold text-dark">{job.salaryRange}</span>
                  </div>

                    {/* Skills Match Visualization */}
                  <div className="mb-2 p-2 rounded border-0" style={{ background: 'rgba(0,0,0,0.2)' }}>
                     <div className="d-flex justify-content-between small mb-1">
                        <span className="fw-bold text-muted">Ready?</span>
                        <span className={`fw-bold text-${matchColor}`}>{matchPercent}% Match</span>
                     </div>
                     <ProgressBar now={matchPercent} variant={matchColor} style={{ height: '6px' }} />
                  </div>

                    {/* Missing Skills Helper */}
                    <div className="d-flex flex-wrap gap-1" style={{ overflow: 'visible' }}>
                      {job.requiredSkills.map((skill, idx) => {
                          const haveSkill = myCourses.some(c => c.tags.includes(skill));
                          return (
                              <Badge 
                                  key={skill} 
                                  bg={haveSkill ? 'success' : 'warning'}
                                  text={haveSkill ? 'white' : 'dark'}
                                  className={`fw-normal ${haveSkill ? '' : 'border border-warning'}`}
                                  style={{ 
                                    cursor: haveSkill ? 'default' : 'pointer',
                                    opacity: haveSkill ? 1 : 0.7,
                                    transition: 'all 0.2s',
                                    fontSize: '0.7rem'
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (!haveSkill) {
                                      handleAddSkillFromJob(skill);
                                    }
                                  }}
                                  title={haveSkill ? 'Skill máš' : 'Klikni pro přidání do Skill Tree'}
                              >
                                  {skill} {!haveSkill && ' +'}
                              </Badge>
                          );
                      })}
                    </div>
                </div>
              );
            })}
          </div>
          {jobs.length === 0 && (
             <div className="p-5 text-center text-muted">
                <div className="display-4 mb-3">📭</div>
                <h5>Žádné aktivní questy</h5>
                <p>Najdi si novou výzvu kliknutím na + Find Quest.</p>
             </div>
          )}
         </div>
       </div>



       {/* --- ADD JOB MODAL (JOB HUNTER - WIDE) --- */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="xl" centered contentClassName="border-0 shadow-lg" dialogClassName="modal-90w">
        <Modal.Header closeButton className="bg-warning text-dark border-0 py-3">
            <div>
                <Modal.Title className="fw-bold h4">🗺️ Job Board</Modal.Title>
                <div className="small text-dark-50">Vyber si svou další misi.</div>
            </div>
        </Modal.Header>
        <Modal.Body className="bg-light p-4">
              <Tabs defaultActiveKey="Programming" className="mb-4 custom-tabs" fill variant="pills">
                  {['Programming', '3D & GameDev', 'CNC & Engineering', 'Automechanic', 'Data Science & AI', '3D Tisk', 'Cybersecurity', 'Music Production', 'Art & Creativity', 'Fitness & Health', 'Reselling & Business', 'Science & Education'].map(cat => (
                     <Tab eventKey={cat} title={<span className="fw-bold">{cat}</span>} key={cat}>
                        <Row className="g-4 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
                            {JOB_TEMPLATES.filter(tpl => tpl.category === cat).map((tpl, idx) => {
                                const matchPercent = calculateMatch(tpl.requiredSkills || []);
                                let matchColor = 'danger';
                                if (matchPercent >= 50) matchColor = 'warning';
                                if (matchPercent >= 80) matchColor = 'success';

                                return (
                                    <Col key={idx}>
                                        <Card className="h-100 border-0 shadow-sm hover-shadow cursor-pointer" style={{transition: '0.2s', cursor: 'pointer'}} onClick={() => handleAddJob(tpl)}>
                                            <div style={{ height: '6px', backgroundColor: matchPercent >= 80 ? '#198754' : matchPercent >= 50 ? '#ffc107' : '#dc3545' }}></div>
                                            <Card.Body className="d-flex flex-column p-3">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <Badge bg="light" text="dark" className="border fw-normal">{tpl.location}</Badge>
                                                    <Badge bg={matchColor} className="shadow-sm">{matchPercent}%</Badge>
                                                </div>
                                                
                                                <h6 className="card-title fw-bold mb-1 text-truncate" title={tpl.title}>{tpl.title}</h6>
                                                <div className="text-muted small mb-3">{tpl.company}</div>
                                                
                                                <div className="mb-3">
                                                    <div className="fw-bold text-dark mb-1">{tpl.salaryRange}</div>
                                                    <div className="d-flex flex-wrap gap-1">
                                                        {tpl.perks?.slice(0, 3).map(p => (
                                                            <Badge key={p} bg="light" text="secondary" className="border-0 bg-opacity-50" style={{fontSize: '0.7rem'}}>{p}</Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="mt-auto pt-3 border-top">
                                                    <small className="text-muted d-block mb-2 fw-bold" style={{fontSize: '0.75rem'}}>REQ:</small>
                                                    <div className="d-flex flex-wrap gap-1">
                                                        {tpl.requiredSkills?.slice(0, 3).map(s => (
                                                            <Badge key={s} bg="secondary" className="fw-normal" style={{fontSize: '0.7rem'}}>{s}</Badge>
                                                        ))}
                                                        {(tpl.requiredSkills?.length || 0) > 3 && <Badge bg="light" text="dark" style={{fontSize: '0.7rem'}}>+{ (tpl.requiredSkills?.length || 0) - 3 }</Badge>}
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                        {/* Empty state for category if needed */}
                        {JOB_TEMPLATES.filter(tpl => tpl.category === cat).length === 0 && (
                            <div className="text-center text-muted py-5">
                                Žádné mise v této kategorii.
                            </div>
                        )}
                    </Tab>
                  ))}
                  <Tab eventKey="Agencies" title={<span className="fw-bold">🏢 Agentury</span>}>
                    <Row className="g-4 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
                      {AGENCY_JOBS.map((job, idx) => {
                        const agency = CZECH_AGENCIES.find(a => a.id === job.agencyId);
                        const matchPercent = 50;
                        const matchColor = 'warning';

                        return (
                          <Col key={idx}>
                            <Card className="h-100 border-0 shadow-sm hover-shadow cursor-pointer" style={{transition: '0.2s', cursor: 'pointer'}} onClick={() => handleAddAgencyJob(job)}>
                              <div style={{ height: '6px', backgroundColor: '#28a745' }}></div>
                              <Card.Body className="d-flex flex-column p-3">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                  <Badge bg="light" text="dark" className="border fw-normal">{job.location}</Badge>
                                  <div className="d-flex gap-1">
                                    {job.accommodation && <Badge bg="success" style={{fontSize: '0.65rem'}}>🏠</Badge>}
                                    {job.transportProvided && <Badge bg="primary" style={{fontSize: '0.65rem'}}>🚐</Badge>}
                                    {job.foreignWorkerFriendly && <Badge bg="warning" text="dark" style={{fontSize: '0.65rem'}}>🌍</Badge>}
                                  </div>
                                </div>
                                
                                <h6 className="card-title fw-bold mb-1 text-truncate" title={job.title}>{job.title}</h6>
                                <div className="text-muted small mb-2">{agency?.name || job.agencyName}</div>
                                
                                <div className="mb-3">
                                  <div className="fw-bold text-dark mb-1">{job.salaryRange}</div>
                                  <div className="d-flex flex-wrap gap-1">
                                    {job.jobType && <Badge bg="info" style={{fontSize: '0.7rem'}}>{job.jobType}</Badge>}
                                    {job.accommodation && job.accommodationType && <Badge bg="success" style={{fontSize: '0.7rem'}}>🏠 {job.accommodationType}</Badge>}
                                  </div>
                                </div>

                                <div className="mt-auto pt-3 border-top">
                                  <small className="text-muted d-block mb-2 fw-bold" style={{fontSize: '0.75rem'}}>REQ:</small>
                                  <div className="d-flex flex-wrap gap-1">
                                    {job.requiredSkills?.slice(0, 3).map(s => (
                                      <Badge key={s} bg="secondary" className="fw-normal" style={{fontSize: '0.7rem'}}>{s}</Badge>
                                    ))}
                                    {(job.requiredSkills?.length || 0) > 3 && <Badge bg="light" text="dark" style={{fontSize: '0.7rem'}}>+{ (job.requiredSkills?.length || 0) - 3 }</Badge>}
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                    <div className="text-center mt-3">
                      <small className="text-muted">🏢 {CZECH_AGENCIES.length} agentur • 💼 {AGENCY_JOBS.length} nabídek</small>
                    </div>
                  </Tab>
                </Tabs>

            <hr className="my-4"/>
            <div className="text-center">
                <Button variant="outline-dark" onClick={() => handleAddJob({ title: "Custom Quest", requiredSkills: [] })}>
                    + Vytvořit vlastní misi (Custom Quest)
                </Button>
            </div>
        </Modal.Body>
      </Modal>

      {/* Archive Section */}
      {archivedJobs.length > 0 && (
        <div className="mt-4">
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-secondary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">📂 Archived Jobs ({archivedJobs.length})</h5>
              <Button
                variant="outline-light"
                size="sm"
                onClick={() => setArchivedJobs([])}
              >
                Clear All
              </Button>
            </Card.Header>
            <Card.Body>
              <Row>
                {archivedJobs.map(job => (
                  <Col key={job.id} md={6} className="mb-3">
                    <Card className="border-secondary">
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{job.title}</h6>
                          <small className="text-muted">{job.company} • {job.location}</small>
                        </div>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => restoreJob(job.id)}
                        >
                          Restore
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Archive Drop Zone */}
      <div className="mt-3">
        <ArchiveDropZone onDrop={archiveJob} />
      </div>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="mb-3 me-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={4000} 
          autohide
          bg={toastVariant === 'success' ? 'success' : toastVariant === 'warning' ? 'warning' : 'info'}
        >
          <Toast.Body className="text-white fw-bold">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Context Menu for Jobs */}
      {contextMenuJob && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9998
            }}
            onClick={closeContextMenu}
          />
          <div
            style={{
              position: 'fixed',
              top: contextMenuJob.y,
              left: contextMenuJob.x,
              zIndex: 9999,
              minWidth: '200px'
            }}
            className="card shadow-lg"
          >
            <div className="card-body p-0">
              <div className="p-2 border-bottom bg-light">
                <strong className="text-truncate d-block" style={{maxWidth: '250px'}}>
                  {contextMenuJob.job.title}
                </strong>
                <small className="text-muted">{contextMenuJob.job.company}</small>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item 
                  action 
                  onClick={() => { toggleJobSelection(contextMenuJob.job.id); closeContextMenu(); }}
                  className={selectedJobIds.includes(contextMenuJob.job.id) ? 'bg-success bg-opacity-10 text-success fw-bold' : ''}
                >
                  {selectedJobIds.includes(contextMenuJob.job.id) ? '✓ Ve výběru' : '📌 Přidat do výběru'}
                </ListGroup.Item>
                {selectedJobIds.includes(contextMenuJob.job.id) && (
                  <ListGroup.Item 
                    action 
                    onClick={() => { removeFromSelection(contextMenuJob.job.id); closeContextMenu(); }}
                    className="text-danger"
                  >
                    🗑️ Odebrat z výběru
                  </ListGroup.Item>
                )}
                <ListGroup.Item action onClick={() => { closeContextMenu(); }}>
                  📋 Kopírovat název
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  onClick={() => { deleteJob(contextMenuJob.job.id); }}
                  className="text-danger"
                >
                  🗑️ Smazat (odebrat z boardu)
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </>
      )}

    </>
  );
}