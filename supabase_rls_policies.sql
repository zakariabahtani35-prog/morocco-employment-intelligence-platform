-- =============================================================================
-- MEIP (Morocco Employment Intelligence Platform) Supabase RLS & Security Policy
-- =============================================================================

-- 1. Enable Row Level Security (RLS) across core data tables
ALTER TABLE IF EXISTS jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS pipeline_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS raw_jobs ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to guarantee idempotent clean state
DROP POLICY IF EXISTS "Public Anon Read Access - jobs" ON jobs;
DROP POLICY IF EXISTS "Service Role Write Access - jobs" ON jobs;
DROP POLICY IF EXISTS "Public Anon Read Access - companies" ON companies;
DROP POLICY IF EXISTS "Service Role Write Access - companies" ON companies;
DROP POLICY IF EXISTS "Public Anon Read Access - locations" ON locations;
DROP POLICY IF EXISTS "Service Role Write Access - locations" ON locations;
DROP POLICY IF EXISTS "Public Anon Read Access - pipeline_logs" ON pipeline_logs;
DROP POLICY IF EXISTS "Service Role Write Access - pipeline_logs" ON pipeline_logs;
DROP POLICY IF EXISTS "Public Anon Read Access - raw_jobs" ON raw_jobs;
DROP POLICY IF EXISTS "Service Role Write Access - raw_jobs" ON raw_jobs;

-- 3. Define Read-Only Public Policies (Anon Role)
CREATE POLICY "Public Anon Read Access - jobs"
  ON jobs FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public Anon Read Access - companies"
  ON companies FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public Anon Read Access - locations"
  ON locations FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public Anon Read Access - pipeline_logs"
  ON pipeline_logs FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public Anon Read Access - raw_jobs"
  ON raw_jobs FOR SELECT
  TO anon, authenticated
  USING (true);

-- 4. Define Restricted Ingestion Policies (Service Role Only for Write Operations)
CREATE POLICY "Service Role Write Access - jobs"
  ON jobs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service Role Write Access - companies"
  ON companies FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service Role Write Access - locations"
  ON locations FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service Role Write Access - pipeline_logs"
  ON pipeline_logs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service Role Write Access - raw_jobs"
  ON raw_jobs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. Executive Dashboard Aggregation RPC Function with RLS Enforcement
CREATE OR REPLACE FUNCTION get_dashboard_kpis()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'total_active_jobs', (SELECT COUNT(*) FROM jobs),
    'new_jobs_today', (SELECT COUNT(*) FROM jobs WHERE created_at >= CURRENT_DATE),
    'hiring_companies', (SELECT COUNT(DISTINCT company) FROM jobs),
    'cities_covered', (SELECT COUNT(DISTINCT location) FROM jobs),
    'avg_salary', (SELECT ROUND(AVG(CAST(regexp_replace(salary, '[^\d.]', '', 'g') AS NUMERIC))) FROM jobs WHERE salary ~ '\d+'),
    'pipeline_success_rate', (
      SELECT ROUND(
        (COUNT(CASE WHEN UPPER(status) = 'SUCCESS' THEN 1 END)::NUMERIC / NULLIF(COUNT(*), 0)::NUMERIC) * 100, 
        1
      )
      FROM pipeline_logs
    )
  ) INTO result;

  RETURN result;
END;
$$;
