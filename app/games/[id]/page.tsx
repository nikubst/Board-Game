'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ImageGallery } from '@/components/ImageGallery';
import { SkillBadge } from '@/components/SkillBadge';
import { CommentSection } from '@/components/CommentSection';
import { getGames } from '@/lib/gameStore';
import { getStoredPrefs, savePrefs, Language } from '@/lib/storage';
import { BoardGame } from '@/types/boardgame';
import { ArrowLeft, ArrowRight, Users, Clock, Star, Award, BookOpen, ExternalLink, Calendar, UserCheck, ShieldCheck, Sparkles, AlertCircle, Globe } from 'lucide-react';

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [lang, setLang] = useState<Language>('fa');
  const [game, setGame] = useState<BoardGame | null>(null);

  useEffect(() => {
    const prefs = getStoredPrefs();
    setLang(prefs.lang);

    const allGames = getGames();
    const found = allGames.find((g) => g.id === params?.id);
    if (found) {
      setGame(found);
    }
  }, [params?.id]);

  const handleToggleLang = () => {
    const newLang = lang === 'fa' ? 'en' : 'fa';
    setLang(newLang);
    savePrefs({ lang: newLang });
  };

  const isFa = lang === 'fa';

  if (!game) {
    return (
      <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${isFa ? 'rtl' : 'ltr'}`} dir={isFa ? 'rtl' : 'ltr'}>
        <Navbar lang={lang} onToggleLang={handleToggleLang} />
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-500" />
          <h2 className="text-xl font-bold">{isFa ? 'بازی مورد نظر پیدا نشد' : 'Board Game Not Found'}</h2>
          <Link href="/games" className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold">
            {isFa ? 'بازگشت به فهرست بازی‌ها' : 'Back to Catalog'}
          </Link>
        </div>
        <Footer lang={lang} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 ${isFa ? 'rtl' : 'ltr'}`} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar lang={lang} onToggleLang={handleToggleLang} />

      {/* Header Breadcrumb */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-400">
          <Link href="/games" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
            <ArrowLeft className="w-4 h-4 ltr:rotate-180" />
            <span>{isFa ? 'بازگشت به فهرست تمام بازی‌ها' : 'Back to All Games Catalog'}</span>
          </Link>

          <div className="flex items-center gap-2">
            {game.origin === 'iranian' ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 fill-amber-400" />
                <span>{isFa ? 'بازی ساخت / بازطراحی ایران 🇮🇷' : 'Iranian Game 🇮🇷'}</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>{isFa ? 'بازی بین‌المللی (جهانی) 🌐' : 'International Game 🌐'}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Upper Hero Grid: Gallery & Main Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <ImageGallery images={game.images} title={isFa ? game.title.fa : game.title.en} />
          </div>

          {/* Right Column: Title, Quick Specs & Intro */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                  {game.categories.map(c => isFa ? c.fa : c.en).join(' • ')}
                </span>
                
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 text-sm font-extrabold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{game.rating} / ۱۰</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-100 mt-2">
                {isFa ? game.title.fa : game.title.en}
              </h1>
              <p className="text-sm font-semibold text-amber-400/90 mt-1">
                {isFa ? game.subtitle.fa : game.subtitle.en}
              </p>
            </div>

            {/* Quick Specs Cards Grid */}
            <div className="grid grid-cols-4 gap-3 py-4 border-y border-slate-800">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <Users className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="block text-[10px] text-slate-500">{isFa ? 'تعداد بازیکن' : 'Players'}</span>
                <span className="text-xs font-bold text-slate-200">
                  {game.minPlayers === game.maxPlayers ? game.minPlayers : `${game.minPlayers}-${game.maxPlayers}`}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="block text-[10px] text-slate-500">{isFa ? 'زمان بازی' : 'Time'}</span>
                <span className="text-xs font-bold text-slate-200">{game.playingTimeMinutes} {isFa ? 'دقیقه' : 'min'}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <UserCheck className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="block text-[10px] text-slate-500">{isFa ? 'رده سنی' : 'Age'}</span>
                <span className="text-xs font-bold text-slate-200">+{game.minAge} {isFa ? 'سال' : 'years'}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <BookOpen className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="block text-[10px] text-slate-500">{isFa ? 'درجه سختی' : 'Complexity'}</span>
                <span className="text-xs font-bold text-slate-200">{game.complexity} / ۵</span>
              </div>
            </div>

            {/* Short Catchy Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isFa ? 'معرفی کوتاه' : 'Short Overview'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                {isFa ? game.shortDescription.fa : game.shortDescription.en}
              </p>
            </div>

            {/* Designer & Publisher Info */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-400 font-semibold">{isFa ? 'طراح / طراحان:' : 'Designer(s):'}</span>
                  <span className="font-bold text-slate-200">
                    {game.designers.map(d => `${isFa ? d.name.fa : d.name.en} (${isFa ? d.country.fa : d.country.en})`).join(', ')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange-400" />
                  <span className="text-slate-400 font-semibold">{isFa ? 'ناشر / تولیدکننده:' : 'Publisher:'}</span>
                  <span className="font-bold text-slate-200">
                    {isFa ? game.publisher.fa : game.publisher.en}
                  </span>
                </div>
                <span className="text-slate-500 text-[10px]">{isFa ? `سال ساخت: ${game.releaseYear}` : `Year: ${game.releaseYear}`}</span>
              </div>
            </div>

            {/* External Links */}
            {game.bggUrl && (
              <a
                href={game.bggUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{isFa ? 'مشاهده صفحه رسمی در BoardGameGeek (BGG)' : 'View Official BoardGameGeek Page'}</span>
              </a>
            )}

          </div>

        </div>

        {/* Detailed Description & Rules Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>{isFa ? 'معرفی جامع و داستان بازی' : 'Full Game Story & Gameplay'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isFa ? game.fullDescription.fa : game.fullDescription.en}
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span>{isFa ? 'خلاصه مکانیزم و روند کلی قوانین' : 'Rules & Core Mechanics Overview'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isFa ? game.rulesOverview.fa : game.rulesOverview.en}
            </p>
          </div>

        </div>

        {/* Educational Potentials & Skill Development Matrix */}
        <div className="bg-slate-900/80 p-6 md:p-8 rounded-2xl border border-amber-500/30 space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isFa ? 'تحلیل مهارت‌ها و فرصت‌های یادگیری' : 'Educational Skills Breakdown'}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-100">
              {isFa ? 'چه مهارتهایی با انجام این بازی تقویت می‌شود؟' : 'What Skills Are Enhanced by Playing This Game?'}
            </h3>
            <p className="text-xs text-slate-400">
              {isFa
                ? 'ارزیابی پتانسیل‌های آموزشی، هوش هیجانی و تفکر منطقی بازیکنان'
                : 'Educational matrix measuring decision making, strategic depth, and collaboration metrics.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {game.skills.map((skill, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <SkillBadge
                  skillKey={skill.key}
                  title={skill.title}
                  score={skill.score}
                  lang={lang}
                />
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isFa ? skill.description.fa : skill.description.en}
                </p>

                {/* Progress bar visual */}
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full"
                    style={{ width: `${(skill.score / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Comments Section */}
        <CommentSection gameId={game.id} lang={lang} />

      </div>

      <Footer lang={lang} />
    </div>
  );
}
