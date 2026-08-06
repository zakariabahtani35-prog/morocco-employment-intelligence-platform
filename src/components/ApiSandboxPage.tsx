import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  Download, 
  Code2, 
  Database, 
  Activity, 
  Server, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Globe, 
  FileJson, 
  FileSpreadsheet, 
  Key, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  category: 'ANALYTICS' | 'SKILLS' | 'REGIONAL' | 'INTEGRATION';
  description: string;
  defaultParams: Record<string, string>;
  mockResponse: Record<string, any>;
}

const ENDPOINTS: ApiEndpoint[] = [
  {
    id: 'jobs-analytics',
    method: 'GET',
    path: '/api/v1/jobs/analytics',
    category: 'ANALYTICS',
    description: 'Fetch aggregated job postings across ANAPEC, ReKrute, Emploi.ma, DreamJob, and Novojob with salary distributions.',
    defaultParams: {
      region: 'casablanca-settat',
      limit: '50',
      portal: 'all',
      sort_by: 'date_posted_desc'
    },
    mockResponse: {
      status: "success",
      timestamp: new Date().toISOString(),
      metadata: {
        total_records_scraped: 24850,
        query_time_ms: 78,
        data_freshness: "12 minutes ago",
        source_portals: ["ANAPEC", "ReKrute", "Emploi.ma", "DreamJob", "Novojob"]
      },
      filters_applied: {
        region: "Casablanca-Settat",
        limit: 50,
        sort: "date_posted_desc"
      },
      data: [
        {
          job_id: "JOB-MA-2026-9812",
          title: "Senior Data Engineer (ETL / PostgreSQL)",
          company: "Capgemini Morocco",
          location: "Casablanca Nearshore",
          portal: "ReKrute",
          date_posted: "2026-08-02",
          salary_range_mad: "22,000 - 30,000 MAD / month",
          contract_type: "CDI",
          top_skills: ["Python", "PostgreSQL", "Pandas", "Docker", "FastAPI"]
        },
        {
          job_id: "JOB-MA-2026-9811",
          title: "Full Stack React / TypeScript Developer",
          company: "CGI Maghreb",
          location: "Casablanca Finance City",
          portal: "Emploi.ma",
          date_posted: "2026-08-02",
          salary_range_mad: "18,000 - 24,000 MAD / month",
          contract_type: "CDI",
          top_skills: ["React 18", "TypeScript", "Tailwind CSS", "REST API"]
        },
        {
          job_id: "JOB-MA-2026-9810",
          title: "Business Intelligence Analyst (SQL / Analytics)",
          company: "BMCE Bank / OMAEP",
          location: "Rabat Agdal",
          portal: "ANAPEC",
          date_posted: "2026-08-01",
          salary_range_mad: "15,000 - 20,000 MAD / month",
          contract_type: "CDI",
          top_skills: ["SQL", "Star Schema", "Financial Modeling", "Data Viz"]
        }
      ]
    }
  },
  {
    id: 'skills-demand',
    method: 'GET',
    path: '/api/v1/skills/demand-matrix',
    category: 'SKILLS',
    description: 'Query the official Moroccan ICT & Tech skill taxonomy frequency matrix and YoY demand velocity index.',
    defaultParams: {
      category: 'data_engineering',
      min_frequency: '100',
      period: '2026-Q3'
    },
    mockResponse: {
      status: "success",
      taxonomy_version: "MEIP-Morocco-v2.4",
      skill_category: "Data & Software Engineering",
      rankings: [
        { rank: 1, skill: "Python", mentions: 8420, demand_velocity: "+18.4% YoY", category: "Programming Languages" },
        { rank: 2, skill: "PostgreSQL / SQL", mentions: 7890, demand_velocity: "+22.1% YoY", category: "Database OLAP" },
        { rank: 3, skill: "React.js / TypeScript", mentions: 6540, demand_velocity: "+15.8% YoY", category: "Frontend Frameworks" },
        { rank: 4, skill: "Docker & Kubernetes", mentions: 5210, demand_velocity: "+31.2% YoY", category: "DevOps / Infrastructure" },
        { rank: 5, skill: "Tableau / Looker", mentions: 4980, demand_velocity: "+12.0% YoY", category: "Data Visualization" }
      ]
    }
  },
  {
    id: 'regions-morocco',
    method: 'GET',
    path: '/api/v1/regions/morocco-labor-index',
    category: 'REGIONAL',
    description: 'Regional employment density indices across Casablanca, Rabat, Tangier, Marrakech, Agadir, and Fez.',
    defaultParams: {
      include_coordinates: 'true',
      format: 'geojson_summary'
    },
    mockResponse: {
      status: "success",
      macro_summary: {
        national_openings_scraped: 24850,
        leading_region: "Casablanca-Settat (58.4% national volume)"
      },
      regions: [
        { region: "Casablanca-Settat", job_share_percent: 58.4, active_postings: 14512, avg_salary_mad: 19500 },
        { region: "Rabat-Salé-Kénitra", job_share_percent: 21.2, active_postings: 5268, avg_salary_mad: 17800 },
        { region: "Tanger-Tétouan-Al Hoceïma", job_share_percent: 11.5, active_postings: 2857, avg_salary_mad: 16200 },
        { region: "Marrakech-Safi", job_share_percent: 5.1, active_postings: 1267, avg_salary_mad: 14500 }
      ]
    }
  },
  {
    id: 'webhook-trigger',
    method: 'POST',
    path: '/api/v1/integrations/n8n/webhook-trigger',
    category: 'INTEGRATION',
    description: 'Trigger on-demand scraping & ETL pipeline validation job for n8n orchestrator worker nodes.',
    defaultParams: {
      action: 'scrape_incremental',
      portal_target: 'ANAPEC',
      auth_token: 'bearer_meip_live_token_2026'
    },
    mockResponse: {
      status: "queued",
      job_id: "N8N-SCRAPE-TASK-9921",
      execution_mode: "asynchronous_worker",
      estimated_duration_sec: 14,
      target_portal: "ANAPEC",
      webhook_acknowledgement: {
        code: 202,
        message: "n8n worker node accepted task payload successfully."
      }
    }
  }
];

