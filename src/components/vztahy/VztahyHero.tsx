'use client';

import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import { FiArrowLeft, FiHeart, FiUsers, FiStar, FiAward } from 'react-icons/fi';
import { VztahType } from '@/types/vztahy';

interface VztahyHeroProps {
  type: VztahType;
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  stats?: { label: string; value: string | number; icon: React.ReactNode }[];
}

const VztahyHero: React.FC<VztahyHeroProps> = ({
  type,
  title,
  subtitle,
  icon,
  gradient,
  stats = []
}) => {
  const getIcon = () => {
    switch (type) {
      case 'rodina': return <FiUsers />;
      case 'laska': return <FiHeart />;
      case 'pratele': return <FiStar />;
      case 'pritelkyne': return <FiAward />;
      default: return <FiHeart />;
    }
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <Link 
          href="/" 
          style={{ 
            color: 'rgba(255,255,255,0.5)', 
            textDecoration: 'none', 
            fontSize: '0.85rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <FiArrowLeft size={14} /> Zpět na dashboard
        </Link>
      </div>

      <Card
        className="border-0 mb-4"
        style={{
          background: gradient,
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          overflow: 'hidden'
        }}
      >
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255,255,255,0.2)',
                    fontSize: '1.8rem'
                  }}
                >
                  {icon}
                </div>
                <div>
                  <h2 style={{ color: '#fff', margin: 0, fontSize: '2rem', fontWeight: 700 }}>
                    {title}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '1rem' }}>
                    {subtitle}
                  </p>
                </div>
              </div>
              
              <div className="d-flex gap-3 flex-wrap">
                {stats.map((stat, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span style={{ color: '#fff', fontSize: '1.1rem' }}>{stat.icon}</span>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem' }}>
                        {stat.label}
                      </div>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                        {stat.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <div style={{ 
                color: 'rgba(255,255,255,0.3)', 
                fontSize: '8rem',
                lineHeight: 1,
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0.3
              }}>
                {icon}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default VztahyHero;
