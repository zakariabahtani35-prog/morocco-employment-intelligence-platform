import React from 'react';
import { Database } from 'lucide-react';

interface PipelineLogItem {
  id: string;
  workflow_name?: string;
  status: string;
  records_scraped?: number;
  executed_at?: string;
}

interface PipelineLogsMonitorProps {
  isLoading: boolean;
  isDarkMode: boolean;
  pipelineLogs?: PipelineLogItem[];
}

export const PipelineLogsMonitor: React.FC<PipelineLogsMonitorProps> = ({
  isLoading,
  isDarkMode,
  pipelineLogs
}) => {
  return (
    <div id="pipeline-monitor" className={`p-6 rounded-2xl border shadow-xs space-y-4 ${
      isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E2E8F0]'
    }`}>
      <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#27272A] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-[#2563EB]/10 text-[#2563EB] dark:text-blue-400 rounded-lg">
            <Database className="w-4 h-4" />
          </span>
          <h3 className="font-space font-extrabold text-base text-[#0F172A] dark:text-zinc-100 uppercase tracking-tight">
            Pipeline Logs & Sync Telemetry
          </h3>
        </div>
        <span className="font-mono-code text-[11px] text-emerald-600 dark:text-emerald-400 font-bold uppercase flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {pipelineLogs?.length || 0} Execution Logs
        </span>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`h-24 rounded-xl animate-pulse ${isDarkMode ? 'bg-zinc-800/40' : 'bg-gray-100'}`} />
          ))}
        </div>
      ) : pipelineLogs && pipelineLogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineLogs.slice(0, 8).map((log) => (
            <div
              key={log.id}
              className={`p-4 rounded-xl border space-y-2 ${
                isDarkMode ? 'bg-[#27272A]/70 border-[#3F3F46]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-space font-bold text-xs truncate max-w-[140px]">
                  {log.workflow_name || 'Scraper Sync'}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                  String(log.status).toUpperCase() === 'SUCCESS' 
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                    : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                }`}>
                  {log.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono-code text-[11px]">
                <div>
                  <span className="text-gray-400 dark:text-zinc-500 block text-[10px]">Records</span>
                  <span className="font-bold text-[#E6004D]">{log.records_scraped || 0}</span>
                </div>
                <div>
                  <span className="text-gray-400 dark:text-zinc-500 block text-[10px]">Time</span>
                  <span className="text-gray-600 dark:text-zinc-300 truncate block text-[10px]">
                    {log.executed_at ? new Date(log.executed_at).toLocaleTimeString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center border border-dashed rounded-xl border-gray-300 dark:border-zinc-800">
          <Database className="w-8 h-8 text-gray-400 dark:text-zinc-600 mx-auto mb-2" />
          <p className="text-xs text-gray-500 dark:text-zinc-500">
            No telemetry entries found in <code className="font-mono text-[#E6004D]">pipeline_logs</code> table.
          </p>
        </div>
      )}
    </div>
  );
};
