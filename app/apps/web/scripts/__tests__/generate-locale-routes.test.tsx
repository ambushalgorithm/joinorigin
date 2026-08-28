/**
 * generate-locale-routes unit tests (TASK-448) — deterministic route-tree
 * generator.
 *
 * Three layers:
 *  1. Input-table snapshot — `routePlan()` must produce exactly the
 *     21 locales × 17 public pages file set (Rule 12: no branching).
 *  2. Writer behavior — no-clobber (existing files are skipped, never
 *     overwritten), idempotent re-runs, and the emitted manifest.
 *  3. Route smoke tests over the real `apps/web/app` tree — every planned
 *     wrapper exists, static wrappers carry the locale-prefixed metadata
 *     path + `Home` → `/<locale>` breadcrumb, existing de/es guide
 *     wrappers have the fixed Home crumb, and representative generated
 *     pages render + export the expected canonical.
 *
 * Story B (TASK-547/TASK-548): the generated home + network wrappers pass
 * the server-rendered `ChipMarqueeServer` into the view's `marquee` slot
 * (mirroring the hand-written EN wrappers). That server component reads
 * `next/headers` (geo + locale), so this suite mocks it — its own behavior
 * is covered in `components/ChipMarqueeServer.test.tsx` — and asserts the
 * slot wiring at both the source level (every locale surface) and through
 * the mock being instantiated when a generated page renders.
 */

import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { screen } from '@testing-library/react';

import * as DeAbout from '../../app/de/about/page';
import * as DeFeatures from '../../app/de/features/page';
import * as EnHome from '../../app/en/page';
import * as EsNetwork from '../../app/es/network/page';
import ChipMarqueeServer from '../../components/ChipMarqueeServer';
import {
  fixGuideBreadcrumbs,
  guideFile,
  locationFile,
  manifestFrom,
  pascalLocale,
  routePlan,
  writeAll,
  wrapperFile,
  wrapperName,
} from '../generate-locale-routes';
import { renderWithI18n } from '../../test-utils';

jest.mock('../../components/ChipMarqueeServer', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

const mockChipMarqueeServer = ChipMarqueeServer as jest.Mock;

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
  'network',
  'docs',
  'about',
  'contact',
  'privacy',
  'terms',
  'glossary',
  'signup',
  'location',
  'location-country',
  'location-region',
  'location-city',
  'location-variant',
  'guides',
  'guides-slug',
];

function makeTempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), 'locale-routes-'));
  return dir;
}

