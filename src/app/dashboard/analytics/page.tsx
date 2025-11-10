'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';

export default function AnalyticsPage() {
  const { setTitle } = useInterfaceTitle();

  useEffect(() => {
    setTitle('Analytiques');
  }, [setTitle]);

  return (
    <Box>
    </Box>
  );
}
