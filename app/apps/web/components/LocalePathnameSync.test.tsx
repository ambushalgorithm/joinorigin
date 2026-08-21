import { act, render, screen, waitFor } from '@testing-library/react';

import { _resetI18nForTests, getDictionary, useI18n, type Locale } from '@joinorigin/i18n';

import LocalePathnameSync, { pathnamePrefixLocale } from './LocalePathnameSync';

/**
 * LocalePathnameSync tests (TASK-488): the wrapper derives the active locale
 * from the URL prefix at provider render time (`usePathname` → first segment
 * vs the 21 `SUPPORTED_LOCALES`) and seeds `I18nProvider` with it — so the
 * provider locale follows the URL on every navigation and the language
 * switcher needs no `setLocale` pre-toggle (navigation only). Unprefixed
 * paths fall back to the server-resolved locale (`x-joinorigin-locale`, SSR
 * first paint). Locale is URL-only (TASK-468): no cookie is ever written.
 *
 * `next/navigation` is mocked with a mutable `mockPathname` so a test can
 * simulate SPA navigation by mutating the pathname and re-rendering (the
 * wrapper's `serverLocale` prop stays fixed — exactly the stale-layout case
 * where the URL prefix must win).
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

function Probe() {
  const { locale, t } = useI18n();
  return (
    <span>
      <span data-testid="probe-locale">{locale}</span>
      <span data-testid="probe-login">{t('header.logIn')}</span>
    </span>
  );
}

function syncElement(serverLocale: Locale = 'en') {
  return (
    <LocalePathnameSync serverLocale={serverLocale} serverDictionary={getDictionary(serverLocale)}>
      <Probe />
    </LocalePathnameSync>
  );
}

function renderSync(serverLocale: Locale = 'en') {
  return render(syncElement(serverLocale));
}

/**
 * Flushes the provider's async post-mount effects (the EN fallback dictionary
 * load + in-flight `loadDictionary` for URL-derived locales) inside `act` so
 * no "not wrapped in act(...)" console noise is emitted. Dynamic `import()`
 * resolves on a macrotask, so one `setTimeout(0)` turn is needed in addition
 * to the microtask queue (TASK-290).
 */
async function flushI18nEffects(): Promise<void> {
  await act(async () => {
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
  });
}

describe('pathnamePrefixLocale — prefix derivation from the 21 SUPPORTED_LOCALES', () => {
  it('derives the locale from a single-segment prefix', () => {
    expect(pathnamePrefixLocale('/vi')).toBe('vi');
    expect(pathnamePrefixLocale('/de')).toBe('de');
    expect(pathnamePrefixLocale('/en')).toBe('en');
  });

  it('derives the locale from a multi-segment prefixed path', () => {
    expect(pathnamePrefixLocale('/vi/features')).toBe('vi');
    expect(pathnamePrefixLocale('/de/guides/berlin')).toBe('de');
    expect(pathnamePrefixLocale('/en/features')).toBe('en');
    expect(pathnamePrefixLocale('/es/guides/my-slug')).toBe('es');
  });

  it('handles region-variant locale prefixes with canonical casing', () => {
    expect(pathnamePrefixLocale('/pt-BR/features')).toBe('pt-BR');
    expect(pathnamePrefixLocale('/zh-CN/guides')).toBe('zh-CN');
    expect(pathnamePrefixLocale('/zh-TW/guides')).toBe('zh-TW');
  });

  it('derives every one of the 21 supported locales as a prefix', () => {
    const supported: Locale[] = [
      'en',
      'es',
      'pt-BR',
      'fr',
      'de',
      'ru',
      'ja',
      'ko',
      'zh-CN',
      'zh-TW',
      'ar',
      'hi',
      'id',
      'tr',
      'it',
      'pl',
      'nl',
      'vi',
      'th',
      'uk',
      'fa',
    ];
    for (const locale of supported) {
      expect(pathnamePrefixLocale(`/${locale}/any/path`)).toBe(locale);
    }
  });

  it('returns undefined for unprefixed and non-locale paths', () => {
    expect(pathnamePrefixLocale('')).toBeUndefined();
    expect(pathnamePrefixLocale('/')).toBeUndefined();
    expect(pathnamePrefixLocale('/features')).toBeUndefined();
    expect(pathnamePrefixLocale('/guides/berlin')).toBeUndefined();
    expect(pathnamePrefixLocale('/unknown/features')).toBeUndefined();
    expect(pathnamePrefixLocale('/deutschland')).toBeUndefined();
  });
});

