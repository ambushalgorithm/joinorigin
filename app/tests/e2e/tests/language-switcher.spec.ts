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
    const mobileSwitcher = menu.getByTestId('language-switcher-mobile-panel');
    await mobileSwitcher.getByTestId('language-switcher-trigger').click();
    await mobileSwitcher
      .getByTestId('language-switcher-listbox')
      .getByRole('option', { name: /Deutsch/ })
      .click();

    // The mobile panel stays open (only the switcher list closes) and the
    // locale cookie is written.
    await expect(menu).toBeVisible();
    const cookie = await page.evaluate(() => document.cookie);
    expect(cookie).toContain('joinorigin_locale=de');
    // The listbox itself closes after selection.
    await expect(mobileSwitcher.getByTestId('language-switcher-listbox')).toBeHidden();
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
    const cookie = await page.evaluate(() => document.cookie);
    expect(cookie).toContain('joinorigin_locale=es');
    await expect(listbox).toBeHidden();
  });
});
