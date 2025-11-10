import { Box } from '@mui/material';
import { ReactNode } from 'react';
import ConditionalComponent from '@/shared/components/conditionalComponent';

interface StatusTabContentProps {
  tabId: string;
  activeTab: string;
  children: ReactNode;
}

export const StatusTabContent: React.FC<StatusTabContentProps> = ({
  tabId,
  activeTab,
  children,
}) => {
  return (
    <ConditionalComponent isValid={tabId === activeTab}>
      <Box>
        {children}
      </Box>
    </ConditionalComponent>
  );
};