describe('LocalePathnameSync — URL-derived active locale provider wrapper (TASK-488)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/';
  });

  it('renders its children inside the provider', () => {
    mockPathname = '/en';
    render(
      <LocalePathnameSync serverLocale="en" serverDictionary={getDictionary('en')}>
        <div data-testid="child" />
      </LocalePathnameSync>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('derives the active locale from a prefixed pathname (URL prefix wins over the server locale)', async () => {
    // The URL says vi even though the server (stale headers) resolved en —
    // the URL prefix must win on arrival (TASK-488).
    mockPathname = '/vi/features';
    renderSync('en');
    await flushI18nEffects();
    expect(screen.getByTestId('probe-locale').textContent).toBe('vi');
  });

  it('falls back to the server locale for unprefixed pathnames (SSR first paint)', async () => {
    mockPathname = '/features';
    renderSync('vi');
    await flushI18nEffects();
    expect(screen.getByTestId('probe-locale').textContent).toBe('vi');
  });

  it('seeds the server dictionary for the first paint when URL and server locale match', async () => {
    mockPathname = '/es/features';
    renderSync('es');
    await flushI18nEffects();
    expect(screen.getByTestId('probe-locale').textContent).toBe('es');
    // First paint is already translated from the server dictionary.
    expect(screen.getByTestId('probe-login').textContent).toBe('Iniciar sesión');
  });

  it('switches the provider locale when SPA navigation changes the URL prefix (no cookie)', async () => {
    mockPathname = '/';
    const { rerender } = renderSync('en');
    await flushI18nEffects();
    expect(screen.getByTestId('probe-locale').textContent).toBe('en');

    // SPA navigation: the URL changes but the server locale prop stays 'en'
    // (the root layout headers() is stale — Bug 1). The wrapper re-seeds the
    // provider from the new prefix.
    mockPathname = '/vi/features';
    rerender(syncElement('en'));
    await flushI18nEffects();

    await waitFor(() => {
      expect(screen.getByTestId('probe-locale').textContent).toBe('vi');
    });
    expect(document.cookie).not.toContain('joinorigin_locale');
  });

  it('loads the URL-derived dictionary so the target route renders in the target language', async () => {
    mockPathname = '/';
    const { rerender } = renderSync('en');
    await flushI18nEffects();

    mockPathname = '/vi/features';
    rerender(syncElement('en'));
    await flushI18nEffects();

    await waitFor(() => {
      expect(screen.getByTestId('probe-login').textContent).toBe('Đăng nhập');
    });
    expect(document.cookie).not.toContain('joinorigin_locale');
  });

  it('syncs back to en when SPA navigation lands on the /en/** surface', async () => {
    mockPathname = '/de/features';
    const { rerender } = renderSync('de');
    await flushI18nEffects();
    expect(screen.getByTestId('probe-locale').textContent).toBe('de');

    mockPathname = '/en/features';
    rerender(syncElement('de'));
    await flushI18nEffects();

    await waitFor(() => {
      expect(screen.getByTestId('probe-locale').textContent).toBe('en');
    });
    expect(screen.getByTestId('probe-login').textContent).toBe('Log In');
    expect(document.cookie).not.toContain('joinorigin_locale');
  });

  it('is idempotent: re-renders on the same prefix do not change the locale', async () => {
    mockPathname = '/vi/features';
    const { rerender } = renderSync('en');
    await flushI18nEffects();
    expect(screen.getByTestId('probe-locale').textContent).toBe('vi');

    // Same prefix, different page → the provider prop stays 'vi' (no churn).
    mockPathname = '/vi/other-page';
    rerender(syncElement('en'));
    await flushI18nEffects();

    expect(screen.getByTestId('probe-locale').textContent).toBe('vi');
    expect(document.cookie).not.toContain('joinorigin_locale');
  });
});
