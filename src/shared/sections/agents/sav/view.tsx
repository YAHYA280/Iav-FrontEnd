import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { ConversationsTab } from './components/conversation-tab';
import { PerformanceMetrics } from './components/performance-metrics';
import { IntegrationSection } from './components/views/integration-section';
import { ConfigurationSection } from './components/views/configuration-section';
import { IntegrationTabs, TabItem } from '@/shared/components/ui/integration-tabs';
import { Agent } from '@/shared/types/agent';
import { defaultAgent, defaultSubAgents } from '@/shared/_mock/agents';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { useSidebar } from '@/contexts/settings/sidebar-context';
import { TicketSection } from './components/ticket-management-section';
import { AgentCard } from '@/shared/components/ui/agent-card';

const StickyNoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M16.7969 15.625H23.4375V2.73438C23.4375 2.08496 22.915 1.5625 22.2656 1.5625H2.73438C2.08496 1.5625 1.5625 2.08496 1.5625 2.73438V22.2656C1.5625 22.915 2.08496 23.4375 2.73438 23.4375H15.625V16.7969C15.625 16.1523 16.1523 15.625 16.7969 15.625ZM23.0957 18.3105L18.3105 23.0957C18.0908 23.3154 17.793 23.4375 17.4805 23.4375H17.1875V17.1875H23.4375V17.4854C23.4375 17.793 23.3154 18.0908 23.0957 18.3105Z" fill="#8D31FB" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M11.2543 2.16155L8.42005 7.90807L2.07891 8.83255C0.941752 8.99748 0.486023 10.3994 1.31068 11.2023L5.89835 15.6728L4.81328 21.9879C4.61797 23.1294 5.82022 23.9845 6.82717 23.4506L12.4999 20.4688L18.1727 23.4506C19.1796 23.9801 20.3819 23.1294 20.1865 21.9879L19.1015 15.6728L23.6891 11.2023C24.5138 10.3994 24.0581 8.99748 22.9209 8.83255L16.5798 7.90807L13.7456 2.16155C13.2378 1.13724 11.7664 1.12422 11.2543 2.16155Z" fill="#8D31FB" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <g clipPath="url(#clip0_2_23272)">
      <path d="M12.5 0.390625C5.81055 0.390625 0.390625 5.81055 0.390625 12.5C0.390625 19.1895 5.81055 24.6094 12.5 24.6094C19.1895 24.6094 24.6094 19.1895 24.6094 12.5C24.6094 5.81055 19.1895 0.390625 12.5 0.390625ZM15.2881 17.4854L10.9814 14.3555C10.8301 14.2432 10.7422 14.0674 10.7422 13.8818V5.66406C10.7422 5.3418 11.0059 5.07812 11.3281 5.07812H13.6719C13.9941 5.07812 14.2578 5.3418 14.2578 5.66406V12.3877L17.3584 14.6436C17.6221 14.834 17.6758 15.2002 17.4854 15.4639L16.1084 17.3584C15.918 17.6172 15.5518 17.6758 15.2881 17.4854Z" fill="#8D31FB" />
    </g>
    <defs>
      <clipPath id="clip0_2_23272">
        <rect width="25" height="25" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const MessengerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <g clipPath="url(#clip0_2_23296)">
      <path d="M12.5269 0.390625C5.68945 0.390625 0.390625 5.3877 0.390625 12.1372C0.390625 15.6675 1.84131 18.7183 4.20264 20.8257C4.61035 21.1924 4.52637 21.4048 4.5957 23.6689C4.60116 23.8275 4.64534 23.9824 4.72439 24.12C4.80344 24.2576 4.91495 24.3738 5.0492 24.4584C5.18346 24.543 5.33637 24.5934 5.49461 24.6054C5.65285 24.6173 5.8116 24.5904 5.95703 24.5269C8.54053 23.3892 8.57373 23.2993 9.01172 23.4185C16.4966 25.4785 24.6094 20.6885 24.6094 12.1372C24.6094 5.3877 19.3647 0.390625 12.5269 0.390625ZM19.814 9.43018L16.2495 15.0732C16.1149 15.2854 15.9379 15.4675 15.7297 15.6082C15.5214 15.7488 15.2863 15.8448 15.0392 15.8904C14.7921 15.9359 14.5382 15.9299 14.2935 15.8727C14.0488 15.8155 13.8186 15.7084 13.6172 15.5581L10.7812 13.4355C10.6545 13.3405 10.5003 13.2891 10.3418 13.2891C10.1833 13.2891 10.0291 13.3405 9.90234 13.4355L6.07568 16.3379C5.56494 16.7251 4.896 16.1133 5.24023 15.5728L8.80469 9.92969C8.93924 9.71743 9.1162 9.53527 9.32446 9.39462C9.53273 9.25398 9.7678 9.15788 10.015 9.11235C10.2621 9.06683 10.516 9.07286 10.7607 9.13007C11.0054 9.18729 11.2357 9.29444 11.437 9.44482L14.272 11.5669C14.3988 11.662 14.553 11.7134 14.7114 11.7134C14.8699 11.7134 15.0241 11.662 15.1509 11.5669L18.9795 8.66748C19.4893 8.27783 20.1582 8.88916 19.814 9.43018Z" fill="#8D31FB" />
    </g>
    <defs>
      <clipPath id="clip0_2_23296">
        <rect width="25" height="25" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const SAVDashboard: React.FC = () => {
  const { isCollapsed: isGlobalSidebarCollapsed } = useSidebar();
  const [activeTab, setActiveTab] = useState('integrations');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [localMainAgent, setLocalMainAgent] = useState(defaultAgent);
  const [localSubAgents, setLocalSubAgents] = useState(defaultSubAgents);

  const getCurrentAgent = (): Agent => {
    if (selectedAgentId) {
      const selectedSubAgent = localSubAgents.find(agent => agent.id === selectedAgentId);
      return selectedSubAgent || localMainAgent;
    }
    return localMainAgent;
  };

  const currentAgent = getCurrentAgent();

  const getSubagentId = (): string => {
    if (selectedAgentId) {
      return selectedAgentId;
    }
    return 'sav-general';
  };

  const subagentId = getSubagentId();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSubAgentSelect = (agentId: string | null) => {
    setSelectedAgentId(agentId);
  };

  const handleMainAgentToggle = (active: boolean) => {
    setLocalMainAgent(prev => ({
      ...prev,
      isActive: active
    }));

    if (!active) {
      const updatedSubAgents = localSubAgents.map(agent => ({
        ...agent,
        isActive: false
      }));
      setLocalSubAgents(updatedSubAgents);
    }
  };

  const handleSubAgentToggle = (id: string, active: boolean) => {
    setLocalSubAgents(prev =>
      prev.map(agent =>
        agent.id === id ? { ...agent, isActive: active } : agent
      )
    );

    if (id === selectedAgentId && !active) {
      setSelectedAgentId(null);
    }
  };

  const handleAddSubAgent = () => {
  };

  const handleConversationClick = () => {
  };

  const handleSearch = (query: string) => {
  };

  const handleSubAgentMenuClick = (id: string, action: string) => {
  };

  const currentMetrics = [
    {
      title: 'Tickets résolus',
      value: currentAgent.metrics.ticketsResolved.toString(),
      icon: <StickyNoteIcon />,
    },
    {
      title: 'Satisfaction client',
      value: `${currentAgent.metrics.customerSatisfaction}/5`,
      icon: <StarIcon />,
    },
    {
      title: 'Réponse moyenne',
      value: currentAgent.metrics.averageResponse,
      icon: <ClockIcon />,
    },
    {
      title: 'Discussions actives',
      value: currentAgent.metrics.activeDiscussions.toString(),
      icon: <MessengerIcon />,
    },
  ];

  const tabs: TabItem[] = useMemo(() => [
    {
      id: 'integrations',
      label: 'Intégrations',
      content: <IntegrationSection subagentId={subagentId} />,
    },
    {
      id: 'configuration',
      label: 'Configuration',
      content: <ConfigurationSection subagentId={subagentId} />,
    },
    {
      id: 'conversations',
      label: 'Conversations',
      content: (
        <ConversationsTab
          conversations={currentAgent.conversations || []}
          clients={currentAgent.clients || []}
          onConversationClick={handleConversationClick}
          onSearch={handleSearch}
        />
      ),
    },
    {
      id: 'tickets',
      label: 'Gestion des Tickets',
      content: <TicketSection subagentId={subagentId} />
    },
  ], [subagentId, currentAgent]);

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Box sx={{ width: '100%', p: { xs: 1, sm: 1.5, md: 1.5 } }}>
        <Box
          sx={{
            width: '100%',
            minHeight: 'calc(100vh - 32px)',
            borderRadius: { xs: '16px', md: '24px' },
            border: '2px solid transparent',
            background: `
              linear-gradient(#1a1a2e, #1a1a2e) padding-box,
              linear-gradient(45deg, #BE30FF, #5D31F8, #00A3FF) border-box
            `,
            backgroundColor: 'rgba(141, 49, 251, 0.2)',
            display: 'flex',
            position: 'relative',
            mx: 'auto',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(40, 23, 69)',
              borderRadius: { xs: '16px', md: '24px' },
              zIndex: 0,
            }}
          />

          <Grid
            container
            spacing={0}
            columnSpacing={0}
            sx={{
              alignItems: 'stretch',
              position: 'relative',
              zIndex: 1,
              flex: 1,
              minHeight: '100%'
            }}
          >
            <Grid
              item
              xs={12}
              md={2}
              lg={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100%',
                pr: {
                  xs: 1,
                  sm: isGlobalSidebarCollapsed ? 3 : 5,
                  md: isGlobalSidebarCollapsed ? 3.5 : 5.5,
                  lg: isGlobalSidebarCollapsed ? 3.5 : 5.5
                }
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100%',
                  position: 'relative',
                  zIndex: 2,
                  p: 0,
                  '& > *': {
                    height: '100% !important',
                    minHeight: '100% !important'
                  }
                }}
              >
                <AgentCard
                  agentName={localMainAgent.name}
                  agentTitle={localMainAgent.title}
                  avatar={"/avatars/ziri-avatar.png"}
                  isActive={localMainAgent.isActive}
                  onToggleActive={handleMainAgentToggle}
                  subAgents={localSubAgents.map(agent => ({
                    id: agent.id,
                    name: agent.name,
                    isActive: agent.isActive
                  }))}
                  selectedAgentId={selectedAgentId}
                  onSubAgentSelect={handleSubAgentSelect}
                  onAddSubAgent={handleAddSubAgent}
                  onToggleSubAgent={handleSubAgentToggle}
                  onSubAgentMenuClick={handleSubAgentMenuClick}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={10}
              lg={10}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100%',
                pl: {
                  xs: 1,
                  sm: isGlobalSidebarCollapsed ? 3 : 5,
                  md: isGlobalSidebarCollapsed ? 3.5 : 5.5,
                  lg: isGlobalSidebarCollapsed ? 3.5 : 5.5
                }
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  minHeight: '100%',
                  overflow: 'hidden',
                }}
              >
                <ConditionalComponent isValid={currentMetrics.length > 0}>
                  <Box sx={{ width: '100%', overflow: 'hidden', flexShrink: 0, p: 2, pt: 3, pb: 0 }}>
                    <PerformanceMetrics metrics={currentMetrics} />
                  </Box>
                </ConditionalComponent>
                <ConditionalComponent isValid={true}>
                  <Box sx={{
                    width: '100%',
                    flexShrink: 0,
                    p: 2,
                    pt: { xs: 2, sm: 3 },
                    pb: 0,
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    backgroundColor: 'rgba(40, 23, 69)',
                  }}>
                    <IntegrationTabs
                      tabs={tabs}
                      defaultTab={activeTab}
                      onTabChange={handleTabChange}
                      sx={{
                        mb: 0,
                        width: '100%',
                      }}
                    />
                  </Box>
                </ConditionalComponent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    flex: 1,
                    p: 2,
                    pt: 2,
                    pb: 2,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    minHeight: 0,
                    '&::-webkit-scrollbar': {
                      width: '0px',
                      background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'transparent',
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  <Box sx={{ width: '100%', pb: 2 }}>
                    {tabs.map((tab) => {
                      if (tab.id !== activeTab) return null;
                      return (
                        <Box key={tab.id} sx={{ width: '100%' }}>
                          {tab.content}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SAVDashboard;
