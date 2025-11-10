import { Box, BoxProps } from '@mui/material';
import { useState, ReactNode } from 'react';
import { ToggleButton } from '../toggle-button';
import { ToggleButtonGroup } from '../toggle-button-group';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface IntegrationTabsProps extends BoxProps {
  tabs: TabItem[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const IntegrationTabs = ({
  tabs,
  defaultTab,
  onTabChange,
  sx,
  ...other
}: IntegrationTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <Box 
      sx={{ 
        width: '100%',
        overflowX: { xs: 'auto', sm: 'visible' },
        '&::-webkit-scrollbar': {
          height: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(141, 49, 251, 0.5)',
          borderRadius: '2px',
        },
        ...sx 
      }} 
      {...other}
    >
      <ToggleButtonGroup
        defaultValue={activeTab}
        onTabChange={handleTabChange}
      >
        {tabs.map((tab) => (
          <ToggleButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

IntegrationTabs.displayName = 'IntegrationTabs';