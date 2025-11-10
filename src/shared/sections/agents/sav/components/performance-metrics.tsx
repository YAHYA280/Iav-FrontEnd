import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

interface MetricItem {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

interface PerformanceMetricsProps {
  metrics?: MetricItem[];
}

const defaultMetrics: MetricItem[] = [
  {
    title: 'Tickets résolus',
    value: '1200',
    icon: <div />,
  },
  {
    title: 'Satisfaction client',
    value: '4.1/5',
    icon: <div />,
  },
  {
    title: 'Réponse moyenne',
    value: '1000s',
    icon: <div />,
  },
  {
    title: 'Discussions actives',
    value: '1200',
    icon: <div />,
  },
];

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  metrics = defaultMetrics,
}) => {
  return (
    <Grid container spacing={2}>
      {metrics.map((metric, index) => (
        <Grid item xs={6} sm={6} md={3} key={index}>
          <Box
            sx={{
              height: { xs: '80px', sm: '100px', md: '120px' },
              borderRadius: { xs: '12px', md: '16px' },
              backgroundColor: 'rgba(141, 49, 251, 0.2)',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid rgba(141, 49, 251, 0.3)',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  color: '#EDEDED',
                  fontSize: { xs: '12px', sm: '14px' },
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                {metric.title}
              </Typography>
              <Typography
                sx={{
                  color: '#EDEDED',
                  fontSize: { xs: '16px', sm: '20px', md: '24px' },
                  fontWeight: 700,
                }}
              >
                {metric.value}
              </Typography>
            </Box>
            
            <Box
              sx={{
                width: { xs: '40px', md: '50px' },
                height: { xs: '40px', md: '50px' },
                borderRadius: '12px',
                backgroundColor: 'rgba(141, 49, 251, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {metric.icon}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};