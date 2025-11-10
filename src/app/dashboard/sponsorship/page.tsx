'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';

export default function SponsorshipPage() {
  const { setTitle } = useInterfaceTitle();

  useEffect(() => {
    setTitle('Parrainage');
  }, [setTitle]);

  return (
    <Box>
    </Box>
  );
}

