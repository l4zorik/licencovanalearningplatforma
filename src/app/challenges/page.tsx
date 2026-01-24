"use client";

import { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, ProgressBar, Tabs, Tab } from 'react-bootstrap';
import Link from 'next/link';
import { FiCode, FiTool, FiPenTool, FiTarget, FiTrendingUp, FiAward, FiClock, FiCheckCircle } from 'react-icons/fi';

// Sample challenge data - this would come from a database/API
const CHALLENGES = [
  {
    id: 1,
    title: "Reverzování řetězce",
    description: "Napište funkci, která převrátí pořadí znaků v řetězci.",
    category: "programming",
    difficulty: 1,
    xp: 50,
    time: "15 min",
    completed: false,
    attempts: 0
  },
  {
    id: 2,
    title: "Spojení na rybinu",
    description: "Vytvořte spojení na rybinu (finger joint) s přesností 0.5mm.",
    category: "trades",
    difficulty: 5,
    xp: 150,
    time: "2 hod",
    completed: false,
    attempts: 0
  },
  {
    id: 3,
    title: "Design loga pro kavárnu",
    description: "Navrhněte logo pro novou kavárnu včetně brand guidelines.",
    category: "creative",
    difficulty: 4,
    xp: 120,
    time: "3 hod",
    completed: false,
    attempts: 0
  },
  {
    id: 4,
    title: "Floyd-Warshall algoritmus",
    description: "Implementujte algoritmus pro nalezení nejkratších cest v grafu.",
    category: "programming",
    difficulty: 7,
    xp: 200,
    time: "45 min",
    completed: false,
    attempts: 0
  },
  {
    id: 5,
    title: "Výměna brzdových destiček",
    description: "Proveďte diagnostiku a výměnu brzdových destiček s videodokumentací.",
    category: "automotive",
    difficulty: 6,
    xp: 180,
    time: "1.5 hod",
    completed: false,
    attempts: 0
  },
  {
    id: 6,
    title: "Klasifikace obrázků",
    description: "Trénujte model pro klasifikaci obrázků s přesností nad 95%.",
    category: "programming",
    difficulty: 8,
    xp: 300,
    time: "2 hod",
    completed: false,
    attempts: 0
  }
];

const CATEGORIES = {
  all: { name: "Všechny", icon: "🎯", color: "#667eea" },
  programming: { name: "Programování", icon: "💻", color: "#667eea" },
  trades: { name: "Řemesla", icon: "🔨", color: "#f093fb" },
  creative: { name: "Kreativa", icon: "🎨", color: "#4facfe" },
  automotive: { name: "Auto-moto", icon: "🚗", color: "#ff6b6b" }
};

