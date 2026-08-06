import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageView } from '../types';
import { InteractiveTravelMap } from './InteractiveTravelMap';
import { GoogleMapsLocationView } from './GoogleMapsLocationView';

interface TravelPageProps {
  setCurrentView: (view: PageView) => void;
}

export const TravelPage: React.FC<TravelPageProps> = ({ setCurrentView }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'flights' | 'hotels' | 'visas'>('all');

  return (
    <div className="bg-[#F4F5F7] text-[#1A202C] min-h-screen pt-28 pb-12 flex flex-col justify-between">
      {/* Hero Banner */}
      <div className="relative bg-white pt-16 pb-12 px-6 md:px-12 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
            MEIP 2026 LOGISTICS & RESOURCES
          </span>
          <h1 className="font-space font-bold text-5xl sm:text-7xl lg:text-8xl text-[#3B388E] tracking-tight">
            Logistics
          </h1>

          {/* Category Tabs */}
          <div className="flex items-center gap-3 pt-6 font-sans-body font-bold text-xs uppercase">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl border transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#E6004D] text-white border-[#E6004D]'
                  : 'bg-[#F4F5F7] text-gray-600 border-[#E2E8F0] hover:border-gray-300'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setActiveTab('flights')}
              className={`px-4 py-2 rounded-xl border transition-colors cursor-pointer ${
                activeTab === 'flights'
                  ? 'bg-[#E6004D] text-white border-[#E6004D]'
                  : 'bg-[#F4F5F7] text-gray-600 border-[#E2E8F0] hover:border-gray-300'
              }`}
            >
              LOCATIONS
            </button>
            <button
              onClick={() => setActiveTab('hotels')}
              className={`px-4 py-2 rounded-xl border transition-colors cursor-pointer ${
                activeTab === 'hotels'
                  ? 'bg-[#E6004D] text-white border-[#E6004D]'
                  : 'bg-[#F4F5F7] text-gray-600 border-[#E2E8F0] hover:border-gray-300'
              }`}
            >
              CAMPUS
            </button>
            <button
              onClick={() => setActiveTab('visas')}
              className={`px-4 py-2 rounded-xl border transition-colors cursor-pointer ${
                activeTab === 'visas'
                  ? 'bg-[#E6004D] text-white border-[#E6004D]'
                  : 'bg-[#F4F5F7] text-gray-600 border-[#E2E8F0] hover:border-gray-300'
              }`}
            >
              DATA ACCESS
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-16 w-full">
        {/* SPECIFIED GOOGLE MAPS LOCATION & ACADEMIC INSTITUTION */}
        <GoogleMapsLocationView />

        {/* INTERACTIVE VECTOR MAP */}
        <InteractiveTravelMap />

        {/* LOCATIONS SECTION */}
        {(activeTab === 'all' || activeTab === 'flights') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#E2E8F0] pb-16">
            <div className="lg:col-span-4 space-y-2">
              <span className="font-sans-body text-xs uppercase tracking-widest text-gray-400 font-bold block">
                LOCATIONS
              </span>
              <h2 className="font-space font-bold text-3xl sm:text-4xl text-[#3B388E] tracking-tight">
                Casablanca & Regional Hubs
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <h3 className="font-sans-body font-bold text-xl sm:text-2xl text-[#1A202C]">
                Primary Hub: Simplon Maghreb Campus, Casablanca
              </h3>
              <p className="font-sans-body text-gray-600 text-base leading-relaxed">
                The MEIP data warehouse & analytics lab is headquartered at the Simplon Maghreb Innovation Campus in Casablanca, with secondary nodes in Rabat, Tangier, and Marrakech.
              </p>
              <div>
                <a
                  href="https://simplon.co"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#3B388E] hover:bg-[#2e2b72] text-white font-sans-body font-bold text-xs uppercase px-5 py-3 rounded-xl inline-flex items-center gap-2 transition-colors shadow-xs"
                >
                  <span>VIEW SIMPLON CAMPUS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* CAMPUS SECTION */}
        {(activeTab === 'all' || activeTab === 'hotels') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#E2E8F0] pb-16">
            <div className="lg:col-span-4 space-y-2">
              <span className="font-sans-body text-xs uppercase tracking-widest text-gray-400 font-bold block">
                CAMPUS
              </span>
              <h2 className="font-space font-bold text-3xl sm:text-4xl text-[#3B388E] tracking-tight">
                Data Science Labs
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <p className="font-sans-body text-gray-600 text-lg leading-relaxed">
                Dedicated interactive web analytics workstations, PostgreSQL database clusters, and web scraping compute nodes are hosted at the Simplon & CCFBS joint technology center.
              </p>
              <div>
                <a
                  href="https://simplon.co"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#3B388E] hover:bg-[#2e2b72] text-white font-sans-body font-bold text-xs uppercase px-5 py-3 rounded-xl inline-flex items-center gap-2 transition-colors shadow-xs"
                >
                  <span>EXPLORE FACILITIES</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* DATA ACCESS SECTION */}
        {(activeTab === 'all' || activeTab === 'visas') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#E2E8F0] pb-16">
            <div className="lg:col-span-4 space-y-2">
              <span className="font-sans-body text-xs uppercase tracking-widest text-gray-400 font-bold block">
                DATA ACCESS
              </span>
              <h2 className="font-space font-bold text-3xl sm:text-4xl text-[#3B388E] tracking-tight">
                Academic API Keys
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-4 font-sans-body text-gray-600 text-base leading-relaxed">
              <p>
                Researchers and students can request read-only REST API tokens or PostgreSQL view credentials directly via the MEIP project maintainers.
              </p>
              <p>
                All analytical datasets comply with CNDP guidelines and contain exclusively anonymized, aggregated public job market signals across Morocco.
              </p>
            </div>
          </div>
        )}

        {/* FAQ CALLOUT BLOCK */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-xs">
          <h2 className="font-space font-bold text-2xl sm:text-4xl text-[#3B388E] tracking-tight">
            Frequently asked questions
          </h2>
          <div>
            <button
              onClick={() => setCurrentView('faq')}
              className="bg-[#E6004D] hover:bg-[#C00F2F] text-white font-sans-body font-bold text-xs uppercase px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <span>SEE ALL FAQS</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
