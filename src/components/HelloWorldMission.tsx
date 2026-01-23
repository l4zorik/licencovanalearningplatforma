"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Form, Badge, Container, Row, Col } from 'react-bootstrap';

interface Message {
    sender: 'ai' | 'user';
    text: string;
}

interface TerminalLine {
    type: 'input' | 'output' | 'error' | 'system';
    content: string;
}

interface HelloWorldMissionProps {
    onComplete: () => void;
}

const HelloWorldMission: React.FC<HelloWorldMissionProps> = ({ onComplete }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
        { type: 'system', content: 'Initializing environment...' },
        { type: 'system', content: 'Python 3.9.7 environment loaded.' },
        { type: 'system', content: 'Type your code below and press Enter.' }
    ]);
    const [input, setInput] = useState('');
    const [step, setStep] = useState(0);
    const terminalEndRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const addAiMessage = (text: string) => {
        setMessages(prev => [...prev, { sender: 'ai', text }]);
    };

    // Auto-scroll terminal and chat
    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [terminalLines]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // AI Logic
    useEffect(() => {
        const aiDelay = 800; // Simulate typing delay

        if (step === 0) {
            setTimeout(() => {
                addAiMessage("Greetings, User. I am your AI Guide. Your first mission is to communicate with this computer.");
                setTimeout(() => {
                     addAiMessage("In the world of programming, the first tradition is to make the computer say 'Hello World'.");
                     addAiMessage("Type `print(\"Hello World\")` in the terminal on the right to make it happen.");
                     setStep(1);
                }, 1500);
            }, 500);
        }
    }, [step]);

    const handleTerminalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input;
        setTerminalLines(prev => [...prev, { type: 'input', content: `>>> ${cmd}` }]);
        setInput('');

        // Process Command
        processCommand(cmd);
    };

    const processCommand = (cmd: string) => {
        // Normalize
        const trimmed = cmd.trim();
        
        if (step === 1) {
            // Check for correct print statement
            // Allow single or double quotes
            const regex = /^print\s*\(\s*(['\"])Hello World\1\s*\)$/i;
            
            if (regex.test(trimmed)) {
                setTimeout(() => {
                    setTerminalLines(prev => [...prev, { type: 'output', content: 'Hello World' }]);
                    setStep(2); // Next step
                    setTimeout(() => {
                        addAiMessage("Excellent! You have successfully commanded the machine.");
                        addAiMessage("You've taken your first step into a larger world.");
                        setTimeout(() => {
                             onComplete();
                        }, 2000);
                    }, 500);
                }, 200);
            } else {
                 // Error handling simulation
                 setTimeout(() => {
                     if (trimmed.startsWith("print")) {
                         setTerminalLines(prev => [...prev, { type: 'error', content: 'SyntaxError: invalid syntax. Did you forget quotes or parentheses?' }]);
                         addAiMessage("Close! Make sure you use parentheses `()` and quotes `\"\". Like this: `print(\"Hello World\")`");
                     } else {
                         setTerminalLines(prev => [...prev, { type: 'error', content: `NameError: name '${trimmed.split('(')[0]}' is not defined` }]);
                         addAiMessage("That doesn't look like the `print` command. Try typing: `print(\"Hello World\")`");
                     }
                 }, 200);
            }
        } else {
             setTimeout(() => {
                setTerminalLines(prev => [...prev, { type: 'output', content: 'Command ignored. Mission complete.' }]);
             }, 200);
        }
    };

    return (
        <Container fluid className="p-0 h-100">
            <Row className="g-4 h-100">
                {/* AI Chat Panel */}
                <Col md={4} className="d-flex flex-column h-100">
                    <Card className="shadow-lg border-0 h-100" style={{ background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
                        <Card.Header className="bg-dark text-white border-bottom border-secondary d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">🤖 AI Guide</h5>
                            <Badge bg="info">Online</Badge>
                        </Card.Header>
                        <Card.Body className="d-flex flex-column p-0" style={{ height: '500px' }}>
                             <div className="flex-grow-1 overflow-auto p-3" style={{ maxHeight: '100%' }}>
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                                        <div 
                                            className={`p-3 rounded-3 ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-dark text-light border border-secondary'}`}
                                            style={{ maxWidth: '85%' }}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                             </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Simulated Terminal */}
                <Col md={8}>
                     <Card className="shadow-lg border-0 h-100" style={{ background: '#0d1117' }}>
                        <Card.Header className="bg-dark text-white border-bottom border-secondary d-flex justify-content-between align-items-center">
                             <div className="d-flex align-items-center gap-2">
                                 <div className="rounded-circle bg-danger" style={{width: 12, height: 12}}></div>
                                 <div className="rounded-circle bg-warning" style={{width: 12, height: 12}}></div>
                                 <div className="rounded-circle bg-success" style={{width: 12, height: 12}}></div>
                                 <span className="ms-2 font-monospace small text-muted">user@dev-environment:~/workspace</span>
                             </div>
                             <Badge bg="success" className="font-monospace">PYTHON 3.9</Badge>
                        </Card.Header>
                        <Card.Body className="p-0 d-flex flex-column" style={{ height: '500px' }}>
                            <div className="flex-grow-1 overflow-auto p-3 font-monospace" style={{ backgroundColor: '#0d1117', color: '#c9d1d9' }}>
                                {terminalLines.map((line, idx) => (
                                    <div key={idx} className="mb-1">
                                        {line.type === 'input' && <span className="text-warning">{line.content}</span>}
                                        {line.type === 'output' && <span className="text-success">{line.content}</span>}
                                        {line.type === 'error' && <span className="text-danger">{line.content}</span>}
                                        {line.type === 'system' && <span className="text-muted fst-italic">{line.content}</span>}
                                    </div>
                                ))}
                                <div ref={terminalEndRef} />
                            </div>
                            <div className="p-3 border-top border-secondary" style={{ backgroundColor: '#161b22' }}>
                                <Form onSubmit={handleTerminalSubmit} className="d-flex align-items-center">
                                    <span className="text-success font-monospace me-2">➜</span>
                                    <Form.Control
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type command..."
                                        className="bg-transparent border-0 text-white font-monospace p-0 shadow-none"
                                        autoFocus
                                        autoComplete="off"
                                    />
                                </Form>
                            </div>
                        </Card.Body>
                     </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HelloWorldMission;
