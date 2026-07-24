'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-1 rounded-2xl bg-slate-100/90 border border-slate-200 shadow-inner ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
          language === 'en'
            ? 'bg-white text-slate-900 shadow border border-slate-200/60'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLanguage('fa')}
        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
          language === 'fa'
            ? 'bg-gradient-to-r from-cyan-500 to-cyan-700 text-white shadow'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        فارسی
      </button>
    </div>
  );
};

