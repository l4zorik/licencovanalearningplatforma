"use client";

import { Container, Row, Col, Card, Badge, Button, ProgressBar, Form, InputGroup } from 'react-bootstrap';
import Link from 'next/link';
import { MISSIONS } from '@/lib/data/missions';
import { useState, useMemo } from 'react';

export default function MissionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')

  const activeMission = MISSIONS.find(m => m.status === 'In Progress') || MISSIONS[0]

  // Calculate total tasks across all phases for the active mission
  const totalTasks = activeMission.phases.reduce((acc, phase) => acc + phase.tasks.length, 0);

  const savedProgress = typeof window !== 'undefined' ? localStorage.getItem(`mission_${activeMission.id}_tasks`) : null
  const completedTasks = savedProgress ? Object.keys(JSON.parse(savedProgress)).filter(k => JSON.parse(savedProgress)[k]).length : 0
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Filter available missions
  const availableMissions = useMemo(() => {
    return MISSIONS.filter(m => m.id !== activeMission.id).filter(mission => {
      const matchesSearch = searchQuery === '' ||
        mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mission.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === 'all' || mission.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'all' || mission.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [searchQuery, selectedCategory, selectedDifficulty, activeMission.id])

  // Get unique categories and difficulties for filter options
  const categories = [...new Set(MISSIONS.map(m => m.category))]
  const difficulties = [...new Set(MISSIONS.map(m => m.difficulty))]

  return (
    <main className="min-vh-100 bg-dark text-white pb-5">
      <nav className="navbar navbar-dark bg-black border-bottom border-secondary mb-5">
        <Container fluid>
            <Link href="/" className="btn btn-outline-light btn-sm">
                ← Zpět na Dashboard
            </Link>
            <span className="navbar-brand mb-0 h1 mx-auto text-uppercase letter-spacing-2 text-warning">
                ⚔️ Mise
            </span>
            <div className="text-white-50 small">XP: 0</div>
        </Container>
      </nav>

      <Container>
        {activeMission && (
          <Row className="justify-content-center mb-5">
            <Col lg={8}>
              <div className="text-center mb-4">
                <h2 className="fw-bold text-warning">TVÁ AKTIVNÍ MISE</h2>
              </div>

              <Card className="bg-gradient border-0 shadow-lg" 
                    style={{
                        background: 'linear-gradient(145deg, #e8e8e8 0%, #d0d0d0 100%)',
                        borderLeft: '4px solid #ffc107'
                    }}>
                <Card.Body className="p-5">
                    <div className="d-flex justify-content-between align-items-start mb-4">
                        <div className="d-flex align-items-center gap-3">
                            <Badge bg="primary" className="text-uppercase px-3 py-2">
                                {activeMission.category}
                            </Badge>
                            <Badge bg="warning" className="text-uppercase px-3 py-2 text-dark">
                                {activeMission.difficulty}
                            </Badge>
                        </div>
                        <div className="text-end">
                            <div className="fw-bold text-dark fs-4">{activeMission.xp} XP</div>
                        </div>
                    </div>

                    <h2 className="card-title fw-bold mb-3 text-dark">{activeMission.title}</h2>
                    <h5 className="text-secondary mb-3">{activeMission.subtitle}</h5>
                    <p className="text-secondary mb-4 fs-5">{activeMission.description}</p>

                    <div className="bg-white bg-opacity-50 p-4 rounded mb-4 border border-secondary border-opacity-25">
                         <div className="d-flex align-items-center mb-3">
                            <div className="me-3 bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{width: '48px', height: '48px'}}>
                                {activeMission.instructor.name.substring(0, 1)}
                            </div>
                            <div>
                                <h6 className="text-uppercase text-secondary small fw-bold mb-0">Briefing od: {activeMission.instructor.name}</h6>
                                <small className="text-muted">{activeMission.instructor.role}</small>
                            </div>
                        </div>
                        <p className="mb-0 fst-italic text-dark">&quot;{activeMission.briefing}&quot;</p>
                    </div>

                    <div className="mb-4">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="fw-bold text-dark">Pokrok</span>
                            <span className="text-dark">{progressPercent}% ({completedTasks}/{totalTasks} úkolů)</span>
                        </div>
                        <ProgressBar now={progressPercent} variant="warning" style={{height: '12px'}} />
                    </div>

                    <div className="d-flex gap-3">
                        <Link href={`/missions/${activeMission.id}`} className="text-decoration-none flex-grow-1">
                            <Button variant="warning" className="w-100 py-3 fw-bold fs-5">
                                🎮 POKRAČOVAT V MISI
                            </Button>
                        </Link>
                    </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        <Row className="justify-content-center">
          <Col lg={10}>
            <h3 className="mb-4 text-center text-white-50">DALŠÍ DOSTUPNÉ MISE</h3>

            {/* Search and Filter Section */}
            <Card className="bg-dark border-secondary mb-4">
              <Card.Body className="p-4">
                <Row className="g-3">
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text className="bg-secondary border-secondary text-white">
                        🔍
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Hledat mise..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-dark border-secondary text-white"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={3}>
                    <Form.Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-dark border-secondary text-white"
                    >
                      <option value="all" className="bg-dark text-white">Všechny kategorie</option>
                      {categories.map(category => (
                        <option key={category} value={category} className="bg-dark text-white">
                          {category}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <Form.Select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="bg-dark border-secondary text-white"
                    >
                      <option value="all" className="bg-dark text-white">Všechny obtížnosti</option>
                      {difficulties.map(difficulty => (
                        <option key={difficulty} value={difficulty} className="bg-dark text-white">
                          {difficulty}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

                {/* Results count */}
                <div className="text-center mt-3">
                  <small className="text-muted">
                    Nalezeno {availableMissions.length} misí
                    {searchQuery && ` pro "${searchQuery}"`}
                  </small>
                </div>
              </Card.Body>
            </Card>

            <Row xs={1} md={2} lg={3} className="g-4">
              {availableMissions.map((mission) => (
                <Col key={mission.id}>
                  <Card className="bg-dark border-secondary h-100 mission-card" style={{transition: 'transform 0.2s'}}>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Badge bg={mission.difficulty === 'Expert' ? 'danger' : mission.difficulty === 'Advanced' ? 'warning' : 'success'} className="text-dark">
                          {mission.difficulty}
                        </Badge>
                        <span className="text-warning fw-bold">{mission.xp} XP</span>
                      </div>
                      
                      <h5 className="card-title mb-1 text-white">{mission.title}</h5>
                      <p className="text-muted small mb-3">{mission.subtitle}</p>
                      
                      <p className="text-white-50 small mb-3">{mission.description}</p>
                      
                      <div className="mb-3">
                        {mission.tags.slice(0, 4).map(tag => (
                          <Badge key={tag} bg="secondary" className="me-1 mb-1 text-dark">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Link href={`/missions/${mission.id}`} className="text-decoration-none">
                        <Button variant="outline-warning" className="w-100">
                          ZAČÍT MISI
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      
      <style jsx global>{`
        .letter-spacing-2 {
            letter-spacing: 2px;
        }
        .mission-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
      `}</style>
    </main>
  );
}
