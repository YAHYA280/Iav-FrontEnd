import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Card } from '@/shared/components/ui/card';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { commonData } from '@/shared/_mock/sav-subagents-config';
import { TicketPagination } from './ticket-pagination';
import { useState, useMemo, useEffect } from 'react';

interface Ticket {
  id: string;
  title: string;
  status: 'en-attente' | 'en-cours' | 'resolu';
  priority: 'basse' | 'moyenne' | 'haute' | 'critique';
  channel: 'whatsapp' | 'instagram' | 'linkedin' | 'telegram' | 'discord' | 'email' | 'telephone' | 'messenger';
  client: string;
  assignedTo?: string;
  date: string;
  description: string;
  timeAgo?: string;
}

interface TicketCardsProps {
  tickets: Ticket[];
  onTicketClick?: (ticket: Ticket) => void;
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'en-attente':
      return {
        backgroundColor: 'rgba(239, 68, 68, 0.20)',
        color: '#EF4444',
      };
    case 'en-cours':
      return {
        backgroundColor: '#3C1C69',
        color: '#8D31FB',
      };
    case 'resolu':
      return {
        backgroundColor: 'rgba(16, 185, 129, 0.20)',
        color: '#10B981',
      };
    default:
      return {
        backgroundColor: '#3C1C69',
        color: '#EDEDED',
      };
  }
};

const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case 'basse':
      return {
        width: '73px',
        backgroundColor: 'rgba(156, 163, 175, 0.20)',
        color: '#9CA3AF',
      };
    case 'moyenne':
      return {
        width: '86px',
        backgroundColor: 'rgba(255, 250, 0, 0.20)',
        color: '#FAAD4F',
      };
    case 'haute':
      return {
        width: '73px',
        backgroundColor: 'rgba(239, 68, 68, 0.20)',
        color: '#EF4444',
      };
    case 'critique':
      return {
        width: '73px',
        backgroundColor: 'rgba(239, 68, 68, 0.20)',
        color: '#EF4444',
      };
    default:
      return {
        width: '73px',
        backgroundColor: 'rgba(156, 163, 175, 0.20)',
        color: '#9CA3AF',
      };
  }
};

const getChannelInfo = (channel: string) => {
  const platformInfo = commonData.platforms[channel as keyof typeof commonData.platforms];

  if (platformInfo) {
    return {
      name: platformInfo.name,
      logoSrc: platformInfo.logoSrc,
    };
  }

  return {
    name: channel,
    logoSrc: '/icons/question.svg',
  };
};

export const TicketCards: React.FC<TicketCardsProps> = ({ tickets, onTicketClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const ticketsPerPage = useMemo(() => {
    if (isMobile) return 4;
    if (isTablet) return 4;
    return 6;
  }, [isMobile, isTablet]);

  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * ticketsPerPage;
    const endIndex = startIndex + ticketsPerPage;
    return tickets.slice(startIndex, endIndex);
  }, [tickets, currentPage, ticketsPerPage]);

  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [tickets]);

  if (tickets.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6,
          color: 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <FontAwesomeIcon icon="inbox" style={{ fontSize: '48px', marginBottom: '16px' }} />
        <Typography variant="h6" sx={{ fontFamily: theme.typography.fontFamily, fontWeight: 500 }}>
          Aucun ticket trouvé
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: theme.typography.fontFamily, mt: 1 }}>
          Aucun ticket ne correspond aux critères sélectionnés
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)'
        },
        gap: { xs: 2, sm: 3 }
      }}>
        {paginatedTickets.map((ticket) => {
          const statusStyles = getStatusStyles(ticket.status);
          const priorityStyles = getPriorityStyles(ticket.priority);

          return (
            <Card
              key={ticket.id}
              variant="default"
              onClick={() => onTicketClick?.(ticket)}
              sx={{
                background: '#4C2086',
                border: '1px solid rgba(141, 49, 251, 0.3)',
                borderRadius: '12px',
                p: { xs: 2, sm: 3 },
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: 'rgba(141, 49, 251, 0.5)',
                  boxShadow: '0 4px 20px rgba(141, 49, 251, 0.1)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography
                  sx={{
                    color: '#9CA3AF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: { xs: '14px', sm: '16px' },
                    fontWeight: 500,
                    lineHeight: '121.331%',
                  }}
                >
                  {ticket.id}
                </Typography>
                <Box
                  sx={{
                    width: { xs: '70px', sm: '80px' },
                    height: { xs: '22px', sm: '25px' },
                    borderRadius: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...statusStyles,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: theme.typography.fontFamily,
                      fontSize: { xs: '10px', sm: '12px' },
                      fontWeight: 500,
                      textTransform: 'capitalize',
                    }}
                  >
                    {ticket.status.replace('-', ' ')}
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  color: '#EDEDED',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontSize: { xs: '16px', sm: '18px' },
                  fontWeight: 700,
                  lineHeight: '121.331%',
                  fontStyle: 'normal',
                  mb: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {ticket.title}
              </Typography>

              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: { xs: 1, sm: 0 },
                mb: 2
              }}>
                <Box>
                  <Typography
                    sx={{
                      color: '#9CA3AF',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: { xs: '14px', sm: '16px' },
                      fontWeight: 500,
                      lineHeight: '121.331%',
                      mb: 0.5,
                    }}
                  >
                    {ticket.client}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#9CA3AF',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: { xs: '14px', sm: '16px' },
                      fontWeight: 500,
                      lineHeight: '121.331%',
                    }}
                  >
                    Assigné à:{' '}
                    <Box
                      component="span"
                      sx={{
                        color: '#EDEDED',
                        fontSize: { xs: '14px', sm: '16px' },
                        fontWeight: 700,
                      }}
                    >
                      {ticket.assignedTo || 'Non assigné'}
                    </Box>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: { xs: '22px', sm: '25px' },
                    borderRadius: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...priorityStyles,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: theme.typography.fontFamily,
                      fontSize: { xs: '11px', sm: '13px' },
                      fontWeight: 500,
                      lineHeight: '12.66px',
                      letterSpacing: '-0.211px',
                      textTransform: 'capitalize',
                      textAlign: 'center',
                    }}
                  >
                    {ticket.priority}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: { xs: 1, sm: 0 }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="img"
                    src={getChannelInfo(ticket.channel).logoSrc}
                    alt={getChannelInfo(ticket.channel).name}
                    sx={{
                      width: { xs: '18px', sm: '20px' },
                      height: { xs: '18px', sm: '20px' },
                      objectFit: 'contain',
                    }}
                  />
                  <Typography
                    sx={{
                      color: '#9CA3AF',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: { xs: '14px', sm: '16px' },
                      fontWeight: 700,
                      lineHeight: '121.331%',
                    }}
                  >
                    {getChannelInfo(ticket.channel).name}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: '#9CA3AF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: { xs: '14px', sm: '16px' },
                    fontWeight: 500,
                    lineHeight: '121.331%',
                  }}
                >
                  {ticket.timeAgo}
                </Typography>
              </Box>
            </Card>
          );
        })}
      </Box>
      <TicketPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};