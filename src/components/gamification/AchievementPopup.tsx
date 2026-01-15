'use client';

import React, { useState, useEffect } from 'react';
import { Toast, Badge } from 'react-bootstrap';
import { Achievement, getRarityColor } from '@/lib/gamification/achievements';

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
  delay?: number;
}

export function AchievementPopup({ achievement, onClose, delay = 300 }: AchievementPopupProps) {
  const [show, setShow] = useState(true);
  const rarityColor = getRarityColor(achievement.rarity);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 500);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Toast 
      show={show} 
      onClose={() => {
        setShow(false);
        setTimeout(onClose, 300);
      }}
      className="achievement-popup"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        minWidth: '350px',
        background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
        border: `3px solid ${rarityColor}`,
        borderRadius: '16px',
        boxShadow: `0 0 40px ${rarityColor}60`,
        overflow: 'hidden'
      }}
    >
      <Toast.Header 
        style={{ 
          background: `linear-gradient(90deg, ${rarityColor}, ${rarityColor}80)`,
          borderBottom: 'none',
          color: 'white'
        }}
      >
        <span className="me-2" style={{ fontSize: '1.5rem' }}>🏆</span>
        <strong className="me-auto text-white">Achievement odemčen!</strong>
      </Toast.Header>
      <Toast.Body style={{ padding: '1.5rem', textAlign: 'center' }}>
        <div 
          className="achievement-icon mb-3"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: `linear-gradient(145deg, ${rarityColor}, ${rarityColor}80)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            fontSize: '2.5rem',
            boxShadow: `0 0 30px ${rarityColor}60`,
            animation: 'achievementPop 0.5s ease'
          }}
        >
          {achievement.icon}
        </div>
        
        <h4 className="text-white mb-2" style={{ color: rarityColor }}>{achievement.title}</h4>
        <p className="text-white-50 mb-3">{achievement.description}</p>
        
        <Badge 
          style={{ 
            backgroundColor: rarityColor,
            fontSize: '0.9rem',
            padding: '0.5rem 1rem'
          }}
        >
          {achievement.rarity}
        </Badge>
        
        <div className="mt-3 p-2 rounded" style={{ background: 'rgba(255,193,7,0.2)' }}>
          <span className="text-warning fw-bold">+{achievement.xpReward} XP</span>
        </div>
      </Toast.Body>

      <style jsx>{`
        @keyframes achievementPop {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        :global(.achievement-popup) {
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </Toast>
  );
}

interface NotificationQueueItem {
  id: string;
  type: 'achievement' | 'levelup' | 'quest' | 'streak';
  data: Achievement | { level: number; title: string; xpReward: number };
  timestamp: Date;
}

export function useNotificationQueue() {
  const [queue, setQueue] = useState<NotificationQueueItem[]>([]);
  const [current, setCurrent] = useState<NotificationQueueItem | null>(null);
  
  const addNotification = (type: NotificationQueueItem['type'], data: NotificationQueueItem['data']) => {
    const item: NotificationQueueItem = {
      id: Date.now().toString(),
      type,
      data,
      timestamp: new Date()
    };
    setQueue(prev => [...prev, item]);
  };
  
  const dismissCurrent = () => {
    setCurrent(null);
  };
  
  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue(prev => prev.slice(1));
    }
  }, [queue, current]);
  
  return {
    currentNotification: current,
    addNotification,
    dismissCurrent
  };
}
