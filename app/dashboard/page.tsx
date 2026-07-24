'use client';

import React from 'react';
import Link from 'next/link';
import { useProjects } from '@/hooks/useProjects';
import { useIdeas } from '@/hooks/useIdeas';
import { usePalettes } from '@/hooks/usePalettes';
import { useTranslations } from '@/hooks/useTranslations';
import { StatCard, Card, EmptyState } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProjectList } from '@/components/projects/ProjectCard';

export default function DashboardPage() {
  const { t } = useTranslations();
  const { projects, loading: projectsLoading, getCount: getProjectCount } = useProjects();
  const { ideas, loading: ideasLoading, getCount: getIdeaCount } = useIdeas();
  const { palettes, loading: palettesLoading, getCount: getPaletteCount } = usePalettes();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="animate-fade-in rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-800 to-cyan-700 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">{t('dashboard', 'creativeWorkspace')}</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              {t('dashboard', 'yourDashboard')}
            </h1>
            <p className="mt-3 text-slate-200">
              {t('dashboard', 'dashboardDescription')}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-sm text-cyan-100">{t('dashboard', 'todaysFocus')}</p>
            <p className="mt-1 font-semibold">{t('dashboard', 'todaysFocusText')}</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
        <StatCard
          title={t('dashboard', 'activeProjects')}
          value={projects.length}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="text-purple-400"
        />

        <StatCard
          title={t('dashboard', 'designConcepts')}
          value={ideas.length}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
          color="text-pink-400"
        />

        <StatCard
          title={t('dashboard', 'colorSystems')}
          value={palettes.length}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          }
          color="text-blue-400"
        />
      </div>

      {/* Quick Actions */}
      <Card padding="lg" className="animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{t('dashboard', 'studioActions')}</h2>
            <p className="text-slate-500">
              {t('dashboard', 'studioActionsDescription')}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link href="/dashboard/projects/new" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-300 hover:bg-cyan-50">
              <div className="flex items-center gap-2 text-slate-900">
                <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">{t('dashboard', 'newProject')}</span>
              </div>
            </Link>
            <Link href="/dashboard/ideas/new" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-300 hover:bg-cyan-50">
              <div className="flex items-center gap-2 text-slate-900">
                <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="font-medium">{t('dashboard', 'designBrief')}</span>
              </div>
            </Link>
            <Link href="/dashboard/palettes" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-300 hover:bg-cyan-50">
              <div className="flex items-center gap-2 text-slate-900">
                <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <span className="font-medium">{t('dashboard', 'colorSystemsLink')}</span>
              </div>
            </Link>
          </div>
        </div>
      </Card>

      {/* Recent Projects */}
      {projects.length > 0 ? (
        <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">{t('dashboard', 'currentProjects')}</h2>
            <Link href="/dashboard/projects">
              <Button variant="ghost" size="sm">
                {t('dashboard', 'viewAll')}
              </Button>
            </Link>
          </div>
          <ProjectList
            projects={projects.slice(0, 3)}
            loading={projectsLoading}
            emptyMessage={t('dashboard', 'noActiveProjectsEmpty')}
          />
        </div>
      ) : (
        <EmptyState
          title={t('dashboard', 'noActiveProjects')}
          description={t('dashboard', 'noActiveProjectsDescription')}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          action={
            <Link href="/dashboard/projects/new">
              <Button>{t('dashboard', 'startNewProject')}</Button>
            </Link>
          }
        />
      )}

      {/* Recent Ideas */}
      {ideas.length > 0 && (
        <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">{t('dashboard', 'recentConcepts')}</h2>
            <Link href="/dashboard/ideas">
              <Button variant="ghost" size="sm">
                {t('dashboard', 'viewAll')}
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ideas.slice(0, 3).map((idea) => (
              <Card key={idea.id} className="hover:shadow-lg transition-shadow duration-300">
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 truncate mb-2">{idea.concept}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-3">{idea.description}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-xs text-purple-400">{idea.prompt}</span>
                    <div className="flex gap-1">
                      {idea.color_palette?.slice(0, 2).map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}