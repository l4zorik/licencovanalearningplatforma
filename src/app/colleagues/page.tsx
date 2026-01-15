"use client";

import { useState } from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar, Button, Tabs, Tab } from 'react-bootstrap';
import Link from 'next/link';

interface Job {
    id: string;
    title: string;
    rating: number;
    dateRange: string;
    price: string;
    hourlyRate?: string;
    hours?: number;
    feedback: string;
    status: 'completed' | 'in_progress';
}

interface WorkExperience {
    id: string;
    title: string;
    rating: number;
    dateRange: string;
    price?: string;
    feedback: string;
    status: 'completed' | 'in_progress';
}

interface Colleague {
    id: string;
    name: string;
    role: string;
    avatar: string;
    skills: string[];
    completedJobs: number;
    inProgressJobs: number;
    totalEarnings: string;
    rating: number;
    hourlyRate?: string;
    jobSuccessScore?: string;
    verifiedPartner?: boolean;
    totalHours?: number;
    languages?: string[];
    education?: string;
    workTypes?: string[];
    jobs: Job[];
    workHistory?: WorkExperience[];
}

interface Colleague {
    id: string;
    name: string;
    role: string;
    avatar: string;
    skills: string[];
    completedJobs: number;
    inProgressJobs: number;
    totalEarnings: string;
    rating: number;
    hourlyRate?: string;
    jobSuccessScore?: string;
    verifiedPartner?: boolean;
    totalHours?: number;
    languages?: string[];
    education?: string;
    workTypes?: string[];
    jobs: Job[];
    workHistory?: WorkExperience[];
}

