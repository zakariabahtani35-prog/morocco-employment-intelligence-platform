import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface IndustryItem {
  industry: string;
  count: number;
}

interface JobsByIndustryChartProps {
  isLoading: boolean;
  isDarkMode: boolean;
  jobsByIndustry?: IndustryItem[];
}

const SkeletonChart: React.FC<{ isDarkMode: boolean; height?: string }> = ({ isDarkMode, height = 'h-80' }) => (
  <div className={`w-full ${height} rounded-xl animate-pulse flex flex-col justify-end p-4 gap-2 ${
    isDarkMode ? 'bg-zinc-800/40' : 'bg-gray-100'
  }`}>
    <div className="flex items-end justify-between h-full gap-3 px-2">
      {[40, 65, 30, 85, 45, 95, 70, 60].map((h, i) => (
        <div 
          key={i} 
          className={`w-full rounded-t ${isDarkMode ? 'bg-zinc-700/50' : 'bg-gray-300'}`} 
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

export const JobsByIndustryChart: React.FC<JobsByIndustryChartProps> = ({
  isLoading,
  isDarkMode,
  jobsByIndustry
}) => {
  return (
    <div className={`lg:col-span-6 p-6 rounded-2xl border shadow-xs space-y-4 ${
      isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E2E8F0]'
    }`}>
      <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#27272A] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-[#2563EB]/10 text-[#2563EB] dark:text-blue-400 rounded-lg">
            <BarChart3 className="w-4 h-4" />
          </span>
          <h3 className="font-space font-extrabold text-base text-[#0F172A] dark:text-zinc-100 uppercase tracking-tight">
            Jobs by Industry Sector
          </h3>
        </div>
        <span className="font-mono-code text-[11px] text-gray-500 font-bold uppercase">
          {jobsByIndustry?.length || 0} Sectors Active
        </span>
      </div>

      {isLoading ? (
        <SkeletonChart isDarkMode={isDarkMode} height="h-80" />
      ) : jobsByIndustry && jobsByIndustry.length > 0 ? (
        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={jobsByIndustry} margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#27272A' : '#E2E8F0'} />
              <XAxis type="number" stroke={isDarkMode ? '#A1A1AA' : '#64748B'} fontSize={10} />
              <YAxis dataKey="industry" type="category" width={110} stroke={isDarkMode ? '#A1A1AA' : '#64748B'} fontSize={10} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#18181B' : '#FFFFFF', 
                  borderColor: isDarkMode ? '#27272A' : '#E2E8F0',
                  color: isDarkMode ? '#F4F4F5' : '#0F172A',
                  borderRadius: '12px',
                  fontSize: '12px'
                }} 
              />
              <Bar dataKey="count" fill="#E6004D" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed rounded-xl border-gray-300 dark:border-zinc-800">
          <BarChart3 className="w-8 h-8 text-gray-400 dark:text-zinc-600 mb-2" />
          <p className="text-xs text-gray-500 dark:text-zinc-500">
            No sector data found in <code className="font-mono text-[#E6004D]">jobs.sector</code> column.
          </p>
        </div>
      )}
    </div>
  );
};
