'use client';

import { Box, Typography } from '@mui/material';
import { useSidebar } from '@/contexts/settings/sidebar-context';

export function Footer() {
  const { isCollapsed } = useSidebar();

  return (
    <Box
      component="footer"
      sx={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 4,
        paddingRight: 3,
        ml: isCollapsed ? '80px' : '280px',
        transition: 'margin-left 0.3s ease',
        background: 'transparent',
        borderTop: '1px solid rgba(93, 49, 248, 0.1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: 25,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            color: '#EDEDED',
            fontFamily: 'var(--font-primary)',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '12.66px',
            letterSpacing: '-0.211px',
            textTransform: 'capitalize',
            textAlign: 'left',
          }}
        >
          © 2025 IAVIA. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
