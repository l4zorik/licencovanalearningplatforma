# 🚀 Tomas Learning Platform (TLP) — Kariérní Rozvojová Platforma

Moderní webová aplikace pro **sledování kariérního rozvoje**, **skill management**, **AI asistované učení** a **job hunting**. Postavená na Next.js 16 s gamifikací, AI průvodcem a komplexním systémem dovedností.

🌐 **Live**: [tlp.vercel.app](https://tlp.vercel.app)  
📦 **Stack**: Next.js 16 · React 19 · TypeScript · Bootstrap 5 · Prisma · SQLite

---

## 🎯 Přehled

Platforma kombinuje **osobní development tracking** s **komplexním kariérním poradenstvím**. Od skill boardu přes AI chatbota až po job hunting — vše na jednom místě, v češtině.

**283 skillů** ve **40+ kategoriích** — od programování přes robotiku až po vibe coding a investování.

---

## 🔥 Klíčové Funkce

### 🛠️ Skill Board
- **283 dovedností** ve 40+ kategoriích (Programming, Data Science, Cybersecurity, Cloud & DevOps, Robotics, Crypto & Blockchain, Vibe Coding, Investing...)
- **Trending systém**: Top 10 nejžádanějších skillů podle poptávky
- **Fancy skill karty** s gradient bordery, platy (junior → senior), kategoriovými badges
- **Drag & drop** archivace, kontextové menu (detail, archivace, smazání)
- **Vyhledávání** napříč všemi kategoriemi v modálním okně
- **FACTS system**: Zajímavosti z oboru mezi skill kartami (CNC, elektrikářství, automechanik, tesařství, robotika, krypto...)

### 📜 Certification Board
- Gridové zobrazení certifikací s progress bary
- 20+ certifikací seskupených podle typu (Cloud, Security, Data, Development, Management)
- Status tracking (Planned → In Progress → Obtained)

### 💼 Job Board
- Gridové zobrazení pracovních pozic
- 30+ job templateů napříč obory
- Aplikace tracking (stav, poznámky, deadline)
- Drag & drop mezi status columns

### 🧠 AI Průvodce Akize
- Interaktivní AI chat bot s kontextovou pamětí
- **Command menu** s 30+ příkazy v 6 kategoriích (Kariéra, Programování, Motivace, Life OS, Vzdělávání, Finance)
- **Prompt Manager**: 15+ předpřipravených promptů s proměnnými, CRUD editor, localStorage persistence
- 12 náladových stavů s vlastními odpověďmi
- Automatické response na základě kontextu (skills, jobs, achievements)

### 🎮 Gamifikace
- **30 levelů**: Od Nováčka po Neohroženého
- **35+ achievementů** v 5 raritách (Common, Rare, Epic, Legendary, Mythic)
- **XP systém**: Za skillování, mise, kurzy
- **Milestony**: 30+ sledovaných cílů s odměnami
- **Kariérní roadmap**: 8 cest (Frontend, Backend, Full Stack, Data Science, Security, DevOps, Mobile, AI/ML)

### 📈 Analytics & Reporting
- Progress analytics s grafy (Recharts)
- Career report s 500+ pozicemi
- Skill gap analýza

### 🎯 Life OS — Cíle
- 13 životních kategorií (Kariéra, Finance, Zdraví, Vztahy, Vzdělání, Cestování...)
- Finanční a materiální cíle s progress trackingem
- Ukládání do localStorage

### 📝 Další funkce
- **Hot News Ticker**: Animovaný scrolling news strip s nejnovějšími trendy
- **Články**: IT & AI novinky s full-text vyhledáváním
- **Kurzy**: Online kurzy s progress trackingem
- **Recepty**: Sekce s recepty
- **Kariérní rady**: Tipy a triky pro kariérní růst
- **Wiki**: Znalostní báze
- **Projekty**: Dashboard s logováním algoritmů (14 typů)

---

## 🏗️ Technologie

| Vrstva | Technologie |
|--------|------------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Frontend** | React 19, TypeScript 5 |
| **Styling** | Bootstrap 5, Custom CSS (Glassmorphism, WaveBackground) |
| **Auth** | NextAuth.js |
| **Database** | Prisma ORM + SQLite (dev), PostgreSQL ready |
| **Charts** | Recharts |
| **Drag & Drop** | @dnd-kit |
| **Validation** | Zod |

---

## 📁 Struktura

```
src/
├── app/                    # Next.js App Router pages
│   ├── achievements/       # Achievementy
│   ├── analytics/          # Analytics dashboard
│   ├── articles/           # IT & AI články
│   ├── career-advice/      # Kariérní rady
│   ├── career-report/      # Career report (500+ pozic)
│   ├── courses/            # Online kurzy
│   ├── quick-courses/      # Rychlokurzy
│   ├── missions/           # Mise a úkoly
│   ├── projects/           # Projektový dashboard
│   ├── recipes/            # Recepty
│   ├── training/           # Tréninkové moduly
│   ├── wiki/               # Znalostní báze
│   └── page.tsx            # Hlavní dashboard
├── components/             # React komponenty
│   ├── gamification/       # XP, achievements, milestony, roadmap
│   ├── AkizeGuide.tsx      # AI chat bot + Prompt Manager (15+ promptů)
│   ├── EducationSection.tsx # Skill Board (283 skillů, 40+ kategorií)
│   ├── CertificationSection.tsx # Certification Board
│   ├── WorkSection.tsx     # Job Board
│   ├── TrendySection.tsx   # Trendy a statistiky
│   └── ...
├── data/skills/            # Skill data
│   ├── comprehensive-skills.ts # 283 skillů, 11 FACTS arrays
│   └── index.ts
├── lib/                    # Utility
│   └── gamification/       # XP, achievements, milestones, roadmap
├── types/                  # TypeScript definice
└── generated/              # Prisma klient
```

---

## 💰 Monetizace

### Model: Freemium + Reklamy
- **Free**: Skill tracking, základní job board, omezené kurzy
- **Premium** ($4.99/měsíc): Neomezené kurzy, pokročilé analytics, bez reklam, CV generátor
- **Enterprise** ($29/měsíc): Team management, admin dashboard

### Cílové trhy
- ČR/SK — první komplexní řešení v češtině
- Studenti, freelanceri, kariérní měniči, manažeři

---

## 🚀 Development

```bash
npm install
npx prisma generate && npx prisma db push
npm run dev        # → localhost:3000
npm run build      # Production build
npm run lint       # ESLint
```

---

## 📚 Dokumentace

| Soubor | Popis |
|--------|-------|
| [AGENTS.md](AGENTS.md) | AI agent guidelines |
| [CHANGELOG.md](CHANGELOG.md) | Historie verzí |
| [ROADMAP.md](ROADMAP.md) | Development roadmap |
| [GAMIFICATION.md](GAMIFICATION.md) | Gamifikace systém |
| [MONETIZATION_STRATEGY.md](MONETIZATION_STRATEGY.md) | Monetizační strategie |
| [CAREER_SKILL_MAP.md](CAREER_SKILL_MAP.md) | Skill mapování |

---

## 📊 Statistiky

- **283 dovedností** ve 40+ kategoriích
- **30 levelů** gamifikace
- **35+ achievementů** v 5 raritách
- **500+ kariérních pozic** v reportu
- **15+ AI promptů** v Prompt Manageru
- **30+ job templateů**
- **20+ certifikací**

---

## 📝 License

GNU GPLv3 — viz [LICENSE](LICENSE)
