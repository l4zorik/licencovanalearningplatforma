'use client';

import React from 'react';
import { Form, Badge } from 'react-bootstrap';
import { MissionCategory, MissionStatus, MissionPriority, MISSION_CATEGORIES } from '@/types/life-missions';

export interface MissionFilterState {
  category: MissionCategory | 'all';
  status: MissionStatus | 'all';
  priority: MissionPriority | 'all';
  sortBy: 'newest' | 'oldest' | 'progress' | 'priority' | 'xp';
  search: string;
}

interface MissionFiltersProps {
  filters: MissionFilterState;
  onChange: (filters: MissionFilterState) => void;
}

export default function MissionFilters({ filters, onChange }: MissionFiltersProps) {
  const update = (partial: Partial<MissionFilterState>) => {
    onChange({ ...filters, ...partial });
  };

  return (
    <div
      style={{
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '16px 20px',
        marginBottom: '20px',
      }}
    >
      {/* Search */}
      <div style={{ marginBottom: '12px' }}>
        <Form.Control
          type="text"
          placeholder="🔍 Hledat misi..."
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            borderRadius: '10px',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Category filter */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
          <Badge
            bg=""
            onClick={() => update({ category: 'all' })}
            style={{
              cursor: 'pointer',
              background: filters.category === 'all' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
              color: filters.category === 'all' ? '#fff' : 'rgba(255,255,255,0.5)',
              padding: '6px 10px',
              borderRadius: '8px',
              fontSize: '0.75rem',
            }}
          >
            Vše
          </Badge>
          {MISSION_CATEGORIES.map((cat) => (
            <Badge
              key={cat.key}
              bg=""
              onClick={() => update({ category: cat.key })}
              style={{
                cursor: 'pointer',
                background: filters.category === cat.key ? `${cat.color}25` : 'rgba(255,255,255,0.05)',
                color: filters.category === cat.key ? cat.color : 'rgba(255,255,255,0.5)',
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                border: filters.category === cat.key ? `1px solid ${cat.color}40` : '1px solid transparent',
              }}
            >
              {cat.icon} {cat.label.replace(/^[^\s]+\s*/, '')}
            </Badge>
          ))}
        </div>

        {/* Status filter */}
        <Form.Select
          size="sm"
          value={filters.status}
          onChange={(e) => update({ status: e.target.value as MissionStatus | 'all' })}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            borderRadius: '8px',
            width: 'auto',
            minWidth: '130px',
          }}
        >
          <option value="all">Všechny stavy</option>
          <option value="active">🎯 Aktivní</option>
          <option value="completed">✅ Dokončené</option>
          <option value="paused">⏸️ Pozastavené</option>
        </Form.Select>

        {/* Sort */}
        <Form.Select
          size="sm"
          value={filters.sortBy}
          onChange={(e) => update({ sortBy: e.target.value as MissionFilterState['sortBy'] })}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            borderRadius: '8px',
            width: 'auto',
            minWidth: '140px',
          }}
        >
          <option value="newest">Nejnovější</option>
          <option value="oldest">Nejstarší</option>
          <option value="progress">Pokrok ↓</option>
          <option value="priority">Priorita ↓</option>
          <option value="xp">XP ↓</option>
        </Form.Select>
      </div>
    </div>
  );
}
