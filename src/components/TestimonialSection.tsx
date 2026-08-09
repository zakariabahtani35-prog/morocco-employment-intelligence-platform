import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Github, Twitter, Linkedin, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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

  const socialIcons = [
    { icon: Github, url: currentTestimonial.githubUrl || '#', label: 'GitHub' },
    { icon: Twitter, url: currentTestimonial.twitterUrl || '#', label: 'Twitter' },
    { icon: Linkedin, url: currentTestimonial.linkedinUrl || '#', label: 'LinkedIn' },
  ];

  return (
    <section className="bg-[#F4F5F7] dark:bg-gray-900 text-[#1A202C] dark:text-white py-20 px-4 sm:px-6 md:px-12 border-b border-[#E2E8F0] dark:border-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Header & Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
              JURY & INDUSTRY ENDORSEMENTS
            </span>

            <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#3B388E] dark:text-indigo-300 tracking-tight leading-tight">
              What Academic & Industry Mentors Say About MEIP
            </h2>

            <p className="font-sans-body text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              Evaluated for data architecture rigor, analytical accuracy, ETL reliability, and real-world socioeconomic value.
            </p>
          </div>

          {/* Interactive Navigation Arrows & Counter */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrev}
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-2xl border border-[#E2E8F0] dark:border-gray-700 text-gray-700 dark:text-gray-200 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              aria-label="Previous mentor"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-2xl border border-[#E2E8F0] dark:border-gray-700 text-gray-700 dark:text-gray-200 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              aria-label="Next mentor"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="font-sans-body text-xs text-gray-500 dark:text-gray-400 font-semibold ml-2 tracking-widest">
              0{index + 1} / 0{TESTIMONIALS_DATA.length}
            </span>
          </div>
        </div>

        {/* Profile Card Slider matching the exact uploaded design */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full"
            >
              {/* Desktop Profile Card Layout */}
              <div className="hidden md:flex relative items-center justify-center min-h-[460px] py-4">
                {/* Left Square Portrait Image */}
                <div className="w-[440px] h-[440px] rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0 shadow-xl border border-gray-200/60 dark:border-gray-700">
                  <Image
                    src={currentTestimonial.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop'}
                    alt={currentTestimonial.author}
                    width={440}
                    height={440}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>

                {/* Overlapping White Profile Card */}
                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 lg:p-10 ml-[-75px] z-10 max-w-xl flex-1 border border-gray-100 dark:border-gray-700 relative"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-[#1A202C] dark:text-white font-space tracking-tight">
                        {currentTestimonial.author}
                      </h3>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 font-sans-body mt-0.5">
                        {currentTestimonial.role}, {currentTestimonial.company}
                      </p>
                    </div>

                    <span className="font-space font-extrabold text-xs text-[#E6004D] bg-[#FCE4E8] dark:bg-rose-950/40 px-3 py-1 rounded-full uppercase tracking-wider shrink-0">
                      MEIP • 2026
                    </span>
                  </div>

                  {/* Quote content */}
                  <div className="relative mb-8">
                    <Quote className="w-8 h-8 text-[#E6004D] mb-2 opacity-80" />
                    <p className="text-[#1A202C] dark:text-gray-200 text-base lg:text-lg leading-relaxed font-sans-body font-medium">
                      "{currentTestimonial.quote}"
                    </p>
                  </div>

                  {/* Social Buttons & Handle */}
                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-6">
                    <div className="flex space-x-3">
                      {socialIcons.map(({ icon: Icon, url, label }) => (
                        <Link
                          key={label}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 bg-[#1A202C] dark:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#E6004D] dark:hover:bg-[#E6004D] hover:scale-110 shadow-md"
                          aria-label={label}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </Link>
                      ))}
                    </div>

                    <span className="text-xs font-semibold text-[#3B388E] dark:text-indigo-400 font-mono-code">
                      {currentTestimonial.handle}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Mobile Profile Card Layout */}
              <div className="md:hidden bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-md">
                  <Image
                    src={currentTestimonial.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop'}
                    alt={currentTestimonial.author}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#1A202C] dark:text-white font-space">
                        {currentTestimonial.author}
                      </h3>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 font-sans-body">
                        {currentTestimonial.role}, {currentTestimonial.company}
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-[#E6004D] bg-[#FCE4E8] dark:bg-rose-950/40 px-2.5 py-1 rounded-full uppercase">
                      MEIP • 2026
                    </span>
                  </div>

                  <p className="text-[#1A202C] dark:text-gray-200 text-sm leading-relaxed font-sans-body">
                    "{currentTestimonial.quote}"
                  </p>

                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex space-x-3">
                      {socialIcons.map(({ icon: Icon, url, label }) => (
                        <Link
                          key={label}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#1A202C] dark:bg-gray-700 rounded-full flex items-center justify-center transition-all hover:bg-[#E6004D]"
                          aria-label={label}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </Link>
                      ))}
                    </div>

                    <span className="text-xs font-semibold text-[#3B388E] dark:text-indigo-400 font-mono-code">
                      {currentTestimonial.handle}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
