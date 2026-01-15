'use client';

import React, { useState } from 'react';
import { Card, ProgressBar, Button, Badge, Modal } from 'react-bootstrap';
import { UserQuest, DailyQuestTemplate, QUEST_RARITY_CONFIG, QUEST_CATEGORY_ICONS } from '@/types/quests';
import { getQuestProgressPercentage, getQuestTimeRemaining, canClaimQuest, claimQuestReward } from '@/lib/gamification/quest-system';
import { formatXPGain } from '@/lib/gamification/xp-system';

interface DailyQuestsWidgetProps {
  quests: UserQuest[];
  templates: DailyQuestTemplate[];
  onClaimReward: (quest: UserQuest, template: DailyQuestTemplate) => void;
  onRefreshQuests?: () => void;
}

export function DailyQuestsWidget({ quests, templates, onClaimReward, onRefreshQuests }: DailyQuestsWidgetProps) {
  const [selectedQuest, setSelectedQuest] = useState<UserQuest | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  
  const activeQuests = quests.filter(q => q.status === 'active');
  const completedQuests = quests.filter(q => q.status === 'completed');
  const claimedQuests = quests.filter(q => q.status === 'claimed');
  
  const totalProgress = quests.length > 0 
    ? Math.round(((completedQuests.length + claimedQuests.length) / quests.length) * 100) 
    : 0;
  
  const getTemplate = (templateId: string): DailyQuestTemplate | undefined => {
    return templates.find(t => t.id === templateId);
  };

  const handleQuestClick = (quest: UserQuest) => {
    const template = getTemplate(quest.templateId);
    if (!template) return;
    
    setSelectedQuest(quest);
    if (canClaimQuest(quest)) {
      setShowClaimModal(true);
    }
  };

  const handleClaim = () => {
    if (selectedQuest) {
      const template = getTemplate(selectedQuest.templateId);
      if (template) {
        onClaimReward(selectedQuest, template);
      }
    }
    setShowClaimModal(false);
    setSelectedQuest(null);
  };

  const getTimeRemainingText = (quest: UserQuest): string => {
    const { hours, minutes, isExpired } = getQuestTimeRemaining(quest);
    if (isExpired) return '⌛ Vypršelo';
    return `⏰ ${hours}h ${minutes}m`;
  };

  return (
    <Card className="daily-quests-widget" style={{
      background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '16px'
    }}>
      <Card.Header className="d-flex justify-content-between align-items-center" style={{
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px 16px 0 0 !important',
        border: 'none'
      }}>
        <h5 className="mb-0 text-white">
          ⚔️ Denní Questy
        </h5>
        <Badge bg="light" text="dark">
          {completedQuests.length + claimedQuests.length}/{quests.length} dokončeno
        </Badge>
      </Card.Header>
      
      <Card.Body>
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            <small className="text-white-50">Denní pokrok</small>
            <small className="text-white">{totalProgress}%</small>
          </div>
          <ProgressBar 
            now={totalProgress} 
            style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.1)' }}
            className="quest-progress"
          />
        </div>

        {quests.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-white-50 mb-3">Žádné questy pro dnešek</p>
            {onRefreshQuests && (
              <Button variant="outline-primary" onClick={onRefreshQuests}>
                🔄 Obnovit questy
              </Button>
            )}
          </div>
        ) : (
          <div className="quest-list">
            {quests.map((quest) => {
              const template = getTemplate(quest.templateId);
              if (!template) return null;
              
              const rarityConfig = QUEST_RARITY_CONFIG[template.rarity];
              const progress = getQuestProgressPercentage(quest);
              const isClaimable = canClaimQuest(quest);
              const isExpired = quest.status !== 'claimed' && new Date() > quest.expiresAt;
              
              return (
                <div
                  key={quest.id}
                  className={`quest-item mb-2 p-3 rounded ${isClaimable ? 'claimable' : ''} ${isExpired ? 'expired' : ''}`}
                  style={{
                    background: `linear-gradient(145deg, ${rarityConfig.color}20 0%, transparent 100%)`,
                    border: `1px solid ${rarityConfig.color}40`,
                    cursor: isClaimable ? 'pointer' : 'default',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => isClaimable && handleQuestClick(quest)}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: '1.5rem' }}>{template.icon}</span>
                      <div>
                        <h6 className="mb-0 text-white">{template.title}</h6>
                        <small className="text-white-50">{template.description}</small>
                      </div>
                    </div>
                    <Badge style={{ backgroundColor: rarityConfig.color }}>
                      {template.rarity}
                    </Badge>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-white-50">
                      {QUEST_CATEGORY_ICONS[template.category]} {template.category}
                    </small>
                    <small className={isExpired ? 'text-danger' : 'text-white-50'}>
                      {getTimeRemainingText(quest)}
                    </small>
                  </div>
                  
                  <ProgressBar 
                    now={progress} 
                    style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)' }}
                    className="quest-item-progress"
                  />
                  
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <small className="text-white-50">
                      {quest.currentValue}/{quest.targetValue}
                    </small>
                    <div className="d-flex gap-2">
                      <Badge bg="warning" text="dark">
                        ⭐ {formatXPGain(template.xpReward)}
                      </Badge>
                      {template.goldReward > 0 && (
                        <Badge bg="secondary">
                          🪙 {template.goldReward}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {quest.status === 'claimed' && (
                    <div className="text-center mt-2">
                      <Badge bg="success">✅ Odměna vybrána</Badge>
                    </div>
                  )}
                  
                  {isClaimable && (
                    <div className="text-center mt-2">
                      <Button size="sm" variant="success" onClick={(e) => {
                        e.stopPropagation();
                        handleQuestClick(quest);
                      }}>
                        🎁 Vybrat odměnu
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card.Body>

      <Modal show={showClaimModal} onHide={() => setShowClaimModal(false)} centered>
        <Modal.Header closeButton style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}>
          <Modal.Title className="text-white">🎉 Quest dokončen!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a2e' }}>
          {selectedQuest && (() => {
            const template = getTemplate(selectedQuest.templateId);
            if (!template) return null;
            return (
              <div className="text-center">
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{template.icon}</div>
                <h4 className="text-white mb-3">{template.title}</h4>
                <p className="text-white-50 mb-4">{template.description}</p>
                
                <div className="d-flex justify-content-center gap-3 mb-4">
                  <div className="p-3 rounded" style={{ background: 'rgba(255,193,7,0.2)', border: '1px solid #ffc107' }}>
                    <div style={{ fontSize: '2rem' }}>⭐</div>
                    <div className="text-warning fw-bold">+{template.xpReward} XP</div>
                  </div>
                  {template.goldReward > 0 && (
                    <div className="p-3 rounded" style={{ background: 'rgba(255,193,7,0.2)', border: '1px solid #ffc107' }}>
                      <div style={{ fontSize: '2rem' }}>🪙</div>
                      <div className="text-warning fw-bold">+{template.goldReward} Zlato</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </Modal.Body>
        <Modal.Footer style={{ background: '#1a1a2e', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button variant="secondary" onClick={() => setShowClaimModal(false)}>
            Později
          </Button>
          <Button variant="success" onClick={handleClaim}>
            🎁 Vybrat odměnu
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .quest-item:hover {
          transform: translateX(5px);
          box-shadow: 0 0 20px ${QUEST_RARITY_CONFIG['common']?.glow || 'rgba(158,158,158,0.3)'} !important;
        }
        .quest-item.claimable {
          animation: pulse 2s infinite;
          border-color: #4caf50 !important;
        }
        .quest-item.expired {
          opacity: 0.6;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(76, 175, 80, 0.3); }
          50% { box-shadow: 0 0 20px rgba(76, 175, 80, 0.5); }
        }
        :global(.quest-progress .progress-bar) {
          background: linear-gradient(90deg, #667eea, #764ba2);
        }
        :global(.quest-item-progress .progress-bar) {
          background: linear-gradient(90deg, #667eea, #764ba2);
        }
      `}</style>
    </Card>
  );
}
