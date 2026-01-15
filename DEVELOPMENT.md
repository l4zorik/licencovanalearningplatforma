# Tomas Learning Platform - Vývojová Dokumentace

**Poslední aktualizace**: 2026-01-15  
**Verze**: v0.3.0  
**Repo**: https://github.com/l4zorik/licencovanalearningplatforma  
**Licence**: GNU GPLv3.0

---

## 📋 Obsah

1. [Přehled Projektu](#přehled-projektu)
2. [Technologie](#technologie)
3. [Struktura Projektu](#struktura-projektu)
4. [Hlavní Funkce](#hlavní-funkce)
5. [Gamifikace Systém](#gamifikace-systém)
6. [Databáze a Typy](#databáze-a-typy)
7. [Komponenty](#komponenty)
8. [Stránky](#stránky)
9. [Instalace a Spuštění](#instalace-a-spuštění)
10. [Přispívání](#přispívání)

---

## 1. Přehled Projektu

Tomas Learning Platform je komplexní vzdělávací platforma s gamifikací, která kombinuje:
- **Skill tracking** - sledování dovedností
- **Job board** - nabídky práce
- **Projekty a algoritmy** - denní logování pokroku
- **Cíle (Life OS)** - osobní a kariérní cíle
- **Gamifikace** - XP, levely, achievements, streaks

### Hlavní Cíle
- Pomoci uživatelům dosáhnout kariérních cílů
- Sledovat pokrok v reálném čase
- Motivovat přes gamifikaci (dopaminové smyčky)
- Propojit učení s praxí (projekty, algoritmy)

---

## 2. Technologie

### Frontend
- **Next.js 16** - React framework s App Router
- **React 19** - UI knihovna
- **TypeScript 5** - Typová bezpečnost
- **Bootstrap 5** - CSS framework
- **React Bootstrap** - React komponenty

### Backend
- **Next.js API Routes** - Serverless API
- **Prisma ORM** - Database ORM
- **SQLite** - Vývojová databáze
- **NextAuth.js** - Autentifikace

### Další
- **Recharts** - Charts a grafy
- **@dnd-kit** - Drag & drop
- **Zod** - Validace

---

## 3. Struktura Projektu

```
pracovnivzdelavaciplatforma/
├── src/
│   ├── app/                    # Next.js App Router stránky
│   │   ├── page.tsx            # Hlavní dashboard
│   │   ├── projects/           # Projekty stránka
│   │   ├── achievements/       # Achievementy
│   │   ├── roadmap/            # Kariérní roadmap
│   │   ├── journey/            # User journey
│   │   ├── missions/           # Mise
│   │   ├── courses/            # Kurzy
│   │   ├── quick-courses/      # Rychlokurzy
│   │   ├── articles/           # Články
│   │   └── api/                # API routes
│   │
│   ├── components/             # React komponenty
│   │   ├── gamification/       # Gamifikace komponenty
│   │   ├── jobs/               # Job board komponenty
│   │   ├── skills/             # Skills komponenty
│   │   ├── EducationSection.tsx
│   │   ├── WorkSection.tsx
│   │   ├── AkizeGuide.tsx
│   │   └── ...
│   │
│   ├── lib/                    # Utility funkce
│   │   ├── gamification/       # Gamifikace logika
│   │   │   ├── xp-system.ts    # XP výpočty
│   │   │   ├── levels.ts       # Level definice
│   │   │   ├── achievements.ts # Achievementy
│   │   │   ├── milestones.ts   # Milestony
│   │   │   └── roadmap.ts      # Roadmapy
│   │   ├── data/               # Datové soubory
│   │   │   ├── projects/       # Projekty data
│   │   │   ├── jobs/           # Job data
│   │   │   ├── missions.ts     # Mise
│   │   │   └── agencies.ts     # Agentury
│   │   ├── auth.ts             # Autentifikace
│   │   └── prisma.ts           # Prisma klient
│   │
│   ├── types/                  # TypeScript typy
│   │   └── index.ts            # Hlavní typy
│   │   └── projects.ts         # Project typy
│   │
│   └── styles/                 # CSS styly
│       └── design-system.css
│
├── prisma/                     # Databáze
│   ├── schema.prisma           # Schema
│   └── migrations/
│
├── PLANS/                      # Plánovací dokumenty
│   └── COMPLETE_GAMIFICATION.md
│
├── CHANGELOG.md                # Historie změn
├── README.md                   # README
├── LICENSE                     # GNU GPLv3
└── package.json
```

---

## 4. Hlavní Funkce

### 🎯 Cíle (dříve Life OS 2026)
- Osobní a kariérní cíle
- 13 kategorií (Učení, Práce, Vztahy, Rodina, atd.)
- Progress tracking
- Prioritizace (High, Medium, Low)
- Deadline sledování

### 🚀 Projekty
- Předpřipravené projekty pro různé cíle
- Vlastní projekt tvorba
- Šablony projektů
- Milníky v projektech
- Algoritmy (denní logy)

### 🔐 Algoritmy
- 14 typů (učení, kódování, debugging, atd.)
- Logování s detaily
- Trvání a výsledky
- Tagy pro organizaci
- XP odměny

### 💼 Job Board
- Nabídky práce
- Drag & drop do skill boardu
- Company ratings
- Interview preparation
- Salary benchmarks

### 📚 Vzdělávání
- Skill tracking
- Kurzy
- Rychlokurzy
- Články
- Certification paths

---

## 5. Gamifikace Systém

### 5.1 XP System

#### Základní XP Hodnoty

| Akce | XP |
|------|-----|
| Algoritmus (základní) | 15-35 |
| Milestone | 100 |
| Projekt | 500 |
| Cíl | 2000 |
| Daily streak bonus | +10-25% |
| Combo bonus | +5-30% |

#### XP Multipliers

**Level Bonus:**
```
Level 1-5:   0-20% bonus
Level 10:    50% bonus
Level 20:    125% bonus
```

**Streak Bonus:**
- 7+ dní: +10% XP
- 30+ dní: +25% XP

**Combo Bonus:**
- 5+ algoritmů/den: +5%
- 10 algoritmů/den: +30%

**První algoritmus dne:** +10 XP

#### Daily XP Cap: 5000 XP

### 5.2 Level System (30 levelů)

| Level | XP Required | Titul | Barva |
|-------|-------------|-------|-------|
| 1 | 0 | Nováček | #78909c |
| 5 | 800 | Vojín | #ff9800 |
| 10 | 4,000 | Veteran | #ffc107 |
| 15 | 12,000 | Super hrdina | #f44336 |
| 20 | 30,000 | Neohrožený | #ffeb3b |
| 30 | 150,000 | Majster | #ffc107 |

### 5.3 Achievements (35+)

#### Kategorie

1. **🔰 Starter** (4) - Začátečnické
2. **🔥 Streaks** (4) - Denní aktivita
3. **🎯 Milestones** (8) - Milníky
4. **💪 Skills** (5) - Dovednosti
5. **🏆 Competition** (3) - Soutěžní
6. **💰 Wealth** (3) - Bohatství
7. **🎓 Education** (5) - Vzdělání

#### Rarity

| Rarity | Barva | XP |
|--------|-------|-----|
| Common | 🟢 Šedá | 10 |
| Rare | 🔵 Modrá | 50 |
| Epic | 🟣 Fialová | 200 |
| Legendary | 🟡 Zlatá | 500 |
| Mythic | 🔥 Červená | 1000 |

### 5.4 Streaks

- Denní streak za alespoň 1 algoritmus
- Streak flame vizualizace
- Bonusy za delší streak
- Streak protection (plánováno)

---

## 6. Databáze a Typy

### 6.1 Hlavní Typy (`src/types/index.ts`)

```typescript
// User & Auth
type User, Session, Auth

// Skills & Learning
type SkillCategory, ProficiencyLevel, CareerPath
type SkillData, SkillAssessment, SkillGap

// Jobs & Career
type Job, JobStatus, JobCategory
type CompanyProfile, SalaryData
type InterviewType, ApplicationStep

// Gamifikace
type Achievement, AchievementCategory, AchievementRarity
type Milestone, MilestoneCategory
type RoadmapPhase

// Missions & Courses
type Mission, MissionCategory, MissionObjective
type Course, CourseModule
```

### 6.2 Project Typy (`src/types/projects.ts`)

```typescript
type ProjectStatus = 'active' | 'completed' | 'paused' | 'archived'
type ProjectPriority = 'high' | 'medium' | 'low'
type AlgorithmType = 'learning' | 'coding' | 'debugging' | ... // 14 types

type Project = {
  id: string
  title: string
  description: string
  category: string
  status: ProjectStatus
  priority: ProjectPriority
  goals: string[]
  milestones: ProjectMilestone[]
  algorithms: AlgorithmLog[]
  skills: string[]
  technologies: string[]
  startDate: Date
  totalHours: number
  xpReward: number
  progress: number
  streak: number
}

type AlgorithmLog = {
  id: string
  projectId: string
  timestamp: Date
  type: AlgorithmType
  title: string
  description: string
  duration: number
  outcome: 'success' | 'partial' | 'failure' | 'learning'
  xpEarned: number
  tags: string[]
}
```

---

## 7. Komponenty

### Gamifikace Komponenty

| Komponenta | Popis |
|------------|-------|
| `AchievementsGallery.tsx` | Galerie achievementů |
| `UserProgressCard.tsx` | Karta s levelem a XP |
| `MilestonesTracker.tsx` | Sledování milestone |
| `RoadmapDisplay.tsx` | Vizualizace roadmapy |
| `UserJourneyRoadmap.tsx` | Vizuální cesta uživatele |

### Hlavní Komponenty

| Komponenta | Popis |
|------------|-------|
| `EducationSection.tsx` | Skill tree a vzdělávání |
| `WorkSection.tsx` | Job board |
| `AkizeGuide.tsx` | AI asistent |
| `ProgressAnalytics.tsx` | Analytics dashboard |
| `WaveBackground.tsx` | Animované pozadí |

---

## 8. Stránky

| Cesta | Popis |
|-------|-------|
| `/` | Hlavní dashboard s Projekty a Cíli |
| `/projects` | Projekty a algoritmy |
| `/achievements` | Achievementy a milestones |
| `/roadmap` | Kariérní roadmap |
| `/journey` | User journey vizualizace |
| `/missions` | Seznam misí |
| `/missions/[id]` | Detail mise |
| `/courses` | Kurzy |
| `/quick-courses` | Rychlokurzy |
| `/quick-courses/[id]` | Detail rychlokurzu |
| `/articles` | Články |
| `/articles/[id]` | Detail článku |

---

## 9. Instalace a Spuštění

### Požadavky
- Node.js 18+
- npm nebo yarn

### Instalace

```bash
# Klonování repozitáře
git clone https://github.com/l4zorik/licencovanalearningplatforma.git
cd licencovanalearningplatforma

# Instalace závislostí
npm install

# Generování Prisma klienta
npx prisma generate

# Spuštění vývojového serveru
npm run dev
```

### Důležité Příkazy

```bash
# Spuštění
npm run dev          # Vývojový server na port 3000
npm run build        # Build pro produkci
npm start            # Spuštění produkčního buildu
npm run lint         # Linting

# Databáze
npx prisma generate  # Generovat klienta
npx prisma db push   # Push schema do databáze
npx prisma studio    # Otevřít Prisma Studio

# TypeScript
npx tsc --noEmit     # Kontrola typů
```

### Environment Variables

Vytvoř `.env.local`:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 10. Přispívání

### Jak přispět

1. Fork repozitáře
2. Vytvoř feature branch: `git checkout -b feature/AmazingFeature`
3. Commit změn: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Otevř Pull Request

### Konvence

- **Branch naming**: `feature/`, `fix/`, `docs/`, `refactor/`
- **Commits**: Czech nebo English, popisné
- **Code style**: ESLint + Prettier
- **Tests**: Přidat testy pro nové funkce
- **Docs**: Aktualizovat dokumentaci

### Code Review

- Všechny PR musí projít review
- Musí projít CI/CD pipeline
- Musí mít minimálně 1 approval

---

## 📈 Roadmap

### v0.3.1 (Plánováno)
- [ ] Daily Quests systém
- [ ] Streak protection (freeze)
- [ ] Goal-Project-Algo linking
- [ ] User profile stránka

### v0.4.0 (Plánováno)
- [ ] Leaderboards
- [ ] Rewards/Loot system
- [ ] Achievement popup notifikace
- [ ] Level-up animace

### v0.5.0 (Plánováno)
- [ ] LinkedIn integration
- [ ] GitHub integration
- [ ] Video kurzy
- [ ] Mobile app

---

## 📞 Kontakt

- **GitHub**: https://github.com/l4zorik/licencovanalearningplatforma
- **Issues**: https://github.com/l4zorik/licencovanalearningplatforma/issues

---

## 📜 Licence

Tento projekt je licencován pod **GNU General Public License v3.0**.

 Viz LICENSE soubor pro detaily.