const DIFFICULTY_COLORS = {
  1: "success",
  2: "success",
  3: "primary",
  4: "primary",
  5: "warning",
  6: "warning",
  7: "danger",
  8: "danger",
  9: "danger",
  10: "danger"
};

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  const filteredChallenges = CHALLENGES.filter(challenge => 
    activeTab === "all" || challenge.category === activeTab
  );

  const handleComplete = (id: number) => {
    if (!completedChallenges.includes(id)) {
      setCompletedChallenges([...completedChallenges, id]);
    }
  };

  const totalXP = completedChallenges.reduce((sum, id) => {
    const challenge = CHALLENGES.find(c => c.id === id);
    return sum + (challenge?.xp || 0);
  }, 0);

  const completionRate = Math.round((completedChallenges.length / CHALLENGES.length) * 100);

  return (
    <main style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      paddingTop: '80px'
    }}>
      <Container fluid className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 style={{ 
              color: '#fff', 
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>
              🏆 Challenges
            </h1>
            <p style={{ color: '#8892b0', fontSize: '1.1rem' }}>
              Rozvíjej své dovednosti prostřednictvím praktických výzev
            </p>
          </Col>
        </Row>

        {/* Stats Bar */}
        <Row className="mb-4">
          <Col md={3}>
            <Card style={{
              background: 'rgba(102, 126, 234, 0.1)',
              border: '1px solid rgba(102, 126, 234, 0.3)',
              borderRadius: '16px'
            }}>
              <Card.Body className="text-center py-3">
                <FiTarget style={{ fontSize: '2rem', color: '#667eea', marginBottom: '8px' }} />
                <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700' }}>
                  {completedChallenges.length}/{CHALLENGES.length}
                </div>
                <div style={{ color: '#8892b0', fontSize: '0.9rem' }}>
                  Dokončené challenge
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{
              background: 'rgba(76, 175, 80, 0.1)',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              borderRadius: '16px'
            }}>
              <Card.Body className="text-center py-3">
                <FiAward style={{ fontSize: '2rem', color: '#4CAF50', marginBottom: '8px' }} />
                <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700' }}>
                  {totalXP} XP
                </div>
                <div style={{ color: '#8892b0', fontSize: '0.9rem' }}>
                  Nasbírané body
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{
              background: 'rgba(255, 193, 7, 0.1)',
              border: '1px solid rgba(255, 193, 7, 0.3)',
              borderRadius: '16px'
            }}>
              <Card.Body className="text-center py-3">
                <FiTrendingUp style={{ fontSize: '2rem', color: '#FFC107', marginBottom: '8px' }} />
                <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700' }}>
                  {completionRate}%
                </div>
                <div style={{ color: '#8892b0', fontSize: '0.9rem' }}>
                  Úspěšnost
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{
              background: 'rgba(156, 39, 176, 0.1)',
              border: '1px solid rgba(156, 39, 176, 0.3)',
              borderRadius: '16px'
            }}>
              <Card.Body className="text-center py-3">
                <FiClock style={{ fontSize: '2rem', color: '#9C27B0', marginBottom: '8px' }} />
                <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700' }}>
                  {CHALLENGES.reduce((sum, c) => sum + parseInt(c.time), 0)} min
                </div>
                <div style={{ color: '#8892b0', fontSize: '0.9rem' }}>
                  Celkový čas
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Category Tabs */}
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || "all")}
          className="mb-4"
          style={{
            '--bs-nav-link-color': '#8892b0',
            '--bs-nav-active-color': '#fff',
            '--bs-nav-tabs-link-active-bg': 'rgba(102, 126, 234, 0.2)',
            '--bs-nav-tabs-border-color': 'rgba(102, 126, 234, 0.3)',
            '--bs-nav-tabs-link-hover-border-color': 'rgba(102, 126, 234, 0.5)',
          } as any}
        >
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <Tab
              key={key}
              eventKey={key}
              title={
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </span>
              }
            />
          ))}
        </Tabs>

        {/* Challenges Grid */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredChallenges.map((challenge) => (
            <Col key={challenge.id}>
              <Card
                style={{
                  background: completedChallenges.includes(challenge.id) 
                    ? 'rgba(76, 175, 80, 0.1)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${completedChallenges.includes(challenge.id) 
                    ? 'rgba(76, 175, 80, 0.3)' 
                    : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  if (!completedChallenges.includes(challenge.id)) {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = CATEGORIES[challenge.category as keyof typeof CATEGORIES].color;
                    e.currentTarget.style.boxShadow = `0 10px 40px ${CATEGORIES[challenge.category as keyof typeof CATEGORIES].color}30`;
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Card.Body>
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
<div>
                      <Badge 
                        style={{ 
                          background: CATEGORIES[challenge.category as keyof typeof CATEGORIES].color,
                          marginBottom: '8px'
                        }}
                      >
                        {CATEGORIES[challenge.category as keyof typeof CATEGORIES].icon}{' '}
                        {CATEGORIES[challenge.category as keyof typeof CATEGORIES].name}
                      </Badge>
                      <Badge variant={DIFFICULTY_COLORS[challenge.difficulty as keyof typeof DIFFICULTY_COLORS] as any}>
                        {'★'.repeat(Math.ceil(challenge.difficulty / 2))}
                      </Badge>
                    </div>
                    {completedChallenges.includes(challenge.id) && (
                      <FiCheckCircle style={{ color: '#4CAF50', fontSize: '1.5rem' }} />
                    )}
                  </div>

                  {/* Title */}
                  <h5 style={{ color: '#fff', marginBottom: '8px', fontWeight: '600' }}>
                    {challenge.title}
                  </h5>

                  {/* Description */}
                  <p style={{ color: '#8892b0', fontSize: '0.9rem', marginBottom: '16px', lineHeight: '1.6' }}>
                    {challenge.description}
                  </p>

                  {/* Meta Info */}
                  <div className="d-flex gap-3 mb-3" style={{ color: '#8892b0', fontSize: '0.85rem' }}>
                    <span>⏱️ {challenge.time}</span>
                    <span>⭐ {challenge.xp} XP</span>
                  </div>

                  {/* Progress Bar (if started) */}
                  {challenge.attempts > 0 && (
                    <div className="mb-3">
                      <small style={{ color: '#8892b0', marginBottom: '4px', display: 'block' }}>
                        Pokrok
                      </small>
                      <ProgressBar
                        now={Math.min(challenge.attempts * 20, 100)}
                        variant="info"
                        style={{ height: '6px' }}
                        animated
                      />
                    </div>
                  )}

                  {/* Action Button */}
                  <Button
                    variant={completedChallenges.includes(challenge.id) ? "outline-success" : "primary"}
                    className="w-100"
                    style={{
                      borderRadius: '12px',
                      fontWeight: '600',
                      background: completedChallenges.includes(challenge.id) 
                        ? 'transparent' 
                        : `linear-gradient(135deg, ${CATEGORIES[challenge.category as keyof typeof CATEGORIES].color} 0%, ${CATEGORIES[challenge.category as keyof typeof CATEGORIES].color}dd 100%)`,
                      border: completedChallenges.includes(challenge.id) 
                        ? '1px solid #4CAF50' 
                        : 'none'
                    }}
                    onClick={() => handleComplete(challenge.id)}
                  >
                    {completedChallenges.includes(challenge.id) ? (
                      <>
                        <FiCheckCircle style={{ marginRight: '8px' }} />
                        Dokončeno
                      </>
                    ) : (
                      "Začít challenge"
                    )}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Coming Soon Section */}
        <Row className="mt-5">
          <Col>
            <Card style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              border: '1px solid rgba(102, 126, 234, 0.3)',
              borderRadius: '20px'
            }}>
              <Card.Body className="text-center py-5">
                <h3 style={{ color: '#fff', marginBottom: '16px' }}>
                  🚀 Brzy přijde více!
                </h3>
                <p style={{ color: '#8892b0', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                  Pracujeme na dalších challenge pro různá odvětví. Sledujte nové aktualizace a buďte mezi prvními, kdo je vyzkouší!
                </p>
                <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                  {['🏥 Zdravotnictví', '📚 Vzdělávání', '💼 Finance', '🎵 Hudba', '📷 Fotografie'].map((item, idx) => (
                    <Badge 
                      key={idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: '#8892b0',
                        padding: '12px 20px',
                        fontSize: '0.9rem',
                        borderRadius: '12px'
                      }}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Footer */}
        <Row className="mt-4">
          <Col className="text-center">
            <p style={{ color: '#667eea', fontSize: '0.9rem' }}>
              💡 Tip: Začněte s jednoduššími challenge a postupně zvyšujte obtížnost
            </p>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
