
export const paths = {
  root: '/',

  auth: {
    root: '/auth',
    login: '/auth/login',
    register: '/auth/register',
  },

  dashboard: {
    root: '/dashboard',
    agents: '/dashboard/agents',
    integration: '/dashboard/integration',
    marketplace: '/dashboard/marketplace',
    analytics: '/dashboard/analytics',
    sponsorship: '/dashboard/sponsorship',
    settings: '/dashboard/settings',
    wiki: '/dashboard/wiki',
  },
} as const;