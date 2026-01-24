# 🎯 Multi-Industry Challenge Platform
## Komplexní Plán Rozšíření Platformy o Challenge Systém

---

## 📋 1. Úvod a Vize

### 1.1 Základní Koncept
Transformace platformy z čistě programátorské/kariérní aplikace na **univerzální challenge engine** schopný podporovat jakékoli odvětví - od programování přes řemesla až po kreativní profese. Klíčovým prvkem je **abstrakce challenge konceptu** tak, aby byl dostatečně flexibilní pro různé typy dovedností a zároveň dostatečně strukturovaný pro konzistentní gamifikaci a tracking.

### 1.2 Proč Tento Krok?
- **Rozšíření trhu**: Česko-slovenský trh nemá unified platformu pro skills challenge napříč odvětvími
- **Synergie**: Programátoři, řemeslníci, designeři - všichni mají potřebu skill development a validace
- **Monetizace**: Multiple revenue streams z různých průmyslů
- **Komunitní efekt**: Cross-pollination mezi různými profesemi
- **Data advantage**: Jedinečná data o skills gaps napříč trhem práce

### 1.3 Cílové Odvětví (Phase 1-3)
- **Fáze 1**: IT & Programování (základ)
- **Fáze 2**: Řemesla & Obchod (tradespeople, craftsmen)
- **Fáze 3**: Kreativní profese (design, copy, marketing)
- **Fáze 4**: Specializované profese (lékaři, právníci, finance)

---

## 🏗️ 2. Univerzální Challenge Framework

### 2.1 Core Challenge Abstrakce

Každý challenge v systému se skládá z následujících komponent:

```
Challenge Entity
├── Identifikace
│   ├── unique_id (UUID)
│   ├── slug (url-friendly identifier)
│   ├── version (pro iterace)
│   └── status (draft/active/deprecated)
│
├── Metadata
│   ├── title (vícejazyčné)
│   ├── description (vícejazyčné)
│   ├── category (industry + subcategory)
│   ├── tags (vyhledávání)
│   └── difficulty_level (1-10)
│
├── Obsah (Content Variants)
│   ├── instructions (hlavní zadání)
│   ├── resources (materiály, nápovědy)
│   ├── examples (ukázky správného řešení)
│   └── attachments (soubory, obrázky, schémata)
│
├── Evaluation Engine
│   ├── evaluation_type (automated/manual/peer/hybrid)
│   ├── criteria (rubric items)
│   ├── test_cases / validation_rules
│   ├── scoring_algorithm
│   └── time_limit (optional)
│
├── Rewards & Recognition
│   ├── base_xp (základní body)
│   ├── bonus_xp (za optimalizaci)
│   ├── badges (associated achievements)
│   └── certificates (completion proof)
│
└── Lifecycle
    ├── created_by (author)
    ├── created_at
    ├── updated_at
    └── popularity_metrics
```

### 2.2 Evaluation Typy

#### A) Automated Evaluation (Programování)
- Unit testy
- Integration testy
- Performance benchmarking
- Code style analysis
- Security scanning

#### B) Rubric-Based Evaluation (Řemesla, Kreativa)
```
Rubric Structure:
├── criterion_1 (např. "Kvalita provedení")
│   ├── level_1_description (0-20%)
│   ├── level_2_description (21-50%)
│   ├── level_3_description (51-80%)
│   └── level_4_description (81-100%)
├── criterion_2 (např. "Bezpečnost")
│   └── ...
├── criterion_3 (např. "Efektivita")
│   └── ...
└── total_score_formula
```

#### C) Peer Review (Design, Kreativa)
- Multiple reviewer system
- Reputation-weighted scoring
- Anonymized submissions
- Review guidelines template

#### D) Video Submission (Praktické dovednosti)
- Video upload + validation
- Pose/motion analysis (AI-assisted)
- Expert review routing
- Time-stamped feedback

#### E) Hybrid Evaluation
- Kombinace automatického a manuálního hodnocení
- Automatický fail/pass pro základní kritéria
- Expert review pro nuance a kvalitu

### 2.3 Challenge Categories Framework

