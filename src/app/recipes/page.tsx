"use client";

import { Container, Row, Col } from 'react-bootstrap';
import dynamic from 'next/dynamic';

const RecipesSection = dynamic(() => import('@/components/RecipesSection'), {
  ssr: false
});

export default function RecipesPage() {
  return (
    <main className="min-vh-100" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      <Container fluid className="px-4 py-4">
        <Row className="mb-4">
          <Col>
            <h1 className="text-white fw-bold d-flex align-items-center gap-3">
              👨‍🍳 Recepty
              <span className="badge bg-warning text-dark">Kuchyně</span>
            </h1>
            <p className="text-white-50">
             Objevte chutné recepty pro každou příležitost - od rychlých snídaní po slavnostní večeře.
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <RecipesSection />
          </Col>
        </Row>
      </Container>
    </main>
  );
}
