import 'styled-components';
import type { JoinOriginTheme } from '@joinorigin/design';

/**
 * Theme typing for the web-local `styled-components` instance.
 *
 * `@joinorigin/design` ships its own `DefaultTheme` augmentation
 * (`packages/design/src/styled.ts`), but module augmentations apply only to
 * the exact `styled-components` module instance that the augmenting file
 * resolves. Since the framework upgrade (TASK-226) pins `styled-components`
 * to 6.5.2 in apps/web while the shared packages still resolve the hoisted
 * 6.5.1, TypeScript sees two distinct `styled-components` module identities
 * and the design-package augmentation does not reach web-local styled
 * components. This file re-applies the same augmentation against the
 * web-resolved instance so `theme.colors` / `theme.spacing` / etc. typecheck
 * everywhere in apps/web.
 */
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends JoinOriginTheme {}
}
