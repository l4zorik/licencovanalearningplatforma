"use client";

import React, { useState, useMemo } from 'react';
import { Card, Badge, Accordion, ListGroup, Row, Col, Form, Button, ProgressBar, Alert } from 'react-bootstrap';
import { COMPANY_PROFILES } from '@/data/jobs/company-data';

interface InterviewPrepProps {
  jobTitle?: string;
  companyId?: string;
}

export default function InterviewPrep({ jobTitle = 'Software Engineer', companyId }: InterviewPrepProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const company = useMemo(() => {
    if (!companyId) return null;
    return COMPANY_PROFILES.find(c => c.id === companyId);
  }, [companyId]);

  const interviewQuestions = useMemo(() => {
    const questions = [
      {
        type: 'behavioral',
        difficulty: 2,
        question: 'Tell me about a time you had a conflict with a coworker and how you resolved it.',
        idealAnswer: 'Use STAR method: Situation, Task, Action, Result. Show conflict resolution skills and empathy.',
        tips: ['Stay professional', 'Focus on resolution', 'Show learning'],
        frequency: 45
      },
      {
        type: 'behavioral',
        difficulty: 3,
        question: 'Describe a situation where you had to make a difficult decision with incomplete information.',
        idealAnswer: 'Explain your decision-making process, how you gathered available info, and your reasoning.',
        tips: ['Show analytical thinking', 'Mention risk assessment', 'Discuss outcome'],
        frequency: 38
      },
      {
        type: 'behavioral',
        difficulty: 3,
        question: 'Tell me about a time you failed. What did you learn from it?',
        idealAnswer: 'Be honest about a real failure, focus on what you learned and how you improved.',
        tips: ['Be authentic', 'Show growth mindset', 'Focus on lessons learned'],
        frequency: 52
      },
      {
        type: 'behavioral',
        difficulty: 4,
        question: 'Describe a situation where you had to influence stakeholders who had different priorities.',
        idealAnswer: 'Show negotiation and persuasion skills while maintaining relationships.',
        tips: ['Show diplomacy', 'Focus on win-win', 'Show data-driven approach'],
        frequency: 28
      },
      {
        type: 'technical',
        difficulty: 2,
        question: 'Explain the difference between let, const, and var in JavaScript.',
        idealAnswer: 'Scope differences, hoisting, reassignment capabilities. Best practices for modern JS.',
        tips: ['Use examples', 'Mention ES6+', 'Discuss best practices'],
        frequency: 78
      },
      {
        type: 'technical',
        difficulty: 3,
        question: 'How would you design a REST API for a blogging platform?',
        idealAnswer: 'Discuss endpoints, HTTP methods, authentication, pagination, error handling, versioning.',
        tips: ['Start with resources', 'Consider scalability', 'Discuss best practices'],
        frequency: 65
      },
      {
        type: 'technical',
        difficulty: 4,
        question: 'Design a system to handle 1 million concurrent users.',
        idealAnswer: 'Discuss load balancing, caching, database scaling, microservices, CDN, monitoring.',
        tips: ['Start with requirements', 'Discuss trade-offs', 'Show system thinking'],
        frequency: 42
      },
      {
        type: 'technical',
        difficulty: 5,
        question: 'How would you design and implement a distributed cache system?',
        idealAnswer: 'Consistency models, partitioning, replication, eviction policies, monitoring.',
        tips: ['Consider CAP theorem', 'Discuss trade-offs', 'Show deep knowledge'],
        frequency: 25
      },
      {
        type: 'system_design',
        difficulty: 3,
        question: 'Design a URL shortening service like bit.ly.',
        idealAnswer: 'URL encoding, database schema, collision handling, analytics, scaling considerations.',
        tips: ['Ask clarifying questions', 'Discuss constraints', 'Show trade-offs'],
        frequency: 55
      },
      {
        type: 'system_design',
        difficulty: 4,
        question: 'Design a real-time chat application like Slack.',
        idealAnswer: 'WebSocket vs polling, message queue, presence system, offline handling, scalability.',
        tips: ['Consider latency', 'Discuss consistency', 'Plan for growth'],
        frequency: 38
      },
      {
        type: 'coding_challenge',
        difficulty: 2,
        question: 'Two Sum - Find two numbers that add up to a target value.',
        idealAnswer: 'Hash map solution with O(n) time complexity. Explain the approach clearly.',
        tips: ['Think out loud', 'Consider edge cases', 'Optimize solution'],
        frequency: 92
      },
      {
        type: 'coding_challenge',
        difficulty: 3,
        question: 'Implement a LRU Cache.',
        idealAnswer: 'Use hash map + doubly linked list for O(1) operations. Explain the data structure.',
        tips: ['Choose right data structures', 'Handle edge cases', 'Discuss complexity'],
        frequency: 68
      },
      {
        type: 'coding_challenge',
        difficulty: 4,
        question: 'Design and implement a thread-safe rate limiter.',
        idealAnswer: 'Token bucket or sliding window algorithm with proper synchronization.',
        tips: ['Consider concurrency', 'Test edge cases', 'Discuss trade-offs'],
        frequency: 35
      }
    ];

    let filtered = questions;
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === parseInt(selectedDifficulty));
    }
    if (selectedType !== 'all') {
      filtered = filtered.filter(q => q.type === selectedType);
    }
    return filtered;
  }, [selectedDifficulty, selectedType]);

  const questionsByType = useMemo(() => {
    const grouped: Record<string, typeof interviewQuestions> = {};
    interviewQuestions.forEach(q => {
      if (!grouped[q.type]) grouped[q.type] = [];
      grouped[q.type].push(q);
    });
    return grouped;
  }, [interviewQuestions]);

  const getDifficultyLabel = (difficulty: number) => {
    const labels = ['Snadné', 'Střední', 'Těžké', 'Velmi těžké', 'Expert'];
    const colors = ['success', 'primary', 'warning', 'orange', 'danger'];
    return { label: labels[difficulty - 1], color: colors[difficulty - 1] };
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      behavioral: '📋 Behavioral',
      technical: '💻 Technické',
      system_design: '🏗️ System Design',
      coding_challenge: '⌨️ Coding'
    };
    return labels[type] || type;
  };

  return (
    <div>
      {company && (
        <Alert variant="info" className="mb-4">
          <strong>🎯 Příprava na {jobTitle}</strong> v {company.name}
          <br />
          <small>Průměrná doba procesu: {company.hiringProcess.averageDuration} | Obtížnost: {'⭐'.repeat(company.hiringProcess.difficulty)}</small>
        </Alert>
      )}

      <Row className="mb-4">
        <Col md={3}>
          <Form.Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Všechny typy</option>
            <option value="behavioral">Behavioral</option>
            <option value="technical">Technické</option>
            <option value="system_design">System Design</option>
            <option value="coding_challenge">Coding</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">Všechny obtížnosti</option>
            <option value="2">Snadné</option>
            <option value="3">Střední</option>
            <option value="4">Těžké</option>
            <option value="5">Velmi těžké</option>
          </Form.Select>
        </Col>
      </Row>

      <Accordion defaultActiveKey={['behavioral', 'technical', 'system_design', 'coding_challenge']}>
        {Object.entries(questionsByType).map(([type, questions]) => (
          <Accordion.Item key={type} eventKey={type}>
            <Accordion.Header>
              <div className="d-flex justify-content-between align-items-center w-100 me-3">
                <span>{getTypeLabel(type)}</span>
                <Badge bg="secondary">{questions.length}</Badge>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {questions.map((q, idx) => {
                const difficulty = getDifficultyLabel(q.difficulty);
                return (
                  <Card key={idx} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="mb-0">{q.question}</h6>
                        <Badge bg={difficulty.color}>{difficulty.label}</Badge>
                      </div>
                      <hr />
                      <Row>
                        <Col md={8}>
                          <h6>💡 Ideální odpověď:</h6>
                          <p className="text-muted">{q.idealAnswer}</p>
                          <h6 className="mt-2">💪 Tipy:</h6>
                          <ul className="mb-0">
                            {q.tips.map((tip, i) => (
                              <li key={i}><small>{tip}</small></li>
                            ))}
                          </ul>
                        </Col>
                        <Col md={4}>
                          <Card bg="light">
                            <Card.Body className="py-2">
                              <small className="text-muted">Četnost v pohovorech</small>
                              <ProgressBar now={q.frequency} label={`${q.frequency}%`} variant="success" style={{ height: 20 }} />
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Card className="mt-4 bg-primary text-white">
        <Card.Body>
          <h5>📚 Doporučené zdroje pro přípravu</h5>
          <Row>
            <Col md={4}>
              <h6>Pro coding:</h6>
              <ul>
                <li>LeetCode (Easy/Medium)</li>
                <li>HackerRank</li>
                <li>Cracking the Coding Interview</li>
              </ul>
            </Col>
            <Col md={4}>
              <h6>Pro system design:</h6>
              <ul>
                <li>System Design Primer</li>
                <li>Exponent</li>
                <li>High Scalability Blog</li>
              </ul>
            </Col>
            <Col md={4}>
              <h6>Pro behavioral:</h6>
              <ul>
                <li>STAR Method Guide</li>
                <li>Glassdoor Interviews</li>
                <li>Big Interview App</li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
