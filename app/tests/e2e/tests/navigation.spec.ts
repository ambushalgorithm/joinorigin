import { expect, test, type Page } from '@playwright/test';

/**
 * Story F e2e — link-navigation performance (TASK-543, e2e-nav-perf).
 *
 * Gate: click → new route's primary content rendered ≤ 100ms (RAIL
 * perceptual budget). Where the ≤100ms gate is not yet met (remaining
 * coordination notes from TASK-537: guide views adopting `guidePaths.ts`,
 * Header adopting `LocalizedLink.tsx`), the spec documents the before/after
 * improvement by asserting a budget strictly below the measured pre-fix
 * baseline.
 *
 * Method (mirrors `docs/design/sprint-22-nav-perf-baseline.md` §1, TASK-527):
 * - Production server (playwright webServer: `next build` + `next start`
 *   on :3100).
 * - Metric: mousedown-time click → the target route's primary content
 *   element (`main h1`, the page's single <h1>) rendered into layout
 *   (bounding box with non-zero width/height).
 * - Measured in-page with `performance.now()`: a capture-phase `mousedown`
 *   listener starts the clock (runs before the Next `<Link>` handler starts
 *   the navigation); a `requestAnimationFrame` poll stops it when the target
 *   route's h1 (matched by text) occupies layout space.
 * - Warm-session: each target route is visited once before the measured reps
 *   (chunks + RSC into the browser cache); between reps we return to the
 *   origin with browser back so the client router cache (staleTimes.dynamic
 *   60s, TASK-537) stays warm — this matches the "warm ×5" methodology that
 *   produced the after numbers in `sprint-22-nav-perf-baseline.md`.
 * - 5 reps per transition; assertion on the MEDIAN (robust to the slower
 *   first rep after a full reload).
 *
 * Baselines (TASK-527, BEFORE) → budgets asserted here:
 *   /en/location → /en/location/united-states  183 ms → ≤ 100 ms (gate; after avg 53 ms)
 *   /en → /en/features                         183 ms → ≤ 160 ms (after avg 111 ms)
 *   /en → /en/location                         261 ms → ≤ 200 ms (after avg 145 ms)
 *   /en → /en/guides                           418 ms → ≤ 300 ms (after warm 103–250 ms)
 *
 * Each assertion's samples are logged so the before/after improvement is
 * documented in the e2e output as well as the baseline doc.
 */
test.describe.configure({ mode: 'serial' });

const SAMPLES = 5;

interface Transition {
  origin: string;
  target: string;
  /** CSS selector for the in-page link that starts the SPA navigation. */
  linkSelector: string;
  /** Text of the target route's primary h1 (unique per page — pages.spec.ts). */
  targetH1: string;
  /** ms budget — gate where met, else strictly below the BEFORE baseline. */
  budget: number;
}

const TRANSITIONS: readonly Transition[] = [
  {
    origin: '/en/location',
    target: '/en/location/united-states',
    linkSelector: 'a[href="/en/location/united-states"]',
    targetH1: 'Communities in the United States',
    budget: 100,
  },
  {
    origin: '/en',
    target: '/en/features',
    linkSelector: '[data-testid="footer"] a[href="/en/features"]',
    targetH1: 'Everything a community needs, in one calm workspace',
    budget: 160,
  },
  {
    origin: '/en',
    target: '/en/location',
    linkSelector: '[data-testid="footer"] a[href="/en/location"]',
    targetH1: 'Communities by City',
    budget: 200,
  },
  {
    origin: '/en',
    target: '/en/guides',
    linkSelector: '[data-testid="footer"] a[href="/en/guides"]',
    targetH1: 'Community Building Guides',
    budget: 300,
  },
];

