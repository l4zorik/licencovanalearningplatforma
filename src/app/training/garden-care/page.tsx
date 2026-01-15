"use client";

import { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, ProgressBar } from "react-bootstrap";
import Link from "next/link";

const GARDEN_MODULES = [
    { id: 1, title: "Trávník", icon: "🌿", duration: "30 min", completed: false, desc: "Sečení, vertikutace, hnojení" },
    { id: 2, title: "Záhony", icon: "🌺", duration: "35 min", completed: false, desc: "Pletí, mulčování, výsadba" },
    { id: 3, title: "Keře a živé ploty", icon: "🌳", duration: "40 min", completed: false, desc: "Stříhání a tvarování" },
    { id: 4, title: "Zavlažování", icon: "💧", duration: "25 min", completed: false, desc: "Automatické systémy, ruční zalévání" },
    { id: 5, title: "Škůdci a nemoci", icon: "🐛", duration: "35 min", completed: false, desc: "Prevence a ochrana" },
    { id: 6, title: "Podzimní úklid", icon: "🍂", duration: "30 min", completed: false, desc: "Příprava na zimu" }
];

export default function GardenCarePage() {
    const [completed, setCompleted] = useState<Set<number>>(new Set());
    const progress = Math.round((completed.size / GARDEN_MODULES.length) * 100);

    return (
        <main className="min-vh-100 bg-dark text-white pb-5">
            <nav className="navbar navbar-dark bg-black border-bottom border-success mb-4">
                <Container fluid>
                    <Link href="/training" className="btn btn-outline-light btn-sm">← Exit Training</Link>
                    <span className="navbar-brand mb-0 h5 mx-auto text-success">🌻 Údržba Zahrady</span>
                    <Badge bg="success" className="fs-6">{progress}% Complete</Badge>
                </Container>
            </nav>

            <Container>
                <Row className="mb-5">
                    <Col lg={8}>
                        <h1 className="display-4 fw-bold mb-3">🌻 Údržba Zahrady</h1>
                        <p className="lead text-white-50">Vytvořte a udržujte krásnou zahradu celý rok.</p>
                        <div className="d-flex gap-3">
                            <Badge bg="success">Gardening</Badge>
                            <Badge bg="warning" text="dark">Beginner</Badge>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Card className="bg-success bg-opacity-10 border-success">
                            <Card.Body>
                                <h5>📊 Progress</h5>
                                <ProgressBar now={progress} variant="success" />
                                <small className="mt-2 d-block">{completed.size} of {GARDEN_MODULES.length} completed</small>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="g-4">
                    {GARDEN_MODULES.map((mod) => (
                        <Col md={4} key={mod.id}>
                            <Card className="bg-dark border-success h-100">
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
                                        variant={completed.has(mod.id) ? "success" : "outline-success"} 
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
