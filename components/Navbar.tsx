'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Dices, Search, Globe, ShieldAlert, Menu, X, Layers, Info, PhoneCall } from 'lucide-react';
import { Language } from '@/lib/storage';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isFa = lang === 'fa';

  const navLinks = [
    { href: '/', labelFa: 'صفحه اصلی', labelEn: 'Home', icon: Dices },
    { href: '/games', labelFa: 'فهرست بازی‌های فکری', labelEn: 'Mind & Board Games', icon: Layers },
    { href: '/about', labelFa: 'درباره ما', labelEn: 'About Us', icon: Info },
    { href: '/contact', labelFa: 'تماس با ما', labelEn: 'Contact Us', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-amber-500/20 text-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-600 to-amber-400 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Dices className="w-7 h-7 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent">
                {isFa ? 'مرجع بازی‌های فکری و رومیزی' : 'Mind & Board Games Hub'}
              </span>
              <span className="block text-xs text-amber-500/70 font-medium">
                {isFa ? 'تحلیل مهارت، هوش و استراتژی' : 'Iranian & Global Mind Games'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Single Horizontal Row */}
          <nav className="hidden lg:flex items-center flex-nowrap whitespace-nowrap gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800 shrink-0">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-full text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition-all whitespace-nowrap shrink-0"
                >
                  <Icon className="w-4 h-4 opacity-70 shrink-0" />
                  <span className="whitespace-nowrap">{isFa ? link.labelFa : link.labelEn}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Language Switcher & Admin Button */}
          <div className="hidden md:flex items-center flex-nowrap whitespace-nowrap gap-3 shrink-0">
            {/* Catalog Search Shortcut */}
            <Link
              href="/games"
              className="p-2.5 text-slate-400 hover:text-amber-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-full transition-colors"
              title={isFa ? 'جستجوی بازی‌ها' : 'Search Games'}
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Language Toggle Button */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 hover:text-amber-200 transition-all shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{isFa ? 'English (EN)' : 'فارسی (FA)'}</span>
            </button>

            {/* Admin CMS Panel */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 hover:from-amber-400 hover:to-orange-500 shadow-md shadow-amber-500/20 transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isFa ? 'پنل مدیریت' : 'Admin CMS'}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleLang}
              className="p-2 text-xs font-bold text-amber-400 bg-slate-900 border border-amber-500/30 rounded-lg"
            >
              {isFa ? 'EN' : 'FA'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl text-slate-200 hover:bg-slate-900 hover:text-amber-400"
              >
                <Icon className="w-5 h-5 text-amber-500" />
                <span>{isFa ? link.labelFa : link.labelEn}</span>
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-800">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold rounded-xl bg-amber-500 text-slate-950"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{isFa ? 'پنل مدیریت (CMS)' : 'Admin CMS Panel'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
