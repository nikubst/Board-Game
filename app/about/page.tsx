'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getStoredPrefs, savePrefs, Language } from '@/lib/storage';
import { Dices, Heart, Target, Award, Users, Sparkles, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  const [lang, setLang] = useState<Language>('fa');

  useEffect(() => {
    const prefs = getStoredPrefs();
    setLang(prefs.lang);
  }, []);

  const handleToggleLang = () => {
    const newLang = lang === 'fa' ? 'en' : 'fa';
    setLang(newLang);
    savePrefs({ lang: newLang });
  };

  const isFa = lang === 'fa';

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 ${isFa ? 'rtl' : 'ltr'}`} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar lang={lang} onToggleLang={handleToggleLang} />

      {/* Hero Banner */}
      <div className="bg-slate-900/80 border-b border-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Dices className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-100">
            {isFa ? 'درباره تاس و مهره (TasoMohreh)' : 'About TasoMohreh'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isFa
              ? 'تلاش ما معرفی، تحلیل مهارتی و ارتقای فرهنگ بازی‌های رومیزی نوین در ایران و حمایت از طراحان خلاق ایرانی است.'
              : 'Empowering board game culture, showcasing Iranian and global designers, and analyzing learning potentials.'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">{isFa ? 'ماموریت ما' : 'Our Mission'}</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isFa
                ? 'ایجاد پلتفرمی دو زبانه و جامع جهت ثبت مشخصات، تصاویر باکیفیت و تحلیل ابعاد یادگیری بازی‌های رومیزی ایرانی و بین‌المللی تا علاقه‌مندان به راحتی بهترین بازی متناسب با روحیه و نیاز مهارتی خود را انتخاب کنند.'
                : 'Creating a comprehensive bilingual portal featuring detailed board game profiles, rules, image galleries, and educational skill matrices for game lovers.'}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">{isFa ? 'حمایت از طراحان ایرانی' : 'Supporting Iranian Designers'}</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isFa
                ? 'صنعت بازی‌های رومیزی در ایران طی سال‌های اخیر شاهد ظهور طراحان بسیار خلاقی بوده است. هدف ما دیده شدن این آثار و معرفی ارزش‌های هنری و استراتژیک آن‌ها به مخاطبان داخلی و خارجی است.'
                : 'The Iranian board game industry is growing rapidly with talented game creators. We aim to showcase their unique artistic and strategic works globally.'}
            </p>
          </div>
        </div>

      </div>

      <Footer lang={lang} />
    </div>
  );
}
