import React, { useState, useEffect } from 'react';
import { SolanaBarsLogo } from './SolanaLogo';
import { SimplonLogo } from './SimplonLogo';
import GooeyNav from './GooeyNav';
import { PageView } from '../types';
import { X, ArrowUpRight, ArrowRight, LayoutDashboard, Command, Terminal } from 'lucide-react';

interface HeaderProps {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  onOpenTicketsModal: () => void;
  onOpenCommandPalette?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  onOpenTicketsModal,
  onOpenCommandPalette
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: PageView) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      label: 'OVERVIEW',
      href: '#overview',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        handleNavClick('home');
      },
    },
    {
      label: 'LOGISTICS',
      href: '#logistics',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        handleNavClick('travel');
      },
    },
    {
      label: 'TECH STACK',
      href: '#techstack',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        handleNavClick('sponsors');
      },
    },
    {
      label: 'FAQ',
      href: '#faq',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        handleNavClick('faq');
      },
    },
  ];

  const currentViewIndex = currentView === 'travel' ? 1 : currentView === 'sponsors' ? 2 : currentView === 'faq' ? 3 : 0;

  return (
    <>
      {/* Centered Floating Header Bar */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300">
        <div
          className={`bg-white text-[#1A202C] border border-[#E2E8F0] pointer-events-auto shadow-md flex items-center justify-between transition-all duration-300 ease-out backdrop-blur-md px-4 py-2 gap-3 sm:gap-4 rounded-2xl ${
            isScrolled
              ? 'max-w-xl sm:max-w-4xl w-full sm:w-auto'
              : 'max-w-fit w-auto'
          }`}
        >
          {/* Logo + MEIP */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group cursor-pointer shrink-0"
            id="header-brand-button"
          >
            <SolanaBarsLogo className="w-5 h-4 group-hover:scale-105 transition-transform" fillColor="#E6004D" />
            <span className="font-space font-extrabold tracking-tight text-xl text-[#3B388E]">MEIP</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-sans bg-[#FCE4E8] text-[#E6004D] border border-[#E6004D]/30 px-2 py-0.5 font-bold uppercase rounded-md">
              <SimplonLogo variant="icon-only" height={12} ringColor="#E3004F" />
              <span>Simplon</span>
            </span>
          </button>

          {/* Inline GooeyNav Links visible on scroll expansion on desktop */}
          <div
            className={`hidden md:flex items-center transition-all duration-300 ease-in-out ${
              isScrolled ? 'opacity-100 max-w-lg' : 'opacity-0 max-w-0 pointer-events-none overflow-hidden'
            }`}
          >
            <GooeyNav
              items={navItems}
              initialActiveIndex={currentViewIndex}
              particleCount={12}
              particleDistances={[60, 10]}
              particleR={80}
              colors={[1, 2, 3]}
            />
          </div>

          {/* Action Area: Search + Dashboard + Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* SEARCH / COMMAND PALETTE BUTTON */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="bg-[#F4F5F7] hover:bg-gray-200 border border-[#E2E8F0] px-2.5 py-1.5 text-gray-600 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono-code shrink-0"
                title="Open Command Hub (Ctrl+K)"
                aria-label="Open Command Hub"
              >
                <Command className="w-3.5 h-3.5 text-[#3B388E]" />
                <span className="hidden sm:inline font-bold text-[#3B388E]">K</span>
              </button>
            )}

            {/* LAUNCH DASHBOARD Button */}
            <button
              onClick={() => handleNavClick('dashboard')}
              data-tickets-btn="true"
              className="bg-[#E6004D] hover:bg-[#C00F2F] text-white font-sans-body font-bold text-xs uppercase px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs hover:shadow-md shrink-0"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>DASHBOARD</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-[#F4F5F7] hover:bg-gray-200 border border-[#E2E8F0] p-2 text-[#3B388E] rounded-xl transition-colors cursor-pointer shrink-0 flex items-center justify-center w-8 h-8"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 text-[#E6004D]" />
              ) : (
                <div className="w-3.5 h-2.5 flex flex-col justify-between">
                  <span className="w-full h-[2px] bg-[#3B388E] block rounded-full"></span>
                  <span className="w-full h-[2px] bg-[#3B388E] block rounded-full"></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Overlay Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center pt-20 px-4 animate-in fade-in duration-200 pointer-events-auto">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-md p-6 h-fit shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <SolanaBarsLogo className="w-5 h-4" fillColor="#E6004D" />
                <span className="font-space font-extrabold tracking-tight text-xl text-[#3B388E]">MEIP</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleNavClick('dashboard');
                  }}
                  className="bg-[#E6004D] text-white hover:bg-[#C00F2F] font-mono-code font-bold text-xs uppercase px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>DASHBOARD</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#F4F5F7] hover:bg-gray-200 p-1.5 text-gray-600 rounded-lg transition-colors cursor-pointer border border-[#E2E8F0]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="py-6 flex flex-col gap-2.5 font-sans-body font-semibold text-sm tracking-wide">
              <button
                onClick={() => handleNavClick('home')}
                className={`flex items-center justify-between text-left px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  currentView === 'home' ? 'bg-[#FCE4E8] text-[#E6004D]' : 'text-gray-700 hover:bg-[#F4F5F7]'
                }`}
              >
                <span>OVERVIEW & HERO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNavClick('travel')}
                className={`flex items-center justify-between text-left px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  currentView === 'travel' ? 'bg-[#FCE4E8] text-[#E6004D]' : 'text-gray-700 hover:bg-[#F4F5F7]'
                }`}
              >
                <span>LOGISTICS & VENUE MAP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNavClick('sponsors')}
                className={`flex items-center justify-between text-left px-4 py-3 rounded-lg transition-all cursor-pointer ${
                  currentView === 'sponsors' ? 'bg-[#FCE4E8] text-[#E6004D]' : 'text-gray-700 hover:bg-[#F4F5F7]'
                }`}
              >
                <span>TECH STACK & DATA SOURCES</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNavClick('events')}
                className={`flex items-center justify-between text-left px-4 py-3 rounded-lg transition-all cursor-pointer ${
                  currentView === 'events' ? 'bg-[#FCE4E8] text-[#E6004D]' : 'text-gray-700 hover:bg-[#F4F5F7]'
                }`}
              >
                <span>ELT PIPELINE & WORKFLOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className={`flex items-center justify-between text-left px-4 py-3 rounded-lg transition-all cursor-pointer ${
                  currentView === 'faq' ? 'bg-[#FCE4E8] text-[#E6004D]' : 'text-gray-700 hover:bg-[#F4F5F7]'
                }`}
              >
                <span>FAQ & AUTHOR INFO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

