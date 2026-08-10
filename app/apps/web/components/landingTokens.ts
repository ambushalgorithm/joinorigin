import { theme } from '@joinorigin/design';

/**
 * Landing-specific visual tokens for the JoinOrigin homescreen.
 *
 * Per the design spec (§10.3), the accent gradient hexes, orbit glow rgba
 * values, and conic-gradient stops are defined here exactly once and reused
 * across all landing components. Every other color/spacing/radius/weight
 * reads from the shared `@joinorigin/design` theme.
 */

/** Brand accent gradient: `#4F7DF9 → #8AB4FF` (spec §2.2). */
export const ACCENT_GRADIENT = `linear-gradient(135deg, ${theme.colors.primary} 0%, #8AB4FF 100%)`;

/** Conic gradient used for rotating-border CTAs (spec §5.1). */
export const ROTATING_BORDER_GRADIENT = `conic-gradient(from var(--border-angle), ${theme.colors.primary}, ${theme.colors.background}, #8AB4FF, ${theme.colors.background}, ${theme.colors.primary})`;

/** 1px gradient border used on orbit circles (spec §5.4). */
export const ORBIT_BORDER_GRADIENT = `linear-gradient(180deg, rgba(79,125,249,0) 0%, rgba(79,125,249,1) 43%, rgba(79,125,249,0) 100%)`;

/** Per-orbit avatar glow colors (spec §5.4). */
export const ORBIT_GLOWS = {
  orbit1: 'rgba(79,125,249,0.5)',
  orbit2Yellow: 'rgba(245,165,36,0.45)',
  orbit2Pink: 'rgba(229,72,77,0.45)',
  orbit3Pink: 'rgba(229,72,77,0.45)',
  orbit4Blue: 'rgba(79,125,249,0.5)',
  orbit4Orange: 'rgba(245,165,36,0.5)',
} as const;

/** Radial glows layered over the hero background (spec §5.2). */
export const HERO_RADIAL_GLOW_1 = `radial-gradient(600px at 78% 22%, rgba(79,125,249,0.22), transparent 70%)`;
export const HERO_RADIAL_GLOW_2 = `radial-gradient(500px at 12% 88%, rgba(138,180,255,0.12), transparent 70%)`;

/** Bottom vignette on the hero region (spec §5.2). */
export const HERO_VIGNETTE = `linear-gradient(180deg, transparent, rgba(15,17,21,0.6))`;

/** Full-page hero background image (local asset; spec §3). */
export const HERO_BACKGROUND_URL = 'url(/assets/hero/hero-background.webp)';

/** Shared entrance easing curve (spec §7). */
export const ENTRANCE_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
