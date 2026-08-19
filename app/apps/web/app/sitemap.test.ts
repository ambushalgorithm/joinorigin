import type { MetadataRoute } from 'next';

import { SUPPORTED_LOCALES, type Locale } from '@joinorigin/i18n';

import sitemap from './sitemap';
import { getDatasetVersion } from '../lib/seo/locationData';
import { indexableLocationEntries, locationPageEntries } from '../lib/seo/locationPages';
import { GUIDE_SLUGS, guidePageEntries, GUIDES_RELEASE_DATE } from '../lib/seo/guides';
import { ROUTES, SITE_RELEASE_DATE } from '../lib/seo/routes';
import { absoluteUrl } from '../lib/seo/url';

/**
 * fe-sitemap-llms sitemap unit tests (TASK-311, design §9.1), extended for
 * Sprint 19 (TASK-459): the sitemap covers all 21 locale surfaces — every
 * page (static routes, location registry, guides, hubs) × every locale at
 * `/<locale>/...` as its own indexable URL, each with the full hreflang
 * cluster (`x-default` → EN canonical).
 *
 * Enforces the sitemap invariants:
 *  - parity: for every locale, every indexable page (static routes +
 *    indexable locations + guides + hubs) appears exactly once, and nothing
 *    else does (no drift, no orphans),
 *  - determinism: `lastModified` is pinned to the dataset version date /
 *    fixed release dates — never `new Date()`,
 *  - indexation: no Tier-3 / failed-gate page is published (D8),
 *  - hreflang: every non-EN URL carries self + `en` + `x-default` → EN
 *    canonical; every EN URL carries the full cluster of live alternates
 *    (all 21 locales for static routes / guides / hubs; committed content
 *    only for locations — Berlin `de`).
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

/** Path of a page on a locale surface — home `/<locale>`, others
 *  `/<locale>/<route>`; the EN surface stays unprefixed (canonical). */
function prefixedPath(locale: Locale, path: string): string {
  if (locale === 'en') return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

describe('app/sitemap — parity with live pages across all 21 locale surfaces', () => {
  const entries = sitemap() as unknown as SitemapEntry[];
  const paths = entries.map(pathOf);

  it('lists every ROUTES page exactly once per locale surface', () => {
    for (const locale of SUPPORTED_LOCALES) {
      for (const route of ROUTES) {
        const path = prefixedPath(locale, route.path);
        const matches = paths.filter((candidate) => candidate === path);
        expect(matches).toHaveLength(1);
      }
    }
  });

  it('lists the glossary + guides hubs exactly once per locale surface', () => {
    for (const locale of SUPPORTED_LOCALES) {
      for (const path of [prefixedPath(locale, '/glossary'), prefixedPath(locale, '/guides')]) {
        expect(paths).toContain(path);
        const matches = paths.filter((candidate) => candidate === path);
        expect(matches).toHaveLength(1);
      }
    }
  });

  it('lists every indexable location page exactly once per locale surface', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const localeEntries = indexableLocationEntries(locale);
      for (const entry of localeEntries) {
        expect(paths).toContain(entry.path);
        const matches = paths.filter((candidate) => candidate === entry.path);
        expect(matches).toHaveLength(1);
      }
    }
  });

  it('lists the full EN location registry + the committed de Berlin surface', () => {
    const en = indexableLocationEntries();
    expect(en.length).toBeGreaterThan(0);
    const de = indexableLocationEntries('de');
    expect(de).toHaveLength(7);
    for (const entry of de) {
      expect(paths).toContain(entry.path);
      expect(entry.path.startsWith('/de/location/germany/berlin')).toBe(true);
    }
    // Every other non-EN locale has committed location content → no URLs.
    for (const locale of SUPPORTED_LOCALES) {
      if (locale === 'en' || locale === 'de') continue;
      expect(indexableLocationEntries(locale)).toHaveLength(0);
    }
  });

  it('lists every guide page exactly once per locale surface', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const guides = guidePageEntries(locale);
      if (locale === 'en') {
        expect(guides).toHaveLength(GUIDE_SLUGS.length);
      } else {
        expect(guides.length).toBeGreaterThan(0);
      }
      for (const entry of guides) {
        expect(paths).toContain(entry.path);
        const matches = paths.filter((candidate) => candidate === entry.path);
        expect(matches).toHaveLength(1);
      }
    }
  });

  it('publishes NO Tier-3 / failed-gate location pages (D8)', () => {
    for (const locale of SUPPORTED_LOCALES) {
      for (const entry of locationPageEntries(locale)) {
        if (!entry.indexable || entry.tier > 2) {
          expect(paths).not.toContain(entry.path);
        }
      }
    }
  });

  it('publishes exactly the known indexable set (no drift, no orphans)', () => {
    const expected = new Set<string>();
    for (const locale of SUPPORTED_LOCALES) {
      for (const route of ROUTES) expected.add(prefixedPath(locale, route.path));
      expected.add(prefixedPath(locale, '/glossary'));
      for (const entry of indexableLocationEntries(locale)) expected.add(entry.path);
      for (const entry of guidePageEntries(locale)) expected.add(entry.path);
      expected.add(prefixedPath(locale, '/guides'));
    }
    expect(new Set(paths)).toEqual(expected);
  });
});

