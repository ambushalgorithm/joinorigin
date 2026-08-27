import { expect, test } from '@playwright/test';

/**
 * Sprint 24 Wave-3 — guides "Origin Building" + location "Origins" reframe
 * validation gate (TASK-574).
 *
 * Runs against the production build (`next start`) and verifies the
 * PM-approved Wave-3 reframe renders on the required surfaces:
 *
 *  1. /guides hub — "Origin Building Guides" (eyebrow "Origin building"),
 *     Origin-first hub lead, universalCopy
 *     ("Origins are online by nature, and they can also have a local space.
 *     Find or start an Origin near you:"), and the Start-local city cards
 *     carrying cityCardBody ("Explore the local spaces and people behind
 *     Origins in {city}.");
 *  2. Renamed guide slugs (start-a-community → start-an-origin,
 *     keep-a-community-active → keep-an-origin-active,
 *     hybrid-communities → hybrid-origins) 301-redirect on the EN + a
 *     non-EN locale, and the new slugs resolve 200 with the renamed Origin
 *     headings;
 *  3. /location hub — "Origins by City" chrome: eyebrow "Origins by city",
 *     presence claim "Find or start an Origin in your city", group types
 *     ("Startup Origins" …), and the "Places and Origins" inventory banner;
 *  4. City page — /en/location/germany/berlin/berlin renders the "Origins in
 *     Berlin" framing;
 *  5. No "Communities by City" / "Find or start a community" leftovers in
 *     the visible chrome of the guides hub, location hub, or a city page.
 *
 * The exhaustive metadata/hreflang assertions live in seo.spec.ts; this spec
 * pins the visible-copy contracts + the redirect contract. Serial mode keeps
 * the shared prod server stable (repo convention for multi-page specs).
 */
test.describe.configure({ mode: 'serial' });

/** The 3 renamed guide slugs + their Wave-3 headings (TASK-573). */
const REDIRECTS = [
  {
    oldSlug: 'start-a-community',
    newSlug: 'start-an-origin',
    heading: 'How to Start an Origin',
  },
  {
    oldSlug: 'keep-a-community-active',
    newSlug: 'keep-an-origin-active',
    heading: 'How to Keep an Origin Active & Engaged',
  },
  {
    oldSlug: 'hybrid-communities',
    newSlug: 'hybrid-origins',
    heading: 'Hybrid Origins: How to Run In-Person + Online Together',
  },
] as const;

