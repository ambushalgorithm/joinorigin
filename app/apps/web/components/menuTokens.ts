import { ACCENT_GRADIENT } from './landingTokens';

/**
 * Menu-page accent system (design spec sprint-8-menu-redesign §2.2).
 *
 * Each menu page gets a hero glow (subtle radial color behind the scene art)
 * and a scene accent (inside the SVG). Primary blue stays dominant — the
 * per-page accent is a restrained tint for wayfinding, never a competing UI
 * color. All glow/accent values are defined here exactly once and reused by
 * `MenuHero`, `HeroScene`, and the scene SVGs.
 */

export type PageAccentKey =
  'features' | 'community' | 'docs' | 'about' | 'contact' | 'privacy' | 'terms' | 'notFound';

export interface PageAccent {
  /** Radial gradient layered behind the hero scene (glow, spec §2.2). */
  glow: string;
  /** Dominant accent hue inside the scene art (SVG stroke/fill). */
  sceneAccent: string;
  /** Secondary accent hue (community adds warm `#F5A524` nodes). */
  sceneAccentAlt?: string;
}

/**
 * Per-page glow + scene accent palette (spec §2.2 table). The `glow` value is
 * applied as a `::before` on the scene wrapper (`pointer-events: none`) so it
 * never blocks content and never requires a real image.
 */
export const PAGE_ACCENTS: Record<PageAccentKey, PageAccent> = {
  features: {
    glow: 'radial-gradient(560px at 78% 20%, rgba(79,125,249,0.22), transparent 70%)',
    sceneAccent: ACCENT_GRADIENT,
  },
  community: {
    glow: 'radial-gradient(560px at 78% 20%, rgba(245,165,36,0.14), transparent 70%), radial-gradient(560px at 78% 20%, rgba(79,125,249,0.12), transparent 70%)',
    sceneAccent: '#4F7DF9',
    sceneAccentAlt: '#F5A524',
  },
  docs: {
    glow: 'radial-gradient(560px at 78% 20%, rgba(138,180,255,0.16), transparent 70%)',
    sceneAccent: '#8AB4FF',
  },
  about: {
    glow: 'radial-gradient(560px at 78% 20%, rgba(79,125,249,0.20), transparent 70%)',
    sceneAccent: ACCENT_GRADIENT,
  },
  contact: {
    glow: 'radial-gradient(560px at 78% 20%, rgba(79,125,249,0.18), transparent 70%)',
    sceneAccent: '#8AB4FF',
  },
  privacy: {
    glow: 'radial-gradient(560px at 78% 20%, rgba(48,164,108,0.12), transparent 70%)',
    sceneAccent: '#30A46C',
  },
  terms: {
    glow: 'radial-gradient(560px at 78% 20%, rgba(138,180,255,0.10), transparent 70%)',
    sceneAccent: '#8AB4FF',
  },
  notFound: {
    glow: 'radial-gradient(480px at 50% 35%, rgba(79,125,249,0.16), transparent 70%)',
    sceneAccent: '#4F7DF9',
  },
} as const;

/** Default accent used when a page does not declare one. */
export const DEFAULT_ACCENT: PageAccentKey = 'features';
