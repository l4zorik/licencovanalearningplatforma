"use client";

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Card, Badge, Button, ListGroup, Row, Col, Modal, Tabs, Tab, Dropdown, Toast, ToastContainer, ProgressBar, Form } from 'react-bootstrap';
import { Course, SkillCategory } from '@/types';
import { COMPREHENSIVE_SKILL_DATA, CNC_FACTS, ELECTRICIAN_FACTS, MECHANIC_FACTS, CARPENTER_FACTS, ARCHITECT_FACTS, DESIGNER_FACTS, INTERIOR_FACTS, ROBOTICS_FACTS, CRYPTO_FACTS, VIBE_CODING_FACTS, INVESTING_FACTS } from '@/data/skills/comprehensive-skills';
import AchievementRoadmap from '@/components/gamification/AchievementRoadmap';

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

const SKILL_CATEGORIES = [
  'Programming',
  'Data Science & AI',
  'Cybersecurity',
  'Cloud & DevOps',
  'Architecture & Engineering',
  'Design & Fashion',
  'Interior Design',
  'Construction & Trades',
  'Tesařství',
  'CNC & Engineering',
  'Elektrikářství',
  'Automechanic',
  'Robotics',
  'Crypto & Blockchain',
  'Vibe Coding',
  'Management & Leadership',
  'Data & Analytics',
  'Green & Sustainability',
  'Marketing & PR',
  'Human Resources',
  'Business & Finance',
  'Legal & Compliance',
  'Agriculture & Environment',
  'Hospitality & Tourism',
  'Education & Training',
  'Creative & Media',
  'Healthcare & Medical',
  'Science & Research',
  'Retail & Sales',
  'Transportation & Logistics',
  'Customer Service',
  'Quality Assurance',
  'Project Management',
  'Security & Safety',
  'Writing & Content',
  '3D & GameDev',
  'Art & Creativity',
  'Music Production',
  'Fitness & Health',
  'Reselling & Business',
  'Investing'
];

