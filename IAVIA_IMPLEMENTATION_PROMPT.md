# IAVIA Marketplace - Galaxy Theme Implementation

## Project Context
IAVIA is an AI agents marketplace built with Next.js 14, TypeScript, and Material UI. We need to transform the marketplace page into an immersive space experience with dynamic galaxy backgrounds, glassmorphism UI, and smooth GSAP animations.

---

## 🎯 Core Vision

### The Marketplace Experience
Users browse through available AI agents displayed as cards on a **dark galaxy background**. The experience should feel like navigating through space:
- **Default State**: Dark space background with subtle purple/blue nebula clouds and twinkling stars
- **Hover Interaction**: When hovering over an agent card, the nebula dynamically shifts to match the agent's color theme, creating an immersive, color-responsive environment
- **Smooth Transitions**: All color changes are animated smoothly using GSAP (2-3 second transitions)
- **Glassmorphism**: All UI elements (cards, sidebar, header) use frosted glass aesthetics with semi-transparent backgrounds

---

## 📁 Project Architecture Overview

```
src/
├── app/
│   ├── dashboard/
│   │   ├── marketplace/
│   │   │   └── page.tsx              # 🎯 Main marketplace page to implement
│   │   └── layout.tsx                 # Dashboard layout wrapper
│   ├── globals.css                    # 🎯 Global styles + CSS variables
│   └── layout.tsx                     # Root layout
├── shared/
│   ├── components/
│   │   ├── backgrounds/               # 🆕 CREATE: Galaxy background components
│   │   │   ├── galaxy-background.tsx
│   │   │   └── nebula-cloud.tsx
│   │   ├── ui/
│   │   │   ├── agent-card/           # 🎯 Enhance existing card
│   │   │   │   └── index.tsx
│   │   │   └── marketplace-card/     # 🆕 CREATE: New marketplace variant
│   │   │       └── index.tsx
│   │   └── animations/
│   │       └── floating-agent.tsx    # 🎯 Enhance with GSAP
│   ├── theme/
│   │   ├── palette.ts                # 🎯 Add galaxy colors
│   │   └── index.tsx                 # Theme provider
│   └── utils/
│       └── animations.ts             # 🆕 CREATE: GSAP utilities
├── contexts/
│   └── theme/
│       └── agent-theme-context.tsx   # 🆕 CREATE: Agent color context
└── layouts/
    └── dashboard/
        ├── sidebar.tsx               # 🎯 Apply glassmorphism
        ├── header.tsx                # 🎯 Apply glassmorphism
        └── dashboard-layout.tsx      # 🎯 Integrate galaxy bg
```

---

## 🎨 Design System

### Color Palette

#### Base Galaxy Colors
```css
/* Deep space backgrounds */
--bg-space-deep: #0A0E27;
--bg-space-mid: #151B35;
--bg-space-light: #1E293B;

/* Glassmorphism */
--glass-bg: rgba(15, 23, 42, 0.6);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-hover: rgba(15, 23, 42, 0.75);

/* Default nebula (purple/blue) */
--nebula-default-1: rgba(168, 85, 247, 0.15);
--nebula-default-2: rgba(59, 130, 246, 0.15);
```

#### Agent Theme Colors (Dynamic Nebula)
```typescript
const agentColors = {
  aylan: {
    primary: '#EC4899',      // Hot Pink
    nebula: 'rgba(236, 72, 153, 0.15)',
    glow: 'rgba(236, 72, 153, 0.3)',
    border: '#EC4899',
  },
  aksel: {
    primary: '#F97316',      // Orange
    nebula: 'rgba(249, 115, 22, 0.15)',
    glow: 'rgba(249, 115, 22, 0.3)',
    border: '#F97316',
  },
  ayal: {
    primary: '#A855F7',      // Purple
    nebula: 'rgba(168, 85, 247, 0.15)',
    glow: 'rgba(168, 85, 247, 0.3)',
    border: '#A855F7',
  },
  adan: {
    primary: '#06B6D4',      // Cyan
    nebula: 'rgba(6, 182, 212, 0.15)',
    glow: 'rgba(6, 182, 212, 0.3)',
    border: '#06B6D4',
  },
  ziri: {
    primary: '#3B82F6',      // Blue
    nebula: 'rgba(59, 130, 246, 0.15)',
    glow: 'rgba(59, 130, 246, 0.3)',
    border: '#3B82F6',
  },
  ider: {
    primary: '#8B5CF6',      // Lavender
    nebula: 'rgba(139, 92, 246, 0.15)',
    glow: 'rgba(139, 92, 246, 0.3)',
    border: '#8B5CF6',
  },
  // Add more agents as needed
};
```

