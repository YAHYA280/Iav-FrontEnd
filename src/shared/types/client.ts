
export interface Client {
  id: string;
  customerId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  tickets: number;
  rating: number;
  status: 'active' | 'inactive';
  lastActivity: string;
  avatar?: string;
}