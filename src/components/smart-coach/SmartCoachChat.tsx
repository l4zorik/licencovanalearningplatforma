'use client';

import React, { useRef, useEffect } from 'react';
import { useSmartCoach } from './SmartCoachContext';
import { CoachMessage } from './types';

export function SmartCoachChat() {
  const { state, closeChat, minimizeChat, handleOptionClick, startConversation } = useSmartCoach();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  // Start conversation on first open
  useEffect(() => {
    if (!initialized.current && state.messages.length === 0) {
      initialized.current = true;
      startConversation('greeting');
    }
  }, [startConversation, state.messages.length]);

  const handleOption = (option: any) => {
    handleOptionClick(option);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '380px',
        maxWidth: 'calc(100vw - 40px)',
        height: state.isMinimized ? '60px' : '600px',
        maxHeight: 'calc(100vh - 40px)',
        background: '#1a1a2e',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10000,
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'height 0.3s ease',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={minimizeChat}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🤖</span>
          <div>
            <div style={{ color: 'white', fontWeight: 600, fontSize: '16px' }}>
              Tvůj kouč
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
              Online
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeChat();
            }}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
              fontSize: '18px',
            }}
          >
            {state.isMinimized ? '▲' : '▼'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeChat();
            }}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
              fontSize: '18px',
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      {!state.isMinimized && (
        <>
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {state.messages.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.5)',
                  padding: '40px 20px',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>👋</div>
                <div style={{ fontSize: '16px', marginBottom: '8px' }}>
                  Ahoj! Jsem tvůj osobní kouč.
                </div>
                <div style={{ fontSize: '14px' }}>
                  Pomůžu ti s misemi, učením i motivací!
                </div>
              </div>
            )}

            {state.messages.map((message: CoachMessage) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                  gap: '8px',
                }}
              >
                {message.type === 'bot' && (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      flexShrink: 0,
                    }}
                  >
                    🤖
                  </div>
                )}
                <div
                  style={{
                    maxWidth: '70%',
                    padding: '12px 16px',
                    borderRadius: message.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: message.type === 'user' 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    wordBreak: 'break-word',
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Options */}
          {state.messages.length > 0 && (
            <div
              style={{
                padding: '16px 20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {state.messages[state.messages.length - 1]?.options?.map((option: any) => (
                <button
                  key={option.id}
                  onClick={() => handleOption(option)}
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(102, 126, 234, 0.2)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(102, 126, 234, 0.2)';
                  }}
                >
                  <span>{option.emoji}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
