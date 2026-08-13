import { useTheme } from 'styled-components';

import { SceneSvg } from './SceneSvg';
import type { SceneProps } from './sceneTypes';

/**
 * Not-found scene — large glowing node with a dashed "missing link" arc to a
 * small faint node. Inlined from `public/assets/menu/scenes/not-found-scene.svg`
 * per design spec sprint-10-menu-anim §5.2: embedded `<style>` removed (GSAP
 * owns motion), colors retargeted to the Rose page scheme.
 */
export function NotFoundScene({
  primary = '#F43F5E',
  secondary = '#F472B6',
  gradient,
  ...rest
}: SceneProps) {
  const theme = useTheme();
  const fill = gradient ?? `linear-gradient(135deg, ${primary}, ${secondary})`;

  return (
    <SceneSvg {...rest}>
      <defs>
        <linearGradient id="notfound-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>

      {/* Orbit group: dashed missing-link arc + faint node (static — TASK-291). */}
      <g className="scene-orbit-group">
        {/* Dashed "missing link" arc from the main node toward the faint node */}
        <path
          d="M 335 150 A 170 170 0 0 1 470 300"
          fill="none"
          stroke={theme.colors.border}
          strokeWidth={2.5}
          strokeDasharray="6 8"
          strokeLinecap="round"
          opacity={0.9}
        />
        <path
          d="M 350 265 A 130 130 0 0 1 440 320"
          fill="none"
          stroke={primary}
          strokeWidth={1.5}
          strokeDasharray="4 7"
          strokeLinecap="round"
          opacity={0.5}
        />

        {/* Faint "missing" node (broken link target) */}
        <circle
          cx="455"
          cy="315"
          r="16"
          fill={theme.colors.surface}
          stroke={theme.colors.textMuted}
          strokeWidth={2}
          opacity={0.5}
        />
        <circle cx="455" cy="315" r="6" fill={theme.colors.textMuted} opacity={0.4} />

        {/* Small broken-link stub near the faint node */}
        <line
          x1="430"
          y1="285"
          x2="440"
          y2="295"
          stroke={theme.colors.textMuted}
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.5}
        />
        <line
          x1="440"
          y1="285"
          x2="430"
          y2="295"
          stroke={theme.colors.textMuted}
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.5}
        />

        {/* Small orbiting nodes */}
        <circle
          cx="180"
          cy="120"
          r="10"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2}
          opacity={0.7}
        />
        <circle
          cx="330"
          cy="130"
          r="8"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2}
          opacity={0.6}
        />
        <circle
          cx="150"
          cy="260"
          r="9"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2}
          opacity={0.6}
        />
        <circle
          cx="300"
          cy="290"
          r="7"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2}
          opacity={0.55}
        />

        {/* Faint links from main node */}
        <g stroke={theme.colors.border} strokeWidth={1.8} opacity={0.7}>
          <line x1="250" y1="200" x2="180" y2="120" />
          <line x1="250" y1="200" x2="330" y2="130" />
          <line x1="250" y1="200" x2="150" y2="260" />
          <line x1="250" y1="200" x2="300" y2="290" />
        </g>
      </g>

      {/* Main group: soft glow + glowing broken-link node (floats). */}
      <g className="scene-main-group">
        <circle cx="280" cy="205" r="150" fill={primary} opacity="0.2" />
        <circle cx="250" cy="200" r="60" fill={fill} opacity="0.18" />
        <circle
          cx="250"
          cy="200"
          r="44"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={3}
        />
        <circle
          cx="250"
          cy="200"
          r="58"
          fill="none"
          stroke={primary}
          strokeWidth={1.5}
          opacity={0.4}
        />
        <circle
          cx="250"
          cy="200"
          r="72"
          fill="none"
          stroke={primary}
          strokeWidth={1}
          opacity={0.2}
        />

        {/* "?" glyph inside the main node */}
        <text
          x="250"
          y="216"
          fontFamily="Urbanist, Inter, sans-serif"
          fontSize="52"
          fontWeight="700"
          fill={fill}
          textAnchor="middle"
        >
          ?
        </text>
      </g>
    </SceneSvg>
  );
}

export default NotFoundScene;
