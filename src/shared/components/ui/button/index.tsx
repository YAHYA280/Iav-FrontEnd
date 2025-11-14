import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'contained' | 'outlined' | 'text' | 'glass';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'contained', size = 'medium', loading = false, children, ...other }, ref) => {
    // Map 'glass' variant to MUI's 'text' variant since MUI doesn't support custom variants
    const muiVariant = variant === 'glass' ? 'text' : variant;

    return (
      <MuiButton
        ref={ref}
        variant={muiVariant}
        size={size}
        disabled={loading}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          ...(variant === 'contained' && {
            background: 'var(--gradient-button)',
            '&:hover': {
              background: 'var(--gradient-button)',
              opacity: 0.9,
            },
          }),
          ...(variant === 'outlined' && {
            borderColor: 'var(--color-primary)',
            color: 'var(--color-primary)',
            '&:hover': {
              borderColor: 'var(--color-primary-dark)',
              backgroundColor: 'rgba(93, 49, 248, 0.04)',
            },
          }),
          ...(variant === 'glass' && {
            background: 'rgba(15, 23, 42, 0.25)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(93, 49, 248, 0.3)',
            color: '#FFF',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'rgba(93, 49, 248, 0.35)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(93, 49, 248, 0.5)',
              boxShadow: '0 0 20px rgba(93, 49, 248, 0.4), 0 4px 20px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(-2px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          }),
        }}
        {...other}
      >
        {loading ? 'Chargement...' : children}
      </MuiButton>
    );
  }
);

Button.displayName = 'Button';
