'use client';

import Image from 'next/image';
import { useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

import { useI18n } from '@joinorigin/i18n';

import { ORBIT_BORDER_GRADIENT, ORBIT_GLOWS, ACCENT_GRADIENT } from './landingTokens';
import { AVATAR_FLYIN_DELAYS, EASE, useEntrance, useReducedMotion } from './motion';
import { formatCount, useCountUp } from './useCountUp';

/**
 * Hero right — orbit circles visualization (spec §5.4, GSAP elevation
 * sprint-10-menu-anim §5.7).
 *
 * 720×720 container with 4 concentric rings that spin (1px gradient border via
 * the mask technique), 9 avatar chips orbiting on the rings, and a center hub
 * that count-up animates `0 → 2,400+ Members`.
 *
 * Ring spins + chip fly-ins are GSAP-driven (`orbit-1..4` / `orbit-chip`
 * class hooks, testids unchanged); the container entrance stays a CSS
 * scale-in. Chips keep the `rotate(angle) translate(radius) rotate(-angle)`
 * positioning inside the spinning ring container — GSAP rotation on the ring
 * element moves them (DOM transform, verifiable in e2e). Reduced-motion users
 * get final states instantly (no ring tweens; count-up honors the
 * `useReducedMotion` hook).
 *
 * The hub is rendered as a SIBLING of the rings inside ScaleFrame (still
 * absolutely centered via the `Hub` component's `left/top: 50%` + negative
 * margins — visual position identical), so it inherits ZERO rotation from the
 * spinning rings and no counter-rotation tween is needed (TASK-292 — fixes
 * the sub-pixel trembling/shaking of the "2,400+ Members" count-up that
 * happened when two GSAP inline transforms cancelled each other under
 * ScaleFrame's `scale()`).
 *
 * i18n (arch-i18n §9.1): member alts + "Members" label come from the active
 * locale; `formatCount` groups with the active locale.
 */

const CONTAINER_SIZE = 720;

const CHIP_AVATAR_COUNT = 9;

/** Static orbit geometry (kept 1:1 from the pre-i18n config — no design change). */
const ORBIT_CHIP_ORBITS = [1, 2, 2, 2, 3, 4, 4, 4, 4] as const;
const ORBIT_CHIP_ANGLES = [270, 60, 180, 300, 130, 30, 95, 220, 320] as const;
const ORBIT_CHIP_RADII = [177, 251, 251, 251, 325, 399, 399, 399, 399] as const;
const ORBIT_CHIP_SIZES = [58, 78, 78, 78, 88, 88, 88, 88, 88] as const;
const ORBIT_CHIP_GLOWS = [
  ORBIT_GLOWS.orbit1,
  ORBIT_GLOWS.orbit2Yellow,
  ORBIT_GLOWS.orbit2Pink,
  ORBIT_GLOWS.orbit4Blue,
  ORBIT_GLOWS.orbit3Pink,
  ORBIT_GLOWS.orbit4Blue,
  ORBIT_GLOWS.orbit4Orange,
  ORBIT_GLOWS.orbit2Pink,
  ORBIT_GLOWS.orbit4Blue,
] as const;

interface OrbitConfig {
  orbit: 1 | 2 | 3 | 4;
  diameter: number;
}

const ORBITS: OrbitConfig[] = [
  { orbit: 1, diameter: 353 },
  { orbit: 2, diameter: 501 },
  { orbit: 3, diameter: 649 },
  { orbit: 4, diameter: 797 },
];

const heroScaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Outer = styled.div<{ $entered: boolean }>`
  position: relative;
  width: ${CONTAINER_SIZE}px;
  height: ${CONTAINER_SIZE}px;
  flex-shrink: 0;
  animation: ${({ $entered }) =>
    $entered
      ? css`
          ${heroScaleIn} 1.2s ${EASE} 0.3s both
        `
      : 'none'};

  @media (max-width: 1280px) {
    width: 612px;
    height: 612px;
  }
  @media (max-width: 1024px) {
    width: 504px;
    height: 504px;
  }
  @media (max-width: 768px) {
    width: 360px;
    height: 360px;
  }
  @media (max-width: 480px) {
    width: 288px;
    height: 288px;
  }
`;

const ScaleFrame = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${CONTAINER_SIZE}px;
  height: ${CONTAINER_SIZE}px;
  margin-left: -${CONTAINER_SIZE / 2}px;
  margin-top: -${CONTAINER_SIZE / 2}px;
  transform-origin: center center;
  transform: scale(1);

  @media (max-width: 1280px) {
    transform: scale(0.85);
  }
  @media (max-width: 1024px) {
    transform: scale(0.7);
  }
  @media (max-width: 768px) {
    transform: scale(0.5);
  }
  @media (max-width: 480px) {
    transform: scale(0.4);
  }
`;

/** Ring shell — GSAP rotates it (class hook `orbit-{n}`), no CSS keyframes. */
const Orbit = styled.div<{ $diameter: number }>`
  position: absolute;
  left: ${({ $diameter }) => (CONTAINER_SIZE - $diameter) / 2}px;
  top: ${({ $diameter }) => (CONTAINER_SIZE - $diameter) / 2}px;
  width: ${({ $diameter }) => $diameter}px;
  height: ${({ $diameter }) => $diameter}px;
  border-radius: 50%;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${ORBIT_BORDER_GRADIENT};
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    padding: 1px;
  }
