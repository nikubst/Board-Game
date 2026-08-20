'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GameCard } from '@/components/GameCard';
import { getGames } from '@/lib/gameStore';
import { getStoredPrefs, savePrefs, Language } from '@/lib/storage';
import { BoardGame, SkillCategory } from '@/types/boardgame';
import { Search, Filter, RefreshCw, Layers, Award, Sparkles } from 'lucide-react';

export default function GamesCatalogPage() {
  const [lang, setLang] = useState<Language>('fa');
  const [games, setGames] = useState<BoardGame[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState<'all' | 'iranian' | 'international'>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillCategory | 'all'>('all');
  const [playerFilter, setPlayerFilter] = useState<'all' | '2' | '3-4' | '5+'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'time'>('rating');

  useEffect(() => {
    const prefs = getStoredPrefs();
    setLang(prefs.lang);
    setGames(getGames());
  }, []);

  const handleToggleLang = () => {
    const newLang = lang === 'fa' ? 'en' : 'fa';
    setLang(newLang);
    savePrefs({ lang: newLang });
  };

  const isFa = lang === 'fa';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedOrigin('all');
    setSelectedSkill('all');
    setPlayerFilter('all');
    setSortBy('rating');
  };

  // Filter & Search Logic
  const filtered = games.filter((game) => {
    // Search filter
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const titleFa = game.title.fa.toLowerCase();
      const titleEn = game.title.en.toLowerCase();
      const descFa = game.shortDescription.fa.toLowerCase();
      const descEn = game.shortDescription.en.toLowerCase();
      const designerStr = game.designers.map(d => d.name.fa + ' ' + d.name.en).join(' ').toLowerCase();

      const matchesSearch = titleFa.includes(query) || titleEn.includes(query) || descFa.includes(query) || descEn.includes(query) || designerStr.includes(query);
      if (!matchesSearch) return false;
    }

    // Origin filter
    if (selectedOrigin !== 'all' && game.origin !== selectedOrigin) {
      return false;
    }

    // Skill filter
    if (selectedSkill !== 'all') {
      const hasSkill = game.skills.some((s) => s.key === selectedSkill);
      if (!hasSkill) return false;
    }

    // Player Count filter
    if (playerFilter === '2' && (game.minPlayers > 2 || game.maxPlayers < 2)) return false;
    if (playerFilter === '3-4' && (game.maxPlayers < 3 || game.minPlayers > 4)) return false;
    if (playerFilter === '5+' && game.maxPlayers < 5) return false;

    return true;
  });

  // Sorting logic
  filtered.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return b.releaseYear - a.releaseYear;
    if (sortBy === 'time') return a.playingTimeMinutes - b.playingTimeMinutes;
    return 0;
  });

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 ${isFa ? 'rtl' : 'ltr'}`} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar lang={lang} onToggleLang={handleToggleLang} />

      {/* Header Banner */}
      <div className="bg-slate-900/80 border-b border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>{isFa ? 'آرشیو تخصصی بازی‌های فکری و رومیزی فیزیکی' : 'Mind & Board Games Directory'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-100">
            {isFa ? 'جستجو و کاوش در دنیای بازی‌های فکری و رومیزی' : 'Explore Mind & Board Games'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            {isFa
              ? 'بررسی مشخصات، تعداد بازیکن، مهارت‌های شناختی (حل مسئله، تفکر استراتژیک، خلاقیت) و راهنمای کامل بازی‌های فکری رومیزی ایرانی و بین‌المللی.'
              : 'Search and filter physical tabletop mind games by origin, learning skills, player counts, ratings, and mechanics.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Search & Filter Toolbar */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-5 mb-10">
          
          {/* Live Search Bar */}
          <div className="relative">
            <Search className="absolute right-4 top-3.5 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isFa
                  ? 'جستجوی نام بازی، طراح، ناشر یا کلمه کلیدی...'
                  : 'Search by title, designer, publisher, or keywords...'
              }
              className="w-full pr-12 pl-4 py-3.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-3.5 text-xs text-amber-400 hover:underline"
              >
                {isFa ? 'پاک کردن' : 'Clear'}
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Origin Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
                {isFa ? 'منشأ طراحی' : 'Origin'}
              </label>
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value as any)}
                className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="all">{isFa ? 'همه (ایرانی و بین‌المللی)' : 'All Origins'}</option>
                <option value="iranian">{isFa ? 'طراحی ایران 🇮🇷' : 'Iranian Design 🇮🇷'}</option>
                <option value="international">{isFa ? 'بین‌المللی 🌐' : 'International 🌐'}</option>
              </select>
            </div>

            {/* Skill Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
                {isFa ? 'مهارت قابل یادگیری' : 'Learning Skill'}
              </label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value as any)}
                className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="all">{isFa ? 'همه مهارت‌ها' : 'All Skills'}</option>
                <option value="problem_solving">{isFa ? 'حل مسئله و منطق' : 'Problem Solving'}</option>
                <option value="strategic_thinking">{isFa ? 'تفکر استراتژیک' : 'Strategic Thinking'}</option>
                <option value="collaboration">{isFa ? 'همکاری و کار گروهی' : 'Collaboration'}</option>
                <option value="decision_making">{isFa ? 'تصمیم‌گیری سریع' : 'Decision Making'}</option>
                <option value="resource_management">{isFa ? 'مدیریت منابع' : 'Resource Allocation'}</option>
                <option value="negotiation">{isFa ? 'مذاکره و چانه‌زنی' : 'Negotiation'}</option>
              </select>
            </div>

            {/* Players Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
                {isFa ? 'تعداد بازیکنان' : 'Player Count'}
              </label>
              <select
                value={playerFilter}
                onChange={(e) => setPlayerFilter(e.target.value as any)}
                className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="all">{isFa ? 'همه تعدادها' : 'Any Player Count'}</option>
                <option value="2">{isFa ? '۲ نفره' : '2 Players'}</option>
                <option value="3-4">{isFa ? '۳ تا ۴ نفره' : '3-4 Players'}</option>
                <option value="5+">{isFa ? '۵ نفر به بالا' : '5+ Players'}</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
                {isFa ? 'مرتب‌سازی بر اساس' : 'Sort By'}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="rating">{isFa ? 'بسیار محبوب (امتیاز)' : 'Highest Rated'}</option>
                <option value="newest">{isFa ? 'جدیدترین سال ساخت' : 'Release Year'}</option>
                <option value="time">{isFa ? 'کوتاه‌ترین زمان بازی' : 'Play Time'}</option>
              </select>
            </div>

          </div>

          {/* Active Filter Bar & Reset */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <span className="text-slate-400">
              {isFa
                ? `نمایش ${filtered.length} بازی از مجموع ${games.length} بازی`
                : `Showing ${filtered.length} of ${games.length} games`}
            </span>

            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isFa ? 'بازنشانی فیلترها' : 'Reset Filters'}</span>
            </button>
          </div>

        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-4">
            <Filter className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-300">
              {isFa ? 'هیچ بازی با مشخصات انتخاب‌شده یافت نشد' : 'No games match your active filters'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {isFa ? 'لطفاً عبارت جستجو را تغییر دهید یا فیلترها را بازنشانی کنید.' : 'Try adjusting your search criteria or resetting filters.'}
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-amber-500 text-slate-950"
            >
              {isFa ? 'نمایش همه بازی‌ها' : 'Show All Games'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((game) => (
              <GameCard key={game.id} game={game} lang={lang} />
            ))}
          </div>
        )}

      </div>

      <Footer lang={lang} />
    </div>
  );
}
