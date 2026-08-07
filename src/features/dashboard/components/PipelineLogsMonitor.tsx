import React, { useState } from 'react';
import { Database, Cpu, AlertTriangle } from 'lucide-react';
import { ScraperStateItem, DeadLetterItem } from '../../../lib/supabaseService';

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
  scraperState?: ScraperStateItem[];
  deadLetterLogs?: DeadLetterItem[];
}

export const PipelineLogsMonitor: React.FC<PipelineLogsMonitorProps> = ({
  isLoading,
  isDarkMode,
  pipelineLogs = [],
  scraperState = [],
  deadLetterLogs = []
}) => {
  const [activeTab, setActiveTab] = useState<'logs' | 'scraper' | 'dlq'>('logs');

  return (
    <div id="pipeline-monitor" className={`p-6 rounded-2xl border shadow-xs space-y-4 ${
      isDarkMode ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E2E8F0]'
    }`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#27272A] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-[#2563EB]/10 text-[#2563EB] dark:text-blue-400 rounded-lg">
            <Database className="w-4 h-4" />
          </span>
          <h3 className="font-space font-extrabold text-base text-[#0F172A] dark:text-zinc-100 uppercase tracking-tight">
            Pipeline Health & Data Telemetry
          </h3>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 dark:bg-zinc-800/80">
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono-code font-bold transition-colors cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-white dark:bg-zinc-700 text-[#E6004D] shadow-2xs'
                : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Logs ({pipelineLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('scraper')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono-code font-bold transition-colors cursor-pointer ${
              activeTab === 'scraper'
                ? 'bg-white dark:bg-zinc-700 text-[#2563EB] shadow-2xs'
                : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Scraper State ({scraperState.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('dlq')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono-code font-bold transition-colors cursor-pointer ${
              activeTab === 'dlq'
                ? 'bg-white dark:bg-zinc-700 text-rose-500 shadow-2xs'
                : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>DLQ ({deadLetterLogs.length})</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`h-24 rounded-xl animate-pulse ${isDarkMode ? 'bg-zinc-800/40' : 'bg-gray-100'}`} />
          ))}
        </div>
      ) : activeTab === 'logs' ? (
        pipelineLogs.length > 0 ? (
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
        )
      ) : activeTab === 'scraper' ? (
        scraperState.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scraperState.map((state) => (
              <div
                key={state.source}
                className={`p-4 rounded-xl border space-y-2 ${
                  isDarkMode ? 'bg-[#27272A]/70 border-[#3F3F46]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-space font-bold text-xs truncate uppercase text-[#2563EB]">
                    {state.source}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                    state.status === 'RUNNING' || state.status === 'ACTIVE'
                      ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 animate-pulse'
                      : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                  }`}>
                    {state.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono-code text-[11px]">
                  <div>
                    <span className="text-gray-400 dark:text-zinc-500 block text-[10px]">Page</span>
                    <span className="font-bold text-[#0F172A] dark:text-zinc-100">{state.current_page} / {state.max_pages}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 dark:text-zinc-500 block text-[10px]">Total Scraped</span>
                    <span className="font-bold text-[#E6004D]">{state.total_jobs_scraped || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center border border-dashed rounded-xl border-gray-300 dark:border-zinc-800">
            <Cpu className="w-8 h-8 text-gray-400 dark:text-zinc-600 mx-auto mb-2" />
            <p className="text-xs text-gray-500 dark:text-zinc-500">
              No crawler state found in <code className="font-mono text-[#2563EB]">scraper_state</code> table.
            </p>
          </div>
        )
      ) : (
        deadLetterLogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deadLetterLogs.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border space-y-2 ${
                  isDarkMode ? 'bg-[#27272A]/70 border-[#3F3F46]' : 'bg-[#F8F9FC] border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-space font-bold text-xs truncate uppercase text-rose-500">
                    {item.source}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300">
                    Page #{item.page_number}
                  </span>
                </div>

                <p className="text-[11px] font-mono-code text-rose-600 dark:text-rose-400 line-clamp-2">
                  {item.error_message || 'Ingestion failure recorded'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center border border-dashed rounded-xl border-gray-300 dark:border-zinc-800">
            <AlertTriangle className="w-8 h-8 text-gray-400 dark:text-zinc-600 mx-auto mb-2" />
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              0 unhandled failures in <code className="font-mono text-rose-500">dead_letter_queue</code> table. Pipeline healthy!
            </p>
          </div>
        )
      )}
    </div>
  );
};

