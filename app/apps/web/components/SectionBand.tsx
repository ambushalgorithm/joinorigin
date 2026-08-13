'use client';

import styled from 'styled-components';

import { DEFAULT_ACCENT, PAGE_ACCENTS, type PageAccentKey } from './menuTokens';
import { SECTION_BAND_BORDER, SECTION_BAND_GLASS } from './menuTokens';

/**
 * Glass section band (spec sprint-10-menu-redesign §4.7).
 *
 * Gives the menu-page body rhythm: sections alternate between plain canvas
 * and full-bleed glass bands (blurred, bordered). The band extends
 * edge-to-edge; the inner content keeps its own `PageContainer` max-width.
 *
 * - `variant="glass"` (default): `backdrop-filter` blur + hairline
 *   `border-block` + translucent surface.
 * - `variant="plain"`: transparent canvas (no band styling).
 * - `glow`: paints a faint per-page glow `::before` (same
 *   `PAGE_ACCENTS[accent].glow` at 0.5 opacity) — views enable it only on the
 *   FIRST glass band for wayfinding.
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
  /** Paint the faint per-page glow behind this band (first glass band only). */
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

export function SectionBand({
  children,
  variant = 'glass',
  accent = DEFAULT_ACCENT,
  glow = false,
  className,
}: SectionBandProps) {
  return (
    <Band
      $variant={variant}
      $glow={glow ? PAGE_ACCENTS[accent].glow : 'none'}
      className={className}
    >
      {children}
    </Band>
  );
}

export default SectionBand;
