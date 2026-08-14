import type { MetadataRoute } from 'next';

import sitemap from './sitemap';
import { getDatasetVersion } from '../lib/seo/locationData';
import { indexableLocationEntries, locationPageEntries } from '../lib/seo/locationPages';
import { guidePageEntries, GUIDES_RELEASE_DATE } from '../lib/seo/guides';
import { ROUTES, SITE_RELEASE_DATE } from '../lib/seo/routes';
import { absoluteUrl } from '../lib/seo/url';

/**
 * fe-sitemap-llms sitemap unit tests (TASK-311, design §9.1).
 *
 * Enforces the sitemap invariants:
 *  - parity: every indexable page (ROUTES + indexable location EN/de +
 *    guides + hubs) appears exactly once, and nothing else does,
 *  - determinism: `lastModified` is pinned to the dataset version date /
 *    fixed release dates — never `new Date()`,
 *  - indexation: no Tier-3 / failed-gate page is published (D8),
 *  - Berlin `de` alternates: the 7 de pages are their own URLs and every
 *    Berlin page carries the full hreflang cluster via
 *    `alternates.languages` (en + de + `x-default` → EN).
 */

type SitemapEntry = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: string;
  priority?: number;
  alternates?: { languages?: Record<string, string> };
};

function pathOf(entry: SitemapEntry): string {
  return new URL(entry.url).pathname;
}

function languageKeys(entry: SitemapEntry): Record<string, string> | undefined {
  return entry.alternates?.languages;
}

describe('app/sitemap — parity with live pages', () => {
  const entries = sitemap() as unknown as SitemapEntry[];
  const paths = entries.map(pathOf);

  it('lists every ROUTES page exactly once', () => {
    for (const route of ROUTES) {
      const matches = paths.filter((path) => path === route.path);
      expect(matches).toHaveLength(1);
    }
  });

  it('lists every indexable EN location page exactly once', () => {
    for (const entry of indexableLocationEntries()) {
      expect(paths).toContain(entry.path);
      const matches = paths.filter((path) => path === entry.path);
      expect(matches).toHaveLength(1);
    }
  });

  it('lists every indexable de Berlin page exactly once', () => {
    const de = indexableLocationEntries('de');
    expect(de.length).toBeGreaterThan(0);
    for (const entry of de) {
      expect(paths).toContain(entry.path);
      const matches = paths.filter((path) => path === entry.path);
      expect(matches).toHaveLength(1);
    }
  });

  it('lists every guide page + the guides/glossary hubs exactly once', () => {
    for (const entry of guidePageEntries()) {
      expect(paths).toContain(entry.path);
    }
    expect(paths).toContain('/guides');
    expect(paths).toContain('/glossary');
  });

  it('publishes NO Tier-3 / failed-gate location pages (D8)', () => {
    for (const entry of locationPageEntries()) {
      if (!entry.indexable || entry.tier > 2) {
        expect(paths).not.toContain(entry.path);
      }
    }
  });

  it('publishes exactly the known indexable set (no drift, no orphans)', () => {
    const expected = new Set<string>([
      ...ROUTES.map((route) => route.path),
      ...indexableLocationEntries().map((entry) => entry.path),
      ...indexableLocationEntries('de').map((entry) => entry.path),
      ...guidePageEntries().map((entry) => entry.path),
      '/guides',
      '/glossary',
    ]);
    expect(new Set(paths)).toEqual(expected);
  });
});

