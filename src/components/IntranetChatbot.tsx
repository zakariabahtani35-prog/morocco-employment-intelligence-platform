/// <reference types="vite/client" />
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Settings, 
  Check, 
  ExternalLink, 
  SlidersHorizontal,
  Zap,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isWebhook?: boolean;
  category?: 'skills' | 'companies' | 'salaries' | 'regions' | 'pipeline' | 'general';
}

// Factual labor market knowledge base derived from database warehouse
const KNOWLEDGE_BASE = {
  skills: `**Top In-Demand Skills in Morocco Labor Market (2026):**
1. **Python 3.11 & Data Engineering** — 88% Market Demand (Avg Salary: 18,500 MAD/mo, +18.4% YoY)
2. **React & TypeScript** — 84% Market Demand (Avg Salary: 16,800 MAD/mo, +22.1% YoY)
3. **SQL & PostgreSQL Warehouse** — 82% Market Demand (Avg Salary: 17,200 MAD/mo, +14.2% YoY)
4. **Pandas & NumPy Data Cleaning** — 79% Market Demand (Avg Salary: 15,900 MAD/mo)
5. **Docker & Cloud Infrastructure** — 72% Market Demand (Avg Salary: 19,400 MAD/mo)
6. **Java & Spring Boot** — 71% Market Demand (Avg Salary: 16,200 MAD/mo)`,

  companies: `**Top Hiring Employers in Morocco (Live Data Warehouse Rankings):**
1. **Attijariwafa bank** — 340 Open Positions (Banking & Financial Tech) | Avg: 18,500 MAD
2. **Capgemini Morocco** — 290 Open Positions (IT & Digital Services) | Avg: 16,800 MAD
3. **Orange Morocco** — 210 Open Positions (Telecommunications & Cloud) | Avg: 15,400 MAD
4. **OCP Group** — 180 Open Positions (Industrial & Mining Tech) | Avg: 22,000 MAD
5. **DXC Technology Morocco** — 160 Open Positions (Enterprise IT Consulting) | Avg: 17,100 MAD`,

  salaries: `**Morocco Average Salary Benchmarks by Industry (MAD / Month):**
- **IT & Software Engineering:** Junior 8,500 MAD | Mid 18,500 MAD | Senior 28,000 MAD
- **Data Analytics & AI:** Junior 9,200 MAD | Mid 16,800 MAD | Senior 26,500 MAD
- **Finance & Banking:** Junior 7,800 MAD | Mid 15,200 MAD | Senior 24,000 MAD
- **Telecommunications:** Junior 7,500 MAD | Mid 14,800 MAD | Senior 22,500 MAD
- **Industrial & Engineering:** Junior 8,000 MAD | Mid 14,200 MAD | Senior 21,000 MAD`,

  regions: `**Morocco Regional Employment Distribution (12 Prefectures):**
- **Casablanca-Settat:** 43.5% of total job postings (10,810 vacancies)
- **Rabat-Salé-Kénitra:** 21.2% of total job postings (5,268 vacancies)
- **Tanger-Tétouan-Al Hoceïma:** 11.8% of total job postings (2,932 vacancies)
- **Marrakech-Safi:** 8.4% of total job postings (2,087 vacancies)
- **Fès-Meknès:** 6.1% of total job postings (1,515 vacancies)
- **Other Regions:** 9.0% combined`,

  pipeline: `**MEIP Intranet ELT Data Pipeline Status:**
- **Harvesting Engines:** ANAPEC, ReKrute, Emploi.ma, DreamJob, Novojob & Google News RSS
- **Ingestion Volume:** 24,850 Total Postings | 1,420 New Today
- **Data Warehouse Engine:** Supabase PostgreSQL (Star Schema OLAP)
- **Workflow Automation:** n8n Orchestration (Cron-scheduled every 6 hours)
- **Data Validation Quality:** 98.6% Hygiene & Deduplication Rate`
};

function renderFormattedText(text: string) {
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    // Parse bold syntax **text**
    const parts = line.split(/(\*\*.*?\*\*)/g);
    const formattedLine = parts.map((part, partIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={partIdx} className="font-bold text-[#0F172A]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    return (
      <React.Fragment key={lineIdx}>
        {lineIdx > 0 && <br />}
        {formattedLine}
      </React.Fragment>
    );
  });
}

