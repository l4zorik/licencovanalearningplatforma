'use client';

import { Milestone, getMilestoneProgress, getMilestoneCategoryColor, getMilestoneCategoryIcon, MILESTONE_TEMPLATES, createMilestone } from '@/lib/gamification/milestones';
import { Card, Badge, ProgressBar, Row, Col, Collapse } from 'react-bootstrap';
import { useState } from 'react';

interface MilestonesTrackerProps {
  userStats: {
    level: number;
    xp: number;
    streak: number;
    jobsApplied: number;
    interviews: number;
    offers: number;
    skillsUnlocked: number;
    coursesCompleted: number;
    missionsCompleted: number;
    tasksCompleted: number;
    learningHours: number;
  };
}

export function MilestonesTracker({ userStats }: MilestonesTrackerProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('all');

  const userMilestones: Milestone[] = MILESTONE_TEMPLATES.map(template => {
    let current = 0;
    
    switch (template.id) {
      case 'first_job_offer':
      case 'offer_getter':
        current = userStats.offers;
        break;
      case 'junior_dev':
      case 'full_stack':
      case 'first_mission':
      case 'five_missions':
      case 'all_missions':
      case 'five_skills':
      case 'twenty_skills':
      case 'fifty_skills':
        current = userStats.skillsUnlocked;
        break;
      case 'first_course':
      case 'course_collector':
      case 'five_courses':
      case 'twenty_courses':
        current = userStats.coursesCompleted;
        break;
      case 'ten_jobs':
      case 'hundred_jobs':
        current = userStats.jobsApplied;
        break;
      case 'five_interviews':
        current = userStats.interviews;
        break;
      case 'streak_7':
      case 'streak_30':
      case 'streak_100':
        current = userStats.streak;
        break;
      case 'level_10':
      case 'level_25':
        current = userStats.level;
        break;
      case 'xp_1000':
      case 'xp_5000':
      case 'xp_10000':
      case 'xp_50000':
        current = userStats.xp;
        break;
      case 'hundred_tasks':
        current = userStats.tasksCompleted;
        break;
      case 'learning_100h':
      case 'learning_500h':
        current = userStats.learningHours;
        break;
    }
    
    return createMilestone(template, current);
  });

  const completedCount = userMilestones.filter(m => m.status === 'completed').length;
  const inProgressCount = userMilestones.filter(m => m.status === 'in_progress').length;
  const totalRewardXP = userMilestones
    .filter(m => m.status === 'completed')
    .reduce((sum, m) => sum + m.rewardXP, 0);

  const categories = [...new Set(MILESTONE_TEMPLATES.map(m => m.category))];
  const categoryNames: Record<string, string> = {
    career: 'Kariéra',
    learning: 'Vzdělávání',
    skill: 'Dovednosti',
    achievements: 'Achievementy'
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-0 text-white">
            🎯 Milestoney
            <span className="ms-2 badge bg-success">{completedCount}/{userMilestones.length}</span>
          </h4>
          <small className="text-muted">Získáno XP z milestone: {totalRewardXP.toLocaleString()}</small>
        </div>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center h-100" style={{ background: 'rgba(76, 175, 80, 0.1)', border: '1px solid #4caf50' }}>
            <Card.Body>
              <h2 className="text-success">{completedCount}</h2>
              <small className="text-white-50">Dokončeno</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100" style={{ background: 'rgba(255, 193, 7, 0.1)', border: '1px solid #ffc107' }}>
            <Card.Body>
              <h2 className="text-warning">{inProgressCount}</h2>
              <small className="text-white-50">V pokroku</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100" style={{ background: 'rgba(158, 158, 158, 0.1)', border: '1px solid #9e9e9e' }}>
            <Card.Body>
              <h2 className="text-secondary">{userMilestones.length - completedCount - inProgressCount}</h2>
              <small className="text-white-50">Zamčeno</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {categories.map(category => {
        const categoryMilestones = userMilestones.filter(m => m.category === category);
        const isExpanded = expandedCategory === category || expandedCategory === 'all';
        
        return (
          <div key={category} className="mb-3">
            <button
              className="btn btn-outline-light w-100 d-flex align-items-center justify-content-between p-3"
              onClick={() => setExpandedCategory(isExpanded ? null : category)}
              style={{ background: `${getMilestoneCategoryColor(category as any)}20`, border: `1px solid ${getMilestoneCategoryColor(category as any)}40` }}
            >
              <div className="d-flex align-items-center gap-2">
                <span style={{ fontSize: '1.5rem' }}>{getMilestoneCategoryIcon(category as any)}</span>
                <span className="text-white">{categoryNames[category] || category}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Badge bg="secondary">
                  {categoryMilestones.filter(m => m.status === 'completed').length}/{categoryMilestones.length}
                </Badge>
                <span className="text-white-50">{isExpanded ? '▼' : '▶'}</span>
              </div>
            </button>
            
            <Collapse in={isExpanded}>
              <div className="mt-2">
                {categoryMilestones.map(milestone => (
                  <MilestoneCard key={milestone.id} milestone={milestone} />
                ))}
              </div>
            </Collapse>
          </div>
        );
      })}
    </div>
  );
}

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const progress = getMilestoneProgress(milestone);
  const categoryColor = getMilestoneCategoryColor(milestone.category);
  const isLocked = milestone.status === 'locked';

  return (
    <Card
      className={`mb-2 ${isLocked ? 'locked' : ''}`}
      style={{
        background: isLocked
          ? 'rgba(33, 37, 41, 0.5)'
          : `linear-gradient(145deg, ${categoryColor}15, ${categoryColor}05)`,
        border: `1px solid ${categoryColor}30`,
        opacity: isLocked ? 0.6 : 1
      }}
    >
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '1.5rem' }}>{milestone.rewardBadge || '🎯'}</span>
            <div>
              <h6 className="mb-0 text-white">{milestone.title}</h6>
              <small className="text-white-50">{milestone.description}</small>
            </div>
          </div>
          <Badge style={{ backgroundColor: categoryColor }}>
            +{milestone.rewardXP} XP
          </Badge>
        </div>

        {!isLocked && (
          <div className="mt-2">
            <div className="d-flex justify-content-between mb-1">
              <small className="text-white-50">
                {milestone.current}/{milestone.target} {milestone.unit}
              </small>
              <small className="text-white-50">{progress}%</small>
            </div>
            <div
              style={{
                height: '6px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: categoryColor,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
        )}

        {milestone.status === 'completed' && milestone.completedAt && (
          <small className="text-success d-block mt-2">
            ✅ Dokončeno {new Date(milestone.completedAt).toLocaleDateString('cs-CZ')}
          </small>
        )}
      </Card.Body>
    </Card>
  );
}
