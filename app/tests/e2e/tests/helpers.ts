import fs from 'node:fs';
import path from 'node:path';

import type { Page } from '@playwright/test';

/**
 * Shared helpers for the JoinOrigin homescreen e2e suite (TASK-205).
 *
 * The dev server (started by `playwright.config.ts` with cwd `apps/web`) writes
 * submissions to `apps/web/data/leads.csv` (spec §9.3). These helpers read the
 * same file so tests can assert the CSV capture flow end-to-end.
 */

export const LEADS_CSV_PATH = path.resolve(__dirname, '../../../apps/web/data/leads.csv');

export function readLeadsCsv(): string {
  return fs.readFileSync(LEADS_CSV_PATH, 'utf8');
}

/** True when the CSV file contains a row with the given email (lowercased). */
export function leadsCsvHasEmail(email: string): boolean {
  return readLeadsCsv().includes(email.trim().toLowerCase());
}

/**
 * Waits for the client bundle to hydrate before clicking a CTA.
 *
 * The Sprint 10 follow-up adds GSAP to the landing bundle; GSAP entrance
 * tweens (which set inline `opacity` on `[data-hero]` wrappers) run only
 * AFTER React hydration. A click that lands before hydration is a no-op
 * (React's event delegation is not attached yet), so tests that click a CTA
 * as their FIRST action after `goto` must wait for this marker. The
 * `[data-hero="actions"]` wrapper receiving its GSAP inline style is a
 * reliable "React is running" signal (SSR markup has no inline opacity).
 */
export async function waitForHydration(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const marker = document.querySelector('[data-hero="actions"]');
    return marker instanceof HTMLElement && marker.style.opacity !== '';
  });
}
