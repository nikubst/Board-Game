export interface Idea {
  id: string;
  prompt: string;
  concept: string;
  color_palette: string[];
  style_direction: string;
  typography: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  project_id: string | null;
}

export interface IdeaFormData {
  prompt: string;
  concept?: string;
  color_palette?: string[];
  style_direction?: string;
  typography?: string;
  description?: string;
  project_id?: string | null;
}

export interface GeneratedIdea {
  concept: string;
  color_palette: string[];
  style_direction: string;
  typography: string;
  description: string;
}