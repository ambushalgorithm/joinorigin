import { useTheme } from 'styled-components';

import { SceneSvg } from './SceneSvg';
import type { SceneProps } from './sceneTypes';

/**
 * Docs scene — stacked document layers + horizontal Matrix node line with
 * encrypted-lock glyph. Inlined from `public/assets/menu/scenes/docs-scene.svg`
 * per design spec sprint-10-menu-anim §5.2: embedded `<style>` removed (GSAP
 * owns motion), colors retargeted to the Sky page scheme.
 */
export function DocsScene({
  primary = '#4C9AFF',
  secondary = '#7CC7FF',
  gradient,
  ...rest
}: SceneProps) {
  const theme = useTheme();
  const fill = gradient ?? `linear-gradient(135deg, ${primary}, ${secondary})`;

  return (
    <SceneSvg {...rest}>
      <defs>
        <linearGradient id="docs-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>

      {/* Main group: soft radial glow + stacked document layers (floats). */}
      <g className="scene-main-group">
        <circle cx="280" cy="185" r="160" fill={secondary} opacity="0.13" />

        {/* Stacked document layers (3 rounded rects, gradient outline) */}
        <g fill="none" stroke={theme.colors.border} strokeWidth={2} opacity={0.9}>
          <rect x="150" y="120" width="260" height="150" rx="10" />
          <rect x="165" y="105" width="260" height="150" rx="10" />
          <rect x="180" y="90" width="260" height="150" rx="10" />
        </g>
        <rect
          x="180"
          y="90"
          width="260"
          height="150"
          rx="10"
          fill="none"
          stroke={fill}
          strokeWidth={2.5}
        />

        {/* Document body lines */}
        <g stroke={theme.colors.textMuted} strokeWidth={3} strokeLinecap="round" opacity={0.8}>
          <line x1="205" y1="115" x2="380" y2="115" />
          <line x1="205" y1="132" x2="360" y2="132" />
          <line x1="205" y1="149" x2="380" y2="149" />
          <line x1="205" y1="166" x2="330" y2="166" />
          <line x1="205" y1="183" x2="370" y2="183" />
        </g>
        <circle cx="205" cy="205" r="4" fill={secondary} />
        <line
          x1="218"
          y1="205"
          x2="380"
          y2="205"
          stroke={theme.colors.textMuted}
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.6}
        />
      </g>

      {/* Orbit group: Matrix node line + lock glyph (rotates). */}
      <g className="scene-orbit-group">
        <g stroke={theme.colors.border} strokeWidth={2} opacity={0.9}>
          <line x1="120" y1="300" x2="440" y2="300" />
        </g>
        <circle
          cx="140"
          cy="300"
          r="12"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2.5}
        />
        <circle
          cx="200"
          cy="300"
          r="12"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2.5}
        />
        <circle
          cx="260"
          cy="300"
          r="12"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2.5}
        />
        <circle cx="320" cy="300" r="12" fill={fill} />
        <circle
          cx="380"
          cy="300"
          r="12"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2.5}
        />
        <circle
          cx="430"
          cy="300"
          r="12"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2.5}
        />

        {/* Encrypted-lock glyph (Matrix persistence) */}
        <g transform="translate(320 300)">
          <g className="scene-node">
            <rect
              x="-9"
              y="-2"
              width="18"
              height="14"
              rx="3"
              fill={theme.colors.surface}
              stroke={secondary}
              strokeWidth={2}
            />
            <path d="M-5-2v-4a5 5 0 0 1 10 0v4" fill="none" stroke={secondary} strokeWidth={2} />
            <circle cx="0" cy="5" r="2.2" fill={secondary} />
          </g>
        </g>
      </g>
    </SceneSvg>
  );
}

export default DocsScene;
