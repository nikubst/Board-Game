'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Clock, Star, Award, ArrowUpRight } from 'lucide-react';
import { BoardGame } from '@/types/boardgame';
import { Language } from '@/lib/storage';
import { SkillBadge } from './SkillBadge';

interface GameCardProps {
  game: BoardGame;
  lang: Language;
}

export const GameCard: React.FC<GameCardProps> = ({ game, lang }) => {
  const isFa = lang === 'fa';

  return (
    <div className="group relative bg-slate-900/70 rounded-2xl border border-slate-800 hover:border-amber-500/50 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col h-full">
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <Image
          src={game.coverImage}
          alt={isFa ? game.title.fa : game.title.en}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Origin Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {game.origin === 'iranian' ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-lg flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              {isFa ? 'طراحی ایران 🇮🇷' : 'Iranian Design'}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/90 text-slate-300 border border-slate-700 backdrop-blur-md">
              {isFa ? 'بین‌المللی 🌐' : 'Global'}
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-slate-950/80 border border-amber-500/40 text-amber-400 backdrop-blur-md">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{game.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow space-y-4">
        
        <div>
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
            {isFa ? game.title.fa : game.title.en}
          </h3>
          <p className="text-xs text-amber-500/80 font-medium mt-0.5 line-clamp-1">
            {isFa ? game.subtitle.fa : game.subtitle.en}
          </p>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
          {isFa ? game.shortDescription.fa : game.shortDescription.en}
        </p>

        {/* Metadata Chips (Players, Time, Age) */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400 py-2 border-y border-slate-800/80">
          <div className="flex items-center gap-1.5" title={isFa ? 'تعداد بازیکنان' : 'Players'}>
            <Users className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {game.minPlayers === game.maxPlayers
                ? game.minPlayers
                : `${game.minPlayers}-${game.maxPlayers}`} {isFa ? 'نفر' : 'players'}
            </span>
          </div>

          <div className="flex items-center gap-1.5" title={isFa ? 'زمان بازی' : 'Playing Time'}>
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>{game.playingTimeMinutes} {isFa ? 'دقیقه' : 'min'}</span>
          </div>
        </div>

        {/* Learning Potential Badges (First 2) */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {game.skills.slice(0, 2).map((skill, idx) => (
            <SkillBadge
              key={idx}
              skillKey={skill.key}
              title={skill.title}
              score={skill.score}
              lang={lang}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-2 mt-auto">
          <Link
            href={`/games/${game.id}`}
            className="flex items-center justify-between w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-amber-500 text-slate-200 hover:text-slate-950 transition-all duration-300 group/btn"
          >
            <span>{isFa ? 'مشاهده کامل و نقد بازی' : 'View Game Details'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};
