# 🛠️ Implementation Guide - Design Upgrade
## Praktický Průvodce Implementací

> **Pro:** Vývojáře Tomas Learning Platform  
> **Účel:** Step-by-step implementace design upgradu  
> **Obtížnost:** Střední až Pokročilá  

---

## 📋 Obsah

1. [Quick Start](#quick-start)
2. [Fáze 1: Design System](#fáze-1-design-system)
3. [Fáze 2: Komponenty](#fáze-2-komponenty)
4. [Fáze 3: Praktické Příklady](#fáze-3-praktické-příklady)
5. [Testing & QA](#testing--qa)
6. [Deployment](#deployment)

---

## 🚀 Quick Start

### 1. Instalace Závislostí

```bash
# Installation
npm install framer-motion react-spring canvas-confetti react-intersection-observer react-use-measure

# Dev dependencies
npm install -D @types/canvas-confetti autoprefixer postcss
```

### 2. Konfigurace Next.js

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'react-spring']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  images: {
    formats: ['image/avif', 'image/webp']
  }
}

export default nextConfig;
```

### 3. Font Setup

```typescript
// src/app/layout.tsx
import { Inter, Poppins, Montserrat, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const poppins = Poppins({ 
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap'
});

const montserrat = Montserrat({ 
  weight: ['700', '900'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap'
});

export default function RootLayout({ children }) {
  return (
    <html lang="cs" className={`${inter.variable} ${poppins.variable} ${montserrat.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 🎨 Fáze 1: Design System

### Krok 1.1: Vytvoření Extended Design System

Vytvořte nový soubor: `src/styles/design-system-v2.css`

```css
/* 🎨 Tomas Learning Platform - Design System V2 */

:root {
  /* === TYPOGRAPHY === */
  --font-body: var(--font-inter), system-ui, sans-serif;
  --font-heading: var(--font-poppins), sans-serif;
  --font-display: var(--font-montserrat), sans-serif;
  --font-mono: var(--font-jetbrains), monospace;

  /* === FLUID TYPOGRAPHY === */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.3rem + 1vw, 1.875rem);
  --text-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem);
  --text-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3rem);
  --text-5xl: clamp(3rem, 2.5rem + 2.5vw, 4rem);

  /* === EXTENDED COLOR PALETTE === */
  
  /* Brand Colors */
  --color-brand-primary: #6366f1;
  --color-brand-secondary: #8b5cf6;
  --color-brand-tertiary: #ec4899;
  
  /* Gradient Library */
  --gradient-cosmic: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-sunset: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  --gradient-ocean: linear-gradient(135deg, #2e3192 0%, #1bffff 100%);
  --gradient-forest: linear-gradient(135deg, #0cebeb 0%, #20e3b2 29%, #29ffc6 100%);
  --gradient-fire: linear-gradient(135deg, #ff6a00 0%, #ee0979 100%);
  --gradient-aurora: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  --gradient-neon: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-mint: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  
  /* Category Gradients */
  --gradient-projects: var(--gradient-cosmic);
  --gradient-goals: var(--gradient-sunset);
  --gradient-achievements: var(--gradient-fire);
  --gradient-learning: var(--gradient-ocean);
  --gradient-career: var(--gradient-forest);
  
  /* Glow Effects */
  --glow-primary: 0 0 30px rgba(99, 102, 241, 0.3);
  --glow-success: 0 0 30px rgba(34, 197, 94, 0.3);
  --glow-warning: 0 0 30px rgba(250, 204, 21, 0.3);
  --glow-danger: 0 0 30px rgba(239, 68, 68, 0.3);
  --glow-cosmic: 0 0 40px rgba(102, 126, 234, 0.4);
  
  /* === SPACING (8px Grid) === */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* === BORDER RADIUS === */
  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-base: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-2xl: 2rem;
  --radius-3xl: 3rem;
  --radius-full: 9999px;
  
  /* Component Specific */
  --radius-card: var(--radius-xl);
  --radius-button: var(--radius-lg);
  --radius-input: var(--radius-md);
  --radius-modal: var(--radius-2xl);
  --radius-badge: var(--radius-full);

  /* === ENHANCED SHADOWS === */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* Colored Shadows */
  --shadow-primary: 0 10px 40px -10px rgba(99, 102, 241, 0.3);
  --shadow-success: 0 10px 40px -10px rgba(34, 197, 94, 0.3);
  --shadow-warning: 0 10px 40px -10px rgba(250, 204, 21, 0.3);
  --shadow-danger: 0 10px 40px -10px rgba(239, 68, 68, 0.3);
  
  /* Inner Shadows */
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  --shadow-inner-lg: inset 0 4px 8px 0 rgba(0, 0, 0, 0.1);

  /* === ANIMATION === */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;
}

/* Dark Mode Adjustments */
[data-theme="dark"] {
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.6);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.7);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
}
```

### Krok 1.2: Animační Knihovna

Vytvořte: `src/styles/animations.css`

```css
/* 🎬 Animation Library */

/* === FADE ANIMATIONS === */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
}

@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

/* === SLIDE ANIMATIONS === */
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* === BOUNCE & PULSE === */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(0.95); }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.1); }
  28% { transform: scale(1); }
  42% { transform: scale(1.1); }
  70% { transform: scale(1); }
}

/* === ROTATE & SPIN === */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* === SHAKE === */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

/* === SHIMMER & GLOW === */
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px var(--color-accent-primary); }
  50% { box-shadow: 0 0 20px var(--color-accent-primary); }
}