const CATEGORY_STYLES: Record<string, { primary: string; secondary: string; gradient: string }> = {
  'CNC & Engineering': { primary: '#607D8B', secondary: '#455A64', gradient: 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)' },
  'Programming': { primary: '#3776AB', secondary: '#2E5A82', gradient: 'linear-gradient(135deg, #3776AB 0%, #2E5A82 100%)' },
  'Data Science & AI': { primary: '#FF6F00', secondary: '#E65100', gradient: 'linear-gradient(135deg, #FF6F00 0%, #E65100 100%)' },
  'Cybersecurity': { primary: '#00D4FF', secondary: '#0099CC', gradient: 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)' },
  'Cloud & DevOps': { primary: '#FF9900', secondary: '#CC7A00', gradient: 'linear-gradient(135deg, #FF9900 0%, #CC7A00 100%)' },
  'Management & Leadership': { primary: '#4CAF50', secondary: '#388E3C', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  'Marketing & PR': { primary: '#E91E63', secondary: '#C2185B', gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' },
  'Architecture & Engineering': { primary: '#8D6E63', secondary: '#6D4C41', gradient: 'linear-gradient(135deg, #8D6E63 0%, #6D4C41 100%)' },
  'Design & Fashion': { primary: '#9C27B0', secondary: '#7B1FA2', gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' },
  'Interior Design': { primary: '#FF7043', secondary: '#E64A19', gradient: 'linear-gradient(135deg, #FF7043 0%, #E64A19 100%)' },
  'Tesařství': { primary: '#A1887F', secondary: '#8D6E63', gradient: 'linear-gradient(135deg, #A1887F 0%, #8D6E63 100%)' },
  'Construction & Trades': { primary: '#795548', secondary: '#5D4037', gradient: 'linear-gradient(135deg, #795548 0%, #5D4037 100%)' },
  'Elektrikářství': { primary: '#FFC107', secondary: '#FFA000', gradient: 'linear-gradient(135deg, #FFC107 0%, #FFA000 100%)' },
  'Automechanic': { primary: '#F44336', secondary: '#D32F2F', gradient: 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)' },
  'Robotics': { primary: '#E91E63', secondary: '#C2185B', gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' },
  'Crypto & Blockchain': { primary: '#F7931A', secondary: '#D97A00', gradient: 'linear-gradient(135deg, #F7931A 0%, #D97A00 100%)' },
  'Vibe Coding': { primary: '#9C27B0', secondary: '#7B1FA2', gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' },
  'Investing': { primary: '#4CAF50', secondary: '#388E3C', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  'Data & Analytics': { primary: '#2196F3', secondary: '#1976D2', gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' },
  'Green & Sustainability': { primary: '#4CAF50', secondary: '#388E3C', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
  'Human Resources': { primary: '#607D8B', secondary: '#455A64', gradient: 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)' },
  'Business & Finance': { primary: '#009688', secondary: '#00796B', gradient: 'linear-gradient(135deg, #009688 0%, #00796B 100%)' },
  'Legal & Compliance': { primary: '#2E7D32', secondary: '#1B5E20', gradient: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' },
  'Agriculture & Environment': { primary: '#8BC34A', secondary: '#689F38', gradient: 'linear-gradient(135deg, #8BC34A 0%, #689F38 100%)' },
  'Hospitality & Tourism': { primary: '#FF9800', secondary: '#F57C00', gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' },
  'Education & Training': { primary: '#2196F3', secondary: '#1565C0', gradient: 'linear-gradient(135deg, #2196F3 0%, #1565C0 100%)' },
  'Creative & Media': { primary: '#E91E63', secondary: '#C2185B', gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' },
  'Healthcare & Medical': { primary: '#00BCD4', secondary: '#0097A7', gradient: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)' },
  'Science & Research': { primary: '#673AB7', secondary: '#512DA8', gradient: 'linear-gradient(135deg, #673AB7 0%, #512DA8 100%)' },
  'Retail & Sales': { primary: '#FF5722', secondary: '#E64A19', gradient: 'linear-gradient(135deg, #FF5722 0%, #E64A19 100%)' },
  'Transportation & Logistics': { primary: '#795548', secondary: '#5D4037', gradient: 'linear-gradient(135deg, #795548 0%, #5D4037 100%)' },
  'Customer Service': { primary: '#03A9F4', secondary: '#0288D1', gradient: 'linear-gradient(135deg, #03A9F4 0%, #0288D1 100%)' },
  'Quality Assurance': { primary: '#9C27B0', secondary: '#7B1FA2', gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' },
  'Project Management': { primary: '#FFC107', secondary: '#FFA000', gradient: 'linear-gradient(135deg, #FFC107 0%, #FFA000 100%)' },
  'Security & Safety': { primary: '#F44336', secondary: '#C62828', gradient: 'linear-gradient(135deg, #F44336 0%, #C62828 100%)' },
  'Writing & Content': { primary: '#AB47BC', secondary: '#8E24AA', gradient: 'linear-gradient(135deg, #AB47BC 0%, #8E24AA 100%)' },
  '3D & GameDev': { primary: '#00BCD4', secondary: '#00ACC1', gradient: 'linear-gradient(135deg, #00BCD4 0%, #00ACC1 100%)' },
  'Art & Creativity': { primary: '#FF7043', secondary: '#F4511E', gradient: 'linear-gradient(135deg, #FF7043 0%, #F4511E 100%)' },
  'Music Production': { primary: '#E91E63', secondary: '#D81B60', gradient: 'linear-gradient(135deg, #E91E63 0%, #D81B60 100%)' },
  'Fitness & Health': { primary: '#4CAF50', secondary: '#43A047', gradient: 'linear-gradient(135deg, #4CAF50 0%, #43A047 100%)' },
  'Reselling & Business': { primary: '#FFD600', secondary: '#FFC107', gradient: 'linear-gradient(135deg, #FFD600 0%, #FFC107 100%)' },
  'default': { primary: '#6C757D', secondary: '#545B62', gradient: 'linear-gradient(135deg, #6C757D 0%, #545B62 100%)' }
};

const getCategoryStyle = (category: string) => CATEGORY_STYLES[category] || CATEGORY_STYLES['default'];

interface Props {
  myCourses: Course[];
  setCourses?: React.Dispatch<React.SetStateAction<Course[]>>;
}

const TradeSkillsWithFacts = ({
  category,
  facts,
  icon,
  color,
  onAddSkill,
  onShowDetail,
}: {
  category: string;
  facts: { id: string; text: string; position: number }[];
  icon: string;
  color: string;
  onAddSkill: (skill: DisplaySkill) => void;
  onShowDetail: (skill: DisplaySkill) => void;
}) => {
  const skills = SKILL_TEMPLATES.filter(s => s.category === category);
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

  const renderFact = (fact: typeof facts[0]) => (
    <Card className="border-0 shadow-sm w-100" style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)` }}>
      <Card.Body className="py-3 px-4">
        <p className="mb-0 text-center fw-bold text-white" style={{ fontSize: '1rem' }}>{fact.text}</p>
      </Card.Body>
    </Card>
  );

  const renderSkillRow = (skillList: DisplaySkill[]) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {skillList.map((skill) => renderSkill(skill))}
    </div>
  );

  const chunkSize = 5;
  const chunks: DisplaySkill[][] = [];
  for (let i = 0; i < skills.length; i += chunkSize) {
    chunks.push(skills.slice(i, i + chunkSize));
  }

  return (
    <div>
      {chunks.map((chunk, idx) => (
        <div key={idx}>
          {renderSkillRow(chunk)}
          {idx < facts.length && (
            <div className="my-3">{renderFact(facts[idx])}</div>
          )}
        </div>
      ))}
      <div className="text-center mt-3">
        <small className="text-muted">{icon} {category}: {skills.length} skills</small>
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
  const [selectedSkill, setSelectedSkill] = useState<DisplaySkill | null>(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSkillDetail, setShowSkillDetail] = useState(false);
  const [detailSkill, setDetailSkill] = useState<DisplaySkill | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'warning' | 'info'>('success');
  const [archivedSkills, setArchivedSkills] = useState<DisplaySkill[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('education-archived-skills');
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [];
  });
  const [modalSearch, setModalSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('education-archived-skills', JSON.stringify(archivedSkills));
  }, [archivedSkills]);

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
    const priorityByDifficulty: Record<number, 'Low' | 'Medium' | 'High'> = { 1: 'Low', 2: 'Low', 3: 'Medium', 4: 'High', 5: 'High' };
    const newCourse: Course = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
      title: skill.title,
      platform: skill.platform,
      instructor: skill.instructor,
      totalHours: skill.totalHours,
      spentHours: 0,
      priority: priorityByDifficulty[skill.difficulty] || 'Medium',
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
      'Programming': '💻',
      'Data Science & AI': '🤖',
      'Cybersecurity': '🛡️',
      'Cloud & DevOps': '☁️',
      'Architecture & Engineering': '🏗️',
      'Design & Fashion': '🎨',
      'Interior Design': '🛋️',
      'Construction & Trades': '🔨',
      'Tesařství': '🪚',
      'CNC & Engineering': '⚙️',
      'Elektrikářství': '⚡',
      'Automechanic': '🔧',
      'Robotics': '🤖',
      'Crypto & Blockchain': '🔗',
      'Vibe Coding': '✨',
      'Investing': '📈',
      'Management & Leadership': '👔',
      'Data & Analytics': '📊',
      'Green & Sustainability': '🌱',
      'Marketing & PR': '📣',
      'Human Resources': '👥',
      'Business & Finance': '💰',
      'Legal & Compliance': '⚖️',
      'Agriculture & Environment': '🌾',
      'Hospitality & Tourism': '🏨',
      'Education & Training': '📚',
      'Creative & Media': '🎨',
      'Healthcare & Medical': '🏥',
      'Science & Research': '🔬',
      'Retail & Sales': '🛒',
      'Transportation & Logistics': '🚚',
      'Customer Service': '🎧',
      'Quality Assurance': '✅',
      'Project Management': '📋',
      'Security & Safety': '🔒',
      'Writing & Content': '✍️',
      '3D & GameDev': '🎮',
      'Art & Creativity': '🎭',
      'Music Production': '🎵',
      'Fitness & Health': '💪',
      'Reselling & Business': '💼'
    };
    return icons[category] || '📌';
  };

  const trendingSkills = useMemo(() => SKILL_TEMPLATES.filter(s => 
    s.marketData && s.marketData.demandIndex > 70
  ).slice(0, 10), []);

  const filteredModalSkills = useMemo(() => {
    if (!modalSearch.trim()) return null;
    const lower = modalSearch.toLowerCase();
    return SKILL_TEMPLATES.filter(s =>
      s.title.toLowerCase().includes(lower) ||
      s.tags.some(t => t.toLowerCase().includes(lower)) ||
      s.category.toLowerCase().includes(lower) ||
      s.description.toLowerCase().includes(lower)
    );
  }, [modalSearch]);

  const renderSkillCard = (skill: DisplaySkill, isTrending = false) => {
    const catStyle = getCategoryStyle(skill.category);
    return (
      <Card 
        className="h-100 border-0 cursor-pointer fancy-skill-card"
        style={{ 
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          background: '#ffffff',
          borderRadius: '14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        onClick={() => handleAddSkill(skill)}
      >
        <div style={{ height: '6px', borderRadius: '14px 14px 0 0', background: `linear-gradient(90deg, ${skill.iconColor}, ${catStyle.primary}88)` }}></div>
        <Card.Body className="d-flex flex-column p-3">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Badge className="fw-bold border-0 px-2" style={{ background: `linear-gradient(135deg, ${catStyle.primary}, ${catStyle.secondary})`, fontSize: '0.65rem' }}>{skill.difficulty}/5</Badge>
            {skill.marketData && (
              <Badge className="fw-bold border-0 px-2" style={{ fontSize: '0.65rem', background: isTrending ? 'linear-gradient(135deg, #00b894, #00cec9)' : skill.marketData.demandIndex > 70 ? 'linear-gradient(135deg, #00b894, #00cec9)' : 'linear-gradient(135deg, #fdcb6e, #e17055)' }}>
                📈 {skill.marketData.demandIndex}%
              </Badge>
            )}
          </div>
          <h6 className="fw-bold mb-1" style={{ fontSize: '0.95rem', lineHeight: 1.3 }}>
            {skill.icon} {skill.title}
          </h6>
          <div className="d-flex align-items-center gap-1 mb-2">
            <Badge bg="light" text="dark" className="fw-normal px-2" style={{ fontSize: '0.6rem', border: '1px solid #dee2e6' }}>{skill.category}</Badge>
          </div>
          <p className="small flex-grow-1 mb-2" style={{ fontSize: '0.72rem', color: '#6c7a89', lineHeight: 1.4 }}>{skill.description.substring(0, 70)}...</p>
          {skill.marketData && (
            <div className="d-flex align-items-center gap-2 small fw-bold" style={{ fontSize: '0.65rem' }}>
              <span style={{ color: '#00b894' }}>💰 {skill.marketData.salaryRange.junior}Kč</span>
              <span style={{ color: '#6c7a89' }}>→</span>
              <span style={{ color: '#0984e3' }}>{skill.marketData.salaryRange.senior}Kč</span>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

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
            <Row className="g-3">
              {displayedSkills.map(skill => {
                const categoryStyle = getCategoryStyle(skill.category);
                const catColor = categoryStyle.primary;
                const moduleProgress = skill.modules.length > 0 ? Math.round((skill.modules.filter(m => m.isCompleted).length / skill.modules.length) * 100) : 0;
                return (
                  <Col key={skill.id} xs={12} sm={6} lg={4} xl={3}>
                    <Card 
                      className="h-100 border-0 shadow-sm hover-shadow"
                      style={{ 
                        cursor: 'context-menu',
                        borderLeft: `4px solid ${catColor}`,
                        transition: 'all 0.2s ease',
                        borderRadius: '8px'
                      }}
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
                      <Card.Header className="d-flex justify-content-between align-items-center py-2" style={{ background: `linear-gradient(135deg, ${catColor}22, ${catColor}11)`, borderBottom: `2px solid ${catColor}` }}>
                        <span className="fw-bold" style={{ color: catColor }}>{skill.icon} {skill.title}</span>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" size="sm" className="shadow-sm border-0">
                            ⋮
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setSelectedSkill(skill); setShowSkillModal(true); }}>
                              📊 Detail
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => archiveSkill(skill.id)} className="text-warning">
                              📁 Archivovat
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => removeSkill(skill.id)} className="text-danger">
                              🗑️ Smazat
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Card.Header>
                      <Card.Body className="py-2">
                        <p className="small text-muted mb-1">{skill.description.substring(0, 80)}...</p>
                        <div className="mb-2">
                          {skill.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} bg="light" text="dark" className="me-1 small" style={{ fontSize: '0.7rem' }}>{tag}</Badge>
                          ))}
                        </div>
                        {moduleProgress > 0 && (
                          <ProgressBar now={moduleProgress} variant="success" className="mb-1" style={{ height: '4px' }} />
                        )}
                        <div className="d-flex justify-content-between align-items-center small">
                          {skill.marketData && (
                            <span className="text-success fw-bold">📈 {skill.marketData.demandIndex}%</span>
                          )}
                          <span className="text-muted">
                            <Badge bg="primary" className="me-1" style={{ fontSize: '0.65rem' }}>{skill.difficulty}/5</Badge>
                            <small>{skill.totalHours}h</small>
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
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

       {/* Achievement Roadmap */}
       <Row className="mt-5">
         <Col>
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
               xp_collector_5000: 1
             }}
             currentLevel={5}
           />
         </Col>
       </Row>

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

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="xl" centered dialogClassName="modal-95w" scrollable>
        <Modal.Header closeButton className="border-0 py-3 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className="position-relative z-1">
            <Modal.Title className="fw-bold h3 text-white">🛠️ Skill Board</Modal.Title>
            <div className="text-white-50 small fw-medium">Vyber si skill k přidání — klikni na kartu a skill je tvůj</div>
          </div>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '8rem', opacity: 0.06, lineHeight: 1, pointerEvents: 'none' }}>🛠️</div>
        </Modal.Header>
        <Modal.Body className="p-4" style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
          <div className="mb-3 position-relative">
            <Form.Control
              type="search"
              placeholder="🔍 Hledat skill napříč všemi kategoriemi..."
              value={modalSearch}
              onChange={(e) => setModalSearch(e.target.value)}
              className="border-0 shadow-sm rounded-3 py-2 ps-4"
              style={{ background: '#f1f3f5', fontSize: '0.9rem', paddingLeft: '40px !important' }}
            />
            {modalSearch && (
              <Button variant="link" className="position-absolute end-0 top-0 text-muted p-2" onClick={() => setModalSearch('')} style={{ textDecoration: 'none' }}>
                ✕
              </Button>
            )}
          </div>

          {modalSearch.trim() && filteredModalSkills ? (
            <div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="fw-bold">🔍 Výsledky hledání</span>
                <Badge bg="primary">{filteredModalSkills.length} skillů</Badge>
                <Button variant="link" size="sm" className="ms-auto text-muted" onClick={() => setModalSearch('')}>
                  Zpět ✕
                </Button>
              </div>
              {filteredModalSkills.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <div style={{ fontSize: '3rem' }}>🔍</div>
                  <p className="mt-2">{'Žádný skill neodpovídá hledání "' + modalSearch + '"'}</p>
                </div>
              ) : (
                <Row className="g-3">
                  {filteredModalSkills.map((skill, idx) => (
                    <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                      {renderSkillCard(skill)}
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          ) : (
          <Tabs defaultActiveKey="Trending" className="mb-4 fancy-tabs" fill variant="pills">
            <Tab eventKey="Trending" title={<span className="fw-bold px-2">🔥 Trending</span>}>
              <div className="position-relative mb-3">
                <div className="d-flex align-items-center gap-2 p-3 rounded-3" style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(255,217,61,0.1) 100%)', border: '1px solid rgba(255,107,107,0.2)' }}>
                  <span style={{ fontSize: '1.5rem' }}>🔥</span>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '1rem' }}>Nejžádanější dovednosti</div>
                    <div className="text-muted small">Top {trendingSkills.length} skills s nejvyšší poptávkou na trhu</div>
                  </div>
                </div>
              </div>
              <Row className="g-3">
                {trendingSkills.map((skill, idx) => (
                  <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                    {renderSkillCard(skill, true)}
                  </Col>
                ))}
              </Row>
              <div className="text-center mt-3">
                <small className="text-muted fw-medium">🔥 {trendingSkills.length} trending skills</small>
              </div>
            </Tab>

            {SKILL_CATEGORIES.map(category => {
              const catStyle = getCategoryStyle(category);
              const catIcon = getCategoryIcon(category);
              const catSkills = SKILL_TEMPLATES.filter(s => s.category === category);
              return (
                <Tab 
                  eventKey={category} 
                  title={<span className="fw-bold px-1" style={{ fontSize: '0.82rem' }}>{catIcon} {category}</span>}
                  key={category}
                >
                  <div className="position-relative mb-3">
                    <div className="d-flex align-items-center gap-2 p-3 rounded-3" style={{ background: `${catStyle.primary}0D`, border: `1px solid ${catStyle.primary}22` }}>
                      <span style={{ fontSize: '1.5rem' }}>{catIcon}</span>
                      <div>
                        <div className="fw-bold" style={{ fontSize: '1rem', color: catStyle.primary }}>{category}</div>
                        <div className="text-muted small">{catSkills.length} dovedností k přidání</div>
                      </div>
                    </div>
                  </div>
                  {category === 'CNC & Engineering' ? (
                    <TradeSkillsWithFacts
                      category="CNC & Engineering"
                      facts={CNC_FACTS}
                      icon="⚙️"
                      color="#607D8B"
                      onAddSkill={handleAddSkill}
                      onShowDetail={(skill) => { setDetailSkill(skill); setShowSkillDetail(true); }}
                    />
                  ) : category === 'Elektrikářství' ? (
                    <TradeSkillsWithFacts
                      category="Elektrikářství"
                      facts={ELECTRICIAN_FACTS}
                      icon="⚡"
                      color="#FFC107"
                      onAddSkill={handleAddSkill}
                      onShowDetail={(skill) => { setDetailSkill(skill); setShowSkillDetail(true); }}
                    />
                  ) : category === 'Automechanic' ? (
                    <TradeSkillsWithFacts
                      category="Automechanic"
                      facts={MECHANIC_FACTS}
                      icon="🔧"
                      color="#455A64"
                      onAddSkill={handleAddSkill}
                      onShowDetail={(skill) => { setDetailSkill(skill); setShowSkillDetail(true); }}
                    />
                  ) : category === 'Tesařství' ? (
                    <TradeSkillsWithFacts
                      category="Tesařství"
                      facts={CARPENTER_FACTS}
                      icon="🪚"
                      color="#A1887F"
                      onAddSkill={handleAddSkill}
                      onShowDetail={(skill) => { setDetailSkill(skill); setShowSkillDetail(true); }}
                    />
                  ) : category === 'Architecture & Engineering' ? (
                    <TradeSkillsWithFacts
                      category="Architecture & Engineering"
                      facts={ARCHITECT_FACTS}
                      icon="🏗️"
                      color="#8D6E63"
                      onAddSkill={handleAddSkill}
                      onShowDetail={(skill) => { setDetailSkill(skill); setShowSkillDetail(true); }}
                    />
                  ) : category === 'Design & Fashion' ? (
                    <TradeSkillsWithFacts
                      category="Design & Fashion"
                      facts={DESIGNER_FACTS}
                      icon="🎨"
                      color="#9C27B0"
                      onAddSkill={handleAddSkill}
                      onShowDetail={(skill) => { setDetailSkill(skill); setShowSkillDetail(true); }}
                    />
                  ) : category === 'Interior Design' ? (
                    <TradeSkillsWithFacts
                      category="Interior Design"
                      facts={INTERIOR_FACTS}
                      icon="🛋️"
                      color="#FF7043"
                      onAddSkill={handleAddSkill}
                      onShowDetail={(skill) => { setDetailSkill(skill); setShowSkillDetail(true); }}
                    />
                  ) : category === 'Robotics' ? (
                    <TradeSkillsWithFacts
                      category="Robotics"
                      facts={ROBOTICS_FACTS}
                      icon="🤖"
                      color="#E91E63"
                      onAddSkill={handleAddSkill}
                      onShowDetail={(skill) => { setDetailSkill(skill); setShowSkillDetail(true); }}
                    />
                  ) : category === 'Crypto & Blockchain' ? (
                    <TradeSkillsWithFacts
                      category="Crypto & Blockchain"
                      facts={CRYPTO_FACTS}
                      icon="🔗"
                      color="#F7931A"
                      onAddSkill={handleAddSkill}
                      onShowDetail={(skill) => { setDetailSkill(skill); setShowSkillDetail(true); }}
                    />
                  ) : category === 'Vibe Coding' ? (
                    <TradeSkillsWithFacts
                      category="Vibe Coding"
                      facts={VIBE_CODING_FACTS}
                      icon="✨"
                      color="#9C27B0"
                      onAddSkill={handleAddSkill}
                      onShowDetail={(skill) => { setDetailSkill(skill); setShowSkillDetail(true); }}
                    />
                  ) : category === 'Investing' ? (
                    <TradeSkillsWithFacts
                      category="Investing"
                      facts={INVESTING_FACTS}
                      icon="📈"
                      color="#4CAF50"
                      onAddSkill={handleAddSkill}
                      onShowDetail={(skill) => { setDetailSkill(skill); setShowSkillDetail(true); }}
                    />
                  ) : (
                    <Row className="g-3">
                      {catSkills.map((skill, idx) => (
                        <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                          {renderSkillCard(skill)}
                        </Col>
                      ))}
                    </Row>
                  )}
                </Tab>
              );
            })}
          </Tabs>
          )}
        </Modal.Body>
        <style>{`
          .fancy-tabs.nav-pills .nav-link {
            border-radius: 10px;
            transition: all 0.2s ease;
            color: #495057;
            margin: 0 2px;
          }
          .fancy-tabs.nav-pills .nav-link:hover {
            background: rgba(102,126,234,0.08);
            transform: translateY(-1px);
          }
          .fancy-tabs.nav-pills .nav-link.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            box-shadow: 0 4px 16px rgba(102,126,234,0.3);
          }
          .fancy-skill-card:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 32px rgba(0,0,0,0.12) !important;
          }
          .fancy-skill-card:active {
            transform: translateY(-1px) scale(0.98);
          }
          .modal-95w {
            max-width: 95vw !important;
          }
          @media (min-width: 1400px) {
            .modal-95w {
              max-width: 1400px !important;
            }
          }
        `}</style>
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
