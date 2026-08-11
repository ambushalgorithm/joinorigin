import { expect, test } from '@playwright/test';

/**
 * Responsive breakpoint coverage (spec §8).
 *
 * Viewport buckets (max-width semantics per spec):
 *   >1280px — two columns, heading 64px, orbit scale 1.0 (720px), full nav
 *   ≤1280px — two columns, heading 64px, orbit scale 0.85 (612px)
 *   ≤1024px — stacked layout, heading 48px, orbit scale 0.7 (504px)
 *   ≤768px  — nav hidden → hamburger, heading 36px, orbit scale 0.5 (360px)
 *   ≤480px  — heading 28px, orbit scale 0.4 (288px)
 */

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
    await expect(menu.getByText('Product')).toBeVisible();
    await expect(menu.getByText('Community')).toBeVisible();
    await expect(menu.getByText('Pricing')).toBeVisible();
    await expect(menu.getByText('Docs')).toBeVisible();
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

    // Reopen, close via toggle.
    await toggle.click();
    await expect(menu).toBeVisible();
    await toggle.click();
    await expect(menu).toBeHidden();
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
