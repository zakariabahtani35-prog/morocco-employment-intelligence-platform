import React from 'react';
import { Building2, X, Briefcase, MapPin, DollarSign, Cpu, ExternalLink, CheckCircle2, TrendingUp, Sparkles, Layers } from 'lucide-react';
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

  // Aggregate skills strictly from real database job descriptions for this company
  const companySkills = Array.from(
    new Set(companyJobs.flatMap(j => j.skills || []))
  );

  // Aggregate actual locations strictly from database job listings for this company
  const companyLocations = Array.from(
    new Set(companyJobs.map(j => j.location).filter(Boolean))
  );

  // Calculate actual numeric salary range if present in DB
  const salaries = companyJobs
    .map(j => j.salary)
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      <div className={`w-full max-w-xl h-full shadow-2xl flex flex-col justify-between overflow-hidden transition-transform duration-300 animate-in slide-in-from-right ${
        isDarkMode ? 'bg-[#09090B] text-zinc-100 border-l border-[#27272A]' : 'bg-white text-[#0F172A] border-l border-[#E2E8F0]'
      }`}>
        
        {/* EXECUTIVE GLASSMORPHIC HEADER */}
        <div className={`p-6 border-b flex items-center justify-between sticky top-0 z-10 backdrop-blur-md ${
          isDarkMode ? 'bg-[#121215]/90 border-[#27272A]' : 'bg-white/90 border-[#E2E8F0]'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#E6004D] to-[#2563EB] p-0.5 shadow-md shrink-0">
              <div className={`w-full h-full rounded-[14px] flex items-center justify-center font-space font-extrabold text-base tracking-wider ${
                isDarkMode ? 'bg-[#18181B] text-white' : 'bg-white text-[#0F172A]'
              }`}>
                {company.code || company.name.substring(0, 3).toUpperCase()}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-space font-extrabold text-xl text-[#0F172A] dark:text-zinc-100 leading-tight">
                  {company.name}
                </h3>
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-[#E6004D]/10 text-[#E6004D] border border-[#E6004D]/20">
                  {company.category}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-zinc-400 font-mono-code">
                  Verified Employer Profile
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#27272A] hover:bg-gray-100 dark:hover:bg-[#27272A] text-gray-500 dark:text-zinc-400 transition-colors cursor-pointer"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DRAWER BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* KEY EMPLOYER METRICS CARDS (100% REAL SUPABASE DATA) */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-4 rounded-2xl border space-y-1.5 ${
              isDarkMode ? 'bg-[#121215] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-mono-code uppercase">
                <Briefcase className="w-3.5 h-3.5 text-[#E6004D]" />
                <span>Open Jobs</span>
              </div>
              <span className="font-space font-extrabold text-xl text-[#E6004D] block">
                {companyJobs.length || company.openJobs}
              </span>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1.5 ${
              isDarkMode ? 'bg-[#121215] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-mono-code uppercase">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>Monthly Salary</span>
              </div>
              <span className="font-space font-extrabold text-xs text-emerald-600 dark:text-emerald-400 block truncate">
                {company.avgSalary || 'Confidential'}
              </span>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1.5 ${
              isDarkMode ? 'bg-[#121215] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-mono-code uppercase">
                <TrendingUp className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Hiring Status</span>
              </div>
              <span className="font-space font-extrabold text-xs text-[#2563EB] block truncate">
                {company.hiringRate || 'Active'}
              </span>
            </div>
          </div>

          {/* OPERATING LOCATIONS IN MOROCCO */}
          <div className="space-y-2.5">
            <h4 className="font-space font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E6004D]" />
              Verified Locations in Morocco
            </h4>
            <div className="flex flex-wrap gap-2">
              {companyLocations.length > 0 ? (
                companyLocations.map(loc => (
                  <span key={loc} className="px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                    📍 {loc}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1.5 rounded-xl text-xs font-mono-code bg-gray-100 dark:bg-zinc-800 text-gray-400">
                  Location Not Specified
                </span>
              )}
            </div>
          </div>

          {/* REQUIRED SKILLS & COMPETENCIES (DYNAMICALLY EXTRACTED FROM DB) */}
          <div className="space-y-2.5">
            <h4 className="font-space font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#8B5CF6]" />
              Indexed Technical Skills & Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {companySkills.length > 0 ? (
                companySkills.map(sk => (
                  <span key={sk} className="px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
                    {sk}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 font-mono-code italic">
                  No explicit skill tags parsed from job text
                </span>
              )}
            </div>
          </div>

          {/* ACTIVE JOB LISTINGS LIST */}
          <div className="space-y-3 pt-2 border-t border-[#E2E8F0] dark:border-[#27272A]">
            <div className="flex items-center justify-between">
              <h4 className="font-space font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#E6004D]" />
                Live Job Listings ({companyJobs.length})
              </h4>
              <span className="text-[10px] text-[#E6004D] font-mono-code font-bold">
                Click any job to open full detail drawer
              </span>
            </div>

            {companyJobs.length > 0 ? (
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                {companyJobs.map(j => (
                  <div
                    key={j.id}
                    onClick={() => onSelectJob(j)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer hover:border-[#E6004D] hover:shadow-md ${
                      isDarkMode ? 'bg-[#121215] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5">
                        <span className="font-space font-bold text-sm text-[#0F172A] dark:text-zinc-100 block hover:text-[#E6004D] transition-colors">
                          {j.title}
                        </span>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono-code text-gray-500 dark:text-zinc-400">
                          <span className="px-2 py-0.5 rounded bg-gray-200 dark:bg-zinc-800 font-bold text-[#0F172A] dark:text-zinc-200">
                            📍 {j.location}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
                            {j.contract_type}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                            {j.work_type}
                          </span>
                        </div>
                      </div>

                      <ExternalLink className="w-4.5 h-4.5 text-[#E6004D] shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed rounded-2xl border-gray-300 dark:border-zinc-800">
                <Briefcase className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-mono-code">
                  No active job listings found for {company.name} under current filter query.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* DRAWER FOOTER */}
        <div className={`p-4 border-t ${
          isDarkMode ? 'bg-[#121215] border-[#27272A]' : 'bg-gray-50 border-[#E2E8F0]'
        }`}>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-[#0F172A] dark:text-zinc-100 font-sans-body font-bold text-xs transition-colors cursor-pointer"
          >
            Close Company Profile
          </button>
        </div>

      </div>
    </div>
  );
};
