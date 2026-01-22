"use client";

import { Container, Row, Col } from 'react-bootstrap';
import dynamic from 'next/dynamic';

const CareerAdviceSection = dynamic(() => import('@/components/CareerAdviceSection'), {
  ssr: false
});

export default function CareerAdvicePage() {
  return (
    <main className="min-vh-100" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      <Container fluid className="px-4 py-4">
        <Row className="mb-4">
          <Col>
            <h1 className="text-white fw-bold d-flex align-items-center gap-3">
              💡 Kariérní Rady
              <span className="badge bg-info">Inspirace</span>
            </h1>
            <p className="text-white-50">
              Praktické tipy a rady pro vaši kariéru od úspěšných profesionálů.
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <CareerAdviceSection />
          </Col>
        </Row>
      </Container>
    </main>
  );
}
