import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

export interface ButtonProps extends MuiButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'contained', size = 'medium', loading = false, children, ...other }, ref) => {
    return (
      <MuiButton
        ref={ref}
        variant={variant}
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
        }}
        {...other}
      >
        {loading ? 'Chargement...' : children}
      </MuiButton>
    );
  }
);

Button.displayName = 'Button';
