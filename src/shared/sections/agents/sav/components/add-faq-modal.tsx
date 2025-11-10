'use client';

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { CategorySelect } from './category-select';
import { FaqTipsSection } from './faq-tips-section';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface AddFaqModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (category: string, question: string, answer: string) => void;
  onEdit?: (id: string, category: string, question: string, answer: string) => void;
  categories: string[];
  faqToEdit?: FAQ | null;
  containerId?: string;
}

export const AddFaqModal: React.FC<AddFaqModalProps> = ({
  open,
  onClose,
  onAdd,
  onEdit,
  categories: initialCategories,
  faqToEdit = null,
  containerId,
}) => {
  const [category, setCategory] = React.useState<string>('');
  const [question, setQuestion] = React.useState<string>('');
  const [answer, setAnswer] = React.useState<string>('');
  const [categories, setCategories] = React.useState<string[]>(initialCategories);
  const theme = useTheme();

  const isEditMode = !!faqToEdit;

  React.useEffect(() => {
    if (faqToEdit) {
      setCategory(faqToEdit.category);
      setQuestion(faqToEdit.question);
      setAnswer(faqToEdit.answer);
    } else {
      setCategory('');
      setQuestion('');
      setAnswer('');
    }
  }, [faqToEdit]);

  React.useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const handleAdd = () => {
    if (isEditMode && faqToEdit && onEdit) {
      onEdit(faqToEdit.id, category, question, answer);
    } else {
      onAdd(category, question, answer);
    }
    handleReset();
  };

  const handleReset = () => {
    if (!isEditMode) {
      setCategory('');
      setQuestion('');
      setAnswer('');
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };


  const containerEl = typeof window !== 'undefined' && containerId ? document.getElementById(containerId) : undefined;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      container={containerEl}
      sx={{ '& .MuiDialog-container': { display: 'flex', alignItems: 'center', justifyContent: 'center' } }}
      PaperProps={{
        sx: {
          borderRadius: '24px',
          background: '#3C1C69',
          maxWidth: '900px',
          width: '100%',
          mx: 0,
        },
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box sx={{ p: 4, pb: 2 }}>
          <Typography
            sx={{
              color: '#EDEDED',
              fontFamily: theme.typography.fontTertiaryFamily,
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '121.331%',
              mb: 1,
            }}
          >
            {isEditMode ? 'Modifier une FAQ' : 'Ajouter une FAQ'}
          </Typography>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '121.331%',
            }}
          >
            {isEditMode
              ? 'Modifiez la question et la réponse de votre FAQ'
              : 'Créez une nouvelle question et réponse pour votre FAQ'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 4, pt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
          <CategorySelect
            category={category}
            categories={categories}
            onCategoryChange={setCategory}
            onCategoriesChange={setCategories}
          />

          <Box>
            <Typography
              sx={{
                color: '#EDEDED',
                fontFamily: theme.typography.fontTertiaryFamily,
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '121.331%',
                mb: 1,
              }}
            >
              Question
            </Typography>
            <TextField
              fullWidth
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex: Comment puis-je retourner un produit ?"
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
                  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 1,
                },
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                color: '#EDEDED',
                fontFamily: theme.typography.fontTertiaryFamily,
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '121.331%',
                mb: 1,
              }}
            >
              Réponse
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Ex: Vous pouvez retourner un produit dans les 30 jours suivant votre achat..."
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
                  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 1,
                },
              }}
            />
          </Box>

          <FaqTipsSection />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 4, pt: 2, flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={!question.trim() || !answer.trim()}
          sx={{
            display: 'flex',
            width: '844px',
            maxWidth: '100%',
            padding: '14px 20px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '16px',
            background: '#8D31FB',
            boxShadow: '0 20px 35px 0 rgba(93, 49, 248, 0.20)',
            textTransform: 'none',
            color: '#3C1C69',
            fontFamily: theme.typography.fontFamily,
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            '&:hover': {
              background: '#7B28E2',
            },
            '&.Mui-disabled': {
              background: 'rgba(141, 49, 251, 0.3)',
              color: '#8D31FB',
              border: '1px solid rgba(93, 49, 248, 0.3)',
            },
          }}
        >
          {isEditMode ? 'Modifier la FAQ' : 'Ajouter la FAQ'}
        </Button>

        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            display: 'flex',
            width: '844px',
            maxWidth: '100%',
            padding: '14px 20px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '16px',
            border: '1px solid #8D31FB',
            boxShadow: '0 20px 35px 0 rgba(190, 48, 255, 0.20)',
            textTransform: 'none',
            color: '#8D31FB',
            background: 'transparent',
            fontFamily: theme.typography.fontFamily,
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            '&:hover': {
              border: '1px solid #8D31FB',
              background: 'rgba(141, 49, 251, 0.1)',
            },
          }}
        >
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};
