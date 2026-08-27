import { screen } from '@testing-library/react';

import SignupPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

/**
 * Unit tests for the /signup page (TASK-555): metadata export per the arch
 * pattern + server wrapper contract.
 *
 * SSR contract: `app/signup/page.tsx` is the hand-written canonical EN
 * wrapper — `createMetadata` (title/description/keywords), the server-
 * rendered `BreadcrumbList` JSON-LD, and the shared `<SignupView />`. The
 * initial SSR HTML itself (clean copy, no waitlist/in-development language)
 * is asserted in `signup-view.test.tsx` via `renderToString`.
 */

describe('signup page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe('Sign Up — Create Your Account | JoinOrigin');
    expect(metadata.description).toContain('start an Origin around your idea');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/signup');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/signup');
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['sign up', 'create account', 'join Origin']),
    );
  });

  it('renders the shared signup view with a single h1', () => {
    renderWithI18n(<SignupPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    // After hydration the view swaps to the waitlist heading (the SSR clean
    // copy is asserted in signup-view.test.tsx).
    expect(headings[0]).toHaveTextContent('Join the waitlist');
  });

  it('emits the BreadcrumbList JSON-LD for Home → Signup', () => {
    renderWithI18n(<SignupPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const breadcrumb = payloads.find((payload) => payload['@type'] === 'BreadcrumbList');
    expect(breadcrumb).toBeDefined();
    expect(breadcrumb.itemListElement).toEqual([
      expect.objectContaining({ name: 'Home' }),
      expect.objectContaining({ name: 'Signup' }),
    ]);
  });
});
