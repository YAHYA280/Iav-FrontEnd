import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Switch,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, 
  faChevronUp, 
  faPlus, 
  faEllipsisV,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

interface SubAgent {
  id: string;
  name: string;
  isActive: boolean;
}

interface SubAgentsSectionProps {
  title?: string;
  subAgents?: SubAgent[];
  selectedAgentId?: string | null;
  onAddSubAgent?: (name: string) => void;
  onToggleSubAgent?: (id: string, active: boolean) => void;
  onSubAgentMenuClick?: (id: string, action: string) => void;
  onSubAgentSelect?: (agentId: string | null) => void;
}

const defaultSubAgents: SubAgent[] = [
  { id: '1', name: 'Expert support technique', isActive: true },
  { id: '2', name: 'Expert support commercial', isActive: true },
  { id: '3', name: 'Expert support premium', isActive: false },
];

export const SubAgentsSection: React.FC<SubAgentsSectionProps> = ({
  title = 'Mes sous-agents',
  subAgents = defaultSubAgents,
  selectedAgentId = null,
  onAddSubAgent,
  onToggleSubAgent,
  onSubAgentMenuClick,
  onSubAgentSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuSubAgentId, setMenuSubAgentId] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newSubAgentName, setNewSubAgentName] = useState('');
  
  const [localSubAgents, setLocalSubAgents] = useState<SubAgent[]>(subAgents);

  const displayedSubAgents = onToggleSubAgent ? subAgents : localSubAgents;

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, subAgentId: string) => {
    setMenuAnchor(event.currentTarget);
    setMenuSubAgentId(subAgentId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuSubAgentId(null);
  };

  const handleMenuAction = (action: string) => {
    if (menuSubAgentId) {
      onSubAgentMenuClick?.(menuSubAgentId, action);
    }
    handleMenuClose();
  };

  const handleToggleSubAgent = (subAgentId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    
    if (onToggleSubAgent) {
      onToggleSubAgent(subAgentId, newStatus);
    } else {
      setLocalSubAgents(prev => 
        prev.map(agent => 
          agent.id === subAgentId 
            ? { ...agent, isActive: newStatus }
            : agent
        )
      );
    }
  };

  const handleSubAgentClick = (subAgentId: string) => {
    if (selectedAgentId === subAgentId) {
      onSubAgentSelect?.(null);
    } else {
      onSubAgentSelect?.(subAgentId);
    }
  };

  const handleOpenCreateDialog = () => {
    setShowCreateDialog(true);
    setNewSubAgentName('');
  };

  const handleCloseCreateDialog = () => {
    setShowCreateDialog(false);
    setNewSubAgentName('');
  };

  const handleCreateSubAgent = () => {
    if (newSubAgentName.trim()) {
      if (onAddSubAgent) {
        onAddSubAgent?.(newSubAgentName.trim());
      } else {
        const newSubAgent: SubAgent = {
          id: Date.now().toString(),
          name: newSubAgentName.trim(),
          isActive: true,
        };
        setLocalSubAgents(prev => [...prev, newSubAgent]);
      }
      handleCloseCreateDialog();
    }
  };

  return (
    <Box 
      sx={{ 
        position: 'relative',
        width: '252px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
          cursor: 'pointer',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: '21.1113px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.00)',
            }}
          >
            <FontAwesomeIcon 
              icon={isExpanded ? faChevronUp : faChevronDown} 
              style={{ 
                color: '#EDEDED',
                width: '22px',
                height: '20px'
              }} 
            />
          </Box>

          <Typography
            sx={{
              width: '200.557px',
              color: '#EDEDED',
              fontFamily: 'IBM Plex Sans',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '121.331%',
            }}
          >
            {title}
          </Typography>
        </Box>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleOpenCreateDialog();
          }}
          size="small"
          sx={{
            width: '19px',
            height: '18px',
            flexShrink: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.00)',
            color: '#EDEDED',
            '&:hover': {
              backgroundColor: 'rgba(237, 237, 237, 0.1)',
            },
          }}
        >
          <FontAwesomeIcon 
            icon={faPlus} 
            style={{ 
              width: '19px',
              height: '18px'
            }} 
          />
        </IconButton>
      </Box>

      <Collapse in={isExpanded}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {displayedSubAgents.map((subAgent) => (
            <Box
              key={subAgent.id}
              onClick={() => handleSubAgentClick(subAgent.id)}
              sx={{
                width: '252px',
                height: '94px',
                flexShrink: 0,
                borderRadius: '24px',
                backgroundColor: selectedAgentId === subAgent.id ? 'rgba(141, 49, 251, 0.4)' : '#281745',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                cursor: 'pointer',
                border: selectedAgentId === subAgent.id 
                  ? '2px solid transparent' 
                  : '2px solid transparent',
                backgroundImage: selectedAgentId === subAgent.id
                  ? 'linear-gradient(#281745, #281745), linear-gradient(180deg, #BE30FF -13.6%, #5D31F8 52.17%, #00A3FF 115.06%)'
                  : 'none',
                backgroundOrigin: 'border-box',
                backgroundClip: selectedAgentId === subAgent.id ? 'padding-box, border-box' : 'border-box',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: selectedAgentId === subAgent.id ? 'rgba(141, 49, 251, 0.5)' : 'rgba(141, 49, 251, 0.2)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                <Typography
                  sx={{
                    color: '#EDEDED',
                    fontFamily: 'IBM Plex Sans',
                    fontSize: '17px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '121.331%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                  }}
                >
                  {subAgent.name}
                </Typography>

                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClick(e, subAgent.id);
                  }}
                  sx={{
                    color: '#EDEDED',
                    backgroundColor: 'rgba(0, 0, 0, 0.00)',
                    width: '24px',
                    height: '24px',
                    '&:hover': {
                      backgroundColor: 'rgba(237, 237, 237, 0.1)',
                    },
                  }}
                >
                  <FontAwesomeIcon 
                    icon={faEllipsisV} 
                    style={{ 
                      width: '15px',
                      height: '15px'
                    }} 
                  />
                </IconButton>
              </Box>

              <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                  width: '120px',
                  height: '32px',
                  flexShrink: 0,
                  borderRadius: '36px',
                  background: '#3C1C69',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 12px',
                  ml: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      color: 'var(--purple, #8D31FB)',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '12.66px',
                      letterSpacing: '-0.211px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {subAgent.isActive ? 'Active' : 'Inactive'}
                  </Typography>
                </Box>

                <Switch
                  checked={subAgent.isActive}
                  onChange={() => handleToggleSubAgent(subAgent.id, subAgent.isActive)}
                  size="small"
                  sx={{
                    width: '42px',
                    height: '24px',
                    padding: 0,
                    margin: 0,
                    '& .MuiSwitch-switchBase': {
                      padding: '1px',
                      '&.Mui-checked': {
                        transform: 'translateX(18px)',
                        color: '#fff',
                        '& + .MuiSwitch-track': {
                          backgroundColor:'var(--purple, #8D31FB)',
                          opacity: 1,
                          border: 'none',
                        },
                      },
                      '&.Mui-focusVisible .MuiSwitch-thumb': {
                        color: '#8D31FB',
                        border: '2px solid #fff',
                      },
                    },
                    '& .MuiSwitch-thumb': {
                      width: '22px',
                      height: '22px',
                      backgroundColor: '#fff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    },
                    '& .MuiSwitch-track': {
                      borderRadius: '20px',
                      backgroundColor: 'rgba(239, 68, 68, 0.3)',
                      opacity: 1,
                      width: '42px',
                      height: '24px',
                      transition: 'background-color 0.3s',
                    },
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Collapse>

      <Dialog 
        open={showCreateDialog} 
        onClose={handleCloseCreateDialog}
        PaperProps={{
          sx: {
            background: '#0F1117',
            borderRadius: '16px',
            minWidth: '500px',
             border: '2px solid transparent',
          }
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontFamily: 'IBM Plex Sans',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '36px',
            letterSpacing: '-0.234px',
            textTransform: 'capitalize',
            padding: '24px',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            background: 'linear-gradient(180deg, #BE30FF -13.6%, #5D31F8 52.17%, #00A3FF 115.06%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            display: 'inline-block',
          }}
        >
          Créer un nouveau sous-agent
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: 'Inter',
              fontSize: '16px',
              mb: 3,
            }}
          >
            Entrez un nom pour votre nouveau sous-agent. Vous pourrez configurer son comportement et sa spécialisation après la création.
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="Nom du sous-agent"
            value={newSubAgentName}
            onChange={(e) => setNewSubAgentName(e.target.value)}
            placeholder="ex: Support technique, Assistant commercial, Support facturation..."
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#EDEDED',
                '& fieldset': {
                  borderColor: 'rgba(141, 49, 251, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(141, 49, 251, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#8D31FB',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#9CA3AF',
                '&.Mui-focused': {
                  color: '#8D31FB',
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={handleCloseCreateDialog}
            sx={{
              color: '#EDEDED',
              borderColor: '#EDEDED',
              '&:hover': {
                borderColor: 'rgba(141, 49, 251, 0.5)',
                backgroundColor: 'rgba(141, 49, 251, 0.1)',
              },
            }}
            variant="outlined"
          >
            Annuler
          </Button>
          <Button
            onClick={handleCreateSubAgent}
            disabled={!newSubAgentName.trim()}
            sx={{
              display: 'inline-flex',
              padding: '14px 20px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: '8px',
              borderRadius: '16px',
              border: '1px solid #5D31F8',
              background: 'var(--Gradient-color, linear-gradient(180deg, #BE30FF -13.6%, #5D31F8 52.17%, #00A3FF 115.06%))',
              boxShadow: '0 20px 35px 0 rgba(93, 49, 248, 0.20)',
              color: '#EDEDED',
              '&:hover': {
                backgroundColor: '#7D21EB',
              },
              '&:disabled': {
                backgroundColor: 'rgba(141, 49, 251, 0.3)',
                color: 'rgba(237, 237, 237, 0.5)',
              },
            }}
            variant="contained"
          >
            Créer le sous-agent
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#2D3748',
            color: '#EDEDED',
            borderRadius: '8px',
            minWidth: '120px',
          }
        }}
      >
        <MenuItem 
          onClick={() => handleMenuAction('edit')} 
          sx={{ 
            color: '#EDEDED',
            fontFamily: 'Inter',
            fontSize: '14px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Renommer
        </MenuItem>
        <MenuItem 
          onClick={() => handleMenuAction('delete')} 
          sx={{ 
            color: '#EF4444',
            fontFamily: 'Inter',
            fontSize: '14px',
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
            },
          }}
        >
          Supprimer
        </MenuItem>
      </Menu>
    </Box>
  );
};