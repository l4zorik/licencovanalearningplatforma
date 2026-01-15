'use client';

import { Achievement, getRarityColor, getRarityBorder } from '@/lib/gamification/achievements';
import { Card, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';

interface AchievementCardProps {
  achievement: Achievement;
  unlocked: boolean;
  progress?: number;
  unlockedAt?: Date;
}

export function AchievementCard({ achievement, unlocked, progress = 0, unlockedAt }: AchievementCardProps) {
  const rarityColor = getRarityColor(achievement.rarity);
  const rarityBorder = getRarityBorder(achievement.rarity);

  const progressPercent = Math.min(100, Math.round(progress));

  const tooltip = (
    <Tooltip id={`tooltip-${achievement.id}`}>
      <div className="text-start">
        <strong>{achievement.title}</strong>
        <br />
        <small>{achievement.description}</small>
        <br />
        <span className="text-warning">+{achievement.xpReward} XP</span>
      </div>
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={tooltip}>
      <Card
        className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}
        style={{
          border: rarityBorder,
          background: unlocked
            ? `linear-gradient(145deg, ${rarityColor}20, ${rarityColor}10)`
            : 'rgba(33, 37, 41, 0.8)',
          opacity: unlocked ? 1 : 0.6,
          transition: 'all 0.3s ease',
          cursor: 'unlocked' in achievement ? 'default' : 'help'
        }}
      >
        <Card.Body className="text-center p-3">
          <div
            className="achievement-icon mb-2"
            style={{
              fontSize: unlocked ? '2.5rem' : '2rem',
              filter: unlocked ? 'none' : 'grayscale(100%)',
              transition: 'transform 0.3s ease',
              display: 'inline-block'
            }}
          >
            {achievement.icon}
          </div>
          
          <Card.Title className="h6 mb-1 text-white" style={{ fontSize: '0.85rem' }}>
            {achievement.title}
          </Card.Title>
          
          <Badge
            style={{
              backgroundColor: rarityColor,
              fontSize: '0.65rem'
            }}
            className="mb-2"
          >
            {achievement.rarity}
          </Badge>
          
          {!unlocked && (
            <div className="progress-container mt-2">
              <div
                className="progress-bar"
                style={{
                  height: '4px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    backgroundColor: rarityColor,
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
              <small className="text-muted">{progressPercent}%</small>
            </div>
          )}
          
          {unlocked && unlockedAt && (
            <small className="text-muted d-block mt-1" style={{ fontSize: '0.65rem' }}>
              {new Date(unlockedAt).toLocaleDateString('cs-CZ')}
            </small>
          )}
        </Card.Body>

        <style jsx>{`
          .achievement-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px ${rarityColor}40;
          }
          
          .achievement-card.unlocked:hover .achievement-icon {
            transform: scale(1.1);
          }
        `}</style>
      </Card>
    </OverlayTrigger>
  );
}

interface AchievementsGalleryProps {
  achievements: Achievement[];
  unlockedIds: string[];
  userProgress: Record<string, number>;
  showLocked?: boolean;
  category?: string;
}

export function AchievementsGallery({
  achievements,
  unlockedIds,
  userProgress,
  showLocked = true,
  category
}: AchievementsGalleryProps) {
  const filteredAchievements = category
    ? achievements.filter(a => a.category === category)
    : achievements;

  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    const aUnlocked = unlockedIds.includes(a.id);
    const bUnlocked = unlockedIds.includes(b.id);
    if (aUnlocked !== bUnlocked) return bUnlocked ? 1 : -1;
    
    const rarityOrder = { Mythic: 0, Legendary: 1, Epic: 2, Rare: 3, Common: 4 };
    return rarityOrder[a.rarity] - rarityOrder[b.rarity];
  });

  const unlockedCount = sortedAchievements.filter(a => unlockedIds.includes(a.id)).length;
  const totalXP = achievements
    .filter(a => unlockedIds.includes(a.id))
    .reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-0 text-white">
            🏆 Achievementy
            <span className="ms-2 badge bg-secondary">{unlockedCount}/{sortedAchievements.length}</span>
          </h4>
          <small className="text-muted">Získáno XP: {totalXP.toLocaleString()}</small>
        </div>
        
        <div className="d-flex gap-2">
          {['progress', 'learning', 'career', 'streak', 'mission', 'skill', 'special'].map(cat => (
            <button
              key={cat}
              className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => {}}
              style={{ fontSize: '0.75rem' }}
            >
              {cat === 'progress' ? '📊' : cat === 'learning' ? '📚' : cat === 'career' ? '💼' : cat === 'streak' ? '🔥' : cat === 'mission' ? '🎯' : cat === 'skill' ? '🛠️' : '⭐'}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1rem'
        }}
      >
        {sortedAchievements.map(achievement => {
          const isUnlocked = unlockedIds.includes(achievement.id);
          if (!showLocked && !isUnlocked) return null;
          
          return (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              unlocked={isUnlocked}
              progress={userProgress[achievement.id] || 0}
              unlockedAt={isUnlocked ? new Date() : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
