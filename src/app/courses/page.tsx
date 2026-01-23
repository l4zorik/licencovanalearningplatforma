"use client";

import { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, ProgressBar, Modal, ListGroup, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { createBasicTour, addCoursesSteps } from '@/lib/tours';

const EMBEDDED_DB_COURSE = {
  title: "Embedded Databases in Common Lisp",
  subtitle: "Build high-performance embedded databases from scratch",
  instructor: "Dr. Pavel Krivanek",
  institution: "Czech Technical University",
  duration: "8 weeks",
  level: "Advanced",
  language: "English",
  rating: 4.8,
  students: 1234,
  price: "Free",
  description: `Master the art of building embedded databases using Common Lisp. This comprehensive course takes you from basic data structures to advanced database engines, covering everything from B-trees to query optimization.`,

  modules: [
    {
      id: 1,
      title: "Introduction to Embedded Databases",
      duration: "2 hours",
      lessons: [
        { id: 1, title: "What are Embedded Databases?", duration: "15 min", completed: false },
        { id: 2, title: "Common Lisp Fundamentals Review", duration: "30 min", completed: false },
        { id: 3, title: "Setting up Development Environment", duration: "25 min", completed: false },
        { id: 4, title: "Basic Data Structures in Lisp", duration: "50 min", completed: false }
      ]
    },
    {
      id: 2,
      title: "Core Data Structures",
      duration: "4 hours",
      lessons: [
        { id: 5, title: "Implementing B-Trees", duration: "45 min", completed: false },
        { id: 6, title: "Hash Tables and Indexing", duration: "40 min", completed: false },
        { id: 7, title: "Skip Lists Implementation", duration: "35 min", completed: false },
        { id: 8, title: "Memory Management in Lisp", duration: "50 min", completed: false },
        { id: 9, title: "Serialization and Persistence", duration: "30 min", completed: false }
      ]
    },
    {
      id: 3,
      title: "Database Engine Fundamentals",
      duration: "6 hours",
      lessons: [
        { id: 10, title: "Transaction Basics", duration: "40 min", completed: false },
        { id: 11, title: "ACID Properties Implementation", duration: "55 min", completed: false },
        { id: 12, title: "Logging and Recovery", duration: "45 min", completed: false },
        { id: 13, title: "Concurrency Control", duration: "50 min", completed: false },
        { id: 14, title: "Lock Management", duration: "35 min", completed: false },
        { id: 15, title: "Deadlock Detection", duration: "30 min", completed: false }
      ]
    },
    {
      id: 4,
      title: "Query Processing",
      duration: "5 hours",
      lessons: [
        { id: 16, title: "Query Language Design", duration: "40 min", completed: false },
        { id: 17, title: "Parser Implementation", duration: "50 min", completed: false },
        { id: 18, title: "Query Optimization", duration: "45 min", completed: false },
        { id: 19, title: "Index Utilization", duration: "35 min", completed: false },
        { id: 20, title: "Execution Planning", duration: "40 min", completed: false }
      ]
    },
    {
      id: 5,
      title: "Advanced Features",
      duration: "4 hours",
      lessons: [
        { id: 21, title: "Full-Text Search", duration: "35 min", completed: false },
        { id: 22, title: "Geospatial Indexing", duration: "40 min", completed: false },
        { id: 23, title: "Time Series Data", duration: "30 min", completed: false },
        { id: 24, title: "Compression Techniques", duration: "45 min", completed: false }
      ]
    },
    {
      id: 6,
      title: "Performance and Optimization",
      duration: "3 hours",
      lessons: [
        { id: 25, title: "Benchmarking Strategies", duration: "30 min", completed: false },
        { id: 26, title: "Memory Optimization", duration: "35 min", completed: false },
        { id: 27, title: "I/O Optimization", duration: "40 min", completed: false },
        { id: 28, title: "Scaling Considerations", duration: "25 min", completed: false }
      ]
    },
    {
      id: 7,
      title: "Real-World Applications",
      duration: "2 hours",
      lessons: [
        { id: 29, title: "Building a Simple Key-Value Store", duration: "45 min", completed: false },
        { id: 30, title: "Document Database Implementation", duration: "35 min", completed: false }
      ]
    },
    {
      id: 8,
      title: "Final Project",
      duration: "4 hours",
      lessons: [
        { id: 31, title: "Project Planning", duration: "30 min", completed: false },
        { id: 32, title: "Implementation", duration: "120 min", completed: false },
        { id: 33, title: "Testing and Debugging", duration: "60 min", completed: false },
        { id: 34, title: "Performance Analysis", duration: "30 min", completed: false }
      ]
    }
  ],

  skills: [
    "Common Lisp", "Database Design", "B-Tree Implementation", "Query Optimization",
    "Transaction Management", "Concurrency Control", "Data Structures", "System Programming"
  ],

  prerequisites: [
    "Basic Common Lisp knowledge",
    "Understanding of data structures",
    "Familiarity with algorithms"
  ],

  certificate: true,
  projects: 3,
  quizzes: 8,
  peerReviews: 2
};

const OTHER_COURSES = [
  {
    id: 2,
    title: "Machine Learning with Common Lisp",
    instructor: "Prof. Maria Kowalski",
    duration: "10 weeks",
    level: "Intermediate",
    students: 892,
    rating: 4.7
  },
  {
    id: 3,
    title: "Functional Programming Patterns",
    instructor: "Dr. Tomas Novak",
    duration: "6 weeks",
    level: "Beginner",
    students: 1456,
    rating: 4.9
  },
  {
    id: 4,
    title: "Lisp Macro System Deep Dive",
    instructor: "Dr. Pavel Krivanek",
    duration: "8 weeks",
    level: "Advanced",
    students: 634,
    rating: 4.6
  },
  {
    id: 5,
    title: "Fashion Design Masterclass",
    instructor: "Marie Bernard",
    duration: "12 weeks",
    level: "Intermediate",
    students: 567,
    rating: 4.8
  },
  {
    id: 6,
    title: "Professional Modeling Techniques",
    instructor: "Sarah Williams",
    duration: "8 weeks",
    level: "Beginner",
    students: 1234,
    rating: 4.7
  },
  {
    id: 7,
    title: "Sports Analytics & Predictions",
    instructor: "John Stevens",
    duration: "6 weeks",
    level: "Intermediate",
    students: 445,
    rating: 4.5
  },
  {
    id: 8,
    title: "Zeleninová Zahrada od A do Z",
    instructor: "Josef Rataj",
    duration: "8 weeks",
    level: "Beginner",
    students: 2341,
    rating: 4.9
  },
  {
    id: 9,
    title: "Výroba Džemů a Marmelád",
    instructor: "Marie Křenková",
    duration: "4 weeks",
    level: "Beginner",
    students: 1567,
    rating: 4.8
  },
  {
    id: 10,
    title: "Péče o Domácí Mazlíčky",
    instructor: "MVDr. Petr Dvořák",
    duration: "6 weeks",
    level: "Beginner",
    students: 3456,
    rating: 4.9
  },
  {
    id: 11,
    title: "Ovocný Sad pro Začátečníky",
    instructor: "František Hruška",
    duration: "10 weeks",
    level: "Intermediate",
    students: 890,
    rating: 4.6
  },
  {
    id: 12,
    title: "Autodiagnostika pro Profesionály",
    instructor: "Ing. Jan Novák",
    duration: "6 weeks",
    level: "Intermediate",
    students: 450,
    rating: 4.8
  },
  {
    id: 13,
    title: "Základy Údržby Vozidel",
    instructor: "Petr Svoboda",
    duration: "4 weeks",
    level: "Beginner",
    students: 890,
    rating: 4.7
  },
  {
    id: 14,
    title: "Lakování Vozidel - Základy",
    instructor: "Jan Novák",
    duration: "6 weeks",
    level: "Intermediate",
    students: 450,
    rating: 4.8
  },
  {
    id: 15,
    title: "Příprava Povrchu pro Lakování",
    instructor: "Marie Křenková",
    duration: "4 weeks",
    level: "Beginner",
    students: 320,
    rating: 4.6
  },
  {
    id: 16,
    title: "Tmelení a Karosářské Opravy",
    instructor: "František Hruška",
    duration: "8 weeks",
    level: "Intermediate",
    students: 280,
    rating: 4.7
  }
];

export default function CoursesPage() {
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  const totalLessons = EMBEDDED_DB_COURSE.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progress = Math.round((completedCount / totalLessons) * 100);

  const handleLessonClick = (lesson: any) => {
    setSelectedLesson(lesson);
    setShowLessonModal(true);
  };

  const markLessonComplete = (lessonId: number) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const isLessonCompleted = (lessonId: number) => completedLessons.has(lessonId);

  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-5">
        <Col>
           <div className="text-center mb-4">
             <h1 className="display-4 fw-bold mb-3">🎓 Online Kurzy</h1>
             <p className="lead text-muted">Rozšiřte své znalosti s našimi profesionálními kurzy</p>
             <Button
               variant="outline-info"
               onClick={() => {
                 const tour = createBasicTour();
                 addCoursesSteps(tour);
                 tour.start();
               }}
             >
               🧭 Take Tour
             </Button>
           </div>
        </Col>
      </Row>

      {/* Course Hero Section */}
      <Row className="mb-5">
        <Col>
          <Card className="shadow-lg border-0 bg-gradient-primary text-white">
            <Card.Body className="p-5">
              <Row>
                <Col lg={8}>
                  <Badge bg="light" text="dark" className="mb-3">⭐ Featured Course</Badge>
                  <h1 className="display-5 fw-bold mb-3">{EMBEDDED_DB_COURSE.title}</h1>
                  <p className="lead mb-4">{EMBEDDED_DB_COURSE.subtitle}</p>
                  <p className="mb-4">{EMBEDDED_DB_COURSE.description}</p>

                  <div className="d-flex flex-wrap gap-3 mb-4">
                    <div><strong>Instructor:</strong> {EMBEDDED_DB_COURSE.instructor}</div>
                    <div><strong>Institution:</strong> {EMBEDDED_DB_COURSE.institution}</div>
                    <div><strong>Duration:</strong> {EMBEDDED_DB_COURSE.duration}</div>
                    <div><strong>Level:</strong> {EMBEDDED_DB_COURSE.level}</div>
                  </div>

                  <div className="d-flex align-items-center gap-4 mb-4">
                    <div>⭐ {EMBEDDED_DB_COURSE.rating} ({EMBEDDED_DB_COURSE.students} students)</div>
                    <div>📜 Certificate Available</div>
                    <div>💰 {EMBEDDED_DB_COURSE.price}</div>
                  </div>

                  <div className="d-flex gap-3">
                    <Button size="lg" variant="light" className="text-primary fw-bold">
                      🚀 Enroll Now
                    </Button>
                    <Button size="lg" variant="outline-light">
                      📋 View Syllabus
                    </Button>
                  </div>
                </Col>
                <Col lg={4} className="text-center">
                  <div className="bg-white rounded p-4 text-dark">
                    <h4>Course Progress</h4>
                    <div className="mb-3">
                      <ProgressBar now={progress} className="mb-2" />
                      <small>{completedCount} of {totalLessons} lessons completed</small>
                    </div>
                    <Badge bg="success" className="fs-6">{progress}% Complete</Badge>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Course Content */}
      <Row className="mb-5">
        <Col lg={8}>
          <Card className="shadow">
            <Card.Header className="bg-dark text-white">
              <h3 className="mb-0">📚 Course Content</h3>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {EMBEDDED_DB_COURSE.modules.map((module, moduleIndex) => (
                  <div key={module.id}>
                    <ListGroup.Item className="bg-light fw-bold">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="badge bg-primary me-2">{moduleIndex + 1}</span>
                          {module.title}
                        </div>
                        <div className="text-muted small">
                          {module.lessons.length} lessons • {module.duration}
                        </div>
                      </div>
                    </ListGroup.Item>
                    {module.lessons.map((lesson) => (
                      <ListGroup.Item
                        key={lesson.id}
                        className="ps-4 cursor-pointer"
                        onClick={() => handleLessonClick(lesson)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="me-3"
                              checked={isLessonCompleted(lesson.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                if (e.target.checked) {
                                  markLessonComplete(lesson.id);
                                } else {
                                  setCompletedLessons(prev => {
                                    const newSet = new Set(prev);
                                    newSet.delete(lesson.id);
                                    return newSet;
                                  });
                                }
                              }}
                            />
                            <span className={isLessonCompleted(lesson.id) ? 'text-decoration-line-through text-muted' : ''}>
                              {lesson.title}
                            </span>
                          </div>
                          <Badge bg="secondary">{lesson.duration}</Badge>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </div>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Course Info Sidebar */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">ℹ️ Course Information</h5>
            </Card.Header>
            <Card.Body>
              <h6>Skills You'll Learn</h6>
              <div className="d-flex flex-wrap gap-1 mb-4">
                {EMBEDDED_DB_COURSE.skills.map(skill => (
                  <Badge key={skill} bg="info">{skill}</Badge>
                ))}
              </div>

              <h6>Prerequisites</h6>
              <ul className="small mb-4">
                {EMBEDDED_DB_COURSE.prerequisites.map(prereq => (
                  <li key={prereq}>{prereq}</li>
                ))}
              </ul>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>📖 Lectures</span>
                  <strong>{totalLessons}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>🧪 Quizzes</span>
                  <strong>{EMBEDDED_DB_COURSE.quizzes}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>💻 Projects</span>
                  <strong>{EMBEDDED_DB_COURSE.projects}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>👥 Peer Reviews</span>
                  <strong>{EMBEDDED_DB_COURSE.peerReviews}</strong>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Other Courses */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">🎓 Other Courses</h5>
            </Card.Header>
            <Card.Body className="p-0">
              {OTHER_COURSES.map(course => (
                <div key={course.id} className="p-3 border-bottom">
                  <h6 className="mb-1">{course.title}</h6>
                  <div className="text-muted small mb-2">
                    {course.instructor} • {course.duration}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge bg="secondary">{course.level}</Badge>
                    <small>⭐ {course.rating} ({course.students})</small>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>

          {/* New Categories Section */}
          <Card className="bg-dark text-white border-warning">
            <Card.Header className="bg-warning text-dark">
              <h5 className="mb-0">🎨 New Categories Available</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={4}>
                  <div className="text-center p-3 bg-danger bg-opacity-10 rounded">
                    <div className="fs-1 mb-2">👗</div>
                    <h6>Fashion Design</h6>
                    <small className="text-muted">Pattern making, textiles, garment construction</small>
                    <Button variant="outline-danger" size="sm" className="mt-2 d-block mx-auto">
                      View Courses
                    </Button>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center p-3 bg-pink bg-opacity-10 rounded" style={{ backgroundColor: 'rgba(232, 62, 140, 0.1)' }}>
                    <div className="fs-1 mb-2">📸</div>
                    <h6>Modeling</h6>
                    <small className="text-muted">Posing, runway, portfolio building</small>
                    <Button variant="outline-danger" size="sm" className="mt-2 d-block mx-auto" style={{ color: '#e83e8c', borderColor: '#e83e8c' }}>
                      View Courses
                    </Button>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center p-3 bg-success bg-opacity-10 rounded">
                    <div className="fs-1 mb-2">🎰</div>
                    <h6>Sports Betting</h6>
                    <small className="text-muted">Odds analysis, bankroll management</small>
                    <Button variant="outline-success" size="sm" className="mt-2 d-block mx-auto">
                      View Courses
                    </Button>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center p-3 bg-danger bg-opacity-10 rounded">
                    <div className="fs-1 mb-2">🚗</div>
                    <h6>Automotive</h6>
                    <small className="text-muted">Diagnostics, maintenance, repair</small>
                    <Button variant="outline-danger" size="sm" className="mt-2 d-block mx-auto">
                      View Courses
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Back to Home */}
      <Row>
        <Col className="text-center">
          <Link href="/" className="btn btn-outline-primary">
            ← Zpět na hlavní stránku
          </Link>
        </Col>
      </Row>

      {/* Lesson Modal */}
      <Modal show={showLessonModal} onHide={() => setShowLessonModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedLesson?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLesson ? (
            <div>
              <Alert variant="info">
                <strong>Lesson Duration:</strong> {selectedLesson.duration}
              </Alert>
              <div className="text-center py-5">
                <div className="fs-1 mb-3">🎬</div>
                <h4>Video Content Coming Soon</h4>
                <p className="text-muted">
                  This lesson will contain video content, exercises, and downloadable materials.
                </p>
              </div>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLessonModal(false)}>
            Close
          </Button>
          <Button variant="primary">
            Mark as Complete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}