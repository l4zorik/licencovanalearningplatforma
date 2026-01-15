"use client";

import { useState, useCallback, useMemo } from 'react';
import { Card, Badge, Button, ListGroup, Row, Col, Modal, Tabs, Tab, Dropdown, Toast, ToastContainer } from 'react-bootstrap';
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
    : [{ id: `${skill.id}-m1`, title: `Learn ${skill.name} Fundamentals`, isCompleted: false }],
  resources: skill.resources.length > 0 
    ? skill.resources 
    : [{ name: `${skill.name} Official Documentation`, url: '#', type: 'doc' }],
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
  'Management & Leadership',
  'Data & Analytics',
  'Green & Sustainability',
  'Marketing & PR',
  'Human Resources',
  'Business & Finance',
  'Legal & Compliance',
  'Construction & Trades',
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
  'CNC & Engineering',
  '3D & GameDev',
  'Automechanic',
  'Art & Creativity',
  'Music Production',
  'Fitness & Health',
  'Reselling & Business'
];

interface Props {
  myCourses: Course[];
  setCourses?: React.Dispatch<React.SetStateAction<Course[]>>;
}

const CNCSkillsWithFacts = ({ onAddSkill }: { onAddSkill: (skill: DisplaySkill) => void }) => {
  const cncSkills = SKILL_TEMPLATES.filter(s => s.category === 'CNC & Engineering');
  
  const renderSkill = (skill: DisplaySkill) => (
    <Card 
      className="h-100 border-0 shadow-sm hover-shadow cursor-pointer"
      style={{ transition: '0.2s', cursor: 'pointer', flex: '1 1 200px', minWidth: '200px' }}
      onClick={() => onAddSkill(skill)}
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
  const [selectedSkill, setSelectedSkill] = useState<DisplaySkill | null>(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
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
      'Programming': '💻',
      'Data Science & AI': '🤖',
      'Cybersecurity': '🛡️',
      'Cloud & DevOps': '☁️',
      'Management & Leadership': '👔',
      'Data & Analytics': '📊',
      'Green & Sustainability': '🌱',
      'Marketing & PR': '📣',
      'Human Resources': '👥',
      'Business & Finance': '💰',
      'Legal & Compliance': '⚖️',
      'Construction & Trades': '🔨',
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
      'CNC & Engineering': '⚙️',
      '3D & GameDev': '🎮',
      'Automechanic': '🔧',
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

      <Row>
        <Col md={8}>
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
          )}
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
          <Tabs defaultActiveKey="Trending" className="mb-4" fill variant="pills">
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

            {SKILL_CATEGORIES.map(category => (
              <Tab 
                eventKey={category} 
                title={<span className="fw-bold">{getCategoryIcon(category)} {category}</span>}
                key={category}
              >
                {category === 'CNC & Engineering' ? (
                  <CNCSkillsWithFacts onAddSkill={handleAddSkill} />
                ) : (
                  <>
                    <Row className="g-3 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                      {SKILL_TEMPLATES.filter(s => s.category === category).map((skill, idx) => (
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
                    <div className="text-center mt-3">
                      <small className="text-muted">
                        {getCategoryIcon(category)} {category}: {SKILL_TEMPLATES.filter(s => s.category === category).length} skills
                      </small>
                    </div>
                  </>
                )}
              </Tab>
            ))}
          </Tabs>
        </Modal.Body>
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
