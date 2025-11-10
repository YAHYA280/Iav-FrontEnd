import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import ConditionalComponent from '@/shared/components/conditionalComponent';

interface StatusTab {
  id: string;
  label: string;
  count?: number;
}

interface StatusTabsProps {
  tabs: StatusTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const StatusTabs: React.FC<StatusTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: '8px', sm: '16px' },
        alignItems: 'center',
        mb: 3,
        width: 'auto',
        justifyContent: 'flex-start',
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
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
      }}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          sx={{
            backgroundColor: activeTab === tab.id ? '#8D31FB' : 'transparent',
            color: '#EDEDED',
            border: 'none',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            minWidth: { xs: 'auto', sm: 'auto' },
            height: { xs: '40px', sm: '45px' },
            px: { xs: '12px', sm: '16px' },
            py: '8px',
            transition: 'all 0.2s ease-in-out',
            fontFamily: theme.typography.fontFamily,
            fontSize: { xs: '14px', sm: '18px' },
            fontStyle: 'normal',
            lineHeight: '15.287px',
            letterSpacing: '-0.255px',
            textAlign: 'center',
            flex: 'none',
            whiteSpace: 'nowrap',
            '&:hover': {
              backgroundColor: activeTab === tab.id ? '#8D31FB' : 'rgba(141, 49, 251, 0.1)',
              color: activeTab === tab.id ? '#FFF' : 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          {tab.label}
          <ConditionalComponent isValid={tab.count !== undefined}>
            <Box
              sx={{
                ml: { xs: 0.5, sm: 1 },
                backgroundColor: activeTab === tab.id ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: activeTab === tab.id ? '#FFF' : 'rgba(255, 255, 255, 0.7)',
                borderRadius: '12px',
                px: { xs: '6px', sm: '8px' },
                py: '2px',
                fontSize: { xs: '10px', sm: '12px' },
                fontWeight: 600,
                minWidth: { xs: '16px', sm: '20px' },
                textAlign: 'center',
              }}
            >
              {tab.count}
            </Box>
          </ConditionalComponent>
        </Button>
      ))}
    </Box>
  );
};
