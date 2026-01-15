"use client";

import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Modal, Carousel, Form } from 'react-bootstrap';
import Link from 'next/link';

const DESIGN_PRINCIPLES = [
    {
        id: 1,
        title: "Color Theory",
        icon: "🎨",
        description: "Understanding the color wheel, complementary colors, and color psychology.",
        lessons: [
            { id: 1, title: "The Color Wheel Fundamentals", duration: "15 min", completed: false },
            { id: 2, title: "Color Harmony & Contrast", duration: "20 min", completed: false },
            { id: 3, title: "Color Psychology in Design", duration: "15 min", completed: false }
        ],
        quiz: "Test your knowledge of color combinations and their emotional impact."
    },
    {
        id: 2,
        title: "Typography",
        icon: "✏️",
        description: "Mastering font selection, pairing, hierarchy, and readability.",
        lessons: [
            { id: 4, title: "Typeface Classification", duration: "20 min", completed: false },
            { id: 5, title: "Font Pairing Best Practices", duration: "25 min", completed: false },
            { id: 6, title: "Creating Visual Hierarchy", duration: "15 min", completed: false }
        ],
        quiz: "Choose the right fonts for different design contexts."
    },
    {
        id: 3,
        title: "Layout & Composition",
        icon: "📐",
        description: "Grid systems, balance, alignment, and visual flow.",
        lessons: [
            { id: 7, title: "Grid Systems Explained", duration: "20 min", completed: false },
            { id: 8, title: "Balance & Symmetry", duration: "15 min", completed: false },
            { id: 9, title: "Visual Flow & Movement", duration: "20 min", completed: false }
        ],
        quiz: "Design a layout following grid principles."
    },
    {
        id: 4,
        title: "Visual Hierarchy",
        icon: "👁️",
        description: "Guiding the viewer's eye through effective design elements.",
        lessons: [
            { id: 10, title: "F-Pattern & Z-Pattern Reading", duration: "15 min", completed: false },
            { id: 11, title: "Size, Weight & Contrast", duration: "20 min", completed: false },
            { id: 12, title: "White Space Utilization", duration: "15 min", completed: false }
        ],
        quiz: "Optimize a design for better visual hierarchy."
    }
];

const TOOLS_TUTORIALS = [
    { name: "Adobe Photoshop", level: "Beginner", duration: "2 hours", thumbnail: "🖼️" },
    { name: "Adobe Illustrator", level: "Intermediate", duration: "3 hours", thumbnail: "✒️" },
    { name: "Figma", level: "Beginner", duration: "1.5 hours", thumbnail: "🎯" },
    { name: "Canva Pro", level: "Beginner", duration: "1 hour", thumbnail: "🖌️" }
];

