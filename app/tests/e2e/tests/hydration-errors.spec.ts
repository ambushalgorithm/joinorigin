import { test, expect, type Page } from '@playwright/test';

import { waitForHydration } from './helpers';

/**
 * React 19 hydration-error regression gate (TASK-407).
 *
 * TASK-404 code-split the scene SVGs through `next/dynamic` + Suspense: the
 * scene stays in the SSR HTML (no FOUC) but its React subtree hydrates in a
 * LATER commit than the page shell. `useSceneMotion` previously registered
 * GSAP in a layout effect, which mutated the SSR'd `.scene-main-group`
 * (transform / data-svg-origin / inline style) before the scene chunk
 * hydrated — React 19 then logged "A tree hydrated but some attributes of the
 * server rendered HTML didn't match the client properties" on every menu page
 * and on `/location`.
 *
 * The fix defers GSAP registration until the scene subtree is hydrated
 * (post-paint `useEffect` + `requestAnimationFrame` poll gated on a
 * React-claimed target inside `gsap.context()`). This spec asserts the
 * regression is gone: zero React hydration-error console messages on
 * `/location` and a representative menu page.
 */

/** Routes that ship a code-split scene (regression surface). */
const HYDRATION_ROUTES = ['/location', '/features'] as const;

/** React 19 hydration-mismatch console messages we must never see. */
const HYDRATION_ERROR_PATTERNS = [
  /A tree hydrated but some attributes of the server rendered HTML didn't match/i,
  /Text content did not match/i,
  /Hydration failed because the server/i,
  /did not match\. Server:/i,
  /There was an error while hydrating/i,
  /Prop `[^`]+` did not match/i,
];

test.describe('no React hydration errors on scene pages (TASK-407)', () => {
  for (const path of HYDRATION_ROUTES) {
    test(`${path}: zero React hydration-error console messages`, async ({ page }) => {
      const hydrationErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() !== 'error') {
          return;
        }
        const text = msg.text();
        if (HYDRATION_ERROR_PATTERNS.some((pattern) => pattern.test(text))) {
          hydrationErrors.push(text);
        }
      });
      page.on('pageerror', (error) => {
        if (HYDRATION_ERROR_PATTERNS.some((pattern) => pattern.test(error.message))) {
          hydrationErrors.push(error.message);
        }
      });

      await page.goto(path);

      // Wait for hydration: menu pages expose `[data-hero="actions"]` (the
      // GSAP entrance tween writes an inline opacity after React hydrates);
      // the /location hub hero has no CTA/meta, so fall back to the scene SVG
      // appearing (the code-split scene chunk hydrates in a later commit).
      const hasHeroMarker = await page.evaluate(
        () => document.querySelector('[data-hero="actions"]') !== null,
      );
      if (hasHeroMarker) {
        await waitForHydration(page);
      }

      // Give React + GSAP a moment to finish hydration and start the scene
      // timeline (the code-split scene chunk hydrates in a later commit).
      await expect(page.locator('[data-testid="menu-hero-scene"]')).toBeVisible({
        timeout: 15_000,
      });
      await page.waitForTimeout(1500);

      expect(hydrationErrors, `hydration errors on ${path}`).toEqual([]);
    });
  }
});

/** Menu-scene smoke guard: the GSAP scene still animates after deferral. */
test('menu page scene still runs (ring present, main group floats)', async ({ page }) => {
  await page.goto('/features');
  await waitForHydration(page);
  await expect(page.locator('[data-testid="menu-hero-scene"]')).toBeVisible({ timeout: 15_000 });

  // The scene timeline registers after hydration; GSAP starts driving the
  // main group with an inline transform. Poll (not a fixed wait) so CPU
  // contention under parallel load can't starve the requestAnimationFrame
  // registration and flake the assertion.
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const el = document.querySelector('.scene-main-group');
          return el ? (el.getAttribute('style') ?? '').includes('transform') : false;
        }),
      { timeout: 15_000 },
    )
    .toBe(true);
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const el = document.querySelector('.scene-ring');
          return el ? (el.getAttribute('style') ?? '').includes('rotate') : false;
        }),
      { timeout: 15_000 },
    )
    .toBe(true);
});
