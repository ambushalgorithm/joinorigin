import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getDictionary } from '../loader';
import { I18nProvider, _resetI18nForTests, useI18n } from '../provider';
import { LOCALE_COOKIE_NAME } from '../storage';
import { Trans } from '../trans';
import type { Locale } from '../resolve';

/**
 * Provider tests (arch-i18n §10.2): locale override rendering, immediate
 * switch via setLocale + cookie write, RTL document dir, Trans rich text.
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

describe('I18nProvider', () => {
  beforeEach(() => {
    _resetI18nForTests();
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
    Object.defineProperty(window.navigator, 'language', {
      value: 'en-US',
      configurable: true,
    });
  });

  it('renders translated text for the initial locale override', () => {
    renderProvider('es');
    expect(screen.getByTestId('probe-locale').textContent).toBe('es');
    expect(screen.getByTestId('probe-dir').textContent).toBe('ltr');
    expect(screen.getByTestId('probe-headline').textContent).toBe('Origin.');
    expect(screen.getByTestId('probe-interp').textContent).toMatch(/7/);
  });

  it('switches locale immediately and writes the cookie (no reload)', async () => {
    const user = userEvent.setup();
    renderProvider('en');
    expect(screen.getByTestId('probe-locale').textContent).toBe('en');

    await user.click(screen.getByTestId('switch-es'));

    await waitFor(() => {
      expect(screen.getByTestId('probe-locale').textContent).toBe('es');
    });
    expect(document.cookie).toContain(`${LOCALE_COOKIE_NAME}=es`);
  });

  it('sets document.documentElement dir=rtl when switching to ar', async () => {
    const user = userEvent.setup();
    renderProvider('en');
    expect(document.documentElement.dir).toBe('ltr');

    await user.click(screen.getByTestId('switch-ar'));

    await waitFor(() => {
      expect(screen.getByTestId('probe-dir').textContent).toBe('rtl');
    });
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');
    expect(document.cookie).toContain(`${LOCALE_COOKIE_NAME}=ar`);
  });

  it('does not write a cookie for auto-detected locale on first paint', () => {
    renderProvider('de');
    expect(screen.getByTestId('probe-locale').textContent).toBe('de');
    expect(document.cookie).not.toContain(LOCALE_COOKIE_NAME);
  });
});

describe('Trans — rich text + interpolation (arch-i18n §4.1)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
    Object.defineProperty(window.navigator, 'language', {
      value: 'en-US',
      configurable: true,
    });
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
          values={{ email: 'hello@joinorigin.com' }}
          components={[<a key="mail" href="mailto:hello@joinorigin.com" />]}
        />
      </I18nProvider>,
    );
    const link = screen.getByRole('link', { name: 'hello@joinorigin.com' });
    expect(link).toHaveAttribute('href', 'mailto:hello@joinorigin.com');
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
