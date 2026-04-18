'use client';

import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Form, Badge, ProgressBar } from 'react-bootstrap';
import { FiPlus, FiTarget, FiCheck, FiClock, FiTrendingUp, FiHeart, FiMessageCircle, FiUsers, FiAward } from 'react-icons/fi';
import { RelationshipGoal } from '@/types/vztahy';

interface GoalsTrackerProps {
  goals: RelationshipGoal[];
  onAddGoal: (goal: RelationshipGoal) => void;
  onUpdateGoal: (goal: RelationshipGoal) => void;
  onDeleteGoal: (id: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  communication: <FiMessageCircle />,
  trust: <FiHeart />,
  time: <FiClock />,
  support: <FiUsers />,
  growth: <FiTrendingUp />
};

const categoryColors: Record<string, string> = {
  communication: '#2196F3',
  trust: '#E91E63',
  time: '#FF9800',
  support: '#4CAF50',
  growth: '#9C27B0'
};

const GoalsTracker: React.FC<GoalsTrackerProps> = ({
  goals,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal
}) => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<RelationshipGoal | null>(null);
  const [newGoal, setNewGoal] = useState<Partial<RelationshipGoal>>({
    title: '',
    description: '',
    category: 'communication',
    targetDate: '',
    progress: 0,
    isCompleted: false,
    steps: []
  });
  const [newStep, setNewStep] = useState('');

  const handleAddGoal = () => {
    if (!newGoal.title) return;
    
    const goal: RelationshipGoal = {
      id: `goal_${Date.now()}`,
      title: newGoal.title!,
      description: newGoal.description || '',
      category: newGoal.category as RelationshipGoal['category'] || 'communication',
      targetDate: newGoal.targetDate,
      progress: 0,
      isCompleted: false,
      steps: []
    };
    
    onAddGoal(goal);
    setShowAddGoal(false);
    setNewGoal({
      title: '',
      description: '',
      category: 'communication',
      targetDate: '',
      progress: 0,
      isCompleted: false,
      steps: []
    });
  };

  const handleAddStep = () => {
    if (!selectedGoal || !newStep.trim()) return;
    
    const updatedGoal = {
      ...selectedGoal,
      steps: [
        ...selectedGoal.steps,
        { id: `step_${Date.now()}`, title: newStep, isCompleted: false }
      ]
    };
    
    onUpdateGoal(updatedGoal);
    setSelectedGoal(updatedGoal);
    setNewStep('');
  };

  const toggleStep = (goal: RelationshipGoal, stepId: string) => {
    const updatedSteps = goal.steps.map(s => 
      s.id === stepId ? { ...s, isCompleted: !s.isCompleted } : s
    );
    
    const completedCount = updatedSteps.filter(s => s.isCompleted).length;
    const progress = updatedSteps.length > 0 
      ? Math.round((completedCount / updatedSteps.length) * 100) 
      : 0;
    
    const updatedGoal = {
      ...goal,
      steps: updatedSteps,
      progress,
      isCompleted: progress === 100
    };
    
    onUpdateGoal(updatedGoal);
    setSelectedGoal(updatedGoal);
  };

