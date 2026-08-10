/**
 * Minimal ambient types for react-native-web (ships Flow types only).
 * Covers the APIs apps/web consumes directly; everything else goes
 * through react-native types via the webpack 'react-native' alias.
 */
declare module 'react-native-web' {
  export const StyleSheet: {
    create<T extends Record<string, unknown>>(styles: T): T;
    flatten(style: unknown): Record<string, unknown>;
    getSheet(): { id: string; textContent: string };
  };
}
