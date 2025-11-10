import React, { useState } from 'react';
import {
    Box,
    Typography,
    useTheme,
} from '@mui/material';
import { AgentProfileCard } from '@/shared/components';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { SectionHeader } from './components/section-header';
import { IntegrationSection } from './components/integration-section';
import { menuOptions } from '@/shared/_mock/community-manager-config';

interface SectionContent {
    title: string;
    subtitle: string;
}

const getSectionContent = (optionId: string): SectionContent => {
    const contentMap: Record<string, SectionContent> = {
        integrations: {
            title: "Intégrations d'agent",
            subtitle: 'Connectez des outils externes et des canaux de communication pour cet agent.',
        },
        configuration: {
            title: 'Configuration',
            subtitle: 'Configurez les paramètres et les préférences de votre agent.',
        },
        idees: {
            title: 'Idées',
            subtitle: 'Gérez et organisez vos idées et suggestions pour la communauté.',
        },
        calendar: {
            title: 'Calendar',
            subtitle: 'Planifiez et gérez les événements et les rendez-vous de la communauté.',
        },
        galerie: {
            title: 'Galerie',
            subtitle: 'Consultez et gérez les médias et contenus visuels de la communauté.',
        },
        statistiques: {
            title: 'Statistiques',
            subtitle: 'Analysez les performances et les métriques de votre communauté.',
        },
    };

    return contentMap[optionId] || { title: '', subtitle: '' };
};

export const CommunityManagerView: React.FC = () => {
    const theme = useTheme();
    const [isAgentActive, setIsAgentActive] = useState(true);
    const [selectedOption, setSelectedOption] = useState<string>('integrations');

    const sectionContent = getSectionContent(selectedOption);


    return (
        <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
            <Box sx={{ width: '100%', p: { xs: 1, sm: 1.5, md: 1.5 } }}>
                <Box
                    sx={{
                        width: '100%',
                        minHeight: 'calc(100vh - 32px)',
                        borderRadius: { xs: '16px', md: '24px' },
                        border: '2px solid transparent',
                        background: `
              linear-gradient(#1a1a2e, #0d2d45) padding-box,
              linear-gradient(45deg, #BE30FF, #5D31F8, #00A3FF) border-box
            `,
                        backgroundColor: 'rgb(13, 45, 69)',
                        display: 'flex',
                        position: 'relative',
                        mx: 'auto',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgb(13, 45, 69)',
                            borderRadius: { xs: '16px', md: '24px' },
                            zIndex: 0,
                        }}
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            position: 'relative',
                            zIndex: 1,
                            flex: 1,
                            minHeight: '100%',
                            overflow: 'visible',
                        }}
                    >
                        <Box
                            sx={{
                                width: '260px',
                                height: 'auto',
                                minHeight: '100%',
                                flexShrink: 0,
                                borderRadius: { xs: '16px', md: '24px' },
                                backgroundColor: 'rgb(12, 68, 106)',
                                position: 'relative',
                                zIndex: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '8px 20px 24px 20px',
                                gap: '16px',
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '0' }}>
                                <AgentProfileCard
                                    agentName="Ziri"
                                    agentTitle="Community Manager"
                                    avatar={"/avatars/ziri-avatar.png"}
                                    backgroundColor="#069eff"
                                    titleColor="#069eff"
                                    isActive={isAgentActive}
                                    onToggleActive={setIsAgentActive}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', mt: -2 }}>
                                {menuOptions.map((option) => {
                                    const isActive = selectedOption === option.id;
                                    return (
                                        <Box
                                            key={option.id}
                                            component="button"
                                            onClick={() => setSelectedOption(option.id)}
                                            sx={{
                                                width: '100%',
                                                py: 1.5,
                                                px: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                borderRadius: '8px',
                                                background: isActive ? 'rgb(11, 86, 136)' : 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: isActive ? '#069EFF' : '#EDEDED',
                                                fontFamily: theme.typography.fontFamily,
                                                fontSize: '20px',
                                                fontStyle: 'normal',
                                                fontWeight: isActive ? 700 : 500,
                                                lineHeight: 'normal',
                                                transition: 'all 0.2s ease',
                                                textAlign: 'left',
                                                mb: 1,
                                                minHeight: '48px',
                                                '&:last-child': {
                                                    mb: 0,
                                                },
                                                '&:hover': {
                                                    background: isActive ? 'rgb(11, 86, 136)' : 'rgba(6, 158, 255, 0.20)',
                                                    color: isActive ? '#069EFF' : '#069EFF',
                                                },
                                            }}
                                        >
                                            <FontAwesomeIcon icon={option.icon as any} style={{ fontSize: '18px', flexShrink: 0 }} />
                                            <Typography
                                                sx={{
                                                    flex: '1 1 auto',
                                                    textAlign: 'left',
                                                    fontFamily: theme.typography.fontFamily,
                                                    fontSize: '20px',
                                                    fontStyle: 'normal',
                                                    fontWeight: isActive ? 700 : 500,
                                                    lineHeight: 'normal',
                                                    color: 'inherit',
                                                }}
                                            >
                                                {option.label}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: '100%',
                                position: 'relative',
                                padding: '24px',
                                height: 'auto',
                                boxShadow: 'none',
                                borderRadius: { xs: '16px', md: '24px' },
                                zIndex: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    flex: 1,
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    minHeight: 0,
                                    '&::-webkit-scrollbar': {
                                        width: '0px',
                                        background: 'transparent',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: 'transparent',
                                    },
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                }}
                            >
                                {selectedOption === 'integrations' ? (
                                    <IntegrationSection />
                                ) : (
                                    <SectionHeader title={sectionContent.title} subtitle={sectionContent.subtitle} />
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CommunityManagerView;