import { expect, test } from '@playwright/test';

/**
 * Hero rendering + animation coverage (spec §5.2–§5.4, §7).
 *
 * Verifies the typewriter heading (progressive typing, two-tone split with
 * the accent remainder on its own block line, persistent caret), the Start
 * Project CTA, supporting copy, trust row, the orbit circles visualization
 * (4 rings, count-up hub, 9 avatar chips), entrance animations, local font
 * loading, and the no-external-CDN rule.
 */

const FULL_TEXT =
  'Ideas, projects and community collaboration space — where teams and the best projects find their Origin.';
const FULL_TEXT_LENGTH = FULL_TEXT.length;

test.describe('hero left — typewriter heading', () => {
  test('types progressively and completes to the two-tone heading with a caret', async ({
    page,
  }) => {
    await page.goto('/');

    // Typewriter animation: the heading first clears/partials, then completes.
    await expect
      .poll(async () => (await page.locator('h1').textContent())?.length ?? 0, {
        timeout: 10_000,
      })
      .toBeLessThan(FULL_TEXT_LENGTH);

    await expect(page.locator('h1')).toContainText(FULL_TEXT, { timeout: 15_000 });

    // Two-tone split: Body span + Accent span + Caret span once complete.
    await expect
      .poll(async () => page.locator('h1 span').count(), { timeout: 10_000 })
      .toBeGreaterThanOrEqual(3);

    // The accent span carries the gradient remainder on its own line ("Origin.").
    const accentText = await page.locator('h1 span').nth(1).textContent();
    expect(accentText).toContain('Origin.');

    // Caret persists after completion.
    await expect(page.locator('h1')).toContainText('|');
  });

  test('renders the full heading instantly with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    await expect(page.locator('h1')).toContainText(FULL_TEXT, { timeout: 10_000 });
  });
});

test.describe('hero left — CTA, copy, trust', () => {
  test('shows Start Project with chevron, supporting copy and trust row', async ({ page }) => {
    await page.goto('/');

    const startProject = page.getByTestId('start-project-button');
    await expect(startProject).toBeVisible();
    await expect(startProject).toContainText('Start Project');

    await expect(page.getByText(/Create a profile that works like your resume/)).toBeVisible();
    await expect(page.getByText('Join 2,400+ builders already collaborating')).toBeVisible();

    // 9 overlapping trust avatars + 9 orbit chips = 18 member images.
    await expect(page.locator('img[alt^="JoinOrigin member"]')).toHaveCount(18);
  });
});

test.describe('hero right — orbit circles visualization', () => {
  test('renders 4 orbit rings, the count-up hub, and 9 avatar chips', async ({ page }) => {
    await page.goto('/');

    const viz = page.getByTestId('orbit-viz');
    await expect(viz).toBeVisible();
    for (let i = 1; i <= 4; i += 1) {
      await expect(page.getByTestId(`orbit-${i}`)).toBeVisible();
    }

    // Count-up reaches the spec target.
    await expect(page.getByTestId('orbit-hub')).toContainText('2,400+', { timeout: 15_000 });
    await expect(page.getByTestId('orbit-hub')).toContainText('Members');

    await expect(viz.locator('img[alt^="JoinOrigin member"]')).toHaveCount(9);
  });

  test('orbit rings have the spec diameters on a wide desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    // Use computed CSS widths — the entrance scale-in animation (scale 0.85→1)
    // would make boundingBox() report mid-animation sizes.
    const expected: Record<number, number> = { 1: 353, 2: 501, 3: 649, 4: 797 };
    for (let i = 1; i <= 4; i += 1) {
      const width = await page.getByTestId(`orbit-${i}`).evaluate((el) => {
        return parseFloat(getComputedStyle(el).width);
      });
      expect(width).toBe(expected[i]);
    }
  });

  test('snaps the count-up target with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    await expect(page.getByTestId('orbit-hub')).toContainText('2,400+', { timeout: 10_000 });
    // Orbit spin animations are disabled under reduced motion.
    const anim = await page
      .getByTestId('orbit-1')
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(anim).toBe('none');
  });
});

test.describe('entrance animations (spec §7)', () => {
  test('applies entrance animations to header, orbit viz, and hero elements', async ({ page }) => {
    await page.goto('/');

    // Header fade-down.
    await expect
      .poll(
        async () => page.getByTestId('header').evaluate((el) => getComputedStyle(el).animationName),
        { timeout: 10_000 },
      )
      .not.toBe('none');

    // Orbit scale-in on the container.
    await expect
      .poll(
        async () =>
          page.getByTestId('orbit-viz').evaluate((el) => getComputedStyle(el).animationName),
        { timeout: 10_000 },
      )
      .not.toBe('none');
  });
});

test.describe('fonts & external assets (spec §3, §11)', () => {
  test('loads Inter + Urbanist locally and makes no external CDN requests', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (request) => {
      const url = request.url();
      if (
        /^https?:/.test(url) &&
        !url.startsWith('http://127.0.0.1') &&
        !url.startsWith('http://localhost')
      ) {
        external.push(url);
      }
    });

    await page.goto('/');
    await expect(page.getByTestId('header')).toBeVisible();

    // Give fonts a chance to settle, then verify both families are loaded.
    await page.evaluate(() => document.fonts.ready);
    const interLoaded = await page.evaluate(() => document.fonts.check('16px Inter'));
    const urbanistLoaded = await page.evaluate(() => document.fonts.check('24px Urbanist'));
    expect(interLoaded).toBe(true);
    expect(urbanistLoaded).toBe(true);

    expect(external).toEqual([]);
  });
});
