import { test, expect, type Locator, type Page } from '@playwright/test';

/**
 * Location pages e2e (TASK-308 fe-location-pages).
 *
 * Covers the `/location/**` dynamic surface + the Berlin `de` locale:
 *  1. hub → country → region → city → variant navigation (internal-link mesh),
 *  2. per-page canonical + robots meta (noindex for Tier-3 / failed gates),
 *  3. Berlin `de` pages serve the German body + full hreflang set
 *     (de self + en + x-default → EN) via `alternates.languages`,
 *  4. EN Berlin pages emit the bidirectional hreflang cluster; EN-only pages
 *     (hub/country/region/NYC) emit the full 21-locale hreflang cluster
 *     (G-10, TASK-557),
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

/** The 21 supported locales — mirrors `SUPPORTED_LOCALES` in @joinorigin/i18n. */
const ALL_LOCALES = [
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
] as const;

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

  test('every mesh level renders a single h1 + breadcrumbs + signup CTA', async ({ page }) => {
    for (const path of MESH) {
      await page.goto(path);
      expect(await page.locator('h1').count()).toBe(1);
      await expect(page.locator('[data-testid="location-breadcrumbs"]')).toBeVisible();
      await expect(page.locator('[data-testid="location-cta-band"]')).toBeVisible();
      // Sprint 24 (TASK-556): the location CTA is a real link to the
      // locale-prefixed signup route (waitlist modal retired).
      const joinButton = page.getByTestId('location-cta-join-button');
      await expect(joinButton).toBeVisible();
      await expect(joinButton).toHaveAttribute('href', /\/en\/signup$/);
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
    test(`${path} (EN-only) emits the full 21-locale hreflang cluster (G-10)`, async ({ page }) => {
      await page.goto(path);
      // G-10 (TASK-557): every indexable EN page carries the full hreflang
      // cluster — each `/<locale>` counterpart + en self + x-default → EN.
      for (const locale of ALL_LOCALES) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${locale}"]`)).toHaveCount(1);
      }
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
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
    // Story D full-card links (TASK-533) wrap the title + a "Explore
    // communities" CardBody — assert the CardTitle (h3) so the name list
    // matches the intent (card names), not the full link text.
    const names = await flagship.locator('a h3').allInnerTexts();
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
    // (Story D full-card links add a CardBody — assert the h3 title only.)
    const names = await flagship.locator('a h3').allInnerTexts();
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
    // Story D full-card links (TASK-535) wrap the title + a city CardBody —
    // assert the CardTitle (h3) so the name list matches the intent.
    const names = await grid.locator('a h3').allInnerTexts();
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
    // Story D full-card links add a CardBody — assert the h3 title only.
    const names = await grid.locator('a h3').allInnerTexts();
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

  test('authored country page (italy) renders authored facts, cities + regions, and authored FAQ', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/italy');
    await expect(page.locator('h1')).toContainText('Communities in Italy');

    // Country facts label — italy now has authored content (TASK-503), so
    // the data points are the authored prose facts (richer than the dataset
    // fallback asserted by the pre-Story-G version of this test).
    await expect(page.getByRole('heading', { level: 2, name: 'Country facts' })).toBeVisible();
    const points = page.getByTestId('location-data-points');
    await expect(points).toBeVisible();
    await expect(points).toContainText('Population of roughly 60.4 million');
    await expect(points).toContainText('Capital is Rome');

    // Data-driven country mesh — Milan city + Lombardy region.
    const mesh = page.getByTestId('location-country-mesh');
    await expect(mesh).toBeVisible();
    await expect(mesh.getByTestId('location-country-name')).toContainText('Italy');
    const cities = mesh.getByTestId('location-country-cities');
    await expect(cities.getByRole('link', { name: 'Milan' })).toBeVisible();
    const regions = mesh.getByTestId('location-country-regions');
    await expect(regions.getByRole('link', { name: 'Lombardy' })).toBeVisible();

    // Authored FAQ for the country page (TASK-503 content wins over the
    // data-driven template).
    const faq = page.getByTestId('location-faq');
    await expect(faq).toBeVisible();
    await expect(faq.getByText('How do I find communities in Italy?')).toBeVisible();
    await expect(faq.getByText('Can I start a community in an Italian city?')).toBeVisible();
    await expect(faq.getByText('Does JoinOrigin operate in Italy?')).toBeVisible();
  });

  test('dataset-driven country facts + FAQ still render on a genuinely un-authored country (norway)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/norway');
    await expect(page.locator('h1')).toContainText('Communities in Norway');

    // Norway has no authored content: the page must still render the
    // dataset-driven "Country facts" data points (TASK-496) and the
    // data-driven FAQ template — never an empty shell.
    await expect(page.getByRole('heading', { level: 2, name: 'Country facts' })).toBeVisible();
    const points = page.getByTestId('location-data-points');
    await expect(points).toBeVisible();
    await expect(points).toContainText('Population: 5,314,336');
    await expect(points).toContainText('Capital: Oslo');

    const faq = page.getByTestId('location-faq');
    await expect(faq).toBeVisible();
    await expect(faq.getByText('How do I find communities in Norway?')).toBeVisible();
    await expect(faq.getByText('How many people live in Norway?')).toBeVisible();
  });

  test('region page (japan/osaka) lists its cities + Communities in nearby cities + FAQ', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/japan/osaka');
    await expect(page.locator('h1')).toContainText('Communities in Osaka');

    // Region facts label + authored region data points (osaka region content
    // was authored in Story G TASK-505, so the authored prose facts win over
    // the dataset fallback the pre-Story-G test asserted).
    await expect(page.getByRole('heading', { level: 2, name: 'Region facts' })).toBeVisible();
    const points = page.getByTestId('location-data-points');
    await expect(points).toBeVisible();
    await expect(points).toContainText('Osaka Prefecture hosts Osaka');
    await expect(points).toContainText('more than eight million');

    // Region mesh — content-rich cities in the region under the localized
    // "Communities in nearby cities" subtitle (TASK-496).
    const mesh = page.getByTestId('location-region-mesh');
    await expect(mesh).toBeVisible();
    await expect(mesh.getByTestId('location-region-name')).toContainText('Osaka Prefecture');
    await expect(mesh.getByText('Communities in nearby cities')).toBeVisible();
    const cityCards = mesh.getByTestId('location-region-cities');
    await expect(cityCards.getByRole('link', { name: 'Osaka' })).toBeVisible();
    await expect(cityCards.locator('a[href="/en/location/japan/osaka/osaka"]')).toBeVisible();

    // Authored FAQ for the region (TASK-505 content wins over the data-driven
    // template).
    const faq = page.getByTestId('location-faq');
    await expect(faq).toBeVisible();
    await expect(
      faq.getByText('Is the Osaka region different from the Osaka city scene?'),
    ).toBeVisible();
    await expect(
      faq.getByText('Which Osaka districts have the most active communities?'),
    ).toBeVisible();
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

/**
 * Story G (TASK-510) — content-rich country/region prose + predominant-locale
 * translations (TASK-502..508 authored content).
 *
 * 1. `/location/mexico` renders the authored content-rich intro (≥150 words —
 *    the G2 gate — NOT the short fallback hero lead), the "Country facts"
 *    data block, and the authored FAQ.
 * 2. `/location/japan/osaka` renders the authored region intro (≥150 words),
 *    the region mesh (cities in the region), and the authored FAQ.
 * 3. Predominant-locale surfaces render translated content: the
 *    `/es/location/colombia` intro is Spanish and `/de/location/germany` is
 *    German (the country pages now carry predominant-locale content files).
 * 4. Country-page FAQ cross-checks Story E: the old "We never fabricate…"
 *    line is gone and the venue-suggestion answer shows the replacement
 *    sourcing line on the country's city surface.
 */
test.describe('Story G: content-rich country/region prose + predominant-locale content (TASK-510)', () => {
  /** Count whitespace-delimited words in a rendered text block. */
  async function wordCount(locator: ReturnType<Page['getByTestId']>): Promise<number> {
    const text = ((await locator.innerText()) ?? '').trim();
    return text.length === 0 ? 0 : text.split(/\s+/).length;
  }

  test('mexico country page renders a content-rich intro (≥150 words, not the fallback lead) + facts + FAQ', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/mexico');
    await expect(page.locator('h1')).toContainText('Communities in Mexico');

    // The authored intro (G2: ≥150 words) renders in the location-intro
    // block — never the short fallback hero lead.
    const intro = page.getByTestId('location-intro');
    await expect(intro).toBeVisible();
    const introWords = await wordCount(intro);
    expect(introWords, 'mexico intro must meet the G2 ≥150-word gate').toBeGreaterThanOrEqual(150);
    await expect(intro).toContainText('Mexico is one of the most community-oriented countries');

    // The intro block is distinct from the short hero lead (the fallback
    // that renders when no authored prose exists).
    const heroLead = page.locator('[data-hero="lead"]');
    await expect(heroLead).toBeVisible();
    const leadWords = await wordCount(heroLead);
    expect(introWords).toBeGreaterThan(leadWords);

    // Country facts block with the authored data points.
    await expect(page.getByRole('heading', { level: 2, name: 'Country facts' })).toBeVisible();
    const points = page.getByTestId('location-data-points');
    await expect(points).toBeVisible();
    await expect(points).toContainText('Capital is Mexico City');
    await expect(points).toContainText('126 million');

    // Authored FAQ on the country page.
    const faq = page.getByTestId('location-faq');
    await expect(faq).toBeVisible();
    await expect(faq.getByText('How do I find communities in Mexico?')).toBeVisible();
    await expect(
      faq.getByText('How does regional identity shape Mexican communities?'),
    ).toBeVisible();
  });

  test('osaka region page renders a content-rich intro (≥150 words) + region mesh + FAQ', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/japan/osaka');
    await expect(page.locator('h1')).toContainText('Communities in Osaka');

    // The authored region intro (G2: ≥150 words).
    const intro = page.getByTestId('location-intro');
    await expect(intro).toBeVisible();
    const introWords = await wordCount(intro);
    expect(introWords, 'osaka intro must meet the G2 ≥150-word gate').toBeGreaterThanOrEqual(150);
    await expect(intro).toContainText(
      'Osaka Prefecture is the compact but enormously energetic home of Osaka city',
    );

    // Region facts block.
    await expect(page.getByRole('heading', { level: 2, name: 'Region facts' })).toBeVisible();
    const points = page.getByTestId('location-data-points');
    await expect(points).toBeVisible();
    await expect(points).toContainText('Osaka Prefecture hosts Osaka');

    // Region mesh — the region's content-rich cities.
    const mesh = page.getByTestId('location-region-mesh');
    await expect(mesh).toBeVisible();
    await expect(mesh.getByTestId('location-region-name')).toContainText('Osaka Prefecture');
    await expect(
      mesh.getByTestId('location-region-cities').getByRole('link', { name: 'Osaka' }),
    ).toBeVisible();

    // Authored FAQ.
    const faq = page.getByTestId('location-faq');
    await expect(faq).toBeVisible();
    await expect(
      faq.getByText('Is the Osaka region different from the Osaka city scene?'),
    ).toBeVisible();
  });

  test('es colombia country page renders the Spanish intro (predominant-locale content)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/es/location/colombia');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('h1')).toContainText('Comunidades en Colombia');

    // The Spanish-authored intro (G2: ≥150 words) — the predominant-locale
    // content file (TASK-502), not the EN fallback.
    const intro = page.getByTestId('location-intro');
    await expect(intro).toBeVisible();
    const introWords = await wordCount(intro);
    expect(introWords, 'es colombia intro must meet the G2 ≥150-word gate').toBeGreaterThanOrEqual(
      150,
    );
    await expect(intro).toContainText('Colombia es un país de identidades regionales fuertes');

    // Spanish data points + FAQ.
    const points = page.getByTestId('location-data-points');
    await expect(points).toContainText('La capital es Bogotá');
    const faq = page.getByTestId('location-faq');
    await expect(faq).toBeVisible();
    await expect(faq.getByText('¿Cómo encuentro comunidades en Colombia?')).toBeVisible();
  });

  test('de germany country page renders the German intro (predominant-locale content)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/de/location/germany');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await expect(page.locator('h1')).toContainText('Communities in Deutschland');

    // The German-authored intro (G2: ≥150 words) — TASK-507 translated the
    // flagship Germany country page.
    const intro = page.getByTestId('location-intro');
    await expect(intro).toBeVisible();
    const introWords = await wordCount(intro);
    expect(introWords, 'de germany intro must meet the G2 ≥150-word gate').toBeGreaterThanOrEqual(
      150,
    );
    await expect(intro).toContainText(
      'Deutschland verbindet eine tiefe Tradition organisierten Gemeinschaftslebens',
    );

    // German data points + FAQ.
    const points = page.getByTestId('location-data-points');
    await expect(points).toContainText('Die Bundeshauptstadt ist Berlin');
    const faq = page.getByTestId('location-faq');
    await expect(faq).toBeVisible();
    await expect(faq.getByText('Wie finde ich Communities in Deutschland?')).toBeVisible();
  });

  test('country page FAQ shows the replacement sourcing line — never the fabrication line (cross-check Story E)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // On the country page the FAQ is visible and no answer carries the old
    // fabrication line (Story G content + TASK-495 replacement are both in).
    await page.goto('/en/location/mexico');
    const faq = page.getByTestId('location-faq');
    await expect(faq).toBeVisible();
    const countryFaqText = (await faq.innerText()) ?? '';
    expect(countryFaqText).not.toContain(
      'We never fabricate member counts, ratings, or local offices',
    );

    // Cross-check Story E on the country's city surface: the venue-suggestion
    // answer shows the replacement sourcing line.
    await page.goto('/en/location/mexico/mexico-city/mexico-city');
    const cityFaq = page.getByTestId('location-faq');
    await expect(cityFaq).toBeVisible();
    const venueCard = cityFaq
      .locator('h3', { hasText: 'Are the venue suggestions on this page real?' })
      .locator('..');
    await expect(venueCard).toBeVisible();
    const answerText = (await venueCard.innerText()) ?? '';
    expect(answerText).not.toContain('We never fabricate member counts, ratings, or local offices');
    expect(answerText).toContain('compiled from real, publicly known community spaces');
  });
});

