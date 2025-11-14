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

export const AgentProfileCard: React.FC<AgentProfileCardProps> = ({
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
  const [isHovered, setIsHovered] = useState(false);

  const currentIsActive = onToggleActive ? isActive : localIsActive;
  const cardOpacity = selectedAgentId ? 0.6 : 1;
  const isSelected = !!selectedAgentId;

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

  // Helper functions for conditional styling
  const defaultBgColor = backgroundColor || '#8D31FB';
  const defaultTitleColor = titleColor || '#8D31FB';

  // Helper to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getBorderColor = () => 
    isSelected ? hexToRgba(defaultBgColor, 0.5) : defaultBgColor;

  const getBoxShadow = () => {
    const shadowColor = hexToRgba(defaultBgColor, isSelected ? 0.25 : 0.5);
    return `0 4.139px 92.53px 30.843px ${shadowColor}`;
  };

  const getBackgroundColor = () => 
    isSelected ? hexToRgba(defaultBgColor, 0.3) : defaultBgColor;

  const getTextColor = () => 
    isSelected ? 'rgba(255, 255, 255, 0.8)' : '#FFFFFF';

  const getSubtitleColor = () => 
    isSelected ? hexToRgba(defaultTitleColor, 0.7) : defaultTitleColor;

  const getAvatarBackgroundColor = () =>
    isSelected ? hexToRgba(defaultBgColor, 0.5) : defaultBgColor;

  const getStatusColor = () =>
    currentIsActive ? '#10B981' : '#EF4444';

  const getStatusBackground = () =>
    currentIsActive ? 'rgba(16, 185, 129, 0.20)' : 'rgba(239, 68, 68, 0.20)';

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: '267px',
        height: 'auto',
        flexShrink: 0,
        borderRadius: '24px',
        backgroundColor: backgroundColor ? 'transparent' : 'rgba(141, 49, 251, 0.2)',
        position: 'relative',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '50px',
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
      {/* Avatar positioned absolutely at the top, overlapping the card */}
      <Box
        sx={{
          position: 'absolute',
          top: '5px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '195px',
          height: '670px',
          zIndex: 10,
          filter: 'drop-shadow(0 5px 20px rgba(0, 0, 0, 0.3))',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            alt="Agent Avatar"
            src={avatar}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center bottom',
              borderRadius: '17.469px',
            }}
            sizes="195px"
          />
        </Box>
      </Box>

      {/* Shadow overlay on avatar - transparent at top, black at bottom */}
      <Box
        sx={{
          position: 'absolute',
          top: '5px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '195px',
          height: '670px',
          borderRadius: '17.469px',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.00) 40%, rgba(0, 0, 0, 0.3) 60%, rgba(26, 29, 37, 0.8) 80%, #1A1D25 100%)',
          pointerEvents: 'none',
          zIndex: 11,
        }}
      />

      {/* Main Card Container */}
      <Box
        sx={{
          position: 'relative',
          width: '199.747px',
          height: '690px',
          mt: '-5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        {/* Background Border with colored border */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '17.469px',
            border: `2.833px solid ${getBorderColor()}`,
            boxShadow: isHovered
              ? (backgroundColor
                  ? `0 6px 24px ${defaultBgColor}60`
                  : '0 6px 24px rgba(141, 49, 251, 0.6)')
              : getBoxShadow(),
            backgroundColor: getBackgroundColor(),
            overflow: 'hidden',
            zIndex: 0,
            transition: 'all 0.3s ease',
          }}
        />

        {/* Main Card */}
        <Box
          sx={{
            width: '169.413px',
            height: '670px',
            position: 'relative',
            borderRadius: '17.469px',
            background: getBackgroundColor(),
            overflow: 'visible',
            boxShadow: getBoxShadow(),
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            zIndex: 1,
            marginTop: '5.1675px',
            marginLeft: '7px',
          }}
        >
        </Box>
      </Box>

      {/* Agent Name - positioned absolutely on top of everything */}
      <Typography
        sx={{
          position: 'absolute',
          bottom: 'calc(50px - 5px + 5.1675px + 100px)',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 20,
          width: '169.413px',
          color: '#FFF',
          fontFamily: theme.typography.fontTertiaryFamily,
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '15.287px',
          letterSpacing: '-0.255px',
          textTransform: 'uppercase',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
          pointerEvents: 'none',
        }}
      >
        {agentName}
      </Typography>

      {/* Agent Title - positioned absolutely on top of everything */}
      <Typography
        sx={{
          position: 'absolute',
          bottom: 'calc(50px - 5px + 5.1675px + 75px)',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 20,
          width: '169.413px',
          color: getSubtitleColor(),
          fontFamily: theme.typography.fontFamily,
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '15.287px',
          letterSpacing: '-0.255px',
          textTransform: 'uppercase',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
          pointerEvents: 'none',
        }}
      >
        {agentTitle}
      </Typography>

      {/* Status Section */}
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
          {/* Status Text */}
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

          {/* Switch or Spacer based on selection state */}
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

      {/* Sub Agents Section - Only show if there are subAgents or add functionality */}
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