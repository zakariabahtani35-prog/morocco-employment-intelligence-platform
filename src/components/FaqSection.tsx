import React, { useState, useMemo } from 'react';
import { Plus, Minus, Search, HelpCircle, Mail, MessageSquare, Linkedin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { FAQ_DATA } from '../data/mockData';

type CategoryFilter = 'all' | 'general' | 'data' | 'tech' | 'academic' | 'dashboard';

interface FaqSectionProps {
  onOpenTicketsModal?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenTicketsModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories: { id: CategoryFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All Questions', count: FAQ_DATA.length },
    { id: 'general', label: 'General Project', count: FAQ_DATA.filter((f) => f.category === 'general').length },
    { id: 'data', label: 'Data Sources & Scrapers', count: FAQ_DATA.filter((f) => f.category === 'data').length },
    { id: 'tech', label: 'Tech Stack & DB', count: FAQ_DATA.filter((f) => f.category === 'tech').length },
    { id: 'academic', label: 'Academic & Jury Context', count: FAQ_DATA.filter((f) => f.category === 'academic').length },
    { id: 'dashboard', label: 'Interactive Web Dashboard', count: FAQ_DATA.filter((f) => f.category === 'dashboard').length },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="faq-section" className="bg-[#F4F5F7] text-[#1A202C] min-h-screen py-20 px-4 sm:px-6 md:px-12 border-b border-[#E2E8F0] pt-28">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E2E8F0]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#FCE4E8] border border-[#E6004D]/30 px-3 py-1 rounded-full text-xs font-sans-body font-bold text-[#E6004D] tracking-widest uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h1 className="font-space font-extrabold text-4xl sm:text-6xl text-[#3B388E] tracking-tight uppercase">
              MEIP PROJECT <span className="text-[#E6004D]">FAQ</span>
            </h1>
            <p className="font-sans-body text-gray-600 text-sm sm:text-base leading-relaxed">
              Detailed answers regarding data collection sources, cleaning methodologies, Supabase Star Schema architecture, interactive web dashboards, and project defense documentation.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] focus:border-[#E6004D] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#1A202C] placeholder-gray-400 outline-none transition-colors font-sans-body shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Selector Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-sans-body rounded-xl uppercase tracking-wider whitespace-nowrap border transition-all cursor-pointer flex items-center gap-2 font-bold ${
                  isActive
                    ? 'bg-[#E6004D] text-white border-[#E6004D] shadow-xs'
                    : 'bg-white text-gray-600 border-[#E2E8F0] hover:border-gray-300 hover:text-[#3B388E]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#F4F5F7] text-gray-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Grid: Left FAQs Accordion, Right Contact Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* FAQ Accordions */}
          <div className="lg:col-span-8 space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center space-y-4 shadow-xs">
                <HelpCircle className="w-10 h-10 text-gray-400 mx-auto" />
                <h3 className="font-space font-bold text-lg text-[#3B388E]">No questions found</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  We couldn't find any questions matching "{searchQuery}". Try searching for another keyword like "schema", "ANAPEC", or "dashboard".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="bg-[#F4F5F7] border border-[#E2E8F0] text-xs text-[#3B388E] px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-colors uppercase font-sans-body font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openIds.includes(faq.id);
                return (
                  <div
                    key={faq.id}
                    className={`border rounded-2xl transition-all duration-200 shadow-xs ${
                      isOpen ? 'border-[#E6004D] bg-white' : 'border-[#E2E8F0] bg-white hover:border-gray-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <span className="inline-block text-[10px] font-sans-body uppercase tracking-widest text-[#E6004D] bg-[#FCE4E8] px-2.5 py-0.5 rounded-full border border-[#E6004D]/20 mb-1 font-bold">
                          {faq.category}
                        </span>
                        <h3 className="font-space font-bold text-base sm:text-lg text-[#3B388E] pr-2">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="bg-[#F4F5F7] p-2 rounded-xl border border-[#E2E8F0] text-gray-600 shrink-0 mt-1">
                        {isOpen ? <Minus className="w-4 h-4 text-[#E6004D]" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 font-sans-body text-gray-700 text-sm sm:text-base leading-relaxed border-t border-[#E2E8F0]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Right Help Box & Direct Support */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-6 relative overflow-hidden shadow-xs">
              <div className="space-y-2">
                <h3 className="font-space font-bold text-xl text-[#3B388E] uppercase tracking-tight">
                  PROJECT AUTHOR CONTACT
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm font-sans-body leading-relaxed">
                  Have specific inquiries about the dataset or interested in data analysis collaboration? Get in touch with Zakaria.
                </p>
              </div>

              <div className="space-y-3 font-sans-body text-xs">
                <a
                  href="mailto:zakariabahtanidev@gmail.com"
                  className="flex items-center gap-3 bg-[#F4F5F7] border border-[#E2E8F0] hover:border-[#E6004D] p-3 rounded-xl text-gray-700 hover:text-[#3B388E] transition-all group"
                >
                  <Mail className="w-4 h-4 text-[#E6004D] shrink-0" />
                  <div className="flex-1 truncate">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">DIRECT EMAIL</p>
                    <p className="font-bold truncate text-[#3B388E]">zakariabahtanidev@gmail.com</p>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E6004D] transition-colors shrink-0" />
                </a>

                <a
                  href="https://github.com/zakariabahtani35-prog/morocco-employment-intelligence-platform"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-[#F4F5F7] border border-[#E2E8F0] hover:border-[#E6004D] p-3 rounded-xl text-gray-700 hover:text-[#3B388E] transition-all group"
                >
                  <MessageSquare className="w-4 h-4 text-[#E6004D] shrink-0" />
                  <div className="flex-1 truncate">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">GITHUB REPOSITORY</p>
                    <p className="font-bold truncate text-[#3B388E]">morocco-employment-intelligence-platform</p>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E6004D] transition-colors shrink-0" />
                </a>

                <a
                  href="https://www.linkedin.com/in/zakaria-bahtani-b64251390/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-[#F4F5F7] border border-[#E2E8F0] hover:border-[#E6004D] p-3 rounded-xl text-gray-700 hover:text-[#3B388E] transition-all group"
                >
                  <Linkedin className="w-4 h-4 text-[#0077B5] shrink-0" />
                  <div className="flex-1 truncate">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">LINKEDIN PROFILE</p>
                    <p className="font-bold truncate text-[#3B388E]">Zakaria Bahtani</p>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E6004D] transition-colors shrink-0" />
                </a>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] space-y-2 text-xs text-gray-600 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E6004D]" />
                  <span>Full ETL scripts & SQL schemas included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E6004D]" />
                  <span>Simplon Maghreb × CCFBS certified</span>
                </div>
              </div>
            </div>

            {/* Quick Dashboard Callout */}
            <div className="bg-[#E6004D] text-white p-6 rounded-2xl space-y-4 shadow-md">
              <div className="space-y-1">
                <p className="font-sans-body font-bold text-xs uppercase tracking-widest text-white/90">READY TO EXPLORE DATA?</p>
                <h4 className="font-space font-extrabold text-2xl uppercase tracking-tight">OPEN POWER BI DASHBOARD</h4>
              </div>
              <p className="text-xs font-sans-body text-white/90 font-medium leading-relaxed">
                Experience real-time interactive market metrics, skill demand heatmaps, and salary distributions across Morocco.
              </p>
              <button
                onClick={() => {
                  if (onOpenTicketsModal) {
                    onOpenTicketsModal();
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="w-full bg-[#3B388E] hover:bg-[#2e2b72] text-white py-3 rounded-xl font-sans-body font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span>LAUNCH DASHBOARD NOW</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


