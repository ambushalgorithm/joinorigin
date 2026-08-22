import { test, expect, type Page } from '@playwright/test';

/**
 * Location pages e2e (TASK-308 fe-location-pages).
 *
 * Covers the `/location/**` dynamic surface + the Berlin `de` locale:
 *  1. hub → country → region → city → variant navigation (internal-link mesh),
 *  2. per-page canonical + robots meta (noindex for Tier-3 / failed gates),
 *  3. Berlin `de` pages serve the German body + full hreflang set
 *     (de self + en + x-default → EN) via `alternates.languages`,
 *  4. EN Berlin pages emit the bidirectional hreflang cluster; EN-only pages
 *     (hub/country/region/NYC) emit NO hreflang (phase A),
 *  5. JSON-LD: BreadcrumbList everywhere, FAQPage on content pages, ItemList
 *     (30 ideas) on idea pages,
 *  6. (TASK-469) Browse-locations directory + flagship/sibling city card hrefs
 *     carry the ACTIVE locale surface (`/es/location/...`, `/de/location/...`)
 *     — never the EN-canonical `/en/**` — and navigating a card lands on that
 *     locale's chrome (`<html lang>`).
 *
 * These specs navigate several pages; keep them serial to avoid starving the
 * shared dev server (repo convention, TASK-218).
 */
test.describe.configure({ mode: 'serial' });

/** Every canonical path checked for hub→country→region→city→variant — on
 *  the EN canonical /en/** surface (all-routes-prefixed, TASK-464/466). */
const MESH = [
  '/en/location',
  '/en/location/germany',
  '/en/location/germany/berlin',
  '/en/location/germany/berlin/berlin',
  '/en/location/germany/berlin/berlin/startup',
];

const EN_ONLY = [
  '/en/location/united-states',
  '/en/location/united-states/new-york',
  '/en/location/united-states/new-york/new-york',
];

async function ldTypes(page: Page): Promise<string[]> {
  return page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.flatMap((s) => {
      const parsed = JSON.parse(s.textContent ?? '{}') as
        Record<string, unknown> | Record<string, unknown>[];
      if (Array.isArray(parsed)) return parsed.map((n) => n['@type'] as string);
      return [parsed['@type'] as string];
    }),
  );
}

test.describe('location internal-link mesh navigation', () => {
  test('hub → country → region → city → variant navigates through real links', async ({ page }) => {
    // Reduced motion keeps GSAP Reveal/ScrollTrigger tweens from moving
    // elements mid-click (repo convention — hero/ticker specs do the same),
    // so in-page link navigation is deterministic.
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // The prod server compiles the first dynamic-route request on demand;
    // navigate directly first to warm each route (serial suite), then assert
    // the real in-page link navigation. All internal links carry the /en/**
    // prefix (TASK-464).
    await page.goto('/en/location/germany/berlin/berlin/startup');
    await expect(page.locator('h1')).toContainText('Startup communities in Berlin');
    await page.goto('/en/location/germany/berlin/berlin');
    await expect(page.locator('h1')).toContainText('Communities in Berlin');

    await page.goto('/en/location');
    await expect(page).toHaveTitle(/Communities by City/);
    const berlinLink = page.locator('a[href="/en/location/germany/berlin/berlin"]').first();
    await expect(berlinLink).toBeVisible();
    await berlinLink.click();
    await page.waitForURL('**/location/germany/berlin/berlin', { timeout: 120_000 });

    // City page breadcrumbs link up to the region/country/hub.
    const regionLink = page.locator('a[href="/en/location/germany/berlin"]').first();
    await expect(regionLink).toBeVisible();
    await regionLink.click();
    await page.waitForURL('**/location/germany/berlin');

    const countryLink = page.locator('a[href="/en/location/germany"]').first();
    await expect(countryLink).toBeVisible();
    await countryLink.click();
    await page.waitForURL('**/location/germany');

    const hubLink = page
      .locator('[data-testid="location-breadcrumbs"] a[href="/en/location"]')
      .first();
    await expect(hubLink).toBeVisible();
    await hubLink.click();
    await page.waitForURL('**/location');

    // Group-type links from the city page reach the startup variant. The
    // links sit below the fold inside a GSAP `Reveal` — scroll into view and
    // let the entrance animation settle so the native click isn't dropped.
    await page.goto('/en/location/germany/berlin/berlin');
    const startupLink = page
      .locator('a[href="/en/location/germany/berlin/berlin/startup"]')
      .first();
    await expect(startupLink).toBeVisible();
    await startupLink.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    await startupLink.click();
    await page.waitForURL('**/location/germany/berlin/berlin/startup', { timeout: 120_000 });
    await expect(page).toHaveTitle(/Startup communities in Berlin/);
  });

  test('every mesh level renders a single h1 + breadcrumbs + waitlist CTA', async ({ page }) => {
    for (const path of MESH) {
      await page.goto(path);
      expect(await page.locator('h1').count()).toBe(1);
      await expect(page.locator('[data-testid="location-breadcrumbs"]')).toBeVisible();
      await expect(page.locator('[data-testid="location-cta-band"]')).toBeVisible();
    }
  });
});

