import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import { I18nProvider, _resetI18nForTests, getDictionary, type Locale } from '@joinorigin/i18n';

import TranslatePageLink from './TranslatePageLink';

/**
 * Secondary "Translate this page" link-out unit tests (TASK-318):
 * the link renders only after hydration with the Google website-translator
 * proxy href (`sl=en&tl=<locale>&u=<absolute current URL>`), derives `tl`
 * from the active client locale (default `en`), and is hidden on any
 * non-EN locale-prefixed path (already-translated pages, generalized from
 * the original `/de/*` gate via the shared locale-path helper, TASK-456).
 * No widget/script/SDK is added — the component is a plain link-out only.
 * Locale is URL-only (TASK-468): tests render with `I18nProvider locale=...`
 * — no cookie is ever read.
 */

function renderLink(locale: Locale = 'en', labelKey = 'seoContent.location.translatePage') {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <ThemeProvider theme={theme}>
        <TranslatePageLink labelKey={labelKey} />
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('TranslatePageLink', () => {
  beforeEach(() => {
    _resetI18nForTests();
  });

  it('renders nothing during SSR (the link appears only after hydration)', () => {
    const html = renderToString(
      <I18nProvider locale="en" dictionary={getDictionary('en')}>
        <ThemeProvider theme={theme}>
          <TranslatePageLink labelKey="seoContent.location.translatePage" />
        </ThemeProvider>
      </I18nProvider>,
    );
    expect(html).not.toContain('translate');
    expect(html).not.toContain('translate.google.com');
  });

  it('renders the label with sl=en, default tl=en, and u=the absolute current URL', () => {
    renderLink('en');

    const link = screen.getByTestId('translate-page-link');
    expect(link).toHaveTextContent('Translate this page');
    expect(link).toHaveAttribute('target', '_blank');

    const url = new URL(link.getAttribute('href') ?? '');
    expect(`${url.origin}${url.pathname}`).toBe('https://translate.google.com/translate');
    expect(url.searchParams.get('sl')).toBe('en');
    expect(url.searchParams.get('tl')).toBe('en');
    expect(url.searchParams.get('u')).toBe(window.location.href);
  });

  it('derives tl from the active client locale (URL-driven de → tl=de)', () => {
    renderLink('de');

    const link = screen.getByTestId('translate-page-link');
    const url = new URL(link.getAttribute('href') ?? '');
    expect(url.searchParams.get('tl')).toBe('de');
    expect(url.searchParams.get('sl')).toBe('en');
  });

  it('is hidden on /de/* paths (already-translated pages)', () => {
    window.history.pushState({}, '', '/de/location/germany/berlin/berlin');
    renderLink('en');
    expect(screen.queryByTestId('translate-page-link')).not.toBeInTheDocument();
    window.history.pushState({}, '', '/');
  });

  it('is hidden on ANY non-EN locale-prefixed path (generalized gate, TASK-456)', () => {
    for (const path of ['/vi/features', '/es/guides', '/pt-BR/location']) {
      window.history.pushState({}, '', path);
      const { unmount } = renderLink('en');
      expect(screen.queryByTestId('translate-page-link')).not.toBeInTheDocument();
      unmount();
    }
    window.history.pushState({}, '', '/');
  });

  it('still renders on /en/** paths (the EN surface is canonical, not translated)', () => {
    window.history.pushState({}, '', '/en/features');
    renderLink('en');
    const link = screen.getByTestId('translate-page-link');
    expect(link).toBeInTheDocument();
    expect(new URL(link.getAttribute('href') ?? '').searchParams.get('u')).toBe(
      window.location.href,
    );
    window.history.pushState({}, '', '/');
  });

  it('resolves the guide label key', () => {
    renderLink('en', 'seoContent.guides.translatePage');
    expect(screen.getByTestId('translate-page-link')).toHaveTextContent('Translate this page');
  });
});
