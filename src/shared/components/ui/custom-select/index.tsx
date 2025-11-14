'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';

export interface SelectOption {
  id: string;
  icon?: string;
  title: string;
  description?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  primaryColor?: string;
  glowColor?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Sélectionnez une option',
  primaryColor = '#A855F7',
  glowColor = 'rgba(168, 85, 247, 0.4)',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Select Trigger */}
      <Box
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isOpen
            ? `2px solid ${primaryColor}`
            : '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isOpen ? `0 0 20px ${glowColor}` : 'none',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderColor: `${primaryColor}66`,
            '& .shine-effect': {
              transform: 'translateX(100%)',
            },
          },
        }}
      >
        {/* Shine effect */}
        <Box
          className="shine-effect"
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.7s ease-out',
            pointerEvents: 'none',
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, position: 'relative', zIndex: 1 }}>
          {selectedOption ? (
            <>
              {selectedOption.icon && (
                <span style={{ fontSize: '20px' }}>{selectedOption.icon}</span>
              )}
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#FFF',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                {selectedOption.title}
              </Typography>
            </>
          ) : (
            <Typography
              sx={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              {placeholder}
            </Typography>
          )}
        </Box>

        <FontAwesomeIcon
          icon={isOpen ? 'chevron-up' : 'chevron-down'}
          style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)',
            transition: 'all 0.3s ease',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </Box>

      {/* Dropdown Menu */}
      {isOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 1000,
            background: 'rgba(20, 20, 40, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${primaryColor}33`,
            borderRadius: '16px',
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px ${primaryColor}22`,
            maxHeight: '320px',
            overflowY: 'auto',
            padding: '8px',
            animation: 'slideDown 0.2s ease-out',
            '@keyframes slideDown': {
              from: {
                opacity: 0,
                transform: 'translateY(-8px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: `${primaryColor}66`,
              borderRadius: '8px',
              '&:hover': {
                background: primaryColor,
              },
            },
          }}
        >
          {options.map((option) => (
            <Box
              key={option.id}
              onClick={() => handleSelect(option.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                padding: '14px 16px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: option.id === value ? `${primaryColor}22` : 'transparent',
                '&:hover': {
                  background: option.id === value ? `${primaryColor}33` : `${primaryColor}15`,
                  transform: 'translateX(4px)',
                },
              }}
            >
              {option.icon && (
                <span style={{ fontSize: '24px' }}>{option.icon}</span>
              )}
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#FFF',
                    fontFamily: 'var(--font-primary)',
                    mb: option.description ? 0.5 : 0,
                  }}
                >
                  {option.title}
                </Typography>
                {option.description && (
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {option.description}
                  </Typography>
                )}
              </Box>
              {option.id === value && (
                <FontAwesomeIcon
                  icon="check"
                  style={{
                    fontSize: '14px',
                    color: primaryColor,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
