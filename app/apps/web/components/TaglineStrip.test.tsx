import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { I18nProvider, _resetI18nForTests, getDictionary, type Locale } from '@joinorigin/i18n';

import TaglineStrip from './TaglineStrip';

/**
 * TaglineStrip unit tests (TASK-561): the strip renders the localized
 * `footer.tagline` (single source of truth, TASK-560) and is a slim,
 * NON-sticky eyebrow — never a banner. The CSS assertions use the same
 * `ServerStyleSheet` server-render pattern as the Footer/Header suites.
 */

function renderStrip(locale: Locale = 'en') {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <NativeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <TaglineStrip />
        </ThemeProvider>
      </NativeThemeProvider>
    </I18nProvider>,
  );
}

/** Server-renders the strip and returns the generated CSS text. */
function cssForStrip(locale: Locale = 'en'): string {
  const sheet = new ServerStyleSheet();
  try {
    renderToString(
      sheet.collectStyles(
        <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
          <NativeThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <TaglineStrip />
            </ThemeProvider>
          </NativeThemeProvider>
        </I18nProvider>,
      ),
    );
    return sheet.getStyleTags();
  } finally {
    sheet.seal();
  }
}

describe('TaglineStrip', () => {
  beforeEach(() => {
    _resetI18nForTests();
  });

  it('renders the localized footer tagline (single source of truth)', () => {
    renderStrip();

    const strip = screen.getByTestId('tagline-strip');
    expect(strip).toBeInTheDocument();
    expect(strip).toHaveTextContent('Where teams find their Origin');
  });

  it('renders the localized tagline for a non-English locale', () => {
    renderStrip('de');

    expect(screen.getByTestId('tagline-strip')).toHaveTextContent('Wo Teams ihren Origin finden');
  });

  it('is a slim centered eyebrow: ~32px, hairline border, muted letter-spaced copy', () => {
    const css = cssForStrip();

    expect(css).toContain('min-height:32px');
    expect(css).toContain('justify-content:center');
    expect(css).toContain('border-bottom:1px solid');
    expect(css).toContain('letter-spacing:0.08em');
  });

  it('is NON-sticky — the strip scrolls away with the page', () => {
    const css = cssForStrip();

    // The strip is a plain static element: no sticky/fixed positioning.
    expect(css).not.toContain('position:sticky');
    expect(css).not.toContain('position:fixed');
  });
});
