'use client';

import { Box, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Main } from './main';
import { Footer } from './footer';
import { InterfaceTitleProvider } from '@/contexts/settings/interface-title-context';
import { SidebarProvider } from '@/contexts/settings/sidebar-context';


type Props = {
  children: ReactNode;
};

export function DashboardLayout({ children }: Props) {
  const theme = useTheme();

  return (
    <InterfaceTitleProvider>
      <SidebarProvider>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(180deg, #1a0f3d 0%, #3d1f66 50%, #6b3ba8 100%)',
            position: 'relative',
          }}
        >
          <Sidebar />

          <Header />

          <Main>
            {children}
          </Main>
          <Footer />
        </Box>
      </SidebarProvider>
    </InterfaceTitleProvider>
  );
}