  const completedGoals = goals.filter(g => g.isCompleted).length;
  const totalGoals = goals.length;
  const overallProgress = totalGoals > 0 
    ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / totalGoals)
    : 0;

  return (
    <>
      <Card className="border-0 mb-4" style={{ 
        background: 'rgba(255,255,255,0.03)', 
        borderRadius: '20px',
        overflow: 'hidden'
      }}>
        <Card.Body className="p-0">
          <div style={{
            background: 'linear-gradient(135deg, rgba(76,175,80,0.2) 0%, rgba(33,150,243,0.2) 100%)',
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <h5 style={{ color: '#fff', margin: 0, fontWeight: 600 }}>🎯 Cíle vztahu</h5>
              <p style={{ color: 'rgba(255,255,255,0.6)', margin: '4px 0 0 0', fontSize: '0.85rem' }}>
                {completedGoals} z {totalGoals} dokončeno • {overallProgress}% celkem
              </p>
            </div>
            <Button 
              variant="outline-light" 
              size="sm"
              onClick={() => setShowAddGoal(true)}
              style={{ borderRadius: '10px' }}
            >
              <FiPlus className="me-1" /> Nový cíl
            </Button>
          </div>

          <div style={{ padding: '20px' }}>
            <ProgressBar 
              now={overallProgress}
              variant="success"
              style={{ 
                height: '8px', 
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                marginBottom: '20px'
              }}
            />

            {goals.length === 0 ? (
              <div className="text-center py-4">
                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎯</div>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>Zatím žádné cíle</p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
                  Stanovte si společné cíle pro váš vztah
                </p>
              </div>
            ) : (
              <Row className="g-3">
                {goals.map(goal => (
                  <Col xs={12} md={6} key={goal.id}>
                    <Card 
                      className="border-0 h-100 cursor-pointer"
                      style={{ 
                        background: goal.isCompleted 
                          ? 'rgba(76,175,80,0.1)' 
                          : 'rgba(255,255,255,0.03)',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onClick={() => setSelectedGoal(goal)}
                    >
                      <Card.Body className="p-3">
                        <div className="d-flex align-items-start gap-2 mb-2">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                              width: '32px',
                              height: '32px',
                              background: `${categoryColors[goal.category]}20`,
                              color: categoryColors[goal.category],
                              flexShrink: 0
                            }}
                          >
                            {categoryIcons[goal.category]}
                          </div>
                          <div className="flex-grow-1">
                            <div style={{ 
                              color: '#fff', 
                              fontWeight: 500,
                              textDecoration: goal.isCompleted ? 'line-through' : 'none',
                              opacity: goal.isCompleted ? 0.6 : 1
                            }}>
                              {goal.title}
                            </div>
                            {goal.targetDate && (
                              <small style={{ color: 'rgba(255,255,255,0.4)' }}>
                                Do: {new Date(goal.targetDate).toLocaleDateString('cs-CZ')}
                              </small>
                            )}
                          </div>
                          {goal.isCompleted && (
                            <Badge bg="success" style={{ fontSize: '0.7rem' }}>✓</Badge>
                          )}
                        </div>
                        <ProgressBar 
                          now={goal.progress}
                          variant={goal.isCompleted ? 'success' : 'warning'}
                          style={{ 
                            height: '6px', 
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '8px'
                          }}
                        />
                        <div className="d-flex justify-content-between mt-1">
                          <small style={{ color: 'rgba(255,255,255,0.4)' }}>
                            {goal.steps.filter(s => s.isCompleted).length}/{goal.steps.length} kroků
                          </small>
                          <small style={{ color: categoryColors[goal.category], fontWeight: 600 }}>
                            {goal.progress}%
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Add Goal Modal */}
      <Modal show={showAddGoal} onHide={() => setShowAddGoal(false)} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">🎯 Nový cíl</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Název cíle *</Form.Label>
              <Form.Control
                type="text"
                placeholder="např. Více spolu trávit čas"
                className="bg-dark text-white border-secondary"
                value={newGoal.title || ''}
                onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Popis</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                className="bg-dark text-white border-secondary"
                value={newGoal.description || ''}
                onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Kategorie</Form.Label>
              <Form.Select
                className="bg-dark text-white border-secondary"
                value={newGoal.category || 'communication'}
                onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value as any }))}
              >
                <option value="communication">💬 Komunikace</option>
                <option value="trust">🤝 Důvěra</option>
                <option value="time">⏰ Čas spolu</option>
                <option value="support">💪 Podpora</option>
                <option value="growth">🌱 Růst</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Cílové datum</Form.Label>
              <Form.Control
                type="date"
                className="bg-dark text-white border-secondary"
                value={newGoal.targetDate || ''}
                onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => setShowAddGoal(false)}>Zrušit</Button>
          <Button variant="success" onClick={handleAddGoal}>Vytvořit cíl</Button>
        </Modal.Footer>
      </Modal>

      {/* Goal Detail Modal */}
      <Modal show={!!selectedGoal} onHide={() => setSelectedGoal(null)} centered size="lg">
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white d-flex align-items-center gap-2">
            {selectedGoal && (
              <>
                <span style={{ color: categoryColors[selectedGoal.category] }}>
                  {categoryIcons[selectedGoal.category]}
                </span>
                {selectedGoal.title}
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          {selectedGoal && (
            <>
              {selectedGoal.description && (
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>{selectedGoal.description}</p>
              )}
              
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>Pokrok</span>
                  <span style={{ color: categoryColors[selectedGoal.category], fontWeight: 600 }}>
                    {selectedGoal.progress}%
                  </span>
                </div>
                <ProgressBar 
                  now={selectedGoal.progress}
                  variant={selectedGoal.isCompleted ? 'success' : 'warning'}
                  style={{ height: '12px', borderRadius: '10px' }}
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 style={{ color: '#fff', margin: 0 }}>Kroky k cíli</h6>
                  <Button 
                    variant="link" 
                    size="sm"
                    onClick={handleAddStep}
                    disabled={!newStep.trim()}
                    style={{ color: '#4CAF50' }}
                  >
                    <FiPlus /> Přidat
                  </Button>
                </div>
                
                <div className="d-flex gap-2 mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Nový krok..."
                    className="bg-dark text-white border-secondary"
                    value={newStep}
                    onChange={(e) => setNewStep(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddStep()}
                  />
                </div>

                <div>
                  {selectedGoal?.steps?.length === 0 ? (
                    <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '20px' }}>
                      Zatím žádné kroky
                    </p>
                  ) : (
                    selectedGoal?.steps?.map(step => (
                      <div 
                        key={step.id}
                        className="d-flex align-items-center gap-2 mb-2 p-2"
                        style={{ 
                          background: 'rgba(255,255,255,0.03)', 
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                        onClick={() => selectedGoal && toggleStep(selectedGoal, step.id)}
                      >
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: '24px',
                            height: '24px',
                            background: step.isCompleted ? '#4CAF50' : 'rgba(255,255,255,0.1)',
                            border: step.isCompleted ? 'none' : '2px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            flexShrink: 0
                          }}
                        >
                          {step.isCompleted && <FiCheck size={12} />}
                        </div>
                        <span style={{ 
                          color: step.isCompleted ? 'rgba(255,255,255,0.4)' : '#fff',
                          textDecoration: step.isCompleted ? 'line-through' : 'none'
                        }}>
                          {step.title}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          {selectedGoal && (
            <Button 
              variant="outline-danger" 
              className="me-auto"
              onClick={() => {
                onDeleteGoal(selectedGoal.id);
                setSelectedGoal(null);
              }}
            >
              Smazat cíl
            </Button>
          )}
          <Button variant="secondary" onClick={() => setSelectedGoal(null)}>Zavřít</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GoalsTracker;
