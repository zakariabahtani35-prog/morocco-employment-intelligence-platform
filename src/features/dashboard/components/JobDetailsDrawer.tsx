import React from 'react';
import { X, Briefcase, MapPin, Building2, ExternalLink, Calendar, DollarSign, Laptop, ShieldCheck, Cpu, Layers } from 'lucide-react';
import { JobRecordItem } from '../../../lib/supabaseService';

interface JobDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobRecordItem | null;
  isDarkMode: boolean;
}

export const JobDetailsDrawer: React.FC<JobDetailsDrawerProps> = ({
  isOpen,
  onClose,
  job,
  isDarkMode
}) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      <div className={`w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-hidden transition-transform duration-300 animate-in slide-in-from-right ${
        isDarkMode ? 'bg-[#09090B] text-zinc-100 border-l border-[#27272A]' : 'bg-white text-[#0F172A] border-l border-[#E2E8F0]'
      }`}>
        
        {/* EXECUTIVE GLASSMORPHIC HEADER */}
        <div className={`p-6 border-b flex items-start justify-between sticky top-0 z-10 backdrop-blur-md ${
          isDarkMode ? 'bg-[#121215]/90 border-[#27272A]' : 'bg-white/90 border-[#E2E8F0]'
        }`}>
          <div className="space-y-1.5 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-[#E6004D]/10 text-[#E6004D] border border-[#E6004D]/20 uppercase">
                {job.source} Portal Listing
              </span>
              <span className="text-[11px] text-gray-500 dark:text-zinc-400 font-mono-code">
                Published {new Date(job.date).toLocaleDateString()}
              </span>
            </div>

            <h3 className="font-space font-extrabold text-xl text-[#0F172A] dark:text-zinc-100 leading-snug">
              {job.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono-code text-gray-500 dark:text-zinc-400">
              <span className="font-bold text-[#2563EB] flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                {job.company}
              </span>
              <span className="flex items-center gap-1">
                📍 {job.location}
              </span>
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
          
          {/* KEY JOB METRICS GRID (100% SUPABASE DATA) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-code text-xs">
            <div className={`p-3.5 rounded-2xl border space-y-1 ${
              isDarkMode ? 'bg-[#121215] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <span className="text-gray-400 text-[10px] uppercase block">Contract</span>
              <span className="font-bold text-[#E6004D] block truncate">{job.contract_type}</span>
            </div>

            <div className={`p-3.5 rounded-2xl border space-y-1 ${
              isDarkMode ? 'bg-[#121215] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <span className="text-gray-400 text-[10px] uppercase block">Environment</span>
              <span className="font-bold text-[#2563EB] block truncate">{job.work_type}</span>
            </div>

            <div className={`p-3.5 rounded-2xl border space-y-1 ${
              isDarkMode ? 'bg-[#121215] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <span className="text-gray-400 text-[10px] uppercase block">Experience</span>
              <span className="font-bold text-purple-600 dark:text-purple-400 block truncate">{job.experience || 'Not Specified'}</span>
            </div>

            <div className={`p-3.5 rounded-2xl border space-y-1 ${
              isDarkMode ? 'bg-[#121215] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <span className="text-gray-400 text-[10px] uppercase block">Monthly Salary</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block truncate">{job.salary || 'Negotiable'}</span>
            </div>
          </div>

          {/* EXTRACTED NLP SKILLS BADGES */}
          <div className="space-y-2.5">
            <h4 className="font-space font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#8B5CF6]" />
              NLP Extracted Technical & Professional Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {job.skills && job.skills.length > 0 ? (
                job.skills.map(sk => (
                  <span key={sk} className="px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
                    {sk}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 font-mono-code italic">
                  No technical skill tags parsed from listing text
                </span>
              )}
            </div>
          </div>

          {/* FULL DESCRIPTION */}
          <div className="space-y-2.5">
            <h4 className="font-space font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#E6004D]" />
              Full Job Description (Original Listing)
            </h4>
            <div className={`p-4 rounded-2xl border font-sans-body text-xs leading-relaxed whitespace-pre-line ${
              isDarkMode ? 'bg-[#121215] border-[#27272A] text-zinc-300' : 'bg-[#F8F9FC] border-[#E2E8F0] text-[#1A202C]'
            }`}>
              {job.description || 'No detailed text description available for this posting.'}
            </div>
          </div>

        </div>

        {/* DRAWER ACTION BAR */}
        <div className={`p-4 border-t ${
          isDarkMode ? 'bg-[#121215] border-[#27272A]' : 'bg-gray-50 border-[#E2E8F0]'
        } flex items-center gap-3`}>
          <a
            href={job.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 rounded-xl bg-[#E6004D] hover:bg-[#C20040] text-white font-sans-body font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>View Original Listing on {job.source}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-3.5 rounded-xl bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-[#0F172A] dark:text-zinc-100 font-sans-body font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