test.describe('location canonical + robots', () => {
  for (const path of MESH) {
    test(`${path} emits canonical + index,follow`, async ({ page }) => {
      await page.goto(path);
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      const canonicalHref = (await canonical.getAttribute('href')) ?? '';
      expect(new URL(canonicalHref).pathname).toBe(path);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    });
  }

  test('Tier-3 city (data-only, no promoted content) is served noindex, follow', async ({
    page,
  }) => {
    // Austin was promoted to Tier-2 (Sprint 18, TASK-442 — indexable);
    // Dallas is still Tier-3 in the registry (locationPages.test.ts),
    // so it must be served noindex, follow.
    await page.goto('/en/location/united-states/texas/dallas');
    expect(await page.locator('h1').count()).toBe(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  });

  test('unknown slug returns 404', async ({ page }) => {
    const response = await page.goto('/location/atlantis');
    expect(response?.status()).toBe(404);
  });
});

test.describe('Berlin de pages + hreflang', () => {
  const DE_PAGES = [
    '/de/location/germany/berlin/berlin',
    '/de/location/germany/berlin/berlin/startup',
    '/de/location/germany/berlin/berlin/ideas',
  ];

  for (const path of DE_PAGES) {
    test(`${path} serves German body + full hreflang (de self + en + x-default→EN)`, async ({
      page,
    }) => {
      await page.goto(path);
      expect(await page.locator('h1').count()).toBe(1);

      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      expect(new URL((await canonical.getAttribute('href')) ?? '').pathname).toBe(path);

      const de = page.locator('link[rel="alternate"][hreflang="de"]');
      await expect(de).toHaveCount(1);
      expect(new URL((await de.getAttribute('href')) ?? '').pathname).toBe(path);

      const en = page.locator('link[rel="alternate"][hreflang="en"]');
      await expect(en).toHaveCount(1);
      // The en alternate + x-default point at the EN canonical /en/** surface
      // (TASK-466).
      expect(new URL((await en.getAttribute('href')) ?? '').pathname).toBe(
        `/en${path.replace(/^\/de/, '')}`,
      );

      const xDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
      await expect(xDefault).toHaveCount(1);
      expect(new URL((await xDefault.getAttribute('href')) ?? '').pathname).toBe(
        `/en${path.replace(/^\/de/, '')}`,
      );

      // German body copy from the per-locale content file.
      if (path.endsWith('/berlin/berlin')) {
        await expect(
          page.getByText(/Berlin ist eine Stadt, die von Communities lebt/),
        ).toBeVisible();
      }
      if (path.endsWith('/ideas')) {
        await expect(page.locator('[data-testid="location-idea-grid"]').first()).toBeVisible();
        expect(await page.locator('[data-testid="location-idea-grid"]').count()).toBe(6);
      }
    });
  }

  test('EN Berlin pages emit bidirectional hreflang (en + de + x-default)', async ({ page }) => {
    await page.goto('/en/location/germany/berlin/berlin');
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);

    const de = page.locator('link[rel="alternate"][hreflang="de"]');
    expect(new URL((await de.getAttribute('href')) ?? '').pathname).toBe(
      '/de/location/germany/berlin/berlin',
    );

    // x-default points at the EN canonical surface (TASK-466).
    const xDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
    expect(new URL((await xDefault.getAttribute('href')) ?? '').pathname).toBe(
      '/en/location/germany/berlin/berlin',
    );
  });

  test('/de/location/germany/berlin/berlin serves <html lang="de"> (TASK-315)', async ({
    page,
  }) => {
    // No German cookie (the joinorigin_locale cookie is fully removed,
    // TASK-468) or Accept-Language header: the /de/* prefix alone must force
    // the server-side locale so crawlers see `<html lang="de">`. Assert the
    // RAW served HTML (the HTTP response body) — the client I18nProvider
    // trusts the server locale prop, so the DOM alone would not prove
    // server-side forcing.
    const response = await page.goto('/de/location/germany/berlin/berlin');
    expect(response?.status()).toBe(200);
    const servedHtml = (await response?.text()) ?? '';
    // The server-rendered <html> carries lang + dir first (the FOUC critical
    // style attribute may follow; TASK-404 added it to the opening tag).
    expect(servedHtml).toMatch(/<html lang="de" dir="ltr"[^>]*>/);
  });

  for (const path of EN_ONLY) {
    test(`${path} (EN-only) emits NO hreflang alternates`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
    });
  }

  test('EN location hub emits the en + x-default cluster (TASK-466)', async ({ page }) => {
    await page.goto('/en/location');
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
    // Self-referential: the EN hub cluster points at the /en/** surface.
    const xDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
    expect(new URL((await xDefault.getAttribute('href')) ?? '').pathname).toBe('/en/location');
  });
});

test.describe('location JSON-LD', () => {
  test('city page emits BreadcrumbList + FAQPage', async ({ page }) => {
    await page.goto('/en/location/germany/berlin/berlin');
    const types = await ldTypes(page);
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('FAQPage');
  });

  test('idea page emits BreadcrumbList + FAQPage + ItemList (30 items)', async ({ page }) => {
    await page.goto('/en/location/germany/berlin/berlin/ideas');
    const types = await ldTypes(page);
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('FAQPage');
    expect(types).toContain('ItemList');

    const itemList = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => {
        for (const s of scripts) {
          const parsed = JSON.parse(s.textContent ?? '{}') as Record<string, unknown>;
          if (parsed['@type'] === 'ItemList') return parsed;
        }
        return null;
      });
    expect((itemList?.itemListElement as unknown[]).length).toBe(30);
  });
});

