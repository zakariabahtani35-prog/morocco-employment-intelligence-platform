import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Database, 
  BarChart2, 
  Sparkles, 
  Settings, 
  Bell, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Filter, 
  FileCheck, 
  RefreshCw 
} from 'lucide-react';

export const SystemModulesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'modules' | 'quality'>('modules');

  const modules = [
    {
      title: 'Authentication & RLS',
      category: 'SECURITY MODULE',
      description: 'Row Level Security (RLS) guards regulating access to private data queries, administrative triggers, and academic export pipelines.',
      icon: ShieldCheck,
      status: 'PROTECTED',
      badge: 'AUTH'
    },
    {
      title: 'Dataset Manager',
      category: 'ETL DATA MODULE',
      description: 'Raw listing staging area, manual scraper triggers, automated payload inspection, and metadata schema validation.',
      icon: Database,
      status: 'ACTIVE',
      badge: 'STAGING'
    },
    {
      title: 'Analytics Dashboard',
      category: 'DECISION SUPPORT',
      description: 'Interactive visualizer rendering Moroccan regional hiring maps, top tech skill matrices, and salary percentile metrics.',
      icon: BarChart2,
      status: 'LIVE',
      badge: 'FRONTEND'
    },
    {
      title: 'AI Recommendation Engine',
      category: 'INTELLIGENCE MODULE',
      description: 'Automated LLM assistant generating executive briefs, skill mismatch alerts, and labor market policy recommendations.',
      icon: Sparkles,
      status: 'ACTIVE',
      badge: 'AI ENGINE'
    },
    {
      title: 'System Administration',
      category: 'CONTROL PANEL',
      description: 'Pipeline cron management, proxy health status monitor, portal connector status, and manual ETL override controls.',
      icon: Settings,
      status: 'OPERATIONAL',
      badge: 'ADMIN'
    },
    {
      title: 'Real-Time Notifications',
      category: 'ALERTING SYSTEM',
      description: 'Automated webhook triggers notifying stakeholders of daily extraction completions, scrapers errors, or anomaly spikes.',
      icon: Bell,
      status: 'ENABLED',
      badge: 'ALERTS'
    },
    {
      title: 'System Monitoring & Telemetry',
      category: 'HEALTH ENGINE',
      description: 'Prometheus query performance logs, database connection pooling stats, and scraping node availability tracking.',
      icon: Activity,
      status: 'HEALTHY',
      badge: 'METRICS'
    }
  ];

  const qualityControls = [
    {
      title: 'Missing Values Imputation',
      description: 'Automated handling of missing salary fields, unmapped locations, and implicit contract types using statistical inference.',
      icon: Filter,
      rule: 'Pandas fillna & mode imputation algorithms'
    },
    {
      title: 'Duplicate Detection Engine',
      description: 'Cross-portal duplicate identification merging identical job postings scraped from multiple portals simultaneously.',
      icon: FileCheck,
      rule: 'Fuzzy string matching & payload hashing'
    },
    {
      title: 'Data Validation Rules',
      description: 'Strict schema enforcement rejecting corrupted HTML payloads, invalid dates, or malformed job descriptions.',
      icon: CheckCircle2,
      rule: 'Pydantic models & SQL constraint checks'
    },
    {
      title: 'Taxonomy Normalization',
      description: 'Standardizing raw job titles and skill variations (e.g., "JS Developer" → "Frontend Engineer") to Moroccan standards.',
      icon: RefreshCw,
      rule: 'Moroccan Tech Skill Mapping Taxonomy'
    },
    {
      title: 'Continuous Monitoring',
      description: 'Real-time uptime checks on web scraping endpoints to detect portal DOM layout updates or blocking immediately.',
      icon: Activity,
      rule: 'Automated 6-hour health check probes'
    },
    {
      title: 'Error Logging & Audit Audit',
      description: 'Comprehensive audit trails capturing failed HTTP requests, database transaction rollbacks, and ETL pipeline exceptions.',
      icon: AlertTriangle,
      rule: 'Structured JSON exception logging'
    }
  ];

  return (
    <section id="system-modules-quality" className="bg-[#F4F5F7] text-[#1A202C] py-20 px-6 md:px-12 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
          <div className="space-y-3 max-w-2xl">
            <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
              SYSTEM CAPABILITIES & DATA GOVERNANCE
            </span>
            <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#3B388E] tracking-tight">
              Platform Modules & Data Quality
            </h2>
            <p className="font-sans-body text-gray-600 text-sm sm:text-base leading-relaxed">
              Enterprise modular architecture combined with strict data quality engineering to ensure reliable labor market intelligence.
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center gap-2 bg-white p-1.5 border border-[#E2E8F0] rounded-xl shadow-xs">
            <button
              onClick={() => setActiveTab('modules')}
              className={`px-4 py-2 text-xs font-sans-body font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'modules'
                  ? 'bg-[#3B388E] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#3B388E]'
              }`}
            >
              System Modules ({modules.length})
            </button>
            <button
              onClick={() => setActiveTab('quality')}
              className={`px-4 py-2 text-xs font-sans-body font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'quality'
                  ? 'bg-[#3B388E] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#3B388E]'
              }`}
            >
              Data Quality Engine ({qualityControls.length})
            </button>
          </div>
        </div>

        {/* Modules Tab Grid */}
        {activeTab === 'modules' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-[#FCE4E8] text-[#E6004D] rounded-xl group-hover:bg-[#E6004D] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono-code text-[10px] text-emerald-600 font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {mod.status}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-sans-body text-[10px] font-bold uppercase text-gray-400 block">{mod.category}</span>
                    <h4 className="font-space font-extrabold text-lg text-[#3B388E] uppercase tracking-tight">
                      {mod.title}
                    </h4>
                    <p className="font-sans-body text-xs text-gray-600 leading-relaxed pt-1">
                      {mod.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Data Quality Tab Grid */}
        {activeTab === 'quality' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualityControls.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#F4F5F7] border border-[#E2E8F0] text-[#3B388E] rounded-xl">
                      <Icon className="w-5 h-5 text-[#E6004D]" />
                    </div>
                    <div>
                      <span className="font-mono-code text-[10px] text-gray-400 font-bold uppercase">RULE 0{idx + 1}</span>
                      <h4 className="font-space font-extrabold text-base text-[#3B388E] uppercase tracking-tight">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <p className="font-sans-body text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between font-mono-code text-[11px]">
                    <span className="text-gray-400 uppercase font-semibold">METHOD:</span>
                    <span className="font-bold text-[#3B388E] truncate max-w-[200px]">{item.rule}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
