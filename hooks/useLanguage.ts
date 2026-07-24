'use client';

import { useState, useEffect } from 'react';

type Language = 'en' | 'fa';

const LANGUAGE_STORAGE_KEY = 'nikoo-language';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      if (savedLanguage) {
        setLanguage(savedLanguage);
      } else {
        // Default to English if no saved language
        setLanguage('en');
      }
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fa' : 'en';
    setLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
      // Update document direction immediately
      if (typeof document !== 'undefined') {
        document.documentElement.dir = newLanguage === 'fa' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLanguage;
      }
    }
  };

  const setLanguageManually = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      if (typeof document !== 'undefined') {
        document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      }
    }
  };

  return {
    language,
    toggleLanguage,
    setLanguage: setLanguageManually,
    isRtl: language === 'fa',
    isLtr: language === 'en',
  };
}
