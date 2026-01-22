import { useState, useEffect } from 'react';
import { Button, Badge, Modal, Form, Row, Col, ListGroup, InputGroup } from 'react-bootstrap';

export interface AlgorithmTemplate {
  id: string;
  title: string;
  type: string;
  description: string;
  notes: string;
  duration: number;
  xpEarned: number;
  outcome: string;
  tags: string[];
}

interface AlgorithmTemplatesModalProps {
  show: boolean;
  onClose: () => void;
  onSelectTemplate: (template: AlgorithmTemplate) => void;
}

const DEFAULT_TEMPLATES: AlgorithmTemplate[] = [
  {
    id: 'tpl-1',
    title: 'Denní učení',
    type: 'learning',
    description: 'Alespoň 1 hodina denně věnovaná učení',
    notes: 'Fokus na konkrétní téma',
    duration: 60,
    xpEarned: 25,
    outcome: 'learning',
    tags: ['learning', 'daily', 'discipline']
  },
  {
    id: 'tpl-2',
    title: 'Cvičení',
    type: 'exercise',
    description: 'Posilovna, běh, nebo domácí cvičení',
    notes: 'Důležitá konzistence',
    duration: 45,
    xpEarned: 30,
    outcome: 'success',
    tags: ['exercise', 'health', 'daily']
  },
  {
    id: 'tpl-3',
    title: 'Hledání práce',
    type: 'job-search',
    description: 'Životopisy, pohovory, networking',
    notes: 'Aktivní hledání',
    duration: 90,
    xpEarned: 40,
    outcome: 'learning',
    tags: ['job-search', 'career', 'networking']
  },
  {
    id: 'tpl-4',
    title: 'Finanční přehled',
    type: 'finance',
    description: 'Sledování příjmů a výdajů',
    notes: 'Kontrola rozpočtu',
    duration: 15,
    xpEarned: 10,
    outcome: 'success',
    tags: ['finance', 'budget', 'tracking']
  },
  {
    id: 'tpl-5',
    title: 'Kódění projektu',
    type: 'coding',
    description: 'Práce na osobním projektu',
    notes: 'Fokus na dokončení úkolu',
    duration: 120,
    xpEarned: 50,
    outcome: 'learning',
    tags: ['coding', 'project', 'development']
  },
  {
    id: 'tpl-6',
    title: 'Meditace',
    type: 'other',
    description: 'Mindfulness a meditace',
    notes: 'Pro lepší psychiku',
    duration: 20,
    xpEarned: 15,
    outcome: 'success',
    tags: ['meditation', 'mental-health', 'mindfulness']
  },
  {
    id: 'tpl-7',
    title: 'Čtení odborné literatury',
    type: 'learning',
    description: 'Čtení knih nebo článků',
    notes: 'Rozšiřování obzorů',
    duration: 45,
    xpEarned: 20,
    outcome: 'learning',
    tags: ['reading', 'learning', 'books']
  },
  {
    id: 'tpl-8',
    title: 'Úklid a organizace',
    type: 'other',
    description: 'Organizace prostoru',
    notes: 'Čistota = pořádek v hlavě',
    duration: 60,
    xpEarned: 15,
    outcome: 'success',
    tags: ['organization', 'cleaning', 'productivity']
  },
];

