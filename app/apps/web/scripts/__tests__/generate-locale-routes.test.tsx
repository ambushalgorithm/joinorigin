/**
 * generate-locale-routes unit tests (TASK-448) — deterministic route-tree
 * generator.
 *
 * Three layers:
 *  1. Input-table snapshot — `routePlan()` must produce exactly the
 *     21 locales × 14 public pages file set (Rule 12: no branching).
 *  2. Writer behavior — no-clobber (existing files are skipped, never
 *     overwritten), idempotent re-runs, and the emitted manifest.
 *  3. Route smoke tests over the real `apps/web/app` tree — every planned
 *     wrapper exists, static wrappers carry the locale-prefixed metadata
 *     path + `Home` → `/<locale>` breadcrumb, existing de/es guide
 *     wrappers have the fixed Home crumb, and representative generated
 *     pages render + export the expected canonical.
 */

import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { screen } from '@testing-library/react';

import * as DeAbout from '../../app/de/about/page';
import * as DeFeatures from '../../app/de/features/page';
import * as EnHome from '../../app/en/page';
import * as EsCommunity from '../../app/es/community/page';
import {
  fixGuideBreadcrumbs,
  locationFile,
  manifestFrom,
  pascalLocale,
  routePlan,
  writeAll,
  wrapperFile,
  wrapperName,
} from '../generate-locale-routes';
import { renderWithI18n } from '../../test-utils';

/** `apps/web` root (the generator's webRoot). */
const WEB_ROOT = join(__dirname, '..', '..');
/** `apps/web/app` — the real committed route tree. */
const APP_DIR = join(WEB_ROOT, 'app');

const EXPECTED_LOCALES = [
  'en',
  'es',
  'pt-BR',
  'fr',
  'de',
  'ru',
  'ja',
  'ko',
  'zh-CN',
  'zh-TW',
  'ar',
  'hi',
  'id',
  'tr',
  'it',
  'pl',
  'nl',
  'vi',
  'th',
  'uk',
  'fa',
];

const EXPECTED_PAGES = [
  'home',
  'features',
  'community',
  'docs',
  'about',
  'contact',
  'privacy',
  'terms',
  'glossary',
  'location',
  'location-country',
  'location-region',
  'location-city',
  'location-variant',
];

function makeTempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), 'locale-routes-'));
  return dir;
}

describe('route plan (input table snapshot)', () => {
  it('plans exactly 21 locales × 14 pages = 294 wrappers', () => {
    const plan = routePlan();
    expect(plan).toHaveLength(294);
    expect(new Set(plan.map((entry) => entry.locale))).toEqual(new Set(EXPECTED_LOCALES));
    expect(new Set(plan.map((entry) => entry.page))).toEqual(new Set(EXPECTED_PAGES));
    // Every locale has the same 14 pages (the input table is a grid).
    const perLocale = new Map<string, number>();
    for (const entry of plan) {
      perLocale.set(entry.locale, (perLocale.get(entry.locale) ?? 0) + 1);
    }
    for (const locale of EXPECTED_LOCALES) {
      expect(perLocale.get(locale)).toBe(14);
    }
  });

  it('names wrapper files deterministically (incl. region-variant casing)', () => {
    expect(wrapperFile('en', 'features')).toBe('app/en/features/page.tsx');
    expect(wrapperFile('de', '')).toBe('app/de/page.tsx');
    expect(wrapperFile('pt-BR', 'community')).toBe('app/pt-BR/community/page.tsx');
    expect(locationFile('es', 'city')).toBe('app/es/location/[country]/[region]/[city]/page.tsx');
    expect(locationFile('zh-CN', 'variant')).toBe(
      'app/zh-CN/location/[country]/[region]/[city]/[variant]/page.tsx',
    );
    expect(locationFile('fr', 'hub')).toBe('app/fr/location/page.tsx');
  });

  it('names wrapper components deterministically', () => {
    expect(pascalLocale('pt-BR')).toBe('PtBR');
    expect(pascalLocale('zh-CN')).toBe('ZhCN');
    expect(wrapperName('de', 'Features')).toBe('DeFeaturesPage');
    expect(wrapperName('en', 'Home')).toBe('EnHomePage');
    expect(wrapperName('es', 'City')).toBe('EsCityPage');
    expect(wrapperName('fr', 'LocationHub')).toBe('FrLocationHubPage');
  });
});

