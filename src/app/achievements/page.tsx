'use client';

import { Container, Row, Col, Card, Badge, Tabs, Tab } from 'react-bootstrap';
import { ACHIEVEMENTS } from '@/lib/gamification/achievements';
import { AchievementsGallery, UserProgressCard, MilestonesTracker } from '@/components/gamification';
import Link from 'next/link';

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

const ACHIEVEMENT_PROGRESS: Record<string, number> = {
  first_step: 100,
  first_job: 100,
  mission_starter: 100,
  xp_collector_100: 75,
  level_5: 100,
  learning_hero: 10,
  streak_week: 42,
  job_hunter: 10,
  mission_master: 0,
  skill_builder: 15,
  xp_collector_1000: 7,
  xp_collector_5000: 1
};

export default function AchievementsPage() {
  const totalAchievements = ACHIEVEMENTS.length;
  const unlockedCount = UNLOCKED_ACHIEVEMENTS.length;
  const totalXP = ACHIEVEMENTS
    .filter(a => UNLOCKED_ACHIEVEMENTS.includes(a.id))
    .reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <main className="min-vh-100 bg-dark text-white pb-5">
      <nav className="navbar navbar-dark bg-black border-bottom border-secondary mb-5">
        <Container fluid>
          <Link href="/" className="btn btn-outline-light btn-sm">
            ← Zpět na Dashboard
          </Link>
          <span className="navbar-brand mb-0 h1 mx-auto text-uppercase letter-spacing-2">
            🏆 Achievementy & Progress
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
                <h5 className="mb-3">📊 Statistiky</h5>
                <Row className="text-center">
                  <Col xs={4}>
                    <h3 className="text-warning">{unlockedCount}</h3>
                    <small className="text-white-50">Odemčeno</small>
                  </Col>
                  <Col xs={4}>
                    <h3 className="text-info">{totalAchievements - unlockedCount}</h3>
                    <small className="text-white-50">Zbývá</small>
                  </Col>
                  <Col xs={4}>
                    <h3 className="text-success">{totalXP}</h3>
                    <small className="text-white-50">XP získáno</small>
                  </Col>
                </Row>
                <hr className="border-secondary" />
                <div className="d-flex justify-content-between mb-2">
                  <span>Celkový pokrok</span>
                  <span className="text-warning">{Math.round((unlockedCount / totalAchievements) * 100)}%</span>
                </div>
                <div
                  style={{
                    height: '8px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      width: `${(unlockedCount / totalAchievements) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #ffc107, #ff9800)'
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <MilestonesTracker userStats={DEMO_USER_STATS} />
          </Col>
        </Row>

        <Row>
          <Col>
            <AchievementsGallery
              achievements={ACHIEVEMENTS}
              unlockedIds={UNLOCKED_ACHIEVEMENTS}
              userProgress={ACHIEVEMENT_PROGRESS}
              showLocked={true}
            />
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .letter-spacing-2 {
          letter-spacing: 2px;
        }
      `}</style>
    </main>
  );
}