test.describe('/guides hub — Origin Building reframe (TASK-574)', () => {
  test('hub renders "Origin Building Guides" + eyebrow + metadata title', async ({ page }) => {
    await page.goto('/en/guides');

    // Hero chrome (seoContent.guides.hubEyebrow / hubTitle).
    await expect(page.locator('h1')).toContainText('Origin Building Guides');
    await expect(page.getByText('Origin building', { exact: true })).toBeVisible();
    // SEO metadata (lib/seo/guides.ts hubEntry — TASK-573).
    await expect(page).toHaveTitle('Origin Building Guides | JoinOrigin');

    // The 12-guide grid renders (7 original + 5 new).
    await expect(page.locator('[data-testid="guides-hub-grid"] a')).toHaveCount(12);
  });

  test('hub renders universalCopy + Start-local city cards with Origin cityCardBody', async ({
    page,
  }) => {
    await page.goto('/en/guides');

    // universalCopy (TASK-569 Option C verbatim).
    await expect(
      page.getByText(
        'Origins are online by nature, and they can also have a local space. Find or start an Origin near you:',
      ),
    ).toBeVisible();

    // Start-local grid renders the content-rich city set with the Origin
    // cityCardBody (EN area first: Austin…).
    const grid = page.getByTestId('guides-hub-start-local');
    await expect(grid).toBeVisible();
    await expect(grid.getByRole('link', { name: 'Austin' })).toBeVisible();
    await expect(
      grid.getByText('Explore the local spaces and people behind Origins in Austin.'),
    ).toBeVisible();
    // A second city proves the template, not a hardcoded Austin card.
    await expect(
      grid.getByText('Explore the local spaces and people behind Origins in Berlin.'),
    ).toHaveCount(0); // Berlin is not in the EN-area-first 6 on /en/guides
    await expect(
      grid.getByText('Explore the local spaces and people behind Origins in Chicago.'),
    ).toBeVisible();
  });

  test('guide grid + detail pages render the renamed Origin headings', async ({ page }) => {
    await page.goto('/en/guides');
    const grid = page.getByTestId('guides-hub-grid');
    for (const { heading } of REDIRECTS) {
      await expect(grid.getByRole('link', { name: heading })).toBeVisible();
    }

    // The renamed slug resolves 200 with the renamed heading on the detail
    // page (h1 from the guide content heading — TASK-573).
    for (const { newSlug, heading } of REDIRECTS) {
      const response = await page.goto(`/en/guides/${newSlug}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toContainText(heading);
    }
  });
});

test.describe('guide slug redirects — 301 old → new on EN + de (TASK-573/574)', () => {
  for (const { oldSlug, newSlug, heading } of REDIRECTS) {
    test(`${oldSlug} 301-redirects to ${newSlug} and the new slug renders the Origin heading`, async ({
      request,
      page,
    }) => {
      // EN surface: permanent redirect (Next 16 emits 308 for
      // `permanent: true` — method-preserving; 301-equivalent for SEO)
      // with the destination in the Location header.
      const enResponse = await request.get(`/en/guides/${oldSlug}`, { maxRedirects: 0 });
      expect([301, 308], `EN ${oldSlug} must redirect permanently`).toContain(enResponse.status());
      expect(enResponse.headers()['location']).toBe(`/en/guides/${newSlug}`);

      // Non-EN surface (de) follows the same permanent-redirect contract.
      const deResponse = await request.get(`/de/guides/${oldSlug}`, { maxRedirects: 0 });
      expect([301, 308], `de ${oldSlug} must redirect permanently`).toContain(deResponse.status());
      expect(deResponse.headers()['location']).toBe(`/de/guides/${newSlug}`);

      // The new slug resolves 200 server-side (no orphan).
      const newResponse = await request.get(`/en/guides/${newSlug}`);
      expect(newResponse.status(), `EN ${newSlug} must resolve`).toBe(200);

      // Browser follow: the old URL lands on the new slug with the renamed
      // heading (redirect is seamless).
      await page.goto(`/en/guides/${oldSlug}`);
      await expect(page).toHaveURL(new RegExp(`/en/guides/${newSlug}(?:/|$)`));
      await expect(page.locator('h1')).toContainText(heading);
    });
  }
});

test.describe('/location hub — Origins chrome (TASK-574)', () => {
  test('hub renders Origins by City + presence claim + eyebrow + metadata title', async ({
    page,
  }) => {
    await page.goto('/en/location');

    await expect(page.locator('h1')).toContainText('Origins by City');
    await expect(page.getByText('Find or start an Origin in your city')).toBeVisible();
    await expect(page.getByText('Origins by city', { exact: true })).toBeVisible();
    // Hub intro resolves through the reframed dictionary (Origin type).
    await expect(page.getByTestId('location-intro')).toContainText(
      'Every country, region, city, Origin type, and event idea on the network',
    );
    // SEO metadata — hubEntry reframed by TASK-572.
    await expect(page).toHaveTitle(
      'Origins by City — Find or Start an Origin Near You | JoinOrigin',
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Explore Origins by city around the world/,
    );
  });

  test('hub renders the Origin group types + Places and Origins banner', async ({ page }) => {
    await page.goto('/en/location');

    // The directory's group-type section is "Origin types" (TASK-569) and
    // its cards carry the Origin group-type labels (seoContent.groupTypes ×
    // cities — e.g. "Startup Origins in Berlin").
    const communityTypes = page.getByTestId('location-hub-directory-communityTypes');
    await expect(communityTypes).toBeVisible();
    await expect(
      page.getByTestId('location-hub-directory').getByText('Origin types'),
    ).toBeVisible();
    for (const label of [
      'Startup Origins in Berlin',
      'Creative & design Origins in Berlin',
      'Political & civic Origins in Berlin',
      'Origin meetups & events in Berlin',
      'Small business Origins in Berlin',
    ]) {
      await expect(communityTypes.getByRole('link', { name: label })).toBeVisible();
    }

    // Inventory banner carries the "Places and Origins" label (TASK-569).
    const banner = page.getByTestId('location-inventory-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('Places and Origins');
  });
});

test.describe('city page — Origins framing + no community leftovers (TASK-574)', () => {
  test('Berlin city page renders the Origins in Berlin framing', async ({ page }) => {
    await page.goto('/en/location/germany/berlin/berlin');
    await expect(page.locator('h1')).toContainText('Origins in Berlin');
    await expect(page).toHaveTitle(/Origins in Berlin \| JoinOrigin/);
  });

  test('no "Communities by City" / "Find or start a community" leftovers in visible chrome', async ({
    page,
  }) => {
    const surfaces = ['/en/location', '/en/guides', '/en/location/germany/berlin/berlin'];
    for (const path of surfaces) {
      await page.goto(path);
      const body = page.locator('body');
      await expect(body.getByText('Communities by City', { exact: false })).toHaveCount(0);
      await expect(body.getByText('Find or start a community', { exact: false })).toHaveCount(0);
    }
  });
});
