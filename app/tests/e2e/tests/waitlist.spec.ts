import { expect, test } from '@playwright/test';

import { leadsCsvHasEmail, waitForHydration } from './helpers';

/**
 * Any-button waitlist modal coverage (spec §9).
 *
 * Verifies the trigger contract ("any button" — header Get Started, hero Start
 * Project, footer Get discovered, and future-proof `data-open-waitlist`),
 * modal a11y/behaviors (focus, ESC, backdrop, ✕, reset, focus trap), the
 * success state, inline validation errors, and the CSV capture flow.
 */

test.describe('any-button modal trigger contract (§9.1)', () => {
  test('opens the same modal from every page CTA', async ({ page }) => {
    await page.goto('/');

    const triggers = [
      page.getByTestId('get-started-button'),
      page.getByTestId('start-project-button'),
      page.getByTestId('footer-waitlist-button'),
    ];

    for (const trigger of triggers) {
      await trigger.click();
      const modal = page.getByRole('dialog');
      await expect(modal).toBeVisible();
      await expect(modal).toContainText('Join the waitlist');
      await page.keyboard.press('Escape');
      await expect(modal).toBeHidden();
    }
  });

  test('opens from any element carrying data-open-waitlist (future-proof)', async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() => {
      const el = document.createElement('button');
      el.id = 'future-cta';
      el.setAttribute('data-open-waitlist', '');
      el.textContent = 'Future CTA';
      document.body.appendChild(el);
    });

    await page.locator('#future-cta').click();
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Join the waitlist');
  });
});

test.describe('modal a11y & behaviors (§9.2)', () => {
  test('moves focus to the first field and traps Tab within the dialog', async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);
    await page.getByTestId('start-project-button').click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveAttribute('aria-modal', 'true');

    // Focus moves to the name input on open.
    await expect(modal.getByTestId('waitlist-name-input')).toBeFocused();

    // Tab through several times; focus never leaves the card.
    for (let i = 0; i < 6; i += 1) {
      await page.keyboard.press('Tab');
      const inside = await modal.evaluate((card) => card.contains(document.activeElement));
      expect(inside).toBe(true);
    }
  });

  test('closes on ESC, backdrop click, and the ✕ button', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('start-project-button').click();
    const modal = page.getByRole('dialog');

    // ESC
    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();

    // Backdrop click (click outside the card).
    await page.getByTestId('start-project-button').click();
    await expect(modal).toBeVisible();
    await page.mouse.click(10, 10);
    await expect(modal).toBeHidden();

    // ✕ button
    await page.getByTestId('start-project-button').click();
    await expect(modal).toBeVisible();
    await page.getByTestId('waitlist-modal-close').click();
    await expect(modal).toBeHidden();
  });

  test('resets the form to idle on every open', async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);
    await page.getByTestId('start-project-button').click();
    const modal = page.getByRole('dialog');

    await modal.getByTestId('waitlist-name-input').fill('Ada Lovelace');
    await modal.getByTestId('waitlist-email-input').fill('ada.reset@example.com');
    await page.keyboard.press('Escape');

    await page.getByTestId('start-project-button').click();
    await expect(modal.getByTestId('waitlist-name-input')).toHaveValue('');
    await expect(modal.getByTestId('waitlist-email-input')).toHaveValue('');
  });
});

test.describe('CSV capture flow (§9.3)', () => {
  test('submitting name + email appends a row to leads.csv and shows success', async ({ page }) => {
    const email = `e2e.${Date.now()}@example.com`;

    await page.goto('/');
    await waitForHydration(page);
    await page.getByTestId('start-project-button').click();
    const modal = page.getByRole('dialog');

    await modal.getByTestId('waitlist-name-input').fill('E2E Tester');
    await modal.getByTestId('waitlist-email-input').fill(email);
    await modal.getByTestId('waitlist-submit').click();

    // Success state replaces the form.
    await expect(modal).toContainText("You're on the list!", { timeout: 15_000 });

    // CSV row was appended (lowercased email, RFC 4180 row).
    expect(leadsCsvHasEmail(email)).toBe(true);

    await modal.getByTestId('waitlist-done').click();
    await expect(modal).toBeHidden();
  });

  test('surfaces inline field errors from the API without closing', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('footer-waitlist-button').click();
    const modal = page.getByRole('dialog');

    // Empty name + invalid email → the name rule fires first.
    await modal.getByTestId('waitlist-name-input').fill('');
    await modal.getByTestId('waitlist-email-input').fill('not-an-email');
    await modal.getByTestId('waitlist-submit').click();

    await expect(modal.getByText('Name is required.')).toBeVisible({ timeout: 15_000 });
    await expect(modal).toBeVisible();
  });
});
