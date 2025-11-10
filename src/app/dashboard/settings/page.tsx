'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';

export default function SettingsPage() {
  const { setTitle } = useInterfaceTitle();

  useEffect(() => {
    setTitle('Pramètres');
  }, [setTitle]);

  return (
    <Box>
    </Box>
  );
}

