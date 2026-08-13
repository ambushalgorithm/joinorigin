import { test, expect, type Page } from '@playwright/test';

import { waitForHydration } from './helpers';

/**
 * Live orbit-pivot validation (TASK-290).
 *
 * Closes the visual verification gap from TASK-283/286: those audits proved
 * the scene icons ROTATE, but not that the `.scene-orbit-group` stays
 * CENTERED while rotating. GSAP 3.15 rewrites transform-origin for SVG
 * elements in viewBox units, so the CSS-only `transform-box: fill-box;
 * transform-origin: center` rule on the scene groups was not reliable — the
 * orbit cluster could pivot around the wrong origin and drift off-center.
 * The fix pins the GSAP-native pivot per target in `useSceneMotion`
 * (`transformBox: 'fill-box'` + `transformOrigin: 'center center'` via
 * `gsap.set`).
 *
 * GSAP records the resolved SVG pivot in the `data-svg-origin` attribute
 * (viewBox units). This spec samples it (plus the group's own fill-box
 * center) every 800ms over several rotation phases and asserts:
 *
 *  1. the pivot is stable across phases — the orbit cluster never drifts;
 *  2. the pivot equals the orbit group's own fill-box center (the hub) — it
 *     rotates around ITS center, not the viewBox origin (a wrong-origin
 *     pivot is 100s of viewBox units away);
 *  3. the pivot is near the scene svg (container) center — the cluster stays
 *     within the scene bounds (scenes whose orbit line is intentionally
 *     offset, e.g. /docs, are still within a generous bound);
 *  4. rotation is actually happening — the satellite nodes orbit.
 */

export const ORBIT_PAGES = [
  '/features',
  '/community',
  '/docs',
  '/about',
  '/does-not-exist-404',
] as const;

/** Rotation phase sampling interval (ms) — 24s revolution → ~12°/sample. */
const SAMPLE_INTERVAL_MS = 800;
/** How many samples to take per page. */
const SAMPLE_COUNT = 5;
/** SVG viewBox (all scenes are 560×420) → hub/container center. */
const VIEWBOX_CENTER = { x: 280, y: 210 };
/** Wrong-origin pivots land ≥ 300 viewBox units away; correct ones ≤ 20. */
const PIVOT_OWN_CENTER_TOLERANCE = 30;
/** Loose bound to the container center (docs' orbit line sits at y≈300). */
const PIVOT_CONTAINER_TOLERANCE = 100;

interface Point {
  x: number;
  y: number;
}

/** Reads the GSAP-resolved SVG pivot (`data-svg-origin`) in viewBox units. */
async function orbitPivot(page: Page): Promise<Point | null> {
  return page.evaluate(() => {
    const el = document.querySelector<SVGGraphicsElement>('.scene-orbit-group');
    const origin = el?.getAttribute('data-svg-origin');
    if (!origin) {
      return null;
    }
    const [x, y] = origin.split(' ').map(Number);
    return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
  });
}

/** Reads the orbit group's own fill-box center (viewBox units). */
async function orbitFillBoxCenter(page: Page): Promise<Point | null> {
  return page.evaluate(() => {
    const el = document.querySelector<SVGGraphicsElement>('.scene-orbit-group');
    if (!el) {
      return null;
    }
    const b = el.getBBox();
    return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
  });
}

/** Reads the orbit group's current CSS rotation angle (deg) from the matrix. */
async function orbitRotationDeg(page: Page): Promise<number> {
  return page.evaluate(() => {
    const el = document.querySelector<SVGGraphicsElement>('.scene-orbit-group');
    const attr = el?.getAttribute('transform') ?? el?.style.transform ?? '';
    const m = attr.match(/matrix\(([^)]+)\)/);
    if (!m) {
      return 0;
    }
    const [a, b] = m[1].split(/[ ,]+/).map(Number);
    return (Math.atan2(b, a) * 180) / Math.PI;
  });
}

