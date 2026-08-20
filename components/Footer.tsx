'use client';

import React from 'react';
import Link from 'next/link';
import { Dices, Heart, Mail, ShieldCheck, Sparkles, Trophy } from 'lucide-react';
import { Language } from '@/lib/storage';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <Dices className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-lg font-bold text-white">
                {isFa ? 'مرجع بازی‌های رومیزی' : 'BoardGame Arena'}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {isFa
                ? 'پلتفرم تخصصی معرفی و نقد بازی‌های رومیزی ایرانی و بین‌المللی با بررسی پتانسیل‌های یادگیری و مهارتی.'
                : 'Dedicated platform introducing Iranian and global board games with learning potential & skill metrics.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              {isFa ? 'دسترسی سریع' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  {isFa ? 'صفحه اصلی' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-amber-400 transition-colors">
                  {isFa ? 'فهرست کامل بازی‌ها' : 'All Board Games'}
                </Link>
              </li>
              <li>
                <Link href="/play" className="hover:text-amber-400 transition-colors">
                  {isFa ? 'میدان بازی‌های آنلاین' : 'Playable Online Games'}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 transition-colors">
                  {isFa ? 'مدیریت و افزودن بازی' : 'Admin CMS Panel'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Skills Spotlight */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              {isFa ? 'مهارت‌ها & یادگیری' : 'Learning Potentials'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isFa ? 'حل مسئله و تفکر منطقی' : 'Problem Solving & Logic'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-orange-400" />
                <span>{isFa ? 'تفکر استراتژیک & برنامه‌ریزی' : 'Strategic Thinking & Tactics'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>{isFa ? 'همکاری و کار گروهی' : 'Team Collaboration & Empathy'}</span>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              {isFa ? 'ارتباط با طراحان' : 'Contact & Submissions'}
            </h4>
            <p className="text-xs text-slate-400">
              {isFa
                ? 'طراح بازی رومیزی هستید؟ برای ثبت اثر خود با ما در تماس باشید.'
                : 'Are you a board game designer? Submit your game to our catalog!'}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Mail className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-300">info@boardgame-arena.ir</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} BoardGame Arena. {isFa ? 'تمامی حقوق محفوظ است.' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-2 mt-4 sm:mt-0 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isFa ? 'حامی طراحان مستقل بازی‌های رومیزی ایرانی' : 'Supporting Independent Iranian Game Designers'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