export default function GraphicDesignPage() {
    const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
    const [activeModule, setActiveModule] = useState<any>(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [designChallenge, setDesignChallenge] = useState<string>("");
    const [challengeCompleted, setChallengeCompleted] = useState(false);

    const totalLessons = DESIGN_PRINCIPLES.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedCount = completedLessons.size;
    const progress = Math.round((completedCount / totalLessons) * 100);

    const markComplete = (lessonId: number) => {
        setCompletedLessons(prev => new Set([...prev, lessonId]));
    };

    const startChallenge = () => {
        const challenges = [
            "Design a logo for a coffee shop using only 2 colors",
            "Create a social media post with strong visual hierarchy",
            "Design a business card following grid principles",
            "Create a color palette for a wellness brand"
        ];
        setDesignChallenge(challenges[Math.floor(Math.random() * challenges.length)]);
        setChallengeCompleted(false);
    };

    return (
        <main className="min-vh-100 bg-dark text-white pb-5">
            <nav className="navbar navbar-dark bg-black border-bottom border-secondary mb-4">
                <Container fluid>
                    <Link href="/training" className="btn btn-outline-light btn-sm">
                        ← Exit Training
                    </Link>
                    <span className="navbar-brand mb-0 h5 mx-auto text-warning">
                        🎨 Graphic Design Fundamentals
                    </span>
                    <Badge bg="warning" text="dark" className="fs-6">{progress}% Complete</Badge>
                </Container>
            </nav>

            <Container>
                <Row className="mb-5">
                    <Col lg={8}>
                        <h1 className="display-4 fw-bold mb-3">Graphic Design Mastery</h1>
                        <p className="lead text-white-50">
                            Learn the principles of visual design and create stunning graphics. Master color theory, typography, layout, and composition.
                        </p>
                        <div className="d-flex gap-3">
                            <Badge bg="primary">Design</Badge>
                            <Badge bg="info" text="dark">Beginner Friendly</Badge>
                            <Badge bg="success">4 Modules</Badge>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Card className="bg-warning bg-opacity-10 border-warning">
                            <Card.Body>
                                <h5>📊 Your Progress</h5>
                                <ProgressBar now={progress} variant="warning" className="mb-2" />
                                <small>{completedCount} of {totalLessons} lessons completed</small>
                                <hr />
                                <h6>Current Challenge:</h6>
                                {!designChallenge ? (
                                    <Button variant="warning" size="sm" onClick={startChallenge}>
                                        🎯 Start Design Challenge
                                    </Button>
                                ) : (
                                    <div>
                                        <p className="small mb-2 fst-italic">"{designChallenge}"</p>
                                        {!challengeCompleted ? (
                                            <Button variant="success" size="sm" onClick={() => setChallengeCompleted(true)}>
                                                ✅ Mark Complete
                                            </Button>
                                        ) : (
                                            <Badge bg="success">Challenge Completed! +50 XP</Badge>
                                        )}
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>
                        <h3 className="mb-4">🎨 Design Principles</h3>
                        <Row className="g-4">
                            {DESIGN_PRINCIPLES.map((module) => (
                                <Col lg={6} key={module.id}>
                                    <Card className="h-100 bg-dark border-warning" style={{ borderTop: '4px solid #ffc107' }}>
                                        <Card.Body>
                                            <div className="d-flex align-items-center mb-3">
                                                <span className="fs-2 me-3">{module.icon}</span>
                                                <div>
                                                    <h5 className="mb-0">{module.title}</h5>
                                                    <small className="text-muted">{module.lessons.length} lessons</small>
                                                </div>
                                            </div>
                                            <p className="text-white-50">{module.description}</p>
                                            <Button 
                                                variant="outline-warning" 
                                                size="sm" 
                                                onClick={() => setActiveModule(module)}
                                            >
                                                View Lessons
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
                        <h3 className="mb-4">🛠️ Tools Tutorials</h3>
                        <Row className="g-4">
                            {TOOLS_TUTORIALS.map((tool, i) => (
                                <Col lg={3} md={6} key={i}>
                                    <Card className="bg-dark border-secondary text-center h-100">
                                        <Card.Body>
                                            <div className="fs-1 mb-3">{tool.thumbnail}</div>
                                            <h6>{tool.name}</h6>
                                            <Badge bg="secondary" className="mb-2">{tool.level}</Badge>
                                            <div className="small text-muted">⏱️ {tool.duration}</div>
                                            <Button variant="outline-primary" size="sm" className="mt-2">
                                                Start Tutorial
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center">
                        <Card className="bg-primary bg-opacity-10 border-primary d-inline-block p-5">
                            <h3>🎓 Ready for Certification?</h3>
                            <p className="text-white-50">Complete all modules and pass the final exam to earn your Graphic Design Certificate.</p>
                            <Button variant="primary" size="lg">
                                📜 Take Final Exam
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={!!activeModule} onHide={() => setActiveModule(null)} size="lg">
                <Modal.Header closeButton className="bg-dark text-white border-secondary">
                    <Modal.Title>
                        {activeModule?.icon} {activeModule?.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    {activeModule && (
                        <div>
                            <p className="text-white-50">{activeModule.description}</p>
                            <h6 className="mt-4 mb-3">📚 Lessons</h6>
                            {activeModule.lessons.map((lesson: any) => (
                                <div key={lesson.id} className="d-flex justify-content-between align-items-center p-3 bg-secondary bg-opacity-25 rounded mb-2">
                                    <div>
                                        <div className="fw-bold">{lesson.title}</div>
                                        <small className="text-muted">⏱️ {lesson.duration}</small>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <Button variant="outline-primary" size="sm">▶️ Watch</Button>
                                        {completedLessons.has(lesson.id) ? (
                                            <Badge bg="success">✓ Done</Badge>
                                        ) : (
                                            <Button 
                                                variant="outline-success" 
                                                size="sm"
                                                onClick={() => markComplete(lesson.id)}
                                            >
                                                Mark Complete
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="mt-4 p-3 bg-info bg-opacity-10 rounded">
                                <h6>📝 Quiz</h6>
                                <p className="small mb-0">{activeModule.quiz}</p>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-dark border-secondary">
                    <Button variant="secondary" onClick={() => setActiveModule(null)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setShowQuiz(true)}>
                        Take Quiz
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}
