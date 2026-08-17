'use client';

import { Suspense, useRef } from 'react';
import styled from 'styled-components';

import { PAGE_SCHEMES } from './menuTokens';
import { HeroScene } from './menuPagePrimitives';
import { useSceneMotion } from './motion';
import { SCENE_MAP, type SceneKey } from './scenes/sceneTypes';

/**
 * Menu-page scene art — inline SVG + GSAP (design spec sprint-10-menu-anim
 * §5.5, the TASK-283 icon-spin fix).
 *
 * The 8 scene SVGs are inlined into the DOM as React components so GSAP
 * drives the scene motion in ONE document (the old `<img>`-loaded SVG was a
 * sandboxed document the page could not reach — the ring spun but the icons
 * stayed stagnant). The `.scene-orbit-group` rotation and `.scene-node`
 * counter-rotation were removed in TASK-291 (the orbit cluster kept drifting
 * off-center); the hub float + background ring spin remain.
 *
 * The background ring is now a real `.scene-ring` element (was a CSS `::after`)
 * so GSAP rotates it; no CSS spin keyframes remain.
 */

/** Hero scene wrapper — glow `::before` + GSAP-driven `.scene-ring` element. */
const Scene = styled(HeroScene)`
  .scene-ring {
    position: absolute;
    inset: 12%;
    border-radius: 50%;
    border: 1px solid rgba(93, 124, 255, 0.18);
    box-shadow:
      0 0 0 34px rgba(93, 124, 255, 0.04),
      0 0 0 35px rgba(93, 124, 255, 0.1);
    pointer-events: none;
  }
`;

export interface MenuSceneProps {
  /** Scene key — inline React scene component (replaces the old img src). */
  scene: SceneKey;
  /** Per-page glow mesh (PAGE_SCHEMES[key].glow) painted behind the art. */
  glow?: string;
  /** Accessible name for the decorative scene (usually empty string). */
  alt?: string;
}

export function MenuScene({ scene, glow, alt = '' }: MenuSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const SceneArt = SCENE_MAP[scene];
  const scheme = PAGE_SCHEMES[scene];

  useSceneMotion(rootRef);

  return (
    <Scene $glow={glow} ref={rootRef}>
      {/* background ring becomes a real element (GSAP target; was ::after) */}
      <span className="scene-ring" aria-hidden="true" data-testid="scene-ring" />
      {/*
        Scene art is registered through `next/dynamic` (TASK-404 code-split).
        The Suspense boundary keeps the lazy chunk local: while the scene
        chunk loads, only the decorative scene area suspends — the rest of the
        tree hydrates immediately (no hydration/CLS impact on page content).
      */}
      <Suspense fallback={null}>
        <SceneArt
          alt={alt}
          primary={scheme.primary}
          secondary={scheme.secondary}
          gradient={scheme.gradient}
        />
      </Suspense>
    </Scene>
  );
}

export default MenuScene;
