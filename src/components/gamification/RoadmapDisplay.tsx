'use client';

import { Card, Badge, ProgressBar, Row, Col, Accordion, Button } from 'react-bootstrap';
import { ROADMAP_PHASES, CAREER_PATHS, RoadmapPhase, getPathColor } from '@/lib/gamification/roadmap';

interface RoadmapDisplayProps {
  currentLevel: number;
  selectedPath?: string;
}

export function RoadmapDisplay({ currentLevel, selectedPath }: RoadmapDisplayProps) {
  const activePhases = ROADMAP_PHASES.filter(phase => currentLevel >= phase.minLevel - 2);
  const currentPhase = ROADMAP_PHASES.find(p => currentLevel >= p.minLevel && currentLevel < (ROADMAP_PHASES[ROADMAP_PHASES.indexOf(p) + 1]?.minLevel || Infinity));
  const nextPhase = ROADMAP_PHASES.find(p => p.minLevel > currentLevel);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-0 text-white">
            🗺️ Tvá roadmap
          </h4>
          <small className="text-muted">Current Phase: {currentPhase?.title || 'Unknown'}</small>
        </div>
      </div>

      {currentPhase && (
        <Card className="mb-4" style={{ background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)', border: '2px solid #ffc107' }}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <Badge bg="warning" className="text-dark mb-2">AKTIVNÍ FÁZE</Badge>
                <h3 className="text-white mb-1">{currentPhase.title}</h3>
                <p className="text-white-50 mb-0">{currentPhase.description}</p>
              </div>
              <div className="text-end">
                <div style={{ fontSize: '2rem' }}>{currentPhase.rewards.badge}</div>
                <small className="text-warning">+{currentPhase.rewards.xp} XP</small>
              </div>
            </div>

            <Row className="mb-3">
              <Col md={6}>
                <small className="text-white-50 d-block mb-2">🎯 Cíle této fáze:</small>
                <ul className="mb-0 ps-3">
                  {currentPhase.goals.map((goal, i) => (
                    <li key={i} className="text-white-50 small">{goal}</li>
                  ))}
                </ul>
              </Col>
              <Col md={6}>
                <small className="text-white-50 d-block mb-2">🛠️ Klíčové dovednosti:</small>
                <div className="d-flex flex-wrap gap-1">
                  {currentPhase.skills.map(skill => (
                    <Badge key={skill} bg="primary" style={{ fontSize: '0.7rem' }}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Col>
            </Row>

            <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary">
              <small className="text-white-50">
                ⏱️ Doporučená doba: <span className="text-white">{currentPhase.duration}</span>
              </small>
              <small className="text-white-50">
                Minimální level: <span className="text-warning">{currentPhase.minLevel}</span>
              </small>
            </div>
          </Card.Body>
        </Card>
      )}

      <h5 className="text-white mb-3">📚 Všechny fáze</h5>
      <div className="roadmap-timeline">
        {ROADMAP_PHASES.map((phase, index) => {
          const isUnlocked = currentLevel >= phase.minLevel - 2;
          const isCurrent = currentPhase?.id === phase.id;
          const isCompleted = currentLevel >= phase.minLevel;

          return (
            <div
              key={phase.id}
              className={`roadmap-phase ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`}
              style={{
                paddingLeft: '30px',
                position: 'relative',
                marginBottom: '20px'
              }}
            >
              <div
                className="phase-marker"
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: isCompleted
                    ? 'linear-gradient(145deg, #4caf50, #45a049)'
                    : isUnlocked
                    ? 'linear-gradient(145deg, #ffc107, #ff9800)'
                    : 'linear-gradient(145deg, #424242, #616161)',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  color: 'white',
                  zIndex: 1
                }}
              >
                {isCompleted ? '✓' : index + 1}
              </div>

              {index < ROADMAP_PHASES.length - 1 && (
                <div
                  className="phase-connector"
                  style={{
                    position: 'absolute',
                    left: '11px',
                    top: '24px',
                    bottom: '-20px',
                    width: '2px',
                    background: isCompleted ? '#4caf50' : '#424242'
                  }}
                />
              )}

              <Card
                style={{
                  background: isCurrent
                    ? `linear-gradient(145deg, ${getPathColor('fullstack')}20, ${getPathColor('fullstack')}10)`
                    : 'rgba(33, 37, 41, 0.5)',
                  border: isCurrent ? `1px solid ${getPathColor('fullstack')}` : '1px solid #424242',
                  opacity: isUnlocked ? 1 : 0.6
                }}
              >
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="mb-1 text-white">
                        {phase.rewards.badge} {phase.title}
                        {isCurrent && <Badge bg="warning" className="ms-2 text-dark">AKTUÁLNÍ</Badge>}
                      </h6>
                      <small className="text-white-50">{phase.description}</small>
                    </div>
                    <Badge bg={isUnlocked ? 'success' : 'secondary'}>
                      Level {phase.minLevel}+
                    </Badge>
                  </div>

                  {isUnlocked && (
                    <>
                      <div className="d-flex flex-wrap gap-1 mb-2">
                        {phase.skills.slice(0, 5).map(skill => (
                          <Badge key={skill} bg="dark" style={{ fontSize: '0.65rem' }}>
                            {skill}
                          </Badge>
                        ))}
                        {phase.skills.length > 5 && (
                          <Badge bg="dark" style={{ fontSize: '0.65rem' }}>
                            +{phase.skills.length - 5}
                          </Badge>
                        )}
                      </div>

                      <small className="text-white-50 d-block">
                        📚 {phase.courses.length} kurzů | 🎯 {phase.missions.length} misí
                      </small>
                    </>
                  )}
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface CareerPathsProps {
  selectedPath?: string;
  onSelectPath?: (pathId: string) => void;
}

export function CareerPaths({ selectedPath, onSelectPath }: CareerPathsProps) {
  return (
    <div>
      <h4 className="text-white mb-4">💼 Kariérní cesty</h4>
      <Row xs={1} md={2} lg={4} className="g-3">
        {CAREER_PATHS.map(path => (
          <Col key={path.id}>
            <Card
              className={`career-path-card h-100 ${selectedPath === path.id ? 'selected' : ''}`}
              onClick={() => onSelectPath?.(path.id)}
              style={{
                background: selectedPath === path.id
                  ? `linear-gradient(145deg, ${getPathColor(path.id)}30, ${getPathColor(path.id)}15)`
                  : 'rgba(33, 37, 41, 0.5)',
                border: selectedPath === path.id
                  ? `2px solid ${getPathColor(path.id)}`
                  : '1px solid #424242',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <Card.Body className="text-center">
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                  {path.icon}
                </div>
                <h6 className="text-white mb-1">{path.title}</h6>
                <p className="text-white-50 small mb-2">{path.description}</p>
                
                <div className="d-flex flex-wrap justify-content-center gap-1 mb-2">
                  {path.skills.slice(0, 3).map(skill => (
                    <Badge key={skill} bg="dark" style={{ fontSize: '0.6rem' }}>
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2 border-top border-secondary">
                  <small className="text-white-50">
                    {path.salary.min} - {path.salary.max} Kč
                  </small>
                  <Badge bg={path.demand === 'velmi vysoká' ? 'danger' : path.demand === 'vysoká' ? 'warning' : 'success'} style={{ fontSize: '0.6rem' }}>
                    {path.demand}
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <style jsx>{`
        .career-path-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .career-path-card.selected {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
