'use client';

import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { LifeMissionStep, STEP_TYPE_CONFIG } from '@/types/life-missions';

interface StepCheckboxProps {
  step: LifeMissionStep;
  disabled?: boolean;
  onToggle: (stepId: string) => void;
}

export default function StepCheckbox({ step, disabled = false, onToggle }: StepCheckboxProps) {
  const [showXpAnim, setShowXpAnim] = useState(false);
  const typeConfig = STEP_TYPE_CONFIG[step.type];

  const handleToggle = () => {
    if (disabled) return;
    if (!step.isCompleted) {
      setShowXpAnim(true);
      setTimeout(() => setShowXpAnim(false), 1200);
    }
    onToggle(step.id);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '10px',
        background: step.isCompleted ? 'rgba(76, 175, 80, 0.08)' : 'rgba(255,255,255,0.03)',
        border: step.isCompleted ? '1px solid rgba(76, 175, 80, 0.2)' : '1px solid rgba(255,255,255,0.06)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
      onClick={handleToggle}
    >
      <div
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '6px',
          border: step.isCompleted ? '2px solid #4CAF50' : '2px solid rgba(255,255,255,0.3)',
          background: step.isCompleted ? '#4CAF50' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px',
          transition: 'all 0.2s ease',
        }}
      >
        {step.isCompleted && (
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>✓</span>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              color: step.isCompleted ? 'rgba(255,255,255,0.5)' : '#fff',
              textDecoration: step.isCompleted ? 'line-through' : 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
            }}
          >
            {step.title}
          </span>
          <span style={{ fontSize: '0.7rem', color: typeConfig.color }}>
            {typeConfig.icon} {typeConfig.label}
          </span>
        </div>
        {step.description && (
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: '4px 0 0 0' }}>
            {step.description}
          </p>
        )}
        {step.resources && step.resources.length > 0 && (
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
            {step.resources.map((r, i) => (
              <span key={i} style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                📎 {r}
              </span>
            ))}
          </div>
        )}
      </div>

      <Badge
        bg=""
        style={{
          background: step.isCompleted ? 'rgba(76,175,80,0.2)' : 'rgba(255,193,7,0.15)',
          color: step.isCompleted ? '#4CAF50' : '#FFC107',
          fontSize: '0.7rem',
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        +{step.xpReward} XP
      </Badge>

      {showXpAnim && (
        <div
          style={{
            position: 'absolute',
            right: '16px',
            top: '-10px',
            color: '#4CAF50',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            animation: 'floatUp 1.2s ease-out forwards',
            pointerEvents: 'none',
          }}
        >
          +{step.xpReward} XP ✨
        </div>
      )}

      <style jsx>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-30px); }
        }
      `}</style>
    </div>
  );
}
