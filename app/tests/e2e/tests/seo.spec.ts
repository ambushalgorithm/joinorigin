import { test, expect, type Page } from '@playwright/test';

/**
 * Full-stack SEO audit e2e (TASK-218 e2e-seo).
 *
 * Covers per-page metadata + Open Graph + Twitter + canonical, `/sitemap.xml`,
 * `/robots.txt`, `/llms.txt`, and server-rendered JSON-LD structured data —
 * the TASK-218 acceptance criteria per `app/docs/design/sprint-4-seo-arch.md`
 * §3–§5 and `app/docs/design/sprint-4-discovery.md` §5–§8.
 *
 * KNOWN GAPS tracked with `test.fail()` markers (repo convention from
 * TASK-205/207) were fixed and the markers removed by fe-fix-menu-seo
 * (TASK-220): menu-page OG image (arch §3.5) and the 160-char description
 * rule (discovery §6). The remaining assertions are required and must pass.
 */

// These specs navigate many pages; run serially to avoid starving the shared
// dev server (keeps the pre-existing mobile-nav/responsive suite stable).
test.describe.configure({ mode: 'serial' });

/** Absolute page paths under test (8 HTML pages, discovery §4; /pricing removed). */
const PATHS = [
  '/',
  '/features',
  '/community',
  '/docs',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
];

/** Expected per-page <title> (discovery §5 + layout default). */
const EXPECTED_TITLES: Record<string, string> = {
  '/': 'JoinOrigin — Social Collaboration Network & Community OS',
  '/features': 'Features — Communities, Chat, Projects & Opportunities | JoinOrigin',
  '/community': 'Community — Find Your People & Build Together | JoinOrigin',
  '/docs': 'Docs — Concepts, Roadmap & Architecture | JoinOrigin',
  '/about': 'About — The Operating System for Human Collaboration | JoinOrigin',
  '/contact': 'Contact — Talk to the JoinOrigin Team | JoinOrigin',
  '/privacy': 'Privacy Policy | JoinOrigin',
  '/terms': 'Terms of Service | JoinOrigin',
};

/** Parse every `application/ld+json` block on the page → flat @type array. */
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

test.describe('per-page metadata + Open Graph + Twitter + canonical', () => {
  for (const path of PATHS) {
    test(`${path} emits title, description, OG, Twitter, and canonical`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      // <title> exactly matches the discovery-specified value.
      await expect(page).toHaveTitle(EXPECTED_TITLES[path]);

      // meta description present + non-empty + contains the brand OR the
      // anchor category keyword (discovery §5 descriptions are unique per
      // page and some omit the literal brand, e.g. /community). Sprint 8
      // copy makes "Origin" the product brand ("Origin" / "Origin's").
      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveCount(1);
      const descContent = (await description.getAttribute('content')) ?? '';
      expect(descContent).not.toBe('');
      const descLower = descContent.toLowerCase();
      expect(
        descLower.includes('joinorigin') ||
          descLower.includes('origin') ||
          descLower.includes('social collaboration network'),
      ).toBe(true);

      // Open Graph core tags.
      const ogChecks: Array<[string, string | RegExp]> = [
        ['og:title', EXPECTED_TITLES[path]],
        ['og:type', 'website'],
        ['og:site_name', 'JoinOrigin'],
        // og:url — home is the bare origin; subpages end with the path.
        ['og:url', path === '/' ? /https?:\/\/[^/]+\/?$/ : new RegExp(`${path}$`)],
      ];
      for (const [property, expected] of ogChecks) {
        const tag = page.locator(`meta[property="${property}"]`);
        await expect(tag).toHaveCount(1);
        const value = (await tag.getAttribute('content')) ?? '';
        if (expected instanceof RegExp) {
          expect(value, `${property} on ${path}`).toMatch(expected);
        } else {
          expect(value, `${property} on ${path}`).toBe(expected);
        }
      }
      // OG image is an absolute local URL (no external host, repo rule).
      const ogImage = page.locator('meta[property="og:image"]');
      await expect(ogImage).toHaveCount(1);
      const ogImageUrl = (await ogImage.getAttribute('content')) ?? '';
      expect(ogImageUrl).toMatch(/^https?:\/\/(localhost|127\.0\.0\.1)/);
      await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
        'content',
        '1200',
      );
      await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
        'content',
        '630',
      );

      // Twitter card tags.
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        'content',
        'summary_large_image',
      );
      const twitterTitle = page.locator('meta[name="twitter:title"]');
      await expect(twitterTitle).toHaveCount(1);
      expect(await twitterTitle.getAttribute('content')).toBe(EXPECTED_TITLES[path]);
      await expect(page.locator('meta[name="twitter:description"]')).toHaveCount(1);
      await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(1);

      // Canonical: absolute URL resolving to this page path (arch §3.4).
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      const canonicalHref = (await canonical.getAttribute('href')) ?? '';
      expect(new URL(canonicalHref).pathname).toBe(path);

      // robots meta: index,follow from createMetadata (arch §3.3). The home
      // page is a client component with no metadata export, so it has no
      // robots <meta> — absence defaults to index,follow (acceptable).
      if (path !== '/') {
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
          'content',
          'index, follow',
        );
      }
    });
  }

  test('menu pages use the arch OG image /assets/og/og-default.png (1200×630)', async ({
    page,
  }) => {
    for (const path of PATHS.filter((p) => p !== '/')) {
      await page.goto(path);
      const ogImageUrl =
        (await page.locator('meta[property="og:image"]').getAttribute('content')) ?? '';
      // Fixed by fe-fix-menu-seo (TASK-220): menu pages now build metadata
      // through `lib/seo`, whose SITE.ogImage points at the branded 1200×630
      // `/assets/og/og-default.png` (arch §3.5).
      expect(ogImageUrl).toContain('/assets/og/og-default.png');
    }
  });

  test('meta descriptions are ≤ 160 chars per discovery §6 keyword rule', async ({ page }) => {
    for (const path of PATHS) {
      await page.goto(path);
      const content =
        (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
      // Fixed by fe-fix-menu-seo (TASK-220): all 8 page descriptions now
      // respect the 160-char discovery §6 keyword rule.
      expect(content.length, `description length on ${path}`).toBeLessThanOrEqual(160);
    }
  });
});

