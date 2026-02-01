'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, ProgressBar, OverlayTrigger, Tooltip, Modal, Form, Button, Dropdown } from 'react-bootstrap';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiPieChart, FiArrowUp, FiArrowDown, FiPlus, FiEdit2, FiTrash2, FiBookOpen, FiLayers, FiTarget, FiAward, FiCpu, FiCode, FiDatabase, FiGlobe, FiServer, FiSmartphone } from 'react-icons/fi';

// ============================================================================
// TYPES
// ============================================================================

interface FinancialEntry {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  isRecurring: boolean;
  frequency?: 'monthly' | 'yearly' | 'one-time';
  icon?: string;
}

interface FinancialTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  entries: Omit<FinancialEntry, 'id'>[];
}

interface FinancialOverviewProps {
  className?: string;
}

// ============================================================================
// TEMPLATES - Šablony pro různé typy sledování
// ============================================================================

const FINANCIAL_TEMPLATES: FinancialTemplate[] = [
  {
    id: 'learning-investment',
    name: 'Investice do vzdělávání',
    description: 'Sledování nákladů na kurzy, certifikace a vzdělávací materiály',
    icon: '📚',
    color: 'primary',
    entries: [
      { name: 'Online kurzy (Udemy, Coursera)', amount: 2000, type: 'expense', category: 'Kurzy', isRecurring: true, frequency: 'monthly' },
      { name: 'Předplatné (LinkedIn Learning)', amount: 500, type: 'expense', category: 'Předplatné', isRecurring: true, frequency: 'monthly' },
      { name: 'Knihy a e-knihy', amount: 800, type: 'expense', category: 'Knihy', isRecurring: true, frequency: 'monthly' },
      { name: 'Certifikace (AWS, Google)', amount: 5000, type: 'expense', category: 'Certifikace', isRecurring: false, frequency: 'one-time' },
      { name: 'Konference a workshopy', amount: 3000, type: 'expense', category: 'Konference', isRecurring: false, frequency: 'yearly' },
    ]
  },
  {
    id: 'developer-tools',
    name: 'Developer nástroje',
    description: 'Software, nástroje a služby pro vývoj',
    icon: '💻',
    color: 'info',
    entries: [
      { name: 'GitHub Pro/Copilot', amount: 400, type: 'expense', category: 'Nástroje', isRecurring: true, frequency: 'monthly' },
      { name: 'JetBrains IDE', amount: 500, type: 'expense', category: 'Software', isRecurring: true, frequency: 'monthly' },
      { name: 'Cloud služby (AWS/Vercel)', amount: 1000, type: 'expense', category: 'Cloud', isRecurring: true, frequency: 'monthly' },
      { name: 'Domény a hosting', amount: 300, type: 'expense', category: 'Hosting', isRecurring: true, frequency: 'monthly' },
      { name: 'Design nástroje (Figma)', amount: 400, type: 'expense', category: 'Design', isRecurring: true, frequency: 'monthly' },
    ]
  },
  {
    id: 'freelance-income',
    name: 'Freelance příjmy',
    description: 'Sledování příjmů z freelance práce a projektů',
    icon: '💰',
    color: 'success',
    entries: [
      { name: 'Webové projekty', amount: 25000, type: 'income', category: 'Projekty', isRecurring: true, frequency: 'monthly' },
      { name: 'Konzultace', amount: 10000, type: 'income', category: 'Konzultace', isRecurring: true, frequency: 'monthly' },
      { name: 'Údržba webů', amount: 5000, type: 'income', category: 'Údržba', isRecurring: true, frequency: 'monthly' },
      { name: 'Výuka a mentoring', amount: 8000, type: 'income', category: 'Výuka', isRecurring: true, frequency: 'monthly' },
    ]
  },
  {
    id: 'side-projects',
    name: 'Vedlejší projekty',
    description: 'Náklady a příjmy z vlastních projektů a SaaS',
    icon: '🚀',
    color: 'warning',
    entries: [
      { name: 'SaaS předplatné příjmy', amount: 15000, type: 'income', category: 'SaaS', isRecurring: true, frequency: 'monthly' },
      { name: 'Affiliate příjmy', amount: 3000, type: 'income', category: 'Affiliate', isRecurring: true, frequency: 'monthly' },
      { name: 'Server náklady', amount: 2000, type: 'expense', category: 'Infrastruktura', isRecurring: true, frequency: 'monthly' },
      { name: 'Marketing', amount: 1500, type: 'expense', category: 'Marketing', isRecurring: true, frequency: 'monthly' },
    ]
  },
  {
    id: 'career-growth',
    name: 'Kariérní růst',
    description: 'Investice do kariérního rozvoje a networking',
    icon: '📈',
    color: 'purple',
    entries: [
      { name: 'Profesní členství', amount: 500, type: 'expense', category: 'Členství', isRecurring: true, frequency: 'monthly' },
      { name: 'Networking eventy', amount: 1000, type: 'expense', category: 'Networking', isRecurring: true, frequency: 'monthly' },
      { name: 'Portfolio hosting', amount: 200, type: 'expense', category: 'Portfolio', isRecurring: true, frequency: 'monthly' },
      { name: 'CV/LinkedIn Premium', amount: 300, type: 'expense', category: 'Kariéra', isRecurring: true, frequency: 'monthly' },
    ]
  },
  {
    id: 'hardware',
    name: 'Hardware & Vybavení',
    description: 'Počítače, monitory a kancelářské vybavení',
    icon: '🖥️',
    color: 'secondary',
    entries: [
      { name: 'Nový notebook (roční odpis)', amount: 2500, type: 'expense', category: 'Hardware', isRecurring: true, frequency: 'monthly' },
      { name: 'Monitor', amount: 500, type: 'expense', category: 'Hardware', isRecurring: true, frequency: 'monthly' },
      { name: 'Klávesnice a myš', amount: 200, type: 'expense', category: 'Příslušenství', isRecurring: false, frequency: 'yearly' },
      { name: 'Kancelářská židle', amount: 400, type: 'expense', category: 'Nábytek', isRecurring: false, frequency: 'yearly' },
    ]
  },
];