test.describe('location variant enrichment (TASK-319)', () => {
  test('Berlin startup variant renders distinct enrichment sections with German chrome', async ({
    page,
  }) => {
    await page.goto('/de/location/germany/berlin/berlin/startup');
    // Chrome headings localized via seoContent.* keys.
    await expect(page.getByText('Wo sich Startup-Communities treffen')).toBeVisible();
    await expect(page.getByText('Typische Formate')).toBeVisible();
    await expect(page.getByText('So startest du')).toBeVisible();

    // German body copy from the de Berlin content file.
    await expect(page.getByText(/Coworking-Spaces in Mitte und Kreuzberg/)).toBeVisible();
    await expect(page.getByTestId('variant-enrichment-venues')).toBeVisible();
    await expect(page.getByTestId('variant-enrichment-formats')).toBeVisible();
    await expect(page.getByTestId('variant-enrichment-howto')).toBeVisible();
  });

  test('NYC startup and Berlin startup variant pages are visibly differentiated', async ({
    page,
  }) => {
    await page.goto('/en/location/united-states/new-york/new-york/startup');
    await expect(page.getByText('Where Startup communities gather')).toBeVisible();
    // NYC-specific venue copy.
    await expect(page.getByText(/Coworking spaces in SoHo and Flatiron/)).toBeVisible();
    await expect(page.getByTestId('variant-enrichment-venues')).toBeVisible();

    await page.goto('/en/location/germany/berlin/berlin/startup');
    await expect(page.getByText('Where Startup communities gather')).toBeVisible();
    // Berlin-specific venue copy — no NYC overlap.
    await expect(page.getByText(/Coworking spaces in Mitte and Kreuzberg/)).toBeVisible();
    await expect(page.getByText('Coworking spaces in SoHo and Flatiron')).toHaveCount(0);
  });

  test('startup vs creative variants within a city render distinct enrichment', async ({
    page,
  }) => {
    await page.goto('/en/location/united-states/new-york/new-york/startup');
    await expect(page.getByText(/Coworking spaces in SoHo and Flatiron/)).toBeVisible();

    await page.goto('/en/location/united-states/new-york/new-york/creative');
    await expect(page.getByText('Where Creative & design communities gather')).toBeVisible();
    await expect(page.getByText(/Chelsea gallery spaces/)).toBeVisible();
    await expect(page.getByText('Coworking spaces in SoHo and Flatiron')).toHaveCount(0);
  });

  test('city page does NOT render variant enrichment sections', async ({ page }) => {
    await page.goto('/en/location/germany/berlin/berlin');
    await expect(page.getByTestId('variant-enrichment')).toHaveCount(0);
  });
});

test.describe('location directory + sibling cards carry the ACTIVE locale surface (TASK-469)', () => {
  /** Collect the href of every card link inside the given card grid. */
  async function cardHrefs(page: Page, gridTestId: string): Promise<string[]> {
    const grid = page.getByTestId(gridTestId);
    await expect(grid).toBeVisible();
    return grid
      .locator('a')
      .evaluateAll((anchors) =>
        anchors
          .map((a) => (a as HTMLAnchorElement).getAttribute('href'))
          .filter((href): href is string => !!href && href.startsWith('/')),
      );
  }

  test('on /es/location the Browse-locations directory cards link to /es/location/... (never /en/**)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/es/location');
    // Spanish chrome for the hub surface.
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('[data-testid="location-breadcrumbs"]')).toBeVisible();

    const directoryHrefs = await cardHrefs(page, 'location-hub-directory');
    expect(directoryHrefs.length).toBeGreaterThan(0);
    for (const href of directoryHrefs) {
      expect(href, `hub directory card must stay on the es surface: ${href}`).toMatch(
        /^\/es\/location\//,
      );
      expect(
        href,
        `hub directory card must not leak the EN canonical surface: ${href}`,
      ).not.toMatch(/^\/en\//);
    }

    // The flagship-city sibling block on the hub is localized the same way.
    const flagshipHrefs = await cardHrefs(page, 'location-flagship-cities');
    expect(flagshipHrefs.length).toBeGreaterThan(0);
    for (const href of flagshipHrefs) {
      expect(href, `flagship city card must stay on the es surface: ${href}`).toMatch(
        /^\/es\/location\//,
      );
    }
  });

  test('clicking a /es/location directory card navigates to the es surface with Spanish chrome', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/es/location');
    const firstCard = page.getByTestId('location-hub-directory').locator('a').first();
    const href = (await firstCard.getAttribute('href')) ?? '';
    expect(href).toMatch(/^\/es\/location\//);

    await firstCard.click();
    await page.waitForURL('**/es/location/**', { timeout: 120_000 });
    // The landing page keeps the active locale chrome (URL-driven).
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('[data-testid="location-breadcrumbs"]')).toBeVisible();
  });

  test('sibling city cards on /es/location/germany/berlin/berlin link to /es/location/...', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/es/location/germany/berlin/berlin');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');

    const siblingHrefs = await cardHrefs(page, 'location-sibling-cities');
    expect(siblingHrefs.length).toBeGreaterThan(0);
    for (const href of siblingHrefs) {
      expect(href, `sibling city card must stay on the es surface: ${href}`).toMatch(
        /^\/es\/location\//,
      );
      expect(href, `sibling city card must not leak /en/** (TASK-469): ${href}`).not.toMatch(
        /^\/en\//,
      );
    }
  });

  test('sibling city cards on the committed /de Berlin surface link to /de/location/...', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/de/location/germany/berlin/berlin');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');

    const siblingHrefs = await cardHrefs(page, 'location-sibling-cities');
    expect(siblingHrefs.length).toBeGreaterThan(0);
    for (const href of siblingHrefs) {
      expect(href, `sibling city card must stay on the de surface: ${href}`).toMatch(
        /^\/de\/location\//,
      );
      expect(href, `sibling city card must not leak /en/** (TASK-469): ${href}`).not.toMatch(
        /^\/en\//,
      );
    }
  });
});

