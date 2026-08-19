import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import {
  I18nProvider,
  LOCALE_COOKIE_NAME,
  _resetI18nForTests,
  getDictionary,
  type Locale,
} from '@joinorigin/i18n';

import LanguageSwitcher from './LanguageSwitcher';

/**
 * `next/navigation` is mocked so the switcher's `useRouter`/`usePathname`
 * hooks work in jsdom (TASK-450): `push` records the navigation target and
 * `mockPathname` drives the "current path" the switcher strips/re-prefixes.
 * Both are `mock*`-prefixed so the hoisted factory can reference them.
 */
const mockPush = jest.fn();
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
}));

/**
 * Language switcher unit tests (design spec sprint-9-i18n-switcher §10.1):
 * renders the current autonym, opens the listbox, selects → `setLocale` +
 * cookie write, keyboard navigation, RTL dir application, and the responsive
 * contract (TASK-278): the header variant is hidden below 768px via a
 * `max-width: 768px` media rule, the mobile-panel variant stacks the listbox
 * below the trigger (column layout, static panel, no min-width overflow) and
 * omits EN hints, and the footer variant keeps its upward-opening dropdown.
 */

function renderSwitcher(
  locale: Locale = 'en',
  variant: 'header' | 'footer' | 'mobile-panel' = 'header',
) {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <ThemeProvider theme={theme}>
        <LanguageSwitcher variant={variant} />
      </ThemeProvider>
    </I18nProvider>,
  );
}

/**
 * Flushes the provider's async post-mount effects + in-flight `setLocale`
 * work (client locale correction, the EN fallback dictionary load, and the
 * real dynamic-import dictionary loads) inside `act` so no "not wrapped in
 * act(...)" console noise is emitted. Dynamic `import()` resolves on a
 * macrotask, so one `setTimeout(0)` turn is needed in addition to the
 * microtask queue (TASK-290).
 */
async function flushI18nEffects(): Promise<void> {
  await act(async () => {
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
  });
}

/** Renders a single variant in isolation and returns its generated CSS.
 *  ServerStyleSheet gives a clean per-render stylesheet (jsdom style tags
 *  accumulate across tests and jsdom does not apply `@media` to layout). */
function cssForVariant(variant: 'header' | 'footer' | 'mobile-panel'): string {
  const sheet = new ServerStyleSheet();
  try {
    renderToString(
      sheet.collectStyles(
        <I18nProvider locale="en" dictionary={getDictionary('en')}>
          <ThemeProvider theme={theme}>
            <LanguageSwitcher variant={variant} />
          </ThemeProvider>
        </I18nProvider>,
      ),
    );
    return sheet.getStyleTags();
  } finally {
    sheet.seal();
  }
}

