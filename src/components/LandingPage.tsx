"use client";

import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import WaveBackground from '@/components/WaveBackground';

const FEATURES = [
  { icon: '🛠️', title: 'Skill Board', desc: '283 dovedností ve 40+ kategoriích. Sleduj pokrok, přidávej skills, prohlížej trendy a reálné mzdy.' },
  { icon: '🧠', title: 'AI Průvodce Akize', desc: 'Inteligentní chat bot s command menu a Prompt Managerem. Pomůže s kariérou, kódem i vzděláváním.' },
  { icon: '🎮', title: 'Gamifikace', desc: '30 levelů, 35+ achievementů, XP systém, streaky a combo bonusy. Učení je hra.' },
  { icon: '💼', title: 'Job Board', desc: 'Přehled pracovních pozic s trackingem přihlášek. Drag & drop mezi status columns.' },
  { icon: '📜', title: 'Certifikace', desc: 'Sledování certifikačního pokroku. Od plánování po získání.' },
  { icon: '📈', title: 'Kariérní Report', desc: '500+ pracovních pozic s reálnými platy, trendovou analýzou a skill gap assessmentem.' },
];

const STATS = [
  { value: '283', label: 'Dovedností', color: '#667eea' },
  { value: '40+', label: 'Kategorií', color: '#764ba2' },
  { value: '30', label: 'Levelů', color: '#e94560' },
  { value: '35+', label: 'Achievementů', color: '#f9c74f' },
  { value: '500+', label: 'Kariérních pozic', color: '#43aa8b' },
  { value: '15+', label: 'AI Promptů', color: '#577590' },
];

const LANDING_STYLES = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(102,126,234,0.3); }
    50% { box-shadow: 0 0 40px rgba(102,126,234,0.6); }
  }
  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    background: linear-gradient(135deg, #667eea 0%, #e94560 50%, #f9c74f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .feature-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px);
  }
  .feature-card:hover {
    transform: translateY(-6px) scale(1.02);
    border-color: rgba(102,126,234,0.3);
    background: rgba(255,255,255,0.08);
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }
  .stat-item {
    position: relative;
    padding: 1.5rem;
    border-radius: 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    transition: all 0.3s ease;
  }
  .stat-item:hover {
    background: rgba(255,255,255,0.06);
    transform: scale(1.05);
  }
  .cta-button {
    animation: pulse-glow 2s ease-in-out infinite;
    border-radius: 50px;
    padding: 14px 40px;
    font-weight: 700;
    font-size: 1.1rem;
    transition: all 0.3s ease;
  }
  .cta-button:hover {
    transform: translateY(-2px) scale(1.03);
  }
  .floating-icon {
    animation: float 3s ease-in-out infinite;
  }
  .floating-icon:nth-child(2) { animation-delay: 0.5s; }
  .floating-icon:nth-child(3) { animation-delay: 1s; }
