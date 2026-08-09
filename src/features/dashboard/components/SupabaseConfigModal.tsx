import React from 'react';
import { motion } from 'framer-motion';
import { Database, ShieldCheck, Link, Key, Check, Copy, X } from 'lucide-react';
import { DashboardLiveData } from '../../../lib/supabaseService';

export const SUPABASE_RPC_SQL = `-- MEIP Supabase KPI RPC Aggregator Function
CREATE OR REPLACE FUNCTION get_dashboard_kpis()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_total_jobs bigint;
  v_new_today bigint;
  v_hiring_companies bigint;
  v_cities_count bigint;
  v_avg_salary numeric;
  v_remote_jobs bigint;
  v_pipeline_success numeric;
  v_result json;
BEGIN
  -- 1. Total Active Jobs
  SELECT count(*) INTO v_total_jobs FROM jobs;

  -- 2. New Jobs Today
  SELECT count(*) INTO v_new_today 
  FROM jobs 
  WHERE created_at >= CURRENT_DATE 
     OR publication_date >= CURRENT_DATE;

  -- 3. Hiring Companies
  SELECT count(DISTINCT company) INTO v_hiring_companies FROM jobs;
  IF v_hiring_companies = 0 THEN
    SELECT count(*) INTO v_hiring_companies FROM companies;
  END IF;

  -- 4. Cities Covered
  SELECT count(DISTINCT location) INTO v_cities_count FROM jobs WHERE location IS NOT NULL AND location <> '';
  IF v_cities_count = 0 THEN
    SELECT count(DISTINCT city) INTO v_cities_count FROM locations;
  END IF;

  -- 5. Average Salary in MAD
  SELECT round(avg(
    CASE 
      WHEN salary ~ '^[0-9]+' THEN (regexp_matches(replace(salary, ',', ''), '[0-9]+'))[1]::numeric
      ELSE NULL
    END
  ))
  INTO v_avg_salary
  FROM jobs
  WHERE salary IS NOT NULL;

  -- 6. Remote / Hybrid Jobs
  SELECT count(*) INTO v_remote_jobs
  FROM jobs
  WHERE work_type ILIKE '%remote%' 
     OR work_type ILIKE '%hybrid%'
     OR contract_type ILIKE '%remote%'
     OR description ILIKE '%télétravail%';

  -- 7. Pipeline Success Rate
  SELECT 
    CASE 
      WHEN count(*) > 0 THEN round((count(*) FILTER (WHERE status = 'SUCCESS')::numeric / count(*)::numeric) * 100, 1)
      ELSE 100.0
    END
  INTO v_pipeline_success
  FROM pipeline_logs;

  -- Build Result JSON
  SELECT json_build_object(
    'total_active_jobs', COALESCE(v_total_jobs, 0),
    'new_jobs_today', COALESCE(v_new_today, 0),
    'hiring_companies', COALESCE(v_hiring_companies, 0),
    'cities_covered', COALESCE(v_cities_count, 0),
    'avg_salary', v_avg_salary,
    'remote_jobs', COALESCE(v_remote_jobs, 0),
    'pipeline_success_rate', COALESCE(v_pipeline_success, 100.0)
  ) INTO v_result;

  RETURN v_result;
END;
$$;

-- Grant public read access to skills table
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on skills" ON public.skills;
CREATE POLICY "Allow public read access on skills" ON public.skills FOR SELECT USING (true);
`;

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  liveData: DashboardLiveData | null;
  customSupabaseUrl: string;
  setCustomSupabaseUrl: (url: string) => void;
  customSupabaseKey: string;
  setCustomSupabaseKey: (key: string) => void;
  copiedSql: boolean;
  handleCopySql: () => void;
  onSave: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  liveData,
  customSupabaseUrl,
  setCustomSupabaseUrl,
  customSupabaseKey,
  setCustomSupabaseKey,
  copiedSql,
  handleCopySql,
  onSave
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`w-full max-w-2xl rounded-2xl border p-6 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto ${
          isDarkMode ? 'bg-[#18181B] border-[#27272A] text-zinc-100' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#27272A] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E6004D]/10 text-[#E6004D] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-space font-extrabold text-lg uppercase tracking-tight">
                Supabase Connection & SQL RPC Setup
              </h3>
              <p className="font-sans-body text-xs text-gray-500 dark:text-zinc-400">
                Zero-mock dynamic queries across PostgreSQL database tables
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#27272A] text-gray-500 dark:text-zinc-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Banner */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          liveData?.isLive
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-200'
            : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-200'
        }`}>
          <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-space font-bold uppercase">
              {liveData?.isLive ? 'Live Database Active' : 'Supabase Configured'}
            </div>
            <p className="opacity-90 leading-relaxed">
              Queries are executing directly against <code className="font-mono font-bold">jobs</code>, <code className="font-mono font-bold">companies</code>, <code className="font-mono font-bold">locations</code>, and <code className="font-mono font-bold">pipeline_logs</code>.
            </p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono-code font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">
              SUPABASE_URL
            </label>
            <div className="relative">
              <Link className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={customSupabaseUrl}
                onChange={(e) => setCustomSupabaseUrl(e.target.value)}
                placeholder="https://your-project.supabase.co"
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-mono-code border focus:outline-none ${
                  isDarkMode
                    ? 'bg-[#27272A] border-[#3F3F46] text-zinc-100 focus:border-[#E6004D]'
                    : 'bg-[#F8F9FC] border-[#E2E8F0] text-[#0F172A] focus:border-[#E6004D]'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-code font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">
              SUPABASE_ANON_KEY
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={customSupabaseKey}
                onChange={(e) => setCustomSupabaseKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-mono-code border focus:outline-none ${
                  isDarkMode
                    ? 'bg-[#27272A] border-[#3F3F46] text-zinc-100 focus:border-[#E6004D]'
                    : 'bg-[#F8F9FC] border-[#E2E8F0] text-[#0F172A] focus:border-[#E6004D]'
                }`}
              />
            </div>
          </div>
        </div>

        {/* SQL RPC Script Card with Copy Button */}
        <div className="border-t border-[#E2E8F0] dark:border-[#27272A] pt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono-code text-[11px] font-bold uppercase text-gray-500 dark:text-zinc-400">
              Supabase SQL Function: get_dashboard_kpis()
            </span>
            <button
              onClick={handleCopySql}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold bg-[#E6004D]/10 text-[#E6004D] hover:bg-[#E6004D]/20 transition-colors"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'Copied SQL' : 'Copy SQL Script'}</span>
            </button>
          </div>
          <div className="p-3 rounded-xl bg-gray-900 text-zinc-300 font-mono-code text-[10px] max-h-32 overflow-y-auto leading-relaxed">
            <pre>{SUPABASE_RPC_SQL}</pre>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-[#E2E8F0] dark:border-[#27272A] pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-sans-body font-bold border border-[#E2E8F0] dark:border-[#27272A] hover:bg-gray-100 dark:hover:bg-[#27272A] transition-colors"
          >
            Close
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2 rounded-xl text-xs font-sans-body font-bold bg-[#E6004D] hover:bg-[#C20040] text-white shadow-xs transition-colors"
          >
            Save & Re-query Supabase
          </button>
        </div>
      </motion.div>
    </div>
  );
};
