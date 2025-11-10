import { Box } from '@mui/material';
import { IntegrationHeader } from '../integration-header';
import { IntegrationGrid, PlatformIntegration } from '../integration-grid';
import { useSavSubagentData } from '@/hooks/use-sav-subagent-data';

export interface IntegrationSectionProps {
  subagentId?: string;
}

export function IntegrationSection({ subagentId = 'sav-general' }: IntegrationSectionProps) {
  const { platforms } = useSavSubagentData(subagentId);

  const handlePlatformToggle = (platformName: string, isConnected: boolean) => {
  };

  const handlePlatformConnect = (platformName: string) => {
  };

  return (
    <Box
      sx={{
        backgroundColor: '#3C1C69',
        borderRadius: '24px',
        border: 'none',
        p: 3,
        mt: 6,
      }}
    >
      <IntegrationHeader
        title="Intégrations d'agent"
        subtitle="Connectez des outils externes et des canaux de communication pour cet agent."
      />
      <IntegrationGrid
        platforms={platforms}
        onPlatformToggle={handlePlatformToggle}
        onPlatformConnect={handlePlatformConnect}
        sx={{
          backgroundColor: 'transparent',
          borderRadius: 0,
          border: 'none',
          p: 0,
        }}
      />
    </Box>
  );
}