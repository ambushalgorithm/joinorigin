import fs from 'node:fs';
import path from 'node:path';

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
