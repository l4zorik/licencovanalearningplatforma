# 🎮 COMPLETE GAMIFICATION SYSTEM PLAN
## Life OS + Projekty + Algoritmy = Ultimate Game Experience

## Objective
Create an addictive, fully gamified platform where EVERY action gives XP, progress is visible everywhere, and users can't stop because of dopamine loops.

## Architecture Overview
```
🏠 HOME DASHBOARD
│
├── 🚀 PROJEKTY (nadtéma)
│   ├── 📊 Dashboard s grafama
│   ├── 📦 Projekty (připojené k Cílům)
│   └── 🔐 Algoritmy (denní logy)
│
├── 🎯 CÍLE (přejmenované z LIFE OS)
│   ├── 🎯 Life Goals (hlavní cíle)
│   └── 🔗 Propojené Projekty
│
├── 🎮 GAMIFIKACE (všude)
│   ├── ⭐ XP System
│   ├── 🆙 Level System
│   ├── 🏆 Achievements
│   ├── 🔥 Streaks
│   ├── 📈 Progression Bars
│   ├── 🎯 Quests/Daily Missions
│   └── 👥 Leaderboards
│
└── 📊 ANALYTICS
    └── 📉 Graphs & Stats
```

## ============================================================================
## PHASE 1: XP & LEVEL SYSTEM (Foundation)
## ============================================================================

### Files to Create/Modify:
- `src/lib/gamification/xp-system.ts` - XP calculation engine
- `src/lib/gamification/levels.ts` - Level definitions
- `src/types/gamification.ts` - New types

### Features:
- [ ] XP za dokončení algoritmu (základní: 10-50 XP)
- [ ] XP za dokončení milníku (50-200 XP)
- [ ] XP za dokončení projektu (500-2000 XP)
- [ ] XP za splnění cíle (5000-20000 XP)
- [ ] XP za denní streak bonus (2x XP ten den)
- [ ] XP za první algoritmus dne (bonus 5 XP)
- [ ] Combo bonusy (5 algoritmů = +25% XP)
- [ ] Level up celebrace (animace, zvuk, confetti)

### Level System:
```
Level 1-10:    "Nováček"      (0 - 1,000 XP)
Level 11-20:   "Pokročilý"    (1,001 - 5,000 XP)
Level 21-30:   "Expert"       (5,001 - 15,000 XP)
Level 31-40:   "Mistr"        (15,001 - 35,000 XP)
Level 41-50:   "Legendární"   (35,001 - 75,000 XP)
Level 51+:     "Neohrožený"   (75,000+ XP)
```

## ============================================================================
## PHASE 2: ACHIEVEMENTS SYSTEM
## ============================================================================

### Files to Create/Modify:
- `src/lib/gamification/achievements.ts` - Achievement definitions
- `src/components/gamification/AchievementToast.tsx` - Popup notifikace
- `src/components/gamification/AchievementsGallery.tsx` - Gallery view

### Achievement Categories:
1. **🔰 Starter** (začátečnické)
   - "První krok" - dokončit první algoritmus
   - "Začínáme" - vytvořit první projekt
   - "Cesta začíná" - nastavit první cíl

2. **🔥 Streaks** (streaky)
   - "Týdenní" - 7 dní v řadě
   - "Měsíční" - 30 dní v řadě
   - "Sto dní" - 100 dní v řadě
   - "Neúnavný" - 365 dní v řadě

3. **🎯 Milestones** (milníky)
   - "10 algoritmů" - logovat 10 algoritmů
   - "100 algoritmů" - logovat 100 algoritmů
   - "1000 algoritmů" - logovat 1000 algoritmů
   - "První projekt hotov" - dokončit projekt

4. **💪 Skills** (dovednosti)
   - "Python Master" - dokončit Python learning path
   - "CNC Expert" - dokončit CNC skill tree
   - "Security Pro" - dokončit Security certifikace

5. **🏆 Competition** (soutěžní)
   - "Top 10%" - být v top 10% uživatelů
   - "První" - být první v leaderboardu
   - "Vitěz sezóny" - vyhrát sezónní challenge

6. **💰 Wealth** (bohatství)
   - "Milionář" - mít celkový příjem z kurzů 1M Kč
   - "Investor" - investovat 100k Kč

7. **🎓 Education** (vzdělání)
   - "Knihomol" - přečíst 10 knih
   - "Certifikovaný" - získat 5 certifikací
   - "Mentor" - pomoci 10 lidem

### Rarity Tiers:
- 🟢 Common (běžné) - 10 XP
- 🔵 Rare (vzácné) - 50 XP
- 🟣 Epic (epické) - 200 XP
- 🟡 Legendary (legendární) - 500 XP
- 🔥 Mythic (mytické) - 1000 XP