test.describe('crawler entry points (arch §3.7–§3.9)', () => {
  test('/sitemap.xml returns 200 and lists all 8 HTML pages', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    const contentType = response?.headers()['content-type'] ?? '';
    expect(contentType).toContain('xml');
    const xmlText = (await response?.text().catch(() => '')) ?? '';

    for (const path of PATHS) {
      // sitemap loc is absolute; assert the path appears.
      const suffix = path === '/' ? '3100/' : `3100${path}`;
      expect(xmlText, `sitemap should contain ${path}`).toContain(suffix);
    }
  });

  /**
   * Sitemap ↔ live-pages parity (TASK-311, design §9.1):
   *  1. every URL in /sitemap.xml returns 200 on the live server,
   *  2. every indexable page (ROUTES + location EN/de + guides + hubs) is
   *     listed in the sitemap — no drift between the registry, pages, and
   *     the sitemap.
   */
  test('sitemap lists exactly the indexable pages and every URL returns 200', async ({
    request,
  }) => {
    test.setTimeout(180_000);
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const xmlText = await response.text();

    const locs = [...xmlText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs.length).toBeGreaterThan(0);

    // Every sitemap URL must be live (200).
    for (const loc of locs) {
      const url = new URL(loc);
      const pageResponse = await request.get(url.pathname);
      expect(pageResponse.status(), `live ${url.pathname}`).toBe(200);
    }

    // Every indexable page must be listed — assert the deterministic
    // Sprint-12 indexable set (registry-derived, fixed by design §8.2).
    const paths = locs.map((loc) => new URL(loc).pathname);
    const expectedIndexable = [
      ...PATHS,
      '/location',
      '/location/united-states',
      '/location/united-states/new-york',
      '/location/united-states/new-york/new-york',
      '/location/united-states/new-york/new-york/startup',
      '/location/united-states/new-york/new-york/creative',
      '/location/united-states/new-york/new-york/political',
      '/location/united-states/new-york/new-york/meetup',
      '/location/united-states/new-york/new-york/small-business',
      '/location/united-states/new-york/new-york/ideas',
      '/location/germany',
      '/location/germany/berlin',
      '/location/germany/berlin/berlin',
      '/location/germany/berlin/berlin/startup',
      '/location/germany/berlin/berlin/creative',
      '/location/germany/berlin/berlin/political',
      '/location/germany/berlin/berlin/meetup',
      '/location/germany/berlin/berlin/small-business',
      '/location/germany/berlin/berlin/ideas',
      '/de/location/germany/berlin/berlin',
      '/de/location/germany/berlin/berlin/startup',
      '/de/location/germany/berlin/berlin/creative',
      '/de/location/germany/berlin/berlin/political',
      '/de/location/germany/berlin/berlin/meetup',
      '/de/location/germany/berlin/berlin/small-business',
      '/de/location/germany/berlin/berlin/ideas',
      '/guides',
      '/glossary',
      '/guides/start-a-community',
      '/guides/organize-a-meetup',
      '/guides/first-10-members',
      '/guides/find-a-co-founder',
      '/guides/keep-a-community-active',
      '/guides/hybrid-communities',
      '/guides/moderation',
    ];
    for (const path of expectedIndexable) {
      expect(paths, `indexable page ${path} in sitemap`).toContain(path);
    }
    // And nothing else: the sitemap lists exactly the indexable set.
    expect(paths.sort()).toEqual([...expectedIndexable].sort());
  });

  test('sitemap carries Berlin de alternates.languages + x-default for the Berlin cluster', async ({
    page,
  }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    const xmlText = (await response?.text().catch(() => '')) ?? '';

    // EN Berlin city page must declare the de alternate via xhtml:link.
    expect(xmlText).toContain('hreflang="de"');
    expect(xmlText).toContain('hreflang="x-default"');
    expect(xmlText).toContain('/de/location/germany/berlin/berlin');
    // The 7 de pages are their own <url> entries.
    expect(xmlText).toContain('<loc>http://localhost:3100/de/location/germany/berlin/berlin</loc>');
    expect(xmlText).toContain(
      '<loc>http://localhost:3100/de/location/germany/berlin/berlin/ideas</loc>',
    );
    // EN-only pages emit no hreflang cluster (phase A). Parse the sitemap
    // into <url> blocks and assert the NYC block carries no alternates.
    const blocks = [...xmlText.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
    const nycBlock = blocks.find((block) => block.includes('new-york/new-york</loc>'));
    expect(nycBlock).toBeDefined();
    expect(nycBlock ?? '').not.toContain('hreflang');
  });

  test('/robots.txt returns 200, allows all crawlers, and references the sitemap', async ({
    page,
  }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    const text = (await response?.text().catch(() => '')) ?? '';

    // Arch §3.8: allow-all for standard AND LLM crawlers; no agent blocked.
    expect(text).toContain('User-Agent: *');
    expect(text).toContain('Allow: /');
    expect(text).toContain('Disallow: /api/');
    // Sitemap reference (absolute).
    expect(text).toMatch(/Sitemap: https?:\/\/[^\s]+\/sitemap\.xml/);
  });

  test('/llms.txt returns 200 text/plain with an H1 + curated sections (TASK-311)', async ({
    page,
  }) => {
    const response = await page.goto('/llms.txt');
    expect(response?.status()).toBe(200);
    const contentType = response?.headers()['content-type'] ?? '';
    expect(contentType).toContain('text/plain');
    const text = (await response?.text().catch(() => '')) ?? '';
    expect(text).toContain('# JoinOrigin');
    // Blockquote summary + H2 sections + markdown links (llms.txt v2, discovery §8.1).
    expect(text).toContain('>');
    expect(text).toContain('## ');
    expect(text).toContain('[/about](');
    expect(text).toContain('[/features](');
    // Curated sections (design §9.3) — hub + 2 flagships, all 7 guides,
    // glossary hub; never the long tail.
    expect(text).toContain('## Locations');
    expect(text).toContain('[/location](http://localhost:3100/location)');
    expect(text).toContain('[/location/united-states/new-york/new-york](');
    expect(text).toContain('[/location/germany/berlin/berlin](');
    expect(text).toContain('## Guides');
    expect(text).toContain('[/guides/start-a-community](');
    expect(text).toContain('[/guides/moderation](');
    expect(text).toContain('## Glossary');
    expect(text).toContain('[/glossary](');
    // ~2 KB budget so LLM crawlers hold the file in context.
    expect(Buffer.byteLength(text, 'utf8')).toBeLessThanOrEqual(2 * 1024);
    // Long tail never enumerated (Tier-3 city pages are sitemap-only).
    expect(text).not.toContain('/location/united-states/texas/austin');
    expect(text).not.toContain('/de/location');
  });
});

