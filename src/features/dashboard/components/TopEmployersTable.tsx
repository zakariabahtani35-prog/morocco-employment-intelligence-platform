import React from 'react';
import { Building2 } from 'lucide-react';
import { CompanyListingItem } from '../../../lib/supabaseService';

export type CompanyItem = CompanyListingItem;

interface TopEmployersTableProps {
  isLoading: boolean;
  isDarkMode: boolean;
  filteredCompanies: CompanyListingItem[];
  onSelectCompany?: (company: CompanyListingItem) => void;
}

export const TopEmployersTable: React.FC<TopEmployersTableProps> = ({
  isLoading,
  isDarkMode,
  filteredCompanies,
  onSelectCompany
}) => {
  return (
    <div id="companies" className={`p-6 rounded-2xl border shadow-xs space-y-4 ${
      isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E2E8F0]'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-[#27272A] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-[#E6004D]/10 text-[#E6004D] rounded-lg">
            <Building2 className="w-4 h-4" />
          </span>
          <h3 className="font-space font-extrabold text-base text-[#0F172A] dark:text-zinc-100 uppercase tracking-tight">
            Top Hiring Employers in Morocco
          </h3>
        </div>
        <span className="font-mono-code text-[11px] text-gray-500 dark:text-zinc-400 font-bold uppercase">
          {filteredCompanies.length} Live Employer Profiles
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`h-12 w-full rounded-xl animate-pulse ${isDarkMode ? 'bg-zinc-800/40' : 'bg-gray-100'}`} />
          ))}
        </div>
      ) : filteredCompanies.length > 0 ? (
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[#E2E8F0] dark:border-[#27272A] text-[11px] font-mono-code uppercase text-gray-500 dark:text-zinc-400">
                <th className="py-3 px-4 font-bold">Company</th>
                <th className="py-3 px-4 font-bold">Industry Sector</th>
                <th className="py-3 px-4 font-bold">Open Jobs</th>
                <th className="py-3 px-4 font-bold">Average Salary</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#27272A] text-xs">
              {filteredCompanies.map((c, i) => (
                <tr 
                  key={i}
                  onClick={() => onSelectCompany?.(c)}
                  className="hover:bg-[#F8F9FC] dark:hover:bg-[#27272A]/50 transition-colors cursor-pointer"
                  title="Click to view interactive company profile"
                >
                  <td className="py-3 px-4 font-bold text-[#0F172A] dark:text-zinc-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-space font-bold text-xs hover:text-[#E6004D] transition-colors">{c.name}</span>
                      <span className="font-mono-code text-[10px] text-gray-400 dark:text-zinc-500 uppercase">{c.code}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-zinc-300 font-medium">
                    {c.category}
                  </td>
                  <td className="py-3 px-4 font-mono-code font-bold text-[#E6004D]">
                    {c.openJobs} openings
                  </td>
                  <td className="py-3 px-4 font-mono-code text-gray-700 dark:text-zinc-300">
                    {c.avgSalary}
                  </td>
                  <td className="py-3 px-4 font-mono-code text-emerald-600 dark:text-emerald-400 font-bold">
                    {c.hiringRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center border border-dashed rounded-xl border-gray-300 dark:border-zinc-800">
          <Building2 className="w-8 h-8 text-gray-400 dark:text-zinc-600 mx-auto mb-2" />
          <p className="text-xs text-gray-500 dark:text-zinc-500">
            No employer profiles found matching the current filters.
          </p>
        </div>
      )}
    </div>
  );
};
