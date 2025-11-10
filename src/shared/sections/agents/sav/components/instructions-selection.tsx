'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, useTheme, IconButton, TextField, useMediaQuery } from '@mui/material';
import { Add as AddIcon, Lock as LockIcon } from '@mui/icons-material';
import { InstructionOption } from '@/shared/_mock/sav-subagents-config';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export interface InstructionsSelectionProps {
  options: InstructionOption[];
  onToggle: (id: string) => void;
  onAddSuggestion: (label: string) => void;
  onRestrict: (label: string) => void;
  onNext: () => void;
}

export const InstructionsSelection: React.FC<InstructionsSelectionProps> = ({
  options,
  onToggle,
  onAddSuggestion,
  onRestrict,
  onNext,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [showAddSuggestionInput, setShowAddSuggestionInput] = useState(false);
  const [showAddRestrictionInput, setShowAddRestrictionInput] = useState(false);
  const [newSuggestionLabel, setNewSuggestionLabel] = useState('');
  const [newRestrictionLabel, setNewRestrictionLabel] = useState('');
  const suggestionInputRef = useRef<HTMLDivElement>(null);
  const restrictionInputRef = useRef<HTMLDivElement>(null);

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
        Sélectionnez les fonctionnalités proposées pour définir les comportements souhaités
        (positifs) ou à éviter (négatifs) de votre agent.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: { xs: 1, sm: 2 },
          justifyContent: { xs: 'flex-start', sm: 'flex-end' },
          mb: 2,
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        <ConditionalComponent isValid={showAddSuggestionInput}>
          <Box
            ref={suggestionInputRef}
            sx={{
              flex: 1,
              maxWidth: '600px',
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

        <ConditionalComponent isValid={showAddRestrictionInput}>
          <Box
            ref={restrictionInputRef}
            sx={{
              flex: 1,
              maxWidth: '600px',
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
              border: '1.5px solid #8D31FB',
              background: 'transparent',
              color: '#8D31FB',
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '121.331%',
              textTransform: 'none',
              '&:hover': {
                background: 'rgba(141, 49, 251, 0.1)',
              },
            }}
          >
            Restreindre
          </Button>
        </ConditionalComponent>
      </Box>

      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            minHeight: '400px',
            background: '#1A1D25',
            borderRadius: '24px',
            border: '2px solid transparent',
            backgroundImage:
              'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
            padding: '16px',
            paddingTop: '24px',
            paddingBottom: '60px',
          }}
        >
          <Typography
            sx={{
              color: '#FFF',
              fontFeatureSettings: "'liga' off, 'clig' off",
              fontFamily: theme.typography.fontFamily,
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '30px',
              letterSpacing: '1px',
              mb: 3,
            }}
          >
            Choisissez parmi les suggestions proposées ou ajoutez vos propres instructions pour
            préciser ce qu&apos;il doit faire (prompts positifs) et ce qu&apos;il doit éviter (prompts
            négatifs).
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              marginBottom: 4,
            }}
          >
            {options.map((option) => (
              <Box
                key={option.id}
                sx={{
                  display: 'flex',
                  height: '42px',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '10px',
                  flexShrink: 0,
                  alignSelf: 'stretch',
                  background: option.active ? '#281745' : 'transparent',
                  borderRadius: '8px',
                  padding: '0 16px',
                  justifyContent: 'space-between',
                  margin: 0,
                }}
              >
                <Typography
                  sx={{
                    color: option.active ? '#8D31FB' : '#F7F0FF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '121.331%',
                    flex: 1,
                  }}
                >
                  {option.label}
                </Typography>
                <IconButton
                  onClick={() => onToggle(option.id)}
                  sx={{
                    padding: 0,
                    width: '24.88px',
                    height: option.active ? '16.667px' : '25px',
                    flexShrink: 0,
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                >
                  {option.active ? (
                    <Box
                      component="img"
                      src="/icons/toggle-active.svg"
                      alt="Toggle actif"
                      sx={{
                        width: '24.88px',
                        height: '16.667px',
                      }}
                    />
                  ) : (
                    <Box
                      component="img"
                      src="/icons/toggle-inactive.svg"
                      alt="Toggle inactif"
                      sx={{
                        width: '24.88px',
                        height: '25px',
                      }}
                    />
                  )}
                </IconButton>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              zIndex: 2,
            }}
          >
            <Button
              onClick={onNext}
              sx={{
                display: 'flex',
                width: '99px',
                height: '37px',
                padding: '14px 17px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '8px',
                flexShrink: 0,
                borderRadius: '22px',
                background: '#3C1C69',
                color: '#EDEDED',
                fontFamily: theme.typography.fontFamily,
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                textTransform: 'none',
                '&:hover': {
                  background: '#4C2086',
                },
              }}
            >
              Suivant
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

