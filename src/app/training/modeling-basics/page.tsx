"use client";

import { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Modal } from "react-bootstrap";
import Link from "next/link";

const MODELING_MODULES = [
    {
        id: 1,
        title: "Posing Fundamentals",
        icon: "💃",
        description: "Master the art of positioning your body for maximum impact in front of the camera.",
        lessons: [
            { id: 1, title: "Understanding Your Angles", duration: "20 min", completed: false },
            { id: 2, title: "Facial Expressions & Mood", duration: "25 min", completed: false },
            { id: 3, title: "Hand & Arm Positioning", duration: "20 min", completed: false },
            { id: 4, title: "Movement & Flow", duration: "30 min", completed: false },
            { id: 5, title: "Commercial vs Editorial Posing", duration: "25 min", completed: false }
        ]
    },
    {
        id: 2,
        title: "Runway Skills",
        icon: "👠",
        description: "Walk the walk. Perfect your catwalk technique and stage presence.",
        lessons: [
            { id: 6, title: "Catwalk Basics & Posture", duration: "30 min", completed: false },
            { id: 7, title: "Turn Techniques", duration: "25 min", completed: false },
            { id: 8, title: "High Heel Walking", duration: "20 min", completed: false },
            { id: 9, title: "Speed & Pacing", duration: "20 min", completed: false },
            { id: 10, title: "Opening & Closing the Show", duration: "15 min", completed: false }
        ]
    },
    {
        id: 3,
        title: "Camera Techniques",
        icon: "📷",
        description: "Learn to work with photographers and understand camera mechanics.",
        lessons: [
            { id: 11, title: "Working with Light", duration: "25 min", completed: false },
            { id: 12, title: "Eye Contact & Lens Awareness", duration: "20 min", completed: false },
            { id: 13, title: "Different Shooting Angles", duration: "25 min", completed: false },
            { id: 14, title: "Video vs Photo Sets", duration: "20 min", completed: false },
            { id: 15, title: "Directing & Collaboration", duration: "20 min", completed: false }
        ]
    },
    {
        id: 4,
        title: "Industry Knowledge",
        icon: "📋",
        description: "Navigate the modeling industry successfully.",
        lessons: [
            { id: 16, title: "Building Your Book", duration: "30 min", completed: false },
            { id: 17, title: "Finding an Agency", duration: "25 min", completed: false },
            { id: 18, title: "Casting Calls & Go-Sees", duration: "25 min", completed: false },
            { id: 19, title: "Contracts & Negotiation", duration: "30 min", completed: false },
            { id: 20, title: "Maintaining Your Career", duration: "20 min", completed: false }
        ]
    }
];

const MODEL_TYPES = [
    { name: "Fashion/Runway", height: "5'9\"+ (175cm+)", avgRate: "$200-500/hr", description: "High fashion, designer shows" },
    { name: "Commercial", height: "5'7\"+ (170cm+)", avgRate: "$100-300/hr", description: "Ads, catalogs, TV" },
    { name: "Plus Size", height: "5'9\"+ (175cm+)", avgRate: "$150-400/hr", description: "Fashion & commercial" },
    { name: "Petite", height: "5'2\"-5'6\" (157-168cm)", avgRate: "$100-250/hr", description: "Commercial, catalog" },
    { name: "Fitness", height: "5'7\"+ (170cm+)", avgRate: "$150-350/hr", description: "Sports, activewear" },
    { name: "Glamour/Lingerie", height: "5'7\"+ (170cm+)", avgRate: "$200-600/hr", description: "Lingerie, swimwear" }
];

const EXERCISES = [
    { title: "Mirror Practice Routine", duration: "15 min", type: "Daily" },
    { title: "Expression Card Drill", duration: "10 min", type: "Daily" },
    { title: "Walk & Turn Practice", duration: "20 min", type: "3x Week" },
    { title: "Stretching & Flexibility", duration: "30 min", type: "Daily" },
    { title: "Photo Scavenger Hunt", duration: "45 min", type: "Weekly" }
];

