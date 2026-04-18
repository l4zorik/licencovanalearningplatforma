'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiAward, FiHeart, FiCalendar, FiMessageCircle, FiStar } from 'react-icons/fi';
import { VztahyHero, StatsSection, AdviceSection, MemoryTimeline, GoalsTracker } from '@/components/vztahy';
import { RelationshipMemory, RelationshipEvent, RelationshipGoal, RelationshipStats } from '@/types/vztahy';

const defaultStats: RelationshipStats = {
  trustScore: 85,
  communicationScore: 80,
  timeSpentScore: 75,
  supportScore: 90,
  overallScore: 82,
  streak: 0,
  totalMemories: 0,
  goalsCompleted: 0,
  eventsThisMonth: 0
};

export default function PritelkyněPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [memories, setMemories] = useState<RelationshipMemory[]>([]);
  const [events, setEvents] = useState<RelationshipEvent[]>([]);
  const [goals, setGoals] = useState<RelationshipGoal[]>([]);
  const [stats, setStats] = useState<RelationshipStats>(defaultStats);

  useEffect(() => {
    try {
      const savedMemories = localStorage.getItem('pritelkyně_memories');
      if (savedMemories) setMemories(JSON.parse(savedMemories));
      
      const savedEvents = localStorage.getItem('pritelkyně_events');
      if (savedEvents) setEvents(JSON.parse(savedEvents));
      
      const savedGoals = localStorage.getItem('pritelkyně_goals');
      if (savedGoals) setGoals(JSON.parse(savedGoals));

      const savedStats = localStorage.getItem('pritelkyně_stats');
      if (savedStats) setStats(JSON.parse(savedStats));
    } catch {}
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('pritelkyně_memories', JSON.stringify(memories));
  }, [memories, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('pritelkyně_events', JSON.stringify(events));
  }, [events, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('pritelkyně_goals', JSON.stringify(goals));
  }, [goals, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('pritelkyně_stats', JSON.stringify(stats));
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
        type="pritelkyne"
        title="Přítelkyně"
        subtitle="Partnerský vztah - budování hlubokého, láskyplného a stabilního vztahu"
        icon="💑"
        gradient="linear-gradient(135deg, rgba(233, 30, 99, 0.35) 0%, rgba(156, 39, 176, 0.25) 50%, rgba(20, 20, 30, 0.4) 100%)"
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
            storageKey="pritelkyně"
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
          <AdviceSection title="💑 Průvodce partnerským vztahem" />
        </Col>
      </Row>
    </Container>
  );
}
