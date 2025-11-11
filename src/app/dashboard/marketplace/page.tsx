'use client';

import { useEffect } from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';
import { AgentThemeProvider } from '@/contexts/theme/agent-theme-context';
import { GalaxyBackground } from '@/shared/components/backgrounds/galaxy-background';
import { MarketplaceCard } from '@/shared/components/ui/marketplace-card';
import { marketplaceAgents } from '@/shared/_mock/marketplace-agents';

export default function MarketplacePage() {
  const { setTitle } = useInterfaceTitle();

  useEffect(() => {
    setTitle('Marketplace');
  }, [setTitle]);

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

        {/* Content */}
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
            {/* <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'var(--font-primary)',
                fontSize: { xs: '14px', md: '16px' },
                maxWidth: '600px',
                mx: 'auto',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              }}
            >
              Choisissez parmi notre sélection d'agents IA spécialisés pour automatiser vos
              processus métier
            </Typography> */}
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
                  onClick={() => {
                    // TODO: Navigate to agent detail page
                    console.log(`Clicked on agent: ${agent.name}`);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </AgentThemeProvider>
  );
}