`;

export default function LandingPage() {
  return (
    <main className="position-relative" style={{ minHeight: '100vh', background: '#0a0a1a', color: '#fff' }}>
      <style>{LANDING_STYLES}</style>
      <WaveBackground />

      {/* Navigation */}
      <nav className="navbar navbar-dark navbar-glass sticky-top" style={{ zIndex: 1030, background: 'rgba(10,10,26,0.8)', backdropFilter: 'blur(16px)' }}>
        <Container fluid className="px-4">
          <span className="navbar-brand mb-0 h1 fw-bold" style={{ background: 'linear-gradient(135deg, #667eea, #e94560)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🚀 TLP
          </span>
          <div className="d-flex gap-2">
            <Link href="/auth/signin">
              <Button variant="outline-light" size="sm" className="rounded-pill px-4">Přihlásit se</Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="primary" size="sm" className="rounded-pill px-4" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none' }}>Registrovat</Button>
            </Link>
          </div>
        </Container>
      </nav>

      {/* Hero */}
      <section className="position-relative d-flex align-items-center" style={{ minHeight: 'calc(100vh - 56px)', padding: '80px 0' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={7} className="mb-5 mb-lg-0">
              <div className="d-flex gap-2 mb-4">
                <span className="badge rounded-pill px-3 py-2" style={{ background: 'rgba(102,126,234,0.2)', color: '#667eea', border: '1px solid rgba(102,126,234,0.3)', fontSize: '0.8rem' }}>🔥 Next.js 16</span>
                <span className="badge rounded-pill px-3 py-2" style={{ background: 'rgba(233,69,96,0.2)', color: '#e94560', border: '1px solid rgba(233,69,96,0.3)', fontSize: '0.8rem' }}>🤖 AI-Powered</span>
                <span className="badge rounded-pill px-3 py-2" style={{ background: 'rgba(67,170,139,0.2)', color: '#43aa8b', border: '1px solid rgba(67,170,139,0.3)', fontSize: '0.8rem' }}>🎮 Gamifikace</span>
              </div>
              <h1 className="hero-title mb-4">
                Tvoje kariéra.<br />Tvoje tempo.<br />Tvoje platforma.
              </h1>
              <p className="lead mb-4" style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', maxWidth: '540px', lineHeight: 1.7 }}>
                Vzdělávej se, sleduj pokrok, objevuj trendy na trhu práce a nech si poradit od AI.
                Vše na jednom místě, v češtině.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/auth/signin">
                  <Button className="cta-button" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', color: 'white' }}>
                    🚀 Začít zdarma
                  </Button>
                </Link>
                <Button variant="outline-light" className="rounded-pill px-4 py-3" style={{ fontSize: '1.1rem', fontWeight: 600 }} onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                  Zjistit více ↓
                </Button>
              </div>
            </Col>
            <Col lg={5} className="text-center">
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ fontSize: '10rem', lineHeight: 1, opacity: 0.9 }} className="floating-icon">🚀</div>
                <div style={{ position: 'absolute', top: '-20px', right: '-30px', fontSize: '3rem' }} className="floating-icon">⭐</div>
                <div style={{ position: 'absolute', bottom: '10px', left: '-20px', fontSize: '2.5rem' }} className="floating-icon">⚡</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.02)' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>Vše, co potřebuješ pro kariérní růst</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Od sledování dovedností po AI asistenta — platforma pokrývá celý tvůj kariérní životní cyklus
            </p>
          </div>
          <Row className="g-4">
            {FEATURES.map((f, i) => (
              <Col key={i} xs={12} sm={6} lg={4}>
                <Card className="feature-card h-100 p-4" style={{ cursor: 'default' }}>
                  <Card.Body className="p-0 d-flex flex-column">
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                    <h5 className="fw-bold mb-2">{f.title}</h5>
                    <p className="mb-0" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Stats */}
      <section style={{ padding: '80px 0' }}>
        <Container>
          <Row className="g-3">
            {STATS.map((s, i) => (
              <Col key={i} xs={6} md={4} lg={2}>
                <div className="stat-item text-center">
                  <div className="fw-bold mb-1" style={{ fontSize: '2rem', color: s.color }}>{s.value}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{s.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Tech Stack */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.02)' }}>
        <Container className="text-center">
          <h2 className="fw-bold mb-4" style={{ fontSize: '2rem' }}>🏗️ Technologie</h2>
          <p className="mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>Postaveno na moderním stacku s důrazem na výkon a UX</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {['Next.js 16', 'React 19', 'TypeScript', 'Bootstrap 5', 'Prisma', 'NextAuth.js', 'Recharts', 'Zod'].map((tech, i) => (
              <span key={i} className="badge rounded-pill px-4 py-2" style={{ background: 'rgba(102,126,234,0.15)', color: '#667eea', border: '1px solid rgba(102,126,234,0.25)', fontSize: '0.9rem', fontWeight: 500 }}>
                {tech}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 0' }}>
        <Container className="text-center">
          <h2 className="fw-bold mb-3" style={{ fontSize: '2rem' }}>Připraven posunout kariéru?</h2>
          <p className="mb-4" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>Začni zdarma během pár sekund. Žádná karta, žádné závazky.</p>
          <Link href="/auth/signin">
            <Button className="cta-button px-5 py-3" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', color: 'white', fontSize: '1.2rem' }}>
              🚀 Vytvořit účet
            </Button>
          </Link>
        </Container>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)' }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-3 mb-md-0">
              <span className="fw-bold" style={{ background: 'linear-gradient(135deg, #667eea, #e94560)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🚀 TLP — Tomas Learning Platform</span>
            </Col>
            <Col md={6} className="text-md-end">
              <small style={{ color: 'rgba(255,255,255,0.4)' }}>© 2026 TLP. Všechna práva vyhrazena. GNU GPLv3</small>
            </Col>
          </Row>
        </Container>
      </footer>
    </main>
  );
}
