import { expect, test, type Locator, type Page } from '@playwright/test';

/**
 * Responsive breakpoint coverage (spec §8).
 *
 * Viewport buckets (max-width semantics per spec):
 *   >1280px — two columns, heading 64px, orbit scale 1.0 (720px), full nav
 *   ≤1280px — two columns, heading 64px, orbit scale 0.85 (612px)
 *   ≤1024px — stacked layout, heading 48px, orbit scale 0.7 (504px),
 *             nav collapses → hamburger (Header breakpoint moved to 1024 in
 *             the Sprint 10 styling pass; d570244)
 *   ≤768px  — heading 36px, orbit scale 0.5 (360px)
 *   ≤480px  — heading 28px, orbit scale 0.4 (288px)
 *
 * Sprint 22 (TASK-542, Story A): the researched minimum viewport (TASK-526)
 * is 320px — mobile-first base styles are the DEFAULT and must be correct
 * from 320px up. The suite therefore adds a **320px min-viewport bucket**, a
 * **340px narrow foldable-cover bucket** (Galaxy Z Fold 2/3 covers ≈311–342px
 * — the narrowest current browsing surfaces), and a **280px sub-320 smoke
 * test** (Galaxy Fold 2019 cover emulation) that asserts ONLY the D2
 * degradation invariants: no horizontal overflow + primary content still
 * reachable.
 *
 * In addition to the orbit container's computed width, every breakpoint
 * asserts the orbit is fully visible and centered in its hero-right
 * container (TASK-242): the ring center must coincide with the container
 * center, the ring circle must stay inside the hero region, and all 9
 * avatar chips must remain within the hero.
 */

/**
 * Story A / D2 invariant: the page must never scroll horizontally. The
 * researched floor is 320px; below it (e.g. the 280px Galaxy Fold cover)
 * content flows at the available width (graceful degradation, no lost
 * content). `scrollWidth` includes any overflowing fixed-width element, so
 * this assertion fails loudly on the classic mobile overflow bug.
 */
async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - window.innerWidth;
  });
  expect(overflow, 'page must not scroll horizontally').toBeLessThanOrEqual(0);
}

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

  test('≤1024: hero stacks, heading 48px, orbit 504px, nav collapses to hamburger', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 900, height: 800 });
    await page.goto('/');

    // The header nav collapses below the desktop breakpoint (1024px): the
    // hamburger replaces the primary nav (Header.tsx, d570244 styling).
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeHidden();
    await expect(page.getByTestId('mobile-menu-toggle')).toBeVisible();

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

  test('320px minimum viewport (researched floor, TASK-526): base mobile layout, no overflow, hamburger usable', async ({
    page,
  }) => {
    // The researched floor — iPhone 5/SE class and the narrowest foldable
    // covers (Z Fold 2/3 ≈311–342px) all resolve to this bucket.
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');

    // Base (mobile-first default) layout: 28px heading + 288px orbit — the
    // same ≤480 bucket, asserted AT the floor so the default styles are
    // proven correct at 320px.
    const h1FontSize = await page.locator('h1').evaluate((el) => getComputedStyle(el).fontSize);
    expect(h1FontSize).toBe('28px');

    const orbitWidth = await page
      .getByTestId('orbit-viz')
      .evaluate((el) => parseFloat(getComputedStyle(el).width));
    expect(orbitWidth).toBe(288);

    // Orbit fully visible + centered in its hero-right container.
    await expectOrbitVisibleAndCentered(page, 288, page.getByTestId('hero'));

    // Hamburger replaces the primary nav at the floor.
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeHidden();
    const toggle = page.getByTestId('mobile-menu-toggle');
    await expect(toggle).toBeVisible();

    // D1/D2 invariant: no horizontal overflow at the minimum supported
    // viewport.
    await expectNoHorizontalOverflow(page);

    // Hamburger nav is usable: it opens the panel and the panel's primary
    // CTA is tappable (navigates to the signup page, TASK-556).
    await toggle.click();
    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();
    await expect(menu.getByText('Locations')).toBeVisible();
    await menu.getByTestId('mobile-get-started-button').click();
    await page.waitForURL('**/en/signup');
    await expect(page.getByTestId('signup-panel')).toBeVisible();
  });

  test('340px narrow foldable-cover bucket (Z Fold 2/3 class): no overflow, base layout, CTA tappable', async ({
    page,
  }) => {
    // The narrowest current foldable cover displays (Galaxy Z Fold 2/3
    // ≈311–342px CSS) — above the 320px floor but below the 480 enhancement.
    await page.setViewportSize({ width: 340, height: 700 });
    await page.goto('/');

    // Base mobile layout persists below the 480px enhancement breakpoint.
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeHidden();
    await expect(page.getByTestId('mobile-menu-toggle')).toBeVisible();

    const h1FontSize = await page.locator('h1').evaluate((el) => getComputedStyle(el).fontSize);
    expect(h1FontSize).toBe('28px');

    await expectNoHorizontalOverflow(page);

    // Primary header CTA stays tappable at the narrow foldable width — it
    // is a real anchor to the signup page (TASK-556).
    const cta = page.getByTestId('get-started-button');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/en/signup');
    await cta.click();
    await page.waitForURL('**/en/signup');
    await expect(page.getByTestId('signup-panel')).toBeVisible();
  });

  test('280px sub-320 degradation (Galaxy Fold cover, D2): no overflow, content reachable', async ({
    page,
  }) => {
    // Chrome DevTools `Galaxy Fold` preset (280×653). This is NOT a design
    // bucket — D2 graceful degradation only: no horizontal overflow and the
    // primary content remains reachable (research §5, §7).
    await page.setViewportSize({ width: 280, height: 653 });
    await page.goto('/');

    await expectNoHorizontalOverflow(page);

    // Primary content reachable: the hero H1 renders and the hamburger opens
    // the full mobile menu at the sub-320 width.
    await expect(page.locator('h1')).toBeVisible();
    await page.getByTestId('mobile-menu-toggle').click();
    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();
    await expect(menu.getByText('Guides')).toBeVisible();
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
    // Explore group (TASK-316) + retained top-level links (92cd1f4 moved
    // Community into Explore, dropped Glossary from the header).
    await expect(menu.getByText('Explore')).toBeVisible();
    await expect(menu.getByText('Community')).toBeVisible();
    await expect(menu.getByText('Guides')).toBeVisible();
    await expect(menu.getByText('Locations')).toBeVisible();
    await expect(menu.getByText('Features')).toBeVisible();
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

  test('mobile Get Started navigates to the signup page', async ({ page }) => {
    await page.setViewportSize({ width: 700, height: 800 });
    await page.goto('/');

    await page.getByTestId('mobile-menu-toggle').click();
    await page.getByTestId('mobile-get-started-button').click();

    await page.waitForURL('**/en/signup');
    await expect(page.getByTestId('signup-panel')).toBeVisible();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});
