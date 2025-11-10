'use client';

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/contexts/settings/sidebar-context';


const NAV_ITEMS = [
  {
    title: 'Tableau de bord',
    path: '/dashboard',
    icon: 'chart-bar',
  },
  {
    title: 'Intégration',
    path: '/dashboard/integration',
    icon: 'link',
  },
  {
    title: 'Marketplace',
    path: '/dashboard/marketplace',
    icon: 'shopping-cart',
  },
  {
    title: 'Analytiques',
    path: '/dashboard/analytics',
    icon: 'chart-line',
  },
  {
    title: 'Parrainage',
    path: '/dashboard/sponsorship',
    icon: 'gift',
  },
];

const BOTTOM_NAV_ITEMS = [
  {
    title: 'Wiki',
    path: '/dashboard/wiki',
    icon: 'book',
  },
  {
    title: 'Paramètres',
    path: '/dashboard/settings',
    icon: 'cog',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: isCollapsed ? 80 : 280,
        height: '100vh',
        background: 'var(--color-sidebar-bg)',
        border: '1px solid var(--color-sidebar-border)',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
        overflow: 'visible',
        boxShadow: '0 4px 8px 0 rgba(20, 27, 52, 0.04)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
      }}
    >
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid rgba(93, 49, 248, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(190, 48, 255, 0.05)',
          },
          '&:hover .toggle-button, &:hover ~ .toggle-button': {
            opacity: 1,
          },
          transition: 'background-color 0.2s ease',
        }}
        onClick={toggleSidebar}
      >
        {!isCollapsed && (
          <Box
            component="img"
            src="/logo/iavia-logo.svg"
            alt="IAVIA Logo"
            sx={{
              width: 'auto',
              height: 32,
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        )}

        {isCollapsed && (
          <Box
            component="img"
            src="/logo/iavia-logo-short.svg"
            alt="IAVIA Logo"
            sx={{
              width: 'auto',
              height: 30,
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        )}

        <Tooltip title={isCollapsed ? "Déplier" : "Replier"} placement="right">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              toggleSidebar();
            }}
            className="toggle-button"
            sx={{
              position: 'absolute',
              right: isCollapsed ? -16 : -16,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 32,
              height: 32,
              color: 'var(--color-sidebar-text)',
              opacity: 0,
              transition: 'opacity 0.2s ease, background-color 0.2s ease',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(93, 49, 248, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(190, 48, 255, 0.2)',
              },
              zIndex: 1,
            }}
          >
            <FontAwesomeIcon
              icon={isCollapsed ? 'chevron-right' : 'chevron-left'}
              style={{ fontSize: '14px' }}
            />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ flex: 1, py: 2 }}>
        <List sx={{ px: 2 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;

            return (
              <ListItem key={item.title} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: isActive ? 'rgba(190, 48, 255, 0.2)' : 'transparent',
                    color: 'var(--color-sidebar-text)',
                    '&:hover': {
                      backgroundColor: isActive
                        ? 'rgba(190, 48, 255, 0.2)'
                        : 'rgba(190, 48, 255, 0.1)',
                      '& .MuiListItemIcon-root': {
                        color: '#A040F8',
                      },
                      '& .MuiListItemText-primary': {
                        color: '#A040F8',
                      },
                    },
                    py: 1.5,
                    px: 2,
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? '#A040F8' : 'var(--color-sidebar-text)',
                      minWidth: 40,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={item.icon as any}
                      style={{ fontSize: '18px' }}
                    />
                  </ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText
                      primary={item.title}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontFamily: 'var(--font-primary)',
                          fontWeight: 500,
                          fontSize: '14px',
                          color: isActive ? '#A040F8' : 'inherit',
                          transition: 'color 0.2s ease',
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Divider sx={{ borderColor: 'rgba(93, 49, 248, 0.1)', mb: 2 }} />
        <List sx={{ px: 0 }}>
          {BOTTOM_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;

            return (
              <ListItem key={item.title} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: isActive ? 'rgba(190, 48, 255, 0.2)' : 'transparent',
                    color: 'var(--color-sidebar-text)',
                    '&:hover': {
                      backgroundColor: isActive
                        ? 'rgba(190, 48, 255, 0.2)'
                        : 'rgba(190, 48, 255, 0.1)',
                      '& .MuiListItemIcon-root': {
                        color: '#A040F8',
                      },
                      '& .MuiListItemText-primary': {
                        color: '#A040F8',
                      },
                    },
                    py: 1.5,
                    px: 2,
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? '#A040F8' : 'var(--color-sidebar-text)',
                      minWidth: 40,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={item.icon as any}
                      style={{ fontSize: '18px' }}
                    />
                  </ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText
                      primary={item.title}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontFamily: 'var(--font-primary)',
                          fontWeight: 500,
                          fontSize: '14px',
                          color: isActive ? '#A040F8' : 'inherit',
                          transition: 'color 0.2s ease',
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}