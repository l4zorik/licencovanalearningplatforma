"use client";

import { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, ProgressBar } from "react-bootstrap";
import Link from "next/link";

const ANIMAL_MODULES = [
    { id: 1, title: "Výživa psů a koček", icon: "🦴", duration: "35 min", completed: false, desc: "Správná strava pro každý věk" },
    { id: 2, title: "Základní hygiena", icon: "🛁", duration: "30 min", completed: false, desc: "Koupání, česání, drápy" },
    { id: 3, title: "První pomoc", icon: "🚑", duration: "45 min", completed: false, desc: "Kardiopulmonální resuscitace, rány" },
    { id: 4, title: "Výcvik základů", icon: "🎾", duration: "50 min", completed: false, desc: "Sedni, lehni, ke mně" },
    { id: 5, title: "Prevence nemocí", icon: "💉", duration: "35 min", completed: false, desc: "Očkování, odčervení, antiparazitika" },
    { id: 6, title: "Chování a řeč", icon: "🧠", duration: "40 min", completed: false, desc: "Porozumění signálům těla" }
];

export default function AnimalCarePage() {
    const [completed, setCompleted] = useState<Set<number>>(new Set());
    const progress = Math.round((completed.size / ANIMAL_MODULES.length) * 100);

    return (
        <main className="min-vh-100 bg-dark text-white pb-5">
            <nav className="navbar navbar-dark bg-black border-bottom border-info mb-4">
                <Container fluid>
                    <Link href="/training" className="btn btn-outline-light btn-sm">← Exit Training</Link>
                    <span className="navbar-brand mb-0 h5 mx-auto text-info">🐕 Péče o Zvířata</span>
                    <Badge bg="info" className="fs-6">{progress}% Complete</Badge>
                </Container>
            </nav>

            <Container>
                <Row className="mb-5">
                    <Col lg={8}>
                        <h1 className="display-4 fw-bold mb-3">🐕 Péče o Domácí Mazlíčky</h1>
                        <p className="lead text-white-50">Naučte se správně pečovat o psy, kočky a další zvířata.</p>
                        <div className="d-flex gap-3">
                            <Badge bg="info">Animal Care</Badge>
                            <Badge bg="warning" text="dark">Beginner</Badge>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Card className="bg-info bg-opacity-10 border-info">
                            <Card.Body>
                                <h5>📊 Progress</h5>
                                <ProgressBar now={progress} variant="info" />
                                <small className="mt-2 d-block">{completed.size} of {ANIMAL_MODULES.length} completed</small>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="g-4">
                    {ANIMAL_MODULES.map((mod) => (
                        <Col md={4} key={mod.id}>
                            <Card className="bg-dark border-info h-100">
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
                                        variant={completed.has(mod.id) ? "success" : "outline-info"} 
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
