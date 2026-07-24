import { supabase } from '@/lib/supabaseClient';
import { Idea, IdeaFormData, GeneratedIdea } from '@/types';

const TABLE_NAME = 'ideas';

// Mock data for idea generation
const mockIdeas: GeneratedIdea[] = [
  {
    concept: 'Minimalist Coffee Logo',
    color_palette: ['#2D1B14', '#8B4513', '#D2B48C', '#F5F5DC', '#CD853F'],
    style_direction: 'Clean, modern minimalism with organic shapes',
    typography: 'San-serif with hand-drawn coffee cup icon',
    description: 'A sleek coffee brand logo featuring a stylized coffee bean or cup with warm, earthy tones that convey premium quality and authenticity.',
  },
  {
    concept: 'Vintage Coffee House',
    color_palette: ['#8B0000', '#DAA520', '#F5DEB3', '#556B2F', '#A0522D'],
    style_direction: 'Retro vintage with ornate details',
    typography: 'Serif with decorative flourishes',
    description: 'A classic coffee house logo with vintage typography and rich, warm colors that evoke tradition and craftsmanship.',
  },
  {
    concept: 'Modern Coffee App',
    color_palette: ['#2C3E50', '#3498DB', '#ECF0F1', '#E74C3C', '#F39C12'],
    style_direction: 'Digital, tech-forward with gradient effects',
    typography: 'Bold sans-serif with clean lines',
    description: 'A contemporary coffee app logo with a digital-first approach, using vibrant colors and modern gradients.',
  },
  {
    concept: 'Artisan Coffee Roastery',
    color_palette: ['#654321', '#D2691E', '#DEB887', '#FFF8DC', '#8B0000'],
    style_direction: 'Handcrafted, organic textures',
    typography: 'Rustic serif with wood-grain background',
    description: 'An artisan coffee roastery logo that emphasizes craftsmanship with natural textures and earthy color palette.',
  },
];

export const generateIdea = async (prompt: string): Promise<GeneratedIdea> => {
  // Simulate AI generation with mock data
  const randomIndex = Math.floor(Math.random() * mockIdeas.length);
  return mockIdeas[randomIndex];
};

export const getIdeas = async (userId: string): Promise<Idea[]> => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Ideas table not ready or error:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn('Error fetching ideas:', err);
    return [];
  }
};

export const getIdeaById = async (id: string): Promise<Idea | null> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching idea:', error);
    throw error;
  }

  return data || null;
};

export const createIdea = async (formData: IdeaFormData, userId: string): Promise<Idea> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{
      prompt: formData.prompt,
      concept: formData.concept || '',
      color_palette: formData.color_palette || [],
      style_direction: formData.style_direction || '',
      typography: formData.typography || '',
      description: formData.description || '',
      user_id: userId,
      project_id: formData.project_id || null,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating idea:', error);
    throw error;
  }

  return data;
};

export const updateIdea = async (id: string, formData: IdeaFormData): Promise<Idea> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({
      prompt: formData.prompt,
      concept: formData.concept || '',
      color_palette: formData.color_palette || [],
      style_direction: formData.style_direction || '',
      typography: formData.typography || '',
      description: formData.description || '',
      project_id: formData.project_id || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating idea:', error);
    throw error;
  }

  return data;
};

export const deleteIdea = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting idea:', error);
    throw error;
  }
};

export const getIdeasByProject = async (projectId: string): Promise<Idea[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching ideas by project:', error);
    throw error;
  }

  return data || [];
};

export const getIdeaCount = async (userId: string): Promise<number> => {
  const { count, error } = await supabase
    .from(TABLE_NAME)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) {
    console.error('Error counting ideas:', error);
    return 0;
  }

  return count || 0;
};

export const createIdeaFromPrompt = async (prompt: string, userId: string, projectId?: string): Promise<Idea> => {
  const generatedIdea = await generateIdea(prompt);
  
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{
      prompt,
      concept: generatedIdea.concept,
      color_palette: generatedIdea.color_palette,
      style_direction: generatedIdea.style_direction,
      typography: generatedIdea.typography,
      description: generatedIdea.description,
      user_id: userId,
      project_id: projectId || null,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating idea from prompt:', error);
    throw error;
  }

  return data;
};