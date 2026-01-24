"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Badge, Button, Tabs, Tab, Form } from 'react-bootstrap';
import Link from 'next/link';
import { 
  FiHome, FiTarget, FiUsers, FiAward, FiBook, FiMessageCircle, 
  FiSettings, FiChevronLeft, FiPlay, FiRotateCcw, FiCheckCircle,
  FiAlertCircle, FiCode, FiEye, FiTerminal, FiUnlock
} from 'react-icons/fi';

// Mock challenge data - would come from database/API
const CHALLENGE_DATA = {
  id: 1,
  title: "Cut the cake",
  difficulty: 2,
  kyu: "2 kyu",
  description: "You are given a rectangular cake with several raisins (represented by 'o'). Your task is to cut the cake into equal rectangular pieces so that each piece contains exactly one raisin.",
  
  // Stats
  totalAttempts: 754,
  successRate: 75.4,
  author: "myjinxin2015",
  
  // Languages available
  languages: [
    { name: "Python", version: "3.11", selected: true },
    { name: "JavaScript", version: "ES2022", selected: false },
    { name: "Java", version: "17", selected: false },
    { name: "C++", version: "C++17", selected: false }
  ],
  
  // Template code
  templateCode: `def cut(cake):
    # Parse input
    if isinstance(cake, str):
        cake = [list(row) for row in cake.strip().split('\\n')]
    else:
        cake = [list(row) for row in cake]
    
    rows = len(cake)
    if rows == 0:
        return []
    cols = len(cake[0])
    
    # Find all raisin positions
    raisins = [(i, j) for i in range(rows) for j in range(cols) if cake[i][j] == 'o']
    n = len(raisins)
    
    if n <= 1 or n >= 10:
        return []
    
    total_area = rows * cols
    if total_area % n != 0:
        return []
    
    area_per_piece = total_area // n
    
    # Find all possible rectangle dimensions
    possible_dimensions = [(h, area_per_piece // h) for h in range(1, rows + 1) 
                          if area_per_piece % h == 0 and area_per_piece // h <= cols]
    
    if not possible_dimensions:
        return []
    
    # Your implementation here
    return []`,
  
  // Test cases
  testCases: [
    {
      name: "Basic test",
      input: `........
.....
.....
.....`,
      expected: `[
".o",
"..",
"..",
"..",
".."
]`,
      hidden: false
    },
    {
      name: "Two raisins",
      input: `.o.o....
.o.o....
........
........`,
      expected: `[
".o.o",
".o.o",
"....",
"...."
]`,
      hidden: false
    },
    {
      name: "Complex pattern",
      input: `.o.o.o.
.......
.......
.......
.......
.......
.......
.......
.......
.......`,
      expected: "Array of 5 pieces",
      hidden: true
    }
  ],
  
  // Instructions
  instructions: `You are given a rectangular cake with several raisins (represented by 'o'). 
Your task is to cut the cake into equal rectangular pieces so that each piece contains exactly one raisin.

## Rules:
1. Each piece must be a rectangle
2. Each piece must contain exactly one raisin ('o')
3. All pieces must have the same area
4. The cake must be completely covered by the pieces

## Output:
Return an array of strings, where each string represents one piece of the cake.
The pieces should be in the order they were cut (top to bottom, left to right).`,
  
  // Output section
  output: `Return an array of strings, where each string represents one piece of the cake.`
};

// User stats (mock)
const USER_STATS = {
  username: "l4zorik",
  avatar: "l4zorik",
  kyu: "3 kyu",
  honor: 1884
};

