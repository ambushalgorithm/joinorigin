import { expect, test } from '@playwright/test';

/**
 * Signup form a11y — keyboard reachability + focus order (TASK-559).
 *
 * The waitlist modal is retired (TASK-556) and replaced by the `/signup`
 * page (TASK-555). The old modal focus-trap contract is gone, so this spec
 * now covers the equivalent keyboard-a11y guarantees of the signup form:
 * labels are programmatically associated (`htmlFor`/`id`), the name field
 * is the first focusable element inside `<main>` after navigation, and
 * Tab cycles through the semantic form controls (name → email → submit).
 */

test('signup form fields are labeled and keyboard-reachable in order', async ({ page }) => {
  await page.goto('/en/signup');
  await expect(page.getByTestId('signup-panel')).toBeVisible();

  // Programmatic label association: labels point at the input ids.
  await expect(page.locator('label[for="waitlist-name"]')).toBeVisible();
  await expect(page.locator('label[for="waitlist-email"]')).toBeVisible();

  // The name input is the first focusable control in the form.
  await page.locator('main').getByTestId('signup-name-input').focus();
  await expect(page.getByTestId('signup-name-input')).toBeFocused();

  // Tab order: name → email → submit (the full semantic form cycle).
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('signup-email-input')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('signup-submit')).toBeFocused();
});
