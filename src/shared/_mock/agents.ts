import { Agent } from "../types/agent";

export const agentConversationsData = {
  'main': [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      lastMessage: "Besoin d'aide avec mon ordre principal",
      timestamp: 'Il y a 5 minutes',
      status: 'active',
      channel: 'WhatsApp',
    },
    {
      id: '2',
      customerName: 'Mike Thompson',
      lastMessage: 'Problème avec la livraison principale',
      timestamp: 'Il y a 10 minutes',
      status: 'active',
      channel: 'Messenger',
    },
  ],
  '1': [
    {
      id: '3',
      customerName: 'Emma Davis',
      lastMessage: 'Question technique sur le produit',
      timestamp: 'Il y a 1 heure',
      status: 'inactive',
      channel: 'Messenger',
    },
    {
      id: '4',
      customerName: 'John Smith',
      lastMessage: 'Support technique urgent',
      timestamp: 'Il y a 2 heures',
      status: 'active',
      channel: 'WhatsApp',
    },
  ],
  '2': [
    {
      id: '5',
      customerName: 'Lisa Brown',
      lastMessage: 'Question commerciale',
      timestamp: 'Il y a 3 heures',
      status: 'inactive',
      channel: 'WhatsApp',
    },
    {
      id: '6',
      customerName: 'David Wilson',
      lastMessage: 'Demande de devis commercial',
      timestamp: 'Il y a 4 heures',
      status: 'active',
      channel: 'Messenger',
    },
  ],
  '3': [
    {
      id: '7',
      customerName: 'Sophie Martin',
      lastMessage: 'Support premium prioritaire',
      timestamp: 'Il y a 30 minutes',
      status: 'active',
      channel: 'WhatsApp',
    },
    {
      id: '8',
      customerName: 'Robert Garcia',
      lastMessage: 'Question premium VIP',
      timestamp: 'Il y a 1 heure',
      status: 'active',
      channel: 'Messenger',
    },
  ]
};


export const agentClientsData = {
  'main': [
    {
      id: '1',
      customerId: 'MAIN1',
      name: 'Sarah Johnson',
      email: 'sarah@gmail.com',
      phone: '+86721652892',
      location: 'New York',
      joinDate: 'Jan 2024',
      tickets: 12,
      rating: 4.9,
      status: 'active',
      lastActivity: 'Il y a 5 minutes',
    },
    {
      id: '2',
      customerId: 'MAIN2',
      name: 'Mike Thompson',
      email: 'mike.thompson@email.com',
      phone: '+86721652893',
      location: 'Los Angeles',
      joinDate: 'Dec 2023',
      tickets: 8,
      rating: 4.7,
      status: 'active',
      lastActivity: 'Il y a 10 minutes',
    },
  ],
  '1': [
    {
      id: '3',
      customerId: 'TECH1',
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+86721652894',
      location: 'Chicago',
      joinDate: 'Feb 2024',
      tickets: 15,
      rating: 4.8,
      status: 'inactive',
      lastActivity: 'Il y a 1 heure',
    },
    {
      id: '4',
      customerId: 'TECH2',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+86721652895',
      location: 'Miami',
      joinDate: 'Nov 2023',
      tickets: 6,
      rating: 5.0,
      status: 'active',
      lastActivity: 'Il y a 2 heures',
    },
  ],
  '2': [
    {
      id: '5',
      customerId: 'COM1',
      name: 'Lisa Brown',
      email: 'lisa.brown@email.com',
      phone: '+86721652896',
      location: 'Seattle',
      joinDate: 'Mar 2024',
      tickets: 3,
      rating: 4.6,
      status: 'inactive',
      lastActivity: 'Il y a 3 heures',
    },
    {
      id: '6',
      customerId: 'COM2',
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+86721652897',
      location: 'Boston',
      joinDate: 'Apr 2024',
      tickets: 7,
      rating: 4.9,
      status: 'active',
      lastActivity: 'Il y a 4 heures',
    },
  ],
  '3': [
    {
      id: '7',
      customerId: 'PREMIUM1',
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      phone: '+86721652898',
      location: 'Paris',
      joinDate: 'May 2024',
      tickets: 2,
      rating: 5.0,
      status: 'active',
      lastActivity: 'Il y a 30 minutes',
    },
    {
      id: '8',
      customerId: 'PREMIUM2',
      name: 'Robert Garcia',
      email: 'robert.garcia@email.com',
      phone: '+86721652899',
      location: 'Madrid',
      joinDate: 'Jun 2024',
      tickets: 4,
      rating: 4.8,
      status: 'active',
      lastActivity: 'Il y a 1 heure',
    },
  ]
};


export const defaultAgent: Agent = {
  id: 'main',
  name: 'ITRI',
  title: 'Agent service client & sav',
  isActive: true,
  metrics: {
    ticketsResolved: 1200,
    customerSatisfaction: 4.1,
    averageResponse: '1000s',
    activeDiscussions: 1200
  },
  conversations: agentConversationsData['main'],
  clients: agentClientsData['main']
};

export const defaultSubAgents: Agent[] = [
  { 
    id: '1', 
    name: 'Expert support technique', 
    title: 'Sous-agent technique',
    isActive: true,
    metrics: {
      ticketsResolved: 300,
      customerSatisfaction: 4.3,
      averageResponse: '800s',
      activeDiscussions: 150
    },
    conversations: agentConversationsData['1'],
    clients: agentClientsData['1']
  },
  { 
    id: '2', 
    name: 'Expert support commercial', 
    title: 'Sous-agent commercial',
    isActive: true,
    metrics: {
      ticketsResolved: 450,
      customerSatisfaction: 4.0,
      averageResponse: '1200s',
      activeDiscussions: 200
    },
    conversations: agentConversationsData['2'],
    clients: agentClientsData['2']
  },
  { 
    id: '3', 
    name: 'Expert support premium', 
    title: 'Sous-agent premium',
    isActive: false,
    metrics: {
      ticketsResolved: 200,
      customerSatisfaction: 4.5,
      averageResponse: '600s',
      activeDiscussions: 80
    },
    conversations: agentConversationsData['3'],
    clients: agentClientsData['3']
  },
];