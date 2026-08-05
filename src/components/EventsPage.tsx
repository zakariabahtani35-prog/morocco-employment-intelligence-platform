import React, { useState } from 'react';
import { Clock, MapPin, ArrowUpRight, Search, Plus } from 'lucide-react';
import { EVENTS_DATA } from '../data/mockData';

export const EventsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const filteredEvents = EVENTS_DATA.filter(
    (e) => e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#F4F5F7] text-[#1A202C] min-h-screen pt-28 pb-12">
      <div className="bg-white py-16 px-6 md:px-12 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
            MEIP PIPELINE & ARCHITECTURE
          </span>
          <h1 className="font-space font-bold text-5xl sm:text-7xl text-[#3B388E] tracking-tight">
            Pipeline Workflows
          </h1>
          <p className="font-sans-body text-gray-600 text-lg max-w-2xl">
            Explore web scrapers, data cleaning routines, PostgreSQL warehouse staging, and interactive web dashboard deployment stages across the MEIP architecture.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-[#E2E8F0] rounded-2xl shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stages or tools..."
              className="bg-[#F4F5F7] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2 text-xs font-sans-body w-full text-[#1A202C] focus:outline-none focus:border-[#E6004D]"
            />
          </div>

          <a
            href="mailto:zakariabahtanidev@gmail.com?subject=MEIP%20Pipeline%20Inquiry"
            className="bg-[#E6004D] hover:bg-[#C00F2F] text-white font-sans-body font-bold text-xs uppercase px-5 py-2.5 rounded-xl inline-flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>SUBMIT PIPELINE ISSUE</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEventId(event.id)}
              className="bg-white border border-[#E2E8F0] hover:border-[#E6004D] p-6 rounded-2xl flex flex-col justify-between min-h-[340px] cursor-pointer group transition-all shadow-xs"
            >
              <div className="space-y-4">
                <span className="font-sans-body text-xs font-bold text-[#E6004D] bg-[#FCE4E8] px-2.5 py-1 rounded-full border border-[#E6004D]/20">
                  {event.badge}
                </span>

                <h3 className="font-space font-bold text-2xl text-[#3B388E] group-hover:text-[#E6004D] transition-colors">
                  {event.title}
                </h3>

                <p className="font-sans-body text-gray-600 text-sm">
                  {event.description}
                </p>
              </div>

              <div className="border-t border-[#E2E8F0] pt-4 space-y-1 font-sans-body text-xs text-gray-500 uppercase font-semibold">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E6004D]" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Event Detail Modal */}
      {selectedEventId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl max-w-lg w-full p-8 text-[#1A202C] space-y-6 shadow-2xl">
            <h3 className="font-space font-bold text-2xl text-[#3B388E]">Stage Log Inspection</h3>
            <p className="font-sans-body text-gray-600 text-sm">
              You are inspecting the execution logs for MEIP data pipeline stage.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Stage log exported!'); setSelectedEventId(null); }} className="space-y-4 font-sans-body text-xs">
              <input required type="text" placeholder="Full Name" className="w-full bg-[#F4F5F7] border border-[#E2E8F0] rounded-xl p-3 text-[#1A202C] focus:outline-none focus:border-[#E6004D]" />
              <input required type="email" placeholder="Email Address" className="w-full bg-[#F4F5F7] border border-[#E2E8F0] rounded-xl p-3 text-[#1A202C] focus:outline-none focus:border-[#E6004D]" />
              <div className="flex gap-3">
                <button type="submit" className="bg-[#E6004D] text-white font-bold uppercase py-2.5 px-6 rounded-xl cursor-pointer">Export Log</button>
                <button type="button" onClick={() => setSelectedEventId(null)} className="bg-[#F4F5F7] border border-[#E2E8F0] text-gray-600 py-2.5 px-4 rounded-xl cursor-pointer">Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
