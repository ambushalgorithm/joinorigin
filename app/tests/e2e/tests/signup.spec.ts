import { expect, test } from '@playwright/test';

import { leadsCsvHasEmail, waitForHydration } from './helpers';

/**
 * Sprint 24 signup page + CTA-routing e2e coverage (TASK-559).
 *
 * The waitlist modal is retired (TASK-556): every join CTA is now a real
 * anchor to the locale-prefixed `/signup` route with the unified "Get
 * Started" label, and the signup page (TASK-555) swaps SSR-clean signup copy
 * → JS-only "Join the waitlist" + in-development disclosure after hydration.
 *
 * Covered contracts:
 *  1. SSR contract — the initial/no-JS HTML is a clean, indexable
 *     signup/login screen (heading "Create your account", semantic name +
 *     email form, submit "Get Started") with NO waitlist or in-development
 *     language in the visible copy;
 *  2. hydration swap — heading/subcopy swap to the waitlist variants and
 *     the in-development disclosure appears (the ONLY development-status
 *     surface on the site);
 *  3. form validation + submit → POST /api/leads → success + CSV row;
 *  4. every join CTA (header desktop + mobile, hero start-project, hero-join,
 *     CTA band, footer, location band, guide join) → `/<locale>/signup` with
 *     the unified "Get Started" label;
 *  5. the waitlist modal no longer mounts anywhere (no `role=dialog`, no
 *     waitlist testIDs, no `data-open-waitlist` listener);
 *  6. count-up SSR — no-JS static HTML renders the FINAL figures (2,400+ /
 *     484) instead of "0+" placeholders (G-5).
 */

const SIGNUP_TITLE = 'Sign Up — Create Your Account | JoinOrigin';

test.describe('signup page — SSR clean copy (TASK-555/559)', () => {
  test('no-JS served HTML is a clean signup/login screen with no waitlist or in-development copy', async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto('/en/signup');
    await expect(page).toHaveTitle(SIGNUP_TITLE);

    const body = (await page.locator('body').innerText()).toLowerCase();
    // Clean, indexable signup copy — heading + Get Started submit.
    expect(body).toContain('create your account');
    expect(body).toContain('get discovered on origin');
    expect(body).toContain('get started');
    // The semantic name/email form is present in the static markup.
    await expect(page.getByTestId('signup-name-input')).toBeVisible();
    await expect(page.getByTestId('signup-email-input')).toBeVisible();
    await expect(page.getByTestId('signup-name-input')).toHaveAttribute('autocomplete', 'name');
    await expect(page.getByTestId('signup-email-input')).toHaveAttribute('autocomplete', 'email');
    // No waitlist language, no in-development disclosure in the static HTML.
    expect(body).not.toContain('join the waitlist');
    expect(body).not.toContain('in development');
    expect(body).not.toContain("it's your turn");
    await expect(page.getByTestId('signup-disclosure')).toHaveCount(0);

    await context.close();
  });

  test('after hydration the heading swaps to "Join the waitlist" and the disclosure appears', async ({
    page,
  }) => {
    await page.goto('/en/signup');

    // The JS-only swap: heading/subcopy flip to the waitlist variants.
    await expect(page.getByTestId('signup-heading')).toHaveText('Join the waitlist', {
      timeout: 15_000,
    });
    await expect(page.getByTestId('signup-subcopy')).toContainText(
      "We'll email you when your Origin is ready.",
    );
    // The in-development disclosure is revealed — the only dev-status surface.
    await expect(page.getByTestId('signup-disclosure')).toContainText('Origin is in development.');
    // The form itself stays a semantic Get Started form.
    await expect(page.getByTestId('signup-submit')).toHaveText('Get Started');
  });
});

test.describe('signup page — form validation + submit (TASK-555/559)', () => {
  test('blocks an empty submit with inline field errors (no network call)', async ({ page }) => {
    await page.goto('/en/signup');
    await page.getByTestId('signup-submit').click();

    await expect(page.getByText('Name is required.')).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText('Enter a valid email address.')).toBeVisible();
  });

  test('submits name + email → success state + CSV row', async ({ page }) => {
    const email = `signup.${Date.now()}@example.com`;
    await page.goto('/en/signup');
    // The disclosure only renders after the JS-only hydration swap — a
    // reliable signal that React is interactive before we fill the form.
    await expect(page.getByTestId('signup-disclosure')).toBeVisible({ timeout: 15_000 });

    await page.getByTestId('signup-name-input').fill('Ada Lovelace');
    await page.getByTestId('signup-email-input').fill(email);
    await page.getByTestId('signup-submit').click();

    // Success state replaces the form.
    await expect(page.getByText("You're on the list!")).toBeVisible({ timeout: 15_000 });
    // CSV row was appended (lowercased email).
    expect(leadsCsvHasEmail(email)).toBe(true);

    await page.getByTestId('signup-done').click();
    await expect(page.getByTestId('signup-form')).toBeVisible();
  });
});

