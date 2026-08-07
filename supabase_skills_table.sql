-- =============================================================================
-- MEIP (Morocco Employment Intelligence Platform) Data Engineering Schema
-- Table: public.skills
-- =============================================================================

-- 1. Create relational skills table referencing public.jobs(id)
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  normalized_skill TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'technical',
  confidence NUMERIC(4,3) DEFAULT 1.000,
  source TEXT DEFAULT 'AI',
  aliases TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create High-Performance Indexes for Aggregations & Joins
CREATE INDEX IF NOT EXISTS idx_skills_normalized_skill ON public.skills (normalized_skill);
CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills (category);
CREATE INDEX IF NOT EXISTS idx_skills_job_id ON public.skills (job_id);
CREATE INDEX IF NOT EXISTS idx_skills_category_normalized ON public.skills (category, normalized_skill);
CREATE INDEX IF NOT EXISTS idx_skills_confidence ON public.skills (confidence);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE IF EXISTS public.skills ENABLE ROW LEVEL SECURITY;

-- 4. Define Public Read Access Policy (Anon & Authenticated)
DROP POLICY IF EXISTS "Public Anon Read Access - skills" ON public.skills;
CREATE POLICY "Public Anon Read Access - skills"
  ON public.skills FOR SELECT
  TO anon, authenticated, service_role
  USING (true);

-- 5. Define Ingestion / Sync Access Policy (Service Role & Authenticated)
DROP POLICY IF EXISTS "Service Role Ingestion Access - skills" ON public.skills;
CREATE POLICY "Service Role Ingestion Access - skills"
  ON public.skills FOR ALL
  TO anon, authenticated, service_role
  USING (true)
  WITH CHECK (true);
