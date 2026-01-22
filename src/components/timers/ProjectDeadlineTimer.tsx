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
      <Card style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid ${project.color}80` }} className="mt-2">
        <Card.Body className="py-2 px-3">
          <Row className="g-1 mb-2">
            <Col xs={3}><Button variant="outline-success" size="sm" className="w-100" onClick={() => handleQuickDeadline(7)}>7 dní</Button></Col>
            <Col xs={3}><Button variant="outline-success" size="sm" className="w-100" onClick={() => handleQuickDeadline(14)}>14 dní</Button></Col>
            <Col xs={3}><Button variant="outline-success" size="sm" className="w-100" onClick={() => handleQuickDeadline(30)}>30 dní</Button></Col>
            <Col xs={3}><Button variant="outline-success" size="sm" className="w-100" onClick={() => handleQuickDeadline(90)}>90 dní</Button></Col>
          </Row>
          <Row className="g-2">
            <Col xs={8}>
              <Form.Control
                type="datetime-local"
                value={tempDeadline}
                onChange={(e) => setTempDeadline(e.target.value)}
                size="sm"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
              />
            </Col>
            <Col xs={4}>
              <div className="d-flex gap-1">
                <Button variant="primary" size="sm" onClick={handleSetDeadline}>💾</Button>
                <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>❌</Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

  if (!time) {
    return (
      <div className="mt-2">
        <Button variant="outline-secondary" size="sm" onClick={() => {
          const now = new Date();
          now.setDate(now.getDate() + 30);
          setTempDeadline(now.toISOString().slice(0, 16));
          setIsEditing(true);
        }}>
          ➕ Přidat Deadline
        </Button>
      </div>
    );
  }

  const urgencyLevel = getUrgencyLevel(time.percentage, settings.urgencyThresholds);
  const urgencyVariant = getUrgencyBadgeVariant(urgencyLevel);

  const getCountdownColor = () => {
    if (urgencyLevel === 'critical') return '#ff4444';
    if (urgencyLevel === 'warning') return '#ff8800';
    if (urgencyLevel === 'caution') return '#ffbb33';
    return '#4CAF50';
  };

  return (
    <Card style={{ 
      background: `linear-gradient(90deg, ${getCountdownColor()}25 0%, transparent 100%)`,
      border: `1px solid ${getCountdownColor()}60`,
      borderLeft: `4px solid ${getCountdownColor()}`
    }} className="mt-2">
      <Card.Body className="py-2 px-3">
        <Row className="align-items-center">
          <Col xs={7} md={8}>
            <div className="d-flex align-items-center gap-2">
              <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 'bold' }}>
                ⏱️ {time.isOverdue ? '🔴 ZPOŽDĚNÍ:' : 'ZBÝVÁ:'}
              </span>
              {!time.isOverdue && (
                <span style={{ 
                  color: getCountdownColor(), 
                  fontSize: '0.9rem', 
                  fontFamily: 'monospace',
                  fontWeight: 'bold'
                }}>
                  {String(time.days).padStart(2, '0')}:{String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
                </span>
              )}
              {time.isOverdue && (
                <span style={{ color: '#ff4444', fontWeight: 'bold' }}>
                  {Math.abs(time.days)}d {Math.abs(time.hours)}h
                </span>
              )}
            </div>
          </Col>
          <Col xs={5} md={4}>
            <div className="d-flex align-items-center gap-1">
              <ProgressBar
                now={Math.min(100, time.percentage)}
                variant={urgencyVariant}
                style={{ flex: 1, height: '8px' }}
                animated={urgencyLevel === 'critical'}
              />
              <Badge bg={urgencyVariant} style={{ fontSize: '0.75rem' }}>
                {time.percentage.toFixed(0)}%
              </Badge>
              <Button 
                variant="link" 
                size="sm"
                onClick={() => setIsEditing(true)}
                style={{ color: '#888', textDecoration: 'none', padding: '0 4px' }}
              >
                📅
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
