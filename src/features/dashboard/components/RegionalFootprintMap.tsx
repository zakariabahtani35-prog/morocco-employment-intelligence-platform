import React from 'react';
import { Globe, MapPin } from 'lucide-react';

interface CityItem {
  name: string;
  jobs: number;
  share: string;
  avgSalary: string;
}

interface RegionalFootprintMapProps {
  isLoading: boolean;
  isDarkMode: boolean;
  citiesData?: CityItem[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export const RegionalFootprintMap: React.FC<RegionalFootprintMapProps> = ({
  isLoading,
  isDarkMode,
  citiesData,
  selectedCity,
  setSelectedCity
}) => {
  return (
    <div id="geographic-analysis" className={`p-6 rounded-2xl border shadow-xs space-y-6 ${
      isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E2E8F0]'
    }`}>
      <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#27272A] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-[#2563EB]/10 text-[#2563EB] dark:text-blue-400 rounded-lg">
            <Globe className="w-4 h-4" />
          </span>
          <h3 className="font-space font-extrabold text-base text-[#0F172A] dark:text-zinc-100 uppercase tracking-tight">
            Morocco Regional Employment Footprint
          </h3>
        </div>
        <span className="font-mono-code text-[11px] text-gray-500 dark:text-zinc-400 font-bold uppercase">
          {citiesData?.length || 0} Cities Active
        </span>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`h-28 rounded-xl animate-pulse ${isDarkMode ? 'bg-zinc-800/40' : 'bg-gray-100'}`} />
          ))}
        </div>
      ) : citiesData && citiesData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {citiesData.map((city) => (
            <div
              key={city.name}
              onClick={() => setSelectedCity(selectedCity === city.name ? 'All' : city.name)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedCity === city.name
                  ? 'bg-[#E6004D] text-white border-[#E6004D] shadow-sm'
                  : isDarkMode
                  ? 'bg-[#27272A]/70 border-[#3F3F46] text-zinc-100 hover:border-[#E6004D]'
                  : 'bg-[#F8F9FC] border-[#E2E8F0] text-[#1A202C] hover:border-[#0F172A]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-space font-extrabold text-sm">{city.name}</span>
                <span className={`text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded ${
                  selectedCity === city.name ? 'bg-white/20 text-white' : 'bg-[#2563EB]/10 text-[#2563EB] dark:text-blue-400'
                }`}>
                  {city.share}
                </span>
              </div>

              <div className="mt-3 space-y-1 font-mono-code text-xs">
                <div className="flex justify-between">
                  <span className="opacity-80">Openings:</span>
                  <span className="font-bold">{city.jobs.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Avg Salary:</span>
                  <span>{city.avgSalary}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center border border-dashed rounded-xl border-gray-300 dark:border-zinc-800">
          <MapPin className="w-8 h-8 text-gray-400 dark:text-zinc-600 mx-auto mb-2" />
          <p className="text-xs text-gray-500 dark:text-zinc-500">
            No territorial location values detected in <code className="font-mono text-[#E6004D]">jobs.location</code>.
          </p>
        </div>
      )}
    </div>
  );
};
