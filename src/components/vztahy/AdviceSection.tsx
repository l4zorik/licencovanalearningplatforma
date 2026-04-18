'use client';

import React, { useState } from 'react';
import { Card, Row, Col, Accordion, Badge, Button } from 'react-bootstrap';
import { FiChevronDown, FiChevronUp, FiBook, FiZap, FiTarget } from 'react-icons/fi';
import { RelationshipAdvice, RELATIONSHIP_ADVICE } from '@/types/vztahy';

interface AdviceSectionProps {
  filterCategory?: 'all' | 'communication' | 'trust' | 'conflict' | 'growth' | 'intimacy';
  title?: string;
}

const categoryColors: Record<string, string> = {
  communication: '#2196F3',
  trust: '#4CAF50',
  conflict: '#FF9800',
  growth: '#9C27B0',
  intimacy: '#E91E63'
};

const categoryLabels: Record<string, string> = {
  communication: 'Komunikace',
  trust: 'Důvěra',
  conflict: 'Řešení konfliktů',
  growth: 'Růst vztahu',
  intimita: 'Intimita'
};

const AdviceSection: React.FC<AdviceSectionProps> = ({ filterCategory = 'all', title = '💡 Průvodce vztahem' }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredAdvice = filterCategory === 'all' 
    ? RELATIONSHIP_ADVICE 
    : RELATIONSHIP_ADVICE.filter(a => a.category === filterCategory);

  return (
    <Card className="border-0 mb-4" style={{ 
      background: 'rgba(255,255,255,0.03)', 
      borderRadius: '20px',
      overflow: 'hidden'
    }}>
      <Card.Body className="p-0">
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,152,0,0.2) 0%, rgba(233,30,99,0.2) 100%)',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div className="d-flex align-items-center gap-2">
            <FiZap size={20} style={{ color: '#FF9800' }} />
            <h5 style={{ color: '#fff', margin: 0, fontWeight: 600 }}>{title}</h5>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', margin: '8px 0 0 0', fontSize: '0.9rem' }}>
            Praktické rady a tipy pro budování zdravého vztahu
          </p>
        </div>

        <div style={{ padding: '16px' }}>
          <Accordion>
            {filteredAdvice.map((advice, idx) => (
              <Accordion.Item 
                key={advice.id}
                eventKey={advice.id}
                style={{ 
                  background: 'rgba(255,255,255,0.02)',
                  border: 'none',
                  marginBottom: '8px',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
              >
                <Accordion.Header>
                  <div className="d-flex align-items-center gap-3 w-100 pe-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: '40px',
                        height: '40px',
                        background: `${categoryColors[advice.category]}20`,
                        color: categoryColors[advice.category],
                        fontSize: '1.2rem',
                        flexShrink: 0
                      }}
                    >
                      {advice.icon}
                    </div>
                    <div className="flex-grow-1">
                      <div style={{ color: '#fff', fontWeight: 500 }}>{advice.title}</div>
                      <Badge 
                        bg="none"
                        style={{ 
                          background: `${categoryColors[advice.category]}30`,
                          color: categoryColors[advice.category],
                          fontSize: '0.7rem',
                          padding: '2px 8px'
                        }}
                      >
                        {categoryLabels[advice.category] || advice.category}
                      </Badge>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body style={{ padding: '0 20px 16px 76px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {advice.content}
                  </p>
                  
                  <div style={{ 
                    background: 'rgba(255,255,255,0.03)', 
                    padding: '12px', 
                    borderRadius: '10px',
                    marginTop: '12px'
                  }}>
                    <div style={{ color: '#4CAF50', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>
                      ✓ Tipy:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                      {advice.tips.map((tip, tipIdx) => (
                        <li key={tipIdx} style={{ marginBottom: '4px' }}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdviceSection;
