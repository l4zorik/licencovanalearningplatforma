export type RewardType = 'xp' | 'gold' | 'gems' | 'badge' | 'title' | 'consumable' | 'mystery_box';
export type RewardRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
export type BoxType = 'basic' | 'premium' | 'epic' | 'legendary';

export type Reward = {
  id: string;
  type: RewardType;
  name: string;
  description: string;
  icon: string;
  rarity: RewardRarity;
  value?: number;
  canStack: boolean;
  maxStack?: number;
};

export type LootBox = {
  id: string;
  type: BoxType;
  name: string;
  description: string;
  icon: string;
  price: number;
  currency: 'gold' | 'gems';
  contents: BoxContent[];
  dropRates: Record<RewardRarity, number>;
};

export type BoxContent = {
  rewardId: string;
  minQuantity: number;
  maxQuantity: number;
  rarity: RewardRarity;
  guaranteed?: boolean;
};

export type UserReward = {
  rewardId: string;
  quantity: number;
  acquiredAt: Date;
  source: string;
};

export type InventoryItem = {
  reward: Reward;
  quantity: number;
};

export const REWARDS: Record<string, Reward> = {
  xp_100: { id: 'xp_100', type: 'xp', name: '100 XP', description: '100 zkušeností', icon: '⭐', rarity: 'common', value: 100, canStack: true, maxStack: 999 },
  xp_500: { id: 'xp_500', type: 'xp', name: '500 XP', description: '500 zkušeností', icon: '⭐', rarity: 'rare', value: 500, canStack: true, maxStack: 999 },
  xp_1000: { id: 'xp_1000', type: 'xp', name: '1000 XP', description: '1000 zkušeností', icon: '🌟', rarity: 'epic', value: 1000, canStack: true, maxStack: 999 },
  xp_5000: { id: 'xp_5000', type: 'xp', name: '5000 XP', description: '5000 zkušeností', icon: '💎', rarity: 'legendary', value: 5000, canStack: true, maxStack: 999 },
  gold_50: { id: 'gold_50', type: 'gold', name: '50 Zlata', description: '50 herní měny', icon: '🪙', rarity: 'common', value: 50, canStack: true, maxStack: 999 },
  gold_200: { id: 'gold_200', type: 'gold', name: '200 Zlata', description: '200 herní měny', icon: '🪙', rarity: 'rare', value: 200, canStack: true, maxStack: 999 },
  gold_1000: { id: 'gold_1000', type: 'gold', name: '1000 Zlata', description: '1000 herní měny', icon: '💰', rarity: 'epic', value: 1000, canStack: true, maxStack: 999 },
  gems_10: { id: 'gems_10', type: 'gems', name: '10 Diamantů', description: '10 prémiové měny', icon: '💎', rarity: 'epic', value: 10, canStack: true, maxStack: 999 },
  gems_50: { id: 'gems_50', type: 'gems', name: '50 Diamantů', description: '50 prémiové měny', icon: '💎', rarity: 'legendary', value: 50, canStack: true, maxStack: 999 },
  streak_freeze: { id: 'streak_freeze', type: 'consumable', name: 'Streak Freeze', description: 'Zachrání tvůj streak na 24 hodin', icon: '🧊', rarity: 'rare', canStack: true, maxStack: 10 },
  xp_boost: { id: 'xp_boost', type: 'consumable', name: 'XP Boost', description: '2x XP na 1 hodinu', icon: '⚡', rarity: 'rare', canStack: true, maxStack: 5 },
  mystery_box_basic: { id: 'mystery_box_basic', type: 'mystery_box', name: 'Základní bedna', description: 'Náhodná odměna', icon: '📦', rarity: 'common', canStack: true, maxStack: 50 },
  mystery_box_premium: { id: 'mystery_box_premium', type: 'mystery_box', name: 'Prémiová bedna', description: 'Lepší náhodné odměny', icon: '🎁', rarity: 'rare', canStack: true, maxStack: 20 },
  mystery_box_epic: { id: 'mystery_box_epic', type: 'mystery_box', name: 'Epická bedna', description: 'Výjimečné náhodné odměny', icon: '🧳', rarity: 'epic', canStack: true, maxStack: 10 },
  mystery_box_legendary: { id: 'mystery_box_legendary', type: 'mystery_box', name: 'Legendární bedna', description: 'Tu nejlepší odměnu', icon: '👑', rarity: 'legendary', canStack: true, maxStack: 5 },
  badge_early_adopter: { id: 'badge_early_adopter', type: 'badge' as const, name: 'Early Adopter', description: 'Jeden z prvních uživatelů platformy', icon: '🚀', rarity: 'rare' as const, canStack: false },
  badge_streak_master: { id: 'badge_streak_master', type: 'badge' as const, name: 'Streak Master', description: '30denní streak', icon: '🔥', rarity: 'epic' as const, canStack: false },
  badge_completionist: { id: 'badge_completionist', type: 'badge' as const, name: 'Completionist', description: 'Dokončil všechny achievementy', icon: '🏆', rarity: 'legendary' as const, canStack: false },
  title_legend: { id: 'title_legend', type: 'title' as const, name: 'Legenda', description: 'Speciální titul', icon: '👑', rarity: 'legendary' as const, canStack: false },
};