```
Industry Category Tree:
┌─────────────────────────────────────────────┐
│ ROOT                                         │
├─────────────────────────────────────────────┤
├── IT & Technology                            │
│   ├── Programming                            │
│   │   ├── Algorithms                         │
│   │   ├── Data Structures                   │
│   │   ├── Debugging                         │
│   │   ├── Code Optimization                 │
│   │   └── System Design                     │
│   ├── DevOps                                 │
│   │   ├── Infrastructure                    │
│   │   ├── CI/CD                             │
│   │   └── Cloud Architecture                │
│   ├── Data Science                           │
│   │   ├── Machine Learning                  │
│   │   ├── Statistics                        │
│   │   └── Data Visualization                │
│   └── Cybersecurity                          │
│
├── Trades & Crafts                            │
│   ├── Construction                           │
│   │   ├── Carpentry                         │
│   │   ├── Masonry                           │
│   │   ├── Electrical                        │
│   │   └── Plumbing                          │
│   ├── Automotive                             │
│   │   ├── Mechanics                         │
│   │   ├── Electronics                       │
│   │   └── Body Work                         │
│   ├── Woodworking                            │
│   │   ├── Joinery                           │
│   │   ├── Finishing                         │
│   │   └── Restoration                       │
│   └── Metalworking                           │
│       ├── Welding                            │
│       ├── Machining                          │
│       └── Blacksmithing                      │
│
├── Creative Industries                        │
│   ├── Graphic Design                         │
│   │   ├── Branding                          │
│   │   ├── Illustration                      │
│   │   └── UI/UX                             │
│   ├── Photography                            │
│   │   ├── Portrait                          │
│   │   ├── Product                           │
│   │   └── Landscape                         │
│   ├── Writing                                │
│   │   ├── Copywriting                       │
│   │   ├── Technical Writing                 │
│   │   └── Creative Writing                  │
│   └── Music                                  │
│       ├── Production                         │
│       ├── Performance                        │
│       └── Composition                        │
│
├── Professional Services                      │
│   ├── Healthcare                             │
│   ├── Legal                                  │
│   ├── Finance                                │
│   └── Education                              │
│
└── Business & Management                      │
    ├── Strategy                               │
    ├── Sales                                  │
    ├── Negotiation                            │
    └── Project Management                     │
```

---

## 🎮 3. Gamifikace a Ranking Systems

### 3.1 Universal XP System (rozšíření stávajícího)

```typescript
interface XPReward {
  base_xp: number;           // Základní XP za dokončení
  time_bonus: number;        // Bonus za rychlé dokončení
  first_attempt_bonus: number; // Bonus za první pokus
  perfection_bonus: number;  // Bonus za 100% skóre
  streak_bonus: number;      // Multiplikátor za streak
  mastery_bonus: number;     // Bonus za mastery level
}

const XP_MULTIPLIERS = {
  difficulty_1: 1.0,
  difficulty_2: 1.5,
  difficulty_3: 2.5,
  difficulty_4: 4.0,
  difficulty_5: 7.0,
  difficulty_6: 11.0,
  difficulty_7: 16.0,
  difficulty_8: 22.0,
  difficulty_9: 30.0,
  difficulty_10: 45.0,
};
```

### 3.2 Industry-Specific Ranking Systems

#### Programming: Kyu System (CodeWars Style)
```
┌─────────────────────────────────────────────────────────┐
│  1 Kyu  │  Legend                                        │
│  2 Kyu  │  Mentor                                        │
│  3 Kyu  │  Practitioner                                  │
│  4 Kyu  │  Student                                       │
│  5 Kyu  │  Novice                                        │
│  6 Kyu  │  Beginner                                      │
│  7 Kyu  │  Elementary                                    │
│  8 Kyu  │  Fundamental                                   │
└─────────────────────────────────────────────────────────┘
```

#### Trades: Guild System
```
┌─────────────────────────────────────────────────────────┐
│ Grand Master │  10+ let zkušeností, expert status       │
│ Master       │  Certifikovaný expert                    │
│ Journeyman   │  3+ roky praxe, plná kvalifikace         │
│ Apprentice   │  Učedník, aktivní výuka                  │
│ Initiate     │  Nováček v oboru                         │
└─────────────────────────────────────────────────────────┘
```

#### Creative: Recognition System
```
┌─────────────────────────────────────────────────────────┐
│ Visionary  │  Industry-leading work                     │
│ Expert     │  Professional-level work                   │
│ Proficient │  Consistent quality                        │
│ Emerging   │  Developing skills                         │
│ Aspirant   │  New to the field                          │
└─────────────────────────────────────────────────────────┘
```

### 3.3 Skill Tree Architecture

```
Skill Tree Node:
├── node_id: string
├── skill_name: string
├── category_path: string[]
├── dependencies: node_id[]          // Co musíte umět předtím
├── challenge_count: number          // Počet challenge pro mastery
├── mastery_threshold: number        // Skóre pro mastery
├── children: node_id[]
├── color_code: string               // Pro visualizaci
└── icon: string                     // SVG icon identifier

Mastery Levels per Skill:
├── Novice      │  1 challenge completed
├── Beginner    │  5 challenges, 70% avg score
├── Intermediate│  15 challenges, 80% avg score
├── Advanced    │  30 challenges, 90% avg score
├── Expert      │  50 challenges, 95% avg score + teaching
└── Master      │  100 challenges, 98% avg score + contributions
```

---

## 🏗️ 4. Technická Architektura

### 4.1 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │   Web App   │  │  Mobile Web │  │   PWA       │  │  Admin     │ │
│  │  (Next.js)  │  │  (Responsive│  │  (Service   │  │  Panel     │ │
│  │             │  │   Design)   │  │   Worker)   │  │            │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────┬──────┘ │
└─────────┼────────────────┼────────────────┼────────────────┼─────────┘
          │                │                │                │
          └────────────────┴────────────────┴────────────────┘
                                   │