test.describe('full city-page mesh for content-rich cities (TASK-475)', () => {
  /** Every content-rich city checked: city page + all group-type variants
   *  (5 GROUP_TYPES + the ideas listicle). Tier-2 but indexable — these must
   *  render the Sprint 20 sections AND every variant link must resolve. */
  const MESH_CITY_PAGES: Array<{ name: string; path: string; variants: string[] }> = [
    {
      name: 'Dubai',
      path: '/en/location/united-arab-emirates/dubai/dubai',
      variants: [
        '/en/location/united-arab-emirates/dubai/dubai/startup',
        '/en/location/united-arab-emirates/dubai/dubai/creative',
        '/en/location/united-arab-emirates/dubai/dubai/political',
        '/en/location/united-arab-emirates/dubai/dubai/meetup',
        '/en/location/united-arab-emirates/dubai/dubai/small-business',
        '/en/location/united-arab-emirates/dubai/dubai/ideas',
      ],
    },
    {
      name: 'Buenos Aires',
      path: '/en/location/argentina/buenos-aires-f-d/buenos-aires',
      variants: [
        '/en/location/argentina/buenos-aires-f-d/buenos-aires/startup',
        '/en/location/argentina/buenos-aires-f-d/buenos-aires/creative',
        '/en/location/argentina/buenos-aires-f-d/buenos-aires/political',
        '/en/location/argentina/buenos-aires-f-d/buenos-aires/meetup',
        '/en/location/argentina/buenos-aires-f-d/buenos-aires/small-business',
        '/en/location/argentina/buenos-aires-f-d/buenos-aires/ideas',
      ],
    },
  ];

  /** Asserts the two Sprint 20 sections render with real links inside. */
  async function expectMeshSections(page: Page): Promise<void> {
    const groupLinks = page.getByTestId('location-group-type-links');
    await expect(groupLinks).toBeVisible();
    // 5 group-type variants + the ideas-page link (all committed content).
    await expect(groupLinks.locator('a')).toHaveCount(6);
    const siblingCards = page.getByTestId('location-sibling-cities');
    await expect(siblingCards).toBeVisible();
    expect(await siblingCards.locator('a').count()).toBeGreaterThan(0);
  }

  for (const city of MESH_CITY_PAGES) {
    test(`${city.name} city page renders Explore community types + Communities in nearby cities (TASK-475)`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(city.path);
      await expect(page.locator('h1')).toContainText(city.name);
      await expect(page.getByText('Explore community types')).toBeVisible();
      await expect(page.getByText('Communities in nearby cities')).toBeVisible();
      await expectMeshSections(page);
    });

    test(`${city.name} group-type variant links resolve (200, not 404) on the EN surface (TASK-475)`, async ({
      page,
    }) => {
      for (const variantPath of city.variants) {
        const response = await page.goto(variantPath);
        expect(response?.status(), `${variantPath} must resolve, not 404`).toBe(200);
        await expect(page.locator('h1')).toHaveCount(1);
      }
    });
  }

  test('es Buenos Aires surface renders both sections + startup variant resolves 200 (TASK-475)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/es/location/argentina/buenos-aires-f-d/buenos-aires');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByText('Explora tipos de comunidad')).toBeVisible();
    await expect(page.getByText('Comunidades en ciudades cercanas')).toBeVisible();
    await expectMeshSections(page);

    const startup = await page.goto('/es/location/argentina/buenos-aires-f-d/buenos-aires/startup');
    expect(startup?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('startups');
  });

  test('ar Dubai surface renders both sections + startup variant resolves 200 (TASK-475)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/ar/location/united-arab-emirates/dubai/dubai');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.getByText('استكشف أنواع المجتمعات')).toBeVisible();
    await expect(page.getByText('مجتمعات في المدن القريبة')).toBeVisible();
    await expectMeshSections(page);

    const startup = await page.goto('/ar/location/united-arab-emirates/dubai/dubai/startup');
    expect(startup?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
  });

  test('NYC + Berlin flagship city pages keep both mesh sections (no regression, TASK-475)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const path of [
      '/en/location/united-states/new-york/new-york',
      '/en/location/germany/berlin/berlin',
    ]) {
      await page.goto(path);
      await expect(page.getByText('Explore community types')).toBeVisible();
      await expect(page.getByText('Communities in nearby cities')).toBeVisible();
      await expectMeshSections(page);
    }
  });
});

test.describe('flagship cities + Browse-locations 5 sections (TASK-480)', () => {
  test('EN /en/location flagship cities = content-rich set, EN area first, capped at 6', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location');

    const flagship = page.getByTestId('location-flagship-cities');
    await expect(flagship).toBeVisible();
    // Capped at 6 (TASK-480) — the EN language area (alphabetical) leads.
    await expect(flagship.locator('a')).toHaveCount(6);
    const names = await flagship.locator('a').allInnerTexts();
    expect(names).toEqual(['Austin', 'Cape Town', 'Chicago', 'Dublin', 'Johannesburg', 'Lagos']);
    // Every card stays on the ACTIVE locale surface (never /en leak is N/A
    // here — this IS the en surface — but the hrefs must be /en/**).
    for (const href of await flagship
      .locator('a')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')))) {
      expect(href).toMatch(/^\/en\/location\//);
    }
  });

  test('de /de/location flagship cities put the German area first (Berlin, Munich)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/de/location');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');

    const flagship = page.getByTestId('location-flagship-cities');
    await expect(flagship).toBeVisible();
    await expect(flagship.locator('a')).toHaveCount(6);
    // Locale country/area first: the German cities lead the capped list.
    const names = await flagship.locator('a').allInnerTexts();
    expect(names.slice(0, 2)).toEqual(['Berlin', 'Munich']);
    for (const href of await flagship
      .locator('a')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')))) {
      expect(href).toMatch(/^\/de\/location\//);
    }
  });

  test('EN /en/location Browse locations splits into 5 sections with cards in each', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location');

    await expect(page.getByText('Browse locations')).toBeVisible();
    const directory = page.getByTestId('location-hub-directory');
    await expect(directory).toBeVisible();

    // The 5-section split (TASK-480) with the localized section labels.
    const sections = [
      { testId: 'location-hub-directory-countries', label: 'Country' },
      { testId: 'location-hub-directory-regions', label: 'Region' },
      { testId: 'location-hub-directory-cities', label: 'City' },
      { testId: 'location-hub-directory-communityTypes', label: 'Community type' },
      { testId: 'location-hub-directory-eventIdeas', label: 'Community event ideas' },
    ] as const;
    for (const section of sections) {
      const grid = directory.getByTestId(section.testId);
      await expect(grid).toBeVisible();
      await expect(grid.locator('a').first()).toBeVisible();
    }
  });

  test('de /de/location Browse locations sections render German labels', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/de/location');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');

    await expect(page.getByText('Standorte durchsuchen')).toBeVisible();
    const directory = page.getByTestId('location-hub-directory');
    await expect(directory).toBeVisible();
    const sections = [
      { testId: 'location-hub-directory-countries', label: 'Land' },
      { testId: 'location-hub-directory-regions', label: 'Region' },
      { testId: 'location-hub-directory-cities', label: 'Stadt' },
      { testId: 'location-hub-directory-communityTypes', label: 'Community-Typ' },
      { testId: 'location-hub-directory-eventIdeas', label: 'Community-Event-Ideen' },
    ] as const;
    for (const section of sections) {
      const grid = directory.getByTestId(section.testId);
      await expect(grid).toBeVisible();
      await expect(grid.locator('a').first()).toBeVisible();
    }
  });
});

