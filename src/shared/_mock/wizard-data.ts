import type {
  WizardStep,
  WizardOption,
  WizardObjective,
  WizardFeature,
  NotificationConfig,
} from '@/shared/types/wizard';

export const wizardSteps: WizardStep[] = [
  {
    id: 1,
    label: 'Bienvenue',
    title: ' Bienvenue dans la configuration d\'ITRI',
    subtitle: 'Votre assistant intelligent personnalisé en quelques étapes',
  },
  {
    id: 2,
    label: 'Contexte',
    title: '👥 Parlez-nous de votre contexte',
    subtitle: 'Ces informations nous aideront à mieux comprendre vos besoins',
  },
  {
    id: 3,
    label: 'Objectifs',
    title: '🎯 Quels sont vos objectifs prioritaires ?',
    subtitle: 'Sélectionnez les 3 objectifs les plus importants pour vous',
  },
  {
    id: 4,
    label: 'Fonctionnalités',
    title: '⚙️ Sélectionnez les fonctionnalités souhaitées',
    subtitle: 'Choisissez les capacités que votre agent doit avoir',
  },
  {
    id: 5,
    label: 'Identité',
    title: '💬 Identité de votre agent',
    subtitle: 'Définissez le style et la base de connaissances de votre agent',
  },
  {
    id: 6,
    label: 'Notifications',
    title: '🔔 Notifications',
    subtitle: 'Configurez les alertes et notifications',
  },
  {
    id: 7,
    label: 'Intégrations',
    title: '🔗 Sélectionnez vos intégrations',
    subtitle: 'Connectez les outils que votre agent utilisera',
  },
  {
    id: 8,
    label: 'Configurations',
    title: '🔧 Configurations d\'intégration',
    subtitle: 'Configurez les intégrations que vous avez sélectionnées',
  },
  {
    id: 9,
    label: 'Résumé',
    title: '✨ Résumé de configuration',
    subtitle: 'Vérifiez votre configuration avant de créer l\'agent',
  },
];

// Step 1: Context options
export const businessModels: WizardOption[] = [
  { id: 'b2c', icon: '🛍️', title: 'B2C', description: 'Vente directe aux consommateurs' },
  { id: 'b2b', icon: '🏢', title: 'B2B', description: 'Vente aux entreprises' },
  { id: 'marketplace', icon: '🛒', title: 'Marketplace', description: 'Plateforme multi-vendeurs' },
  { id: 'subscription', icon: '💳', title: 'Abonnement', description: 'Modèle récurrent' },
];

export const teamSizes: WizardOption[] = [
  { id: 'solo', icon: '👤', title: 'Seul' },
  { id: '2-5', icon: '👥', title: '2-5 personnes' },
  { id: '6-20', icon: '👨‍👩‍👧‍👦', title: '6-20 personnes' },
  { id: '20+', icon: '🏢', title: '+20 personnes' },
];

export const requestVolumes: WizardOption[] = [
  { id: 'less-50', icon: '🟢', title: 'Moins de 50' },
  { id: '50-200', icon: '📊', title: '50-200' },
  { id: '200-500', icon: '📈', title: '200-500' },
  { id: '500+', icon: '🚀', title: 'Plus de 500' },
];

// Step 2: Objectives
export const objectives: WizardObjective[] = [
  {
    id: 'reduce-response-time',
    icon: '⚡',
    title: 'Réduire le temps de réponse',
    description: 'Répondre instantanément aux clients 24/7',
  },
  {
    id: 'automate-tasks',
    icon: '🔄',
    title: 'Automatiser les tâches répétitives',
    description: 'Gérer automatiquement les demandes courantes',
  },
  {
    id: 'improve-satisfaction',
    icon: '⭐',
    title: 'Améliorer la satisfaction client',
    description: 'Offrir une expérience client exceptionnelle',
  },
  {
    id: 'reduce-costs',
    icon: '💰',
    title: 'Réduire les coûts opérationnels',
    description: 'Optimiser les ressources de votre équipe',
  },
  {
    id: 'improve-ticketing',
    icon: '🎫',
    title: 'Améliorer la gestion des tickets',
    description: 'Centraliser et organiser les demandes clients',
  },
  {
    id: 'availability-24-7',
    icon: '🌐',
    title: 'Assurer une disponibilité 24/7',
    description: 'Être présent pour vos clients à tout moment',
  },
];

