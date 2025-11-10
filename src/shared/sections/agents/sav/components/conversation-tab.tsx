import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
  Visibility as VisibilityIcon,
  Star as StarIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTicketAlt,
  faStar,
  faPhone,
  faEnvelope,
  faGlobe,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Conversation, ConversationDetail, Message } from '@/shared/types/conversation';
import { Client } from '@/shared/types/client';
import { conversationDetails } from '@/shared/_mock/conversations';
import ConditionalComponent from '@/shared/components/conditionalComponent';


interface ConversationsTabProps {
  conversations?: Conversation[];
  clients?: Client[];
  onConversationClick?: (conversationId: string) => void;
  onSearch?: (query: string) => void;
}

export const ConversationsTab: React.FC<ConversationsTabProps> = ({
  conversations = [],
  clients = [],
  onConversationClick,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'history' | 'clients'>('history');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [conversationDetail, setConversationDetail] = useState<ConversationDetail | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleConversationClick = (conversationId: string) => {
    setSelectedConversation(conversationId);
    onConversationClick?.(conversationId);
  };

  const handleConversationDoubleClick = (conversationId: string) => {
    const detail = conversationDetails[conversationId];
    if (detail) {
      setConversationDetail(detail);
    }
  };

  const handleBackToList = () => {
    setConversationDetail(null);
    setSelectedConversation(null);
    setSelectedClient(null);
  };

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleSubTabChange = (event: React.SyntheticEvent, newValue: 'history' | 'clients') => {
    setActiveSubTab(newValue);
    setConversationDetail(null);
    setSelectedConversation(null);
    setSelectedClient(null);
  };

  const handleChannelChange = (event: any) => {
    setSelectedChannel(event.target.value);
  };

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.customerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getChannelIcon = (channel: string) => {
    const channelIcons: { [key: string]: string } = {
      WhatsApp: '/icons/whatsapp.svg',
      Email: '/icons/email.svg',
      Messenger: '/icons/messenger.svg',
      Discord: '/icons/discord.svg',
      Youtube: '/icons/youtube.svg',
      Snapchat: '/icons/snapchat.svg',
    };
    return channelIcons[channel] || '/icons/default.svg';
  };

  const shouldShowAvatar = (messages: Message[], currentIndex: number) => {
    if (currentIndex === messages.length - 1) return true;
    if (currentIndex < messages.length - 1) {
      return messages[currentIndex + 1].sender !== messages[currentIndex].sender;
    }
    return false;
  };

  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path
        d="M11.6699 17.2021L5.0293 10.5615C4.57031 10.1025 4.57031 9.36035 5.0293 8.90625L6.13281 7.80273C6.5918 7.34375 7.33398 7.34375 7.78809 7.80273L12.4951 12.5098L17.2021 7.80273C17.6611 7.34375 18.4033 7.34375 18.8574 7.80273L19.9609 8.90625C20.4199 9.36523 20.4199 10.1074 19.9609 10.5615L13.3203 17.2021C12.8711 17.6611 12.1289 17.6611 11.6699 17.2021Z"
        fill="#EDEDED"
      />
    </svg>
  );

  // Component for conversation detail view
  const ConversationDetailView = () => (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          p: 3,
          background: '#4C2086',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={handleBackToList}
            sx={{
              color: '#EDEDED',
              '&:hover': {
                backgroundColor: 'rgba(141, 49, 251, 0.2)',
              },
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </IconButton>
          <Typography
            sx={{
              color: '#EDEDED',
              fontFamily: 'IBM Plex Sans',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '121.331%',
            }}
          >
            Conversation avec {conversationDetail?.customerName}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          padding: 3,
          background: '#4C2086',
          overflowY: 'auto',
          maxHeight: '400px',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(141, 49, 251, 0.1)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#8D31FB',
            borderRadius: '3px',
          },
        }}
      >
        {conversationDetail?.messages.map((message, index) => {
          const showAvatar = shouldShowAvatar(conversationDetail.messages, index);
          const isCustomer = message.sender === 'customer';

          return (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: isCustomer ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
                mb: 2,
                gap: 1,
              }}
            >
              <ConditionalComponent isValid={!isCustomer}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    minWidth: '32px',
                  }}
                >
                  <ConditionalComponent
                    isValid={showAvatar}
                    defaultComponent={<Box sx={{ width: 32, height: 32 }} />}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        background: 'linear-gradient(180deg, var(--Background-Color, #8D31FB) 0%, #0F1117 100%)',
                        fontSize: '14px',
                        fontWeight: 600,
                        overflow: 'hidden',
                      }}
                    >
                      <Box style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <Image
                          alt="Agent Avatar"
                          src="/avatars/ziri-avatar.png"
                          fill
                          style={{
                            objectFit: 'cover',
                          }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </Box>
                    </Avatar>
                  </ConditionalComponent>
                </Box>
              </ConditionalComponent>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '70%',
                  alignItems: isCustomer ? 'flex-end' : 'flex-start',
                }}
              >
                <Box
                  sx={{
                    p: '22px',
                    borderRadius: isCustomer ? '24px 24px 0 24px' : '24px 24px 24px 0',
                    background: 'var(--Background-Color, #0F1117)',
                    border: isCustomer ? 'none' : '1px solid rgba(141, 49, 251, 0.3)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#EDEDED',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      lineHeight: 1.4,
                    }}
                  >
                    {message.text}
                  </Typography>
                </Box>
              </Box>

              <ConditionalComponent isValid={isCustomer}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    minWidth: '32px',
                  }}
                >
                  <ConditionalComponent
                    isValid={showAvatar}
                    defaultComponent={<Box sx={{ width: 32, height: 32 }} />}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: '#8F35FB',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      {conversationDetail.customerName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </Avatar>
                  </ConditionalComponent>
                </Box>
              </ConditionalComponent>
            </Box>
          );
        })}
      </Box>
    </Box>
  );

  // Component for client detail view
  const ClientDetailView = () => (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          p: 3,
          background: '#4C2086',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={handleBackToList}
            sx={{
              color: '#EDEDED',
              '&:hover': {
                backgroundColor: 'rgba(141, 49, 251, 0.2)',
              },
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </IconButton>
          <Typography
            sx={{
              color: '#EDEDED',
              fontFamily: 'IBM Plex Sans',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '121.331%',
            }}
          >
            Informations client
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          padding: 3,
          background: '#4C2086',
          overflowY: 'auto',
          maxHeight: '400px',
        }}
      >
        <Card
          sx={{
            background: 'rgba(141, 49, 251, 0.15)',
            borderRadius: '16px',
            border: '1px solid rgba(141, 49, 251, 0.3)',
            mb: 3,
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#8D31FB',
                    fontSize: '24px',
                    fontWeight: 600,
                  }}
                >
                  {selectedClient?.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      color: '#EDEDED',
                      fontFamily: 'IBM Plex Sans',
                      fontSize: '31px',
                      fontWeight: 700,
                      fontStyle: 'normal',
                      mb: 0.5,
                    }}
                  >
                    {selectedClient?.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#9CA3AF',
                      fontFamily: 'Inter',
                      fontSize: '23px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      flexShrink: 0,
                      gap: 0.5,
                    }}
                  >
                    Client depuis {selectedClient?.joinDate}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FontAwesomeIcon
                    icon={faTicketAlt}
                    style={{ color: 'var(--White-color, #EDEDED)', fontSize: '24px' }}
                  />
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      sx={{
                        color: '#EDEDED',
                        fontFamily: 'Inter',
                        fontSize: '20px',
                        fontWeight: 600,
                        lineHeight: '121%',
                        fontStyle: 'normal',
                      }}
                    >
                      {selectedClient?.tickets} Tickets
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FontAwesomeIcon icon={faStar} style={{ color: '#FFD700', fontSize: '24px' }} />
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      sx={{
                        color: '#EDEDED',
                        fontFamily: 'Inter',
                        fontSize: '20px',
                        fontWeight: 700,
                      }}
                    >
                      {selectedClient?.rating}/5
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ color: '#EDEDED', fontSize: '25px' }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        color: '#EDEDED',
                        fontFamily: 'Inter',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '121%',
                      }}
                    >
                      {selectedClient?.email}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: 'flex-end',
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ color: '#EDEDED', fontSize: '25px' }}
                  />
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      sx={{
                        color: '#EDEDED',
                        fontFamily: 'Inter',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '121%',
                      }}
                    >
                      {selectedClient?.phone}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: 'flex-end',
                  }}
                >
                  <FontAwesomeIcon
                    icon={faGlobe}
                    style={{ color: '#EDEDED', fontSize: '25px' }}
                  />
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      sx={{
                        color: '#EDEDED',
                        fontFamily: 'Inter',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '121%',
                      }}
                    >
                      {selectedClient?.location}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ color: '#9CA3AF', fontFamily: 'Inter', fontSize: '14px' }}>
                  {selectedClient?.lastActivity}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );

  // Component for conversation list item
  const ConversationListItem = ({ conversation, index }: { conversation: Conversation; index: number }) => (
    <Box key={conversation.id} sx={{ marginBottom: '20px' }}>
      <Box
        onClick={() => handleConversationClick(conversation.id)}
        onDoubleClick={() => handleConversationDoubleClick(conversation.id)}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          cursor: 'pointer',
          borderRadius: '24px',
          background: 'rgba(141, 49, 251, 0.15)',
          minHeight: '80px',
          '&:hover': {
            background: 'rgba(141, 49, 251, 0.25)',
          },
        }}
      >
        <Avatar
          sx={{
            width: 50,
            height: 50,
            backgroundColor: '#8D31FB',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          {conversation.customerName
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </Avatar>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 0.5,
            }}
          >
            <Typography
              sx={{
                color: '#EDEDED',
                fontFamily: 'IBM Flex Sans',
                fontStyle: 'normal',
                fontSize: '22px',
                fontWeight: 700,
                lineHeight: '121%',
              }}
            >
              {conversation.customerName}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '60px',
                height: '100%',
              }}
            >
              <Typography
                sx={{
                  color: '#9CA3AF',
                  fontFamily: 'IBM Plex Sans',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '121.331%',
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {conversation.timestamp}
              </Typography>

              <Box
                sx={{
                  width: '33px',
                  height: '33px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box style={{ width: '33px', height: '33px', position: 'relative' }}>
                  <Image
                    src={getChannelIcon(conversation.channel)}
                    alt={conversation.channel}
                    fill
                    style={{
                      objectFit: 'contain',
                    }}
                    sizes="24px"
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '88px',
                  height: '27px',
                  flexShrink: 0,
                  borderRadius: '19px',
                  background:
                    conversation.status === 'active'
                      ? 'rgba(16, 185, 129, 0.20)'
                      : 'rgba(239, 68, 68, 0.20)',
                }}
              >
                <Typography
                  sx={{
                    color: conversation.status === 'active' ? '#10B981' : '#EF4444',
                    fontFamily: 'Inter',
                    fontSize: '13px',
                    letterSpacing: '-0.21px',
                    lineHeight: '12.66px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                >
                  {conversation.status === 'active' ? 'Active' : 'Inactive'}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography
            sx={{
              color: 'var(--Secondary-text, #9CA3AF)',
              fontFamily: 'IBM Plex Sans',
              fontSize: '16px',
              fontWeight: 500,
              fontStyle: 'normal',
              lineHeight: '121%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {conversation.lastMessage}
          </Typography>
        </Box>
      </Box>

      <ConditionalComponent isValid={index < filteredConversations.length - 1}>
        <Divider sx={{ borderColor: 'rgba(141, 49, 251, 0.1)' }} />
      </ConditionalComponent>
    </Box>
  );

  // Component for client list item
  const ClientListItem = ({ client, index }: { client: Client; index: number }) => (
    <Box key={client.id} sx={{ marginBottom: '20px' }}>
      <Box
        onClick={() => handleClientClick(client)}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          borderRadius: '24px',
          background: 'rgba(141, 49, 251, 0.15)',
          minHeight: '80px',
          '&:hover': {
            background: 'rgba(141, 49, 251, 0.25)',
          },
        }}
      >
        <Avatar
          sx={{
            width: 50,
            height: 50,
            backgroundColor: '#8D31FB',
            fontSize: '16px',
            fontWeight: 600,
            flexShrink: 0,
            marginRight: '16px',
          }}
        >
          {client.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </Avatar>

        <Box
          sx={{
            minWidth: 0,
            flex: '1 1 300px',
            marginRight: '90px',
          }}
        >
          <Typography
            sx={{
              color: '#EDEDED',
              fontFamily: 'IBM Plex Sans',
              fontSize: '22px',
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {client.name}
          </Typography>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: 'Inter',
              fontSize: '16px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {client.email}
          </Typography>
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            minWidth: '100px',
            marginRight: '90px',
          }}
        >
          <Typography
            sx={{
              color: '#EDEDED',
              fontFamily: 'Inter',
              fontSize: '16px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {client.tickets} tickets
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            flexShrink: 0,
            minWidth: '100px',
            marginRight: '90px',
          }}
        >
          <FontAwesomeIcon
            icon={faStar}
            style={{ color: '#FFD700', fontSize: '24px', flexShrink: 0 }}
          />
          <Typography
            sx={{
              color: '#EDEDED',
              fontFamily: 'Inter',
              fontSize: '16px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {client.rating}/5
          </Typography>
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            minWidth: '120px',
            marginRight: '90px',
          }}
        >
          <Typography
            sx={{
              color: '#EDEDED',
              fontFamily: 'Inter',
              fontSize: '16px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {client.lastActivity}
          </Typography>
        </Box>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleClientClick(client);
          }}
          sx={{
            color: '#8D31FB',
            flexShrink: 0,
            '&:hover': {
              backgroundColor: 'rgba(141, 49, 251, 0.2)',
            },
          }}
        >
          <VisibilityIcon sx={{ fontSize: '25px' }} />
        </IconButton>
      </Box>

      <ConditionalComponent isValid={index < filteredClients.length - 1}>
        <Divider sx={{ borderColor: 'rgba(141, 49, 251, 0.1)' }} />
      </ConditionalComponent>
    </Box>
  );

  // Main list view component
  const MainListView = () => (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Tabs section */}
      <Box
        sx={{
          width: '100%',
          background: 'transparent',
          marginTop: 4,
          marginBottom: '54px',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '405px',
            height: '2px',
            background: '#8D31FB',
            maxWidth: '100%',
          },
        }}
      >
        <Tabs
          value={activeSubTab}
          onChange={handleSubTabChange}
          sx={{
            minHeight: '45px',
            '& .MuiTabs-indicator': {
              height: '2px',
              backgroundColor: '#8D31FB',
              width: '422px',
              maxWidth: '100%',
            },
            '& .MuiTab-root': {
              minHeight: '45px',
              padding: '15px 10px 10px 10px',
              textTransform: 'none',
              background: 'transparent',
              color: '#EDEDED',
              fontFamily: 'Inter',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '15.287px',
              letterSpacing: '-0.255px',
              minWidth: '203px',
              width: 'auto',
              height: '16px',
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '&.Mui-selected': {
                borderRadius: '12px 12px 0 0',
                background: '#8D31FB',
                color: '#EDEDED',
              },
              '&:hover': {
                backgroundColor: 'rgba(141, 49, 251, 0.1)',
              },
              '& .MuiTab-wrapper': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              },
            },
          }}
        >
          <Tab value="history" label="Historique" />
          <Tab value="clients" label="Liste Clients" />
        </Tabs>
      </Box>

      <Box
        sx={{
          borderRadius: '24px',
          background: '#4C2086',
          padding: '20px',
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Header section with title and search */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography
              sx={{
                color: '#EDEDED',
                fontFamily: 'IBM Plex Sans',
                fontSize: '31px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '121.331%',
                flex: 1,
              }}
            >
              {activeSubTab === 'history' ? 'Historique' : 'Liste Clients'}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flex: 2,
                justifyContent: 'flex-end',
              }}
            >
              <ConditionalComponent isValid={activeSubTab === 'history'}>
                <FormControl sx={{ minWidth: 197 }}>
                  <Select
                    value={selectedChannel}
                    onChange={handleChannelChange}
                    displayEmpty
                    IconComponent={ArrowIcon}
                    sx={{
                      height: '30px',
                      color: '#EDEDED',
                      fontFamily: 'Inter',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '30px',
                      letterSpacing: '1px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      '& .MuiSelect-select': {
                        padding: '0 8px',
                        display: 'flex',
                        alignItems: 'center',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#EDEDED',
                      },
                    }}
                  >
                    <MenuItem value="all">Toutes les chaînes</MenuItem>
                    <MenuItem value="whatsapp">WhatsApp</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="messenger">Messenger</MenuItem>
                  </Select>
                </FormControl>
              </ConditionalComponent>

              <TextField
                placeholder={activeSubTab === 'history' ? 'Rechercher' : 'Rechercher un client'}
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  minWidth: '297px',
                  minHeight: '41px',
                  '& .MuiOutlinedInput-root': {
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    background: '#1A1D25',
                    borderRadius: '24px',
                    border: '2px solid transparent',
                    backgroundImage:
                      'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
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
                    <InputAdornment position="end">
                      <SearchIcon sx={{ color: '#8D31FB' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* List content */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            maxHeight: 'calc(600px - 380px)',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(141, 49, 251, 0.1)',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#8D31FB',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#7D21EB',
            },
          }}
        >
          <ConditionalComponent
            isValid={activeSubTab === 'history'}
            defaultComponent={
              <ConditionalComponent
                isValid={filteredClients.length > 0}
                defaultComponent={
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="#EDEDED">
                      Aucun client trouvé
                    </Typography>
                  </Box>
                }
              >
                {filteredClients.map((client, index) => (
                  <ClientListItem key={client.id} client={client} index={index} />
                ))}
              </ConditionalComponent>
            }
          >
            <ConditionalComponent
              isValid={filteredConversations.length > 0}
              defaultComponent={
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="#EDEDED">
                    Aucune conversation trouvée
                  </Typography>
                </Box>
              }
            >
              {filteredConversations.map((conversation, index) => (
                <ConversationListItem key={conversation.id} conversation={conversation} index={index} />
              ))}
            </ConditionalComponent>
          </ConditionalComponent>
        </Box>
      </Box>
    </Box>
  );

  // Main render logic
  return (
    <ConditionalComponent
      isValid={!!conversationDetail && activeSubTab === 'history'}
      defaultComponent={
        <ConditionalComponent
          isValid={!!selectedClient && activeSubTab === 'clients'}
          defaultComponent={<MainListView />}
        >
          <ClientDetailView />
        </ConditionalComponent>
      }
    >
      <ConversationDetailView />
    </ConditionalComponent>
  );
};