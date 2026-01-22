import React, { useState } from 'react';
import { Card, Button, Badge, ListGroup, ProgressBar, Row, Col, Form, Modal } from 'react-bootstrap';
import { Project, ProjectMilestone, DEFAULT_TIMER_SETTINGS } from '@/types/projects';
import { calculateProjectStats } from '@/data/projects/data';
import ProjectDeadlineTimer from '@/components/timers/ProjectDeadlineTimer';
import MilestoneTimer from '@/components/timers/MilestoneTimer';

interface FocusedProjectCardProps {
  project: Project;
  onClose: () => void;
  onUpdate: (project: Project) => void;
}

export default function FocusedProjectCard({ project, onClose, onUpdate }: FocusedProjectCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ProjectMilestone>>({});
  const stats = calculateProjectStats(project);

  const handleToggleMilestone = (milestoneId: string) => {
    const updatedMilestones = project.milestones.map(m =>
      m.id === milestoneId
        ? { ...m, isCompleted: !m.isCompleted, completedAt: m.isCompleted ? undefined : new Date() }
        : m
    );
    onUpdate({ ...project, milestones: updatedMilestones });
  };

  const handleDeleteMilestone = (milestoneId: string) => {
    if (confirm('Opravdu chcete smazat tento milník?')) {
      const updatedMilestones = project.milestones.filter(m => m.id !== milestoneId);
      onUpdate({ ...project, milestones: updatedMilestones });
    }
  };

  const handleMoveMilestone = (milestoneId: string, direction: 'up' | 'down') => {
    const index = project.milestones.findIndex(m => m.id === milestoneId);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === project.milestones.length - 1)) return;
    
    const newMilestones = [...project.milestones];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newMilestones[index], newMilestones[targetIndex]] = [newMilestones[targetIndex], newMilestones[index]];
    
    newMilestones.forEach((m, i) => m.order = i);
    onUpdate({ ...project, milestones: newMilestones });
  };

  const handleStartEdit = (milestone: ProjectMilestone) => {
    setEditingMilestoneId(milestone.id);
    setEditForm({ title: milestone.title, description: milestone.description, xpReward: milestone.xpReward });
  };

  const handleSaveEdit = () => {
    if (!editingMilestoneId || !editForm.title) return;
    
    const updatedMilestones = project.milestones.map(m =>
      m.id === editingMilestoneId ? { ...m, ...editForm } : m
    );
    onUpdate({ ...project, milestones: updatedMilestones });
    setEditingMilestoneId(null);
    setEditForm({});
  };

  const handleAddMilestone = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMilestone: ProjectMilestone = {
      id: `milestone-${Date.now()}`,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      isCompleted: false,
      xpReward: parseInt(formData.get('xpReward') as string) || 100,
      order: project.milestones.length,
      targetHours: parseFloat(formData.get('targetHours') as string) || (project.timerSettings?.defaultMilestoneHours || DEFAULT_TIMER_SETTINGS.defaultMilestoneHours),
      timeSpent: 0,
      timerActive: false,
      timerStartedAt: undefined,
    };
    onUpdate({ ...project, milestones: [...project.milestones, newMilestone] });
    setShowAddModal(false);
  };

  const getProjectLevel = (xp: number) => {
    if (xp >= 10000) return { level: 'Platinum', color: '#E5E4E2', icon: '💎' };
    if (xp >= 5000) return { level: 'Gold', color: '#FFD700', icon: '🏆' };
    if (xp >= 2000) return { level: 'Silver', color: '#C0C0C0', icon: '🥈' };
    return { level: 'Bronze', color: '#CD7F32', icon: '🥉' };
  };

  const projectLevel = getProjectLevel(stats.totalXp);

  return (
    <Card style={{
      background: `linear-gradient(135deg, ${project.color}40 0%, ${project.color}20 100%)`,
      border: `3px solid ${project.color}`
    }}>
      <Card.Header style={{ background: project.color, color: '#fff' }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <span style={{ fontSize: '2.5rem' }}>{project.icon}</span>
            <div>
              <h4 className="mb-0">{project.title}</h4>
              <small>{project.description}</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Badge bg="light" text="dark" style={{ fontSize: '0.8rem' }}>
              {projectLevel.icon} {projectLevel.level}
            </Badge>
            <Button
              variant={isEditing ? 'success' : 'outline-light'}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? '💾 Uložit' : '✏️ Upravit'}
            </Button>
            <Button variant="outline-light" size="sm" onClick={onClose}>
              ❌ Zavřít
            </Button>
          </div>
        </div>
        
        <Row className="mt-3">
          <Col md={12} className="mb-2">
            <ProjectDeadlineTimer project={project} onUpdate={onUpdate} />
          </Col>
        </Row>
        
        <Row className="mt-2">
          <Col md={8}>
            <div className="d-flex align-items-center gap-3">
              <span style={{ color: '#fff', fontSize: '0.9rem' }}>Pokrok: {stats.progress}%</span>
              <ProgressBar
                now={stats.progress}
                variant={stats.progress === 100 ? 'success' : 'info'}
                style={{ flex: 1, height: '12px' }}
              />
              <Badge bg="light" text="dark">
                {stats.completedMilestones}/{stats.totalMilestones} milníků
              </Badge>
            </div>
          </Col>
          <Col md={4} className="text-end">
            <Badge bg="warning" text="dark" style={{ fontSize: '0.9rem' }}>
              🔥 Streak: {project.streak || 0} dní
            </Badge>
          </Col>
        </Row>
      </Card.Header>

      <Card.Body>
        <Row>
          <Col md={8}>
            {isEditing && (
              <div className="mb-3 d-flex justify-content-end">
                <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
                  ➕ Přidat Milník
                </Button>
              </div>
            )}

            <h6 style={{ color: '#fff' }}>🗺️ Roadmap Milníků</h6>
            <div className="milestone-roadmap">
              {project.milestones.map((milestone, idx) => (
                <div key={milestone.id} className="milestone-roadmap-item mb-2">
                  <div className="d-flex align-items-start gap-3">
                    <div className="milestone-connector text-center" style={{ minWidth: '30px' }}>
                      <div
                        className="milestone-dot"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: milestone.isCompleted ? '#28a745' : project.color,
                          border: `3px solid ${milestone.isCompleted ? '#fff' : project.color}`,
                          margin: '0 auto'
                        }}
                      />
                      {idx < project.milestones.length - 1 && (
                        <div className="milestone-line" style={{
                          width: '3px',
                          height: '40px',
                          background: milestone.isCompleted ? '#28a745' : 'rgba(255,255,255,0.2)',
                          margin: '0 auto'
                        }} />
                      )}
                    </div>
                    
                    <div className="flex-grow-1" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '10px' }}>
                      {editingMilestoneId === milestone.id ? (
                        <div className="edit-form">
                          <Form.Control
                            size="sm"
                            className="mb-2"
                            placeholder="Název milníku"
                            value={editForm.title || ''}
                            onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                          />
                          <Form.Control
                            size="sm"
                            className="mb-2"
                            as="textarea"
                            placeholder="Popis"
                            value={editForm.description || ''}
                            onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                            rows={2}
                          />
                          <Row>
                            <Col xs={6}>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder="XP"
                                value={editForm.xpReward || 100}
                                onChange={e => setEditForm({ ...editForm, xpReward: parseInt(e.target.value) || 0 })}
                                style={{ width: '100%' }}
                              />
                            </Col>
                            <Col xs={6}>
                              <Form.Control
                                size="sm"
                                type="number"
                                step="0.5"
                                placeholder="Hodin"
                                value={milestone.targetHours || project.timerSettings?.defaultMilestoneHours || 2}
                                onChange={e => setEditForm({ ...editForm, targetHours: parseFloat(e.target.value) || 2 })}
                                style={{ width: '100%' }}
                              />
                            </Col>
                          </Row>
                          <div className="d-flex gap-1 mt-2">
                            <Button size="sm" variant="success" onClick={handleSaveEdit}>💾</Button>
                            <Button size="sm" variant="secondary" onClick={() => setEditingMilestoneId(null)}>❌</Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center gap-2">
                                <span
                                  style={{
                                    textDecoration: milestone.isCompleted ? 'line-through' : 'none',
                                    opacity: milestone.isCompleted ? 0.6 : 1,
                                    color: '#fff',
                                    fontWeight: '500'
                                  }}
                                >
                                  {milestone.title}
                                </span>
                                <Badge bg={milestone.isCompleted ? 'success' : 'secondary'} style={{ fontSize: '0.7rem' }}>
                                  +{milestone.xpReward} XP
                                </Badge>
                              </div>
                              <small style={{ color: '#888' }}>{milestone.description}</small>
                            </div>
                            {isEditing && (
                              <div className="d-flex gap-1 ms-2">
                                <Button
                                  size="sm"
                                  variant="outline-info"
                                  onClick={() => handleMoveMilestone(milestone.id, 'up')}
                                  disabled={idx === 0}
                                >
                                  ⬆️
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline-info"
                                  onClick={() => handleMoveMilestone(milestone.id, 'down')}
                                  disabled={idx === project.milestones.length - 1}
                                >
                                  ⬇️
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline-warning"
                                  onClick={() => handleStartEdit(milestone)}
                                >
                                  ✏️
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => handleDeleteMilestone(milestone.id)}
                                >
                                  🗑️
                                </Button>
                              </div>
                            )}
                            {!isEditing && (
                              <Button
                                size="sm"
                                variant={milestone.isCompleted ? 'outline-secondary' : 'outline-success'}
                                onClick={() => handleToggleMilestone(milestone.id)}
                                className="ms-2"
                              >
                                {milestone.isCompleted ? '✅' : '⭕'}
                              </Button>
                            )}
                          </div>
                          <MilestoneTimer 
                            milestone={milestone}
                            settings={project.timerSettings || DEFAULT_TIMER_SETTINGS}
                            onUpdate={(updated) => {
                              const updatedMilestones = project.milestones.map(m =>
                                m.id === updated.id ? updated : m
                              );
                              onUpdate({ ...project, milestones: updatedMilestones });
                            }}
                            isEditing={isEditing}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h6 className="mt-4" style={{ color: '#fff' }}>🧪 Algoritmy ({project.algorithms.length})</h6>
            {project.algorithms.length === 0 ? (
              <p style={{ color: '#888' }}>Zatím žádné algoritmy</p>
            ) : (
              <div className="d-flex gap-1 flex-wrap">
                {project.algorithms.map((alg) => (
                  <Badge key={alg.id} bg="info" style={{ fontSize: '0.8rem' }}>
                    {alg.type}: {alg.title}
                  </Badge>
                ))}
              </div>
            )}
          </Col>

          <Col md={4}>
            <Card style={{ background: 'rgba(0,0,0,0.3)' }}>
              <Card.Body>
                <h6 style={{ color: '#fff' }}>📊 Statistiky</h6>
                <hr style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                
                <div className="mb-3">
                  <small style={{ color: '#888' }}>Dokončeno</small>
                  <div className="d-flex justify-content-between">
                    <span style={{ color: '#fff' }}>{stats.completedMilestones}/{stats.totalMilestones}</span>
                    <ProgressBar now={(stats.completedMilestones / Math.max(stats.totalMilestones, 1)) * 100} style={{ height: '6px', width: '60%' }} />
                  </div>
                </div>

                <div className="mb-3">
                  <small style={{ color: '#888' }}>Úspěšnost algoritmů</small>
                  <div className="d-flex justify-content-between">
                    <span style={{ color: '#fff' }}>{stats.successRate}%</span>
                    <ProgressBar now={stats.successRate} variant="info" style={{ height: '6px', width: '60%' }} />
                  </div>
                </div>

                <div className="mb-3">
                  <small style={{ color: '#888' }}>Algoritmy</small>
                  <span style={{ color: '#fff' }} className="ms-2">{stats.totalAlgorithms}</span>
                </div>

                <div className="mb-3">
                  <small style={{ color: '#888' }}>Celkem hodin</small>
                  <span style={{ color: '#fff' }} className="ms-2">{project.totalHours}h</span>
                </div>

                <hr style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                
                <h6 style={{ color: '#fff' }}>🏆 XP Přehled</h6>
                <div className="d-flex justify-content-between mb-2">
                  <small style={{ color: '#888' }}>Algoritmy</small>
                  <span style={{ color: '#4CAF50' }}>+{project.algorithms.reduce((sum, a) => sum + a.xpEarned, 0)} XP</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <small style={{ color: '#888' }}>Milníky</small>
                  <span style={{ color: '#4CAF50' }}>+{project.milestones.filter(m => m.isCompleted).reduce((sum, m) => sum + m.xpReward, 0)} XP</span>
                </div>
                <hr style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                <div className="d-flex justify-content-between">
                  <small style={{ color: '#fff', fontWeight: 'bold' }}>CELKEM XP</small>
                  <span style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '1.2rem' }}>+{stats.totalXp}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton style={{ background: project.color, color: '#fff' }}>
          <Modal.Title>➕ Přidat Milník</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a2e' }}>
          <Form onSubmit={handleAddMilestone}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#fff' }}>Název milníku</Form.Label>
              <Form.Control name="title" required placeholder="Zadejte název..." style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#fff' }}>Popis</Form.Label>
              <Form.Control name="description" as="textarea" rows={3} placeholder="Popište milník..." style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }} />
            </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#fff' }}>XP Odměna</Form.Label>
            <Form.Control name="xpReward" type="number" defaultValue={100} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#fff' }}>Cílový čas (hodiny)</Form.Label>
            <Form.Control name="targetHours" type="number" step="0.5" defaultValue={project.timerSettings?.defaultMilestoneHours || 2} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }} />
          </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>Zrušit</Button>
              <Button variant="primary" type="submit">Přidat</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
}
