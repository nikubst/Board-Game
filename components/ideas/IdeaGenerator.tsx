'use client';

import React, { useState, useEffect } from 'react';
import { useIdeas } from '@/hooks/useIdeas';
import { useProjects } from '@/hooks/useProjects';
import { Idea, GeneratedIdea } from '@/types';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, EmptyState } from '@/components/ui/Card';
import { IdeaCard } from './IdeaCard';

export const IdeaGenerator: React.FC = () => {
  const { projects } = useProjects();
  const { generateFromPrompt, loading: isGenerating } = useIdeas();
  const [prompt, setPrompt] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState<GeneratedIdea | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [recentIdeas, setRecentIdeas] = useState<Idea[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      const idea = await generateFromPrompt(prompt, selectedProjectId || undefined);
      setGeneratedIdea({
        concept: idea.concept,
        color_palette: idea.color_palette,
        style_direction: idea.style_direction,
        typography: idea.typography,
        description: idea.description,
      });
      setPrompt('');
      // Add to recent ideas
      setRecentIdeas([idea, ...recentIdeas].slice(0, 3));
    } catch (error) {
      console.error('Error generating idea:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && prompt.trim()) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const projectOptions = [
    { value: '', label: 'No Project (Save to Ideas)' },
    ...projects.map((p) => ({ value: p.id, label: p.title })),
  ];

  return (
    <div className="space-y-6">
      {/* Generator Input */}
      <Card padding="lg">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Generate Design Ideas</h2>
          <p className="text-slate-500">
            Enter a prompt and let our AI-inspired system generate creative design ideas for you.
          </p>

          <div className="space-y-3">
            <Input
              label="Design Prompt"
              placeholder="e.g., Logo for a coffee brand, Modern website for a photography studio, etc."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              rightIcon={
                isGenerating ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="p-1 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                )
              }
            />

            <Select
              label="Associate with Project (Optional)"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              options={projectOptions}
            />

            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              isLoading={isGenerating}
              fullWidth
              size="lg"
            >
              Generate Idea
            </Button>
          </div>
        </div>
      </Card>

      {/* Generated Idea Display */}
      {generatedIdea && (
        <Card padding="lg">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Generated Idea</h3>
            <p className="text-slate-500">
              Based on your prompt: <span className="text-purple-400">{prompt}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div>
            <h4 className="text-sm font-medium text-slate-500 mb-2">Concept</h4>
            <p className="text-slate-900">{generatedIdea.concept}</p>
            </div>

            <div>
            <h4 className="text-sm font-medium text-slate-500 mb-2">Description</h4>
            <p className="text-slate-500">{generatedIdea.description}</p>
            </div>

            <div>
            <h4 className="text-sm font-medium text-slate-500 mb-2">Style Direction</h4>
            <p className="text-slate-500">{generatedIdea.style_direction}</p>
            </div>

            <div>
            <h4 className="text-sm font-medium text-slate-500 mb-2">Typography</h4>
            <p className="text-slate-500">{generatedIdea.typography}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-500 mb-2">Color Palette</h4>
              <div className="flex gap-2">
                {generatedIdea.color_palette.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-lg"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Recent Ideas */}
      {recentIdeas.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Ideas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} showActions={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Simple prompt input for quick generation
export const QuickIdeaGenerator: React.FC<{
  onGenerate: (prompt: string, projectId?: string) => Promise<void>;
  isLoading?: boolean;
  projects?: { id: string; title: string }[];
}> = ({ onGenerate, isLoading = false, projects = [] }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      await onGenerate(prompt, selectedProjectId || undefined);
      setPrompt('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        label="Design Prompt"
        placeholder="e.g., Logo for a coffee brand..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
      />
      {projects.length > 0 && (
        <Select
          label="Associate with Project (Optional)"
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          options={[
            { value: '', label: 'No Project' },
            ...projects.map((p) => ({ value: p.id, label: p.title })),
          ]}
        />
      )}
      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!prompt.trim()}
        fullWidth
      >
        Generate Idea
      </Button>
    </form>
  );
};