"use client";

import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Badge, ProgressBar, Modal, Alert } from 'react-bootstrap';
import Link from 'next/link';

// --- GAME CONFIGURATION ---
const ITEMS = [
    { id: 'apple', name: 'Premium Apple', baseCost: 10, maxPrice: 25 },
    { id: 'bread', name: 'Artisan Bread', baseCost: 25, maxPrice: 60 },
    { id: 'milk', name: 'Fresh Milk', baseCost: 20, maxPrice: 50 },
    { id: 'coffee', name: 'Coffee Beans', baseCost: 80, maxPrice: 180 },
];

const INITIAL_CASH = 500;

export default function ShopManagementPage() {
    // --- STATE ---
    const [cash, setCash] = useState(INITIAL_CASH);
    const [day, setDay] = useState(1);
    const [phase, setPhase] = useState<'prep' | 'open' | 'report'>('prep');
    
    // Inventory: { itemId: quantity }
    const [inventory, setInventory] = useState<Record<string, number>>({
        apple: 0, bread: 0, milk: 0, coffee: 0
    });
    
    // Prices: { itemId: price }
    const [prices, setPrices] = useState<Record<string, number>>({
        apple: 15, bread: 35, milk: 30, coffee: 120
    });

    // Simulation State
    const [logs, setLogs] = useState<string[]>([]);
    const [dailySales, setDailySales] = useState<number>(0);
    const [dailyCustomers, setDailyCustomers] = useState<number>(0);
    const [customerTimer, setCustomerTimer] = useState<number>(0);
    const [simulationTime, setSimulationTime] = useState(0); // 0 to 100%

    // --- ACTIONS ---

    const buyItem = (itemId: string, cost: number) => {
        if (cash >= cost) {
            setCash(prev => prev - cost);
            setInventory(prev => ({
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1
            }));
        }
    };

    const handlePriceChange = (itemId: string, newPrice: string) => {
        const price = parseInt(newPrice);
        if (!isNaN(price) && price >= 0) {
            setPrices(prev => ({ ...prev, [itemId]: price }));
        }
    };

    const startDay = () => {
        setPhase('open');
        setLogs([]);
        setDailySales(0);
        setDailyCustomers(0);
        setSimulationTime(0);
        setCustomerTimer(0);
    };

    // --- SIMULATION LOOP ---
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (phase === 'open') {
            interval = setInterval(() => {
                setSimulationTime(prev => {
                    if (prev >= 100) {
                        setPhase('report');
                        return 100;
                    }
                    return prev + 1; // Day lasts ~10 seconds (100 ticks * 100ms) - Adjust speed here
                });

                // Customer Logic
                if (Math.random() > 0.7) { // 30% chance per tick for a customer event attempt
                    handleCustomer();
                }

            }, 100);
        }

        return () => clearInterval(interval);
    }, [phase, inventory, prices]); // Re-bind when inventory/prices change to use current state

    // We need to use refs or functional updates for simulation logic to access latest state without re-triggering effect too often
    // However, for simplicity in this prototype, I'm letting the effect re-run or using the state available in closure.
    // Better approach for complex games: useReducer or refs.
    
    // To fix the closure stale state issue in the interval, let's use a Ref for the game state accessible inside the loop
    const gameStateRef = useRef({ inventory, prices, cash });
    useEffect(() => {
        gameStateRef.current = { inventory, prices, cash };
    }, [inventory, prices, cash]);

    const handleCustomer = () => {
        const state = gameStateRef.current;
        
        // Pick random item preference
        const potentialItems = ITEMS.filter(i => state.inventory[i.id] > 0);
        
        if (potentialItems.length === 0) {
            setLogs(prev => ["🚫 Customer left: Shop empty!", ...prev].slice(0, 5));
            return;
        }

        const wantedItem = potentialItems[Math.floor(Math.random() * potentialItems.length)];
        const currentPrice = state.prices[wantedItem.id];
        
        // Buying Logic:
        // Price limit varies slightly per customer (random factor)
        // If Price < BaseCost * 1.5 -> High chance
        // If Price > MaxPrice -> 0 chance
        
        const customerMaxBudget = wantedItem.maxPrice * (0.8 + Math.random() * 0.4); // Random budget
        
        if (currentPrice <= customerMaxBudget) {
            // Transaction
            setInventory(prev => ({
                ...prev,
                [wantedItem.id]: prev[wantedItem.id] - 1
            }));
            setCash(prev => prev + currentPrice);
            setDailySales(prev => prev + currentPrice);
            setDailyCustomers(prev => prev + 1);
            setLogs(prev => [`✅ Sold ${wantedItem.name} for $${currentPrice}`, ...prev].slice(0, 5));
        } else {
            setLogs(prev => [`❌ Customer refused ${wantedItem.name} at $${currentPrice} (Too expensive!)`, ...prev].slice(0, 5));
        }
    };

    const nextDay = () => {
        setDay(prev => prev + 1);
        setPhase('prep');
    };

    return (
        <main className="min-vh-100 bg-dark text-white pb-5">
             <nav className="navbar navbar-dark bg-black border-bottom border-secondary mb-4">
                <Container fluid>
                    <Link href="/training" className="btn btn-outline-light btn-sm">
                        ← Exit Simulation
                    </Link>
                    <div className="text-center">
                        <span className="navbar-brand mb-0 h5 text-info">🛍️ Retail Tycoon Sim</span>
                        <div className="small text-white-50">Day {day}</div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <Badge bg="success" className="fs-5 p-2">Cash: ${cash}</Badge>
                    </div>
                </Container>
            </nav>

            <Container>
                {/* PHASE: PREPARATION */}
                {phase === 'prep' && (
                    <Row className="g-4">
                        <Col lg={8}>
                            <Card className="bg-dark border-secondary h-100">
                                <Card.Header className="bg-black text-white border-secondary">
                                    <h5 className="mb-0">📦 Inventory Management</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Table hover variant="dark" responsive className="align-middle">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Cost</th>
                                                <th>In Stock</th>
                                                <th>Buy Stock</th>
                                                <th>Set Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ITEMS.map(item => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="fw-bold">{item.name}</div>
                                                        <small className="text-muted">Max Recomm: ${item.maxPrice}</small>
                                                    </td>
                                                    <td className="text-danger">-${item.baseCost}</td>
                                                    <td className="fs-5">{inventory[item.id] || 0}</td>
                                                    <td>
                                                        <Button 
                                                            variant="outline-success" 
                                                            size="sm" 
                                                            onClick={() => buyItem(item.id, item.baseCost)}
                                                            disabled={cash < item.baseCost}
                                                        >
                                                            Buy (+1)
                                                        </Button>
                                                    </td>
                                                    <td style={{width: '120px'}}>
                                                        <Form.Control 
                                                            type="number" 
                                                            size="sm"
                                                            value={prices[item.id]} 
                                                            onChange={(e) => handlePriceChange(item.id, e.target.value)}
                                                            className="bg-dark text-white border-secondary"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col lg={4}>
                            <Card className="bg-info bg-opacity-10 border-info h-100">
                                <Card.Body className="d-flex flex-column justify-content-center text-center">
                                    <h4 className="mb-4">Ready to Open?</h4>
                                    <p>Ensure you have enough stock and your prices are competitive.</p>
                                    <Button variant="info" size="lg" className="fw-bold text-dark" onClick={startDay}>
                                        OPEN SHOP 🔔
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

                {/* PHASE: OPEN & REPORT */}
                {(phase === 'open' || phase === 'report') && (
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <Card className="bg-dark border-secondary mb-4">
                                <Card.Body className="text-center p-5">
                                    {phase === 'open' ? (
                                        <>
                                            <h2 className="mb-4">🏪 Shop is Open!</h2>
                                            <ProgressBar animated now={simulationTime} variant="info" className="mb-4" style={{height: '20px'}} />
                                            <div className="d-flex justify-content-center gap-5 mb-4">
                                                <div>
                                                    <div className="text-white-50">Customers</div>
                                                    <div className="fs-2 fw-bold">{dailyCustomers}</div>
                                                </div>
                                                <div>
                                                    <div className="text-white-50">Sales</div>
                                                    <div className="fs-2 fw-bold text-success">${dailySales}</div>
                                                </div>
                                            </div>
                                            <div className="bg-black p-3 rounded text-start font-monospace text-muted" style={{minHeight: '150px'}}>
                                                {logs.map((log, i) => (
                                                    <div key={i}>{log}</div>
                                                ))}
                                                {logs.length === 0 && <div>Waiting for customers...</div>}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="mb-4">🌙 Day {day} Report</h2>
                                            <div className="py-4">
                                                <div className="display-4 fw-bold text-success mb-2">+${dailySales}</div>
                                                <p className="lead text-white-50">Total Revenue</p>
                                            </div>
                                            <Button variant="primary" size="lg" onClick={nextDay}>
                                                Start Next Day ➡️
                                            </Button>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </main>
    );
}
