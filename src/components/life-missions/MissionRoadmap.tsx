'use client';

import React from 'react';
import { LifeMission, PhaseStatus } from '@/types/life-missions';
import { getPhaseStatus, calculatePhaseProgress } from '@/lib/life-missions/utils';

interface MissionRoadmapProps {
  mission: LifeMission;
  onPhaseClick?: (phaseIndex: number) => void;
}

const STATUS_STYLES: Record<PhaseStatus, { bg: string; border: string; text: string; line: string }> = {
  completed: { bg: '#4CAF50', border: '#4CAF50', text: '#fff', line: '#4CAF50' },
  active: { bg: '#FFC107', border: '#FFC107', text: '#000', line: '#FFC107' },
  locked: { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.2)', text: 'rgba(255,255,255,0.3)', line: 'rgba(255,255,255,0.1)' },
};

export default function MissionRoadmap({ mission, onPhaseClick }: MissionRoadmapProps) {
  return (
    <div style={{ overflowX: 'auto', padding: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', minWidth: 'max-content', gap: '0' }}>
        {mission.phases.map((phase, idx) => {
          const status = getPhaseStatus(mission, idx);
          const styles = STATUS_STYLES[status];
          const progress = calculatePhaseProgress(phase);

          return (
            <React.Fragment key={phase.id}>
              {/* Phase node */}
              <div
                onClick={() => status !== 'locked' && onPhaseClick?.(idx)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: status !== 'locked' ? 'pointer' : 'default',
                  minWidth: '120px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: styles.bg,
                    border: `3px solid ${styles.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    color: styles.text,
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    boxShadow: status === 'active' ? `0 0 15px ${styles.bg}40` : 'none',
                    position: 'relative',
                  }}
                >
                  {status === 'completed' ? '✓' : status === 'locked' ? '🔒' : phase.icon}
                  {status === 'active' && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        right: '-4px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: '#1a1a2e',
                        border: `2px solid ${styles.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.5rem',
                        color: styles.text,
                        fontWeight: 'bold',
                      }}
                    >
                      {progress}
                    </div>
                  )}
                </div>
                <span
                  style={{
                    color: status === 'locked' ? 'rgba(255,255,255,0.3)' : '#fff',
                    fontSize: '0.75rem',
                    fontWeight: status === 'active' ? 600 : 400,
                    marginTop: '8px',
                    textAlign: 'center',
                    maxWidth: '110px',
                  }}
                >
                  {phase.title}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', marginTop: '2px' }}>
                  Fáze {idx + 1}
                </span>
              </div>

              {/* Connector line */}
              {idx < mission.phases.length - 1 && (
                <div
                  style={{
                    height: '3px',
                    width: '60px',
                    background: status === 'completed' ? styles.line : 'rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    marginTop: '-20px',
                    flexShrink: 0,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
