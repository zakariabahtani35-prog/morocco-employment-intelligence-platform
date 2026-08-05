import React from 'react';

export const EverythingChainSection: React.FC = () => {
  return (
    <section id="about-section" className="bg-[#F4F5F7] text-[#1A202C] py-20 px-6 md:px-12 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column Heading */}
        <div className="lg:col-span-4 space-y-4 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
          <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
            ABOUT PROJECT // MEIP
          </span>
          <h2 className="font-space font-extrabold text-2xl md:text-3xl tracking-tight text-[#3B388E]">
            EMPLOYMENT INTELLIGENCE FOR MOROCCO
          </h2>
          <div className="pt-4 font-sans-body text-xs text-gray-600 space-y-2 border-t border-[#E2E8F0]">
            <p className="flex justify-between"><span>AUTHOR:</span> <span className="text-[#1A202C] font-bold">Zakaria Bahtani</span></p>
            <p className="flex justify-between"><span>ROLE:</span> <span className="text-[#E6004D] font-bold">Data Analyst</span></p>
            <p className="flex justify-between"><span>PROGRAM:</span> <span className="text-[#3B388E] font-semibold">Simplon Maghreb × CCFBS</span></p>
          </div>
        </div>

        {/* Right Column Editorial Copy */}
        <div className="lg:col-span-8 space-y-8 font-sans-body text-gray-700 text-lg md:text-xl leading-relaxed">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-[#3B388E] font-bold text-xl md:text-2xl leading-snug">
              MEIP (Morocco Employment Intelligence Platform) is an intelligent platform that automatically collects, cleans, transforms, stores, and analyzes recruitment data from multiple Moroccan job portals to deliver real-time business intelligence dashboards.
            </h3>
          </div>

          <div className="space-y-3 text-gray-700 text-base md:text-lg leading-relaxed border-l-4 border-[#E6004D] pl-6 py-4 bg-white border border-[#E2E8F0] rounded-r-2xl shadow-xs">
            <span className="font-sans-body text-xs uppercase text-[#E6004D] font-bold block">
              THE PROBLEM STATEMENT
            </span>
            <p className="text-gray-600">
              Moroccan job market data is currently fragmented across disparate employment portals (ANAPEC, ReKrute, Emploi.ma, DreamJob, Novojob). Unstandardized job titles, inconsistent skill descriptions, and missing salary ranges make it extremely difficult for decision-makers, universities, and job seekers to understand true labor market dynamics in real time.
            </p>
          </div>

          <div className="space-y-3 text-gray-700 text-base md:text-lg leading-relaxed border-l-4 border-[#3B388E] pl-6 py-4 bg-white border border-[#E2E8F0] rounded-r-2xl shadow-xs">
            <span className="font-sans-body text-xs uppercase text-[#3B388E] font-bold block">
              THE DATA-DRIVEN SOLUTION
            </span>
            <p className="text-gray-600">
              MEIP bridges this disconnect by deploying an automated n8n & Python ELT pipeline. Raw listings are continuously scraped, cleaned, deduplicated, and loaded into an OLAP PostgreSQL Data Warehouse (Supabase). Advanced interactive web dashboards and AI LLM modules then synthesize this data into actionable market trends, regional skill demand maps, and salary insights.
            </p>
          </div>

          {/* Stakeholders list */}
          <div className="pt-2 space-y-3 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
            <span className="font-sans-body text-xs uppercase text-[#3B388E] font-bold block">
              SUPPORTING 8 KEY STAKEHOLDER GROUPS IN MOROCCO
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans-body text-xs text-gray-700">
              <div className="bg-[#F4F5F7] border border-[#E2E8F0] p-3 rounded-xl text-center">
                <span className="text-[#E6004D] font-bold block text-sm">01</span>
                Gov Institutions
              </div>
              <div className="bg-[#F4F5F7] border border-[#E2E8F0] p-3 rounded-xl text-center">
                <span className="text-[#E6004D] font-bold block text-sm">02</span>
                Decision Makers
              </div>
              <div className="bg-[#F4F5F7] border border-[#E2E8F0] p-3 rounded-xl text-center">
                <span className="text-[#E6004D] font-bold block text-sm">03</span>
                Employment Agencies
              </div>
              <div className="bg-[#F4F5F7] border border-[#E2E8F0] p-3 rounded-xl text-center">
                <span className="text-[#E6004D] font-bold block text-sm">04</span>
                Recruiters
              </div>
              <div className="bg-[#F4F5F7] border border-[#E2E8F0] p-3 rounded-xl text-center">
                <span className="text-[#E6004D] font-bold block text-sm">05</span>
                Companies
              </div>
              <div className="bg-[#F4F5F7] border border-[#E2E8F0] p-3 rounded-xl text-center">
                <span className="text-[#E6004D] font-bold block text-sm">06</span>
                Universities
              </div>
              <div className="bg-[#F4F5F7] border border-[#E2E8F0] p-3 rounded-xl text-center">
                <span className="text-[#E6004D] font-bold block text-sm">07</span>
                Students
              </div>
              <div className="bg-[#F4F5F7] border border-[#E2E8F0] p-3 rounded-xl text-center">
                <span className="text-[#E6004D] font-bold block text-sm">08</span>
                Job Seekers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

