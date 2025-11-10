'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';

export default function IntegrationPage() {
  const { setTitle } = useInterfaceTitle();

  useEffect(() => {
    setTitle('Intégration');
  }, [setTitle]);

  return (
    <Box>
    </Box>
  );
}
