'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, CheckCircle2, AlertCircle, Send, User } from 'lucide-react';
import { UserComment } from '@/types/boardgame';
import { getComments, saveComments } from '@/lib/gameStore';
import { Language } from '@/lib/storage';

interface CommentSectionProps {
  gameId: string;
  lang: Language;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ gameId, lang }) => {
  const isFa = lang === 'fa';

  const [comments, setComments] = useState<UserComment[]>([]);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  useEffect(() => {
    const all = getComments();
    setComments(all.filter((c) => c.gameId === gameId && c.approved));
  }, [gameId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !content.trim()) return;

    const newComment: UserComment = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      gameId,
      userName: userName.trim(),
      rating,
      content: content.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      approved: false, // Moderation: pending admin approval
    };

    const all = getComments();
    const updated = [newComment, ...all];
    saveComments(updated);

    setUserName('');
    setContent('');
    setSubmittedMessage(true);

    setTimeout(() => {
      setSubmittedMessage(false);
    }, 5000);
  };

  return (
    <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <MessageSquare className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">
              {isFa ? 'نظرات و تجربیات کاربران' : 'User Reviews & Feedback'}
            </h3>
            <p className="text-xs text-slate-400">
              {isFa ? 'دیدگاه خود را درباره تجربه این بازی ثبت کنید' : 'Share your thoughts and rating about this board game'}
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-amber-400 border border-slate-700">
          {comments.length} {isFa ? 'نظر ثبت‌شده' : 'Reviews'}
        </span>
      </div>

      {/* Submission Feedback Alert */}
      {submittedMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>
            {isFa
              ? 'نظر شما با موفقیت ثبت شد و پس از بررسی و تایید مدیر در سایت قرار خواهد گرفت.'
              : 'Thank you! Your review was submitted and will appear after admin approval.'}
          </span>
        </div>
      )}

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {isFa ? 'نام شما' : 'Your Name'}
            </label>
            <div className="relative">
              <User className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={isFa ? 'مثال: علی محمدی' : 'e.g. Alex Smith'}
                className="w-full pr-10 pl-3 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {isFa ? 'امتیاز شما به بازی' : 'Rating'}
            </label>
            <div className="flex items-center gap-1.5 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-amber-400 mr-2">{rating} / 5</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            {isFa ? 'متن دیدگاه شما' : 'Your Review'}
          </label>
          <textarea
            required
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              isFa
                ? 'تجربه شما از بازی، نقاط قوت، درجه سختی و کیفیت تولید...'
                : 'Share details about gameplay, component quality, and fun factor...'
            }
            className="w-full p-3 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>{isFa ? 'ثبت دیدگاه' : 'Submit Review'}</span>
        </button>
      </form>

      {/* Approved Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs flex flex-col items-center gap-2">
            <AlertCircle className="w-6 h-6 opacity-40" />
            <span>{isFa ? 'هنوز نظری برای این بازی ثبت نشده است. اولین نظر را شما بنویسید!' : 'No reviews yet. Be the first to share your review!'}</span>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xs font-bold text-amber-400">
                    {comment.userName.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200">{comment.userName}</span>
                    <span className="block text-[10px] text-slate-500">{comment.createdAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < comment.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
