import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getDictionary } from '../loader';
import { I18nProvider, _resetI18nForTests, useI18n } from '../provider';
import { Trans } from '../trans';
import type { Locale } from '../resolve';

/**
 * Provider tests (arch-i18n §10.2): locale override rendering, immediate
 * switch via setLocale, RTL document dir, Trans rich text.
 *
 * TASK-468 (URL-only locale): the provider trusts the server `locale` prop
 * (URL-derived) + `LocalePathnameSync` for SPA navigation. There is NO
 * cookie persistence and NO post-hydration cookie/navigator override — so
 * no test asserts `document.cookie` writes or auto-correction.
 */

jest.mock('../loader', () => {
  const actual = jest.requireActual('../loader') as typeof import('../loader');
  return {
    ...actual,
    loadDictionary: jest.fn((locale: string) =>
      Promise.resolve(actual.getDictionary(locale as Locale)),
    ),
  };
});

function Probe({ label }: { label?: string }) {
  const { locale, dir, t, setLocale } = useI18n();
  return (
    <div>
      <span data-testid="probe-locale">{locale}</span>
      <span data-testid="probe-dir">{dir}</span>
      <span data-testid="probe-headline">{t('home.hero.headlineAccent')}</span>
      <span data-testid="probe-interp">{t('home.hero.trustAvatarsAlt', { number: 7 })}</span>
      {label ? <span data-testid="probe-label">{label}</span> : null}
      <button type="button" onClick={() => void setLocale('es')} data-testid="switch-es">
        Switch ES
      </button>
      <button type="button" onClick={() => void setLocale('ar')} data-testid="switch-ar">
        Switch AR
      </button>
    </div>
  );
}

function renderProvider(locale: Locale = 'en') {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <Probe />
    </I18nProvider>,
  );
}

/**
 * Flushes the provider's async post-mount effects (the EN fallback dictionary
 * load) and in-flight `setLocale` state updates. Wrapped in `act` so the
 * state updates they trigger are observed by React and no "not wrapped in
 * act(...)" console noise is emitted (TASK-290).
 */
async function flushI18nEffects(): Promise<void> {
  await act(async () => {});
}

describe('I18nProvider', () => {
  beforeEach(() => {
    _resetI18nForTests();
  });

  it('renders translated text for the initial locale prop', async () => {
    renderProvider('es');
    await flushI18nEffects();
    expect(screen.getByTestId('probe-locale').textContent).toBe('es');
    expect(screen.getByTestId('probe-dir').textContent).toBe('ltr');
    expect(screen.getByTestId('probe-headline').textContent).toBe('Origin.');
    expect(screen.getByTestId('probe-interp').textContent).toMatch(/7/);
  });

  it('trusts the server locale prop even when navigator.language differs (TASK-468)', async () => {
    // The provider no longer overrides the URL-derived prop with the browser
    // language — the prop always wins (no flash-to-EN, no auto-correction).
    Object.defineProperty(window.navigator, 'language', {
      value: 'en-US',
      configurable: true,
    });
    renderProvider('vi');
    await flushI18nEffects();
    expect(screen.getByTestId('probe-locale').textContent).toBe('vi');
  });

  it('switches locale immediately (no reload, no cookie write)', async () => {
    const user = userEvent.setup();
    renderProvider('en');
    await flushI18nEffects();
    expect(screen.getByTestId('probe-locale').textContent).toBe('en');

    // Click + flush in ONE act scope: `setLocale` is async (dictionary load),
    // so its state updates must be observed inside the same act block to
    // avoid "not wrapped in act(...)" noise.
    await act(async () => {
      await user.click(screen.getByTestId('switch-es'));
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(screen.getByTestId('probe-locale').textContent).toBe('es');
    });
    expect(document.cookie).not.toContain('joinorigin_locale');
  });

  it('sets document.documentElement dir=rtl when switching to ar', async () => {
    const user = userEvent.setup();
    renderProvider('en');
    await flushI18nEffects();
    expect(document.documentElement.dir).toBe('ltr');

    await act(async () => {
      await user.click(screen.getByTestId('switch-ar'));
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(screen.getByTestId('probe-dir').textContent).toBe('rtl');
    });
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');
    expect(document.cookie).not.toContain('joinorigin_locale');
  });
});

describe('Trans — rich text + interpolation (arch-i18n §4.1)', () => {
  beforeEach(() => {
    _resetI18nForTests();
  });

  it('renders numbered tags with positionally mapped components', () => {
    render(
      <I18nProvider locale="en" dictionary={getDictionary('en')}>
        <Trans i18nKey="about.readingDocs" components={[<a key="docs" href="/docs" />]} />
      </I18nProvider>,
    );
    const link = screen.getByRole('link', { name: 'docs' });
    expect(link).toHaveAttribute('href', '/docs');
    expect(screen.getByText(/Read the/)).toBeInTheDocument();
  });

  it('interpolates variables inside tags (contact.otherEmail)', () => {
    render(
      <I18nProvider locale="en" dictionary={getDictionary('en')}>
        <Trans
          i18nKey="contact.otherEmail"
          values={{ email: 'hello@joinorigin.co' }}
          components={[<a key="mail" href="mailto:hello@joinorigin.co" />]}
        />
      </I18nProvider>,
    );
    const link = screen.getByRole('link', { name: 'hello@joinorigin.co' });
    expect(link).toHaveAttribute('href', 'mailto:hello@joinorigin.co');
  });

  it('renders plain text when no components are given', () => {
    render(
      <I18nProvider locale="en" dictionary={getDictionary('en')}>
        <Trans i18nKey="header.logIn" />
      </I18nProvider>,
    );
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });
});
