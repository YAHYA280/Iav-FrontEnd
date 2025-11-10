'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  IconButton,
  TextField,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import { Add as AddIcon, Lock as LockIcon, Search } from '@mui/icons-material';
import { InstructionOption } from '@/shared/_mock/sav-subagents-config';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export interface InstructionsListProps {
  options: InstructionOption[];
  onAddSuggestion: (label: string) => void;
  onRestrict: (label: string) => void;
}

export const InstructionsList: React.FC<InstructionsListProps> = ({
  options,
  onAddSuggestion,
  onRestrict,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [search, setSearch] = useState('');
  const [showFilterSelect, setShowFilterSelect] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showAddSuggestionInput, setShowAddSuggestionInput] = useState(false);
  const [showAddRestrictionInput, setShowAddRestrictionInput] = useState(false);
  const [newSuggestionLabel, setNewSuggestionLabel] = useState('');
  const [newRestrictionLabel, setNewRestrictionLabel] = useState('');
  const suggestionInputRef = useRef<HTMLDivElement>(null);
  const restrictionInputRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    return options.filter((opt) => opt.active);
  }, [options]);

  const restrictions = useMemo(() => {
    return options.filter((opt) => !opt.active);
  }, [options]);

  const filteredSuggestions = useMemo(() => {
    if (!search.trim()) return suggestions;
    const searchLower = search.toLowerCase();
    return suggestions.filter((opt) =>
      opt.label.toLowerCase().includes(searchLower)
    );
  }, [suggestions, search]);

  const filteredRestrictions = useMemo(() => {
    if (!search.trim()) return restrictions;
    const searchLower = search.toLowerCase();
    return restrictions.filter((opt) =>
      opt.label.toLowerCase().includes(searchLower)
    );
  }, [restrictions, search]);

  const handleAddSuggestionClick = () => {
    setShowAddSuggestionInput(true);
    setShowAddRestrictionInput(false);
  };

  const handleAddRestrictionClick = () => {
    setShowAddRestrictionInput(true);
    setShowAddSuggestionInput(false);
  };

  const handleSubmitSuggestion = () => {
    if (newSuggestionLabel.trim()) {
      onAddSuggestion(newSuggestionLabel.trim());
      setNewSuggestionLabel('');
      setShowAddSuggestionInput(false);
    }
  };

  const handleSubmitRestriction = () => {
    if (newRestrictionLabel.trim()) {
      onRestrict(newRestrictionLabel.trim());
      setNewRestrictionLabel('');
      setShowAddRestrictionInput(false);
    }
  };

  const handleCancelSuggestion = () => {
    setNewSuggestionLabel('');
    setShowAddSuggestionInput(false);
  };

  const handleCancelRestriction = () => {
    setNewRestrictionLabel('');
    setShowAddRestrictionInput(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showAddSuggestionInput &&
        suggestionInputRef.current &&
        !suggestionInputRef.current.contains(event.target as Node)
      ) {
        handleCancelSuggestion();
      }
      if (
        showAddRestrictionInput &&
        restrictionInputRef.current &&
        !restrictionInputRef.current.contains(event.target as Node)
      ) {
        handleCancelRestriction();
      }
    };

    if (showAddSuggestionInput || showAddRestrictionInput) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddSuggestionInput, showAddRestrictionInput]);

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
        Gestion des instructions
      </Typography>

      <Typography
        sx={{
          maxWidth: { xs: '100%', sm: '1038px' },
          color: '#9CA3AF',
          fontFamily: theme.typography.fontFamily,
          fontSize: { xs: '14px', sm: '16px' },
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: 'normal',
          mb: 4,
        }}
      >
        Liste des fonctionnalités permettant de définir les comportements souhaités         (positifs) ou à éviter (négatifs) de votre agent IA.
      </Typography>

      <Box sx={{
        display: 'flex',
        gap: { xs: 1, sm: 2 },
        mb: 4,
        alignItems: 'center',
        mt: 4,
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' },
      }}>
        <Box sx={{ width: { xs: '100%', sm: '360px' }, flex: { xs: '1 1 100%', sm: '0 0 auto' } }}>
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une instruction..."
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                background: '#1A1D25',
                borderRadius: '24px',
                border: '2px solid transparent',
                backgroundImage:
                  'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow:
                  '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                padding: '4px 4px',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: 'none' },
              },
              '& .MuiInputBase-input': {
                padding: '8px 14px',
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
                    '&:hover': { color: '#8D31FB', backgroundColor: 'rgba(190, 48, 255, 0.1)' },
                  }}
                >
                  <Search sx={{ fontSize: '20px' }} />
                </IconButton>
              ),
            }}
          />
        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          width: { xs: '100%', sm: 'auto' },
          justifyContent: { xs: 'flex-end', sm: 'flex-start' },
        }}>
          <ConditionalComponent isValid={!showFilterSelect}>
            <Tooltip title="Filtrer" arrow>
              <IconButton
                onClick={() => setShowFilterSelect(true)}
                sx={{
                  width: '41px',
                  height: '41px',
                  padding: 0,
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              >
                <Box
                  component="img"
                  src="/icons/filter-icon.svg"
                  alt="Filtrer"
                  sx={{ width: '25px', height: '25px' }}
                />
              </IconButton>
            </Tooltip>
          </ConditionalComponent>
          <ConditionalComponent isValid={showFilterSelect}>
            <FormControl sx={{ minWidth: { xs: '100%', sm: 180 }, width: { xs: '100%', sm: 'auto' }, position: 'relative' }}>
              <Box
                component="img"
                src="/icons/filter-icon.svg"
                alt="Filtrer"
                sx={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '25px',
                  height: '25px',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />
              <Select
                value={selectedFilter}
                onChange={(e) => {
                  setSelectedFilter(e.target.value);
                  if (e.target.value === 'all') {
                    setShowFilterSelect(false);
                  }
                }}
                sx={{
                  background: '#1A1D25',
                  borderRadius: '24px',
                  color: '#FFF',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '14px',
                  border: '2px solid transparent',
                  backgroundImage:
                    'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                  pl: 5,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiSelect-icon': {
                    color: '#FFF',
                  },
                }}
              >
                <MenuItem value="all">Tous</MenuItem>
                <MenuItem value="suggestions">Suggestions</MenuItem>
                <MenuItem value="restrictions">Restrictions</MenuItem>
              </Select>
            </FormControl>
          </ConditionalComponent>
        </Box>
      </Box>

      <Box
        sx={{
          maxHeight: 'calc(100vh - 350px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          pr: 1,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(141, 49, 251, 0.3)',
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(141, 49, 251, 0.5)',
            },
          },
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(141, 49, 251, 0.3) transparent',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ConditionalComponent isValid={(selectedFilter === 'all' || selectedFilter === 'suggestions') && filteredSuggestions.length > 0}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography
                  sx={{
                    color: '#8D31FB',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: { xs: '18px', sm: '20px' },
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '121.331%',
                  }}
                >
                  Suggestions
                </Typography>
                <ConditionalComponent isValid={!showAddSuggestionInput}>
                  <Button
                    onClick={handleAddSuggestionClick}
                    startIcon={
                      <Box
                        component="img"
                        src="/icons/add-icon.svg"
                        alt="Ajouter"
                        sx={{ width: '16px', height: '16px' }}
                      />
                    }
                    sx={{
                      display: 'inline-flex',
                      padding: '6px 10px',
                      alignItems: 'center',
                      gap: '8px',
                      borderRadius: '16px',
                      background: '#8D31FB',
                      color: '#1A1D25',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '121.331%',
                      textTransform: 'none',
                      '&:hover': {
                        background: '#7B28E2',
                      },
                    }}
                  >
                    Ajouter une suggestion
                  </Button>
                </ConditionalComponent>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ConditionalComponent isValid={showAddSuggestionInput}>
                  <Box
                    ref={suggestionInputRef}
                    sx={{
                      width: '100%',
                      borderRadius: '24px',
                      background: '#1A1D25',
                      border: '2px solid transparent',
                      backgroundImage:
                        'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box',
                      boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                      padding: '4px 4px 4px 20px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <TextField
                      fullWidth
                      value={newSuggestionLabel}
                      onChange={(e) => setNewSuggestionLabel(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmitSuggestion();
                        } else if (e.key === 'Escape') {
                          handleCancelSuggestion();
                        }
                      }}
                      placeholder="Entrez votre suggestion..."
                      autoFocus
                      sx={{
                        flex: 1,
                        '& .MuiOutlinedInput-root': {
                          color: '#FFF',
                          fontFamily: theme.typography.fontFamily,
                          fontSize: '14px',
                          background: 'transparent',
                          padding: 0,
                          '& fieldset': { border: 'none' },
                          '&:hover fieldset': { border: 'none' },
                          '&.Mui-focused fieldset': { border: 'none' },
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 0',
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: 'rgba(255, 255, 255, 0.5)',
                          opacity: 1,
                        },
                      }}
                    />
                    <Button
                      onClick={handleSubmitSuggestion}
                      disabled={!newSuggestionLabel.trim()}
                      startIcon={
                        <Box
                          component="img"
                          src="/icons/add-icon.svg"
                          alt="Ajouter"
                          sx={{ width: '16px', height: '16px' }}
                        />
                      }
                      sx={{
                        display: 'inline-flex',
                        padding: '8px 16px',
                        alignItems: 'center',
                        gap: '8px',
                        borderRadius: '20px',
                        background: '#8D31FB',
                        color: '#1A1D25',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '121.331%',
                        textTransform: 'none',
                        height: '100%',
                        minHeight: '36px',
                        '&:hover': {
                          background: '#7B28E2',
                        },
                        '&:disabled': {
                          background: '#4C2086',
                          color: '#9CA3AF',
                        },
                      }}
                    >
                      Ajouter
                    </Button>
                  </Box>
                </ConditionalComponent>
                {filteredSuggestions.map((option) => (
                  <Box
                    key={option.id}
                    sx={{
                      width: '100%',
                      borderRadius: '24px',
                      background: '#4C2086',
                      padding: { xs: '12px 16px', sm: '16px 20px' },
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: { xs: 1, sm: 2 },
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#EDEDED',
                        fontFamily: theme.typography.fontTertiaryFamily,
                        fontSize: { xs: '14px', sm: '16px' },
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: '121.331%',
                        flex: 1,
                      }}
                    >
                      {option.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </ConditionalComponent>

          <ConditionalComponent isValid={(selectedFilter === 'all' || selectedFilter === 'restrictions') && filteredRestrictions.length > 0}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography
                  sx={{
                    color: '#8D31FB',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: { xs: '18px', sm: '20px' },
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '121.331%',
                  }}
                >
                  Restrictions
                </Typography>
                <ConditionalComponent isValid={!showAddRestrictionInput}>
                  <Button
                    onClick={handleAddRestrictionClick}
                    startIcon={
                      <Box
                        component="img"
                        src="/icons/restrict-icon-dark.svg"
                        alt="Restreindre"
                        sx={{ width: '16px', height: '16px' }}
                      />
                    }
                    sx={{
                      display: 'inline-flex',
                      padding: '6px 10px',
                      alignItems: 'center',
                      gap: '8px',
                      borderRadius: '16px',
                      background: '#8D31FB',
                      color: '#1A1D25',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '121.331%',
                      textTransform: 'none',
                      '&:hover': {
                        background: '#7B28E2',
                      },
                    }}
                  >
                    Restreindre
                  </Button>
                </ConditionalComponent>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ConditionalComponent isValid={showAddRestrictionInput}>
                  <Box
                    ref={restrictionInputRef}
                    sx={{
                      width: '100%',
                      borderRadius: '24px',
                      background: '#1A1D25',
                      border: '2px solid transparent',
                      backgroundImage:
                        'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box',
                      boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                      padding: '4px 4px 4px 20px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <TextField
                      fullWidth
                      value={newRestrictionLabel}
                      onChange={(e) => setNewRestrictionLabel(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmitRestriction();
                        } else if (e.key === 'Escape') {
                          handleCancelRestriction();
                        }
                      }}
                      placeholder="Entrez votre restriction..."
                      autoFocus
                      sx={{
                        flex: 1,
                        '& .MuiOutlinedInput-root': {
                          color: '#FFF',
                          fontFamily: theme.typography.fontFamily,
                          fontSize: '14px',
                          background: 'transparent',
                          padding: 0,
                          '& fieldset': { border: 'none' },
                          '&:hover fieldset': { border: 'none' },
                          '&.Mui-focused fieldset': { border: 'none' },
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 0',
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: 'rgba(255, 255, 255, 0.5)',
                          opacity: 1,
                        },
                      }}
                    />
                    <Button
                      onClick={handleSubmitRestriction}
                      disabled={!newRestrictionLabel.trim()}
                      startIcon={
                        <Box
                          component="img"
                          src="/icons/restrict-icon-dark.svg"
                          alt="Restreindre"
                          sx={{ width: '16px', height: '16px' }}
                        />
                      }
                      sx={{
                        display: 'inline-flex',
                        padding: '8px 16px',
                        alignItems: 'center',
                        gap: '8px',
                        borderRadius: '20px',
                        background: '#8D31FB',
                        color: '#1A1D25',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '121.331%',
                        textTransform: 'none',
                        height: '100%',
                        minHeight: '36px',
                        '&:hover': {
                          background: '#7B28E2',
                        },
                        '&:disabled': {
                          background: '#4C2086',
                          color: '#9CA3AF',
                        },
                      }}
                    >
                      Restreindre
                    </Button>
                  </Box>
                </ConditionalComponent>
                {filteredRestrictions.map((option) => (
                  <Box
                    key={option.id}
                    sx={{
                      width: '100%',
                      borderRadius: '24px',
                      background: '#4C2086',
                      padding: { xs: '12px 16px', sm: '16px 20px' },
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: { xs: 1, sm: 2 },
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#EDEDED',
                        fontFamily: theme.typography.fontTertiaryFamily,
                        fontSize: { xs: '14px', sm: '16px' },
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: '121.331%',
                        flex: 1,
                      }}
                    >
                      {option.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </ConditionalComponent>
        </Box>
      </Box>
    </Box>
  );
};