test.describe('guides Start local list (TASK-480)', () => {
  test('EN /en/guides Start local = content-rich cities, EN area first, capped at 6', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/guides');

    await expect(page.getByText('Start local')).toBeVisible();
    const grid = page.getByTestId('guides-hub-start-local');
    await expect(grid).toBeVisible();
    await expect(grid.locator('a')).toHaveCount(6);
    const names = await grid.locator('a').allInnerTexts();
    expect(names).toEqual(['Austin', 'Cape Town', 'Chicago', 'Dublin', 'Johannesburg', 'Lagos']);
    // The cards localize to the active /en surface at render time.
    for (const href of await grid
      .locator('a')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')))) {
      expect(href).toMatch(/^\/en\/location\//);
    }
  });

  test('de /de/guides Start local leads with the German area and localizes hrefs', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/de/guides');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');

    await expect(page.getByText('Lokal starten')).toBeVisible();
    const grid = page.getByTestId('guides-hub-start-local');
    await expect(grid).toBeVisible();
    await expect(grid.locator('a')).toHaveCount(6);
    const names = await grid.locator('a').allInnerTexts();
    expect(names.slice(0, 2)).toEqual(['Berlin', 'Munich']);
    for (const href of await grid
      .locator('a')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')))) {
      expect(href).toMatch(/^\/de\/location\//);
    }
  });
});

test.describe('Browse-locations complete inventory (TASK-485/TASK-487)', () => {
  test('per-section count badges + grand total render beside the section titles', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location');

    // The grand total renders next to the "Browse locations" title — the
    // complete content-rich inventory (TASK-484: 38 countries + 54 regions +
    // 56 cities + 56×5 community types + 56 event ideas = 484).
    await expect(page.getByTestId('location-hub-directory-title')).toContainText(
      'Browse locations (484)',
    );

    // Per-section count badges render beside each sub-title and stay static
    // while the search filters the visible cards (TASK-485).
    const badges = [
      'Countries (38)',
      'Regions (54)',
      'Cities (56)',
      'Community types (280)',
      'Event ideas (56)',
    ];
    for (const badge of badges) {
      await expect(page.getByText(badge, { exact: true })).toBeVisible();
    }

    // The badge numbers match the rendered card counts per section — the
    // full directory with an empty query.
    const directory = page.getByTestId('location-hub-directory');
    const sections = [
      ['location-hub-directory-countries', 38],
      ['location-hub-directory-regions', 54],
      ['location-hub-directory-cities', 56],
      ['location-hub-directory-communityTypes', 280],
      ['location-hub-directory-eventIdeas', 56],
    ] as const;
    for (const [testId, count] of sections) {
      await expect(directory.getByTestId(testId).locator('a')).toHaveCount(count);
    }
    // The total next to the title equals the sum of all section cards.
    await expect(directory.locator('a')).toHaveCount(484);
  });

  test('inventory banner band renders below the hero and above the directory (TASK-491)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location');

    const banner = page.getByTestId('location-inventory-banner');
    await expect(banner).toBeVisible();
    // The stat value mirrors the directory total (484) with the localized
    // label ("Places and Communities", TASK-485).
    await expect(banner).toContainText('484');
    await expect(banner).toContainText('Places and Communities');

    // TASK-491 — the band mirrors the /community "Join the network"
    // section: SectionTitle heading + BodyCopy explainer + ExploreLinks row.
    await expect(page.getByRole('heading', { level: 2, name: 'Join the network' })).toBeVisible();
    await expect(page.getByText('Browse every place and community on the network.')).toBeVisible();
    const explore = page.getByTestId('location-inventory-explore');
    await expect(explore.getByRole('link', { name: 'Locations' })).toHaveAttribute(
      'href',
      '/en/location',
    );
    await expect(explore.getByRole('link', { name: 'Guides' })).toHaveAttribute(
      'href',
      '/en/guides',
    );
    await expect(explore.getByRole('link', { name: 'Community' })).toHaveAttribute(
      'href',
      '/en/community',
    );

    // The banner sits below the hero / above the Browse-locations directory
    // in the DOM (LocationView renders it before the directory band).
    const bannerBeforeDirectory = await page.evaluate(() => {
      const bannerNode = document.querySelector('[data-testid="location-inventory-banner"]');
      const titleNode = document.querySelector('[data-testid="location-hub-directory-title"]');
      if (!bannerNode || !titleNode) return false;
      return Boolean(
        bannerNode.compareDocumentPosition(titleNode) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });
    expect(bannerBeforeDirectory).toBe(true);
  });

  test('de surface renders the localized banner band + inventory total (TASK-485/491)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/de/location');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');

    await expect(page.getByTestId('location-hub-directory-title')).toContainText(
      'Standorte durchsuchen (484)',
    );
    const banner = page.getByTestId('location-inventory-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('484');
    await expect(banner).toContainText('Orte und Communities');

    // The full band localizes on the de surface (TASK-491).
    await expect(
      page.getByRole('heading', { level: 2, name: 'Tritt dem Netzwerk bei' }),
    ).toBeVisible();
    await expect(
      page.getByText('Durchstöbere jeden Ort und jede Community im Netzwerk.'),
    ).toBeVisible();
    const explore = page.getByTestId('location-inventory-explore');
    await expect(explore.getByRole('link', { name: 'Standorte' })).toHaveAttribute(
      'href',
      '/de/location',
    );
  });
});

