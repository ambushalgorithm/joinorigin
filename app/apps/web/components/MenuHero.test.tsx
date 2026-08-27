import { screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import userEvent from '@testing-library/user-event';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import { I18nProvider, _resetI18nForTests, getDictionary } from '@joinorigin/i18n';

import MenuHero from './MenuHero';
import { renderWithI18n } from '../test-utils';

/**
 * `next/navigation` is mocked so the hero's `useLocalizePath` (link
 * locale-prefix table) works in jsdom (TASK-456). `mockPathname` drives the
 * "current URL" for the prefix table. Locale is URL-only (TASK-468): tests
 * render with `I18nProvider locale=...` via `renderWithI18n` — no cookie.
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

/**
 * Unit tests for the menu-page hero band (spec sprint-8 §4.1, extended
 * sprint-10 §4.1).
 *
 * The hero owns the page's single `<h1>`; the scene is decorative
 * (`alt=""` + `aria-hidden`), and the band must NOT be a `header` landmark
 * (the sticky top nav `Header` is the only `header` on menu pages). Sprint 10
 * additions: hero CTA (signup link / contact ghost link), social-proof
 * meta (TrustRow avatars / CountUpStat pill), and the ambient atmosphere.
 */

function renderHero(props: Partial<React.ComponentProps<typeof MenuHero>> = {}) {
  return renderWithI18n(
    <ThemeProvider theme={theme}>
      <MenuHero
        title="Everything a community needs, in one calm workspace"
        lead="Origin is a social collaboration network built around eight core objects."
        {...props}
      />
    </ThemeProvider>,
  );
}

describe('MenuHero', () => {
  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/';
  });

  it('renders the eyebrow, single h1, and lead', () => {
    renderHero({ eyebrow: 'Core objects' });
    expect(screen.getByText('Core objects')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Everything a community needs, in one calm workspace',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Origin is a social collaboration network built around eight core objects.'),
    ).toBeInTheDocument();
  });

  it('resolves the H1 through the active locale dictionary when titleKey is set (TASK-477)', () => {
    renderHero({ titleKey: 'seoContent.breadcrumb.hub' });
    expect(screen.getByRole('heading', { level: 1, name: 'Origins by City' })).toBeInTheDocument();
  });

  it('re-translates the H1 through the active locale on a de load (TASK-477)', () => {
    renderWithI18n(
      <ThemeProvider theme={theme}>
        <MenuHero title="T" titleKey="seoContent.breadcrumb.hub" />
      </ThemeProvider>,
      'de',
    );
    expect(
      screen.getByRole('heading', { level: 1, name: 'Origins nach Stadt' }),
    ).toBeInTheDocument();
  });

  it('renders exactly one h1 and no header landmark (the top nav owns <header>)', () => {
    const { container } = renderHero();
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(container.querySelector('header')).toBeNull();
    expect(container.querySelector('main')).toBeNull();
  });

  it('renders the local scene SVG as decorative content (inline, aria-hidden)', async () => {
    renderHero({ scene: 'features' });
    // Scene is registered through `next/dynamic` (TASK-404 code-split); the
    // SVG appears once the scene chunk resolves.
    const scene = await screen.findByTestId('menu-hero-scene');
    expect(scene.tagName).toBe('svg');
    expect(scene).toHaveAttribute('aria-hidden', 'true');
    expect(scene).not.toHaveAttribute('src');
  });

  it('omits eyebrow and scene when not provided', () => {
    renderHero();
    expect(screen.queryByText('Core objects')).not.toBeInTheDocument();
    expect(screen.queryByTestId('menu-hero-scene')).not.toBeInTheDocument();
  });

  it('renders a signup hero CTA when cta.variant is waitlist (spec §4.3)', async () => {
    const user = userEvent.setup();
    renderHero({ cta: { variant: 'waitlist', label: 'Get Started' } });
    const link = screen.getByTestId('hero-join-button');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/en/signup');
    expect(link).toHaveTextContent('Get Started');
    // A real anchor — no modal opens.
    await user.click(link);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders a ghost contact link instead of the waitlist on legal pages (spec §4.3)', () => {
    renderHero({
      cta: { variant: 'contact', label: 'Contact us', href: '/contact' },
    });
    const link = screen.getByTestId('hero-contact-link');
    expect(link).toHaveAttribute('href', '/en/contact');
    expect(screen.queryByTestId('hero-join-button')).not.toBeInTheDocument();
  });

  it('renders the trust row when meta.avatars is set (spec §4.4)', () => {
    renderHero({ meta: { avatars: true } });
    expect(screen.getByTestId('trust-row')).toBeInTheDocument();
    expect(screen.getByText('Join 2,400+ builders already collaborating')).toBeInTheDocument();
  });

  it('renders the count-up stat pill when meta.stat is set (spec §4.5)', () => {
    renderHero({ meta: { stat: true } });
    // The stat animates 0 → 2,400; the exact localized value is present in a
    // visually-hidden span inside the pill.
    expect(screen.getByText('2,400+')).toBeInTheDocument();
    expect(screen.getByText('Members building together')).toBeInTheDocument();
  });

  it('renders no CTA/meta when not provided', () => {
    renderHero();
    expect(screen.queryByTestId('hero-join-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('hero-contact-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('trust-row')).not.toBeInTheDocument();
  });

  it('localizes the contact CTA href on a /de/** load (table row 3)', () => {
    mockPathname = '/de/docs';
    renderWithI18n(
      <ThemeProvider theme={theme}>
        <MenuHero title="T" cta={{ variant: 'contact', label: 'Kontakt', href: '/contact' }} />
      </ThemeProvider>,
      'de',
    );
    expect(screen.getByTestId('hero-contact-link')).toHaveAttribute('href', '/de/contact');
  });

  it('localizes the contact CTA href on an unprefixed path with an active de locale (URL-driven)', () => {
    mockPathname = '/docs';
    renderWithI18n(
      <ThemeProvider theme={theme}>
        <MenuHero title="T" cta={{ variant: 'contact', label: 'Kontakt' }} />
      </ThemeProvider>,
      'de',
    );
    expect(screen.getByTestId('hero-contact-link')).toHaveAttribute('href', '/de/contact');
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', () => {
    mockPathname = '/en/docs';
    renderWithI18n(
      <ThemeProvider theme={theme}>
        <MenuHero title="T" cta={{ variant: 'contact', label: 'Contact us', href: '/contact' }} />
      </ThemeProvider>,
      'en',
    );
    expect(screen.getByTestId('hero-contact-link')).toHaveAttribute('href', '/en/contact');
  });

  it('routes the waitlist hero CTA to the locale-prefixed signup route (table row 3)', () => {
    mockPathname = '/de/docs';
    renderWithI18n(
      <ThemeProvider theme={theme}>
        <MenuHero title="T" cta={{ variant: 'waitlist', label: 'Loslegen' }} />
      </ThemeProvider>,
      'de',
    );
    expect(screen.getByTestId('hero-join-button')).toHaveAttribute('href', '/de/signup');
  });
});

