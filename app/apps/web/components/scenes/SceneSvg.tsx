import type { SceneProps } from './sceneTypes';

/**
 * Shared inline scene <svg> shell (design spec sprint-10-menu-anim §5.2).
 *
 * Every scene component renders through this shell: fixed 560×420 viewBox,
 * decorative (`role="img"` + `aria-hidden`), and a stable
 * `data-testid="menu-hero-scene"` so unit/e2e selectors that targeted the old
 * `<img>` keep working. The GSAP animation classes (`scene-orbit-group`,
 * `scene-main-group`, `scene-node`) get their SVG transform-box/origin CSS
 * here so GSAP transforms pivot around each group's center.
 */
export function SceneSvg({ children, width = 560, height = 420, ...rest }: SceneProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 560 420"
      width={width}
      height={height}
      role="img"
      aria-hidden="true"
      data-testid="menu-hero-scene"
      {...rest}
    >
      <style>{`
        .scene-orbit-group,
        .scene-main-group,
        .scene-node {
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>
      {children}
    </svg>
  );
}
