import { Box, BoxProps } from '@mui/material';
import { IntegrationCard } from './integration-card';
import { PlatformIntegration } from '@/shared/_mock/community-manager-config';

export type { PlatformIntegration };

export interface IntegrationGridProps extends BoxProps {
  platforms: PlatformIntegration[];
  onPlatformToggle?: (platformName: string, isConnected: boolean) => void;
  onPlatformConnect?: (platformName: string) => void;
}

export const IntegrationGrid = ({
  platforms,
  onPlatformToggle,
  onPlatformConnect,
  sx,
  ...other
}: IntegrationGridProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: { xs: 2, sm: 3, md: 3 },
        ...sx,
      }}
      {...other}
    >
      {platforms.map((platform) => (
        <IntegrationCard
          key={platform.id}
          platformName={platform.name}
          logoSrc={platform.logoSrc}
          isConnected={platform.isConnected}
          showLinkIcon={platform.showLinkIcon}
          onToggleChange={onPlatformToggle}
          onConnect={onPlatformConnect}
        />
      ))}
    </Box>
  );
};

IntegrationGrid.displayName = 'IntegrationGrid';

