"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Card, Row, Col, Badge, ProgressBar, Button, Modal } from 'react-bootstrap';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer
} from 'recharts';
import { Course } from '@/types';
import { COMPREHENSIVE_SKILL_DATA } from '@/data/skills';

interface StudentProfileOverviewProps {
  courses: Course[];
}

type ProficiencyLevel = 'Nezahájeno' | 'Beginner' | 'Elementary' | 'Intermediate' | 'Upper Intermediate' | 'Advanced' | 'Expert';

const PROFICIENCY_LEVELS: ProficiencyLevel[] = ['Nezahájeno', 'Beginner', 'Elementary', 'Intermediate', 'Upper Intermediate', 'Advanced', 'Expert'];

const PROFICIENCY_META: Record<ProficiencyLevel, { color: string; icon: string; label: string }> = {
  'Nezahájeno': { color: '#e0e0e0', icon: '○', label: 'Nezahájeno' },
  'Beginner': { color: '#ff6b6b', icon: '●', label: 'Začátečník' },
  'Elementary': { color: '#ffa94d', icon: '●', label: 'Pokročilý začátečník' },
  'Intermediate': { color: '#ffd43b', icon: '●', label: 'Středně pokročilý' },
  'Upper Intermediate': { color: '#4ecdc4', icon: '●', label: 'Vyšší střední' },
  'Advanced': { color: '#45b7d1', icon: '★', label: 'Pokročilý' },
  'Expert': { color: '#6c5ce7', icon: '★', label: 'Expert' },
};

const PROFICIENCY_PERCENT: Record<ProficiencyLevel, number> = {
  'Nezahájeno': 0,
  'Beginner': 15,
  'Elementary': 30,
  'Intermediate': 45,
  'Upper Intermediate': 60,
  'Advanced': 80,
  'Expert': 100,
};

type UserSkillEntry = {
  skillId: string;
  level: ProficiencyLevel;
  updatedAt: string;
};

const STORAGE_KEY = 'student-profile-skills';

function loadUserSkills(): Record<string, ProficiencyLevel> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: UserSkillEntry[] = JSON.parse(raw);
      const map: Record<string, ProficiencyLevel> = {};
      parsed.forEach(e => { map[e.skillId] = e.level; });
      return map;
    }
  } catch { /* ignore */ }
  return {};
}

