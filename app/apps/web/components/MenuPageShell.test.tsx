import { render, screen, within } from '@testing-library/react';

import { I18nProvider, _resetI18nForTests, getDictionary } from '@joinorigin/i18n';

import { HomeView } from '../app/home-view';
import MenuPageShell from './MenuPageShell';

/**
 * MenuPageShell tagline-strip wiring tests (TASK-561).
 *
 * The shell provides both theme providers internally, so suites only need the
 * i18n provider (the same pattern as the full-page `app/guides/page.test.tsx`).
 * The global `jest.setup.ts` mocks cover `next/navigation` (Header/Footer/
 * LanguageSwitcher) and `next/image`, so the full shell — Header, CtaBand,
 * Footer — renders in jsdom.
 */

function renderShell() {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <MenuPageShell>menu content</MenuPageShell>
    </I18nProvider>,
  );
}

function renderHomeView() {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <HomeView />
    </I18nProvider>,
  );
}

describe('MenuPageShell', () => {
  beforeEach(() => {
    _resetI18nForTests();
  });

  it('renders the tagline strip on menu pages', () => {
    renderShell();

    const strip = screen.getByTestId('tagline-strip');
    expect(strip).toBeInTheDocument();
    // The footer renders the same `footer.tagline`, so scope the assertion to
    // the strip itself.
    expect(within(strip).getByText('Where teams find their Origin')).toBeInTheDocument();
  });

  it('renders the tagline strip ABOVE the sticky header', () => {
    renderShell();

    const strip = screen.getByTestId('tagline-strip');
    // `Header` renders the single semantic `<header>` (role banner); the strip
    // must precede it in the DOM order (the header stays sticky, the strip
    // scrolls away).
    const header = screen.getByRole('banner');
    expect(strip.compareDocumentPosition(header) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('still renders the shell chrome and children', () => {
    renderShell();

    expect(screen.getByTestId('menu-page')).toBeInTheDocument();
    expect(screen.getByText('menu content')).toBeInTheDocument();
    expect(screen.getByTestId('cta-band')).toBeInTheDocument();
  });
});

describe('home-view exclusion', () => {
  it('does NOT render the tagline strip (homepage never renders MenuPageShell)', () => {
    renderHomeView();

    expect(screen.queryByTestId('tagline-strip')).not.toBeInTheDocument();
  });
});
