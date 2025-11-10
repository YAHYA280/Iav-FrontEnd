'use client';

import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Tooltip
} from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { useSidebar } from '@/contexts/settings/sidebar-context';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';
import { useEffect, useState } from 'react';


export function Header() {
  const { title } = useInterfaceTitle();
  const { isCollapsed } = useSidebar();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: isCollapsed ? '80px' : '280px',
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 280px)',
        transition: 'left 0.3s ease, width 0.3s ease',
        height: 80,
        px: 3,
        background: isScrolled ? 'rgba(26, 15, 61, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(93, 49, 248, 0.15)' : 'transparent',
        boxShadow: isScrolled ? '0 2px 12px rgba(0, 0, 0, 0.15)' : 'none',
        transitionProperty: 'left, width, background, backdrop-filter, box-shadow, border-color',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease',
      }}
    >
      <Typography
        sx={{
          color: '#FFF',
          fontFamily: 'var(--font-tertiary)',
          fontWeight: 700,
          fontSize: '30px',
          lineHeight: '12.66px',
          letterSpacing: '-0.211px',
          textTransform: 'capitalize',
        }}
      >
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            color: '#FFF',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 600,
              fontSize: '16px',
            }}
          >
            100
          </Typography>
          <Box
            component="img"
            src="/icons/credit-icon.svg"
            alt="Credits"
            sx={{
              width: 20,
              height: 20,
              objectFit: 'contain',
            }}
          />
        </Box>

        <Tooltip title="Notifications">
          <IconButton
            sx={{
              color: '#FFF',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#FF5630',
                  color: '#FFF',
                },
              }}
            >
              <FontAwesomeIcon
                icon="bell"
                style={{ fontSize: '20px' }}
              />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Profil">
          <IconButton
            sx={{
              p: 0,
              '&:hover': {
                '& .MuiAvatar-root': {
                  boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.3)',
                },
              },
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.2s ease',
              }}
              src="/api/placeholder/40/40"
              alt="Profile"
            >
              <FontAwesomeIcon
                icon="user"
                style={{ fontSize: '18px' }}
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}