// Step 3: Features
export const features: WizardFeature[] = [
  {
    id: 'order-tracking',
    icon: '📦',
    title: 'Suivi de commande',
    description: 'Fournir le statut et les détails de livraison en temps réel',
    defaultSelected: true,
  },
  {
    id: 'returns-refunds',
    icon: '↩️',
    title: 'Retours et remboursement',
    description: 'Gérer les demandes de retour et de remboursement automatiquement',
    defaultSelected: true,
  },
  {
    id: 'complaints',
    icon: '⚠️',
    title: 'Réclamation',
    description: 'Traiter et documenter les réclamations clients efficacement',
    defaultSelected: true,
  },
  {
    id: 'faq-responses',
    icon: '💬',
    title: 'Réponses aux FAQ',
    description: 'Répondre automatiquement aux questions fréquentes',
    defaultSelected: true,
  },
  {
    id: 'ticket-management',
    icon: '🎫',
    title: 'Gestion des tickets',
    description: 'Créer et suivre automatiquement les tickets pour demandes complexes',
    defaultSelected: true,
  },
  {
    id: 'human-transfer',
    icon: '🙋',
    title: 'Transfert à un agent humain',
    description: 'Escalade intelligente vers un support humain si nécessaire',
    defaultSelected: true,
  },
];

// Step 4: Tone options
export const toneOptions: WizardOption[] = [
  { id: 'professional', icon: '👔', title: 'Professionnel', description: 'Formel et corporatif' },
  { id: 'friendly', icon: '😊', title: 'Amical', description: 'Chaleureux' },
  { id: 'casual', icon: '👋', title: 'Décontracté', description: 'Informel' },
  { id: 'empathetic', icon: '💙', title: 'Empathique', description: 'Bienveillant' },
  { id: 'direct', icon: '🎯', title: 'Direct', description: 'Efficace' },
  { id: 'enthusiastic', icon: '🌟', title: 'Enthousiaste', description: 'Dynamique' },
  { id: 'calm', icon: '🧘', title: 'Calme', description: 'Rassurant' },
  { id: 'pedagogical', icon: '🎓', title: 'Pédagogue', description: 'Détaillé' },
];

// Step 5: Languages
export const languages: WizardOption[] = [
  { id: 'fr', icon: '🇫🇷', title: 'Français' },
  { id: 'en', icon: '🇬🇧', title: 'English' },
  { id: 'ar', icon: '🇲🇦', title: 'العربية' },
  { id: 'es', icon: '🇪🇸', title: 'Español' },
  { id: 'de', icon: '🇩🇪', title: 'Deutsch' },
  { id: 'it', icon: '🇮🇹', title: 'Italiano' },
];

// Step 5: Notification configs
export const defaultNotifications: NotificationConfig[] = [
  {
    id: 'new-ticket',
    icon: '🎫',
    title: 'Nouveau ticket créé',
    description: 'Alerte immédiate quand un ticket est créé',
    enabled: true,
    channels: [
      {
        id: 'email',
        name: 'Email',
        icon: '📧',
        placeholder: 'support@example.com',
        value: 'support@example.com',
      },
      {
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: '💬',
        placeholder: '+212 6 XX XX XX XX',
        value: '',
      },
      {
        id: 'telegram',
        name: 'Telegram',
        icon: '✈️',
        placeholder: '123456789',
        value: '',
      },
    ],
    activeChannel: 'email',
  },
  {
    id: 'pending-ticket',
    icon: '⏰',
    title: 'Ticket en attente',
    description: 'Ticket sans réponse',
    enabled: true,
    delay: '1 heure',
    channels: [
      {
        id: 'email',
        name: 'Email',
        icon: '📧',
        placeholder: 'support@example.com',
        value: '',
      },
      {
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: '💬',
        placeholder: '+212 6 XX XX XX XX',
        value: '',
      },
      {
        id: 'telegram',
        name: 'Telegram',
        icon: '✈️',
        placeholder: '123456789',
        value: '',
      },
    ],
    activeChannel: 'email',
  },
];

// Step 6: Integration options
export const communicationIntegrations: WizardObjective[] = [
  {
    id: 'whatsapp',
    icon: '💬',
    title: 'WhatsApp Business',
    description: 'Communiquez avec vos clients via WhatsApp',
  },
  {
    id: 'messenger',
    icon: '📘',
    title: 'Facebook Messenger',
    description: 'Intégrez votre page Facebook',
  },
  {
    id: 'telegram',
    icon: '✈️',
    title: 'Telegram',
    description: 'Connectez votre bot Telegram',
  },
];

export const ticketingIntegrations: WizardObjective[] = [
  {
    id: 'freshdesk',
    icon: '📋',
    title: 'Freshdesk',
    description: 'Synchronisez vos tickets Freshdesk',
  },
  {
    id: 'zendesk',
    icon: '📊',
    title: 'Zendesk',
    description: 'Intégrez Zendesk Support',
  },
  {
    id: 'jira',
    icon: '🔵',
    title: 'Jira Service Management',
    description: 'Gérez les tickets techniques avec Jira',
  },
];

export const ecommerceIntegrations: WizardObjective[] = [
  {
    id: 'shopify',
    icon: '🛍️',
    title: 'Shopify',
    description: 'Accès aux commandes et produits',
  },
  {
    id: 'woocommerce',
    icon: '🛒',
    title: 'WooCommerce',
    description: 'Synchronisez votre boutique WordPress',
  },
  {
    id: 'hubspot',
    icon: '🎯',
    title: 'HubSpot CRM',
    description: 'Accès à vos contacts et deals',
  },
];
