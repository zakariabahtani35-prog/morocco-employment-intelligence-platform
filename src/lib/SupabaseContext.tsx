import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, getSupabaseClient, isSupabaseConfigured, updateSupabaseInstance } from './supabase';

interface SupabaseContextType {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isConfigured: boolean;
  client: SupabaseClient;
  updateCredentials: (url: string, key: string) => void;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [supabaseUrl, setSupabaseUrl] = useState<string>(SUPABASE_URL);
  const [supabaseAnonKey, setSupabaseAnonKey] = useState<string>(SUPABASE_ANON_KEY);
  const [client, setClient] = useState<SupabaseClient>(() => getSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY));

  const updateCredentials = (newUrl: string, newKey: string) => {
    setSupabaseUrl(newUrl);
    setSupabaseAnonKey(newKey);
    const updatedClient = updateSupabaseInstance(newUrl, newKey);
    setClient(updatedClient);
  };

  const isConfigured = isSupabaseConfigured(supabaseUrl, supabaseAnonKey);

  return (
    <SupabaseContext.Provider
      value={{
        supabaseUrl,
        supabaseAnonKey,
        isConfigured,
        client,
        updateCredentials
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabaseContext = (): SupabaseContextType => {
  const context = useContext(SupabaseContext);
  if (!context) {
    // Fallback if rendered outside provider
    const fallbackClient = getSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return {
      supabaseUrl: SUPABASE_URL,
      supabaseAnonKey: SUPABASE_ANON_KEY,
      isConfigured: isSupabaseConfigured(SUPABASE_URL, SUPABASE_ANON_KEY),
      client: fallbackClient,
      updateCredentials: updateSupabaseInstance
    };
  }
  return context;
};
