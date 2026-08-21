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

/**
 * /location language toggle (TASK-477, Sprint 21 Story A).
 *
 * The /location hub H1 is chrome (locale-independent registry EN title), so
 * it must resolve through the active locale dictionary on toggle
 * (`seoContent.breadcrumb.hub` via MenuHero `titleKey`). The honest presence
 * claim ("Find or start a community in {{city}}") and the home/hub breadcrumb
 * crumbs re-resolve through the client dictionary the same way — the whole
 * hero + breadcrumb chrome must translate when the language is switched from
 * the /location page (URL-only locale: /en/location → /de/location).
 */
test.describe('/location language toggle (TASK-477)', () => {
  test('switching /en/location → de translates the h1, presence claim, and breadcrumbs', async ({
    page,
  }) => {
    // Reduced motion keeps GSAP Reveal/ScrollTrigger tweens from moving
    // elements mid-interaction (repo convention).
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto('/en/location');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // EN chrome before the toggle.
    await expect(page.locator('h1')).toContainText('Communities by City');
    await expect(page.getByText('Find or start a community in your city')).toBeVisible();
    const breadcrumbs = page.getByTestId('location-breadcrumbs');
    await expect(breadcrumbs).toContainText('Home');
    await expect(breadcrumbs).toContainText('Communities by City');
    // TASK-491 — the hub intro resolves through the EN dictionary.
    const enIntro = page.getByTestId('location-intro');
    await expect(enIntro).toContainText(
      'Every country, region, city, community type, and event idea on the network',
    );

    // Toggle to German through the header switcher (URL-only locale: no
    // cookie, navigates to the /de/** surface — TASK-468).
    const headerSwitcher = page.getByTestId('language-switcher-header');
    await headerSwitcher.getByTestId('language-switcher-trigger').click();
    await headerSwitcher
      .getByTestId('language-switcher-listbox')
      .getByRole('option', { name: /Deutsch/ })
      .click();

    await expect(page).toHaveURL(/\/de\/location(?:\/|$)/, { timeout: 15_000 });
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');

    // TASK-477: the h1 resolves through seoContent.breadcrumb.hub (German),
    // the presence claim city via seoContent.location.hubEntity, and the
    // home/hub breadcrumb crumbs through the active dictionary.
    await expect(page.locator('h1')).toContainText('Communities nach Stadt', {
      timeout: 15_000,
    });
    await expect(page.getByText('Community in deiner Stadt finden oder gründen')).toBeVisible();
    // TASK-491 — the hub intro + hero lead re-translate on the de surface.
    await expect(page.getByTestId('location-intro')).toContainText(
      'Jedes Land, jede Region, jede Stadt, jeder Community-Typ und jede Veranstaltungsidee im Netzwerk',
    );
    const deBreadcrumbs = page.getByTestId('location-breadcrumbs');
    await expect(deBreadcrumbs).toContainText('Startseite');
    await expect(deBreadcrumbs).toContainText('Communities nach Stadt');
    // No stale EN chrome on the toggled surface.
    await expect(page.getByText('Find or start a community in your city')).toHaveCount(0);
    await expect(deBreadcrumbs.getByText('Home')).toHaveCount(0);
    // URL-only contract (TASK-468): the toggle writes no locale cookie.
    expect(await page.evaluate(() => document.cookie)).not.toContain('joinorigin_locale');
  });

  test('switching /de/location → en restores the English h1, claim, and breadcrumbs', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto('/de/location');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await expect(page.locator('h1')).toContainText('Communities nach Stadt');
    await expect(page.getByText('Community in deiner Stadt finden oder gründen')).toBeVisible();
    await expect(page.getByTestId('location-intro')).toContainText(
      'Jedes Land, jede Region, jede Stadt, jeder Community-Typ und jede Veranstaltungsidee im Netzwerk',
    );

    const footerSwitcher = page.getByTestId('language-switcher-footer');
    await footerSwitcher.getByTestId('language-switcher-trigger').click();
    await footerSwitcher
      .getByTestId('language-switcher-listbox')
      .getByRole('option', { name: /English/ })
      .click();

    await expect(page).toHaveURL(/\/en\/location(?:\/|$)/, { timeout: 15_000 });
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText('Communities by City', { timeout: 15_000 });
    await expect(page.getByText('Find or start a community in your city')).toBeVisible();
    await expect(page.getByTestId('location-intro')).toContainText(
      'Every country, region, city, community type, and event idea on the network',
    );
    const enBreadcrumbs = page.getByTestId('location-breadcrumbs');
    await expect(enBreadcrumbs).toContainText('Home');
    await expect(enBreadcrumbs).toContainText('Communities by City');
    expect(await page.evaluate(() => document.cookie)).not.toContain('joinorigin_locale');
  });
});

