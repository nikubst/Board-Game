'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200'
          : 'bg-white/80 backdrop-blur-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 group-hover:from-sky-400 group-hover:to-cyan-600 transition-all duration-400 shadow-lg shadow-sky-200/30">
              <span className="text-xl font-bold text-white">{t('common', 'studioName')}</span>
            </div>
            <span className="text-xl font-bold text-transparent bg-gradient-to-r from-sky-500 to-cyan-600 bg-clip-text">
              {t('hero', 'title')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/" className="text-slate-700 hover:text-slate-900 px-5 py-2.5 rounded-2xl hover:bg-slate-100 transition-colors">
              {t('common', 'home')}
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-slate-700 hover:text-slate-900 px-5 py-2.5 rounded-2xl hover:bg-slate-100 transition-colors"
                >
                  {t('common', 'dashboard')}
                </Link>
                <Button variant="outline" onClick={handleLogout} size="sm" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                  {t('common', 'logout')}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-slate-700 hover:text-slate-900 px-5 py-2.5 rounded-2xl hover:bg-slate-100 transition-colors">
                  {t('common', 'login')}
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-cyan-700 text-white hover:from-cyan-600 hover:to-cyan-700 shadow-lg shadow-cyan-500/25">{t('common', 'getStarted')}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-3 rounded-2xl hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2">
              <div onClick={() => setIsMenuOpen(false)}>
                <LanguageSwitcher />
              </div>
              <Link
                href="/"
                className="text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common', 'home')}
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('common', 'dashboard')}
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    size="sm"
                    className="w-full"
                  >
                    {t('common', 'logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('common', 'login')}
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button size="sm" className="w-full">
                      {t('common', 'getStarted')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};