┌──────────────────────────────────┼──────────────────────────────────┐
│                          API GATEWAY                                   │
│              (Next.js API Routes + Authentication)                     │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
┌──────────────────────────────────┼──────────────────────────────────┐
│                     CORE SERVICES LAYER                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │   Challenge │  │   Progress  │  │  Gamification│ │  User      │ │
│  │   Service   │  │   Service   │  │   Service   │ │  Service   │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────┬──────┘ │
│         │                │                │                │         │
│  ┌──────┴────────────────┴────────────────┴────────────────┴──────┐ │
│  │                     EVENT BUS (Pub/Sub)                         │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
┌──────────────────────────────────┼──────────────────────────────────┐
│                    EVALUATION ENGINE LAYER                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │   Code      │  │   Rubric    │  │   Peer      │  │   Video    │ │
│  │  Sandbox    │  │  Evaluator  │  │  Review     │  │  Processor │ │
│  │  (Docker)   │  │             │  │  Manager    │  │            │ │
│  └──────┬──────┘  └─────────────┘  └─────────────┘  └────────────┘ │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
┌──────────────────────────────────┼──────────────────────────────────┐
│                         DATA LAYER                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │  PostgreSQL │  │   Redis     │  │  S3/Storage │  │  Analytics │ │
│  │  (Primary)  │  │  (Cache)    │  │             │  │  Warehouse │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Database Schema (Prisma)