/**
 * Nav-only locale switch (TASK-488/TASK-493, Sprint 21 Story D).
 *
 * Selecting a language is NAVIGATION ONLY: `LanguageSwitcher.select()` pushes
 * the locale-prefixed version of the current path (`router.push` to
 * `/<locale>/<path>`) — there is no `setLocale` pre-toggle and no in-place
 * remount, so no two-step toggle-then-reload behavior is observable. The
 * active locale derives from the URL prefix at provider render time
 * (`LocalePathnameSync`), so the target route renders in the selected
 * language on arrival, with no post-flash.
 *
 * Observable contract asserted here:
 *  - final URL = `/<locale>/<path>` (path preserved, locale prefix swapped),
 *  - `<html lang>` = target locale,
 *  - translated chrome renders (hero h1 + body copy from the active
 *    dictionary),
 *  - NO full page `load` event fires during the switch (a single client-side
 *    navigation — a toggle-then-reload implementation would reload the
 *    document and emit a `load`),
 *  - no `joinorigin_locale` cookie is ever written (URL-only, TASK-468).
 */
test.describe('nav-only locale switch (TASK-488)', () => {
  test('switching /en/features → /de/features is a single client-side navigation: final URL + lang + translated chrome', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });

    // Count full-document loads: the initial `goto` fires one `load`; a
    // nav-only `router.push` switch must NOT fire another (no reload).
    let loads = 0;
    page.on('load', () => {
      loads += 1;
    });

    await page.goto('/en/features');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText('Everything a community needs');
    expect(loads).toBe(1);

    const headerSwitcher = page.getByTestId('language-switcher-header');
    await headerSwitcher.getByTestId('language-switcher-trigger').click();
    await headerSwitcher
      .getByTestId('language-switcher-listbox')
      .getByRole('option', { name: /Deutsch/ })
      .click();

    // The switch navigates directly to the locale-prefixed path.
    await expect(page).toHaveURL(/\/de\/features(?:\/|$)/, { timeout: 15_000 });
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    // Translated chrome renders on the de surface.
    await expect(page.locator('h1')).toContainText('Alles, was eine Community braucht', {
      timeout: 15_000,
    });
    // No two-step toggle-then-reload: the switch is a single client-side
    // navigation — no additional full `load` event fired.
    expect(loads).toBe(1);
    // URL-only contract (TASK-468): no locale cookie is ever written.
    expect(await page.evaluate(() => document.cookie)).not.toContain('joinorigin_locale');
  });

  test('switching a deep path preserves the path under the new locale prefix (nav-only)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto('/en/location/germany/berlin/berlin');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    const footerSwitcher = page.getByTestId('language-switcher-footer');
    await footerSwitcher.getByTestId('language-switcher-trigger').click();
    await footerSwitcher
      .getByTestId('language-switcher-listbox')
      .getByRole('option', { name: /Deutsch/ })
      .click();

    // The full path is preserved; only the locale prefix swaps — the
    // navigation lands on /de/<same-path> (TASK-488).
    await expect(page).toHaveURL(/\/de\/location\/germany\/berlin\/berlin(?:\/|$)/, {
      timeout: 15_000,
    });
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    // The committed de Berlin body copy renders on arrival.
    await expect(page.getByText(/Berlin ist eine Stadt, die von Communities lebt/)).toBeVisible();
    expect(await page.evaluate(() => document.cookie)).not.toContain('joinorigin_locale');
  });
});
