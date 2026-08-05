import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase Configuration loaded strictly from environment variables
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (url: string = SUPABASE_URL, key: string = SUPABASE_ANON_KEY) => {
  return (
    Boolean(url) &&
    Boolean(key) &&
    !key.includes('placeholder') &&
    url.length > 10 &&
    key.length > 10
  );
};

export function getSupabaseClient(url: string = SUPABASE_URL, key: string = SUPABASE_ANON_KEY): SupabaseClient {
  const targetUrl = url || 'https://placeholder.supabase.co';
  const targetKey = key || 'placeholder-key';
  return createClient(targetUrl, targetKey, {
    auth: { persistSession: false }
  });
}

export let supabase = getSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export function updateSupabaseInstance(url: string, key: string): SupabaseClient {
  supabase = getSupabaseClient(url, key);
  return supabase;
}
