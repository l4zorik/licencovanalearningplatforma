'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Badge, Button, ProgressBar, ListGroup, Modal, Accordion, Tab, Tabs } from 'react-bootstrap';
import Link from 'next/link';

// Course data - in a real app this would come from an API or database
const QUICK_COURSES = {
  "electrician-basics": {
    id: "electrician-basics",
    title: "Jak rychle dohnat „elektrikařinu“ (prakticky a pro chlapa z praxe)",
    subtitle: "Nejefektivnější cesta pro tebe: osvěžit základy → praxe na 12V → specializace",
    category: "Elektrotechnika",
    difficulty: "Beginner",
    xp: 1500,
    estimatedTime: "6-8 týdnů",
    tags: ["Elektrotechnika", "Praxe", "Rekvalifikace", "Autoelektrika"],
    description: "Kompletní praktický plán pro techniky, kteří chtějí dohnat elektrotechniku. Od základů přes praxi na 12V až po rekvalifikaci nebo specializaci na autoelektriku.",
    instructor: {
      name: "Elektrotechnik z Praxe",
      role: "Elektrikář & Autoelektrik",
      avatarUrl: "/images/electrician-mentor.png"
    },
    phases: [
      {
        id: "phase-1",
        title: "1. Ujasnit si cíl: co pro tebe „dohnat elektrikařinu“ znamená",
        content: `V praxi jsou tři typické cíle:

**A) Rozumět elektro a bastlit pro sebe (low-voltage, domácí věci, IoT)**
- Umíš číst schémata, zapojit světla, relé, napájení, logiku
- Výsledek: nelekneš se chyby, rozumíš základům
- Potřebuješ: základy elektrotechniky + bezpečnost + praxe na 5-24V

**B) Klasický elektrikář – domy, byty, rozvaděče**
- Umíš dělat instalace jako práci, legálně, fakturace, odpovědnost
- Výsledek: oficiální kvalifikace elektrikáře
- Potřebuješ: teorie + praxe + rekvalifikace "Montér el. instalací" + zkoušky

**C) Autoelektrika / elektromobilita**
- Diagnostika aut, kabeláže, řídící jednotky, HV systémy u EV
- Výsledek: specialista na auto elektro
- Potřebuješ: základy elektrotechniky + kurzy pro automechaniky + EV školení`
      },
      {
        id: "phase-2",
        title: "2. Základ, který bys měl mít v ruce (teorie)",
        content: `Tohle je minimum, aby z tebe nebyl jen „drátovač", ale člověk, co chápe, co dělá:

**Základní veličiny a zákony:**
- Napětí U, proud I, odpor R, výkon P
- Ohmův zákon: U = R × I
- Výkon: P = U × I
- Sériové/paralelní zapojení odporů, rozdělení napětí a proudu

**Stejnosměrný vs střídavý proud:**
- DC: baterky, auto, většina elektroniky
- AC: zásuvky, 230/400V, třífáz, základ, co je fáze, pracovní a ochranný vodič, nulák

**Základní součástky:**
- Rezistor, kondenzátor, dioda, LED, cívka, relé, tranzistor
- Aspoň vědět: co dělají, jak je kreslíš ve schématu, jak se chovají v obvodu

**Schémata a značení:**
- Umět si přečíst jednoduchý obvod: zdroj – spínač – zátěž – ochrana (pojistka, jistič)
- Základní značky podle ČSN, aspoň pro vodiče, jističe, chránič, zásuvky, vypínače

**Doporučené materiály:**
- "Elektrotechnický základ" (učební texty SŠ)
- YouTube série "Elektrotechnika: Základy"`
      },
      {
        id: "phase-3",
        title: "3. Praktikum na stole: 12V „laboratoř“ doma",
        content: `Protože jsi technický typ z výroby, nejlepší je učit se rukama. Bezpečný a levný setup:

**Co si pořídit (pokud ještě nemáš):**
- Nastavitelný laboratorní zdroj 0-15V / pár ampérů
- Digitální multimetr (voltmetr, ampérmetr, ohmmetr v jednom)
- Pár LEDek, rezistorů, spínačů, relé, pojistky, chráničky, svorky
- Montážní destička (breadboard) nebo malý kus montážní desky

**Konkrétní miniprojekty (vždy na 12V):**

**1. Jednoduchý obvod: zdroj – vypínač – žárovka/LED – zpět**
- Změř napětí naprázdno, proud při zátěži, přepočítej výkon

**2. Sériové a paralelní zapojení dvou žárovek/odporů**
- Ověř měřením, jak se dělí napětí a proud

**3. Základ reléového obvodu**
- Tlačítko ovládá cívku relé, kontakty přepínají zátěž
- Pochopíš principy ovládání světel, čerpadel atd.

**4. Simulace poruch**
- Zasuň "falešný" přechodový odpor (dlouhý tenký vodič, uvolněný spoj)
- Sleduj úbytky napětí v obvodu – přesně tohle řešíš později v autech i v domech`
      },
      {
        id: "phase-4",
        title: "4. Bezpečnost a zákony v ČR",
        content: `Na rozdíl od IT je v elektro legislativa brutálně důležitá:

**Zákony a normy:**
- Elektroinstalace v barácích: ČSN 33 1500 a ČSN 33 2000-6
- Revize, postup měření, co musí revizák zkontrolovat
- Zákon 250/2021 Sb. a nařízení vlády 194/2022

**Co z toho plyne:**
- **Učit se a opravovat „pro sebe" na nízkém napětí v dílně – OK** (pokud víš, co děláš)
- **Hrabat se do domovní instalace bez kvalifikace a revize – NE**
- Po rekonstrukci elektroinstalace musí být revizní zpráva
- Revizi smí dělat jen revizní technik s osvědčením

**Bezpečnost:**
- Bezpečné malé napětí: do cca 50V AC / 120V DC v suchém prostředí
- Pro silové instalace a revize už musí být kvalifikace a revizák`
      },
      {
        id: "phase-5",
        title: "5. Cesta B: Rekvalifikační kurz Elektrikář",
        content: `Protože jsi z technického oboru, bude pro tebe reál dát to zrychlenou cestou přes profesní kvalifikace:

**Rekvalifikační kurzy "Elektrikář / Montér elektrických instalací (26-017-H)":**
- Délka: 4 týdny až 3 měsíce
- Kombinace teorie a praxe
- Končí státní zkouškou
- Některé programy: až 5 profesních kvalifikací za 3 měsíce

**Co se probírá:**
- Základy elektrotechniky, bezpečnost, předpisy a normy
- Montáž kabeláže, zásuvek, vypínačů, jističů, rozvaděčů, slaboproudých okruhů
- Měření: izolační odpor, impedance smyčky, proudové chrániče, spojitost ochranného vodiče
- ČSN 33 1500 a ČSN 33 2000-6

**Kdy to dát:**
- Chceš oficiálně dělat elektrikářské práce
- Uvažuješ, že to zařadíš do podnikatelského portfolia
- Rekonstrukce, smart home, rozvaděče apod.`
      },
      {
        id: "phase-6",
        title: "6. Cesta C: Autoelektrika a elektromobilita",
        content: `K tvému backgroundu (mechanik/technik, zájem o EV) dává velký smysl jít do automobilové elektrotechniky:

**Kurzy typu "Základy elektrotechniky pro automechaniky":**
- Zaměřené na napětí, proud, odpor, měření v kabeláži
- Principy zátěže, úbytky napětí, simulace závad
- Měření přímo na vozech

**Pokročilejší bloky:**
- Osciloskopická diagnostika
- Datová komunikace v automobilech
- Řízení motorů, DPF, deNOx
- Mechanika moderních vozidel

**Školení na opravy elektrovozidel:**
- Různé napěťové systémy, vysokonapěťové okruhy
- Bezpečná práce na EV podle legislativy
- Zákon 250/2021, NV 194/2022

**Formát kurzů:**
- Jednodenní až vícedenní kurzy
- Malé skupiny (kolem 6 lidí)
- Silně praktické, měření přímo na autech
- Simulované závady, certifikát o absolvování`
      },
      {
        id: "phase-7",
        title: "7. Jak to reálně vmáčknout do nabitého času",
        content: `Protože píšeš, že jsi „busy do konce roku", hodí se light, ale konzistentní režim:

**Týdenní mini-plán bez brutálního přetížení:**

**3× týdně 30-45 min:**
- Jednou týdně: kapitola z "Elektrotechnický základ"
- Jednou týdně: video z YouTube série "Elektrotechnika: Základy"
- Jednou týdně: počítání příkladů (Ohmův zákon, výkon, rozdělení napětí)

**1× víkendový blok 2-3 hodiny:**
- Jen praktikum na stole
- Stavba a měření obvodů s 12V
- Hraní si s relé, zátěží, simulací poruch
- Postupně si zkus "přečíst" a přepojit jednoduché schéma

**Za 6-8 týdnů takhle:**
- Oživíš fyziku/elektro ze školy
- Budeš mít jistotu v měření a chování jednoduchých obvodů
- Pochopíš terminologii, takže kurz nebude "cizí jazyk"`
      }
    ],
    resources: [
      "Elektrotechnický základ (učební text SŠ) - https://www.sosehl.cz/uploads/2020/11/Elektrotechnicky_zaklad_ucebni_text.pdf",
      "YouTube série: Elektrotechnika Základy - https://www.youtube.com/watch?v=HhLxoc_ECnA",
      "Libeos.cz - Elektrotechnika pro začátečníky - https://libeos.cz/k/elektrotechnika-pro-zacatecniky/",
      "Rekvalifikační kurzy Elektrikář - https://elektrovzdelani.cz",
      "Autoelektrika kurzy - https://www.autoexpertportal.cz/autoexpert-academy/",
      "Diagnostické centrum - Elektrotechnika pro automechaniky - https://www.diagnostickecentrum.cz/blog/zarazujeme-nove-skoleni-zaklady-elektrotechniky-pro-automechaniky-2/"
    ]
  }
};

