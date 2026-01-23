'use client';

import { useState, useEffect } from 'react';
import { Button, ProgressBar, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ProjectMilestone, TimerSettings, DEFAULT_TIMER_SETTINGS } from '@/types/projects';
import { calculateMilestoneProgress, getUrgencyLevel, getUrgencyBadgeVariant } from '@/lib/timers/time-utils';

interface MilestoneTimerProps {
  milestone: ProjectMilestone;
  settings: TimerSettings;
  onUpdate: (milestone: ProjectMilestone) => void;
  isEditing: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  percentage: number;
  isOverdue: boolean;
}

export default function MilestoneTimer({ milestone, settings, onUpdate, isEditing }: MilestoneTimerProps) {
  const [remainingTime, setRemainingTime] = useState<TimeRemaining | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [editHours, setEditHours] = useState(milestone.targetHours?.toString() || settings.defaultMilestoneHours.toString());
  const [targetWhenStarted, setTargetWhenStarted] = useState<number>(0);

  const targetMinutes = (milestone.targetHours || settings.defaultMilestoneHours) * 60;
  
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  useEffect(() => {
    if (!milestone.timerActive || milestone.isCompleted) {
      setRemainingTime(null);
      setIsTimerRunning(false);
      return;
    }

    const updateTime = () => {
      const target = targetWhenStarted || targetMinutes;
      const now = Date.now();
      const startTime = milestone.timerStartedAt ? new Date(milestone.timerStartedAt).getTime() : now;
      const elapsed = Math.floor((now - startTime) / 1000);
      setElapsedMinutes(Math.floor(elapsed / 60));
      const remaining = Math.max(0, target * 60 - elapsed);
      
      const totalMinutes = Math.floor(remaining / 60);
      const percentage = target > 0 ? (remaining / (target * 60)) * 100 : 100;

      setRemainingTime({
        days: Math.floor(totalMinutes / 1440),
        hours: Math.floor((totalMinutes % 1440) / 60),
        minutes: totalMinutes % 60,
        seconds: Math.floor(remaining % 60),
        total: remaining,
        percentage: Math.max(0, Math.min(100, percentage)),
        isOverdue: remaining <= 0,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [milestone.timerActive, milestone.timerStartedAt, milestone.isCompleted, targetMinutes, targetWhenStarted]);

  const handleStartTimer = () => {
    setTargetWhenStarted(targetMinutes);
    onUpdate({
      ...milestone,
      timerActive: true,
      timerStartedAt: new Date(),
    });
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    onUpdate({
      ...milestone,
      timerActive: false,
    });
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    onUpdate({
      ...milestone,
      timerActive: false,
      timeSpent: 0,
      timerStartedAt: undefined,
    });
    setIsTimerRunning(false);
    setRemainingTime(null);
  };

  const handleUpdateTargetHours = () => {
    const targetH = parseFloat(editHours) || settings.defaultMilestoneHours;
    onUpdate({ ...milestone, targetHours: targetH });
  };

  const progress = calculateMilestoneProgress(milestone.timeSpent, milestone.targetHours || settings.defaultMilestoneHours);
  const urgencyLevel = getUrgencyLevel(100 - progress, settings.urgencyThresholds);
  const urgencyVariant = getUrgencyBadgeVariant(urgencyLevel);

  const formatTime = (t: TimeRemaining | null): string => {
    if (!t) return '--:--:--:--';
    if (t.isOverdue) return `+${Math.abs(t.days)}d ${Math.abs(t.hours)}h`;
    return `${String(t.days).padStart(2, '0')}:${String(t.hours).padStart(2, '0')}:${String(t.minutes).padStart(2, '0')}:${String(t.seconds).padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (!remainingTime) return '#4CAF50';
    if (remainingTime.isOverdue) return '#ff4444';
    if (urgencyLevel === 'critical') return '#ff4444';
    if (urgencyLevel === 'warning') return '#ff8800';
    if (urgencyLevel === 'caution') return '#ffbb33';
    return '#4CAF50';
  };

  const currentTime = remainingTime || { 
    days: 0, hours: 0, minutes: 0, seconds: 0, 
    total: targetMinutes * 60, 
    percentage: 100, 
    isOverdue: false 
  };

  const timerWidth = isEditing ? '100px' : '80px';

  if (milestone.isCompleted) {
    return (
      <div className="milestone-timer d-flex align-items-center gap-2 flex-wrap mt-2">
        <span style={{ fontSize: '0.8rem', color: '#4CAF50' }}>✅ Hotovo</span>
        {milestone.timeSpent > 0 && (
          <span style={{ fontSize: '0.8rem', color: '#888' }}>
            Celkem: {Math.floor(milestone.timeSpent / 60)}h {milestone.timeSpent % 60}m
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="milestone-timer d-flex align-items-center gap-2 flex-wrap mt-2">
      <span style={{ 
        fontSize: '0.9rem', 
        fontFamily: 'monospace',
        fontWeight: 'bold',
        color: getTimerColor()
      }}>
        ⏱️ {formatTime(currentTime)}
      </span>

      <ProgressBar
        now={currentTime.percentage}
        variant={urgencyVariant}
        style={{ width: timerWidth, height: '6px' }}
        animated={isTimerRunning && urgencyLevel === 'critical'}
      />

      <div className="d-flex gap-1">
        {!isTimerRunning ? (
          <Button
            variant="outline-success"
            size="sm"
            onClick={handleStartTimer}
            title="Spustit countdown"
          >
            ▶️
          </Button>
        ) : (
          <Button
            variant="outline-warning"
            size="sm"
            onClick={handlePauseTimer}
            title="Pozastavit"
          >
            ⏸️
          </Button>
        )}
        
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={handleResetTimer}
          disabled={!isTimerRunning && milestone.timeSpent === 0}
          title="Resetovat"
        >
          🔄
        </Button>
      </div>

      {isEditing && (
        <div style={{ width: '80px' }}>
          <input
            type="number"
            step="0.5"
            value={editHours}
            onChange={(e) => setEditHours(e.target.value)}
            onBlur={handleUpdateTargetHours}
            className="form-control form-control-sm"
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: '1px solid rgba(255,255,255,0.2)', 
              color: '#fff',
              fontSize: '0.75rem',
              width: '100%'
            }}
          />
        </div>
      )}

      {isTimerRunning && (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Target: {targetMinutes}m | Elapsed: {elapsedMinutes}m</Tooltip>}
        >
          <Badge bg={urgencyVariant} style={{ fontSize: '0.7rem' }}>
            ⏳
          </Badge>
        </OverlayTrigger>
      )}

      {currentTime.isOverdue && (
        <Badge bg="danger" style={{ fontSize: '0.7rem' }}>
          🔴 Čas vypršel!
        </Badge>
      )}
    </div>
  );
}