### Glassmorphism Specifications
```css
.glass-card {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.glass-card:hover {
  background: rgba(15, 23, 42, 0.75);
  border-color: var(--agent-color);
  box-shadow: 0 8px 32px var(--agent-glow);
}
```

---

## 🎬 Animation Requirements (GSAP)

### 1. Install GSAP
```bash
npm install gsap
```

### 2. Animation Specifications

#### Galaxy Background Animations
- **Stars**: 3 layers (far, mid, near) with different speeds
  - Far: opacity flicker (0.3-0.6), duration: 3-5s random
  - Mid: opacity flicker (0.5-0.8), duration: 2-4s random
  - Near: opacity flicker (0.7-1), duration: 1-3s random
- **Nebula Transition**: 
  - Duration: 2.5s
  - Ease: `power2.inOut`
  - Animate: opacity, color (using GSAP's color plugin)

#### Card Animations

**Initial Load** (staggered):
```javascript
gsap.from('.agent-card', {
  opacity: 0,
  y: 40,
  scale: 0.95,
  duration: 0.8,
  stagger: 0.1,
  ease: 'power3.out'
});
```

**Hover State**:
```javascript
// Card lift + glow
gsap.to(card, {
  y: -8,
  scale: 1.02,
  boxShadow: `0 12px 40px ${agentColor.glow}`,
  duration: 0.4,
  ease: 'power2.out'
});

// Nebula color change
gsap.to('.nebula-cloud', {
  background: agentColor.nebula,
  duration: 2.5,
  ease: 'power2.inOut'
});
```

**Hover Exit**:
```javascript
// Card return
gsap.to(card, {
  y: 0,
  scale: 1,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  duration: 0.3,
  ease: 'power2.in'
});

// Nebula return to default
gsap.to('.nebula-cloud', {
  background: 'var(--nebula-default)',
  duration: 2.5,
  ease: 'power2.inOut'
});
```

#### Sidebar Animation
```javascript
// On page load
gsap.from('.sidebar', {
  x: -280,
  opacity: 0,
  duration: 0.6,
  ease: 'power3.out'
});

// Collapse/expand
gsap.to('.sidebar', {
  width: isCollapsed ? 80 : 280,
  duration: 0.4,
  ease: 'power2.inOut'
});
```

#### Header Animation
```javascript
// Scroll-based backdrop blur
ScrollTrigger.create({
  trigger: 'body',
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (self) => {
    const blur = Math.min(self.progress * 16, 12);
    gsap.to('.header', {
      backdropFilter: `blur(${blur}px)`,
      background: `rgba(26, 15, 61, ${Math.min(self.progress, 0.85)})`,
      duration: 0.1
    });
  }
});
```

#### Parallax Effect
```javascript
// Mouse move parallax on background elements
const handleMouseMove = (e) => {
  const { clientX, clientY } = e;
  const xPercent = (clientX / window.innerWidth - 0.5) * 2;
  const yPercent = (clientY / window.innerHeight - 0.5) * 2;

  gsap.to('.stars-layer-far', {
    x: xPercent * 20,
    y: yPercent * 20,
    duration: 2,
    ease: 'power1.out'
  });

  gsap.to('.nebula-cloud', {
    x: xPercent * 40,
    y: yPercent * 40,
    duration: 3,
    ease: 'power1.out'
  });
};
```

---

## 📝 Implementation Steps

### Phase 1: Foundation Setup (Priority 1)

#### 1.1 Install Dependencies
```bash
npm install gsap
```

#### 1.2 Create Galaxy Background System
**File**: `src/shared/components/backgrounds/galaxy-background.tsx`
```typescript
'use client';

import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';

interface GalaxyBackgroundProps {
  nebulaColor?: string;
}

export const GalaxyBackground = ({ nebulaColor = 'rgba(168, 85, 247, 0.15)' }: GalaxyBackgroundProps) => {
  const nebulaRef = useRef<HTMLDivElement>(null);

  // TODO: Implement star generation
  // TODO: Implement nebula color transitions
  // TODO: Add parallax mouse movement

  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #0A0E27 0%, #151B35 50%, #1E293B 100%)',
    }}>
      {/* Stars layers */}
      <Box className="stars-layer-far" sx={{ /* styles */ }} />
      <Box className="stars-layer-mid" sx={{ /* styles */ }} />
      <Box className="stars-layer-near" sx={{ /* styles */ }} />
      
      {/* Nebula cloud */}
      <Box 
        ref={nebulaRef}
        className="nebula-cloud" 
        sx={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: nebulaColor,
          filter: 'blur(100px)',
          top: '20%',
          left: '30%',
          transition: 'background 2.5s ease',
        }} 
      />
    </Box>
  );
};
```

#### 1.3 Create Agent Theme Context
**File**: `src/contexts/theme/agent-theme-context.tsx`
```typescript
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export const agentColors = {
  default: {
    primary: '#A855F7',
    nebula: 'rgba(168, 85, 247, 0.15)',
    glow: 'rgba(168, 85, 247, 0.3)',
  },
  aylan: {
    primary: '#EC4899',
    nebula: 'rgba(236, 72, 153, 0.15)',
    glow: 'rgba(236, 72, 153, 0.3)',
  },
  // ... add all agents
};

interface AgentThemeContextType {
  currentAgent: string | null;
  setCurrentAgent: (agentId: string | null) => void;
  currentColor: typeof agentColors.default;
}

const AgentThemeContext = createContext<AgentThemeContextType | undefined>(undefined);

export const AgentThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  
  const currentColor = currentAgent && agentColors[currentAgent as keyof typeof agentColors]
    ? agentColors[currentAgent as keyof typeof agentColors]
    : agentColors.default;

  return (
    <AgentThemeContext.Provider value={{ currentAgent, setCurrentAgent, currentColor }}>
      {children}
    </AgentThemeContext.Provider>
  );
};

export const useAgentTheme = () => {
  const context = useContext(AgentThemeContext);
  if (!context) throw new Error('useAgentTheme must be used within AgentThemeProvider');
  return context;
};
```

#### 1.4 Create GSAP Utilities
**File**: `src/shared/utils/animations.ts`
```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const animateCardHover = (element: HTMLElement, color: string) => {
  gsap.to(element, {
    y: -8,
    scale: 1.02,
    boxShadow: `0 12px 40px ${color}`,
    duration: 0.4,
    ease: 'power2.out',
  });
};

export const animateCardHoverExit = (element: HTMLElement) => {
  gsap.to(element, {
    y: 0,
    scale: 1,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    duration: 0.3,
    ease: 'power2.in',
  });
};

export const animateNebulaColor = (element: HTMLElement, color: string) => {
  gsap.to(element, {
    background: color,
    duration: 2.5,
    ease: 'power2.inOut',
  });
};

export const createStarAnimation = (element: HTMLElement, layer: 'far' | 'mid' | 'near') => {
  const opacityRange = {
    far: [0.3, 0.6],
    mid: [0.5, 0.8],
    near: [0.7, 1],
  };

  const duration = {
    far: gsap.utils.random(3, 5),
    mid: gsap.utils.random(2, 4),
    near: gsap.utils.random(1, 3),
  };

  gsap.to(element, {
    opacity: gsap.utils.random(opacityRange[layer][0], opacityRange[layer][1]),
    duration: duration[layer],
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

// Add more utilities as needed
```

---

### Phase 2: Marketplace Page Implementation (Priority 2)

#### 2.1 Create Marketplace Card Component
**File**: `src/shared/components/ui/marketplace-card/index.tsx`
```typescript
'use client';

import { Box, Typography, Chip } from '@mui/material';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useAgentTheme } from '@/contexts/theme/agent-theme-context';
import { animateCardHover, animateCardHoverExit, animateNebulaColor } from '@/shared/utils/animations';

interface MarketplaceCardProps {
  agentId: string;
  agentName: string;
  agentTitle: string;
  avatar: string;
  price?: string;
  category?: string;
}

export const MarketplaceCard = ({
  agentId,
  agentName,
  agentTitle,
  avatar,
  price,
  category,
}: MarketplaceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setCurrentAgent, currentColor } = useAgentTheme();

  const handleMouseEnter = () => {
    setCurrentAgent(agentId);
    if (cardRef.current) {
      animateCardHover(cardRef.current, currentColor.glow);
    }
  };

  const handleMouseLeave = () => {
    setCurrentAgent(null);
    if (cardRef.current) {
      animateCardHoverExit(cardRef.current);
    }
  };

  return (
    <Box
      ref={cardRef}
      className="agent-card marketplace-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: '267px',
        height: 'auto',
        borderRadius: '24px',
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease',
        position: 'relative',
        '&:hover': {
          borderColor: currentColor.primary,
        },
      }}
    >
      {/* Card content - similar to existing agent card structure */}
      {/* TODO: Implement card layout */}
    </Box>
  );
};
```

#### 2.2 Update Marketplace Page
**File**: `src/app/dashboard/marketplace/page.tsx`
```typescript
'use client';

import { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';
import { AgentThemeProvider } from '@/contexts/theme/agent-theme-context';
import { GalaxyBackground } from '@/shared/components/backgrounds/galaxy-background';
import { MarketplaceCard } from '@/shared/components/ui/marketplace-card';
import gsap from 'gsap';

// Mock data - replace with actual data
const agents = [
  { id: 'aylan', name: 'AYLAN', title: 'Prospection', avatar: '/avatars/aylan.png', price: '99€/mois' },
  { id: 'aqal', name: 'AQAL', title: 'Support', avatar: '/avatars/aqal.png', price: '79€/mois' },
  // ... add all agents from the image
];

export default function MarketplacePage() {
  const { setTitle } = useInterfaceTitle();

  useEffect(() => {
    setTitle('Marketplace');

    // Animate cards on load
    gsap.from('.marketplace-card', {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2,
    });
  }, [setTitle]);

  return (
    <AgentThemeProvider>
      <Box sx={{ position: 'relative', minHeight: '100vh', pb: 4 }}>
        <GalaxyBackground />
        
        <Box sx={{ position: 'relative', zIndex: 1, pt: 4 }}>
          <Typography
            variant="h4"
            sx={{
              color: '#FFF',
              fontFamily: 'var(--font-tertiary)',
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Découvrez nos Agents IA
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {agents.map((agent) => (
              <Grid item key={agent.id}>
                <MarketplaceCard {...agent} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </AgentThemeProvider>
  );
}
```

---

### Phase 3: Glassmorphism Application (Priority 3)

#### 3.1 Update Sidebar
**File**: `src/layouts/dashboard/sidebar.tsx`

Add glassmorphism styles:
```typescript
sx={{
  // ... existing styles
  background: 'rgba(15, 23, 42, 0.8)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(93, 49, 248, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
}}
```

#### 3.2 Update Header
**File**: `src/layouts/dashboard/header.tsx`

Enhance scroll-based glassmorphism:
```typescript
sx={{
  // ... existing styles
  background: isScrolled 
    ? 'rgba(15, 23, 42, 0.85)' 
    : 'rgba(15, 23, 42, 0.4)',
  backdropFilter: isScrolled ? 'blur(16px)' : 'blur(8px)',
}}
```

#### 3.3 Update Global Styles
**File**: `src/app/globals.css`

Add new CSS variables and glassmorphism utilities:
```css
:root {
  /* Galaxy colors */
  --bg-space-deep: #0A0E27;
  --bg-space-mid: #151B35;
  --bg-space-light: #1E293B;
  
  /* Glassmorphism */
  --glass-bg: rgba(15, 23, 42, 0.6);
  --glass-bg-hover: rgba(15, 23, 42, 0.75);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-border-hover: rgba(255, 255, 255, 0.2);
}

/* Utility class for glassmorphism */
.glass-effect {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
}

.glass-effect:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border-hover);
}

/* Fallback for browsers without backdrop-filter support */
@supports not (backdrop-filter: blur(12px)) {
  .glass-effect {
    background: rgba(15, 23, 42, 0.9);
  }
}
```

---

## 🎯 Key Interaction Flow

### User Journey Through Marketplace

1. **Page Load**
   - Galaxy background fades in with twinkling stars
   - Default purple/blue nebula clouds visible
   - Agent cards animate in with staggered timing (bottom to top)
   - Sidebar and header have glassmorphism applied

2. **Browsing**
   - User moves mouse → background elements parallax subtly
   - Stars twinkle at different rates based on layer
   - All cards have subtle floating animation (barely perceptible)

3. **Card Hover**
   - User hovers over "AKSEL" (orange agent)
   - Card lifts up 8px with smooth GSAP animation
   - Card border changes to orange with glow
   - **CRITICAL**: Nebula cloud in background transitions from purple/blue to orange over 2.5 seconds
   - Other cards remain visible but slightly dimmed

4. **Card Unhover**
   - User moves mouse away
   - Card returns to original position
   - Nebula transitions back to default purple/blue (2.5s)
   - Border returns to default glass border

5. **Continuous Interaction**
   - User hovers over different agents rapidly
   - Nebula smoothly transitions between colors
   - GSAP handles animation queueing (no janky overlaps)

---

## ⚠️ Critical Implementation Notes

### Performance Optimization

1. **GSAP Best Practices**
   - Use `will-change: transform` on animated elements
   - Kill animations on cleanup (useEffect return)
   - Use `gsap.quickSetter()` for high-frequency updates
   - Debounce mouse move parallax events

2. **Backdrop Filter Performance**
   - Limit blur radius (max 16px)
   - Apply only to fixed/absolutely positioned elements
   - Use `-webkit-backdrop-filter` for Safari

3. **React Best Practices**
   - Wrap GSAP code in `useEffect` with proper cleanup
   - Use `useRef` for DOM element references
   - Memoize expensive calculations
   - Check `typeof window !== 'undefined'` for SSR safety

### Browser Compatibility

```javascript
// Check backdrop-filter support
const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)') || 
                                CSS.supports('-webkit-backdrop-filter', 'blur(1px)');

// Fallback styles if not supported
if (!supportsBackdropFilter) {
  // Use solid background with higher opacity
}
```

### Accessibility

```typescript
// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

useEffect(() => {
  if (prefersReducedMotion) {
    // Disable animations
    gsap.globalTimeline.timeScale(0);
    return;
  }
  
  // Enable animations
  gsap.globalTimeline.timeScale(1);
}, [prefersReducedMotion]);
```

---

## ✅ Testing Checklist

After implementation, verify:

### Functionality
- [ ] Nebula color changes on card hover
- [ ] Nebula returns to default on unhover
- [ ] Multiple rapid hovers don't break animations
- [ ] Cards animate in smoothly on page load
- [ ] Stars twinkle at appropriate rates
- [ ] Parallax works on mouse movement
- [ ] Glassmorphism visible on all glass elements

### Performance
- [ ] 60fps on card hover animations
- [ ] No layout shift during animations
- [ ] Smooth transitions (no janky movements)
- [ ] Page loads in < 2 seconds
- [ ] No memory leaks (check DevTools)

### Compatibility
- [ ] Works on Chrome, Firefox, Safari, Edge
- [ ] Backdrop-filter fallback works on Firefox
- [ ] SSR doesn't throw window errors
- [ ] Mobile responsive (animations scale down)
- [ ] Prefers-reduced-motion respected

### Accessibility
- [ ] Focus indicators visible on glass elements
- [ ] Text contrast passes WCAG AA (4.5:1 ratio)
- [ ] Keyboard navigation works
- [ ] Screen reader announces card content
- [ ] Animations can be disabled

---

## 📦 Dependencies Summary

```json
{
  "dependencies": {
    "gsap": "^3.12.5",
    "next": "14.2.4",
    "react": "^18",
    "@mui/material": "^5.15.20",
    "framer-motion": "^11.2.10"
  }
}
```

---

## 🚀 Deployment Notes

1. **Environment Variables**: None required for this feature
2. **Build Optimization**: Ensure GSAP is tree-shaken properly
3. **CDN**: Consider loading GSAP from CDN for better caching
4. **Analytics**: Track hover events to see most popular agents

---

## 📚 Additional Resources

- GSAP Docs: https://greensock.com/docs/
- CSS Backdrop Filter: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
- React GSAP Integration: https://greensock.com/react
- Material UI Customization: https://mui.com/material-ui/customization/theming/

---

## 🎨 Final Vision Summary

**The marketplace should feel like navigating through a living, breathing galaxy where each AI agent has its own celestial presence. When a user shows interest in an agent by hovering, the entire universe responds—the nebula clouds shift color to embrace the agent's theme, creating an immersive, unified experience. The glassmorphism UI elements float above this cosmic backdrop, maintaining clarity while feeling ethereal and futuristic.**

---

## 📝 Implementation Order

Execute in this exact order to maintain project architecture:

1. ✅ Install GSAP
2. ✅ Create `src/shared/utils/animations.ts`
3. ✅ Create `src/contexts/theme/agent-theme-context.tsx`
4. ✅ Create `src/shared/components/backgrounds/galaxy-background.tsx`
5. ✅ Update `src/app/globals.css`
6. ✅ Create `src/shared/components/ui/marketplace-card/index.tsx`
7. ✅ Update `src/app/dashboard/marketplace/page.tsx`
8. ✅ Update `src/layouts/dashboard/sidebar.tsx`
9. ✅ Update `src/layouts/dashboard/header.tsx`
10. ✅ Test and optimize

---

**Remember**: The key to this implementation is the seamless transition of the nebula color based on hover state. This is what makes the experience truly immersive and unique. Prioritize getting this interaction smooth and performant above all else.
