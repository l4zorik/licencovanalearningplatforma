import React, { useState, useMemo } from 'react';
import { Card, Row, Col, ProgressBar, Badge, Button, Modal, Form, ListGroup } from 'react-bootstrap';
import { FiTrendingUp, FiPlus, FiMinus } from 'react-icons/fi';

// Default technical fields with intelligence percentages
const DEFAULT_TECHNICAL_FIELDS = [
  { id: 'physics', name: 'Fyzika', percentage: 45, color: 'primary' },
  { id: 'chemistry', name: 'Chemie', percentage: 38, color: 'success' },
  { id: 'biology', name: 'Biologie', percentage: 52, color: 'info' },
  { id: 'mathematics', name: 'Matematika', percentage: 67, color: 'warning' },
  { id: 'computer_science', name: 'Informatika', percentage: 73, color: 'danger' },
  { id: 'engineering', name: 'Inženýrství', percentage: 41, color: 'secondary' },
  { id: 'data_science', name: 'Data Science', percentage: 58, color: 'dark' },
  { id: 'electronics', name: 'Elektronika', percentage: 36, color: 'primary' },
  { id: 'mechanics', name: 'Mechanika', percentage: 44, color: 'success' },
  { id: 'materials_science', name: 'Materiálové vědy', percentage: 39, color: 'info' }
];

interface TechnicalIntelligenceProps {
  userStats: {
    level: number;
    xp: number;
    completedModules: number;
    totalHours: number;
  };
  courses: any[];
}

export default function TechnicalIntelligence({ userStats, courses }: TechnicalIntelligenceProps) {
  const [selectedFields, setSelectedFields] = useState(DEFAULT_TECHNICAL_FIELDS.slice(0, 6)); // Start with first 6
  const [showSelector, setShowSelector] = useState(false);
  const [availableFields] = useState(DEFAULT_TECHNICAL_FIELDS);

  // Calculate adjusted percentages based on user progress
  const adjustedFields = useMemo(() => {
    const baseMultiplier = Math.min(userStats.xp / 1000, 1.5); // Max 1.5x multiplier
    const courseBonus = courses.length * 0.02; // 2% per course

    return selectedFields.map(field => ({
      ...field,
      adjustedPercentage: Math.min(field.percentage * (1 + baseMultiplier + courseBonus), 100)
    }));
  }, [selectedFields, userStats.xp, courses.length]);

  const addField = (fieldId: string) => {
    const field = availableFields.find(f => f.id === fieldId);
    if (field && !selectedFields.find(f => f.id === fieldId)) {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const removeField = (fieldId: string) => {
    setSelectedFields(selectedFields.filter(f => f.id !== fieldId));
  };

  const getIntelligenceLevel = (percentage: number) => {
    if (percentage >= 80) return { level: 'Expert', color: 'success' };
    if (percentage >= 65) return { level: 'Advanced', color: 'primary' };
    if (percentage >= 50) return { level: 'Intermediate', color: 'warning' };
    if (percentage >= 35) return { level: 'Basic', color: 'info' };
    return { level: 'Beginner', color: 'secondary' };
  };

  const averageIntelligence = Math.round(
    adjustedFields.reduce((sum, field) => sum + field.adjustedPercentage, 0) / adjustedFields.length
  );

  return (
    <>
      <Row className="mb-4">
        <Col>
          <Card className="glass-effect border-0" style={{ background: 'linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(33,150,243,0.1) 100%)' }}>
            <Card.Header className="bg-transparent border-bottom border-success text-dark py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <FiTrendingUp size={24} className="text-success" />
                  <h4 className="mb-0 fw-bold">Technická inteligence</h4>
                  <Badge bg="success" className="fs-6">
                    Průměr: {averageIntelligence}%
                  </Badge>
                </div>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => setShowSelector(true)}
                  className="d-flex align-items-center gap-2"
                >
                  <FiPlus size={16} />
                  Přizpůsobit
                </Button>
              </div>
            </Card.Header>

            <Card.Body className="p-4">
              <Row>
                {adjustedFields.map((field) => {
                  const intelligenceLevel = getIntelligenceLevel(field.adjustedPercentage);
                  return (
                    <Col md={6} lg={4} key={field.id} className="mb-4">
                      <div className="text-center">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="mb-0 fw-bold">{field.name}</h6>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeField(field.id)}
                            className="p-1"
                          >
                            <FiMinus size={12} />
                          </Button>
                        </div>

                        <div className="mb-2">
                          <span className="h4 fw-bold" style={{ color: `var(--bs-${field.color})` }}>
                            {Math.round(field.adjustedPercentage)}%
                          </span>
                        </div>

                        <Badge bg={intelligenceLevel.color} className="mb-2">
                          {intelligenceLevel.level}
                        </Badge>

                        <ProgressBar
                          now={field.adjustedPercentage}
                          variant={field.color}
                          className="mt-2"
                          style={{ height: '6px' }}
                        />
                      </div>
                    </Col>
                  );
                })}
              </Row>

              {adjustedFields.length === 0 && (
                <div className="text-center py-4">
                  <FiTrendingUp size={48} className="text-muted mb-3" />
                  <p className="text-muted">Žádné technické obory nevybrány. Klikněte na "Přizpůsobit" pro přidání.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Field Selector Modal */}
      <Modal show={showSelector} onHide={() => setShowSelector(false)} size="lg">
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>Přizpůsobit technické obory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="fw-bold text-success mb-3">Vybrané obory</h6>
              <ListGroup>
                {selectedFields.map(field => (
                  <ListGroup.Item key={field.id} className="d-flex justify-content-between align-items-center">
                    <span className={`text-${field.color} fw-bold`}>{field.name}</span>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeField(field.id)}
                    >
                      <FiMinus size={14} />
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            <Col md={6}>
              <h6 className="fw-bold text-primary mb-3">Dostupné obory</h6>
              <ListGroup>
                {availableFields
                  .filter(field => !selectedFields.find(f => f.id === field.id))
                  .map(field => (
                    <ListGroup.Item key={field.id} className="d-flex justify-content-between align-items-center">
                      <span className={`text-${field.color} fw-bold`}>{field.name}</span>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => addField(field.id)}
                      >
                        <FiPlus size={14} />
                      </Button>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSelector(false)}>
            Zavřít
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}