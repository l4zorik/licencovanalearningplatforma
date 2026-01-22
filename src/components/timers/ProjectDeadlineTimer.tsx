'use client';

import { useState, useEffect } from 'react';
import { Card, ProgressBar, Badge, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { Project, TimerSettings } from '@/types/projects';
import { calculateTimeRemaining, getUrgencyLevel, getUrgencyBadgeVariant, TimeRemaining } from '@/lib/timers/time-utils';

interface ProjectDeadlineTimerProps {
  project: Project;
  onUpdate: (project: Project) => void;
}

export default function ProjectDeadlineTimer({ project, onUpdate }: ProjectDeadlineTimerProps) {
  const [time, setTime] = useState<TimeRemaining | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempDeadline, setTempDeadline] = useState('');
  const settings = project.timerSettings;

  useEffect(() => {
    if (!project.deadline || !settings?.enabled) {
      setTime(null);
      return;
    }

    const updateTime = () => {
      setTime(calculateTimeRemaining(new Date(project.deadline!), new Date(project.startDate)));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [project.deadline, project.startDate, settings?.enabled]);

  const handleSetDeadline = () => {
    if (!tempDeadline) return;
    onUpdate({ ...project, deadline: new Date(tempDeadline) });
    setIsEditing(false);
  };

  const handleRemoveDeadline = () => {
    const updated = { ...project };
    delete updated.deadline;
    onUpdate(updated);
  };

  const handleQuickDeadline = (days: number) => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + days);
    onUpdate({ ...project, deadline });
    setIsEditing(false);
  };

  if (!settings?.enabled) return null;

  if (isEditing) {
    return (
      <Card style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${project.color}60` }}>
        <Card.Body>
          <h6 style={{ color: '#fff' }}>⏱️ Nastavit Deadline</h6>
          <Row className="g-2 mb-3">
            <Col xs={6} md={3}>
              <Button variant="outline-success" size="sm" className="w-100" onClick={() => handleQuickDeadline(7)}>
                1 týden
              </Button>
            </Col>
            <Col xs={6} md={3}>
              <Button variant="outline-success" size="sm" className="w-100" onClick={() => handleQuickDeadline(14)}>
                2 týdny
              </Button>
            </Col>
            <Col xs={6} md={3}>
              <Button variant="outline-success" size="sm" className="w-100" onClick={() => handleQuickDeadline(30)}>
                1 měsíc
              </Button>
            </Col>
            <Col xs={6} md={3}>
              <Button variant="outline-success" size="sm" className="w-100" onClick={() => handleQuickDeadline(90)}>
                3 měsíce
              </Button>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#ccc' }}>Vlastní datum a čas</Form.Label>
            <Form.Control
              type="datetime-local"
              value={tempDeadline}
              onChange={(e) => setTempDeadline(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
            />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button variant="primary" size="sm" onClick={handleSetDeadline}>💾 Uložit</Button>
            <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>❌ Zrušit</Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (!time) {
    return (
      <Card style={{ background: 'rgba(0,0,0,0.3)', border: `1px dashed ${project.color}40` }}>
        <Card.Body className="text-center py-3">
          <Button variant="outline-light" size="sm" onClick={() => {
            const now = new Date();
            now.setDate(now.getDate() + 30);
            setTempDeadline(now.toISOString().slice(0, 16));
            setIsEditing(true);
          }}>
            ➕ Přidat Deadline
          </Button>
        </Card.Body>
      </Card>
    );
  }

  const urgencyLevel = getUrgencyLevel(time.percentage, settings.urgencyThresholds);
  const urgencyVariant = getUrgencyBadgeVariant(urgencyLevel);

  const urgencyMessages: Record<string, string> = {
    normal: 'Času dost',
    caution: 'Už toho moc nezbývá',
    warning: 'Zbývá jen čtvrtina!',
    critical: '🚨 KRITICKÉ!',
  };

  const getCountdownColor = () => {
    if (urgencyLevel === 'critical') return '#ff4444';
    if (urgencyLevel === 'warning') return '#ff8800';
    if (urgencyLevel === 'caution') return '#ffbb33';
    return '#4CAF50';
  };

  return (
    <Card style={{ 
      background: `linear-gradient(135deg, ${getCountdownColor()}30 0%, ${getCountdownColor()}10 100%)`,
      border: `2px solid ${getCountdownColor()}`
    }}>
      <Card.Body className="py-2 px-3">
        <Row className="align-items-center">
          <Col xs={12} md={7}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' }}>
                ⏱️ {time.isOverdue 
                  ? `🔴 ZPOŽDĚNÍ!`
                  : `ZBÝVÁ`
                }
              </span>
              {!time.isOverdue && (
                <>
                  <span style={{ 
                    color: getCountdownColor(), 
                    fontSize: '1.2rem', 
                    fontFamily: 'monospace',
                    fontWeight: 'bold'
                  }}>
                    {String(time.days).padStart(2, '0')}:{String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
                  </span>
                </>
              )}
            </div>
            {time.isOverdue && (
              <Alert variant="danger" className="py-1 px-2 mb-1" style={{ fontSize: '0.8rem' }}>
                Deadline uplynul před {Math.abs(time.days)}d {Math.abs(time.hours)}h!
              </Alert>
            )}
          </Col>
          
          <Col xs={12} md={5}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <ProgressBar
                now={Math.min(100, time.percentage)}
                variant={urgencyVariant}
                style={{ flex: 1, height: '12px' }}
                animated={urgencyLevel === 'critical'}
              />
              <Badge bg={urgencyVariant} style={{ fontSize: '0.9rem' }}>
                {time.percentage.toFixed(0)}%
              </Badge>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span style={{ color: '#aaa', fontSize: '0.75rem' }}>
                {urgencyMessages[urgencyLevel]}
              </span>
              <div className="d-flex gap-1">
                <Button 
                  variant="outline-light" 
                  size="sm"
                  onClick={() => {
                    const now = new Date();
                    now.setDate(now.getDate() + 7);
                    setTempDeadline(now.toISOString().slice(0, 16));
                    setIsEditing(true);
                  }}
                  title="Změnit deadline"
                >
                  📅
                </Button>
                <Button 
                  variant="outline-light" 
                  size="sm"
                  onClick={handleRemoveDeadline}
                  title="Odebrat deadline"
                >
                  🗑️
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {!time.isOverdue && settings.urgencyThresholds.map((threshold, idx) => {
          const prevThreshold = idx > 0 ? settings.urgencyThresholds[idx - 1] : 100;
          const showThreshold = time.percentage <= prevThreshold && time.percentage > threshold;
          
          if (!showThreshold) return null;
          
          const labels: Record<number, string> = {
            75: '⚠️ 75% uběhlo - zbývá 25%',
            50: '🔶 50% uběhlo - zbývá polovina!',
            25: '🚨 75% uběhlo - poslední čtvrtina!',
          };
          
          return (
            <Alert 
              key={threshold} 
              variant={threshold <= 25 ? 'danger' : threshold <= 50 ? 'warning' : 'info'}
              className="py-1 px-2 mt-1"
              style={{ fontSize: '0.8rem' }}
            >
              {labels[threshold] || `${threshold}% uběhlo`}
            </Alert>
          );
        })}
      </Card.Body>
    </Card>
  );
}
