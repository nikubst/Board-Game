'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useIdeas } from '@/hooks/useIdeas';
import { useTranslations } from '@/hooks/useTranslations';
import { IdeaList } from '@/components/ideas/IdeaCard';
import { Button } from '@/components/ui/Button';
import { Card, EmptyState } from '@/components/ui/Card';

export default function IdeasPage() {
  const { ideas, loading, remove, refresh } = useIdeas();
  const { t } = useTranslations();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (deletingId) return;
    
    setDeletingId(id);
    try {
      await remove(id);
      refresh();
    } catch (error) {
      console.error('Error deleting idea:', error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t('ideas', 'myIdeas')}
          </h1>
          <p className="text-slate-500">
            {t('ideas', 'ideasDescription')}
          </p>
        </div>
        <Link href="/dashboard/ideas/new">
          <Button size="lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {t('ideas', 'generateNewIdea')}
          </Button>
        </Link>
      </div>

      {/* Filter and Search */}
      <Card padding="md" className="animate-slide-up">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t('ideas', 'searchIdeas')}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
          <Button variant="outline" size="sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h14a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 000 1.414l6.414 6.414a1 1 0 01-1.414 1.414L9 13.414V19a1 1 0 01-1 1H5a1 1 0 01-1-1v-5a1 1 0 00-1-1H3a1 1 0 01-1-1V4z" />
            </svg>
            {t('ideas', 'filter')}
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="ghost" size="sm">{t('ideas', 'all')}</Button>
          <Button variant="ghost" size="sm">{t('ideas', 'recent')}</Button>
          <Button variant="ghost" size="sm">{t('ideas', 'popular')}</Button>
          <Button variant="ghost" size="sm">{t('ideas', 'withProjects')}</Button>
        </div>
      </Card>

      {/* Ideas Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-40 bg-slate-200 rounded-lg"></div>
            </Card>
          ))}
        </div>
      ) : ideas.length > 0 ? (
        <IdeaList
          ideas={ideas}
          onDelete={handleDelete}
          loading={loading}
        />
      ) : (
        <EmptyState
          title={t('ideas', 'noIdeasFound')}
          description={t('ideas', 'noIdeasDescription')}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
          action={
            <Link href="/dashboard/ideas/new">
              <Button>{t('ideas', 'generateFirstIdea')}</Button>
            </Link>
          }
        />
      )}
    </div>
  );
}