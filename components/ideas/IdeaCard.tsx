'use client';

import React from 'react';
import Link from 'next/link';
import { Idea } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const IdeaCard: React.FC<{
  idea: Idea;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}> = ({ idea, onDelete, showActions = true }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete && idea.id) {
      onDelete(idea.id);
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
            <Link href={`#`} className="block">
              <h3 className="text-lg font-semibold text-slate-900 truncate group-hover:text-purple-400 transition-colors">
                {idea.concept}
              </h3>
            </Link>
            <p className="text-xs text-purple-400 mt-1 truncate">
              {idea.prompt}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-sm text-slate-500 line-clamp-2">{idea.description}</p>

          {/* Style Direction */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500">Style:</span>
            <span className="text-sm text-slate-600">{idea.style_direction}</span>
          </div>

          {/* Typography */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500">Typography:</span>
            <span className="text-sm text-slate-600 truncate">{idea.typography}</span>
          </div>

          {/* Color Palette */}
          {idea.color_palette && idea.color_palette.length > 0 && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-sm font-medium text-slate-500">Colors:</span>
              <div className="flex gap-1">
                {idea.color_palette.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 rounded"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {idea.color_palette.length > 3 && (
                  <span className="text-xs text-slate-500">+{idea.color_palette.length - 3}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
          <span className="text-xs text-slate-500">
            {new Date(idea.created_at).toLocaleDateString()}
          </span>
          
          {showActions && (
            <div className="flex items-center gap-2">
              <Link href={`#`} className="text-slate-500 hover:text-purple-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="p-1 text-slate-500 hover:text-red-400"
                  title="Delete idea"
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

// Idea list component
export const IdeaList: React.FC<{
  ideas: Idea[];
  onDelete?: (id: string) => void;
  loading?: boolean;
  emptyMessage?: string;
}> = ({ ideas, onDelete, loading, emptyMessage = 'No ideas found' }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-32 bg-slate-200 rounded-lg"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (ideas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ideas.map((idea) => (
        <IdeaCard
          key={idea.id}
          idea={idea}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};