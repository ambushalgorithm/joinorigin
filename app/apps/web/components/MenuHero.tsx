'use client';

import styled, { css, keyframes } from 'styled-components';

import { DEFAULT_ACCENT, PAGE_ACCENTS, type PageAccentKey } from './menuTokens';
import { Eyebrow, HeroScene, PageLead, PageTitle } from './menuPagePrimitives';
import { EASE, useEntrance } from './motion';

/**
 * Menu-page hero band (design spec sprint-8 §4.1).
 *
 * Two-column band: eyebrow + H1 + lead on the left, local SVG scene on the
 * right with the per-page glow painted behind it. The H1 reuses the existing
 * `PageTitle` visual style so every menu page still renders exactly one `<h1>`
 * (pages pass their current PageHeader block content through the `hero` prop
 * of `MenuPageShell`).
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
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Hero = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 72px 64px 32px;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: ${({ theme }) => theme.spacing.xl}px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl}px;
    padding: 64px 32px 24px;
  }

  @media (max-width: 480px) {
    padding: 48px 20px 24px;
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

const SceneColumn = styled.div<{ $entered: boolean }>`
  display: flex;
  justify-content: flex-end;
  min-width: 0;
  animation: ${({ $entered }) =>
    $entered
      ? css`
          ${scaleIn} 1s ${EASE} both
        `
      : 'none'};

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

export function MenuHero({
  eyebrow,
  title,
  lead,
  scene,
  sceneAlt = '',
  accent = DEFAULT_ACCENT,
}: MenuHeroProps) {
  const entered = useEntrance();
  const pageAccent = PAGE_ACCENTS[accent];

  return (
    <Hero data-testid="menu-hero">
      <TextColumn $entered={entered}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <PageTitle>{title}</PageTitle>
        {lead ? <HeroLead>{lead}</HeroLead> : null}
      </TextColumn>
      {scene ? (
        <SceneColumn $entered={entered}>
          <HeroScene $glow={pageAccent.glow}>
            <img
              src={scene}
              alt={sceneAlt}
              aria-hidden="true"
              width={560}
              height={420}
              data-testid="menu-hero-scene"
            />
          </HeroScene>
        </SceneColumn>
      ) : null}
    </Hero>
  );
}

export default MenuHero;
