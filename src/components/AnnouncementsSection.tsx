import React from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ANNOUNCEMENTS_DATA } from '../data/mockData';

interface AnnouncementsSectionProps {
  onAnnouncementClick?: (title: string) => void;
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({ onAnnouncementClick }) => {
  return (
    <section className="bg-[#F4F5F7] text-[#1A202C] py-24 px-6 md:px-12 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E8F0] pb-6 gap-4">
          <div>
            <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block mb-1">
              DEVELOPMENT ROADMAP & MILESTONES
            </span>
            <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#3B388E] tracking-tight">
              Latest MEIP Releases & Project Log
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="bg-white hover:bg-gray-100 p-2.5 rounded-xl border border-[#E2E8F0] text-gray-700 transition-colors cursor-pointer shadow-xs"
              aria-label="Previous milestone"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="bg-white hover:bg-gray-100 p-2.5 rounded-xl border border-[#E2E8F0] text-gray-700 transition-colors cursor-pointer shadow-xs"
              aria-label="Next milestone"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ANNOUNCEMENTS_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => onAnnouncementClick?.(item.title)}
              className="bg-white border border-[#E2E8F0] hover:border-[#E6004D] p-8 rounded-2xl flex flex-col justify-between h-56 cursor-pointer group transition-all duration-200 hover:bg-[#FCE4E8]/20 shadow-xs"
            >
              <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold">
                {item.category}
              </span>

              <div className="flex items-end justify-between gap-4">
                <h3 className="font-space font-bold text-lg sm:text-xl text-[#3B388E] group-hover:text-[#E6004D] transition-colors leading-snug">
                  {item.title}
                </h3>
                <ArrowUpRight className="w-6 h-6 text-gray-400 group-hover:text-[#E6004D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

