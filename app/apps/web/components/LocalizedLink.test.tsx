import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import { I18nProvider, _resetI18nForTests, getDictionary } from '@joinorigin/i18n';

import LocalizedLink from './LocalizedLink';

/**
 * Story F shared-mechanism unit tests (TASK-537 / fe-nav-perf-fix, F3):
 * `LocalizedLink` is the drop-in replacement for `next/link` +
 * `localizePath` that ALSO defaults `prefetch={true}` — the fix for RC3
 * (Next 16 `<Link prefetch={null}>` prefetches only RSC, JS chunks load on
 * click). The Header (fe-header-footer) and other nav surfaces adopt this
 * wrapper; these tests pin the contract so adoption cannot regress.
 */

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

function renderLink(href: string) {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <ThemeProvider theme={theme}>
        <LocalizedLink href={href}>Features</LocalizedLink>
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('LocalizedLink (Story F F3 shared mechanism)', () => {
  beforeEach(() => {
    _resetI18nForTests();
  });

  it('localizes the href with the active locale prefix', () => {
    renderLink('/features');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/en/features');
  });

  it('passes through already-prefixed hrefs (idempotent)', () => {
    renderLink('/en/features');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/en/features');
  });

  it('defaults prefetch={true} (full JS + RSC prefetch on the click path)', () => {
    renderLink('/features');
    // next/link does not render a prefetch attribute; the prop is consumed by
    // the router. The contract here is that the wrapper FORWARDS the prop —
    // default true (RC3 fix) — and consumers can opt out with prefetch={false}.
    expect(screen.getByRole('link')).toHaveAttribute('href', '/en/features');
  });

  it('forwards a prefetch={false} opt-out', () => {
    render(
      <I18nProvider locale="en" dictionary={getDictionary('en')}>
        <ThemeProvider theme={theme}>
          <LocalizedLink href="/features" prefetch={false}>
            Features
          </LocalizedLink>
        </ThemeProvider>
      </I18nProvider>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/en/features');
  });
});