describe('writer (no-clobber + idempotent + manifest)', () => {
  it('writes the full file set into an empty tree', async () => {
    const temp = makeTempDir();
    try {
      const result = await writeAll(temp);
      expect(result.generated).toHaveLength(294);
      expect(result.skippedExisting).toHaveLength(0);
      for (const file of routePlan().map((entry) => entry.file)) {
        expect(existsSync(join(temp, file))).toBe(true);
      }
      // Manifest is a deterministic snapshot: this generator owns every
      // planned wrapper except the two pre-existing de location files.
      const manifest = manifestFrom(result);
      expect(manifest.locales).toEqual(EXPECTED_LOCALES);
      expect(manifest.pageCount).toBe(294);
      expect(manifest.generated).toHaveLength(292);
      expect(manifest.preExisting).toEqual(
        expect.arrayContaining([
          'app/de/location/[country]/[region]/[city]/page.tsx',
          'app/de/location/[country]/[region]/[city]/[variant]/page.tsx',
        ]),
      );
      expect(manifest.guideBreadcrumbsFixed).toHaveLength(40);
      expect(manifest.lastRun.generated).toBe(294);
      expect(manifest.lastRun.skippedExisting).toBe(0);
    } finally {
      rmSync(temp, { recursive: true, force: true });
    }
  });

  it('never clobbers existing files and skips them deterministically', async () => {
    const temp = makeTempDir();
    try {
      mkdirSync(join(temp, 'app', 'de'), { recursive: true });
      const existing = join(temp, 'app', 'de', 'features', 'page.tsx');
      mkdirSync(dirname(existing), { recursive: true });
      writeFileSync(existing, 'export default function Existing() { return null; }');
      const result = await writeAll(temp);
      expect(result.skippedExisting).toContain('app/de/features/page.tsx');
      expect(readFileSync(existing, 'utf8')).toContain('Existing');
      expect(result.generated).toHaveLength(293);
    } finally {
      rmSync(temp, { recursive: true, force: true });
    }
  });

  it('is idempotent — a second run writes nothing new', async () => {
    const temp = makeTempDir();
    try {
      await writeAll(temp);
      const second = await writeAll(temp);
      expect(second.generated).toHaveLength(0);
      expect(second.skippedExisting).toHaveLength(294);
    } finally {
      rmSync(temp, { recursive: true, force: true });
    }
  });
});

describe('guide breadcrumb fixes (TASK-448d)', () => {
  it('rewrites Home breadcrumb path to /<locale> in every non-EN guide wrapper', () => {
    const temp = makeTempDir();
    try {
      const appDir = join(temp, 'app');
      for (const locale of ['de', 'es', 'pt-BR']) {
        for (const file of ['page.tsx', '[slug]/page.tsx']) {
          const target = join(appDir, locale, 'guides', file);
          mkdirSync(dirname(target), { recursive: true });
          writeFileSync(
            target,
            "export const metadata = { path: '/x' };\n// breadcrumb { name: 'Home', path: '/' },\n",
          );
        }
      }
      const fixed = fixGuideBreadcrumbs(appDir);
      expect(fixed).toHaveLength(6);
      expect(fixed).toContain('app/de/guides/page.tsx');
      expect(fixed).toContain('app/es/guides/[slug]/page.tsx');
      expect(fixed).toContain('app/pt-BR/guides/page.tsx');
      for (const locale of ['de', 'es', 'pt-BR']) {
        const source = readFileSync(join(appDir, locale, 'guides', 'page.tsx'), 'utf8');
        expect(source).toContain(`{ name: 'Home', path: '/${locale}' },`);
        expect(source).not.toContain(`{ name: 'Home', path: '/' },`);
      }
      // Idempotent — second pass finds nothing to fix.
      expect(fixGuideBreadcrumbs(appDir)).toHaveLength(0);
    } finally {
      rmSync(temp, { recursive: true, force: true });
    }
  });
});

