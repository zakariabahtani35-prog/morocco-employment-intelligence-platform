import React from 'react';
import { ArrowUpRight, LayoutDashboard, Database, Github, GraduationCap, MapPin, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import RotatingText from './RotatingText';
import { SimplonLogo } from './SimplonLogo';

interface HeroSectionProps {
  onNavigateToDashboard?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToDashboard }) => {
  return (
    <section className="relative w-full min-h-[85vh] pt-28 md:pt-36 pb-16 bg-[#F4F5F7] text-[#1A202C] overflow-hidden flex flex-col justify-between border-b border-[#E2E8F0]">
      {/* Decorative Full-Cover Image Backdrop */}
      <div className="absolute inset-0 h-full w-full pointer-events-none opacity-70 sm:opacity-80 bg-no-repeat bg-center bg-cover transition-all duration-500 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(244, 245, 247, 0.95) 0%, rgba(244, 245, 247, 0.82) 45%, rgba(244, 245, 247, 0.35) 100%), radial-gradient(circle at 80% 30%, rgba(230, 0, 77, 0.12) 0%, transparent 60%), url('https://wa9tna.wordpress.com/wp-content/uploads/2026/06/606002601_1315069980663744_8983766195128178560_n.jpg')`,
          filter: 'contrast(105%) brightness(102%)'
        }}
      />

      {/* Hero Main Content Box */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full my-auto z-10 pt-4 md:pt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 max-w-4xl"
        >


          {/* Main Title & Subtitle */}
          <div className="space-y-4">
            <h1 className="font-space font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight text-[#1A202C] uppercase">
              EMPLOYMENT INTELLIGENCE PLATFORM<span className="text-[#E6004D]">.</span>
            </h1>
            <p className="font-sans-body font-bold text-lg sm:text-xl md:text-2xl text-[#3B388E] tracking-tight leading-snug flex items-center gap-2 flex-wrap">
              <span>AI-Powered</span>
              <RotatingText
                texts={['Decision Support', 'Labor Market Analytics', 'Recruitment Intelligence', 'Career Insights']}
                mainClassName="px-2.5 py-0.5 bg-[#FCE4E8] text-[#E6004D] rounded-lg overflow-hidden inline-flex justify-center"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
              <span>for Morocco</span>
            </p>
            <p className="font-sans-body text-gray-600 text-sm sm:text-base max-w-3xl leading-relaxed pt-1">
              An intelligent end-to-end data platform that automatically extracts, cleans, transforms, and analyzes thousands of job postings across Moroccan recruitment portals (ANAPEC, ReKrute, Emploi.ma, DreamJob, Novojob) into actionable interactive web dashboards.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                if (onNavigateToDashboard) {
                  onNavigateToDashboard();
                }
              }}
              className="bg-[#E6004D] hover:bg-[#C00F2F] text-white font-sans-body font-bold text-xs sm:text-sm uppercase px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>LAUNCH DASHBOARD</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-10 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#E2E8F0] pt-6 font-sans-body text-xs tracking-wider uppercase text-gray-500">
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-[#E6004D]" />
            <div>
              <span className="text-[#3B388E] font-bold block">FINAL DATA ANALYST PROJECT</span>
              <span className="text-gray-500">SIMPLON MAGHREB × CCFBS</span>
            </div>
          </div>
          <div className="md:text-right">
            <span className="text-[#3B388E] font-bold block">AUTHOR: ZAKARIA BAHTANI</span>
            <span className="text-gray-500">MOROCCO LABOR MARKET DECISION SUPPORT</span>
          </div>
        </div>
      </div>
    </section>
  );
};

