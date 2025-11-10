import { Box, BoxProps } from '@mui/material';
import { useSidebar } from '@/contexts/settings/sidebar-context';


const HEADER_HEIGHT = 80;
const FOOTER_HEIGHT = 60;

export function Main({ children, sx, ...other }: BoxProps) {
  const { isCollapsed } = useSidebar();
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        pb: 0,
        display: 'flex',
        flexDirection: 'column',
        pt: `${HEADER_HEIGHT}px`,
        pl: 4, 
        pr: 3,
        width: isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 280px)',
        ml: isCollapsed ? '80px' : '280px',
        transition: 'margin-left 0.3s ease, width 0.3s ease',
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
