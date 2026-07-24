import { useState, useEffect } from 'react';
import { Palette, PaletteFormData } from '@/types';
import {
  getPalettes,
  getPaletteById,
  createPalette,
  updatePalette,
  deletePalette,
  getPaletteCount,
  getPalettesByProject,
  createGeneratedPalette,
} from '@/services/paletteService';
import { useAuth } from './useAuth';

export const usePalettes = () => {
  const { user } = useAuth();
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchPalettes();
    }
  }, [user]);

  const fetchPalettes = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getPalettes(user.id);
      setPalettes(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch palettes');
      console.error('Error fetching palettes:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCount = async () => {
    if (!user) return 0;
    try {
      return await getPaletteCount(user.id);
    } catch (err) {
      console.error('Error getting palette count:', err);
      return 0;
    }
  };

  const getById = async (id: string) => {
    try {
      return await getPaletteById(id);
    } catch (err) {
      console.error('Error getting palette by id:', err);
      throw err;
    }
  };

  const getByProject = async (projectId: string) => {
    try {
      return await getPalettesByProject(projectId);
    } catch (err) {
      console.error('Error getting palettes by project:', err);
      return [];
    }
  };

  const create = async (formData: PaletteFormData) => {
    if (!user) throw new Error('User not authenticated');
    try {
      const newPalette = await createPalette(formData, user.id);
      setPalettes([newPalette, ...palettes]);
      return newPalette;
    } catch (err: any) {
      setError(err.message || 'Failed to create palette');
      throw err;
    }
  };

  const update = async (id: string, formData: PaletteFormData) => {
    try {
      const updatedPalette = await updatePalette(id, formData);
      setPalettes(
        palettes.map((p) => (p.id === id ? updatedPalette : p))
      );
      return updatedPalette;
    } catch (err: any) {
      setError(err.message || 'Failed to update palette');
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      await deletePalette(id);
      setPalettes(palettes.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete palette');
      throw err;
    }
  };

  const generate = async (projectId?: string) => {
    if (!user) throw new Error('User not authenticated');
    try {
      const newPalette = await createGeneratedPalette(user.id, projectId);
      setPalettes([newPalette, ...palettes]);
      return newPalette;
    } catch (err: any) {
      setError(err.message || 'Failed to generate palette');
      throw err;
    }
  };

  const refresh = () => {
    if (user) {
      fetchPalettes();
    }
  };

  return {
    palettes,
    loading,
    error,
    getCount,
    getById,
    getByProject,
    create,
    update,
    remove,
    generate,
    refresh,
  };
};