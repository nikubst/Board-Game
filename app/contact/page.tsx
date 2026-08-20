'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getStoredPrefs, savePrefs, Language } from '@/lib/storage';
import { Mail, Send, Phone, MapPin, CheckCircle2, MessageSquare, Dices } from 'lucide-react';

export default function ContactPage() {
  const [lang, setLang] = useState<Language>('fa');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 ${isFa ? 'rtl' : 'ltr'}`} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar lang={lang} onToggleLang={handleToggleLang} />

      {/* Header Banner */}
      <div className="bg-slate-900/80 border-b border-slate-800 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-slate-100">
            {isFa ? 'تماس با ما و درخواست ثبت بازی' : 'Contact Us & Game Submission'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {isFa
              ? 'پیشنهاد، دیدگاه یا درخواست معرفی بازی جدید خود را ارسال کنید.'
              : 'Get in touch or submit your board game for review in our portal.'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        
        {submitted && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>
              {isFa
                ? 'پیام شما با موفقیت دریافت شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.'
                : 'Thank you! Your message has been sent successfully.'}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900/80 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'نام و نام خانوادگی' : 'Full Name'}</label>
              <input
                type="text"
                required
                placeholder={isFa ? 'مثال: رضا احمدی' : 'John Doe'}
                className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'پست الکترونیکی (ایمیل)' : 'Email Address'}</label>
              <input
                type="email"
                required
                placeholder="example@mail.com"
                className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'موضوع پیام' : 'Subject'}</label>
            <select className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500">
              <option>{isFa ? 'درخواست ثبت و معرفی بازی جدید' : 'Board Game Submission'}</option>
              <option>{isFa ? 'پیشنهاد و همکاری' : 'Partnership Proposal'}</option>
              <option>{isFa ? 'گزارش اشکال یا بازخورد' : 'Feedback / Bug Report'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'متن پیام' : 'Message'}</label>
            <textarea
              required
              rows={4}
              placeholder={isFa ? 'توضیحات و مشخصات اثر...' : 'Your message...'}
              className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>{isFa ? 'ارسال پیام' : 'Send Message'}</span>
          </button>
        </form>

      </div>

      <Footer lang={lang} />
    </div>
  );
}
