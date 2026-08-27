import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { SUPPORTED_LOCALES } from '../resolve';
import { getDictionary, getT, loadDictionary, lookup } from '../loader';
import type { Dictionary } from '../types';
import { PENDING_ADDITIONS, PENDING_REMOVALS } from '../../scripts/check-keys';

const LOCALES_DIR = join(__dirname, '..', '..', 'locales');

function flattenKeys(
  obj: Record<string, unknown>,
  prefix = '',
  keys: Set<string> = new Set(),
): Set<string> {
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenKeys(value as Record<string, unknown>, full, keys);
    } else {
      keys.add(full);
    }
  }
  return keys;
}

describe('dictionary loading — every locale JSON (arch-i18n §10.1)', () => {
  it('exposes exactly the 21 supported locales', () => {
    expect(SUPPORTED_LOCALES).toHaveLength(21);
  });

  it('getDictionary strips the reserved dir metadata key', () => {
    const en = getDictionary('en');
    expect('dir' in en).toBe(false);
    expect(en.home).toBeDefined();
  });

  it('every locale parses and mirrors en.json key-for-key (minus dir)', () => {
    const enRaw = JSON.parse(readFileSync(join(LOCALES_DIR, 'en.json'), 'utf8')) as Record<
      string,
      unknown
    >;
    const enKeys = flattenKeys(enRaw);

    for (const locale of SUPPORTED_LOCALES) {
      const raw = JSON.parse(readFileSync(join(LOCALES_DIR, `${locale}.json`), 'utf8')) as Record<
        string,
        unknown
      >;
      const keys = flattenKeys(raw);

      // Sprint 18 (TASK-411): en.json gained new keys that the per-locale
      // i18n-{locale}-s18 roles translate in parallel, and dropped keys those
      // roles are still cleaning up. During the transition a locale may be
      // missing exactly PENDING_ADDITIONS and may carry exactly
      // PENDING_REMOVALS — any other diff is drift and fails (mirrors
      // scripts/check-keys.ts). Once all locales land, parity is exact again.
      const missing = [...enKeys].filter((key) => !keys.has(key));
      const extra = [...keys].filter((key) => !enKeys.has(key));
      for (const key of missing) {
        expect(PENDING_ADDITIONS.has(key)).toBe(true);
      }
      for (const key of extra) {
        expect(PENDING_REMOVALS.has(key)).toBe(true);
      }

      expect(raw.dir).toBe(locale === 'ar' || locale === 'fa' ? 'rtl' : 'ltr');
      expect(getDictionary(locale)).toBeDefined();
    }
  });

  it('loadDictionary resolves every locale asynchronously', async () => {
    for (const locale of SUPPORTED_LOCALES) {
      const dict = await loadDictionary(locale);
      expect(dict.home).toBeDefined();
    }
  });

  it('every value is a JSON string (arch-i18n §4.1 — no arrays/numbers/booleans)', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const dict = getDictionary(locale);
      for (const value of Object.values(flattenValues(dict))) {
        expect(typeof value).toBe('string');
      }
    }
  });
});

function flattenValues(
  obj: Record<string, unknown>,
  prefix = '',
  out: Record<string, unknown> = {},
): Record<string, unknown> {
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenValues(value as Record<string, unknown>, full, out);
    } else {
      out[full] = value;
    }
  }
  return out;
}

describe('getT — synchronous server t() (arch-i18n §3.3)', () => {
  it('resolves dotted keys', () => {
    const t = getT(getDictionary('en'));
    expect(t('header.logIn')).toBe('Log In');
    expect(t('footer.tagline')).toBe('Where teams find their Origin');
  });

  it('interpolates {{variables}}', () => {
    const t = getT(getDictionary('en'));
    expect(t('home.hero.trustAvatarsAlt', { number: 3 })).toBe('JoinOrigin member 3');
    expect(t('contact.mailtoSubject', { name: 'Ada' })).toBe('JoinOrigin contact — Ada');
  });

  it('returns the key when missing', () => {
    const t = getT(getDictionary('en'));
    expect(t('missing.key')).toBe('missing.key');
  });
});

describe('origin repositioning EN copy (TASK-565 — sprint-24-origin-reframe-copy.md)', () => {
  it('home hero headline ends on the brand accent token', () => {
    const t = getT(getDictionary('en'));
    expect(t('home.hero.headline')).toBe(
      'Where every idea, startup, and project finds the people and resources to move it forward — Origin.',
    );
    expect(t('home.hero.headlineAccent')).toBe('Origin.');
  });

  it('home definition teaches the Origin noun (no community lead)', () => {
    const t = getT(getDictionary('en'));
    expect(t('home.definition')).toBe(
      'Origin is the space you start around a goal — an idea, a startup, a small business, or a project. Bring the people and resources it needs, and move it forward together: co-founders, partners, clients, supporters, and your network. JoinOrigin is the brand and the network behind it.',
    );
  });

  it('CTA band headline and subline are Origin-first (decision C)', () => {
    const t = getT(getDictionary('en'));
    expect(t('ctaBand.headline')).toBe(
      'Start an Origin. Find the people and resources to move it forward.',
    );
    expect(t('ctaBand.subline')).toContain('gathering people and resources on Origin');
  });

  it('roadmap phase 1 is renamed Origin Foundation', () => {
    const t = getT(getDictionary('en'));
    expect(t('common.roadmap.phase1Title')).toBe('Phase 1 — Origin Foundation');
    expect(t('features.roadmap.phase1.body')).toBe(
      'Profiles, Origins, chat, and the social graph. Success metric: members forming durable Origins.',
    );
  });

  it('core object communities card is renamed Origins (decision B)', () => {
    const t = getT(getDictionary('en'));
    expect(t('common.objects.communities')).toBe('Origins');
    expect(t('features.coreObjects.communities.body')).toBe(
      'The space you start around a goal — a startup, a small business, a book club, or any idea. Every Origin gathers the people who share it and comes with its own room where the work moves forward.',
    );
  });

  it('signup success copy uses the brand echo (decision D)', () => {
    const t = getT(getDictionary('en'));
    expect(t('signup.successCopy')).toBe("We'll email you when your Origin is ready.");
  });
});

describe('lookup — dot-path access', () => {
  it('returns nested values', () => {
    const dict = getDictionary('en') as Dictionary;
    expect(lookup(dict, 'home.hero.headlineAccent')).toBe('Origin.');
    expect(lookup(dict, 'nope')).toBeUndefined();
  });
});
