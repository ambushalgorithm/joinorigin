import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import MenuHero from './MenuHero';

/**
 * Unit tests for the menu-page hero band (spec sprint-8 §4.1).
 *
 * The hero owns the page's single `<h1>`; the scene is decorative
 * (`alt=""` + `aria-hidden`), and the band must NOT be a `header` landmark
 * (the sticky top nav `Header` is the only `header` on menu pages).
 */

function renderHero(props: Partial<React.ComponentProps<typeof MenuHero>> = {}) {
  return render(
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

  it('renders the local scene SVG as decorative content', () => {
    renderHero({ scene: '/assets/menu/scenes/features-scene.svg' });
    const scene = screen.getByTestId('menu-hero-scene');
    expect(scene).toHaveAttribute('src', '/assets/menu/scenes/features-scene.svg');
    expect(scene).toHaveAttribute('alt', '');
    expect(scene).toHaveAttribute('aria-hidden', 'true');
  });

  it('omits eyebrow and scene when not provided', () => {
    renderHero();
    expect(screen.queryByText('Core objects')).not.toBeInTheDocument();
    expect(screen.queryByTestId('menu-hero-scene')).not.toBeInTheDocument();
  });
});
