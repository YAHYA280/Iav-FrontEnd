import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #1a0f3d 0%, #3d1f66 50%, #6b3ba8 100%)',

        padding: 4,
      }}
    >
      <Typography
        component="h1"
        className="gradient-text"
        sx={{
          fontSize: '8rem',
          fontWeight: 800,
          mb: 2,
          fontFamily: 'var(--font-secondary)',
        }}
      >
        404
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
        Page non trouvée
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
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </Typography>

      <Button
        component={Link}
        href="/"
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
        Retour à l&apos;accueil
      </Button>
    </Box>
  );
}