## ============================================================================
## PHASE 3: DAILY QUESTS & MISSIONS
## ============================================================================

### Files to Create/Modify:
- `src/lib/gamification/quests.ts` - Quest definitions
- `src/components/gamification/QuestBoard.tsx` - Quest panel

### Daily Quests (obnovují se každý den):
- [ ] "Ranní ptáče" - dokončit algoritmus do 9:00 (50 XP)
- [ ] "Produktivita" - 5 algoritmů dnes (100 XP)
- [ ] "Učení" - dokončit learning modul (75 XP)
- [ ] "Projekt" - pokrok v projektu (100 XP)
- [ ] "Cíl" - update cíle (50 XP)
- [ ] "Komunita" - sdílet achievement (25 XP)

### Weekly Quests (obnovují se týdně):
- [ ] "Týdenní maraton" - 35+ algoritmů za týden (500 XP)
- [ ] "Masterclass" - dokončit 5 kurzů za týden (300 XP)
- [ ] "Streak Keeper" - 7 dní streak (200 XP)

### Monthly Quests:
- [ ] "Měsíční vitěz" - být v top 3 tento měsíc (2000 XP)
- [ ] "Goal Crusher" - splnit 5 cílů za měsíc (1500 XP)

## ============================================================================
## PHASE 4: STREAK SYSTEM
## ============================================================================

### Files to Create/Modify:
- `src/lib/gamification/streaks.ts` - Streak logic
- `src/components/gamification/StreakDisplay.tsx` - Visual display

### Streak Features:
- **Daily Streak** - denně dokončit alespoň 1 algoritmus
  - 7 dní: 🔥 7 streak + 10% XP bonus
  - 30 dní: 🔥 30 streak + 25% XP bonus
  - 100 dní: 🔥 100 streak + 50% XP bonus
  - 365 dní: 🔥 365 streak + 100% XP bonus

- **Weekly Streak** - 7 algoritmů týdně
- **Project Streak** - 5 dní v řadě na projektu
- **Learning Streak** - denně learning module

### Streak Protection:
- "Streak Freeze" - použít na ochranu streak (získat jako reward)
- "Streak Recovery" - obnovit streak do 24h

## ============================================================================
## PHASE 5: GOAL-PROJECT-ALGORITHM LINKING
## ============================================================================

### Files to Create/Modify:
- `src/types/goals.ts` - Extended goal types
- `src/lib/goals/goal-processor.ts` - Link projects to goals
- `src/data/goals/goal-templates.ts` - Pre-defined goal-project structures

### Goal Structure:
```typescript
interface Goal {
  id: string;
  title: string;           // "Naučit se Python na Senior úroveň"
  category: string;        // "learning"
  priority: 'High' | 'Medium' | 'Low';
  targetXP: number;        // 10000 XP pro tento cíl
  currentXP: number;       // aktuální XP z projektů
  linkedProjects: string[]; // IDs projektů k tomuto cíli
  milestones: Milestone[]; // Mezikroky
  deadline?: string;
  rewards: {
    xp: number;            // Bonus XP za splnění
    achievement?: string;  // Achievement k získání
    badge?: string;        // Badge k získání
  };
}
```

### Pre-defined Goal-Project Trees:

**1. "Senior Python Developer"**
```
🎯 Cíl: Senior Python Developer (50,000 XP)
├── 📦 Projekt 1: Python Basics (10,000 XP)
│   ├── 🔐 Algoritmy: 50 algoritmů
│   └── 🎯 Milníky: Základy, OOP, Decorators
├── 📦 Projekt 2: Web Development (15,000 XP)
│   ├── 🔐 Algoritmy: 100 algoritmů
│   └── 🎯 Milníky: Django, FastAPI, REST
├── 📦 Projekt 3: Data Science (15,000 XP)
│   ├── 🔐 Algoritmy: 100 algoritmů
│   └── 🎯 Milníky: Pandas, NumPy, ML
└── 📦 Projekt 4: Architecture (10,000 XP)
    ├── 🔐 Algoritmy: 50 algoritmů
    └── 🎯 Milníky: Patterns, Testing, CI/CD
```

**2. "CNC Machinist Master"**
```
🎯 Cíl: CNC Machinist Master (30,000 XP)
├── 📦 Projekt 1: Základy Obrábění (7,500 XP)
├── 📦 Projekt 2: CNC Programming (10,000 XP)
├── 📦 Projekt 3: Advanced Techniques (7,500 XP)
└── 📦 Projekt 4: Certification (5,000 XP)
```

