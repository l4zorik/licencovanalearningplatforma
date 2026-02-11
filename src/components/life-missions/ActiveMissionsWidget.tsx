'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Badge, ProgressBar, Button } from 'react-bootstrap';
import Link from 'next/link';
import {
  LifeMission,
  LifeMissionStreak,
  MISSION_CATEGORIES,
} from '@/types/life-missions';
import {
  calculateMissionProgress,
  calculateEarnedXp,
  getPhaseStatus,
  getActivePhaseIndex,
} from '@/lib/life-missions/utils';
import { MISSION_TEMPLATES } from '@/data/life-missions/templates';

export default function ActiveMissionsWidget() {
  const [missions, setMissions] = useState<LifeMission[]>([]);
  const [streak, setStreak] = useState<LifeMissionStreak>({ currentStreak: 0, longestStreak: 0, lastActivityDate: '' });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lifeMissions');
      if (saved) setMissions(JSON.parse(saved));
      const savedStreak = localStorage.getItem('lifeMissionStreak');
      if (savedStreak) setStreak(JSON.parse(savedStreak));
    } catch { /* ignore */ }
    setIsLoaded(true);
  }, []);

  const activeMissions = useMemo(() => missions.filter(m => m.status === 'active'), [missions]);
  const totalXp = useMemo(() => missions.reduce((sum, m) => sum + calculateEarnedXp(m), 0), [missions]);
  const completedCount = useMemo(() => missions.filter(m => m.status === 'completed').length, [missions]);

  if (!isLoaded) return null;

  // No missions yet - show CTA to start
  if (missions.length === 0) {
    return (
      <div style={{
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(255,193,7,0.08) 0%, rgba(255,152,0,0.06) 100%)',
        border: '1px solid rgba(255,193,7,0.2)',
        padding: '20px 24px',
        marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '2rem' }}>🗺️</span>
            <div>
              <h5 style={{ color: '#fff', margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Životní mise</h5>
              <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.8rem' }}>
                Rozpiš své velké cíle na kroky. {MISSION_TEMPLATES.length} šablon připraveno.
              </p>
            </div>
          </div>
          <Link href="/life-missions">
            <Button variant="warning" size="sm" style={{ borderRadius: '10px', fontWeight: 600 }}>
              🚀 Začít první misi
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: '16px 20px',
      marginBottom: '16px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.3rem' }}>🗺️</span>
          <h5 style={{ color: '#fff', margin: 0, fontSize: '1rem', fontWeight: 700 }}>Životní mise</h5>
          <Badge bg="" style={{ background: 'rgba(255,193,7,0.12)', color: '#FFC107', fontSize: '0.7rem' }}>
            {activeMissions.length} aktivní
          </Badge>
          {completedCount > 0 && (
            <Badge bg="" style={{ background: 'rgba(76,175,80,0.12)', color: '#4CAF50', fontSize: '0.7rem' }}>
              ✅ {completedCount} hotovo
            </Badge>
          )}
          {streak.currentStreak > 0 && (
            <Badge bg="" style={{ background: 'rgba(255,152,0,0.12)', color: '#FF9800', fontSize: '0.7rem' }}>
              🔥 {streak.currentStreak} dní
            </Badge>
          )}
          <Badge bg="" style={{ background: 'rgba(255,193,7,0.08)', color: '#FFC107', fontSize: '0.65rem' }}>
            ⚡ {totalXp.toLocaleString('cs-CZ')} XP
          </Badge>
        </div>
        <Link href="/life-missions" style={{ textDecoration: 'none' }}>
          <Badge bg="" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', cursor: 'pointer', padding: '6px 12px', borderRadius: '8px' }}>
            Všechny mise →
          </Badge>
        </Link>
      </div>

      {/* Active missions grid */}
      <Row className="g-2">
        {activeMissions.slice(0, 6).map((mission) => {
          const progress = calculateMissionProgress(mission);
          const earnedXp = calculateEarnedXp(mission);
          const activeIdx = getActivePhaseIndex(mission);
          const activePhase = mission.phases[activeIdx];
          const totalSteps = mission.phases.reduce((s, p) => s + p.steps.length, 0);
          const completedSteps = mission.phases.reduce((s, p) => s + p.steps.filter(st => st.isCompleted).length, 0);
          const nextStep = activePhase?.steps.find(s => !s.isCompleted);

          return (
            <Col key={mission.id} xs={12} sm={6} lg={4}>
              <Link href={`/life-missions/${mission.id}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${mission.color}25`,
                    padding: '14px 16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${mission.color}50`;
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${mission.color}25`;
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  }}
                >
                  {/* Top accent */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${mission.color}, ${mission.color}50)` }} />

                  {/* Mission header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{mission.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {mission.title}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                        Fáze {activeIdx + 1}/{mission.phases.length}: {activePhase?.title}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ color: mission.color, fontWeight: 700, fontSize: '0.95rem' }}>{progress}%</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <ProgressBar
                    now={progress}
                    style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', marginBottom: '8px' }}
                  >
                    <ProgressBar now={progress} style={{ background: `linear-gradient(90deg, ${mission.color}, ${mission.color}AA)`, borderRadius: '3px' }} />
                  </ProgressBar>

                  {/* Phase dots + next step */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {mission.phases.map((_, idx) => {
                        const st = getPhaseStatus(mission, idx);
                        return (
                          <div key={idx} style={{
                            width: '8px', height: '8px', borderRadius: '50%',
                            background: st === 'completed' ? '#4CAF50' : st === 'active' ? '#FFC107' : 'rgba(255,255,255,0.1)',
                          }} />
                        );
                      })}
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem' }}>
                      {completedSteps}/{totalSteps} kroků
                    </span>
                  </div>

                  {/* Next step hint */}
                  {nextStep && (
                    <div style={{
                      marginTop: '8px',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      background: 'rgba(255,193,7,0.06)',
                      border: '1px solid rgba(255,193,7,0.1)',
                    }}>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem', marginBottom: '2px' }}>DALŠÍ KROK:</div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {nextStep.title}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </Col>
          );
        })}

        {/* Add mission card */}
        {activeMissions.length < 6 && (
          <Col xs={12} sm={6} lg={4}>
            <Link href="/life-missions" style={{ textDecoration: 'none' }}>
              <div style={{
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px dashed rgba(255,255,255,0.12)',
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '120px',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,193,7,0.3)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,193,7,0.04)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.12)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)';
              }}
              >
                <span style={{ fontSize: '1.3rem' }}>➕</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Přidat misi</span>
              </div>
            </Link>
          </Col>
        )}
      </Row>
    </div>
  );
}
