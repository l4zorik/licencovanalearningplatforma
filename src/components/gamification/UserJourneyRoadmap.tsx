'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Badge, Button, Modal, ProgressBar } from 'react-bootstrap';

interface JourneyNode {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'milestone' | 'achievement' | 'level' | 'quest';
  xpReward: number;
  category: string;
  requirements?: {
    type: string;
    value: number;
  }[];
}

interface UserJourneyRoadmapProps {
  currentLevel: number;
  totalXP: number;
  unlockedAchievements: string[];
  completedMissions: string[];
  streak: number;
  skillsUnlocked: number;
  coursesCompleted: number;
}

const JOURNEY_NODES: JourneyNode[] = [
  {
    id: 'start',
    title: 'Začátek Cesty',
    description: 'Tvůj kariérní příběh začíná',
    icon: '🚀',
    type: 'milestone',
    xpReward: 0,
    category: 'start'
  },
  {
    id: 'first_skill',
    title: 'První Dovednost',
    description: 'Odemkni svou první dovednost',
    icon: '🛠️',
    type: 'milestone',
    xpReward: 25,
    category: 'learning',
    requirements: [{ type: 'skills', value: 1 }]
  },
  {
    id: 'level_2',
    title: 'Level 2',
    description: 'Dosáhni 2. levelu',
    icon: '1',
    type: 'level',
    xpReward: 50,
    category: 'progress',
    requirements: [{ type: 'xp', value: 100 }]
  },
  {
    id: 'first_course',
    title: 'První Kurz',
    description: 'Dokonč svůj první kurz',
    icon: '📚',
    type: 'achievement',
    xpReward: 50,
    category: 'learning',
    requirements: [{ type: 'courses', value: 1 }]
  },
  {
    id: 'first_job',
    title: 'První Práce',
    description: 'Přidej svou první pracovní příležitost',
    icon: '💼',
    type: 'achievement',
    xpReward: 25,
    category: 'career',
    requirements: [{ type: 'jobs', value: 1 }]
  },
  {
    id: 'week_streak',
    title: 'Týdenní Série',
    description: 'Udrž streak 7 dní',
    icon: '🔥',
    type: 'milestone',
    xpReward: 150,
    category: 'streak',
    requirements: [{ type: 'streak', value: 7 }]
  },
  {
    id: 'level_5',
    title: 'Level 5 - Vojín',
    description: 'Dosáhni 5. levelu',
    icon: '🎖️',
    type: 'level',
    xpReward: 150,
    category: 'progress',
    requirements: [{ type: 'xp', value: 800 }]
  },
  {
    id: 'first_mission',
    title: 'První Mise',
    description: 'Dokonč svou první misi',
    icon: '🎯',
    type: 'quest',
    xpReward: 200,
    category: 'mission',
    requirements: [{ type: 'missions', value: 1 }]
  },
  {
    id: 'five_skills',
    title: 'Specialista',
    description: 'Odemkni 5 dovedností',
    icon: '🔧',
    type: 'milestone',
    xpReward: 200,
    category: 'learning',
    requirements: [{ type: 'skills', value: 5 }]
  },
  {
    id: 'five_courses',
    title: 'Vzdělanec',
    description: 'Dokonč 5 kurzů',
    icon: '🎓',
    type: 'achievement',
    xpReward: 300,
    category: 'learning',
    requirements: [{ type: 'courses', value: 5 }]
  },
  {
    id: 'level_10',
    title: 'Level 10 - Veteran',
    description: 'Dosáhni 10. levelu',
    icon: '🏆',
    type: 'level',
    xpReward: 400,
    category: 'progress',
    requirements: [{ type: 'xp', value: 4000 }]
  },
  {
    id: 'ten_jobs',
    title: 'Lovec Práce',
    description: 'Přidej 10 pracovních příležitostí',
    icon: '📋',
    type: 'achievement',
    xpReward: 300,
    category: 'career',
    requirements: [{ type: 'jobs', value: 10 }]
  },
  {
    id: 'month_streak',
    title: 'Měsíční Válečník',
    description: 'Udrž streak 30 dní',
    icon: '⚔️',
    type: 'milestone',
    xpReward: 500,
    category: 'streak',
    requirements: [{ type: 'streak', value: 30 }]
  },
  {
    id: 'first_interview',
    title: 'První Interview',
    description: 'Dostaň se k interview',
    icon: '🤝',
    type: 'achievement',
    xpReward: 400,
    category: 'career',
    requirements: [{ type: 'interviews', value: 1 }]
  },
  {
    id: 'level_15',
    title: 'Level 15 - Hrdina',
    description: 'Dosáhni 15. levelu',
    icon: '🦸',
    type: 'level',
    xpReward: 600,
    category: 'progress',
    requirements: [{ type: 'xp', value: 12000 }]
  },
  {
    id: 'twenty_skills',
    title: 'Expert Dovedností',
    description: 'Odemkni 20 dovedností',
    icon: '💪',
    type: 'milestone',
    xpReward: 500,
    category: 'learning',
    requirements: [{ type: 'skills', value: 20 }]
  },
  {
    id: 'five_missions',
    title: 'Mistr Misí',
    description: 'Dokonč 5 misí',
    icon: '👑',
    type: 'quest',
    xpReward: 600,
    category: 'mission',
    requirements: [{ type: 'missions', value: 5 }]
  },
  {
    id: 'level_20',
    title: 'Level 20 - Neohrožený',
    description: 'Dosáhni 20. levelu',
    icon: '🛡️',
    type: 'level',
    xpReward: 800,
    category: 'progress',
    requirements: [{ type: 'xp', value: 30000 }]
  },
  {
    id: 'hundred_streak',
    title: 'Sto Dní',
    description: 'Udrž streak 100 dní',
    icon: '💯',
    type: 'milestone',
    xpReward: 1500,
    category: 'streak',
    requirements: [{ type: 'streak', value: 100 }]
  },
  {
    id: 'level_25',
    title: 'Level 25 - Expert',
    description: 'Dosáhni 25. levelu',
    icon: '🎯',
    type: 'level',
    xpReward: 1000,
    category: 'progress',
    requirements: [{ type: 'xp', value: 70000 }]
  },
  {
    id: 'level_30',
    title: 'Level 30 - Majster',
    description: 'Dosáhni 30. levelu',
    icon: '👑',
    type: 'level',
    xpReward: 2000,
    category: 'progress',
    requirements: [{ type: 'xp', value: 150000 }]
  },
  {
    id: 'legend',
    title: 'Legenda',
    description: 'Dokončil jsi celou cestu!',
    icon: '🏅',
    type: 'milestone',
    xpReward: 5000,
    category: 'mastery'
  }
];

