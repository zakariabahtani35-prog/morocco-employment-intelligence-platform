import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase Configuration
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://dkmqcccyzfhytnpwzcdr.supabase.co';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbXFjY2N5emZoeXRucHd6Y2RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzkwMDAsImV4cCI6MjAyMjQ1NTAwMH0.placeholder';

export const isSupabaseConfigured = (url: string = SUPABASE_URL, key: string = SUPABASE_ANON_KEY) => {
  return (
    Boolean(url) &&
    Boolean(key) &&
    !key.includes('placeholder')
  );
};

export function getSupabaseClient(url: string = SUPABASE_URL, key: string = SUPABASE_ANON_KEY): SupabaseClient {
  return createClient(url, key, {
    auth: { persistSession: false }
  });
}

export let supabase = getSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export function updateSupabaseInstance(url: string, key: string): SupabaseClient {
  supabase = getSupabaseClient(url, key);
  return supabase;
}

