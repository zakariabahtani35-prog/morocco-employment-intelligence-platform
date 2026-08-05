import { z } from 'zod';

/**
 * Zod Schema for Scraped / Ingested Job Postings
 */
export const JobRecordSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().min(1, 'Location is required'),
  sector: z.string().optional().default('General'),
  industry: z.string().optional().default('General'),
  salary: z.union([z.string(), z.number(), z.null()]).optional(),
  experience: z.string().optional().default('Not Specified'),
  contract_type: z.string().optional().default('CDI'),
  work_type: z.string().optional().default('On-site'),
  description: z.string().optional().default(''),
  publication_date: z.string().optional(),
  portal: z.string().optional().default('Unknown'),
  url: z.string().url().optional().or(z.literal('')),
});

export type JobRecordInput = z.infer<typeof JobRecordSchema>;

/**
 * Zod Schema for AI Skill Extraction output from Gemini API
 */
export const GeminiExtractionSchema = z.object({
  job_id: z.string().optional(),
  normalized_title: z.string().default('Software Engineer'),
  technical_skills: z.array(z.string()).default([]),
  soft_skills: z.array(z.string()).default([]),
  required_experience_years: z.number().nullable().default(null),
  salary_min_mad: z.number().nullable().default(null),
  salary_max_mad: z.number().nullable().default(null),
  remote_eligible: z.boolean().default(false),
  confidence_score: z.number().min(0).max(1).default(0.95),
});

export type GeminiExtractionOutput = z.infer<typeof GeminiExtractionSchema>;

/**
 * Safely parses and sanitizes raw JSON string returned by Gemini API.
 * Handles fallback cases where responses contain Markdown code blocks (```json ... ```),
 * trailing commas, or invalid escape sequences.
 */
export function parseGeminiJsonResponse(rawText: string): Record<string, any> {
  if (!rawText || typeof rawText !== 'string') {
    return { error: 'Empty or non-string Gemini response' };
  }

  try {
    // 1. Strip Markdown ```json and ``` code block wrappers if present
    let cleaned = rawText.trim();
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');

    // 2. Remove trailing commas before closing braces/brackets
    cleaned = cleaned.replace(/,\s*([\]}])/g, '$1');

    // 3. Attempt direct JSON parsing
    return JSON.parse(cleaned);
  } catch (parseError) {
    // Fallback extraction strategy: regex search for outer JSON object
    const match = rawText.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const sanitizedMatch = match[0].replace(/,\s*([\]}])/g, '$1');
        return JSON.parse(sanitizedMatch);
      } catch {
        // Fallthrough
      }
    }

    return {
      raw_text: rawText,
      parse_failure: true,
      error: (parseError as Error).message,
    };
  }
}

/**
 * Validates scraped job object against Zod schema with error reporting
 */
export function validateJobRecord(record: unknown): { valid: boolean; data?: JobRecordInput; errors?: string[] } {
  const result = JobRecordSchema.safeParse(record);
  if (result.success) {
    return { valid: true, data: result.data };
  } else {
    const issues = result.error?.issues || [];
    const errors = issues.map((e: any) => `${e.path.join('.')}: ${e.message}`);
    return { valid: false, errors };
  }
}

/**
 * Exponential backoff retry utility function for transient API failures
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 200,
  backoffFactor: number = 2
): Promise<T> {
  let attempt = 0;
  let currentDelay = delayMs;

  while (attempt < retries) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= retries) {
        throw err;
      }
      await new Promise(resolve => setTimeout(resolve, currentDelay));
      currentDelay *= backoffFactor;
    }
  }

  throw new Error('Retry attempts exhausted');
}
