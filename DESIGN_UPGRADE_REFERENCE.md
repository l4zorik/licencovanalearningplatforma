# 🎨 Design Upgrade - Quick Reference

## ✅ Co bylo implementováno

### 1. Design System V2
- ✅ `src/styles/design-system-v2.css`
  - Rozšířená typografie s fluid sizing
  - 8 gradient variant (cosmic, sunset, ocean, forest, fire, aurora, neon, mint)
  - Rozšířený spacing system (8px grid)
  - Enhanced shadows s colored variants
  - Animation easing functions
  - Z-index scale

### 2. Animation Library
- ✅ `src/styles/animations.css`
  - Fade animations (fadeIn, fadeOut, fadeInScale)
  - Slide animations (slideInRight, slideInLeft, slideInUp, slideInDown)
  - Motion animations (bounce, pulse, heartbeat, float)
  - Rotate animations (spin, wiggle)
  - Shimmer & glow effects
  - Utility animation classes
  - Stagger delays pro sekvenční animace

### 3. UI Components

#### Card Component
- ✅ `src/components/ui/Card.tsx`
- ✅ `src/components/ui/Card.module.css`
- **Varianty:**
  - `default` - Standardní karta
  - `premium` - S gradient top border
  - `gradient` - Gradient border
  - `glass` - Glassmorphism efekt
  - `neon` - Neon glow na hover
- **Props:**
  - `variant`, `gradient`, `hover`, `glow`, `className`, `onClick`

#### Button Component
- ✅ `src/components/ui/Button.tsx`
- ✅ `src/components/ui/Button.module.css`
- **Varianty:**
  - `primary` - Primární tlačítko
  - `gradient` - S gradient pozadím
  - `neomorph` - Neomorphic design
  - `outline` - Outline styl
  - `ghost` - Průhledné tlačítko
- **Props:**
  - `variant`, `size` (sm/md/lg), `gradient`, `loading`, `icon`, `iconPosition`, `fullWidth`

#### Progress Component
- ✅ `src/components/ui/Progress.tsx`
- ✅ `src/components/ui/Progress.module.css`
- **Features:**
  - Gradient support
  - Shimmer animation
  - 3 velikosti (sm/md/lg)
  - Label support
- **Props:**
  - `value`, `max`, `gradient`, `showLabel`, `animated`, `height`

#### Badge Component
- ✅ `src/components/ui/Badge.tsx`
- ✅ `src/components/ui/Badge.module.css`
- **Varianty:**
  - `default` - Solid color
  - `gradient` - Gradient background
  - `glow` - S glow efektem
  - `outline` - Outline styl
- **Props:**
  - `variant`, `color`, `gradient`, `icon`, `pulse`

### 4. Dashboard Components
- ✅ `src/components/dashboard/DashboardCard.tsx`
- ✅ `src/components/dashboard/DashboardCard.module.css`
- **Features:**
  - Gradient icon wrapper
  - Trend indicators (↑/↓)
  - Icon animations on hover
  - Responsive design

### 5. Demo Page
- ✅ `src/app/design-showcase/page.tsx`
- Kompletní showcase všech komponent
- Příklady použití
- Všechny varianty a kombinace

---

## 🚀 Použití

### Import komponent

```typescript
// UI komponenty
import { Card, Button, Progress, Badge } from '@/components/ui';

// Dashboard komponenty
import DashboardCard from '@/components/dashboard/DashboardCard';
```

### Příklady

#### Card
```typescript
<Card variant="premium" gradient="cosmic" hover>
  <h3>Můj obsah</h3>
</Card>
```

#### Button
```typescript
<Button 
  variant="gradient" 
  gradient="sunset" 
  icon={<FiStar />}
  onClick={handleClick}
>
  Klikni zde
</Button>
```

#### Progress
```typescript
<Progress 
  value={75} 
  max={100} 
  gradient="ocean" 
  animated 
  showLabel 
/>
```

#### Badge
```typescript
<Badge variant="gradient" gradient="fire" icon={<FiAward />}>
  Nové
</Badge>
```

#### DashboardCard
```typescript
<DashboardCard
  title="Aktivní Projekty"
  value="12"
  subtitle="3 nové tento týden"
  icon={<FiTarget />}
  gradient="cosmic"
  trend={{ value: 15, label: 'vs. minulý měsíc' }}
/>
```

---

## 🎨 Gradient Varianty

| Název | Použití | Barvy |
|-------|---------|-------|
| `cosmic` | Projekty, obecné | Indigo → Purple |
| `sunset` | Cíle, milestones | Pink → Yellow |
| `ocean` | Vzdělávání | Navy → Cyan |
| `forest` | Kariéra, růst | Cyan → Green |
| `fire` | Achievementy | Red → Orange |
| `mint` | Statistiky | Blue → Cyan |

---

## 🎬 Animation Classes

### Fade Animations
```html
<div class="animate-fade-in"></div>
<div class="animate-fade-in-scale"></div>
```

### Slide Animations
```html
<div class="animate-slide-in-right"></div>
<div class="animate-slide-in-up"></div>
```

### Motion Animations
```html
<div class="animate-bounce"></div>
<div class="animate-pulse"></div>
<div class="animate-float"></div>
<div class="animate-heartbeat"></div>
```

### Shimmer & Glow
```html
<div class="animate-shimmer"></div>
<div class="animate-glow-pulse"></div>
```

### Stagger Delays
```html
<div class="animate-fade-in stagger-1"></div>
<div class="animate-fade-in stagger-2"></div>
<div class="animate-fade-in stagger-3"></div>
```

---

## 🎯 Utility Classes

### Gradient Text
```html
<h1 class="gradient-text-cosmic">Cosmic Text</h1>
<h1 class="gradient-text-sunset">Sunset Text</h1>
```

### Glass Effect
```html
<div class="glass-v2">Glass content</div>
```

### Neomorphism
```html
<div class="neomorph">Neomorph card</div>
```

### Typography
```html
<h1 class="text-display">Display Text</h1>
<h2 class="text-heading">Heading Text</h2>
```

### Hover Effects
```html
<div class="hover-lift">Lifts on hover</div>
<div class="hover-scale">Scales on hover</div>
<div class="hover-glow">Glows on hover</div>
```

---

## 📱 Demo Stránka

Navštivte `/design-showcase` pro živou ukázku všech komponent:

```
http://localhost:3000/design-showcase
```

---

## 🔄 Next Steps

### Fáze 2: Implementace do stávajících stránek
1. Aktualizovat hlavní dashboard (`src/app/page.tsx`)
2. Vylepšit Projects page
3. Vylepšit Goals section
4. Vylepšit Achievements gallery

### Fáze 3: Pokročilé komponenty
1. Modal s novým designem
2. Tooltip komponenta
3. Dropdown menu s animacemi
4. Toast notifications
5. Loading states (skeleton loaders)

### Fáze 4: Responsive & Mobile
1. Mobile optimalizace
2. Touch gestures
3. Mobile navigation
4. PWA enhancement

---

## 📝 Poznámky

### Performance
- Všechny animace používají CSS transforms (GPU accelerated)
- `will-change` je použit opatrně
- Animace jsou optimalizované pro 60 FPS

### Accessibility
- Všechny komponenty mají proper ARIA labels
- Focus states jsou jasně viditelné
- Keyboard navigation funguje správně
- Color contrast splňuje WCAG AA

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS custom properties
- CSS Grid & Flexbox
- Backdrop filter (s fallbackem)

---

**Verze:** 1.0  
**Datum:** 23. leden 2026  
**Status:** ✅ Implementováno
