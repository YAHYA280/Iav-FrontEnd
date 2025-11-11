export interface AgentFeature {
  id: string;
  title: string;
  description: string;
}

export interface MarketplaceAgent {
  id: string;
  name: string;
  title: string;
  avatar: string;
  price: string;
  category: string;
  description?: string;
  detailedDescription?: string;
  features?: AgentFeature[];
}

export const marketplaceAgents: MarketplaceAgent[] = [
  {
    id: 'aylan',
    name: 'AYLAN',
    title: 'Agent de prospection',
    avatar: '/avatars/ziri-avatar.png',
    price: '99€/mois',
    category: 'Prospection',
    description: 'Spécialiste en prospection commerciale et génération de leads',
    detailedDescription: 'Optimisez votre prospection avec AYLAN, notre agent IA dédié à la génération de leads qualifiés. AYLAN automatise vos campagnes de prospection, identifie les meilleurs prospects et engage des conversations personnalisées pour maximiser vos conversions.',
    features: [
      {
        id: 'aylan-feature-1',
        title: 'Génération de leads automatique',
        description: 'AYLAN identifie et qualifie automatiquement des prospects correspondant à votre profil client idéal grâce à une analyse intelligente des données.',
      },
      {
        id: 'aylan-feature-2',
        title: 'Personnalisation des messages',
        description: 'Chaque message est personnalisé en fonction du profil du prospect pour maximiser les taux d\'engagement et de conversion.',
      },
      {
        id: 'aylan-feature-3',
        title: 'Suivi multi-canal',
        description: 'AYLAN assure un suivi cohérent sur email, LinkedIn, et téléphone pour ne jamais manquer une opportunité.',
      },
      {
        id: 'aylan-feature-4',
        title: 'Analyse de performance 24/7',
        description: 'Obtenez des rapports détaillés en temps réel sur vos campagnes de prospection avec des insights actionnables.',
      },
      {
        id: 'aylan-feature-5',
        title: 'Qualification intelligente',
        description: 'AYLAN évalue le niveau d\'intérêt des prospects et priorise les leads les plus prometteurs pour votre équipe commerciale.',
      },
    ],
  },
  {
    id: 'aksel',
    name: 'AKSEL',
    title: 'Agent Marketing',
    avatar: '/avatars/ziri-avatar.png',
    price: '89€/mois',
    category: 'Marketing',
    description: 'Expert en stratégie marketing et campagnes publicitaires',
    detailedDescription: 'AKSEL transforme votre stratégie marketing avec des campagnes intelligentes et automatisées. Optimisez vos budgets publicitaires, créez du contenu engageant et suivez vos performances en temps réel pour des résultats mesurables.',
    features: [
      {
        id: 'aksel-feature-1',
        title: 'Campagnes multi-plateformes',
        description: 'Gérez simultanément vos campagnes sur Google Ads, Facebook, Instagram, LinkedIn et TikTok depuis une seule interface unifiée.',
      },
      {
        id: 'aksel-feature-2',
        title: 'Optimisation automatique des budgets',
        description: 'AKSEL analyse les performances en temps réel et redistribue automatiquement vos budgets vers les canaux les plus performants.',
      },
      {
        id: 'aksel-feature-3',
        title: 'Création de contenu assistée par IA',
        description: 'Générez des visuels, des textes publicitaires et des vidéos optimisés pour chaque plateforme en quelques clics.',
      },
      {
        id: 'aksel-feature-4',
        title: 'Analytics avancés',
        description: 'Visualisez vos KPIs marketing avec des tableaux de bord personnalisables et des rapports automatisés.',
      },
      {
        id: 'aksel-feature-5',
        title: 'A/B Testing intelligent',
        description: 'Testez automatiquement différentes variantes de vos campagnes et identifiez les combinaisons gagnantes.',
      },
    ],
  },
  {
    id: 'ayal',
    name: 'AYAL',
    title: 'Agent SEO',
    avatar: '/avatars/ziri-avatar.png',
    price: '79€/mois',
    category: 'SEO',
    description: 'Optimisation SEO et référencement naturel',
  },
  {
    id: 'adan',
    name: 'ADAN',
    title: 'Agent Data Analyst',
    avatar: '/avatars/ziri-avatar.png',
    price: '99€/mois',
    category: 'Analytics',
    description: 'Analyse de données et insights business',
  },
  {
    id: 'ziri',
    name: 'ZIRI',
    title: 'Agent Community Manager',
    avatar: '/avatars/ziri-avatar.png',
    price: '69€/mois',
    category: 'Community',
    description: 'Gestion des réseaux sociaux et community management',
    detailedDescription: 'ZIRI anime vos communautés en ligne avec engagement et authenticité. Créez, planifiez et publiez du contenu captivant, répondez à votre audience en temps réel et développez une communauté fidèle autour de votre marque.',
    features: [
      {
        id: 'ziri-feature-1',
        title: 'Publication multi-réseaux automatisée',
        description: 'Planifiez et publiez simultanément sur Facebook, Instagram, Twitter, LinkedIn et TikTok avec des contenus adaptés à chaque plateforme.',
      },
      {
        id: 'ziri-feature-2',
        title: 'Engagement communautaire intelligent',
        description: 'ZIRI répond automatiquement aux commentaires et messages de votre communauté avec un ton personnalisé aligné à votre marque.',
      },
      {
        id: 'ziri-feature-3',
        title: 'Création de contenu viral',
        description: 'Générez des idées de posts tendances, des visuels accrocheurs et des copies engageantes basées sur l\'analyse de votre audience.',
      },
      {
        id: 'ziri-feature-4',
        title: 'Veille et écoute sociale',
        description: 'Surveillez les mentions de votre marque, identifiez les tendances et détectez les opportunités d\'engagement en temps réel.',
      },
      {
        id: 'ziri-feature-5',
        title: 'Analytics de croissance',
        description: 'Suivez la croissance de votre communauté, l\'engagement et identifiez les contenus les plus performants avec des rapports détaillés.',
      },
    ],
  },
  {
    id: 'ider',
    name: 'IDER',
    title: 'Agent Content Creator',
    avatar: '/avatars/ziri-avatar.png',
    price: '85€/mois',
    category: 'Content',
    description: 'Création de contenu et rédaction web',
  },
  {
    id: 'itri',
    name: 'ITRI',
    title: 'Agent Service Client',
    avatar: '/avatars/ziri-avatar.png',
    price: '95€/mois',
    category: 'Support',
    description: 'Service client et support technique',
  },
  {
    id: 'aqal',
    name: 'AQAL',
    title: 'Agent E-commerce',
    avatar: '/avatars/ziri-avatar.png',
    price: '99€/mois',
    category: 'E-commerce',
    description: 'Gestion de boutique en ligne et ventes',
  },
  {
    id: 'afay',
    name: 'AFAY',
    title: 'Agent RH',
    avatar: '/avatars/ziri-avatar.png',
    price: '89€/mois',
    category: 'Ressources Humaines',
    description: 'Recrutement et gestion des ressources humaines',
  },
];
