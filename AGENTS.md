# AGENTS.md - AI Agent Documentation for Tomas Learning Platform

## Project Overview

**Tomas Learning Platform** is a career development web application built with Next.js 16, React, and TypeScript. It provides comprehensive career tracking, skill management, gamification, job hunting tools, and AI-assisted guidance.

**Repository**: `E:\VS Projekty\pracovnivzdelavaciplatforma`
**Platform**: Windows (win32)
**Framework**: Next.js App Router

## Key Technologies

- **Frontend**: Next.js 16, React 19, TypeScript 5
- **Styling**: Bootstrap 5, Custom CSS (Glassmorphism, WaveBackground)
- **Database**: Prisma ORM with SQLite (development)
- **Authentication**: NextAuth.js
- **State Management**: React Hooks
- **Drag & Drop**: @dnd-kit
- **Charts/Analytics**: Recharts
- **Validation**: Zod

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── achievements/       # User achievements display
│   ├── analytics/          # Progress analytics
│   ├── articles/           # IT & AI articles
│   ├── auth/               # Authentication pages
│   ├── career-report/      # Career market reports
│   ├── courses/            # Online courses
│   ├── missions/           # User missions/tasks
│   ├── training/           # Educational modules
│   └── page.tsx            # Main dashboard
├── components/             # React components
│   ├── gamification/       # Achievements, XP, Milestones, Roadmap
│   ├── AkizeGuide.tsx      # AI chat bot
│   ├── EducationSection.tsx
│   ├── WorkSection.tsx     # Job board
│   └── ProgressAnalytics.tsx
├── lib/                    # Utility functions
│   └── gamification/       # XP system, achievements, milestones, roadmap
├── types/                  # TypeScript definitions
└── generated/              # Prisma client
├── generated/prisma/       # Prisma generated files

prisma/
├── schema.prisma           # Database schema
└── migrations/             # Database migrations

scripts/                    # Utility scripts
```

## Development Conventions

### Code Style

- **Language**: TypeScript for all new code
- **No comments**: Do NOT add comments to code unless explicitly requested
- **No emojis in code**: Avoid emojis in code files
- **Clean, minimal code**: Follow existing patterns in the codebase

### File Operations

- **Read before edit**: Always read existing files before modifying them
- **Use absolute paths**: All file paths must be absolute (e.g., `E:\VS Projekty\pracovnivzdelavaciplatforma\src\app\page.tsx`)
- **Batch reads**: Use parallel reads for multiple files when appropriate

### Git Operations

- **Never commit unless asked**: Only commit when user explicitly requests
- **Never push without confirmation**: Never force push or make irreversible git changes
- **Ask before amend**: Only use `git commit --amend` if user explicitly requests

### Tool Usage

- **Prefer dedicated tools**: Use grep, glob, read, edit over bash commands like `cat`, `find`, `head`, `tail`
- **Single bash calls**: Batch multiple bash commands when possible
- **No cd commands**: Use `workdir` parameter instead of `cd`

## Development Commands

```bash
# Install dependencies
npm install

# Database setup
npx prisma generate
npx prisma db push

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Database Schema

The project uses Prisma with SQLite. Key models include:
- **User**: User profiles and authentication
- **Mission**: User missions and tasks
- **Course**: Educational courses
- **Module**: Course modules
- **Job**: Job listings
- **Achievement**: User achievements

Run `npx prisma generate` after any schema changes.

## Gamification System

The platform includes a comprehensive gamification system:

### XP & Levels
- 30 levels from "Nováček" (Novice) to "Neohrožený" (Fearless)
- XP earned through completing missions, courses, and achievements

### Achievements
- 50+ achievements across rarity tiers: Common, Rare, Epic, Legendary, Mythic
- Categories include learning, career, social, and special achievements

### Milestones
- 30+ tracked milestones with rewards
- Career progression milestones across 8 career paths

### Career Paths
- Frontend, Backend, Full Stack, Data Science, Security, DevOps, Mobile, AI/ML

## AI Agent Guidelines

### When Working with This Project

1. **Understand the stack**: The project uses Next.js 16 App Router with React 19
2. **Check existing patterns**: Always look at similar components/functions before writing new code
3. **Follow conventions**: Match the existing code style and structure
4. **Security first**: Never expose secrets, API keys, or credentials
5. **Test changes**: When adding features, verify with existing tests if available

### Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] No hardcoded secrets or API keys
- [ ] Follows existing component patterns
- [ ] Handles edge cases and errors
- [ ] Responsive design considerations (Bootstrap-based)
- [ ] Accessibility (ARIA labels where appropriate)

### Common Patterns

**Component Pattern**:
```tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function ComponentName() {
  return (
    <Container>
      {/* content */}
    </Container>
  );
}
```

**Data Fetching Pattern**:
```tsx
// Server components use async/await
// Client components use useEffect or React Query
```

**Database Access Pattern**:
```tsx
import { prisma } from '@/lib/prisma';

// Use prisma client for database operations
const data = await prisma.model.findMany();
```

## Build & Deployment

- **Next.js build**: Run `npm run build` to create production build
- **Output directory**: `.next/` contains built application
- **Environment variables**: Use `.env.local` for local development

## Testing

- Check `package.json` for available test scripts
- Run `npm test` or appropriate test command
- Always lint before committing: `npm run lint`

## Documentation Files

- `README.md` - Main project documentation
- `ROADMAP.md` - Development roadmap
- `GAMIFICATION.md` - Gamification system details
- `MONETIZATION_STRATEGY.md` - Business model documentation
- `CAREER_SKILL_MAP.md` - Career and skill mapping
- `AGENTS.md` - This file (AI agent guidelines)
- `CHANGELOG.md` - Version history

## Important Notes

1. **Windows Environment**: All paths use Windows format
2. **Development Database**: Uses SQLite (`dev.db`) for development
3. **TypeScript Strict Mode**: Enable strict type checking
4. **Bootstrap 5**: Use Bootstrap components for consistent styling
5. **Glassmorphism UI**: Custom CSS for glassmorphism effects

## Contact

For questions about development, refer to the project maintainer.
