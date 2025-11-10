'use client';

import { useEffect } from 'react';
import { SAVDashboard } from '@/shared/sections/agents/sav/view';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';

export default function SAVPage() {
  const { setTitle } = useInterfaceTitle();

  useEffect(() => {
    setTitle('ITRI: Votre Assistant Service Client & SAV');
  }, [setTitle]);

  return (
    <SAVDashboard />
  );
}
