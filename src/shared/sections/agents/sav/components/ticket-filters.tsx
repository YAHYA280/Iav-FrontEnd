import { Box, Typography, FormControl, Select, MenuItem, useMediaQuery, useTheme, SelectChangeEvent } from '@mui/material';
import { useState, useEffect } from 'react';

interface FilterOption {
  value: string;
  label: string;
  logoSrc?: string;
}

interface TicketFiltersProps {
  priorityOptions: FilterOption[];
  channelOptions: FilterOption[];
  priorityFilter?: string;
  channelFilter?: string;
  onFilterChange: (filters: { priority: string; channel: string }) => void;
}

export const TicketFilters: React.FC<TicketFiltersProps> = ({
  priorityOptions,
  channelOptions,
  priorityFilter = '',
  channelFilter = '',
  onFilterChange,
}) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [localPriorityFilter, setLocalPriorityFilter] = useState(priorityFilter);
  const [localChannelFilter, setLocalChannelFilter] = useState(channelFilter);

  useEffect(() => {
    setLocalPriorityFilter(priorityFilter);
  }, [priorityFilter]);

  useEffect(() => {
    setLocalChannelFilter(channelFilter);
  }, [channelFilter]);

  const handlePriorityChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setLocalPriorityFilter(value);
    onFilterChange({ priority: value, channel: localChannelFilter });
  };

  const handleChannelChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setLocalChannelFilter(value);
    onFilterChange({ priority: localPriorityFilter, channel: value });
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: { xs: 2, sm: 3 },
      mb: 3,
      alignItems: { xs: 'stretch', sm: 'center' },
      width: '100%'
    }}>
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            color: '#EDEDED',
            fontFamily: theme.typography.fontTertiaryFamily,
            fontSize: { xs: '14px', sm: '16px' },
            fontWeight: 500,
            lineHeight: '121.331%',
            mb: 1,
          }}
        >
          Filtre de priorité
        </Typography>
        <FormControl fullWidth>
          <Select
            value={localPriorityFilter}
            onChange={handlePriorityChange}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: '#EDEDED' }}>Sélectionner une priorité</span>;
              }
              const option = priorityOptions.find(opt => opt.value === selected);
              return <span style={{ color: '#EDEDED' }}>{option?.label || selected}</span>;
            }}
            sx={{
              background: '#4C2086',
              borderRadius: '12px',
              color: '#EDEDED',
              minHeight: { xs: '48px', sm: '52px' },
              height: { xs: '48px', sm: '52px' },
              fontFamily: theme.typography.fontFamily,
              fontSize: { xs: '14px', sm: '16px' },
              fontWeight: 500,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(141, 49, 251, 0.3)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(141, 49, 251, 0.5)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#8D31FB',
              },
              '& .MuiSelect-icon': {
                color: '#EDEDED',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  background: '#1A1D25',
                  borderRadius: '12px',
                  border: '1px solid rgba(141, 49, 251, 0.3)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  '& .MuiMenuItem-root': {
                    color: '#FFF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '14px',
                    '&:hover': {
                      background: 'rgba(141, 49, 251, 0.1)',
                    },
                    '&.Mui-selected': {
                      background: 'rgba(141, 49, 251, 0.2)',
                      '&:hover': {
                        background: 'rgba(141, 49, 251, 0.3)',
                      },
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="">
              <span>Sélectionner une priorité</span>
            </MenuItem>
            {priorityOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            color: '#EDEDED',
            fontFamily: theme.typography.fontTertiaryFamily,
            fontSize: { xs: '14px', sm: '16px' },
            fontWeight: 500,
            lineHeight: '121.331%',
            mb: 1,
          }}
        >
          Filtre de canal
        </Typography>
        <FormControl fullWidth>
          <Select
            value={localChannelFilter}
            onChange={handleChannelChange}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: '#EDEDED' }}>Sélectionner un canal</span>;
              }
              const option = channelOptions.find(opt => opt.value === selected);
              return <span style={{ color: '#EDEDED' }}>{option?.label || selected}</span>;
            }}
            sx={{
              background: '#4C2086',
              borderRadius: '12px',
              color: '#EDEDED',
              minHeight: { xs: '48px', sm: '52px' },
              height: { xs: '48px', sm: '52px' },
              fontFamily: theme.typography.fontFamily,
              fontSize: { xs: '14px', sm: '16px' },
              fontWeight: 500,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(141, 49, 251, 0.3)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(141, 49, 251, 0.5)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#8D31FB',
              },
              '& .MuiSelect-icon': {
                color: '#EDEDED',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  background: '#1A1D25',
                  borderRadius: '12px',
                  border: '1px solid rgba(141, 49, 251, 0.3)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  '& .MuiMenuItem-root': {
                    color: '#FFF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '14px',
                    '&:hover': {
                      background: 'rgba(141, 49, 251, 0.1)',
                    },
                    '&.Mui-selected': {
                      background: 'rgba(141, 49, 251, 0.2)',
                      '&:hover': {
                        background: 'rgba(141, 49, 251, 0.3)',
                      },
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="">
              <span>Sélectionner un canal</span>
            </MenuItem>
            {channelOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};