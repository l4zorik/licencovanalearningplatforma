# Plan: Projekty & Life OS Integration

## Objective
Create separate "Projekty" (Projects) window/overlay at the top level for tracking/logging algorithms and work progress, integrated with Life OS 2026 goals.

## Architecture Overview
```
┌─────────────────────────────────────────────────────────┐
│  🏠 HOME / DASHBOARD                                    │
│  ├── 🎯 Life OS 2026 (Cíle)                             │
│  │     └── 📋 Misions / 📊 Analytics / 🎓 Education     │
│  │                                                   │
│  ├── 🆕 PROJEKTY (NEW - Separate Window)              │  ← NEW
│  │     └── 🔐 Algoritmy/Logs                          │
│  │                                                   │
│  └── 💼 Jobs / 🎓 Courses / 🛡️ Achievements           │
└─────────────────────────────────────────────────────────┘
```

## Phase 1: Data Structures
- [ ] Create `src/types/projects.ts`:
  - Project type with goals, milestones, algorithms
  - Algorithm log entry type
  - Project progress tracking

- [ ] Create `src/data/projects/data.ts`:
  - Project templates
  - Algorithm logging structure
  - Project categories

## Phase 2: Projects Page/Overlay
- [ ] Create `src/app/projects/page.tsx` - New separate page
- [ ] Create `src/components/projects/ProjectsWindow.tsx` - Overlay window
- [ ] Create `src/components/projects/ProjectCard.tsx`
- [ ] Create `src/components/projects/AlgorithmLogger.tsx`
- [ ] Create `src/components/projects/ProjectProgress.tsx`

## Phase 3: Gamification for Projects
- [ ] XP for completing project milestones
- [ ] Achievements for project streaks
- [ ] Level progression based on projects completed
- [ ] Algorithm logging rewards

## Phase 4: Integration with Life OS
- [ ] Link projects to Life OS goals
- [ ] Show project progress in Life OS dashboard
- [ ] Cross-reference skills with projects

## Phase 5: Algorithm Logging System
- [ ] Daily algorithm log entries
- [ ] Progress visualization
- [ ] Time tracking per project
- [ ] Export/analytics for algorithms

## Success Criteria
- [ ] Separate projects window functional
- [ ] Algorithm logging system working
- [ ] Gamification integrated
- [ ] Connected to Life OS goals
- [ ] All TypeScript errors resolved

## Timeline: 7 days
