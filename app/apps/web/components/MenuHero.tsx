'use client';

import { useRef } from 'react';
import styled from 'styled-components';

import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

import { useI18n } from '@joinorigin/i18n';

import { useLocalizePath } from '../lib/seo/localePath';
import CountUpStat from './CountUpStat';
import HeroCta from './HeroCta';
import MenuScene from './MenuScene';
import {
  DEFAULT_ACCENT,
  HERO_BAND_MIN_HEIGHT,
  MENU_AMBIENT_URL,
  MENU_GRID_URL,
  PAGE_SCHEMES,
  type PageAccentKey,
} from './menuTokens';
import { Eyebrow, PageLead, PageTitle } from './menuPagePrimitives';
import { HERO_STAGGER } from './motion';
import TrustRow from './TrustRow';
import type { SceneKey } from './scenes/sceneTypes';

/**
 * Menu-page hero band (spec sprint-8 §4.1, extended sprint-10 §4.1,
 * GSAP elevation sprint-10-menu-anim §5.4).
 *
 * Homepage-atmosphere hero: full-width band with the ambient webp texture
 * (mix-blend screen at 0.5), a tiled dot grid, the per-page radial glow plus
 * a fixed cool bottom-left glow, and a bottom vignette melting into the page
 * body. Two columns on desktop: eyebrow + H1 + lead + hero CTA (+ optional
 * social-proof meta) on the left; the upgraded inline scene art on the right.
 *
 * Sprint 22 Story A (mobile-first): base styles target the researched 320px
 * minimum viewport (TASK-526) — single-column content, compact band
 * min-height, mobile typography (via PageTitle), and full-width stacked
 * CTA/stat with the TrustRow below; every larger breakpoint is a
 * `min-width` enhancement at `theme.breakpoints` (mobile 480 / desktop
 * 1024). Below 320px the fluid layout degrades gracefully (D2) — nothing is
 * hidden behind a sub-320 query.
 *
 * Sprint 22 Story B (reduced-motion): the GSAP staggered entrance is gated
 * behind `gsap.matchMedia()` under `(prefers-reduced-motion: no-preference)`
 * — `data-hero` hooks on each column piece (eyebrow / title wrapper / lead /
 * actions / meta / scene) animate via a single timeline ONLY for users who
 * do not prefer reduced motion; reduced-motion users, no-JS, and SSR all see
 * the final static state instantly (progressive enhancement, `fromTo()`
 * never hides content by CSS alone). The `<h1>` (PageTitle) is animated
 * through its wrapper, never the tag.
 *
 * Semantics: a `section` (NOT a `header` — the sticky top nav `Header` is the
 * only `header` landmark per arch §5.1). The scene is decorative
 * (`aria-hidden`).
 */

export interface MenuHeroProps {
  /** Small uppercase brand tag above the H1, e.g. "Core objects". */
  eyebrow?: string;
  /** Exact page H1 (unchanged strings — spec §6 copy table). Rendered as <h1>. */
  title: string;
  /** Optional i18n key for the H1 — when set, the H1 resolves through the
   *  active locale dictionary (so it re-translates when the language
   *  toggles) instead of the raw `title` string (TASK-477). */
  titleKey?: string;
  /** Interpolation variables for `titleKey` (e.g. `{{city}}`). */
  titleVars?: Record<string, string | number>;
  /** Lead paragraph (verbatim page-lead copy). */
  lead?: React.ReactNode;
  /** Scene key — inline React scene component (was a local SVG path). */
  scene?: SceneKey;
  /** Accessible name for the decorative scene (usually empty string). */
  sceneAlt?: string;
  /** Page accent key from menuTokens (glow color). */
  accent?: PageAccentKey;
  /** Hero-level join CTA (omit on /contact — the form is the CTA). */
  cta?: {
    variant: 'waitlist' | 'contact';
    label: string;
    href?: string;
  };
  /** Optional social-proof meta below the lead: trust avatars and/or stat. */
  meta?: {
    avatars?: boolean;
    stat?: boolean;
  };
  /** Ambient hero atmosphere. Default true (§4.1). */
  ambient?: boolean;
}

const Hero = styled.section<{ $ambient: boolean; $glow: string }>`
  position: relative;
  overflow: hidden;
  /* Mobile-first base (320px floor): a fixed 480px band minimum keeps the
     stacked CTA/trust content breathing room on small screens (Story A).
     From the first enhancement breakpoint upward the desktop spec floor
     applies. */
  min-height: 480px;

  /* Layer 1: ambient texture (pointer-events: none, aria-hidden) */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${MENU_AMBIENT_URL} center / cover no-repeat;
    opacity: ${({ $ambient }) => ($ambient ? 0.5 : 0)};
    mix-blend-mode: screen;
    pointer-events: none;
  }

  /* Layer 3+4: per-page glow + fixed cool glow + bottom vignette */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      ${({ $glow }) => $glow},
      radial-gradient(500px at 12% 88%, rgba(139, 92, 246, 0.1), transparent 70%),
      linear-gradient(180deg, transparent, rgba(10, 16, 34, 0.85));
    pointer-events: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    min-height: max(${HERO_BAND_MIN_HEIGHT}, 60vh);
  }
`;

