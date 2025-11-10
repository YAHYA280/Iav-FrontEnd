export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface InstructionOption {
  id: string;
  label: string;
  active: boolean;
}

export interface SavSubagentConfig {
  id: string;
  name: string;
  platforms: string[]; // IDs des plateformes activées
  languages: string[]; // IDs des langues activées
  tone: string; // Ton sélectionné
  style: string; // Style sélectionné
  blockedKeywords: string[];
  faqs: FAQ[];
  instructions: InstructionOption[];
  prompts: {
    id: string;
    title: string;
    subtitle: string;
    content: string;
  }[];
  tickets: {
    id: string;
    title: string;
    status: 'en-attente' | 'en-cours' | 'resolu';
    priority: 'basse' | 'moyenne' | 'haute' | 'critique';
    channel: 'whatsapp' | 'instagram' | 'linkedin' | 'telegram' | 'discord' | 'email' | 'telephone' | 'messenger';
    client: string;
    assignedTo?: string;
    date: string;
    description: string;
    timeAgo?: string;
  }[];
  workingHours: {
    outOfHoursMessage: string;
    timezone: string;
    startTime: string;
    endTime: string;
    workingDays: {
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
      saturday: boolean;
      sunday: boolean;
    };
  };
}

// Données communes
export const commonData = {
  platforms: {
    'whatsapp': { name: 'WhatsApp Business', logoSrc: '/icons/whatsapp.svg' },
    'instagram': { name: 'Instagram', logoSrc: '/icons/instagram.svg' },
    'linkedin': { name: 'LinkedIn', logoSrc: '/icons/linkedin.svg' },
    'telegram': { name: 'Telegram', logoSrc: '/icons/telegram.svg' },
    'discord': { name: 'Discord', logoSrc: '/icons/discord.svg' },
    'tiktok': { name: 'TikTok', logoSrc: '/icons/tiktok.svg' },
    'youtube': { name: 'YouTube', logoSrc: '/icons/youtube.svg' },
    'snapchat': { name: 'Snapchat', logoSrc: '/icons/snapchat.svg' },
    'messenger': { name: 'Facebook - Messenger', logoSrc: '/icons/messenger.svg' },
    'telephone': { name: 'Téléphone', logoSrc: '/icons/phone.svg' },
  },
  languages: {
    'fr': { name: 'Français' },
    'en': { name: 'English' },
    'es': { name: 'Español' },
    'de': { name: 'Deutsch' },
    'it': { name: 'Italiano' },
  },
  toneOptions: ['professionnel', 'formel', 'amical', 'décontracté', 'empathique', 'technique', 'précis', 'méthodique', 'préventif', 'organisé', 'détaillé', 'réactif', 'efficace'],
  styleOptions: ['concise', 'détaillée', 'explicative', 'technique', 'simple', 'solution-oriented'],
  commonPrompts: [
    {
      id: 'support-technique',
      title: 'Support Technique',
      subtitle: 'Dépannage et assistance',
    },
    {
      id: 'service-apres-vente',
      title: 'Service Après-Vente',
      subtitle: 'Support et satisfaction',
    },
    {
      id: 'gestion-reclamations',
      title: 'Gestion des Réclamations',
      subtitle: 'Résolution diplomatique',
    },
    {
      id: 'personnalisation',
      title: 'Personnalisation',
      subtitle: 'Adaptation sur mesure',
    },
  ],
  // Options communes pour les filtres
  priorityOptions: [
    { value: 'basse', label: 'Basse' },
    { value: 'moyenne', label: 'Moyenne' },
    { value: 'haute', label: 'Haute' },
    { value: 'critique', label: 'Critique' },
  ],
  channelOptions: [
    { value: 'whatsapp', label: 'WhatsApp', logoSrc: '/icons/whatsapp.svg' },
    { value: 'instagram', label: 'Instagram', logoSrc: '/icons/instagram.svg' },
    { value: 'linkedin', label: 'LinkedIn', logoSrc: '/icons/linkedin.svg' },
    { value: 'telegram', label: 'Telegram', logoSrc: '/icons/telegram.svg' },
    { value: 'discord', label: 'Discord', logoSrc: '/icons/discord.svg' },
    { value: 'email', label: 'Email', logoSrc: '/icons/email.svg' },
    { value: 'telephone', label: 'Téléphone', logoSrc: '/icons/phone.svg' },
  ],
};

