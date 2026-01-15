"use client";

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Modal, Form, Table, Alert } from 'react-bootstrap';
import Link from 'next/link';

const BETTING_MODULES = [
    {
        id: 1,
        title: "Understanding Odds",
        icon: "📊",
        description: "Learn how betting odds work, different formats, and calculating potential payouts.",
        lessons: [
            { id: 1, title: "Decimal Odds Explained", duration: "15 min", completed: false },
            { id: 2, title: "Fractional Odds Explained", duration: "15 min", completed: false },
            { id: 3, title: "American (Moneyline) Odds", duration: "20 min", completed: false },
            { id: 4, title: "Implied Probability", duration: "20 min", completed: false },
            { id: 5, title: "Calculating Payouts", duration: "25 min", completed: false }
        ]
    },
    {
        id: 2,
        title: "Bankroll Management",
        icon: "💰",
        description: "Essential money management strategies for sustainable betting.",
        lessons: [
            { id: 6, title: "Setting Your Bankroll", duration: "15 min", completed: false },
            { id: 7, title: "Unit Size & Stake Sizing", duration: "20 min", completed: false },
            { id: 8, title: "The Kelly Criterion", duration: "25 min", completed: false },
            { id: 9, title: "Stop Loss & Win Limits", duration: "15 min", completed: false },
            { id: 10, title: "Variance & Downswings", duration: "20 min", completed: false }
        ]
    },
    {
        id: 3,
        title: "Sports Analysis",
        icon: "📈",
        description: "Learn to analyze sports and find value in betting markets.",
        lessons: [
            { id: 11, title: "Statistical Analysis Basics", duration: "25 min", completed: false },
            { id: 12, title: "Form vs Fixture Analysis", duration: "20 min", completed: false },
            { id: 13, title: "Injury & Team News Impact", duration: "15 min", completed: false },
            { id: 14, title: "Home Advantage Factors", duration: "15 min", completed: false },
            { id: 15, title: "Line Movement Analysis", duration: "20 min", completed: false }
        ]
    },
    {
        id: 4,
        title: "Betting Strategies",
        icon: "🎯",
        description: "Different betting approaches and when to use them.",
        lessons: [
            { id: 16, title: "Value Betting Explained", duration: "25 min", completed: false },
            { id: 17, title: "Arbitrage Betting", duration: "20 min", completed: false },
            { id: 18, title: "Matched Betting Basics", duration: "25 min", completed: false },
            { id: 19, title: "Live/In-Play Betting", duration: "20 min", completed: false },
            { id: 20, title: "Building Your Own Strategy", duration: "30 min", completed: false }
        ]
    }
];

const BETTING_SIMULATION = {
    initialBankroll: 1000,
    currentBet: null as { event: string; selection: string; odds: number; stake: number; potentialWin: number } | null,
    bankroll: 1000,
    bettingHistory: [] as { event: string; selection: string; odds: number; stake: number; result: string; profit: number }[]
};

