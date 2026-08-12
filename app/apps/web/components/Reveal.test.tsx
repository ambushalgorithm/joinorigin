import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import Reveal from './Reveal';

/**
 * Unit tests for the scroll-reveal wrapper (spec sprint-8 §4.3).
 *
 * Reveal is purely visual: children stay in the DOM and readable regardless
 * of visibility state, and in jsdom `IntersectionObserver` is unavailable so
 * `useInView` falls back to visible (progressive enhancement).
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

  it('applies a delay to the reveal transition', () => {
    const { container } = renderReveal({ delay: '0.16s' });
    const wrap = container.querySelector('[data-testid="reveal"]') as HTMLElement;
    const transition = getComputedStyle(wrap).transition;
    expect(transition).toContain('0.16s');
  });
});
