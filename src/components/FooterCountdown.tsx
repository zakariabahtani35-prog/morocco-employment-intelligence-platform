import React, { useState, useEffect } from 'react';
import { Youtube, Twitter, Linkedin, Github, ArrowUpRight, Mail } from 'lucide-react';
import { SolanaBarsLogo } from './SolanaLogo';

export const FooterCountdown: React.FC = () => {
  // Target date for project defense / final submission (13 days remaining)
  const targetDate = new Date('2026-08-12T23:59:59').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 13,
    hours: 8,
    minutes: 41,
    seconds: 56,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#E6004D] text-white overflow-hidden selection:bg-black selection:text-white">
      {/* Photorealistic Background Loop Video with Watermark Cropping Scale Mask */}
      <video
        src="https://dkmqcccyzfhytnpwzcdr.supabase.co/storage/v1/object/public/anand/Photorealistic_k_footage_of_t.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-140 origin-center opacity-40 pointer-events-none transition-transform duration-700 brightness-105 contrast-110"
      />
      {/* Professional Deep Crimson Gradient Overlay for optimal legibility and subtle video ambient motion */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8C002F]/75 via-[#AD003A]/65 to-[#54001C]/85 pointer-events-none" />

      {/* Stepped Pixelated Top Border Edge */}
      <div className="relative z-10 w-full bg-[#F4F5F7] leading-none pointer-events-none select-none">
        <svg
          viewBox="0 0 1000 32"
          preserveAspectRatio="none"
          className="w-full h-7 sm:h-9 md:h-11 text-[#E6004D] fill-current block"
        >
          <polygon points="0,32 0,16 60,16 60,0 140,0 140,24 220,24 220,8 300,8 300,28 380,28 380,0 480,0 480,18 580,18 580,6 680,6 680,28 780,28 780,12 880,12 880,0 960,0 960,20 1000,20 1000,32" />
        </svg>
      </div>

      <div className="relative z-10 pt-4 pb-8 px-6 md:px-12 max-w-[1400px] mx-auto space-y-8 sm:space-y-12">
        {/* Top Socials & Navigation Header Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 font-mono-code text-xs uppercase font-bold text-white border-b border-white/20 pb-6">
          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a href="https://github.com/zakariabahtani35-prog/morocco-employment-intelligence-platform" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity" aria-label="GitHub">
              <Github className="w-5 h-5 stroke-[2.2]" />
            </a>
            <a href="https://www.linkedin.com/in/zakaria-bahtani-b64251390/" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 stroke-[2.2]" />
            </a>
            <a href="mailto:zakariabahtanidev@gmail.com" className="hover:opacity-70 transition-opacity" aria-label="Email">
              <Mail className="w-5 h-5 stroke-[2.2]" />
            </a>
          </div>

          {/* Copyright text */}
          <div className="tracking-widest text-white/90 font-bold text-center">
            MEIP © 2026 | ZAKARIA BAHTANI • SIMPLON MAGHREB × CCFBS
          </div>

          {/* Footer Navigation Links */}
          <div className="flex items-center gap-6">
            <a href="mailto:zakariabahtanidev@gmail.com" className="flex items-center gap-1.5 hover:underline font-bold">
              <span>CONTACT AUTHOR</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
            <a href="#about-section" className="flex items-center gap-1.5 hover:underline font-bold">
              <span>PROJECT OVERVIEW</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* Live Running Countdown Timer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center py-4 sm:py-8">
          <div className="space-y-1">
            <div className="font-space font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white leading-none">
              {String(timeLeft.days).padStart(3, '0')}
            </div>
            <span className="font-mono-code font-bold text-xs md:text-sm uppercase tracking-widest text-white/90 block pt-2">
              DAYS
            </span>
          </div>

          <div className="space-y-1">
            <div className="font-space font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <span className="font-mono-code font-bold text-xs md:text-sm uppercase tracking-widest text-white/90 block pt-2">
              HOURS
            </span>
          </div>

          <div className="space-y-1">
            <div className="font-space font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <span className="font-mono-code font-bold text-xs md:text-sm uppercase tracking-widest text-white/90 block pt-2">
              MINUTES
            </span>
          </div>

          <div className="space-y-1">
            <div className="font-space font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <span className="font-mono-code font-bold text-xs md:text-sm uppercase tracking-widest text-white/90 block pt-2">
              SECONDS
            </span>
          </div>
        </div>

        {/* Giant Logo + MEIP Banner */}
        <div className="relative pt-4 flex items-end justify-between">
          <div className="flex items-center gap-3 sm:gap-5 w-full overflow-hidden">
            <SolanaBarsLogo className="w-14 sm:w-24 md:w-32 lg:w-40 h-10 sm:h-18 md:h-24 lg:h-28 shrink-0" fillColor="#FFFFFF" />
            <span className="font-space font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-white uppercase leading-none truncate">
              MEIP 2026
            </span>
          </div>

          {/* Floating Circle Button at Bottom Right */}
          <button
            onClick={scrollToTop}
            className="bg-black text-white hover:bg-zinc-900 w-10 sm:w-12 h-10 sm:h-12 rounded-full shadow-2xl transition-transform hover:scale-105 cursor-pointer flex items-center justify-center shrink-0 ml-2 mb-1 z-10 border border-white/20"
            aria-label="Back to top"
            title="Back to top"
          >
            <SolanaBarsLogo className="w-5 h-4" fillColor="#FFFFFF" />
          </button>
        </div>
      </div>
    </footer>
  );
};


