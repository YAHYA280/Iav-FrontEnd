import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';
import { forwardRef } from 'react';


export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  variant?: 'default' | 'glass' | 'elevated';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', children, sx, ...other }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'glass':
          return {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          };
        case 'elevated':
          return {
            background: 'var(--color-bg-primary)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-color)',
          };
        default:
          return {
            background: 'var(--color-bg-primary)',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-color)',
          };
      }
    };

    return (
      <MuiCard
        ref={ref}
        sx={{
          borderRadius: 3,
          ...getVariantStyles(),
          ...sx,
        }}
        {...other}
      >
        {children}
      </MuiCard>
    );
  }
);

Card.displayName = 'Card';
