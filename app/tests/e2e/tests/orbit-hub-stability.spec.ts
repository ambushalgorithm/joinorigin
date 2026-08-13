import { test, expect, type Page } from '@playwright/test';

import { waitForHydration } from './helpers';

/**
 * Live `.orbit-hub` stability validation (TASK-292).
 *
 * The hub ("2,400+ Members" count-up) used to live INSIDE the rotating
 * `.orbit-1` ring; GSAP counter-rotated it (+360°/30s) to keep the text
 * upright. Two independent GSAP inline transforms cancelling each other
 * under ScaleFrame's `scale()` accumulated sub-pixel rounding every frame,
 * which made the background-clip:text count shimmer/tremble.
 *
 * Fix: render the hub as a SIBLING of the rings inside ScaleFrame (still
 * absolutely centered via the Hub component's `left/top: 50%` + negative
 * margins) and REMOVE the counter-rotation tween — the hub inherits ZERO
 * rotation, so no jitter is possible.
 *
 * This spec samples the hub bbox every 800ms over several samples and
 * asserts the NEW contract:
 *
 *  1. The hub is NOT a descendant of the rotating `.orbit-1` ring
 *     (structural contract of the fix);
 *  2. The hub bbox (x/y/width/height) stays within a SUB-PIXEL tolerance
 *     across the sample window — no drift/tremble while the rings spin;
 *  3. The count text is stable ("2,400+") during the samples (count-up
 *     finished before sampling starts);
 *  4. `.orbit-1` still rotates — the fix must not freeze the ring spin.
 */

/** Sampling interval (ms) between bbox reads. */
const SAMPLE_INTERVAL_MS = 800;
/** How many samples to take on the home page. */
const SAMPLE_COUNT = 5;
/** Sub-pixel tolerance for the hub bbox across samples (no drift/tremble). */
const HUB_TOLERANCE_PX = 0.5;
/** Minimum ring rotation advance over the sample window (30s/rev → ~9.6°/sample). */
const RING_SPIN_MIN_DEG = 5;

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Reads an element's GSAP-applied rotation (deg). GSAP writes HTML element
 * transforms to `style.transform` as `matrix(...)` (or `rotate(...)` after
 * parsing); both are parsed here, falling back to 0 when no transform is set.
 */
async function readRotationDeg(page: Page, selector: string): Promise<number> {
  return page.evaluate((sel) => {
    const el = document.querySelector<HTMLElement>(sel);
    const raw = el?.style?.transform ?? '';
    const matrix = raw.match(/matrix\(([^)]+)\)/);
    if (matrix) {
      const [a, b] = matrix[1].split(/[ ,]+/).map(Number);
      return (Math.atan2(b, a) * 180) / Math.PI;
    }
    const rotate = raw.match(/rotate\(\s*(-?[\d.]+)(?:deg)?\s*\)/);
    return rotate ? Number(rotate[1]) : 0;
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

async function waitForOrbitReady(page: Page): Promise<void> {
  await waitForHydration(page);
  await expect(page.getByTestId('orbit-viz')).toBeVisible({ timeout: 15_000 });
  await expect(page.getByTestId('orbit-hub')).toBeVisible();
  // The count-up runs 0 → 2,400 over ~3.2s; wait for it to finish so the
  // hub bbox is static before sampling (text width must not change mid-window).
  await expect(page.getByTestId('orbit-hub')).toContainText('2,400+', { timeout: 15_000 });
  // Fonts must be ready or a late font swap shifts text metrics mid-sampling.
  await page.evaluate(() => document.fonts.ready);
  // Let one full ring frame pass before the first bbox read.
  await page.waitForTimeout(100);
}

test('home page: .orbit-hub bbox stays sub-pixel stable while orbit-1 rotates (TASK-292)', async ({
  page,
}) => {
  await page.goto('/');
  await waitForOrbitReady(page);

  // 1) Structural contract: the hub must not be inside the rotating ring.
  const hubInsideOrbit = await page.evaluate(
    () => document.querySelector('.orbit-1 .orbit-hub') !== null,
  );
  expect(hubInsideOrbit, 'hub must NOT be a descendant of .orbit-1 (sibling fix)').toBe(false);

  const boxes: Box[] = [];
  const ringRotations: number[] = [];

  for (let i = 0; i < SAMPLE_COUNT; i += 1) {
    const box = await page.getByTestId('orbit-hub').boundingBox();
    expect(box, `orbit-hub bbox should exist at sample ${i}`).not.toBeNull();
    boxes.push(box as Box);

    const rotation = await readRotationDeg(page, '.orbit-1');
    ringRotations.push(rotation);

    // The count text must stay at its final value while sampling.
    await expect(page.getByTestId('orbit-hub')).toContainText('2,400+');

    if (i < SAMPLE_COUNT - 1) {
      await page.waitForTimeout(SAMPLE_INTERVAL_MS);
    }
  }

  // 2) The hub bbox never drifts/trembles (sub-pixel tolerance).
  const xs = boxes.map((b) => b.x);
  const ys = boxes.map((b) => b.y);
  const widths = boxes.map((b) => b.width);
  const heights = boxes.map((b) => b.height);
  const fmt = (n: number) => n.toFixed(3);

  expect(withinTolerance(xs, HUB_TOLERANCE_PX), `hub x stable (${xs.map(fmt).join(' | ')})`).toBe(
    true,
  );
  expect(withinTolerance(ys, HUB_TOLERANCE_PX), `hub y stable (${ys.map(fmt).join(' | ')})`).toBe(
    true,
  );
  expect(
    withinTolerance(widths, HUB_TOLERANCE_PX),
    `hub width stable (${widths.map(fmt).join(' | ')})`,
  ).toBe(true);
  expect(
    withinTolerance(heights, HUB_TOLERANCE_PX),
    `hub height stable (${heights.map(fmt).join(' | ')})`,
  ).toBe(true);

  // 4) The ring still spins — the fix must not freeze the ring animation.
  const ringDelta = Math.max(...ringRotations) - Math.min(...ringRotations);
  expect(
    Math.abs(ringDelta),
    `orbit-1 rotation should advance over the sample window (${ringDelta.toFixed(1)}°)`,
  ).toBeGreaterThan(RING_SPIN_MIN_DEG);
});
