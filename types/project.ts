export type ProjectStatus = 'idea' | 'in_progress' | 'completed';

export interface Project {
  id: string;
  title: string;
  description: string | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface ProjectFormData {
  title: string;
  description?: string;
  status: ProjectStatus;
}

export interface ProjectWithCount extends Project {
  ideas_count?: number;
  palettes_count?: number;
}