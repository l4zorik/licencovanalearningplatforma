'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Badge, ProgressBar, Button, Modal, Form, OverlayTrigger, Tooltip, ListGroup, InputGroup } from 'react-bootstrap';
import { FiPlus, FiUser, FiUsers, FiHeart, FiAlertCircle, FiStar, FiEdit2, FiTrash2, FiMessageCircle, FiCalendar, FiDollarSign, FiLock, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import {
  Friend,
  TrustEvent,
  FriendCategory,
  TrustLevel,
  TRUST_LEVELS,
  FRIEND_CATEGORIES,
  TRUST_EVENT_CATEGORIES,
  calculateTrustLevel
} from '@/types/trackers';

interface FriendTrustTrackerProps {
  className?: string;
}

const FriendTrustTracker: React.FC<FriendTrustTrackerProps> = ({ className = '' }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [newFriend, setNewFriend] = useState<Partial<Friend>>({
    category: 'regular',
    trustScore: 50,
    contactFrequency: 'weekly',
    strengths: [],
    weaknesses: [],
    sharedInterests: [],
    events: [],
    borrowedMoney: 0,
    lentMoney: 0,
    secretsShared: 0,
    timesHelped: 0,
    timesLetDown: 0,
    isActive: true,
  });
  const [newEvent, setNewEvent] = useState<Partial<TrustEvent>>({
    type: 'positive',
    trustChange: 5,
  });
  const [newStrength, setNewStrength] = useState('');
  const [newWeakness, setNewWeakness] = useState('');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('friendTrustTracker');
    if (saved) {
      try {
        setFriends(JSON.parse(saved));
      } catch {
        setFriends([]);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('friendTrustTracker', JSON.stringify(friends));
  }, [friends]);

  const getTrustColor = (score: number): string => {
    const level = TRUST_LEVELS.find((l, i, arr) => {
      const nextLevel = arr[i + 1];
      return score >= l.minScore && (!nextLevel || score < nextLevel.minScore);
    });
    return level?.color || '#9E9E9E';
  };

  const getTrustLabel = (score: number): string => {
    return TRUST_LEVELS.find((l, i, arr) => {
      const nextLevel = arr[i + 1];
      return score >= l.minScore && (!nextLevel || score < nextLevel.minScore);
    })?.label || 'Neznámá';
  };

  const handleAddFriend = () => {
    if (!newFriend.name) return;

    const friend: Friend = {
      id: `friend_${Date.now()}`,
      name: newFriend.name!,
      nickname: newFriend.nickname,
      category: newFriend.category as FriendCategory,
      trustLevel: calculateTrustLevel(newFriend.trustScore || 50),
      trustScore: newFriend.trustScore || 50,
      knownSince: newFriend.knownSince || new Date().toISOString(),
      lastContact: new Date().toISOString(),
      contactFrequency: newFriend.contactFrequency || 'weekly',
      events: [],
      strengths: newFriend.strengths || [],
      weaknesses: newFriend.weaknesses || [],
      sharedInterests: newFriend.sharedInterests || [],
      borrowedMoney: newFriend.borrowedMoney || 0,
      lentMoney: newFriend.lentMoney || 0,
      secretsShared: newFriend.secretsShared || 0,
      timesHelped: newFriend.timesHelped || 0,
      timesLetDown: newFriend.timesLetDown || 0,
      notes: newFriend.notes || '',
      isActive: true,
    };

    setFriends(prev => [...prev, friend]);
    setShowAddModal(false);
    resetNewFriend();
  };

  const resetNewFriend = () => {
    setNewFriend({
      category: 'regular',
      trustScore: 50,
      contactFrequency: 'weekly',
      strengths: [],
      weaknesses: [],
      sharedInterests: [],
      events: [],
      borrowedMoney: 0,
      lentMoney: 0,
      secretsShared: 0,
      timesHelped: 0,
      timesLetDown: 0,
      isActive: true,
    });
  };

  const handleAddEvent = () => {
    if (!selectedFriend || !newEvent.description || !newEvent.category) return;

    const event: TrustEvent = {
      id: `event_${Date.now()}`,
      date: new Date().toISOString(),
      type: newEvent.type as 'positive' | 'negative' | 'neutral',
      description: newEvent.description!,
      trustChange: newEvent.trustChange || 0,
      category: newEvent.category!,
    };

    setFriends(prev => prev.map(f => {
      if (f.id !== selectedFriend.id) return f;

      const newScore = Math.max(0, Math.min(100, f.trustScore + event.trustChange));
      return {
        ...f,
        events: [...f.events, event],
        trustScore: newScore,
        trustLevel: calculateTrustLevel(newScore),
        lastContact: new Date().toISOString(),
        timesHelped: event.type === 'positive' ? f.timesHelped + 1 : f.timesHelped,
        timesLetDown: event.type === 'negative' ? f.timesLetDown + 1 : f.timesLetDown,
      };
    }));

    setShowEventModal(false);
    setNewEvent({ type: 'positive', trustChange: 5 });

    // Update selected friend
    const updated = friends.find(f => f.id === selectedFriend.id);
    if (updated) {
      setSelectedFriend({
        ...updated,
        trustScore: Math.max(0, Math.min(100, updated.trustScore + event.trustChange)),
      });
    }
  };

  const handleDeleteFriend = (friendId: string) => {
    if (!confirm('Opravdu smazat tohoto přítele?')) return;
    setFriends(prev => prev.filter(f => f.id !== friendId));
    setShowModal(false);
    setSelectedFriend(null);
  };

  // Stats
  const stats = useMemo(() => {
    const totalFriends = friends.filter(f => f.isActive).length;
    const avgTrust = totalFriends > 0
      ? friends.filter(f => f.isActive).reduce((sum, f) => sum + f.trustScore, 0) / totalFriends
      : 0;
    const highTrust = friends.filter(f => f.isActive && f.trustScore >= 70).length;
    const lowTrust = friends.filter(f => f.isActive && f.trustScore < 40).length;
    const totalOwed = friends.reduce((sum, f) => sum + f.borrowedMoney, 0);
    const totalLent = friends.reduce((sum, f) => sum + f.lentMoney, 0);

    return { totalFriends, avgTrust, highTrust, lowTrust, totalOwed, totalLent };
  }, [friends]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(amount);
  };

  const sortedFriends = useMemo(() => {
    return [...friends]
      .filter(f => f.isActive)
      .sort((a, b) => b.trustScore - a.trustScore);
  }, [friends]);

  return (
    <>
      <Row className={`mb-4 ${className}`}>
        <Col>
          <Card
            className="border-0 shadow-sm glass-effect"
            style={{
              background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.15) 0%, rgba(74, 20, 140, 0.2) 50%, rgba(20, 20, 30, 0.4) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              border: '1px solid rgba(156, 39, 176, 0.2)'
            }}
          >
            <Card.Body className="py-3 px-4">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                {/* Header */}
                <div className="d-flex align-items-center gap-3">
                  <Badge
                    bg="dark"
                    className="border text-white px-3 py-2"
                    style={{ borderColor: 'rgba(156, 39, 176, 0.5) !important' }}
                  >
                    <span className="me-2">👥</span> FRIEND TRUST
                  </Badge>

                  <OverlayTrigger placement="top" overlay={<Tooltip>Přidat přítele</Tooltip>}>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => setShowAddModal(true)}
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: '32px', height: '32px', padding: 0 }}
                    >
                      <FiPlus size={16} />
                    </Button>
                  </OverlayTrigger>
                </div>

                {/* Friends Preview */}
                <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
                  {sortedFriends.slice(0, 5).map(friend => {
                    const trustColor = getTrustColor(friend.trustScore);
                    const category = FRIEND_CATEGORIES.find(c => c.key === friend.category);

                    return (
                      <OverlayTrigger
                        key={friend.id}
                        placement="bottom"
                        overlay={
                          <Tooltip>
                            <div className="text-start p-1">
                              <strong>{friend.name}</strong>
                              {friend.nickname && <span className="text-white-50"> ({friend.nickname})</span>}
                              <div style={{ fontSize: '0.75rem' }}>
                                <div>{category?.icon} {category?.label}</div>
                                <div>🎯 Důvěra: {friend.trustScore}%</div>
                                <div>🤝 Pomohl: {friend.timesHelped}x</div>
                                <div>😔 Zklamal: {friend.timesLetDown}x</div>
                              </div>
                            </div>
                          </Tooltip>
                        }
                      >
                        <div
                          className="d-flex align-items-center gap-2"
                          style={{ cursor: 'pointer' }}
                          onClick={() => { setSelectedFriend(friend); setShowModal(true); }}
                        >
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
                            {friend.avatar || '👤'}
                          </div>
                          <div style={{ minWidth: '80px' }}>
                            <div className="d-flex justify-content-between mb-1">
                              <small className="text-white fw-bold" style={{ fontSize: '0.65rem' }}>
                                {friend.name.slice(0, 8)}
                              </small>
                              <small className="fw-bold" style={{ fontSize: '0.65rem', color: trustColor }}>
                                {friend.trustScore}%
                              </small>
                            </div>
                            <ProgressBar
                              now={friend.trustScore}
                              style={{ height: '5px', backgroundColor: 'rgba(255,255,255,0.1)' }}
                              variant={friend.trustScore >= 70 ? 'success' : friend.trustScore >= 40 ? 'warning' : 'danger'}
                            />
                          </div>
                        </div>
                      </OverlayTrigger>
                    );
                  })}

                  {friends.length > 5 && (
                    <Badge bg="secondary" className="px-2 py-1">
                      +{friends.length - 5}
                    </Badge>
                  )}
                </div>

                {/* Stats Summary */}
                <div className="d-none d-xl-flex align-items-center gap-3">
                  <Badge bg="dark" className="border border-info px-2 py-1">
                    <FiUsers className="me-1" /> {stats.totalFriends}
                  </Badge>
                  <Badge bg="dark" className="border border-success px-2 py-1">
                    <FiStar className="me-1" /> {stats.highTrust}
                  </Badge>
                  <Badge bg="dark" className="border border-warning px-2 py-1">
                    Ø {stats.avgTrust.toFixed(0)}%
                  </Badge>
                  {(stats.totalOwed > 0 || stats.totalLent > 0) && (
                    <Badge bg="dark" className="border border-danger px-2 py-1">
                      <FiDollarSign className="me-1" /> {formatCurrency(stats.totalOwed - stats.totalLent)}
                    </Badge>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Friend Detail Modal */}
      <Modal show={showModal} onHide={() => { setShowModal(false); setSelectedFriend(null); }} centered size="lg">
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white d-flex align-items-center gap-2">
            <span style={{ fontSize: '1.5rem' }}>{selectedFriend?.avatar || '👤'}</span>
            <div>
              <span>{selectedFriend?.name}</span>
              {selectedFriend?.nickname && (
                <small className="text-white-50 ms-2">({selectedFriend.nickname})</small>
              )}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark p-0" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {selectedFriend && (
            <Row className="g-0">
              <Col md={8} className="p-3">
                {/* Trust Score */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="text-white mb-0">🎯 Důvěra</h6>
                    <Badge style={{ background: getTrustColor(selectedFriend.trustScore) }}>
                      {getTrustLabel(selectedFriend.trustScore)}
                    </Badge>
                  </div>
                  <ProgressBar
                    now={selectedFriend.trustScore}
                    style={{ height: '20px' }}
                    variant={selectedFriend.trustScore >= 70 ? 'success' : selectedFriend.trustScore >= 40 ? 'warning' : 'danger'}
                    label={`${selectedFriend.trustScore}%`}
                  />
                </div>

                {/* Strengths & Weaknesses */}
                <Row className="mb-4">
                  <Col md={6}>
                    <h6 className="text-success mb-2">💪 Silné stránky</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {selectedFriend.strengths.length > 0 ? (
                        selectedFriend.strengths.map((s, i) => (
                          <Badge key={i} bg="success" className="px-2 py-1">{s}</Badge>
                        ))
                      ) : (
                        <small className="text-white-50">Zatím nezadáno</small>
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <h6 className="text-danger mb-2">⚠️ Slabé stránky</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {selectedFriend.weaknesses.length > 0 ? (
                        selectedFriend.weaknesses.map((w, i) => (
                          <Badge key={i} bg="danger" className="px-2 py-1">{w}</Badge>
                        ))
                      ) : (
                        <small className="text-white-50">Zatím nezadáno</small>
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
                  {selectedFriend.events.length > 0 ? (
                    [...selectedFriend.events]
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 5)
                      .map(event => (
                        <ListGroup.Item
                          key={event.id}
                          className="bg-transparent border-secondary text-white d-flex align-items-start gap-2"
                        >
                          <div
                            className={`rounded-circle d-flex align-items-center justify-content-center mt-1`}
                            style={{
                              width: '24px',
                              height: '24px',
                              minWidth: '24px',
                              background: event.type === 'positive' ? '#4CAF50' : event.type === 'negative' ? '#F44336' : '#9E9E9E'
                            }}
                          >
                            {event.type === 'positive' ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between">
                              <span>{event.description}</span>
                              <Badge
                                bg={event.trustChange >= 0 ? 'success' : 'danger'}
                                className="ms-2"
                              >
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
                  <small className="text-white-50">Kategorie</small>
                  <div className="fw-bold text-white">
                    {FRIEND_CATEGORIES.find(c => c.key === selectedFriend.category)?.icon}{' '}
                    {FRIEND_CATEGORIES.find(c => c.key === selectedFriend.category)?.label}
                  </div>
                </div>

                <div className="mb-3">
                  <small className="text-white-50">Známe se od</small>
                  <div className="fw-bold text-white">
                    {new Date(selectedFriend.knownSince).toLocaleDateString('cs-CZ')}
                  </div>
                </div>

                <div className="mb-3">
                  <small className="text-white-50">Poslední kontakt</small>
                  <div className="fw-bold text-white">
                    {new Date(selectedFriend.lastContact).toLocaleDateString('cs-CZ')}
                  </div>
                </div>

                <hr className="border-secondary" />

                <Row className="mb-3">
                  <Col xs={6}>
                    <div className="text-center">
                      <div className="text-success fw-bold" style={{ fontSize: '1.3rem' }}>
                        {selectedFriend.timesHelped}
                      </div>
                      <small className="text-white-50">Pomohl</small>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="text-center">
                      <div className="text-danger fw-bold" style={{ fontSize: '1.3rem' }}>
                        {selectedFriend.timesLetDown}
                      </div>
                      <small className="text-white-50">Zklamal</small>
                    </div>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={6}>
                    <div className="text-center">
                      <div className="text-info fw-bold" style={{ fontSize: '1.3rem' }}>
                        🤫 {selectedFriend.secretsShared}
                      </div>
                      <small className="text-white-50">Tajemství</small>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="text-center">
                      <div className="text-warning fw-bold" style={{ fontSize: '1.3rem' }}>
                        {selectedFriend.events.length}
                      </div>
                      <small className="text-white-50">Událostí</small>
                    </div>
                  </Col>
                </Row>

                <hr className="border-secondary" />

                <h6 className="fw-bold mb-2 text-white">💰 Finance</h6>
                <div className="d-flex justify-content-between mb-1">
                  <small className="text-white-50">Dluží mi</small>
                  <span className="text-success">{formatCurrency(selectedFriend.borrowedMoney)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <small className="text-white-50">Dlužím já</small>
                  <span className="text-danger">{formatCurrency(selectedFriend.lentMoney)}</span>
                </div>

                {selectedFriend.notes && (
                  <>
                    <hr className="border-secondary" />
                    <h6 className="fw-bold mb-2 text-white">📝 Poznámky</h6>
                    <small className="text-white-50">{selectedFriend.notes}</small>
                  </>
                )}
              </Col>
            </Row>
          )}
        </Modal.Body>
        {selectedFriend && (
          <Modal.Footer className="bg-dark border-secondary">
            <Button
              variant="outline-danger"
              onClick={() => handleDeleteFriend(selectedFriend.id)}
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

      {/* Add Friend Modal */}
      <Modal show={showAddModal} onHide={() => { setShowAddModal(false); resetNewFriend(); }} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">
            <FiPlus className="me-2" /> Přidat přítele
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
                    placeholder="např. Jan Novák"
                    className="bg-dark text-white border-secondary"
                    value={newFriend.name || ''}
                    onChange={(e) => setNewFriend(prev => ({ ...prev, name: e.target.value }))}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Přezdívka</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Honza"
                    className="bg-dark text-white border-secondary"
                    value={newFriend.nickname || ''}
                    onChange={(e) => setNewFriend(prev => ({ ...prev, nickname: e.target.value }))}
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
                    value={newFriend.category}
                    onChange={(e) => setNewFriend(prev => ({ ...prev, category: e.target.value as FriendCategory }))}
                  >
                    {FRIEND_CATEGORIES.map(cat => (
                      <option key={cat.key} value={cat.key}>{cat.icon} {cat.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Frekvence kontaktu</Form.Label>
                  <Form.Select
                    className="bg-dark text-white border-secondary"
                    value={newFriend.contactFrequency}
                    onChange={(e) => setNewFriend(prev => ({ ...prev, contactFrequency: e.target.value as any }))}
                  >
                    <option value="daily">Denně</option>
                    <option value="weekly">Týdně</option>
                    <option value="monthly">Měsíčně</option>
                    <option value="rarely">Zřídka</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Počáteční důvěra: {newFriend.trustScore}%</Form.Label>
              <Form.Range
                min={0}
                max={100}
                value={newFriend.trustScore || 50}
                onChange={(e) => setNewFriend(prev => ({ ...prev, trustScore: parseInt(e.target.value) }))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Známe se od</Form.Label>
              <Form.Control
                type="date"
                className="bg-dark text-white border-secondary"
                value={newFriend.knownSince?.split('T')[0] || ''}
                onChange={(e) => setNewFriend(prev => ({ ...prev, knownSince: e.target.value }))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Poznámky</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                className="bg-dark text-white border-secondary"
                placeholder="Něco o tomto příteli..."
                value={newFriend.notes || ''}
                onChange={(e) => setNewFriend(prev => ({ ...prev, notes: e.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => { setShowAddModal(false); resetNewFriend(); }}>
            Zrušit
          </Button>
          <Button variant="primary" onClick={handleAddFriend}>
            Přidat přítele
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
                  const cat = TRUST_EVENT_CATEGORIES.find(c => c.key === e.target.value);
                  setNewEvent(prev => ({
                    ...prev,
                    category: e.target.value,
                    trustChange: cat?.defaultChange || prev.trustChange
                  }));
                }}
              >
                <option value="">Vybrat kategorii...</option>
                {TRUST_EVENT_CATEGORIES
                  .filter(c => (newEvent.type === 'positive' && c.defaultChange > 0) ||
                    (newEvent.type === 'negative' && c.defaultChange < 0))
                  .map(cat => (
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
    </>
  );
};

export default FriendTrustTracker;
