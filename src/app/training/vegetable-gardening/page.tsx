"use client";

import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Modal } from 'react-bootstrap';
import Link from 'next/link';

const GARDENING_MODULES = [
    {
        id: 1,
        title: "Příprava Záhonů",
        icon: "🌱",
        description: "Naučte se správně připravit záhony pro pěstování zeleniny.",
        lessons: [
            { id: 1, title: "Výběr správného místa", duration: "20 min", completed: false },
            { id: 2, title: "Rytí a provzdušnění půdy", duration: "25 min", completed: false },
            { id: 3, title: "Hnojení a kompostování", duration: "30 min", completed: false },
            { id: 4, title: "Zalévání a mulčování", duration: "20 min", completed: false }
        ]
    },
    {
        id: 2,
        title: "Pěstování Zeleniny",
        icon: "🥕",
        description: "Podrobný průvodce pěstováním nejpopulárnější zeleniny.",
        lessons: [
            { id: 5, title: "Kořenová zelenina", duration: "30 min", completed: false },
            { id: 6, title: "Listová zelenina", duration: "25 min", completed: false },
            { id: 7, title: "Plodová zelenina", duration: "35 min", completed: false },
            { id: 8, title: "Luštěniny", duration: "25 min", completed: false }
        ]
    },
    {
        id: 3,
        title: "Sklizeň a Uskladnění",
        icon: "📦",
        description: "Kdy a jak sklízet pro maximální chuť a trvanlivost.",
        lessons: [
            { id: 9, title: "Správný čas sklizně", duration: "20 min", completed: false },
            { id: 10, title: "Metody sklizně", duration: "25 min", completed: false },
            { id: 11, title: "Krátkodobé uskladnění", duration: "30 min", completed: false },
            { id: 12, title: "Dlouhodobé konzervování", duration: "35 min", completed: false }
        ]
    },
    {
        id: 4,
        title: "Organické Zahradničení",
        icon: "🌿",
        description: "Pěstujte bez chemie - přírodní metody ochrany a hnojení.",
        lessons: [
            { id: 13, title: "Přírodní hnojiva", duration: "25 min", completed: false },
            { id: 14, title: "Biologická ochrana", duration: "30 min", completed: false },
            { id: 15, title: "Kompostování", duration: "35 min", completed: false },
            { id: 16, title: "Střídání plodin", duration: "20 min", completed: false }
        ]
    }
];

const SEASONAL_CALENDAR = [
    { month: "Březen", tasks: "Příprava záhonů, setí rané zeleniny", icon: "🌱" },
    { month: "Duben", tasks: "Výsadba sazenic, setí mrkve, petržele", icon: "🥕" },
    { month: "Květen", tasks: "Výsadba teplomilné zeleniny", icon: "🍅" },
    { month: "Červen", tasks: "Péče, pletí, pravidelná zálivka", icon: "💧" },
    { month: "Červenec", tasks: "První sklizně, výsev podzimní zeleniny", icon: "📦" },
    { month: "Srpen", tasks: "Hlavní sklizeň, konzervování", icon: "🫙" },
    { month: "Září", tasks: "Sklizeň pozdní zeleniny, příprava na zimu", icon: "🍂" },
    { month: "Říjen", tasks: "Úklid záhonů, kompostování zbytků", icon: "🟤" }
];