test.describe('every join CTA → /<locale>/signup with "Get Started" (TASK-556/559)', () => {
  test('home page CTAs (header, hero, footer) navigate to /en/signup with label Get Started', async ({
    page,
  }) => {
    await page.goto('/en');
    await waitForHydration(page);

    const directCtas = [
      { testID: 'get-started-button' }, // header
      { testID: 'start-project-button' }, // hero left
      { testID: 'footer-waitlist-button' }, // footer (testID kept, label now Get Started)
    ];
    for (const { testID } of directCtas) {
      const cta = page.getByTestId(testID);
      await expect(cta).toBeVisible();
      await expect(cta).toHaveText('Get Started');
      // RotatingBorderButton renders the testID on the anchor itself.
      await expect(cta).toHaveAttribute('href', '/en/signup');
    }

    // Clicking the hero CTA actually navigates to the signup page.
    await page.getByTestId('start-project-button').click();
    await page.waitForURL('**/en/signup');
    await expect(page.getByTestId('signup-panel')).toBeVisible();
  });

  test('hero-join variant and CTA band buttons route to /en/signup with Get Started', async ({
    page,
  }) => {
    // Menu pages render the hero-join CTA (waitlist variant) + the shell's
    // CTA band as the last section.
    await page.goto('/en/features');
    const heroJoin = page.getByTestId('hero-join-button');
    await expect(heroJoin).toBeVisible();
    await expect(heroJoin).toHaveText('Get Started');
    await expect(heroJoin).toHaveAttribute('href', '/en/signup');

    const bandCta = page.getByTestId('cta-band-join-button');
    await expect(bandCta).toBeVisible();
    await expect(bandCta).toHaveText('Get Started');
    await expect(bandCta).toHaveAttribute('href', '/en/signup');

    // Legal pages keep the contact variant — a link to /contact, never signup.
    await page.goto('/en/privacy');
    await expect(page.getByTestId('hero-contact-link')).toHaveAttribute('href', '/en/contact');
    await expect(page.getByTestId('hero-join-button')).toHaveCount(0);
  });

  test('mobile header Get Started routes to /en/signup', async ({ page }) => {
    await page.setViewportSize({ width: 700, height: 800 });
    await page.goto('/en');

    await page.getByTestId('mobile-menu-toggle').click();
    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();
    const mobileCta = menu.getByTestId('mobile-get-started-button');
    await expect(mobileCta).toHaveText('Get Started');
    await expect(mobileCta).toHaveAttribute('href', '/en/signup');

    await mobileCta.click();
    await page.waitForURL('**/en/signup');
    await expect(page.getByTestId('signup-panel')).toBeVisible();
  });

  test('location CTA band button routes to the locale-prefixed signup', async ({ page }) => {
    await page.goto('/en/location/germany/berlin/berlin');
    const locationCta = page.getByTestId('location-cta-join-button');
    await expect(locationCta).toBeVisible();
    await expect(locationCta).toHaveAttribute('href', '/en/signup');
  });

  test('guide join CTA routes to the locale-prefixed signup', async ({ page }) => {
    await page.goto('/en/guides/start-an-origin');
    const guideCta = page.getByTestId('guide-join-button');
    await expect(guideCta).toBeVisible();
    // The guide CTA is a button inside a wrapping Next.js Link anchor.
    const href = await guideCta.evaluate((el) => el.closest('a')?.getAttribute('href'));
    expect(href).toBe('/en/signup');
  });
});

test.describe('waitlist modal retired (TASK-556/559)', () => {
  test('no dialog mounts and no waitlist modal testIDs exist on the home page', async ({
    page,
  }) => {
    await page.goto('/en');
    await waitForHydration(page);

    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.getByTestId('waitlist-name-input')).toHaveCount(0);
    await expect(page.getByTestId('waitlist-submit')).toHaveCount(0);
    await expect(page.getByTestId('waitlist-modal-close')).toHaveCount(0);
  });

  test('data-open-waitlist triggers no modal (the listener is retired)', async ({ page }) => {
    await page.goto('/en');
    await waitForHydration(page);

    await page.evaluate(() => {
      const el = document.createElement('button');
      el.id = 'future-cta';
      el.setAttribute('data-open-waitlist', '');
      el.textContent = 'Future CTA';
      document.body.appendChild(el);
    });
    await page.locator('#future-cta').click();
    await page.waitForTimeout(500);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    // The URL must not have changed (no navigation, no modal).
    expect(new URL(page.url()).pathname).toBe('/en');
  });
});

test.describe('count-up SSR — final statics, no 0+ placeholders (G-5, TASK-558/559)', () => {
  test('home page no-JS HTML renders 2,400+ Members (never 0+)', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/en');
    await expect(page.getByTestId('orbit-hub')).toContainText('Members');
    const body = await page.locator('body').innerText();
    expect(body).toContain('2,400+');
    // `\b` avoids matching the trailing "0+" inside "2,400+ Members".
    expect(body).not.toMatch(/\b0\+\s*Members/);
    await context.close();
  });

  test('location hub no-JS HTML renders 484 Places and Origins (never 0)', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/en/location');
    const banner = page.getByTestId('location-inventory-banner');
    await expect(banner).toBeVisible();
    const text = await banner.innerText();
    expect(text).toContain('484');
    expect(text).toContain('Places and Origins');
    expect(text).not.toMatch(/^0\s/);
    await context.close();
  });
});
