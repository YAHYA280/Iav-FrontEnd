import { savSubagentsConfig, commonData } from '@/shared/_mock/sav-subagents-config';

export const useSavSubagentData = (subagentId: string = 'sav-general') => {
  const agentData = savSubagentsConfig[subagentId] || savSubagentsConfig['sav-general'];
  
  // Conversion des IDs en objets complets avec les données communes
  const platforms = agentData.platforms.map(platformId => ({
    id: platformId,
    name: commonData.platforms[platformId as keyof typeof commonData.platforms]?.name || platformId,
    logoSrc: commonData.platforms[platformId as keyof typeof commonData.platforms]?.logoSrc || '',
    isConnected: true, // Par défaut connecté
  }));

  const languages = agentData.languages.map(langId => ({
    id: langId,
    name: commonData.languages[langId as keyof typeof commonData.languages]?.name || langId,
    enabled: true,
  }));

  return {
    ...agentData,
    platforms,
    languages,
    toneOptions: commonData.toneOptions,
    styleOptions: commonData.styleOptions,
    priorityOptions: commonData.priorityOptions,
    channelOptions: commonData.channelOptions,
  };
};
