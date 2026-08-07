-- =============================================================================
-- MEIP (Morocco Employment Intelligence Platform) Supabase Skills Table DDL
-- =============================================================================

-- 1. Create skills table with dynamic schema supporting thousands of open-ended skills
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'Tech',
  demand_count INT NOT NULL DEFAULT 1,
  percentage NUMERIC(5,2) DEFAULT 0,
  avg_salary NUMERIC(10,2) DEFAULT 0,
  growth_rate TEXT DEFAULT '+0%',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create High-Performance Indexes for Instant Aggregations
CREATE UNIQUE INDEX IF NOT EXISTS idx_skills_name ON skills (name);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills (category);
CREATE INDEX IF NOT EXISTS idx_skills_demand_count ON skills (demand_count DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE IF EXISTS skills ENABLE ROW LEVEL SECURITY;

-- 4. Define Public Read Access Policy
DROP POLICY IF EXISTS "Public Anon Read Access - skills" ON skills;
CREATE POLICY "Public Anon Read Access - skills"
  ON skills FOR SELECT
  TO anon, authenticated, service_role
  USING (true);

-- 5. Define Ingestion / Sync Access Policy (Allow Anon & Service Role Upserts)
DROP POLICY IF EXISTS "Public Anon Upsert Access - skills" ON skills;
CREATE POLICY "Public Anon Upsert Access - skills"
  ON skills FOR ALL
  TO anon, authenticated, service_role
  USING (true)
  WITH CHECK (true);
