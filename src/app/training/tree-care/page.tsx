"use client";

import { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, ProgressBar } from "react-bootstrap";
import Link from "next/link";

const TREE_CARE_MODULES = [
    { id: 1, title: "Bezpečnost při práci", icon: "⛑️", duration: "30 min", completed: false, desc: "Ochranné pomůcky, bezpečné postupy" },
    { id: 2, title: "Základní nářadí", icon: "🛠️", duration: "25 min", completed: false, desc: "Pily, nůžky, štafle a jejich údržba" },
    { id: 3, title: "Prořezávání stromů", icon: "✂️", duration: "45 min", completed: false, desc: "Techniky řezu pro různé druhy" },
    { id: 4, title: "Odstraňování větví", icon: "🌿", duration: "35 min", completed: false, desc: "Bezpečné kácení a likvidace" },
    { id: 5, title: "Ošetření ran", icon: "🩹", duration: "20 min", completed: false, desc: "Latex, balzám a hojení" },
    { id: 6, title: "Výsadba stromů", icon: "🌱", duration: "40 min", completed: false, desc: "Správná technika výsadby" }
];

export default function TreeCarePage() {
    const [completed, setCompleted] = useState<Set<number>>(new Set());
    const progress = Math.round((completed.size / TREE_CARE_MODULES.length) * 100);

    return (
        <main className="min-vh-100 bg-dark text-white pb-5">
            <nav className="navbar navbar-dark bg-black border-bottom border-warning mb-4">
                <Container fluid>
                    <Link href="/training" className="btn btn-outline-light btn-sm">← Exit Training</Link>
                    <span className="navbar-brand mb-0 h5 mx-auto text-warning">🌳 Péče o Stromy</span>
                    <Badge bg="warning" text="dark" className="fs-6">{progress}% Complete</Badge>
                </Container>
            </nav>

            <Container>
                <Row className="mb-5">
                    <Col lg={8}>
                        <h1 className="display-4 fw-bold mb-3">🌳 Péče o Stromy</h1>
                        <p className="lead text-white-50">Naučte se bezpečně prořezávat, stříhat a ošetřovat stromy.</p>
                        <div className="d-flex gap-3">
                            <Badge bg="warning" text="dark">Tree Care</Badge>
                            <Badge bg="secondary">Beginner</Badge>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Card className="bg-warning bg-opacity-10 border-warning">
                            <Card.Body>
                                <h5>📊 Progress</h5>
                                <ProgressBar now={progress} variant="warning" />
                                <small className="mt-2 d-block">{completed.size} of {TREE_CARE_MODULES.length} completed</small>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="g-4">
                    {TREE_CARE_MODULES.map((mod) => (
                        <Col md={4} key={mod.id}>
                            <Card className="bg-dark border-warning h-100">
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
                                        variant={completed.has(mod.id) ? "success" : "outline-warning"} 
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
