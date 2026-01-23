# Changelog

Všechny podstatné změny v projektu jsou zde zdokumentovány.

---

## [v0.4.0] - 2026-01-23

### 🎨 DESIGN SYSTEM UPGRADE - Premium UI Components

#### Nové Design System
- **Design System V2** (`src/styles/design-system-v2.css`)
  - 8 gradient variant (cosmic, sunset, ocean, forest, fire, aurora, neon, mint)
  - Fluid typography s clamp() funkcemi
  - Rozšířený spacing system (8px grid)
  - Enhanced shadows s colored variants
  - Animation easing functions  
  - Z-index scale pro lepší layering
  - Utility classes (gradient text, glass effect, neomorph)

- **Animation Library** (`src/styles/animations.css`)
  - 20+ keyframe animací
  - Fade, slide, bounce, pulse, float animace
  - Shimmer a glow efekty
  - Hover effect utilities
  - Stagger delay classes pro sekvenční animace
  - GPU-accelerated transforms

#### UI Komponenty

**Card Component** (`src/components/ui/Card.tsx`)
- 5 variant: default, premium, gradient, glass, neon
- Hover transformace a glow efekty
- Gradient border support
- Glassmorphism design
- Neon glow na hover

**Button Component** (`src/components/ui/Button.tsx`)
- 5 variant: primary, gradient, neomorph, outline, ghost
- 3 velikosti: sm, md, lg
- Loading states s spinner animací
- Icon support (left/right position)
- Shimmer efekt na gradient buttons
- Fullwidth option

**Progress Component** (`src/components/ui/Progress.tsx`)
- Gradient progress bars
- Shimmer animation na progress fill
- 3 výšky: sm, md, lg
- Optional label display
- Configurable value/max

**Badge Component** (`src/components/ui/Badge.tsx`)
- 4 varianty: default, gradient, glow, outline
- 5 color options: primary, success, warning, danger, info
- Icon support
- Pulse animation option
- Gradient background support

#### Dashboard Komponenty

**DashboardCard** (`src/components/dashboard/DashboardCard.tsx`)
- Premium dashboard karty s gradient icons
- Trend indicators (↑/↓) s percentages
- Icon animations on hover
- Responsive design
- Category-specific gradients

#### Demo & Dokumentace

**Design Showcase** (`src/app/design-showcase/page.tsx`)
- Kompletní živá ukázka všech komponent
- Dashboard cards s různými gradienty
- Všechny button varianty a velikosti
- Progress bars s animacemi
- Badge showcase
- Animation examples
- Typography ukázky

**Dokumentace**
- `DESIGN_UPGRADE_PROPOSAL.md` - Kompletní návrh upgradu s roadmapou
- `IMPLEMENTATION_GUIDE.md` - Praktický implementační průvodce
- `DESIGN_UPGRADE_REFERENCE.md` - Quick reference guide
- `DESIGN_UPGRADE_COMPLETE.md` - Přehled implementace
- `NEXT_STEPS.md` - Další kroky pro integraci

### 📁 Nové Soubory

| Soubor | Popis |
|--------|-------|
| `src/styles/design-system-v2.css` | Extended design system |
| `src/styles/animations.css` | Animation library |
| `src/components/ui/Card.tsx` | Card component |
| `src/components/ui/Card.module.css` | Card styles |
| `src/components/ui/Button.tsx` | Button component |
| `src/components/ui/Button.module.css` | Button styles |
| `src/components/ui/Progress.tsx` | Progress component |
| `src/components/ui/Progress.module.css` | Progress styles |
| `src/components/ui/Badge.tsx` | Badge component |
| `src/components/ui/Badge.module.css` | Badge styles |
| `src/components/ui/index.ts` | UI exports |
| `src/components/dashboard/DashboardCard.tsx` | Dashboard card |
| `src/components/dashboard/DashboardCard.module.css` | Dashboard styles |
| `src/app/design-showcase/page.tsx` | Demo stránka |