```prisma
// Industry & Category Management
model Industry {
  id          String     @id @default(cuid())
  slug        String     @unique
  name        String     // "IT & Technology", "Trades & Crafts"
  description String?
  icon        String?
  color       String     // Hex color for UI
  order       Int        @default(0)
  is_active   Boolean    @default(true)
  
  categories  Category[]
  challenges  Challenge[]
  users       UserIndustry[]
  
  created_at  DateTime   @default(now())
  updated_at  DateTime   @updatedAt
}

model Category {
  id          String     @id @default(cuid())
  slug        String
  name        String
  industry_id String
  industry    Industry   @relation(fields: [industry_id], references: [id])
  parent_id   String?
  parent      Category?  @relation("CategoryHierarchy", fields: [parent_id], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  
  icon        String?
  description String?
  order       Int        @default(0)
  is_active   Boolean    @default(true)
  
  challenges  Challenge[]
  skills      Skill[]
  
  @@unique([industry_id, slug])
}

// Challenge Core
model Challenge {
  id              String     @id @default(cuid())
  slug            String     @unique
  industry_id     String
  industry        Industry   @relation(fields: [industry_id], references: [id])
  category_id     String
  category        Category   @relation(fields: [category_id], references: [id])
  
  // Multi-language support
  title           Json       // { "cs": "Název", "en": "Title" }
  description     Json       // { "cs": "Popis", "en": "Description" }
  instructions    Json       // { "cs": "Instrukce", "en": "Instructions" }
  
  // Challenge Config
  difficulty      Int        // 1-10
  estimated_time  Int?       // minutes
  version         Int        @default(1)
  status          ChallengeStatus @default(DRAFT)
  
  // Evaluation
  eval_type       EvaluationType
  config          Json       // evaluation-specific config
  
  // Rewards
  base_xp         Int        @default(10)
  bonus_xp        Int        @default(0)
  
  // Author
  author_id       String
  author          User       @relation(fields: [author_id], references: [id])
  
  // Relations
  test_cases      TestCase[]
  rubric_items    RubricItem[]
  submissions     Submission[]
  attachments     Attachment[]
  tags            ChallengeTag[]
  skills          ChallengeSkill[]
  
  // Metrics
  completion_count Int       @default(0)
  success_rate     Float     @default(0)
  avg_time         Int?      // seconds
  
  created_at      DateTime   @default(now())
  updated_at      DateTime   @updatedAt
  published_at    DateTime?
  
  @@index([industry_id, category_id])
  @@index([status, difficulty])
}

enum ChallengeStatus {
  DRAFT
  ACTIVE
  DEPRECATED
  ARCHIVED
}

enum EvaluationType {
  AUTOMATED     // Code execution, tests
  RUBRIC        // Manual rubric evaluation
  PEER_REVIEW   // Community voting
  VIDEO_SUBMIT  // Video upload + review
  HYBRID        // Combination
}

// Automated Evaluation (Programming)
model TestCase {
  id            String     @id @default(cuid())
  challenge_id  String
  challenge     Challenge  @relation(fields: [challenge_id], references: [id], onDelete: Cascade)
  
  order         Int
  input         String     // Test input (JSON for multiple params)
  expected      String     // Expected output
  is_hidden     Boolean    @default(false) // Hidden test cases
  timeout_ms    Int        @default(5000)
  memory_limit  Int?       // MB
  
  created_at    DateTime   @default(now())
}

// Rubric Evaluation (Trades, Crafts)
model RubricItem {
  id            String     @id @default(cuid())
  challenge_id  String
  challenge     Challenge  @relation(fields: [challenge_id], references: [id], onDelete: Cascade)
  
  criterion     String     // "Kvalita provedení"
  max_score     Int        // Maximum points for this criterion
  
  levels        Json       // Description for each score level
  weight        Float      @default(1.0)
  order         Int
  
  created_at    DateTime   @default(now())
}

// Skill Tracking
model Skill {
  id            String     @id @default(cuid())
  slug          String
  name          String
  category_id   String
  category      Category   @relation(fields: [category_id], references: [id])
  
  description   String?
  icon          String?
  color         String?
  
  dependencies  SkillDependency[] @relation("RequiredSkills")
  dependents    SkillDependency[] @relation("SkillDependents")
  
  challenges    ChallengeSkill[]
  user_skills   UserSkill[]
  
  created_at    DateTime   @default(now())
  
  @@unique([category_id, slug])
}

model SkillDependency {
  id              String   @id @default(cuid())
  skill_id        String
  skill           Skill    @relation("RequiredSkills", fields: [skill_id], references: [id])
  required_skill_id String
  required_skill  Skill    @relation("SkillDependents", fields: [required_skill_id], references: [id])
  min_level       Int      @default(1) // Required mastery level
  
  @@unique([skill_id, required_skill_id])
}

model ChallengeSkill {
  id            String     @id @default(cuid())
  challenge_id  String
  challenge     Challenge  @relation(fields: [challenge_id], references: [id])
  skill_id      String
  skill         Skill      @relation(fields: [skill_id], references: [id])
  skill_level   Int        @default(1) // Required skill level
  
  @@unique([challenge_id, skill_id])
}

model UserSkill {
  id            String     @id @default(cuid())
  user_id       String
  skill_id      String
  skill         Skill      @relation(fields: [skill_id], references: [id])
  
  level         Int        @default(0) // 0-6 (Novice to Master)
  xp            Int        @default(0)
  challenges_done Int      @default(0)
  avg_score     Float      @default(0)
  
  last_practice  DateTime?
  updated_at    DateTime   @updatedAt
  
  @@unique([user_id, skill_id])
}

// User Progress
model Submission {
  id            String     @id @default(cuid())
  user_id       String
  challenge_id  String
  challenge     Challenge  @relation(fields: [challenge_id], references: [id])
  
  status        SubmissionStatus
  score         Float?     // 0-100
  xp_earned     Int        @default(0)
  
  // For automated: code submission
  code          String?
  language      String?
  execution_time Int?      // ms
  memory_used   Int?       // MB
  
  // For manual/video: feedback
  feedback      String?
  reviewer_id   String?
  video_url     String?
  
  attempt_number Int       @default(1)
  time_spent    Int        @default(0) // seconds
  
  created_at    DateTime   @default(now())
  
  @@index([user_id, challenge_id])
  @@index([challenge_id, status])
}

enum SubmissionStatus {
  PENDING     // Waiting for evaluation
  PROCESSING  // Being evaluated
  PASSED
  FAILED
  PARTIAL     // Partial credit
  TIMEOUT
  ERROR
  REVIEWING   // Waiting for peer/expert review
  REVIEWED    // Completed with feedback
}

// User Rankings
model UserRanking {
  id            String     @id @default(cuid())
  user_id       String
  industry_id   String
  industry      Industry   @relation(fields: [industry_id], references: [id])
  
  rank_title    String     // "Apprentice", "Journeyman", etc.
  rank_level    Int        // 1-5
  xp            Int        @default(0)
  challenges_done Int      @default(0)
  
  updated_at    DateTime   @updatedAt
  
  @@unique([user_id, industry_id])
}

// Badges & Achievements (extending existing system)
model Badge {
  id            String     @id @default(cuid())
  slug          String     @unique
  name          String
  description   String
  icon          String
  
  category      BadgeCategory
  requirement   Json       // Condition for earning
  
  industry_id   String?    // NULL = cross-industry
  industry      Industry?  @relation(fields: [industry_id], references: [id])
  
  created_at    DateTime   @default(now())
}

enum BadgeCategory {
  CHALLENGE     // Completion badges
  MASTERY       // Skill mastery badges
  STREAK        // Consistency badges
  SOCIAL        // Community interaction badges
  SPECIAL       // Limited/seasonal badges
}
```

### 4.3 API Endpoints Structure

