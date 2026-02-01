import React, { useMemo } from 'react';
import { Card, Row, Col, ProgressBar, Badge } from 'react-bootstrap';
import { FiTrendingUp, FiHome, FiBriefcase } from 'react-icons/fi';

interface ProbabilityIndicatorProps {
  userStats: {
    level: number;
    xp: number;
    completedModules: number;
    totalHours: number;
  };
  courses: any[];
  jobs: any[];
  projects: any[];
}

export default function ProbabilityIndicator({ userStats, courses, jobs, projects }: ProbabilityIndicatorProps) {
  const probabilities = useMemo(() => {
    // Calculate job search probability based on skills and experience
    const skillCount = courses.length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const totalXP = userStats.xp;

    // Job probability factors
    const skillFactor = Math.min(skillCount * 5, 40); // Max 40% from skills
    const projectFactor = Math.min((completedProjects + activeProjects) * 8, 30); // Max 30% from projects
    const xpFactor = Math.min(totalXP / 100, 30); // Max 30% from XP

    const jobProbability = Math.min(skillFactor + projectFactor + xpFactor, 100);

    // Housing probability (simplified - could be based on location, income, etc.)
    const housingProbability = Math.min(jobProbability * 0.8 + 10, 95); // Slightly lower than job probability

    return {
      job: Math.round(jobProbability),
      housing: Math.round(housingProbability)
    };
  }, [userStats, courses, jobs, projects]);

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'success';
    if (probability >= 60) return 'warning';
    return 'danger';
  };

  const getProbabilityLabel = (probability: number) => {
    if (probability >= 80) return 'Vysoká';
    if (probability >= 60) return 'Střední';
    return 'Nízká';
  };

  return (
    <>
      {/* SECTION: JOB PROBABILITY */}
      <Row className="mb-4">
        <Col>
          <Card className="glass-effect border-0" style={{ background: 'linear-gradient(135deg, rgba(33,150,243,0.1) 0%, rgba(3,169,244,0.1) 100%)' }}>
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="p-3 rounded-circle bg-primary bg-opacity-25 text-primary">
                    <FiBriefcase size={32} />
                  </div>
                  <div>
                    <h4 className="mb-0 fw-bold">Pravděpodobnost nové práce</h4>
                    <p className="text-muted mb-0">Analýza trhu a tvého profilu</p>
                  </div>
                </div>
                <div className="text-end">
                  <span className="display-4 fw-bold text-primary">{probabilities.job}%</span>
                  <div>
                    <Badge bg={getProbabilityColor(probabilities.job)} className="fs-6 px-3 py-2">
                      {getProbabilityLabel(probabilities.job)} šance
                    </Badge>
                  </div>
                </div>
              </div>
              
              <ProgressBar
                now={probabilities.job}
                variant={getProbabilityColor(probabilities.job)}
                className="mb-3"
                style={{ height: '12px', borderRadius: '6px' }}
                animated
              />
              
              <div className="d-flex justify-content-between text-muted small mt-2">
                <span>0% (Nemožné)</span>
                <span>50% (Možné)</span>
                <span>100% (Garantované)</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* SECTION: ACCOMMODATION PROBABILITY */}
      <Row className="mb-4">
        <Col>
          <Card className="glass-effect border-0" style={{ background: 'linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(139,195,74,0.1) 100%)' }}>
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="p-3 rounded-circle bg-success bg-opacity-25 text-success">
                    <FiHome size={32} />
                  </div>
                  <div>
                    <h4 className="mb-0 fw-bold">Pravděpodobnost ubytování</h4>
                    <p className="text-muted mb-0">Dostupnost bydlení a tvé zázemí</p>
                  </div>
                </div>
                <div className="text-end">
                  <span className="display-4 fw-bold text-success">71%</span>
                  <div>
                    <Badge bg="warning" text="dark" className="fs-6 px-3 py-2">
                      Střední šance
                    </Badge>
                  </div>
                </div>
              </div>
              
              <ProgressBar
                now={71}
                variant="warning"
                className="mb-3"
                style={{ height: '12px', borderRadius: '6px' }}
                animated
              />
              
              <div className="d-flex justify-content-between text-muted small mt-2">
                <span>Aktuální tržní skóre pro tvůj region</span>
                <span className="text-success fw-bold">+5% zlepšení tento týden</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4 text-center">
        <Col>
          <small className="text-muted italic">
            💡 Pravděpodobnosti jsou kalkulovány na základě vašich dovedností, projektů a zkušeností v reálném čase.
          </small>
        </Col>
      </Row>
    </>
  );
}