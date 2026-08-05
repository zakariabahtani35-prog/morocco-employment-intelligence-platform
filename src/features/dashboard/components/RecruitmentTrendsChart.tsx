import React from 'react';
import { TrendingUp, Briefcase } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface DailyTrendItem {
  date: string;
  Jobs: number;
  Applications: number;
}

interface RecruitmentTrendsChartProps {
  isLoading: boolean;
  isDarkMode: boolean;
  dailyTrends?: DailyTrendItem[];
}

const SkeletonChart: React.FC<{ isDarkMode: boolean; height?: string }> = ({ isDarkMode, height = 'h-72' }) => (
  <div className={`w-full ${height} rounded-xl animate-pulse flex flex-col justify-end p-4 gap-2 ${
    isDarkMode ? 'bg-zinc-800/40' : 'bg-gray-100'
  }`}>
    <div className="flex items-end justify-between h-full gap-3 px-2">
      {[40, 65, 30, 85, 45, 95, 70, 60, 80, 50, 75, 90].map((h, i) => (
        <div 
          key={i} 
          className={`w-full rounded-t ${isDarkMode ? 'bg-zinc-700/50' : 'bg-gray-300'}`} 
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

export const RecruitmentTrendsChart: React.FC<RecruitmentTrendsChartProps> = ({
  isLoading,
  isDarkMode,
  dailyTrends
}) => {
  return (
    <div id="job-market" className={`p-6 rounded-2xl border shadow-xs space-y-4 ${
      isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E2E8F0]'
    }`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-[#27272A] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#E6004D]/10 text-[#E6004D] rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="font-space font-extrabold text-lg text-[#0F172A] dark:text-zinc-100 uppercase tracking-tight">
              Daily Job Collection & Harvesting Timeline
            </h3>
          </div>
          <p className="text-xs font-sans-body text-gray-500 dark:text-zinc-400 mt-0.5">
            100% live volume aggregated by day from <code className="font-mono text-[#E6004D]">jobs.created_at</code>.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono-code text-xs">
          <span className="inline-flex items-center gap-1.5 text-[#E6004D] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E6004D]" /> Daily Postings
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#2563EB] dark:text-blue-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> Application Flow
          </span>
        </div>
      </div>

      {isLoading ? (
        <SkeletonChart isDarkMode={isDarkMode} height="h-72" />
      ) : dailyTrends && dailyTrends.some(d => d.Jobs > 0) ? (
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyTrends}>
              <defs>
                <linearGradient id="jobsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E6004D" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#E6004D" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="appsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#27272A' : '#E2E8F0'} />
              <XAxis dataKey="date" stroke={isDarkMode ? '#A1A1AA' : '#64748B'} fontSize={11} />
              <YAxis stroke={isDarkMode ? '#A1A1AA' : '#64748B'} fontSize={11} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#18181B' : '#FFFFFF', 
                  borderColor: isDarkMode ? '#27272A' : '#E2E8F0',
                  color: isDarkMode ? '#F4F4F5' : '#0F172A',
                  borderRadius: '12px',
                  fontSize: '12px'
                }} 
              />
              <Area type="monotone" dataKey="Jobs" stroke="#E6004D" strokeWidth={3} fill="url(#jobsGrad)" />
              <Area type="monotone" dataKey="Applications" stroke="#2563EB" strokeWidth={2} fill="url(#appsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-48 flex flex-col items-center justify-center text-center p-6 border border-dashed rounded-xl border-gray-300 dark:border-zinc-800">
          <Briefcase className="w-8 h-8 text-gray-400 dark:text-zinc-600 mb-2" />
          <h4 className="font-space font-bold text-sm text-gray-700 dark:text-zinc-300">
            No Job Timeline Data in Supabase
          </h4>
          <p className="text-xs text-gray-500 dark:text-zinc-500 max-w-sm mt-1">
            Connect your n8n scraper or insert rows into the <code className="font-mono text-[#E6004D]">jobs</code> table to see daily collection charts in real time.
          </p>
        </div>
      )}
    </div>
  );
};
