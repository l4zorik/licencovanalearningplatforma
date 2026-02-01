import React from 'react';
import { Card, ProgressBar, Row, Col, Badge } from 'react-bootstrap';

interface LifeStatusWidgetProps {
  hunger?: number; // 0-100
  physicalStrength?: number; // 0-100
  readiness?: number; // 0-100
  intellectualStrength?: number; // 0-100
  addiction?: number; // 0-100
}

const LifeStatusWidget: React.FC<LifeStatusWidgetProps> = ({ 
  hunger = 25, 
  physicalStrength = 70,
  readiness = 65,
  intellectualStrength = 80,
  addiction = 10 
}) => {
  return (
    <Row className="mb-4">
      <Col>
        <Card 
          className="border-0 shadow-sm glass-effect" 
          style={{ 
            background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.4) 0%, rgba(40, 40, 60, 0.4) 100%)', 
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Card.Body className="py-3 px-4">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <Badge bg="dark" className="border border-secondary text-white-50 px-3 py-2">
                  <span className="me-2">📉</span> VÝDAJOVÉ OKNO
                </Badge>
              </div>
              
              <div className="d-flex align-items-center gap-4 flex-wrap justify-content-center">
                {/* Hlad / Hunger */}
                <div className="d-flex align-items-center gap-2">
                  <div style={{ fontSize: '1.5rem' }}>🍔</div>
                  <div style={{ minWidth: '120px' }}>
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-white fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>HLAD</small>
                      <small className="text-white-50" style={{ fontSize: '0.7rem' }}>{hunger}%</small>
                    </div>
                    <ProgressBar 
                      now={hunger} 
                      variant={hunger > 70 ? "danger" : hunger > 40 ? "warning" : "success"} 
                      style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }} 
                      animated={hunger > 70}
                    />
                  </div>
                </div>

                {/* Fyzická síla / Physical Strength */}
                <div className="d-flex align-items-center gap-2">
                  <div style={{ fontSize: '1.5rem' }}>💪</div>
                  <div style={{ minWidth: '120px' }}>
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-white fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>FYZICKÁ SÍLA</small>
                      <small className="text-white-50" style={{ fontSize: '0.7rem' }}>{physicalStrength}%</small>
                    </div>
                    <ProgressBar 
                      now={physicalStrength} 
                      variant="danger"
                      style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }} 
                    />
                  </div>
                </div>

                {/* Nástroje / Připravenost (Tools / Readiness) */}
                <div className="d-flex align-items-center gap-2">
                  <div style={{ fontSize: '1.5rem' }}>🛠️</div>
                  <div style={{ minWidth: '120px' }}>
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-white fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>PŘIPRAVENOST</small>
                      <small className="text-white-50" style={{ fontSize: '0.7rem' }}>{readiness}%</small>
                    </div>
                    <ProgressBar 
                      now={readiness} 
                      variant="primary"
                      style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }} 
                    />
                  </div>
                </div>

                {/* Inteligenční síla / Intellectual Strength */}
                <div className="d-flex align-items-center gap-2">
                  <div style={{ fontSize: '1.5rem' }}>🧠</div>
                  <div style={{ minWidth: '120px' }}>
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-white fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>INTELIGENCE</small>
                      <small className="text-white-50" style={{ fontSize: '0.7rem' }}>{intellectualStrength}%</small>
                    </div>
                    <ProgressBar 
                      now={intellectualStrength} 
                      variant="info"
                      style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }} 
                    />
                  </div>
                </div>

                {/* Závislost / Addiction */}
                <div className="d-flex align-items-center gap-2">
                  <div style={{ fontSize: '1.5rem' }}>💊</div>
                  <div style={{ minWidth: '120px' }}>
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-white fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>ZÁVISLOST</small>
                      <small className="text-white-50" style={{ fontSize: '0.7rem' }}>{addiction}%</small>
                    </div>
                    <ProgressBar 
                      now={addiction} 
                      variant={addiction > 50 ? "danger" : "secondary"} 
                      style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }} 
                      animated={addiction > 50}
                    />
                  </div>
                </div>
              </div>

              <div className="d-none d-xl-block">
                <small className="text-white-50 italic">Status</small>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LifeStatusWidget;
