"use client";

import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Accordion } from 'react-bootstrap';
import Link from 'next/link';

const RELIGIONS = [
  {
    id: "christianity",
    name: "Křesťanství",
    icon: "✝️",
    followers: "2.4 miliardy",
    origin: "1. století n.l.",
    originPlace: "Blízký východ",
    description: "Monoteistické náboženství založené na učení Ježíše Krista. Nejrozšířenější náboženství na světě.",
    keyBeliefs: ["Bůh jako trojjediná bytost (Otec, Syn, Duch)", "Ježíš Kristus jako spasitel", "Posmrtný život a spása", "Bible jako svatý text"],
    holyTexts: ["Bible (Starý a Nový zákon)"],
    branches: ["Katolicismus", "Protestantství", "Pravoslaví"],
    practices: ["Mše", "Modlitba", "Křest", "Večeře Páně"]
  },
  {
    id: "islam",
    name: "Islám",
    icon: "☪️",
    followers: "1.9 miliardy",
    origin: "7. století n.l.",
    originPlace: "Arabský poloostrov",
    description: "Monoteistické náboženství založené prorokem Muhammadem. Druhé nejrozšířenější náboženství.",
    keyBeliefs: ["Jeden Bůh (Allah)", "Muhammad jako poslední prorok", "Korán jako božské zjevení", "Soudný den a posmrtný život"],
    holyTexts: ["Korán", "Hadíthy"],
    branches: ["Sunité", "Šíité"],
    practices: ["Modlitba 5x denně", "Půst v měsíci Ramadan", "Poutě do Mekky", "Zakat (charita)"]
  },
  {
    id: "hinduism",
    name: "Hinduismus",
    icon: "🕉️",
    followers: "1.2 miliardy",
    origin: "cca 1500 př.n.l.",
    originPlace: "Indie",
    description: "Jedno z nejstarších náboženství na světě. Zahrnuje mnoho tradic a filosofických směrů.",
    keyBeliefs: ["Brahman - ultimátní realita", "Karma a reinkarnace", "Dharma - povinnost a řád", "Moksha - osvobození z koloběhu"],
    holyTexts: ["Védy", "Bhagavadgíta", "Upanišady"],
    branches: ["Vaishnavismus", "Shivaismus", "Shaktismus"],
    practices: ["Meditace", "Jóga", "Púja (bohoslužba)", "Pilgrimsé cesty"]
  },
  {
    id: "buddhism",
    name: "Buddhismus",
    icon: "☸️",
    followers: "500 milionů",
    origin: "6. století př.n.l.",
    originPlace: "Indie",
    description: "Filosofické a náboženské učení založené Siddhárthou Gautamou (Buddhou).",
    keyBeliefs: ["Čtyři ušlechtilé pravdy", "Osvobození od utrpení (Nirvána)", "Střední cesta", "Karma a reinkarnace"],
    holyTexts: ["Tipitaka (Pálijský kánon)"],
    branches: ["Theraváda", "Mahájána", "Vadžrajána"],
    practices: ["Meditace", "Mindfulness", "Etické jednání", "Soutěska"]
  },
  {
    id: "judaism",
    name: "Judaismus",
    icon: "✡️",
    followers: "15 milionů",
    origin: "cca 2000 př.n.l.",
    originPlace: "Blízký východ",
    description: "Jedno z nejstarších monoteistických náboženství. Základ pro křesťanství a islám.",
    keyBeliefs: ["Jeden Bůh", "Tora jako božský zákon", "Smluva s Bohem", "Mesiáš a vykoupení"],
    holyTexts: ["Tora", "Talmud", "Midraš"],
    branches: ["Ortodoxní", "Konzervativní", "Reformní"],
    practices: ["Šabat", "Košer strava", "Rituální obřízka", "Festivaly"]
  }
];

const COMPARISON_DATA = [
  { aspect: "Zakladatel", christianity: "Ježíš Kristus", islam: "Prorok Muhammad", hinduism: "Žádný (tradice)", buddhism: "Siddhártha Gautama", judaism: "Abrahám, Mojžíš" },
  { aspect: "Svatý text", christianity: "Bible", islam: "Korán", hinduism: "Védy", buddhism: "Tipitaka", judaism: "Tora, Talmud" },
  { aspect: "Posmrtný život", christianity: "Ráj nebo peklo", islam: "Ráj (Džanna)", hinduism: "Reinkarnace", buddhism: "Nirvána nebo reinkarnace", judaism: "Očekávání znovuzrození" },
  { aspect: "Vegetariánství", christianity: "Není povinné", islam: "Není povinné", hinduism: "Běžné", buddhism: "Doporučeno", judaism: "Košer pravidla" },
  { aspect: "Modlitební frekvence", christianity: "Neděle", islam: "5x denně", hinduism: "Dle tradice", buddhism: "Dle tradice", judaism: "3x denně" }
];

