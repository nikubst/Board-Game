'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getGames, saveGames, getComments, saveComments } from '@/lib/gameStore';
import { getStoredPrefs, savePrefs, Language } from '@/lib/storage';
import { BoardGame, UserComment, SkillCategory } from '@/types/boardgame';
import { ShieldCheck, Plus, Trash2, Edit, CheckCircle, XCircle, Image as ImageIcon, Save, RefreshCw, Award, Layers, MessageSquare } from 'lucide-react';

export default function AdminCMSPage() {
  const [lang, setLang] = useState<Language>('fa');
  const [games, setGames] = useState<BoardGame[]>([]);
  const [comments, setComments] = useState<UserComment[]>([]);
  
  const [activeTab, setActiveTab] = useState<'games' | 'add' | 'comments'>('games');
  const [editingGameId, setEditingGameId] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    titleFa: '',
    titleEn: '',
    subtitleFa: '',
    subtitleEn: '',
    shortDescFa: '',
    shortDescEn: '',
    fullDescFa: '',
    fullDescEn: '',
    rulesFa: '',
    rulesEn: '',
    coverImage: '',
    image1: '',
    image2: '',
    designerFa: '',
    designerEn: '',
    designerCountryFa: '',
    designerCountryEn: '',
    publisherFa: '',
    publisherEn: '',
    releaseYear: 2024,
    origin: 'iranian' as 'iranian' | 'international',
    minPlayers: 2,
    maxPlayers: 4,
    playingTimeMinutes: 30,
    minAge: 10,
    complexity: 2.5,
    rating: 8.5,
    categoriesFa: 'استراتژیک، کارتی',
    categoriesEn: 'Strategy, Card Game',
  });

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const prefs = getStoredPrefs();
    setLang(prefs.lang);
    refreshData();
  }, []);

  const refreshData = () => {
    setGames(getGames());
    setComments(getComments());
  };

  const handleToggleLang = () => {
    const newLang = lang === 'fa' ? 'en' : 'fa';
    setLang(newLang);
    savePrefs({ lang: newLang });
  };

  const isFa = lang === 'fa';

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Populate form for editing
  const startEditing = (game: BoardGame) => {
    setEditingGameId(game.id);
    setFormData({
      titleFa: game.title.fa,
      titleEn: game.title.en,
      subtitleFa: game.subtitle.fa,
      subtitleEn: game.subtitle.en,
      shortDescFa: game.shortDescription.fa,
      shortDescEn: game.shortDescription.en,
      fullDescFa: game.fullDescription.fa,
      fullDescEn: game.fullDescription.en,
      rulesFa: game.rulesOverview.fa,
      rulesEn: game.rulesOverview.en,
      coverImage: game.coverImage,
      image1: game.images[0] || '',
      image2: game.images[1] || '',
      designerFa: game.designers[0]?.name.fa || '',
      designerEn: game.designers[0]?.name.en || '',
      designerCountryFa: game.designers[0]?.country.fa || '',
      designerCountryEn: game.designers[0]?.country.en || '',
      publisherFa: game.publisher.fa,
      publisherEn: game.publisher.en,
      releaseYear: game.releaseYear,
      origin: game.origin,
      minPlayers: game.minPlayers,
      maxPlayers: game.maxPlayers,
      playingTimeMinutes: game.playingTimeMinutes,
      minAge: game.minAge,
      complexity: game.complexity,
      rating: game.rating,
      categoriesFa: game.categories.map((c) => c.fa).join('، '),
      categoriesEn: game.categories.map((c) => c.en).join(', '),
    });
    setActiveTab('add');
  };

  const resetForm = () => {
    setEditingGameId(null);
    setFormData({
      titleFa: '',
      titleEn: '',
      subtitleFa: '',
      subtitleEn: '',
      shortDescFa: '',
      shortDescEn: '',
      fullDescFa: '',
      fullDescEn: '',
      rulesFa: '',
      rulesEn: '',
      coverImage: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1000&auto=format&fit=crop',
      image1: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=1000&auto=format&fit=crop',
      image2: '',
      designerFa: 'طراح ایرانی',
      designerEn: 'Iranian Designer',
      designerCountryFa: 'ایران',
      designerCountryEn: 'Iran',
      publisherFa: 'نشر بازی ایرانی',
      publisherEn: 'Iranian Publisher',
      releaseYear: 2024,
      origin: 'iranian',
      minPlayers: 2,
      maxPlayers: 4,
      playingTimeMinutes: 45,
      minAge: 10,
      complexity: 2.5,
      rating: 8.5,
      categoriesFa: 'استراتژیک، خانوادگی',
      categoriesEn: 'Strategy, Family',
    });
  };

  // Save (Add or Update) Game
  const handleSaveGame = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrUpdatedGame: BoardGame = {
      id: editingGameId || 'game-' + Date.now().toString(36),
      title: { fa: formData.titleFa, en: formData.titleEn || formData.titleFa },
      subtitle: { fa: formData.subtitleFa, en: formData.subtitleEn || formData.subtitleFa },
      shortDescription: { fa: formData.shortDescFa, en: formData.shortDescEn || formData.shortDescFa },
      fullDescription: { fa: formData.fullDescFa, en: formData.fullDescEn || formData.fullDescFa },
      rulesOverview: { fa: formData.rulesFa, en: formData.rulesEn || formData.rulesFa },
      coverImage: formData.coverImage || 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1000&auto=format&fit=crop',
      images: [formData.coverImage, formData.image1, formData.image2].filter(Boolean),
      designers: [
        {
          name: { fa: formData.designerFa, en: formData.designerEn || formData.designerFa },
          country: { fa: formData.designerCountryFa, en: formData.designerCountryEn || formData.designerCountryFa }
        }
      ],
      publisher: { fa: formData.publisherFa, en: formData.publisherEn || formData.publisherFa },
      releaseYear: Number(formData.releaseYear),
      origin: formData.origin,
      minPlayers: Number(formData.minPlayers),
      maxPlayers: Number(formData.maxPlayers),
      playingTimeMinutes: Number(formData.playingTimeMinutes),
      minAge: Number(formData.minAge),
      complexity: Number(formData.complexity),
      rating: Number(formData.rating),
      categories: formData.categoriesFa.split('،').map((cat, idx) => ({
        fa: cat.trim(),
        en: (formData.categoriesEn.split(',')[idx] || cat).trim()
      })),
      skills: [
        {
          key: 'problem_solving',
          title: { fa: 'حل مسئله و منطق', en: 'Problem Solving' },
          score: 8.5,
          description: { fa: 'تقویت تفکر منطقی و تصمیم‌گیری تحت فشار.', en: 'Improves logic & crisis management.' }
        },
        {
          key: 'strategic_thinking',
          title: { fa: 'تفکر استراتژیک', en: 'Strategic Thinking' },
          score: 9.0,
          description: { fa: 'برنامه‌ریزی تاکتیکی چند نوبت جلوتر.', en: 'Tactical planning multiple turns ahead.' }
        }
      ],
      availableInIran: true
    };

    const currentGames = getGames();
    let updatedGames: BoardGame[];

    if (editingGameId) {
      updatedGames = currentGames.map((g) => (g.id === editingGameId ? newOrUpdatedGame : g));
      showNotify(isFa ? 'اطلاعات بازی با موفقیت به روز شد.' : 'Game updated successfully.');
    } else {
      updatedGames = [newOrUpdatedGame, ...currentGames];
      showNotify(isFa ? 'بازی جدید با موفقیت اضافه شد.' : 'New game added successfully.');
    }

    saveGames(updatedGames);
    setGames(updatedGames);
    resetForm();
    setActiveTab('games');
  };

  // Delete Game
  const handleDeleteGame = (id: string) => {
    if (!confirm(isFa ? 'آیا از حذف این بازی اطمینان دارید؟' : 'Are you sure you want to delete this game?')) return;
    const currentGames = getGames();
    const updated = currentGames.filter((g) => g.id !== id);
    saveGames(updated);
    setGames(updated);
    showNotify(isFa ? 'بازی حذف گردید.' : 'Game deleted.');
  };

  // Comment Moderation
  const handleApproveComment = (id: string) => {
    const all = getComments();
    const updated = all.map((c) => (c.id === id ? { ...c, approved: true } : c));
    saveComments(updated);
    setComments(updated);
    showNotify(isFa ? 'نظر کاربر تایید و منتشر شد.' : 'Comment approved.');
  };

  const handleDeleteComment = (id: string) => {
    const all = getComments();
    const updated = all.filter((c) => c.id !== id);
    saveComments(updated);
    setComments(updated);
    showNotify(isFa ? 'نظر حذف شد.' : 'Comment deleted.');
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 ${isFa ? 'rtl' : 'ltr'}`} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar lang={lang} onToggleLang={handleToggleLang} />

      {/* Header Banner */}
      <div className="bg-slate-900/80 border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>{isFa ? 'سیستم مدیریت محتوا (CMS)' : 'Content Management System'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-100">
            {isFa ? 'پنل مدیریت بازی‌ها و نظرات' : 'Board Games & Comments Admin Panel'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {isFa
              ? 'امکان اضافه کردن بازی جدید، ویرایش بازی‌های موجود، مدیریت گالری تصاویر و تایید نظرات کاربران.'
              : 'Add new board games, edit descriptions & images, and moderate user comments.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Notification Toast */}
        {notification && (
          <div className="p-4 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center gap-2 shadow-lg">
            <CheckCircle className="w-5 h-5 text-amber-400" />
            <span>{notification}</span>
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('games')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'games'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isFa ? `لیست بازی‌ها (${games.length})` : `Games List (${games.length})`}</span>
          </button>

          <button
            onClick={() => {
              resetForm();
              setActiveTab('add');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'add'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{editingGameId ? (isFa ? 'ویرایش بازی' : 'Edit Game') : (isFa ? 'افزودن بازی جدید' : 'Add New Game')}</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'comments'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isFa ? `مدیریت نظرات (${comments.length})` : `Comments Moderation (${comments.length})`}</span>
          </button>
        </div>

        {/* TAB 1: Games List View */}
        {activeTab === 'games' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-200">{isFa ? 'بازی‌های موجود در سامانه' : 'Registered Board Games'}</h3>
              <button onClick={refreshData} className="p-2 text-slate-400 hover:text-amber-400">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {games.map((g) => (
                <div key={g.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={g.coverImage} alt={g.title.fa} className="w-16 h-16 rounded-lg object-cover bg-slate-950" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                        <span>{isFa ? g.title.fa : g.title.en}</span>
                        {g.origin === 'iranian' && <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">ایران 🇮🇷</span>}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{isFa ? g.subtitle.fa : g.subtitle.en}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                        <span>{g.minPlayers}-{g.maxPlayers} نفر</span>
                        <span>•</span>
                        <span>{g.playingTimeMinutes} دقیقه</span>
                        <span>•</span>
                        <span>امتیاز: {g.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <button
                      onClick={() => startEditing(g)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-amber-500 text-slate-200 hover:text-slate-950 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>{isFa ? 'ویرایش' : 'Edit'}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteGame(g.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isFa ? 'حذف' : 'Delete'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Add / Edit Game Form */}
        {activeTab === 'add' && (
          <form onSubmit={handleSaveGame} className="bg-slate-900/80 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-amber-400 border-b border-slate-800 pb-3">
              {editingGameId ? (isFa ? 'ویرایش مشخصات بازی' : 'Edit Game Details') : (isFa ? 'فرم ثبت بازی رومیزی جدید' : 'Add New Board Game')}
            </h3>

            {/* Titles & Origin */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'نام فارسی بازی' : 'Persian Title'}</label>
                <input
                  type="text"
                  required
                  value={formData.titleFa}
                  onChange={(e) => setFormData({ ...formData, titleFa: e.target.value })}
                  placeholder="مثال: بازی شطرندان"
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'نام انگلیسی بازی' : 'English Title'}</label>
                <input
                  type="text"
                  required
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  placeholder="e.g. Shatrandan"
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'منشأ طراحی' : 'Origin'}</label>
                <select
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value as any })}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                >
                  <option value="iranian">{isFa ? 'طراحی ایران 🇮🇷' : 'Iranian Design 🇮🇷'}</option>
                  <option value="international">{isFa ? 'بین‌المللی 🌐' : 'International 🌐'}</option>
                </select>
              </div>
            </div>

            {/* Subtitles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'شعار / زیرعنوان فارسی' : 'Persian Subtitle'}</label>
                <input
                  type="text"
                  value={formData.subtitleFa}
                  onChange={(e) => setFormData({ ...formData, subtitleFa: e.target.value })}
                  placeholder="مثال: نبرد تاکتیکی و هوشمندانه"
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'زیرعنوان انگلیسی' : 'English Subtitle'}</label>
                <input
                  type="text"
                  value={formData.subtitleEn}
                  onChange={(e) => setFormData({ ...formData, subtitleEn: e.target.value })}
                  placeholder="e.g. Tactical mind battle"
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Image URLs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'آدرس تصویر کاور (URL)' : 'Cover Image URL'}</label>
                <input
                  type="text"
                  required
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'تصویر گالری ۱' : 'Gallery Image 1'}</label>
                <input
                  type="text"
                  value={formData.image1}
                  onChange={(e) => setFormData({ ...formData, image1: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'تصویر گالری ۲' : 'Gallery Image 2'}</label>
                <input
                  type="text"
                  value={formData.image2}
                  onChange={(e) => setFormData({ ...formData, image2: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Short Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'معرفی کوتاه فارسی' : 'Short Description (FA)'}</label>
                <textarea
                  rows={2}
                  value={formData.shortDescFa}
                  onChange={(e) => setFormData({ ...formData, shortDescFa: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'معرفی کوتاه انگلیسی' : 'Short Description (EN)'}</label>
                <textarea
                  rows={2}
                  value={formData.shortDescEn}
                  onChange={(e) => setFormData({ ...formData, shortDescEn: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Full Story & Rules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'توضیحات کامل و داستان' : 'Full Story (FA)'}</label>
                <textarea
                  rows={3}
                  value={formData.fullDescFa}
                  onChange={(e) => setFormData({ ...formData, fullDescFa: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'روند قوانین و مکانیزم' : 'Rules Summary (FA)'}</label>
                <textarea
                  rows={3}
                  value={formData.rulesFa}
                  onChange={(e) => setFormData({ ...formData, rulesFa: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Designers & Publisher */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'نام طراح' : 'Designer Name'}</label>
                <input
                  type="text"
                  value={formData.designerFa}
                  onChange={(e) => setFormData({ ...formData, designerFa: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'کشور طراح' : 'Designer Country'}</label>
                <input
                  type="text"
                  value={formData.designerCountryFa}
                  onChange={(e) => setFormData({ ...formData, designerCountryFa: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'ناشر' : 'Publisher'}</label>
                <input
                  type="text"
                  value={formData.publisherFa}
                  onChange={(e) => setFormData({ ...formData, publisherFa: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{isFa ? 'سال ساخت' : 'Release Year'}</label>
                <input
                  type="number"
                  value={formData.releaseYear}
                  onChange={(e) => setFormData({ ...formData, releaseYear: Number(e.target.value) })}
                  className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Game Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">{isFa ? 'حداقل بازیکن' : 'Min Players'}</label>
                <input
                  type="number"
                  value={formData.minPlayers}
                  onChange={(e) => setFormData({ ...formData, minPlayers: Number(e.target.value) })}
                  className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">{isFa ? 'حداکثر بازیکن' : 'Max Players'}</label>
                <input
                  type="number"
                  value={formData.maxPlayers}
                  onChange={(e) => setFormData({ ...formData, maxPlayers: Number(e.target.value) })}
                  className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">{isFa ? 'زمان (دقیقه)' : 'Time (min)'}</label>
                <input
                  type="number"
                  value={formData.playingTimeMinutes}
                  onChange={(e) => setFormData({ ...formData, playingTimeMinutes: Number(e.target.value) })}
                  className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">{isFa ? 'حداقل سن' : 'Min Age'}</label>
                <input
                  type="number"
                  value={formData.minAge}
                  onChange={(e) => setFormData({ ...formData, minAge: Number(e.target.value) })}
                  className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">{isFa ? 'پیچیدگی (1-5)' : 'Complexity'}</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.complexity}
                  onChange={(e) => setFormData({ ...formData, complexity: Number(e.target.value) })}
                  className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">{isFa ? 'امتیاز (1-10)' : 'Rating'}</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
              >
                <Save className="w-4 h-4" />
                <span>{editingGameId ? (isFa ? 'ذخیره تغییرات' : 'Update Game') : (isFa ? 'ذخیره بازی جدید' : 'Save Game')}</span>
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                {isFa ? 'انصراف' : 'Cancel'}
              </button>
            </div>

          </form>
        )}

        {/* TAB 3: Comments Moderation */}
        {activeTab === 'comments' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-200">{isFa ? 'مدیریت و تایید نظرات کاربران' : 'User Reviews Moderation Center'}</h3>

            {comments.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/50 rounded-xl text-slate-500 text-xs">
                {isFa ? 'هیچ نظری در سیستم موجود نیست.' : 'No user comments registered.'}
              </div>
            ) : (
              <div className="space-y-3">
                {comments.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-200">{c.userName}</span>
                        <span className="text-[10px] text-slate-500">{c.createdAt}</span>
                        {c.approved ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {isFa ? 'تایید شده' : 'Approved'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            {isFa ? 'در انتظار تایید' : 'Pending Approval'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300">{c.content}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!c.approved && (
                        <button
                          onClick={() => handleApproveComment(c.id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{isFa ? 'تایید نظر' : 'Approve'}</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteComment(c.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{isFa ? 'حذف' : 'Delete'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      <Footer lang={lang} />
    </div>
  );
}
