# ⚡ n8n Automated ETL & Scraper Workflows for MEIP 2026

This directory contains the production-grade **n8n Workflow Templates** that drive the automated web harvesting, data cleaning, NLP skill extraction, and PostgreSQL loading pipeline for the **Morocco Employment Intelligence Platform (MEIP 2026)**.

---

## 📂 Workflow Repository Structure

| Workflow File | Description | Trigger Schedule | Target Destination |
| :--- | :--- | :--- | :--- |
| [`anapec-scraper.json`](./anapec-scraper.json) | Scrapes public Moroccan employment offers from **ANAPEC**, parses HTML cards, standardizes fields, and upserts to PostgreSQL. | Every 6 Hours | `jobs` & `pipeline_logs` |
| [`rekrute-scraper.json`](./rekrute-scraper.json) | Scrapes executive & IT postings from **ReKrute**, normalizes salaries in MAD, maps Moroccan regional cities, and upserts to PostgreSQL. | Every 4 Hours | `jobs` & `pipeline_logs` |
| [`emploi-ma-scraper.json`](./emploi-ma-scraper.json) | Ingests national recruitment offers from **Emploi.ma**, deduplicates records, standardizes contract types (CDI, CDD, Freelance), and persists. | Every 12 Hours | `jobs` & `pipeline_logs` |
| [`nlp-skill-extraction.json`](./nlp-skill-extraction.json) | Queries un-parsed raw job entries, applies regex & Moroccan tech taxonomy matching (React, Python, Supabase, etc.), and updates skill arrays. | Hourly | `jobs.skills` |

---

## 🚀 Deployment & Production Setup

### 1. Import Workflows into n8n Instance
1. Open your self-hosted **n8n Web Console** (or Cloud instance).
2. Click **Workflows** -> **Import from File**.
3. Select any of the JSON templates from this `n8n-workflows/` directory.

### 2. Configure Environment Credentials
To connect the nodes to your production **Supabase PostgreSQL Data Warehouse**, configure the Postgres credential in n8n named `MEIP_SUPABASE_POSTGRES_CREDENTIALS`:

```env
DB_TYPE=PostgreSQL
DB_HOST=db.your-supabase-project.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USER=postgres
DB_PASSWORD=YOUR_PRODUCTION_DB_PASSWORD
SSL_MODE=require
```

### 3. Pipeline Telemetry & Failure Retry Logic
All scraper nodes are configured with enterprise-grade resilience:
- **Error Retries**: 3 automatic retry attempts with exponential backoff on HTTP 429/503 errors.
- **Rate Limiting**: Custom headers and interval delays to comply with domain terms of service.
- **Telemetry Logs**: Automatically inserts execution metrics into `pipeline_logs`:
  ```sql
  INSERT INTO pipeline_logs (source_name, records_harvested, execution_status, execution_time_ms, created_at)
  VALUES ('ANAPEC', 145, 'SUCCESS', 120, NOW());
  ```

---

## 🔒 Security Protocol
- **Zero Hardcoded Passwords**: All database connections and API keys must be managed via n8n's encrypted Credential Vault or Environment Variables (`.env`).
- **Data Protection**: Scrapers harvest public aggregate job announcements only, strictly adhering to privacy and terms-of-service compliance.