describe('app/sitemap — deterministic lastModified (never new Date)', () => {
  const entries = sitemap() as unknown as SitemapEntry[];
  const datasetVersion = getDatasetVersion();
  const expected = new Map<string, string>([
    ...ROUTES.map((route) => [route.path, SITE_RELEASE_DATE] as const),
    ...indexableLocationEntries().map((entry) => [entry.path, entry.lastModified] as const),
    ...indexableLocationEntries('de').map((entry) => [entry.path, entry.lastModified] as const),
    ...guidePageEntries().map((entry) => [entry.path, entry.lastModified] as const),
    ...([
      ['/guides', GUIDES_RELEASE_DATE],
      ['/glossary', GUIDES_RELEASE_DATE],
    ] as const),
  ]);

  it('pins every entry to a deterministic date matching its registry source', () => {
    for (const entry of entries) {
      const path = pathOf(entry);
      expect(entry.lastModified).toBe(expected.get(path));
      expect(String(entry.lastModified)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('location entries use the dataset version date as lastModified', () => {
    for (const entry of indexableLocationEntries()) {
      expect(entry.lastModified).toBe(datasetVersion);
    }
    expect(datasetVersion).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('two calls produce byte-identical output (no new Date / Math.random)', () => {
    expect(sitemap()).toEqual(sitemap());
  });
});

describe('app/sitemap — Berlin de alternates.languages + x-default', () => {
  const entries = sitemap() as unknown as SitemapEntry[];
  const byPath = new Map(entries.map((entry) => [pathOf(entry), entry]));
  const deEntries = indexableLocationEntries('de');
  const enBerlinEntries = indexableLocationEntries().filter((entry) =>
    deEntries.some((de) => de.path === `/de${entry.path}`),
  );

  it('emits the 7 Berlin de pages as their own indexable URLs with a full cluster', () => {
    expect(deEntries).toHaveLength(7);
    for (const entry of deEntries) {
      const sitemapEntry = byPath.get(entry.path);
      expect(sitemapEntry).toBeDefined();
      const languages = languageKeys(sitemapEntry as SitemapEntry);
      expect(languages).toBeDefined();
      // de self + en alternate + x-default → EN canonical.
      expect(languages?.['de']).toBe(absoluteUrl(entry.path));
      expect(languages?.['en']).toBe(absoluteUrl(entry.path.replace(/^\/de/, '')));
      expect(languages?.['x-default']).toBe(absoluteUrl(entry.path.replace(/^\/de/, '')));
    }
  });

  it('EN Berlin pages carry en + de + x-default → EN; EN-only pages emit no cluster', () => {
    for (const entry of indexableLocationEntries()) {
      const sitemapEntry = byPath.get(entry.path) as SitemapEntry;
      if (enBerlinEntries.some((berlin) => berlin.path === entry.path)) {
        const languages = languageKeys(sitemapEntry);
        expect(languages).toBeDefined();
        expect(languages?.['en']).toBe(absoluteUrl(entry.path));
        expect(languages?.['de']).toBe(absoluteUrl(`/de${entry.path}`));
        expect(languages?.['x-default']).toBe(absoluteUrl(entry.path));
      } else {
        // Phase A — EN-only pages (hub/country/region/NYC) have no hreflang.
        expect(languageKeys(sitemapEntry)).toBeUndefined();
      }
    }
  });
});

describe('app/sitemap — changeFrequency/priority per tier', () => {
  const entries = sitemap() as unknown as SitemapEntry[];
  const byPath = new Map(entries.map((entry) => [pathOf(entry), entry]));

  it('location hub is weekly; country/region/city/variant/ideas are monthly', () => {
    const byKind = (kind: string) =>
      indexableLocationEntries().filter((entry) => entry.kind === kind);
    expect(byPath.get('/location')?.changeFrequency).toBe('weekly');
    for (const entry of [...byKind('country'), ...byKind('region')]) {
      expect(byPath.get(entry.path)?.changeFrequency).toBe('monthly');
    }
    for (const entry of [...byKind('city'), ...byKind('variant'), ...byKind('ideas')]) {
      expect(byPath.get(entry.path)?.changeFrequency).toBe('monthly');
    }
  });

  it('location priorities match the registry (hub 0.9 → variant 0.4)', () => {
    for (const entry of indexableLocationEntries()) {
      expect(byPath.get(entry.path)?.priority).toBe(entry.priority);
    }
    expect(byPath.get('/location')?.priority).toBe(0.9);
    const variant = indexableLocationEntries().find((entry) => entry.kind === 'variant');
    expect(byPath.get(variant?.path ?? '')?.priority).toBe(0.4);
  });

  it('ROUTES keep their existing changeFrequency/priority (home weekly 1.0)', () => {
    for (const route of ROUTES) {
      const entry = byPath.get(route.path);
      expect(entry?.changeFrequency).toBe(route.changeFrequency);
      expect(entry?.priority).toBe(route.priority);
    }
    expect(byPath.get('/')?.priority).toBe(1);
  });

  it('guides/hubs use monthly/weekly with guide priority 0.7', () => {
    for (const entry of guidePageEntries()) {
      expect(byPath.get(entry.path)?.changeFrequency).toBe('monthly');
      expect(byPath.get(entry.path)?.priority).toBe(0.7);
    }
    expect(byPath.get('/guides')?.changeFrequency).toBe('weekly');
    expect(byPath.get('/guides')?.priority).toBe(0.8);
    expect(byPath.get('/glossary')?.changeFrequency).toBe('weekly');
  });
});

describe('app/sitemap — absolute URLs and XML-friendly shape', () => {
  const entries = sitemap() as MetadataRoute.Sitemap;

  it('every url is absolute and under the site origin', () => {
    for (const entry of entries) {
      const url = new URL(entry.url);
      expect(url.protocol).toMatch(/^https?:$/);
      expect(url.pathname.startsWith('/')).toBe(true);
    }
  });

  it('alternate language values are absolute URLs', () => {
    for (const entry of entries as unknown as SitemapEntry[]) {
      for (const value of Object.values(languageKeys(entry) ?? {})) {
        expect(value).toMatch(/^https?:\/\//);
      }
    }
  });
});
