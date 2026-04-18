'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Modal, Form, Badge, ListGroup } from 'react-bootstrap';
import { FiPlus, FiCalendar, FiMapPin, FiUsers, FiHeart, FiEdit2, FiTrash2, FiImage } from 'react-icons/fi';
import { RelationshipMemory, RelationshipEvent } from '@/types/vztahy';

interface MemoryTimelineProps {
  memories: RelationshipMemory[];
  events: RelationshipEvent[];
  onAddMemory: (memory: RelationshipMemory) => void;
  onAddEvent: (event: RelationshipEvent) => void;
  onDeleteMemory: (id: string) => void;
  storageKey: string;
}

const MemoryTimeline: React.FC<MemoryTimelineProps> = ({
  memories,
  events,
  onAddMemory,
  onAddEvent,
  onDeleteMemory,
  storageKey
}) => {
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newMemory, setNewMemory] = useState<Partial<RelationshipMemory>>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    people: [],
    emotions: [],
    location: ''
  });
  const [newEvent, setNewEvent] = useState<Partial<RelationshipEvent>>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'positive',
    impact: 5,
    category: 'milestone'
  });

  const handleAddMemory = () => {
    if (!newMemory.title || !newMemory.date) return;
    
    const memory: RelationshipMemory = {
      id: `mem_${Date.now()}`,
      date: newMemory.date!,
      title: newMemory.title!,
      description: newMemory.description || '',
      people: newMemory.people || [],
      emotions: newMemory.emotions || [],
      location: newMemory.location
    };
    
    onAddMemory(memory);
    setShowAddMemory(false);
    setNewMemory({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      people: [],
      emotions: [],
      location: ''
    });
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    
    const event: RelationshipEvent = {
      id: `evt_${Date.now()}`,
      date: newEvent.date!,
      title: newEvent.title!,
      description: newEvent.description || '',
      type: newEvent.type as 'positive' | 'negative' | 'milestone',
      impact: newEvent.impact || 5,
      category: newEvent.category || 'milestone'
    };
    
    onAddEvent(event);
    setShowAddEvent(false);
    setNewEvent({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      type: 'positive',
      impact: 5,
      category: 'milestone'
    });
  };

  const allItems = [
    ...memories.map(m => ({ ...m, itemType: 'memory' as const })),
    ...events.map(e => ({ ...e, itemType: 'event' as const }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <Card className="border-0 mb-4" style={{ 
        background: 'rgba(255,255,255,0.03)', 
        borderRadius: '20px',
        overflow: 'hidden'
      }}>
        <Card.Body className="p-0">
          <div style={{
            background: 'linear-gradient(135deg, rgba(233,30,99,0.2) 0%, rgba(255,152,0,0.2) 100%)',
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <h5 style={{ color: '#fff', margin: 0, fontWeight: 600 }}>📸 Společné vzpomínky</h5>
              <p style={{ color: 'rgba(255,255,255,0.6)', margin: '4px 0 0 0', fontSize: '0.85rem' }}>
                {memories.length} vzpomínek • {events.length} událostí
              </p>
            </div>
            <div className="d-flex gap-2">
              <Button 
                variant="outline-light" 
                size="sm"
                onClick={() => setShowAddMemory(true)}
                style={{ borderRadius: '10px' }}
              >
                <FiPlus className="me-1" /> Vzpomínku
              </Button>
              <Button 
                variant="outline-light" 
                size="sm"
                onClick={() => setShowAddEvent(true)}
                style={{ borderRadius: '10px' }}
              >
                <FiPlus className="me-1" /> Událost
              </Button>
            </div>
          </div>

          <div style={{ padding: '20px', maxHeight: '400px', overflowY: 'auto' }}>
            {allItems.length === 0 ? (
              <div className="text-center py-5">
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📷</div>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>Zatím žádné vzpomínky</p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
                  Začněte přidávat společné zážitky a momenty
                </p>
              </div>
            ) : (
              <div className="timeline">
                {allItems.map((item, idx) => (
                  <div 
                    key={item.id}
                    className="d-flex gap-3 mb-3 pb-3"
                    style={{ 
                      borderBottom: idx < allItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      position: 'relative'
                    }}
                  >
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: '36px',
                        height: '36px',
                        background: item.itemType === 'memory' 
                          ? 'rgba(233,30,99,0.2)' 
                          : item.type === 'positive' 
                            ? 'rgba(76,175,80,0.2)' 
                            : 'rgba(244,67,54,0.2)',
                        color: item.itemType === 'memory' 
                          ? '#E91E63' 
                          : item.type === 'positive' 
                            ? '#4CAF50' 
                            : '#F44336',
                        fontSize: '1rem'
                      }}
                    >
                      {item.itemType === 'memory' ? '📷' : item.type === 'positive' ? '✓' : item.type === 'negative' ? '✗' : '⭐'}
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div style={{ color: '#fff', fontWeight: 500 }}>{item.title}</div>
                          <small style={{ color: 'rgba(255,255,255,0.5)' }}>
                            {new Date(item.date).toLocaleDateString('cs-CZ')}
                          </small>
                        </div>
                        {item.itemType === 'memory' && (
                          <Button 
                            variant="link" 
                            size="sm"
                            onClick={() => onDeleteMemory(item.id)}
                            style={{ color: 'rgba(255,255,255,0.3)', padding: 0 }}
                          >
                            <FiTrash2 size={14} />
                          </Button>
                        )}
                      </div>
                      {item.description && (
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '4px', margin: 0 }}>
                          {item.description}
                        </p>
                      )}
                      {'location' in item && item.location && (
                        <Badge bg="none" className="mt-1" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                          <FiMapPin size={10} className="me-1" />{item.location}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Add Memory Modal */}
      <Modal show={showAddMemory} onHide={() => setShowAddMemory(false)} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">📸 Přidat vzpomínku</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Název *</Form.Label>
              <Form.Control
                type="text"
                placeholder="např. První společná dovolená"
                className="bg-dark text-white border-secondary"
                value={newMemory.title || ''}
                onChange={(e) => setNewMemory(prev => ({ ...prev, title: e.target.value }))}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Datum *</Form.Label>
              <Form.Control
                type="date"
                className="bg-dark text-white border-secondary"
                value={newMemory.date || ''}
                onChange={(e) => setNewMemory(prev => ({ ...prev, date: e.target.value }))}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Popis</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Popište tento moment..."
                className="bg-dark text-white border-secondary"
                value={newMemory.description || ''}
                onChange={(e) => setNewMemory(prev => ({ ...prev, description: e.target.value }))}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Místo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kde to bylo?"
                className="bg-dark text-white border-secondary"
                value={newMemory.location || ''}
                onChange={(e) => setNewMemory(prev => ({ ...prev, location: e.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => setShowAddMemory(false)}>Zrušit</Button>
          <Button variant="danger" onClick={handleAddMemory}>Přidat vzpomínku</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Event Modal */}
      <Modal show={showAddEvent} onHide={() => setShowAddEvent(false)} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">📅 Přidat událost</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Název *</Form.Label>
              <Form.Control
                type="text"
                placeholder="např. První randez-vous"
                className="bg-dark text-white border-secondary"
                value={newEvent.title || ''}
                onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Datum *</Form.Label>
              <Form.Control
                type="date"
                className="bg-dark text-white border-secondary"
                value={newEvent.date || ''}
                onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Typ události</Form.Label>
              <div className="d-flex gap-2">
                <Button
                  variant={newEvent.type === 'positive' ? 'success' : 'outline-success'}
                  size="sm"
                  onClick={() => setNewEvent(prev => ({ ...prev, type: 'positive', impact: 5 }))}
                  className="flex-grow-1"
                >
                  Pozitivní
                </Button>
                <Button
                  variant={newEvent.type === 'negative' ? 'danger' : 'outline-danger'}
                  size="sm"
                  onClick={() => setNewEvent(prev => ({ ...prev, type: 'negative', impact: -5 }))}
                  className="flex-grow-1"
                >
                  Negativní
                </Button>
                <Button
                  variant={newEvent.type === 'milestone' ? 'warning' : 'outline-warning'}
                  size="sm"
                  onClick={() => setNewEvent(prev => ({ ...prev, type: 'milestone', impact: 10 }))}
                  className="flex-grow-1"
                >
                  Milník
                </Button>
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Popis</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                className="bg-dark text-white border-secondary"
                value={newEvent.description || ''}
                onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => setShowAddEvent(false)}>Zrušit</Button>
          <Button variant="primary" onClick={handleAddEvent}>Přidat událost</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MemoryTimeline;
