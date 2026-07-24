'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePalettes } from '@/hooks/usePalettes';
import { useProjects } from '@/hooks/useProjects';
import { useTranslations } from '@/hooks/useTranslations';
import { PaletteList } from '@/components/palette/PaletteCard';
import { ColorPicker, PredefinedPalettes } from '@/components/palette/ColorPicker';
import { Button } from '@/components/ui/Button';
import { Card, EmptyState } from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Input';

export default function PalettesPage() {
  const { palettes, loading, create, remove, refresh } = usePalettes();
  const { projects, loading: projectsLoading } = useProjects();
  const { t } = useTranslations();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newPalette, setNewPalette] = useState({
    name: '',
    colors: [] as string[],
    project_id: '',
  });

  const handleDelete = async (id: string) => {
    if (deletingId) return;
    
    setDeletingId(id);
    try {
      await remove(id);
      refresh();
    } catch (error) {
      console.error('Error deleting palette:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreate = async () => {
    if (!newPalette.name || newPalette.colors.length === 0) return;

    try {
      await create({
        name: newPalette.name,
        colors: newPalette.colors,
        project_id: newPalette.project_id || undefined,
      });
      setNewPalette({ name: '', colors: [], project_id: '' });
      setIsCreating(false);
      refresh();
    } catch (error) {
      console.error('Error creating palette:', error);
    }
  };

  const handleUpdateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPalette({ ...newPalette, name: e.target.value });
  };

  const handleUpdateColors = (colors: string[]) => {
    setNewPalette({ ...newPalette, colors });
  };

  const handleUpdateProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewPalette({ ...newPalette, project_id: e.target.value });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t('palettes', 'myPalettes')}
          </h1>
          <p className="text-slate-500">
            {t('palettes', 'palettesDescription')}
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => setIsCreating(!isCreating)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('palettes', 'createNewPalette')}
        </Button>
      </div>

      {/* Create Palette Form */}
      {isCreating && (
        <Card padding="lg" className="animate-slide-up">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">{t('palettes', 'createNewPalette')}</h2>
          <div className="space-y-4">
            <Input
              label={t('palettes', 'paletteName')}
              placeholder={t('palettes', 'palettePlaceholder')}
              value={newPalette.name}
              onChange={handleUpdateName}
              required
            />

            <Select
              label={t('palettes', 'associateWithProject')}
              value={newPalette.project_id}
              onChange={handleUpdateProject}
              options={[
                { value: '', label: t('palettes', 'noProject') },
                ...projects.map((p) => ({ value: p.id, label: p.title })),
              ]}
            />

            <ColorPicker
              colors={newPalette.colors}
              onChange={handleUpdateColors}
              maxColors={5}
            />

            <PredefinedPalettes
              onSelect={(colors) => setNewPalette({ ...newPalette, colors })}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setNewPalette({ name: '', colors: [], project_id: '' });
                }}
              >
                {t('palettes', 'cancel')}
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!newPalette.name || newPalette.colors.length === 0}
              >
                {t('palettes', 'createPalette')}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Palettes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-24 bg-slate-200 rounded-lg"></div>
            </Card>
          ))}
        </div>
      ) : palettes.length > 0 ? (
        <PaletteList
          palettes={palettes}
          onDelete={handleDelete}
          loading={loading}
        />
      ) : (
        <EmptyState
          title={t('palettes', 'noPalettesFound')}
          description={t('palettes', 'noPalettesDescription')}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          }
          action={
            <Button onClick={() => setIsCreating(true)}>
              {t('palettes', 'createFirstPalette')}
            </Button>
          }
        />
      )}
    </div>
  );
}