/**
 * Story A (Sprint 22): MenuHero is mobile-first at the researched 320px
 * minimum viewport (TASK-526). Base styles (no media query) are the
 * 320px-floor layout; every enhancement is a `min-width` rule at
 * `theme.breakpoints`. jsdom does not apply `@media` to layout, so the
 * breakpoint behavior is asserted on the generated stylesheet.
 */
describe('Story A: MenuHero mobile-first breakpoints (min viewport = 320px)', () => {
  /** Renders the hero server-side and returns the generated CSS text. */
  function cssForHero(props: Partial<React.ComponentProps<typeof MenuHero>> = {}): string {
    const sheet = new ServerStyleSheet();
    try {
      renderToString(
        sheet.collectStyles(
          <I18nProvider locale="en" dictionary={getDictionary('en')}>
            <ThemeProvider theme={theme}>
              <MenuHero title="T" {...props} />
            </ThemeProvider>
          </I18nProvider>,
        ),
      );
      return sheet.getStyleTags();
    } finally {
      sheet.seal();
    }
  }

  it('uses the compact 480px band min-height at the 320px floor', () => {
    const css = cssForHero();
    // Base (320px floor): a fixed 480px band minimum keeps the stacked
    // CTA/trust content breathing room on small screens.
    expect(css).toContain('min-height:480px');
    // From the first enhancement breakpoint upward the desktop spec floor
    // (HERO_BAND_MIN_HEIGHT 560px / 60vh) applies.
    expect(css).toContain('@media (min-width:480px)');
    expect(css).toContain('min-height:max(560px,60vh)');
  });

  it('keeps the content grid single-column at the 320px floor', () => {
    const css = cssForHero();
    // Base rule is 1fr; the two-column split only appears inside the
    // min-width:1024px media block (styled-components emits the base rule
    // unwrapped and the enhancement inside @media).
    expect(css).toContain('grid-template-columns:1fr');
    expect(css).toContain('@media (min-width:1024px)');
    expect(css).toContain('grid-template-columns:minmax(0,1.15fr) minmax(0,0.85fr)');
  });

  it('switches to the two-column content layout at desktop (1024px)', () => {
    const css = cssForHero();
    expect(css).toContain('@media (min-width:1024px)');
    expect(css).toContain('grid-template-columns:minmax(0,1.15fr) minmax(0,0.85fr)');
  });

  it('stacks the CTA/stat actions full-width at the 320px floor', () => {
    const css = cssForHero({ cta: { variant: 'waitlist', label: 'Join' }, meta: { stat: true } });
    // Base: the CTA + stat pill stretch to the full content width and stack
    // (the stat's long label wraps rather than overflowing the viewport).
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:stretch');
    // From the first enhancement breakpoint upward items return to natural
    // width (flex-start + wrap).
    expect(css).toContain('@media (min-width:480px)');
    expect(css).toContain('align-items:flex-start');
    expect(css).toContain('flex-wrap:wrap');
  });

  it('uses compact content gutters at the 320px floor and widens at breakpoints', () => {
    const css = cssForHero();
    expect(css).toContain('padding:48px 20px 32px');
    expect(css).toContain('@media (min-width:480px)');
    expect(css).toContain('padding:64px 32px 32px');
    expect(css).toContain('padding:72px 64px 48px');
  });

  it('centers the scene column below desktop and pins it to the end at desktop', () => {
    const css = cssForHero({ scene: 'features' });
    expect(css).toContain('justify-content:center');
    expect(css).toContain('max-width:320px');
    expect(css).toContain('@media (min-width:1024px)');
    expect(css).toContain('justify-content:flex-end');
  });
});

