'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Badge, ProgressBar, Button, Modal, Form, OverlayTrigger, Tooltip, ListGroup } from 'react-bootstrap';
import { FiPlus, FiUsers, FiHeart, FiStar, FiEdit2, FiTrash2, FiCalendar, FiTrendingUp, FiTrendingDown, FiAward, FiAlertCircle } from 'react-icons/fi';
import {
  FamilyMember,
  FamilyTrustEvent,
  FamilyRole,
  FAMILY_ROLES,
  FAMILY_TRUST_CATEGORIES,
  calculateTrustLevel
} from '@/types/trackers';

interface FamilyTrustTrackerProps {
  className?: string;
}

const MAX_VISIBLE_MEMBERS = 12;

const FamilyTrustTracker: React.FC<FamilyTrustTrackerProps> = ({ className = '' }) => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({
    role: 'parent',
    trustInMe: 70,
    myTrustInThem: 70,
    relationshipQuality: 70,
    communicationFrequency: 'weekly',
    expectations: [],
    disappointments: [],
    achievements: [],
    conflictAreas: [],
    supportAreas: [],
    events: [],
    financialSupport: 0,
  });
  const [newEvent, setNewEvent] = useState<Partial<FamilyTrustEvent>>({
    type: 'positive',
    trustChange: 5,
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('familyTrustTracker');
    if (saved) {
      try {
        setMembers(JSON.parse(saved));
      } catch {
        setMembers([]);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('familyTrustTracker', JSON.stringify(members));
  }, [members]);

  const getTrustColor = (score: number): string => {
    if (score >= 90) return '#2196F3';
    if (score >= 70) return '#4CAF50';
    if (score >= 40) return '#FF9800';
    if (score >= 20) return '#F44336';
    return '#9E9E9E';
  };

  const handleAddMember = () => {
    if (!newMember.name) return;

    const member: FamilyMember = {
      id: `family_${Date.now()}`,
      name: newMember.name!,
      role: newMember.role as FamilyRole,
      avatar: newMember.avatar,
      trustInMe: newMember.trustInMe || 70,
      myTrustInThem: newMember.myTrustInThem || 70,
      relationshipQuality: newMember.relationshipQuality || 70,
      lastPositiveInteraction: new Date().toISOString(),
      events: [],
      expectations: newMember.expectations || [],
      disappointments: newMember.disappointments || [],
      achievements: newMember.achievements || [],
      communicationFrequency: newMember.communicationFrequency || 'weekly',
      conflictAreas: newMember.conflictAreas || [],
      supportAreas: newMember.supportAreas || [],
      financialSupport: newMember.financialSupport || 0,
      notes: newMember.notes || '',
    };

    setMembers(prev => [...prev, member]);
    setShowAddModal(false);
    resetNewMember();
  };

  const resetNewMember = () => {
    setNewMember({
      role: 'parent',
      trustInMe: 70,
      myTrustInThem: 70,
      relationshipQuality: 70,
      communicationFrequency: 'weekly',
      expectations: [],
      disappointments: [],
      achievements: [],
      conflictAreas: [],
      supportAreas: [],
      events: [],
      financialSupport: 0,
    });
  };

  const handleAddEvent = () => {
    if (!selectedMember || !newEvent.description || !newEvent.category) return;

    const event: FamilyTrustEvent = {
      id: `event_${Date.now()}`,
      date: new Date().toISOString(),
      type: newEvent.type as 'positive' | 'negative',
      description: newEvent.description!,
      trustChange: newEvent.trustChange || 0,
      category: newEvent.category!,
    };

    setMembers(prev => prev.map(m => {
      if (m.id !== selectedMember.id) return m;

      const newTrustInMe = Math.max(0, Math.min(100, m.trustInMe + event.trustChange));
      const newQuality = Math.max(0, Math.min(100, m.relationshipQuality + Math.round(event.trustChange / 2)));

      return {
        ...m,
        events: [...m.events, event],
        trustInMe: newTrustInMe,
        relationshipQuality: newQuality,
        lastPositiveInteraction: event.type === 'positive' ? new Date().toISOString() : m.lastPositiveInteraction,
        lastNegativeInteraction: event.type === 'negative' ? new Date().toISOString() : m.lastNegativeInteraction,
        achievements: event.type === 'positive' ? [...m.achievements, event.description] : m.achievements,
        disappointments: event.type === 'negative' ? [...m.disappointments, event.description] : m.disappointments,
      };
    }));

    setShowEventModal(false);
    setNewEvent({ type: 'positive', trustChange: 5 });

    // Refresh selected member
    setSelectedMember(prev => prev ? {
      ...prev,
      trustInMe: Math.max(0, Math.min(100, prev.trustInMe + (newEvent.trustChange || 0))),
    } : null);
  };

  const handleDeleteMember = (memberId: string) => {
    if (!confirm('Opravdu smazat tohoto člena rodiny?')) return;
    setMembers(prev => prev.filter(m => m.id !== memberId));
    setShowModal(false);
    setSelectedMember(null);
  };

  // Stats
  const stats = useMemo(() => {
    const totalMembers = members.length;
    const avgTrustInMe = totalMembers > 0
      ? members.reduce((sum, m) => sum + m.trustInMe, 0) / totalMembers
      : 0;
    const avgQuality = totalMembers > 0
      ? members.reduce((sum, m) => sum + m.relationshipQuality, 0) / totalMembers
      : 0;
    const highTrust = members.filter(m => m.trustInMe >= 70).length;
    const needsAttention = members.filter(m => m.trustInMe < 50 || m.relationshipQuality < 50).length;

    return { totalMembers, avgTrustInMe, avgQuality, highTrust, needsAttention };
  }, [members]);

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
              background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(230, 81, 0, 0.2) 50%, rgba(20, 20, 30, 0.4) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              border: '1px solid rgba(255, 152, 0, 0.2)'
            }}
          >
            <Card.Body className="py-3 px-4">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                {/* Header */}
                <div className="d-flex align-items-center gap-3">
                  <Badge
                    bg="dark"
                    className="border text-white px-3 py-2"
                    style={{ borderColor: 'rgba(255, 152, 0, 0.5) !important' }}
                  >
                    <span className="me-2">👨‍👩‍👧</span> FAMILY TRUST
                  </Badge>

                  <OverlayTrigger placement="top" overlay={<Tooltip>Přidat člena rodiny</Tooltip>}>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => setShowAddModal(true)}
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: '32px', height: '32px', padding: 0 }}
                    >
                      <FiPlus size={16} />
                    </Button>
                  </OverlayTrigger>
                </div>

                {/* Members Preview */}
                <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
                  {members.slice(0, MAX_VISIBLE_MEMBERS).map(member => {
                    const role = FAMILY_ROLES.find(r => r.key === member.role);
                    const trustColor = getTrustColor(member.trustInMe);
                    const needsAttention = member.trustInMe < 50 || member.relationshipQuality < 50;

                    return (
                      <OverlayTrigger
                        key={member.id}
                        placement="bottom"
                        overlay={
                          <Tooltip>
                            <div className="text-start p-1">
                              <strong>{member.name}</strong>
                              <div style={{ fontSize: '0.75rem' }}>
                                <div>{role?.icon} {role?.label}</div>
                                <div>💝 Důvěra ve mě: {member.trustInMe}%</div>
                                <div>🤝 Kvalita vztahu: {member.relationshipQuality}%</div>
                                <div>📞 Kontakt: {
                                  member.communicationFrequency === 'daily' ? 'Denně' :
                                    member.communicationFrequency === 'weekly' ? 'Týdně' :
                                      member.communicationFrequency === 'monthly' ? 'Měsíčně' : 'Zřídka'
                                }</div>
                              </div>
                            </div>
                          </Tooltip>
                        }
                      >
                        <div
                          className="d-flex align-items-center gap-2"
                          style={{ cursor: 'pointer' }}
                          onClick={() => { setSelectedMember(member); setShowModal(true); }}
                        >
                          <div className="position-relative">
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: '36px',
                                height: '36px',
                                background: `linear-gradient(135deg, ${trustColor}40, ${trustColor}20)`,
                                border: `2px solid ${trustColor}`,
                                fontSize: '1rem'
                              }}
                            >
                              {member.avatar || role?.icon || '👤'}
                            </div>
                            {needsAttention && (
                              <div
                                className="position-absolute"
                                style={{ top: '-4px', right: '-4px' }}
                              >
                                <FiAlertCircle size={14} className="text-danger" />
                              </div>
                            )}
                          </div>
                          <div style={{ minWidth: '80px' }}>
                            <div className="d-flex justify-content-between mb-1">
                              <small className="text-white fw-bold" style={{ fontSize: '0.65rem' }}>
                                {member.name.slice(0, 8)}
                              </small>
                              <small className="fw-bold" style={{ fontSize: '0.65rem', color: trustColor }}>
                                {member.trustInMe}%
                              </small>
                            </div>
                            <ProgressBar
                              now={member.trustInMe}
                              style={{ height: '5px', backgroundColor: 'rgba(255,255,255,0.1)' }}
                          variant={member.trustInMe >= 70 ? 'success' : member.trustInMe >= 40 ? 'warning' : 'danger'}
                            />
                          </div>
                        </div>
                      </OverlayTrigger>
                    );
                  })}

                  {members.length > MAX_VISIBLE_MEMBERS && (
                    <Badge 
                      bg="info" 
                      className="px-2 py-1 cursor-pointer"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowAllModal(true)}
                    >
                      +{members.length - MAX_VISIBLE_MEMBERS} dalších
                    </Badge>
                  )}
                </div>

                {/* Stats Summary */}
                <div className="d-none d-xl-flex align-items-center gap-3">
                  <Badge bg="dark" className="border border-warning px-2 py-1">
                    <FiUsers className="me-1" /> {stats.totalMembers}
                  </Badge>
                  <Badge bg="dark" className="border border-success px-2 py-1">
                    <FiHeart className="me-1" /> Ø {stats.avgTrustInMe.toFixed(0)}%
                  </Badge>
                  {stats.needsAttention > 0 && (
                    <Badge bg="dark" className="border border-danger px-2 py-1">
                      <FiAlertCircle className="me-1" /> {stats.needsAttention}
                    </Badge>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Member Detail Modal */}
      <Modal show={showModal} onHide={() => { setShowModal(false); setSelectedMember(null); }} centered size="lg">
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white d-flex align-items-center gap-2">
            <span style={{ fontSize: '1.5rem' }}>
              {selectedMember?.avatar || FAMILY_ROLES.find(r => r.key === selectedMember?.role)?.icon || '👤'}
            </span>
            <div>
              <span>{selectedMember?.name}</span>
              <Badge bg="secondary" className="ms-2" style={{ fontSize: '0.7rem' }}>
                {FAMILY_ROLES.find(r => r.key === selectedMember?.role)?.label}
              </Badge>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark p-0" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {selectedMember && (
            <Row className="g-0">
              <Col md={8} className="p-3">
                {/* Trust Scores */}
                <Row className="mb-4">
                  <Col md={6}>
                    <h6 className="text-white mb-2">💝 Důvěra ve mě</h6>
                    <ProgressBar
                      now={selectedMember.trustInMe}
                      style={{ height: '20px' }}
                      variant={selectedMember.trustInMe >= 70 ? 'success' : selectedMember.trustInMe >= 40 ? 'warning' : 'danger'}
                      label={`${selectedMember.trustInMe}%`}
                    />
                  </Col>
                  <Col md={6}>
                    <h6 className="text-white mb-2">🤝 Kvalita vztahu</h6>
                    <ProgressBar
                      now={selectedMember.relationshipQuality}
                      style={{ height: '20px' }}
                      variant={selectedMember.relationshipQuality >= 70 ? 'success' : selectedMember.relationshipQuality >= 40 ? 'warning' : 'danger'}
                      label={`${selectedMember.relationshipQuality}%`}
                    />
                  </Col>
                </Row>

                {/* Achievements & Disappointments */}
                <Row className="mb-4">
                  <Col md={6}>
                    <h6 className="text-success mb-2">🏆 Čím jsem potěšil ({selectedMember.achievements.length})</h6>
                    <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                      {selectedMember.achievements.length > 0 ? (
                        selectedMember.achievements.slice(-3).map((a, i) => (
                          <Badge key={i} bg="success" className="me-1 mb-1 px-2 py-1" style={{ fontSize: '0.7rem' }}>{a}</Badge>
                        ))
                      ) : (
                        <small className="text-white-50">Zatím nic</small>
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <h6 className="text-danger mb-2">😔 Zklamání ({selectedMember.disappointments.length})</h6>
                    <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                      {selectedMember.disappointments.length > 0 ? (
                        selectedMember.disappointments.slice(-3).map((d, i) => (
                          <Badge key={i} bg="danger" className="me-1 mb-1 px-2 py-1" style={{ fontSize: '0.7rem' }}>{d}</Badge>
                        ))
                      ) : (
                        <small className="text-white-50">Zatím nic</small>
                      )}
                    </div>
                  </Col>
                </Row>

                {/* Events */}
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <h6 className="text-white mb-0">📝 Historie událostí</h6>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setShowEventModal(true)}
                  >
                    <FiPlus className="me-1" /> Přidat událost
                  </Button>
                </div>

                <ListGroup variant="flush" className="bg-transparent">
                  {selectedMember.events.length > 0 ? (
                    [...selectedMember.events]
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 5)
                      .map(event => (
                        <ListGroup.Item
                          key={event.id}
                          className="bg-transparent border-secondary text-white d-flex align-items-start gap-2"
                        >
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center mt-1"
                            style={{
                              width: '24px',
                              height: '24px',
                              minWidth: '24px',
                              background: event.type === 'positive' ? '#4CAF50' : '#F44336'
                            }}
                          >
                            {event.type === 'positive' ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between">
                              <span>{event.description}</span>
                              <Badge bg={event.trustChange >= 0 ? 'success' : 'danger'} className="ms-2">
                                {event.trustChange >= 0 ? '+' : ''}{event.trustChange}
                              </Badge>
                            </div>
                            <small className="text-white-50">
                              {new Date(event.date).toLocaleDateString('cs-CZ')}
                            </small>
                          </div>
                        </ListGroup.Item>
                      ))
                  ) : (
                    <ListGroup.Item className="bg-transparent border-secondary text-white-50 text-center">
                      Zatím žádné události
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Col>

              <Col md={4} className="border-start border-secondary p-3" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <h6 className="fw-bold mb-3 text-white">📊 Statistiky</h6>

                <div className="mb-3">
                  <small className="text-white-50">Role</small>
                  <div className="fw-bold text-white">
                    {FAMILY_ROLES.find(r => r.key === selectedMember.role)?.icon}{' '}
                    {FAMILY_ROLES.find(r => r.key === selectedMember.role)?.label}
                  </div>
                </div>

                <div className="mb-3">
                  <small className="text-white-50">Frekvence kontaktu</small>
                  <div className="fw-bold text-white">
                    {selectedMember.communicationFrequency === 'daily' ? '📞 Denně' :
                      selectedMember.communicationFrequency === 'weekly' ? '📞 Týdně' :
                        selectedMember.communicationFrequency === 'monthly' ? '📞 Měsíčně' : '📞 Zřídka'}
                  </div>
                </div>

                <div className="mb-3">
                  <small className="text-white-50">Poslední pozitivní interakce</small>
                  <div className="fw-bold text-white">
                    {new Date(selectedMember.lastPositiveInteraction).toLocaleDateString('cs-CZ')}
                  </div>
                </div>

                {selectedMember.lastNegativeInteraction && (
                  <div className="mb-3">
                    <small className="text-white-50">Poslední konflikt</small>
                    <div className="fw-bold text-danger">
                      {new Date(selectedMember.lastNegativeInteraction).toLocaleDateString('cs-CZ')}
                    </div>
                  </div>
                )}

                <hr className="border-secondary" />

                <h6 className="fw-bold mb-2 text-white">🎯 Očekávání</h6>
                {selectedMember.expectations.length > 0 ? (
                  <div className="mb-3">
                    {selectedMember.expectations.map((e, i) => (
                      <Badge key={i} bg="warning" text="dark" className="me-1 mb-1" style={{ fontSize: '0.65rem' }}>{e}</Badge>
                    ))}
                  </div>
                ) : (
                  <small className="text-white-50 d-block mb-3">Nezadáno</small>
                )}

                <h6 className="fw-bold mb-2 text-white">💪 Oblasti podpory</h6>
                {selectedMember.supportAreas.length > 0 ? (
                  <div className="mb-3">
                    {selectedMember.supportAreas.map((s, i) => (
                      <Badge key={i} bg="success" className="me-1 mb-1" style={{ fontSize: '0.65rem' }}>{s}</Badge>
                    ))}
                  </div>
                ) : (
                  <small className="text-white-50 d-block mb-3">Nezadáno</small>
                )}

                <h6 className="fw-bold mb-2 text-white">⚠️ Oblasti konfliktů</h6>
                {selectedMember.conflictAreas.length > 0 ? (
                  <div className="mb-3">
                    {selectedMember.conflictAreas.map((c, i) => (
                      <Badge key={i} bg="danger" className="me-1 mb-1" style={{ fontSize: '0.65rem' }}>{c}</Badge>
                    ))}
                  </div>
                ) : (
                  <small className="text-white-50 d-block mb-3">Nezadáno</small>
                )}

                {selectedMember.notes && (
                  <>
                    <hr className="border-secondary" />
                    <h6 className="fw-bold mb-2 text-white">📝 Poznámky</h6>
                    <small className="text-white-50">{selectedMember.notes}</small>
                  </>
                )}
              </Col>
            </Row>
          )}
        </Modal.Body>
        {selectedMember && (
          <Modal.Footer className="bg-dark border-secondary">
            <Button
              variant="outline-danger"
              onClick={() => handleDeleteMember(selectedMember.id)}
              className="me-auto"
            >
              <FiTrash2 className="me-1" /> Smazat
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Zavřít
            </Button>
          </Modal.Footer>
        )}
      </Modal>

      {/* Add Member Modal */}
      <Modal show={showAddModal} onHide={() => { setShowAddModal(false); resetNewMember(); }} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">
            <FiPlus className="me-2" /> Přidat člena rodiny
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Jméno *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="např. Máma, Táta, Sestra..."
                    className="bg-dark text-white border-secondary"
                    value={newMember.name || ''}
                    onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Role</Form.Label>
                  <Form.Select
                    className="bg-dark text-white border-secondary"
                    value={newMember.role}
                    onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value as FamilyRole }))}
                  >
                    {FAMILY_ROLES.map(role => (
                      <option key={role.key} value={role.key}>{role.icon} {role.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Jejich důvěra ve mě: {newMember.trustInMe}%</Form.Label>
              <Form.Range
                min={0}
                max={100}
                value={newMember.trustInMe || 70}
                onChange={(e) => setNewMember(prev => ({ ...prev, trustInMe: parseInt(e.target.value) }))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Kvalita vztahu: {newMember.relationshipQuality}%</Form.Label>
              <Form.Range
                min={0}
                max={100}
                value={newMember.relationshipQuality || 70}
                onChange={(e) => setNewMember(prev => ({ ...prev, relationshipQuality: parseInt(e.target.value) }))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Frekvence kontaktu</Form.Label>
              <Form.Select
                className="bg-dark text-white border-secondary"
                value={newMember.communicationFrequency}
                onChange={(e) => setNewMember(prev => ({ ...prev, communicationFrequency: e.target.value as any }))}
              >
                <option value="daily">Denně</option>
                <option value="weekly">Týdně</option>
                <option value="monthly">Měsíčně</option>
                <option value="rarely">Zřídka</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Poznámky</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                className="bg-dark text-white border-secondary"
                placeholder="Něco o tomto členu rodiny..."
                value={newMember.notes || ''}
                onChange={(e) => setNewMember(prev => ({ ...prev, notes: e.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => { setShowAddModal(false); resetNewMember(); }}>
            Zrušit
          </Button>
          <Button variant="warning" onClick={handleAddMember}>
            Přidat člena
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Event Modal */}
      <Modal show={showEventModal} onHide={() => setShowEventModal(false)} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">
            <FiPlus className="me-2" /> Přidat událost
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Typ události</Form.Label>
              <div className="d-flex gap-2">
                <Button
                  variant={newEvent.type === 'positive' ? 'success' : 'outline-success'}
                  onClick={() => setNewEvent(prev => ({ ...prev, type: 'positive', trustChange: 5 }))}
                  className="flex-grow-1"
                >
                  <FiTrendingUp className="me-1" /> Pozitivní
                </Button>
                <Button
                  variant={newEvent.type === 'negative' ? 'danger' : 'outline-danger'}
                  onClick={() => setNewEvent(prev => ({ ...prev, type: 'negative', trustChange: -5 }))}
                  className="flex-grow-1"
                >
                  <FiTrendingDown className="me-1" /> Negativní
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Kategorie</Form.Label>
              <Form.Select
                className="bg-dark text-white border-secondary"
                value={newEvent.category || ''}
                onChange={(e) => {
                  const cat = FAMILY_TRUST_CATEGORIES.find(c => c.key === e.target.value);
                  setNewEvent(prev => ({
                    ...prev,
                    category: e.target.value,
                    trustChange: cat?.defaultChange || prev.trustChange
                  }));
                }}
              >
                <option value="">Vybrat kategorii...</option>
                {FAMILY_TRUST_CATEGORIES.map(cat => (
                  <option key={cat.key} value={cat.key}>{cat.icon} {cat.label}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Popis</Form.Label>
              <Form.Control
                type="text"
                placeholder="Co se stalo?"
                className="bg-dark text-white border-secondary"
                value={newEvent.description || ''}
                onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">
                Změna důvěry: <span className={newEvent.trustChange! >= 0 ? 'text-success' : 'text-danger'}>
                  {newEvent.trustChange! >= 0 ? '+' : ''}{newEvent.trustChange}
                </span>
              </Form.Label>
              <Form.Range
                min={-10}
                max={10}
                value={newEvent.trustChange || 0}
                onChange={(e) => setNewEvent(prev => ({ ...prev, trustChange: parseInt(e.target.value) }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => setShowEventModal(false)}>
            Zrušit
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Přidat událost
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Show All Family Members Modal */}
      <Modal show={showAllModal} onHide={() => setShowAllModal(false)} size="xl" centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>👨‍👩‍👧‍👦 Celá rodina ({members.length})</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light p-4">
          <Row className="g-3">
            {members.map(member => {
              const role = FAMILY_ROLES.find(r => r.key === member.role);
              const trustColor = getTrustColor(member.trustInMe);
              
              return (
                <Col xs={12} sm={6} md={4} lg={3} key={member.id}>
                  <Card 
                    className="h-100 cursor-pointer border-0 shadow-sm hover-shadow"
                    onClick={() => { setSelectedMember(member); setShowAllModal(false); setShowModal(true); }}
                  >
                    <Card.Body className="d-flex flex-column align-items-center p-3 text-center">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                        style={{
                          width: '50px',
                          height: '50px',
                          background: `linear-gradient(135deg, ${trustColor}40, ${trustColor}20)`,
                          border: `3px solid ${trustColor}`,
                          fontSize: '1.5rem'
                        }}
                      >
                        {member.avatar || role?.icon || '👤'}
                      </div>
                      <h6 className="mb-1 fw-bold">{member.name}</h6>
                      <small className="text-muted">{role?.icon} {role?.label}</small>
                      <div className="mt-2 w-100">
                        <div className="d-flex justify-content-between mb-1">
                          <small>Důvěra ve mě</small>
                          <small className="fw-bold" style={{ color: trustColor }}>{member.trustInMe}%</small>
                        </div>
                        <ProgressBar
                          now={member.trustInMe}
                          variant={member.trustInMe >= 70 ? 'success' : member.trustInMe >= 40 ? 'warning' : 'danger'}
                          style={{ height: '8px' }}
                        />
                      </div>
                      <div className="mt-2 w-100">
                        <div className="d-flex justify-content-between mb-1">
                          <small>Kvalita vztahu</small>
                          <small className="fw-bold">{member.relationshipQuality}%</small>
                        </div>
                        <ProgressBar
                          now={member.relationshipQuality}
                          variant="info"
                          style={{ height: '8px' }}
                        />
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

export default FamilyTrustTracker;
