import { Box, BoxProps } from '@mui/material';
import { ReactNode, useState, createContext, useContext } from 'react';

export interface ToggleButtonGroupProps extends Omit<BoxProps, 'children'> {
  children: ReactNode;
  defaultValue?: string;
  onTabChange?: (tabId: string) => void;
}

interface ToggleButtonGroupContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const ToggleButtonGroupContext = createContext<ToggleButtonGroupContextType | undefined>(undefined);

export const useToggleButtonGroup = () => {
  const context = useContext(ToggleButtonGroupContext);
  if (!context) {
    throw new Error('useToggleButtonGroup must be used within a ToggleButtonGroup');
  }
  return context;
};

export const ToggleButtonGroup = ({
  children,
  defaultValue = '',
  onTabChange,
  sx,
  ...other
}: ToggleButtonGroupProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <ToggleButtonGroupContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <Box
        sx={{
          display: 'flex',
          height: { xs: 'auto', sm: '46px' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: '8px', sm: '16px' },
          p: 0,
          backgroundColor: '#3C1C69',
          borderRadius: '8px',
          border: 'none',
          flexDirection: { xs: 'column', sm: 'row' },
          ...sx,
        }}
        {...other}
      >
        {children}
      </Box>
    </ToggleButtonGroupContext.Provider>
  );
};

ToggleButtonGroup.displayName = 'ToggleButtonGroup';