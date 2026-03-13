import { describe, it, expect } from 'vitest';
import { slugify } from './slugify';

describe('slugify', () => {
  it('converts a normal string to a slug', () => {
    expect(slugify('Network Services')).toBe('network-services');
  });

  it('handles multiple spaces and special characters', () => {
    expect(slugify('Hello   World!!!')).toBe('hello-world');
  });

  it('removes leading and trailing hyphens', () => {
    expect(slugify('--test--')).toBe('test');
  });

  it('handles empty string', () => {
    expect(slugify('')).toBe('');
  });

  it('handles string with only special characters', () => {
    expect(slugify('!!@@##')).toBe('');
  });

  it('preserves numbers', () => {
    expect(slugify('Phase 2 Testing')).toBe('phase-2-testing');
  });

  it('handles already slugified string', () => {
    expect(slugify('already-a-slug')).toBe('already-a-slug');
  });
});
