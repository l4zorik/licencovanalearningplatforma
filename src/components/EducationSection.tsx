"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { Card, Badge, Button, ListGroup, Row, Col, Modal, Tabs, Tab, Dropdown, Toast, ToastContainer, ProgressBar, Collapse } from 'react-bootstrap';
import { Course, SkillCategory } from '@/types';
import { COMPREHENSIVE_SKILL_DATA, CNC_FACTS } from '@/data/skills/comprehensive-skills';


type DisplaySkill = {
  id: string;
  title: string;
  platform: string;
  category: SkillCategory;
  instructor?: string;
  totalHours: number;
  tags: string[];
  description: string;
  modules: { id: string; title: string; isCompleted: boolean }[];
  resources: { name: string; url: string; type: string }[];
  difficulty: number;
  careerPaths: string[];
  iconColor: string;
  icon: string;
  marketData?: {
    demandIndex: number;
    salaryRange: { junior: number; senior: number };
    trend: string;
  };
};

export const SKILL_TEMPLATES: DisplaySkill[] = COMPREHENSIVE_SKILL_DATA.map(skill => ({
  id: skill.id,
  title: skill.name,
  platform: 'Multiple platforms',
  category: skill.category,
  instructor: 'Industry experts',
  totalHours: skill.marketData.difficultyToLearn * 40,
  tags: skill.tags,
  description: skill.longDescription,
  modules: skill.projects.length > 0 
    ? skill.projects.map((p, i) => ({ id: `${skill.id}-p${i}`, title: p.title, isCompleted: false }))
    : [
        { id: `${skill.id}-m1`, title: `Základy ${skill.name}`, isCompleted: false },
        { id: `${skill.id}-m2`, title: `Praktické aplikace`, isCompleted: false },
        { id: `${skill.id}-m3`, title: `Pokročilé techniky`, isCompleted: false },
        { id: `${skill.id}-m4`, title: `Certifikace a praxe`, isCompleted: false }
      ],
  resources: skill.resources.length > 0 
    ? skill.resources 
    : [
        { name: `${skill.name} Official Documentation`, url: '#', type: 'doc' },
        { name: `Online kurzy (Udemy, Coursera)`, url: '#', type: 'course' },
        { name: `YouTube tutoriály`, url: '#', type: 'video' },
        { name: `Knihy a e-booky`, url: '#', type: 'book' }
      ],
  difficulty: skill.marketData.difficultyToLearn,
  careerPaths: skill.careerPaths,
  iconColor: skill.iconColor,
  icon: skill.icon,
  marketData: {
    demandIndex: skill.marketData.demandIndex,
    salaryRange: { junior: skill.marketData.salaryRange.junior, senior: skill.marketData.salaryRange.senior },
    trend: skill.marketData.trend
  }
}));

// Hierarchical skill categories structure
const SKILL_CATEGORIES_HIERARCHY = {
  'Development': {
    icon: '💻',
    subcategories: [
      'Programming',
      'Web Development',
      'Frontend Development',
      'Backend Development',
      'Fullstack Development',
      'Mobile Development',
      'Game Development',
      '3D & GameDev',
      'Hardware Development',
      'Embedded Systems',
      'IoT & Robotics',
      'Blockchain & Crypto',
      'AR/VR Development',
      'UI/UX Design'
    ]
  },
  'AI & Data': {
    icon: '🤖',
    subcategories: [
      'Data Science & AI',
      'Machine Learning Engineering',
      'Computer Vision',
      'Natural Language Processing',
      'Big Data',
      'Business Intelligence',
      'Data Engineering',
      'ETL Development',
      'Data Visualization',
      'Statistical Analysis',
      'Predictive Modeling',
      'A/B Testing',
      'Data & Analytics'
    ]
  },
  'Security': {
    icon: '🛡️',
    subcategories: [
      'Cybersecurity',
      'Penetration Testing',
      'Network Security',
      'Application Security',
      'Cloud Security',
      'Mobile Security',
      'IoT Security',
      'Blockchain Security',
      'Bug Bounty Programs',
      'Security Research',
      'Security & Safety',
      'Access Control',
      'Identity Management',
      'Single Sign-On',
      'Multi-Factor Authentication',
      'OAuth',
      'JWT',
      'API Security',
      'Data Encryption'
    ]
  },
  'Infrastructure': {
    icon: '☁️',
    subcategories: [
      'Cloud & DevOps',
      'DevOps & Infrastructure',
      'Cloud Computing',
      'Database Administration',
      'API Development',
      'Microservices Architecture',
      'Continuous Integration',
      'Continuous Deployment',
      'Infrastructure as Code',
      'Container Orchestration',
      'Monitoring & Logging',
      'Site Reliability Engineering',
      'System Administration',
      'Server Management',
      'Backup & Recovery',
      'Disaster Recovery',
      'High Availability',
      'Scalability',
      'Load Balancing',
      'Caching Strategies',
      'CDN Management',
      'SSL/TLS Management',
      'Domain Management',
      'DNS Management',
      'Firewall Management',
      'VPN Management'
    ]
  },
  'Compliance': {
    icon: '📋',
    subcategories: [
      'GDPR',
      'HIPAA',
      'PCI DSS',
      'SOX',
      'ISO 27001',
      'Cybersecurity Auditing',
      'Vulnerability Assessment',
      'Forensic Analysis',
      'Malware Analysis',
      'Threat Intelligence',
      'Security Operations Center',
      'SIEM Systems',
      'Intrusion Detection',
      'Risk Assessment',
      'Security Policies',
      'Incident Management',
      'Crisis Management',
      'Business Continuity',
      'Disaster Recovery Planning'
    ]
  },
  'Business': {
    icon: '💼',
    subcategories: [
      'Management & Leadership',
      'Project Management',
      'Agile/Scrum',
      'Kanban',
      'Business & Finance',
      'Marketing & PR',
      'Performance Marketing',
      'SEO/SEM',
      'Social Media Marketing',
      'Content Marketing',
      'Email Marketing',
      'CRM Systems',
      'Sales Automation',
      'Customer Analytics',
      'Human Resources'
    ]
  },
  'Creative': {
    icon: '🎨',
    subcategories: [
      'Creative & Media',
      'Writing & Content',
      'Art & Creativity',
      'Music Production',
      'UI/UX Design'
    ]
  },
  'Trades': {
    icon: '🏗️',
    subcategories: [
      'CNC & Engineering',
      'Construction & Trades',
      'Manufacturing & Production',
      'Automechanic',
      'Agriculture & Environment',
      'Hospitality & Tourism',
      'Retail & Sales',
      'Transportation & Logistics'
    ]
  },
  'Professional': {
    icon: '🏥',
    subcategories: [
      'Healthcare & Medical',
      'Education & Training',
      'Science & Research',
      'Green & Sustainability',
      'Legal & Compliance',
      'Customer Service',
      'Quality Assurance',
      'Fitness & Health',
      'Reselling & Business'
    ]
  }
};

  // Flatten all subcategories for backward compatibility
  const SKILL_CATEGORIES = Object.values(SKILL_CATEGORIES_HIERARCHY)
    .flatMap(category => category.subcategories);

