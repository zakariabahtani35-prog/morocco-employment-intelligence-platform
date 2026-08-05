import React, { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Clock, Server } from 'lucide-react';
import { EVENTS_DATA } from '../data/mockData';

interface EcosystemEventsSectionProps {
  onSelectEvent?: (eventId: string) => void;
}

export const EcosystemEventsSection: React.FC<EcosystemEventsSectionProps> = ({ onSelectEvent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % EVENTS_DATA.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + EVENTS_DATA.length) % EVENTS_DATA.length);
  };

  return (
    <section id="pipeline-section" className="bg-[#F4F5F7] text-[#1A202C] py-24 px-6 md:px-12 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Title & Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
              END-TO-END PIPELINE ARCHITECTURE
            </span>
            <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#3B388E] tracking-tight">
              MEIP Data Pipeline Stages & Workflows
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onSelectEvent?.('all')}
              className="bg-white hover:bg-gray-100 text-[#3B388E] border border-[#E2E8F0] px-4 py-2.5 rounded-xl font-sans-body font-bold text-xs uppercase flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <span>SEE PIPELINE LOGS</span>
              <ArrowUpRight className="w-4 h-4 text-[#E6004D]" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="bg-white hover:bg-gray-100 p-2.5 rounded-xl border border-[#E2E8F0] text-gray-600 transition-colors cursor-pointer shadow-xs"
                aria-label="Previous stage"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="bg-white hover:bg-gray-100 p-2.5 rounded-xl border border-[#E2E8F0] text-gray-600 transition-colors cursor-pointer shadow-xs"
                aria-label="Next stage"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Pipeline Stage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EVENTS_DATA.map((event) => (
            <div
              key={event.id}
              onClick={() => onSelectEvent?.(event.id)}
              className="bg-white border border-[#E2E8F0] hover:border-[#E6004D] p-6 rounded-2xl flex flex-col justify-between min-h-[360px] cursor-pointer group transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden shadow-xs"
            >
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans-body text-[11px] font-bold uppercase bg-[#FCE4E8] text-[#E6004D] px-3 py-1 rounded-full border border-[#E6004D]/20">
                    {event.badge}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#E6004D] transition-colors" />
                </div>

                <h3 className="font-space font-bold text-2xl text-[#3B388E] group-hover:text-[#E6004D] transition-colors tracking-tight">
                  {event.title}
                </h3>

                <p className="font-sans-body text-gray-600 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="relative z-10 border-t border-[#E2E8F0] pt-4 space-y-2 font-sans-body text-xs text-gray-500 uppercase font-semibold">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E6004D]" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

