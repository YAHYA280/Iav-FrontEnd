'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';
import { FloatingAgent } from '@/shared/components/animations/floating-agent';

export default function DashboardPage() {
  const { setTitle } = useInterfaceTitle();

  useEffect(() => {
    setTitle('Mes Agents');
  }, [setTitle]);

  return (
    <Box sx={{ position: 'relative', minHeight: '100%' }}>
      <FloatingAgent />
    </Box>
  );
}