describe('route plan (input table snapshot)', () => {
  it('plans exactly 21 locales × 17 pages = 357 wrappers', () => {
    const plan = routePlan();
    expect(plan).toHaveLength(357);
    expect(new Set(plan.map((entry) => entry.locale))).toEqual(new Set(EXPECTED_LOCALES));
    expect(new Set(plan.map((entry) => entry.page))).toEqual(new Set(EXPECTED_PAGES));
    // Every locale has the same 17 pages (the input table is a grid).
    const perLocale = new Map<string, number>();
    for (const entry of plan) {
      perLocale.set(entry.locale, (perLocale.get(entry.locale) ?? 0) + 1);
    }
    for (const locale of EXPECTED_LOCALES) {
      expect(perLocale.get(locale)).toBe(17);
    }
  });

  it('names wrapper files deterministically (incl. region-variant casing)', () => {
    expect(wrapperFile('en', 'features')).toBe('app/en/features/page.tsx');
    expect(wrapperFile('de', '')).toBe('app/de/page.tsx');
    expect(wrapperFile('pt-BR', 'network')).toBe('app/pt-BR/network/page.tsx');
    expect(locationFile('es', 'city')).toBe('app/es/location/[country]/[region]/[city]/page.tsx');
    expect(locationFile('zh-CN', 'variant')).toBe(
      'app/zh-CN/location/[country]/[region]/[city]/[variant]/page.tsx',
    );
    expect(locationFile('fr', 'hub')).toBe('app/fr/location/page.tsx');
    expect(guideFile('en', 'hub')).toBe('app/en/guides/page.tsx');
    expect(guideFile('de', 'slug')).toBe('app/de/guides/[slug]/page.tsx');
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
      expect(result.generated).toHaveLength(357);
      expect(result.skippedExisting).toHaveLength(0);
      for (const file of routePlan().map((entry) => entry.file)) {
        expect(existsSync(join(temp, file))).toBe(true);
      }
      // Manifest is a deterministic snapshot: the generator owns every
      // planned wrapper (TASK-453 regenerated the whole location + guide
      // surface, so preExisting is empty).
      const manifest = manifestFrom(result);
      expect(manifest.locales).toEqual(EXPECTED_LOCALES);
      expect(manifest.pageCount).toBe(357);
      expect(manifest.generated).toHaveLength(357);
      expect(manifest.preExisting).toEqual([]);
      expect(manifest.guideBreadcrumbsFixed).toHaveLength(40);
      expect(manifest.lastRun.generated).toBe(357);
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
      expect(result.generated).toHaveLength(356);
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
      expect(second.skippedExisting).toHaveLength(357);
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
  it('every planned wrapper exists — 21 locales × 17 pages, no 404 at the routing layer', () => {
    const missing = routePlan()
      .map((entry) => entry.file)
      .filter((file) => !existsSync(join(WEB_ROOT, file)));
    expect(missing).toEqual([]);
  });

  it('a non-force re-run on the committed tree writes nothing (idempotent, no clobber)', async () => {
    const result = await writeAll(WEB_ROOT);
    // The committed tree already carries every wrapper (TASK-453 regenerated
    // the full location + guide surface), so a re-run writes nothing and
    // skips every planned file deterministically.
    expect(result.generated).toHaveLength(0);
    expect(result.skippedExisting).toHaveLength(357);
  });

  it('every location wrapper is force-dynamic, resolves the locale entry with EN fallback, and renders the locale body', () => {
    const locationFiles = routePlan().filter((entry) => entry.page.startsWith('location'));
    for (const entry of locationFiles) {
      const source = readFileSync(join(WEB_ROOT, entry.file), 'utf8');
      // DYNAMIC_SERVER_USAGE fix: no SSG/ISR contract on generated locale
      // location wrappers (the root layout reads headers()).
      expect(source).toContain("export const dynamic = 'force-dynamic';");
      expect(source).not.toContain('export const revalidate');
      expect(source).not.toContain('generateStaticParams');
      expect(source).not.toContain('warmParamsForLocale');
      expect(source).toContain('localizeMetadata');
      if (entry.page !== 'location') {
        // Locale entry resolution with EN fallback (TASK-458): per-locale
        // metadata where committed content exists, localized EN otherwise.
        const paramNames: Record<string, string[]> = {
          'location-country': ['country'],
          'location-region': ['country', 'region'],
          'location-city': ['country', 'region', 'city'],
          'location-variant': ['country', 'region', 'city', 'variant'],
        };
        const paramsObject = paramNames[entry.page].join(', ');
        expect(source).toContain(
          `const localeEntry = resolveLocationEntry({ ${paramsObject} }, '${entry.locale}');`,
        );
        expect(source).toContain(
          `const entry = localeEntry ?? resolveLocationEntry({ ${paramsObject} });`,
        );
        expect(source).toContain('localeEntry');
        expect(source).toContain('locationMetadata(localeEntry)');
        expect(source).toContain(
          `localizeMetadata(locationMetadata(entry), '${entry.locale}', entry.path)`,
        );
        // Active-locale view data stays on the locale surface.
        expect(source).toContain(`buildLocationViewData(entry, '${entry.locale}')`);
      } else {
        // Hub metadata localizes the EN hub copy onto /<locale>/location.
        expect(source).toContain(
          `localizeMetadata(locationMetadata(entry), '${entry.locale}', entry.path)`,
        );
        // TASK-480 contract (now encoded in the generator template): the hub
        // threads the proxy-forwarded IP country into the view data so the
        // "Browse locations" directory orders IP-country → locale-language →
        // alphabetical (mirrors the hand-written `app/location/page.tsx`).
        expect(source).toContain("import { getServerCountry } from '../../../lib/seo/geo';");
        expect(source).toContain(
          `buildLocationViewData(entry, '${entry.locale}', await getServerCountry())`,
        );
      }
    }
  });

  it('every guide detail wrapper EN-falls-back and every guide hub lists all guides', () => {
    for (const locale of EXPECTED_LOCALES) {
      const hub = readFileSync(join(APP_DIR, locale, 'guides', 'page.tsx'), 'utf8');
      const detail = readFileSync(join(APP_DIR, locale, 'guides', '[slug]', 'page.tsx'), 'utf8');
      expect(hub).toContain(`guidePageEntriesWithFallback('${locale}')`);
      expect(detail).toContain(`guidePageForLocale(slug, '${locale}') ?? guidePageForLocale(slug)`);
      // Per-locale metadata with EN fallback: the surface locale is passed
      // to guidePageMetadata so canonical/hreflang stay on /<locale>/guides.
      expect(detail).toContain(`guidePageMetadata(entry, '${locale}')`);
      expect(detail).toContain('export function generateStaticParams()');
      expect(detail).toContain('GUIDE_SLUGS.map');
    }
  });

  it('every static wrapper carries the locale-prefixed metadata path + locale + Home → /<locale> breadcrumb', () => {
    const staticFiles = routePlan().filter(
      (entry) => !entry.page.startsWith('location') && !entry.page.startsWith('guides'),
    );
    for (const entry of staticFiles) {
      const source = readFileSync(join(WEB_ROOT, entry.file), 'utf8');
      const expectedPath = `path: '/${entry.locale}${entry.page === 'home' ? '' : `/${entry.page}`}'`;
      expect(source).toContain(expectedPath);
      // Per-locale metadata (TASK-458): createMetadata receives the active
      // locale so canonical + hreflang stay per-locale (x-default → EN).
      expect(source).toContain(`locale: '${entry.locale}',`);
      if (entry.page !== 'home') {
        expect(source).toContain(`{ name: 'Home', path: '/${entry.locale}' }`);
      }
    }
  });

  it('every home + network wrapper passes ChipMarqueeServer into the view marquee slot (Story B mirror)', () => {
    for (const locale of EXPECTED_LOCALES) {
      // app/<locale>/page.tsx — HomeView marquee slot (depth 2 → components).
      const home = readFileSync(join(APP_DIR, locale, 'page.tsx'), 'utf8');
      expect(home).toContain("import ChipMarqueeServer from '../../components/ChipMarqueeServer';");
      expect(home).toContain('<HomeView marquee={<ChipMarqueeServer />} />');
      expect(home).not.toContain('<HomeView />');

      // app/<locale>/network/page.tsx — NetworkView marquee slot (depth 3).
      const network = readFileSync(join(APP_DIR, locale, 'network', 'page.tsx'), 'utf8');
      expect(network).toContain(
        "import ChipMarqueeServer from '../../../components/ChipMarqueeServer';",
      );
      expect(network).toContain('<NetworkView marquee={<ChipMarqueeServer />} />');
      expect(network).not.toContain('<NetworkView />');
    }
  });

  it('every guide wrapper links Home to /<locale> (incl. the en surface)', () => {
    for (const locale of EXPECTED_LOCALES) {
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
  const EsNetworkPage = EsNetwork.default;
  const DeAboutPage = DeAbout.default;

  it('metadata canonical points at the locale-prefixed URL', () => {
    expect(DeFeatures.metadata.alternates?.canonical).toBe('http://localhost:3100/de/features');
    expect(EnHome.metadata.alternates?.canonical).toBe('http://localhost:3100/en');
    expect(EsNetwork.metadata.alternates?.canonical).toBe('http://localhost:3100/es/network');
  });

  it('non-EN static metadata carries per-locale hreflang with x-default → /en/ canonical', () => {
    expect(DeFeatures.metadata.alternates?.languages).toEqual({
      de: 'http://localhost:3100/de/features',
      en: 'http://localhost:3100/en/features',
      'x-default': 'http://localhost:3100/en/features',
    });
    expect(EsNetwork.metadata.alternates?.languages).toEqual({
      es: 'http://localhost:3100/es/network',
      en: 'http://localhost:3100/en/network',
      'x-default': 'http://localhost:3100/en/network',
    });
  });

  it('EN static metadata emits the FULL 21-locale cluster (canonical /en/, G-10)', () => {
    expect(EnHome.metadata.alternates?.canonical).toBe('http://localhost:3100/en');
    const languages = EnHome.metadata.alternates?.languages as Record<string, string>;
    expect(languages.en).toBe('http://localhost:3100/en');
    expect(languages.de).toBe('http://localhost:3100/de');
    expect(languages['x-default']).toBe('http://localhost:3100/en');
    expect(Object.keys(languages)).toHaveLength(21 + 1);
  });

  it('de/features renders the shared view with a single H1', () => {
    renderWithI18n(<DeFeaturesPage />, 'de');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('es/network renders the shared view with a single H1', () => {
    renderWithI18n(<EsNetworkPage />, 'es');
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

  it('generated home + network wrappers pass <ChipMarqueeServer /> into the view marquee slot (Story B mirror)', () => {
    mockChipMarqueeServer.mockClear();
    renderWithI18n(<EnHomePage />, 'en');
    // The wrapper renders <HomeView marquee={<ChipMarqueeServer />} /> — the
    // mock is instantiated exactly once (the view renders the slot).
    expect(mockChipMarqueeServer).toHaveBeenCalledTimes(1);

    mockChipMarqueeServer.mockClear();
    renderWithI18n(<EsNetworkPage />, 'es');
    expect(mockChipMarqueeServer).toHaveBeenCalledTimes(1);
  });
});