/* === GRADIENT SHIFT === */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* === FLIP === */
@keyframes flipX {
  from { transform: perspective(400px) rotateX(90deg); opacity: 0; }
  to { transform: perspective(400px) rotateX(0deg); opacity: 1; }
}

@keyframes flipY {
  from { transform: perspective(400px) rotateY(90deg); opacity: 0; }
  to { transform: perspective(400px) rotateY(0deg); opacity: 1; }
}

/* === UTILITY CLASSES === */
.animate-fade-in {
  animation: fadeIn 0.4s var(--ease-out) forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.4s var(--ease-out) forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 0.4s var(--ease-out) forwards;
}

.animate-bounce {
  animation: bounce 1s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s var(--ease-in-out) infinite;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-shimmer {
  background: linear-gradient(
    90deg,
    var(--color-bg-tertiary) 25%,
    var(--color-bg-secondary) 37%,
    var(--color-bg-tertiary) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

/* === STAGGER DELAYS === */
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }
```

### Krok 1.3: Import do globals.css

```css
/* src/app/globals.css */
@import '../styles/design-system.css';
@import '../styles/design-system-v2.css';
@import '../styles/animations.css';

/* Rest of your global styles... */
```

---

## 🧩 Fáze 2: Komponenty

### Krok 2.1: Premium Card Component

Vytvořte: `src/components/ui/Card.tsx`

```typescript
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './Card.module.css';

export type CardVariant = 'default' | 'gradient' | 'glass' | 'neon' | 'premium';
export type CardGradient = 'cosmic' | 'sunset' | 'ocean' | 'forest' | 'fire' | 'mint';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  gradient?: CardGradient;
  hover?: boolean;
  glow?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  gradient = 'cosmic',
  hover = true,
  glow = false,
  className = '',
  onClick
}) => {
  const variantClasses = {
    default: styles.cardDefault,
    gradient: styles.cardGradient,
    glass: styles.cardGlass,
    neon: styles.cardNeon,
    premium: styles.cardPremium
  };

  const gradientClass = `gradient-${gradient}`;

  return (
    <motion.div
      className={`${styles.card} ${variantClasses[variant]} ${hover ? styles.cardHover : ''} ${glow ? styles.cardGlow : ''} ${className}`}
      data-gradient={gradient}
      onClick={onClick}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {variant === 'gradient' && <div className={`${styles.gradientBorder} ${gradientClass}`} />}
      {children}
    </motion.div>
  );
};

export default Card;
```

`src/components/ui/Card.module.css`

```css
.card {
  position: relative;
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-out);
}

/* Default Card */
.cardDefault {
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}

/* Premium Card */
.cardPremium {
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
}

.cardPremium::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--gradient-cosmic);
  opacity: 0;
  transition: opacity var(--duration-normal);
}

.cardPremium.cardHover:hover::before {
  opacity: 1;
}

/* Gradient Border Card */
.cardGradient {
  padding: 2px;
  background: var(--gradient-cosmic);
}

