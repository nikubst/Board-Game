'use client';

import React from 'react';
import { Brain, Compass, Users, Zap, Lightbulb, Coins, MessageSquare, Flame } from 'lucide-react';
import { SkillCategory, DualLanguageText } from '@/types/boardgame';
import { Language } from '@/lib/storage';

interface SkillBadgeProps {
  skillKey: SkillCategory;
  title: DualLanguageText;
  score?: number;
  lang: Language;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skillKey, title, score, lang }) => {
  const isFa = lang === 'fa';

  const getSkillConfig = (key: SkillCategory) => {
    switch (key) {
      case 'problem_solving':
        return { icon: Brain, color: 'from-sky-500 to-blue-600', text: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/30' };
      case 'strategic_thinking':
        return { icon: Compass, color: 'from-amber-500 to-orange-600', text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
      case 'collaboration':
        return { icon: Users, color: 'from-emerald-500 to-teal-600', text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
      case 'decision_making':
        return { icon: Zap, color: 'from-purple-500 to-violet-600', text: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' };
      case 'creativity':
        return { icon: Lightbulb, color: 'from-pink-500 to-rose-600', text: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/30' };
      case 'resource_management':
        return { icon: Coins, color: 'from-yellow-500 to-amber-600', text: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' };
      case 'negotiation':
        return { icon: MessageSquare, color: 'from-indigo-500 to-blue-600', text: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30' };
      default:
        return { icon: Flame, color: 'from-slate-500 to-slate-700', text: 'text-slate-300', bg: 'bg-slate-800 border-slate-700' };
    }
  };

  const config = getSkillConfig(skillKey);
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${config.bg} text-xs font-semibold backdrop-blur-sm transition-all hover:scale-105`}>
      <Icon className={`w-3.5 h-3.5 ${config.text}`} />
      <span className="text-slate-200">{isFa ? title.fa : title.en}</span>
      {score !== undefined && (
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 ${config.text}`}>
          {score}/10
        </span>
      )}
    </div>
  );
};
