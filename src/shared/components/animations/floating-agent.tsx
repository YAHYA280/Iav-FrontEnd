'use client';

import { Box, keyframes } from '@mui/material';

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export function FloatingAgent() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 80, 
        right: 40,
        zIndex: 30,
        animation: `${floatAnimation} 3s ease-in-out infinite`,
        width: 53,
        height: 53,
        borderRadius: '53px',
        border: '1px solid #BE30FF',
        background: '#0F1117',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        '& img': {
          width: 35,
          height: 35,
          objectFit: 'contain',
        },
      }}
    >
      <Box
        component="img"
        src="/illustrations/robot.svg"
        alt="Agent IA"
      />
    </Box>
  );
}
