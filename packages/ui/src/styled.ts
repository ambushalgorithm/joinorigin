import 'styled-components/native';
import type { JoinOriginTheme } from '@joinorigin/design';

declare module 'styled-components/native' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends JoinOriginTheme {}
}
