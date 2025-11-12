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
    detailedDescription: 'AYAL propulse votre visibilité en ligne avec des stratégies SEO avancées. Optimisez votre référencement naturel, améliorez votre positionnement sur les moteurs de recherche et attirez un trafic qualifié vers votre site web.',
    features: [
      {
        id: 'ayal-feature-1',
        title: 'Audit SEO complet automatisé',
        description: 'AYAL analyse en profondeur votre site web pour identifier les opportunités d\'optimisation technique, sémantique et structurelle.',
      },
      {
        id: 'ayal-feature-2',
        title: 'Recherche de mots-clés intelligente',
        description: 'Découvrez les mots-clés les plus pertinents et rentables pour votre secteur avec une analyse de la concurrence et du volume de recherche.',
      },
      {
        id: 'ayal-feature-3',
        title: 'Optimisation de contenu',
        description: 'Générez et optimisez vos contenus web avec les bonnes pratiques SEO pour maximiser votre visibilité sur Google.',
      },
      {
        id: 'ayal-feature-4',
        title: 'Suivi de positionnement en temps réel',
        description: 'Surveillez quotidiennement l\'évolution de vos positions sur les moteurs de recherche avec des rapports détaillés.',
      },
      {
        id: 'ayal-feature-5',
        title: 'Stratégie de backlinks',
        description: 'AYAL identifie les opportunités de liens entrants de qualité et vous aide à construire une autorité de domaine solide.',
      },
    ],
  },
  {
    id: 'adan',
    name: 'ADAN',
    title: 'Agent Data Analyst',
    avatar: '/avatars/ziri-avatar.png',
    price: '99€/mois',
    category: 'Analytics',
    description: 'Analyse de données et insights business',
    detailedDescription: 'ADAN transforme vos données en décisions stratégiques. Exploitez la puissance de l\'analyse de données avancée pour comprendre vos performances, identifier les tendances et prendre des décisions éclairées basées sur des insights actionnables.',
    features: [
      {
        id: 'adan-feature-1',
        title: 'Tableaux de bord intelligents',
        description: 'Visualisez vos KPIs et métriques clés en temps réel avec des dashboards interactifs et personnalisables selon vos besoins.',
      },
      {
        id: 'adan-feature-2',
        title: 'Analyse prédictive',
        description: 'ADAN utilise le machine learning pour prédire les tendances futures et vous aider à anticiper les évolutions du marché.',
      },
      {
        id: 'adan-feature-3',
        title: 'Rapports automatisés',
        description: 'Recevez des rapports détaillés et personnalisés automatiquement par email avec les insights les plus importants pour votre activité.',
      },
      {
        id: 'adan-feature-4',
        title: 'Segmentation client avancée',
        description: 'Identifiez vos segments de clients les plus rentables et comprenez leur comportement pour optimiser vos stratégies marketing.',
      },
      {
        id: 'adan-feature-5',
        title: 'Intégration multi-sources',
        description: 'ADAN se connecte à toutes vos sources de données (CRM, Analytics, ERP) pour une vue unifiée de votre business.',
      },
    ],
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
    detailedDescription: 'IDER révolutionne votre création de contenu avec l\'intelligence artificielle. Générez des articles de blog, des scripts vidéo, des newsletters et du contenu optimisé SEO en quelques secondes pour alimenter votre stratégie de contenu.',
    features: [
      {
        id: 'ider-feature-1',
        title: 'Génération de contenu multiformat',
        description: 'Créez des articles de blog, posts sociaux, scripts vidéo, newsletters et pages web optimisées en un clic avec le style de votre marque.',
      },
      {
        id: 'ider-feature-2',
        title: 'Optimisation SEO automatique',
        description: 'Chaque contenu généré est automatiquement optimisé pour le référencement avec les mots-clés pertinents et une structure SEO-friendly.',
      },
      {
        id: 'ider-feature-3',
        title: 'Adaptation tonale intelligente',
        description: 'IDER adapte le ton et le style d\'écriture selon votre audience cible : professionnel, casual, technique ou créatif.',
      },
      {
        id: 'ider-feature-4',
        title: 'Planning éditorial automatisé',
        description: 'Générez un calendrier éditorial complet avec des suggestions de sujets basées sur les tendances et les intérêts de votre audience.',
      },
      {
        id: 'ider-feature-5',
        title: 'Réécriture et amélioration',
        description: 'Transformez vos contenus existants en versions améliorées, plus engageantes et optimisées pour la conversion.',
      },
    ],
  },
  {
    id: 'itri',
    name: 'ITRI',
    title: 'Agent Service Client',
    avatar: '/avatars/ziri-avatar.png',
    price: '95€/mois',
    category: 'Support',
    description: 'Service client et support technique',
    detailedDescription: 'ITRI offre un support client exceptionnel 24h/24 et 7j/7. Automatisez vos réponses aux questions fréquentes, gérez vos tickets de support et offrez une expérience client personnalisée qui augmente la satisfaction et la fidélité.',
    features: [
      {
        id: 'itri-feature-1',
        title: 'Support multicanal 24/7',
        description: 'ITRI répond instantanément aux demandes de vos clients sur chat, email, réseaux sociaux et téléphone, à toute heure du jour et de la nuit.',
      },
      {
        id: 'itri-feature-2',
        title: 'Résolution automatique des tickets',
        description: 'Les questions fréquentes sont résolues automatiquement grâce à une base de connaissances intelligente qui apprend de chaque interaction.',
      },
      {
        id: 'itri-feature-3',
        title: 'Escalade intelligente',
        description: 'Les demandes complexes sont automatiquement transférées aux agents humains appropriés avec tout le contexte nécessaire.',
      },
      {
        id: 'itri-feature-4',
        title: 'Analyse de satisfaction client',
        description: 'Mesurez la satisfaction client après chaque interaction et identifiez les points d\'amélioration de votre service.',
      },
      {
        id: 'itri-feature-5',
        title: 'Support multilingue',
        description: 'ITRI communique dans plus de 50 langues pour offrir un support personnalisé à votre clientèle internationale.',
      },
    ],
  },
  {
    id: 'aqal',
    name: 'AQAL',
    title: 'Agent E-commerce',
    avatar: '/avatars/ziri-avatar.png',
    price: '99€/mois',
    category: 'E-commerce',
    description: 'Gestion de boutique en ligne et ventes',
    detailedDescription: 'AQAL optimise et automatise votre boutique en ligne pour maximiser vos ventes. De la gestion des stocks aux recommandations produits personnalisées, AQAL transforme votre e-commerce en machine de conversion performante.',
    features: [
      {
        id: 'aqal-feature-1',
        title: 'Gestion automatisée des stocks',
        description: 'AQAL surveille vos niveaux de stock en temps réel et lance automatiquement les réapprovisionnements pour éviter les ruptures.',
      },
      {
        id: 'aqal-feature-2',
        title: 'Recommandations produits IA',
        description: 'Augmentez votre panier moyen avec des recommandations de produits ultra-personnalisées basées sur le comportement d\'achat.',
      },
      {
        id: 'aqal-feature-3',
        title: 'Optimisation des prix dynamique',
        description: 'AQAL ajuste automatiquement vos prix en fonction de la demande, de la concurrence et des stocks pour maximiser vos marges.',
      },
      {
        id: 'aqal-feature-4',
        title: 'Recovery de panier abandonné',
        description: 'Récupérez jusqu\'à 30% des ventes perdues avec des emails et notifications automatiques personnalisés pour les paniers abandonnés.',
      },
      {
        id: 'aqal-feature-5',
        title: 'Analytics e-commerce avancés',
        description: 'Suivez vos KPIs e-commerce (taux de conversion, AOV, CLV) et recevez des insights actionnables pour booster vos ventes.',
      },
    ],
  },
  {
    id: 'afay',
    name: 'AFAY',
    title: 'Agent RH',
    avatar: '/avatars/ziri-avatar.png',
    price: '89€/mois',
    category: 'Ressources Humaines',
    description: 'Recrutement et gestion des ressources humaines',
    detailedDescription: 'AFAY modernise votre gestion des ressources humaines avec l\'automatisation intelligente. Du recrutement à l\'onboarding, de la gestion des talents à l\'engagement des employés, AFAY vous aide à construire une équipe performante et épanouie.',
    features: [
      {
        id: 'afay-feature-1',
        title: 'Recrutement automatisé',
        description: 'AFAY tri et qualifie automatiquement les candidatures, planifie les entretiens et envoie les communications personnalisées aux candidats.',
      },
      {
        id: 'afay-feature-2',
        title: 'Onboarding personnalisé',
        description: 'Créez des parcours d\'intégration sur-mesure pour chaque nouveau collaborateur avec un suivi automatisé et des contenus adaptatifs.',
      },
      {
        id: 'afay-feature-3',
        title: 'Gestion des performances',
        description: 'Suivez les objectifs, organisez les feedbacks réguliers et identifiez les opportunités de développement pour chaque employé.',
      },
      {
        id: 'afay-feature-4',
        title: 'Analyse du bien-être',
        description: 'AFAY mesure l\'engagement et le bien-être de vos équipes avec des sondages intelligents et vous alerte sur les risques de turnover.',
      },
      {
        id: 'afay-feature-5',
        title: 'Gestion administrative automatisée',
        description: 'Automatisez la gestion des congés, des notes de frais, des documents RH et toutes les tâches administratives chronophages.',
      },
    ],
  },
];
