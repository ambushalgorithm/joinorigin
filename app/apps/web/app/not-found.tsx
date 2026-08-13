'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import styled, { css, keyframes, ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import { useI18n } from '@joinorigin/i18n';

import { ACCENT_GRADIENT } from '../components/landingTokens';
import { EASE, useSceneMotion } from '../components/motion';
import { MENU_AMBIENT_URL, MENU_GRID_URL, PAGE_SCHEMES } from '../components/menuTokens';
import { SCENE_MAP } from '../components/scenes/sceneTypes';

/**
 * JoinOrigin styled 404 boundary (TASK-208), redesigned per spec sprint-8 §9,
 * elevated sprint-10 §8.8, GSAP scene sprint-10-menu-anim §5.8.
 *
 * A stable, self-contained not-found page so unknown routes (including the
 * well-known-path probes browsers/DevTools fire at page load) render this
 * styled boundary instead of racing the main page stream through the default
 * `_not-found` machinery. The visual language mirrors the landing page and
 * the menu-page heroes: ambient webp + dot grid + rose notFound glow/mesh,
 * the INLINE not-found scene (GSAP float in one document — was an
 * `<img>`-loaded SVG; orbit rotation removed in TASK-291), brand mark +
 * wordmark, gradient-accent status, and a
 * gradient CTA back home — no modal, no CSV, no API involvement.
 *
 * i18n: all copy reads from the active locale dictionary via the root
 * layout's `I18nProvider` (the provider wraps the boundary — it is inside
 * `{children}`).
 *
 * The root layout wraps every route in `Registry` (style collection) but the
 * `ThemeProvider`s live in `page.tsx`, which is not rendered for unknown
 * routes — so this boundary provides its own theme context.
 */

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageRoot = styled.main`
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.xxl}px;
  background-color: ${({ theme }) => theme.colors.background};
  text-align: center;
  overflow: hidden;
  animation: ${css`
    ${fadeUp} 0.6s ${EASE} both
  `};

  /* Ambient layer 1: menu texture (spec sprint-10 §8.8) */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${MENU_AMBIENT_URL} center / cover no-repeat;
    opacity: 0.5;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  /* Ambient layer 3: rose notFound glow mesh (spec §5.8) */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${PAGE_SCHEMES.notFound.glow}, ${PAGE_SCHEMES.notFound.mesh};
    pointer-events: none;
  }
`;

/** Ambient layer 2: tiled dot grid (§8.8). */
const GridLayer = styled.div`
  position: absolute;
  inset: 0;
  background-image: ${MENU_GRID_URL};
  background-size: 88px 88px;
  opacity: 0.5;
  pointer-events: none;
`;

/** Content above the ambient layers. */
const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const Scene = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;

  /* GSAP rotates the inline scene groups around their fill-box center. */
  .scene-orbit-group,
  .scene-main-group,
  .scene-node {
    transform-box: fill-box;
    transform-origin: center;
  }

  svg {
    width: 240px;
    height: 180px;
  }
`;

const Brand = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const BrandMark = styled(Image)`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

const Wordmark = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 20px;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.colors.text};
`;

const Status = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 72px;
  line-height: 1;
  background: ${ACCENT_GRADIENT};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const Heading = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.heading}px;
  color: ${({ theme }) => theme.colors.text};
`;

const Copy = styled.p`
  margin: 0;
  max-width: 420px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 28px;
  border-radius: 999px;
  background: ${ACCENT_GRADIENT};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.primaryContrast};
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(93, 124, 255, 0.35);
  }
`;

/** Secondary ghost link (spec sprint-8 §9) — muted, underlines on hover. */
const ExploreLink = styled(Link)`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: underline;
  }
`;

export default function NotFound() {
  const { t } = useI18n();
  const sceneRef = useRef<HTMLDivElement>(null);
  const NotFoundScene = SCENE_MAP.notFound;

  useSceneMotion(sceneRef);

  return (
    <ThemeProvider theme={theme}>
      <PageRoot data-testid="not-found-page">
        <GridLayer aria-hidden="true" />
        <Content>
          <Scene aria-hidden="true" ref={sceneRef}>
            <NotFoundScene
              primary={PAGE_SCHEMES.notFound.primary}
              secondary={PAGE_SCHEMES.notFound.secondary}
              gradient={PAGE_SCHEMES.notFound.gradient}
            />
          </Scene>
          <Brand>
            <BrandMark src="/assets/logo/joinorigin-mark.svg" alt="" width={32} height={32} />
            <Wordmark>{t('notFound.brand')}</Wordmark>
          </Brand>
          <Status>{t('notFound.status')}</Status>
          <Heading>{t('notFound.heading')}</Heading>
          <Copy>{t('notFound.copy')}</Copy>
          <Actions>
            <HomeLink href="/">{t('notFound.backHome')}</HomeLink>
            <ExploreLink href="/community">{t('notFound.exploreCommunities')}</ExploreLink>
          </Actions>
        </Content>
      </PageRoot>
    </ThemeProvider>
  );
}
