'use client';

import { useEffect } from 'react';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';
import CommunityManagerView from '@/shared/sections/agents/community-manager/view';

export default function CommunityManagerPage() {
  const { setTitle } = useInterfaceTitle();

  useEffect(() => {
    setTitle('Ziri: Votre Assistant Community Manager');
  }, [setTitle]);

  return <CommunityManagerView />;
}