export default function UserJourneyRoadmap({
  currentLevel,
  totalXP,
  unlockedAchievements,
  completedMissions,
  streak,
  skillsUnlocked,
  coursesCompleted
}: UserJourneyRoadmapProps) {
  const [selectedNode, setSelectedNode] = useState<JourneyNode | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [animatedNodes, setAnimatedNodes] = useState<Set<string>>(new Set());

  const userStats = useMemo(() => ({
    level: currentLevel,
    xp: totalXP,
    skills: skillsUnlocked,
    courses: coursesCompleted,
    jobs: 0,
    interviews: 0,
    missions: completedMissions.length,
    streak: streak
  }), [currentLevel, totalXP, skillsUnlocked, coursesCompleted, completedMissions.length, streak]);

  const isNodeUnlocked = (node: JourneyNode): boolean => {
    if (node.id === 'start') return true;
    if (node.type === 'level') {
      const levelNum = parseInt(node.title.split(' ')[1]);
      return userStats.level >= levelNum;
    }
    if (node.id === 'first_job') return userStats.jobs >= 1;
    if (node.id === 'first_interview') return userStats.interviews >= 1;
    if (node.id === 'first_mission') return userStats.missions >= 1;
    if (node.id === 'first_course') return userStats.courses >= 1;
    if (node.id === 'first_skill') return userStats.skills >= 1;
    if (node.id === 'week_streak') return userStats.streak >= 7;
    if (node.id === 'month_streak') return userStats.streak >= 30;
    if (node.id === 'hundred_streak') return userStats.streak >= 100;
    if (node.id === 'five_courses') return userStats.courses >= 5;
    if (node.id === 'ten_jobs') return userStats.jobs >= 10;
    if (node.id === 'five_skills') return userStats.skills >= 5;
    if (node.id === 'twenty_skills') return userStats.skills >= 20;
    if (node.id === 'five_missions') return userStats.missions >= 5;
    if (node.id === 'level_30') return userStats.level >= 30;
    if (node.id === 'level_25') return userStats.level >= 25;
    if (node.id === 'level_20') return userStats.level >= 20;
    if (node.id === 'level_15') return userStats.level >= 15;
    if (node.id === 'level_10') return userStats.level >= 10;
    if (node.id === 'level_5') return userStats.level >= 5;
    if (node.id === 'level_2') return userStats.level >= 2;
    if (node.id === 'legend') return userStats.level >= 30;
    return false;
  };

  const isNodeActive = (node: JourneyNode): boolean => {
    const unlocked = isNodeUnlocked(node);
    if (node.id === 'start') return true;
    if (node.type === 'level') {
      const levelNum = parseInt(node.title.split(' ')[1]);
      return userStats.level >= levelNum - 1 && userStats.level < levelNum;
    }
    const nextNode = JOURNEY_NODES[JOURNEY_NODES.findIndex(n => n.id === node.id) + 1];
    if (nextNode) {
      return unlocked && !isNodeUnlocked(nextNode);
    }
    return unlocked;
  };

  const getNextMilestone = (): JourneyNode | null => {
    for (const node of JOURNEY_NODES) {
      if (!isNodeUnlocked(node)) return node;
    }
    return null;
  };

  const nextMilestone = getNextMilestone();
  const progressPercent = Math.round((JOURNEY_NODES.filter(n => isNodeUnlocked(n)).length / JOURNEY_NODES.length) * 100);

  const handleNodeClick = (node: JourneyNode) => {
    setSelectedNode(node);
    setShowModal(true);
  };

  const getNodeColor = (node: JourneyNode): string => {
    if (isNodeUnlocked(node)) return '#4caf50';
    if (isNodeActive(node)) return '#ffc107';
    return '#424242';
  };

  const getNodeIcon = (node: JourneyNode): string => {
    const unlocked = isNodeUnlocked(node);
    const active = isNodeActive(node);
    if (unlocked) return node.icon;
    if (active) return '⏳';
    return '🔒';
  };

  return (
    <div className="user-journey-roadmap">
      <style jsx>{`
        .user-journey-roadmap {
          position: relative;
          padding: 20px 0;
        }
        
        .journey-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .journey-progress {
          max-width: 400px;
          margin: 0 auto 20px;
        }
        
        .next-milestone {
          background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.1));
          border: 1px solid rgba(255, 193, 7, 0.3);
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 30px;
        }
        
        .roadmap-container {
          position: relative;
          overflow-x: auto;
          padding: 20px 0;
        }
        
        .roadmap-svg {
          min-width: 1200px;
          height: 600px;
        }
        
        .node-group {
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        
        .node-group:hover {
          transform: scale(1.1);
        }
        
        .node-circle {
          transition: all 0.3s ease;
        }
        
        .node-circle.unlocked {
          filter: drop-shadow(0 0 10px rgba(76, 175, 80, 0.5));
        }
        
        .node-circle.active {
          filter: drop-shadow(0 0 15px rgba(255, 193, 7, 0.7));
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .node-label {
          font-size: 10px;
          fill: #e2e8f0;
          text-anchor: middle;
        }
        
        .path-line {
          transition: stroke-dashoffset 1s ease;
        }
        
        .path-line.unlocked {
          stroke: #4caf50;
          stroke-dasharray: 10, 5;
          animation: dash 20s linear infinite;
        }
        
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
        
        .current-indicator {
          animation: bounce 1s infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div className="journey-header">
        <h3 className="text-white mb-3">🗺️ Tvá Cesta</h3>
        
        <div className="journey-progress">
          <div className="d-flex justify-content-between mb-2">
            <small className="text-white-50">Postup</small>
            <small className="text-warning">{progressPercent}%</small>
          </div>
          <ProgressBar
            now={progressPercent}
            variant="warning"
            style={{ height: '8px' }}
          />
        </div>

        {nextMilestone && (
          <div className="next-milestone">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <span className="fs-4">🎯</span>
              <div>
                <small className="text-white-50 d-block">Další milník</small>
                <strong className="text-warning">{nextMilestone.title}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="roadmap-container">
        <svg className="roadmap-svg" viewBox="0 0 1200 600">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#424242" />
              <stop offset="100%" stopColor="#4caf50" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#4caf50" />
            </marker>
          </defs>

          {/* Cesta (propojovací čáry) */}
          {JOURNEY_NODES.slice(0, -1).map((node, index) => {
            const nextNode = JOURNEY_NODES[index + 1];
            const isPathUnlocked = isNodeUnlocked(node);
            const nextNodeUnlocked = isNodeUnlocked(nextNode);
            
            return (
              <line
                key={`path-${node.id}`}
                x1={100 + index * 55}
                y1={100 + (index % 2 === 0 ? 0 : 80)}
                x2={100 + (index + 1) * 55}
                y2={100 + ((index + 1) % 2 === 0 ? 0 : 80)}
                className={`path-line ${isPathUnlocked ? 'unlocked' : ''}`}
                stroke={isPathUnlocked ? '#4caf50' : '#424242'}
                strokeWidth={isPathUnlocked ? 4 : 2}
                strokeDasharray={isPathUnlocked ? '10,5' : '5,5'}
              />
            );
          })}

          {/* Uzly */}
          {JOURNEY_NODES.map((node, index) => {
            const unlocked = isNodeUnlocked(node);
            const active = isNodeActive(node);
            const color = getNodeColor(node);
            const x = 100 + index * 55;
            const y = 100 + (index % 2 === 0 ? 0 : 80);
            
            return (
              <g
                key={node.id}
                className="node-group"
                onClick={() => handleNodeClick(node)}
                transform={`translate(${x}, ${y})`}
              >
                {/* Glow efekt pro aktivní uzly */}
                {active && (
                  <circle
                    r="30"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    opacity="0.5"
                    className="current-indicator"
                  />
                )}

                {/* Hlavní kruh */}
                <circle
                  r={unlocked ? 24 : active ? 26 : 20}
                  fill={unlocked ? `linear-gradient(135deg, ${color}, ${color}80)` : '#1a1a2e'}
                  stroke={color}
                  strokeWidth={unlocked ? 3 : 2}
                  className={`node-circle ${unlocked ? 'unlocked' : active ? 'active' : ''}`}
                  filter={unlocked || active ? 'url(#glow)' : undefined}
                />

                {/* Ikona */}
                <text
                  x="0"
                  y="8"
                  textAnchor="middle"
                  fontSize="20"
                  style={{ pointerEvents: 'none' }}
                >
                  {getNodeIcon(node)}
                </text>

                {/* Popisek */}
                <text
                  x="0"
                  y={index % 2 === 0 ? 45 : -40}
                  className="node-label"
                  style={{ 
                    fill: unlocked ? '#fff' : active ? '#ffc107' : '#666',
                    fontWeight: unlocked || active ? 'bold' : 'normal'
                  }}
                >
                  {node.title.length > 15 ? node.title.substring(0, 15) + '...' : node.title}
                </text>

                {/* XP reward */}
                {unlocked && (
                  <text
                    x="0"
                    y={index % 2 === 0 ? 60 : -55}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#4caf50"
                  >
                    +{node.xpReward} XP
                  </text>
                )}
              </g>
            );
          })}

          {/* Konec cesty */}
          <g transform="translate(100 + (JOURNEY_NODES.length - 1) * 55, 100)">
            <polygon
              points="0,-30 25,0 0,30 -25,0"
              fill={progressPercent === 100 ? '#ffd700' : '#424242'}
              stroke={progressPercent === 100 ? '#ffd700' : '#666'}
              strokeWidth="2"
              filter={progressPercent === 100 ? 'url(#glow)' : undefined}
            />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fontSize="24"
            >
              {progressPercent === 100 ? '🏆' : '🎯'}
            </text>
          </g>
        </svg>
      </div>

      {/* Legenda */}
      <div className="d-flex justify-content-center gap-4 mt-3 flex-wrap">
        <div className="d-flex align-items-center gap-2">
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#4caf50' }} />
          <small className="text-white-50">Dokončeno</small>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffc107' }} />
          <small className="text-white-50">Aktivní</small>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#424242' }} />
          <small className="text-white-50">Zamčeno</small>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title>
            {selectedNode?.icon} {selectedNode?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          {selectedNode && (
            <>
              <p className="lead">{selectedNode.description}</p>
              
              <Row className="mb-3">
                <Col xs={6}>
                  <div className="text-center p-2 rounded" style={{ background: 'rgba(76, 175, 80, 0.1)' }}>
                    <div className="fs-4">📊</div>
                    <small className="text-white-50">XP Odměna</small>
                    <div className="fw-bold text-warning">+{selectedNode.xpReward}</div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="text-center p-2 rounded" style={{ background: 'rgba(255, 193, 7, 0.1)' }}>
                    <div className="fs-4">📊</div>
                    <small className="text-white-50">Typ</small>
                    <div className="fw-bold text-capitalize">{selectedNode.type}</div>
                  </div>
                </Col>
              </Row>

              {selectedNode.requirements && selectedNode.requirements.length > 0 && (
                <div className="mb-3">
                  <h6 className="text-white-50 mb-2">Požadavky:</h6>
                  {selectedNode.requirements.map((req, i) => (
                    <div key={i} className="d-flex align-items-center gap-2 mb-2">
                      <span className="text-warning">•</span>
                      <span>
                        {req.type === 'xp' && `📈 ${req.value.toLocaleString()} XP`}
                        {req.type === 'level' && `🎯 Level ${req.value}`}
                        {req.type === 'skills' && `🛠️ ${req.value} dovedností`}
                        {req.type === 'courses' && `📚 ${req.value} kurzů`}
                        {req.type === 'jobs' && `💼 ${req.value} prací`}
                        {req.type === 'streak' && `🔥 ${req.value} dní streak`}
                        {req.type === 'missions' && `🎯 ${req.value} misí`}
                        {req.type === 'interviews' && `🤝 ${req.value} interview`}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center">
                {isNodeUnlocked(selectedNode) ? (
                  <Badge bg="success" className="fs-6 p-2">✅ Dokončeno</Badge>
                ) : isNodeActive(selectedNode) ? (
                  <Badge bg="warning" text="dark" className="fs-6 p-2">⏳ Aktivní - Dokonči!</Badge>
                ) : (
                  <Badge bg="secondary" className="fs-6 p-2">🔒 Zamčeno</Badge>
                )}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
