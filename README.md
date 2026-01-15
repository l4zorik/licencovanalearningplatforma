# Tomas Learning Platform - Kariérní Rozvojová Platforma

## 📋 Přehled Projektu

Moderní webová aplikace pro sledování kariérního rozvoje, skill management a job hunting. Kombinuje osobní development tracking s komplexním kariérním poradenstvím.

## 🎯 Klíčové Funkce

### 👤 Osobní Rozvoj
- **Skill Tracking**: Sledování pokroku ve vzdělávání
- **XP Systém**: Gamifikace s levely a achievementy
- **Kurzy a Lekce**: Strukturované vzdělávací moduly
- **Milestony**: Dlouhodobé cíle s odměnami
- **Roadmap**: Vizuální postup kariérní cestou
- **Life OS 2026**: Komplexní life goal tracking
  - Zatahovací karta s animací
  - Goals Manager modal
  - Přidávání/odstraňování cílů
  - Hromadné akce (delete completed, reset)
  - 13 životních kategorií

### 🎮 Gamifikace
- **30 Levelů**: Od Nováčka po Neohroženého
- **50+ Achievementů**: Common, Rare, Epic, Legendary, Mythic
- **Milestony**: 30+ sledovaných cílů s odměnami
- **Kariérní Roadmap**: 5 fází od Základů po Expert
- **8 Kariérních cest**: Frontend, Backend, Full Stack, Data Science, Security, DevOps, Mobile, AI/ML

### 💼 Job Hunting
- **Job Board**: Přehled pracovních příležitostí s drag & drop archivací
- **Application Tracking**: Sledování stavu přihlášek
- **Career Matching**: Doporučení na základě skills

### 🤖 AI Průvodce Akize
- **Floating Chat Bot**: Vždy po ruce AI pomocník
- **Kariérní Rady**: Inteligentní odpovědi na otázky
- **Skill Doporučení**: Nápady na další kroky v učení

## 📢 Reklamní Systém
- **Strategické umístění**: Header, content, sidebar reklamy
- **Premium Ads-free**: Placení uživatelé vidí nulové reklamy
- **Non-intrusive**: Reklamy jsou diskrétní a relevantní
- **Multiple formáty**: Banner, native, affiliate reklamy
- **Ad networks ready**: Google AdSense, Media.net integrace

### 📝 Články & Novinky
- **IT & AI Články**: Pravidelné články o technologiích
- **Kariérní Rady**: Tipy pro pracovní trh
- **Newsletter**: Odběr nových článků

### 🎓 Online Kurzy
- **Embedded Databases in Common Lisp**: Komplexní kurz ve stylu Coursera
- **Interaktivní lekce**: Video obsah, kvízy, projekty
- **Progress tracking**: Sledování dokončených lekcí
- **Certifikace**: Možnost získání certifikátu

### 📊 Analytics & Reporting
- **Progress Analytics**: Grafy a statistiky pokroku
- **Career Report**: Komplexní přehled pracovního trhu (500+ pozic)
- **Personal Insights**: Osobní kariérní analýza

### 🎨 Design
- **WaveBackground**: Animované pozadí s glow efekty a particles
- **Glassmorphism**: Moderní skleněný efekt pro karty, navbar, modaly
- **Dark Mode**: Kompletní podpora pro všechny Bootstrap komponenty
- **Animace**: Plynulé přechody, hover efekty, pulse glow

## 🏗️ Technologie

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Bootstrap 5, Custom CSS
- **Authentication**: NextAuth.js
- **Database**: Prisma + SQLite (development)
- **State Management**: React Hooks
- **Drag & Drop**: @dnd-kit (sortable, droppable)

## 📁 Struktura Projektu

```
src/
├── app/                    # Next.js App Router
│   ├── achievements/       # Achievementy a milestones stránka
│   ├── roadmap/           # Kariérní roadmap stránka
│   ├── analytics/         # Analytics stránka
│   ├── articles/          # Články o IT & AI
│   ├── auth/              # Authentication
│   ├── career-report/     # Kariérní přehled
│   ├── courses/           # Online kurzy
│   ├── missions/          # Mise a úkoly
│   ├── training/          # Vzdělávací moduly
│   └── page.tsx           # Hlavní dashboard
├── components/            # React komponenty
│   ├── gamification/      # Gamifikace komponenty
│   │   ├── AchievementsGallery.tsx
│   │   ├── UserProgressCard.tsx
│   │   ├── MilestonesTracker.tsx
│   │   └── RoadmapDisplay.tsx
│   ├── AkizeGuide.tsx     # AI chat průvodce
│   ├── EducationSection.tsx  # Skill management
│   ├── WorkSection.tsx        # Job board s drag & drop
│   ├── ProgressAnalytics.tsx  # Grafy
│   └── ...
├── lib/                   # Utility funkce
│   └── gamification/      # Gamifikace systém
│       ├── achievements.ts    # Achievement data (50+)
│       ├── xp-system.ts       # XP a level systém (30 levelů)
│       ├── milestones.ts      # Milestone systém (30+ milestones)
│       └── roadmap.ts         # Roadmap a kariérní cesty
├── types/                 # TypeScript definice
└── generated/             # Prisma klient
```