export default function AlgorithmTemplatesModal({ show, onClose, onSelectTemplate }: AlgorithmTemplatesModalProps) {
  const [templates, setTemplates] = useState<AlgorithmTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<AlgorithmTemplate | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState<{
    title: string;
    type: string;
    description: string;
    notes: string;
    duration: number;
    xpEarned: number;
    outcome: string;
    tags: string;
  }>({
    title: '',
    type: 'learning',
    description: '',
    notes: '',
    duration: 30,
    xpEarned: 10,
    outcome: 'learning',
    tags: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('algorithmTemplates');
    if (saved) {
      try {
        setTemplates(JSON.parse(saved));
      } catch {
        setTemplates(DEFAULT_TEMPLATES);
      }
    } else {
      setTemplates(DEFAULT_TEMPLATES);
    }
  }, []);

  const saveTemplates = (newTemplates: AlgorithmTemplate[]) => {
    setTemplates(newTemplates);
    localStorage.setItem('algorithmTemplates', JSON.stringify(newTemplates));
  };

  const handleAddTemplate = () => {
    if (!newTemplate.title) return;
    
    const template: AlgorithmTemplate = {
      id: `tpl-${Date.now()}`,
      title: newTemplate.title!,
      type: newTemplate.type!,
      description: newTemplate.description || '',
      notes: newTemplate.notes || '',
      duration: newTemplate.duration || 30,
      xpEarned: newTemplate.xpEarned || 10,
      outcome: newTemplate.outcome!,
      tags: typeof newTemplate.tags === 'string' 
        ? newTemplate.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0)
        : (newTemplate.tags || [])
    };
    
    saveTemplates([...templates, template]);
    setNewTemplate({
      title: '',
      type: 'learning',
      description: '',
      notes: '',
      duration: 30,
      xpEarned: 10,
      outcome: 'learning',
      tags: ''
    });
    setShowAddForm(false);
  };

  const handleDeleteTemplate = (id: string) => {
    if (confirm('Opravdu smazat tuto šablonu?')) {
      saveTemplates(templates.filter(t => t.id !== id));
    }
  };

  const handleUseTemplate = (template: AlgorithmTemplate) => {
    onSelectTemplate(template);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton style={{ background: '#1a1a2e', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Modal.Title>📋 Šablony Algoritmů</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#1a1a2e' }}>
        <Row>
          <Col md={7}>
            <h6 style={{ color: '#fff', marginBottom: '15px' }}>Dostupné šablony ({templates.length})</h6>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="template-item mb-2 p-2 rounded"
                  style={{
                    background: selectedTemplate?.id === template.id ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${selectedTemplate?.id === template.id ? '#4CAF50' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <Badge bg="info" style={{ fontSize: '0.7rem' }}>{template.type}</Badge>
                        <span style={{ color: '#fff', fontWeight: '500' }}>{template.title}</span>
                      </div>
                      {template.description && (
                        <small style={{ color: '#aaa', display: 'block', marginTop: '4px' }}>
                          {template.description.substring(0, 60)}...
                        </small>
                      )}
                      <div className="d-flex gap-1 mt-1 flex-wrap">
                        {template.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} bg="secondary" style={{ fontSize: '0.6rem' }}>{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); handleDeleteTemplate(template.id); }}
                    >
                      🗑️
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline-success"
              className="mt-3 w-100"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? '❌ Zrušit' : '➕ Přidat novou šablonu'}
            </Button>
          </Col>
          
          <Col md={5}>
            {showAddForm ? (
              <div>
                <h6 style={{ color: '#fff', marginBottom: '15px' }}>Nová šablona</h6>
                <Form onSubmit={(e) => { e.preventDefault(); handleAddTemplate(); }}>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#ccc', fontSize: '0.85rem' }}>Název</Form.Label>
                    <Form.Control
                      value={newTemplate.title}
                      onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                      placeholder="Denní učení"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#ccc', fontSize: '0.85rem' }}>Typ</Form.Label>
                    <Form.Select
                      value={newTemplate.type}
                      onChange={(e) => setNewTemplate({ ...newTemplate, type: e.target.value })}
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                    >
                      <option value="learning">📖 Učení</option>
                      <option value="coding">💻 Kódování</option>
                      <option value="exercise">🏋️ Cvičení</option>
                      <option value="job-search">💼 Hledání práce</option>
                      <option value="finance">💰 Finance</option>
                      <option value="research">🔬 Výzkum</option>
                      <option value="planning">📋 Plánování</option>
                      <option value="other">📝 Ostatní</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#ccc', fontSize: '0.85rem' }}>Popis</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#ccc', fontSize: '0.85rem' }}>Poznámky</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={newTemplate.notes}
                      onChange={(e) => setNewTemplate({ ...newTemplate, notes: e.target.value })}
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                    />
                  </Form.Group>
                  <Row>
                    <Col xs={6}>
                      <Form.Group className="mb-2">
                        <Form.Label style={{ color: '#ccc', fontSize: '0.85rem' }}>Min</Form.Label>
                        <Form.Control
                          type="number"
                          value={newTemplate.duration}
                          onChange={(e) => setNewTemplate({ ...newTemplate, duration: parseInt(e.target.value) || 0 })}
                          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group className="mb-2">
                        <Form.Label style={{ color: '#ccc', fontSize: '0.85rem' }}>XP</Form.Label>
                        <Form.Control
                          type="number"
                          value={newTemplate.xpEarned}
                          onChange={(e) => setNewTemplate({ ...newTemplate, xpEarned: parseInt(e.target.value) || 0 })}
                          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#ccc', fontSize: '0.85rem' }}>Tagy (čárkou)</Form.Label>
                    <Form.Control
                      value={Array.isArray(newTemplate.tags) ? newTemplate.tags.join(', ') : ''}
                      onChange={(e) => setNewTemplate({ ...newTemplate, tags: e.target.value })}
                      placeholder="learning, daily, discipline"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                    />
                  </Form.Group>
                  <Button variant="success" type="submit" className="w-100 mt-2">
                    💾 Uložit šablonu
                  </Button>
                </Form>
              </div>
            ) : selectedTemplate ? (
              <div>
                <h6 style={{ color: '#fff', marginBottom: '15px' }}>📝 {selectedTemplate.title}</h6>
                <div className="mb-3">
                  <Badge bg="info" className="me-1">{selectedTemplate.type}</Badge>
                  <Badge bg="secondary">{selectedTemplate.outcome}</Badge>
                </div>
                <p style={{ color: '#ccc', fontSize: '0.9rem' }}>{selectedTemplate.description}</p>
                {selectedTemplate.notes && (
                  <p style={{ color: '#aaa', fontSize: '0.85rem', fontStyle: 'italic' }}>
                    📝 {selectedTemplate.notes}
                  </p>
                )}
                <div className="d-flex justify-content-between mb-3">
                  <span style={{ color: '#888' }}>⏱️ {selectedTemplate.duration} min</span>
                  <span style={{ color: '#FFD700' }}>+{selectedTemplate.xpEarned} XP</span>
                </div>
                <div className="d-flex gap-1 flex-wrap mb-3">
                  {selectedTemplate.tags.map((tag, idx) => (
                    <Badge key={idx} bg="secondary">{tag}</Badge>
                  ))}
                </div>
                <Button variant="success" className="w-100" onClick={() => handleUseTemplate(selectedTemplate)}>
                  ✅ Použít šablonu
                </Button>
              </div>
            ) : (
              <div className="text-center py-5">
                <p style={{ color: '#888' }}>Klikni na šablonu pro zobrazení detailů</p>
              </div>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
