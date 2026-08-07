import React from 'react';
import { Building2, X, Briefcase, MapPin, DollarSign, Cpu, ExternalLink, CheckCircle2, TrendingUp } from 'lucide-react';
import { CompanyListingItem, JobRecordItem } from '../../../lib/supabaseService';

interface CompanyProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyListingItem | null;
  companyJobs: JobRecordItem[];
  isDarkMode: boolean;
  onSelectJob: (job: JobRecordItem) => void;
}

export const CompanyProfileDrawer: React.FC<CompanyProfileDrawerProps> = ({
  isOpen,
  onClose,
  company,
  companyJobs = [],
  isDarkMode,
  onSelectJob
}) => {
  if (!isOpen || !company) return null;

  // Aggregate skills for this company
  const companySkills = Array.from(
    new Set(companyJobs.flatMap(j => j.skills || []))
  ).slice(0, 8);

  const companyLocations = Array.from(
    new Set(companyJobs.map(j => j.location).filter(Boolean))
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className={`w-full max-w-xl h-full shadow-2xl flex flex-col justify-between overflow-hidden transition-transform animate-in slide-in-from-right duration-300 ${
        isDarkMode ? 'bg-[#121215] text-zinc-100 border-l border-[#27272A]' : 'bg-white text-[#0F172A] border-l border-[#E2E8F0]'
      }`}>
        
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8F0] dark:border-[#27272A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#E6004D]/10 text-[#E6004D] flex items-center justify-center font-space font-extrabold text-lg border border-[#E6004D]/20">
              {company.code || company.name.substring(0, 3).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-space font-extrabold text-lg text-[#0F172A] dark:text-zinc-100 leading-tight">
                  {company.name}
                </h3>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              </div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 font-mono-code">
                {company.category} • Verified Employer
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-[#E2E8F0] dark:border-[#27272A] hover:bg-gray-100 dark:hover:bg-[#27272A] text-gray-500 dark:text-zinc-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Key Employer Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className={`p-3.5 rounded-xl border space-y-1 ${
              isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <span className="text-gray-400 font-mono-code text-[10px] block">Open Jobs</span>
              <span className="font-space font-extrabold text-lg text-[#E6004D]">{company.openJobs} Active</span>
            </div>

            <div className={`p-3.5 rounded-xl border space-y-1 ${
              isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <span className="text-gray-400 font-mono-code text-[10px] block">Avg Monthly Salary</span>
              <span className="font-space font-extrabold text-sm text-emerald-600 dark:text-emerald-400">{company.avgSalary}</span>
            </div>

            <div className={`p-3.5 rounded-xl border space-y-1 col-span-2 sm:col-span-1 ${
              isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <span className="text-gray-400 font-mono-code text-[10px] block">Hiring Pace</span>
              <span className="font-space font-extrabold text-sm text-[#2563EB]">{company.hiringRate} ({company.growth})</span>
            </div>
          </div>

          {/* Primary Locations */}
          <div className="space-y-2">
            <h4 className="font-space font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E6004D]" />
              Operating Locations in Morocco
            </h4>
            <div className="flex flex-wrap gap-2">
              {companyLocations.length > 0 ? (
                companyLocations.map(loc => (
                  <span key={loc} className="px-3 py-1 rounded-lg text-xs font-mono-code font-bold bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                    📍 {loc}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 rounded-lg text-xs font-mono-code bg-gray-100 dark:bg-zinc-800 text-gray-500">
                  Casablanca (Headquarters)
                </span>
              )}
            </div>
          </div>

          {/* Required Technologies & Competencies */}
          <div className="space-y-2">
            <h4 className="font-space font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Required Skills & Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {companySkills.length > 0 ? (
                companySkills.map(sk => (
                  <span key={sk} className="px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
                    {sk}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 font-mono-code">Management • SQL • French</span>
              )}
            </div>
          </div>

          {/* Active Job Listings */}
          <div className="space-y-3 pt-2">
            <h4 className="font-space font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center justify-between">
              <span>Active Job Listings ({companyJobs.length})</span>
              <span className="text-[10px] text-[#E6004D] font-mono-code">Click to view full description</span>
            </h4>

            {companyJobs.length > 0 ? (
              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {companyJobs.map(j => (
                  <div
                    key={j.id}
                    onClick={() => onSelectJob(j)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all hover:border-[#E6004D] ${
                      isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
                    }`}
                  >
                    <div className="space-y-1 pr-2">
                      <span className="font-space font-bold text-xs text-[#0F172A] dark:text-zinc-100 line-clamp-1">
                        {j.title}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] font-mono-code text-gray-500 dark:text-zinc-400">
                        <span>📍 {j.location}</span>
                        <span>• {j.contract_type}</span>
                        <span>• {j.work_type}</span>
                      </div>
                    </div>

                    <ExternalLink className="w-4 h-4 text-[#E6004D] shrink-0" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center border border-dashed rounded-xl border-gray-300 dark:border-zinc-800">
                <Briefcase className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-500">No active job listings found for {company.name} in current search query.</p>
              </div>
            )}
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#E2E8F0] dark:border-[#27272A] bg-gray-50 dark:bg-[#18181B]">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-[#0F172A] dark:text-zinc-100 font-sans-body font-bold text-xs transition-colors cursor-pointer"
          >
            Close Company Profile
          </button>
        </div>

      </div>
    </div>
  );
};
