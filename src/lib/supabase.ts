import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Safe WebSocket Polyfill for Node.js / CI test environments without native WebSocket
if (typeof globalThis.WebSocket === 'undefined') {
  class DummyWebSocket {
    static CONNECTING = 0;
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;
    readyState = 3;
    constructor() {}
    addEventListener() {}
    removeEventListener() {}
    send() {}
    close() {}
  }
  (globalThis as any).WebSocket = DummyWebSocket;
}

// Supabase Configuration loaded strictly from environment variables
const metaEnv = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' && process.env ? process.env : {});
export const SUPABASE_URL = (metaEnv.VITE_SUPABASE_URL as string) || '';
export const SUPABASE_ANON_KEY = (metaEnv.VITE_SUPABASE_ANON_KEY as string) || '';

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

