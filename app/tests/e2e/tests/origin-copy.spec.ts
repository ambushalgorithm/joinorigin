import { expect, test } from '@playwright/test';

/**
 * Sprint 24 Wave-2 — Origin-repositioning copy validation gate (TASK-568).
 *
 * Runs against the production build (`next start`) and verifies the PM-approved
 * Origin repositioning renders on every required surface:
 *
 *  1. Homepage hero shows the approved headline with the brand word "Origin"
 *     as the two-tone gradient accent across EN + sampled locales (en, de, es,
 *     ko — the accent fragment must START with the brand word "Origin");
 *  2. Home definition + FAQ q1–q5 are Origin-first with NO "community" in the
 *     leads (the marketing-lead carve-out rule from the reframe deck);
 *  3. CTA band headline — "Start an Origin. Find the people and resources to
 *     move it forward.";
 *  4. /features — the "Origins" core-object card + "Phase 1 — Origin
 *     Foundation" roadmap card;
 *  5. /community — reframed hero lead, values, and join copy;
 *  6. /glossary — reframed intro/why copy with the "Origin" term;
 *  7. Signup subcopy — "Get discovered on Origin — ...";
 *  8. Home <title> — "Origin — Social Collaboration Network & Community OS";
 *  9. Footer/tagline strip — still "Where teams find their Origin".
 *
 * The exhaustive metadata/hreflang assertions live in seo.spec.ts; this spec
 * pins the visible copy contracts. Serial mode keeps the shared prod server
 * stable (repo convention for multi-page specs).
 */
test.describe.configure({ mode: 'serial' });

/** Sampled locales for the hero accent (EN + one per script family). */
const ACCENT_LOCALES = ['en', 'de', 'es', 'ko'] as const;

/** Localized headline suffixes — every approved headline ends on the brand
 *  word so the two-tone accent works across locales (deck hard constraint). */
const EXPECTED_HEADLINE_SUFFIXES: Record<(typeof ACCENT_LOCALES)[number], string> = {
  en: '— Origin.',
  de: '— Origin.',
  es: '— Origin.',
  ko: '— Origin.',
};

test.describe('homepage hero — approved headline + Origin accent (TASK-568)', () => {
  for (const locale of ACCENT_LOCALES) {
    test(`${locale} renders the approved Origin headline with the accent starting at Origin`, async ({
      page,
    }) => {
      const path = locale === 'en' ? '/en' : `/${locale}`;
      await page.goto(path);

      // The typewriter re-types on mount; wait for the full localized headline.
      await expect(page.locator('h1')).toContainText(EXPECTED_HEADLINE_SUFFIXES[locale], {
        timeout: 15_000,
      });

      // Two-tone split: Body span + Accent span + Caret span once complete.
      await expect
        .poll(async () => page.locator('h1 span').count(), { timeout: 10_000 })
        .toBeGreaterThanOrEqual(3);

      // The gradient accent fragment starts with the brand word "Origin".
      // Polled: the typewriter completes its final pass before the split
      // settles, so the accent text is read only once stable.
      await expect
        .poll(async () => page.locator('h1 span').nth(1).textContent(), { timeout: 10_000 })
        .toMatch(/^Origin[.\u3002]?$/);
    });
  }

  test('EN headline is exactly the approved copy', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('h1')).toContainText(
      'Where every idea, startup, and project finds the people and resources to move it forward — Origin.',
      { timeout: 15_000 },
    );
  });
});

test.describe('home definition + FAQ q1–q5 — Origin-first, no community in leads (TASK-568)', () => {
  test('definition paragraph is Origin-first', async ({ page }) => {
    await page.goto('/en');
    const mainText = ((await page.locator('main').textContent()) ?? '').toLowerCase();
    expect(mainText).toContain('origin is the space you start around a goal');
    expect(mainText).toContain('bring the people and resources it needs');
  });

  test('FAQ q1–q5 render Origin-first questions/answers with NO community in the leads', async ({
    page,
  }) => {
    await page.goto('/en');

    const faq = page.locator('section[aria-labelledby="home-faq-heading"]');
    await expect(faq).toBeVisible();

    // Exactly five FAQ items (q1–q5) — one answer paragraph per item (the
    // home FAQ renders questions as h2, answers as p).
    await expect(faq.locator('p')).toHaveCount(5);
    await expect(faq.locator('h2')).toHaveCount(6); // 1 heading + 5 questions

    // Every question + answer is Origin-first — the brand appears in each lead.
    const faqText = ((await faq.textContent()) ?? '').toLowerCase();
    expect(faqText).toContain('origin');

    // Zero "community" anywhere in the home FAQ leads (q1–q5 answers included).
    expect(faqText).not.toContain('community');
  });
});

