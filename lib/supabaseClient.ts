import { createClient } from '@supabase/supabase-js';

// Polyfill WebSocket for Node.js environments (e.g. Node 18 during SSR)
if (typeof window === 'undefined' && !(globalThis as any).WebSocket) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ws = require('ws');
    (globalThis as any).WebSocket = ws;
  } catch (e) {
    // ignore if ws is not found
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-ref.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const getServerSupabaseClient = async () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};