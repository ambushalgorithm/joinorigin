import { test, expect } from '@playwright/test';

import { leadsCsvRow, waitForHydration } from './helpers';

/**
 * JoinOrigin homescreen e2e coverage (Sprint 3).
 *
 * The typewriter re-types on mount (400ms delay + 20ms/char ≈ 2.5s total),
 * so assertions on the final heading wait for it to complete. The signup
 * form posts to the real dev server (`POST /api/leads`), which appends
 * to `apps/web/data/leads.csv` — acceptable for the sprint-scope CSV.
 *
 * Story 3 (Expanded Signup): the browser-driven submission is asserted to
 * produce an expanded-schema CSV row carrying the passive server-side capture
 * fields (timestamp, ip, locale, userAgent, referrer) alongside name/email.
 *
 * Sprint 23 (Stories A + B): home e2e assertions for the non-interactive
 * Concepts tiles (Story A — no nav on click, no hover highlight) and the
 * geo-aware "Example communities" marquee whose chips are real links to the
 * mapped group-type variant pages (Story B). The deterministic committed-
 * content fallback (de surface + US visitor → New York city page) is covered
 * in `community.spec.ts` alongside the /community marquee.
 */

/** Per-chip EN targets for New York (locale-language default / US visitor)
 *  — mirrors `ChipMarqueeServer.test.tsx` so the live server honours the
 *  unit-tested resolver contract. */
const NEW_YORK_EN_TARGETS = [
  '/en/location/united-states/new-york/new-york/startup',
  '/en/location/united-states/new-york/new-york/small-business',
  '/en/location/united-states/new-york/new-york/meetup',
  '/en/location/united-states/new-york/new-york/meetup',
  '/en/location/united-states/new-york/new-york/meetup',
  '/en/location/united-states/new-york/new-york/meetup',
  '/en/location/united-states/new-york/new-york/ideas',
];

test('homepage renders the header, hero, ticker and footer', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('header')).toBeVisible();
  await expect(page.getByTestId('header').getByText('Features')).toBeVisible();
  await expect(page.getByText('Log In')).toBeVisible();
  await expect(page.getByTestId('get-started-button')).toBeVisible();

  // Hero left: typewriter heading completes to the full two-tone copy
  // (Sprint 24 Wave-2 Origin-repositioning headline, TASK-568).
  await expect(page.locator('h1')).toContainText(
    'Where every idea, startup, and project finds the people and resources to move it forward — Origin.',
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
  await expect(page.getByText('Where teams find their Origin')).toBeVisible();
  await expect(page.getByTestId('footer-waitlist-button')).toBeVisible();
  await expect(page.getByText('© 2026 JoinOrigin')).toBeVisible();
});

test('join CTAs navigate to the signup page and a submission reaches the CSV API', async ({
  page,
}) => {
  await page.goto('/');
  await waitForHydration(page);

  const email = `home.${Date.now()}@example.com`;

  // Sprint 24 (TASK-556): the hero Start Project CTA is a real anchor to the
  // locale-prefixed /signup route — the waitlist modal no longer opens.
  await page.getByTestId('start-project-button').click();
  await page.waitForURL('**/en/signup');
  await expect(page.getByTestId('signup-panel')).toBeVisible();
  await expect(page.getByTestId('signup-heading')).toHaveText('Join the waitlist', {
    timeout: 15_000,
  });

  // Submit name + email on the signup form → success state.
  await page.getByTestId('signup-name-input').fill('Ada Lovelace');
  await page.getByTestId('signup-email-input').fill(email);
  await page.getByTestId('signup-submit').click();

  await expect(page.getByText("You're on the list!", { exact: false })).toBeVisible({
    timeout: 15_000,
  });
  await page.getByTestId('signup-done').click();
  await expect(page.getByTestId('signup-form')).toBeVisible();

  // Story 3: the row is captured with the expanded schema and passive fields.
  const row = leadsCsvRow(email);
  expect(row).toBeDefined();
  expect(row).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z,Ada Lovelace,/);
  expect(row).toContain(email.toLowerCase());
  // Browser-supplied passive fields are present (raw IP, resolved locale,
  // user agent, referrer = the signup page URL).
  expect(row).toContain('http://127.0.0.1:3100/en/signup');
});

