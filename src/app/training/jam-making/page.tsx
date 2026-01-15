"use client";

import { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, ProgressBar } from "react-bootstrap";
import Link from "next/link";

const JAM_MODULES = [
    { id: 1, title: "Základy konzervování", icon: "🫙", duration: "30 min", completed: false, desc: "Sterilizace, teploty, hygienické postupy" },
    { id: 2, title: "Jahodový džem", icon: "🍓", duration: "45 min", completed: false, desc: "Klasický český jahodový džem" },
    { id: 3, title: "Meruňková marmeláda", icon: "🍊", duration: "50 min", completed: false, desc: "Meruňky s vanilkou a skořicí" },
    { id: 4, title: "Ovocné kompoty", icon: "🥫", duration: "40 min", completed: false, desc: "Kompoty z různého ovoce" },
    { id: 5, title: "Sirupy a želé", icon: "🍯", duration: "35 min", completed: false, desc: "Ovocné sirupy a průhledné želé" },
    { id: 6, title: "Zavařeniny na zimu", icon: "❄️", duration: "60 min", completed: false, desc: "Příprava na dlouhé skladování" }
];

export default function JamMakingPage() {
    const [completed, setCompleted] = useState<Set<number>>(new Set());
    const progress = Math.round((completed.size / JAM_MODULES.length) * 100);

    return (
        <main className="min-vh-100 bg-dark text-white pb-5">
            <nav className="navbar navbar-dark bg-black border-bottom border-danger mb-4">
                <Container fluid>
                    <Link href="/training" className="btn btn-outline-light btn-sm">← Exit Training</Link>
                    <span className="navbar-brand mb-0 h5 mx-auto text-danger">🫙 Výroba Džemů</span>
                    <Badge bg="danger" className="fs-6">{progress}% Complete</Badge>
                </Container>
            </nav>

            <Container>
                <Row className="mb-5">
                    <Col lg={8}>
                        <h1 className="display-4 fw-bold mb-3">🫙 Výroba Džemů a Marmelád</h1>
                        <p className="lead text-white-50">Tradiční české recepty od A do Z. Naučte se konzervovat ovoce.</p>
                        <div className="d-flex gap-3">
                            <Badge bg="danger">Vaření</Badge>
                            <Badge bg="warning" text="dark">Beginner</Badge>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Card className="bg-danger bg-opacity-10 border-danger">
                            <Card.Body>
                                <h5>📊 Progress</h5>
                                <ProgressBar now={progress} variant="danger" />
                                <small className="mt-2 d-block">{completed.size} of {JAM_MODULES.length} completed</small>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="g-4">
                    {JAM_MODULES.map((mod) => (
                        <Col md={4} key={mod.id}>
                            <Card className="bg-dark border-danger h-100">
                                <Card.Body>
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="fs-2 me-3">{mod.icon}</span>
                                        <div>
                                            <h6 className="mb-0">{mod.title}</h6>
                                            <small className="text-muted">⏱️ {mod.duration}</small>
                                        </div>
                                    </div>
                                    <p className="small text-white-50">{mod.desc}</p>
                                    <Button 
                                        variant={completed.has(mod.id) ? "success" : "outline-danger"} 
                                        size="sm" 
                                        className="w-100"
                                        onClick={() => setCompleted(prev => new Set([...prev, mod.id]))}
                                    >
                                        {completed.has(mod.id) ? "✓ Dokončeno" : "Začít lekci"}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </main>
    );
}
