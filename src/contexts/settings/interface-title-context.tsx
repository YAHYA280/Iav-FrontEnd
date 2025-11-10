'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface InterfaceTitleContextProps {
  title: string;
  setTitle: (title: string) => void;
}

const InterfaceTitleContext = createContext<InterfaceTitleContextProps | undefined>(undefined);

export const InterfaceTitleProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState('Tableau de bord');

  return (
    <InterfaceTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </InterfaceTitleContext.Provider>
  );
};

export const useInterfaceTitle = () => {
  const context = useContext(InterfaceTitleContext);
  if (!context) {
    throw new Error('useInterfaceTitle must be used within an InterfaceTitleProvider');
  }
  return context;
};

