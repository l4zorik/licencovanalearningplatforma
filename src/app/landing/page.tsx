"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { FaRocket, FaBrain, FaChartLine, FaTrophy, FaBook, FaUsers, FaArrowRight, FaStar, FaCheck, FaChevronDown } from "react-icons/fa";

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <Container fluid className="px-4">
          <Row className="align-items-center justify-content-between">
            <Col xs="auto">
              <div className="logo">
                <span className="logo-icon">🚀</span>
                <span className="logo-text">TOMAS</span>
              </div>
            </Col>
            <Col xs="auto" className="d-none d-lg-flex">
              <nav className="landing-nav">
                <button onClick={() => scrollToSection("features")}>Funkce</button>
                <button onClick={() => scrollToSection("preview")}>Obsah</button>
                <button onClick={() => scrollToSection("testimonials")}>Recenze</button>
                <button onClick={() => scrollToSection("faq")}>FAQ</button>
              </nav>
            </Col>
            <Col xs="auto">
              <Button variant="outline-light" className="btn-nav">Přihlásit se</Button>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-background">
          <div className="hero-glow glow-1"></div>
          <div className="hero-glow glow-2"></div>
          <div className="hero-glow glow-3"></div>
        </div>
        <Container fluid className="px-4">
          <Row className="justify-content-center">
            <Col lg={10} xl={8} className="text-center">
              <Badge className="hero-badge mb-4">
                <span className="badge-dot"></span>
                Nové: AI Personalizované kariérní doporučení
              </Badge>
              <h1 className="hero-title">
                Vzdělávej se,
                <span className="title-gradient"> roste</span>,
                <br />
                <span className="title-gradient"> uspi se</span>
              </h1>
              <p className="hero-subtitle">
                Komplexní platforma pro kariérní rozvoj, vzdělávání a osobní růst.
                S AI průvodcem, který ti rozumí.
              </p>
              <div className="hero-cta-group">
                <Button className="btn-primary-landing" onClick={() => scrollToSection("features")}>
                  Začni zdarma <FaArrowRight className="ms-2" />
                </Button>
                <Button variant="outline-light" className="btn-secondary-landing">
                  Prozkoumat platformu
                </Button>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">10 000+</span>
                  <span className="stat-label">Uživatelů</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">150+</span>
                  <span className="stat-label">Kurzů</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">4.8 ★</span>
                  <span className="stat-label">Hodnocení</span>
                </div>
              </div>
            </Col>
          </Row>
          <div className="scroll-indicator" onClick={() => scrollToSection("features")}>
            <FaChevronDown />
          </div>
        </Container>
      </section>

      {/* Value Proposition Section */}
      <section className="value-section" id="features">
        <Container fluid className="px-4">
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <Badge className="section-badge mb-3">Proč právě my</Badge>
              <h2 className="section-title">Tvoje cesta k úspěchu začíná zde</h2>
              <p className="section-subtitle">
                Objev, jak ti naše platforma pomůže dosáhnout tvých cílů rychleji a efektivněji
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="value-card">
                <div className="value-icon-wrapper icon-orange">
                  <FaBrain />
                </div>
                <Card.Body>
                  <h3 className="value-title">AI Průvodce</h3>
                  <p className="value-text">
                    Inteligentní asistent, který analyzuje tvé cíle a přizpůsobuje doporučení tvým potřebám
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="value-card">
                <div className="value-icon-wrapper icon-red">
                  <FaTrophy />
                </div>
                <Card.Body>
                  <h3 className="value-title">Gamifikace</h3>
                  <p className="value-text">
                    Mise, achievementy a levely, které tě motivují k neustálému růstu a rozvoji
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="value-card">
                <div className="value-icon-wrapper icon-yellow">
                  <FaChartLine />
                </div>
                <Card.Body>
                  <h3 className="value-title">Kariérní Růst</h3>
                  <p className="value-text">
                    Jasná cesta k tvému kariérnímu cíli s personalizovaným plánem a sledováním pokroku
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="value-card">
                <div className="value-icon-wrapper icon-orange-red">
                  <FaBook />
                </div>
                <Card.Body>
                  <h3 className="value-title">Kvalitní Obsah</h3>
                  <p className="value-text">
                    Kurzy a články od expertů, aktualizované podle nejnovějších trendů a potřeb trhu
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container fluid className="px-4">
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <Badge className="section-badge mb-3">Co nabízíme</Badge>
              <h2 className="section-title">Vše, co potřebuješ pro svůj rozvoj</h2>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="feature-card">
                <div className="feature-icon">🎯</div>
                <Card.Body>
                  <h4>AI Kariérní Poradce</h4>
                  <p>Pokročilý AI systém pro personalizované kariérní doporučení a analýzu dovedností</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="feature-card">
                <div className="feature-icon">📚</div>
                <Card.Body>
                  <h4>Vzdělávací Kurzy</h4>
                  <p>150+ kurzů od základů po pokročilé techniky s interaktivními lekcemi</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="feature-card">
                <div className="feature-icon">⚡</div>
                <Card.Body>
                  <h4>Systém Misí</h4>
                  <p>Denní, týdenní a měsíční mise pro systematický a měřitelný rozvoj</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="feature-card">
                <div className="feature-icon">💼</div>
                <Card.Body>
                  <h4>Job Board</h4>
                  <p>Přehled nabídek práce s filtrováním podle lokality, platu a dovedností</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="feature-card">
                <div className="feature-icon">📰</div>
                <Card.Body>
                  <h4>Články a Novinky</h4>
                  <p>Pravidelně aktualizovaný obsah o AI, technologiích a kariéře</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="feature-card">
                <div className="feature-icon">🏆</div>
                <Card.Body>
                  <h4>Achievement System</h4>
                  <p>Sbírej achievementy za splněné cíle a sdílej své úspěchy</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Content Preview Section */}
      <section className="preview-section" id="preview">
        <Container fluid className="px-4">
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <Badge className="section-badge mb-3">Ukázka obsahu</Badge>
              <h2 className="section-title">Co na platformě najdeš</h2>
              <p className="section-subtitle">
                Kvalitní obsah vytvořený experty pro tvůj kariérní a osobní rozvoj
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={4}>
              <Card className="preview-card">
                <div className="preview-image ai-image">
                  <span className="preview-category">AI & Tech</span>
                </div>
                <Card.Body>
                  <Badge className="badge-ai mb-2">Populární</Badge>
                  <h5>Agentic Design Patterns: 21 kapitol o budování AI agentů</h5>
                  <p className="preview-meta">12 min čtení</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="preview-card">
                <div className="preview-image career-image">
                  <span className="preview-category">Kariéra</span>
                </div>
                <Card.Body>
                  <Badge className="badge-career mb-2">Nový kurz</Badge>
                  <h5>Komplexní kariérní report: Platy, cestami a příležitosti</h5>
                  <p className="preview-meta">15 min čtení</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="preview-card">
                <div className="preview-image gamification-image">
                  <span className="preview-category">Gamifikace</span>
                </div>
                <Card.Body>
                  <Badge className="badge-gamification mb-2">Doporučeno</Badge>
                  <h5>Implementace misí a achievementů v Tomas Platform</h5>
                  <p className="preview-meta">10 min čtení</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <Col xs="auto">
              <Button variant="outline-warning" className="btn-preview">
                Prozkoumat veškerý obsah <FaArrowRight className="ms-2" />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <Container fluid className="px-4">
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <Badge className="section-badge mb-3">Recenze uživatelů</Badge>
              <h2 className="section-title">Co říkají naši uživatelé</h2>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={4}>
              <Card className="testimonial-card">
                <Card.Body>
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-text">
                    "Jako programátor v IT jsem hledal platformu, která mi pomůže s kariérním postupem. 
                    AI asistent je skvělý a kurz o AI mi pomohl získat novou práci!"
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">JK</div>
                    <div>
                      <div className="author-name">Jan K.</div>
                      <div className="author-role">Senior Developer, Praha</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="testimonial-card">
                <Card.Body>
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-text">
                    "Systém misí a achievementů mě konečně donutil dokončit kurzy, které jsem začal. 
                    Je to jako hra, ale učím se skutečné dovednosti pro kariéru."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">MS</div>
                    <div>
                      <div className="author-name">Marie S.</div>
                      <div className="author-role">Marketing Specialist, Brno</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="testimonial-card">
                <Card.Body>
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-text">
                    "Články o AI a nových technologiích jsou vždy aktuální. 
                    Platforma se stala mým denním zdrojem inspirace a vzdělávání."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">TM</div>
                    <div>
                      <div className="author-name">Tomáš M.</div>
                      <div className="author-role">Student, Ostrava</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <Container fluid className="px-4">
          <Row className="justify-content-center">
            <Col md={6} lg={3} className="text-center mb-4">
              <div className="stat-number-large">10 000+</div>
              <div className="stat-label-large">Registrovaných uživatelů</div>
            </Col>
            <Col md={6} lg={3} className="text-center mb-4">
              <div className="stat-number-large">150+</div>
              <div className="stat-label-large">Vzdělávacích kurzů</div>
            </Col>
            <Col md={6} lg={3} className="text-center mb-4">
              <div className="stat-number-large">25 000+</div>
              <div className="stat-label-large">Splněných misí</div>
            </Col>
            <Col md={6} lg={3} className="text-center mb-4">
              <div className="stat-number-large">4.8 ★</div>
              <div className="stat-label-large">Průměrné hodnocení</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <Container fluid className="px-4">
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <Badge className="section-badge mb-3">Časté otázky</Badge>
              <h2 className="section-title">Máte otázky? Máme odpovědi</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="faq-list">
                <Card className="faq-item">
                  <Card.Header className="faq-header">
                    <span>Kolik platforma stojí?</span>
                    <FaChevronDown className="faq-icon" />
                  </Card.Header>
                  <Card.Body className="faq-body">
                    <p>Základní verze platformy je zcela zdarma a zahrnuje přístup k více než 50 kurzům, 
                    základnímu AI asistentovi a sledování pokroku. Premium verze za 199 Kč/měsíc 
                    odemkne všechny kurzy, pokročilého AI poradce a prioritní podporu.</p>
                  </Card.Body>
                </Card>
                <Card className="faq-item">
                  <Card.Header className="faq-header">
                    <span>Jak dlouho trvá dokončení kurzu?</span>
                    <FaChevronDown className="faq-icon" />
                  </Card.Header>
                  <Card.Body className="faq-body">
                    <p>Většina kurzů je navržena tak, aby je bylo možné dokončit za 2-4 hodiny. 
                    Můžete se učit vlastním tempem - kurz můžete kdykoli pozastavit a pokračovat později.</p>
                  </Card.Body>
                </Card>
                <Card className="faq-item">
                  <Card.Header className="faq-header">
                    <span>Je obsah aktuální pro český trh?</span>
                    <FaChevronDown className="faq-icon" />
                  </Card.Header>
                  <Card.Body className="faq-body">
                    <p>Ano! Veškerý obsah je vytvářen s ohledem na český trh práce. 
                    Kurzy a články reflektují aktuální trendy, požadavky zaměstnavatelů 
                    a platové podmínky v ČR.</p>
                  </Card.Body>
                </Card>
                <Card className="faq-item">
                  <Card.Header className="faq-header">
                    <span>Mohu používat platformu na mobilu?</span>
                    <FaChevronDown className="faq-icon" />
                  </Card.Header>
                  <Card.Body className="faq-body">
                    <p>Ano, platforma je plně responzivní a optimalizovaná pro mobilní zařízení. 
                    Máme také dedikovanou mobilní aplikaci pro iOS i Android.</p>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <Container fluid className="px-4">
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="final-cta-title">Připravena růst?</h2>
              <p className="final-cta-text">
                Začni svou cestu k úspěchu ještě dnes. Registrace je zdarma a zabere méně než minutu.
              </p>
              <Button className="btn-primary-landing btn-large">
                Vytvořit účet zdarma <FaArrowRight className="ms-2" />
              </Button>
              <p className="final-cta-subtext">Bez závazků · Žádná kreditní karta · Zrušení kdykoliv</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <Container fluid className="px-4">
          <Row className="justify-content-between align-items-center">
            <Col xs="auto">
              <div className="footer-logo">
                <span className="logo-icon">🚀</span>
                <span className="logo-text">TOMAS</span>
              </div>
            </Col>
            <Col xs="auto">
              <div className="footer-links">
                <a href="#">O nás</a>
                <a href="#">Kontakt</a>
                <a href="#">Zásady ochrany osobních údajů</a>
                <a href="#">Obchodní podmínky</a>
              </div>
            </Col>
            <Col xs="auto">
              <div className="footer-social">
                <a href="#" className="social-link">𝕏</a>
                <a href="#" className="social-link">in</a>
                <a href="#" className="social-link">📘</a>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="text-center">
              <p className="footer-copyright">
                © 2026 Tomas Learning Platform. Všechna práva vyhrazena.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
