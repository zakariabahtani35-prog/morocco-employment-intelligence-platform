import { describe, it, expect } from 'vitest';
import { extractSalaryNumber } from '../supabaseService';
import { SPONSORS_DATA, FAQ_DATA, EVENTS_DATA } from '../../data/mockData';

describe('Technology Stack Integrity & Data Model Tests', () => {
  describe('Mock & Fallback Data Contracts', () => {

    it('defines verified platform partners and sponsors', () => {
      expect(Array.isArray(SPONSORS_DATA)).toBe(true);
      expect(SPONSORS_DATA.length).toBeGreaterThan(0);
      const sponsorNames = SPONSORS_DATA.map(s => s.name);
      expect(sponsorNames.some(name => name.includes('Simplon') || name.includes('Supabase'))).toBe(true);
    });

    it('contains FAQ items explaining architecture & pipelines', () => {
      expect(Array.isArray(FAQ_DATA)).toBe(true);
      expect(FAQ_DATA.length).toBeGreaterThan(0);
      FAQ_DATA.forEach((faq) => {
        expect(faq.question).toBeDefined();
        expect(faq.answer).toBeDefined();
      });
    });

    it('validates pipeline stages data model', () => {
      expect(Array.isArray(EVENTS_DATA)).toBe(true);
      expect(EVENTS_DATA.length).toBeGreaterThan(0);
    });
  });

  describe('Salary Parsing Edge Cases', () => {
    it('handles Moroccan currency formatting (MAD, dhs, DH)', () => {
      expect(extractSalaryNumber('8500 DH')).toBe(8500);
      expect(extractSalaryNumber('14000 MAD')).toBe(14000);
      expect(extractSalaryNumber('10000dhs')).toBe(10000);
    });

    it('calculates midpoint for range salary strings', () => {
      expect(extractSalaryNumber('10000 - 20000 MAD')).toBe(15000);
    });
  });
});
