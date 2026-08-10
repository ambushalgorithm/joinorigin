import { expect, test } from '@playwright/test';

/**
 * Modal a11y — focus return on close (spec §9.2).
 *
 * Spec: "focus moves to modal on open, returns to trigger on close".
 * Previously tracked as a KNOWN GAP via `test.fail()` (TASK-205): focus moved to
 * the name input on open and Tab was trapped, but after closing via ESC / ✕ /
 * backdrop / Done focus was NOT restored to the trigger — the active element
 * fell back to the page BODY.
 *
 * Fixed by TASK-207 (fe-fix-a11y-focus): `WaitlistModalProvider` records the
 * trigger element on open and passes it to `WaitlistModal`, which restores
 * focus to it on every close path. The `test.fail()` marker is removed — this
 * assertion is now a required check.
 */

test('a11y: focus returns to the trigger when the waitlist modal closes', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByTestId('start-project-button');
  await trigger.click();
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  await expect(modal.getByTestId('waitlist-name-input')).toBeFocused();

  // Close via ESC — focus must return to the trigger.
  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
  await expect(trigger).toBeFocused();
});
