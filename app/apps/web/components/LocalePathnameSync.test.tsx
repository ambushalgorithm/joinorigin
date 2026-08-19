import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  I18nProvider,
  LOCALE_COOKIE_NAME,
  _resetI18nForTests,
  getDictionary,
  useI18n,
  type Locale,
} from '@joinorigin/i18n';

import LocalePathnameSync, { pathnamePrefixLocale } from './LocalePathnameSync';

/**
 * LocalePathnameSync tests (TASK-465, Bug 1): the pure prefix derivation and
 * the client-side watcher — SPA navigation to `/<locale>/**` must call
 * `setLocale()` so the UI language toggles instantly (the root layout's
 * `headers()` is stale during client nav).
 *
 * `next/navigation` is mocked with a mutable `mockPathname` so a test can
 * simulate SPA navigation by mutating the pathname and re-rendering (the
 * provider `locale` prop stays fixed — exactly the stale-layout bug).
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

function Probe() {
  const { locale, setLocale } = useI18n();
  return (
    <span>
      <span data-testid="probe-locale">{locale}</span>
      <button type="button" onClick={() => void setLocale('fr')} data-testid="switch-fr">
        FR
      </button>
    </span>
  );
}

function syncElement(initialLocale: Locale = 'en', onLocaleChange?: (locale: Locale) => void) {
  return (
    <I18nProvider
      locale={initialLocale}
      dictionary={getDictionary(initialLocale)}
      onLocaleChange={onLocaleChange}
    >
      <LocalePathnameSync />
      <Probe />
    </I18nProvider>
  );
}

function renderSync(initialLocale: Locale = 'en', onLocaleChange?: (locale: Locale) => void) {
  return render(syncElement(initialLocale, onLocaleChange));
}

/**
 * Flushes the provider's async post-mount effects + in-flight `setLocale`
 * work (the dynamic-import dictionary load for the target locale) inside
 * `act` so no "not wrapped in act(...)" noise is emitted. Dynamic `import()`
 * resolves on a macrotask, so one `setTimeout(0)` turn is needed in addition
 * to the microtask queue (TASK-290).
 */
async function flushI18nEffects(): Promise<void> {
  await act(async () => {
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
  });
}

