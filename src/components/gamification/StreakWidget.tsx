'use client';

import React, { useState } from 'react';
import { Card, Button, Badge, ProgressBar, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { StreakData, STREAK_CONFIG, getFreezeAvailability, getStreakBonus, formatStreakDays } from '@/lib/gamification/streak-protection';

interface StreakWidgetProps {
  streakData: StreakData;
  userLevel: number;
  onUseFreeze: () => void;
}

export function StreakWidget({ streakData, userLevel, onUseFreeze }: StreakWidgetProps) {
  const [showFreezeModal, setShowFreezeModal] = useState(false);
  
  const { available, total, resetsIn } = getFreezeAvailability(userLevel, streakData.freezeUsed);
  const streakBonus = getStreakBonus(streakData.currentStreak);
  const isFrozen = streakData.status === 'frozen';
  const isBroken = streakData.status === 'broken';
  
  const getStreakColor = (days: number): string => {
    if (days >= 365) return '#f44336';
    if (days >= 100) return '#ff9800';
    if (days >= 30) return '#9c27b0';
    if (days >= 14) return '#2196f3';
    if (days >= 7) return '#4caf50';
    return '#78909c';
  };
  
  const streakColor = getStreakColor(streakData.currentStreak);
  
  const getNextMilestone = (): number => {
    const milestones = STREAK_CONFIG.streakMilestones;
    for (const milestone of milestones) {
      if (milestone > streakData.currentStreak) return milestone;
    }
    return milestones[milestones.length - 1];
  };
  
  const nextMilestone = getNextMilestone();
  const progressToMilestone = Math.min(100, (streakData.currentStreak / nextMilestone) * 100);
  
  const handleUseFreeze = () => {
    onUseFreeze();
    setShowFreezeModal(false);
  };
  
  const tooltip = (
    <Tooltip id="streak-tooltip">
      {isBroken 
        ? 'Tvůj streak byl resetován. Začni znovu!' 
        : isFrozen 
          ? 'Tvůj streak je zmrazený!'
          : `Získej +${Math.round((streakBonus.xpMultiplier - 1) * 100)}% XP bonus!`}
    </Tooltip>
  );

  return (
    <Card className="streak-widget" style={{
      background: `linear-gradient(145deg, ${streakColor}20 0%, #1a1a2e 100%)`,
      border: `2px solid ${streakColor}60`,
      borderRadius: '16px'
    }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="mb-1 text-white d-flex align-items-center gap-2">
              🔥 Streak
              {isFrozen && <Badge bg="info">🧊 Zmrazený</Badge>}
              {isBroken && <Badge bg="danger">💔 Resetován</Badge>}
            </h5>
            <OverlayTrigger placement="bottom" overlay={tooltip}>
              <span className="text-white-50" style={{ cursor: 'help' }}>
                {formatStreakDays(streakData.currentStreak)} v řadě
              </span>
            </OverlayTrigger>
          </div>
          <div className="text-end">
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: streakColor,
              textShadow: `0 0 20px ${streakColor}60`
            }}>
              {streakData.currentStreak}
            </div>
            <small className="text-white-50">dní</small>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            <small className="text-white-50">Do dalšího milníku ({nextMilestone} dní)</small>
            <small className="text-white">{Math.round(progressToMilestone)}%</small>
          </div>
          <ProgressBar 
            now={progressToMilestone} 
            style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.1)' }}
            className="streak-milestone-progress"
          />
        </div>

        {streakBonus.bonusText && (
          <div className="mb-3 p-2 rounded" style={{ 
            background: `${streakColor}30`, 
            border: `1px solid ${streakColor}50` 
          }}>
            <small className="text-white" style={{ color: streakColor }}>
              {streakBonus.bonusText}
            </small>
          </div>
        )}

        <div className="row mb-3">
          <div className="col-6">
            <div className="p-2 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <small className="text-white-50 d-block">Nejdelší</small>
              <span className="text-white fw-bold" style={{ color: '#ffc107' }}>
                {streakData.longestStreak} 🔥
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="p-2 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <small className="text-white-50 d-block">Celkem aktivních</small>
              <span className="text-white fw-bold">{streakData.totalActiveDays} 📅</span>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-white-50 d-block">Freezy dostupné</small>
            <Badge bg={available > 0 ? 'success' : 'secondary'}>
              🧊 {available}/{total}
            </Badge>
            <small className="text-white-50 ms-2" style={{ fontSize: '0.75rem' }}>
              (obnovení {resetsIn})
            </small>
          </div>
          
          {!isFrozen && !isBroken && available > 0 && (
            <Button 
              variant="outline-info" 
              size="sm"
              onClick={() => setShowFreezeModal(true)}
            >
              🧊 Zmrazit streak
            </Button>
          )}
          
          {isFrozen && streakData.freezeExpiresAt && (
            <small className="text-info">
              🧊 Do odmrazení: {Math.ceil((new Date(streakData.freezeExpiresAt).getTime() - Date.now()) / (1000 * 60 * 60))}h
            </small>
          )}
        </div>
      </Card.Body>

      <Modal show={showFreezeModal} onHide={() => setShowFreezeModal(false)} centered>
        <Modal.Header closeButton style={{ background: 'linear-gradient(90deg, #17a2b8 0%, #6610f2 100%)' }}>
          <Modal.Title className="text-white">🧊 Zmrazit streak</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a2e' }}>
          <div className="text-center">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧊</div>
            <p className="text-white mb-3">
              Chceš zmrazit svůj streak na 24 hodin? 
              <br />
              Během této doby se tvůj streak nezruší, i když nezískáš žádné XP.
            </p>
            <div className="p-3 rounded mb-3" style={{ background: 'rgba(23, 162, 184, 0.2)' }}>
              <small className="text-info">
                💡 Freezy se obnovují {resetsIn}
              </small>
            </div>
            <p className="text-white-50">
              Zbývá: <span className="text-info fw-bold">{available}/{total}</span> freezů
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ background: '#1a1a2e', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button variant="secondary" onClick={() => setShowFreezeModal(false)}>
            Zrušit
          </Button>
          <Button variant="info" onClick={handleUseFreeze}>
            🧊 Zmrazit
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        :global(.streak-milestone-progress .progress-bar) {
          background: linear-gradient(90deg, ${streakColor}, ${streakColor}80);
        }
      `}</style>
    </Card>
  );
}
