import React, { useState } from 'react';
import { Cpu, TrendingUp, Code, Database, Cloud, Globe, Filter } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { SkillItem, SkillCategoryDistribution } from '../../../lib/supabaseService';

interface SkillsIntelligenceDashboardProps {
  isLoading: boolean;
  isDarkMode: boolean;
  skillsList?: SkillItem[];
  skillsCategoryDistribution?: SkillCategoryDistribution[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Tech: '#E6004D',
  technical: '#E6004D',
  framework: '#E6004D',
  tool: '#E6004D',
  Cloud: '#2563EB',
  cloud: '#2563EB',
  cloud_platforms: '#2563EB',
  Data: '#8B5CF6',
  data: '#8B5CF6',
  database: '#8B5CF6',
  Management: '#10B981',
  management: '#10B981',
  soft: '#10B981',
  Language: '#F59E0B',
  language: '#F59E0B'
};

const isCategoryMatch = (skillCategory: string, selectedTab: string): boolean => {
  if (!selectedTab || selectedTab.toUpperCase() === 'ALL') return true;

  const catLower = (skillCategory || '').toLowerCase();
  const tabLower = selectedTab.toLowerCase();

  if (tabLower === 'tech') {
    return ['tech', 'technical', 'framework', 'tool'].some(c => catLower.includes(c));
  }
  if (tabLower === 'cloud') {
    return ['cloud', 'cloud_platforms', 'devops', 'infrastructure'].some(c => catLower.includes(c));
  }
  if (tabLower === 'data') {
    return ['data', 'database', 'analytics'].some(c => catLower.includes(c));
  }
  if (tabLower === 'management') {
    return ['management', 'soft', 'leadership', 'agile'].some(c => catLower.includes(c));
  }
  if (tabLower === 'language') {
    return ['language', 'lang'].some(c => catLower.includes(c));
  }

  return catLower.includes(tabLower);
};

export const SkillsIntelligenceDashboard: React.FC<SkillsIntelligenceDashboardProps> = ({
  isLoading,
  isDarkMode,
  skillsList = [],
  skillsCategoryDistribution = []
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredSkills = React.useMemo(() => {
    return skillsList.filter(s => isCategoryMatch(s.category, selectedCategory));
  }, [skillsList, selectedCategory]);

  return (
    <div id="skills-intelligence" className={`p-6 rounded-2xl border shadow-xs space-y-6 ${
      isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E2E8F0]'
    }`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-[#27272A] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-xl">
            <Cpu className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-space font-extrabold text-lg text-[#0F172A] dark:text-zinc-100 uppercase tracking-tight flex items-center gap-2">
              Skills Intelligence & Capability Demand
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20">
                NLP Extracted Feature Store
              </span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-sans-body">
              Real-time technology stack demand, soft skills, and competency distribution
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 dark:bg-zinc-800/80">
          {['All', 'Tech', 'Cloud', 'Data', 'Management', 'Language'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-zinc-700 text-[#8B5CF6] shadow-2xs'
                  : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Charts & Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Skills Demand Bar Chart */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-space font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-2">
              <Code className="w-4 h-4 text-[#8B5CF6]" />
              Top Requested Technical & Soft Competencies
            </h4>
            <span className="font-mono-code text-[11px] font-bold text-[#8B5CF6]">
              {filteredSkills.length} Competencies Ranked
            </span>
          </div>

          {isLoading ? (
            <div className="h-72 rounded-xl animate-pulse bg-gray-100 dark:bg-zinc-800/40" />
          ) : filteredSkills.length > 0 ? (
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredSkills.slice(0, 10)} margin={{ left: 10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#27272A' : '#E2E8F0'} />
                  <XAxis dataKey="name" stroke={isDarkMode ? '#A1A1AA' : '#64748B'} fontSize={10} />
                  <YAxis stroke={isDarkMode ? '#A1A1AA' : '#64748B'} fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#18181B' : '#FFFFFF',
                      borderColor: isDarkMode ? '#27272A' : '#E2E8F0',
                      color: isDarkMode ? '#F4F4F5' : '#0F172A',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="count" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center border border-dashed rounded-xl border-gray-300 dark:border-zinc-800">
              <Cpu className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-xs text-gray-500">No skills parsed matching category <code className="font-mono text-[#8B5CF6]">{selectedCategory}</code></p>
            </div>
          )}
        </div>

        {/* Skill Category Donut Distribution */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-space font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#2563EB]" />
              Skill Domain Breakdown
            </h4>
          </div>

          <div className="h-64 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillsCategoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {skillsCategoryDistribution.map((entry) => (
                    <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] || '#2563EB'} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#18181B' : '#FFFFFF',
                    borderColor: isDarkMode ? '#27272A' : '#E2E8F0',
                    color: isDarkMode ? '#F4F4F5' : '#0F172A',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-mono-code font-extrabold text-lg text-[#0F172A] dark:text-zinc-100">
                {skillsCategoryDistribution.reduce((a, b) => a + b.count, 0)}
              </span>
              <span className="text-[10px] font-mono-code text-gray-400 uppercase">Total Hits</span>
            </div>
          </div>

          {/* Category Legend Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {skillsCategoryDistribution.map(cat => (
              <div key={cat.category} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-[#27272A] text-xs font-mono-code">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cat.category] || '#2563EB' }} />
                <span>{cat.category}:</span>
                <span className="font-bold">{cat.share}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Skill Frequency & Benchmark Table */}
      <div className="space-y-3 pt-4 border-t border-[#E2E8F0] dark:border-[#27272A]">
        <h4 className="font-space font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400">
          Skill Frequency & Benchmark Table
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.slice(0, 8).map((sk, idx) => (
            <div
              key={sk.name}
              className={`p-4 rounded-xl border space-y-2 transition-all hover:border-[#8B5CF6] ${
                isDarkMode ? 'bg-[#27272A]/50 border-[#3F3F46]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-space font-extrabold text-sm text-[#0F172A] dark:text-zinc-100 truncate">
                  {sk.name}
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold text-white"
                  style={{ backgroundColor: CATEGORY_COLORS[sk.category] || '#8B5CF6' }}
                >
                  {sk.category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
                <div>
                  <span className="text-gray-400 text-[10px] block">Demand Frequency</span>
                  <span className="font-bold text-[#E6004D]">{sk.count} Jobs ({sk.percentage}%)</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block">Growth Rate</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{sk.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
