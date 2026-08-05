import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

export interface KpiCardData {
  id: string;
  title: string;
  value: string;
  numericVal: number;
  change: string;
  isPositive: boolean;
  subtext: string;
  icon: React.ElementType;
  sparklineData: { v: number }[];
  statusColor: string;
  color: string;
}

interface KpiCardsSectionProps {
  isLoading: boolean;
  isDarkMode: boolean;
  kpis: KpiCardData[];
}

const SkeletonCard: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div
    className={`p-5 rounded-2xl border animate-pulse ${
      isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E2E8F0]'
    }`}
  >
    <div className="flex items-center justify-between">
      <div className={`h-4 w-28 rounded ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'}`} />
      <div className={`h-2.5 w-2.5 rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'}`} />
    </div>
    <div className="mt-4 flex items-baseline justify-between">
      <div className={`h-8 w-24 rounded ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'}`} />
      <div className={`h-5 w-14 rounded ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'}`} />
    </div>
    <div className={`mt-2 h-3 w-36 rounded ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'}`} />
    <div className={`mt-4 h-10 w-full rounded ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'}`} />
  </div>
);

export const KpiCardsSection: React.FC<KpiCardsSectionProps> = ({
  isLoading,
  isDarkMode,
  kpis
}) => {
  return (
    <div id="executive-kpis" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {isLoading
        ? Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} isDarkMode={isDarkMode} />
          ))
        : kpis.map((kpi) => {
            const IconComp = kpi.icon;
            return (
              <div
                key={kpi.id}
                className={`p-5 rounded-2xl border transition-all duration-200 hover:shadow-md ${
                  isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E2E8F0] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs uppercase font-bold text-gray-500 dark:text-zinc-400 tracking-wider flex items-center gap-1.5">
                    <IconComp className="w-3.5 h-3.5 text-[#E6004D]" />
                    {kpi.title}
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${kpi.statusColor}`} />
                </div>

                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <span className="font-space font-extrabold text-2xl md:text-3xl text-[#0F172A] dark:text-zinc-100 tracking-tight">
                    {kpi.value}
                  </span>
                  <span className="inline-flex items-center gap-0.5 font-mono-code text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    <ArrowUpRight className="w-3 h-3" />
                    {kpi.change}
                  </span>
                </div>

                <p className="text-[11px] font-sans-body text-gray-500 dark:text-zinc-400 mt-1">
                  {kpi.subtext}
                </p>

                {/* Sparkline Mini Chart */}
                <div className="h-10 mt-3 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={kpi.sparklineData}>
                      <defs>
                        <linearGradient id={`sparkGrad-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={kpi.color} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={kpi.color} stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={kpi.color}
                        strokeWidth={2}
                        fill={`url(#sparkGrad-${kpi.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
    </div>
  );
};
