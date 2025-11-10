import React from 'react';
import {
  Box,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { defaultTabs } from '@/shared/_mock/tabs';
import { TabItem } from '@/shared/types/tabItem';

interface NavigationTabsProps {
  tabs?: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  tabs = defaultTabs,
  activeTab = 'integrations',
  onTabChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onTabChange?.(newValue);
  };

  return (
    <Box
      sx={{
        mb: { xs: 2, md: 3 },
        display: 'flex',
        height: { xs: '40px', md: '46px' },
        alignItems: 'center',
        gap: { xs: '8px', md: '16px' },
        alignSelf: 'stretch',
        borderRadius: '8px',
        background: '#3C1C69',
        padding: { xs: '0 8px', md: '0 16px' },
        width: '100%',
        overflow: 'auto',
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant={isMobile ? "scrollable" : "fullWidth"}
        scrollButtons="auto"
        sx={{
          flex: 1,
          width: '100%',
          height: '100%',
          minHeight: '100%',
          '& .MuiTabs-flexContainer': {
            gap: { xs: '8px', md: '16px' },
            height: '100%',
            alignItems: 'center',
          },
          '& .MuiTabs-indicator': {
            display: 'none',
          },
          '& .MuiTab-root': {
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            background: '#3C1C69',
            textTransform: 'none',
            minHeight: '100%',
            padding: { xs: '4px 8px', md: '5px 10px' },
            flexShrink: 0,
            transition: 'all 0.2s ease',
            flex: isMobile ? '0 0 auto' : 1,
            maxWidth: 'none',
            minWidth: { xs: 'auto', md: '0px' },
            '&.Mui-selected': {
              background: '#8D31FB',
            },
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            value={tab.id}
            label={isMobile ? tab.label.split(' ')[0] : tab.label}
            sx={{
              color: '#EDEDED',
              fontFamily: 'Inter',
              fontSize: { xs: '14px', md: '18px' },
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: { xs: '12px', md: '15.287px' },
              letterSpacing: '-0.255px',
              '&.Mui-selected': {
                color: '#EDEDED',
              },
              '&:hover': {
                color: '#EDEDED',
                background: '#4D2580',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};