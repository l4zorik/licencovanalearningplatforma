'use client';

import React, { useState } from 'react';
import { Badge, ProgressBar } from 'react-bootstrap';
import { LifeMissionPhase, PhaseStatus } from '@/types/life-missions';
import { calculatePhaseProgress } from '@/lib/life-missions/utils';
import StepCheckbox from './StepCheckbox';

interface PhaseAccordionProps {
  phase: LifeMissionPhase;
  phaseIndex: number;
  status: PhaseStatus;
  defaultOpen?: boolean;
  onToggleStep: (phaseId: string, stepId: string) => void;
}

const STATUS_COLORS: Record<PhaseStatus, { bg: string; border: string; badge: string; label: string }> = {
  completed: { bg: 'rgba(76,175,80,0.08)', border: 'rgba(76,175,80,0.3)', badge: '#4CAF50', label: 'Hotovo ✓' },
  active: { bg: 'rgba(255,193,7,0.08)', border: 'rgba(255,193,7,0.3)', badge: '#FFC107', label: 'Aktivní' },
  locked: { bg: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.08)', badge: '#666', label: '🔒 Zamčeno' },
};

export default function PhaseAccordion({ phase, phaseIndex, status, defaultOpen = false, onToggleStep }: PhaseAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen || status === 'active');
  const progress = calculatePhaseProgress(phase);
  const colors = STATUS_COLORS[status];
  const completedSteps = phase.steps.filter(s => s.isCompleted).length;

  return (
    <div
      style={{
        borderRadius: '12px',
        border: `1px solid ${colors.border}`,
        background: colors.bg,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        onClick={() => status !== 'locked' && setIsOpen(!isOpen)}
        style={{
          padding: '16px 20px',
          cursor: status === 'locked' ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          opacity: status === 'locked' ? 0.5 : 1,
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>{phase.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.05rem' }}>
              Fáze {phaseIndex + 1}: {phase.title}
            </span>
            <Badge
              bg=""
              style={{
                background: `${colors.badge}22`,
                color: colors.badge,
                fontSize: '0.7rem',
              }}
            >
              {colors.label}
            </Badge>
            {status !== 'locked' && (
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                {completedSteps}/{phase.steps.length} kroků
              </span>
            )}
          </div>
          {status !== 'locked' && (
            <div style={{ marginTop: '8px' }}>
              <ProgressBar
                now={progress}
                variant={status === 'completed' ? 'success' : 'warning'}
                style={{ height: '4px', background: 'rgba(255,255,255,0.08)' }}
              />
            </div>
          )}
          {phase.description && (
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: '6px 0 0 0' }}>
              {phase.description}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {status === 'completed' && (
            <Badge bg="" style={{ background: 'rgba(76,175,80,0.2)', color: '#4CAF50', fontSize: '0.75rem' }}>
              +{phase.bonusXp} XP bonus
            </Badge>
          )}
          {status !== 'locked' && (
            <span
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '1.2rem',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            >
              ▾
            </span>
          )}
        </div>
      </div>

      {isOpen && status !== 'locked' && (
        <div style={{ padding: '0 20px 16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {phase.steps.map((step) => (
            <StepCheckbox
              key={step.id}
              step={step}
              disabled={status === 'locked'}
              onToggle={(stepId) => onToggleStep(phase.id, stepId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