export const ApiSandboxPage: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(ENDPOINTS[0]);
  const [params, setParams] = useState<Record<string, string>>(ENDPOINTS[0].defaultParams);
  const [activeCodeTab, setActiveCodeTab] = useState<'curl' | 'python' | 'typescript' | 'n8n'>('curl');
  const [activeTab, setActiveTab] = useState<'sandbox' | 'export' | 'webhooks'>('sandbox');
  
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<Record<string, any>>(ENDPOINTS[0].mockResponse);
  const [responseTime, setResponseTime] = useState<number>(78);
  const [isCopiedCode, setIsCopiedCode] = useState(false);
  const [isCopiedJson, setIsCopiedJson] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleEndpointSelect = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    setParams(endpoint.defaultParams);
    setResponse(endpoint.mockResponse);
  };

  const handleRunRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResponse({
        ...selectedEndpoint.mockResponse,
        timestamp: new Date().toISOString(),
        query_executed_with: params
      });
      setResponseTime(Math.floor(Math.random() * 45) + 65); // 65-110ms
    }, 400);
  };

  const getCodeSnippet = () => {
    const baseUrl = 'https://meip-api.simplon.ma';
    const queryStr = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join('&');
    const fullUrl = `${baseUrl}${selectedEndpoint.path}${queryStr ? '?' + queryStr : ''}`;

    if (activeCodeTab === 'curl') {
      return `curl -X ${selectedEndpoint.method} \\
  "${fullUrl}" \\
  -H "Accept: application/json" \\
  -H "Authorization: Bearer meip_public_token_2026"`;
    }

    if (activeCodeTab === 'python') {
      return `import requests
import pandas as pd

url = "${fullUrl}"
headers = {
    "Accept": "application/json",
    "Authorization": "Bearer meip_public_token_2026"
}

response = requests.${selectedEndpoint.method.toLowerCase()}(url, headers=headers)
data = response.json()

# Convert job payload into Pandas DataFrame
if "data" in data:
    df = pd.DataFrame(data["data"])
    print(f"Scraped {len(df)} postings directly into DataFrame!")
    print(df.head())`;
    }

    if (activeCodeTab === 'typescript') {
      return `import axios from 'axios';

interface MeipApiResponse {
  status: string;
  data: any[];
}

async function fetchMoroccoEmploymentData() {
  const url = '${fullUrl}';
  const response = await axios.${selectedEndpoint.method.toLowerCase()}<MeipApiResponse>(url, {
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer meip_public_token_2026'
    }
  });

  console.log('Fetched MEIP Data:', response.data);
  return response.data;
}`;
    }

    if (activeCodeTab === 'n8n') {
      return `{
  "nodes": [
    {
      "parameters": {
        "url": "${fullUrl}",
        "authentication": "headerAuth",
        "options": {}
      },
      "name": "MEIP Scraper API Trigger",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3
    }
  ]
}`;
    }

    return '';
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setIsCopiedCode(true);
    setTimeout(() => setIsCopiedCode(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setIsCopiedJson(true);
    setTimeout(() => setIsCopiedJson(false), 2000);
  };

  // Download Sample Dataset as Blob
  const handleDownloadDataset = (format: 'json' | 'csv' | 'sql') => {
    let content = '';
    let mimeType = '';
    let filename = '';

    if (format === 'json') {
      content = JSON.stringify(selectedEndpoint.mockResponse, null, 2);
      mimeType = 'application/json';
      filename = `MEIP_Morocco_Labor_Data_${selectedEndpoint.id}.json`;
    } else if (format === 'csv') {
      content = `Job_ID,Title,Company,Location,Portal,Date_Posted,Salary_MAD,Top_Skills\n` +
        `JOB-MA-2026-9812,Senior Data Engineer,Capgemini Morocco,Casablanca Nearshore,ReKrute,2026-08-02,22000-30000,Python;PostgreSQL;Pandas\n` +
        `JOB-MA-2026-9811,Full Stack Developer,CGI Maghreb,Casablanca Finance City,Emploi.ma,2026-08-02,18000-24000,React;TypeScript;Tailwind\n` +
        `JOB-MA-2026-9810,BI Analyst,BMCE Bank,Rabat Agdal,ANAPEC,2026-08-01,15000-20000,SQL;StarSchema;DataViz`;
      mimeType = 'text/csv';
      filename = `MEIP_Morocco_Job_Postings_Sample.csv`;
    } else if (format === 'sql') {
      content = `-- MEIP Star Schema Data Warehouse DDL Export (PostgreSQL 15)
CREATE TABLE IF NOT EXISTS fact_job_postings (
    job_id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company_id INT REFERENCES dim_companies(id),
    location_id INT REFERENCES dim_locations(id),
    portal_source VARCHAR(64),
    date_posted DATE,
    salary_min_mad NUMERIC(10,2),
    salary_max_mad NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
      mimeType = 'application/sql';
      filename = `MEIP_StarSchema_DDL_PostgreSQL.sql`;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F4F5F7] text-[#1A202C]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
        
        {/* Page Header */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#3B388E]/10 text-[#3B388E] rounded-xl">
                <Terminal className="w-5 h-5" />
              </span>
              <span className="font-mono-code text-xs uppercase font-bold text-[#3B388E] tracking-wider">
                DEVELOPER INTEGRATION PLAYGROUND & DATA EXPORT
              </span>
            </div>
            <h1 className="font-space font-extrabold text-3xl md:text-4xl text-[#3B388E] tracking-tight">
              MEIP REST API & Webhooks Engine
            </h1>
            <p className="font-sans-body text-sm text-gray-600 leading-relaxed">
              Explore live API endpoints, query the Moroccan labor market PostgreSQL warehouse, generate code snippets for Python & TypeScript, or export sanitized datasets directly into CSV / JSON format.
            </p>
          </div>

          {/* Navigation Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2 bg-[#F4F5F7] p-1.5 rounded-2xl border border-[#E2E8F0]">
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-4 py-2 rounded-xl font-sans-body font-bold text-xs uppercase transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                activeTab === 'sandbox'
                  ? 'bg-[#3B388E] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Code2 className="w-4 h-4" />
              API Sandbox
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`px-4 py-2 rounded-xl font-sans-body font-bold text-xs uppercase transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                activeTab === 'export'
                  ? 'bg-[#E6004D] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Download className="w-4 h-4" />
              Data Exporter
            </button>
            <button
              onClick={() => setActiveTab('webhooks')}
              className={`px-4 py-2 rounded-xl font-sans-body font-bold text-xs uppercase transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                activeTab === 'webhooks'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              Pipeline Health
            </button>
          </div>
        </div>

        {/* System Health Status Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="font-space font-bold text-xs text-[#3B388E] uppercase">REST API Gateway</div>
                <div className="font-mono-code text-[11px] text-gray-500">FastAPI (sub-100ms)</div>
              </div>
            </div>
            <span className="font-mono-code text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              200 OK
            </span>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="font-space font-bold text-xs text-[#3B388E] uppercase">PostgreSQL Warehouse</div>
                <div className="font-mono-code text-[11px] text-gray-500">Supabase Cloud OLAP</div>
              </div>
            </div>
            <span className="font-mono-code text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              HEALTHY
            </span>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
              <div>
                <div className="font-space font-bold text-xs text-[#3B388E] uppercase">n8n Scraper Workers</div>
                <div className="font-mono-code text-[11px] text-gray-500">5 Moroccan Portals</div>
              </div>
            </div>
            <span className="font-mono-code text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              SYNCING
            </span>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
              <div>
                <div className="font-space font-bold text-xs text-[#3B388E] uppercase">Database Sync</div>
                <div className="font-mono-code text-[11px] text-gray-500">24,850 Postings Stored</div>
              </div>
            </div>
            <span className="font-mono-code text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              AUTOMATED
            </span>
          </div>
        </div>

        {/* TAB 1: API SANDBOX */}
        {activeTab === 'sandbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Endpoint Picker & Parameters */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Endpoint Selection */}
              <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <h3 className="font-space font-bold text-base text-[#3B388E] uppercase">
                    1. Select API Endpoint
                  </h3>
                  <span className="font-mono-code text-[10px] text-gray-400 font-bold uppercase">
                    V1 REST ENDPOINTS
                  </span>
                </div>

                <div className="space-y-2">
                  {ENDPOINTS.map((endpoint) => {
                    const isSelected = selectedEndpoint.id === endpoint.id;
                    return (
                      <div
                        key={endpoint.id}
                        onClick={() => handleEndpointSelect(endpoint)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#3B388E] text-white border-[#3B388E] shadow-sm'
                            : 'bg-white text-[#1A202C] border-[#E2E8F0] hover:bg-[#F4F5F7]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase ${
                            endpoint.method === 'GET'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-amber-500 text-white'
                          }`}>
                            {endpoint.method}
                          </span>
                          <span className={`font-mono-code text-xs font-bold ${
                            isSelected ? 'text-white' : 'text-[#3B388E]'
                          }`}>
                            {endpoint.path}
                          </span>
                        </div>
                        <p className={`text-xs font-sans-body mt-1.5 ${
                          isSelected ? 'text-gray-200' : 'text-gray-500'
                        }`}>
                          {endpoint.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Query Parameters Configurator */}
              <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <h3 className="font-space font-bold text-base text-[#3B388E] uppercase">
                    2. Query Parameters
                  </h3>
                  <button
                    onClick={() => setParams(selectedEndpoint.defaultParams)}
                    className="font-mono-code text-[10px] text-[#E6004D] font-bold uppercase hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset Defaults
                  </button>
                </div>

                <div className="space-y-3">
                  {Object.entries(params).map(([key, val]) => (
                    <div key={key} className="space-y-1">
                      <label className="font-mono-code text-[11px] font-bold text-gray-600 uppercase flex items-center justify-between">
                        <span>{key}</span>
                        <span className="text-gray-400 font-normal">string</span>
                      </label>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => setParams({ ...params, [key]: e.target.value })}
                        className="w-full bg-[#F4F5F7] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-mono-code font-semibold text-[#1A202C] focus:outline-none focus:border-[#3B388E]"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleRunRequest}
                  disabled={isLoading}
                  className="w-full mt-2 bg-[#E6004D] hover:bg-[#c40042] text-white font-sans-body font-bold text-xs uppercase px-5 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                  <span>EXECUTE LIVE API QUERY</span>
                </button>
              </div>

            </div>

            {/* Right Column: Code Generator & Live Response */}
            <div className="lg:col-span-7 space-y-6">

              {/* Multi-Language Code Snippets */}
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 text-white">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#38BDF8]" />
                    <span className="font-mono-code text-xs uppercase font-bold text-slate-300">
                      INTEGRATION CODE GENERATOR
                    </span>
                  </div>

                  {/* Language Tab Switcher */}
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setActiveCodeTab('curl')}
                      className={`px-2.5 py-1 rounded-lg font-mono-code text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                        activeCodeTab === 'curl' ? 'bg-[#38BDF8] text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      cURL
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('python')}
                      className={`px-2.5 py-1 rounded-lg font-mono-code text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                        activeCodeTab === 'python' ? 'bg-[#38BDF8] text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Python
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('typescript')}
                      className={`px-2.5 py-1 rounded-lg font-mono-code text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                        activeCodeTab === 'typescript' ? 'bg-[#38BDF8] text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      TypeScript
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('n8n')}
                      className={`px-2.5 py-1 rounded-lg font-mono-code text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                        activeCodeTab === 'n8n' ? 'bg-[#38BDF8] text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      n8n
                    </button>
                  </div>
                </div>

                {/* Code Block Container */}
                <div className="relative">
                  <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono-code text-xs text-emerald-400 overflow-x-auto leading-relaxed">
                    {getCodeSnippet()}
                  </pre>

                  <button
                    onClick={handleCopyCode}
                    className="absolute top-3 right-3 p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                    title="Copy code snippet"
                  >
                    {isCopiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* JSON Live Response Container */}
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 text-white">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-mono-code text-xs font-bold text-white uppercase">
                      200 OK — RESPONSE PAYLOAD
                    </span>
                    <span className="font-mono-code text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {responseTime}ms
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyJson}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 font-mono-code text-[11px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      {isCopiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy JSON</span>
                    </button>

                    <button
                      onClick={() => handleDownloadDataset('json')}
                      className="px-3 py-1.5 bg-[#E6004D] hover:bg-[#c40042] text-white rounded-xl font-mono-code text-[11px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export File</span>
                    </button>
                  </div>
                </div>

                {/* Formatted JSON Payload */}
                <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono-code text-xs text-sky-300 overflow-x-auto max-h-[380px] leading-relaxed">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: DATA EXPORTER */}
        {activeTab === 'export' && (
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs space-y-8">
            <div className="max-w-2xl space-y-2">
              <h2 className="font-space font-extrabold text-2xl text-[#3B388E] uppercase tracking-tight">
                Academic & Corporate Data Export Hub
              </h2>
              <p className="font-sans-body text-sm text-gray-600 leading-relaxed">
                Download structured, anonymized Moroccan recruitment datasets for data science analysis, econometrics research, or machine learning model training.
              </p>
            </div>

            {downloadSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 font-sans-body text-xs font-bold animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Downloaded dataset file: <strong>{downloadSuccess}</strong></span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: JSON Format */}
              <div className="p-6 bg-[#F4F5F7] border border-[#E2E8F0] rounded-2xl space-y-4 hover:border-[#3B388E] transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-white border border-[#E2E8F0] text-[#3B388E] rounded-xl w-fit">
                    <FileJson className="w-6 h-6" />
                  </div>
                  <h3 className="font-space font-bold text-lg text-[#3B388E] uppercase">
                    Raw JSON Payload
                  </h3>
                  <p className="font-sans-body text-xs text-gray-600 leading-relaxed">
                    Complete nested JSON structure containing metadata, portal origin, skill arrays, and salary thresholds.
                  </p>
                  <div className="font-mono-code text-[10px] text-gray-400">
                    24,850 Records • 4.2 MB
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadDataset('json')}
                  className="w-full bg-[#3B388E] hover:bg-[#2e2b72] text-white font-sans-body font-bold text-xs uppercase px-4 py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .JSON</span>
                </button>
              </div>

              {/* Card 2: CSV Format */}
              <div className="p-6 bg-[#F4F5F7] border border-[#E2E8F0] rounded-2xl space-y-4 hover:border-[#E6004D] transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-white border border-[#E2E8F0] text-[#E6004D] rounded-xl w-fit">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <h3 className="font-space font-bold text-lg text-[#3B388E] uppercase">
                    CSV Table Format
                  </h3>
                  <p className="font-sans-body text-xs text-gray-600 leading-relaxed">
                    Flat tabular format ideal for Excel, Tableau, SPSS, and R statistical analysis.
                  </p>
                  <div className="font-mono-code text-[10px] text-gray-400">
                    Delimited Columns • 1.8 MB
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadDataset('csv')}
                  className="w-full bg-[#E6004D] hover:bg-[#c40042] text-white font-sans-body font-bold text-xs uppercase px-4 py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .CSV</span>
                </button>
              </div>

              {/* Card 3: PostgreSQL SQL DDL */}
              <div className="p-6 bg-[#F4F5F7] border border-[#E2E8F0] rounded-2xl space-y-4 hover:border-purple-600 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-white border border-[#E2E8F0] text-purple-600 rounded-xl w-fit">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="font-space font-bold text-lg text-[#3B388E] uppercase">
                    Star Schema DDL Script
                  </h3>
                  <p className="font-sans-body text-xs text-gray-600 leading-relaxed">
                    PostgreSQL 15 SQL migration script recreating MEIP’s Fact_Jobs and Dimension table structures.
                  </p>
                  <div className="font-mono-code text-[10px] text-gray-400">
                    PostgreSQL DDL • 12 KB
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadDataset('sql')}
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white font-sans-body font-bold text-xs uppercase px-4 py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .SQL DDL</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: PIPELINE HEALTH */}
        {activeTab === 'webhooks' && (
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs space-y-8">
            <div className="max-w-2xl space-y-2">
              <h2 className="font-space font-extrabold text-2xl text-[#3B388E] uppercase tracking-tight">
                Live Data Pipeline & Webhook Monitor
              </h2>
              <p className="font-sans-body text-sm text-gray-600 leading-relaxed">
                Real-time telemetry monitoring continuous extraction cycles across Moroccan recruitment portals and Supabase database synchronization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Webhook 1 */}
              <div className="p-5 border border-[#E2E8F0] rounded-2xl bg-[#F4F5F7] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold text-[#3B388E]">
                    ANAPEC Government Portal Worker
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ACTIVE (CRON)
                  </span>
                </div>
                <p className="text-xs font-sans-body text-gray-600">
                  Runs every 6 hours to harvest public employment listings and vocational training opportunities.
                </p>
                <div className="flex justify-between items-center text-[11px] font-mono-code text-gray-500 pt-2 border-t border-[#E2E8F0]">
                  <span>Last Sync: 12 mins ago</span>
                  <span>9,840 records</span>
                </div>
              </div>

              {/* Webhook 2 */}
              <div className="p-5 border border-[#E2E8F0] rounded-2xl bg-[#F4F5F7] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold text-[#3B388E]">
                    ReKrute & Emploi.ma Private Sector Engine
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ACTIVE (WEBSOCKET)
                  </span>
                </div>
                <p className="text-xs font-sans-body text-gray-600">
                  Parses executive and tech postings from Casablanca Nearshore & Technopark firms.
                </p>
                <div className="flex justify-between items-center text-[11px] font-mono-code text-gray-500 pt-2 border-t border-[#E2E8F0]">
                  <span>Last Sync: 4 mins ago</span>
                  <span>11,210 records</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
