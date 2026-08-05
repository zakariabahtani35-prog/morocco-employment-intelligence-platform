import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SimplonLogo } from './SimplonLogo';

export const StatsSection: React.FC = () => {
  return (
    <section className="bg-[#E6004D] text-black py-20 px-6 md:px-12 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* TOP SECTION: Left Intro + Right 3 Stat Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Intro (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:pr-4">
            <span className="font-sans-body text-xs font-bold uppercase tracking-wide text-black/80 block">
              Data-driven insights, massive impact
            </span>
            <h2 className="font-space font-extrabold text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight leading-[1.15]">
              Institutions that build on MEIP decide faster, hire smarter.
            </h2>
            <div className="pt-2">
              <a
                href="https://github.com/zakariabahtani35-prog/morocco-employment-intelligence-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-zinc-900 text-white font-sans-body font-bold text-xs uppercase px-5 py-3 rounded-full inline-flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
              >
                <span>Launch Interactive Dashboard</span>
                <ArrowRight className="w-4 h-4 fill-current stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* Right 3 Stat Columns (8 cols) with thin vertical dividers */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-black/20 lg:pl-2">
            
            {/* Stat 1 */}
            <div className="sm:px-6 space-y-4">
              <div>
                <div className="bg-white text-black font-space font-extrabold text-5xl lg:text-6xl px-4 py-2 inline-block rounded-xs tracking-tight shadow-xs">
                  70%
                </div>
              </div>
              <p className="font-sans-body font-bold text-base text-black leading-snug">
                faster resolution of skill gap & hiring demand analyses
              </p>
            </div>

            {/* Stat 2 */}
            <div className="sm:px-6 space-y-4">
              <div>
                <div className="bg-white text-black font-space font-extrabold text-5xl lg:text-6xl px-4 py-2 inline-block rounded-xs tracking-tight shadow-xs">
                  40hrs
                </div>
              </div>
              <p className="font-sans-body font-bold text-base text-black leading-snug">
                of manual labor market data collection saved per week
              </p>
            </div>

            {/* Stat 3 */}
            <div className="sm:px-6 space-y-4">
              <div>
                <div className="bg-white text-black font-space font-extrabold text-5xl lg:text-6xl px-4 py-2 inline-block rounded-xs tracking-tight shadow-xs">
                  20%
                </div>
              </div>
              <p className="font-sans-body font-bold text-base text-black leading-snug">
                increase in regional employment trend forecast precision
              </p>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: 2 Testimonials with White Quote Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pt-12 border-t border-black/20">
          
          {/* Quote 1 */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-white text-black p-3 rounded-md shadow-xs flex items-center justify-center">
                <SimplonLogo variant="full" height={32} ringColor="#E3004F" textColor="#12333E" />
              </div>
            </div>
            <p className="font-sans-body font-bold text-lg sm:text-xl text-black leading-snug max-w-xl">
              Numbers aside, the biggest thing is having complete confidence in Moroccan labor market data. With MEIP, we can identify skill shortages and employment shifts way faster. It saves hundreds of hours, but the real value is clarity for youth education.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <SimplonLogo variant="icon-only" height={20} ringColor="#1A202C" />
              <p className="font-sans-body font-extrabold text-base text-black">
                Data Analyst, Simplon Maghreb
              </p>
            </div>
          </div>

          {/* Quote 2 */}
          <div className="space-y-6">
            <div className="bg-white text-black w-14 h-14 flex items-center justify-center rounded-xs shadow-xs">
              <svg className="w-8 h-8 fill-black" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="font-sans-body font-bold text-lg sm:text-xl text-black leading-snug max-w-xl">
              With our scraped recruitment data cleaned in PostgreSQL and visualized in our Interactive Web Dashboard, we have complete visibility into regional hiring demands across Casablanca, Rabat, and Tangier... deploying updated market recommendations almost daily.
            </p>
            <p className="font-sans-body font-extrabold text-base text-black pt-1">
              Decision Support Specialist, CCFBS
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};



