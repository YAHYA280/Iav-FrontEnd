import { Box, Typography } from '@mui/material';
import { ReactNode, useState, useMemo } from 'react';
import { ToneStyleSection } from '../tone-style-section';
import { FilteringSection } from '../filtering-section';
import { LanguagesSection } from '../languages-section';
import { ConfigurationToggleButton } from '../configuration-toggle-button';
import { ConfigurationToggleGroup } from '../configuration-toggle-group';
import { ConfigurationContent } from '../configuration-content';
import { InstructionsSection } from '../instructions-section';
import { InformationSection } from '../information-section';


export interface ConfigTabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface ConfigurationSectionProps {
  subagentId?: string;
}

export function ConfigurationSection({ subagentId = 'sav-general' }: ConfigurationSectionProps) {
  const tabs: ConfigTabItem[] = useMemo(() => [
    {
      id: 'info',
      label: 'Informations',
      content: <InformationSection subagentId={subagentId} />,
    },
    {
      id: 'prompt',
      label: 'Instructions',
      content: <InstructionsSection subagentId={subagentId} />
    },
    {
      id: 'style',
      label: 'Ton & Style',
      content: <ToneStyleSection subagentId={subagentId} />
    },
    {
      id: 'filtrage',
      label: 'Filtrage',
      content: <FilteringSection subagentId={subagentId} />
    },
    {
      id: 'language',
      label: 'Langues',
      content: <LanguagesSection subagentId={subagentId} />
    },
  ], [subagentId]);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{
        position: 'sticky',
        top: 0,
        zIndex: 9,
        backgroundColor: 'rgba(40, 23, 69)',
        mb: 3,
        mt: 0,
        pt: 2,
        pb: 2,
      }}>
        <ConfigurationToggleGroup
          defaultValue={activeTab}
          onTabChange={handleTabChange}
          sx={{
            mb: 0,
            width: '100%',
            overflowX: { xs: 'auto', sm: 'visible' },
            '&::-webkit-scrollbar': {
              height: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(141, 49, 251, 0.5)',
              borderRadius: '2px',
            },
          }}
        >
          {tabs.map((tab) => (
            <ConfigurationToggleButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </ConfigurationToggleButton>
          ))}
        </ConfigurationToggleGroup>
      </Box>
      <Box sx={{ flex: 1, width: '100%' }}>
        {tabs.map((tab) => (
          <ConfigurationContent
            key={tab.id}
            tabId={tab.id}
            activeTab={activeTab}
          >
            {tab.content}
          </ConfigurationContent>
        ))}
      </Box>
    </Box>
  );
}
