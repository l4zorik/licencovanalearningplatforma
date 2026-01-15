'use client';

import { Container, Row, Col, Card, Badge, Tabs, Tab } from 'react-bootstrap';
import { RoadmapDisplay, CareerPaths, UserProgressCard } from '@/components/gamification';
import Link from 'next/link';
import { useState } from 'react';

const DEMO_USER_STATS = {
  level: 5,
  xp: 750,
  streak: 3,
  jobsApplied: 2,
  interviews: 0,
  offers: 0,
  skillsUnlocked: 3,
  coursesCompleted: 1,
  missionsCompleted: 0,
  tasksCompleted: 8,
  learningHours: 5
};

export default function RoadmapPage() {
  const [selectedPath, setSelectedPath] = useState<string>('frontend');

  return (
    <main className="min-vh-100 bg-dark text-white pb-5">
      <nav className="navbar navbar-dark bg-black border-bottom border-secondary mb-5">
        <Container fluid>
          <Link href="/" className="btn btn-outline-light btn-sm">
            ← Zpět na Dashboard
          </Link>
          <span className="navbar-brand mb-0 h1 mx-auto text-uppercase letter-spacing-2">
            🗺️ Roadmap & Kariéra
          </span>
          <div />
        </Container>
      </nav>

      <Container>
        <Row className="mb-4">
          <Col lg={8}>
            <UserProgressCard
              xp={DEMO_USER_STATS.xp}
              level={DEMO_USER_STATS.level}
              streak={DEMO_USER_STATS.streak}
            />
          </Col>
          <Col lg={4}>
            <Card className="h-100" style={{ background: 'rgba(33, 37, 41, 0.8)', border: '1px solid #424242' }}>
              <Card.Body>
                <h5 className="mb-3">🎯 Rychlý přehled</h5>
                <div className="mb-3">
                  <small className="text-white-50 d-block mb-1">Aktuální level</small>
                  <div className="d-flex align-items-center gap-2">
                    <Badge bg="primary" style={{ fontSize: '1rem' }}>Level {DEMO_USER_STATS.level}</Badge>
                    <small className="text-white-50">
                      {DEMO_USER_STATS.xp < 1000 
                        ? `${DEMO_USER_STATS.xp}/1000 XP do lvl 6`
                        : 'Připravuji další level'}
                    </small>
                  </div>
                </div>
                <div className="mb-3">
                  <small className="text-white-50 d-block mb-1">Streak</small>
                  <Badge bg="warning" text="dark" style={{ fontSize: '1rem' }}>
                    🔥 {DEMO_USER_STATS.streak} dní
                  </Badge>
                </div>
                <div>
                  <small className="text-white-50 d-block mb-1">Dokončeno kurzů</small>
                  <Badge bg="success" style={{ fontSize: '1rem' }}>
                    📚 {DEMO_USER_STATS.coursesCompleted}
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Tabs defaultActiveKey="roadmap" className="mb-3" variant="pills">
              <Tab eventKey="roadmap" title="🗺️ Roadmap">
                <RoadmapDisplay currentLevel={DEMO_USER_STATS.level} />
              </Tab>
              <Tab eventKey="paths" title="💼 Kariérní cesty">
                <CareerPaths selectedPath={selectedPath} onSelectPath={setSelectedPath} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .letter-spacing-2 {
          letter-spacing: 2px;
        }
        :global(.nav-pills .nav-link) {
          background-color: rgba(255,255,255,0.1);
          color: white;
          border: 1px solid #424242;
        }
        :global(.nav-pills .nav-link.active) {
          background-color: #0d6efd;
          border-color: #0d6efd;
        }
        :global(.nav-pills .nav-link:hover:not(.active)) {
          background-color: rgba(255,255,255,0.2);
        }
      `}</style>
    </main>
  );
}
