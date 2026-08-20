import { screen, render } from '@testing-library/react';

import { I18nProvider, _resetI18nForTests, getDictionary, type Locale } from '@joinorigin/i18n';

import PrivacyPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

/**
 * Unit tests for the /privacy page (discovery §5.8): metadata export per the
 * arch pattern + plain-English legal content. BreadcrumbList only (no FAQ
 * spam — discovery §5.8).
 */

describe('privacy page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe('Privacy Policy | JoinOrigin');
    expect(metadata.description).toContain('privacy policy');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/privacy');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/privacy');
    expect(metadata.keywords).toEqual(['JoinOrigin privacy policy']);
  });

  it('renders a single h1 and plain-English privacy sections', () => {
    renderWithI18n(<PrivacyPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Privacy Policy');
    // Section titles also appear in the sticky anchor nav (Sprint 10) —
    // assert at least one render of each.
    expect(screen.getAllByText('What we collect').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Signup data')).toBeInTheDocument();
    expect(screen.getAllByText('Identity & flexibility').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Your rights').length).toBeGreaterThanOrEqual(1);
    // "Contact" appears as the page section title, the footer link, and the
    // anchor-nav link.
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  it('emits BreadcrumbList JSON-LD only', () => {
    renderWithI18n(<PrivacyPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    expect(payloads).toHaveLength(1);
    expect(payloads[0]['@type']).toBe('BreadcrumbList');
  });
});

/**
 * TASK-460 — the privacy view renders the contact-body internal link through
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

function renderPrivacyForLocale(locale: Locale) {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <PrivacyPage />
    </I18nProvider>,
  );
}

describe('privacy view — locale-aware internal links (TASK-460)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/';
  });

  /** Finds a link with the exact href (Trans link text is locale-dependent). */
  function linkByHref(href: string) {
    return screen.getAllByRole('link').find((link) => link.getAttribute('href') === href);
  }

  it('renders the /en/** contact-body link + mailto untouched on an unprefixed EN load (all-routes-prefixed)', () => {
    mockPathname = '/privacy';
    renderPrivacyForLocale('en');
    expect(linkByHref('/en/contact')).toBeDefined();
    expect(screen.getByRole('link', { name: 'hello@joinorigin.co' })).toHaveAttribute(
      'href',
      'mailto:hello@joinorigin.co',
    );
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', () => {
    mockPathname = '/en/privacy';
    renderPrivacyForLocale('en');
    expect(linkByHref('/en/contact')).toBeDefined();
  });

  it('renders /de/** contact-body link on a /de/** load (table row 3)', () => {
    mockPathname = '/de/privacy';
    renderPrivacyForLocale('de');
    expect(linkByHref('/de/contact')).toBeDefined();
  });

  it('renders /de/** contact-body link on an unprefixed path with an active de locale (URL-driven)', () => {
    mockPathname = '/privacy';
    renderPrivacyForLocale('de');
    expect(linkByHref('/de/contact')).toBeDefined();
  });
});
