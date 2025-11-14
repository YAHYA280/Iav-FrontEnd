'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import Image from 'next/image';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { agentColors } from '@/contexts/theme/agent-theme-context';

interface Feature {
  id: string;
  title: string;
  description: string;
}

interface AgentDetailPageProps {
  agentId: string;
  agentName: string;
  agentTitle: string;
  avatar: string;
  description: string;
  features: Feature[];
  onBack: () => void;
  onTryFree?: () => void;
}

export const AgentDetailPage: React.FC<AgentDetailPageProps> = ({
  agentId,
  agentName,
  agentTitle,
  avatar,
  description,
  features,
  onBack,
  onTryFree,
}) => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const agentColor = agentColors[agentId as keyof typeof agentColors] || agentColors.default;

  // Animate page entrance
  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  const toggleFeature = (featureId: string) => {
    const isExpanding = expandedFeature !== featureId;
    const newExpandedFeature = isExpanding ? featureId : null;

    if (isExpanding) {
      // Animate expansion
      const featureContent = document.querySelector(`#feature-content-${featureId}`);
      if (featureContent) {
        gsap.fromTo(
          featureContent,
          {
            height: 0,
            opacity: 0,
          },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          }
        );
      }

      // Rotate icon to X
      const icon = document.querySelector(`#feature-icon-${featureId}`);
      if (icon) {
        gsap.to(icon, {
          rotation: 45,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      }
    } else {
      // Animate collapse
      const featureContent = document.querySelector(`#feature-content-${featureId}`);
      if (featureContent) {
        gsap.to(featureContent, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }

      // Rotate icon back
      const icon = document.querySelector(`#feature-icon-${featureId}`);
      if (icon) {
        gsap.to(icon, {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      }
    }

    setExpandedFeature(newExpandedFeature);
  };

  const handleTryFree = () => {
    if (onTryFree) {
      onTryFree();
    } else {
      console.log('Try free clicked for agent:', agentId);
    }
  };

  const handleBookDemo = () => {
    console.log('Book demo clicked for agent:', agentId);
    // TODO: Implement book demo functionality
  };

  return (
    <Box
      ref={pageRef}
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        padding: { xs: 3, md: 6 },
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={onBack}
        sx={{
          position: 'absolute',
          top: { xs: 20, md: 30 },
          left: { xs: 20, md: 30 },
          color: '#FFF',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: '48px',
          height: '48px',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderColor: `${agentColor.primary}66`,
            boxShadow: `0 4px 20px ${agentColor.glow}`,
          },
          zIndex: 10,
        }}
      >
        <FontAwesomeIcon icon="chevron-left" />
      </IconButton>

      {/* Content Grid */}
      <Box
        sx={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 4, md: 8 },
          alignItems: 'start',
          pt: { xs: 8, md: 4 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left Side - Details */}
        <Box sx={{ order: { xs: 2, md: 1 }, position: 'relative', zIndex: 1 }}>
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              color: '#FFF',
              fontFamily: 'var(--font-tertiary)',
              fontWeight: 700,
              fontSize: { xs: '36px', md: '52px' },
              mb: 3,
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            }}
          >
            Découvrez {agentName}
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontFamily: 'var(--font-primary)',
              fontSize: { xs: '15px', md: '17px' },
              lineHeight: 1.8,
              mb: 5,
            }}
          >
            {description}
          </Typography>

          {/* Features Accordion */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 5 }}>
            {features.map((feature) => (
              <Box
                key={feature.id}
                sx={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: `${agentColor.primary}44`,
                    boxShadow: `0 8px 32px ${agentColor.glow}`,
                  },
                }}
              >
                {/* Feature Header */}
                <Box
                  onClick={() => toggleFeature(feature.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: { xs: 2.5, md: 3 },
                    cursor: 'pointer',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                    {/* Checkmark Icon */}
                    <Box
                      sx={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: `${agentColor.primary}22`,
                        border: `1.5px solid ${agentColor.primary}66`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FontAwesomeIcon
                        icon="check"
                        style={{ fontSize: '13px', color: agentColor.primary }}
                      />
                    </Box>

                    {/* Feature Title */}
                    <Typography
                      sx={{
                        color: '#FFF',
                        fontFamily: 'var(--font-primary)',
                        fontSize: { xs: '15px', md: '17px' },
                        fontWeight: 600,
                      }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>

                  {/* Plus/X Icon */}
                  <Box
                    id={`feature-icon-${feature.id}`}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '20px',
                      transition: 'transform 0.3s ease, color 0.3s ease',
                      '&:hover': {
                        color: agentColor.primary,
                      },
                    }}
                  >
                    <FontAwesomeIcon icon="plus" />
                  </Box>
                </Box>

                {/* Feature Content (Expandable) */}
                <Box
                  id={`feature-content-${feature.id}`}
                  sx={{
                    height: 0,
                    opacity: 0,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      padding: { xs: 2.5, md: 3 },
                      paddingTop: 0,
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      mt: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: 'var(--font-primary)',
                        fontSize: { xs: '14px', md: '15px' },
                        lineHeight: 1.7,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
            }}
          >
            {/* Try Free Button (Glassmorphic with agent color) */}
            <Box
              component="button"
              onClick={handleTryFree}
              className="group"
              sx={{
                flex: { xs: '1 1 100%', sm: '0 1 auto' },
                padding: '18px 36px',
                background: `linear-gradient(135deg, ${agentColor.primary}33 0%, ${agentColor.primary}22 100%)`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: `2px solid ${agentColor.primary}66`,
                color: '#FFF',
                fontFamily: 'var(--font-primary)',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 12px ${agentColor.glow}`,
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'scale(1.05)',
                  borderColor: agentColor.primary,
                  boxShadow: `0 6px 16px ${agentColor.glow}`,
                  '& .shine-effect': {
                    transform: 'translateX(100%)',
                  },
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              }}
            >
              <span style={{ position: 'relative', zIndex: 10 }}>
                Essayer gratuitement
              </span>

              {/* Shine animation effect */}
              <Box
                className="shine-effect"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.7s ease-out',
                }}
              />
            </Box>

            {/* Book Demo Button (Dark glassmorphic) */}
            <Box
              component="button"
              onClick={handleBookDemo}
              className="group"
              sx={{
                flex: { xs: '1 1 100%', sm: '0 1 auto' },
                padding: '18px 36px',
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                color: '#FFF',
                fontFamily: 'var(--font-primary)',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)',
                  '& .shine-effect': {
                    transform: 'translateX(100%)',
                  },
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              }}
            >
              <span style={{ position: 'relative', zIndex: 10 }}>
                Réserver une démo
              </span>

              {/* Shine animation effect */}
              <Box
                className="shine-effect"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.7s ease-out',
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Right Side - Agent Image */}
        <Box
          sx={{
            order: { xs: 1, md: 2 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            position: { xs: 'relative', md: 'fixed' },
            right: { md: '5%' },
            top: { md: '130px' },
            width: { md: 'calc(50% - 80px)' },
            maxWidth: { md: '530px' },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '530px',
              height: '670px',
              borderRadius: '40px',
              background: agentColor.primary,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: `0 24px 64px ${agentColor.glow}`,
              border: `3px solid ${agentColor.primary}66`,
            }}
          >
            {/* Agent Image */}
            {avatar && (
              <Image
                src={avatar}
                alt={agentName}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
                sizes="500px"
              />
            )}

            {/* Bottom Label */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 4,
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.9) 100%)',
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'var(--font-primary)',
                  fontSize: '15px',
                  fontWeight: 500,
                  mb: 1,
                  textTransform: 'capitalize',
                }}
              >
                {agentTitle}
              </Typography>
              <Typography
                sx={{
                  color: '#FFF',
                  fontFamily: 'var(--font-tertiary)',
                  fontSize: '32px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
                }}
              >
                {agentName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