function saveUserSkills(map: Record<string, ProficiencyLevel>) {
  if (typeof window === 'undefined') return;
  const arr: UserSkillEntry[] = Object.entries(map).map(([skillId, level]) => ({
    skillId, level, updatedAt: new Date().toISOString()
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

const ALL_TRADE_CATS = ['CNC & Engineering', 'Elektrikářství', 'Automechanic', 'Tesařství', 'Architecture & Engineering', 'Design & Fashion', 'Interior Design', 'Programming', 'Construction & Trades', 'Data Science & AI', 'Cybersecurity', 'Cloud & DevOps'] as const;

const CATEGORY_META: Record<string, { icon: string; color: string }> = {
  'CNC & Engineering': { icon: '⚙️', color: '#607D8B' },
  'Elektrikářství': { icon: '⚡', color: '#FFC107' },
  'Automechanic': { icon: '🔧', color: '#455A64' },
  'Tesařství': { icon: '🪚', color: '#A1887F' },
  'Architecture & Engineering': { icon: '🏗️', color: '#8D6E63' },
  'Design & Fashion': { icon: '🎨', color: '#9C27B0' },
  'Interior Design': { icon: '🛋️', color: '#FF7043' },
  'Programming': { icon: '💻', color: '#3776AB' },
  'Construction & Trades': { icon: '🔨', color: '#795548' },
  'Data Science & AI': { icon: '🤖', color: '#FF6F00' },
  'Cybersecurity': { icon: '🛡️', color: '#00D4FF' },
  'Cloud & DevOps': { icon: '☁️', color: '#FF9900' },
};

export default function StudentProfileOverview({ courses }: StudentProfileOverviewProps) {
  const [userSkills, setUserSkills] = useState<Record<string, ProficiencyLevel>>({});
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<{ id: string; name: string; icon: string; currentLevel: ProficiencyLevel } | null>(null);

  useEffect(() => {
    setUserSkills(loadUserSkills());
  }, []);

  const setSkillLevel = useCallback((skillId: string, level: ProficiencyLevel) => {
    setUserSkills(prev => {
      const next = { ...prev, [skillId]: level };
      saveUserSkills(next);
      return next;
    });
  }, []);

  const displayableCats = useMemo(() => {
    return ALL_TRADE_CATS.filter(cat =>
      COMPREHENSIVE_SKILL_DATA.some(s => s.category === cat)
    );
  }, []);

  const userSkillMap = useMemo(() => {
    const map = new Map<string, Course>();
    courses.forEach(c => map.set(c.title, c));
    return map;
  }, [courses]);

  const categoryStats = useMemo(() => {
    return displayableCats.map(cat => {
      const categorySkills = COMPREHENSIVE_SKILL_DATA.filter(s => s.category === cat);
      const total = categorySkills.length;
      let completed = 0, inProgress = 0, notStarted = 0, totalScore = 0;

      categorySkills.forEach(s => {
        const ul = userSkills[s.id];
        const course = userSkillMap.get(s.name);
        const effectiveLevel = ul || (course ? 'Beginner' : 'Nezahájeno');
        const pct = PROFICIENCY_PERCENT[effectiveLevel];
        totalScore += pct;

        if (effectiveLevel === 'Expert') completed++;
        else if (effectiveLevel === 'Nezahájeno' && !course) notStarted++;
        else inProgress++;
      });

      const totalRequired = total * 100;
      return {
        category: cat,
        meta: CATEGORY_META[cat] || { icon: '📌', color: '#6C757D' },
        total,
        inProgress,
        completed,
        notStarted,
        totalScore,
        totalRequired,
        progress: totalRequired > 0 ? Math.round((totalScore / totalRequired) * 100) : 0,
      };
    });
  }, [displayableCats, userSkills, userSkillMap]);

  const radarData = useMemo(() => {
    return categoryStats.map(stat => ({
      category: stat.meta.icon,
      value: stat.progress,
      fullMark: 100,
      color: stat.meta.color,
    }));
  }, [categoryStats]);

  const overallProgress = useMemo(() => {
    if (categoryStats.length === 0) return 0;
    return Math.round(categoryStats.reduce((s, c) => s + c.progress, 0) / categoryStats.length);
  }, [categoryStats]);

  const careerReadiness = useMemo(() => {
    if (overallProgress >= 80) return { label: 'Připraven na trh práce', color: '#4ecdc4' };
    if (overallProgress >= 50) return { label: 'Dobře rozjetý', color: '#ffd43b' };
    if (overallProgress >= 25) return { label: 'Začínající', color: '#ffa94d' };
    return { label: 'Na startu', color: '#ff6b6b' };
  }, [overallProgress]);

  const handleSkillClick = (skillId: string, skillName: string, currentLevel: ProficiencyLevel, icon: string) => {
    setEditingSkill({ id: skillId, name: skillName, icon, currentLevel });
    setShowLevelModal(true);
  };

  const skillRows = useMemo(() => {
    const cats = selectedCategory === 'all' ? displayableCats : [selectedCategory];
    const skills = cats.flatMap(cat =>
      COMPREHENSIVE_SKILL_DATA.filter(s => s.category === cat)
    );

    return skills.map(skill => {
      const ul = userSkills[skill.id];
      const course = userSkillMap.get(skill.name);
      const effectiveLevel: ProficiencyLevel = ul || (course ? 'Beginner' : 'Nezahájeno');
      const pct = PROFICIENCY_PERCENT[effectiveLevel];
      const meta = PROFICIENCY_META[effectiveLevel];

      return (
        <Row key={skill.id} className="align-items-center g-2 mb-2 skill-row">
          <Col xs={1} className="text-center" style={{ fontSize: '1.1rem' }}>{skill.icon}</Col>
          <Col xs={3}>
            <small className="fw-medium">{skill.name}</small>
          </Col>
          <Col xs={2}>
            <Badge
              style={{
                backgroundColor: meta.color,
                cursor: 'pointer',
                fontSize: '0.7rem',
                padding: '0.4rem 0.6rem',
                transition: 'transform 0.15s',
              }}
              onClick={() => handleSkillClick(skill.id, skill.name, effectiveLevel, skill.icon)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {meta.icon} {meta.label}
            </Badge>
          </Col>
          <Col xs={4}>
            <ProgressBar
              now={pct}
              variant={pct >= 80 ? 'success' : pct >= 50 ? 'info' : pct >= 25 ? 'warning' : 'danger'}
              style={{ height: '8px', borderRadius: '4px', cursor: 'pointer' }}
              onClick={() => handleSkillClick(skill.id, skill.name, effectiveLevel, skill.icon)}
            />
          </Col>
          <Col xs={2} className="text-end">
            <small className="text-muted">{pct}%</small>
          </Col>
        </Row>
      );
    });
  }, [selectedCategory, displayableCats, userSkills, userSkillMap]);

  const totalSkills = useMemo(() => displayableCats.reduce((sum, cat) =>
    sum + COMPREHENSIVE_SKILL_DATA.filter(s => s.category === cat).length, 0
  ), [displayableCats]);

  const completedSkills = useMemo(() =>
    Object.entries(userSkills).filter(([, v]) => v === 'Expert').length, [userSkills]
  );

  return (
    <>
      <Card className="student-profile-overview border-0 shadow" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #1a1a3e 0%, #2d1b69 100%)',
            padding: '1.5rem',
            borderBottom: 'none',
          }}
        >
          <Row className="align-items-center">
            <Col>
              <h4 className="text-white mb-1">📊 Profil dovedností</h4>
              <p className="text-white-50 mb-0 small">
                Klikni na skill pro nastavení úrovně - sleduj svůj pokrok napříč všemi obory
              </p>
            </Col>
            <Col xs="auto">
              <div className="text-center px-3 py-2 rounded" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="text-white fw-bold small">{careerReadiness.label}</div>
                <div
                  style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    backgroundColor: careerReadiness.color,
                    display: 'inline-block', marginRight: '4px',
                    boxShadow: `0 0 8px ${careerReadiness.color}`,
                  }}
                />
                <small className="text-white-50">Celková připravenost</small>
              </div>
            </Col>
          </Row>
        </div>

        <Card.Body className="p-4">
          <Row className="g-4 mb-4">
            {categoryStats.map(stat => (
              <Col md={3} sm={6} key={stat.category}>
                <Card
                  className="border-0 h-100 category-card"
                  style={{
                    borderRadius: '12px',
                    background: '#f8f9fa',
                    cursor: 'pointer',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => setSelectedCategory(selectedCategory === stat.category ? 'all' : stat.category)}
                >
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span style={{ fontSize: '1.5rem' }}>{stat.meta.icon}</span>
                      <Badge
                        style={{
                          backgroundColor: stat.meta.color,
                          fontSize: '0.65rem',
                          padding: '0.3rem 0.5rem',
                        }}
                      >
                        {stat.completed}/{stat.total}
                      </Badge>
                    </div>
                    <h6 className="fw-bold mb-2" style={{ fontSize: '0.8rem', minHeight: '2rem' }}>{stat.category}</h6>
                    <ProgressBar
                      now={stat.progress}
                      style={{
                        height: '5px', borderRadius: '3px', backgroundColor: '#e9ecef',
                      }}
                    >
                      <ProgressBar
                        now={stat.progress}
                        style={{
                          height: '5px', borderRadius: '3px', transition: 'width 0.5s ease',
                          background: `linear-gradient(90deg, ${stat.meta.color}, ${stat.meta.color}80)`,
                        }}
                      />
                    </ProgressBar>
                    <div className="d-flex justify-content-between mt-1">
                      <small className="text-muted" style={{ fontSize: '0.65rem' }}>{stat.inProgress} aktivních</small>
                      <small className="fw-bold" style={{ color: stat.meta.color, fontSize: '0.65rem' }}>{stat.progress}%</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="g-4 mb-4">
            <Col md={8}>
              <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">🛠️ Moje dovednosti</h6>
                    <small className="text-muted">Klikni pro nastavení úrovně</small>
                  </div>
                  <div className="d-flex gap-2 mb-3 flex-wrap">
                    <Button
                      size="sm"
                      variant={selectedCategory === 'all' ? 'dark' : 'outline-secondary'}
                      onClick={() => setSelectedCategory('all')}
                      style={{ borderRadius: '20px', fontSize: '0.7rem' }}
                    >
                      Vše ({totalSkills})
                    </Button>
                    {displayableCats.map(cat => {
                      const count = COMPREHENSIVE_SKILL_DATA.filter(s => s.category === cat).length;
                      const meta = CATEGORY_META[cat] || { icon: '📌', color: '#6C757D' };
                      return (
                        <Button
                          key={cat}
                          size="sm"
                          variant={selectedCategory === cat ? 'dark' : 'outline-secondary'}
                          onClick={() => setSelectedCategory(cat)}
                          style={{ borderRadius: '20px', fontSize: '0.7rem' }}
                        >
                          {meta.icon} {cat} ({count})
                        </Button>
                      );
                    })}
                  </div>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {skillRows.length > 0 ? skillRows : (
                      <p className="text-muted text-center py-3">Žádné dovednosti v této kategorii</p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                <Card.Body>
                  <h6 className="fw-bold mb-3">📈 Profil napříč obory</h6>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e0e0e0" />
                      <PolarAngleAxis dataKey="category" tick={{ fontSize: 16 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                      <Radar
                        name="Dovednosti"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={6}>
              <Card className="border-0 shadow-sm" style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Card.Body className="p-3 text-white">
                  <h6 className="fw-bold mb-2">🏆 Celkový pokrok</h6>
                  <Row>
                    <Col xs={4} className="text-center">
                      <div className="fw-bold fs-5">{overallProgress}%</div>
                      <small>Celkem</small>
                    </Col>
                    <Col xs={4} className="text-center">
                      <div className="fw-bold fs-5">{completedSkills}</div>
                      <small>Hotovo</small>
                    </Col>
                    <Col xs={4} className="text-center">
                      <div className="fw-bold fs-5">{totalSkills}</div>
                      <small>Skillů</small>
                    </Col>
                  </Row>
                  <ProgressBar
                    now={overallProgress}
                    style={{ height: '6px', borderRadius: '3px', marginTop: '8px', backgroundColor: 'rgba(255,255,255,0.3)' }}
                    variant="light"
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                <Card.Body className="p-3">
                  <h6 className="fw-bold mb-2">🎯 Doporučené kroky</h6>
                  <ul className="list-unstyled mb-2 small">
                    {categoryStats.filter(s => s.progress < 30).slice(0, 3).map(stat => (
                      <li key={stat.category} className="mb-1">
                        {stat.meta.icon} <strong>{stat.category}</strong> - začni rozvíjet ({stat.progress}%)
                      </li>
                    ))}
                    {categoryStats.filter(s => s.progress >= 30 && s.progress < 70).slice(0, 2).map(stat => (
                      <li key={stat.category} className="mb-1">
                        {stat.meta.icon} <strong>{stat.category}</strong> - prohlubuj znalosti ({stat.progress}%)
                      </li>
                    ))}
                    {overallProgress >= 80 && (
                      <li className="mb-1 text-success">Jsi připraven na trh práce! 👏</li>
                    )}
                  </ul>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    className="w-100"
                    style={{ borderRadius: '20px' }}
                    onClick={() => setShowDetail(true)}
                  >
                    Zobrazit detail všech dovedností
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal show={showLevelModal} onHide={() => setShowLevelModal(false)} centered size="sm">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title style={{ fontSize: '1rem' }}>
            {editingSkill?.icon} {editingSkill?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted small mb-3">Nastav svou aktuální úroveň:</p>
          <div className="d-flex flex-column gap-2">
            {PROFICIENCY_LEVELS.map(level => {
              const meta = PROFICIENCY_META[level];
              const isActive = editingSkill?.currentLevel === level;
              return (
                <Button
                  key={level}
                  variant={isActive ? 'dark' : 'outline-secondary'}
                  className="d-flex align-items-center justify-content-between w-100"
                  style={{ borderRadius: '10px', padding: '0.5rem 1rem' }}
                  onClick={() => {
                    if (editingSkill) {
                      setSkillLevel(editingSkill.id, level);
                      setEditingSkill({ ...editingSkill, currentLevel: level });
                      setShowLevelModal(false);
                    }
                  }}
                >
                  <span>
                    <span style={{ color: meta.color }}>{meta.icon}</span>{' '}
                    {meta.label}
                  </span>
                  {isActive && <span className="text-success ms-2">✓</span>}
                </Button>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showDetail} onHide={() => setShowDetail(false)} size="xl" centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>📚 Detail všech dovedností</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {displayableCats.map(cat => {
            const skills = COMPREHENSIVE_SKILL_DATA.filter(s => s.category === cat);
            if (skills.length === 0) return null;
            const meta = CATEGORY_META[cat] || { icon: '📌', color: '#6C757D' };
            return (
              <div key={cat} className="mb-4">
                <h6 className="fw-bold mb-3" style={{ color: meta.color }}>
                  {meta.icon} {cat} ({skills.length})
                </h6>
                <div className="border rounded p-3" style={{ background: '#f8f9fa' }}>
                  {skills.map(skill => {
                    const ul = userSkills[skill.id];
                    const level: ProficiencyLevel = ul || 'Nezahájeno';
                    const pct = PROFICIENCY_PERCENT[level];
                    const lMeta = PROFICIENCY_META[level];
                    return (
                      <Row key={skill.id} className="align-items-center g-2 mb-2">
                        <Col xs={1} className="text-center">{skill.icon}</Col>
                        <Col xs={4}>
                          <small className="fw-medium">{skill.name}</small>
                        </Col>
                        <Col xs={2}>
                          <Badge
                            style={{ backgroundColor: lMeta.color, cursor: 'pointer', fontSize: '0.65rem' }}
                            onClick={() => handleSkillClick(skill.id, skill.name, level, skill.icon)}
                          >
                            {lMeta.icon} {lMeta.label}
                          </Badge>
                        </Col>
                        <Col xs={5}>
                          <ProgressBar
                            now={pct}
                            variant={pct >= 80 ? 'success' : pct >= 50 ? 'info' : pct >= 25 ? 'warning' : 'danger'}
                            style={{ height: '8px', borderRadius: '4px', cursor: 'pointer' }}
                            onClick={() => handleSkillClick(skill.id, skill.name, level, skill.icon)}
                          />
                        </Col>
                      </Row>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}
