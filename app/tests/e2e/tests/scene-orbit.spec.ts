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
 *     rotates (rotation stays ≈ 0°) and its bbox center never drifts beyond
 *     a sub-pixel tolerance (same withinTolerance approach as
 *     orbit-hub-stability.spec.ts — exact string equality flakes on
 *     sub-pixel bbox jitter);
 *  2. `.scene-orbit-group` stays CENTERED — its bbox center is near the
 *     scene svg (container) center (scenes whose orbit line is intentionally
 *     offset, e.g. /docs, are still within a generous bound);
 *  3. `.scene-ring` still spins — its transform rotation CHANGES (starve-proof
 *     expect.poll, menu pages that ship the ring);
 *  4. `.scene-main-group` still floats — its translateY CHANGES (starve-proof
 *     expect.poll).
 *
 * Flake hardening (TASK-522): the ring/float assertions no longer use the
 * fixed 5×800ms max−min window — rAF starvation under parallel load can zero
 * the window and the sine-ease turnaround can wash out a short sample. They
 * now `expect.poll` over a generous window for ANY value change (> 0) between
 * reads at least 1s apart.
 */

export const ORBIT_PAGES = [
  '/features',
  '/network',
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
/** Sub-pixel bbox-center stability tolerance across samples (same as orbit-hub-stability.spec.ts). */
const ORBIT_CENTER_STABILITY_TOLERANCE = 0.5;
/** Loose bound to the container center (docs' orbit line sits at y≈300). */
const ORBIT_CENTER_CONTAINER_TOLERANCE = 100;
/** Minimum spacing (ms) between "value changed" poll reads. */
const CHANGE_POLL_MIN_SPACING_MS = 1_000;
/**
 * Generous window for the starve-proof "value changed" polls — ~4× the old
 * fixed 4s sampling window so CPU starvation under parallel load can't zero
 * it (matches the app's SCENE_HYDRATION_MAX_WAIT_MS=30s spirit).
 */
const CHANGE_POLL_TIMEOUT_MS = 15_000;

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
      // Only the rotation (a,b) and translateY (f) terms are consumed; the
      // remaining matrix elements are elided to satisfy no-unused-vars.
      const [a, b, , , , f] = matrix[1].split(/[ ,]+/).map(Number);
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

/** True when every sample is within `tolerance` of the first sample. */
function withinTolerance(samples: number[], tolerance: number): boolean {
  if (samples.length === 0) {
    return false;
  }
  const first = samples[0];
  return samples.every((s) => Math.abs(s - first) <= tolerance);
}

/**
 * Starve-proof "value changed" poll (TASK-522). Reads the selected transform
 * field every CHANGE_POLL_MIN_SPACING_MS and resolves once ANY change (> 0)
 * is observed between reads at least 1s apart.
 *
 * This replaces the old fixed-window max−min delta assertion: a 5×800ms
 * window could be zeroed by rAF starvation under parallel load (the tween
 * simply did not advance during the window), and a sine.ease turnaround could
 * wash out a short fixed sample. Polling until the change is actually
 * observed is phase-independent and starvation-proof.
 */
async function expectTransformChange(
  page: Page,
  selector: string,
  field: keyof TransformReadout,
): Promise<void> {
  let previous: number | null = null;
  let previousAt = 0;
  await expect
    .poll(
      async () => {
        const now = Date.now();
        const readout = await readTransform(page, selector);
        const value = readout[field];
        if (previous !== null && now - previousAt >= CHANGE_POLL_MIN_SPACING_MS) {
          if (Math.abs(value - previous) > 0) {
            return true;
          }
        }
        previous = value;
        previousAt = now;
        return false;
      },
      { timeout: CHANGE_POLL_TIMEOUT_MS, intervals: [CHANGE_POLL_MIN_SPACING_MS] },
    )
    .toBe(true);
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
  // GSAP starts the scene timeline (inline transform on `.scene-main-group`)
  // after hydration. Poll for it — a fixed wait can be starved by CPU
  // contention under parallel load, which would zero the sampling window and
  // flake the float/spin assertions. The 30s poll matches the app's own
  // SCENE_HYDRATION_MAX_WAIT_MS (components/motion.ts) — the previous 15s
  // gave up halfway through the app's designed hydration window, failing
  // under slow chunk delivery.
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const el = document.querySelector('.scene-main-group');
          return el ? (el.getAttribute('style') ?? '').includes('transform') : false;
        }),
      { timeout: 30_000 },
    )
    .toBe(true);
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

      for (let i = 0; i < SAMPLE_COUNT; i += 1) {
        const center = await orbitGroupCenter(page);
        expect(center, `orbit group bbox should exist at sample ${i}`).not.toBeNull();
        centers.push(center as Point);

        const orbit = await readTransform(page, '.scene-orbit-group');
        orbitRotations.push(orbit.rotationDeg);

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

      // 2) The orbit-group bbox center never drifts beyond a sub-pixel
      //    tolerance (exact string equality flaked on sub-pixel jitter).
      const centerXs = centers.map((p) => p.x);
      const centerYs = centers.map((p) => p.y);
      const fmtCenter = (n: number) => n.toFixed(2);
      expect(
        withinTolerance(centerXs, ORBIT_CENTER_STABILITY_TOLERANCE),
        `orbit-group bbox center x should be stable (${centerXs.map(fmtCenter).join(' | ')})`,
      ).toBe(true);
      expect(
        withinTolerance(centerYs, ORBIT_CENTER_STABILITY_TOLERANCE),
        `orbit-group bbox center y should be stable (${centerYs.map(fmtCenter).join(' | ')})`,
      ).toBe(true);

      // 3) The orbit-group bbox center stays within the scene bounds (near
      //    the container center); scenes with intentionally offset orbit
      //    lines (e.g. /docs node line at y≈300) still satisfy the loose
      //    bound.
      const center = centers[0];
      const containerDist = Math.hypot(center.x - VIEWBOX_CENTER.x, center.y - VIEWBOX_CENTER.y);
      expect(
        containerDist,
        `orbit-group center (${center.x.toFixed(1)},${center.y.toFixed(1)}) should be within the scene near the container center (${VIEWBOX_CENTER.x},${VIEWBOX_CENTER.y})`,
      ).toBeLessThanOrEqual(ORBIT_CENTER_CONTAINER_TOLERANCE);

      // 4) The ring still spins — the removal must not freeze the working
      //    `.scene-ring` counter-spin. Starve-proof + phase-independent: poll
      //    until the rotation VALUE CHANGES instead of asserting a fixed
      //    window max−min delta.
      if (hasRing) {
        await expectTransformChange(page, '.scene-ring', 'rotationDeg');
      }

      // 5) The hub still floats — the removal must not freeze the working
      //    `.scene-main-group` float (translateY CHANGES).
      await expectTransformChange(page, '.scene-main-group', 'translateY');
    });
  }
});
