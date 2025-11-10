import { Box, BoxProps, Fade } from '@mui/material';
import { ReactNode } from 'react';

export interface ConfigurationContentProps extends BoxProps {
    children: ReactNode;
    tabId: string;
    activeTab: string;
    animation?: boolean;
}

export const ConfigurationContent = ({
    children,
    tabId,
    activeTab,
    animation = true,
    sx,
    ...other
}: ConfigurationContentProps) => {
    const isActive = activeTab === tabId;

    if (!isActive) {
        return null;
    }

    const content = (
        <Box
            sx={{
                mt: 4,
                p: 3,
                backgroundColor: '#3C1C69',
                borderRadius: '24px',
                border: 'none',
                minHeight: '400px',
                ...sx,
            }}
            {...other}
        >
            {children}
        </Box>
    );

    if (animation) {
        return (
            <Fade in={isActive} timeout={300}>
                <div>{content}</div>
            </Fade>
        );
    }

    return content;
};

ConfigurationContent.displayName = 'ConfigurationContent';