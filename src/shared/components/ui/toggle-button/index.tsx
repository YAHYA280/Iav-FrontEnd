import { Button, ButtonProps } from '@mui/material';
import { forwardRef } from 'react';

export interface ToggleButtonProps extends Omit<ButtonProps, 'variant'> {
  active?: boolean;
  variant?: 'default' | 'outlined';
}

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ active = false, variant = 'default', children, sx, ...other }, ref) => {
    const getVariantStyles = () => {
      if (variant === 'outlined') {
        return {
          border: active ? '2px solid #8D31FB' : '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: active ? '#8D31FB' : 'transparent',
          color: active ? '#FFF' : 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            backgroundColor: active ? '#8D31FB' : 'rgba(141, 49, 251, 0.1)',
            borderColor: '#8D31FB',
          },
        };
      }

      return {
        backgroundColor: active ? '#8D31FB' : 'transparent',
        color: active ? '#FFF' : 'rgba(255, 255, 255, 0.7)',
        border: 'none',
        '&:hover': {
          backgroundColor: active ? '#8D31FB' : 'rgba(141, 49, 251, 0.1)',
        },
      };
    };

    return (
      <Button
        ref={ref}
        variant="text"
        sx={{
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          minWidth: { xs: 'auto', sm: '80px' },
          height: { xs: '40px', sm: '45px' },
          px: { xs: '12px', sm: '10px' },
          py: '5px',
          transition: 'all 0.2s ease-in-out',
          fontFamily: 'var(--font-primary)',
          fontSize: { xs: '14px', sm: '14px' },
          flex: { xs: 1, sm: 1 },
          whiteSpace: 'nowrap',
          width: { xs: '100%', sm: 'auto' },
          ...getVariantStyles(),
          ...sx,
        }}
        {...other}
      >
        {children}
      </Button>
    );
  }
);

ToggleButton.displayName = 'ToggleButton';
