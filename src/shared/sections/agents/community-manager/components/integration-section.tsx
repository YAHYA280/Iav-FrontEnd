import { Box } from '@mui/material';
import { SectionHeader } from './section-header';
import { IntegrationGrid, PlatformIntegration } from './integration-grid';
import { defaultPlatforms } from '@/shared/_mock/community-manager-config';

export interface IntegrationSectionProps {
  platforms?: PlatformIntegration[];
}

export function IntegrationSection({ platforms = defaultPlatforms }: IntegrationSectionProps) {
  const handlePlatformToggle = (_platformName: string, _isConnected: boolean) => {
    void _platformName;
    void _isConnected;
  };

  const handlePlatformConnect = (_platformName: string) => {
    void _platformName;
  };

  return (
    <>
      <SectionHeader
        title="Intégrations d'agent"
        subtitle="Connectez des outils externes et des canaux de communication pour cet agent."
      />
      <Box
        sx={{
          backgroundColor: 'rgb(12, 68, 106)',
          borderRadius: '24px',
          border: 'none',
          p: 3,
        }}
      >
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
    </>
  );
}

