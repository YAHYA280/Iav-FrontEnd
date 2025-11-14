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
        background: 'rgba(15, 23, 42, 0.25)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(93, 49, 248, 0.12)',
        overflow: 'visible',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Logo Section with Click to Toggle */}
      <Box
        onClick={toggleSidebar}
        sx={{
          p: 3,
          mb: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          minHeight: '80px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(93, 49, 248, 0.05)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          },
          '&:hover .toggle-hint': {
            opacity: 1,
          },
        }}
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
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
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
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        )}

        {/* Subtle Toggle Hint Icon */}
        <Box
          className="toggle-hint"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: isCollapsed ? 'auto' : 8,
            left: isCollapsed ? '50%' : 'auto',
            transform: isCollapsed ? 'translateX(-50%)' : 'none',
            opacity: 0.4,
            transition: 'opacity 0.3s ease',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '10px',
          }}
        >
          <FontAwesomeIcon
            icon={isCollapsed ? 'angles-right' : 'angles-left'}
            style={{ fontSize: '12px' }}
          />
        </Box>
      </Box>

      <Box sx={{ flex: 1, py: 2 }}>
        <List sx={{ px: 2 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;

            return (
              <ListItem key={item.title} disablePadding sx={{ mb: 1.5 }}>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    background: isActive
                      ? 'rgba(93, 49, 248, 0.25)'
                      : 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: isActive ? '1px solid rgba(93, 49, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                    color: '#FFF',
                    boxShadow: isActive ? '0 4px 12px rgba(93, 49, 248, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      background: isActive
                        ? 'rgba(93, 49, 248, 0.35)'
                        : 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(93, 49, 248, 0.3)',
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 16px rgba(93, 49, 248, 0.25)',
                      '& .MuiListItemIcon-root': {
                        color: '#A855F7',
                        transform: 'scale(1.1)',
                      },
                      '& .MuiListItemText-primary': {
                        color: '#A855F7',
                      },
                      '& .shine-effect': {
                        transform: 'translateX(100%)',
                      },
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                    },
                    py: 1.5,
                    px: 2,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? '#A855F7' : 'rgba(255, 255, 255, 0.7)',
                      minWidth: 40,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 10,
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
                        position: 'relative',
                        zIndex: 10,
                        '& .MuiListItemText-primary': {
                          fontFamily: 'var(--font-primary)',
                          fontWeight: isActive ? 600 : 500,
                          fontSize: '14px',
                          color: isActive ? '#FFF' : 'rgba(255, 255, 255, 0.8)',
                          transition: 'all 0.3s ease',
                        },
                      }}
                    />
                  )}

                  {/* Shine animation effect */}
                  <Box
                    className="shine-effect"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      transform: 'translateX(-100%)',
                      transition: 'transform 0.7s ease-out',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ p: 2 }}>
        <Divider
          sx={{
            borderColor: 'rgba(93, 49, 248, 0.1)',
            mb: 2,
            '&::before, &::after': {
              borderColor: 'rgba(93, 49, 248, 0.1)',
            },
          }}
        />
        <List sx={{ px: 0 }}>
          {BOTTOM_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;

            return (
              <ListItem key={item.title} disablePadding sx={{ mb: 1.5 }}>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    background: isActive
                      ? 'rgba(93, 49, 248, 0.25)'
                      : 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: isActive ? '1px solid rgba(93, 49, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                    color: '#FFF',
                    boxShadow: isActive ? '0 4px 12px rgba(93, 49, 248, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      background: isActive
                        ? 'rgba(93, 49, 248, 0.35)'
                        : 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(93, 49, 248, 0.3)',
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 16px rgba(93, 49, 248, 0.25)',
                      '& .MuiListItemIcon-root': {
                        color: '#A855F7',
                        transform: 'scale(1.1)',
                      },
                      '& .MuiListItemText-primary': {
                        color: '#A855F7',
                      },
                      '& .shine-effect': {
                        transform: 'translateX(100%)',
                      },
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                    },
                    py: 1.5,
                    px: 2,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? '#A855F7' : 'rgba(255, 255, 255, 0.7)',
                      minWidth: 40,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 10,
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
                        position: 'relative',
                        zIndex: 10,
                        '& .MuiListItemText-primary': {
                          fontFamily: 'var(--font-primary)',
                          fontWeight: isActive ? 600 : 500,
                          fontSize: '14px',
                          color: isActive ? '#FFF' : 'rgba(255, 255, 255, 0.8)',
                          transition: 'all 0.3s ease',
                        },
                      }}
                    />
                  )}

                  {/* Shine animation effect */}
                  <Box
                    className="shine-effect"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      transform: 'translateX(-100%)',
                      transition: 'transform 0.7s ease-out',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}