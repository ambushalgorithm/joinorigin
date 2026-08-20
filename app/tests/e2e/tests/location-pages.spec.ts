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
