'use client';

import { useContext } from 'react';
import { LanguageContext } from '@/components/layout/LanguageProvider';

export function useTranslations() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslations must be used within a LanguageProvider');
  }
  return {
    t: context.t,
    translations: context.translations,
    language: context.language,
    isRtl: context.isRtl,
    isLtr: context.isLtr,
  };
}