.cardGradient > * {
  background: var(--color-bg-elevated);
  border-radius: calc(var(--radius-card) - 2px);
  padding: var(--space-6);
}

.card[data-gradient="cosmic"] {
  --card-gradient: var(--gradient-cosmic);
}

.card[data-gradient="sunset"] {
  --card-gradient: var(--gradient-sunset);
}

.card[data-gradient="ocean"] {
  --card-gradient: var(--gradient-ocean);
}

.card[data-gradient="forest"] {
  --card-gradient: var(--gradient-forest);
}

.card[data-gradient="fire"] {
  --card-gradient: var(--gradient-fire);
}

.card[data-gradient="mint"] {
  --card-gradient: var(--gradient-mint);
}

.cardGradient {
  background: var(--card-gradient, var(--gradient-cosmic));
}

/* Glass Card */
.cardGlass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
}

/* Neon Card */
.cardNeon {
  background: var(--color-bg-elevated);
  border: 2px solid transparent;
  padding: var(--space-6);
}

.cardNeon::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: var(--gradient-neon);
  border-radius: var(--radius-card);
  z-index: -1;
  opacity: 0;
  filter: blur(10px);
  transition: opacity var(--duration-normal);
}

.cardNeon.cardHover:hover::before {
  opacity: 0.8;
}

/* Hover Effects */
.cardHover:hover {
  box-shadow: var(--shadow-xl), var(--shadow-primary);
  border-color: var(--color-accent-primary);
}

/* Glow Effect */
.cardGlow {
  box-shadow: var(--shadow-md), var(--glow-cosmic);
}
```

### Krok 2.2: Enhanced Button Component

Vytvořte: `src/components/ui/Button.tsx`

```typescript
import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'gradient' | 'neomorph' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  gradient?: string;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  gradient = 'cosmic',
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const variantClasses = {
    primary: styles.btnPrimary,
    gradient: styles.btnGradient,
    neomorph: styles.btnNeomorph,
    outline: styles.btnOutline,
    ghost: styles.btnGhost
  };

  const sizeClasses = {
    sm: styles.btnSm,
    md: styles.btnMd,
    lg: styles.btnLg
  };

  return (
    <motion.button
      className={`
        ${styles.btn}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${loading ? styles.btnLoading : ''}
        ${className}
      `}
      data-gradient={gradient}
      disabled={disabled || loading}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {loading && (
        <span className={styles.spinner}>
          <span className={styles.spinnerCircle} />
        </span>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className={styles.icon}>{icon}</span>
      )}
      
      <span className={styles.btnText}>{children}</span>
      
      {!loading && icon && iconPosition === 'right' && (
        <span className={styles.icon}>{icon}</span>
      )}
      
      {variant === 'gradient' && <div className={styles.shimmer} />}
    </motion.button>
  );
};

export default Button;
```

`src/components/ui/Button.module.css`

```css
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
  overflow: hidden;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Sizes */
.btnSm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  border-radius: var(--radius-md);
}

.btnMd {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  border-radius: var(--radius-button);
}

.btnLg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
  border-radius: var(--radius-button);
}

/* Variants */
.btnPrimary {
  background: var(--color-accent-primary);
  color: white;
}

.btnPrimary:hover {
  background: var(--color-accent-secondary);
  box-shadow: var(--shadow-lg), var(--glow-primary);
}

.btnGradient {
  background: var(--gradient-cosmic);
  color: white;
  border: none;
}

.btn[data-gradient="cosmic"] {
  background: var(--gradient-cosmic);
}

.btn[data-gradient="sunset"] {
  background: var(--gradient-sunset);
}

.btn[data-gradient="ocean"] {
  background: var(--gradient-ocean);
}

.btn[data-gradient="forest"] {
  background: var(--gradient-forest);
}

.btn[data-gradient="fire"] {
  background: var(--gradient-fire);
}

.btnGradient:hover {
  box-shadow: var(--shadow-xl), var(--glow-cosmic);
}

.btnNeomorph {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  box-shadow: 
    8px 8px 16px rgba(0, 0, 0, 0.3),
    -8px -8px 16px rgba(255, 255, 255, 0.05);
}

