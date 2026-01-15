'use client';

import { Card, Badge, Row, Col } from 'react-bootstrap';
import { calculateLevel, formatXP, getPerksForLevel } from '@/lib/gamification/xp-system';

interface UserProgressCardProps {
  xp: number;
  level: number;
  streak: number;
  title?: string;
  color?: string;
}

export function UserProgressCard({ xp, level, streak, title, color }: UserProgressCardProps) {
  const levelData = calculateLevel(xp);

  return (
    <Card
      className="user-progress-card"
      style={{
        background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
        border: `2px solid ${levelData.color}40`,
        borderRadius: '16px'
      }}
    >
      <Card.Body>
        <Row className="align-items-center">
          <Col xs="auto">
            <div
              className="level-badge d-flex align-items-center justify-content-center"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `linear-gradient(145deg, ${levelData.color}, ${levelData.color}80)`,
                boxShadow: `0 0 30px ${levelData.color}40`,
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {levelData.level}
            </div>
          </Col>
          
          <Col>
            <div className="d-flex align-items-center gap-2 mb-1">
              <h3 className="mb-0 text-white" style={{ color: levelData.color }}>
                {levelData.title}
              </h3>
              {streak > 0 && (
                <Badge bg="warning" className="text-dark">
                  🔥 {streak}
                </Badge>
              )}
            </div>
            
            <div className="d-flex align-items-center gap-3 mb-2">
              <span className="text-white-50">
                ⭐ {formatXP(xp)} XP
              </span>
              <span className="text-white-50">
                📊 {formatXP(levelData.xpForCurrent)} / {formatXP(levelData.xpForNext)} do dalšího levelu
              </span>
            </div>
            
            <div
              style={{
                height: '8px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${levelData.progress}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${levelData.color}, ${levelData.color}80)`,
                  borderRadius: '4px',
                  transition: 'width 0.5s ease'
                }}
              />
            </div>
          </Col>
        </Row>

        {levelData.perks.length > 0 && (
          <div className="mt-3 pt-3 border-top border-secondary">
            <small className="text-white-50 d-block mb-2">🎁 Odemknuté výhody:</small>
            <div className="d-flex flex-wrap gap-2">
              {levelData.perks.map((perk, index) => (
                <Badge
                  key={index}
                  style={{
                    backgroundColor: `${levelData.color}30`,
                    color: levelData.color,
                    border: `1px solid ${levelData.color}50`
                  }}
                >
                  {perk}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card.Body>

      <style jsx>{`
        .user-progress-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .user-progress-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px ${levelData.color}20;
        }
      `}</style>
    </Card>
  );
}