### 🔧 Aktualizované Soubory

| Soubor | Změna |
|--------|-------|
| `src/app/globals.css` | Import design-system-v2 a animations |
| `package.json` | Přidán react-icons |

### 🎨 Design Features

- ✅ 8 gradient variant pro category branding
- ✅ Glassmorphism efekty
- ✅ Neomorphism design
- ✅ Neon glow efekty
- ✅ Premium card variants
- ✅ Animated progress bars
- ✅ Icon support v komponentách
- ✅ Loading states
- ✅ Hover transformations
- ✅ Responsive design
- ✅ Dark mode optimized
- ✅ Accessibility features

### 📊 Performance Optimizations

- GPU-accelerated animations (CSS transforms)
- Optimized for 60 FPS
- Careful use of will-change
- Lazy loading support

### ♿ Accessibility

- Proper ARIA labels
- Keyboard navigation
- Focus states
- WCAG AA color contrast

### 🎯 Next Steps

1. Integrace do hlavního dashboardu
2. Update Projects page s novými kartami
3. Goals section enhancement
4. Achievements gallery redesign

Demo stránka dostupná na: `/design-showcase`

---

## [v0.3.1] - 2026-01-15

### 🎮 Rozšířený Gamifikace Systém

#### Daily Quests Systém
- **Typy** (`src/types/quests.ts`)
  - DailyQuestTemplate, UserQuest, QuestPool, QuestRarity, QuestCategory
  - 4 denní questy + bonus quest (25% šance)
  - 14 typů algoritmů, learning, career, milestone, special questy

- **Quest Data** (`src/data/quests/daily-quests.ts`)
  - 30+ quest šablon s různou obtížností a rarity
  - Procedurální generování questů podle data
  - Rarity system: Common, Rare, Epic, Legendary
  - XP a Gold odměny

- **Quest Logika** (`src/lib/gamification/quest-system.ts`)
  - generateDailyQuestPool(), createUserQuest()
  - updateQuestProgress(), claimQuestReward()
  - Expirace questů, grace period
  - Denní progres tracking

- **Quest UI** (`src/components/gamification/DailyQuestsWidget.tsx`)
  - Widget s progres barem
  - Claim modal s odměnami
  - Animace pro dokončení
  - Časovač do expirace

#### Streak Protection (Freeze)
- **Typy a logika** (`src/lib/gamification/streak-protection.ts`)
  - StreakData, StreakFreeze
  - 1 freezměsíčně + bonusy za levely
  - 24hodinová ochrana streak
  - Grace period 6 hodin
  - Streak bonusy (+10-50% XP)

- **Streak Widget** (`src/components/gamification/StreakWidget.tsx`)
  - Vizualizace streak (fire emoji)
  - Nejdelší streak, celkem aktivních dní
  - Freeze modal s potvrzením
  - Odpočet do dalšího resetu

#### User Profile
- **Typy** (`src/types/profile.ts`)
  - UserProfile, UserStats, UserAchievement, UserBadge
  - RANK_TIERS (8 úrovní od Nováčka po Legend)
  - Activity heatmap data

- **Profile UI** (`src/components/gamification/UserProfileCard.tsx`)
  - Komplexní profil karta
  - 4 záložky: Přehled, Achievementy, Pokrok, Aktivita
  - Radar chart statistik
  - Activity heatmap (52 týdnů)
  - Denní/týdenní progres

#### Leaderboards
- **Typy** (`src/types/leaderboard.ts`)
  - Leaderboard, LeaderboardEntry
  - 6 typů: XP, Streak, Achievements, Projects, Learning, Weekly
  - 4 timeframe: All, Monthly, Weekly, Daily
  - Sezónní odměny pro top 100

