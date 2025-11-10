'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AgentProfileCard } from '@/shared/components/ui/agent-profile-card';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { useTheme } from '@mui/material';

interface CommunitySidebarProps {
  agentName?: string;
  agentTitle?: string;
  agentImageUrl?: string;
  isAgentActive?: boolean;
  onToggleActive?: (active: boolean) => void;
}

export const CommunitySidebar: React.FC<CommunitySidebarProps> = ({
  agentName = "Ziri",
  agentTitle = "Community Manager",
  agentImageUrl,
  isAgentActive = true,
  onToggleActive,
}) => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const menuOptions = [
    { id: 'integrations', label: 'Intégrations', icon: 'link' },
    { id: 'configuration', label: 'Configuration', icon: 'cog' },
    { id: 'idees', label: 'Idées', icon: 'lightbulb' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar' },
    { id: 'galerie', label: 'Galerie', icon: 'images' },
    { id: 'statistiques', label: 'Statistiques', icon: 'chart-bar' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: '8px 24px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <AgentProfileCard
          agentName={agentName}
          agentTitle={agentTitle}
          avatar={agentImageUrl || "/avatars/ziri-avatar.png"}
          backgroundColor="#069eff"
          titleColor="#069eff"
          isActive={isAgentActive}
          onToggleActive={onToggleActive}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
        {menuOptions.map((option) => {
          const isActive = selectedOption === option.id;
          return (
            <Box
              key={option.id}
              component="button"
              onClick={() => setSelectedOption(option.id)}
              sx={{
                width: '100%',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '8px',
                background: isActive ? 'rgb(11, 86, 136)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: isActive ? '#069EFF' : '#EDEDED',
                fontFamily: theme.typography.fontFamily,
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '72%',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'rgb(11, 86, 136)',
                  color: '#069EFF',
                },
              }}
            >
              <FontAwesomeIcon icon={option.icon as any} style={{ fontSize: '18px' }} />
              <Typography
                sx={{
                  flex: '1 1 auto',
                  textAlign: 'left',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '72%',
                  color: 'inherit',
                }}
              >
                {option.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

