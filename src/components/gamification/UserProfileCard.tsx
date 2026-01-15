'use client';

import React, { useState } from 'react';
import { Card, Row, Col, Badge, ProgressBar, Tabs, Tab, Button, Table } from 'react-bootstrap';
import { UserProfile, UserStats, getRankTier, calculateLevelProgress, formatTimeAgo, calculateOverallScore } from '@/types/profile';
import { calculateLevel, formatXP } from '@/lib/gamification/xp-system';
import { getRarityColor } from '@/lib/gamification/achievements';
import { Radar } from 'recharts';

interface UserProfileCardProps {
  user: UserProfile;
  onEditProfile?: () => void;
  onShareProfile?: () => void;
}

export function UserProfileCard({ user, onEditProfile, onShareProfile }: UserProfileCardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const rankTier = getRankTier(user.level);
  const levelData = calculateLevel(user.xp);
  const levelProgress = calculateLevelProgress(user.xp, user.level);
  const overallScore = calculateOverallScore(user.stats);
  
  const statsData = [
    { subject: 'XP', A: Math.min(100, (user.stats.totalXP / 10000) * 100), fullMark: 100 },
    { subject: 'Streak', A: Math.min(100, user.stats.currentStreak * 3), fullMark: 100 },
    { subject: 'Achievements', A: Math.min(100, user.stats.achievementsUnlocked * 2), fullMark: 100 },
    { subject: 'Projekty', A: Math.min(100, user.stats.completedProjects * 10), fullMark: 100 },
    { subject: 'Learning', A: Math.min(100, user.stats.totalHours / 10), fullMark: 100 },
    { subject: 'Career', A: Math.min(100, (user.stats.jobsInInterview + user.stats.jobsWithOffer) * 20), fullMark: 100 },
  ];

  return (
    <Card className="user-profile-card" style={{
      background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
      border: `2px solid ${rankTier.color}40`,
      borderRadius: '16px',
      overflow: 'hidden'
    }}>
      <div style={{
        background: `linear-gradient(90deg, ${rankTier.color}, ${rankTier.color}80)`,
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div className="position-relative d-inline-block mb-3">
          <div 
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `linear-gradient(145deg, ${rankTier.color}, ${rankTier.color}80)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              border: '4px solid white',
              boxShadow: `0 0 30px ${rankTier.color}60`
            }}
          >
            {user.avatar || '👤'}
          </div>
          <Badge 
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              background: rankTier.color,
              fontSize: '1rem',
              padding: '0.5rem'
            }}
          >
            Lv.{user.level}
          </Badge>
        </div>
        
        <h3 className="text-white mb-1">{user.username}</h3>
        <p className="text-white-50 mb-2" style={{ color: rankTier.color }}>{user.title}</p>
        
        <div className="d-flex justify-content-center gap-3 mb-3">
          <Badge bg="warning" text="dark">
            🏆 Rank: {rankTier.name}
          </Badge>
          <Badge bg="secondary">
            ⭐ {formatXP(user.xp)} XP
          </Badge>
          <Badge bg="info">
            🪙 {user.gold} Zlato
          </Badge>
        </div>
        
        <div className="d-flex justify-content-center gap-2">
          {onEditProfile && (
            <Button variant="outline-light" size="sm" onClick={onEditProfile}>
              ✏️ Upravit
            </Button>
          )}
          {onShareProfile && (
            <Button variant="outline-light" size="sm" onClick={onShareProfile}>
              📤 Sdílet
            </Button>
          )}
        </div>
      </div>

      <Card.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'overview')} className="mb-3">
          <Tab eventKey="overview" title="📊 Přehled">
            <Row className="mb-4">
              <Col md={6} className="mb-3">
                <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <h6 className="text-white-50 mb-3">🔥 Streak</h6>
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ fontSize: '2rem', color: '#ff6b6b' }}>🔥</div>
                    <div>
                      <div className="h4 mb-0 text-white">{user.stats.currentStreak}</div>
                      <small className="text-white-50">dní v řadě</small>
                    </div>
                  </div>
                  <div className="mt-2">
                    <small className="text-white-50">Nejdelší: {user.stats.longestStreak} dní</small>
                  </div>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <h6 className="text-white-50 mb-3">📈 Celkové skóre</h6>
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: `conic-gradient(${rankTier.color} ${overallScore * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <span className="text-white fw-bold">{overallScore}</span>
                    </div>
                    <div>
                      <div className="h4 mb-0 text-white">Celkové skóre</div>
                      <small className="text-white-50">Percentil: {user.stats.rankPercentile}%</small>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <h6 className="text-white mb-3">📊 statistiky</h6>
            <Row>
              {[
                { icon: '⚡', label: 'Algoritmy', value: user.stats.totalAlgorithms, color: '#64b5f6' },
                { icon: '⏱️', label: 'Hodin učení', value: user.stats.totalHours, color: '#81c784' },
                { icon: '📚', label: 'Kurzů', value: user.stats.totalCourses, color: '#ffb74d' },
                { icon: '🎯', label: 'Milestone', value: user.stats.totalMilestones, color: '#ba68c8' },
                { icon: '📁', label: 'Projekty', value: user.stats.completedProjects, color: '#f06292' },
                { icon: '💼', label: 'Nabídky', value: user.stats.jobsWithOffer, color: '#4dd0e1' },
              ].map((stat, idx) => (
                <Col key={idx} xs={4} md={2} className="mb-3">
                  <div className="text-center p-2 rounded" style={{ background: `${stat.color}20` }}>
                    <div style={{ fontSize: '1.5rem' }}>{stat.icon}</div>
                    <div className="h5 mb-0 text-white">{stat.value}</div>
                    <small className="text-white-50">{stat.label}</small>
                  </div>
                </Col>
              ))}
            </Row>
          </Tab>

          <Tab eventKey="achievements" title="🏆 Achievementy">
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <h6 className="mb-0 text-white">
                🏆 {user.stats.achievementsUnlocked} / 50 Achievementů
              </h6>
              <Badge bg="primary">{Math.round((user.stats.achievementsUnlocked / 50) * 100)}%</Badge>
            </div>
            <ProgressBar 
              now={(user.stats.achievementsUnlocked / 50) * 100} 
              style={{ height: '10px', backgroundColor: 'rgba(255,255,255,0.1)' }}
              className="mb-4"
            />
            
            <div className="achievements-grid">
              {user.achievements.slice(0, 12).map((ua, idx) => (
                <div 
                  key={idx}
                  className="achievement-item p-2 rounded text-center"
                  style={{
                    background: `${getRarityColor(ua.achievement.rarity)}20`,
                    border: `1px solid ${getRarityColor(ua.achievement.rarity)}40`
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>{ua.achievement.icon}</div>
                  <small className="text-white d-block">{ua.achievement.title}</small>
                  <Badge 
                    style={{ 
                      fontSize: '0.6rem',
                      backgroundColor: getRarityColor(ua.achievement.rarity) 
                    }}
                  >
                    {ua.achievement.rarity}
                  </Badge>
                </div>
              ))}
            </div>
            
            {user.achievements.length > 12 && (
              <div className="text-center mt-3">
                <Button variant="outline-primary" size="sm">
                  Zobrazit všechny ({user.achievements.length})
                </Button>
              </div>
            )}
          </Tab>

          <Tab eventKey="progress" title="📈 Pokrok">
            <h6 className="text-white mb-3">Level Progress</h6>
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-white">Level {user.level}</span>
                <span className="text-white">{levelProgress.percentage}%</span>
              </div>
              <ProgressBar 
                now={levelProgress.percentage} 
                style={{ height: '20px', backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="level-progress"
              />
              <div className="d-flex justify-content-between mt-2">
                <small className="text-white-50">{formatXP(levelProgress.currentXP)} XP</small>
                <small className="text-white-50">{formatXP(levelProgress.requiredXP)} XP do dalšího</small>
              </div>
            </div>
            
            <Row>
              <Col md={6}>
                <h6 className="text-white mb-3">Denní cíl</h6>
                <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-white">Denní XP</span>
                    <span className="text-white">2,500 / 5,000</span>
                  </div>
                  <ProgressBar now={50} style={{ height: '10px' }} />
                </div>
              </Col>
              <Col md={6}>
                <h6 className="text-white mb-3">Questy</h6>
                <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-white">Dokončeno</span>
                    <span className="text-white">2 / 4</span>
                  </div>
                  <ProgressBar now={50} style={{ height: '10px' }} variant="success" />
                </div>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="activity" title="📅 Aktivita">
            <h6 className="text-white mb-3">Heatmapa aktivit</h6>
            <div className="activity-heatmap p-3 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="d-flex flex-wrap gap-1">
                {Array.from({ length: 52 }).map((_, weekIdx) => (
                  <div key={weekIdx} className="d-flex flex-column gap-1">
                    {Array.from({ length: 7 }).map((_, dayIdx) => {
                      const level = Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4;
                      const colors = ['#1a1a2e', '#0e4429', '#006d32', '#26a641', '#39d353'];
                      return (
                        <div
                          key={dayIdx}
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '2px',
                            backgroundColor: colors[level]
                          }}
                          title={`Level ${level}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
                <div className="d-flex justify-content-end align-items-center gap-2 mt-2">
                <small className="text-white-50">Méně</small>
                {['#1a1a2e', '#0e4429', '#006d32', '#26a641', '#39d353'].map((c, i) => (
                  <div key={i} style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: c }} />
                ))}
                <small className="text-white-50">Více</small>
              </div>
            </div>
            
            <Row className="mt-4">
              <Col md={6}>
                <h6 className="text-white mb-3">Aktivita za týden</h6>
                <Table variant="dark" size="sm">
                  <thead>
                    <tr>
                      <th>Den</th>
                      <th>XP</th>
                      <th>Algoritmy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'].map((day, idx) => (
                      <tr key={day}>
                        <td>{day}</td>
                        <td>{Math.floor(Math.random() * 500 + 100)}</td>
                        <td>{Math.floor(Math.random() * 10 + 1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <h6 className="text-white mb-3">Nejaktivnější doba</h6>
                <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-white mb-2">🕐 9:00 - 12:00</p>
                  <p className="text-white mb-0">📅 Pondělí</p>
                </div>
              </Col>
            </Row>
          </Tab>
        </Tabs>

        <div className="mt-3 pt-3 border-top border-secondary">
          <small className="text-white-50">
            📅 Člen od {new Date(user.createdAt).toLocaleDateString('cs-CZ')} • 
            Naposledy aktivní {formatTimeAgo(user.lastActiveAt)}
          </small>
        </div>
      </Card.Body>

      <style jsx>{`
        .user-profile-card {
          max-width: 800px;
          margin: 0 auto;
        }
        :global(.level-progress .progress-bar) {
          background: linear-gradient(90deg, ${rankTier.color}, ${rankTier.color}80);
        }
        :global(.achievements-grid) {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 0.5rem;
        }
        :global(.achievement-item) {
          transition: transform 0.2s ease;
        }
        :global(.achievement-item:hover) {
          transform: scale(1.05);
        }
      `}</style>
    </Card>
  );
}
