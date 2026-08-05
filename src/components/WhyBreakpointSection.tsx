import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export const WhyBreakpointSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'collection' | 'warehouse' | 'analytics'>('collection');

  const tabContents = {
    collection: {
      title: '01. Automatic Multi-Source Collection & Cleaning',
      description: 'Continuous extraction of thousands of live job postings across ANAPEC, ReKrute, Emploi.ma, DreamJob, and Novojob. Python Pandas pipelines run automated deduplication, missing value handling, and skill standardization.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      label: 'EXTRACTION & PIPELINE ENGINE'
    },
    warehouse: {
      title: '02. Supabase PostgreSQL & Star Schema OLAP',
      description: 'Centralized cloud Data Warehouse hosted on Supabase PostgreSQL. Architected using dimensional modeling with Fact_Jobs, Dim_Companies, Dim_Skills, Dim_Locations, and Dim_Dates for high-speed analytical queries.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
      label: 'STAR SCHEMA DATA WAREHOUSE'
    },
    analytics: {
      title: '03. Interactive Web Dashboard & AI Decision Support',
      description: 'High-impact interactive web business intelligence dashboards with regional mapping (Casablanca, Rabat, Tangier, etc.), skill demand heatmaps, salary distributions, and automated LLM executive summaries.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      label: 'INTERACTIVE DASHBOARD & AI DECISION SUPPORT'
    }
  };

  return (
    <section id="architecture-section" className="bg-[#F4F5F7] text-[#1A202C] py-24 px-6 md:px-12 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold">
            CORE ARCHITECTURE & FEATURES
          </span>
          <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#3B388E] tracking-tight">
            Why MEIP Delivers Unmatched Labor Market Intelligence
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side Visual Preview with Simplon Notched / Pixel Corner Frame */}
          <div className="lg:col-span-6 relative group">
            {/* Outer Wrapper with Rounded Corners & Notched Top-Right */}
            <div
              className="relative aspect-video rounded-3xl overflow-hidden border-2 border-[#E2E8F0] shadow-lg bg-black"
              style={{
                clipPath: 'polygon(0% 0%, calc(100% - 56px) 0%, calc(100% - 56px) 18px, calc(100% - 36px) 18px, calc(100% - 36px) 36px, calc(100% - 18px) 36px, calc(100% - 18px) 56px, 100% 56px, 100% 100%, 0% 100%)'
              }}
            >
              <video
                src="https://rwmigymwxhsxhkhhgxcd.supabase.co/storage/v1/object/sign/documents/Animate_this_image.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mOTgzZGZlNC05MTRiLTQ0MWQtYjMyOS0zMWZlZDQxODEwOGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMvQW5pbWF0ZV90aGlzX2ltYWdlLm1wNCIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODUzNDAxNDMsImV4cCI6MTgxNjg3NjE0M30.CjhXapueh8i2R8qk8dQC661oG0_kYcNrxc7Kyxe_izo"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-sans-body uppercase bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#E2E8F0] shadow-xs pointer-events-none">
                <span className="text-[#E6004D] font-bold">{tabContents[activeTab].label}</span>
                <span className="text-gray-500 font-semibold">MEIP ANIMATED PIPELINE</span>
              </div>
            </div>

            {/* Simplon Signature Pixelated Corner Notch Overlays */}
            <div className="absolute -top-1 -right-1 pointer-events-none z-10 flex flex-col items-end">
              <div className="flex gap-1">
                <div className="w-4 h-4 bg-white rounded-xs shadow-xs" />
                <div className="w-4 h-4 bg-[#E6004D] rounded-xs shadow-xs" />
              </div>
              <div className="flex gap-1 mt-1">
                <div className="w-4 h-4 bg-[#E6004D] rounded-xs shadow-xs" />
                <div className="w-4 h-4 bg-white rounded-xs shadow-xs" />
                <div className="w-4 h-4 bg-[#3B388E] rounded-xs shadow-xs" />
              </div>
            </div>
          </div>

          {/* Right Side Accordion / Tabs */}
          <div className="lg:col-span-6 space-y-4">
            {/* Tab 1: Collection */}
            <div
              onClick={() => setActiveTab('collection')}
              className={`p-6 border rounded-2xl transition-all cursor-pointer shadow-xs ${
                activeTab === 'collection'
                  ? 'bg-[#FCE4E8] border-[#E6004D] text-[#1A202C]'
                  : 'bg-white border-[#E2E8F0] hover:border-gray-300 text-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-space font-bold text-lg sm:text-xl tracking-tight text-[#3B388E] flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeTab === 'collection' ? 'bg-[#E6004D]' : 'bg-gray-300'}`} />
                  {tabContents.collection.title}
                </h3>
                <ChevronRight className={`w-5 h-5 transition-transform ${activeTab === 'collection' ? 'rotate-90 text-[#E6004D]' : 'text-gray-400'}`} />
              </div>

              {activeTab === 'collection' && (
                <p className="mt-4 font-sans-body text-gray-700 text-sm sm:text-base leading-relaxed pl-5 border-l-2 border-[#E6004D]">
                  {tabContents.collection.description}
                </p>
              )}
            </div>

            {/* Tab 2: Warehouse */}
            <div
              onClick={() => setActiveTab('warehouse')}
              className={`p-6 border rounded-2xl transition-all cursor-pointer shadow-xs ${
                activeTab === 'warehouse'
                  ? 'bg-[#FCE4E8] border-[#E6004D] text-[#1A202C]'
                  : 'bg-white border-[#E2E8F0] hover:border-gray-300 text-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-space font-bold text-lg sm:text-xl tracking-tight text-[#3B388E] flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeTab === 'warehouse' ? 'bg-[#E6004D]' : 'bg-gray-300'}`} />
                  {tabContents.warehouse.title}
                </h3>
                <ChevronRight className={`w-5 h-5 transition-transform ${activeTab === 'warehouse' ? 'rotate-90 text-[#E6004D]' : 'text-gray-400'}`} />
              </div>

              {activeTab === 'warehouse' && (
                <p className="mt-4 font-sans-body text-gray-700 text-sm sm:text-base leading-relaxed pl-5 border-l-2 border-[#E6004D]">
                  {tabContents.warehouse.description}
                </p>
              )}
            </div>

            {/* Tab 3: Analytics */}
            <div
              onClick={() => setActiveTab('analytics')}
              className={`p-6 border rounded-2xl transition-all cursor-pointer shadow-xs ${
                activeTab === 'analytics'
                  ? 'bg-[#FCE4E8] border-[#E6004D] text-[#1A202C]'
                  : 'bg-white border-[#E2E8F0] hover:border-gray-300 text-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-space font-bold text-lg sm:text-xl tracking-tight text-[#3B388E] flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeTab === 'analytics' ? 'bg-[#E6004D]' : 'bg-gray-300'}`} />
                  {tabContents.analytics.title}
                </h3>
                <ChevronRight className={`w-5 h-5 transition-transform ${activeTab === 'analytics' ? 'rotate-90 text-[#E6004D]' : 'text-gray-400'}`} />
              </div>

              {activeTab === 'analytics' && (
                <p className="mt-4 font-sans-body text-gray-700 text-sm sm:text-base leading-relaxed pl-5 border-l-2 border-[#E6004D]">
                  {tabContents.analytics.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

