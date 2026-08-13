/**
 * Menu-page accent system — "Origin Spectrum" per-page identity schemes
 * (design spec sprint-10-menu-anim §3.3).
 *
 * Every menu page owns a primary + secondary hue, a linear gradient, a
 * layered radial glow mesh (hero band), a full-bleed mesh (section
 * bands/body), and scene accents. All glow/mesh values are defined here
 * exactly once and reused by `MenuHero`, `HeroScene`, `MenuScene`, and the
 * inline scene SVGs.
 */

export type PageAccentKey =
  'features' | 'community' | 'docs' | 'about' | 'contact' | 'privacy' | 'terms' | 'notFound';

export interface PageScheme {
  key: PageAccentKey;
  /** Display identity name (docs only). */
  identity: string;
  /** Page primary hue (hero CTAs, ticks, borders, scene accent). */
  primary: string;
  /** Page secondary hue (mesh counter-stop, scene accent alt). */
  secondary: string;
  /** Linear gradient built from primary → secondary (ticks, links, text-clip). */
  gradient: string;
  /** Layered radial mesh behind the hero scene (bolder than old glow). */
  glow: string;
  /** Full-bleed gradient mesh for section bands / body ambient. */
  mesh: string;
  /** Dominant accent inside the inline scene art. */
  sceneAccent: string;
  /** Secondary scene accent. */
  sceneAccentAlt?: string;
}

/**
 * Per-page identity schemes (spec §3.3 table). `glow` is applied as a
 * `::before` on the scene wrapper (`pointer-events: none`); `mesh` is applied
 * as a real `meshLayer` element so GSAP parallax can target it.
 */
export const PAGE_SCHEMES: Record<PageAccentKey, PageScheme> = {
  features: {
    key: 'features',
    identity: 'Blue',
    primary: '#5D7CFF',
    secondary: '#38BDF8',
    gradient: 'linear-gradient(135deg, #5D7CFF, #38BDF8)',
    glow: 'radial-gradient(560px at 78% 20%, rgba(93,124,255,0.5), transparent 70%), radial-gradient(460px at 18% 88%, rgba(56,189,248,0.32), transparent 70%)',
    mesh: 'radial-gradient(720px at 85% 8%, rgba(93,124,255,0.28), transparent 65%), radial-gradient(640px at 8% 92%, rgba(56,189,248,0.18), transparent 65%)',
    sceneAccent: '#5D7CFF',
    sceneAccentAlt: '#38BDF8',
  },
  community: {
    key: 'community',
    identity: 'Amber',
    primary: '#F5A524',
    secondary: '#FF8A3D',
    gradient: 'linear-gradient(135deg, #F5A524, #FF8A3D)',
    glow: 'radial-gradient(560px at 78% 20%, rgba(245,165,36,0.5), transparent 70%), radial-gradient(460px at 18% 88%, rgba(255,138,61,0.3), transparent 70%)',
    mesh: 'radial-gradient(720px at 85% 8%, rgba(245,165,36,0.26), transparent 65%), radial-gradient(640px at 8% 92%, rgba(255,138,61,0.16), transparent 65%)',
    sceneAccent: '#F5A524',
    sceneAccentAlt: '#FF8A3D',
  },
  docs: {
    key: 'docs',
    identity: 'Sky',
    primary: '#4C9AFF',
    secondary: '#7CC7FF',
    gradient: 'linear-gradient(135deg, #4C9AFF, #7CC7FF)',
    glow: 'radial-gradient(560px at 78% 20%, rgba(76,154,255,0.5), transparent 70%), radial-gradient(460px at 18% 88%, rgba(124,199,255,0.32), transparent 70%)',
    mesh: 'radial-gradient(720px at 85% 8%, rgba(76,154,255,0.26), transparent 65%), radial-gradient(640px at 8% 92%, rgba(124,199,255,0.16), transparent 65%)',
    sceneAccent: '#4C9AFF',
    sceneAccentAlt: '#7CC7FF',
  },
  about: {
    key: 'about',
    identity: 'Violet',
    primary: '#8B5CF6',
    secondary: '#C084FC',
    gradient: 'linear-gradient(135deg, #8B5CF6, #C084FC)',
    glow: 'radial-gradient(560px at 78% 20%, rgba(139,92,246,0.5), transparent 70%), radial-gradient(460px at 18% 88%, rgba(192,132,252,0.32), transparent 70%)',
    mesh: 'radial-gradient(720px at 85% 8%, rgba(139,92,246,0.28), transparent 65%), radial-gradient(640px at 8% 92%, rgba(192,132,252,0.18), transparent 65%)',
    sceneAccent: '#8B5CF6',
    sceneAccentAlt: '#C084FC',
  },
  contact: {
    key: 'contact',
    identity: 'Teal',
    primary: '#2DD4BF',
    secondary: '#22D3EE',
    gradient: 'linear-gradient(135deg, #2DD4BF, #22D3EE)',
    glow: 'radial-gradient(560px at 78% 20%, rgba(45,212,191,0.45), transparent 70%), radial-gradient(460px at 18% 88%, rgba(34,211,238,0.3), transparent 70%)',
    mesh: 'radial-gradient(720px at 85% 8%, rgba(45,212,191,0.24), transparent 65%), radial-gradient(640px at 8% 92%, rgba(34,211,238,0.16), transparent 65%)',
    sceneAccent: '#2DD4BF',
    sceneAccentAlt: '#22D3EE',
  },
  privacy: {
    key: 'privacy',
    identity: 'Green',
    primary: '#30A46C',
    secondary: '#4ADE80',
    gradient: 'linear-gradient(135deg, #30A46C, #4ADE80)',
    glow: 'radial-gradient(560px at 78% 20%, rgba(48,164,108,0.45), transparent 70%), radial-gradient(460px at 18% 88%, rgba(74,222,128,0.3), transparent 70%)',
    mesh: 'radial-gradient(720px at 85% 8%, rgba(48,164,108,0.24), transparent 65%), radial-gradient(640px at 8% 92%, rgba(74,222,128,0.16), transparent 65%)',
    sceneAccent: '#30A46C',
    sceneAccentAlt: '#4ADE80',
  },
  terms: {
    key: 'terms',
    identity: 'Indigo',
    primary: '#60A5FA',
    secondary: '#818CF8',
    gradient: 'linear-gradient(135deg, #60A5FA, #818CF8)',
    glow: 'radial-gradient(560px at 78% 20%, rgba(96,165,250,0.45), transparent 70%), radial-gradient(460px at 18% 88%, rgba(129,140,248,0.3), transparent 70%)',
    mesh: 'radial-gradient(720px at 85% 8%, rgba(96,165,250,0.24), transparent 65%), radial-gradient(640px at 8% 92%, rgba(129,140,248,0.16), transparent 65%)',
    sceneAccent: '#60A5FA',
    sceneAccentAlt: '#818CF8',
  },
  notFound: {
    key: 'notFound',
    identity: 'Rose',
    primary: '#F43F5E',
    secondary: '#F472B6',
    gradient: 'linear-gradient(135deg, #F43F5E, #F472B6)',
    glow: 'radial-gradient(480px at 50% 35%, rgba(244,63,94,0.5), transparent 70%), radial-gradient(420px at 72% 78%, rgba(244,114,182,0.3), transparent 70%)',
    mesh: 'radial-gradient(560px at 50% 30%, rgba(244,63,94,0.26), transparent 65%), radial-gradient(480px at 75% 80%, rgba(244,114,182,0.16), transparent 65%)',
    sceneAccent: '#F43F5E',
    sceneAccentAlt: '#F472B6',
  },
} as const;

