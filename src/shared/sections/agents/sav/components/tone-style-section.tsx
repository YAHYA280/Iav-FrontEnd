import { Box, Typography, Select, MenuItem, FormControl, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSavSubagentData } from '@/hooks/use-sav-subagent-data';

export interface ToneStyleSectionProps {
  subagentId?: string;
}

export const ToneStyleSection: React.FC<ToneStyleSectionProps> = ({ subagentId = 'sav-general' }) => {
  const { tone, style, toneOptions, styleOptions } = useSavSubagentData(subagentId);
  const theme = useTheme();

  const [selectedTone, setSelectedTone] = useState(tone);
  const [selectedStyle, setSelectedStyle] = useState(style);

  useEffect(() => {
    setSelectedTone(tone);
    setSelectedStyle(style);
  }, [tone, style, subagentId]);

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          color: '#FFF',
          fontFamily: theme.typography.fontFamily,
          fontSize: '24px',
          fontWeight: 600,
          mb: 1,
        }}
      >
        Définir le ton et le style
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: '1038px',
          color: '#9CA3AF',
          fontFamily: theme.typography.fontFamily,
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '121.331%',
          mb: 4,
        }}
      >
        Configurez la manière dont votre agent communique et répond aux clients.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 3 }}>
        <Box>
          <Typography
            sx={{
              color: '#FFF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '18px',
              fontWeight: 600,
              mb: 2,
            }}
          >
            Ton de voix
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
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
              sx={{
                background: '#4C2086',
                borderRadius: '12px',
                color: '#FFF',
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
                  color: '#FFF',
                },
              }}
            >
              {toneOptions.map((toneOption) => (
                <MenuItem key={toneOption} value={toneOption}>
                  {toneOption.charAt(0).toUpperCase() + toneOption.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography
            sx={{
              color: '#FFF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '18px',
              fontWeight: 600,
              mb: 2,
            }}
          >
            Style de réponse
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
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
              sx={{
                background: '#4C2086',
                borderRadius: '12px',
                color: '#FFF',
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
                  color: '#FFF',
                },
              }}
            >
              {styleOptions.map((styleOption) => (
                <MenuItem key={styleOption} value={styleOption}>
                  {styleOption === 'concise' ? 'Concise et direct' :
                    styleOption === 'détaillée' ? 'Détaillée' :
                      styleOption === 'explicative' ? 'Explicative' :
                        styleOption === 'technique' ? 'Technique' :
                          styleOption === 'simple' ? 'Simple et claire' :
                            styleOption === 'solution-oriented' ? 'Orienté solution' :
                              styleOption.charAt(0).toUpperCase() + styleOption.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
