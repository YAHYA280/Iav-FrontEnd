'use client';

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon, Check as CheckIcon, Add as AddIcon } from '@mui/icons-material';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export interface CategorySelectProps {
  category: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  onCategoriesChange: (categories: string[]) => void;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  category,
  categories,
  onCategoryChange,
  onCategoriesChange,
}) => {
  const [isAddingCategory, setIsAddingCategory] = React.useState(false);
  const [isEditingCategory, setIsEditingCategory] = React.useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = React.useState<string>('');
  const [editingCategoryName, setEditingCategoryName] = React.useState<string>('');
  const [deleteConfirmCategory, setDeleteConfirmCategory] = React.useState<string | null>(null);
  const theme = useTheme();

  const handleStartAddingCategory = () => {
    setIsAddingCategory(true);
    setNewCategoryName('');
    onCategoryChange('');
  };

  const handleCancelAddingCategory = () => {
    setIsAddingCategory(false);
    setNewCategoryName('');
  };

  const handleSaveNewCategory = () => {
    if (newCategoryName.trim()) {
      const trimmedName = newCategoryName.trim();
      if (!categories.includes(trimmedName)) {
        onCategoriesChange([...categories, trimmedName]);
        onCategoryChange(trimmedName);
      }
    }
    setIsAddingCategory(false);
    setNewCategoryName('');
  };

  const handleStartEditingCategory = (catName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingCategory(catName);
    setEditingCategoryName(catName);
  };

  const handleCancelEditingCategory = () => {
    setIsEditingCategory(null);
    setEditingCategoryName('');
  };

  const handleSaveEditedCategory = () => {
    if (editingCategoryName.trim() && isEditingCategory) {
      const trimmedName = editingCategoryName.trim();
      const oldName = isEditingCategory;
      if (trimmedName !== oldName && !categories.includes(trimmedName)) {
        const updatedCategories = categories.map(cat =>
          cat === oldName ? trimmedName : cat
        );
        onCategoriesChange(updatedCategories);
        if (category === oldName) {
          onCategoryChange(trimmedName);
        }
      }
    }
    setIsEditingCategory(null);
    setEditingCategoryName('');
  };

  const handleDeleteCategory = (catName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmCategory(catName);
  };

  const handleConfirmDeleteCategory = () => {
    if (deleteConfirmCategory) {
      const updatedCategories = categories.filter(cat => cat !== deleteConfirmCategory);
      onCategoriesChange(updatedCategories);
      if (category === deleteConfirmCategory) {
        onCategoryChange('');
      }
      setDeleteConfirmCategory(null);
    }
  };

  const handleCancelDeleteCategory = () => {
    setDeleteConfirmCategory(null);
  };

  return (
    <>
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
          Catégorie <span style={{ color: '#9CA3AF', fontWeight: 500 }}>(facultative)</span>
        </Typography>
        <ConditionalComponent isValid={!!(isAddingCategory || isEditingCategory)}>
          <TextField
            fullWidth
            value={isAddingCategory ? newCategoryName : editingCategoryName}
            onChange={(e) => {
              if (isAddingCategory) {
                setNewCategoryName(e.target.value);
              } else {
                setEditingCategoryName(e.target.value);
              }
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                if (isAddingCategory) {
                  handleSaveNewCategory();
                } else {
                  handleSaveEditedCategory();
                }
              }
            }}
            placeholder={isAddingCategory ? "Insérer la catégorie" : "Modifier la catégorie"}
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
              InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <ConditionalComponent isValid={isAddingCategory && !!newCategoryName.trim()}>
                      <IconButton
                        onClick={handleSaveNewCategory}
                        sx={{
                          color: '#3C1C69',
                          background: '#8D31FB',
                          padding: '4px',
                          '&:hover': {
                            background: '#7B28E2',
                          },
                        }}
                      >
                        <AddIcon sx={{ fontSize: '20px' }} />
                      </IconButton>
                    </ConditionalComponent>
                    <ConditionalComponent isValid={!!isEditingCategory}>
                      <IconButton
                        onClick={handleSaveEditedCategory}
                        disabled={!editingCategoryName.trim()}
                        sx={{
                          color: '#8D31FB',
                          padding: '4px',
                          '&:hover': {
                            backgroundColor: 'rgba(141, 49, 251, 0.1)',
                          },
                          '&.Mui-disabled': {
                            color: 'rgba(141, 49, 251, 0.3)',
                          },
                        }}
                      >
                        <CheckIcon sx={{ fontSize: '20px' }} />
                      </IconButton>
                    </ConditionalComponent>
                    <IconButton
                      onClick={isAddingCategory ? handleCancelAddingCategory : handleCancelEditingCategory}
                      sx={{
                        color: '#8D31FB',
                        padding: '4px',
                        '&:hover': {
                          backgroundColor: 'rgba(141, 49, 251, 0.1)',
                        },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </ConditionalComponent>
        <ConditionalComponent isValid={!isAddingCategory && !isEditingCategory}>
          <FormControl fullWidth>
            <Select
              value={category}
              onChange={(e) => {
                if (e.target.value === 'new') {
                  handleStartAddingCategory();
                } else {
                  onCategoryChange(e.target.value);
                }
              }}
              displayEmpty
              renderValue={(selected) => {
                if (!selected || selected === '') {
                  return <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Sélectionner une catégorie</span>;
                }
                return selected;
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
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
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
              <MenuItem value="">Sélectionner une catégorie</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  <span>{cat}</span>
                  <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                    <IconButton
                      onClick={(e) => handleStartEditingCategory(cat, e)}
                      size="small"
                      sx={{
                        color: '#8D31FB',
                        padding: '4px',
                        '&:hover': {
                          backgroundColor: 'rgba(141, 49, 251, 0.1)',
                        },
                      }}
                    >
                      <EditIcon sx={{ fontSize: '16px' }} />
                    </IconButton>
                    <IconButton
                      onClick={(e) => handleDeleteCategory(cat, e)}
                      size="small"
                      sx={{
                        color: '#8D31FB',
                        padding: '4px',
                        '&:hover': {
                          backgroundColor: 'rgba(141, 49, 251, 0.1)',
                        },
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: '16px' }} />
                    </IconButton>
                  </Box>
                </MenuItem>
              ))}
              <MenuItem
                value="new"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  '& .MuiMenuItem-root': {
                    justifyContent: 'center',
                  },
                }}
              >
                <Box sx={{ textAlign: 'center', width: '100%' }}>
                  + Créer une nouvelle catégorie
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </ConditionalComponent>
      </Box>

      <ConditionalComponent isValid={!!deleteConfirmCategory}>
        <Dialog
          open={!!deleteConfirmCategory}
          onClose={handleCancelDeleteCategory}
          PaperProps={{
            sx: {
              borderRadius: '16px',
              background: '#3C1C69',
              minWidth: '400px',
            },
          }}
        >
          <DialogTitle sx={{ color: '#EDEDED', fontFamily: theme.typography.fontFamily }}>
            Confirmer la suppression
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ color: '#9CA3AF', fontFamily: theme.typography.fontFamily }}>
              Êtes-vous sûr de vouloir supprimer la catégorie &quot;{deleteConfirmCategory}&quot; ?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2, gap: 1 }}>
            <Button
              onClick={handleCancelDeleteCategory}
              sx={{
                color: '#8D31FB',
                fontFamily: theme.typography.fontFamily,
                textTransform: 'none',
              }}
            >
              Annuler
            </Button>
            <Button
              onClick={handleConfirmDeleteCategory}
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
      </ConditionalComponent>
    </>
  );
};

