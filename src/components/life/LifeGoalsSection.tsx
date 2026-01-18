import React, { useState, useMemo } from 'react';
import { Card, Row, Col, ProgressBar, Badge, Button, Collapse, ListGroup, Form, Modal } from 'react-bootstrap';
import { LifeGoal, GoalMilestone, GoalStats, LifeCategory, LIFE_CATEGORIES, PROJECT_GOAL_MAPPING } from '@/types/life';
import { Project } from '@/types/projects';
import { calculateProjectStats } from '@/data/projects/data';

interface LifeGoalsSectionProps {
  projects: Project[];
}

export default function LifeGoalsSection({ projects }: LifeGoalsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<LifeCategory | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<LifeGoal | null>(null);
  const [localGoals, setLocalGoals] = useState<LifeGoal[]>(() => initializeGoals());

  function initializeGoals(): LifeGoal[] {
    return LIFE_CATEGORIES.map(cat => ({
      id: `goal_${cat.key}`,
      title: cat.label.replace(/^[^\s]+\s*/, '').trim(),
      category: cat.key,
      milestones: cat.defaultMilestones.map((title, idx) => ({
        id: `milestone_${cat.key}_${idx}`,
        title,
        description: `Cíl: ${title}`,
        isCompleted: false,
        xpReward: 100,
        order: idx,
        linkedProjectIds: PROJECT_GOAL_MAPPING[title] ? [] : []
      })),
      xpReward: cat.defaultMilestones.length * 100,
      status: 'active',
      color: cat.color,
      icon: cat.icon,
      linkedProjectId: undefined
    }));
  }

  const calculateGoalStats = (goal: LifeGoal): GoalStats => {
    const linkedProjects = projects.filter(p => {
      const projectCategories = PROJECT_GOAL_MAPPING[p.title] || [];
      return projectCategories.includes(goal.category);
    });

    let totalXp = 0;
    let projectXp = 0;

    linkedProjects.forEach(project => {
      const stats = calculateProjectStats(project);
      projectXp += stats.totalXp;
    });

    const completedMilestones = goal.milestones.filter(m => m.isCompleted).length;
    const milestoneXp = completedMilestones * 100;

    totalXp = projectXp + milestoneXp;

    const progressPercent = goal.milestones.length > 0 
      ? Math.round((completedMilestones / goal.milestones.length) * 100)
      : Math.min(Math.round(projectXp / 1000 * 100), 100);

    let level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' = 'Bronze';
    if (totalXp >= 10000) level = 'Platinum';
    else if (totalXp >= 5000) level = 'Gold';
    else if (totalXp >= 2000) level = 'Silver';

    return {
      totalXp,
      completedMilestones,
      totalMilestones: goal.milestones.length,
      progressPercent,
      streak: Math.floor(totalXp / 100),
      level
    };
  };

  const getLinkedProjects = (category: LifeCategory): Project[] => {
    return projects.filter(p => {
      const cats = PROJECT_GOAL_MAPPING[p.title];
      return cats && cats.includes(category);
    });
  };

  const handleToggleMilestone = (goalId: string, milestoneId: string) => {
    setLocalGoals(prev => prev.map(goal => {
      if (goal.id !== goalId) return goal;
      return {
        ...goal,
        milestones: goal.milestones.map(m =>
          m.id === milestoneId 
            ? { ...m, isCompleted: !m.isCompleted, completedAt: m.isCompleted ? undefined : new Date() }
            : m
        )
      };
    }));
  };

  const handleAddMilestone = (goalId: string, title: string) => {
    setLocalGoals(prev => prev.map(goal => {
      if (goal.id !== goalId) return goal;
      return {
        ...goal,
        milestones: [...goal.milestones, {
          id: `milestone_${Date.now()}`,
          title,
          description: `Cíl: ${title}`,
          isCompleted: false,
          xpReward: 100,
          order: goal.milestones.length,
          linkedProjectIds: []
        }]
      };
    }));
  };

  const handleDeleteMilestone = (goalId: string, milestoneId: string) => {
    if (!confirm('Opravdu smazat tento milník?')) return;
    setLocalGoals(prev => prev.map(goal => {
      if (goal.id !== goalId) return goal;
      return {
        ...goal,
        milestones: goal.milestones.filter(m => m.id !== milestoneId)
      };
    }));
  };

  const getLevelIcon = (level: string) => {
    switch(level) {
      case 'Platinum': return '💎';
      case 'Gold': return '🏆';
      case 'Silver': return '🥈';
      default: return '🥉';
    }
  };

  const totalProgress = useMemo(() => {
    const total = localGoals.reduce((sum, goal) => sum + calculateGoalStats(goal).progressPercent, 0);
    return Math.round(total / localGoals.length);
  }, [localGoals]);

  return (
    <>
      <Row className="mb-4">
        <Col>
          <Card className="glass-effect border-0">
            <Card.Header 
              className="bg-transparent border-bottom border-secondary text-dark py-3"
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
                    <span style={{ transition: 'transform 0.3s ease', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}>
                      ▶
                    </span>
                    🎯 Cíle
                  </h4>
                  <Badge bg="success" className="fs-6">
                    {localGoals.filter(g => g.milestones.every(m => m.isCompleted)).length}/{localGoals.length} Dokončeno
                  </Badge>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="text-end">
                    <div className="fw-bold text-success">{totalProgress}%</div>
                    <small className="text-white-50">Celkový pokrok</small>
                  </div>
                  <ProgressBar
                    now={totalProgress}
                    style={{ width: '150px', height: '10px' }}
                    variant="success"
                    animated={totalProgress < 100}
                  />
                </div>
              </div>
            </Card.Header>
            
            <Collapse in={isExpanded}>
              <Card.Body className="p-3">
                <Row xs={2} md={3} lg={4} className="g-2">
                  {localGoals.map((goal) => {
                    const stats = calculateGoalStats(goal);
                    const linkedProjects = getLinkedProjects(goal.category);
                    
                    return (
                      <Col key={goal.id}>
                        <Card
                          className="h-100 border-0 shadow-sm"
                          style={{ 
                            cursor: 'pointer', 
                            background: `${goal.color}15`, 
                            border: `1px solid ${goal.color}30`,
                            transition: 'all 0.3s ease'
                          }}
                          onClick={() => {
                            setSelectedCategory(goal.category);
                            setShowEditModal(true);
                          }}
                        >
                          <Card.Body className="p-3">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <span className="fs-4">{goal.icon}</span>
                              <Badge bg={stats.level === 'Platinum' ? 'secondary' : 'dark'} style={{ fontSize: '0.7rem' }}>
                                {getLevelIcon(stats.level)} {stats.level}
                              </Badge>
                            </div>
                            
                            <div className="fw-bold text-truncate mb-1" style={{ color: goal.color, fontSize: '0.9rem' }}>
                              {goal.title}
                            </div>
                            
                            <ProgressBar
                              now={stats.progressPercent}
                              variant={stats.progressPercent === 100 ? 'success' : 'primary'}
                              style={{ height: '8px' }}
                              className="mb-1"
                            />
                            
                            <div className="d-flex justify-content-between align-items-center">
                              <small className="text-muted">
                                {stats.completedMilestones}/{stats.totalMilestones} | +{stats.totalXp} XP
                              </small>
                              {linkedProjects.length > 0 && (
                                <Badge bg="info" style={{ fontSize: '0.6rem' }}>
                                  📁 {linkedProjects.length}
                                </Badge>
                              )}
                            </div>

                            {linkedProjects.length > 0 && (
                              <div className="mt-2">
                                {linkedProjects.slice(0, 2).map(p => {
                                  const pStats = calculateProjectStats(p);
                                  return (
                                    <div key={p.id} className="d-flex align-items-center gap-1 mb-1">
                                      <div 
                                        style={{ 
                                          width: '8px', 
                                          height: '8px', 
                                          borderRadius: '50%', 
                                          background: p.color 
                                        }} 
                                      />
                                      <small className="text-muted text-truncate" style={{ flex: 1 }}>
                                        {p.title.substring(0, 15)}...
                                      </small>
                                      <small className="text-white">{pStats.progress}%</small>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
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

      <Modal 
        show={showEditModal} 
        onHide={() => {
          setShowEditModal(false);
          setSelectedCategory(null);
          setEditingGoal(null);
        }}
        size="lg"
        centered
        contentClassName="glass-modal"
      >
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title className="fw-bold d-flex align-items-center gap-2">
            {selectedCategory && (
              <>
                <span>{LIFE_CATEGORIES.find(c => c.key === selectedCategory)?.icon}</span>
                <span>{LIFE_CATEGORIES.find(c => c.key === selectedCategory)?.label}</span>
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white p-0" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {selectedCategory && (() => {
            const goal = localGoals.find(g => g.category === selectedCategory);
            if (!goal) return null;
            
            const stats = calculateGoalStats(goal);
            const linkedProjects = getLinkedProjects(selectedCategory);
            
            return (
              <Row className="g-0">
                <Col md={8} className="p-3">
                  <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                    📍 Milestones
                    <Badge bg="primary">{stats.completedMilestones}/{stats.totalMilestones}</Badge>
                  </h6>
                  
                  <div className="milestone-roadmap">
                    {goal.milestones.map((milestone, idx) => (
                      <div key={milestone.id} className="milestone-roadmap-item mb-3">
                        <div className="d-flex align-items-start gap-3">
                          <div className="milestone-connector text-center" style={{ minWidth: '30px' }}>
                            <div
                              className="milestone-dot"
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: milestone.isCompleted ? '#28a745' : goal.color,
                                border: `3px solid ${milestone.isCompleted ? '#fff' : goal.color}`,
                                margin: '0 auto',
                                cursor: 'pointer'
                              }}
                              onClick={() => handleToggleMilestone(goal.id, milestone.id)}
                            />
                            {idx < goal.milestones.length - 1 && (
                              <div className="milestone-line" style={{
                                width: '3px',
                                height: '30px',
                                background: milestone.isCompleted ? '#28a745' : 'rgba(255,255,255,0.2)',
                                margin: '0 auto'
                              }} />
                            )}
                          </div>
                          
                          <div 
                            className="flex-grow-1 p-2 rounded"
                            style={{ background: 'rgba(255,255,255,0.05)' }}
                          >
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <span 
                                  style={{ 
                                    textDecoration: milestone.isCompleted ? 'line-through' : 'none',
                                    opacity: milestone.isCompleted ? 0.6 : 1
                                  }}
                                >
                                  {milestone.title}
                                </span>
                                <Badge bg="warning" text="dark" className="ms-2" style={{ fontSize: '0.7rem' }}>
                                  +{milestone.xpReward} XP
                                </Badge>
                              </div>
                              <div className="d-flex gap-1">
                                <Button
                                  size="sm"
                                  variant={milestone.isCompleted ? 'outline-secondary' : 'outline-success'}
                                  onClick={() => handleToggleMilestone(goal.id, milestone.id)}
                                >
                                  {milestone.isCompleted ? '✅' : '⭕'}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => handleDeleteMilestone(goal.id, milestone.id)}
                                >
                                  🗑️
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const title = formData.get('title') as string;
                      if (title) {
                        handleAddMilestone(goal.id, title);
                        (e.target as HTMLFormElement).reset();
                      }
                    }}
                    className="mt-3 d-flex gap-2"
                  >
                    <Form.Control 
                      name="title" 
                      placeholder="Přidat nový milník..." 
                      className="bg-dark text-white border-secondary"
                      style={{ flex: 1 }}
                    />
                    <Button type="submit" variant="primary">➕</Button>
                  </Form>
                </Col>
                
                <Col md={4} className="border-start border-secondary p-3" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <h6 className="fw-bold mb-3">📊 Statistiky</h6>
                  
                  <div className="mb-3">
                    <small className="text-muted">Celkový pokrok</small>
                    <div className="d-flex align-items-center gap-2">
                      <ProgressBar 
                        now={stats.progressPercent} 
                        variant={stats.progressPercent === 100 ? 'success' : 'info'}
                        style={{ flex: 1, height: '12px' }}
                      />
                      <span className="fw-bold">{stats.progressPercent}%</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted">Level</small>
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: '1.5rem' }}>{getLevelIcon(stats.level)}</span>
                      <span className="fw-bold">{stats.level}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted">Celkem XP</small>
                    <div className="fw-bold text-warning" style={{ fontSize: '1.2rem' }}>
                      +{stats.totalXp} XP
                    </div>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted">🔥 Streak</small>
                    <div className="fw-bold">{stats.streak} dní</div>
                  </div>

                  <hr className="border-secondary" />

                  <h6 className="fw-bold mb-3">📁 Projekty</h6>
                  {linkedProjects.length === 0 ? (
                    <small className="text-muted">Žádné propojené projekty</small>
                  ) : (
                    linkedProjects.map(project => {
                      const pStats = calculateProjectStats(project);
                      return (
                        <div key={project.id} className="mb-2 p-2 rounded" style={{ background: `${project.color}20` }}>
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <span>{project.icon}</span>
                            <small className="fw-bold">{project.title}</small>
                          </div>
                          <ProgressBar now={pStats.progress} style={{ height: '6px' }} />
                          <div className="d-flex justify-content-between mt-1">
                            <small className="text-muted">{pStats.completedMilestones}/{pStats.totalMilestones}</small>
                            <small className="text-warning">+{pStats.totalXp} XP</small>
                          </div>
                        </div>
                      );
                    })
                  )}

                  <hr className="border-secondary" />

                  <h6 className="fw-bold mb-3">🏆 XP Přehled</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-muted">Z projektů</small>
                    <span style={{ color: '#4CAF50' }}>
                      +{linkedProjects.reduce((sum, p) => sum + calculateProjectStats(p).totalXp, 0)} XP
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">Z milestone</small>
                    <span style={{ color: '#4CAF50' }}>
                      +{goal.milestones.filter(m => m.isCompleted).length * 100} XP
                    </span>
                  </div>
                </Col>
              </Row>
            );
          })()}
        </Modal.Body>
      </Modal>
    </>
  );
}
