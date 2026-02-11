'use client';

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { LifeMissionStats } from '@/types/life-missions';

interface MissionDashboardProps {
  stats: LifeMissionStats;
}

const CARDS = [
  { key: 'active', label: 'Aktivní mise', icon: '🎯', color: '#FFC107', getValue: (s: LifeMissionStats) => s.activeMissions },
  { key: 'completed', label: 'Dokončené', icon: '✅', color: '#4CAF50', getValue: (s: LifeMissionStats) => s.completedMissions },
  { key: 'progress', label: 'Celkový pokrok', icon: '📊', color: '#2196F3', getValue: (s: LifeMissionStats) => `${s.overallProgress}%` },
  { key: 'xp', label: 'Získané XP', icon: '⚡', color: '#FF9800', getValue: (s: LifeMissionStats) => s.totalXpEarned.toLocaleString('cs-CZ') },
];

export default function MissionDashboard({ stats }: MissionDashboardProps) {
  return (
    <Row className="g-3 mb-4">
      {CARDS.map((card) => (
        <Col key={card.key} xs={6} md={3}>
          <div
            style={{
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${card.color}25`,
              padding: '20px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${card.color}, ${card.color}40)`,
              }}
            />
            <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{card.icon}</div>
            <div style={{ color: card.color, fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.2 }}>
              {card.getValue(stats)}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: '4px' }}>
              {card.label}
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}
