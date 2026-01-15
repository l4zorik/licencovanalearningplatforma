'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Badge, ProgressBar } from 'react-bootstrap';
import { calculateLevel, formatXP } from '@/lib/gamification/xp-system';
import { getPerksForLevel } from '@/lib/gamification/xp-system';

interface LevelUpCelebrationProps {
  previousXP: number;
  newXP: number;
  previousLevel: number;
  newLevel: number;
  onClose: () => void;
}

export function LevelUpCelebration({ 
  previousXP, 
  newXP, 
  previousLevel, 
  newLevel, 
  onClose 
}: LevelUpCelebrationProps) {
  const [animationPhase, setAnimationPhase] = useState<'counting' | 'reveal' | 'rewards'>('counting');
  const [displayedXP, setDisplayedXP] = useState(previousXP);
  const [displayedLevel, setDisplayedLevel] = useState(previousLevel);
  
  useEffect(() => {
    const levelData = calculateLevel(newXP);
    const totalXPToAdd = newXP - previousXP;
    const duration = 2000;
    const steps = 60;
    const xpPerStep = totalXPToAdd / steps;
    const timePerStep = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      
      if (currentStep >= steps) {
        setDisplayedXP(newXP);
        setDisplayedLevel(newLevel);
        clearInterval(interval);
        setAnimationPhase('reveal');
        
        setTimeout(() => {
          setAnimationPhase('rewards');
        }, 1500);
      } else {
        setDisplayedXP(Math.round(previousXP + currentStep * xpPerStep));
        setDisplayedLevel(calculateLevel(Math.round(previousXP + currentStep * xpPerStep)).level);
      }
    }, timePerStep);
    
    return () => clearInterval(interval);
  }, [previousXP, newXP, previousLevel, newLevel]);
  
  const levelData = calculateLevel(displayedXP);
  const perks = getPerksForLevel(displayedLevel);
  const isMajorLevelUp = [5, 10, 15, 20, 25, 30].includes(newLevel);
  
  const confettiColors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
  
  return (
    <Modal 
      show={true} 
      onHide={onClose} 
      centered 
      size="lg"
      backdrop="static"
      className="level-up-modal"
    >
      <Modal.Body 
        style={{
          background: animationPhase === 'rewards' 
            ? `linear-gradient(145deg, ${levelData.color}40 0%, #1a1a2e 100%)`
            : 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
          border: `4px solid ${levelData.color}`,
          borderRadius: '24px',
          padding: '3rem',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        {animationPhase !== 'rewards' && (
          <div className="confetti-container">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                  animationDelay: `${Math.random() * 0.5}s`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`
                }}
              />
            ))}
          </div>
        )}
        
        <div className="level-up-content">
          {animationPhase !== 'rewards' && (
            <div className="text-white-50 mb-2">LEVEL UP!</div>
          )}
          
          <div 
            className="level-badge mb-4"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: `linear-gradient(145deg, ${levelData.color}, ${levelData.color}80)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              fontSize: '4rem',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: `0 0 60px ${levelData.color}80`,
              animation: animationPhase === 'reveal' ? 'levelUpPulse 0.5s ease' : 'none'
            }}
          >
            {displayedLevel}
          </div>
          
          <h2 className="text-white mb-2" style={{ color: levelData.color }}>
            {levelData.title}
          </h2>
          
          <div className="mb-4">
            <div className="d-flex justify-content-center gap-4 text-white-50">
              <span>⭐ {formatXP(displayedXP)} XP</span>
              <span>📊 {levelData.progress}% do dalšího</span>
            </div>
            <ProgressBar 
              now={levelData.progress} 
              style={{ height: '10px', maxWidth: '300px', margin: '1rem auto' }}
              className="level-progress"
            />
          </div>
          
          {animationPhase === 'rewards' && (
            <div className="rewards-section mt-4">
              {isMajorLevelUp && (
                <div className="mb-4 p-3 rounded" style={{ 
                  background: `linear-gradient(90deg, ${levelData.color}30, transparent)`,
                  border: `1px solid ${levelData.color}60`
                }}>
                  <h5 className="text-white mb-3">🎉 LEVEL {newLevel} REWARD</h5>
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Badge bg="warning" text="dark" style={{ fontSize: '1rem' }}>
                      🏆 Speciální odznak
                    </Badge>
                    <Badge style={{ backgroundColor: levelData.color, fontSize: '1rem' }}>
                      ✨ {levelData.title} titul
                    </Badge>
                  </div>
                </div>
              )}
              
              {perks.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-white mb-3">🎁 Odemknuté výhody</h5>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    {perks.map((perk, idx) => (
                      <Badge 
                        key={idx}
                        style={{ 
                          backgroundColor: `${levelData.color}30`,
                          color: levelData.color,
                          border: `1px solid ${levelData.color}60`,
                          fontSize: '0.9rem',
                          padding: '0.5rem 1rem'
                        }}
                      >
                        {perk}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="p-3 rounded mb-4" style={{ background: 'rgba(76, 175, 80, 0.2)' }}>
                <span className="text-success fw-bold" style={{ fontSize: '1.2rem' }}>
                  🎊 Gratulujeme k postupu na Level {newLevel}!
                </span>
              </div>
            </div>
          )}
          
          {animationPhase !== 'rewards' && (
            <div className="text-white-50">
              <small>Nasbírej {formatXP(levelData.xpForNext - levelData.xpForCurrent)} XP pro další level</small>
            </div>
          )}
          
          {animationPhase === 'rewards' && (
            <Button 
              variant="success" 
              size="lg" 
              onClick={onClose}
              style={{ 
                background: `linear-gradient(90deg, ${levelData.color}, ${levelData.color}80)`,
                border: 'none'
              }}
            >
              Pokračovat 🎉
            </Button>
          )}
        </div>
      </Modal.Body>

      <style jsx>{`
        @keyframes levelUpPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        :global(.level-up-modal .modal-content) {
          background: transparent !important;
          border: none !important;
        }
        :global(.level-progress .progress-bar) {
          background: linear-gradient(90deg, ${levelData?.color || '#667eea'}, ${levelData?.color || '#764ba2'}80);
        }
        :global(.confetti-container) {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }
        :global(.confetti) {
          position: absolute;
          top: -20px;
          animation: confettiFall 3s linear forwards;
          opacity: 0.8;
        }
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(500px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </Modal>
  );
}

interface LevelUpToastProps {
  previousLevel: number;
  newLevel: number;
  onClick: () => void;
}

export function LevelUpToast({ previousLevel, newLevel, onClick }: LevelUpToastProps) {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  
  const levelData = calculateLevel(1000 * newLevel);
  
  if (!show) return null;
  
  return (
    <div 
      className="level-up-toast p-3"
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        background: `linear-gradient(145deg, ${levelData.color}40 0%, #1a1a2e 100%)`,
        border: `2px solid ${levelData.color}`,
        borderRadius: '16px',
        cursor: 'pointer',
        boxShadow: `0 0 30px ${levelData.color}60`,
        animation: 'levelUpSlide 0.5s ease'
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <div 
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: `linear-gradient(145deg, ${levelData.color}, ${levelData.color}80)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          {newLevel}
        </div>
        <div>
          <div className="text-white fw-bold">🎉 Level Up!</div>
          <small className="text-white-50">Nyní jsi {levelData.title}</small>
        </div>
      </div>

      <style jsx>{`
        @keyframes levelUpSlide {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
