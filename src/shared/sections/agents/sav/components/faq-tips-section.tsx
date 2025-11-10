'use client';

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const tips = [
  'Soyez concis et direct dans vos questions et réponses',
  'Utilisez un langage clair et accessible à tous',
  'Organisez vos FAQ par catégories logiques',
  'Mettez à jour régulièrement vos FAQ pour rester pertinent',
];

export const FaqTipsSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 2,
        borderRadius: '24px',
        background: '#4C2086',
        p: 3,
      }}
    >
      <Typography
        sx={{
          color: '#EDEDED',
          fontFamily: theme.typography.fontTertiaryFamily,
          fontSize: '22px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '121.331%',
          mb: 2,
        }}
      >
        Conseils pour de bonnes FAQ :
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {tips.map((tip, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box
              sx={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#EDEDED',
                mt: 1.5,
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                color: '#EDEDED',
                fontFamily: theme.typography.fontFamily,
                fontSize: '15px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '165%',
              }}
            >
              {tip}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

