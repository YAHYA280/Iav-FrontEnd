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

  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

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
        return renderStep5();
      case 7:
        return renderStep6();
      case 8:
        return renderStep7();
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
            background: `linear-gradient(135deg, ${agentColor.primary}, #FFF)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
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
            { icon: '📚', text: 'Base FAQ' },
            { icon: '🌐', text: 'Langues' },
            { icon: '🔗', text: 'Intégrations' },
            { icon: '✨', text: 'Finalisation' },
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
              Prêt à l'emploi
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
          Taille d'équipe <span style={{ color: '#ef4444' }}>*</span>
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
    <Box>
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
        <Box sx={{ fontSize: '28px' }}>💡</Box>
        <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
          Sélectionnez jusqu'à 3 objectifs qui correspondent le mieux à vos priorités actuelles
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {objectives.map((objective) => {
          const isSelected = wizardData.objectives.includes(objective.id);
          return (
            <Box
              key={objective.id}
              onClick={() => handleObjectiveToggle(objective.id)}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2.5,
                padding: 3,
                background: isSelected
                  ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                  : 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isSelected
                  ? `2px solid ${agentColor.primary}`
                  : '2px solid rgba(255, 255, 255, 0.06)',
                boxShadow: isSelected
                  ? `0 8px 32px ${agentColor.glow}`
                  : '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: isSelected
                    ? `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`
                    : 'rgba(255, 255, 255, 0.04)',
                  borderColor: `${agentColor.primary}66`,
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  border: `2px solid ${isSelected ? agentColor.primary : 'rgba(255, 255, 255, 0.2)'}`,
                  background: isSelected ? agentColor.primary : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.5,
                  transition: 'all 0.3s ease',
                }}
              >
                {isSelected && (
                  <FontAwesomeIcon icon="check" style={{ fontSize: '14px', color: '#FFF' }} />
                )}
              </Box>
              <Box sx={{ fontSize: '32px', flexShrink: 0 }}>{objective.icon}</Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 700,
                    mb: 0.5,
                    color: '#FFF',
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {objective.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.6,
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
    <Box>
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
        <Box sx={{ fontSize: '28px' }}>⚙️</Box>
        <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
          Plus vous activez de fonctionnalités, plus votre agent sera puissant et polyvalent
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {features.map((feature) => {
          const isSelected = wizardData.features.includes(feature.id);
          return (
            <Box
              key={feature.id}
              onClick={() => handleFeatureToggle(feature.id)}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2.5,
                padding: 3,
                background: isSelected
                  ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                  : 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isSelected
                  ? `2px solid ${agentColor.primary}`
                  : '2px solid rgba(255, 255, 255, 0.06)',
                boxShadow: isSelected
                  ? `0 8px 32px ${agentColor.glow}`
                  : '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: isSelected
                    ? `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`
                    : 'rgba(255, 255, 255, 0.04)',
                  borderColor: `${agentColor.primary}66`,
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  border: `2px solid ${isSelected ? agentColor.primary : 'rgba(255, 255, 255, 0.2)'}`,
                  background: isSelected ? agentColor.primary : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.5,
                  transition: 'all 0.3s ease',
                }}
              >
                {isSelected && (
                  <FontAwesomeIcon icon="check" style={{ fontSize: '14px', color: '#FFF' }} />
                )}
              </Box>
              <Box sx={{ fontSize: '32px', flexShrink: 0 }}>{feature.icon}</Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 700,
                    mb: 0.5,
                    color: '#FFF',
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.6,
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

  // Step 4: Identity (Tone + FAQ)
  const renderStep4 = () => (
    <Box>
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 700,
          mb: 3,
          color: 'rgba(255, 255, 255, 0.75)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        Tonalité de communication <span style={{ color: '#ef4444' }}>*</span>
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 6,
        }}
      >
        {toneOptions.map((tone) => (
          <Box
            key={tone.id}
            onClick={() => setWizardData({ ...wizardData, tone: tone.id })}
            sx={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border:
                wizardData.tone === tone.id
                  ? `2px solid ${agentColor.primary}`
                  : '2px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '16px',
              padding: '24px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow:
                wizardData.tone === tone.id
                  ? `0 8px 32px ${agentColor.glow}`
                  : '0 4px 12px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.04)',
                borderColor: `${agentColor.primary}66`,
                transform: 'translateY(-4px)',
              },
            }}
          >
            <Box sx={{ fontSize: '40px', mb: 1.5 }}>{tone.icon}</Box>
            <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 0.5, color: '#FFF' }}>
              {tone.title}
            </Typography>
            {tone.description && (
              <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
                {tone.description}
              </Typography>
            )}
          </Box>
        ))}
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
              transform: 'translateY(-2px)',
              boxShadow: `0 6px 20px ${agentColor.glow}`,
            },
          }}
        >
          <FontAwesomeIcon icon="plus" />
          Ajouter
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
                  transform: 'translateY(-2px)',
                },
              }}
            >
              ✓ Enregistrer
            </Box>
            <Box
              component="button"
              onClick={() => setShowAddFaq(false)}
              sx={{
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
                },
              }}
            >
              Annuler
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
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                🗑️ Supprimer
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

  // Step 5: Configuration (Languages)
  const renderStep5 = () => (
    <Box>
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 700,
          mb: 3,
          color: 'rgba(255, 255, 255, 0.75)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
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
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: isSelected
                  ? `2px solid ${agentColor.primary}`
                  : '2px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                fontWeight: 600,
                fontSize: '15px',
                color: '#FFF',
                fontFamily: 'var(--font-primary)',
                boxShadow: isSelected
                  ? `0 8px 32px ${agentColor.glow}`
                  : '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderColor: `${agentColor.primary}66`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {language.icon} {language.title}
            </Box>
          );
        })}
      </Box>
    </Box>
  );

  // Step 6: Integrations
  const renderStep6 = () => (
    <Box>
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 700,
          mb: 3,
          color: 'rgba(255, 255, 255, 0.75)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        📱 Canaux de communication
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
        {communicationIntegrations.map((integration) => {
          const isSelected = wizardData.communicationChannels.includes(integration.id);
          return (
            <Box
              key={integration.id}
              onClick={() => handleIntegrationToggle('communication', integration.id)}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2.5,
                padding: 3,
                background: isSelected
                  ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                  : 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isSelected
                  ? `2px solid ${agentColor.primary}`
                  : '2px solid rgba(255, 255, 255, 0.06)',
                boxShadow: isSelected
                  ? `0 8px 32px ${agentColor.glow}`
                  : '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: isSelected
                    ? `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`
                    : 'rgba(255, 255, 255, 0.04)',
                  borderColor: `${agentColor.primary}66`,
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  border: `2px solid ${isSelected ? agentColor.primary : 'rgba(255, 255, 255, 0.2)'}`,
                  background: isSelected ? agentColor.primary : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.5,
                  transition: 'all 0.3s ease',
                }}
              >
                {isSelected && (
                  <FontAwesomeIcon icon="check" style={{ fontSize: '14px', color: '#FFF' }} />
                )}
              </Box>
              <Box sx={{ fontSize: '32px', flexShrink: 0 }}>{integration.icon}</Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 700,
                    mb: 0.5,
                    color: '#FFF',
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {integration.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.6,
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

      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 700,
          mb: 3,
          color: 'rgba(255, 255, 255, 0.75)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        🎫 Systèmes de ticketing
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
        {ticketingIntegrations.map((integration) => {
          const isSelected = wizardData.ticketingSystems.includes(integration.id);
          return (
            <Box
              key={integration.id}
              onClick={() => handleIntegrationToggle('ticketing', integration.id)}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2.5,
                padding: 3,
                background: isSelected
                  ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                  : 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isSelected
                  ? `2px solid ${agentColor.primary}`
                  : '2px solid rgba(255, 255, 255, 0.06)',
                boxShadow: isSelected
                  ? `0 8px 32px ${agentColor.glow}`
                  : '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: isSelected
                    ? `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`
                    : 'rgba(255, 255, 255, 0.04)',
                  borderColor: `${agentColor.primary}66`,
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  border: `2px solid ${isSelected ? agentColor.primary : 'rgba(255, 255, 255, 0.2)'}`,
                  background: isSelected ? agentColor.primary : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.5,
                  transition: 'all 0.3s ease',
                }}
              >
                {isSelected && (
                  <FontAwesomeIcon icon="check" style={{ fontSize: '14px', color: '#FFF' }} />
                )}
              </Box>
              <Box sx={{ fontSize: '32px', flexShrink: 0 }}>{integration.icon}</Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 700,
                    mb: 0.5,
                    color: '#FFF',
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {integration.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.6,
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

      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 700,
          mb: 3,
          color: 'rgba(255, 255, 255, 0.75)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        🛒 E-commerce & CRM
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {ecommerceIntegrations.map((integration) => {
          const isSelected = wizardData.ecommerceTools.includes(integration.id);
          return (
            <Box
              key={integration.id}
              onClick={() => handleIntegrationToggle('ecommerce', integration.id)}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2.5,
                padding: 3,
                background: isSelected
                  ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                  : 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isSelected
                  ? `2px solid ${agentColor.primary}`
                  : '2px solid rgba(255, 255, 255, 0.06)',
                boxShadow: isSelected
                  ? `0 8px 32px ${agentColor.glow}`
                  : '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: isSelected
                    ? `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`
                    : 'rgba(255, 255, 255, 0.04)',
                  borderColor: `${agentColor.primary}66`,
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  border: `2px solid ${isSelected ? agentColor.primary : 'rgba(255, 255, 255, 0.2)'}`,
                  background: isSelected ? agentColor.primary : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.5,
                  transition: 'all 0.3s ease',
                }}
              >
                {isSelected && (
                  <FontAwesomeIcon icon="check" style={{ fontSize: '14px', color: '#FFF' }} />
                )}
              </Box>
              <Box sx={{ fontSize: '32px', flexShrink: 0 }}>{integration.icon}</Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 700,
                    mb: 0.5,
                    color: '#FFF',
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {integration.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.6,
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

  // Step 7: Finalization
  const renderStep7 = () => (
    <Box>
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
        <Box sx={{ fontSize: '28px' }}>ℹ️</Box>
        <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
          Vous pourrez configurer vos intégrations après la création de l'agent. Pour l'instant, nous
          allons finaliser la configuration de base.
        </Typography>
      </Box>

      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '24px',
          padding: 8,
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            fontSize: '80px',
            mb: 3,
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
          }}
        >
          🎉
        </Box>
        <Typography
          sx={{
            fontSize: '32px',
            fontWeight: 700,
            mb: 2,
            color: '#FFF',
            fontFamily: 'var(--font-tertiary)',
            textShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}
        >
          Félicitations !
        </Typography>
        <Typography
          sx={{
            fontSize: '17px',
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: 1.8,
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: 'var(--font-primary)',
          }}
        >
          Votre agent ITRI est prêt à être créé. Cliquez sur le bouton ci-dessous pour finaliser la
          configuration.
          <br />
          <br />
          Vous pourrez ensuite configurer les intégrations et personnaliser davantage votre agent
          depuis le tableau de bord.
        </Typography>
      </Box>
    </Box>
  );

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
                    🎉 Créer l'agent
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
