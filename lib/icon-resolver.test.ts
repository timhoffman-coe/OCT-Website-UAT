import { describe, it, expect } from 'vitest';
import { resolveIcon, availableIcons } from './icon-resolver';
import { Network, Server, Shield } from 'lucide-react';

describe('resolveIcon', () => {
  it('returns the correct icon for a known name', () => {
    expect(resolveIcon('Network')).toBe(Network);
  });

  it('returns Server as fallback for unknown names', () => {
    expect(resolveIcon('UnknownIcon')).toBe(Server);
  });

  it('returns Server for empty string', () => {
    expect(resolveIcon('')).toBe(Server);
  });

  it('resolves Shield icon', () => {
    expect(resolveIcon('Shield')).toBe(Shield);
  });
});

describe('availableIcons', () => {
  it('contains expected icon names', () => {
    expect(availableIcons).toContain('Network');
    expect(availableIcons).toContain('Server');
    expect(availableIcons).toContain('Database');
    expect(availableIcons).toContain('Shield');
  });

  it('has the right count of icons', () => {
    expect(availableIcons.length).toBe(20);
  });
});