/** Sets navigator.language before a render (affects the post-mount check). */
function setNavigatorLanguage(language: string): void {
  Object.defineProperty(window.navigator, 'language', {
    value: language,
    configurable: true,
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

describe('LocalePathnameSync — SPA navigation locale sync', () => {
  beforeEach(() => {
    _resetI18nForTests();
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
    setNavigatorLanguage('en-US');
    mockPathname = '/';
  });

  it('renders nothing (pure side-effect watcher)', () => {
    const { container } = render(
      <I18nProvider locale="en" dictionary={getDictionary('en')}>
        <LocalePathnameSync />
      </I18nProvider>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('is a no-op on mount when the prefix matches the active locale', async () => {
    const onLocaleChange = jest.fn();
    setNavigatorLanguage('vi-VN');
    mockPathname = '/vi/features';
    renderSync('vi', onLocaleChange);
    await flushI18nEffects();

    expect(screen.getByTestId('probe-locale').textContent).toBe('vi');
    expect(onLocaleChange).not.toHaveBeenCalled();
    // No setLocale → the route-stick cookie is never written.
    expect(document.cookie).not.toContain(LOCALE_COOKIE_NAME);
  });

  it('is a no-op on mount for an unprefixed pathname', async () => {
    const onLocaleChange = jest.fn();
    mockPathname = '/features';
    renderSync('en', onLocaleChange);
    await flushI18nEffects();

    expect(screen.getByTestId('probe-locale').textContent).toBe('en');
    expect(onLocaleChange).not.toHaveBeenCalled();
  });

  it('does not sync when SPA navigation stays on unprefixed paths', async () => {
    const onLocaleChange = jest.fn();
    mockPathname = '/features';
    const { rerender } = renderSync('en', onLocaleChange);
    await flushI18nEffects();

    mockPathname = '/community';
    rerender(syncElement('en', onLocaleChange));
    await flushI18nEffects();

    expect(screen.getByTestId('probe-locale').textContent).toBe('en');
    expect(onLocaleChange).not.toHaveBeenCalled();
  });

  it('syncs the UI locale when SPA navigation lands on a prefixed route', async () => {
    const onLocaleChange = jest.fn();
    mockPathname = '/';
    const { rerender } = renderSync('en', onLocaleChange);
    await flushI18nEffects();
    expect(screen.getByTestId('probe-locale').textContent).toBe('en');

    // SPA navigation: the URL changes but the provider locale prop stays 'en'
    // (the root layout headers() is stale — Bug 1).
    mockPathname = '/vi/features';
    rerender(syncElement('en', onLocaleChange));
    await flushI18nEffects();

    await waitFor(() => {
      expect(screen.getByTestId('probe-locale').textContent).toBe('vi');
    });
    expect(onLocaleChange).toHaveBeenCalledTimes(1);
    expect(onLocaleChange).toHaveBeenCalledWith('vi');
    // The provider persists the selection + keeps <html lang dir> in sync.
    expect(document.cookie).toContain(`${LOCALE_COOKIE_NAME}=vi`);
    expect(document.documentElement.lang).toBe('vi');
  });

  it('syncs back to en when SPA navigation lands on the /en/** surface', async () => {
    const onLocaleChange = jest.fn();
    setNavigatorLanguage('de-DE');
    mockPathname = '/de/features';
    const { rerender } = renderSync('de', onLocaleChange);
    await flushI18nEffects();
    expect(screen.getByTestId('probe-locale').textContent).toBe('de');

    mockPathname = '/en/features';
    rerender(syncElement('de', onLocaleChange));
    await flushI18nEffects();

    await waitFor(() => {
      expect(screen.getByTestId('probe-locale').textContent).toBe('en');
    });
    expect(onLocaleChange).toHaveBeenCalledTimes(1);
    expect(onLocaleChange).toHaveBeenCalledWith('en');
    expect(document.cookie).toContain(`${LOCALE_COOKIE_NAME}=en`);
  });

  it('is idempotent: no re-sync when navigating within the same prefix', async () => {
    const onLocaleChange = jest.fn();
    mockPathname = '/';
    const { rerender } = renderSync('en', onLocaleChange);
    await flushI18nEffects();

    mockPathname = '/vi/features';
    rerender(syncElement('en', onLocaleChange));
    await flushI18nEffects();
    await waitFor(() => {
      expect(screen.getByTestId('probe-locale').textContent).toBe('vi');
    });
    expect(onLocaleChange).toHaveBeenCalledTimes(1);

    // Same prefix, different page → the watcher must not call setLocale again.
    mockPathname = '/vi/other-page';
    rerender(syncElement('en', onLocaleChange));
    await flushI18nEffects();

    expect(screen.getByTestId('probe-locale').textContent).toBe('vi');
    expect(onLocaleChange).toHaveBeenCalledTimes(1);
    expect(document.cookie).toContain(`${LOCALE_COOKIE_NAME}=vi`);
  });

  it('syncs again when SPA navigation moves to a different prefix', async () => {
    const onLocaleChange = jest.fn();
    mockPathname = '/';
    const { rerender } = renderSync('en', onLocaleChange);
    await flushI18nEffects();

    mockPathname = '/vi/features';
    rerender(syncElement('en', onLocaleChange));
    await flushI18nEffects();
    await waitFor(() => {
      expect(screen.getByTestId('probe-locale').textContent).toBe('vi');
    });

    mockPathname = '/de/features';
    rerender(syncElement('en', onLocaleChange));
    await flushI18nEffects();

    await waitFor(() => {
      expect(screen.getByTestId('probe-locale').textContent).toBe('de');
    });
    expect(onLocaleChange).toHaveBeenCalledTimes(2);
    expect(onLocaleChange).toHaveBeenLastCalledWith('de');
    expect(document.cookie).toContain(`${LOCALE_COOKIE_NAME}=de`);
  });

  it('does not revert a switcher-initiated locale change mid-navigation', async () => {
    const onLocaleChange = jest.fn();
    setNavigatorLanguage('de-DE');
    mockPathname = '/de/features';
    const { rerender } = renderSync('de', onLocaleChange);
    await flushI18nEffects();
    expect(screen.getByTestId('probe-locale').textContent).toBe('de');

    // LanguageSwitcher select(): setLocale(next) first, then router.push.
    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByTestId('switch-fr'));
    });
    await flushI18nEffects();
    expect(screen.getByTestId('probe-locale').textContent).toBe('fr');
    expect(onLocaleChange).toHaveBeenCalledTimes(1);

    // The navigation lands on /fr/features; the watcher must NOT flip back.
    mockPathname = '/fr/features';
    rerender(syncElement('de', onLocaleChange));
    await flushI18nEffects();

    expect(screen.getByTestId('probe-locale').textContent).toBe('fr');
    expect(onLocaleChange).toHaveBeenCalledTimes(1);
  });
});
