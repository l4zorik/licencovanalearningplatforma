'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Badge, ProgressBar, Button, Modal, Form, OverlayTrigger, Tooltip, ListGroup } from 'react-bootstrap';
import { FiPlus, FiX, FiCheck, FiAlertTriangle, FiTrendingUp, FiCalendar, FiDollarSign, FiHeart, FiEdit2, FiTrash2 } from 'react-icons/fi';
import {
  Habit,
  HabitEntry,
  HabitCategory,
  HabitSeverity,
  HABIT_CATEGORIES,
  DEFAULT_HABITS,
  getHabitSeverityColor
} from '@/types/trackers';

interface HabitTrackerProps {
  className?: string;
}

const MAX_VISIBLE_HABITS = 12;

const HabitTracker: React.FC<HabitTrackerProps> = ({ className = '' }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddHabitModal, setShowAddHabitModal] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [newEntry, setNewEntry] = useState<Partial<HabitEntry>>({
    occurred: false,
    resisted: true,
    intensity: 5,
  });
  const [newHabit, setNewHabit] = useState<Partial<Habit>>({
    category: 'behavioral',
    severity: 'moderate',
    isNegative: true,
    targetDaysClean: 30,
    triggers: [],
    alternatives: [],
    cost: 0,
    healthImpact: 5,
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('habitTracker');
    if (saved) {
      try {
        setHabits(JSON.parse(saved));
      } catch {
        initializeDefaultHabits();
      }
    } else {
      initializeDefaultHabits();
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem('habitTracker', JSON.stringify(habits));
    }
  }, [habits]);

  const initializeDefaultHabits = () => {
    const defaultHabits: Habit[] = DEFAULT_HABITS.map((h, idx) => ({
      ...h,
      id: `habit_${idx}_${Date.now()}`,
      entries: [],
      createdAt: new Date().toISOString(),
    }));
    setHabits(defaultHabits);
  };

  const today = new Date().toISOString().split('T')[0];

  const getTodayEntry = (habit: Habit): HabitEntry | undefined => {
    return habit.entries.find(e => e.date === today);
  };

  const handleLogEntry = (habit: Habit, occurred: boolean, resisted: boolean = true) => {
    const existingEntry = getTodayEntry(habit);

    setHabits(prev => prev.map(h => {
      if (h.id !== habit.id) return h;

      let newEntries = [...h.entries];
      const entry: HabitEntry = {
        id: `entry_${Date.now()}`,
        date: today,
        occurred,
        resisted: !occurred || resisted,
        intensity: newEntry.intensity || 5,
        trigger: newEntry.trigger,
        notes: newEntry.notes,
      };

      if (existingEntry) {
        newEntries = newEntries.map(e => e.date === today ? entry : e);
      } else {
        newEntries.push(entry);
      }

      // Recalculate streak
      let streak = 0;
      const sortedEntries = [...newEntries].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      for (const e of sortedEntries) {
        if (!e.occurred || e.resisted) {
          streak++;
        } else {
          break;
        }
      }

      return {
        ...h,
        entries: newEntries,
        currentStreak: streak,
        longestStreak: Math.max(h.longestStreak, streak),
        totalRelapses: occurred && !resisted ? h.totalRelapses + 1 : h.totalRelapses,
        lastRelapse: occurred && !resisted ? today : h.lastRelapse,
      };
    }));

    setShowModal(false);
    setSelectedHabit(null);
    setNewEntry({ occurred: false, resisted: true, intensity: 5 });
  };

  const handleAddHabit = () => {
    if (!newHabit.name || !newHabit.icon) return;

    const habit: Habit = {
      id: `habit_${Date.now()}`,
      name: newHabit.name!,
      icon: newHabit.icon!,
      category: newHabit.category as HabitCategory,
      severity: newHabit.severity as HabitSeverity,
      isNegative: true,
      targetDaysClean: newHabit.targetDaysClean || 30,
      currentStreak: 0,
      longestStreak: 0,
      totalRelapses: 0,
      entries: [],
      triggers: newHabit.triggers || [],
      alternatives: newHabit.alternatives || [],
      cost: newHabit.cost || 0,
      healthImpact: newHabit.healthImpact || 5,
      createdAt: new Date().toISOString(),
    };

    setHabits(prev => [...prev, habit]);
    setShowAddHabitModal(false);
    setNewHabit({
      category: 'behavioral',
      severity: 'moderate',
      isNegative: true,
      targetDaysClean: 30,
      triggers: [],
      alternatives: [],
      cost: 0,
      healthImpact: 5,
    });
  };

  const handleDeleteHabit = (habitId: string) => {
    if (!confirm('Opravdu smazat tento návyk?')) return;
    setHabits(prev => prev.filter(h => h.id !== habitId));
  };

  // Statistics
  const stats = useMemo(() => {
    const totalCost = habits.reduce((sum, h) => sum + h.cost, 0);
    const avgHealthImpact = habits.length > 0
      ? habits.reduce((sum, h) => sum + h.healthImpact, 0) / habits.length
      : 0;
    const totalRelapses = habits.reduce((sum, h) => sum + h.totalRelapses, 0);
    const cleanToday = habits.filter(h => {
      const entry = getTodayEntry(h);
      return !entry || !entry.occurred || entry.resisted;
    }).length;

    return { totalCost, avgHealthImpact, totalRelapses, cleanToday };
  }, [habits]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <>
      <Row className={`mb-4 ${className}`}>
        <Col>
          <Card
            className="border-0 shadow-sm glass-effect"
            style={{
              background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.15) 0%, rgba(183, 28, 28, 0.2) 50%, rgba(20, 20, 30, 0.4) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              border: '1px solid rgba(244, 67, 54, 0.2)'
            }}
          >
            <Card.Body className="py-3 px-4">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                {/* Header */}
                <div className="d-flex align-items-center gap-3">
                  <Badge
                    bg="dark"
                    className="border border-danger text-white px-3 py-2"
                    style={{ borderColor: 'rgba(244, 67, 54, 0.5) !important' }}
                  >
                    <span className="me-2">⛔</span> HABIT TRACKER
                  </Badge>

                  <OverlayTrigger placement="top" overlay={<Tooltip>Přidat závislost</Tooltip>}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => setShowAddHabitModal(true)}
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: '32px', height: '32px', padding: 0 }}
                    >
                      <FiPlus size={16} />
                    </Button>
                  </OverlayTrigger>
                </div>

                {/* Habits */}
                <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
                  {habits.slice(0, MAX_VISIBLE_HABITS).map(habit => {
                    const todayEntry = getTodayEntry(habit);
                    const isCleanToday = !todayEntry || !todayEntry.occurred || todayEntry.resisted;
                    const progressToTarget = Math.min(100, (habit.currentStreak / habit.targetDaysClean) * 100);

                    return (
                      <OverlayTrigger
                        key={habit.id}
                        placement="bottom"
                        overlay={
                          <Tooltip>
                            <div className="text-start p-1">
                              <strong>{habit.name}</strong>
                              <div style={{ fontSize: '0.75rem' }}>
                                <div>🔥 Streak: {habit.currentStreak} dní</div>
                                <div>🎯 Cíl: {habit.targetDaysClean} dní</div>
                                <div>💰 Náklad: {formatCurrency(habit.cost)}/měs</div>
                                <div>❤️ Zdraví: {habit.healthImpact}/10</div>
                              </div>
                            </div>
                          </Tooltip>
                        }
                      >
                        <div
                          className="d-flex align-items-center gap-2"
                          style={{ cursor: 'pointer' }}
                          onClick={() => { setSelectedHabit(habit); setShowModal(true); }}
                        >
                          <div
                            style={{
                              fontSize: '1.5rem',
                              filter: isCleanToday ? 'none' : 'grayscale(50%)',
                              opacity: isCleanToday ? 1 : 0.6
                            }}
                          >
                            {habit.icon}
                          </div>
                          <div style={{ minWidth: '100px' }}>
                            <div className="d-flex justify-content-between mb-1">
                              <small className="text-white fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>
                                {habit.name.toUpperCase().slice(0, 10)}
                              </small>
                              <small
                                className="fw-bold"
                                style={{
                                  fontSize: '0.65rem',
                                  color: isCleanToday ? '#4CAF50' : '#F44336'
                                }}
                              >
                                {habit.currentStreak}d
                              </small>
                            </div>
                            <ProgressBar
                              now={progressToTarget}
                              variant={progressToTarget >= 100 ? 'success' : progressToTarget >= 50 ? 'warning' : 'danger'}
                              style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }}
                            />
                          </div>
                            {isCleanToday ? (
                              <FiCheck className="text-success" size={14} />
                            ) : (
                              <FiAlertTriangle className="text-danger" size={14} />
                            )}
                          </div>
                        </OverlayTrigger>
                      );
                    })}

                    {habits.length > MAX_VISIBLE_HABITS && (
                      <Badge 
                        bg="info" 
                        className="px-2 py-1 cursor-pointer"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowAllModal(true)}
                      >
                        +{habits.length - MAX_VISIBLE_HABITS} dalších
                      </Badge>
                    )}
                  </div>

                  {/* Stats Summary */}
                <div className="d-none d-xl-flex align-items-center gap-3">
                  <Badge bg="dark" className="border border-success px-2 py-1">
                    <FiCheck className="me-1" /> {stats.cleanToday}/{habits.length}
                  </Badge>
                  <Badge bg="dark" className="border border-warning px-2 py-1">
                    <FiDollarSign className="me-1" /> {formatCurrency(stats.totalCost)}
                  </Badge>
                  <Badge bg="dark" className="border border-danger px-2 py-1">
                    <FiHeart className="me-1" /> {stats.avgHealthImpact.toFixed(1)}/10
                  </Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Log Entry Modal */}
      <Modal show={showModal} onHide={() => { setShowModal(false); setSelectedHabit(null); }} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white d-flex align-items-center gap-2">
            <span>{selectedHabit?.icon}</span>
            <span>{selectedHabit?.name}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          {selectedHabit && (
            <>
              {/* Stats */}
              <Row className="mb-4">
                <Col xs={6} md={3} className="text-center mb-2">
                  <div className="text-warning fw-bold" style={{ fontSize: '1.5rem' }}>
                    🔥 {selectedHabit.currentStreak}
                  </div>
                  <small className="text-white-50">Aktuální streak</small>
                </Col>
                <Col xs={6} md={3} className="text-center mb-2">
                  <div className="text-info fw-bold" style={{ fontSize: '1.5rem' }}>
                    🏆 {selectedHabit.longestStreak}
                  </div>
                  <small className="text-white-50">Nejdelší streak</small>
                </Col>
                <Col xs={6} md={3} className="text-center mb-2">
                  <div className="text-danger fw-bold" style={{ fontSize: '1.5rem' }}>
                    💔 {selectedHabit.totalRelapses}
                  </div>
                  <small className="text-white-50">Relapsy</small>
                </Col>
                <Col xs={6} md={3} className="text-center mb-2">
                  <div className="text-success fw-bold" style={{ fontSize: '1.5rem' }}>
                    🎯 {selectedHabit.targetDaysClean}
                  </div>
                  <small className="text-white-50">Cíl (dní)</small>
                </Col>
              </Row>

              {/* Progress */}
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <small className="text-white">Pokrok k cíli</small>
                  <small className="text-white">
                    {Math.round((selectedHabit.currentStreak / selectedHabit.targetDaysClean) * 100)}%
                  </small>
                </div>
                <ProgressBar
                  now={(selectedHabit.currentStreak / selectedHabit.targetDaysClean) * 100}
                  variant="success"
                  style={{ height: '10px' }}
                />
              </div>

              {/* Triggers & Alternatives */}
              <Row className="mb-4">
                <Col md={6}>
                  <h6 className="text-danger mb-2">⚠️ Spouštěče</h6>
                  <div className="d-flex flex-wrap gap-1">
                    {selectedHabit.triggers.map((t, i) => (
                      <Badge key={i} bg="danger" className="px-2 py-1">{t}</Badge>
                    ))}
                  </div>
                </Col>
                <Col md={6}>
                  <h6 className="text-success mb-2">✅ Alternativy</h6>
                  <div className="d-flex flex-wrap gap-1">
                    {selectedHabit.alternatives.map((a, i) => (
                      <Badge key={i} bg="success" className="px-2 py-1">{a}</Badge>
                    ))}
                  </div>
                </Col>
              </Row>

              <hr className="border-secondary" />

              {/* Log Today */}
              <h6 className="text-white mb-3">📝 Zaznamenat dnešek</h6>

              <Form.Group className="mb-3">
                <Form.Label className="text-white-50">Intenzita potřeby (1-10)</Form.Label>
                <Form.Range
                  min={1}
                  max={10}
                  value={newEntry.intensity || 5}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, intensity: parseInt(e.target.value) }))}
                />
                <div className="d-flex justify-content-between text-white-50" style={{ fontSize: '0.75rem' }}>
                  <span>Slabá</span>
                  <span className="fw-bold text-warning">{newEntry.intensity}</span>
                  <span>Silná</span>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-white-50">Co to vyvolalo?</Form.Label>
                <Form.Select
                  className="bg-dark text-white border-secondary"
                  value={newEntry.trigger || ''}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, trigger: e.target.value }))}
                >
                  <option value="">Vybrat spouštěč...</option>
                  {selectedHabit.triggers.map((t, i) => (
                    <option key={i} value={t}>{t}</option>
                  ))}
                  <option value="other">Jiné</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-white-50">Poznámky</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  className="bg-dark text-white border-secondary"
                  placeholder="Jak ses cítil? Co pomohlo/nepomohlo?"
                  value={newEntry.notes || ''}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, notes: e.target.value }))}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        {selectedHabit && (
          <Modal.Footer className="bg-dark border-secondary">
            <Button
              variant="outline-danger"
              onClick={() => handleDeleteHabit(selectedHabit.id)}
              className="me-auto"
            >
              <FiTrash2 className="me-1" /> Smazat
            </Button>
            <Button
              variant="danger"
              onClick={() => handleLogEntry(selectedHabit, true, false)}
            >
              😔 Relaps
            </Button>
            <Button
              variant="warning"
              onClick={() => handleLogEntry(selectedHabit, true, true)}
            >
              💪 Odolal jsem
            </Button>
            <Button
              variant="success"
              onClick={() => handleLogEntry(selectedHabit, false, true)}
            >
              ✅ Čistý den
            </Button>
          </Modal.Footer>
        )}
      </Modal>

      {/* Add Habit Modal */}
      <Modal show={showAddHabitModal} onHide={() => setShowAddHabitModal(false)} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">
            <FiPlus className="me-2" /> Přidat závislost
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Název</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="např. Kofein"
                    className="bg-dark text-white border-secondary"
                    value={newHabit.name || ''}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, name: e.target.value }))}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Ikona</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="☕"
                    className="bg-dark text-white border-secondary text-center"
                    style={{ fontSize: '1.5rem' }}
                    value={newHabit.icon || ''}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, icon: e.target.value }))}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Kategorie</Form.Label>
                  <Form.Select
                    className="bg-dark text-white border-secondary"
                    value={newHabit.category}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, category: e.target.value as HabitCategory }))}
                  >
                    {HABIT_CATEGORIES.map(cat => (
                      <option key={cat.key} value={cat.key}>{cat.icon} {cat.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Závažnost</Form.Label>
                  <Form.Select
                    className="bg-dark text-white border-secondary"
                    value={newHabit.severity}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, severity: e.target.value as HabitSeverity }))}
                  >
                    <option value="mild">Mírná</option>
                    <option value="moderate">Střední</option>
                    <option value="severe">Vážná</option>
                    <option value="critical">Kritická</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Cíl (dní)</Form.Label>
                  <Form.Control
                    type="number"
                    className="bg-dark text-white border-secondary"
                    value={newHabit.targetDaysClean || 30}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, targetDaysClean: parseInt(e.target.value) || 30 }))}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Náklad/měs (Kč)</Form.Label>
                  <Form.Control
                    type="number"
                    className="bg-dark text-white border-secondary"
                    value={newHabit.cost || 0}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, cost: parseInt(e.target.value) || 0 }))}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Zdraví (1-10)</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    max={10}
                    className="bg-dark text-white border-secondary"
                    value={newHabit.healthImpact || 5}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, healthImpact: parseInt(e.target.value) || 5 }))}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => setShowAddHabitModal(false)}>
            Zrušit
          </Button>
          <Button variant="danger" onClick={handleAddHabit}>
            Přidat závislost
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Show All Habits Modal */}
      <Modal show={showAllModal} onHide={() => setShowAllModal(false)} size="xl" centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">🔥 Všechny návyky ({habits.length})</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light p-4">
          <Row className="g-3">
            {habits.map(habit => {
              const todayEntry = getTodayEntry(habit);
              const isCleanToday = !todayEntry || !todayEntry.occurred || todayEntry.resisted;
              const category = HABIT_CATEGORIES.find(c => c.key === habit.category);
              
              return (
                <Col xs={12} sm={6} md={4} lg={3} key={habit.id}>
                  <Card 
                    className="h-100 cursor-pointer border-0 shadow-sm hover-shadow"
                    onClick={() => { setSelectedHabit(habit); setShowAllModal(false); setShowModal(true); }}
                  >
                    <Card.Body className="d-flex flex-column align-items-center p-3 text-center">
                      <div 
                        style={{ 
                          fontSize: '2rem',
                          filter: isCleanToday ? 'none' : 'grayscale(50%)',
                          opacity: isCleanToday ? 1 : 0.6
                        }}
                      >
                        {habit.icon}
                      </div>
                      <h6 className="mb-1 fw-bold mt-2">{habit.name}</h6>
                      <small className="text-muted">{category?.icon} {category?.label}</small>
                      <div className="mt-2 d-flex gap-2">
                        <Badge bg={isCleanToday ? 'success' : 'danger'}>
                          {isCleanToday ? '✓ Čistý' : '⚠ Relaps'}
                        </Badge>
                      </div>
                      <div className="mt-2 w-100">
                        <div className="d-flex justify-content-between mb-1">
                          <small>Streak</small>
                          <small className="fw-bold">{habit.currentStreak}d</small>
                        </div>
                        <ProgressBar
                          now={Math.min(100, (habit.currentStreak / habit.targetDaysClean) * 100)}
                          variant="success"
                          style={{ height: '8px' }}
                        />
                        <small className="text-muted">{habit.targetDaysClean} dní cíl</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HabitTracker;
