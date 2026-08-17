'use client';

import dynamic from 'next/dynamic';
import type { ComponentType, SVGProps } from 'react';

/**
 * Inline scene SVG registry (design spec sprint-10-menu-anim §5.2).
 *
 * The 8 menu-page scene SVGs are inlined into the DOM as React components so
 * GSAP drives all orbit/float/ring motion from the page document — the
 * `<img>`-sandboxed-SVG spin mismatch is fixed (TASK-283 gap).
 *
 * Code-splitting (TASK-404): each scene is registered through `next/dynamic`
 * so a menu page only downloads the scene chunk it renders instead of all 8
 * SVG components. `ssr: true` (default) keeps the scene in the initial SSR
 * HTML — no FOUC — while the client JS for that one scene is fetched on
 * demand.
 */

export type SceneKey =
  'features' | 'community' | 'docs' | 'about' | 'contact' | 'privacy' | 'terms' | 'notFound';

export type SceneProps = SVGProps<SVGSVGElement> & {
  /** Decorative scenes must stay aria-hidden (alt=""/aria-hidden contract). */
  'aria-hidden'?: boolean;
  /** Accessible name for the decorative scene (usually empty string). */
  alt?: string;
  /** Page scheme primary hue (recolors art strokes/fills). */
  primary?: string;
  /** Page scheme secondary hue (recolors icon strokes, node rings). */
  secondary?: string;
  /** Linear gradient string for hub fills (falls back to primary → secondary). */
  gradient?: string;
};

export const SCENE_MAP: Record<SceneKey, ComponentType<SceneProps>> = {
  features: dynamic(() => import('./FeaturesScene')),
  community: dynamic(() => import('./CommunityScene')),
  docs: dynamic(() => import('./DocsScene')),
  about: dynamic(() => import('./AboutScene')),
  contact: dynamic(() => import('./ContactScene')),
  privacy: dynamic(() => import('./PrivacyScene')),
  terms: dynamic(() => import('./TermsScene')),
  notFound: dynamic(() => import('./NotFoundScene')),
};

/**
 * GSAP motion hook targets (spec §5.3, TASK-291):
 * - `.scene-orbit-group` is STATIC + centered (orbit rotation removed — the
 *   cluster kept drifting off-center despite the TASK-290 pivot pin)
 * - `.scene-main-group` floats (yoyo)
 * - `.scene-ring` counter-spins (60s, rendered by `MenuScene`)
 * The `.scene-node` counter-rotation was removed together with the orbit spin
 * (it existed only to keep icon glyphs upright while the orbit group rotated).
 */