/** Sets navigator.language before a render (affects the post-mount check). */
function setNavigatorLanguage(language: string): void {
  Object.defineProperty(window.navigator, 'language', {
    value: language,
    configurable: true,
  });
}

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    _resetI18nForTests();
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
    setNavigatorLanguage('en-US');
    mockPush.mockClear();
    mockPathname = '/';
  });

  it('renders the current locale autonym on the trigger', () => {
    renderSwitcher('en');
    expect(screen.getByRole('button', { name: 'Change language' })).toHaveTextContent('English');
  });

  it('renders the native autonym for a non-English locale', async () => {
    // Align the post-mount auto-detect with the prop so the provider stays on
    // 'es' (no async setLocale → no act() noise; the trigger shows the native
    // autonym as the initial override).
    setNavigatorLanguage('es-ES');
    renderSwitcher('es');
    await flushI18nEffects();
    expect(screen.getByRole('button', { name: 'Change language' })).toHaveTextContent('Español');
  });

  it('opens the listbox with all 21 options and the active check', async () => {
    const user = userEvent.setup();
    renderSwitcher('en');

    const trigger = screen.getByRole('button', { name: 'Change language' });
    await user.click(trigger);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeVisible();
    // English is selected; Español + Deutsch present as native labels.
    expect(screen.getByRole('option', { name: /English/ })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('option', { name: /Español/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Deutsch/ })).toBeInTheDocument();
  });

  it('selecting a locale switches immediately and writes the cookie', async () => {
    const user = userEvent.setup();
    renderSwitcher('en');

    await user.click(screen.getByRole('button', { name: 'Change language' }));
    await act(async () => {
      await user.click(screen.getByRole('option', { name: /Deutsch/ }));
    });
    await flushI18nEffects();

    await waitFor(() => {
      expect(document.cookie).toContain(`${LOCALE_COOKIE_NAME}=de`);
    });
    // The listbox closes after selection.
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('sets document.documentElement dir=rtl when selecting Arabic', async () => {
    const user = userEvent.setup();
    renderSwitcher('en');

    await user.click(screen.getByRole('button', { name: 'Change language' }));
    await act(async () => {
      await user.click(screen.getByRole('option', { name: /العربية/ }));
    });
    await flushI18nEffects();

    await waitFor(() => {
      expect(document.cookie).toContain(`${LOCALE_COOKIE_NAME}=ar`);
    });
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');
  });

  it('supports keyboard navigation: open with Enter, ArrowDown, Enter to select', async () => {
    const user = userEvent.setup();
    renderSwitcher('en');

    const trigger = screen.getByRole('button', { name: 'Change language' });
    await user.click(trigger); // focus the trigger
    // Move down to the next option (Español at index 1) and select it.
    await user.keyboard('{ArrowDown}');
    await act(async () => {
      await user.keyboard('{Enter}');
    });
    await flushI18nEffects();

    await waitFor(() => {
      expect(document.cookie).toContain(`${LOCALE_COOKIE_NAME}=es`);
    });
    expect(trigger).toHaveFocus();
  });

  it('closes the listbox with Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    renderSwitcher('en');

    const trigger = screen.getByRole('button', { name: 'Change language' });
    await user.click(trigger);
    expect(screen.getByRole('listbox')).toBeVisible();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('hides the header variant below 768px via a max-width media rule', () => {
    const css = cssForVariant('header');

    // styled-components emits the media rule into the stylesheet; jsdom does
    // not apply `@media` to layout, so the e2e suite verifies the actual
    // visibility at each viewport (jsdom normalizes the condition text by
    // stripping the space after the colon).
    expect(css).toContain('@media (max-width:768px)');
    expect(css).toContain('display:none');
  });

  it('does not emit the mobile-hiding media rule for footer or mobile-panel variants', () => {
    expect(cssForVariant('footer')).not.toContain('@media (max-width:768px)');
    expect(cssForVariant('mobile-panel')).not.toContain('@media (max-width:768px)');
  });

  it('mobile-panel variant stacks the listbox below the trigger (column layout)', async () => {
    const user = userEvent.setup();
    const { container } = renderSwitcher('en', 'mobile-panel');

    const wrap = container.querySelector('[data-testid="language-switcher-mobile-panel"]');
    expect(wrap).not.toBeNull();
    expect(getComputedStyle(wrap as HTMLElement).flexDirection).toBe('column');

    await user.click(screen.getByRole('button', { name: 'Change language' }));
    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeVisible();

    // The panel is in normal flow (static) — it expands downward in the
    // column layout instead of being absolutely positioned beside/right of
    // the trigger (which previously floated right / overflowed the screen).
    expect(getComputedStyle(listbox).position).toBe('static');
    // It fills the full-width row without a fixed min-width that could
    // overflow narrow viewports (jsdom returns `0` for the zero length).
    expect(getComputedStyle(listbox).width).toBe('100%');
    expect(getComputedStyle(listbox).minWidth).toBe('0');
  });

  it('mobile-panel variant omits EN hints on the option rows', async () => {
    const user = userEvent.setup();
    renderSwitcher('en', 'mobile-panel');

    await user.click(screen.getByRole('button', { name: 'Change language' }));

    // All 21 options still render with native autonyms.
    expect(screen.getByRole('option', { name: /Deutsch/ })).toBeInTheDocument();
    // The muted EN hint ("German") is omitted to save space on mobile.
    expect(screen.queryByText('German')).not.toBeInTheDocument();
  });

  it('footer variant still opens its upward listbox and selects a locale', async () => {
    const user = userEvent.setup();
    renderSwitcher('en', 'footer');

    const trigger = screen.getByRole('button', { name: 'Change language' });
    await user.click(trigger);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeVisible();
    // Footer opens upward: the panel is absolutely positioned above the trigger.
    expect(getComputedStyle(listbox).bottom).not.toBe('auto');

    await user.click(screen.getByRole('option', { name: /Français/ }));
    await act(async () => {});
    await flushI18nEffects();
    await waitFor(() => {
      expect(document.cookie).toContain(`${LOCALE_COOKIE_NAME}=fr`);
    });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  describe('locale navigation (TASK-450)', () => {
    it('navigates from a canonical route to the locale-prefixed route', async () => {
      const user = userEvent.setup();
      mockPathname = '/features';
      renderSwitcher('en');

      await user.click(screen.getByRole('button', { name: 'Change language' }));
      await act(async () => {
        await user.click(screen.getByRole('option', { name: /Español/ }));
      });
      await flushI18nEffects();

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/es/features');
      });
      // The cookie is synced before navigation (the target route renders in
      // the freshly selected locale).
      await waitFor(() => {
        expect(document.cookie).toContain(`${LOCALE_COOKIE_NAME}=es`);
      });
    });

    it('replaces an existing locale prefix with the new locale', async () => {
      const user = userEvent.setup();
      mockPathname = '/es/features';
      renderSwitcher('en');

      await user.click(screen.getByRole('button', { name: 'Change language' }));
      await act(async () => {
        await user.click(screen.getByRole('option', { name: /Français/ }));
      });
      await flushI18nEffects();

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/fr/features');
      });
    });

    it('navigates to the /en-prefixed route when switching back to English (all-routes-prefixed)', async () => {
      const user = userEvent.setup();
      mockPathname = '/es/features';
      renderSwitcher('en');

      await user.click(screen.getByRole('button', { name: 'Change language' }));
      await act(async () => {
        await user.click(screen.getByRole('option', { name: /English/ }));
      });
      await flushI18nEffects();

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/en/features');
      });
    });

    it('navigates from the canonical root to the locale root', async () => {
      const user = userEvent.setup();
      mockPathname = '/';
      renderSwitcher('en');

      await user.click(screen.getByRole('button', { name: 'Change language' }));
      await act(async () => {
        await user.click(screen.getByRole('option', { name: /Deutsch/ }));
      });
      await flushI18nEffects();

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/de');
      });
    });

    it('navigates from the canonical root to the /en root when switching to English', async () => {
      const user = userEvent.setup();
      mockPathname = '/';
      renderSwitcher('en');

      await user.click(screen.getByRole('button', { name: 'Change language' }));
      await act(async () => {
        await user.click(screen.getByRole('option', { name: /English/ }));
      });
      await flushI18nEffects();

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/en');
      });
    });

    it('navigates from an /en-prefixed route to a locale-prefixed route', async () => {
      const user = userEvent.setup();
      mockPathname = '/en/features';
      renderSwitcher('en');

      await user.click(screen.getByRole('button', { name: 'Change language' }));
      await act(async () => {
        await user.click(screen.getByRole('option', { name: /Español/ }));
      });
      await flushI18nEffects();

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/es/features');
      });
    });
  });
});
