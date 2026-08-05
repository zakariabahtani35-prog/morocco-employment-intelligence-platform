import { describe, it, expect, vi } from 'vitest';
import { extractSalaryNumber } from '../supabaseService';
import { 
  parseIntelligenceJsonResponse, 
  validateJobRecord, 
  retryWithBackoff,
  IntelligenceExtractionSchema
} from '../pipelineValidator';

describe('MEIP Salary Parser (extractSalaryNumber)', () => {
  it('correctly parses integer and float salary strings in MAD', () => {
    expect(extractSalaryNumber('15000 MAD')).toBe(15000);
    expect(extractSalaryNumber('12000 - 18000 MAD')).toBe(15000);
    expect(extractSalaryNumber(22000)).toBe(22000);
  });

  it('returns null for empty or invalid salary inputs', () => {
    expect(extractSalaryNumber(null)).toBeNull();
    expect(extractSalaryNumber('')).toBeNull();
    expect(extractSalaryNumber('Negotiable')).toBeNull();
  });
});

describe('Intelligence Engine JSON Response Parser (parseIntelligenceJsonResponse)', () => {
  it('parses valid raw JSON cleanly', () => {
    const raw = '{"normalized_title": "React Engineer", "confidence_score": 0.98}';
    const parsed = parseIntelligenceJsonResponse(raw);
    expect(parsed.normalized_title).toBe('React Engineer');
    expect(parsed.confidence_score).toBe(0.98);
  });

  it('strips markdown code block wrappers (```json ... ```)', () => {
    const raw = `\`\`\`json
{
  "technical_skills": ["Python", "PostgreSQL", "Docker"]
}
\`\`\``;
    const parsed = parseIntelligenceJsonResponse(raw);
    expect(parsed.technical_skills).toEqual(['Python', 'PostgreSQL', 'Docker']);
  });

  it('handles trailing commas gracefully without crashing', () => {
    const raw = '{"title": "Data Analyst", "skills": ["SQL", "PowerBI",],}';
    const parsed = parseIntelligenceJsonResponse(raw);
    expect(parsed.title).toBe('Data Analyst');
  });

  it('validates outputs with IntelligenceExtractionSchema Zod model', () => {
    const raw = '{"normalized_title": "AI Architect", "technical_skills": ["PyTorch", "CUDA"], "confidence_score": 0.99}';
    const parsed = parseIntelligenceJsonResponse(raw);
    const validated = IntelligenceExtractionSchema.parse(parsed);
    expect(validated.normalized_title).toBe('AI Architect');
    expect(validated.technical_skills).toContain('PyTorch');
  });
});

describe('Zod Scraped Job Validation (validateJobRecord)', () => {
  it('validates a correct job record', () => {
    const job = {
      title: 'Senior Data Engineer',
      company: 'Capgemini Morocco',
      location: 'Casablanca',
      sector: 'IT',
      salary: '25000 MAD',
      contract_type: 'CDI',
    };
    const result = validateJobRecord(job);
    expect(result.valid).toBe(true);
    expect(result.data?.title).toBe('Senior Data Engineer');
  });

  it('fails validation when mandatory fields (title, company) are missing', () => {
    const badJob = {
      location: 'Rabat',
    };
    const result = validateJobRecord(badJob);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
  });
});

describe('Exponential Backoff Retry Utility (retryWithBackoff)', () => {
  it('returns result on first attempt if successful', async () => {
    const fn = vi.fn().mockResolvedValue('success');
    const res = await retryWithBackoff(fn, 3, 10);
    expect(res).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries on failure and succeeds eventually', async () => {
    let calls = 0;
    const fn = vi.fn().mockImplementation(async () => {
      calls++;
      if (calls < 2) throw new Error('Network error');
      return 'recovered';
    });

    const res = await retryWithBackoff(fn, 3, 10);
    expect(res).toBe('recovered');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('throws final error if retries exhaust', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('Persistent outage'));
    await expect(retryWithBackoff(fn, 2, 10)).rejects.toThrow('Persistent outage');
  });
});
