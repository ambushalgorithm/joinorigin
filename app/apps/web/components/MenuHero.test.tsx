import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import MenuHero from './MenuHero';
import { WaitlistModalProvider } from './WaitlistModal/WaitlistModalProvider';
import { renderWithI18n } from '../test-utils';

/**
 * Unit tests for the menu-page hero band (spec sprint-8 §4.1, extended
 * sprint-10 §4.1).
 *
 * The hero owns the page's single `<h1>`; the scene is decorative
 * (`alt=""` + `aria-hidden`), and the band must NOT be a `header` landmark
 * (the sticky top nav `Header` is the only `header` on menu pages). Sprint 10
 * additions: hero CTA (waitlist button / contact ghost link), social-proof
 * meta (TrustRow avatars / CountUpStat pill), and the ambient atmosphere.
 */

function renderHero(props: Partial<React.ComponentProps<typeof MenuHero>> = {}) {
  return renderWithI18n(
    <ThemeProvider theme={theme}>
      <WaitlistModalProvider>
        <MenuHero
          title="Everything a community needs, in one calm workspace"
          lead="Origin is a social collaboration network built around eight core objects."
          {...props}
        />
      </WaitlistModalProvider>
    </ThemeProvider>,
  );
}

describe('MenuHero', () => {
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

  it('renders exactly one h1 and no header landmark (the top nav owns <header>)', () => {
    const { container } = renderHero();
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(container.querySelector('header')).toBeNull();
    expect(container.querySelector('main')).toBeNull();
  });

  it('renders the local scene SVG as decorative content (inline, aria-hidden)', () => {
    renderHero({ scene: 'features' });
    const scene = screen.getByTestId('menu-hero-scene');
    expect(scene.tagName).toBe('svg');
    expect(scene).toHaveAttribute('aria-hidden', 'true');
    expect(scene).not.toHaveAttribute('src');
  });

  it('omits eyebrow and scene when not provided', () => {
    renderHero();
    expect(screen.queryByText('Core objects')).not.toBeInTheDocument();
    expect(screen.queryByTestId('menu-hero-scene')).not.toBeInTheDocument();
  });

  it('renders a waitlist hero CTA when cta.variant is waitlist (spec §4.3)', async () => {
    const user = userEvent.setup();
    renderHero({ cta: { variant: 'waitlist', label: 'Join the waitlist' } });
    const button = screen.getByTestId('hero-join-button');
    expect(button).toHaveTextContent('Join the waitlist');
    // The button opens the shared waitlist modal.
    await user.click(button);
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('renders a ghost contact link instead of the waitlist on legal pages (spec §4.3)', () => {
    renderHero({
      cta: { variant: 'contact', label: 'Contact us', href: '/contact' },
    });
    const link = screen.getByTestId('hero-contact-link');
    expect(link).toHaveAttribute('href', '/contact');
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
});
