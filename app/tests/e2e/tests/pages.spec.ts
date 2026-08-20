import { test, expect } from '@playwright/test';

/**
 * Menu pages end-to-end validation (TASK-218 e2e-seo).
 *
 * Covers:
 *  - every Sprint 4 menu page renders (200, visible content, correct H1)
 *  - header + footer navigation links reach each page
 *  - single H1 per page (LLM-crawler friendliness, arch §5.1)
 *  - main/nav/header/footer landmarks present
 *  - LLM-crawler readable copy (arch §5.2)
 *
 * Design sources: `app/docs/design/sprint-4-discovery.md` §4–§5,
 * `app/docs/design/sprint-4-seo-arch.md` §5.1–§5.2.
 *
 * NOTE — known implementation gaps are tracked with `test.fail()` markers
 * (same pattern as the a11y-focus-return gap in TASK-205/207): the test
 * asserts the design criterion; the marker records that the criterion is
 * currently NOT met so the suite stays green while the gap is flagged in
 * test-report.md with routing to the owning fe role. When a fe role fixes
 * the gap, it removes the marker and the assertion becomes required.
 */

// These specs navigate many pages; run serially to avoid starving the shared
// dev server (keeps the pre-existing mobile-nav/responsive suite stable).
test.describe.configure({ mode: 'serial' });

export const MENU_PAGES = [
  {
    path: '/en',
    h1: 'Ideas, projects and community collaboration space — where new and existing teams find their Origin.',
  },
  { path: '/en/features', h1: 'Everything a community needs, in one calm workspace' },
  { path: '/en/community', h1: 'Where people find each other' },
  { path: '/en/docs', h1: 'JoinOrigin docs' },
  { path: '/en/about', h1: 'The most valuable asset is your network' },
  { path: '/en/contact', h1: 'Talk to us' },
  { path: '/en/privacy', h1: 'Privacy Policy' },
  { path: '/en/terms', h1: 'Terms of Service' },
] as const;

/** Header primary nav labels → href — all on the /en/** canonical surface
 *  (all-routes-prefixed, TASK-464). */
export const HEADER_NAV = [
  { label: 'Features', href: '/en/features' },
  { label: 'Docs', href: '/en/docs' },
  { label: 'About', href: '/en/about' },
] as const;

/** Explore submenu labels → href (TASK-316; 92cd1f4 moved Community in, Glossary out). */
export const EXPLORE_NAV = [
  { label: 'Community', href: '/en/community' },
  { label: 'Guides', href: '/en/guides' },
  { label: 'Locations', href: '/en/location' },
] as const;

/** Footer grouped links (discovery §3.2 + Explore group TASK-316). */
export const FOOTER_NAV = [
  { label: 'Locations', href: '/en/location' },
  { label: 'Guides', href: '/en/guides' },
  { label: 'Glossary', href: '/en/glossary' },
  { label: 'Features', href: '/en/features' },
  { label: 'Community', href: '/en/community' },
  { label: 'Docs', href: '/en/docs' },
  { label: 'About', href: '/en/about' },
  { label: 'Contact', href: '/en/contact' },
  { label: 'Privacy', href: '/en/privacy' },
  { label: 'Terms', href: '/en/terms' },
] as const;

test.describe('menu pages render', () => {
  for (const pageDef of MENU_PAGES) {
    test(`${pageDef.path} renders 200 with visible content and the expected H1`, async ({
      page,
    }) => {
      const response = await page.goto(pageDef.path);
      expect(response?.status()).toBe(200);

      // The home H1 is typewriter-animated; wait for the full text.
      await expect(page.locator('h1')).toContainText(pageDef.h1, { timeout: 15_000 });

      // Visible content in <main> (not just a shell).
      const mainText = await page.locator('main').innerText();
      expect(mainText.trim().length).toBeGreaterThan(0);

      // Landmarks (arch §5.1): header/nav/main/footer present on every page.
      await expect(page.locator('header').first()).toBeVisible();
      await expect(page.locator('nav').first()).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });
  }
});

test.describe('single H1 + semantic heading structure', () => {
  for (const pageDef of MENU_PAGES) {
    test(`${pageDef.path} has exactly one H1 and a logical H2/H3 hierarchy`, async ({ page }) => {
      await page.goto(pageDef.path);

      // Exactly one <h1> (arch §5.1 — single H1 per page).
      await expect(page.locator('h1')).toHaveCount(1);

      // No heading level is skipped (h1 → h2 → h3, no h1 → h3).
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const count = await headings.count();
      let previous = 0;
      for (let i = 0; i < count; i += 1) {
        const tag = await headings.nth(i).evaluate((el) => el.tagName.toLowerCase());
        const level = Number(tag.slice(1));
        if (previous > 0) {
          expect(level, `heading skip at position ${i} on ${pageDef.path}`).toBeLessThanOrEqual(
            previous + 1,
          );
        }
        previous = level;
      }
    });
  }
});

