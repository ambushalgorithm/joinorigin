import { screen, render } from '@testing-library/react';

import {
  I18nProvider,
  LOCALE_COOKIE_NAME,
  _resetI18nForTests,
  getDictionary,
  type Locale,
} from '@joinorigin/i18n';

import DocsPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

/**
 * Unit tests for the /docs page (discovery §5.5): metadata export per the
 * arch pattern + semantic HTML (single h1, concepts, roadmap, architecture).
 */

describe('docs page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe('Docs — Concepts, Roadmap & Architecture | JoinOrigin');
    expect(metadata.description).toContain('how Origin works');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/docs');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/docs');
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['JoinOrigin docs', 'Matrix community platform']),
    );
  });

  it('renders a single h1 and the definitional intro', () => {
    renderWithI18n(<DocsPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('JoinOrigin docs');
    expect(
      screen.getByText(/the product: a social collaboration network and community OS/i),
    ).toBeInTheDocument();
  });

  it('renders concept definitions for every core object', () => {
    renderWithI18n(<DocsPage />);
    // "Concepts" appears twice after the Sprint 10 redesign: as the sticky
    // anchor-nav link and as the section title.
    expect(screen.getAllByText('Concepts').length).toBeGreaterThanOrEqual(1);
    for (const concept of [
      'Profiles',
      'Communities',
      'Ideas',
      'Communication',
      'Feed',
      'Projects',
      'Companies',
      'Opportunities',
    ]) {
      expect(screen.getByText(concept)).toBeInTheDocument();
    }
    expect(screen.getAllByText('Roadmap').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Architecture & standards').length).toBeGreaterThanOrEqual(1);
    // "Matrix protocol" appears in both the Communication concept and the
    // Architecture section — assert at least one render.
    expect(screen.getAllByText(/open Matrix protocol/i).length).toBeGreaterThan(0);
  });

  it('renders the FAQ block and mirrors it in FAQPage JSON-LD', () => {
    renderWithI18n(<DocsPage />);
    expect(screen.getByText('What is JoinOrigin built on?')).toBeInTheDocument();

    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const faq = payloads.find((p) => p['@type'] === 'FAQPage');
    // The self-host/hosting FAQ was removed from public copy (Sprint 14 §6.2/Q9),
    // so the docs FAQ now renders 3 entries.
    expect(faq?.mainEntity).toHaveLength(3);
    expect(payloads.some((p) => p['@type'] === 'BreadcrumbList')).toBe(true);
  });
});

/**
 * TASK-460 — the docs view renders the Explore hub cross-links through the
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

function renderDocsForLocale(locale: Locale) {
  setNavigatorLanguage(locale);
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <DocsPage />
    </I18nProvider>,
  );
}

describe('docs view — locale-aware internal links (TASK-460)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
    mockPathname = '/';
  });

  /** Finds a link with the exact href (nav chrome also links the hubs). */
  function linkByHref(href: string) {
    return screen.getAllByRole('link').find((link) => link.getAttribute('href') === href);
  }

  it('keeps Explore links unprefixed on an unprefixed EN load (table row 1)', () => {
    mockPathname = '/docs';
    renderDocsForLocale('en');
    expect(linkByHref('/location')).toBeDefined();
    expect(linkByHref('/guides')).toBeDefined();
    expect(linkByHref('/glossary')).toBeDefined();
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', () => {
    mockPathname = '/en/docs';
    renderDocsForLocale('en');
    expect(linkByHref('/en/location')).toBeDefined();
    expect(linkByHref('/en/guides')).toBeDefined();
    expect(linkByHref('/en/glossary')).toBeDefined();
  });

  it('renders /de/** Explore links on a /de/** load (table row 3)', () => {
    mockPathname = '/de/docs';
    renderDocsForLocale('de');
    expect(linkByHref('/de/location')).toBeDefined();
    expect(linkByHref('/de/guides')).toBeDefined();
    expect(linkByHref('/de/glossary')).toBeDefined();
  });

  it('renders /de/** Explore links on an unprefixed load with a de cookie (table row 4)', () => {
    mockPathname = '/docs';
    renderDocsForLocale('de');
    expect(linkByHref('/de/location')).toBeDefined();
    expect(linkByHref('/de/guides')).toBeDefined();
    expect(linkByHref('/de/glossary')).toBeDefined();
  });
});
