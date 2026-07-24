import { supabase } from '@/lib/supabaseClient';
import { Project, ProjectFormData, ProjectStatus } from '@/types';

const TABLE_NAME = 'projects';

export const getProjects = async (userId: string): Promise<Project[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }

  return data || [];
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    throw error;
  }

  return data || null;
};

export const createProject = async (formData: ProjectFormData, userId: string): Promise<Project> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{
      title: formData.title,
      description: formData.description || null,
      status: formData.status,
      user_id: userId,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  return data;
};

export const updateProject = async (id: string, formData: ProjectFormData): Promise<Project> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({
      title: formData.title,
      description: formData.description || null,
      status: formData.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }

  return data;
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export const getProjectsByStatus = async (userId: string, status: ProjectStatus): Promise<Project[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('user_id', userId)
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects by status:', error);
    throw error;
  }

  return data || [];
};

export const getProjectCount = async (userId: string): Promise<number> => {
  const { count, error } = await supabase
    .from(TABLE_NAME)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) {
    console.error('Error counting projects:', error);
    return 0;
  }

  return count || 0;
};