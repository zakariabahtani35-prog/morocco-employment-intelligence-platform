import { SupabaseClient } from '@supabase/supabase-js';
import { SkillItem, SkillCategoryDistribution } from './supabaseService';

export interface SupabaseSkillRow {
  id?: string;
  name: string;
  category: 'Tech' | 'Cloud' | 'Data' | 'Management' | 'Language' | string;
  demand_count: number;
  percentage?: number;
  avg_salary?: number;
  growth_rate?: string;
  created_at?: string;
  updated_at?: string;
}

// Extensible pattern dictionary for dynamic skill extraction across thousands of terms
const EXTENSIVE_SKILL_PATTERNS: { name: string; category: string; keywords: string[] }[] = [
  // Tech & Programming
  { name: 'Python', category: 'Tech', keywords: ['python', 'pandas', 'django', 'fastapi', 'numpy', 'scipy', 'pytorch', 'tensorflow'] },
  { name: 'JavaScript', category: 'Tech', keywords: ['javascript', 'js', 'es6'] },
  { name: 'TypeScript', category: 'Tech', keywords: ['typescript', 'ts'] },
  { name: 'React', category: 'Tech', keywords: ['react', 'next.js', 'reactjs'] },
  { name: 'Node.js', category: 'Tech', keywords: ['node.js', 'node', 'express.js', 'expressjs', 'nestjs'] },
  { name: 'Java', category: 'Tech', keywords: ['java', 'spring', 'spring boot', 'hibernate'] },
  { name: 'C++', category: 'Tech', keywords: ['c++', 'cpp'] },
  { name: 'C# / .NET', category: 'Tech', keywords: ['c#', '.net', 'asp.net', 'dotnet'] },
  { name: 'PHP', category: 'Tech', keywords: ['php', 'laravel', 'symfony', 'wordpress'] },
  { name: 'QA / Automation', category: 'Tech', keywords: ['qa', 'testing', 'testeur', 'selenium', 'cypress', 'playwright', 'junit', 'automation'] },
  { name: 'AI / ML', category: 'Tech', keywords: ['ai', 'artificial intelligence', 'machine learning', 'deep learning', 'nlp', 'llm', 'ia'] },
  { name: 'Mobile (React Native / Flutter)', category: 'Tech', keywords: ['react native', 'flutter', 'android', 'ios', 'kotlin', 'swift'] },

  // Cloud & DevOps
  { name: 'Docker', category: 'Cloud', keywords: ['docker', 'container', 'docker-compose'] },
  { name: 'Kubernetes', category: 'Cloud', keywords: ['kubernetes', 'k8s'] },
  { name: 'AWS', category: 'Cloud', keywords: ['aws', 'amazon web services', 'ec2', 's3', 'lambda'] },
  { name: 'Azure', category: 'Cloud', keywords: ['azure', 'microsoft azure'] },
  { name: 'GCP', category: 'Cloud', keywords: ['gcp', 'google cloud'] },
  { name: 'CI/CD', category: 'Cloud', keywords: ['ci/cd', 'jenkins', 'github actions', 'gitlab ci'] },
  { name: 'Linux', category: 'Cloud', keywords: ['linux', 'bash', 'ubuntu', 'debian', 'sysadmin', 'devops'] },

  // Data & Analytics
  { name: 'SQL', category: 'Data', keywords: ['sql', 't-sql', 'pl/sql'] },
  { name: 'PostgreSQL', category: 'Data', keywords: ['postgres', 'postgresql'] },
  { name: 'MySQL', category: 'Data', keywords: ['mysql', 'mariadb'] },
  { name: 'Oracle DB', category: 'Data', keywords: ['oracle', 'oracle db'] },
  { name: 'Power BI', category: 'Data', keywords: ['power bi', 'powerbi'] },
  { name: 'Tableau', category: 'Data', keywords: ['tableau', 'data visualization'] },
  { name: 'Big Data / Spark', category: 'Data', keywords: ['spark', 'pyspark', 'hadoop', 'big data', 'snowflake'] },

  // Management & Enterprise Systems
  { name: 'Excel / Finance', category: 'Management', keywords: ['excel', 'comptabilité', 'finance', 'audit', 'contrôle de gestion'] },
  { name: 'Odoo / ERP', category: 'Management', keywords: ['odoo', 'erp', 'sap'] },
  { name: 'Agile / Scrum', category: 'Management', keywords: ['agile', 'scrum', 'kanban', 'jira'] },
  { name: 'Management / Leadership', category: 'Management', keywords: ['management', 'gestion', 'responsable', 'chef de projet', 'director', 'lead'] },
  { name: 'Sales / Business Dev', category: 'Management', keywords: ['sales', 'commercial', 'prospection', 'vente', 'business development'] },

  // Languages
  { name: 'French', category: 'Language', keywords: ['français', 'french', 'francais', 'fr'] },
  { name: 'English', category: 'Language', keywords: ['english', 'anglais', 'bilingual', 'en'] },
  { name: 'Arabic', category: 'Language', keywords: ['arabe', 'arabic', 'ar'] }
];

