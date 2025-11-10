import { Box, IconButton, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';

interface TicketPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const TicketPagination: React.FC<TicketPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  // Générer les numéros de pages à afficher
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Afficher toutes les pages si le total est petit
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logique pour afficher les pages avec ellipses
      if (currentPage <= 3) {
        // Début : 1, 2, 3, 4, ..., totalPages
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        if (totalPages > 4) {
          pages.push('...');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Fin : 1, ..., totalPages-3, totalPages-2, totalPages-1, totalPages
        pages.push(1);
        if (totalPages > 4) {
          pages.push('...');
        }
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Milieu : 1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null; // Ne pas afficher la pagination s'il n'y a qu'une page
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        mt: 4,
        mb: 2,
      }}
    >
      {/* Bouton Précédent */}
      <IconButton
        onClick={handlePrevious}
        disabled={currentPage === 1}
        sx={{
          width: '39.525px',
          height: '39.525px',
          borderRadius: '100px',
          border: '1px solid #8D31FB',
          backgroundColor: 'transparent',
          color: currentPage === 1 ? '#666' : '#8D31FB',
          '&:hover': {
            backgroundColor: currentPage === 1 ? 'transparent' : 'rgba(141, 49, 251, 0.1)',
          },
          '&:disabled': {
            color: '#666',
            borderColor: '#666',
          },
        }}
      >
        <FontAwesomeIcon icon="chevron-left" style={{ fontSize: '14px' }} />
      </IconButton>

      {/* Numéros de pages */}
      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <Typography
              key={`ellipsis-${index}`}
              sx={{
                color: '#8D31FB',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontWeight: 500,
                px: 1,
              }}
            >
              ...
            </Typography>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <Box
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            sx={{
              display: 'flex',
              width: '39.525px',
              height: '39.525px',
              padding: '11.116px 0.618px',
              justifyContent: 'center',
              alignItems: 'center',
              flexShrink: 0,
              borderRadius: '100px',
              border: '1px solid #8D31FB',
              backgroundColor: isActive ? '#8D31FB' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: isActive ? '#8D31FB' : 'rgba(141, 49, 251, 0.1)',
              },
            }}
          >
            <Typography
              sx={{
                color: isActive ? '#FFFFFF' : '#8D31FB',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1,
                textAlign: 'center',
              }}
            >
              {pageNumber}
            </Typography>
          </Box>
        );
      })}

      {/* Bouton Suivant */}
      <IconButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
        sx={{
          width: '39.525px',
          height: '39.525px',
          borderRadius: '100px',
          border: '1px solid #8D31FB',
          backgroundColor: 'transparent',
          color: currentPage === totalPages ? '#666' : '#8D31FB',
          '&:hover': {
            backgroundColor: currentPage === totalPages ? 'transparent' : 'rgba(141, 49, 251, 0.1)',
          },
          '&:disabled': {
            color: '#666',
            borderColor: '#666',
          },
        }}
      >
        <FontAwesomeIcon icon="chevron-right" style={{ fontSize: '14px' }} />
      </IconButton>
    </Box>
  );
};
