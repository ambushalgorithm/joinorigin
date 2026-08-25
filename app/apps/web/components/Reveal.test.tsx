import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import { SCROLL_TRIGGER_START } from './motion';
import Reveal from './Reveal';

/**
 * Unit tests for the scroll-reveal wrapper (spec sprint-8 §4.3, GSAP
 * elevation sprint-10-menu-anim §5.6, Story B sprint-22 pre-entry trigger).
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

/**
 * Story B (Sprint 22): the scroll-reveal fires at the shared ~90% viewport
 * pre-entry trigger and renders at the settled state for reduced-motion users.
 * The GSAP tween only ever runs under `(prefers-reduced-motion:
 * no-preference)` inside `gsap.matchMedia()`, so jsdom's default matchMedia
 * (which does NOT match no-preference) exercises the reduced-motion path.
 */
describe('Story B: Reveal ~90% trigger + reduced-motion settled state', () => {
  it('uses the shared pre-entry ScrollTrigger start (SCROLL_TRIGGER_START)', () => {
    // The trigger contract lives in motion.ts; Reveal consumes it verbatim.
    // `top bottom+=150px` = fires while the element top is still ~150px BELOW
    // the viewport bottom, so the reveal is mid-flight when it enters view.
    expect(SCROLL_TRIGGER_START).toBe('top bottom+=150px');
  });

  it('renders at the settled visible state for prefers-reduced-motion: reduce', () => {
    // Default jsdom matchMedia reports `(prefers-reduced-motion:
    // no-preference)` as NOT matching, so no tween/ScrollTrigger registers:
    // the wrapper keeps its final-visible opacity (no inline hidden styles).
    const { container } = renderReveal({ delay: '0.16s' });
    const wrap = container.querySelector('[data-testid="reveal"]') as HTMLElement;
    expect(wrap).not.toBeNull();
    // Settled state: no GSAP-written inline opacity/transform/visibility.
    expect(wrap.getAttribute('style')).toBeNull();
    expect(screen.getByText('Reveal content stays in the DOM.')).toBeInTheDocument();
  });

  it('renders at the settled visible state without a delay prop too', () => {
    const { container } = renderReveal();
    const wrap = container.querySelector('[data-testid="reveal"]') as HTMLElement;
    expect(wrap.getAttribute('style')).toBeNull();
    expect(screen.getByText('Reveal content stays in the DOM.')).toBeInTheDocument();
  });
});
