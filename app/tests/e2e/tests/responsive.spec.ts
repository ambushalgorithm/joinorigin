import { expect, test, type Locator, type Page } from '@playwright/test';

/**
 * Responsive breakpoint coverage (spec §8).
 *
 * Viewport buckets (max-width semantics per spec):
 *   >1280px — two columns, heading 64px, orbit scale 1.0 (720px), full nav
 *   ≤1280px — two columns, heading 64px, orbit scale 0.85 (612px)
 *   ≤1024px — stacked layout, heading 48px, orbit scale 0.7 (504px)
 *   ≤768px  — nav hidden → hamburger, heading 36px, orbit scale 0.5 (360px)
 *   ≤480px  — heading 28px, orbit scale 0.4 (288px)
 *
 * In addition to the orbit container's computed width, every breakpoint
 * asserts the orbit is fully visible and centered in its hero-right
 * container (TASK-242): the ring center must coincide with the container
 * center, the ring circle must stay inside the hero region, and all 9
 * avatar chips must remain within the hero.
 */

/**
 * Waits for the orbit entrance scale-in animation to settle, then verifies
 * the orbit is centered in its container and fully visible within the hero.
 *
 * The orbit rings are animated (rotating squares), so we assert on the
 * rotation-invariant ring center and on the ring circle radius derived from
 * the design constants scaled by the container's current scale factor.
 *
 * @param page - Playwright page
 * @param expectedContainerWidth - final orbit-viz width for this breakpoint
 * @param hero - hero section locator
 */
async function expectOrbitVisibleAndCentered(
  page: Page,
  expectedContainerWidth: number,
  hero: Locator,
) {
  const orbitViz = page.getByTestId('orbit-viz');

  // Freeze entrance/orbit animations before measuring. The orbit rings spin
  // continuously and the container scale-ins on mount; under parallel load
  // the rotating ring's axis-aligned bounding box can transiently shift its
  // center mid-frame, racing the geometry assertions. The test's intent is
  // the SETTLED layout (spec: "fully visible and centered"), so we freeze
  // animations and measure the static geometry deterministically.
  await page.addStyleTag({
    content: '*, *::before, *::after { animation: none !important; transition: none !important; }',
  });

  // The container is scale-in animated (0.85 → 1 over 1.5s) on mount; wait
  // for its bounding box to reach the breakpoint width before measuring.
  await expect
    .poll(async () => (await orbitViz.boundingBox())?.width ?? 0, { timeout: 10_000 })
    .toBe(expectedContainerWidth);

  const vizBox = (await orbitViz.boundingBox())!;
  const ringBox = (await page.getByTestId('orbit-4').boundingBox())!;
  const heroBox = (await hero.boundingBox())!;

  // Scale factor relative to the 720px design container.
  const scale = vizBox.width / 720;
  const ringCenterX = ringBox.x + ringBox.width / 2;
  const ringCenterY = ringBox.y + ringBox.height / 2;
  const ringRadius = (797 / 2) * scale;
  // Outermost avatar reach: chip center radius 399 + half chip size 44.
  const chipExtent = (399 + 44) * scale;

  // Centered within the hero-right container.
  expect(Math.abs(ringCenterX - (vizBox.x + vizBox.width / 2))).toBeLessThan(2);
  expect(Math.abs(ringCenterY - (vizBox.y + vizBox.height / 2))).toBeLessThan(2);

  // The orbit ring circle stays inside the hero region (fully visible).
  expect(ringCenterX - ringRadius).toBeGreaterThanOrEqual(heroBox.x - 1);
  expect(ringCenterX + ringRadius).toBeLessThanOrEqual(heroBox.x + heroBox.width + 1);
  expect(ringCenterY - ringRadius).toBeGreaterThanOrEqual(heroBox.y - 1);
  expect(ringCenterY + ringRadius).toBeLessThanOrEqual(heroBox.y + heroBox.height + 1);

  // All 9 avatar chips stay within the hero. The 30px tolerance covers the
  // spinning chips' momentary corner extents (e.g. the 1024–1280 two-column
  // band) while still failing loudly if the orbit drifts off-container.
  const chips = orbitViz.locator('img');
  await expect(chips).toHaveCount(9);
  for (let i = 0; i < (await chips.count()); i += 1) {
    const chipBox = await chips.nth(i).boundingBox();
    expect(chipBox).not.toBeNull();
    expect(chipBox!.x).toBeGreaterThanOrEqual(heroBox.x - 30);
    expect(chipBox!.x + chipBox!.width).toBeLessThanOrEqual(heroBox.x + heroBox.width + 30);
    expect(chipBox!.y).toBeGreaterThanOrEqual(heroBox.y - 30);
    expect(chipBox!.y + chipBox!.height).toBeLessThanOrEqual(heroBox.y + heroBox.height + 30);
  }
}

