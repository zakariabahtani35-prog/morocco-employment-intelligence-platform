import React from 'react';
import { ArrowUpRight, Database, Code, Award } from 'lucide-react';
import { SPONSORS_DATA } from '../data/mockData';
import { SimplonLogo } from './SimplonLogo';

interface SponsorsSectionProps {
  onContactClick?: () => void;
}

export const SponsorsSection: React.FC<SponsorsSectionProps> = ({ onContactClick }) => {
  return (
    <section id="tech-section" className="bg-[#F4F5F7] text-[#1A202C] py-24 px-6 md:px-12 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-12 text-center">
        {/* Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
            INTEGRATED SOURCES & TECH STACK
          </span>
          <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#3B388E] tracking-tight">
            Data Sources & Platform Engineering Stack
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-sans-body font-bold text-xs uppercase">
            <a
              href="https://github.com/zakariabahtani35-prog/morocco-employment-intelligence-platform"
              target="_blank"
              rel="noreferrer"
              className="bg-[#E6004D] hover:bg-[#C00F2F] text-white px-6 py-3 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Code className="w-4 h-4" />
              <span>EXPLORE STACK CODE</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={onContactClick}
              className="bg-white hover:bg-gray-100 text-[#3B388E] border border-[#E2E8F0] px-6 py-3 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs font-bold"
            >
              <Database className="w-4 h-4 text-[#3B388E]" />
              <span>VIEW DATA SCHEMAS</span>
            </button>
          </div>
        </div>

        {/* Featured Program Showcase Card: Simplon Maghreb */}
        <div className="bg-white border-2 border-[#E6004D]/30 p-8 rounded-3xl shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-[#FCE4E8] rounded-2xl shrink-0">
              <SimplonLogo variant="full" height={44} ringColor="#E3004F" textColor="#12333E" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#E6004D] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  INSTITUTIONAL PARTNER
                </span>
                <span className="text-xs font-bold text-[#3B388E]">FINAL DATA ANALYST PROJECT</span>
              </div>
              <h3 className="font-space font-bold text-xl text-[#1A202C]">
                Simplon Maghreb × CCFBS
              </h3>
              <p className="font-sans-body text-xs text-gray-600 max-w-xl">
                Certified Data Analyst certification & incubator program empowering Moroccan talent through hands-on full-stack data analytics, engineering, and business intelligence projects.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 bg-[#F4F5F7] px-4 py-3 rounded-xl border border-[#E2E8F0]">
            <Award className="w-5 h-5 text-[#E6004D]" />
            <span className="text-xs font-bold text-[#3B388E] uppercase tracking-wide">CERTIFIED PROJECT</span>
          </div>
        </div>

        {/* Sponsor Logos Grid */}
        <div id="sponsors-grid" className="pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
          {SPONSORS_DATA.map((sponsor, idx) => (
            <div
              key={`${sponsor.name}-${idx}`}
              className="p-5 bg-white border border-[#E2E8F0] hover:border-[#E6004D] hover:bg-[#FCE4E8]/20 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center h-28 group shadow-xs"
            >
              <span className="font-space font-bold text-base text-[#3B388E] group-hover:text-[#E6004D] transition-colors tracking-tight text-center">
                {sponsor.logoText}
              </span>
              {sponsor.subtext && (
                <span className="font-sans-body text-[10px] text-[#E6004D] uppercase mt-1 text-center font-bold">
                  {sponsor.subtext}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


