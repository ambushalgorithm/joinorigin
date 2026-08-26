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
 *
 * LIVE-SWEEP CHUNKING (TASK-549, Story C.3): the representative sitemap
 * parity test below stays the default (bounded sample of every URL shape).
 * The FULL per-locale sweep — every one of the ~897 advertised URLs across
 * all 21 locale surfaces resolving 200 — is opt-in and deterministically
 * chunked so CI can run N jobs in parallel, each resolving one slice within
 * a sane per-chunk timeout. Enable with:
 *
 *   SEO_LIVE_SWEEP=1 pnpm --dir tests/e2e exec playwright test tests/seo.spec.ts
 *   # single job → one chunk (0-based); run `SEO_LIVE_SWEEP_TOTAL` jobs in parallel:
 *   SEO_LIVE_SWEEP=1 SEO_LIVE_SWEEP_TOTAL=8 SEO_LIVE_SWEEP_CHUNK=0 pnpm --dir tests/e2e exec playwright test tests/seo.spec.ts
 *   # optional overrides:
 *   #   SEO_LIVE_SWEEP_TOTAL      default 8        — number of deterministic chunks
 *   #   SEO_LIVE_SWEEP_CHUNK      default all      — which chunk THIS job resolves
 *   #   SEO_LIVE_SWEEP_TIMEOUT_MS default 600000   — per-chunk test timeout
 *
 * The exhaustive URL set is never hardcoded here: the sweep derives it at
 * runtime from the LIVE /sitemap.xml (server output). Derivation stays the
 * source of truth in the unit suites (`sitemap.test.ts` +
 * `locationPages.test.ts`, TASK-473); this spec only verifies the live
 * server resolves the advertised set. Chunk assignment is a stable hash of
 * the pathname (djb2, no Math.random), so the same sitemap always maps a
 * URL to the same chunk regardless of sitemap growth.
 */

// These specs navigate many pages; run serially to avoid starving the shared
// dev server (keeps the pre-existing mobile-nav/responsive suite stable).
test.describe.configure({ mode: 'serial' });

/** Absolute page paths under test — the EN canonical /en/** surfaces (8
 *  HTML pages, discovery §4; /pricing removed). The unprefixed `/**`
 *  counterparts 307-redirect to these surfaces (TASK-464/466). */
const PATHS = [
  '/en',
  '/en/features',
  '/en/community',
  '/en/docs',
  '/en/about',
  '/en/contact',
  '/en/privacy',
  '/en/terms',
];