export default function VegetableGardeningPage() {
    const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
    const [activeModule, setActiveModule] = useState<any>(null);

    const totalLessons = GARDENING_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedCount = completedLessons.size;
    const progress = Math.round((completedCount / totalLessons) * 100);

    const markComplete = (lessonId: number) => {
        setCompletedLessons(prev => new Set([...prev, lessonId]));
    };

    return (
        <main className="min-vh-100 bg-dark text-white pb-5">
            <nav className="navbar navbar-dark bg-black border-bottom border-success mb-4">
                <Container fluid>
                    <Link href="/training" className="btn btn-outline-light btn-sm">
                        ← Exit Training
                    </Link>
                    <span className="navbar-brand mb-0 h5 mx-auto text-success">
                        🥕 Zeleninová Zahrada
                    </span>
                    <Badge bg="success" className="fs-6">{progress}% Complete</Badge>
                </Container>
            </nav>

            <Container>
                <Row className="mb-5">
                    <Col lg={8}>
                        <h1 className="display-4 fw-bold mb-3">Pěstujte Vlastní Zeleninu</h1>
                        <p className="lead text-white-50">
                            Od semínka ke sklizni - kompletní průvodce zeleninovou zahradou. Naučte se pěstovat zdravou a chutnou zeleninu vlastníma rukama.
                        </p>
                        <div className="d-flex gap-3">
                            <Badge bg="success">Zahradničení</Badge>
                            <Badge bg="warning" text="dark">Beginner Friendly</Badge>
                            <Badge bg-info>4 Modules • 16 Lessons</Badge>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Card className="bg-success bg-opacity-10 border-success">
                            <Card.Body>
                                <h5>📊 Progress</h5>
                                <ProgressBar now={progress} variant="success" className="mb-2" />
                                <small>{completedCount} of {totalLessons} lessons completed</small>
                                <hr />
                                <h6>🌱 Your Garden</h6>
                                <div className="d-flex gap-2 flex-wrap">
                                    <Badge bg="success">🥕 Mrkev</Badge>
                                    <Badge bg="success">🍅 Rajčata</Badge>
                                    <Badge bg="secondary">🥬 Zelí</Badge>
                                    <Badge bg="secondary">🫑 Papriky</Badge>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>
                        <h3 className="mb-4">📚 Course Modules</h3>
                        <Row className="g-4">
                            {GARDENING_MODULES.map((module) => (
                                <Col lg={6} key={module.id}>
                                    <Card className="h-100 bg-dark border-success" style={{ borderTop: '4px solid #198754' }}>
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
                                                variant="success"
                                                className="mb-3"
                                            />
                                            <Button 
                                                variant="outline-success" 
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
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>
                        <h3 className="mb-4">📅 Sezónní Kalendář</h3>
                        <Card className="bg-dark border-secondary">
                            <Card.Body>
                                <Row>
                                    {SEASONAL_CALENDAR.map((item, i) => (
                                        <Col md={3} sm={6} key={i} className="mb-3">
                                            <div className="text-center p-3 bg-success bg-opacity-10 rounded h-100">
                                                <div className="fs-3 mb-2">{item.icon}</div>
                                                <h6 className="text-success">{item.month}</h6>
                                                <small className="text-white-50">{item.tasks}</small>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center">
                        <Card className="bg-gradient bg-success bg-opacity-25 border-success d-inline-block p-5">
                            <h3>🌱 Začněte Svou Zahradu</h3>
                            <p className="text-white-50">Dokončete všechny moduly a získejte certifikát zahradníka!</p>
                            <Button variant="success" size="lg">
                                📜 Get Certificate
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={!!activeModule} onHide={() => setActiveModule(null)} size="lg">
                <Modal.Header closeButton className="bg-dark text-white border-success">
                    <Modal.Title>
                        {activeModule?.icon} {activeModule?.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    {activeModule && (
                        <div>
                            <p className="text-white-50">{activeModule.description}</p>
                            <h6 className="mt-4 mb-3">📖 Lessons</h6>
                            {activeModule.lessons.map((lesson: any) => (
                                <div key={lesson.id} className="d-flex justify-content-between align-items-center p-3 bg-success bg-opacity-10 rounded mb-2">
                                    <div>
                                        <div className="fw-bold">{lesson.title}</div>
                                        <small className="text-muted">⏱️ {lesson.duration}</small>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <Button variant="outline-light" size="sm">▶️ Watch</Button>
                                        {completedLessons.has(lesson.id) ? (
                                            <Badge bg="success">✓ Done</Badge>
                                        ) : (
                                            <Button 
                                                variant="outline-success" 
                                                size="sm"
                                                onClick={() => markComplete(lesson.id)}
                                            >
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
                    <Button variant="secondary" onClick={() => setActiveModule(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}
