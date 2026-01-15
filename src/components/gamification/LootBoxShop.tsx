'use client';

import React, { useState } from 'react';
import { Card, Button, Badge, Modal, Col, Row, ProgressBar } from 'react-bootstrap';
import { LootBox, LOOT_BOXES, REWARDS, RARITY_COLORS, RARITY_GLOW, Reward, getRandomRewardFromBox, openLootBox, RewardRarity } from '@/lib/gamification/rewards';

interface LootBoxShopProps {
  userGold: number;
  userGems: number;
  onPurchase: (box: LootBox) => void;
}

function getBoxRarity(boxType: string): RewardRarity {
  switch (boxType) {
    case 'basic': return 'common';
    case 'premium': return 'rare';
    case 'epic': return 'epic';
    case 'legendary': return 'legendary';
    default: return 'common';
  }
}

export function LootBoxShop({ userGold, userGems, onPurchase }: LootBoxShopProps) {
  const [selectedBox, setSelectedBox] = useState<LootBox | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-white mb-0">🛒 Loot Bedny</h4>
        <div className="d-flex gap-3">
          <Badge bg="warning" text="dark" style={{ fontSize: '1rem' }}>
            🪙 {userGold}
          </Badge>
          <Badge bg="info" style={{ fontSize: '1rem' }}>
            💎 {userGems}
          </Badge>
        </div>
      </div>

      <Row>
        {LOOT_BOXES.map((box) => {
          const canAfford = box.currency === 'gold' ? userGold >= box.price : userGems >= box.price;
          const boxRarity = getBoxRarity(box.type);
          const boxRarityGlow = RARITY_GLOW[boxRarity];
          const boxRarityColor = RARITY_COLORS[boxRarity];
          
          return (
            <Col key={box.id} md={6} lg={3} className="mb-4">
              <Card 
                className="loot-box-card h-100"
                style={{
                  background: `linear-gradient(145deg, ${boxRarityGlow}40 0%, #1a1a2e 100%)`,
                  border: `2px solid ${boxRarityColor}`,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  setSelectedBox(box);
                  setShowPreview(true);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = `0 10px 40px ${boxRarityGlow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Card.Body className="text-center">
                  <div 
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: `linear-gradient(145deg, ${boxRarityColor}, ${boxRarityColor}80)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem',
                      fontSize: '2.5rem',
                      boxShadow: `0 0 30px ${boxRarityGlow}`
                    }}
                  >
                    {box.icon}
                  </div>
                  
                  <h5 className="text-white mb-2">{box.name}</h5>
                  <p className="text-white-50 small mb-3">{box.description}</p>
                  
                  <div className="mb-3">
                    {Object.entries(box.dropRates).map(([rarity, rate]) => (
                      rate > 0 && (
                        <Badge 
                          key={rarity}
                          className="me-1 mb-1"
                          style={{ 
                            backgroundColor: `${RARITY_COLORS[rarity as RewardRarity]}40`,
                            color: RARITY_COLORS[rarity as RewardRarity],
                            border: `1px solid ${RARITY_COLORS[rarity as RewardRarity]}`
                          }}
                        >
                          {rarity}: {Math.round(rate * 100)}%
                        </Badge>
                      )
                    ))}
                  </div>
                  
                  <Button 
                    variant={canAfford ? 'success' : 'secondary'}
                    disabled={!canAfford}
                    className="w-100"
                  >
                    {box.currency === 'gold' ? '🪙' : '💎'} {box.price}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Modal show={showPreview} onHide={() => setShowPreview(false)} centered size="lg">
        <Modal.Header closeButton style={{ 
          background: `linear-gradient(90deg, ${selectedBox ? RARITY_COLORS[getBoxRarity(selectedBox.type)] : '#667eea'}, ${selectedBox ? RARITY_COLORS[getBoxRarity(selectedBox.type)] + '80' : '#764ba280'})` 
        }}>
          <Modal.Title className="text-white">
            {selectedBox?.icon} {selectedBox?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a2e' }}>
          {selectedBox && (
            <div>
              <p className="text-white text-center mb-4">{selectedBox.description}</p>
              
              <h6 className="text-white mb-3">📊 Šance na rarity</h6>
              <div className="mb-4">
                {Object.entries(selectedBox.dropRates).map(([rarity, rate]) => (
                  <div key={rarity} className="mb-2">
                    <div className="d-flex justify-content-between mb-1">
                      <Badge 
                        style={{ 
                          backgroundColor: RARITY_COLORS[rarity as RewardRarity],
                          color: 'white'
                        }}
                      >
                        {rarity}
                      </Badge>
                      <small className="text-white">{Math.round(rate * 100)}%</small>
                    </div>
                    <ProgressBar 
                      now={rate * 100} 
                      style={{ height: '8px' }}
                      className={`rarity-progress rarity-${rarity}`}
                    />
                  </div>
                ))}
              </div>
              
              <h6 className="text-white mb-3">🎁 Možné odměny</h6>
              <Row>
                {selectedBox.contents.slice(0, 6).map((content) => {
                  const reward = REWARDS[content.rewardId];
                  return (
                    <Col key={content.rewardId} xs={6} md={4} className="mb-2">
                      <div 
                        className="p-2 rounded text-center"
                        style={{
                          background: `${RARITY_COLORS[content.rarity]}20`,
                          border: `1px solid ${RARITY_COLORS[content.rarity]}40`
                        }}
                      >
                        <div style={{ fontSize: '1.5rem' }}>{reward.icon}</div>
                        <small className="text-white d-block">{reward.name}</small>
                        <Badge 
                          style={{ 
                            fontSize: '0.6rem',
                            backgroundColor: RARITY_COLORS[content.rarity]
                          }}
                        >
                          {content.rarity}
                        </Badge>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ background: '#1a1a2e', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button variant="secondary" onClick={() => setShowPreview(false)}>
            Zrušit
          </Button>
          {selectedBox && (
            <Button 
              variant="success"
              onClick={() => {
                onPurchase(selectedBox);
                setShowPreview(false);
              }}
            >
              {selectedBox.currency === 'gold' ? '🪙' : '💎'} {selectedBox.price} - Otevřít
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

interface LootBoxOpeningProps {
  box: LootBox;
  reward: { reward: Reward; quantity: number };
  onClose: () => void;
}

export function LootBoxOpening({ box, reward, onClose }: LootBoxOpeningProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  
  setTimeout(() => setIsAnimating(false), 2000);
  
  const rarityColor = RARITY_COLORS[reward.reward.rarity];
  
  return (
    <Modal show={true} onHide={onClose} centered backdrop="static">
      <Modal.Body 
        style={{ 
          background: isAnimating 
            ? 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)'
            : `linear-gradient(145deg, ${rarityColor}40 0%, #1a1a2e 100%)`,
          border: `4px solid ${rarityColor}`,
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center'
        }}
      >
        {isAnimating ? (
          <div className="opening-animation">
            <div 
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: `linear-gradient(145deg, ${rarityColor}, ${rarityColor}80)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '4rem',
                animation: 'pulse 0.5s infinite'
              }}
            >
              {box.icon}
            </div>
            <h4 className="text-white mt-4">Otevírání bedny...</h4>
          </div>
        ) : (
          <div className="reward-reveal">
            <h5 className="text-white mb-3">{rarityColor === '#f44336' ? '🎉 LEGENDÁRNÍ!' : rarityColor === '#ff9800' ? '🌟 EPICKÉ!' : 'Gratuluji!'}</h5>
            <div 
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: `linear-gradient(145deg, ${rarityColor}, ${rarityColor}80)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '4rem',
                boxShadow: `0 0 50px ${rarityColor}80`,
                animation: 'bounceIn 0.5s ease'
              }}
            >
              {reward.reward.icon}
            </div>
            <h4 className="text-white">{reward.reward.name}</h4>
            <p className="text-white-50">{reward.reward.description}</p>
            <Badge 
              style={{ 
                backgroundColor: rarityColor,
                fontSize: '1rem',
                padding: '0.5rem 1rem'
              }}
            >
              {reward.reward.rarity}
            </Badge>
            {reward.quantity > 1 && (
              <div className="mt-3">
                <Badge bg="warning" text="dark" style={{ fontSize: '1.2rem' }}>
                  ×{reward.quantity}
                </Badge>
              </div>
            )}
            <Button variant="primary" className="mt-4" onClick={onClose}>
              Pokračovat
            </Button>
          </div>
        )}
      </Modal.Body>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        :global(.rarity-common .progress-bar) { background: ${RARITY_COLORS.common}; }
        :global(.rarity-rare .progress-bar) { background: ${RARITY_COLORS.rare}; }
        :global(.rarity-epic .progress-bar) { background: ${RARITY_COLORS.epic}; }
        :global(.rarity-legendary .progress-bar) { background: ${RARITY_COLORS.legendary}; }
      `}</style>
    </Modal>
  );
}
