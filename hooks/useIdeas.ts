import { useState, useEffect } from 'react';
import { Idea, IdeaFormData, GeneratedIdea } from '@/types';
import {
  getIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea,
  getIdeaCount,
  getIdeasByProject,
  createIdeaFromPrompt,
} from '@/services/ideaService';
import { useAuth } from './useAuth';

export const useIdeas = () => {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchIdeas();
    }
  }, [user]);

  const fetchIdeas = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getIdeas(user.id);
      setIdeas(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch ideas');
      console.error('Error fetching ideas:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCount = async () => {
    if (!user) return 0;
    try {
      return await getIdeaCount(user.id);
    } catch (err) {
      console.error('Error getting idea count:', err);
      return 0;
    }
  };

  const getById = async (id: string) => {
    try {
      return await getIdeaById(id);
    } catch (err) {
      console.error('Error getting idea by id:', err);
      throw err;
    }
  };

  const getByProject = async (projectId: string) => {
    try {
      return await getIdeasByProject(projectId);
    } catch (err) {
      console.error('Error getting ideas by project:', err);
      return [];
    }
  };

  const create = async (formData: IdeaFormData) => {
    if (!user) throw new Error('User not authenticated');
    try {
      const newIdea = await createIdea(formData, user.id);
      setIdeas([newIdea, ...ideas]);
      return newIdea;
    } catch (err: any) {
      setError(err.message || 'Failed to create idea');
      throw err;
    }
  };

  const update = async (id: string, formData: IdeaFormData) => {
    try {
      const updatedIdea = await updateIdea(id, formData);
      setIdeas(
        ideas.map((i) => (i.id === id ? updatedIdea : i))
      );
      return updatedIdea;
    } catch (err: any) {
      setError(err.message || 'Failed to update idea');
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteIdea(id);
      setIdeas(ideas.filter((i) => i.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete idea');
      throw err;
    }
  };

  const generateFromPrompt = async (prompt: string, projectId?: string) => {
    if (!user) throw new Error('User not authenticated');
    try {
      const newIdea = await createIdeaFromPrompt(prompt, user.id, projectId);
      setIdeas([newIdea, ...ideas]);
      return newIdea;
    } catch (err: any) {
      setError(err.message || 'Failed to generate idea');
      throw err;
    }
  };

  const refresh = () => {
    if (user) {
      fetchIdeas();
    }
  };

  return {
    ideas,
    loading,
    error,
    getCount,
    getById,
    getByProject,
    create,
    update,
    remove,
    generateFromPrompt,
    refresh,
  };
};