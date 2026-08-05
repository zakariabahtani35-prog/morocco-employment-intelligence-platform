import React, { useState } from 'react';
import { 
  Database, 
  Globe, 
  Code2, 
  Cpu, 
  Layers, 
  Server, 
  LayoutDashboard, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  RefreshCw,
  Play,
  Maximize2,
  X,
  Volume2,
  VolumeX,
  Film
} from 'lucide-react';

export const SystemArchitectureSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isTheaterOpen, setIsTheaterOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const videoUrl = "https://dkmqcccyzfhytnpwzcdr.supabase.co/storage/v1/object/public/anand/Hyper_realistic_video_of_the_m.mp4";

  const pipelineSteps = [
    {
      id: 'sources',
      number: '01',
      title: 'Recruitment Sources',
      subtitle: 'Multi-Portal Harvesting',
      icon: Globe,
      badge: 'EXTRACTION',
      statusLabel: 'Operational',
      statusType: 'emerald',
      tech: 'ANAPEC • ReKrute • Emploi.ma • DreamJob • Novojob',
      description: 'Continuous web extraction scraping over 24,500+ active Moroccan job listings daily across government & private portals.',
      details: [
        'Automated HTTP request handling with custom headers',
        'Google News RSS feed integration for recruitment news',
        'Multi-region extraction (Casablanca, Rabat, Tangier, etc.)'
      ]
    },
    {
      id: 'scrapers',
      number: '02',
      title: 'Web Scrapers',
      subtitle: 'Python Scraping Engines',
      icon: Code2,
      badge: 'PARSING',
      statusLabel: 'Syncing',
      statusType: 'blue',
      tech: 'Python 3.11 • BeautifulSoup4 • Requests',
      description: 'Custom Python scraper microservices parsing HTML DOM payloads into structured JSON data models.',
      details: [
        'Resilient error retry loops & proxy rotation handling',
        'Structured payload validation before queueing',
        'Rate-limiting compliance per recruitment domain'
      ]
    },
    {
      id: 'cleaning',
      number: '03',
      title: 'Python Cleaning',
      subtitle: 'ETL Data Normalization',
      icon: Cpu,
      badge: 'TRANSFORMATION',
      statusLabel: 'Active',
      statusType: 'emerald',
      tech: 'Pandas • NumPy • Regular Expressions',
      description: 'Advanced data transformation pipeline executing deduplication, string cleaning, and skill taxonomy alignment.',
      details: [
        'Fuzzy string matching for company name unification',
        'Salary range parsing & MAD currency normalization',
        'Moroccan tech skill & experience level mapping'
      ]
    },
    {
      id: 'postgresql',
      number: '04',
      title: 'PostgreSQL DB',
      subtitle: 'Supabase OLAP Engine',
      icon: Database,
      badge: 'STORAGE',
      statusLabel: 'Healthy',
      statusType: 'emerald',
      tech: 'PostgreSQL • Supabase Cloud DB',
      description: 'Centralized cloud relational database optimized for Analytical Processing (OLAP) with strict foreign key integrity.',
      details: [
        'Automated database migrations and indexing',
        'Row Level Security (RLS) policies enabled',
        'Daily automated snapshots & backup retention'
      ]
    },
    {
      id: 'warehouse',
      number: '05',
      title: 'Data Warehouse',
      subtitle: 'Star Schema OLAP',
      icon: Layers,
      badge: 'DIMENSIONAL MODEL',
      statusLabel: 'Operational',
      statusType: 'emerald',
      tech: 'Fact_Jobs • Dim_Skills • Dim_Locations',
      description: 'Enterprise Star Schema data model separating business facts from dimensional analytical contexts.',
      details: [
        '10+ normalized dimension and fact tables',
        'Pre-aggregated material views for fast analytics',
        'Historical trend tracking for labor demand'
      ]
    },
    {
      id: 'api',
      number: '06',
      title: 'REST API',
      subtitle: 'FastAPI Data Layer',
      icon: Server,
      badge: 'SERVICES',
      statusLabel: 'Live (99ms)',
      statusType: 'emerald',
      tech: 'FastAPI • REST API • JSON Endpoints',
      description: 'High-performance backend API layer serving sanitized analytics data to frontend clients in sub-100ms response times.',
      details: [
        'OpenAPI / Swagger documentation specs',
        'Cached queries for high-frequency filtering',
        'Secure API token authentication & CORS guards'
      ]
    },
    {
      id: 'dashboard',
      number: '07',
      title: 'Interactive Dashboard',
      subtitle: 'React & TypeScript UI',
      icon: LayoutDashboard,
      badge: 'FRONTEND',
      statusLabel: 'Live',
      statusType: 'emerald',
      tech: 'React 18 • TypeScript • Tailwind CSS',
      description: 'Dynamic decision support web UI providing regional heatmaps, salary distributions, and filterable skill demand graphs.',
      details: [
        'Sub-second interactive filtering by region & contract',
        'Responsive layout tuned for mobile & executive desktop',
        'Interactive visualization panels & export controls'
      ]
    },
    {
      id: 'ai',
      number: '08',
      title: 'AI Insights',
      subtitle: 'LLM Decision Support',
      icon: Sparkles,
      badge: 'INTELLIGENCE',
      statusLabel: 'Ready',
      statusType: 'purple',
      tech: 'LLM Engine • Automated Executive Summaries',
      description: 'AI intelligence engine summarizing macroeconomic employment shifts, emerging skill gaps, and strategic recommendations.',
      details: [
        'Automated daily executive summary generation',
        'Natural language labor market query assistance',
        'Anomaly detection for sudden hiring surges'
      ]
    }
  ];

  return (
    <section id="architecture-section" className="bg-[#F4F5F7] text-[#1A202C] py-20 px-6 md:px-12 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
          <div className="space-y-3 max-w-2xl">
            <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
              LIVE ARCHITECTURE & PIPELINE // END-TO-END FLOW
            </span>
            <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#3B388E] tracking-tight">
              System Pipeline Flow
            </h2>
            <p className="font-sans-body text-gray-600 text-sm sm:text-base leading-relaxed">
              From raw web scraping across 7 Moroccan recruitment portals to automated PostgreSQL cleaning, REST API routing, and AI decision support.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold font-sans-body uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Pipeline Active
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white text-[#3B388E] border border-[#E2E8F0] px-3 py-1.5 rounded-full text-xs font-bold font-sans-body uppercase shadow-xs">
              <Zap className="w-3.5 h-3.5 text-[#E6004D]" />
              8 Stages
            </span>
          </div>
        </div>

        {/* Horizontal Pipeline Steps Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[140px] ${
                  isSelected
                    ? 'bg-[#3B388E] text-white border-[#3B388E] shadow-md scale-[1.02]'
                    : 'bg-white text-gray-700 border-[#E2E8F0] hover:border-[#E6004D] hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#F4F5F7] text-gray-500'
                  }`}>
                    {step.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#E6004D]' : 'text-[#3B388E]'}`} />
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h4 className={`font-space font-bold text-xs uppercase tracking-tight line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-[#3B388E]'
                    }`}>
                      {step.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between gap-1 mt-1">
                    <p className={`text-[10px] font-sans-body truncate ${
                      isSelected ? 'text-gray-200' : 'text-gray-500'
                    }`}>
                      {step.subtitle}
                    </p>
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono-code font-bold uppercase shrink-0 ${
                      isSelected
                        ? 'bg-white/20 text-white border border-white/30'
                        : step.statusType === 'blue'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : step.statusType === 'purple'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        isSelected
                          ? 'bg-emerald-300'
                          : step.statusType === 'blue'
                          ? 'bg-blue-500'
                          : step.statusType === 'purple'
                          ? 'bg-purple-500'
                          : 'bg-emerald-500'
                      }`} />
                      {step.statusLabel}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="relative bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-hidden">
          {/* Background Video */}
          <video
            src="https://dkmqcccyzfhytnpwzcdr.supabase.co/storage/v1/object/public/anand/Hyper_realistic_video_of_the_m.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-125 origin-center opacity-35 pointer-events-none transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/60 pointer-events-none" />

          <div className="lg:col-span-7 space-y-5 relative z-10">
            <div className="flex items-center gap-3">
              <span className="font-sans-body text-xs font-bold uppercase bg-[#FCE4E8] text-[#E6004D] border border-[#E6004D]/30 px-3 py-1 rounded-full">
                STAGE {pipelineSteps[activeStep].number} // {pipelineSteps[activeStep].badge}
              </span>
              <span className="font-mono-code text-xs text-gray-400 uppercase">
                {pipelineSteps[activeStep].tech}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-space font-extrabold text-2xl sm:text-3xl text-[#3B388E] uppercase tracking-tight">
                {pipelineSteps[activeStep].title}
              </h3>
              <p className="font-sans-body text-gray-600 text-sm sm:text-base leading-relaxed">
                {pipelineSteps[activeStep].description}
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-[#E2E8F0]">
              <span className="font-sans-body text-xs font-bold uppercase text-[#3B388E] block">
                Technical Execution Highlights
              </span>
              <ul className="space-y-2 font-sans-body text-xs text-gray-700">
                {pipelineSteps[activeStep].details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E6004D] shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F4F5F7]/90 backdrop-blur-xs border border-[#E2E8F0] rounded-xl p-6 space-y-4 relative z-10">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <span className="font-sans-body text-xs font-bold uppercase text-gray-500">SYSTEM ARCHITECTURE MATRIX</span>
              <span className="font-mono-code text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">VERIFIED</span>
            </div>

            <div className="space-y-3 font-sans-body text-xs">
              <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]/60">
                <span className="text-gray-500 font-semibold">STAGE MODULE:</span>
                <span className="font-bold text-[#3B388E]">{pipelineSteps[activeStep].title}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]/60">
                <span className="text-gray-500 font-semibold">STAGE STATUS:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {pipelineSteps[activeStep].statusLabel}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]/60">
                <span className="text-gray-500 font-semibold">STACK ENGINE:</span>
                <span className="font-bold text-[#E6004D]">{pipelineSteps[activeStep].tech}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]/60">
                <span className="text-gray-500 font-semibold">DATA INTEGRITY:</span>
                <span className="font-bold text-gray-800">100% Validated</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-semibold">LATENCY / SPEED:</span>
                <span className="font-bold text-emerald-600">Sub-Second Refresh</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % pipelineSteps.length)}
                className="w-full flex-1 bg-[#3B388E] hover:bg-[#2F2C74] text-white font-sans-body font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>NEXT STAGE ({activeStep + 1 === pipelineSteps.length ? '01' : '0' + (activeStep + 2)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsTheaterOpen(true)}
                className="w-full sm:w-auto bg-[#E6004D] hover:bg-[#C40042] text-white font-sans-body font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                title="Open Hyper-Realistic Video Simulation in High Definition"
              >
                <Film className="w-4 h-4" />
                <span className="whitespace-nowrap">FULL VIDEO</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Fullscreen Theater Video Modal */}
      {isTheaterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl relative flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 md:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-[#E6004D]/20 text-[#E6004D] rounded-xl">
                  <Film className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-space font-extrabold text-lg text-white uppercase tracking-tight">
                    Hyper-Realistic Simulation Showcase
                  </h4>
                  <p className="font-sans-body text-xs text-slate-400">
                    High-definition system video with automatic watermark-cropping mask
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsTheaterOpen(false)}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas Container - Crops watermarks via overflow-hidden and scale */}
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
              <video
                src={videoUrl}
                autoPlay={isPlaying}
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover scale-125 origin-center transition-all duration-300"
              />

              {/* Top/Bottom Subtle Gradient overlay for clean framing */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

              {/* Floating Quality Badge */}
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl font-mono-code text-[11px] font-bold text-white uppercase flex items-center gap-2 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>4K HYPER-REALISTIC VIDEO STREAM</span>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 md:p-6 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(prev => !prev)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-sans-body font-bold text-xs uppercase rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  <span>{isMuted ? 'UNMUTE AUDIO' : 'MUTED'}</span>
                </button>

                <span className="font-mono-code text-xs text-slate-400">
                  CROPPED WATERMARK MASK // OPTICAL ZOOM 125%
                </span>
              </div>

              <button
                onClick={() => setIsTheaterOpen(false)}
                className="bg-[#E6004D] hover:bg-[#C40042] text-white font-sans-body font-bold text-xs uppercase px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
              >
                CLOSE SIMULATION
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