export default function QuickCourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [completedPhases, setCompletedPhases] = useState<Record<string, boolean>>({});
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const course = QUICK_COURSES[courseId as keyof typeof QUICK_COURSES];

  if (!course) {
    return (
      <main className="min-vh-100 bg-dark text-white">
        <Container className="py-5">
          <div className="text-center">
            <h2>Kurz nenalezen</h2>
            <Link href="/quick-courses" className="btn btn-warning">
              Zpět na rychlokurzy
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`quickcourse_${courseId}_phases`);
    if (savedProgress) {
      setCompletedPhases(JSON.parse(savedProgress));
    }
  }, [courseId]);

  // Save progress to localStorage
  const saveProgress = (progress: Record<string, boolean>) => {
    localStorage.setItem(`quickcourse_${courseId}_phases`, JSON.stringify(progress));
  };

  const togglePhaseCompletion = (phaseId: string) => {
    const newProgress = { ...completedPhases, [phaseId]: !completedPhases[phaseId] };
    setCompletedPhases(newProgress);
    saveProgress(newProgress);
  };

  const completedCount = Object.values(completedPhases).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / course.phases.length) * 100);

  return (
    <main className="min-vh-100 bg-dark text-white pb-5">
      <nav className="navbar navbar-dark bg-black border-bottom border-secondary mb-4">
        <Container fluid>
          <Link href="/quick-courses" className="btn btn-outline-light btn-sm">
            ← Zpět na rychlokurzy
          </Link>
          <span className="navbar-brand mb-0 h5 mx-auto text-warning">
            ⚡ {course.title}
          </span>
          <div className="text-white-50 small">
            {completedCount}/{course.phases.length} dokončeno
          </div>
        </Container>
      </nav>

      <Container>
        <Row className="justify-content-center mb-4">
          <Col lg={10}>
            <Card className="bg-gradient border-0 shadow-lg mb-4"
                  style={{
                    background: 'linear-gradient(145deg, #2d3748 0%, #1a202c 100%)',
                    borderLeft: '4px solid #ffc107'
                  }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <Badge bg="warning" className="text-dark mb-2">
                      {course.category}
                    </Badge>
                    <h3 className="text-warning mb-1">{course.title}</h3>
                    <p className="text-white-50 mb-0">{course.subtitle}</p>
                  </div>
                  <div className="text-end">
                    <div className="text-warning fw-bold">{course.xp} XP</div>
                    <small className="text-muted">{course.estimatedTime}</small>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-white-50">Pokrok v kurzu</span>
                    <span className="text-warning">{progressPercent}%</span>
                  </div>
                  <ProgressBar now={progressPercent} variant="warning" style={{height: '8px'}} />
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  {course.tags.map(tag => (
                    <Badge key={tag} bg="secondary" className="text-dark">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={10}>
            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'overview')} className="mb-4">
              <Tab eventKey="overview" title="📚 Přehled kurzu">
                <Card className="bg-dark border-secondary">
                  <Card.Body>
                    <Accordion>
                      {course.phases.map((phase, index) => (
                        <Accordion.Item key={phase.id} eventKey={phase.id} className="bg-dark border-secondary">
                          <Accordion.Header className="text-white">
                            <div className="d-flex align-items-center w-100">
                              <input
                                type="checkbox"
                                className="me-3"
                                checked={completedPhases[phase.id] || false}
                                onChange={() => togglePhaseCompletion(phase.id)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span className={completedPhases[phase.id] ? 'text-success' : 'text-warning'}>
                                {phase.title}
                              </span>
                              {completedPhases[phase.id] && <Badge bg="success" className="ms-auto">✓ Dokončeno</Badge>}
                            </div>
                          </Accordion.Header>
                          <Accordion.Body className="text-white-50" style={{whiteSpace: 'pre-line'}}>
                            {phase.content}
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="resources" title="🔗 Zdroje">
                <Card className="bg-dark border-secondary">
                  <Card.Body>
                    <h5 className="text-warning mb-3">Doporučené zdroje a materiály</h5>
                    <ListGroup variant="flush">
                      {course.resources.map((resource, index) => (
                        <ListGroup.Item key={index} className="bg-dark border-secondary text-white-50">
                          {resource.startsWith('http') ? (
                            <a href={resource} target="_blank" rel="noopener noreferrer" className="text-info">
                              {resource}
                            </a>
                          ) : (
                            resource
                          )}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="progress" title="📊 Pokrok">
                <Card className="bg-dark border-secondary">
                  <Card.Body>
                    <h5 className="text-warning mb-3">Tvůj pokrok v kurzu</h5>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Celkový pokrok</span>
                        <span className="text-warning fw-bold">{progressPercent}%</span>
                      </div>
                      <ProgressBar now={progressPercent} variant="warning" style={{height: '12px'}} />
                    </div>

                    <div className="row g-3">
                      {course.phases.map((phase, index) => (
                        <div key={phase.id} className="col-md-6">
                          <Card className={`border ${completedPhases[phase.id] ? 'border-success' : 'border-secondary'}`}>
                            <Card.Body className="p-3">
                              <div className="d-flex align-items-center">
                                <div className={`rounded-circle me-3 ${completedPhases[phase.id] ? 'bg-success' : 'bg-secondary'}`} style={{width: '20px', height: '20px'}}>
                                  {completedPhases[phase.id] && <span className="text-white fw-bold" style={{fontSize: '12px'}}>✓</span>}
                                </div>
                                <div>
                                  <small className="text-muted">Fáze {index + 1}</small>
                                  <div className={`small ${completedPhases[phase.id] ? 'text-success' : 'text-white-50'}`}>
                                    {phase.title.substring(0, 30)}...
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                    </div>

                    {progressPercent === 100 && (
                      <div className="text-center mt-4">
                        <Button variant="success" size="lg" onClick={() => setShowCompleteModal(true)}>
                          🎉 DOKONČIT KURZ A ZÍSKAT {course.xp} XP
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>

      {/* Completion Modal */}
      <Modal show={showCompleteModal} onHide={() => setShowCompleteModal(false)} centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>🎉 Kurz dokončen!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="fs-1 mb-3">⚡</div>
          <h4 className="text-success mb-3">Gratulujeme!</h4>
          <p className="mb-3">Úspěšně jsi dokončil rychlokurz "{course.title}"</p>
          <div className="bg-warning bg-opacity-10 p-3 rounded mb-3">
            <div className="text-warning fw-bold fs-4">+{course.xp} XP</div>
            <small className="text-muted">Získáno zkušenostních bodů</small>
          </div>
          <Button variant="success" onClick={() => setShowCompleteModal(false)}>
            Pokračovat
          </Button>
        </Modal.Body>
      </Modal>
    </main>
  );
}