export const LOOT_BOXES: LootBox[] = [
  {
    id: 'basic_box',
    type: 'basic',
    name: 'Základní bedna',
    description: 'Obsahuje běžné a vzácné odměny',
    icon: '📦',
    price: 100,
    currency: 'gold',
    contents: [
      { rewardId: 'xp_100', minQuantity: 1, maxQuantity: 3, rarity: 'common' },
      { rewardId: 'gold_50', minQuantity: 1, maxQuantity: 2, rarity: 'common' },
      { rewardId: 'xp_500', minQuantity: 1, maxQuantity: 1, rarity: 'rare' },
      { rewardId: 'gold_200', minQuantity: 1, maxQuantity: 1, rarity: 'rare' },
      { rewardId: 'mystery_box_basic', minQuantity: 1, maxQuantity: 1, rarity: 'common', guaranteed: false },
    ],
    dropRates: { common: 0.6, rare: 0.35, epic: 0.04, legendary: 0.01, mythic: 0 }
  },
  {
    id: 'premium_box',
    type: 'premium',
    name: 'Prémiová bedna',
    description: 'Lepší šance na vzácné odměny',
    icon: '🎁',
    price: 25,
    currency: 'gems',
    contents: [
      { rewardId: 'xp_500', minQuantity: 1, maxQuantity: 2, rarity: 'common' },
      { rewardId: 'gold_200', minQuantity: 1, maxQuantity: 2, rarity: 'common' },
      { rewardId: 'xp_1000', minQuantity: 1, maxQuantity: 1, rarity: 'rare' },
      { rewardId: 'gold_1000', minQuantity: 1, maxQuantity: 1, rarity: 'rare' },
      { rewardId: 'mystery_box_premium', minQuantity: 1, maxQuantity: 1, rarity: 'epic' },
      { rewardId: 'streak_freeze', minQuantity: 1, maxQuantity: 1, rarity: 'rare' },
    ],
    dropRates: { common: 0.35, rare: 0.45, epic: 0.15, legendary: 0.05, mythic: 0 }
  },
  {
    id: 'epic_box',
    type: 'epic',
    name: 'Epická bedna',
    description: 'Skvělé odměny včetně badge',
    icon: '🧳',
    price: 50,
    currency: 'gems',
    contents: [
      { rewardId: 'xp_1000', minQuantity: 2, maxQuantity: 3, rarity: 'common' },
      { rewardId: 'gold_1000', minQuantity: 1, maxQuantity: 2, rarity: 'rare' },
      { rewardId: 'xp_5000', minQuantity: 1, maxQuantity: 1, rarity: 'epic' },
      { rewardId: 'mystery_box_epic', minQuantity: 1, maxQuantity: 1, rarity: 'epic' },
      { rewardId: 'badge_early_adopter', minQuantity: 1, maxQuantity: 1, rarity: 'rare', guaranteed: false },
      { rewardId: 'xp_boost', minQuantity: 1, maxQuantity: 1, rarity: 'rare' },
    ],
    dropRates: { common: 0.15, rare: 0.40, epic: 0.35, legendary: 0.10, mythic: 0 }
  },
  {
    id: 'legendary_box',
    type: 'legendary',
    name: 'Legendární bedna',
    description: 'Tu nejlepší odměnu můžeš získat zde!',
    icon: '👑',
    price: 100,
    currency: 'gems',
    contents: [
      { rewardId: 'xp_5000', minQuantity: 1, maxQuantity: 2, rarity: 'epic' },
      { rewardId: 'gems_10', minQuantity: 1, maxQuantity: 1, rarity: 'epic' },
      { rewardId: 'mystery_box_legendary', minQuantity: 1, maxQuantity: 1, rarity: 'legendary' },
      { rewardId: 'badge_streak_master', minQuantity: 1, maxQuantity: 1, rarity: 'epic', guaranteed: false },
      { rewardId: 'title_legend', minQuantity: 1, maxQuantity: 1, rarity: 'legendary', guaranteed: false },
      { rewardId: 'badge_completionist', minQuantity: 1, maxQuantity: 1, rarity: 'legendary', guaranteed: false },
    ],
    dropRates: { common: 0, rare: 0.25, epic: 0.45, legendary: 0.25, mythic: 0.05 }
  }
];

