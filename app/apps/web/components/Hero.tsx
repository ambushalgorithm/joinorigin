'use client';

import styled from 'styled-components';

import {
  HERO_RADIAL_GLOW_1,
  HERO_RADIAL_GLOW_2,
  HERO_VIGNETTE,
} from './landingTokens';
import HeroLeft from './HeroLeft';
import OrbitViz from './OrbitViz';

/**
 * Hero region (spec §5.2).
 *
 * - Region: `min-height: calc(100svh - 72px)`, relative, overflow hidden.
 * - The full-page hero background image is applied on the root page container
 *   (see `app/page.tsx`); this region layers the two radial glows and the
 *   bottom vignette above it.
 * - Layout: flex row with the left column (`flex: 0 1 600px`) and the orbit
 *   viz on the right, stacking below 1024px.
 */

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  min-height: calc(100svh - 72px);
  display: flex;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const GlowTopRight = styled(Overlay)`
  background: ${HERO_RADIAL_GLOW_1};
`;

const GlowBottomLeft = styled(Overlay)`
  background: ${HERO_RADIAL_GLOW_2};
`;

const Vignette = styled(Overlay)`
  background: ${HERO_VIGNETTE};
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 96px 64px 64px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xxl}px;
    padding: 64px 32px;
  }

  @media (max-width: 480px) {
    padding: 48px 20px;
  }
`;

const RightColumn = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Hero() {
  return (
    <HeroSection data-testid="hero">
      <GlowTopRight aria-hidden="true" />
      <GlowBottomLeft aria-hidden="true" />
      <Vignette aria-hidden="true" />
      <Content>
        <HeroLeft />
        <RightColumn>
          <OrbitViz />
        </RightColumn>
      </Content>
    </HeroSection>
  );
}

export default Hero;
