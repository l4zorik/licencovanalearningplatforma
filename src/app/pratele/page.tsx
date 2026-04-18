'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiStar, FiUsers, FiCalendar, FiAward, FiHeart } from 'react-icons/fi';
import { VztahyHero, StatsSection, AdviceSection, MemoryTimeline, GoalsTracker } from '@/components/vztahy';
import { RelationshipMemory, RelationshipEvent, RelationshipGoal, RelationshipStats } from '@/types/vztahy';

const defaultStats: RelationshipStats = {
  trustScore: 70,
  communicationScore: 75,
  timeSpentScore: 60,
  supportScore: 80,
  overallScore: 71,
  streak: 0,
  totalMemories: 0,
  goalsCompleted: 0,
  eventsThisMonth: 0
};

export default function PratelePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [memories, setMemories] = useState<RelationshipMemory[]>([]);
  const [events, setEvents] = useState<RelationshipEvent[]>([]);
  const [goals, setGoals] = useState<RelationshipGoal[]>([]);
  const [stats, setStats] = useState<RelationshipStats>(defaultStats);

  useEffect(() => {
    try {
      const savedMemories = localStorage.getItem('pratele_memories');
      if (savedMemories) setMemories(JSON.parse(savedMemories));
      
      const savedEvents = localStorage.getItem('pratele_events');
      if (savedEvents) setEvents(JSON.parse(savedEvents));
      
      const savedGoals = localStorage.getItem('pratele_goals');
      if (savedGoals) setGoals(JSON.parse(savedGoals));

      const savedStats = localStorage.getItem('pratele_stats');
      if (savedStats) setStats(JSON.parse(savedStats));
    } catch {}
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('pratele_memories', JSON.stringify(memories));
  }, [memories, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('pratele_events', JSON.stringify(events));
  }, [events, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('pratele_goals', JSON.stringify(goals));
  }, [goals, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('pratele_stats', JSON.stringify(stats));
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
        type="pratele"
        title="Přátelství"
        subtitle="Budování a udržování kvalitních přátelských vztahů"
        icon="👯"
        gradient="linear-gradient(135deg, rgba(156, 39, 176, 0.3) 0%, rgba(103, 58, 183, 0.2) 50%, rgba(20, 20, 30, 0.4) 100%)"
        stats={[
          { label: 'Přátel', value: stats.totalMemories > 0 ? Math.floor(stats.totalMemories / 2) : 0, icon: <FiUsers /> },
          { label: 'Důvěra', value: `${stats.trustScore}%`, icon: <FiStar /> },
          { label: 'Podpora', value: `${stats.supportScore}%`, icon: <FiHeart /> },
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
            storageKey="pratele"
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
          <AdviceSection title="💫 Průvodce přátelstvím" />
        </Col>
      </Row>
    </Container>
  );
}
