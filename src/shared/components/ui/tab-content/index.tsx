import { Box, BoxProps, Fade } from '@mui/material';
import { ReactNode } from 'react';

export interface TabContentProps extends BoxProps {
  children: ReactNode;
  tabId: string;
  activeTab: string;
  animation?: boolean;
}

export const TabContent = ({
  children,
  tabId,
  activeTab,
  animation = true,
  sx,
  ...other
}: TabContentProps) => {
  const isActive = activeTab === tabId;

  if (!isActive) {
    return null;
  }

  const content = (
    <Box
      sx={{
        mt: 3,
        p: 0,
        backgroundColor: 'transparent',
        borderRadius: 0,
        border: 'none',
        minHeight: 'auto',
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

TabContent.displayName = 'TabContent';