- **Leaderboard UI** (`src/components/gamification/LeaderboardWidget.tsx`)
  - Tabulka s rank, username, level, score, změna
  - Zlatý/stříbrný/bronzový rank indikátor
  - Online status indikátor
  - Vyhledávání uživatelů
  - Sezónní odměny panel

#### Rewards/Loot System
- **Typy a logika** (`src/lib/gamification/rewards.ts`)
  - Reward, LootBox, BoxContent
  - 4 typy boxů: Basic (100g), Premium (25gems), Epic (50gems), Legendary (100gems)
  - Drop rates pro rarity (Common → Mythic)
  - XP, Gold, Gems, Badges, Titles, Consumables

- **Loot Box Shop** (`src/components/gamification/LootBoxShop.tsx`)
  - Shop s 4 boxy
  - Preview modal s drop rates
  - Opening animace s confetti
  - Odměna reveal modal

#### Achievement Popup Notifikace
- **Typy** (`src/components/gamification/AchievementPopup.tsx`)
  - AchievementPopup komponenta
  - useNotificationQueue hook
  - Automatické zavírání po 4s
  - Animace achievement ikony
  - Rarity barva a glow efekt

#### Level-Up Celebrace
- **Typy** (`src/components/gamification/LevelUpCelebration.tsx`)
  - LevelUpCelebration modal
  - LevelUpToast komponenta
  - XP counting animace
  - Confetti particle efekt
  - Perks odhalení
  - Velké levely (5, 10, 15, 20, 25, 30) mají speciální odměny

### 📁 Nové Soubory

| Soubor | Popis |
|--------|-------|
| `src/types/quests.ts` | Daily quest typy |
| `src/types/profile.ts` | User profile typy |
| `src/types/leaderboard.ts` | Leaderboard typy |
| `src/data/quests/daily-quests.ts` | 30+ quest šablon |
| `src/lib/gamification/quest-system.ts` | Quest logika |
| `src/lib/gamification/streak-protection.ts` | Streak freeze systém |
| `src/lib/gamification/rewards.ts` | Loot box a rewards |
| `src/components/gamification/DailyQuestsWidget.tsx` | Quests widget |
| `src/components/gamification/StreakWidget.tsx` | Streak widget |
| `src/components/gamification/UserProfileCard.tsx` | Profile karta |
| `src/components/gamification/LeaderboardWidget.tsx` | Leaderboard |
| `src/components/gamification/LootBoxShop.tsx` | Loot box shop |
| `src/components/gamification/AchievementPopup.tsx` | Achievement popup |
| `src/components/gamification/LevelUpCelebration.tsx` | Level-up animace |

### 🎮 v0.3.1 Feature List

- ✅ Daily Quests (4 denně + bonus)
- ✅ Streak Protection (freeze)
- ✅ User Profile s heatmapou
- ✅ Leaderboards (6 typů, 4 timeframe)
- ✅ Rewards/Loot Boxes (4 boxy)
- ✅ Achievement Popup notifikace
- ✅ Level-Up celebrace s confetti

### 📋 Další Plán (v0.3.2)

- [ ] Social features (přátelé, guildy)
- [ ] Team challenges
- [ ] Achievement sharing
- [ ] Custom badges creation
- [ ] Mobile responsive vylepšení

---

## [v0.3.0] - 2026-01-15

### 🚀 PROJEKTY Sekce (Nové Hlavní Nad téma)

#### Nové funkce
- **Projekty Stránka** (`src/app/projects/page.tsx`)
  - Samostatná sekce nad Life OS / Cíle
  - Gamifikovaný header s level, XP, streak, combo meter
  - 3 předpřipravené projekty (Learning Platform, CNC Mastery, AI Agents)
  - Přidávání vlastních projektů ze šablon nebo prázdných

- **Algoritmy Logování**
  - 14 typů algoritmů (učení, kódování, debugging, deployment, atd.)
  - Logování s názvem, popisem, trváním, výsledkem
  - Tagy pro organizaci
  - XP odměny za každý algoritmus

