import { supabase } from '@/lib/supabaseClient';
import { Palette, PaletteFormData } from '@/types';

const TABLE_NAME = 'palettes';

// Predefined color palettes for generation
const predefinedPalettes: { name: string; colors: string[] }[] = [
  {
    name: 'Earth Tones',
    colors: ['#654321', '#8B4513', '#A0522D', '#CD853F', '#D2B48C'],
  },
  {
    name: 'Ocean Blues',
    colors: ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
  },
  {
    name: 'Sunset Gradient',
    colors: ['#EF4444', '#F97316', '#EAB308', '#84CC16', '#22C55E'],
  },
  {
    name: 'Pastel Dreams',
    colors: ['#FCE7F3', '#FBCFE8', '#F9A8D4', '#F472B6', '#EC4899'],
  },
  {
    name: 'Monochrome',
    colors: ['#000000', '#4B5563', '#6B7280', '#9CA3AF', '#F3F4F6'],
  },
  {
    name: 'Vibrant',
    colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#EF4444', '#10B981'],
  },
];

export const generatePalette = async (): Promise<{ name: string; colors: string[] }> => {
  const randomIndex = Math.floor(Math.random() * predefinedPalettes.length);
  return predefinedPalettes[randomIndex];
};

export const getPalettes = async (userId: string): Promise<Palette[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching palettes:', error);
    throw error;
  }

  return data || [];
};

export const getPaletteById = async (id: string): Promise<Palette | null> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching palette:', error);
    throw error;
  }

  return data || null;
};

export const createPalette = async (formData: PaletteFormData, userId: string): Promise<Palette> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{
      name: formData.name,
      colors: formData.colors,
      user_id: userId,
      project_id: formData.project_id || null,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating palette:', error);
    throw error;
  }

  return data;
};

export const updatePalette = async (id: string, formData: PaletteFormData): Promise<Palette> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({
      name: formData.name,
      colors: formData.colors,
      project_id: formData.project_id || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating palette:', error);
    throw error;
  }

  return data;
};

export const deletePalette = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting palette:', error);
    throw error;
  }
};

export const getPalettesByProject = async (projectId: string): Promise<Palette[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching palettes by project:', error);
    throw error;
  }

  return data || [];
};

export const getPaletteCount = async (userId: string): Promise<number> => {
  const { count, error } = await supabase
    .from(TABLE_NAME)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) {
    console.error('Error counting palettes:', error);
    return 0;
  }

  return count || 0;
};

export const createGeneratedPalette = async (userId: string, projectId?: string): Promise<Palette> => {
  const generatedPalette = await generatePalette();
  
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{
      name: generatedPalette.name,
      colors: generatedPalette.colors,
      user_id: userId,
      project_id: projectId || null,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating generated palette:', error);
    throw error;
  }

  return data;
};