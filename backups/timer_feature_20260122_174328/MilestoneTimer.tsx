'use client';

import { useState, useEffect } from 'react';
import { Button, ProgressBar, Badge, Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ProjectMilestone, TimerSettings } from '@/types/projects';
import { formatHours, calculateMilestoneProgress, getUrgencyLevel, getUrgencyBadgeVariant } from '@/lib/timers/time-utils';

interface MilestoneTimerProps {
  milestone: ProjectMilestone;
  settings: TimerSettings;
  onUpdate: (milestone: ProjectMilestone) => void;
  isEditing: boolean;
}

export default function MilestoneTimer({ milestone, settings, onUpdate, isEditing }: MilestoneTimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [editHours, setEditHours] = useState(milestone.targetHours?.toString() || settings.defaultMilestoneHours.toString());

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (milestone.timerActive && !milestone.isCompleted) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [milestone.timerActive, milestone.isCompleted]);

  useEffect(() => {
    setElapsedTime(milestone.timeSpent);
    setEditHours(milestone.targetHours?.toString() || settings.defaultMilestoneHours.toString());
  }, [milestone, settings.defaultMilestoneHours]);

  const handleStartTimer = () => {
    onUpdate({
      ...milestone,
      timerActive: true,
      timerStartedAt: new Date(),
    });
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    const newTimeSpent = milestone.timeSpent + (milestone.timerStartedAt 
      ? Math.floor((Date.now() - new Date(milestone.timerStartedAt).getTime()) / 60000)
      : elapsedTime);
    
    onUpdate({
      ...milestone,
      timerActive: false,
      timeSpent: newTimeSpent,
    });
    setIsTimerRunning(false);
    setElapsedTime(newTimeSpent);
  };

  const handleResetTimer = () => {
    onUpdate({
      ...milestone,
      timerActive: false,
      timeSpent: 0,
      timerStartedAt: undefined,
    });
    setElapsedTime(0);
    setIsTimerRunning(false);
  };

  const handleUpdateTargetHours = () => {
    const targetHours = parseFloat(editHours) || settings.defaultMilestoneHours;
    onUpdate({ ...milestone, targetHours });
  };

  const targetMinutes = (milestone.targetHours || settings.defaultMilestoneHours) * 60;
  const progress = calculateMilestoneProgress(milestone.timeSpent, milestone.targetHours || settings.defaultMilestoneHours);
  const urgencyLevel = getUrgencyLevel(100 - progress, settings.urgencyThresholds);
  const urgencyVariant = getUrgencyBadgeVariant(urgencyLevel);

  if (!settings.enabled) return null;

  const timeDisplay = milestone.isCompleted 
    ? `✅ ${formatHours(milestone.timeSpent)}`
    : isTimerRunning 
      ? `⏱️ ${formatHours(elapsedTime)} / ${formatHours(targetMinutes)}`
      : `⏱️ ${formatHours(milestone.timeSpent)} / ${formatHours(targetMinutes)}`;

  return (
    <div className="milestone-timer d-flex align-items-center gap-2 flex-wrap mt-2">
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>{isTimerRunning ? 'Timer běží' : 'Timer pozastaven'}</Tooltip>}
      >
        <span style={{ 
          fontSize: '0.8rem',
          color: milestone.timerActive && !milestone.isCompleted ? '#4CAF50' : '#888'
        }}>
          {milestone.timerActive && !milestone.isCompleted ? '🔴' : '⏱️'}
        </span>
      </OverlayTrigger>

      <span style={{ fontSize: '0.8rem', color: '#ccc' }}>
        {timeDisplay}
      </span>

      <ProgressBar
        now={progress}
        variant={urgencyVariant}
        style={{ width: '80px', height: '6px' }}
        className="mx-1"
      />

      {!milestone.isCompleted && (
        <div className="d-flex gap-1">
          {!isTimerRunning ? (
            <Button
              variant="outline-success"
              size="sm"
              onClick={handleStartTimer}
              disabled={milestone.isCompleted}
              title="Spustit timer"
            >
              ▶️
            </Button>
          ) : (
            <Button
              variant="outline-warning"
              size="sm"
              onClick={handlePauseTimer}
              title="Pozastavit timer"
            >
              ⏸️
            </Button>
          )}
          
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleResetTimer}
            disabled={milestone.timeSpent === 0 && !isTimerRunning}
            title="Resetovat timer"
          >
            🔄
          </Button>
        </div>
      )}

      {isEditing && (
        <InputGroup size="sm" style={{ width: '100px' }}>
          <Form.Control
            type="number"
            value={editHours}
            onChange={(e) => setEditHours(e.target.value)}
            onBlur={handleUpdateTargetHours}
            placeholder="Hodin"
            step="0.5"
            min="0"
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: '1px solid rgba(255,255,255,0.2)', 
              color: '#fff',
              fontSize: '0.75rem'
            }}
          />
          <InputGroup.Text style={{ background: 'rgba(255,255,255,0.1)', color: '#ccc', fontSize: '0.75rem' }}>
            h
          </InputGroup.Text>
        </InputGroup>
      )}

      {progress >= 100 && !milestone.isCompleted && (
        <Badge bg="warning" text="dark" style={{ fontSize: '0.7rem' }}>
          ⏰ Překročeno!
        </Badge>
      )}
    </div>
  );
}