.btnNeomorph:hover {
  box-shadow: 
    4px 4px 8px rgba(0, 0, 0, 0.3),
    -4px -4px 8px rgba(255, 255, 255, 0.05);
}

.btnNeomorph:active {
  box-shadow: 
    inset 4px 4px 8px rgba(0, 0, 0, 0.3),
    inset -4px -4px 8px rgba(255, 255, 255, 0.05);
}

.btnOutline {
  background: transparent;
  color: var(--color-accent-primary);
  border: 2px solid var(--color-accent-primary);
}

.btnOutline:hover {
  background: var(--color-accent-primary);
  color: white;
}

.btnGhost {
  background: transparent;
  color: var(--color-text-primary);
}

.btnGhost:hover {
  background: var(--color-bg-tertiary);
}

/* Shimmer Effect */
.shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s;
}

.btnGradient:hover .shimmer {
  left: 100%;
}

/* Loading Spinner */
.spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.spinnerCircle {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.btnLoading .btnText {
  opacity: 0.6;
}

/* Icon */
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

### Krok 2.3: Dashboard Card s Gradienty

Vytvořte: `src/components/dashboard/DashboardCard.tsx`

```typescript
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import styles from './DashboardCard.module.css';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  gradient?: 'cosmic' | 'sunset' | 'ocean' | 'forest' | 'fire' | 'mint';
  trend?: {
    value: number;
    label: string;
  };
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  gradient = 'cosmic',
  trend,
  onClick
}) => {
  return (
    <Card variant="premium" gradient={gradient} hover onClick={onClick}>
      <div className={styles.dashboardCard}>
        <div className={styles.header}>
          {icon && (
            <motion.div 
              className={styles.iconWrapper}
              data-gradient={gradient}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {icon}
            </motion.div>
          )}
          <div className={styles.headerText}>
            <h3 className={styles.title}>{title}</h3>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>

        <div className={styles.content}>
          <motion.div 
            className={styles.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {value}
          </motion.div>

          {trend && (
            <div className={`${styles.trend} ${trend.value >= 0 ? styles.trendUp : styles.trendDown}`}>
              <span className={styles.trendIcon}>
                {trend.value >= 0 ? '↑' : '↓'}
              </span>
              <span className={styles.trendValue}>
                {Math.abs(trend.value)}%
              </span>
              <span className={styles.trendLabel}>{trend.label}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
```

`src/components/dashboard/DashboardCard.module.css`

```css
.dashboardCard {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  height: 100%;
}

.header {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}

.iconWrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  background: var(--gradient-cosmic);
  color: white;
  font-size: 24px;
  flex-shrink: 0;
}

.iconWrapper[data-gradient="cosmic"] { background: var(--gradient-cosmic); }
.iconWrapper[data-gradient="sunset"] { background: var(--gradient-sunset); }
.iconWrapper[data-gradient="ocean"] { background: var(--gradient-ocean); }
.iconWrapper[data-gradient="forest"] { background: var(--gradient-forest); }
.iconWrapper[data-gradient="fire"] { background: var(--gradient-fire); }
.iconWrapper[data-gradient="mint"] { background: var(--gradient-mint); }

.headerText {
  flex: 1;
}

.title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.subtitle {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  margin: var(--space-1) 0 0;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.value {
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  font-family: var(--font-heading);
}

.trend {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-2);
  font-size: var(--text-sm);
}

.trendIcon {
  font-size: var(--text-lg);
}

.trendUp {
  color: var(--color-success-primary);
}

.trendDown {
  color: var(--color-error-primary);
}

.trendValue {
  font-weight: 600;
}

.trendLabel {
  color: var(--color-text-tertiary);
}
```

---

## 📝 Fáze 3: Praktické Příklady

### Příklad 1: Použití v Dashboard Page

```typescript
// src/app/page.tsx
import DashboardCard from '@/components/dashboard/DashboardCard';
import { FiTarget, FiTrendingUp, FiAward, FiBook } from 'react-icons/fi';

export default function Home() {
  return (
    <Container>
      <Row className="g-4">
        <Col md={6} lg={3}>
          <DashboardCard
            title="Aktivní Projekty"
            value="12"
            subtitle="3 nové tento týden"
            icon={<FiTarget />}
            gradient="cosmic"
            trend={{ value: 15, label: 'vs. minulý měsíc' }}
          />
        </Col>

        <Col md={6} lg={3}>
          <DashboardCard
            title="Celkové XP"
            value="8,450"
            subtitle="Level 24"
            icon={<FiTrendingUp />}
            gradient="sunset"
            trend={{ value: 23, label: 'tento měsíc' }}
          />
        </Col>

        <Col md={6} lg={3}>
          <DashboardCard
            title="Achievementy"
            value="42"
            subtitle="87% dokončeno"
            icon={<FiAward />}
            gradient="fire"
            trend={{ value: 8, label: 'nově odemčeno' }}
          />
        </Col>

        <Col md={6} lg={3}>
          <DashboardCard
            title="Hodiny Učení"
            value="156"
            subtitle="Tento měsíc"
            icon={<FiBook />}
            gradient="ocean"
            trend={{ value: -5, label: 'vs. minulý měsíc' }}
          />
        </Col>
      </Row>
    </Container>
  );
}
```

### Příklad 2: Enhanced Progress Bar

Vytvořte: `src/components/ui/Progress.tsx`

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Progress.module.css';

interface ProgressProps {
  value: number;
  max?: number;
  gradient?: string;
  showLabel?: boolean;
  animated?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  gradient = 'cosmic',
  showLabel = true,
  animated = true,
  height = 'md'
}) => {
  const percentage = Math.min(100, (value / max) * 100);

  const heightClasses = {
    sm: styles.progressSm,
    md: styles.progressMd,
    lg: styles.progressLg
  };

  return (
    <div className={styles.progressWrapper}>
      <div className={`${styles.progress} ${heightClasses[height]}`}>
        <motion.div
          className={`${styles.progressBar} ${animated ? styles.progressAnimated : ''}`}
          data-gradient={gradient}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {showLabel && (
            <span className={styles.progressLabel}>
              {Math.round(percentage)}%
            </span>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Progress;
```

`src/components/ui/Progress.module.css`

```css
.progressWrapper {
  width: 100%;
}

.progress {
  width: 100%;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
}

.progressSm { height: 6px; }
.progressMd { height: 8px; }
.progressLg { height: 12px; }

.progressBar {
  height: 100%;
  background: var(--gradient-cosmic);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: var(--space-3);
  position: relative;
  overflow: hidden;
}

.progressBar[data-gradient="cosmic"] { background: var(--gradient-cosmic); }
.progressBar[data-gradient="sunset"] { background: var(--gradient-sunset); }
.progressBar[data-gradient="ocean"] { background: var(--gradient-ocean); }
.progressBar[data-gradient="forest"] { background: var(--gradient-forest); }
.progressBar[data-gradient="fire"] { background: var(--gradient-fire); }
.progressBar[data-gradient="mint"] { background: var(--gradient-mint); }

.progressAnimated::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shimmer 2s infinite;
}

.progressLabel {
  font-size: var(--text-xs);
  font-weight: 600;
  color: white;
  position: relative;
  z-index: 1;
}
```

### Příklad 3: Badge Component

Vytvořte: `src/components/ui/Badge.tsx`

```typescript
import React, { ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'gradient' | 'glow' | 'outline';
export type BadgeColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  gradient?: string;
  icon?: ReactNode;
  pulse?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  color = 'primary',
  gradient = 'cosmic',
  icon,
  pulse = false
}) => {
  const variantClasses = {
    default: styles.badgeDefault,
    gradient: styles.badgeGradient,
    glow: styles.badgeGlow,
    outline: styles.badgeOutline
  };

  return (
    <span
      className={`
        ${styles.badge}
        ${variantClasses[variant]}
        ${pulse ? styles.badgePulse : ''}
      `}
      data-color={color}
      data-gradient={gradient}
    >
      {icon && <span className={styles.badgeIcon}>{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
```

`src/components/ui/Badge.module.css`

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-badge);
  font-size: var(--text-sm);
  font-weight: 600;
  white-space: nowrap;
}

.badgeIcon {
  display: inline-flex;
  font-size: var(--text-base);
}

/* Variants */
.badgeDefault[data-color="primary"] {
  background: var(--color-accent-primary);
  color: white;
}

.badgeDefault[data-color="success"] {
  background: var(--color-success-primary);
  color: white;
}

.badgeDefault[data-color="warning"] {
  background: var(--color-warning-primary);
  color: var(--color-text-inverse);
}

.badgeDefault[data-color="danger"] {
  background: var(--color-error-primary);
  color: white;
}

.badgeDefault[data-color="info"] {
  background: var(--color-info-primary);
  color: white;
}

.badgeGradient {
  background: var(--gradient-cosmic);
  color: white;
}

.badgeGradient[data-gradient="cosmic"] { background: var(--gradient-cosmic); }
.badgeGradient[data-gradient="sunset"] { background: var(--gradient-sunset); }
.badgeGradient[data-gradient="ocean"] { background: var(--gradient-ocean); }
.badgeGradient[data-gradient="forest"] { background: var(--gradient-forest); }
.badgeGradient[data-gradient="fire"] { background: var(--gradient-fire); }

.badgeGlow {
  position: relative;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-accent-primary);
  color: var(--color-accent-primary);
}

.badgeGlow::before {
  content: '';
  position: absolute;
  inset: -4px;
  background: var(--color-accent-primary);
  border-radius: var(--radius-badge);
  opacity: 0.2;
  filter: blur(8px);
  z-index: -1;
}

.badgeOutline {
  background: transparent;
  border: 1px solid currentColor;
}

.badgeOutline[data-color="primary"] { color: var(--color-accent-primary); }
.badgeOutline[data-color="success"] { color: var(--color-success-primary); }
.badgeOutline[data-color="warning"] { color: var(--color-warning-primary); }
.badgeOutline[data-color="danger"] { color: var(--color-error-primary); }
.badgeOutline[data-color="info"] { color: var(--color-info-primary); }

/* Pulse Animation */
.badgePulse {
  animation: pulse 2s ease-in-out infinite;
}
```

---

## ✅ Testing & QA

### 1. Visual Regression Testing

```bash
# Install Playwright
npm install -D @playwright/test

# Run visual tests
npx playwright test
```

`tests/visual.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test('Dashboard cards visual test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Wait for animations to complete
  await page.waitForTimeout(1000);
  
  // Screenshot of dashboard
  await expect(page).toHaveScreenshot('dashboard.png');
});

test('Button hover states', async ({ page }) => {
  await page.goto('http://localhost:3000/styleguide');
  
  const button = page.locator('[data-testid="gradient-button"]');
  await button.hover();
  await page.waitForTimeout(500);
  
  await expect(button).toHaveScreenshot('button-hover.png');
});
```

### 2. Performance Testing

```typescript
// utils/performanceMonitor.ts
export const measurePerformance = (componentName: string) => {
  if (typeof window !== 'undefined' && window.performance) {
    const perfData = window.performance.getEntriesByName(componentName);
    console.log(`${componentName} performance:`, perfData);
  }
};

// Usage in component
useEffect(() => {
  performance.mark('DashboardCard-start');
  
  return () => {
    performance.mark('DashboardCard-end');
    performance.measure('DashboardCard', 'DashboardCard-start', 'DashboardCard-end');
    measurePerformance('DashboardCard');
  };
}, []);
```

### 3. Accessibility Testing

```bash
# Install axe
npm install -D @axe-core/react

# Install in your app
npm install @axe-core/react
```

```typescript
// src/app/layout.tsx
if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then(axe => {
    axe.default(React, ReactDOM, 1000);
  });
}
```

---

## 🚀 Deployment

### 1. Build Optimalizace

```json
// package.json
{
  "scripts": {
    "build:analyze": "ANALYZE=true next build",
    "build:prod": "next build && next-sitemap"
  }
}
```

### 2. CSS Optimalizace

```javascript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizeCss: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
}
```

### 3. Image Optimalizace

```typescript
// All images should use Next.js Image component
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority
  placeholder="blur"
/>
```

---

## 📚 Další Kroky

1. **Dokumentace**: Vytvořte Storybook pro všechny komponenty
2. **Testing**: Napište unit testy pro každou komponentu
3. **Monitoring**: Implementujte analytics pro sledování používání
4. **Feedback**: Sbírejte zpětnou vazbu od uživatelů
5. **Iterace**: Průběžně vylepšujte na základě dat

---

**Happy Coding! 🚀**
