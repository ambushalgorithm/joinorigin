import { theme } from '@joinorigin/design';

/**
 * Landing-specific visual tokens for the JoinOrigin homescreen
 * (design spec sprint-10-menu-anim §3.4).
 *
 * The accent gradient hexes, orbit glow rgba values, conic-gradient stops,
 * and the full-bleed brand mesh are defined here exactly once and reused
 * across all landing components. Every other color/spacing/radius/weight
 * reads from the shared `@joinorigin/design` theme.
 */

/** Brand accent gradient: `#5D7CFF → #9DB4FF` (Origin Spectrum primary → soft). */
export const ACCENT_GRADIENT = `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primarySoft} 100%)`;

/**
 * Full-bleed brand mesh layered over the hero webp (spec §3.4): violet at the
 * top-right, cyan at the bottom-left, indigo mid-canvas — the Origin Spectrum.
 */
export const BRAND_MESH = `radial-gradient(900px at 82% 0%, rgba(139,92,246,0.32), transparent 60%), radial-gradient(760px at 8% 100%, rgba(56,189,248,0.22), transparent 60%), radial-gradient(640px at 55% 55%, rgba(93,124,255,0.16), transparent 70%)`;

/** Conic gradient used for rotating-border CTAs (spec §5.1). */
export const ROTATING_BORDER_GRADIENT = `conic-gradient(from var(--border-angle), ${theme.colors.primary}, ${theme.colors.background}, ${theme.colors.primarySoft}, ${theme.colors.background}, ${theme.colors.primary})`;

/** 1px gradient border used on orbit circles (spec §5.4). */
export const ORBIT_BORDER_GRADIENT = `linear-gradient(180deg, rgba(93,124,255,0) 0%, rgba(93,124,255,1) 43%, rgba(93,124,255,0) 100%)`;

/** Per-orbit avatar glow colors (Origin Spectrum stops, spec §3.4). */
export const ORBIT_GLOWS = {
  orbit1: 'rgba(93,124,255,0.55)',
  orbit2Yellow: 'rgba(245,165,36,0.55)',
  orbit2Pink: 'rgba(244,114,182,0.55)',
  orbit3Pink: 'rgba(244,114,182,0.55)',
  orbit4Blue: 'rgba(93,124,255,0.55)',
  orbit4Orange: 'rgba(245,165,36,0.55)',
} as const;

/** Radial glows layered over the hero background (spec §3.4). */
export const HERO_RADIAL_GLOW_1 = `radial-gradient(600px at 78% 22%, rgba(93,124,255,0.45), transparent 70%)`;
export const HERO_RADIAL_GLOW_2 = `radial-gradient(520px at 10% 90%, rgba(139,92,246,0.32), transparent 70%)`;

/** Bottom vignette on the hero region (spec §3.4). */
export const HERO_VIGNETTE = `linear-gradient(180deg, transparent, rgba(10,16,34,0.6))`;

/** Full-page hero background image (local asset; spec §3). */
export const HERO_BACKGROUND_URL = 'url(/assets/hero/hero-background.webp)';

/** Shared entrance easing curve (spec §7). */
export const ENTRANCE_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
