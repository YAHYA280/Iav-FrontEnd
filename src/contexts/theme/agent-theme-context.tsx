'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export const agentColors = {
  default: {
    primary: '#A855F7',
    nebula: 'rgba(168, 85, 247, 0.15)',
    glow: 'rgba(168, 85, 247, 0.3)',
    border: '#A855F7',
  },
  aylan: {
    primary: '#EC4899',
    nebula: 'rgba(236, 72, 153, 0.15)',
    glow: 'rgba(236, 72, 153, 0.3)',
    border: '#EC4899',
  },
  aksel: {
    primary: '#F97316',
    nebula: 'rgba(249, 115, 22, 0.15)',
    glow: 'rgba(249, 115, 22, 0.3)',
    border: '#F97316',
  },
  ayal: {
    primary: '#A855F7',
    nebula: 'rgba(168, 85, 247, 0.15)',
    glow: 'rgba(168, 85, 247, 0.3)',
    border: '#A855F7',
  },
  adan: {
    primary: '#06B6D4',
    nebula: 'rgba(6, 182, 212, 0.15)',
    glow: 'rgba(6, 182, 212, 0.3)',
    border: '#06B6D4',
  },
  ziri: {
    primary: '#3B82F6',
    nebula: 'rgba(59, 130, 246, 0.15)',
    glow: 'rgba(59, 130, 246, 0.3)',
    border: '#3B82F6',
  },
  ider: {
    primary: '#5D31F8',
    nebula: 'rgba(93, 49, 248, 0.15)',
    glow: 'rgba(93, 49, 248, 0.3)',
    border: '#5D31F8',
  },
  itri: {
    primary: '#8B5CF6',
    nebula: 'rgba(139, 92, 246, 0.15)',
    glow: 'rgba(139, 92, 246, 0.3)',
    border: '#8B5CF6',
  },
  aqal: {
    primary: '#10B981',
    nebula: 'rgba(16, 185, 129, 0.15)',
    glow: 'rgba(16, 185, 129, 0.3)',
    border: '#10B981',
  },
  afay: {
    primary: '#EF4444',
    nebula: 'rgba(239, 68, 68, 0.15)',
    glow: 'rgba(239, 68, 68, 0.3)',
    border: '#EF4444',
  },
};

interface AgentThemeContextType {
  currentAgent: string | null;
  setCurrentAgent: (agentId: string | null) => void;
  currentColor: (typeof agentColors)['default'];
}

const AgentThemeContext = createContext<AgentThemeContextType | undefined>(undefined);

export const AgentThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);

  const currentColor =
    currentAgent && agentColors[currentAgent as keyof typeof agentColors]
      ? agentColors[currentAgent as keyof typeof agentColors]
      : agentColors.default;

  return (
    <AgentThemeContext.Provider value={{ currentAgent, setCurrentAgent, currentColor }}>
      {children}
    </AgentThemeContext.Provider>
  );
};

export const useAgentTheme = () => {
  const context = useContext(AgentThemeContext);
  if (!context) {
    throw new Error('useAgentTheme must be used within AgentThemeProvider');
  }
  return context;
};
