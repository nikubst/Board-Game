export interface Palette {
  id: string;
  name: string;
  colors: string[];
  created_at: string;
  updated_at: string;
  user_id: string;
  project_id: string | null;
}

export interface PaletteFormData {
  name: string;
  colors: string[];
  project_id?: string | null;
}

export interface Color {
  hex: string;
  rgb: string;
}