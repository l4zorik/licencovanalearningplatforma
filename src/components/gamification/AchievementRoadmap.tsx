'use client';

import React, { useState } from 'react';
import { Achievement, ACHIEVEMENTS, getRarityColor } from '@/lib/gamification/achievements';
import { Card, Badge, Tabs, Tab } from 'react-bootstrap';

interface AchievementRoadmapProps {
  unlockedIds: string[];
  userProgress: Record<string, number>;
  currentLevel: number;
}

interface AchievementNode {
  id: string;
  x: number;
  y: number;
  achievement: Achievement;
  unlocked: boolean;
  progress: number;
  dependencies: string[];
  children: string[];
}

export default function AchievementRoadmap({ unlockedIds, userProgress, currentLevel }: AchievementRoadmapProps) {
  const [activeTab, setActiveTab] = useState('tree');

  // Define achievement dependencies
  const achievementDependencies: Record<string, string[]> = {
    // Original achievements
    'first_step': [],
    'first_job': [],
    'mission_starter': [],
    'xp_collector_100': ['first_step'],
    'level_2': ['xp_collector_100'],
    'first_course': [],
    'first_skill': [],
    'week_streak': [],
    'level_5': ['level_2', 'first_course'],
    'five_skills': ['first_skill'],
    'five_courses': ['first_course'],
    'ten_jobs': ['first_job'],
    'five_missions': ['mission_starter'],
    'month_streak': ['week_streak'],
    'level_10': ['level_5', 'five_skills'],
    'first_interview': ['ten_jobs'],
    'xp_collector_1000': ['xp_collector_100'],
    'level_15': ['level_10', 'five_courses'],
    'twenty_skills': ['five_skills'],
    'level_20': ['level_15', 'first_interview'],
    'hundred_streak': ['month_streak'],
    'level_25': ['level_20', 'twenty_skills'],
    'level_30': ['level_25', 'five_missions'],
    'xp_collector_5000': ['xp_collector_1000'],
    'learning_hero': ['five_courses'],
    'job_hunter': ['ten_jobs'],
    'mission_master': ['five_missions'],
    'skill_builder': ['twenty_skills'],
    'polymath': ['twenty_skills'],
    'interview_pro': ['first_interview'],
    'dedication': ['hundred_streak'],
    'level_50': ['level_30'],
    'offer_getter': ['interview_pro'],
    'century_club': ['level_30'],
    'hidden_gem': ['century_club'],
    'night_owl': [],
    'early_bird': [],
    'weekend_warrior': [],

    // Electrician path
    'electrician_beginner': [],
    'electrician_basic_tools': ['electrician_beginner'],
    'electrician_first_installation': ['electrician_basic_tools'],
    'electrician_safety_certified': ['electrician_first_installation'],
    'electrician_advanced_circuits': ['electrician_safety_certified'],
    'electrician_master_electrician': ['electrician_advanced_circuits'],

    // Mechanic path
    'mechanic_beginner': [],
    'mechanic_oil_change': ['mechanic_beginner'],
    'mechanic_engine_repair': ['mechanic_oil_change'],
    'mechanic_diagnostic_expert': ['mechanic_engine_repair'],
    'mechanic_electric_vehicles': ['mechanic_diagnostic_expert'],

    // Welder path
    'welder_beginner': [],
    'welder_first_weld': ['welder_beginner'],
    'welder_mig_tig': ['welder_first_weld'],
    'welder_certified': ['welder_mig_tig'],
    'welder_artisan': ['welder_certified'],

    // Entrepreneur path
    'entrepreneur_beginner': [],
    'entrepreneur_first_business': ['entrepreneur_beginner'],
    'entrepreneur_marketing': ['entrepreneur_first_business'],
    'entrepreneur_scalable': ['entrepreneur_marketing'],

    // Programmer path
    'programmer_beginner': [],
    'programmer_first_code': ['programmer_beginner'],
    'programmer_web_developer': ['programmer_first_code'],
    'programmer_fullstack': ['programmer_web_developer'],
    'programmer_ai_engineer': ['programmer_fullstack'],

    // CNC path
    'cnc_beginner': [],
    'cnc_first_program': ['cnc_beginner'],
    'cnc_precision_machining': ['cnc_first_program'],
    'cnc_5axis_expert': ['cnc_precision_machining'],
    'cnc_master_craftsman': ['cnc_5axis_expert']
  };

  // Create tree structure for achievements based on dependencies
  const createAchievementTree = (): AchievementNode[] => {
    const nodes: AchievementNode[] = [];
    const levelSpacing = 200;
    const nodeSpacing = 120;
    const processed = new Set<string>();

    // Helper function to calculate position
    const getNodePosition = (id: string, level: number, indexInLevel: number): { x: number; y: number } => {
      return {
        x: 100 + indexInLevel * nodeSpacing,
        y: 100 + level * levelSpacing
      };
    };

    // BFS to create tree structure
    const queue: { id: string; level: number }[] = [];
    const levelNodes: Record<number, string[]> = {};

    // Start with root nodes (no dependencies)
    ACHIEVEMENTS.forEach(achievement => {
      if (!achievementDependencies[achievement.id] || achievementDependencies[achievement.id].length === 0) {
        queue.push({ id: achievement.id, level: 0 });
        if (!levelNodes[0]) levelNodes[0] = [];
        levelNodes[0].push(achievement.id);
      }
    });

    let currentLevel = 0;
    while (queue.length > 0) {
      const levelSize = queue.length;
      let indexInLevel = 0;

      for (let i = 0; i < levelSize; i++) {
        const { id, level } = queue.shift()!;
        if (processed.has(id)) continue;

        const achievement = ACHIEVEMENTS.find(a => a.id === id)!;
        const unlocked = unlockedIds.includes(achievement.id);
        const progress = userProgress[achievement.id] || 0;
        const dependencies = achievementDependencies[id] || [];

        const position = getNodePosition(id, level, indexInLevel);
        indexInLevel++;

        nodes.push({
          id,
          x: position.x,
          y: position.y,
          achievement,
          unlocked,
          progress,
          dependencies,
          children: []
        });

        processed.add(id);

        // Add children (achievements that depend on this one)
        ACHIEVEMENTS.forEach(child => {
          if (achievementDependencies[child.id]?.includes(id)) {
            const childLevel = level + 1;
            if (!levelNodes[childLevel]) levelNodes[childLevel] = [];
            if (!levelNodes[childLevel].includes(child.id)) {
              levelNodes[childLevel].push(child.id);
              queue.push({ id: child.id, level: childLevel });
            }
            nodes.find(n => n.id === id)!.children.push(child.id);
          }
        });
      }
      currentLevel++;
    }

    // Add remaining achievements that might not be connected
    ACHIEVEMENTS.forEach(achievement => {
      if (!processed.has(achievement.id)) {
        const unlocked = unlockedIds.includes(achievement.id);
        const progress = userProgress[achievement.id] || 0;
        const maxLevel = Math.max(...Object.keys(levelNodes).map(Number));
        const nextLevel = maxLevel + 1;
        if (!levelNodes[nextLevel]) levelNodes[nextLevel] = [];

        const position = getNodePosition(achievement.id, nextLevel, levelNodes[nextLevel].length);
        levelNodes[nextLevel].push(achievement.id);

        nodes.push({
          id: achievement.id,
          x: position.x,
          y: position.y,
          achievement,
          unlocked,
          progress,
          dependencies: achievementDependencies[achievement.id] || [],
          children: []
        });
      }
    });

    return nodes;
  };

  const nodes = createAchievementTree();
  const totalAchievements = ACHIEVEMENTS.length;
  const unlockedCount = unlockedIds.length;

  // Career paths with their achievement progressions
  const careerPaths = [
    {
      id: 'electrician',
      title: 'Elektrikář',
      icon: '⚡',
      color: '#FFD700',
      achievements: [
        'electrician_beginner',
        'electrician_basic_tools',
        'electrician_first_installation',
        'electrician_safety_certified',
        'electrician_advanced_circuits',
        'electrician_master_electrician'
      ]
    },
    {
      id: 'mechanic',
      title: 'Automechanik',
      icon: '🔧',
      color: '#FF6B35',
      achievements: [
        'mechanic_beginner',
        'mechanic_oil_change',
        'mechanic_engine_repair',
        'mechanic_diagnostic_expert',
        'mechanic_electric_vehicles'
      ]
    },
    {
      id: 'welder',
      title: 'Svářeč',
      icon: '🔥',
      color: '#FF4757',
      achievements: [
        'welder_beginner',
        'welder_first_weld',
        'welder_mig_tig',
        'welder_certified',
        'welder_artisan'
      ]
    },
    {
      id: 'entrepreneur',
      title: 'Podnikatel',
      icon: '💼',
      color: '#2ED573',
      achievements: [
        'entrepreneur_beginner',
        'entrepreneur_first_business',
        'entrepreneur_marketing',
        'entrepreneur_scalable'
      ]
    },
    {
      id: 'programmer',
      title: 'Programátor',
      icon: '💻',
      color: '#3742FA',
      achievements: [
        'programmer_beginner',
        'programmer_first_code',
        'programmer_web_developer',
        'programmer_fullstack',
        'programmer_ai_engineer'
      ]
    },
    {
      id: 'cnc',
      title: 'CNC Obráběč',
      icon: '⚙️',
      color: '#7BED9F',
      achievements: [
        'cnc_beginner',
        'cnc_first_program',
        'cnc_precision_machining',
        'cnc_5axis_expert',
        'cnc_master_craftsman'
      ]
    }
  ];

  const createCareerPathTree = (pathId: string) => {
    const path = careerPaths.find(p => p.id === pathId);
    if (!path) return [];

    const pathNodes: AchievementNode[] = [];
    const centerX = 600;
    const radius = 200;

    path.achievements.forEach((achievementId, index) => {
      const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
      if (!achievement) return;

      const angle = (index / path.achievements.length) * 2 * Math.PI - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = 300 + Math.sin(angle) * radius;

      const unlocked = unlockedIds.includes(achievement.id);
      const progress = userProgress[achievement.id] || 0;

      pathNodes.push({
        id: achievement.id,
        x,
        y,
        achievement,
        unlocked,
        progress,
        dependencies: index > 0 ? [path.achievements[index - 1]] : [],
        children: index < path.achievements.length - 1 ? [path.achievements[index + 1]] : []
      });
    });

    return pathNodes;
  };

  const [selectedPath, setSelectedPath] = useState('electrician');
  const pathNodes = createCareerPathTree(selectedPath);

  const renderConnections = () => {
    const connections: React.ReactElement[] = [];

    nodes.forEach(node => {
      node.children.forEach(childId => {
        const childNode = nodes.find(n => n.id === childId);
        if (childNode) {
          const isPathUnlocked = node.unlocked && childNode.unlocked;
          connections.push(
            <line
              key={`line-${node.id}-${childId}`}
              x1={node.x + 30} // center of node
              y1={node.y + 30}
              x2={childNode.x + 30}
              y2={childNode.y + 30}
              stroke={isPathUnlocked ? '#4caf50' : '#424242'}
              strokeWidth={isPathUnlocked ? 3 : 1}
              opacity="0.8"
              markerEnd={isPathUnlocked ? "url(#arrowhead)" : undefined}
            />
          );
        }
      });
    });

    return connections;
  };

  const renderNode = (node: AchievementNode) => {
    const rarityColor = getRarityColor(node.achievement.rarity);
    const progressPercent = Math.min(100, Math.round(node.progress));

    return (
      <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
        {/* Achievement node */}
        <circle
          r={node.unlocked ? 30 : 25}
          fill={node.unlocked ? rarityColor : '#424242'}
          stroke={node.unlocked ? rarityColor : '#666'}
          strokeWidth="3"
          opacity={node.unlocked ? 1 : 0.7}
          style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(255, 193, 7, 0.5))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = 'none';
          }}
        />

        {/* Icon */}
        <text
          x="0"
          y="8"
          textAnchor="middle"
          fontSize={node.unlocked ? "24" : "18"}
          fill="white"
          style={{
            pointerEvents: 'none',
            filter: node.unlocked ? 'none' : 'grayscale(100%) brightness(0.5)'
          }}
        >
          {node.achievement.icon}
        </text>

        {/* Title */}
        <text
          x="0"
          y="50"
          textAnchor="middle"
          fontSize="10"
          fill={node.unlocked ? "#fff" : "#666"}
          style={{ pointerEvents: 'none' }}
        >
          {node.achievement.title.length > 12
            ? node.achievement.title.substring(0, 12) + '...'
            : node.achievement.title
          }
        </text>

        {/* Progress bar for locked achievements */}
        {!node.unlocked && progressPercent > 0 && (
          <g transform="translate(-20, 55)">
            <rect
              width="40"
              height="4"
              fill="#333"
              rx="2"
            />
            <rect
              width={`${40 * progressPercent / 100}`}
              height="4"
              fill={rarityColor}
              rx="2"
            />
          </g>
        )}

        {/* XP reward */}
        {node.unlocked && (
          <text
            x="0"
            y="65"
            textAnchor="middle"
            fontSize="8"
            fill="#4caf50"
            style={{ pointerEvents: 'none' }}
          >
            +{node.achievement.xpReward} XP
          </text>
        )}
      </g>
    );
  };

  const renderTreeView = () => (
    <svg
      width="100%"
      height="1200"
      viewBox="0 0 2000 1200"
      style={{ minWidth: '2000px', minHeight: '1200px' }}
    >
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(33, 37, 41, 0.1)" />
          <stop offset="100%" stopColor="rgba(33, 37, 41, 0.3)" />
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

      {/* Background */}
      <rect width="2000" height="1200" fill="url(#bgGradient)" />

      {/* Render connections first */}
      {renderConnections()}

      {/* Render all nodes */}
      {nodes.map(renderNode)}

      {/* Legend */}
      <g transform="translate(50, 1120)">
        <circle r="8" fill="#4caf50" />
        <text x="20" y="5" fontSize="12" fill="#fff">Odemčeno</text>
        <circle cx="120" r="8" fill="#424242" />
        <text x="140" y="5" fontSize="12" fill="#fff">Zamčeno</text>
        <rect x="220" y="-5" width="20" height="4" fill="#ffc107" rx="2" />
        <text x="250" y="5" fontSize="12" fill="#fff">Pokrok</text>
      </g>
    </svg>
  );

  const renderCareerPathView = () => {
    const path = careerPaths.find(p => p.id === selectedPath);
    if (!path) return null;

    return (
      <svg
        width="100%"
        height="800"
        viewBox="0 0 1200 800"
        style={{ minWidth: '1200px', minHeight: '800px' }}
      >
        <defs>
          <linearGradient id="bgGradientPath" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(33, 37, 41, 0.1)" />
            <stop offset="100%" stopColor="rgba(33, 37, 41, 0.3)" />
          </linearGradient>
          <filter id="glowPath">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <marker id="arrowheadPath" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={path.color} />
          </marker>
        </defs>

        {/* Background */}
        <rect width="1200" height="800" fill="url(#bgGradientPath)" />

        {/* Career path title */}
        <g>
          <rect
            x="400"
            y="20"
            width="400"
            height="50"
            fill={path.color + '20'}
            stroke={path.color}
            strokeWidth="3"
            rx="25"
          />
          <text
            x="600"
            y="50"
            textAnchor="middle"
            fontSize="24"
            fill={path.color}
            fontWeight="bold"
          >
            {path.icon} {path.title}
          </text>
        </g>

        {/* Render path connections */}
        {pathNodes.slice(0, -1).map((node, index) => {
          const nextNode = pathNodes[index + 1];
          return (
            <line
              key={`path-line-${node.id}`}
              x1={node.x + 30}
              y1={node.y + 30}
              x2={nextNode.x + 30}
              y2={nextNode.y + 30}
              stroke={node.unlocked && nextNode.unlocked ? path.color : '#424242'}
              strokeWidth={node.unlocked && nextNode.unlocked ? 4 : 2}
              opacity="0.8"
              markerEnd={node.unlocked && nextNode.unlocked ? "url(#arrowheadPath)" : undefined}
            />
          );
        })}

        {/* Render career path nodes */}
        {pathNodes.map(renderNode)}

        {/* Career path selector */}
        <g transform="translate(50, 100)">
          <text x="0" y="0" fontSize="16" fill="#fff" fontWeight="bold">Vyber obor:</text>
          {careerPaths.map((p, index) => (
            <g key={p.id} transform={`translate(0, ${30 + index * 25})`}>
              <rect
                x="0"
                y="-15"
                width="150"
                height="20"
                fill={selectedPath === p.id ? p.color + '40' : 'rgba(255,255,255,0.1)'}
                stroke={selectedPath === p.id ? p.color : '#666'}
                strokeWidth="2"
                rx="10"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedPath(p.id)}
              />
              <text
                x="75"
                y="0"
                textAnchor="middle"
                fontSize="12"
                fill={selectedPath === p.id ? p.color : '#fff'}
                style={{ cursor: 'pointer', pointerEvents: 'none' }}
              >
                {p.icon} {p.title}
              </text>
            </g>
          ))}
        </g>
      </svg>
    );
  };

  return (
    <div className="achievement-roadmap">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white mb-0">🏆 Achievement Roadmap</h3>
        <div className="d-flex gap-3">
          <Badge bg="secondary" className="fs-6">
            {unlockedCount}/{totalAchievements} Dokončeno
          </Badge>
          <div className="text-white-50 small align-self-center">
            Level {currentLevel}
          </div>
        </div>
      </div>

      <Card style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid #424242' }}>
        <Card.Body className="p-0">
          <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '600px' }}>
            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'tree')} className="mb-0">
              <Tab eventKey="tree" title="🏆 Achievement Tree">
                {renderTreeView()}
              </Tab>
              <Tab eventKey="career" title="🎯 Kariérní Cesty">
                {renderCareerPathView()}
              </Tab>
            </Tabs>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}