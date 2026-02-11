'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import Link from 'next/link';
import {
  LifeMission,
  LifeMissionTemplate,
  LifeMissionStreak,
  UnlockedAchievement,
  MissionCategory,
} from '@/types/life-missions';
import { MISSION_TEMPLATES } from '@/data/life-missions/templates';
import {
  cloneTemplate,
  createCustomMission,
  calculateStats,
  checkAchievements,
} from '@/lib/life-missions/utils';
import {
  MissionDashboard,
  MissionFilters,
  MissionFilterState,
  MissionCard,
  MissionAchievements,
  CreateMissionModal,
} from '@/components/life-missions';
import { calculateMissionProgress, calculateEarnedXp } from '@/lib/life-missions/utils';

const DEFAULT_STREAK: LifeMissionStreak = { currentStreak: 0, longestStreak: 0, lastActivityDate: '' };

const PRIORITY_ORDER: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };

export default function LifeMissionsPage() {
  const [missions, setMissions] = useState<LifeMission[]>([]);
  const [streak, setStreak] = useState<LifeMissionStreak>(DEFAULT_STREAK);
  const [unlockedAchievements, setUnlockedAchievements] = useState<UnlockedAchievement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState<MissionFilterState>({
    category: 'all',
    status: 'all',
    priority: 'all',
    sortBy: 'newest',
    search: '',
  });

  // Load from localStorage
  useEffect(() => {
    try {
      const savedMissions = localStorage.getItem('lifeMissions');
      if (savedMissions) setMissions(JSON.parse(savedMissions));
      const savedStreak = localStorage.getItem('lifeMissionStreak');
      if (savedStreak) setStreak(JSON.parse(savedStreak));
      const savedAchievements = localStorage.getItem('lifeMissionAchievements');
      if (savedAchievements) setUnlockedAchievements(JSON.parse(savedAchievements));
    } catch {
      // ignore parse errors
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('lifeMissions', JSON.stringify(missions));
  }, [missions, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('lifeMissionStreak', JSON.stringify(streak));
  }, [streak, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('lifeMissionAchievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements, isLoaded]);

  const handleCreateFromTemplate = useCallback((template: LifeMissionTemplate) => {
    const newMission = cloneTemplate(template);
    setMissions(prev => [...prev, newMission]);
  }, []);

  const handleCreateCustom = useCallback((title: string, description: string, category: MissionCategory, icon: string, color: string) => {
    const newMission = createCustomMission(title, description, category, icon, color);
    setMissions(prev => [...prev, newMission]);
  }, []);

  // Check achievements whenever missions change
  useEffect(() => {
    if (!isLoaded || missions.length === 0) return;
    const newAchievements = checkAchievements(missions, streak, unlockedAchievements);
    if (newAchievements.length !== unlockedAchievements.length) {
      setUnlockedAchievements(newAchievements);
    }
  }, [missions, streak, isLoaded]);

  const stats = useMemo(() => calculateStats(missions, streak, unlockedAchievements), [missions, streak, unlockedAchievements]);

  const existingTemplateIds = useMemo(
    () => missions.filter(m => m.templateId).map(m => m.templateId!),
    [missions]
  );

  const filteredMissions = useMemo(() => {
    let result = [...missions];

    if (filters.category !== 'all') {
      result = result.filter(m => m.category === filters.category);
    }
    if (filters.status !== 'all') {
      result = result.filter(m => m.status === filters.status);
    }
    if (filters.priority !== 'all') {
      result = result.filter(m => m.priority === filters.priority);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(m => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    }

    switch (filters.sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'progress':
        result.sort((a, b) => calculateMissionProgress(b) - calculateMissionProgress(a));
        break;
      case 'priority':
        result.sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 2) - (PRIORITY_ORDER[b.priority] ?? 2));
        break;
      case 'xp':
        result.sort((a, b) => calculateEarnedXp(b) - calculateEarnedXp(a));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [missions, filters]);

  if (!isLoaded) {
    return (
      <Container fluid style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '60px 0' }}>
          Načítání...
        </div>
      </Container>
    );
  }

  return (
    <Container fluid style={{ padding: '30px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.85rem' }}>
              ← Zpět
            </Link>
          </div>
          <h2 style={{ color: '#fff', margin: '8px 0 0 0', fontSize: '1.8rem', fontWeight: 700 }}>
            🗺️ Životní mise
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
            Rozpiš své velké životní cíle na zvládnutelné kroky
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {streak.currentStreak > 0 && (
            <Badge bg="" style={{ background: 'rgba(255,152,0,0.15)', color: '#FF9800', padding: '8px 12px', borderRadius: '10px', fontSize: '0.85rem' }}>
              🔥 {streak.currentStreak} dní v řadě
            </Badge>
          )}
          <Button
            variant="warning"
            onClick={() => setShowCreateModal(true)}
            style={{ borderRadius: '10px', fontWeight: 600, padding: '8px 20px' }}
          >
            + Nová mise
          </Button>
        </div>
      </div>

      {/* Dashboard stats */}
      <MissionDashboard stats={stats} />

      {/* Filters */}
      <MissionFilters filters={filters} onChange={setFilters} />

      {/* Mission grid */}
      {filteredMissions.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {missions.length === 0 ? (
            <>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🗺️</div>
              <h4 style={{ color: '#fff', marginBottom: '8px' }}>Začni svou první životní misi!</h4>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
                Vyber si ze {MISSION_TEMPLATES.length} předpřipravených šablon nebo vytvoř vlastní misi.
              </p>
              <Button variant="warning" onClick={() => setShowCreateModal(true)} style={{ borderRadius: '10px' }}>
                🚀 Vybrat misi
              </Button>
            </>
          ) : (
            <>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>Žádné mise neodpovídají filtrům.</p>
            </>
          )}
        </div>
      ) : (
        <Row className="g-3 mb-4">
          {filteredMissions.map((mission) => (
            <Col key={mission.id} xs={12} md={6} lg={4}>
              <MissionCard mission={mission} />
            </Col>
          ))}
        </Row>
      )}

      {/* Achievements */}
      <div style={{ marginTop: '24px' }}>
        <MissionAchievements unlockedAchievements={unlockedAchievements} />
      </div>

      {/* Create modal */}
      <CreateMissionModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onCreateFromTemplate={handleCreateFromTemplate}
        onCreateCustom={handleCreateCustom}
        existingTemplateIds={existingTemplateIds}
      />
    </Container>
  );
}