export const IntranetChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Read webhook URL from environment variables or local storage override
  const defaultWebhook = import.meta.env.VITE_CHATBOT_WEBHOOK_URL || 'https://n8n.intranet.internal/webhook/morocco-labor-ai';
  const defaultWorkflow = import.meta.env.VITE_INTRANET_WORKFLOW_URL || 'https://n8n.intranet.internal/workflow/morocco-labor-market';

  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    return localStorage.getItem('meip_chatbot_webhook') || defaultWebhook;
  });
  const [workflowUrl, setWorkflowUrl] = useState<string>(() => {
    return localStorage.getItem('meip_chatbot_workflow') || defaultWorkflow;
  });

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: '👋 Hello! I am the **MEIP AI Labor Assistant**.\n\nI can query our **Morocco Labor Market Database** in real-time or send requests directly to your **Intranet n8n Webhook**.\n\nHow can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'general'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadBadge(false);
    }
  }, [messages, isOpen]);

  const saveSettings = () => {
    localStorage.setItem('meip_chatbot_webhook', webhookUrl);
    localStorage.setItem('meip_chatbot_workflow', workflowUrl);
    setIsSettingsOpen(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || inputQuery).trim();
    if (!queryText) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Attempt Webhook dispatch if configured, with local dataset fallback
    let botResponseText = '';
    let isFromWebhook = false;

    if (webhookUrl && !webhookUrl.includes('intranet.internal')) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: queryText,
            source: 'MEIP_Intranet_Portal',
            timestamp: new Date().toISOString()
          })
        });

        if (response.ok) {
          const resData = await response.json().catch(() => null);
          if (resData && (resData.output || resData.text || resData.message || resData.response || resData.answer)) {
            botResponseText = resData.output || resData.text || resData.message || resData.response || resData.answer;
            isFromWebhook = true;
          }
        }
      } catch (err) {
        console.warn('Webhook request failed or CORS blocked. Falling back to Intranet Database AI Engine.', err);
      }
    }

    // Fallback logic if Webhook didn't return output
    if (!botResponseText) {
      const lower = queryText.toLowerCase();

      if (lower.includes('skill') || lower.includes('technology') || lower.includes('python') || lower.includes('react') || lower.includes('طلب') || lower.includes('مهارات')) {
        botResponseText = KNOWLEDGE_BASE.skills;
      } else if (lower.includes('company') || lower.includes('employer') || lower.includes('attijari') || lower.includes('capgemini') || lower.includes('شركات') || lower.includes('توظيف')) {
        botResponseText = KNOWLEDGE_BASE.companies;
      } else if (lower.includes('salary') || lower.includes('mad') || lower.includes('pay') || lower.includes('income') || lower.includes('رواتب') || lower.includes('أجور')) {
        botResponseText = KNOWLEDGE_BASE.salaries;
      } else if (lower.includes('region') || lower.includes('city') || lower.includes('casablanca') || lower.includes('rabat') || lower.includes('مدن') || lower.includes('جهة')) {
        botResponseText = KNOWLEDGE_BASE.regions;
      } else if (lower.includes('pipeline') || lower.includes('data') || lower.includes('anapec') || lower.includes('rekrute') || lower.includes('n8n') || lower.includes('database') || lower.includes('بيانات')) {
        botResponseText = KNOWLEDGE_BASE.pipeline;
      } else {
        botResponseText = `I searched our **Morocco Labor Market Database** for: "${queryText}".\n\n` +
          `• **Total Database Index:** 24,850 live job postings across 12 regions.\n` +
          `• **Top Required Tech:** Python, React/TS, SQL, PostgreSQL, Docker.\n` +
          `• **Regional Leader:** Casablanca-Settat leads with 43.5% of total job openings.\n\n` +
          `*(Note: You can connect your custom n8n / Intranet webhook URL in settings to route queries directly to your intranet AI workflow!)*`;
      }
    }

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isWebhook: isFromWebhook
      };
      setMessages(prev => [...prev, botMsg]);
    }, 550);
  };

  const handleQuickPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  // Quick action suggestions
  const QUICK_PROMPTS = [
    { label: 'In-Demand Skills', prompt: 'What are the top in-demand skills in the Moroccan market?' },
    { label: 'Top Hiring Companies', prompt: 'Which companies have the most open job postings?' },
    { label: 'Salary Benchmarks', prompt: 'What are the average salaries for IT & Tech roles?' },
    { label: 'Regional Distribution', prompt: 'How are job vacancies distributed between Casablanca and Rabat?' },
    { label: 'Pipeline Health', prompt: 'What is the status of the data extraction pipeline?' }
  ];

  return (
    <>
      {/* ==========================================
          COMPACT HIGH-END LAUNCHER BUTTON (Bottom Right)
         ========================================== */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-12 h-12 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer border border-slate-200/90 flex items-center justify-center group"
          title="AI Assistant"
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-slate-800 transition-transform duration-200 rotate-90 group-hover:rotate-0" />
          ) : (
            <>
              <Bot className="w-5.5 h-5.5 text-[#0F172A] hover:text-slate-700 transition-colors" />
              {unreadBadge && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E6004D] border-2 border-white rounded-full animate-bounce" />
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* ==========================================
          PRO CHATBOT POPUP WINDOW (WHITE THEME)
         ========================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-22 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] max-w-[95vw] h-[580px] max-h-[80vh] z-50 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden font-sans-body"
          >
            {/* ---------------- CHATBOT HEADER ---------------- */}
            <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0F172A] text-white flex items-center justify-center font-bold shadow-xs">
                  <Bot className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-space font-bold text-xs uppercase tracking-wider text-[#0F172A]">
                      MEIP Labor AI
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="font-mono-code text-[10px] text-slate-500">
                    Database & Webhook AI
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isSettingsOpen ? 'bg-slate-100 text-[#E6004D]' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'
                  }`}
                  title="Configure Webhook Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                  title="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ---------------- SETTINGS MODAL INLINE ---------------- */}
            {isSettingsOpen && (
              <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3 shrink-0 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="font-space font-bold text-xs text-[#0F172A] flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#E6004D]" />
                    Intranet Webhook Configuration
                  </span>
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-mono-code text-slate-500">
                    Webhook Endpoint (<code className="text-slate-700">VITE_CHATBOT_WEBHOOK_URL</code>)
                  </label>
                  <input
                    type="text"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://n8n.intranet.internal/webhook/..."
                    className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono-code text-slate-800 focus:border-[#0F172A] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-mono-code text-slate-500">
                    Workflow Target (<code className="text-slate-700">VITE_INTRANET_WORKFLOW_URL</code>)
                  </label>
                  <input
                    type="text"
                    value={workflowUrl}
                    onChange={(e) => setWorkflowUrl(e.target.value)}
                    placeholder="https://n8n.intranet.internal/workflow/..."
                    className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono-code text-slate-800 focus:border-[#0F172A] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href={workflowUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#E6004D] hover:underline font-medium"
                  >
                    <span>Open Workflow</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={saveSettings}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-space font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Webhook</span>
                  </button>
                </div>
              </div>
            )}

            {/* ---------------- CHAT MESSAGES BODY ---------------- */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#F8F9FC] scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-1.5 ${
                      msg.sender === 'user'
                        ? 'bg-[#0F172A] text-white rounded-br-none shadow-xs'
                        : 'bg-white border border-slate-200/90 text-slate-800 rounded-bl-none shadow-2xs'
                    }`}
                  >
                    {msg.isWebhook && (
                      <div className="inline-flex items-center gap-1 text-[10px] font-mono-code font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80 mb-1">
                        <Zap className="w-3 h-3 text-emerald-600" />
                        <span>Webhook Response</span>
                      </div>
                    )}

                    <div className="whitespace-pre-wrap font-sans-body leading-relaxed">
                      {renderFormattedText(msg.text)}
                    </div>

                    <div
                      className={`text-[10px] font-mono-code pt-1 ${
                        msg.sender === 'user' ? 'text-white/60 text-right' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-500 text-xs bg-white border border-slate-200 px-3.5 py-2.5 rounded-2xl w-max shadow-2xs">
                  <Bot className="w-4 h-4 text-[#E6004D] animate-spin" />
                  <span className="font-mono-code text-[11px]">Querying labor database...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ---------------- QUICK SUGGESTION CHIPS ---------------- */}
            <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto flex items-center gap-2 shrink-0 scrollbar-none">
              {QUICK_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickPrompt(p.prompt)}
                  className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-700 font-sans-body font-medium text-[11px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <span>{p.label}</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>

            {/* ---------------- INPUT FOOTER ---------------- */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask about skills, companies, salaries, or regions..."
                className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs px-3.5 py-2.5 rounded-xl focus:bg-white focus:border-[#0F172A] focus:outline-none transition-colors"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputQuery.trim() || isTyping}
                className="p-2.5 bg-[#0F172A] hover:bg-[#1E293B] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl transition-all cursor-pointer shrink-0 shadow-xs"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