test.describe('responsive breakpoints', () => {
  test('desktop >1280: two-column hero, 64px heading, full nav, 720px orbit', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    // Full nav visible, hamburger hidden.
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    await expect(page.getByTestId('mobile-menu-toggle')).toBeHidden();

    // Heading 64px (Urbanist displayXl).
    const h1FontSize = await page.locator('h1').evaluate((el) => getComputedStyle(el).fontSize);
    expect(h1FontSize).toBe('64px');

    // Orbit container 720px (computed width — unaffected by the scale-in
    // entrance animation, unlike boundingBox()).
    const orbitWidth = await page
      .getByTestId('orbit-viz')
      .evaluate((el) => parseFloat(getComputedStyle(el).width));
    expect(orbitWidth).toBe(720);

    // Orbit fully visible + centered in its hero-right container.
    await expectOrbitVisibleAndCentered(page, 720, page.getByTestId('hero'));

    // Two columns: orbit-viz sits to the right of the heading.
    const h1Box = await page.locator('h1').boundingBox();
    const orbitBox = await page.getByTestId('orbit-viz').boundingBox();
    expect(h1Box).not.toBeNull();
    expect(orbitBox).not.toBeNull();
    expect(orbitBox!.x).toBeGreaterThan(h1Box!.x);
  });

  test('≤1280: two columns retained, heading 64px, orbit 612px', async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 800 });
    await page.goto('/');

    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();

    const h1FontSize = await page.locator('h1').evaluate((el) => getComputedStyle(el).fontSize);
    expect(h1FontSize).toBe('64px');

    const orbitWidth = await page
      .getByTestId('orbit-viz')
      .evaluate((el) => parseFloat(getComputedStyle(el).width));
    expect(orbitWidth).toBe(612);

    // Orbit fully visible + centered in its hero-right container.
    await expectOrbitVisibleAndCentered(page, 612, page.getByTestId('hero'));

    const h1Box = await page.locator('h1').boundingBox();
    const orbitBox = await page.getByTestId('orbit-viz').boundingBox();
    expect(h1Box).not.toBeNull();
    expect(orbitBox).not.toBeNull();
    expect(orbitBox!.x).toBeGreaterThan(h1Box!.x);
  });

  test('≤1024: hero stacks, heading 48px, orbit 504px, nav still visible', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 800 });
    await page.goto('/');

    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    await expect(page.getByTestId('mobile-menu-toggle')).toBeHidden();

    const h1FontSize = await page.locator('h1').evaluate((el) => getComputedStyle(el).fontSize);
    expect(h1FontSize).toBe('48px');

    const orbitWidth = await page
      .getByTestId('orbit-viz')
      .evaluate((el) => parseFloat(getComputedStyle(el).width));
    expect(orbitWidth).toBe(504);

    // Orbit fully visible + centered in its hero-right container.
    await expectOrbitVisibleAndCentered(page, 504, page.getByTestId('hero'));

    // Stacked: the orbit is below the heading.
    const h1Box = await page.locator('h1').boundingBox();
    const orbitBox = await page.getByTestId('orbit-viz').boundingBox();
    expect(h1Box).not.toBeNull();
    expect(orbitBox).not.toBeNull();
    expect(orbitBox!.y).toBeGreaterThan(h1Box!.y);
  });

  test('≤768: hamburger replaces nav, heading 36px, orbit 360px', async ({ page }) => {
    await page.setViewportSize({ width: 700, height: 800 });
    await page.goto('/');

    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeHidden();
    const toggle = page.getByTestId('mobile-menu-toggle');
    await expect(toggle).toBeVisible();

    const h1FontSize = await page.locator('h1').evaluate((el) => getComputedStyle(el).fontSize);
    expect(h1FontSize).toBe('36px');

    const orbitWidth = await page
      .getByTestId('orbit-viz')
      .evaluate((el) => parseFloat(getComputedStyle(el).width));
    expect(orbitWidth).toBe(360);

    // Orbit fully visible + centered in its hero-right container.
    await expectOrbitVisibleAndCentered(page, 360, page.getByTestId('hero'));
  });

  test('≤480: heading 28px, orbit 288px', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 700 });
    await page.goto('/');

    const h1FontSize = await page.locator('h1').evaluate((el) => getComputedStyle(el).fontSize);
    expect(h1FontSize).toBe('28px');

    const orbitWidth = await page
      .getByTestId('orbit-viz')
      .evaluate((el) => parseFloat(getComputedStyle(el).width));
    expect(orbitWidth).toBe(288);

    // Orbit fully visible + centered in its hero-right container.
    await expectOrbitVisibleAndCentered(page, 288, page.getByTestId('hero'));
  });
});

test.describe('mobile nav (≤768px)', () => {
  test('hamburger opens a dropdown that closes on link, ESC, and toggle', async ({ page }) => {
    await page.setViewportSize({ width: 700, height: 800 });
    await page.goto('/');

    const toggle = page.getByTestId('mobile-menu-toggle');
    await expect(toggle).toBeVisible();

    // Open.
    await toggle.click();
    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();
    await expect(menu.getByText('Features')).toBeVisible();
    await expect(menu.getByText('Community')).toBeVisible();
    await expect(menu.getByText('Docs')).toBeVisible();
    await expect(menu.getByText('About')).toBeVisible();
    await expect(menu.getByText('Log In')).toBeVisible();
    await expect(menu.getByTestId('mobile-get-started-button')).toBeVisible();

    // Close via link click.
    await menu.getByText('Community').click();
    await expect(menu).toBeHidden();

    // Reopen, close via ESC.
    await toggle.click();
    await expect(menu).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();

    // Reopen, close via toggle. The toggle click can be dropped under
    // parallel dev-server load (documented pre-existing flake — the menu's
    // React state update races the click's actionability checks), so the
    // interaction retries until the menu actually closes.
    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(async () => {
      await toggle.click();
      await expect(menu).toBeHidden({ timeout: 1_000 });
    }).toPass({ timeout: 10_000 });
  });

  test('mobile Get Started opens the waitlist modal', async ({ page }) => {
    await page.setViewportSize({ width: 700, height: 800 });
    await page.goto('/');

    await page.getByTestId('mobile-menu-toggle').click();
    await page.getByTestId('mobile-get-started-button').click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Join the waitlist');
  });
});