export default function SportsBettingPage() {
    const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
    const [activeModule, setActiveModule] = useState<any>(null);
    const [bankroll, setBankroll] = useState(BETTING_SIMULATION.initialBankroll);
    const [currentBet, setCurrentBet] = useState<any>(null);
    const [bettingHistory, setBettingHistory] = useState<any[]>([]);
    const [showSimulator, setShowSimulator] = useState(false);
    const [simulatorMessage, setSimulatorMessage] = useState("");
    const [stake, setStake] = useState("100");

    const totalLessons = BETTING_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedCount = completedLessons.size;
    const progress = Math.round((completedCount / totalLessons) * 100);

    const markComplete = (lessonId: number) => {
        setCompletedLessons(prev => new Set([...prev, lessonId]));
    };

    const placeBet = (event: string, selection: string, odds: number) => {
        const stakeAmount = parseInt(stake);
        if (stakeAmount > bankroll) {
            setSimulatorMessage("❌ Insufficient bankroll!");
            return;
        }
        setCurrentBet({ event, selection, odds, stake: stakeAmount, potentialWin: stakeAmount * odds });
        setSimulatorMessage(`💰 Bet placed: ${stakeAmount} on ${selection} @ ${odds}`);
    };

    const resolveBet = (win: boolean) => {
        if (!currentBet) return;
        
        const profit = win 
            ? currentBet.stake * (currentBet.odds - 1)
            : -currentBet.stake;
        
        setBankroll(prev => prev + profit);
        setBettingHistory(prev => [{
            ...currentBet,
            result: win ? "WIN" : "LOSE",
            profit
        }, ...prev]);
        
        setSimulatorMessage(win 
            ? `🎉 You won! +${profit.toFixed(2)}` 
            : `😔 You lost ${Math.abs(profit)}`
        );
        setCurrentBet(null);
    };

    const EVENTS = [
        { event: "Football: Real Madrid vs Barcelona", selections: [
            { name: "Real Madrid", odds: 2.1 },
            { name: "Draw", odds: 3.4 },
            { name: "Barcelona", odds: 2.8 }
        ]},
        { event: "Tennis: Djokovic vs Alcaraz", selections: [
            { name: "Djokovic", odds: 1.75 },
            { name: "Alcaraz", odds: 2.05 }
        ]},
        { event: "Basketball: Lakers vs Celtics", selections: [
            { name: "Lakers -3.5", odds: 1.9 },
            { name: "Celtics +3.5", odds: 1.9 }
        ]}
    ];

    return (
        <main className="min-vh-100 bg-dark text-white pb-5">
            <nav className="navbar navbar-dark bg-black border-bottom border-success mb-4">
                <Container fluid>
                    <Link href="/training" className="btn btn-outline-light btn-sm">
                        ← Exit Training
                    </Link>
                    <span className="navbar-brand mb-0 h5 mx-auto text-success">
                        🎰 Sports Betting Fundamentals
                    </span>
                    <Badge bg="success" className="fs-6">{progress}% Complete</Badge>
                </Container>
            </nav>

            <Container>
                <Row className="mb-5">
                    <Col lg={8}>
                        <h1 className="display-4 fw-bold mb-3">Bet Smart, Play Responsible</h1>
                        <p className="lead text-white-50">
                            Master the fundamentals of sports betting. Learn odds calculation, bankroll management, and analytical strategies.
                        </p>
                        <div className="d-flex gap-3">
                            <Badge bg="success">Sports Betting</Badge>
                            <Badge bg="warning" text="dark">Risk Management Focus</Badge>
                            <Badge bg-info text="dark">4 Modules • 20 Lessons</Badge>
                        </div>
                        <Alert variant="warning" className="mt-4">
                            ⚠️ <strong>Responsible Gambling:</strong> This training is for educational purposes only. Never bet more than you can afford to lose.
                        </Alert>
                    </Col>
                    <Col lg={4}>
                        <Card className="bg-success bg-opacity-10 border-success">
                            <Card.Body>
                                <h5>📊 Training Progress</h5>
                                <ProgressBar now={progress} variant="success" className="mb-2" />
                                <small>{completedCount} of {totalLessons} lessons completed</small>
                                <hr />
                                <h6>💰 Your Virtual Bankroll</h6>
                                <div className="display-6 fw-bold text-success">${bankroll.toFixed(2)}</div>
                                <Button variant="success" size="sm" className="mt-2" onClick={() => setShowSimulator(true)}>
                                    🎰 Open Betting Simulator
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>
                        <h3 className="mb-4">📚 Course Modules</h3>
                        <Row className="g-4">
                            {BETTING_MODULES.map((module) => (
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
                        <h3 className="mb-4">📖 Key Betting Terms</h3>
                        <Row className="g-3">
                            {[
                                { term: "Bankroll", desc: "Total amount of money set aside for betting" },
                                { term: "Stake", desc: "Amount wagered on a single bet" },
                                { term: "Odds", desc: "Probability representation determining potential payout" },
                                { term: "Value Bet", desc: "A bet where the odds are higher than the actual probability" },
                                { term: "Stake", desc: "The amount of money you risk on a bet" },
                                { term: "Over/Under", desc: "Betting on whether a statistic will be over or under a set number" },
                                { term: "Spread", desc: "Point handicap between teams in a game" },
                                { term: "Parlay", desc: "A single bet combining multiple selections" }
                            ].map((item, i) => (
                                <Col md={3} sm={6} key={i}>
                                    <Card className="bg-dark border-secondary h-100">
                                        <Card.Body>
                                            <h6 className="text-success">{item.term}</h6>
                                            <p className="small text-white-50 mb-0">{item.desc}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center">
                        <Card className="bg-gradient bg-success bg-opacity-25 border-success d-inline-block p-5">
                            <h3>🎓 Betting Certification</h3>
                            <p className="text-white-50">Complete all modules and pass the final exam to demonstrate your betting knowledge.</p>
                            <Button variant="success" size="lg">
                                📝 Take Certification Exam
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

            <Modal show={showSimulator} onHide={() => setShowSimulator(false)} size="lg">
                <Modal.Header closeButton className="bg-dark text-white border-success">
                    <Modal.Title>🎰 Betting Simulator</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    <Row>
                        <Col lg={8}>
                            <h6 className="mb-3">📅 Today's Events</h6>
                            {EVENTS.map((event, i) => (
                                <Card key={i} className="mb-3 bg-secondary bg-opacity-25">
                                    <Card.Body>
                                        <div className="fw-bold mb-2">{event.event}</div>
                                        <div className="d-flex flex-wrap gap-2">
                                            {event.selections.map((sel, j) => (
                                                <Button 
                                                    key={j}
                                                    variant={currentBet?.selection === sel.name ? "success" : "outline-success"}
                                                    size="sm"
                                                    onClick={() => placeBet(event.event, sel.name, sel.odds)}
                                                >
                                                    {sel.name} @ {sel.odds}
                                                </Button>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                            <Form.Group className="mb-3">
                                <Form.Label>Stake Amount ($)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    value={stake}
                                    onChange={(e) => setStake(e.target.value)}
                                    className="bg-dark text-white border-secondary"
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Card className="bg-black border-success">
                                <Card.Body>
                                    <h6>💰 Bankroll</h6>
                                    <div className="display-6 text-success fw-bold">${bankroll.toFixed(2)}</div>
                                    <hr />
                                    {currentBet && (
                                        <div className="mb-3">
                                            <div className="text-muted small">Current Bet</div>
                                            <div className="fw-bold">{currentBet.selection}</div>
                                            <div className="text-success">Potential Win: ${currentBet.potentialWin.toFixed(2)}</div>
                                            <div className="d-flex gap-2 mt-2">
                                                <Button variant="success" size="sm" onClick={() => resolveBet(true)}>WIN</Button>
                                                <Button variant="danger" size="sm" onClick={() => resolveBet(false)}>LOSE</Button>
                                            </div>
                                        </div>
                                    )}
                                    {simulatorMessage && (
                                        <Alert variant={simulatorMessage.includes("won") ? "success" : simulatorMessage.includes("lost") ? "danger" : "info"} className="small">
                                            {simulatorMessage}
                                        </Alert>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {bettingHistory.length > 0 && (
                        <Row className="mt-3">
                            <Col>
                                <h6>📜 Betting History</h6>
                                <Table striped bordered hover variant="dark" size="sm">
                                    <thead>
                                        <tr>
                                            <th>Event</th>
                                            <th>Selection</th>
                                            <th>Odds</th>
                                            <th>Stake</th>
                                            <th>Result</th>
                                            <th>Profit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bettingHistory.slice(0, 5).map((bet, i) => (
                                            <tr key={i}>
                                                <td className="small">{bet.event.substring(0, 20)}...</td>
                                                <td>{bet.selection}</td>
                                                <td>{bet.odds}</td>
                                                <td>${bet.stake}</td>
                                                <td>
                                                    <Badge bg={bet.result === "WIN" ? "success" : "danger"}>
                                                        {bet.result}
                                                    </Badge>
                                                </td>
                                                <td className={bet.profit >= 0 ? "text-success" : "text-danger"}>
                                                    {bet.profit >= 0 ? "+" : ""}{bet.profit.toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-dark border-secondary">
                    <Button variant="secondary" onClick={() => setShowSimulator(false)}>
                        Close Simulator
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}
