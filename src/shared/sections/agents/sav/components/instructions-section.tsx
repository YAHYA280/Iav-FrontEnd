'use client';

import React, { useState, useEffect } from 'react';
import { useSavSubagentData } from '@/hooks/use-sav-subagent-data';
import { InstructionOption } from '@/shared/_mock/sav-subagents-config';
import { InstructionsSelection } from './instructions-selection';
import { InstructionsList } from './instructions-list';

export interface InstructionsSectionProps {
  subagentId?: string;
}

export const InstructionsSection: React.FC<InstructionsSectionProps> = ({
  subagentId = 'sav-general',
}) => {
  const { instructions: initialInstructions = [] } = useSavSubagentData(subagentId);
  const [options, setOptions] = useState<InstructionOption[]>(initialInstructions);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    setOptions(initialInstructions);
  }, [initialInstructions, subagentId]);

  const handleToggle = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, active: !opt.active } : opt))
    );
  };

  const handleAddSuggestion = (label: string) => {
    const newId = `suggestion-${Date.now()}`;
    const newOption: InstructionOption = {
      id: newId,
      label,
      active: true,
    };
    setOptions((prev) => [...prev, newOption]);
  };

  const handleRestrict = (label: string) => {
    const newId = `restriction-${Date.now()}`;
    const newOption: InstructionOption = {
      id: newId,
      label,
      active: false,
    };
    setOptions((prev) => [...prev, newOption]);
  };

  const handleNext = () => {
    setShowList(true);
  };

  if (showList) {
    return (
      <InstructionsList
        options={options}
        onAddSuggestion={handleAddSuggestion}
        onRestrict={handleRestrict}
      />
    );
  }

  return (
    <InstructionsSelection
      options={options}
      onToggle={handleToggle}
      onAddSuggestion={handleAddSuggestion}
      onRestrict={handleRestrict}
      onNext={handleNext}
    />
  );
};