describe('app/sitemap — deterministic lastModified (never new Date)', () => {
  const entries = sitemap() as unknown as SitemapEntry[];
  const datasetVersion = getDatasetVersion();

  const expected = new Map<string, string>();
  for (const locale of SUPPORTED_LOCALES) {
    for (const route of ROUTES) expected.set(prefixedPath(locale, route.path), SITE_RELEASE_DATE);
    expected.set(prefixedPath(locale, '/glossary'), GUIDES_RELEASE_DATE);
    for (const entry of indexableLocationEntries(locale)) {
      expected.set(entry.path, entry.lastModified);
    }
    for (const entry of guidePageEntries(locale)) {
      expected.set(entry.path, entry.lastModified);
    }
    expected.set(prefixedPath(locale, '/guides'), GUIDES_RELEASE_DATE);
  }

  it('pins every entry to a deterministic date matching its registry source', () => {
    expect(entries.length).toBe(expected.size);
    for (const entry of entries) {
      const path = pathOf(entry);
      expect(entry.lastModified).toBe(expected.get(path));
      expect(String(entry.lastModified)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('location entries use the dataset version date as lastModified', () => {
    for (const locale of SUPPORTED_LOCALES) {
      for (const entry of indexableLocationEntries(locale)) {
        expect(entry.lastModified).toBe(datasetVersion);
      }
    }
    expect(datasetVersion).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('two calls produce byte-identical output (no new Date / Math.random)', () => {
    expect(sitemap()).toEqual(sitemap());
  });
});

describe('app/sitemap — hreflang clusters across all 21 locale surfaces', () => {
  const entries = sitemap() as unknown as SitemapEntry[];
  const byPath = new Map(entries.map((entry) => [pathOf(entry), entry]));
  const deEntries = indexableLocationEntries('de');
  const enBerlinPaths = new Set(deEntries.map((de) => de.path.replace(/^\/de/, '')));

  it('emits every indexable de Berlin page as its own indexable URL with a full cluster', () => {
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

  it('every non-EN location/guide page carries self + en + x-default → EN canonical', () => {
    for (const locale of SUPPORTED_LOCALES) {
      if (locale === 'en') continue;
      for (const entry of [...indexableLocationEntries(locale), ...guidePageEntries(locale)]) {
        const languages = languageKeys(byPath.get(entry.path) as SitemapEntry);
        expect(languages).toBeDefined();
        const enPath = entry.path.replace(new RegExp(`^/${locale}`), '');
        expect(languages?.[locale]).toBe(absoluteUrl(entry.path));
        expect(languages?.['en']).toBe(absoluteUrl(enPath));
        expect(languages?.['x-default']).toBe(absoluteUrl(enPath));
      }
    }
  });

  it('every non-EN static page + guides hub carries self + en + x-default → EN canonical', () => {
    for (const locale of SUPPORTED_LOCALES) {
      if (locale === 'en') continue;
      for (const route of ROUTES) {
        const path = prefixedPath(locale, route.path);
        const languages = languageKeys(byPath.get(path) as SitemapEntry);
        expect(languages).toBeDefined();
        expect(languages?.[locale]).toBe(absoluteUrl(path));
        expect(languages?.['en']).toBe(absoluteUrl(route.path));
        expect(languages?.['x-default']).toBe(absoluteUrl(route.path));
      }
      for (const path of [prefixedPath(locale, '/glossary'), prefixedPath(locale, '/guides')]) {
        const languages = languageKeys(byPath.get(path) as SitemapEntry);
        expect(languages).toBeDefined();
        expect(languages?.[locale]).toBe(absoluteUrl(path));
        expect(languages?.['en']).toBe(absoluteUrl(path.replace(new RegExp(`^/${locale}`), '')));
        expect(languages?.['x-default']).toBe(
          absoluteUrl(path.replace(new RegExp(`^/${locale}`), '')),
        );
      }
    }
  });

  it('EN static routes, guides, and hubs carry the full 21-locale cluster', () => {
    for (const route of ROUTES) {
      const languages = languageKeys(byPath.get(route.path) as SitemapEntry);
      expect(languages).toBeDefined();
      for (const locale of SUPPORTED_LOCALES) {
        expect(languages?.[locale]).toBe(absoluteUrl(prefixedPath(locale, route.path)));
      }
      expect(languages?.['x-default']).toBe(absoluteUrl(route.path));
    }
    for (const path of ['/glossary', '/guides']) {
      const languages = languageKeys(byPath.get(path) as SitemapEntry);
      expect(languages).toBeDefined();
      for (const locale of SUPPORTED_LOCALES) {
        expect(languages?.[locale]).toBe(absoluteUrl(prefixedPath(locale, path)));
      }
      expect(languages?.['x-default']).toBe(absoluteUrl(path));
    }
    for (const entry of guidePageEntries()) {
      const languages = languageKeys(byPath.get(entry.path) as SitemapEntry);
      expect(languages).toBeDefined();
      for (const locale of SUPPORTED_LOCALES) {
        expect(languages?.[locale]).toBe(absoluteUrl(prefixedPath(locale, entry.path)));
      }
      expect(languages?.['x-default']).toBe(absoluteUrl(entry.path));
    }
  });

  it('EN location pages list every locale with committed content; EN-only pages carry no cluster', () => {
    for (const entry of indexableLocationEntries()) {
      const sitemapEntry = byPath.get(entry.path) as SitemapEntry;
      if (enBerlinPaths.has(entry.path)) {
        const languages = languageKeys(sitemapEntry);
        expect(languages).toBeDefined();
        expect(languages?.['en']).toBe(absoluteUrl(entry.path));
        expect(languages?.['de']).toBe(absoluteUrl(`/de${entry.path}`));
        expect(languages?.['x-default']).toBe(absoluteUrl(entry.path));
      } else {
        // Phase A — EN-only pages (hub/country/region/cities without
        // committed translations) have no hreflang.
        expect(languageKeys(sitemapEntry)).toBeUndefined();
      }
    }
  });
});

describe('app/sitemap — changeFrequency/priority preserved per surface', () => {
  const entries = sitemap() as unknown as SitemapEntry[];
  const byPath = new Map(entries.map((entry) => [pathOf(entry), entry]));

  it('location hub is weekly; country/region/city/variant/ideas are monthly', () => {
    expect(byPath.get('/location')?.changeFrequency).toBe('weekly');
    const byKind = (kind: string) =>
      indexableLocationEntries().filter((entry) => entry.kind === kind);
    for (const entry of [
      ...byKind('country'),
      ...byKind('region'),
      ...byKind('city'),
      ...byKind('variant'),
      ...byKind('ideas'),
    ]) {
      expect(byPath.get(entry.path)?.changeFrequency).toBe('monthly');
    }
  });

  it('location priorities match the registry (hub 0.9 → variant 0.4)', () => {
    for (const locale of SUPPORTED_LOCALES) {
      for (const entry of indexableLocationEntries(locale)) {
        expect(byPath.get(entry.path)?.priority).toBe(entry.priority);
      }
    }
    expect(byPath.get('/location')?.priority).toBe(0.9);
    const variant = indexableLocationEntries().find((entry) => entry.kind === 'variant');
    expect(byPath.get(variant?.path ?? '')?.priority).toBe(0.4);
  });

  it('static routes keep their existing changeFrequency/priority on every locale surface', () => {
    for (const locale of SUPPORTED_LOCALES) {
      for (const route of ROUTES) {
        const entry = byPath.get(prefixedPath(locale, route.path));
        expect(entry?.changeFrequency).toBe(route.changeFrequency);
        expect(entry?.priority).toBe(route.priority);
      }
      expect(byPath.get(prefixedPath(locale, '/'))?.priority).toBe(1);
      expect(byPath.get(prefixedPath(locale, '/glossary'))?.changeFrequency).toBe('weekly');
      expect(byPath.get(prefixedPath(locale, '/glossary'))?.priority).toBe(0.6);
    }
  });

  it('guides/hubs use monthly/weekly with guide priority 0.7', () => {
    for (const locale of SUPPORTED_LOCALES) {
      for (const entry of guidePageEntries(locale)) {
        expect(byPath.get(entry.path)?.changeFrequency).toBe('monthly');
        expect(byPath.get(entry.path)?.priority).toBe(0.7);
      }
      expect(byPath.get(prefixedPath(locale, '/guides'))?.changeFrequency).toBe('weekly');
      expect(byPath.get(prefixedPath(locale, '/guides'))?.priority).toBe(0.8);
    }
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
