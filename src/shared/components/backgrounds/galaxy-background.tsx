'use client';

import { useEffect, useRef, useMemo } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { useAgentTheme } from '@/contexts/theme/agent-theme-context';
import { createStarAnimation, animateNebulaColor, createParallaxEffect, prefersReducedMotion } from '@/shared/utils/animations';

interface GalaxyBackgroundProps {
  enableParallax?: boolean;
}

export const GalaxyBackground = ({ enableParallax = true }: GalaxyBackgroundProps) => {
  const nebulaRef = useRef<HTMLDivElement>(null);
  const starsLayerFarRef = useRef<HTMLDivElement>(null);
  const starsLayerMidRef = useRef<HTMLDivElement>(null);
  const starsLayerNearRef = useRef<HTMLDivElement>(null);
  const { currentColor } = useAgentTheme();

  // Generate random stars for each layer
  const stars = useMemo(() => {
    const generateStars = (count: number, size: number, layer: 'far' | 'mid' | 'near') => {
      return Array.from({ length: count }, (_, i) => ({
        id: `${layer}-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${size}px`,
        layer,
      }));
    };

    return {
      far: generateStars(150, 1, 'far'),
      mid: generateStars(100, 2, 'mid'),
      near: generateStars(50, 3, 'near'),
    };
  }, []);

  // Animate nebula color change when agent theme changes
  useEffect(() => {
    if (nebulaRef.current && !prefersReducedMotion()) {
      animateNebulaColor(nebulaRef.current, currentColor.nebula);
    } else if (nebulaRef.current) {
      // Set color directly if reduced motion is preferred
      nebulaRef.current.style.background = currentColor.nebula;
    }
  }, [currentColor]);

  // Initialize star twinkling animations
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const starElements = document.querySelectorAll('.star');
    starElements.forEach((star) => {
      const layer = star.getAttribute('data-layer') as 'far' | 'mid' | 'near';
      if (layer) {
        createStarAnimation(star as HTMLElement, layer);
      }
    });

    return () => {
      gsap.killTweensOf('.star');
    };
  }, []);

  // Setup parallax effect
  useEffect(() => {
    if (!enableParallax || prefersReducedMotion()) return;

    const handleMouseMove = createParallaxEffect(
      starsLayerFarRef.current,
      nebulaRef.current
    );

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf([starsLayerFarRef.current, nebulaRef.current]);
    };
  }, [enableParallax]);

  // Add smooth continuous star layer movement
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Animate star layers with slow continuous movement
    if (starsLayerFarRef.current) {
      gsap.to(starsLayerFarRef.current, {
        x: '+=30',
        y: '+=20',
        duration: 60,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (starsLayerMidRef.current) {
      gsap.to(starsLayerMidRef.current, {
        x: '-=20',
        y: '+=30',
        duration: 45,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (starsLayerNearRef.current) {
      gsap.to(starsLayerNearRef.current, {
        x: '+=15',
        y: '-=15',
        duration: 35,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Subtle nebula movement
    if (nebulaRef.current) {
      gsap.to(nebulaRef.current, {
        x: '+=50',
        y: '+=30',
        duration: 80,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      gsap.killTweensOf([
        starsLayerFarRef.current,
        starsLayerMidRef.current,
        starsLayerNearRef.current,
        nebulaRef.current,
      ]);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0A0E27 0%, #151B35 50%, #1E293B 100%)',
      }}
    >
      {/* Stars Layer - Far (slowest) */}
      <Box
        ref={starsLayerFarRef}
        className="stars-layer-far"
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          willChange: 'transform',
        }}
      >
        {stars.far.map((star) => (
          <Box
            key={star.id}
            className="star"
            data-layer="far"
            sx={{
              position: 'absolute',
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              opacity: 0.4,
              boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
            }}
          />
        ))}
      </Box>

      {/* Stars Layer - Mid */}
      <Box
        ref={starsLayerMidRef}
        className="stars-layer-mid"
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          willChange: 'transform',
        }}
      >
        {stars.mid.map((star) => (
          <Box
            key={star.id}
            className="star"
            data-layer="mid"
            sx={{
              position: 'absolute',
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              opacity: 0.6,
              boxShadow: '0 0 3px rgba(255, 255, 255, 0.9)',
            }}
          />
        ))}
      </Box>

      {/* Stars Layer - Near (fastest) */}
      <Box
        ref={starsLayerNearRef}
        className="stars-layer-near"
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          willChange: 'transform',
        }}
      >
        {stars.near.map((star) => (
          <Box
            key={star.id}
            className="star"
            data-layer="near"
            sx={{
              position: 'absolute',
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              opacity: 0.8,
              boxShadow: '0 0 4px rgba(255, 255, 255, 1)',
            }}
          />
        ))}
      </Box>

      {/* Nebula Cloud (Dynamic Color) */}
      <Box
        ref={nebulaRef}
        className="nebula-cloud"
        sx={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: currentColor.nebula,
          filter: 'blur(100px)',
          top: '20%',
          left: '30%',
          willChange: 'transform, background',
          pointerEvents: 'none',
        }}
      />

      {/* Secondary Nebula Cloud */}
      <Box
        className="nebula-cloud-secondary"
        sx={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.1)',
          filter: 'blur(80px)',
          bottom: '10%',
          right: '20%',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};
