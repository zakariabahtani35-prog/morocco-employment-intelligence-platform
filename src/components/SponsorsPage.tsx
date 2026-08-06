import React, { useState } from 'react';
import { Search, ArrowUpRight, Mail } from 'lucide-react';
import { SPONSORS_DATA } from '../data/mockData';

export const SponsorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'platinum' | 'gold' | 'silver'>('all');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredSponsors = SPONSORS_DATA.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.logoText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F4F5F7] text-[#1A202C] min-h-screen pt-28 pb-12">
      {/* Header Banner */}
      <div className="bg-white py-16 px-6 md:px-12 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
            INSTITUTIONAL & ACADEMIC PARTNERS
          </span>
          <h1 className="font-space font-bold text-5xl sm:text-7xl text-[#3B388E] tracking-tight">
            MEIP Academic Partners
          </h1>
          <p className="font-sans-body text-gray-600 text-lg max-w-2xl">
            Meet the academic institutions, training centers, and data partners supporting the Moroccan Employment Intelligence Platform.
          </p>

          <div className="pt-4">
            <button
              onClick={() => setIsContactOpen(true)}
              className="bg-[#E6004D] hover:bg-[#C00F2F] text-white font-sans-body font-bold text-xs uppercase px-6 py-3 rounded-xl inline-flex items-center gap-2 cursor-pointer transition-colors shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>BECOME A DATA PARTNER</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-8">
        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-[#E2E8F0] rounded-2xl shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search partners..."
              className="bg-[#F4F5F7] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2 text-xs font-sans-body w-full text-[#1A202C] focus:outline-none focus:border-[#E6004D]"
            />
          </div>

          <div className="flex items-center gap-2 font-sans-body text-xs uppercase font-bold">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${categoryFilter === 'all' ? 'bg-[#E6004D] text-white border-[#E6004D]' : 'bg-[#F4F5F7] text-gray-600 border-[#E2E8F0]'}`}
            >
              All
            </button>
            <button
              onClick={() => setCategoryFilter('platinum')}
              className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${categoryFilter === 'platinum' ? 'bg-[#E6004D] text-white border-[#E6004D]' : 'bg-[#F4F5F7] text-gray-600 border-[#E2E8F0]'}`}
            >
              Academic
            </button>
            <button
              onClick={() => setCategoryFilter('gold')}
              className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${categoryFilter === 'gold' ? 'bg-[#E6004D] text-white border-[#E6004D]' : 'bg-[#F4F5F7] text-gray-600 border-[#E2E8F0]'}`}
            >
              Tech Providers
            </button>
            <button
              onClick={() => setCategoryFilter('silver')}
              className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${categoryFilter === 'silver' ? 'bg-[#E6004D] text-white border-[#E6004D]' : 'bg-[#F4F5F7] text-gray-600 border-[#E2E8F0]'}`}
            >
              Data Sources
            </button>
          </div>
        </div>

        {/* Sponsor Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSponsors.map((sponsor, idx) => (
            <div
              key={`${sponsor.name}-${idx}`}
              className="bg-white border border-[#E2E8F0] hover:border-[#E6004D] rounded-2xl p-6 h-32 flex flex-col items-center justify-center text-center transition-all group shadow-xs"
            >
              <span className="font-space font-bold text-lg text-[#3B388E] group-hover:text-[#E6004D] transition-colors">
                {sponsor.logoText}
              </span>
              {sponsor.subtext && (
                <span className="font-sans-body text-[10px] text-gray-500 uppercase font-semibold mt-1">
                  {sponsor.subtext}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sponsor Contact Drawer / Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setIsContactOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label="Partner Inquiry Form" className="bg-white border border-[#E2E8F0] rounded-2xl max-w-lg w-full p-8 text-[#1A202C] space-y-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-space font-bold text-2xl text-[#3B388E]">Partner With MEIP</h3>
            <p className="font-sans-body text-gray-600 text-sm">
              Partnership opportunities include custom dashboard integration, regional labor market research, and academic dataset sharing.
            </p>

            {isSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-sans-body text-xs font-bold space-y-2">
                <div>✓ Thank you! Your partnership inquiry was submitted successfully.</div>
                <button type="button" onClick={() => { setIsSubmitted(false); setIsContactOpen(false); }} className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs">Close Window</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-4 font-sans-body text-xs">
                <input required type="text" placeholder="Organization / Institution Name" className="w-full bg-[#F4F5F7] border border-[#E2E8F0] rounded-xl p-3 text-[#1A202C] focus:outline-none focus:border-[#E6004D]" />
                <input required type="email" placeholder="Work Email Address" className="w-full bg-[#F4F5F7] border border-[#E2E8F0] rounded-xl p-3 text-[#1A202C] focus:outline-none focus:border-[#E6004D]" />
                <textarea placeholder="Tell us about your organization & goals..." rows={3} className="w-full bg-[#F4F5F7] border border-[#E2E8F0] rounded-xl p-3 text-[#1A202C] focus:outline-none focus:border-[#E6004D]" />
                <div className="flex gap-3">
                  <button type="submit" className="bg-[#E6004D] text-white font-bold uppercase py-2.5 px-6 rounded-xl cursor-pointer hover:bg-[#C00F2F] transition-colors">Submit Inquiry</button>
                  <button type="button" onClick={() => setIsContactOpen(false)} className="bg-[#F4F5F7] border border-[#E2E8F0] text-gray-600 py-2.5 px-4 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
