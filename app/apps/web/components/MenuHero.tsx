'use client';

import styled, { css, keyframes } from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import CountUpStat from './CountUpStat';
import HeroCta from './HeroCta';
import MenuScene from './MenuScene';
import {
  DEFAULT_ACCENT,
  HERO_BAND_MIN_HEIGHT,
  MENU_AMBIENT_URL,
  MENU_GRID_URL,
  PAGE_ACCENTS,
  type PageAccentKey,
} from './menuTokens';
import { Eyebrow, PageLead, PageTitle } from './menuPagePrimitives';
import { EASE, useEntrance } from './motion';
import TrustRow from './TrustRow';

/**
 * Menu-page hero band (spec sprint-8 §4.1, extended sprint-10 §4.1).
 *
 * Homepage-atmosphere hero: full-width band with the ambient webp texture
 * (mix-blend screen at 0.5), a tiled dot grid, the per-page radial glow plus
 * a fixed cool bottom-left glow, and a bottom vignette melting into the page
 * body. Two columns on desktop: eyebrow + H1 + lead + hero CTA (+ optional
 * social-proof meta) on the left; the upgraded scene art on the right.
 *
 * The H1 reuses the existing `PageTitle` visual style so every menu page
 * still renders exactly one `<h1>` (pages pass their current PageHeader block
 * content through the `hero` prop of `MenuPageShell`). `HeroCta` renders a
 * `<button>` (opens the shared waitlist modal) or an `<a href="/contact">`
 * on legal pages; `TrustRow` / stat meta add no headings.
 *
 * Semantics: a `section` (NOT a `header` — the sticky top nav `Header` is the
 * only `header` landmark per arch §5.1). The scene is decorative
 * (`alt=""` + `aria-hidden="true"`).
 */

export interface MenuHeroProps {
  /** Small uppercase brand tag above the H1, e.g. "Core objects". */
  eyebrow?: string;
  /** Exact page H1 (unchanged strings — spec §6 copy table). Rendered as <h1>. */
  title: string;
  /** Lead paragraph (verbatim page-lead copy). */
  lead?: React.ReactNode;
  /** Local SVG scene path, e.g. '/assets/menu/scenes/features-scene.svg'. */
  scene?: string;
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

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.94);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

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
      radial-gradient(500px at 12% 88%, rgba(138, 180, 255, 0.1), transparent 70%),
      linear-gradient(180deg, transparent, rgba(15, 17, 21, 0.85));
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

const TextColumn = styled.div<{ $entered: boolean }>`
  min-width: 0;
  animation: ${({ $entered }) =>
    $entered
      ? css`
          ${fadeUp} 0.8s ${EASE} both
        `
      : 'none'};
`;

/** Lead is max-width 640px inside the hero (spec §4.1), vs 720px elsewhere. */
const HeroLead = styled(PageLead)`
  max-width: 640px;
`;

/** Hero CTA + optional stat meta — delayed +0.15s (spec §7). */
const Actions = styled.div<{ $entered: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  flex-wrap: wrap;
  animation: ${({ $entered }) =>
    $entered
      ? css`
          ${fadeUp} 0.8s ${EASE} 0.15s both
        `
      : 'none'};
`;

const SceneColumn = styled.div<{ $entered: boolean }>`
  display: flex;
  justify-content: flex-end;
  min-width: 0;
  animation: ${({ $entered }) =>
    $entered
      ? css`
          ${scaleIn} 1.1s ${EASE} both
        `
      : 'none'};

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
  const entered = useEntrance();
  const { t } = useI18n();
  const pageAccent = PAGE_ACCENTS[accent];

  return (
    <Hero $ambient={ambient} $glow={pageAccent.glow} data-testid="menu-hero">
      <GridLayer $ambient={ambient} aria-hidden="true" />
      <Content>
        <TextColumn $entered={entered}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <PageTitle>{title}</PageTitle>
          {lead ? <HeroLead>{lead}</HeroLead> : null}
          {cta || meta?.stat ? (
            <Actions $entered={entered}>
              {cta ? <HeroCta variant={cta.variant} label={cta.label} href={cta.href} /> : null}
              {meta?.stat ? (
                <CountUpStat
                  valueText={t('community.joinStatValue')}
                  label={t('community.joinStatLabel')}
                />
              ) : null}
            </Actions>
          ) : null}
          {meta?.avatars ? <TrustRow /> : null}
        </TextColumn>
        {scene ? (
          <SceneColumn $entered={entered}>
            <MenuScene src={scene} glow={pageAccent.glow} alt={sceneAlt} />
          </SceneColumn>
        ) : null}
      </Content>
    </Hero>
  );
}

export default MenuHero;