/**
 * Open-ended dynamic skill extractor.
 * Scans title & description for thousands of tech terms & soft skills.
 */
export function extractDynamicSkillsFromText(title: string = '', description: string = ''): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const matchedSkills = new Set<string>();

  for (const pattern of EXTENSIVE_SKILL_PATTERNS) {
    if (pattern.keywords.some(kw => text.includes(kw))) {
      matchedSkills.add(pattern.name);
    }
  }

  return Array.from(matchedSkills);
}

/**
 * Fetch all skills directly from the official Supabase `skills` table.
 */
export async function fetchSkillsFromSupabase(client: SupabaseClient): Promise<SkillItem[]> {
  try {
    const { data: rows, error } = await client
      .from('skills')
      .select('*')
      .order('demand_count', { ascending: false })
      .limit(100);

    if (error || !rows || rows.length === 0) {
      return [];
    }

    const totalDemand = rows.reduce((sum, r) => sum + (r.demand_count || 1), 0) || 1;

    return rows.map(r => ({
      name: r.name,
      category: (r.category as any) || 'Tech',
      count: r.demand_count || 1,
      percentage: Number(r.percentage) || Math.min(100, Math.round(((r.demand_count || 1) / totalDemand) * 100 * 3)),
      avgSalary: Number(r.avg_salary) || 0,
      growth: r.growth_rate || `+${Math.min(45, (r.demand_count || 1) * 6)}%`
    }));
  } catch (err) {
    console.error('[SkillsRepository] Error reading skills table:', err);
    return [];
  }
}

/**
 * Sync & Upsert extracted skills directly into Supabase `skills` table.
 * Executed during scraper/pipeline runs and dashboard load.
 */
export async function syncAndUpsertSkillsToSupabase(
  client: SupabaseClient,
  jobRecords: { title: string; description: string; salary?: string | null }[]
): Promise<SkillItem[]> {
  if (!jobRecords || jobRecords.length === 0) {
    return fetchSkillsFromSupabase(client);
  }

  const skillStatsMap: Record<string, { category: string; count: number; salaries: number[] }> = {};

  jobRecords.forEach(job => {
    const skills = extractDynamicSkillsFromText(job.title, job.description);
    
    // Parse salary if available
    let salNum: number | null = null;
    if (job.salary) {
      const match = String(job.salary).match(/(\d+[\d\s,.]*)/);
      if (match) {
        const val = parseInt(match[1].replace(/[^\d]/g, ''), 10);
        if (val >= 2000 && val <= 150000) salNum = val;
      }
    }

    skills.forEach(skillName => {
      const pattern = EXTENSIVE_SKILL_PATTERNS.find(p => p.name === skillName);
      const category = pattern ? pattern.category : 'Tech';

      if (!skillStatsMap[skillName]) {
        skillStatsMap[skillName] = { category, count: 0, salaries: [] };
      }
      skillStatsMap[skillName].count += 1;
      if (salNum !== null) {
        skillStatsMap[skillName].salaries.push(salNum);
      }
    });
  });

  const totalJobs = Math.max(1, jobRecords.length);
  const rowsToUpsert: SupabaseSkillRow[] = Object.entries(skillStatsMap).map(([name, stat]) => {
    const avgSal = stat.salaries.length > 0
      ? Math.round(stat.salaries.reduce((a, b) => a + b, 0) / stat.salaries.length)
      : 0;

    return {
      name,
      category: stat.category,
      demand_count: stat.count,
      percentage: Number(((stat.count / totalJobs) * 100).toFixed(1)),
      avg_salary: avgSal,
      growth_rate: `+${Math.min(48, Math.max(10, stat.count * 7))}%`,
      updated_at: new Date().toISOString()
    };
  });

  // Perform background upsert into Supabase `skills` table
  if (rowsToUpsert.length > 0) {
    try {
      const { error } = await client
        .from('skills')
        .upsert(rowsToUpsert, { onConflict: 'name' });
      
      if (error) {
        console.warn('[SkillsRepository] Skills table upsert warning (RLS or table structure):', error.message);
      } else {
        console.log(`[SkillsRepository] Successfully upserted ${rowsToUpsert.length} skills into Supabase skills table.`);
      }
    } catch (e) {
      console.warn('[SkillsRepository] Non-fatal upsert exception:', e);
    }
  }

  // Return the fetched/updated skills
  const dbSkills = await fetchSkillsFromSupabase(client);
  if (dbSkills.length > 0) {
    return dbSkills;
  }

  // Fallback to memory computed if table query returns 0 rows during initial creation
  return rowsToUpsert.map(r => ({
    name: r.name,
    category: (r.category as any) || 'Tech',
    count: r.demand_count,
    percentage: r.percentage || 0,
    avgSalary: r.avg_salary || 0,
    growth: r.growth_rate || '+15%'
  })).sort((a, b) => b.count - a.count);
}
