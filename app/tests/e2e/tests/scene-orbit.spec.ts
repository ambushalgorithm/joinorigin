import { test, expect, type Page } from '@playwright/test';

import { waitForHydration } from './helpers';

/**
 * Live scene-motion validation (TASK-291).
 *
 * TASK-290 pinned the GSAP SVG pivot (`transformBox: 'fill-box'` +
 * `transformOrigin: 'center center'` via `gsap.set`), but the
 * `.scene-orbit-group` rotation STILL drifted off-center — GSAP 3.15's SVG
 * transform-origin handling remains unreliable for the inline orbit cluster.
 * User decision: REMOVE the orbit rotation and its coupled `.scene-node`
 * counter-rotation (which existed only to keep icon glyphs upright while the
 * orbit group spun) entirely. The working `.scene-main-group` float and
 * `.scene-ring` counter-spin are kept.
 *
 * This spec samples every 800ms over several 800ms phases and asserts the NEW
 * contract:
 *
 *  1. `.scene-orbit-group` bbox/transform is STABLE — the group never
 *     rotates (rotation stays ≈ 0°) and its bbox center never drifts (all
 *     samples identical);
 *  2. `.scene-orbit-group` stays CENTERED — its bbox center is near the
 *     scene svg (container) center (scenes whose orbit line is intentionally
 *     offset, e.g. /docs, are still within a generous bound);
 *  3. `.scene-ring` still spins — its transform rotation advances over the
 *     sample window (menu pages that ship the ring);
 *  4. `.scene-main-group` still floats — its translateY changes over the
 *     sample window.
 */

export const ORBIT_PAGES = [
  '/features',
  '/community',
  '/docs',
  '/about',
  '/does-not-exist-404',
] as const;

/** Sampling interval (ms) between bbox/transform reads. */
const SAMPLE_INTERVAL_MS = 800;
/** How many samples to take per page. */
const SAMPLE_COUNT = 5;
/** SVG viewBox (all scenes are 560×420) → hub/container center. */
const VIEWBOX_CENTER = { x: 280, y: 210 };
/** The orbit group must not rotate after the orbit spin removal. */
const ORBIT_ROTATION_TOLERANCE = 1;
/** Loose bound to the container center (docs' orbit line sits at y≈300). */
const ORBIT_CENTER_CONTAINER_TOLERANCE = 100;
/** Minimum ring spin over the sample window (60s revolution → ~6°/sample). */
const RING_SPIN_MIN_DEG = 5;
/** Minimum main-group float (translateY) movement over the sample window. */
const MAIN_FLOAT_MIN_DELTA = 1;

interface Point {
  x: number;
  y: number;
}

interface TransformReadout {
  rotationDeg: number;
  translateY: number;
}

/** Reads the bbox center of the orbit group (viewBox units, pre-transform). */
async function orbitGroupCenter(page: Page): Promise<Point | null> {
  return page.evaluate(() => {
    const el = document.querySelector<SVGGraphicsElement>('.scene-orbit-group');
    if (!el) {
      return null;
    }
    const b = el.getBBox();
    return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
  });
}

/**
 * Reads an element's GSAP-applied transform (rotation deg + translateY).
 * GSAP writes SVG transforms to the `transform` attribute and HTML element
 * transforms to `style.transform` — both are parsed here, falling back to
 * identity when no transform is applied (e.g. the orbit group, which GSAP no
 * longer touches after TASK-291).
 */
