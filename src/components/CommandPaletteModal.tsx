import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Terminal, 
  MapPin, 
  Calendar, 
  Award, 
  FileText, 
  Database, 
  Layers, 
  Ticket, 
  Compass, 
  Code2, 
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { PageView } from '../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCurrentView: (view: PageView) => void;
  onOpenTicketsModal: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: 'NAVIGATION' | 'INTEGRATIONS' | 'ACTIONS' | 'DATASET';
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  setCurrentView,
  onOpenTicketsModal
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commandItems: CommandItem[] = [
    {
      id: 'nav-home',
      title: 'Platform Overview & Architecture',
      description: 'Go to main executive dashboard and system architecture',
      category: 'NAVIGATION',
      icon: <Database className="w-4 h-4 text-[#E6004D]" />,
      action: () => {
        setCurrentView('home');
        onClose();
      }
    },
    {
      id: 'nav-api',
      title: 'REST API Sandbox & Webhooks Export',
      description: 'Explore live endpoints, test queries, and export datasets',
      category: 'INTEGRATIONS',
      icon: <Terminal className="w-4 h-4 text-[#3B388E]" />,
      action: () => {
        setCurrentView('api');
        onClose();
      },
      badge: 'LIVE API'
    },
    {
      id: 'nav-travel',
      title: 'Travel & Venue Logistics Map',
      description: 'Interactive Casablanca campus map, hotels, and CMN airport transit',
      category: 'NAVIGATION',
      icon: <Compass className="w-4 h-4 text-emerald-600" />,
      action: () => {
        setCurrentView('travel');
        onClose();
      }
    },
    {
      id: 'nav-events',
      title: 'Ecosystem Events & Defense Schedule',
      description: 'Keynotes, PostgreSQL workshops, and academic defense timelines',
      category: 'NAVIGATION',
      icon: <Calendar className="w-4 h-4 text-purple-600" />,
      action: () => {
        setCurrentView('events');
        onClose();
      }
    },
    {
      id: 'nav-sponsors',
      title: 'Partners & Academic Stakeholders',
      description: 'Simplon Maghreb, CCFBS, and technology ecosystem sponsors',
      category: 'NAVIGATION',
      icon: <Award className="w-4 h-4 text-amber-500" />,
      action: () => {
        setCurrentView('sponsors');
        onClose();
      }
    },
    {
      id: 'action-tickets',
      title: 'Request Attendee / Observer Pass',
      description: 'Secure instant confirmation pass for MEIP defense presentation',
      category: 'ACTIONS',
      icon: <Ticket className="w-4 h-4 text-[#E6004D]" />,
      action: () => {
        onClose();
        onOpenTicketsModal();
      },
      badge: 'FREE REGISTRATION'
    },
    {
      id: 'nav-faq',
      title: 'Frequently Asked Questions & Docs',
      description: 'Answers about Star Schema, ETL methodology, and data privacy',
      category: 'NAVIGATION',
      icon: <FileText className="w-4 h-4 text-blue-600" />,
      action: () => {
        setCurrentView('faq');
        onClose();
      }
    },
    {
      id: 'integration-github',
      title: 'GitHub Repository & SQL Schemas',
      description: 'Open source Python scrapers, DDL migrations, and Dbt models',
      category: 'DATASET',
      icon: <Code2 className="w-4 h-4 text-slate-700" />,
      action: () => {
        window.open('https://github.com/zakariabahtani/MEIP-Morocco-Employment-Intelligence-Platform', '_blank');
        onClose();
      },
      badge: 'EXTERNAL'
    }
  ];

  const filteredItems = commandItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-start justify-center pt-16 md:pt-24 px-4 bg-slate-900/60 backdrop-blur-md transition-all animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Palette Box */}
      <div role="dialog" aria-modal="true" aria-label="Command Palette" className="relative w-full max-w-2xl bg-white border border-[#E2E8F0] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3 bg-[#F4F5F7]/80">
          <Search className="w-5 h-5 text-[#3B388E] shrink-0 ml-1" />
          <input
            type="text"
            autoFocus
            placeholder="Search commands, views, REST endpoints, FAQs... (e.g. 'api', 'travel')"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent border-none text-sm md:text-base font-sans-body font-semibold text-[#1A202C] placeholder-gray-400 focus:outline-none focus:ring-0"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 bg-white border border-[#E2E8F0] rounded-lg font-mono-code text-[10px] font-bold text-gray-500 uppercase hover:bg-gray-50 cursor-pointer shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-1 divide-y divide-gray-100">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Sparkles className="w-8 h-8 text-gray-300 mx-auto" />
              <p className="font-sans-body text-sm font-semibold text-gray-500">
                No matching results for "{query}"
              </p>
              <p className="font-mono-code text-xs text-gray-400">
                Try searching for 'api', 'tickets', 'travel', or 'architecture'
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#3B388E] text-white shadow-md'
                      : 'hover:bg-[#F4F5F7] text-[#1A202C]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${
                      isSelected
                        ? 'bg-white/20 border-white/30 text-white'
                        : 'bg-white border-[#E2E8F0]'
                    }`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`font-space font-bold text-xs uppercase tracking-tight ${
                          isSelected ? 'text-white' : 'text-[#3B388E]'
                        }`}>
                          {item.title}
                        </h4>
                        {item.badge && (
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono-code font-bold uppercase ${
                            isSelected
                              ? 'bg-white text-[#3B388E]'
                              : 'bg-[#E6004D] text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] font-sans-body mt-0.5 ${
                        isSelected ? 'text-gray-200' : 'text-gray-500'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-white translate-x-1' : 'text-gray-400 opacity-0 group-hover:opacity-100'
                  }`} />
                </div>
              );
            })
          )}
        </div>

        {/* Command Footer Controls */}
        <div className="p-3 bg-[#F4F5F7] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono-code text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-[10px] font-bold">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-[10px] font-bold">↵</kbd> Select
            </span>
          </div>
          <span className="font-bold text-[#3B388E]">MEIP COMMAND HUB v2.5</span>
        </div>
      </div>
    </div>
  );
};