/** Expected per-page <title> (discovery §5 + layout default). */
const EXPECTED_TITLES: Record<string, string> = {
  '/en': 'JoinOrigin — Social Collaboration Network & Community OS',
  '/en/features': 'Features — Communities, Chat, Projects & Opportunities | JoinOrigin',
  '/en/community': 'Community — Find Your People & Build Together | JoinOrigin',
  '/en/docs': 'Docs — Concepts, Roadmap & Architecture | JoinOrigin',
  '/en/about': 'About — The Operating System for Human Collaboration | JoinOrigin',
  '/en/contact': 'Contact — Talk to the JoinOrigin Team | JoinOrigin',
  '/en/privacy': 'Privacy Policy | JoinOrigin',
  '/en/terms': 'Terms of Service | JoinOrigin',
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
        // og:url — the EN home is /en; subpages end with the /en path.
        ['og:url', path === '/en' ? /https?:\/\/[^/]+\/en\/?$/ : new RegExp(`${path}$`)],
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
      if (path !== '/en') {
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
    for (const path of PATHS.filter((p) => p !== '/en')) {
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
      // sitemap loc is absolute; assert the /en/** surface appears.
      const suffix = `3100${path}`;
      expect(xmlText, `sitemap should contain ${path}`).toContain(suffix);
    }
  });

  /**
   * Sitemap ↔ live-pages parity (TASK-311, design §9.1; Sprint 19 Goal 1 +
   * Q4): advertised URLs in /sitemap.xml resolve (200) on the live server,
   * and the sitemap covers the EN canonical indexable set plus ALL 21 locale
   * surfaces. The exhaustive per-locale parity + URL-set derivation are
   * asserted by the unit suites (`sitemap.test.ts` + `locationPages.test.ts`,
   * TASK-473) and the Sprint 19 e2e matrix in locale-routing.spec.ts; here we
   * verify the live server resolves a representative sample covering every
   * URL shape (bounded since Sprint 20 grew the sitemap to every content
   * city's variant/ideas pages — 897 URLs — and `next start` compiles each
   * ISR route on first request).
   */
  test('sitemap lists indexable pages, covers every locale surface, and advertised URLs resolve (200)', async ({
    request,
  }) => {
    test.setTimeout(600_000);
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const xmlText = await response.text();

    const locs = [...xmlText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs.length).toBeGreaterThan(0);

    const paths = locs.map((loc) => new URL(loc).pathname);

    // The EN canonical indexable set must be listed (static routes, glossary,
    // guides hub, flagships + Tier-2 city slice, all 12 guides) — every entry
    // on its /en/** surface (all-routes-prefixed, TASK-464/466).
    const expectedIndexable = [
      ...PATHS,
      '/en/location',
      '/en/location/united-states',
      '/en/location/united-states/new-york',
      '/en/location/united-states/new-york/new-york',
      '/en/location/united-states/new-york/new-york/startup',
      '/en/location/united-states/new-york/new-york/creative',
      '/en/location/united-states/new-york/new-york/political',
      '/en/location/united-states/new-york/new-york/meetup',
      '/en/location/united-states/new-york/new-york/small-business',
      '/en/location/united-states/new-york/new-york/ideas',
      '/en/location/germany',
      '/en/location/germany/berlin',
      '/en/location/germany/berlin/berlin',
      '/en/location/germany/berlin/berlin/startup',
      '/en/location/germany/berlin/berlin/creative',
      '/en/location/germany/berlin/berlin/political',
      '/en/location/germany/berlin/berlin/meetup',
      '/en/location/germany/berlin/berlin/small-business',
      '/en/location/germany/berlin/berlin/ideas',
      // Tier-2 city slice (Sprint 18: 55 cities promoted — spot-check a few).
      '/en/location/united-states/texas/austin',
      '/en/location/germany/bavaria/munich',
      '/en/location/france/ile-de-france/paris',
      '/de/location/germany/berlin/berlin',
      '/de/location/germany/berlin/berlin/startup',
      '/de/location/germany/berlin/berlin/creative',
      '/de/location/germany/berlin/berlin/political',
      '/de/location/germany/berlin/berlin/meetup',
      '/de/location/germany/berlin/berlin/small-business',
      '/de/location/germany/berlin/berlin/ideas',
      '/en/guides',
      '/en/glossary',
      '/en/guides/start-a-community',
      '/en/guides/organize-a-meetup',
      '/en/guides/first-10-members',
      '/en/guides/find-a-co-founder',
      '/en/guides/keep-a-community-active',
      '/en/guides/hybrid-communities',
      '/en/guides/moderation',
      '/en/guides/publish-an-idea',
      '/en/guides/create-a-project',
      '/en/guides/create-a-group',
      '/en/guides/publish-a-small-business-idea',
      '/en/guides/publish-a-startup-concept',
    ];
    for (const path of expectedIndexable) {
      expect(paths, `indexable page ${path} in sitemap`).toContain(path);
    }

    // Sprint 19 Goal 1 + Q4 — every one of the 21 locale surfaces is
    // indexable (home + static routes + hubs on each /<locale> tree).
    const SUPPORTED_LOCALES = [
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
    for (const locale of SUPPORTED_LOCALES) {
      const home = locale === 'en' ? '/en' : `/${locale}`;
      expect(paths, `sitemap should contain ${home}`).toContain(home);
      const features = locale === 'en' ? '/en/features' : `/${locale}/features`;
      expect(paths, `sitemap should contain ${features}`).toContain(features);
      const guides = locale === 'en' ? '/en/guides' : `/${locale}/guides`;
      expect(paths, `sitemap should contain ${guides}`).toContain(guides);
    }

    // Advertised URLs must be live (200) — zero orphans, zero 500s. The
    // sitemap now advertises EVERY content-rich city's group-type variants +
    // ideas pages (Sprint 20, TASK-471): 897 URLs. `next start` compiles each
    // ISR route on first request (~2.5s each), so an exhaustive sweep alone
    // would run ~40 min and blow any sane test timeout. Exhaustive URL-set
    // derivation is unit-tested (`sitemap.test.ts` + the `locationPages.test.ts`
    // registry suite, TASK-473); this e2e verifies the LIVE server resolves a
    // representative sample covering every URL shape: the canonical indexable
    // set, every locale surface (home + location hub), and the Sprint 20
    // content-city mesh (dubai + buenos-aires on EN + committed es/ar
    // surfaces — the location-pages spec asserts their full link sets).
    const liveSample = [
      ...expectedIndexable,
      ...SUPPORTED_LOCALES.map((locale) => `/${locale}/location`),
      '/en/location/united-arab-emirates/dubai/dubai',
      '/en/location/united-arab-emirates/dubai/dubai/startup',
      '/en/location/argentina/buenos-aires-f-d/buenos-aires',
      '/en/location/argentina/buenos-aires-f-d/buenos-aires/startup',
      '/es/location/argentina/buenos-aires-f-d/buenos-aires/startup',
      '/ar/location/united-arab-emirates/dubai/dubai/startup',
    ];
    for (const path of new Set(liveSample)) {
      const pageResponse = await request.get(path);
      expect(pageResponse.status(), `live ${path}`).toBe(200);
    }

    // Tier-3 / failed-gate pages are never advertised (EN canonical surface).
    expect(paths).not.toContain('/en/location/united-states/texas/dallas');
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
    // All links target the /en/** canonical surface (TASK-466).
    expect(text).toContain('[/en/about](');
    expect(text).toContain('[/en/features](');
    // Curated sections (design §9.3) — hub + 2 flagships, all 7 guides,
    // glossary hub; never the long tail.
    expect(text).toContain('## Locations');
    expect(text).toContain('[/en/location](http://localhost:3100/en/location)');
    expect(text).toContain('[/en/location/united-states/new-york/new-york](');
    expect(text).toContain('[/en/location/germany/berlin/berlin](');
    expect(text).toContain('## Guides');
    expect(text).toContain('[/en/guides/start-a-community](');
    expect(text).toContain('[/en/guides/moderation](');
    expect(text).toContain('## Glossary');
    expect(text).toContain('[/en/glossary](');
    // ~3 KB budget so LLM crawlers hold the file in context (12-guide set, TASK-353).
    expect(Buffer.byteLength(text, 'utf8')).toBeLessThanOrEqual(3 * 1024);
    // Long tail never enumerated (Tier-3 city pages are sitemap-only).
    expect(text).not.toContain('/location/united-states/texas/austin');
    expect(text).not.toContain('/de/location');
    // Zero unprefixed internal links (all-routes-prefixed, TASK-464).
    expect(text).not.toContain('](http://localhost:3100/features)');
    expect(text).not.toContain('](http://localhost:3100/guides)');
  });
});

