/**
 * lib/seo locationView — hreflang + metadata unit tests.
 *
 * Asserts the EN↔de hreflang mapping is bidirectional and generalizes to
 * ANY locale surface, EN pages carry the FULL 21-locale cluster (G-10,
 * matching the sitemap xhtml:link set), `noindex` applies to Tier-3/failed
 * gates, and de pages expose alternates.languages.
 */

import { SUPPORTED_LOCALES } from '@joinorigin/i18n';

import { languagesFor, locationMetadata, resolveLocationEntry } from '../locationView';
import { locationPageEntries, type LocationPageEntry } from '../locationPages';
import { absoluteUrl } from '../url';

describe('lib/seo locationView — hreflang + metadata', () => {
  it('emits the FULL cluster for EN Berlin pages (G-10): en + every /<locale>/ + x-default → EN canonical', () => {
    const berlinCity = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
    });
    const languages = languagesFor(berlinCity!);
    expect(languages?.en).toBe('http://localhost:3100/en/location/germany/berlin/berlin');
    expect(languages?.de).toBe('http://localhost:3100/de/location/germany/berlin/berlin');
    expect(languages?.['x-default']).toBe(
      'http://localhost:3100/en/location/germany/berlin/berlin',
    );
    // 21 locales + x-default — every /<locale>/ counterpart is a live route.
    expect(Object.keys(languages ?? {})).toHaveLength(SUPPORTED_LOCALES.length + 1);
  });

  it('de pages list de self + en alternate (at /en/) + x-default→EN canonical', () => {
    const deCity = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin' },
      'de',
    );
    const languages = languagesFor(deCity!);
    expect(languages).toEqual({
      de: 'http://localhost:3100/de/location/germany/berlin/berlin',
      en: 'http://localhost:3100/en/location/germany/berlin/berlin',
      'x-default': 'http://localhost:3100/en/location/germany/berlin/berlin',
    });
  });

  it('per-locale hreflang generalizes to ANY locale surface (not just de)', () => {
    // A synthetic es entry — no committed es content exists, but the helper
    // must derive the cluster from the entry's own locale (TASK-457).
    const esEntry: LocationPageEntry = {
      params: { country: 'germany', region: 'berlin', city: 'berlin' },
      path: '/es/location/germany/berlin/berlin',
      title: 'Comunidades en Berlín',
      description: 'Encuentra o crea comunidades en Berlín.',
      tier: 1,
      indexable: true,
      lastModified: '2026-08-19',
      priority: 0.5,
      kind: 'city',
      locale: 'es',
    };
    expect(languagesFor(esEntry)).toEqual({
      es: 'http://localhost:3100/es/location/germany/berlin/berlin',
      en: 'http://localhost:3100/en/location/germany/berlin/berlin',
      'x-default': 'http://localhost:3100/en/location/germany/berlin/berlin',
    });
  });

  it('EN pages (hub/country/region/NYC) carry the FULL 21-locale cluster (G-10)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    const hubLanguages = languagesFor(hub!);
    expect(hubLanguages?.en).toBe('http://localhost:3100/en/location');
    expect(hubLanguages?.de).toBe('http://localhost:3100/de/location');
    expect(Object.keys(hubLanguages ?? {})).toHaveLength(SUPPORTED_LOCALES.length + 1);
    for (const entry of [
      resolveLocationEntry({ country: 'united-states' })!,
      resolveLocationEntry({ country: 'united-states', region: 'new-york' })!,
      resolveLocationEntry({ country: 'united-states', region: 'new-york', city: 'new-york' })!,
    ]) {
      const languages = languagesFor(entry);
      expect(languages?.en).toBe(absoluteUrl(entry.path));
      expect(Object.keys(languages ?? {})).toHaveLength(SUPPORTED_LOCALES.length + 1);
    }
  });

  it('metadata: canonical + robots noindex for failed gates', () => {
    const germany = resolveLocationEntry({ country: 'germany' });
    const meta = locationMetadata(germany!);
    expect(meta.alternates?.canonical).toBe('http://localhost:3100/en/location/germany');
    expect(meta.robots).toEqual({ index: true, follow: true });

    const dallas = resolveLocationEntry({
      country: 'united-states',
      region: 'texas',
      city: 'dallas',
    });
    const noindexMeta = locationMetadata(dallas!);
    expect(noindexMeta.robots).toEqual({ index: false, follow: true });
  });

  it('metadata: Berlin de pages carry alternates.languages', () => {
    const deIdeas = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin', variant: 'ideas' },
      'de',
    );
    const meta = locationMetadata(deIdeas!);
    expect(meta.alternates?.languages).toEqual({
      de: 'http://localhost:3100/de/location/germany/berlin/berlin/ideas',
      en: 'http://localhost:3100/en/location/germany/berlin/berlin/ideas',
      'x-default': 'http://localhost:3100/en/location/germany/berlin/berlin/ideas',
    });
  });
});
