import React from 'react';
import { Sparkles } from 'lucide-react';
import { DashboardLiveData } from '../../../lib/supabaseService';

interface AiInsightsSectionProps {
  isDarkMode: boolean;
  liveData: DashboardLiveData | null;
}

export const AiInsightsSection: React.FC<AiInsightsSectionProps> = ({
  isDarkMode,
  liveData
}) => {
  return (
    <div id="ai-insights" className={`p-6 rounded-2xl border shadow-xs space-y-4 ${
      isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E2E8F0]'
    }`}>
      <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#27272A] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-[#E6004D]/10 text-[#E6004D] rounded-lg">
            <Sparkles className="w-4 h-4" />
          </span>
          <h3 className="font-space font-extrabold text-base text-[#0F172A] dark:text-zinc-100 uppercase tracking-tight">
            MEIP Dynamic Labor Market Analysis
          </h3>
        </div>
        <span className="font-mono-code text-[11px] text-[#E6004D] font-bold uppercase">
          Zero-Mock Active Pipeline
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl border bg-white dark:bg-[#27272A]/70 dark:border-[#3F3F46] shadow-2xs space-y-2 border-l-4 border-[#E6004D]">
          <span className="font-mono-code text-[10px] font-bold text-gray-400 dark:text-zinc-400 uppercase tracking-wider">
            REAL-TIME MARKET SNAPSHOT
          </span>
          <h4 className="font-space font-bold text-sm text-[#0F172A] dark:text-zinc-100">
            {liveData?.totalActiveJobs ? `${liveData.totalActiveJobs.toLocaleString()} Active Listings Live` : 'Database Ready for Harvesting'}
          </h4>
          <p className="font-sans-body text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
            {liveData?.totalActiveJobs
              ? `Currently monitoring ${liveData.hiringCompaniesCount} active enterprises across ${liveData.citiesCoveredCount} Moroccan regions with an average monthly salary of ${liveData.avgSalaryMAD ? `${liveData.avgSalaryMAD.toLocaleString()} MAD` : 'N/A'}.`
              : 'The dashboard is bound to live Supabase tables. Use the SQL button to configure your schema and begin scraping.'}
          </p>
        </div>

        <div className="p-5 rounded-xl border bg-white dark:bg-[#27272A]/70 dark:border-[#3F3F46] shadow-2xs space-y-2 border-l-4 border-[#2563EB]">
          <span className="font-mono-code text-[10px] font-bold text-gray-400 dark:text-zinc-400 uppercase tracking-wider">
            REMOTE & HYBRID FLEXIBILITY
          </span>
          <h4 className="font-space font-bold text-sm text-[#0F172A] dark:text-zinc-100">
            {liveData?.remoteHybridCount ? `${liveData.remoteHybridCount.toLocaleString()} Flexible Positions` : '0 Remote Positions'}
          </h4>
          <p className="font-sans-body text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
            Real-time NLP filtering categorizes remote and hybrid opportunities directly from job postings across Morocco.
          </p>
        </div>

        <div className="p-5 rounded-xl border bg-white dark:bg-[#27272A]/70 dark:border-[#3F3F46] shadow-2xs space-y-2 border-l-4 border-emerald-500">
          <span className="font-mono-code text-[10px] font-bold text-gray-400 dark:text-zinc-400 uppercase tracking-wider">
            DATA REHYDRATION ENGINE
          </span>
          <h4 className="font-space font-bold text-sm text-[#0F172A] dark:text-zinc-100">
            {liveData?.isLive ? 'PostgreSQL Engine Active' : 'Configured for Live Querying'}
          </h4>
          <p className="font-sans-body text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
            All metrics, charts, and regional tables execute directly via PostgreSQL RPC and PostgREST endpoints without hardcoded fallbacks.
          </p>
        </div>
      </div>
    </div>
  );
};