test.describe('CTA band — approved headline (TASK-568)', () => {
  test('menu pages render "Start an Origin. Find the people and resources to move it forward."', async ({
    page,
  }) => {
    for (const path of ['/en/features', '/en/community']) {
      await page.goto(path);
      const band = page.getByTestId('cta-band');
      await expect(band).toBeVisible();
      await expect(band).toContainText(
        'Start an Origin. Find the people and resources to move it forward.',
      );
    }
  });
});

test.describe('/features — Origins card + Origin Foundation roadmap (TASK-568)', () => {
  test('renders the "Origins" core-object card', async ({ page }) => {
    await page.goto('/en/features');
    // common.objects.communities → "Origins" (decision B rename).
    const originsCard = page.getByRole('heading', { level: 3, name: 'Origins' });
    await expect(originsCard).toBeVisible();
    // The card body is Origin-first (the full-card link wraps h3 + p).
    await expect(
      page.getByText('The space you start around a goal', { exact: false }).first(),
    ).toBeVisible();
  });

  test('renders the "Phase 1 — Origin Foundation" roadmap card', async ({ page }) => {
    await page.goto('/en/features');
    await expect(
      page.getByRole('heading', { level: 3, name: 'Phase 1 — Origin Foundation' }),
    ).toBeVisible();
  });

  test('features hero lead is Origin-first with zero "community"', async ({ page }) => {
    await page.goto('/en/features');
    const mainText = ((await page.locator('main').textContent()) ?? '').toLowerCase();
    expect(mainText).toContain('everything an origin needs');
    // The marketing lead carve-out: no "community" in the features lead.
    expect(mainText).not.toContain('everything a community needs');
  });
});

test.describe('/community — reframed copy (TASK-568)', () => {
  test('hero lead, values, and join copy use Origin-first copy', async ({ page }) => {
    await page.goto('/en/community');
    const mainText = (await page.locator('main').textContent()) ?? '';
    // Hero lead — Origin is where people gather around goals.
    expect(mainText).toContain('Origin is where people gather around goals');
    // Values — "Origins are the center of engagement" (decision B rename).
    expect(mainText).toContain('Origins are the center of engagement');
    // Examples section renamed.
    expect(mainText).toContain('Example Origins');
    // Join copy — Origin-first.
    expect(mainText).toContain('Start an Origin, get discovered');
  });
});

test.describe('/glossary — reframed copy (TASK-568)', () => {
  test('intro/why copy is Origin-first and the community term renders as Origin', async ({
    page,
  }) => {
    await page.goto('/en/glossary');
    const mainText = (await page.locator('main').textContent()) ?? '';
    expect(mainText).toContain('The essential vocabulary of Origin');
    expect(mainText).toContain('An Origin glossary gives');
    // The reframed term: community → Origin (decision B), definition kept.
    expect(mainText).toContain('The space you start around a goal');
  });
});

test.describe('signup — Origin subcopy (TASK-568)', () => {
  test('hydrated subcopy reads "Get discovered on Origin — ..."', async ({ page }) => {
    await page.goto('/en/signup');
    await expect(page.getByTestId('signup-subcopy')).toContainText('Get discovered on Origin —', {
      timeout: 15_000,
    });
  });
});

test.describe('site title + tagline strip (TASK-568)', () => {
  test('home <title> is "Origin — Social Collaboration Network & Community OS"', async ({
    page,
  }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle('Origin — Social Collaboration Network & Community OS');
  });

  test('tagline strip and footer still carry "Where teams find their Origin"', async ({ page }) => {
    await page.goto('/en/features');
    await expect(page.getByTestId('tagline-strip')).toHaveText('Where teams find their Origin');
    await expect(page.getByTestId('footer')).toContainText('Where teams find their Origin');
  });
});
