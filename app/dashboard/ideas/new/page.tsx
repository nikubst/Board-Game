'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useIdeas } from '@/hooks/useIdeas';
import { useProjects } from '@/hooks/useProjects';
import { useTranslations } from '@/hooks/useTranslations';
import { IdeaGenerator } from '@/components/ideas/IdeaGenerator';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function NewIdeaPage() {
  const { generateFromPrompt, loading: generatingLoading } = useIdeas();
  const { projects, loading: projectsLoading } = useProjects();
  const { t } = useTranslations();
  const router = useRouter();

  const services = [
    'Brand Identity Design',
    'Website Design & Development',
    'Logo & Visual Identity',
    'Marketing Materials',
    'Packaging Design',
    'Digital Graphics',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t('ideas', 'submitBrief')}
          </h1>
          <p className="text-slate-500">
            {t('ideas', 'briefDescription')}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/ideas')}
        >
          {t('ideas', 'viewAllBriefs')}
        </Button>
      </div>

      {/* Design Brief Form */}
      <IdeaGenerator />

      {/* Guidelines Section */}
      <Card padding="lg" className="animate-slide-up" style={{ animationDelay: '200ms' }}>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">{t('ideas', 'briefGuidelines')}</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-600/20">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-slate-900">{t('ideas', 'describeProject')}</h3>
              <p className="text-sm text-slate-500">
                {t('ideas', 'describeProjectDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-pink-600/20">
              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-slate-900">{t('ideas', 'specifyRequirements')}</h3>
              <p className="text-sm text-slate-500">
                {t('ideas', 'specifyRequirementsDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-600/20">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-slate-900">{t('ideas', 'shareInspiration')}</h3>
              <p className="text-sm text-slate-500">
                {t('ideas', 'shareInspirationDesc')}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Service Examples */}
      <Card padding="lg" className="animate-slide-up" style={{ animationDelay: '300ms' }}>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">{t('ideas', 'designServices')}</h2>
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => {
                console.log('Service selected:', service);
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              {service}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}