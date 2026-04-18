'use client';

import React from 'react';
import { Card, Row, Col, ProgressBar, Badge } from 'react-bootstrap';
import { FiHeart, FiMessageCircle, FiClock, FiHelpCircle, FiTrendingUp, FiAward, FiCalendar } from 'react-icons/fi';
import { RelationshipStats, getTrustColor, getTrustLabel } from '@/types/vztahy';

interface StatsSectionProps {
  stats: RelationshipStats;
  compact?: boolean;
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats, compact = false }) => {
  const statCards = [
    {
      icon: <FiHeart />,
      label: 'Důvěra',
      value: stats.trustScore,
      color: '#E91E63',
      bg: 'rgba(233, 30, 99, 0.15)'
    },
    {
      icon: <FiMessageCircle />,
      label: 'Komunikace',
      value: stats.communicationScore,
      color: '#FF9800',
      bg: 'rgba(255, 152, 0, 0.15)'
    },
    {
      icon: <FiClock />,
      label: 'Čas spolu',
      value: stats.timeSpentScore,
      color: '#2196F3',
      bg: 'rgba(33, 150, 243, 0.15)'
    },
    {
      icon: <FiHelpCircle />,
      label: 'Podpora',
      value: stats.supportScore,
      color: '#4CAF50',
      bg: 'rgba(76, 175, 80, 0.15)'
    }
  ];

  if (compact) {
    return (
      <Row className="g-3">
        {statCards.map((stat, idx) => (
          <Col xs={6} md={3} key={idx}>
            <Card className="border-0 h-100" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px' }}>
              <Card.Body className="p-3 text-center">
                <div 
                  className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px', background: stat.bg, color: stat.color, fontSize: '1.2rem' }}
                >
                  {stat.icon}
                </div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem' }}>{stat.value}%</div>
                <small style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.label}</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Card className="border-0 mb-4" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px' }}>
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 style={{ color: '#fff', margin: 0, fontWeight: 600 }}>
            📊 Přehled vztahu
          </h5>
          <Badge 
            style={{ 
              background: getTrustColor(stats.overallScore),
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem'
            }}
          >
            {getTrustLabel(stats.overallScore)}
          </Badge>
        </div>

        <Row className="g-4">
          {statCards.map((stat, idx) => (
            <Col xs={6} md={3} key={idx}>
              <div className="text-center">
                <div 
                  className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                  style={{ width: '50px', height: '50px', background: stat.bg, color: stat.color, fontSize: '1.3rem' }}
                >
                  {stat.icon}
                </div>
                <ProgressBar 
                  now={stat.value} 
                  variant="dark"
                  style={{ 
                    height: '8px', 
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '10px'
                  }}
                  className="mb-2"
                />
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.4rem' }}>{stat.value}%</div>
                <small style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.label}</small>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="mt-4 g-3">
          <Col xs={6} md={3}>
            <div style={{ 
              background: 'rgba(255,255,255,0.05)', 
              padding: '12px', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#FF9800', fontSize: '1.5rem', fontWeight: 700 }}>🔥 {stats.streak}</div>
              <small style={{ color: 'rgba(255,255,255,0.5)' }}>Dní v řadě</small>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div style={{ 
              background: 'rgba(255,255,255,0.05)', 
              padding: '12px', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#E91E63', fontSize: '1.5rem', fontWeight: 700 }}>📸 {stats.totalMemories}</div>
              <small style={{ color: 'rgba(255,255,255,0.5)' }}>Vzpomínek</small>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div style={{ 
              background: 'rgba(255,255,255,0.05)', 
              padding: '12px', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#4CAF50', fontSize: '1.5rem', fontWeight: 700 }}>✅ {stats.goalsCompleted}</div>
              <small style={{ color: 'rgba(255,255,255,0.5)' }}>Cílů dokončeno</small>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div style={{ 
              background: 'rgba(255,255,255,0.05)', 
              padding: '12px', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#2196F3', fontSize: '1.5rem', fontWeight: 700 }}>📅 {stats.eventsThisMonth}</div>
              <small style={{ color: 'rgba(255,255,255,0.5)' }}>Událostí tento měsíc</small>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default StatsSection;
