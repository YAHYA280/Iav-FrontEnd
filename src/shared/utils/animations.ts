import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Animates a card hover effect with lift and glow
 */
export const animateCardHover = (element: HTMLElement, color: string) => {
  gsap.to(element, {
    y: -8,
    scale: 1.02,
    boxShadow: `0 12px 40px ${color}`,
    duration: 0.4,
    ease: 'power2.out',
  });
};

/**
 * Animates a card return to default state
 */
export const animateCardHoverExit = (element: HTMLElement) => {
  gsap.to(element, {
    y: 0,
    scale: 1,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    duration: 0.3,
    ease: 'power2.in',
  });
};

/**
 * Animates the nebula cloud color transition
 */
export const animateNebulaColor = (element: HTMLElement, color: string) => {
  gsap.to(element, {
    background: color,
    duration: 2.5,
    ease: 'power2.inOut',
  });
};

/**
 * Creates twinkling animation for stars based on their layer
 */
export const createStarAnimation = (
  element: HTMLElement,
  layer: 'far' | 'mid' | 'near'
) => {
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

/**
 * Animates cards staggered on initial load
 */
export const animateCardsOnLoad = (selector: string) => {
  gsap.from(selector, {
    opacity: 0,
    y: 40,
    scale: 0.95,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.2,
  });
};

/**
 * Animates sidebar slide-in on page load
 */
export const animateSidebarLoad = (element: HTMLElement) => {
  gsap.from(element, {
    x: -280,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
  });
};

/**
 * Animates sidebar collapse/expand
 */
export const animateSidebarToggle = (element: HTMLElement, isCollapsed: boolean) => {
  gsap.to(element, {
    width: isCollapsed ? 80 : 280,
    duration: 0.4,
    ease: 'power2.inOut',
  });
};

/**
 * Creates parallax effect for background elements on mouse move
 */
export const createParallaxEffect = (
  starsLayerFar: HTMLElement | null,
  nebula: HTMLElement | null
) => {
  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const xPercent = (clientX / window.innerWidth - 0.5) * 2;
    const yPercent = (clientY / window.innerHeight - 0.5) * 2;

    if (starsLayerFar) {
      gsap.to(starsLayerFar, {
        x: xPercent * 20,
        y: yPercent * 20,
        duration: 2,
        ease: 'power1.out',
      });
    }

    if (nebula) {
      gsap.to(nebula, {
        x: xPercent * 40,
        y: yPercent * 40,
        duration: 3,
        ease: 'power1.out',
      });
    }
  };

  return handleMouseMove;
};

/**
 * Checks if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Disables all GSAP animations for accessibility
 */
export const disableAnimations = () => {
  gsap.globalTimeline.timeScale(0);
};

/**
 * Enables all GSAP animations
 */
export const enableAnimations = () => {
  gsap.globalTimeline.timeScale(1);
};