/**
 * Story D (TASK-493) — country page content-rich mesh (TASK-490), the
 * 7-guide set on every location screen (TASK-489), and the translated hub
 * location-intro (TASK-491).
 *
 * 1. `/location/<country>` pages render the data-driven content-rich mesh
 *    for ALL countries: localized country name, content-rich cities in the
 *    country, and the region list — with registry-exact hrefs on the ACTIVE
 *    locale surface (never `/en/**` on a non-EN surface).
 * 2. Every location screen (hub/country/city) renders the SAME 7-guide
 *    "Guides for starting a community" set — the /location hub and a city
 *    page must expose identical guide links (titles + hrefs).
 * 3. The hub location-intro (`data-testid="location-intro"`) translates on
 *    the /de/location surface (and the EN surface renders the EN copy) —
 *    server-rendered, not just a client toggle artifact.
 */
test.describe('Story D: country mesh + unified guides + translated hub intro (TASK-493)', () => {
  test('colombia country page renders content-rich info: country name, cities, regions', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/colombia');
    // Localized country name in the H1 (registry title, brand stripped).
    await expect(page.locator('h1')).toContainText('Communities in Colombia');

    const mesh = page.getByTestId('location-country-mesh');
    await expect(mesh).toBeVisible();

    // Content-rich cities in the country — alphabetical by localized name
    // (Barranquilla, Bogotá, Medellín).
    const cities = mesh.getByTestId('location-country-cities');
    await expect(cities).toBeVisible();
    await expect(cities.locator('a')).toHaveCount(3);
    await expect(cities.getByRole('link', { name: 'Barranquilla' })).toBeVisible();
    await expect(cities.getByRole('link', { name: 'Bogotá' })).toBeVisible();
    await expect(cities.getByRole('link', { name: 'Medellín' })).toBeVisible();
    // Registry-exact hrefs on the EN surface.
    for (const href of await cities
      .locator('a')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')))) {
      expect(href).toMatch(/^\/en\/location\/colombia\//);
    }
    await expect(cities.locator('a[href="/en/location/colombia/bogota-d-c/bogota"]')).toBeVisible();
    await expect(
      cities.locator('a[href="/en/location/colombia/antioquia/medellin"]'),
    ).toBeVisible();
    await expect(
      cities.locator('a[href="/en/location/colombia/atlantico/barranquilla"]'),
    ).toBeVisible();

    // Region list — distinct regions hosting content-rich cities.
    const regions = mesh.getByTestId('location-country-regions');
    await expect(regions).toBeVisible();
    await expect(regions.locator('a')).toHaveCount(3);
    await expect(regions.getByRole('link', { name: 'Antioquia' })).toBeVisible();
    await expect(regions.getByRole('link', { name: 'Atlántico' })).toBeVisible();
    await expect(regions.getByRole('link', { name: 'Bogotá' })).toBeVisible();
    await expect(regions.locator('a[href="/en/location/colombia/antioquia"]')).toBeVisible();
    await expect(regions.locator('a[href="/en/location/colombia/atlantico"]')).toBeVisible();
    await expect(regions.locator('a[href="/en/location/colombia/bogota-d-c"]')).toBeVisible();
  });

  test('australia country page renders content-rich info: country name, cities, regions', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/australia');
    await expect(page.locator('h1')).toContainText('Communities in Australia');

    const mesh = page.getByTestId('location-country-mesh');
    await expect(mesh).toBeVisible();
    const cities = mesh.getByTestId('location-country-cities');
    await expect(cities.locator('a')).toHaveCount(1);
    await expect(cities.getByRole('link', { name: 'Sydney' })).toBeVisible();
    await expect(
      cities.locator('a[href="/en/location/australia/new-south-wales/sydney"]'),
    ).toBeVisible();
    const regions = mesh.getByTestId('location-country-regions');
    await expect(regions.getByRole('link', { name: 'New South Wales' })).toBeVisible();
    await expect(regions.locator('a[href="/en/location/australia/new-south-wales"]')).toBeVisible();
  });

  test('country mesh city/region hrefs stay on the ACTIVE locale surface (es)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/es/location/colombia');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    // Colombia has no authored es content, so the H1 stays the EN fallback
    // registry title — the mesh itself still localizes (dataset names[es])
    // and the card hrefs move to the ACTIVE es surface (TASK-469/490).
    await expect(page.locator('h1')).toContainText('Colombia');

    const mesh = page.getByTestId('location-country-mesh');
    await expect(mesh).toBeVisible();
    for (const testId of ['location-country-cities', 'location-country-regions']) {
      const hrefs = await mesh
        .getByTestId(testId)
        .locator('a')
        .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')));
      expect(hrefs.length).toBeGreaterThan(0);
      for (const href of hrefs) {
        expect(href, `${testId} card must stay on the es surface: ${href}`).toMatch(
          /^\/es\/location\/colombia\//,
        );
        expect(href, `${testId} card must not leak /en/** (TASK-469): ${href}`).not.toMatch(
          /^\/en\//,
        );
      }
    }
  });

  test('austin city page renders the SAME 7 guides as the /location hub (TASK-489)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location');
    const hubGuides = page.getByTestId('location-guide-links');
    await expect(hubGuides).toBeVisible();
    await expect(hubGuides.locator('a')).toHaveCount(7);
    const hubTitles = await hubGuides.locator('a').allInnerTexts();
    const hubHrefs = await hubGuides
      .locator('a')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')));

    // The city page renders the identical guide set (titles + hrefs).
    await page.goto('/en/location/united-states/texas/austin');
    await expect(page.locator('h1')).toContainText('Communities in Austin');
    const cityGuides = page.getByTestId('location-guide-links');
    await expect(cityGuides).toBeVisible();
    await expect(cityGuides.locator('a')).toHaveCount(7);
    expect(await cityGuides.locator('a').allInnerTexts()).toEqual(hubTitles);
    const cityHrefs = await cityGuides
      .locator('a')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')));
    expect(cityHrefs).toEqual(hubHrefs);
  });

  test('the /location hub intro is translated on /de/location and EN surface (TASK-491)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location');
    await expect(page.getByTestId('location-intro')).toContainText(
      'Every country, region, city, community type, and event idea on the network',
    );

    await page.goto('/de/location');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await expect(page.getByTestId('location-intro')).toContainText(
      'Jedes Land, jede Region, jede Stadt, jeder Community-Typ und jede Veranstaltungsidee im Netzwerk',
    );
  });

  test('the inventory banner is a full band — heading + count + copy + links in one section (TASK-491/493)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location');

    // The band is a single <section> containing the SectionTitle heading,
    // the CountUpStat (count + label), the BodyCopy explainer, AND the
    // ExploreLinks row — not a standalone stat pill.
    const band = page.locator('section', {
      has: page.getByTestId('location-inventory-banner'),
    });
    await expect(band).toHaveCount(1);
    await expect(band.getByRole('heading', { level: 2, name: 'Join the network' })).toBeVisible();
    await expect(band.getByTestId('location-inventory-banner')).toContainText('484');
    await expect(band.getByTestId('location-inventory-banner')).toContainText(
      'Places and Communities',
    );
    await expect(band.getByText('Browse every place and community on the network.')).toBeVisible();
    const explore = band.getByTestId('location-inventory-explore');
    await expect(explore.getByRole('link', { name: 'Locations' })).toHaveAttribute(
      'href',
      '/en/location',
    );
    await expect(explore.getByRole('link', { name: 'Guides' })).toHaveAttribute(
      'href',
      '/en/guides',
    );
    await expect(explore.getByRole('link', { name: 'Community' })).toHaveAttribute(
      'href',
      '/en/community',
    );
  });
});

