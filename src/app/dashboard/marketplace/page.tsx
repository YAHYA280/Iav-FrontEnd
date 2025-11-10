'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';

export default function MarketplacePage() {
  const { setTitle } = useInterfaceTitle();

  useEffect(() => {
    setTitle('Marketplace');
  }, [setTitle]);

  return (
    <Box>
    </Box>
  );
}
