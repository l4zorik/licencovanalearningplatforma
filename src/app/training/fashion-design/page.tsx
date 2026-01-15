"use client";

import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Modal, Carousel, Form } from 'react-bootstrap';
import Link from 'next/link';

const FASHION_MODULES = [
    {
        id: 1,
        title: "Fashion Illustration",
        icon: "✏️",
        description: "Learn to sketch fashion figures and create professional croquis.",
        stages: [
            { id: 1, title: "Fashion Proportions & Croquis", duration: "45 min", completed: false },
            { id: 2, title: "Gathering Reference & Mood Boards", duration: "30 min", completed: false },
            { id: 3, title: "Drawing Garments from Draping", duration: "60 min", completed: false },
            { id: 4, title: "Color & Textile Rendering", duration: "45 min", completed: false },
            { id: 5, title: "Flat Sketching & Spec Sheets", duration: "40 min", completed: false }
        ]
    },
    {
        id: 2,
        title: "Pattern Making",
        icon: "📐",
        description: "Master the art of creating patterns from measurements.",
        stages: [
            { id: 6, title: "Body Measurements & Size Charts", duration: "30 min", completed: false },
            { id: 7, title: "Basic Block Patterns", duration: "60 min", completed: false },
            { id: 8, title: "Dart Manipulation Techniques", duration: "45 min", completed: false },
            { id: 9, title: "Adding Ease & Fit Adjustments", duration: "35 min", completed: false },
            { id: 10, title: "Creating Variations from Blocks", duration: "50 min", completed: false }
        ]
    },
    {
        id: 3,
        title: "Textile Science",
        icon: "🧵",
        description: "Understand fabrics, fibers, and their properties.",
        stages: [
            { id: 11, title: "Natural vs Synthetic Fibers", duration: "30 min", completed: false },
            { id: 12, title: "Fabric Weaves & Knits", duration: "40 min", completed: false },
            { id: 13, title: "Fabric Weight & Hand Feel", duration: "25 min", completed: false },
            { id: 14, title: "Sustainable & Technical Fabrics", duration: "35 min", completed: false },
            { id: 15, title: "Fabric Care & Maintenance", duration: "20 min", completed: false }
        ]
    },
    {
        id: 4,
        title: "Garment Construction",
        icon: "🪡",
        description: "Sewing techniques from basics to advanced construction.",
        stages: [
            { id: 16, title: "Machine Setup & Basic Stitches", duration: "30 min", completed: false },
            { id: 17, title: "Seam Finishes & Edge Treatments", duration: "40 min", completed: false },
            { id: 18, title: "Zippers, Buttons & Fasteners", duration: "35 min", completed: false },
            { id: 19, title: "Dart, Pleat & Tuck Techniques", duration: "45 min", completed: false },
            { id: 20, title: "Professional Hemming", duration: "30 min", completed: false }
        ]
    }
];

const COLLECTIONS = [
    { name: "Urban Streetwear", difficulty: "Intermediate", pieces: 12, theme: "City Life" },
    { name: "Eco-Conscious Fashion", difficulty: "Advanced", pieces: 15, theme: "Sustainability" },
    { name: "Evening Wear", difficulty: "Advanced", pieces: 10, theme: "Glamour" },
    { name: "Athleisure Collection", difficulty: "Beginner", pieces: 8, theme: "Sport Meets Comfort" }
];

