import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface GetInvolvedSectionProps {
  onOpenSponsors: () => void;
}

export const GetInvolvedSection: React.FC<GetInvolvedSectionProps> = ({ onOpenSponsors }) => {
  return (
    <section className="bg-[#F4F5F7] text-[#1A202C] py-20 px-6 md:px-12 border-b border-[#E2E8F0] text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
          GET INVOLVED // MEIP PLATFORM
        </span>
        
        <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#3B388E] tracking-tight">
          Explore Collaboration & Data Access Opportunities
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-sans-body font-bold text-xs sm:text-sm uppercase">
          <button
            onClick={onOpenSponsors}
            className="bg-[#E6004D] hover:bg-[#C00F2F] text-white px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>DATA SCHEMAS & STACK</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href="mailto:zakariabahtanidev@gmail.com?subject=MEIP%20Project%20Inquiry"
            className="bg-white hover:bg-gray-100 text-[#3B388E] border border-[#E2E8F0] px-6 py-3.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>ACADEMIC & GOV INQUIRY</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href="https://github.com/zakariabahtani35-prog/morocco-employment-intelligence-platform"
            target="_blank"
            rel="noreferrer"
            className="bg-white hover:bg-gray-100 text-[#3B388E] border border-[#E2E8F0] px-6 py-3.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>GITHUB REPOSITORY</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
