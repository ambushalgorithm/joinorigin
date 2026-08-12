'use client';

import styled, { css, keyframes } from 'styled-components';

import { DELAY, EASE, useEntrance } from './motion';

/**
 * Logo ticker (spec §5.5).
 *
 * Seamless infinite marquee: 5 partner marks repeated 4×, translating `0 →
 * -50%` over 20s, pausing on hover, with fade masks on the edges and the
 * `Trusted by teams at` label above.
 */

const PARTNER_LOGOS = Array.from({ length: 5 }, (_, i) => ({
  src: `/assets/partners/partner-${String(i + 1).padStart(2, '0')}.svg`,
  alt: `JoinOrigin partner ${i + 1}`,
}));

const REPEAT = 4;

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

const marquee = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const Section = styled.section<{ $entered: boolean }>`
  padding: 64px 0;
  animation: ${({ $entered }) =>
    $entered
      ? css`
          ${fadeUp} 0.7s ${EASE} ${DELAY.ticker} both
        `
      : 'none'};
`;

const Label = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xl}px;
  text-align: center;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const MarqueeWrap = styled.div`
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  gap: 64px;
  width: max-content;
  animation: ${marquee} 20s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Logo = styled.img`
  width: 137px;
  height: 40px;
  object-fit: contain;
  opacity: 1;
  transition: opacity 0.2s ease;
  flex-shrink: 0;

  ${Track}:hover & {
    opacity: 1;
  }

  @media (max-width: 480px) {
    height: 32px;
  }
`;

export function LogoMarquee() {
  const entered = useEntrance();

  const sequence = Array.from({ length: REPEAT }, () => PARTNER_LOGOS).flat();

  return (
    <Section $entered={entered} data-testid="logo-marquee">
      <Label>Trusted by teams at</Label>
      <MarqueeWrap>
        <Track>
          {sequence.map((logo, index) => (
            <Logo key={`${logo.src}-${index}`} src={logo.src} alt={logo.alt} loading="lazy" />
          ))}
        </Track>
      </MarqueeWrap>
    </Section>
  );
}

export default LogoMarquee;