export const RARITY_COLORS: Record<RewardRarity, string> = {
  common: '#9e9e9e',
  rare: '#2196f3',
  epic: '#9c27b0',
  legendary: '#ff9800',
  mythic: '#f44336'
};

export const RARITY_GLOW: Record<RewardRarity, string> = {
  common: 'rgba(158,158,158,0.3)',
  rare: 'rgba(33,150,243,0.3)',
  epic: 'rgba(156,39,176,0.3)',
  legendary: 'rgba(255,152,0,0.3)',
  mythic: 'rgba(244,67,54,0.3)'
};

export function getRandomRewardFromBox(box: LootBox): { reward: Reward; quantity: number } {
  const rand = Math.random();
  let cumulative = 0;
  let selectedRarity: RewardRarity = 'common';
  
  for (const [rarity, rate] of Object.entries(box.dropRates)) {
    cumulative += rate;
    if (rand < cumulative) {
      selectedRarity = rarity as RewardRarity;
      break;
    }
  }
  
  const possibleContents = box.contents.filter(c => c.rarity === selectedRarity);
  const content = possibleContents[Math.floor(Math.random() * possibleContents.length)];
  
  if (!content) {
    return { reward: REWARDS['xp_100'], quantity: 1 };
  }
  
  const quantity = Math.floor(Math.random() * (content.maxQuantity - content.minQuantity + 1)) + content.minQuantity;
  const reward = REWARDS[content.rewardId];
  
  return { reward, quantity };
}

export function openLootBox(box: LootBox, userGold: number, userGems: number): {
  success: boolean;
  error?: string;
  reward?: { reward: Reward; quantity: number };
  newGold?: number;
  newGems?: number;
} {
  const cost = box.price;
  const currency = box.currency;
  
  if (currency === 'gold' && userGold < cost) {
    return { success: false, error: 'Nedostatek zlata' };
  }
  if (currency === 'gems' && userGems < cost) {
    return { success: false, error: 'Nedostatek diamantů' };
  }
  
  const result = getRandomRewardFromBox(box);
  
  return {
    success: true,
    reward: result,
    newGold: currency === 'gold' ? userGold - cost : userGold,
    newGems: currency === 'gems' ? userGems - cost : userGems
  };
}

export function formatRewardValue(reward: Reward): string {
  switch (reward.type) {
    case 'xp': return `${reward.value} XP`;
    case 'gold': return `${reward.value} 🪙`;
    case 'gems': return `${reward.value} 💎`;
    case 'consumable': return 'Spotřebitelný';
    case 'badge': return 'Odznak';
    case 'title': return 'Titul';
    case 'mystery_box': return 'Mystery Box';
    default: return '';
  }
}
