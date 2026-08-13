import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import Reveal from './Reveal';

/**
 * Unit tests for the scroll-reveal wrapper (spec sprint-8 §4.3, GSAP
 * elevation sprint-10-menu-anim §5.6).
 *
 * Reveal is now GSAP ScrollTrigger-driven (`once: true`, reduced-motion-safe)
 * and purely visual: children stay in the DOM and readable regardless of
 * visibility state. In jsdom there is no real scroll, so we assert the
 * progressive-enhancement contract — content is always present and never
 * hidden by markup (GSAP `fromTo` only tweens styles client-side).
 */

function renderReveal(props: Partial<React.ComponentProps<typeof Reveal>> = {}) {
  return render(
    <ThemeProvider theme={theme}>
      <Reveal {...props}>
        <p>Reveal content stays in the DOM.</p>
      </Reveal>
    </ThemeProvider>,
  );
}

describe('Reveal', () => {
  it('renders its children as a div by default', () => {
    const { container } = renderReveal();
    expect(screen.getByText('Reveal content stays in the DOM.')).toBeInTheDocument();
    const wrap = container.querySelector('[data-testid="reveal"]');
    expect(wrap?.tagName).toBe('DIV');
  });

  it('supports rendering as a section via the as prop', () => {
    const { container } = renderReveal({ as: 'section' });
    const wrap = container.querySelector('[data-testid="reveal"]');
    expect(wrap?.tagName).toBe('SECTION');
  });

  it('keeps children readable (final-visible content, progressive enhancement)', () => {
    const { container } = renderReveal({ delay: '0.16s' });
    const wrap = container.querySelector('[data-testid="reveal"]') as HTMLElement;
    // Content is in the DOM and the wrapper never hides it via markup.
    expect(wrap).not.toBeNull();
    expect(wrap?.textContent).toContain('Reveal content stays in the DOM.');
  });
});