/** Legacy accent interface kept for backwards compatibility during the FE
 *  migration (spec §3.3). New code should consume `PAGE_SCHEMES`. */
export interface PageAccent {
  /** Radial gradient layered behind the hero scene (glow). */
  glow: string;
  /** Dominant accent hue inside the scene art (SVG stroke/fill). */
  sceneAccent: string;
  /** Secondary accent hue. */
  sceneAccentAlt?: string;
}

/** Compatibility export derived from `PAGE_SCHEMES` (spec §3.3). */
export const PAGE_ACCENTS: Record<PageAccentKey, PageAccent> = {
  features: {
    glow: PAGE_SCHEMES.features.glow,
    sceneAccent: PAGE_SCHEMES.features.primary,
    sceneAccentAlt: PAGE_SCHEMES.features.secondary,
  },
  community: {
    glow: PAGE_SCHEMES.community.glow,
    sceneAccent: PAGE_SCHEMES.community.primary,
    sceneAccentAlt: PAGE_SCHEMES.community.secondary,
  },
  docs: {
    glow: PAGE_SCHEMES.docs.glow,
    sceneAccent: PAGE_SCHEMES.docs.primary,
    sceneAccentAlt: PAGE_SCHEMES.docs.secondary,
  },
  about: {
    glow: PAGE_SCHEMES.about.glow,
    sceneAccent: PAGE_SCHEMES.about.primary,
    sceneAccentAlt: PAGE_SCHEMES.about.secondary,
  },
  contact: {
    glow: PAGE_SCHEMES.contact.glow,
    sceneAccent: PAGE_SCHEMES.contact.primary,
    sceneAccentAlt: PAGE_SCHEMES.contact.secondary,
  },
  privacy: {
    glow: PAGE_SCHEMES.privacy.glow,
    sceneAccent: PAGE_SCHEMES.privacy.primary,
    sceneAccentAlt: PAGE_SCHEMES.privacy.secondary,
  },
  terms: {
    glow: PAGE_SCHEMES.terms.glow,
    sceneAccent: PAGE_SCHEMES.terms.primary,
    sceneAccentAlt: PAGE_SCHEMES.terms.secondary,
  },
  notFound: {
    glow: PAGE_SCHEMES.notFound.glow,
    sceneAccent: PAGE_SCHEMES.notFound.primary,
    sceneAccentAlt: PAGE_SCHEMES.notFound.secondary,
  },
};

/** Default accent used when a page does not declare one. */
export const DEFAULT_ACCENT: PageAccentKey = 'features';

/* ---------------------------------------------------------------------------
 * Homepage-atmosphere tokens (spec sprint-10-menu-redesign §5.1).
 * ------------------------------------------------------------------------- */

/** Full-page ambient texture behind every menu-page hero band (§4.1 layer 1). */
export const MENU_AMBIENT_URL = 'url(/assets/menu/menu-ambient.webp)';

/** Dot-grid tile layered over the hero band (§4.1 layer 2). */
export const MENU_GRID_URL = 'url(/assets/menu/hero-grid.svg)';

/** Minimum hero band height (desktop, spec §4.1). */
export const HERO_BAND_MIN_HEIGHT = '560px';

/** Glass section band background (§4.7) — indigo-tinted (spec §3.3). */
export const SECTION_BAND_GLASS = 'rgba(20, 29, 60, 0.55)';

/** Glass section band border (§4.7) — indigo-tinted (spec §3.3). */
export const SECTION_BAND_BORDER = 'rgba(44, 58, 110, 0.5)';

/** Chip marquee loop duration (§4.6). */
export const CHIP_MARQUEE_DURATION = '28s';