/**
 * Story B (Sprint 22): the GSAP entrance timeline is gated behind
 * `gsap.matchMedia()` under `(prefers-reduced-motion: no-preference)` —
 * reduced-motion users (and SSR/no-JS) get the final static state instantly.
 * jsdom's default matchMedia reports the no-preference query as NOT
 * matching, so rendering exercises the reduced-motion path: no GSAP inline
 * styles may be written to the `data-hero` hooks.
 */
describe('Story B: MenuHero reduced-motion settled state', () => {
  it('renders the hero static (no GSAP-written styles) under prefers-reduced-motion: reduce', async () => {
    const { container } = renderWithI18n(
      <ThemeProvider theme={theme}>
        <MenuHero
          title="Everything a community needs"
          lead="Origin is a social collaboration network."
          cta={{ variant: 'waitlist', label: 'Get Started' }}
        />
      </ThemeProvider>,
    );

    // Let any GSAP work run — the matchMedia gate must keep everything static.
    await new Promise((resolve) => setTimeout(resolve, 40));

    for (const attr of ['eyebrow', 'title', 'lead', 'actions']) {
      const hooks = container.querySelectorAll(`[data-hero="${attr}"]`);
      for (const hook of Array.from(hooks)) {
        // Settled state: no inline opacity/transform/visibility tweens.
        expect(hook.getAttribute('style')).toBeNull();
      }
    }
  });
});
