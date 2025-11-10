import { Button, ButtonProps } from '@mui/material';
import { forwardRef } from 'react';

export interface ConfigurationToggleButtonProps extends Omit<ButtonProps, 'variant'> {
    active?: boolean;
    variant?: 'default' | 'outlined';
}

export const ConfigurationToggleButton = forwardRef<HTMLButtonElement, ConfigurationToggleButtonProps>(
    ({ active = false, variant = 'default', children, sx, ...other }, ref) => {
        return (
            <Button
                ref={ref}
                variant="text"
                sx={{
                    borderRadius: 0,
                    textTransform: 'none',
                    fontWeight: 500,
                    minWidth: { xs: 'auto', sm: '120px' },
                    height: { xs: '40px', sm: '45px' },
                    px: { xs: '12px', sm: '20px' },
                    py: '5px',
                    transition: 'all 0.2s ease-in-out',
                    fontFamily: 'var(--font-primary)',
                    fontSize: { xs: '12px', sm: '14px' },
                    flex: { xs: '0 0 auto', sm: 1 },
                    backgroundColor: 'transparent',
                    color: active ? '#FFF' : 'rgba(255, 255, 255, 0.7)',
                    border: 'none',
                    borderBottom: active ? '2px solid #8D31FB' : '2px solid transparent',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        borderBottom: '2px solid rgba(141, 49, 251, 0.5)',
                    },
                    ...sx,
                }}
                {...other}
            >
                {children}
            </Button>
        );
    }
);

ConfigurationToggleButton.displayName = 'ConfigurationToggleButton';