export default function WorldReligionsPage() {
  const [activeReligion, setActiveReligion] = useState<string | null>(null);

  return (
    <main className="min-vh-100 bg-dark text-white pb-5">
      <nav className="navbar navbar-dark bg-black border-bottom border-secondary mb-5">
        <Container fluid>
            <Link href="/training" className="btn btn-outline-light btn-sm">
                ← Back to Training
            </Link>
            <span className="navbar-brand mb-0 h1 mx-auto text-uppercase letter-spacing-2" style={{ color: '#9c27b0' }}>
                🌍 Světová Náboženství
            </span>
            <div className="text-white-50 small">Learn About Faith</div>
        </Container>
      </nav>

      <Container>
        <div className="text-center mb-5">
            <h1 className="display-4 fw-bold">SVĚTOVÁ NÁBOŽENSTVÍ</h1>
            <p className="lead text-white-50">Objevte hlavní víry, které formovaly lidskou civilizaci</p>
        </div>

        <Row className="mb-5">
          <Col>
            <div style={{
              background: 'linear-gradient(135deg, #2b3035 0%, #1a1a1a 100%)',
              borderRadius: '16px',
              padding: '24px',
              borderTop: '4px solid #9c27b0'
            }}>
              <h3 className="mb-3" style={{ color: '#9c27b0' }}>📊 Přehled světových náboženství</h3>
              <div className="d-flex flex-wrap gap-3">
                {RELIGIONS.map(r => (
                  <div key={r.id} className="text-center p-3 bg-black rounded" style={{ minWidth: '120px' }}>
                    <div style={{ fontSize: '32px' }}>{r.icon}</div>
                    <div className="fw-bold small">{r.name}</div>
                    <div className="text-white-50 small">{r.followers}</div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          {RELIGIONS.map((religion) => (
            <Col lg={6} key={religion.id}>
              <Card className="h-100 bg-gradient border-0 shadow-lg" 
                    style={{
                        background: 'linear-gradient(145deg, #2b3035 0%, #212529 100%)',
                        borderTop: '4px solid #9c27b0'
                    }}>
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <span style={{ fontSize: '48px', marginRight: '16px' }}>{religion.icon}</span>
                    <div>
                      <h3 className="card-title fw-bold mb-1">{religion.name}</h3>
                      <Badge bg="dark" style={{ color: '#9c27b0' }}>{religion.followers} věřících</Badge>
                    </div>
                  </div>
                  
                  <p className="text-white-50 mb-3">{religion.description}</p>
                  
                  <div className="mb-3">
                    <small className="text-white-50">Vznik: {religion.origin} v {religion.originPlace}</small>
                  </div>

                  <Accordion className="mt-3">
                    <Accordion.Item eventKey={religion.id}>
                      <Accordion.Header>Klíčová učení</Accordion.Header>
                      <Accordion.Body>
                        <ul className="text-white-50 mb-0">
                          {religion.keyBeliefs.map((belief, i) => (
                            <li key={i}>{belief}</li>
                          ))}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={`${religion.id}-2`}>
                      <Accordion.Header>Svaté texty</Accordion.Header>
                      <Accordion.Body>
                        {religion.holyTexts.map((text, i) => (
                          <Badge key={i} bg="dark" className="me-2 mb-2" style={{ color: '#9c27b0' }}>{text}</Badge>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={`${religion.id}-3`}>
                      <Accordion.Header>Větve</Accordion.Header>
                      <Accordion.Body>
                        {religion.branches.map((branch, i) => (
                          <Badge key={i} bg="secondary" className="me-2 mb-2">{branch}</Badge>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={`${religion.id}-4`}>
                      <Accordion.Header>Praktikování</Accordion.Header>
                      <Accordion.Body>
                        <ul className="text-white-50 mb-0">
                          {religion.practices.map((practice, i) => (
                            <li key={i}>{practice}</li>
                          ))}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="mb-5">
          <h3 className="mb-4 text-center" style={{ color: '#9c27b0' }}>📈 Srovnání náboženství</h3>
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th style={{ color: '#9c27b0' }}>Aspekt</th>
                  {RELIGIONS.map(r => (
                    <th key={r.id} style={{ color: '#9c27b0' }}>{r.icon} {r.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, i) => (
                  <tr key={i}>
                    <td className="text-white-50">{row.aspect}</td>
                    <td>{row.christianity}</td>
                    <td>{row.islam}</td>
                    <td>{row.hinduism}</td>
                    <td>{row.buddhism}</td>
                    <td>{row.judaism}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-5">
          <h4 className="mb-3" style={{ color: '#9c27b0' }}>🎯 Pokračuj v učení</h4>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link href="/training/bible-studies" className="btn btn-outline-light disabled">
              📖 Úvod do Bible (Coming Soon)
            </Link>
            <Link href="/training/religious-history" className="btn btn-outline-light disabled">
              📜 Dějiny náboženství (Coming Soon)
            </Link>
            <Link href="/articles" className="btn" style={{ background: '#9c27b0', color: 'white' }}>
              📝 Články o náboženství
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}