export default function ChallengeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("instructions");
  const [code, setCode] = useState(CHALLENGE_DATA.templateCode);
  const [selectedLanguage, setSelectedLanguage] = useState(CHALLENGE_DATA.languages[0]);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const challengeId = params?.id;

  const handleRunTests = () => {
    setIsRunning(true);
    setShowResults(false);
    setTestResults([]);
    
    // Simulate running tests
    setTimeout(() => {
      setIsRunning(false);
      setShowResults(true);
      
      // Mock test results
      setTestResults([
        {
          name: "Basic test",
          passed: true,
          time: "0.023ms",
          output: `[
".o",
"..",
"..",
"..",
".."
]`
        },
        {
          name: "Two raisins",
          passed: true,
          time: "0.045ms",
          output: `[
".o.o",
".o.o",
"....",
"...."
]`
        },
        {
          name: "Complex pattern",
          passed: false,
          time: "0.089ms",
          error: "Expected 5 pieces, got 4"
        }
      ]);
    }, 1500);
  };

  const handleReset = () => {
    setCode(CHALLENGE_DATA.templateCode);
    setTestResults([]);
    setShowResults(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#1a1a2e',
      fontFamily: "'Fira Code', 'Consolas', monospace"
    }}>
      {/* Top Navigation Bar */}
      <nav style={{
        background: 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 24px'
      }}>
        <Container fluid>
          <Row className="align-items-center">
            <Col md={3}>
              <Link href="/challenges" style={{ 
                color: '#667eea', 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '600'
              }}>
                <FiChevronLeft /> Back to Challenges
              </Link>
            </Col>
            <Col md={6} className="text-center">
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', color: '#8892b0', fontSize: '0.9rem' }}>
                <Link href="/challenges" style={{ color: '#8892b0', textDecoration: 'none' }}>Home</Link>
                <span style={{ cursor: 'pointer', color: '#667eea' }}>Training</span>
                <span style={{ cursor: 'pointer', color: '#8892b0' }}>Freestyle Sparring</span>
                <span style={{ cursor: 'pointer', color: '#8892b0' }}>Community</span>
                <span style={{ cursor: 'pointer', color: '#8892b0' }}>About</span>
              </div>
            </Col>
            <Col md={3} className="text-end">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                <div style={{ color: '#8892b0', fontSize: '0.9rem' }}>
                  <span style={{ color: '#667eea', fontWeight: '600' }}>{USER_STATS.username}</span>
                  <Badge bg="warning" text="dark" style={{ marginLeft: '8px' }}>{USER_STATS.kyu}</Badge>
                  <span style={{ marginLeft: '8px' }}>{USER_STATS.honor} honor</span>
                </div>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  {USER_STATS.avatar.charAt(0).toUpperCase()}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </nav>

      {/* Notification Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
        padding: '8px 24px',
        color: '#fff',
        fontSize: '0.85rem',
        textAlign: 'center'
      }}>
        🔔 Unlock the full potential of your account – confirm your email to enable the full dojo experience!
      </div>

      {/* Main Content */}
      <Container fluid style={{ padding: '24px' }}>
        <Row>
          {/* Left Sidebar */}
          <Col md={2} style={{ paddingRight: '24px' }}>
            <Card style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px'
            }}>
              <Card.Body style={{ padding: '16px' }}>
                <div style={{ color: '#8892b0', fontSize: '0.8rem', marginBottom: '12px', fontWeight: '600' }}>
                  TRAIN
                </div>
                <div style={{ 
                  color: '#667eea', 
                  padding: '8px 12px', 
                  background: 'rgba(102, 126, 234, 0.1)', 
                  borderRadius: '8px',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}>
                  <FiTarget style={{ marginRight: '8px' }} /> Practice
                </div>
                <div style={{ 
                  color: '#8892b0', 
                  padding: '8px 12px', 
borderRadius: '8px',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}>
                  <FiUsers style={{ marginRight: '8px' }} /> Freestyle Sparring
                </div>
                
                <div style={{ color: '#8892b0', fontSize: '0.8rem', marginBottom: '12px', marginTop: '24px', fontWeight: '600' }}>
                  COMMUNITY
                </div>
                <div style={{ 
                  color: '#8892b0', 
                  padding: '8px 12px', 
                  borderRadius: '8px',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}>
                  <FiAward style={{ marginRight: '8px' }} /> Leaderboards
                </div>
                <div style={{ 
                  color: '#8892b0', 
                  padding: '8px 12px', 
                  borderRadius: '8px',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}>
                  <FiMessageCircle style={{ marginRight: '8px' }} /> Chat
                </div>
                <div style={{ 
                  color: '#8892b0', 
                  padding: '8px 12px', 
                  borderRadius: '8px',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}>
                  <FiBook style={{ marginRight: '8px' }} /> Discussions
                </div>
                
                <div style={{ color: '#8892b0', fontSize: '0.8rem', marginBottom: '12px', marginTop: '24px', fontWeight: '600' }}>
                  ABOUT
                </div>
                <div style={{ 
                  color: '#8892b0', 
                  padding: '8px 12px', 
                  borderRadius: '8px',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}>
                  <FiSettings style={{ marginRight: '8px' }} /> Docs
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Challenge Area */}
          <Col md={10}>
            {/* Challenge Header */}
            <Row className="mb-4">
              <Col>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <Badge bg="danger" style={{ fontSize: '1rem', padding: '8px 16px' }}>
                    {CHALLENGE_DATA.kyu}
                  </Badge>
                  <h2 style={{ color: '#fff', margin: 0, fontSize: '1.8rem' }}>
                    {CHALLENGE_DATA.title}
                  </h2>
                </div>
                
                {/* Stats */}
                <div style={{ 
                  display: 'flex', 
                  gap: '24px', 
                  color: '#8892b0', 
                  fontSize: '0.9rem',
                  marginBottom: '16px'
                }}>
                  <span>
                    <span style={{ color: '#4CAF50', fontWeight: '600' }}>
                      {CHALLENGE_DATA.totalAttempts.toLocaleString()}
                    </span> Total Attempts
                  </span>
                  <span>
                    <span style={{ color: '#FFC107', fontWeight: '600' }}>
                      {CHALLENGE_DATA.successRate}%
                    </span> Success Rate
                  </span>
                  <span>
                    by <span style={{ color: '#667eea' }}>{CHALLENGE_DATA.author}</span>
                  </span>
                </div>

                {/* Language Selector */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {CHALLENGE_DATA.languages.map((lang) => (
                    <Button
                      key={lang.name}
                      variant={lang.selected ? "primary" : "outline-secondary"}
                      size="sm"
                      style={{
                        borderRadius: '8px',
                        background: lang.selected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                        border: lang.selected ? 'none' : '1px solid rgba(255,255,255,0.2)',
                        color: '#fff'
                      }}
                      onClick={() => setSelectedLanguage(lang)}
                    >
                      {lang.name} {lang.version}
                    </Button>
                  ))}
                </div>
              </Col>
            </Row>

            {/* Tabs */}
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k || "instructions")}
              className="mb-3"
              style={{
                '--bs-nav-link-color': '#8892b0',
                '--bs-nav-active-color': '#667eea',
                '--bs-nav-tabs-border-color': 'rgba(255,255,255,0.1)',
                '--bs-tab-content-bg': 'rgba(255,255,255,0.02)',
              } as any}
            >
              <Tab eventKey="instructions" title={<><FiBook style={{ marginRight: '8px' }} /> Instructions</>}>
                <Card style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px'
                }}>
                  <Card.Body style={{ color: '#ccc', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                    {CHALLENGE_DATA.instructions}
                  </Card.Body>
                </Card>
              </Tab>
              
              <Tab eventKey="output" title={<><FiTerminal style={{ marginRight: '8px' }} /> Output</>}>
                <Card style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px'
                }}>
                  <Card.Body style={{ color: '#ccc', lineHeight: '1.8' }}>
                    {CHALLENGE_DATA.output}
                  </Card.Body>
                </Card>
              </Tab>
              
              <Tab eventKey="solution" title={<><FiCode style={{ marginRight: '8px' }} /> Solution</>}>
                <Card style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px'
                }}>
                  <Card.Body>
                    <p style={{ color: '#8892b0', marginBottom: '16px' }}>
                      <FiUnlock style={{ marginRight: '8px' }} />
                      Unlock solutions after completing the kata
                    </p>
                    <Button variant="outline-primary" size="sm">
                      View Solutions (121)
                    </Button>
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>

            {/* Code Editor */}
            <Row className="mt-4">
              <Col>
                <Card style={{
                  background: '#1e1e1e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <Card.Header style={{
                    background: 'linear-gradient(90deg, #252526 0%, #1e1e1e 100%)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: '#8892b0', fontSize: '0.9rem' }}>
                      <FiCode style={{ marginRight: '8px' }} />
                      Solution
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        style={{ borderRadius: '6px' }}
                        onClick={handleReset}
                      >
                        <FiRotateCcw style={{ marginRight: '4px' }} /> Reset
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body style={{ padding: 0 }}>
                    {/* Line Numbers */}
                    <div style={{
                      display: 'flex',
                      background: '#252526',
                      borderBottom: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <div style={{
                        width: '60px',
                        padding: '12px 8px',
                        textAlign: 'right',
                        color: '#5a5a5a',
                        fontSize: '0.85rem',
                        fontFamily: "'Fira Code', monospace",
                        userSelect: 'none'
                      }}>
                        {Array.from({ length: 25 }, (_, i) => (
                          <div key={i} style={{ lineHeight: '1.5' }}>{i + 1}</div>
                        ))}
                      </div>
                      <Form.Control
                        as="textarea"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={{
                          flex: 1,
                          background: '#1e1e1e',
                          border: 'none',
                          color: '#d4d4d4',
                          fontFamily: "'Fira Code', 'Consolas', monospace",
                          fontSize: '0.9rem',
                          lineHeight: '1.5',
                          resize: 'none',
                          outline: 'none',
                          padding: '12px 16px',
                          minHeight: '375px'
                        }}
                        spellCheck={false}
                      />
                    </div>
                  </Card.Body>
                </Card>

                {/* Test Results */}
                {showResults && (
                  <Card className="mt-3" style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px'
                  }}>
                    <Card.Header style={{
                      background: 'rgba(255,255,255,0.02)',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <FiPlay style={{ color: '#4CAF50' }} />
                      <span style={{ color: '#fff', fontWeight: '600' }}>Test Results</span>
                      <Badge bg={testResults.every(r => r.passed) ? "success" : "danger"} className="ms-auto">
                        {testResults.filter(r => r.passed).length}/{testResults.length} Passed
                      </Badge>
                    </Card.Header>
                    <Card.Body style={{ padding: '16px' }}>
                      {testResults.map((result, idx) => (
                        <div 
                          key={idx}
                          style={{
                            background: result.passed ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                            border: `1px solid ${result.passed ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`,
                            borderRadius: '8px',
                            padding: '12px 16px',
                            marginBottom: '12px'
                          }}
                        >
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            marginBottom: '8px'
                          }}>
                            {result.passed ? (
                              <FiCheckCircle style={{ color: '#4CAF50' }} />
                            ) : (
                              <FiAlertCircle style={{ color: '#f44336' }} />
                            )}
                            <span style={{ 
                              color: result.passed ? '#4CAF50' : '#f44336',
                              fontWeight: '600'
                            }}>
                              {result.name}
                            </span>
                            <span style={{ color: '#8892b0', marginLeft: 'auto', fontSize: '0.85rem' }}>
                              {result.time}
                            </span>
                          </div>
                          {result.error && (
                            <div style={{ color: '#f44336', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                              {result.error}
                            </div>
                          )}
                          {result.output && (
                            <pre style={{ 
                              color: '#ccc', 
                              fontFamily: 'monospace', 
                              fontSize: '0.85rem',
                              margin: 0,
                              whiteSpace: 'pre-wrap'
                            }}>
                              {result.output}
                            </pre>
                          )}
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="mt-4" style={{ display: 'flex', gap: '12px' }}>
                  <Button
                    variant="outline-secondary"
                    style={{
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontWeight: '600'
                    }}
                  >
                    Skip
                  </Button>
                  <Button
                    variant="outline-warning"
                    style={{
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontWeight: '600'
                    }}
                  >
                    Unlock Solutions (121)
                  </Button>
                  <Button
                    variant="outline-primary"
                    style={{
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontWeight: '600'
                    }}
                  >
                    Discuss (49)
                  </Button>
                  <div style={{ flex: 1 }} />
                  <Button
                    variant="primary"
                    onClick={handleRunTests}
                    disabled={isRunning}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 32px',
                      fontWeight: '600'
                    }}
                  >
                    {isRunning ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Running...
                      </>
                    ) : (
                      <>
                        <FiPlay style={{ marginRight: '8px' }} /> Test
                      </>
                    )}
                  </Button>
                  <Button
                    variant="success"
                    style={{
                      background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 32px',
                      fontWeight: '600'
                    }}
                  >
                    Attempt
                  </Button>
                </div>
              </Col>
            </Row>

            {/* Sample Tests */}
            <Row className="mt-4">
              <Col>
                <Card style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px'
                }}>
                  <Card.Header style={{
                    background: 'rgba(255,255,255,0.02)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <FiEye style={{ color: '#667eea' }} />
                    <span style={{ color: '#fff', fontWeight: '600' }}>Sample Tests</span>
                  </Card.Header>
                  <Card.Body style={{ padding: '16px' }}>
                    {CHALLENGE_DATA.testCases.filter(tc => !tc.hidden).map((test, idx) => (
                      <div 
                        key={idx}
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          borderRadius: '8px',
                          padding: '16px',
marginBottom: '12px'
                        }}
                      >
                        <div style={{ 
                          color: '#8892b0', 
                          fontSize: '0.85rem',
                          marginBottom: '8px',
                          fontWeight: '600'
                        }}>
                          Test {idx + 1}: {test.name}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div>
                            <div style={{ 
                              color: '#667eea', 
                              fontSize: '0.75rem', 
                              marginBottom: '4px',
                              textTransform: 'uppercase'
                            }}>
                              Input
                            </div>
                            <pre style={{ 
                              background: '#1e1e1e', 
                              padding: '12px', 
                              borderRadius: '6px',
                              color: '#ccc',
                              fontFamily: 'monospace',
                              fontSize: '0.85rem',
                              margin: 0
                            }}>
                              {test.input}
                            </pre>
                          </div>
                          <div>
                            <div style={{ 
                              color: '#4CAF50', 
                              fontSize: '0.75rem', 
                              marginBottom: '4px',
                              textTransform: 'uppercase'
                            }}>
                              Expected Output
                            </div>
                            <pre style={{ 
                              background: '#1e1e1e', 
                              padding: '12px', 
                              borderRadius: '6px',
                              color: '#ccc',
                              fontFamily: 'monospace',
                              fontSize: '0.85rem',
                              margin: 0
                            }}>
                              {test.expected}
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}
                    {CHALLENGE_DATA.testCases.filter(tc => tc.hidden).length > 0 && (
                      <div style={{ 
                        color: '#8892b0', 
                        textAlign: 'center', 
                        padding: '12px',
                        fontStyle: 'italic'
                      }}>
                        + {CHALLENGE_DATA.testCases.filter(tc => tc.hidden).length} hidden test cases
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Styles for line numbers */}
      <style jsx global>{`
        textarea::placeholder {
          color: #5a5a5a !important;
        }
        
        textarea::-webkit-scrollbar {
          width: 10px;
        }
        
        textarea::-webkit-scrollbar-track {
          background: #1e1e1e;
        }
        
        textarea::-webkit-scrollbar-thumb {
          background: #424242;
          border-radius: 5px;
        }
        
        textarea::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
