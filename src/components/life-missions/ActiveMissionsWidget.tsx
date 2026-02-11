'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Badge, ProgressBar, Collapse } from 'react-bootstrap';
import Link from 'next/link';
import {
  LifeMission,
  LifeMissionStreak,
} from '@/types/life-missions';
import {
  calculateMissionProgress,
  calculateEarnedXp,
  getPhaseStatus,
  getActivePhaseIndex,
  cloneTemplate,
} from '@/lib/life-missions/utils';
import { MISSION_TEMPLATES } from '@/data/life-missions/templates';

// Default missions to auto-create on first visit, in display order
const DEFAULT_TEMPLATE_IDS = [
  'koupe-bydleni',
  'ridicsky-prukaz',
  'fitness-transformace',
  'naucit-se-programovat',
  'zalozeni-rodiny',
  'prekonani-zavislosti',
];

// Which mission is the current focus
const FOCUSED_TEMPLATE_ID = 'fitness-transformace';

export default function ActiveMissionsWidget() {
  const [missions, setMissions] = useState<LifeMission[]>([]);
  const [streak, setStreak] = useState<LifeMissionStreak>({ currentStreak: 0, longestStreak: 0, lastActivityDate: '' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lifeMissions');
      const savedExpanded = localStorage.getItem('lifeMissionsWidgetExpanded');
      if (savedExpanded !== null) setIsExpanded(savedExpanded !== 'false');
      const savedStreak = localStorage.getItem('lifeMissionStreak');
      if (savedStreak) setStreak(JSON.parse(savedStreak));

      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setMissions(parsed);
          setIsLoaded(true);
          return;
        }
      }

      // No missions yet -> auto-create defaults from templates
      const defaults: LifeMission[] = [];
      DEFAULT_TEMPLATE_IDS.forEach(tid => {
        const tpl = MISSION_TEMPLATES.find(t => t.id === tid);
        if (tpl) defaults.push(cloneTemplate(tpl));
      });
      if (defaults.length > 0) {
        setMissions(defaults);
        localStorage.setItem('lifeMissions', JSON.stringify(defaults));
      }
    } catch { /* ignore */ }
    setIsLoaded(true);
  }, []);

  // Persist expand state
  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => {
      localStorage.setItem('lifeMissionsWidgetExpanded', String(!prev));
      return !prev;
    });
  }, []);

  // Ordered missions: put focused first, then follow DEFAULT_TEMPLATE_IDS order, then any others
  const orderedMissions = useMemo(() => {
    const active = missions.filter(m => m.status === 'active');
    const order = (m: LifeMission) => {
      if (m.templateId === FOCUSED_TEMPLATE_ID) return -1;
      const idx = DEFAULT_TEMPLATE_IDS.indexOf(m.templateId || '');
      return idx >= 0 ? idx : 999;
    };
    return [...active].sort((a, b) => order(a) - order(b));
  }, [missions]);

  const totalXp = useMemo(() => missions.reduce((sum, m) => sum + calculateEarnedXp(m), 0), [missions]);
  const completedCount = useMemo(() => missions.filter(m => m.status === 'completed').length, [missions]);
  const overallSteps = useMemo(() => {
    let done = 0, total = 0;
    missions.filter(m => m.status === 'active').forEach(m => {
      m.phases.forEach(p => { total += p.steps.length; done += p.steps.filter(s => s.isCompleted).length; });
    });
    return { done, total };
  }, [missions]);

  if (!isLoaded) return null;

  return (
    <div style={{
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.08)',
      marginBottom: '16px',
      overflow: 'hidden',
    }}>
      {/* Header - always visible, clickable to expand/collapse */}
      <div
        onClick={toggleExpanded}
        style={{
          padding: '14px 20px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          background: isExpanded ? 'rgba(255,193,7,0.03)' : 'transparent',
          transition: 'background 0.2s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-block',
            transition: 'transform 0.3s ease',
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.5)',
          }}>
            ▶
          </span>
          <span style={{ fontSize: '1.3rem' }}>🗺️</span>
          <h5 style={{ color: '#fff', margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Životní mise</h5>
          <Badge bg="" style={{ background: 'rgba(255,193,7,0.12)', color: '#FFC107', fontSize: '0.7rem' }}>
            {orderedMissions.length} aktivní
          </Badge>
          {completedCount > 0 && (
            <Badge bg="" style={{ background: 'rgba(76,175,80,0.12)', color: '#4CAF50', fontSize: '0.7rem' }}>
              ✅ {completedCount}
            </Badge>
          )}
          {streak.currentStreak > 0 && (
            <Badge bg="" style={{ background: 'rgba(255,152,0,0.12)', color: '#FF9800', fontSize: '0.7rem' }}>
              🔥 {streak.currentStreak}d
            </Badge>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>
            {overallSteps.done}/{overallSteps.total} kroků
          </span>
          <Badge bg="" style={{ background: 'rgba(255,193,7,0.08)', color: '#FFC107', fontSize: '0.7rem' }}>
            ⚡ {totalXp.toLocaleString('cs-CZ')} XP
          </Badge>
          <Link
            href="/life-missions"
            onClick={(e) => e.stopPropagation()}
            style={{ textDecoration: 'none' }}
          >
            <Badge bg="" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', padding: '5px 10px', borderRadius: '6px' }}>
              Správa →
            </Badge>
          </Link>
        </div>
      </div>

      {/* Expandable body */}
      <Collapse in={isExpanded}>
        <div>
          <div style={{ padding: '0 20px 16px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {orderedMissions.map((mission) => {
              const progress = calculateMissionProgress(mission);
              const activeIdx = getActivePhaseIndex(mission);
              const activePhase = mission.phases[activeIdx];
              const nextStep = activePhase?.steps.find(s => !s.isCompleted);
              const isFocused = mission.templateId === FOCUSED_TEMPLATE_ID;
              const totalSteps = mission.phases.reduce((s, p) => s + p.steps.length, 0);
              const completedSteps = mission.phases.reduce((s, p) => s + p.steps.filter(st => st.isCompleted).length, 0);

              return (
                <Link key={mission.id} href={`/life-missions/${mission.id}`} style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: isFocused ? '14px 16px' : '10px 16px',
                      borderRadius: '12px',
                      background: isFocused
                        ? `linear-gradient(135deg, ${mission.color}12 0%, ${mission.color}06 100%)`
                        : 'rgba(255,255,255,0.02)',
                      border: isFocused
                        ? `1.5px solid ${mission.color}40`
                        : '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = isFocused
                        ? `linear-gradient(135deg, ${mission.color}18 0%, ${mission.color}0a 100%)`
                        : 'rgba(255,255,255,0.04)';
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = isFocused
                        ? `linear-gradient(135deg, ${mission.color}12 0%, ${mission.color}06 100%)`
                        : 'rgba(255,255,255,0.02)';
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateX(0)';
                    }}
                  >
                    {/* Focus indicator */}
                    {isFocused && (
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '3px',
                        height: '60%',
                        borderRadius: '0 3px 3px 0',
                        background: mission.color,
                      }} />
                    )}

                    {/* Icon square */}
                    <div style={{
                      width: isFocused ? '52px' : '42px',
                      height: isFocused ? '52px' : '42px',
                      borderRadius: '12px',
                      background: `${mission.color}18`,
                      border: `1px solid ${mission.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: isFocused ? '1.6rem' : '1.3rem',
                      flexShrink: 0,
                    }}>
                      {mission.icon}
                    </div>

                    {/* Name + info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: isFocused ? '4px' : '2px' }}>
                        <span style={{
                          color: '#fff',
                          fontWeight: isFocused ? 700 : 500,
                          fontSize: isFocused ? '0.95rem' : '0.88rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {mission.title}
                        </span>
                        {isFocused && (
                          <Badge bg="" style={{ background: `${mission.color}25`, color: mission.color, fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px' }}>
                            FOKUS
                          </Badge>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                        <span>Fáze {activeIdx + 1}/{mission.phases.length}</span>
                        <span>•</span>
                        <span>{completedSteps}/{totalSteps} kroků</span>
                        {isFocused && nextStep && (
                          <>
                            <span>•</span>
                            <span style={{ color: 'rgba(255,193,7,0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                              → {nextStep.title}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Progress bar + percentage */}
                    <div style={{ width: isFocused ? '200px' : '140px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <ProgressBar
                          now={progress}
                          style={{
                            height: isFocused ? '10px' : '6px',
                            background: 'rgba(255,255,255,0.06)',
                            borderRadius: '5px',
                          }}
                        >
                          <ProgressBar
                            now={progress}
                            style={{
                              background: `linear-gradient(90deg, ${mission.color}, ${mission.color}BB)`,
                              borderRadius: '5px',
                              transition: 'width 0.5s ease',
                            }}
                          />
                        </ProgressBar>
                      </div>
                      <span style={{
                        color: mission.color,
                        fontWeight: 700,
                        fontSize: isFocused ? '0.95rem' : '0.8rem',
                        minWidth: '38px',
                        textAlign: 'right',
                      }}>
                        {progress}%
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Collapse>
    </div>
  );
}
