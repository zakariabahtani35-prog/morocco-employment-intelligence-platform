import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/mockData';

export const TestimonialSection: React.FC = () => {
  const [index, setIndex] = useState(0);

  const currentTestimonial = TESTIMONIALS_DATA[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section className="bg-[#F4F5F7] text-[#1A202C] py-24 px-6 md:px-12 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Headline & Controls */}
        <div className="lg:col-span-5 space-y-6">
          <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
            JURY & INDUSTRY ENDORSEMENTS
          </span>

          <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#3B388E] tracking-tight">
            What Academic & Industry Mentors Say About MEIP
          </h2>

          <p className="font-sans-body text-gray-600 text-sm sm:text-base leading-relaxed">
            Evaluated for data architecture rigor, analytical accuracy, ETL reliability, and real-world socioeconomic value.
          </p>

          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handlePrev}
              className="bg-white hover:bg-gray-100 p-2.5 rounded-xl border border-[#E2E8F0] text-gray-700 transition-colors cursor-pointer shadow-xs"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="bg-white hover:bg-gray-100 p-2.5 rounded-xl border border-[#E2E8F0] text-gray-700 transition-colors cursor-pointer shadow-xs"
              aria-label="Next quote"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="font-sans-body text-xs text-gray-500 font-semibold ml-2">
              0{index + 1} / 0{TESTIMONIALS_DATA.length}
            </span>
          </div>
        </div>

        {/* Right Quote Card */}
        <div className="lg:col-span-7 bg-white text-[#1A202C] p-8 sm:p-12 border border-[#E2E8F0] rounded-2xl shadow-md relative">
          <Quote className="w-10 h-10 text-[#E6004D] mb-4" />
          
          <blockquote className="font-sans-body text-lg sm:text-2xl leading-relaxed font-semibold text-[#1A202C] mb-8">
            "{currentTestimonial.quote}"
          </blockquote>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#E2E8F0] pt-6 gap-4">
            <div>
              <div className="font-sans-body font-bold text-sm text-[#3B388E] flex items-center gap-2">
                <span>{currentTestimonial.handle}</span>
              </div>
              <p className="font-sans-body text-xs text-gray-500 uppercase mt-0.5 font-medium">
                {currentTestimonial.author} • {currentTestimonial.role}, {currentTestimonial.company}
              </p>
            </div>

            <span className="font-space font-extrabold text-xl text-[#E6004D] tracking-wider uppercase shrink-0">
              MEIP • 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