#### Nové Datové Struktury
- `src/types/projects.ts` - Project, ProjectMilestone, AlgorithmLog, AlgorithmType
- `src/data/projects/data.ts` - Šablony projektů, inicial data

#### XP Systém v Projektech
- Základní XP za typ algoritmu (10-35 XP)
- Level bonus (vyšší level = více XP)
- Streak bonus (7+ dní = +10%, 30+ dní = +25%)
- Combo bonus (5+ algoritmů = +5-30%)
- První algoritmus dne bonus (+10 XP)
- Obtížnost multiplier (1-5)

### 🎮 Kompletní Gamifikace Systém

#### XP System (`src/lib/gamification/xp-system.ts`)
- 30 levelů od Nováčka po Ultimate
- Level thresholds s XP požadavky
- Perks za každý level
- calculateLevel(), getXPForAction(), formatXP()
- XP values pro všechny akce (kurzy, mise, projekty, atd.)

#### Level Definitions (`src/lib/gamification/levels.ts`)
- 20 detailních levelů
- Tituly: Nováček → Začátečník → Praktikant → ... → Ultimate
- Barvy a icon pro každý level
- getLevelByXP(), getXPToNextLevel(), calculateLevelProgress()

#### Achievements (`src/lib/gamification/achievements.ts`)
- 35+ achievements v 7 kategoriích:
  - 🔰 Starter (4 achievements)
  - 🔥 Streaks (4 achievements)
  - 🎯 Milestones (8 achievements)
  - 💪 Skills (5 achievements)
  - 🏆 Competition (3 achievements)
  - 💰 Wealth (3 achievements)
  - 🎓 Education (5 achievements)
- Rarity: Common, Rare, Epic, Legendary, Mythic
- XP odměny za každý achievement

### 🎯 Life OS Přejmenování

#### Změny
- "LIFE OS 2026" → "🎯 Cíle"
- Vysouvací sekce nad Projekty
- Integrované s novým gamifikace systémem

### 📊 Projekty Dashboard Header

#### Gamifikace Widget
```
┌─────────────────────────────────────────────────────────────┐
│  [Level 6]     XP Progress Bar     🔥 7       ⚡ +15%       │
│  Schopný      1250/5000 XP        Streak     Combo 5/10    │
└─────────────────────────────────────────────────────────────┘
```

#### Statistiky
- Celkem projektů, aktivních, dokončených
- Celkem algoritmů
- Celkem hodin
- Celkem XP

### 📁 Nové Soubory

| Soubor | Popis |
|--------|-------|
| `src/types/projects.ts` | Project, Algorithm, Milestone typy |
| `src/data/projects/data.ts` | Project šablony a data |
| `src/app/projects/page.tsx` | Projekty stránka |
| `src/lib/gamification/levels.ts` | Level definice |
| `PLANS/COMPLETE_GAMIFICATION.md` | Kompletní gamifikace plán |

### 🔧 Aktualizované Soubory

| Soubor | Změna |
|--------|-------|
| `src/app/page.tsx` | Přidán Projekty header, přejmenováno Cíle |
| `src/lib/gamification/xp-system.ts` | Rozšířený XP engine |
| `src/lib/gamification/achievements.ts` | Achievement definice |

### 🎮 Gamifikace Feature List

- ✅ XP za každou akci
- ✅ 30 levelů s unikátními tituly
- ✅ 35+ achievements
- ✅ Streak tracking (denní)
- ✅ Combo meter (5+ algoritmů)
- ✅ Daily XP cap (5000 XP)
- ✅ Level bonusy (až +125% na levelu 20)
- ✅ Rarity system (Common → Mythic)
- ✅ Perks za levely

### 📋 Další Plán (v0.3.1)

