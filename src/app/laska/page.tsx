'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiHeart, FiMessageCircle, FiCalendar, FiAward } from 'react-icons/fi';
import { VztahyHero, StatsSection, AdviceSection, MemoryTimeline, GoalsTracker } from '@/components/vztahy';
import { RelationshipMemory, RelationshipEvent, RelationshipGoal, RelationshipStats } from '@/types/vztahy';

const defaultStats: RelationshipStats = {
  trustScore: 80,
  communicationScore: 75,
  timeSpentScore: 70,
  supportScore: 85,
  overallScore: 77,
  streak: 0,
  totalMemories: 0,
  goalsCompleted: 0,
  eventsThisMonth: 0
};

export default function LaskaPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [memories, setMemories] = useState<RelationshipMemory[]>([]);
  const [events, setEvents] = useState<RelationshipEvent[]>([]);
  const [goals, setGoals] = useState<RelationshipGoal[]>([]);
  const [stats, setStats] = useState<RelationshipStats>(defaultStats);

  useEffect(() => {
    try {
      const savedMemories = localStorage.getItem('laska_memories');
      if (savedMemories) setMemories(JSON.parse(savedMemories));
      
      const savedEvents = localStorage.getItem('laska_events');
      if (savedEvents) setEvents(JSON.parse(savedEvents));
      
      const savedGoals = localStorage.getItem('laska_goals');
      if (savedGoals) setGoals(JSON.parse(savedGoals));

      const savedStats = localStorage.getItem('laska_stats');
      if (savedStats) setStats(JSON.parse(savedStats));
    } catch {}
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('laska_memories', JSON.stringify(memories));
  }, [memories, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('laska_events', JSON.stringify(events));
  }, [events, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('laska_goals', JSON.stringify(goals));
  }, [goals, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('laska_stats', JSON.stringify(stats));
  }, [stats, isLoaded]);

  const handleAddMemory = (memory: RelationshipMemory) => {
    setMemories(prev => [...prev, memory]);
    setStats(prev => ({
      ...prev,
      totalMemories: prev.totalMemories + 1,
      eventsThisMonth: prev.eventsThisMonth + 1
    }));
  };

  const handleAddEvent = (event: RelationshipEvent) => {
    setEvents(prev => [...prev, event]);
    setStats(prev => ({
      ...prev,
      eventsThisMonth: prev.eventsThisMonth + 1
    }));
  };

  const handleDeleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
    setStats(prev => ({
      ...prev,
      totalMemories: Math.max(0, prev.totalMemories - 1)
    }));
  };

  const handleAddGoal = (goal: RelationshipGoal) => {
    setGoals(prev => [...prev, goal]);
  };

  const handleUpdateGoal = (goal: RelationshipGoal) => {
    setGoals(prev => prev.map(g => g.id === goal.id ? goal : g));
    if (goal.isCompleted) {
      setStats(prev => ({
        ...prev,
        goalsCompleted: prev.goalsCompleted + 1
      }));
    }
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  if (!isLoaded) {
    return (
      <Container fluid style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '60px 0' }}>
          Načítání...
        </div>
      </Container>
    );
  }

  return (
    <Container fluid style={{ padding: '30px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <VztahyHero
        type="laska"
        title="Láska"
        subtitle="Romantické vztahy, intimita a budování hlubokého romantického spojení"
        icon="💕"
        gradient="linear-gradient(135deg, rgba(233, 30, 99, 0.3) 0%, rgba(255, 87, 34, 0.2) 50%, rgba(20, 20, 30, 0.4) 100%)"
        stats={[
          { label: 'Důvěra', value: `${stats.trustScore}%`, icon: <FiHeart /> },
          { label: 'Komunikace', value: `${stats.communicationScore}%`, icon: <FiMessageCircle /> },
          { label: 'Vzpomínek', value: stats.totalMemories, icon: <FiCalendar /> },
        ]}
      />

      <Row className="mb-4">
        <Col>
          <StatsSection stats={stats} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6}>
          <MemoryTimeline
            memories={memories}
            events={events}
            onAddMemory={handleAddMemory}
            onAddEvent={handleAddEvent}
            onDeleteMemory={handleDeleteMemory}
            storageKey="laska"
          />
        </Col>
        <Col lg={6}>
          <GoalsTracker
            goals={goals}
            onAddGoal={handleAddGoal}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <AdviceSection title="💕 Průvodce romantickým vztahem" />
        </Col>
      </Row>
    </Container>
  );
}