test.describe('Story H: /location i18n completeness (TASK-519)', () => {
  test('/es/location Browse-locations directory cards show localized names — Colombia card in Spanish', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/es/location');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');

    // The Countries section (TASK-480 section keys render per-locale) shows
    // the Colombia card with its committed Spanish title (TASK-515) — never
    // the EN registry title.
    const countries = page.getByTestId('location-hub-directory-countries');
    await expect(countries).toBeVisible();
    const colombiaCard = countries.getByRole('link', { name: 'Comunidades en Colombia' });
    await expect(colombiaCard).toBeVisible();
    await expect(colombiaCard).toHaveAttribute('href', '/es/location/colombia');
    await expect(countries.getByText('Communities in Colombia')).toHaveCount(0);

    // The directory as a whole carries no stale EN country card titles.
    const directory = page.getByTestId('location-hub-directory');
    await expect(directory.getByText('Communities in Colombia')).toHaveCount(0);
  });

  test('/es/location directory cards fall back to the localized dataset name for uncommitted countries', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/es/location');

    // Germany has no committed es content → the es dataset name wins
    // ("Alemania"), never the EN registry title.
    const countries = page.getByTestId('location-hub-directory-countries');
    await expect(countries).toBeVisible();
    await expect(countries.getByRole('link', { name: 'Alemania' })).toBeVisible();
    await expect(countries.getByText('Communities in Germany')).toHaveCount(0);

    // A country without committed es content (united-arab-emirates) still
    // shows the es dataset name ("Emiratos Árabes Unidos"), never the EN
    // registry title.
    await expect(countries.getByRole('link', { name: 'Emiratos Árabes Unidos' })).toBeVisible();
    await expect(countries.getByText('Communities in United Arab Emirates')).toHaveCount(0);
  });

  test('/de/location/united-arab-emirates H1 renders German + breadcrumb shows the localized country crumb', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/de/location/united-arab-emirates');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');

    // TASK-516 — the hero H1 resolves the de dataset name for a country with
    // no committed de content, never the EN "Communities in United Arab
    // Emirates" registry title. (The hero LEAD stays the EN registry
    // description for uncommitted countries — that's expected.)
    await expect(page.locator('h1')).toContainText('Vereinigte Arabische Emirate');
    await expect(page.locator('h1')).not.toContainText('Communities in United Arab Emirates');

    // Breadcrumbs: Home + hub resolve through the de chrome dictionary and
    // the country crumb carries the localized de dataset name.
    const breadcrumbs = page.getByTestId('location-breadcrumbs');
    await expect(breadcrumbs).toContainText('Startseite');
    await expect(breadcrumbs).toContainText('Communities nach Stadt');
    await expect(breadcrumbs).toContainText('Vereinigte Arabische Emirate');
    await expect(breadcrumbs.getByText('Home')).toHaveCount(0);
    await expect(breadcrumbs).not.toContainText('Communities in United Arab Emirates');
  });

  test('/en/location/vietnam/ho-chi-minh-city-hcmc/ho-chi-minh-city presence-claim SectionTitle shows the proper-cased city', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    // The region slug for Ho Chi Minh City is `ho-chi-minh-city-hcmc`
    // (dataset asciiName "Ho Chi Minh City (HCMC)").
    await page.goto('/en/location/vietnam/ho-chi-minh-city-hcmc/ho-chi-minh-city');

    // TASK-517 — the honest presence claim renders the proper-cased dataset
    // display name, never the lowercase slug-spaced params ("ho chi minh
    // city").
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Find or start a community in Ho Chi Minh City',
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Find or start a community in ho chi minh city',
        exact: true,
      }),
    ).toHaveCount(0);
  });

  test('region page presence claim shows the proper-cased region name (japan/osaka)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/location/japan/osaka');

    // TASK-517 — the region page presence claim resolves the dataset region
    // display name ("Osaka Prefecture") — proper-cased, never the lowercase
    // slug "osaka".
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Find or start a community in Osaka Prefecture',
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Find or start a community in osaka',
        exact: true,
      }),
    ).toHaveCount(0);
  });
});

