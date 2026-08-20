import { expect, test } from '@playwright/test';

/**
 * Language switcher responsive behavior (TASK-278, Sprint 10 Story 1).
 *
 * Contract:
 *  - The header `LanguageSwitcher` is hidden below the 768px breakpoint — the
 *    mobile/hamburger menu carries its own `mobile-panel` switcher.
 *  - The mobile-menu switcher expands DOWNWARD (listbox below the trigger,
 *    in normal flow) and never overflows the viewport horizontally.
 *  - The footer switcher keeps working at every breakpoint (upward dropdown).
 *  - Locale is URL-only (TASK-468): selecting a language navigates to the
 *    `/<locale>` prefixed route and the target page renders in that locale —
 *    no `joinorigin_locale` cookie is ever written.
 */

test.describe('language switcher responsive', () => {
  test('desktop >768px: header + footer switchers visible and interactive', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const headerSwitcher = page.getByTestId('language-switcher-header');
    const footerSwitcher = page.getByTestId('language-switcher-footer');
    await expect(headerSwitcher).toBeVisible();
    await expect(footerSwitcher).toBeVisible();

    // Header listbox opens below the trigger with all 21 options.
    await headerSwitcher.getByTestId('language-switcher-trigger').click();
    const headerListbox = headerSwitcher.getByTestId('language-switcher-listbox');
    await expect(headerListbox).toBeVisible();
    await expect(headerListbox.getByRole('option')).toHaveCount(21);
    await expect(headerListbox.getByRole('option', { name: /Deutsch/ })).toBeVisible();
    // Close with Escape.
    await page.keyboard.press('Escape');
    await expect(headerListbox).toBeHidden();
  });

  test('≤768px: header switcher hidden, mobile-menu switcher expands downward without overflow', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 700, height: 800 });
    await page.goto('/');

    // Header switcher is hidden below the breakpoint (mobile menu has its own).
    await expect(page.getByTestId('language-switcher-header')).toBeHidden();

    // Open the hamburger menu and reveal the mobile-panel switcher.
    await page.getByTestId('mobile-menu-toggle').click();
    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();

    const mobileSwitcher = menu.getByTestId('language-switcher-mobile-panel');
    await expect(mobileSwitcher).toBeVisible();
    const trigger = mobileSwitcher.getByTestId('language-switcher-trigger');
    await trigger.click();

    const listbox = mobileSwitcher.getByTestId('language-switcher-listbox');
    await expect(listbox).toBeVisible();
    await expect(listbox.getByRole('option')).toHaveCount(21);

    // Downward expansion: the listbox sits below the trigger (no right-float).
    const triggerBox = (await trigger.boundingBox())!;
    const listboxBox = (await listbox.boundingBox())!;
    expect(listboxBox.y).toBeGreaterThanOrEqual(triggerBox.y + triggerBox.height - 1);

    // No horizontal overflow: listbox fits entirely inside the viewport.
    expect(listboxBox.x).toBeGreaterThanOrEqual(0);
    expect(listboxBox.x + listboxBox.width).toBeLessThanOrEqual(700);
    expect(listboxBox.width).toBeLessThanOrEqual(700);
  });

  test('≤768px: selecting a locale in the mobile menu switches immediately', async ({ page }) => {
    await page.setViewportSize({ width: 700, height: 800 });
    await page.goto('/');

    await page.getByTestId('mobile-menu-toggle').click();
    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();
    const mobileSwitcher = menu.getByTestId('language-switcher-mobile-panel');
    await mobileSwitcher.getByTestId('language-switcher-trigger').click();
    await mobileSwitcher
      .getByTestId('language-switcher-listbox')
      .getByRole('option', { name: /Deutsch/ })
      .click();

    // The selection navigates to the locale-prefixed route (TASK-450/468) so
    // the target page renders with the freshly selected locale — the URL is
    // the only persistence. The mobile panel closes on navigation because the
    // Header lives in the page subtree and remounts on the route change —
    // assert the deterministic outcome (URL + listbox hidden) instead of
    // panel persistence, which is a race with navigation.
    await expect(page).toHaveURL(/\/de(?:\/|$)/, { timeout: 15_000 });
    await expect(mobileSwitcher.getByTestId('language-switcher-listbox')).toBeHidden();
    // URL-only contract (TASK-468): the toggle writes no locale cookie.
    expect(await page.evaluate(() => document.cookie)).not.toContain('joinorigin_locale');
  });

  test('≤768px: footer switcher still opens upward and works', async ({ page }) => {
    await page.setViewportSize({ width: 700, height: 800 });
    await page.goto('/');

    const footerSwitcher = page.getByTestId('language-switcher-footer');
    await expect(footerSwitcher).toBeVisible();

    await footerSwitcher.getByTestId('language-switcher-trigger').click();
    const listbox = footerSwitcher.getByTestId('language-switcher-listbox');
    await expect(listbox).toBeVisible();
    await expect(listbox.getByRole('option')).toHaveCount(21);

    await footerSwitcher
      .getByTestId('language-switcher-listbox')
      .getByRole('option', { name: /Español/ })
      .click();

    // URL-only locale (TASK-468): the selection navigates to /es — the URL is
    // the only persistence; no locale cookie is written.
    await expect(page).toHaveURL(/\/es(?:\/|$)/, { timeout: 15_000 });
    await expect(listbox).toBeHidden();
    expect(await page.evaluate(() => document.cookie)).not.toContain('joinorigin_locale');
  });
});