- [ ] Daily Quests systém
- [ ] Streak protection (freeze)
- [ ] Goal-Project-Algo linking
- [ ] User profile s statistikama
- [ ] Leaderboards
- [ ] Rewards/Loot system
- [ ] Achievement popup notifikace
- [ ] Level-up celebrace animace

---

## [v0.2.1] - 2026-01-14

### 🎯 UI/UX Vylepšení

#### Opravy a vylepšení
- **Skill Tree Automatické Rozměření** (`src/components/EducationSection.tsx`)
  - Opraveno pevné `height: '600px'` na `minHeight: '600px'` s `overflowY: 'auto'`
  - Skill tree nyní automaticky expanduje pro více než 6 skills
  - Přidána možnost scrollování při překročení minimální výšky

- **Job Board Hover Efekt** (`src/components/WorkSection.tsx`)
  - Přidán glow efekt na hover podobný skill tree
  - Animované zvednutí (`translateY(-2px)`) s box-shadow
  - Zlepšená vizuální konzistence mezi komponentami

### 🎓 Interaktivní CNC Mise

#### Nové funkce
- **CNC Fundamentals Mise** (`src/lib/data/missions.ts`)
  - Nová mise "Základy CNC Obrábění" pro manufacturing sektor
  - 4 fáze: Technická dokumentace, Nástroje a upínání, CNC programování, Praktická práce
  - 3000 XP odměna + Badge: CNC Operator

- **Interaktivní Q&A Systém** (`src/app/missions/[id]/page.tsx`)
  - Dynamické otázky podle mise (CNC vs IT programování)
  - 10 CNC-specifických otázek pokrývajících dokumentaci, nástroje, G-kód, bezpečnost
  - Rozšiřitelný systém pro budoucí mise

#### Aktualizované komponenty
- `src/components/WorkSection.tsx` - Hover efekt pro job board
- `src/components/EducationSection.tsx` - Automatické resize skill tree
- `src/lib/data/missions.ts` - Nová CNC mise
- `src/app/missions/[id]/page.tsx` - Dynamické Q&A

### 🔍 Pokročilé Hledání Misí

#### Nové funkce
- **Mission Search & Filter** (`src/app/missions/page.tsx`)
  - Pokročilé vyhledávání misí podle názvu, popisu a tagů
  - Filtrování podle kategorie (Web Development, Data Science, Manufacturing)
  - Filtrování podle obtížnosti (Beginner, Intermediate, Advanced, Expert)
  - Real-time výsledky s počtem nalezených misí
  - Responsive design pro všechna zařízení

#### Aktualizované komponenty
- `src/app/missions/page.tsx` - Přidáno search a filter UI
- Přidány React hooks pro stav management (useState, useMemo)

### 🛠️ **Nová Sekce: Mise s Praxí & Rychlokurzy**

#### Nové funkce
- **Quick Courses Section** (`src/app/quick-courses/`)
  - Nová sekce pro praktické rychlokurzy zaměřené na technické obory
  - Interaktivní kurzy s fázemi, progress tracking a XP systémem
  - První kurz: "Elektrikář pro techniky z praxe"
  - 7 detailních fází od základů po specializace
  - 1500 XP odměna, praktické projekty, zdroje a materiály

#### Struktura rychlokurzů
- **Interaktivní obsah:** Accordion s fázemi, checkboxy pro dokončení
- **Progress tracking:** Uložení pokroku v localStorage
- **XP systém:** Odměny za dokončení kurzů
- **Zdroje a materiály:** Odkazy na relevantní zdroje, knihy, kurzy
- **Completion modal:** Gratulační obrazovka s XP odměnou

#### Nové stránky
- `/quick-courses` - Přehled všech rychlokurzů
- `/quick-courses/[id]` - Detailní stránka kurzu s tabs (Přehled, Zdroje, Pokrok)

#### Navigace
- Přidáno tlačítko **⚡ RYCHLOKURZY** do hlavní navigace

### 📋 Další Plán (v0.2.2)

