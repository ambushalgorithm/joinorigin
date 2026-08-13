import { useTheme } from 'styled-components';

import { SceneSvg } from './SceneSvg';
import type { SceneProps } from './sceneTypes';

/**
 * Privacy scene — shield outline (gradient stroke) with 3 small data nodes
 * inside; green accent core. Inlined from
 * `public/assets/menu/scenes/privacy-scene.svg` per design spec
 * sprint-10-menu-anim §5.2: embedded `<style>` removed (GSAP owns motion),
 * colors retargeted to the Green page scheme.
 */
export function PrivacyScene({
  primary = '#30A46C',
  secondary = '#4ADE80',
  gradient,
  ...rest
}: SceneProps) {
  const theme = useTheme();
  const fill = gradient ?? `linear-gradient(135deg, ${primary}, ${secondary})`;

  return (
    <SceneSvg {...rest}>
      <defs>
        <linearGradient id="privacy-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>

      {/* Orbit group: shield outline ring (static — orbit rotation removed TASK-291). */}
      <g className="scene-orbit-group">
        <path
          d="M280 70 L 420 120 L 420 210 C 420 300, 360 345, 280 370 C 200 345, 140 300, 140 210 L 140 120 Z"
          fill={theme.colors.surface}
          stroke={fill}
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
      </g>

      {/* Main group: soft glow + shield core + 3 data nodes (floats). */}
      <g className="scene-main-group">
        <circle cx="280" cy="210" r="160" fill={primary} opacity="0.2" />

        {/* Shield core accent */}
        <path
          d="M280 100 L 385 140 L 385 212 C 385 286, 335 322, 280 344 C 225 322, 175 286, 175 212 L 175 140 Z"
          fill="none"
          stroke={primary}
          strokeWidth={1.5}
          opacity="0.55"
          strokeLinejoin="round"
        />

        {/* Data nodes inside the shield */}
        <g stroke={secondary} strokeWidth={2} opacity={0.9}>
          <line x1="280" y1="190" x2="225" y2="240" />
          <line x1="280" y1="190" x2="335" y2="240" />
          <line x1="225" y1="240" x2="335" y2="240" />
        </g>
        <circle cx="280" cy="190" r="16" fill={fill} />
        <circle
          cx="225"
          cy="240"
          r="11"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2.5}
        />
        <circle
          cx="335"
          cy="240"
          r="11"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2.5}
        />

        {/* Small lock glyph on the shield center */}
        <g transform="translate(280 190)">
          <g className="scene-node">
            <rect
              x="-7"
              y="-2"
              width="14"
              height="10"
              rx="2"
              fill={theme.colors.background}
              opacity={0.85}
            />
            <path
              d="M-4-2v-3a4 4 0 0 1 8 0v3"
              fill="none"
              stroke={theme.colors.primaryContrast}
              strokeWidth={1.8}
              opacity={0.85}
            />
          </g>
        </g>

        {/* Green accent data dots */}
        <circle cx="225" cy="236" r="3" fill={primary} />
        <circle cx="335" cy="236" r="3" fill={primary} />
      </g>
    </SceneSvg>
  );
}

export default PrivacyScene;
