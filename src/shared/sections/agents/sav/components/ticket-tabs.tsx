import { Box } from '@mui/material';
import { useSavSubagentData } from '@/hooks/use-sav-subagent-data';
import { TicketFilters } from './ticket-filters';
import { StatusTabContent } from './status-tab-content';
import { useState, useMemo } from 'react';
import { StatusTabs } from './status-tabs';
import { TicketCards } from './ticket-cards';

interface TicketTabsProps {
  subagentId?: string;
  searchQuery?: string;
  priorityFilter?: string;
  channelFilter?: string;
  onFilterChange?: (filters: { priority: string; channel: string }) => void;
  onTicketClick?: (ticket: any) => void;
}

export const TicketTabs: React.FC<TicketTabsProps> = ({
  subagentId = 'sav-general',
  searchQuery = '',
  priorityFilter = '',
  channelFilter = '',
  onFilterChange,
  onTicketClick
}) => {
  const { tickets, priorityOptions, channelOptions } = useSavSubagentData(subagentId);
  const [activeTab, setActiveTab] = useState('tout');

  const filteredTickets = useMemo(() => {
    let filtered = tickets;

    if (activeTab !== 'tout') {
      filtered = filtered.filter(ticket => ticket.status === activeTab);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(query) ||
        ticket.client.toLowerCase().includes(query) ||
        ticket.id.toLowerCase().includes(query) ||
        (ticket.assignedTo && ticket.assignedTo.toLowerCase().includes(query))
      );
    }

    if (priorityFilter && priorityFilter !== '') {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    if (channelFilter && channelFilter !== '') {
      filtered = filtered.filter(ticket => ticket.channel === channelFilter);
    }

    return filtered;
  }, [tickets, activeTab, searchQuery, priorityFilter, channelFilter]);

  const ticketsByStatus = {
    'tout': tickets,
    'en-attente': tickets.filter(ticket => ticket.status === 'en-attente'),
    'en-cours': tickets.filter(ticket => ticket.status === 'en-cours'),
    'resolu': tickets.filter(ticket => ticket.status === 'resolu'),
  };

  const statusTabs = [
    { id: 'tout', label: 'Tout', count: tickets.length },
    { id: 'en-attente', label: 'En attente', count: ticketsByStatus['en-attente'].length },
    { id: 'en-cours', label: 'En cours', count: ticketsByStatus['en-cours'].length },
    { id: 'resolu', label: 'Résolu', count: ticketsByStatus['resolu'].length },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <StatusTabs
        tabs={statusTabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <TicketFilters
        priorityOptions={priorityOptions}
        channelOptions={channelOptions}
        priorityFilter={priorityFilter}
        channelFilter={channelFilter}
        onFilterChange={onFilterChange || (() => { })}
      />

      <StatusTabContent tabId="tout" activeTab={activeTab}>
        <TicketCards tickets={filteredTickets} onTicketClick={onTicketClick} />
      </StatusTabContent>

      <StatusTabContent tabId="en-attente" activeTab={activeTab}>
        <TicketCards tickets={filteredTickets} onTicketClick={onTicketClick} />
      </StatusTabContent>

      <StatusTabContent tabId="en-cours" activeTab={activeTab}>
        <TicketCards tickets={filteredTickets} onTicketClick={onTicketClick} />
      </StatusTabContent>

      <StatusTabContent tabId="resolu" activeTab={activeTab}>
        <TicketCards tickets={filteredTickets} onTicketClick={onTicketClick} />
      </StatusTabContent>
    </Box>
  );
};