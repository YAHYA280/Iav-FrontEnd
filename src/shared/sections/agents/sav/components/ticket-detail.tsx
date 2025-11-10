import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Paper,
  TextField,
  InputAdornment,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { commonData } from '@/shared/_mock/sav-subagents-config';
import ConditionalComponent from '@/shared/components/conditionalComponent';

interface Ticket {
  id: string;
  title: string;
  status: 'en-attente' | 'en-cours' | 'resolu';
  priority: 'haute' | 'moyenne' | 'basse' | 'critique';
  channel: 'whatsapp' | 'instagram' | 'linkedin' | 'telegram' | 'discord' | 'email' | 'telephone' | 'messenger';
  client: string;
  assignedTo?: string;
  date: string;
  description: string;
  timeAgo?: string;
}

interface TicketDetailProps {
  ticket: Ticket;
  onBack: () => void;
}

export const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onBack }) => {
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleImproveMessage = () => {
    const improvedMessage = message
      .replace(/\s+/g, ' ')
      .replace(/\s*([,.!?;:])\s*/g, '$1 ')
      .replace(/\s*([.!?])\s*([A-Z])/g, '$1 $2')
      .replace(/\b(je|tu|il|elle|nous|vous|ils|elles)\b/gi, (match) => match.toLowerCase())
      .replace(/\b(et|ou|mais|donc|or|ni|car)\b/gi, (match) => match.toLowerCase())
      .trim();

    setMessage(improvedMessage);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = () => {
    if (message.trim() || uploadedFiles.length > 0) {
      console.log('Message:', message);
      console.log('Files:', uploadedFiles);

      setMessage('');
      setUploadedFiles([]);
    }
  };
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'en-attente':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.20)',
          color: '#EF4444',
          border: '1px solid #EF4444',
        };
      case 'en-cours':
        return {
          backgroundColor: '#3C1C69',
          color: '#8D31FB',
        };
      case 'resolu':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.20)',
          color: '#10B981',
          border: '1px solid #10B981',
        };
      default:
        return {
          backgroundColor: '#3C1C69',
          color: '#EDEDED',
          border: '1px solid #3C1C69',
        };
    }
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'critique':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.20)',
          color: '#EF4444',
          border: '1px solid #EF4444',
        };
      case 'haute':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.20)',
          color: '#EF4444',
          border: '1px solid #EF4444',
        };
      case 'moyenne':
        return {
          backgroundColor: 'rgba(255, 250, 0, 0.20)',
          color: '#FAAD4F',
          border: '1px solid #FAAD4F',
        };
      case 'basse':
        return {
          backgroundColor: 'rgba(156, 163, 175, 0.20)',
          color: '#9CA3AF',
          border: '1px solid #9CA3AF',
        };
      default:
        return {
          backgroundColor: 'rgba(156, 163, 175, 0.20)',
          color: '#9CA3AF',
          border: '1px solid #9CA3AF',
        };
    }
  };

  const getChannelInfo = (channel: string) => {
    if (commonData.platforms[channel as keyof typeof commonData.platforms]) {
      return {
        name: commonData.platforms[channel as keyof typeof commonData.platforms].name,
        logoSrc: commonData.platforms[channel as keyof typeof commonData.platforms].logoSrc,
      };
    }
    return {
      name: channel,
      logoSrc: '/icons/question.svg',
    };
  };

  const channelInfo = getChannelInfo(ticket.channel);
  const statusStyles = getStatusStyles(ticket.status);
  const priorityStyles = getPriorityStyles(ticket.priority);

  const containerSx = {
    backgroundColor: '#3C1C69',
    borderRadius: '8px',
    border: 'none',
    p: 3,
    mt: 0,
    width: '100%',
  };

  const headerSx = {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { xs: 'flex-start', sm: 'center' },
    justifyContent: 'space-between',
    gap: { xs: 2, sm: 0 },
    mb: 1,
  };

  const backButtonSx = {
    color: '#BE30FF',
    mr: 2,
    width: '40px',
    height: '40px',
    '&:hover': {
      backgroundColor: 'rgba(190, 48, 255, 0.1)',
    },
  };

  const ticketIdSx = {
    color: '#EDEDED',
    fontFamily: theme.typography.fontTertiaryFamily,
    fontSize: { xs: '20px', sm: '24px' },
    fontWeight: 700,
    lineHeight: '121.331%',
    fontStyle: 'normal',
  };

  const statusBoxSx = {
    ...statusStyles,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: '12px',
    padding: '4px 12px',
    minWidth: 'auto',
    width: 'auto',
    height: 'auto',
  };

  const statusTextSx = {
    color: statusStyles.color || '#EDEDED',
    fontFamily: theme.typography.fontFamily || 'Inter',
    fontSize: { xs: '14px', sm: '16px' },
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
  };

  const titleSx = {
    color: '#9CA3AF',
    fontFamily: theme.typography.fontTertiaryFamily,
    fontSize: { xs: '18px', sm: '20px' },
    fontWeight: 500,
    lineHeight: '121.331%',
    mb: 3,
    mt: 0.5,
  };

  const infoRowSx = {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { xs: 'flex-start', sm: 'center' },
    gap: { xs: 2, sm: 3 },
    mb: 4,
    flexWrap: 'wrap',
  };

  const infoTextSx = {
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: { xs: '14px', sm: '16px' },
    fontWeight: 500,
  };

  const infoValueSx = {
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: { xs: '14px', sm: '16px' },
    fontWeight: 700,
  };

  const channelIconSx = {
    width: { xs: '18px', sm: '20px' },
    height: { xs: '18px', sm: '20px' },
    objectFit: 'contain',
  };

  const conversationBoxSx = {
    width: '100%',
    height: '400px',
    borderRadius: '24px',
    background: '#4C2086',
    p: 3,
    overflow: 'auto',
    mb: 3,
  };

  const messageBubbleSx = {
    p: '22px',
    borderRadius: '24px 24px 0 24px',
    background: '#0F1117',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px',
  };

  const messageBubbleClientSx = {
    p: '22px',
    borderRadius: '24px 24px 24px 0',
    background: '#0F1117',
    border: '1px solid rgba(141, 49, 251, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px',
  };

  const avatarSx = {
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: '#8F35FB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
    color: '#FFF',
  };

  const avatarAgentSx = {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'linear-gradient(180deg, #8D31FB 0%, #0F1117 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
    color: '#FFF',
    overflow: 'hidden',
  };

  const messageTextSx = {
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    lineHeight: 1.4,
  };

  const messageInputSx = {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      color: '#FFF',
      fontFamily: theme.typography.fontFamily,
      fontSize: { xs: '16px', sm: '22px' },
      background: '#1A1D25',
      borderRadius: '24px',
      border: '2px solid transparent',
      backgroundImage: 'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
      paddingBottom: { xs: '50px', sm: '60px' },
      paddingLeft: message.length > 0 ? { xs: '50px', sm: '60px' } : '24px',
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
  };

  const magicIconContainerSx = {
    position: 'absolute',
    top: { xs: '6px', sm: '8px' },
    left: { xs: '20px', sm: '24px' },
    zIndex: 3,
  };

  const magicIconButtonSx = {
    color: '#BE30FF',
    padding: '4px',
    '&:hover': {
      color: '#8D31FB',
      backgroundColor: 'rgba(190, 48, 255, 0.1)',
    },
  };

  const magicIconSx = {
    width: { xs: '16px', sm: '20px' },
    height: { xs: '16px', sm: '20px' },
  };

  const iconButtonSx = {
    color: '#BE30FF',
    padding: '4px',
    '&:hover': {
      color: '#8D31FB',
      backgroundColor: 'rgba(190, 48, 255, 0.1)',
    },
  };

  const bottomIconsLeftSx = {
    position: 'absolute',
    bottom: { xs: '12px', sm: '16px' },
    left: { xs: '20px', sm: '24px' },
    display: 'flex',
    gap: 1,
    zIndex: 2,
  };

  const bottomIconsRightSx = {
    position: 'absolute',
    bottom: { xs: '12px', sm: '16px' },
    right: { xs: '20px', sm: '24px' },
    display: 'flex',
    gap: 1,
    zIndex: 2,
  };

  const filesContainerSx = {
    mt: 2,
  };

  const filesTitleSx = {
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: 500,
    mb: 1,
  };

  const chipSx = {
    backgroundColor: 'rgba(141, 49, 251, 0.2)',
    color: '#8D31FB',
    border: '1px solid rgba(141, 49, 251, 0.3)',
    '& .MuiChip-deleteIcon': {
      color: '#8D31FB',
    },
  };

  return (
    <Box sx={containerSx}>
      <Box sx={headerSx}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={onBack} sx={backButtonSx}>
            <ArrowBack sx={{ fontSize: '24px', color: '#BE30FF' }} />
          </IconButton>
          <Typography sx={ticketIdSx}>
            {ticket.id}
          </Typography>
        </Box>

        <Box sx={statusBoxSx}>
          <Typography sx={statusTextSx}>
            {ticket.status.replace('-', ' ')}
          </Typography>
        </Box>
      </Box>

      <Typography sx={titleSx}>
        {ticket.title}
      </Typography>
      <Box sx={infoRowSx}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={infoTextSx}>
            Par
          </Typography>
          <Typography sx={infoValueSx}>
            {ticket.client}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box component="img" src={channelInfo.logoSrc} alt={channelInfo.name} sx={channelIconSx} />
          <Typography sx={infoTextSx}>
            {channelInfo.name}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={infoTextSx}>
            Assigné à
          </Typography>
          <Typography sx={infoValueSx}>
            {ticket.assignedTo || 'Non assigné'}
          </Typography>
        </Box>

        <Chip
          label={ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
          sx={{
            ...priorityStyles,
            fontFamily: theme.typography.fontFamily,
            fontSize: '12px',
            fontWeight: 600,
            height: '24px',
            borderRadius: '12px',
          }}
        />

      </Box>

      <Box sx={conversationBoxSx}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mb: 2, gap: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '70%', alignItems: 'flex-end' }}>
              <Box sx={messageBubbleSx}>
                <Typography sx={messageTextSx}>
                  {ticket.description}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', minWidth: '32px' }}>
              <Box sx={avatarSx}>
                {ticket.client.split(' ').map(n => n[0]).join('')}
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', mb: 2, gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', minWidth: '32px' }}>
              <Box sx={avatarAgentSx}>
                A
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '70%', alignItems: 'flex-start' }}>
              <Box sx={messageBubbleClientSx}>
                <Typography sx={messageTextSx}>
                  Bonjour {ticket.client}, je vais examiner votre demande et vous répondre dans les plus brefs délais.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ position: 'relative', width: '100%' }}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          style={{ display: 'none' }}
          accept="image/*,application/pdf,.doc,.docx,.txt"
        />
        <TextField
          multiline
          rows={isMobile ? 2 : 3}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tapez votre message..."
          InputProps={{ startAdornment: null }}
          sx={messageInputSx}
        />

        <ConditionalComponent isValid={message.length > 0}>
          <Box sx={magicIconContainerSx}>
            <Tooltip title="Améliorer le message" arrow>
              <IconButton onClick={handleImproveMessage} sx={magicIconButtonSx}>
                <Box component="img" src="/icons/magic.svg" alt="Baguette magique" sx={magicIconSx} />
              </IconButton>
            </Tooltip>
          </Box>
        </ConditionalComponent>

        <Box sx={bottomIconsLeftSx}>
          <IconButton onClick={handleFileUpload} sx={iconButtonSx}>
            <FontAwesomeIcon icon="plus" style={{ fontSize: isMobile ? '14px' : '16px' }} />
          </IconButton>
        </Box>
        
        <Box sx={bottomIconsRightSx}>
          <IconButton sx={iconButtonSx}>
            <FontAwesomeIcon icon="microphone" style={{ fontSize: isMobile ? '14px' : '16px' }} />
          </IconButton>
          <IconButton onClick={handleSendMessage} sx={iconButtonSx}>
            <FontAwesomeIcon icon="paper-plane" style={{ fontSize: isMobile ? '14px' : '16px' }} />
          </IconButton>
        </Box>
      </Box>

      <ConditionalComponent isValid={uploadedFiles.length > 0}>
        <Box sx={filesContainerSx}>
          <Typography sx={filesTitleSx}>
            Fichiers joints ({uploadedFiles.length})
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {uploadedFiles.map((file, index) => (
              <Chip
                key={index}
                label={file.name}
                onDelete={() => handleRemoveFile(index)}
                sx={chipSx}
              />
            ))}
          </Box>
        </Box>
      </ConditionalComponent>
    </Box>
  );
};
