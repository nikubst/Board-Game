'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Project, ProjectFormData, ProjectStatus } from '@/types';
import { useTranslations } from '@/hooks/useTranslations';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ProjectFormProps {
  project?: Project | null;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  isLoading?: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSubmit,
  isLoading = false,
}) => {
  const router = useRouter();
  const { t } = useTranslations();
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    status: 'idea' as ProjectStatus,
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description || '',
        status: project.status,
      });
    }
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      if (!project) {
        router.push('/dashboard/projects');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const statusOptions = [
    { value: 'idea', label: t('projects', 'statusIdea') },
    { value: 'in_progress', label: t('projects', 'statusInProgress') },
    { value: 'completed', label: t('projects', 'statusCompleted') },
  ];

  return (
    <Card className="max-w-2xl mx-auto" padding="lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {project ? t('projects', 'editProject') : t('projects', 'createNewProject')}
        </h2>
        <p className="text-slate-500 mt-1">
          {project
            ? t('projects', 'updateProjectDetails')
            : t('projects', 'createNewProjectDesc')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={t('projects', 'projectTitle')}
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder={t('projects', 'projectTitlePlaceholder')}
          required
        />

        <Textarea
          label={t('projects', 'descriptionLabel')}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder={t('projects', 'descriptionPlaceholder')}
          rows={4}
        />

        <Select
          label={t('projects', 'statusLabel')}
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={statusOptions}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push('/dashboard/projects')}
          >
            {t('projects', 'cancel')}
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!formData.title}
          >
            {project ? t('projects', 'updateProject') : t('projects', 'createProject')}
          </Button>
        </div>
      </form>
    </Card>
  );
};

// Quick project creation form (simplified)
export const QuickProjectForm: React.FC<{
  onSubmit: (data: ProjectFormData) => Promise<void>;
  isLoading?: boolean;
}> = ({ onSubmit, isLoading = false }) => {
  const { t } = useTranslations();
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    status: 'idea' as ProjectStatus,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ title: '', description: '', status: 'idea' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        label={t('projects', 'projectTitle')}
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder={t('projects', 'projectTitlePlaceholder')}
        required
      />
      <Textarea
        label={t('projects', 'descriptionLabel')}
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder={t('projects', 'descriptionPlaceholder')}
        rows={2}
      />
      <Select
        label={t('projects', 'statusLabel')}
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={[
          { value: 'idea', label: t('projects', 'statusIdea') },
          { value: 'in_progress', label: t('projects', 'statusInProgress') },
          { value: 'completed', label: t('projects', 'statusCompleted') },
        ]}
      />
      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!formData.title}
        fullWidth
      >
        {t('projects', 'createProject')}
      </Button>
    </form>
  );
};