export const savSubagentsConfig: Record<string, SavSubagentConfig> = {
  // Agent principal
  'sav-general': {
    id: 'sav-general',
    name: 'SAV Général',
    platforms: ['whatsapp', 'instagram', 'discord'], // Plateformes activées
    languages: ['fr', 'en'], // Langues activées
    tone: 'professionnel', // Ton sélectionné
    style: 'concise', // Style sélectionné
    blockedKeywords: ['concurrence', 'concurrent', 'rival'],
    faqs: [
      {
        id: 'faq-1',
        question: 'Comment puis-je retourner un produit ?',
        answer: 'Vous pouvez retourner un produit dans les 30 jours suivant votre achat. Rendez-vous dans votre compte, section "Mes commandes", et suivez les instructions de retour.',
        category: 'Produit',
      },
      {
        id: 'faq-2',
        question: 'Quels sont les délais de livraison ?',
        answer: 'Les délais de livraison varient entre 2 à 5 jours ouvrés selon votre localisation. Les commandes passées avant 14h sont expédiées le jour même.',
        category: 'Produit',
      },
      {
        id: 'faq-3',
        question: 'Comment contacter le service client ?',
        answer: 'Vous pouvez nous contacter par email à support@exemple.com, par téléphone au 01 23 45 67 89, ou via notre chat en ligne disponible 24/7.',
        category: 'Support',
      },
      {
        id: 'faq-4',
        question: 'Puis-je modifier ma commande après validation ?',
        answer: 'Oui, vous pouvez modifier votre commande dans les 2 heures suivant la validation. Au-delà de ce délai, veuillez nous contacter directement.',
        category: 'Commande',
      },
      {
        id: 'faq-5',
        question: 'Quelle est votre politique de remboursement ?',
        answer: 'Nous remboursons intégralement les produits non ouverts et retournés dans leur emballage d\'origine dans les 30 jours. Le remboursement est effectué sous 5 à 10 jours ouvrés.',
        category: 'Remboursement',
      },
    ],
    instructions: [
      { id: '1', label: 'Suivie des commandes', active: false },
      { id: '2', label: 'Gestion des retours', active: false },
      { id: '3', label: 'Support technique', active: false },
      { id: '4', label: 'Résolution de problèmes', active: false },
      { id: '5', label: 'Information produit', active: false },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Technique', subtitle: 'Dépannage et assistance', content: 'Vous êtes un agent de service client professionnel spécialisé dans le support technique général. Répondez de manière claire et empathique aux demandes des clients.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente', subtitle: 'Support et satisfaction', content: 'Vous êtes un agent du service après-vente dédié à la satisfaction client. Soyez à l\'écoute et orienté solutions pour résoudre les problèmes post-achat.' },
      { id: 'gestion-reclamations', title: 'Gestion des Réclamations', subtitle: 'Résolution diplomatique', content: 'Vous êtes un spécialiste de la gestion des réclamations. Gérez les situations délicates avec diplomatie et trouvez des solutions satisfaisantes pour toutes les parties.' },
      { id: 'personnalisation', title: 'Personnalisation', subtitle: 'Adaptation sur mesure', content: 'Vous êtes un agent personnalisé qui s\'adapte aux besoins spécifiques de chaque client. Adaptez votre approche selon le profil et les préférences du client.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe de support est actuellement hors ligne, nous vous répondrons pendant nos heures d\'ouverture.',
      timezone: 'UTC+1',
      startTime: '09:00',
      endTime: '18:00',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    },
    tickets: [
      {
        id: 'T-12477398268',
        title: 'Problème de livraison de commande',
        status: 'en-attente',
        priority: 'haute',
        channel: 'whatsapp',
        client: 'Marie Dubois',
        assignedTo: 'Agent Support',
        date: '2024-01-15',
        description: 'Le client ne peut pas se connecter à son compte',
        timeAgo: 'Il y a 5 minutes'
      },
      {
        id: 'T-12477398269',
        title: 'Demande de remboursement',
        status: 'en-cours',
        priority: 'moyenne',
        channel: 'instagram',
        client: 'Jean Martin',
        assignedTo: 'Agent SAV',
        date: '2024-01-14',
        description: 'Demande de remboursement pour un produit défectueux',
        timeAgo: 'Il y a 2 heures'
      },
      {
        id: 'T-12477398277',
        title: 'Question sur la garantie',
        status: 'resolu',
        priority: 'basse',
        channel: 'discord',
        client: 'Sophie Leroy',
        assignedTo: 'Agent Technique',
        date: '2024-01-13',
        description: 'Information sur la durée de garantie du produit',
        timeAgo: 'Il y a 1 jour'
      },
      {
        id: 'T-12477398266',
        title: 'Demande de remboursement',
        status: 'en-cours',
        priority: 'moyenne',
        channel: 'instagram',
        client: 'Jean Martin',
        assignedTo: 'Agent SAV',
        date: '2024-01-14',
        description: 'Demande de remboursement pour un produit défectueux',
        timeAgo: 'Il y a 2 heures'
      },
      {
        id: 'T-12477398279',
        title: 'Question sur la garantie',
        status: 'resolu',
        priority: 'basse',
        channel: 'discord',
        client: 'Sophie Leroy',
        assignedTo: 'Agent Technique',
        date: '2024-01-13',
        description: 'Information sur la durée de garantie du produit',
        timeAgo: 'Il y a 1 jour'
      },
      {
        id: 'T-12477398261',
        title: 'Demande de remboursement',
        status: 'en-cours',
        priority: 'moyenne',
        channel: 'instagram',
        client: 'Jean Martin',
        assignedTo: 'Agent SAV',
        date: '2024-01-14',
        description: 'Demande de remboursement pour un produit défectueux',
        timeAgo: 'Il y a 2 heures'
      },
      {
        id: 'T-12477398270',
        title: 'Question sur la garantie',
        status: 'resolu',
        priority: 'basse',
        channel: 'discord',
        client: 'Sophie Leroy',
        assignedTo: 'Agent Technique',
        date: '2024-01-13',
        description: 'Information sur la durée de garantie du produit',
        timeAgo: 'Il y a 1 jour'
      }
    ]
  },
  // Sous-agent 1 - Expert Support Technique
  '1': {
    id: '1',
    name: 'Expert support technique',
    platforms: ['linkedin', 'messenger', 'telegram'], // Différentes plateformes
    languages: ['fr', 'en', 'de'], // Différentes langues
    tone: 'technique', // Ton technique
    style: 'technique', // Style technique
    blockedKeywords: ['bug', 'panne', 'dysfonctionnement', 'erreur système', 'crash'],
    faqs: [
      {
        id: 'faq-tech-1',
        question: 'Comment résoudre les problèmes de connexion ?',
        answer: 'Vérifiez d\'abord votre connexion réseau. Si le problème persiste, redémarrez votre appareil et votre routeur. Contactez-nous si l\'issue persiste.',
        category: 'Technique',
      },
      {
        id: 'faq-tech-2',
        question: 'Comment mettre à jour le système ?',
        answer: 'Allez dans les paramètres > Système > Mise à jour. Assurez-vous d\'avoir une connexion stable et suffisamment d\'espace de stockage.',
        category: 'Technique',
      },
      {
        id: 'faq-tech-3',
        question: 'Comment diagnostiquer un problème technique ?',
        answer: 'Suivez ces étapes : 1) Vérifiez les logs système, 2) Testez en mode sans échec, 3) Vérifiez les mises à jour récentes, 4) Contactez le support si nécessaire.',
        category: 'Diagnostic',
      },
      {
        id: 'faq-tech-4',
        question: 'Quelle est la procédure de dépannage ?',
        answer: 'Notre procédure de dépannage comprend : identification du problème, collecte des informations système, analyse des logs, résolution ou escalade au support technique.',
        category: 'Dépannage',
      },
    ],
    instructions: [
      { id: '1', label: 'Diagnostic technique avancé', active: true },
      { id: '2', label: 'Résolution de bugs', active: true },
      { id: '3', label: 'Support système', active: false },
      { id: '4', label: 'Mise à jour et maintenance', active: true },
      { id: '5', label: 'Documentation technique', active: true },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Technique', subtitle: 'Dépannage et assistance', content: 'Vous êtes un expert technique spécialisé dans le dépannage avancé. Utilisez votre expertise technique pour diagnostiquer et résoudre des problèmes complexes avec précision et méthode.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente', subtitle: 'Support et satisfaction', content: 'Vous êtes un expert du service après-vente technique. Fournissez un support technique post-vente de haute qualité pour assurer la satisfaction client.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe technique est actuellement hors ligne. Nous traiterons votre demande technique dès notre retour.',
      timezone: 'UTC+1',
      startTime: '08:00',
      endTime: '20:00',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false,
      },
    },
    tickets: [
      {
        id: 'T-TECH-001',
        title: 'Problème de connexion système',
        status: 'en-attente',
        priority: 'haute',
        channel: 'linkedin',
        client: 'TechCorp Solutions',
        assignedTo: 'Agent Technique',
        date: '2024-01-15',
        description: 'Problème de connexion au système de gestion',
        timeAgo: 'Il y a 10 minutes'
      },
      {
        id: 'T-TECH-002',
        title: 'Bug critique dans l\'application',
        status: 'en-cours',
        priority: 'critique',
        channel: 'messenger',
        client: 'DevSoft Inc',
        assignedTo: 'Expert Technique',
        date: '2024-01-14',
        description: 'Bug critique affectant la production',
        timeAgo: 'Il y a 3 heures'
      },
      {
        id: 'T-TECH-003',
        title: 'Mise à jour système requise',
        status: 'resolu',
        priority: 'moyenne',
        channel: 'telegram',
        client: 'CloudTech',
        assignedTo: 'Agent Maintenance',
        date: '2024-01-13',
        description: 'Assistance pour mise à jour système',
        timeAgo: 'Il y a 1 jour'
      }
    ]
  },
  // Sous-agent 2 - Expert Support Commercial
  '2': {
    id: '2',
    name: 'Expert support commercial',
    platforms: ['whatsapp', 'instagram'], // Différentes plateformes
    languages: ['fr', 'en', 'es'], // Différentes langues
    tone: 'amical', // Ton amical
    style: 'solution-oriented', // Style orienté solution
    blockedKeywords: ['concurrence', 'concurrent', 'rival', 'compétiteur'],
    faqs: [
      {
        id: 'faq-com-1',
        question: 'Quels sont vos tarifs ?',
        answer: 'Nos tarifs varient selon le service demandé. Contactez-nous pour obtenir un devis personnalisé adapté à vos besoins spécifiques.',
        category: 'Commercial',
      },
      {
        id: 'faq-com-2',
        question: 'Comment puis-je obtenir un devis ?',
        answer: 'Vous pouvez demander un devis gratuit en nous contactant par email, téléphone ou via notre formulaire en ligne. Nous vous répondrons sous 24h.',
        category: 'Devis',
      },
      {
        id: 'faq-com-3',
        question: 'Quelles sont vos conditions de vente ?',
        answer: 'Nos conditions de vente incluent : paiement à la commande, livraison sous 5-10 jours ouvrés, garantie satisfait ou remboursé sous 30 jours.',
        category: 'Conditions',
      },
    ],
    instructions: [
      { id: '1', label: 'Gestion des ventes', active: true },
      { id: '2', label: 'Relations client', active: true },
      { id: '3', label: 'Négociation commerciale', active: false },
      { id: '4', label: 'Suivi des commandes', active: true },
      { id: '5', label: 'Fidélisation client', active: false },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Commercial', subtitle: 'Vente et relation client', content: 'Vous êtes un expert commercial spécialisé dans la vente et la relation client. Aidez les clients à trouver les meilleures solutions adaptées à leurs besoins.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente', subtitle: 'Support et satisfaction', content: 'Vous êtes un expert du service après-vente commercial. Assurez un suivi client optimal pour garantir la satisfaction et la fidélisation.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe commerciale est actuellement hors ligne. Nous vous répondrons pendant nos heures d\'ouverture.',
      timezone: 'UTC+1',
      startTime: '09:00',
      endTime: '18:00',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    },
    tickets: [
      {
        id: 'T-COM-001',
        title: 'Demande de devis personnalisé',
        status: 'en-attente',
        priority: 'moyenne',
        channel: 'whatsapp',
        client: 'BusinessCorp',
        assignedTo: 'Agent Commercial',
        date: '2024-01-15',
        description: 'Demande de devis pour solution personnalisée',
        timeAgo: 'Il y a 15 minutes'
      },
      {
        id: 'T-COM-002',
        title: 'Question sur les tarifs',
        status: 'en-cours',
        priority: 'basse',
        channel: 'instagram',
        client: 'StartupTech',
        assignedTo: 'Expert Commercial',
        date: '2024-01-14',
        description: 'Information sur les tarifs et conditions',
        timeAgo: 'Il y a 2 heures'
      },
      {
        id: 'T-COM-003',
        title: 'Suivi de commande',
        status: 'resolu',
        priority: 'moyenne',
        channel: 'whatsapp',
        client: 'ClientPremium',
        assignedTo: 'Agent Suivi',
        date: '2024-01-13',
        description: 'Suivi de commande #12345',
        timeAgo: 'Il y a 1 jour'
      },
      {
        id: 'T-COM-004',
        title: 'Négociation commerciale',
        status: 'en-cours',
        priority: 'haute',
        channel: 'instagram',
        client: 'BigCorp',
        assignedTo: 'Expert Commercial',
        date: '2024-01-14',
        description: 'Négociation de contrat commercial',
        timeAgo: 'Il y a 4 heures'
      }
    ]
  },
  // Sous-agent 3 - Expert Support Premium
  '3': {
    id: '3',
    name: 'Expert support premium',
    platforms: ['whatsapp', 'telegram', 'discord'], // Plus de plateformes
    languages: ['fr', 'en', 'es', 'it'], // Plus de langues
    tone: 'empathique', // Ton empathique
    style: 'détaillée', // Style détaillé
    blockedKeywords: [],
    faqs: [
      {
        id: 'faq-prem-1',
        question: 'Quels sont les avantages du service premium ?',
        answer: 'Le service premium inclut : support prioritaire 24/7, gestionnaire de compte dédié, réponses garanties sous 1h, accès à des fonctionnalités exclusives.',
        category: 'Premium',
      },
      {
        id: 'faq-prem-2',
        question: 'Comment accéder au support premium ?',
        answer: 'Le support premium est disponible pour nos clients VIP. Contactez votre gestionnaire de compte pour plus d\'informations ou accédez à votre espace client premium.',
        category: 'Accès',
      },
      {
        id: 'faq-prem-3',
        question: 'Quelle est la différence avec le service standard ?',
        answer: 'Le service premium offre : temps de réponse 10x plus rapide, support multilingue, accès prioritaire aux nouvelles fonctionnalités, et assistance personnalisée.',
        category: 'Comparaison',
      },
    ],
    instructions: [
      { id: '1', label: 'Support prioritaire', active: true },
      { id: '2', label: 'Gestion de compte VIP', active: true },
      { id: '3', label: 'Assistance personnalisée', active: true },
      { id: '4', label: 'Accès fonctionnalités exclusives', active: true },
      { id: '5', label: 'Suivi proactif', active: false },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Premium', subtitle: 'Service exclusif VIP', content: 'Vous êtes un expert du support premium dédié aux clients VIP. Offrez un service d\'exception avec une attention personnalisée et des réponses ultra-rapides.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente Premium', subtitle: 'Support exclusif', content: 'Vous êtes un expert du service après-vente premium. Assurez un suivi client d\'exception avec une approche proactive et personnalisée pour garantir la satisfaction maximale.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe premium est disponible 24/7 pour vous assister. Un agent sera avec vous dans les plus brefs délais.',
      timezone: 'UTC+1',
      startTime: '00:00',
      endTime: '23:59',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
    },
    tickets: [
      {
        id: 'T-PREM-001',
        title: 'Support VIP urgent',
        status: 'en-attente',
        priority: 'critique',
        channel: 'whatsapp',
        client: 'VIP Client',
        assignedTo: 'Agent Premium',
        date: '2024-01-15',
        description: 'Demande de support prioritaire VIP',
        timeAgo: 'Il y a 5 minutes'
      },
      {
        id: 'T-PREM-002',
        title: 'Gestion de compte VIP',
        status: 'en-cours',
        priority: 'haute',
        channel: 'telegram',
        client: 'PremiumCorp',
        assignedTo: 'Gestionnaire VIP',
        date: '2024-01-14',
        description: 'Configuration compte VIP personnalisé',
        timeAgo: 'Il y a 1 heure'
      },
      {
        id: 'T-PREM-003',
        title: 'Assistance fonctionnalité exclusive',
        status: 'resolu',
        priority: 'moyenne',
        channel: 'discord',
        client: 'EliteClient',
        assignedTo: 'Expert Premium',
        date: '2024-01-13',
        description: 'Configuration fonctionnalité exclusive',
        timeAgo: 'Il y a 1 jour'
      },
      {
        id: 'T-PREM-004',
        title: 'Suivi proactif client VIP',
        status: 'en-cours',
        priority: 'haute',
        channel: 'whatsapp',
        client: 'TopClient',
        assignedTo: 'Agent Premium',
        date: '2024-01-14',
        description: 'Suivi proactif et personnalisé',
        timeAgo: 'Il y a 3 heures'
      },
      {
        id: 'T-PREM-005',
        title: 'Support 24/7 client VIP',
        status: 'resolu',
        priority: 'moyenne',
        channel: 'telegram',
        client: 'VIP Plus',
        assignedTo: 'Support Premium',
        date: '2024-01-13',
        description: 'Support 24/7 pour client VIP',
        timeAgo: 'Il y a 2 jours'
      }
    ]
  },
  'expert-support-technique': {
    id: 'expert-support-technique',
    name: 'Expert Support Technique',
    platforms: ['linkedin', 'messenger'], // Seulement ces 2 plateformes
    languages: ['fr', 'en'], // Seulement ces 2 langues
    tone: 'technique', // Ton technique
    style: 'technique', // Style technique
    blockedKeywords: ['bug', 'panne', 'dysfonctionnement', 'erreur système'],
    faqs: [
      {
        id: 'faq-tech-1',
        question: 'Comment résoudre les problèmes de connexion ?',
        answer: 'Vérifiez d\'abord votre connexion réseau. Si le problème persiste, redémarrez votre appareil et votre routeur. Contactez-nous si l\'issue persiste.',
        category: 'Technique',
      },
      {
        id: 'faq-tech-2',
        question: 'Comment mettre à jour le système ?',
        answer: 'Allez dans les paramètres > Système > Mise à jour. Assurez-vous d\'avoir une connexion stable et suffisamment d\'espace de stockage.',
        category: 'Technique',
      },
    ],
    instructions: [
      { id: '1', label: 'Diagnostic technique avancé', active: true },
      { id: '2', label: 'Résolution de bugs', active: true },
      { id: '3', label: 'Support système', active: false },
      { id: '4', label: 'Mise à jour et maintenance', active: false },
      { id: '5', label: 'Documentation technique', active: true },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Technique', subtitle: 'Dépannage et assistance', content: 'Vous êtes un expert technique spécialisé dans le dépannage avancé. Utilisez votre expertise technique pour diagnostiquer et résoudre des problèmes complexes avec précision et méthode.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente', subtitle: 'Support et satisfaction', content: 'Vous êtes un expert du service après-vente technique. Fournissez un support technique post-vente de haute qualité pour assurer la satisfaction client.' },
      { id: 'gestion-reclamations', title: 'Gestion des Réclamations', subtitle: 'Résolution diplomatique', content: 'Vous êtes un expert en gestion des réclamations techniques. Résolvez les litiges techniques avec expertise et diplomatie.' },
      { id: 'personnalisation', title: 'Personnalisation', subtitle: 'Adaptation sur mesure', content: 'Vous êtes un expert technique personnalisé. Adaptez vos solutions techniques selon le niveau d\'expertise et les besoins spécifiques de chaque client.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe technique est actuellement hors ligne. Nous traiterons votre demande technique dès notre retour.',
      timezone: 'UTC+1',
      startTime: '08:00',
      endTime: '20:00',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false,
      },
    },
    tickets: [
      {
        id: 'T004',
        title: 'Bug critique système',
        status: 'en-attente',
        priority: 'critique',
        channel: 'linkedin',
        client: 'TechCorp',
        date: '2024-01-15',
        description: 'Bug critique affectant la production'
      },
      {
        id: 'T005',
        title: 'Migration de données',
        status: 'en-cours',
        priority: 'haute',
        channel: 'messenger',
        client: 'DataSoft',
        date: '2024-01-14',
        description: 'Assistance pour migration de données vers nouveau système'
      }
    ]
  },
  'expert-maintenance': {
    id: 'expert-maintenance',
    name: 'Expert Maintenance',
    platforms: ['whatsapp', 'telegram'],
    languages: ['fr', 'en', 'es'],
    tone: 'préventif',
    style: 'détaillée',
    blockedKeywords: ['urgence', 'critique', 'arrêt production'],
    faqs: [],
    instructions: [
      { id: '1', label: 'Maintenance préventive', active: true },
      { id: '2', label: 'Planification des interventions', active: true },
      { id: '3', label: 'Suivi des équipements', active: false },
      { id: '4', label: 'Documentation technique', active: true },
      { id: '5', label: 'Optimisation des performances', active: false },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Technique', subtitle: 'Dépannage et assistance', content: 'Vous êtes un expert en maintenance préventive. Planifiez et organisez la maintenance des équipements pour éviter les pannes et optimiser les performances.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente', subtitle: 'Support et satisfaction', content: 'Vous êtes un expert du service après-vente en maintenance. Assurez le suivi et la satisfaction client après les interventions de maintenance.' },
      { id: 'gestion-reclamations', title: 'Gestion des Réclamations', subtitle: 'Résolution diplomatique', content: 'Vous êtes un expert en gestion des réclamations de maintenance. Résolvez les litiges liés aux interventions de maintenance avec professionnalisme.' },
      { id: 'personnalisation', title: 'Personnalisation', subtitle: 'Adaptation sur mesure', content: 'Vous êtes un expert en maintenance personnalisée. Adaptez vos plans de maintenance selon les spécificités et contraintes de chaque équipement.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe de maintenance est actuellement hors ligne. Les interventions d\'urgence sont traitées 24h/24.',
      timezone: 'UTC+1',
      startTime: '07:00',
      endTime: '19:00',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
    },
    tickets: [
      {
        id: 'T006',
        title: 'Maintenance préventive',
        status: 'en-attente',
        priority: 'moyenne',
        channel: 'whatsapp',
        client: 'IndustriePlus',
        date: '2024-01-15',
        description: 'Planification de maintenance préventive des équipements'
      },
      {
        id: 'T007',
        title: 'Réparation urgente',
        status: 'en-cours',
        priority: 'haute',
        channel: 'telegram',
        client: 'FabriqueTech',
        date: '2024-01-14',
        description: 'Réparation urgente d\'un équipement de production'
      }
    ]
  },
  'expert-depannage': {
    id: 'expert-depannage',
    name: 'Expert Dépannage',
    platforms: ['whatsapp', 'instagram', 'messenger'],
    languages: ['fr', 'en', 'de'],
    tone: 'réactif',
    style: 'solution-oriented',
    blockedKeywords: ['impossible', 'irréparable', 'obsolète'],
    faqs: [],
    instructions: [
      { id: '1', label: 'Dépannage urgent', active: true },
      { id: '2', label: 'Diagnostic rapide', active: true },
      { id: '3', label: 'Intervention express', active: false },
      { id: '4', label: 'Résolution de pannes critiques', active: true },
      { id: '5', label: 'Support 24/7', active: false },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Technique', subtitle: 'Dépannage et assistance', content: 'Vous êtes un expert en dépannage urgent. Résolvez rapidement et efficacement les problèmes techniques critiques avec une approche méthodique et réactive.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente', subtitle: 'Support et satisfaction', content: 'Vous êtes un expert du service après-vente en dépannage. Assurez un suivi client optimal après les interventions de dépannage pour garantir la satisfaction.' },
      { id: 'gestion-reclamations', title: 'Gestion des Réclamations', subtitle: 'Résolution diplomatique', content: 'Vous êtes un expert en gestion des réclamations de dépannage. Gérez les situations critiques avec diplomatie et trouvez des solutions rapides et satisfaisantes.' },
      { id: 'personnalisation', title: 'Personnalisation', subtitle: 'Adaptation sur mesure', content: 'Vous êtes un expert en dépannage personnalisé. Adaptez vos méthodes de dépannage selon l\'urgence et les contraintes spécifiques de chaque situation.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe de dépannage est actuellement hors ligne. Les dépannages urgents sont traités 24h/24.',
      timezone: 'UTC+1',
      startTime: '06:00',
      endTime: '22:00',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
    },
    tickets: [
      {
        id: 'T008',
        title: 'Panne critique',
        status: 'en-attente',
        priority: 'critique',
        channel: 'whatsapp',
        client: 'UrgenceTech',
        date: '2024-01-15',
        description: 'Panne critique nécessitant intervention immédiate'
      },
      {
        id: 'T009',
        title: 'Diagnostic complexe',
        status: 'en-cours',
        priority: 'haute',
        channel: 'instagram',
        client: 'ComplexCorp',
        date: '2024-01-14',
        description: 'Diagnostic d\'un problème technique complexe'
      },
      {
        id: 'T010',
        title: 'Dépannage express',
        status: 'resolu',
        priority: 'moyenne',
        channel: 'messenger',
        client: 'RapideService',
        date: '2024-01-13',
        description: 'Dépannage rapide d\'un équipement'
      }
    ]
  }
};
