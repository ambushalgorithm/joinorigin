import { act, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary, SUPPORTED_LOCALES, type Locale } from '@joinorigin/i18n';

import TypewriterHeading from './TypewriterHeading';

const FULL_TEXT =
  'Where every idea, startup, and project finds the people and resources to move it forward — Origin.';

function renderHeading(locale: Locale = 'en') {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <ThemeProvider theme={theme}>
        <TypewriterHeading />
      </ThemeProvider>
    </I18nProvider>,
  );
}

/** Complete the type animation (400ms delay + 20ms/char) for any locale. */
function completeTyping() {
  act(() => {
    jest.advanceTimersByTime(20_000);
  });
}

/** The gradient accent span inside the rendered heading (after the body). */
function getAccentSpan(container: HTMLElement): Element {
  return container.querySelectorAll('h1 > span')[1];
}

describe('TypewriterHeading', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the full two-tone heading after typing completes', () => {
    renderHeading();
    completeTyping();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain(FULL_TEXT);
    expect(heading.textContent).toContain('|');
  });

  it('keeps the caret visible after completion', () => {
    renderHeading();
    completeTyping();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent?.endsWith('|')).toBe(true);
  });

  it('clears and re-types on mount', () => {
    renderHeading();

    // Before the 400ms delay elapses, the heading is being cleared/re-typed.
    expect(screen.getByRole('heading', { level: 1 }).textContent?.length).toBeLessThan(
      FULL_TEXT.length,
    );
  });

  it('wraps the split in a block body and a gradient accent span after completion', () => {
    const { container } = renderHeading();
    completeTyping();

    const spans = container.querySelectorAll('h1 > span');
    expect(spans).toHaveLength(3);

    // Body carries the first 91 chars on its own block line…
    const body = spans[0];
    expect(body.textContent).toBe(FULL_TEXT.slice(0, 91));
    expect(getComputedStyle(body).display).toBe('block');

    // …and the remainder renders in the accent span. No text-transform:
    // capitalize — the dictionaries already capitalize the brand word and
    // capitalize would mangle trailing grammar (e.g. "Origin Mereka.").
    const accent = spans[1];
    expect(accent.textContent).toBe('Origin.');
    expect(getComputedStyle(accent).textTransform).not.toBe('capitalize');
  });

  describe('brand-token accent split (TASK-563)', () => {
    // Locales that place grammar AFTER the brand word: the literal accent
    // (`Origin.` / `Origin。`) is absent from the headline, so the old
    // `indexOf(accentText)` + `length - accentLength` fallback sliced
    // mid-phrase. The emphasized fragment must start with the brand word.
    const TRAILING_GRAMMAR_CASES: Array<{
      locale: Locale;
      expectedAccent: string;
      notStartsWith: string[];
    }> = [
      { locale: 'id', expectedAccent: 'Origin mereka.', notStartsWith: ['mereka.'] },
      { locale: 'ko', expectedAccent: 'Origin을 찾는 곳.', notStartsWith: ['을 찾는 곳.'] },
      { locale: 'ja', expectedAccent: 'Originを見つける場所。', notStartsWith: ['見つける場所。'] },
      { locale: 'tr', expectedAccent: "Origin'ini bulduğu yer.", notStartsWith: ['ğu yer.'] },
      { locale: 'vi', expectedAccent: 'Origin của mình.', notStartsWith: ['a mình.'] },
      { locale: 'th', expectedAccent: 'Origin', notStartsWith: ['พบ Origin'] },
      { locale: 'zh-TW', expectedAccent: 'Origin。', notStartsWith: ['。'] },
    ];

    it.each(TRAILING_GRAMMAR_CASES)(
      'starts the $locale accent at the brand word Origin (accent: $expectedAccent)',
      ({ locale, expectedAccent, notStartsWith }) => {
        const { container } = renderHeading(locale);
        completeTyping();

        const accent = getAccentSpan(container);
        expect(accent.textContent).toBe(expectedAccent);
        expect(accent.textContent?.startsWith('Origin')).toBe(true);

        // Regression guard: the fragment must not begin mid-phrase.
        for (const fragment of notStartsWith) {
          expect(accent.textContent?.startsWith(fragment)).toBe(false);
        }
      },
    );

    it('starts the accent fragment with the brand word Origin in every supported locale', () => {
      for (const locale of SUPPORTED_LOCALES) {
        const { container } = renderHeading(locale);
        completeTyping();

        const accent = getAccentSpan(container);
        expect(accent.textContent?.startsWith('Origin')).toBe(true);
      }
    });
  });
});
