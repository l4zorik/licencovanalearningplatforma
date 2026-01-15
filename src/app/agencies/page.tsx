"use client";

import dynamic from 'next/dynamic';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const AgencySection = dynamic(() => import('@/components/AgencySection'), {
  ssr: false
});

export default function AgenciesPage() {
  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="mb-1">🏢 Pracovní agentury ČR</h2>
              <p className="text-muted mb-0">
                Přehled českých pracovních agentur a nabídek práce s ubytováním
              </p>
            </div>
            <Link href="/" className="text-decoration-none">
              <Button variant="outline-secondary">
                ← Zpět na hlavní stránku
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body className="bg-light">
              <Row className="g-3">
                <Col md={4}>
                  <Card className="h-100 text-center">
                    <Card.Body>
                      <div className="display-6 mb-2">🇨🇿</div>
                      <Card.Title className="h6">České agentury</Card.Title>
                      <Card.Text className="small text-muted">
                        12+ ověřených pracovních agentur
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 text-center">
                    <Card.Body>
                      <div className="display-6 mb-2">💼</div>
                      <Card.Title className="h6">Nabídky práce</Card.Title>
                      <Card.Text className="small text-muted">
                        20+ aktuálních nabídek s ubytováním
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 text-center">
                    <Card.Body>
                      <div className="display-6 mb-2">🌍</div>
                      <Card.Title className="h6">Pro cizince</Card.Title>
                      <Card.Text className="small text-muted">
                        Agentury přátelské k zahraničním pracovníkům
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <AgencySection />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <Card.Title className="mb-0 h6">💡 Tipy pro hledání práce přes agentury</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={4}>
                  <Card className="bg-light h-100">
                    <Card.Body>
                      <h6>📋 Připravte si dokumenty</h6>
                      <ul className="mb-0 small">
                        <li>Životopis (CV) v češtině</li>
                        <li>Průkaz totožnosti</li>
                        <li>Pracovní povolení (pro cizince)</li>
                        <li>Certifikáty a osvědčení</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="bg-light h-100">
                    <Card.Body>
                      <h6>🤝 Jak komunikovat s agenturou</h6>
                      <ul className="mb-0 small">
                        <li>Buďte upřímní o svých schopnostech</li>
                        <li>Zajímejte se o detaily pozice</li>
                        <li>Ptejte se na ubytování a dopravu</li>
                        <li>Zjišťujte podmínky před nástupem</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="bg-light h-100">
                    <Card.Body>
                      <h6>⚖️ Vaše práva</h6>
                      <ul className="mb-0 small">
                        <li>Minimální mzda 2026: 20 800 Kč</li>
                        <li>Pravidelná pracovní doba 40h/týden</li>
                        <li>Náhrada cestovních nákladů</li>
                        <li>Zajištění ubytování dle zákona</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}