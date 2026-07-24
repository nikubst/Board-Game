'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import translations, { t, getTranslations, TranslationKeys } from '@/lib/translations';

export type Language = 'en' | 'fa';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRtl: boolean;
  isLtr: boolean;
  t: (namespace: TranslationKeys, key: string) => string;
  translations: typeof translations['en'] | typeof translations['fa'];
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'nikoo-language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fa')) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === 'en' ? 'fa' : 'en';
      if (typeof window !== 'undefined') {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  const translate = useCallback(
    (namespace: TranslationKeys, key: string): string => {
      return t(language, namespace, key);
    },
    [language]
  );

  const currentTranslations = useMemo(() => {
    return getTranslations(language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      isRtl: language === 'fa',
      isLtr: language === 'en',
      t: translate,
      translations: currentTranslations,
    }),
    [language, setLanguage, toggleLanguage, translate, currentTranslations]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

