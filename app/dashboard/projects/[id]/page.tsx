'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/useProjects';
import { useIdeas } from '@/hooks/useIdeas';
import { usePalettes } from '@/hooks/usePalettes';
import { Project, Idea, Palette } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card, EmptyState, StatCard } from '@/components/ui/Card';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { IdeaList } from '@/components/ideas/IdeaCard';
import { PaletteList } from '@/components/palette/PaletteCard';
import { ColorPaletteDisplay } from '@/components/palette/PaletteCard';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { getById, update, remove, loading: projectsLoading } = useProjects();
  const { ideas, getByProject, loading: ideasLoading } = useIdeas();
  const { palettes, getByProject: getPalettesByProject, loading: palettesLoading } = usePalettes();
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [projectIdeas, setProjectIdeas] = useState<Idea[]>([]);
  const [projectPalettes, setProjectPalettes] = useState<Palette[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectData = await getById(params.id);
        if (!projectData) {
          router.push('/dashboard/projects');
          return;
        }
        setProject(projectData);

        // Fetch ideas and palettes for this project
        const ideasData = await getByProject(params.id);
        setProjectIdeas(ideasData);

        const palettesData = await getPalettesByProject(params.id);
        setProjectPalettes(palettesData);
      } catch (err) {
        console.error('Error fetching project data:', err);
        setError('Failed to load project data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router, getById, getByProject, getPalettesByProject]);

  const handleUpdate = async (formData: any) => {
    try {
      if (!project?.id) return;
      const updatedProject = await update(project.id, formData);
      setProject(updatedProject);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating project:', err);
      setError('Failed to update project');
    }
  };

  const handleDelete = async () => {
    if (!project?.id) return;
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await remove(project.id);
        router.push('/dashboard/projects');
      } catch (err) {
        console.error('Error deleting project:', err);
        setError('Failed to delete project');
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <div className="h-16 bg-slate-200 rounded-lg"></div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-32 bg-slate-200 rounded-lg"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="text-center py-12">
        <h2 className="text-xl font-semibold text-red-400 mb-2">{error}</h2>
        <Button onClick={() => router.push('/dashboard/projects')}>Back to Projects</Button>
      </Card>
    );
  }

  if (!project) {
    return (
      <EmptyState
        title="Project Not Found"
        description="The project you're looking for doesn't exist or has been deleted."
        icon={
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        action={
          <Link href="/dashboard/projects">
            <Button>Back to Projects</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {project.title}
          </h1>
          <p className="text-slate-500">{project.description || 'No description provided'}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </Button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 animate-slide-up">
        <span className="text-sm font-medium text-slate-500">Status:</span>
        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${
            project.status === 'idea' ? 'bg-blue-600 text-blue-100' :
            project.status === 'in_progress' ? 'bg-yellow-600 text-yellow-100' :
            'bg-green-600 text-green-100'
          }`}
        >
          {project.status === 'idea' ? 'Idea' :
           project.status === 'in_progress' ? 'In Progress' : 'Completed'}
        </span>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <StatCard
          title="Created"
          value={new Date(project.created_at).toLocaleDateString()}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          color="text-slate-500"
        />
        <StatCard
          title="Last Updated"
          value={new Date(project.updated_at).toLocaleDateString()}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="text-slate-500"
        />
        <StatCard
          title="Ideas"
          value={projectIdeas.length}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
          color="text-purple-400"
        />
        <StatCard
          title="Palettes"
          value={projectPalettes.length}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          }
          color="text-pink-400"
        />
      </div>

      {/* Edit Form */}
      {isEditing && (
        <Card padding="lg" className="animate-slide-up">
          <ProjectForm
            project={project}
            onSubmit={handleUpdate}
            isLoading={projectsLoading}
          />
        </Card>
      )}

      {/* Ideas Section */}
      {projectIdeas.length > 0 && (
        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Project Ideas</h2>
            <Link href="/dashboard/ideas/new">
              <Button size="sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Idea
              </Button>
            </Link>
          </div>
          <IdeaList ideas={projectIdeas} loading={ideasLoading} />
        </div>
      )}

      {/* Palettes Section */}
      {projectPalettes.length > 0 && (
        <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Color Palettes</h2>
            <Link href="/dashboard/palettes">
              <Button size="sm" variant="outline">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Palette
              </Button>
            </Link>
          </div>
          <PaletteList palettes={projectPalettes} loading={palettesLoading} />
        </div>
      )}

      {/* Empty state for ideas and palettes */}
      {projectIdeas.length === 0 && projectPalettes.length === 0 && (
        <EmptyState
          title="No Content Yet"
          description="This project doesn't have any ideas or palettes yet. Start by generating ideas or creating palettes!"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
          action={
            <div className="flex gap-3">
              <Link href="/dashboard/ideas/new">
                <Button size="sm">Generate Idea</Button>
              </Link>
              <Link href="/dashboard/palettes">
                <Button size="sm" variant="outline">Create Palette</Button>
              </Link>
            </div>
          }
        />
      )}

      {/* Back Button */}
      <div className="pt-8">
        <Button variant="outline" onClick={() => router.push('/dashboard/projects')}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Projects
        </Button>
      </div>
    </div>
  );
}