import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  I18nProvider,
  LOCALE_COOKIE_NAME,
  _resetI18nForTests,
  getDictionary,
  type Locale,
} from '@joinorigin/i18n';

import ContactPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

/**
 * Unit tests for the /contact page (discovery §5.7): metadata export per the
 * arch pattern + semantic HTML + mailto: form fallback behavior
 * (discovery Assumption 4 — no new backend in Sprint 4).
 */

describe('contact page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe('Contact — Talk to the JoinOrigin Team | JoinOrigin');
    expect(metadata.description).toContain('Contact the team');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/contact');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/contact');
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['contact JoinOrigin', 'JoinOrigin support']),
    );
  });

  it('renders a single h1, the contact form, and alternate paths', () => {
    renderWithI18n(<ContactPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Talk to us');
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    expect(screen.getByText('Other ways to reach us')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'hello@joinorigin.co' })).toHaveAttribute(
      'href',
      'mailto:hello@joinorigin.co',
    );
  });

  it('composes a mailto: URL on submit (no new backend in Sprint 4)', async () => {
    const user = userEvent.setup();
    const originalLocation = window.location;
    // jsdom blocks navigation — spy on href assignment to assert the composed URL.
    const hrefSetter = jest.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: {
        ...originalLocation,
        set href(value: string) {
          hrefSetter(value);
        },
      },
    });

    renderWithI18n(<ContactPage />);
    await user.type(screen.getByPlaceholderText('Your name'), 'Ada Lovelace');
    await user.type(screen.getByPlaceholderText('you@example.com'), 'ada@example.com');
    await user.type(
      screen.getByPlaceholderText('How can we help?'),
      'I want to start a community.',
    );
    await user.click(screen.getByRole('button', { name: 'Send via email' }));

    expect(hrefSetter).toHaveBeenCalledTimes(1);
    const mailto = hrefSetter.mock.calls[0][0] as string;
    expect(mailto).toMatch(/^mailto:hello@joinorigin\.co\?/);
    expect(mailto).toContain('subject=');
    expect(mailto).toContain('body=');
    expect(decodeURIComponent(mailto)).toContain('Ada Lovelace');
    expect(decodeURIComponent(mailto)).toContain('ada@example.com');
    expect(decodeURIComponent(mailto)).toContain('I want to start a community.');

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  it('renders ContactPage + BreadcrumbList JSON-LD', () => {
    renderWithI18n(<ContactPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const types = payloads.map((p) => p['@type']);
    expect(types).toContain('ContactPage');
    expect(types).toContain('BreadcrumbList');
    expect(types).not.toContain('FAQPage');
  });
});

/**
 * TASK-460 — the contact view renders the "Other ways to reach us" links
 * through the shared locale-aware path helper per the confirmed prefix table.
 * `useLocalizePath` reads the router pathname + active i18n locale, so this
 * suite overrides the `next/navigation` mock with a mutable `mockPathname`.
 * External `mailto:` hrefs always pass through untouched.
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

function renderContactForLocale(locale: Locale) {
  setNavigatorLanguage(locale);
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <ContactPage />
    </I18nProvider>,
  );
}

describe('contact view — locale-aware internal links (TASK-460)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
    mockPathname = '/';
  });

  /** Finds a link with the exact href (Trans link text is locale-dependent). */
  function linkByHref(href: string) {
    return screen.getAllByRole('link').find((link) => link.getAttribute('href') === href);
  }

  it('keeps docs/about links unprefixed + mailto untouched on an unprefixed EN load (table row 1)', () => {
    mockPathname = '/contact';
    renderContactForLocale('en');
    expect(linkByHref('/docs')).toBeDefined();
    expect(linkByHref('/about')).toBeDefined();
    // External mailto never gets a locale prefix.
    expect(screen.getByRole('link', { name: 'hello@joinorigin.co' })).toHaveAttribute(
      'href',
      'mailto:hello@joinorigin.co',
    );
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', () => {
    mockPathname = '/en/contact';
    renderContactForLocale('en');
    expect(linkByHref('/en/docs')).toBeDefined();
    expect(linkByHref('/en/about')).toBeDefined();
  });

  it('renders /de/** docs/about links on a /de/** load (table row 3)', () => {
    mockPathname = '/de/contact';
    renderContactForLocale('de');
    expect(linkByHref('/de/docs')).toBeDefined();
    expect(linkByHref('/de/about')).toBeDefined();
  });

  it('renders /de/** docs/about links on an unprefixed load with a de cookie (table row 4)', () => {
    mockPathname = '/contact';
    renderContactForLocale('de');
    expect(linkByHref('/de/docs')).toBeDefined();
    expect(linkByHref('/de/about')).toBeDefined();
  });
});
