'use client';

import { useEffect, useState, useMemo } from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';
import { AgentThemeProvider, agentColors } from '@/contexts/theme/agent-theme-context';
import { GalaxyBackground } from '@/shared/components/backgrounds/galaxy-background';
import { MarketplaceCard } from '@/shared/components/ui/marketplace-card';
import { AgentDetailPage } from '@/shared/components/ui/agent-detail-page';
import DarkVeil from '@/shared/components/backgrounds/DarkVeil';
import { marketplaceAgents, MarketplaceAgent } from '@/shared/_mock/marketplace-agents';

export default function MarketplacePage() {
  const { setTitle } = useInterfaceTitle();
  const [selectedAgent, setSelectedAgent] = useState<MarketplaceAgent | null>(null);

  useEffect(() => {
    setTitle('Marketplace');
  }, [setTitle]);

  // Get agent's primary color directly
  const agentPrimaryColor = useMemo(() => {
    if (!selectedAgent) return '#A855F7';
    const agentColor = agentColors[selectedAgent.id as keyof typeof agentColors] || agentColors.default;
    return agentColor.primary;
  }, [selectedAgent]);

  const handleAgentClick = (agent: MarketplaceAgent) => {
    setSelectedAgent(agent);
  };

  const handleBack = () => {
    setSelectedAgent(null);
  };

  return (
    <AgentThemeProvider>
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          pb: 6,
        }}
      >
        {/* Galaxy Background - Always visible */}
        <GalaxyBackground enableParallax />

        {/* DarkVeil Background - Only visible on agent detail, layered on top of galaxy */}
        {selectedAgent && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              opacity: 0.25,
            }}
          >
            <DarkVeil
              targetColor={agentPrimaryColor}
              speed={0.4}
              warpAmount={0.4}
              noiseIntensity={0.03}
            />
          </Box>
        )}

        {/* Conditional Rendering: Show either marketplace grid or agent detail */}
        {!selectedAgent ? (
          /* Marketplace Grid */
          <Container
            maxWidth="xl"
            sx={{
              position: 'relative',
              zIndex: 1,
              pt: 6,
            }}
          >
            {/* Page Title */}
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  color: '#FFF',
                  fontFamily: 'var(--font-tertiary)',
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '28px', md: '36px' },
                  letterSpacing: '-0.5px',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                }}
              >
                Découvrez nos Agents IA
              </Typography>
            </Box>

            {/* Agent Cards Grid */}
            <Grid
              container
              spacing={4}
              justifyContent="center"
              sx={{
                px: { xs: 2, md: 0 },
              }}
            >
              {marketplaceAgents.map((agent) => (
                <Grid item key={agent.id}>
                  <MarketplaceCard
                    agentId={agent.id}
                    agentName={agent.name}
                    agentTitle={agent.title}
                    avatar={agent.avatar}
                    price={agent.price}
                    category={agent.category}
                    onClick={() => handleAgentClick(agent)}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        ) : (
          /* Agent Detail Page */
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
            }}
          >
            <AgentDetailPage
              agentId={selectedAgent.id}
              agentName={selectedAgent.name}
              agentTitle={selectedAgent.title}
              avatar={selectedAgent.avatar}
              description={
                selectedAgent.detailedDescription || selectedAgent.description || ''
              }
              features={selectedAgent.features || []}
              onBack={handleBack}
            />
          </Box>
        )}
      </Box>
    </AgentThemeProvider>
  );
}
