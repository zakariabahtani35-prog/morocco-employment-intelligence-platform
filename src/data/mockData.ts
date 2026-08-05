import { TicketType, Sponsor, EcosystemEvent, FAQItem, Announcement, Testimonial } from '../types';

export const TICKETS_DATA: TicketType[] = [
  {
    id: 'dashboard',
    name: 'Interactive Web Dashboard',
    price: 0,
    badge: 'PRIMARY ACCESS',
    description: 'Real-time regional job maps, skill matrices, salary analytics, industry hiring rankings, and automated AI market trend synthesis.',
    featured: true
  },
  {
    id: 'architecture',
    name: 'Data Architecture Specs',
    price: 0,
    badge: 'SYSTEM ARCHITECTURE',
    description: 'Detailed Star Schema OLAP database structure, ERD relation diagrams, Supabase PostgreSQL configuration, and ETL workflow specs.'
  },
  {
    id: 'pipeline',
    name: 'Automated ELT Pipeline',
    price: 0,
    badge: 'AUTOMATION PIPELINE',
    description: 'n8n workflow schedules, Playwright multi-portal scrapers, data cleaning engines, and AI skill extraction functions.'
  },
  {
    id: 'github',
    name: 'Open Source Repository',
    price: 0,
    badge: 'CODEBASE ACCESS',
    description: 'Full GitHub repository with React 18, TypeScript, Tailwind CSS, Recharts data visualization, and Express backend.'
  }
];

export const SPONSORS_DATA: Sponsor[] = [
  {
    name: 'Simplon Morocco',
    category: 'platinum',
    logoText: 'SIMPLON',
    subtext: 'Academic & Tech Partner'
  },
  {
    name: 'Supabase PostgreSQL',
    category: 'platinum',
    logoText: 'SUPABASE',
    subtext: 'Database & Real-time Data Warehouse'
  },
  {
    name: 'n8n Automation Engine',
    category: 'gold',
    logoText: 'n8n.io',
    subtext: 'Workflow & Scraper Orchestration'
  },
  {
    name: 'ANAPEC Data Portal',
    category: 'silver',
    logoText: 'ANAPEC',
    subtext: 'National Employment Agency Ingestion Source'
  },
  {
    name: 'ReKrute Morocco',
    category: 'silver',
    logoText: 'ReKrute',
    subtext: 'Executive Job Listings Ingestion'
  },
  {
    name: 'Emploi.ma',
    category: 'partner',
    logoText: 'EMPLOI.MA',
    subtext: 'Tech & Industrial Vacancy Partner'
  }
];

