import React from 'react';
import { Filter } from 'lucide-react';
import { DashboardLiveData } from '../../../lib/supabaseService';

interface DashboardFiltersToolbarProps {
  isDarkMode: boolean;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  selectedContract: string;
  setSelectedContract: (contract: string) => void;
  liveData: DashboardLiveData | null;
  lastUpdated: string;
}

export const DashboardFiltersToolbar: React.FC<DashboardFiltersToolbarProps> = ({
  isDarkMode,
  selectedCity,
  setSelectedCity,
  selectedIndustry,
  setSelectedIndustry,
  selectedContract,
  setSelectedContract,
  liveData,
  lastUpdated
}) => {
  return (
    <div className={`p-4 rounded-2xl border shadow-xs flex flex-wrap items-center justify-between gap-4 transition-colors ${
      isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E2E8F0]'
    }`}>
      <div className="flex items-center gap-2 text-[#0F172A] dark:text-zinc-200">
        <Filter className="w-4 h-4 text-[#E6004D]" />
        <span className="font-space font-bold text-xs uppercase tracking-wider">
          Live PostgreSQL Query Filters
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 flex-1">
        {/* City Filter */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className={`px-3 py-1.5 rounded-xl text-xs font-sans-body border focus:outline-none ${
            isDarkMode ? 'bg-[#27272A] border-[#3F3F46] text-zinc-100' : 'bg-[#F8F9FC] border-[#E2E8F0] text-gray-700'
          }`}
        >
          <option value="All">All Locations (National)</option>
          <option value="Casablanca">Casablanca</option>
          <option value="Rabat">Rabat</option>
          <option value="Tangier">Tangier</option>
          <option value="Marrakech">Marrakech</option>
          <option value="Agadir">Agadir</option>
          <option value="Fes">Fes</option>
          <option value="Kenitra">Kenitra</option>
        </select>

        {/* Industry Filter */}
        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          className={`px-3 py-1.5 rounded-xl text-xs font-sans-body border focus:outline-none ${
            isDarkMode ? 'bg-[#27272A] border-[#3F3F46] text-zinc-100' : 'bg-[#F8F9FC] border-[#E2E8F0] text-gray-700'
          }`}
        >
          <option value="All">All Sectors / Industries</option>
          <option value="Software">Software & IT</option>
          <option value="Data">Data Science & BI</option>
          <option value="Finance">Banking & Finance</option>
          <option value="Healthcare">Healthcare & Pharma</option>
          <option value="Marketing">Marketing & Digital</option>
        </select>

        {/* Contract Type */}
        <select
          value={selectedContract}
          onChange={(e) => setSelectedContract(e.target.value)}
          className={`px-3 py-1.5 rounded-xl text-xs font-sans-body border focus:outline-none ${
            isDarkMode ? 'bg-[#27272A] border-[#3F3F46] text-zinc-100' : 'bg-[#F8F9FC] border-[#E2E8F0] text-gray-700'
          }`}
        >
          <option value="All">All Contract Types</option>
          <option value="CDI">CDI (Permanent)</option>
          <option value="CDD">CDD (Fixed-Term)</option>
          <option value="Remote">100% Remote / Hybrid</option>
        </select>
      </div>

      <div className="font-mono-code text-[11px] text-gray-500 dark:text-zinc-400 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Query Latency: {liveData?.queryTimeMs || 0}ms</span>
        <span>• Sync: {lastUpdated}</span>
      </div>
    </div>
  );
};
