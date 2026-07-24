'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

type Language = 'en' | 'fa';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();

  useEffect(() => {
    // Update direction when language changes
    if (typeof document !== 'undefined') {
      document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  return <>{children}</>;
};
