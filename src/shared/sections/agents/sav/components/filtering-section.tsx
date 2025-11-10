import { Box, Typography, TextField, IconButton, Chip, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { Add, Close } from '@mui/icons-material';
import { useSavSubagentData } from '@/hooks/use-sav-subagent-data';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export interface FilteringSectionProps {
  subagentId?: string;
}

export const FilteringSection: React.FC<FilteringSectionProps> = ({ subagentId = 'sav-general' }) => {
  const { blockedKeywords: initialKeywords } = useSavSubagentData(subagentId);
  const theme = useTheme();

  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);

  useEffect(() => {
    setKeywords(initialKeywords);
  }, [initialKeywords, subagentId]);

  const handleAddKeyword = () => {
    if (keyword.trim() && !keywords.includes(keyword.trim())) {
      setKeywords([...keywords, keyword.trim()]);
      setKeyword('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter(k => k !== keywordToRemove));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleAddKeyword();
    }
  };

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
        Bouclier de filtrage de contenu
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
        Configurez votre agent pour ignorer certains mots-clés ou sujets.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '18px',
            fontWeight: 600,
            mb: 2,
          }}
        >
          Mots-clés bloqués
        </Typography>
        <Box sx={{ position: 'relative', width: '100%' }}>
          <TextField
            fullWidth
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ajouter un mot-clé à ignorer..."
            sx={{
              width: '100%',
              maxWidth: '100%',
              '& .MuiOutlinedInput-root': {
                color: '#FFF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '16px',
                background: '#1A1D25',
                borderRadius: '24px',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                paddingRight: '40px',
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
                  onClick={handleAddKeyword}
                  sx={{
                    color: '#BE30FF',
                    padding: '4px',
                    margin: 0,
                    marginRight: '-12px',
                    '&:hover': {
                      color: '#8D31FB',
                      backgroundColor: 'rgba(190, 48, 255, 0.1)',
                    },
                  }}
                >
                  <Add sx={{ fontSize: '20px' }} />
                </IconButton>
              ),
            }}
          />
        </Box>

        <ConditionalComponent isValid={keywords.length > 0}>
          <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {keywords.map((keyword, index) => (
              <Chip
                key={index}
                label={keyword}
                onDelete={() => handleRemoveKeyword(keyword)}
                deleteIcon={<Close sx={{ fontSize: '16px' }} />}
                sx={{
                  background: 'rgba(141, 49, 251, 0.2)',
                  color: '#FFF',
                  border: '1px solid rgba(141, 49, 251, 0.3)',
                  '& .MuiChip-deleteIcon': {
                    color: '#FFF',
                    '&:hover': {
                      color: '#FF6B6B',
                    },
                  },
                  '&:hover': {
                    background: 'rgba(141, 49, 251, 0.3)',
                  },
                }}
              />
            ))}
          </Box>
        </ConditionalComponent>
      </Box>
    </Box>
  );
};
