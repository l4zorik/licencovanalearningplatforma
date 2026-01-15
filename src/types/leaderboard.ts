export type LeaderboardType = 'xp' | 'streak' | 'achievements' | 'projects' | 'learning' | 'weekly';
export type LeaderboardTimeframe = 'all' | 'monthly' | 'weekly' | 'daily';

export type LeaderboardEntry = {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  level: number;
  score: number;
  previousRank?: number;
  change: number;
  title: string;
  titleColor: string;
  country?: string;
  isOnline: boolean;
};

export type Leaderboard = {
  id: string;
  type: LeaderboardType;
  timeframe: LeaderboardTimeframe;
  entries: LeaderboardEntry[];
  totalUsers: number;
  lastUpdated: Date;
  seasonStart?: Date;
  seasonEnd?: Date;
  rewards: LeaderboardReward[];
};

export type LeaderboardReward = {
  rankStart: number;
  rankEnd: number;
  xpReward: number;
  goldReward: number;
  badge?: {
    name: string;
    icon: string;
  };
  title?: string;
};

export const LEADERBOARD_CONFIGS: Record<LeaderboardType, { icon: string; title: string; description: string }> = {
  xp: { icon: '⭐', title: 'XP Žebříček', description: 'Nejvíce nasbíraných XP' },
  streak: { icon: '🔥', title: 'Streak Žebříček', description: 'Nejdelší streak v řadě' },
  achievements: { icon: '🏆', title: 'Achievement Žebříček', description: 'Nejvíce achievementů' },
  projects: { icon: '📁', title: 'Projektový žebříček', description: 'Nejvíce dokončených projektů' },
  learning: { icon: '📚', title: 'Learning Žebříček', description: 'Nejvíce hodin učení' },
  weekly: { icon: '⚡', title: 'Týdenní žebříček', description: 'Nejaktivnější tento týden' },
};

export const SEASONAL_REWARDS: LeaderboardReward[] = [
  { rankStart: 1, rankEnd: 1, xpReward: 10000, goldReward: 500, badge: { name: 'Šampion', icon: '👑' }, title: 'Šampion' },
  { rankStart: 2, rankEnd: 2, xpReward: 7500, goldReward: 400, badge: { name: 'Vicemistr', icon: '🥈' } },
  { rankStart: 3, rankEnd: 3, xpReward: 5000, goldReward: 300, badge: { name: 'Bronzový', icon: '🥉' } },
  { rankStart: 4, rankEnd: 10, xpReward: 2500, goldReward: 150 },
  { rankStart: 11, rankEnd: 50, xpReward: 1000, goldReward: 75 },
  { rankStart: 51, rankEnd: 100, xpReward: 500, goldReward: 50 },
];

export function getRankChange(entry: LeaderboardEntry): string {
  if (entry.change > 0) return `↑${entry.change}`;
  if (entry.change < 0) return `↓${Math.abs(entry.change)}`;
  return '—';
}

export function getRankColor(rank: number): string {
  if (rank === 1) return '#ffc107';
  if (rank === 2) return '#9e9e9e';
  if (rank === 3) return '#cd7f32';
  return '#78909c';
}

export function getRankEmoji(rank: number): string {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `${rank}.`;
}

export function getRewardForRank(rank: number): LeaderboardReward | undefined {
  return SEASONAL_REWARDS.find(r => rank >= r.rankStart && rank <= r.rankEnd);
}

export function generateMockLeaderboard(
  type: LeaderboardType,
  timeframe: LeaderboardTimeframe,
  currentUserId: string
): Leaderboard {
  const entries: LeaderboardEntry[] = [];
  const names = [
    'Alex', 'Jordan', 'Casey', 'Taylor', 'Morgan', 'Riley', 'Quinn', 'Avery', 
    'Parker', 'Cameron', 'Dakota', 'Reese', 'Skyler', 'Drew', 'Blake', 'Charlie'
  ];
  
  const titles = [
    { title: 'Neohrožený', color: '#ffc107' },
    { title: 'Expert', color: '#ff9800' },
    { title: 'Master', color: '#f44336' },
    { title: 'Veterán', color: '#2196f3' },
    { title: 'Praktikant', color: '#4caf50' },
  ];
  
  for (let i = 0; i < 100; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const change = Math.floor(Math.random() * 21) - 10;
    
    entries.push({
      rank: i + 1,
      userId: `user_${i}`,
      username: `${name}${Math.floor(Math.random() * 1000)}`,
      level: Math.floor(Math.random() * 25) + 1,
      score: Math.floor(Math.random() * 100000) - (i * 1000),
      previousRank: i + 1 + change,
      change,
      title: titles[Math.floor(Math.random() * titles.length)].title,
      titleColor: titles[Math.floor(Math.random() * titles.length)].color,
      isOnline: Math.random() > 0.7,
      country: ['CZ', 'SK', 'PL', 'DE', 'UK', 'US'][Math.floor(Math.random() * 6)]
    });
  }
  
  return {
    id: `${type}_${timeframe}`,
    type,
    timeframe,
    entries,
    totalUsers: entries.length,
    lastUpdated: new Date(),
    seasonStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    seasonEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    rewards: SEASONAL_REWARDS
  };
}
