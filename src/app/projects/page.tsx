"use client";

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Dropdown, Modal, Form, ListGroup, Tabs, Tab } from 'react-bootstrap';
import { INITIAL_PROJECTS, PROJECT_TEMPLATES, PROJECT_CATEGORIES, ALGORITHM_TYPE_ICONS, calculateProjectStats } from '@/data/projects/data';
import { Project, AlgorithmType } from '@/types';
import { calculateLevel, formatXP, getXPForAction } from '@/lib/gamification/xp-system';

const ALGORITHM_TYPES: { id: AlgorithmType; label: string }[] = [
  { id: 'learning', label: '📖 Učení' },
  { id: 'coding', label: '💻 Kódování' },
  { id: 'optimization', label: '⚡ Optimalizace' },
  { id: 'data_analysis', label: '📊 Datová Analýza' },
  { id: 'research', label: '🔬 Výzkum' },
  { id: 'design', label: '🎨 Design' },
  { id: 'debugging', label: '🐛 Debugování' },
  { id: 'testing', label: '✅ Testování' },
  { id: 'documentation', label: '📝 Dokumentace' },
  { id: 'deployment', label: '🚀 Nasazení' },
  { id: 'security', label: '🔐 Bezpečnost' },
  { id: 'networking', label: '🌐 Sítě' },
  { id: 'automation', label: '⚙️ Automatizace' },
  { id: 'monitoring', label: '👁️ Monitoring' },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showNewAlgorithm, setShowNewAlgorithm] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [showLevelUp, setShowLevelUp] = useState(false);

  const [userXP, setUserXP] = useState(0);
  const [dailyXP, setDailyXP] = useState(1250);
  const [streak, setStreak] = useState(7);
  const [todayAlgorithms, setTodayAlgorithms] = useState(5);
  const [level, setLevel] = useState({ level: 6, title: 'Schopný', color: '#FF5722', progress: 65 });

  useEffect(() => {
    const newLevel = calculateLevel(userXP + dailyXP);
    if (newLevel.level > level.level) {
      setShowLevelUp(true);
      setLevel(newLevel);
    }
  }, [userXP, dailyXP]);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status === filter);

  const totalStats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    totalAlgorithms: projects.reduce((sum, p) => sum + p.algorithms.length, 0),
    totalHours: projects.reduce((sum, p) => sum + p.totalHours, 0),
    totalXp: projects.reduce((sum, p) => sum + calculateProjectStats(p).totalXp, 0),
  };

  const comboBonus = todayAlgorithms >= 5 ? Math.min((todayAlgorithms - 4) * 5, 30) : 0;
  const dailyXPCap = 5000;
  const dailyProgress = Math.min(100, (dailyXP / dailyXPCap) * 100);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '20px'
    }}>
      <Container fluid>
        {/* 🎮 GAMIFICATION HEADER */}
        <Row className="mb-4">
          <Col>
            <Card style={{ 
              background: 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)',
              border: '2px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <Card.Body>
                <Row className="align-items-center">
                  {/* Level Display */}
                  <Col md={2} className="text-center">
                    <div style={{ 
                      width: '80px', 
                      height: '80px', 
                      borderRadius: '50%', 
                      background: `linear-gradient(135deg, ${level.color}, #667eea)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      boxShadow: `0 0 30px ${level.color}80`
                    }}>
                      <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>
                        {level.level}
                      </span>
                    </div>
                    <div style={{ color: '#fff', fontWeight: 'bold', marginTop: '5px' }}>
                      {level.title}
                    </div>
                  </Col>

                  {/* XP Progress */}
                  <Col md={4}>
                    <div className="d-flex justify-content-between mb-1">
                      <span style={{ color: '#fff' }}>XP Progress</span>
                      <span style={{ color: '#FFD700' }}>{formatXP(dailyXP)} / 5,000 XP</span>
                    </div>
                    <ProgressBar 
                      now={dailyProgress} 
                      style={{ height: '20px' }}
                      variant="warning"
                      animated
                    />
                    <small style={{ color: '#8892b0' }}>
                      {level.progress}% do dalšího levelu
                    </small>
                  </Col>

                  {/* Streak Display */}
                  <Col md={2} className="text-center">
                    <div style={{ fontSize: '2.5rem' }}>🔥</div>
                    <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.5rem' }}>
                      {streak}
                    </div>
                    <small style={{ color: '#8892b0' }}>Denní Streak</small>
                  </Col>

                  {/* Combo Meter */}
                  <Col md={2} className="text-center">
                    <div style={{ fontSize: '2rem' }}>⚡</div>
                    <div style={{ color: comboBonus > 0 ? '#FFD700' : '#fff', fontWeight: 'bold', fontSize: '1.5rem' }}>
                      +{comboBonus}%
                    </div>
                    <small style={{ color: '#8892b0' }}>Combo Bonus</small>
                    <ProgressBar 
                      now={Math.min(100, (todayAlgorithms / 10) * 100)} 
                      variant="info"
                      style={{ height: '6px', marginTop: '5px' }}
                    />
                    <small style={{ color: '#667eea' }}>{todayAlgorithms}/10 algoritmů</small>
                  </Col>

                  {/* Total Stats */}
                  <Col md={2} className="text-center">
                    <div style={{ fontSize: '1.5rem', color: '#FFD700', fontWeight: 'bold' }}>
                      {formatXP(totalStats.totalXp)}
                    </div>
                    <small style={{ color: '#8892b0' }}>Celkem XP</small>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 style={{ color: '#fff', marginBottom: '5px' }}>
                  🔐 <span style={{ color: '#00d4ff' }}>Projekty</span>
                </h1>
                <p style={{ color: '#8892b0' }}>
                  Logování algoritmů a sledování pokroku v reálném čase
                </p>
              </div>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => setShowNewProject(true)}
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none'
                }}
              >
                ➕ Nový Projekt
              </Button>
            </div>
          </Col>
        </Row>

        {/* Stats Overview */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 style={{ color: '#fff', marginBottom: '5px' }}>
                  🔐 <span style={{ color: '#00d4ff' }}>Projekty</span>
                </h1>
                <p style={{ color: '#8892b0' }}>
                  Logování algoritmů a sledování pokroku v reálném čase
                </p>
              </div>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => setShowNewProject(true)}
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none'
                }}
              >
                ➕ Nový Projekt
              </Button>
            </div>
          </Col>
        </Row>

        {/* Stats Overview */}
        <Row className="mb-4">
          <Col md={2}>
            <Card style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Card.Body className="text-center">
                <h3 style={{ color: '#00d4ff' }}>{totalStats.totalProjects}</h3>
                <small style={{ color: '#8892b0' }}>Celkem Projektů</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Card.Body className="text-center">
                <h3 style={{ color: '#4CAF50' }}>{totalStats.activeProjects}</h3>
                <small style={{ color: '#8892b0' }}>Aktivní</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Card.Body className="text-center">
                <h3 style={{ color: '#9C27B0' }}>{totalStats.totalAlgorithms}</h3>
                <small style={{ color: '#8892b0' }}>Algoritmy</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Card.Body className="text-center">
                <h3 style={{ color: '#FF9800' }}>{totalStats.totalHours}h</h3>
                <small style={{ color: '#8892b0' }}>Odpracováno</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Card.Body className="text-center">
                <h3 style={{ color: '#FFD700' }}>{totalStats.totalXp}</h3>
                <small style={{ color: '#8892b0' }}>XP Získáno</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Card.Body className="text-center">
                <h3 style={{ color: '#E91E63' }}>
                  {projects.reduce((max, p) => Math.max(max, p.streak), 0)}
                </h3>
                <small style={{ color: '#8892b0' }}>Nejdelší Streak</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex gap-2 flex-wrap">
              {['all', 'active', 'completed', 'paused'].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? 'primary' : 'outline-light'}
                  size="sm"
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? '📋 Vše' : f === 'active' ? '🟢 Aktivní' : f === 'completed' ? '✅ Dokončené' : '⏸️ Pozastavené'}
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        {/* Projects Grid */}
        <Row>
          {filteredProjects.map((project) => {
            const stats = calculateProjectStats(project);
            return (
              <Col md={6} lg={4} key={project.id} className="mb-4">
                <Card 
                  style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onClick={() => setSelectedProject(project)}
                  className="hover-card"
                >
                  <Card.Header style={{ 
                    background: project.color, 
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>{project.icon}</span>
                    <Badge bg={project.priority === 'high' ? 'danger' : project.priority === 'medium' ? 'warning' : 'secondary'}>
                      {project.priority}
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title style={{ color: '#fff' }}>{project.title}</Card.Title>
                    <Card.Text style={{ color: '#8892b0', fontSize: '0.9rem' }}>
                      {project.description}
                    </Card.Text>
                    
                    <div className="mb-3">
                      <small style={{ color: '#8892b0' }}>Pokrok</small>
                      <ProgressBar 
                        now={stats.progress} 
                        variant="success" 
                        style={{ height: '8px', marginTop: '5px' }}
                      />
                      <small style={{ color: '#8892b0' }}>{stats.progress}% - {stats.completedMilestones}/{stats.totalMilestones} milníků</small>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Badge bg="info" className="me-1">📊 {stats.totalAlgorithms}</Badge>
                        <Badge bg="warning">⏱️ {stats.totalTime}min</Badge>
                      </div>
                      <span style={{ color: '#FFD700', fontWeight: 'bold' }}>
                        +{stats.totalXp} XP
                      </span>
                    </div>

                    {/* Algorithm Types Used */}
                    <div className="mt-3">
                      <small style={{ color: '#8892b0' }}>Algoritmy:</small>
                      <div className="d-flex gap-1 flex-wrap mt-1">
                        {[...new Set(project.algorithms.map(a => a.type))].slice(0, 5).map((type) => (
                          <span key={type} style={{ fontSize: '1.2rem' }} title={type}>
                            {ALGORITHM_TYPE_ICONS[type] || '📌'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Project Detail Modal */}
      <Modal 
        show={!!selectedProject} 
        onHide={() => setSelectedProject(null)}
        size="xl"
        centered
      >
        {selectedProject && (
          <>
            <Modal.Header 
              closeButton
              style={{ background: selectedProject.color, color: '#fff' }}
            >
              <Modal.Title>
                {selectedProject.icon} {selectedProject.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: '#1a1a2e' }}>
              <Tabs defaultActiveKey="overview" className="mb-3">
                <Tab 
                  eventKey="overview" 
                  title={<span style={{ color: '#fff' }}>📊 Přehled</span>}
                >
                  <Row>
                    <Col md={8}>
                      <h5 style={{ color: '#fff' }}>Popis</h5>
                      <p style={{ color: '#8892b0' }}>{selectedProject.description}</p>
                      
                      <h5 className="mt-4" style={{ color: '#fff' }}>Cíle</h5>
                      <ul style={{ color: '#8892b0' }}>
                        {selectedProject.goals.map((goal, i) => (
                          <li key={i}>{goal}</li>
                        ))}
                      </ul>

                      <h5 className="mt-4" style={{ color: '#fff' }}>Technologie</h5>
                      <div className="d-flex gap-2 flex-wrap">
                        {selectedProject.technologies.map((tech) => (
                          <Badge key={tech} bg="primary">{tech}</Badge>
                        ))}
                      </div>
                    </Col>
                    <Col md={4}>
                      <Card style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <Card.Body>
                          <h6 style={{ color: '#00d4ff' }}>Statistiky</h6>
                          <div className="d-flex justify-content-between mb-2">
                            <span style={{ color: '#8892b0' }}>Milníky</span>
                            <span style={{ color: '#fff' }}>
                              {calculateProjectStats(selectedProject).completedMilestones}/
                              {calculateProjectStats(selectedProject).totalMilestones}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span style={{ color: '#8892b0' }}>Algoritmy</span>
                            <span style={{ color: '#fff' }}>{selectedProject.algorithms.length}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span style={{ color: '#8892b0' }}>Hodiny</span>
                            <span style={{ color: '#fff' }}>{selectedProject.totalHours}h</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span style={{ color: '#8892b0' }}>Streak</span>
                            <span style={{ color: '#E91E63' }}>🔥 {selectedProject.streak}</span>
                          </div>
                          <hr style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                          <div className="d-flex justify-content-between">
                            <span style={{ color: '#8892b0' }}>Celkem XP</span>
                            <span style={{ color: '#FFD700', fontWeight: 'bold' }}>
                              +{calculateProjectStats(selectedProject).totalXp}
                            </span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Tab>

                <Tab 
                  eventKey="algorithms" 
                  title={<span style={{ color: '#fff' }}>🔐 Algoritmy</span>}
                >
                  <div className="d-flex justify-content-end mb-3">
                    <Button 
                      variant="success"
                      onClick={() => setShowNewAlgorithm(true)}
                    >
                      ➕ Logovat Algoritmus
                    </Button>
                  </div>
                  {selectedProject.algorithms.length === 0 ? (
                    <p style={{ color: '#8892b0', textAlign: 'center' }}>
                      Zatím žádné algoritmy. Začněte logovat svůj postup!
                    </p>
                  ) : (
                    <ListGroup>
                      {selectedProject.algorithms.map((alg) => (
                        <ListGroup.Item 
                          key={alg.id}
                          style={{ background: 'rgba(255,255,255,0.05)', border: 'none' }}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <span style={{ fontSize: '1.3rem', marginRight: '10px' }}>
                                {ALGORITHM_TYPE_ICONS[alg.type] || '📌'}
                              </span>
                              <strong style={{ color: '#fff' }}>{alg.title}</strong>
                              <p style={{ color: '#8892b0', margin: '5px 0', fontSize: '0.9rem' }}>
                                {alg.description}
                              </p>
                              <small style={{ color: '#667eea' }}>
                                📅 {alg.timestamp.toLocaleDateString()} • ⏱️ {alg.duration}min
                              </small>
                            </div>
                            <div className="text-end">
                              <Badge 
                                bg={alg.outcome === 'success' ? 'success' : alg.outcome === 'learning' ? 'info' : 'warning'}
                              >
                                {alg.outcome === 'success' ? '✅ Úspěch' : alg.outcome === 'learning' ? '📖 Učení' : '⚡ Částečně'}
                              </Badge>
                              <div style={{ color: '#FFD700', marginTop: '5px' }}>
                                +{alg.xpEarned} XP
                              </div>
                            </div>
                          </div>
                          {alg.tags.length > 0 && (
                            <div className="mt-2">
                              {alg.tags.map((tag) => (
                                <Badge key={tag} bg="secondary" className="me-1">{tag}</Badge>
                              ))}
                            </div>
                          )}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Tab>

                <Tab 
                  eventKey="milestones" 
                  title={<span style={{ color: '#fff' }}>🎯 Milníky</span>}
                >
                  <ListGroup>
                    {selectedProject.milestones.map((milestone) => (
                      <ListGroup.Item 
                        key={milestone.id}
                        style={{ 
                          background: milestone.isCompleted ? 'rgba(76,175,80,0.1)' : 'rgba(255,255,255,0.05)',
                          border: 'none'
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <span style={{ marginRight: '10px' }}>
                              {milestone.isCompleted ? '✅' : '⭕'}
                            </span>
                            <strong style={{ color: '#fff' }}>{milestone.title}</strong>
                            <p style={{ color: '#8892b0', margin: '5px 0 0 30px', fontSize: '0.9rem' }}>
                              {milestone.description}
                            </p>
                          </div>
                          <div className="text-end">
                            {milestone.isCompleted ? (
                              <Badge bg="success">Dokončeno</Badge>
                            ) : (
                              <Button size="sm" variant="outline-success">Dokončit</Button>
                            )}
                            <div style={{ color: '#FFD700', marginTop: '5px' }}>
                              +{milestone.xpReward} XP
                            </div>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Tab>
              </Tabs>
            </Modal.Body>
          </>
        )}
      </Modal>

      {/* New Algorithm Modal */}
      <Modal show={showNewAlgorithm} onHide={() => setShowNewAlgorithm(false)} centered>
        <Modal.Header closeButton style={{ background: '#1a1a2e' }}>
          <Modal.Title style={{ color: '#fff' }}>🔐 Logovat Algoritmus</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a2e' }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#fff' }}>Typ algoritmu</Form.Label>
              <Form.Select style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                {ALGORITHM_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#fff' }}>Název</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Co jste dělali?"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#fff' }}>Popis</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                placeholder="Detailní popis algoritmu..."
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#fff' }}>Trvání (minuty)</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="30"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#fff' }}>Výsledek</Form.Label>
                  <Form.Select style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                    <option value="success">✅ Úspěch</option>
                    <option value="partial">⚡ Částečný</option>
                    <option value="learning">📖 Učení</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#fff' }}>Tagy</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="react, optimization, debugging (oddělené čárkou)"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ background: '#1a1a2e' }}>
          <Button variant="secondary" onClick={() => setShowNewAlgorithm(false)}>Zrušit</Button>
          <Button variant="success">💾 Uložit</Button>
        </Modal.Footer>
      </Modal>

      {/* New Project Modal */}
      <Modal show={showNewProject} onHide={() => setShowNewProject(false)} size="lg" centered>
        <Modal.Header closeButton style={{ background: '#1a1a2e' }}>
          <Modal.Title style={{ color: '#fff' }}>🚀 Nový Projekt</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a2e' }}>
          <Tabs defaultActiveKey="blank" className="mb-3">
            <Tab eventKey="blank" title={<span style={{ color: '#fff' }}>📄 Prázdný</span>}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#fff' }}>Název projektu</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Můj nový projekt"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#fff' }}>Popis</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    placeholder="Co chcete dokončit?"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#fff' }}>Kategorie</Form.Label>
                      <Form.Select style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                        {PROJECT_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#fff' }}>Priorita</Form.Label>
                      <Form.Select style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                        <option value="high">🔴 Vysoká</option>
                        <option value="medium">🟡 Střední</option>
                        <option value="low">🟢 Nízká</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Tab>
            <Tab eventKey="templates" title={<span style={{ color: '#fff' }}>📋 Šablony</span>}>
              <Row>
                {PROJECT_TEMPLATES.map((template) => (
                  <Col md={6} key={template.id} className="mb-3">
                    <Card 
                      style={{ 
                        background: 'rgba(255,255,255,0.05)',
                        cursor: 'pointer',
                        border: '2px solid transparent'
                      }}
                      className="hover-card"
                    >
                      <Card.Body>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <span style={{ fontSize: '2rem' }}>{template.icon}</span>
                          <Badge bg="info">{template.estimatedHours}h</Badge>
                        </div>
                        <Card.Title style={{ color: '#fff', fontSize: '1rem' }}>{template.title}</Card.Title>
                        <Card.Text style={{ color: '#8892b0', fontSize: '0.85rem' }}>
                          {template.description}
                        </Card.Text>
                        <div style={{ color: '#FFD700' }}>
                          +{template.xpReward} XP
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer style={{ background: '#1a1a2e' }}>
          <Button variant="secondary" onClick={() => setShowNewProject(false)}>Zrušit</Button>
          <Button 
            variant="primary"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            🚀 Vytvořit Projekt
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx global>{`
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .modal-content {
          background: transparent;
        }
        .nav-tabs .nav-link {
          border: none;
          color: #8892b0;
        }
        .nav-tabs .nav-link.active {
          background: transparent;
          color: #fff !important;
          border-bottom: 2px solid #00d4ff;
        }
        .list-group-item {
          margin-bottom: 10px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
