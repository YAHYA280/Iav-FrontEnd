import { Box, Typography, Switch, Chip, Card, CardProps, Button } from '@mui/material';
import { forwardRef, useState } from 'react';

export interface IntegrationCardProps extends Omit<CardProps, 'children'> {
  platformName: string;
  logoSrc: string;
  isConnected: boolean;
  onToggleChange?: (platformName: string, isConnected: boolean) => void;
  onConnect?: (platformName: string) => void;
  showLinkIcon?: boolean;
}

export const IntegrationCard = forwardRef<HTMLDivElement, IntegrationCardProps>(
  ({
    platformName,
    logoSrc,
    isConnected,
    onToggleChange,
    onConnect,
    showLinkIcon = false,
    sx,
    ...other
  }, ref) => {
    const [connected, setConnected] = useState(isConnected);

    const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newStatus = event.target.checked;
      setConnected(newStatus);
      onToggleChange?.(platformName, newStatus);
    };

    const handleConnect = () => {
      onConnect?.(platformName);
    };

    const getStatusStyles = (connected: boolean) => {
      return connected
        ? {
          color: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.20)',
        }
        : {
          color: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.20)',
        };
    };

    const getStatusLabel = (connected: boolean) => {
      return connected ? 'Connecté' : 'Déconnecté';
    };

    return (
      <Card
        ref={ref}
        sx={{
          width: '100%',
          height: '180px',
          p: 2,
          backgroundColor: 'rgba(141, 49, 251, 0.20)',
          borderRadius: '24px',
          border: 'none',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          ...sx,
        }}
        {...other}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Chip
            label={getStatusLabel(connected)}
            size="small"
            sx={{
              ...getStatusStyles(connected),
              fontSize: '9.556px',
              fontWeight: 600,
              lineHeight: '14.333px',
              fontFamily: 'Inter',
              height: 'auto',
              padding: '2.389px 6.37px',
              borderRadius: '79.63px',
              '& .MuiChip-label': {
                padding: 0,
              },
            }}
          />

          {showLinkIcon ? (
            <Box
              sx={{
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8D31FB',
              }}
            >
              🔗
            </Box>
          ) : (
            <Switch
              checked={connected}
              onChange={handleToggleChange}
              size="small"
              sx={{
                width: '30px',
                height: '20px',
                padding: 0,
                '& .MuiSwitch-switchBase': {
                  padding: '2px',
                  '&.Mui-checked': {
                    transform: 'translateX(10px)',
                    '& + .MuiSwitch-track': {
                      backgroundColor: '#9FE3CD',
                      opacity: 1,
                    },
                  },
                },
                '& .MuiSwitch-thumb': {
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#FFF',
                },
                '& .MuiSwitch-track': {
                  borderRadius: '10px',
                  backgroundColor: '#F9B4B4',
                  opacity: 1,
                },
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <Box
            component="img"
            src={logoSrc}
            alt={`${platformName} logo`}
            sx={{
              width: 36,
              height: 36,
              objectFit: 'contain',
            }}
          />
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#FFF',
              fontWeight: 600,
              fontSize: '18px',
              fontFamily: 'Inter',
              textAlign: 'left',
              flex: 1,
            }}
          >
            {platformName}
          </Typography>

          <Button
            onClick={handleConnect}
            sx={{
              width: '88px',
              height: '27px',
              borderRadius: '19px',
              backgroundColor: '#3C1C69',
              color: '#8D31FB',
              fontFamily: 'Inter',
              fontSize: '13px',
              fontWeight: 600,
              lineHeight: 'normal',
              textTransform: 'none',
              padding: 0,
              minWidth: 'auto',
              ml: 2,
              '&:hover': {
                backgroundColor: '#4C2086',
                color: '#9D4EDD',
              },
              '&:active': {
                backgroundColor: '#2A0F4A',
              },
            }}
          >
            Connecter
          </Button>
        </Box>
      </Card>
    );
  }
);

IntegrationCard.displayName = 'IntegrationCard';
