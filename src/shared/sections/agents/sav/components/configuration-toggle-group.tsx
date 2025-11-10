import { Box, BoxProps } from '@mui/material';
import { ReactNode, useState, createContext, useContext } from 'react';

export interface ConfigurationToggleGroupProps extends Omit<BoxProps, 'children'> {
    children: ReactNode;
    defaultValue?: string;
    onTabChange?: (tabId: string) => void;
}

interface ConfigurationToggleGroupContextType {
    activeTab: string;
    setActiveTab: (tabId: string) => void;
}

const ConfigurationToggleGroupContext = createContext<ConfigurationToggleGroupContextType | undefined>(undefined);

export const useConfigurationToggleGroup = () => {
    const context = useContext(ConfigurationToggleGroupContext);
    if (!context) {
        throw new Error('useConfigurationToggleGroup must be used within a ConfigurationToggleGroup');
    }
    return context;
};

export const ConfigurationToggleGroup = ({
    children,
    defaultValue = '',
    onTabChange,
    sx,
    ...other
}: ConfigurationToggleGroupProps) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        onTabChange?.(tabId);
    };

    return (
        <ConfigurationToggleGroupContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0,
                    p: 0,
                    backgroundColor: 'transparent',
                    borderRadius: 0,
                    border: 'none',
                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                    overflowX: { xs: 'auto', sm: 'visible' },
                    ...sx,
                }}
                {...other}
            >
                {children}
            </Box>
        </ConfigurationToggleGroupContext.Provider>
    );
};

ConfigurationToggleGroup.displayName = 'ConfigurationToggleGroup';