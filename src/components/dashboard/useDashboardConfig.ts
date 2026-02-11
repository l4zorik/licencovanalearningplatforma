'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardSectionConfig, DEFAULT_DASHBOARD_SECTIONS, DASHBOARD_CONFIG_KEY } from './types';

export function useDashboardConfig() {
  const [config, setConfig] = useState<DashboardSectionConfig[]>(DEFAULT_DASHBOARD_SECTIONS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load config from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DASHBOARD_CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to ensure all sections exist
        const merged = DEFAULT_DASHBOARD_SECTIONS.map(defaultSection => {
          const savedSection = parsed.find((s: DashboardSectionConfig) => s.id === defaultSection.id);
          return savedSection || defaultSection;
        });
        setConfig(merged);
      }
    } catch (e) {
      console.error('Failed to load dashboard config:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save config to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(DASHBOARD_CONFIG_KEY, JSON.stringify(config));
      } catch (e) {
        console.error('Failed to save dashboard config:', e);
      }
    }
  }, [config, isLoaded]);

  const updateOrder = useCallback((newOrder: DashboardSectionConfig[]) => {
    setConfig(newOrder.map((section, index) => ({
      ...section,
      order: index + 1,
    })));
  }, []);

  const toggleVisibility = useCallback((sectionId: string) => {
    setConfig(prev => prev.map(section =>
      section.id === sectionId
        ? { ...section, isVisible: !section.isVisible }
        : section
    ));
  }, []);

  const resetToDefault = useCallback(() => {
    setConfig(DEFAULT_DASHBOARD_SECTIONS);
  }, []);

  const getVisibleSections = useCallback(() => {
    return config
      .filter(section => section.isVisible)
      .sort((a, b) => a.order - b.order);
  }, [config]);

  return {
    config,
    isLoaded,
    updateOrder,
    toggleVisibility,
    resetToDefault,
    getVisibleSections,
  };
}
