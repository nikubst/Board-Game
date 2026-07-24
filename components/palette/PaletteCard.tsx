'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Palette } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const PaletteCard: React.FC<{
  palette: Palette;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, data: Partial<Palette>) => void;
  showActions?: boolean;
}> = ({ palette, onDelete, onUpdate, showActions = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(palette.name);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete && palette.id) {
      onDelete(palette.id);
    }
  };

  const handleUpdate = () => {
    if (onUpdate && palette.id && name !== palette.name) {
      onUpdate(palette.id, { name });
      setIsEditing(false);
    }
  };

  const copyToClipboard = (color: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(color);
    }
  };

  return (
    <Card
      className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      hoverEffect
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          {isEditing ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="flex-1"
              size={10}
              autoFocus
              onBlur={handleUpdate}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleUpdate();
                } else if (e.key === 'Escape') {
                  e.preventDefault();
                  setIsEditing(false);
                  setName(palette.name);
                }
              }}
            />
          ) : (
            <h3
              className="text-lg font-semibold text-slate-900 truncate flex-1"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              {palette.name}
            </h3>
          )}
          
          {showActions && !isEditing && (
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(palette.colors.join(', '));
                }}
                title="Copy colors"
                className="p-1 text-slate-500 hover:text-purple-400"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </Button>
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  title="Delete palette"
                  className="p-1 text-slate-500 hover:text-red-400"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Color Display */}
        <div className={`flex gap-2 transition-all duration-300 ${isExpanded ? 'flex-wrap' : 'flex-nowrap overflow-hidden'}`}>
          {palette.colors.map((color, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(color);
              }}
            >
              <div
                className={`rounded-lg transition-all duration-300 ${
                  isExpanded ? 'w-12 h-12' : 'w-8 h-8'
                }`}
                style={{ backgroundColor: color }}
                title={`Click to copy: ${color}`}
              />
              {isExpanded && (
                <span className="text-xs text-slate-500">{color}</span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
          <span className="text-xs text-slate-500">
            {new Date(palette.created_at).toLocaleDateString()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-xs text-slate-500"
          >
            {isExpanded ? 'Show Less' : `Show ${palette.colors.length} colors`}
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Palette list component
export const PaletteList: React.FC<{
  palettes: Palette[];
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, data: Partial<Palette>) => void;
  loading?: boolean;
  emptyMessage?: string;
}> = ({ palettes, onDelete, onUpdate, loading, emptyMessage = 'No palettes found' }) => {
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

  if (palettes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {palettes.map((palette) => (
        <PaletteCard
          key={palette.id}
          palette={palette}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

// Color palette display (horizontal)
export const ColorPaletteDisplay: React.FC<{
  colors: string[];
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}> = ({ colors, size = 'md', showLabels = false }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex gap-2 items-end">
      {colors.map((color, index) => (
        <div key={index} className="flex flex-col items-center gap-1">
          <div
            className={`rounded-lg ${sizes[size]}`}
            style={{ backgroundColor: color }}
            title={color}
          />
          {showLabels && (
            <span className="text-xs text-slate-500">{color}</span>
          )}
        </div>
      ))}
    </div>
  );
};