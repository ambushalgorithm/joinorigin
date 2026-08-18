import { test, expect } from '@playwright/test';

import { leadsCsvRow, waitForHydration } from './helpers';

/**
 * JoinOrigin homescreen e2e coverage (Sprint 3).
 *
 * The typewriter re-types on mount (400ms delay + 20ms/char ≈ 2.5s total),
 * so assertions on the final heading wait for it to complete. The waitlist
 * modal flow posts to the real dev server (`POST /api/leads`), which appends
 * to `apps/web/data/leads.csv` — acceptable for the sprint-scope CSV.
 *
 * Story 3 (Expanded Signup): the browser-driven submission is asserted to
 * produce an expanded-schema CSV row carrying the passive server-side capture
 * fields (timestamp, ip, locale, userAgent, referrer) alongside name/email.
 */

test('homepage renders the header, hero, ticker and footer', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('header')).toBeVisible();
  await expect(page.getByTestId('header').getByText('Features')).toBeVisible();
  await expect(page.getByText('Log In')).toBeVisible();
  await expect(page.getByTestId('get-started-button')).toBeVisible();

  // Hero left: typewriter heading completes to the full two-tone copy.
  await expect(page.locator('h1')).toContainText(
    'Ideas, projects and community collaboration space — where new and existing teams find their Origin.',
    {
      timeout: 15_000,
    },
  );
  await expect(page.getByTestId('start-project-button')).toBeVisible();

  // Hero right: orbit visualization + count-up hub.
  await expect(page.getByTestId('orbit-viz')).toBeVisible();
  await expect(page.getByTestId('orbit-hub')).toContainText('Members');

  // Logo ticker + footer.
  await expect(page.getByText('Trusted by teams at')).toBeVisible();
  await expect(page.getByText('Where teams find their origin')).toBeVisible();
  await expect(page.getByTestId('footer-waitlist-button')).toBeVisible();
  await expect(page.getByText('© 2026 JoinOrigin')).toBeVisible();
});

test('any CTA opens the waitlist modal and submission reaches the CSV API', async ({ page }) => {
  await page.goto('/');
  await waitForHydration(page);

  const email = `home.${Date.now()}@example.com`;

  // Open from the hero Start Project button (any-button contract).
  await page.getByTestId('start-project-button').click();
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  await expect(modal).toContainText('Join the waitlist');

  // Submit name + email → success state.
  await modal.getByTestId('waitlist-name-input').fill('Ada Lovelace');
  await modal.getByTestId('waitlist-email-input').fill(email);
  await modal.getByTestId('waitlist-submit').click();

  await expect(modal).toContainText("You're on the list!", { timeout: 15_000 });
  await modal.getByTestId('waitlist-done').click();
  await expect(modal).not.toBeVisible();

  // Story 3: the row is captured with the expanded schema and passive fields.
  const row = leadsCsvRow(email);
  expect(row).toBeDefined();
  expect(row).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z,Ada Lovelace,/);
  expect(row).toContain(email.toLowerCase());
  // Browser-supplied passive fields are present (raw IP, resolved locale,
  // user agent, referrer = the home page URL).
  expect(row).toContain('http://127.0.0.1:3100/');
});

test('waitlist modal validates bad input with inline field errors', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('get-started-button').click();
  const modal = page.getByRole('dialog');

  // Client submits; server responds 400 with the email field error.
  // (A valid name is required first so the email rule is what fires.)
  await modal.getByTestId('waitlist-name-input').fill('Ada Lovelace');
  await modal.getByTestId('waitlist-email-input').fill('not-an-email');
  await modal.getByTestId('waitlist-submit').click();

  await expect(modal.getByText('Enter a valid email address.')).toBeVisible({
    timeout: 15_000,
  });
});
