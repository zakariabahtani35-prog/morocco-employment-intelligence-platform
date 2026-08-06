import React from 'react';
import { Play, LayoutDashboard, BarChart2 } from 'lucide-react';
import { AutoPlayVideo } from './AutoPlayVideo';

interface HighlightsSectionProps {
  onOpenRecapModal: () => void;
}

export const HighlightsSection: React.FC<HighlightsSectionProps> = ({ onOpenRecapModal }) => {
  return (
    <section id="dashboard-preview-section" className="relative bg-[#F4F5F7] text-[#1A202C] py-24 px-6 md:px-12 border-b border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-2xl border border-[#E2E8F0] bg-white p-8 sm:p-16 min-h-[380px] sm:min-h-[460px] flex flex-col justify-between overflow-hidden group shadow-md">
          {/* Background Video with MEIP Interactive Web Dashboard Visuals */}
          <AutoPlayVideo
            src="https://dkmqcccyzfhytnpwzcdr.supabase.co/storage/v1/object/public/vi/orid_mitl_had_sora_bikol_tfasi.mp4"
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40 pointer-events-none" />

          {/* Large Overlay Watermark Logo */}
          <div className="absolute right-4 bottom-4 font-space font-extrabold text-6xl sm:text-9xl text-[#3B388E]/5 pointer-events-none tracking-widest select-none uppercase">
            MEIP
          </div>

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#FCE4E8] border border-[#E6004D]/30 text-[#E6004D] px-3.5 py-1.5 rounded-full text-xs font-sans-body font-bold uppercase">
              <BarChart2 className="w-3.5 h-3.5" />
              <span>POWER BI DECISION SUPPORT PREVIEW</span>
            </div>
            <h2 className="font-space font-extrabold text-3xl sm:text-6xl text-[#3B388E] tracking-tight max-w-2xl">
              Explore Live Employment Intelligence & Market Dashboards
            </h2>
            <p className="font-sans-body text-gray-600 text-sm sm:text-base max-w-xl">
              Dive into real-time recruitment KPIs, regional job density maps, top requested technologies, and salary benchmarks across Morocco.
            </p>
          </div>

          <div className="relative z-10 pt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenRecapModal}
              className="bg-[#E6004D] hover:bg-[#C00F2F] text-white font-sans-body font-bold text-xs uppercase px-6 py-3.5 rounded-xl transition-all flex items-center gap-2.5 cursor-pointer shadow-md"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>LAUNCH INTERACTIVE DASHBOARD</span>
            </button>
            <button
              onClick={onOpenRecapModal}
              className="bg-white hover:bg-gray-100 text-[#3B388E] border border-[#E2E8F0] font-sans-body font-bold text-xs uppercase px-5 py-3.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Play className="w-4 h-4 fill-current text-[#E6004D]" />
              <span>WATCH PIPELINE DEMO</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

