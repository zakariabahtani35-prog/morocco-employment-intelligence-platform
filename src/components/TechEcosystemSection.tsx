import React, { useState } from 'react';
import { 
  Code2, 
  Database, 
  Terminal, 
  Server, 
  Cpu, 
  GitBranch, 
  Layers, 
  ShieldCheck, 
  Cloud, 
  HardDrive, 
  Activity, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import BorderGlow from './BorderGlow';

export const TechEcosystemSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stack' | 'deployment'>('stack');

  const stackItems = [
    {
      name: 'React',
      category: 'Frontend UI',
      version: 'v18.3',
      description: 'Component-driven interactive dashboard framework powering fast state updates and responsive layouts.',
      icon: Code2,
      badge: 'CLIENT SIDE',
      status: 'Operational',
      statusType: 'emerald'
    },
    {
      name: 'TypeScript',
      category: 'Type Safety',
      version: 'v5.5',
      description: 'Strict static typing across frontend interfaces, API responses, and database payload schemas.',
      icon: Terminal,
      badge: 'LANGUAGE',
      status: 'Active',
      statusType: 'emerald'
    },
    {
      name: 'Python',
      category: 'ETL Engine',
      version: 'v3.11',
      description: 'Core web scrapers, HTML parsers, Pandas data transformation, and text normalization scripts.',
      icon: Cpu,
      badge: 'BACKEND ETL',
      status: 'Syncing',
      statusType: 'blue'
    },
    {
      name: 'Supabase',
      category: 'Cloud DB',
      version: 'PostgreSQL 15',
      description: 'Cloud hosted database platform with built-in connection pooling, instant APIs, and daily backups.',
      icon: Cloud,
      badge: 'DATABASE',
      status: 'Operational',
      statusType: 'emerald'
    },
    {
      name: 'PostgreSQL',
      category: 'Warehouse',
      version: 'OLAP Engine',
      description: 'Relational database engine hosting the MEIP Star Schema Data Warehouse with Fact and Dimension tables.',
      icon: Database,
      badge: 'STORAGE',
      status: 'Healthy',
      statusType: 'emerald'
    },
    {
      name: 'FastAPI',
      category: 'REST Backend',
      version: 'v0.110',
      description: 'High-speed Python REST API microservices serving analytical endpoints and cached aggregated metrics.',
      icon: Server,
      badge: 'API LAYER',
      status: 'Live (99ms)',
      statusType: 'emerald'
    },
    {
      name: 'Docker',
      category: 'Containerization',
      version: 'v26.0',
      description: 'Containerized deployment environments ensuring reproducible runtime environments for scrapers and APIs.',
      icon: HardDrive,
      badge: 'DEVOPS',
      status: 'Active',
      statusType: 'emerald'
    },
    {
      name: 'GitHub',
      category: 'Version Control',
      version: 'Actions CI/CD',
      description: 'Centralized codebase repository, workflow automation, SQL migrations, and academic defense docs.',
      icon: GitBranch,
      badge: 'SOURCE CODE',
      status: 'Syncing',
      statusType: 'blue'
    },
    {
      name: 'n8n',
      category: 'Workflow Automation',
      version: 'Self-Hosted',
      description: 'Visual workflow engine orchestrating scheduled extraction triggers, data validation, and alert routing.',
      icon: Layers,
      badge: 'ORCHESTRATION',
      status: 'Active',
      statusType: 'purple'
    },
    {
      name: 'REST API',
      category: 'Data Interoperability',
      version: 'JSON / HTTP',
      description: 'Standardized RESTful interface enabling third-party academic, governmental, or corporate data access.',
      icon: Activity,
      badge: 'INTEGRATION',
      status: 'Live',
      statusType: 'emerald'
    }
  ];

  const deploymentTiers = [
    {
      step: '01',
      layer: 'Frontend Layer',
      tech: 'React 18 + TypeScript + Tailwind CSS',
      description: 'Hosted on Cloud Run Edge CDN with instant global caching and responsive UI rendering.',
      details: ['Single-Page Application (SPA)', 'Static Type Safety', 'Responsive Executive Layouts'],
      status: 'Operational (CDN)',
      statusType: 'emerald'
    },
    {
      step: '02',
      layer: 'Backend API Layer',
      tech: 'FastAPI Microservices / Node.js Proxy',
      description: 'RESTful API gateway handling request validation, caching, and database query proxying.',
      details: ['Sub-100ms Query Execution', 'CORS & Token Security', 'Auto OpenAPI Documentation'],
      status: 'Active (Gateway)',
      statusType: 'emerald'
    },
    {
      step: '03',
      layer: 'Database Layer',
      tech: 'Supabase Managed PostgreSQL OLAP',
      description: 'High-availability relational database cluster executing Star Schema analytics queries.',
      details: ['Fact_Jobs & Dimension Tables', 'Connection Pooling', 'Automated Daily Snapshots'],
      status: 'Healthy (Primary)',
      statusType: 'emerald'
    },
    {
      step: '04',
      layer: 'Storage & ETL Layer',
      tech: 'Python 3.11 + Pandas + n8n Pipelines',
      description: 'Scheduled cron jobs extracting, cleaning, and staging raw recruitment data continuously.',
      details: ['Automated Deduplication Engine', 'Moroccan Skill Taxonomy Alignment', 'Fuzzy Company Normalization'],
      status: 'Syncing (Cron ETL)',
      statusType: 'blue'
    },
    {
      step: '05',
      layer: 'Monitoring & Logs',
      tech: 'Docker Containers + Error Audit Logs',
      description: 'Real-time pipeline health checks, automated error alerts, and query performance metrics.',
      details: ['99.9% Uptime Guarantee', 'Automated Scraping Fallbacks', 'System Health Telemetry'],
      status: 'Live (99.9% Uptime)',
      statusType: 'purple'
    }
  ];

  return (
    <section id="tech-ecosystem" className="bg-[#F4F5F7] text-[#1A202C] py-20 px-6 md:px-12 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
          <div className="space-y-3 max-w-2xl">
            <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
              ENTERPRISE TECH STACK // ARCHITECTURE
            </span>
            <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#3B388E] tracking-tight">
              Technology Ecosystem
            </h2>
            <p className="font-sans-body text-gray-600 text-sm sm:text-base leading-relaxed">
              Modern data engineering and web technology stack powering MEIP's extraction, data warehouse, and decision support UI.
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex items-center gap-2 bg-white p-1.5 border border-[#E2E8F0] rounded-xl shadow-xs">
            <button
              onClick={() => setActiveTab('stack')}
              className={`px-4 py-2 text-xs font-sans-body font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'stack'
                  ? 'bg-[#3B388E] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#3B388E]'
              }`}
            >
              Tech Stack ({stackItems.length})
            </button>
            <button
              onClick={() => setActiveTab('deployment')}
              className={`px-4 py-2 text-xs font-sans-body font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'deployment'
                  ? 'bg-[#3B388E] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#3B388E]'
              }`}
            >
              Deployment Tiers (5)
            </button>
          </div>
        </div>

        {/* Tab 1: Stack Grid */}
        {activeTab === 'stack' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stackItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <BorderGlow
                  key={idx}
                  backgroundColor="#ffffff"
                  borderRadius={16}
                  glowColor="345 100 45"
                  glowRadius={30}
                  glowIntensity={0.8}
                  edgeSensitivity={25}
                  coneSpread={25}
                  colors={['#E6004D', '#3B388E', '#FCE4E8']}
                  className="h-full border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="p-6 flex flex-col justify-between space-y-4 h-full">
                    <div className="flex items-start justify-between gap-2">
                      <div className="p-3 bg-[#F4F5F7] border border-[#E2E8F0] text-[#3B388E] rounded-xl group-hover:bg-[#E6004D] group-hover:text-white group-hover:border-[#E6004D] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="font-mono-code text-[10px] text-gray-400 font-bold uppercase bg-[#F4F5F7] px-2 py-0.5 rounded border border-[#E2E8F0]">
                          {item.badge}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono-code font-bold uppercase ${
                          item.statusType === 'blue'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : item.statusType === 'purple'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                            item.statusType === 'blue'
                              ? 'bg-blue-500'
                              : item.statusType === 'purple'
                              ? 'bg-purple-500'
                              : 'bg-emerald-500'
                          }`} />
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-baseline justify-between">
                        <h4 className="font-space font-extrabold text-base text-[#3B388E] uppercase tracking-tight">
                          {item.name}
                        </h4>
                        <span className="font-mono-code text-[10px] text-gray-500 font-semibold">{item.version}</span>
                      </div>
                      <p className="font-sans-body text-xs text-gray-400 font-semibold">{item.category}</p>
                      <p className="font-sans-body text-xs text-gray-600 pt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              );
            })}
          </div>
        )}

        {/* Tab 2: Deployment Architecture Tiers */}
        {activeTab === 'deployment' && (
          <div className="space-y-4">
            {deploymentTiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-1 flex items-center gap-3">
                  <span className="font-mono-code font-extrabold text-2xl text-[#E6004D] bg-[#FCE4E8] px-3 py-1.5 rounded-xl border border-[#E6004D]/30">
                    {tier.step}
                  </span>
                </div>

                <div className="lg:col-span-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-space font-extrabold text-lg text-[#3B388E] uppercase tracking-tight">
                      {tier.layer}
                    </h4>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono-code font-bold uppercase ${
                      tier.statusType === 'blue'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : tier.statusType === 'purple'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        tier.statusType === 'blue'
                          ? 'bg-blue-500'
                          : tier.statusType === 'purple'
                          ? 'bg-purple-500'
                          : 'bg-emerald-500'
                      }`} />
                      {tier.status}
                    </span>
                  </div>
                  <p className="font-mono-code text-xs text-[#E6004D] font-bold">
                    {tier.tech}
                  </p>
                  <p className="font-sans-body text-xs text-gray-600 pt-1">
                    {tier.description}
                  </p>
                </div>

                <div className="lg:col-span-7 bg-[#F4F5F7] border border-[#E2E8F0] rounded-xl p-4">
                  <span className="font-sans-body text-[10px] font-bold uppercase text-gray-400 block mb-2">KEY CAPABILITIES</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {tier.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 font-sans-body text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