const COLLEAGUES: Colleague[] = [
    {
        id: "david-strejc",
        name: "David Strejc",
        role: "Architekt & Majitel | AutoERP.cz | Apertia.cz | Apertia.ai",
        avatar: "👨‍💻",
        skills: [
            "System Architecture",
            "Cloud Computing",
            "Infrastructure Design",
            "Enterprise Architecture",
            "OpenStack",
            "OpenNebula",
            "OpenShift",
            "Kubernetes",
            "Docker",
            "Ansible",
            "Puppet",
            "Chef",
            "SaltStack",
            "Terraform",
            "Nagios",
            "Sensu",
            "Grafana",
            "GrayLog2",
            "Fluentd",
            "Consul",
            "Linux",
            "Unix",
            "FreeBSD",
            "Debian",
            "Apache",
            "Nginx",
            "MySQL",
            "PostgreSQL",
            "MongoDB",
            "Python",
            "PHP",
            "Ruby on Rails",
            "Perl",
            "Bash",
            "Unix Shell Scripting",
            "TCP/IP",
            "DNS",
            "IPSec",
            "SDN",
            "KVM",
            "Rundeck",
            "Foreman",
            "Git",
            "Joomla",
            "Telco",
            "Integration"
        ],
        completedJobs: 47,
        inProgressJobs: 3,
        totalEarnings: "€200K+",
        rating: 4.95,
        hourlyRate: "€80.00/hr",
        jobSuccessScore: "98%",
        verifiedPartner: true,
        totalHours: 8920,
        languages: ["Czech (Native)", "English (Fluent)", "German (Basic)"],
        education: "Computer Science - Technical University",
        workTypes: ["System Architecture", "DevOps", "Cloud Infrastructure", "Enterprise Solutions"],
        jobs: [],
        workHistory: [
            {
                id: "apertia-1",
                title: "Apertia Tech s.r.o. - Founder & Architect | AutoCRM, AutoERP, Apertia.ai",
                rating: 5.0,
                dateRange: "červenec 2020 – současnost",
                feedback: "Building next-generation ERP and CRM systems with AI agents. Maximizing automation for business processes.",
                status: "in_progress"
            },
            {
                id: "apertia-2",
                title: "AutoCRM - AI-Powered Customer Relationship Management",
                rating: 5.0,
                dateRange: "2020 - 2025",
                feedback: "Complete automation system for customer management with AI agents",
                status: "completed"
            },
            {
                id: "apertia-3",
                title: "AutoERP - Enterprise Resource Planning Platform",
                rating: 5.0,
                dateRange: "2021 - 2025",
                feedback: "Comprehensive ERP solution with AI-driven insights and automation",
                status: "completed"
            },
            {
                id: "wpdistro-1",
                title: "WPDistro - Founder & Architect | WordPress Systems",
                rating: 5.0,
                dateRange: "leden 2019 – současnost",
                feedback: "Specialized WordPress solutions for e-shops and corporate websites",
                status: "in_progress"
            },
            {
                id: "o2-1",
                title: "IT Infrastructure Architect | O2 Czech Republic",
                rating: 5.0,
                dateRange: "listopad 2016 – červenec 2018",
                feedback: "Designed and implemented OpenStack cloud infrastructure for telecom operations",
                status: "completed"
            },
            {
                id: "easy-software-1",
                title: "System Architect Contractor | Easy Software Ltd.",
                rating: 5.0,
                dateRange: "leden 2015 – duben 2016",
                feedback: "Architecture and development of SaaS project management platform",
                status: "completed"
            },
            {
                id: "etnetera-1",
                title: "Senior Linux System Engineer | Etnetera",
                rating: 5.0,
                dateRange: "leden 2014 – prosinec 2014",
                feedback: "Cloud infrastructure and open source solutions for major Czech companies",
                status: "completed"
            },
            {
                id: "trask-1",
                title: "Senior System Engineer | Trask Solutions",
                rating: 5.0,
                dateRange: "duben 2013 – květen 2013",
                feedback: "Open source cloud solutions for banking sector",
                status: "completed"
            },
            {
                id: "tmobile-1",
                title: "Senior System & Solution Designer | T-Mobile Czech Republic",
                rating: 5.0,
                dateRange: "červen 2012 – březen 2013",
                feedback: "International RCS-e project implementation across European countries",
                status: "completed"
            },
            {
                id: "easy-early-1",
                title: "Co-Owner / CTO | Easy Software Ltd.",
                rating: 5.0,
                dateRange: "říjen 2006 – září 2011",
                feedback: "Co-founded company, developed Easy Project - competitor to MS Project and Basecamp",
                status: "completed"
            },
            {
                id: "zoom-1",
                title: "Junior / Senior System Administrator | ZOOM International",
                rating: 4.9,
                dateRange: "srpen 2005 – září 2006",
                feedback: "Administered 60 physical servers globally, developed Zoom Sentinel monitoring",
                status: "completed"
            },
            {
                id: "corenet-1",
                title: "Junior System Administrator | Corenet Solutions",
                rating: 4.5,
                dateRange: "duben 2004 – červenec 2004",
                feedback: "FreeBSD server administration and deployment",
                status: "completed"
            },
            {
                id: "europin-1",
                title: "Junior Web Administrator | Europin Group",
                rating: 4.5,
                dateRange: "leden 2003 – duben 2004",
                feedback: "First work experience - creative web design and technical support",
                status: "completed"
            }
        ]
    },
    {
        id: "eva-strejcova",
        name: "Eva Strejcová",
        role: "CEO | Apertia.ai & AutoERP | Transforming Companies with AI Agents",
        avatar: "👩‍💼",
        skills: [
            // Leadership & Strategy
            "CEO Leadership",
            "Business Strategy",
            "Company Transformation",
            "Enterprise Management",
            "Strategic Planning",
            "Team Leadership",
            "Decision Making",
            // AI & Automation
            "AI Agents",
            "No-Code/Low-Code",
            "Business Automation",
            "AI Implementation",
            "Digital Transformation",
            "Autonomous Systems",
            // Marketing & Product
            "Marketing Strategy",
            "Product Management",
            "Brand Development",
            "Customer Acquisition",
            "Market Analysis",
            "Digital Marketing",
            "PPC",
            "SEO",
            "Content Strategy",
            "PR Management",
            // Business Development
            "B2B Sales",
            "Client Relations",
            "Partnership Development",
            "Business Growth",
            "Revenue Growth",
            "Customer Retention",
            // Operations
            "Operations Management",
            "Process Optimization",
            "Project Management",
            "Team Management",
            "Cross-functional Collaboration",
            // Technical Understanding
            "ERP Systems",
            "CRM Systems",
            "Web Development",
            "WordPress",
            "E-commerce",
            "Analytics",
            "Customer Segmentation"
        ],
        completedJobs: 38,
        inProgressJobs: 5,
        totalEarnings: "€180K+",
        rating: 4.92,
        hourlyRate: "€95.00/hr",
        jobSuccessScore: "96%",
        verifiedPartner: true,
        totalHours: 6540,
        languages: ["Czech (Native)", "English (Fluent)", "German (Professional)"],
        education: "MBA - Marketing & Business Administration",
        workTypes: ["Executive Leadership", "AI & Automation", "Business Strategy", "Marketing & Product"],
        jobs: [],
        workHistory: [
            // Apertia - Current (2020-present)
            {
                id: "eva-apertia-1",
                title: "CEO | Apertia - Automated systems for company and business",
                rating: 5.0,
                dateRange: "červen 2020 – současnost",
                feedback: "Leading company transformation: building AI agents and autonomous business systems. AutoERP #nocode #locode with AI.",
                status: "in_progress"
            },
            {
                id: "eva-apertia-2",
                title: "AutoERP - No-Code/Low-Code ERP System with AI",
                rating: 5.0,
                dateRange: "2020 - 2025",
                feedback: "Product vision and implementation of AI-powered ERP system for business automation",
                status: "completed"
            },
            {
                id: "eva-apertia-3",
                title: "AI Agents Implementation for Enterprises",
                rating: 5.0,
                dateRange: "2022 - 2025",
                feedback: "Custom AI agent implementations transforming traditional businesses into autonomous organisms",
                status: "completed"
            },
            {
                id: "eva-apertia-4",
                title: "Apertia.ai - AI Agent Platform Launch",
                rating: 5.0,
                dateRange: "2023 - 2024",
                feedback: "Launched AI agent platform for business automation and digital workforce",
                status: "completed"
            },
            // WPDistro (2019-present)
            {
                id: "eva-wpdistro-1",
                title: "CEO | WPDistro - #1 WordPress Solutions in Czech Republic",
                rating: 5.0,
                dateRange: "leden 2019 – současnost",
                feedback: "Leading WordPress solutions for e-shops, websites, and enterprise systems. #1 in Czech Republic.",
                status: "in_progress"
            },
            {
                id: "eva-wpdistro-2",
                title: "Enterprise E-commerce Solutions",
                rating: 5.0,
                dateRange: "2019 - 2024",
                feedback: "High-performance e-commerce platforms and corporate website solutions",
                status: "completed"
            },
            {
                id: "eva-wpdistro-3",
                title: "WordPress Enterprise Transformation",
                rating: 5.0,
                dateRange: "2020 - 2022",
                feedback: "Enterprise WordPress implementations and custom system development",
                status: "completed"
            },
            // Lagardère Travel Retail (2012-2015)
            {
                id: "eva-lagardere-1",
                title: "Marketing & Product Manager | Mr. Baker, Hello!, Pizza La mia stazione",
                rating: 5.0,
                dateRange: "prosinec 2012 – duben 2015",
                feedback: "Complete marketing communication for 40+ outlets. Product development and market launch strategies.",
                status: "completed"
            },
            {
                id: "eva-lagardere-2",
                title: "Product Launch Strategy",
                rating: 5.0,
                dateRange: "2013 - 2015",
                feedback: "Successfully launched new products across international retail network",
                status: "completed"
            },
            {
                id: "eva-lagardere-3",
                title: "Multi-outlet Marketing Campaign",
                rating: 4.9,
                dateRange: "2012 - 2015",
                feedback: "Coordinated marketing initiatives across 40+ travel retail locations",
                status: "completed"
            },
            // Dun & Bradstreet (2011-2012)
            {
                id: "eva-dnb-1",
                title: "Marketing Manager Czech Republic & Slovakia | Dun & Bradstreet",
                rating: 5.0,
                dateRange: "říjen 2011 – prosinec 2012",
                feedback: "Regional marketing leadership for leading business data intelligence company",
                status: "completed"
            },
            {
                id: "eva-dnb-2",
                title: "B2B Marketing Strategy - Czech & Slovak Market",
                rating: 5.0,
                dateRange: "2011 - 2012",
                feedback: "Developed and executed marketing strategy for Czech and Slovak markets",
                status: "completed"
            },
            // Citfin (2008-2010, 2006-2007)
            {
                id: "eva-citfin-1",
                title: "Marketing Manager | Citfin",
                rating: 5.0,
                dateRange: "leden 2008 – červen 2010",
                feedback: "70% increase in internet clients (PPC, SEO, customer behavior analysis). Led complete company rebranding.",
                status: "completed"
            },
            {
                id: "eva-citfin-2",
                title: "Digital Marketing Transformation",
                rating: 5.0,
                dateRange: "2008 - 2010",
                feedback: "Increased online clients by 70% through PPC, SEO and customer behavior analytics",
                status: "completed"
            },
            {
                id: "eva-citfin-3",
                title: "Company Rebranding Project",
                rating: 5.0,
                dateRange: "2009 - 2010",
                feedback: "Led complete corporate rebranding and second brand launch targeting foreign residents",
                status: "completed"
            },
            {
                id: "eva-citfin-4",
                title: "Marketing Specialist | Citfin",
                rating: 4.8,
                dateRange: "červen 2006 – březen 2007",
                feedback: "Early marketing career - foundation in financial services marketing",
                status: "completed"
            },
            // OMV (2006-2007)
            {
                id: "eva-omv-1",
                title: "Marketing Specialist | OMV",
                rating: 4.8,
                dateRange: "červen 2006 – březen 2007",
                feedback: "Fuel retail marketing and customer acquisition strategies",
                status: "completed"
            },
            // Broker Trust (2005-2006)
            {
                id: "eva-broker-1",
                title: "Credit Specialist | Broker Trust",
                rating: 4.7,
                dateRange: "září 2005 – červen 2006",
                feedback: "Financial services and credit products specialist - career foundation",
                status: "completed"
            }
        ]
    },
    {
        id: "tomas-m",
        name: "Tomáš M.",
        role: "Webflow Expert-Vetted Certified Partner",
        avatar: "👨‍💻",
        skills: [
            // Core Webflow Skills
            "Webflow Certified Partner",
            "Webflow CMS Architecture",
            "Webflow Editor Experience",
            "Webflow Membership Sites",
            "Webflow E-commerce",
            "Webflow Logic",
            "Client-First Framework",
            // Design to Webflow Conversion
            "Figma to Webflow",
            "Figma Auto Layout to Webflow",
            "Figma Components to Webflow Symbols",
            "XD to Webflow",
            "Sketch to Webflow",
            "Photoshop to Webflow",
            "Pixel-Perfect Conversion",
            "Responsive Design Conversion",
            // Conversion Strategies
            "Design Audit & Analysis",
            "Content Mapping Strategy",
            "Component Reusability Strategy",
            "Breakpoint Strategy",
            "Class Naming Convention",
            "Style Guide Creation",
            "Design System Implementation",
            // Performance & SEO
            "Performance Optimization",
            "Core Web Vitals",
            "Technical SEO",
            "Semantic HTML",
            "Image Optimization Strategy",
            "Font Loading Strategy",
            "Script Management",
            // Advanced Features
            "GSAP Animations",
            "Lottie Animations",
            "Custom JavaScript",
            "API Integrations",
            "Zapier Automation",
            "HubSpot Integration",
            "Memberstack",
            "Stripe Payments",
            // CMS & Content
            "CMS Collection Strategy",
            "Dynamic Content Mapping",
            "Multi-language Setup",
            "Filter & Sort Logic",
            "Search Functionality",
            // Migration
            "WordPress to Webflow",
            "Squarespace to Webflow",
            "Wix to Webflow",
            "SEO-Safe Migration",
            "301 Redirect Strategy"
        ],
        completedJobs: 61,
        inProgressJobs: 21,
        totalEarnings: "$100K+",
        rating: 4.97,
        hourlyRate: "$40.00/hr",
        jobSuccessScore: "100%",
        verifiedPartner: true,
        totalHours: 1192,
        languages: ["English (Fluent)", "Czech (Native)"],
        education: "Robotics - Faculty of Electrical Engineering, University of West Bohemia",
        workTypes: ["Front-End Development", "Full Stack Development"],
        jobs: [
            {
                id: "job-1",
                title: "EU Academy website remake",
                rating: 5.0,
                dateRange: "Feb 25, 2024 - Nov 16, 2025",
                price: "$5,200.00",
                hourlyRate: "$40.00 /hr",
                hours: 130,
                feedback: "Excellent project completion",
                status: "completed"
            },
            {
                id: "job-2",
                title: "Wordpress to Webflow transfer",
                rating: 5.0,
                dateRange: "Oct 9, 2025 - Oct 9, 2025",
                price: "$1,000.00",
                feedback: "Tomas is amazing, super responsive and extremely talented Webflow developer! Absolute life saver!",
                status: "completed"
            },
            {
                id: "job-3",
                title: "Expert Webflow Developer Needed for Figma to Webflow Conversion",
                rating: 5.0,
                dateRange: "Jun 26, 2025 - Aug 6, 2025",
                price: "$1,000.00",
                feedback: "Excellent work. Did exactly what was asked of him and more. Would recommend 10/10!",
                status: "completed"
            },
            {
                id: "job-4",
                title: "EU Course landing page into Webflow",
                rating: 4.9,
                dateRange: "Jan 19, 2025 - Jul 23, 2025",
                price: "$1,350.00",
                feedback: "Great quality work, thank you",
                status: "completed"
            },
            {
                id: "job-5",
                title: "Webflow development Kirchgemeinde Deitingen",
                rating: 5.0,
                dateRange: "Dec 2, 2021 - Feb 27, 2025",
                price: "$3,200.00",
                feedback: "Professional development work",
                status: "completed"
            },
            {
                id: "job-6",
                title: "Webflow development nuvio",
                rating: 5.0,
                dateRange: "Dec 24, 2021 - Feb 27, 2025",
                price: "$3,500.00",
                feedback: "High quality Webflow development",
                status: "completed"
            },
            {
                id: "job-7",
                title: "Must Start Work Today: Build Webflow Site from Figma",
                rating: 5.0,
                dateRange: "Oct 4, 2023 - Jan 31, 2025",
                price: "$2,500.00",
                feedback: "Tomas is fantastic!! We were extremely happy with his work and plan to work with him again in the future.",
                status: "completed"
            },
            {
                id: "job-8",
                title: "Design web pages on existing Figma template and update Webflow",
                rating: 5.0,
                dateRange: "Jan 4, 2021 - Apr 23, 2024",
                price: "$1,770.00",
                hourlyRate: "$59.00 /hr",
                hours: 30,
                feedback: "Quality design work",
                status: "completed"
            },
            {
                id: "job-9",
                title: "Redevelopment/migration of website to Webflow",
                rating: 5.0,
                dateRange: "Jan 22, 2024 - Feb 25, 2024",
                price: "$2,000.00",
                hourlyRate: "$40.00 /hr",
                hours: 50,
                feedback: "Excellent and highly professional. Communicates quickly, clearly, efficiently, and the output quality is also impeccable. Thanks for the great results.",
                status: "completed"
            },
            {
                id: "job-10",
                title: "Build Webflow site from a Figma design",
                rating: 5.0,
                dateRange: "Dec 12, 2023 - Jan 4, 2024",
                price: "$1,600.00",
                hourlyRate: "$40.00 /hr",
                hours: 40,
                feedback: "Tomas was a pleasure to work with and extremely talented. I would hire him again.",
                status: "completed"
            },
    {
        id: "job-11",
                title: "In Progress: E-commerce platform redesign",
                rating: 0,
                dateRange: "Started Nov 2025",
                price: "TBD",
                feedback: "Currently in development",
                status: "in_progress"
            },
            // Starší zakázky (2020-2023)
            {
                id: "job-12",
                title: "Webflow Development - Construction Consulting",
                rating: 5.0,
                dateRange: "Dec 28, 2022 - Aug 24, 2023",
                price: "$3,700.00",
                feedback: "Professional Webflow development",
                status: "completed"
            },
            {
                id: "job-13",
                title: "Webflow Development - Community",
                rating: 4.9,
                dateRange: "Jul 30, 2022 - Dec 28, 2022",
                price: "$1,468.50",
                feedback: "Thomas helped us with creating a page in webflow and we are very happy with the result and the collaboration.",
                status: "completed"
            },
            {
                id: "job-14",
                title: "gpk – Webflow Development",
                rating: 5.0,
                dateRange: "May 28, 2022 - Aug 8, 2022",
                price: "$2,741.20",
                feedback: "Tomas helped us with a Webflow website and did a good job with it. We are happy with the result.",
                status: "completed"
            },
            {
                id: "job-15",
                title: "Agency Webflow development",
                rating: 5.0,
                dateRange: "Apr 20, 2022 - May 23, 2022",
                price: "$2,937.00",
                feedback: "Great Freelancer to work with! Has high standards and finds solutions for all our wishes :-)",
                status: "completed"
            },
            {
                id: "job-16",
                title: "Beauty Cosmetics – Webflow Development",
                rating: 5.0,
                dateRange: "Feb 9, 2022 - Mar 3, 2022",
                price: "$1,458.00",
                feedback: "Tomas did a great job, fast and professional. The communication was great and we are very happy with the result.",
                status: "completed"
            },
            {
                id: "job-17",
                title: "Webflow developer - responsive travel site",
                rating: 5.0,
                dateRange: "Oct 28, 2021 - Nov 13, 2021",
                price: "$1,314.30",
                feedback: "Extremely talented developer who writes Quality scalable code. Executed our XD design in Webflow to perfection.",
                status: "completed"
            },
            {
                id: "job-18",
                title: "Real Estate Website development in Webflow",
                rating: 5.0,
                dateRange: "Jul 28, 2021 - Nov 4, 2021",
                price: "$3,166.40",
                feedback: "Tomas helped us a lot with creating a great website.",
                status: "completed"
            },
            {
                id: "job-19",
                title: "Fashion Store Website development in Webflow",
                rating: 5.0,
                dateRange: "Aug 27, 2021 - Nov 4, 2021",
                price: "$2,275.85",
                feedback: "Tomas works very professionally and is a great freelancer",
                status: "completed"
            },
            {
                id: "job-20",
                title: "Need Website development within Webflow",
                rating: 5.0,
                dateRange: "May 8, 2021 - Aug 27, 2021",
                price: "$4,452.75",
                feedback: "Great service and found solutions for everything. Amazing partner to work with.",
                status: "completed"
            },
            {
                id: "job-21",
                title: "Implement figma design in webflow",
                rating: 5.0,
                dateRange: "Jul 12, 2021 - Aug 18, 2021",
                price: "$665.01",
                hourlyRate: "$30.00 /hr",
                hours: 23,
                feedback: "Pleasure to work with Tomas!",
                status: "completed"
            },
            {
                id: "job-22",
                title: "Webflow Website Adpations Help",
                rating: 5.0,
                dateRange: "Nov 10, 2020 - Jul 28, 2021",
                price: "$494.75",
                feedback: "GREAT GREAT GREAT",
                status: "completed"
            },
            {
                id: "job-23",
                title: "Webflow wizard - 50+ page website",
                rating: 5.0,
                dateRange: "Dec 18, 2020 - Apr 23, 2021",
                price: "$3,416.00",
                feedback: "Tomas is one of the best! His communication and attention to detail are amazing.",
                status: "completed"
            },
            {
                id: "job-24",
                title: "Need Webflow Expert To Build New Website",
                rating: 5.0,
                dateRange: "Mar 17, 2021 - Apr 16, 2021",
                price: "$1,259.97",
                hourlyRate: "$99.00 /hr",
                hours: 13,
                feedback: "Tomas did a great job on this Webflow project. This is the second time we have worked together.",
                status: "completed"
            },
            {
                id: "job-25",
                title: "Experienced Web Dev Project Manager - Webflow Expert",
                rating: 5.0,
                dateRange: "Feb 13, 2021 - Mar 5, 2021",
                price: "$2,725.80",
                hourlyRate: "$110.00 /hr",
                hours: 22,
                feedback: "Tomas is fantastic! He did a great job helping me create a webflow site.",
                status: "completed"
            },
            {
                id: "job-26",
                title: "More than Beauty Website",
                rating: 5.0,
                dateRange: "Sep 6, 2020 - Jan 4, 2021",
                price: "$685.30",
                feedback: "We are super happy with the professional work from Tomas and the result of the page.",
                status: "completed"
            },
            {
                id: "job-27",
                title: "Developer needed to build Webflow site",
                rating: 0,
                dateRange: "Nov 23, 2020 - Jan 4, 2021",
                price: "$1,360.10",
                feedback: "No feedback given",
                status: "completed"
            },
            {
                id: "job-28",
                title: "Website Development in Webflow",
                rating: 5.0,
                dateRange: "Oct 27, 2020 - Nov 18, 2020",
                price: "$1,484.25",
                feedback: "10/10 as always!",
                status: "completed"
            },
            {
                id: "job-29",
                title: "Website Development in Webflow",
                rating: 5.0,
                dateRange: "Oct 16, 2020 - Nov 7, 2020",
                price: "$5,416.17",
                feedback: "Tomas helped us launch a big site within short time and even tho we had a short timeline the result was great.",
                status: "completed"
            },
            {
                id: "job-30",
                title: "Igomed Landing Page Development in Webflow",
                rating: 5.0,
                dateRange: "Oct 14, 2020 - Oct 27, 2020",
                price: "$1,762.20",
                feedback: "Great Work",
                status: "completed"
            },
            {
                id: "job-31",
                title: "Convert Figma design to Webflow (2 languages)",
                rating: 5.0,
                dateRange: "Oct 8, 2020 - Oct 15, 2020",
                price: "$968.50",
                feedback: "Fast turn around, great communication, did fine-tune and did the extra mile to make the website fast and SEO effective.",
                status: "completed"
            },
            {
                id: "job-32",
                title: "Relaunch Chilifresh + Support",
                rating: 5.0,
                dateRange: "Aug 3, 2020 - Sep 5, 2020",
                price: "$2,153.80",
                feedback: "thank you!",
                status: "completed"
            },
            {
                id: "job-33",
                title: "Webflow Dynamic field",
                rating: 5.0,
                dateRange: "Aug 26, 2020 - Aug 26, 2020",
                price: "$210.76",
                feedback: "Tomas is talented and he has a big heart. I would strongly recommend him.",
                status: "completed"
            },
            {
                id: "job-34",
                title: "Relaunch eyonawa",
                rating: 4.9,
                dateRange: "Jun 25, 2020 - Jul 23, 2020",
                price: "$1,517.45",
                feedback: "Tomas delivered a nice solution for a complex website with lot of cms elements. 10/10!",
                status: "completed"
            },
            {
                id: "job-35",
                title: "Recreate Webflow Site",
                rating: 5.0,
                dateRange: "Jun 11, 2020 - Jun 29, 2020",
                price: "$576.90",
                feedback: "Professional recreation",
                status: "completed"
            },
            {
                id: "job-36",
                title: "Looking for a webflow expert",
                rating: 0,
                dateRange: "Mar 31, 2020 - Jun 13, 2020",
                price: "$28.74",
                feedback: "No feedback given",
                status: "completed"
            },
            {
                id: "job-37",
                title: "Webflow Website",
                rating: 4.9,
                dateRange: "May 26, 2020 - Jun 13, 2020",
                price: "$391.60",
                feedback: "Everything perfect, good job for a small price.",
                status: "completed"
            },
            {
                id: "job-38",
                title: "Webflow Horizontal Gallery Development",
                rating: 5.0,
                dateRange: "May 11, 2020 - May 12, 2020",
                price: "$48.95",
                feedback: "This is the second time i worked with Thomas Marek and the result is amazing again.",
                status: "completed"
            },
            {
                id: "job-39",
                title: "Looking for a webflow expert",
                rating: 5.0,
                dateRange: "Mar 21, 2020 - Mar 21, 2020",
                price: "$19.16",
                feedback: "Quick and professional",
                status: "completed"
            },
            {
                id: "job-40",
                title: "Need Webflow Website (with cms items), Design exists",
                rating: 5.0,
                dateRange: "Mar 5, 2020 - Mar 20, 2020",
                price: "$788.20",
                hourlyRate: "$55.00 /hr",
                hours: 15,
                feedback: "I am absolutely happy with the result. Tomas did an amazing job with fulfilling high requirements.",
                status: "completed"
            }
        ]
    }
];

