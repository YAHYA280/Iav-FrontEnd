
export interface Conversation {
  id: string;
  customerName: string;
  lastMessage: string;
  timestamp: string;
  status: 'active' | 'inactive';
  unreadCount?: number;
  avatar?: string;
  channel: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'customer' | 'agent';
  type: 'text' | 'image' | 'file';
}

export interface ConversationDetail extends Conversation {
  messages: Message[];
  customerEmail?: string;
  customerPhone?: string;
  orderNumber?: string;
}