export interface MarketplaceAgent {
  id: string;
  name: string;
  title: string;
  avatar: string;
  price: string;
  category: string;
  description?: string;
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
  },
  {
    id: 'aksel',
    name: 'AKSEL',
    title: 'Agent Marketing',
    avatar: '/avatars/ziri-avatar.png',
    price: '89€/mois',
    category: 'Marketing',
    description: 'Expert en stratégie marketing et campagnes publicitaires',
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
