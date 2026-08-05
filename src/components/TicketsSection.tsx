import React from 'react';
import { ArrowUpRight, LayoutDashboard, Database, Workflow, Github } from 'lucide-react';
import { TICKETS_DATA } from '../data/mockData';

interface TicketsSectionProps {
  onSelectTicket: (ticketId: string) => void;
}

export const TicketsSection: React.FC<TicketsSectionProps> = ({ onSelectTicket }) => {
  return (
    <section id="features-section" className="bg-[#F4F5F7] text-[#1A202C] py-24 px-6 md:px-12 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold">
            CORE PLATFORM MODULES & DASHBOARD ACCESS
          </span>
          <h2 className="font-space font-extrabold text-3xl sm:text-5xl tracking-tight text-[#3B388E]">
            Explore the Interactive MEIP Decision Support System
          </h2>
          <p className="font-sans-body text-gray-600 text-base sm:text-lg">
            Access real-time business intelligence, dimensional database models, automated pipelines, and full documentation.
          </p>
        </div>

        {/* Pricing Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Featured Red/Magenta Card: Interactive Web Dashboard */}
          <div 
            onClick={() => onSelectTicket('dashboard')}
            className="lg:col-span-6 bg-[#E6004D] text-white p-8 sm:p-12 min-h-[320px] sm:min-h-[380px] flex flex-col justify-between cursor-pointer group hover:scale-[1.01] transition-all duration-200 rounded-2xl shadow-md relative overflow-hidden"
          >
            <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="font-sans-body text-xs uppercase bg-black/20 border border-white/20 text-white px-3 py-1 rounded-full font-bold tracking-wider inline-block mb-3">
                  PRIMARY ACCESS
                </span>
                <h3 className="font-space font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white">
                  Interactive Web Dashboard
                </h3>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-[#E6004D] transition-colors shrink-0">
                <ArrowUpRight className="w-8 h-8 stroke-[2.5]" />
              </div>
            </div>

            <div className="relative z-10 pt-8">
              <div className="flex items-center gap-3 text-white font-sans-body font-bold text-2xl sm:text-3xl tracking-tight">
                <LayoutDashboard className="w-8 h-8 text-white" />
                <span>LAUNCH DASHBOARD</span>
              </div>
              <p className="font-sans-body text-xs sm:text-sm text-white/90 font-medium mt-3 leading-relaxed">
                Real-time regional job maps, skill matrices, salary analytics, industry hiring rankings, and automated AI market trend synthesis.
              </p>
            </div>
          </div>

          {/* Right Cards Stack: Architecture, Pipeline, GitHub Repo */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {TICKETS_DATA.filter(t => t.id !== 'dashboard').map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => onSelectTicket(ticket.id)}
                className="bg-white border border-[#E2E8F0] hover:border-[#E6004D] p-6 sm:p-8 rounded-2xl flex items-center justify-between cursor-pointer group hover:bg-[#FCE4E8]/20 transition-all duration-200 shadow-xs"
              >
                <div className="space-y-1 max-w-md">
                  <span className="font-sans-body text-xs text-[#E6004D] font-bold uppercase tracking-wider block">
                    {ticket.badge}
                  </span>
                  <h4 className="font-space font-bold text-lg sm:text-xl text-[#3B388E] group-hover:text-[#E6004D] uppercase tracking-tight">
                    {ticket.name}
                  </h4>
                  <p className="font-sans-body text-xs text-gray-600 line-clamp-2">
                    {ticket.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F4F5F7] border border-[#E2E8F0] group-hover:bg-[#E6004D] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

