'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';
import { AgentThemeProvider } from '@/contexts/theme/agent-theme-context';
import { GalaxyBackground } from '@/shared/components/backgrounds/galaxy-background';
import { MarketplaceCard } from '@/shared/components/ui/marketplace-card';
import { AgentDetailPage } from '@/shared/components/ui/agent-detail-page';
import { marketplaceAgents, MarketplaceAgent } from '@/shared/_mock/marketplace-agents';

export default function MarketplacePage() {
  const { setTitle } = useInterfaceTitle();
  const [selectedAgent, setSelectedAgent] = useState<MarketplaceAgent | null>(null);

  useEffect(() => {
    setTitle('Marketplace');
  }, [setTitle]);

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
        {/* Galaxy Background */}
        <GalaxyBackground enableParallax />

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