export default function ColleaguesPage() {
    const [selectedColleague, setSelectedColleague] = useState<Colleague>(COLLEAGUES[0]);
    const [filter, setFilter] = useState<'all' | 'completed' | 'in_progress'>('all');

    const workItems = selectedColleague.workHistory || selectedColleague.jobs;
    const hasWorkHistory = !!selectedColleague.workHistory;
    const isJob = (item: Job | WorkExperience): item is Job => 'hourlyRate' in item;
    
    const filteredJobs = workItems.filter(job => {
        if (filter === 'all') return true;
        return job.status === filter;
    });

    const totalCompleted = workItems.filter(j => j.status === 'completed').length;
    const totalInProgress = workItems.filter(j => j.status === 'in_progress').length;

    return (
        <main className="min-vh-100 bg-dark text-white pb-5">
            <nav className="navbar navbar-dark mb-4 sticky-top shadow-sm" style={{ backgroundColor: '#1a1d21', borderBottom: '2px solid #17a2b8' }}>
                <Container fluid>
                    <Link href="/" className="btn btn-outline-light btn-sm">
                        ← Back to Dashboard
                    </Link>
                    <span className="navbar-brand mb-0 h5 mx-auto text-info">
                        👥 Kolegové
                    </span>
                    <div></div>
                </Container>
            </nav>

            <Container>
                <Row className="mb-4">
                    <Col>
                        <h1 className="display-5 fw-bold">Sledování Kolegů</h1>
                        <p className="text-white-50">Sledujte pokrok a inspirujte se prací svých kolegů</p>
                    </Col>
                </Row>

                <Row>
                    <Col lg={4}>
                        <Card className="bg-dark mb-4" style={{ borderColor: '#17a2b8' }}>
                            <Card.Header className="bg-info text-dark">
                                <h5 className="mb-0">👥 Kolegové</h5>
                            </Card.Header>
                            <Card.Body className="p-0">
                                {COLLEAGUES.map(colleague => (
                                    <div 
                                        key={colleague.id}
                                        onClick={() => setSelectedColleague(colleague)}
                                        className={`p-3 border-bottom cursor-pointer ${selectedColleague.id === colleague.id ? 'bg-info bg-opacity-10' : ''}`}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <span className="fs-3 me-3">{colleague.avatar}</span>
                                            <div>
                                                <div className="fw-bold text-white">{colleague.name}</div>
                                                <small className="text-light">{colleague.role}</small>
                                            </div>
                                            {selectedColleague.id === colleague.id && (
                                                <Badge bg="info" className="ms-auto text-dark">Active</Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>

                        {selectedColleague && (
                            <Card className="bg-dark border-secondary">
                                <Card.Body>
                                    <div className="text-center mb-3">
                                        <span className="display-4">{selectedColleague.avatar}</span>
                                        <h4 className="mt-2 text-white">{selectedColleague.name}</h4>
                                        {selectedColleague.verifiedPartner && (
                                            <Badge bg="warning" text="dark" className="mb-2">💎 Expert-Vetted Partner</Badge>
                                        )}
                                        <div className="d-flex justify-content-center flex-wrap gap-1 mt-2">
                                            {selectedColleague.workTypes?.map(type => (
                                                <Badge key={type} bg="primary" className="small">{type}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <Row className="text-center mb-3">
                                        <Col>
                                            <div className="fw-bold fs-4 text-success">{selectedColleague.completedJobs}</div>
                                            <small className="text-light">Úkolů</small>
                                        </Col>
                                        <Col>
                                            <div className="fw-bold fs-4 text-warning">{selectedColleague.totalHours}+</div>
                                            <small className="text-light">Hodin</small>
                                        </Col>
                                        <Col>
                                            <div className="fw-bold fs-4 text-info">{selectedColleague.rating}</div>
                                            <small className="text-light">⭐ Rating</small>
                                        </Col>
                                    </Row>

                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between mb-1">
                                            <small className="text-light">Celkové příjmy</small>
                                            <span className="fw-bold text-success">{selectedColleague.totalEarnings}</span>
                                        </div>
                                        {selectedColleague.hourlyRate && (
                                            <div className="d-flex justify-content-between mb-1">
                                                <small className="text-light">Hodinová sazba</small>
                                                <span className="fw-bold text-warning">{selectedColleague.hourlyRate}</span>
                                            </div>
                                        )}
                                        {selectedColleague.jobSuccessScore && (
                                            <div className="d-flex justify-content-between">
                                                <small className="text-light">Job Success</small>
                                                <span className="fw-bold text-success">{selectedColleague.jobSuccessScore}</span>
                                            </div>
                                        )}
                                    </div>

                                    {selectedColleague.education && (
                                        <div className="mb-2">
                                            <small className="text-light d-block">🎓 Vzdělání</small>
                                            <small className="text-white">{selectedColleague.education}</small>
                                        </div>
                                    )}

                                    {selectedColleague.languages && (
                                        <div className="mb-2">
                                            <small className="text-light d-block">🌍 Jazyky</small>
                                            <div className="d-flex flex-wrap gap-1">
                                                {selectedColleague.languages.map(lang => (
                                                    <Badge key={lang} bg="info" text="dark" className="small">{lang}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <small className="text-light d-block mb-2">Expertízy:</small>
                                        <div className="d-flex flex-wrap gap-1">
                                            {selectedColleague.skills.slice(0, 15).map(skill => (
                                                <Badge key={skill} bg="secondary" className="small">{skill}</Badge>
                                            ))}
                                            {selectedColleague.skills.length > 15 && (
                                                <Badge bg="dark" className="small">+{selectedColleague.skills.length - 15} dalších</Badge>
                                            )}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>

                    <Col lg={8}>
                        <Card className="bg-dark" style={{ borderColor: '#6c757d' }}>
                            <Card.Header className="bg-secondary text-white">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">📋 {hasWorkHistory ? 'Bývalé práce' : 'Zakázky'} - {selectedColleague.name}</h5>
                                    <div className="d-flex gap-2">
                                        <Button 
                                            variant={filter === 'all' ? 'info' : 'outline-info'} 
                                            size="sm"
                                            onClick={() => setFilter('all')}
                                        >
                                            Vše ({workItems.length})
                                        </Button>
                                        <Button 
                                            variant={filter === 'completed' ? 'success' : 'outline-success'} 
                                            size="sm"
                                            onClick={() => setFilter('completed')}
                                        >
                                            Dokončeno ({totalCompleted})
                                        </Button>
                                        <Button 
                                            variant={filter === 'in_progress' ? 'warning' : 'outline-warning'} 
                                            size="sm"
                                            onClick={() => setFilter('in_progress')}
                                        >
                                            V procesu ({totalInProgress})
                                        </Button>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-0">
                                {filteredJobs.map((job, index) => (
                                    <div key={job.id} className="p-4 border-bottom" style={{ backgroundColor: '#2d3035' }}>
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <h6 className="text-white mb-1">{job.title}</h6>
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <Badge 
                                                        bg={job.status === 'completed' ? 'success' : 'warning'}
                                                        className="small"
                                                    >
                                                        {job.status === 'completed' ? '✅ Dokončeno' : '🔄 V procesu'}
                                                    </Badge>
                                                    <small className="text-light">{job.dateRange}</small>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                {job.price ? <div className="fw-bold text-white fs-5">{job.price}</div> : null}
                                                {isJob(job) && job.hourlyRate && (
                                                    <small className="text-light">{job.hourlyRate} • {job.hours} hours</small>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {job.rating > 0 && (
                                            <div className="mb-2">
                                                <span className="text-warning">⭐ {job.rating.toFixed(1)}</span>
                                            </div>
                                        )}
                                        
                                        {job.feedback && (
                                            <div className="bg-dark p-3 rounded border border-secondary">
                                                <small className="text-light fst-italic">"{job.feedback}"</small>
                                            </div>
                                        )}

                                        {index < filteredJobs.length - 1 && (
                                            <div className="text-center mt-3">
                                                <small className="text-secondary">↓</small>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {filteredJobs.length === 0 && (
                                    <div className="p-5 text-center text-light">
                                        <div className="fs-1 mb-3">📭</div>
                                        <p>Žádné {hasWorkHistory ? 'bývalé práce' : 'zakázky'} v této kategorii</p>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>

                        <div className="text-center mt-3">
                            <Button variant="outline-secondary" size="sm">
                                ← Předchozí stránka
                            </Button>
                            <span className="mx-3 text-light">Stránka 1 z 41</span>
                            <Button variant="outline-secondary" size="sm">
                                Další stránka →
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <Card className="bg-primary bg-opacity-10 border-primary">
                            <Card.Body className="text-center">
                                <h5 className="text-white">💡 Inspirace</h5>
                                <p className="text-light mb-3">
                                    Sledujte práci svých kolegů a inspirujte se pro vlastní projekty. 
                                    Pozorujte jejich workflow, techniky a přístupy k práci.
                                </p>
                                <div className="d-flex justify-content-center gap-3">
                                    <Button variant="primary" size="sm">
                                        📊 Porovnat s mými statistikami
                                    </Button>
                                    <Button variant="outline-primary" size="sm">
                                        💾 Exportovat data
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}