test.describe('JSON-LD structured data (arch §3.6, discovery §7)', () => {
  test('every page emits valid JSON-LD (server-rendered, parses cleanly)', async ({ page }) => {
    for (const path of PATHS) {
      await page.goto(path);
      const scripts = await page.locator('script[type="application/ld+json"]').count();
      expect(scripts, `JSON-LD scripts on ${path}`).toBeGreaterThan(0);
      // JSON.parse inside ldTypes throws on malformed JSON → test fails.
      const types = await ldTypes(page);
      expect(types.length).toBeGreaterThan(0);
    }
  });

  test('Organization + WebSite JSON-LD on every page (layout, arch §3.6)', async ({ page }) => {
    for (const path of PATHS) {
      await page.goto(path);
      const types = await ldTypes(page);
      expect(types, `Organization on ${path}`).toContain('Organization');
      expect(types, `WebSite on ${path}`).toContain('WebSite');
    }
  });

  test('BreadcrumbList JSON-LD on every subpage (Home › Page, discovery §4)', async ({ page }) => {
    for (const path of PATHS.filter((p) => p !== '/')) {
      await page.goto(path);
      const types = await ldTypes(page);
      expect(types, `BreadcrumbList on ${path}`).toContain('BreadcrumbList');
    }
  });

  test('FAQPage JSON-LD on pages with a visible FAQ (features/community/docs)', async ({
    page,
  }) => {
    for (const path of ['/features', '/community', '/docs']) {
      await page.goto(path);
      const types = await ldTypes(page);
      expect(types, `FAQPage on ${path}`).toContain('FAQPage');

      // FAQ questions must be visible in the HTML (discovery §8.3 mirror 1:1).
      const faqBlock = page.locator('h3').filter({ hasText: '?' }).first();
      await expect(faqBlock).toBeVisible();
    }
  });

  test('AboutPage on /about and ContactPage on /contact', async ({ page }) => {
    await page.goto('/about');
    expect(await ldTypes(page)).toContain('AboutPage');

    await page.goto('/contact');
    expect(await ldTypes(page)).toContain('ContactPage');
  });

  test('no Product/Offer/AggregateRating JSON-LD anywhere (discovery §7 policy)', async ({
    page,
  }) => {
    for (const path of PATHS) {
      await page.goto(path);
      const types = await ldTypes(page);
      expect(types, `forbidden schema on ${path}`).not.toContain('Product');
      expect(types, `forbidden schema on ${path}`).not.toContain('Offer');
      expect(types, `forbidden schema on ${path}`).not.toContain('AggregateRating');
      expect(types, `forbidden schema on ${path}`).not.toContain('Review');
    }
  });

  test('FAQPage JSON-LD on home per discovery §5.1 (homepage FAQ)', async ({ page }) => {
    await page.goto('/');
    const types = await ldTypes(page);
    // Fixed by fe-fix-home (TASK-219): home server wrapper emits FAQPage
    // JSON-LD mirroring the visible FAQ block 1:1 (discovery §5.1/§8.3).
    expect(types).toContain('FAQPage');
  });
});

test.describe('LLM-crawler friendliness: single H1 + semantic structure (arch §5.5)', () => {
  for (const path of PATHS) {
    test(`${path} has exactly one H1 and no empty visible text`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('h1')).toHaveCount(1);
      const h1Text = (await page.locator('h1').innerText()).trim();
      expect(h1Text.length).toBeGreaterThan(0);

      // No empty visible paragraphs inside <main>.
      const paragraphs = page.locator('main p');
      const count = await paragraphs.count();
      for (let i = 0; i < count; i += 1) {
        const text = (await paragraphs.nth(i).innerText()).trim();
        expect(text.length, `empty <p> on ${path}`).toBeGreaterThan(0);
      }
    });
  }

  test('home includes the visible definition paragraph with "social collaboration network"', async ({
    page,
  }) => {
    await page.goto('/');
    const mainText = (await page.locator('main').innerText()).toLowerCase();
    // Fixed by fe-fix-home (TASK-219): the home <main> now renders the
    // discovery §5.1 definition paragraph directly under the hero with the
    // exact phrase "social collaboration network" (LLM entity clarity).
    expect(mainText).toContain('social collaboration network');
  });
});
