import React, { useState } from 'react';
import { 
  GitBranch, 
  FileText, 
  Layers, 
  Database, 
  LayoutDashboard, 
  Server, 
  Code2, 
  Presentation, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Calendar
} from 'lucide-react';

export const DeliverablesTimelineSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'deliverables'>('deliverables');

  const timelineMilestones = [
    {
      phase: '01',
      title: 'Research & Domain Analysis',
      date: 'Q1 2026',
      status: 'COMPLETED',
      description: 'Identification of data gaps across ANAPEC, ReKrute, Emploi.ma, and specification of Moroccan recruitment taxonomy requirements.'
    },
    {
      phase: '02',
      title: 'Architecture & Schema Design',
      date: 'Q2 2026',
      status: 'COMPLETED',
      description: 'Dimensional OLAP Star Schema modeling (Fact_Jobs & Dimension tables) and PostgreSQL DDL schema definition.'
    },
    {
      phase: '03',
      title: 'Scraper & Pipeline Development',
      date: 'Q2 2026',
      status: 'COMPLETED',
      description: 'Python 3.11 web scrapers using BeautifulSoup4, Requests, and n8n workflow orchestration engines.'
    },
    {
      phase: '04',
      title: 'Automated Data Extraction',
      date: 'Q2 2026',
      status: 'COMPLETED',
      description: 'Daily automated harvesting of 24,500+ active job postings with automated cleaning and deduplication.'
    },
    {
      phase: '05',
      title: 'Interactive Dashboard & API',
      date: 'Q3 2026',
      status: 'COMPLETED',
      description: 'React + TypeScript executive web dashboard and FastAPI endpoints with AI LLM trend summary integration.'
    },
    {
      phase: '06',
      title: 'Integration & Staging Testing',
      date: 'Q3 2026',
      status: 'COMPLETED',
      description: 'End-to-end integration testing, schema validation checks, query performance tuning, and audit logging.'
    },
    {
      phase: '07',
      title: 'Production Deployment & Defense',
      date: 'JULY 2026',
      status: 'LIVE PRODUCTION',
      description: 'Official production launch, GitHub repository open-sourcing, and Academic Jury defense at Simplon Maghreb × CCFBS.'
    }
  ];

  const deliverables = [
    {
      title: 'GitHub Codebase Repository',
      category: 'SOURCE CODE',
      icon: GitBranch,
      description: 'Complete Python web scrapers, SQL DDL scripts, Pandas ETL transformation scripts, and React web application.',
      link: 'https://github.com/zakariabahtani35-prog/morocco-employment-intelligence-platform',
      badge: 'OPEN SOURCE'
    },
    {
      title: 'Technical Documentation & Specs',
      category: 'DOCUMENTATION',
      icon: FileText,
      description: 'Comprehensive technical whitepaper covering data extraction methodologies, normalization logic, and API schemas.',
      link: '#',
      badge: 'PDF / MARKDOWN'
    },
    {
      title: 'System Architecture Diagrams',
      category: 'ARCHITECTURE',
      icon: Layers,
      description: 'Detailed component diagrams, data flow charts, n8n workflow blueprints, and container topology specs.',
      link: '#',
      badge: 'DIAGRAMS'
    },
    {
      title: 'Database DDL & Star Schema ERD',
      category: 'DATA WAREHOUSE',
      icon: Database,
      description: 'Complete PostgreSQL Star Schema database DDL scripts, ERD entity relationship diagrams, and index definitions.',
      link: '#',
      badge: 'SQL / ERD'
    },
    {
      title: 'Interactive Web Dashboard',
      category: 'FRONTEND PLATFORM',
      icon: LayoutDashboard,
      description: 'Production-ready React & TypeScript decision support platform with regional heatmaps and real-time skill filters.',
      link: '#',
      badge: 'LIVE WEB UI'
    },
    {
      title: 'FastAPI & REST API Specs',
      category: 'BACKEND SERVICES',
      icon: Server,
      description: 'Standardized OpenAPI / Swagger specifications and RESTful JSON endpoints serving analytical metrics.',
      link: '#',
      badge: 'REST ENDPOINTS'
    },
    {
      title: 'Python Scraper Suite',
      category: 'DATA SCRAPING',
      icon: Code2,
      description: 'Modular Python extraction scripts supporting ANAPEC, ReKrute, Emploi.ma, DreamJob, Novojob, and RSS feeds.',
      link: '#',
      badge: 'PYTHON 3.11'
    },
    {
      title: 'Jury Presentation Deck',
      category: 'DEFENSE MATERIALS',
      icon: Presentation,
      description: 'Academic evaluation slide deck presented to the Simplon Maghreb × CCFBS Final Data Analyst jury.',
      link: '#',
      badge: 'PRESENTATION'
    },
    {
      title: 'Final Academic Report',
      category: 'CAPSTONE PROJECT',
      icon: Award,
      description: 'Official capstone thesis report detailing business impact, labor market findings, and methodological conclusions.',
      link: '#',
      badge: 'FINAL REPORT'
    }
  ];

  return (
    <section id="deliverables-timeline" className="bg-[#F4F5F7] text-[#1A202C] py-20 px-6 md:px-12 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
          <div className="space-y-3 max-w-2xl">
            <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
              PROJECT MILESTONES & ARTIFACTS
            </span>
            <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#3B388E] tracking-tight">
              Deliverables & Roadmap
            </h2>
            <p className="font-sans-body text-gray-600 text-sm sm:text-base leading-relaxed">
              Complete engineering artifacts, source code repositories, technical documentation, and project timeline by Zakaria Bahtani.
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center gap-2 bg-white p-1.5 border border-[#E2E8F0] rounded-xl shadow-xs">
            <button
              onClick={() => setActiveTab('deliverables')}
              className={`px-4 py-2 text-xs font-sans-body font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'deliverables'
                  ? 'bg-[#3B388E] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#3B388E]'
              }`}
            >
              Project Deliverables ({deliverables.length})
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 text-xs font-sans-body font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-[#3B388E] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#3B388E]'
              }`}
            >
              Project Timeline (7 Phases)
            </button>
          </div>
        </div>

        {/* Deliverables Tab */}
        {activeTab === 'deliverables' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-[#FCE4E8] text-[#E6004D] rounded-xl group-hover:bg-[#E6004D] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono-code text-[10px] text-[#3B388E] font-bold uppercase bg-[#F4F5F7] px-2 py-0.5 rounded border border-[#E2E8F0]">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <span className="font-sans-body text-[10px] font-bold uppercase text-gray-400 block">{item.category}</span>
                      <h4 className="font-space font-extrabold text-base text-[#3B388E] uppercase tracking-tight mt-0.5">
                        {item.title}
                      </h4>
                      <p className="font-sans-body text-xs text-gray-600 leading-relaxed pt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0]">
                    <a
                      href={item.link}
                      target={item.link.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-sans-body font-bold text-[#E6004D] hover:text-[#C00F2F] uppercase transition-colors"
                    >
                      <span>INSPECT ARTIFACT</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="relative space-y-6 before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-[#E2E8F0]">
            {timelineMilestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-center justify-between gap-6 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-full sm:w-[46%] bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-code font-bold text-xs bg-[#FCE4E8] text-[#E6004D] px-2.5 py-1 rounded-full border border-[#E6004D]/30">
                        PHASE {milestone.phase}
                      </span>
                      <span className="font-mono-code text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {milestone.status}
                      </span>
                    </div>

                    <h4 className="font-space font-extrabold text-lg text-[#3B388E] uppercase tracking-tight">
                      {milestone.title}
                    </h4>

                    <p className="font-sans-body text-xs text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>

                    <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between font-mono-code text-[11px] text-gray-400">
                      <span className="flex items-center gap-1 font-bold">
                        <Calendar className="w-3.5 h-3.5 text-[#E6004D]" />
                        {milestone.date}
                      </span>
                      <span>COMPLETED</span>
                    </div>
                  </div>

                  {/* Circle Center Marker */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#3B388E] flex items-center justify-center shadow-xs z-10">
                    <CheckCircle2 className="w-4 h-4 text-[#E6004D]" />
                  </div>

                  <div className="w-full sm:w-[46%]" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
