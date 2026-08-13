import { useTheme } from 'styled-components';

import { SceneSvg } from './SceneSvg';
import type { SceneProps } from './sceneTypes';

/**
 * Features scene — hub-and-spoke social graph with 8 satellite nodes
 * (Core Objects). Inlined from `public/assets/menu/scenes/features-scene.svg`
 * per design spec sprint-10-menu-anim §5.2: the embedded `<style>` is removed
 * (GSAP owns motion), colors retargeted to the page scheme + theme tokens,
 * and satellite groups carry the `scene-node` class (kept for CSS
 * transform-box parity; the counter-rotation tween was removed with the orbit
 * spin in TASK-291).
 */
export function FeaturesScene({
  primary = '#5D7CFF',
  secondary = '#38BDF8',
  gradient,
  ...rest
}: SceneProps) {
  const theme = useTheme();
  const fill = gradient ?? `linear-gradient(135deg, ${primary}, ${secondary})`;

  return (
    <SceneSvg {...rest}>
      <defs>
        <linearGradient id="features-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>

      {/* Orbit group: hub link lines + 8 satellite nodes (static — TASK-291). */}
      <g className="scene-orbit-group">
        {/* Hub links to satellites */}
        <g stroke={theme.colors.border} strokeWidth={2} fill="none" opacity={0.9}>
          <line x1="280" y1="210" x2="130" y2="110" />
          <line x1="280" y1="210" x2="280" y2="60" />
          <line x1="280" y1="210" x2="430" y2="110" />
          <line x1="280" y1="210" x2="440" y2="210" />
          <line x1="280" y1="210" x2="430" y2="310" />
          <line x1="280" y1="210" x2="280" y2="360" />
          <line x1="280" y1="210" x2="130" y2="310" />
          <line x1="280" y1="210" x2="120" y2="210" />
        </g>

        {/* Satellite nodes (8 Core Objects) with small icon strokes */}
        {/* Profiles: resume */}
        <g transform="translate(130 110)">
          <g className="scene-node">
            <circle r="26" fill={theme.colors.surface} stroke={secondary} strokeWidth={2} />
            <rect
              x="-10"
              y="-14"
              width="20"
              height="16"
              rx="3"
              fill="none"
              stroke={secondary}
              strokeWidth={2}
            />
            <line
              x1="-7"
              y1="-6"
              x2="7"
              y2="-6"
              stroke={secondary}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1="-7"
              y1="-1"
              x2="7"
              y2="-1"
              stroke={secondary}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <circle cx="0" cy="5" r="4" fill="none" stroke={secondary} strokeWidth={2} />
          </g>
        </g>
        {/* Ideas: lightbulb */}
        <g transform="translate(280 60)">
          <g className="scene-node">
            <circle r="26" fill={theme.colors.surface} stroke={secondary} strokeWidth={2} />
            <path
              d="M0-14c-6 0-10 5-10 10 0 5 4 7 6 9l1 4h6l1-4c2-2 6-4 6-9 0-5-4-10-10-10z"
              fill="none"
              stroke={secondary}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <line
              x1="-3"
              y1="6"
              x2="3"
              y2="6"
              stroke={secondary}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1="-2"
              y1="10"
              x2="2"
              y2="10"
              stroke={secondary}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </g>
        </g>
        {/* Communities: house */}
        <g transform="translate(430 110)">
          <g className="scene-node">
            <circle r="26" fill={theme.colors.surface} stroke={secondary} strokeWidth={2} />
            <path
              d="M-12 4V-4L0-15l12 11v8h-9v-7h-6v7h-9z"
              fill="none"
              stroke={secondary}
              strokeWidth={2}
              strokeLinejoin="round"
            />
          </g>
        </g>
        {/* Communication: chat bubble */}
        <g transform="translate(440 210)">
          <g className="scene-node">
            <circle r="26" fill={theme.colors.surface} stroke={secondary} strokeWidth={2} />
            <path
              d="M-12-12h24v18h-8l-6 6v-6h-10z"
              fill="none"
              stroke={secondary}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <circle cx="-5" cy="-3" r="1.6" fill={secondary} />
            <circle cx="1" cy="-3" r="1.6" fill={secondary} />
            <circle cx="7" cy="-3" r="1.6" fill={secondary} />
          </g>
        </g>
        {/* Feed: stream lines */}
        <g transform="translate(430 310)">
          <g className="scene-node">
            <circle r="26" fill={theme.colors.surface} stroke={secondary} strokeWidth={2} />
            <circle cx="0" cy="-10" r="3" fill="none" stroke={secondary} strokeWidth={2} />
            <line
              x1="6"
              y1="-10"
              x2="12"
              y2="-10"
              stroke={secondary}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <circle cx="0" cy="-1" r="3" fill="none" stroke={secondary} strokeWidth={2} />
            <line
              x1="6"
              y1="-1"
              x2="12"
              y2="-1"
              stroke={secondary}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <circle cx="0" cy="8" r="3" fill="none" stroke={secondary} strokeWidth={2} />
            <line
              x1="6"
              y1="8"
              x2="12"
              y2="8"
              stroke={secondary}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </g>
        </g>
        {/* Projects: box */}
        <g transform="translate(280 360)">
          <g className="scene-node">
            <circle r="26" fill={theme.colors.surface} stroke={secondary} strokeWidth={2} />
            <path
              d="M-10 6V-4l10-6 10 6v10l-10 6-10-6z"
              fill="none"
              stroke={secondary}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <line x1="0" y1="-4" x2="0" y2="6" stroke={secondary} strokeWidth={2} />
            <line x1="0" y1="6" x2="-10" y2="12" stroke={secondary} strokeWidth={2} />
            <line x1="0" y1="6" x2="10" y2="12" stroke={secondary} strokeWidth={2} />
          </g>
        </g>
        {/* Companies: building */}
        <g transform="translate(130 310)">
          <g className="scene-node">
            <circle r="26" fill={theme.colors.surface} stroke={secondary} strokeWidth={2} />
            <rect
              x="-11"
              y="-12"
              width="22"
              height="24"
              rx="2"
              fill="none"
              stroke={secondary}
              strokeWidth={2}
            />
            <rect x="-6" y="-8" width="4" height="4" fill={secondary} />
            <rect x="2" y="-8" width="4" height="4" fill={secondary} />
            <rect x="-6" y="0" width="4" height="4" fill={secondary} />
            <rect x="2" y="0" width="4" height="4" fill={secondary} />
          </g>
        </g>
        {/* Opportunities: sparkle */}
        <g transform="translate(120 210)">
          <g className="scene-node">
            <circle r="26" fill={theme.colors.surface} stroke={secondary} strokeWidth={2} />
            <path
              d="M0-14l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"
              fill="none"
              stroke={secondary}
              strokeWidth={2}
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>

      {/* Main group: soft radial glow + center hub (floats). */}
      <g className="scene-main-group">
        <circle cx="280" cy="210" r="150" fill={primary} opacity="0.2" />
        <circle cx="280" cy="210" r="34" fill={fill} opacity="0.9" />
        <circle
          cx="280"
          cy="210"
          r="46"
          fill="none"
          stroke={primary}
          strokeWidth={1.5}
          opacity="0.4"
        />
        <circle
          cx="280"
          cy="210"
          r="58"
          fill="none"
          stroke={primary}
          strokeWidth={1}
          opacity="0.2"
        />
      </g>
    </SceneSvg>
  );
}

export default FeaturesScene;
