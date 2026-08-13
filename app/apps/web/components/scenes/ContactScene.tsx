import { useTheme } from 'styled-components';

import { SceneSvg } from './SceneSvg';
import type { SceneProps } from './sceneTypes';

/**
 * Contact scene — chat bubbles linked by a node line; one gradient-filled
 * bubble. Inlined from `public/assets/menu/scenes/contact-scene.svg` per
 * design spec sprint-10-menu-anim §5.2: embedded `<style>` removed (GSAP owns
 * motion), colors retargeted to the Teal page scheme.
 */
export function ContactScene({
  primary = '#2DD4BF',
  secondary = '#22D3EE',
  gradient,
  ...rest
}: SceneProps) {
  const theme = useTheme();
  const fill = gradient ?? `linear-gradient(135deg, ${primary}, ${secondary})`;

  return (
    <SceneSvg {...rest}>
      <defs>
        <linearGradient id="contact-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>

      {/* Main group: soft radial glow + chat bubbles (floats). */}
      <g className="scene-main-group">
        <circle cx="280" cy="210" r="155" fill={primary} opacity="0.2" />

        {/* Bubble 1 (left, outline) */}
        <g transform="translate(130 210)">
          <path
            d="M-46-30h92c6 0 10 4 10 10v44c0 6-4 10-10 10h-58l-20 20v-20h-14c-6 0-10-4-10-10v-44c0-6 4-10 10-10z"
            fill={theme.colors.surface}
            stroke={secondary}
            strokeWidth={2.5}
          />
          <circle cx="-22" cy="-10" r="3.5" fill={secondary} />
          <circle cx="0" cy="-10" r="3.5" fill={secondary} />
          <circle cx="22" cy="-10" r="3.5" fill={secondary} />
          <line
            x1="-22"
            y1="8"
            x2="22"
            y2="8"
            stroke={theme.colors.textMuted}
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.7}
          />
          <line
            x1="-22"
            y1="18"
            x2="14"
            y2="18"
            stroke={theme.colors.textMuted}
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.5}
          />
        </g>

        {/* Bubble 2 (top-right, gradient fill) */}
        <g transform="translate(440 200)">
          <path
            d="M-40-28h80c6 0 10 4 10 10v38c0 6-4 10-10 10h-50l-18 18v-18h-12c-6 0-10-4-10-10v-38c0-6 4-10 10-10z"
            fill={fill}
            opacity={0.92}
          />
          <circle cx="-18" cy="-8" r="3.5" fill={theme.colors.primaryContrast} opacity={0.85} />
          <circle cx="0" cy="-8" r="3.5" fill={theme.colors.primaryContrast} opacity={0.85} />
          <circle cx="18" cy="-8" r="3.5" fill={theme.colors.primaryContrast} opacity={0.85} />
        </g>

        {/* Bubble 3 (bottom-right, outline) */}
        <g transform="translate(380 300)">
          <path
            d="M-38-26h76c6 0 10 4 10 10v36c0 6-4 10-10 10h-48l-16 16v-16h-12c-6 0-10-4-10-10v-36c0-6 4-10 10-10z"
            fill={theme.colors.surface}
            stroke={secondary}
            strokeWidth={2.5}
          />
          <circle cx="-16" cy="-6" r="3" fill={secondary} />
          <circle cx="0" cy="-6" r="3" fill={secondary} />
          <circle cx="16" cy="-6" r="3" fill={secondary} />
        </g>
      </g>

      {/* Orbit group: node link line + dot trail (rotates). */}
      <g className="scene-orbit-group">
        <g stroke={theme.colors.border} strokeWidth={2} opacity={0.9}>
          <line x1="130" y1="210" x2="210" y2="180" />
          <line x1="210" y1="180" x2="350" y2="170" />
          <line x1="350" y1="170" x2="440" y2="200" />
          <line x1="130" y1="210" x2="210" y2="250" />
          <line x1="210" y1="250" x2="380" y2="300" />
        </g>

        {/* Small connection nodes */}
        <circle
          cx="210"
          cy="180"
          r="9"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2}
        />
        <circle
          cx="210"
          cy="250"
          r="9"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2}
        />
        <circle
          cx="350"
          cy="170"
          r="8"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2}
        />
      </g>
    </SceneSvg>
  );
}

export default ContactScene;