/**
 * Waits for the scene to be mounted + hydrated + GSAP-started on any page
 * (menu pages expose `[data-hero="actions"]` for the hydration marker; the
 * 404 page does not, so it waits for the scene svg + settle instead).
 */
async function waitForSceneReady(page: Page): Promise<void> {
  const hasHeroMarker = await page.evaluate(
    () => document.querySelector('[data-hero="actions"]') !== null,
  );
  if (hasHeroMarker) {
    await waitForHydration(page);
  }
  await expect(page.locator('[data-testid="menu-hero-scene"]')).toBeVisible({ timeout: 15_000 });
  // The scene entrance tween (autoAlpha + y) runs after hydration; wait for
  // it to settle before sampling.
  await page.waitForTimeout(1200);
}

test.describe('scene orbit group stays centered while rotating (TASK-290)', () => {
  for (const path of ORBIT_PAGES) {
    test(`${path}: orbit pivot is stable at the group center over ${SAMPLE_COUNT} rotation samples`, async ({
      page,
    }) => {
      await page.goto(path);
      await waitForSceneReady(page);

      // Capture the pre-sample state to prove rotation later.
      const rotationStart = await orbitRotationDeg(page);

      const pivots: Point[] = [];
      const fillBoxes: Point[] = [];
      for (let i = 0; i < SAMPLE_COUNT; i += 1) {
        const pivot = await orbitPivot(page);
        expect(pivot, `data-svg-origin pivot should exist at sample ${i}`).not.toBeNull();
        pivots.push(pivot as Point);

        const fill = await orbitFillBoxCenter(page);
        expect(fill, `orbit group fill-box should exist at sample ${i}`).not.toBeNull();
        fillBoxes.push(fill as Point);

        if (i < SAMPLE_COUNT - 1) {
          await page.waitForTimeout(SAMPLE_INTERVAL_MS);
        }
      }

      const rotationEnd = await orbitRotationDeg(page);

      // 1) The pivot never drifts across rotation phases (identical value).
      const pivotStrings = pivots.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`);
      for (const s of pivotStrings) {
        expect(s, `pivot should be stable across samples (got ${pivotStrings.join(' | ')})`).toBe(
          pivotStrings[0],
        );
      }

      // 2) The pivot is the group's own fill-box center (the hub), not the
      //    viewBox origin — a wrong-origin pivot is ≥ 300 units away.
      const pivot = pivots[0];
      const fill = fillBoxes[0];
      const ownCenterDist = Math.hypot(pivot.x - fill.x, pivot.y - fill.y);
      expect(
        ownCenterDist,
        `pivot (${pivot.x.toFixed(1)},${pivot.y.toFixed(1)}) should be near own fill-box center (${fill.x.toFixed(1)},${fill.y.toFixed(1)})`,
      ).toBeLessThanOrEqual(PIVOT_OWN_CENTER_TOLERANCE);

      // 3) The pivot stays within the scene bounds (near the container
      //    center); scenes with intentionally offset orbit lines (e.g. /docs
      //    node line at y≈300) still satisfy the loose bound.
      const containerDist = Math.hypot(
        pivot.x - VIEWBOX_CENTER.x,
        pivot.y - VIEWBOX_CENTER.y,
      );
      expect(
        containerDist,
        `pivot (${pivot.x.toFixed(1)},${pivot.y.toFixed(1)}) should be within the scene near the container center (${VIEWBOX_CENTER.x},${VIEWBOX_CENTER.y})`,
      ).toBeLessThanOrEqual(PIVOT_CONTAINER_TOLERANCE);

      // 4) Rotation actually happens — the fix must not freeze motion.
      const delta = Math.abs(rotationEnd - rotationStart);
      expect(
        delta,
        `orbit rotation should advance over the sample window (${delta.toFixed(1)}°)`,
      ).toBeGreaterThan(5);
    });
  }
});