test.describe('navigation reaches every menu page', () => {
  test('header primary nav links reach each page', async ({ page }) => {
    await page.goto('/');
    const header = page.getByTestId('header');

    for (const link of HEADER_NAV) {
      const navLink = header.locator(`a[href="${link.href}"]`).first();
      await expect(navLink).toBeVisible();
      await navLink.click();
      await expect(page).toHaveURL(new RegExp(`${link.href.replace('/', '\\/')}/?$`));
      // The target page rendered (non-error page) with a visible H1.
      await expect(page.locator('h1')).toBeVisible({ timeout: 15_000 });
      // Return home for the next nav check.
      await page.goto('/');
    }
  });

  test('Explore submenu links reach the SEO hubs (TASK-316)', async ({ page }) => {
    // Reduced motion keeps GSAP Reveal/entrance tweens from moving the
    // header mid-interaction (repo convention — hero/location specs do the
    // same), so the hover-open dropdown stays deterministic.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const header = page.getByTestId('header');
    await expect(header).toBeVisible();

    // The Explore dropdown opens on hover; the submenu is desktop-only.
    // After a full page load the pointer can still be inside the dropdown
    // region from a previous iteration — React only fires onMouseEnter on a
    // pointer move INTO the element, so hover() alone would not re-open the
    // panel (pre-Sprint-19 flake). Move the pointer out first, then hover.
    const openMenu = async () => {
      await page.mouse.move(2, 2);
      await header.getByTestId('explore-dropdown').hover();
      await expect(header.getByTestId('explore-menu')).toBeVisible();
    };

    await openMenu();

    for (const link of EXPLORE_NAV) {
      const submenuLink = header
        .getByTestId('explore-menu')
        .getByRole('link', { name: link.label });
      await expect(submenuLink).toBeVisible();
      await submenuLink.click();
      await expect(page).toHaveURL(new RegExp(`${link.href.replace('/', '\\/')}/?$`));
      await expect(page.locator('h1')).toBeVisible({ timeout: 15_000 });
      await page.goto('/');
      await openMenu();
    }

    // Retained nav links still present next to the Explore dropdown
    // (92cd1f4 moved Community into the Explore submenu).
    await expect(header.getByRole('link', { name: 'Features' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'About' })).toBeVisible();
    // Community is reachable from the Explore submenu (already visited above).
    await expect(header.getByTestId('explore-menu').getByRole('link', { name: 'Community' })).toBeVisible();
  });

  test('footer grouped links reach every page', async ({ page }) => {
    await page.goto('/');
    const footer = page.getByTestId('footer');

    for (const link of FOOTER_NAV) {
      const footerLink = footer.locator(`a[href="${link.href}"]`).first();
      await expect(footerLink).toBeVisible();
      await footerLink.click();
      await expect(page).toHaveURL(new RegExp(`${link.href.replace('/', '\\/')}/?$`));
      await expect(page.locator('h1')).toBeVisible({ timeout: 15_000 });
      await page.goto('/');
    }
  });

  test('every sitemap URL resolves (no orphan pages, discovery §4 hierarchy rule)', async ({
    request,
  }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const xml = (await response.text()) ?? '';
    const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
    expect(locs.length).toBeGreaterThanOrEqual(8);

    // Sprint 19 (Goal 1 + Q4): the sitemap now enumerates every locale
    // surface (~1000+ URLs). The exhaustive live-200 sweep lives in
    // seo.spec.ts (sitemap parity); here, verify a deterministic
    // representative sample resolves so the hierarchy rule (no orphan pages
    // reachable only from the sitemap) holds without hammering the shared
    // server with a second full sweep.
    const samples = new Set<string>([
      ...MENU_PAGES.map((p) => p.path),
      '/glossary',
      '/guides',
      '/es',
      '/de',
      '/vi',
      '/ja',
      '/ar',
      '/zh-CN',
      '/pt-BR',
      '/fr',
      '/it',
      '/nl',
      '/pl',
      '/ru',
      '/th',
      '/tr',
      '/uk',
      '/fa',
      '/hi',
      '/id',
      '/ko',
      '/zh-TW',
      '/en',
    ]);
    // First 25 sitemap URLs (deterministic order) plus the sample set.
    for (const loc of locs.slice(0, 25)) {
      samples.add(new URL(loc).pathname);
    }
    for (const path of samples) {
      const res = await request.get(path);
      expect(res.status(), `sitemap URL ${path} should resolve 200`).toBe(200);
    }
  });
});

test.describe('LLM-crawler readable copy (arch §5.2)', () => {
  for (const pageDef of MENU_PAGES) {
    test(`${pageDef.path} has substantial main copy (≥ 150 words)`, async ({ page }) => {
      await page.goto(pageDef.path);
      const mainText = await page.locator('main').innerText();
      const wordCount = mainText.trim().split(/\s+/).length;

      // Arch §5.2: total page copy ≥ 150 words (goal for LLM extractability).
      expect(wordCount, `word count on ${pageDef.path}`).toBeGreaterThanOrEqual(150);
    });

    test(`${pageDef.path} has a non-trivial first paragraph (topic sentence)`, async ({ page }) => {
      await page.goto(pageDef.path);
      const paragraphs = page.locator('main p');
      const firstPara = (await paragraphs.first().innerText()).trim();
      expect(firstPara.length).toBeGreaterThan(40);
    });
  }
});
