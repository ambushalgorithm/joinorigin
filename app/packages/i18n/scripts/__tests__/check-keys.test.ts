/**
 * Unit tests for the Sprint 18 check-keys baseline (TASK-411).
 *
 * Guards the EN source-of-truth expectations and the pending-translation
 * contract: every expected key must resolve to a real string in en.json, the
 * pending additions must exist in en.json, the pending removals must be gone,
 * and the two pending sets must never overlap (a key can't be both new and
 * removed).
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { EN_EXPECTATIONS, PENDING_ADDITIONS, PENDING_REMOVALS, lookupPath } from '../check-keys';

const EN_PATH = join(__dirname, '..', '..', 'locales', 'en.json');

function loadEn(): Record<string, unknown> {
  return JSON.parse(readFileSync(EN_PATH, 'utf8')) as Record<string, unknown>;
}

describe('check-keys Sprint 18 baseline (TASK-411)', () => {
  it('every EN expectation resolves to a string in en.json', () => {
    const en = loadEn();
    for (const key of EN_EXPECTATIONS) {
      expect(typeof lookupPath(en, key)).toBe('string');
    }
  });

  it('the EN expectation set is non-trivial (covers all six workstreams)', () => {
    const joined = EN_EXPECTATIONS.join(' ');
    expect(joined).toContain('features.comparison.');
    expect(joined).toContain('seoContent.glossary.terms.');
    expect(joined).toContain('seoContent.guides.');
    expect(joined).toContain('seoContent.location.');
    expect(joined).toContain('seoContent.metadata.');
    expect(EN_EXPECTATIONS.length).toBeGreaterThanOrEqual(80);
  });

  it('every pending addition exists in en.json', () => {
    const en = loadEn();
    expect(PENDING_ADDITIONS.size).toBeGreaterThan(0);
    for (const key of PENDING_ADDITIONS) {
      expect(typeof lookupPath(en, key)).toBe('string');
    }
  });

  it('every pending removal is gone from en.json', () => {
    const en = loadEn();
    expect(PENDING_REMOVALS.size).toBeGreaterThan(0);
    for (const key of PENDING_REMOVALS) {
      expect(lookupPath(en, key)).toBeUndefined();
    }
  });

  it('pending additions and removals are disjoint', () => {
    for (const key of PENDING_ADDITIONS) {
      expect(PENDING_REMOVALS.has(key)).toBe(false);
    }
  });
});
