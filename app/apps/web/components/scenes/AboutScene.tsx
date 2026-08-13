import { useTheme } from 'styled-components';

import { SceneSvg } from './SceneSvg';
import type { SceneProps } from './sceneTypes';

/**
 * About scene — social graph forming a subtle heart shape. Inlined from
 * `public/assets/menu/scenes/about-scene.svg` per design spec
 * sprint-10-menu-anim §5.2: embedded `<style>` removed (GSAP owns motion),
 * colors retargeted to the Violet page scheme.
 */
export function AboutScene({
  primary = '#8B5CF6',
  secondary = '#C084FC',
  gradient,
  ...rest
}: SceneProps) {
  const theme = useTheme();
  const fill = gradient ?? `linear-gradient(135deg, ${primary}, ${secondary})`;

  return (
    <SceneSvg {...rest}>
      <defs>
        <linearGradient id="about-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>

      {/* Main group: soft glow + heart outline + links + center node (floats). */}
      <g className="scene-main-group">
        <circle cx="280" cy="215" r="165" fill={primary} opacity="0.2" />

        {/* Heart outline arcs (guides for node placement) */}
        <g fill="none" stroke={theme.colors.border} strokeWidth={2} opacity={0.35}>
          <path d="M280 335 C 210 265, 120 250, 120 170 A 60 60 0 0 1 240 150 L 280 205 L 320 150 A 60 60 0 0 1 440 170 C 440 250, 350 265, 280 335 Z" />
        </g>

        {/* Links: center node fans out to the two arcs */}
        <g stroke={theme.colors.border} strokeWidth={1.8} fill="none" opacity={0.85}>
          <line x1="280" y1="220" x2="140" y2="180" />
          <line x1="280" y1="220" x2="190" y2="140" />
          <line x1="280" y1="220" x2="250" y2="130" />
          <line x1="280" y1="220" x2="310" y2="130" />
          <line x1="280" y1="220" x2="370" y2="140" />
          <line x1="280" y1="220" x2="420" y2="180" />
          <line x1="280" y1="220" x2="150" y2="250" />
          <line x1="280" y1="220" x2="200" y2="290" />
          <line x1="280" y1="220" x2="240" y2="330" />
          <line x1="280" y1="220" x2="320" y2="330" />
          <line x1="280" y1="220" x2="360" y2="290" />
          <line x1="280" y1="220" x2="410" y2="250" />
        </g>

        {/* Center node (the network is the product) */}
        <circle cx="280" cy="220" r="34" fill={fill} opacity="0.92" />
        <circle
          cx="280"
          cy="220"
          r="46"
          fill="none"
          stroke={primary}
          strokeWidth={1.5}
          opacity="0.4"
        />
        <circle cx="280" cy="212" r="7" fill={theme.colors.background} opacity="0.7" />
        <path
          d="M280 225c-6 0-10 4-10 9h20c0-5-4-9-10-9z"
          fill={theme.colors.background}
          opacity="0.7"
        />
      </g>

      {/* Orbit group: small outer nodes on the heart arcs (rotates). */}
      <g className="scene-orbit-group">
        {/* Heart-left arc nodes */}
        <g fill={theme.colors.surface} stroke={secondary} strokeWidth={2}>
          <circle cx="140" cy="180" r="13" />
          <circle cx="190" cy="140" r="12" />
          <circle cx="250" cy="130" r="12" />
          <circle cx="150" cy="250" r="11" />
          <circle cx="200" cy="290" r="11" />
          <circle cx="240" cy="330" r="10" />
        </g>

        {/* Heart-right arc nodes */}
        <g fill={theme.colors.surface} stroke={secondary} strokeWidth={2}>
          <circle cx="420" cy="180" r="13" />
          <circle cx="370" cy="140" r="12" />
          <circle cx="310" cy="130" r="12" />
          <circle cx="410" cy="250" r="11" />
          <circle cx="360" cy="290" r="11" />
          <circle cx="320" cy="330" r="10" />
        </g>
      </g>
    </SceneSvg>
  );
}

export default AboutScene;