export const EVENTS_DATA: EcosystemEvent[] = [
  {
    id: 'event-1',
    title: 'Stage 1: Multi-Portal Web Scraping & Ingestion',
    date: 'Daily Schedule',
    time: '02:00 UTC & 14:00 UTC',
    location: 'n8n Automation Cloud Server',
    badge: 'INGESTION ENGINE',
    bgGradient: 'from-[#3B388E] to-[#1E1B54]',
    linkText: 'VIEW SCRAPER CONFIGS',
    description: 'Automated extraction of raw job listings across ANAPEC, ReKrute, Emploi.ma, DreamJob, and Novojob using Playwright and Axios agents.'
  },
  {
    id: 'event-2',
    title: 'Stage 2: Data Cleaning & Normalization Engine',
    date: 'Automated Event Stream',
    time: 'Real-time Trigger',
    location: 'Node.js Transformation Worker',
    badge: 'DATA CLEANING',
    bgGradient: 'from-[#E6004D] to-[#A30036]',
    linkText: 'INSPECT SANITIZER RULES',
    description: 'Deduplication, HTML tag removal, city name standardization across 12 Moroccan prefectures, and salary format conversion into MAD integer ranges.'
  },
  {
    id: 'event-3',
    title: 'Stage 3: AI Skill & Seniority Categorization',
    date: 'Batch Execution',
    time: 'Every 6 Hours',
    location: 'Gemini 1.5 Flash AI Service',
    badge: 'AI ANALYTICS',
    bgGradient: 'from-[#3B388E] to-[#0D0B2E]',
    linkText: 'EXPLORE PROMPT PIPELINE',
    description: 'Natural language processing for extracting hard/soft tech skills, workplace type (Remote/Hybrid/On-site), and experience tier (Junior/Mid/Senior).'
  },
  {
    id: 'event-4',
    title: 'Stage 4: Star Schema OLAP Warehouse Storage',
    date: 'Continuous Sync',
    time: 'Sub-second Indexing',
    location: 'Supabase PostgreSQL Cloud',
    badge: 'DATA WAREHOUSE',
    bgGradient: 'from-[#1A202C] to-[#2D3748]',
    linkText: 'QUERY DATABASE SCHEMA',
    description: 'Structured persistence across companies, locations, jobs, raw_jobs audit tables, and AI analytics aggregate materialized views.'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is the Morocco Employment Intelligence Platform (MEIP)?',
    answer: 'MEIP is an end-to-end data analytics platform that scrapes, cleans, categorizes, and visualizes employment market data across Morocco in real-time. It provides decision-makers, academic institutions, and recruiters with live labor trends.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'Which job portals are indexed by the automated scrapers?',
    answer: 'Our scrapers currently harvest job postings from ANAPEC, ReKrute, Emploi.ma, DreamJob, Novojob, and Google News RSS job feeds, capturing over 24,000 listings across all 12 Moroccan regions.',
    category: 'data'
  },
  {
    id: 'faq-3',
    question: 'What database engine and schema architecture does MEIP use?',
    answer: 'MEIP runs on a Supabase PostgreSQL instance using a Star Schema OLAP data warehouse model optimized for analytical queries, with separate dimensional tables for companies, locations, raw audit logs, cleaned jobs, and AI analytics.',
    category: 'tech'
  },
  {
    id: 'faq-4',
    question: 'How does the platform handle AI-driven skill extraction?',
    answer: 'Each cleaned job description is processed through an automated Gemini AI prompt pipeline that extracts tech skills (Python, React, SQL, etc.), categorizes seniority (Junior, Mid, Senior), and estimates average MAD salaries.',
    category: 'tech'
  },
  {
    id: 'faq-5',
    question: 'What was the academic context behind building MEIP?',
    answer: 'MEIP was engineered as a capstone Data Engineering project for Simplon Morocco to showcase full-stack data pipeline design, web scraping, cloud database architecture, and interactive executive reporting.',
    category: 'academic'
  },
  {
    id: 'faq-6',
    question: 'How frequently is the executive dashboard refreshed?',
    answer: 'The dashboard syncs directly with the Supabase data warehouse. Scrapers run every 6 hours, while live UI metrics update in real-time as new job listings are processed.',
    category: 'dashboard'
  }
];

export const ANNOUNCEMENTS_DATA: Announcement[] = [
  {
    id: 'ann-1',
    category: 'PIPELINE V2.4 RELEASE',
    title: 'Intranet Chatbot & Webhook Integration Deployed',
    link: '#'
  },
  {
    id: 'ann-2',
    category: 'DATABASE EXPANSION',
    title: 'Indexed 24,850 Total Moroccan Job Listings Across 12 Regions',
    link: '#'
  },
  {
    id: 'ann-3',
    category: 'AI ENHANCEMENT',
    title: 'Gemini Skill Extraction Accuracy Upgraded to 98.6%',
    link: '#'
  },
  {
    id: 'ann-4',
    category: 'ACADEMIC MILESTONE',
    title: 'Simplon Morocco Capstone Project Defense Completed',
    link: '#'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    quote: "MEIP provides an unprecedented level of real-time visibility into Morocco's technology talent demand. The automated pipeline architecture is robust, clean, and highly scalable.",
    author: 'Karim El Amrani',
    handle: '@kelamrani_tech',
    role: 'Lead Data Architect',
    company: 'Simplon Morocco'
  },
  {
    id: 'test-2',
    quote: 'The combination of automated web scraping, Supabase PostgreSQL OLAP data warehousing, and AI skill extraction makes MEIP an exemplary Data Engineering reference project.',
    author: 'Sarah Bennani',
    handle: '@sarahb_data',
    role: 'Senior Analytics Director',
    company: 'Capgemini Tech Hub'
  },
  {
    id: 'test-3',
    quote: 'Being able to track real-time salary benchmarks and regional skill distribution across Casablanca, Rabat, and Tangier is invaluable for recruiters and educational curriculum planners.',
    author: 'Youssef Mansouri',
    handle: '@ymansouri_hr',
    role: 'Head of Talent Acquisition',
    company: 'Attijariwafa Bank'
  }
];
