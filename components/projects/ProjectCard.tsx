'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const ProjectCard: React.FC<{
  project: Project;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}> = ({ project, onDelete, showActions = true }) => {
  const statusColors = {
    idea: 'bg-blue-600 text-blue-100',
    in_progress: 'bg-yellow-600 text-yellow-100',
    completed: 'bg-green-600 text-green-100',
  };

  const statusLabels = {
    idea: 'Idea',
    in_progress: 'In Progress',
    completed: 'Completed',
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete && project.id) {
      onDelete(project.id);
    }
  };

  return (
    <Card
      className="group hover:shadow-lg transition-shadow duration-300"
      hoverEffect
    >
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link
              href={`/dashboard/projects/${project.id}`}
              className="block"
            >
              <h3 className="text-lg font-semibold text-slate-900 truncate group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>
            </Link>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
              {project.description || 'No description provided'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
          <span
            className={`px-2 py-1 text-xs rounded-full font-medium ${
              statusColors[project.status] || 'bg-slate-200 text-slate-700'
            }`}
          >
            {statusLabels[project.status] || project.status}
          </span>
          
          {showActions && (
            <div className="flex items-center gap-2">
              <Link href={`/dashboard/projects/${project.id}`} className="text-slate-500 hover:text-purple-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
              <Link
                href={`/dashboard/projects/${project.id}/edit`}
                className="text-slate-500 hover:text-purple-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Link>
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="p-1 text-slate-500 hover:text-red-400"
                  title="Delete project"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// Project list component
export const ProjectList: React.FC<{
  projects: Project[];
  onDelete?: (id: string) => void;
  loading?: boolean;
  emptyMessage?: string;
}> = ({ projects, onDelete, loading, emptyMessage = 'No projects found' }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-20 bg-slate-200 rounded-lg"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};