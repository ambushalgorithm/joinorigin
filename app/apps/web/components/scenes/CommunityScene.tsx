import { useTheme } from 'styled-components';

import { SceneSvg } from './SceneSvg';
import type { SceneProps } from './sceneTypes';

/**
 * Community scene — 4 cluster groups of avatar-like circles linked by lines.
 * Inlined from `public/assets/menu/scenes/community-scene.svg` per design
 * spec sprint-10-menu-anim §5.2: embedded `<style>` removed (GSAP owns
 * motion), colors retargeted to the warm Amber page scheme.
 */
export function CommunityScene({
  primary = '#F5A524',
  secondary = '#FF8A3D',
  gradient,
  ...rest
}: SceneProps) {
  const theme = useTheme();
  const fill = gradient ?? `linear-gradient(135deg, ${primary}, ${secondary})`;

  return (
    <SceneSvg {...rest}>
      <defs>
        <linearGradient id="community-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>

      {/* Soft radial glow behind the focal motif (warm amber + orange). */}
      <circle cx="280" cy="210" r="160" fill={primary} opacity="0.09" />
      <circle cx="280" cy="210" r="120" fill={secondary} opacity="0.1" />

      {/* Orbit group: faint outer arcs between clusters (static — TASK-291). */}
      <g className="scene-orbit-group">
        <g stroke={theme.colors.border} strokeWidth={2} fill="none" opacity={0.9}>
          {/* top-left cluster internal links */}
          <line x1="150" y1="95" x2="205" y2="135" />
          <line x1="150" y1="95" x2="135" y2="180" />
          <line x1="205" y1="135" x2="135" y2="180" />
          {/* top-right cluster internal links */}
          <line x1="375" y1="80" x2="430" y2="120" />
          <line x1="375" y1="80" x2="360" y2="165" />
          <line x1="430" y1="120" x2="360" y2="165" />
          {/* bottom-left cluster internal links */}
          <line x1="105" y1="285" x2="170" y2="325" />
          <line x1="105" y1="285" x2="120" y2="340" />
          <line x1="170" y1="325" x2="120" y2="340" />
          {/* bottom-right cluster internal links */}
          <line x1="370" y1="300" x2="440" y2="315" />
          <line x1="370" y1="300" x2="395" y2="345" />
          <line x1="440" y1="315" x2="395" y2="345" />
          {/* inter-cluster links */}
          <line x1="205" y1="135" x2="360" y2="165" />
          <line x1="170" y1="325" x2="370" y2="300" />
          <line x1="135" y1="180" x2="105" y2="285" />
          <line x1="360" y1="165" x2="395" y2="345" />
        </g>
      </g>

      {/* Main group: 4 cluster groups (floats). */}
      <g className="scene-main-group">
        {/* Top-left cluster */}
        <g>
          <circle
            cx="150"
            cy="95"
            r="30"
            fill={theme.colors.surface}
            stroke={secondary}
            strokeWidth={2.5}
          />
          <circle
            cx="205"
            cy="135"
            r="22"
            fill={theme.colors.surface}
            stroke={secondary}
            strokeWidth={2.5}
          />
          <circle
            cx="135"
            cy="180"
            r="18"
            fill={theme.colors.surface}
            stroke={secondary}
            strokeWidth={2}
          />
          {/* avatar dot glyphs */}
          <circle cx="150" cy="87" r="7" fill={fill} />
          <path
            d="M150 100c-6 0-10 4-10 9h20c0-5-4-9-10-9z"
            fill="none"
            stroke={secondary}
            strokeWidth={2}
          />
          <circle cx="205" cy="129" r="5" fill={secondary} />
          <path
            d="M205 138c-4 0-7 3-7 6h14c0-3-3-6-7-6z"
            fill="none"
            stroke={secondary}
            strokeWidth={2}
          />
        </g>

        {/* Top-right cluster (includes one warm primary node) */}
        <g>
          <circle
            cx="375"
            cy="80"
            r="28"
            fill={theme.colors.surface}
            stroke={primary}
            strokeWidth={2.5}
          />
          <circle
            cx="430"
            cy="120"
            r="22"
            fill={theme.colors.surface}
            stroke={secondary}
            strokeWidth={2.5}
          />
          <circle
            cx="360"
            cy="165"
            r="18"
            fill={theme.colors.surface}
            stroke={secondary}
            strokeWidth={2}
          />
          <circle cx="375" cy="73" r="6" fill={primary} />
          <path
            d="M375 85c-5 0-9 4-9 8h18c0-4-4-8-9-8z"
            fill="none"
            stroke={primary}
            strokeWidth={2}
          />
          <circle cx="430" cy="113" r="5" fill={secondary} />
        </g>

        {/* Bottom-left cluster */}
        <g>
          <circle
            cx="105"
            cy="285"
            r="24"
            fill={theme.colors.surface}
            stroke={secondary}
            strokeWidth={2.5}
          />
          <circle
            cx="170"
            cy="325"
            r="20"
            fill={theme.colors.surface}
            stroke={secondary}
            strokeWidth={2.5}
          />
          <circle
            cx="120"
            cy="340"
            r="16"
            fill={theme.colors.surface}
            stroke={secondary}
            strokeWidth={2}
          />
          <circle cx="105" cy="277" r="6" fill={secondary} />
          <path
            d="M105 290c-5 0-8 3-8 7h16c0-4-3-7-8-7z"
            fill="none"
            stroke={secondary}
            strokeWidth={2}
          />
        </g>

        {/* Bottom-right cluster */}
        <g>
          <circle
            cx="370"
            cy="300"
            r="26"
            fill={theme.colors.surface}
            stroke={secondary}
            strokeWidth={2.5}
          />
          <circle
            cx="440"
            cy="315"
            r="20"
            fill={theme.colors.surface}
            stroke={secondary}
            strokeWidth={2.5}
          />
          <circle
            cx="395"
            cy="345"
            r="16"
            fill={theme.colors.surface}
            stroke={secondary}
            strokeWidth={2}
          />
          <circle cx="370" cy="292" r="6" fill={fill} />
        </g>
      </g>
    </SceneSvg>
  );
}

export default CommunityScene;
