'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Select, MenuItem, Container, IconButton } from '@mui/material';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { agentColors } from '@/contexts/theme/agent-theme-context';
import { GalaxyBackground } from '@/shared/components/backgrounds/galaxy-background';
import DarkVeil from '@/shared/components/backgrounds/DarkVeil';
import { CustomSelect } from '@/shared/components/ui/custom-select';
import type { WizardData, FAQ } from '@/shared/types/wizard';
import {
  wizardSteps,
  businessModels,
  teamSizes,
  requestVolumes,
  objectives,
  features,
  toneOptions,
  languages,
  communicationIntegrations,
  ticketingIntegrations,
  ecommerceIntegrations,
} from '@/shared/_mock/wizard-data';

interface ItriWizardProps {
  onBack: () => void;
  onComplete: (data: WizardData) => void;
}

export const ItriWizard: React.FC<ItriWizardProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = wizardSteps.length;
  const agentColor = agentColors.itri || agentColors.default;
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [wizardData, setWizardData] = useState<WizardData>({
    objectives: [],
    features: features.filter((f) => f.defaultSelected).map((f) => f.id),
    faqs: [
      {
        id: '1',
        question: 'Quels sont vos délais de livraison ?',
        answer: 'Nos délais sont de 24-48h pour les grandes villes et 3-5 jours pour les autres villes.',
        category: 'Livraison',
      },
    ],
    notifications: [],
    languages: ['fr'],
    communicationChannels: [],
    ticketingSystems: [],
    ecommerceTools: [],
  });

  const [showAddFaq, setShowAddFaq] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: '' });

  // Availability schedule state
  const [availabilityMode, setAvailabilityMode] = useState<'24/7' | 'business' | 'custom'>('custom');
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      days: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
      startTime: '09:00',
      endTime: '18:00',
    },
  ]);

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 'new-ticket',
      icon: '🎫',
      title: 'Nouveau ticket créé',
      description: 'Alerte immédiate quand un ticket est créé',
      enabled: true,
    },
    {
      id: 'pending-ticket',
      icon: '⏰',
      title: 'Ticket en attente',
      description: 'Ticket sans réponse',
      enabled: true,
      delay: '1 heure',
    },
    {
      id: 'reopened-ticket',
      icon: '🔄',
      title: 'Ticket réouvert',
      description: 'Client répond après fermeture',
      enabled: true,
    },
    {
      id: 'integration-disconnected',
      icon: '⚠️',
      title: 'Intégration déconnectée',
      description: 'Alerte problème intégration',
      enabled: true,
    },
  ]);

  // Global notification channels (shared by all notification types)
  const [notificationChannels, setNotificationChannels] = useState({
    activeChannel: 'email',
    email: 'support@example.com',
    whatsapp: '',
    telegram: '',
  });

  // Integration configuration state
  const [activeIntegrationTab, setActiveIntegrationTab] = useState<string>('');
  const [integrationConfigs, setIntegrationConfigs] = useState<Record<string, any>>({});

  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  // Get all selected integrations
  const selectedIntegrations = React.useMemo(() => {
    return [
      ...wizardData.communicationChannels.map(id => {
        const integration = communicationIntegrations.find(i => i.id === id);
        return integration ? { ...integration, category: 'communication' as const } : null;
      }),
      ...wizardData.ticketingSystems.map(id => {
        const integration = ticketingIntegrations.find(i => i.id === id);
        return integration ? { ...integration, category: 'ticketing' as const } : null;
      }),
      ...wizardData.ecommerceTools.map(id => {
        const integration = ecommerceIntegrations.find(i => i.id === id);
        return integration ? { ...integration, category: 'ecommerce' as const } : null;
      })
    ].filter((item): item is NonNullable<typeof item> => item !== null);
  }, [wizardData.communicationChannels, wizardData.ticketingSystems, wizardData.ecommerceTools]);

  // Set the first integration as active when integrations change
  useEffect(() => {
    if (selectedIntegrations.length > 0 && !activeIntegrationTab) {
      setActiveIntegrationTab(selectedIntegrations[0].id);
    }
  }, [selectedIntegrations, activeIntegrationTab]);

  // Animate entrance
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  // Animate step changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          x: -30,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentStep((prev) => prev + 1);
          },
        });
      }
    } else {
      onComplete(wizardData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          x: 30,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentStep((prev) => prev - 1);
          },
        });
      }
    }
  };

  const handleBackClick = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          onBack();
        },
      });
    }
  };

  const handleGoToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps && step !== currentStep) {
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          x: step > currentStep ? -30 : 30,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentStep(step);
          },
        });
      }
    }
  };

  const handleObjectiveToggle = (objectiveId: string) => {
    setWizardData((prev) => {
      const isSelected = prev.objectives.includes(objectiveId);
      if (isSelected) {
        return {
          ...prev,
          objectives: prev.objectives.filter((id) => id !== objectiveId),
        };
      } else if (prev.objectives.length < 3) {
        return {
          ...prev,
          objectives: [...prev.objectives, objectiveId],
        };
      }
      return prev;
    });
  };

  const handleFeatureToggle = (featureId: string) => {
    setWizardData((prev) => {
      const isSelected = prev.features.includes(featureId);
      if (isSelected) {
        return {
          ...prev,
          features: prev.features.filter((id) => id !== featureId),
        };
      } else {
        return {
          ...prev,
          features: [...prev.features, featureId],
        };
      }
    });
  };

  const handleLanguageToggle = (languageId: string) => {
    setWizardData((prev) => {
      const isSelected = prev.languages.includes(languageId);
      if (isSelected) {
        return {
          ...prev,
          languages: prev.languages.filter((id) => id !== languageId),
        };
      } else {
        return {
          ...prev,
          languages: [...prev.languages, languageId],
        };
      }
    });
  };

  const handleAddFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      const faq: FAQ = {
        id: Date.now().toString(),
        question: newFaq.question,
        answer: newFaq.answer,
        category: newFaq.category || undefined,
      };
      setWizardData((prev) => ({
        ...prev,
        faqs: [...prev.faqs, faq],
      }));
      setNewFaq({ question: '', answer: '', category: '' });
      setShowAddFaq(false);
    }
  };

  const handleDeleteFaq = (faqId: string) => {
    setWizardData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== faqId),
    }));
  };

  const handleIntegrationToggle = (
    category: 'communication' | 'ticketing' | 'ecommerce',
    id: string
  ) => {
    setWizardData((prev) => {
      const key =
        category === 'communication'
          ? 'communicationChannels'
          : category === 'ticketing'
          ? 'ticketingSystems'
          : 'ecommerceTools';

      const isSelected = prev[key].includes(id);
      if (isSelected) {
        return {
          ...prev,
          [key]: prev[key].filter((itemId) => itemId !== id),
        };
      } else {
        return {
          ...prev,
          [key]: [...prev[key], id],
        };
      }
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderWelcomeStep();
      case 2:
        return renderStep1();
      case 3:
        return renderStep2();
      case 4:
        return renderStep3();
      case 5:
        return renderStep4();
      case 6:
        return renderStep5Notifications();
      case 7:
        return renderStep7Integration();
      case 8:
        return renderStep8IntegrationConfig();
      case 9:
        return renderStep9Resume();
      default:
        return null;
    }
  };

  // Welcome Step
  const renderWelcomeStep = () => (
    <Box>
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto',
          pt: { xs: 2, md: 4 },
          pb: 4,
        }}
      >
       

        {/* Welcome Title */}
        <Typography
          sx={{
            fontSize: { xs: '36px', md: '48px' },
            fontWeight: 700,
            mb: 3,
            color: '#FFF',
            fontFamily: 'var(--font-tertiary)',
            textShadow: '0 4px 16px rgba(0,0,0,0.5)',
            letterSpacing: '-1px',
          }}
        >
          Configurez votre agent ITRI
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: { xs: '17px', md: '19px' },
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: 1.8,
            mb: { xs: 5, md: 6 },
            maxWidth: '700px',
            margin: '0 auto',
            fontFamily: 'var(--font-primary)',
          }}
        >
          ITRI est votre assistant intelligent de service client qui va révolutionner la manière dont
          vous interagissez avec vos clients. En quelques étapes simples, nous allons le configurer
          selon vos besoins spécifiques.
        </Typography>

        {/* Steps Preview - Horizontal Flow */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
            mb: { xs: 6, md: 8 },
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {[
            { icon: '👥', text: 'Contexte' },
            { icon: '🎯', text: 'Objectifs' },
            { icon: '⚙️', text: 'Fonctionnalités' },
            { icon: '💬', text: 'Identité' },
            { icon: '🔔', text: 'Notifications' },
            { icon: '🔗', text: 'Intégrations' },
            { icon: '🔧', text: 'Configuration' },
            { icon: '📋', text: 'Résumé' },
          ].map((step, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${agentColor.primary}22`,
                borderRadius: '12px',
                padding: '10px 18px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: `${agentColor.primary}15`,
                  borderColor: `${agentColor.primary}66`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 16px ${agentColor.glow}`,
                },
              }}
            >
              <Box sx={{ fontSize: '20px' }}>{step.icon}</Box>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                {step.text}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Features Preview Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '20px 24px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: `${agentColor.primary}66`,
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 32px ${agentColor.glow}`,
              },
            }}
          >
            <Box sx={{ fontSize: '48px', mb: 2 }}>⚡</Box>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#FFF',
                mb: 0.5,
                fontFamily: 'var(--font-primary)',
              }}
            >
              Rapide & Efficace
            </Typography>
            <Typography
              sx={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              Configuration en 5 minutes
            </Typography>
          </Box>

          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '20px 24px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: `${agentColor.primary}66`,
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 32px ${agentColor.glow}`,
              },
            }}
          >
            <Box sx={{ fontSize: '48px', mb: 2 }}>🎯</Box>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#FFF',
                mb: 0.5,
                fontFamily: 'var(--font-primary)',
              }}
            >
              Personnalisé
            </Typography>
            <Typography
              sx={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              Adapté à vos besoins
            </Typography>
          </Box>

          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '20px 24px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: `${agentColor.primary}66`,
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 32px ${agentColor.glow}`,
              },
            }}
          >
            <Box sx={{ fontSize: '48px', mb: 2 }}>🚀</Box>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#FFF',
                mb: 0.5,
                fontFamily: 'var(--font-primary)',
              }}
            >
              Prêt à l&apos;emploi
            </Typography>
            <Typography
              sx={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              Déploiement immédiat
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  // Step 1: Context
  const renderStep1 = () => (
    <Box sx={{ maxWidth: '700px', margin: '0 auto' }}>
      {/* Business Model */}
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 700,
            mb: 2,
            color: 'rgba(255, 255, 255, 0.85)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          Modèle commercial <span style={{ color: '#ef4444' }}>*</span>
        </Typography>
        <CustomSelect
          value={wizardData.businessModel || ''}
          onChange={(value) => setWizardData({ ...wizardData, businessModel: value })}
          options={businessModels}
          placeholder="Sélectionnez votre modèle commercial"
          primaryColor={agentColor.primary}
          glowColor={agentColor.glow}
        />
      </Box>

      {/* Team Size */}
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 700,
            mb: 2,
            color: 'rgba(255, 255, 255, 0.85)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          Taille d&apos;équipe <span style={{ color: '#ef4444' }}>*</span>
        </Typography>
        <CustomSelect
          value={wizardData.teamSize || ''}
          onChange={(value) => setWizardData({ ...wizardData, teamSize: value })}
          options={teamSizes}
          placeholder="Sélectionnez la taille de votre équipe"
          primaryColor={agentColor.primary}
          glowColor={agentColor.glow}
        />
      </Box>

      {/* Request Volume */}
      <Box>
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 700,
            mb: 2,
            color: 'rgba(255, 255, 255, 0.85)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          Volume de demandes par jour <span style={{ color: '#ef4444' }}>*</span>
        </Typography>
        <CustomSelect
          value={wizardData.requestVolume || ''}
          onChange={(value) => setWizardData({ ...wizardData, requestVolume: value })}
          options={requestVolumes}
          placeholder="Sélectionnez le volume de demandes"
          primaryColor={agentColor.primary}
          glowColor={agentColor.glow}
        />
      </Box>
    </Box>
  );

  // Step 2: Objectives
  const renderStep2 = () => (
    <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${agentColor.primary}08, ${agentColor.primary}03)`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${agentColor.primary}33`,
          borderRadius: '16px',
          padding: 2.5,
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ fontSize: '24px' }}>💡</Box>
        <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
          Sélectionnez jusqu&apos;à 3 objectifs qui correspondent le mieux à vos priorités actuelles
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 2.5,
        }}
      >
        {objectives.map((objective) => {
          const isSelected = wizardData.objectives.includes(objective.id);
          return (
            <Box
              key={objective.id}
              onClick={() => handleObjectiveToggle(objective.id)}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: '16px 20px',
                background: isSelected
                  ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                  : 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isSelected
                  ? `2px solid ${agentColor.primary}`
                  : '2px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isSelected ? `0 4px 16px ${agentColor.glow}` : 'none',
                isolation: 'isolate',
                willChange: 'transform',
                '&:hover': {
                  background: isSelected
                    ? `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}08)`
                    : 'rgba(255, 255, 255, 0.06)',
                  borderColor: `${agentColor.primary}66`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 20px ${agentColor.glow}`,
                  '& .shine-effect': {
                    transform: 'translateX(100%)',
                  },
                },
              }}
            >
              {/* Shine effect */}
              <Box
                className="shine-effect"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.7s ease-out',
                  pointerEvents: 'none',
                }}
              />

              <Box
                sx={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  border: `2px solid ${isSelected ? agentColor.primary : 'rgba(255, 255, 255, 0.3)'}`,
                  background: isSelected ? agentColor.primary : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {isSelected && (
                  <FontAwesomeIcon icon="check" style={{ fontSize: '11px', color: '#FFF' }} />
                )}
              </Box>
              <Box sx={{ fontSize: '28px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                {objective.icon}
              </Box>
              <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '15px',
                    fontWeight: 700,
                    mb: 0.5,
                    color: '#FFF',
                    fontFamily: 'var(--font-primary)',
                    lineHeight: 1.3,
                  }}
                >
                  {objective.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.4,
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {objective.description}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );

  // Step 3: Features
  const renderStep3 = () => (
    <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${agentColor.primary}08, ${agentColor.primary}03)`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${agentColor.primary}33`,
          borderRadius: '16px',
          padding: 2.5,
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ fontSize: '24px' }}>⚙️</Box>
        <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
          Sélectionnez les fonctionnalités que votre agent doit avoir
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 2.5,
        }}
      >
        {features.map((feature) => {
          const isSelected = wizardData.features.includes(feature.id);
          return (
            <Box
              key={feature.id}
              onClick={() => handleFeatureToggle(feature.id)}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: '16px 20px',
                background: isSelected
                  ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                  : 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isSelected
                  ? `2px solid ${agentColor.primary}`
                  : '2px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isSelected ? `0 4px 16px ${agentColor.glow}` : 'none',
                isolation: 'isolate',
                willChange: 'transform',
                '&:hover': {
                  background: isSelected
                    ? `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}08)`
                    : 'rgba(255, 255, 255, 0.06)',
                  borderColor: `${agentColor.primary}66`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 20px ${agentColor.glow}`,
                  '& .shine-effect': {
                    transform: 'translateX(100%)',
                  },
                },
              }}
            >
              {/* Shine effect */}
              <Box
                className="shine-effect"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.7s ease-out',
                  pointerEvents: 'none',
                }}
              />

              <Box
                sx={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  border: `2px solid ${isSelected ? agentColor.primary : 'rgba(255, 255, 255, 0.3)'}`,
                  background: isSelected ? agentColor.primary : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {isSelected && (
                  <FontAwesomeIcon icon="check" style={{ fontSize: '11px', color: '#FFF' }} />
                )}
              </Box>
              <Box sx={{ fontSize: '28px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                {feature.icon}
              </Box>
              <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '15px',
                    fontWeight: 700,
                    mb: 0.5,
                    color: '#FFF',
                    fontFamily: 'var(--font-primary)',
                    lineHeight: 1.3,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.4,
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );

  // Step 4: Identity (Tone + Languages + FAQ + Availability)
  const renderStep4 = () => (
    <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Tone Selection */}
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 700,
            mb: 2,
            color: 'rgba(255, 255, 255, 0.85)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          Tonalité de communication <span style={{ color: '#ef4444' }}>*</span>
        </Typography>
        <CustomSelect
          value={wizardData.tone || ''}
          onChange={(value) => setWizardData({ ...wizardData, tone: value })}
          options={toneOptions}
          placeholder="Sélectionnez le ton de communication"
          primaryColor={agentColor.primary}
          glowColor={agentColor.glow}
        />
      </Box>

      {/* Languages Selection */}
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 700,
            mb: 3,
            color: 'rgba(255, 255, 255, 0.85)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          Langues supportées <span style={{ color: '#ef4444' }}>*</span>
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {languages.map((language) => {
            const isSelected = wizardData.languages.includes(language.id);
            return (
              <Box
                key={language.id}
                onClick={() => handleLanguageToggle(language.id)}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: isSelected
                    ? `2px solid ${agentColor.primary}`
                    : '2px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: '#FFF',
                  fontFamily: 'var(--font-primary)',
                  boxShadow: isSelected
                    ? `0 4px 16px ${agentColor.glow}`
                    : 'none',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.04)',
                    borderColor: `${agentColor.primary}66`,
                    transform: 'scale(1.05) translateY(-2px)',
                    '& .shine-effect': {
                      transform: 'translateX(100%)',
                    },
                  },
                }}
              >
                {/* Shine effect */}
                <Box
                  className="shine-effect"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.7s ease-out',
                    pointerEvents: 'none',
                  }}
                />
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  {language.icon} {language.title}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Availability Schedule */}
      <Box sx={{ mb: 6 }}>
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 700,
            mb: 3,
            color: 'rgba(255, 255, 255, 0.85)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          Horaire de disponibilité <span style={{ color: '#ef4444' }}>*</span>
        </Typography>

        {/* Preset Options */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 2,
            mb: 3,
          }}
        >
          <Box
            onClick={() => setAvailabilityMode('24/7')}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              background: availabilityMode === '24/7'
                ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                : 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: availabilityMode === '24/7'
                ? `2px solid ${agentColor.primary}`
                : '2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '24px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: availabilityMode === '24/7' ? `0 4px 16px ${agentColor.glow}` : 'none',
              '&:hover': {
                background: availabilityMode === '24/7'
                  ? `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}08)`
                  : 'rgba(255, 255, 255, 0.06)',
                borderColor: `${agentColor.primary}66`,
                transform: 'scale(1.05) translateY(-2px)',
                '& .shine-effect': {
                  transform: 'translateX(100%)',
                },
              },
            }}
          >
            {/* Shine effect */}
            <Box
              className="shine-effect"
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.7s ease-out',
                pointerEvents: 'none',
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ fontSize: '36px', mb: 1.5 }}>🌐</Box>
              <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#FFF', fontFamily: 'var(--font-primary)' }}>
                24h/24, 7j/7
              </Typography>
            </Box>
          </Box>

          <Box
            onClick={() => setAvailabilityMode('business')}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              background: availabilityMode === 'business'
                ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                : 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: availabilityMode === 'business'
                ? `2px solid ${agentColor.primary}`
                : '2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '24px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: availabilityMode === 'business' ? `0 4px 16px ${agentColor.glow}` : 'none',
              '&:hover': {
                background: availabilityMode === 'business'
                  ? `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}08)`
                  : 'rgba(255, 255, 255, 0.06)',
                borderColor: `${agentColor.primary}66`,
                transform: 'scale(1.05) translateY(-2px)',
                '& .shine-effect': {
                  transform: 'translateX(100%)',
                },
              },
            }}
          >
            {/* Shine effect */}
            <Box
              className="shine-effect"
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.7s ease-out',
                pointerEvents: 'none',
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ fontSize: '36px', mb: 1.5 }}>🏢</Box>
              <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#FFF', fontFamily: 'var(--font-primary)' }}>
                Heures bureau
              </Typography>
              <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', mt: 0.5 }}>
                9h-18h
              </Typography>
            </Box>
          </Box>

          <Box
            onClick={() => setAvailabilityMode('custom')}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              background: availabilityMode === 'custom'
                ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                : 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: availabilityMode === 'custom'
                ? `2px solid ${agentColor.primary}`
                : '2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '24px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: availabilityMode === 'custom' ? `0 4px 16px ${agentColor.glow}` : 'none',
              '&:hover': {
                background: availabilityMode === 'custom'
                  ? `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}08)`
                  : 'rgba(255, 255, 255, 0.06)',
                borderColor: `${agentColor.primary}66`,
                transform: 'scale(1.05) translateY(-2px)',
                '& .shine-effect': {
                  transform: 'translateX(100%)',
                },
              },
            }}
          >
            {/* Shine effect */}
            <Box
              className="shine-effect"
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.7s ease-out',
                pointerEvents: 'none',
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ fontSize: '36px', mb: 1.5 }}>⚡</Box>
              <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#FFF', fontFamily: 'var(--font-primary)' }}>
                Personnalisé
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Custom Schedules Section */}
        {availabilityMode === 'custom' && (
          <Box>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                mb: 3,
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              Définir les créneaux horaires personnalisés
            </Typography>

            {schedules.map((schedule, index) => (
              <Box
                key={schedule.id}
                sx={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: 3,
                  mb: 2,
                }}
              >
                {/* Schedule Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#FFF', fontFamily: 'var(--font-primary)' }}>
                    Créneau {index + 1}
                  </Typography>
                  {schedules.length > 1 && (
                    <Box
                      component="button"
                      onClick={() => setSchedules(schedules.filter((s) => s.id !== schedule.id))}
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        background: '#ef4444',
                        color: '#FFF',
                        padding: '8px 16px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '13px',
                        fontFamily: 'var(--font-primary)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: '#dc2626',
                          transform: 'scale(1.05)',
                          '& .shine-effect': {
                            transform: 'translateX(100%)',
                          },
                        },
                      }}
                    >
                      {/* Shine effect */}
                      <Box
                        className="shine-effect"
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                          transform: 'translateX(-100%)',
                          transition: 'transform 0.7s ease-out',
                          pointerEvents: 'none',
                        }}
                      />
                      <Box sx={{ position: 'relative', zIndex: 1 }}>
                        🗑️ Supprimer
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* Days Selection */}
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: 1.5, color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-primary)' }}>
                    Jours de la semaine
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => {
                      const isActive = schedule.days.includes(day);
                      return (
                        <Box
                          key={day}
                          onClick={() => {
                            const newSchedules = [...schedules];
                            const currentSchedule = newSchedules[index];
                            if (isActive) {
                              currentSchedule.days = currentSchedule.days.filter((d) => d !== day);
                            } else {
                              currentSchedule.days = [...currentSchedule.days, day];
                            }
                            setSchedules(newSchedules);
                          }}
                          sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            padding: '10px 16px',
                            background: isActive ? agentColor.primary : 'rgba(255, 255, 255, 0.05)',
                            border: `2px solid ${isActive ? agentColor.primary : 'rgba(255, 255, 255, 0.1)'}`,
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#FFF',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontFamily: 'var(--font-primary)',
                            '&:hover': {
                              background: isActive ? agentColor.primary : `${agentColor.primary}22`,
                              borderColor: agentColor.primary,
                              transform: 'scale(1.05)',
                              '& .shine-effect': {
                                transform: 'translateX(100%)',
                              },
                            },
                          }}
                        >
                          {/* Shine effect */}
                          <Box
                            className="shine-effect"
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                              transform: 'translateX(-100%)',
                              transition: 'transform 0.7s ease-out',
                              pointerEvents: 'none',
                            }}
                          />
                          <Box sx={{ position: 'relative', zIndex: 1 }}>
                            {day}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>

                {/* Time Inputs */}
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: 1.5, color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-primary)' }}>
                    Heures d&apos;ouverture
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '12px', mb: 1, color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-primary)' }}>
                        De
                      </Typography>
                      <Box
                        component="input"
                        type="time"
                        value={schedule.startTime}
                        onChange={(e) => {
                          const newSchedules = [...schedules];
                          newSchedules[index].startTime = e.target.value;
                          setSchedules(newSchedules);
                        }}
                        sx={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'rgba(0, 0, 0, 0.3)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: '#FFF',
                          fontSize: '14px',
                          fontFamily: 'var(--font-primary)',
                          fontWeight: 600,
                          '&:focus': {
                            outline: 'none',
                            borderColor: agentColor.primary,
                            boxShadow: `0 0 0 2px ${agentColor.glow}`,
                          },
                        }}
                      />
                    </Box>
                    <Typography sx={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.5)', pt: 3 }}>à</Typography>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '12px', mb: 1, color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-primary)' }}>
                        À
                      </Typography>
                      <Box
                        component="input"
                        type="time"
                        value={schedule.endTime}
                        onChange={(e) => {
                          const newSchedules = [...schedules];
                          newSchedules[index].endTime = e.target.value;
                          setSchedules(newSchedules);
                        }}
                        sx={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'rgba(0, 0, 0, 0.3)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: '#FFF',
                          fontSize: '14px',
                          fontFamily: 'var(--font-primary)',
                          fontWeight: 600,
                          '&:focus': {
                            outline: 'none',
                            borderColor: agentColor.primary,
                            boxShadow: `0 0 0 2px ${agentColor.glow}`,
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}

            {/* Add Schedule Button */}
            <Box
              component="button"
              onClick={() => {
                const newId = Math.max(...schedules.map((s) => s.id)) + 1;
                setSchedules([
                  ...schedules,
                  {
                    id: newId,
                    days: [],
                    startTime: '09:00',
                    endTime: '18:00',
                  },
                ]);
              }}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}dd)`,
                color: '#FFF',
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '14px',
                fontFamily: 'var(--font-primary)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': {
                  transform: 'scale(1.05) translateY(-2px)',
                  boxShadow: `0 6px 20px ${agentColor.glow}`,
                  '& .shine-effect': {
                    transform: 'translateX(100%)',
                  },
                },
              }}
            >
              {/* Shine effect */}
              <Box
                className="shine-effect"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.7s ease-out',
                  pointerEvents: 'none',
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                + Ajouter un créneau
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.75)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Questions fréquentes
        </Typography>

        <Box
          component="button"
          onClick={() => setShowAddFaq(!showAddFaq)}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}dd)`,
            color: '#FFF',
            padding: '10px 20px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            boxShadow: `0 4px 12px ${agentColor.glow}`,
            '&:hover': {
              transform: 'scale(1.05) translateY(-2px)',
              boxShadow: `0 6px 20px ${agentColor.glow}`,
              '& .shine-effect': {
                transform: 'translateX(100%)',
              },
            },
          }}
        >
          {/* Shine effect */}
          <Box
            className="shine-effect"
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              transform: 'translateX(-100%)',
              transition: 'transform 0.7s ease-out',
              pointerEvents: 'none',
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <FontAwesomeIcon icon="plus" />
            Ajouter
          </Box>
        </Box>
      </Box>

      {showAddFaq && (
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '20px',
            padding: 3.5,
            mb: 3,
          }}
        >
          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                mb: 1.5,
                fontWeight: 600,
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Question <span style={{ color: '#ef4444' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={newFaq.question}
              onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
              placeholder="Quels sont vos délais de livraison ?"
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFF',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-primary)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: `${agentColor.primary}66`,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: agentColor.primary,
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                mb: 1.5,
                fontWeight: 600,
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Réponse <span style={{ color: '#ef4444' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={newFaq.answer}
              onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
              placeholder="Nos délais sont de 24-48h..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFF',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-primary)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: `${agentColor.primary}66`,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: agentColor.primary,
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                mb: 1.5,
                fontWeight: 600,
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Catégorie
            </Typography>
            <Select
              fullWidth
              value={newFaq.category}
              onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
              sx={{
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                color: '#FFF',
                borderRadius: '12px',
                fontFamily: 'var(--font-primary)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: '2px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: `${agentColor.primary}66`,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: agentColor.primary,
                },
              }}
            >
              <MenuItem value="">Aucune catégorie</MenuItem>
              <MenuItem value="Livraison">Livraison</MenuItem>
              <MenuItem value="Paiement">Paiement</MenuItem>
              <MenuItem value="Retours">Retours</MenuItem>
              <MenuItem value="Produits">Produits</MenuItem>
            </Select>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Box
              component="button"
              onClick={handleAddFaq}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                flex: 1,
                background: '#10b981',
                color: '#FFF',
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#059669',
                  transform: 'scale(1.05) translateY(-2px)',
                  '& .shine-effect': {
                    transform: 'translateX(100%)',
                  },
                },
              }}
            >
              {/* Shine effect */}
              <Box
                className="shine-effect"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.7s ease-out',
                  pointerEvents: 'none',
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                ✓ Enregistrer
              </Box>
            </Box>
            <Box
              component="button"
              onClick={() => setShowAddFaq(false)}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                flex: 1,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                color: '#FFF',
                padding: '12px 24px',
                borderRadius: '12px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: `${agentColor.primary}66`,
                  background: 'rgba(255, 255, 255, 0.08)',
                  transform: 'scale(1.05)',
                  '& .shine-effect': {
                    transform: 'translateX(100%)',
                  },
                },
              }}
            >
              {/* Shine effect */}
              <Box
                className="shine-effect"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.7s ease-out',
                  pointerEvents: 'none',
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                Annuler
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {wizardData.faqs.map((faq) => (
          <Box
            key={faq.id}
            sx={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '20px',
              padding: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: `${agentColor.primary}33`,
                background: 'rgba(255, 255, 255, 0.03)',
              },
            }}
          >
            {faq.category && (
              <Box
                sx={{
                  display: 'inline-block',
                  background: `${agentColor.primary}22`,
                  color: agentColor.primary,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {faq.category}
              </Box>
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  flex: 1,
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#FFF',
                  pr: 2,
                  fontFamily: 'var(--font-primary)',
                }}
              >
                {faq.question}
              </Typography>
              <Box
                component="button"
                onClick={() => handleDeleteFaq(faq.id)}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#ef4444',
                  color: '#FFF',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '13px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: '#dc2626',
                    transform: 'scale(1.05) translateY(-2px)',
                    '& .shine-effect': {
                      transform: 'translateX(100%)',
                    },
                  },
                }}
              >
                {/* Shine effect */}
                <Box
                  className="shine-effect"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.7s ease-out',
                    pointerEvents: 'none',
                  }}
                />
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  🗑️ Supprimer
                </Box>
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.7,
                fontFamily: 'var(--font-primary)',
              }}
            >
              {faq.answer}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );

  // Step 5: Notifications
  const renderStep5Notifications = () => {
    const pendingTicketNotif = notifications.find((n) => n.id === 'pending-ticket');

    return (
      <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Notification Types Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2.5,
            mb: 5,
          }}
        >
          {notifications.map((notif, index) => (
            <Box
              key={notif.id}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                background: notif.enabled
                  ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                  : 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: notif.enabled
                  ? `2px solid ${agentColor.primary}66`
                  : '2px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: 2.5,
                transition: 'all 0.3s ease',
                isolation: 'isolate',
                willChange: 'transform',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: `${agentColor.primary}88`,
                  transform: 'translateX(4px)',
                  '& .shine-effect': {
                    transform: 'translateX(100%)',
                  },
                },
              }}
              onClick={() => {
                const newNotifs = [...notifications];
                newNotifs[index].enabled = !newNotifs[index].enabled;
                setNotifications(newNotifs);
              }}
            >
              {/* Shine effect */}
              <Box
                className="shine-effect"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.7s ease-out',
                  pointerEvents: 'none',
                }}
              />

              <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                {/* Toggle Switch */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '48px',
                    height: '24px',
                    background: notif.enabled ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                    border: `2px solid ${notif.enabled ? '#10b981' : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '16px',
                    flexShrink: 0,
                    mt: 0.25,
                    transition: 'all 0.3s ease',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '16px',
                      height: '16px',
                      background: '#FFF',
                      borderRadius: '50%',
                      top: '2px',
                      left: notif.enabled ? '24px' : '2px',
                      transition: 'all 0.3s ease',
                    },
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Box sx={{ fontSize: '24px' }}>{notif.icon}</Box>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#FFF',
                        fontFamily: 'var(--font-primary)',
                      }}
                    >
                      {notif.title}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '13px',
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.5,
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {notif.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Delay selector for pending ticket (if enabled) */}
        {pendingTicketNotif?.enabled && (
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: 3,
              mb: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                mb: 2,
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              ⏰ Délai avant alerte pour &quot;Ticket en attente&quot;
            </Typography>
            <Select
              fullWidth
              value={pendingTicketNotif.delay || '1 heure'}
              onChange={(e) => {
                const newNotifs = [...notifications];
                const index = newNotifs.findIndex((n) => n.id === 'pending-ticket');
                if (index !== -1) {
                  newNotifs[index].delay = e.target.value;
                  setNotifications(newNotifs);
                }
              }}
              sx={{
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                color: '#FFF',
                borderRadius: '12px',
                fontFamily: 'var(--font-primary)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: '2px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: `${agentColor.primary}66`,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: agentColor.primary,
                },
              }}
            >
              <MenuItem value="30 minutes">30 minutes</MenuItem>
              <MenuItem value="1 heure">1 heure</MenuItem>
              <MenuItem value="2 heures">2 heures</MenuItem>
              <MenuItem value="4 heures">4 heures</MenuItem>
            </Select>
          </Box>
        )}

        {/* Shared Channels Configuration */}
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: 3.5,
          }}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              mb: 3,
              color: '#FFF',
              fontFamily: 'var(--font-primary)',
            }}
          >
            📢 Canaux de notification
          </Typography>

          {/* Channel Tabs */}
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
            {['email', 'whatsapp', 'telegram'].map((channel) => (
              <Box
                key={channel}
                onClick={() => {
                  setNotificationChannels({ ...notificationChannels, activeChannel: channel });
                }}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '12px 24px',
                  background:
                    notificationChannels.activeChannel === channel
                      ? `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}dd)`
                      : 'rgba(0, 0, 0, 0.3)',
                  border: `2px solid ${notificationChannels.activeChannel === channel ? agentColor.primary : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: '#FFF',
                  fontFamily: 'var(--font-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  '&:hover': {
                    borderColor: `${agentColor.primary}66`,
                    transform: 'scale(1.05)',
                    '& .shine-effect': {
                      transform: 'translateX(100%)',
                    },
                  },
                }}
              >
                {/* Shine effect */}
                <Box
                  className="shine-effect"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.7s ease-out',
                    pointerEvents: 'none',
                  }}
                />
                <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  {channel === 'email' && '📧 Email'}
                  {channel === 'whatsapp' && '💬 WhatsApp'}
                  {channel === 'telegram' && '✈️ Telegram'}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Channel Content */}
          {notificationChannels.activeChannel === 'email' && (
            <Box>
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: 600,
                  mb: 1.5,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                Adresse email
              </Typography>
              <TextField
                fullWidth
                type="email"
                value={notificationChannels.email}
                onChange={(e) => {
                  setNotificationChannels({ ...notificationChannels, email: e.target.value });
                }}
                placeholder="support@example.com"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFF',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-primary)',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: `${agentColor.primary}66`,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: agentColor.primary,
                    },
                  },
                }}
              />
            </Box>
          )}

          {notificationChannels.activeChannel === 'whatsapp' && (
            <Box>
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: 600,
                  mb: 1.5,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                Numéro WhatsApp
              </Typography>
              <TextField
                fullWidth
                type="tel"
                value={notificationChannels.whatsapp}
                onChange={(e) => {
                  setNotificationChannels({ ...notificationChannels, whatsapp: e.target.value });
                }}
                placeholder="+212 6 XX XX XX XX"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFF',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-primary)',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: `${agentColor.primary}66`,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: agentColor.primary,
                    },
                  },
                }}
              />
            </Box>
          )}

          {notificationChannels.activeChannel === 'telegram' && (
            <Box>
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: 600,
                  mb: 1.5,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                Chat ID Telegram
              </Typography>
              <TextField
                fullWidth
                type="text"
                value={notificationChannels.telegram}
                onChange={(e) => {
                  setNotificationChannels({ ...notificationChannels, telegram: e.target.value });
                }}
                placeholder="123456789"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFF',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-primary)',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: `${agentColor.primary}66`,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: agentColor.primary,
                    },
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  // Step 7: Integration Selection
  const renderStep7Integration = () => {
    // Combine all integrations with their categories
    const allIntegrations = [
      ...communicationIntegrations.map(i => ({ ...i, category: 'communication' as const })),
      ...ticketingIntegrations.map(i => ({ ...i, category: 'ticketing' as const })),
      ...ecommerceIntegrations.map(i => ({ ...i, category: 'ecommerce' as const }))
    ];

    return (
      <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${agentColor.primary}08, ${agentColor.primary}03)`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${agentColor.primary}33`,
            borderRadius: '16px',
            padding: 2.5,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ fontSize: '24px' }}>🔗</Box>
          <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
            Sélectionnez les intégrations que votre agent utilisera
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 2.5,
          }}
        >
          {allIntegrations.map((integration) => {
            const isSelected =
              integration.category === 'communication' ? wizardData.communicationChannels.includes(integration.id) :
              integration.category === 'ticketing' ? wizardData.ticketingSystems.includes(integration.id) :
              wizardData.ecommerceTools.includes(integration.id);

            return (
              <Box
                key={integration.id}
                onClick={() => handleIntegrationToggle(integration.category, integration.id)}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  padding: '16px 20px',
                  background: isSelected
                    ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                    : 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: isSelected
                    ? `2px solid ${agentColor.primary}`
                    : '2px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isSelected ? `0 4px 16px ${agentColor.glow}` : 'none',
                  isolation: 'isolate',
                  willChange: 'transform',
                  '&:hover': {
                    background: isSelected
                      ? `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}08)`
                      : 'rgba(255, 255, 255, 0.06)',
                    borderColor: `${agentColor.primary}66`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px ${agentColor.glow}`,
                    '& .shine-effect': {
                      transform: 'translateX(100%)',
                    },
                  },
                }}
              >
                {/* Shine effect */}
                <Box
                  className="shine-effect"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.7s ease-out',
                    pointerEvents: 'none',
                  }}
                />

                <Box
                  sx={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '6px',
                    border: `2px solid ${isSelected ? agentColor.primary : 'rgba(255, 255, 255, 0.3)'}`,
                    background: isSelected ? agentColor.primary : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {isSelected && (
                    <FontAwesomeIcon icon="check" style={{ fontSize: '11px', color: '#FFF' }} />
                  )}
                </Box>
                <Box sx={{ fontSize: '28px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                  {integration.icon}
                </Box>
                <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: 700,
                      mb: 0.5,
                      color: '#FFF',
                      fontFamily: 'var(--font-primary)',
                      lineHeight: 1.3,
                    }}
                  >
                    {integration.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '13px',
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.4,
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {integration.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  // Step 7: Finalization
  // Step 8: Integration Configuration with Tabs
  const renderStep8IntegrationConfig = () => {
    if (selectedIntegrations.length === 0) {
      return (
        <Box sx={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <Box
            sx={{
              background: `linear-gradient(135deg, ${agentColor.primary}08, ${agentColor.primary}03)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${agentColor.primary}33`,
              borderRadius: '16px',
              padding: 4,
            }}
          >
            <Box sx={{ fontSize: '64px', mb: 2 }}>ℹ️</Box>
            <Typography sx={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>
              Aucune intégration sélectionnée. Vous pouvez passer à l&apos;étape suivante.
            </Typography>
          </Box>
        </Box>
      );
    }

    const activeTab = selectedIntegrations.find(i => i.id === activeIntegrationTab) || selectedIntegrations[0];

    return (
      <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Tabs */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            mb: 3,
            pb: 1,
            borderBottom: `2px solid ${agentColor.primary}22`,
            overflowX: 'auto',
            '&::-webkit-scrollbar': { height: '6px' },
            '&::-webkit-scrollbar-thumb': {
              background: agentColor.primary,
              borderRadius: '3px'
            },
          }}
        >
          {selectedIntegrations.map((integration) => (
            <Box
              key={integration.id}
              onClick={() => setActiveIntegrationTab(integration.id)}
              sx={{
                padding: '12px 24px',
                background: activeIntegrationTab === integration.id
                  ? `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}cc)`
                  : 'rgba(255, 255, 255, 0.03)',
                border: `2px solid ${activeIntegrationTab === integration.id ? agentColor.primary : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '12px 12px 0 0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                whiteSpace: 'nowrap',
                '&:hover': {
                  borderColor: `${agentColor.primary}66`,
                  background: activeIntegrationTab === integration.id
                    ? `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}cc)`
                    : 'rgba(255, 255, 255, 0.06)',
                },
              }}
            >
              <Box sx={{ fontSize: '20px' }}>{integration.icon}</Box>
              <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#FFF' }}>
                {integration.title}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Tab Content */}
        {renderIntegrationConfigContent(activeTab)}
      </Box>
    );
  };

  // Helper function to render integration configuration content
  const renderIntegrationConfigContent = (integration: any) => {
    const configData = integrationConfigs[integration.id] || {};

    const updateConfig = (field: string, value: string) => {
      setIntegrationConfigs(prev => ({
        ...prev,
        [integration.id]: {
          ...prev[integration.id],
          [field]: value
        }
      }));
    };

    // Configuration guides for different integrations
    const renderGuideAndForm = () => {
      switch (integration.id) {
        case 'whatsapp':
          return (
            <>
              {/* Guide Card */}
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`,
                  border: `2px solid ${agentColor.primary}`,
                  borderRadius: '16px',
                  padding: 3.5,
                  mb: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box sx={{ fontSize: '28px' }}>💬</Box>
                  <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#FFF' }}>
                    Guide de configuration WhatsApp Business
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)', mb: 2.5, lineHeight: 1.6 }}>
                  Pour connecter WhatsApp Business à IAVIA, vous devez créer une application Meta et obtenir vos identifiants API.
                </Typography>

                {/* Steps */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    'Créez une application sur Meta for Developers',
                    'Activez WhatsApp Business API dans votre application',
                    'Récupérez votre Phone Number ID, WhatsApp Business Account ID et Access Token',
                    'Configurez le webhook avec l\'URL fournie par IAVIA'
                  ].map((step, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                        padding: 2,
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                      }}
                    >
                      <Box
                        sx={{
                          width: '32px',
                          height: '32px',
                          background: agentColor.primary,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '14px',
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)', pt: 0.5, lineHeight: 1.5 }}>
                        {step}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Form */}
              <Box
                sx={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '2px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: 3.5,
                }}
              >
                <Box sx={{ mb: 2.5 }}>
                  <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                    Phone Number ID <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="123456789012345"
                    value={configData.phoneNumberId || ''}
                    onChange={(e) => updateConfig('phoneNumberId', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                        '&:hover fieldset': { borderColor: `${agentColor.primary}66` },
                        '&.Mui-focused fieldset': { borderColor: agentColor.primary },
                      },
                      '& .MuiOutlinedInput-input': { color: '#FFF' },
                    }}
                  />
                  <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                    ID du numéro de téléphone WhatsApp Business
                  </Typography>
                </Box>

                <Box sx={{ mb: 2.5 }}>
                  <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                    WhatsApp Business Account ID <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="987654321098765"
                    value={configData.accountId || ''}
                    onChange={(e) => updateConfig('accountId', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                        '&:hover fieldset': { borderColor: `${agentColor.primary}66` },
                        '&.Mui-focused fieldset': { borderColor: agentColor.primary },
                      },
                      '& .MuiOutlinedInput-input': { color: '#FFF' },
                    }}
                  />
                  <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                    ID de votre compte WhatsApp Business
                  </Typography>
                </Box>

                <Box sx={{ mb: 2.5 }}>
                  <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                    Access Token <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="EAAxxxxxxxxxxxxxxxxxxxxxxxxx"
                    value={configData.accessToken || ''}
                    onChange={(e) => updateConfig('accessToken', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                        '&:hover fieldset': { borderColor: `${agentColor.primary}66` },
                        '&.Mui-focused fieldset': { borderColor: agentColor.primary },
                      },
                      '& .MuiOutlinedInput-input': { color: '#FFF' },
                    }}
                  />
                  <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                    Token d&apos;accès permanent généré depuis Meta for Developers
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                    Webhook Verify Token <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="mon_token_secret_123"
                    value={configData.verifyToken || ''}
                    onChange={(e) => updateConfig('verifyToken', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                        '&:hover fieldset': { borderColor: `${agentColor.primary}66` },
                        '&.Mui-focused fieldset': { borderColor: agentColor.primary },
                      },
                      '& .MuiOutlinedInput-input': { color: '#FFF' },
                    }}
                  />
                  <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                    Token de vérification pour sécuriser votre webhook
                  </Typography>
                </Box>
              </Box>
            </>
          );

        case 'freshdesk':
          return (
            <>
              {/* Guide Card */}
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`,
                  border: `2px solid ${agentColor.primary}`,
                  borderRadius: '16px',
                  padding: 3.5,
                  mb: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box sx={{ fontSize: '28px' }}>📋</Box>
                  <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#FFF' }}>
                    Guide de configuration Freshdesk
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)', mb: 2.5, lineHeight: 1.6 }}>
                  Pour connecter votre compte Freshdesk à IAVIA, vous aurez besoin de votre domaine Freshdesk et d&apos;une clé API.
                </Typography>

                {/* Steps */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    'Connectez-vous à votre compte Freshdesk',
                    'Accédez à Profil → Paramètres de profil',
                    'Dans la section Clé API, copiez votre clé ou générez-en une nouvelle',
                    'Collez votre domaine et votre clé API dans les champs ci-dessous'
                  ].map((step, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                        padding: 2,
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                      }}
                    >
                      <Box
                        sx={{
                          width: '32px',
                          height: '32px',
                          background: agentColor.primary,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '14px',
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)', pt: 0.5, lineHeight: 1.5 }}>
                        {step}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Form */}
              <Box
                sx={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '2px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: 3.5,
                }}
              >
                <Box sx={{ mb: 2.5 }}>
                  <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                    Domaine Freshdesk <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="votreentreprise.freshdesk.com"
                    value={configData.domain || ''}
                    onChange={(e) => updateConfig('domain', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                        '&:hover fieldset': { borderColor: `${agentColor.primary}66` },
                        '&.Mui-focused fieldset': { borderColor: agentColor.primary },
                      },
                      '& .MuiOutlinedInput-input': { color: '#FFF' },
                    }}
                  />
                  <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                    Votre domaine Freshdesk (sans https://)
                  </Typography>
                </Box>

                <Box sx={{ mb: 2.5 }}>
                  <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                    Clé API Freshdesk <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="xxxxxxxxxxxxxxxxxxxx"
                    value={configData.apiKey || ''}
                    onChange={(e) => updateConfig('apiKey', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                        '&:hover fieldset': { borderColor: `${agentColor.primary}66` },
                        '&.Mui-focused fieldset': { borderColor: agentColor.primary },
                      },
                      '& .MuiOutlinedInput-input': { color: '#FFF' },
                    }}
                  />
                  <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                    Trouvez votre clé API dans Profil {'>'} Paramètres de votre compte Freshdesk
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                    Groupe par défaut (optionnel)
                  </Typography>
                  <Select
                    fullWidth
                    value={configData.defaultGroup || 'none'}
                    onChange={(e) => updateConfig('defaultGroup', e.target.value)}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '12px',
                      color: '#FFF',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: `${agentColor.primary}66` },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: agentColor.primary },
                    }}
                  >
                    <MenuItem value="none">Aucun groupe spécifique</MenuItem>
                    <MenuItem value="support">Support Technique</MenuItem>
                    <MenuItem value="customer-service">Service Client</MenuItem>
                    <MenuItem value="billing">Facturation</MenuItem>
                  </Select>
                  <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                    Les tickets créés par l&apos;agent seront assignés à ce groupe
                  </Typography>
                </Box>
              </Box>
            </>
          );

        default:
          return (
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '2px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: 4,
                textAlign: 'center',
              }}
            >
              <Box sx={{ fontSize: '48px', mb: 2 }}>{integration.icon}</Box>
              <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                Configuration de {integration.title}
              </Typography>
              <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)' }}>
                Les instructions de configuration pour cette intégration seront ajoutées prochainement.
              </Typography>
            </Box>
          );
      }
    };

    return renderGuideAndForm();
  };

  // Step 9: Resume/Summary - Redesigned
  const renderStep9Resume = () => {
    const getSelectedItems = (ids: string[], items: any[]) => {
      return ids.map(id => items.find(item => item.id === id)).filter(Boolean);
    };

    const selectedObjectives = getSelectedItems(wizardData.objectives, objectives);
    const selectedFeatures = getSelectedItems(wizardData.features, features);
    const selectedLanguages = getSelectedItems(wizardData.languages, languages);
    const selectedCommunication = getSelectedItems(wizardData.communicationChannels, communicationIntegrations);
    const selectedTicketing = getSelectedItems(wizardData.ticketingSystems, ticketingIntegrations);
    const selectedEcommerce = getSelectedItems(wizardData.ecommerceTools, ecommerceIntegrations);

    const allIntegrations = [...selectedCommunication, ...selectedTicketing, ...selectedEcommerce];

    // Helper component for summary cards with glass effect
    const SummaryCard = ({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) => (
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: 2.5,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          isolation: 'isolate',
          '&:hover': {
            borderColor: `${agentColor.primary}66`,
            transform: 'translateY(-4px)',
            boxShadow: `0 8px 24px ${agentColor.glow}`,
            '& .shine-effect': {
              transform: 'translateX(100%)',
            },
          },
        }}
      >
        {/* Shine effect */}
        <Box
          className="shine-effect"
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.7s ease-out',
            pointerEvents: 'none',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{ fontSize: '24px' }}>{icon}</Box>
            <Typography sx={{ fontSize: '17px', fontWeight: 700, color: '#FFF' }}>
              {title}
            </Typography>
          </Box>
          {children}
        </Box>
      </Box>
    );

    return (
      <Box sx={{ maxWidth: '950px', margin: '0 auto' }}>
        

        {/* 2 Column Grid - Card per Step */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 2.5,
            mb: 3,
          }}
        >
          {/* Step 1: Context */}
          {wizardData.businessModel && (
            <SummaryCard icon="👥" title="Contexte">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>
                  <strong style={{ color: '#FFF' }}>Modèle:</strong> {businessModels.find(b => b.id === wizardData.businessModel)?.title}
                </Typography>
                {wizardData.teamSize && (
                  <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>
                    <strong style={{ color: '#FFF' }}>Équipe:</strong> {teamSizes.find(t => t.id === wizardData.teamSize)?.title}
                  </Typography>
                )}
                {wizardData.requestVolume && (
                  <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>
                    <strong style={{ color: '#FFF' }}>Volume:</strong> {requestVolumes.find(r => r.id === wizardData.requestVolume)?.title}/jour
                  </Typography>
                )}
              </Box>
            </SummaryCard>
          )}

          {/* Step 2: Objectives */}
          {selectedObjectives.length > 0 && (
            <SummaryCard icon="🎯" title="Objectifs">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedObjectives.slice(0, 4).map(obj => (
                  <Box
                    key={obj.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      padding: '5px 12px',
                      background: `${agentColor.primary}15`,
                      border: `1px solid ${agentColor.primary}33`,
                      borderRadius: '8px',
                    }}
                  >
                    <Box sx={{ fontSize: '16px' }}>{obj.icon}</Box>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#FFF' }}>
                      {obj.title}
                    </Typography>
                  </Box>
                ))}
                {selectedObjectives.length > 4 && (
                  <Box
                    sx={{
                      padding: '5px 12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                    }}
                  >
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)' }}>
                      +{selectedObjectives.length - 4}
                    </Typography>
                  </Box>
                )}
              </Box>
            </SummaryCard>
          )}

          {/* Step 3: Features */}
          {selectedFeatures.length > 0 && (
            <SummaryCard icon="⚙️" title="Fonctionnalités">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedFeatures.slice(0, 5).map(feature => (
                  <Box
                    key={feature.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      padding: '5px 12px',
                      background: `${agentColor.primary}15`,
                      border: `1px solid ${agentColor.primary}33`,
                      borderRadius: '8px',
                    }}
                  >
                    <Box sx={{ fontSize: '14px' }}>{feature.icon}</Box>
                    <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#FFF' }}>
                      {feature.title}
                    </Typography>
                  </Box>
                ))}
                {selectedFeatures.length > 5 && (
                  <Box
                    sx={{
                      padding: '5px 12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                    }}
                  >
                    <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)' }}>
                      +{selectedFeatures.length - 5}
                    </Typography>
                  </Box>
                )}
              </Box>
            </SummaryCard>
          )}

          {/* Step 4: Identity - Tone */}
          {wizardData.tone && (
            <SummaryCard icon="💬" title="Identité">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    padding: '8px 16px',
                    background: `${agentColor.primary}15`,
                    border: `1px solid ${agentColor.primary}33`,
                    borderRadius: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box sx={{ fontSize: '20px' }}>🎭</Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
                    {toneOptions.find(t => t.id === wizardData.tone)?.title}
                  </Typography>
                </Box>
              </Box>
            </SummaryCard>
          )}

          {/* Step 5: Languages */}
          {selectedLanguages.length > 0 && (
            <SummaryCard icon="🌐" title="Langues">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedLanguages.map(lang => (
                  <Box
                    key={lang.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      padding: '5px 12px',
                      background: `${agentColor.primary}15`,
                      border: `1px solid ${agentColor.primary}33`,
                      borderRadius: '8px',
                    }}
                  >
                    <Box sx={{ fontSize: '16px' }}>{lang.icon}</Box>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#FFF' }}>
                      {lang.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </SummaryCard>
          )}

          {/* Step 6: Notifications */}
          {notifications.some(n => n.enabled) && (
            <SummaryCard icon="🔔" title="Notifications">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>
                  <strong style={{ color: '#FFF' }}>Canal:</strong>{' '}
                  {notificationChannels.activeChannel === 'email' ? '📧 Email' :
                   notificationChannels.activeChannel === 'whatsapp' ? '💬 WhatsApp' :
                   '📱 Telegram'}
                </Typography>
                <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>
                  {notifications.filter(n => n.enabled).length} types activés
                </Typography>
              </Box>
            </SummaryCard>
          )}

          {/* Step 7: Integrations - Full Width */}
          {allIntegrations.length > 0 && (
            <Box sx={{ gridColumn: { xs: '1', md: 'span 2' } }}>
              <SummaryCard icon="🔗" title="Intégrations">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {allIntegrations.map(integration => (
                    <Box
                      key={integration.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        padding: '6px 14px',
                        background: `${agentColor.primary}15`,
                        border: `1px solid ${agentColor.primary}33`,
                        borderRadius: '10px',
                      }}
                    >
                      <Box sx={{ fontSize: '18px' }}>{integration.icon}</Box>
                      <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#FFF' }}>
                        {integration.title}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </SummaryCard>
            </Box>
          )}
        </Box>

        {/* Final CTA */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `2px solid ${agentColor.primary}`,
            borderRadius: '20px',
            padding: 4,
            textAlign: 'center',
            isolation: 'isolate',
          }}
        >
          <Box sx={{ fontSize: '56px', mb: 2 }}>🚀</Box>
          <Typography sx={{ fontSize: '24px', fontWeight: 700, mb: 1, color: '#FFF' }}>
            Tout est prêt !
          </Typography>
          <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
            Cliquez sur &quot;Créer l&apos;agent&quot; pour déployer votre assistant intelligent
          </Typography>
        </Box>
      </Box>
    );
  };

  const currentStepData = wizardSteps[currentStep - 1];

  return (
    <>
      {/* Galaxy Background - Full Screen */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <GalaxyBackground enableParallax={false} />
      </Box>

      {/* DarkVeil Background - Full Screen */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.25,
        }}
      >
        <DarkVeil
          targetColor={agentColor.primary}
          speed={1.5}
          warpAmount={0.4}
          noiseIntensity={0.03}
        />
      </Box>

      {/* Return Button - Fixed Position (like detail page) */}
      <IconButton
        onClick={handleBackClick}
        sx={{
          position: 'fixed',
          top: { xs: 20, md: 30 },
          left: { xs: 20, md: 30 },
          color: '#FFF',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: '48px',
          height: '48px',
          zIndex: 101,
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderColor: `${agentColor.primary}66`,
            boxShadow: `0 4px 20px ${agentColor.glow}`,
          },
        }}
      >
        <FontAwesomeIcon icon="chevron-left" />
      </IconButton>

      {/* Main Container */}
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          zIndex: 1,
        }}
      >

        {/* Progress Bar - Sticky */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'rgba(10, 14, 39, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${agentColor.primary}22`,
            padding: { xs: '20px 16px', md: '24px 32px' },
          }}
        >
        <Container maxWidth="lg">
          {/* Progress Line */}
          <Box
            sx={{
              position: 'relative',
              mb: 2,
            }}
          >
            <Box
              sx={{
                height: '2px',
                background: 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${agentColor.primary}, ${agentColor.primary}aa)`,
                  width: `${progress}%`,
                  transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: `0 0 12px ${agentColor.glow}`,
                }}
              />
            </Box>
          </Box>

          {/* Steps Counter */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              overflowX: 'auto',
              gap: 2,
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {wizardSteps.map((step) => (
              <Box
                key={step.id}
                onClick={() => handleGoToStep(step.id)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: { xs: '70px', md: 'auto' },
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background:
                      step.id === currentStep
                        ? `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}dd)`
                        : step.id < currentStep
                        ? '#10b981'
                        : 'transparent',
                    border: `2px solid ${
                      step.id === currentStep
                        ? agentColor.primary
                        : step.id < currentStep
                        ? '#10b981'
                        : 'rgba(255, 255, 255, 0.2)'
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '14px',
                    color: '#FFF',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow:
                      step.id === currentStep
                        ? `0 4px 20px ${agentColor.glow}`
                        : step.id < currentStep
                        ? '0 4px 12px rgba(16, 185, 129, 0.4)'
                        : 'none',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  {step.id < currentStep ? '✓' : step.id}
                </Box>
                <Typography
                  sx={{
                    fontSize: { xs: '10px', md: '11px' },
                    fontWeight: 600,
                    color:
                      step.id === currentStep
                        ? agentColor.primary
                        : step.id < currentStep
                        ? '#10b981'
                        : 'rgba(255, 255, 255, 0.5)',
                    textAlign: 'center',
                    maxWidth: '80px',
                    transition: 'color 0.3s ease',
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

        {/* Main Content */}
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 1,
            py: { xs: 6, md: 8 },
          }}
        >
          {/* Step Header - Hide for welcome step */}
          {currentStep !== 1 && (
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography
                sx={{
                  fontSize: { xs: '28px', md: '38px' },
                  fontWeight: 700,
                  mb: 2,
                  color: '#FFF',
                  fontFamily: 'var(--font-tertiary)',
                  textShadow: '0 4px 16px rgba(0,0,0,0.5)',
                  letterSpacing: '-0.5px',
                }}
              >
                {currentStepData.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '15px', md: '17px' },
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                {currentStepData.subtitle}
              </Typography>
            </Box>
          )}

          {/* Step Content */}
          <Box ref={contentRef}>{renderStepContent()}</Box>

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 3,
              mt: 8,
              pt: 6,
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <Box
              component="button"
              onClick={currentStep === 1 ? handleBackClick : handlePrev}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                padding: { xs: '14px 28px', md: '16px 36px' },
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: '#FFF',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: { xs: '14px', md: '16px' },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                fontFamily: 'var(--font-primary)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderColor: `${agentColor.primary}66`,
                  transform: 'scale(1.05) translateX(-4px)',
                  boxShadow: `0 6px 20px ${agentColor.glow}`,
                  '& .shine-effect': {
                    transform: 'translateX(100%)',
                  },
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
            >
              {/* Shine effect */}
              <Box
                className="shine-effect"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.7s ease-out',
                  pointerEvents: 'none',
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <FontAwesomeIcon icon="chevron-left" />
                {currentStep === 1 ? 'Retour' : 'Précédent'}
              </Box>
            </Box>
            <Box
              component="button"
              onClick={handleNext}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                padding: { xs: '14px 28px', md: '16px 36px' },
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}dd)`,
                color: '#FFF',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: { xs: '14px', md: '16px' },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 4px 20px ${agentColor.glow}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                fontFamily: 'var(--font-primary)',
                '&:hover': {
                  transform: 'scale(1.05) translateX(4px)',
                  boxShadow: `0 6px 28px ${agentColor.glow}`,
                  '& .shine-effect': {
                    transform: 'translateX(100%)',
                  },
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
            >
              {/* Shine effect */}
              <Box
                className="shine-effect"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.7s ease-out',
                  pointerEvents: 'none',
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {currentStep === totalSteps ? (
                  <>
                    🎉 Créer l&apos;agent
                  </>
                ) : (
                  <>
                    Suivant
                    <FontAwesomeIcon icon="chevron-right" />
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
