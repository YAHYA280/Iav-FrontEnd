import { Box, BoxProps, Typography } from '@mui/material';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

export interface SectionProps extends BoxProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'glass' | 'transparent';
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({
    title,
    subtitle,
    action,
    variant = 'default',
    children,
    sx,
    ...other
  }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'glass':
          return {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            p: 3,
          };
        case 'transparent':
          return {
            background: 'transparent',
            p: 0,
          };
        default:
          return {
            background: 'var(--color-bg-primary)',
            borderRadius: 3,
            p: 3,
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-color)',
          };
      }
    };

    return (
      <Box
        ref={ref}
        sx={{
          ...getVariantStyles(),
          ...sx,
        }}
        {...other}
      >
        {/* Header */}
        {(title || subtitle || action) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <Box>
              {title && (
                <Typography
                  variant="h5"
                  sx={{
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-secondary)',
                    fontWeight: 600,
                    mb: subtitle ? 1 : 0,
                  }}
                >
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
            {action && (
              <Box>
                {action}
              </Box>
            )}
          </Box>
        )}
        {children}
      </Box>
    );
  }
);

Section.displayName = 'Section';
