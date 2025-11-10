import { Box, BoxProps } from '@mui/material';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

export interface ContainerProps extends BoxProps {
  variant?: 'default' | 'glass' | 'transparent';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ variant = 'default', children, sx, ...other }, ref) => {
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
        {children}
      </Box>
    );
  }
);

Container.displayName = 'Container';
