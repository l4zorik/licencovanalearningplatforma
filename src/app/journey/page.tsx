'use client';

import { Container, Row, Col, Card, Badge, Button, Tabs, Tab } from 'react-bootstrap';
import { UserJourneyRoadmap, UserProgressCard, MilestonesTracker } from '@/components/gamification';
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

const UNLOCKED_ACHIEVEMENTS = ['first_step', 'first_job', 'mission_starter', 'xp_collector_100', 'level_5'];

export default function JourneyPage() {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'stats' | 'milestones'>('roadmap');

  return (
    <main className="min-vh-100 bg-dark text-white pb-5">
      <nav className="navbar navbar-dark bg-black border-bottom border-secondary mb-5">
        <Container fluid>
          <Link href="/" className="btn btn-outline-light btn-sm">
            ← Zpět na Dashboard
          </Link>
          <span className="navbar-brand mb-0 h1 mx-auto text-uppercase letter-spacing-2">
            🗺️ Tvá Cesta
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
                <h5 className="mb-3">📊 Rychlý Přehled</h5>
                <Row className="text-center">
                  <Col xs={4}>
                    <h3 className="text-primary">{DEMO_USER_STATS.skillsUnlocked}</h3>
                    <small className="text-white-50">Dovednosti</small>
                  </Col>
                  <Col xs={4}>
                    <h3 className="text-success">{DEMO_USER_STATS.coursesCompleted}</h3>
                    <small className="text-white-50">Kurzy</small>
                  </Col>
                  <Col xs={4}>
                    <h3 className="text-warning">{DEMO_USER_STATS.streak}</h3>
                    <small className="text-white-50">Streak</small>
                  </Col>
                </Row>
                <hr className="border-secondary" />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-white-50">Dokončeno Achievementů</span>
                  <Badge bg="success">{UNLOCKED_ACHIEVEMENTS.length}</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k as any)}
              className="mb-3"
              variant="pills"
            >
              <Tab eventKey="roadmap" title="🗺️ Vizuální Cesta">
                <Card style={{ background: 'rgba(33, 37, 41, 0.5)', border: '1px solid #424242' }}>
                  <Card.Body>
                    <UserJourneyRoadmap
                      currentLevel={DEMO_USER_STATS.level}
                      totalXP={DEMO_USER_STATS.xp}
                      unlockedAchievements={UNLOCKED_ACHIEVEMENTS}
                      completedMissions={[]}
                      streak={DEMO_USER_STATS.streak}
                      skillsUnlocked={DEMO_USER_STATS.skillsUnlocked}
                      coursesCompleted={DEMO_USER_STATS.coursesCompleted}
                    />
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="stats" title="📈 Detailní Statistiky">
                <Row>
                  <Col md={6}>
                    <Card style={{ background: 'rgba(33, 37, 41, 0.5)', border: '1px solid #424242' }}>
                      <Card.Header className="bg-transparent border-secondary">
                        <h5 className="mb-0">📊 Tvé Statistiky</h5>
                      </Card.Header>
                      <Card.Body>
                        <div className="d-flex flex-column gap-3">
                          <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ background: 'rgba(76, 175, 80, 0.1)' }}>
                            <div className="d-flex align-items-center gap-2">
                              <span>🎯</span>
                              <span>Aktuální Level</span>
                            </div>
                            <Badge bg="primary" className="fs-6">Level {DEMO_USER_STATS.level}</Badge>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ background: 'rgba(255, 193, 7, 0.1)' }}>
                            <div className="d-flex align-items-center gap-2">
                              <span>⭐</span>
                              <span>Celkové XP</span>
                            </div>
                            <Badge bg="warning" text="dark" className="fs-6">{DEMO_USER_STATS.xp.toLocaleString()} XP</Badge>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ background: 'rgba(83, 199, 255, 0.1)' }}>
                            <div className="d-flex align-items-center gap-2">
                              <span>🔥</span>
                              <span>Denní Streak</span>
                            </div>
                            <Badge bg="info" className="fs-6">{DEMO_USER_STATS.streak} dní</Badge>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ background: 'rgba(156, 39, 176, 0.1)' }}>
                            <div className="d-flex align-items-center gap-2">
                              <span>🛠️</span>
                              <span>Dovednosti</span>
                            </div>
                            <Badge bg="secondary" className="fs-6">{DEMO_USER_STATS.skillsUnlocked}</Badge>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ background: 'rgba(76, 175, 80, 0.1)' }}>
                            <div className="d-flex align-items-center gap-2">
                              <span>📚</span>
                              <span>Dokončené Kurzy</span>
                            </div>
                            <Badge bg="success" className="fs-6">{DEMO_USER_STATS.coursesCompleted}</Badge>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ background: 'rgba(255, 152, 0, 0.1)' }}>
                            <div className="d-flex align-items-center gap-2">
                              <span>💼</span>
                              <span>Přidané Práce</span>
                            </div>
                            <Badge bg="warning" text="dark" className="fs-6">{DEMO_USER_STATS.jobsApplied}</Badge>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={6}>
                    <Card style={{ background: 'rgba(33, 37, 41, 0.5)', border: '1px solid #424242' }}>
                      <Card.Header className="bg-transparent border-secondary">
                        <h5 className="mb-0">🎮 Achievement Progress</h5>
                      </Card.Header>
                      <Card.Body>
                        <div className="mb-4">
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-white-50">Celkový pokrok</span>
                            <span className="text-warning">{Math.round((UNLOCKED_ACHIEVEMENTS.length / 50) * 100)}%</span>
                          </div>
                          <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                            <div style={{ width: `${(UNLOCKED_ACHIEVEMENTS.length / 50) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #ffc107, #ff9800)', borderRadius: '4px', transition: 'width 0.5s' }} />
                          </div>
                        </div>
                        
                        <Row className="text-center">
                          <Col xs={4}>
                            <div className="fs-3">🥉</div>
                            <small className="text-white-50">Common</small>
                            <div className="fw-bold">{UNLOCKED_ACHIEVEMENTS.filter(a => ['first_step', 'first_job', 'mission_starter'].includes(a)).length}</div>
                          </Col>
                          <Col xs={4}>
                            <div className="fs-3">🥈</div>
                            <small className="text-white-50">Rare</small>
                            <div className="fw-bold">{UNLOCKED_ACHIEVEMENTS.filter(a => ['xp_collector_100', 'level_5'].includes(a)).length}</div>
                          </Col>
                          <Col xs={4}>
                            <div className="fs-3">🥇</div>
                            <small className="text-white-50">Epic+</small>
                            <div className="fw-bold">0</div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="milestones" title="🎯 Milestony">
                <MilestonesTracker userStats={DEMO_USER_STATS} />
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
