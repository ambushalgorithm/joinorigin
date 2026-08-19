import { screen, render } from '@testing-library/react';

import {
  I18nProvider,
  LOCALE_COOKIE_NAME,
  _resetI18nForTests,
  getDictionary,
  type Locale,
} from '@joinorigin/i18n';

import AboutPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

/**
 * Unit tests for the /about page (discovery §5.6): server-wrapper metadata
 * export per the arch pattern (§3.3) + semantic HTML content.
 */

describe('about page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe(
      'About — The Operating System for Human Collaboration | JoinOrigin',
    );
    expect(metadata.description).toContain('social collaboration network');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/about');
    expect(metadata.openGraph?.title).toBe(metadata.title);
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' });
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['social collaboration network mission', 'social operating system']),
    );
  });

  it('renders a single h1 and the mission intro paragraph', () => {
    renderWithI18n(<AboutPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('The most valuable asset is your network');
    expect(
      screen.getByText(/the most valuable asset on the internet is not content or software/i),
    ).toBeInTheDocument();
  });

  it('renders the principles, founder guidance, and FAQ sections', () => {
    renderWithI18n(<AboutPage />);
    expect(screen.getByText('Guiding principles')).toBeInTheDocument();
    expect(screen.getByText('People First')).toBeInTheDocument();
    expect(screen.getByText('Founder guidance')).toBeInTheDocument();
    expect(screen.getByText(/Does this help people find each other/i)).toBeInTheDocument();
    expect(screen.getByText('Frequently asked questions')).toBeInTheDocument();
    expect(screen.getByText('What is JoinOrigin?')).toBeInTheDocument();
  });

  it('links to the real pages via the nav and footer', () => {
    renderWithI18n(<AboutPage />);
    // Header nav + footer both link the real pages; assert hrefs on the links.
    const featuresLinks = screen.getAllByRole('link', { name: 'Features' });
    expect(featuresLinks.length).toBeGreaterThan(0);
    expect(featuresLinks[0]).toHaveAttribute('href', '/features');
    expect(screen.getAllByRole('link', { name: 'Community' })[0]).toHaveAttribute(
      'href',
      '/community',
    );
    expect(screen.getAllByRole('link', { name: 'Docs' })[0]).toHaveAttribute('href', '/docs');
    expect(screen.getAllByRole('link', { name: 'About' })[0]).toHaveAttribute('href', '/about');
  });

  it('renders server-side JSON-LD: AboutPage + BreadcrumbList', () => {
    renderWithI18n(<AboutPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    expect(payloads.some((p) => p['@type'] === 'AboutPage')).toBe(true);
    const breadcrumb = payloads.find((p) => p['@type'] === 'BreadcrumbList');
    expect(breadcrumb?.itemListElement).toHaveLength(2);
    expect(breadcrumb?.itemListElement[1].item).toBe('http://localhost:3100/about');
  });
});

/**
 * TASK-460 — the about view renders the "Reading" cross-links through the
 * shared locale-aware path helper per the confirmed prefix table.
 * `useLocalizePath` reads the router pathname + active i18n locale, so this
 * suite overrides the `next/navigation` mock with a mutable `mockPathname`.
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => mockPathname,
}));

/** Aligns the provider's post-mount auto-detect with the render locale. */
function setNavigatorLanguage(language: string): void {
  Object.defineProperty(window.navigator, 'language', {
    value: language,
    configurable: true,
  });
}

function renderAboutForLocale(locale: Locale) {
  setNavigatorLanguage(locale);
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <AboutPage />
    </I18nProvider>,
  );
}

describe('about view — locale-aware internal links (TASK-460)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
    mockPathname = '/';
  });

  /** Finds a link with the exact href (reading-section links are unique by
   *  href even though the Trans text is locale-dependent). */
  function linkByHref(href: string) {
    return screen.getAllByRole('link').find((link) => link.getAttribute('href') === href);
  }

  it('keeps reading links unprefixed on an unprefixed EN load (table row 1)', () => {
    mockPathname = '/about';
    renderAboutForLocale('en');
    expect(linkByHref('/docs')).toBeDefined();
    expect(linkByHref('/community')).toBeDefined();
    expect(linkByHref('/contact')).toBeDefined();
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', () => {
    mockPathname = '/en/about';
    renderAboutForLocale('en');
    expect(linkByHref('/en/docs')).toBeDefined();
    expect(linkByHref('/en/community')).toBeDefined();
    expect(linkByHref('/en/contact')).toBeDefined();
  });

  it('renders /de/** reading links on a /de/** load (table row 3)', () => {
    mockPathname = '/de/about';
    renderAboutForLocale('de');
    expect(linkByHref('/de/docs')).toBeDefined();
    expect(linkByHref('/de/community')).toBeDefined();
    expect(linkByHref('/de/contact')).toBeDefined();
  });

  it('renders /de/** reading links on an unprefixed load with a de cookie (table row 4)', () => {
    mockPathname = '/about';
    renderAboutForLocale('de');
    expect(linkByHref('/de/docs')).toBeDefined();
    expect(linkByHref('/de/community')).toBeDefined();
    expect(linkByHref('/de/contact')).toBeDefined();
  });
});