/* ------------------------------------------------------------------ *
 * Exhaustive per-locale live sweep (TASK-549, Story C.3)
 *
 * Opt-in, deterministically chunked FULL parity: every URL advertised by
 * /sitemap.xml — the ~897-URL set across all 21 locale surfaces (static
 * routes, glossary, guides, hubs, and every content-rich city's
 * variant/ideas pages) — must resolve 200 on the live server. `next start`
 * compiles each ISR route on first request (~2.5s), so a single unscoped
 * test would run ~40 min and blow any sane timeout. Deterministic chunking
 * bounds each slice to ceil(897 / SEO_LIVE_SWEEP_TOTAL) URLs per job, and
 * CI runs one job per chunk in parallel. The unit suites (`sitemap.test.ts`
 * + `locationPages.test.ts`) remain the source of truth for the full URL
 * set — this spec derives the advertised set from the LIVE /sitemap.xml at
 * runtime and never hardcodes the exhaustive list. Serial mode (file-wide)
 * + the shared-dev-server constraint are preserved: each chunk test only
 * issues its own requests, so the sweep stays stable under load.
 * ------------------------------------------------------------------ */

type SweepConfig = {
  enabled: boolean;
  total: number;
  chunk: number | undefined;
  timeoutMs: number;
};

/** Reads the SEO_LIVE_SWEEP_* env knobs (usage in the file header). */
function sweepEnvConfig(): SweepConfig {
  const enabled = ['1', 'true', 'exhaustive', 'yes'].includes(
    (process.env.SEO_LIVE_SWEEP ?? '').trim().toLowerCase(),
  );
  const total = Math.min(64, Math.max(1, Number(process.env.SEO_LIVE_SWEEP_TOTAL ?? 8) || 8));
  const rawChunk = (process.env.SEO_LIVE_SWEEP_CHUNK ?? '').trim();
  const parsedChunk = rawChunk === '' || rawChunk === 'all' ? Number.NaN : Number(rawChunk);
  const chunk = Number.isFinite(parsedChunk)
    ? Math.min(total - 1, Math.max(0, Math.trunc(parsedChunk)))
    : undefined;
  const timeoutMs = Number(process.env.SEO_LIVE_SWEEP_TIMEOUT_MS ?? 600_000) || 600_000;
  return { enabled, total, chunk, timeoutMs };
}

