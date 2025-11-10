import { Box, IconButton, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { TicketTabs } from './ticket-tabs';
import { WorkingHoursConfig } from './working-hours-config';
import { TicketDetail } from './ticket-detail';
import ConditionalComponent from '@/shared/components/conditionalComponent';

interface TicketSectionProps {
  subagentId?: string;
}

export function TicketSection({ subagentId = 'sav-general' }: TicketSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [channelFilter, setChannelFilter] = useState('');
  const [showWorkingHoursConfig, setShowWorkingHoursConfig] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFilterChange = (filters: { priority: string; channel: string }) => {
    setPriorityFilter(filters.priority);
    setChannelFilter(filters.channel);
  };

  const handleConfigClick = () => {
    setShowWorkingHoursConfig(true);
  };

  const handleBackToTickets = () => {
    setShowWorkingHoursConfig(false);
  };

  const handleTicketClick = (ticket: any) => {
    setSelectedTicket(ticket);
  };

  const handleBackToTicketList = () => {
    setSelectedTicket(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#3C1C69',
        borderRadius: '24px',
        border: 'none',
        p: 3,
        mt: 6,
      }}
    >
      <ConditionalComponent isValid={!showWorkingHoursConfig && !selectedTicket}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: 2, sm: 0 },
          mb: 2
        }}>
          <Typography
            sx={{
              color: '#FFF',
              fontFamily: theme.typography.fontFamily,
              fontSize: { xs: '18px', sm: '20px' },
              fontWeight: 600,
            }}
          >
            Gestion des tickets
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            width: { xs: '100%', sm: '400px' }
          }}>
            <Tooltip title="Configuration">
              <IconButton
                onClick={handleConfigClick}
                sx={{
                  color: '#BE30FF',
                  padding: '4px',
                  '&:hover': {
                    color: '#8D31FB',
                    backgroundColor: 'rgba(190, 48, 255, 0.1)',
                  },
                }}
              >
                <FontAwesomeIcon icon="cog" style={{ fontSize: '24px' }} />
              </IconButton>
            </Tooltip>
            <TextField
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#FFF',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '14px',
                  background: '#1A1D25',
                  borderRadius: '24px',
                  border: '2px solid transparent',
                  backgroundImage: 'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 1,
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{
                      color: '#BE30FF',
                      padding: '4px',
                      '&:hover': {
                        color: '#8D31FB',
                        backgroundColor: 'rgba(190, 48, 255, 0.1)',
                      },
                    }}
                  >
                    <Search sx={{ fontSize: '20px' }} />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>
      </ConditionalComponent>

      <ConditionalComponent isValid={showWorkingHoursConfig}>
        <WorkingHoursConfig onBack={handleBackToTickets} subagentId={subagentId} />
      </ConditionalComponent>

      <ConditionalComponent isValid={!showWorkingHoursConfig && !!selectedTicket}>
        <TicketDetail ticket={selectedTicket} onBack={handleBackToTicketList} />
      </ConditionalComponent>

      <ConditionalComponent isValid={!showWorkingHoursConfig && !selectedTicket}>
        <TicketTabs
          subagentId={subagentId}
          searchQuery={searchTerm}
          priorityFilter={priorityFilter}
          channelFilter={channelFilter}
          onFilterChange={handleFilterChange}
          onTicketClick={handleTicketClick}
        />
      </ConditionalComponent>
    </Box>
  );
}