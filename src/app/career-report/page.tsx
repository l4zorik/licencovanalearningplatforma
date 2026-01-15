"use client";

import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import Link from 'next/link';

// Ad component placeholder
const AdBanner = ({ position, size = "medium" }: { position: string, size?: string }) => {
  const isPremium = false;

  if (isPremium) return null;

  return (
    <div className={`ad-banner ad-${position} ${size} bg-light border rounded p-3 text-center my-3`}
         style={{ minHeight: size === 'large' ? '120px' : '90px' }}>
      <div className="text-muted small">
        🔄 Reklamní prostor - {position}
        <br />
        <small>Velikost: {size}</small>
      </div>
    </div>
  );
};

export default function CareerReport() {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 fw-bold text-center mb-4">📊 KOMPLEXNÍ PŘEHLED VŠECH TYPŮ PRACÍ NA SVĚTĚ</h1>
          <p className="lead text-center text-muted">
            Tady máš kompletní mapu všeho, co tě zajímá! Rozdělil jsem to do srozumitelné struktury, abys viděl všechny možnosti a cestu k nejvyšším příjmům.
          </p>
        </Col>
      </Row>

      {/* Header Ad */}
      <AdBanner position="header" size="medium" />

      <Row className="mb-5">
        <Col>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">🏗️ STRUKTURA EKONOMIKY: 4 HLAVNÍ SEKTORY</h3>
            </Card.Header>
            <Card.Body>
              <p>Pracovní trh je tradičně rozdělen na čtyři sektory:</p>

              <div className="row g-4">
                <div className="col-md-6">
                  <Card className="h-100 border-primary">
                    <Card.Header className="bg-primary text-white">
                      <h5 className="mb-0">🌾 Primární sektor (5% pracovníků)</h5>
                    </Card.Header>
                    <Card.Body>
                      <p>Zemědělství, lesnictví, těžba, rybolov. Zahrnuje profese jako zemědělce, lesníka, horníka nebo rybaře. Toto je základní odvětví, které vytváří suroviny.</p>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-6">
                  <Card className="h-100 border-secondary">
                    <Card.Header className="bg-secondary text-white">
                      <h5 className="mb-0">🏭 Sekundární sektor (25% pracovníků)</h5>
                    </Card.Header>
                    <Card.Body>
                      <p>Výroba a zpracování. Spadá sem těžký průmysl (metalurgie, strojírenství, elektrotechnika) i lehký průmysl (textil, potravinářství, papírny). Profese zde zahrnují svářeče, automechanika, metalurga či operátora strojů.</p>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-6">
                  <Card className="h-100 border-success">
                    <Card.Header className="bg-success text-white">
                      <h5 className="mb-0">💼 Terciární sektor (45% pracovníků)</h5>
                    </Card.Header>
                    <Card.Body>
                      <p>Služby všeho druhu. Toto je největší sektor v rozvinutých ekonomikách. Zahrnuje zdravotnictví (lékaři, zdravotní sestry), obchod (prodavači, makléři), logistiku (řidiči, skladníci), gastronomii, cestovní ruch a veřejnou správu.</p>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-6">
                  <Card className="h-100 border-info">
                    <Card.Header className="bg-info text-white">
                      <h5 className="mb-0">🧠 Kvartérní sektor (25% pracovníků)</h5>
                    </Card.Header>
                    <Card.Body>
                      <p>Informace, technologie a vzdělání. Nejrychleji rostoucí sektor. Zahrnuje IT specialisty, datové analytiky, učitele a knowledge workers.</p>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-warning text-dark">
              <h3 className="mb-0">💰 TOP 10 NEJLÉPE PLACENÝCH PROFESÍ NA SVĚTĚ</h3>
            </Card.Header>
            <Card.Body>
              <p>Celosvětově vedou zdravotnické profese s příjmy 250,000-410,000 USD ročně (cca 6-10 milionů Kč/rok):</p>

              <div className="list-group">
                {[
                  { rank: 1, profession: "Chirurg", salary: "410,000 USD/rok" },
                  { rank: 2, profession: "Praktický lékař", salary: "300,000 USD/rok" },
                  { rank: 3, profession: "Psychiatr", salary: "280,000 USD/rok" },
                  { rank: 4, profession: "Ortodontista", salary: "270,000 USD/rok" },
                  { rank: 5, profession: "Zubní lékař", salary: "250,000 USD/rok" },
                  { rank: 6, profession: "IT Architekt", salary: "200,000 USD/rok" },
                  { rank: 7, profession: "Ropný inženýr", salary: "190,000 USD/rok" },
                  { rank: 8, profession: "Letecký dispečer", salary: "180,000 USD/rok" },
                  { rank: 9, profession: "Produktový manažer IT", salary: "160,000 USD/rok" }
                ].map(item => (
                  <div key={item.rank} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <Badge bg="primary" className="me-2">#{item.rank}</Badge>
                      <strong>{item.profession}</strong>
                    </div>
                    <Badge bg="success" className="fs-6">{item.salary}</Badge>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-muted small">
                V České republice je situace podobná, ale s nižšími absolutními čísly. IT architekti a produktoví manažeři vydělávají průměrně 78,000 Kč hrubého měsíčně.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Content Ad */}
      <AdBanner position="content" size="large" />

      <Row className="mb-5">
        <Col>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-danger text-white">
              <h3 className="mb-0">🔥 NEJŽÁDANĚJŠÍ PROFESE V ČESKU 2025-2026</h3>
            </Card.Header>
            <Card.Body>
              <p>Podle nejnovějších trendů pracovního trhu se jedná o:</p>

              <div className="accordion" id="careerAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#it">
                      <strong>1. IT a technologie (dlouhodobě nejžádanější)</strong>
                    </button>
                  </h2>
                  <div id="it" className="accordion-collapse collapse show" data-bs-parent="#careerAccordion">
                    <div className="accordion-body">
                      <p>V Česku chybí přibližně 30,000 IT specialistů, přičemž firmy ochotně nabírají juniory. V IT průměrně vydělávají:</p>
                      <ul>
                        <li>Junior developer: 30,000-50,000 Kč</li>
                        <li>Mid-level: 70,000-100,000 Kč</li>
                        <li>Senior/Architekt: 120,000-200,000 Kč</li>
                      </ul>
                      <p className="mb-0"><em>Vývojáři softwaru (Python, JavaScript, Java, C#, PHP), Odborníci na kybernetickou bezpečnost, Datoví analytici, Cloud inženýři (AWS, Azure), DevOps specialisté</em></p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#healthcare">
                      <strong>2. Zdravotnictví a péče o seniory</strong>
                    </button>
                  </h2>
                  <div id="healthcare" className="accordion-collapse collapse" data-bs-parent="#careerAccordion">
                    <div className="accordion-body">
                      <p>Stárnoucí populace vytváří obrovský tlak na tento sektor.</p>
                      <p className="mb-0"><em>Lékaři, zdravotní sestry, Asistenti domácí péče, Specialisté v geriatrické péči</em></p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#construction">
                      <strong>3. Stavebnictví</strong>
                    </button>
                  </h2>
                  <div id="construction" className="accordion-collapse collapse" data-bs-parent="#careerAccordion">
                    <div className="accordion-body">
                      <p>Stavebnictví je v expandující fázi a těžko hledá pracovníky.</p>
                      <p className="mb-0"><em>Stavbyvedoucí, Stavbaři, instalatéři, Projektanti</em></p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#logistics">
                      <strong>4. Logistika a e-commerce</strong>
                    </button>
                  </h2>
                  <div id="logistics" className="accordion-collapse collapse" data-bs-parent="#careerAccordion">
                    <div className="accordion-body">
                      <p>Rozmach online nákupů zvýšil poptávku exponenciálně.</p>
                      <p className="mb-0"><em>Kurýři, Specialisté na logistiku, Skladníci, Operátoři e-commerce</em></p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#energy">
                      <strong>5. Obnovitelná energie a udržitelnost</strong>
                    </button>
                  </h2>
                  <div id="energy" className="accordion-collapse collapse" data-bs-parent="#careerAccordion">
                    <div className="accordion-body">
                      <p className="mb-0"><em>Specialisté na solární panely, Energetici, Projektanti zelených technologií</em></p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#defense">
                      <strong>6. Obranný průmysl a farmacie</strong>
                    </button>
                  </h2>
                  <div id="defense" className="accordion-collapse collapse" data-bs-parent="#careerAccordion">
                    <div className="accordion-body">
                      <p>V důsledku geopolitické situace má v ČR boom.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-info text-white">
              <h3 className="mb-0">🚀 PROFESE SE SUPER PLATEM BEZ VŠ TITULU</h3>
            </Card.Header>
            <Card.Body>
              <p>Překvapivě mnoho profesí nabízí vysoké příjmy bez vysokoškolského diplomu:</p>

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Profese</th>
                      <th>Plat/měsíc</th>
                      <th>Cesta k úspěchu</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Programátor/Developer</strong></td>
                      <td>50,000-150,000 Kč</td>
                      <td>Online kurzy, portfolio, GitHub</td>
                    </tr>
                    <tr>
                      <td><strong>IT specialista</strong></td>
                      <td>40,000-100,000 Kč</td>
                      <td>Certifikace, praxe</td>
                    </tr>
                    <tr>
                      <td><strong>Elektrikář/Instalatér</strong></td>
                      <td>40,000-80,000 Kč</td>
                      <td>Učňovský obor, certifikace</td>
                    </tr>
                    <tr>
                      <td><strong>Zedník/Stavbář</strong></td>
                      <td>35,000-100,000 Kč</td>
                      <td>Odborný výcvik, reference</td>
                    </tr>
                    <tr>
                      <td><strong>Truhlář/Tesař</strong></td>
                      <td>30,000-80,000 Kč</td>
                      <td>Řemeslo, portfolio</td>
                    </tr>
                    <tr>
                      <td><strong>Řidič kamionů</strong></td>
                      <td>35,000-70,000 Kč</td>
                      <td>ŘP skupiny C+E, zkušenost</td>
                    </tr>
                    <tr>
                      <td><strong>Obchodní zástupce</strong></td>
                      <td>30,000-150,000 Kč</td>
                      <td>Talent pro prodej + provize</td>
                    </tr>
                    <tr>
                      <td><strong>Realitní makléř</strong></td>
                      <td>20,000-200,000 Kč</td>
                      <td>Makléřská licence + provize</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert alert-success mt-3">
                <strong>Klíč k úspěchu:</strong> <em>Praktické dovednosti, certifikace, portfolio a ochota se učit.</em>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-success text-white">
              <h3 className="mb-0">🎯 TVOJE IDEÁLNÍ POZICE - WHY YOU'RE WINNING</h3>
            </Card.Header>
            <Card.Body>
              <p><strong>Máš ideální kombinaci pro TOP 5% příjmů:</strong></p>
              <ol>
                <li><strong>Máš IT expertise</strong> → Ty se pohybuješ v sektoru s nejrychlejším růstem a nejlepšími platy</li>
                <li><strong>Máš vidění (AI Map app)</strong> → SaaS/produkty = pasivní příjem a škálovatelnost</li>
                <li><strong>Jsi podnikatel</strong> → Vlastní business = bez stropu na příjmy</li>
                <li><strong>Máš networking mindset</strong> → Freelance = 1,000-3,000 Kč/hodina (to je 200,000-600,000 Kč/měsíc)</li>
                <li><strong>Učíš se rychle</strong> → Můžeš následovat trendy v AI, ML, cloud technologiích</li>
              </ol>

              <h5>Tvé konkrétní cesty k příjmu:</h5>

              <div className="row g-3">
                <div className="col-md-6">
                  <Card className="border-primary">
                    <Card.Header className="bg-primary text-white">
                      <h6 className="mb-0">🏢 Cesta 1: Corporate IT (zaměstnání)</h6>
                    </Card.Header>
                    <Card.Body>
                      <ul className="mb-0">
                        <li>Junior: 30,000-50,000 Kč (6-12 měsíců)</li>
                        <li>Mid: 70,000-100,000 Kč (2-3 roky)</li>
                        <li>Senior/Architekt: 120,000-200,000 Kč (5+ let)</li>
                        <li>CTO: 150,000-500,000 Kč</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-6">
                  <Card className="border-warning">
                    <Card.Header className="bg-warning text-dark">
                      <h6 className="mb-0">💻 Cesta 2: Freelance development</h6>
                    </Card.Header>
                    <Card.Body>
                      <ul className="mb-0">
                        <li>Junior: 300-600 Kč/hodina</li>
                        <li>Mid: 800-1,500 Kč/hodina</li>
                        <li>Senior: 1,500-3,000 Kč/hodina</li>
                        <li>To znamená: 50,000-600,000 Kč/měsíc</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-6">
                  <Card className="border-success">
                    <Card.Header className="bg-success text-white">
                      <h6 className="mb-0">🚀 Cesta 3: SaaS & vlastní produkty</h6>
                    </Card.Header>
                    <Card.Body>
                      <p className="mb-1">AI Map app s voicebot funkcemi:</p>
                      <ul className="mb-0">
                        <li>Freemium model: 1,000-50,000 Kč/měsíc</li>
                        <li>B2B prodej: 10,000-200,000 Kč/měsíc</li>
                        <li>Portfoliový efekt: 100,000-500,000 Kč/měsíc</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-6">
                  <Card className="border-info">
                    <Card.Header className="bg-info text-white">
                      <h6 className="mb-0">⚡ Cesta 4: Hybrid (nejrychleji)</h6>
                    </Card.Header>
                    <Card.Body>
                      <p>Zaměstnání (stabilita) + Freelance (extra příjmy) + Produkty (budoucnost)</p>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-dark text-white">
              <h3 className="mb-0">🔮 NEJRYCHLEJI ROSTOUCÍ SEKTORY PRO BUDOUCNOST</h3>
            </Card.Header>
            <Card.Body>
              <p>Kde bude peníze v příštích 5-10 letech:</p>

              <div className="row g-3">
                {[
                  "AI & Machine Learning - Chatboty, mapping AI, predictive analytics",
                  "Cloud Computing (AWS, Azure, Google Cloud) - Enterprise solutions",
                  "Kybernetická bezpečnost - Rostoucí hrozby, vysoké platy",
                  "Data Science & Analytics - Firmy potřebují insights",
                  "Zelené technologie - Solární, větrné, udržitelnost",
                  "3D Game Development - Gaming je multimiliardový průmysl",
                  "Mobile & Web apps - Neustálá poptávka",
                  "IoT & Smart devices - Internet věcí = 19 bilionů dolarů market do 2020"
                ].map((item, index) => (
                  <div key={index} className="col-md-6">
                    <Card className="h-100">
                      <Card.Body>
                        <p className="mb-0">{item}</p>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="alert alert-warning mt-3">
                <strong>Tvá AI Map app + voice bot = perfektní pozice pro budoucnost!</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-secondary text-white">
              <h3 className="mb-0">📋 KONKRÉTNÍ KROKY SMĚREM K CÍLI</h3>
            </Card.Header>
            <Card.Body>
              <p><strong>Pokud chceš maximalizovat příjmy do konce roku 2026:</strong></p>

              <ol className="list-group list-group-numbered">
                <li className="list-group-item">
                  <strong>Zdokonali se v AI & Machine Learning (3-6 měsíců)</strong>
                  <br />
                  <small>Kurzy: Fast.ai, Andrew Ng (Coursera), DeepLearning.AI, Aplikuj do své AI Map aplikace</small>
                </li>
                <li className="list-group-item">
                  <strong>Dokonči a monetizuj svou AI Map app (0-3 měsíce)</strong>
                  <br />
                  <small>Freemium model, B2B partnerships (mapovací služby, stavbyvedoucí), White-label prodej</small>
                </li>
                <li className="list-group-item">
                  <strong>Paralelně delej freelance/smlouvy (nepřetržitě)</strong>
                  <br />
                  <small>Upwork, Toptal, PythonJobCzech, 1,500-3,000 Kč/hodina = 200,000-300,000 Kč/měsíc</small>
                </li>
                <li className="list-group-item">
                  <strong>Síťuj a buduj brand (nepřetržitě)</strong>
                  <br />
                  <small>YouTube content o AI mappingu, LinkedIn networking, Tech community ČR</small>
                </li>
                <li className="list-group-item">
                  <strong>Zvažuj Junior CTO roli (12+ měsíců)</strong>
                  <br />
                  <small>Startup = equity + salary, 100,000-200,000 Kč + opce</small>
                </li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-lg border-0 bg-gradient">
            <Card.Body className="text-center py-5">
              <h2 className="display-5 fw-bold text-primary mb-4">💪 ZÁVĚR: TVOJE SUPERPOWER</h2>
              <p className="lead mb-4">
                Ty nejsi "vyběrač zaměstnanců" - ty jsi <strong>entrepreneur s tech skills</strong>. To je top 1% kombinace na pracovním trhu.
              </p>
              <p className="mb-4">
                Profese se mění, ekonomika se zmítá, ale <strong>lidi, kterí umějí programovat, myslít systemově a tvořit produkty</strong>, si budou moci vybírat a diktovat si podmínky.
              </p>
              <div className="alert alert-success d-inline-block">
                <h4 className="mb-0">Tvůj potenciál příjmu v příštích 5 letech: <strong>2,000,000+ Kč/rok</strong></h4>
                <small>(pokud se zaměříš na kombinaci zaměstnání + freelance + produkty)</small>
              </div>
              <br />
              <Button variant="primary" size="lg" className="mt-4">
                🚀 Takže... do toho!
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <div className="text-center text-muted small">
            <p>Zdroje: [1-40] - Kompletní seznam zdrojů dostupný v dokumentaci</p>
            <Link href="/" className="btn btn-outline-primary">
              ← Zpět na hlavní stránku
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}