**3. "Financial Independence"**
```
🎯 Cíl: Finanční nezávislost (100,000 XP)
├── 📦 Projekt 1: Income Growth (40,000 XP)
├── 📦 Projekt 2: Investment Portfolio (30,000 XP)
├── 📦 Projekt 3: Passive Income (20,000 XP)
└── 📦 Projekt 4: Financial Freedom (10,000 XP)
```

## ============================================================================
## PHASE 6: PROGRESSION VISUALIZATION
## ============================================================================

### Files to Create/Modify:
- `src/components/gamification/LevelProgress.tsx`
- `src/components/gamification/StreakDisplay.tsx`
- `src/components/gamification/QuestTracker.tsx`
- `src/components/gamification/Leaderboard.tsx`
- `src/components/gamification/StatsDashboard.tsx`

### Visual Elements:
1. **Level Progress Bar** (header)
   - Aktuální level
   - XP progress bar
   - XP to next level
   - Level up animation

2. **Streak Flame** (header)
   - 🔥 [číslo] flame
   - Denní streak visual
   - Weekly/monthly streaks

3. **Quest Tracker** (sidebar)
   - Daily quests s progress
   - Weekly quests
   - Click to expand

4. **Achievement Popup** (notification)
   - Když získáš achievement
   - Zvuk efekt
   - Confetti

5. **Leaderboard** (page)
   - Týdenní/Měsíční/All-time
   - Filter by category
   - Your position highlight

## ============================================================================
## PHASE 7: REWARDS & LOOT
## ============================================================================

### Files to Create/Modify:
- `src/lib/gamification/rewards.ts` - Reward system
- `src/components/gamification/RewardChest.tsx` - Loot box

### Reward Types:
1. **XP Boosts**
   - 2x XP na 1 hodinu
   - 1.5x XP na 24 hodin
   - 2x XP na víkend

2. **Streak Items**
   - Streak Freeze (zachrání streak)
   - Streak Doubler (2x streak points)

3. **Cosmetics**
   - Profile badges
   - Avatar frames
   - Theme colors
   - Custom progress bars

4. **Premium Features**
   - Premium courses access
   - Priority support
   - Extra storage

### How to Earn Rewards:
- Achievements (Common → Mythic)
- Quest completion
- Level up
- Streak milestones
- Daily login bonuses

## ============================================================================
## PHASE 8: USER PROFILE & STATS
## ============================================================================

### Files to Create/Modify:
- `src/app/profile/page.tsx` - User profile
- `src/components/gamification/StatsOverview.tsx`

### Profile Stats:
- **Total XP** - celoživotní XP
- **Current Level** - aktuální level
- **Total Algorithms** - celkem algoritmů
- **Total Projects** - celkem projektů
- **Completed Goals** - splněné cíle
- **Achievements** - získané achievements
- **Streaks** - longest/current streaks
- **Time Spent** - celkový čas na platformě
- **Skills Mastered** - počet skillů na 100%

### Profile Badges Display:
```
┌─────────────────────────────────────────┐
│  🏆 Top 1% User                          │
│  🔥 100 Day Streak                       │
│  💎 50 Achievements                       │
│  ⭐ Level 42 - Neohrožený                 │
│  📊 1,247 Algoritmů                       │
│  🎯 15 Dokončených Cílů                   │
└─────────────────────────────────────────┘
```

## ============================================================================
## IMPLEMENTATION ORDER
## ============================================================================

1. **Week 1: Foundation**
   - Day 1-2: XP System + Level definitions
   - Day 3-4: Goal-Project linking structure
   - Day 5-7: Basic achievements + visual bars

2. **Week 2: Core Features**
   - Day 8-10: Streak system
   - Day 11-12: Daily quests
   - Day 13-14: Algorithm logging integration

3. **Week 3: Visuals & Polish**
   - Day 15-17: Progression visualizations
   - Day 18-19: Profile stats
   - Day 20: Leaderboards

4. **Week 4: Rewards & Social**
   - Day 21-22: Reward system
   - Day 23-24: Notifications + Popups
   - Day 25-28: Testing + Polish

## ============================================================================
## SUCCESS CRITERIA
## ============================================================================

- [ ] Každý uživatel má visible level a XP progress
- [ ] Každý cíl má připojené projekty
- [ ] Každý projekt má milestones a algoritmy
- [ ] Achievements se odemykají postupně
- [ ] Streaky fungují a motivují
- [ ] Daily quests existují a dávají bonusy
- [ ] Leaderboards existují
- [ ] Profile ukazuje všechny statistiky
- [ ] Odměny jsou motivující
- [ ] Všechno je clickable a interaktivní
- [ ] Zero TypeScript errors

## ============================================================================
