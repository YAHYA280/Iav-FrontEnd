import React, { useState } from 'react';
import { Box, Typography, Switch, Chip, useTheme } from '@mui/material';
import { SubAgentsSection } from '../sub-agents-section';
import Image from 'next/image';
import ConditionalComponent from '../../conditionalComponent';

interface SubAgent {
  id: string;
  name: string;
  isActive: boolean;
  avatar?: string;
}

interface AgentProfileCardProps {
  agentName?: string;
  agentTitle?: string;
  avatar?: string;
  backgroundColor?: string;
  titleColor?: string;
  isActive?: boolean;
  onToggleActive?: (active: boolean) => void;
  subAgents?: SubAgent[];
  selectedAgentId?: string | null;
  onSubAgentSelect?: (agentId: string | null) => void;
  onAddSubAgent?: (name: string) => void;
  onToggleSubAgent?: (id: string, active: boolean) => void;
  onSubAgentMenuClick?: (id: string, action: string) => void;
}

export const AgentCard: React.FC<AgentProfileCardProps> = ({
  agentName = 'ITRI',
  agentTitle = 'Agent service client & sav',
  avatar = '/avatars/ziri-avatar.png',
  backgroundColor,
  titleColor,
  isActive = true,
  onToggleActive,
  subAgents = [],
  selectedAgentId = null,
  onSubAgentSelect,
  onAddSubAgent,
  onToggleSubAgent,
  onSubAgentMenuClick,
}) => {
  const theme = useTheme();
  const [localIsActive, setLocalIsActive] = useState(isActive);

  const currentIsActive = onToggleActive ? isActive : localIsActive;
  const cardOpacity = selectedAgentId ? 0.6 : 1;
  const isSelected = !!selectedAgentId;

  const defaultBgColor = backgroundColor || '#8D31FB';
  const finalTitleColor = titleColor || '#8D31FB';

  const handleMainCardClick = () => {
    if (selectedAgentId) {
      onSubAgentSelect?.(null);
    }
  };

  const handleToggleMainAgent = (newActiveStatus: boolean) => {
    if (onToggleActive) {
      onToggleActive(newActiveStatus);
    } else {
      setLocalIsActive(newActiveStatus);
    }

    if (!newActiveStatus && onToggleSubAgent) {
      subAgents.forEach((subAgent) => {
        if (subAgent.isActive) {
          onToggleSubAgent(subAgent.id, false);
        }
      });
    }
  };
  const getBorderColor = () => {
    if (backgroundColor) {
      return isSelected ? `${defaultBgColor}80` : defaultBgColor;
    }
    return isSelected ? 'rgba(141, 49, 251, 0.5)' : '#8D31FB';
  };

  const getBoxShadow = () => {
    if (backgroundColor) {
      return isSelected
        ? `0 4.139px 92.53px 30.843px ${defaultBgColor}40`
        : `0 4.139px 92.53px 30.843px ${defaultBgColor}80`;
    }
    return isSelected
      ? '0 4.139px 92.53px 30.843px rgba(141, 49, 251, 0.25)'
      : '0 4.139px 92.53px 30.843px rgba(141, 49, 251, 0.50)';
  };

  const getBackgroundColor = () => {
    if (backgroundColor) {
      return isSelected ? `${defaultBgColor}4D` : defaultBgColor;
    }
    return isSelected ? 'rgba(141, 49, 251, 0.3)' : '#8D31FB';
  };

  const getTextColor = () =>
    isSelected ? 'rgba(255, 255, 255, 0.8)' : '#FFFFFF';

  const getSubtitleColor = () => {
    if (titleColor) {
      return isSelected ? `${finalTitleColor}B3` : finalTitleColor;
    }
    return isSelected ? 'rgba(141, 49, 251, 0.7)' : '#8D31FB';
  };

  const getAvatarBackgroundColor = () => {
    if (backgroundColor) {
      return isSelected ? `${defaultBgColor}80` : defaultBgColor;
    }
    return isSelected ? 'rgba(141, 49, 251, 0.5)' : '#8D31FB';
  };

  const getStatusColor = () =>
    currentIsActive ? '#10B981' : '#EF4444';

  const getStatusBackground = () =>
    currentIsActive ? 'rgba(16, 185, 129, 0.20)' : 'rgba(239, 68, 68, 0.20)';

  return (
    <Box
      sx={{
        width: '267px',
        height: 'auto',
        flexShrink: 0,
        borderRadius: '24px',
        backgroundColor: backgroundColor ? 'transparent' : `rgba(141, 49, 251, 0.2)`,
        position: 'relative',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pb: 4,
        opacity: cardOpacity,
        transition: 'all 0.3s ease',
        cursor: isSelected ? 'pointer' : 'default',
        '&:hover': isSelected
          ? {
            backgroundColor: backgroundColor ? 'transparent' : 'rgba(141, 49, 251, 0.15)',
            opacity: 0.8,
          }
          : {},
      }}
      onClick={handleMainCardClick}
    >
      <Box
        sx={{
          position: 'relative',
          paddingTop: '50px',
          width: '169.413px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 2,
          opacity: cardOpacity,
        }}
      >
        {avatar && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '145px',
              height: '670px',
              zIndex: 10,
              filter: 'drop-shadow(0 5px 20px rgba(0, 0, 0, 0.3))',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <Image
              alt="Agent Avatar"
              src={avatar}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
              sizes="145px"
            />
          </Box>
        )}

        <Box
          sx={{
            width: '169.413px',
            height: '670px',
            position: 'relative',
            borderRadius: '17.469px',
            background: getBackgroundColor(),
            overflow: 'visible',
            boxShadow: getBoxShadow(),
            border: `2.833px solid ${getBorderColor()}`,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: backgroundColor
                ? `0 6px 24px ${defaultBgColor}60`
                : '0 6px 24px rgba(141, 49, 251, 0.6)',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '60%',
              borderRadius: '17.469px',
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 25.21%, #1A1D25 86.3%)',
              pointerEvents: 'none',
              zIndex: 11,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '17.469px',
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 25.21%, rgba(26, 29, 37, 0.7) 70%, #1A1D25 86.3%)',
              zIndex: 1,
            }}
          />
          <Typography
            sx={{
              color: '#FFF',
              textAlign: 'center',
              fontFamily: theme.typography.fontTertiaryFamily,
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '15.287px',
              letterSpacing: '-0.255px',
              textTransform: 'uppercase',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              bottom: '65px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 12,
              width: '100%',
            }}
          >
            {agentName}
          </Typography>
          <Typography
            sx={{
              color: finalTitleColor,
              fontFamily: theme.typography.fontFamily,
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '15.287px',
              letterSpacing: '-0.255px',
              textTransform: 'uppercase',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              bottom: '25px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 12,
              width: '100%',
              textAlign: 'center',
            }}
          >
            {agentTitle}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          zIndex: 3,
          marginTop: '20px',
          width: '100%',
          mb: 2,
          opacity: cardOpacity,
        }}
      >
        <Box
          sx={{
            width: '156px',
            height: '42px',
            flexShrink: 0,
            borderRadius: '36px',
            background: getStatusBackground(),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            gap: '8px',
            opacity: 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          <Typography
            sx={{
              color: getStatusColor(),
              fontFamily: 'Inter',
              fontSize: '20px',
              letterSpacing: '-0.21px',
              lineHeight: '12.66px',
              fontWeight: 500,
              textTransform: 'capitalize',
              opacity: isSelected ? 0.8 : 1,
            }}
          >
            {currentIsActive ? 'Active' : 'Inactive'}
          </Typography>

          <ConditionalComponent
            isValid={!isSelected}
            defaultComponent={<Box sx={{ width: '52px' }} />}
          >
            <Switch
              checked={currentIsActive}
              onChange={(e) => {
                e.stopPropagation();
                handleToggleMainAgent(e.target.checked);
              }}
              onClick={(e) => e.stopPropagation()}
              sx={{
                width: '52px',
                height: '28px',
                padding: 0,
                '& .MuiSwitch-switchBase': {
                  padding: '4px',
                  '&.Mui-checked': {
                    transform: 'translateX(24px)',
                    color: '#fff',
                    '& + .MuiSwitch-track': {
                      backgroundColor: '#10B981',
                    },
                  },
                },
                '& .MuiSwitch-thumb': {
                  width: '20px',
                  height: '20px',
                  boxShadow: 'none',
                },
                '& .MuiSwitch-track': {
                  borderRadius: '14px',
                  backgroundColor: '#EF4444',
                },
              }}
            />
          </ConditionalComponent>
        </Box>
      </Box>

      <ConditionalComponent isValid={subAgents.length > 0 || !!onAddSubAgent}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <SubAgentsSection
            subAgents={subAgents}
            selectedAgentId={selectedAgentId}
            onSubAgentSelect={onSubAgentSelect}
            onAddSubAgent={onAddSubAgent}
            onToggleSubAgent={onToggleSubAgent}
            onSubAgentMenuClick={onSubAgentMenuClick}
          />
        </Box>
      </ConditionalComponent>

    </Box>
  );
};