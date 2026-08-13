'use client';

import { useRef } from 'react';
import styled from 'styled-components';

import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

import { useI18n } from '@joinorigin/i18n';

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
 * GSAP staggered entrance: `data-hero` hooks on each column piece (eyebrow /
 * title wrapper / lead / actions / meta / scene) animate via a single
 * timeline inside `gsap.matchMedia()` under
 * `(prefers-reduced-motion: no-preference)` — reduced-motion users and
 * no-JS/SSR see the final static state (progressive enhancement). The `<h1>`
 * (PageTitle) is animated through its wrapper, never the tag.
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
  min-height: max(${HERO_BAND_MIN_HEIGHT}, 60vh);

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

  @media (max-width: 480px) {
    min-height: 480px;
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
  padding: 72px 64px 48px;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: ${({ theme }) => theme.spacing.xl}px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl}px;
    padding: 64px 32px 32px;
  }

  @media (max-width: 480px) {
    padding: 48px 20px 32px;
  }
`;

const TextColumn = styled.div`
  min-width: 0;
`;

/** Lead is max-width 640px inside the hero (spec §4.1), vs 720px elsewhere. */
const HeroLead = styled(PageLead)`
  max-width: 640px;
`;

/** Hero CTA + optional stat meta. */
const Actions = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg}px;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  flex-wrap: wrap;
  flex-direction: column;
`;

const SceneColumn = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 0;

  @media (max-width: 1024px) {
    justify-content: center;
    max-width: 320px;
    margin: 0 auto;
  }
`;

export function MenuHero({
  eyebrow,
  title,
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
  const pageScheme = PAGE_SCHEMES[accent];

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
            <PageTitle>{title}</PageTitle>
          </div>
          {lead ? (
            <div data-hero="lead">
              <HeroLead>{lead}</HeroLead>
            </div>
          ) : null}
          {cta || meta?.stat ? (
            <div data-hero="actions">
              <Actions>
                {cta ? <HeroCta variant={cta.variant} label={cta.label} href={cta.href} /> : null}
                {meta?.stat ? (
                  <CountUpStat
                    valueText={t('community.joinStatValue')}
                    label={t('community.joinStatLabel')}
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
