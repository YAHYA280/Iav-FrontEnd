export interface WizardStep {
  id: number;
  label: string;
  title: string;
  subtitle: string;
}

export interface WizardOption {
  id: string;
  icon: string;
  title: string;
  description?: string;
}

export interface WizardObjective {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WizardFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  defaultSelected?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface NotificationChannel {
  id: string;
  name: string;
  icon: string;
  placeholder: string;
  value: string;
}

export interface NotificationConfig {
  id: string;
  icon: string;
  title: string;
  description: string;
  enabled: boolean;
  channels: NotificationChannel[];
  activeChannel: string;
  delay?: string;
}

export interface WizardData {
  // Step 1: Context
  businessModel?: string;
  teamSize?: string;
  requestVolume?: string;

  // Step 2: Objectives (max 3)
  objectives: string[];

  // Step 3: Features
  features: string[];

  // Step 4: Identity
  tone?: string;
  faqs: FAQ[];

  // Step 5: Configuration
  notifications: NotificationConfig[];
  languages: string[];

  // Step 6: Integrations
  communicationChannels: string[];
  ticketingSystems: string[];
  ecommerceTools: string[];
}
