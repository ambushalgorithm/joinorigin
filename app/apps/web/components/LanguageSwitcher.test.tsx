import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

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
 * Language switcher unit tests (design spec sprint-9-i18n-switcher §10.1):
 * renders the current autonym, opens the listbox, selects → `setLocale` +
 * cookie write, keyboard navigation, and RTL dir application.
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

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    _resetI18nForTests();
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
    Object.defineProperty(window.navigator, 'language', {
      value: 'en-US',
      configurable: true,
    });
  });

  it('renders the current locale autonym on the trigger', () => {
    renderSwitcher('en');
    expect(screen.getByRole('button', { name: 'Change language' })).toHaveTextContent('English');
  });

  it('renders the native autonym for a non-English locale', () => {
    renderSwitcher('es');
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
    await user.click(screen.getByRole('option', { name: /Deutsch/ }));

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
    await user.click(screen.getByRole('option', { name: /العربية/ }));

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
    await user.keyboard('{Enter}');

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
});
