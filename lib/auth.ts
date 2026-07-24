import { supabase } from './supabaseClient';
import { User } from '@/types';

export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email || '',
    created_at: user.created_at || new Date().toISOString(),
  };
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    throw error;
  }
  
  return session;
};

import type { Subscription } from '@supabase/supabase-js';

export const onAuthStateChange = (callback: (user: User | null) => void): { unsubscribe: () => void } => {
  const subscription = supabase.auth.onAuthStateChange(async (event, session) => {
    if (session) {
      const user: User = {
        id: session.user.id,
        email: session.user.email || '',
        created_at: session.user.created_at || new Date().toISOString(),
      };
      callback(user);
    } else {
      callback(null);
    }
  });
  
  return { unsubscribe: () => subscription.data.subscription?.unsubscribe?.() };
};