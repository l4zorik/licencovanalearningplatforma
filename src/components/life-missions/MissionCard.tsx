'use client';

import React from 'react';
import { Badge, ProgressBar } from 'react-bootstrap';
import Link from 'next/link';
import { LifeMission, DIFFICULTY_LABELS } from '@/types/life-missions';
import { calculateMissionProgress, calculateEarnedXp, getPhaseStatus } from '@/lib/life-missions/utils';

interface MissionCardProps {
  mission: LifeMission;
}

export default function MissionCard({ mission }: MissionCardProps) {
  const progress = calculateMissionProgress(mission);
  const earnedXp = calculateEarnedXp(mission);
  const totalSteps = mission.phases.reduce((s, p) => s + p.steps.length, 0);
  const completedSteps = mission.phases.reduce((s, p) => s + p.steps.filter(st => st.isCompleted).length, 0);

  const statusColors: Record<string, { bg: string; label: string }> = {
    active: { bg: '#FFC107', label: 'Aktivní' },
    completed: { bg: '#4CAF50', label: 'Dokončeno' },
    paused: { bg: '#FF9800', label: 'Pozastaveno' },
    abandoned: { bg: '#F44336', label: 'Opuštěno' },
  };

  const statusConfig = statusColors[mission.status] || statusColors.active;

  return (
    <Link href={`/life-missions/${mission.id}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${mission.color}30`,
          padding: '20px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLDivElement).style.borderColor = `${mission.color}60`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 25px ${mission.color}15`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLDivElement).style.borderColor = `${mission.color}30`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}
      >
        {/* Top gradient line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${mission.color}, ${mission.color}60)`,
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '2rem' }}>{mission.icon}</span>
            <div>
              <h5 style={{ color: '#fff', margin: 0, fontSize: '1rem', fontWeight: 600 }}>{mission.title}</h5>
              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                <Badge bg="" style={{ background: `${statusConfig.bg}22`, color: statusConfig.bg, fontSize: '0.65rem' }}>
                  {statusConfig.label}
                </Badge>
                <Badge bg="" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem' }}>
                  {'⭐'.repeat(mission.difficulty)}
                </Badge>
              </div>
            </div>
          </div>
          <Badge bg="" style={{ background: `${mission.color}15`, color: mission.color, fontSize: '0.7rem' }}>
            {mission.priority === 'critical' ? '🔴' : mission.priority === 'high' ? '🟠' : mission.priority === 'medium' ? '🟡' : '🟢'} {mission.priority}
          </Badge>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
              {completedSteps}/{totalSteps} kroků
            </span>
            <span style={{ color: mission.color, fontSize: '0.8rem', fontWeight: 600 }}>{progress}%</span>
          </div>
          <ProgressBar
            now={progress}
            style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px' }}
          >
            <ProgressBar
              now={progress}
              style={{ background: `linear-gradient(90deg, ${mission.color}, ${mission.color}AA)`, borderRadius: '3px' }}
            />
          </ProgressBar>
        </div>

        {/* Phase indicators */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
          {mission.phases.map((phase, idx) => {
            const phStatus = getPhaseStatus(mission, idx);
            return (
              <div
                key={phase.id}
                style={{
                  flex: 1,
                  height: '4px',
                  borderRadius: '2px',
                  background:
                    phStatus === 'completed' ? '#4CAF50' :
                    phStatus === 'active' ? '#FFC107' :
                    'rgba(255,255,255,0.1)',
                }}
                title={`${phase.title} - ${phStatus === 'completed' ? 'Hotovo' : phStatus === 'active' ? 'Aktivní' : 'Zamčeno'}`}
              />
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
            {mission.phases.length} fází
          </span>
          <Badge bg="" style={{ background: 'rgba(255,193,7,0.12)', color: '#FFC107', fontSize: '0.75rem' }}>
            ⚡ {earnedXp}/{mission.totalXp + mission.completionBonusXp} XP
          </Badge>
        </div>
      </div>
    </Link>
  );
}
