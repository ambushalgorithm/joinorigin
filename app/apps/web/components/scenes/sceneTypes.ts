import type { ComponentType, SVGProps } from 'react';

import FeaturesScene from './FeaturesScene';
import CommunityScene from './CommunityScene';
import DocsScene from './DocsScene';
import AboutScene from './AboutScene';
import ContactScene from './ContactScene';
import PrivacyScene from './PrivacyScene';
import TermsScene from './TermsScene';
import NotFoundScene from './NotFoundScene';

/**
 * Inline scene SVG registry (design spec sprint-10-menu-anim §5.2).
 *
 * The 8 menu-page scene SVGs are inlined into the DOM as React components so
 * GSAP drives all orbit/float/ring motion from the page document — the
 * `<img>`-sandboxed-SVG spin mismatch is fixed (TASK-283 gap).
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
  features: FeaturesScene,
  community: CommunityScene,
  docs: DocsScene,
  about: AboutScene,
  contact: ContactScene,
  privacy: PrivacyScene,
  terms: TermsScene,
  notFound: NotFoundScene,
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