#### Plánované funkce
- [ ] Job board filtrování podle firem (company names)
- [ ] Rozšířené CNC interaktivity (G-code editor, technické výkresy)
- [ ] Skill tree drag & drop vylepšení
- [ ] Mission completion animations

---

## [v0.2.0] - 2026-01-13

### 🎮 Gamifikace Systém

#### Nové funkce
- **XP Systém** (`src/lib/gamification/xp-system.ts`)
  - 30 levelů od Nováčka po Neohroženého
  - XP bonusy na vyšších levelech (až +70% na levelu 30)
  - Každý level má unikátní titul a perky
  - Vzorec pro výpočet XP pro další level

- **Achievementy** (`src/lib/gamification/achievements.ts`)
  - 50+ achievementů v 7 kategoriích (Progress, Learning, Career, Streak, Skill, Mission, Special)
  - 5 úrovní rarity: Common, Rare, Epic, Legendary, Mythic
  - Secret achievementy (skryté do splnění)
  - XP odměny za každý achievement

- **Milestony** (`src/lib/gamification/milestones.ts`)
  - 30+ sledovatelných milestone
  - 4 kategorie: Kariéra, Vzdělávání, Dovednosti, Achievementy
  - Progres bar pro každý milestone
  - XP odměny za dokončení

- **Roadmap** (`src/lib/gamification/roadmap.ts`)
  - 5 fází kariérní roadmapy (Základy → Expert)
  - 8 kariérních cest (Frontend, Backend, Full Stack, Data Science, Security, DevOps, Mobile, AI/ML)
  - Detailní cíle a skills pro každou fázi
  - Salary ranges a demand ukazatele

#### Nové komponenty
- `src/components/gamification/AchievementsGallery.tsx` - Galerie achievementů
- `src/components/gamification/UserProgressCard.tsx` - Karta s levelem a XP
- `src/components/gamification/MilestonesTracker.tsx` - Sledování milestone
- `src/components/gamification/RoadmapDisplay.tsx` - Vizualizace roadmapy
- `src/components/gamification/UserJourneyRoadmap.tsx` - **Vizuální cesta uživatele**

#### Nové stránky
- `/achievements` - Achievementy a milestones stránka
- `/roadmap` - Kariérní roadmap stránka
- `/journey` - **Vizuální User Journey Roadmap**

### 🎯 Life OS 2026 Vylepšení

#### Nové funkce
- **Zatahovací karta**
  - Life OS je nyní defaultně sbalený
  - Kliknutí na header rozbalí/sbalí kartu
  - Animovaná šipka indikuje stav

- **Goals Manager Modal**
  - Přidávání nových cílů (název, kategorie, hodnota, jednotka, priorita)
  - Odstraňování cílů (s potvrzením)
  - Hromadné akce: odstranění dokončených, reset progress
  - Editace progress (+1, -1, +10%, dokončit)
  - Barevné odlišení kategorií

### 🎨 Design Vylepšení

#### WaveBackground (`src/components/WaveBackground.tsx`)
- Kompletně přepracovaný design
- Jemné glow efekty v pozadí
- Plovoucí particles (hvězdičky)
- Tmavé pozadí s gradientem
- Plynulé animace

### 🎯 User Journey Roadmap (NOVÉ)

#### Nový komponent: UserJourneyRoadmap (`src/components/gamification/UserJourneyRoadmap.tsx`)
- **22 propojených uzlů** reprezentujících celou cestu uživatele
- **Vizuální progres** s animovanou cestou
- **3 stavy uzlů**:
  - 🟢 Dokončeno (zelené, svítící)
  - 🟡 Aktivní (žluté, pulsující)
  - ⚫ Zamčeno (šedé)
- **Interaktivní detaily** - kliknutí na uzel zobrazí popis, XP odměnu, požadavky
- **SVG animace** - propojovací čáry s animovanými tečkami
- **Progress bar** - celkový postup v procentech
- **Další milník** - indikace kam se posunout dál