export default function FashionDesignPage() {
    const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());
    const [activeModule, setActiveModule] = useState<any>(null);
    const [selectedCollection, setSelectedCollection] = useState<any>(null);

    const totalStages = FASHION_MODULES.reduce((acc, m) => acc + m.stages.length, 0);
    const completedCount = completedStages.size;
    const progress = Math.round((completedCount / totalStages) * 100);

    const markComplete = (stageId: number) => {
        setCompletedStages(prev => new Set([...prev, stageId]));
    };

    return (
        <main className="min-vh-100 bg-dark text-white pb-5">
            <nav className="navbar navbar-dark bg-black border-bottom border-danger mb-4">
                <Container fluid>
                    <Link href="/training" className="btn btn-outline-light btn-sm">
                        ← Exit Training
                    </Link>
                    <span className="navbar-brand mb-0 h5 mx-auto text-danger">
                        👗 Fashion Design & Production
                    </span>
                    <Badge bg="danger" className="fs-6">{progress}% Complete</Badge>
                </Container>
            </nav>

            <Container>
                <Row className="mb-5">
                    <Col lg={8}>
                        <h1 className="display-4 fw-bold mb-3">From Sketch to Sewn Garment</h1>
                        <p className="lead text-white-50">
                            Master the complete fashion design workflow. From fashion illustration and pattern making to textile selection and garment construction.
                        </p>
                        <div className="d-flex gap-3">
                            <Badge bg="danger">Fashion Design</Badge>
                            <Badge bg="warning" text="dark">Hands-on</Badge>
                            <Badge bg="success">4 Modules • 20+ Lessons</Badge>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Card className="bg-danger bg-opacity-10 border-danger">
                            <Card.Body>
                                <h5>📊 Progress Dashboard</h5>
                                <ProgressBar now={progress} variant="danger" className="mb-2" />
                                <small>{completedCount} of {totalStages} lessons completed</small>
                                <hr />
                                <div className="d-flex justify-content-between mb-2">
                                    <span>🎨 Illustration</span>
                                    <Badge bg="secondary">
                                        {FASHION_MODULES[0].stages.filter(s => completedStages.has(s.id)).length}/{FASHION_MODULES[0].stages.length}
                                    </Badge>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>📐 Patterns</span>
                                    <Badge bg="secondary">
                                        {FASHION_MODULES[1].stages.filter(s => completedStages.has(s.id)).length}/{FASHION_MODULES[1].stages.length}
                                    </Badge>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>🧵 Textiles</span>
                                    <Badge bg="secondary">
                                        {FASHION_MODULES[2].stages.filter(s => completedStages.has(s.id)).length}/{FASHION_MODULES[2].stages.length}
                                    </Badge>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>🪡 Construction</span>
                                    <Badge bg="secondary">
                                        {FASHION_MODULES[3].stages.filter(s => completedStages.has(s.id)).length}/{FASHION_MODULES[3].stages.length}
                                    </Badge>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>
                        <h3 className="mb-4">📚 Course Modules</h3>
                        <Row className="g-4">
                            {FASHION_MODULES.map((module) => (
                                <Col lg={6} key={module.id}>
                                    <Card className="h-100 bg-dark border-danger" style={{ borderTop: '4px solid #dc3545' }}>
                                        <Card.Body>
                                            <div className="d-flex align-items-center mb-3">
                                                <span className="fs-2 me-3">{module.icon}</span>
                                                <div>
                                                    <h5 className="mb-0">{module.title}</h5>
                                                    <small className="text-muted">{module.stages.length} lessons</small>
                                                </div>
                                            </div>
                                            <p className="text-white-50">{module.description}</p>
                                            <div className="mb-3">
                                                <small className="text-muted">Progress:</small>
                                                <ProgressBar 
                                                    now={(module.stages.filter(s => completedStages.has(s.id)).length / module.stages.length) * 100} 
                                                    variant="danger" 
                                                    className="mt-1"
                                                    style={{ height: '6px' }}
                                                />
                                            </div>
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
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>
                        <h3 className="mb-4">👗 Portfolio Collections</h3>
                        <p className="text-white-50 mb-4">Complete these collection challenges to build your fashion portfolio.</p>
                        <Row className="g-4">
                            {COLLECTIONS.map((collection, i) => (
                                <Col lg={3} md={6} key={i}>
                                    <Card className="bg-dark border-secondary h-100">
                                        <Card.Body className="text-center">
                                            <div className="fs-1 mb-3">👘</div>
                                            <h6>{collection.name}</h6>
                                            <Badge bg="danger" className="mb-2">{collection.difficulty}</Badge>
                                            <div className="small text-muted mb-3">
                                                {collection.pieces} pieces • {collection.theme}
                                            </div>
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm"
                                                onClick={() => setSelectedCollection(collection)}
                                            >
                                                Start Collection
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
                        <Card className="bg-gradient bg-danger bg-opacity-25 border-danger d-inline-block p-5">
                            <h3>🏆 Graduate Collection</h3>
                            <p className="text-white-50">Design and produce a complete collection (15-20 pieces) to earn your Fashion Design Certificate.</p>
                            <Button variant="danger" size="lg">
                                🎓 Begin Final Collection
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={!!activeModule} onHide={() => setActiveModule(null)} size="lg">
                <Modal.Header closeButton className="bg-dark text-white border-danger">
                    <Modal.Title>
                        {activeModule?.icon} {activeModule?.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    {activeModule && (
                        <div>
                            <p className="text-white-50">{activeModule.description}</p>
                            <h6 className="mt-4 mb-3">📖 Lessons</h6>
                            {activeModule.stages.map((stage: any) => (
                                <div key={stage.id} className="d-flex justify-content-between align-items-center p-3 bg-danger bg-opacity-10 rounded mb-2">
                                    <div>
                                        <div className="fw-bold">{stage.title}</div>
                                        <small className="text-muted">⏱️ {stage.duration}</small>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <Button variant="outline-light" size="sm">▶️ Video</Button>
                                        {completedStages.has(stage.id) ? (
                                            <Badge bg="success">✓ Done</Badge>
                                        ) : (
                                            <Button 
                                                variant="outline-success" 
                                                size="sm"
                                                onClick={() => markComplete(stage.id)}
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
