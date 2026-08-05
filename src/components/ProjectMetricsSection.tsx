import React from 'react';
import { Database, Activity, RefreshCw, BarChart2, Layers, CheckCircle2 } from 'lucide-react';
import BorderGlow from './BorderGlow';

export const ProjectMetricsSection: React.FC = () => {
  const metrics = [
    {
      value: '24,500+',
      label: 'Job Offers Scraped',
      subtext: 'Across ANAPEC, ReKrute, Emploi.ma, DreamJob, Novojob',
      icon: Database,
      highlightColor: 'text-[#E6004D]',
      bgColor: 'bg-[#FCE4E8]'
    },
    {
      value: '7',
      label: 'Recruitment Sources',
      subtext: 'Integrated employment portals & Google News RSS feeds',
      icon: Layers,
      highlightColor: 'text-[#3B388E]',
      bgColor: 'bg-[#F4F5F7]'
    },
    {
      value: '95%',
      label: 'Data Quality Score',
      subtext: 'Verified by automated cleaning & deduplication algorithms',
      icon: CheckCircle2,
      highlightColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      value: '3 sec',
      label: 'Dashboard Refresh',
      subtext: 'Sub-second OLAP query indexing & cached REST APIs',
      icon: RefreshCw,
      highlightColor: 'text-[#E6004D]',
      bgColor: 'bg-[#FCE4E8]'
    },
    {
      value: '10+',
      label: 'Database Tables',
      subtext: 'Star Schema Data Warehouse (Fact_Jobs & Dimension tables)',
      icon: Activity,
      highlightColor: 'text-[#3B388E]',
      bgColor: 'bg-[#F4F5F7]'
    },
    {
      value: '25+',
      label: 'Analytics KPIs',
      subtext: 'Regional heatmaps, salary distributions, & skill matrices',
      icon: BarChart2,
      highlightColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <section id="project-metrics-section" className="bg-[#F4F5F7] text-[#1A202C] py-16 px-6 md:px-12 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="font-sans-body text-xs uppercase tracking-widest text-[#E6004D] font-bold block">
              PLATFORM PERFORMANCE // REAL-TIME BENCHMARKS
            </span>
            <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-[#3B388E] tracking-tight">
              Project Metrics & Capacity
            </h2>
          </div>
          <p className="font-sans-body text-xs sm:text-sm text-gray-500 max-w-md">
            Operational metrics backing the Morocco Employment Intelligence Platform infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <BorderGlow
                key={idx}
                backgroundColor="#ffffff"
                borderRadius={16}
                glowColor="345 100 45"
                glowRadius={25}
                glowIntensity={0.8}
                edgeSensitivity={25}
                coneSpread={30}
                colors={['#E6004D', '#3B388E', '#FCE4E8']}
                className="h-full border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="p-5 flex flex-col justify-between space-y-4 h-full">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${item.bgColor} transition-transform group-hover:scale-110`}>
                      <Icon className={`w-5 h-5 ${item.highlightColor}`} />
                    </div>
                    <span className="font-mono-code text-[10px] text-gray-400 font-bold uppercase">KPI 0{idx + 1}</span>
                  </div>

                  <div>
                    <div className="font-space font-extrabold text-2xl sm:text-3xl text-[#3B388E] tracking-tight">
                      {item.value}
                    </div>
                    <h4 className="font-sans-body font-bold text-xs text-[#1A202C] mt-1 uppercase">
                      {item.label}
                    </h4>
                    <p className="font-sans-body text-[11px] text-gray-500 mt-1 leading-snug line-clamp-2">
                      {item.subtext}
                    </p>
                  </div>
                </div>
              </BorderGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
};
