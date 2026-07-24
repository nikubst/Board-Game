'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/useProjects';
import { useTranslations } from '@/hooks/useTranslations';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function NewProjectPage() {
  const { create, loading: creatingLoading } = useProjects();
  const { t } = useTranslations();
  const router = useRouter();

  const handleSubmit = async (formData: any) => {
    try {
      await create(formData);
      router.push('/dashboard/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t('projects', 'createNewProject')}
          </h1>
          <p className="text-slate-500">
            {t('projects', 'createNewProjectDesc')}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/projects')}
        >
          {t('projects', 'cancel')}
        </Button>
      </div>

      {/* Form */}
      <ProjectForm onSubmit={handleSubmit} isLoading={creatingLoading} />
    </div>
  );
}