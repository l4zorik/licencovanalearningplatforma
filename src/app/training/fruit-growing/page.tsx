"use client";

import { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Modal } from "react-bootstrap";
import Link from "next/link";

const FRUIT_MODULES = [
    {
        id: 1,
        title: "Ovocné Stromy",
        icon: "🍎",
        description: "Pěstování jabloní, hrušní, třešní a dalších stromových plodin.",
        lessons: [
            { id: 1, title: "Výběr odrůd", duration: "25 min", completed: false },
            { id: 2, title: "Výsadba stromů", duration: "35 min", completed: false },
            { id: 3, title: "Řez a tvarování", duration: "45 min", completed: false },
            { id: 4, title: "Ochrana před škůdci", duration: "30 min", completed: false }
        ]
    },
    {
        id: 2,
        title: "Keřové Ovoce",
        icon: "🫐",
        description: "Rybíz, angrešt, maliny, ostružiny a další keřové plodiny.",
        lessons: [
            { id: 5, title: "Výsadba keřů", duration: "25 min", completed: false },
            { id: 6, title: "Řez bobulovin", duration: "30 min", completed: false },
            { id: 7, title: "Sklizeň a skladování", duration: "25 min", completed: false },
            { id: 8, title: "Množení řízky", duration: "30 min", completed: false }
        ]
    },
    {
        id: 3,
        title: "Réva Vinná",
        icon: "🍇",
        description: "Pěstování révy vinné pro stolní hrozny i víno.",
        lessons: [
            { id: 9, title: "Výběr odrůd", duration: "25 min", completed: false },
            { id: 10, title: "Výsadba a vedení", duration: "35 min", completed: false },
            { id: 11, title: "Řez révy", duration: "40 min", completed: false },
            { id: 12, title: "Sklizeň hroznů", duration: "25 min", completed: false }
        ]
    },
    {
        id: 4,
        title: "Ovocný Sad",
        icon: "🌳",
        description: "Plánování a údržba menšího ovocného sadu.",
        lessons: [
            { id: 13, title: "Plánování sadu", duration: "30 min", completed: false },
            { id: 14, title: "Výsadba stromů", duration: "35 min", completed: false },
            { id: 15, title: "Údržba sadu", duration: "30 min", completed: false },
            { id: 16, title: "Sklizeň a skladování", duration: "25 min", completed: false }
        ]
    }
];

export default function FruitGrowingPage() {
    const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
    const [activeModule, setActiveModule] = useState<any>(null);

    const totalLessons = FRUIT_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedCount = completedLessons.size;
    const progress = Math.round((completedCount / totalLessons) * 100);

    const markComplete = (lessonId: number) => {
        setCompletedLessons(prev => new Set([...prev, lessonId]));
    };

    return (
        <main className="min-vh-100 bg-dark text-white pb-5">
            <nav className="navbar navbar-dark bg-black border-bottom border-danger mb-4">
                <Container fluid>
                    <Link href="/training" className="btn btn-outline-light btn-sm">
                        ← Exit Training
                    </Link>
                    <span className="navbar-brand mb-0 h5 mx-auto text-danger">
                        🍎 Pěstování Ovoce
                    </span>
                    <Badge bg="danger" className="fs-6">{progress}% Complete</Badge>
                </Container>
            </nav>

            <Container>
                <Row className="mb-5">
                    <Col lg={8}>
                        <h1 className="display-4 fw-bold mb-3">Sklízejte Vlastní Ovoce</h1>
                        <p className="lead text-white-50">
                            Od jabloně po vinnou révu - naučte se pěstovat všechny druhy ovoce.
                        </p>
                        <div className="d-flex gap-3">
                            <Badge bg="danger">Zahradničení</Badge>
                            <Badge bg="warning" text="dark">Intermediate</Badge>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Card className="bg-danger bg-opacity-10 border-danger">
                            <Card.Body>
                                <h5>📊 Progress</h5>
                                <ProgressBar now={progress} variant="danger" className="mb-2" />
                                <small>{completedCount} of {totalLessons} lessons completed</small>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="g-4">
                    {FRUIT_MODULES.map((module) => (
                        <Col lg={6} key={module.id}>
                            <Card className="h-100 bg-dark border-danger" style={{ borderTop: "4px solid #dc3545" }}>
                                <Card.Body>
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="fs-2 me-3">{module.icon}</span>
                                        <div>
                                            <h5 className="mb-0">{module.title}</h5>
                                            <small className="text-muted">{module.lessons.length} lessons</small>
                                        </div>
                                    </div>
                                    <p className="text-white-50">{module.description}</p>
                                    <ProgressBar 
                                        now={(module.lessons.filter(l => completedLessons.has(l.id)).length / module.lessons.length) * 100} 
                                        variant="danger"
                                        className="mb-3"
                                    />
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm" 
                                        onClick={() => setActiveModule(module)}
                                    >
                                        Start Learning
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className="mt-5">
                    <Col className="text-center">
                        <Card className="bg-danger bg-opacity-25 border-danger d-inline-block p-5">
                            <h3>🌳 Získejte Certifikát</h3>
                            <p className="text-white-50">Dokončete všechny moduly!</p>
                            <Button variant="danger" size="lg">📜 Get Certificate</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={!!activeModule} onHide={() => setActiveModule(null)} size="lg">
                <Modal.Header closeButton className="bg-dark text-white border-danger">
                    <Modal.Title>{activeModule?.icon} {activeModule?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    {activeModule && (
                        <div>
                            <p className="text-white-50">{activeModule.description}</p>
                            <h6 className="mt-4 mb-3">📖 Lessons</h6>
                            {activeModule.lessons.map((lesson: any) => (
                                <div key={lesson.id} className="d-flex justify-content-between align-items-center p-3 bg-danger bg-opacity-10 rounded mb-2">
                                    <div>
                                        <div className="fw-bold">{lesson.title}</div>
                                        <small className="text-muted">⏱️ {lesson.duration}</small>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <Button variant="outline-light" size="sm">▶️ Watch</Button>
                                        {completedLessons.has(lesson.id) ? (
                                            <Badge bg="success">✓ Done</Badge>
                                        ) : (
                                            <Button variant="outline-success" size="sm" onClick={() => markComplete(lesson.id)}>
                                                Complete
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-dark border-secondary">
                    <Button variant="secondary" onClick={() => setActiveModule(null)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}
