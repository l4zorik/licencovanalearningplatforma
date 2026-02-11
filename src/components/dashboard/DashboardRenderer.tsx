'use client';

import React from 'react';
import { DashboardSectionConfig } from './types';

interface DashboardRendererProps {
  sections: DashboardSectionConfig[];
  renderSection: (sectionId: string) => React.ReactNode;
}

export function DashboardRenderer({ sections, renderSection }: DashboardRendererProps) {
  // Sort by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <>
      {sortedSections.map((section) => (
        <React.Fragment key={section.id}>
          {renderSection(section.id)}
        </React.Fragment>
      ))}
    </>
  );
}