## 💰 Monetizační Potenciál

### ✅ Proč má aplikace hodnotu:
- **Unikátní kombinace**: Kariérní poradenství + skill tracking + job board
- **Komplexní řešení**: Celý životní cyklus kariérního rozvoje
- **Lokální trh**: Česko-slovenský trh bez konkurence
- **Aktuální data**: Reálné platy, trendy, statistiky

### 🎯 Monetizační Modely:

#### 1. Freemium Model
- **Zdarma**: Základní skill tracking, omezený počet kurzů, základní job board
- **Premium** ($4.99/měsíc nebo $49/rok):
  - Neomezený přístup ke všem kurům
  - Pokročilé analytics a reporty
  - Prioritní job matching
  - Osobní kariérní konzultace
  - Export dat a CV generátor
  - **Ads-free zážitek**

#### 2. Hybrid Model (Reklamy + Subscription)
- **Free tier**: Základní funkcionalita s non-intrusive reklamami
- **Premium** ($4.99/měsíc): Kompletní funkcionalita bez reklam
- **Reklamní příjmy**: Google AdSense, affiliate reklamy kurzů

#### 3. Subscription Tiers
- **Basic**: $2.99/měsíc - Skill tracking + základní kurzy
- **Pro**: $9.99/měsíc - Všechno + premium kurzy + job alerts
- **Enterprise**: $29/měsíc - Pro týmy + admin dashboard

#### 4. One-time Purchases
- Kompletní kariérní report: $19.99
- Premium kurz balíčky: $49.99
- Job search boost: $9.99

#### 5. Affiliate & Referral Program
- **Partnerské reklamy**: Kurzy, nástroje, hosting
- **Referral systém**: Uživatelé dostávají odměny za doporučení

### 👥 Cílové Skupiny:
- **Studenti**: Kariérní poradenství a skill building
- **Freelanceři**: Job matching a networking
- **Pracovníci ve změně kariéry**: Kompletní přehled trhu
- **Manažeři**: Team skill tracking a development
- **Startupy**: Talent acquisition tools

### 💡 Konkurenční Výhoda:
- **Český trh**: První komplexní řešení v češtině
- **AI Průvodce**: Unikátní Akize chat bot pro kariérní rady
- **Gamifikace**: XP systém a achievementy
- **Kompletní ekosystém**: Od skill trackingu po job matching
- **Drag & Drop UX**: Intuitivní správa jobů a skills
- **Bohatý obsah**: 500+ kariérních pozic, pravidelné články

## 🚀 Roadmap

### Phase 1: MVP (Aktuální stav)
- ✅ Základní skill tracking
- ✅ Job board s drag & drop funkcionalitou
- ✅ Kariérní report (500+ pracovních pozic)
- ✅ AI průvodce Akize s chat botem
- ✅ Články o IT & AI novinkách
- ✅ Online kurzy (Common Lisp, Embedded DB)
- ✅ User authentication
- ✅ Advanced analytics
- ✅ Reklamní systém připraven
- ✅ Gamifikace (XP, levely, achievements)
- ✅ Milestone tracking
- ✅ Kariérní roadmap systém
- ✅ 8 kariérních cest
- ✅ Life OS 2026 vylepšení
  - Zatuhovací karta
  - Goals Manager modal
  - Přidávání/odstraňování cílů
  - Hromadné akce
- ✅ Design vylepšení
  - WaveBackground
  - Glassmorphism
  - Dark mode

### Phase 2: Monetizace
- 🔄 Subscription systém ($4.99/měsíc freemium)
- 🔄 Premium features gating (ads free)
- 🔄 Payment integration (Stripe)
- 🔄 Reklamní síť integrace (Google AdSense)
- 🔄 User onboarding flow
- 🔄 Mobile app

### Phase 3: Rozšíření
- 📋 Pokročilý AI kariérní poradce
- 📋 Team management pro firmy
- 📋 Integration s LinkedIn
- 📋 Video kurzy a interaktivní lekce
- 📋 Community features a networking

## 📊 Technické Metriky

- **Users**: Authentication připraveno
- **Database**: SQLite (dev), možnost PostgreSQL/MySQL
- **Performance**: Next.js optimalizace
- **SEO**: App Router optimalizace
- **Accessibility**: Bootstrap + ARIA labels

## 🔧 Development Setup

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Run development server
npm run dev

# Build for production
npm run build
```

## 🤝 Contributing

Projekt je open-source s cílem pomoci lidem v kariérním rozvoji.

## 📞 Kontakt

Pro otázky ohledně monetizace nebo developmentu kontaktujte maintainer.