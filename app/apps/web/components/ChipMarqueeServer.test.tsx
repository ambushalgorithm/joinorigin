import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary, type Locale } from '@joinorigin/i18n';

import ChipMarqueeServer from './ChipMarqueeServer';

/**
 * Server wrapper unit tests (Story E, TASK-536).
 *
 * Contract: `ChipMarqueeServer` reads the proxy-forwarded locale
 * (`x-joinorigin-locale`) + country (`x-joinorigin-ip-country`, TASK-479)
 * server-side, resolves the target content-rich community page
 * (`lib/seo/exampleCommunities.ts`) and renders the client marquee with the
 * registry-exact localized path — so surfaces gain geo-aware chips without
 * any locale page-wrapper changes.
 */

const mockHeaders: { locale: string | null; country: string | null } = {
  locale: 'en',
  country: null,
};

jest.mock('next/headers', () => ({
  headers: () => ({
    get: (name: string) => {
      if (name === 'x-joinorigin-locale') return mockHeaders.locale;
      if (name === 'x-joinorigin-ip-country') return mockHeaders.country;
      return null;
    },
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), prefetch: jest.fn() }),
  usePathname: () => '/',
}));

async function renderServerMarquee() {
  const element = await ChipMarqueeServer();
  if (!element) throw new Error('ChipMarqueeServer returned null');
  return render(
    <I18nProvider
      locale={(mockHeaders.locale as Locale) ?? 'en'}
      dictionary={getDictionary((mockHeaders.locale as Locale) ?? 'en')}
    >
      <ThemeProvider theme={theme}>
        <>{element}</>
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('ChipMarqueeServer', () => {
  beforeEach(() => {
    mockHeaders.locale = 'en';
    mockHeaders.country = null;
  });

  it('renders chips linking to the resolved community for the visitor country', async () => {
    mockHeaders.country = 'US';
    const { container, getByTestId } = await renderServerMarquee();
    expect(getByTestId('chip-marquee')).toHaveAttribute('data-ip-country', 'US');
    const track = container.querySelector('[aria-hidden="true"]');
    const links = track?.querySelectorAll('a') ?? [];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute('href', '/en/location/united-states/new-york/new-york');
    }
  });

  it('resolves the CLOSEST content-rich country through the wrapper (FI → DK)', async () => {
    // A Finnish visitor (no content-rich community in FI) gets the nearest
    // community — Copenhagen (DK) — with the country passed through.
    mockHeaders.country = 'FI';
    const { container, getByTestId } = await renderServerMarquee();
    expect(getByTestId('chip-marquee')).toHaveAttribute('data-ip-country', 'FI');
    const track = container.querySelector('[aria-hidden="true"]');
    const links = track?.querySelectorAll('a') ?? [];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute('href', '/en/location/denmark/capital-region/copenhagen');
    }
  });

  it('falls back to the locale-language default when geo is absent (local dev)', async () => {
    const { container, getByTestId } = await renderServerMarquee();
    // No geo country → no data-ip-country on the observability hook.
    expect(getByTestId('chip-marquee')).not.toHaveAttribute('data-ip-country');
    const track = container.querySelector('[aria-hidden="true"]');
    const links = track?.querySelectorAll('a') ?? [];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute('href', '/en/location/united-states/new-york/new-york');
    }
  });

  it('falls back to the locale-language default for a malformed geo value', async () => {
    mockHeaders.country = 'USA';
    const { container } = await renderServerMarquee();
    const track = container.querySelector('[aria-hidden="true"]');
    const links = track?.querySelectorAll('a') ?? [];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute('href', '/en/location/united-states/new-york/new-york');
    }
  });

  it('renders the resolved path on the ACTIVE locale surface (de visitor in the US)', async () => {
    mockHeaders.locale = 'de';
    mockHeaders.country = 'US';
    const { container } = await renderServerMarquee();
    const track = container.querySelector('[aria-hidden="true"]');
    const links = track?.querySelectorAll('a') ?? [];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute('href', '/de/location/united-states/new-york/new-york');
    }
  });

  it('uses the locale-language default on a non-EN surface without geo (de → Berlin)', async () => {
    mockHeaders.locale = 'de';
    const { container } = await renderServerMarquee();
    const track = container.querySelector('[aria-hidden="true"]');
    const links = track?.querySelectorAll('a') ?? [];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute('href', '/de/location/germany/berlin/berlin');
    }
  });
});
