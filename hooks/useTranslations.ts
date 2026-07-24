'use client';

import { useMemo } from 'react';
import { useLanguage } from './useLanguage';
import translations, { t, getTranslations, TranslationKeys } from '@/lib/translations';

export function useTranslations() {
  const { language } = useLanguage();
  
  const translate = useMemo(() => {
    return (namespace: TranslationKeys, key: string): string => {
      return t(language, namespace, key);
    };
  }, [language]);

  const getAllTranslations = useMemo(() => {
    return getTranslations(language);
  }, [language]);

  return {
    t: translate,
    translations: getAllTranslations,
    language,
  };
}
