import React from 'react';
import { X, Briefcase, MapPin, Building2, ExternalLink, Calendar, DollarSign, Laptop, ShieldCheck, Cpu } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-hidden transition-transform animate-in slide-in-from-right duration-300 ${
        isDarkMode ? 'bg-[#121215] text-zinc-100 border-l border-[#27272A]' : 'bg-white text-[#0F172A] border-l border-[#E2E8F0]'
      }`}>
        
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8F0] dark:border-[#27272A] flex items-center justify-between">
          <div className="space-y-1 max-w-md">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-code font-bold bg-[#E6004D]/10 text-[#E6004D] border border-[#E6004D]/20 uppercase">
              {job.source} Portal Listing
            </span>
            <h3 className="font-space font-extrabold text-xl text-[#0F172A] dark:text-zinc-100 leading-snug">
              {job.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-mono-code flex items-center gap-2">
              <span className="font-bold text-[#2563EB]">{job.company}</span>
              <span>• 📍 {job.location}</span>
            </p>
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
          
          {/* Key Job Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-code text-xs">
            <div className={`p-3 rounded-xl border space-y-1 ${
              isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <span className="text-gray-400 text-[10px] block">Contract Type</span>
              <span className="font-bold text-[#E6004D]">{job.contract_type}</span>
            </div>

            <div className={`p-3 rounded-xl border space-y-1 ${
              isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <span className="text-gray-400 text-[10px] block">Work Environment</span>
              <span className="font-bold text-[#2563EB]">{job.work_type}</span>
            </div>

            <div className={`p-3 rounded-xl border space-y-1 ${
              isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <span className="text-gray-400 text-[10px] block">Experience Tier</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">{job.experience}</span>
            </div>

            <div className={`p-3 rounded-xl border space-y-1 ${
              isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
            }`}>
              <span className="text-gray-400 text-[10px] block">Monthly Salary</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{job.salary || 'Negotiable'}</span>
            </div>
          </div>

          {/* Extracted NLP Skills Badges */}
          <div className="space-y-2">
            <h4 className="font-space font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#8B5CF6]" />
              NLP Extracted Skills & Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map(sk => (
                <span key={sk} className="px-3 py-1 rounded-lg text-xs font-mono-code font-bold bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <h4 className="font-space font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400">
              Full Job Description
            </h4>
            <div className={`p-4 rounded-xl border font-sans-body text-xs leading-relaxed whitespace-pre-line ${
              isDarkMode ? 'bg-[#18181B] border-[#27272A] text-zinc-300' : 'bg-[#F8F9FC] border-[#E2E8F0] text-[#1A202C]'
            }`}>
              {job.description || 'No detailed description available for this posting.'}
            </div>
          </div>

          {/* Metadata Footer Details */}
          <div className="flex items-center justify-between text-xs font-mono-code text-gray-400 pt-2 border-t border-[#E2E8F0] dark:border-[#27272A]">
            <span>Published: {new Date(job.date).toLocaleDateString()}</span>
            <span>Source: {job.source}</span>
          </div>

        </div>

        {/* Drawer Action Bar */}
        <div className="p-4 border-t border-[#E2E8F0] dark:border-[#27272A] bg-gray-50 dark:bg-[#18181B] flex items-center gap-3">
          <a
            href={job.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl bg-[#E6004D] hover:bg-[#C20040] text-white font-sans-body font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Apply on Source Portal ({job.source})</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-[#0F172A] dark:text-zinc-100 font-sans-body font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
