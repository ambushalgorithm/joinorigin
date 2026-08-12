'use client';

import styled from 'styled-components';

import { EASE, useInView, useReducedMotion } from './motion';

/**
 * Scroll-reveal wrapper (design spec sprint-8 §4.3).
 *
 * Uses `IntersectionObserver` via `useInView`: content starts visible
 * (progressive enhancement — never hidden by CSS alone on the server or
 * first paint), then fades up when the element enters the viewport.
 * Purely visual — content stays in the DOM and readable by assistive
 * technology; no `aria-hidden` toggling.
 */

export interface RevealProps {
  children: React.ReactNode;
  /** Transition delay, e.g. `0.08s` for staggered card grids. Default `0s`. */
  delay?: string;
  /** Rendered element. Default `div`; allows `section` for semantic blocks. */
  as?: React.ElementType;
  className?: string;
}

const RevealWrap = styled.div<{ $visible: boolean; $delay: string }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'none' : 'translateY(20px)')};
  transition: ${({ $visible, $delay }) =>
    $visible ? `opacity 0.6s ${EASE} ${$delay}, transform 0.6s ${EASE} ${$delay}` : 'none'};
`;

export function Reveal({ children, delay = '0s', as = 'div', className }: RevealProps) {
  const reduced = useReducedMotion();
  const { ref, inView, mounted } = useInView<HTMLDivElement>();

  // Content is only hidden after mount AND while still outside the viewport.
  // Reduced-motion users always see final states immediately.
  const visible = reduced || !mounted || inView;

  return (
    <RevealWrap
      ref={ref}
      as={as}
      $visible={visible}
      $delay={delay}
      className={className}
      data-testid="reveal"
    >
      {children}
    </RevealWrap>
  );
}

export default Reveal;
