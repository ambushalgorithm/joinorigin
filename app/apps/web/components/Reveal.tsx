'use client';

import { useRef } from 'react';
import styled from 'styled-components';

import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

/**
 * Scroll-reveal wrapper (design spec sprint-8 §4.3, GSAP elevation
 * sprint-10-menu-anim §5.6).
 *
 * Uses GSAP ScrollTrigger (`once: true` matches the old fire-once
 * IntersectionObserver). Content starts visible (progressive enhancement —
 * never hidden by CSS alone on the server or first paint); a
 * `fromTo(autoAlpha: 0, y: 24)` reveal runs when the element enters the
 * viewport. Reduced-motion users get no tween — the element stays at its
 * final visible state. Purely visual: children stay in the DOM and readable
 * by assistive technology.
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
            scrollTrigger: { trigger: elRef.current, start: 'top 85%', once: true },
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
