'use client';

import React, { useState, useMemo } from 'react';
import { Card, Table, Badge, Button, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { Leaderboard, LeaderboardType, LeaderboardTimeframe, LeaderboardEntry, LEADERBOARD_CONFIGS, getRankColor, getRankEmoji, getRewardForRank } from '@/types/leaderboard';
import { formatXP } from '@/lib/gamification/xp-system';

interface LeaderboardWidgetProps {
  leaderboard: Leaderboard;
  currentUserId?: string;
  onTimeframeChange?: (timeframe: LeaderboardTimeframe) => void;
  onTypeChange?: (type: LeaderboardType) => void;
}

export function LeaderboardWidget({ 
  leaderboard, 
  currentUserId,
  onTimeframeChange,
  onTypeChange 
}: LeaderboardWidgetProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState<LeaderboardTimeframe>(leaderboard.timeframe);
  
  const config = LEADERBOARD_CONFIGS[leaderboard.type];
  
  const filteredEntries = useMemo(() => {
    if (!searchQuery) return leaderboard.entries.slice(0, 50);
    return leaderboard.entries
      .filter(e => e.username.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 50);
  }, [leaderboard.entries, searchQuery]);
  
  const currentUserEntry = useMemo(() => {
    return leaderboard.entries.find(e => e.userId === currentUserId);
  }, [leaderboard.entries, currentUserId]);
  
  const handleTimeframeChange = (newTimeframe: LeaderboardTimeframe) => {
    setTimeframe(newTimeframe);
    onTimeframeChange?.(newTimeframe);
  };
  
  return (
    <Card className="leaderboard-widget" style={{
      background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '16px',
      overflow: 'hidden'
    }}>
      <Card.Header style={{
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px 16px 0 0 !important',
        border: 'none'
      }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '1.5rem' }}>{config.icon}</span>
            <div>
              <h5 className="mb-0 text-white">{config.title}</h5>
              <small className="text-white-50">{config.description}</small>
            </div>
          </div>
          
          <div className="d-flex gap-2">
            {(['all', 'monthly', 'weekly', 'daily'] as LeaderboardTimeframe[]).map((tf) => (
              <Button 
                key={tf}
                variant={timeframe === tf ? 'light' : 'outline-light'}
                size="sm"
                onClick={() => handleTimeframeChange(tf)}
              >
                {tf === 'all' ? 'Vše' : tf === 'monthly' ? 'Měsíc' : tf === 'weekly' ? 'Týden' : 'Den'}
              </Button>
            ))}
          </div>
        </div>
      </Card.Header>
      
      <Card.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}>
            🔍
          </InputGroup.Text>
          <Form.Control
            placeholder="Hledat uživatele..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: 'none', 
              color: 'white'
            }}
          />
        </InputGroup>

        {currentUserEntry && (
          <div className="p-3 mb-3 rounded" style={{
            background: 'linear-gradient(90deg, #667eea20, #764ba220)',
            border: '1px solid #667eea60'
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <span style={{ 
                  fontSize: '1.5rem', 
                  color: getRankColor(currentUserEntry.rank),
                  width: '40px',
                  textAlign: 'center'
                }}>
                  {getRankEmoji(currentUserEntry.rank)}
                </span>
                <div>
                  <div className="text-white fw-bold">
                    {currentUserEntry.username} 
                    {currentUserEntry.isOnline && <Badge bg="success" className="ms-2">Online</Badge>}
                  </div>
                  <small className="text-white-50">
                    Level {currentUserEntry.level} • {currentUserEntry.title}
                  </small>
                </div>
              </div>
              <div className="text-end">
                <div className="text-white fw-bold">{formatXP(currentUserEntry.score)} XP</div>
                <small className="text-white-50">
                  #{currentUserEntry.rank} • 
                  <span className={currentUserEntry.change > 0 ? 'text-success' : currentUserEntry.change < 0 ? 'text-danger' : 'text-white-50'}>
                    {currentUserEntry.change > 0 ? '↑' : currentUserEntry.change < 0 ? '↓' : '—'} {Math.abs(currentUserEntry.change)}
                  </span>
                </small>
              </div>
            </div>
          </div>
        )}

        <div className="leaderboard-table" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Table variant="dark" hover responsive className="mb-0">
            <thead style={{ position: 'sticky', top: 0, background: '#1a1a2e', zIndex: 1 }}>
              <tr>
                <th style={{ width: '60px' }}>Rank</th>
                <th>Uživatel</th>
                <th style={{ width: '100px' }}>Level</th>
                <th style={{ width: '120px' }}>{leaderboard.type === 'streak' ? 'Streak' : 'XP'}</th>
                <th style={{ width: '60px' }}>Změna</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => {
                const reward = getRewardForRank(entry.rank);
                const isTop3 = entry.rank <= 3;
                
                return (
                  <tr 
                    key={entry.userId}
                    className={entry.userId === currentUserId ? 'table-active' : ''}
                    style={isTop3 ? { background: `${getRankColor(entry.rank)}15` } : {}}
                  >
                    <td>
                      <span style={{ 
                        fontSize: isTop3 ? '1.3rem' : '1rem',
                        color: getRankColor(entry.rank)
                      }}>
                        {getRankEmoji(entry.rank)}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div 
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: entry.titleColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.9rem'
                          }}
                        >
                          {entry.avatar || entry.username[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white">
                            {entry.username}
                            {entry.isOnline && <span className="online-dot ms-2" />}
                          </div>
                          <small className="text-white-50">{entry.title}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge bg="secondary">Lv.{entry.level}</Badge>
                    </td>
                    <td>
                      <span className="text-white fw-bold">
                        {leaderboard.type === 'streak' 
                          ? `${entry.score} 🔥` 
                          : formatXP(entry.score)
                        }
                      </span>
                    </td>
                    <td>
                      <span className={
                        entry.change > 0 ? 'text-success' : 
                        entry.change < 0 ? 'text-danger' : 'text-white-50'
                      }>
                        {entry.change > 0 ? '↑' : entry.change < 0 ? '↓' : '—'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        {leaderboard.seasonEnd && (
          <div className="mt-3 p-2 rounded text-center" style={{ background: 'rgba(255,193,7,0.1)' }}>
            <small className="text-warning">
              🏆 Sezóna končí {new Date(leaderboard.seasonEnd).toLocaleDateString('cs-CZ')} • 
              Top 100 získává odměny!
            </small>
          </div>
        )}
      </Card.Body>

      <style jsx>{`
        :global(.online-dot) {
          width: 8px;
          height: 8px;
          background: #4caf50;
          border-radius: 50%;
          display: inline-block;
        }
        :global(.leaderboard-widget .table-dark th),
        :global(.leaderboard-widget .table-dark td) {
          border-color: rgba(255,255,255,0.1);
        }
        :global(.leaderboard-widget .table-hover tbody tr:hover) {
          background: rgba(255,255,255,0.05) !important;
        }
      `}</style>
    </Card>
  );
}

export function LeaderboardPage() {
  const [activeType, setActiveType] = useState<LeaderboardType>('xp');
  
  const types: LeaderboardType[] = ['xp', 'streak', 'achievements', 'projects', 'learning', 'weekly'];
  
  return (
    <div>
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {types.map((type) => (
          <Button
            key={type}
            variant={activeType === type ? 'primary' : 'outline-secondary'}
            onClick={() => setActiveType(type)}
          >
            {LEADERBOARD_CONFIGS[type].icon} {LEADERBOARD_CONFIGS[type].title}
          </Button>
        ))}
      </div>
      <LeaderboardWidget 
        leaderboard={{
          id: 'test',
          type: activeType,
          timeframe: 'weekly',
          entries: [],
          totalUsers: 100,
          lastUpdated: new Date(),
          rewards: []
        }}
      />
    </div>
  );
}
