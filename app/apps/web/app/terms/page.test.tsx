import { screen, render } from '@testing-library/react';

import { I18nProvider, _resetI18nForTests, getDictionary, type Locale } from '@joinorigin/i18n';

import TermsPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

/**
 * Unit tests for the /terms page (discovery §5.9): metadata export per the
 * arch pattern + plain-English legal content. BreadcrumbList only.
 */

describe('terms page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe('Terms of Service | JoinOrigin');
    expect(metadata.description).toContain('terms of service');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/terms');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/terms');
    expect(metadata.keywords).toEqual(['JoinOrigin terms of service']);
  });

  it('renders a single h1 and plain-English terms sections', () => {
    renderWithI18n(<TermsPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Terms of Service');
    // Section titles also appear in the sticky anchor nav (Sprint 10) —
    // assert at least one render of each.
    for (const title of [
      'Acceptance',
      'Accounts',
      'User content',
      'Acceptable use',
      'Intellectual property',
      'Disclaimers',
      'Changes',
    ]) {
      expect(screen.getAllByText(title).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('emits BreadcrumbList JSON-LD only', () => {
    renderWithI18n(<TermsPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    expect(payloads).toHaveLength(1);
    expect(payloads[0]['@type']).toBe('BreadcrumbList');
  });
});

/**
 * TASK-460 — the terms view renders the contact-body internal link through
 * the shared locale-aware path helper per the confirmed prefix table.
 * `useLocalizePath` reads the router pathname + active i18n locale, so this
 * suite overrides the `next/navigation` mock with a mutable `mockPathname`.
 * External `mailto:` hrefs pass through untouched; the hero CTA href is
 * localized by `MenuHero` (chrome), which is covered by the fe-locale-links
 * suite.
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => mockPathname,
}));

function renderTermsForLocale(locale: Locale) {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <TermsPage />
    </I18nProvider>,
  );
}

describe('terms view — locale-aware internal links (TASK-460)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/';
  });

  /** Finds a link with the exact href (Trans link text is locale-dependent). */
  function linkByHref(href: string) {
    return screen.getAllByRole('link').find((link) => link.getAttribute('href') === href);
  }

  it('renders the /en/** contact-body link + mailto untouched on an unprefixed EN load (all-routes-prefixed)', () => {
    mockPathname = '/terms';
    renderTermsForLocale('en');
    expect(linkByHref('/en/contact')).toBeDefined();
    expect(screen.getByRole('link', { name: 'hello@joinorigin.co' })).toHaveAttribute(
      'href',
      'mailto:hello@joinorigin.co',
    );
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', () => {
    mockPathname = '/en/terms';
    renderTermsForLocale('en');
    expect(linkByHref('/en/contact')).toBeDefined();
  });

  it('renders /de/** contact-body link on a /de/** load (table row 3)', () => {
    mockPathname = '/de/terms';
    renderTermsForLocale('de');
    expect(linkByHref('/de/contact')).toBeDefined();
  });

  it('renders /de/** contact-body link on an unprefixed path with an active de locale (URL-driven)', () => {
    mockPathname = '/terms';
    renderTermsForLocale('de');
    expect(linkByHref('/de/contact')).toBeDefined();
  });
});
