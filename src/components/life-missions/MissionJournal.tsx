'use client';

import React, { useState } from 'react';
import { Button, Form, Badge } from 'react-bootstrap';
import { MissionJournalEntry, JournalMood, MOOD_CONFIG } from '@/types/life-missions';
import { formatDate, generateId } from '@/lib/life-missions/utils';

interface MissionJournalProps {
  entries: MissionJournalEntry[];
  onAddEntry: (entry: MissionJournalEntry) => void;
}

export default function MissionJournal({ entries, onAddEntry }: MissionJournalProps) {
  const [text, setText] = useState('');
  const [mood, setMood] = useState<JournalMood>('neutral');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddEntry({
      id: generateId(),
      date: new Date().toISOString(),
      text: text.trim(),
      mood,
    });
    setText('');
    setMood('neutral');
    setIsAdding(false);
  };

  return (
    <div
      style={{
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '20px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h5 style={{ color: '#fff', margin: 0, fontSize: '1.1rem' }}>📓 Deník mise</h5>
        <Button
          size="sm"
          variant="outline-light"
          onClick={() => setIsAdding(!isAdding)}
          style={{ borderRadius: '8px', fontSize: '0.8rem' }}
        >
          {isAdding ? 'Zrušit' : '+ Přidat záznam'}
        </Button>
      </div>

      {isAdding && (
        <Form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Jak se ti dnes dařilo? Co jsi udělal/a?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              borderRadius: '10px',
              marginBottom: '10px',
              resize: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(Object.keys(MOOD_CONFIG) as JournalMood[]).map((m) => (
                <span
                  key={m}
                  onClick={() => setMood(m)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    opacity: mood === m ? 1 : 0.4,
                    transform: mood === m ? 'scale(1.2)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                  }}
                  title={MOOD_CONFIG[m].label}
                >
                  {MOOD_CONFIG[m].icon}
                </span>
              ))}
            </div>
            <Button
              type="submit"
              size="sm"
              variant="success"
              disabled={!text.trim()}
              style={{ borderRadius: '8px' }}
            >
              Uložit
            </Button>
          </div>
        </Form>
      )}

      {entries.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', margin: '20px 0', fontSize: '0.9rem' }}>
          Zatím žádné záznamy. Začni psát svůj deník! ✍️
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
          {[...entries].reverse().map((entry) => {
            const moodConfig = MOOD_CONFIG[entry.mood];
            return (
              <div
                key={entry.id}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
                    {formatDate(entry.date)}
                  </span>
                  <Badge
                    bg=""
                    style={{
                      background: `${moodConfig.color}20`,
                      color: moodConfig.color,
                      fontSize: '0.7rem',
                    }}
                  >
                    {moodConfig.icon} {moodConfig.label}
                  </Badge>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {entry.text}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