test('the signup form validates bad input with inline field errors', async ({ page }) => {
  await page.goto('/');
  await waitForHydration(page);

  await page.getByTestId('get-started-button').click();
  await page.waitForURL('**/en/signup');
  await expect(page.getByTestId('signup-panel')).toBeVisible();

  // Client submits; the form blocks with inline field errors (no dialog).
  await page.getByTestId('signup-name-input').fill('Ada Lovelace');
  await page.getByTestId('signup-email-input').fill('not-an-email');
  await page.getByTestId('signup-submit').click();

  await expect(page.getByText('Enter a valid email address.')).toBeVisible({
    timeout: 15_000,
  });
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('Story A — home Concepts tiles are non-interactive cards (no nav, no hover highlight)', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  // The #concepts anchor (deep link target from /docs) is preserved on the
  // section title even though the tiles themselves are no longer links.
  await expect(page.locator('#concepts')).toBeVisible();

  const conceptsSection = page.locator('section').filter({ has: page.locator('#concepts') });
  const cards = conceptsSection.locator('article');
  await expect(cards).toHaveCount(8);

  // Each tile is an informational article: exactly one h3 title + p body.
  for (let i = 0; i < 8; i += 1) {
    await expect(cards.nth(i).locator('h3')).toHaveCount(1);
    await expect(cards.nth(i).locator('p')).toHaveCount(1);
  }

  // No link wraps any tile — the Story D full-card links were replaced with
  // the Story A static Card surface (docs-page cards remain clickable).
  await expect(cards.locator('a[href]')).toHaveCount(0);

  // Clicking a tile must NOT navigate (URL stays on the home surface).
  const firstCard = cards.first();
  await firstCard.click({ position: { x: 4, y: 4 }, force: true });
  await page.waitForTimeout(500);
  expect(new URL(page.url()).pathname).toBe('/en');

  // No hover highlight: computed transform/border/box-shadow stay unchanged
  // (the static Card has no hover animation — only CardLink variants animate).
  const readCardStyle = (card: typeof firstCard) =>
    card.evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        transform: cs.transform,
        borderColor: cs.borderColor,
        boxShadow: cs.boxShadow,
      };
    });
  const styleBefore = await readCardStyle(firstCard);
  await firstCard.hover();
  const styleAfter = await readCardStyle(firstCard);
  expect(styleAfter).toEqual(styleBefore);
});

test('Story B — home Example Origins chips are links to the mapped group-type variant pages', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const marquee = page.getByTestId('chip-marquee');
  await expect(marquee).toBeVisible();

  // The animated track repeats the 7 chips 2×, every one a single wrapping
  // link to its OWN mapped group-type variant page (startupFounders→startup,
  // smallBusinesses→small-business, bookClubs|runClubs|peeWeeLeagues|
  // communityOrganizations→meetup, anyoneWithAnIdea→ideas).
  const trackHrefs = await marquee
    .locator('[aria-hidden="true"] a')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(trackHrefs).toEqual([...NEW_YORK_EN_TARGETS, ...NEW_YORK_EN_TARGETS]);

  // The sr-only list reads each Origin once as a link to its own target.
  const srHrefs = await marquee
    .locator('ul a')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(srHrefs).toEqual(NEW_YORK_EN_TARGETS);

  // Clicking a chip navigates to its mapped variant page (Story B clickable).
  await marquee.locator('[aria-hidden="true"] a').first().click();
  await page.waitForURL('**/en/location/united-states/new-york/new-york/startup');
  await expect(page.locator('h1')).toBeVisible();
});