/** djb2 hash of a pathname → deterministic chunk index (no Math.random),
 *  so the same sitemap always maps a URL to the same chunk across runs
 *  and CI jobs, even as the sitemap grows. */
function stableChunkIndex(path: string, total: number): number {
  let hash = 5381;
  for (let i = 0; i < path.length; i += 1) {
    hash = ((hash << 5) + hash + path.charCodeAt(i)) >>> 0;
  }
  return hash % total;
}

const sweepConfig = sweepEnvConfig();

if (sweepConfig.enabled) {
  test.describe('exhaustive per-locale live sweep — every advertised sitemap URL resolves (200)', () => {
    // With no SEO_LIVE_SWEEP_CHUNK every chunk test is declared (local
    // full sweep); a CI job pins the index so only that chunk runs.
    const chunkIndexes =
      sweepConfig.chunk === undefined
        ? Array.from({ length: sweepConfig.total }, (_, i) => i)
        : [sweepConfig.chunk];

    for (const chunkIndex of chunkIndexes) {
      test(`chunk ${chunkIndex}/${sweepConfig.total} — every advertised sitemap URL in this slice resolves (200)`, async ({
        request,
      }) => {
        test.setTimeout(sweepConfig.timeoutMs);

        // Derive the full advertised set from the LIVE sitemap (the unit
        // suites own the derivation; this verifies the server honors the
        // advertised contract — zero orphans, zero 500s).
        const sitemapResponse = await request.get('/sitemap.xml');
        expect(sitemapResponse.status()).toBe(200);
        const xmlText = await sitemapResponse.text();
        const locs = [...xmlText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
        const paths = [...new Set(locs.map((loc) => new URL(loc).pathname))];

        // Deterministic subset: stable hash → chunk; every URL lands in
        // exactly one chunk and the partition is stable across runs.
        const chunkPaths = paths.filter(
          (path) => stableChunkIndex(path, sweepConfig.total) === chunkIndex,
        );
        expect(chunkPaths.length).toBeGreaterThan(0);

        for (const path of chunkPaths) {
          const pageResponse = await request.get(path, { timeout: 60_000 });
          expect(pageResponse.status(), `live ${path}`).toBe(200);
        }
      });
    }
  });
}

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
    for (const path of PATHS.filter((p) => p !== '/en')) {
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