`;

const Hub = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 240px;
  height: 240px;
  margin-left: -120px;
  margin-top: -120px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  text-align: center;
  background: radial-gradient(circle, rgba(93, 124, 255, 0.12), transparent 70%);
`;

const CountValue = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 64px;
  line-height: 1.05;
  letter-spacing: -1px;
  background: ${ACCENT_GRADIENT};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const CountLabel = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: 16px;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ChipPositioner = styled.div<{ $angle: number; $radius: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1px;
  height: 1px;
  transform: translate(-50%, -50%) rotate(${({ $angle }) => $angle}deg)
    translate(${({ $radius }) => $radius}px) rotate(${({ $angle }) => -$angle}deg);
`;

/** Avatar chip — GSAP fly-in via class hook `orbit-chip` (no CSS keyframes). */
const Chip = styled.div<{ $size: number; $glow: string }>`
  position: absolute;
  left: ${({ $size }) => -$size / 2}px;
  top: ${({ $size }) => -$size / 2}px;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.primaryContrast};
  box-shadow: 0 0 20px ${({ $glow }) => $glow};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceElevated};
`;

/**
 * `next/image` is styled via `styled-components` for the orbit avatars
 * (TASK-209). The generated class name is made deterministic app-wide by the
 * SWC `compiler.styledComponents` option in `next.config.mjs`.
 */
const AvatarImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export function OrbitViz() {
  const entered = useEntrance();
  const rootRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useI18n();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(rootRef);
        const rings = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
        rings
          .to(q('.orbit-1'), { rotation: -360, duration: 30 }, 0)
          .to(q('.orbit-2'), { rotation: 360, duration: 40 }, 0)
          .to(q('.orbit-3'), { rotation: 360, duration: 50 }, 0)
          .to(q('.orbit-4'), { rotation: -360, duration: 60 }, 0);
        gsap.fromTo(
          q('.orbit-chip'),
          { autoAlpha: 0, scale: 0.3 },
          { autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.6)' },
        );
      });
    },
    { scope: rootRef },
  );

  const chips = Array.from({ length: CHIP_AVATAR_COUNT }, (_, i) => {
    const number = i + 1;
    return {
      src: `/assets/avatars/avatar-${String(number).padStart(2, '0')}.png`,
      alt: t('orbitViz.memberAlt', { number }),
      orbit: ORBIT_CHIP_ORBITS[i] as 1 | 2 | 3 | 4,
      angle: ORBIT_CHIP_ANGLES[i],
      radius: ORBIT_CHIP_RADII[i],
      size: ORBIT_CHIP_SIZES[i],
      glow: ORBIT_CHIP_GLOWS[i],
      delay: AVATAR_FLYIN_DELAYS[i],
    };
  });

  return (
    <Outer
      $entered={entered}
      ref={rootRef}
      data-testid="orbit-viz"
      aria-label={t('orbitViz.ariaLabel')}
    >
      <ScaleFrame>
        {ORBITS.map((orbit) => (
          <Orbit
            key={orbit.orbit}
            className={`orbit-${orbit.orbit}`}
            $diameter={orbit.diameter}
            data-testid={`orbit-${orbit.orbit}`}
          >
            {chips
              .filter((chip) => chip.orbit === orbit.orbit)
              .map((chip) => (
                <ChipPositioner key={chip.src} $angle={chip.angle} $radius={chip.radius}>
                  <Chip className="orbit-chip" $size={chip.size} $glow={chip.glow}>
                    <AvatarImage
                      src={chip.src}
                      alt={chip.alt}
                      width={chip.size}
                      height={chip.size}
                    />
                  </Chip>
                </ChipPositioner>
              ))}
          </Orbit>
        ))}
        {/* The hub is a SIBLING of the rotating rings (TASK-292) — it
            inherits ZERO rotation, so no counter-rotation tween is needed. */}
        <OrbitHub locale={locale} />
      </ScaleFrame>
    </Outer>
  );
}

function OrbitHub({ locale }: { locale: string }) {
  const reduced = useReducedMotion();
  const count = useCountUp(2400, { disabled: reduced });
  const { t } = useI18n();

  return (
    <Hub className="orbit-hub" data-testid="orbit-hub">
      <CountValue>{formatCount(count, locale)}+</CountValue>
      <CountLabel>{t('orbitViz.members')}</CountLabel>
    </Hub>
  );
}

export default OrbitViz;
