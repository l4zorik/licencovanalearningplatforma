'use client';

import { useState, useEffect } from 'react';
import { Card, ProgressBar, Badge, Button, Form, Row, Col } from 'react-bootstrap';
import { Project, TimerSettings } from '@/types/projects';
import { calculateTimeRemaining, getUrgencyLevel, getUrgencyBadgeVariant, formatTimeRemaining, TimeRemaining } from '@/lib/timers/time-utils';

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

  if (!settings?.enabled) return null;

  if (isEditing) {
    return (
      <Card style={{ background: 'rgba(0,0,0,0.3)' }}>
        <Card.Body>
          <h6 style={{ color: '#fff' }}>⏱️ Nastavit Deadline</h6>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#ccc' }}>Datum a čas dokončení</Form.Label>
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
      <div className="d-flex align-items-center gap-2 mb-2">
        <Button variant="outline-light" size="sm" onClick={() => {
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

  return (
    <Card style={{ background: 'rgba(0,0,0,0.3)' }}>
      <Card.Body className="py-2 px-3">
        <Row className="align-items-center">
          <Col xs={12} md={8}>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span style={{ color: '#fff', fontSize: '0.9rem' }}>
                ⏱️ {time.isOverdue 
                  ? `🔴 Zpoždění: ${Math.abs(time.days)}d ${Math.abs(time.hours)}h`
                  : `Zbývá: ${time.days}d ${time.hours}h ${time.minutes}m`
                }
              </span>
              <Badge bg={urgencyVariant}>
                {time.percentage.toFixed(0)}% zbývá
              </Badge>
              {urgencyLevel === 'critical' && time.percentage > 0 && (
                <Badge bg="danger" style={{ animation: 'pulse 1s infinite' }}>
                  🚨 Kritické!
                </Badge>
              )}
            </div>
            <ProgressBar
              now={time.percentage}
              variant={urgencyVariant}
              style={{ height: '8px', marginTop: '8px' }}
              className={urgencyLevel === 'critical' ? 'progress-bar-animated' : ''}
            />
          </Col>
          <Col xs={12} md={4} className="text-end mt-2 mt-md-0">
            <div className="d-flex gap-1 justify-content-md-end">
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
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
