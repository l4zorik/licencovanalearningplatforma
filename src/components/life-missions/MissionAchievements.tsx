'use client';

import React from 'react';
import { Badge } from 'react-bootstrap';
import { UnlockedAchievement } from '@/types/life-missions';
import { MISSION_ACHIEVEMENTS } from '@/data/life-missions/achievements';

interface MissionAchievementsProps {
  unlockedAchievements: UnlockedAchievement[];
}

export default function MissionAchievements({ unlockedAchievements }: MissionAchievementsProps) {
  const unlockedIds = new Set(unlockedAchievements.map(u => u.achievementId));

  return (
    <div
      style={{
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '20px',
      }}
    >
      <h5 style={{ color: '#fff', marginBottom: '16px', fontSize: '1.1rem' }}>🏆 Achievementy ({unlockedAchievements.length}/{MISSION_ACHIEVEMENTS.length})</h5>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {MISSION_ACHIEVEMENTS.map((achievement) => {
          const isUnlocked = unlockedIds.has(achievement.id);
          return (
            <div
              key={achievement.id}
              style={{
                width: '80px',
                textAlign: 'center',
                padding: '10px 6px',
                borderRadius: '12px',
                background: isUnlocked ? 'rgba(255,193,7,0.08)' : 'rgba(255,255,255,0.02)',
                border: isUnlocked ? '1px solid rgba(255,193,7,0.2)' : '1px solid rgba(255,255,255,0.05)',
                opacity: isUnlocked ? 1 : 0.4,
                transition: 'all 0.2s ease',
              }}
              title={`${achievement.title}: ${achievement.description}${isUnlocked ? ' (Odemčeno!)' : ''}`}
            >
              <div style={{ fontSize: '1.8rem', filter: isUnlocked ? 'none' : 'grayscale(1)' }}>
                {achievement.icon}
              </div>
              <div style={{ color: isUnlocked ? '#FFC107' : 'rgba(255,255,255,0.3)', fontSize: '0.6rem', fontWeight: 600, marginTop: '4px' }}>
                {achievement.title}
              </div>
              {isUnlocked && (
                <Badge bg="" style={{ background: 'rgba(255,193,7,0.15)', color: '#FFC107', fontSize: '0.55rem', marginTop: '4px' }}>
                  +{achievement.xpReward} XP
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
