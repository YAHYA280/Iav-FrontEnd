export interface PlatformIntegration {
  id: string;
  name: string;
  logoSrc: string;
  isConnected: boolean;
  showLinkIcon?: boolean;
}

export const defaultPlatforms: PlatformIntegration[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    logoSrc: '/icons/whatsapp.svg',
    isConnected: false,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    logoSrc: '/icons/instagram.svg',
    isConnected: true,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    logoSrc: '/icons/telegram.svg',
    isConnected: false,
  },
  {
    id: 'discord',
    name: 'Discord',
    logoSrc: '/icons/discord.svg',
    isConnected: true,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    logoSrc: '/icons/youtube.svg',
    isConnected: false,
  },
];

export interface MenuOption {
  id: string;
  label: string;
  icon: string;
}

export const menuOptions: MenuOption[] = [
  { id: 'integrations', label: 'Intégrations', icon: 'link' },
  { id: 'configuration', label: 'Configuration', icon: 'cog' },
  { id: 'idees', label: 'Idées', icon: 'lightbulb' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar-days' },
  { id: 'galerie', label: 'Galerie', icon: 'images' },
  { id: 'statistiques', label: 'Statistiques', icon: 'chart-line' },
];