/**
 * Story E (TASK-498) — location page completeness (TASK-496) + FAQ copy
 * replacement (TASK-495) + first-visit font swap (TASK-494, fouc-load.spec).
 *
 * 1. Country pages (authored `/location/united-states` + un-authored
 *    `/location/italy`) render the full country content: kind-appropriate
 *    "Country facts" data block, content-rich cities + regions sub-sections,
 *    and a FAQ (authored OR data-driven).
 * 2. Region pages (`/location/japan/osaka`) list the region's content-rich
 *    cities under a "Communities in nearby cities" section and render a
 *    data-driven FAQ.
 * 3. Content-rich cities with NO same-region siblings (jakarta/lima/
 *    singapore) still render the nearby-cities section via the sibling
 *    fallback (same-country → global content-rich set).
 * 4. The FAQ answer for "Are the venue suggestions on this page real?" no
 *    longer contains "We never fabricate member counts, ratings, or local
 *    offices." and shows the replacement sourcing line.
 */
test.describe('Story E: country/region content + city sibling fallback + FAQ line (TASK-498)', () => {
  test('authored country page (united-states) renders facts, cities + regions, and FAQ', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/united-states');
    await expect(page.locator('h1')).toContainText('Communities in the United States');

    // Kind-appropriate "Country facts" label (never "City facts").
    await expect(page.getByRole('heading', { level: 2, name: 'Country facts' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'City facts' })).toHaveCount(0);
    // Authored country data points render.
    await expect(page.getByTestId('location-data-points')).toBeVisible();
    await expect(page.getByText(/Federal capital is Washington, D\.C\./)).toBeVisible();

    // Content-rich cities + regions sub-sections.
    const mesh = page.getByTestId('location-country-mesh');
    await expect(mesh).toBeVisible();
    const cities = mesh.getByTestId('location-country-cities');
    await expect(cities).toBeVisible();
    await expect(cities.locator('a').first()).toBeVisible();
    const regions = mesh.getByTestId('location-country-regions');
    await expect(regions).toBeVisible();
    await expect(regions.locator('a').first()).toBeVisible();

    // FAQ renders on the country page.
    await expect(page.getByTestId('location-faq')).toBeVisible();
    await expect(page.getByTestId('location-faq').locator('h3').first()).toBeVisible();
  });

  test('un-authored country page (italy) renders dataset facts, cities + regions, and data-driven FAQ', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/italy');
    await expect(page.locator('h1')).toContainText('Communities in Italy');

    // Country facts label + dataset-driven data points (TASK-496).
    await expect(page.getByRole('heading', { level: 2, name: 'Country facts' })).toBeVisible();
    const points = page.getByTestId('location-data-points');
    await expect(points).toBeVisible();
    await expect(points).toContainText('Population: 60,431,283');
    await expect(points).toContainText('Capital: Rome');

    // Data-driven country mesh — Milan city + Lombardy region.
    const mesh = page.getByTestId('location-country-mesh');
    await expect(mesh).toBeVisible();
    await expect(mesh.getByTestId('location-country-name')).toContainText('Italy');
    const cities = mesh.getByTestId('location-country-cities');
    await expect(cities.getByRole('link', { name: 'Milan' })).toBeVisible();
    const regions = mesh.getByTestId('location-country-regions');
    await expect(regions.getByRole('link', { name: 'Lombardy' })).toBeVisible();

    // Data-driven FAQ for an un-authored country (TASK-496).
    const faq = page.getByTestId('location-faq');
    await expect(faq).toBeVisible();
    await expect(faq.getByText('How do I find communities in Italy?')).toBeVisible();
    await expect(faq.getByText('How many people live in Italy?')).toBeVisible();
    await expect(faq.getByText(/The dataset records a population of 60,431,283/)).toBeVisible();
  });

  test('region page (japan/osaka) lists its cities + Communities in nearby cities + FAQ', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/japan/osaka');
    await expect(page.locator('h1')).toContainText('Communities in Osaka');

    // Region facts label + dataset-driven region data points.
    await expect(page.getByRole('heading', { level: 2, name: 'Region facts' })).toBeVisible();
    const points = page.getByTestId('location-data-points');
    await expect(points).toBeVisible();
    await expect(points).toContainText('Part of Japan');
    await expect(points).toContainText('Population: 126,529,100');

    // Region mesh — content-rich cities in the region under the localized
    // "Communities in nearby cities" subtitle (TASK-496).
    const mesh = page.getByTestId('location-region-mesh');
    await expect(mesh).toBeVisible();
    await expect(mesh.getByTestId('location-region-name')).toContainText('Osaka Prefecture');
    await expect(mesh.getByText('Communities in nearby cities')).toBeVisible();
    const cityCards = mesh.getByTestId('location-region-cities');
    await expect(cityCards.getByRole('link', { name: 'Osaka' })).toBeVisible();
    await expect(cityCards.locator('a[href="/en/location/japan/osaka/osaka"]')).toBeVisible();

    // Data-driven FAQ for the un-authored region.
    const faq = page.getByTestId('location-faq');
    await expect(faq).toBeVisible();
    await expect(faq.getByText('How do I find communities in Osaka Prefecture?')).toBeVisible();
    await expect(faq.getByText('What country is Osaka Prefecture in?')).toBeVisible();
  });

  test('jakarta (no same-region siblings) still renders nearby cities via same-country fallback', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/indonesia/jakarta/jakarta');
    await expect(page.locator('h1')).toContainText('Communities in Jakarta');

    const siblings = page.getByTestId('location-sibling-cities');
    await expect(siblings).toBeVisible();
    // Jakarta's region has no sibling content-rich cities → same-country
    // fallback (Surabaya/Bandung/Bekasi…), registry-exact on the EN surface.
    const hrefs = await siblings
      .locator('a')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).toMatch(/^\/en\/location\/indonesia\//);
    }
    await expect(siblings.getByRole('link', { name: 'Surabaya' })).toBeVisible();
    await expect(siblings.getByRole('link', { name: 'Bandung' })).toBeVisible();
  });

  test('lima (no same-region siblings) still renders nearby cities via same-country fallback', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/peru/lima-province/lima');
    await expect(page.locator('h1')).toContainText('Communities in Lima');

    const siblings = page.getByTestId('location-sibling-cities');
    await expect(siblings).toBeVisible();
    const hrefs = await siblings
      .locator('a')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).toMatch(/^\/en\/location\/peru\//);
    }
    await expect(siblings.getByRole('link', { name: 'Arequipa' })).toBeVisible();
    await expect(siblings.getByRole('link', { name: 'Trujillo' })).toBeVisible();
  });

  test('singapore (city-state, no country siblings) still renders nearby cities via global fallback', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/singapore/singapore/singapore');
    await expect(page.locator('h1')).toContainText('Communities in Singapore');

    const siblings = page.getByTestId('location-sibling-cities');
    await expect(siblings).toBeVisible();
    // Every fallback card is a real registry page (never a dead link).
    const hrefs = await siblings
      .locator('a')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).toMatch(/^\/en\/location\//);
      expect(href).toMatch(/^\/en\/location\/(?!singapore\/singapore\/singapore$).+$/);
    }
  });

  test('city FAQ venue answer shows the sourcing line — never the old fabrication line', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    // Berlin + Jakarta both carry the committed venue-suggestion FAQ; assert
    // the replacement copy (TASK-495) on both an EN city and a fallback city.
    for (const path of [
      '/en/location/germany/berlin/berlin',
      '/en/location/indonesia/jakarta/jakarta',
    ]) {
      await page.goto(path);
      const faq = page.getByTestId('location-faq');
      await expect(faq).toBeVisible();
      const venueCard = faq
        .locator('h3', { hasText: 'Are the venue suggestions on this page real?' })
        .locator('..');
      await expect(venueCard).toBeVisible();
      const answerText = (await venueCard.innerText()) ?? '';
      expect(answerText).not.toContain(
        'We never fabricate member counts, ratings, or local offices',
      );
      expect(answerText).toContain('compiled from real, publicly known community spaces');
    }
  });

  test('FAQ answer line is gone across authored + fallback cities (TASK-495)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    // The old fabrication line must not appear anywhere in the rendered FAQ
    // on a spread of city pages (committed EN + sibling-fallback cities).
    const paths = [
      '/en/location/germany/berlin/berlin',
      '/en/location/united-states/new-york/new-york',
      '/en/location/indonesia/jakarta/jakarta',
      '/en/location/peru/lima-province/lima',
      '/en/location/singapore/singapore/singapore',
      '/en/location/japan/osaka/osaka',
    ];
    for (const path of paths) {
      const response = await page.goto(path);
      expect(response?.status(), `${path} must resolve, not 404`).toBe(200);
      const faq = page.getByTestId('location-faq');
      await expect(faq).toBeVisible();
      const faqText = (await faq.innerText()) ?? '';
      expect(faqText, `${path} must not contain the old fabrication line`).not.toContain(
        'We never fabricate member counts, ratings, or local offices',
      );
    }
  });
});