```
API v1 Structure:

/api/v1/challenges
├── GET    │ List challenges (filterable)
├── POST   │ Create new challenge (admin/creator)
└── GET    │ /{id} Challenge detail

/api/v1/challenges/{id}
├── GET    │ Full details with solutions
├── PUT    │ Update (author only)
├── DELETE │ Remove
└── POST   │ /submit Submit solution

/api/v1/challenges/{id}/test-cases
├── GET    │ List (public + hidden for author)
└── POST   │ Add test case (author only)

/api/v1/submissions
├── GET    │ User's submissions
├── POST   │ Create new submission
└── GET    │ /{id} Submission detail

/api/v1/submissions/{id}/evaluate
├── POST   │ Trigger evaluation (async)

/api/v1/rankings
├── GET    │ Global rankings
├── GET    │ /industry/{industry_id} By industry
├── GET    │ /user/{user_id} User's ranking
└── GET    │ /skill/{skill_id} By skill

/api/v1/skills
├── GET    │ List all skills
├── GET    │ /{id} Skill details
├── GET    │ /{id}/tree Skill tree from this node
└── GET    │ /{id}/progress User progress for skill

/api/v1/reviews
├── GET    │ Pending reviews (qualified users)
├── POST   │ Submit review
└── GET    │ /{id} Review details

/api/v1/industries
├── GET    │ List industries
└── GET    │ /{id} Industry details with categories
```

---

## 💡 5. Konkrétní Příklady Challenge

### 5.1 IT & Programování

```json
{
  "title": { "cs": "Reverzování řetězce", "en": "String Reversal" },
  "category": "programming-algorithms",
  "difficulty": 1,
  "estimated_time": 15,
  "eval_type": "AUTOMATED",
  "config": {
    "language": "javascript",
    "template_code": "function reverse(str) {\n  // Vaše implementace\n}",
    "test_framework": "jest"
  },
  "test_cases": [
    {
      "input": "\"hello\"",
      "expected": "\"olleh\"",
      "is_hidden": false
    },
    {
      "input": "\"Ahoj světe\"",
      "expected": "\"etěvs johA\"",
      "is_hidden": false
    },
    {
      "input": "\"\"",
      "expected": "\"\"",
      "is_hidden": true
    }
  ],
  "base_xp": 10,
  "skills": ["javascript-basics", "string-manipulation"]
}
```

### 5.2 Řemesla - Truhlářství

```json
{
  "title": { "cs": "Spojení na rybinu (Finger Joint)", "en": "Finger Joint Connection" },
  "category": "woodworking-joinery",
  "difficulty": 5,
  "estimated_time": 120,
  "eval_type": "RUBRIC",
  "config": {
    "rubric": [
      {
        "criterion": {
          "cs": "Přesnost rozměrů",
          "en": "Dimensional Accuracy"
        },
        "levels": {
          "cs": {
            "0-20%": "Rozměry se liší o více než 3mm",
            "21-50%": "Rozměry se liší o 1-3mm",
            "51-80%": "Rozměry se liší o 0.5-1mm",
            "81-100%": "Rozměry přesné do 0.5mm"
          }
        },
        "weight": 2.0
      },
      {
        "criterion": {
          "cs": "Čistota řezu",
          "en": "Cut Cleanliness"
        },
        "levels": {
          "cs": {
            "0-20%": "Vidlky, otřepy, nečisté hrany",
            "21-50%": "Drobné nedostatky, lehké otřepy",
            "51-80%": "Čistý řez, minimální nedostatky",
            "81-100%": "Dokonale čistý řez, žádné vady"
          }
        },
        "weight": 1.5
      },
      {
        "criterion": {
          "cs": "Kvalita lepení",
          "en": "Glue Quality"
        },
        "levels": {
          "cs": {
            "0-20%": "Spoj se rozpadá, slabá adheze",
            "21-50%": "Spoj drží, ale viditelné mezery",
            "51-80%": "Spoj pevný, minimální mezery",
            "81-100%": "Spoj neviditelný, maximální pevnost"
          }
        },
        "weight": 2.0
      },
      {
        "criterion": {
          "cs": "Bezpečnost práce",
          "en": "Work Safety"
        },
        "levels": {
          "cs": {
            "0-20%": "Ignorování bezpečnostních pravidel",
            "21-50%": "Drobná pochybení v bezpečnosti",
            "51-80%": "Dodržování základních pravidel",
            "81-100%": "Příkladné dodržování bezpečnosti + ochranné pomůcky"
          }
        },
        "weight": 1.0
      }
    ]
  },
  "attachments": [
    {
      "type": "image",
      "url": "/challenges/woodworking/finger-joint-blueprint.png",
      "description": "Výkres s rozměry"
    },
    {
      "type": "video",
      "url": "/challenges/woodworking/finger-joint-tutorial.mp4",
      "description": "Instrukážní video"
    }
  ],
  "base_xp": 75,
  "skills": ["wood-selection", "precision-measuring", "glue-techniques"]
}
```

### 5.3 Kreativní - Grafický Design

