/**
 * lib/seo locationView — locale-aware titles (TASK-449) + Story H i18n
 * completeness (TASK-518) unit tests.
 *
 * Asserts committed per-locale content titles localize headings/leads,
 * TASK-516 non-EN headings + breadcrumbs use committed titles → localized
 * dataset names, directory card names resolve committed title → localized
 * dataset name → EN fallback (TASK-515), and entityLabel proper-cases
 * presence-claim labels (TASK-517/518).
 */

import { buildLocationViewData, hubDirectoryEntries, resolveLocationEntry } from '../locationView';
import { locationPageEntries } from '../locationPages';

describe('lib/seo locationView — locale-aware titles (TASK-449)', () => {
  it('city heading/lead render the selected locale content titles when content exists', () => {
    const entry = resolveLocationEntry({
      country: 'mexico',
      region: 'mexico-city',
      city: 'mexico-city',
    });
    expect(entry).toBeDefined();
    // EN canonical → registry title/description.
    const en = buildLocationViewData(entry!);
    expect(en.heading).toBe('Origins in Mexico City');
    expect(en.lead).toBe(entry?.description);
    // es content exists → heading/lead localize from pageTitles.
    const es = buildLocationViewData(entry!, 'es');
    expect(es.heading).toBe('Comunidades en Ciudad de México');
    expect(es.lead).toContain('Encuentra o crea comunidades en Ciudad de México');
    expect(es.heading).not.toBe(en.heading);
  });

  it('variant + ideas headings localize per kind from content pageTitles (de Berlin)', () => {
    // Variant/ideas pages exist for the flagship surface; Berlin carries the
    // committed de content so the per-kind pageTitles are exercised.
    const startup = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin', variant: 'startup' },
      'de',
    );
    expect(startup).toBeDefined();
    expect(buildLocationViewData(startup!, 'de').heading).toBe('Startup-Communities in Berlin');

    const ideas = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin', variant: 'ideas' },
      'de',
    );
    expect(ideas).toBeDefined();
    expect(buildLocationViewData(ideas!, 'de').heading).toBe(
      '30 Ideen für Origin-Events in Berlin',
    );
  });

  it('EN headings stay intact when the locale has no committed content (fallback)', () => {
    const austin = resolveLocationEntry({
      country: 'united-states',
      region: 'texas',
      city: 'austin',
    });
    expect(austin).toBeDefined();
    // EN canonical — no committed content gap: EN content exists, so the
    // heading stays the authored EN title.
    expect(buildLocationViewData(austin!).heading).toBe('Origins in Austin, Texas');
    // Non-EN surface without committed content → TASK-516 falls back to the
    // localized dataset name (Austin has no es translation, so it stays the
    // EN dataset name), never the EN registry title. The lead keeps the
    // registry description.
    const data = buildLocationViewData(austin!, 'es');
    expect(data.heading).toBe('Austin');
    expect(data.lead).toBe(austin?.description);
  });

  it('TASK-516 — non-EN headings + breadcrumbs use committed per-locale titles → localized dataset names', () => {
    // /de/location/united-arab-emirates — AE has no de content, so the hero
    // H1 + the current-page breadcrumb crumb resolve the de dataset name
    // instead of the EN "Communities in United Arab Emirates".
    const uae = resolveLocationEntry({ country: 'united-arab-emirates' });
    expect(uae).toBeDefined();
    const de = buildLocationViewData(uae!, 'de');
    expect(de.heading).toBe('Vereinigte Arabische Emirate');
    expect(de.breadcrumbs.map((crumb) => crumb.name)).toEqual([
      'Startseite',
      'Origins nach Stadt',
      'Vereinigte Arabische Emirate',
    ]);
    // EN canonical surface keeps the authored registry heading.
    expect(buildLocationViewData(uae!).heading).toBe('Origins in United Arab Emirates');
    // headingLocalized resolves the ACTIVE locale's H1 for the client toggle.
    expect(de.headingLocalized?.de).toBe('Vereinigte Arabische Emirate');
    expect(de.headingLocalized?.en).toBe('Origins in United Arab Emirates');
    expect(de.headingLocalized?.['zh-TW']).toBe('阿拉伯联合酋长国');

    // A committed per-locale title still wins over the dataset name
    // (es/country/colombia.ts "Comunidades en Colombia").
    const colombia = resolveLocationEntry({ country: 'colombia' });
    expect(colombia).toBeDefined();
    const es = buildLocationViewData(colombia!, 'es');
    expect(es.heading).toBe('Comunidades en Colombia');
    expect(es.headingLocalized?.es).toBe('Comunidades en Colombia');
    // de country surface with committed content (de/country/germany.ts).
    const germany = resolveLocationEntry({ country: 'germany' });
    expect(germany).toBeDefined();
    const deGermany = buildLocationViewData(germany!, 'de');
    expect(deGermany.heading).toBe('Origins in Deutschland');
    expect(deGermany.breadcrumbs.at(-1)?.name).toBe('Deutschland');
    expect(deGermany.breadcrumbs.at(-1)?.nameLocalized?.de).toBe('Deutschland');
    expect(deGermany.breadcrumbs.at(-1)?.nameLocalized?.es).toBe('Alemania');

    // Region current crumb localizes through the dataset (de region name).
    const bavaria = resolveLocationEntry({ country: 'germany', region: 'bavaria' });
    expect(bavaria).toBeDefined();
    const deBavaria = buildLocationViewData(bavaria!, 'de');
    expect(deBavaria.heading).toBe('Origins in Bayern');
    expect(deBavaria.breadcrumbs.map((crumb) => crumb.name)).toEqual([
      'Startseite',
      'Origins nach Stadt',
      'Deutschland',
      'Bayern',
    ]);
  });

  it('TASK-516 — city/variant/ideas breadcrumbs localize on non-EN surfaces', () => {
    // de Berlin city page — ancestors + current crumb carry the de dataset
    // names ("Deutschland", "Berlin").
    const berlin = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    expect(berlin).toBeDefined();
    const de = buildLocationViewData(berlin!, 'de');
    expect(de.breadcrumbs.map((crumb) => crumb.name)).toEqual([
      'Startseite',
      'Origins nach Stadt',
      'Deutschland',
      'Berlin',
      'Berlin',
    ]);
    // es surface — region "Estado de Berlín", country "Alemania".
    const es = buildLocationViewData(berlin!, 'es');
    expect(es.breadcrumbs.map((crumb) => crumb.name)).toEqual([
      'Inicio',
      'Origins por Ciudad',
      'Alemania',
      'Estado de Berlín',
      'Berlín',
    ]);
    // variant current crumb mirrors the localized H1 (de pageTitles).
    const startup = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin', variant: 'startup' },
      'de',
    );
    expect(startup).toBeDefined();
    const deStartup = buildLocationViewData(startup!, 'de');
    expect(deStartup.breadcrumbs.at(-1)?.name).toBe('Startup-Communities in Berlin');
  });

  it('de Berlin variant heading localizes from the committed de pageTitles', () => {
    const deStartup = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin', variant: 'startup' },
      'de',
    );
    expect(deStartup).toBeDefined();
    const data = buildLocationViewData(deStartup!, 'de');
    expect(data.heading).toBe('Startup-Communities in Berlin');
    expect(data.lead).toContain('Finde oder gründe Startup-Communities in Berlin');
  });

  it('hub presence-claim entity label resolves seoContent.location.hubEntity (TASK-449)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(hub).toBeDefined();
    const data = buildLocationViewData(hub!);
    // The key is synced by i18n-locale-keys-sync (TASK-452); until then the
    // server view must never surface a raw key string — it keeps the literal.
    expect(data.entityLabel).toBe('your city');
    expect(data.entityLabel).not.toContain('seoContent.location');
  });

  it('Browse-locations card names localize from the locale surface, EN fallback otherwise', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(hub).toBeDefined();
    // EN directory — complete set, registry names.
    const en = buildLocationViewData(hub!);
    expect(en.hubDirectory?.some((entry) => entry.name === 'Origins in Berlin')).toBe(true);
    expect(en.hubDirectory?.some((entry) => entry.name === 'Origins in the United States')).toBe(
      true,
    );
    // de surface — committed per-locale titles resolve (TASK-515): Germany +
    // its regions/cities/variants/ideas from the committed de content, while
    // uncommitted country/region/city cards fall back to the localized
    // dataset name (e.g. "Vereinigte Staaten") and the directory stays
    // complete.
    const de = buildLocationViewData(hub!, 'de');
    expect(de.hubDirectory?.some((entry) => entry.name === 'Startup-Communities in Berlin')).toBe(
      true,
    );
    expect(
      de.hubDirectory?.some((entry) => entry.name === 'Kreativ- & Design-Communities in Berlin'),
    ).toBe(true);
    expect(de.hubDirectory?.some((entry) => entry.name === 'Origins in Deutschland')).toBe(true);
    expect(de.hubDirectory?.some((entry) => entry.name === 'Origins in Bayern')).toBe(true);
    expect(de.hubDirectory?.some((entry) => entry.name === 'Vereinigte Staaten')).toBe(true);
    expect(de.hubDirectory?.length).toBe(en.hubDirectory?.length);
    // es surface now has committed content for 8 cities (Sprint 20) — those
    // cards localize (e.g. Buenos Aires variant cards + the committed
    // country/region titles like Colombia), while uncommitted entries fall
    // back to the localized dataset names ("Estados Unidos") and the
    // directory remains complete.
    const es = buildLocationViewData(hub!, 'es');
    expect(es.hubDirectory?.length).toBe(en.hubDirectory?.length);
    expect(
      es.hubDirectory?.some((entry) => entry.name === 'Comunidades de startups en Buenos Aires'),
    ).toBe(true);
    expect(es.hubDirectory?.some((entry) => entry.name === 'Comunidades en Colombia')).toBe(true);
    expect(es.hubDirectory?.some((entry) => entry.name === 'Estados Unidos')).toBe(true);
  });

  it('directory card names resolve committed title → localized dataset name → EN fallback (TASK-515)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(hub).toBeDefined();
    const de = hubDirectoryEntries('de');
    const es = hubDirectoryEntries('es');
    // 1) Committed per-locale page title wins on its own locale surface —
    //    country + region content is enumerated into the locale map even
    //    though `locationPageEntries(locale)` only emits city/variant/ideas.
    expect(de.some((entry) => entry.name === 'Origins in Deutschland')).toBe(true);
    expect(de.some((entry) => entry.name === 'Origins in Bayern')).toBe(true);
    expect(es.some((entry) => entry.name === 'Comunidades en Colombia')).toBe(true);
    expect(es.some((entry) => entry.name === 'Comunidades en Antioquia')).toBe(true);
    // 2) No committed title → localized dataset name for country/region/city.
    expect(de.some((entry) => entry.name === 'Vereinigte Staaten')).toBe(true); // US de name
    expect(de.some((entry) => entry.name === 'Antioquia')).toBe(true); // region de dataset name
    expect(es.some((entry) => entry.name === 'Estados Unidos')).toBe(true); // US es name
    // 3) Variant/ideas keep the localized pageTitles template with the
    //    localized city name — never the bare dataset city name.
    expect(de.some((entry) => entry.name === 'Community-Meetups & Veranstaltungen in Berlin')).toBe(
      true,
    );
    expect(de.some((entry) => entry.name === '30 Ideen für Origin-Events in Berlin')).toBe(true);
    // 4) EN surface stays on registry titles (committed EN titles win).
    const en = hubDirectoryEntries('en');
    expect(en.some((entry) => entry.name === 'Origins in Germany')).toBe(true);
    expect(en.some((entry) => entry.name === 'Origins in the United States')).toBe(true);
    expect(en.some((entry) => entry.name === 'Origins in Bavaria')).toBe(true);
    expect(en.some((entry) => entry.name === '30 Origin event ideas in Berlin')).toBe(true);
    // searchText is unchanged by the display-name localization — it still
    // carries the EN title + the dataset country/region names (TASK-484).
    const deGermany = de.find((entry) => entry.name === 'Origins in Deutschland');
    expect(deGermany?.searchText).toContain('Origins in Germany'); // EN name
    expect(deGermany?.searchText).toContain('Deutschland'); // de dataset country name
    const esColombia = es.find((entry) => entry.name === 'Comunidades en Colombia');
    expect(esColombia?.searchText).toContain('Origins in Colombia'); // EN name
    expect(esColombia?.searchText).toContain('Colombia'); // es dataset country name
  });

  it('Browse-locations card hrefs move to the ACTIVE locale surface (TASK-469)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(hub).toBeDefined();
    // EN — every directory card points at the /en/location/... surface.
    const en = buildLocationViewData(hub!);
    expect(en.hubDirectory?.length).toBeGreaterThan(0);
    for (const entry of en.hubDirectory ?? []) {
      expect(entry.path).toMatch(/^\/en\/location\//);
    }
    // es — every card points at the /es/location/... surface (all 21 locale
    // trees exist), never /en/** (localizePath is idempotent for prefixed
    // hrefs, so a baked /en path would navigate the es hub to English).
    const es = buildLocationViewData(hub!, 'es');
    expect(es.hubDirectory?.length).toBeGreaterThan(0);
    for (const entry of es.hubDirectory ?? []) {
      expect(entry.path).toMatch(/^\/es\/location\//);
      expect(entry.path).not.toMatch(/^\/en\//);
    }
  });

  it('guide cross-links stay unprefixed so the client localizes them (TASK-469 no regression)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    const esData = buildLocationViewData(hub!, 'es');
    // The full 7-guide set renders on every surface (TASK-489).
    expect(esData.guideLinks).toHaveLength(7);
    // GUIDE_PATHS are unprefixed /guides/... — the client localizePath applies
    // the active locale prefix (e.g. /es/guides/...) at render time.
    for (const link of esData.guideLinks) {
      expect(link.path).toMatch(/^\/guides\//);
      expect(link.path).not.toMatch(/^\/en\//);
      expect(link.path).not.toMatch(/^\/es\//);
    }
  });
});

describe('lib/seo locationView — Story H i18n completeness (TASK-518)', () => {
  /* ------------------------------------------------------------------ *
   * entityLabelFor — proper-cased presence-claim labels (TASK-517/518)
   * ------------------------------------------------------------------ */

  it('entityLabel proper-cases the city presence claim: ho-chi-minh-city → "Ho Chi Minh City"', () => {
    // The pre-TASK-517 fallback rendered the lowercase slug-spaced params
    // ("ho chi minh city"); the label must be the proper-cased dataset name.
    const entry = resolveLocationEntry({
      country: 'vietnam',
      region: 'ho-chi-minh-city-hcmc',
      city: 'ho-chi-minh-city',
    });
    expect(entry).toBeDefined();
    const data = buildLocationViewData(entry!);
    expect(data.entityLabel).toBe('Ho Chi Minh City');
    expect(data.entityLabel).not.toBe('ho chi minh city');
  });

  it('variant + ideas entries inherit the proper-cased city label', () => {
    const variant = resolveLocationEntry({
      country: 'vietnam',
      region: 'ho-chi-minh-city-hcmc',
      city: 'ho-chi-minh-city',
      variant: 'startup',
    });
    const ideas = resolveLocationEntry({
      country: 'vietnam',
      region: 'ho-chi-minh-city-hcmc',
      city: 'ho-chi-minh-city',
      variant: 'ideas',
    });
    expect(variant).toBeDefined();
    expect(ideas).toBeDefined();
    expect(buildLocationViewData(variant!).entityLabel).toBe('Ho Chi Minh City');
    expect(buildLocationViewData(ideas!).entityLabel).toBe('Ho Chi Minh City');
  });

  it('entityLabel proper-cases the city: osaka → "Osaka"', () => {
    const osaka = resolveLocationEntry({ country: 'japan', region: 'osaka', city: 'osaka' });
    expect(osaka).toBeDefined();
    expect(buildLocationViewData(osaka!).entityLabel).toBe('Osaka');
  });

  it('entityLabel proper-cases the country: colombia → "Colombia", localized per surface', () => {
    const colombia = resolveLocationEntry({ country: 'colombia' });
    expect(colombia).toBeDefined();
    expect(buildLocationViewData(colombia!).entityLabel).toBe('Colombia');
    expect(buildLocationViewData(colombia!, 'es').entityLabel).toBe('Colombia');
    // de surface resolves the de dataset name — never the lowercase slug.
    expect(buildLocationViewData(colombia!, 'de').entityLabel).toBe('Kolumbien');
  });

  it('flagship city display-name overrides are preserved (Berlin / New York City)', () => {
    const berlin = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    const nyc = resolveLocationEntry({
      country: 'united-states',
      region: 'new-york',
      city: 'new-york',
    });
    expect(berlin).toBeDefined();
    expect(nyc).toBeDefined();
    expect(buildLocationViewData(berlin!).entityLabel).toBe('Berlin');
    expect(buildLocationViewData(nyc!).entityLabel).toBe('New York City');
    // Flagship displayName is locale-independent — never the dataset fallback.
    expect(buildLocationViewData(nyc!, 'de').entityLabel).toBe('New York City');
  });

  it('entityLabel never surfaces the lowercase slug-spaced params (regression guard)', () => {
    const cases = [
      resolveLocationEntry({
        country: 'vietnam',
        region: 'ho-chi-minh-city-hcmc',
        city: 'ho-chi-minh-city',
      }),
      resolveLocationEntry({ country: 'japan', region: 'osaka', city: 'osaka' }),
      resolveLocationEntry({ country: 'colombia' }),
    ];
    for (const entry of cases) {
      expect(entry).toBeDefined();
      const label = buildLocationViewData(entry!).entityLabel;
      const slugParams = (entry!.params.city ?? entry!.params.region ?? entry!.params.country)!;
      // The label is never the raw lowercase slug-spaced param string
      // ("ho chi minh city", "osaka", "colombia") — it is title-cased.
      expect(label).not.toBe(slugParams.replace(/-/g, ' '));
      expect(label[0]).toBe(label[0].toUpperCase());
    }
  });

  /* ------------------------------------------------------------------ *
   * MenuHero H1 — resolves through the ACTIVE locale (TASK-516/518)
   * ------------------------------------------------------------------ */

  it('H1 for a country without committed de content uses the localized dataset name (/de/location/colombia)', () => {
    // Colombia has no committed de country content → the hero H1 falls back
    // to the de dataset name ("Kolumbien"), never the EN registry title.
    const colombia = resolveLocationEntry({ country: 'colombia' });
    expect(colombia).toBeDefined();
    const de = buildLocationViewData(colombia!, 'de');
    expect(de.heading).toBe('Kolumbien');
    expect(de.heading).not.toBe('Origins in Colombia');
    expect(de.headingLocalized?.de).toBe('Kolumbien');
    // The committed es title still wins on its own surface; EN canonical
    // keeps the authored registry heading.
    expect(buildLocationViewData(colombia!, 'es').heading).toBe('Comunidades en Colombia');
    expect(buildLocationViewData(colombia!).heading).toBe('Origins in Colombia');
  });

  it('H1 for a city resolves committed content → localized dataset name (ho-chi-minh-city)', () => {
    const hcmc = resolveLocationEntry({
      country: 'vietnam',
      region: 'ho-chi-minh-city-hcmc',
      city: 'ho-chi-minh-city',
    });
    expect(hcmc).toBeDefined();
    // vi has committed content → the committed pageTitles title wins.
    const vi = buildLocationViewData(hcmc!, 'vi');
    expect(vi.heading).toBe('Cộng đồng tại TP. Hồ Chí Minh');
    expect(vi.headingLocalized?.vi).toBe('Cộng đồng tại TP. Hồ Chí Minh');
    // de has no committed content → the de dataset city name ("Ho-Chi-Minh-
    // Stadt"), never the EN dataset name or the EN registry heading.
    const de = buildLocationViewData(hcmc!, 'de');
    expect(de.heading).toBe('Ho-Chi-Minh-Stadt');
    expect(de.heading).not.toBe('Ho Chi Minh City');
    expect(de.heading).not.toContain('Communities in');
  });

  it('H1 for a region resolves the localized dataset name (/de/location/japan/osaka)', () => {
    const osaka = resolveLocationEntry({ country: 'japan', region: 'osaka' });
    expect(osaka).toBeDefined();
    const de = buildLocationViewData(osaka!, 'de');
    expect(de.heading).toBe('Präfektur Osaka');
    expect(de.headingLocalized?.de).toBe('Präfektur Osaka');
    expect(de.heading).not.toBe('Communities in Osaka Prefecture');
  });

  /* ------------------------------------------------------------------ *
   * breadcrumbsFor — localized dataset names, Home + hub stay translated
   * ------------------------------------------------------------------ */

  it('breadcrumbs localize the country crumb via the dataset name while Home + hub stay translated (de UAE)', () => {
    const uae = resolveLocationEntry({ country: 'united-arab-emirates' });
    expect(uae).toBeDefined();
    const de = buildLocationViewData(uae!, 'de');
    expect(de.breadcrumbs.map((crumb) => crumb.name)).toEqual([
      'Startseite',
      'Origins nach Stadt',
      'Vereinigte Arabische Emirate',
    ]);
    // G-8 — Home + hub crumbs stay chrome-translated (dictionary) and carry
    // surface-prefixed paths (`/de`, `/de/location`); the country crumb is
    // the de dataset name — never the EN registry title.
    expect(de.breadcrumbs[0].path).toBe('/de');
    expect(de.breadcrumbs[1].path).toBe('/de/location');
    expect(de.breadcrumbs[2].name).not.toBe('Communities in United Arab Emirates');
    // Every entity crumb carries the full per-locale map for client toggle.
    expect(de.breadcrumbs[2].nameLocalized?.de).toBe('Vereinigte Arabische Emirate');
    expect(de.breadcrumbs[2].nameLocalized?.es).toBe('Emiratos Árabes Unidos');
  });

  it('breadcrumbs localize region/city dataset names on non-EN surfaces (de Bavaria)', () => {
    const bavaria = resolveLocationEntry({ country: 'germany', region: 'bavaria' });
    expect(bavaria).toBeDefined();
    const de = buildLocationViewData(bavaria!, 'de');
    expect(de.breadcrumbs.map((crumb) => crumb.name)).toEqual([
      'Startseite',
      'Origins nach Stadt',
      'Deutschland',
      'Bayern',
    ]);
  });

  /* ------------------------------------------------------------------ *
   * hubDirectoryEntries — card names localize (TASK-515/518)
   * ------------------------------------------------------------------ */

  it('es countries section shows the committed Colombia card — never the EN registry title', () => {
    const es = hubDirectoryEntries('es');
    const card = es.find(
      (entry) => entry.kind === 'country' && entry.path === '/es/location/colombia',
    );
    expect(card).toBeDefined();
    expect(card?.name).toBe('Comunidades en Colombia');
    expect(card?.name).not.toBe('Origins in Colombia');
  });

  it('de directory localizes the Bavaria region card + dataset names for uncommitted entries', () => {
    const de = hubDirectoryEntries('de');
    // Bavaria has committed de content → its committed title wins.
    expect(de.some((entry) => entry.name === 'Origins in Bayern')).toBe(true);
    // Colombia has no committed de content → the de dataset name, not EN.
    const colombia = de.find(
      (entry) => entry.kind === 'country' && entry.path === '/de/location/colombia',
    );
    expect(colombia).toBeDefined();
    expect(colombia?.name).toBe('Kolumbien');
    expect(colombia?.name).not.toBe('Origins in Colombia');
  });

  it('a locale without committed content falls back to EN registry titles (fr)', () => {
    const fr = hubDirectoryEntries('fr');
    // fr has no committed Berlin city content — variant/ideas cards keep the
    // EN registry titles, never the de translations or the bare dataset name.
    expect(fr.some((entry) => entry.name === 'Startup Origins in Berlin')).toBe(true);
    expect(fr.some((entry) => entry.name === '30 Origin event ideas in Berlin')).toBe(true);
    expect(fr.some((entry) => entry.name === 'Startup-Communities in Berlin')).toBe(false);
    // Country cards still resolve the localized dataset name when present.
    const germany = fr.find(
      (entry) => entry.kind === 'country' && entry.path === '/fr/location/germany',
    );
    expect(germany).toBeDefined();
    expect(germany?.name).toBe('Allemagne');
  });
});
