"use client";

import { Container, Row, Col, Card, Badge, Button, Accordion } from 'react-bootstrap';
import Link from 'next/link';

export default function QuickCoursesPage() {
  const quickCourses = [
    {
      id: "electrician-basics",
      title: "Jak rychle dohnat „elektrikařinu“ (prakticky a pro chlapa z praxe)",
      subtitle: "Nejefektivnější cesta pro techniky z výroby",
      category: "Elektrotechnika",
      difficulty: "Beginner",
      estimatedTime: "6-8 týdnů",
      xp: 1500,
      tags: ["Elektrotechnika", "Praxe", "Rekvalifikace", "Autoelektrika"],
      description: "Kompletní praktický plán pro techniky, kteří chtějí dohnat elektrotechniku. Od základů přes praxi na 12V až po rekvalifikaci nebo specializaci na autoelektriku.",
      instructor: {
        name: "Elektrotechnik z Praxe",
        role: "Elektrikář & Autoelektrik",
        avatarUrl: "/images/electrician-mentor.png"
      },
      phases: [
        {
          title: "Základy Elektrotechniky",
          content: `Tohle je minimum, aby z tebe nebyl jen „drátovač":

**Základní veličiny a zákony:**
- Napětí U, proud I, odpor R, výkon P
- Ohmův zákon: U = R × I
- Výkon: P = U × I
- Sériové/paralelní zapojení odporů

**Stejnosměrný vs střídavý proud:**
- DC: baterky, auto, elektronika
- AC: zásuvky, 230/400V, fáze, nulák, ochranný vodič

**Základní součástky:**
- Rezistor, kondenzátor, dioda, LED, cívka, relé, tranzistor
- Jak je kreslit ve schématu, jak se chovají v obvodu`
        },
        {
          title: "Praxe na 12V „laboratoř“ doma",
          content: `Protože jsi technický typ z výroby, nejlepší je učit se rukama. Bezpečný a levný setup:

**Co si pořídit:**
- Nastavitelný laboratorní zdroj 0-15V
- Digitální multimetr (voltmetr, ampérmetr, ohmmetr)
- LEDky, rezistory, spínače, relé, pojistky
- Breadboard nebo montážní deska

**Konkrétní miniprojekty:**
1. **Jednoduchý obvod:** zdroj → vypínač → LED → zpět
   - Změř napětí, proud, přepočítej výkon

2. **Sériové a paralelní zapojení** dvou LED
   - Ověř měřením rozdělení napětí a proudu

3. **Reléový obvod** - tlačítko ovládá relé
   - Princip ovládání světel, čerpadel

4. **Simulace poruch** - falešné odpory
   - Úbytky napětí v obvodu`
        },
        {
          title: "Cesty Specializace",
          content: `**A) Domácí/IT/Bastlení:**
- Rozumět elektro a bastlit pro sebe
- Základy + bezpečnost + praxe na 5-24V
- Výsledek: umíš číst schémata, zapojit obvody

**B) Klasický Elektrikář:**
- Rekvalifikační kurz "Montér el. instalací"
- Teorie + praxe + státní zkouška
- Výsledek: oficiální kvalifikace, fakturace, odpovědnost

**C) Autoelektrika/Elektromobilita:**
- Základy + kurzy pro automechaniky
- Diagnostika aut, kabeláže, řídící jednotky
- Výsledek: specialista na auto elektro a EV`
        },
        {
          title: "Bezpečnost a Legislativa",
          content: `Na rozdíl od IT je v elektro legislativa brutálně důležitá:

**Zákony a normy:**
- ČSN 33 1500 a ČSN 33 2000-6
- Zákon 250/2021 Sb. a NV 194/2022
- Revize musí dělat kvalifikovaný revizní technik

**Pravidla:**
- Bezpečné malé napětí: do 50V AC / 120V DC
- Silové instalace: musí mít kvalifikaci
- Po rekonstrukci: povinná revizní zpráva

**Pro praxi:**
- Bastlit pro sebe na nízkém napětí: OK
- Hrabat se do domovní instalace bez kvalifikace: NE
- Chceš to dělat jako službu: cesta přes rekvalifikaci`
        }
      ],
      resources: [
        "Elektrotechnický základ (učební text SŠ)",
        "YouTube série: Elektrotechnika Základy",
        "Multimetr + 12V zdroj pro praxi",
        "Rekvalifikační kurzy elektrikář",
        "Kurzy autoelektriky a EV"
      ]
    }
  ];

  return (
    <main className="min-vh-100 bg-dark text-white pb-5">
      <nav className="navbar navbar-dark bg-black border-bottom border-secondary mb-5">
        <Container fluid>
            <Link href="/" className="btn btn-outline-light btn-sm">
                ← Zpět na Dashboard
            </Link>
            <span className="navbar-brand mb-0 h1 mx-auto text-uppercase letter-spacing-2 text-warning">
                ⚡ Rychlokurzy s Praxí
            </span>
            <div className="text-white-50 small">Praktické kurzy pro techniky</div>
        </Container>
      </nav>

      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={8}>
            <div className="text-center mb-4">
              <h2 className="fw-bold text-warning">MISE S PRAXÍ & RYCHLOKURZY</h2>
              <p className="text-white-50">Intenzivní praktické kurzy pro techniky, kteří chtějí rychle dohnat znalosti v konkrétní oblasti</p>
            </div>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={3} className="g-4">
          {quickCourses.map((course) => (
            <Col key={course.id}>
              <Card className="bg-dark border-secondary h-100 mission-card" style={{transition: 'transform 0.2s'}}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Badge bg="warning" className="text-dark">
                      {course.category}
                    </Badge>
                    <span className="text-warning fw-bold">{course.xp} XP</span>
                  </div>

                  <h5 className="card-title mb-1 text-white">{course.title}</h5>
                  <p className="text-muted small mb-3">{course.subtitle}</p>

                  <p className="text-white-50 small mb-3">{course.description.substring(0, 100)}...</p>

                  <div className="mb-3">
                    <Badge bg="secondary" className="me-1 mb-1 text-dark">
                      {course.difficulty}
                    </Badge>
                    <Badge bg="info" className="me-1 mb-1 text-dark">
                      {course.estimatedTime}
                    </Badge>
                    {course.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} bg="secondary" className="me-1 mb-1 text-dark">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Accordion className="mb-3">
                    <Accordion.Item eventKey="0" className="bg-dark border-secondary">
                      <Accordion.Header className="text-white">
                        📚 Podrobný obsah kurzu
                      </Accordion.Header>
                      <Accordion.Body className="text-white-50">
                        {course.phases.map((phase, idx) => (
                          <div key={idx} className="mb-3">
                            <h6 className="text-warning">{idx + 1}. {phase.title}</h6>
                            <div className="small" style={{whiteSpace: 'pre-line'}}>
                              {phase.content.substring(0, 200)}...
                            </div>
                          </div>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <Link href={`/quick-courses/${course.id}`} className="text-decoration-none">
                    <Button variant="outline-warning" className="w-100">
                      🚀 ZAČÍT RYCHLOKURZ
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Placeholder for future courses */}
        <Row className="justify-content-center mt-5">
          <Col lg={6}>
            <Card className="bg-secondary bg-opacity-25 border-secondary text-center">
              <Card.Body className="py-5">
                <div className="fs-1 mb-3">🚧</div>
                <h5>Další rychlokurzy brzy...</h5>
                <p className="text-muted mb-0">CNC obrábění, Autoelektrika, Elektronika pro začátečníky</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}