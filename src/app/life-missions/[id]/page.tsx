'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Button, Badge, Modal, Form } from 'react-bootstrap';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LifeMission,
  LifeMissionStreak,
  UnlockedAchievement,
  MissionJournalEntry,
  MissionPriority,
  DIFFICULTY_LABELS,
  MISSION_CATEGORIES,
} from '@/types/life-missions';
import {
  calculateMissionProgress,
  calculateEarnedXp,
  getPhaseStatus,
  getActivePhaseIndex,
  isMissionComplete,
  updateStreak,
  checkAchievements,
  formatDate,
} from '@/lib/life-missions/utils';
import { MISSION_TEMPLATES } from '@/data/life-missions/templates';
import { MissionRoadmap, PhaseAccordion, MissionJournal, MissionSettingsModal } from '@/components/life-missions';

const DEFAULT_STREAK: LifeMissionStreak = { currentStreak: 0, longestStreak: 0, lastActivityDate: '' };

export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const missionId = params.id as string;

  const [missions, setMissions] = useState<LifeMission[]>([]);
  const [streak, setStreak] = useState<LifeMissionStreak>(DEFAULT_STREAK);
  const [unlockedAchievements, setUnlockedAchievements] = useState<UnlockedAchievement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCelebration, setShowCelebration] = useState<string | null>(null);
  const [targetDate, setTargetDate] = useState('');
  const [editingPriority, setEditingPriority] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Load
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lifeMissions');
      if (saved) setMissions(JSON.parse(saved));
      const savedStreak = localStorage.getItem('lifeMissionStreak');
      if (savedStreak) setStreak(JSON.parse(savedStreak));
      const savedAch = localStorage.getItem('lifeMissionAchievements');
      if (savedAch) setUnlockedAchievements(JSON.parse(savedAch));
    } catch { /* ignore */ }
    setIsLoaded(true);
  }, []);

  // Save
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('lifeMissions', JSON.stringify(missions));
  }, [missions, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('lifeMissionStreak', JSON.stringify(streak));
  }, [streak, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('lifeMissionAchievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements, isLoaded]);

  const mission = useMemo(() => missions.find(m => m.id === missionId), [missions, missionId]);

  useEffect(() => {
    if (mission?.targetDate) setTargetDate(mission.targetDate);
  }, [mission?.targetDate]);

  const handleToggleStep = useCallback((phaseId: string, stepId: string) => {
    setMissions(prev => {
      const updated = prev.map(m => {
        if (m.id !== missionId) return m;
        const newPhases = m.phases.map(p => {
          if (p.id !== phaseId) return p;
          return {
            ...p,
            steps: p.steps.map(s => {
              if (s.id !== stepId) return s;
              return {
                ...s,
                isCompleted: !s.isCompleted,
                completedAt: !s.isCompleted ? new Date().toISOString() : undefined,
              };
            }),
          };
        });

        const updatedMission = { ...m, phases: newPhases };

        // Check if phase just completed
        const phase = newPhases.find(p => p.id === phaseId);
        if (phase && phase.steps.every(s => s.isCompleted)) {
          setTimeout(() => setShowCelebration(`Fáze "${phase.title}" dokončena! 🎉`), 300);
        }

        // Check if entire mission complete
        if (isMissionComplete(updatedMission) && m.status !== 'completed') {
          updatedMission.status = 'completed';
          updatedMission.completedAt = new Date().toISOString();
          setTimeout(() => setShowCelebration(`🏆 MISE DOKONČENA! "${m.title}" 🎉🎊`), 500);
        }

        return updatedMission;
      });
      return updated;
    });

    // Update streak
    setStreak(prev => updateStreak(prev));
  }, [missionId]);

  // Achievement check
  useEffect(() => {
    if (!isLoaded || missions.length === 0) return;
    const newAch = checkAchievements(missions, streak, unlockedAchievements);
    if (newAch.length !== unlockedAchievements.length) {
      setUnlockedAchievements(newAch);
    }
  }, [missions, streak, isLoaded]);

  const handleAddJournalEntry = useCallback((entry: MissionJournalEntry) => {
    setMissions(prev => prev.map(m => {
      if (m.id !== missionId) return m;
      return { ...m, journal: [...m.journal, entry] };
    }));
  }, [missionId]);

  const handleSetPriority = useCallback((priority: MissionPriority) => {
    setMissions(prev => prev.map(m => m.id === missionId ? { ...m, priority } : m));
    setEditingPriority(false);
  }, [missionId]);

  const handleSetTargetDate = useCallback((date: string) => {
    setTargetDate(date);
    setMissions(prev => prev.map(m => m.id === missionId ? { ...m, targetDate: date } : m));
  }, [missionId]);

  const handlePause = useCallback(() => {
    setMissions(prev => prev.map(m => {
      if (m.id !== missionId) return m;
      return { ...m, status: m.status === 'paused' ? 'active' : 'paused' };
    }));
  }, [missionId]);

  const handleAbandon = useCallback(() => {
    if (confirm('Opravdu chceš opustit tuto misi? Tuto akci nelze vrátit.')) {
      setMissions(prev => prev.map(m => m.id === missionId ? { ...m, status: 'abandoned' } : m));
    }
  }, [missionId]);

  const handleUpdateOptionalCategories = useCallback((categories: string[]) => {
    setMissions(prev => prev.map(m => {
      if (m.id !== missionId) return m;
      
      // Recalculate phases with new optional steps
      const template = MISSION_TEMPLATES.find(t => t.id === m.templateId);
      if (!template) return { ...m, enabledOptionalCategories: categories };
      
      // Rebuild phases with updated optional steps
      const newPhases = template.phases.map((phase, phaseIdx) => {
        const existingPhase = m.phases[phaseIdx];
        const newSteps = phase.steps
          .filter(step => !step.isOptional || categories.includes(step.category || ''))
          .map((step, stepIdx) => {
            // Try to find existing step to preserve completion state
            const existingStep = existingPhase?.steps.find(s => s.title === step.title);
            return {
              ...step,
              id: existingStep?.id || `step_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${stepIdx}`,
              isCompleted: existingStep?.isCompleted || false,
              completedAt: existingStep?.completedAt,
              order: stepIdx,
            };
          });
        
        return {
          ...phase,
          id: existingPhase?.id || `phase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${phaseIdx}`,
          steps: newSteps,
        };
      });
      
      return {
        ...m,
        phases: newPhases,
        enabledOptionalCategories: categories,
      };
    }));
  }, [missionId]);

  if (!isLoaded) {
    return (
      <Container fluid style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '60px 0' }}>Načítání...</div>
      </Container>
    );
  }

  if (!mission) {
    return (
      <Container fluid style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>😕</div>
          <h4 style={{ color: '#fff' }}>Mise nenalezena</h4>
          <Link href="/life-missions">
            <Button variant="outline-warning" style={{ borderRadius: '10px', marginTop: '12px' }}>← Zpět na mise</Button>
          </Link>
        </div>
      </Container>
    );
  }

  const progress = calculateMissionProgress(mission);
  const earnedXp = calculateEarnedXp(mission);
  const activePhaseIdx = getActivePhaseIndex(mission);
  const totalSteps = mission.phases.reduce((s, p) => s + p.steps.length, 0);
  const completedSteps = mission.phases.reduce((s, p) => s + p.steps.filter(st => st.isCompleted).length, 0);
  const catConfig = MISSION_CATEGORIES.find(c => c.key === mission.category);

  return (
    <Container fluid style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Link href="/life-missions" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.85rem' }}>
          ← Zpět na mise
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '2.5rem' }}>{mission.icon}</span>
          <div>
            <h2 style={{ color: '#fff', margin: 0, fontSize: '1.6rem', fontWeight: 700 }}>{mission.title}</h2>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
              <Badge bg="" style={{ background: `${mission.color}20`, color: mission.color, fontSize: '0.7rem' }}>
                {catConfig?.label || mission.category}
              </Badge>
              <Badge bg="" style={{
                background: mission.status === 'completed' ? 'rgba(76,175,80,0.15)' : mission.status === 'paused' ? 'rgba(255,152,0,0.15)' : 'rgba(255,193,7,0.15)',
                color: mission.status === 'completed' ? '#4CAF50' : mission.status === 'paused' ? '#FF9800' : '#FFC107',
                fontSize: '0.7rem',
              }}>
                {mission.status === 'completed' ? '✅ Dokončeno' : mission.status === 'paused' ? '⏸️ Pozastaveno' : mission.status === 'abandoned' ? '❌ Opuštěno' : '🎯 Aktivní'}
              </Badge>
              <Badge bg="" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>
                {'⭐'.repeat(mission.difficulty)} {DIFFICULTY_LABELS[mission.difficulty]}
              </Badge>
            </div>
          </div>
        </div>
        {mission.description && (
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '10px', fontSize: '0.9rem' }}>{mission.description}</p>
        )}
      </div>

      {/* Roadmap */}
      <div
        style={{
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '20px',
          marginBottom: '24px',
        }}
      >
        <h5 style={{ color: '#fff', marginBottom: '8px', fontSize: '1rem' }}>🗺️ Roadmapa</h5>
        <MissionRoadmap mission={mission} />
      </div>

      <Row className="g-4">
        {/* Main content */}
        <Col lg={8}>
          {/* Phases */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {mission.phases.map((phase, idx) => (
              <PhaseAccordion
                key={phase.id}
                phase={phase}
                phaseIndex={idx}
                status={getPhaseStatus(mission, idx)}
                defaultOpen={idx === activePhaseIdx}
                onToggleStep={handleToggleStep}
              />
            ))}
          </div>

          {/* Journal */}
          <MissionJournal entries={mission.journal} onAddEntry={handleAddJournalEntry} />
        </Col>

        {/* Sidebar */}
        <Col lg={4}>
          {/* Progress card */}
          <div
            style={{
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${mission.color}25`,
              padding: '20px',
              marginBottom: '16px',
            }}
          >
            <h6 style={{ color: '#fff', marginBottom: '16px' }}>📊 Statistiky</h6>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke={mission.color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 3.14} ${314 - progress * 3.14}`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div style={{ color: mission.color, fontSize: '1.5rem', fontWeight: 700 }}>{progress}%</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Kroky</span>
                <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{completedSteps}/{totalSteps}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>XP</span>
                <span style={{ color: '#FFC107', fontSize: '0.85rem', fontWeight: 600 }}>⚡ {earnedXp}/{mission.totalXp + mission.completionBonusXp}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Fáze</span>
                <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>
                  {mission.phases.filter((_, i) => getPhaseStatus(mission, i) === 'completed').length}/{mission.phases.length}
                </span>
              </div>
              {mission.createdAt && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Začátek</span>
                  <span style={{ color: '#fff', fontSize: '0.85rem' }}>{formatDate(mission.createdAt)}</span>
                </div>
              )}
              {mission.completedAt && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Dokončeno</span>
                  <span style={{ color: '#4CAF50', fontSize: '0.85rem' }}>{formatDate(mission.completedAt)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Priority */}
          <div
            style={{
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '16px 20px',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Priorita</span>
              {editingPriority ? (
                <div style={{ display: 'flex', gap: '4px' }}>
                  {(['low', 'medium', 'high', 'critical'] as MissionPriority[]).map(p => (
                    <Badge
                      key={p}
                      bg=""
                      onClick={() => handleSetPriority(p)}
                      style={{
                        cursor: 'pointer',
                        background: mission.priority === p ? 'rgba(255,193,7,0.2)' : 'rgba(255,255,255,0.05)',
                        color: mission.priority === p ? '#FFC107' : 'rgba(255,255,255,0.4)',
                        fontSize: '0.7rem',
                        padding: '4px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {p}
                    </Badge>
                  ))}
                </div>
              ) : (
                <Badge
                  bg=""
                  onClick={() => setEditingPriority(true)}
                  style={{
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '6px',
                  }}
                >
                  {mission.priority === 'critical' ? '🔴' : mission.priority === 'high' ? '🟠' : mission.priority === 'medium' ? '🟡' : '🟢'} {mission.priority}
                </Badge>
              )}
            </div>
          </div>

          {/* Target date */}
          <div
            style={{
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '16px 20px',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>📅 Cílové datum</span>
              <Form.Control
                type="date"
                size="sm"
                value={targetDate}
                onChange={(e) => handleSetTargetDate(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  borderRadius: '8px',
                  width: 'auto',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>

          {/* Optional Steps Settings */}
          <div
            style={{
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '16px 20px',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>⚙️ Rozšířené kroky</span>
              <Button
                size="sm"
                variant="outline-light"
                onClick={() => setShowSettingsModal(true)}
                style={{ borderRadius: '8px', fontSize: '0.75rem' }}
              >
                {(mission.enabledOptionalCategories?.length || 0) > 0 
                  ? `${mission.enabledOptionalCategories?.length} aktivních` 
                  : 'Nastavit'}
              </Button>
            </div>
            {(mission.enabledOptionalCategories?.length || 0) > 0 && (
              <div style={{ marginTop: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {mission.enabledOptionalCategories?.map(cat => (
                  <Badge 
                    key={cat} 
                    bg="" 
                    style={{ 
                      background: `${mission.color}20`, 
                      color: mission.color, 
                      fontSize: '0.65rem',
                      padding: '2px 6px'
                    }}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          {mission.status !== 'completed' && mission.status !== 'abandoned' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Button
                size="sm"
                variant={mission.status === 'paused' ? 'outline-success' : 'outline-warning'}
                onClick={handlePause}
                style={{ borderRadius: '10px' }}
              >
                {mission.status === 'paused' ? '▶️ Pokračovat' : '⏸️ Pozastavit'}
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={handleAbandon}
                style={{ borderRadius: '10px' }}
              >
                🚫 Opustit misi
              </Button>
            </div>
          )}
        </Col>
      </Row>

      {/* Celebration Modal */}
      <Modal show={!!showCelebration} onHide={() => setShowCelebration(null)} centered>
        <Modal.Body style={{ background: '#1a1a2e', textAlign: 'center', padding: '40px', borderRadius: '16px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
          <h3 style={{ color: '#FFC107', marginBottom: '12px' }}>{showCelebration}</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>Skvělá práce! Pokračuj dál! 💪</p>
          <Button variant="warning" onClick={() => setShowCelebration(null)} style={{ borderRadius: '10px', marginTop: '12px' }}>
            Pokračovat
          </Button>
        </Modal.Body>
      </Modal>

      {/* Settings Modal */}
      <MissionSettingsModal
        show={showSettingsModal}
        onHide={() => setShowSettingsModal(false)}
        mission={mission}
        onUpdateCategories={handleUpdateOptionalCategories}
      />
    </Container>
  );
}
