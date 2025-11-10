export interface Agent {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  isActive: boolean;
  metrics: {
    ticketsResolved: number;
    customerSatisfaction: number;
    averageResponse: string;
    activeDiscussions: number;
  };
  conversations?: any[];
  clients?: any[];
}


export interface Agent {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  isActive: boolean;
  metrics: {
    ticketsResolved: number;
    customerSatisfaction: number;
    averageResponse: string;
    activeDiscussions: number;
  };
  conversations?: any[];
  clients?: any[];
}