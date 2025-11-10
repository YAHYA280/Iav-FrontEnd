import { Box, Typography, TextField, IconButton, Button, useTheme, Chip, Select, MenuItem, FormControl, Tooltip, useMediaQuery } from '@mui/material';
import React, { useState, useMemo, useEffect } from 'react';
import { Search } from '@mui/icons-material';
import { useSavSubagentData } from '@/hooks/use-sav-subagent-data';
import { AddFaqModal, FAQ } from './add-faq-modal';
import { DeleteFaqDialog } from './delete-faq-dialog';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export interface InformationSectionProps {
  subagentId?: string;
}

export const InformationSection: React.FC<InformationSectionProps> = ({
  subagentId = 'sav-general',
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);
  const [showFilterSelect, setShowFilterSelect] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [faqToEdit, setFaqToEdit] = useState<FAQ | null>(null);
  const [deleteConfirmFaq, setDeleteConfirmFaq] = useState<FAQ | null>(null);
  const [localFaqs, setLocalFaqs] = useState<FAQ[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { faqs: initialFaqs = [] } = useSavSubagentData(subagentId);

  useEffect(() => {
    setLocalFaqs(initialFaqs);
  }, [initialFaqs, subagentId]);

  const faqs = localFaqs;

  const categories = useMemo(() => {
    const cats = Array.from(new Set(faqs.map(faq => faq.category)));
    return cats.sort();
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    let filtered = faqs;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchLower) ||
        faq.answer.toLowerCase().includes(searchLower) ||
        faq.category.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [faqs, search, selectedCategory]);

  const faqsByCategory = useMemo(() => {
    const grouped: Record<string, typeof faqs> = {};
    filteredFaqs.forEach(faq => {
      if (!grouped[faq.category]) {
        grouped[faq.category] = [];
      }
      grouped[faq.category].push(faq);
    });
    return grouped;
  }, [filteredFaqs]);

  const questionsCount = faqs.length;
  const lastUpdated = '27/10/2025';

  const handleEdit = (faqId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const faq = faqs.find(f => f.id === faqId);
    if (faq) {
      setFaqToEdit(faq);
      setOpenAddModal(true);
      setSelectedFaqId(null);
    }
  };

  const handleDelete = (faqId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const faq = faqs.find(f => f.id === faqId);
    if (faq) {
      setDeleteConfirmFaq(faq);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmFaq) {
      setLocalFaqs(faqs.filter(f => f.id !== deleteConfirmFaq.id));
      setDeleteConfirmFaq(null);
      setSelectedFaqId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmFaq(null);
  };

  const handleExport = () => {
    console.log('Export FAQs');
  };

  const handleOpenAddModal = () => {
    setFaqToEdit(null);
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setFaqToEdit(null);
  };

  const handleAddFaq = (category: string, question: string, answer: string) => {
    const newFaq: FAQ = {
      id: `faq-${Date.now()}`,
      question,
      answer,
      category: category || 'Sans catégorie',
    };
    setLocalFaqs([...faqs, newFaq]);
    handleCloseAddModal();
  };

  const handleEditFaq = (id: string, category: string, question: string, answer: string) => {
    setLocalFaqs(faqs.map(faq =>
      faq.id === id
        ? { ...faq, category: category || 'Sans catégorie', question, answer }
        : faq
    ));
    handleCloseAddModal();
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'relative', mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '24px',
            fontWeight: 600,
            mb: 1,
            pr: { xs: 0, sm: '200px' },
          }}
        >
          FAQ Manager
        </Typography>
        <Typography
          sx={{
            color: '#9CA3AF',
            fontFamily: theme.typography.fontFamily,
            fontSize: { xs: '14px', sm: '16px' },
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            mb: { xs: 2, sm: 0 },
          }}
        >
          {questionsCount} questions · Dernière mise à jour {lastUpdated || '—'}
        </Typography>

        <Box sx={{
          position: { xs: 'relative', sm: 'absolute' },
          right: { xs: 'auto', sm: 0 },
          top: { xs: 'auto', sm: 0 },
          display: 'flex',
          gap: { xs: 1, sm: 2 },
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          width: { xs: '100%', sm: 'auto' },
          mt: { xs: 2, sm: 0 },
          mb: { xs: 2, sm: 0 },
        }}>
          <Button
            variant="outlined"
            onClick={handleExport}
            sx={{
              display: 'flex',
              padding: { xs: '10px 16px', sm: '14px 20px' },
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '16px',
              border: '1px solid #8D31FB',
              boxShadow: '0 20px 35px 0 rgba(93, 49, 248, 0.20)',
              textTransform: 'none',
              color: '#8D31FB',
              background: 'transparent',
              width: { xs: '100%', sm: 'auto' },
              '&:hover': {
                border: '1px solid #8D31FB',
                background: 'rgba(141, 49, 251, 0.1)',
              },
            }}
          >
            <Box
              component="img"
              src="/icons/export-icon.svg"
              alt="Exporter"
              sx={{ width: { xs: '18px', sm: '20px' }, height: { xs: '18px', sm: '20px' } }}
            />
            <Typography sx={{
              color: '#8D31FB',
              fontFamily: theme.typography.fontFamily,
              fontSize: { xs: '14px', sm: '16px' },
              fontWeight: 600,
              lineHeight: 'normal',
              display: { xs: 'none', sm: 'block' },
            }}>
              Exporter
            </Typography>
          </Button>

          <Button
            variant="contained"
            onClick={handleOpenAddModal}
            sx={{
              display: 'flex',
              padding: { xs: '10px 16px', sm: '14px 20px' },
              flexDirection: { xs: 'row', sm: 'column' },
              justifyContent: 'center',
              alignItems: { xs: 'center', sm: 'flex-end' },
              gap: '8px',
              borderRadius: '16px',
              background: '#8D31FB',
              boxShadow: '0 20px 35px 0 rgba(93, 49, 248, 0.20)',
              textTransform: 'none',
              width: { xs: '100%', sm: 'auto' },
              '&:hover': { background: '#7B28E2' },
            }}
          >
            <Typography sx={{
              color: '#3C1C69',
              fontFamily: theme.typography.fontFamily,
              fontSize: { xs: '14px', sm: '16px' },
              fontWeight: 600
            }}>
              Ajouter une FAQ
            </Typography>
          </Button>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        gap: { xs: 1, sm: 2 },
        mb: 3,
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
            placeholder="Rechercher une question..."
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
            <Tooltip title="Filtrer par catégorie" arrow>
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
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
                sx={{
                  background: '#1A1D25',
                  borderRadius: '24px',
                  color: '#FFF',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '14px',
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
                  '& .MuiSelect-select': {
                    paddingLeft: '48px',
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
                <MenuItem value="all">Toutes les catégories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ConditionalComponent>
        </Box>
      </Box>

      <ConditionalComponent isValid={questionsCount === 0}>
        <Box>
          <Box
            sx={{
              width: '100%',
              height: { xs: 'auto', sm: '362px' },
              minHeight: { xs: '300px', sm: '362px' },
              flexShrink: 0,
              borderRadius: '24px',
              border: '2px dashed rgba(141, 49, 251, 0.4)',
              background: 'rgba(28, 17, 57, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              px: { xs: 2, sm: 3 },
              py: { xs: 4, sm: 0 },
            }}
          >
            <Box
              component="img"
              src="/icons/question-icon.svg"
              alt="Icône de question"
              sx={{
                width: '50px',
                height: '50px',
                flexShrink: 0,
                mb: 2,
              }}
            />
            <Typography
              sx={{
                color: '#FFFFFF',
                fontFamily: theme.typography.fontTertiaryFamily,
                fontSize: { xs: '18px', sm: '20px' },
                fontStyle: 'normal',
                fontWeight: 700,
                mb: 1,
              }}
            >
              Aucune FAQ pour le moment
            </Typography>
            <Typography
              sx={{
                color: '#9CA3AF',
                fontFamily: theme.typography.fontFamily,
                fontSize: { xs: '14px', sm: '16px' },
                fontWeight: 500,
                maxWidth: { xs: '100%', sm: '640px' },
                mb: 3,
              }}
            >
              Commencez par créer votre première question et réponse de FAQ.
            </Typography>
            <Button
              variant="contained"
              onClick={handleOpenAddModal}
              sx={{
                borderRadius: '16px',
                background: '#8D31FB',
                boxShadow: '0 20px 35px 0 rgba(93, 49, 248, 0.20)',
                textTransform: 'none',
                px: 3,
                py: 1.25,
                '&:hover': { background: '#7B28E2' },
              }}
            >
              <Typography sx={{ color: '#3C1C69', fontFamily: theme.typography.fontFamily, fontSize: '16px', fontWeight: 600 }}>
                Créer la première FAQ
              </Typography>
            </Button>
          </Box>
        </Box>
      </ConditionalComponent>
      <ConditionalComponent isValid={questionsCount > 0}>
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
            {Object.entries(faqsByCategory).map(([category, categoryFaqs]) => (
              <Box key={category}>
                <Typography
                  sx={{
                    color: '#8D31FB',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: { xs: '18px', sm: '20px' },
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '121.331%',
                    mb: 2,
                  }}
                >
                  {category}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {categoryFaqs.map((faq) => {
                    const isSelected = selectedFaqId === faq.id;
                    return (
                      <Box
                        key={faq.id}
                        onClick={() => setSelectedFaqId(isSelected ? null : faq.id)}
                        sx={{
                          width: '100%',
                          borderRadius: '24px',
                          background: '#4C2086',
                          border: isSelected ? '2px solid transparent' : '2px solid transparent',
                          backgroundImage: isSelected
                            ? 'linear-gradient(#4C2086, #4C2086), linear-gradient(180deg, #BE30FF -13.6%, #5D31F8 52.17%, #00A3FF 115.06%)'
                            : 'none',
                          backgroundOrigin: 'border-box',
                          backgroundClip: isSelected ? 'padding-box, border-box' : 'border-box',
                          padding: { xs: '12px 16px', sm: '16px 20px' },
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          justifyContent: 'space-between',
                          alignItems: { xs: 'flex-start', sm: 'center' },
                          gap: { xs: 1, sm: 2 },
                          position: 'relative',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            border: '2px solid rgba(190, 48, 255, 0.5)',
                          },
                        }}
                      >
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0, width: { xs: '100%', sm: 'auto' } }}>
                          <Typography
                            sx={{
                              color: '#EDEDED',
                              fontFamily: theme.typography.fontTertiaryFamily,
                              fontSize: { xs: '14px', sm: '16px' },
                              fontStyle: 'normal',
                              fontWeight: 700,
                              lineHeight: '121.331%',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {faq.question}
                          </Typography>

                          <Typography
                            sx={{
                              color: '#9CA3AF',
                              fontFamily: theme.typography.fontTertiaryFamily,
                              fontSize: { xs: '14px', sm: '16px' },
                              fontStyle: 'normal',
                              fontWeight: 500,
                              lineHeight: 'normal',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {faq.answer}
                          </Typography>
                        </Box>

                        <ConditionalComponent isValid={isSelected}>
                          <Box
                            sx={{
                              display: { xs: 'none', sm: 'flex' },
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              flex: 1,
                            }}
                          >
                            <Chip
                              label={faq.category}
                              sx={{
                                width: { xs: 'auto', sm: '106.609px' },
                                height: '27px',
                                borderRadius: '19px',
                                background: 'rgba(141, 49, 251, 0.10)',
                                color: '#8D31FB',
                                textAlign: 'center',
                                fontFamily: theme.typography.fontFamily,
                                fontSize: { xs: '12px', sm: '13px' },
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                                '& .MuiChip-label': {
                                  padding: '4px 8px',
                                },
                              }}
                            />
                          </Box>
                        </ConditionalComponent>

                        <ConditionalComponent isValid={!isSelected || isMobile}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              flexShrink: 0,
                              alignSelf: { xs: 'flex-start', sm: 'center' },
                            }}
                          >
                            <Chip
                              label={faq.category}
                              sx={{
                                width: { xs: 'auto', sm: '106.609px' },
                                height: '27px',
                                borderRadius: '19px',
                                background: 'rgba(141, 49, 251, 0.10)',
                                color: '#8D31FB',
                                textAlign: 'center',
                                fontFamily: theme.typography.fontFamily,
                                fontSize: { xs: '12px', sm: '13px' },
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                                '& .MuiChip-label': {
                                  padding: '4px 8px',
                                },
                              }}
                            />
                          </Box>
                        </ConditionalComponent>

                        <ConditionalComponent isValid={isSelected}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: { xs: 1, sm: 2 },
                              flexShrink: 0,
                              alignSelf: { xs: 'flex-end', sm: 'center' },
                            }}
                          >
                            <IconButton
                              onClick={(e) => handleEdit(faq.id, e)}
                              sx={{
                                width: { xs: '22px', sm: '25.878px' },
                                height: { xs: '20px', sm: '22.218px' },
                                padding: 0,
                                '&:hover': {
                                  opacity: 0.8,
                                },
                              }}
                            >
                              <Box
                                component="img"
                                src="/icons/edit.png"
                                alt="Modifier"
                                sx={{
                                  width: { xs: '22px', sm: '25.878px' },
                                  height: { xs: '20px', sm: '22.218px' },
                                }}
                              />
                            </IconButton>
                            <IconButton
                              onClick={(e) => handleDelete(faq.id, e)}
                              sx={{
                                width: { xs: '22px', sm: '25.878px' },
                                height: { xs: '20px', sm: '22.218px' },
                                padding: 0,
                                '&:hover': {
                                  opacity: 0.8,
                                },
                              }}
                            >
                              <Box
                                component="img"
                                src="/icons/delete-icon.svg"
                                alt="Supprimer"
                                sx={{
                                  width: { xs: '22px', sm: '25.878px' },
                                  height: { xs: '20px', sm: '22.218px' },
                                }}
                              />
                            </IconButton>
                          </Box>
                        </ConditionalComponent>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </ConditionalComponent>

      <AddFaqModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        onAdd={handleAddFaq}
        onEdit={handleEditFaq}
        categories={categories}
        faqToEdit={faqToEdit}
        containerId="sav-container"
      />

      <DeleteFaqDialog
        open={!!deleteConfirmFaq}
        faq={deleteConfirmFaq}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        containerId="sav-container"
      />
    </Box>
  );
};



