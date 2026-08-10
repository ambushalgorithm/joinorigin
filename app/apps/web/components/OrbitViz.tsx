'use client';

import Image from 'next/image';
import styled, { css, keyframes } from 'styled-components';

import { ORBIT_BORDER_GRADIENT, ORBIT_GLOWS, ACCENT_GRADIENT } from './landingTokens';
import { AVATAR_FLYIN_DELAYS, EASE, useEntrance, useReducedMotion } from './motion';
import { formatCount, useCountUp } from './useCountUp';

/**
 * Hero right — orbit circles visualization (spec §5.4).
 *
 * 720×720 container with 4 concentric rings that spin (1px gradient border via
 * the mask technique), 9 avatar chips orbiting on the rings, and a center hub
 * that count-up animates `0 → 2,400+ Members`.
 *
 * Chips are positioned with the prompt's transform pattern
 * `translate(-50%,-50%) rotate(Xdeg) translate(radius) rotate(-Xdeg)` inside a
 * spinning orbit, so they travel around the ring. Each chip fly-in is
 * staggered (0.6s → 2.3s). Everything respects prefers-reduced-motion.
 */

const CONTAINER_SIZE = 720;

interface OrbitConfig {
  orbit: 1 | 2 | 3 | 4;
  diameter: number;
  durationSeconds: number;
  counterClockwise: boolean;
}

const ORBITS: OrbitConfig[] = [
  { orbit: 1, diameter: 353, durationSeconds: 30, counterClockwise: true },
  { orbit: 2, diameter: 501, durationSeconds: 40, counterClockwise: false },
  { orbit: 3, diameter: 649, durationSeconds: 50, counterClockwise: false },
  { orbit: 4, diameter: 797, durationSeconds: 60, counterClockwise: true },
];

interface ChipConfig {
  src: string;
  alt: string;
  orbit: 1 | 2 | 3 | 4;
  angle: number;
  radius: number;
  size: number;
  glow: string;
  delay: number;
}

const CHIPS: ChipConfig[] = [
  {
    src: '/assets/avatars/avatar-01.png',
    alt: 'JoinOrigin member 1',
    orbit: 1,
    angle: 270,
    radius: 177,
    size: 58,
    glow: ORBIT_GLOWS.orbit1,
    delay: AVATAR_FLYIN_DELAYS[0],
  },
  {
    src: '/assets/avatars/avatar-02.png',
    alt: 'JoinOrigin member 2',
    orbit: 2,
    angle: 60,
    radius: 251,
    size: 78,
    glow: ORBIT_GLOWS.orbit2Yellow,
    delay: AVATAR_FLYIN_DELAYS[1],
  },
  {
    src: '/assets/avatars/avatar-03.png',
    alt: 'JoinOrigin member 3',
    orbit: 2,
    angle: 180,
    radius: 251,
    size: 78,
    glow: ORBIT_GLOWS.orbit2Pink,
    delay: AVATAR_FLYIN_DELAYS[2],
  },
  {
    src: '/assets/avatars/avatar-04.png',
    alt: 'JoinOrigin member 4',
    orbit: 2,
    angle: 300,
    radius: 251,
    size: 78,
    glow: ORBIT_GLOWS.orbit4Blue,
    delay: AVATAR_FLYIN_DELAYS[3],
  },
  {
    src: '/assets/avatars/avatar-05.png',
    alt: 'JoinOrigin member 5',
    orbit: 3,
    angle: 130,
    radius: 325,
    size: 88,
    glow: ORBIT_GLOWS.orbit3Pink,
    delay: AVATAR_FLYIN_DELAYS[4],
  },
  {
    src: '/assets/avatars/avatar-06.png',
    alt: 'JoinOrigin member 6',
    orbit: 4,
    angle: 30,
    radius: 399,
    size: 88,
    glow: ORBIT_GLOWS.orbit4Blue,
    delay: AVATAR_FLYIN_DELAYS[5],
  },
  {
    src: '/assets/avatars/avatar-07.png',
    alt: 'JoinOrigin member 7',
    orbit: 4,
    angle: 95,
    radius: 399,
    size: 88,
    glow: ORBIT_GLOWS.orbit4Orange,
    delay: AVATAR_FLYIN_DELAYS[6],
  },
  {
    src: '/assets/avatars/avatar-08.png',
    alt: 'JoinOrigin member 8',
    orbit: 4,
    angle: 220,
    radius: 399,
    size: 88,
    glow: ORBIT_GLOWS.orbit2Pink,
    delay: AVATAR_FLYIN_DELAYS[7],
  },
  {
    src: '/assets/avatars/avatar-09.png',
    alt: 'JoinOrigin member 9',
    orbit: 4,
    angle: 320,
    radius: 399,
    size: 88,
    glow: ORBIT_GLOWS.orbit4Blue,
    delay: AVATAR_FLYIN_DELAYS[8],
  },
];

const spinCw = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinCcw = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

const flyIn = keyframes`
  0% {
    transform: scale(0.3) rotate(-180deg);
    filter: blur(8px);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0deg);
    filter: blur(0px);
    opacity: 1;
  }
`;

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
  inset: 0;
  width: ${CONTAINER_SIZE}px;
  height: ${CONTAINER_SIZE}px;
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

const Orbit = styled.div<{
  $diameter: number;
  $duration: number;
  $counterClockwise: boolean;
}>`
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

  animation: ${({ $counterClockwise }) => ($counterClockwise ? spinCcw : spinCw)}
    ${({ $duration }) => $duration}s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
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
  background: radial-gradient(circle, rgba(79, 125, 249, 0.12), transparent 70%);
  animation: ${spinCw} 30s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
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

const Chip = styled.div<{ $size: number; $glow: string; $delay: number; $entered: boolean }>`
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
  animation: ${({ $entered, $delay }) =>
    $entered
      ? css`
          ${flyIn} 0.8s ${EASE} ${$delay}s both
        `
      : 'none'};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

const AvatarImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export function OrbitViz() {
  const entered = useEntrance();

  return (
    <Outer
      $entered={entered}
      data-testid="orbit-viz"
      aria-label="JoinOrigin member orbit visualization"
    >
      <ScaleFrame>
        {ORBITS.map((orbit) => (
          <Orbit
            key={orbit.orbit}
            $diameter={orbit.diameter}
            $duration={orbit.durationSeconds}
            $counterClockwise={orbit.counterClockwise}
            data-testid={`orbit-${orbit.orbit}`}
          >
            {orbit.orbit === 1 ? <OrbitHub /> : null}
            {CHIPS.filter((chip) => chip.orbit === orbit.orbit).map((chip) => (
              <ChipPositioner key={chip.src} $angle={chip.angle} $radius={chip.radius}>
                <Chip $size={chip.size} $glow={chip.glow} $delay={chip.delay} $entered={entered}>
                  <AvatarImage src={chip.src} alt={chip.alt} width={chip.size} height={chip.size} />
                </Chip>
              </ChipPositioner>
            ))}
          </Orbit>
        ))}
      </ScaleFrame>
    </Outer>
  );
}

function OrbitHub() {
  const reduced = useReducedMotion();
  const count = useCountUp(2400, { disabled: reduced });

  return (
    <Hub data-testid="orbit-hub">
      <CountValue>{formatCount(count)}+</CountValue>
      <CountLabel>Members</CountLabel>
    </Hub>
  );
}

export default OrbitViz;
