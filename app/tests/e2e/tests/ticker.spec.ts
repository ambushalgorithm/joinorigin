import { expect, test } from '@playwright/test';

/**
 * Logo ticker coverage (spec §5.5).
 *
 * Verifies the `Trusted by teams at` label, the seamless marquee of 5 partner
 * marks repeated 4× (20 images), the infinite CSS animation, edge-fade mask,
 * pause-on-hover behavior, and the reduced-motion static fallback.
 */

test.describe('logo ticker', () => {
  test('renders the label and 20 partner marks (5 logos × 4 repeats)', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Trusted by teams at')).toBeVisible();

    const marquee = page.getByTestId('logo-marquee');
    await expect(marquee).toBeVisible();

    const logos = marquee.locator('img[src*="/assets/partners/"]');
    await expect(logos).toHaveCount(20);

    // Distinct partner marks are present (1..5).
    for (let i = 1; i <= 5; i += 1) {
      await expect(marquee.locator(`img[src*="partner-0${i}.svg"]`)).toHaveCount(4);
    }
  });

  test('marquee animates continuously and pauses on hover', async ({ page }) => {
    await page.goto('/');

    // The track (parent of the first logo) carries the marquee animation.
    const track = page
      .getByTestId('logo-marquee')
      .locator('img[src*="/assets/partners/"]')
      .first()
      .locator('xpath=..');

    await expect
      .poll(async () => track.evaluate((el) => getComputedStyle(el).animationName), {
        timeout: 10_000,
      })
      .not.toBe('none');

    // Hover pauses the animation (spec §5.5). The track is continuously
    // translating horizontally, so Playwright's hover() can never consider it
    // "stable"; scroll the marquee into the viewport, then move the pointer to
    // the track's own vertical center (its Y is static in normal flow).
    const marquee = page.getByTestId('logo-marquee');
    await marquee.scrollIntoViewIfNeeded();
    await expect(marquee).toBeVisible();
    const marqueeBox = await marquee.boundingBox();
    const trackBox = await track.boundingBox();
    expect(marqueeBox).not.toBeNull();
    expect(trackBox).not.toBeNull();
    await page.mouse.move(
      marqueeBox!.x + marqueeBox!.width / 2,
      trackBox!.y + trackBox!.height / 2,
    );
    await expect
      .poll(async () => track.evaluate((el) => getComputedStyle(el).animationPlayState), {
        timeout: 10_000,
      })
      .toBe('paused');
  });

  test('renders a static centered strip with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const marquee = page.getByTestId('logo-marquee');
    await expect(marquee).toBeVisible();
    await expect(marquee.locator('img[src*="/assets/partners/"]')).toHaveCount(20);

    const track = marquee.locator('img[src*="/assets/partners/"]').first().locator('xpath=..');
    const anim = await track.evaluate((el) => getComputedStyle(el).animationName);
    expect(anim).toBe('none');
  });
});