/**
 * Sprint 22 (TASK-542, Stories A/C/D) — mobile-first rendering + full-card
 * click + keyboard focus indicator at the researched minimum viewport
 * (TASK-526: 320px floor; narrow foldable cover class ≈311–342px).
 *
 * 1. The hub renders its directory grids, flagship-city grid, and inventory
 *    banner at the 320px floor with NO horizontal overflow; every card grid
 *    is a single column (mobile-first base = 1fr, enhanced at `mobile: 480`).
 * 2. Clickable location cards (directory, flagship, sibling, guide-link,
 *    country/region mesh) are single wrapping `<a>` links (Story D): clicking
 *    ANYWHERE on the card — including the corner padding, not just the title
 *    text — navigates to the card's href.
 * 3. Interactive card links expose a visible keyboard focus indicator
 *    (`:focus-visible` outline using `theme.colors.focusRing`) (Story C).
 */
test.describe('Sprint 22: mobile-first location surfaces + full-card + focus (TASK-542)', () => {
  /** Story A/D2 invariant: the page never scrolls horizontally. */
  async function expectNoHorizontalOverflow(page: Page): Promise<void> {
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - window.innerWidth;
    });
    expect(overflow, 'page must not scroll horizontally').toBeLessThanOrEqual(0);
  }

  /** Asserts a CardGrid renders a single column (mobile-first base). */
  async function expectSingleColumnGrid(page: Page, grid: Locator) {
    await expect(grid).toBeVisible();
    const tracks = await grid.evaluate((el) =>
      getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean),
    );
    expect(tracks, 'mobile-first grid must be a single column').toHaveLength(1);
    // The single column fits the viewport (no card overflows horizontally).
    const box = await grid.locator('a').first().boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(
      (await page.evaluate(() => window.innerWidth)) + 1,
    );
  }

  /**
   * Story D — clicks the BOTTOM-LEFT padding corner of a card (not its title
   * text) and asserts navigation to the card's href. The card is a single
   * wrapping `<a>` (CardLink), so any point on it must navigate.
   */
  async function expectFullCardClickNavigates(page: Page, card: Locator) {
    await expect(card).toBeVisible();
    await card.scrollIntoViewIfNeeded();
    const box = (await card.boundingBox())!;
    const href = (await card.getAttribute('href')) ?? '';
    expect(href).toMatch(
      /^\/(en|de|es|ar|fr|it|nl|pl|pt-BR|hi|id|ja|ko|fa|ru|th|tr|uk|zh-CN|zh-TW)?\/location/,
    );
    // The corner point sits in the card's padding area, far from the title.
    await page.mouse.click(box.x + 10, box.y + box.height - 10);
    await page.waitForURL(`**${href}`, { timeout: 120_000 });
  }

  test('hub at the 320px floor: directory, flagship grid, and inventory banner render without horizontal overflow', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/en/location');

    // The three mobile surfaces the hub renders (TASK-480/485/491).
    await expect(page.getByTestId('location-inventory-banner')).toBeVisible();
    const flagship = page.getByTestId('location-flagship-cities');
    await expect(flagship).toBeVisible();
    await expect(flagship.locator('a')).toHaveCount(6);
    await expect(page.getByTestId('location-hub-directory')).toBeVisible();

    // D1/D2 invariant at the researched floor.
    await expectNoHorizontalOverflow(page);

    // Directory grids are single-column at the floor.
    await expectSingleColumnGrid(page, page.getByTestId('location-hub-directory-countries'));
    await expectSingleColumnGrid(page, page.getByTestId('location-hub-directory-cities'));
  });

  test('city page at the 320px floor: sibling + guide-link grids render single-column without overflow', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/en/location/germany/berlin/berlin');

    await expectNoHorizontalOverflow(page);
    await expectSingleColumnGrid(page, page.getByTestId('location-sibling-cities'));
    await expectSingleColumnGrid(page, page.getByTestId('location-guide-links'));
  });

  test('full-card click: clicking the corner of a hub directory card navigates', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/en/location');

    const card = page.getByTestId('location-hub-directory-countries').locator('a').first();
    await expectFullCardClickNavigates(page, card);
    // Landed on the country page with its content rendered.
    await expect(page.locator('h1')).toContainText(/Communities in/);
  });

  test('full-card click: clicking the corner of a city sibling card navigates', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/en/location/germany/berlin/berlin');

    const card = page.getByTestId('location-sibling-cities').locator('a').first();
    await expectFullCardClickNavigates(page, card);
    await expect(page.locator('h1')).toContainText(/Communities in/);
  });

  test('keyboard focus indicator: a directory card focused via Tab shows a visible :focus-visible outline', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/en/location');

    const card = page.getByTestId('location-hub-directory-countries').locator('a').first();
    await expect(card).toBeVisible();

    // Navigate with the keyboard until the interactive card receives focus
    // (real keyboard modality — the Story C `:focus-visible` contract).
    let focused = false;
    for (let i = 0; i < 120 && !focused; i += 1) {
      await page.keyboard.press('Tab');
      focused = await card.evaluate((el) => document.activeElement === el);
    }
    expect(focused, 'the card link must be reachable via keyboard').toBe(true);

    const focus = await card.evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        focusVisible: el.matches(':focus-visible'),
        outlineStyle: cs.outlineStyle,
        outlineWidth: cs.outlineWidth,
        outlineColor: cs.outlineColor,
      };
    });
    expect(focus.focusVisible, ':focus-visible must match for keyboard focus').toBe(true);
    expect(focus.outlineStyle).not.toBe('none');
    expect(parseFloat(focus.outlineWidth)).toBeGreaterThan(0);
    // The focus ring uses the design token (rgb(124, 156, 255) = #7C9CFF).
    expect(focus.outlineColor).toBe('rgb(124, 156, 255)');
  });
});