```json
{
  "title": { "cs": "Design loga pro kavárnu", "en": "Coffee Shop Logo Design" },
  "category": "graphic-design-branding",
  "difficulty": 4,
  "estimated_time": 180,
  "eval_type": "PEER_REVIEW",
  "config": {
    "requirements": {
      "cs": {
        "formats": ["SVG", "PNG"],
        "color_modes": ["CMYK", "RGB"],
        "variants": ["Plná verze", "Ikona", "Monochrome"]
      },
      "deliverables": [
        "Logo v vector formátu",
        "Brand guidelines (1 strana)",
        "3 použití na reálném mockupu"
      ]
    },
    "review_criteria": [
      {
        "name": "Originalita",
        "weight": 2,
        "description": "Jak originální a zapamatovatelné je logo"
      },
      {
        "name": "Komunikace značky",
        "weight": 2,
        "description": "Jak dobře logo komunikuje charakter kavárny"
      },
      {
        "name": "Technická kvalita",
        "weight": 1.5,
        "description": "Čistota provedení, škálovatelnost"
      },
      {
        "name": "Použitelnost",
        "weight": 1.5,
        "description": "Jak dobře funguje v různých kontextech"
      }
    ],
    "reviewers_needed": 3,
    "minimum_reviewer_score": 1500 // Reputation threshold
  },
  "base_xp": 60,
  "bonus_xp": 20,
  "skills": ["vector-design", "color-theory", "brand-identity"]
}
```

### 5.4 Automobilový Průmysl

```json
{
  "title": { "cs": "Diagnostika a výměna brzdového systému", "en": "Brake System Diagnosis and Replacement" },
  "category": "automotive-mechanics",
  "difficulty": 6,
  "estimated_time": 90,
  "eval_type": "VIDEO_SUBMIT",
  "config": {
    "task_description": {
      "cs": "Proveďte kompletní diagnostiku brzdového systému a vyměňte opotřebované brzdové destičky na předním levém kole. Zdokumentujte proces od identifikace problému po finální test funkčnosti."
    },
    "required_steps": [
      {
        "step": 1,
        "name": "Vizuální inspekce",
        "description": "Zkontrolujte stav brzdových kotoučů a destiček",
        "required": true
      },
      {
        "step": 2,
        "name": "Měření tloušťky",
        "description": "Změřte a zdokumentujte tloušťku kotouče",
        "required": true
      },
      {
        "step": 3,
        "name": "Demontáž kola",
        "description": "Bezpečně zvedněte auto a sundejte kolo",
        "required": true
      },
      {
        "step": 4,
        "name": "Výměna destiček",
        "description": "Vyměňte brzdové destičky za nové",
        "required": true
      },
      {
        "step": 5,
        "name": "Montáž a test",
        "description": "Nasaďte kolo a proveďte funkční test",
        "required": true
      }
    ],
    "safety_checklist": [
      "Auto zajištěno proti pohybu",
      "Použity ochranné pomůcky",
      "Brzda zajištěna před zvednutím",
      "Kola dotáhnuta správným momentem"
    ],
    "rubric_override": {
      "safety_compliance": {
        "weight": 2,
        "levels": {
          "fail": "Závažné porušení bezpečnosti",
          "partial": "Drobná pochybení",
          "pass": "Bezpečnostní pravidla dodržena",
          "excellent": "Ukázková bezpečnost + prevence"
        }
      },
      "technical_accuracy": {
        "weight": 3,
        "levels": {
          "fail": "Technicky nesprávný postup",
          "partial": "Drobné technické chyby",
          "pass": "Správný postup dle specifikací",
          "excellent": "Profesionální úroveň provedení"
        }
      },
      "documentation_quality": {
        "weight": 1.5,
        "levels": {
          "fail": "Chybí klíčové kroky",
          "partial": "Některé kroky chybí nebo nejsou jasné",
          "pass": "Dostatečná dokumentace",
          "excellent": "Perfektní, profesionální dokumentace"
        }
      }
    }
  },
  "base_xp": 100,
  "skills": ["brake-systems", "vehicle-safety", "precision-tools"]
}
```

---

## 🛠️ 6. Implementační Roadmap

### Fáze 1: Core Infrastructure (Měsíc 1-2)

```
Týden 1-2: Database & Backend Foundation
├── Prisma schema rozšíření
├── API routes pro challenges CRUD
├── Authentication & Authorization
└── Základní upload systém (attachments)

Týden 3-4: Challenge Creation Flow
├── Admin panel pro tvorbu challenge
├── Multi-language support
├── Template system pro různé typy
└── Preview mode (draft challenges)
```

### Fáze 2: Programming Challenges (Měsíc 2-3)

```
Týden 5-6: Code Execution Engine
├── Sandboxed Docker environment
├── Language support: JS, Python, TypeScript
├── Test runner integration
└── Execution timeout & limits

Týden 7-8: Challenge Experience
├── Code editor v prohlížeči (Monaco/CodeMirror)
├── Real-time test feedback
├── Solution history & versioning
└── Best solutions gallery
```

### Fáze 3: Rubric-Based Challenges (Měsíc 3-4)

```
Týden 9-10: Rubric System
├── Dynamic rubric builder
├── Score calculation engine
├── Feedback template system
└── Reviewer qualification system

Týden 11-12: Manual Review Workflow
├── Review assignment queue
├── Review interface
├── Appeal system
└── Quality control (reviewer rating)
```

