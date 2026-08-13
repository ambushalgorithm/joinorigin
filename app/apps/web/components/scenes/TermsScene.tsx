import { useTheme } from 'styled-components';

import { SceneSvg } from './SceneSvg';
import type { SceneProps } from './sceneTypes';

/**
 * Terms scene — balanced document/scroll outline with 5 horizontal rule lines,
 * muted indigo gradient. Inlined from `public/assets/menu/scenes/terms-scene.svg`
 * per design spec sprint-10-menu-anim §5.2: embedded `<style>` removed (GSAP
 * owns motion), colors retargeted to the Indigo page scheme.
 */
export function TermsScene({
  primary = '#60A5FA',
  secondary = '#818CF8',
  gradient,
  ...rest
}: SceneProps) {
  const theme = useTheme();
  const fill = gradient ?? `linear-gradient(135deg, ${primary}, ${secondary})`;

  return (
    <SceneSvg {...rest}>
      <defs>
        <linearGradient id="terms-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>

      {/* Main group: soft glow + document/scroll + 5 rule lines (floats). */}
      <g className="scene-main-group">
        <circle cx="280" cy="205" r="150" fill={secondary} opacity="0.13" />

        {/* Scroll/document outline */}
        <path
          d="M170 120 C 150 105, 135 115, 140 140 L 150 280 C 152 300, 170 305, 185 295 L 180 165 C 178 145, 190 130, 210 132 L 395 145 C 415 147, 430 165, 428 185 L 418 320 C 416 340, 398 345, 383 335 L 388 205 C 390 185, 378 170, 358 168 L 178 152"
          fill={theme.colors.surface}
          stroke={fill}
          strokeWidth={3}
          strokeLinejoin="round"
        />

        {/* 5 horizontal rule lines */}
        <g stroke={theme.colors.textMuted} strokeWidth={3} strokeLinecap="round" opacity={0.75}>
          <line x1="190" y1="180" x2="330" y2="190" />
          <line x1="195" y1="205" x2="350" y2="215" />
          <line x1="200" y1="230" x2="340" y2="238" />
          <line x1="205" y1="255" x2="330" y2="262" />
          <line x1="210" y1="280" x2="360" y2="288" />
        </g>
      </g>

      {/* Orbit group: outer balance ring + seal node (rotates slowly). */}
      <g className="scene-orbit-group">
        {/* Seal node bottom-right */}
        <circle
          cx="398"
          cy="300"
          r="18"
          fill={theme.colors.surface}
          stroke={secondary}
          strokeWidth={2.5}
        />
        <circle cx="398" cy="300" r="8" fill={fill} opacity={0.8} />

        {/* Small balance accent: tiny scale node top-left */}
        <g transform="translate(150 150)" opacity="0.85">
          <g className="scene-node">
            <line x1="0" y1="0" x2="0" y2="14" stroke={secondary} strokeWidth={2} />
            <line
              x1="-14"
              y1="-6"
              x2="14"
              y2="-6"
              stroke={secondary}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <path d="M-14-6l-6 10" stroke={secondary} strokeWidth={2} strokeLinecap="round" />
            <path d="M14-6l6 10" stroke={secondary} strokeWidth={2} strokeLinecap="round" />
          </g>
        </g>
      </g>
    </SceneSvg>
  );
}

export default TermsScene;
