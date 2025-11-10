'use client';

import { Box, Button, Typography } from '@mui/material';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--gradient-main-opacity)',
        padding: 4,
      }}
    >
      <Typography 
        component="h1"
        sx={{ 
          fontSize: '6rem',
          fontWeight: 800,
          mb: 2,
          color: 'var(--color-error)',
          fontFamily: 'var(--font-secondary)',
        }}
      >
        ⚠️
      </Typography>
      
      <Typography 
        variant="h4" 
        component="h2"
        sx={{ 
          color: 'var(--color-text-primary)',
          mb: 2,
          textAlign: 'center'
        }}
      >
        Une erreur s&apos;est produite
      </Typography>
      
      <Typography 
        variant="body1"
        sx={{ 
          color: 'var(--color-text-secondary)',
          mb: 4,
          textAlign: 'center',
          maxWidth: 500
        }}
      >
        Désolé, une erreur inattendue s&apos;est produite. Veuillez réessayer.
      </Typography>
      
      <Button
        onClick={reset}
        variant="contained"
        sx={{
          background: 'var(--gradient-button)',
          px: 4,
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
        }}
      >
        Réessayer
      </Button>
    </Box>
  );
}
