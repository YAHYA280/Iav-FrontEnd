'use client';

import React, { useRef, useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { useAgentTheme, agentColors } from '@/contexts/theme/agent-theme-context';

interface MarketplaceCardProps {
  agentId: string;
  agentName: string;
  agentTitle: string;
  avatar: string;
  price?: string;
  category?: string;
  onClick?: () => void;
}

export const MarketplaceCard: React.FC<MarketplaceCardProps> = ({
  agentId,
  agentName,
  agentTitle,
  avatar,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setCurrentAgent } = useAgentTheme();
  const theme = useTheme();

  // Get the static color for this specific agent card (never changes)
  const cardColor = useMemo(() => {
    return agentColors[agentId as keyof typeof agentColors] || agentColors.default;
  }, [agentId]);

  const handleMouseEnter = () => {
    setCurrentAgent(agentId);
  };

  const handleMouseLeave = () => {
    setCurrentAgent(null);
  };

  const handleClick = () => {
    onClick?.();
  };

  return (
    <Box
      ref={cardRef}
      className="agent-card marketplace-card will-change-transform"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      sx={{
        width: '240px',
        height: '330px',
        borderRadius: '32px',
        background: 'rgba(20, 15, 35, 0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `3px solid ${cardColor.primary}99`,
        boxShadow: `0 0 2px ${cardColor.primary}CC, 0 0 16px ${cardColor.primary}66`,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        '&:hover': {
          border: `3px solid ${cardColor.primary}`,
          boxShadow: `0 0 10px ${cardColor.primary}FF, 0 0 50px ${cardColor.primary}99`,
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* Top Badge - "Parlez à {Agent}" */}
      <Box
        sx={{
          position: 'absolute',
          top: 3,
          left: 12,
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '16px',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 3,
        }}
      >
        <FontAwesomeIcon icon="comment" style={{ fontSize: '11px', color: '#FFF' }} />
        <Typography
          sx={{
            fontSize: '11px',
            fontWeight: 500,
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
          }}
        >
          Parlez à {agentName}
        </Typography>
      </Box>

      {/* Avatar Section (75% of card - 240px) */}
      <Box
        sx={{
          height: '240px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',

          // 👇 Transition for smooth scaling
          '& img': {
            transition: 'transform 0.6s ease',
          },

          // 👇 Scale up the image when hovering on the entire card
          '.agent-card:hover & img': {
            transform: 'scale(1.08)',
          },
        }}
      >
        {/* Avatar Image */}
        {avatar && (
          <Image
            alt={`${agentName} Avatar`}
            src={avatar}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
            sizes="240px"
          />
        )}

        {/* Gradient Overlay on Avatar */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '70px',
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(20,15,35,0.7) 50%, rgba(20,15,35,1) 100%)',
            zIndex: 1,
          }}
        />

        {/* Agent Name (Overlays Avatar) */}
        <Typography
          sx={{
            position: 'absolute',
            bottom: '0px',
            width: '100%',
            textAlign: 'center',
            fontFamily: 'var(--font-tertiary)',
            fontSize: '19px',
            fontWeight: 700,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            zIndex: 2,
            letterSpacing: '1px',
          }}
        >
          {agentName}
        </Typography>
      </Box>

      {/* Bottom Section (25% of card - 80px) */}
      <Box
        sx={{
          height: '60px',
          width: '100%',
          background: 'rgba(20, 15, 35, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: ')px',
        }}
      >
        {/* Agent Title/Category - Colored Text */}
        <Typography
          sx={{
            fontFamily: 'var(--font-primary)',
            fontSize: '14px',
            fontWeight: 600,
            color: cardColor.primary,
            textAlign: 'center',
            textTransform: 'capitalize',
          }}
        >
          {agentTitle}
        </Typography>
      </Box>
    </Box>
  );
};