### Fáze 4: Skill & Progress System (Mýtus 4-5)

```
Týden 13-14: Skill Tree
├── Skill graph visualization
├── Dependency resolution
├── Progress tracking per skill
└── Skill-based recommendations

Týden 15-16: Rankings & Leaderboards
├── Industry-specific rankings
├── Skill leaderboards
├── Historical progress tracking
└── Achievement integration
```

### Fáze 5: Multi-Industry Extension (Měsíc 5-6)

```
Týden 17-18: Industry Framework
├── Flexible category system
├── Industry admin delegation
├── Custom evaluation types
└── Template library

Týden 19-20: Video Submission (Optional)
├── Video upload & processing
├── Thumbnail generation
├── Video player integration
└── Secure video delivery
```

### Fáze 6: Advanced Features (Měsíc 6-8)

```
Týden 21-24: Advanced Features
├── Peer review system (gamified)
├── Team challenges & competitions
├── Custom challenge creation (users)
├── API for external integrations
└── Analytics dashboard (admin)
```

---

## 💰 7. Monetizace

### 7.1 Revenue Streams

#### A) Freemium Model (per Industry)
```
FREE TIER:
├── 5 challenges/industry (týdně)
├── Basic progress tracking
├── Community access (discussions)
└── Public leaderboards

PREMIUM ($4.99/měsíc per industry):
├── Unlimited challenges
├── Detailed analytics
├── Certificate generation
├── Priority review queue
├── Expert feedback (1x/měsíc)
└── Offline mode

BUNDLE (všechny industries):
├── $14.99/měsíc
├── Cross-industry skill tracking
├── Unified dashboard
└── 20% savings
```

#### B) Certification & Badges
```
Completion Certificates:
├── Digital certificate (PDF)      │ $2.99
├── Verified badge (LinkedIn)     │ $4.99
├── Physical certificate + frame  │ $19.99

Industry Certifications:
├── Level 1 Certification         │ $29.99
├── Level 2 Certification         │ $49.99
├── Master Certification          │ $99.99
└── Annual recertification        │ 50% of original
```

#### C) B2B / Enterprise
```
Business Plan:
├── Team Management               │ $49/uživatel/měsíc
├── Custom challenges             │ $500/vytvoření
├── Dedicated support             │ $1000/měsíc
├── White-label option            │ custom pricing
└── API access                    │ $199/měsíc

Educational Institutions:
├── Classroom management          │ $9.99/učitel/měsíc
├── Student progress reporting    │ v ceně
├── Curriculum integration        │ custom
└── Bulk discounts                │ 50% pro 50+ users
```

#### D) Advertising (Free Tier Only)
```
Ad Placements:
├── Banner ads                    │ CPM $2-5
├── Sponsored challenges          │ $500-2000/campaign
├── Native content                │ CPM $5-10
├── Skill tree sponsorships       │ $1000/month per skill
└── Referral partnerships         │ revenue share
```

### 7.2 Projected Revenue (Conservative)

```
Year 1:
├── Programming Challenges        │ $2,000/měsíc (est. 400 paid users)
├── Trades & Crafts              │ $1,000/měsíc (est. 200 paid users)
├── Enterprise                   │ $1,500/měsíc (3 business clients)
├── Certifications               │ $500/měsíc
├── Ads (free tier)              │ $500/měsíc
    └─── TOTAL                   │ $5,500/měsíc

Year 2:
├── Programming Challenges        │ $8,000/měsíc
├── Trades & Crafts              │ $4,000/měsíc
├── Creative Industries          │ $3,000/měsíc
├── Enterprise                   │ $5,000/měsíc
├── Certifications               │ $2,000/měsíc
└── TOTAL                        │ $22,000/měsíc

Year 3:
├── Full platform                │ $50,000/měsíc (est.)
└── Growth rate: 50-100% YoY
```

---

## 🔒 8. Bezpečnost a Compliance

### 8.1 Security Measures

```
Code Execution Sandbox:
├── Container isolation (Docker)
├── Network isolation
├── CPU/memory limits
├── Timeout enforcement
├── No file system access
└── Ephemeral containers per run

Data Protection:
├── Encryption at rest (AES-256)
├── Encryption in transit (TLS 1.3)
├── GDPR compliance (EU data)
├── Data residency options
├── User data export (GDPR right)
└── Right to deletion (GDPR right)

Access Control:
├── Role-based access (RBAC)
├── Challenge authorship permissions
├── Reviewer qualification gates
├── Admin audit logging
└── 2FA for elevated privileges
```

### 8.2 Content Moderation

```
Challenge Content:
├── Submission review (admin approval)
├── Flagging system (users)
├── AI-assisted content scanning
├── Copyright detection
└── Appeal process for challenges

Community Interactions:
├── Peer review quality scoring
├── Report system for abuse
├── Reputation-weighted voting
├── Ban/kick mechanisms
└── Community guidelines enforcement
```

