'use client';

import React, { useEffect, useRef } from 'react';
import { useSmartCoach } from './SmartCoachContext';
import { SmartCoachChat } from './SmartCoachChat';

export function SmartCoach() {
  const { state, openChat, messages } = useSmartCoach();
  const initialized = useRef(false);

  // Proactive triggers
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Check if we should show proactive message
    const checkProactiveTriggers = () => {
      const lastInteraction = new Date(state.lastInteraction || 0);
      const hoursSinceLastInteraction = (Date.now() - lastInteraction.getTime()) / (1000 * 60 * 60);
      
      // Don't trigger if chat was recently closed
      if (hoursSinceLastInteraction < 4) return;

      // Check various conditions
      const missions = JSON.parse(localStorage.getItem('lifeMissions') || '[]');
      const activeMissions = missions.filter((m: any) => m.status === 'active');
      
      // Trigger: Stuck mission (inactive for 3+ days)
      const stuckMission = activeMissions.find((m: any) => {
        const lastActivity = new Date(m.lastActivity || m.createdAt);
        const daysInactive = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24);
        return daysInactive > 3;
      });

      if (stuckMission) {
        // Wait a bit after page load before showing
        setTimeout(() => {
          openChat('life-missions');
        }, 3000);
        return;
      }

      // Trigger: Daily check-in (morning)
      const hour = new Date().getHours();
      if (hour >= 8 && hour <= 10 && hoursSinceLastInteraction > 20) {
        setTimeout(() => {
          openChat();
        }, 5000);
      }
    };

    // Delay initial check
    const timer = setTimeout(checkProactiveTriggers, 2000);
    return () => clearTimeout(timer);
  }, [openChat, state.lastInteraction]);

  if (!state.isOpen && state.isMinimized) {
    return (
      <button
        onClick={() => openChat()}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
        }}
      >
        🤖
      </button>
    );
  }

  return (
    <>
      {/* Floating button when closed */}
      {!state.isOpen && (
        <button
          onClick={() => openChat()}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            cursor: 'pointer',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
          }}
        >
          🤖
          {messages.length > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#ff4757',
                color: 'white',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              !
            </span>
          )}
        </button>
      )}

      {/* Chat window when open */}
      {state.isOpen && <SmartCoachChat />}
    </>
  );
}