#### Nová stránka: /journey
- Kompletní přehled uživatelské cesty
- 3 záložky: Vizuální Cesta, Detailní Statistiky, Milestony
- Integrované statistiky a achievement progress
- Responsive design

#### Navigace
- Přidáno tlačítko **JOURNEY** (🎯) do hlavní navigace

#### Globální styly (`src/app/globals.css`)
- Nové glassmorphism utility třídy
- Kompletní dark mode podpora
- Scrollbar styling
- Animace (fade-in, pulse-glow)

### 📚 Dokumentace

#### Nové dokumenty
- `GAMIFICATION.md` - Kompletní dokumentace gamifikace
- `src/lib/gamification/index.ts` - Barrel export

#### Aktualizace
- `README.md` - Přidány nové funkce (gamifikace, roadmap)
- `src/types/index.ts` - Přidány typy pro gamifikaci

### 🔧 Navigace

#### Přidaná tlačítka
- **ACHIEVEMENTS** (🏆) - Odkaz na /achievements
- **ROADMAP** (🗺️) - Odkaz na /roadmap

---

## [v0.1.0] - 2026-01-03

### Základní MVP
- Next.js 16 App Router
- React 19 s TypeScriptem
- NextAuth.js autentifikace
- Prisma + SQLite databáze
- Bootstrap 5 styling
- Recharts pro analytics

### Hlavní funkce
- Dashboard s Life OS 2026
- Skill tracking a vzdělávání
- Job board s drag & drop
- AI průvodce Akize
- Články o IT & AI
- Online kurzy
- Analytics a reporting
- Mission system
- Reklamní systém připraven

---

## 📋 Další Plán

### v0.2.2 - CNC & Job Board Vylepšení
- [x] Job board company filtering (firemní názvy a filtrování)
- [ ] CNC G-code editor s syntax highlighting
- [ ] Technické výkresy viewer s interaktivními prvky
- [ ] CNC simulátor pro základní programování
- [ ] Mission templates pro další obory (elektrotechnika, automotive)

### v0.3.0 - Monetizace
- [ ] Stripe payment integration
- [ ] Subscription tiers (Free, Pro, Enterprise)
- [ ] Premium features gating
- [ ] Google AdSense integration
- [ ] User onboarding flow

### v0.4.0 - Sociální Funkce
- [ ] Leaderboard systém
- [ ] Guild/Clan systém
- [ ] Friend system
- [ ] Achievements sharing

### v0.5.0 - Pokročilé Funkce
- [ ] LinkedIn integration
- [ ] Video kurzy
- [ ] Interaktivní lekce
- [ ] Mobile app (React Native)

---

## 🏷️ Rarity Systém

| Rarity | Barva | Pravděpodobnost | XP Multiplier |
|--------|-------|-----------------|---------------|
| Common | Šedá | 40% | 1x |
| Rare | Modrá | 30% | 2x |
| Epic | Fialová | 20% | 5x |
| Legend | Oranžová | 8% | 10x |
| Mythic | Červená | 2% | 25x |

## 📊 Level Systém

| Level | XP Required | Titul | Perk |
|-------|-------------|-------|------|
| 1 | 0 | Nováček | - |
| 5 | 800 | Vojín | Odznak "Růst" |
| 10 | 4000 | Veteran | Odznak "XP Veteran" |
| 25 | 70,000 | Expert | Odznak "Expert" |
| 30 | 150,000 | Majster | Zlatý titul |

---

## 🎯 Achievement Kategorie

1. **Progress** - Celkový postup (level, XP, úkoly)
2. **Learning** - Vzdělávací (kurzy, hodiny)
3. **Career** - Kariérní (práce, interview)
4. **Streak** - Denní aktivita
5. **Skill** - Dovednostní milestone
6. **Mission** - Dokončení misí
7. **Special** - Secret a speciální
