'use client';

import styled, { keyframes } from 'styled-components';

import { HeroScene } from './menuPagePrimitives';

/**
 * Upgraded menu-page scene art (spec sprint-10-menu-redesign §4.2).
 *
 * Keeps the Sprint 8 loading mechanism — a plain `<img>` of the local SVG
 * (`next/image` is not used for SVGs) — and adds:
 *  - the per-page glow painted behind the art (`::before`, unchanged
 *    `HeroScene` behavior),
 *  - a faint decorative orbit ring (`::after`, 1px border, 60s
 *    counter-rotating spin) for ambient life.
 *
 * The float/orbit animation itself lives INSIDE the SVG files (an `<img>`
 * SVG is a separate document, so page CSS cannot reach its groups; the SVG's
 * own embedded `<style>` animates `[data-scene]` groups and honors
 * `prefers-reduced-motion`). The global reduced-motion kill-switch in
 * `MenuPageShell` also collapses the wrapper ring.
 */

const ringSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

/** Hero scene wrapper — glow `::before` + orbit ring `::after` (§4.2). */
const Scene = styled(HeroScene)`
  &::after {
    content: '';
    position: absolute;
    inset: 12%;
    border-radius: 50%;
    border: 1px solid rgba(79, 125, 249, 0.18);
    box-shadow:
      0 0 0 34px rgba(79, 125, 249, 0.04),
      0 0 0 35px rgba(79, 125, 249, 0.1);
    pointer-events: none;
    animation: ${ringSpin} 60s linear infinite;
  }
`;

export interface MenuSceneProps {
  /** Local SVG scene path, e.g. '/assets/menu/scenes/features-scene.svg'. */
  src: string;
  /** Per-page radial glow (PAGE_ACCENTS[key].glow) painted behind the art. */
  glow?: string;
  /** Accessible name for the decorative scene (usually empty string). */
  alt?: string;
}

export function MenuScene({ src, glow, alt = '' }: MenuSceneProps) {
  return (
    <Scene $glow={glow}>
      <img
        src={src}
        alt={alt}
        aria-hidden="true"
        width={560}
        height={420}
        data-testid="menu-hero-scene"
      />
    </Scene>
  );
}

export default MenuScene;
