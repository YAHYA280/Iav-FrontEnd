'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { FAQ } from './add-faq-modal';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export interface DeleteFaqDialogProps {
  open: boolean;
  faq: FAQ | null;
  onClose: () => void;
  onConfirm: () => void;
  containerId?: string;
}

export const DeleteFaqDialog: React.FC<DeleteFaqDialogProps> = ({
  open,
  faq,
  onClose,
  onConfirm,
  containerId,
}) => {
  const theme = useTheme();
  const containerEl = typeof window !== 'undefined' && containerId ? document.getElementById(containerId) : undefined;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      container={containerEl}
      sx={{ '& .MuiDialog-container': { display: 'flex', alignItems: 'center', justifyContent: 'center' } }}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          background: '#3C1C69',
          minWidth: '400px',
          mx: 0,
        },
      }}
    >
      <DialogTitle sx={{ color: '#EDEDED', fontFamily: theme.typography.fontFamily }}>
        Confirmer la suppression
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: '#9CA3AF', fontFamily: theme.typography.fontFamily }}>
          Êtes-vous sûr de vouloir supprimer cette FAQ ?
        </Typography>
        <ConditionalComponent isValid={!!faq}>
          <Box sx={{ mt: 2, p: 2, borderRadius: '12px', background: '#4C2086' }}>
            <Typography
              sx={{
                color: '#EDEDED',
                fontFamily: theme.typography.fontTertiaryFamily,
                fontSize: '16px',
                fontWeight: 700,
                mb: 1,
              }}
            >
              {faq?.question}
            </Typography>
            <Typography
              sx={{
                color: '#9CA3AF',
                fontFamily: theme.typography.fontTertiaryFamily,
                fontSize: '14px',
              }}
            >
              {faq?.answer}
            </Typography>
          </Box>
        </ConditionalComponent>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            color: '#8D31FB',
            fontFamily: theme.typography.fontFamily,
            textTransform: 'none',
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            background: '#8D31FB',
            color: '#3C1C69',
            fontFamily: theme.typography.fontFamily,
            textTransform: 'none',
            '&:hover': {
              background: '#7B28E2',
            },
          }}
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

