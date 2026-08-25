'use client';

import { useRef } from 'react';
import styled from 'styled-components';

import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

import { SCROLL_TRIGGER_START } from './motion';

/**
 * Scroll-reveal wrapper (design spec sprint-8 §4.3, GSAP elevation
 * sprint-10-menu-anim §5.6, Story B sprint-22 pre-entry trigger).
 *
 * Uses GSAP ScrollTrigger (`once: true` matches the old fire-once
 * IntersectionObserver). The trigger fires at `SCROLL_TRIGGER_START`
 * (`top bottom+=150px`) — i.e. when the element's top is still ~150px BELOW
 * the viewport bottom — so the reveal starts pre-entry and may be mid-flight
 * by the time the element scrolls into view (~90% viewport height entry).
 * Content starts visible (progressive enhancement — never hidden by CSS alone
 * on the server or first paint); a `fromTo(autoAlpha: 0, y: 24)` reveal runs
 * when the pre-entry trigger fires. Reduced-motion users get no tween — the
 * element stays at its final visible state. Purely visual: children stay in
 * the DOM and readable by assistive technology.
 */

export interface RevealProps {
  children: React.ReactNode;
  /** Transition delay, e.g. `0.08s` for staggered card grids. Default `0s`. */
  delay?: string;
  /** Rendered element. Default `div`; allows `section` for semantic blocks. */
  as?: React.ElementType;
  className?: string;
}

const RevealWrap = styled.div``;

export function Reveal({ children, delay = '0s', as = 'div', className }: RevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const delaySec = parseFloat(delay.replace('s', '')) || 0;
        gsap.fromTo(
          elRef.current,
          // opacity-only (NOT autoAlpha): `visibility: hidden` would exclude
          // below-fold content from `innerText`, hiding it from LLM crawlers
          // and the "no empty visible text" SEO contract (spec §2.4 — content
          // is never hidden from non-JS / reduced-motion / crawler readers).
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: delaySec,
            scrollTrigger: {
              trigger: elRef.current,
              // Story B: fire when the element's top is ~150px BELOW the
              // viewport bottom (pre-entry) so the reveal is mid-flight when
              // the element becomes visible.
              start: SCROLL_TRIGGER_START,
              once: true,
            },
          },
        );
      });
    },
    { scope: elRef },
  );

  return (
    <RevealWrap ref={elRef} as={as} className={className} data-testid="reveal">
      {children}
    </RevealWrap>
  );
}

export default Reveal;