---

## 📊 9. Analytics & Metrics

### 9.1 Key Performance Indicators

```
User Engagement:
├── DAU/MAU ratio (target: >30%)
├── Challenge completion rate (target: >60%)
├── Average session duration (target: >15 min)
├── Return frequency (target: >3x/week)
└── Premium conversion rate (target: >5%)

Content Quality:
├── Challenge rating average (target: >4.0/5)
├── Review response time (target: <24 hours)
├── Submission pass rate (target: 40-60% optimal)
└── User satisfaction score (NPS target: >40)

Business Metrics:
├── MRR (Monthly Recurring Revenue)
├── Churn rate (target: <5%/month)
├── LTV/CAC ratio (target: >3x)
├── Customer acquisition cost
└── Revenue per user (ARPU)
```

### 9.2 Analytics Dashboard (Admin)

```
Real-time Monitoring:
├── Active users
├── Running submissions
├── Queue lengths (evaluation)
└── System health metrics

User Insights:
├── Skill gaps analysis
├── Popular challenges
├── Drop-off points
└── User journey maps

Revenue Analytics:
├── Conversion funnels
├── Revenue by industry
├── Cohort analysis
└── Forecast projections
```

---

## 🚀 10. Další Rozvojové Možnosti

### 10.1 Integrace

```
External Platforms:
├── LinkedIn skill endorsements
├── GitHub profile integration
├── Professional portfolio export
├── Slack/Discord notifications
├── LMS integration (SCORM, xAPI)
└── Job platform connections

Enterprise:
├── SSO (SAML, OAuth)
├── SCIM provisioning
├── Custom SAML attributes
├── Audit logs export
└── API access
```

### 10.2 AI Features

```
Challenge Generation:
├── AI-powered challenge creation
├── Difficulty calibration
├── Personalized recommendations
├── Adaptive difficulty adjustment
└── Natural language challenge parsing

Evaluation Enhancement:
├── Automated code review
├── Style suggestions
├── Performance optimization hints
├── Video analysis (pose detection)
└── Plagiarism detection

User Assistance:
├── Challenge hints (AI-powered)
├── Learning path suggestions
├── Skill gap analysis
├── Career recommendations
└── Chatbot for platform help
```

### 10.3 Community Features

```
Social:
├── User profiles
├── Follow system
├── Challenge sharing
├── Solution discussions
├── Study groups
└── Mentorship matching

Competitive:
├── Weekly challenges
├── Monthly competitions
├── Team vs team battles
├── Industry leaderboards
└── Special events (holidays, launches)

Content:
├── User-generated tutorials
├── Solution walkthroughs
├── Tips & tricks library
├── AMAs with experts
└── Success stories
```

---

## 📝 11. Shrnutí a Doporučení

### 11.1 Klíčové Výhody Řešení

1. **Škálovatelnost**: Architektura podporuje neomezený počet odvětví
2. **Flexibilita**: Univerzální framework pro různé typy challenge
3. **Modularita**: Každý evaluation typ je plug-and-play
4. **Komunitní prvek**: Peer review a gamifikace zvyšují engagement
5. **Monetizace**: Multiple revenue streams z různých zdrojů
6. **Data advantage**: Unikátní skills data napříč odvětvími

### 11.2 Rizika a Mitigace

| Riziko | Pravděpodobnost | Dopad | Mitigace |
|--------|-----------------|-------|----------|
| Nízký content creation | Střední | Vysoký | Templates, AI-assisted creation |
| Uživatelé nehodnotí | Střední | Střední | Gamifikace review procesu |
| Bezpečnost breach | Nízká | Vysoká | Sandboxing, audits, penetration testing |
| Konkurence | Střední | Střední | First-mover advantage, unique data |
| Regulatory issues | Nízká | Střední | Legal review, compliance team |

### 11.3 Další Kroky

1. **Schválení plánu**: Potvrdit rozsah a priority
2. **Detailní specifikace**: Vybrat první industry pro pilot
3. **Resource planning**: Odhadnout development capacity
4. **MVP definice**: Co je minimum pro launch
5. **Timeline commitment**: Realistický harmonogram

---

## 📞 Kontakty a Zdroje

### Technická Dokumentace
- Prisma Schema: `/prisma/schema.prisma`
- API Docs: `/docs/api/v1/`
- Component Library: `/src/components/ui/`

### Reference
- Codewars: https://www.codewars.com
- LeetCode: https://leetcode.com
- HackerRank: https://www.hackerrank.com
- Exercism: https://exercism.org

### Související Dokumenty
- [DEVELOPMENT.md](DEVELOPMENT.md) - Vývojová dokumentace
- [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - Implementační guide
- [MONETIZATION_STRATEGY.md](MONETIZATION_STRATEGY.md) - Monetizační strategie

---

*Vytvořeno: 2026-01-24*
*Verze: 1.0*
*Autor: Matrix Agent*