const DEFAULT_ENTRIES: FinancialEntry[] = [
  { id: '1', name: 'Hlavní zaměstnání', amount: 45000, type: 'income', category: 'Zaměstnání', isRecurring: true, frequency: 'monthly' },
  { id: '2', name: 'Freelance projekty', amount: 15000, type: 'income', category: 'Freelance', isRecurring: true, frequency: 'monthly' },
  { id: '3', name: 'Online kurzy', amount: 2000, type: 'expense', category: 'Vzdělávání', isRecurring: true, frequency: 'monthly' },
  { id: '4', name: 'Nástroje a software', amount: 1500, type: 'expense', category: 'Nástroje', isRecurring: true, frequency: 'monthly' },
];

const INCOME_CATEGORIES = ['Zaměstnání', 'Freelance', 'Projekty', 'SaaS', 'Konzultace', 'Výuka', 'Affiliate', 'Investice', 'Ostatní'];
const EXPENSE_CATEGORIES = ['Vzdělávání', 'Kurzy', 'Knihy', 'Certifikace', 'Nástroje', 'Software', 'Cloud', 'Hardware', 'Hosting', 'Marketing', 'Konference', 'Networking', 'Ostatní'];

// ============================================================================
// COMPONENT
// ============================================================================

const FinancialOverview: React.FC<FinancialOverviewProps> = ({ className = '' }) => {
  const [entries, setEntries] = useState<FinancialEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<FinancialEntry | null>(null);
  const [activeTemplates, setActiveTemplates] = useState<string[]>([]);
  const [newEntry, setNewEntry] = useState<Partial<FinancialEntry>>({
    type: 'income',
    isRecurring: true,
    frequency: 'monthly',
    amount: 0,
    name: '',
    category: 'Zaměstnání'
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('financialEntries');
    const savedTemplates = localStorage.getItem('activeFinancialTemplates');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch {
        setEntries(DEFAULT_ENTRIES);
      }
    } else {
      setEntries(DEFAULT_ENTRIES);
    }
    if (savedTemplates) {
      try {
        setActiveTemplates(JSON.parse(savedTemplates));
      } catch {
        setActiveTemplates([]);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('financialEntries', JSON.stringify(entries));
    }
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('activeFinancialTemplates', JSON.stringify(activeTemplates));
  }, [activeTemplates]);

  const incomeEntries = entries.filter(e => e.type === 'income');
  const expenseEntries = entries.filter(e => e.type === 'expense');

  const totalIncome = incomeEntries.reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenseEntries.reduce((sum, e) => sum + e.amount, 0);
  const netBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((netBalance / totalIncome) * 100).toFixed(1) : '0';

  // ROI učení - kolik vyděláváš vs kolik investuješ do vzdělání
  const learningExpenses = expenseEntries.filter(e =>
    ['Vzdělávání', 'Kurzy', 'Knihy', 'Certifikace', 'Konference'].includes(e.category)
  ).reduce((sum, e) => sum + e.amount, 0);
  const learningROI = learningExpenses > 0 ? ((totalIncome / learningExpenses)).toFixed(1) : '∞';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(amount);
  };

  const handleSaveEntry = () => {
    if (!newEntry.name || !newEntry.amount) return;

    if (editingEntry) {
      setEntries(prev => prev.map(e => e.id === editingEntry.id ? { ...e, ...newEntry } as FinancialEntry : e));
    } else {
      const entry: FinancialEntry = {
        id: Date.now().toString(),
        name: newEntry.name!,
        amount: newEntry.amount!,
        type: newEntry.type as 'income' | 'expense',
        category: newEntry.category!,
        isRecurring: newEntry.isRecurring!,
        frequency: newEntry.frequency as 'monthly' | 'yearly' | 'one-time'
      };
      setEntries(prev => [...prev, entry]);
    }

    setShowModal(false);
    setEditingEntry(null);
    setNewEntry({ type: 'income', isRecurring: true, frequency: 'monthly', amount: 0, name: '', category: 'Zaměstnání' });
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const openEditModal = (entry: FinancialEntry) => {
    setEditingEntry(entry);
    setNewEntry(entry);
    setShowModal(true);
  };

  const applyTemplate = (template: FinancialTemplate) => {
    const newEntries = template.entries.map((e, idx) => ({
      ...e,
      id: `${template.id}-${Date.now()}-${idx}`
    }));
    setEntries(prev => [...prev, ...newEntries]);
    setActiveTemplates(prev => [...prev, template.id]);
    setShowTemplateModal(false);
  };

  const removeTemplate = (templateId: string) => {
    setEntries(prev => prev.filter(e => !e.id.startsWith(templateId)));
    setActiveTemplates(prev => prev.filter(t => t !== templateId));
  };

  return (
    <>
      <Row className={`mb-4 ${className}`}>
        <Col>
          <Card
            className="border-0 shadow-sm glass-effect"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.2) 50%, rgba(20, 20, 30, 0.4) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}
          >
            <Card.Body className="py-3 px-4">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                {/* Header */}
                <div className="d-flex align-items-center gap-3">
                  <Badge
                    bg="dark"
                    className="border border-success text-white px-3 py-2"
                    style={{ borderColor: 'rgba(16, 185, 129, 0.5) !important' }}
                  >
                    <span className="me-2">💰</span> FINANČNÍ PŘEHLED UČENÍ
                  </Badge>

                  {/* Add buttons */}
                  <div className="d-flex gap-2">
                    <OverlayTrigger placement="top" overlay={<Tooltip>Přidat položku</Tooltip>}>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => setShowModal(true)}
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px', padding: 0 }}
                      >
                        <FiPlus size={16} />
                      </Button>
                    </OverlayTrigger>

                    <OverlayTrigger placement="top" overlay={<Tooltip>Šablony</Tooltip>}>
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => setShowTemplateModal(true)}
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px', padding: 0 }}
                      >
                        <FiLayers size={16} />
                      </Button>
                    </OverlayTrigger>
                  </div>
                </div>

                {/* Stats */}
                <div className="d-flex align-items-center gap-4 flex-wrap justify-content-center">
                  {/* Příjmy */}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip>
                        <div className="text-start p-1">
                          <strong className="text-success">Příjmy:</strong>
                          {incomeEntries.map(e => (
                            <div key={e.id} className="d-flex justify-content-between gap-3" style={{ fontSize: '0.75rem' }}>
                              <span>{e.name}</span>
                              <span>{formatCurrency(e.amount)}</span>
                            </div>
                          ))}
                        </div>
                      </Tooltip>
                    }
                  >
                    <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                      <div style={{ fontSize: '1.5rem' }}>📈</div>
                      <div style={{ minWidth: '130px' }}>
                        <div className="d-flex justify-content-between mb-1">
                          <small className="text-white fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>PŘÍJMY</small>
                          <small className="text-success fw-bold" style={{ fontSize: '0.7rem' }}>{formatCurrency(totalIncome)}</small>
                        </div>
                        <ProgressBar
                          now={100}
                          variant="success"
                          style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }}
                        />
                      </div>
                    </div>
                  </OverlayTrigger>

                  {/* Výdaje */}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip>
                        <div className="text-start p-1">
                          <strong className="text-danger">Výdaje:</strong>
                          {expenseEntries.map(e => (
                            <div key={e.id} className="d-flex justify-content-between gap-3" style={{ fontSize: '0.75rem' }}>
                              <span>{e.name}</span>
                              <span>{formatCurrency(e.amount)}</span>
                            </div>
                          ))}
                        </div>
                      </Tooltip>
                    }
                  >
                    <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                      <div style={{ fontSize: '1.5rem' }}>📉</div>
                      <div style={{ minWidth: '130px' }}>
                        <div className="d-flex justify-content-between mb-1">
                          <small className="text-white fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>VÝDAJE</small>
                          <small className="text-danger fw-bold" style={{ fontSize: '0.7rem' }}>{formatCurrency(totalExpenses)}</small>
                        </div>
                        <ProgressBar
                          now={totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0}
                          variant="danger"
                          style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }}
                        />
                      </div>
                    </div>
                  </OverlayTrigger>

                  {/* Bilance */}
                  <div className="d-flex align-items-center gap-2">
                    <div style={{ fontSize: '1.5rem' }}>💵</div>
                    <div style={{ minWidth: '130px' }}>
                      <div className="d-flex justify-content-between mb-1">
                        <small className="text-white fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>BILANCE</small>
                        <small className={`fw-bold ${netBalance >= 0 ? 'text-success' : 'text-danger'}`} style={{ fontSize: '0.7rem' }}>
                          {netBalance >= 0 ? '+' : ''}{formatCurrency(netBalance)}
                        </small>
                      </div>
                      <ProgressBar
                        now={Math.min(100, Math.abs(netBalance) / Math.max(totalIncome, 1) * 100)}
                        variant={netBalance >= 0 ? 'success' : 'danger'}
                        style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }}
                      />
                    </div>
                  </div>

                  {/* Míra úspor */}
                  <div className="d-flex align-items-center gap-2">
                    <div style={{ fontSize: '1.5rem' }}>🎯</div>
                    <div style={{ minWidth: '100px' }}>
                      <div className="d-flex justify-content-between mb-1">
                        <small className="text-white fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>ÚSPORY</small>
                        <small className="text-warning fw-bold" style={{ fontSize: '0.7rem' }}>{savingsRate}%</small>
                      </div>
                      <ProgressBar
                        now={parseFloat(savingsRate)}
                        variant="warning"
                        style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }}
                      />
                    </div>
                  </div>

                  {/* ROI Učení */}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip>
                        ROI vzdělávání: Za každou 1 Kč investovanou do vzdělání vyděláš {learningROI} Kč
                      </Tooltip>
                    }
                  >
                    <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                      <div style={{ fontSize: '1.5rem' }}>📚</div>
                      <div style={{ minWidth: '100px' }}>
                        <div className="d-flex justify-content-between mb-1">
                          <small className="text-white fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>ROI UČENÍ</small>
                          <small className="text-info fw-bold" style={{ fontSize: '0.7rem' }}>{learningROI}x</small>
                        </div>
                        <ProgressBar
                          now={Math.min(100, parseFloat(learningROI) * 10)}
                          variant="info"
                          style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }}
                        />
                      </div>
                    </div>
                  </OverlayTrigger>
                </div>

                {/* Active templates badges */}
                <div className="d-none d-xl-flex align-items-center gap-2">
                  {activeTemplates.length > 0 && (
                    <>
                      {activeTemplates.slice(0, 2).map(tId => {
                        const t = FINANCIAL_TEMPLATES.find(ft => ft.id === tId);
                        return t ? (
                          <Badge
                            key={tId}
                            bg="dark"
                            className="border border-secondary"
                            style={{ fontSize: '0.65rem', cursor: 'pointer' }}
                            onClick={() => removeTemplate(tId)}
                            title="Klikni pro odebrání"
                          >
                            {t.icon} {t.name.split(' ')[0]}
                          </Badge>
                        ) : null;
                      })}
                      {activeTemplates.length > 2 && (
                        <Badge bg="secondary" style={{ fontSize: '0.65rem' }}>
                          +{activeTemplates.length - 2}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Entry Modal */}
      <Modal show={showModal} onHide={() => { setShowModal(false); setEditingEntry(null); }} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">
            {editingEntry ? 'Upravit položku' : 'Přidat položku'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Typ</Form.Label>
              <div className="d-flex gap-2">
                <Button
                  variant={newEntry.type === 'income' ? 'success' : 'outline-success'}
                  onClick={() => setNewEntry(prev => ({ ...prev, type: 'income', category: 'Zaměstnání' }))}
                  className="flex-grow-1"
                >
                  <FiTrendingUp className="me-2" /> Příjem
                </Button>
                <Button
                  variant={newEntry.type === 'expense' ? 'danger' : 'outline-danger'}
                  onClick={() => setNewEntry(prev => ({ ...prev, type: 'expense', category: 'Vzdělávání' }))}
                  className="flex-grow-1"
                >
                  <FiTrendingDown className="me-2" /> Výdaj
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Název</Form.Label>
              <Form.Control
                type="text"
                placeholder="např. Online kurzy"
                value={newEntry.name || ''}
                onChange={(e) => setNewEntry(prev => ({ ...prev, name: e.target.value }))}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Částka (Kč/měsíc)</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                value={newEntry.amount || ''}
                onChange={(e) => setNewEntry(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Kategorie</Form.Label>
              <Form.Select
                value={newEntry.category || ''}
                onChange={(e) => setNewEntry(prev => ({ ...prev, category: e.target.value }))}
                className="bg-dark text-white border-secondary"
              >
                {(newEntry.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Frekvence</Form.Label>
              <Form.Select
                value={newEntry.frequency || 'monthly'}
                onChange={(e) => setNewEntry(prev => ({ ...prev, frequency: e.target.value as any }))}
                className="bg-dark text-white border-secondary"
              >
                <option value="monthly">Měsíčně</option>
                <option value="yearly">Ročně</option>
                <option value="one-time">Jednorázově</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          {editingEntry && (
            <Button variant="outline-danger" onClick={() => { handleDeleteEntry(editingEntry.id); setShowModal(false); setEditingEntry(null); }}>
              <FiTrash2 className="me-1" /> Smazat
            </Button>
          )}
          <Button variant="secondary" onClick={() => { setShowModal(false); setEditingEntry(null); }}>
            Zrušit
          </Button>
          <Button variant="primary" onClick={handleSaveEntry}>
            {editingEntry ? 'Uložit změny' : 'Přidat'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Templates Modal */}
      <Modal show={showTemplateModal} onHide={() => setShowTemplateModal(false)} centered size="lg">
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">
            <FiLayers className="me-2" /> Šablony finančního sledování
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <p className="text-white-50 mb-4">
            Vyber šablonu pro rychlé přidání položek souvisejících s učením a kariérním rozvojem.
          </p>
          <Row>
            {FINANCIAL_TEMPLATES.map(template => {
              const isActive = activeTemplates.includes(template.id);
              const templateIncome = template.entries.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0);
              const templateExpense = template.entries.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0);

              return (
                <Col md={6} key={template.id} className="mb-3">
                  <Card
                    className={`h-100 border-${template.color} bg-dark`}
                    style={{
                      cursor: 'pointer',
                      opacity: isActive ? 0.6 : 1,
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => !isActive && applyTemplate(template)}
                  >
                    <Card.Body>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span style={{ fontSize: '1.5rem' }}>{template.icon}</span>
                        <div>
                          <h6 className="text-white mb-0">{template.name}</h6>
                          <small className="text-white-50">{template.description}</small>
                        </div>
                      </div>
                      <div className="d-flex gap-3 mt-3">
                        {templateIncome > 0 && (
                          <Badge bg="success" className="px-2 py-1">
                            +{formatCurrency(templateIncome)}
                          </Badge>
                        )}
                        {templateExpense > 0 && (
                          <Badge bg="danger" className="px-2 py-1">
                            -{formatCurrency(templateExpense)}
                          </Badge>
                        )}
                        <Badge bg="secondary" className="px-2 py-1">
                          {template.entries.length} položek
                        </Badge>
                      </div>
                      {isActive && (
                        <div className="mt-2">
                          <Badge bg="info">Aktivní</Badge>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => setShowTemplateModal(false)}>
            Zavřít
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FinancialOverview;