const CATEGORY_STYLES: Record<string, { primary: string; secondary: string; gradient: string }> = {
  // Core Development
  'Web Development': { primary: '#E34F26', secondary: '#B93A1F', gradient: 'linear-gradient(135deg, #E34F26 0%, #B93A1F 100%)' },
  'Frontend Development': { primary: '#61DAFB', secondary: '#4CA8C9', gradient: 'linear-gradient(135deg, #61DAFB 0%, #4CA8C9 100%)' },
  'Backend Development': { primary: '#339933', secondary: '#287028', gradient: 'linear-gradient(135deg, #339933 0%, #287028 100%)' },
  'Fullstack Development': { primary: '#F7DF1E', secondary: '#C4AD18', gradient: 'linear-gradient(135deg, #F7DF1E 0%, #C4AD18 100%)' },
  'Mobile Development': { primary: '#A4C639', secondary: '#83992E', gradient: 'linear-gradient(135deg, #A4C639 0%, #83992E 100%)' },
  'Game Development': { primary: '#000000', secondary: '#333333', gradient: 'linear-gradient(135deg, #000000 0%, #333333 100%)' },
  'Hardware Development': { primary: '#FF6B35', secondary: '#CC562B', gradient: 'linear-gradient(135deg, #FF6B35 0%, #CC562B 100%)' },
  'Embedded Systems': { primary: '#00979D', secondary: '#007875', gradient: 'linear-gradient(135deg, #00979D 0%, #007875 100%)' },
  'IoT & Robotics': { primary: '#FF4500', secondary: '#CC3700', gradient: 'linear-gradient(135deg, #FF4500 0%, #CC3700 100%)' },
  'Blockchain & Crypto': { primary: '#363636', secondary: '#2A2A2A', gradient: 'linear-gradient(135deg, #363636 0%, #2A2A2A 100%)' },
  'AR/VR Development': { primary: '#8B5CF6', secondary: '#7C3AED', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' },
  'UI/UX Design': { primary: '#FF61F6', secondary: '#CC4DC5', gradient: 'linear-gradient(135deg, #FF61F6 0%, #CC4DC5 100%)' },

  // AI & Data
  'Machine Learning Engineering': { primary: '#FF6F00', secondary: '#CC5900', gradient: 'linear-gradient(135deg, #FF6F00 0%, #CC5900 100%)' },
  'Computer Vision': { primary: '#9C27B0', secondary: '#7B1FA2', gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' },
  'Natural Language Processing': { primary: '#2196F3', secondary: '#1976D2', gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' },
  'Big Data': { primary: '#FFC107', secondary: '#FF8F00', gradient: 'linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)' },
  'Business Intelligence': { primary: '#3F51B5', secondary: '#303F9F', gradient: 'linear-gradient(135deg, #3F51B5 0%, #303F9F 100%)' },
  'Data Engineering': { primary: '#00BCD4', secondary: '#0097A7', gradient: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)' },
  'ETL Development': { primary: '#8BC34A', secondary: '#689F38', gradient: 'linear-gradient(135deg, #8BC34A 0%, #689F38 100%)' },
  'Data Visualization': { primary: '#FF9800', secondary: '#F57C00', gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' },
  'Statistical Analysis': { primary: '#9E9E9E', secondary: '#757575', gradient: 'linear-gradient(135deg, #9E9E9E 0%, #757575 100%)' },
  'Predictive Modeling': { primary: '#673AB7', secondary: '#512DA8', gradient: 'linear-gradient(135deg, #673AB7 0%, #512DA8 100%)' },
  'A/B Testing': { primary: '#795548', secondary: '#5D4037', gradient: 'linear-gradient(135deg, #795548 0%, #5D4037 100%)' },

  // Security
  'Penetration Testing': { primary: '#F44336', secondary: '#D32F2F', gradient: 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)' },
  'Network Security': { primary: '#00D4FF', secondary: '#0099CC', gradient: 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)' },
  'Application Security': { primary: '#4CAF50', secondary: '#388E3C', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  'Cloud Security': { primary: '#607D8B', secondary: '#455A64', gradient: 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)' },
  'Mobile Security': { primary: '#9C27B0', secondary: '#7B1FA2', gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' },
  'IoT Security': { primary: '#FF5722', secondary: '#D84315', gradient: 'linear-gradient(135deg, #FF5722 0%, #D84315 100%)' },
  'Blockchain Security': { primary: '#363636', secondary: '#2A2A2A', gradient: 'linear-gradient(135deg, #363636 0%, #2A2A2A 100%)' },
  'Bug Bounty Programs': { primary: '#E91E63', secondary: '#C2185B', gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' },
  'Security Research': { primary: '#3F51B5', secondary: '#303F9F', gradient: 'linear-gradient(135deg, #3F51B5 0%, #303F9F 100%)' },

  // DevOps & Infrastructure
  'DevOps & Infrastructure': { primary: '#FF9900', secondary: '#CC7A00', gradient: 'linear-gradient(135deg, #FF9900 0%, #CC7A00 100%)' },
  'Database Administration': { primary: '#336791', secondary: '#2A5475', gradient: 'linear-gradient(135deg, #336791 0%, #2A5475 100%)' },
  'API Development': { primary: '#00BCD4', secondary: '#0097A7', gradient: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)' },
  'Microservices Architecture': { primary: '#FF7043', secondary: '#F4511E', gradient: 'linear-gradient(135deg, #FF7043 0%, #F4511E 100%)' },
  'Cloud Computing': { primary: '#4285F4', secondary: '#3367D6', gradient: 'linear-gradient(135deg, #4285F4 0%, #3367D6 100%)' },
  'Continuous Integration': { primary: '#4CAF50', secondary: '#388E3C', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  'Continuous Deployment': { primary: '#8BC34A', secondary: '#689F38', gradient: 'linear-gradient(135deg, #8BC34A 0%, #689F38 100%)' },
  'Infrastructure as Code': { primary: '#607D8B', secondary: '#455A64', gradient: 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)' },
  'Container Orchestration': { primary: '#2496ED', secondary: '#1976D2', gradient: 'linear-gradient(135deg, #2496ED 0%, #1976D2 100%)' },
  'Monitoring & Logging': { primary: '#FF5722', secondary: '#D84315', gradient: 'linear-gradient(135deg, #FF5722 0%, #D84315 100%)' },
  'Site Reliability Engineering': { primary: '#9C27B0', secondary: '#7B1FA2', gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' },
  'System Administration': { primary: '#795548', secondary: '#5D4037', gradient: 'linear-gradient(135deg, #795548 0%, #5D4037 100%)' },
  'Server Management': { primary: '#9E9E9E', secondary: '#757575', gradient: 'linear-gradient(135deg, #9E9E9E 0%, #757575 100%)' },
  'Backup & Recovery': { primary: '#FFC107', secondary: '#FF8F00', gradient: 'linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)' },
  'Disaster Recovery': { primary: '#F44336', secondary: '#D32F2F', gradient: 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)' },
  'High Availability': { primary: '#4CAF50', secondary: '#388E3C', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  'Scalability': { primary: '#2196F3', secondary: '#1976D2', gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' },
  'Load Balancing': { primary: '#FF9800', secondary: '#F57C00', gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' },
  'Caching Strategies': { primary: '#E91E63', secondary: '#C2185B', gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' },
  'CDN Management': { primary: '#3F51B5', secondary: '#303F9F', gradient: 'linear-gradient(135deg, #3F51B5 0%, #303F9F 100%)' },
  'SSL/TLS Management': { primary: '#4CAF50', secondary: '#388E3C', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  'Domain Management': { primary: '#00BCD4', secondary: '#0097A7', gradient: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)' },
  'DNS Management': { primary: '#673AB7', secondary: '#512DA8', gradient: 'linear-gradient(135deg, #673AB7 0%, #512DA8 100%)' },
  'Firewall Management': { primary: '#F44336', secondary: '#D32F2F', gradient: 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)' },
  'VPN Management': { primary: '#2196F3', secondary: '#1976D2', gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' },

  // Access & Identity
  'Access Control': { primary: '#607D8B', secondary: '#455A64', gradient: 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)' },
  'Identity Management': { primary: '#9C27B0', secondary: '#7B1FA2', gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' },
  'Single Sign-On': { primary: '#FF9800', secondary: '#F57C00', gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' },
  'Multi-Factor Authentication': { primary: '#4CAF50', secondary: '#388E3C', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  'OAuth': { primary: '#E91E63', secondary: '#C2185B', gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' },
  'JWT': { primary: '#00BCD4', secondary: '#0097A7', gradient: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)' },
  'API Security': { primary: '#FF5722', secondary: '#D84315', gradient: 'linear-gradient(135deg, #FF5722 0%, #D84315 100%)' },
  'Data Encryption': { primary: '#3F51B5', secondary: '#303F9F', gradient: 'linear-gradient(135deg, #3F51B5 0%, #303F9F 100%)' },

  // Compliance
  'GDPR': { primary: '#4CAF50', secondary: '#388E3C', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  'HIPAA': { primary: '#2196F3', secondary: '#1976D2', gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' },
  'PCI DSS': { primary: '#FFC107', secondary: '#FF8F00', gradient: 'linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)' },
  'SOX': { primary: '#9C27B0', secondary: '#7B1FA2', gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' },
  'ISO 27001': { primary: '#FF5722', secondary: '#D84315', gradient: 'linear-gradient(135deg, #FF5722 0%, #D84315 100%)' },
  'Cybersecurity Auditing': { primary: '#795548', secondary: '#5D4037', gradient: 'linear-gradient(135deg, #795548 0%, #5D4037 100%)' },
  'Vulnerability Assessment': { primary: '#F44336', secondary: '#D32F2F', gradient: 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)' },
  'Forensic Analysis': { primary: '#607D8B', secondary: '#455A64', gradient: 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)' },
  'Malware Analysis': { primary: '#E91E63', secondary: '#C2185B', gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' },
  'Threat Intelligence': { primary: '#FF9800', secondary: '#F57C00', gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' },
  'Security Operations Center': { primary: '#00BCD4', secondary: '#0097A7', gradient: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)' },
  'SIEM Systems': { primary: '#8BC34A', secondary: '#689F38', gradient: 'linear-gradient(135deg, #8BC34A 0%, #689F38 100%)' },
  'Intrusion Detection': { primary: '#673AB7', secondary: '#512DA8', gradient: 'linear-gradient(135deg, #673AB7 0%, #512DA8 100%)' },

  // Marketing & Business
  'Performance Marketing': { primary: '#E91E63', secondary: '#C2185B', gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' },
  'SEO/SEM': { primary: '#4CAF50', secondary: '#388E3C', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  'Social Media Marketing': { primary: '#2196F3', secondary: '#1976D2', gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' },
  'Content Marketing': { primary: '#FF9800', secondary: '#F57C00', gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' },
  'Email Marketing': { primary: '#9C27B0', secondary: '#7B1FA2', gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' },
  'CRM Systems': { primary: '#00BCD4', secondary: '#0097A7', gradient: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)' },
  'Sales Automation': { primary: '#FFC107', secondary: '#FF8F00', gradient: 'linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)' },
  'Customer Analytics': { primary: '#3F51B5', secondary: '#303F9F', gradient: 'linear-gradient(135deg, #3F51B5 0%, #303F9F 100%)' },
  'Agile/Scrum': { primary: '#8BC34A', secondary: '#689F38', gradient: 'linear-gradient(135deg, #8BC34A 0%, #689F38 100%)' },
  'Kanban': { primary: '#FF5722', secondary: '#D84315', gradient: 'linear-gradient(135deg, #FF5722 0%, #D84315 100%)' },

  // Existing categories
  'CNC & Engineering': { primary: '#607D8B', secondary: '#455A64', gradient: 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)' },
  'Programming': { primary: '#3776AB', secondary: '#2E5A82', gradient: 'linear-gradient(135deg, #3776AB 0%, #2E5A82 100%)' },
  'Data Science & AI': { primary: '#FF6F00', secondary: '#E65100', gradient: 'linear-gradient(135deg, #FF6F00 0%, #E65100 100%)' },
  'Cybersecurity': { primary: '#00D4FF', secondary: '#0099CC', gradient: 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)' },
  'Cloud & DevOps': { primary: '#FF9900', secondary: '#CC7A00', gradient: 'linear-gradient(135deg, #FF9900 0%, #CC7A00 100%)' },
  'Management & Leadership': { primary: '#4CAF50', secondary: '#388E3C', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  'Marketing & PR': { primary: '#E91E63', secondary: '#C2185B', gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' },
  '3D & GameDev': { primary: '#000000', secondary: '#333333', gradient: 'linear-gradient(135deg, #000000 0%, #333333 100%)' },
  'Automechanic': { primary: '#795548', secondary: '#5D4037', gradient: 'linear-gradient(135deg, #795548 0%, #5D4037 100%)' },
  'Art & Creativity': { primary: '#9C27B0', secondary: '#7B1FA2', gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' },
  'Music Production': { primary: '#FFC107', secondary: '#FF8F00', gradient: 'linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)' },
  'Fitness & Health': { primary: '#4CAF50', secondary: '#388E3C', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  'Reselling & Business': { primary: '#FF9800', secondary: '#F57C00', gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' },
  'Science & Education': { primary: '#2196F3', secondary: '#1976D2', gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' },
  'Healthcare & Medical': { primary: '#E91E63', secondary: '#C2185B', gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' },
  'Green & Sustainability': { primary: '#4CAF50', secondary: '#388E3C', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  'Business & Finance': { primary: '#FFC107', secondary: '#FF8F00', gradient: 'linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)' },
  'Legal & Compliance': { primary: '#795548', secondary: '#5D4037', gradient: 'linear-gradient(135deg, #795548 0%, #5D4037 100%)' },
  'Creative & Media': { primary: '#9C27B0', secondary: '#7B1FA2', gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' },
  'Science & Research': { primary: '#607D8B', secondary: '#455A64', gradient: 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)' },
  'Education & Training': { primary: '#00BCD4', secondary: '#0097A7', gradient: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)' },
  'Construction & Trades': { primary: '#8D6E63', secondary: '#6D4C41', gradient: 'linear-gradient(135deg, #8D6E63 0%, #6D4C41 100%)' },
  'Agriculture & Environment': { primary: '#689F38', secondary: '#558B2F', gradient: 'linear-gradient(135deg, #689F38 0%, #558B2F 100%)' },
  'Hospitality & Tourism': { primary: '#FF9800', secondary: '#F57C00', gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' },
  'Retail & Sales': { primary: '#E91E63', secondary: '#C2185B', gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' },
  'Transportation & Logistics': { primary: '#3F51B5', secondary: '#303F9F', gradient: 'linear-gradient(135deg, #3F51B5 0%, #303F9F 100%)' },
  'Human Resources': { primary: '#2196F3', secondary: '#1976D2', gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' },
  'Customer Service': { primary: '#00BCD4', secondary: '#0097A7', gradient: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)' },
  'Quality Assurance': { primary: '#8BC34A', secondary: '#689F38', gradient: 'linear-gradient(135deg, #8BC34A 0%, #689F38 100%)' },
  'Project Management': { primary: '#FF5722', secondary: '#D84315', gradient: 'linear-gradient(135deg, #FF5722 0%, #D84315 100%)' },
  'Data & Analytics': { primary: '#673AB7', secondary: '#512DA8', gradient: 'linear-gradient(135deg, #673AB7 0%, #512DA8 100%)' },
  'Security & Safety': { primary: '#F44336', secondary: '#D32F2F', gradient: 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)' },
  'Writing & Content': { primary: '#9E9E9E', secondary: '#757575', gradient: 'linear-gradient(135deg, #9E9E9E 0%, #757575 100%)' },
  'default': { primary: '#6C757D', secondary: '#545B62', gradient: 'linear-gradient(135deg, #6C757D 0%, #545B62 100%)' }
};

const getCategoryStyle = (category: string) => CATEGORY_STYLES[category] || CATEGORY_STYLES['default'];

interface Props {
  myCourses: Course[];
  setCourses?: React.Dispatch<React.SetStateAction<Course[]>>;
}

const CNCSkillsWithFacts = ({ 
  onAddSkill, 
  onShowDetail 
}: { 
  onAddSkill: (skill: DisplaySkill) => void;
  onShowDetail: (skill: DisplaySkill) => void;
}) => {
  const cncSkills = SKILL_TEMPLATES.filter(s => s.category === 'CNC & Engineering');
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [pendingSkill, setPendingSkill] = useState<DisplaySkill | null>(null);

  const handleMouseDown = (skill: DisplaySkill) => {
    setIsPressed(true);
    setPendingSkill(skill);
    const timer = setTimeout(() => {
      setIsPressed(false);
      onShowDetail(skill);
    }, 500);
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
    if (isPressed && pendingSkill) {
      onAddSkill(pendingSkill);
    }
    setIsPressed(false);
    setPendingSkill(null);
  };

  const handleMouseLeave = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
    setIsPressed(false);
    setPendingSkill(null);
  };

  const renderSkill = (skill: DisplaySkill) => (
    <Card 
      key={skill.id}
      className={`h-100 border-0 shadow-sm hover-shadow ${isPressed && pendingSkill?.id === skill.id ? 'scale-95' : ''}`}
      style={{ 
        transition: 'all 0.15s', 
        cursor: 'pointer', 
        flex: '1 1 200px', 
        minWidth: '200px',
        transform: isPressed && pendingSkill?.id === skill.id ? 'scale(0.95)' : 'scale(1)',
        opacity: isPressed && pendingSkill?.id === skill.id ? 0.7 : 1
      }}
      onMouseDown={() => handleMouseDown(skill)}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ height: '6px', backgroundColor: skill.iconColor }}></div>
      <Card.Body className="d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Badge bg="secondary" className="fw-normal" style={{ fontSize: '0.75rem' }}>{skill.difficulty}/5</Badge>
          {skill.marketData && (
            <Badge bg={skill.marketData.demandIndex > 70 ? 'success' : 'warning'} className="shadow-sm" style={{ fontSize: '0.75rem' }}>
              {skill.marketData.demandIndex}%
            </Badge>
          )}
        </div>
        <h6 className="card-title fw-bold mb-0 text-truncate" title={skill.title} style={{ fontSize: '0.95rem' }}>
          {skill.icon} {skill.title}
        </h6>
      </Card.Body>
    </Card>
  );

  const renderFact = (fact: typeof CNC_FACTS[0]) => (
    <Card className="border-0 shadow-sm w-100" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)' }}>
      <Card.Body className="py-3 px-4">
        <p className="mb-0 text-center fw-bold text-white" style={{ fontSize: '1rem' }}>{fact.text}</p>
      </Card.Body>
    </Card>
  );

  const renderSkillRow = (skills: DisplaySkill[]) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {skills.map((skill) => renderSkill(skill))}
    </div>
  );

  return (
    <div>
      {renderSkillRow(cncSkills.slice(0, 5))}
      <div className="my-3">{renderFact(CNC_FACTS[0])}</div>
      {renderSkillRow(cncSkills.slice(5, 10))}
      <div className="my-3">{renderFact(CNC_FACTS[1])}</div>
      {renderSkillRow(cncSkills.slice(10, 15))}
      <div className="my-3">{renderFact(CNC_FACTS[2])}</div>
      {renderSkillRow(cncSkills.slice(15, 20))}
      <div className="my-3">{renderFact(CNC_FACTS[3])}</div>
      {renderSkillRow(cncSkills.slice(20, 25))}
      <div className="my-3">{renderFact(CNC_FACTS[4])}</div>
      {renderSkillRow(cncSkills.slice(25, 30))}
      <div className="text-center mt-3">
        <small className="text-muted">⚙️ CNC & Engineering: {cncSkills.length} skills</small>
      </div>
    </div>
  );
};

const ArchiveDropZone = ({ onDrop }: { onDrop: (skillId: string) => void }) => {
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
    const skillId = e.dataTransfer.getData('text/plain');
    if (skillId) {
      onDrop(skillId);
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
      <div>Drop here to archive</div>
    </div>
  );
};

export default function EducationSection({ myCourses, setCourses }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Trending');
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSkillDetail, setShowSkillDetail] = useState(false);
  const [detailSkill, setDetailSkill] = useState<DisplaySkill | null>(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<DisplaySkill | null>(null);

  // Auto-expand first subcategory when main category is selected
  const handleMainCategoryChange = (mainCategory: string) => {
    setSelectedMainCategory(mainCategory);
    const categoryData = SKILL_CATEGORIES_HIERARCHY[mainCategory as keyof typeof SKILL_CATEGORIES_HIERARCHY];
    if (categoryData && categoryData.subcategories.length > 0) {
      const newExpanded = new Set(expandedCategories);
      // Expand first subcategory by default
      newExpanded.add(categoryData.subcategories[0]);
      setExpandedCategories(newExpanded);
    }
  };
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'warning' | 'info'>('success');
  const [archivedSkills, setArchivedSkills] = useState<DisplaySkill[]>([]);

  const mySkillIds = useMemo(() => new Set(myCourses.map(c => c.title)), [myCourses]);

  const displayedSkills = useMemo(() => {
    let skills = SKILL_TEMPLATES.filter(s => mySkillIds.has(s.title));

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      skills = skills.filter(s => 
        s.title.toLowerCase().includes(term) ||
        s.tags.some(t => t.toLowerCase().includes(term))
      );
    }

    return skills;
  }, [mySkillIds, searchTerm]);

  const handleAddToCourses = useCallback((skill: DisplaySkill) => {
    const newCourse: Course = {
      id: Date.now(),
      title: skill.title,
      platform: skill.platform,
      instructor: skill.instructor,
      totalHours: skill.totalHours,
      spentHours: 0,
      priority: 'Medium' as const,
      tags: skill.tags,
      description: skill.description,
      modules: skill.modules,
      resources: skill.resources as { name: string; url: string; type: 'repo' | 'doc' | 'video' | 'design' | 'book' }[],
      notes: '',
      category: skill.category,
      icon: skill.icon,
      iconColor: skill.iconColor,
      xpReward: skill.difficulty * 50
    };

    if (setCourses) {
      setCourses(prev => [...prev, newCourse]);
      setToastMessage(`+ ${skill.title} přidáno!`);
      setToastVariant('success');
      setShowToast(true);
    }
  }, [setCourses]);

  const handleAddSkill = useCallback((skill: DisplaySkill) => {
    handleAddToCourses(skill);
    setShowAddModal(false);
  }, [handleAddToCourses]);

  const archiveSkill = useCallback((skillId: string) => {
    const skill = SKILL_TEMPLATES.find(s => s.id === skillId);
    if (skill && setCourses) {
      setCourses(prev => prev.filter(c => c.title !== skill.title));
      setArchivedSkills(prev => [...prev, skill]);
      setToastMessage(`${skill.title} archivováno`);
      setToastVariant('warning');
      setShowToast(true);
    }
  }, [setCourses]);

  const restoreSkill = useCallback((skill: DisplaySkill) => {
    handleAddToCourses(skill);
    setArchivedSkills(prev => prev.filter(s => s.id !== skill.id));
  }, [handleAddToCourses]);

  const removeSkill = useCallback((skillId: string) => {
    const skill = SKILL_TEMPLATES.find(s => s.id === skillId);
    if (skill && setCourses) {
      setCourses(prev => prev.filter(c => c.title !== skill.title));
      setToastMessage(`${skill.title} smazáno`);
      setToastVariant('info');
      setShowToast(true);
    }
  }, [setCourses]);

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      // 🔥 Core Development
      'Web Development': '🌐',
      'Frontend Development': '💻',
      'Backend Development': '🖥️',
      'Fullstack Development': '🚀',
      'Mobile Development': '📱',
      'Game Development': '🎮',
      'Hardware Development': '🔌',
      'Embedded Systems': '⚙️',
      'IoT & Robotics': '🤖',
      'Blockchain & Crypto': '⛓️',
      'AR/VR Development': '🥽',
      'UI/UX Design': '🎨',

      // 🤖 AI & Data
      'Machine Learning Engineering': '🧠',
      'Computer Vision': '👁️',
      'Natural Language Processing': '💬',
      'Big Data': '📈',
      'Business Intelligence': '📊',
      'Data Engineering': '🔧',
      'ETL Development': '🔄',
      'Data Visualization': '📊',
      'Statistical Analysis': '📐',
      'Predictive Modeling': '🔮',
      'A/B Testing': '⚖️',

      // 🛡️ Security
      'Penetration Testing': '🎯',
      'Network Security': '🔒',
      'Application Security': '🛡️',
      'Cloud Security': '☁️',
      'Mobile Security': '📱',
      'IoT Security': '🔐',
      'Blockchain Security': '⛓️',
      'Bug Bounty Programs': '💰',
      'Security Research': '🔍',

      // ☁️ DevOps & Infrastructure
      'DevOps & Infrastructure': '⚙️',
      'Database Administration': '🗄️',
      'API Development': '🔗',
      'Microservices Architecture': '🏗️',
      'Cloud Computing': '☁️',
      'Continuous Integration': '🔄',
      'Continuous Deployment': '🚀',
      'Infrastructure as Code': '📝',
      'Container Orchestration': '🐳',
      'Monitoring & Logging': '📊',
      'Site Reliability Engineering': '🛠️',
      'System Administration': '💻',
      'Server Management': '🖥️',
      'Backup & Recovery': '💾',
      'Disaster Recovery': '🛟',
      'High Availability': '✅',
      'Scalability': '📈',
      'Load Balancing': '⚖️',
      'Caching Strategies': '💾',
      'CDN Management': '🌐',
      'SSL/TLS Management': '🔒',
      'Domain Management': '🏷️',
      'DNS Management': '🌐',
      'Firewall Management': '🔥',
      'VPN Management': '🔐',

      // 🔐 Access & Identity
      'Access Control': '🔑',
      'Identity Management': '👤',
      'Single Sign-On': '🔐',
      'Multi-Factor Authentication': '🔢',
      'OAuth': '🔗',
      'JWT': '🎫',
      'API Security': '🛡️',
      'Data Encryption': '🔒',

      // 📋 Compliance
      'GDPR': '📜',
      'HIPAA': '🏥',
      'PCI DSS': '💳',
      'SOX': '📊',
      'ISO 27001': '📋',
      'Cybersecurity Auditing': '🔍',
      'Vulnerability Assessment': '⚠️',
      'Forensic Analysis': '🔬',
      'Malware Analysis': '🦠',
      'Threat Intelligence': '🕵️',
      'Security Operations Center': '🏢',
      'SIEM Systems': '📊',
      'Intrusion Detection': '🚨',

      // 💼 Marketing & Business
      'Performance Marketing': '📈',
      'SEO/SEM': '🔍',
      'Social Media Marketing': '📱',
      'Content Marketing': '📝',
      'Email Marketing': '📧',
      'CRM Systems': '👥',
      'Sales Automation': '🤖',
      'Customer Analytics': '📊',
      'Agile/Scrum': '🔄',
      'Kanban': '📋',

      // 🎨 Creative & Media
      'Creative & Media': '🎨',
      'Writing & Content': '✍️',
      'Art & Creativity': '🎭',
      'Music Production': '🎵',

      // 🔬 Science & Research
      'Science & Research': '🔬',
      'Healthcare & Medical': '🏥',
      'Green & Sustainability': '🌱',

      // 🏗️ Trades & Services
      'CNC & Engineering': '⚙️',
      'Construction & Trades': '🔨',
      'Agriculture & Environment': '🌾',
      'Manufacturing & Production': '🏭',
      'Automechanic': '🔧',
      'Hospitality & Tourism': '🏨',
      'Retail & Sales': '🛒',
      'Transportation & Logistics': '🚚',
      'Customer Service': '🎧',
      'Quality Assurance': '✅',
      'Security & Safety': '🔒',
      'Education & Training': '📚',
      'Fitness & Health': '💪',
      'Reselling & Business': '💼',
      'Legal & Compliance': '⚖️',
      'Data & Analytics': '📊',
      'Programming': '💻',
      'Data Science & AI': '🤖',
      'Cybersecurity': '🛡️',
      'Cloud & DevOps': '☁️',
      'Management & Leadership': '👔',
      'Marketing & PR': '📣',
      'Human Resources': '👥',
      'Business & Finance': '💰',
      'Project Management': '📋',
      '3D & GameDev': '🎮'
    };
    return icons[category] || '📌';
  };

  const trendingSkills = useMemo(() => SKILL_TEMPLATES.filter(s => 
    s.marketData && s.marketData.demandIndex > 70
  ).slice(0, 10), []);

  return (
    <div className="education-section">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🛠️ Skill Board</h2>
        <div className="d-flex gap-2">
          <input
            type="search"
            placeholder="Hledat skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '200px', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
          />
          <Button variant="outline-primary" onClick={() => setShowAddModal(true)}>
            + Přidat Skill
          </Button>
        </div>
      </div>

      {displayedSkills.length === 0 ? (
        <Card className="text-center p-5 border-0 bg-light">
          <Card.Body>
            <div className="fs-1 mb-3">🛠️</div>
            <h5>Skill Board je prázdný</h5>
            <p className="text-muted">Klikni na + Přidat Skill a vyber si dovednosti k rozvoji.</p>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              + Přidat Skill
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          <Col md={8}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {displayedSkills.map(skill => (
                <Card 
                  key={skill.id} 
                  className="h-100"
                  style={{ cursor: 'context-menu' }}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', skill.id);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setSelectedSkill(skill);
                    setShowSkillModal(true);
                  }}
                >
                  <Card.Header className="d-flex justify-content-between align-items-center" style={{ backgroundColor: skill.iconColor, color: 'white' }}>
                    <span className="fw-bold">{skill.icon} {skill.title}</span>
                    <Dropdown>
                      <Dropdown.Toggle variant="light" size="sm" className="shadow-sm">
                        ⋮
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setSelectedSkill(skill); setShowSkillModal(true); }}>
                          📊 Zobrazit detail
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={() => archiveSkill(skill.id)}
                          className="text-warning"
                        >
                          📁 Archivovat
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item 
                          onClick={() => removeSkill(skill.id)}
                          className="text-danger"
                        >
                          🗑️ Smazat
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="small text-muted mb-2">{skill.platform}</Card.Text>
                    <p className="small">{skill.description.substring(0, 100)}...</p>
                    <div className="mb-2">
                      {skill.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} bg="secondary" className="me-1" pill>{tag}</Badge>
                      ))}
                    </div>
                    {skill.marketData && (
                      <div className="small">
                        <span className="text-success">📈 {skill.marketData.demandIndex}%</span>
                      </div>
                    )}
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <Badge bg="primary">{skill.difficulty}/5</Badge>
                    <small className="text-muted">{skill.totalHours}h</small>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-secondary text-white">
                <h5 className="mb-0">📂 Archiv ({archivedSkills.length})</h5>
              </Card.Header>
              <Card.Body>
                <ArchiveDropZone onDrop={archiveSkill} />
                
                {archivedSkills.length > 0 && (
                  <div className="mt-3">
                    {archivedSkills.map(skill => (
                      <Card key={skill.id} className="mb-2 border-secondary">
                        <Card.Body className="d-flex justify-content-between align-items-center py-2">
                          <div>
                            <h6 className="mb-0" style={{ fontSize: '0.9rem' }}>{skill.icon} {skill.title}</h6>
                          </div>
                          <div className="d-flex gap-1">
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => restoreSkill(skill)}
                            >
                              ↩
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => setArchivedSkills(prev => prev.filter(s => s.id !== skill.id))}
                            >
                              🗑️
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
         </Row>
       )}



       <Modal show={showSkillModal} onHide={() => setShowSkillModal(false)} size="lg">
        {selectedSkill && (
          <>
            <Modal.Header closeButton style={{ backgroundColor: selectedSkill.iconColor, color: 'white' }}>
              <Modal.Title>{selectedSkill.icon} {selectedSkill.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={8}>
                  <h5>Popis</h5>
                  <p>{selectedSkill.description}</p>
                  <h5 className="mt-3">Moduly</h5>
                  <ListGroup>
                    {selectedSkill.modules.map((module, idx) => (
                      <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                        {module.title}
                        {module.isCompleted && <Badge bg="success">✓</Badge>}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  {selectedSkill.marketData && (
                    <div className="mt-3">
                      <h5>📊 Tržní data</h5>
                      <Row>
                        <Col md={4}>
                          <Card bg="success" text="white">
                            <Card.Body className="text-center py-2">
                              <h5>{selectedSkill.marketData.demandIndex}%</h5>
                              <small>Demand</small>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={4}>
                          <Card bg="info" text="white">
                            <Card.Body className="text-center py-2">
                              <h5>{selectedSkill.marketData.salaryRange.junior}-{selectedSkill.marketData.salaryRange.senior}</h5>
                              <small>Kč</small>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={4}>
                          <Card bg="warning" text="dark">
                            <Card.Body className="text-center py-2">
                              <h5>{selectedSkill.marketData.trend}</h5>
                              <small>Trend</small>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <h6>🏷️ Tags</h6>
                      <div className="mb-3">
                        {selectedSkill.tags.map(tag => (
                          <Badge key={tag} bg="primary" className="me-1 mb-1">{tag}</Badge>
                        ))}
                      </div>
                      <h6 className="mt-3">💼 Kariérní cesty</h6>
                      <div>
                        {selectedSkill.careerPaths.map(path => (
                          <Badge key={path} bg="outline-primary" className="me-1 mb-1">{path}</Badge>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowSkillModal(false)}>
                Zavřít
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="xl" centered>
        <Modal.Header closeButton className="bg-primary text-white border-0 py-3">
          <div>
            <Modal.Title className="fw-bold h4">🛠️ Skill Board</Modal.Title>
            <div className="small text-white-50">Vyber si skill k přidání.</div>
          </div>
        </Modal.Header>
        <Modal.Body className="bg-light p-4">
          <Tabs defaultActiveKey="Trending" className="mb-4" fill variant="pills" onSelect={(key) => key && key !== 'Trending' && handleMainCategoryChange(key)}>
            <Tab eventKey="Trending" title={<span className="fw-bold">🔥 Trending</span>}>
              <Row className="g-3 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                {trendingSkills.map((skill, idx) => (
                  <Col key={idx}>
                    <Card 
                      className="h-100 border-0 shadow-sm hover-shadow cursor-pointer"
                      style={{ transition: '0.2s', cursor: 'pointer' }}
                      onClick={() => handleAddSkill(skill)}
                    >
                      <div style={{ height: '5px', backgroundColor: skill.iconColor }}></div>
                      <Card.Body className="d-flex flex-column p-2">
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <Badge bg="secondary" className="fw-normal" style={{ fontSize: '0.7rem' }}>{skill.difficulty}/5</Badge>
                          {skill.marketData && (
                            <Badge bg="success" style={{ fontSize: '0.7rem' }}>{skill.marketData.demandIndex}%</Badge>
                          )}
                        </div>
                        <h6 className="card-title fw-bold mb-1" style={{ fontSize: '0.9rem' }}>
                          {skill.icon} {skill.title}
                        </h6>
                        <div className="text-muted small mb-2">{skill.category}</div>
                        <p className="small flex-grow-1" style={{ fontSize: '0.75rem' }}>{skill.description.substring(0, 60)}...</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div className="text-center mt-3">
                <small className="text-muted">🔥 {trendingSkills.length} trending skills</small>
              </div>
            </Tab>

            {Object.entries(SKILL_CATEGORIES_HIERARCHY).map(([mainCategory, data]) => (
              <Tab
                eventKey={mainCategory}
                title={<span className="fw-bold">{data.icon} {mainCategory}</span>}
                key={mainCategory}
              >
                <div className="mb-3">
                  {data.subcategories.map(subcategory => (
                    <Card key={subcategory} className="mb-3 border-0 shadow-sm">
                      <Card.Header
                        className="d-flex justify-content-between align-items-center cursor-pointer"
                        onClick={() => {
                          const newExpanded = new Set(expandedCategories);
                          if (newExpanded.has(subcategory)) {
                            newExpanded.delete(subcategory);
                          } else {
                            newExpanded.add(subcategory);
                          }
                          setExpandedCategories(newExpanded);
                        }}
                        style={{
                          background: getCategoryStyle(subcategory).gradient,
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <span className="me-2">{getCategoryIcon(subcategory)}</span>
                          <span className="fw-bold">{subcategory}</span>
                          <Badge bg="light" text="dark" className="ms-2">
                            {SKILL_TEMPLATES.filter(s => s.category === subcategory).length}
                          </Badge>
                        </div>
                        <span style={{
                          transform: expandedCategories.has(subcategory) ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s'
                        }}>
                          ▶
                        </span>
                      </Card.Header>
                      <Collapse in={expandedCategories.has(subcategory)}>
                        <Card.Body className="p-3">
                          {subcategory === 'CNC & Engineering' ? (
                            <CNCSkillsWithFacts
                              onAddSkill={handleAddSkill}
                              onShowDetail={(skill) => { setDetailSkill(skill); setShowSkillDetail(true); }}
                            />
                          ) : (
                            <Row className="g-3 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                              {SKILL_TEMPLATES.filter(s => s.category === subcategory).map((skill, idx) => (
                                <Col key={idx}>
                                  <Card
                                    className="h-100 border-0 shadow-sm hover-shadow cursor-pointer"
                                    style={{ transition: '0.2s', cursor: 'pointer' }}
                                    onClick={() => handleAddSkill(skill)}
                                  >
                                    <div style={{ height: '5px', backgroundColor: skill.iconColor }}></div>
                                    <Card.Body className="d-flex flex-column p-2">
                                      <div className="d-flex justify-content-between align-items-start mb-1">
                                        <Badge bg="secondary" className="fw-normal" style={{ fontSize: '0.7rem' }}>{skill.difficulty}/5</Badge>
                                        {skill.marketData && (
                                          <Badge bg={skill.marketData.demandIndex > 70 ? 'success' : 'warning'} style={{ fontSize: '0.7rem' }}>
                                            {skill.marketData.demandIndex}%
                                          </Badge>
                                        )}
                                      </div>
                                      <h6 className="card-title fw-bold mb-1" style={{ fontSize: '0.9rem' }}>
                                        {skill.icon} {skill.title}
                                      </h6>
                                      <p className="small flex-grow-1" style={{ fontSize: '0.75rem' }}>{skill.description.substring(0, 60)}...</p>
                                    </Card.Body>
                                  </Card>
                                </Col>
                              ))}
                            </Row>
                          )}
                        </Card.Body>
                      </Collapse>
                    </Card>
                  ))}
                </div>
              </Tab>
            ))}
          </Tabs>
        </Modal.Body>
      </Modal>

      <Modal show={showSkillDetail} onHide={() => setShowSkillDetail(false)} size="xl" centered contentClassName="border-0 shadow-lg" dialogClassName="modal-90w">
        {detailSkill && (
          <>
            {(() => {
              const style = getCategoryStyle(detailSkill.category);
              return (
                <Modal.Header closeButton style={{ background: style.gradient, color: 'white' }}>
                  <div className="d-flex align-items-center gap-3">
                    <span style={{ fontSize: '2.5rem' }}>{detailSkill.icon}</span>
                    <div>
                      <Modal.Title className="fw-bold mb-0" style={{ fontSize: '1.5rem' }}>{detailSkill.title}</Modal.Title>
                      <small className="text-white-50">{detailSkill.category}</small>
                    </div>
                  </div>
                </Modal.Header>
              );
            })()}
            <Modal.Body className="p-0">
              <Row className="g-0">
                <Col md={8} className="p-4 border-end">
                  <div className="mb-4">
                    <h5 className="fw-bold text-primary mb-3">📖 Popis skillu</h5>
                    <p className="lead" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{detailSkill.description}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h6 className="fw-bold text-secondary mb-3">🎯 Co se naučíš</h6>
                    <Row className="g-2">
                      {detailSkill.modules.slice(0, 4).map((module, idx) => (
                        <Col xs={6} key={idx}>
                          <Card className="border-0 bg-light h-100">
                            <Card.Body className="py-2 px-3">
                              <div className="d-flex align-items-center gap-2">
                                <span className="text-success">✓</span>
                                <small>{module.title}</small>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>

                  <Row className="g-3 mb-4">
                    <Col xs={6} md={3}>
                      <Card className="h-100 border-0 bg-success text-white text-center">
                        <Card.Body className="py-3">
                          <div className="fs-4 fw-bold">{detailSkill.marketData?.salaryRange.junior?.toLocaleString() || 0} Kč</div>
                          <small>Junior</small>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={6} md={3}>
                      <Card className="h-100 border-0 bg-info text-white text-center">
                        <Card.Body className="py-3">
                          <div className="fs-4 fw-bold">{Math.round(((detailSkill.marketData?.salaryRange.junior || 0) + (detailSkill.marketData?.salaryRange.senior || 0)) / 2).toLocaleString()} Kč</div>
                          <small>Průměr</small>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={6} md={3}>
                      <Card className="h-100 border-0 bg-warning text-dark text-center">
                        <Card.Body className="py-3">
                          <div className="fs-4 fw-bold">{detailSkill.difficulty}/5</div>
                          <small>Obtížnost</small>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={6} md={3}>
                      <Card className="h-100 border-0 bg-primary text-white text-center">
                        <Card.Body className="py-3">
                          <div className="fs-4 fw-bold">{detailSkill.marketData?.demandIndex || 0}%</div>
                          <small>Poptávka</small>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <div className="mb-4">
                    <h6 className="fw-bold text-secondary mb-3">🎯 Kariérní postup</h6>
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      {detailSkill.careerPaths.map((path, idx) => (
                        <React.Fragment key={path}>
                          <Badge bg="dark" className="px-3 py-2" style={{ fontSize: '0.85rem' }}>{path}</Badge>
                          {idx < detailSkill.careerPaths.length - 1 && <span className="text-muted">→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold text-secondary mb-3">🏷️ Související tagy</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {detailSkill.tags.map(tag => (
                        <Badge key={tag} bg="secondary" className="px-2 py-1">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h6 className="fw-bold text-secondary mb-3">📚 Doporučené zdroje</h6>
                    <ListGroup variant="flush">
                      {detailSkill.resources.length > 0 ? (
                        detailSkill.resources.map((resource, idx) => (
                          <ListGroup.Item key={idx} action href={resource.url} target="_blank" className="d-flex align-items-center gap-2">
                            <Badge bg="primary" className="text-uppercase" style={{ fontSize: '0.65rem' }}>{resource.type}</Badge>
                            <span>{resource.name}</span>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <>
                          <ListGroup.Item action className="d-flex align-items-center gap-2">
                            <Badge bg="primary" className="text-uppercase" style={{ fontSize: '0.65rem' }}>📖</Badge>
                            <span>{detailSkill.title} Official Documentation</span>
                          </ListGroup.Item>
                          <ListGroup.Item action className="d-flex align-items-center gap-2">
                            <Badge bg="primary" className="text-uppercase" style={{ fontSize: '0.65rem' }}>🎓</Badge>
                            <span>Online kurzy (Udemy, Coursera)</span>
                          </ListGroup.Item>
                          <ListGroup.Item action className="d-flex align-items-center gap-2">
                            <Badge bg="primary" className="text-uppercase" style={{ fontSize: '0.65rem' }}>📺</Badge>
                            <span>YouTube tutoriály</span>
                          </ListGroup.Item>
                        </>
                      )}
                    </ListGroup>
                  </div>
                </Col>

                <Col md={4} className="bg-light p-4">
                  <Card className="border-0 shadow-sm mb-3">
                    <Card.Body>
                      <h6 className="fw-bold text-secondary mb-3">⚡ Rychlý přehled</h6>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <small>Celková XP</small>
                          <small className="fw-bold text-success">{detailSkill.difficulty * 50} XP</small>
                        </div>
                        <ProgressBar now={Math.min(detailSkill.difficulty * 20, 100)} variant="success" style={{ height: '8px' }} />
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <small>Čas do zvládnutí</small>
                          <small className="fw-bold">{detailSkill.totalHours}h</small>
                        </div>
                        <ProgressBar now={detailSkill.difficulty * 20} style={{ height: '8px', backgroundColor: getCategoryStyle(detailSkill.category).primary }} />
                      </div>
                      
                      <div>
                        <div className="d-flex justify-content-between mb-1">
                          <small>Poptávka na trhu</small>
                          <small className="fw-bold">{detailSkill.marketData?.demandIndex || 0}%</small>
                        </div>
                        <ProgressBar now={detailSkill.marketData?.demandIndex || 0} variant="info" style={{ height: '8px' }} />
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="border-0 shadow-sm mb-3">
                    <Card.Body>
                      <h6 className="fw-bold text-secondary mb-3">✅ Co získáš</h6>
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-success">✓</span>
                          <small>Skill badge pro profil</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-success">✓</span>
                          <small>+{detailSkill.difficulty * 50} XP</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-success">✓</span>
                          <small>Unlock navazujících skills</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-success">✓</span>
                          <small>Portfolio projekt</small>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="border-0 shadow-sm mb-3">
                    <Card.Body>
                      <h6 className="fw-bold text-secondary mb-3">💼 Platové rozmezí</h6>
                      <div className="text-center">
                        <div className="display-6 fw-bold text-success">
                          {detailSkill.marketData ? Math.round((detailSkill.marketData.salaryRange.junior + detailSkill.marketData.salaryRange.senior) / 2).toLocaleString() : 0} Kč
                        </div>
                        <small className="text-muted">průměrný měsíční plat</small>
                      </div>
                      <Row className="mt-3 g-2">
                        <Col xs={6}>
                          <div className="text-center p-2 bg-light rounded">
                            <div className="fw-bold">{detailSkill.marketData?.salaryRange.junior?.toLocaleString() || 0}</div>
                            <small className="text-muted">Junior</small>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="text-center p-2 bg-light rounded">
                            <div className="fw-bold">{detailSkill.marketData?.salaryRange.senior?.toLocaleString() || 0}</div>
                            <small className="text-muted">Senior</small>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="bg-light">
              <Button variant="outline-secondary" onClick={() => setShowSkillDetail(false)}>
                Zavřít
              </Button>
              <Button 
                variant="primary" 
                size="lg"
                className="px-4"
                onClick={() => { handleAddSkill(detailSkill); setShowSkillDetail(false); }}
              >
                + Přidat na nástěnku
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

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
    </div>
  );
}