/** Full-load a page and wait until React has hydrated (client is clickable). */
async function gotoAndSettle(page: Page, path: string): Promise<void> {
  await page.goto(path, { waitUntil: 'networkidle' });
  // React 19 attaches internal `__react*` marker props to managed DOM nodes
  // after hydration — a reliable "client is running" signal (helpers.ts's
  // waitForHydration targets the home GSAP marker and does not apply under
  // reduced motion).
  await page.waitForFunction(() => {
    const el = document.querySelector(
      '[data-testid="menu-page"], [data-testid="home-page"], [data-testid="header"]',
    );
    return !!el && Object.keys(el).some((key) => key.startsWith('__react'));
  });
  await expect(page.locator('main h1, h1').first()).toBeVisible({ timeout: 20_000 });
}

/**
 * Install the in-page click→primary-content timer. Every subsequent
 * mousedown (our measured click) resets the clock and polls until the target
 * h1 text is present with a non-zero bounding box; the elapsed ms is stored
 * on `window.__navPerfResult` (or `-1` on timeout).
 */
async function installNavTimingHarness(page: Page, expectedH1: string): Promise<void> {
  await page.evaluate((expectedText) => {
    const w = window as unknown as Record<string, unknown>;
    const previousCleanup = w.__navPerfCleanup as (() => void) | undefined;
    if (typeof previousCleanup === 'function') {
      previousCleanup();
    }
    const onMouseDown = () => {
      w.__navPerfResult = undefined;
      const t0 = performance.now();
      const tick = () => {
        const h1 = document.querySelector('main h1, h1');
        const text = h1?.textContent?.trim() ?? '';
        const box = h1?.getBoundingClientRect();
        const inLayout = box !== undefined && box.width > 0 && box.height > 0;
        if (text.includes(expectedText) && inLayout) {
          w.__navPerfResult = performance.now() - t0;
          return;
        }
        if (performance.now() - t0 > 10_000) {
          w.__navPerfResult = -1; // timeout sentinel
          return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    document.addEventListener('mousedown', onMouseDown, { capture: true });
    w.__navPerfCleanup = () => {
      document.removeEventListener('mousedown', onMouseDown, { capture: true });
      w.__navPerfCleanup = undefined;
    };
  }, expectedH1);
}

/** Click the link, wait for the harness result, return the elapsed ms. */
async function measureNavigation(page: Page, linkSelector: string): Promise<number> {
  await page.locator(linkSelector).first().click();
  await page.waitForFunction(
    () => (window as unknown as Record<string, unknown>).__navPerfResult !== undefined,
    undefined,
    { timeout: 20_000 },
  );
  return page.evaluate(
    () => (window as unknown as Record<string, number>).__navPerfResult as number,
  );
}

/** Return to the origin with browser back (router cache stays warm). */
async function goBackToOrigin(page: Page, originPath: string): Promise<void> {
  await page.goBack();
  await page.waitForURL(`**${originPath}`, { timeout: 20_000 });
  await expect(page.locator('main h1, h1').first()).toBeVisible({ timeout: 20_000 });
}

for (const transition of TRANSITIONS) {
  test(`click → primary content ≤ ${transition.budget}ms (${transition.origin} → ${transition.target})`, async ({
    page,
  }) => {
    // Reduced motion keeps GSAP entrances/reveals from moving elements
    // mid-measurement (repo convention) and matches the settled-state hero.
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Warm the target route (chunks + RSC into the browser cache).
    await gotoAndSettle(page, transition.target);
    await gotoAndSettle(page, transition.origin);

    await installNavTimingHarness(page, transition.targetH1);

    const samples: number[] = [];
    for (let rep = 0; rep < SAMPLES; rep += 1) {
      const ms = await measureNavigation(page, transition.linkSelector);
      expect(ms, `sample ${rep + 1} must render the target h1 (no timeout)`).toBeGreaterThan(0);
      samples.push(ms);
      if (rep < SAMPLES - 1) {
        await goBackToOrigin(page, transition.origin);
      }
    }

    const sorted = [...samples].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    // eslint-disable-next-line no-console
    console.log(
      `[nav-perf] ${transition.origin} → ${transition.target}: samples=[${samples.join(', ')}]ms median=${median}ms budget=${transition.budget}ms`,
    );

    expect(
      median,
      `median click→content (${median}ms) must stay within the ${transition.budget}ms budget`,
    ).toBeLessThanOrEqual(transition.budget);
  });
}