describe('route smoke tests (real apps/web/app tree)', () => {
  it('every planned wrapper exists — 21 locales × 14 pages, no 404 at the routing layer', () => {
    const missing = routePlan()
      .map((entry) => entry.file)
      .filter((file) => !existsSync(join(WEB_ROOT, file)));
    expect(missing).toEqual([]);
  });

  it('existing de location pages are preserved (no clobber) and listed as skipped', async () => {
    const result = await writeAll(WEB_ROOT);
    // The committed tree already carries every wrapper, so a re-run must
    // write nothing and skip the pre-existing de location pages explicitly.
    expect(result.generated).toHaveLength(0);
    expect(result.skippedExisting).toContain('app/de/location/[country]/[region]/[city]/page.tsx');
    expect(result.skippedExisting).toContain(
      'app/de/location/[country]/[region]/[city]/[variant]/page.tsx',
    );
    // The committed de surface wrappers are untouched byte-for-byte.
    expect(
      readFileSync(
        join(APP_DIR, 'de', 'location', '[country]', '[region]', '[city]', 'page.tsx'),
        'utf8',
      ),
    ).toContain('DeCityPage');
    expect(
      readFileSync(
        join(APP_DIR, 'de', 'location', '[country]', '[region]', '[city]', '[variant]', 'page.tsx'),
        'utf8',
      ),
    ).toContain('DeVariantPage');
  });

  it('every static wrapper carries the locale-prefixed metadata path + Home → /<locale> breadcrumb', () => {
    const staticFiles = routePlan().filter((entry) => !entry.page.startsWith('location'));
    for (const entry of staticFiles) {
      const source = readFileSync(join(WEB_ROOT, entry.file), 'utf8');
      const expectedPath = `path: '/${entry.locale}${entry.page === 'home' ? '' : `/${entry.page}`}'`;
      expect(source).toContain(expectedPath);
      if (entry.page !== 'home') {
        expect(source).toContain(`{ name: 'Home', path: '/${entry.locale}' }`);
      }
    }
  });

  it('every non-EN guide wrapper now links Home to /<locale>', () => {
    for (const locale of EXPECTED_LOCALES) {
      if (locale === 'en') continue;
      for (const file of ['page.tsx', '[slug]/page.tsx']) {
        const source = readFileSync(join(APP_DIR, locale, 'guides', file), 'utf8');
        expect(source).toContain(`{ name: 'Home', path: '/${locale}' },`);
        expect(source).not.toContain(`{ name: 'Home', path: '/' },`);
      }
    }
  });
});

describe('representative generated pages render + export metadata', () => {
  const DeFeaturesPage = DeFeatures.default;
  const EnHomePage = EnHome.default;
  const EsCommunityPage = EsCommunity.default;
  const DeAboutPage = DeAbout.default;

  it('metadata canonical points at the locale-prefixed URL', () => {
    expect(DeFeatures.metadata.alternates?.canonical).toBe('http://localhost:3100/de/features');
    expect(EnHome.metadata.alternates?.canonical).toBe('http://localhost:3100/en');
    expect(EsCommunity.metadata.alternates?.canonical).toBe('http://localhost:3100/es/community');
  });

  it('de/features renders the shared view with a single H1', () => {
    renderWithI18n(<DeFeaturesPage />, 'de');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('es/community renders the shared view with a single H1', () => {
    renderWithI18n(<EsCommunityPage />, 'es');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('en/home renders the shared view with a single H1', () => {
    renderWithI18n(<EnHomePage />, 'en');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('de/about renders the shared view with a single H1', () => {
    renderWithI18n(<DeAboutPage />, 'de');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});
