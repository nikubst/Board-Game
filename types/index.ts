export * from './project';
export * from './idea';
export * from './palette';

export interface Inspiration {
  id: string;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}