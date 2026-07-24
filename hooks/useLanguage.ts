'use client';

import { useContext } from 'react';
import { LanguageContext } from '@/components/layout/LanguageProvider';

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return {
    language: context.language,
    toggleLanguage: context.toggleLanguage,
    setLanguage: context.setLanguage,
    isRtl: context.isRtl,
    isLtr: context.isLtr,
  };
}

