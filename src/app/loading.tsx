import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #1a0f3d 0%, #3d1f66 50%, #6b3ba8 100%)',
      }}
    >
      <CircularProgress 
        size={60} 
        sx={{ 
          color: 'var(--color-primary)',
          mb: 2 
        }} 
      />
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-secondary)'
        }}
      >
        Chargement...
      </Typography>
    </Box>
  );
}