async function readTransform(page: Page, selector: string): Promise<TransformReadout> {
  return page.evaluate((sel) => {
    const el = document.querySelector<SVGGraphicsElement | HTMLElement>(sel);
    const attr = el?.getAttribute('transform') ?? '';
    const style = el?.style?.transform ?? '';
    const raw = `${attr} ${style}`.trim();

    const matrix = raw.match(/matrix\(([^)]+)\)/);
    if (matrix) {
      const [a, b, c, d, e, f] = matrix[1].split(/[ ,]+/).map(Number);
      return {
        rotationDeg: (Math.atan2(b, a) * 180) / Math.PI,
        translateY: Number.isFinite(f) ? f : 0,
      };
    }

    const rotate = raw.match(/rotate\(\s*(-?[\d.]+)(?:deg)?\s*\)/);
    const translateY = raw.match(/translateY\(\s*(-?[\d.]+)/);
    return {
      rotationDeg: rotate ? Number(rotate[1]) : 0,
      translateY: translateY ? Number(translateY[1]) : 0,
    };
  }, selector);
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

test.describe('scene orbit group stays stable + centered, ring spins, hub floats (TASK-291)', () => {
  for (const path of ORBIT_PAGES) {
    test(`${path}: orbit-group bbox/transform stable + centered over ${SAMPLE_COUNT} samples; ring spins; main-group floats`, async ({
      page,
    }) => {
      await page.goto(path);
      await waitForSceneReady(page);

      // Only menu pages ship the `.scene-ring` element (the 404 page does
      // not); its spin assertion is conditional on presence.
      const hasRing = await page.evaluate(() => document.querySelector('.scene-ring') !== null);

      const centers: Point[] = [];
      const orbitRotations: number[] = [];
      const ringRotations: number[] = [];
      const mainTranslateYs: number[] = [];

      for (let i = 0; i < SAMPLE_COUNT; i += 1) {
        const center = await orbitGroupCenter(page);
        expect(center, `orbit group bbox should exist at sample ${i}`).not.toBeNull();
        centers.push(center as Point);

        const orbit = await readTransform(page, '.scene-orbit-group');
        orbitRotations.push(orbit.rotationDeg);

        if (hasRing) {
          const ring = await readTransform(page, '.scene-ring');
          ringRotations.push(ring.rotationDeg);
        }

        const main = await readTransform(page, '.scene-main-group');
        mainTranslateYs.push(main.translateY);

        if (i < SAMPLE_COUNT - 1) {
          await page.waitForTimeout(SAMPLE_INTERVAL_MS);
        }
      }

      // 1) The orbit group NEVER rotates (transform stable — rotation ≈ 0°).
      for (const deg of orbitRotations) {
        expect(
          Math.abs(deg),
          `orbit-group rotation should stay ≈ 0° (got ${deg.toFixed(2)}°)`,
        ).toBeLessThanOrEqual(ORBIT_ROTATION_TOLERANCE);
      }

      // 2) The orbit-group bbox center never drifts (identical across samples).
      const centerStrings = centers.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`);
      for (const s of centerStrings) {
        expect(
          s,
          `orbit-group bbox center should be stable (got ${centerStrings.join(' | ')})`,
        ).toBe(centerStrings[0]);
      }

      // 3) The orbit-group bbox center stays within the scene bounds (near
      //    the container center); scenes with intentionally offset orbit
      //    lines (e.g. /docs node line at y≈300) still satisfy the loose
      //    bound.
      const center = centers[0];
      const containerDist = Math.hypot(
        center.x - VIEWBOX_CENTER.x,
        center.y - VIEWBOX_CENTER.y,
      );
      expect(
        containerDist,
        `orbit-group center (${center.x.toFixed(1)},${center.y.toFixed(1)}) should be within the scene near the container center (${VIEWBOX_CENTER.x},${VIEWBOX_CENTER.y})`,
      ).toBeLessThanOrEqual(ORBIT_CENTER_CONTAINER_TOLERANCE);

      // 4) The ring still spins — the removal must not freeze the working
      //    `.scene-ring` counter-spin.
      if (hasRing) {
        const ringDelta = Math.max(...ringRotations) - Math.min(...ringRotations);
        expect(
          Math.abs(ringDelta),
          `ring rotation should advance over the sample window (${ringDelta.toFixed(1)}°)`,
        ).toBeGreaterThan(RING_SPIN_MIN_DEG);
      }

      // 5) The hub still floats — the removal must not freeze the working
      //    `.scene-main-group` float (translateY changes over the window).
      const floatDelta = Math.max(...mainTranslateYs) - Math.min(...mainTranslateYs);
      expect(
        Math.abs(floatDelta),
        `main-group translateY should change over the sample window (${floatDelta.toFixed(2)} units)`,
      ).toBeGreaterThan(MAIN_FLOAT_MIN_DELTA);
    });
  }
});
