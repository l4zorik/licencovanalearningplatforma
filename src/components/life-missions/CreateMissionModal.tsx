'use client';

import React, { useState } from 'react';
import { Modal, Button, Form, Badge, Row, Col } from 'react-bootstrap';
import { LifeMissionTemplate, MISSION_CATEGORIES, DIFFICULTY_LABELS, MissionCategory } from '@/types/life-missions';
import { MISSION_TEMPLATES } from '@/data/life-missions/templates';

interface CreateMissionModalProps {
  show: boolean;
  onHide: () => void;
  onCreateFromTemplate: (template: LifeMissionTemplate) => void;
  onCreateCustom: (title: string, description: string, category: MissionCategory, icon: string, color: string) => void;
  existingTemplateIds: string[];
}

export default function CreateMissionModal({ show, onHide, onCreateFromTemplate, onCreateCustom, existingTemplateIds }: CreateMissionModalProps) {
  const [mode, setMode] = useState<'templates' | 'custom'>('templates');
  const [selectedCategory, setSelectedCategory] = useState<MissionCategory | 'all'>('all');
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customCategory, setCustomCategory] = useState<MissionCategory>('learning');
  const [customIcon, setCustomIcon] = useState('🎯');
  const [customColor, setCustomColor] = useState('#4CAF50');

  const filteredTemplates = selectedCategory === 'all'
    ? MISSION_TEMPLATES
    : MISSION_TEMPLATES.filter(t => t.category === selectedCategory);

  const handleCreateCustom = () => {
    if (!customTitle.trim()) return;
    onCreateCustom(customTitle, customDesc, customCategory, customIcon, customColor);
    setCustomTitle('');
    setCustomDesc('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header
        closeButton
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Modal.Title style={{ color: '#fff' }}>🚀 Nová životní mise</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#1a1a2e', maxHeight: '70vh', overflowY: 'auto' }}>
        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <Button
            size="sm"
            variant={mode === 'templates' ? 'warning' : 'outline-light'}
            onClick={() => setMode('templates')}
            style={{ borderRadius: '8px' }}
          >
            📋 Ze šablony
          </Button>
          <Button
            size="sm"
            variant={mode === 'custom' ? 'warning' : 'outline-light'}
            onClick={() => setMode('custom')}
            style={{ borderRadius: '8px' }}
          >
            ✏️ Vlastní mise
          </Button>
        </div>

        {mode === 'templates' ? (
          <>
            {/* Category filter */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <Badge
                bg=""
                onClick={() => setSelectedCategory('all')}
                style={{
                  cursor: 'pointer',
                  background: selectedCategory === 'all' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                  color: selectedCategory === 'all' ? '#fff' : 'rgba(255,255,255,0.5)',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                }}
              >
                Vše ({MISSION_TEMPLATES.length})
              </Badge>
              {MISSION_CATEGORIES.map((cat) => {
                const count = MISSION_TEMPLATES.filter(t => t.category === cat.key).length;
                if (count === 0) return null;
                return (
                  <Badge
                    key={cat.key}
                    bg=""
                    onClick={() => setSelectedCategory(cat.key)}
                    style={{
                      cursor: 'pointer',
                      background: selectedCategory === cat.key ? `${cat.color}25` : 'rgba(255,255,255,0.05)',
                      color: selectedCategory === cat.key ? cat.color : 'rgba(255,255,255,0.5)',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                    }}
                  >
                    {cat.icon} {count}
                  </Badge>
                );
              })}
            </div>

            {/* Template grid */}
            <Row className="g-3">
              {filteredTemplates.map((template) => {
                const isActive = existingTemplateIds.includes(template.id);
                const totalSteps = template.phases.reduce((s, p) => s + p.steps.length, 0);
                return (
                  <Col key={template.id} xs={12} md={6} lg={4}>
                    <div
                      style={{
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${template.color}30`,
                        padding: '16px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '1.8rem' }}>{template.icon}</span>
                        <div>
                          <h6 style={{ color: '#fff', margin: 0, fontSize: '0.95rem' }}>{template.title}</h6>
                          <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                            <Badge bg="" style={{ background: `${template.color}20`, color: template.color, fontSize: '0.6rem' }}>
                              {'⭐'.repeat(template.difficulty)} {DIFFICULTY_LABELS[template.difficulty]}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', flex: 1, marginBottom: '10px' }}>
                        {template.description}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '4px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                          {template.phases.length} fází • {totalSteps} kroků
                        </span>
                        <Badge bg="" style={{ background: 'rgba(255,193,7,0.12)', color: '#FFC107', fontSize: '0.7rem' }}>
                          ⚡ {template.totalXp} XP
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant={isActive ? 'outline-secondary' : 'outline-warning'}
                        disabled={isActive}
                        onClick={() => {
                          onCreateFromTemplate(template);
                          onHide();
                        }}
                        style={{ borderRadius: '8px', width: '100%' }}
                      >
                        {isActive ? '✓ Již aktivní' : '🚀 Začít misi'}
                      </Button>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </>
        ) : (
          /* Custom mission form */
          <div style={{ maxWidth: '500px' }}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Název mise</Form.Label>
              <Form.Control
                type="text"
                placeholder="Např. Naučit se španělsky"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Popis</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Krátký popis cíle..."
                value={customDesc}
                onChange={(e) => setCustomDesc(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px', resize: 'none' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Kategorie</Form.Label>
              <Form.Select
                value={customCategory}
                onChange={(e) => {
                  const cat = e.target.value as MissionCategory;
                  setCustomCategory(cat);
                  const found = MISSION_CATEGORIES.find(c => c.key === cat);
                  if (found) {
                    setCustomIcon(found.icon);
                    setCustomColor(found.color);
                  }
                }}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px' }}
              >
                {MISSION_CATEGORIES.map((cat) => (
                  <option key={cat.key} value={cat.key}>{cat.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="warning" onClick={handleCreateCustom} disabled={!customTitle.trim()} style={{ borderRadius: '10px' }}>
              🚀 Vytvořit misi
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