export default function ModelingBasicsPage() {
    const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
    const [activeModule, setActiveModule] = useState<any>(null);

    const totalLessons = MODELING_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedCount = completedLessons.size;
    const progress = Math.round((completedCount / totalLessons) * 100);

    const markComplete = (lessonId: number) => {
        setCompletedLessons(prev => new Set([...prev, lessonId]));
    };

    return (
        <main className="min-vh-100 bg-dark text-white pb-5">
            <nav className="navbar navbar-dark bg-black border-bottom mb-4" style={{ borderColor: "#e83e8c" }}>
                <Container fluid>
                    <Link href="/training" className="btn btn-outline-light btn-sm">
                        ← Exit Training
                    </Link>
                    <span className="navbar-brand mb-0 h5 mx-auto" style={{ color: "#e83e8c" }}>
                        📸 Modeling & Portfolio Building
                    </span>
                    <Badge style={{ backgroundColor: "#e83e8c" }} className="fs-6">{progress}% Complete</Badge>
                </Container>
            </nav>

            <Container>
                <Row className="mb-5">
                    <Col lg={8}>
                        <h1 className="display-4 fw-bold mb-3">Become Camera Ready</h1>
                        <p className="lead text-white-50">
                            Launch your modeling career with professional training. Master posing, runway, and portfolio building.
                        </p>
                        <div className="d-flex gap-3">
                            <Badge style={{ backgroundColor: "#e83e8c" }}>Modeling</Badge>
                            <Badge bg="warning" text="dark">Beginner Friendly</Badge>
                            <Badge bg="success">4 Modules • 20 Lessons</Badge>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Card className="border-pink" style={{ borderColor: "#e83e8c", backgroundColor: "rgba(232, 62, 140, 0.1)" }}>
                            <Card.Body>
                                <h5>📊 Model Training Progress</h5>
                                <ProgressBar now={progress} variant="danger" className="mb-2" />
                                <small>{completedCount} of {totalLessons} lessons completed</small>
                                <hr />
                                <h6>Daily Practice Streak</h6>
                                <div className="d-flex gap-2 mb-3">
                                    {[1,2,3,4,5].map(d => (
                                        <div key={d} className={`rounded ${d <= 3 ? "bg-success" : "bg-secondary"}`} style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            {d}
                                        </div>
                                    ))}
                                </div>
                                <Button style={{ backgroundColor: "#e83e8c", border: "none" }} size="sm" className="w-100">
                                    📸 Start Selfie Practice
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>
                        <h3 className="mb-4">📚 Training Modules</h3>
                        <Row className="g-4">
                            {MODELING_MODULES.map((module) => (
                                <Col lg={6} key={module.id}>
                                    <Card className="h-100 bg-dark" style={{ borderTop: "4px solid #e83e8c" }}>
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
                                                Start Module
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
                        <h3 className="mb-4">👠 Modeling Career Paths</h3>
                        <Row className="g-4">
                            {MODEL_TYPES.map((type, i) => (
                                <Col lg={4} md={6} key={i}>
                                    <Card className="bg-dark border-secondary h-100">
                                        <Card.Body>
                                            <h6 style={{ color: "#e83e8c" }}>{type.name}</h6>
                                            <p className="small text-white-50 mb-2">{type.description}</p>
                                            <div className="d-flex justify-content-between">
                                                <small className="text-muted">Height: {type.height}</small>
                                                <Badge bg="success">{type.avgRate}</Badge>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>
                        <h3 className="mb-4">💪 Daily Practice Routine</h3>
                        <Card className="bg-dark border-secondary">
                            <Card.Body>
                                <Row>
                                    {EXERCISES.map((exercise, i) => (
                                        <Col md={4} sm={6} key={i} className="mb-3">
                                            <div className="d-flex align-items-center p-3 bg-secondary bg-opacity-25 rounded">
                                                <div className="me-3 fs-4">✓</div>
                                                <div>
                                                    <div className="fw-bold">{exercise.title}</div>
                                                    <small className="text-muted">{exercise.duration} • {exercise.type}</small>
                                                </div>
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
                        <Card className="border-pink d-inline-block p-5" style={{ borderColor: "#e83e8c", background: "linear-gradient(145deg, #2b1a2b 0%, #1a1a2e 100%)" }}>
                            <h3>📔 Build Your Portfolio</h3>
                            <p className="text-white-50">Complete all modules and submit 10 professional photos to receive your Model Certification.</p>
                            <Button style={{ backgroundColor: "#e83e8c", border: "none" }} size="lg">
                                📸 Upload Portfolio Photos
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={!!activeModule} onHide={() => setActiveModule(null)} size="lg">
                <Modal.Header closeButton className="bg-dark text-white border-secondary">
                    <Modal.Title style={{ color: "#e83e8c" }}>
                        {activeModule?.icon} {activeModule?.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    {activeModule && (
                        <div>
                            <p className="text-white-50">{activeModule.description}</p>
                            <h6 className="mt-4 mb-3">🎬 Lessons</h6>
                            {activeModule.lessons.map((lesson: any) => (
                                <div key={lesson.id} className="d-flex justify-content-between align-items-center p-3 rounded mb-2" style={{ backgroundColor: "rgba(232, 62, 140, 0.1)" }}>
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
