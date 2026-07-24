'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const isFa = language === 'fa';

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white/90 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all duration-300 shadow-sm"
      aria-label={`Switch to ${isFa ? 'English' : 'فارسی'}`}
    >
      <span className="text-sm font-medium">
        {isFa ? 'EN' : 'FA'}
      </span>
      <span className="text-xs text-slate-500">
        {isFa ? 'English' : 'فارسی'}
      </span>
    </button>
  );
};