/** Layer 2: tiled dot grid (§4.1). */
const GridLayer = styled.div<{ $ambient: boolean }>`
  position: absolute;
  inset: 0;
  background-image: ${MENU_GRID_URL};
  background-size: 88px 88px;
  opacity: ${({ $ambient }) => ($ambient ? 0.5 : 0)};
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl}px;
  align-items: center;
  padding: 48px 20px 32px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding: 64px 32px 32px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    padding: 72px 64px 48px;
  }
`;

const TextColumn = styled.div`
  min-width: 0;
`;

/** Lead is max-width 640px inside the hero (spec §4.1), vs 720px elsewhere. */
const HeroLead = styled(PageLead)`
  max-width: 640px;
`;

/** Hero CTA + optional stat meta. Mobile-first (Story A): on the 320px floor
 *  the CTA and stat pill stretch to the full content width and stack (the
 *  stat's long label wraps rather than overflowing the viewport); from the
 *  first enhancement breakpoint upward items return to natural width. */
const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.lg}px;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    align-items: flex-start;
    flex-wrap: wrap;
  }
`;

const SceneColumn = styled.div`
  display: flex;
  justify-content: center;
  max-width: 320px;
  margin: 0 auto;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    justify-content: flex-end;
    max-width: none;
    margin: 0;
  }
`;

export function MenuHero({
  eyebrow,
  title,
  titleKey,
  titleVars,
  lead,
  scene,
  sceneAlt = '',
  accent = DEFAULT_ACCENT,
  cta,
  meta,
  ambient = true,
}: MenuHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { t } = useI18n();
  const localizePath = useLocalizePath();
  const pageScheme = PAGE_SCHEMES[accent];
  // TASK-477 — when a `titleKey` is provided the H1 resolves through the
  // active locale dictionary so it re-translates on language toggle; the raw
  // `title` string remains the pre-hydration/SSR fallback.
  const resolvedTitle = titleKey ? t(titleKey, titleVars ?? {}) : title;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(heroRef);
        // Only animate elements that exist — GSAP warns on empty targets
        // (e.g. no scene / no meta), which would spam the console.
        const has = (attr: string) => q(`[data-hero="${attr}"]`).length > 0;
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (has('eyebrow')) {
          tl.fromTo(
            q('[data-hero="eyebrow"]'),
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            HERO_STAGGER.eyebrow,
          );
        }
        if (has('title')) {
          tl.fromTo(
            q('[data-hero="title"]'),
            { autoAlpha: 0, y: 32 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            HERO_STAGGER.title,
          );
        }
        if (has('lead')) {
          tl.fromTo(
            q('[data-hero="lead"]'),
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            HERO_STAGGER.lead,
          );
        }
        if (has('actions')) {
          tl.fromTo(
            q('[data-hero="actions"]'),
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            HERO_STAGGER.actions,
          );
        }
        if (has('meta')) {
          tl.fromTo(
            q('[data-hero="meta"]'),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            HERO_STAGGER.meta,
          );
        }
        if (has('scene')) {
          tl.fromTo(
            q('[data-hero="scene"]'),
            { autoAlpha: 0, scale: 0.94 },
            { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
            HERO_STAGGER.scene,
          );
        }
      });
    },
    { scope: heroRef },
  );

  return (
    <Hero $ambient={ambient} $glow={pageScheme.glow} data-testid="menu-hero" ref={heroRef}>
      <GridLayer $ambient={ambient} aria-hidden="true" />
      <Content>
        <TextColumn>
          {eyebrow ? (
            <div data-hero="eyebrow">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          ) : null}
          <div data-hero="title">
            <PageTitle>{resolvedTitle}</PageTitle>
          </div>
          {lead ? (
            <div data-hero="lead">
              <HeroLead>{lead}</HeroLead>
            </div>
          ) : null}
          {cta || meta?.stat ? (
            <div data-hero="actions">
              <Actions>
                {cta ? (
                  <HeroCta
                    variant={cta.variant}
                    label={cta.label}
                    href={cta.href ? localizePath(cta.href) : undefined}
                  />
                ) : null}
                {meta?.stat ? (
                  <CountUpStat
                    valueText={t('network.joinStatValue')}
                    label={t('network.joinStatLabel')}
                  />
                ) : null}
              </Actions>
            </div>
          ) : null}
          {meta?.avatars ? (
            <div data-hero="meta">
              <TrustRow />
            </div>
          ) : null}
        </TextColumn>
        {scene ? (
          <div data-hero="scene">
            <SceneColumn>
              <MenuScene scene={scene} glow={pageScheme.glow} alt={sceneAlt} />
            </SceneColumn>
          </div>
        ) : null}
      </Content>
    </Hero>
  );
}

export default MenuHero;
