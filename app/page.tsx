'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GameCard } from '@/components/GameCard';
import { getGames } from '@/lib/gameStore';
import { getStoredPrefs, savePrefs, Language } from '@/lib/storage';
import { BoardGame } from '@/types/boardgame';
import { Dices, Sparkles, Brain, Compass, Users, Award, ShieldCheck, ArrowRight, Gamepad2, Layers, Search } from 'lucide-react';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('fa');
  const [games, setGames] = useState<BoardGame[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'iranian' | 'international'>('all');

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

  const filteredGames = games.filter((g) => {
    if (activeTab === 'iranian') return g.origin === 'iranian';
    if (activeTab === 'international') return g.origin === 'international';
    return true;
  });

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 ${isFa ? 'rtl' : 'ltr'}`} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar lang={lang} onToggleLang={handleToggleLang} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-slate-950 to-slate-950 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>{isFa ? 'مرجع تخصصی نقد، بررسی و تحلیل مهارتی بازی‌های فکری و رومیزی' : 'Premier Mind & Board Games Reference Hub'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-100 leading-tight tracking-tight">
                {isFa ? (
                  <>
                    جهان شگفت‌انگیز <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">بازی‌های فکری و رومیزی</span> ایرانی و جهانی
                  </>
                ) : (
                  <>
                    Discover the World of <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">Mind & Board Games</span>
                  </>
                )}
              </h1>

              <p className="text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {isFa
                  ? 'معرفی، نقد، قوانین و تحلیل مهارتی بازی‌های فکری، رومیزی، کارتی و استراتژیک (غیردیجیتالی) طراحان ایرانی و بین‌المللی همراه با بررسی پتانسیل‌های تقویت هوش، حل مسئله و خلاقیت.'
                  : 'Explore physical board & mind games by Iranian and global creators with rule overviews, skill metrics, strategy guides, and reviews.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/games"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  <Layers className="w-5 h-5" />
                  <span>{isFa ? 'مشاهده فهرست بازی‌های فکری' : 'Explore Mind Games'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>

                <Link
                  href="/play"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 hover:text-amber-300 transition-all"
                >
                  <Gamepad2 className="w-5 h-5" />
                  <span>{isFa ? 'آزمایشگاه منطق و الگوریتم' : 'Mind Logic Simulator'}</span>
                </Link>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="block text-2xl font-black text-amber-400">۱۶+</span>
                  <span className="text-xs text-slate-400">{isFa ? 'بازی فکری ثبت‌شده' : 'Mind Games Reviewed'}</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-orange-400">۲۰+</span>
                  <span className="text-xs text-slate-400">{isFa ? 'طراح ایرانی و جهانی' : 'Iranian & Global Creators'}</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-emerald-400">۱۲</span>
                  <span className="text-xs text-slate-400">{isFa ? 'مهارت شناختی کلیدی' : 'Core Cognitive Skills'}</span>
                </div>
              </div>

            </div>

            {/* Right Hero Graphic Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 border border-slate-800 shadow-2xl shadow-amber-500/10">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-bold text-slate-200">
                      {isFa ? 'بازی فکری پیشنهادی هفته' : 'Featured Game of the Week'}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    {isFa ? 'نوستالژیک و اصیل' : 'Classic Board Game'}
                  </span>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden mt-4 bg-slate-950">
                  <img
                    src="/mensch.jpg"
                    alt="Mensch Board Game - بازی منچ"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="pt-4 space-y-2">
                  <h3 className="text-lg font-bold text-slate-100">
                    {isFa ? 'بازی فکری منچ (Mensch)' : 'Mensch (Ludo Classic)'}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {isFa
                      ? 'اصیل‌ترین و محبوب‌ترین بازی فکری تاس و مهره؛ تمرینی عالی برای مدیریت ریسک، صبر و مدیریت هیجانات.'
                      : 'The most iconic nostalgic tabletop board game in Iran. A classic game of dice, pawns, patience and strategy.'}
                  </p>

                  <div className="pt-3 flex items-center justify-between border-t border-slate-800/80">
                    <span className="text-xs font-bold text-amber-400">امتیاز: ۹.۵ / ۱۰</span>
                    <Link
                      href="/games/mensch-game"
                      className="text-xs font-semibold text-slate-300 hover:text-white underline"
                    >
                      {isFa ? 'مشاهده کامل' : 'View Full Details'}
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Learning & Educational Potentials Showcase */}
      <section className="py-16 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
              {isFa ? 'پتانسیل‌ها و مهارت‌های قابل یادگیری' : 'Learning Potentials & Skill Benefits'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isFa
                ? 'بازی‌های رومیزی صرفاً سرگرمی نیستند؛ ابزاری نیرومند برای پرورش هوش و مهارتهای فردی و گروهی می‌باشند.'
                : 'Board games are more than entertainment—they are tools for developing analytical thinking and teamwork.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-200">
                {isFa ? 'حل مسئله و تفکر منطقی' : 'Problem Solving & Logic'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isFa
                  ? 'بررسی چالش‌ها، ارزیابی شرایط متغیر و ساخت راهکارهای خلاقانه برای عبور از موانع.'
                  : 'Analyzing complex scenarios, adapting to variables, and crafting creative solutions.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-200">
                {isFa ? 'تفکر استراتژیک و برنامه‌ریزی' : 'Strategic Thinking & Tactics'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isFa
                  ? 'تدوین نقشه پیروزی بلندمدت و پیش‌بینی حرکت‌های حریفان چند گام جلوتر.'
                  : 'Formulating long-term game plans and anticipating rival moves turns ahead.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-200">
                {isFa ? 'همکاری و هوش هیجانی' : 'Team Collaboration & EQ'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isFa
                  ? 'مذاکره، کار گروهی در بازی‌های Co-op و درک زبان بدن و رفتارهای انسانی.'
                  : 'Teamwork in cooperative titles, effective negotiation, and reading human cues.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Board Games Catalog Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
              {isFa ? 'فهرست برجسته‌ترین بازی‌های رومیزی' : 'Featured Board Games Catalog'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {isFa ? 'بازی‌های ایرانی و بین‌المللی همراه با مشخصات و راهنمای کامل' : 'Browse top Iranian & International board games with detailed guides'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isFa ? 'همه بازی‌ها' : 'All Games'}
            </button>
            <button
              onClick={() => setActiveTab('iranian')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'iranian'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isFa ? 'طراحی ایران 🇮🇷' : 'Iranian 🇮🇷'}
            </button>
            <button
              onClick={() => setActiveTab('international')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'international'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isFa ? 'بین‌المللی 🌐' : 'International 🌐'}
            </button>
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} lang={lang} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-xs font-bold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 hover:text-amber-300 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>{isFa ? 'جستجو و فیلتر پیشرفته در تمام بازی‌ها' : 'Advanced Search & Filter Games'}</span>
          </Link>
        </div>

      </section>

      {/* Call to Action for Designers */}
      <section className="py-16 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
            <Dices className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-100">
            {isFa ? 'طراح یا ناشر بازی‌های رومیزی هستید؟' : 'Are you a Board Game Designer or Publisher?'}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {isFa
              ? 'اطلاعات، تصاویر و مشخصات اثر خود را در مرجع بازی‌های رومیزی ثبت کنید تا کاربران ایرانی با خلق اثر شما بیشتر آشنا شوند.'
              : 'Submit your board game details, artwork, and tutorials to be featured in our official Iranian & Global board game catalog.'}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xl shadow-amber-500/20 transition-all"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{isFa ? 'درخواست ثبت اثر جدید' : 'Submit Your Game'}</span>
          </Link>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
