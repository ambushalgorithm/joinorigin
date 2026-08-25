/**
 * lib/seo locationView — hreflang + metadata unit tests.
 *
 * Asserts the EN↔de hreflang mapping is bidirectional and generalizes to
 * ANY locale surface, EN-only pages carry no hreflang, `noindex` applies
 * to Tier-3/failed gates, and de pages expose alternates.languages.
 */

import { languagesFor, locationMetadata, resolveLocationEntry } from '../locationView';
import { locationPageEntries, type LocationPageEntry } from '../locationPages';

describe('lib/seo locationView — hreflang + metadata', () => {
  it('emits bidirectional en/de languages + x-default→EN canonical at /en/ for Berlin pages', () => {
    const berlinCity = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
    });
    const languages = languagesFor(berlinCity!);
    expect(languages).toEqual({
      en: 'http://localhost:3100/en/location/germany/berlin/berlin',
      de: 'http://localhost:3100/de/location/germany/berlin/berlin',
      'x-default': 'http://localhost:3100/en/location/germany/berlin/berlin',
    });
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

  it('EN-only pages (hub/country/region/NYC) carry NO hreflang', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(languagesFor(hub!)).toBeUndefined();
    expect(languagesFor(resolveLocationEntry({ country: 'united-states' })!)).toBeUndefined();
    expect(
      languagesFor(resolveLocationEntry({ country: 'united-states', region: 'new-york' })!),
    ).toBeUndefined();
    expect(
      languagesFor(
        resolveLocationEntry({ country: 'united-states', region: 'new-york', city: 'new-york' })!,
      ),
    ).toBeUndefined();
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
