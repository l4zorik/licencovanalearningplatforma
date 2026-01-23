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
    <Row className="mb-4">
      <Col>
        <Card className="glass-effect border-0" style={{ background: 'linear-gradient(135deg, rgba(33,150,243,0.1) 0%, rgba(156,39,176,0.1) 100%)' }}>
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col md={6} className="text-center mb-3 mb-md-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <FiBriefcase size={24} className="me-2 text-primary" />
                  <h5 className="mb-0">Pravděpodobnost nové práce</h5>
                </div>
                <div className="mb-2">
                  <span className="display-4 fw-bold text-primary">{probabilities.job}%</span>
                </div>
                <Badge bg={getProbabilityColor(probabilities.job)} className="fs-6">
                  {getProbabilityLabel(probabilities.job)} šance
                </Badge>
                <ProgressBar
                  now={probabilities.job}
                  variant={getProbabilityColor(probabilities.job)}
                  className="mt-3"
                  style={{ height: '8px' }}
                />
              </Col>

              <Col md={6} className="text-center">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <FiHome size={24} className="me-2 text-success" />
                  <h5 className="mb-0">Pravděpodobnost ubytování</h5>
                </div>
                <div className="mb-2">
                  <span className="display-4 fw-bold text-success">{probabilities.housing}%</span>
                </div>
                <Badge bg={getProbabilityColor(probabilities.housing)} className="fs-6">
                  {getProbabilityLabel(probabilities.housing)} šance
                </Badge>
                <ProgressBar
                  now={probabilities.housing}
                  variant={getProbabilityColor(probabilities.housing)}
                  className="mt-3"
                  style={{ height: '8px' }}
                />
              </Col>
            </Row>

            <hr className="my-4" />

            <Row className="text-center">
              <Col>
                <small className="text-muted">
                  Pravděpodobnosti jsou kalkulovány na základě vašich dovedností, projektů a zkušeností.
                  Čím více se učíte a pracujete na projektech, tím vyšší je šance na úspěch.
                </small>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}