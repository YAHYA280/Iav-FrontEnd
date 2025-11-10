import { Box, Typography, BoxProps, useTheme } from '@mui/material';
import { forwardRef } from 'react';

export interface IntegrationHeaderProps extends BoxProps {
  title: string;
  subtitle: string;
}

export const IntegrationHeader = forwardRef<HTMLDivElement, IntegrationHeaderProps>(
  ({ title, subtitle, sx, ...other }, ref) => {
    const theme = useTheme();
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mb: 4,
          ...sx,
        }}
        {...other}
      >
        <Typography
          variant="h5"
          sx={{
            maxWidth: '300px',
            color: '#EDEDED',
            fontFamily: theme.typography.fontTertiaryFamily,
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '121.331%',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: '1038px',
            color: '#9CA3AF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '121.331%',
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    );
  }
);

IntegrationHeader.displayName = 'IntegrationHeader';