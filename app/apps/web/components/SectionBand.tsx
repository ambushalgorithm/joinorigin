'use client';

import { useRef } from 'react';
import styled from 'styled-components';

import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

import { DEFAULT_ACCENT, PAGE_SCHEMES, type PageAccentKey } from './menuTokens';
import { SECTION_BAND_BORDER, SECTION_BAND_GLASS } from './menuTokens';

/**
 * Glass section band (spec sprint-10-menu-redesign §4.7, GSAP elevation
 * sprint-10-menu-anim §5.6).
 *
 * Gives the menu-page body rhythm: sections alternate between plain canvas
 * and full-bleed glass bands (blurred, bordered). The band extends
 * edge-to-edge; the inner content keeps its own `PageContainer` max-width.
 *
 * - `variant="glass"` (default): `backdrop-filter` blur + hairline
 *   `border-block` + translucent indigo-tinted surface.
 * - `variant="plain"`: transparent canvas (no band styling).
 * - `glow`: paints the per-page glow `::before` AND renders a real
 *   `meshLayer` div (NOT a pseudo element) carrying the page's full-bleed
 *   mesh with `data-gsap-parallax="0.08"` so the first band's mesh drifts
 *   subtly on scroll.
 *
 * Semantics: wrapper only — children keep their own `<section>`/headings and
 * their own `Reveal` wrappers.
 */

export interface SectionBandProps {
  children: React.ReactNode;
  /** `glass` (default) or `plain`. */
  variant?: 'plain' | 'glass';
  /** Page accent used for the faint wayfinding glow. */
  accent?: PageAccentKey;
  /** Paint the per-page glow + mesh behind this band (first glass band only). */
  glow?: boolean;
  className?: string;
}

const Band = styled.div<{ $variant: 'plain' | 'glass'; $glow: string }>`
  position: relative;
  border-block: ${({ $variant }) =>
    $variant === 'glass' ? `1px solid ${SECTION_BAND_BORDER}` : '1px solid transparent'};
  background: ${({ $variant }) => ($variant === 'glass' ? SECTION_BAND_GLASS : 'transparent')};
  backdrop-filter: ${({ $variant }) => ($variant === 'glass' ? 'blur(10px)' : 'none')};
  -webkit-backdrop-filter: ${({ $variant }) => ($variant === 'glass' ? 'blur(10px)' : 'none')};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $glow }) => $glow};
    opacity: 0.5;
    pointer-events: none;
  }
`;

/** Real mesh layer (GSAP parallax target) — full-bleed page-hue mesh. */
const MeshLayer = styled.div<{ $mesh: string }>`
  position: absolute;
  inset: 0;
  background: ${({ $mesh }) => $mesh};
  pointer-events: none;
`;

export function SectionBand({
  children,
  variant = 'glass',
  accent = DEFAULT_ACCENT,
  glow = false,
  className,
}: SectionBandProps) {
  const bandRef = useRef<HTMLDivElement>(null);
  const scheme = PAGE_SCHEMES[accent];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(bandRef);
        q('[data-gsap-parallax]').forEach((el: HTMLElement) => {
          const intensity = Number(el.getAttribute('data-gsap-parallax')) || 0.08;
          gsap.to(el, {
            yPercent: -intensity * 100,
            ease: 'none',
            scrollTrigger: {
              trigger: bandRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          });
        });
      });
    },
    { scope: bandRef },
  );

  return (
    <Band
      $variant={variant}
      $glow={glow ? scheme.glow : 'none'}
      className={className}
      ref={bandRef}
    >
      {glow ? <MeshLayer data-gsap-parallax="0.08" aria-hidden="true" $mesh={scheme.mesh} /> : null}
      {children}
    </Band>
  );
}

export default SectionBand;
